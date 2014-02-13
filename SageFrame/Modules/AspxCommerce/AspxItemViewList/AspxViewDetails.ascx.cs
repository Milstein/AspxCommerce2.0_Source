using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Framework;
using SageFrame;

public partial class Modules_AspxCommerce_AspxViewDetails_AspxViewDetails : BaseAdministrationUserControl
{
    public string SessionCode = string.Empty;
    public string AllowOutStockPurchase, allowWishListItemDetails, NoImageCategoryDetailPath, SortByOptions, SortByOptionDefault;
    public string modulePath = string.Empty;
    private AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    public int ArrayLength = 0;
    public int RowTotal = 0;
    private Hashtable hst = null;
    private const int limit = 8;
    private const int offset = 1;
    private const int sortBy = 1;
    public string VarFunction = string.Empty;
    public string ServiceItemDetailPage = string.Empty;
    public decimal rate = 1;
    protected void Page_Load(object sender, EventArgs e)
    {
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        if (HttpContext.Current.Session.SessionID != null)
        {
            SessionCode = HttpContext.Current.Session.SessionID.ToString();
        }
        if (HttpContext.Current.Session["CurrencyRate"] != null)
        {
            rate = decimal.Parse(Session["CurrencyRate"].ToString());
        }
        StoreSettingConfig ssc = new StoreSettingConfig();
        AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, aspxCommonObj.StoreID,
                                                          aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        allowWishListItemDetails = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, aspxCommonObj.StoreID,
                                                             aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        NoImageCategoryDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, aspxCommonObj.StoreID,
                                                              aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        ServiceItemDetailPage = ssc.GetStoreSettingsByKey(StoreSetting.SeviceItemDetailURL, aspxCommonObj.StoreID,
                                                          aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        SortByOptions = ssc.GetStoreSettingsByKey(StoreSetting.SortByOptions, aspxCommonObj.StoreID,
                                                  aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        SortByOptionDefault = ssc.GetStoreSettingsByKey(StoreSetting.SortByOptionsDefault, aspxCommonObj.StoreID,
                                                        aspxCommonObj.PortalID, aspxCommonObj.CultureName);

        if (!IsPostBack)
        {
            IncludeCss("AspxViewDetails", "/Templates/" + TemplateName + "/css/ToolTip/ToolTip.css");
            IncludeJs("AspxViewDetails", "/Modules/AspxCommerce/AspxItemViewList/js/ViewDetail.js", "/js/SageFrameCorejs/ItemViewList.js", "/js/jquery.tipsy.js", "/js/FancyDropDown/itemFancyDropdown.js", "/js/Paging/jquery.pagination.js");
            SortByList();

        }
        InitializeJS();
        IncludeLanguageJS();
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J123", ResolveUrl("~/js/encoder.js"));
    }

    private void SortByList()
    {
        StringBuilder itemViewListSortByBdl = new StringBuilder();
        itemViewListSortByBdl.Append("<h4 class=\"sfLocale\">Sort by:</h4><select id=\"ddlSortItemDetailBy\" class=\"sfListmenu\">");
        SortByOptions = SortByOptions.TrimEnd(',');
        if (SortByOptions != "")
        {
            foreach (string sortByOpt in SortByOptions.Split(','))
            {
                string[] sortByOpt1 = sortByOpt.Split('#');
                if (sortByOpt1[0] == SortByOptionDefault)
                {
                    itemViewListSortByBdl.Append("<option selected=\"selected\" data-html-text=\"" + sortByOpt1[1] + "\" value=" +
                                             sortByOpt1[0] + ">" + sortByOpt1[1] + "</option>");
                }
                else
                {
                    itemViewListSortByBdl.Append("<option data-html-text=\"" + sortByOpt1[1] + "\" value=" +
                                             sortByOpt1[0] + ">" + sortByOpt1[1] + "</option>");
                }

            }

        }
        itemViewListSortByBdl.Append("</select>");
        ltrItemViewDetailSortBy.Text = itemViewListSortByBdl.ToString();

        if (Request.QueryString["id"].ToLower() == "best")
        {
            LoadAllBestSoldItems();
        }
        if (Request.QueryString["id"].ToLower() == "special")
        {
            LoadAllSpecialItems();
        }
        if (Request.QueryString["id"].ToLower() == "feature")
        {
            LoadAllFeature();
        }
        if (Request.QueryString["id"].ToLower() == "recent")
        {
            LoadAllRecentlyViewedItems();
        }
        if (Request.QueryString["id"].ToLower() == "new")
        {
            LoadAllLatestItems();
        }
        if (Request.QueryString["id"].ToLower() == "giftCard")
        {
            LoadAllGiftCard();
        }
        if (Request.QueryString["id"] == "heavy")
        {
            LoadAllHeavyDiscountItems();
        }
        if (Request.QueryString["id"] == "seasonal")
        {
            LoadAllSeasonalItems();
        }
    }

    private void LoadAllLatestItems()
    {
        VarFunction = "LoadAllLatestItems";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetLatestItemsDetails(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }
    private void LoadAllBestSoldItems()
    {
        VarFunction = "LoadAllBestSoldItems";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetBestSoldItemDetails(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }

    private void LoadAllSpecialItems()
    {
        VarFunction = "LoadAllSpecialItems";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetSpecialItemDetails(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }

    private void LoadAllFeature()
    {
        VarFunction = "LoadAllFeature";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetFeatureItemDetails(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }

    private void LoadAllRecentlyViewedItems()
    {
        VarFunction = "LoadAllRecentlyViewedItems";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetRecentlyViewedItemDetails(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }

    private void LoadAllGiftCard()
    {
        VarFunction = "LoadAllGiftCard";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetGiftCardItemsDetails(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }

    private void LoadAllHeavyDiscountItems()
    {
        VarFunction = "LoadAllHeavyDiscountItems";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetAllHeavyDiscountItems(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }
    private void LoadAllSeasonalItems()
    {
        VarFunction = "LoadAllSeasonalItems";
        List<CategoryDetailsOptionsInfo> lstCatDetail = AspxItemViewListController.GetAllSeasonalItems(offset, limit, aspxCommonObj, sortBy);
        BindAllItems(lstCatDetail);
    }

    private void BindAllItems<T>(List<T> lst)
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        StringBuilder itemVLstStringBld = new StringBuilder();
        ArrayLength = lst.Count;
        if (lst != null || lst.Count > 0)
        {
            itemVLstStringBld.Append("<table><tr><td>");
            foreach (T value in lst)
            {
                string SKU = "", imagePath = "", alternateText = "", name = "", isFeatured = "", isSpecial = "";
                decimal price = 0;
                string costVariants = "";
                bool isOutOfStock = false;
                int itemID = 0, itemTypeID = 1;

                var prop0 = value.GetType().GetProperty("RowTotal");
                RowTotal = (int)prop0.GetValue(value, null);

                var prop1 = value.GetType().GetProperty("SKU");
                if (prop1 != null)
                {
                    SKU = (string)Convert.ChangeType(prop1.GetValue(value, null), prop1.PropertyType);
                }
                var prop2 = value.GetType().GetProperty("ImagePath");
                if (prop2 != null)
                {
                    imagePath = (string)Convert.ChangeType(prop2.GetValue(value, null), prop2.PropertyType);
                }
                var prop3 = value.GetType().GetProperty("AlternateText");
                if (prop3 != null)
                {
                    alternateText = (string)Convert.ChangeType(prop3.GetValue(value, null), prop3.PropertyType);
                }
                var prop4 = value.GetType().GetProperty("Name");
                if (prop4 != null)
                {
                    name = (string)Convert.ChangeType(prop4.GetValue(value, null), prop4.PropertyType);
                }
                var prop5 = value.GetType().GetProperty("IsFeatured");
                if (prop5 != null)
                {
                    isFeatured = (string)Convert.ChangeType(prop5.GetValue(value, null), prop5.PropertyType);
                }
                var prop6 = value.GetType().GetProperty("IsSpecial");
                if (prop6 != null)
                {
                    isSpecial = (string)Convert.ChangeType(prop6.GetValue(value, null), prop6.PropertyType);
                }
                var prop7 = value.GetType().GetProperty("IsOutOfStock");

                if (prop7 != null)
                {
                    var val = prop7.GetValue(value, null);
                    if (val != null)
                        isOutOfStock = (bool)val;
                    else
                    {
                        isOutOfStock = false;
                    }
                }
                var prop8 = value.GetType().GetProperty("ItemID");
                if (prop8 != null)
                {
                    var val = prop8.GetValue(value, null);
                    if (val != null)
                        itemID = (int)val;
                }
                var prop9 = value.GetType().GetProperty("Price");
                if (prop9 != null)
                {
                    price = Convert.ToDecimal(prop9.GetValue(value, null));
                }
                var prop10 = value.GetType().GetProperty("CostVariants");
                if (prop10 != null)
                {
                    costVariants = (string)Convert.ChangeType(prop10.GetValue(value, null), prop10.PropertyType);
                }

                var prop11 = value.GetType().GetProperty("ItemTypeID");
                if (prop11 != null)
                {
                    var val = prop11.GetValue(value, null);
                    if (val != null)
                        itemTypeID = (int)val;
                }

                var hrefItem = "";
                if (itemTypeID == 4)
                {
                    hrefItem = aspxRedirectPath + "Service-Item-Details" + pageExtension + "?id=" + itemID;
                }
                else
                {
                    hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(SKU) + pageExtension;
                }
                if (string.IsNullOrEmpty(imagePath))
                {
                    imagePath = NoImageCategoryDetailPath;
                }
                else
                {
                    imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + imagePath;
                }
                if (string.IsNullOrEmpty(alternateText))
                {
                    alternateText = name;
                }
                string imageSize = "Medium";
                if (isFeatured == "Yes" || isSpecial == "True")
                {
                    itemVLstStringBld.Append("<div id=\"product_" + itemID + "\" class=\"classInfo\">");
                    itemVLstStringBld.Append("<div  id=\"productImageWrapID_" + itemID + "\" class=\"itemImageClass\">");
                    itemVLstStringBld.Append("<a href=\"" + hrefItem + "\">");
                    itemVLstStringBld.Append("<img class=\"lazy\"  alt=\"" + alternateText + "\"  title=\"" +
                                             alternateText + "\" src=\"" + aspxRootPath +
                                             imagePath.Replace("uploads", "uploads/" + imageSize + "") + " \" />");
                    itemVLstStringBld.Append("</a>");
                    itemVLstStringBld.Append(imageSize == "Small"
                                                 ? "<div class=\"classIsFeatureSmall\"></div>"
                                                 : "<div class=\"classIsFeatureMedium\"></div>");
                    if (isSpecial == "Yes" || isSpecial == "True")
                    {
                        itemVLstStringBld.Append(imageSize == "Small"
                                                     ? "<div class=\"classIsSpecialSmall\"></div>"
                                                     : "<div class=\"classIsSpecialMedium\"></div>");
                    }
                    itemVLstStringBld.Append("</div>");
                }
                else
                {
                    itemVLstStringBld.Append("<div id=\"product_" + itemID + "\" class=\"classInfo\">");
                    itemVLstStringBld.Append("<div  id=\"productImageWrapID_" + itemID + "\" class=\"itemImageClass\">");
                    itemVLstStringBld.Append("<a href=\"" + hrefItem + "\">");
                    itemVLstStringBld.Append("<img  alt=\"" + alternateText + "\"  title=\"" +
                                             alternateText + "\" src=\"" + aspxRootPath +
                                             imagePath.Replace("uploads", "uploads/" + imageSize + "") + " \" />");
                    itemVLstStringBld.Append("</a>");
                    if (isSpecial == "Yes" || isSpecial == "True")
                    {
                        itemVLstStringBld.Append(imageSize == "Small"
                                                     ? "<div class=\"classIsSpecialSmall\"></div>"
                                                     : "<div class=\"classIsSpecialMedium\"></div>");
                    }
                    itemVLstStringBld.Append("</div>");
                }
                itemVLstStringBld.Append("<div class=\"itemInfoClass\"><ul>");
                itemVLstStringBld.Append("<li>" + name + "</li>");
                itemVLstStringBld.Append("<div class=\"cssClassProductPrice\"></div>");
                itemVLstStringBld.Append("<li class=\"cssClassProductRealPrice \">");
                itemVLstStringBld.Append("<span id=\"spanPrice_" + itemID + "\" class=\"cssClassFormatCurrency\">" +
                                         Math.Round((price * rate), 2).ToString() + "</span>");
                itemVLstStringBld.Append("<input type=\"hidden\"  id=\"hdnPrice_" + itemID +
                                         "\" class=\"cssClassFormatCurrency\">");
                itemVLstStringBld.Append("</li>");
                itemVLstStringBld.Append("</ul>");

                if (AllowOutStockPurchase.ToLower() == "false")
                {
                    if (isOutOfStock)
                    {
                        itemVLstStringBld.Append("<div class=\"sfButtonwrapper cssClassOutOfStock\">");
                        itemVLstStringBld.Append("<button type=\"button\"><span>" + getLocale("Out Of Stock") +
                                                 "</span></button></div>");

                    }
                    else
                    {
                        if (itemTypeID != 4)
                        {
                            itemVLstStringBld.Append("<div class=\"sfButtonwrapper cssClassAddToCart\">");
                            itemVLstStringBld.Append(
                                "<button type=\"button\" onclick=\"AspxCommerce.RootFunction.AddToCartToJSFromTemplate(" +
                                itemID + "," + Math.Round((price * rate), 2).ToString() + ",'" + SKU + "'," + 1 + ");\">");
                            itemVLstStringBld.Append("<span><span>" + getLocale("Add to cart") +
                                                     "</span></span></button></div>");
                        }
                    }
                }
                else
                {
                    if (itemTypeID != 4)
                    {
                        itemVLstStringBld.Append("<div class=\"sfButtonwrapper cssClassAddToCart\">");
                        itemVLstStringBld.Append(
                            "<button type=\"button\" onclick=\"AspxCommerce.RootFunction.AddToCartToJSFromTemplate(" +
                            itemID + "," + Math.Round((price * rate), 2).ToString() + ",'" + SKU + "'," + 1 + " );\">");
                        itemVLstStringBld.Append("<span><span>" + getLocale("Add to cart") +
                                                 "</span></span></button></div>");
                    }
                }

                itemVLstStringBld.Append("<div class=\"classButtons\">");
                if (allowWishListItemDetails.ToLower() == "true")
                {
                    var xx = "";
                    if (costVariants != "")
                    {
                        xx = "yes";
                    }
                    if (itemTypeID != 4)
                    {
                        itemVLstStringBld.Append("<div class=\"classWishlist\">");
                        itemVLstStringBld.Append("<div class=\"cssClassWishListButton\">");
                        itemVLstStringBld.Append("<button onclick=\"AspxCommerce.RootFunction.AddToWishList(" + itemID +
                                                 ",'" + SKU + "',this);\" id=\"addWishListProductGrid\" type=\"button\">");
                        itemVLstStringBld.Append("<span><span>" + getLocale("Add to Wishlist") +
                                                 "</span></span></button></div></div>");
                    }
                }
                itemVLstStringBld.Append("</div>");
                itemVLstStringBld.Append("<div class=\"classViewDetails\">");
                itemVLstStringBld.Append("<a href=\"" + hrefItem + "\"><span>" + getLocale("View Details") +
                                         "</span></a></div>");
                itemVLstStringBld.Append("</div>");
                itemVLstStringBld.Append("<div class=\"clear\"></div>");
                itemVLstStringBld.Append("</div>");
            }
            itemVLstStringBld.Append("</td></tr>");
            itemVLstStringBld.Append("</table>");
            itemVLstStringBld.Append(GetStringScript("$('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });"));
        }
        else
        {
            itemVLstStringBld.Append("<span class=\"cssClassNotFound\"><b>" +
                                     getLocale("This store has no items listed yet!") + "</b></span>");
        }
        ltrItemViewDetail.Text = itemVLstStringBld.ToString();
    }
    private string GetStringScript(string codeToRun)
    {
        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){ " +
                      codeToRun + "});</script>");
        return script.ToString();
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

