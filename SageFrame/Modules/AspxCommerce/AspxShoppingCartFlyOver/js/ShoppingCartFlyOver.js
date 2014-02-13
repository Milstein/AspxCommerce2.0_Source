var ShoppingCartFlyOver = "";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName(),
        CustomerID: AspxCommerce.utils.GetCustomerID(),
        SessionCode: AspxCommerce.utils.GetSessionCode()
    };
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var itemCostVariantData = '';
    var TotalPrice = 0;
    findPos = function(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            curleft = obj.offsetLeft;
            curtop = obj.offsetTop;
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
        }
        return [curleft, curtop];
    };

    ShoppingCartFlyOver = {
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
            url: ""
        },

        init: function() {
            ShoppingCartFlyOver.showShoppingCart();
            ShoppingCartFlyOver.LoadAllImages();
            $(document).ready(function() {
                $("#tblCartListItems tr:even").addClass("sfEven");
                $("#tblCartListItems tr:odd").addClass("sfOdd");
                if (ModuleCollapsible.toLowerCase() == 'true') {
                    $(".cssClassMiniShoppingCartHeader").addClass("sfCollapsible");
                    $(".cssClassMiniShoppingCartHeader").live('click', function() {
                        $(".cssClassMiniShoppingCartWrapper").slideToggle('fast');
                    });
                }
            });
            $("#divMiniShoppingCart1").show();
            if (showMiniShopCart.toLowerCase() == 'true') {
                //ShoppingCartFlyOver.GetCartItemCount();
                if (cartItemCount > 0) {
                    $("#fullShoppingCartBag").show();
                    $("#emptyShoppingCartBag").hide();
                    $("#divShoppingCart").show();
                    $("#divMiniShoppingCart1").html('');
                    $("#h2myshoppingCart").html('<span class="cssClassMyShoppingCart">' + getLocale(AspxShoppingCartFlyOver, "My Cart") + ' [ ' + cartItemCount + ' ]<img id="fullShoppingCartBag" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_full.png" width="32" height="32" alt="Shopping Basket" title="Shopping Basket" align="right" /></span>');
                } else {
                    $("#fullShoppingCartBag").hide();
                    $("#emptyShoppingCartBag").show();
                    $("#divShoppingCart").hide();
                    // $("#cartBagItemCount").html("[ <b>Your cart is empty!</b> ]");
                    $("#divMiniShoppingCart1").append("<p><span id=\"cartBagItemCount\" class=\"cssClassNotFound\">[ <b>" + getLocale(AspxShoppingCartFlyOver, "Your cart is empty!") + "</b> ]</span><span id=\"CartItemLoader\"></span></p>");
                    $("#h2myshoppingCart").html('<span class="cssClassMyShoppingCart">' + getLocale(AspxShoppingCartFlyOver, "My Cart") + '<img id="emptyShoppingCartBag" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_empty.png" width="25" height="25" alt="Shopping Basket" title="Shopping Basket" align="right" /></span>');
                }
                $("#divMiniShoppingCart").show();
            }
            if (userFriendlyURL) {
                $("#lnkViewShoppingCart").attr("href", AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURL + pageExtension);
            } else {
                $("#lnkViewShoppingCart").attr("href", AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURL);
            }

            $("#lnkMiniShoppingCheckOut").click(function() {
                $(".cssClassCheckOut a").click();
            });
            $(".cssClassClose").bind("click", function() {
                $('#fade, #popuprel4').fadeOut();
            });
        },

        ajaxCall: function(config) {
            $.ajax({
                type: ShoppingCartFlyOver.config.type,
                contentType: ShoppingCartFlyOver.config.contentType,
                cache: ShoppingCartFlyOver.config.cache,
                async: ShoppingCartFlyOver.config.async,
                url: ShoppingCartFlyOver.config.url,
                data: ShoppingCartFlyOver.config.data,
                dataType: ShoppingCartFlyOver.config.dataType,
                success: ShoppingCartFlyOver.ajaxSuccess,
                error: ShoppingCartFlyOver.ajaxFailure
            });
        },

        ajaxSuccess: function(data) {
            switch (ShoppingCartFlyOver.config.ajaxCallMode) {
                case 1:
                    ShoppingCartFlyOver.vars.totalPrice = data.d;
                    break;
                case 2:
                    if (data.d) {
                        $("#fullShoppingCartBag").show();
                        $("#emptyShoppingCartBag").hide();
                        $("#divShoppingCart").show();
                        //$("#cartBagItemCount").html('');
                        $("#h2myshoppingCart").html('<span class="cssClassMyShoppingCart">' + getLocale(AspxShoppingCartFlyOver, "My Cart") + ' [ ' + data.d + ' ]<img id="fullShoppingCartBag" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_full.png" width="32" height="32" alt="Shopping Basket" title="Shopping Basket" align="right" /></span>');
                    } else {
                        $("#fullShoppingCartBag").hide();
                        $("#emptyShoppingCartBag").show();
                        $("#divShoppingCart").hide();
                        // $("#cartBagItemCount").html("[ <b>Your cart is empty!</b> ]");
                        $("#h2myshoppingCart").html('<span class="cssClassMyShoppingCart">' + getLocale(AspxShoppingCartFlyOver, "My Cart") + '<img id="emptyShoppingCartBag" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_empty.png" width="25" height="25" alt="Shopping Basket" title="Shopping Basket" align="right" /></span>');
                    }
                    break;
                case 3:
                    $("#tblCartListItems").html('');
                    if (data.d.length > 0) {
                        $("#divMiniShoppingCart1").html('');
                        TotalPrice = 0;
                        $.each(data.d, function(index, item) {
                            TotalPrice += item.TotalItemCost;
                            ShoppingCartFlyOver.BindCartItemslist(item, index);
                        });
                        $('#tblCartListItems').append('<tr id="Product_total"><td colspan="4"><span class="cssClassTotalPrice">' + getLocale(AspxShoppingCartFlyOver, "Total :") + ' </span><span class="cssClassFormatCurrency">' + TotalPrice * rate + '</span></td></tr>');
                        $("#tblCartListItems tr:even").addClass("sfEven");
                        $("#tblCartListItems tr:odd").addClass("sfOdd");
                        $("a").bind("click", function(e) {
                            if ($(this).attr("costvariants") != null) {
                                itemCostVariantData = $(this).attr("costvariants");
                                $.session("ItemCostVariantData", 'empty');
                                $.session("ItemCostVariantData", itemCostVariantData);
                            }
                        });
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                        $(".imgCartItemListDelete").bind("click", function() {
                            var cartId = parseInt($(this).attr("id").replace(/[^0-9]/gi, ''));
                            var cartItemId = parseInt($(this).attr("name").replace(/[^0-9]/gi, ''));
                            var properties = {
                                onComplete: function(e) { //
                                    if ($("#cartItemCount").offset() != null) {
                                        ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                                        ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                                    } else {
                                        ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                                    }
                                    ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);

                                }
                            };
                            csscody.confirm("<h1>" + getLocale(AspxShoppingCartFlyOver, 'Delete Confirmation') + "</h1><p>" + getLocale(AspxShoppingCartFlyOver, 'Do you want to delete this item from your cart list?') + "</p>", properties);
                        });
                    } else {
                        $("#divMiniShoppingCart1").html('');
                        $("#divMiniShoppingCart1").append("<p><span id=\"cartBagItemCount\" class=\"cssClassNotFound\">[ <b>" + getLocale(AspxShoppingCartFlyOver, "Your cart is empty!") + "</b> ]</span><span id=\"CartItemLoader\"></span></p>");

                    }
                    break;
                case 4:
                    if ($("#cartItemCount").offset() != null) {
                        ShoppingCartFlyOver.GetCartItemCount();
                        ShoppingCartFlyOver.GetCartItemListDetails();
                    }
                    ShoppingCartFlyOver.GetCartItemCount(); //for bag count                   
                    ShoppingCartFlyOver.GetCartItemListDetails(); //for shopping bag detail

                    //For my Cart Link Header
                    if ($("#lnkMyCart").length > 0) {
                        HeaderControl.GetCartItemTotalCount();
                    }
                    ShopingBag.GetCartItemCount();
                    if ($('#divCartDetails').length > 0) {
                        AspxCart.GetUserCartDetails(); //for my cart's tblitemList table
                    }
                    if ($("#divLatestItems").length > 0) {
                        LatestItems.GetLatestItems();
                    }
                    if ($("#divShowCategoryItemsList").length > 0) {
                        categoryDetails.LoadAllCategoryContents(1, parseInt($("#ddlPageSize").val()), 0, $("#ddlSortBy").val());
                    }
                    //                    if ($("#divYouMayAlsoLike").length > 0) {
                    //                        GetYouMayAlsoLikeItemsList();
                    //                    }
                    if ($("#divShowSimpleSearchResult").length > 0) {
                        ItemList.BindSimpleSearchResultItems(1, $("#ddlSimpleSearchPageSize").val(), 0, $("#ddlSimpleSortBy").val());
                    }
                    if ($("#divOptionsSearchResult").length > 0) {
                        ItemList.BindShoppingOptionResultItems(1, $('#ddlOptionPageSize').val(), 0, $("#ddlOptionSortBy").val());
                    }
                    if ($("#divShowTagItemResult").length > 0) {
                        var items_per_page = $('#ddlTagItemPageSize').val();
                        ViewTagItem.ListTagsItems(1, items_per_page, 0, $("#ddlSortTagItemBy").val());
                    }
                    if ($("#divShowAdvanceSearchResult").length > 0) {
                        AdvanceSearch.ShowSearchResult(1, $('#ddlPageSize').val(), 0, $("#ddlAdvanceSearchSortBy").val());
                    }
                    if ($("#divWishListContent").length > 0) {
                        WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val());
                    }
                    if ($("#divRelatedItems").length > 0) {
                        GetItemRetatedUpSellAndCrossSellList();
                    }

                    if ($("#dynItemDetailsForm").length > 0) {
                        BindItemBasicByitemSKU(itemSKU);
                    }
                    return false;
                    break;
                case 5:
                    break;
            }
        },
        ajaxFailure: function() {
            switch (ShoppingCartFlyOver.config.error) {
            }
        },
        LoadAllImages: function() {
            $('#fullShoppingCartBag').attr('src', '' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_full.png');
            $("#emptyShoppingCartBag").attr('src', '' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_empty.png');
        },
        GetCartItemCount: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.method = "AspxCommerceWebService.asmx/GetCartItemsCount";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);

        },
        showShoppingCart: function() {

            //ShoppingCartFlyOver.GetCartItemListDetails();
            TotalPrice = totalPrc;
            $("#tblCartListItems").find("a").bind("click", function(e) {
                if ($(this).attr("costvariants") != null) {
                    itemCostVariantData = $(this).attr("costvariants");
                    $.session("ItemCostVariantData", 'empty');
                    $.session("ItemCostVariantData", itemCostVariantData);
                }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            $(".imgCartItemListDelete").bind("click", function() {
                var cartId = parseInt($(this).attr("id").replace(/[^0-9]/gi, ''));
                var cartItemId = parseInt($(this).attr("name").replace(/[^0-9]/gi, ''));
                var properties = {
                    onComplete: function(e) { //
                        if ($("#cartItemCount").offset() != null) {
                            ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                            ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                        } else {
                            ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                        }
                        ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);

                    }
                };
                csscody.confirm("<h1>" + getLocale(AspxShoppingCartFlyOver, 'Delete Confirmation') + "</h1><p>" + getLocale(AspxShoppingCartFlyOver, 'Do you want to delete this item from your cart list?') + "</p>", properties);
            });
            var obj = $('#lnkshoppingcart');
            var pos = findPos(obj);
            return false;
        },
        GetCartItemListDetails: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.method = "AspxCommerceWebService.asmx/GetCartDetails";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);

        },
        BindCartItemslist: function(item, index) {
            if (item.CostVariants != '') {
                $('#tblCartListItems').append('<tr id="productID_' + item.ItemID + '"><td class="cssClassName"><a  costvariants="' + item.CostVariants + '" href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '">' + item.ItemName + ' (' + item.CostVariants + ')' + '</a></td><td class="cssClassQty">' + item.Quantity + '</td><td><span class="cssClassFormatCurrency">' + item.TotalItemCost * rate + '</span></td><td class="cssClassDelete"><img class="imgCartItemListDelete" name="' + item.CartItemID + '" id="btnItemDelete_' + item.CartID + '" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/admin/btndelete.png" /></td></tr>');
            } else {
                $('#tblCartListItems').append('<tr id="productID_' + item.ItemID + '"><td class="cssClassName"><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '">' + item.ItemName + '</a></td><td class="cssClassQty">' + item.Quantity + '</td><td><span class="cssClassFormatCurrency">' + item.TotalItemCost * rate + '</span></td><td class="cssClassDelete"><img class="imgCartItemListDelete" name="' + item.CartItemID + '" id="btnItemDelete_' + item.CartID + '"  src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/admin/btndelete.png"/></td></tr>');
            }

        },
        DeleteCartItemByID: function(id, cartItemId, event) {
            if (event) {
                var param = JSON2.stringify({ cartID: id, cartItemID: cartItemId, aspxCommonObj: aspxCommonObj });
                this.config.method = "AspxCommerceWebService.asmx/DeleteCartItem";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = 4;
                this.ajaxCall(this.config);
            }
            return false;
        },
        vars: {
            totalPrice: ""
        },
        GetTotalCartItemPrice: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetTotalCartItemPrice";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
            return ShoppingCartFlyOver.vars.totalPrice;
        }
    };

    ShoppingCartFlyOver.init();

});