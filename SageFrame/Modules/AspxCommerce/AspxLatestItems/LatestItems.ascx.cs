/*
AspxCommerce® - http://www.AspxCommerce.com
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
using System.Web;
using System.Web.UI;
using SageFrame.Web;
using SageFrame.Framework;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections.Generic;
using System.Text;
using System.Collections;

public partial class Modules_AspxLatestItems_LatestItems : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public int StoreID, PortalID, CustomerID, UserModuleID;
    public string UserName, CultureName;
    public string aspxfilePath;
    public string DefaultImagePath, EnableLatestItems, AllowOutStockPurchase, AllowWishListLatestItem, AllowAddToCompareLatest;
    public int NoOfLatestItems, NoOfLatestItemsInARow, MaxCompareItemCount;
    public string LatestItemRss, RssFeedUrl;
    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {

                IncludeCss("LatestItems", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/ImageGallery/styles.css",
                       "/Templates/" + TemplateName + "/css/PopUp/style.css",
                       "/Templates/" + TemplateName + "/css/MessageBox/style.css",
                       "/Templates/" + TemplateName + "/css/FancyDropDown/fancy.css",
                       "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css", "/Templates/" + TemplateName + "/css/PopUp/popbox.css");
                IncludeJs("LatestItems", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js",
                    "/Modules/AspxCommerce/AspxLatestItems/js/LatestItems.js", "/js/jquery.tipsy.js", "/js/ImageGallery/jquery.pikachoose.js", "/js/ImageGallery/jquery.jcarousel.js", "/js/ImageGallery/jquery.mousewheel.js",
                                "/js/jDownload/jquery.jdownload.js", "/js/MessageBox/alertbox.js", "/js/DateTime/date.js", "/js/PopUp/custom.js", "/js/PopUp/popbox.js",
                               "/js/FancyDropDown/itemFancyDropdown.js",
                               "/js/jquery.masonry.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                aspxfilePath = ResolveUrl("~") + "Modules/AspxCommerce/AspxItemsManagement/";
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();

                }
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }
                if (SageUserModuleID != "")
                {
                    UserModuleID = int.Parse(SageUserModuleID);
                }
                else
                {
                    UserModuleID = 0;
                }
                //StoreSettingInfo DefaultStoreSettings = (StoreSettingInfo)Session["DefaultStoreSettings"];
                //DefaultStoreSettings.AllowAnonymousCheckOut
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);

                StoreSettingConfig ssc = new StoreSettingConfig();
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                NoOfLatestItems = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsDisplay, StoreID, PortalID, CultureName));
                EnableLatestItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableLatestItems, StoreID, PortalID, CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                MaxCompareItemCount = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID, CultureName));
                NoOfLatestItemsInARow = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsInARow, StoreID, PortalID, CultureName));
                AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
                AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID, CultureName);
                LatestItemRss = ssc.GetStoreSettingsByKey(StoreSetting.LatestItemRss, StoreID, PortalID, CultureName);
                if (LatestItemRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
            }
            IncludeLanguageJS();
            if (EnableLatestItems.ToLower() == "true" && NoOfLatestItems > 0)
            {
                GetLatestItemsByCount();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    private void GetLatestItemsByCount()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        List<LatestItemsInfo> latestItemsInfo = AspxItemMgntController.GetLatestItemsByCount(aspxCommonObj, NoOfLatestItems);
        StringBuilder RecentItemContents = new StringBuilder();
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        decimal rate = 1;
        StoreSettingConfig ssc = new StoreSettingConfig();
        decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName));
        string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
        if (HttpContext.Current.Session["CurrencyRate"] != null)
        {
            if (Session["CurrencyCode"].ToString() != MainCurrency)
            {
                decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                rate = Math.Round(rate1 + (rate1 * additionalCCVR / 100), 4);
            }
            else
            {
                rate = decimal.Parse(Session["CurrencyRate"].ToString());
            }
        }
        if (latestItemsInfo != null && latestItemsInfo.Count > 0)
        {
            foreach (LatestItemsInfo item in latestItemsInfo)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                string altImagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.AlternateImagePath;
                if (item.ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                if (item.AlternateText == "")
                {
                    item.AlternateText = item.Name;
                }
                if (item.AlternateImagePath == "")
                {
                    altImagePath = imagePath;
                }
                string itemPrice = Math.Round(double.Parse((item.Price).ToString()), 2).ToString();
                string itemPriceRate = Math.Round(double.Parse((item.Price * rate).ToString()), 2).ToString();

                RecentItemContents.Append("<div class=\"cssClassProductsBox\">");
                var hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
                RecentItemContents.Append("<div id=\"productImageWrapID_");
                RecentItemContents.Append(item.ItemID);
                RecentItemContents.Append("\" class=\"cssClassProductsBoxInfo\" costvariantItem=");
                RecentItemContents.Append(item.IsCostVariantItem);
                RecentItemContents.Append("  itemid=\"");
                RecentItemContents.Append(item.ItemID);
                RecentItemContents.Append("\"><a href=\"");
                RecentItemContents.Append(hrefItem);
                RecentItemContents.Append("\" title=\"" + item.Name + "\"><h2>");
                string name = string.Empty;
                if (item.Name.Length > 50)
                {
                    name = item.Name.Substring(0, 50);
                    int index = 0;
                    index = name.LastIndexOf(' ');
                    name = name.Substring(0, index);
                    name = name + "...";
                }
                else
                {
                    name = item.Name;
                }
                RecentItemContents.Append(name);
                RecentItemContents.Append("</h2></a><h3>");
                RecentItemContents.Append(item.SKU);
                RecentItemContents.Append("</h3><div class=\"divQuickLookonHover\"><div class=\"divitemImage cssClassProductPicture\"><a href=\"");
                RecentItemContents.Append(hrefItem);
                RecentItemContents.Append("\" ><img id=\"img_");
                RecentItemContents.Append(item.ItemID);
                RecentItemContents.Append("\"  alt=\"");
                RecentItemContents.Append(item.AlternateText);
                RecentItemContents.Append("\"  title=\"");
                RecentItemContents.Append(item.AlternateText);
                RecentItemContents.Append("\"");
                RecentItemContents.Append("src=\"");
                RecentItemContents.Append(aspxRootPath);
                RecentItemContents.Append(imagePath.Replace("uploads", "uploads/Medium"));
                RecentItemContents.Append("\" orignalPath=\"");
                RecentItemContents.Append(imagePath.Replace("uploads", "uploads/Medium"));
                RecentItemContents.Append("\" altImagePath=\"");
                RecentItemContents.Append(altImagePath.Replace("uploads", "uploads/Medium"));
                //RecentItemContents.Append("\" onmouseover='SwapImageOnMouseOver(this.id,\"");
                //RecentItemContents.Append(aspxRootPath);
                //RecentItemContents.Append(item.AlternateImagePath.Replace("uploads", "uploads/Medium"));
                //RecentItemContents.Append("\")' onmouseout='SwapImageOnMouseOut(this.id,\"");
                //RecentItemContents.Append(aspxRootPath);
                //RecentItemContents.Append(item.ImagePath.Replace("uploads", "uploads/Medium"));
                RecentItemContents.Append("\"/></a></div>");

                if (item.HidePrice != true)
                {
                    if (item.ListPrice != null)
                    {
                        string strAmount = Math.Round((double)(item.ListPrice * rate), 2).ToString();
                        RecentItemContents.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                        RecentItemContents.Append("<p class=\"cssClassProductOffPrice\">");
                        //RecentItemContents.Append(getLocale("Regular Price :"));
                        RecentItemContents.Append("<span class=\"cssClassFormatCurrency\" value=\"");
                        RecentItemContents.Append(Math.Round(double.Parse(item.ListPrice.ToString()), 2).ToString());
                        RecentItemContents.Append("\">");
                        RecentItemContents.Append(strAmount);
                        RecentItemContents.Append("</span></p><p class=\"cssClassProductRealPrice \" >");
                        //RecentItemContents.Append(getLocale("Our Offer :"));
                        RecentItemContents.Append("<span class=\"cssClassFormatCurrency\" value=\"");
                        RecentItemContents.Append(itemPrice);
                        RecentItemContents.Append("\">");
                        RecentItemContents.Append(itemPriceRate);
                        RecentItemContents.Append("</span></p></div></div>");
                    }
                    else
                    {
                        RecentItemContents.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                        RecentItemContents.Append("<p class=\"cssClassProductRealPrice \" >");
                        //RecentItemContents.Append(getLocale("Our Offer :"));
                        RecentItemContents.Append("<span class=\"cssClassFormatCurrency\" value=\"");
                        RecentItemContents.Append(itemPrice);
                        RecentItemContents.Append("\">");
                        RecentItemContents.Append(itemPriceRate);
                        RecentItemContents.Append("</span></p></div></div>");
                    }
                }
                else
                {
                    RecentItemContents.Append("<div class=\"cssClassProductPriceBox\"></div>");
                }
                RecentItemContents.Append("<div class=\"cssClassProductDetail\"><p><a href=\"");
                RecentItemContents.Append(aspxRedirectPath);
                RecentItemContents.Append("item/");
                RecentItemContents.Append(item.SKU);
                RecentItemContents.Append(pageExtension);
                RecentItemContents.Append("\">");
                RecentItemContents.Append(getLocale("Details"));
                RecentItemContents.Append("</a></p></div>");

                RecentItemContents.Append("<div class=\"sfQuickLook\" style=\"display:none\">");
                RecentItemContents.Append("<img itemId=\"");
                RecentItemContents.Append(item.ItemID);
                RecentItemContents.Append("\" sku=\"");
                RecentItemContents.Append(item.SKU);
                RecentItemContents.Append("\" src=\"");
                RecentItemContents.Append(aspxTemplateFolderPath);
                RecentItemContents.Append("/images/QV_Button.png\" alt=\"\" rel=\"popuprel\" />");
                RecentItemContents.Append("</div>");
                RecentItemContents.Append("</div>");

                RecentItemContents.Append("<div class=\"sfButtonwrapper\">");
                if (AllowWishListLatestItem.ToLower() == "true")
                {
                    if (GetCustomerID > 0 && GetUsername.ToLower() != "anonymoususer")
                    {
                        RecentItemContents.Append("<div class=\"cssClassWishListButton\">");
                        RecentItemContents.Append("<button type=\"button\" class=\"addWishList\" onclick=\"LatestItems.CheckWishListUniqueness(");
                        RecentItemContents.Append(item.ItemID);
                        RecentItemContents.Append(",'");
                        RecentItemContents.Append(item.SKU);
                        RecentItemContents.Append("',this);\"><span><span><span>+</span>");
                        RecentItemContents.Append(getLocale("Wishlist"));
                        RecentItemContents.Append("</span></span></button></div>");
                    }
                    else
                    {
                        RecentItemContents.Append("<div class=\"cssClassWishListButton\">");
                        RecentItemContents.Append("<button type=\"button\" class=\"addWishList\" onclick=\"AspxCommerce.RootFunction.Login();\">");
                        RecentItemContents.Append("<span><span><span>+</span>");
                        RecentItemContents.Append(getLocale("Wishlist"));
                        RecentItemContents.Append("</span></span></button></div>");
                    }
                }
                //RecentItemContents+="<input type=\"button\" id=\"addWishList\" value=\"Add To Wishlist\" onclick='AddToWishList(" + item.ItemID + ");'/>";
                //RecentItemContents += "<div class=\"cssClassWishListDetail\"><p><a href='addtowishlist.aspx?itemId="+ item.ItemID + "'>Add to Wishlist</a></p>";
                if (AllowAddToCompareLatest.ToLower() == "true")
                {
                    RecentItemContents.Append("<div class=\"cssClassCompareButton\">");
                    RecentItemContents.Append("<label><input type=\"checkbox\" id=\"compare-");
                    RecentItemContents.Append(item.ItemID);
                    RecentItemContents.Append("\" onclick=\"LatestItems.AddItemsToCompare(");
                    RecentItemContents.Append(item.ItemID);
                    RecentItemContents.Append(",'");
                    RecentItemContents.Append(item.SKU);
                    RecentItemContents.Append("',this);\"/><span>");
                    RecentItemContents.Append(getLocale("Compare"));
                    RecentItemContents.Append("</span></label></div>");
                }
                RecentItemContents.Append("</div>");
                RecentItemContents.Append("<div class=\"cssClassclear\"></div>");
                string itemSKU = item.SKU;
                string itemName = item.Name;
                if (AllowOutStockPurchase.ToLower() == "false")
                {
                    if (item.IsOutOfStock == true)
                    {

                        RecentItemContents.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\">");
                        RecentItemContents.Append("<button type=\"button\"><span>");
                        RecentItemContents.Append(getLocale("Out Of Stock"));
                        RecentItemContents.Append("</span></button></div></div>");
                    }
                    else
                    {
                        // RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><a href=\"#\" title=" + itemName + "  onclick='LatestItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span>Add to cart</span></a></div></div>";
                        RecentItemContents.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                        RecentItemContents.Append("<button type=\"button\" class=\"addtoCart\" title=\"");
                        RecentItemContents.Append(itemName);
                        RecentItemContents.Append("\" onclick=\"LatestItems.AddToCartToJS(");
                        RecentItemContents.Append(item.ItemID);
                        RecentItemContents.Append(",");
                        RecentItemContents.Append(itemPrice);
                        RecentItemContents.Append(",'");
                        RecentItemContents.Append(itemSKU);
                        RecentItemContents.Append("',");
                        RecentItemContents.Append(1);
                        RecentItemContents.Append(",this);\"><span><span>");
                        RecentItemContents.Append(getLocale("Add to cart"));
                        RecentItemContents.Append("</span></span></button></div></div>");
                    }
                }
                else
                {
                    RecentItemContents.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                    RecentItemContents.Append("<button type=\"button\" class=\"addtoCart\" title=\"");
                    RecentItemContents.Append(itemName);
                    RecentItemContents.Append("\" onclick=\"LatestItems.AddToCartToJS(");
                    RecentItemContents.Append(item.ItemID);
                    RecentItemContents.Append(",");
                    RecentItemContents.Append(itemPrice);
                    RecentItemContents.Append(",'");
                    RecentItemContents.Append(itemSKU);
                    RecentItemContents.Append("',");
                    RecentItemContents.Append(1);
                    RecentItemContents.Append(",this);\"><span><span>");
                    RecentItemContents.Append(getLocale("Add to cart"));
                    RecentItemContents.Append("</span></span></button></div></div>");

                }
                RecentItemContents.Append("</div>");
            }
        }

        else
        {
            RecentItemContents.Append("<span class=\"cssClassNotFound\">");
            RecentItemContents.Append(getLocale("This store has no items listed yet!"));
            RecentItemContents.Append("</span>");
        }
        tblRecentItems.InnerHtml = RecentItemContents.ToString();
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
