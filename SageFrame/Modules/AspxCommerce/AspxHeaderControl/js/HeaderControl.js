var HeaderControl = "";
$(function() {
    //$("#lnkMyAccount").html(getLocale(AspxHeaderControl, "My Account"));
    $("#lnkCheckOut").html(getLocale(AspxHeaderControl, "Checkout"));
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName(),
        CustomerID: AspxCommerce.utils.GetCustomerID(),
        SessionCode: AspxCommerce.utils.GetSessionCode()
    };
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var myAccountURL = myAccountURLSetting;
    var shoppingCartURL = shoppingCartURLSetting;
    var wishListURL = wishListURLSetting;
    var frmLoginCheck = frmLogin;

    HeaderControl = {
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
            ajaxCallMode: ""
        },

        vars: {
            totalPrice: "",
            itemCount: ""
        },

        ajaxCall: function(config) {
            $.ajax({
                type: HeaderControl.config.type,
                contentType: HeaderControl.config.contentType,
                cache: HeaderControl.config.cache,
                async: HeaderControl.config.async,
                data: HeaderControl.config.data,
                dataType: HeaderControl.config.dataType,
                url: HeaderControl.config.url,
                success: HeaderControl.config.ajaxCallMode,
                error: HeaderControl.ajaxFailure
            });
        },

        init: function() {
            // HeaderControl.GetCartItemTotalCount();
            if (headerType.toLowerCase() == 'horizontal') {
                $(".sfHeaderDropdown").remove();
                $(".cssClassLoginStatusWrapper").show();
            }
            else {
                //$(".cssClassLoginStatusInfo ul li:first").remove();
                var htmToAppend = $(".cssClassLoginStatusInfo ul").html();
                $(".cssClassLoginStatusInfo ul").remove();
                $(".sfHeaderDropdown dt").append("<a id=\"#\" class=\"sfLocale\">Account</a><b></b>");
                //$(".sfHeaderDropdown dt").append("<a id=\"lnkMyAccount\" class=\"cssHeaderActive\"></a><b></b>");
                $(".sfHeaderDropdown").show();
                $(".sfHeaderDropdown").find('ul').html(htmToAppend);
            }
            $("#lnkMyAccount").html(getLocale(AspxHeaderControl, "My Account"));
            if (userRoleBit == 1) {
                $("#lnkMyCategories").html(getLocale(AspxHeaderControl, "My Categories"));
                $("#lnkMyAddedItems").html(getLocale(AspxHeaderControl, "My Added Items"));
                $(".cssClassMyCategories").show();
                $(".cssClassMyItems").show();
            }

            HeaderControl.vars.itemCount = cartItemCount;
            if (frmLoginCheck.toLowerCase() == "true" && loginMessageInfo.toLowerCase() == 'true' && loginMessageInfoCount == 1) {
                if (HeaderControl.vars.itemCount > 0) {
                    var properties = {
                        onComplete: function(e) {
                            if (e) {
                                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURL + pageExtension;
                            }
                        }
                    };
                    // Ask user's confirmation before delete records
                    csscody.messageInfo("<h2>" + getLocale(AspxHeaderControl, "Notice Information") + "</h2><p>" + getLocale(AspxHeaderControl, "Your cart contains items. Do you want to look at them?") + "</p>", properties);
                }
            }

            if (allowWishListSetting.toLowerCase() == 'true') {
                HeaderControl.GetWishListCount();
            } else {
                $('.cssClassWishList').hide();
            }
            if (aspxCommonObj.CustomerID > 0 && aspxCommonObj.UserName.toLowerCase() != 'anonymoususer') {
                if (userFriendlyURL) {
                    $("#lnkMyAccount").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myAccountURL + pageExtension);
                    $("#lnkMyCategories").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myCategoryMgntPageURLSetting + pageExtension);
                    $("#lnkMyAddedItems").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myItemMgntPageURLSetting + pageExtension);
                } else {
                    $("#lnkMyAccount").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myAccountURL + '');
                    $("#lnkMyCategories").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myCategoryMgntPageURLSetting + '');
                    $("#lnkMyAddedItems").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myItemMgntPageURLSetting + '');
                }
            } else {
                if (userFriendlyURL) {
                    $("#lnkMyAccount").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + LogInURL + pageExtension + '?ReturnUrl=' + AspxCommerce.utils.GetAspxRedirectPath() + myAccountURL + pageExtension);
                    $("#lnkMyCategories").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + LogInURL + pageExtension + '?ReturnUrl=' + AspxCommerce.utils.GetAspxRedirectPath() + myCategoryMgntPageURLSetting + pageExtension);
                    $("#lnkMyAddedItems").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + LogInURL + pageExtension + '?ReturnUrl=' + AspxCommerce.utils.GetAspxRedirectPath() + myItemMgntPageURLSetting + pageExtension);
                } else {
                    $("#lnkMyAccount").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + LogInURL + '');
                }
            }
            $("#lnkProceedToSingleCheckout , #lnkProceedToSingleChkout,#lnkCheckOut").click(function() {
                if ($(".cssClassBlueBtn ").length > 0) {
                    if ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, "") < 0) {
                        csscody.alert("<h2>" + getLocale(AspxHeaderControl, "Information Alert") + "</h2><p>" + getLocale(AspxHeaderControl, "You can't proceed to checkout your amount is not applicable!") + "</p>");
                        return false;
                    }
                }
                var totalCartItemPrice = HeaderControl.GetTotalCartItemPrice();
                if (totalCartItemPrice == 0) {
                    csscody.alert("<h2>" + getLocale(AspxHeaderControl, "Information Alert") + "</h2><p>" + getLocale(AspxHeaderControl, "You have not added any items in cart yet!") + "</p>");
                    if (typeof (AspxCart) == 'object') {
                        AspxCart.GetUserCartDetails();
                    }
                    return false;
                }
                if (totalCartItemPrice < minCartSubTotalAmountSetting) {
                    csscody.alert("<h2>" + getLocale(AspxHeaderControl, "Information Alert") + "</h2><p>" + getLocale(AspxHeaderControl, "You are not eligible to proceed further. Your order amount must be at least") + "<span class='cssClassFormatCurrency'>" + minCartSubTotalAmountSetting + "</span></p>");

                } else {
                    var singleAddressLink = '';
                    if (userFriendlyURL) {
                        singleAddressLink = singleAddressChkOutURL + pageExtension;
                    } else {
                        singleAddressLink = singleAddressChkOutURL;
                    }
                    if (aspxCommonObj.CustomerID > 0 && aspxCommonObj.UserName.toLowerCase() != 'anonymoususer') {
                        window.location = AspxCommerce.utils.GetAspxRedirectPath() + singleAddressLink;
                    } else {
                        if (allowAnonymousCheckOutSetting.toLowerCase() == 'true') {
                            window.location = AspxCommerce.utils.GetAspxRedirectPath() + singleAddressLink;
                            // newMultiShippingDiv = '<a href="' + AspxCommerce.utils.GetAspxRedirectPath() + singleAddressLink + '">Checkout With Single Address</a>';
                        } else {
                            csscody.alert('<h2>' + getLocale(AspxHeaderControl, 'Information Alert') + '</h2><p>' + getLocale(AspxHeaderControl, 'Checkout is not allowed for anonymous user!') + '</p>');
                        }
                    }

                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            });
        },
        GetWishListCount: function() {
            this.config.url = this.config.baseURL + "CountWishItems";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = HeaderControl.BindWishItemsCount;
            this.config.async = true;
            this.ajaxCall(this.config);
        },

        GetCartItemTotalCount: function() {
            this.config.url = this.config.baseURL + "GetCartItemsCount";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = HeaderControl.BindCartItemsCount;
            this.config.async = false;
            this.ajaxCall(this.config);
        },

        GetTotalCartItemPrice: function() {
            this.config.url = this.config.baseURL + "GetTotalCartItemPrice";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = HeaderControl.SetTotalCartItemPrice;
            this.config.async = false;
            this.ajaxCall(this.config);
            return HeaderControl.vars.totalPrice;
        },
        BindWishItemsCount: function(msg) {
            $("#lnkMyWishlist").html(getLocale(AspxHeaderControl, "My Wishlist") + " <span class=\"cssClassTotalCount\">[" + msg.d + "]</span>");
            var myWishlistLink = '';
            var loginLink = '';
            if (userFriendlyURL) {
                myWishlistLink = wishListURL + pageExtension;
                loginLink = LogInURL + pageExtension + '?ReturnUrl=' + AspxCommerce.utils.GetAspxRedirectPath() + myWishlistLink;
            } else {
                myWishlistLink = wishListURL;
                loginLink = LogInURL;
            }
            if (aspxCommonObj.CustomerID > 0 && aspxCommonObj.UserName.toLowerCase() != 'anonymoususer') {
                $("#lnkMyWishlist").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + myWishlistLink + '');
            } else {
                $("#lnkMyWishlist").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + loginLink + '');
            }
        },

        BindCartItemsCount: function(msg) {
            var shoppingCartURLLink = '';
            if (userFriendlyURL) {
                shoppingCartURLLink = shoppingCartURL + pageExtension;
            } else {
                shoppingCartURLLink = shoppingCartURL;
            }
            $("#lnkMyCart").html(getLocale(AspxHeaderControl, "My Cart") + " <span class=\"cssClassTotalCount\"> [" + msg.d + "]</span>");
            HeaderControl.vars.itemCount = msg.d;
            if (msg.d == 0) {
                frmLoginCheck = "false";
            }
            if (frmLoginCheck.toLowerCase() == "true" && loginMessageInfo.toLowerCase() == 'true' && loginMessageInfoCount == 1) {
                if (msg.d > 0) {
                    var properties = {
                        onComplete: function(e) {
                            if (e) {
                                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURL;
                            }
                        }
                    };
                    // Ask user's confirmation before delete records
                    csscody.messageInfo("<h2>" + getLocale(AspxHeaderControl, "Notice Information") + "</h2><p>" + getLocale(AspxHeaderControl, "Your cart contains items. Do you want to look at them?") + "</p>", properties);
                }
            }
            $("#lnkMyCart").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + shoppingCartURLLink + '');

        },

        SetTotalCartItemPrice: function(msg) {
            HeaderControl.vars.totalPrice = msg.d;
        }
    };
    HeaderControl.init();
});