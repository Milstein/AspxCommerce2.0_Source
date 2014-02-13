using System;
using System.Collections.Generic;
using System.Web;
using SageFrame.Web;
using SageFrame;
using SageFrame.Framework;
using SageFrame.Web.Common.SEO;
using SageFrame.Web.Utilities;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections;
using System.Text;

public partial class Modules_AspxDetails_AspxCategoryDetails_CategoryDetails : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public string Categorykey = "";
    public string NoImageCategoryDetailPath, AllowOutStockPurchase, AllowWishListCategory, AllowAddToCompareFilter;
    public int MaxCompareItemCount;
    public int NoOfItemsInARow;
    public string ItemDisplayMode;
    public float minPrice = 0;
    public float maxPrice = 0;
    public string idsByPrice = "";
    public string catIds = "";
    public List<Filter> arrPrice = new List<Filter>();
    public List<AspxTemplateKeyValue> AspxTemplateValue = new List<AspxTemplateKeyValue>();
    public float rate = 1;

    protected void page_init(object sender, EventArgs e)
    {
        try
        {
            SageFrameRoute parentPage = (SageFrameRoute)this.Page;
            Categorykey = parentPage.Key;
            Categorykey = HttpUtility.UrlDecode(Categorykey);
            Categorykey = AspxUtility.fixedDecodeURIComponent(Categorykey);
            //Categorykey = Categorykey.Replace("ampersand", "&");//.Replace("-", " ").Replace("_", "-");
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            CustomerID = GetCustomerID;
            UserName = GetUsername;
            CultureName = GetCurrentCultureName;
            if (HttpContext.Current.Session.SessionID != null)
            {
                SessionCode = HttpContext.Current.Session.SessionID.ToString();
            }
            if (!IsPostBack)
            {
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);
                OverRideSEOInfo(Categorykey, StoreID, PortalID, UserName, CultureName);
                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageCategoryDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                MaxCompareItemCount = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID, CultureName));
                AllowWishListCategory = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
                AllowAddToCompareFilter = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID, CultureName);
                NoOfItemsInARow = 3;//int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfDisplayItems, StoreID, PortalID, CultureName));
                ItemDisplayMode = ssc.GetStoreSettingsByKey(StoreSetting.ItemDisplayMode, StoreID, PortalID, CultureName);
            }
            InitializeJS();

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            IncludeCss("CategoryDetailcss", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery-ui.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css", "/Templates/" + TemplateName + "/css/FancyDropDown/fancy.css", "/Templates/" + TemplateName + "/css/Scroll/tinyscroll.css", "/Templates/" + TemplateName + "/css/JQueryCheckBox/uniform.default.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/CategoryBanner/cycle.css");
            IncludeJs("CategoryDetailjs", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js",
                      "/js/MessageBox/alertbox.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js",
                       "/js/CurrencyFormat/jquery.formatCurrency.all.js",
                       "/js/jquery.cookie.js", "/js/jquery.tipsy.js", "/js/FancyDropDown/itemFancyDropdown.js", "/js/SageFrameCorejs/itemTemplateView.js", "/js/Scroll/jquery.tinyscrollbar.min.js", "/js/JQueryCheckBox/jquery.uniform.js");
        }
        IncludeLanguageJS();
        GetAspxTemplates();
        GetAllSubCategoryForFilter();
    }

    private void GetAspxTemplates()
    {
        AspxTemplateValue = AspxGetTemplates.GetAspxTemplateKeyValue();

        foreach (AspxTemplateKeyValue value in AspxTemplateValue)
        {
            string xx = value.TemplateKey + "@" + value.TemplateValue;
            Page.ClientScript.RegisterArrayDeclaration("jsTemplateArray", "\'" + xx + "\'");
        }
    }

    private void OverRideSEOInfo(string categorykey, int storeID, int portalID, string userName, string cultureName)
    {
        CategorySEOInfo dtCatSEO = GetSEOSettingsByCategoryName(categorykey, storeID, portalID, userName, cultureName);
        if (dtCatSEO != null)
        {
            string PageTitle = dtCatSEO.MetaTitle.ToString();
            string PageKeyWords = dtCatSEO.MetaKeywords.ToString();
            string PageDescription = dtCatSEO.MetaDescription.ToString();

            if (!string.IsNullOrEmpty(PageTitle))
                SEOHelper.RenderTitle(this.Page, PageTitle, false, true, this.GetPortalID);

            if (!string.IsNullOrEmpty(PageKeyWords))
                SEOHelper.RenderMetaTag(this.Page, "KEYWORDS", PageKeyWords, true);

            if (!string.IsNullOrEmpty(PageDescription))
                SEOHelper.RenderMetaTag(this.Page, "DESCRIPTION", PageDescription, true);
        }
    }

    private CategorySEOInfo GetSEOSettingsByCategoryName(string categorykey, int storeID, int portalID, string userName, string cultureName)
    {
        List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
        ParaMeter.Add(new KeyValuePair<string, object>("@CatName", categorykey));
        ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
        ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
        ParaMeter.Add(new KeyValuePair<string, object>("@UserName", userName));
        ParaMeter.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
        SQLHandler sqlH = new SQLHandler();
        return sqlH.ExecuteAsObject<CategorySEOInfo>("usp_Aspx_CategorySEODetailsByCatName", ParaMeter);
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("template", ResolveUrl("~/js/Templating/tmpl.js"));
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
        Page.ClientScript.RegisterClientScriptInclude("Paging", ResolveUrl("~/js/Paging/jquery.pagination.js"));
        Page.ClientScript.RegisterClientScriptInclude("aspxTemplate", ResolveUrl("~/js/Templating/AspxTemplate.js"));
        //   Page.ClientScript.RegisterClientScriptInclude("lazyLoad", ResolveUrl("~/js/lazyload.js"));
        //Page.ClientScript.RegisterClientScriptInclude("bxSlider", ResolveUrl("~/js/Sliderjs/jquery.bxSlider.js"));
        Page.ClientScript.RegisterClientScriptInclude("cyclic", ResolveUrl("~/js/jquery.cycle.min.js"));
    }

    Hashtable hst = null;
    public void GetAllSubCategoryForFilter()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        List<CategoryDetailFilter> lstCatDet = AspxFilterController.GetAllSubCategoryForFilter(Categorykey, aspxCommonObj);
        StringBuilder elem = new StringBuilder();
        elem.Append("<div class=\"filter\">");
        if (lstCatDet != null && lstCatDet.Count > 0)
        {
            elem.Append("<div id=\"divCat\" value=\"b01\" class=\"cssClasscategorgy\">");
            elem.Append("<div class=\"divTitle\"><b><label style=\"color:#006699\">" + getLocale("Categories") + "</label></b><img align=\"right\" src=\"" + aspxTemplateFolderPath + "/images/arrow_up.png\"/></div> <div id=\"scrollbar1\" class=\"cssClassScroll\"> <div class=\"scrollbar\"> <div class=\"track\"><div class=\"thumb\" style=\"display:none\"> <div class=\"end\">  </div> </div>  </div>  </div><div class=\"viewport\"><div class=\"overview\" id=\"catOverview\"><div class=\"divContentb01\"><ul id=\"cat\">");
            foreach (CategoryDetailFilter value in lstCatDet)
            {
                elem.Append("<li><label><input class=\"chkCategory\" type=\"checkbox\" name=\"" + value.CategoryName + "\" ids=\"" + value.CategoryID + "\" value=\"" + value.CategoryName + "\"/> " + value.CategoryName + "<span> (" + value.ItemCount + ")</span></label></li>");
            }
            elem.Append("</ul></div></div></div></div></div>");
        }
        string brandFilter = GetAllBrandForCategory();
        elem.Append(brandFilter);
        elem.Append("</div>");
        ltrFilter.Text = elem.ToString();
    }

    public string GetAllBrandForCategory()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        bool isByCategory = false;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        List<BrandItemsInfo> lstBrandItem = AspxFilterController.GetAllBrandForCategory(Categorykey, isByCategory, aspxCommonObj);
        StringBuilder elem = new StringBuilder();
        StringBuilder scriptToExecute = new StringBuilder();
        List<int> arrBrand = new List<int>();

        if (lstBrandItem.Count > 0)
        {

            elem.Append("<div value=\"0\" class=\"cssClasscategorgy\">");
            elem.Append("<div class=\"divTitle\"><b><label style=\"color:#006699\">" + getLocale("Brands") + "</label></b><img align=\"right\" src=\"" + aspxTemplateFolderPath + "/images/arrow_up.png\" /></div><div id=\"scrollbar2\" class=\"cssClassScroll\"> <div class=\"scrollbar\"> <div class=\"track\"><div class=\"thumb\" style=\"display:none\"> <div class=\"end\"> </div></div></div>  </div><div class=\"viewport\"><div class=\"overview\"><div class=\"divContent0\"><ul>");
            //$(".filter").append(elem);
            foreach (BrandItemsInfo value in lstBrandItem)
            {
                if (arrBrand.IndexOf(value.BrandID) == -1)
                {
                    elem.Append("<li><label><input class=\"chkFilter\" type=\"checkbox\" name=\"" + value.BrandName + "\" ids=\"" + value.ItemID + "\" value=\"0\"/> " + value.BrandName + "<span id=\"count\"></span></label></li>");
                    //$(".filter").find('div[value="0"]').find('ul').append(elem);
                    arrBrand.Add(value.BrandID);
                }
                else
                {
                    scriptToExecute.Append("var ids = $('.filter').find('div[value=0]').find('ul').find('input[type=checkbox][value=0][name=" + value.BrandName + "]').attr('ids');");
                    scriptToExecute.Append("ids +=','+" + value.ItemID + ";");
                    scriptToExecute.Append(" $('.filter').find('div[value=0]').find('ul').find('input[type=checkbox][value=0][name=" + value.BrandName + "]').attr('ids', ids);");
                }
            }
            elem.Append("</ul></div></div></div></div></div>");
            string script = GetStringScript(scriptToExecute.ToString());
            elem.Append(script);
        }
        string shopFilter = GetShoppingFilter();
        elem.Append(shopFilter);
        return elem.ToString();
    }

    public string GetShoppingFilter()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        bool isByCategory = false;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        List<Filter> lstFilter = AspxFilterController.GetShoppingFilter(aspxCommonObj, Categorykey, isByCategory);
        string pId = "";
        List<string> attrID = new List<string>();
        List<string> attrValue = new List<string>();
        string attrName = "";
        StringBuilder elem = new StringBuilder();
        StringBuilder scriptExecute = new StringBuilder();
        List<int> catIdsArr = new List<int>();
        StoreSettingConfig ssc = new StoreSettingConfig();
        float additionalCCVR = float.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName));
        string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
        if (HttpContext.Current.Session["CurrencyRate"] != null)
        {
            if (Session["CurrencyCode"].ToString() != MainCurrency)
            {
                float rate1 = float.Parse(Session["CurrencyRate"].ToString());
                rate = (rate1 + (rate1 * additionalCCVR / 100));
            }
            else
            {
                rate = float.Parse(Session["CurrencyRate"].ToString());
            }
        }

        if (lstFilter != null && lstFilter.Count > 0)
        {
            int currentAttributeID = 0;
            scriptExecute.Append("$('#divShopFilter').show();$('.divRange').show();");

            foreach (Filter value in lstFilter)
            {
                if (catIdsArr.IndexOf(value.ItemID) == -1)
                {
                    catIdsArr.Add(value.ItemID);
                    catIds += value.ItemID + ",";
                }
                if (Int32.Parse(value.AttributeID) != 8 && Int32.Parse(value.AttributeID) > 40)
                {

                    if (attrID.IndexOf(value.AttributeID) == -1)
                    {
                        attrID.Add(value.AttributeID);
                        if (attrID.IndexOf(value.AttributeID) != -1)
                        {
                            if (Int32.Parse(value.AttributeID) != currentAttributeID && currentAttributeID > 0)
                            {
                                elem.Append("</ul></div></div></div></div></div>");
                            }
                            currentAttributeID = Int32.Parse(value.AttributeID);
                        }
                        elem.Append("<div value=" + value.AttributeID + " class=\"cssClasscategorgy\"><div class=\"divTitle\"><b><label style=\"color:#006699\">" + value.AttributeName + "</label></b><img align=\"right\" src=\"" + aspxTemplateFolderPath + "/images/arrow_up.png\"/></div> <div id=\"scrollbar3\" class=\"cssClassScroll\"> <div class=\"scrollbar\"> <div class=\"track\"><div class=\"thumb\" style=\"display:none\"> <div class=\"end\">  </div> </div>  </div>  </div><div class=\"viewport\"><div class=\"overview\"><div class=" + "divContent" + value.AttributeID + "><ul>");
                        attrValue = new List<string>();

                        //$(".filter").append(elem);
                        elem.Append("<li><label><input class= \"chkFilter\" type=\"checkbox\" name=\"" + value.AttributeValue + "\" ids=\"" + value.ItemID + "\" value=\"" + value.AttributeID + "\"/> " + value.AttributeValue + "<span id=\"count\"></span></label></li>");
                        //elem.Append("</ul></div></div></div></div></div>");
                        attrValue.Add(value.AttributeValue);


                    }
                    else
                    {
                        if (attrID.IndexOf(value.AttributeID) != -1)
                        {
                            if (Int32.Parse(value.AttributeID) != currentAttributeID && currentAttributeID > 0)
                            {
                                elem.Append("</ul></div></div></div></div></div>");
                            }
                            currentAttributeID = Int32.Parse(value.AttributeID);
                        }
                        if (attrValue.IndexOf(value.AttributeValue) == -1)
                        {
                            //elem = '';
                            elem.Append("<li><label><input class=\"chkFilter\" type=\"checkbox\" name=\"" + value.AttributeValue + "\" ids=\"" + value.ItemID + "\" value=\"" + value.AttributeID + "\"/> " + value.AttributeValue + "<span id=\"count\"></span></label></li>");
                            //$(".filter").find('div[value=' + value.AttributeID + ']').find('ul').append(elem);
                            attrValue.Add(value.AttributeValue);
                        }
                        else
                        {
                            scriptExecute.Append("var ids = $('.filter').find('input[type=checkbox][value=" + value.AttributeID + "][name=" + value.AttributeValue + "]').attr('ids');");
                            scriptExecute.Append("ids += ',' +" + value.ItemID + ";");
                            scriptExecute.Append("$('.filter').find('input[type=checkbox][value=" + value.AttributeID + "][name=" + value.AttributeValue + "]').attr('ids', ids);");
                        }


                    }


                    // elem.Append("</ul></div></div></div></div></div>");
                }

                else if (Int32.Parse(value.AttributeID) == 8)
                {
                    arrPrice.Add(value);
                    Page.ClientScript.RegisterArrayDeclaration("arrPrice", JSONHelper.Serialize(value.AttributeValue + "@" + value.ItemID));
                    if (float.Parse(value.AttributeValue) > maxPrice)
                    {
                        maxPrice = float.Parse(value.AttributeValue);
                    }
                    if (float.Parse(value.AttributeValue) < minPrice || minPrice == 0)
                    {
                        minPrice = float.Parse(value.AttributeValue);
                    }

                }
            }
            if (attrID.Count > 0)
            {
                elem.Append("</ul></div></div></div></div></div>");
            }
            float interval = (maxPrice - minPrice) / 4;
            elem.Append("<div value=\"8\" class=\"cssClassbrowseprice\">");
            elem.Append("<div class=\"divTitle\"><b><label style=\"color:#006699\">" + getLocale("Price") + "</label></b><img align=\"right\" src=\"" + aspxTemplateFolderPath + "/images/arrow_up.png\"/></div><div class=\"divContent8\"><ul>");
            if (arrPrice.Count > 1)
            {
                elem.Append("<li><a id=\"f1\" href=\"#\" ids=\"\"  minprice=" + GetPriceData(minPrice, 0, interval) + " maxprice=" + GetPriceData(minPrice, 1, interval) + ">" + "<span class=\"cssClassFormatCurrency\">" + minPrice * rate + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + GetPriceData(minPrice, 1, interval) * rate + "</span>" + "<span id=\"count\"></span></a></li>");
                elem.Append("<li><a id=\"f2\" href=\"#\" ids=\"\" minprice=" + GetPriceData(minPrice + float.Parse("0.01"), 1, interval) + " maxprice=" + GetPriceData(minPrice, 2, interval) + ">" + "<span class=\"cssClassFormatCurrency\">" + GetPriceData(minPrice * rate + float.Parse("0.01"), 1, interval * rate) + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + GetPriceData(minPrice, 2, interval) * rate + "</span>" + "<span id=\"count\"></span></a></li>");
                elem.Append("<li><a id=\"f3\" href=\"#\" ids=\"\" minprice=" + GetPriceData(minPrice + float.Parse("0.01"), 2, interval) + " maxprice=" + GetPriceData(minPrice, 3, interval) + ">" + "<span class=\"cssClassFormatCurrency\">" + GetPriceData(minPrice * rate + float.Parse("0.01"), 2, interval * rate) + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + GetPriceData(minPrice, 3, interval) * rate + "</span>" + "<span id=\"count\"></span></a></li>");
                elem.Append("<li><a id=\"f4\" href=\"#\" ids=\"\" minprice=" + GetPriceData(minPrice + float.Parse("0.01"), 3, interval) + " maxprice=" + maxPrice + ">" + "<span class=\"cssClassFormatCurrency\">" + GetPriceData(minPrice * rate + float.Parse("0.01"), 3, interval * rate) + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + maxPrice * rate + "</span>" + "<span id=\"count\"></span></a></li>");
            }
            if (arrPrice.Count == 1)
            {
                elem.Append("<li><a id=\"f1\" href=\"#\" ids=\",\"  minprice=" + GetPriceData(minPrice, 0, interval) + " maxprice=" + GetPriceData(minPrice, 1, interval) + ">" + "<span class=\"cssClassFormatCurrency\">" + minPrice * rate + "</span>" + "<span id=\"count\"></span></a></li>");
                minPrice = 0;
            }

            elem.Append("</ul></div>");
            elem.Append("<div class=\"divRange\"><div id=\"slider-range\"></div></div></div>");
            foreach (Filter value in arrPrice)
            {
                idsByPrice += value.ItemID + ",";
                if (float.Parse(value.AttributeValue) >= GetPriceData(minPrice, 0, interval) && float.Parse(value.AttributeValue) <= GetPriceData(minPrice, 1, interval))
                {
                    scriptExecute.Append("var ids = $('.filter').find('div[value=" + value.AttributeID + "]').find('#f1').attr('ids');");
                    scriptExecute.Append("ids += ','+" + value.ItemID + ";");
                    scriptExecute.Append("$('.filter').find('div[value=" + value.AttributeID + "]').find('#f1').attr('ids', ids);");
                }
                else if (float.Parse(value.AttributeValue) >= GetPriceData(minPrice + float.Parse("0.01"), 1, interval) && float.Parse(value.AttributeValue) <= GetPriceData(minPrice, 2, interval))
                {
                    scriptExecute.Append("var ids = $('.filter').find('div[value=" + value.AttributeID + "]').find('#f2').attr('ids');");
                    scriptExecute.Append("ids += ','+" + value.ItemID + ";");
                    scriptExecute.Append("$('.filter').find('div[value=" + value.AttributeID + "]').find('#f2').attr('ids', ids);");

                }
                else if (float.Parse(value.AttributeValue) >= GetPriceData(minPrice + float.Parse("0.01"), 2, interval) && float.Parse(value.AttributeValue) <= GetPriceData(minPrice, 3, interval))
                {
                    scriptExecute.Append("var ids = $('.filter').find('div[value=" + value.AttributeID + "]').find('#f3').attr('ids');");
                    scriptExecute.Append("ids += ','+" + value.ItemID + ";");
                    scriptExecute.Append("$('.filter').find('div[value=" + value.AttributeID + "]').find('#f3').attr('ids', ids);");
                }
                else if (float.Parse(value.AttributeValue) >= GetPriceData(minPrice + float.Parse("0.01"), 3, interval) && float.Parse(value.AttributeValue) <= maxPrice)
                {
                    scriptExecute.Append("var ids = $('.filter').find('div[value=" + value.AttributeID + "]').find('#f4').attr('ids');");
                    scriptExecute.Append("ids += ','+" + value.ItemID + ";");
                    scriptExecute.Append("$('.filter').find('div[value=" + value.AttributeID + "]').find('#f4').attr('ids', ids);");
                }
            }


            scriptExecute.Append(" $('.chkFilter').each(function() { var itemArray = []; itemArray = $(this).attr('ids').split(','); $(this).parents('li').find('#count').text(' (' + itemArray.length + ')'); }); $('.filter').find('div[value=8]').find('ul').find('li').each(function() { var itemArray = []; if ($(this).find('a').attr('ids').indexOf(',') != -1) { var anchorItem = $(this).find('a').attr('ids').substring(1, $(this).find('a').attr('ids').length); itemArray = anchorItem.split(','); } $(this).find('#count').text(' (' + itemArray.length + ')'); }); ");
            scriptExecute.Append(
                "$('#amount').html('<span class=\"cssClassFormatCurrency\">" + minPrice * rate + "</span>' +' - ' + '<span class=\"cssClassFormatCurrency\">" + maxPrice * rate + "</span>');");
            scriptExecute.Append(
                "$('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });");

            string script = GetStringScript(scriptExecute.ToString());
            elem.Append(script);
            return elem.ToString();
        }
        return "";

    }

    private string GetStringScript(string codeToRun)
    {

        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){ setTimeout(function(){ " + codeToRun + "},500); });</script>");
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

    private float GetPriceData(float price, int count, float interval)
    {
        return (price + (count * interval));
    }
}