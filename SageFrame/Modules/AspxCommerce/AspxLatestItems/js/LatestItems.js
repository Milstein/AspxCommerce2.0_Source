function SwapImageOnMouseOver(id, altImage) {
    $('#' + id).attr('src', altImage);
}
function SwapImageOnMouseOut(id, altImage) {
    $('#' + id).attr('src', altImage);
}
Variable = function(height, width, thumbWidth, thumbHeight) {
    this.height = height;
    this.width = width;
    this.thumbHeight = thumbHeight;
    this.thumbWidth = thumbWidth;
};
var newObject = new Variable(255, 320, 87, 75);
var LatestItems = "";
var costVariantValueIDs = "";
$(document).ready(function() {
    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
    $('.divitemImage a img[title]').tipsy({ gravity: 'n' });
    if ($("#" + tblRecentItems).hasClass('masonry')) {
        $("#" + tblRecentItems).masonry('destroy');
    }
    $("#" + tblRecentItems).imagesLoaded(function() {
        $("#" + tblRecentItems).masonry({
            itemSelector: '.cssClassProductsBox',
            columnWidth: 35
        });
    });
});
$(function() {
    var userModuleID = UsrModuleID;
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var customerId = AspxCommerce.utils.GetCustomerID();
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var sessionCode = AspxCommerce.utils.GetSessionCode();
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var itemId = '';
    var itemName = '';
    var itemSKU = '';
    var RelatedItems = '';
    var arrCostVariants;
    var FormCount = new Array();
    var arrCombination = [];
    var variantValuesID = [];
    var itemTypeId = 0;
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            SessionCode: AspxCommerce.utils.GetSessionCode(),
            CustomerID: AspxCommerce.utils.GetCustomerID()
        };
        return aspxCommonInfo;
    };
    GetCount = function(id) {
        var count = 0;
        for (var i = 0; i < variantValuesID.length; i++) {
            if (variantValuesID[i] == id) {
                count++;
            }
        }
        return count;
    };
    CheckContains = function(checkon, toCheck) {
        var x = checkon.split('@');
        for (var i = 0; i < x.length; i++) {
            if (x[i] == toCheck) {
                return true;
            }
        }
        return false;
    };
    IsExists = function(arr, val) {
        var isExist = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                isExist = true;
                break;
            }
        }
        return isExist;
    };

    function getObjects(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects.push(obj[i][key]);
            }

        }
        return objects;
    }

    function getValByObjects(obj, key, key2, x, y, keyOfValue) {
        var value = '';
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                if (obj[i][key] == x && obj[i][key2] == y) {
                    value = obj[i][keyOfValue];
                }
            }

        }
        return value;
    }

    function getModifiersByObjects(obj, combinationId) {
        var modifiers = { Price: '', IsPricePercentage: false, Weight: '', IsWeightPercentage: false, Quantity: 0 };

        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                if (obj[i]["CombinationID"] == combinationId) {
                    modifiers.Price = obj[i]["CombinationPriceModifier"];
                    modifiers.IsPricePercentage = obj[i]["CombinationPriceModifierType"];
                    modifiers.Weight = obj[i]["CombinationWeightModifier"];
                    modifiers.IsWeightPercentage = obj[i]["CombinationWeightModifierType"];
                    modifiers.Quantity = obj[i]["CombinationQuantity"];
                }
            }

        }
        return modifiers;
    }

    var info = {
        IsCombinationMatched: false,
        AvailableCombination: [],
        CombinationID: 0,
        PriceModifier: '',
        IsPricePercentage: false,
        WeightModifier: '',
        IsWeightPercentage: false,
        Quantity: 0
    };

    function checkAvailibility(elem) {
        var cvids = [];
        var values = [];
        var currentValue = elem == null ? 1 : $(elem).val();
        var currentCostVariant = elem == null ? 1 : $(elem).parents('span:eq(0)').attr('id').replace('subDiv', '');
        $("#divCostVariant select option:selected").each(function() {
            //console.debug(this.value);
            if (this.value != 0) {
                values.push(this.value);
                cvids.push($(this).parents("span:eq(0)").attr('id').replace('subDiv', ''));
            }
        });

        $("#divCostVariant input[type=radio]:checked").each(function() {
            $(this).is(":checked") ? $(this).addClass("cssRadioChecked") : $(this).removeClass("cssRadioChecked");
            values.push(this.value);
            cvids.push($(this).parents("span:eq(0)").attr('id').replace('subDiv', ''));
        });

        $("#divCostVariant input[type=radio]").each(function() {
            $(this).is(":checked") ? $(this).addClass("cssRadioChecked") : $(this).removeClass("cssRadioChecked");
        });

        $("#divCostVariant input[type=checkbox]:checked").each(function() {
            values.push(this.value);
            cvids.push($(this).parents("span:eq(0)").attr('id').replace('subDiv', ''));
        });
        // console.debug("cv combination :" + cvids.join('@'));
        // console.debug("cv values combination :" + values.join('@'));

        var infos = CheckVariantCombination(cvids.join('@'), values.join('@'), currentCostVariant, currentValue);
        //  $("#spnShowAvailability").html(info.IsCombinationMatched == true ? getLocale(AspxLatestItem,'Available') : getLocale(AspxLatestItem,'Not available'));
        $("#spanAvailability").html(info.IsCombinationMatched == true ? '<b>' + getLocale(AspxLatestItem, 'In stock') + '</b>' : '<b>' + getLocale(AspxLatestItem, 'Not Available') + '</b>');
        info.IsCombinationMatched == true ? $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(AspxLatestItem, "Add to Cart")) : $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(AspxLatestItem, "Out Of Stock"));
        if (info.IsCombinationMatched) {
            $("#hdnQuantity").val('').val(info.Quantity);
            $("#txtQty").removeAttr('disabled').attr("enabled", "enabled");
            if (info.Quantity == 0 || info.Quantity < 0) {
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    //$("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html("Out Of Stock");
                    $("#spanAvailability").html("<b>" + getLocale(AspxLatestItem, "Out Of Stock") + "</b>");
                }

            } else {
                //$("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html("Add to Cart");
                $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'In stock') + '</b>' + '</b>');
            }
            var quantityinCart = LatestItems.CheckItemQuantityInCart(itemId, values.join('@') + '@');
            if (info.Quantity == quantityinCart) {
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                    $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(AspxLatestItem, "Out Of Stock"));
                    // $("#spnShowAvailability").html(getLocale(AspxLatestItem,"This product is Out Of Stock!"));
                    $("#spanAvailability").html("<b>" + getLocale(AspxLatestItem, "Out Of Stock") + "</b>");
                }
            }
            var price = 0;
            if (info.IsPricePercentage) {
                price = eval($("#hdnPrice").val()) * eval(info.PriceModifier) / 100;
            } else {
                price = eval(info.PriceModifier);
            }

            $("#spanPrice").html((eval($("#hdnPrice").val()) * rate) + (eval(price) * rate));
            var taxPriceVariant = eval($("#hdnPrice").val()) + eval(price);
            var taxrate = (eval($("#hdnTaxRateValue").val()) * 100) / (eval($("#hdnPrice").val()));
            $("#spanTax").html((((taxPriceVariant * taxrate) / 100) * rate));
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            if ($("#hdnListPrice").val() != null) {
                $(".cssClassYouSave").show();
                var variantAddedPrice = eval($("#hdnPrice").val()) + eval(price);
                var variantAddedSavingPercent = (($("#hdnListPrice").val() - variantAddedPrice) / $("#hdnListPrice").val()) * 100;
                savingPercent2 = variantAddedSavingPercent.toFixed(2);
                $("#spanSaving").html('<b>' + variantAddedSavingPercent.toFixed(2) + '%</b>');

            }
            LatestItems.ResetGallery(info.CombinationID);
        } else {
            $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(AspxLatestItem, "Add to Cart"));

        }

    }

    function selectFirstcombination() {
        if (arrCombination.length > 0) {
            var cvcombinationList = getObjects(arrCombination, 'CombinationType');
            var cvValuecombinationList = getObjects(arrCombination, 'CombinationValues');
            var x = cvcombinationList[0].split('@');
            var y = cvValuecombinationList[0].split('@');
            $("#divCostVariant select").each(function(i) {
                if (parseInt($(this).parent("span:eq(0)").attr('id').replace('subDiv', '')) == x[i]) {
                    if ($(this).find("option[value=" + y[i] + "]").length > 0) {
                        $(this).find("option[value=" + y[i] + "]").attr('selected', 'selected');

                    } else {
                        var options = $(this).html();
                        var noOption = "<option value='0'>" + "Not required" + "</option>";
                        $(this).html(noOption + options);
                        $(this).find('option[value=0]').attr('selected', 'selected');
                    }
                } else {
                    var val = parseInt($(this).parent("span:eq(0)").attr('id').replace('subDiv', ''));
                    var xIndex = 0;
                    for (var indx = 0; indx < x.length; indx++) {
                        if (x[indx] == val) {
                            xIndex = indx;
                            break;
                        }
                    }
                    //  if (xIndex != 0) {
                    if ($(this).find("option[value=" + y[xIndex] + "]").length > 0) {
                        $(this).find("option[value=" + y[xIndex] + "]").attr('selected', 'selected');

                    } else {
                        var options = $(this).html();
                        var noOption = "<option value='0'>" + "Not required" + "</option>";
                        $(this).html(noOption + options);
                        $(this).find('option[value=0]').attr('selected', 'selected');
                    }
                    // }
                }

            });

            $("#divCostVariant input[type=radio]").each(function(i) {
                if (parseInt($(this).parents("span:eq(0)").attr('id').replace('subDiv', '')) == x[i]) {
                    if ($(this).val() == y[i]) {
                        $(this).attr('checked', 'checked').addClass("cssRadioChecked");

                    } else {
                        $(this).removeAttr('checked');
                    }
                } else {
                    var val = parseInt($(this).parents("span:eq(0)").attr('id').replace('subDiv', ''));
                    var xIndex = 0;
                    for (var indx = 0; indx < x.length; indx++) {
                        if (x[indx] == val) {
                            xIndex = indx;
                            break;
                        }
                    }
                    // if (xIndex != 0) {
                    if ($(this).val() == y[xIndex]) {
                        $(this).attr('checked', 'checked').addClass("cssRadioChecked");

                    } else {
                        $(this).removeAttr('checked');
                    }
                    // }
                }
            });

            $("#divCostVariant input[type=checkbox]:checked").each(function(i) {
                if (parseInt($(this).parent("span:eq(0)").attr('id').replace('subDiv', '')) == x[i]) {
                    if ($(this).val() == y[i]) {
                        $(this).attr('checked', 'checked');

                    } else {
                        $(this).removeAttr('checked');
                    }
                } else {
                    var val = parseInt($(this).parent("span:eq(0)").attr('id').replace('subDiv', ''));
                    var xIndex = 0;
                    for (var indx = 0; indx < x.length; indx++) {
                        if (x[indx] == val) {
                            xIndex = indx;
                            break;
                        }
                    }
                    //   if (xIndex != 0) {
                    if ($(this).val() == y[xIndex]) {
                        $(this).attr('checked', 'checked');

                    } else {
                        $(this).removeAttr('checked');
                    }
                    //   }
                }
            });

            CheckVariantCombination(cvcombinationList[0], cvValuecombinationList[0], x[0], y[0]);
            // alert(info.IsCombinationMatched);
            //info.IsCombinationMatched == true ? alert('available') : alert('not available');
            // $("#spnShowAvailability").html(info.IsCombinationMatched == true ? getLocale(AspxLatestItem,'Available') : getLocale(AspxLatestItem,'Not available'));
            $("#spanAvailability").html(info.IsCombinationMatched == true ? '<b>' + getLocale(AspxLatestItem, 'In stock') + '</b>' : '<b>' + getLocale(AspxLatestItem, 'Not Available') + '</b>');
            info.IsCombinationMatched == true ? $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(AspxLatestItem, "Add to Cart")) : $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(AspxLatestItem, "Out Of Stock"));

            if (info.IsCombinationMatched) {
                $("#hdnQuantity").val('').val(info.Quantity);
                $("#txtQty").removeAttr('disabled').attr("enabled", "enabled");
                if (info.Quantity == 0 || info.Quantity < 0) {
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(AspxLatestItem, "Out Of Stock"));
                        // $("#spnShowAvailability").html(getLocale(AspxLatestItem,"This product is Out Of Stock!"));
                        $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'Out Of Stock') + '</b>');
                    }

                } else {
                    $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(AspxLatestItem, "Add to Cart"));
                    // $("#spnShowAvailability").html(info.IsCombinationMatched == true ? getLocale(AspxLatestItem,'Available') : getLocale(AspxLatestItem,'Not available'));
                    $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'In stock') + '</b>');
                }

                var quantityinCart = LatestItems.CheckItemQuantityInCart(itemId, cvValuecombinationList[0] + '@');
                if (info.Quantity == quantityinCart) {
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                        $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(AspxLatestItem, "Out Of Stock"));
                        // $("#spnShowAvailability").html(getLocale(AspxLatestItem,"This product is Out Of Stock!"));
                        $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'Out Of Stock') + '</b>');
                    }
                }
                var price = 0;
                if (info.IsPricePercentage) {
                    price = eval($("#hdnPrice").val()) * eval(info.PriceModifier) / 100;
                } else {
                    price = eval(info.PriceModifier);
                }

                $("#spanPrice").html((eval($("#hdnPrice").val()) * rate) + (eval(price) * rate));
                var taxPriceVariant = eval($("#hdnPrice").val()) + eval(price);
                var taxrate = (eval($("#hdnTaxRateValue").val()) * 100) / (eval($("#hdnPrice").val()));
                // $("#spanTax").html((((taxPriceVariant * taxrate) / 100) * rate).toFixed(2));
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                if ($("#hdnListPrice").val() != '') {
                    $(".cssClassYouSave").show();
                    var variantAddedPrice = eval($("#hdnPrice").val()) + eval(price);
                    var variantAddedSavingPercent = (($("#hdnListPrice").val() - variantAddedPrice) / $("#hdnListPrice").val()) * 100;
                    savingPercent2 = variantAddedSavingPercent.toFixed(2);
                    $("#spanSaving").html('<b>' + variantAddedSavingPercent.toFixed(2) + '%</b>');

                }
                LatestItems.ResetGallery(info.CombinationID);
            }
        } else {
            LatestItems.ResetGallery(0);
        }

    }


    function CheckVariantCombination(costVIds, costValIds, currentCostVar, currentCostVal) {
        info.IsCombinationMatched = false;
        var cvcombinationList = getObjects(arrCombination, 'CombinationType');
        var cvValuecombinationList = getObjects(arrCombination, 'CombinationValues');
        for (var j = 0; j < cvcombinationList.length; j++) {
            if (info.IsCombinationMatched == true)
                break;
            var matchedIndex = 0;
            var matchedValues = 0;
            if (cvcombinationList[j].length == costVIds.length) {
                var cb = costVIds.split('@');
                for (var id = 0; id < cb.length; id++) {
                    if (info.IsCombinationMatched == true)
                        break;
                    var element = cb[id];
                    if (CheckContains(cvcombinationList[j], element)) {
                        matchedIndex++;
                        if (matchedIndex == cb.length) {
                            var cvb = costValIds.split('@');
                            for (var d = 0; d < cvb.length; d++) {
                                var element1 = cvb[d];
                                if (CheckContains(cvValuecombinationList[j], element1)) {
                                    matchedValues++;
                                }
                                if (matchedValues == cvb.length) {
                                    var combinationId = getValByObjects(arrCombination, 'CombinationType', 'CombinationValues', cvcombinationList[j], cvValuecombinationList[j], 'CombinationID');
                                    var modifiers = getModifiersByObjects(arrCombination, combinationId);
                                    //  alert('mat');
                                    info.IsCombinationMatched = true;
                                    info.CombinationID = combinationId;
                                    info.IsPricePercentage = modifiers.IsPricePercentage;
                                    info.PriceModifier = modifiers.Price;
                                    info.Quantity = modifiers.Quantity;
                                    info.IsWeightPercentage = modifiers.IsWeightPercentage;
                                    info.WeightModifier = modifiers.Weight;
                                    break;
                                } else {
                                    info.IsCombinationMatched = false;
                                    info.CombinationID = 0;
                                    info.IsPricePercentage = false;
                                    info.PriceModifier = 0;
                                    info.Quantity = 0;
                                    info.IsWeightPercentage = false;
                                    info.WeightModifier = 0;
                                }
                            }
                        } else {
                            info.IsCombinationMatched = false;
                            info.CombinationID = 0;
                            info.IsPricePercentage = false;
                            info.PriceModifier = 0;
                            info.Quantity = 0;
                            info.IsWeightPercentage = false;
                            info.WeightModifier = 0;

                            var combinationIndex0 = cvcombinationList[j].split('@');
                            var combinationIndex01 = cvValuecombinationList[j].split('@');
                            for (var w = 0; w < combinationIndex0.length; w++) {
                                if (combinationIndex0[w] == currentCostVar) {
                                    if (combinationIndex01[w] == currentCostVal) {
                                        // for (var x = 0; x < combinationIndex01.length; x++) {

                                        // }

                                        if (!IsExists(info.AvailableCombination, cvValuecombinationList[j]))
                                            info.AvailableCombination.push(cvValuecombinationList[j]);
                                    }
                                }
                            }
                        }
                    }

                }
            } else {
                var combinationIndex = cvcombinationList[j].split('@');
                var combinationIndex1 = cvValuecombinationList[j].split('@');
                for (var z = 0; z < combinationIndex.length; z++) {
                    if (combinationIndex[z] == currentCostVar) {
                        if (combinationIndex1[z] == currentCostVal) {
                            if (!IsExists(info.AvailableCombination, cvValuecombinationList[j]))
                                info.AvailableCombination.push(cvValuecombinationList[j]);
                        }
                    }
                }
            }
        }
        return info;
    }

    LatestItems = {
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
            ajaxCallMode: "", ///0 for get categories and bind, 1 for notification,2 for versions bind
            itemid: 0
        },

        vars: {
            countCompareItems: 0,
            itemSKU: itemSKU,
            itemQuantityInCart: "",
            itemId: itemId
        },

        ajaxCall: function(config) {
            $.ajax({
                type: LatestItems.config.type,
                contentType: LatestItems.config.contentType,
                cache: LatestItems.config.cache,
                async: LatestItems.config.async,
                url: LatestItems.config.url,
                data: LatestItems.config.data,
                dataType: LatestItems.config.dataType,
                success: LatestItems.config.ajaxCallMode,
                error: LatestItems.ajaxFailure
            });
        },

        GetLatestItems: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetLatestItemsList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), count: noOfLatestItems });
            this.config.ajaxCallMode = LatestItems.BindLatestItems;
            this.config.async = true;
            this.ajaxCall(this.config);
        },

        BindRecentItems: function(msg) {
            var RecentItemContents = '';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    var imagePath = itemImagePath + item.ImagePath;
                    var altImagePath = itemImagePath + item.AlternateImagePath;
                    if (item.ImagePath == "") {
                        imagePath = defaultImagePath;
                    }
                    if (item.AlternateText == "") {
                        item.AlternateText = item.Name;
                    }
                    if (item.AlternateImagePath == "") {
                        altImagePath = imagePath;
                    }
                    RecentItemContents += "<div class=\"cssClassProductsBox\">";
                    var hrefItem = aspxRedirectPath + "item/" + LatestItems.fixedEncodeURIComponent(item.SKU) + pageExtension;

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
                    RecentItemContents += '<div id="productImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + '  itemid="' + item.ItemID + '"><a href="' + hrefItem + '" title="' + item.Name + '" ><h2>' + name + '</h2></a><h3>' + item.SKU + '</h3><div class="divQuickLookonHover"><div class="divitemImage cssClassProductPicture"><a href="' + hrefItem + '" ><img id="img_' + item.ItemID + '"  alt="' + item.AlternateText + '"  title="' + item.AlternateText + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '" orignalPath="' + imagePath.replace('uploads', 'uploads/Medium') + '" altImagePath="' + altImagePath.replace('uploads', 'uploads/Medium') + '"/></a></div>';

                    if (!item.HidePrice) {
                        if (item.ListPrice != null) {
                            RecentItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + (item.ListPrice).toFixed(2) + ">" + (item.ListPrice * rate).toFixed(2) + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                        } else {
                            RecentItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                        }
                    } else {
                        RecentItemContents += "<div class=\"cssClassProductPriceBox\"></div>";
                    }
                    RecentItemContents += '<div class="cssClassProductDetail"><p><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">' + getLocale(AspxLatestItem, "Details") + '</a></p></div>';
                    RecentItemContents += '<div class="sfQuickLook" style="display:none"><img itemId="' + item.ItemID + '" sku="' + item.SKU + '" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/QV_Button.png" rel="popuprel"/></div></div>';
                    RecentItemContents += "<div class=\"sfButtonwrapper\">";
                    if (allowWishListLatestItem.toLowerCase() == 'true') {
                        if (aspxCommonObj().CustomerID > 0 && userName.toLowerCase() != "anonymoususer") {
                            RecentItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" class=\"addWishList\" onclick='LatestItems.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxLatestItem, "Wishlist") + "</span></span></button></div>";
                        } else {
                            RecentItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" class=\"addWishList\" onclick='AspxCommerce.RootFunction.Login();'><span><span><span>+</span>" + getLocale(AspxLatestItem, "Wishlist") + "</span></span></button></div>";
                        }
                    }
                    //RecentItemContents+="<input type=\"button\" id=\"addWishList\" value=\"Add To Wishlist\" onclick='AddToWishList(" + item.ItemID + ");'/>";
                    //RecentItemContents += "<div class=\"cssClassWishListDetail\"><p><a href='addtowishlist.aspx?itemId="+ item.ItemID + "'>Add to Wishlist</a></p>";
                    if (allowAddToCompareLatest.toLowerCase() == 'true') {
                        RecentItemContents += "<div class=\"cssClassCompareButton\"><input type=\"checkbox\" id=\"compare-" + item.ItemID + "\" onclick='LatestItems.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span>" + getLocale(AspxLatestItem, "Compare") + "</span></input></div>";
                    }
                    RecentItemContents += "</div>";
                    RecentItemContents += "<div class=\"cssClassclear\"></div>";
                    var itemSKU = JSON2.stringify(item.SKU);
                    var itemName = JSON2.stringify(item.Name);
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        if (item.IsOutOfStock) {
                            //  RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><a href=\"#\"><span>Out Of Stock</span></a></div></div>";
                            RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxLatestItem, "Out Of Stock") + "</span></button></div></div>";
                        } else {
                            // RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><a href=\"#\" title=" + itemName + "  onclick='LatestItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span>Add to cart</span></a></div></div>";
                            RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" class=\"addtoCart\" title=" + itemName + "   onclick='LatestItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxLatestItem, "Add to cart") + "</span></span></button></div></div>";
                        }
                    } else {
                        // RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><a href=\"#\" title=" + itemName + "  onclick='LatestItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span>Add to cart</span></a></div></div>";
                        RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" class=\"addtoCart\" title=" + itemName + "  onclick='LatestItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxLatestItem, "Add to cart") + "</span></span></button></div></div>";
                    }
                    RecentItemContents += "</div>";


                    // }
                });

                //$('.divitemImage img[title]').tipsy();
                $(".divitemImage img").live('mouseout', function() {
                    SwapImageOnMouseOut($(this).attr("id"), aspxRootPath + $(this).attr("orignalPath"));
                }).live('mouseover', function() {
                    SwapImageOnMouseOver($(this).attr("id"), aspxRootPath + $(this).attr("altImagePath"));
                });
            } else {
                RecentItemContents += "<span class=\"cssClassNotFound\">" + getLocale(AspxLatestItem, "This store has no items listed yet!") + "</span>";
            }
            //_ItemID; _DateFrom; _DateTo; _IsFeatured; _SKU; _Name; _Price; _ListPrice; _HidePrice; _HideInRSSFeed; _HideToAnonymous; _AddedOn; _ImagePath; _AlternateText
            $("#" + tblRecentItems).html(RecentItemContents);
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            $('.divitemImage a img[title]').tipsy({ gravity: 'n' });
            if ($("#" + tblRecentItems).hasClass('masonry')) {
                $("#" + tblRecentItems).masonry('destroy');
            }
            $("#" + tblRecentItems).imagesLoaded(function() {
                $("#" + tblRecentItems).masonry({
                    itemSelector: '.cssClassProductsBox',
                    columnWidth: 35
                });
            });
        },

        AddItemsToCompare: function(itemId, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                var costVariantIds = '0';
                ItemsCompare.AddToCompare(itemId, costVariantIds);
            }
        },


        CheckWishListUniqueness: function(itemID, itemSKU, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
            } else {
                this.config.itemid = itemID;
                var checkparam = { ID: itemID, aspxCommonObj: aspxCommonObj(), costVariantValueIDs: costVariantValueIDs };
                var checkdata = JSON2.stringify(checkparam);
                this.config.method = "AspxCommerceWebService.asmx/CheckWishItems",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = checkdata;
                this.config.async = true;
                this.config.ajaxCallMode = LatestItems.CheckAddToWishItems;
                this.ajaxCall(this.config);
            }
        },

        fixedEncodeURIComponent: function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
        },

        IncreaseWishListCount: function() {
            var wishListCount = $('#lnkMyWishlist span ').html().replace(/[^0-9]/gi, '');
            wishListCount = parseInt(wishListCount) + 1;
            $('.cssClassLoginStatusInfo ul li a#lnkMyWishlist span ').html("[" + wishListCount + "]");
        },

        AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
            if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                AspxCommerce.RootFunction.RedirectToLatestItems(itemSKU);
            } else {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
            }
        },

        IncreaseShoppingBagCount: function() {
            var myShoppingBagCount = $('#lnkshoppingcart').html().replace(/[^0-9]/gi, '');
            myShoppingBagCount = parseInt(myShoppingBagCount) + 1;
            $('#lnkshoppingcart').html(" My Shopping Bag [" + myShoppingBagCount + "]");
        },

        BindItemQuantityDiscountByUserNameSucess: function(data) {
            $("#itemQtyDiscount>tbody").html('');
            if (data.d.length > 0) {
                $("#bulkDiscount").html(getLocale(AspxLatestItem, '(Bulk Discount available)'));
                $("#divQtyDiscount").show();
                var qytDiscount = '';
                $.each(data.d, function(index, item) {
                    qytDiscount += "<tr><td>" + item.Quantity + "</td><td><span class='cssClassFormatCurrency'>" + (item.Price * rate).toFixed(2) + "</span></td></tr>";
                });

                $("#itemQtyDiscount>tbody").append(qytDiscount);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $("#itemQtyDiscount > tbody tr:even").addClass("sfEven");
                $("#itemQtyDiscount > tbody tr:odd").addClass("sfOdd");
            } else {
                $("#bulkDiscount").hide();
                $("#divQtyDiscount").hide();
            }

        },

        BindCostVariantsByitemSKU: function(data) {
            if (data.d.length > 0) {
                var CostVariant = '';
                var variantValue = [];
                $.each(data.d, function(index, item) {
                    if (CostVariant.indexOf(item.CostVariantID) == -1) {
                        CostVariant += item.CostVariantID;
                        var addSpan = '';
                        addSpan += '<div id="div_' + item.CostVariantID + '" class="cssClassHalfColumn">';
                        addSpan += '<span id="spn_' + item.CostVariantID + '" ><b>' + item.CostVariantName + '</b>: ' + '</span>';
                        addSpan += '<span class="spn_Close"><a href="#"><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/uncheck.png" title=' + "Don\'t use this option" + '" alt=' + "Don\'t use this option" + '/></a></span>';
                        addSpan += '</div>';
                        $('#divCostVariant').append(addSpan);
                    }
                    var valueID = '';
                    var itemCostValueName = '';
                    if (item.CostVariantsValueID != -1) {
                        if (item.InputTypeID == 5 || item.InputTypeID == 6) {
                            if ($('#controlCostVariant_' + item.CostVariantID + '').length == 0) {
                                itemCostValueName += '<span class="sfListmenu" id="subDiv' + item.CostVariantID + '">';
                                valueID = 'controlCostVariant_' + item.CostVariantID;
                                itemCostValueName += LatestItems.CreateControl(item, valueID, false);

                                itemCostValueName += "</span>";
                                $('#div_' + item.CostVariantID + '').append(itemCostValueName);
                            }
                            //Blue (+10%)
                            //Red (+$10.00)
                            if (!IsExists(variantValue, item.CostVariantsValueID)) {
                                variantValue.push(item.CostVariantsValueID);
                                optionValues = LatestItems.BindInsideControl(item, valueID);
                                // alert('#controlCostVariant_' + item.CostVariantID + '');
                                $('#controlCostVariant_' + item.CostVariantID + '').append(optionValues);
                            }
                            $('#controlCostVariant_' + item.CostVariantID + ' option:first-child').attr("selected", "selected");
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        } else {
                            if ($('#subDiv' + item.CostVariantID + '').length == 0) {
                                itemCostValueName += '<span class="cssClassRadio" id="subDiv' + item.CostVariantID + '">';
                                valueID = 'controlCostVariant_' + item.CostVariantID;
                                itemCostValueName += LatestItems.CreateControl(item, valueID, true);
                                itemCostValueName += "</span>";
                                $('#div_' + item.CostVariantID + '').append(itemCostValueName);
                            } else {
                                valueID = 'controlCostVariant_' + item.CostVariantID;
                                itemCostValueName += LatestItems.CreateControl(item, valueID, false);
                                $('#subDiv' + item.CostVariantID + '').append(itemCostValueName);
                            }
                        }
                    }
                });
                $('#divCostVariant').append('<div class="cssClassClear"></div>');
                if ($.session("ItemCostVariantData") != undefined) {
                    $.each(arrCostVariants, function(i, variant) {
                        var itemColl = $("#divCostVariant").find("[Variantname=" + variant + "]");
                        //alert($("#divCostVariant").html());
                        // alert($(itemColl)
                        if ($(itemColl).is("input[type='checkbox'] ,input[type='radio']")) {
                            $("#divCostVariant").find("input:checkbox").removeAttr("checked");
                            $(itemColl).attr("checked", "checked");
                        } else if ($(itemColl).is('select>option')) {
                            $("#divCostVariant").find("select>option").removeAttr("selected");
                            $(itemColl).attr("selected", "selected");
                        }

                    });
                    $.session("ItemCostVariantData", 'empty');
                }
                //to bind the item price according to the selection of the cost variant
                $('#divCostVariant select,#divCostVariant input[type=radio],#divCostVariant input[type=checkbox]').unbind().bind("change", function() {
                    checkAvailibility(this);

                });
                $("#divCostVariant .spn_Close").live("click", function() {
                    $(this).next('span:first').find(" input[type=radio]").removeAttr('checked');
                    if ($(this).next('span:first').find("select").find("option[value=0]").length == 0) {
                        var options = $(this).next('span:first').find("select").html();
                        var noOption = "<option value=0 >" + getLocale(AspxLatestItem, "Not required") + "</option>";
                        $(this).next('span:first').find("select").html(noOption + options);
                    } else {
                        $(this).next('span:first').find("select").find("option[value=0]").attr('selected', 'selected');
                    }
                    checkAvailibility(null);
                });
                //.trigger('change');
                $('.cssClassDropDownItem').MakeFancyItemDropDown();
                //end
            }
        },

        BindItemBasicByitemSKUSucess: function(data) {
            if (data.d != null) {
                LatestItems.BindItemsBasicInfo(data.d);
                LatestItems.GetCostVariantsByitemSKU(itemSKU);
                LatestItems.LoadCostVariantCombination(itemSKU);
                if (itemTypeId == 3) {
                    LatestItems.GetPriceHistory(itemId);
                    $('.popbox').width(120);
                }
                else {
                    LatestItems.GetPriceHistory(itemId);
                }
                //LatestItems.GetGiftCardThemes();
                //BindCostVariantOptions(itemSKU);
                //This adds Recently View table and also update item's viewed count table
                // LatestItems.AddUpdateRecentlyViewedItem(itemSKU);

            }
        },

        CheckItemQuantityInCartSucess: function(data) {
            LatestItems.vars.itemQuantityInCart = data.d;
        },

        BindImageLists: function(data) {
            LatestItems.GetFilePath(data);
            LatestItems.Gallery();
            LatestItems.ImageZoom();
        },

        BindStyle: function(data) {
            LatestItems.SetValueForStyle(data);
        },

        AddToMyCartSuccess: function(data) {
            if (data.d == 1) {
                var myCartUrl;
                if (userFriendlyURL) {
                    myCartUrl = myCartURL + pageExtension;
                } else {
                    myCartUrl = myCartURL;
                }
                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + myCartURL + pageExtension;
                //                        HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                //                        ShopingBag.GetCartItemCount(); //for bag count
                //                        ShopingBag.GetCartItemListDetails(); //for shopping bag detail
            } else if (data.d == 2) {
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    csscody.alert("<h2>" + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'This product is currently out of stock!') + "</p>");
                }
                else {
                    var myCartUrl;
                    if (userFriendlyURL) {
                        myCartUrl = myCartURL + pageExtension;
                    } else {
                        myCartUrl = myCartURL;
                    }
                    var addToCartProperties = {
                        onComplete: function(e) {
                            if (e) {
                                //alert('welcome to checkout');
                                // alert(AspxCommerce.utils.GetAspxRedirectPath());
                                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + myCartURL + pageExtension;
                            }
                        }
                    };
                    //csscody.addToCart('<h2>' + getLocale(AspxLatestItem, "Successful Message") + '</h2><p>' + getLocale(AspxLatestItem, 'Item has been successfully added to cart.') + '</p>', addToCartProperties);
                    //HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                    //ShopingBag.GetCartItemCount(); //for bag count
                    //ShopingBag.GetCartItemListDetails(); //for shopping bag detail
                }
            }
        },

        GetAddToCartErrorMsg: function() {
            csscody.error('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Failed to add item to cart!') + '</p>');
        },

        BindCostVariantCombination: function(data) {
            $.each(data.d, function(index, item) {
                var CostVariantCombination = {
                    CombinationID: 0,
                    CombinationType: "",
                    CombinationValues: "",
                    CombinationPriceModifier: "",
                    CombinationPriceModifierType: "",
                    CombinationWeightModifier: "",
                    CombinationWeightModifierType: "",
                    CombinationQuantity: 0,
                    ImageFile: ""
                };
                CostVariantCombination = item;
                arrCombination.push(CostVariantCombination);
            });
            selectFirstcombination();
        },

        BindCostVariantsByitemSKUFailure: function() {
            csscody.error('<h2>' + getLocale(AspxLatestItem, "Error Message") + '</h2><p>' + getLocale(AspxLatestItem, 'Failed to load cost variants!') + '</p>');
        },

        BindLatestItems: function(data) {
            LatestItems.BindRecentItems(data);
        },

        CheckCompareItems: function(data) {
            LatestItems.config.ajaxCallMode = "";
            if (data.d) {
                csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'The selected item already exist in compare list.') + '</p>');
                return false;
            } else {
                LatestItems.AddToMyCompare();
            }
        },

        SaveCompareItems: function(data) {
            LatestItems.vars.countCompareItems++;
            LatestItems.config.ajaxCallMode = "";
            csscody.info('<h2>' + getLocale(AspxLatestItem, 'Information Message') + '</h2><p>' + getLocale(AspxLatestItem, 'Item has been successfully added to compare list.') + '</p>');
            if ($("#h2compareitems").length > 0) {
                ItemsCompare.GetCompareItemList(); //for MyCompareItem
            }
        },

        SetCompareItemsCount: function(data) {

            LatestItems.vars.countCompareItems = data.d;


        },

        CheckAddToWishItems: function(data) {
            if (data.d) {
                csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'The selected item already exist in your wishlist.') + '</p>');
            } else {
                AspxCommerce.RootFunction.AddToWishListFromJS(LatestItems.config.itemid, ip, countryName, costVariantValueIDs); // AddToList ==> AddToWishList
            }
        },

        BindDownloadEvent: function() {
            $(".cssClassLink").jDownload({
                root: aspxFilePath,
                dialogTitle: 'AspxCommerce download sample item:'
            });
        },

        LoadCostVariantCombination: function() {
            var param = JSON2.stringify({ itemSku: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetCostVariantCombinationbyItemSku";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = LatestItems.BindCostVariantCombination;
            this.config.error = 23;
            this.ajaxCall(this.config);
        },

        BindItemQuantityDiscountByUserName: function(itemSKU) {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), itemSKU: itemSKU });
            this.config.method = "AspxCommerceWebService.asmx/GetItemQuantityDiscountByUserName";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = LatestItems.BindItemQuantityDiscountByUserNameSucess;
            this.ajaxCall(this.config);

        },

        GetCostVariantsByitemSKU: function(itemSKU) {
            $('#divCostVariant').html('');
            var param = JSON2.stringify({ itemSku: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetCostVariantsByItemSKU";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.async = false;
            this.config.ajaxCallMode = LatestItems.BindCostVariantsByitemSKU;
            this.config.error = LatestItems.BindCostVariantsByitemSKUFailure;
            this.ajaxCall(this.config);
        },

        CreateControl: function(item, controlID, isChecked) {
            var controlElement = '';
            var costPriceValue = item.CostVariantsPriceValue;
            var weightValue = item.CostVariantsWeightValue;
            //alert(costPriceValue + '::' + weightValue + '::' + $("#hdnWeight").val());
            if (item.InputTypeID == 5) { //MultipleSelect
                //if (isChecked) {
                controlElement = "<select id='" + controlID + "' multiple></select>";
                //}
                //else {
                //    controlElement = "<select id='" + controlID + "' multiple></select>";
                //}
            } else if (item.InputTypeID == 6) { //DropDown
                controlElement = "<select id='" + controlID + "'></select>";
            } else if (item.InputTypeID == 9 || item.InputTypeID == 10) { //Radio //RadioLists
                controlElement = "<label><input  name='" + controlID + "' type='radio' checked='checked' value='" + item.CostVariantsValueID + "'><span>" + item.CostVariantsValueName + "</span></label>";

            } else if (item.InputTypeID == 11 || item.InputTypeID == 12) { //CheckBox //CheckBoxLists
                controlElement = "<input  name='" + controlID + "' type='radio' checked='checked' value='" + item.CostVariantsValueID + "'><label>" + item.CostVariantsValueName + "</label></br>";

            }
            return controlElement;
        },

        BindInsideControl: function(item, controlID) {
            var optionValues = '';
            var costPriceValue = item.CostVariantsPriceValue;
            var weightValue = item.CostVariantsWeightValue;
            if (item.InputTypeID == 5) { //MultipleSelect
                //  optionValues = "<option VariantName='" + item.CostVariantsValueName + "' value=" + item.CostVariantsValueID + " variantvalue='" + '+' + (($("#hdnPrice").val() * costPriceValue) / 100) + "' variantwtvalue='" + '+' + (($("#hdnWeight").val() * weightValue) / 100) + "'>" + item.CostVariantsValueName + ' (' + costPriceValue + '%)' + "</option>";
                optionValues = "<option value=" + item.CostVariantsValueID + ">" + item.CostVariantsValueName + "</option>";

            } else if (item.InputTypeID == 6) { //DropDown

                optionValues = "<option value=" + item.CostVariantsValueID + ">" + item.CostVariantsValueName + "</option>";

            }
            return optionValues;
        },

        BindItemBasicByitemSKU: function(itemSKU) {
            var checkparam = { itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() };
            var checkdata = JSON2.stringify(checkparam);
            this.config.method = "AspxCommerceWebService.asmx/GetItemBasicInfoByitemSKU";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = checkdata;
            this.config.async = false;
            this.config.ajaxCallMode = LatestItems.BindItemBasicByitemSKUSucess;
            this.ajaxCall(this.config);
        },

        AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity) {
            AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
        },

        CheckItemQuantityInCart: function(itemId, itemCostVariantIDs) {
            this.config.method = "AspxCommerceWebService.asmx/CheckItemQuantityInCart";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj(), itemCostVariantIDs: itemCostVariantIDs });
            this.config.ajaxCallMode = LatestItems.CheckItemQuantityInCartSucess;
            this.ajaxCall(this.config);
            return LatestItems.vars.itemQuantityInCart;
        },

        GetImageLists: function(cids, sku, combinationId) {
            if (itemTypeId == 3) {
                LatestItems.GetGiftCardThemes();
            } else {
                this.config.method = "AspxCommerceWebService.asmx/GetItemsImageGalleryInfoBySKU";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ itemSKU: sku, aspxCommonObj: aspxCommonObj(), combinationId: combinationId });
                this.config.ajaxCallMode = LatestItems.BindImageLists;
                this.config.async = true;
                this.ajaxCall(this.config);
            }

        },

        AddStyle: function() {
            this.config.method = "AspxCommerceWebService.asmx/ReturnDimension";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ userModuleID: userModuleID, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = LatestItems.BindStyle;
            this.config.error = 18;
            this.ajaxCall(this.config);
        },

        GetFilePath: function(msg) {
            var imgList = '';
            //$('.pika-image,.jcarousel-skin-pika').html('');
            var html = '';
            html = '<ul id="pikame" class="jcarousel-skin-pika">';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    item.ImagePath = itemImagePath + item.ImagePath;
                    html += '<li><a href="#"><img id="image1" src="' + aspxRootPath + item.ImagePath.replace('uploads', 'uploads/Large') + ' " alt="' + item.AlternateText + '" title="' + item.AlternateText + '" /></a></li>';
                });
                html += '</ul>';
            } else {
                html += '<li><a href="#"><img id="image1" src="' + aspxRootPath + defaultImagePath + '" /></a></li>';
                html += '</ul>';
            }
            $(".pikachoose").append(html);


        },

        ImageZoom: function() {
            //$('.pika-image,.jcarousel-skin-pika').html('');

        },

        Gallery: function() {
            //$('.pika-image,.jcarousel-skin-pika').html('');
            $("#pikame").PikaChoose({ autoPlay: true, showCaption: false });
            $("#pikame").jcarousel({
                scroll: 3,
                transition: [6],
                initCallback: function(carousel) {
                    $(carousel.list).find('img').click(function() {
                        //console.log($(this).parents('.jcarousel-item').attr('jcarouselindex'));
                        carousel.scroll(parseInt($(this).parents('.jcarousel-item').attr('jcarouselindex')));
                    });

                }

            });
        },

        SetValueForStyle: function(data) {
            $('div.pika-image').css("width", data.d[0] + 2);
            $('div.pika-image').css("height", data.d[1] + 2);
            $('#image1').css('width', data.d[2]);
            $('#image1').css('height', data.d[2]);
            newObject = new Variable(data.d[1], data.d[0], data.d[2], data.d[3]);
        },
        GetPriceHistory: function(id) {
            var param = JSON2.stringify({ itemId: id, aspxCommerceObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetPriceHistoryList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = LatestItems.BindPriceHistory;
            this.ajaxCall(this.config);
        },
        BindPriceHistory: function(msg) {
            if (msg.d.length > 0) {
                $('.popbox').show();
                var element = "<a class='open' href='#'>" + getLocale(AspxLatestItem, "Price History") + "</a>";
                element += "<div class='collapse'><div class='box'><div class='arrow'></div>";
                element += "<div class='arrow-border'></div><div class='classPriceHistory'>";
                element += '<table class=classPriceHistoryList><thead><th>' + getLocale(AspxLatestItem, "Date") + '</th><th>' + getLocale(AspxLatestItem, "Price") + '</th></thead><tbody>';
                $.each(msg.d, function(index, item) {
                    element += '<tr><td><span>' + item.Date + '</span></td><td><span>' + item.Price + '</span></td></tr>';
                });
                element += '</tbody></table></div>';
                $('.popbox').append(element);
                $('.popbox').popbox();
            } else {
                $("div.popbox").html('');
                $('.popbox').hide();
            }
        },

        BindItemsBasicInfo: function(item) {
            info.IsCombinationMatched = true;
            info.IsPricePercentage = false;
            info.IsWeightPercentage = false;
            info.PriceModifier = 0;
            info.WeightModifier = 0;
            info.Quantity = item.Quantity;
            $(".pikachoose").html('');
            $("#divGift").remove();
            $("#tblGift").remove();
            if (item.ItemViewCount == null) {
                item.ItemViewCount = 0;
            }
            $("#viewCount").text(item.ItemViewCount);
            LatestItems.config.async = true;
            if (itemTypeId == 3) {
                LatestItems.BindGiftCardInfo(item);

            } else {
                //$("#" + lblTitle).show();
                //$(".cssClassItems").show();
                $(".cssClassDwnWrapper").show();
                $("#divCostVariant").show();
                $(".cssClssQTY").show();
                $("#" + lblItemQnty).show();
                $("#txtQty").show();
                $("#lblNotification").show();
                $("#tblGift").html('');
                if (item.ListPrice != "") {
                    $("#bulkDiscount").show();
                    //$(".cssClassProductOffPrice").show();
                    $("#" + lblListPrice).show();
                    $("#spanListPrice").show();
                    $(".cssClassBulkDiscount").show();
                    $("#" + lblSaving).show();
                    $("#spanSaving").show();
                    $("#spanListPrice").html((item.ListPrice * rate).toFixed(2));
                    $("#hdnListPrice").val(item.ListPrice);
                } else {
                    $("#" + lblListPrice).hide();
                    $("#spanListPrice").hide();
                    $("#bulkDiscount").hide();
                    $("#" + lblSaving).hide();
                    $("#spanSaving").hide();
                    //$(".cssClassProductOffPrice").hide();
                    $(".cssClassYouSave").hide();
                }
                $("#spanItemName").html(item.Name);
                //$("#spanSKU").html(item.SKU);
                $("#spanPrice").html((item.Price * rate).toFixed(2));
                $("#hdnPrice").val(item.Price);
                $("#hdnListPrice").val(item.ListPrice);
                $("#hdnWeight").val(item.Weight);
                //$("#spanWeight").val(item.Weight);
                $("#hdnQuantity").val(item.Quantity);
                if (item.BrandName != "") {
                    var html = '';
                    var brandUrl = aspxRootPath + "brand/" + item.BrandName + pageExtension;
                    html = "<h2><span class=\"sflocale\">" + getLocale(AspxLatestItem, "Brand") + "</span><span id=\"spanItemBrandName\"><a title=" + getLocale(AspxLatestItem, 'View all items under this brand') + " href='" + brandUrl + "'>" + item.BrandName + "</a></span></h2>";
                    $(".cssClassItemBrands").append(html);
                }
                else {
                    $(".cssClassItemBrands").html('');
                }
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    if (item.IsOutOfStock) {
                        $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                        $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(AspxLatestItem, "Out Of Stock"));
                        $("#btnAddToMyCart").show();
                        $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'Out Of Stock') + '</b>');
                    } else {
                        if (itemTypeId == 2) {
                            $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                        }
                        else {
                            $("#txtQty").removeAttr('disabled').attr("enabled", "enabled");
                        }
                        $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(AspxLatestItem, "Add to Cart"));
                        $("#btnAddToMyCart").show();
                        $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'In stock') + '</b>');
                    }
                } else {
                    $("#btnAddToMyCart").show();
                }
                $("#txtQty").val('1');
                $("#txtQty").attr('addedValue', 1);
                //$("#spanTax").html(item.TaxRateValue * rate);
                $("#hdnTaxRateValue").val(item.TaxRateValue);
                if (item.SampleLink != '' && item.SampleFile != '') {
                    $("#dwnlDiv").show();
                    $("#spanDownloadLink").html(item.SampleLink);
                    $("#spanDownloadLink").attr("href", item.SampleFile);


                } else {
                    $("#dwnlDiv").hide();
                }
                if (item.ListPrice != "") {
                    $(".cssClassYouSave").show();
                    var savingPercent = ((item.ListPrice - item.Price) / item.ListPrice) * 100;
                    savingPercent = savingPercent.toFixed(2);
                    $("#spanSaving").html('<b>' + savingPercent + '%</b>');
                }
                else {
                    $(".cssClassYouSave").hide();
                }
                //if (allowOutStockPurchase.toLowerCase() == 'false') {
                //if (item.IsOutOfStock) {
                //$("#spanAvailability").addClass('cssClassOutOfStock').html('<b>Out Of Stock</b>');
                //}
                // else {
                // $("#spanAvailability").html('<b>In stock</b>');
                // }
                // }
                //                else {
                //                    $("#spanAvailability").html('<b>In stock</b>');
                //                }

                var shortDesc = '';
                if (item.ShortDescription.length > 870) {
                    shortDesc = item.ShortDescription.substring(0, 870);
                    shortDesc += " >>>";
                } else {
                    shortDesc = item.ShortDescription;
                }
                $('.cssClassProductInformation').show();
                $('.cssClassItemQuickOverview').show();
                //$("#divItemShortDesc").append(Encoder.htmlDecode(shortDesc));
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                //$("#divItemFullDesc").html(Encoder.htmlDecode(item.Description));
                //$("#divItemFullDesc").hide();
                //$("#divReadLess").hide();
            }


        },

        GetGiftCardThemes: function() {
            function mycarousel_initCallback(carousel) {
                jQuery('#next').bind('click', function() {
                    carousel.next();
                    return false;
                });

                jQuery('#prev').bind('click', function() {
                    carousel.prev();
                    return false;
                });
            }

            ;
            var param = JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonObj() });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: true,
                url: aspxservicePath + 'AspxCommerceWebService.asmx/GetGiftCardThemeImagesByItem',
                data: param,
                dataType: "json",
                success: function(data) {
                    if (data.d.length > 0) {
                        var $ul = $("<ul>").attr('id', 'pikame').addClass("jcarousel-skin-pika");
                        $.each(data.d, function(index, item) {
                            var $li = $("<li>");
                            var $a = $("<a>");
                            var $img = $("<img>");
                            $a.attr("href", "#");
                            // $img.attr('width', '75').attr('height', '50').attr("src", aspxRootPath + item.GraphicImage).attr('alt', item.GraphicName);
                            $img.attr("src", aspxRootPath + item.GraphicImage).attr('alt', item.GraphicName).attr('data-id', item.GiftCardGraphicId);
                            $li.append($a);
                            $a.append($img);
                            $ul.append($li);
                        });

                        var $preview = $("<div>").addClass("cssClassPreview");
                        $ul.find('li').click(function() {
                            //  var $cloneImg = $(this).find("img").clone();
                            //  $cloneImg.attr('width', '300').attr('height', '225');
                            // $(this).parents("div.cssClassProductImage").find(".cssClassPreview").html('').append($cloneImg);

                        });
                        // var $aleft = $('<a>').attr('href', "#").attr('id', "prev").addClass("cssClassPrev").html('prev');
                        //  var $aright = $('<a>').attr('href', "#").attr('id', "next").addClass("cssClassNext").html('next');
                        $(".pikachoose").html('').append($ul).append("<div id='divGift'><span>" + getLocale(AspxLatestItem, "Note:- select your card theme") + "</span></div>");
                        LatestItems.Gallery();
                        LatestItems.ImageZoom();
                        // $(".cssClassProductImage").html('').append($preview).append($aleft).append($ul).append($aright);
                        //                         var $cloneImg = $(".cssClassProductImage ul>li>a:first").find("img").clone();
                        //                         $cloneImg.attr('width', '300').attr('height', '225');
                        //                         $("div.cssClassProductImage").find(".cssClassPreview").html('').append($cloneImg);
                        //                         $('#themesSlider').jcarousel({
                        //                         scroll: 1,
                        //                          initCallback: mycarousel_initCallback
                        //
                        //                         });
                    }
                }
            });
        },

        BindGiftCardInfo: function(item) {
            $(".cssClassYouSave").hide();
            $("#" + lblListPrice).hide();
            $("#spanListPrice").hide();
            $("#bulkDiscount").hide();
            $("#" + lblSaving).hide();
            $("#spanSaving").hide();
            $("#" + lblItemQnty).hide();
            $("#txtQty").hide();
            $(".cssClssQTY").hide();
            $("#lblNotification").hide();
            $("#spanItemName").html(item.Name);
            //$("#spanSKU").html(item.SKU);
            $("#spanPrice").html((item.Price * rate).toFixed(2));
            var price = (item.Price * rate).toFixed(2);
            $("#hdnPrice").val(item.Price);
            //  $("#hdnListPrice").val(item.ListPrice);
            $("#hdnWeight").val(item.Weight);
            //$("#spanWeight").val(item.Weight);
            // $("#hdnQuantity").val(item.Quantity);
            //$("#" + lblTitle).hide();
            //$(".cssClassItems").hide();
            $(".cssClassDwnWrapper").html('');
            //            $("#divCostVariant").hide();
            //            $(".cssClssQTY").hide();
            //            $("#" + lblSaving).hide();
            //            $("#spanSaving").hide();
            //            $(".cssClassProductOffPrice").hide();
            //            $(".cssClassBulkDiscount").hide();
            $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(AspxLatestItem, "Add to Cart"));
            $("#btnAddToMyCart").show();
            $("#spanAvailability").html('<b>' + getLocale(AspxLatestItem, 'In stock') + '</b>');

            var $li = '<div id="divCostVariant"></div><table id="tblGift">'; //<tr><td><span >Price:</span></td><td><span id="spanPrice" class="cssClassFormatCurrency">' + price + '</span></td></tr>
            $li += '<tr ><td>  <span>Sender Name:<em>*</em></span></td>';
            $li += '<td> <input id ="txtgc_senerName" type="text" minlength="2" messages="*" class="sfTextBoxSmall" name="gcsender_name"> </td></tr>';
            $li += ' <tr ><td> <span>Sender Email:<em>*</em></span></td>';
            $li += ' <td><input type="text" value="" class="sfTextBoxSmall" name="gcsender_email" id="txtgc_senerEmail"> </td></tr> ';
            $li += '<tr><td><span >Recipient Name:<em>*</em></span></td>';
            $li += ' <td><input type="text" class="sfTextBoxSmall" minlength="2" name="gcrecipient_name" id="txtgc_recieverName"> </td></tr>';
            $li += '<tr> <td><span >Recipient Email:<em>*</em></span></td> ';
            $li += '<td><input type="text" class="sfTextBoxSmall" name="gcrecipient_email" id="txtgc_recieverEmail"> </td></tr>';
            $li += '<tr> <td><span >Message:</span> </td>';
            $li += ' <td><textarea class="sfTextBoxSmall" rows="3" cols="5" style="width: 135px; height: 50px; id="txtgc_messege" name="gcmessage"></textarea> </td> </tr>';
            //usp_aspx_GetAllGiftCardType
            //call type dynamically
            $li += '<tr><td><span>Send gift by:</span></td><td id="GiftCardTypes"></td></tr></table> ';
            $(".cssClassDwnWrapper").html($li);
            // $(".cssClassProductImage").html('');
            //load gift card grafic theme

            $('.cssClassProductInformation').show();
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            LatestItems.GetGiftCardTypes();

        },
        GetGiftCardTypes: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetGiftCardTypes";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = function(data) {

                $("#GiftCardTypes").html('');
                $.each(data.d.reverse(), function(i, item) {
                    var x = $('<label>').append($("<input type=radio />").attr('name', 'giftcard-type').attr('value', item.TypeId)).append(item.Type.toLowerCase());

                    $("#GiftCardTypes").append(x);

                });
                $("input[name=giftcard-type]:first").attr('checked', 'checked');
            };
            this.ajaxCall(this.config);
        },
        GetFormFieldList: function(itemSKU) {
            LatestItems.vars.itemSKU = itemSKU;
            this.config.method = "AspxCommerceWebService.asmx/GetItemFormAttributesByitemSKUOnly";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = LatestItems.BindItemFormAttributes;
            //this.config.error = 10;
            this.ajaxCall(this.config);
        },

        BindItemFormAttributes: function(msg) {
            $.each(msg.d, function(index, item) {
                if (index == 0) {
                    itemTypeId = item.ItemTypeID;
                }
            });
        },

        AddToMyCart: function() {
            if (itemTypeId == 3) {
                var giftCardDetail = {
                    Price: $("#hdnPrice").val(),
                    GiftCardTypeId: parseInt($("input[name=giftcard-type]:checked").val()),
                    GiftCardCode: '',
                    GraphicThemeId: parseInt($(".pikachoose ul li img.active").attr('data-id')),
                    SenderName: $.trim($("#txtgc_senerName").val()),
                    SenderEmail: $.trim($("#txtgc_senerEmail").val()),
                    RecipientName: $.trim($("#txtgc_recieverName").val()),
                    RecipientEmail: $.trim($("#txtgc_recieverEmail").val()),
                    Messege: $.trim($("#gcmessage").val())
                };
                if (parseInt($("input[name=giftcard-type]:checked").val()) == 12) {
                    //giftcard is physical ->no need reciever

                } else {
                    if ($.trim($("#txtgc_recieverName").val()) == "" ||
                        $.trim($("#txtgc_recieverEmail").val()) == "") {
                        // csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, '!') + '</p>');

                        csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Please fill valid required data!') + '</p>');
                        return false;

                    } else {
                        if (!/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test($.trim($("#txtgc_recieverEmail").val()))) {
                            csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Please fill valid email address !') + '</p>');
                            return false;
                        }

                    }
                }
                if (giftCardDetail.SenderName != "" || giftCardDetail.SenderEmail != "") {
                    if (!/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(giftCardDetail.SenderEmail)) {
                        csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Please fill valid email address !') + '</p>');
                        return false;
                    }
                    var addItemToCartObj = {
                        ItemID: itemId,
                        Price: $("#hdnPrice").val(),
                        Weight: 0,
                        Quantity: 1,
                        CostVariantIDs: '0@',
                        IsGiftCard: true
                    };
                    var paramz = {
                        AddItemToCartObj: addItemToCartObj,
                        aspxCommonObj: aspxCommonObj(),
                        giftCardDetail: giftCardDetail
                    };
                    var dataz = JSON2.stringify(paramz);
                    this.config.method = "AspxCommerceWebService.asmx/AddItemstoCartFromDetail";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = dataz;
                    this.config.ajaxCallMode = LatestItems.AddToMyCartSuccess;
                    //this.config.oncomplete = 20;
                    this.config.error = LatestItems.GetAddToCartErrorMsg;
                    this.ajaxCall(this.config);
                } else {
                    csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Please fill valid required data!') + '</p>');
                    return false;
                }

            } else {
                if (info.IsCombinationMatched) {
                    if ($.trim($("#txtQty").val()) == "" || $.trim($("#txtQty").val()) <= 0) {
                        // alert("Invalid quantity");
                        csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Invalid quantity.') + '</p>');
                        return false;
                    }
                    var itemPrice = $("#hdnPrice").val();
                    var itemQuantity = $.trim($("#txtQty").val());
                    var itemCostVariantIDs = [];
                    var weightWithVariant = 0;
                    var totalWeightVariant = 0;
                    var costVariantPrice = 0;
                    if ($('#divCostVariant').is(':empty')) {
                        //itemCostVariantIDs = '0';
                        itemCostVariantIDs.push(0);
                    } else {
                        $("#divCostVariant select option:selected").each(function() {
                            if ($(this).val() != 0) {
                                itemCostVariantIDs.push($(this).val());
                            } else {
                            }
                        });
                        $("#divCostVariant input[type=radio]:checked").each(function() {
                            if ($(this).val() != 0) {
                                itemCostVariantIDs.push($(this).val());
                            } else {
                            }
                        });

                        $("#divCostVariant input[type=checkbox]:checked").each(function() {
                            if ($(this).val() != 0) {
                                itemCostVariantIDs.push($(this).val());
                            } else {
                            }
                        });


                        //itemCostVariantIDs = itemCostVariantIDs.substring(0, itemCostVariantIDs.length - 1);
                    }
                    var itemQuantityInCart = LatestItems.CheckItemQuantityInCart(itemId, itemCostVariantIDs.join('@') + '@');
                    if (itemQuantityInCart != 0.1) { //To know whether the item is downloadable (0.1 downloadable)
                        if (allowOutStockPurchase.toLowerCase() == 'false') {
                            if (info.Quantity <= 0) {
                                csscody.alert("<h2>" + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'This product is currently out of stock!') + "</p>");
                                return false;
                            } else {
                                if ((eval($.trim($("#txtQty").val())) + eval(itemQuantityInCart)) > eval(info.Quantity)) {
                                    //csscody.alert("<h2>Information Alert</h2><p>You Can't add more than " + $("#hdnQuantity").val() + " quantity!</p>");
                                    csscody.alert("<h2>" + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'This product is currently out of stock!') + "</p>");
                                    return false;
                                }
                            }
                        }
                    }
                    if (info.IsPricePercentage) {
                        costVariantPrice = eval($("#hdnPrice").val()) * eval(info.PriceModifier) / 100;
                    } else {
                        costVariantPrice = eval(info.PriceModifier);
                    }
                    if (info.IsWeightPercentage) {
                        weightWithVariant = eval($("#hdnWeight").val()) * eval(info.WeightModifier) / 100;
                    } else {
                        weightWithVariant = eval(info.WeightModifier);
                    }

                    totalWeightVariant = eval($("#hdnWeight").val()) + eval(weightWithVariant);
                    itemPrice = eval(itemPrice) + eval(costVariantPrice);
                    var AddItemToCartObj = {
                        ItemID: itemId,
                        Price: itemPrice,
                        Weight: totalWeightVariant,
                        Quantity: itemQuantity,
                        CostVariantIDs: itemCostVariantIDs.join('@') + '@',
                        IsGiftCard: false
                    };
                    var param = {
                        AddItemToCartObj: AddItemToCartObj,
                        aspxCommonObj: aspxCommonObj(),
                        giftCardDetail: null
                    };
                    var data = JSON2.stringify(param);
                    this.config.method = "AspxCommerceWebService.asmx/AddItemstoCartFromDetail";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = data;
                    this.config.ajaxCallMode = LatestItems.AddToMyCartSuccess;
                    //this.config.oncomplete = 20;
                    this.config.error = LatestItems.GetAddToCartErrorMsg;
                    this.ajaxCall(this.config);
                } else {
                    csscody.alert('<h2>' + getLocale(AspxLatestItem, 'Information Alert') + '</h2><p>' + getLocale(AspxLatestItem, 'Please choose available variants!') + '</p>');
                }
            }
        },

        ResetGallery: function(costcombinationId) {
            $('.pika-image,.jcarousel-skin-pika,.pikachoose').html('');
            var ids = '';
            $("#divCostVariant input[type=radio]:checked").each(function() {
                ids += $(this).val() + "@";
            });

            $("#divCostVariant input[type=checkbox]:checked").each(function() {
                ids += $(this).val() + "@";
            });
            $("#divCostVariant select option:selected").each(function() {
                ids += $(this).val() + "@";
            });
            ids = ids.substr(0, ids.length - 1);
            LatestItems.GetImageLists(ids, itemSKU, costcombinationId);
        },
        LoadLatestItemRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#latestItemRssImage').parent('a').show();
            $('#latestItemRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=latestitems');
            $('#latestItemRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#latestItemRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Latest Items Rss Feed Title"));
            $('#latestItemRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Latest Items Rss Feed Alt"));
        },

        init: function() {
            $("#divLatestItems").hide();
            if (enableLatestItems.toLowerCase() == 'true' && noOfLatestItems > 0) {
                //LatestItems.GetLatestItems();
                $("#divLatestItems").show();
            }
            $("#btnAddToMyCart").hide();
            var itemVariantIds = '';
            $(".sfQuickLook").find('img').live('click', function() {
                arrCombination = [];
                variantValuesID = [];
                var costVariantsData = '';
                arrCostVariants = [];
                $(".popbox").html('');
                $(".cssClassItemBrands").html('');
                if ($.session("ItemCostVariantData")) {
                    costVariantsData = $.session("ItemCostVariantData");
                    arrCostVariants = costVariantsData.split(',');
                }
                itemId = $(this).attr('itemid');
                itemSKU = $(this).attr('sku');
                LatestItems.vars.ItemSKU = itemSKU;
                //LatestItems.BindItemQuantityDiscountByUserName(itemSKU);
                LatestItems.GetFormFieldList(itemSKU);
                LatestItems.BindItemBasicByitemSKU(itemSKU);
                LatestItems.BindDownloadEvent();
                $(".cssClassQuickView").css('margin-top', '-187px');
                //$(".cssClassQuickView #pikame").css('width', '648px');
                $("#viewMore").find('a').attr('href', aspxRedirectPath + 'item/' + itemSKU + pageExtension);
                ShowPopup(this);
            });
            $(".cssClassClose").bind("click", function() {
                $('#fade, #popuprel').fadeOut();
            });
            $(".divQuickLookonHover").live('mouseout', function() {
                $(this).parent(".cssClassProductsBoxInfo").find(".sfQuickLook").hide();
            }).live('mouseover', function() {
                $(this).parent(".cssClassProductsBoxInfo").find(".sfQuickLook").show();

            });
            $(".divitemImage img").live('mouseout', function() {
                SwapImageOnMouseOut($(this).attr("id"), aspxRootPath + $(this).attr("orignalPath"));
            }).live('mouseover', function() {
                SwapImageOnMouseOver($(this).attr("id"), aspxRootPath + $(this).attr("altImagePath"));
            });
            $("#divCostVariant input[type=radio]:checked").each(function() {
                itemVariantIds += $(this).val() + ",";
            });
            $("#divCostVariant input[type=checkbox]:checked").each(function() {
                itemVariantIds += $(this).val() + ",";
            });
            $("#divCostVariant select option:selected").each(function() {
                itemVariantIds += $(this).val() + ",";
            });
            itemVariantIds = itemVariantIds.substr(0, itemVariantIds.length - 1);
            $("#txtQty").bind("contextmenu", function(e) {
                return false;
            });
            $('#txtQty').bind('paste', function(e) {
                e.preventDefault();
            });
            $("#txtQty").bind('focus', function(e) {
                $(this).val('');
                $('#lblNotification').html('');
            });
            $("#txtQty").bind('select', function(e) {
                $(this).val('');
                $('#lblNotification').html('');
            });
            $("#txtQty").bind('blur', function(e) {
                $('#lblNotification').html('');
                $("#txtQty").val($(this).attr('addedValue'));
            });

            $("#txtQty").bind("keypress", function(e) {
                var itemCostVariantIDs = '';
                if ($('#divCostVariant').is(':empty')) {
                    itemCostVariantIDs = '0@';
                } else {
                    $("#divCostVariant select option:selected").each(function() {
                        if ($(this).val() != 0) {
                            itemCostVariantIDs += $(this).val() + "@";
                        } else {
                        }
                    });
                    $("#divCostVariant input[type=radio]:checked").each(function() {
                        if ($(this).val() != 0) {
                            itemCostVariantIDs += $(this).val() + "@";
                        } else {
                        }
                    });

                    $("#divCostVariant input[type=checkbox]:checked").each(function() {
                        if ($(this).val() != 0) {
                            itemCostVariantIDs += $(this).val() + "@";
                        } else {
                        }
                    });
                }
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    if (info.Quantity <= 0) {
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

                            var itemQuantityInCart = LatestItems.CheckItemQuantityInCart(itemId, itemCostVariantIDs);
                            if (itemQuantityInCart != 0.1) { //to test if the item is downloadable or simple(0.1 downloadable)

                                if ((eval($("#txtQty").val() + '' + num) + eval(itemQuantityInCart)) > eval(info.Quantity)) {
                                    $('#lblNotification').html(getLocale(AspxLatestItem, 'The quantity is greater than the available quantity.'));
                                    return false;
                                } else {
                                    $('#lblNotification').html('');
                                }
                            } else {
                                $("#txtQty").val(1).attr("disabled", "disabled");
                            }

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
                    $("#txtQty").attr('addedValue', eval($("#txtQty").val() + '' + num));
                }
            });
            if (latestItemRss.toLowerCase() == 'true') {
                LatestItems.LoadLatestItemRssImage();
            }
        }
    };
    LatestItems.init();
});

       
    

       

    