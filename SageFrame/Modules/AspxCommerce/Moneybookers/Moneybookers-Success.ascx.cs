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
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;
using SageFrame.Web.Utilities;

public partial class Modules_AspxCommerce_AspxPaymentSuccess_MoneybookersSuccess : BaseAdministrationUserControl
{
    #region Varisbles
    public string transID, invoice, addressPath, sageRedirectPath = string.Empty;
    public bool IsUseFriendlyUrls = true;
    public int orderID;
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            try
            {
                SageFrameConfig sfConfig = new SageFrameConfig();
                IsUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);             
                if (IsUseFriendlyUrls)
                {
                    if (GetPortalID > 1)
                    {
                        addressPath = HttpContext.Current.Request.ServerVariables["SERVER_NAME"] + "/portal/" + GetPortalSEOName + "/";
                        sageRedirectPath = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + ".aspx");
                    }
                    else
                    {
                        addressPath = HttpContext.Current.Request.ServerVariables["SERVER_NAME"] + "/";
                        sageRedirectPath = ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + ".aspx");
                    }
                }
                else
                {
                    
                    sageRedirectPath = ResolveUrl("{~/Default.aspx?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
                }

                Image imgProgress = (Image)UpdateProgress1.FindControl("imgPrgress");
                if (imgProgress != null)
                {
                    imgProgress.ImageUrl = GetTemplateImageUrl("ajax-loader.gif", true);
                }
                hlnkHomePage.NavigateUrl = sageRedirectPath;

                if (Session["OrderID"] != null)
                {
                    OrderDetailsCollection orderdata = new OrderDetailsCollection();
                    AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
                    orderID = int.Parse(Session["OrderID"].ToString());

                    string transID = GetTransactionDetailById(orderID);
                    if (HttpContext.Current.Session["OrderCollection"] != null)
                    {
                        orderdata = (OrderDetailsCollection)HttpContext.Current.Session["OrderCollection"];
                        invoice = orderdata.ObjOrderDetails.InvoiceNumber.ToString();
                        orderdata.ObjOrderDetails.OrderStatus = "Successfull";
                        aspxCommonObj.CustomerID = GetCustomerID;
                        aspxCommonObj.SessionCode = HttpContext.Current.Session.ToString();
                        aspxCommonObj.StoreID = GetStoreID;
                        aspxCommonObj.PortalID = GetPortalID;
                        aspxCommonObj.CultureName = GetCurrentCultureName;
                        aspxCommonObj.UserName = GetUsername;
                        AspxGiftCardController.IssueGiftCard(orderdata.LstOrderItemsInfo, false, aspxCommonObj);
                        EmailTemplate.SendEmailForOrder(GetPortalID, orderdata, addressPath, TemplateName, transID);
                    }                    
                    
                    if (orderdata.GiftCardDetail != null && HttpContext.Current.Session["UsedGiftCard"] != null)
                    {   //updating giftcard used in chekout
                        AspxGiftCardController.UpdateGiftCardUsage(orderdata.GiftCardDetail, orderdata.ObjCommonInfo.StoreID,
                                             orderdata.ObjCommonInfo.PortalID, orderdata.ObjOrderDetails.OrderID, orderdata.ObjCommonInfo.AddedBy,
                                             orderdata.ObjCommonInfo.CultureName);
                        HttpContext.Current.Session.Remove("UsedGiftCard");
                    }                  

                   
                    object amount = orderdata.ObjOrderDetails.GrandTotal;
                    lblTransaction.Text = transID;
                    lblPaymentMethod.Text = "Moneybookers";
                    lblDateTime.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy ");
                    lblInvoice.Text = invoice;
                    ClearAllSession();
                }
                else
                {
                    Response.Redirect(sageRedirectPath, false);
                    ClearAllSession();
                }

                IncludeLanguageJS();
            }
            catch (Exception ex)
            {

                ProcessException(ex);
            }
        }
    }
    private void ClearAllSession()
    {
        Session.Remove("OrderCollection");

        if (Session["IsFreeShipping"] != null && Session["IsFreeShipping"] != "")
        {
            HttpContext.Current.Session.Remove("IsFreeShipping");

        }
        if (Session["OrderID"] != null && Session["OrderID"] != "")
        {
            HttpContext.Current.Session.Remove("OrderID");

        }
        if (Session["DiscountAmount"] != null && Session["DiscountAmount"] != "")
        {
            HttpContext.Current.Session.Remove("DiscountAmount");

        }
        if (Session["CouponCode"] != null && Session["CouponCode"] != "")
        {
            HttpContext.Current.Session.Remove("CouponCode");

        }
        if (Session["CouponApplied"] != null && Session["CouponApplied"] != "")
        {
            HttpContext.Current.Session.Remove("CouponApplied");
        }
        if (Session["DiscountAll"] != null && Session["DiscountAll"] != "")
        {
            HttpContext.Current.Session.Remove("DiscountAll");
        }
        if (Session["TaxAll"] != null && Session["TaxAll"] != "")
        {
            HttpContext.Current.Session.Remove("TaxAll");
        }
        if (Session["ShippingCostAll"] != null && Session["ShippingCostAll"] != "")
        {
            HttpContext.Current.Session.Remove("ShippingCostAll");
        }
        if (Session["GrandTotalAll"] != null && Session["GrandTotalAll"] != "")
        {
            HttpContext.Current.Session.Remove("GrandTotalAll");
        }
        if (Session["Gateway"] != null && Session["Gateway"] != "")
        {
            HttpContext.Current.Session.Remove("Gateway");
        }
        if (Session["transaction_id"] != null && Session["transaction_id"] != "")
        {
            HttpContext.Current.Session.Remove("transaction_id");
        }
    }

    public static string GetTransactionDetailById(int orderID)
    {
        var paraMeter = new List<KeyValuePair<string, object>>();
        paraMeter.Add(new KeyValuePair<string, object>("@OrderID", orderID));
        var sqlH = new SQLHandler();
        return sqlH.ExecuteAsScalar<string>("usp_Aspx_GetTransactionDetailById", paraMeter);
    }

}
