using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using System.Text.RegularExpressions;
using AspxCommerce.Core;
using System.Text;

public partial class Modules_AspxCategoryMenuAccordin_CategoryMenuAccordin : BaseAdministrationUserControl
{
    public string ModuleCollapsible;
    public string NoImageCategoryDetailPath;
    public string CategoryRss, RssFeedUrl;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                Page.ClientScript.RegisterClientScriptInclude("AspxCategoryMenuAccordin", ResolveUrl("~/Modules/AspxCommerce/AspxCategoryMenuAccordin/js/jquery.cookie.js"));
                IncludeJs("CategoryMenuAccordin", "/js/MegaMenu/jquery.hoverIntent.minified.js", "/js/MegaMenu/jquery.dcverticalmegamenu.1.3.js");
                IncludeCss("CategoryMenuAccordin", "/Templates/" + TemplateName + "/css/MegaMenu/dcverticalmegamenu.css");
                StoreSettingConfig ssc = new StoreSettingConfig();
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, GetStoreID, GetPortalID, GetCurrentCultureName);
                NoImageCategoryDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, GetStoreID, GetPortalID, GetCurrentCultureName);
                CategoryRss = ssc.GetStoreSettingsByKey(StoreSetting.NewCategoryRss, GetStoreID, GetPortalID, GetCurrentCultureName);
                if (CategoryRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, GetStoreID, GetPortalID, GetCurrentCultureName);
                }
            }
            GetCategoryMenuList();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    private void GetCategoryMenuList()
    {
        
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        List<CategoryInfo> catInfo = AspxCategoryListController.GetCategoryMenuList(aspxCommonObj);
        if (catInfo!= null && catInfo.Count > 0)
        {
            int categoryID = 0;            
            StringBuilder catListmaker = new StringBuilder();
            string catList = string.Empty;
            catListmaker.Append("<ul class='mega-menu' id='divMegaMenu'>");
            foreach (CategoryInfo eachCat in catInfo)
            {
                categoryID = eachCat.CategoryID;                
                if (eachCat.CategoryLevel == 0)
                {
                    string hrefParentCategory = string.Empty;
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
                        catListmaker.Append(BindChildCategory(catInfo, categoryID));
                        catListmaker.Append("</ul>");
                    }
                    catListmaker.Append("</li>");
                }                
            }
            catListmaker.Append("</ul>");
            divCategoryVertical.InnerHtml = ("<div class=\"cssClassCategoryNav\">" + catListmaker + "</div>");
        }
        else
        {
            string strText = ("<span id=\"spanCatNotFound\" class=\"cssClassNotFound\">" + getLocale("This store has no category found!") + " </span>");//Need to add Local Text
            divCategoryVertical.InnerHtml = strText;
        }
       
    }

    public string BindChildCategory(List<CategoryInfo> response, int categoryID)
    {
        StringBuilder strListmaker = new StringBuilder();
        string childNodes = string.Empty;                
        foreach (CategoryInfo eachCat in response)
        {
            if (eachCat.CategoryLevel > 0)
            {
                if (eachCat.ParentID == categoryID)
                {
                    strListmaker.Append("<li><a href=\"");
                    strListmaker.Append(aspxRedirectPath);
                    strListmaker.Append("category/");
                    string strRet =  AspxUtility.fixedEncodeURIComponent(eachCat.AttributeValue);
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
                    strListmaker.Append("</li>");
                }
            }
        }
        return strListmaker.ToString();

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