var HeavyDiscountItems = "";
var offset = 1;
var rowTotal = 0;
var check = 0;
var costVariantValueIDs = "";

$(function() {
    function AspxCommonObj() {
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            UserName: AspxCommerce.utils.GetUserName(),
            CustomerID: AspxCommerce.utils.GetCustomerID(),
            SessionCode: AspxCommerce.utils.GetSessionCode()
        };
        return aspxCommonObj;
    }

    var ip = AspxCommerce.utils.GetClientIP();
    HeavyDiscountItems = {
        config: {
            isPostBack: false,
            async: true,
            cache: false,
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath(),
            method: "",
            url: "",
            ajaxCallMode: 0,
            itemId: 0
        },
        vars: {
            countCompareItems: 0
        },
        LoadHeavyDiscountRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#heavyDiscountItemRssImage').parent('a').show();
            $('#heavyDiscountItemRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=heavydiscountitems');
            $('#heavyDiscountItemRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#heavyDiscountItemRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Heavy Discount Rss Feed Title"));
            $('#heavyDiscountItemRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Heavy Discount Rss Feed Alt"));
        },
        Init: function() {
            //HeavyDiscountItems.GetDiscountSetting();
            $('#tblHeavyDiscountItems a img[title]').tipsy({ gravity: 'n' });
            if (enableHeavyDiscountItems.toLowerCase() == "false") {
                $("#divHeavyDiscount").remove();
            }
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            if (check < 0) {
                check = 0;
            }
            $('#btnHeavyDiscountViewMore').click(function() {
                check = check + parseInt(noOfHeavyDiscountItemShown);
                if (check < rowTotal) {
                    offset = parseInt(offset) + 1;
                    check = offset * noOfHeavyDiscountItemShown;
                    HeavyDiscountItems.GetHeavyDiscountItems();
                } else {
                    check = rowTotal;
                }
            });
            $('#btnViewPreviousHeavyDiscount').click(function() {
                if (check > 0) {
                    check = check - noOfHeavyDiscountItemShown;
                    if (offset > 1) {
                        offset = offset - 1;
                    }
                }
                if (check > 0) {
                    HeavyDiscountItems.GetHeavyDiscountItems();
                }
            });
            if (heavyDiscountItemRss) {
                HeavyDiscountItems.LoadHeavyDiscountRssImage();
            }
        },
        AjaxCall: function(config) {
            $.ajax({
                type: HeavyDiscountItems.config.type,
                contentType: HeavyDiscountItems.config.contentType,
                cache: HeavyDiscountItems.config.cache,
                async: HeavyDiscountItems.config.async,
                url: HeavyDiscountItems.config.url,
                data: HeavyDiscountItems.config.data,
                dataType: HeavyDiscountItems.config.dataType,
                success: HeavyDiscountItems.AjaxSuccess,
                error: HeavyDiscountItems.config.AjaxFailure
            });
        },
        GetHeavyDiscountItems: function() {
            var aspxCommonInfo = AspxCommonObj();
            delete aspxCommonInfo.SessionCode;
            delete aspxCommonInfo.CustomerID;
            this.config.method = "AspxCommerceWebService.asmx/GetHeavyDiscountItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo, offSet: offset, limit: parseInt(noOfHeavyDiscountItemShown) });
            this.config.ajaxCallMode = 1;
            this.AjaxCall(this.config);
        },

        AjaxSuccess: function(data) {
            switch (HeavyDiscountItems.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    HeavyDiscountItems.BindHeavyDiscountItems(data);
                    break;
                case 2:
                    HeavyDiscountItems.config.ajaxCallMode = 0;
                    if (data.d) {
                        csscody.alert('<h2>' + getLocale(AspxHeavyDiscount, 'Information Alert') + '</h2><p>' + getLocale(AspxHeavyDiscount, 'The selected item already exist in compare list.') + '</p>');
                        return false;
                    } else {
                        HeavyDiscountItems.AddToMyCompare();
                    }
                    break;
                case 3:
                    HeavyDiscountItems.vars.countCompareItems++;
                    HeavyDiscountItems.config.ajaxCallMode = 0;
                    csscody.info('<h2>' + getLocale(AspxHeavyDiscount, 'Information Message') + '</h2><p>' + getLocale(AspxHeavyDiscount, 'Item has been successfully added to compare list.') + '</p>');
                    if ($("#h2compareitems").length > 0) {
                        ItemsCompare.GetCompareItemList();
                    }
                    break;
                case 4:
                    if (data.data != true && data.d != false) {
                        HeavyDiscountItems.vars.countCompareItems = data.data;
                    }
                    break;
                case 5:
                    if (data.d) {

                        csscody.info('<h2>' + getLocale(AspxHeavyDiscount, 'Information Alert') + '</h2><p>' + getLocale(AspxHeavyDiscount, 'The selected item already exist in your wishlist.') + '</p>');
                    } else {

                        AspxCommerce.RootFunction.AddToWishListFromJS(HeavyDiscountItems.config.itemId, storeId, portalId, userName, ip, countryName); // AddToList ==> AddToWishList
                    }
                    break;
                case 6:
                    HeavyDiscountItems.config.ajaxCallMode = 0;
                    if (data.d.EnableModule == "True") {
                        HeavyDiscountItems.GetHeavyDiscountItems();
                    }
                    break;
            }
        },
        BindHeavyDiscountItems: function(msg) {
            var HeavyDisocountItemsContents = '';
            var rowTotal;
            $('#tblHeavyDiscountItems').html('');
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    rowTotal = item.RowTotal;
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        imagePath = defaultImagePath;
                    }
                    if (item.AlternateText == "") {
                        item.AlternateText = item.Name;
                    }
                    var hrefItem = aspxRedirectPath + "item/" + HeavyDiscountItems.fixedEncodeURIComponent(item.SKU) + pageExtension;
                    if ((index + 1) % eval(noOfHeavyDiscountItemShown) == 0) {
                        HeavyDisocountItemsContents += "<div class=\"cssClassProductsBox cssClassProductsBoxNoMargin\">";
                    } else {
                        HeavyDisocountItemsContents += "<div class=\"cssClassProductsBox\">";
                    }
                    var variantAddedSavingPercent = ((item.ListPrice * rate).toFixed(2) - (item.Price * rate).toFixed(2)) / (item.ListPrice * rate).toFixed(2) * 100;
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
                    HeavyDisocountItemsContents += '<div id="hproductImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + '  itemid="' + item.ItemID + '"><h2><a href="' + hrefItem + '" title="' + item.Name + '">' + name + '</a></h2><h3>' + item.SKU + '</h3><div class=\"cssClassYouSave\"><span class=\"spanSaving\"><b>' + Math.round(variantAddedSavingPercent) + '%</b>' + getLocale(AspxHeavyDiscount, "Off") + '</span></div>';
                    HeavyDisocountItemsContents += '<div class="cssClassProductPicture"><a href="' + hrefItem + '"><img alt="' + item.AlternateText + '"  title="' + item.AlternateText + '"  src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '"></a></div>';

                    if (!item.HidePrice) {
                        HeavyDisocountItemsContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + (item.ListPrice).toFixed(2) + ">" + (item.ListPrice * rate).toFixed(2) + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                    } else {
                        HeavyDisocountItemsContents += "<div class=\"cssClassProductPriceBox\"></div>";
                    }
                    HeavyDisocountItemsContents += '<div class="cssClassProductDetail"><p><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">Details</a></p></div>';
                    HeavyDisocountItemsContents += "<div class=\"sfButtonwrapper\">";


                    if (allowWishListHeavyDiscountItems.toLowerCase() == 'true') {

                        if (aspxCommonObj.CustomerID > 0 && userName.toLowerCase() != "anonymoususer") {
                            HeavyDisocountItemsContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='HeavyDiscountItems.CheckWishListUniqueness(" + item.ItemID + ");'><span><span><span>+</span>" + getLocale(AspxHeavyDiscount, "Wishlist") + "</span></span></button></div>";
                        } else {
                            HeavyDisocountItemsContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='AspxCommerce.RootFunction.Login();'><span><span><span>+</span>" + getLocale(AspxHeavyDiscount, "Wishlist") + "</span></span></button></div>";
                        }
                    }

                    if (allowAddToCompareHeavyDiscountItems.toLowerCase() == 'true') {
                        HeavyDisocountItemsContents += "<div class=\"cssClassCompareButton\"><button type=\"button\" id=\"btnAddCompare\" onclick='HeavyDiscountItems.AddItemsToCompare(" + item.ItemID + ");'><span><span><span>+</span>" + getLocale(AspxHeavyDiscount, "Compare") + "</span></span></button></div>";
                    }
                    HeavyDisocountItemsContents += '</div>';
                    HeavyDisocountItemsContents += "<div class=\"cssClassclear\"></div>";

                    var itemSKU = JSON2.stringify(item.SKU);
                    var itemName = JSON2.stringify(item.Name);


                    if (allowOutOfStockPurchase.toLowerCase() == 'false') {
                        if (item.IsOutOfStock) {
                            HeavyDisocountItemsContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxHeavyDiscount, "Out Of Stock") + "</span></button></div></div>";
                        } else {
                            HeavyDisocountItemsContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\"  title=" + itemName + "  onclick='HeavyDiscountItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span><span>" + getLocale(AspxHeavyDiscount, "Add To Cart") + "</span></span></button></div></div>";
                        }
                    } else {
                        HeavyDisocountItemsContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\"  title=" + itemName + "  onclick='HeavyDiscountItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span><span>" + getLocale(AspxHeavyDiscount, "Add To Cart") + "</span></span></button></div></div>";
                    }
                    HeavyDisocountItemsContents += "</div></div>";

                });
                if (rowTotal > noOfHeavyDiscountItemShown) {
                    HeavyDisocountItemsContents += '<div id="divViewMoreExplored" class="cssViewMore"><a href="' + aspxRedirectPath + 'Detail-View' + pageExtension + '?id=heavy">' + getLocale(AspxHeavyDiscount, "View More") + '</a></div>';
                }
            } else {
                HeavyDisocountItemsContents += "<span class=\"cssClassNotFound\">" + getLocale(AspxHeavyDiscount, 'This store has no items listed yet!') + "</span>";
            }
            //$('#divHeavyDiscountHeader').html('');
            $('#heavyDiscontHeader').html(getLocale(AspxHeavyDiscount, "Heavy Discount"));
            $('#tblHeavyDiscountItems').html(HeavyDisocountItemsContents);
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },
        AjaxFailure: function() {
            csscody.error('<h2>' + getLocale(AspxHeavyDiscount, 'Error Message') + '</h2><p>' + getLocale(AspxHeavyDiscount, 'Sorry, Error occured!') + '</p>');
        },

        CheckWishListUniqueness: function(itemID, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                var aspxCommonInfo = AspxCommonObj();
                delete aspxCommonInfo.CultureName;
                delete aspxCommonInfo.SessionCode;
                delete aspxCommonInfo.CustomerID;
                this.config.itemid = itemID;
                var checkparam = { ID: itemID, aspxCommonObj: aspxCommonInfo, costVariantValueIDs: costVariantValueIDs };
                var checkdata = JSON2.stringify(checkparam);
                this.config.method = "AspxCommerceWebService.asmx/CheckWishItems",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = checkdata;
                this.config.ajaxCallMode = 5;
            }
        },
        AddItemsToCompare: function(itemId, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                LatestItems.vars.countCompareItems = itemCompareCount;
                LatestItems.config.itemid = itemId;
                LatestItems.GetCompareItemsCount();
                if (LatestItems.vars.countCompareItems >= parseInt(maxCompareItemCount)) {
                    csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'More than ') + '' + maxCompareItemCount + getLocale(AspxLatestItem, ' items are not allowed to add in compare list!') + '</p>');
                    ItemsCompare.GetCompareItemList();
                    return false;
                }
                var aspxCommonInfo = AspxCommonObj();
                delete aspxCommonInfo.CultureName;
                delete aspxCommonInfo.UserName;
                var costVariantIds = '0';
                this.config.method = "AspxCommerceWebService.asmx/CheckCompareItems";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ ID: itemId, aspxCommonObj: aspxCommonInfo, costVariantValueIDs: costVariantIds });
                this.config.ajaxCallMode = 2;
                return false;
            }
        },

        GetCompareItemsCount: function() {
            var aspxCommonInfo = AspxCommonObj();
            delete aspxCommonInfo.CultureName;
            delete aspxCommonInfo.CustomerID;
            this.config.method = "AspxCommerceWebService.asmx/GetCompareItemsCount";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 4;
            this.ajaxCall(this.config);
        },

        AddToMyCompare: function() {
            var aspxCommonInfo = AspxCommonObj();
            delete aspxCommonInfo.CustomerID;
            var costVariantIds = '0';
            this.config.method = "AspxCommerceWebService.asmx/SaveCompareItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ ID: LatestItems.config.itemid, IP: ip, countryName: countryName, costVariantValueIDs: costVariantIds, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 3;
            this.config.async = false;
            this.ajaxCall(this.config);
        },
        fixedEncodeURIComponent: function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
        },
        AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
            }
        },
        GetDiscountSetting: function() {
            var aspxCommonInfo = AspxCommonObj();
            delete aspxCommonInfo.SessionCode;
            delete aspxCommonInfo.CustomerID;
            delete aspxCommonInfo.UserName;
            this.config.method = "AspxCommerceWebService.asmx/GetHeavyDiscountSetting";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 6;
            this.config.async = false;
            this.AjaxCall(this.config);
        }
    };
    HeavyDiscountItems.Init();
});
