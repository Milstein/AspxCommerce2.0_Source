using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using AspxCommerce.Core;
using SageFrame.Framework;
using SageFrame.Web;
using System.Web;

public partial class Modules_AspxCommerce_AspxCategoryWiseItemsList_CategoryWiseItemList : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public int StoreID, PortalID, CustomerID;
    public int noOfItemsInCategory, RowTotal;
    public string UserName, CultureName, modulePath;
    public string DefaultImagePath, EnableLatestItems, AllowOutStockPurchase, AllowWishListLatestItem, AllowAddToCompareLatest;
    public int NoOfLatestItems, NoOfItemsDisplayInARow, MaxCompareItemCount;
    protected void page_init(object sender, EventArgs e)
    {
        Page.ClientScript.RegisterClientScriptInclude("Paging", ResolveUrl("~/js/Paging/jquery.pagination.js"));
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
            if (!IsPostBack)
            {
                IncludeCss("categoryWiseItemList", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("categoryWiseItemList", "/js/jquery.tipsy.js", "/js/encoder.js");
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }

                //StoreSettingInfo DefaultStoreSettings = (StoreSettingInfo)Session["DefaultStoreSettings"];
                //DefaultStoreSettings.AllowAnonymousCheckOut
                modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);

                StoreSettingConfig ssc = new StoreSettingConfig();
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID,
                                                             CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID,
                                                                  CultureName);
                MaxCompareItemCount =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID,
                                                        CultureName));
                NoOfItemsDisplayInARow =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfDisplayItems, StoreID, PortalID,
                                                        CultureName));
                AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID,
                                                                    CultureName);
                AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID,
                                                                    CultureName);
            }
            IncludeLanguageJS();
            GetCategoryWiseItemSetting();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    private void GetCategoryWiseItemSetting()
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        List<CategoryWiseitemSettings> catWiseSettingInfo =
            AspxCatWiseItemController.GetCategoryWiseItemSettings(aspxCommonObj);
        if (catWiseSettingInfo != null && catWiseSettingInfo.Count > 0)
        {
            foreach (CategoryWiseitemSettings item in catWiseSettingInfo)
            {
                noOfItemsInCategory = item.NumberOfItemsInCategory;
            }
            GetCategoryWiseItemList();
        }
    }
    StringBuilder CatWiseItemContains;
    private void GetCategoryWiseItemList()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        int offset = 1;
        int limit = 5;
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<CategoryWiseItemInfo> catWiseItemsInfo =
            AspxCatWiseItemController.GetCategoryWiseItemList(offset, limit, noOfItemsInCategory, aspxCommonObj);

        if (catWiseItemsInfo != null && catWiseItemsInfo.Count > 0)
        {
            List<int> catIDs = new List<int>();
            StringBuilder html = new StringBuilder();
            foreach (CategoryWiseItemInfo item in catWiseItemsInfo)
            {
                if (IsExistedCategory(catIDs, item.CategoryID))
                {
                    if (item.ItemRowNum <= noOfItemsInCategory + 1)
                    {
                        BindCategoryItems(item);
                        html.Append(CatWiseItemContains);
                    }
                }
                else
                {
                    if (catWiseItemsInfo.IndexOf(item) > 0)
                    {
                        html.Append("</div></div>");
                    }
                    catIDs.Add(item.CategoryID);
                    html.Append("<div class=\"cssCategoryBlock\">");
                    html.Append("<label class=\"classCategoryName cssClassCommonSideBox\" id=\"classCategoryName_");
                    html.Append(item.CategoryID);
                    html.Append("\"><h2 class=\"cssClassMiddleHeader\"><span>");
                    html.Append(item.CategoryName);
                    html.Append("</span></h2></label>");
                    html.Append("<div id=div_");
                    html.Append(item.CategoryID);
                    html.Append("'>");
                    BindCategoryItems(item);
                    html.Append(CatWiseItemContains);
                }
            }
            html.Append("</div></div>");
            ltrCategoryWiseItem.Text = html.ToString();
        }
        else
        {
            StringBuilder html = new StringBuilder();
            html.Append("<span class=\"cssClassNotFound sflocale\">" + getLocale("This store has no items listed yet!") +
                        "</span>");
            ltrCategoryWiseItem.Text = html.ToString();
        }
    }

    private void BindCategoryItems(CategoryWiseItemInfo item)
    {
        string pageExtension = SageFrameSettingKeys.PageExtension;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        CatWiseItemContains = new StringBuilder();
        string aspxRootPath = ResolveUrl("~/");
        decimal rate = 1;
        RowTotal = item.RowTotal;
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
        string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
        if (item.ImagePath == "")
        {
            imagePath = DefaultImagePath;
        }
        if (item.AlternateText == "")
        {
            item.AlternateText = item.Name;
        }
        string itemPrice = Math.Round(double.Parse((item.Price).ToString()), 2).ToString();
        string itemPriceRate = Math.Round(double.Parse((item.Price * rate).ToString()), 2).ToString();
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
        if (item.ItemRowNum <= noOfItemsInCategory)
        {
            CatWiseItemContains.Append("<div class=\"classItemsList_" + item.CategoryID + "\">");
            CatWiseItemContains.Append("<div class=\"cssClassProductsBox\">");
            var hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
            CatWiseItemContains.Append("<div id=\"productImageWrapID_");
            CatWiseItemContains.Append(item.ItemID);
            CatWiseItemContains.Append("\" class=\"cssClassProductsBoxInfo\" costvariantItem=");
            CatWiseItemContains.Append(item.IsCostVariantItem);
            CatWiseItemContains.Append("  itemid=\"");
            CatWiseItemContains.Append(item.ItemID);
            CatWiseItemContains.Append("\"><a href=\"" + hrefItem + "\" title=\""+item.Name+"\"><h2>");
            CatWiseItemContains.Append(name);
            CatWiseItemContains.Append("</h2><h3>");
            CatWiseItemContains.Append(item.SKU);
            CatWiseItemContains.Append("</h3>");
            CatWiseItemContains.Append("<div id=\"divitemImage\" class=\"cssClassProductPicture\"><a href=\"");
            CatWiseItemContains.Append(hrefItem);
            CatWiseItemContains.Append("\" ><img id=\"");
            CatWiseItemContains.Append(item.ItemID);
            CatWiseItemContains.Append("\"  alt=\"");
            CatWiseItemContains.Append(item.AlternateText);
            CatWiseItemContains.Append("\"  title=\"");
            CatWiseItemContains.Append(item.AlternateText);
            CatWiseItemContains.Append("\" data-original=\"");
            CatWiseItemContains.Append(aspxTemplateFolderPath);
            CatWiseItemContains.Append("/images/loader_100x12.gif\" src=\"");
            CatWiseItemContains.Append(aspxRootPath);
            CatWiseItemContains.Append(imagePath.Replace("uploads", "uploads/Medium"));
            CatWiseItemContains.Append("\"/></a></div>");
            if (item.HidePrice != true)
            {
                if (item.ListPrice != null)
                {
                    string listPrice = Math.Round(double.Parse(item.ListPrice.ToString()), 2).ToString();
                    string strAmount = Math.Round((double)(item.ListPrice * rate), 2).ToString();
                    CatWiseItemContains.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                    CatWiseItemContains.Append("<p class=\"cssClassProductOffPrice\">");
                    //CatWiseItemContains.Append(getLocale("Regular Price :"));
                    CatWiseItemContains.Append("<span class=\"cssClassFormatCurrency\" value=");
                    CatWiseItemContains.Append(listPrice);
                    CatWiseItemContains.Append(">");
                    CatWiseItemContains.Append(strAmount);
                    CatWiseItemContains.Append("</span></p><p class=\"cssClassProductRealPrice \" >");
                    //CatWiseItemContains.Append(getLocale("Our Offer :"));
                    CatWiseItemContains.Append("<span class=\"cssClassFormatCurrency\" value=");
                    CatWiseItemContains.Append(itemPrice);
                    CatWiseItemContains.Append(">");
                    CatWiseItemContains.Append(itemPriceRate);
                    CatWiseItemContains.Append("</span></p></div></div>");
                }
                else
                {
                    CatWiseItemContains.Append("<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\">");
                    CatWiseItemContains.Append("<p class=\"cssClassProductRealPrice \" >");
                    //CatWiseItemContains.Append(getLocale("Our Offer :"));
                    CatWiseItemContains.Append("<span class=\"cssClassFormatCurrency\" value=");
                    CatWiseItemContains.Append(itemPrice);
                    CatWiseItemContains.Append(">");
                    CatWiseItemContains.Append(itemPriceRate);
                    CatWiseItemContains.Append("</span></p></div></div>");
                }
            }
            CatWiseItemContains.Append("<div class=\"cssClassProductDetail\"><p><a href=\"");
            CatWiseItemContains.Append(aspxRedirectPath);
            CatWiseItemContains.Append("item/");
            CatWiseItemContains.Append(item.SKU);
            CatWiseItemContains.Append(pageExtension);
            CatWiseItemContains.Append("\">");
            CatWiseItemContains.Append(getLocale("Details"));
            CatWiseItemContains.Append("</a></p></div>");
            CatWiseItemContains.Append("</div>");
            CatWiseItemContains.Append("<div class=\"sfButtonwrapper\">");
            if (AllowWishListLatestItem.ToLower() == "true")
            {
                if (GetCustomerID > 0 && GetUsername.ToLower() != "anonymoususer")
                {
                    CatWiseItemContains.Append("<div class=\"cssClassWishListButton\">");
                    CatWiseItemContains.Append("<button type=\"button\" id=\"addWishList\" onclick=categoryWiseItemList.CheckWishListUniqueness(");
                    CatWiseItemContains.Append(item.ItemID);
                    CatWiseItemContains.Append(",'");
                    CatWiseItemContains.Append(item.SKU);
                    CatWiseItemContains.Append("',this);><span><span><span>+</span>");
                    CatWiseItemContains.Append(getLocale("Wishlist"));
                    CatWiseItemContains.Append("</span></span></button></div>");
                }
                else
                {
                    CatWiseItemContains.Append("<div class=\"cssClassWishListButton\">");
                    CatWiseItemContains.Append(
                        "<button type=\"button\" id=\"addWishList\" onclick=\"AspxCommerce.RootFunction.Login();\">");
                    CatWiseItemContains.Append("<span><span><span>+</span>");
                    CatWiseItemContains.Append(getLocale("Wishlist"));
                    CatWiseItemContains.Append("</span></span></button></div>");
                }
            }
            if (AllowAddToCompareLatest.ToLower() == "true")
            {
                CatWiseItemContains.Append("<div class=\"cssClassCompareButton\">");
                CatWiseItemContains.Append("<input type=\"checkbox\" id=\"compare-");
                CatWiseItemContains.Append(item.ItemID);
                CatWiseItemContains.Append("\" onclick=categoryWiseItemList.AddItemsToCompare(");
                CatWiseItemContains.Append(item.ItemID);
                CatWiseItemContains.Append(",'");
                CatWiseItemContains.Append(item.SKU);
                CatWiseItemContains.Append("',this);><span>");
                CatWiseItemContains.Append(getLocale("Compare"));
                CatWiseItemContains.Append("</span></input></div>");
            }
            CatWiseItemContains.Append("</div>");
            CatWiseItemContains.Append("<div class=\"cssClassclear\">");
            string itemSKU = item.SKU;
            string itemName = item.Name;
            if (AllowOutStockPurchase.ToLower() == "false")
            {
                if (item.IsOutOfStock == true)
                {
                    CatWiseItemContains.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\">");
                    CatWiseItemContains.Append("<button type=\"button\"><span>");
                    CatWiseItemContains.Append(getLocale("Out Of Stock"));
                    CatWiseItemContains.Append("</span></button></div></div>");
                }
                else
                {
                    // CatWiseItemContains += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><a href=\"#\" title=" + itemName + "  onclick='categoryWiseItemList.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span>Add to cart</span></a></div></div>";
                    CatWiseItemContains.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                    CatWiseItemContains.Append("<button type=\"button\" id=\"addtoCart\" title=");
                    CatWiseItemContains.Append(itemName);
                    CatWiseItemContains.Append(" onclick=categoryWiseItemList.AddToCartToJS(");
                    CatWiseItemContains.Append(item.ItemID);
                    CatWiseItemContains.Append(",");
                    CatWiseItemContains.Append(itemPrice);
                    CatWiseItemContains.Append(",'");
                    CatWiseItemContains.Append(itemSKU);
                    CatWiseItemContains.Append("',");
                    CatWiseItemContains.Append(1);
                    CatWiseItemContains.Append(",this);><span><span>");
                    CatWiseItemContains.Append(getLocale("Add to cart"));
                    CatWiseItemContains.Append("</span></span></button></div></div>");
                }
            }
            else
            {
                CatWiseItemContains.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                CatWiseItemContains.Append("<button type=\"button\" id=\"addtoCart\" title=");
                CatWiseItemContains.Append(itemName);
                CatWiseItemContains.Append(" onclick=categoryWiseItemList.AddToCartToJS(");
                CatWiseItemContains.Append(item.ItemID);
                CatWiseItemContains.Append(",");
                CatWiseItemContains.Append(itemPrice);
                CatWiseItemContains.Append(",'");
                CatWiseItemContains.Append(itemSKU);
                CatWiseItemContains.Append("',");
                CatWiseItemContains.Append(1);
                CatWiseItemContains.Append(",this); ><span><span>");
                CatWiseItemContains.Append(getLocale("Add to cart"));
                CatWiseItemContains.Append("</span></span></button></div></div>");

            }
            CatWiseItemContains.Append("</div></div>");
        }
        else
        {
            string viewMore = "<a href=\"" + aspxRedirectPath + "category/" + fixedEncodeURIComponent(item.CategoryName) +
                              pageExtension + "\">" + getLocale("View More") + "</a>";
            CatWiseItemContains.Append("<div id=\"divViewMore_" + item.CategoryID + "\" class=\"cssViewMore\">");
            CatWiseItemContains.Append(viewMore);
            CatWiseItemContains.Append("</div>");
        }

    }


    private bool IsExistedCategory(List<int> arr, int cat)
    {
        bool isExist = false;
        int i;
        for (i = 0; i < arr.Count; i++)
        {
            if (arr[i] == cat)
            {
                isExist = true;
                break;
            }
        }
        return isExist;
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
