//<![CDATA[
var AspxCommerce = {};
$(function() {
    AspxCommerce = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath,
            method: "",
            url: "",
            ajaxCallMode: 0

        },

        vars: {
            IsAlive: true
        },

        ajaxCall: function(config) {
            $.ajax({
                type: AspxCommerce.config.type,
                contentType: AspxCommerce.config.contentType,
                cache: AspxCommerce.config.cache,
                async: AspxCommerce.config.async,
                url: AspxCommerce.config.url,
                data: AspxCommerce.config.data,
                dataType: AspxCommerce.config.dataType,
                success: AspxCommerce.ajaxSuccess,
                error: AspxCommerce.ajaxFailure
            });
        },

        utils: {
            GetStoreID: function() {
                return storeID;
            },
            GetPortalID: function() {
                return portalID;
            },
            GetUserName: function() {
                return userName;
            },
            GetCultureName: function() {
                return cultureName;
            },
            GetCustomerID: function() {
                return customerID;
            },
            GetTemplateName: function() {
                return templateName;
            },
            IsUserFriendlyUrl: function() {
                return Boolean.parse(IsUseFriendlyUrls);
            },
            GetSessionCode: function() {
                return sessionCode;
            },
            GetClientIP: function() {
                return clientIPAddress;
            },
            GetAspxServicePath: function() {
                return aspxservicePath;
            },
            GetAspxRedirectPath: function() {
                return aspxRedirectPath;
            },
            GetAspxRootPath: function() {
                return aspxRootPath;
            },
            GetAspxTemplateFolderPath: function() {
                return aspxTemplateFolderPath;
            }
            ,
            GetAspxClientCoutry: function() {
                return aspxCountryName;
            }
        },

        AspxCommonObj: function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName(),
                SessionCode: AspxCommerce.utils.GetSessionCode(),
                CutomerID: AspxCommerce.utils.GetCustomerID()
            };
            return aspxCommonInfo;
        },
        CheckSessionActive: function(aspxCommonObj) {
            AspxCommerce.config.url = AspxCommerce.config.baseURL + "AspxCommerceWebService.asmx/CheckSessionActive";
            AspxCommerce.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            AspxCommerce.config.ajaxCallMode = 1;
            AspxCommerce.ajaxCall(AspxCommerce.config);
        },
        GetUrlVars: function() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                vars[key] = value;
            });
            return vars;
        },
        RootFunction: {
            BindRecentlyComparedItem: function(response, index) {
                var RecentlyComparedItems = '';
                if (index % 2 == 0) {
                    RecentlyComparedItems = '<tr class="sfEven"><td><a href="' + aspxRedirectPath + 'item/' + response.SKU + pageExtension + '">' + response.ItemName + '</a></td></tr>';
                }
                else {
                    RecentlyComparedItems = '<tr class="sfOdd"><td><a href="' + aspxRedirectPath + 'item/' + response.SKU + pageExtension + '">' + response.ItemName + '</a></td></tr>';
                }
                $("#tblRecentlyComparedItemList>tbody").append(RecentlyComparedItems);
            },

            GetRecentlyComparedItemList: function(storeId, portalId, userName, cultureName, aspxRootPath, CompareCount) {
                var aspxCommonInfo = AspxCommerce.AspxCommonObj();
                delete aspxCommonInfo.UserName;
                delete aspxCommonInfo.SessionCode;
                delete aspxCommonInfo.CutomerID;
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/GetRecentlyComparedItemList",
                    data: JSON2.stringify({ count: CompareCount, aspxCommonObj: aspxCommonInfo }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        $("#tblRecentlyComparedItemList>tbody").html('');
                        if (msg.d.length > 0) {
                            $.each(msg.d, function(index, item) {
                                AspxCommerce.RootFunction.BindRecentlyComparedItem(item, index);
                            });
                        }
                        else {
                            $("#tblRecentlyComparedItemList>tbody").html("<tr><td><span class=\"cssClassNotFound\">" + getLocale(CoreJsLanguage, "No items in recent compare list!") + "</span></tr></td>");
                        }
                    },
                    error: function(msg) {
                        csscody.error('<h2>' + getLocale(CoreJsLanguage, "Error Message") + '</h2><p>' + getLocale(CoreJsLanguage, 'Failed to add item in compare list!') + '</p>');
                    }
                });
            },

            Login: function(returnUrl) {
                //                if (returnUrl == "" || returnUrl == null) {
                //                    window.location.href = AspxCommerce.utils.GetAspxRootPath() + LogInURL + '.aspx';
                //                    return false;
                //                }
                //                else {
                returnUrl = window.location.href;
                window.location.href = AspxCommerce.utils.GetAspxRootPath() + LogInURL + pageExtension + '?' + "ReturnUrl=" + returnUrl;
                return false;
                // }
            },

            AddToWishList: function(itemID, costVariantValueIDs, itemSKU) {
                if (AspxCommerce.utils.GetUserName().toLowerCase() != 'anonymoususer') {
                    if (costVariantValueIDs == 'yes') {
                        AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                    } else {
                        var aspxCommonInfo = AspxCommerce.AspxCommonObj();
                        delete aspxCommonInfo.CultureName;
                        delete aspxCommonInfo.SessionCode;
                        delete aspxCommonInfo.CutomerID;
                        var checkparam = { ID: itemID, costVariantValueIDs: costVariantValueIDs, aspxCommonObj: aspxCommonInfo };
                        var checkdata = JSON2.stringify(checkparam);
                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/CheckWishItems",
                            data: checkdata,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                if (msg.d) {
                                    csscody.alert('<h2>' + getLocale(CoreJsLanguage, "Information Alert") + '</h2><p>' + getLocale(CoreJsLanguage, "The selected item already exist in wishlist.") + '</p>');
                                } else {
                                    AspxCommerce.RootFunction.AddToWishListFromJS(itemID, AspxCommerce.utils.GetClientIP(), AspxCommerce.utils.GetAspxClientCoutry(), costVariantValueIDs);
                                }
                            },
                            error: function(msg) {
                                csscody.error('<h2>' + getLocale(CoreJsLanguage, "Error Message") + '</h2><p>' + getLocale(CoreJsLanguage, "Failed to add item in wishlist!") + '</p>');
                            }
                        });
                    }
                }
                else {
                    AspxCommerce.RootFunction.Login(window.location.href);
                }
            },

            AddToCartToJSFromTemplate: function(itemId, itemPrice, itemSKU, itemQuantity) {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
            },

            AddToWishListFromJS: function(itemID, ip, countryName, costVariantValueIDs) {
                var aspxCommonInfo = AspxCommerce.AspxCommonObj();
                delete aspxCommonInfo.CultureName;
                delete aspxCommonInfo.SessionCode;
                delete aspxCommonInfo.CutomerID;
                var saveWishList = {
                    ItemID: itemID,
                    CostVariantValueIDs: costVariantValueIDs,
                    IP: ip,
                    CountryName: countryName
                };
                //   var addparam = { ID: itemID, IP: ip, countryName: countryName, costVariantValueIDs: costVariantValueIDs, aspxCommonObj: aspxCommonInfo };
                var addparam = { saveWishListInfo: saveWishList, aspxCommonObj: aspxCommonInfo };
                var adddata = JSON2.stringify(addparam);
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/SaveWishItems",
                    data: adddata,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        //MyWishList();
                        if ($('#lnkMyWishlist').length > 0) {
                            //IncreaseWishListCount(); // for header counter increase                            
                            HeaderControl.GetWishListCount(); // for header wish counter increase for database
                        }
                        if ($('#divRecentlyAddedWishList').length > 0) {
                            WishItems.BindMyWishList(); //for wishlist item in rightside
                        }
                        csscody.info('<h2>' + getLocale(CoreJsLanguage, "Successful Message") + '</h2><p>' + getLocale(CoreJsLanguage, "Item has been successfully added to wishlist.") + '</p>');
                    },
                    error: function(msg) {
                        csscody.error('<h2>' + getLocale(CoreJsLanguage, "Error Message") + '</h2><p>' + getLocale(CoreJsLanguage, "Failed to add item in wishlist!") + '</p>');
                    }
                });
            },

            IncreaseWishListCount: function() {
                var wishListCount = $('#lnkMyWishlist span').html().replace(/[^0-9]/gi, '');
                wishListCount = parseInt(wishListCount) + 1;
                $('.cssClassLoginStatusInfo ul li a#lnkMyWishlist span').html(" [" + wishListCount + "]");
            }
  ,
            AddToCartFromJS: function(itemId, itemPrice, itemSKU, itemQuantity) {
                //alert("from core Js");
                var param = { itemID: itemId, itemPrice: itemPrice, itemQuantity: itemQuantity, aspxCommonObj: AspxCommerce.AspxCommonObj() };
                var data = JSON2.stringify(param);
                var myCartUrl;
                var addToCartProperties = {
                    onComplete: function(e) {
                        if (e) {
                            if (AspxCommerce.utils.IsUserFriendlyUrl) {
                                myCartUrl = myCartURL + pageExtension;
                            } else {
                                myCartUrl = myCartURL;
                            }
                            window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + myCartUrl;
                        }
                    }
                };
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/AddItemstoCart",
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        if (msg.d == 1) {
                            AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                        } else if (msg.d == 2) {
                            //out of stock
                            csscody.alert('<h2>' + getLocale(CoreJsLanguage, "Information Alert") + '</h2><p>' + getLocale(CoreJsLanguage, "This product is currently out of stock!.") + '</p>');
                            HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                            ShopingBag.GetCartItemCount(); //for shopping bag counter from database
                            //  IncreaseShoppingBagCount(); // for shopping bag counter from static
                            ShopingBag.GetCartItemListDetails(); //for details in shopping bag
                            if ($("#divCartDetails").length > 0) {
                                AspxCart.GetUserCartDetails(); //for binding mycart's tblCartList
                            }
                            if ($("#divLatestItems").length > 0) {
                                LatestItems.GetLatestItems();
                            }
                            if ($("#divLatestBookItems").length > 0) {
                                LatestItemAnimation.GetLatestBookItem();
                            }
                            if ($('#divlatestItemsList').length > 0) {
                                LatestItemsList.GetLatestItems(1, $('#ddlLatestPageSize').val(), 0, $("#ddlLatestSortBy option:selected").val());
                            }
                            if ($("#divShowCategoryItemsList").length > 0) {
                                categoryDetails.LoadAllCategoryContents(1, parseInt($("#ddlPageSize").val()), 0, $("#ddlSortBy option:selected").val());
                            }
                            if ($("#divYouMayAlsoLike").length > 0) {
                                ItemDetail.GetYouMayAlsoLikeItemsList();
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
                            if ($("#divRelatedItems").length > 0) {
                                YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
                            }

                        } else {
                            /////////////////////******Fly To basket****///////////////////
                            if ($("#divMiniShoppingCart1").offset() != null) {
                                $("#CartItemLoader").html('<img src="./Modules/ShoppingCart/image/loader.gif">');
                                var basketX = '';
                                var basketY = '';
                                var Itemid = "productImageWrapID_" + itemId;
                                var productIDValSplitter = $((Itemid).split("_"));
                                var productIDVal = productIDValSplitter[1];
                                var productX = $("#productImageWrapID_" + productIDVal).offset().left;
                                var productY = $("#productImageWrapID_" + productIDVal).offset().top;
                                if ($("#productID_" + productIDVal).length > 0) {
                                    basketX = $("#productID_" + productIDVal).offset().left;
                                    basketY = $("#productID_" + productIDVal).offset().top;
                                } else {
                                    basketX = $("#divMiniShoppingCart1").offset().left;
                                    basketY = $("#divMiniShoppingCart1").offset().top;
                                }
                                var gotoX = basketX - productX;
                                var gotoY = basketY - productY;

                                var newImageWidth = $("#productImageWrapID_" + productIDVal).width() / 5;
                                var newImageHeight = $("#productImageWrapID_" + productIDVal).height() / 5;

                                $("#productImageWrapID_" + productIDVal + " img")
                                    .clone()
                                    .prependTo("#productImageWrapID_" + productIDVal)
                                    .css({ 'position': 'absolute' })
                                    .animate({ opacity: 0.4 }, 50)
                                    .animate({
                                        opacity: 0.4,
                                        marginLeft: gotoX,
                                        marginTop: gotoY,
                                        width: newImageWidth,
                                        height: newImageHeight
                                    }, 1500, function() {
                                        $(this).remove();

                                        //TODO:: Add jQuery Counter increament HERE :: done
                                        //  IncreaseMyCartItemCount(); //for header cart count
                                        HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                                        if ($("#cartItemCount").offset() != null) {
                                            ShopingBag.GetCartItemCount(); //for shopping bag counter from database
                                            //  IncreaseShoppingBagCount(); // for shopping bag counter from static
                                            ShopingBag.GetCartItemListDetails(); //for details in shopping bag
                                        }

                                        if ($("#divMiniShoppingCart1").offset() != null) {
                                            ShoppingCartFlyOver.GetCartItemCount();
                                            ShoppingCartFlyOver.GetCartItemListDetails();
                                        }
                                        if ($("#divCartDetails").length > 0) {
                                            AspxCart.GetUserCartDetails(); //for binding mycart's tblCartList
                                        }
                                        if ($("#divLatestItems").length > 0) {
                                            LatestItems.GetLatestItems();
                                        }

                                        if ($("#divLatestBookItems").length > 0) {
                                            LatestItemAnimation.GetLatestBookItem();
                                        }

                                        if ($('#divlatestItemsList').length > 0) {
                                            LatestItemsList.GetLatestItems(1, $('#ddlLatestPageSize').val(), 0, $("#ddlLatestSortBy option:selected").val());
                                        }
                                        if ($("#divShowCategoryItemsList").length > 0) {
                                            categoryDetails.LoadAllCategoryContents(1, parseInt($("#ddlPageSize").val()), 0, $("#ddlSortBy option:selected").val());
                                        }
                                        if ($("#divYouMayAlsoLike").length > 0) {
                                            ItemDetail.GetYouMayAlsoLikeItemsList();
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
                                        if ($("#divRelatedItems").length > 0) {
                                            YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
                                        }
                                        if ($("#productID_" + productIDVal).length > 0) {
                                            $("#productID_" + productIDVal).animate({ opacity: 0 }, 100);
                                            $("#productID_" + productIDVal).animate({ opacity: 0 }, 100);
                                            $("#productID_" + productIDVal).animate({ opacity: 1 }, 100);
                                            $("#CartItemLoader").empty();

                                        } else {
                                            $("#tblCartListItems tr:last").hide();
                                            $("#tblCartListItems tr:last").show("slow");
                                            $("#CartItemLoader").empty();
                                        }
                                    });
                                csscody.addToCart('<h2>' + getLocale(CoreJsLanguage, "Successful Message") + '</h2><p>' + getLocale(CoreJsLanguage, "Item has been successfully added to cart.") + '</p>', addToCartProperties);
                            } else {
                                csscody.addToCart('<h2>' + getLocale(CoreJsLanguage, "Successful Message") + '</h2><p>' + getLocale(CoreJsLanguage, "Item has been successfully added to cart.") + '</p>', addToCartProperties);
                                //TODO:: Add jQuery Counter increament HERE :: done
                                //  IncreaseMyCartItemCount(); //for header cart count
                                HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                                ShopingBag.GetCartItemCount(); //for shopping bag counter from database
                                //  IncreaseShoppingBagCount(); // for shopping bag counter from static
                                ShopingBag.GetCartItemListDetails(); //for details in shopping bag
                                if ($("#divCartDetails").length > 0) {
                                    AspxCart.GetUserCartDetails(); //for binding mycart's tblCartList
                                }
                                if ($("#divLatestItems").length > 0) {
                                    LatestItems.GetLatestItems();
                                }
                                if ($("#divLatestBookItems").length > 0) {
                                    LatestItemAnimation.GetLatestBookItem();
                                }
                                if ($('#divlatestItemsList').length > 0) {
                                    LatestItemsList.GetLatestItems(1, $('#ddlLatestPageSize').val(), 0, $("#ddlLatestSortBy option:selected").val());
                                }
                                if ($("#divShowCategoryItemsList").length > 0) {
                                    categoryDetails.LoadAllCategoryContents(1, parseInt($("#ddlPageSize").val()), 0, $("#ddlSortBy option:selected").val());
                                }
                                if ($("#divYouMayAlsoLike").length > 0) {
                                    ItemDetail.GetYouMayAlsoLikeItemsList();
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
                                if ($("#divRelatedItems").length > 0) {
                                    YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
                                }
                            }
                        }
                    }
                });
            },

            RedirectToItemDetails: function(itemSKU) {
                window.location.href = aspxRedirectPath + 'item/' + itemSKU + pageExtension;
                return false;
            }

        },

        ajaxSuccess: function(data) {
            switch (AspxCommerce.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    AspxCommerce.vars.IsAlive = data.d;
                    break;
            }
        },

        init: function() {

            //  $('body').append('<div id="ajaxBusy"><div id="dialog" style="background-color:#AAAAAA; position:absolute;left:50%;top:50%;display:none;z-index:9999;" >Please Wait...<br /><img src="' + AspxCommerce.utils.GetAspxRootPath() + 'Templates/Default/images/progress_bar.gif" alt="" title="Loading"/></div><div id="mask" style=" position:absolute;left:0;top:0;z-index:9000;background-color:#000;display:none;"></div></div>');


        }
    };
    AspxCommerce.init();

});

