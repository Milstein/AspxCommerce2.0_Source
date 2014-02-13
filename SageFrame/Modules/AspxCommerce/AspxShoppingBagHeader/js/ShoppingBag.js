var ShopingBag = "";
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

    ShopingBag = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath,
            method: "",
            url: "",
            ajaxCallMode: ""
        },

        init: function() {
            ShopingBag.LoadAllImages();
            ShopingBag.hideShoppingCart();
            $("#divMiniShoppingCart").hide();
            if (showMiniShopCart.toLowerCase() == 'true') {
                ShopingBag.GetCartItemCount();
                $("#divMiniShoppingCart").show();
                if (BagType == "Popup") {
                    var closeIcon = '<div class="cssClassCloseIcon"> <button type="button" class="cssClassClose"><span class="sfLocale">Close</span></button></div>';
                    $(".Shopingcartpopup").removeAttr('id').attr('id', 'popuprel6');
                    $(".Shopingcartpopup").addClass("popupbox");
                    $(".Shopingcartpopup").prepend(closeIcon);
                    $("#divMiniShoppingCart a").attr('rel', 'popuprel6');
                    $("#lnkShoppingBag").removeAttr('onclick');
                    $("#divMiniShoppingCart a").removeAttr('onclick');
                    $("#imgarrow").hide();
                    $("#divMiniShoppingCart a").live('click', function() {
                        if (BagType = "Popup") {
                            ShopingBag.showShoppingCartForPopup();
                            $('#tblListCartItems').next('div').next().show();
                            $('#tblListCartItems').next('div').show();
                            ShowPopup(this);
                        }
                    });

                }
            }

            $("#lnkViewCart").bind('click', function() {
                if (userFriendlyURL) {
                    window.location = AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURL + pageExtension;
                }
                else {
                    window.location = AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURL;
                }
            });

            $("#lnkMiniCheckOut").click(function() {

                if (aspxCommonObj.CustomerID <= 0 && aspxCommonObj.UserName.toLowerCase() == 'anonymoususer') {
                    if (allowAnonymousCheckOut.toLowerCase() == 'false') {
                        csscody.alert('<h2>' + getLocale(AspxShoppingBagHeader, "Information Alert") + "</h2><p>" + getLocale(AspxShoppingBagHeader, "Checkout is not allowed for Anonymous User!") + '</p>');
                        return false;
                    }
                }
                var singleAddressLink = '';
                if (userFriendlyURL) {
                    singleAddressLink = singleAddressChkOutURL + pageExtension;
                }
                else {
                    singleAddressLink = singleAddressChkOutURL;
                }
                var totalCartItemPrice = ShopingBag.GetTotalCartItemPrice();
                if (totalCartItemPrice < minCartSubTotalAmount) {
                    csscody.alert('<h2>' + getLocale(AspxShoppingBagHeader, "Information Alert") + '</h2><p>' + getLocale(AspxShoppingBagHeader, "You are not eligible to proceed further:Your Order Amount is too low!!!") + '</p>');
                    return false;
                }
                else {
                    if (aspxCommonObj.CustomerID > 0 && aspxCommonObj.UserName.toLowerCase() != 'anonymoususer') {
                        window.location = AspxCommerce.utils.GetAspxRedirectPath() + singleAddressLink;
                    }
                    else {
                        if (allowAnonymousCheckOut.toLowerCase() == 'true') {
                            window.location = AspxCommerce.utils.GetAspxRedirectPath() + singleAddressLink;
                        }
                    }
                }
            });
            $(".cssClassClose").bind("click", function() {
                $('#fade, #popuprel6').fadeOut();
            });
        },

        ajaxCall: function(config) {
            $.ajax({
                type: ShopingBag.config.type,
                contentType: ShopingBag.config.contentType,
                cache: ShopingBag.config.cache,
                async: ShopingBag.config.async,
                url: ShopingBag.config.url,
                data: ShopingBag.config.data,
                dataType: ShopingBag.config.dataType,
                success: ShopingBag.config.ajaxCallMode,
                error: ShopingBag.ajaxFailure
            });
        },


        SetTotalCartItemPrice: function(data) {
            ShopingBag.vars.totalPrice = data.d;
        },

        BindCartDetailsInShoppingBag: function(data) {
            $("#tblListCartItems").html('');
            if (data.d.length > 0) {
                $.each(data.d, function(index, item) {
                    ShopingBag.BindCartItemslist(item, index);
                });
                $("a").bind("click", function(e) {
                    //   alert($(this).attr("costvariants"));
                    if ($(this).attr("costvariants") != null) {
                        itemCostVariantData = $(this).attr("costvariants");
                        //alert(itemCostVariantData);
                        $.session("ItemCostVariantData", 'empty');
                        $.session("ItemCostVariantData", itemCostVariantData);
                    }
                });
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                $(".imgCartItemDelete").bind("click", function() {
                    var cartId = parseInt($(this).attr("id").replace(/[^0-9]/gi, ''));
                    var cartItemId = parseInt($(this).attr("name").replace(/[^0-9]/gi, ''));
                    var properties = { onComplete: function(e) {
                        if ($("#divMiniShoppingCart1").offset() != null) {
                            ShoppingCartFlyOver.DeleteCartItemByID(cartId, cartItemId, e);
                            ShopingBag.DeleteCartItemByID(cartId, cartItemId, e);
                            ShopingBag.GetCartItemCount();
                        }
                        else {
                            ShopingBag.DeleteCartItemByID(cartId, cartItemId, e);
                            ShopingBag.GetCartItemCount();
                        }
                    }
                    }
                    csscody.confirm("<h1>" + getLocale(AspxShoppingBagHeader, "Delete Confirmation") + "</h1><p>" + getLocale(AspxShoppingBagHeader, "Do you want to delete this item from your cart list?") + "</p>", properties);
                });
            }
            else {
                $("#ShoppingCartPopUp").hide();
            }
        },

        BindShoppingBagOnDelete: function() {
            //ShopingBag.GetCartItemCount(); //for bag count
            ShopingBag.GetCartItemListDetails(); //for shopping bag detail
            $("#divMiniShoppingCart").show();

            //For my Cart Link Header
            if ($("#lnkMyCart").length > 0) {
                HeaderControl.GetCartItemTotalCount();
            }
            ShopingBag.GetCartItemCount();
            if ($('#divCartDetails').length > 0) {
                if (typeof(AspxCart) == 'object')
                    AspxCart.GetUserCartDetails(); //for my cart's tblitemList table
                if (typeof(CheckOut) == 'object')
                    CheckOut.GetUserCartDetails();
            }
            if ($("#divLatestItems").length > 0) {
                LatestItems.GetLatestItems();
            }
            if ($("#divShowCategoryItemsList").length > 0) {
                categoryDetails.LoadAllCategoryContents(1, parseInt($("#ddlPageSize").val()), 0, $("#ddlSortBy option:selected").val());
            }
            //                    if ($("#divYouMayAlsoLike").length > 0) {
            //                        GetYouMayAlsoLikeItemsList();
            //                    }
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

            if ($("#dynItemDetailsForm").length > 0) {
                ItemDetail.BindItemBasicByitemSKU(itemSKU);
            }
            if (BagType == "Popup") {
                if ($.trim($("#tblListCartItems").html()) == "") {
                    $('#tblListCartItems').append('<tr><td><span class="cssEmpty">' + getLocale(AspxShoppingBagHeader, "Your cart is empty!") + '</span></td></tr>');
                    $('#tblListCartItems').next('div').next().hide();
                    $('#tblListCartItems').next('div').hide();
                }
            }
            return false;
        },

        LoadAllImages: function() {
            $('#fullShoppingBag').attr('src', '' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_full.png');
            $("#emptyShoppingBag").attr('src', '' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/shopping-basket_empty.png');
            $("#imgarrow").attr('src', '' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/arrow_down.gif');
        },

        hideShoppingCart: function() {
            $('#ShoppingCartPopUp').hide();
            $('#imgarrow').attr("src", AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/arrow_down.gif");
        },

        GetCartItemCount: function() {
            var count = HeaderControl.vars.itemCount;
            if (count > 0) {
                $("#fullShoppingBag").show();
                $("#emptyShoppingBag").hide();
                if (BagType != "Popup") {
                    $("#imgarrow").show();
                    $("#cartItemCount").html('<a onclick="if(!this.disabled){ShopingBag.showShoppingCart();};" href="javascript:void(0);" id="lnkshoppingcart">' + getLocale(AspxShoppingBagHeader, "My Shopping Bag") + '[ ' + count + ' ]</a>');
                }
                else {
                    $("#cartItemCount").html('<a  href="javascript:void(0);" id="lnkshoppingcart" rel="popuprel6">' + getLocale(AspxShoppingBagHeader, "My Shopping Bag") + '[ ' + count + ' ]</a>');
                }
            }
            else {
                $("#imgarrow").hide();
                $("#fullShoppingBag").hide();
                $("#emptyShoppingBag").show();
                $("#cartItemCount").html("[ <b>" + getLocale(AspxShoppingBagHeader, "Your cart is empty!") + "</b>]");
            }
        },

        showShoppingCart: function() {
            ShopingBag.GetCartItemListDetails();
            var obj = $('#lnkshoppingcart');
            var pos = findPos(obj);
            $('#ShoppingCartPopUp').css('left', pos[0] - 180);
            $('#ShoppingCartPopUp').css('top', pos[1] + 20);

            $('#ShoppingCartPopUp').slideToggle("slow");

            if ($('#imgarrow').attr("src").indexOf("arrow_up.gif") > -1) {
                $('#imgarrow').attr("src", AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/arrow_down.gif");

            } else {
                $('#imgarrow').attr("src", AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/arrow_up.gif");
            }
            return false;

        },
        showShoppingCartForPopup: function() {
            ShopingBag.GetCartItemListDetails();
            return false;
        },

        GetCartItemListDetails: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.method = "AspxCommerceWebService.asmx/GetCartDetails";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ShopingBag.BindCartDetailsInShoppingBag;
            //this.config.async = true;
            this.ajaxCall(this.config);

        },

        BindCartItemslist: function(item, index) {
            if (item.CostVariants != '') {
                $('#tblListCartItems').append('<tr><td><a  costvariants="' + item.CostVariants + '" href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '?varId=' + item.CostVariantsValueIDs + '">' + item.ItemName + ' (' + item.CostVariants + ')' + '</a></td><td>' + item.Quantity + '&nbsp;&nbsp;*&nbsp;&nbsp;<span class="cssClassFormatCurrency">' + (item.Price * rate).toFixed(2) + '</span>&nbsp;&nbsp;=&nbsp;&nbsp;<span class="cssClassFormatCurrency">' + (item.TotalItemCost * rate).toFixed(2) + '</span></td><td><img class="imgCartItemDelete" name="' + item.CartItemID + '" id="btnDelete_' + item.CartID + '" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/admin/btndelete.png"/></td></tr>');
            }
            else {
                $('#tblListCartItems').append('<tr><td><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '">' + item.ItemName + '</a></td><td>' + item.Quantity + '&nbsp;&nbsp;*&nbsp;&nbsp;<span class="cssClassFormatCurrency">' + (item.Price * rate).toFixed(2) + '</span>&nbsp;&nbsp;=&nbsp;&nbsp;<span class="cssClassFormatCurrency">' + (item.TotalItemCost * rate).toFixed(2) + '</span></td><td><img class="imgCartItemDelete" name="' + item.CartItemID + '" id="btnDelete_' + item.CartID + '" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/admin/btndelete.png"/></td></tr>');
            }
        },

        DeleteCartItemByID: function(id, cartItemId, event) {
            if (event) {
                var param = JSON2.stringify({ cartID: id, cartItemID: cartItemId, aspxCommonObj: aspxCommonObj });
                this.config.method = "AspxCommerceWebService.asmx/DeleteCartItem";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = ShopingBag.BindShoppingBagOnDelete;
                // this.config.async = true;
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
            this.config.ajaxCallMode = ShopingBag.SetTotalCartItemPrice;
            this.config.async = false;
            this.ajaxCall(this.config);
            return ShopingBag.vars.totalPrice;
        }
    }

    ShopingBag.init();

});