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
using System.Collections;
using SageFrame.Web;
using AspxCommerce.Core;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

public partial class Modules_CategoryLister_CategoryViewer : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName;
    public string CategoryRss, RssFeedUrl;
    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
           // IncludeScriptFile("~/js/jquery.cookie.js");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {             
                IncludeJs("CategoryViewer", "/js/jquery.cookie.js", "/js/MegaMenu/jquery.hoverIntent.minified.js", "/js/superfish.js");
                IncludeCss("CategoryViewer",  "/Templates/" + TemplateName + "/css/SuperfishMenu/superfish.css");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                StoreSettingConfig ssc = new StoreSettingConfig();
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

    


    public string itemPath = string.Empty;
    Hashtable hst = null;
    private void GetCategoryMenuList()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        List<CategoryInfo> catInfo = AspxCategoryListController.GetCategoryMenuList(aspxCommonObj);
        if (catInfo.Count > 0)
        {
            int categoryID = 0;
            int parentID = 0;
            int? categoryLevel;
            string attributeValue = string.Empty; ;
            StringBuilder catListmaker = new StringBuilder();
            string catList = string.Empty;
            catListmaker.Append("<div class=\"cssClassCategoryNavHor\"><ul class='sf-menu'>");
            foreach (CategoryInfo eachCat in catInfo)
            {
                string css = string.Empty;
                if (eachCat.ChildCount > 0)
                {
                    css = "class=cssClassCategoryParent";
                }
                else
                {
                    css = "";
                }
                categoryID = eachCat.CategoryID;
                parentID = eachCat.ParentID;
                categoryLevel = eachCat.CategoryLevel;
                attributeValue = eachCat.AttributeValue;
                if (eachCat.CategoryLevel == 0)
                {
                    string hrefParentCategory = string.Empty;
                    hrefParentCategory = aspxRedirectPath + "category/" + AspxUtility.fixedEncodeURIComponent(eachCat.AttributeValue) + SageFrameSettingKeys.PageExtension;
                    catListmaker.Append("<li " + css + "><a href=" + hrefParentCategory + ">");
                    catListmaker.Append(eachCat.AttributeValue);
                    catListmaker.Append("</a>");

                    if (eachCat.ChildCount > 0)
                    {
                        catListmaker.Append("<ul>");
                        itemPath += eachCat.AttributeValue;
                        catListmaker.Append(BindChildCategory(catInfo, categoryID));
                        catListmaker.Append("</ul>");
                    }
                    catListmaker.Append("</li>");
                }
                itemPath = string.Empty;
            }

            catListmaker.Append("<div class=\"cssClassclear\"></div></ul></div>");
            divCategoryListerH.InnerHtml = catListmaker.ToString();
            

        }
        else
        {
            string strText = ("<span class=\"cssClassNotFound\">" + getLocale("This store has no category found!") + "</span>");//Need to add Local Text
            divCategoryListerH.InnerHtml = strText;
        }
        //if ($('.cssClassCategoryNav>ul>li').length > 4) {
        //    $('.cssClassCategoryNav>ul>li:last').addClass('cssClassLastMenu');
        //}

    }

    public string BindChildCategory(List<CategoryInfo> response, int categoryID)
    {
        StringBuilder strListmaker = new StringBuilder();
        string childNodes = string.Empty; ;
        string path = string.Empty; ;
        itemPath += "/";
        foreach (CategoryInfo eachCat in response)
        {
            if (eachCat.CategoryLevel > 0)
            {
                if (eachCat.ParentID == categoryID)
                {
                    string css = string.Empty;
                    if (eachCat.ChildCount > 0)
                    {
                        css = "class=cssClassCategoryParent";
                    }
                    else
                    {
                        css = "";
                    }
                    string hrefCategory = aspxRedirectPath + "category/" + AspxUtility.fixedEncodeURIComponent(eachCat.AttributeValue) + SageFrameSettingKeys.PageExtension;
                    itemPath += eachCat.AttributeValue;
                    strListmaker.Append("<li " + css + "><a href=" + hrefCategory + ">" + eachCat.AttributeValue + "</a>");
                    childNodes = BindChildCategory(response, eachCat.CategoryID);
                    itemPath = itemPath.Replace(itemPath.LastIndexOf(eachCat.AttributeValue).ToString(), "");
                    if (childNodes != string.Empty)
                    {
                        strListmaker.Append("<ul>" + childNodes + "</ul>");
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