//]]>

function fixedEncodeURIComponent(str) {
    // return encodeURIComponent(str).replace( /!/g , '%21').replace( /'/g , '%27').replace( /\(/g , '%28').replace( /\)/g , '%29').replace( /-/g , '_').replace( /\*/g , '%2A').replace( /%26/g , 'ampersand').replace( /%20/g , '-');

    var Results = encodeURIComponent(str);
    // Results = Results.Replace("%", "%25");
    Results = Results.replace("!", "%21");
    Results = Results.replace("'", "%27");
    Results = Results.replace("(", "%28");
    Results = Results.replace(")", "%29");
    Results = Results.replace("*", "%2A");

    Results = Results.replace("<", "%3C");
    Results = Results.replace(">", "%3E");
    Results = Results.replace("#", "%23");
    Results = Results.replace("{", "%7B");
    Results = Results.replace("}", "%7D");
    Results = Results.replace("|", "%7C");
    Results = Results.replace("\"", "%5C");
    Results = Results.replace("^", "%5E");
    Results = Results.replace("~", "%7E");
    Results = Results.replace("[", "%5B");
    Results = Results.replace("]", "%5D");
    Results = Results.replace("`", "%60");
    Results = Results.replace(";", "%3B");
    Results = Results.replace("/", "%2F");
    Results = Results.replace("?", "%3F");
    Results = Results.replace(":", "%3A");
    Results = Results.replace("@", "%40");
    Results = Results.replace("=", "%3D");
    Results = Results.replace("&", "%26");
    Results = Results.replace("%26", "ampersand");
    Results = Results.replace("$", "%24");
    return Results;
}

