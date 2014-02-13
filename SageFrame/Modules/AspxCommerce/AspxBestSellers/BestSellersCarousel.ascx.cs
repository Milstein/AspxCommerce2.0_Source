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

public partial class Modules_AspxBestSellers_BestSellersCarousel : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public int CountBestSeller, MaxCompareItemCount;
    public int RowTotal = 0;

    public string EnableBestSellerItems,
                  DefaultImagePath,
                  AllowOutStockPurchase,
                  AllowWishListLatestItem,
                  AllowAddToCompareLatest;

    public string basePath = string.Empty;

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
                CustomerID = GetCustomerID;
                basePath = ResolveUrl("~/");
                IncludeJs("BestSellersCarousel",
                          "/Modules/AspxCommerce/AspxBestSellers/js/BestSellersCarousel.js",
                          "/js/Sliderjs/jquery.bxSlider.js");
                IncludeCss("BxSlider", "/Templates/" + TemplateName + "/css/Slider/style.css");

                StoreSettingConfig ssc = new StoreSettingConfig();
                CountBestSeller =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfBestSellersItemDisplay, StoreID, PortalID,
                                                        CultureName));
                EnableBestSellerItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableBestSellerItems, StoreID, PortalID,
                                                                  CultureName);
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID,
                                                             CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID,
                                                                  CultureName);
                MaxCompareItemCount =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID,
                                                        CultureName));
                AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID,
                                                                    CultureName);
                AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID,
                                                                    CultureName);

            }
            IncludeLanguageJS();
            if (EnableBestSellerItems.ToLower() == "true")
            {
                GetBestSellerCasrousel();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private Hashtable hst = null;

    private void GetBestSellerCasrousel()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        int offset = 1;
        List<CategoryDetailsOptionsInfo> bestItemsInfo = AspxBestSellerController.GetBestSellerCarousel(offset,
                                                                                                        CountBestSeller,
                                                                                                        aspxCommonObj, 1);
        RowTotal = bestItemsInfo.Count;
        StringBuilder bestItemContents = new StringBuilder();
        string aspxRootPath = ResolveUrl("~/");
        string pageExtension = SageFrameSettingKeys.PageExtension;
        decimal rate = 1;
        StoreSettingConfig ssc = new StoreSettingConfig();
        decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName));
        string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
        if (HttpContext.Current.Session["CurrencyRate"] != null)
        {
            if (Session["CurrencyCode"].ToString() != MainCurrency)
            {
                decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                rate = Math.Round(rate1 + (rate1 * additionalCCVR / 100), 4);
            }
            else
            {
                rate = decimal.Parse(Session["CurrencyRate"].ToString());
            }
        }
        bestItemContents.Append("<div id=\"divBestSellerBoxInfo\" class=\"cssClassBestSellerBoxInfoCarousel\">");
        if (bestItemsInfo != null && bestItemsInfo.Count > 0)
        {
            foreach (CategoryDetailsOptionsInfo item in bestItemsInfo)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == "")
                {
                    imagePath = DefaultImagePath;
                }
                decimal listPriceValue = 0;
                if (item.ListPrice == "")
                {
                    item.ListPrice = null;
                }
                else
                {
                    listPriceValue = Convert.ToDecimal(item.ListPrice);
                }

                decimal priceValue = Convert.ToDecimal(item.Price);
                string itemPrice = Math.Round(double.Parse((item.Price).ToString()), 2).ToString();
                string itemPriceRate = Math.Round(double.Parse((priceValue * rate).ToString()), 2).ToString();
                bestItemContents.Append("<div class=\"cssClassProductsBoxWrapper\">");
                bestItemContents.Append("<div class=\"cssClassProductsBox\">");

                string hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
                string name = string.Empty;
                if (item.Name.Length > 50)
                {
                    name = item.Name.Substring(0, 50);
                    int index = 0;
                    index = name.LastIndexOf(' ');
                    name = name.Substring(0, index);
                    name = name + "...";
                }
                else
                {
                    name = item.Name;
                }
                bestItemContents.Append("<div id=\"productCarasoulImageWrapID_" + item.ItemID +
                                        "\" class=\"cssClassProductsBoxInfo\" costvariantItem=" + item.IsCostVariantItem +
                                        "  itemid=\"" + item.ItemID +
                                        "\"><a href=\"" + hrefItem + "\" title=\""+item.Name+"\"><h2>" + name + "</h2></a><div  class=\"cssClassProductPicture\"><a href=\"" +
                                        hrefItem + "\"><img alt=\"" + item.Name +
                                        "\"  title=\"" + item.Name + "\" src=\"" + aspxRootPath +
                                        imagePath.Replace("uploads", "uploads/Medium") + "\" ></a></div><h3>" +
                                        item.SKU + "</h3>");


                if (item.ListPrice != null)
                {
                    string listPrice = Math.Round(double.Parse(item.ListPrice.ToString()), 2).ToString();
                    string strAmount = Math.Round((listPriceValue * rate), 2).ToString();
                    bestItemContents.Append(
                        "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" +
                        listPrice + ">" + strAmount +
                        "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" +
                        itemPrice + ">" + itemPriceRate + "</span></p></div></div>");
                }
                else
                {
                    bestItemContents.Append(
                        "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" +
                        itemPrice + ">" + itemPriceRate + "</span></p></div></div>");
                }
                bestItemContents.Append("<div class=\"cssClassProductDetail\"><p><a href=\"" + aspxRedirectPath +
                                        "item/" + item.SKU + ".aspx onclick=\"AjaxLoader()\">" +
                                        getLocale("Details") + "</a></p></div></div>");

                //bestItemContents.Append("<div class=\"cssClassButtonWrapper\">");
                //if (AllowWishListLatestItem.ToLower() == "true")
                //{
                //    if (CustomerID > 0 && UserName.ToLower() != "anonymoususer")
                //    {
                //        bestItemContents.Append("<div class=\"cssClassWishListButton\">");
                //        bestItemContents.Append("<button type=\"button\" id=\"addWishList\" onclick=LatestItems.CheckWishListUniqueness(");
                //        bestItemContents.Append(item.ItemID);
                //        bestItemContents.Append(",'");
                //        bestItemContents.Append(item.SKU);
                //        bestItemContents.Append("',this);><span><span><span>+</span>");
                //        bestItemContents.Append(getLocale("Wishlist"));
                //        bestItemContents.Append("</span></span></button></div>");
                //    }
                //    else
                //    {
                //        bestItemContents.Append("<div class=\"cssClassWishListButton\">");
                //        bestItemContents.Append("<button type=\"button\" id=\"addWishList\" onclick=\"AspxCommerce.RootFunction.Login();\">");
                //        bestItemContents.Append("<span><span><span>+</span>");
                //        bestItemContents.Append(getLocale("Wishlist"));
                //        bestItemContents.Append("</span></span></button></div>");
                //    }
                //}
                ////if (AllowAddToCompareLatest.ToLower() == "true")
                ////{
                ////    bestItemContents.Append("<div class=\"cssClassCompareButton\">");
                ////    bestItemContents.Append("<label><input type=\"checkbox\" id=\"compare-");
                ////    bestItemContents.Append(item.ItemID);
                ////    bestItemContents.Append("\" onclick=BestSellersCarousel.AddItemsToCompare(");
                ////    bestItemContents.Append(item.ItemID);
                ////    bestItemContents.Append(",'");
                ////    bestItemContents.Append(item.SKU);
                ////    bestItemContents.Append("',this);><span>");
                ////    bestItemContents.Append(getLocale("Compare"));
                ////    bestItemContents.Append("</span></input></label></div>");
                ////}
                //bestItemContents.Append("</div>");
                //bestItemContents.Append("<div class=\"cssClassclear\"></div>");
                //var itemSKU = item.SKU;
                //var itemName = item.Name;
                //if (AllowOutStockPurchase.ToLower() == "false")
                //{
                //    if (item.IsOutOfStock == true)
                //    {
                //        bestItemContents.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\">");
                //        bestItemContents.Append("<button type=\"button\"><span>");
                //        bestItemContents.Append(getLocale("Out Of Stock"));
                //        bestItemContents.Append("</span></button></div></div>");
                //    }
                //    else
                //    {
                //        bestItemContents.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                //        bestItemContents.Append("<button type=\"button\" id=\"addtoCart\" title=");
                //        bestItemContents.Append(itemName);
                //        bestItemContents.Append(" onclick=LatestItems.AddToCartToJS(");
                //        bestItemContents.Append(item.ItemID);
                //        bestItemContents.Append(",");
                //        bestItemContents.Append(itemPrice);
                //        bestItemContents.Append(",'");
                //        bestItemContents.Append(itemSKU);
                //        bestItemContents.Append("',");
                //        bestItemContents.Append(1);
                //        bestItemContents.Append(",this);><span><span>");
                //        bestItemContents.Append(getLocale("Add to cart"));
                //        bestItemContents.Append("</span></span></button></div></div>");
                //    }
                //}
                //else
                //{
                //    bestItemContents.Append("</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\">");
                //    bestItemContents.Append("<button type=\"button\" id=\"addtoCart\" title=");
                //    bestItemContents.Append(itemName);
                //    bestItemContents.Append(" onclick=LatestItems.AddToCartToJS(");
                //    bestItemContents.Append(item.ItemID);
                //    bestItemContents.Append(",");
                //    bestItemContents.Append(itemPrice);
                //    bestItemContents.Append(",'");
                //    bestItemContents.Append(itemSKU);
                //    bestItemContents.Append("',");
                //    bestItemContents.Append(1);
                //    bestItemContents.Append(",this); ><span><span>");
                //    bestItemContents.Append(getLocale("Add to cart"));
                //    bestItemContents.Append("</span></span></button></div></div>");
                //}
                bestItemContents.Append("</div></div>");
            }
            bestItemContents.Append("</div>");
            ltrBestSellerCarasoul.Text = bestItemContents.ToString();
        }
        else
        {
            bestItemContents.Append("<span class=\"cssClassNotFound\">");
            bestItemContents.Append(getLocale("No item is sold in this store Yet!"));
            bestItemContents.Append("</span></div>");
            ltrBestSellerCarasoul.Text = bestItemContents.ToString();
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

    private string GetStringScript(string codeToRun)
    {
        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){ " + codeToRun + "});</script>");
        return script.ToString();
    }

}