using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;
using AspxCommerce.Core;
using SageFrame;
using SageFrame.Framework;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxGiftCard_GiftCardsAll : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public int StoreID, PortalID, CustomerID, UserModuleID;
    public string UserName, CultureName;
    public string aspxfilePath;

    public string DefaultImagePath,
                  EnableLatestItems,
                  AllowOutStockPurchase,
                  AllowWishListLatestItem,
                  AllowAddToCompareLatest;

    public int NoOfGiftCardsAll, NoOfItemsInARow, MaxCompareItemCount;
    public string NoImageCategoryDetailPath;


    protected void page_init(object sender, EventArgs e)
    {
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            CustomerID = GetCustomerID;
            UserName = GetUsername;
            CultureName = GetCurrentCultureName;
            aspxfilePath = ResolveUrl("~") + "Modules/AspxCommerce/AspxItemsManagement/";
            IncludeCss("GirdCardAll","/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
            IncludeJs("GirdCardAll", "/js/jquery.tipsy.js");
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
            UserIp = HttpContext.Current.Request.UserHostAddress;
            IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
            ipToCountry.GetCountry(UserIp, out CountryName);
            StoreSettingConfig ssc = new StoreSettingConfig();
            DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID,
                                                         CultureName);
            NoOfGiftCardsAll =
                int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsDisplay, StoreID, PortalID, CultureName));
            EnableLatestItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableLatestItems, StoreID, PortalID, CultureName);
            AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID,
                                                              CultureName);
            MaxCompareItemCount =
                int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID, CultureName));
            NoOfItemsInARow = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfDisplayItems, StoreID, PortalID, CultureName));
            AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID,
                                                                CultureName);
            AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID,
                                                                CultureName);
            GetAllGiftCards();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private Hashtable hst = null;

    public void GetAllGiftCards()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        List<LatestItemsInfo> lstGiftItems = AspxItemMgntController.GetAllGiftCards(aspxCommonObj);
        StringBuilder GiftItems = new StringBuilder();
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
        if (lstGiftItems != null && lstGiftItems.Count > 0)
        {
            foreach (LatestItemsInfo item in lstGiftItems)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == "")
                {
                    item.ImagePath = DefaultImagePath;
                }
                if (item.AlternateText == "")
                {
                    item.AlternateText = item.Name;
                }
                if (item.AlternateImagePath == "")
                {
                    item.AlternateImagePath = item.ImagePath;
                }
                if ((lstGiftItems.IndexOf(item) + 1) % NoOfItemsInARow == 0)
                {
                    GiftItems.Append("<div class=\"cssClassProductsBox cssClassNoMargin\">");
                }
                else
                {
                     GiftItems.Append("<div class=\"cssClassProductsBox\">");
                }
                string itemPrice = Math.Round(double.Parse((item.Price).ToString()), 2).ToString();
                string itemPriceRate = Math.Round(double.Parse((item.Price*rate).ToString()), 2).ToString();

                
                var hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
                GiftItems.Append("<div id=\"productImageWrapID_");
                GiftItems.Append(item.ItemID);
                GiftItems.Append("\" class=\"cssClassProductsBoxInfo\" costvariantItem=");
                GiftItems.Append(item.IsCostVariantItem);
                GiftItems.Append("  itemid=\"");
                GiftItems.Append(item.ItemID);
                GiftItems.Append("\"><h2>");
                GiftItems.Append(item.Name);
                GiftItems.Append("</h2><h3>");
                GiftItems.Append(item.SKU);
                GiftItems.Append(
                    "</h3><div id=\"divQuickLookonHover\"><div id=\"divitemImage\" class=\"cssClassProductPicture\"><a href=\"");
                GiftItems.Append(hrefItem);
                GiftItems.Append("\" ><img id=\"");
                GiftItems.Append(item.ItemID);
                GiftItems.Append("\"  alt=\"");
                GiftItems.Append(item.AlternateText);
                GiftItems.Append("\"  title=\"");
                GiftItems.Append(item.AlternateText);
                GiftItems.Append("\" data-original=\"");
                GiftItems.Append(aspxTemplateFolderPath);
                GiftItems.Append("/images/loader_100x12.gif\" src=\"");
                GiftItems.Append(aspxRootPath);
                GiftItems.Append(imagePath.Replace("uploads", "uploads/Medium"));
                GiftItems.Append("\"></a></div>");
                if (item.HidePrice != true)
                {
                    if (item.ListPrice != null)
                    {
                        string strAmount = Math.Round((double) (item.ListPrice*rate), 2).ToString();
                        GiftItems.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                        GiftItems.Append("<p class=\"cssClassProductOffPrice\">");
                        GiftItems.Append("<span class=\"cssClassFormatCurrency\" value=");
                        GiftItems.Append(Math.Round(double.Parse(item.ListPrice.ToString()), 2).ToString());
                        GiftItems.Append(">");
                        GiftItems.Append(strAmount);
                        GiftItems.Append("</span></p><p class=\"cssClassProductRealPrice \" >");
                        GiftItems.Append("<span class=\"cssClassFormatCurrency\" value=");
                        GiftItems.Append(itemPrice);
                        GiftItems.Append(">");
                        GiftItems.Append(itemPriceRate);
                        GiftItems.Append("</span></p></div></div>");
                    }
                    else
                    {
                        GiftItems.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                        GiftItems.Append("<p class=\"cssClassProductRealPrice \" >");
                        GiftItems.Append("<span class=\"cssClassFormatCurrency\" value=");
                        GiftItems.Append(itemPrice);
                        GiftItems.Append(">");
                        GiftItems.Append(itemPriceRate);
                        GiftItems.Append("</span></p></div></div>");
                    }
                }
                else
                {
                    GiftItems.Append("<div class=\"cssClassProductPriceBox\"></div>");
                }
                GiftItems.Append("<div class=\"cssClassProductDetail\"><p><a href=\"");
                GiftItems.Append(aspxRedirectPath);
                GiftItems.Append("item/");
                GiftItems.Append(item.SKU);
                GiftItems.Append(pageExtension);
                GiftItems.Append("\">");
                GiftItems.Append(getLocale("Details"));
                GiftItems.Append("</a></p></div>");
                GiftItems.Append("<div class=\"sfQuickLook\" style=\"display:none\">");
                GiftItems.Append("<img itemId=\"");
                GiftItems.Append(item.ItemID);
                GiftItems.Append("\" sku=\"");
                GiftItems.Append(item.SKU);
                GiftItems.Append("\" src=\"");
                GiftItems.Append(aspxTemplateFolderPath);
                GiftItems.Append("/images/QV_Button.png\" rel=\"popuprel\" />");
                GiftItems.Append("</div>");
                GiftItems.Append("</div>");
                GiftItems.Append("<div class=\"sfButtonwrapper\">");
                if (AllowWishListLatestItem.ToLower() == "true")
                {
                    if (GetCustomerID > 0 && GetUsername.ToLower() != "anonymoususer")
                    {
                        GiftItems.Append("<div class=\"cssClassWishListButton\">");
                        GiftItems.Append(
                            "<button type=\"button\" id=\"addWishList\" onclick=GiftCardsAll.CheckWishListUniqueness(");
                        GiftItems.Append(item.ItemID);
                        GiftItems.Append(",'");
                        GiftItems.Append(item.SKU);
                        GiftItems.Append("',this);><span><span><span>+</span>");
                        GiftItems.Append(getLocale("Wishlist"));
                        GiftItems.Append("</span></span></button></div>");
                    }
                    else
                    {
                        GiftItems.Append("<div class=\"cssClassWishListButton\">");
                        GiftItems.Append(
                            "<button type=\"button\" id=\"addWishList\" onclick=\"AspxCommerce.RootFunction.Login();\">");
                        GiftItems.Append("<span><span><span>+</span>");
                        GiftItems.Append(getLocale("Wishlist"));
                        GiftItems.Append("</span></span></button></div>");
                    }
                }
                if (AllowAddToCompareLatest.ToLower() == "true")
                {
                    GiftItems.Append("<div class=\"cssClassCompareButton\">");
                    GiftItems.Append("<input type=\"checkbox\" id=\"compare-");
                    GiftItems.Append(item.ItemID);
                    GiftItems.Append("\" onclick=GiftCardsAll.AddItemsToCompare(");
                    GiftItems.Append(item.ItemID);
                    GiftItems.Append(",'");
                    GiftItems.Append(item.SKU);
                    GiftItems.Append("',this);><span>");
                    GiftItems.Append(getLocale("Compare"));
                    GiftItems.Append("</span></input></div>");
                }
                GiftItems.Append("</div>");
                GiftItems.Append("<div class=\"cssClassclear\"></div>");
                string itemSKU = item.SKU;
                string itemName = item.Name;
                if (AllowOutStockPurchase.ToLower() == "false")
                {
                    if (item.IsOutOfStock == true)
                    {
                        GiftItems.Append(
                            "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\">");
                        GiftItems.Append("<button type=\"button\"><span>");
                        GiftItems.Append(getLocale("Out Of Stock"));
                        GiftItems.Append("</span></button></div></div>");
                    }
                    else
                    {
                        GiftItems.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                        GiftItems.Append("<button type=\"button\" id=\"addtoCart\" title=");
                        GiftItems.Append(itemName);
                        GiftItems.Append(" onclick=GiftCardsAll.AddToCartToJS(");
                        GiftItems.Append(item.ItemID);
                        GiftItems.Append(",");
                        GiftItems.Append(itemPrice);
                        GiftItems.Append(",'");
                        GiftItems.Append(itemSKU);
                        GiftItems.Append("',");
                        GiftItems.Append(1);
                        GiftItems.Append(",this);><span><span>");
                        GiftItems.Append(getLocale("Add to cart"));
                        GiftItems.Append("</span></span></button></div></div>");
                    }
                }
                else
                {
                    GiftItems.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                    GiftItems.Append("<button type=\"button\" id=\"addtoCart\" title=");
                    GiftItems.Append(itemName);
                    GiftItems.Append(" onclick=GiftCardsAll.AddToCartToJS(");
                    GiftItems.Append(item.ItemID);
                    GiftItems.Append(",");
                    GiftItems.Append(itemPrice);
                    GiftItems.Append(",'");
                    GiftItems.Append(itemSKU);
                    GiftItems.Append("',");
                    GiftItems.Append(1);
                    GiftItems.Append(",this); ><span><span>");
                    GiftItems.Append(getLocale("Add to cart"));
                    GiftItems.Append("</span></span></button></div></div>");
                }
                GiftItems.Append("</div>");
            }
        }

        else
        {
            GiftItems.Append("<span class=\"cssClassNotFound\">");
            GiftItems.Append(getLocale("No items found!"));
            GiftItems.Append("</span>");
        }
        divGiftCards.InnerHtml = GiftItems.ToString();
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