function fixedDecodeURIComponent(str) {
    var Results = str;
    // Results = Results.Replace("%25","%");
    Results = Results.replace("%21", "!");
    Results = Results.replace("%27", "'");
    Results = Results.replace("%28", "(");
    Results = Results.replace("%29", ")");
    Results = Results.replace("%2A", "*");


    Results = Results.replace("%3C", "<");
    Results = Results.replace("%3E", ">");
    Results = Results.replace("%23", "#");
    Results = Results.replace("%7B", "{");
    Results = Results.replace("%7D", "}");
    Results = Results.replace("%7C", "|");
    Results = Results.replace("%5C", "\"");
    Results = Results.replace("%5E", "^");
    Results = Results.replace("%7E", "~");
    Results = Results.replace("%5B", "[");
    Results = Results.replace("%5D", "]");
    Results = Results.replace("%60", "`");
    Results = Results.replace("%3B", ";");
    Results = Results.replace("%2F", "/");
    Results = Results.replace("%3F", "?");
    Results = Results.replace("%3A", ":");
    Results = Results.replace("%40", "@");
    Results = Results.replace("%3D", "=");
    Results = Results.replace("ampersand", "%26");
    Results = Results.replace("%26", "&");
    Results = Results.replace("%24", "$");
    return Results;
}

