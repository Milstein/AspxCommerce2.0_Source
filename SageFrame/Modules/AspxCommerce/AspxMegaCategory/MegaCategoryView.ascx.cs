using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using AspxCommerce.MegaCategory;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxMegaCategory_MegaCategoryView : BaseAdministrationUserControl
{
    public int noOfColumn;
    public string modeOfView, showCatImage, showSubCatImage, speed, direction, eventMega, effect, NoImageCategoryDetailPath;
    string categoryImagePath = string.Empty;
    public string CategoryRss, RssFeedUrl;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                Page.ClientScript.RegisterClientScriptInclude("MegaCategoryView1", ResolveUrl("~/js/jquery.cookie.js"));
                IncludeJs("MegaCategoryView", "/Modules/AspxCommerce/AspxMegaCategory/js/jquery.hoverIntent.minified.js", "/Modules/AspxCommerce/AspxMegaCategory/js/jquery.dcverticalmegamenu.1.3.js", "/Modules/AspxCommerce/AspxMegaCategory/js/jquery.dcmegamenu.1.3.3.js");
                IncludeCss("MegaCategoryView", "/Modules/AspxCommerce/AspxMegaCategory/css/dcmegamenu.css", "/Modules/AspxCommerce/AspxMegaCategory/css/dcverticalmegamenu.css");
                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageCategoryDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, GetStoreID, GetPortalID, GetCurrentCultureName);
                CategoryRss = ssc.GetStoreSettingsByKey(StoreSetting.NewCategoryRss, GetStoreID, GetPortalID, GetCurrentCultureName);
                if (CategoryRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, GetStoreID, GetPortalID, GetCurrentCultureName);
                }
            }
            GetMegaCategorySetting();
            GetCategoryMenuList();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void GetMegaCategorySetting()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        List<MegaCategorySettingInfo> megaCatSetting = MegaCategoryController.GetMegaCategorySetting(aspxCommonObj);
        if (megaCatSetting != null && megaCatSetting.Count > 0)
        {
            foreach (MegaCategorySettingInfo item in megaCatSetting)
            {
                modeOfView = item.ModeOfView;
                noOfColumn = item.NoOfColumn;
                showCatImage = item.ShowCategoryImage;
                showSubCatImage = item.ShowSubCategoryImage;
                speed = item.Speed;
                effect = item.Effect;
                eventMega = item.EventMega;
                direction = item.Direction;
            }
        }
    }
    Hashtable hst = null;
    private void GetCategoryMenuList()
    {
        categoryImagePath = "/Modules/AspxCommerce/AspxCategoryManagement/uploads/";
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        string scriptAdd = string.Empty;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        List<MegaCategoryViewInfo> megaCatIfo = MegaCategoryController.GetCategoryMenuList(aspxCommonObj);
        if (megaCatIfo != null && megaCatIfo.Count > 0)
        {
            int categoryID = 0;
            StringBuilder catListmaker = new StringBuilder();
            if (modeOfView == "vertical")
            {
                catListmaker.Append(
                    "<div class=\"divHeaderTitle\"><h2 class=\"cssClassLeftHeader\"><span>" + getLocale("Categories") +
                    "</span>");

                catListmaker.Append(
                    "<a class=\"cssRssImage\" href=\"#\" style=\"display: none\"><img id=\"categoryRssImage\" alt=\"\" src=\"\" title=\"\" /></a></h2></div>");
                catListmaker.Append("<ul class='mega-menuV' id='divMegaMenu'>");
                scriptAdd = "$(\"#divMegaCategoryContainer\").show();$('#divMegaMenu').dcVerticalMegaMenu({rowItems:" + "'" + noOfColumn + "'" + ",speed: " + "'" + speed + "'" + ",effect:" + "'" + effect + "'" + ",direction: " + "'" + direction + "'" + "});";
            }
            else if (modeOfView == "horizontal")
            {
                catListmaker.Append("<ul class='mega-menuH' id='mega-menuH'>");
                scriptAdd = "$(\"#divMegaCategoryContainer\").show();$('#mega-menuH').dcMegaMenu({rowItems:" + "'" + noOfColumn + "'" + ",speed:" + "'" + speed + "'" + ",effect:" + "'" + effect + "'" + ",event:" + "'" + eventMega + "'" + ",fullWidth: true});";
            }
            else
            {
                catListmaker.Append("<ul class='mega-menuV cssMegaCategoryLi' id='divMegaMenu'>");
                catListmaker.Append(
                    "<div class=\"cssCollapable\"><h2><span>"+getLocale("All Categories")+"</span><a class=\"cssRssImage\" href=\"#\" style=\"display: none\"><img id=\"categoryRssImage\" alt=\"\" src=\"\" title=\"\" /></a></h2></div>");

                scriptAdd = "$(\"#divMegaCategoryContainer\").show();$('#divMegaMenu').dcVerticalMegaMenu({rowItems:" +
                            "'" + noOfColumn + "'" + ",speed: " + "'" + speed + "'" + ",effect:" + "'" + effect + "'" +
                            ",direction: " + "'" + direction + "'" +
                            "});$('#divMegaMenu li').hide();$('#divMegaMenu').mouseover(function(){$('#divMegaMenu li').show();});$('#divMegaMenu').mouseout(function(){$('#divMegaMenu li').hide();});";
            }
           
            foreach (MegaCategoryViewInfo eachCat in megaCatIfo)
            {
                categoryID = eachCat.CategoryID;
                if (eachCat.CategoryLevel == 0)
                {
                    catListmaker.Append("<li><a href=\"");
                    catListmaker.Append(aspxRedirectPath);
                    catListmaker.Append("category/");
                    string strRet = AspxUtility.fixedEncodeURIComponent(eachCat.AttributeValue);
                    catListmaker.Append(strRet);
                    catListmaker.Append(SageFrameSettingKeys.PageExtension);
                    catListmaker.Append("\">");
                    catListmaker.Append(eachCat.AttributeValue);
                    catListmaker.Append("</a>");
                    if (eachCat.ChildCount > 0)
                    {
                        catListmaker.Append("<ul>");
                        catListmaker.Append(BindChildCategory(megaCatIfo, categoryID));
                        if (showCatImage == "true")
                        {
                            if (eachCat.CategoryImagePath != null || eachCat.CategoryImagePath != "")
                            {
                                catListmaker.Append("<div class=\"classCatImage\"><img src=\"");
                                catListmaker.Append(categoryImagePath + eachCat.CategoryImagePath);
                                catListmaker.Append("\" alt=" + eachCat.AttributeValue + " title=" + eachCat.AttributeValue + " /></div>");

                            }
                        }
                        catListmaker.Append("</ul>");
                    }
                    catListmaker.Append("</li>");
                }
            }
            catListmaker.Append("</ul>");
            catListmaker.Append(GetStringScript(scriptAdd));
            divMegaCategory.InnerHtml = catListmaker.ToString();

        }
        else
        {
            string strText = string.Empty;
            if (modeOfView == "collapseable")
            {
                strText = "<div class=\"cssCollapable\"><h2><span>"+getLocale("All Categories")+"</span><a class=\"cssRssImage\" href=\"#\" style=\"display: none\"><img id=\"categoryRssImage\" alt=\"\" src=\"\" title=\"\" /></a></h2></div>";
            }
            strText += ("<span id=\"spanCatNotFound\" class=\"cssClassNotFound\">" + getLocale("This store has no category found!") + "</span>");//Need to add Local Text
            scriptAdd = "$(\"#divMegaCategoryContainer\").show();";
            strText += GetStringScript(scriptAdd);
            divMegaCategory.InnerHtml = strText;
        }
    }

    public string BindChildCategory(List<MegaCategoryViewInfo> response, int categoryID)
    {
        StringBuilder strListmaker = new StringBuilder();
        string childNodes = string.Empty;
        foreach (MegaCategoryViewInfo eachCat in response)
        {
            if (eachCat.CategoryLevel > 0)
            {
                if (eachCat.ParentID == categoryID)
                {

                    strListmaker.Append("<li>");
                    strListmaker.Append("<a href=\"");
                    strListmaker.Append(aspxRedirectPath);
                    strListmaker.Append("category/");
                    string strRet = AspxUtility.fixedEncodeURIComponent(eachCat.AttributeValue);
                    strListmaker.Append(strRet);
                    strListmaker.Append(SageFrameSettingKeys.PageExtension);
                    strListmaker.Append("\">");
                    strListmaker.Append(eachCat.AttributeValue);
                    strListmaker.Append("</a>");
                    childNodes = BindChildCategory(response, eachCat.CategoryID);
                    if (childNodes != string.Empty)
                    {
                        strListmaker.Append("<ul>");
                        strListmaker.Append(childNodes);
                        strListmaker.Append("</ul>");
                    }
                    if (showSubCatImage == "true")
                    {
                        if (eachCat.CategoryLevel == 1)
                        {
                            if (eachCat.CategoryImagePath != null || eachCat.CategoryImagePath != "")
                            {
                                strListmaker.Append("<div class=\"classMegaSubCatImage\"><img src=\"");
                                strListmaker.Append(categoryImagePath + eachCat.CategoryImagePath);
                                strListmaker.Append("\" alt=" + eachCat.AttributeValue + " title=" + eachCat.AttributeValue +
                                                    " /></div>");
                            }
                        }
                    }
                    strListmaker.Append("</li>");
                }
            }
        }
        return strListmaker.ToString();

    }
    private string GetStringScript(string codeToRun)
    {
        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){" +
                      codeToRun + " });</script>");
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
