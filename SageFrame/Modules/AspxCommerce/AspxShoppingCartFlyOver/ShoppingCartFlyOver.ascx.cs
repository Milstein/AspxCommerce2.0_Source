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
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using System.Web;

public partial class Modules_AspxShoppingCartFlyOver_ShoppingCartFlyOver : BaseAdministrationUserControl
{
    public string baseUrl;
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public string SessionCode = string.Empty;
    public string ShowMiniShopCart, AllowMultipleAddChkOut, MinCartSubTotalAmount, AllowAnonymousCheckOut, ShoppingCartURL;
    public bool IsUseFriendlyUrls = true;
    public decimal TotalPrice = 0;
    public int CartItemCount = 0;
    public string ModuleCollapsible;
    public decimal Rate = 1;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            baseUrl = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            SageFrameConfig pagebase = new SageFrameConfig();
            IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
            if (!IsPostBack)
            {
                IncludeJs("ShoppingCartFlyOver", "/Modules/AspxCommerce/AspxShoppingCartFlyOver/js/ShoppingCartFlyOver.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;

                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }
                StoreSettingConfig ssc = new StoreSettingConfig();
                ShowMiniShopCart = ssc.GetStoreSettingsByKey(StoreSetting.ShowMiniShoppingCart, StoreID, PortalID, CultureName);
                AllowMultipleAddChkOut = ssc.GetStoreSettingsByKey(StoreSetting.AllowMultipleShippingAddress, StoreID, PortalID, CultureName);
                MinCartSubTotalAmount = ssc.GetStoreSettingsByKey(StoreSetting.MinimumCartSubTotalAmount, StoreID, PortalID, CultureName);
                AllowAnonymousCheckOut = ssc.GetStoreSettingsByKey(StoreSetting.AllowAnonymousCheckOut, StoreID, PortalID, CultureName);
                ShoppingCartURL = ssc.GetStoreSettingsByKey(StoreSetting.ShoppingCartURL, StoreID, PortalID, CultureName);
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);
                decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName));
                string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
                if (HttpContext.Current.Session["CurrencyRate"] != null)
                {
                    if (Session["CurrencyCode"].ToString() != MainCurrency)
                    {
                        decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                        Rate = Math.Round(rate1 + (rate1 * additionalCCVR / 100), 4);
                    }
                    else
                    {
                        Rate = decimal.Parse(Session["CurrencyRate"].ToString());
                    }
                }
            }
            loadScript();
            GetCartItemListDetails();
            IncludeLanguageJS();
            if (ShowMiniShopCart.ToLower() == "true")
            {
                CartItemCount = GetCartItemCount();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;

    public void GetCartItemListDetails()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        aspxCommonObj.CustomerID = CustomerID;
        aspxCommonObj.SessionCode = SessionCode;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<CartInfo> lstCart = AspxCartController.GetCartDetails(aspxCommonObj);
        StringBuilder cartItemContent = new StringBuilder();
        if (lstCart != null && lstCart.Count > 0)
        {
            for (int index = 0; index < lstCart.Count; index++)
            {
                TotalPrice += (decimal)lstCart[index].TotalItemCost;
                if (lstCart[index].CostVariants != "")
                {
                    cartItemContent.Append("<tr id=\"productID_");
                    cartItemContent.Append(lstCart[index].ItemID);
                    cartItemContent.Append("\"><td class=\"cssClassName\"><a costvariants=\"");
                    cartItemContent.Append(lstCart[index].CostVariants);
                    cartItemContent.Append("\" href=\"");
                    cartItemContent.Append(aspxRedirectPath);
                    cartItemContent.Append("item/");
                    cartItemContent.Append(lstCart[index].SKU + pageExtension);
                    cartItemContent.Append("\">");
                    cartItemContent.Append(lstCart[index].ItemName);
                    cartItemContent.Append(" (" + lstCart[index].CostVariants + ")");
                    cartItemContent.Append("</a></td><td class=\"cssClassQty\">");
                    cartItemContent.Append(lstCart[index].Quantity);
                    cartItemContent.Append("</td><td>");
                    cartItemContent.Append("<span class=\"cssClassFormatCurrency\">");
                    cartItemContent.Append(lstCart[index].TotalItemCost * Rate);
                    cartItemContent.Append("</span></td><td class=\"cssClassDelete\"><img class=\"imgCartItemListDelete\" name=\"");
                    cartItemContent.Append(lstCart[index].CartItemID);
                    cartItemContent.Append("\" id=\"");
                    cartItemContent.Append(lstCart[index].CartID);
                    cartItemContent.Append("\" src=\"");
                    cartItemContent.Append(aspxTemplateFolderPath);
                    cartItemContent.Append("/images/admin/btndelete.png\"/></td></tr>");

                }
                else
                {
                    cartItemContent.Append("<tr id=\"productID_");
                    cartItemContent.Append(lstCart[index].ItemID);
                    cartItemContent.Append("\"><td class=\"cssClassName\"><a href=\"");
                    cartItemContent.Append(aspxRedirectPath);
                    cartItemContent.Append("item/");
                    cartItemContent.Append(lstCart[index].SKU + pageExtension);
                    cartItemContent.Append("\">");
                    cartItemContent.Append(lstCart[index].ItemName);
                    cartItemContent.Append("</a></td><td class=\"cssClassQty\">");
                    cartItemContent.Append(lstCart[index].Quantity);
                    cartItemContent.Append("</td><td><span class=\"cssClassFormatCurrency\">");
                    cartItemContent.Append(lstCart[index].TotalItemCost * Rate);
                    cartItemContent.Append("</span></td><td class=\"cssClassDelete\"><img class=\"imgCartItemListDelete\" name=\"");
                    cartItemContent.Append(lstCart[index].CartItemID);
                    cartItemContent.Append("\" id=\"");
                    cartItemContent.Append(lstCart[index].CartID);
                    cartItemContent.Append("\" src=\"");
                    cartItemContent.Append(aspxTemplateFolderPath);
                    cartItemContent.Append("/images/admin/btndelete.png\"/></td></tr>");
                }

            }
            cartItemContent.Append("<tr id=\"Product_total\"><td colspan=\"4\">");
            cartItemContent.Append("<span class=\"cssClassTotalPrice\">" + getLocale("Total :") +
                                   " </span><span class=\"cssClassFormatCurrency\">");
            cartItemContent.Append(TotalPrice * Rate);
            cartItemContent.Append("</span></td></tr>");
        }
        else
        {
            cartItemContent.Append("<tr><td></td></tr>");
        }
        ltrShoppingBagMini.Text = cartItemContent.ToString();
    }
    public int GetCartItemCount()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        aspxCommonObj.CustomerID = CustomerID;
        aspxCommonObj.SessionCode = SessionCode;
        int cartItemCount = AspxCommonController.GetCartItemsCount(aspxCommonObj);
        return cartItemCount;

    }

    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }
    private void loadScript()
    {

    }

    protected void Page_Init(object sender, EventArgs e)
    {

    }
}
