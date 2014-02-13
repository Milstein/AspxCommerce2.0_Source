var ItemDetails = "";
var url = "";
var QueryString = "";

$(function() {
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var costVarIDArr = new Array();
    var calledID = new Array();
    var currentPage = 0;
    var arrItemListType = new Array();
    var aspxCommonObj = {
        StoreID: storeId,
        PortalID: portalId,
        UserName: userName,
        CultureName: cultureName
    };
    var items_per_page = '';
    ItemDetails = {
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
            userName: userName,
            ajaxCallMode: 0, ///0 for get categories and bind, 1 for notification,2 for versions bind 
            itemid: 0
        },
        vars: {
            countCompareItems: 0
        },

        BindItemsSortByDropDown: function() {
            ItemDetails.config.method = "BindItemsSortByList";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = "{}";
            ItemDetails.config.ajaxCallMode = 3;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllLatestItems: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetLatestItemsDetails";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllBestSoldItems: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetBestSoldItemDetails";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllSpecialItems: function(offset, limit, current, sortBy) {

            currentPage = current;
            ItemDetails.config.method = "GetSpecialItemDetails";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllFeature: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetFeatureItemDetails";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllRecentlyViewedItems: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetRecentlyViewedItemDetails";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllGiftCard: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetGiftCardItemsDetails";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        LoadAllHeavyDiscountItems: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetAllHeavyDiscountItems";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },
        LoadAllSeasonalItems: function(offset, limit, current, sortBy) {
            currentPage = current;
            ItemDetails.config.method = "GetAllSeasonalItems";
            ItemDetails.config.url = ItemDetails.config.baseURL + ItemDetails.config.method;
            ItemDetails.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
            ItemDetails.config.ajaxCallMode = 2;
            ItemDetails.ajaxCall(ItemDetails.config);
        },

        ajaxCall: function(config) {
            $.ajax({
                type: ItemDetails.config.type,
                contentType: ItemDetails.config.contentType,
                cache: ItemDetails.config.cache,
                async: ItemDetails.config.async,
                url: ItemDetails.config.url,
                data: ItemDetails.config.data,
                dataType: ItemDetails.config.dataType,
                success: ItemDetails.ajaxSuccess,
                error: ItemDetails.ajaxFailure
            });
        },

        ajaxSuccess: function(data) {
            switch (ItemDetails.config.ajaxCallMode) {
                case 0:
                    break;
                case 2:
                    if (QueryString == "new") {
                        // ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'hdnPrice', 'hdnWeight', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllLatestItems, currentPage, 'ItemDetails', storeId, portalId, userName, cultureName, costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllLatestItems, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "best") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllBestSoldItems, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "special") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllSpecialItems, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "feature") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllFeature, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "giftCard") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllGiftCard, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "recent") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllRecentlyViewedItems, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "heavy") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllHeavyDiscountItems, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    if (QueryString == "seasonal") {
                        ItemViewList('divDetailsItemList', 'ddlItemPageSize', 'ItemPagination', 'divItemSearchPageNumber', data, arrItemListType, rowTotal, allowOutStockPurchase, allowWishListItemDetails, ItemDetails.LoadAllHeavyDiscountItems, currentPage, 'ItemDetails', costVarIDArr, calledID, 'ddlSortItemDetailBy', 'Medium');
                    }
                    break;
                case 3:
                    if (data.d.length > 0) {
                        $("#ddlSortItemDetailBy").html('');
                        $.each(data.d, function(index, item) {
                            var displayOptions = "<option data-html-text='" + item.OptionType + "' value=" + item.SortOptionTypeID + ">" + item.OptionType + "</option>";
                            $("#ddlSortItemDetailBy").append(displayOptions);
                        });
                        if (QueryString == "new") {
                            // ItemDetails.LoadAllLatestItems(1, $("#ddlItemPageSize").val(), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "best") {
                            //  ItemDetails.LoadAllBestSoldItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "special") {
                            //  ItemDetails.LoadAllSpecialItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "feature") {
                            //  ItemDetails.LoadAllFeature(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "giftCard") {
                            //   ItemDetails.LoadAllGiftCard(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "recent") {
                            // ItemDetails.LoadAllRecentlyViewedItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "heavy") {
                            //ItemDetails.LoadAllHeavyDiscountItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                        if (QueryString == "seasonal") {
                            //ItemDetails.LoadAllSeasonalItems(1, parseInt($("#ddlItemPageSize").val()), 0, $("#ddlSortItemDetailBy option:selected").val());
                        }
                    }
                    break;
            }

        },

        init: function() {
            var offset = 1;
            $("#ddlItemPageSize").html('');
            var itemPageSize = '';
            itemPageSize += "<option data-html-text='8' value='8'>" + 8 + "</option>";
            itemPageSize += "<option data-html-text='16' value='16'>" + 16 + "</option>";
            itemPageSize += "<option data-html-text='24' value='24'>" + 24 + "</option>";
            itemPageSize += "<option data-html-text='32' value='32'>" + 32 + "</option>";
            itemPageSize += "<option data-html-text='40' value='40'>" + 40 + "</option>";
            itemPageSize += "<option data-html-text='64' value='64'>" + 64 + "</option>";
            $("#ddlItemPageSize").html(itemPageSize);
            url = window.location.href;
            QueryString = url.substring(url.indexOf('id=') + 3);
            //  ItemDetails.BindItemsSortByDropDown();
            if (QueryString == "new") {
                $('#h2ItemHeader').html(getLocale(AspxItemViewList,"New Arrivals Items"));
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllLatestItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllLatestItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });

            }
            if (QueryString == "best") {
                $('#h2ItemHeader').html("<span>"+getLocale(AspxItemViewList,'Best Seller Items')+"</span>");
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllBestSoldItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllBestSoldItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }
            if (QueryString == "special") {

                $('#h2ItemHeader').html("<span>"+getLocale(AspxItemViewList,'Special Items')+"</span>");
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllSpecialItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllSpecialItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }
            if (QueryString == "feature") {
                $('#h2ItemHeader').html("<span>"+getLocale(AspxItemViewList,'Feature Items')+"</span>");
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllFeature(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllFeature(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }

            if (QueryString == "giftCard") {
                $('#h2ItemHeader').html(getLocale(AspxItemViewList,"Gift Cards"));
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllGiftCard(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllGiftCard(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }

            if (QueryString == "recent") {
                $('#h2ItemHeader').html("<span>"+getLocale(AspxItemViewList,'Recently Viewed Items')+" </span>");
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllRecentlyViewedItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllRecentlyViewedItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }
            if (QueryString == "heavy") {
                $('#h2ItemHeader').html("<span> "+getLocale(AspxItemViewList,'Heavy Discount Items')+" </span>");
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllHeavyDiscountItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllHeavyDiscountItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }
            if (QueryString == "seasonal") {
                $('#h2ItemHeader').html("<span>"+getLocale(AspxItemViewList,'Seasonal Sale Items')+"</span>");
                $("#ddlItemPageSize").change(function() {
                    items_per_page = $(this).val();
                    ItemDetails.LoadAllSeasonalItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
                $("#ddlSortItemDetailBy").change(function() {
                    items_per_page = $('#ddlItemPageSize').val();
                    ItemDetails.LoadAllSeasonalItems(offset, items_per_page, 0, $("#ddlSortItemDetailBy option:selected").val());
                });
            }
            if (parseInt(arrayLength) > 0) {
                items_per_page = $("#ddlItemPageSize").val();
                $('#ItemPagination').pagination(rowTotal, {
                    //  callback:'',
                    items_per_page: items_per_page,
                    //num_display_entries: 10,
                    current_page: currentPage,
                    callfunction: true,
                    function_name: { name: "ItemDetails." + varFunction, limit: $('#ddlItemPageSize').val(), sortBy: $('#ddlSortItemDetailBy').val() },
                    prev_text:getLocale(AspxItemViewList,"Prev"),
                    next_text: getLocale(AspxItemViewList,"Next"),
                    prev_show_always: false,
                    next_show_always: false
                });
                $('#divItemSearchPageNumber').show();
            }
            $('#divSortBy').show();
            $('#divItemSearchPageNumber').show();
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        }
    };
    ItemDetails.init();
});