var BestSellersCarousel = "";
var costVariantValueIDs = "";
$(function() {
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var customerId = AspxCommerce.utils.GetCustomerID();
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var sessionCode = AspxCommerce.utils.GetSessionCode();
    var countSeller = countBestSellerSetting;
    var aspxCommonObj = {
        StoreID: storeId,
        PortalID: portalId,
        UserName: userName,
        CultureName: cultureName
    };
    BestSellersCarousel = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: "json",
            baseURL: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/",
            url: "",
            method: "",
            ajaxCallMode: "",
            itemid: 0
        },
        vars: {
            countCompareItems: 0
        },
        ajaxCall: function(config) {
            $.ajax({
                type: BestSellersCarousel.config.type,
                contentType: BestSellersCarousel.config.contentType,
                cache: BestSellersCarousel.config.cache,
                async: BestSellersCarousel.config.async,
                data: BestSellersCarousel.config.data,
                dataType: BestSellersCarousel.config.dataType,
                url: BestSellersCarousel.config.url,
                success: BestSellersCarousel.config.ajaxCallMode,
                error: BestSellersCarousel.ajaxFailure
            });
        },
        GetBestSoldItemsCarasoul: function() {
            if (countSeller > 0) {
                var offset = 1;
                var sortBy = 1;
                this.config.url = this.config.baseURL + "GetBestSellerCarousel";
                this.config.data = JSON2.stringify({ offset: offset, limit: countSeller, aspxCommonObj: aspxCommonObj, sortBy: sortBy });
                this.config.ajaxCallMode = BestSellersCarousel.BindBestSellerItems;
                this.ajaxCall(this.config);
            }
        },
        BindBestSellerItems: function(data) {
            if (data.d.length > 0) {
                var bestSellerContents = '';
                bestSellerContents += '<div id="divBestSellerBoxInfo" class="cssClassBestSellerBoxInfoCarousel">';
                var rowTotal;
                $.each(data.d, function(index, item) {
                    rowTotal = item.RowTotal;
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        imagePath = defaultImagePath;
                    }
                    bestSellerContents += "<div class=\"cssClassProductsBoxWrapper\">";
                    bestSellerContents += "<div class=\"cssClassProductsBox\">";

                    var hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
                    var name = '';
                    if (item.Name.length > 50) {
                        name = item.Name.substring(0, 50);
                        var i = 0;
                        i = name.lastIndexOf(' ');
                        name = name.substring(0, i);
                        name = name + "...";
                    }
                    else {
                        name = item.Name;
                    }
                    bestSellerContents += '<div id="productCarasoulImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + '  itemid="' + item.ItemID + '"><a href="' + hrefItem + '" title="' + item.Name + '"><h2>' + name + '</h2></a><div class="cssClassProductPicture"><a href="' + hrefItem + '"><img alt="' + item.Name + '"  title="' + item.Name + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '" ></a></div><h3>' + item.SKU + '</h3>';
                    if (item.ListPrice == "") {
                        item.ListPrice = null;
                    }
                    if (!item.HidePrice) {
                        if (item.ListPrice != null) {
                            bestSellerContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + item.ListPrice + ">" + item.ListPrice * rate + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + item.Price + ">" + item.Price * rate + "</span></p></div></div>";
                        }
                        else {
                            bestSellerContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + item.Price + ">" + item.Price * rate + "</span></p></div></div>";
                        }
                    }
                    else {
                        bestSellerContents += "<div class=\"cssClassProductPriceBox\"></div>";
                    }
                    bestSellerContents += '<div class="cssClassProductDetail"><p><a href="' + aspxRedirectPath + 'item/' + item.SKU + '.aspx">' + getLocale(AspxBestSellers, "Details") + '</a></p></div></div>';

                    //                    bestSellerContents += "<div class=\"cssClassButtonWrapper\">";
                    //                    if (allowWishListLatestItem.toLowerCase() == 'true') {
                    //                        if (customerId > 0 && userName.toLowerCase() != "anonymoususer") {
                    //                            bestSellerContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='BestSellersCarousel.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxBestSellers, "Wishlist") + "</span></span></button></div>";
                    //                        } else {
                    //                            bestSellerContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='AspxCommerce.RootFunction.Login();'><span><span><span>+</span>" + getLocale(AspxBestSellers, "Wishlist") + "</span></span></button></div>";
                    //                        }
                    //                    }
                    //                    //                    if (allowAddToCompareLatest.toLowerCase() == 'true') {
                    //                    //                        bestSellerContents += "<div class=\"cssClassCompareButton\"><button type=\"button\" id=\"btnAddCompare\" onclick='BestSellersCarousel.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxBestSellers, "Compare") + "</span></span></button></div>";
                    //                    //                    }
                    //                    bestSellerContents += "</div>";
                    //                    bestSellerContents += "<div class=\"cssClassclear\"></div>";
                    //                    var itemSKU = JSON2.stringify(item.SKU);
                    //                    var itemName = JSON2.stringify(item.Name);
                    //                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                    //                        if (item.IsOutOfStock) {
                    //                            bestSellerContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"cssClassButtonWrapper cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxBestSellers, "Out Of Stock") + "</span></button></div></div>";
                    //                        } else {
                    //                            bestSellerContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"cssClassButtonWrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "   onclick='BestSellersCarousel.AddToCartToJS(" + item.ItemID + "," + item.Price + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxBestSellers, "Add to cart") + "</span></span></button></div></div>";
                    //                        }
                    //                    } else {
                    //                        bestSellerContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"cssClassButtonWrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "  onclick='BestSellersCarousel.AddToCartToJS(" + item.ItemID + "," + item.Price + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxBestSellers, "Add to cart") + "</span></span></button></div></div>";
                    //                    }
                    bestSellerContents += "</div></div>";

                });
                bestSellerContents += "</div>";
                $("#bestSellerCarasoul").html('').html(bestSellerContents);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $(".cssClassBestSellerBoxInfoCarousel").bxSlider({
                    auto: true,
                    speed: 2000,
                    displaySlideQty: 4,
                    moveSlideQty: 1,
                    autoHover: true
                });
                //                        if (rowTotal > countSeller) {
                //                            $("#divViewMoreBest").append('<a href="' + basePath + 'Detail-View.aspx?id=best">View More</a>');
                //                        }
            }
            else {
                $("#bestSellerCarasoul").html("<span class=\"cssClassNotFound\">" + getLocale(AspxBestSellers, "No item is sold in this store Yet!") + "</span></div>");
            }

        },
        AddItemsToCompare: function(itemId, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                BestSellersCarousel.vars.countCompareItems = itemCompareCount;
                BestSellersCarousel.config.itemid = itemId;
                BestSellersCarousel.GetCompareItemsCount();
                if (BestSellersCarousel.vars.countCompareItems >= parseInt(maxCompareItemCount)) {
                    csscody.alert('<h2>' + getLocale(AspxBestSellers, 'Information Alert') + '</h2><p>' + getLocale(AspxBestSellers, 'More than') + ' ' + maxCompareItemCount + ' ' + getLocale(AspxBestSellers, 'items are not allowed to add in compare list!') + '</p>');
                    ItemsCompare.GetCompareItemList();
                    return false;
                }
                var costVariantIds = '0';
                this.config.method = "CheckCompareItems";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ ID: itemId, storeID: storeId, portalID: portalId, userName: userName, sessionCode: sessionCode, costVariantValueIDs: costVariantIds });
                this.config.ajaxCallMode = BestSellersCarousel.CheckCompareItems;
                this.ajaxCall(this.config);
                return false;
            }
        },

        AddItemsToCompare: function(itemId, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                var costVariantIds = '0';
                ItemsCompare.AddToCompare(itemId, costVariantIds);
            }
        },
        GetCompareItemsCount: function() {
            this.config.method = "GetCompareItemsCount";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ storeID: storeId, portalID: portalId, userName: userName, sessionCode: sessionCode });
            this.config.ajaxCallMode = BestSellersCarousel.SetCompareItemsCount;
            this.ajaxCall(this.config);
        },
        CheckWishListUniqueness: function(itemID, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {

                this.config.itemid = itemID;
                var checkparam = { ID: itemID, storeID: storeId, portalID: portalId, userName: userName, costVariantValueIDs: costVariantValueIDs };
                var checkdata = JSON2.stringify(checkparam);
                this.config.method = "CheckWishItems",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = checkdata;
                this.config.ajaxCallMode = BestSellersCarousel.CheckAddToWishItems;
                this.ajaxCall(this.config);
            }
        },
        //        fixedEncodeURIComponent: function(str) {
        //            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
        //        },
        IncreaseWishListCount: function() {
            var wishListCount = $('#lnkMyWishlist span ').html().replace(/[^0-9]/gi, '');
            wishListCount = parseInt(wishListCount) + 1;
            $('.cssClassLoginStatusInfo ul li a#lnkMyWishlist span ').html("[" + wishListCount + "]");
        },
        AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity, storeId, portalId, customerId, sessionCode, userName, cultureName);
            }
        },
        IncreaseShoppingBagCount: function() {
            var myShoppingBagCount = $('#lnkshoppingcart').html().replace(/[^0-9]/gi, '');
            myShoppingBagCount = parseInt(myShoppingBagCount) + 1;
            $('#lnkshoppingcart').html(getLocale(AspxBestSellers, "My Shopping Bag") + "[" + myShoppingBagCount + "]");
        },


        CheckAddToWishItems: function(data) {
            if (data.d) {
                csscody.alert('<h2>' + getLocale(AspxBestSellers, 'Information Alert') + '</h2><p>' + getLocale(AspxBestSellers, 'The selected item already exist in your wishlist.') + '</p>');
            } else {
                AspxCommerce.RootFunction.AddToWishListFromJS(BestSellersCarousel.config.itemid, storeId, portalId, userName, ip, countryName, costVariantValueIDs); // AddToList ==> AddToWishList
            }
        },
        init: function() {
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            if (rowTotal > 0) {
                $(".cssClassBestSellerBoxInfoCarousel").bxSlider({
                    auto: true,
                    speed: 2000,
                    displaySlideQty: 4,
                    moveSlideQty: 1,
                    autoHover: true
                });
            }


            //            if (enableBestSellerItems.toLowerCase() == 'true') {
            //                BestSellersCarousel.GetBestSoldItemsCarasoul();
            //                $("#divBestSellers").show();
            //            }
        }
    };
    BestSellersCarousel.init();
});