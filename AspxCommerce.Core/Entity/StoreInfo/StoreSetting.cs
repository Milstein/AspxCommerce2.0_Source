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
using System.Collections.Generic;
using SageFrame.Web.Utilities;
using SageFrame.Pages;

namespace AspxCommerce.Core
{
    public class StoreSetting
    {
        public static string DefaultProductImageURL = "DefaultProductImageURL";
        public static string MyAccountURL = "MyAccountURL";
        public static string ShoppingCartURL = "ShoppingCartURL";
        public static string WishListURL = "WishListURL";
        public static string SearchResultURL = "SearchResultURL";
        public static string DetailPageURL = "DetailPageURL";
        public static string ItemDetailURL = "ItemDetailURL";
        public static string CategoryDetailURL = "CategoryDetailURL";
        public static string ServicesDetailURL = "ServicesDetailURL";
        public static string SingleCheckOutURL = "SingleCheckOutURL";
        public static string MultiCheckOutURL = "MultiCheckOutURL";
        public static string AdvanceSearchURL = "AdvanceSearchURL";
        public static string StoreLocatorURL = "StoreLocatorURL";
        public static string CompareItemURL = "CompareItemURL";
        public static string RssFeedURL = "RssFeedURL";
        public static string BookAppointmentURL = "BookAppointmentURL";
        public static string ServicesURL = "ServicesURL";
        public static string SeviceItemDetailURL = "SeviceItemDetailURL";
        public static string CatWiseItemURL = "CatWiseItemURL";
        public static string ShipDetailPageURL = "ShipDetailPageURL";
        public static string ItemMgntPageURL = "ItemMgntPageURL";
        public static string CategoryMgntPageURL = "CategoryMgntPageURL";
        public static string PromoItemsUrl = "PromoItemsUrl";
        public static string MainCurrency = "MainCurrency";
        public static string DefaultCountry = "DefaultCountry";
        public static string StoreName = "StoreName";
        public static string StoreLogoURL = "StoreLogoURL";
        public static string StoreClosePageContent = "StoreClosePageContent";
        public static string StoreClosed = "StoreClosed";
        public static string StoreNOTAccessPageContent = "StoreNOTAccessPageContent";
        public static string TimeToDeleteAbandonedCart = "TimeToDeleteAbandonedCart";
        public static string CartAbandonedTime = "CartAbandonedTime";
        public static string AllowAnonymousCheckOut = "AllowAnonymousCheckOut";
        public static string AllowMultipleShippingAddress = "AllowMultipleShippingAddress";
        public static string SendEcommerceEmailsFrom = "SendEcommerceEmailsFrom";
        public static string SendEcommerceEmailTo = "SendEcommerceEmailTo";
        public static string SendOrderNotification = "SendOrderNotification";
        public static string SendPaymentNotification = "SendPaymentNotification";
        public static string StoreAdminEmail = "StoreAdminEmail";
        public static string EnableStoreNamePrefix = "EnableStoreNamePrefix";
        public static string DefaultTitle = "DefaultTitle";
        public static string DefaultMetaDescription = "DefaultMetaDescription";
        public static string DefaultMetaKeyWords = "DefaultMetaKeyWords";
        public static string ShowWelcomeMessageOnHomePage = "ShowWelcomeMessageOnHomePage";
        public static string DisplayNewsRSSFeedLinkInBrowserAddressBar = "DisplayNewsRSSFeedLinkInBrowserAddressBar";
        public static string DisplayBlogRSSFeedLinkInBrowserAddressBar = "DisplayBlogRSSFeedLinkInBrowserAddressBar";
        public static string MaximumImageSize = "MaximumImageSize";
        public static string MaxDownloadFileSize = "MaxDownloadFileSize";
        public static string ItemLargeThumbnailImageSize = "ItemLargeThumbnailImageSize";
        public static string ItemMediumThumbnailImageSize = "ItemMediumThumbnailImageSize";
        public static string ItemSmallThumbnailImageSize = "ItemSmallThumbnailImageSize";
        public static string CategoryLargeThumbnailImageSize = "CategoryLargeThumbnailImageSize";
        public static string CategoryMediumThumbnailImageSize = "CategoryMediumThumbnailImageSize";
        public static string CategorySmallThumbnailImageSize = "CategorySmallThumbnailImageSize";
        public static string ShowItemImagesInCart = "ShowItemImagesInCart";
        public static string ShowItemImagesInWishList = "ShowItemImagesInWishList";
        public static string AllowUsersToCreateMultipleAddress = "AllowUsersToCreateMultipleAddress";
        public static string AllowUsersToStoreCreditCardDataInProfile = "AllowUsersToStoreCreditCardDataInProfile";
        public static string MinimumCartSubTotalAmount = "MinimumCartSubTotalAmount";
        public static string AllowCustomerToSignUpForUserGroup = "AllowCustomerToSignUpForUserGroup";
        public static string AllowCustomersToPayOrderAgainIfTransactionWasDeclined = "AllowCustomersToPayOrderAgainIfTransactionWasDeclined";

