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

public partial class Modules_AspxBestSellers_BestSellers : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName;
    public int CountBestSeller, MaxCompareItemCount;
    public int NoOfItemInRow = 2;
    public string EnableBestSellerItems, DefaultImagePath, AllowOutStockPurchase, AllowWishListLatestItem, AllowAddToCompareLatest;
    public string basePath = string.Empty;
    public string BestSellItemRss,RssFeedUrl;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                basePath = ResolveUrl("~/");
                IncludeJs("BestSellers", "/Modules/AspxCommerce/AspxBestSellers/js/BestSellers.js");

                StoreSettingConfig ssc = new StoreSettingConfig();
                CountBestSeller = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfBestSellersItemDisplay, StoreID, PortalID, CultureName));
                EnableBestSellerItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableBestSellerItems, StoreID, PortalID, CultureName);
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                MaxCompareItemCount = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID, CultureName));
                AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
                AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID, CultureName);
                BestSellItemRss = ssc.GetStoreSettingsByKey(StoreSetting.BestSellItemRss, StoreID, PortalID, CultureName);
                if(BestSellItemRss.ToLower()=="true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
            }
            IncludeLanguageJS();
            if (EnableBestSellerItems.ToLower() == "true" && CountBestSeller > 0)
            {
                GetBestSoldItems();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    public void GetBestSoldItems()
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
        List<BestSellerInfo> lstBestSellerItems = AspxBestSellerController.GetBestSoldItems(aspxCommonObj, CountBestSeller);
        StringBuilder bestSellerContent = new StringBuilder();
        if (lstBestSellerItems != null && lstBestSellerItems.Count > 0)
        {
            divBSItem.InnerHtml = "";
            divViewMoreBestSeller.InnerHtml = "";
            int rowTotal = 0;
            bestSellerContent.Append("<ul>");
            foreach (BestSellerInfo item in lstBestSellerItems)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == null || item.ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                rowTotal = item.TotalSoldItems;
                if ((lstBestSellerItems.IndexOf(item)+1) % NoOfItemInRow == 0)
                {
                    bestSellerContent.Append("<li class=\"cssClassNoMargin\">");
                }
                else
                {
                    bestSellerContent.Append("<li>");
                }
                bestSellerContent.Append("<a class=\"cssClassProductPicture\" href=\"");
                bestSellerContent.Append(aspxRedirectPath);
                bestSellerContent.Append("item/");
                bestSellerContent.Append(item.SKU);
                bestSellerContent.Append(pageExtension);
                bestSellerContent.Append("\" ><img ");
                bestSellerContent.Append("src=\"");
                bestSellerContent.Append(aspxRootPath);
                bestSellerContent.Append(imagePath.Replace("uploads", "uploads/Small"));
                bestSellerContent.Append("\" alt=\"");
                bestSellerContent.Append(item.ItemName);
                bestSellerContent.Append("\" /></a><a href=\"");
                bestSellerContent.Append(aspxRedirectPath);
                bestSellerContent.Append("item/");
                bestSellerContent.Append(item.SKU);
                bestSellerContent.Append(pageExtension);
                bestSellerContent.Append("\" class=\"cssClassItemName\" title=\""+item.ItemName+"\">");
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
                bestSellerContent.Append(name);
                bestSellerContent.Append("</a></li>");
            }
            bestSellerContent.Append("</ul>");
            if (rowTotal > CountBestSeller)
            {
                string strHtml = "<a href=\"" + aspxRedirectPath + "Details-View" + pageExtension + "?id=best\">" + getLocale("View More") + "</a>";
                divViewMoreBestSeller.InnerHtml = strHtml;
            }
        }
        else
        {
            divBSItem.InnerHtml = "";
            bestSellerContent.Append("<span class=\"cssClassNotFound\">");
            bestSellerContent.Append(getLocale("No item is sold in this store Yet!"));
            bestSellerContent.Append("</span>");
            divBSItem.Attributes.Add("class", "");

        }
        divBSItem.InnerHtml = bestSellerContent.ToString();
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
   
