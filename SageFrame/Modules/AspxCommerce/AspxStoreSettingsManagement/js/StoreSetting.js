var StoreSettings = "";
$(function() {
    var progressTime = null;
    var progress = 0;
    var pcount = 0;
    var percentageInterval = [10, 20, 30, 40, 60, 80, 100];
    var timeInterval = [1, 2, 4, 2, 1, 5, 1];
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };

    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };

    StoreSettings = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            method: "",
            url: ""
        },
        init: function() {
            StoreSettings.HideForLaterUseDivs();
            StoreSettings.InitializeTabs();
            StoreSettings.GetAllCountry();
            StoreSettings.GetAllCurrency();
            StoreSettings.BindItemsViewAsDropDown();
            StoreSettings.BindItemsSortByDropDown();
            StoreSettings.GetAllStoreSettings();
            $("input[DataType='Integer']").keypress(function(e) {
                if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
            });
            $('#txtMaximumImageSize,#txtItemLargeThumbnailImageSize,#txtItemMediumThumbnailImageSize,#txtItemSmallThumbnailImageSize,#txtCategoryLargeThumbnailImageSize,#txtCategoryMediumThumbnailImageSize,#txtCategorySmallThumbnailImageSize').keyup(function() {
                if (this.value.match(/[^a-zA-Z0-9 ]/g)) {
                    this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, '');
                }
            });
            $("#ddlCurrency").attr("disabled", "disabled");
            $("#txtWeightUnit").attr("disabled", "disabled");
            $("#form1").validate({
                messages: {
                    DefaultImageProductURL: {
                        required: '*'
                    },
                    MyAccountURL: {
                        required: '*'
                    },
                    ShoppingCartURL: {
                        required: '*'
                    },
                    WishListURL: {
                        required: '*'
                    },
                    MainCurrency: {
                        required: '*'
                    },
                    Weight: {
                        required: '*'
                    },
                    Dimension: {
                        required: '*'
                    },
                    StoreName: {
                        required: '*'
                    },


                    TimeTodeleteAbandCart: {
                        required: '*',
                        number: true
                    },
                    CartAbandonTime: {
                        required: '*',
                        number: true
                    },
                    LowStockQuantity: {
                        required: '*'
                    },
                    ShoppingOptionRange: {
                        required: '*'
                    },
                    EmailFrom: {
                        required: '*'
                    },
                    DefaultTitle: {
                        required: '*'
                    },
                    MaximumImageSize: {
                        required: '*'
                    },
                    MaximumDownloadSize: {
                        required: '*'
                    },
                    ItemLargeThumbnailImage: {
                        required: '*'
                    },
                    ItemMediumThumbnailImage: {
                        required: '*'
                    },
                    ItemSmallThumbnailImageSize: {
                        required: '*'
                    },
                    CategoryLargeThumbnailImageSize: {
                        required: '*'
                    },
                    CategoryMediumThumbnailImageSize: {
                        required: '*'
                    },
                    CategorySmallThumbnailImageSize: {
                        required: '*'
                    },
                    DefaultTimeZone: {
                        required: '*'
                    },
                    MinimumCartSubTotalAmount: {
                        required: '*'
                    },
                    RecentlyViewedCount: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    LatestItemsCount: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    LatestItemsInARow: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    BestSellersCount: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    ItemSpecialCount: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    RecentlyComparedCount: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    RelatedItemsInCartCount: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    NumberOfItemsToCompare: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    NoOfPopTags: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    NoOfRecentAddedWishItems: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    NoOfDisplayItems: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    NoOfServiceCategory: {
                        required: '*',
                        maxlength: getLocale(AspxStoreSettingsManagement, "* (no more than 2 digits)")
                    },
                    AdditionalCVR: {

                },
                LatestItemRssCount: { required: '*' },
                SpecialITemRssCount: { required: '*' },
                FeatureItemRssCount: { required: '*' },
                BestSellItemRssCount: { required: '*' },
                PopularTagRssCount: { required: '*' },
                HeavyDiscountItemRssCount: { required: '*' },
                NewCategoryRssCount: { required: '*' },
                ServiceTypeItemRssCount: { required: '*' },
                NewOrderRssCount: { required: '*' },
                NewCustomerRssCount: { required: '*' },
                NewItemTagRssCount: { required: '*' },
                NewItemReviewRssCount: { required: '*' },
                LowStockItemRssCount: { required: '*' },
                BrandRssCount: { required: '*' }
            },
            //success: "valid",
            submitHandler: function() {
                AspxCommerce.CheckSessionActive(aspxCommonObj);
                if (AspxCommerce.vars.IsAlive) {

                    StoreSettings.UpdateStoreSettings();
                } else {
                    window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
                }
            }
        });
        StoreSettings.ImageUploader("fupDefaultImageURL");
        StoreSettings.ImageUploader("fupStoreLogo");

        $("#cbSelectAllBillingCountry,#cbSelectAllShippingCountry").click(function() {
            StoreSettings.SelectAllCountry(this.id);
        });
    },

    ajaxCall: function(config) {
        $.ajax({
            type: StoreSettings.config.type,
            contentType: StoreSettings.config.contentType,
            cache: StoreSettings.config.cache,
            async: StoreSettings.config.async,
            url: StoreSettings.config.url,
            data: StoreSettings.config.data,
            dataType: StoreSettings.config.dataType,
            success: StoreSettings.ajaxSuccess,
            error: StoreSettings.ajaxFailure
        });
    },
    HideForLaterUseDivs: function() {
        $("#storefragment-4").hide();
        $("#divForLaterUseEmail").hide();
        $("#divForLaterUseGS").hide();
        $("#divForLaterUseCPS").hide();
        $("#divForLaterUseOS").hide();
    },

    InitializeTabs: function() {
        var $tabs = $('#container-7').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
        $tabs.tabs('select', 0);
    },

    GetAllStoreSettings: function() {
        this.config.url = this.config.baseURL + "GetAllStoreSettings";
        this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
        this.config.ajaxCallMode = 1;
        this.ajaxCall(this.config);
    },

    GetAllCountry: function() {
        this.config.url = this.config.baseURL + "BindCountryList";
        this.config.data = '{}';
        this.config.ajaxCallMode = 2;
        this.ajaxCall(this.config);
    },

    GetAllCurrency: function() {
        this.config.url = this.config.baseURL + "BindCurrencyList";
        this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
        this.config.ajaxCallMode = 3;
        this.ajaxCall(this.config);
    },
    BindItemsViewAsDropDown: function() {
        this.config.url = this.config.baseURL + "BindItemsViewAsList";
        this.config.data = "{}";
        this.config.ajaxCallMode = 5;
        this.ajaxCall(this.config);
    },
    BindItemsSortByDropDown: function() {
        this.config.url = this.config.baseURL + "BindItemsSortByList";
        this.config.data = "{}";
        this.config.ajaxCallMode = 6;
        this.ajaxCall(this.config);
    },

    BindAllValue: function(obj) {
        //Standard Settings
        $("#hdnPrevFilePath").val(obj.DefaultProductImageURL);
        $("#defaultProductImage").html('<img src="' + aspxRootPath + obj.DefaultProductImageURL + '" class="uploadImage" height="90px" width="100px"/>');
        $("#" + ddlMyAccountURL).val(obj.MyAccountURL);
        $("#" + ddlShoppingCartURL).val(obj.ShoppingCartURL);
        $("#" + ddlWishListURL).val(obj.WishListURL);
        $("#" + ddlDetailsPageURL).val(obj.DetailPageURL);
        $("#" + ddlItemDetailURL).val(obj.ItemDetailURL);
        $("#" + ddlCategoryDetailURL).val(obj.CategoryDetailURL);
        $("#" + ddlServicesDetailURL).val(obj.ServicesDetailURL);
        $("#" + ddlSingleCheckOutURL).val(obj.SingleCheckOutURL);
        $("#" + ddlMultiCheckOutURL).val(obj.MultiCheckOutURL);
        $("#" + ddlAdvanceSearchURL).val(obj.AdvanceSearchURL);
        $("#" + ddlStoreLocatorURL).val(obj.StoreLocatorURL);
        $("#" + ddlCompareItemURL).val(obj.CompareItemURL);
        $("#" + ddlAppointBookURL).val(obj.BookAppointmentURL);
        $("#" + ddlServiceURL).val(obj.ServicesURL);
        $("#" + ddlSItemDetailURL).val(obj.SeviceItemDetailURL);
        $("#" + ddlCatWiseItemURL).val(obj.CatWiseItemURL);
        $("#" + ddlTrackPackageUrl).val(obj.TrackPackageUrl);
        $("#" + ddlShippingDetailPageURL).val(obj.ShipDetailPageURL);
        $("#" + ddlItemMgntPageURL).val(obj.ItemMgntPageURL);
        $("#" + ddlCatMgntPageURL).val(obj.CategoryMgntPageURL);
        $("#" + ddlPromoItemsUrl).val(obj.PromoItemsUrl);

        //General Settings
        $("#hdnPrevStoreLogoPath").val(obj.StoreLogoURL);
        $("#divStoreLogo").html('<img src="' + aspxRootPath + obj.StoreLogoURL + '" class="uploadImage" height="90px" width="100px"/>');
        $("#txtStoreName").val(obj.StoreName);
        $("#ddlCurrency").val(obj.MainCurrency);
        $("#chkRealTimeCurrency").attr("checked", $.parseJSON(obj.RealTimeCurrency.toLowerCase()))
        $("#txtWeightUnit").val(obj.WeightUnit);
        $("#txtDimensionUnit").val(obj.DimensionUnit);
        $("#txtCartAbandonTime").val(obj.CartAbandonedTime);
        $("#txtTimeToDeleteAbandCart").val(obj.TimeToDeleteAbandonedCart);
        $("#txtLowStockQuantity").val(obj.LowStockQuantity);
        $("#txtShoppingOptionRange").val(obj.ShoppingOptionRange);
        $("#chkAllowAnonymousCheckout").attr("checked", $.parseJSON(obj.AllowAnonymousCheckOut.toLowerCase()));
        $("#chkAllowMultipleShippingAddress").attr("checked", $.parseJSON(obj.AllowMultipleShippingAddress.toLowerCase()));
        $("#chkAllowOutStockPurchase").attr("checked", $.parseJSON(obj.AllowOutStockPurchase.toLowerCase()));
        $("#chkAskCustomerToSubscribe").attr("checked", $.parseJSON(obj.AskCustomerToSubscribe.toLowerCase()))
        $("#chkEstimateShippingCostInCartPage").attr("checked", $.parseJSON(obj.EstimateShippingCostInCartPage.toLowerCase()))


        //Email Settings
        $("#txtSendEmailsFrom").val(obj.SendEcommerceEmailsFrom);
        $("#chkSendOrderNotification").attr("checked", $.parseJSON(obj.SendOrderNotification.toLowerCase()));

        //SEO/Display Settings
        $("#chkShowAddToCartButton").attr("checked", $.parseJSON(obj.ShowAddToCartButton.toLowerCase()));
        $("#txtAddToCartButtonText").val(obj.AddToCartButtonText);
        var ArrFinalViewAs = [];
        if (obj.ViewAsOptions != null) {
            var arryViewAsOpt = (obj.ViewAsOptions).split(',');
            $.each(arryViewAsOpt, function(index, value) {
                var OptId = value.split('#');
                ArrFinalViewAs.push(OptId[0]);
            });
            for (var i = 0; i < ArrFinalViewAs.length; i++) {
                $("#ddlViewAsOptions [value=" + $.trim(ArrFinalViewAs[i]) + "]").attr('selected', "selected");
            }
        }
        $("#ddlViewAsOptionsDefault").empty().append($("#ddlViewAsOptions option:selected").clone());
        $("#ddlViewAsOptionsDefault").val(obj.ViewAsOptionsDefault)
        var ArrFinalSortBy = [];
        if (obj.SortByOptions != null) {
            var ArrSortByOptions = (obj.SortByOptions).split(',');
            $.each(ArrSortByOptions, function(index, value) {
                var SortById = value.split('#');
                ArrFinalSortBy.push(SortById[0]);
            });
            for (var i = 0; i < ArrFinalSortBy.length; i++) {
                $("#ddlSortByOptions [value=" + $.trim(ArrFinalSortBy[i]) + "]").attr('selected', "selected");
            }
        }
        $("#ddlSortByOptionsDefault").empty().append($("#ddlSortByOptions option:selected").clone());
        $("#ddlSortByOptionsDefault").val(obj.SortByOptionsDefault)
        //click handle start
        $('#ddlViewAsOptions').click(function() {
            $('#ddlViewAsOptionsDefault').empty();
            $('#ddlViewAsOptionsDefault').append($('#ddlViewAsOptions option:selected').clone());
        });
        $('#ddlSortByOptions').click(function() {
            $('#ddlSortByOptionsDefault').empty();
            $('#ddlSortByOptionsDefault').append($('#ddlSortByOptions option:selected').clone());
        });
        //click handle end

        //Media Settings
        $("#txtMaximumImageSize").val(obj.MaximumImageSize);
        $("#txtMaxDownloadFileSize").val(obj.MaxDownloadFileSize);
        $("#txtItemLargeThumbnailImageSize").val(obj.ItemLargeThumbnailImageSize);
        $("#txtItemMediumThumbnailImageSize").val(obj.ItemMediumThumbnailImageSize);
        $("#txtItemSmallThumbnailImageSize").val(obj.ItemSmallThumbnailImageSize);
        $("#txtCategoryLargeThumbnailImageSize").val(obj.CategoryLargeThumbnailImageSize);
        $("#txtCategoryMediumThumbnailImageSize").val(obj.CategoryMediumThumbnailImageSize);
        $("#txtCategorySmallThumbnailImageSize").val(obj.CategorySmallThumbnailImageSize);
        $("#chkShowItemImagesInCart").attr("checked", $.parseJSON(obj.ShowItemImagesInCart.toLowerCase()));
        $("#chkShowItemImagesInWishList").attr("checked", $.parseJSON(obj.ShowItemImagesInWishList.toLowerCase()));
        $("#txtItemImageMaxWidth").val(obj.ItemImageMaxWidth);
        $("#txtItemImageMaxHeight").val(obj.ItemImageMaxHeight);
        $("#txtCategoryBannerImageWidth").val(obj.CategoryBannerImageWidth);
        $("#txtCategoryBannerImageHeight").val(obj.CategoryBannerImageHeight);

        //Image WaterMark
        $('#txtWaterMark').val(obj.WaterMarkText);
        $('input[name=watermarkposition][value=' + obj.WaterMarkTextPosition.toUpperCase() + ']').attr('checked', 'checked');
        $('#txtWaterMarkRotationAngle').val(obj.WaterMarkTextRotation);
        //            if (obj.ShowWaterMarkImage)
        //                $('input[name=showWaterMarkImage]').attr('checked', 'checked');
        //            else {
        //                $('input[name=showWaterMarkImage]').removeAttr('checked');
        //            }
        $('input[name=showWaterMarkImage]').attr("checked", $.parseJSON(obj.ShowWaterMarkImage.toLowerCase()));
        $('input[name=watermarkImageposition][value=' + obj.WaterMarkImagePosition.toUpperCase() + ']').attr('checked', 'checked');
        $('#txtWaterMarkImageRotation').val(obj.WaterMarkImageRotation);



        // User/Cart Settings
        $("#chkAllowMultipleAddress").attr("checked", $.parseJSON(obj.AllowUsersToCreateMultipleAddress.toLowerCase()));
        $("#txtMinimumCartSubTotalAmount").val(obj.MinimumCartSubTotalAmount);
        $("#txtAdditionalCVR").val(obj.AdditionalCVR);
        //$("#" + ddlDftStoreTimeZone).val(obj.DefaultStoreTimeZone);

        //Other Settings
        $("#chkEnableCompareItems").attr("checked", $.parseJSON(obj.EnableCompareItems.toLowerCase()));
        $("#txtNoOfItemsToCompare").val(obj.MaxNoOfItemsToCompare);
        $("#chkEnableWishList").attr("checked", $.parseJSON(obj.EnableWishList.toLowerCase()));
        $("#txtNoOfRecentAddedWishItems").val(obj.NoOfRecentAddedWishItems);
        $("#chkEmailAFriend").attr("checked", $.parseJSON(obj.EnableEmailAFriend.toLowerCase()));
        $("#chkShowMiniShoppingCart").attr("checked", $.parseJSON(obj.ShowMiniShoppingCart.toLowerCase()));
        $("#chkMultipleReviewsPerUser").attr("checked", $.parseJSON(obj.AllowMultipleReviewsPerUser.toLowerCase()));
        $("#chkMultipleReviewsPerIP").attr("checked", $.parseJSON(obj.AllowMultipleReviewsPerIP.toLowerCase()));
        $("#chkAllowAnonymousUserToWriteReviews").attr("checked", $.parseJSON(obj.AllowAnonymousUserToWriteItemRatingAndReviews.toLowerCase()));
        $("#chkEnableRecentlyViewedItems").attr("checked", $.parseJSON(obj.EnableRecentlyViewedItems.toLowerCase()));
        $("#txtNoOfRecentlyViewedItems").val(obj.NoOfRecentlyViewedItemsDispay);
        $("#chkEnableLatestItems").attr("checked", $.parseJSON(obj.EnableLatestItems.toLowerCase()));
        $("#txtNoOfLatestItems").val(obj.NoOfLatestItemsDisplay);
        $("#txtNoOfLatestItemsInARow").val(obj.NoOfLatestItemsInARow);
        $("#chkShowBestSellers").attr("checked", $.parseJSON(obj.EnableBestSellerItems.toLowerCase()));
        $("#txtNoOfBestSellers").val(obj.NoOfBestSellersItemDisplay);
        $("#chkEnableSpecialItems").attr("checked", $.parseJSON(obj.EnableSpecialItems.toLowerCase()));
        $("#txtNoOfSpecialItems").val(obj.NoOfSpecialItemDisplay);
        $("#chkEnableRecentlyComparedItems").attr("checked", $.parseJSON(obj.EnableRecentlyComparedItems.toLowerCase()));
        $("#txtNoOfRecentlyComparedItems").val(obj.NoOfRecentlyComparedItems);
        $("#chkYouMayAlsoLike").attr("checked", $.parseJSON(obj.EnableYouMayAlsoLike.toLowerCase()));
        $("#txtNoOfYouMayAlsoLikeItems").val(obj.NoOfYouMayAlsoLikeItems);
        $("#txtNoOfPopTags").val(obj.NoOfPopularTags);
        $("#txtNoOfDisplayItems").val(obj.NoOfDisplayItems);
        $("#txtServiceCatCount").val(obj.NoOfServiceCategory);
        $("#ddlItemDisplayMode").val(obj.ItemDisplayMode);
        $("#chkModuleCollapsible").attr("checked", $.parseJSON(obj.ModuleCollapsible.toLowerCase()));
        if ($.trim(obj.AllowedShippingCountry) == "ALL") {
            $('#cbSelectAllShippingCountry').attr('checked', 'checked');
            $("#lbCountryShipping").find('option').attr('selected', 'selected');

        } else {
            var valz = obj.AllowedShippingCountry.split(',');
            for (var v = 0; v < valz.length; v++) {
                if (valz[v] != '0')
                    $('#lbCountryShipping').find('option[value=' + valz[v] + ']').attr('selected', 'selected');
            }
        }
        if ($.trim(obj.AllowedBillingCountry) == "ALL") {
            $('#cbSelectAllBillingCountry').attr('checked', 'checked');
            $("#lbCountryBilling").find('option').attr('selected', 'selected');
        } else {
            var valx = obj.AllowedBillingCountry.split(',');
            for (var s = 0; s < valx.length; s++) {
                if (valx[s] != '0')
                    $('#lbCountryBilling').find('option[value=' + valx[s] + ']').attr('selected', 'selected');
            }

        }
        // Rss Feed Setting
        $("#" + ddlRssFeedURL).val(obj.RssFeedURL);
        $('#latestItemChkBox').attr("checked", $.parseJSON(obj.LatestItemRss.toLowerCase()));
        $('#txtLatestItemRssCount').val(obj.LatestItemRssCount);
        $('#specialItemChkBox').attr("checked", $.parseJSON(obj.SpecialItemRss.toLowerCase()));
        $('#txtSpecialItemRssCount').val(obj.SpecialItemRssCount);
        $('#featureItemChkBox').attr("checked", $.parseJSON(obj.FeatureItemRss.toLowerCase()));
        $('#txtFeatureItemRssCount').val(obj.FeatureItemRssCount);
        $('#bestSellItemChkBox').attr("checked", $.parseJSON(obj.BestSellItemRss.toLowerCase()));
        $('#txtBestSellItemRssCount').val(obj.BestSellItemRssCount);
        $('#popularTagChkBox').attr("checked", $.parseJSON(obj.PopularTagRss.toLowerCase()));
        $('#txtPopularTagRssCount').val(obj.PopularTagRssCount);
        $('#heavyDiscountChkBox').attr("checked", $.parseJSON(obj.HeavyDiscountItemRss.toLowerCase()));
        $('#txtHeavyDiscountRssCount').val(obj.HeavyDiscountItemRssCount);
        $('#categoryChkBox').attr("checked", $.parseJSON(obj.NewCategoryRss.toLowerCase()));
        $('#txtCategoryRssCount').val(obj.NewCategoryRssCount);
        $('#serviceChkBox').attr("checked", $.parseJSON(obj.ServiceTypeItemRss.toLowerCase()));
        $('#txtServiceItemRssCount').val(obj.ServiceTypeItemRssCount);
        $('#newOrderChkBox').attr("checked", $.parseJSON(obj.NewOrderRss.toLowerCase()));
        $('#txtNewOrderRssCount').val(obj.NewOrderRssCount);
        $('#newCustomerChkBox').attr("checked", $.parseJSON(obj.NewCustomerRss.toLowerCase()));
        $('#txtNewCustomerRssCount').val(obj.NewCustomerRssCount);
        $('#newItemTagChkBox').attr("checked", $.parseJSON(obj.NewItemTagRss.toLowerCase()));
        $('#txtNewItemTagRssCount').val(obj.NewItemTagRssCount);
        $('#newItemReviewChkBox').attr("checked", $.parseJSON(obj.NewItemReviewRss.toLowerCase()));
        $('#txtNewItemReviewRssCount').val(obj.NewItemReviewRssCount);
        $('#lowStockChkBox').attr("checked", $.parseJSON(obj.LowStockItemRss.toLowerCase()));
        $('#txtLowStockRssCount').val(obj.LowStockItemRssCount);
        $('#brandChkBox').attr("checked", $.parseJSON(obj.BrandRss.toLowerCase()));
        $('#txtBrandRssCount').val(obj.BrandRssCount);

        StoreSettings.ListNameSelected();
    },
    BindChangeFxToCountry: function() {
        $("#lbCountryShipping,#lbCountryBilling").bind("change", function() {
            StoreSettings.ListNameSelected();
            if ($("#lbCountryShipping").val() != null) {
                if ($("#lbCountryShipping").val().length == $("#lbCountryShipping").find('option').length) {
                    $("#cbSelectAllShippingCountry").attr('checked', 'checked');
                } else {
                    $("#cbSelectAllShippingCountry").removeAttr('checked');
                }
            }
            if ($("#lbCountryBilling").val() != null) {
                if ($("#lbCountryBilling").val().length == $("#lbCountryBilling").find('option').length) {
                    $("#cbSelectAllBillingCountry").attr('checked', 'checked');
                } else {
                    $("#cbSelectAllBillingCountry").removeAttr('checked');
                }
            }

        });

    },

    UpdateStoreSettings: function() {
        //Standard Settings
        if (aspxRootPath != "/") {
            //var defaultImageProductURL = $("#defaultProductImage>img").attr("src").split(aspxRootPath)[1];
            var defaultImageProductURL = $("#defaultProductImage>img").attr("src").replace(aspxRootPath, "");
        }
        else {
            var defaultImageProductURL = $("#defaultProductImage>img").attr("src").replace(aspxRootPath, "");
        }
        var prevFilePath = $("#hdnPrevFilePath").val();
        var myAccountURL = $("#" + ddlMyAccountURL).val();
        var shoppingCartURL = $("#" + ddlShoppingCartURL).val();
        var myWishListURL = $("#" + ddlWishListURL).val();
        var detailsPageURL = $("#" + ddlDetailsPageURL).val();
        var itemDetailURL = $("#" + ddlItemDetailURL).val();
        var categoryDetailURL = $("#" + ddlCategoryDetailURL).val();
        var servicesDetailURL = $("#" + ddlServicesDetailURL).val();
        var singleCheckOutURL = $("#" + ddlSingleCheckOutURL).val();
        var multiCheckOutURL = $("#" + ddlMultiCheckOutURL).val();
        var advanceSearchURL = $("#" + ddlAdvanceSearchURL).val();
        var storeLocatorURL = $("#" + ddlStoreLocatorURL).val();
        var compareItemURL = $("#" + ddlCompareItemURL).val();
        var bookAppointmentURL = $("#" + ddlAppointBookURL).val();
        var servicesURL = $("#" + ddlServiceURL).val();
        var seviceItemDetailURL = $("#" + ddlSItemDetailURL).val();
        var catWiseItemURL = $("#" + ddlCatWiseItemURL).val();
        var trackPackageUrl = $("#" + ddlTrackPackageUrl).val();
        var shipDetailPageURL = $("#" + ddlShippingDetailPageURL).val();
        var itemMgntPageURL = $("#" + ddlItemMgntPageURL).val();
        var catMgntPageURL = $("#" + ddlCatMgntPageURL).val();
        var promoItemsUrl = $("#" + ddlPromoItemsUrl).val();

        //General Settings
        var currency = $("#ddlCurrency option:selected").val();
        var realTimeCurrency = $("#chkRealTimeCurrency").attr("checked");
        var weightUnit = $("#txtWeightUnit").val();
        var dimensionUnit = $("#txtDimensionUnit").val();
        var storeName = $("#txtStoreName").val();
        if (aspxRootPath != "/") {
            //var storeLogoURL = $("#divStoreLogo>img").attr("src").split(aspxRootPath)[1];
            var storeLogoURL = $("#divStoreLogo>img").attr("src").replace(aspxRootPath, "");
        }
        else {
            var storeLogoURL = $("#divStoreLogo>img").attr("src").replace(aspxRootPath, "");
        }
        var prevStoreLogoPath = $("#hdnPrevStoreLogoPath").val();
        var cartAbandonedTime = $("#txtCartAbandonTime").val();
        var timeToDeleteAbandonedCart = $("#txtTimeToDeleteAbandCart").val();
        var lowStockQuantity = $("#txtLowStockQuantity").val();
        var shoppingOptionRange = $("#txtShoppingOptionRange").val();
        var allowAnonymousCheckout = $("#chkAllowAnonymousCheckout").attr("checked");
        var allowMultipleShippingAddress = $("#chkAllowMultipleShippingAddress").attr("checked");
        var allowOutStockPurchase = $("#chkAllowOutStockPurchase").attr("checked");
        var AskCustomerToSubscribe = $("#chkAskCustomerToSubscribe").attr("checked");
        var EstimateShippingCostInCartPage = $("#chkEstimateShippingCostInCartPage").attr("checked");

        //Email Settings
        var emailFrom = $("#txtSendEmailsFrom").val();
        var SendOrderNotification = $("#chkSendOrderNotification").attr("checked");

        //SEO/Display Settings
        var ShowAddToCartButton = $("#chkShowAddToCartButton").attr("checked");
        var AddToCartButtonText = $("#txtAddToCartButtonText").val();
        var ViewAsOptions = "";
        $("#ddlViewAsOptions option:selected").each(function() {
            ViewAsOptions += $(this).val() + "#" + $(this).text() + ",";
        });
        var ViewAsOptionsDefault = $("#ddlViewAsOptionsDefault").val();
        var SortByOptions = "";
        $("#ddlSortByOptions option:selected").each(function() {
            SortByOptions += $(this).val() + "#" + $(this).text() + ",";
        });
        var SortByOptionsDefault = $("#ddlSortByOptionsDefault").val();


        //Media Settings
        var maximumImageSize = $("#txtMaximumImageSize").val();
        var maximumDownloadSize = $("#txtMaxDownloadFileSize").val();
        var ItemLargeThumbnailImageSize = $("#txtItemLargeThumbnailImageSize").val();
        var ItemMediumThumbnailImageSize = $("#txtItemMediumThumbnailImageSize").val();
        var ItemSmallThumbnailImageSize = $("#txtItemSmallThumbnailImageSize").val();
        var CategoryLargeThumbnailImageSize = $("#txtCategoryLargeThumbnailImageSize").val();
        var CategoryMediumThumbnailImageSize = $("#txtCategoryMediumThumbnailImageSize").val();
        var CategorySmallThumbnailImageSize = $("#txtCategorySmallThumbnailImageSize").val();
        var showItemImagesInCart = $("#chkShowItemImagesInCart").attr("checked");
        var showItemImagesInWishList = $("#chkShowItemImagesInWishList").attr("checked");
        var ItemImageMaxWidth = $("#txtItemImageMaxWidth").val();
        var ItemImageMaxHeight = $("#txtItemImageMaxHeight").val();
        var CategoryBannerImageWidth = $("#txtCategoryBannerImageWidth").val();
        var CategoryBannerImageHeight = $("#txtCategoryBannerImageHeight").val();

        // User/Cart  Settings
        var allowMultipleAddress = $("#chkAllowMultipleAddress").attr("checked");
        var minimumOrderAmount = $("#txtMinimumCartSubTotalAmount").val();
        var additionalCCVR = 0;
        if ($("#txtAdditionalCVR").val() != "") {
            additionalCCVR = $("#txtAdditionalCVR").val();
        }
        //Other Settings
        var enableCompareItems = $("#chkEnableCompareItems").attr("checked");
        var maxNoOfItemsToCompare = $("#txtNoOfItemsToCompare").val();
        var enableWishList = $("#chkEnableWishList").attr("checked");
        var noOfRecentAddedWishItems = $("#txtNoOfRecentAddedWishItems").val();
        var enableEmailAFriend = $("#chkEmailAFriend").attr("checked");
        var showMiniShoppingCart = $("#chkShowMiniShoppingCart").attr("checked");
        var allowMultipleReviewsPerUser = $("#chkMultipleReviewsPerUser").attr("checked");
        var allowMultipleReviewsPerIP = $("#chkMultipleReviewsPerIP").attr("checked");
        var allowAnonymousUserToWriteReviews = $("#chkAllowAnonymousUserToWriteReviews").attr("checked");
        var enableRecentlyViewedItems = $("#chkEnableRecentlyViewedItems").attr("checked");
        var noOfRecentlyViewedItems = $("#txtNoOfRecentlyViewedItems").val();
        var enableLatestItems = $("#chkEnableLatestItems").attr("checked");
        var noOfLatestItems = $("#txtNoOfLatestItems").val();
        var noOfLatestItemsInARow = $("#txtNoOfLatestItemsInARow").val();
        var showBestSellers = $("#chkShowBestSellers").attr("checked");
        var noOfBestSellers = $("#txtNoOfBestSellers").val();
        var enableSpecial = $("#chkEnableSpecialItems").attr("checked");
        var noOfSpecialItems = $("#txtNoOfSpecialItems").val();
        var enableRecentlyComparedItems = $("#chkEnableRecentlyComparedItems").attr("checked");
        var noOfRecentlyComparedItems = $("#txtNoOfRecentlyComparedItems").val();
        var enableYouMayAlsoLike = $("#chkYouMayAlsoLike").attr("checked");
        var noOfYouMayAlsoLikeItems = $("#txtNoOfYouMayAlsoLikeItems").val();
        var noOfPopTags = $("#txtNoOfPopTags").val();
        var noOfDisplayItems = $("#txtNoOfDisplayItems").val();
        var noOfServiceCategory = $("#txtServiceCatCount").val();
        var itemDisplayMode = $("#ddlItemDisplayMode").val();
        var moduleCollapsible = $("#chkModuleCollapsible").attr("checked");
        //Shipment Setting
        if ($("#lbCountryShipping").val().length != null && $("#lbCountryShipping").val().clean('0').length > 0)
            var shippingCountry = $('#cbSelectAllShippingCountry').is(':checked') == true ? 'ALL' : $("#lbCountryShipping").val().clean('0').join();
        else {
            csscody.error('<h2>' + getLocale(AspxStoreSettingsManagement, "Error Message") + "</h2><p>" + getLocale(AspxStoreSettingsManagement, "Please select Country for Shipping.") + '</p>');
            return false;
        }
        if ($("#lbCountryBilling").val().length != null && $("#lbCountryBilling").val().clean('0').length > 0)
            var billingCountry = $('#cbSelectAllBillingCountry').is(':checked') == true ? 'ALL' : $("#lbCountryBilling").val().clean('0').join();
        else {
            csscody.error('<h2>' + getLocale(AspxStoreSettingsManagement, "Error Message") + "</h2><p>" + getLocale(AspxStoreSettingsManagement, "Please select Country for Billing.") + '</p>');
            return false;
        }
        //debugger;
        // RssFeed Setting
        var rssFeedURL = $("#" + ddlRssFeedURL).val();
        var latestItemRss = $('#latestItemChkBox').attr('checked');
        var latestItemRssCount = $.trim($('#txtLatestItemRssCount').val());
        var specialItemRss = $('#specialItemChkBox').attr('checked');
        var specialITemRssCount = $.trim($('#txtSpecialItemRssCount').val());
        var featureItemRss = $('#featureItemChkBox').attr('checked');
        var featureItemRssCount = $.trim($('#txtFeatureItemRssCount').val());
        var bestSellItemRss = $('#bestSellItemChkBox').attr('checked');
        var bestSellItemRssCount = $.trim($('#txtBestSellItemRssCount').val());
        var popularTagRss = $('#popularTagChkBox').attr('checked');
        var popularTagRssCount = $.trim($('#txtPopularTagRssCount').val());
        var heavyDiscountItemRss = $('#heavyDiscountChkBox').attr('checked');
        var heavyDiscountItemRssCount = $.trim($('#txtHeavyDiscountRssCount').val());
        var newCategoryRss = $('#categoryChkBox').attr('checked');
        var newCategoryRssCount = $.trim($('#txtCategoryRssCount').val());
        var serviceTypeItemRss = $('#serviceChkBox').attr('checked');
        var serviceTypeItemRssCount = $.trim($('#txtServiceItemRssCount').val());
        var newOrderRss = $('#newOrderChkBox').attr('checked');
        var newOrderRssCount = $.trim($('#txtNewOrderRssCount').val());
        var newCustomerRss = $('#newCustomerChkBox').attr('checked');
        var newCustomerRssCount = $.trim($('#txtNewCustomerRssCount').val());
        var newItemTagRss = $('#newItemTagChkBox').attr('checked');
        var newItemTagRssCount = $.trim($('#txtNewItemTagRssCount').val());
        var newItemReviewRss = $('#newItemReviewChkBox').attr('checked');
        var newItemReviewRssCount = $.trim($('#txtNewItemReviewRssCount').val());
        var lowStockItemRss = $('#lowStockChkBox').attr('checked');
        var lowStockItemRssCount = $.trim($('#txtLowStockRssCount').val());
        var brandRss = $('#brandChkBox').attr('checked');
        var brandRssCount = $.trim($('#txtBrandRssCount').val());

        var wMText = $.trim($('#txtWaterMark').val());
        var wmTextPos = $.trim($('input[name=watermarkposition]:checked').val());
        var wmTextRotation = $.trim($('#txtWaterMarkRotationAngle').val());
        var wmImagePos = $.trim($('input[name=watermarkImageposition]:checked').val());
        var wmImageRotation = $.trim($('#txtWaterMarkImageRotation').val());
        var showWaterMarkImage = $("input[name=showWaterMarkImage]").is(":checked");
        var settingValues = '';
        settingValues += myAccountURL + '*' + shoppingCartURL + '*' + myWishListURL + '*' + detailsPageURL + '*' + itemDetailURL + '*' + categoryDetailURL + '*' + servicesDetailURL + '*' + singleCheckOutURL + '*' + multiCheckOutURL + '*' + advanceSearchURL + '*' + storeLocatorURL + '*' + compareItemURL + '*' + bookAppointmentURL + '*' + servicesURL + '*' + seviceItemDetailURL + '*' + catWiseItemURL + '*' + trackPackageUrl + '*' + shipDetailPageURL + '*' + itemMgntPageURL + '*' + catMgntPageURL + '*' + promoItemsUrl + '*';
        settingValues += currency + '*' + realTimeCurrency + '*' + weightUnit + '*' + dimensionUnit + '*' + storeName + '*' + cartAbandonedTime + '*' + timeToDeleteAbandonedCart + '*' + lowStockQuantity + '*' + shoppingOptionRange + '*' + allowAnonymousCheckout + '*' + allowMultipleShippingAddress + '*' + allowOutStockPurchase + '*' + AskCustomerToSubscribe + '*' + EstimateShippingCostInCartPage + '*';
        settingValues += emailFrom + '*' + SendOrderNotification + '*';
        settingValues += ShowAddToCartButton + '*' + AddToCartButtonText + '*' + ViewAsOptions + '*' + ViewAsOptionsDefault + '*' + SortByOptions + '*' + SortByOptionsDefault + '*';
        settingValues += maximumImageSize + '*' + maximumDownloadSize + '*' + ItemLargeThumbnailImageSize + '*' + ItemMediumThumbnailImageSize + '*' + ItemSmallThumbnailImageSize + '*' + CategoryLargeThumbnailImageSize + '*' + CategoryMediumThumbnailImageSize + '*' + CategorySmallThumbnailImageSize + '*' + showItemImagesInCart + '*' + showItemImagesInWishList + '*' + ItemImageMaxWidth + '*' + ItemImageMaxHeight + '*' + CategoryBannerImageWidth + '*' + CategoryBannerImageHeight + '*';
        settingValues += allowMultipleAddress + '*' + minimumOrderAmount + '*' + additionalCCVR + '*';
        settingValues += enableCompareItems + '*' + maxNoOfItemsToCompare + '*' + enableWishList + '*' + noOfRecentAddedWishItems + '*' + enableEmailAFriend + '*' + showMiniShoppingCart + '*' + allowMultipleReviewsPerUser + '*' + allowMultipleReviewsPerIP
                     + '*' + allowAnonymousUserToWriteReviews + '*' + enableRecentlyViewedItems + '*' + noOfRecentlyViewedItems + '*' + enableLatestItems + '*' + noOfLatestItems + '*' + noOfLatestItemsInARow + '*' + showBestSellers
                     + '*' + noOfBestSellers + '*' + enableSpecial + '*' + noOfSpecialItems + '*' + enableRecentlyComparedItems + '*' + noOfRecentlyComparedItems + '*' + enableYouMayAlsoLike + '*' + noOfYouMayAlsoLikeItems + '*' + noOfPopTags + '*' + noOfDisplayItems + '*' + noOfServiceCategory
                     + '*' + itemDisplayMode + '*' + moduleCollapsible + '*' + shippingCountry + '*' + billingCountry;
        settingValues += '*' + rssFeedURL + '*' + latestItemRss + '*' + latestItemRssCount + '*' + specialItemRss + '*' + specialITemRssCount + '*' + featureItemRss + '*' +
                featureItemRssCount + '*' + bestSellItemRss + '*' + bestSellItemRssCount + '*' + popularTagRss + '*' + popularTagRssCount + '*' +
                    heavyDiscountItemRss + '*' + heavyDiscountItemRssCount + '*' + newCategoryRss + '*' + newCategoryRssCount + '*' + serviceTypeItemRss + '*' +
                        serviceTypeItemRssCount + '*' + newOrderRss + '*' + newOrderRssCount + '*' + newCustomerRss + '*' + newCustomerRssCount + '*' +
                            newItemTagRss + '*' + newItemTagRssCount + '*' + newItemReviewRss + '*' + newItemReviewRssCount + '*' + lowStockItemRss + '*' +
                                lowStockItemRssCount + '*' + brandRss + '*' + brandRssCount + '*' +
                                    wMText + '*' + wmTextPos + '*' + wmTextRotation + '*' + wmImagePos + '*' + wmImageRotation + '*' + showWaterMarkImage + '*';
        var settingKeys = '';
        settingKeys += 'MyAccountURL' + '*' + 'ShoppingCartURL' + '*' + 'WishListURL' + '*' + 'DetailPageURL' + '*' + 'ItemDetailURL' + '*' + 'CategoryDetailURL' + '*' + 'ServicesDetailURL' + '*' + 'SingleCheckOutURL' + '*' + 'MultiCheckOutURL' + '*' + 'AdvanceSearchURL' + '*' + 'StoreLocatorURL' + '*' + 'CompareItemURL' + '*' + 'BookAppointmentURL' + '*' + 'ServicesURL' + '*' + 'SeviceItemDetailURL' + '*' + 'CatWiseItemURL' + '*' + 'TrackPackageUrl' + '*' + 'ShipDetailPageURL' + '*' + 'ItemMgntPageURL' + '*' + 'CategoryMgntPageURL' + '*' + 'PromoItemsUrl' + '*';
        settingKeys += 'MainCurrency' + '*' + 'RealTimeCurrency' + '*' + 'WeightUnit' + '*' + 'DimensionUnit' + '*' + 'StoreName' + '*' + 'CartAbandonedTime' + '*' + 'TimeToDeleteAbandonedCart' + '*' + 'LowStockQuantity' + '*' + 'ShoppingOptionRange' + '*' + 'AllowAnonymousCheckOut' + '*' + 'AllowMultipleShippingAddress' + '*' + 'AllowOutStockPurchase' + '*' + 'AskCustomerToSubscribe' + '*' + 'EstimateShippingCostInCartPage' + '*';
        settingKeys += 'SendEcommerceEmailsFrom' + '*' + 'SendOrderNotification' + '*';
        settingKeys += 'ShowAddToCartButton' + '*' + 'AddToCartButtonText' + '*' + 'ViewAsOptions' + '*' + 'ViewAsOptionsDefault' + '*' + 'SortByOptions' + '*' + 'SortByOptionsDefault' + '*';
        settingKeys += 'MaximumImageSize' + '*' + 'MaxDownloadFileSize' + '*' + 'ItemLargeThumbnailImageSize' + '*' + 'ItemMediumThumbnailImageSize' + '*' + 'ItemSmallThumbnailImageSize' + '*' + 'CategoryLargeThumbnailImageSize' + '*' + 'CategoryMediumThumbnailImageSize' + '*' + 'CategorySmallThumbnailImageSize' + '*' + 'ShowItemImagesInCart' + '*' + 'ShowItemImagesInWishList' + '*' + 'ItemImageMaxWidth' + '*' + 'ItemImageMaxHeight' + '*' + 'CategoryBannerImageWidth' + '*' + 'CategoryBannerImageHeight' + '*';
        settingKeys += 'AllowUsersToCreateMultipleAddress' + '*' + 'MinimumCartSubTotalAmount' + '*' + 'AdditionalCVR' + '*';
        settingKeys += 'Enable.CompareItems' + '*' + 'MaxNoOfItemsToCompare' + '*' + 'Enable.WishList' + '*' + 'NoOfRecentAddedWishItems' + '*' + 'Enable.EmailAFriend' + '*' + 'Show.MiniShoppingCart' + '*' + 'AllowMultipleReviewsPerUser' + '*' + 'AllowMultipleReviewsPerIP'
                 + '*' + 'AllowAnonymousUserToWriteItemRatingAndReviews' + '*' + 'Enable.RecentlyViewedItems' + '*' + 'NoOfRecentlyViewedItemsDispay' + '*' + 'Enable.LatestItems' + '*' + 'NoOfLatestItemsDisplay' + '*' + 'NoOfLatestItemsInARow' + '*' + 'Enable.BestSellerItems'
                     + '*' + 'NoOfBestSellersItemDisplay' + '*' + 'Enable.SpecialItems' + '*' + 'NoOfSpecialItemDisplay' + '*' + 'Enable.RecentlyComparedItems' + '*' + 'NoOfRecentlyComparedItems' + '*' + 'Enable.YouMayAlsoLike' + '*' + 'NoOfYouMayAlsoLikeItems' + '*' + 'NoOfPopularTags' + '*' + 'NoOfDisplayItems' + '*' + 'NoOfServiceCategory' + '*' + 'ItemDisplayMode'
              + '*' + 'ModuleCollapsible' + '*' + 'AllowedShippingCountry' + '*' + 'AllowedBillingCountry';
        settingKeys += '*' + 'RssFeedURL' + '*' + 'LatestItemRss' + '*' + 'LatestItemRssCount' + '*' + 'SpecialItemRss' + '*' + 'SpecialITemRssCount' + '*' + 'FeatureItemRss' + '*' +
                'FeatureItemRssCount' + '*' + 'BestSellItemRss' + '*' + 'BestSellItemRssCount' + '*' + 'PopularTagRss' + '*' + 'PopularTagRssCount' + '*' +
                    'HeavyDiscountItemRss' + '*' + 'HeavyDiscountItemRssCount' + '*' + 'NewCategoryRss' + '*' + 'NewCategoryRssCount' + '*' + 'ServiceTypeItemRss' + '*' +
                        'ServiceTypeItemRssCount' + '*' + 'NewOrderRss' + '*' + 'NewOrderRssCount' + '*' + 'NewCustomerRss' + '*' + 'NewCustomerRssCount' + '*' +
                            'NewItemTagRss' + '*' + 'NewItemTagRssCount' + '*' + 'NewItemReviewRss' + '*' + 'NewItemReviewRssCount' + '*' + 'LowStockItemRss' + '*' +
                                'LowStockItemRssCount' + '*' + 'BrandRss' + '*' + 'BrandRssCount' + '*' +

                                    "WaterMarkText" + '*' +
                                        "WaterMarkTextPosition" + '*' +
                                            "WaterMarkTextRotation" + '*' +
                                                    "WaterMarkImagePosition" + '*' +
                                                        "WaterMarkImageRotation" + '*' + 'ShowWaterMarkImage'; //+ 
        this.config.url = this.config.baseURL + "UpdateStoreSettings";
        this.config.data = JSON2.stringify({ settingKeys: settingKeys, settingValues: settingValues, prevFilePath: prevFilePath, newFilePath: defaultImageProductURL, prevStoreLogoPath: prevStoreLogoPath, newStoreLogoPath: storeLogoURL, aspxCommonObj: aspxCommonObj });
        this.config.ajaxCallMode = 4;
        this.ajaxCall(this.config);
    },

    ImageUploader: function(obj) {
        maxFileSize = maxFilesize;
        var upload = new AjaxUpload($('#' + obj), {
            action: aspxStoreSetModulePath + "MultipleFileUploadHandler.aspx",
            name: 'myfile[]',
            multiple: false,
            data: {},
            autoSubmit: true,
            responseType: 'json',
            onChange: function(file, ext) {
                //alert('changed');
            },
            onSubmit: function(file, ext) {
                //progress bar call start//
                pcount = 0;
                var percentage = $('.progress').find('.percentage');
                var progressBar = $('.progress').find('.progressBar');
                $('.progress').show();
                StoreSettings.dummyProgress(progressBar, percentage);
                // progress bar call end
                if (ext != "exe") {
                    if (ext && /^(jpg|jpeg|jpe|gif|bmp|png|ico)$/i.test(ext)) {
                        this.setData({
                            'MaxFileSize': maxFileSize
                        });
                    } else {
                        csscody.alert('<h2>' + getLocale(AspxStoreSettingsManagement, "Alert Message") + "</h2><p>" + getLocale(AspxStoreSettingsManagement, "Not a valid image!") + '</p>');
                        return false;
                    }
                }
                else {
                    csscody.alert('<h2>' + getLocale(AspxStoreSettingsManagement, "Alert Message") + "</h2><p>" + getLocale(AspxStoreSettingsManagement, "Not a valid image!") + '</p>');
                    return false;
                }
            },
            onComplete: function(file, response) {
                var res = eval(response);
                if (res.Message != null && res.Status > 0) {
                    //alert(res.Message);
                    StoreSettings.AddNewImages(res, obj);
                    return false;
                }
                else {
                    csscody.error('<h2>' + getLocale(AspxStoreSettingsManagement, "Error Message") + "</h2><p>" + getLocale(AspxStoreSettingsManagement, "Sorry! image can not be uploaded.") + '</p>');
                    return false;
                }
            }
        });
    },
    dummyProgress: function(progressBar, percentage) {
        if (percentageInterval[pcount]) {
            progress = percentageInterval[pcount] + Math.floor(Math.random() * 10 + 1);
            percentage.text(progress.toString() + '%');
            progressBar.progressbar({
                value: progress
            });
            var percent = percentage.text();
            percent = percent.replace('%', '');
            percent = percent.replace('%', '');
            if (percent == 100100 || percent > 100100) {
                percentage.text('100%');
                //  percentage.html('');
                $('.progress').hide();
            }
        }

        if (timeInterval[pcount]) {
            progressTime = setTimeout(function() {
                StoreSettings.dummyProgress(progressBar, percentage)
            }, timeInterval[pcount] * 10);
        }
        pcount++;
    },

    AddNewImages: function(response, obj) {
        if (obj == "fupDefaultImageURL") {
            $("#defaultProductImage").html('<img src="' + aspxRootPath + response.Message + '" class="uploadImage" height="90px" width="100px"/>');
        } else {
            $("#divStoreLogo").html('<img src="' + aspxRootPath + response.Message + '" class="uploadImage" height="90px" width="100px"/>');
        }
    },
    SelectAllCountry: function(type) {
        if (type == 'cbSelectAllShippingCountry') {
            if ($("#cbSelectAllShippingCountry").is(":checked") == true || $("#cbSelectAllShippingCountry").is(":checked") == "true") {
                $("#lbCountryShipping").find('option').attr('selected', 'selected');
            } else {
                $("#lbCountryShipping").find('option').removeAttr('selected');
                $("#lbCountryShipping").find('option:first').attr('selected', 'selected');
            }
        }
        if (type == 'cbSelectAllBillingCountry') {
            if ($("#cbSelectAllBillingCountry").is(":checked") == true || $("#cbSelectAllBillingCountry").is(":checked") == "true") {
                $("#lbCountryBilling").find('option').attr('selected', 'selected');
            } else {
                $("#lbCountryBilling").find('option').removeAttr('selected');
                $("#lbCountryBilling").find('option:first').attr('selected', 'selected');
            }
        }
        StoreSettings.ListNameSelected();
    },
    ListNameSelected: function() {
        var s = "", b = "";
        if ($("#lbCountryShipping").val() != null) {
            var sl = $("#lbCountryShipping").val().length;

            $("#lbCountryShipping").find('option:selected').each(function(index) {
                if (sl - 1 > index) {
                    if (this.value != '0')
                        s += $(this).text() + ", ";
                }
                else
                    s += $(this).text();
            });
        }
        if ($("#lbCountryBilling").val() != null) {
            var bl = $("#lbCountryBilling").val().length;
            $("#lbCountryBilling").find('option:selected').each(function(index) {
                if (bl - 1 > index) {
                    if (this.value != '0')
                        b += $(this).text() + ", ";
                }
                else
                    b += $(this).text();
            });
        }
        if (s != "") {
            $("#lblShippingCountry").html(getLocale(AspxStoreSettingsManagement, "Selected Country :") + s);
        } else {
            $("#lblShippingCountry").html('');
        }
        if (b != "") {
            $("#lblBillingCountry").html(getLocale(AspxStoreSettingsManagement, "Selected Country :") + b);
        } else {
            $("#lblBillingCountry").html('');
        }


    },

    ajaxSuccess: function(data) {
        switch (StoreSettings.config.ajaxCallMode) {
            case 0:
                break;
            case 1:
                var value = data.d;
                if (value != null) {
                    StoreSettings.BindAllValue(value);
                }
                StoreSettings.InitializeTabs();
                break;
            case 2:
                var countryElements = '';
                var selectOne = '<option value="0">' + getLocale(AspxStoreSettingsManagement, 'Select One') + '</option>';
                $.each(data.d, function(index, value) {
                    countryElements += '<option value=' + value.Value + '>' + value.Text + '</option>';
                });
                $("#lbCountryShipping").html(selectOne + countryElements);
                $("#lbCountryBilling").html(selectOne + countryElements);
                StoreSettings.BindChangeFxToCountry();
                break;
            case 3:
                var currencyElements = '';
                $.each(data.d, function(index, value) {
                    currencyElements += '<option value=' + value.CurrencyCode + '>' + value.CurrencyName + '</option>';
                });
                $("#ddlCurrency").html(currencyElements);
                break;
            case 4:
                StoreSettings.GetAllStoreSettings();
                csscody.info('<h2>' + getLocale(AspxStoreSettingsManagement, "Information Message") + "</h2><p>" + getLocale(AspxStoreSettingsManagement, "Store Settings  has been updated successfully.") + '</p>');
                break;
            case 5:
                if (data.d.length > 0) {
                    $.each(data.d, function(index, item) {
                        var displayOptions = "<option value=" + item.DisplayItemID + ">" + item.OptionType + "</option>";
                        $("#ddlViewAsOptions").append(displayOptions);
                    });
                }
                break;
            case 6:
                if (data.d.length > 0) {
                    $.each(data.d, function(index, item) {
                        var displayOptions = "<option value=" + item.SortOptionTypeID + ">" + item.OptionType + "</option>"
                        $("#ddlSortByOptions").append(displayOptions);
                    });
                }
                break;
        }
    }
}
StoreSettings.init();
});