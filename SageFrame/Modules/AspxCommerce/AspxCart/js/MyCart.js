var AspxCart = "";
function DisableRightClick(event) {
    //For mouse right click
    if (event.button == 2) {
        //  csscody.alert("<h2>Information Message</h2><p>Right Clicking not allowed!</p>");

    }
}
var couponCode = '';
var couponSessionAmount = 0.00;
var couponSessionPercentAmount = 0.00;
var couponPercentValue = 0;
var isCouponPercent = 0;
var CartPriceDiscount = 0;
var isPurchaseActive = false;
var isRewardPointEnbled = false;
var rewardAmounTemp = "";

$(function() {
    var basketItems = [];
    var itemQuantityInCart;
    var RootPath = AspxCommerce.utils.GetAspxRootPath();
    var maxRewardPoints = 0;
    var minRewardPoints = 0;
    var lowerPrice = 0;
    var ItemSubtotal = 0;
    var rewardPointsCommonObj = {
        RewardPointSettingsID: "",
        RewardRuleName: "",
        RewardRuleID: "",
        RewardRuleType: "",
        RewardPoints: "",
        IsActive: false,
        arrRewardRuleIDs: 0
    };

    function aspxCommonObj() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            SessionCode: AspxCommerce.utils.GetSessionCode(),
            CustomerID: AspxCommerce.utils.GetCustomerID()
        };
        return aspxCommonInfo;
    }

    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();

    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var updateCart = true;
    var qtydx = 0;
    var sessionCouponCodeFlag = false;

    function getCountAppliedCount(key) {
        var count = 0;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            async: false,
            url: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/GetSessionVariable",
            data: JSON2.stringify({ key: key }),
            dataType: "json",
            success: function(msg) {
                count = msg.d;
            }
        });
        return count;
    }


    AspxCart = {
        config: {
            isPostBack: false,
            async: true,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath(),
            method: "",
            url: "",
            ajaxCallMode: "",
            error: ""
        },
        SetBasketItems: function(arr) {
            basketItems = arr;
        },
        Vars: {
            CartID: 0,
            CartPriceDiscount: 0
        },

        ajaxCall: function(config) {
            $.ajax({
                type: AspxCart.config.type,
                contentType: AspxCart.config.contentType,
                cache: AspxCart.config.cache,
                async: AspxCart.config.async,
                url: AspxCart.config.url,
                data: AspxCart.config.data,
                dataType: AspxCart.config.dataType,
                success: AspxCart.config.ajaxCallMode,
                error: AspxCart.config.error
            });
        },

        RefreshCartOnUpdate: function() {
            if ($("#lnkMyCart").length > 0) {
                HeaderControl.GetCartItemTotalCount(); //for header cart count from database
            }
            if ($("#lnkShoppingBag").length > 0) {
                ShopingBag.GetCartItemCount(); //for bag count
                ShopingBag.GetCartItemListDetails(); //for shopping bag detail
            }
            if ($("#divRelatedItems").length > 0) {
                YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
            }
            AspxCart.GetUserCartDetails();
            // getdiscount();

            csscody.info("<h2>" + getLocale(AspxCartLocale, "Successful Message") + "</h2><p>" + getLocale(AspxCartLocale, "Your cart has been updated successfully.") + "</p>");
        },
        SetDiscountQuantityAmount: function(msg) {
            qtydx = parseFloat(msg.d).toFixed(2);
            // $("#txtDiscountAmount").val(parseFloat(msg.d).toFixed(2));
            //$('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            AspxCart.GetCouponInPercentStatus('IsCouponInPercent');
            if (isCouponPercent == 1) {

                AspxCart.GetCouponPercentValue('CouponPercentValue');
                AspxCart.GetCouponDiscountAmount('CouponSessionPercentAmount');
                // AspxCart.SetSessionValue('CouponSessionPercentAmount', qtydx);
            } else {
                AspxCart.GetCouponDiscountAmount('CouponSessionAmount');
            }
            AspxCart.getdiscount('DiscountAmount');
            AspxCart.SetSessionValue("DiscountAmount", (parseFloat(($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""))) / rate) - parseFloat(AspxCart.Vars.CartPriceDiscount));

        },
        SetSessionData: function(msg) {
            //console.log(eval(qtydx) * rate + eval(AspxCart.Vars.CartPriceDiscount) * rate);
            $("#txtDiscountAmount").val('').val(eval(qtydx) * rate + eval(AspxCart.Vars.CartPriceDiscount) * rate);
            var dx = 0.00;
            dx = parseFloat(msg.d).toFixed(2); //12.25
            var tt = 0;
            var subTotalAmount = 0.00;
            $(".row-total-input").each(function() {
                subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^0-9\.]+/g, ""));

                //console.log(subTotalAmount);
            });

            if ($("#txtTotalCost").length > 0) {
                tt = subTotalAmount; // parseFloat($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, ""));
            }
            if (isCouponPercent == 1) {
                var cCount = getCountAppliedCount('CouponApplied');
                var tempTT = 0;
                tempTT = tt - (qtydx * rate);
                var cpTotal = 0.00;
                for (var x = 0; x < cCount; x++) {

                    dx = (tempTT * (couponPercentValue) / 100).toFixed(2);
                    //  dx = dx / rate;
                    cpTotal += eval(dx);
                    tempTT -= eval(dx);
                }
                dx = cpTotal.toFixed(2);
                dx = dx / rate;
                $("#trCouponDiscount").show();
                AspxCart.SetSessionValue('CouponSessionPercentAmount', dx);
            } else {
                dx = couponSessionAmount;
            }
            if (couponPercentValue > 0 || couponSessionAmount > 0) {
                $("#trCouponDiscount").show();
            } else {
                $("#trCouponDiscount").hide();
            }
            var rd = parseFloat($.trim($("#txtRewardAmount").val()).replace(/[^0-9\.]+/g, ""));
            //     var gt1 = subTotalAmount - dx * rate - qtydx * rate;
            var sum = tt - dx * rate - qtydx * rate;
            //    $("#txtDiscountAmount").val('').val(eval(dx) * rate + eval(qtydx) * rate + eval(AspxCart.Vars.CartPriceDiscount) * rate);
            //  $("#txtDiscountAmount").val('').val(eval(qtydx) * rate + eval(AspxCart.Vars.CartPriceDiscount) * rate);

            // debugger;
            $("#txtCouponDiscountAmount").val(eval(dx * rate));
            if (sum > 0) {
                $("#txtTotalCost").val(sum.toFixed(2));
            } else {
                // csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Coupon is either invalid, expired, reached it's usage limit or exceeded your cart total purchase amount!") + "</p>");
                //     $("#txtCouponCode").val('');
                AspxCart.ResetCouponSession("CouponApplied,CouponSessionAmount,CouponPercentValue,CouponSessionPercentAmount,IsCouponInPercent");
                //$("#txtTotalCost").val($('.total-box ').val().replace(/[^0-9\.]+/g, ""));
                $("#trCouponDiscount").hide();
            }

            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

        },
        GetCartInfoForRate: function() {

            var basketItem = {
                Height: "5",
                ItemName: "testI",
                Length: "5",
                Width: "4",
                Weight: 0
            };
            return basketItems;
        },
        BindCartDetails: function(msg) {
            $("#txtRewardAmount").val(rewardAmounTemp * rate);

            var arrRewardDetails = "";
            var arrRewardSub = "";
            var arrRewardtotalPrice = 0;
            var rewardRate = parseFloat($("#hdnRewardRate").val());
            if (msg.d.length > 0) {
                AspxCart.IsModuleInstalled();
                $('.cssClassSubTotalAmount,.cssClassLeftRightBtn,.cssClassapplycoupon,.cssClassBlueBtnWrapper').show();
                var cartHeading = '';
                var cartElements = '';
                cartHeading += '<table cellspacing="0" cellpadding="0" border="0" width="100%" id="tblCartList">';
                cartHeading += '<tbody><tr class="cssClassHeadeTitle">';
                cartHeading += '<td class="cssClassSN">Sn.';
                if (showItemImagesOnCartSetting.toLowerCase() == 'true') {
                    cartHeading += '</td><td class="cssClassItemImageWidth">';
                    cartHeading += getLocale(AspxCartLocale, 'Item Description');
                }
                cartHeading += '</td><td>';
                //                cartHeading += getLocale(AspxCartLocale, 'Description');
                //                cartHeading += '</td>';
                //                cartHeading += '<td>';
                cartHeading += getLocale(AspxCartLocale, 'Variants');
                cartHeading += '</td>';
                cartHeading += '<td class="cssClassQTY">';
                cartHeading += getLocale(AspxCartLocale, 'Qty');
                cartHeading += '</td>';
                cartHeading += '<td class="cssClassTimes">';
                cartHeading += getLocale(AspxCartLocale, 'X');
                cartHeading += '</td>';
                cartHeading += '<td class="cssClassItemPrice">';
                cartHeading += getLocale(AspxCartLocale, 'Unit Price');
                cartHeading += '</td>';
                cartHeading += '<td class="cssClassEquals">';
                cartHeading += '=';
                cartHeading += '</td>';
                cartHeading += '<td class="cssClassSubTotal">';
                cartHeading += getLocale(AspxCartLocale, 'Line Total');
                cartHeading += '</td>';
                //                        cartHeading += '<td class="cssClassTaxRate">';
                //                        cartHeading += 'Unit Tax';
                //                        cartHeading += '</td>';
                //                    cartHeading += '<td>';
                //                    cartHeading += 'Remark';
                //                    cartHeading += '</td>';
                cartHeading += '<td class="cssClassAction">';
                cartHeading += getLocale(AspxCartLocale, 'Action');
                cartHeading += '</td>';
                cartHeading += '</tr>';
                cartHeading += '</table>';
                $("#divCartDetails").html(cartHeading);
                basketItems = [];
                $.each(msg.d, function(index, value) {
                    //for realtime shipping rate calculation
                    if (value.ItemTypeID == 1) {
                        var basketItem = {
                            Height: value.Height,
                            ItemName: value.ItemName,
                            Length: value.Length,
                            Width: value.Width,
                            WeightValue: value.Weight,
                            Quantity: value.Quantity
                        };
                        basketItems.push(basketItem);
                    }

                    index = index + 1;
                    var imagePath = itemImagePath + value.ImagePath;
                    if (value.ImagePath == "") {
                        imagePath = noImageMyCartPathSetting;
                    } else if (value.AlternateText == "") {
                        value.AlternateText = value.Name;
                    }
                    cartElements += '<tr >';
                    cartElements += '<td>';
                    cartElements += '<b>' + index + "." + '</b>';
                    cartElements += '</td>';
                    if (showItemImagesOnCartSetting.toLowerCase() == 'true') {
                        cartElements += '<td>';
                        cartElements += '<p class="cssClassCartPicture">';
                        cartElements += '<img src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + value.AlternateText + '" title="' + value.AlternateText + '"></p>';
                        //cartElements += '</td>';
                    }
                    // cartElements += '<td>';
                    cartElements += '<div class="cssClassCartPictureInformation">';
                    cartElements += '<h3>';
                    if (value.CostVariantsValueIDs != '') {
                        cartElements += '<a href="item/' + value.SKU + pageExtension + '?varId=' + value.CostVariantsValueIDs + '"  costvariants="' + value.CostVariants + '" onclick=AspxCart.SetCostVartSession(this);>' + value.ItemName + ' </a></h3>';
                    } else {
                        cartElements += '<a href="item/' + value.SKU + pageExtension + '"  costvariants="' + value.CostVariants + '" onclick=AspxCart.SetCostVartSession(this);>' + value.ItemName + ' </a></h3>';
                    }
                    //                    cartElements += '<p>';
                    //                    //cartElements += '<textarea  id="itemDescription" readonly="readonly" style="width: 153px; height: 75px;">' + Encoder.htmlDecode(value.ShortDescription) + '</textarea>';
                    //                    cartElements += '' + Encoder.htmlDecode(value.ShortDescription) + '';
                    //                    cartElements += '</p>';
                    cartElements += '</div>';
                    cartElements += '</td>';
                    cartElements += '<td class="row-variants">';
                    cartElements += '' + value.CostVariants + '';
                    cartElements += '</td>';
                    cartElements += '<td class="cssClassQTYInput">';
                    cartElements += '<input class="num-pallets-input" price="' + (value.Price * rate).toFixed(2) + '" id="txtQuantity_' + value.CartItemID + '" type="text" cartID="' + value.CartID + '" value="' + value.Quantity + '" quantityInCart="' + value.Quantity + '" actualQty="' + value.ItemQuantity + '" costVariantID="' + value.CostVariantsValueIDs + '" itemID="' + value.ItemID + '" addedValue="' + value.Quantity + '" autocomplete="off">';
                    cartElements += '<label class="lblNotification" style="color: #FF0000;"></label></td>';
                    cartElements += '<td class="cssClassTimes">';
                    cartElements += ' X';
                    cartElements += '</td>';
                    cartElements += '<td class="price-per-pallet">';
                    cartElements += '<span class="cssClassFormatCurrency">' + (value.Price * rate).toFixed(2) + '</span>';
                    cartElements += '</td>';
                    cartElements += '<td class="cssClassEquals">';
                    cartElements += '=';
                    cartElements += '</td>';
                    cartElements += '<td class="row-total">';
                    cartElements += '<input class="row-total-input cssClassFormatCurrency" autocomplete="off" id="txtRowTotal_' + value.CartID + '" value="' + (value.TotalItemCost * rate).toFixed(2) + '"  readonly="readonly" type="text" />';
                    cartElements += '</td>';
                    //                            cartElements += '<td class="row-taxRate">';
                    //                            cartElements += '<span class="cssClassFormatCurrency">' + (value.TaxRateValue * rate).toFixed(2) + '</span>';
                    //                            cartElements += '</td>';
                    //                        cartElements += '<td class="rowremark">';
                    //                        cartElements += '' + value.Remarks + '';
                    //                        cartElements += '</td>';
                    cartElements += '<td>';
                    cartElements += ' <img class="ClassDeleteCartItems" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" alt="Delete" title="Delete" value="' + value.CartItemID + '" cartID="' + value.CartID + '"/>';
                    cartElements += '</td>';
                    cartElements += '</tr>';
                    AspxCart.Vars.CartID = value.CartID;

                    arrRewardDetails += '<li>' + '<b>' + (value.TotalItemCost).toFixed(2) * rewardRate.toFixed(2) + '</b>' + getLocale(AspxCartLocale, "Points for Product: ") + value.ItemName + '&nbsp &nbsp' + '</li>';
                    arrRewardSub += '<li>' + '+' + value.Quantity + "X" + (value.Price).toFixed(2) * rewardRate.toFixed(2) + '</li>';
                    arrRewardtotalPrice = arrRewardtotalPrice + parseFloat((value.Price * value.Quantity).toFixed(2));
                    //alert(reawrdRate);

                });
                if (isPurchaseActive) {
                    $('#dvPointsTotal').empty();
                    $('#ulRewardDetails').html(arrRewardDetails);
                    $('#ulRewardSub').html(arrRewardSub);
                    $('#dvPointsTotal').append(arrRewardtotalPrice.toFixed(2) * rewardRate.toFixed(2));

                }
                //AspxCart.SetSessionValue('earningRewardPoints', arrRewardtotalPrice.toFixed(2) * rewardRate.toFixed(2));

                AspxCart.GetDiscountCartPriceRule(AspxCart.Vars.CartID, 0);
                $("#tblCartList").append(cartElements);
                $("#tblCartList tr:even ").addClass("sfEven");
                $("#tblCartList tr:odd ").addClass("sfOdd");
                $('.cssClassCartPicture img[title]').tipsy({ gravity: 'n' });
                //QuantitityDiscountAmount();

            } else {
                if (!$("#dvEstimateRate").is(":hidden")) {
                    $("#dvEstimateRate").remove();
                }
                AspxCart.ResetCouponSession("CouponCode,DiscountAmount,CouponApplied,CouponSessionAmount,CouponDiscountAmount,IsCouponInPercent,CouponPercentValue,CouponSessionPercentAmount");
                $(".cssClassCartInformation").html("<span class=\"cssClassNotFound\">" + getLocale(AspxCartLocale, "Your cart is empty!") + "</span>");
            }
            AspxCart.BindCartFunctions();

        },
        BindCartFunctions: function() {
            AspxCart.QuantitityDiscountAmount();
            $(".ClassDeleteCartItems").die().live("click", function() {
                var cartId = $(this).attr("cartID");
                var cartItemId = $(this).attr("value");
                var properties = {
                    onComplete: function(e) {
                        AspxCart.DeleteCartItem(cartId, cartItemId, e);
                    }
                };
                // Ask user's confirmation before delete records
                csscody.confirm("<h2>" + getLocale(AspxCartLocale, "Delete Confirmation") + "</h2><p>" + getLocale(AspxCartLocale, "Are you sure you want to delete this item from your cart?") + "</p>", properties);
            });
            var subTotalAmount = 0.00;
            $(".row-total-input").each(function() {
                subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^0-9\.]+/g, ""));
                //console.log(subTotalAmount);                 
            });
            $(".total-box").val('').attr("value", subTotalAmount.toFixed(2));
            ItemSubtotal = parseFloat(subTotalAmount).toFixed(2);

            //var totalTax = 0.00;
            //$(".num-pallets-input").each(function() {
            //totalTax += ($(this).val() * $(this).attr("rate"));
            //});
            //$(".tax-box").val('').attr("value", (totalTax * rate).toFixed(2));
            //alert(parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, "")));
            var cpd = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
            var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
            var rewardDc = parseFloat($.trim($("#txtRewardAmount").val()).replace(/[^0-9\.]+/g, ""));
            $("#txtTotalCost").val(((parseFloat($(".total-box").val())).toFixed(2) - oldd - rewardDc - cpd).toFixed(2));
            $(".num-pallets-input").die().live("contextmenu", function(e) {
                return false;
            });
            $('.num-pallets-input').live('paste', function(e) {
                e.preventDefault();
            });

            $(".num-pallets-input").live('focus', function(e) {
                $(this).val('');
                $(this).parents('.cssClassQTYInput').find('.lblNotification').html('');
                var subTotalAmount = 0.00;
                var cartId = parseInt($(this).attr("cartID"));
                $(this).closest('tr').find("#txtRowTotal_" + cartId + "").val($(this).val() * $(this).attr("price"));
                $(".row-total-input").each(function() {
                    subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^0-9\.]+/g, ""));

                });
                $(".total-box").val('').attr("value", subTotalAmount.toFixed(2));
                ItemSubtotal = parseFloat(subTotalAmount).toFixed(2);
                //var totalTax = 0.00;
                //$(".num-pallets-input").each(function() {
                //  totalTax += ($(this).val() * $(this).attr("rate"));
                //});

                //$("#txtTotalTax").val('').val(totalTax);

                //$(".tax-box").val('').attr("value", totalTax.toFixed(2));
                //$("#txtTotalCost").val(parseFloat($(".total-box").val()));

                //  debugger;
                $("#txtTotalCost").val((parseFloat($(".total-box").val())).toFixed(2));
                var cpd = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var rd = parseFloat($.trim($("#txtRewardAmount").val()).replace(/[^0-9\.]+/g, ""));
                //  var q = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var tt = parseFloat($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, ""));
                if (tt != 0.00) {
                    var sum = tt - oldd - rd - cpd;
                    $("#txtTotalCost").val(sum);
                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            });

            $(".num-pallets-input").live('select', function(e) {
                // $(this).val('');
                // $(this).val('');
                $(this).parents('.cssClassQTYInput').find('.lblNotification').html('');
                var subTotalAmount = 0.00;
                var cartId = parseInt($(this).attr("cartID"));
                $(this).closest('tr').find("#txtRowTotal_" + cartId + "").val($(this).val() * $(this).attr("price"));
                $(".row-total-input").each(function() {
                    subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^0-9\.]+/g, ""));

                });
                $(".total-box").val('').attr("value", subTotalAmount.toFixed(2));
                ItemSubtotal = parseFloat(subTotalAmount).toFixed(2);
                //var totalTax = 0.00;
                //$(".num-pallets-input").each(function() {
                // totalTax += ($(this).val() * $(this).attr("rate"));
                //});

                //$("#txtTotalTax").val('').val(totalTax);

                //$(".tax-box").val('').attr("value", totalTax.toFixed(2));
                //$("#txtTotalCost").val(parseFloat($(".total-box").val()));
                $("#txtTotalCost").val((parseFloat($(".total-box").val())).toFixed(2));
                var cpd = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var rd = parseFloat($.trim($("#txtRewardAmount").val()).replace(/[^0-9\.]+/g, ""));
                //  var q = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var tt = parseFloat($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, ""));
                if (tt != 0.00) {
                    var sum = tt - oldd - rd - cpd;
                    $("#txtTotalCost").val(sum);
                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            });
            $(".num-pallets-input").live('blur', function(e) {
                $(this).parents('.cssClassQTYInput').find('.lblNotification').html('');
                $(this).val($(this).attr('addedValue'));
                var subTotalAmount = 0.00;
                var cartId = parseInt($(this).attr("cartID"));
                $(this).closest('tr').find("#txtRowTotal_" + cartId + "").val($(this).val() * $(this).attr("price"));
                $(".row-total-input").each(function() {
                    subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^0-9\.]+/g, ""));
                });
                $(".total-box").val('').attr("value", subTotalAmount.toFixed(2));
                ItemSubtotal = parseFloat(subTotalAmount).toFixed(2);
                $("#txtTotalCost").val((parseFloat($(".total-box").val())).toFixed(2));
                var cpd = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var rd = parseFloat($.trim($("#txtRewardAmount").val()).replace(/[^0-9\.]+/g, ""));
                //  var q = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var tt = parseFloat($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, ""));
                if (tt != 0.00) {
                    var sum = tt - oldd - rd - cpd;
                    $("#txtTotalCost").val(sum);
                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            });

            $(".num-pallets-input").live("keypress", function(e) {

                if (allowOutStockPurchaseSetting.toLowerCase() == 'false') {
                    if (eval($(this).attr("actualQty")) <= 0) {
                        return false;
                    } else {
                        if ((e.which >= 48 && e.which <= 57)) {
                            var num;
                            if (e.which == 48)
                                num = 0;
                            if (e.which == 49)
                                num = 1;
                            if (e.which == 50)
                                num = 2;
                            if (e.which == 51)
                                num = 3;
                            if (e.which == 52)
                                num = 4;
                            if (e.which == 53)
                                num = 5;
                            if (e.which == 54)
                                num = 6;
                            if (e.which == 55)
                                num = 7;
                            if (e.which == 56)
                                num = 8;
                            if (e.which == 57)
                                num = 9;

                            var initQtyTxtBox = 0;
                            var totquantityInCart = 0;
                            var itemId = $(this).attr("itemID");
                            if ($(this).attr("costVariantID") != '') {
                                $(".num-pallets-input[itemID=" + itemId + "]").each(function() {
                                    if ($(this).val() != '') {
                                        initQtyTxtBox += eval($(this).val());
                                    }


                                });
                                totquantityInCart = eval($(this).attr("quantityInCart"));
                            } else {
                                totquantityInCart = eval($(this).attr("quantityInCart"));
                            }

                            var itemCostVariantIDs = $.trim($(this).attr("costvariantid"));
                            if (itemCostVariantIDs == '' || itemCostVariantIDs == undefined) {
                                itemCostVariantIDs = 0;
                            }
                            var itemQuantityInCart = AspxCart.CheckItemQuantityInCart(itemId, itemCostVariantIDs + '@');
                            if (itemQuantityInCart != 0.1) { //to test if the item is downloadable or simple(0.1 downloadable)
                                //console.debug((eval(($(this).val() + '' + num)) + itemQuantityInCart - totquantityInCart));
                                if ((eval(($(this).val() + '' + num)) + itemQuantityInCart - totquantityInCart) > eval($(this).attr("actualQty"))) {
                                    // csscody.alert('<h2>Information Message</h2><p>The Quantity Is Greater Than The Available Quantity.</p>');
                                    $(this).parents('.cssClassQTYInput').find('.lblNotification:eq(0)').html(getLocale(AspxCartLocale, 'The Quantity Is Greater Than The Available Quantity.'));
                                    return false;

                                } else {
                                    $(this).parents('.cssClassQTYInput').find('.lblNotification').html('');
                                }
                            }
                            //}
                        }

                    }
                }

                if ($(this).val() == "") {
                    if (e.which != 8 && e.which != 0 && (e.which < 49 || e.which > 57)) {
                        return false;
                    }
                } else {
                    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                        return false;
                    }
                }
                if (num != undefined) {
                    $(this).attr("addedValue", eval(($(this).val() + '' + num)));
                } else {
                    if ((e.which >= 48 && e.which <= 57)) {
                        var num;
                        if (e.which == 48)
                            num = 0;
                        if (e.which == 49)
                            num = 1;
                        if (e.which == 50)
                            num = 2;
                        if (e.which == 51)
                            num = 3;
                        if (e.which == 52)
                            num = 4;
                        if (e.which == 53)
                            num = 5;
                        if (e.which == 54)
                            num = 6;
                        if (e.which == 55)
                            num = 7;
                        if (e.which == 56)
                            num = 8;
                        if (e.which == 57)
                            num = 9;
                        $(this).attr('addedValue', eval($(this).val() + '' + num));
                    }
                }
            });

            $(".num-pallets-input").live("keyup", function(e) {

                var ItemPriceSubtotal = 0.00;
                subTotalAmount = 0;
                var cartId = parseInt($(this).attr("cartID"));
                $(this).closest('tr').find("#txtRowTotal_" + cartId + "").val($(this).val() * $(this).attr("price"));
                $(".row-total-input").each(function() {
                    //console.debug($(this).val());
                    subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^0-9\.]+/g, ""));

                });
                $(".total-box").val('').attr("value", subTotalAmount.toFixed(2));
                ItemSubtotal = parseFloat(subTotalAmount).toFixed(2);
                //  $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                // var totalTax = 0.00;
                //$(".num-pallets-input").each(function() {
                //totalTax += ($(this).val() * $(this).attr("rate"));
                //});

                //$("#txtTotalTax").val('').val(totalTax * rate);

                //$(".tax-box").val('').attr("value", (totalTax * rate).toFixed(2));
                //$("#txtTotalCost").val(parseFloat($(".total-box").val()));
                $("#txtTotalCost").val((parseFloat($(".total-box").val().replace(/[^0-9\.]+/g, ""))).toFixed(2));
                var cpd = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var rd = parseFloat($.trim($("#txtRewardAmount").val()).replace(/[^0-9\.]+/g, ""));
                //  var q = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var tt = parseFloat($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, ""));
                if (tt != 0.00) {
                    var sum = tt - oldd - rd - cpd;
                    $("#txtTotalCost").val(sum);
                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            });
            //$(".num-pallets-input").blur();
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            // $(".num-pallets-input").focus().focusout();

        },
        RefreshCartOnDelete: function() {
            //TO DO: reset session variable for discount
            // AspxCart.ResetCouponSession("DiscountAmount,CouponSessionPercentAmount");
            if ($("#lnkMyCart").length > 0) {
                HeaderControl.GetCartItemTotalCount(); //for header cart count from database
            }
            if ($("#lnkShoppingBag").length > 0) {
                ShopingBag.GetCartItemCount();
                ShopingBag.GetCartItemListDetails(); //for details in shopping bag
            }
            if ($("#divRelatedItems").length > 0) {

                YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
            }
            AspxCart.GetUserCartDetails();
            //  getdiscount();
            //csscody.info("<h2>Successful Message</h2><p>Cart's item has been deleted successfully.</p>");
        },
        RefreshCartOnClear: function() {
            //  AspxCart.ResetCouponSession("DiscountAmount,CouponApplied,CouponSessionAmount,CouponSessionPercentAmount,IsCouponInPercent");
            AspxCart.ResetCouponSession("CouponCode,DiscountAmount,CouponApplied,CouponSessionAmount,CouponDiscountAmount,IsCouponInPercent,CouponPercentValue,CouponSessionPercentAmount");
            if ($("#lnkMyCart").length > 0) {
                HeaderControl.GetCartItemTotalCount(); //for header cart count from database
            }
            if ($("#lnkShoppingBag").length > 0) {
                ShopingBag.GetCartItemCount();
                ShopingBag.GetCartItemListDetails(); //for details in shopping bag
            }
            if ($("#divRelatedItems").length > 0) {
                YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
            }

            AspxCart.GetUserCartDetails();
            //getdiscount();
            // csscody.info("<h2>Successful Message</h2><p>Cart's items has been cleared successfully.<p>");
        },
        SetItemQuantityInCart: function(msg) {
            itemQuantityInCart = msg.d;
        },
        VerifyCoupon: function(msg) {
            var item = msg.d;
            if (item.Verification) {
                // UpdateCouponUserRecord(item.CouponID);
                //AspxCart.GetSessionCouponCode('CouponCode');
                if (!sessionCouponCodeFlag) {
                    AspxCart.SetSessionValue('CouponCode', couponCode);
                    AspxCart.AddCouponAppliedCount('CouponApplied', 0);
                    if (item.IsForFreeShipping.toLowerCase() == "yes") {
                        $("#txtShippingTotal").val(0.00);
                        AspxCart.SetSessionValue('IsFreeShipping', 'true');
                        $("#txtCouponCode").val('');
                        csscody.info("<h2>" + getLocale(AspxCartLocale, 'Information Message') + '</h2><p>' + getLocale(AspxCartLocale, "Congratulation! you need not to worry about shipping cost. It's free!!") + "</p>");

                    } else {
                        var couponAmount;
                        var actualAmount = parseFloat($("#txtTotalCost").val().replace(/[^0-9\.]+/g, ""));
                        var newCouponSessionValue;
                        if (item.IsPercentage == true) {
                            couponAmount = (actualAmount * (item.CouponAmount) / 100).toFixed(2);
                            AspxCart.SetSessionValue('IsCouponInPercent', 1);
                            AspxCart.SetSessionValue('CouponPercentValue', item.CouponAmount);
                            //    AspxCart.SetSessionValue('CouponSessionPercentAmount', couponAmount);
                            //    couponSessionAmount = item.CouponAmount;
                            AspxCart.GetCouponInPercentStatus('IsCouponInPercent');
                            AspxCart.GetCouponDiscountAmount('CouponSessionPercentAmount');
                            newCouponSessionValue = (parseFloat(couponSessionPercentAmount) + parseFloat(couponAmount));
                            newCouponSessionValue = newCouponSessionValue / rate;
                            AspxCart.SetSessionValue('CouponSessionPercentAmount', newCouponSessionValue.toFixed(2));
                        } else {
                            AspxCart.SetSessionValue('IsCouponInPercent', 0);
                            couponAmount = item.CouponAmount.toFixed(2);
                            AspxCart.GetCouponDiscountAmount('CouponSessionAmount');
                            newCouponSessionValue = (parseFloat(couponSessionAmount) + parseFloat(couponAmount));
                            // newCouponSessionValue = newCouponSessionValue / rate;
                            AspxCart.SetSessionValue('CouponSessionAmount', newCouponSessionValue);
                            //AspxCart.SetSessionValue('CouponSessionAmount', couponAmount);
                        }
                        //   $("#txtDiscountAmount").val(parseFloat($("#txtDiscountAmount").val().replace(/[^0-9\.]+/g, "")) + parseFloat(couponAmount * rate));
                        $("#txtDiscountAmount").val(parseFloat($("#txtDiscountAmount").val().replace(/[^0-9\.]+/g, "")));
                        $("#trCouponDiscount").show();
                        if (couponAmount > 0) {
                            $("#trCouponDiscount").show();
                        } else {
                            $("#trCouponDiscount").hide();
                        }
                        if (item.IsPercentage == true) {
                            $("#txtCouponDiscountAmount").val(parseFloat(couponSessionPercentAmount == 0 ? couponAmount : parseFloat((parseFloat(couponAmount) + couponSessionPercentAmount * rate))));
                            $("#txtTotalCost").val((parseFloat($("#txtTotalCost").val().replace(/[^0-9\.]+/g, ""))) - parseFloat(couponAmount));

                        } else {
                            $("#txtCouponDiscountAmount").val(couponSessionAmount == 0 ? couponAmount * rate : parseFloat((parseFloat(couponAmount) + couponSessionAmount)));
                            $("#txtTotalCost").val((parseFloat($("#txtTotalCost").val().replace(/[^0-9\.]+/g, ""))) - parseFloat(couponAmount * rate));

                        }

                        $("#txtCouponCode").val('');
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        if (item.IsPercentage == true) {
                            csscody.info("<h2>" + getLocale(AspxCartLocale, "Information Message") + "</h2><p>" + getLocale(AspxCartLocale, "Congratulation! you have got discount amount of") + ' ' + item.CouponAmount + "%.</p>");
                        } else {
                            csscody.info("<h2>" + getLocale(AspxCartLocale, "Information Message") + "</h2><p>" + getLocale(AspxCartLocale, "Congratulation! you have got discount amount of") + ' ' + "<span class='cssClassFormatCurrency'>" + item.CouponAmount * rate + "</span>.</p>");
                        }
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        AspxCart.SetSession();
                    }
                } else {
                    csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Coupon code is already used, Multiple coupon is not allowed.") + "</p>");
                    $("#txtCouponCode").val('');
                }
            } else {
                csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Coupon is either invalid, expired, reached it's usage limit or exceeded your cart total purchase amount!") + "</p>");
                $("#txtCouponCode").val('');
            }
        },
        CouponUserUpdateMsg: function() {
            csscody.info("<h2>" + getLocale(AspxCartLocale, "Successful Message") + "</h2><p>" + getLocale(AspxCartLocale, "Coupon user has been updated successfully.") + "</p>");
        },
        OnSessionVariableSet: function() {
            return true;
        },
        SetCartPriceDiscount: function(msg) {
            AspxCart.Vars.CartPriceDiscount = msg.d;

        },
        SetCouponInPercentStatus: function(msg) {
            isCouponPercent = msg.d;
        },
        SetCouponDiscountAmt: function(msg) {
            if (isCouponPercent == 1) {
                couponSessionPercentAmount = msg.d;
            } else {
                couponSessionAmount = msg.d;
            }
        },
        SetCouponPercentValue: function(msg) {
            couponPercentValue = msg.d;
        },
        SetSessionCouponCode: function(msg) {
            if (couponCode == msg.d || msg.d == "") {
                sessionCouponCodeFlag = false;
            } else {
                sessionCouponCodeFlag = true;
            }
        },
        OnResetCouponSession: function() {
            return true;
        },

        //ajaxFailure: function() {
        //switch (AspxCart.config.error) {
        // case 1://see later
        // csscody.error('<h2>' + getLocale(AspxCartLocale, "Error Message") + '</h2><p>' + getLocale(AspxCartLocale, 'Failed to update cart!') + '</p>');
        // break;
        GetCartDetailsErrorMsg: function() {
            csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Failed to load cart's details!") + "</p>");
        },
        DeleteCartItemErrorMsg: function() {
            csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Failed to delete cart's items!") + "</p>");
        },
        ClearCartItemsErrorMsg: function() {
            csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Failed to clear cart's items!") + "</p>");
        },
        CouponUserRecordErrorMsg: function() {
            csscody.error('<h2>' + getLocale(AspxCartLocale, 'Error Message') + "</h2><p>" + getLocale(AspxCartLocale, "Failed to update coupon user!") + '</p>');
        },

        UpdateCart: function(cartItemId, cartID, quantity) {
            var updateCartInfo = {
                CartID: cartID,
                CartItemIDs: cartItemId,
                Quantities: quantity,
                AllowOutOfStock: allowOutStockPurchaseSetting.toLowerCase()
            };
            this.config.method = "AspxCommerceWebService.asmx/UpdateShoppingCart";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ updateCartInfo: updateCartInfo, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = AspxCart.RefreshCartOnUpdate;
            this.ajaxCall(this.config);

        },
        QuantitityDiscountAmount: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetDiscountQuantityAmount";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = AspxCart.SetDiscountQuantityAmount;
            this.ajaxCall(this.config);

        },
        getdiscount: function(sessionVariable) {
            this.config.method = "AspxCommerceWebService.asmx/GetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionVariable });
            this.config.ajaxCallMode = AspxCart.SetSessionData;
            this.ajaxCall(this.config);

        },
        GetCouponInPercentStatus: function(sessionVariable) {
            this.config.method = "AspxCommerceWebService.asmx/GetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionVariable });
            this.config.ajaxCallMode = AspxCart.SetCouponInPercentStatus;
            this.ajaxCall(this.config);
        },
        GetCouponDiscountAmount: function(sessionVariable) {
            this.config.method = "AspxCommerceWebService.asmx/GetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionVariable });
            this.config.ajaxCallMode = AspxCart.SetCouponDiscountAmt;
            this.ajaxCall(this.config);
        },
        GetCouponPercentValue: function(sessionVariable) {
            this.config.method = "AspxCommerceWebService.asmx/GetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionVariable });
            this.config.ajaxCallMode = AspxCart.SetCouponPercentValue;
            this.ajaxCall(this.config);
        },
        SetCostVartSession: function(obj) {
            if ($(obj).attr("costvariants") != null) {
                itemCostVariantData = $(obj).attr("costvariants");
                $.session("ItemCostVariantData", 'empty');
                $.session("ItemCostVariantData", itemCostVariantData);
            }
        },
        GetUserCartDetails: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetCartDetails";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = AspxCart.BindCartDetails;
            this.config.error = AspxCart.GetCartDetailsErrorMsg;
            this.ajaxCall(this.config);

        },
        GetSessionCouponCode: function(sessionVariable) {
            this.config.method = "AspxCommerceWebService.asmx/GetSessionCouponCode";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionVariable });
            this.config.ajaxCallMode = AspxCart.SetSessionCouponCode;
            this.ajaxCall(this.config);
            return sessionCouponCodeFlag;
        },
        GetDiscountCartPriceRule: function(CartID, SpCost) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.SessionCode = null;
            this.config.method = "AspxCommerceWebService.asmx/GetDiscountPriceRule";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ cartID: CartID, aspxCommonObj: aspxCommonInfo, shippingCost: SpCost });
            this.config.ajaxCallMode = AspxCart.SetCartPriceDiscount;
            this.ajaxCall(this.config);
        },

        DeleteCartItem: function(cartId, cartItemId, event) {
            if (event) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CultureName = null;
                aspxCommonInfo.UserName = null;
                this.config.method = "AspxCommerceWebService.asmx/DeleteCartItem";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ cartID: cartId, cartItemID: cartItemId, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = AspxCart.RefreshCartOnDelete;
                this.config.error = AspxCart.DeleteCartItemErrorMsg;
                this.ajaxCall(this.config);
            }
        },
        ClearCartItems: function(event) {
            if (event) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CultureName = null;
                aspxCommonInfo.UserName = null;
                var cartID = $("#tblCartList .ClassDeleteCartItems").attr("cartid");
                this.config.method = "AspxCommerceWebService.asmx/ClearAllCartItems";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ cartID: cartID, customerID: aspxCommonObj().CustomerID, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = AspxCart.RefreshCartOnClear;
                this.config.error = AspxCart.ClearCartItemsErrorMsg;
                this.ajaxCall(this.config);
            }
        },
        CheckItemQuantityInCart: function(itemId, itemCostVariantIDs) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.CultureName = null;
            aspxCommonInfo.UserName = null;
            this.config.method = "AspxCommerceWebService.asmx/CheckItemQuantityInCart";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonInfo, itemCostVariantIDs: itemCostVariantIDs });
            this.config.ajaxCallMode = AspxCart.SetItemQuantityInCart;
            this.config.error = 7;
            this.ajaxCall(this.config);
            return itemQuantityInCart;
        },
        VerifyCouponCode: function(itemIds, cartItemIds) {
            couponCode = $.trim($("#txtCouponCode").val());
            var totalCost = ($("#txtTotalCost").val().replace(/[^0-9\.]+/g, "")) / rate;
            if (couponCode == "") {
                csscody.alert("<h2>" + getLocale(AspxCartLocale, 'Information Alert') + "</h2><p>" + getLocale(AspxCartLocale, "Please enter coupon code!") + "</p>");
                return false;
            } else {
                var aCount = '';
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/GetSessionVariable",
                    data: JSON2.stringify({ key: 'CouponApplied' }),
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function(msg) {
                        // alert(msg.d);
                        //console.debug(msg.d);
                        var x = parseInt(msg.d);
                        aCount = x;
                    },
                    error: function() {
                        csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Sorry! error occured!") + "</p>");
                    }
                });

                if (aCount != 0) {
                    aCount = parseInt(aCount) + 1;
                }
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CultureName = null;
                aspxCommonInfo.CustomerID = null;
                aspxCommonInfo.SessionCode = null;
                this.config.method = "AspxCommerceWebService.asmx/VerifyCouponCode";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ totalCost: totalCost, couponCode: couponCode, itemIds: itemIds, cartItemIds: cartItemIds, aspxCommonObj: aspxCommonInfo, appliedCount: aCount });
                this.config.ajaxCallMode = AspxCart.VerifyCoupon;
                this.config.error = 8;
                this.ajaxCall(this.config);
            }
        },
        AddCouponAppliedCount: function(sessionKey, sessionValue) {
            this.config.method = "AspxCommerceWebService.asmx/SetSessionVariableCoupon";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue });
            this.config.ajaxCallMode = "";
            this.config.error = 9;
            this.ajaxCall(this.config);

        },
        //        UpdateCouponUserRecord: function(id) {
        //            this.config.method = "AspxCommerceWebService.asmx/UpdateCouponUserRecord";
        //            this.config.url = this.config.baseURL + this.config.method;
        //            this.config.data = JSON2.stringify({ couponCode: id, storeID: storeId, portalID: portalId, userName: userName });
        //            this.config.ajaxCallMode = AspxCart.CouponUserUpdateMsg;
        //            this.config.error = AspxCart.CouponUserRecordErrorMsg;
        //            this.ajaxCall(this.config);
        //        },
        SetSessionValue: function(sessionKey, sessionValue) {
            this.config.method = "AspxCommerceWebService.asmx/SetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue });
            this.config.ajaxCallMode = AspxCart.OnSessionVariableSet;
            this.config.error = 11;
            this.ajaxCall(this.config);
        },
        SetSession: function() {
            var totalCost = ($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, "")) / rate;
            if ((eval($.trim($("#txtTotalCost").val()).replace(/[^0-9\.]+/g, "")) / rate) < eval(minCartSubTotalAmountSetting)) {
                csscody.alert('<h2>' + getLocale(AspxCartLocale, 'Information Message') + '</h2><p>' + getLocale(AspxCartLocale, 'You are not eligible to proceed further. Your order amount must be at least') + ' ' + "<span class='cssClassFormatCurrency'>" + minOrderAmountSetting + '</span></p>');
                $("a").removeAttr("href");
                return false;
            }
            AspxCart.SetSessionValue("DiscountAmount", (parseFloat(($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""))) / rate) - parseFloat(AspxCart.Vars.CartPriceDiscount));
        },
        ResetCouponSession: function(sessionKey) {
            this.config.method = "AspxCommerceWebService.asmx/ClearSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionKey });
            this.config.ajaxCallMode = AspxCart.OnResetCouponSession;
            this.config.error = 25;
            this.ajaxCall(this.config);
        },
        GetGeneralSettings: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "GetGeneralSetting";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.async = false;
            this.config.ajaxCallMode = AspxCart.BindGeneralSettings;
            this.config.error = AspxCart.GeneralSettingsError;
            this.ajaxCall(this.config);
        },
        BindGeneralSettings: function(msg) {
            if (msg.d) {
                $.each(msg.d, function(index, item) {
                    if (item.IsActive) {
                        //alert(item.IsActive);
                        maxRewardPoints = item.TotalRewardPoints;
                        $("#hdnRate").val(item.RewardExchangeRate / item.RewardPoints);
                        $("#hdnRewardRate").val(item.RewardPointsEarned / item.AmountSpent);
                        $("#hdnTotalRewardAmount").val(item.TotalRewardAmount);
                        $("#hdnTotalRewardPoints").val(item.TotalRewardPoints);
                        $("#hdnMinRedeemBalance").val(item.MinRedeemBalance);
                        $("#hdnCapped").val(item.BalanceCapped);
                        $("#spanCapped").html(item.BalanceCapped);
                        $("#spanTotalRewardPoints").html(item.TotalRewardPoints);
                        $("#spanTotalRewardAmount").html(item.TotalRewardAmount * rate);
                        $("#spanRPExchangePoints").html(item.RewardPoints);
                        $("#spanRPExchangeAmount").html(item.RewardExchangeRate * rate);
                        $("#spanTotalRP").html(item.TotalRewardPoints);
                        $("#spanTotalRA").html(item.TotalRewardAmount * rate);
                        $(".divRange").show();
                        $("#dvUsePoints").show();
                        $('#dvRewardPointsMain').show();
                        $('#trDiscountReward').show();
                        AspxCart.RewardRuleIsActive();
                        $("#slider-range").slider({
                            range: true,
                            min: minRewardPoints,
                            max: maxRewardPoints,
                            values: [minRewardPoints, maxRewardPoints],
                            slide: function(event, ui) {
                                $("#amount").html("<span>" + ui.values[0] + "</span>" + " - " + "<span>" + ui.values[1] + "</span>");
                            },
                            change: function(event, ui) {
                                $("#amount").html("<span>" + ui.values[0] + "</span>" + " - " + "<span>" + ui.values[1] + "</span>");

                            }
                        });
                        $("#amount").html("<span>" + $("#slider-range").slider("values", 0) + "</span>" +
                            " - " + "<span>" + $("#slider-range").slider("values", 1) + "</span>");
                    }

                });
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            }
        },
        GeneralSettingsError: function() {
            csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Failed to load rewward points setting values!") + "</p>");
        },
        IsModuleInstalled: function() {
            //if (isRewardPointEnbled) {
            var rewardPoints = 'AspxRewardPoints';
            $.ajax({
                type: "POST",
                url: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/" + "GetModuleInstallationInfo",
                data: JSON2.stringify({ moduleFriendlyName: rewardPoints, aspxCommonObj: aspxCommonObj() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function(response) {
                    if (response.d) {
                        isRewardPointEnbled = true;
                        AspxCart.GetGeneralSettings();
                    }
                },
                error: function() {
                    csscody.error('<h2>' + getLocale(AspxCartLocale, 'Error Message') + '</h2><p>' + getLocale(AspxCartLocale, 'Failed to load module installation information!.') + '</p>');
                }
            });
            //}
        },

        RewardRuleIsActive: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "IsPurchaseActive";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = AspxCart.RewardRuleBind;
            this.config.error = AspxCart.RewardRuleError;
            this.ajaxCall(this.config);
        },

        RewardRuleBind: function(msg) {
            if (msg.d) {
                isPurchaseActive = msg.d;
            }
            if (isPurchaseActive) {
                $('#dvRPCurrent').show();
            }
        },
        RewardRuleError: function() {
            csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Failed to bind reward rules!") + "</p>");
        },
        SetSessionValueForReward: function(sessionKey, sessionValue) {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "SetSessionVariable";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue });
            this.config.ajaxCallMode = AspxCart.OnSessionVariableSet;
            this.config.error = 11;
            this.ajaxCall(this.config);
        },
        Init: function() {
            //  AspxCart.SetSessionValueForReward('btnRewardPoints', false);
            // AspxCart.SetSessionValueForReward('chkRewardPoints', false);
            $(".divRange").append('<p><b style="color: #006699;margin-left:10px">' + getLocale(AspxCartLocale, "Reward Points Range: ") + '<span id="amount"></span></b></p>');
            //for multi address check out
            $("#divCheckOutMultiple").click(function() {
                if ($(".cssClassBlueBtn ").length > 0) {
                    if ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, "") < 0) {
                        csscody.alert("<h2>" + getLocale(AspxHeaderControl, "Information Alert") + "</h2><p>" + getLocale(AspxHeaderControl, "You can't proceed to checkout your amount is not applicable!") + "</p>");
                        return false;
                    }
                }
                var totalCartItemPrice = HeaderControl.GetTotalCartItemPrice();
                if (totalCartItemPrice == 0) {
                    csscody.alert("<h2>" + getLocale(AspxHeaderControl, "Information Alert") + "</h2><p>" + getLocale(AspxHeaderControl, "You have not added any items in cart yet!") + "</p>");
                    AspxCart.GetUserCartDetails();
                    return false;
                }
                if (totalCartItemPrice < minCartSubTotalAmountSetting) {
                    csscody.alert("<h2>" + getLocale(AspxHeaderControl, "Information Alert") + "</h2><p>" + getLocale(AspxHeaderControl, "You are not eligible to proceed further. Your order amount must be at least") + "<span class='cssClassFormatCurrency'>" + minCartSubTotalAmountSetting + "</span></p>");

                } else {
                    var multipleAddressLink = '';
                    if (userFriendlyURL) {
                        multipleAddressLink = MultipleAddressChkOutURL + pageExtension;
                    } else {
                        multipleAddressLink = MultipleAddressChkOutURL;
                    }
                    if (aspxCommonObj().CustomerID > 0 && aspxCommonObj().UserName.toLowerCase() != 'anonymoususer') {

                        window.location = AspxCommerce.utils.GetAspxRedirectPath() + multipleAddressLink;

                    } else {
                        if (allowAnonymousCheckOutSetting.toLowerCase() == 'true') {
                            window.location = AspxCommerce.utils.GetAspxRedirectPath() + multipleAddressLink;

                        } else {
                            csscody.alert('<h2>' + getLocale(AspxHeaderControl, 'Information Alert') + '</h2><p>' + getLocale(AspxHeaderControl, 'Checkout is not allowed for anonymous user!') + '</p>');
                        }
                    }

                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            });

            $("#btnUsePoints").bind("click", function() {
                rewardAmounTemp = "";
                //AspxCart.SetSessionValueForReward('chkRewardPoints', false);
                $("#chkUseRewardPoints").attr("checked", false);
                var points = $('#slider-range').slider("option", "values");
                var itemSumTotal = 0.00;
                var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var cpn = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                itemSumTotal = parseFloat(eval(ItemSubtotal) - eval(oldd) - eval(cpn)).toFixed(2);
                rewardAmounTemp = points[0] * parseFloat($("#hdnRate").val()).toFixed(2);
                var totalRP = points[0];
                var totalRA = points[0] * parseFloat($("#hdnRate").val()).toFixed(2) * rate;
                var minRedeem = parseFloat($("#hdnMinRedeemBalance").val()).toFixed(2);             
                if (eval(totalRP) >= eval(minRedeem)) {
                    if (eval(itemSumTotal) > eval(totalRA)) {
                        // AspxCart.SetSessionValueForReward('btnRewardPoints', true);
                        AspxCart.SetSessionValueForReward('btnRewardPointsValue', totalRP);
                        $("#txtRewardAmount").val(totalRA);
                        //AspxCart.GetUserCartDetails();
                        $("#txtTotalCost").val(itemSumTotal - totalRA);
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    }
                    else {
                        csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Item subtotal should be more than reward amount.!") + "</p>");
                        // AspxCart.SetSessionValueForReward('btnRewardPoints', false);
                        AspxCart.SetSessionValueForReward('btnRewardPointsValue', 0);
                    }
                }
                else {
                    csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Your minimum redeem balance should be ") + minRedeem + getLocale(AspxCartLocale, " reward points") + "</p>");
                    // AspxCart.SetSessionValueForReward('btnRewardPoints', false);
                    AspxCart.SetSessionValueForReward('btnRewardPointsValue', 0);
                }

            });
            $("#chkUseRewardPoints").live("change", function() {
                rewardAmounTemp = "";
                // AspxCart.SetSessionValueForReward('btnRewardPoints', false);
                //AspxCart.SetSessionValueForReward('btnRewardPointsValue', 0);
                var itemSumTotal = 0.00;
                var oldd = parseFloat($.trim($("#txtDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                var cpn = parseFloat($.trim($("#txtCouponDiscountAmount").val()).replace(/[^0-9\.]+/g, ""));
                itemSumTotal = parseFloat(eval(ItemSubtotal) - eval(oldd) - eval(cpn)).toFixed(2);

                rewardAmounTemp = parseFloat($("#hdnTotalRewardAmount").val()).toFixed(2);
                var totalRA = parseFloat($("#hdnTotalRewardAmount").val()).toFixed(2) * rate;
                var totalRP = parseFloat($("#hdnTotalRewardPoints").val()).toFixed(2);
                var minRedeem = parseFloat($("#hdnMinRedeemBalance").val()).toFixed(2);

                if (this.checked) {
                    if (eval(totalRP) >= eval(minRedeem)) {
                        if (eval(itemSumTotal) > eval(totalRA)) {
                            AspxCart.SetSessionValueForReward('btnRewardPointsValue', totalRP);
                            $("#txtRewardAmount").val(parseFloat(totalRA).toFixed(2));
                            $('#slider-range').slider("option", "values", [totalRP, totalRP]);
                            //  AspxCart.GetUserCartDetails();
                            $("#txtTotalCost").val(itemSumTotal - totalRA);
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        }
                        else {
                            csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Item subtotal should be more than reward amount.!") + "</p>");
                            // AspxCart.SetSessionValueForReward('btnRewardPoints', false);
                            AspxCart.SetSessionValueForReward('btnRewardPointsValue', 0);
                            $("#chkUseRewardPoints").attr("checked", false);
                        }
                    }
                    else {
                        csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Alert") + "</h2><p>" + getLocale(AspxCartLocale, "Your minimum redeem balance should be ") + minRedeem + getLocale(AspxCartLocale, " reward points") + "</p>");
                        $("#chkUseRewardPoints").attr("checked", false);
                        // AspxCart.SetSessionValueForReward('chkRewardPoints', false);
                        $("#txtRewardAmount").val(0.00);
                        // AspxCart.GetUserCartDetails();
                    }
                }
                else {
                    $("#txtTotalCost").val(eval(itemSumTotal));
                    AspxCart.SetSessionValueForReward('btnRewardPointsValue', 0);
                    $('#slider-range').slider("option", "values", [0, totalRP]);
                    $("#txtRewardAmount").val(0.00);
                    // AspxCart.GetUserCartDetails();
                }

            });

            // $('.num-pallets-input').val('');
            if (userFriendlyURL) {

                $("#lnkContinueShopping").bind("click", function() {
                    window.location.href = aspxRedirectPath + homeURL + pageExtension;
                });
            } else {
                $("#lnkContinueShopping").bind("click", function() {
                    window.location.href = aspxRedirectPath + homeURL;
                });
            }

            $("#txtCouponCode").val('');
            //if ( customerId > 0 && userName.toLowerCase() != 'anonymoususer' && allowMultipleAddShippingSetting.toLowerCase() == 'true') {
            if (aspxCommonObj().CustomerID > 0 && aspxCommonObj().UserName.toLowerCase() != 'anonymoususer' && allowMultipleAddShippingSetting.toLowerCase() == 'true') {
                $("#divCheckOutMultiple").show();
            }

            $("#btnSubmitCouponCode").bind("click", function() {
                var itemIds = "";
                var cartItemIds = "";
                $(".num-pallets-input").each(function() {
                    itemIds += $(this).attr("itemID") + ',';
                    cartItemIds += $(this).attr("id") + ',';
                    cartItemIds = cartItemIds.replace("txtQuantity_", "");
                });
                itemIds = itemIds.substr(0, itemIds.length - 1);
                cartItemIds = cartItemIds.substr(0, cartItemIds.length - 1);
                AspxCart.VerifyCouponCode(itemIds, cartItemIds);
            });

            $("#btnClear").bind("click", function() {
                var properties = {
                    onComplete: function(e) {
                        AspxCart.ClearCartItems(e);
                    }
                };
                // Ask user's confirmation before delete records
                csscody.confirm("<h2>" + getLocale(AspxCartLocale, 'Delete Confirmation') + "</h2><p>" + getLocale(AspxCartLocale, "Are you sure you want to clear all cart's items?") + "</p>", properties);
            });

            $("#btnUpdateShoppingCart").bind("click", function() {
                var cartItemId = '';
                var quantity = '';
                var cartID = 0;
                var updateCart = true;

                $(".num-pallets-input").each(function() {
                    if ($(this).val() == "" || $(this).val() <= 0) {
                        updateCart = false;
                        //alert("Invalid quantity");
                        return false;
                    }
                    var totQtyInTxtBox = parseInt($.trim($(this).val()));
                    var initQtyInCart = parseInt($(this).attr("quantityincart"));
                    var itemId = $(this).attr("itemID");
                    var itemCostVariantIDs = $.trim($(this).attr("costvariantid"));
                    var itemQuantityInCart = AspxCart.CheckItemQuantityInCart(itemId, itemCostVariantIDs + '@');

                    // debugger;
                    if (itemQuantityInCart != 0.1) { //to test if the item is downloadable or simple(-0.1 downloadable)
                        if (allowOutStockPurchaseSetting.toLowerCase() == 'false') {
                            if (parseInt(totQtyInTxtBox + itemQuantityInCart - initQtyInCart) > parseInt($.trim($(this).attr("actualQty")))) {
                                // csscody.alert('<h2>Information Message</h2><p>The Quantity Is Greater Than The Available Quantity.</p>');
                                $(this).parents('.cssClassQTYInput').find('.lblNotification:eq(0)').html(getLocale(AspxCartLocale, 'The Quantity Is Greater Than The Available Quantity.'));
                                updateCart = false;
                                return false;
                            }
                        } else {
                            $(this).parents('.cssClassQTYInput').find('.lblNotification').html('');
                            updateCart = true;
                        }
                    }
                });
                if (updateCart == true) {
                    $(".num-pallets-input").each(function() {
                        cartItemId += parseInt($(this).attr("id").replace(/[^0-9]/gi, '')) + ',';
                        quantity += $(this).val() + ',';
                        cartID = $(this).attr("cartID");
                    });
                    AspxCart.UpdateCart(cartItemId, cartID, quantity);
                } else {
                    csscody.alert("<h2>" + getLocale(AspxCartLocale, "Information Message") + "</h2><p>" + getLocale(AspxCartLocale, 'Your cart contains invalid quantity!') + "</p>");
                }
            });

            // AspxCart.GetUserCartDetails();
            $('.cssClassCouponHelp').hide();
            $('#txtCouponCode').bind("focus", function() {
                $('.cssClassCouponHelp').show();
            });
            $('#txtCouponCode').bind("focusout", function() {
                $('.cssClassCouponHelp').hide();
            });
        }
    };
    AspxCart.Init();
});
    