////////////////////Added BY Niranjan ? Modified By Santosh//////////

function GetSystemLocale(text) {
    return SystemLocale[$.trim(text)] == undefined ? text : SystemLocale[$.trim(text)];
}

function getLocale(moduleKey, text) {
    return moduleKey[$.trim(text)] == undefined ? text : moduleKey[$.trim(text)];
}
$.fn.SystemLocalize = function() {
    return this.each(function() {

        var t = $(this);
        if (t.is("input:button")) {
            var text = t.attr("value");
            var localeValue = SystemLocale[$.trim(text)];
            t.attr("value", localeValue);
        }
        else {
            t.html(SystemLocale[$.trim(t.text())] == undefined ? $.trim(t.text()) : SystemLocale[$.trim(t.text())]);
        }
    }); return false;
};

$.fn.localize = function(p) {
    return this.each(function() {
        var t = $(this);
        // if (t.is("a") || t.is("span") || t.is("p") || t.is("div") || t.is("label") || t.is("h1") || t.is("h2") || t.is("h3") || t.is("h4") || t.is("h5") || t.is("h6")) {
        //  alert(p.moduleKey[t.html()]);
        //t.html(p.moduleKey[t.html().replace(/^\s+|\s+$/g,"")] == undefined ? t.html().replace(/^\s+|\s+$/g,"") : p.moduleKey[t.html().replace(/^\s+|\s+$/g,"")]);
        //   }
        t.html(p.moduleKey[t.html().replace(/^\s+|\s+$/g, "")] == undefined ? t.html().replace(/^\s+|\s+$/g, "") : p.moduleKey[t.html().replace(/^\s+|\s+$/g, "")]);
        if (t.is("input[type='button']")) {
            t.val(p.moduleKey[t.attr("value")] == undefined ? t.attr("value") : p.moduleKey[t.attr("value")]);
        }
    });
};

