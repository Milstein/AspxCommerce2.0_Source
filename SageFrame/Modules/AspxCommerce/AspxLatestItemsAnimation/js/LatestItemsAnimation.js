var LatestItemAnimation;
var costVariantValueIDs = "";
$(function() {
    LatestItemAnimation = function() {
        var $ajaxCall = function(url, method, param, successFx, errorFnx) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: false,
                url: url + method,
                data: param,
                dataType: "json",
                success: successFx,
                error: errorFnx
            });
        };


        var lstVars = {
            itemID: 0,
            costVariantValueIDs: "",
            ip: AspxCommerce.utils.GetClientIP(),
            countryName: AspxCommerce.utils.GetAspxClientCoutry()
        };
        var AspxCommonObj = function() {
            var aspxCommonObj = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                CultureName: AspxCommerce.utils.GetCultureName(),
                UserName: AspxCommerce.utils.GetUserName(),
                CustomerID: AspxCommerce.utils.GetCustomerID()
            };
            return aspxCommonObj;
        };
        var loadLatestItemRssImage = function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#lstItemsAnimationRssImage').parent('a').show();
            $('#lstItemsAnimationRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=latestitems');
            $('#lstItemsAnimationRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#lstItemsAnimationRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Latest Items Rss Feed Title"));
            $('#lstItemsAnimationRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Latest Items Rss Feed Alt"));
        };
        var init = function() {
            if (latestItemRss.toLowerCase() == 'true') {
               loadLatestItemRssImage();
            }
            getLatestBookItem();
        };
        var bindStarRating = function(itemAvgRating) {
            var ratingStars = '';
            var ratingTitle = [getLocale(AspxLatestItemAnimation, "Worst"), getLocale(AspxLatestItemAnimation, "Ugly"), getLocale(AspxLatestItemAnimation, "Bad"), getLocale(AspxLatestItemAnimation, "Not Bad"), getLocale(AspxLatestItemAnimation, "Average"), getLocale(AspxLatestItemAnimation, "OK"), getLocale(AspxLatestItemAnimation, "Nice"), getLocale(AspxLatestItemAnimation, "Good"), getLocale(AspxLatestItemAnimation, "Best"), getLocale(AspxLatestItemAnimation, "Excellent")]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            var ratinglbl = '';
            ratingStars += '<tr><td>';
            for (i = 0; i < 10; i++) {
                if (itemAvgRating == ratingText[i]) {
                    ratingStars += '<input name="avgItemRating" type="radio" class="star" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                    //$(".cssClassRatingTitle").html(ratingTitle[i]);
                    ratingTitle = ratingTitle[i];
                } else {
                    ratingStars += '<input name="avgItemRating" type="radio" class="star" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            ratingStars += '</td></tr>';
            return ratingStars;
        };
        var bindLatestBookItem = function(msg) {
            var RecentItemContents = '';
            if (msg.d.length > 0) {
                $("#" + divBookItemsContent).html('');
                $.each(msg.d, function(index, item) {
                    RecentItemContents = '';
                    //if (!item.HideToAnonymous) {
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        imagePath = defaultImagePath;
                    }
                    if (item.AlternateText == "") {
                        item.AlternateText = item.Name;
                    }
                    if (item.AlternateImagePath == "") {
                        item.AlternateImagePath = imagePath;
                    }
                    if ((index + 1) % eval(noOfLatestItemsInARow) == 0) {
                        RecentItemContents += "<div class=\"cssClassProductsBox cssClassProductsBoxNoMargin\">";
                    } else {
                        RecentItemContents += "<div class=\"cssClassProductsBox\">";
                    }
                    var discount = 0;
                    var listPrice = item.ListPrice;
                    if (listPrice != null) {
                        discount = ((item.ListPrice - item.Price) / item.ListPrice) * 100;
                        //  discount = discount.toFixed(2);
                        discount = Math.round(discount);
                        if (discount > 0) {
                            RecentItemContents += "<div class=\"cssClassSaveDiscount\"><span>" + discount + "% </span><span>Off</span></div>";
                        }
                    }
                    if (allowAddToCompareLatest.toLowerCase() == 'true') {
                        RecentItemContents += "<div class=\"cssClassCompareButton\"><input type=\"checkbox\" id=\"compare-" + item.ItemID + "\" onclick='LatestItemAnimation.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span>" + getLocale(AspxLatestItemAnimation, "Compare") + "</span></input></div>";
                    }
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
                    var hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
                    RecentItemContents += '<div id="productImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + '  itemid="' + item.ItemID + '"><div class="cssClassProductPicture"><a href="' + hrefItem + '" ><img id="img_' + item.ItemID + '"  alt="' + item.AlternateText + '"  title="' + item.AlternateText + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '"></a>';
                    RecentItemContents += "<div class=\"cssClassProductInfo\">";
                    RecentItemContents += "<h5><a href=\"" + hrefItem + "\" title=\"" + item.Name + "\">" + name + "</a></h5>";
                    var shortDescription = item.ShortDescription;
                    var description = '';
                    if (shortDescription != '' || shortDescription != null) {
                        if (shortDescription.indexOf(' ') > 1) {
                            index = shortDescription.substring(0, 100).lastIndexOf(' ');
                            description = shortDescription.substring(0, index);
                            description = description + ' ...';
                        } else {
                            description = shortDescription;
                        }
                    } else {
                        description = '';
                    }
                    RecentItemContents += "<p>" + Encoder.htmlDecode(description) + "</p>";
                    var averageRating = item.AverageRating;
                    if (averageRating > 0) {
                        RecentItemContents += "<div class=\"cssClassItemRating\">";
                        RecentItemContents += " <span class=\"cssClassRatingTitle\"></span>";
                        RecentItemContents += "<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" id=\"tblAverageRating\">";
                        var rating = bindStarRating(averageRating);
                        RecentItemContents += rating;
                        RecentItemContents += "</table>";
                        RecentItemContents += "</div>";
                    }
                    var viewCount = 0;
                    if (item.ViewCount > 0) {
                        viewCount = item.ViewCount;
                    }
                    if (!item.HidePrice) {
                        if (item.ListPrice != null) {
                            RecentItemContents += "<div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + (item.ListPrice).toFixed(2) + ">" + (item.ListPrice * rate).toFixed(2) + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div><div class=\"cssViewer\"><span class=\"cssClassView\"></span><span>[" + viewCount + "]</span></div>";
                        } else {
                            RecentItemContents += "<div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div><div class=\"cssViewer\"><span class=\"cssClassView\"></span><span>[" + viewCount + "]</span></div>";
                        }
                    }
                    RecentItemContents += "<div class=\"sfButtonwrapper\">";
                    if (allowWishListLatestItem.toLowerCase() == 'true') {
                        if (AspxCommonObj().CustomerID > 0 && userName.toLowerCase() != "anonymoususer") {
                            RecentItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" onclick='LatestItemAnimation.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span>" + getLocale(AspxLatestItemAnimation, "Wishlist") + "</span></span></button></div>";
                        } else {
                            RecentItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" onclick='AspxCommerce.RootFunction.Login();'><span><span>" + getLocale(AspxLatestItemAnimation, "Wishlist") + "</span></span></button></div>";
                        }
                    }
                    var itemSKU = JSON2.stringify(item.SKU);
                    var itemName = JSON2.stringify(item.Name);
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        if (item.IsOutOfStock) {
                            RecentItemContents += "<div class=\"cssClassAddtoCard1 cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxLatestItemAnimation, "Out Of Stock") + "</span></button></div>";
                        } else {
                            RecentItemContents += "<div class=\"cssClassAddtoCard1\"><button type=\"button\" title=" + itemName + "   onclick='LatestItemAnimation.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxLatestItemAnimation, "Add to cart") + "</span></span></button></div>";
                        }
                    } else {
                        RecentItemContents += "<div class=\"cssClassAddtoCard1\"><button type=\"button\" title=" + itemName + "  onclick='LatestItemAnimation.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxLatestItemAnimation, "Add to cart") + "</span></span></button></div>";
                    }
                    RecentItemContents += "</div></div></div>";
                    RecentItemContents += "</div></div>";
                    $("#" + divBookItemsContent).append(RecentItemContents);
                    $('input.star').rating({ split: 2 });
                });

            } else {
                RecentItemContents += "<span class=\"cssClassNotFound\">" + getLocale(AspxLatestItemAnimation, "This store has no items listed yet!") + "</span>";
                $("#" + divBookItemsContent).html(RecentItemContents);
            }
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        };
        var addToCartToJS = function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
            }
        };

        var checkWishListUniqueness = function(itemID, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                lstVars.itemID = itemID;
                var commonInfo = AspxCommonObj();
                var checkparam = { ID: itemID, aspxCommonObj: commonInfo, costVariantValueIDs: costVariantValueIDs };
                var param = JSON2.stringify(checkparam);

                var url = aspxservicePath + "AspxCommerceWebService.asmx/";
                $ajaxCall(url, "CheckWishItems", param, checkAddToWishItems, null);
            }
        };
        var checkAddToWishItems = function(data) {
            if (data.d) {
                csscody.alert('<h2>' + getLocale(AspxLatestItemAnimation, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItemAnimation, 'The selected item already exist in your wishlist.') + '</p>');
            } else {
                AspxCommerce.RootFunction.AddToWishListFromJS(lstVars.itemID, lstVars.ip, lstVars.countryName, lstVars.costVariantValueIDs); // AddToList ==> AddToWishList
            }
        };
        var fixedEncodeURIComponent = function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
        };

        var addItemsToCompare = function(itemId, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                var costVariantIds = '0';
                ItemsCompare.AddToCompare(itemId, costVariantIds);
            }
        };

        var getLatestBookItem = function() {
            var commonInfo = AspxCommonObj();
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ aspxCommonObj: commonInfo, count: noOfLatestItems });
            $ajaxCall(url, "GetLatestItemsListAnimation", param, bindLatestBookItem, null); //GetLatestBookItemsList
        };

        return {
            Init: init,
            AddToCartToJS: addToCartToJS,
            CheckWishListUniqueness: checkWishListUniqueness,
            CheckAddToWishItems: checkAddToWishItems,
            AddItemsToCompare: addItemsToCompare,
            LstVars: lstVars,
            GetLatestBookItem: getLatestBookItem
        };
    } ();
    LatestItemAnimation.Init();

});
