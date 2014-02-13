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
using System.Collections.Generic;
using System.Text;
using System.Web;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxRecentlyComparedItems_RecentlyComparedItems : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName;
    public int CountCompare;
    public string EnableRecentlyCompared, EnableCompareItemsRecently, DefaultImagePath;
    public string ModuleCollapsible;
    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("RecentlyComparedItems", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("RecentlyComparedItems", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js",
                    "/Modules/AspxCommerce/AspxRecentlyComparedItems/js/RecentlyComparedItems.js", "/js/jquery.tipsy.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;

                StoreSettingConfig ssc = new StoreSettingConfig();
                CountCompare = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfRecentlyComparedItems, StoreID, PortalID, CultureName));
                EnableRecentlyCompared = ssc.GetStoreSettingsByKey(StoreSetting.EnableRecentlyComparedItems, StoreID, PortalID, CultureName);
                EnableCompareItemsRecently = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID, CultureName);
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);
            }
            if (EnableRecentlyCompared.ToLower() == "true")
            {
                BindRecentlyCompareItems();
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    private void BindRecentlyCompareItems()
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
        List<ItemsCompareInfo> lstRecentCompItem = AspxCompareItemController.GetRecentlyComparedItemList(CountCompare, aspxCommonObj);
        StringBuilder recentlyCompare = new StringBuilder();

        recentlyCompare.Append("<tbody>");
        if (lstRecentCompItem != null && lstRecentCompItem.Count > 0)
        {

            foreach (var itemsCompareInfo in lstRecentCompItem)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + itemsCompareInfo.ImagePath;
                if (itemsCompareInfo.ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                if (lstRecentCompItem.IndexOf(itemsCompareInfo) % 2 == 0)
                {
                    if (itemsCompareInfo.ItemCostVariantValue != "")
                    {
                        recentlyCompare.Append("<tr class=\"sfEven\"><td>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + "?varId=" + itemsCompareInfo.CostVariantValueID + ">");
                        recentlyCompare.Append("<div class=\"cssClassImageWrapper\"><img src=\"" + aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                        recentlyCompare.Append("\" title=\"");
                        recentlyCompare.Append(itemsCompareInfo.ItemName);
                        recentlyCompare.Append("\"/></div></a>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + "?varId=" + itemsCompareInfo.CostVariantValueID + ">" + itemsCompareInfo.ItemName + '(' + itemsCompareInfo.ItemCostVariantValue + ')' + "</a>");
                        recentlyCompare.Append("</td></tr>");
                    }
                    else
                    {
                        recentlyCompare.Append("<tr class=\"sfEven\"><td>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + ">");
                        recentlyCompare.Append("<div class=\"cssClassImageWrapper\"><img src=\"" + aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                        recentlyCompare.Append("\" title=\"");
                        recentlyCompare.Append(itemsCompareInfo.ItemName);
                        recentlyCompare.Append("\"/></div></a>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + ">" + itemsCompareInfo.ItemName + "</a>");
                        recentlyCompare.Append("</td></tr>");
                    }
                }
                else
                {
                    if (itemsCompareInfo.ItemCostVariantValue != "")
                    {
                        recentlyCompare.Append("<tr class=\"sfOdd\"><td>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + "?varId=" + itemsCompareInfo.CostVariantValueID + ">");
                        recentlyCompare.Append("<div class=\"cssClassImageWrapper\"><img src=\"" + aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                        recentlyCompare.Append("\" title=\"");
                        recentlyCompare.Append(itemsCompareInfo.ItemName);
                        recentlyCompare.Append("\"/></div></a>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + "?varId=" + itemsCompareInfo.CostVariantValueID + ">" + itemsCompareInfo.ItemName + '(' + itemsCompareInfo.ItemCostVariantValue + ')' + "</a>");
                        recentlyCompare.Append("</td></tr>");
                    }
                    else
                    {
                        recentlyCompare.Append("<tr class=\"sfOdd\"><td>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + ">");
                        recentlyCompare.Append("<div class=\"cssClassImageWrapper\"><img src=\"" + aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                        recentlyCompare.Append("\" title=\"");
                        recentlyCompare.Append(itemsCompareInfo.ItemName);
                        recentlyCompare.Append("\"/></div></a>");
                        recentlyCompare.Append("<a href=" + aspxRedirectPath + "item/" + itemsCompareInfo.SKU + pageExtension + ">" + itemsCompareInfo.ItemName + "</a>");
                        recentlyCompare.Append("</td></tr>");
                    }
                }
            }
        }
        else
        {
            recentlyCompare.Append("<tr><td><span class=\"cssClassNotFound\">" + getLocale("You have not viewed any items yet!") + "</span></tr></td>");
        }
        recentlyCompare.Append("</tbody>");
        ltrRecentlyCompareItem.Text = recentlyCompare.ToString();
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
