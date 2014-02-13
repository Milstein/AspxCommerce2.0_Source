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
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using SageFrame.Framework;
using AspxCommerce.Core;
using System.Net;
using System.Text;
using System.Security.Cryptography;
using SageFrame.Web;
using System.Collections;
using SageFrame.Message;
using SageFrame.Web.Utilities;

public partial class GiftCardSuccess : BaseAdministrationUserControl
{

    //  string authToken, txToken, query;
    // string strResponse;
    public string SendEmailFrom, SendOrderNotice;
    bool _isUseFriendlyUrls = true;
    string _sageRedirectPath, _addressPath = string.Empty;
   
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                var sfConfig = new SageFrameConfig();
                _isUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);

                if (_isUseFriendlyUrls)
                {
                    if (GetPortalID > 1)
                    {
                        _sageRedirectPath = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + ".aspx");
                        _addressPath = HttpContext.Current.Request.ServerVariables["SERVER_NAME"] + "/portal/" + GetPortalSEOName + "/";
             
                    }
                    else
                    {
                        _sageRedirectPath = ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + ".aspx");
                        _addressPath = HttpContext.Current.Request.ServerVariables["SERVER_NAME"] + "/";
             
                    }
                }
                else
                {
                    _sageRedirectPath = ResolveUrl("{~/Default.aspx?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
                }

                var imgProgress = (Image)UpdateProgress1.FindControl("imgPrgress");
                if (imgProgress != null)
                {
                    imgProgress.ImageUrl = GetTemplateImageUrl("ajax-loader.gif", true);
                }
                hlnkHomePage.NavigateUrl = _sageRedirectPath;

                var ssc = new StoreSettingConfig();
                SendEmailFrom = ssc.GetStoreSettingsByKey(StoreSetting.SendEcommerceEmailsFrom, GetStoreID, GetPortalID, GetCurrentCultureName);
                SendOrderNotice = ssc.GetStoreSettingsByKey(StoreSetting.SendOrderNotification, GetStoreID, GetPortalID, GetCurrentCultureName);

                SendConfrimMessage();
            }
            IncludeLanguageJS();
        }
        catch
        {
        }
    }

    protected void SendConfrimMessage()
    {
        try
        {
            if (Session["OrderID"] != null)
            {
                const int responseCode = 1; // response code, defaulted to Invalid
                const string responsereasontext = "Transaction occured successfully";
                const int responsereasonCode = 1;
                string paymentmethod = string.Empty;
                var orderdata2 = new OrderDetailsCollection();
                if (HttpContext.Current.Session["OrderCollection"] != null)
                {
                  
                    orderdata2 = (OrderDetailsCollection)HttpContext.Current.Session["OrderCollection"];
                   
                }
                string invoice = orderdata2.ObjOrderDetails.InvoiceNumber;
                var random = new Random();
                string purchaseorderNo = (random.Next(0, 1000)).ToString();
                string timeStamp = ((int)(DateTime.UtcNow - new DateTime(2011, 1, 1)).TotalSeconds).ToString();
                string transID = (random.Next(9999999, 111111111)).ToString();
                lblTransaction.Text = transID;
                lblInvoice.Text = invoice;
                lblPaymentMethod.Text = "Gift Card";
                lblDateTime.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy ");
                AspxCommonInfo aspxCommonObj=new AspxCommonInfo();
                aspxCommonObj.StoreID = GetStoreID;
                aspxCommonObj.PortalID = GetPortalID;
                aspxCommonObj.UserName = GetUsername;
                aspxCommonObj.CustomerID = GetCustomerID;
                aspxCommonObj.SessionCode = HttpContext.Current.Session.SessionID;
                aspxCommonObj.CultureName = GetCurrentCultureName;
                string result = AspxGiftCardController.Parse(orderdata2.ObjOrderDetails.OrderID,transID, invoice, purchaseorderNo, responseCode,
                                                         responsereasonCode, responsereasontext, aspxCommonObj);

                if (orderdata2.GiftCardDetail != null && HttpContext.Current.Session["UsedGiftCard"] != null)
                {
                    AspxGiftCardController.UpdateGiftCardUsage(orderdata2.GiftCardDetail, orderdata2.ObjCommonInfo.StoreID,
                                         orderdata2.ObjCommonInfo.PortalID, orderdata2.ObjOrderDetails.OrderID, orderdata2.ObjCommonInfo.AddedBy,
                                         orderdata2.ObjCommonInfo.CultureName);
                    HttpContext.Current.Session.Remove("UsedGiftCard");
                }
                lblerror.Text = result;
                lblerror.Text = GetSageMessage("Payment", "PaymentProcessed"); 
                var tinfo = new TransactionLogInfo();
                var tlog = new TransactionLog();

                tinfo.TransactionID = transID;
                tinfo.AuthCode = "";
                tinfo.TotalAmount = decimal.Parse(orderdata2.ObjOrderDetails.GrandTotal.ToString());
                tinfo.ResponseCode = responseCode.ToString();
                tinfo.ResponseReasonText = responsereasontext;
                tinfo.OrderID = orderdata2.ObjOrderDetails.OrderID;
                tinfo.StoreID =  orderdata2.ObjCommonInfo.StoreID;
                tinfo.PortalID = orderdata2.ObjCommonInfo.PortalID;
                tinfo.AddedBy = orderdata2.ObjCommonInfo.AddedBy;
                tinfo.CustomerID = orderdata2.ObjOrderDetails.CustomerID;
                tinfo.SessionCode = orderdata2.ObjOrderDetails.SessionCode;
                tinfo.PaymentGatewayID = orderdata2.ObjOrderDetails.PaymentGatewayTypeID;
                tinfo.PaymentStatus = "Processed";
                tinfo.CreditCard = "";
                tlog.SaveTransactionLog(tinfo);

                var clSes = new AspxCommerceWebService();
                if (Session["IsFreeShipping"] != null)
                {
                    HttpContext.Current.Session.Remove("IsFreeShipping");
                }
                if (Session["DiscountAmount"] != null)
                {
                    HttpContext.Current.Session.Remove("DiscountAmount");

                }
                if (Session["CouponDiscountAmount"] != null)
                {
                    HttpContext.Current.Session.Remove("CouponDiscountAmount");

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

                //invoice  transID

                if (Session["OrderCollection"] != null)
                {
                   
                  var orderdata = (OrderDetailsCollection)Session["OrderCollection"];
                    try
                    {
                        EmailTemplate.SendEmailForOrder(GetPortalID, orderdata, _addressPath, TemplateName, transID);
                    }
                    catch
                    {
                        lblerror.Text = "";
                        lblerror.Text= GetSageMessage("Payment", "EmailSendOrderProblem");
                    }
                    clSes.ClearSessionVariable("OrderCollection");
                }
            }
            else
            {
                Response.Redirect(_sageRedirectPath, false);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}

