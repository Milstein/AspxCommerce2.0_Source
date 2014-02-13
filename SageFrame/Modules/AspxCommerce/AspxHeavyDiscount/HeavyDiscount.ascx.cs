using System;
using System.Web;
using SageFrame.Web;
using SageFrame.Framework;
using AspxCommerce.Core;
using System.Collections.Generic;
using System.Collections;
using System.Text;


public partial class HeavyDiscount : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName,EnableModule;
    AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    public decimal Rate = 1;
    public string modulePath, aspxTemplateFolderPath, aspxRootPath, pageExtension;
    public string DefaultImagePath,
                  EnableHeavyDiscountItems,
                  AllowOutStockPurchase,
                  AllowWishListHeavyDIscountItem,
                  AllowAddToCompareHeavyDiscount, ModuleServicePath;

    public int MaxCompareItemCount, NoOfItemShown;
    public string HeavyDiscountItemRss, RssFeedUrl;

    protected void Page_Init(object sender, EventArgs e)
    {
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                ModuleServicePath = ResolveUrl(AppRelativeTemplateSourceDirectory);
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID;
                }
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);
                StoreSettingConfig ssc = new StoreSettingConfig();
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                aspxCommonObj.StoreID = StoreID;
                aspxCommonObj.PortalID = PortalID;
                aspxCommonObj.UserName = UserName;
                aspxCommonObj.CultureName = CultureName;
                modulePath = this.AppRelativeTemplateSourceDirectory;
                aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
                aspxRootPath = ResolveUrl("~/");
                pageExtension = SageFrameSettingKeys.PageExtension;
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                AllowWishListHeavyDIscountItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
                AllowAddToCompareHeavyDiscount = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID, CultureName);
                MaxCompareItemCount = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID, CultureName));
                HeavyDiscountItemRss = ssc.GetStoreSettingsByKey(StoreSetting.HeavyDiscountItemRss, StoreID, PortalID, CultureName);
                if (HeavyDiscountItemRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
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
                IncludeCss("HeavyDiscountItems", "/Templates" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("HeavyDiscountItems", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js", "/js/CurrencyFormat/jquery.formatCurrency.all.js", "/Modules/AspxCommerce/AspxHeavyDiscount/js/HeavyDiscount.js","/js/jquery.tipsy.js");

            }
            GetHeavyDiscountSetting();
            IncludeLanguageJS();

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }

    }
    Hashtable hst = null;
    public void GetHeavyDiscountSetting()
    {
        HeavyDiscountSettingInfo objHDSetting = AspxHeavyDiscountController.GetHeavyDiscountSetting(aspxCommonObj);
        NoOfItemShown = objHDSetting.NoOfItemShown;
        EnableModule = objHDSetting.EnableModule;
        EnableHeavyDiscountItems = EnableModule;
        if (EnableModule.ToLower() == "true")
        {
            GetHeavyDiscountItems();
        }


    }
    public void GetHeavyDiscountItems()
    {

        hst = AppLocalized.getLocale(modulePath);
        List<HeavyDiscountInfo> lstHeavyDiscount = AspxHeavyDiscountController.GetHeavyDiscountItems(aspxCommonObj, 1, NoOfItemShown);
        StringBuilder heavyDiscountContent = new StringBuilder();
        if (lstHeavyDiscount != null && lstHeavyDiscount.Count > 0)
        {
            int rowTotal = 0;

            for (int index = 0; index < lstHeavyDiscount.Count; index++)
            {
                rowTotal = lstHeavyDiscount[index].RowTotal;
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + lstHeavyDiscount[index].ImagePath;
                if (lstHeavyDiscount[index].ImagePath == null || lstHeavyDiscount[index].ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                if (lstHeavyDiscount[index].AlternateText == "")
                {
                    lstHeavyDiscount[index].AlternateText = lstHeavyDiscount[index].Name;
                }
                string hrefItem = aspxRedirectPath + "item/" + lstHeavyDiscount[index].SKU + pageExtension;
                if ((index + 1) % NoOfItemShown == 0)
                {
                    heavyDiscountContent.Append("<div class=\"cssClassProductsBox cssClassProductsBoxNoMargin\">");
                }
                else
                {
                    heavyDiscountContent.Append("<div class=\"cssClassProductsBox\">");
                }
                decimal variantAddedSavingPercent = ((lstHeavyDiscount[index].ListPrice * Rate) - (lstHeavyDiscount[index].Price * Rate)) / (lstHeavyDiscount[index].ListPrice * Rate) * 100;
                decimal savPrice = Math.Round(variantAddedSavingPercent, 0);
                heavyDiscountContent.Append("<div id=\"hproductImageWrapID_");
                heavyDiscountContent.Append(lstHeavyDiscount[index].ItemID);
                heavyDiscountContent.Append("\" class=\"cssClassProductsBoxInfo\" costvariantItem=\"");
                heavyDiscountContent.Append(lstHeavyDiscount[index].IsCostVariantItem);
                heavyDiscountContent.Append("\" itemid=\"");
                heavyDiscountContent.Append(lstHeavyDiscount[index].ItemID + "\">");
                heavyDiscountContent.Append("<h2><a href=\"");
                heavyDiscountContent.Append(hrefItem);
                heavyDiscountContent.Append("\" title=\"" + lstHeavyDiscount[index].Name + "\">");
                string name = string.Empty;
                if (lstHeavyDiscount[index].Name.Length > 50)
                {
                    name = lstHeavyDiscount[index].Name.Substring(0, 50);
                    int i = 0;
                    i = name.LastIndexOf(' ');
                    name = name.Substring(0, i);
                    name = name + "...";
                }
                else
                {
                    name = lstHeavyDiscount[index].Name;
                }
                heavyDiscountContent.Append(name);
                heavyDiscountContent.Append("</a></h2><h3>");
                heavyDiscountContent.Append(lstHeavyDiscount[index].SKU);
                heavyDiscountContent.Append("</h3><div class=\"cssClassYouSave\"><span class=\"spanSaving\"><b>");
                heavyDiscountContent.Append(savPrice);
                heavyDiscountContent.Append("%</b>" + getLocale("Off") + "</span></div>");
                heavyDiscountContent.Append("<div class=\"cssClassProductPicture\"><a href=\"");
                heavyDiscountContent.Append(hrefItem);
                heavyDiscountContent.Append("\"><img alt=\"");
                heavyDiscountContent.Append(lstHeavyDiscount[index].AlternateText);
                heavyDiscountContent.Append("\" title=\"");
                heavyDiscountContent.Append(lstHeavyDiscount[index].AlternateText);
                heavyDiscountContent.Append("\"  src=\"");
                heavyDiscountContent.Append(aspxRootPath);
                heavyDiscountContent.Append(imagePath.Replace("uploads", "uploads/Medium"));
                heavyDiscountContent.Append("\"></a></div>");

                if (!(bool)lstHeavyDiscount[index].HidePrice)
                {
                    heavyDiscountContent.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                    heavyDiscountContent.Append("<p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=\"");
                    heavyDiscountContent.Append(Math.Round(lstHeavyDiscount[index].ListPrice, 2));
                    heavyDiscountContent.Append("\">");
                    heavyDiscountContent.Append(Math.Round((lstHeavyDiscount[index].ListPrice * Rate), 2));
                    heavyDiscountContent.Append("</span></p><p class=\"cssClassProductRealPrice\"><span class=\"cssClassFormatCurrency\" value=\"");
                    heavyDiscountContent.Append(Math.Round(lstHeavyDiscount[index].Price, 2));
                    heavyDiscountContent.Append("\">");
                    heavyDiscountContent.Append(Math.Round((lstHeavyDiscount[index].Price * Rate), 2));
                    heavyDiscountContent.Append("</span></p></div></div>");
                }
                else
                {
                    heavyDiscountContent.Append("<div class=\"cssClassProductPriceBox\"></div>");
                }
                heavyDiscountContent.Append("<div class=\"cssClassProductDetail\"><p><a href=\"");
                heavyDiscountContent.Append(aspxRedirectPath);
                heavyDiscountContent.Append("item/");
                heavyDiscountContent.Append(lstHeavyDiscount[index].SKU + pageExtension);
                heavyDiscountContent.Append("\">Details</a></p></div>");
                heavyDiscountContent.Append("<div class=\"sfButtonwrapper\">");
                //if (AllowWishListHeavyDIscountItem.ToLower() == "true")
                //{

                //    if (aspxCommonObj.CustomerID > 0 && aspxCommonObj.UserName.ToLower() != "anonymoususer")
                //    {
                //        heavyDiscountContent.Append("<div class=\"cssClassWishListButton\">");
                //        heavyDiscountContent.Append("<button type=\"button\" id=\"addWishList\" onclick=\"HeavyDiscountItems.CheckWishListUniqueness(");
                //        heavyDiscountContent.Append(lstHeavyDiscount[index].ItemID);
                //        heavyDiscountContent.Append(");\"><span><span><span>+</span>Wishlist</span></span></button></div>");

                //    }
                //    else
                //    {
                //        heavyDiscountContent.Append("<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick=\"AspxCommerce.RootFunction.Login();\">");
                //        heavyDiscountContent.Append("<span><span><span>+</span>Wishlist</span></span></button></div>");
                //    }
                //}
                //if (AllowAddToCompareHeavyDiscount.ToLower() == "true")
                //{
                //    heavyDiscountContent.Append("<div class=\"cssClassCompareButton\"><button type=\"button\" id=\"btnAddCompare\" onclick=\"HeavyDiscountItems.AddItemsToCompare(");
                //    heavyDiscountContent.Append(lstHeavyDiscount[index].ItemID);
                //    heavyDiscountContent.Append(");\"><span><span><span>+</span>Compare</span></span></button></div>");
                //}
                heavyDiscountContent.Append("</div><div class=\"cssClassclear\"></div>");

                if (AllowOutStockPurchase.ToLower() == "false")
                {
                    if ((bool)lstHeavyDiscount[index].IsOutOfStock)
                    {
                        heavyDiscountContent.Append(
                            "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><button type=\"button\"><span>" +
                            getLocale("Out Of Stock") + "</span></button></div></div>");
                    }
                    else
                    {
                        heavyDiscountContent.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" title=\"");
                        heavyDiscountContent.Append(lstHeavyDiscount[index].Name);
                        heavyDiscountContent.Append("\" onclick=\"HeavyDiscountItems.AddToCartToJS(");
                        heavyDiscountContent.Append(lstHeavyDiscount[index].ItemID + ",");
                        heavyDiscountContent.Append(Math.Round(lstHeavyDiscount[index].Price, 2) + ",");
                        heavyDiscountContent.Append("'" + lstHeavyDiscount[index].SKU + "'" + "," + 1);
                        heavyDiscountContent.Append(");\"><span><span>" + getLocale("Add To Cart") +
                                                    "</span></span></button></div></div>");
                    }
                }
                else
                {
                    heavyDiscountContent.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" title=\"");
                    heavyDiscountContent.Append(lstHeavyDiscount[index].Name);
                    heavyDiscountContent.Append("\" onclick=\"HeavyDiscountItems.AddToCartToJS(");
                    heavyDiscountContent.Append(lstHeavyDiscount[index].ItemID + ",");
                    heavyDiscountContent.Append(Math.Round(lstHeavyDiscount[index].Price, 2) + ",");
                    heavyDiscountContent.Append("'" + lstHeavyDiscount[index].SKU + "'" + "," + 1);
                    heavyDiscountContent.Append(");\"><span><span>"+getLocale("Add To Cart")+"</span></span></button></div></div>");
                }
                heavyDiscountContent.Append("</div>");

            }
            if (rowTotal > NoOfItemShown)
            {
                heavyDiscountContent.Append("<div id=\"divViewMoreExplored\" class=\"cssClassViewMore\"><a href=\"");
                heavyDiscountContent.Append(aspxRedirectPath + "Details-View" + pageExtension);
                heavyDiscountContent.Append("?id=heavy\">"+getLocale("View More")+"</a></div>");
            }
        }
        else
        {
            heavyDiscountContent.Append("<span class=\"cssClassNotFound\">" +
                                        getLocale("This store has no items listed yet!") + "</span>");
        }
        heavyDiscontHeader.InnerHtml = getLocale("Heavy Discount");
        ltrHeavyDiscount.Text = heavyDiscountContent.ToString();
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
