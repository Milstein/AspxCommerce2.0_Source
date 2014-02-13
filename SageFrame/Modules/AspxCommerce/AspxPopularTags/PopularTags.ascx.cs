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
using System.Collections.Generic;
using System.Collections;
using System.Text;

public partial class Modules_AspxPopularTags_PopularTags : BaseAdministrationUserControl
{
    public int StoreID, PortalID, NoOfPopTags;
    public string UserName, CultureName;
    public string PopularTagRss, RssFeedUrl;
    public string ModuleCollapsible;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("PopularTags", "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("PopularTags", "/Modules/AspxCommerce/AspxPopularTags/js/PopularTag.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;

                StoreSettingConfig ssc = new StoreSettingConfig();
                NoOfPopTags = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfPopularTags, StoreID, PortalID, CultureName));
                PopularTagRss = ssc.GetStoreSettingsByKey(StoreSetting.PopularTagRss, StoreID, PortalID, CultureName);
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);
                if (PopularTagRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
            }
            IncludeLanguageJS();
            if (NoOfPopTags > 0)
            {
                GetAllPopularTags();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    public void GetAllPopularTags()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<TagDetailsInfo> lstTagDetail = AspxTagsController.GetAllPopularTags(aspxCommonObj, NoOfPopTags);
        StringBuilder popularTagContent = new StringBuilder();
        popularTagContent.Append("<div id=\"divPopularTags\" class=\"cssClassPopularTags\">");
        StringBuilder allTag = new StringBuilder();
        allTag.Append("<span id=\"divViewAllTags\" class=\"cssClassViewAllTags\"></span>");
        ltrViewAllTag.Text = allTag.ToString();
        if (lstTagDetail != null && lstTagDetail.Count > 0)
        {
            float? totalTagCount = 0;
            int? tagCount = 0;
            popularTagContent.Append("<ul id=\"tagList\">");
            for (int index = 0; index < lstTagDetail.Count; index++)
            {
                if (index == 0)
                {
                    tagCount = lstTagDetail[index].RowTotal;
                }
                totalTagCount = lstTagDetail[index].TagCount;
                string fSize = (totalTagCount / 10 < 1) ? ((totalTagCount / 10) + 1) + "em" : (((totalTagCount / 10) > 2) ? "2em" : (totalTagCount / 10) + "em");
                if (index != lstTagDetail.Count - 1)
                {
                    popularTagContent.Append("<li><a title=\"See all items tagged with ");
                    popularTagContent.Append(lstTagDetail[index].Tag);
                    popularTagContent.Append("\" href=\"");
                    popularTagContent.Append(aspxRedirectPath + "tagsitems/tags" + pageExtension + "?tagsId=");
                    popularTagContent.Append(lstTagDetail[index].ItemTagIDs);
                    popularTagContent.Append("\" style=\"");
                    popularTagContent.Append("font-size: ");
                    popularTagContent.Append(fSize);
                    popularTagContent.Append(";\">");
                    popularTagContent.Append(lstTagDetail[index].Tag + " ");
                    popularTagContent.Append("</a></li>");
                }
                else
                {
                    popularTagContent.Append("<li><a title=\"See all items tagged with ");
                    popularTagContent.Append(lstTagDetail[index].Tag);
                    popularTagContent.Append("\" href=\"");
                    popularTagContent.Append(aspxRedirectPath + "tagsitems/tags" + pageExtension + "?tagsId=");
                    popularTagContent.Append(lstTagDetail[index].ItemTagIDs);
                    popularTagContent.Append("\" style=\"");
                    popularTagContent.Append("font-size: ");
                    popularTagContent.Append(fSize);
                    popularTagContent.Append("\">");
                    popularTagContent.Append(lstTagDetail[index].Tag);
                    popularTagContent.Append("</a></li>");
                }
            }
            popularTagContent.Append("</ul><div class=\"cssClassClear\"></div>");
            if (tagCount > NoOfPopTags && tagCount > 0)
            {
                string strHtml = "<span class=\"cssClassViewMore\"><a href=\"" + aspxRedirectPath + "tags/alltags" + pageExtension + "\" title =\"View all tags\">" + getLocale("View All Tags") + "</a></span>";
                popularTagContent.Append(strHtml);
                ltrViewAllTag.Visible = true;

            }
            else
            {
                ltrViewAllTag.Visible = false;

            }
        }
        else
        {
            popularTagContent.Append("<span class=\"cssClassNotFound\">");
            popularTagContent.Append(getLocale("Not any items have been tagged yet!"));
            popularTagContent.Append("</span>");
            ltrViewAllTag.Visible = false;
        }
        popularTagContent.Append("</div>");
        ltrPopularTags.Text = popularTagContent.ToString();


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