        public static string WaterMarkText = "WaterMarkText";
        public static string WaterMarkTextPosition = "WaterMarkTextPosition";
        public static string WaterMarkTextRotation = "WaterMarkTextRotation";
        public static string WaterMarkImage = "WaterMarkImage";
        public static string WaterMarkImagePosition = "WaterMarkImagePosition";
        public static string WaterMarkImageRotation = "WaterMarkImageRotation";
        public static string ShowWaterMarkImage = "ShowWaterMarkImage";


        public static string AllowPrivateMessages = "AllowPrivateMessages";
        public static string DefaultStoreTimeZone = "DefaultStoreTimeZone";
        public static string EnableCompareItems = "Enable.CompareItems";
        public static string EnableWishList = "Enable.WishList";
        public static string NoOfRecentAddedWishItems = "NoOfRecentAddedWishItems";
        public static string EnableEmailAFriend = "Enable.EmailAFriend";
        public static string ShowMiniShoppingCart = "Show.MiniShoppingCart";
        public static string NotifyAboutNewItemReviews = "NotifyAboutNewItemReviews";
        public static string ItemReviewMustBeApproved = "ItemReviewMustBeApproved";
        public static string AllowMultipleReviewsPerUser = "AllowMultipleReviewsPerUser";
        public static string AllowMultipleReviewsPerIP = "AllowMultipleReviewsPerIP";
        public static string AllowAnonymousUserToWriteItemRatingAndReviews = "AllowAnonymousUserToWriteItemRatingAndReviews";

        public static string EnableRecentlyViewedItems = "Enable.RecentlyViewedItems";
        public static string NoOfRecentlyViewedItemsDispay = "NoOfRecentlyViewedItemsDispay";
        public static string EnableLatestItems = "Enable.LatestItems";
        public static string NoOfLatestItemsDisplay = "NoOfLatestItemsDisplay";
        public static string NoOfLatestItemsInARow = "NoOfLatestItemsInARow";
        public static string EnableBestSellerItems = "Enable.BestSellerItems";
        public static string NoOfBestSellersItemDisplay = "NoOfBestSellersItemDisplay";
        public static string EnableSpecialItems = "Enable.SpecialItems";
        public static string NoOfSpecialItemDisplay = "NoOfSpecialItemDisplay";
        public static string EnableRecentlyComparedItems = "Enable.RecentlyComparedItems";
        public static string NoOfRecentlyComparedItems = "NoOfRecentlyComparedItems";
        public static string EnableYouMayAlsoLike = "Enable.YouMayAlsoLike";
        public static string NoOfYouMayAlsoLikeItems = "NoOfYouMayAlsoLikeItems";
        public static string NoOfPopularTags = "NoOfPopularTags";
        public static string WeightUnit = "WeightUnit";
        public static string DimensionUnit = "DimensionUnit";
        public static string GoogleMapAPIKey = "GoogleMapAPIKey";
        public static string LowStockQuantity = "LowStockQuantity";
        public static string ShoppingOptionRange = "ShoppingOptionRange";
        public static string MinimumItemQuantity = "MinimumItemQuantity";
        public static string MaximumItemQuantity = "MaximumItemQuantity";
        public static string SSLSecurePages = "SSLSecurePages";
        public static string AllowOutStockPurchase = "AllowOutStockPurchase";
        public static string MaxNoOfItemsToCompare = "MaxNoOfItemsToCompare";
        public static string NoOfDisplayItems = "NoOfDisplayItems";
        public static string NoOfServiceCategory = "NoOfServiceCategory";
        public static string AllowedBillingCountry = "AllowedBillingCountry";
        public static string AllowedShippingCountry = "AllowedShippingCountry";
        public static string AdditionalCVR = "AdditionalCVR";
        public static string ItemDisplayMode = "ItemDisplayMode";
        public static string ModuleCollapsible = "ModuleCollapsible";

