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
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections;
using System.Collections.Generic;
using System.Text;

public partial class Modules_AspxGeneralSearch_SimpleSearch : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName;
    public string CultureName, AdvanceSearchURL, ShowCategoryForSearch, EnableAdvanceSearch, ShowSearchKeyWords;
    public bool IsUseFriendlyUrls = true;
    public string ResultPage;
    protected void page_init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            SageFrameConfig pagebase = new SageFrameConfig();
            StoreSettingConfig ssc = new StoreSettingConfig();
            IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
            if (!IsPostBack)
            {
                IncludeCss("SimpleSearch", "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery.ui.all.css");
                IncludeJs("SimpleSearch", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/Modules/AspxCommerce/AspxGeneralSearch/js/SimpleSearch.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                IncludeLanguageJS();
                AdvanceSearchURL = ssc.GetStoreSettingsByKey(StoreSetting.AdvanceSearchURL, StoreID, PortalID, CultureName);
                AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
                aspxCommonObj.StoreID = StoreID;
                aspxCommonObj.PortalID = PortalID;
                aspxCommonObj.CultureName = CultureName;
                SearchSettingInfo objSettingInfo = AspxSearchController.GetSearchSetting(aspxCommonObj);
                ShowCategoryForSearch = objSettingInfo.ShowCategoryForSearch;
                EnableAdvanceSearch = objSettingInfo.EnableAdvanceSearch;
                ShowSearchKeyWords = objSettingInfo.ShowSearchKeyWord;
           
                ResultPage=ssc.GetStoreSettingsByKey(StoreSetting.DetailPageURL, StoreID, PortalID,
                                                               CultureName);

            }

            if (ShowCategoryForSearch.ToLower() == "true")
            {
                GetAllCategoryForSearch();
            }
            if (ShowSearchKeyWords.ToLower() == "true")
            {
                GetTopSearchTerms();
            }
            IncludeLanguageJS();

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    public void GetAllCategoryForSearch()
    {
        bool isActive = true;
        string prefix = "---";
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<CategoryInfo> lstCategory = AspxSearchController.GetAllCategoryForSearch(prefix, isActive, aspxCommonObj);
        if (lstCategory != null && lstCategory.Count > 0)
        {
            StringBuilder Elements = new StringBuilder();
            Elements.Append("<ul id=\"sfSimpleSearchCategory\" style=\"display: none\">");
            Elements.Append("<li value=\"0\" ><a href=\"#\"><span class=\"value\" category=\"--All Category--\">");
            Elements.Append(getLocale("--All Category--"));
            Elements.Append("</span></a></li>");
            foreach (CategoryInfo item in lstCategory)
            {
                Elements.Append("<li value=\"");
                Elements.Append(item.CategoryID);
                Elements.Append("\"><a href=\"#\"><span class=\"value\" category=\"");
                Elements.Append(item.LevelCategoryName);
                Elements.Append("\">");
                Elements.Append(item.LevelCategoryName);
                Elements.Append("</span></a></li>");
            }

            Elements.Append("</ul>");
            litSSCat.Text = Elements.ToString();
        }


    }

    public void GetTopSearchTerms()
    {
        int count = 5;
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<SearchTermList> lstSearchTerm = AspxSearchController.GetTopSearchTerms(aspxCommonObj, count);
        if (lstSearchTerm != null && lstSearchTerm.Count > 0)
        {
            StringBuilder Elements = new StringBuilder();
            Elements.Append("<div id=\"topSearch\" class=\"cssClassTopSearch\" style=\"display: none\">");
            Elements.Append("<span>");
            Elements.Append(getLocale("Popular:"));
            Elements.Append("</span>");
            Elements.Append("<ul id=\"topSearchNew\">");
            foreach (SearchTermList item in lstSearchTerm)
            {

                Elements.Append("<li><a href=\"");
                Elements.Append(aspxRedirectPath);
                Elements.Append("search/simplesearch");
                Elements.Append(pageExtension);
                Elements.Append("?cid=0&amp;q=");
                Elements.Append(item.SearchTerm);
                Elements.Append("\"><span>");
                Elements.Append(item.SearchTerm);
                Elements.Append("</span></a></li>");
            }
            Elements.Append("</ul>");
            Elements.Append("</div>");
            litTopSearch.Text = Elements.ToString();
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
