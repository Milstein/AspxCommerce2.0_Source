var rate;
var region;
var curencyConversion = "";
$(function() {
    $(".sfLocale").localize({
        moduleKey: AspxCurrencyConverter
    });
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName(),
        SessionCode: AspxCommerce.utils.GetSessionCode(),
        CustomerID: AspxCommerce.utils.GetCustomerID()
    };
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();


    curencyConversion = {
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
            url: "",
            ajaxCallMode: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: curencyConversion.config.type,
                contentType: curencyConversion.config.contentType,
                cache: curencyConversion.config.cache,
                async: curencyConversion.config.async,
                url: curencyConversion.config.url,
                data: curencyConversion.config.data,
                dataType: curencyConversion.config.dataType,
                success: curencyConversion.config.ajaxCallMode,
                error: curencyConversion.ajaxFailure
            });
        },
        GetRate: function() {
            this.config.url = this.config.baseURL + "GetCurrencyRateOnChange";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, from: BaseCurrency, to: $("#ddlCurrency").val(), region: $("#ddlCurrency option:selected").attr("region") });
            this.config.ajaxCallMode = curencyConversion.SetCurrencyRate;
            this.config.async = false;
            this.ajaxCall(this.config);
        },

        bindCurrencyList: function() {
            this.config.url = this.config.baseURL + "BindCurrencyList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = curencyConversion.BindCurrency;
            this.ajaxCall(this.config);
        },
        vars: {
            returnRate: 0
        },
        SetCurrencyRate: function(msg) {
            curencyConversion.returnRate = msg.d;
        },

        BindCurrency: function(msg) {
            if (msg.d.length > 0) {
                var options = "";
                $.each(msg.d, function(index, item) {
                    if (item.CurrencyCode == SelectedCurrency) {
                        options += '<option selected="selected" data-icon="' + aspxRootPath + 'images/flags/' + item.BaseImage + '"  data-html-text="' + item.CurrencyName + '-' + item.CurrencyCode + '" region=' + item.Region + '  value="' + item.CurrencyCode + '" CurrencyID="' + item.CurrencyID + '" >' + item.CurrencyName + '-' + item.CurrencyCode + '</option>';
                    } else {
                        options += '<option data-icon="' + aspxRootPath + 'images/flags/' + item.BaseImage + '"  data-html-text="' + item.CurrencyName + '-' + item.CurrencyCode + '" region=' + item.Region + '  value="' + item.CurrencyCode + '" CurrencyID="' + item.CurrencyID + '" >' + item.CurrencyName + '-' + item.CurrencyCode + '</option>';
                    }
                });
                $("#ddlCurrency").html(options);
                MakeFancyDropDown();
            }
        },

        SetSessionValue: function(sessionKey, sessionValue) {
            this.config.method = "SetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue });
            this.config.ajaxCallMode = "";
            this.config.async = false;
            //this.config.error = 2;
            this.ajaxCall(this.config);
        },

        init: function(config) {
            // debugger;
            //            if ($.session("Rate")) {
            //                rate = $.session("Rate");
            //                region = $.session("Region"); //$('select.makeMeFancy').find(":selected").text()
            //                SelectedCurrency = $.session("SelectedCurrency");
            //            }
            curencyConversion.bindCurrencyList();
            //curencyConversion.SetSessionValue("CurrencyRate", 1);
            //MakeFancyDropDown();
            $('#ddlCurrency').change(function() {
                if ($("#ddlCurrency").val() == BaseCurrency) {
                    rate = 1;
                    region = $("#ddlCurrency option:selected").attr("region");
                    SelectedCurrency = $("#ddlCurrency option:selected").val();
                    curencyConversion.SetSessionValue("CurrencyRate", 1);
                    curencyConversion.SetSessionValue("CurrencyCode", BaseCurrency);
                    curencyConversion.SetSessionValue("Region", region);
                } else {
                    curencyConversion.GetRate();
                    if (curencyConversion.returnRate == 0) {
                        csscody.alert("<h2>" + getLocale(AspxCurrencyConverter, "Information Alert") + "</h2><p>" + getLocale(AspxCurrencyConverter, "Unable to connect to the remote server.Please try again later!") + "</p>");
                        return false;
                    } else {
                        rate = curencyConversion.returnRate + ((eval(curencyConversion.returnRate) * eval(additionalCVR)) / 100);
                    }
                    region = $("#ddlCurrency option:selected").attr("region");
                    SelectedCurrency = $("#ddlCurrency option:selected").val();
                }

                // $.session("Region", region);
                // $.session("Rate", rate);
                //$.session("SelectedCurrency", SelectedCurrency);
                // curencyConversion.SetSessionValue("SelectedCurrency", SelectedCurrency);
                if ($("#divLatestItems").length) {
                    LatestItems.GetLatestItems();
                }
                if ($("#divRecentlyAddedWishList").length > 0) {
                    WishItems.BindMyWishList();
                }
                if ($("#divlatestItemsNew").length > 0) {
                    LatestItems_New.GetLatestItems();
                }
                if ($("#divLatestBookItems").length > 0) {
                    LatestItemAnimation.GetLatestBookItem();
                }
                if ($("#divMyCart").length > 0) {
                    AspxCart.GetUserCartDetails(); //for binding mycart's tblCartList
                    //window.location.href = aspxRedirectPath + myCartURL + '.aspx';
                    //    AspxCart.QuantitityDiscountAmount(); 
                    //    AspxCart.GetCouponDiscountAmount('CouponSessionAmount');
                    //   AspxCart.GetCouponDiscountAmount('CouponSessionPercentAmount');

                }
                if ($(".classBindPromoCode").length > 0) {
                    promoCodeView.GetAllPromoCodeItems();
                }
                if ($("#tblFilter").length > 0) {
                    categoryDetails.LoadFilterOnCurrencyChange();
                }
                if ($("#divShowSimpleSearchResult").length > 0) {
                    ItemList.BindSimpleSearchResultItems(1, $("#ddlSimpleSearchPageSize").val(), 0, $("#ddlSimpleSortBy option:selected").val());
                }
                if ($("#divOptionsSearchResult").length > 0) {
                    ItemList.BindShoppingOptionResultItems(1, $('#ddlOptionPageSize').val(), 0, $("#ddlOptionSortBy option:selected").val());
                }
                if ($("#divShowTagItemResult").length > 0) {
                    var items_per_page = $('#ddlTagItemPageSize').val();
                    ViewTagItem.ListTagsItems(1, items_per_page, 0, $("#ddlSortTagItemBy option:selected").val());
                }
                if ($("#divShowAdvanceSearchResult").length > 0) {
                    AdvanceSearch.ShowSearchResult(1, $('#ddlPageSize').val(), 0, $("#ddlAdvanceSearchSortBy option:selected").val());
                }
                if ($("#divWishListContent").length > 0) {
                    WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val());
                }
                if ($("divRecentlyAddedWishList").length > 0) {
                    WishItems.BindMyWishList();
                }
                if ($("#divRelatedItems").length > 0) {
                    YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
                }
                if ($("#itemDetails").length > 0) {
                    ItemDetail.BindItemQuantityDiscountByUserName(ItemDetail.vars.itemSKU);
                    ItemDetail.BindItemBasicByitemSKU(ItemDetail.vars.itemSKU);
                    ItemDetail.GetFormFieldList(ItemDetail.vars.itemSKU);
                }
                if ($("#divMyOrders").length > 0) {
                    window.location.href = aspxRedirectPath + myAccountURL + pageExtension;
                }
                if ($("#SingleCheckOut").length > 0) {
                    window.location.href = aspxRedirectPath + singleAddressCheckOutURL + pageExtension;
                }
                if ($("#divItemCompareElements").length > 0) {
                    window.location.href = aspxRedirectPath + compareItemListURL + pageExtension;
                }
                if ($("#tblShoppingOptionsByPrice").length > 0) {
                    ShopingOptions.GetShoppingOptionsByPrice();
                    ShopingOptions.GetShoppingOptionForSlider();
                }
                if ($("#sfFeaturedItemsFg").length > 0) {
                    FrontGallery.BindFeaturedItemsGallery();
                }
                if ($("#sfSpecialItemsFg").length > 0) {
                    FrontGallery.BindSpecialItemsGallery();
                }
                if ($("#divTrackMyOrder").length > 0) {
                    window.location.href = aspxRedirectPath + myAccountURL + pageExtension;
                }
                if ($("#divMiniShoppingCart").length > 0) {
                    ShopingBag.GetCartItemListDetails();
                }
                if ($("#dvMyRewardPoints").length > 0) {
                    MyRewardPoints.GetRewardPointsHistoryByCustomer(null);
                    MyRewardPoints.GetGeneralSettings();
                }
                if ($("#itemDetails").length > 0) {
                    ItemDetail.GetPriceHistory(ItemDetail.vars.itemId);
                }
                if ($("#divHeavyDiscount").length > 0) {
                    HeavyDiscountItems.GetDiscountSetting();
                }
                if ($("#divBrandSearchResult").length > 0) {
                    BrandItemList.BindBrandResultItems(1, $("#ddlBrandPageSize").val(), 0, $("#ddlBrandSortBy option:selected").val());
                }
                if ($(".cssGiftCardContainer").length > 0) {
                    GiftCardsAll.GetAllGiftCards();
                }
                if ($("#divServiceDetails").length > 0) {
                    ServiceDetails.GetServiceDetails();
                }
                if ($("#divServiceItemDetails").length > 0) {
                    ServiceItemDetails.GetServiceItemDetails();
                }
                if ($("#appointmentMainDiv").length > 0) {
                    BookAppointment.GetAllServices();
                }
                if ($("#gdvItems_grid").length > 0) {
                    window.location.href = aspxRedirectPath + itemMgntPageURL + pageExtension;
                }
                if ($("#divShoppingCart").length > 0) {
                    ShoppingCartFlyOver.GetCartItemListDetails();
                }
                if ($("#divBestSellersCarousel").length > 0) {
                    BestSellersCarousel.GetBestSoldItemsCarasoul();
                }
                if ($("#divcategoryItemsList").length > 0) {
                    categoryWiseItemList.CategoryItemsList(1, $('#ddlPageSize').val(), 0);

                }
                if ($("#divDetailsItemsList").length > 0) {
                    url = window.location.href;
                    var QueryString = url.substring(url.indexOf('id=') + 3);
                    if (QueryString == "new") {
                        ItemDetails.LoadAllLatestItems(1, $("#ddlItemPageSize").val(), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "best") {
                        ItemDetails.LoadAllBestSoldItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "special") {
                        ItemDetails.LoadAllSpecialItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "feature") {
                        ItemDetails.LoadAllFeature(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "giftCard") {
                        ItemDetails.LoadAllGiftCard(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "recent") {
                        ItemDetails.LoadAllRecentlyViewedItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "heavy") {
                        ItemDetails.LoadAllHeavyDiscountItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                    if (QueryString == "seasonal") {
                        ItemDetails.LoadAllSeasonalItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                    }
                }

            });
        }
    };
    curencyConversion.init();
});