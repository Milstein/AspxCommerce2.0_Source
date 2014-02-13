var ItemDetail = "";
Variable = function(height, width, thumbWidth, thumbHeight) {
    this.height = height;
    this.width = width;
    this.thumbHeight = thumbHeight;
    this.thumbWidth = thumbWidth;
};

var newObject = new Variable(255, 320, 87, 75);
$(function() {
    var userModuleID = UserModuleID;
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var customerId = AspxCommerce.utils.GetCustomerID();
    var userIP = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var sessionCode = AspxCommerce.utils.GetSessionCode();
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var templatePath = AspxCommerce.utils.GetAspxTemplateFolderPath();
    var itemId = itemID;
    var itemName = itemNamePageBehind;
    var RelatedItems = '';
    var ItemTags = '';
    var TagNames = '';
    var MyTags = '';
    var UserTags = '';
    var ratingValues = '';
    var ItemsReview = new Array();
    var isNotificationExist = false;
    var variantId = new Array();
    var arrItemDetailsReviewList = new Array();
    var arrItemReviewList = new Array();
    var arrCostVariants;
    var FormCount = new Array();
    var arrCombination = [];
    //var itemTypeId = 0;
    var variantValuesID = [];
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: storeId,
            PortalID: portalId,
            UserName: userName,
            CultureName: cultureName,
            CustomerID: customerId,
            SessionCode: sessionCode
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
                isExist = true; break;
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
        $("#Notify").hide();
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
        //  $("#spnShowAvailability").html(info.IsCombinationMatched == true ? getLocale(DetailsBrowse,'Available') : getLocale(DetailsBrowse,'Not available'));
        $("#spanAvailability").html(info.IsCombinationMatched == true ? '<b>' + getLocale(DetailsBrowse, 'In stock') + '</b>' : '<b>' + getLocale(DetailsBrowse, 'Not available') + '</b>');
        info.IsCombinationMatched == true ? $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(DetailsBrowse, "Add to Cart")) : $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(DetailsBrowse, "Out Of Stock"));

        if (info.IsCombinationMatched) {
            $("#hdnQuantity").val('').val(info.Quantity);
            $("#txtQty").removeAttr('disabled').attr("enabled", "enabled");
            if (info.Quantity == 0 || info.Quantity < 0) {
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    //$("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html("Out Of Stock");
                    $("#spanAvailability").html("<b>" + getLocale(DetailsBrowse, "Out Of Stock") + "</b>");
                    $("#spanAvailability").addClass('cssOutOfStock');
                    $("#spanAvailability").removeClass('cssInStock');
                    if (userName != "anonymoususer") {
                        $("#Notify").show();
                        $("#Notify #txtNotifiy").hide();
                    }
                    else {
                        $("#Notify").show();
                        $("#txtNotifiy").show();
                    }
                }

            } else {
                //$("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html("Add to Cart");
                $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'In stock') + '</b>' + '</b>');
                $("#spanAvailability").removeClass('cssOutOfStock');
                $("#spanAvailability").addClass('cssInStock');
                $("#Notify").hide();
            }
            var quantityinCart = ItemDetail.CheckItemQuantityInCart(itemID, values.join('@') + '@');
            if (info.Quantity <= quantityinCart) {
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                    $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(DetailsBrowse, "Out Of Stock"));
                    // $("#spnShowAvailability").html(getLocale(DetailsBrowse,"This product is out of stock!"));
                    $("#spanAvailability").html("<b>" + getLocale(DetailsBrowse, "Out Of Stock") + "</b>");
                    $("#spanAvailability").addClass('cssOutOfStock');
                    $("#spanAvailability").removeClass('cssInStock');
                    if (userName != "anonymoususer") {
                        $("#Notify").show();
                        $("#Notify #txtNotifiy").hide();
                    }
                    else {
                        $("#Notify").show();
                        $("#txtNotifiy").show();
                    }
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
            if ($("#hdnListPrice").val() != '') {
                $(".cssClassYouSave").show();
                var variantAddedPrice = eval($("#hdnPrice").val()) + eval(price);
                var variantAddedSavingPercent = (($("#hdnListPrice").val() - variantAddedPrice) / $("#hdnListPrice").val()) * 100;
                savingPercent2 = variantAddedSavingPercent.toFixed(2);
                $("#spanSaving").html('<b>' + variantAddedSavingPercent.toFixed(2) + '%</b>');
            }
            ItemDetail.ResetGallery(info.CombinationID);
        } else {
            $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(DetailsBrowse, "Add to Cart"));
            $("#spanAvailability").removeClass('cssOutOfStock');
            $("#spanAvailability").removeClass('cssInStock');

        }

    }

    function selectFirstcombination() {
        if (arrCombination.length > 0) {
            var cvcombinationList = getObjects(arrCombination, 'CombinationType');
            var cvValuecombinationList = getObjects(arrCombination, 'CombinationValues');
            var x = cvcombinationList[0].split('@');
            var y = cvValuecombinationList[0].split('@');
            $("#Notify").hide();
            $("#divCostVariant select").each(function(i) {
                if (parseInt($(this).parent("span:eq(0)").attr('id').replace('subDiv', '')) == x[i]) {
                    if ($(this).find("option[value=" + y[i] + "]").length > 0) {
                        $(this).find("option[value=" + y[i] + "]").attr('selected', 'selected');

                    } else {
                        var options = $(this).html();
                        var noOption = "<option value='0'>" + getLocale(DetailsBrowse, "Not required") + "</option>";
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
                        var noOption = "<option value='0'>" + getLocale(DetailsBrowse, "Not required") + "</option>";
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
            // $("#spnShowAvailability").html(info.IsCombinationMatched == true ? getLocale(DetailsBrowse,'Available') : getLocale(DetailsBrowse,'Not available'));
            $("#spanAvailability").html(info.IsCombinationMatched == true ? '<b>' + getLocale(DetailsBrowse, 'In stock') + '</b>' : '<b>' + getLocale(DetailsBrowse, 'Not available') + '</b>');
            info.IsCombinationMatched == true ? $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(DetailsBrowse, "Add to Cart")) : $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(DetailsBrowse, "Out Of Stock"));

            if (info.IsCombinationMatched) {
                $("#hdnQuantity").val('').val(info.Quantity);
                $("#txtQty").removeAttr('disabled').attr("enabled", "enabled");
                if (info.Quantity == 0 || info.Quantity < 0) {
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(DetailsBrowse, "Out Of Stock"));
                        // $("#spnShowAvailability").html(getLocale(DetailsBrowse,"This product is out of stock!"));
                        $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'Out Of Stock') + '</b>');
                        $("#spanAvailability").addClass('cssOutOfStock');
                        $("#spanAvailability").removeClass('cssInStock');
                        if (userName != "anonymoususer") {
                            $("#Notify").show();
                            $("#Notify #txtNotifiy").hide();
                        } else {
                            $("#Notify").show();
                            $("#txtNotifiy").show();
                        }
                    }

                } else {
                    $("#btnAddToMyCart").removeClass("cssClassOutOfStock").addClass('cssClassAddToCard').removeAttr("disabled").attr('enabled', "enabled").find("span>span").html(getLocale(DetailsBrowse, "Add to Cart"));
                    // $("#spnShowAvailability").html(info.IsCombinationMatched == true ? getLocale(DetailsBrowse,'Available') : getLocale(DetailsBrowse,'Not available'));
                    $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'In stock') + '</b>');
                    $("#spanAvailability").removeClass('cssOutOfStock');
                    $("#spanAvailability").addClass('cssInStock');
                    $("#Notify").hide();
                }

                var quantityinCart = ItemDetail.CheckItemQuantityInCart(itemID, cvValuecombinationList[0] + '@');
                if (info.Quantity <= quantityinCart) {
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                        $("#btnAddToMyCart").removeClass("cssClassAddToCard").addClass('cssClassOutOfStock').attr("disabled", "disabled").find("span>span").html(getLocale(DetailsBrowse, "Out Of Stock"));
                        // $("#spnShowAvailability").html(getLocale(DetailsBrowse,"This product is out of stock!"));
                        $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'Out Of Stock') + '</b>');
                        $("#spanAvailability").addClass('cssOutOfStock');
                        $("#spanAvailability").removeClass('cssInStock');
                        if (userName != "anonymoususer") {
                            $("#Notify").show();
                            $("#Notify #txtNotifiy").hide();
                        } else {
                            $("#Notify").show()
                            $("#txtNotifiy").show();
                        }
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
                ItemDetail.ResetGallery(info.CombinationID);
            }
        } else {
            ItemDetail.ResetGallery(0);
        }


    }

    CheckVariantCombination = function(costVIds, costValIds, currentCostVar, currentCostVal) {
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
            }
            else {
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
    };

    var snippet = {};
    ItemDetail = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath(),
            method: "",
            url: "",
            oncomplete: 0,
            ajaxCallMode: "",
            error: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: ItemDetail.config.type,
                contentType: ItemDetail.config.contentType,
                cache: ItemDetail.config.cache,
                async: ItemDetail.config.async,
                url: ItemDetail.config.url,
                data: ItemDetail.config.data,
                dataType: ItemDetail.config.dataType,
                success: ItemDetail.config.ajaxCallMode,
                error: ItemDetail.config.error,
                complete: ItemDetail.oncomplete
            });
        },
        CreateSnippet: function() {
            try {
                var snippetHtml = "";
                snippetHtml += "<div style=\"display:none;\"> <div itemscope itemtype=\"http://data-vocabulary.org/Product\"> ";
                //item info
                snippetHtml += " <span itemprop=\"brand\" >" + snippet.Brand + "</span> ";
                snippetHtml += "<span itemprop=\"name\">" + snippet.Name + "</span>";
                snippetHtml += "<span itemprop=\"description\">" + snippet.Description + "</span>";
                snippetHtml += "<span itemprop=\"category\"  content=\"" + snippet.Description + "\"></span>";


                snippetHtml += "<span itemprop=\"review\" itemscopeitemtype=\"http://data-vocabulary.org/Review-aggregate\">";
                //rating review
                snippetHtml += "<span itemprop=\"rating\">" + art + "</span>";
                snippetHtml += "<span itemprop=\"count\">" + trc + "</span>";
                snippetHtml += "</span>";

                snippetHtml += "<span itemprop=\"offerDetails\" itemscope itemtype=\"http://data-vocabulary.org/Offer\">";
                //item Offer
                snippetHtml += "<span itemprop=\"price\">" + snippet.Price + "</span>";
                snippetHtml += "<span itemprop=\"currency\">" + "USD" + "</span>";
                var availability = snippet.IsOutOfStock == true ? "out_of_stock" : "in_stock";
                snippetHtml += "<span itemprop=\"availability\" content=\"" + availability + "\"></span>";
                //out_of_stock
                //in_stock
                //instore_only
                //preorder
                snippetHtml += "</span>";
                snippetHtml += "</div>";

                $("body").append(snippetHtml);
            } catch (e) {

            }

        },

        SetCompareItemsCount: function(msg) {
            ItemDetail.vars.countCompareItems = msg.d;
        },

        BindItemQuantityDiscount: function(msg) {
            $("#itemQtyDiscount>tbody").html('');
            if (msg.d.length > 0) {
                $("#bulkDiscount").html(getLocale(DetailsBrowse, '(Bulk Discount available)'));
                var qytDiscount = '';
                $.each(msg.d, function(index, item) {
                    qytDiscount += "<tr><td>" + parseInt(item.Quantity) + "</td><td><span class='cssClassFormatCurrency'>" + (item.Price * rate).toFixed(2) + "</span></td></tr>";
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

        BindCostVariant: function(msg) {
            if (msg.d.length > 0) {
                var CostVariant = '';
                var variantValue = [];
                $.each(msg.d, function(index, item) {
                    if (CostVariant.indexOf(item.CostVariantID) == -1) {
                        CostVariant += item.CostVariantID;
                        variantId.push(item.CostVariantID);
                        var addSpan = '';
                        addSpan += '<div id="div_' + item.CostVariantID + '" class="cssClassHalfColumn">';
                        addSpan += '<span id="spn_' + item.CostVariantID + '" ><b>' + item.CostVariantName + ':</b> ' + '</span>';
                        addSpan += '<span class="spn_Close"><a href="#"><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/uncheck.png" title=' + getLocale(DetailsBrowse, "Don\'t use this option") + '" alt=' + getLocale(DetailsBrowse, "Don\'t use this option") + '/></a></span>'; $('#divCostVariant').append(addSpan);
                        addSpan += '</div>';

                    }
                    var valueID = '';
                    var itemCostValueName = '';
                    if (item.CostVariantsValueID != -1) {
                        if (item.InputTypeID == 5 || item.InputTypeID == 6) {
                            if ($('#controlCostVariant_' + item.CostVariantID + '').length == 0) {
                                itemCostValueName += '<span class="sfListmenu" id="subDiv' + item.CostVariantID + '">';
                                valueID = 'controlCostVariant_' + item.CostVariantID;
                                itemCostValueName += ItemDetail.CreateControl(item, valueID, false);

                                itemCostValueName += "</span>";
                                $('#div_' + item.CostVariantID + '').append(itemCostValueName);
                            }
                            //Blue (+10%)
                            //Red (+$10.00)
                            if (!IsExists(variantValue, item.CostVariantsValueID)) {
                                variantValue.push(item.CostVariantsValueID);
                                optionValues = ItemDetail.BindInsideControl(item, valueID);
                                // alert('#controlCostVariant_' + item.CostVariantID + '');
                                $('#controlCostVariant_' + item.CostVariantID + '').append(optionValues);
                            }
                            $('#controlCostVariant_' + item.CostVariantID + ' option:first-child').attr("selected", "selected");
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        } else {
                            if ($('#subDiv' + item.CostVariantID + '').length == 0) {
                                itemCostValueName += '<span class="cssClassRadio" id="subDiv' + item.CostVariantID + '">';
                                valueID = 'controlCostVariant_' + item.CostVariantID;
                                itemCostValueName += ItemDetail.CreateControl(item, valueID, true);
                                itemCostValueName += "</span>";
                                $('#div_' + item.CostVariantID + '').append(itemCostValueName);
                            } else {
                                valueID = 'controlCostVariant_' + item.CostVariantID;
                                itemCostValueName += ItemDetail.CreateControl(item, valueID, false);
                                $('#subDiv' + item.CostVariantID + '').append(itemCostValueName);
                            }
                        }
                    }
                });
                $('#divCostVariant').append('<div class="cssClassClear"></div>');
                if ($('#divCostVariant').is(':empty')) {
                    $("#divCostVariant").removeClass("cssClassCostVariant");
                } else {
                    $("#divCostVariant").addClass("cssClassCostVariant");
                }
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
                        var noOption = "<option value=0 >" + getLocale(DetailsBrowse, "Not required") + "</option>";
                        $(this).next('span:first').find("select").html(noOption + options);
                    } else {
                        $(this).next('span:first').find("select").find("option[value=0]").attr('selected', 'selected');
                    }
                    checkAvailibility(null);
                });
                //.trigger('change');
                $('.cssClassDropDownItem').MakeFancyItemDropDown();
                //end
                setTimeout(function() {
                    ItemDetail.LoadCostVariantCombination(itemSKU);
                    ItemDetail.variantCheckQuery();
                }, 200);
            }
            else {
                ItemDetail.LoadCostVariantCombination(itemSKU);
            }
        },

        BindItemAverageRatingReview: function(msg) {
            if (msg.d.length > 0) {
                $(".cssClassAddYourReview").html(getLocale(DetailsBrowse, "Write Your Own Review"));
                $(".cssClassItemRatingBox").addClass('cssClassToolTip');
                $.each(msg.d, function(index, item) {
                    if (index == 0) {
                        $(".cssClassTotalReviews").html(getLocale(DetailsBrowse, 'Read Reviews') + '[' + item.TotalReviewsCount + '] ');
                        ItemDetail.BindStarRating(item.TotalRatingAverage);
                    }
                    ItemDetail.BindViewDetailsRatingInfo(item.ItemRatingCriteriaID, item.ItemRatingCriteria, item.RatingCriteriaAverage);
                });
                // $('input.star').rating();
            } else {
                var avgRating = "<tr><td>" + getLocale(DetailsBrowse, "Currently there are no reviews") + "</td></tr>";
                $("#tblAverageRating").append(avgRating);
                $(".cssClassItemRatingBox").removeClass('cssClassToolTip');

                $(".cssClassSeparator").hide();
                $(".cssClassAddYourReview").html(getLocale(DetailsBrowse, "Be the first to review this item."));
            }
        },

        BindItemRatingPerUser: function(msg) {
            arrItemDetailsReviewList.length = 0;
            arrItemReviewList.length = 0;
            var rowTotal = 0;
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    ItemDetail.BindItemsRatingByUser(item, index);
                    rowTotal = item.RowTotal;
                });
                // Create pagination element with options from form
                var optInit = ItemDetail.getOptionsFromForm();
                $("#Pagination").pagination(rowTotal, optInit);
                $("#divSearchPageNumber").show();
            } else {
                $("#divSearchPageNumber").hide();
                //alert("No user rating is found!");
                var avgRating = "<tr><td>" + getLocale(DetailsBrowse, "Currently no rating and reviews are available.") + "</td></tr>";
                $("#tblRatingPerUser").append(avgRating);
            }
        },

        BindItemRatingCriteria: function(msg) {
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    ItemDetail.RatingCriteria(item);
                });
            } else {
                csscody.alert("<h2>" + getLocale(DetailsBrowse, "Information Alert") + "</h2><p>" + getLocale(DetailsBrowse, "No rating criteria are found!") + "</p>");
            }
        },

        SaveItemRatingMsg: function(msg) {
            csscody.info("<h2>" + getLocale(DetailsBrowse, "Information Message") + "</h2><p>" + getLocale(DetailsBrowse, "Your review has been accepted for moderation.") + "</p>");
            $('#fade, #popuprel2').fadeOut();
            ItemDetail.CheckReviewByUser(userName);
            ItemDetail.CheckReviewByIP(userIP);
            if (customerId > 0 && userName.toLowerCase() != "anonymoususer") {
                if (allowMultipleReviewPerUser.toLowerCase() != "true" && ItemDetail.vars.existReviewByUser == true) {
                    $("a").removeClass("popupAddReview");
                    $(".cssClassAddYourReview").hide();
                }
            }

            if (allowMultipleReviewPerIP.toLowerCase() != "true" && ItemDetail.vars.existReviewByIP == true) {
                $("a").removeClass("popupAddReview");
                $(".cssClassAddYourReview").hide();
            }

        },


        BindReferFriendPopup: function(msg) {
            $('#controlload').html(msg.d);
        },

        BindItemBasicInfoByitemSKU: function(msg) {
            if (msg.d != null) {
                ItemDetail.BindItemsBasicInfo(msg.d);
                ItemDetail.GetCostVariantsByitemSKU(itemSKU);
                //BindCostVariantOptions(itemSKU);
                // $('.popupEmailAFriend').attr('imagepath', itemImagePath + msg.d.BaseImage);
                //This adds Recently View table and also update item's viewed count table
                ItemDetail.AddUpdateRecentlyViewedItem(itemSKU);

                //ItemDetail.GetYouMayAlsoLikeItemsList();
            }
        },

        BindItemFormAttributes: function(msg) {
            var attributeSetId = 0;

            $.each(msg.d, function(index, item) {
                if (index == 0) {
                    attributeSetId = item.AttributeSetID;
                    itemTypeId = item.ItemTypeID;
                }
            });
            ItemDetail.CreateForm(msg.d, attributeSetId, itemTypeId, ItemDetail.vars.itemSKU);
            if (ItemDetail.vars.itemSKU.length > 0) {
                ItemDetail.BindDataInTab(ItemDetail.vars.itemSKU, attributeSetId, itemTypeId);
                ItemDetail.BindRatingReviewTab();

            }
        },

        BindItemDetailsInTab: function(msg) {
            $.each(msg.d, function(index, item) {
                ItemDetail.FillItemAttributes(itemSKU, item);
            });
            ItemDetail.GetItemTags();
            //BindDownloadUpEvent();
        },

        BindTags: function(msg) {
            $.each(msg.d, function(index, item) {
                ItemDetail.BindItemTags(item, index);
            });
            $("#divItemTags").html(ItemTags.substring(0, ItemTags.length - 2));
            $("#divMyTags").html(MyTags.substring(0, MyTags.length - 2));
        },

        BindTagAfterDelete: function(msg) {
            ItemDetail.GetItemTags();
        },

        BindTagAfterAdd: function(msg) {
            ItemDetail.GetItemTags();
            ItemDetail.ClearTableContentTags(this);
            csscody.info("<h2>" + getLocale(DetailsBrowse, "Information Message") + "</h2><p>" + getLocale(DetailsBrowse, "your tag(s) has been accepted for moderation.") + "</p>");

        },

        BindYouMayAlsoLikeItem: function(msg) {
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    ItemDetail.BindYouMayAlsoLikeItems(index, item);
                });
                RelatedItems += "<div class=\"cssClassClear\"></div>";
            } else {
                RelatedItems += "<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items listed yet.") + "</span>";
            }
            $('.cssClassYouMayAlsoLike').show();
            $("#divYouMayAlsoLike").html(RelatedItems);
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            $('.cssClassProductPicture a img[title]').tipsy({ gravity: 'n' });
        },

        SetItemQuantityInCart: function(msg) {
            ItemDetail.vars.itemQuantityInCart = msg.d;
        },

        BindItemsImageGallery: function(msg) {
            ItemDetail.GetFilePath(msg);
            //            ItemDetail.Gallery();
            //            ItemDetail.ImageZoom();
        },

        ReturnedDimension: function(msg) {
            ItemDetail.SetValueForStyle(msg);
        },

        BindItemVideos: function(ItemVideoIDs) {
            var element = '';
            element = "<ul>";
            var arr = [];
            arr = ItemVideoIDs.split(',');
            $.each(arr, function(index, item) {
                element += '<li><img class="youtube" id="' + item + '" src="http://img.youtube.com/vi/' + item + '/default.jpg" onerror="ItemDetail.FailToLoadItemVideo(this)" title="Click me to play!" /></li>';
            });
            element += "</ul>";
            $("#ItemVideos").append(element);
            $("img.youtube").YouTubePopup({ idAttribute: 'id' });
        },
        FailToLoadItemVideo: function(img) {
            $(img).attr('src', templatePath + '/images/youtube.jpg').attr('title', getLocale(DetailsBrowse, 'failed to load video thumbs something goes wrong..!'));

        },
        AddItemstoCartFromDetail: function(msg) {
            if (msg.d == 1) {
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
                csscody.addToCart('<h2>' + getLocale(DetailsBrowse, "Successful Message") + '</h2><p>' + getLocale(DetailsBrowse, 'Item has been successfully added to cart.') + '</p>', addToCartProperties);
                HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                ShopingBag.GetCartItemCount(); //for bag count
                ShopingBag.GetCartItemListDetails(); //for shopping bag detail
            }
            else if (msg.d == 2) {
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    csscody.alert("<h2>" + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'This product is currently Out Of Stock!') + "</p>");
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
                    csscody.addToCart('<h2>' + getLocale(DetailsBrowse, "Successful Message") + '</h2><p>' + getLocale(DetailsBrowse, 'Item has been successfully added to cart.') + '</p>', addToCartProperties);
                    HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                    ShopingBag.GetCartItemCount(); //for bag count
                    ShopingBag.GetCartItemListDetails(); //for shopping bag detail
                }
            }
        },

        SetReviewByUserStatus: function(msg) {
            ItemDetail.vars.existReviewByUser = msg.d;
        },

        SetReviewByIPStatus: function(msg) {
            ItemDetail.vars.existReviewByIP = msg.d;
        },

        BindCostVariantCombination: function(msg) {
            $.each(msg.d, function(index, item) {
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
            //if (variantQuery == null || variantQuery == '')
            selectFirstcombination();
        },

        GetNotificationMessage: function() {
            csscody.info("<h2>" + getLocale(DetailsBrowse, "Information Message") + "</h2><p>" + getLocale(DetailsBrowse, "Thank you ! You will be notified as soon as the items get available in the store for purchase.") + "</p>");
        },
        GetNotificationResult: function(msg) {
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    if (value.ItemSKU == itemSKU && value.Email == userEmail && value.MailStatus == 0) {
                        isNotificationExist = true;
                        return false;
                    }
                });
            }
        },
        oncomplete: function() {
            switch (ItemDetail.config.oncomplete) {
                case 20:
                    ItemDetail.config.oncomplete = 0;
                    if ($("#divCartDetails").length > 0) {
                        AspxCart.GetUserCartDetails(); //for binding mycart's tblCartList
                    }
                    if ($("#dynItemDetailsForm").length > 0) {
                        ItemDetail.BindItemBasicByitemSKU(itemSKU);
                    }
                    break;
            }
        },

        GetLoadErrorMsg: function() {
            csscody.error('<h2>' + getLocale(DetailsBrowse, "Error Message") + '</h2><p>' + getLocale(DetailsBrowse, 'Failed to load cost variants!') + '</p>');
        },

        GetItemRatingErrorMsg: function() {
            csscody.error('<h2>' + getLocale(DetailsBrowse, 'Error Message') + '</h2><p>' + getLocale(DetailsBrowse, 'Failed to save!') + '</p>');
        },

        GetTagsLoadErrorMsg: function() {
            csscody.error('<h2>' + getLocale(DetailsBrowse, 'Error Message') + '</h2><p>' + getLocale(DetailsBrowse, 'Failed to load item tags!') + '</p>');
        },

        GetTagsSaveErrorMsg: function() {
            csscody.error('<h2>' + getLocale(DetailsBrowse, 'Error Message') + '</h2><p>' + getLocale(DetailsBrowse, 'Failed to save tags!') + '</p>');
        },

        GetAddToCartErrorMsg: function() {
            csscody.error('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Failed to add item to cart!') + '</p>');
        },
        GetNotificationErrorMsg: function() {
            csscody.alert("<h2>" + getLocale(DetailsBrowse, 'Error') + '</h2><p>' + getLocale(DetailsBrowse, 'Error occured!') + "</p>");
        },
        vars: {
            countCompareItems: "",
            itemSKU: itemSKU,
            itemQuantityInCart: "",
            userEmail: userEmail,
            itemId: itemID,
            existReviewByUser: "",
            existReviewByIP: "",
            userFullName: userFullName
        },

        GetCompareItemsCount: function() {
            var param = { aspxCommonObj: aspxCommonObj() };
            var Data = JSON2.stringify(param);
            this.config.method = "AspxCommerceWebService.asmx/GetCompareItemsCount";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = Data;
            this.config.ajaxCallMode = ItemDetail.SetCompareItemsCount;
            //this.config.error = 1;
            this.ajaxCall(this.config);
            return ItemDetail.vars.countCompareItems;
        },

        BindDownloadEvent: function() {
            $(".cssClassLink").jDownload({
                root: aspxFilePath,
                dialogTitle: getLocale(DetailsBrowse, 'AspxCommerce download sample item:')
            });
        },

        LoadCostVariantCombination: function() {
            var param = JSON2.stringify({ itemSku: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetCostVariantCombinationbyItemSku";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.BindCostVariantCombination;
            //this.config.error = 23;
            this.config.async = false;
            this.ajaxCall(this.config);
        },

        BindItemQuantityDiscountByUserName: function(itemSKU) {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), itemSKU: itemSKU });
            this.config.method = "AspxCommerceWebService.asmx/GetItemQuantityDiscountByUserName";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.BindItemQuantityDiscount;
            //this.config.error = 2;
            this.ajaxCall(this.config);

        },

        GetCostVariantsByitemSKU: function(itemSKU) {
            $('#divCostVariant').html('');
            var param = JSON2.stringify({ itemSku: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetCostVariantsByItemSKU";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.BindCostVariant;
            this.config.error = ItemDetail.GetLoadErrorMsg;
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

        BindRatingReviewTab: function() {
            $("#tblRatingPerUser").html('');
            ItemDetail.GetItemRatingPerUser(1, $("#ddlPageSize").val(), 0);
        },
        BindItemAverageRating: function() {
            var param = JSON2.stringify({ itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetItemAverageRating";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.BindItemAverageRatingReview;
            //this.config.error = 4;
            this.ajaxCall(this.config);
        },

        CheckReviewByUser: function(userName) {
            var param = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/CheckReviewByUser";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.SetReviewByUserStatus;
            this.config.async = false;
            this.ajaxCall(this.config);
        },

        CheckReviewByIP: function(userIP) {
            var param = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj(), userIP: userIP });
            this.config.method = "AspxCommerceWebService.asmx/CheckReviewByIP";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.SetReviewByIPStatus;
            this.config.async = false;
            this.ajaxCall(this.config);
        },

        BindStarRating: function(itemAvgRating) {
            var ratingStars = '';
            var ratingTitle = [getLocale(DetailsBrowse, "Worst"), getLocale(DetailsBrowse, "Ugly"), getLocale(DetailsBrowse, "Bad"), getLocale(DetailsBrowse, "Not Bad"), getLocale(DetailsBrowse, "Average"), getLocale(DetailsBrowse, "OK"), getLocale(DetailsBrowse, "Nice"), getLocale(DetailsBrowse, "Good"), getLocale(DetailsBrowse, "Best"), getLocale(DetailsBrowse, "Excellent")]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            ratingStars += '<tr><td>';
            for (i = 0; i < 10; i++) {
                if (itemAvgRating == ratingText[i]) {
                    ratingStars += '<input name="avgItemRating" type="radio" class="star {split:2}" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                    $(".cssClassRatingTitle").html(ratingTitle[i]);
                } else {
                    ratingStars += '<input name="avgItemRating" type="radio" class="star {split:2}" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            ratingStars += '</td></tr>';
            $("#tblAverageRating").append(ratingStars);
        },

        BindViewDetailsRatingInfo: function(itemRatingCriteriaId, itemRatingCriteria, ratingCriteriaAverage) {
            var ratingStarsDetailsInfo = '';
            var ratingTitle = [getLocale(DetailsBrowse, "Worst"), getLocale(DetailsBrowse, "Ugly"), getLocale(DetailsBrowse, "Bad"), getLocale(DetailsBrowse, "Not Bad"), getLocale(DetailsBrowse, "Average"), getLocale(DetailsBrowse, "OK"), getLocale(DetailsBrowse, "Nice"), getLocale(DetailsBrowse, "Good"), getLocale(DetailsBrowse, "Best"), getLocale(DetailsBrowse, "Excellent")]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            ratingStarsDetailsInfo += '<div class="cssClassToolTipDetailInfo">';
            ratingStarsDetailsInfo += '<span class="cssClassCriteriaTitle">' + itemRatingCriteria + ': </span>';
            for (i = 0; i < 10; i++) {
                if (ratingCriteriaAverage == ratingText[i]) {
                    ratingStarsDetailsInfo += '<input name="avgItemDetailRating' + itemRatingCriteriaId + '" type="radio" class="star {split:2}" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                } else {
                    ratingStarsDetailsInfo += '<input name="avgItemDetailRating' + itemRatingCriteriaId + '" type="radio" class="star {split:2}" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            ratingStarsDetailsInfo += '</div>';
            $(".cssClassToolTipInfo").append(ratingStarsDetailsInfo);
        },

        GetItemRatingPerUser: function(offset, limit, currenpage) {
            ItemsReview = [];
            currentpage = currenpage;
            var param = JSON2.stringify({ offset: currentpage, limit: limit, itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() });
            ItemDetail.config.method = "AspxCommerceWebService.asmx/GetItemRatingPerUser";
            ItemDetail.config.url = ItemDetail.config.baseURL + ItemDetail.config.method;
            ItemDetail.config.data = param;
            ItemDetail.config.ajaxCallMode = ItemDetail.BindItemRatingPerUser;
            ItemDetail.ajaxCall(ItemDetail.config);
        },

        BindItemsRatingByUser: function(item, index) {
            arrItemDetailsReviewList.push(item);
            if (!IsExists(ItemsReview, item.ItemReviewID)) {
                ItemsReview.push(item.ItemReviewID);
                arrItemReviewList.push(item);
            }
        },

        BindAverageUserRating: function(item) {
            var userRatings = '';
            userRatings += '<tr><td><div class="cssClassRateReview"><div class="cssClassItemRating">';
            userRatings += '<div class="cssClassItemRatingBox">' + ItemDetail.BindStarRatingAveragePerUser(item.ItemReviewID, item.RatingAverage) + '</div>';


            userRatings += '<div class="cssClassRatingInfo"><p><span>' + getLocale(DetailsBrowse, 'Reviewed by') + ' <strong>' + item.Username + '</strong></span></p><p class="cssClassRatingReviewDate">(' + getLocale(DetailsBrowse, 'Posted on') + '&nbsp;<strong>' + formatDate(new Date(item.AddedOn), "yyyy/M/d hh:mm:ssa") + '</strong>)</p></div></div>';

            userRatings += '<div class="cssClassRatingdesc"><p>' + Encoder.htmlDecode(item.ReviewSummary) + '</p><p class="cssClassRatingReviewDesc">' + Encoder.htmlDecode(item.Review) + '</p></div>';

            userRatings += '</div></td></tr>';
            $("#tblRatingPerUser").append(userRatings);
            var ratingToolTip = $("#hdnRatingTitle" + item.ItemReviewID + "").val();
            $(".cssClassUserRatingTitle_" + item.ItemReviewID + "").html(ratingToolTip);
        },

        BindStarRatingAveragePerUser: function(itemReviewID, itemAvgRating) {
            var ratingStars = '';
            var ratingTitle = [getLocale(DetailsBrowse, "Worst"), getLocale(DetailsBrowse, "Ugly"), getLocale(DetailsBrowse, "Bad"), getLocale(DetailsBrowse, "Not Bad"), getLocale(DetailsBrowse, "Average"), getLocale(DetailsBrowse, "OK"), getLocale(DetailsBrowse, "Nice"), getLocale(DetailsBrowse, "Good"), getLocale(DetailsBrowse, "Best"), getLocale(DetailsBrowse, "Excellent")]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            var ratingTitleText = '';
            ratingStars += '<div class="cssClassRatingStar"><div class="cssClassToolTip">';
            ratingStars += '<span class="cssClassRatingTitle2 cssClassUserRatingTitle_' + itemReviewID + '"></span>';
            for (i = 0; i < 10; i++) {
                if (itemAvgRating == ratingText[i]) {
                    ratingStars += '<input name="avgRatePerUser' + itemReviewID + '" type="radio" class="star-rate {split:2}" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                    ratingTitleText = ratingTitle[i];
                } else {
                    ratingStars += '<input name="avgRatePerUser' + itemReviewID + '" type="radio" class="star-rate {split:2}" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            ratingStars += '<input type="hidden" value="' + ratingTitleText + '" id="hdnRatingTitle' + itemReviewID + '"></input><span class="cssClassToolTipInfo cssClassReviewId_' + itemReviewID + '"></span></div></div><div class="cssClassClear"></div>';
            return ratingStars;
        },

        BindPerUserIndividualRatings: function(itemReviewID, itemRatingCriteria, ratingValue) {
            var userRatingStarsDetailsInfo = '';
            var ratingTitle = [getLocale(DetailsBrowse, "Worst"), getLocale(DetailsBrowse, "Ugly"), getLocale(DetailsBrowse, "Bad"), getLocale(DetailsBrowse, "Not Bad"), getLocale(DetailsBrowse, "Average"), getLocale(DetailsBrowse, "OK"), getLocale(DetailsBrowse, "Nice"), getLocale(DetailsBrowse, "Good"), getLocale(DetailsBrowse, "Best"), getLocale(DetailsBrowse, "Excellent")]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            userRatingStarsDetailsInfo += '<div class="cssClassToolTipDetailInfo">';
            userRatingStarsDetailsInfo += '<span class="cssClassCriteriaTitle">' + itemRatingCriteria + ': </span>';
            for (i = 0; i < 10; i++) {
                if (ratingValue == ratingText[i]) {
                    userRatingStarsDetailsInfo += '<input name="avgUserDetailRate' + itemRatingCriteria + '_' + itemReviewID + '" type="radio" class="star-rate {split:2}" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                } else {
                    userRatingStarsDetailsInfo += '<input name="avgUserDetailRate' + itemRatingCriteria + '_' + itemReviewID + '" type="radio" class="star-rate {split:2}" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            userRatingStarsDetailsInfo += '</div>';
            $('#tblRatingPerUser span.cssClassReviewId_' + itemReviewID + '').append(userRatingStarsDetailsInfo);
        },

        BindPopUp: function() {
            ItemDetail.ClearReviewForm();
            $("#lblYourReviewing").html(getLocale(DetailsBrowse, "You're Reviewing:") + itemName + '');
            if (userName.toLowerCase() != "anonymouseuser") {
                $("#txtUserName").val(userName);
            }
            $.metadata.setType("attr", "validate");
            $('.auto-submit-star').rating({
                required: false,
                focus: function(value, link) {
                    var ratingCriteria_id = $(this).attr("name").replace(/[^0-9]/gi, '');
                    var tip = $('#hover-test' + ratingCriteria_id);
                    tip[0].data = tip[0].data || tip.html();
                    tip.html(link.title || 'value: ' + value);
                    $("#tblRatingCriteria label.error").hide();
                },
                blur: function(value, link) {
                    var ratingCriteria_id = $(this).attr("name").replace(/[^0-9]/gi, '');
                    var tip = $('#hover-test' + ratingCriteria_id);
                    tip.html('<span class="cssClassToolTip">' + tip[0].data || '' + '</span>');
                    $("#tblRatingCriteria label.error").hide();
                },

                callback: function(value, event) {
                    var ratingCriteria_id = $(this).attr("name").replace(/[^0-9]/gi, '');
                    var starRatingValues = $(this).attr("value");
                    var len = ratingCriteria_id.length;
                    var isAppend = true;
                    if (ratingValues != '') {
                        var stringSplit = ratingValues.split('#');
                        $.each(stringSplit, function(index, item) {
                            if (item.substring(0, item.indexOf('-')) == ratingCriteria_id) {
                                var index = ratingValues.indexOf(ratingCriteria_id + "-");
                                var toReplace = ratingValues.substr(index, 2 + len);
                                ratingValues = ratingValues.replace(toReplace, ratingCriteria_id + "-" + value);
                                isAppend = false;
                            }
                        });
                        if (isAppend) {
                            ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                        }
                    } else {
                        ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                    }
                }
            });
        },

        BindRatingCriteria: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), isFlag: false });
            this.config.method = "AspxCommerceWebService.asmx/GetItemRatingCriteria";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.BindItemRatingCriteria;
            //this.config.error = 6;
            this.ajaxCall(this.config);
        },

        RatingCriteria: function(item) {
            //  $("#tblRatingCriteria").html('');
            var ratingCriteria = '';
            ratingCriteria += '<tr><td class="cssClassReviewCriteria"><label class="cssClassLabel">' + item.ItemRatingCriteria + ':<span class="cssClassRequired">*</span></label></td><td>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star" value="1" title=' + getLocale(DetailsBrowse, "Worst") + ' validate="required:true" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star" value="2" title="' + getLocale(DetailsBrowse, "Bad") + '"/>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star" value="3" title="' + getLocale(DetailsBrowse, "OK") + '"/>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star" value="4" title="' + getLocale(DetailsBrowse, "Good") + '"/>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star" value="5" title="' + getLocale(DetailsBrowse, "Best") + '"/>';
            ratingCriteria += '<span id="hover-test' + item.ItemRatingCriteriaID + '" class="cssClassRatingText"></span>';
            ratingCriteria += '<label for="star' + item.ItemRatingCriteriaID + '" class="error">' + getLocale(DetailsBrowse, 'Please rate for') + '&nbsp;' + item.ItemRatingCriteria + '</label></td></tr>';
            $("#tblRatingCriteria").append(ratingCriteria);
        },

        ClearReviewForm: function() {
            //Clear all Stars checked      
            $('.auto-submit-star').rating('drain');
            $('.auto-submit-star').removeAttr('checked');
            $('.auto-submit-star').rating('select', -1);

            $("#txtUserName").val('');
            $("#txtSummaryReview").val('');
            $("#txtReview").val('');
            $("label.error").hide();
        },

        SaveItemRatings: function() {
            var statusId = 2;
            var ratingValue = ratingValues;
            var nickName = $("#txtUserName").val();
            var summaryReview = $("#txtSummaryReview").val();
            var review = $("#txtReview").val();
            var ratingSaveObj = {
                ViewFromIP: userIP,
                viewFromCountry: countryName,
                UserName: nickName,
                ReviewSummary: summaryReview,
                Review: review,
                ItemRatingCriteria: ratingValue,
                ItemID: itemId,
                StatusID: statusId
            };
            var param = JSON2.stringify({ ratingSaveObj: ratingSaveObj, aspxCommonObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/SaveItemRating";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.SaveItemRatingMsg;
            this.config.error = ItemDetail.GetItemRatingErrorMsg;
            this.ajaxCall(this.config);
        },

        ShowUsingPage: function() {
            $.metadata.setType("attr", "validate");
            var ControlName = "Modules/AspxCommerce/AspxReferToFriend/ReferAFriend.ascx";
            //var ControlName = rootPath + "Modules/AspxCommerce/AspxReferToFriend/ReferAFriend.ascx";
            this.config.method = "LoadControlHandler.aspx/Result";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = "{ controlName:'" + AspxCommerce.utils.GetAspxRootPath() + ControlName + "'}";
            this.config.ajaxCallMode = ItemDetail.BindReferFriendPopup;
            //this.config.error = 8;
            this.ajaxCall(this.config);

        },

        BindItemBasicByitemSKU: function(itemSKU) {
            var checkparam = { itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() };
            var checkdata = JSON2.stringify(checkparam);
            this.config.method = "AspxCommerceWebService.asmx/GetItemBasicInfoByitemSKU";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = checkdata;
            this.config.async = false;
            this.config.ajaxCallMode = ItemDetail.BindItemBasicInfoByitemSKU;
            //this.config.error = 9;
            this.config.async = false;
            this.ajaxCall(this.config);

        },

        GetFormFieldList: function(itemSKU) {
            ItemDetail.vars.itemSKU = itemSKU;
            this.config.method = "AspxCommerceWebService.asmx/GetItemFormAttributesByitemSKUOnly";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = ItemDetail.BindItemFormAttributes;
            //this.config.error = 10;
            this.ajaxCall(this.config);

        },

        CreateForm: function(itemFormFields, attributeSetId, itemTypeId, itemSKU) {
            var strDyn = '';
            var attGroup = new Array();
            $.each(itemFormFields, function(index, item) {
                var isGroupExist = false;
                for (var i = 0; i < attGroup.length; i++) {
                    if (attGroup[i].key == item.GroupID) {
                        isGroupExist = true;
                        break;
                    }
                }
                if (!isGroupExist) {
                    // attGroup.push({ key: item.GroupID, value: item.GroupName, html: '' });
                    if ((item.ItemTypeID == 2 || item.ItemTypeID == 3) && item.GroupID == 11) {
                    }
                    else {
                        attGroup.push({ key: item.GroupID, value: item.GroupName, html: '' });
                    }
                }
            });
            $.each(itemFormFields, function(index, item) {
                if ((item.ItemTypeID == 2 || item.ItemTypeID == 3) && item.AttributeID == 32 && item.AttributeID == 33 && item.AttributeID == 34) {
                } else {
                    strDynRow = ItemDetail.createRow(itemSKU, item.AttributeID, item.AttributeName, item.InputTypeID, item.InputTypeValues != "" ? eval(item.InputTypeValues) : '', item.DefaultValue, item.ToolTip, item.Length, item.ValidationTypeID, item.IsEnableEditor, item.IsUnique, item.IsRequired, item.GroupID, item.IsIncludeInPriceRule, item.DisplayOrder);
                }
                //strDynRow = '<table width="100%" border="0" cellpadding="0" cellspacing="0">' + strDynRow + '</table>';
                for (var i = 0; i < attGroup.length; i++) {
                    if (attGroup[i].key == item.GroupID) {
                        attGroup[i].html += strDynRow;
                    }
                }
            });
            ItemDetail.CreateTabPanel(attGroup, attributeSetId, itemTypeId);
        },

        createRow: function(itemSKU, attID, attName, attType, attTypeValue, attDefVal, attToolTip, attLen, attValType, isEditor, isUnique, isRequired, groupId, isIncludeInPriceRule, displayOrder) {
            var retString = '';
            retString += '<tr><td class="cssClassTableLeftCol"><label class="cssClassLabel">' + attName + ': </label></td>';
            retString += '<td><div id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" title="' + attToolTip + '">';
            retString += '</div></td>';
            retString += '</tr>';
            return retString;
        },

        CreateTabPanel: function(attGroup, attributeSetId, itemTypeId) {
            if (FormCount) {
                FormCount = new Array();
            }
            var FormID = "form_" + (FormCount.length * 10 + Math.floor(Math.random() * 10));
            FormCount[FormCount.length] = FormID;
            var dynHTML = '';
            var itemTabs = '';
            var tabBody = '';
            dynHTML += '<div class="cssClassTabPanelTable">';
            dynHTML += '<div id="ItemDetails_TabContainer" class="cssClassTabpanelContent cssClassTabTopBorder">';
            dynHTML += '<ul>';
            for (var i = 0; i < attGroup.length; i++) {
                itemTabs += '<li><a href="#ItemTab-' + attGroup[i].key + '"><span>' + attGroup[i].value + '</span></a>';
                tabBody += '<div id="ItemTab-' + attGroup[i].key + '"><div class="scroll-pane"><table border="0" cellpadding="0" cellspacing="0">' + attGroup[i].html + '</table></div></div></li>';
            }
            //Add Static sections here Product Reviews, Product Tags, Customers Tagged Product
            //Tags part Starts HERE
            itemTabs += '<li><a href="#ItemTab-Tags"><span>' + getLocale(DetailsBrowse, 'Tags') + '</span></a>';
            var itemTagsBody = '';
            itemTagsBody += '<div class="cssClassPopularItemTags"><strong>' + getLocale(DetailsBrowse, 'Popular Tags:') + '</strong><div id="divItemTags" class="cssClassPopular-Itemstags"></div>';
            //TOSHow only if user is logged in
            if (customerId > 0 && userName.toLowerCase() != "anonymoususer") {
                itemTagsBody += '<strong>' + getLocale(DetailsBrowse, 'My Tags:') + '</strong><div id="divMyTags" class="cssClassMyTags"></div>';
                itemTagsBody += '<table id="AddTagTable"><tr><td>';
                itemTagsBody += '<input type="text" class="classTag" maxlength="20"/>';
                itemTagsBody += '<button class="cssClassDecrease" type="button"><span>-</span></button>';
                itemTagsBody += '<button class="cssClassIncrease" type="button"><span>+</span></button>';
                itemTagsBody += '</td></tr></table>';
                itemTagsBody += '<div class="sfButtonwrapper"><button type="button" id="btnTagSubmit"><span><span>' + getLocale(DetailsBrowse, 'Add Tag') + '</span></span></button></div></div>';
                //Else Show Please log in link
            } else {
                itemTagsBody += '<a href="' + aspxRedirectPath + LogInURL + pageExtension + '?ReturnUrl=' + aspxRedirectPath + 'item/' + itemSKU + pageExtension + '" class="cssClassLogIn"><span>' + getLocale(DetailsBrowse, 'Sign in to enter tags') + '</span></a>';
            }
            tabBody += '<div  id="ItemTab-Tags"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td>' + itemTagsBody + '</tr></td></table></div></li>';
            //Tags part Ends HERE

            //Review and Rating Starts Here
            itemTabs += '<li><a href="#ItemTab-Reviews"><span>' + getLocale(DetailsBrowse, 'Ratings & Reviews') + ' </span></a>';
            tabBody += '<div id="ItemTab-Reviews"><table cellspacing="0" cellpadding="0" width="100%" border="0" id="tblRatingPerUser"></table>';
            //Paging Parts here
            tabBody += '<div class="cssClassPageNumber" id="divSearchPageNumber"><div class="cssClassPageNumberMidBg">';
            tabBody += '<div id="Pagination"></div><div class="cssClassViewPerPage">' + getLocale(DetailsBrowse, 'View Per Page:') + '<select id="ddlPageSize" class="sfListmenu">';
            tabBody += '<option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="40">40</option></select></div>';
            tabBody += '</div></div></div></li>';
            //Review and Rating Ends Here

            //Item videos here
            itemTabs += '<li style=\"display:none\"><a href="#ItemVideos"><span>' + getLocale(DetailsBrowse, 'Videos') + ' </span></a>';
            tabBody += '<div id="ItemVideos" style=\"display:none\" ></div></li>';
            //Item videos end here
            dynHTML += itemTabs;
            dynHTML += '</ul>';
            dynHTML += tabBody;
            var frmIDQuoted = "'" + FormID + "'";
            var buttons = '<div class="cssClassClear"></div>';
            $("#dynItemDetailsForm").html('<div id="' + FormID + '" class="sfFormwrapper">' + dynHTML + buttons + '</div>');
            $("#dynItemDetailsForm").find(".cssClassIncrease").click(function() {
                var cloneRow = $(this).closest('tr').clone(true);
                $(cloneRow).appendTo("#AddTagTable");
                $(cloneRow).find("input[type='text']").val('');
                $(this).remove();
            });

            $("#dynItemDetailsForm").find(".cssClassDecrease").click(function() {
                var cloneRow = $(this).closest('tr');
                if (cloneRow.is(":last-child")) {
                    var prevTR = $(cloneRow).prev('tr');
                    var prevTagTitle = prevTR.find("input[type='text']").val();
                    prevTR.remove();
                    $(cloneRow).find("input[type='text']").val(prevTagTitle)
                    return false;
                } else {
                    $(cloneRow).remove();
                }
            });

            $("#dynItemDetailsForm").find("#btnTagSubmit").bind("click", function() {
                ItemDetail.SubmitTag();
            });

            $("#dynItemDetailsForm").find("#ddlPageSize").bind("change", function() {
                // Create pagination element with options from form
                var items_per_page = $(this).val();
                var offset = 1;
                ItemDetail.GetItemRatingPerUser(offset, items_per_page, 0);
                //var optInit = ItemDetail.getOptionsFromForm();
                //$("#Pagination").pagination(arrItemReviewList.length, optInit);
            });

            var $tabs = $('#ItemDetails_TabContainer').tabs({ fx: [null, { height: 'show', opacity: 'show'}] }); // first tab selected
            $tabs.tabs('select', 0);
        },

        BindDataInTab: function(itemSKU, attributeSetId, itemTypeId) {
            this.config.method = "AspxCommerceWebService.asmx/GetItemDetailsByitemSKU";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemSKU: itemSKU, attributeSetID: attributeSetId, itemTypeID: itemTypeId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = ItemDetail.BindItemDetailsInTab;
            //this.config.error = 11;
            this.ajaxCall(this.config);

        },

        GetItemTags: function() {
            ItemTags = '';
            TagNames = '';
            MyTags = '';
            UserTags = '';
            this.config.method = "AspxCommerceWebService.asmx/GetItemTags";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemSKU: itemSKU, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = ItemDetail.BindTags;
            this.config.error = ItemDetail.GetTagsErrorMsg;
            this.ajaxCall(this.config);

        },

        BindItemTags: function(item, index) {
            if (TagNames.indexOf(item.Tag) == -1) {
                ItemTags += item.Tag + "(" + item.TagCount + "), ";
                TagNames += item.Tag;
            }

            if (item.AddedBy == userName) {
                if (UserTags.indexOf(item.Tag) == -1) {
                    MyTags += item.Tag + "<button type=\"button\" class=\"cssClassCross\" value=" + item.ItemTagID + " onclick ='ItemDetail.DeleteMyTag(this)'><span>" + getLocale(DetailsBrowse, 'x') + "</span></button>, ";
                    UserTags += item.Tag;
                }
            }
        },

        DeleteMyTag: function(obj) {
            var itemTagId = $(obj).attr("value");
            this.config.method = "AspxCommerceWebService.asmx/DeleteUserOwnTag";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemTagID: itemTagId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = ItemDetail.BindTagAfterDelete;
            //this.config.error = 13;
            this.ajaxCall(this.config);
        },

        SubmitTag: function() {
            var isValid = false;
            var TagValue = '';
            $(".classTag").each(function() {
                if ($(this).val() == '') {
                    //  alert('please add tags');
                    $(this).parents('td').find('span[class="err"]').html('');
                    $('<span class="err" style="color:red;">*<span>').insertAfter(this);
                    isValid = false;
                    return false;
                } else {
                    isValid = true;
                    TagValue += $(this).val() + "#";
                    $(this).siblings('span').remove();
                }
            });
            if (isValid) {
                TagValue = TagValue.substring(0, TagValue.length - 1);
                this.config.method = "AspxCommerceWebService.asmx/AddTagsOfItem";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ itemSKU: itemSKU, tags: TagValue, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = ItemDetail.BindTagAfterAdd;
                this.config.error = ItemDetail.GetTagsSaveErrorMsg;
                this.ajaxCall(this.config);
            }
        },

        ClearTableContentTags: function(obj) {
            $('#AddTagTable tr:not(:last-child)').remove();
            $(".classTag").val('');
        },

        FillItemAttributes: function(itemSKU, item) {
            //var attNameNoSpace = "_" + item.AttributeName.replace(new RegExp(" ", "g"), '-');
            var id = item.AttributeID + '_' + item.InputTypeID + '_' + item.ValidationTypeID + '_' + item.IsRequired + '_' + item.GroupID
	    			+ '_' + item.IsIncludeInPriceRule + '_' + item.DisplayOrder;

            var val = '';
            switch (item.InputTypeID) {
                case 1:
                    //TextField .toFixed(2)
                    if (item.ValidationTypeID == 3) {
                        $("#" + id).html(parseFloat(item.DecimalValue).toFixed(2));
                        break;
                    } else if (item.ValidationTypeID == 5) {
                        $("#" + id).html(item.IntValue);
                        break;
                    }
                    else {
                        $("#" + id).html(unescape(item.NvarcharValue));
                        break;
                    }
                case 2:
                    //TextArea
                    $("#" + id).html(Encoder.htmlDecode(item.TextValue));
                    break;
                case 3:
                    //Date
                    $("#" + id).html(formatDate(new Date(item.DateValue), "yyyy/M/d"));
                    break;
                case 4:
                    //Boolean
                    $("#" + id).html(item.BooleanValue);
                    break;
                case 5:
                    //MultipleSelect
                    $("#" + id).html(item.OptionValues);
                    break;
                case 6:
                    //DropDown
                    $("#" + id).html(item.OptionValues);
                    break;
                case 7:
                    //Price
                    $("#" + id).html(item.DecimalValue);
                    break;
                case 8:
                    //File    
                    var div = $("#" + id);
                    var filePath = item.FileValue;
                    var fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
                    if (filePath != "") {
                        var fileExt = (-1 !== filePath.indexOf('.')) ? filePath.replace(/.*[.]/, '') : '';
                        myregexp = new RegExp("(jpg|jpeg|jpe|gif|bmp|png|ico)", "i");
                        if (myregexp.test(fileExt)) {
                            $(div).append('<span class="response"><img src="' + aspxRootPath + filePath + '" class="uploadImage" /></span>');
                        } else {

                            $(div).append('<span class="response"><span id="spanFileUpload"  class="cssClassLink"  href="' + 'uploads/' + fileName + '" >' + fileName + '</span></span>');
                        }
                    }
                    break;
                case 9:
                    //Radio
                    $("#" + id).html(item.OptionValues);
                    break;
                case 10:
                    //RadioButtonList
                    $("#" + id).html(item.OptionValues);
                    break;
                case 11:
                    //CheckBox
                    $("#" + id).html(item.OptionValues);
                    break;
                case 12:
                    //CheckBoxList
                    $("#" + id).html(item.OptionValues);
                    break;
                case 13:
                    //Password
                    $("#" + id).html(item.NvarcharValue);
                    break;
            }
        },

        GetYouMayAlsoLikeItemsList: function() {
            RelatedItems = '';
            this.config.method = "AspxCommerceWebService.asmx/GetYouMayAlsoLikeItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemSKU: itemSKU, aspxCommonObj: aspxCommonObj(), count: relatedItemsCount });
            this.config.ajaxCallMode = ItemDetail.BindYouMayAlsoLikeItem;
            this.config.async = false;
            //this.config.error = 15;
            this.ajaxCall(this.config);

        },

        BindYouMayAlsoLikeItems: function(index, item) {
            $("#divYouMayAlsoLike").html('');
            if (item.BaseImage == "") {
                item.BaseImage = aspxRootPath + noItemDetailImagePath;
            }
            if (item.AlternateText == "") {
                item.AlternateText = item.Name;
            }
            if ((index + 1) % 4 == 0) {
                RelatedItems += "<div class=\"cssClassYouMayAlsoLikeBox cssClassYouMayAlsoLikeBoxFourth\">";
            } else {
                RelatedItems += "<div class=\"cssClassYouMayAlsoLikeBox\">";
            }
            RelatedItems += '<p class="cssClassProductPicture"><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '"><img  alt="' + item.AlternateText + '" title="' + item.Name + '" src="' + aspxRootPath + item.BaseImage.replace('uploads', 'uploads/Small') + '"></a></p>';
            RelatedItems += '<p class="cssClassProductRealPrice"><span>' + getLocale(DetailsBrowse, 'Price :') + '<span class="cssClassFormatCurrency">' + item.Price + '</span></span></p>';
            if (allowOutStockPurchase.toLowerCase() == 'false') {
                if (item.IsOutOfStock) {
                    RelatedItems += "<div class='sfButtonwrapper cssClassOutOfStock'><a href='#'><span>" + getLocale(DetailsBrowse, 'Out Of Stock') + "</span></a></div></div>";
                } else {
                    RelatedItems += "<div class='sfButtonwrapper'><a href='#' onclick='ItemDetail.AddToCartToJS(" + item.ItemID + "," + item.Price + "," + JSON2.stringify(item.SKU) + "," + 1 + ");'><span>" + getLocale(DetailsBrowse, "Add to Cart") + "</span></a></div></div>";

                }
            } else {
                RelatedItems += "<div class='sfButtonwrapper'><a href='#' onclick='ItemDetail.AddToCartToJS(" + item.ItemID + "," + item.Price + "," + JSON2.stringify(item.SKU) + "," + 1 + ");'><span>" + getLocale(DetailsBrowse, "Add to Cart") + "</span></a></div></div>";
            }
            // $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity) {
            AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
        },

        CheckItemQuantityInCart: function(itemId, itemCostVariantIDs) {
            this.config.method = "AspxCommerceWebService.asmx/CheckItemQuantityInCart";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj(), itemCostVariantIDs: itemCostVariantIDs });
            this.config.ajaxCallMode = ItemDetail.SetItemQuantityInCart;
            //this.config.error = 16;
            this.ajaxCall(this.config);
            return ItemDetail.vars.itemQuantityInCart;
        },

        GetImageLists: function(cids, sku, combinationId) {
            if (itemTypeId == 3) {
                ItemDetail.GetGiftCardThemes();
            } else {
                this.config.method = "AspxCommerceWebService.asmx/GetItemsImageGalleryInfoBySKU";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ itemSKU: sku, aspxCommonObj: aspxCommonObj(), combinationId: combinationId });
                this.config.ajaxCallMode = ItemDetail.BindItemsImageGallery;
                //this.config.error = 17;
                this.ajaxCall(this.config);
            }
        },

        AddStyle: function() {
            this.config.method = "AspxCommerceWebService.asmx/ReturnDimension";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ userModuleID: userModuleID, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = ItemDetail.ReturnedDimension;
            //this.config.error = 18;
            this.ajaxCall(this.config);
        },

        GetFilePath: function(msg) {
            $(".targetarea").html('');
            $(".multizoom1").html('');
            if (msg.d.length > 0) {
                var bindImage = '';
                var bindImageThumb = '';
                $.each(msg.d, function(index, item) {
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        imagePath = noItemDetailImagePath;
                    }
                    if (index == 0) {
                        $('.popupEmailAFriend').attr('imagepath', itemImagePath + item.ImagePath);
                        bindImage = "<img  id='multizoom1' title='" + item.AlternateText + "' src='" + aspxRootPath + imagePath.replace('uploads', 'uploads/Large') + "'>";
                        bindImageThumb += '<li><a  href="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Large') + '" data-large="' + aspxRootPath + imagePath + '"><img title="' + item.AlternateText + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" ></a></li>';
                    } else {
                        bindImageThumb += '<li><a  href="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Large') + '" data-large="' + aspxRootPath + imagePath + '" ><img title="' + item.AlternateText + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" ></a></li>';
                    }
                });
                $(".targetarea").append(bindImage);
                $(".multizoom1").append("<ul>" + bindImageThumb + "</ul>");

                $('.multizoom1').jcarousel({
                    vertical: true,
                    scroll: 1,
                    itemFallbackDimension: 300
                });
                $('#multizoom1').addimagezoom({
                    zoomrange: [3, 10],
                    magnifiersize: [600, 300],
                    disablewheel: true
                });
            } else {
                var bindImage = '';
                var bindImageThumb = '';
                bindImage = "<img  id='multizoom1' src='" + aspxRootPath + noItemDetailImagePath.replace('uploads', 'uploads/Large') + "'>";
                bindImageThumb += '<li><a  href="' + aspxRootPath + noItemDetailImagePath.replace('uploads', 'uploads/Large') + '" data-large="' + aspxRootPath + noItemDetailImagePath + '"><img  src="' + aspxRootPath + noItemDetailImagePath.replace('uploads', 'uploads/Small') + '" ></a></li>';
                $(".targetarea").append(bindImage);
                $(".multizoom1").append("<ul>" + bindImageThumb + "</ul>");
                $('.multizoom1').jcarousel({
                    vertical: true,
                    scroll: 1,
                    itemFallbackDimension: 300
                });
                $('#multizoom1').addimagezoom({
                    zoomrange: [3, 10],
                    magnifiersize: [600, 300],
                    disablewheel: true
                });
            }
        },

        ImageZoom: function() {
            //$('.pika-image,.jcarousel-skin-pika').html('');
            $(".zoom").find("img").addimagezoom({
                zoomrange: [3, 3],
                magnifiersize: [588, 580],
                cursorshadecolor: 'pink',
                magnifierpos: 'right',
                cursorshade: true,
                largeimage: $(".zoom").find("img").attr('src').replace('uploads/Large', 'uploads')
                //<-- No comma after last option!
            });
        },

        Gallery: function() {
            //$('.pika-image,.jcarousel-skin-pika').html('');
            $("#pikame").PikaChoose({ autoPlay: false, showCaption: false });
            $("#pikame").jcarousel({
                scroll: 3,
                transition: [6],
                initCallback: function(carousel) {
                    $(carousel.list).find('img').click(function() {
                        //console.log($(this).parents('.jcarousel-item').attr('jcarouselindex'));
                        carousel.scroll(parseInt($(this).parents('.jcarousel-item').attr('jcarouselindex')));
                    });
                },
                itemLoadCallback: {
                    onBeforeAnimation: function() {
                    },
                    onAfterAnimation: function() {
                        $(".zoom").find("img").addimagezoom({
                            zoomrange: [3, 3],
                            magnifiersize: [588, 580],
                            cursorshadecolor: 'pink',
                            magnifierpos: 'right',
                            cursorshade: true,
                            largeimage: $(".zoom").find("img").attr('src').replace('uploads/Large', 'uploads')
                            //<-- No comma after last option!
                        });
                    }
                }
            });
        },

        SetValueForStyle: function(msg) {
            $('div.pika-image').css("width", msg.d[0] + 2);
            $('div.pika-image').css("height", msg.d[1] + 2);
            $('#image1').css('width', msg.d[2]);
            $('#image1').css('height', msg.d[2]);
            newObject = new Variable(msg.d[1], msg.d[0], msg.d[2], msg.d[3]);
        },

        BindItemsBasicInfo: function(item) {
            //        if (item.BaseImage == "") {
            //            item.BaseImage = aspxRootPath+ "Modules/AspxCommerce/AspxItemsManagement/uploads/noitem.png";
            //        }
            //        if (item.AlternateText == "") {
            //            item.AlternateText = item.Name;
            //        }
            //        $(".cssClassProductBigPicture").html("<img src=" + aspxRootPath+item.BaseImage + " width=\"323px\" height=\"238px\" alt=" + item.AlternateText + " title=" + item.AlternateText + "/>");
            info.IsCombinationMatched = true;
            info.IsPricePercentage = false;
            info.IsWeightPercentage = false;
            info.PriceModifier = 0;
            info.WeightModifier = 0;
            info.Quantity = item.Quantity;
            if (item.ItemViewCount == null) {
                item.ItemViewCount = 0;
            }
            $("#viewCount").text(item.ItemViewCount);
            var itemCategories = item.ItemCategories.split("#");
            if (itemCategories.length > 0) {
                $(".cssItemCategories").show();
                var catHtml = "";
                catHtml += "<ul>";
                $.each(itemCategories, function(index, value) {
                    var hrefCategory = aspxRedirectPath + "category/" + fixedEncodeURIComponent(value) + pageExtension;
                    if (index == itemCategories.length - 1) {
                        catHtml += "<li><a href='" + hrefCategory + "'>" + value + "</a></li>";
                    } else {
                        catHtml += "<li><a href='" + hrefCategory + "'>" + value + "</a>,&nbsp;</li>";
                    }
                });
                catHtml += "</ul>";
                $('.cssClassCategoriesName').html('').append(catHtml);

            } else {
                $(".cssItemCategories").hide();
            }
            ItemDetail.config.async = true;
            if (itemTypeId == 3) {
                ItemDetail.BindGiftCardInfo(item);

            } else {
                if (item.ListPrice != "") {
                    $("#" + lblListPrice).show();
                    $("#spanListPrice").html((item.ListPrice * rate).toFixed(2));
                    $("#hdnListPrice").val(item.ListPrice);
                }
                snippet.Name = itemName;
                snippet.Price = (item.Price * rate).toFixed(2);
                snippet.IsOutOfStock = item.IsOutOfStock;
                snippet.Brand = item.BrandName;
                snippet.Description = item.Description;
                ItemDetail.CreateSnippet();
                $("#spanItemName").html(itemName);
                $("#spanSKU").html(item.SKU);
                $("#spanPrice").html((item.Price * rate).toFixed(2));
                $("#hdnPrice").val(item.Price);
                $("#hdnWeight").val(item.Weight);
                //$("#spanWeight").val(item.Weight);
                $("#hdnQuantity").val(item.Quantity);
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    if (item.IsOutOfStock) {
                        $("#txtQty").removeAttr('enabled').attr("disabled", "disabled");
                        $("#btnAddToMyCart span span").html(getLocale(DetailsBrowse, 'Out Of Stock'));
                        $("#btnAddToMyCart").attr("disabled", "disabled");
                        $("#btnAddToMyCart").removeClass('cssClassAddToCard');
                        $("#btnAddToMyCart").addClass('cssClassOutOfStock');
                        $("#btnAddToMyCart").show();
                        $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'Out Of Stock') + '</b>');
                        $("#spanAvailability").addClass('cssOutOfStock');
                        $("#spanAvailability").removeClass('cssInStock');
                        if (userName != "anonymoususer") {
                            $("#Notify").show();
                            $("#Notify #txtNotifiy").hide();
                        }
                        else {
                            $("#Notify").show();
                            $("#txtNotifiy").show();
                        }
                    } else {
                        $("#txtQty").removeAttr('disabled').attr("enabled", "enabled");
                        $("#btnAddToMyCart span span").html(getLocale(DetailsBrowse, 'Add to Cart'));
                        $("#btnAddToMyCart").removeAttr("disabled");
                        $("#btnAddToMyCart").removeClass('cssClassOutOfStock');
                        $("#btnAddToMyCart").addClass('cssClassAddToCard');
                        $("#btnAddToMyCart").show();
                        $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'In stock') + '</b>');
                        $("#spanAvailability").removeClass('cssOutOfStock');
                        $("#spanAvailability").addClass('cssInStock');
                        $("#Notify").hide();
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
                $("#addCompareListThis").html("").append("<input type='button' id='compare-" + item.ItemID + "' class='sfBtn' value=" + getLocale(DetailsBrowse, "Compare") + " onclick='ItemDetail.AddItemsToMyCompare(" + item.ItemID + ")'/>");
                $('.cssClassProductInformation').show();
                $('.cssClassItemQuickOverview').show();
                $("#divItemShortDesc").html(Encoder.htmlDecode(shortDesc));

                //for brand
                if (item.BrandID != null && item.BrandID != "" && item.BrandID != 0) {
                    ItemDetail.BindBrandDetail(item.BrandName, item.BrandDescription, item.BrandImageUrl);
                }
                else {
                    $(".itemBrand").remove();
                }
                //end brand

                //for videos
                if (item.ItemVideoIDs != "") {
                    $("a[href=\"#ItemVideos\"]").parent().show();
                    $("#ItemVideos").show();
                    ItemDetail.BindItemVideos(item.ItemVideoIDs);
                }
                //end videos

                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                //$("#divItemFullDesc").html(Encoder.htmlDecode(item.Description));
                //$("#divItemFullDesc").hide();
                //$("#divReadLess").hide();
            }
        },
        GetGiftCardThemes: function() {
            //            function mycarousel_initCallback(carousel) {
            //                jQuery('#next').bind('click', function() {
            //                    carousel.next();
            //                    return false;
            //                });

            //                jQuery('#prev').bind('click', function() {
            //                    carousel.prev();
            //                    return false;
            //                });
            //            };
            var param = JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonObj() });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: true,
                url: aspxservicePath + 'AspxCommerceWebService.asmx/GetGiftCardThemeImagesByItem',
                data: param,
                dataType: "json",
                success: function(data) {
                    //                    if (data.d.length > 0) {
                    //                        var $ul = $("<ul>").attr('id', 'pikame').addClass("jcarousel-skin-pika");
                    //                        $.each(data.d, function(index, item) {
                    //                            var $li = $("<li>");
                    //                            // var $a = $("<a>");
                    //                            var $img = $("<img>");
                    //                            // $a.attr("href", "#").attr('data-id', item.GiftCardGraphicId);
                    //                            // $img.attr('width', '75').attr('height', '50').attr("src", aspxRootPath + item.GraphicImage).attr('alt', item.GraphicName);
                    //                            $img.attr("src", aspxRootPath + item.GraphicImage).attr('alt', item.GraphicName).attr('data-id', item.GiftCardGraphicId);
                    //                            $li.append($img);
                    //                            $ul.append($li);
                    //                        });

                    //                        var $preview = $("<div>").addClass("cssClassPreview");
                    //                        $ul.find('li').click(function() {
                    //                            //  var $cloneImg = $(this).find("img").clone();
                    //                            //  $cloneImg.attr('width', '300').attr('height', '225');
                    //                            // $(this).parents("div.cssClassProductImage").find(".cssClassPreview").html('').append($cloneImg);

                    //                        });
                    //                        // var $aleft = $('<a>').attr('href', "#").attr('id', "prev").addClass("cssClassPrev").html('prev');
                    //                        //  var $aright = $('<a>').attr('href', "#").attr('id', "next").addClass("cssClassNext").html('next');
                    //                        $(".pikachoose").html('').append($ul).append("<div><span>Note:- select your card theme</span></div>");
                    //                        ItemDetail.Gallery();
                    //                        ItemDetail.ImageZoom();
                    //                        // $(".cssClassProductImage").html('').append($preview).append($aleft).append($ul).append($aright);
                    //                        //                         var $cloneImg = $(".cssClassProductImage ul>li>a:first").find("img").clone();
                    //                        //                         $cloneImg.attr('width', '300').attr('height', '225');
                    //                        //                         $("div.cssClassProductImage").find(".cssClassPreview").html('').append($cloneImg);
                    //                        //                         $('#themesSlider').jcarousel({
                    //                        //                         scroll: 1,
                    //                        //                          initCallback: mycarousel_initCallback
                    //                        //
                    //                        //                         });
                    $(".targetarea").html('');
                    $(".multizoom1").html('');
                    if (data.d.length > 0) {
                        var bindImage = '';
                        var bindImageThumb = '';
                        $.each(data.d, function(index, item) {
                            if (index == 0) {
                                bindImage = "<img  id='multizoom1' title='" + item.GraphicName + "' src='" + aspxRootPath + item.GraphicImage + "'>";
                                bindImageThumb += '<li><a class="selected" data-id="' + item.GiftCardGraphicId + '"  href="' + aspxRootPath + item.GraphicImage + '" data-large="' + aspxRootPath + item.GraphicImage + '"><img title="' + item.GraphicName + '" src="' + aspxRootPath + item.GraphicImage + '" ></a></li>';
                            } else {
                                bindImageThumb += '<li><a data-id="' + item.GiftCardGraphicId + '"  href="' + aspxRootPath + item.GraphicImage + '" data-large="' + aspxRootPath + item.GraphicImage + '" ><img title="' + item.GraphicName + '" src="' + aspxRootPath + item.GraphicImage + '" ></a></li>';
                            }
                        });
                        $(".targetarea").append(bindImage);
                        $(".multizoom1").append("<ul>" + bindImageThumb + "</ul>");

                        $('#multizoom1').addimagezoom({
                            zoomrange: [3, 10],
                            magnifiersize: [250, 250],
                            disablewheel: true
                        });
                        $('.multizoom1').jcarousel({
                            vertical: true,
                            scroll: 1,
                            itemFallbackDimension: 300
                        });
                    }
                }
            });
        },
        BindGiftCardInfo: function(item) {
            snippet.Name = itemName;
            snippet.Price = (item.Price * rate).toFixed(2);
            snippet.IsOutOfStock = item.IsOutOfStock;
            snippet.Brand = item.BrandName;
            snippet.Description = item.Description;
            ItemDetail.CreateSnippet();
            $("#spanItemName").html(item.Name);
            $("#spanSKU").html(item.SKU);
            $("#spanPrice").html((item.Price * rate).toFixed(2));
            var price = (item.Price * rate).toFixed(2);
            $("#hdnPrice").val(item.Price);
            //  $("#hdnListPrice").val(item.ListPrice);
            $("#hdnWeight").val(item.Weight);
            //$("#spanWeight").val(item.Weight);
            // $("#hdnQuantity").val(item.Quantity);

            $(".cssClassDwnWrapper").html('');
            $("#addCompareListThis").html('');
            $(".cssClassYouSave").remove();
            $(".cssClassProductOffPrice").remove();
            $(".cssItemCategories").hide();
            $("#btnAddToMyCart span span").html('Add to Cart');
            $("#btnAddToMyCart").removeAttr("disabled");
            $("#btnAddToMyCart").removeClass('cssClassOutOfStock');
            $("#btnAddToMyCart").addClass('cssClassAddToCard');
            $(".cssClssQTY").hide();
            $("#addCompareListThis").append("<input type='button' id='compare-" + item.ItemID + "' class='sfBtn' value=" + getLocale(DetailsBrowse, 'Compare') + " onclick='ItemDetail.AddItemsToMyCompare(" + item.ItemID + ")'/>");
            $("#btnAddToMyCart").show();
            $("#spanAvailability").html('<b>' + getLocale(DetailsBrowse, 'In stock') + '</b>');
            $("#spanAvailability").removeClass('cssOutOfStock');
            $("#spanAvailability").addClass('cssInStock');

            var $li = '<div id="divCostVariant" class="sfFormwrapper"></div><table >'; //<tr><td><span >Price:</span></td><td><span id="spanPrice" class="cssClassFormatCurrency">' + price + '</span></td></tr> 
            $li += '<tr ><td>  <span>' + getLocale(DetailsBrowse, "Sender Name:") + '<em>*</em></span></td>';
            $li += '<td> <input id ="txtgc_senerName" type="text" minlength="2" messages="*" class="sfTextBoxSmall" name="gcsender_name"> </td></tr>';
            $li += ' <tr ><td> <span>' + getLocale(DetailsBrowse, "Sender Email:") + '<em>*</em></span></td>';
            $li += ' <td><input type="text" value="" class="sfTextBoxSmall" name="gcsender_email" id="txtgc_senerEmail"> </td></tr> ';
            $li += '<tr><td><span >' + getLocale(DetailsBrowse, "Recipient Name:") + '<em>*</em></span></td>';
            $li += ' <td><input type="text" minlength="2" name="gcrecipient_name" id="txtgc_recieverName"> </td></tr>';
            $li += '<tr> <td><span >' + getLocale(DetailsBrowse, "Recipient Email:") + '<em>*</em></span></td> ';
            $li += '<td><input type="text" class="sfTextBoxSmall" name="gcrecipient_email" id="txtgc_recieverEmail"> </td></tr>';
            $li += '<tr> <td><span >' + getLocale(DetailsBrowse, "Message:") + '</span> </td>';
            $li += ' <td><textarea rows="3" class="sfTextBoxSmall"  cols="5" style="width: 135px; height: 50px;" id="txtgc_messege" name="gcmessage"></textarea> </td> </tr>';
            //usp_aspx_GetAllGiftCardType
            //call type dynamically
            $li += '<tr><td><span>' + getLocale(DetailsBrowse, "Send gift by:") + '</span></td><td id="GiftCardTypes"></td></tr></table> ';
            $(".cssClassDwnWrapper").html($li);
            // $(".cssClassProductImage").html('');
            //load gift card grafic theme

            $('.cssClassProductInformation').show();
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            ItemDetail.GetGiftCardTypes();


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
        AddUpdateRecentlyViewedItem: function(itemSKU) {
            var addUpdateRecentObj = {
                SKU: itemSKU,
                IP: userIP,
                CountryName: countryName
            };
            this.config.method = "AspxCommerceWebService.asmx/AddUpdateRecentlyViewedItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ addUpdateRecentObj: addUpdateRecentObj, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = "";
            //this.config.error = 19;
            this.ajaxCall(this.config);
        },
        GetPriceHistory: function(id) {
            var param = JSON2.stringify({ itemId: id, aspxCommerceObj: aspxCommonObj() });
            this.config.method = "AspxCommerceWebService.asmx/GetPriceHistoryList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.BindPriceHistory;
            this.ajaxCall(this.config);
        },
        BindPriceHistory: function(msg) {
            if (msg.d.length > 0) {
                $('.popbox').show();
                $("div.classPriceHistory").html('');
                var html = '';
                html += '<table class=classPriceHistoryList><thead><th>Date</th><th>Price</th></thead><tbody>';
                $.each(msg.d, function(index, item) {
                    html += '<tr><td><span>' + item.Date + '</span></td><td><span class="cssClassFormatCurrency">' + (item.ConvertedPrice * rate).toFixed(2) + '</span></td></tr>';
                });
                html += '</tbody></table>';
                $("div.classPriceHistory").append(html);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            } else {
                $("div.popbox").hide();
            }
        },
        BindBrandDetail: function(BrandName, BrandDescription, BrandImageUrl) {
            var html = '<h3><label>' + getLocale(DetailsBrowse, "Brand Information") + '</label></h3>';
            var shortDesc = '';
            var brandUrl = aspxRootPath + "brand/" + BrandName + pageExtension;
            if (BrandDescription.length > 250) {
                shortDesc = BrandDescription.substring(0, 250);
                shortDesc += ".....!";
            } else {
                shortDesc = Encoder.htmlDecode(BrandDescription);
            }
            html += "<p><a href='" + brandUrl + "'>";
            html += "<img id=\"imgBrand\" src='" + aspxRootPath + BrandImageUrl.replace("uploads", "uploads/small") + "'/></a>";
            html += "<span class=\"brandDescription\">" + shortDesc + "</span></p>";
            html += "<a href='" + brandUrl + "'>" + getLocale(DetailsBrowse, 'View all products under this brand') + "</a>";
            $(".itemBrand").html('').append(html);

        },
        AddItemsToMyCompare: function(itemId) {
            var itemCostVariantIDs = [];
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
            }
            if (info.IsCombinationMatched) {
                ItemsCompare.AddToCompareFromDetails(itemId, itemCostVariantIDs.join('@'));
            }
            else {
                csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Please choose available variants!') + '</p>');
            }
        },

        AddToMyCart: function() {
            if (itemTypeId == 3) {
                var giftCardDetail = {
                    Price: $("#hdnPrice").val(),
                    GiftCardTypeId: parseInt($("input[name=giftcard-type]:checked").val()),
                    GiftCardCode: '',
                    GraphicThemeId: parseInt($(".jcarousel-skin ul li a.selected").attr('data-id')),
                    SenderName: $.trim($("#txtgc_senerName").val()),
                    SenderEmail: $.trim($("#txtgc_senerEmail").val()),
                    RecipientName: $.trim($("#txtgc_recieverName").val()),
                    RecipientEmail: $.trim($("#txtgc_recieverEmail").val()),
                    Messege: $.trim($("#txtgc_messege").val())
                };
                if (parseInt($("input[name=giftcard-type]:checked").val()) == 2) {
                    //giftcard is physical ->no need reciever

                } else {
                    if ($.trim($("#txtgc_recieverName").val()) == "" ||
                        $.trim($("#txtgc_recieverEmail").val()) == "") {
                        // csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, '!') + '</p>');

                        csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Please fill valid required data!') + '</p>');
                        return false;

                    } else {
                        if (!/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test($.trim($("#txtgc_recieverEmail").val()))) {
                            csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Please fill valid email address!') + '</p>');
                            return false;
                        }

                    }
                }



                if (giftCardDetail.SenderName != "" || giftCardDetail.SenderEmail != "") {
                    if (!/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(giftCardDetail.SenderEmail)) {
                        csscody.alert("<h2>" + getLocale(DetailsBrowse, "Information Alert") + "</h2><p>" + getLocale(DetailsBrowse, "Please fill valid email address!") + "</p>");
                        return false;
                    }
                    var AddItemToCartObj = {
                        ItemID: itemId,
                        Price: $("#hdnPrice").val(),
                        Weight: 0,
                        Quantity: 1,
                        CostVariantIDs: '0@',
                        IsGiftCard: true
                    };
                    var paramz = {
                        aspxCommonObj: aspxCommonObj(),
                        AddItemToCartObj: AddItemToCartObj,
                        giftCardDetail: giftCardDetail
                    };
                    var dataz = JSON2.stringify(paramz);
                    this.config.method = "AspxCommerceWebService.asmx/AddItemstoCartFromDetail";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = dataz;
                    this.config.ajaxCallMode = ItemDetail.AddItemstoCartFromDetail;
                    this.config.oncomplete = 20;
                    this.config.error = ItemDetail.GetAddToCartErrorMsg;
                    this.ajaxCall(this.config);
                }
                else {
                    csscody.alert('<h2>' + getLocale(DetailsBrowse, "Information Alert") + "</h2><p>" + getLocale(DetailsBrowse, "Please fill valid required data!") + "</p>");
                    return false;
                }


            } else {

                if (info.IsCombinationMatched) {
                    if ($.trim($("#txtQty").val()) == "" || $.trim($("#txtQty").val()) <= 0) {
                        // alert("Invalid quantity");
                        csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Invalid quantity.') + '</p>');
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
                            } else { }
                        });


                        //itemCostVariantIDs = itemCostVariantIDs.substring(0, itemCostVariantIDs.length - 1);
                    }
                    var itemQuantityInCart = ItemDetail.CheckItemQuantityInCart(itemId, itemCostVariantIDs.join('@') + '@');
                    if (itemQuantityInCart != 0.1) { //To know whether the item is downloadable (0.1 downloadable)
                        if (allowOutStockPurchase.toLowerCase() == 'false') {
                            if (info.Quantity <= 0) {
                                csscody.alert("<h2>" + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'This product is currently Out Of Stock!') + "</p>");
                                return false;
                            } else {
                                if ((eval($.trim($("#txtQty").val())) + eval(itemQuantityInCart)) > eval(info.Quantity)) {
                                    //csscody.alert("<h2>Information Alert</h2><p>You Can't add more than " + $("#hdnQuantity").val() + " quantity!</p>");
                                    csscody.alert("<h2>" + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'This product is currently Out Of Stock!') + "</p>");
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
                    var paramz = {
                        aspxCommonObj: aspxCommonObj(),
                        AddItemToCartObj: AddItemToCartObj,
                        giftCardDetail: null
                    };
                    var data = JSON2.stringify(paramz);
                    this.config.method = "AspxCommerceWebService.asmx/AddItemstoCartFromDetail";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = data;
                    this.config.ajaxCallMode = ItemDetail.AddItemstoCartFromDetail;
                    this.config.oncomplete = 20;
                    this.config.error = ItemDetail.GetAddToCartErrorMsg;
                    this.ajaxCall(this.config);
                } else {
                    csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Please choose available variants!') + '</p>');
                }
            }

        },

        pageselectCallback: function(page_index, jq, execute) {
            // Get number of elements per pagionation page from form
            if (execute) {
                var items_per_page = $('#ddlPageSize').val();
                var max_elem = Math.min((page_index + 1) * items_per_page, arrItemReviewList.length);
                $("#tblRatingPerUser").html('');
                //alert(arrItemDetailsReviewList.length + '::' + arrItemReviewList.length);
                // Iterate through a selection of the content and build an HTML string
                ItemsReview = [];
                for (var i = 0; i < max_elem; i++) {
                    ItemDetail.BindAverageUserRating(arrItemReviewList[i]);
                    ItemsReview.push(arrItemReviewList[i].ItemReviewID);
                }
                $.each(arrItemDetailsReviewList, function(index, item) {
                    if (IsExists(ItemsReview, item.ItemReviewID)) {
                        ItemDetail.BindPerUserIndividualRatings(item.ItemReviewID, item.ItemRatingCriteria, item.RatingValue);
                    }
                });
                $('input.star-rate').rating();
                $("#tblRatingPerUser tr:even").addClass("sfOdd");
                $("#tblRatingPerUser tr:odd").addClass("sfEven");
                // Prevent click event propagation
            }
            return false;
        },

        getOptionsFromForm: function() {
            var opt = { callback: ItemDetail.pageselectCallback };
            //parseInt(
            opt.items_per_page = $('#ddlPageSize').val();
            //opt.num_display_entries = 10;
            opt.current_page = currentpage;
            opt.callfunction = true,
                 opt.function_name = { name: ItemDetail.GetItemRatingPerUser, limit: $('#ddlPageSize').val() },
                opt.prev_text = "Prev";
            opt.next_text = "Next";
            opt.prev_show_always = false;
            opt.next_show_always = false;
            return opt;
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
            ItemDetail.GetImageLists(ids, itemSKU, costcombinationId);
        },
        GetAllNotification: function(itemId, costVariantValueIDs) {
            var getNotificationObj = {
                ItemID: itemId,
                VariantID: costVariantValueIDs,
                Email: userEmail,
                ItemSKU: itemSKU
            };
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), getNotificationObj: getNotificationObj });
            this.config.method = "AspxCommerceWebService.asmx/GetAllNotification";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.GetNotificationResult;
            //this.config.error = 25;
            this.config.async = false;
            this.ajaxCall(this.config);
        },
        InsertNotification: function(itemId, costVariantValueIDs) {
            var insertNotificationObj = {
                ItemID: itemId,
                VariantID: costVariantValueIDs,
                Email: userEmail,
                ItemSKU: itemSKU
            };
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), insertNotificationObj: insertNotificationObj });
            this.config.method = "AspxCommerceWebService.asmx/InsertNotification";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = ItemDetail.GetNotificationMessage;
            this.config.error = ItemDetail.GetNotificationErrorMsg;
            this.config.async = true;
            this.ajaxCall(this.config);
        },

        variantCheckQuery: function() {
            if (variantQuery != null && variantQuery != '') {
                var variantIds = variantQuery.split('@');
                var elem = null;
                $.each(variantIds, function(index, value) {
                    if ($("#divCostVariant").find(".sfListmenu").find('select option[value=' + value + ']').parents().attr("id") != undefined) {
                        $("#divCostVariant").find(".sfListmenu").find('select option[value=' + value + ']').attr("selected", "selected");
                        var id = $("#divCostVariant").find(".sfListmenu").find('select option[value=' + value + ']').parents().attr("id");
                        id = parseInt(id.substring(id.lastIndexOf('_') + 1, id.length));
                        if (variantId.indexOf(id) != -1) {
                            variantId.splice(variantId.indexOf(id), 1);
                        }
                        elem = $("#divCostVariant").find(".sfListmenu").find('select option[value=' + value + ']');
                    }
                    if ($("#divCostVariant").find('input:radio[value=' + value + ']').attr("name") != undefined) {
                        $("#divCostVariant").find('input:radio[value=' + value + ']').attr("checked", true);
                        var name = $("#divCostVariant").find('input:radio[value=' + value + ']').attr("name");
                        name = parseInt(name.substring(name.lastIndexOf('_') + 1, name.length));
                        if (variantId.indexOf(name) != -1) {
                            variantId.splice(variantId.indexOf(name), 1);
                        }
                        checkAvailibility($("#divCostVariant").find('input:radio[value=' + value + ']'));
                        elem = $("#divCostVariant").find('input:radio[value=' + value + ']');
                    }
                });
                $.each(variantId, function(index, value) {
                    if ($("#controlCostVariant_" + value).parents().is('.sfListmenu')) {
                        $("#controlCostVariant_" + value).prepend("<option value=0 >" + getLocale(DetailsBrowse, "Not required") + "</option>");
                        $("#controlCostVariant_" + value).find("option[value=0]").attr('selected', 'selected');
                        elem = null;
                    }
                    else {
                        $('.cssClassRadio input[name="controlCostVariant_' + value + '"]').removeAttr('checked');
                        elem = null;
                    }
                });
                checkAvailibility(elem);
                if (info.IsCombinationMatched == false)
                    selectFirstcombination();
            }

        },
        Init: function() {
            $("#" + lblListPrice).hide();
            $(".cssClassMasterLeft").html('');
            $("#divCenterContent").removeClass("cssClassMasterWrapperLeftCenter");
            $("#divCenterContent").addClass("cssClassMasterWrapperCenter");
            $(".cssClassYouSave").hide();
            if (itemName != "") {
                if (allowWishListItemDetail.toLowerCase() != 'true') {
                    $('#addWishListThis').hide();
                }
                if (allowCompareItemDetail.toLowerCase() != 'true') {
                    $('#addCompareListThis').hide();
                }
                var costVariantsData = '';

                if ($.session("ItemCostVariantData")) {
                    costVariantsData = $.session("ItemCostVariantData");
                    arrCostVariants = costVariantsData.split(',');
                }
                if (userFriendlyURL) {
                    $("#lnkContinueShopping").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + 'Home' + pageExtension);
                } else {
                    $("#lnkContinueShopping").attr("href", '' + AspxCommerce.utils.GetAspxRedirectPath() + 'Home');
                }

                $("#divEmailAFriend").hide();
                if (enableEmailFriend.toLowerCase() == 'true') {
                    $("#divEmailAFriend").show();
                }
                var Input = $('input[name=notify]');
                var default_value = Input.val();

                $(Input).focus(function() {
                    if ($(this).val() == default_value) {
                        $(this).val("");
                    }
                }).blur(function() {
                    if ($(this).val().length == 0) {
                        $(this).val(default_value);
                    }
                });
                if (userName != "anonymoususer") {
                    $("li #Notify").css('display', 'none');
                }
                else {
                    $("li #Notify").css('display', 'none');
                }

                if (customerId <= 0 && userName.toLowerCase() == "anonymoususer") {
                    if (allowAnonymousReviewRate.toLowerCase() == 'true') {
                        $("a").addClass("popupAddReview");
                    } else {
                        $("a").removeClass("popupAddReview");
                        $(".cssClassAddYourReview").hide();
                    }
                }
                $("#btnAddToMyCart").hide();

                $("#bulkDiscount").html(getLocale(DetailsBrowse, '(Bulk Discount available)'));
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $("#itemQtyDiscount > tbody tr:even").addClass("sfEven");
                $("#itemQtyDiscount > tbody tr:odd").addClass("sfOdd");
                // ItemDetail.BindItemQuantityDiscountByUserName(itemSKU);
                //ItemDetail.GetImageLists(itemSKU);

                //ItemDetail.GetFormFieldList(itemSKU);
                $("#dynItemDetailsForm").find(".cssClassIncrease").click(function() {
                    var cloneRow = $(this).closest('tr').clone(true);
                    $(cloneRow).appendTo("#AddTagTable");
                    $(cloneRow).find("input[type='text']").val('');
                    $(this).remove();
                });

                $("#dynItemDetailsForm").find(".cssClassDecrease").click(function() {
                    var cloneRow = $(this).closest('tr');
                    if (cloneRow.is(":last-child")) {
                        var prevTR = $(cloneRow).prev('tr');
                        var prevTagTitle = prevTR.find("input[type='text']").val();
                        prevTR.remove();
                        $(cloneRow).find("input[type='text']").val(prevTagTitle)
                        return false;
                    } else {
                        $(cloneRow).remove();
                    }
                });

                $("#dynItemDetailsForm").find("#btnTagSubmit").bind("click", function() {
                    ItemDetail.SubmitTag();
                });

                $("#dynItemDetailsForm").find("#ddlPageSize").bind("change", function() {
                    // Create pagination element with options from form
                    var items_per_page = $(this).val();
                    var offset = 1;
                    ItemDetail.GetItemRatingPerUser(offset, items_per_page, 0);
                    //var optInit = ItemDetail.getOptionsFromForm();
                    //$("#Pagination").pagination(arrItemReviewList.length, optInit);
                });

                var $tabs = $('#ItemDetails_TabContainer').tabs({ fx: [null, { height: 'show', opacity: 'show'}] }); // first tab selected
                $tabs.tabs('select', 0);

                if (ItemDetail.vars.itemSKU.length > 0) {
                    ItemDetail.BindRatingReviewTab();
                }

                ItemDetail.BindItemBasicByitemSKU(itemSKU);
                ItemDetail.CheckReviewByUser(userName);
                ItemDetail.CheckReviewByIP(userIP);
                //ItemDetail.BindItemAverageRating();
                //$('input.star').rating();
                ItemDetail.BindDownloadEvent();
                //ItemDetail.variantCheckQuery();

                //ItemDetail.GetCostVariantsByitemSKU(itemSKU);
                var itemVariantIds = '';
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
                // ItemDetail.GetImageLists(itemVariantIds, itemSKU, 0);

                if (customerId > 0 && userName.toLowerCase() != "anonymoususer") {
                    if (allowMultipleReviewPerUser.toLowerCase() != "true" && ItemDetail.vars.existReviewByUser == true) {
                        $("a").removeClass("popupAddReview");
                        $(".cssClassAddYourReview").hide();
                    }
                }

                if (allowMultipleReviewPerIP.toLowerCase() != "true" && ItemDetail.vars.existReviewByIP == true) {
                    $("a").removeClass("popupAddReview");
                    $(".cssClassAddYourReview").hide();
                }
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
                $('.popbox').hide();
                //$("div.popbox").find("a.open").bind("click", function() {
                ItemDetail.GetPriceHistory(itemId);
                //});
                $('.popbox').popbox();
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


                        //itemCostVariantIDs = itemCostVariantIDs.substring(0, itemCostVariantIDs.length - 1);
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

                                var itemQuantityInCart = ItemDetail.CheckItemQuantityInCart(itemId, itemCostVariantIDs);
                                if (itemQuantityInCart != 0.1) { //to test if the item is downloadable or simple(0.1 downloadable)

                                    if ((eval($("#txtQty").val() + '' + num) + eval(itemQuantityInCart)) > eval(info.Quantity)) {
                                        $('#lblNotification').html(getLocale(DetailsBrowse, " The quantity is greater than the available quantity.")); return false;
                                        //$("#txtQty").val('1');
                                        //$('#lblNotification').html('');

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

                $(".cssClassTotalReviews").bind("click", function() {
                    $.metadata.setType("class");
                    //BindRatingReviewTab();
                    //select the Tab for Rating
                    var $tabs = $('#ItemDetails_TabContainer').tabs();
                    $tabs.tabs('select', "ItemTab-Reviews");
                });
                ItemDetail.BindRatingCriteria();
                $("#dynItemDetailsForm").show();
                //$(".scroll-pane").jScrollPane({ showArrows: true });
                $('#ItemDetails_TabContainer').tabs({ show: function(event, ui) {
                    $(".scroll-pane").jScrollPane({ showArrows: true });
                }
                });
                $('a.popupAddReview').bind("click", function() {
                    ItemDetail.BindPopUp();
                    ShowPopup(this);
                });

                $(".cssClassClose").click(function() {
                    $('#fade, #popuprel2').fadeOut();
                });

                $("#btnNotify").bind("click", function() {
                    var itemCostVariantIDs = [];
                    if ($('#divCostVariant').is(':empty')) {
                        //itemCostVariantIDs = '0';
                        itemCostVariantIDs.push(null);
                    } else {
                        $("#divCostVariant input[type=radio]:checked").each(function() {
                            if ($(this).val() != 0) {
                                itemCostVariantIDs.push($(this).val());
                            } else { }
                        });

                        $("#divCostVariant input[type=checkbox]:checked").each(function() {
                            if ($(this).val() != 0) {
                                itemCostVariantIDs.push($(this).val());
                            } else { }
                        });

                        $("#divCostVariant select option:selected").each(function() {
                            if ($(this).val() != 0) {
                                itemCostVariantIDs.push($(this).val());
                            } else { }
                        });
                    }

                    isNotificationExist = false;
                    if (userName == "anonymoususer") {
                        userEmail = $("#txtNotifiy").val();
                    }
                    var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (filter.test(userEmail) == true) {
                        ItemDetail.GetAllNotification(itemId, itemCostVariantIDs.join('@'));
                        if (isNotificationExist == false) {
                            ItemDetail.InsertNotification(itemId, itemCostVariantIDs.join('@'));
                        }
                        else {
                            csscody.alert("<h2>" + getLocale(DetailsBrowse, "Information Alert") + "</h2><p>" + getLocale(DetailsBrowse, "You are already interested in this product") + "</p>");
                        }
                    }
                    else {
                        csscody.alert("<h2>" + getLocale(DetailsBrowse, "Information Alert") + "</h2><p>" + getLocale(DetailsBrowse, "Invalid Email!") + "</p>");
                        return false;

                    }
                });

                $("#btnSubmitReview").click(function() {
                    $("#form1").validate({
                        messages: {
                            urname: {
                                required: '*',
                                minlength: "* " + getLocale(DetailsBrowse, "(at least 2 chars)") + ""
                            },
                            uremail: {
                                required: '*'
                            },
                            fname: {
                                required: '*',
                                minlength: "* " + getLocale(DetailsBrowse, "(at least 2 chars)") + ""
                            },
                            femail: {
                                required: '*'
                            },
                            subject: {
                                required: '*',
                                minlength: "* " + getLocale(DetailsBrowse, "(at least 2 chars)") + ""
                            },
                            message: {
                                required: '*',
                                minlength: "* " + getLocale(DetailsBrowse, "(at least 100 chars)") + ""
                            },
                            name: {
                                required: '*',
                                minlength: "* " + getLocale(DetailsBrowse, "(at least 2 chars)") + ""
                            },
                            summary: {
                                required: '*',
                                minlength: "* " + getLocale(DetailsBrowse, "(at least 2 chars)") + "",
                                maxlength: "" + getLocale(DetailsBrowse, "(at most 300 chars)") + ""
                            },
                            review: {
                                required: '*',
                                minlength: "*"
                            }
                        },
                        //success: "valid",
                        submitHandler: function() { ItemDetail.SaveItemRatings(); }
                    });
                });

                $('a.popupEmailAFriend').click(function() {
                    ItemDetail.ShowUsingPage();
                    //ShowPopup(this);
                });

                $("#addWishListThis").bind("click", function() {
                    var itemCostVariantIDs = [];
                    if ($('#divCostVariant').is(':empty')) {
                        //itemCostVariantIDs = '0';
                        itemCostVariantIDs.push(0);
                        AspxCommerce.RootFunction.AddToWishList(itemId, '', $('#spanSKU').html());
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



                        if (info.IsCombinationMatched) {
                            AspxCommerce.RootFunction.AddToWishList(itemId, itemCostVariantIDs.join('@'), $('#spanSKU').html());
                        } else {
                            csscody.alert('<h2>' + getLocale(DetailsBrowse, 'Information Alert') + '</h2><p>' + getLocale(DetailsBrowse, 'Please choose available variants!') + '</p>');
                        }
                    }
                });

            } else {
                $('#itemDetails').hide();
                if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                    window.location = AspxCommerce.utils.GetAspxRedirectPath() + "Home" + pageExtension;
                } else {
                    window.location = AspxCommerce.utils.GetAspxRedirectPath() + "Home";
                }
            }
        }
    };
    ItemDetail.Init();
    $(window).load(function() {
        $(".scroll-pane").jScrollPane({ showArrows: true });
    });
});