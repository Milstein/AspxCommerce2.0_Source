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
using System.Runtime.Serialization;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
    public class StoreSettingInfo
    {
        [DataMember]
        private string _defaultProductImageURL;

        [DataMember]
        private string _myAccountURL;

        [DataMember]
        private string _shoppingCartURL;

        [DataMember]
        private string _wishListURL;

        [DataMember]
        private string _detailPageURL;

        [DataMember]
        private string _itemDetailURL;

        [DataMember]
        private string _categoryDetailURL;

        [DataMember]
        private string _servicesDetailURL;

        [DataMember]
        private string _singleCheckOutURL;

        [DataMember]
        private string _multiCheckOutURL;

        [DataMember]
        private string _advanceSearchURL;

        [DataMember]
        private string _storeLocatorURL;

        [DataMember]
        private string _compareItemURL;

        [DataMember]
        private string _rssFeedURL;

        [DataMember]
        private string _bookAppointmentURL;

        [DataMember]
        private string _servicesURL;

        [DataMember]
        private string _seviceItemDetailURL;

        [DataMember]
        private string _catWiseItemURL;

        [DataMember]
        private string _trackPackageUrl;

        [DataMember]
        private string _shipDetailPageURL;

        [DataMember]
        private string _itemMgntPageURL;

        [DataMember]
        private string _categoryMgntPageURL;

        [DataMember]
        private string _promoItemsUrl;

        [DataMember]
        private string _mainCurrency;

        [DataMember]
        private string _realTimeCurrency;

        [DataMember]
        private string _storeName;

        [DataMember]
        private string _storeLogoURL;

        [DataMember]
        private string _timeToDeleteAbandonedCart;

        [DataMember]
        private string _cartAbandonedTime;

        [DataMember]
        private int _lowStockQuantity;

        [DataMember]
        private string _shoppingOptionRange;

        [DataMember]
        private string _allowAnonymousCheckOut;

        [DataMember]
        private string _allowMultipleShippingAddress;

        [DataMember]
        private string _allowOutStockPurchase;

        [DataMember]
        private string _sendEcommerceEmailsFrom;

        [DataMember]
        private string _sendOrderNotification;

        [DataMember]
        private string _maximumImageSize;

        [DataMember]
        private string _maxDownloadFileSize;

        [DataMember]
        private string _itemLargeThumbnailImageSize;

        [DataMember]
        private string _itemMediumThumbnailImageSize;

        [DataMember]
        private string _itemSmallThumbnailImageSize;

        [DataMember]
        private string _itemImageMaxWidth;

        [DataMember]
        private string _itemImageMaxHeight;

        [DataMember]
        private string _categoryLargeThumbnailImageSize;

        [DataMember]
        private string _categoryMediumThumbnailImageSize;

        [DataMember]
        private string _categorySmallThumbnailImageSize;

        [DataMember]
        private string _categoryBannerImageWidth;

        [DataMember]
        private string _categoryBannerImageHeight;

        [DataMember]
        private string _showItemImagesInCart;

        [DataMember]
        private string _showItemImagesInWishList;

        [DataMember]
        private string _allowUsersToCreateMultipleAddress;

        [DataMember]
        private string _minimumCartSubTotalAmount;

        [DataMember]
        private string _enableCompareItems;

        [DataMember]
        private string _maxNoOfItemsToCompare;

        [DataMember]
        private string _enableWishList;

        [DataMember]
        private string _noOfRecentAddedWishItems;

        [DataMember]
        private string _enableEmailAFriend;

        [DataMember]
        private string _showMiniShoppingCart;

        [DataMember]
        private string _allowMultipleReviewsPerUser;

        [DataMember]
        private string _allowMultipleReviewsPerIP;

        [DataMember]
        private string _allowAnonymousUserToWriteItemRatingAndReviews;

        [DataMember]
        private string _enableRecentlyViewedItems;

        [DataMember]
        private string _noOfRecentlyViewedItemsDispay;

        [DataMember]
        private string _enableLatestItems;

        [DataMember]
        private string _noOfLatestItemsDisplay;

        [DataMember]
        private string _noOfLatestItemsInARow;

        [DataMember]
        private string _noOfServiceCategory;

        [DataMember]
        private string _enableBestSellerItems;

        [DataMember]
        private string _noOfBestSellersItemDisplay;

        [DataMember]
        private string _enableSpecialItems;

        [DataMember]
        private string _noOfSpecialItemDisplay;

        [DataMember]
        private string _enableRecentlyComparedItems;

        [DataMember]
        private string _noOfRecentlyComparedItems;

        [DataMember]
        private string _enableYouMayAlsoLike;

        [DataMember]
        private string _noOfYouMayAlsoLikeItems;

        [DataMember]
        private string _weightUnit;

        [DataMember]
        private string _dimensionUnit;

        [DataMember]
        private string _noOfPopularTags;

        [DataMember]
        private string _noOfDisplayItems;

        [DataMember]
        private string _additionalCVR;

        [DataMember]
        public string _itemDisplayMode;

        [DataMember]
        public string _moduleCollapsible;
        [DataMember]
        private string _allowedBillingCountry;

        [DataMember]
        private string _allowedShippingCountry;

        public StoreSettingInfo()
        {

        }

        public string DefaultProductImageURL
        {
            get
            {
                return this._defaultProductImageURL;
            }
            set
            {
                if ((this._defaultProductImageURL != value))
                {
                    this._defaultProductImageURL = value;
                }
            }
        }


        public string MyAccountURL
        {
            get
            {
                return this._myAccountURL;
            }
            set
            {
                if ((this._myAccountURL != value))
                {
                    this._myAccountURL = value;
                }
            }
        }


        public string ShoppingCartURL
        {
            get
            {
                return this._shoppingCartURL;
            }
            set
            {
                if ((this._shoppingCartURL != value))
                {
                    this._shoppingCartURL = value;
                }
            }
        }


        public string WishListURL
        {
            get
            {
                return this._wishListURL;
            }
            set
            {
                if ((this._wishListURL != value))
                {
                    this._wishListURL = value;
                }
            }
        }


        public string DetailPageURL
        {
            get
            {
                return this._detailPageURL;
            }
            set
            {
                if ((this._detailPageURL != value))
                {
                    this._detailPageURL = value;
                }
            }
        }


        public string ItemDetailURL
        {
            get
            {
                return this._itemDetailURL;
            }
            set
            {
                if ((this._itemDetailURL != value))
                {
                    this._itemDetailURL = value;
                }
            }
        }

        public string CategoryDetailURL
        {
            get
            {
                return this._categoryDetailURL;
            }
            set
            {
                if ((this._categoryDetailURL != value))
                {
                    this._categoryDetailURL = value;
                }
            }
        }

        public string ServicesDetailURL
        {
            get
            {
                return this._servicesDetailURL;
            }
            set
            {
                if ((this._servicesDetailURL != value))
                {
                    this._servicesDetailURL = value;
                }
            }
        }

        public string SingleCheckOutURL
        {
            get
            {
                return this._singleCheckOutURL;
            }
            set
            {
                if ((this._singleCheckOutURL != value))
                {
                    this._singleCheckOutURL = value;
                }
            }
        }


        public string MultiCheckOutURL
        {
            get
            {
                return this._multiCheckOutURL;
            }
            set
            {
                if ((this._multiCheckOutURL != value))
                {
                    this._multiCheckOutURL = value;
                }
            }
        }


        public string AdvanceSearchURL
        {
            get
            {
                return this._advanceSearchURL;
            }
            set
            {
                if ((this._advanceSearchURL != value))
                {
                    this._advanceSearchURL = value;
                }
            }
        }


        public string StoreLocatorURL
        {
            get
            {
                return this._storeLocatorURL;
            }
            set
            {
                if ((this._storeLocatorURL != value))
                {
                    this._storeLocatorURL = value;
                }
            }
        }

        public string CompareItemURL
        {
            get
            {
                return this._compareItemURL;
            }
            set
            {
                if ((this._compareItemURL != value))
                {
                    this._compareItemURL = value;
                }
            }
        }

        public string RssFeedURL
        {
            get
            {
                return this._rssFeedURL;
            }
            set
            {
                if ((this._rssFeedURL != value))
                {
                    this._rssFeedURL = value;
                }
            }
        }

        public string BookAppointmentURL
        {
            get
            {
                return this._bookAppointmentURL;
            }
            set
            {
                if ((this._bookAppointmentURL != value))
                {
                    this._bookAppointmentURL = value;
                }
            }
        }

        public string ServicesURL
        {
            get
            {
                return this._servicesURL;
            }
            set
            {
                if ((this._servicesURL != value))
                {
                    this._servicesURL = value;
                }
            }
        }

        public string SeviceItemDetailURL
        {
            get
            {
                return this._seviceItemDetailURL;
            }
            set
            {
                if ((this._seviceItemDetailURL != value))
                {
                    this._seviceItemDetailURL = value;
                }
            }
        }

        public string CatWiseItemURL
        {
            get
            {
                return this._catWiseItemURL;
            }
            set
            {
                if ((this._catWiseItemURL != value))
                {
                    this._catWiseItemURL = value;
                }
            }
        }

        public string TrackPackageUrl
        {
            get
            {
                return this._trackPackageUrl;
            }
            set
            {
                if ((this._trackPackageUrl != value))
                {
                    this._trackPackageUrl = value;
                }
            }
        }

        public string ShipDetailPageURL
        {
            get
            {
                return this._shipDetailPageURL;
            }
            set
            {
                if ((this._shipDetailPageURL != value))
                {
                    this._shipDetailPageURL = value;
                }
            }
        }

        public string ItemMgntPageURL
        {
            get
            {
                return this._itemMgntPageURL;
            }
            set
            {
                if ((this._itemMgntPageURL != value))
                {
                    this._itemMgntPageURL = value;
                }
            }
        }

        public string CategoryMgntPageURL
        {
            get
            {
                return this._categoryMgntPageURL;
            }
            set
            {
                if ((this._categoryMgntPageURL != value))
                {
                    this._categoryMgntPageURL = value;
                }
            }
        }
        public string PromoItemsUrl
        {
            get
            {
                return this._promoItemsUrl;
            }
            set
            {
                if ((this._promoItemsUrl != value))
                {
                    this._promoItemsUrl = value;
                }
            }
        }

        public string MainCurrency
        {
            get
            {
                return this._mainCurrency;
            }
            set
            {
                if ((this._mainCurrency != value))
                {
                    this._mainCurrency = value;
                }
            }
        }
        public string RealTimeCurrency
        {
            get
            {
                return this._realTimeCurrency;
            }
            set
            {
                if ((this._realTimeCurrency != value))
                {
                    this._realTimeCurrency = value;
                }
            }
        }



        public string StoreName
        {
            get
            {
                return this._storeName;
            }
            set
            {
                if ((this._storeName != value))
                {
                    this._storeName = value;
                }
            }
        }

        public string StoreLogoURL
        {
            get
            {
                return this._storeLogoURL;
            }
            set
            {
                if ((this._storeLogoURL != value))
                {
                    this._storeLogoURL = value;
                }
            }
        }

        public string TimeToDeleteAbandonedCart
        {
            get
            {
                return this._timeToDeleteAbandonedCart;
            }
            set
            {
                if ((this._timeToDeleteAbandonedCart != value))
                {
                    this._timeToDeleteAbandonedCart = value;
                }
            }
        }

        public string CartAbandonedTime
        {
            get
            {
                return this._cartAbandonedTime;
            }
            set
            {
                if ((this._cartAbandonedTime != value))
                {
                    this._cartAbandonedTime = value;
                }
            }
        }

        public int LowStockQuantity
        {
            get
            {
                return this._lowStockQuantity;
            }
            set
            {
                if ((this._lowStockQuantity != value))
                {
                    this._lowStockQuantity = value;
                }
            }
        }

        public string ShoppingOptionRange
        {
            get
            {
                return this._shoppingOptionRange;
            }
            set
            {
                if ((this._shoppingOptionRange != value))
                {
                    this._shoppingOptionRange = value;
                }
            }
        }

        public string AllowAnonymousCheckOut
        {
            get
            {
                return this._allowAnonymousCheckOut;
            }
            set
            {
                if ((this._allowAnonymousCheckOut != value))
                {
                    this._allowAnonymousCheckOut = value;
                }
            }
        }

        public string AllowMultipleShippingAddress
        {
            get
            {
                return this._allowMultipleShippingAddress;
            }
            set
            {
                if ((this._allowMultipleShippingAddress != value))
                {
                    this._allowMultipleShippingAddress = value;
                }
            }
        }



        public string AllowOutStockPurchase
        {
            get
            {
                return this._allowOutStockPurchase;
            }
            set
            {
                if ((this._allowOutStockPurchase != value))
                {
                    this._allowOutStockPurchase = value;
                }
            }
        }

        public string SendEcommerceEmailsFrom
        {
            get
            {
                return this._sendEcommerceEmailsFrom;
            }
            set
            {
                if ((this._sendEcommerceEmailsFrom != value))
                {
                    this._sendEcommerceEmailsFrom = value;
                }
            }
        }



        public string SendOrderNotification
        {
            get
            {
                return this._sendOrderNotification;
            }
            set
            {
                if ((this._sendOrderNotification != value))
                {
                    this._sendOrderNotification = value;
                }
            }
        }

        public string MaximumImageSize
        {
            get
            {
                return this._maximumImageSize;
            }
            set
            {
                if ((this._maximumImageSize != value))
                {
                    this._maximumImageSize = value;
                }
            }
        }

        public string MaxDownloadFileSize
        {
            get
            {
                return this._maxDownloadFileSize;
            }
            set
            {
                if ((this._maxDownloadFileSize != value))
                {
                    this._maxDownloadFileSize = value;
                }
            }
        }

        public string ItemLargeThumbnailImageSize
        {
            get
            {
                return this._itemLargeThumbnailImageSize;
            }
            set
            {
                if ((this._itemLargeThumbnailImageSize != value))
                {
                    this._itemLargeThumbnailImageSize = value;
                }
            }
        }

        public string ItemMediumThumbnailImageSize
        {
            get
            {
                return this._itemMediumThumbnailImageSize;
            }
            set
            {
                if ((this._itemMediumThumbnailImageSize != value))
                {
                    this._itemMediumThumbnailImageSize = value;
                }
            }
        }

        public string ItemSmallThumbnailImageSize
        {
            get
            {
                return this._itemSmallThumbnailImageSize;
            }
            set
            {
                if ((this._itemSmallThumbnailImageSize != value))
                {
                    this._itemSmallThumbnailImageSize = value;
                }
            }
        }
        public string ItemImageMaxWidth
        {
            get
            {
                return this._itemImageMaxWidth;
            }
            set
            {
                if ((this._itemImageMaxWidth != value))
                {
                    this._itemImageMaxWidth = value;
                }
            }
        }

        public string ItemImageMaxHeight
        {
            get
            {
                return this._itemImageMaxHeight;
            }
            set
            {
                if ((this._itemImageMaxHeight != value))
                {
                    this._itemImageMaxHeight = value;
                }
            }
        }

        public string CategoryLargeThumbnailImageSize
        {
            get
            {
                return this._categoryLargeThumbnailImageSize;
            }
            set
            {
                if ((this._categoryLargeThumbnailImageSize != value))
                {
                    this._categoryLargeThumbnailImageSize = value;
                }
            }
        }

        public string CategoryMediumThumbnailImageSize
        {
            get
            {
                return this._categoryMediumThumbnailImageSize;
            }
            set
            {
                if ((this._categoryMediumThumbnailImageSize != value))
                {
                    this._categoryMediumThumbnailImageSize = value;
                }
            }
        }

        public string CategorySmallThumbnailImageSize
        {
            get
            {
                return this._categorySmallThumbnailImageSize;
            }
            set
            {
                if ((this._categorySmallThumbnailImageSize != value))
                {
                    this._categorySmallThumbnailImageSize = value;
                }
            }
        }

        public string CategoryBannerImageWidth
        {
            get
            {
                return this._categoryBannerImageWidth;
            }
            set
            {
                if ((this._categoryBannerImageWidth != value))
                {
                    this._categoryBannerImageWidth = value;
                }
            }
        }
        public string CategoryBannerImageHeight
        {
            get
            {
                return this._categoryBannerImageHeight;
            }
            set
            {
                if ((this._categoryBannerImageHeight != value))
                {
                    this._categoryBannerImageHeight = value;
                }
            }
        }

        public string ShowItemImagesInCart
        {
            get
            {
                return this._showItemImagesInCart;
            }
            set
            {
                if ((this._showItemImagesInCart != value))
                {
                    this._showItemImagesInCart = value;
                }
            }
        }

        public string ShowItemImagesInWishList
        {
            get
            {
                return this._showItemImagesInWishList;
            }
            set
            {
                if ((this._showItemImagesInWishList != value))
                {
                    this._showItemImagesInWishList = value;
                }
            }
        }

        public string AllowUsersToCreateMultipleAddress
        {
            get
            {
                return this._allowUsersToCreateMultipleAddress;
            }
            set
            {
                if ((this._allowUsersToCreateMultipleAddress != value))
                {
                    this._allowUsersToCreateMultipleAddress = value;
                }
            }
        }


        public string MinimumCartSubTotalAmount
        {
            get
            {
                return this._minimumCartSubTotalAmount;
            }
            set
            {
                if ((this._minimumCartSubTotalAmount != value))
                {
                    this._minimumCartSubTotalAmount = value;
                }
            }
        }


        public string EnableCompareItems
        {
            get
            {
                return this._enableCompareItems;
            }
            set
            {
                if ((this._enableCompareItems != value))
                {
                    this._enableCompareItems = value;
                }
            }
        }

        public string MaxNoOfItemsToCompare
        {
            get
            {
                return this._maxNoOfItemsToCompare;
            }
            set
            {
                if ((this._maxNoOfItemsToCompare != value))
                {
                    this._maxNoOfItemsToCompare = value;
                }
            }
        }

        public string EnableWishList
        {
            get
            {
                return this._enableWishList;
            }
            set
            {
                if ((this._enableWishList != value))
                {
                    this._enableWishList = value;
                }
            }
        }

        public string NoOfRecentAddedWishItems
        {
            get
            {
                return this._noOfRecentAddedWishItems;
            }
            set
            {
                if ((this._noOfRecentAddedWishItems != value))
                {
                    this._noOfRecentAddedWishItems = value;
                }
            }
        }

        public string EnableEmailAFriend
        {
            get
            {
                return this._enableEmailAFriend;
            }
            set
            {
                if ((this._enableEmailAFriend != value))
                {
                    this._enableEmailAFriend = value;
                }
            }
        }

        public string ShowMiniShoppingCart
        {
            get
            {
                return this._showMiniShoppingCart;
            }
            set
            {
                if ((this._showMiniShoppingCart != value))
                {
                    this._showMiniShoppingCart = value;
                }
            }
        }

        public string AllowMultipleReviewsPerUser
        {
            get
            {
                return this._allowMultipleReviewsPerUser;
            }
            set
            {
                if ((this._allowMultipleReviewsPerUser != value))
                {
                    this._allowMultipleReviewsPerUser = value;
                }
            }
        }

        public string AllowMultipleReviewsPerIP
        {
            get
            {
                return this._allowMultipleReviewsPerIP;
            }
            set
            {
                if ((this._allowMultipleReviewsPerIP != value))
                {
                    this._allowMultipleReviewsPerIP = value;
                }
            }
        }

        public string AllowAnonymousUserToWriteItemRatingAndReviews
        {
            get
            {
                return this._allowAnonymousUserToWriteItemRatingAndReviews;
            }
            set
            {
                if ((this._allowAnonymousUserToWriteItemRatingAndReviews != value))
                {
                    this._allowAnonymousUserToWriteItemRatingAndReviews = value;
                }
            }
        }

        public string EnableRecentlyViewedItems
        {
            get
            {
                return this._enableRecentlyViewedItems;
            }
            set
            {
                if ((this._enableRecentlyViewedItems != value))
                {
                    this._enableRecentlyViewedItems = value;
                }
            }
        }

        public string NoOfRecentlyViewedItemsDispay
        {
            get
            {
                return this._noOfRecentlyViewedItemsDispay;
            }
            set
            {
                if ((this._noOfRecentlyViewedItemsDispay != value))
                {
                    this._noOfRecentlyViewedItemsDispay = value;
                }
            }
        }

        public string EnableLatestItems
        {
            get
            {
                return this._enableLatestItems;
            }
            set
            {
                if ((this._enableLatestItems != value))
                {
                    this._enableLatestItems = value;
                }
            }
        }

        public string NoOfLatestItemsDisplay
        {
            get
            {
                return this._noOfLatestItemsDisplay;
            }
            set
            {
                if ((this._noOfLatestItemsDisplay != value))
                {
                    this._noOfLatestItemsDisplay = value;
                }
            }
        }

        public string NoOfLatestItemsInARow
        {
            get
            {
                return this._noOfLatestItemsInARow;
            }
            set
            {
                if ((this._noOfLatestItemsInARow != value))
                {
                    this._noOfLatestItemsInARow = value;
                }
            }
        }

        public string NoOfServiceCategory
        {
            get
            {
                return this._noOfServiceCategory;
            }
            set
            {
                if ((this._noOfServiceCategory != value))
                {
                    this._noOfServiceCategory = value;
                }
            }
        }

        public string EnableBestSellerItems
        {
            get
            {
                return this._enableBestSellerItems;
            }
            set
            {
                if ((this._enableBestSellerItems != value))
                {
                    this._enableBestSellerItems = value;
                }
            }
        }

        public string NoOfBestSellersItemDisplay
        {
            get
            {
                return this._noOfBestSellersItemDisplay;
            }
            set
            {
                if ((this._noOfBestSellersItemDisplay != value))
                {
                    this._noOfBestSellersItemDisplay = value;
                }
            }
        }

        public string EnableSpecialItems
        {
            get
            {
                return this._enableSpecialItems;
            }
            set
            {
                if ((this._enableSpecialItems != value))
                {
                    this._enableSpecialItems = value;
                }
            }
        }

        public string NoOfSpecialItemDisplay
        {
            get
            {
                return this._noOfSpecialItemDisplay;
            }
            set
            {
                if ((this._noOfSpecialItemDisplay != value))
                {
                    this._noOfSpecialItemDisplay = value;
                }
            }
        }

        public string EnableRecentlyComparedItems
        {
            get
            {
                return this._enableRecentlyComparedItems;
            }
            set
            {
                if ((this._enableRecentlyComparedItems != value))
                {
                    this._enableRecentlyComparedItems = value;
                }
            }
        }

        public string NoOfRecentlyComparedItems
        {
            get
            {
                return this._noOfRecentlyComparedItems;
            }
            set
            {
                if ((this._noOfRecentlyComparedItems != value))
                {
                    this._noOfRecentlyComparedItems = value;
                }
            }
        }

        public string EnableYouMayAlsoLike
        {
            get
            {
                return this._enableYouMayAlsoLike;
            }
            set
            {
                if ((this._enableYouMayAlsoLike != value))
                {
                    this._enableYouMayAlsoLike = value;
                }
            }
        }

        public string NoOfYouMayAlsoLikeItems
        {
            get
            {
                return this._noOfYouMayAlsoLikeItems;
            }
            set
            {
                if ((this._noOfYouMayAlsoLikeItems != value))
                {
                    this._noOfYouMayAlsoLikeItems = value;
                }
            }
        }

        public string NoOfPopularTags
        {
            get
            {
                return this._noOfPopularTags;
            }
            set
            {
                if ((this._noOfPopularTags != value))
                {
                    this._noOfPopularTags = value;
                }
            }
        }

        public string WeightUnit
        {
            get
            {
                return this._weightUnit;
            }
            set
            {
                if ((this._weightUnit != value))
                {
                    this._weightUnit = value;
                }
            }
        }

        public string DimensionUnit
        {
            get
            {
                return this._dimensionUnit;
            }
            set
            {
                if ((this._dimensionUnit != value))
                {
                    this._dimensionUnit = value;
                }
            }
        }

        public string NoOfDisplayItems
        {
            get
            {
                return this._noOfDisplayItems;
            }
            set
            {
                if ((this._noOfDisplayItems != value))
                {
                    this._noOfDisplayItems = value;
                }
            }
        }

        public string AdditionalCVR
        {
            get
            {
                return this._additionalCVR;
            }
            set
            {
                if ((this._additionalCVR != value))
                {
                    this._additionalCVR = value;
                }
            }
        }
        public string ItemDisplayMode
        {
            get
            {
                return this._itemDisplayMode;
            }
            set
            {
                if ((this._itemDisplayMode != value))
                {
                    this._itemDisplayMode = value;
                }
            }
        }
        public string ModuleCollapsible
        {
            get
            {
                return this._moduleCollapsible;
            }
            set
            {
                if ((this._moduleCollapsible != value))
                {
                    this._moduleCollapsible = value;
                }
            }
        }

        public string AllowedBillingCountry
        {
            get
            {
                return this._allowedBillingCountry;
            }
            set
            {
                if ((this._allowedBillingCountry != value))
                {
                    this._allowedBillingCountry = value;
                }
            }
        }

        public string AllowedShippingCountry
        {
            get
            {
                return this._allowedShippingCountry;
            }
            set
            {
                if ((this._allowedShippingCountry != value))
                {
                    this._allowedShippingCountry = value;
                }
            }
        }

        public string LatestItemRss { get; set; }
        public string LatestItemRssCount { get; set; }

        public string SpecialItemRss { get; set; }
        public string SpecialItemRssCount { get; set; }

        public string FeatureItemRss { get; set; }
        public string FeatureItemRssCount { get; set; }

        public string BestSellItemRss { get; set; }
        public string BestSellItemRssCount { get; set; }

        public string PopularTagRss { get; set; }
        public string PopularTagRssCount { get; set; }

        public string HeavyDiscountItemRss { get; set; }
        public string HeavyDiscountItemRssCount { get; set; }

        public string NewCategoryRss { get; set; }
        public string NewCategoryRssCount { get; set; }

        public string ServiceTypeItemRss { get; set; }
        public string ServiceTypeItemRssCount { get; set; }

        public string NewOrderRss { get; set; }
        public string NewOrderRssCount { get; set; }

        public string NewCustomerRss { get; set; }
        public string NewCustomerRssCount { get; set; }

        public string NewItemTagRss { get; set; }
        public string NewItemTagRssCount { get; set; }

        public string NewItemReviewRss { get; set; }
        public string NewItemReviewRssCount { get; set; }

        public string LowStockItemRss { get; set; }
        public string LowStockItemRssCount { get; set; }

        public string BrandRss { get; set; }
        public string BrandRssCount { get; set; }

        public string WaterMarkText { get; set; }
        public string WaterMarkTextPosition { get; set; }
        public string WaterMarkTextRotation { get; set; }
        public string WaterMarkImagePosition { get; set; }
        public string WaterMarkImageRotation { get; set; }
        public string ShowWaterMarkImage { get; set; }

        public string ShowAddToCartButton { get; set; }
        public string AddToCartButtonText { get; set; }
        public string ViewAsOptions { get; set; }
        public string ViewAsOptionsDefault { get; set; }
        public string SortByOptions { get; set; }
        public string SortByOptionsDefault { get; set; }
        public string AskCustomerToSubscribe { get; set; }
        public string EstimateShippingCostInCartPage { get; set; }
    }

}

