using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Framework;
using SageFrame.Web;
using AspxCommerce.Core;

public partial class Modules_AspxCommerce_AspxLatestItemsAnimation_LatestItemsAnimation : BaseAdministrationUserControl
{
    public string UserIp;
    public string SessionCode = string.Empty;
    public string CountryName = string.Empty;
    public int UserModuleID, MaxCompareItemCount;
    public string aspxfilePath;
    public string DefaultImagePath, EnableLatestItems, AllowOutStockPurchase, AllowWishListLatestItem, AllowAddToCompareLatest;
    public int NoOfLatestItems, NoOfLatestItemsInARow;
    public string LatestItemRss, RssFeedUrl;
    public AspxCommonInfo aspxCommonObj = new AspxCommonInfo();

    protected void Page_Load(object sender, EventArgs e)
    {

        try
        {
            if (!IsPostBack)
            {
                aspxCommonObj.StoreID = GetStoreID;
                aspxCommonObj.PortalID = GetPortalID;
                aspxCommonObj.UserName = GetUsername;
                aspxCommonObj.CustomerID = GetCustomerID;
                aspxCommonObj.CultureName = GetCurrentCultureName;
                IncludeCss("LatestBookItems","/Templates/" + TemplateName + "/css/StarRating/jquery.rating.css");

                IncludeJs("LatestBookItems","/Modules/AspxCommerce/AspxLatestItemsAnimation/js/LatestItemsAnimation.js","/js/StarRating/jquery.rating.js"
                    );

                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);
                StoreSettingConfig ssc = new StoreSettingConfig();
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, aspxCommonObj.StoreID,
                                                             aspxCommonObj.PortalID, aspxCommonObj.CultureName);

                NoOfLatestItems =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsDisplay, aspxCommonObj.StoreID,
                                                        aspxCommonObj.PortalID, aspxCommonObj.CultureName));

                EnableLatestItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableLatestItems, aspxCommonObj.StoreID,
                                                              aspxCommonObj.PortalID, aspxCommonObj.CultureName);

                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase,
                                                                  aspxCommonObj.StoreID,
                                                                  aspxCommonObj.PortalID, aspxCommonObj.CultureName);

                NoOfLatestItemsInARow =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsInARow, aspxCommonObj.StoreID,
                                                        aspxCommonObj.PortalID, aspxCommonObj.CultureName));

                AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, aspxCommonObj.StoreID,
                                                                    aspxCommonObj.PortalID, aspxCommonObj.CultureName);

                LatestItemRss = ssc.GetStoreSettingsByKey(StoreSetting.LatestItemRss, aspxCommonObj.StoreID,
                                                          aspxCommonObj.PortalID, aspxCommonObj.CultureName);
                AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, aspxCommonObj.StoreID,
                                                             aspxCommonObj.PortalID, aspxCommonObj.CultureName);
                MaxCompareItemCount = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, aspxCommonObj.StoreID,
                                                             aspxCommonObj.PortalID, aspxCommonObj.CultureName));
                if (LatestItemRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, aspxCommonObj.StoreID,
                                                           aspxCommonObj.PortalID, aspxCommonObj.CultureName);

                }
            }
            if (EnableLatestItems.ToLower() == "true" && NoOfLatestItems > 0)
            {
              // GetLatestItemAnimation();
            }

            IncludeLanguageJS();
        }
        catch (Exception ex)
        {

            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    private void GetLatestItemAnimation()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CustomerID = GetCustomerID;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        List<LatestItemsInfoAnimation> lstLatestItemsAni = AspxItemMgntController.GetLatestItemsByCountAnimation(aspxCommonObj, NoOfLatestItems);
       StringBuilder latestAniItemContents = new StringBuilder();
       string modulePath = this.AppRelativeTemplateSourceDirectory;
       hst = AppLocalized.getLocale(modulePath);
       string pageExtension = SageFrameSettingKeys.PageExtension;
       string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
       string aspxRootPath = ResolveUrl("~/");
       decimal rate = 1;
       StoreSettingConfig ssc = new StoreSettingConfig();
       decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName));
       string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName);
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
       if (lstLatestItemsAni != null && lstLatestItemsAni.Count > 0)
       {
           foreach (LatestItemsInfoAnimation item in lstLatestItemsAni)
           {
               string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
               if (item.ImagePath == "")
               {
                   imagePath = DefaultImagePath;
               }
               if (item.AlternateText == "")
               {
                   item.AlternateText = item.Name;
               }
               if (item.AlternateImagePath == "")
               {
                   item.AlternateImagePath = imagePath;
               }
               string itemPrice = Math.Round(double.Parse((item.Price).ToString()), 2).ToString();
               string itemPriceRate = Math.Round(double.Parse((item.Price*rate).ToString()), 2).ToString();
               if ((lstLatestItemsAni.IndexOf(item) + 1)%(NoOfLatestItemsInARow) == 0)
               {
                   latestAniItemContents.Append("<div class=\"cssClassProductsBox cssClassProductsBoxNoMargin\">");
               }
               else
               {
                   latestAniItemContents.Append("<div class=\"cssClassProductsBox\">");
               }
               decimal discount = 0;
               decimal listPrice = Convert.ToDecimal(item.ListPrice);

               if (listPrice != null && listPrice > 0)
               {
                   discount = ((Convert.ToDecimal(item.ListPrice) - Convert.ToDecimal(item.Price))/
                               Convert.ToDecimal(item.ListPrice))*100;
                   discount = Math.Round(discount);
                   latestAniItemContents.Append("<div class=\"cssClassSaveDiscount\"><span>" + discount +
                                                "% </span><span>Off</span></div>");
               }
               if (AllowAddToCompareLatest.ToLower() == "true")
               {
                   latestAniItemContents.Append(
                       "<div class=\"cssClassCompareButton\"><input type=\"checkbox\" id=\"compare-" + item.ItemID +
                       "\" onclick='LatestItemAnimation.AddItemsToCompare(" + item.ItemID + ',' + item.SKU + ",this);'>");
                   latestAniItemContents.Append("<span>" + getLocale("Compare") + "</span></input></div>");
               }
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
               latestAniItemContents.Append(
                   "<div id=\"productImageWrapID_" + item.ItemID +
                   "\" class=\"cssClassProductsBoxInfo\" costvariantItem=\"" + item.IsCostVariantItem + "\"  itemid=\"" +
                   item.ItemID + "\">");
               latestAniItemContents.Append(
                   "<div class=\"cssClassProductPicture\"><a href=\"" + hrefItem + "\" ><img id=\"img_" + item.ItemID +
                   "\"  alt=\"" + item.AlternateText + "\"  title=\"" + item.AlternateText + "\" src=\"" + aspxRootPath +
                   imagePath.Replace("uploads", "uploads/Medium") + "\"></a>");
               latestAniItemContents.Append("<div class=\"cssClassProductInfo\">");
               latestAniItemContents.Append("<h5><a href=\"" + hrefItem + "\" title=\"" + item.Name + "\">" +
                                            name + "</a></h5>");
               string shortDescription = HttpUtility.HtmlDecode(item.ShortDescription);
               string description = "";
               if (shortDescription != "" || shortDescription != null)
               {
                   if (shortDescription.Length > 100)
                   {
                       description = shortDescription.Substring(0, 100);
                       //description = shortDescription.Substring(0, indexVal);
                       description = description + " ...";
                   }
                   else
                   {
                       description = shortDescription;
                   }
               }
               else
               {
                   description = "";
               }
               latestAniItemContents.Append("<p>" + HttpUtility.HtmlDecode(description) + "</p>");
               int averageRating = item.AverageRating;
               if (averageRating > 0)
               {
                   latestAniItemContents.Append("<div class=\"cssClassItemRating\">");
                   latestAniItemContents.Append(" <span class=\"cssClassRatingTitle\"></span>");
                   latestAniItemContents.Append(
                       "<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" id=\"tblAverageRating\">");
                   string rating = bindStarRating(averageRating);
                   latestAniItemContents.Append(rating);
                   latestAniItemContents.Append("</table>");
                   latestAniItemContents.Append("</div>");
               }
               int viewCount = 0;
               if (item.ViewCount > 0)
               {
                   viewCount = item.ViewCount;
               }
               latestAniItemContents.Append("<div class=\"cssClassProductPrice\">");
               if (!Convert.ToBoolean(item.HidePrice))
               {
                   if (item.ListPrice != null)
                   {
                       latestAniItemContents.Append(
                           "<p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=\"" +
                           Math.Round(double.Parse(item.ListPrice.ToString()), 2).ToString() + "\">" +
                           Math.Round((double) (item.ListPrice*rate), 2).ToString() +
                           "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=\"" +
                           itemPrice + "\">" + itemPriceRate +
                           "</span></p><div class=\"cssViewer\"><span class=\"cssClassView\"></span><span>[" +
                           viewCount + "]</span></div></div>");
                   }
                   else
                   {
                       latestAniItemContents.Append(
                           "<p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=\"" +
                           itemPrice + "\">" + itemPriceRate +
                           "</span></p><div class=\"cssViewer\"><span class=\"cssClassView\"></span><span>[" +
                           viewCount + "]</span></div></div>");
                   }
               }
               latestAniItemContents.Append("<div class=\"sfButtonwrapper\">");
               string itemSKU = "\"" + item.SKU + "\"";
               string itemName = item.Name;
               if (AllowWishListLatestItem.ToLower() == "true")
               {
                   if (aspxCommonObj.CustomerID > 0 && aspxCommonObj.UserName.ToLower() != "anonymoususer")
                   {
                       latestAniItemContents.Append(
                           "<div class=\"cssClassWishListButton\"><button type=\"button\" onclick='LatestItemAnimation.CheckWishListUniqueness(" +
                           item.ItemID + ',' + itemSKU + ",this);'><span><span>" +
                           getLocale("Wishlist") + "</span></span></button></div>");
                   }
                   else
                   {
                       latestAniItemContents.Append(
                           "<div class=\"cssClassWishListButton\"><button type=\"button\" onclick='AspxCommerce.RootFunction.Login();'><span><span>" +
                           getLocale("Wishlist") + "</span></span></button></div>");
                   }
               }

               if (AllowOutStockPurchase.ToLower() == "false")
               {
                   if (Convert.ToBoolean(item.IsOutOfStock))
                   {
                       latestAniItemContents.Append(
                           "<div class=\"cssClassAddtoCard1 cssClassOutOfStock\"><button type=\"button\"><span>" +
                           getLocale("Out Of Stock") + "</span></button></div>");
                   }
                   else
                   {
                       latestAniItemContents.Append("<div class=\"cssClassAddtoCard1\"><button type=\"button\" title=\"" +
                                                    itemName + "\"   onclick='LatestItemAnimation.AddToCartToJS(" +
                                                    item.ItemID +
                                                    "," + itemPrice + "," + itemSKU + "," + 1 +
                                                    ",this);'><span><span>" + getLocale("Add to cart") +
                                                    "</span></span></button></div>");
                   }
               }
               else
               {
                   latestAniItemContents.Append("<div class=\"cssClassAddtoCard1\"><button type=\"button\" title=\"" +
                                                itemName + "\"  onclick='LatestItemAnimation.AddToCartToJS(" + item.ItemID +
                                                "," + itemPrice + "," + itemSKU + "," + 1 +
                                                ",this);'><span><span>" +
                                                getLocale("Add to cart") +
                                                "</span></span></button></div>");
               }
               latestAniItemContents.Append("</div>");
               latestAniItemContents.Append("</div>");
               latestAniItemContents.Append("</div>");
               latestAniItemContents.Append("</div></div>");
           }
           string script = "$('input.star').rating({ split: 2 });";
           latestAniItemContents.Append(GetStringScript(script));
           divBookItemsContentServer.InnerHtml = latestAniItemContents.ToString();

       }
       else
       {
           latestAniItemContents.Append("<span class=\"cssClassNotFound\">");
           latestAniItemContents.Append(getLocale("This store has no items listed yet!"));
           latestAniItemContents.Append("</span>");
           divBookItemsContentServer.InnerHtml = latestAniItemContents.ToString();
       }
        
    }
    private string bindStarRating(int itemAvgRating)
    {
        double itemAvgRatingVal = itemAvgRating;
        string ratingStars = "";
        string worst = getLocale("Worst");
        string ugly = getLocale("Ugly");
        string bad = getLocale("Bad");
        string notBad = getLocale("Not Bad");
        string average = getLocale("Average");
        string ok = getLocale("OK");
        string nice = getLocale("Nice");
        string good = getLocale("Good");
        string best = getLocale("Best");
        string excellent = getLocale("Excellent");
        string[] ratingTitle = {worst, ugly, bad, notBad, average, ok, nice, good, best, excellent};
        double[] ratingText = {0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5};
        int i = 0;     
        ratingStars += "<tr><td>";
        for (i = 0; i < 10; i++)
        {
            if (itemAvgRatingVal == ratingText[i])
            {
                ratingStars +=
                    "<input name=\"avgItemRating\" type=\"radio\" class=\"star\" disabled=\"disabled\" checked=\"checked\" value=\"" +
                    ratingTitle[i] + "\" />";
                //$(".cssClassRatingTitle").html(ratingTitle[i]);
                //   ratingTitle = ratingTitle[i];
            }
            else
            {
                ratingStars +=
                    "<input name=\"avgItemRating\" type=\"radio\" class=\"star\" disabled=\"disabled\" value=\"" +
                    ratingTitle[i] + "\" />";
            }
        }
        ratingStars += "</td></tr>";
        return ratingStars;

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