        public static string LatestItemRss = "LatestItemRss";
        public static string LatestItemRssCount = "LatestItemRssCount";
        public static string SpecialItemRss = "SpecialItemRss";
        public static string SpecialItemRssCount = "SpecialItemRssCount";
        public static string FeatureItemRss = "FeatureItemRss";
        public static string FeatureItemRssCount = "FeatureItemRssCount";
        public static string BestSellItemRss = "BestSellItemRss";
        public static string BestSellItemRssCount = "BestSellItemRssCount";
        public static string PopularTagRss = "PopularTagRss";
        public static string PopularTagRssCount = "PopularTagRssCount";
        public static string HeavyDiscountItemRss = "HeavyDiscountItemRss";
        public static string HeavyDiscountItemRssCount = "HeavyDiscountItemRssCount";
        public static string NewCategoryRss = "NewCategoryRss";
        public static string NewCategoryRssCount = "NewCategoryRssCount";
        public static string ServiceTypeItemRss = "ServiceTypeItemRss";
        public static string ServiceTypeItemRssCount = "ServiceTypeItemRssCount";
        public static string NewOrderRss = "NewOrderRss";
        public static string NewOrderRssCount = "NewOrderRssCount";
        public static string NewCustomerRss = "NewCustomerRss";
        public static string NewCustomerRssCount = "NewCustomerRssCount";
        public static string NewItemTagRss = "NewItemTagRss";
        public static string NewItemTagRssCount = "NewItemTagRssCount";
        public static string NewItemReviewRss = "NewItemReviewRss";
        public static string NewItemReviewRssCount = "NewItemReviewRssCount";
        public static string LowStockItemRss = "LowStockItemRss";
        public static string LowStockItemRssCount = "LowStockItemRssCount";
        public static string BrandRss = "BrandRss";
        public static string BrandRssCount = "BrandRssCount";

        public static string ShowAddToCartButton = "ShowAddToCartButton";
        public static string AddToCartButtonText = "AddToCartButtonText";
        public static string ViewAsOptions = "ViewAsOptions";
        public static string ViewAsOptionsDefault = "ViewAsOptionsDefault";
        public static string SortByOptions = "SortByOptions";
        public static string SortByOptionsDefault = "SortByOptionsDefault";
        public static string AskCustomerToSubscribe = "AskCustomerToSubscribe";
        public static string EstimateShippingCostInCartPage = "EstimateShippingCostInCartPage";

        public static string ItemImageMaxWidth = "ItemImageMaxWidth";
        public static string ItemImageMaxHeight = "ItemImageMaxHeight";
        public static string CategoryBannerImageWidth = "CategoryBannerImageWidth";
        public static string CategoryBannerImageHeight = "CategoryBannerImageHeight";

        public static string GetStoreSettingValueByKey(string settingKey, int storeID, int portalID, string cultureName)
        {
            try
            {
                List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
                parameter.Add(new KeyValuePair<string, object>("@SettingKey", settingKey));
                parameter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
                parameter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                parameter.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
                SQLHandler sqlH = new SQLHandler();
                return sqlH.ExecuteAsScalar<string>("usp_Aspx_GetStoreSettingValueBYKey", parameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string GetRegionFromCurrencyCode(string currencyCode, int storeID, int portalID)
        {
            try
            {
                List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
                parameter.Add(new KeyValuePair<string, object>("@CurrencyCode", currencyCode));
                parameter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
                parameter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                SQLHandler sqlH = new SQLHandler();
                return sqlH.ExecuteAsScalar<string>("[usp_Aspx_GetRegionFromCurrencyCode]", parameter);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string GetSymbolFromCurrencyCode(string currencyCode, int storeID, int portalID)
        {
            try
            {
                List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
                parameter.Add(new KeyValuePair<string, object>("@CurrencyCode", currencyCode));
                parameter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
                parameter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                SQLHandler sqlH = new SQLHandler();
                return sqlH.ExecuteAsScalar<string>("[usp_Aspx_GetSymbolFromCurrencyCode]", parameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<PageEntity> GetActivePortalPages(int PortalID, string UserName, string prefix, bool IsActive,
                                                            bool IsDeleted, object IsVisible, object IsRequiredPage)
        {
            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>
                                                                         {
                                                                             new KeyValuePair<string, object>("@prefix",
                                                                                                              prefix),
                                                                             new KeyValuePair<string, object>(
                                                                                 "@IsActive",
                                                                                 IsActive),
                                                                             new KeyValuePair<string, object>(
                                                                                 "@IsDeleted",
                                                                                 IsDeleted),
                                                                             new KeyValuePair<string, object>(
                                                                                 "@PortalID",
                                                                                 PortalID),
                                                                             new KeyValuePair<string, object>(
                                                                                 "@UserName",
                                                                                 UserName),
                                                                             new KeyValuePair<string, object>(
                                                                                 "@IsVisible",
                                                                                 IsVisible),
                                                                             new KeyValuePair<string, object>(
                                                                                 "@IsRequiredPage",
                                                                                 IsRequiredPage)

                                                                         };
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsList<PageEntity>("[dbo].[usp_PageStorePortalGetByCustomPrefix]", ParaMeterCollection);

        }
    }
}
