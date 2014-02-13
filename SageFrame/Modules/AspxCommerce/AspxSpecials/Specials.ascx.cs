/*
AspxCommerce® - http://www.aspxcommerce.com
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

public partial class Modules_AspxSpecials_Specials : BaseAdministrationUserControl
{
    public int StoreID, PortalID, NoOfSpecialItems;
    public string UserName, CultureName, EnableSpecialItems, DefaultImagePath;
    public string baseUrl = string.Empty;
    public string SpecialItemRss, RssFeedUrl;
    public int NoOfItemInRow = 2;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeJs("Specials", "/Modules/AspxCommerce/AspxSpecials/js/Specials.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                StoreSettingConfig ssc = new StoreSettingConfig();
                EnableSpecialItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableSpecialItems, StoreID, PortalID, CultureName);
                NoOfSpecialItems = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfSpecialItemDisplay, StoreID, PortalID, CultureName));
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                SpecialItemRss = ssc.GetStoreSettingsByKey(StoreSetting.SpecialItemRss, StoreID, PortalID, CultureName);
                if (SpecialItemRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
            }
            baseUrl = ResolveUrl("~/");
            IncludeLanguageJS();
            if (EnableSpecialItems.ToLower() == "true" && NoOfSpecialItems > 0)
            {
                GetSpecialItems();
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    public void GetSpecialItems()
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
        List<SpecialItemsInfo> lstSpecialItems = AspxSpecialItemController.GetSpecialItems(aspxCommonObj, NoOfSpecialItems);
        StringBuilder specialContent = new StringBuilder();

        if (lstSpecialItems != null && lstSpecialItems.Count > 0)
        {
            int rowTotal = 0;
            specialContent.Append("<div class=\"cssClassSpecialBoxInfo\" id=\"divSpItem\">");
            specialContent.Append("<ul>");
            foreach (SpecialItemsInfo item in lstSpecialItems)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
               
                if (item.ImagePath == null || item.ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                if (lstSpecialItems.IndexOf(item) % NoOfItemInRow == 0)
                {
                    specialContent.Append("<li>");
                }
                else
                {
                    specialContent.Append("<li class=\"cssClassNoMargin\">");
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
                if (item.ItemTypeID == 4)
                {
                    specialContent.Append("<a class=\"cssClassProductPicture\" href=\"");
                    specialContent.Append(aspxRedirectPath);
                    specialContent.Append("Service-Item-Details");
                    specialContent.Append(pageExtension + "?id=");
                    specialContent.Append(item.ItemID);
                    specialContent.Append("\"><img ");
                    specialContent.Append("src=\"");
                    specialContent.Append(aspxRootPath);
                    specialContent.Append(imagePath.Replace("uploads", "uploads/Small"));
                    specialContent.Append("\" alt=\"");
                    specialContent.Append(item.ItemName);
                    specialContent.Append("\"/></a><a href=\"");
                    specialContent.Append(aspxRedirectPath);
                    specialContent.Append("Service-Item-Details");
                    specialContent.Append(pageExtension + "?id=");
                    specialContent.Append(item.ItemID + "\" title=\""+item.ItemName+"\">");
                    specialContent.Append(name);
                    specialContent.Append("</a></li>");
                }
                else
                {
                    specialContent.Append("<a class=\"cssClassProductPicture\" href=\"");
                    specialContent.Append(aspxRedirectPath);
                    specialContent.Append("item/");
                    specialContent.Append(item.SKU + pageExtension);
                    specialContent.Append("\"><img ");
                    specialContent.Append("src=\"");
                    specialContent.Append(aspxRootPath);
                    specialContent.Append(imagePath.Replace("uploads", "uploads/Small"));
                    specialContent.Append("\" alt=\"");
                    specialContent.Append(item.ItemName);
                    specialContent.Append("\" /></a><a href=\"");
                    specialContent.Append(aspxRedirectPath);
                    specialContent.Append("item/");
                    specialContent.Append(item.SKU + pageExtension);
                    specialContent.Append("\" class=\"cssClassItemName\" title=\""+item.ItemName+"\">");
                    specialContent.Append(name);
                    specialContent.Append("</a></li>");
                }
                rowTotal = item.TotalSpecialItems;


            }
            specialContent.Append("</ul></div>");
            if (rowTotal > NoOfSpecialItems)
            {
                string strHtml = "<a href=\"" + aspxRedirectPath + "Details-View" + pageExtension + "?id=special\">" + getLocale("View More") + "</a>";
                divViewMoreSpecial.InnerHtml = strHtml;
            }
            ltrSpecialItems.Text = specialContent.ToString();
        }
        else
        {
            StringBuilder noSpl = new StringBuilder();
            noSpl.Append("<span class=\"cssClassNotFound\">");
            noSpl.Append(getLocale("No special item found in this store!"));
            noSpl.Append("</span>");
            divSpclBox.InnerHtml = noSpl.ToString();
            divSpclBox.Attributes.Add("class", "");
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
