/*
AspxCommerce® - http://www.aspxcommerce.com
Copyright (c) 20011-2012 by AspxCommerce
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using AspxCommerce.Core.Mobile;
using AspxCommerce.PayPal;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxPaymentSuccess_PaypalSuccess : BaseAdministrationUserControl
{
    string _authToken, _txToken, _query;
    string _strResponse;
    string _transID, _invoice, _addressPath;
    string PageExtension;
    bool _isUseFriendlyUrls = true;
    public int orderID;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            try
            {
                if (Session["OrderID"] != null)
                {
                    orderID = int.Parse(Session["OrderID"].ToString());
                }

                var sfConfig = new SageFrameConfig();
                _isUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
                PageExtension = SageFrameSettingKeys.PageExtension;
                string sageRedirectPath;
                if (_isUseFriendlyUrls)
                {
                    if (GetPortalID > 1)
                    {
                        sageRedirectPath = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + PageExtension);
                        _addressPath = HttpContext.Current.Request.ServerVariables["SERVER_NAME"] + "/portal/" + GetPortalSEOName + "/";
                    }
                    else
                    {
                        sageRedirectPath = ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + PageExtension);
                        _addressPath = HttpContext.Current.Request.ServerVariables["SERVER_NAME"] + "/";
                    }
                }
                else
                {
                    sageRedirectPath = ResolveUrl("{~/Default" + PageExtension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
                }

                var imgProgress = (Image)UpdateProgress1.FindControl("imgPrgress");
                if (imgProgress != null)
                {
                    imgProgress.ImageUrl = GetTemplateImageUrl("ajax-loader.gif", true);
                }
                hlnkHomePage.NavigateUrl = sageRedirectPath;

                 
                IncludeLanguageJS();
                if (Session["mb_IsCheckoutFromMobile"] != null)
                {
                    MobileSuccess(sageRedirectPath);
                }else
                {
                    WebSuccess(sageRedirectPath);
                }
            }
            catch (Exception ex)
            {

                ProcessException(ex);
            }
        }
    }

    private void MobileSuccess(string sageRedirectPath)
    {
        try
        {

            if (Session["mb_OrderDetail"] != null)
            {
                var orderInfo = (OrderInfo) Session["mb_OrderDetail"];
                //Session["mb_IsCheckoutFromMobile"];
                var giftCardUsage = (List<GiftCardUsage>) Session["mb_GiftCardUsage"];
                var couponCode = Session["mb_CouponCode"].ToString();
                var couponCodeApplied = int.Parse(Session["mb_CouponCodeApplied"].ToString());
                var billingAddress = (UserAddressInfo) Session["mb_BillingAddress"];
                var shippingAddress = (UserAddressInfo) Session["mb_ShippingAddress"];
                var itemsInfo = (List<OrderItem>) Session["mb_ItemDetails"];
                int storeId = orderInfo.StoreId;
                int portalId = orderInfo.PortalId;
                string userName = orderInfo.AddedBy;
                int customerId = orderInfo.CustomerId;
                bool isTestPaypal = false;



                _invoice = orderInfo.InvoiceNumber;
                if (!string.IsNullOrEmpty(orderInfo.TransactionId) && orderInfo.TransactionId.Trim() != "0")
                {
                    lblTransaction.Text = orderInfo.TransactionId;
                    lblInvoice.Text = orderInfo.InvoiceNumber;
                    lblPaymentMethod.Text = orderInfo.PaymentMethodName;
                    lblDateTime.Text = orderInfo.AddedOn.ToString("dddd, dd MMMM yyyy ");
                    lblOrderNo.Text = "#" + orderInfo.OrderId;
                }
                else
                {
                var pw = new PayPalWCFService();
                List<PayPalSettingInfo> setting = pw.GetAllPayPalSetting(orderInfo.PaymentGatewayTypeId, storeId,
                                                                         portalId);
                _authToken = setting[0].AuthToken;
                isTestPaypal = bool.Parse(setting[0].IsTestPaypal);

                if (giftCardUsage != null && giftCardUsage.Count > 0)
                {
                    AspxGiftCardController.UpdateGiftCardUsage(giftCardUsage, storeId,
                                                           portalId,
                                                           orderInfo.OrderId,
                                                           userName,
                                                           orderInfo.CultureName);

                }



                // authToken = "QMtOC54_YHYUkoggkMZ81ivNWSxPXduIqS5oMynafeUGRL1Rv5OTtUd4rvq";

                //read in txn token from querystring
                _txToken = Request.QueryString.Get("tx");
                _query = string.Format("cmd=_notify-synch&tx={0}&at={1}", _txToken, _authToken);
                // Create the request back
                // string url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
                const string strSandbox = "https://www.sandbox.paypal.com/cgi-bin/webscr";
                const string strLive = "https://www.paypal.com/cgi-bin/webscr";
                string test;
                if (Session["IsTestPayPal"] != null)
                {
                    test = bool.Parse(Session["IsTestPayPal"].ToString()) ? strSandbox : strLive;
                }
                else
                {
                    test = isTestPaypal ? strSandbox : strLive;
                }
                var req = (HttpWebRequest) WebRequest.Create(test);

                // Set values for the request back
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded";
                req.ContentLength = _query.Length;

                // Write the request back IPN strings
                var stOut = new StreamWriter(req.GetRequestStream(), System.Text.Encoding.ASCII);
                stOut.Write(_query);
                stOut.Close();

                // Do the request to PayPal and get the response
                var stIn = new StreamReader(req.GetResponse().GetResponseStream());
                _strResponse = stIn.ReadToEnd();
                stIn.Close();

                // If response was SUCCESS, parse response string and output details
                if (_strResponse.StartsWith("SUCCESS"))
                {
                    string sessionCode = orderInfo.SessionCode;
                    //for localhost
                    // PayPalHandler pdt = PayPalHandler.Parse(strResponse, storeID, portalID, userName, customerID, sessionCode);
                    //for live site
                    try
                    {
                        var paypalHandler = new PayPalHandler();
                        //Get billing address by orderId
                        var couponUsage = "";
                        if (!string.IsNullOrEmpty(couponCode))
                        {
                            couponUsage = couponCode + "#" + couponCodeApplied;
                        }
                        //get shipping address by orderId
                        paypalHandler.ParseAfterIPNMobile(orderInfo, couponUsage, itemsInfo, _strResponse,
                                                          billingAddress,
                                                          shippingAddress,
                                                          TemplateName,
                                                          _addressPath);


                    }
                    catch (Exception)
                    {
                        lblerror.Text = GetSageMessage("Payment", "PaymentParsingIPNError");
                    }
                    var clSes = new AspxCommerceWebService();

                    String[] stringArray = _strResponse.Split('\n');
                    int i;
                    string status = string.Empty;
                    for (i = 1; i < stringArray.Length - 1; i++)
                    {
                        String[] stringArray1 = stringArray[i].Split('=');

                        String sKey = stringArray1[0];
                        String sValue = HttpUtility.UrlDecode(stringArray1[1]);

                        // set string vars to hold variable names using a switch
                        switch (sKey)
                        {
                            case "txn_id":
                                _transID = Convert.ToString(sValue);
                                break;
                            case "payment_status":
                                status = Convert.ToString(sValue);
                                break;

                        }
                    }
                    lblOrderNo.Text = "#" + orderInfo.OrderId;
                    lblTransaction.Text = _transID;
                    lblInvoice.Text = _invoice;
                    lblPaymentMethod.Text = "Paypal";
                    lblDateTime.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy ");
                    if (status.ToLower().Trim() == "completed")
                    {
                        lblerror.Text = GetSageMessage("Payment", "PaymentProcessed");
                    }
                    else if (status.ToLower().Trim() == "pending")
                    {
                        lblerror.Text = GetSageMessage("Payment", "PaymentPending");
                    }
                    Session.Clear();
                    }
                }
                Session.Clear();
            }
            else
            {
                Response.Redirect(sageRedirectPath);
            }
        }
        catch (Exception ex)
        {

            ProcessException(ex);
        }

    }

    private void WebSuccess(string sageRedirectPath)
    {
        if (Session["OrderID"] != null)
        {
            int storeID = GetStoreID;
            int portalID = GetPortalID;
            string userName = GetUsername;
            int customerID = GetCustomerID;
            var orderdata = new OrderDetailsCollection();
            if (HttpContext.Current.Session["OrderCollection"] != null)
            {

                orderdata = (OrderDetailsCollection)HttpContext.Current.Session["OrderCollection"];
                _invoice = orderdata.ObjOrderDetails.InvoiceNumber;
                var pw = new PayPalWCFService();
                int i = orderdata.ObjOrderDetails.PaymentGatewayTypeID;
                List<PayPalSettingInfo> setting = pw.GetAllPayPalSetting(i, storeID, portalID);
                _authToken = setting[0].AuthToken;
                if (orderdata.GiftCardDetail != null && HttpContext.Current.Session["UsedGiftCard"] != null)
                {   //updating giftcard used in chekout
                    AspxGiftCardController.UpdateGiftCardUsage(orderdata.GiftCardDetail, orderdata.ObjCommonInfo.StoreID,
                                         orderdata.ObjCommonInfo.PortalID, orderdata.ObjOrderDetails.OrderID, orderdata.ObjCommonInfo.AddedBy,
                                         orderdata.ObjCommonInfo.CultureName);
                    HttpContext.Current.Session.Remove("UsedGiftCard");
                }
            }


            // authToken = "QMtOC54_YHYUkoggkMZ81ivNWSxPXduIqS5oMynafeUGRL1Rv5OTtUd4rvq";

            //read in txn token from querystring
            _txToken = Request.QueryString.Get("tx");
            _query = string.Format("cmd=_notify-synch&tx={0}&at={1}", _txToken, _authToken);
            // Create the request back
            // string url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
            const string strSandbox = "https://www.sandbox.paypal.com/cgi-bin/webscr";
            const string strLive = "https://www.paypal.com/cgi-bin/webscr";
            string test = string.Empty;
            if (Session["IsTestPayPal"] != null)
            {

                test = bool.Parse(Session["IsTestPayPal"].ToString()) ? strSandbox : strLive;
            }
            var req = (HttpWebRequest)WebRequest.Create(test);

            // Set values for the request back
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            req.ContentLength = _query.Length;

            // Write the request back IPN strings
            var stOut = new StreamWriter(req.GetRequestStream(), System.Text.Encoding.ASCII);
            stOut.Write(_query);
            stOut.Close();

            // Do the request to PayPal and get the response
            var stIn = new StreamReader(req.GetResponse().GetResponseStream());
            _strResponse = stIn.ReadToEnd();
            stIn.Close();

            // If response was SUCCESS, parse response string and output details
            if (_strResponse.StartsWith("SUCCESS"))
            {
                string sessionCode = HttpContext.Current.Session.SessionID;
                //for localhost
                // PayPalHandler pdt = PayPalHandler.Parse(strResponse, storeID, portalID, userName, customerID, sessionCode);
                //for live site
                try
                {
                    var paypalHandler = new PayPalHandler();
                    var aspxCommonObj = new AspxCommonInfo();
                    aspxCommonObj.StoreID = storeID;
                    aspxCommonObj.PortalID = portalID;
                    aspxCommonObj.UserName = userName;
                    aspxCommonObj.CustomerID = customerID;
                    aspxCommonObj.SessionCode = sessionCode;
                    paypalHandler.ParseAfterIPN(_strResponse, aspxCommonObj, TemplateName, _addressPath);

                    AspxGiftCardController.IssueGiftCard(orderdata.LstOrderItemsInfo, false, aspxCommonObj);
                    if (orderdata.GiftCardDetail != null && HttpContext.Current.Session["UsedGiftCard"] != null)
                    {
                        AspxGiftCardController.UpdateGiftCardUsage(orderdata.GiftCardDetail, orderdata.ObjCommonInfo.StoreID,
                                             orderdata.ObjCommonInfo.PortalID, orderdata.ObjOrderDetails.OrderID, orderdata.ObjCommonInfo.AddedBy,
                                             orderdata.ObjCommonInfo.CultureName);
                        HttpContext.Current.Session.Remove("UsedGiftCard");
                    }
                }
                catch (Exception)
                {
                    lblerror.Text = GetSageMessage("Payment", "PaymentParsingIPNError");
                }
                var clSes = new AspxCommerceWebService();

                String[] stringArray = _strResponse.Split('\n');
                int i;
                string status = string.Empty;
                for (i = 1; i < stringArray.Length - 1; i++)
                {
                    String[] stringArray1 = stringArray[i].Split('=');

                    String sKey = stringArray1[0];
                    String sValue = HttpUtility.UrlDecode(stringArray1[1]);

                    // set string vars to hold variable names using a switch
                    switch (sKey)
                    {
                        case "txn_id":
                            _transID = Convert.ToString(sValue);
                            break;
                        case "payment_status":
                            status = Convert.ToString(sValue);
                            break;

                    }
                }
                lblOrderNo.Text = "#" + Session["OrderID"].ToString();
                lblTransaction.Text = _transID;
                lblInvoice.Text = _invoice;
                lblPaymentMethod.Text = "Paypal";
                lblDateTime.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy ");
                if (status.ToLower().Trim() == "completed")
                {
                    lblerror.Text = GetSageMessage("Payment", "PaymentProcessed");
                }
                else if (status.ToLower().Trim() == "pending")
                {
                    lblerror.Text = GetSageMessage("Payment", "PaymentPending");
                }

                if (Session["IsFreeShipping"] != null)
                {
                    HttpContext.Current.Session.Remove("IsFreeShipping");

                }
                if (Session["OrderID"] != null)
                {
                    HttpContext.Current.Session.Remove("OrderID");

                }
                if (Session["DiscountAmount"] != null)
                {
                    HttpContext.Current.Session.Remove("DiscountAmount");

                }
                if (Session["IsCouponInPercent"] != null)
                {
                    HttpContext.Current.Session.Remove("IsCouponInPercent");

                }
                if (Session["CouponPercentValue"] != null)
                {
                    HttpContext.Current.Session.Remove("CouponPercentValue");

                }
                if (Session["CouponSessionPercentAmount"] != null)
                {
                    HttpContext.Current.Session.Remove("CouponSessionPercentAmount");

                }
                if (Session["CouponSessionAmount"] != null)
                {
                    HttpContext.Current.Session.Remove("CouponSessionAmount");

                }
                if (Session["CouponCode"] != null)
                {
                    HttpContext.Current.Session.Remove("CouponCode");

                }
                if (Session["CouponApplied"] != null)
                {
                    HttpContext.Current.Session.Remove("CouponApplied");
                }
                Session.Remove("IsTestPayPal");
                if (Session["DiscountAll"] != null)
                {
                    HttpContext.Current.Session.Remove("DiscountAll");
                }
                if (Session["TaxAll"] != null)
                {
                    HttpContext.Current.Session.Remove("TaxAll");
                }
                if (Session["ShippingCostAll"] != null)
                {
                    HttpContext.Current.Session.Remove("ShippingCostAll");
                }
                if (Session["GrandTotalAll"] != null)
                {
                    HttpContext.Current.Session.Remove("GrandTotalAll");
                }
                if (Session["Gateway"] != null)
                {
                    HttpContext.Current.Session.Remove("Gateway");
                }
            }
            else
            {

                lblerror.Text = GetSageMessage("Payment", "PaymentError");
            }
        }
        else
        {
            Response.Redirect(sageRedirectPath, false);
        }
    }
}
