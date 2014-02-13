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
using System.Web;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections;
using System.Collections.Generic;
using System.Text;

public partial class Modules_AspxRecentlyViewedItems_RecentlyViewedItems : BaseAdministrationUserControl
{
    public string SessionCode = string.Empty;
    public int StoreID, PortalID;
    public string UserName = string.Empty;
    public string CultureName = string.Empty;
    public int CountViewedItems;
    public int NoOfItemInRow = 2;
    public string EnableRecentlyViewed = string.Empty;
    public string DefaultImagePath = string.Empty;
    public string basePath = string.Empty;

    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                basePath = ResolveUrl("~/");
                IncludeCss("RecentlyViewedItems", "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("RecentlyViewedItems", "/Modules/AspxCommerce/AspxRecentlyViewedItems/js/RecentlyViewedItems.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }

                StoreSettingConfig ssc = new StoreSettingConfig();
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                CountViewedItems = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfRecentlyViewedItemsDispay, StoreID, PortalID, CultureName));
                EnableRecentlyViewed = ssc.GetStoreSettingsByKey(StoreSetting.EnableRecentlyViewedItems, StoreID, PortalID, CultureName);
            }
            IncludeLanguageJS();
            if (EnableRecentlyViewed.ToLower() == "true" && CountViewedItems > 0)
            {
                GetRecentlyViewedItems();
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    public void GetRecentlyViewedItems()
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
        List<RecentlyViewedItemsInfo> lstRecentViewItems = AspxRecentViewItemController.GetRecentlyViewedItems(CountViewedItems, aspxCommonObj);
        StringBuilder RecentlyViewedItems = new StringBuilder();
        RecentlyViewedItems.Append("<div id=\"divRecentlyViewedItems\">");
        if (lstRecentViewItems != null && lstRecentViewItems.Count > 0)
        {
            int rowTotal = 0;
            RecentlyViewedItems.Append("<ul>");
            foreach (RecentlyViewedItemsInfo item in lstRecentViewItems)
            {
                rowTotal = item.RowTotal;
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == null || item.ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                if (lstRecentViewItems.IndexOf(item) % NoOfItemInRow == 0)
                {
                    RecentlyViewedItems.Append("<li>");
                }
                else
                {
                    RecentlyViewedItems.Append("<li class=\"cssClassNoMargin\">");
                }
                string name = string.Empty;
                if (item.ItemName.Length > 50)
                {
                    name = item.ItemName.Substring(0, 50);
                    int index = 0;
                    index = name.LastIndexOf(' ');
                    name = name.Substring(0, index);
                    name = name + "...";
                }
                else
                {
                    name = item.ItemName;
                }
                if(item.ItemTypeID==4)
                {
                    RecentlyViewedItems.Append("<a class=\"cssClassProductPicture\" href=\"");
                    RecentlyViewedItems.Append(aspxRedirectPath);
                    RecentlyViewedItems.Append("item/");
                    RecentlyViewedItems.Append(item.SKU);
                    RecentlyViewedItems.Append(pageExtension);
                    RecentlyViewedItems.Append("\" ><img ");
                    RecentlyViewedItems.Append("src=\"");
                    RecentlyViewedItems.Append(aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                    RecentlyViewedItems.Append("\" alt=\"");
                    RecentlyViewedItems.Append(item.ItemName);
                    RecentlyViewedItems.Append("\" /></a><a href=\"");
                    RecentlyViewedItems.Append(aspxRedirectPath);
                    RecentlyViewedItems.Append("Service-Item-Details");
                    RecentlyViewedItems.Append(pageExtension + "?id=");
                    RecentlyViewedItems.Append(pageExtension);
                    RecentlyViewedItems.Append(item.ItemID + "\" title=\""+item.ItemName+"\">");
                    RecentlyViewedItems.Append(name);
                    RecentlyViewedItems.Append("</a></li>");
                }
                else
                {
                    RecentlyViewedItems.Append("<a class=\"cssClassProductPicture\" href=\"");
                    RecentlyViewedItems.Append(aspxRedirectPath);
                    RecentlyViewedItems.Append("item/");
                    RecentlyViewedItems.Append(item.SKU);
                    RecentlyViewedItems.Append(pageExtension);
                    RecentlyViewedItems.Append("\" ><img ");
                    RecentlyViewedItems.Append("src=\"");
                    RecentlyViewedItems.Append(aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                    RecentlyViewedItems.Append("\" alt=\"");
                    RecentlyViewedItems.Append(item.ItemName);
                    RecentlyViewedItems.Append("\" /></a><a href=\"");
                    RecentlyViewedItems.Append(aspxRedirectPath);
                    RecentlyViewedItems.Append("item/");
                    RecentlyViewedItems.Append(item.SKU);
                    RecentlyViewedItems.Append(pageExtension);
                    RecentlyViewedItems.Append("\" class=\"cssClassItemName\" title=\""+item.ItemName+"\">");
                    RecentlyViewedItems.Append(name);
                    RecentlyViewedItems.Append("</a></li>");    
                }
            }
            RecentlyViewedItems.Append("</ul>");

            if (rowTotal > CountViewedItems)
            {
                string strHtml = "<a href=\"" + aspxRedirectPath + "Details-View" + pageExtension + "?id=recent\">" + getLocale("View More") + "</a>";
                divViewMoreRecently.InnerHtml = strHtml;
            }
        }
        else
        {
            RecentlyViewedItems.Append("<tr><td><span class=\"cssClassNotFound\">");
            RecentlyViewedItems.Append(getLocale("You have not viewed any items yet!"));
            RecentlyViewedItems.Append("</span></tr></td>");
        }
        RecentlyViewedItems.Append("</div>");
        litRVItems.Text = RecentlyViewedItems.ToString();
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
