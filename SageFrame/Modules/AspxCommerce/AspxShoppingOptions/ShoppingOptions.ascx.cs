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

public partial class Modules_AspxShoppingOptions_ShoppingOptions : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName, ShoppingOptionRange;
    public int? BrandCount = 0;
    AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    public string modulePath, aspxTemplateFolderPath, aspxRootPath, pageExtension;
    public decimal Rate = 1;
    public string IdsByPrice = string.Empty;
    public string ArryPrice = string.Empty;
    public decimal minPrice = 0;
    public decimal maxPrice = 0;
    public string ModuleCollapsible;
    protected void Page_Init(object sender, EventArgs e)
    {
        //Page.ClientScript.RegisterClientScriptInclude("cookies", ResolveUrl("~/js/jquery.cookie.js"));
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            StoreSettingConfig ssc = new StoreSettingConfig();
            if (!IsPostBack)
            {
                IncludeCss("ShoppingOptionsCss", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery-ui.css", "/Templates/" + TemplateName + "/css/Scroll/tinyscroll.css", "/Templates/" + TemplateName + "/css/JQueryCheckBox/uniform.default.css");
                IncludeJs("ShoppingOptionsJs", "/Modules/AspxCommerce/AspxShoppingOptions/js/ShoppingOptions.js", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js", "/js/CurrencyFormat/jquery.formatCurrency.all.js", "/js/jquery.cookie.js", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/Scroll/jquery.tinyscrollbar.min.js", "/js/JQueryCheckBox/jquery.uniform.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                ShoppingOptionRange = ssc.GetStoreSettingsByKey(StoreSetting.ShoppingOptionRange, StoreID, PortalID, CultureName);
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);
            }
            aspxCommonObj.StoreID = StoreID;
            aspxCommonObj.PortalID = PortalID;
            aspxCommonObj.UserName = UserName;
            aspxCommonObj.CultureName = CultureName;
            decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName));
            string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName);
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
       
            modulePath = this.AppRelativeTemplateSourceDirectory;
            aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
            aspxRootPath = ResolveUrl("~/");
            pageExtension = SageFrameSettingKeys.PageExtension;
            IncludeLanguageJS();
            GetAllBrand();
            GetShoppingOptionsByPrice();
            GetShoppingOptionForSlider();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    public void GetAllBrand()
    {
        hst = AppLocalized.getLocale(modulePath);
        List<BrandItemsInfo> lstBrand = AspxShopOptionController.ShoppingOptionsByBrand(aspxCommonObj);
        BrandCount = lstBrand.Count;
        StringBuilder brandContent = new StringBuilder();
        if (lstBrand != null && lstBrand.Count > 0)
        {
            StringBuilder brandHeader = new StringBuilder();
            brandHeader.Append("<div class=\"divTitle\"><b><label class=\"cssClassShoppingOptionByPrice\" style=\"color:#006699\">");
            brandHeader.Append(getLocale("By Brand"));
            brandHeader.Append("</label></b><img align=\"right\" alt=\"\" title=\"\" src=\"");
            brandHeader.Append(aspxTemplateFolderPath);
            brandHeader.Append("/images/arrow_up.png\"/></div>");
            ltrBrandHeader.Text = brandHeader.ToString();
            brandContent.Append("<ul class=\"cssShoppingBrand\">");
            foreach (BrandItemsInfo item in lstBrand)
            {
                brandContent.Append("<li><label><input type=\"checkbox\" class=\"chkShopByBrand\" name=\"");
                brandContent.Append(item.BrandName);
                brandContent.Append("\" value=\"");
                brandContent.Append(item.BrandID);
                brandContent.Append("\"/><span>");
                brandContent.Append(item.BrandName);
                brandContent.Append("&nbsp;(" + item.ItemCount + ")");
                brandContent.Append("</span></label></li>");
            }
            brandContent.Append("</ul>");
            if (lstBrand.Count > 7)
            {
                ltrBrandScroll.Text = brandContent.ToString();
            }
            else if (lstBrand.Count <= 7)
            {
                ltrBrandList.Text = brandContent.ToString();
            }
        }
        else
        {
            StringBuilder noBrandItems = new StringBuilder();
            noBrandItems.Append("<div class=\"divTitle\"><b><label class=\"cssClassShoppingOptionByPrice\" style=\"color:#006699\">");
            noBrandItems.Append(getLocale("By Brand"));
            noBrandItems.Append("</label></b><img align=\"right\" src=\"");
            noBrandItems.Append(aspxTemplateFolderPath);
            noBrandItems.Append("/images/arrow_up.png\"/></div>");
            noBrandItems.Append("<div id=\"divBrandNotFound\"><span class=\"cssClassNotFound\">");
            noBrandItems.Append(getLocale("There is no any Brand!"));
            noBrandItems.Append("</span></div>");
            ltrBrandList.Text = noBrandItems.ToString();
        }

    }
    public void GetShoppingOptionsByPrice()
    {
        hst = AppLocalized.getLocale(modulePath);
        List<ShoppingOptionsInfo> lstShoppingOptionByprc = AspxShopOptionController.ShoppingOptionsByPrice(aspxCommonObj, Convert.ToInt32(ShoppingOptionRange));
        StringBuilder divTitle = new StringBuilder();
        divTitle.Append("<b><label class=\"cssClassShoppingOptionByPrice\" style=\"color:#006699\">");
        divTitle.Append(getLocale("By Price"));
        divTitle.Append("</label></b><img align=\"right\" src=\"");
        divTitle.Append(aspxTemplateFolderPath);
        divTitle.Append("/images/arrow_up.png\"/>");
        ltrByPriceTitle.Text = divTitle.ToString();
        StringBuilder shopOptionByPrc = new StringBuilder();
        if (lstShoppingOptionByprc != null && lstShoppingOptionByprc.Count > 0)
        {
            shopOptionByPrc.Append("<table id=\"tblShoppingOptionsByPrice\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
            shopOptionByPrc.Append("<tbody>");

            for (int index = 0; index < lstShoppingOptionByprc.Count; index++)
            {
                if (index != 0)
                {
                    if (index != lstShoppingOptionByprc.Count - 1)
                    {
                        if (index % 2 == 0)
                        {
                            shopOptionByPrc.Append("<tr class=\"sfEven\"><td><a onclick=\"ShopingOptions.ShoppingByPriceAndBrand(");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption);
                            shopOptionByPrc.Append(",");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption);
                            shopOptionByPrc.Append(");\" href=\"#\">");
                            shopOptionByPrc.Append("<span class=\"cssClassFormatCurrency\">");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption * Rate);
                            shopOptionByPrc.Append("</span> - <span class=\"cssClassFormatCurrency\">");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption * Rate);
                            shopOptionByPrc.Append("</span> (");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].Count);
                            shopOptionByPrc.Append(")</a></td></tr>");


                        }
                        else
                        {
                            shopOptionByPrc.Append("<tr class=\"sfEven\"><td><a onclick=\"ShopingOptions.ShoppingByPriceAndBrand(");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption);
                            shopOptionByPrc.Append(",");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption);
                            shopOptionByPrc.Append(");\" href=\"#\">");
                            shopOptionByPrc.Append("<span class=\"cssClassFormatCurrency\">");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption * Rate);
                            shopOptionByPrc.Append("</span> - <span class=\"cssClassFormatCurrency\">");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption * Rate);
                            shopOptionByPrc.Append("</span> (");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].Count);
                            shopOptionByPrc.Append(")</a></td></tr>");
                        }
                    }
                    else
                    {

                        if (index % 2 == 0)
                        {
                            shopOptionByPrc.Append("<tr class=\"sfEven\"><td><a onclick=\"ShopingOptions.ShoppingByPriceAndBrand(");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption);
                            shopOptionByPrc.Append(",");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption);
                            shopOptionByPrc.Append(");\" href=\"#\">");
                            shopOptionByPrc.Append("<span> ");
                            shopOptionByPrc.Append(getLocale("Above"));
                            shopOptionByPrc.Append(" </span><span class=\"cssClassFormatCurrency\">");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption * Rate);
                            shopOptionByPrc.Append("</span> (");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].Count);
                            shopOptionByPrc.Append(")</a></td></tr>");


                        }
                        else
                        {
                            shopOptionByPrc.Append("<tr class=\"sfEven\"><td><a onclick=\"ShopingOptions.ShoppingByPriceAndBrand(");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption);
                            shopOptionByPrc.Append(",");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption);
                            shopOptionByPrc.Append(");\" href=\"#\">");
                            shopOptionByPrc.Append("<span> ");
                            shopOptionByPrc.Append(getLocale("Above"));
                            shopOptionByPrc.Append(" </span><span class=\"cssClassFormatCurrency\">");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption * Rate);
                            shopOptionByPrc.Append("</span> (");
                            shopOptionByPrc.Append(lstShoppingOptionByprc[index].Count);
                            shopOptionByPrc.Append(")</a></td></tr>");
                        }

                    }
                }
                else
                {
                    shopOptionByPrc.Append("<tr class=\"sfEven\"><td><a onclick=\"ShopingOptions.ShoppingByPriceAndBrand(");
                    shopOptionByPrc.Append(lstShoppingOptionByprc[index].LowerOption);
                    shopOptionByPrc.Append(",");
                    shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption);
                    shopOptionByPrc.Append(");\" href=\"#\">");
                    shopOptionByPrc.Append("<span> ");
                    shopOptionByPrc.Append(getLocale("Below"));
                    shopOptionByPrc.Append(" </span><span class=\"cssClassFormatCurrency\">");
                    shopOptionByPrc.Append(lstShoppingOptionByprc[index].UpperOption * Rate);
                    shopOptionByPrc.Append("</span> (");
                    shopOptionByPrc.Append(lstShoppingOptionByprc[index].Count);
                    shopOptionByPrc.Append(")</a></td></tr>");


                }
            }

        }
        else
        {
            shopOptionByPrc.Append("<tr><td><span class=\"cssClassNotFound\">");
            shopOptionByPrc.Append(getLocale("No Data Found!"));
            shopOptionByPrc.Append("</span></td></tr>");
        }
        shopOptionByPrc.Append("</tbody></table>");
        ltrShopByPrice.Text = shopOptionByPrc.ToString();


    }
    public void GetShoppingOptionForSlider()
    {
        hst = AppLocalized.getLocale(modulePath);
        List<ShoppingOptionInfoForSlider> lstShopOpt = AspxShopOptionController.ShoppingOptionForSlider(aspxCommonObj);
        StringBuilder brandContent = new StringBuilder();
        ArrayList arrPrice = new ArrayList();
        List<string> priceList = new List<string>();
        if (lstShopOpt != null && lstShopOpt.Count > 0)
        {
            foreach (ShoppingOptionInfoForSlider item in lstShopOpt)
            {
                arrPrice.Add(item);
                priceList.Add(item.Price.ToString());
                if (item.Price > maxPrice)
                {
                    maxPrice = item.Price;
                }
                if (item.Price < minPrice || minPrice == 0)
                {
                    minPrice = item.Price;
                }

            }
            foreach (ShoppingOptionInfoForSlider value in arrPrice)
            {
                if (value.Price >= minPrice && value.Price <= maxPrice)
                {
                    IdsByPrice += value.ItemID + ",";
                }

            }
            IdsByPrice = IdsByPrice.Substring(0, IdsByPrice.LastIndexOf(","));
            ArryPrice = string.Join(",", priceList.ToArray());
        }
        else
        {

        }
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
}
