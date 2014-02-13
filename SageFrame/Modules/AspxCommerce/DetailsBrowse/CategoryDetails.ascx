<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategoryDetails.ascx.cs"
    Inherits="Modules_AspxDetails_AspxCategoryDetails_CategoryDetails" %>

<script type="text/javascript">
    //<![CDATA[
    var categoryDetails = '';
    //var arrPrice = '<%=arrPrice %>';

    var itemIdRes = '';
    var maxPrice = parseFloat('<%=maxPrice %>');
    var minPrice = parseFloat('<%=minPrice %>');
    var filterItem = '';
    var cat = '';
    var catIds = '<%=catIds %>';
    var limit = 5;
    var rowTotal = 0;
    var offset = 1;
    var idsByPrice = '<%=idsByPrice %>';
    var count = 0;
    var attrArr = new Array();
    var templateScriptArr = [];
    IsExistedCategory = function(arr, cat) {
        var isExist = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == cat) {
                isExist = true;
                break;
            }
        }
        return isExist;
    };
    indexOfArray = function(arr, val) {
        var arrIndex = -1;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arrIndex = i; break;
            }
        }
        return arrIndex;
    };

    $(function() {
        $(".sfLocale").localize({
            moduleKey: DetailsBrowse
        });

        //        fixedEncodeURIComponent = function(str) {
        //            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/-/g, '_').replace(/\*/g, '%2A').replace(/%26/g, 'ampersand').replace(/%20/g, '-');
        //        };
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        var templatePath = AspxCommerce.utils.GetAspxTemplateFolderPath();
        var categorykey = "<%=Categorykey%>";
        var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
        var noImageCategoryDetailPath = '<%=NoImageCategoryDetailPath %>';
        var allowWishListCategory = '<%=AllowWishListCategory %>';
        var allowAddToCompareFilter = '<%=AllowAddToCompareFilter %>';
        var maxCompareItemCount = '<%=MaxCompareItemCount%>';
        var noOfItemsInRow = '<%=NoOfItemsInARow %>';
        var displaymode = '<%=ItemDisplayMode %>'.toLowerCase();
        categorykey = categorykey.replace(/ampersand/g, '&').replace(/-/g, ' ').replace(/_/g, '-');
        var finalItem = '';
        var arrItemsOption = new Array();
        var arrItemsOptionToBind = new Array();
        var currentpage = 0;
        var isByCategory = false;
        var CategoryClickCount = 0;
        var isFirstCall = true;
        var sort_by = function(field, reverse, primer) {
            reverse = (reverse) ? -1 : 1;
            return function(a, b) {
                a = a[field];
                b = b[field];
                if (typeof (primer) != 'undefined') {
                    a = primer(a);
                    b = primer(b);
                }
                if (a < b) return reverse * -1;
                if (a > b) return reverse * 1;
                return 0;
            }
        }
        categoryDetails = {
            config: {
                isPostBack: false,
                async: true,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                method: "",
                url: "",
                ajaxCallMode: "",
                itemid: 0
            },
            GetTemplate: function(key) {
                var val = "";
                if (templateScriptArr.length > 0) {

                    for (var i = 0; i < templateScriptArr.length; i++) {
                        if (templateScriptArr[i].TemplateKey == key) {
                            val = templateScriptArr[i].TemplateValue;
                            break;
                        }
                    }
                }
                return val;
            },
            CategoryListingHideAll: function() {
                $("#divItemViewOptions").hide();
                $("#divSearchPageNumber").hide();

            },
            BindItemsViewAsDropDown: function() {
                this.config.url = this.config.baseURL + "BindItemsViewAsList";
                this.config.data = "{}";
                this.config.ajaxCallMode = categoryDetails.BindItemsViewAs;
                this.ajaxCall(this.config);
            },
            BindItemsSortByDropDown: function() {
                this.config.url = this.config.baseURL + "BindItemsSortByList";
                this.config.data = "{}";
                this.config.async = false;
                this.config.ajaxCallMode = categoryDetails.BindItemsSortBy;
                this.ajaxCall(this.config);
            },
            LoadAllCategoryContents: function() {
                this.config.method = "GetCategoryDetailFilter";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ categorykey: categorykey, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = categoryDetails.BindAllCategoryContents;
                this.ajaxCall(this.config);
            },
            init: function() {
                $.each(jsTemplateArray, function(index, value) {
                    var tempVal = jsTemplateArray[index].split('@');
                    var templateScript = {
                        TemplateKey: tempVal[0],
                        TemplateValue: tempVal[1]
                    };
                    templateScriptArr.push(templateScript);
                });

                $(":checkbox").attr("checked", false);
                $(".cssClassNewsLetter").hide();
                $("#divProductContainer").hide();
                CreateDropdownPageSize('ddlPageSize');
                // LoadAllAspxTemplate();
                //categoryDetails.BindItemsViewAsDropDown();
                //categoryDetails.BindItemsSortByDropDown();
                createDropDown('ddlSortBy', 'divSortBy', 'sortBy', displaymode);
                createDropDown('ddlViewAs', 'divViewAs', 'viewAs', displaymode);
                categoryDetails.LoadAllCategoryContents();
                $("#divShopFilter").show();
                $("#tblFilter").hide();
                cat = categorykey;
                //categoryDetails.GetAllSubCategoryForFilter();
                //categoryDetails.GetAllBrandForCategory();
                //categoryDetails.GetShoppingFilter();

                //for Shopping Filter
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                $("#slider-range").slider({
                    range: true,
                    min: minPrice,
                    max: maxPrice,
                    step: 0.001,
                    values: [minPrice, maxPrice],
                    slide: function(event, ui) {
                        $("#amount").html("<span class=\"cssClassFormatCurrency\">" + ui.values[0] * rate + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + ui.values[1] * rate + "</span>");
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    },
                    change: function(event, ui) {
                        if (isFirstCall == true) {
                            $("#amount").html("<span class=\"cssClassFormatCurrency\">" + ui.values[0] * rate + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + ui.values[1] * rate + "</span>");
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                            var lowerPrice = ui.values[0];
                            var higherPrice = ui.values[1];
                            var ids = '';
                            idsByPrice = '';
                            $.each(arrPrice, function(index, value) {
                                var itemPrc = parseFloat(value.substring(0, value.indexOf("@")));
                                var itemId = parseInt(value.substring(value.indexOf("@") + 1, value.length));
                                if (itemPrc >= lowerPrice && itemPrc <= higherPrice) {
                                    ids += itemId + ',';
                                    idsByPrice += itemId + ',';
                                }
                            });
                            ids = ids.substring(0, ids.lastIndexOf(','));
                            var itemToDisplay = '';
                            if (itemIdRes != "") {
                                var linkArr = new Array();
                                linkArr = ids.split(',');
                                var itemArr = new Array();
                                if (itemIdRes.indexOf(',') != -1) {
                                    itemArr = itemIdRes.split(',');
                                } else {
                                    itemArr[0] = itemIdRes;
                                }
                                $.each(itemArr, function(index, value) {

                                    for (j = 0; j < linkArr.length; j++) {

                                        if (value == linkArr[j]) {
                                            itemToDisplay += linkArr[j] + ',';
                                            break;
                                        }
                                    }
                                });
                                if (itemToDisplay != "") {
                                    idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                                    itemToDisplay = itemToDisplay.substring(0, itemToDisplay.lastIndexOf(','));
                                    filterItem = itemToDisplay;
                                    finalItem = itemToDisplay;
                                    if (event.originalEvent == undefined && count == 0) {
                                        categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                        count = count + 1;
                                    }
                                    else if (event.originalEvent != undefined) {
                                        categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                    }
                                } else {
                                    idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                                    filterItem = itemToDisplay;
                                    finalItem = itemToDisplay;
                                    if (event.originalEvent == undefined && count == 0) {
                                        categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                        count = count + 1;
                                    }
                                    else if (event.originalEvent != undefined) {
                                        categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                    }
                                }
                            } else {
                                idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                                filterItem = ids;
                                finalItem = ids;
                                if (event.originalEvent == undefined && count == 0) {
                                    categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                    count = count + 1;
                                }
                                else if (event.originalEvent != undefined) {
                                    categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                }
                            }
                        }
                    }

                });

                //
                //categoryDetails.CountItemForEachField();
                $("#tblFilter").show();
                $("#tblFilter").find('h2').html('<span>' + getLocale(DetailsBrowse, "Filters") + '</span>');
                $("#divShoppingFilter").hide();
                $("#divShoppingFilter").show();
                $(".divRange").append('<p><b style="color: #006699">' + getLocale(DetailsBrowse, "Range: ") + '<span id="amount"></span></b></p>');
                //$("#tblFilter").append('<hr/>');
                var attrId = '';
                var arry = new Array();
                var brandArr = [];
                finalItem = catIds.substring(0, catIds.lastIndexOf(','));
                $(":checkbox").uniform();
                categoryDetails.InitializeAndAdjustHeightOfFilter(0);
                if (finalItem != '') {
                    var offset = 1;
                    categoryDetails.GetDetail(offset, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                } else {
                    $("#tblFilter").hide();
                    $("#divItemViewOptions").hide();
                    $("#divSearchPageNumber").hide();
                    $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found!") + "</span>");
                }
                idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                $("#ddlSortBy").change(function() {
                    var items_per_page = $('#ddlPageSize').val();
                    var offset = 1;
                    categoryDetails.GetDetail(offset, items_per_page, 0, $("#ddlSortBy").val());
                });
                $("#ddlPageSize").change(function() {
                    var items_per_page = $(this).val();
                    var offset = 1;
                    categoryDetails.GetDetail(offset, items_per_page, 0, $("#ddlSortBy").val());
                });
                $("#ddlViewAs").change(function() {
                    categoryDetails.BindShoppingFilterResult();

                });
                $("#divViewAs").find('a').live('click', function() {
                    $("#divViewAs").find('a').removeClass('sfactive');
                    $(this).addClass("sfactive");
                    categoryDetails.BindShoppingFilterResult();
                });
                $(".chkCategory").live('click', function() {
                    CategoryClickCount += 1;
                    minPrice = 0;
                    maxPrice = 0;
                    catIds = '';
                    finalItem = '';
                    arrPrice = [];
                    arry.length = 0;
                    var values = $(this).attr('ids');
                    var isChecked = false;
                    $('.chkCategory').each(function() {
                        if ($(this).attr('checked') == true) {
                            isChecked = true;
                            return false;
                        }
                    });
                    if ($(this).attr('checked') == true) {
                        if (indexOfArray(brandArr, values) == -1) {
                            brandArr.push(values);
                        }
                    }
                    else {
                        if (indexOfArray(brandArr, values) != -1) {
                            brandArr.splice(indexOfArray(brandArr, values), 1);
                        }
                    }
                    if (isChecked) {
                        cat = brandArr.join(',');
                        isByCategory = true;
                    }
                    else {
                        cat = categorykey;
                        isByCategory = false;
                    }
                    $('.filter > div:gt(0)').remove();
                    categoryDetails.GetAllBrandForCategory();
                    categoryDetails.GetShoppingFilter();
                    categoryDetails.CountItemForEachField();
                    $(":checkbox").not(".chkCategory").uniform();
                    categoryDetails.InitializeAndAdjustHeightOfFilter(1);
                    finalItem = catIds.substring(0, catIds.lastIndexOf(','));
                    if (finalItem != '') {
                        $("#divItemViewOptions").show();
                        $("#divSearchPageNumber").show();
                        //if (CategoryClickCount != 1) {
                        var offset = 1;
                        categoryDetails.GetDetail(offset, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                        //}

                    } else {
                        $("#divItemViewOptions").hide();
                        $("#divSearchPageNumber").hide();
                        $("#divShowCategoryItemsList").html("No items found!");
                    }
                });

                $(".chkFilter").live('click', function() {
                    var isChecked = false;
                    $('.chkFilter').each(function() {
                        if ($(this).attr('checked') == true) {
                            isChecked = true;
                            return false;
                        }
                    });
                    finalItem = '';
                    var newArr = new Array();
                    itemIdRes = '';
                    var itemIds = $(this).attr('ids');
                    var attrIds = $(this).val();
                    var values = attrIds + 'a' + itemIds + 'i';
                    if ($(this).attr('checked') == true) {
                        if (indexOfArray(arry, values) == -1) {
                            arry.push(values);
                        }
                    }
                    if ($(this).attr('checked') == false) {
                        if (indexOfArray(arry, values) != -1) {
                            arry.splice(indexOfArray(arry, values), 1);
                        }
                        if (indexOfArray(arry, values) == -1) {
                            $(this).parents('ul').find(".chkFilter").each(function() {
                                if ($(this).attr('checked') == true) {
                                    var chkval = attrIds + 'a' + $(this).attr('ids') + 'i';
                                    if (chkval == values) {
                                        if (indexOfArray(arry, values) == -1) {
                                            arry.push(values);

                                        }
                                    }
                                }
                            });
                        }
                    }
                    var ids = '';
                    var v = '';
                    var s = '';
                    var a = '';
                    arry.sort();
                    if (arry.length > 0) {
                        s = arry[0];
                        a = s.substring(0, s.indexOf('a'));
                    }
                    $.each(arry, function(index, value) {
                        if (value.startsWith(a)) {
                            attrId = value.substring(0, value.indexOf('a'));
                            v += value.substring(value.indexOf('a') + 1, value.indexOf('i')) + ','
                        } else {
                            var val = v;
                            newArr.push(val);
                            attrId = '';
                            v = '';
                            a = '';
                            a = value.substring(0, value.indexOf('a'))
                            v = value.substring(value.indexOf('a') + 1, value.indexOf('i')) + ','
                        }
                        var lastVal = value.substring(0, value.indexOf('a'));
                        if (arry.length - 1 == index && lastVal != attrId) {
                            var val = v;
                            newArr.push(val);
                        }
                        if (arry.length - 1 == index && lastVal == attrId) {
                            var val = v;
                            newArr.push(val);
                        }
                    });
                    if (newArr.length == 1) {
                        $.each(newArr, function(index, value) {
                            itemIdRes = value.substring(0, value.lastIndexOf(','));
                        });
                    }
                    var resId = '';
                    var newA = new Array();
                    if (newArr.length > 1) {
                        var item = newArr[0];
                        var elem = '';
                        var res = item.substring(0, item.lastIndexOf(','));
                        var comArr = new Array();
                        comArr = res.split(',');
                        var i = 1;
                        for (i = 1; i < newArr.length; i++) {
                            elem = newArr[i];
                            var r = elem.substring(0, elem.lastIndexOf(','));
                            var ar = new Array();
                            ar = r.split(',');
                            if (i == 1) {
                                $.each(comArr, function(index, value) {
                                    for (j = 0; j < ar.length; j++) {
                                        if (value == ar[j]) {
                                            resId += ar[j] + ',';
                                            break;
                                        }
                                    }
                                });
                            } else {
                                resId = '';
                                $.each(newA, function(index, value) {
                                    for (j = 0; j < ar.length; j++) {
                                        if (value == ar[j]) {
                                            resId += ar[j] + ',';
                                            break;
                                        }
                                    }
                                });
                            }
                            newA = resId.split(',');
                        }
                    }
                    if (resId != '') {
                        itemIdRes = resId.substring(0, resId.lastIndexOf(','));
                    }
                    if (isChecked == true) {
                        var arrid = new Array();
                        arrid = idsByPrice.split(',');
                        var itemResArr = new Array();
                        itemResArr = itemIdRes.split(',');
                        var newRes = '';
                        $.each(arrid, function(index, value) {

                            for (j = 0; j < itemResArr.length; j++) {

                                if (value == itemResArr[j]) {
                                    newRes += itemResArr[j] + ',';
                                    break;
                                }
                            }
                        });
                        newRes = newRes.substring(0, newRes.lastIndexOf(','));
                        finalItem = newRes;
                        categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                        filterItem = newRes;
                    } else {
                        finalItem = idsByPrice;
                        categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                        filterItem = idsByPrice;
                    }
                });
                $(".filter").find('div[value="8"]').find('a').live('click', function() {
                    var itemToDisplay = '';
                    var ItmIds = $(this).attr('ids');
                    count = 0;
                    $("#slider-range").slider("option", "values", [$(this).attr('minprice'), $(this).attr('maxprice')]);
                    $("#amount").html("<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 0) * rate + "</span>" +
                    " - " + "<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 1) * rate + "</span>");
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                });

                $(".divTitle").live('click', function() {
                    var imgPath = $(this).find('img').attr('src');
                    if (imgPath == "" + templatePath + "/images/arrow_down.png") {
                        $(this).find('img').attr('src', '' + templatePath + '/images/arrow_up.png');

                    } else {
                        $(this).find('img').attr('src', '' + templatePath + '/images/arrow_down.png');
                    }
                    if ($(this).parent().attr('value') == '8') {
                        $(".divContent" + $(this).parent().attr('value')).slideToggle('fast');
                        $(".divRange").slideToggle('fast');
                    } else {
                        $(this).next(".cssClassScroll").slideToggle('fast');
                    }
                });
                $(".filter").find('div[value="8"]').find('a').live('hover', function() {
                    $(this).css("text-decoration", "underline");
                    $(this).css("color", "blue");
                });
                $(".filter").find('div[value="8"]').find('a').live('mouseout', function() {
                    $(this).css("text-decoration", "none");
                    $(this).css("color", "green");
                });
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: categoryDetails.config.type,
                    contentType: categoryDetails.config.contentType,
                    cache: categoryDetails.config.cache,
                    async: categoryDetails.config.async,
                    url: categoryDetails.config.url,
                    data: categoryDetails.config.data,
                    dataType: categoryDetails.config.dataType,
                    success: categoryDetails.config.ajaxCallMode,
                    error: categoryDetails.ajaxFailure
                });
            },
            GetAllSubCategoryForFilter: function() {
                var param = JSON2.stringify({ categorykey: cat, aspxCommonObj: aspxCommonObj });
                this.config.method = "GetAllSubCategoryForFilter";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = categoryDetails.BindSubCategoryForFilter;
                this.config.async = false;
                this.ajaxCall(this.config);
            },
            GetAllBrandForCategory: function() {
                var param = JSON2.stringify({ categorykey: cat, isByCategory: isByCategory, aspxCommonObj: aspxCommonObj });
                this.config.method = "GetAllBrandForCategory";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = categoryDetails.BindBrandForCategory;
                this.config.async = false;
                this.ajaxCall(this.config);
            },
            GetShoppingFilter: function() {
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj, categoryName: cat, isByCategory: isByCategory });
                this.config.method = "GetShoppingFilter";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = categoryDetails.BindShoppingFilter;
                this.config.async = false;
                this.ajaxCall(this.config);
            },
            GetItemDetail: function(itemID, sortBy) {
                currentPage = currentpage;
                var param = JSON2.stringify({ itemIds: itemID, limit: limit, offset: offset, sortBy: sortBy, aspxCommonObj: aspxCommonObj });
                this.config.method = "GetShoppingFilterItemsResult";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = categoryDetails.BindItemDetail;
                this.ajaxCall(this.config);
            },
            GetDetail: function(offset1, limit1, currentpage1, sortBy) {
                offset = offset1;
                limit = limit1;
                currentpage = currentpage1;
                sortBy1 = sortBy;
                categoryDetails.GetItemDetail(finalItem, sortBy1);
            },
            InitializeAndAdjustHeightOfFilter: function(categoryFlag) {
                $(".filter").find(".cssClassScroll").find(".overview").each(function(i) {
                    if (categoryFlag == 0) {
                        $(this).parents(".viewport").height($(this).height());
                    }
                    else {
                        $(this).not("#catOverview").height($(this).height());

                    }
                    if ($(this).height() <= 135) {
                        $(this).parents(".viewport").height($(this).height());

                    }
                    else {
                        $(this).parents(".viewport").parents('.cssClassScroll').find(".thumb").show();
                        $(this).parents(".viewport").parents('.cssClassScroll').tinyscrollbar();

                    }
                });
            },
            LoadFilterOnCurrencyChange: function() {
                isFirstCall = false;
                cat = categorykey;
                arrPrice = [];
                finalItem = '';
                catIds = '';
                categoryDetails.GetAllSubCategoryForFilter();
                categoryDetails.GetAllBrandForCategory();
                categoryDetails.GetShoppingFilter();
                $(":checkbox").uniform();
                categoryDetails.InitializeAndAdjustHeightOfFilter(0);
                categoryDetails.CountItemForEachField();
                finalItem = catIds.substring(0, catIds.lastIndexOf(','));
                if (finalItem != '') {
                    var offset = 1;
                    categoryDetails.GetDetail(offset, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                } else {
                    $("#tblFilter").hide();
                    $("#divItemViewOptions").hide();
                    $("#divSearchPageNumber").hide();
                    $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found!") + "</span>");
                }
            },

            CountItemForEachField: function() {
                $('.chkFilter').each(function() {
                    var itemArray = [];
                    itemArray = $(this).attr('ids').split(',');
                    $(this).parents('li').find("#count").text(' (' + itemArray.length + ')');
                });
                $(".filter").find('div[value="8"]').find('ul').find('li').each(function() {
                    var itemArray = [];
                    if ($(this).find('a').attr('ids').indexOf(',') != -1) {
                        var anchorItem = $(this).find('a').attr('ids').substring(1, $(this).find('a').attr('ids').length);
                        itemArray = anchorItem.split(',');
                    }
                    $(this).find("#count").text(' (' + itemArray.length + ')');
                });

            },

            GridView: function() {
                $("#divShowCategoryItemsList").html('');
                $("#divItemViewOptions").show();
                $("#divSearchPageNumber").show();
                var itemIds = [];
                var tempScriptGridView = categoryDetails.GetTemplate('scriptResultGrid');
                $.each(arrItemsOptionToBind, function(index, value) {
                    if (!IsExistedCategory(itemIds, value.ItemID)) {
                        itemIds.push(value.ItemID);
                        var imagePath = itemImagePath + value.BaseImage;
                        if (value.BaseImage == "") {
                            imagePath = noImageCategoryDetailPath;
                        }
                        var name = '';
                        if (value.Name.length > 50) {
                            name = value.Name.substring(0, 50);
                            var i = 0;
                            i = name.lastIndexOf(' ');
                            name = name.substring(0, i);
                            name = name + "...";
                        } else {
                            name = value.Name;
                        }
                        var items = [{
                            itemID: value.ItemID,
                            name: name,
                            titleName: value.Name,
                            AspxCommerceRoot: aspxRedirectPath,
                            sku: value.SKU,
                            imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                            loaderpath: templatePath + "/images/loader_100x12.gif",
                            alternateText: value.Name,
                            listPrice: (value.ListPrice),
                            price: (value.Price),
                            shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];
                            //  $.tmpl("scriptResultGridTemp", items).appendTo("#divShowCategoryItemsList");
                            $.tmpl(tempScriptGridView, items).appendTo("#divShowCategoryItemsList");
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                            if (value.ListPrice == "") {
                                $(".cssRegularPrice_" + value.ItemID + "").html('');
                            }
                            if (allowOutStockPurchase.toLowerCase() == 'false') {
                                if (value.IsOutOfStock) {
                                    $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(DetailsBrowse, 'Out Of Stock'));
                                    $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                    $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                    $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                }
                            }
                        }
                    });
                    var x = 0;
                    $('#divShowCategoryItemsList div .cssClassProductsBox ').each(function() {
                        x++;
                        if ((x % noOfItemsInRow) == 0) {
                            $(this).addClass('cssClassProductsBoxNoMargin');
                        }
                    });
                    if (itemIds.length == 0) {
                        $("#divItemViewOptions").hide();
                        $("#divSearchPageNumber").hide();
                        $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                    }
                    currencyRate = 0;
                },

                ListView: function() {
                    $("#divShowCategoryItemsList").html('');
                    $("#divItemViewOptions").show();
                    $("#divSearchPageNumber").show();
                    var itemIds = [];
                    var tempScriptListView = categoryDetails.GetTemplate('scriptResultList');
                    $.each(arrItemsOptionToBind, function(index, value) {
                        if (!IsExistedCategory(itemIds, value.ItemID)) {
                            itemIds.push(value.ItemID);
                            var imagePath = itemImagePath + value.BaseImage;
                            if (value.BaseImage == "") {
                                imagePath = noImageCategoryDetailPath;
                            }
                            var name = '';
                            if (value.Name.length > 50) {
                                name = value.Name.substring(0, 50);
                                var i = 0;
                                i = name.lastIndexOf(' ');
                                name = name.substring(0, i);
                                name = name + "...";
                            } else {
                                name = value.Name;
                            }
                            var items = [{
                                itemID: value.ItemID,
                                name: name,
                                titleName: value.Name,
                                AspxCommerceRoot: aspxRedirectPath,
                                sku: value.SKU,
                                imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                                alternateText: value.Name,
                                listPrice: (value.ListPrice),
                                price: (value.Price),
                                shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                                //  $.tmpl("scriptResultListTemp", items).appendTo("#divShowCategoryItemsList");
                                $.tmpl(tempScriptListView, items).appendTo("#divShowCategoryItemsList");

                                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                                if (value.IsFeatured.toLowerCase() == 'no') {
                                    $(".cssClassFeaturedBg_" + value.ItemID).hide();
                                }
                                if (value.ListPrice == "") {
                                    $(".cssRegularPrice_" + value.ItemID + "").html('');
                                }
                                if (allowOutStockPurchase.toLowerCase() == 'false') {
                                    if (value.IsOutOfStock) {
                                        $(".cssClassAddtoCard_" + value.ItemID + " span").html('Out Of Stock');
                                        $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                        $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                        $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                    }
                                }
                            }
                        });
                        var x = 0;
                        $('#divShowCategoryItemsList div .cssClassProductListView ').each(function() {
                            x++;
                            if ((x % noOfItemsInRow) == 0) {
                                $(this).addClass('cssClassProductsBoxNoMargin');
                            }
                        });
                        if (itemIds.length == 0) {
                            $("#divItemViewOptions").hide();
                            $("#divSearchPageNumber").hide();
                            $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                        }
                    },

                    Grid2View: function() {
                        $("#divShowCategoryItemsList").html('');
                        $("#divItemViewOptions").show();
                        $("#divSearchPageNumber").show();
                        var itemIds = [];
                        var tempScriptGrid2View = categoryDetails.GetTemplate('scriptResultGrid2');
                        $.each(arrItemsOptionToBind, function(index, value) {

                            if (!IsExistedCategory(itemIds, value.ItemID)) {
                                itemIds.push(value.ItemID);
                                var imagePath = itemImagePath + value.BaseImage;
                                if (value.BaseImage == "") {
                                    imagePath = noImageCategoryDetailPath;
                                }
                                var items = [{
                                    itemID: value.ItemID,
                                    name: value.Name,
                                    AspxCommerceRoot: aspxRedirectPath,
                                    sku: value.SKU,
                                    imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                                    alternateText: value.Name,
                                    listPrice: (value.ListPrice),
                                    price: (value.Price),
                                    shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                                    //$.tmpl("scriptResultGrid2Temp", items).appendTo("#divShowCategoryItemsList");
                                    $.tmpl(tempScriptGrid2View, items).appendTo("#divShowCategoryItemsList");
                                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                    if (value.ListPrice == "") {
                                        $(".cssRegularPrice_" + value.ItemID + "").html('');
                                    }
                                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                                        if (value.IsOutOfStock) {
                                            $(".cssClassAddtoCard_" + value.ItemID + " span").html('Out Of Stock');
                                            $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                            $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                            $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                        }
                                    }
                                }
                            });
                            var x = 0;
                            $('#divShowCategoryItemsList div .cssClassGrid2Box ').each(function() {
                                x++;
                                if ((x % noOfItemsInRow) == 0) {
                                    $(this).addClass('cssClassProductsBoxNoMargin');
                                }
                            });
                            if (itemIds.length == 0) {
                                $("#divItemViewOptions").hide();
                                $("#divSearchPageNumber").hide();
                                $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                            }
                        },

                        Grid3View: function() {
                            $("#divShowCategoryItemsList").html('');
                            $("#divItemViewOptions").show();
                            $("#divSearchPageNumber").show();
                            var itemIds = [];
                            var tempScriptGrid3View = categoryDetails.GetTemplate('scriptResultGrid3');
                            $.each(arrItemsOptionToBind, function(index, value) {
                                if (!IsExistedCategory(itemIds, value.ItemID)) {
                                    itemIds.push(value.ItemID);
                                    var imagePath = itemImagePath + value.BaseImage;
                                    if (value.BaseImage == "") {
                                        imagePath = noImageCategoryDetailPath;
                                    }
                                    var items = [{
                                        itemID: value.ItemID,
                                        name: value.Name,
                                        AspxCommerceRoot: aspxRedirectPath,
                                        AspxCommerceRoot: aspxRedirectPath,
                                        sku: value.SKU,
                                        imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                                        alternateText: value.Name,
                                        listPrice: (value.ListPrice),
                                        price: (value.Price),
                                        shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                                        //   $.tmpl("scriptResultGrid3Temp", items).appendTo("#divShowCategoryItemsList");
                                        $.tmpl(tempScriptGrid3View, items).appendTo("#divShowCategoryItemsList");
                                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                        if (value.ListPrice == "") {
                                            $(".cssRegularPrice_" + value.ItemID + "").html('');
                                        }
                                    }
                                });
                                var x = 0;
                                $('#divShowCategoryItemsList div .cssClassGrid3Box ').each(function() {
                                    x++;
                                    if ((x % noOfItemsInRow) == 0) {
                                        $(this).addClass('cssClassProductsBoxNoMargin');
                                    }
                                });
                                if (itemIds.length == 0) {
                                    $("#divItemViewOptions").hide();
                                    $("#divSearchPageNumber").hide();
                                    $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                                }
                            },

                            CompactListView: function() {
                                $("#divShowCategoryItemsList").html('');
                                $("#divItemViewOptions").show();
                                $("#divSearchPageNumber").show();
                                var itemIds = [];
                                var tempScriptCompactListView = categoryDetails.GetTemplate('scriptCompactList');
                                var CompactListViewElements = '';
                                CompactListViewElements += '<div class="cssClassCompactList">';
                                CompactListViewElements += '<table width="100%" cellspacing="0" id="tblCompactList" cellpadding="0" border="0">';
                                CompactListViewElements += '<thead><tr class="cssClassHeadeTitle">';
                                CompactListViewElements += '<td class="cssClassCLPicture">&nbsp;</td>';
                                CompactListViewElements += '<td class="cssClassCLProduct">Item</td>';
                                CompactListViewElements += '<td class="cssClassCLProductCode">SKU code </td>';
                                CompactListViewElements += '<td class="cssClassCLPrice">Price</td>';
                                CompactListViewElements += '<td class="cssClassCLAddtoCart">&nbsp;</td>';
                                CompactListViewElements += '</tr></thead><tbody><div>';
                                CompactListViewElements += '</div></tbody></table></div>';
                                $("#divShowCategoryItemsList").html(CompactListViewElements);

                                $.each(arrItemsOptionToBind, function(index, value) {
                                    if (!IsExistedCategory(itemIds, value.ItemID)) {
                                        itemIds.push(value.ItemID);
                                        var imagePath = itemImagePath + value.BaseImage;
                                        if (value.BaseImage == "") {
                                            imagePath = noImageCategoryDetailPath;
                                        }
                                        var items = [{
                                            itemID: value.ItemID,
                                            name: value.Name,
                                            AspxCommerceRoot: aspxRedirectPath,
                                            sku: value.SKU,
                                            imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                                            alternateText: value.Name,
                                            listPrice: (value.ListPrice),
                                            price: (value.Price),
                                            shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                                            // $.tmpl("scriptCompactListTemp", items).appendTo("#tblCompactList");
                                            $.tmpl(tempScriptCompactListView, items).appendTo("#tblCompactList");
                                            $("#tblCompactList tr:even").addClass("sfEven");
                                            $("#tblCompactList tr:odd").addClass("sfOdd");
                                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                                            if (value.ListPrice == "") {
                                                $(".cssRegularPrice_" + value.ItemID + "").html('');
                                            }
                                            if (allowOutStockPurchase.toLowerCase() == 'false') {
                                                if (value.IsOutOfStock) {
                                                    $(".cssClassAddtoCard_" + value.ItemID + " span").html('Out Of Stock');
                                                    $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                                    $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                                    $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                                }
                                            }
                                        }
                                    });
                                    if (itemIds.length == 0) {
                                        $("#divItemViewOptions").hide();
                                        $("#divSearchPageNumber").hide();
                                        $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                                    }
                                },

                                ProductGridView: function() {
                                    $("#divShowCategoryItemsList").html('');
                                    $("#divItemViewOptions").show();
                                    $("#divSearchPageNumber").show();
                                    var itemIds = [];
                                    var tempScriptProductGridView = categoryDetails.GetTemplate('scriptResultProductGrid');
                                    $.each(arrItemsOptionToBind, function(index, value) {
                                        if (!IsExistedCategory(itemIds, value.ItemID)) {
                                            itemIds.push(value.ItemID);
                                            var imagePath = itemImagePath + value.BaseImage;
                                            if (value.BaseImage == "") {
                                                imagePath = noImageCategoryDetailPath;
                                            }
                                            var xx = '';
                                            if (value.IsCostVariantItem == true) {
                                                xx = 'yes';
                                            } else {
                                                xx = '';
                                            }
                                            var items = [{
                                                itemID: value.ItemID,
                                                name: value.Name,
                                                AspxCommerceRoot: aspxRedirectPath,
                                                sku: value.SKU,
                                                imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                                                alternateText: value.Name,
                                                listPrice: (value.ListPrice),
                                                price: (value.Price),
                                                shortDescription: Encoder.htmlDecode(value.ShortDescription),
                                                costVariantItem: xx
}];

                                                // $.tmpl("scriptResultProductGridTemp", items).appendTo("#divShowCategoryItemsList");
                                                $.tmpl(tempScriptProductGridView, items).appendTo("#divShowCategoryItemsList");
                                                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                                if (value.ListPrice == "") {
                                                    $(".cssRegularPrice_" + value.ItemID + "").html('');
                                                }
                                                if (allowOutStockPurchase.toLowerCase() == 'false') {
                                                    if (value.IsOutOfStock) {
                                                        $(".cssClassAddtoCard_" + value.ItemID + " span").html('Out Of Stock');
                                                        $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                                        $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                                        $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                                    }
                                                }
                                                if (allowWishListCategory.toLowerCase() != 'true') {
                                                    $('.cssClassWishListButton').hide();
                                                }
                                            }
                                        });
                                        var x = 0;
                                        $('#divShowCategoryItemsList div .cssClassProductsGridBox ').each(function() {
                                            x++;
                                            if ((x % noOfItemsInRow) == 0) {
                                                $(this).addClass('cssClassProductsBoxNoMargin');
                                            }
                                        });
                                        if (itemIds.length == 0) {
                                            $("#divItemViewOptions").hide();
                                            $("#divSearchPageNumber").hide();
                                            $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                                        }
                                    },

                                    ListWithoutOptionsView: function() {
                                        $("#divShowCategoryItemsList").html('');
                                        $("#divItemViewOptions").show();
                                        $("#divSearchPageNumber").show();
                                        var itemIds = [];
                                        var tempScriptListWithoutOptionsView = categoryDetails.GetTemplate('scriptResultListWithoutOptions');
                                        $.each(arrItemsOptionToBind, function(index, value) {
                                            if (!IsExistedCategory(itemIds, value.ItemID)) {
                                                itemIds.push(value.ItemID);
                                                var imagePath = itemImagePath + value.BaseImage;
                                                if (value.BaseImage == "") {
                                                    imagePath = noImageCategoryDetailPath;
                                                }
                                                var xx = '';
                                                if (value.IsCostVariantItem == true) {
                                                    xx = 'yes';
                                                } else {
                                                    xx = '';
                                                }
                                                var items = [{
                                                    itemID: value.ItemID,
                                                    name: value.Name,
                                                    AspxCommerceRoot: aspxRedirectPath,
                                                    sku: value.SKU,
                                                    imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                                                    alternateText: value.Name,
                                                    listPrice: (value.ListPrice),
                                                    price: (value.Price),
                                                    shortDescription: Encoder.htmlDecode(value.ShortDescription),
                                                    costVariantItem: xx
}];

                                                    //$.tmpl("scriptResultListWithoutOptionsTemp", items).appendTo("#divShowCategoryItemsList");
                                                    $.tmpl(tempScriptListWithoutOptionsView, items).appendTo("#divShowCategoryItemsList");
                                                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                                                    if (value.ListPrice == "") {
                                                        $(".cssRegularPrice_" + value.ItemID + "").html('');
                                                    }
                                                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                                                        if (value.IsOutOfStock) {
                                                            $(".cssClassInstock_" + value.ItemID).html('Out Of Stock');
                                                            $(".cssClassAddtoCard_" + value.ItemID + " span").html('Out Of Stock');
                                                            $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                                            $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                                            $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                                        }
                                                    }
                                                    if (allowWishListCategory.toLowerCase() != 'true') {
                                                        $('.cssClassWishListWithoutOption').hide();
                                                    }
                                                }
                                            });
                                            var x = 0;
                                            $('#divShowCategoryItemsList div .cssClassListViewWithOutOptions ').each(function() {
                                                x++;
                                                if ((x % noOfItemsInRow) == 0) {
                                                    $(this).addClass('cssClassProductsBoxNoMargin');
                                                }
                                            });
                                            if (itemIds.length == 0) {
                                                $("#divItemViewOptions").hide();
                                                $("#divSearchPageNumber").hide();
                                                $("#divShowCategoryItemsList").html("<span class=\"cssClassNotFound\">" + getLocale(DetailsBrowse, "No items found or matched!") + "</span>");
                                            }
                                        },
                                        pageselectCallback: function(page_index, jq, execute) {
                                            if (execute) {
                                                var items_per_page = $('#ddlPageSize').val();
                                                var sortByOption = $("#ddlSortBy").val();
                                                switch (sortByOption) {
                                                    case '1':
                                                        arrItemsOption.sort(sort_by('AddedOn', true));
                                                        break;
                                                    case '2':
                                                        arrItemsOption.sort(sort_by('AddedOn', false));
                                                        break;
                                                    case '3':
                                                        arrItemsOption.sort(sort_by('Price', true, parseFloat));
                                                        break;
                                                    case '4':
                                                        arrItemsOption.sort(sort_by('Price', false, parseFloat));
                                                        break;
                                                }
                                                var max_elem = arrItemsOption.length;
                                                var newcontent = '';
                                                arrItemsOptionToBind.length = 0;
                                                for (var i = 0; i < max_elem; i++) {
                                                    arrItemsOptionToBind.push(arrItemsOption[i]);
                                                }
                                                categoryDetails.BindShoppingFilterResult();
                                            }
                                            return false;
                                        },
                                        BindShoppingFilterResult: function() {
                                            var viewAsOption = '';
                                            if (displaymode == "icon") {
                                                viewAsOption = $("#divViewAs").find('a.sfactive').attr("displayId");
                                                if (typeof viewAsOption == 'undefined') {
                                                    $("#divViewAs").find('a:eq(0)').addClass("sfactive");
                                                    viewAsOption = $("#divViewAs").find('a.sfactive').attr("displayId");
                                                }
                                            }
                                            else {
                                                viewAsOption = $("#ddlViewAs").val();
                                            }

                                            switch (viewAsOption) {
                                                case '1':
                                                    categoryDetails.GridView();
                                                    break;
                                                case '2':
                                                    categoryDetails.ListView();
                                                    break;
                                                case '3':
                                                    categoryDetails.Grid2View();
                                                    break;
                                                case '4':
                                                    categoryDetails.Grid3View();
                                                    break;
                                                case '5':
                                                    categoryDetails.CompactListView();
                                                    break;
                                                case '6':
                                                    categoryDetails.ProductGridView();
                                                    break;
                                                case '7':
                                                    categoryDetails.ListWithoutOptionsView();
                                                    break;
                                            }
                                        },
                                        BindSubCategoryForFilter: function(msg) {
                                            var elem = '';
                                            $(".filter").html('');
                                            if (msg.d.length > 0) {
                                                elem = '<div id="divCat" value="b01" class="cssClasscategorgy">';
                                                elem += '<div class="divTitle"><b><label style="color:#006699">' + getLocale(DetailsBrowse, 'Categories') + '</label></b><img align="right" src="' + templatePath + '/images/arrow_up.png"/></div> <div id="scrollbar1" class="cssClassScroll"> <div class="scrollbar"> <div class="track"><div class="thumb" style="display:none"> <div class="end">  </div> </div>  </div>  </div><div class="viewport"><div class="overview" id="catOverview"><div class="divContentb01"><ul id="cat"></ul></div></div></div></div></div>';
                                                $(".filter").append(elem);
                                                $.each(msg.d, function(index, value) {
                                                    elem = '';
                                                    elem = '<li><label><input class="chkCategory" type="checkbox" name="' + value.CategoryName + '" ids="' + value.CategoryID + '" value="' + value.CategoryName + '"/> ' + value.CategoryName + '<span> (' + value.ItemCount + ')</span></label></li>';
                                                    $(".filter").find('div[value="b01"]').find('ul').append(elem);
                                                });
                                            }
                                        },

                                        BindBrandForCategory: function(msg) {
                                            var elem = '';
                                            var arrBrand = [];
                                            if (msg.d.length > 0) {
                                                elem = '<div value="0" class="cssClasscategorgy">';
                                                elem += '<div class="divTitle"><b><label style="color:#006699">' + getLocale(DetailsBrowse, 'Brands') + '</label></b><img align="right" src="' + templatePath + '/images/arrow_up.png"/></div><div id="scrollbar2" class="cssClassScroll"> <div class="scrollbar"> <div class="track"><div class="thumb" style="display:none"> <div class="end">  </div> </div>  </div>  </div><div class="viewport"><div class="overview"><div class="divContent0"><ul></ul></div></div></div></div></div>';
                                                $(".filter").append(elem);
                                                $.each(msg.d, function(index, value) {
                                                    if (indexOfArray(arrBrand, value.BrandID) == -1) {
                                                        elem = '';
                                                        elem = '<li><label><input class="chkFilter" type="checkbox" name="' + value.BrandName + '" ids="' + value.ItemID + '" value="0"/> ' + value.BrandName + '<span id="count"></span></label></li>';
                                                        $(".filter").find('div[value="0"]').find('ul').append(elem);
                                                        arrBrand.push(value.BrandID);
                                                    } else {
                                                        var ids = $(".filter").find('div[value="0"]').find('ul').find('input[type="checkbox"][value="0"][name="' + value.BrandName + '"]').attr("ids");
                                                        ids += ',' + value.ItemID + '';
                                                        $(".filter").find('div[value="0"]').find('ul').find('input[type="checkbox"][value="0"][name="' + value.BrandName + '"]').attr("ids", ids);
                                                    }

                                                });
                                            }
                                        },

                                        BindShoppingFilter: function(msg) {
                                            var pId = '';
                                            var attrID = [];
                                            var attrValue = [];
                                            var attrName = '';
                                            var elem = '';
                                            var catIdsArr = [];
                                            idsByPrice = '';
                                            if (msg.d.length > 0) {
                                                $(".divRange").show();
                                                $.each(msg.d, function(index, value) {
                                                    if (indexOfArray(catIdsArr, value.ItemID) == -1) {
                                                        catIdsArr.push(value.ItemID);
                                                        catIds += value.ItemID + ',';
                                                    }
                                                    if (value.AttributeID != 8 && value.AttributeID > 40) {
                                                        if (indexOfArray(attrID, value.AttributeID) == -1) {
                                                            elem = '<div value=' + value.AttributeID + ' class="cssClasscategorgy"><div class="divTitle"><b><label style="color:#006699">' + value.AttributeName + '</label></b><img align="right" src="' + templatePath + '/images/arrow_up.png"/></div> <div id="scrollbar3" class="cssClassScroll"> <div class="scrollbar"> <div class="track"><div class="thumb" style="display:none"> <div class="end">  </div> </div>  </div>  </div><div class="viewport"><div class="overview"><div class=' + "divContent" + value.AttributeID + '><ul></ul></div></div></div></div></div>';

                                                            attrValue = [];
                                                            attrID.push(value.AttributeID);
                                                            $(".filter").append(elem);
                                                            elem = '';
                                                            elem = '<li><label><input class= "chkFilter" type="checkbox" name="' + value.AttributeValue + '" ids="' + value.ItemID + '" value="' + value.AttributeID + '"/> ' + value.AttributeValue + '<span id="count"></span></label></li>';
                                                            $(".filter").find('div[value=' + value.AttributeID + ']').find('ul').append(elem);
                                                            attrValue.push(value.AttributeValue);
                                                        } else {
                                                            if (indexOfArray(attrValue, value.AttributeValue) == -1) {
                                                                elem = '';
                                                                elem = '<li><label><input class="chkFilter" type="checkbox" name="' + value.AttributeValue + '" ids="' + value.ItemID + '" value="' + value.AttributeID + '"/> ' + value.AttributeValue + '<span id="count"></span></label></li>';
                                                                $(".filter").find('div[value=' + value.AttributeID + ']').find('ul').append(elem);
                                                                attrValue.push(value.AttributeValue);
                                                            } else {

                                                                var ids = $(".filter").find('input[type="checkbox"][value=' + value.AttributeID + '][name="' + value.AttributeValue + '"]').attr("ids");
                                                                ids += ',' + value.ItemID + '';
                                                                $(".filter").find('input[type="checkbox"][value=' + value.AttributeID + '][name="' + value.AttributeValue + '"]').attr("ids", ids);
                                                            }
                                                        }
                                                    } else if (value.AttributeID == 8) {
                                                        arrPrice.push(value);
                                                        if (parseFloat(value.AttributeValue) > maxPrice) {
                                                            maxPrice = parseFloat(value.AttributeValue);
                                                        }
                                                        if (parseFloat(value.AttributeValue) < minPrice || minPrice == 0) {
                                                            minPrice = parseFloat(value.AttributeValue);
                                                        }
                                                    }
                                                });
                                                var interval = parseFloat((maxPrice - minPrice) / 4);
                                                elem = '<div value="8" class="cssClassbrowseprice">';
                                                elem += '<div class="divTitle"><b><label style="color:#006699">' + getLocale(DetailsBrowse, 'Price') + '</label></b><img align="right" src="' + templatePath + '/images/arrow_up.png"/></div><div class="divContent8"><ul>';
                                                if (arrPrice.length > 1) {
                                                    elem += '<li><a id="f1" href="#" ids=""  minprice=' + GetPriceData(minPrice, 0, interval) + ' maxprice=' + GetPriceData(minPrice, 1, interval) + '>' + '<span class=\"cssClassFormatCurrency\">' + minPrice * rate + '</span>' + ' - ' + '<span class=\"cssClassFormatCurrency\">' + GetPriceData(minPrice, 1, interval) * rate + '</span>' + '<span id="count"></span></a></li>';
                                                    elem += '<li><a id="f2" href="#" ids="" minprice=' + GetPriceData(minPrice + 0.01, 1, interval) + ' maxprice=' + GetPriceData(minPrice, 2, interval) + '>' + '<span class=\"cssClassFormatCurrency\">' + GetPriceData(minPrice * rate + 0.01, 1, interval * rate) + '</span>' + ' - ' + '<span class=\"cssClassFormatCurrency\">' + GetPriceData(minPrice, 2, interval) * rate + '</span>' + '<span id="count"></span></a></li>';
                                                    elem += '<li><a id="f3" href="#" ids="" minprice=' + GetPriceData(minPrice + 0.01, 2, interval) + ' maxprice=' + GetPriceData(minPrice, 3, interval) + '>' + '<span class=\"cssClassFormatCurrency\">' + GetPriceData(minPrice * rate + 0.01, 2, interval * rate) + '</span>' + ' - ' + '<span class=\"cssClassFormatCurrency\">' + GetPriceData(minPrice, 3, interval) * rate + '</span>' + '<span id="count"></span></a></li>';
                                                    elem += '<li><a id="f4" href="#" ids="" minprice=' + GetPriceData(minPrice + 0.01, 3, interval) + ' maxprice=' + maxPrice + '>' + '<span class=\"cssClassFormatCurrency\">' + GetPriceData(minPrice * rate + 0.01, 3, interval * rate) + '</span>' + ' - ' + '<span class=\"cssClassFormatCurrency\">' + maxPrice * rate + '</span>' + '<span id="count"></span></a></li>';
                                                }
                                                if (arrPrice.length == 1) {
                                                    elem += '<li><a id="f1" href="#" ids=","  minprice=' + GetPriceData(minPrice, 0, interval) + ' maxprice=' + GetPriceData(minPrice, 1, interval) + '>' + '<span class=\"cssClassFormatCurrency\">' + minPrice * rate + '</span>' + '<span id="count"></span></a></li>';
                                                    minPrice = 0;
                                                }
                                                elem += '</ul></div>';
                                                elem += '<div class="divRange"><div id="slider-range"></div><p><b style="color: #006699">' + getLocale(DetailsBrowse, "Range: ") + '<span id="amount"></span></b></p></div></div>';
                                                $(".filter").append(elem);
                                                $.each(arrPrice, function(index, value) {
                                                    idsByPrice += value.ItemID + ',';
                                                    if (parseFloat(value.AttributeValue) >= GetPriceData(minPrice, 0, interval) && parseFloat(value.AttributeValue) <= GetPriceData(minPrice, 1, interval)) {
                                                        var ids = $(".filter").find('div[value=' + value.AttributeID + ']').find('#f1').attr('ids');
                                                        ids += ',' + value.ItemID + '';
                                                        $(".filter").find('div[value=' + value.AttributeID + ']').find('#f1').attr('ids', ids);
                                                    } else if (parseFloat(value.AttributeValue) >= GetPriceData(minPrice + 0.01, 1, interval) && parseFloat(value.AttributeValue) <= GetPriceData(minPrice, 2, interval)) {
                                                        var ids = $(".filter").find('div[value=' + value.AttributeID + ']').find('#f2').attr('ids');
                                                        ids += ',' + value.ItemID + '';
                                                        $(".filter").find('div[value=' + value.AttributeID + ']').find('#f2').attr('ids', ids);

                                                    } else if (parseFloat(value.AttributeValue) >= GetPriceData(minPrice + 0.01, 2, interval) && parseFloat(value.AttributeValue) <= GetPriceData(minPrice, 3, interval)) {
                                                        var ids = $(".filter").find('div[value=' + value.AttributeID + ']').find('#f3').attr('ids');
                                                        ids += ',' + value.ItemID + '';
                                                        $(".filter").find('div[value=' + value.AttributeID + ']').find('#f3').attr('ids', ids);
                                                    } else if (parseFloat(value.AttributeValue) >= GetPriceData(minPrice + 0.01, 3, interval) && parseFloat(value.AttributeValue) <= maxPrice) {
                                                        var ids = $(".filter").find('div[value=' + value.AttributeID + ']').find('#f4').attr('ids');
                                                        ids += ',' + value.ItemID + '';
                                                        $(".filter").find('div[value=' + value.AttributeID + ']').find('#f4').attr('ids', ids);
                                                    }
                                                });
                                                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                                $("#slider-range").slider({
                                                    range: true,
                                                    min: minPrice,
                                                    max: maxPrice,
                                                    step: 0.001,
                                                    values: [minPrice, maxPrice],
                                                    slide: function(event, ui) {
                                                        $("#amount").html("<span class=\"cssClassFormatCurrency\">" + ui.values[0] * rate + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + ui.values[1] * rate + "</span>");
                                                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                                    },
                                                    change: function(event, ui) {
                                                        $("#amount").html("<span class=\"cssClassFormatCurrency\">" + ui.values[0] * rate + "</span>" + " - " + "<span class=\"cssClassFormatCurrency\">" + ui.values[1] * rate + "</span>");
                                                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                                        var lowerPrice = ui.values[0];
                                                        var higherPrice = ui.values[1];
                                                        var ids = '';
                                                        idsByPrice = '';
                                                        $.each(arrPrice, function(index, value) {

                                                            if (value.AttributeValue >= lowerPrice && value.AttributeValue <= higherPrice) {
                                                                ids += value.ItemID + ',';
                                                                idsByPrice += value.ItemID + ',';
                                                            }
                                                        });
                                                        ids = ids.substring(0, ids.lastIndexOf(','));
                                                        var itemToDisplay = '';
                                                        if (itemIdRes != "") {
                                                            var linkArr = new Array();
                                                            linkArr = ids.split(',');
                                                            var itemArr = new Array();
                                                            if (itemIdRes.indexOf(',') != -1) {
                                                                itemArr = itemIdRes.split(',');
                                                            } else {
                                                                itemArr[0] = itemIdRes;
                                                            }
                                                            $.each(itemArr, function(index, value) {

                                                                for (j = 0; j < linkArr.length; j++) {

                                                                    if (value == linkArr[j]) {
                                                                        itemToDisplay += linkArr[j] + ',';
                                                                        break;
                                                                    }
                                                                }
                                                            });
                                                            if (itemToDisplay != "") {
                                                                idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                                                                itemToDisplay = itemToDisplay.substring(0, itemToDisplay.lastIndexOf(','));
                                                                filterItem = itemToDisplay;
                                                                finalItem = itemToDisplay;
                                                                if (event.originalEvent == undefined && count == 0) {
                                                                    categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                                                    count = count + 1;
                                                                }
                                                                else if (event.originalEvent != undefined) {
                                                                    categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                                                }
                                                            } else {
                                                                idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                                                                filterItem = itemToDisplay;
                                                                finalItem = itemToDisplay;
                                                                if (event.originalEvent == undefined && count == 0) {
                                                                    categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                                                    count = count + 1;
                                                                }
                                                                else if (event.originalEvent != undefined) {
                                                                    categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                                                }
                                                            }
                                                        } else {
                                                            idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                                                            filterItem = ids;
                                                            finalItem = ids;
                                                            if (event.originalEvent == undefined && count == 0) {
                                                                categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                                                count = count + 1;
                                                            }
                                                            else if (event.originalEvent != undefined) {
                                                                categoryDetails.GetDetail(1, $('#ddlPageSize').val(), 0, $("#ddlSortBy").val());
                                                            }
                                                        }
                                                    }
                                                });

                                                $("#amount").html("<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 0) * rate + "</span>" +
                               " - " + "<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 1) * rate + "</span>");
                                                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                                            }
                                            else {
                                                if ($(".filter").length == 0) {
                                                    $("#divShopFilter").hide();
                                                }
                                                else {
                                                    $(".divRange").hide();
                                                }
                                            }
                                        },

                                        BindItemDetail: function(msg) {
                                            arrItemsOptionToBind.length = 0;
                                            rowTotal = 0;
                                            arrItemsOption.length = 0;
                                            $.each(msg.d, function(index, value) {
                                                arrItemsOption.push(value);
                                                rowTotal = value.RowTotal;
                                            });
                                            limit = $('#ddlPageSize').val();
                                            var offset = 1;
                                            var items_per_page = $('#ddlPageSize').val();
                                            if (itemIdRes != "") {
                                                $("#Pagination").pagination(rowTotal, {
                                                    callback: categoryDetails.pageselectCallback,
                                                    items_per_page: items_per_page,
                                                    current_page: currentpage,
                                                    callfunction: true,
                                                    function_name: { name: categoryDetails.GetDetail, limit: $('#ddlPageSize').val(), sortBy: $("#ddlSortBy").val() },
                                                    prev_text: "Prev",
                                                    next_text: "Next",
                                                    prev_show_always: false,
                                                    next_show_always: false
                                                });
                                            } else {
                                                $("#Pagination").pagination(rowTotal, {
                                                    callback: categoryDetails.pageselectCallback,
                                                    items_per_page: items_per_page,
                                                    current_page: currentPage,
                                                    callfunction: true,
                                                    function_name: { name: categoryDetails.GetDetail, limit: $('#ddlPageSize').val(), sortBy: $("#ddlSortBy").val() },
                                                    prev_text: "Prev",
                                                    next_text: "Next",
                                                    prev_show_always: false,
                                                    next_show_always: false
                                                });

                                            }
                                        },
                                        BindItemsViewAs: function(msg) {
                                            if (msg.d.length > 0) {
                                                $.each(msg.d, function(index, item) {
                                                    var displayOptions = "<a class='cssClass" + item.OptionType + "' id='view_" + item.DisplayItemID + "' onclick='fnGetClicked(this.id)' title=" + item.OptionType + "><span>" + item.OptionType + "</span></a>";
                                                    $("#divViewAs").append(displayOptions);
                                                });
                                                $('#divViewAs a[title]').tipsy({ gravity: 'n' });
                                            }
                                        },
                                        BindItemsSortBy: function(msg) {
                                            if (msg.d.length > 0) {
                                                $.each(msg.d, function(index, item) {
                                                    var displayOptions = "<option value=" + item.SortOptionTypeID + ">" + item.OptionType + "</option>"
                                                    $("#ddlSortBy").append(displayOptions);
                                                });
                                            }
                                        },
                                        BindAllCategoryContents: function(msg) {
                                            $("#divHeader").html('');
                                            var isNoCategoryImage = false;
                                            var categoryImagePath = "Modules/AspxCommerce/AspxCategoryManagement/uploads/";
                                            if (msg.d.length > 0) {
                                                var headerWrapper = '';
                                                var imgCount = 0;
                                                headerWrapper = "<div id=\"slider-container\"><div id=\"sliderObj\" class=\"cat-slideshow-wrap\">";
                                                headerWrapper += "<div class=\"cat_Slides cat-slide-container\"><div class=\"cat-slide-container-inner\">";
                                                $.each(msg.d, function(index, value) {
                                                    if (value.CategoryImage != '') {
                                                        isNoCategoryImage = true;
                                                        var catDesc = value.CategoryShortDesc;
                                                        if (catDesc != '' || catDesc != null) {
                                                            if (catDesc.indexOf(' ') > 1) {
                                                                index = catDesc.substring(0, 300).lastIndexOf(' ');
                                                                catDesc = catDesc.substring(0, index);
                                                                catDesc = catDesc + ' ...';
                                                            }
                                                        }
                                                        var href = window.location.href.split('category/')[0] + "category/" + fixedEncodeURIComponent(value.CategoryName) + pageExtension;
                                                        imgCount++;
                                                        var catImagePath = categoryImagePath + value.CategoryImage;
                                                        headerWrapper += "<div class=\"cssCatImage\"><a href=" + href + "><img src='" + aspxRootPath + catImagePath + "' alt='" + value.CategoryName + "' title='" + value.CategoryName + "' /></a><div class=\"cssCatDesc\"><span>" + value.CategoryName + "</span><p>" + catDesc + "</p></div></div>";
                                                    }
                                                });
                                                headerWrapper += "</div></div>";
                                                headerWrapper += "<div class=\"slideshow-progress-bar-wrap\" style=\"display: none;\">";
                                                headerWrapper += "<div class=\"highlight-bar\">";
                                                headerWrapper += "<div class=\"edge left\"></div><div class=\"edge right\"></div>";
                                                headerWrapper += "</div><div class=\"slideshow-progress-bar\"></div></div></div></div>";
                                                $("#divHeader").html(headerWrapper);
                                                $("#divHeader").show();
                                                if (imgCount > 1) {
                                                    var catSlideshowWrap = jQuery('#slider-container').find('#sliderObj');
                                                    var catSlidesContainer = catSlideshowWrap.find('div.cat-slide-container div.cat-slide-container-inner');
                                                    var catSlides = catSlidesContainer.children('div');
                                                    var pager = catSlideshowWrap.find('div.slideshow-progress-bar-wrap div.slideshow-progress-bar');
                                                    var highlightBar = catSlideshowWrap.find('div.highlight-bar');
                                                    var pagerMarkup = new Array();
                                                    var pagerElPercentW = 1 / catSlides.length * 100;
                                                    catSlides.each(function(i) {
                                                        // Make a pager element for each slide
                                                        var oneBasedIndex = i + 1;
                                                        pagerMarkup.push('<div class="pagerLink" style="width: ' + pagerElPercentW + '%;"><div class="pager' + oneBasedIndex + '"></div></div>');
                                                    });
                                                    // Insert the pager elements into the markup
                                                    pager.append(pagerMarkup.join(''));
                                                    // Make the highlight bar the same width as each pager element
                                                    highlightBar.css('width', pagerElPercentW + '%');
                                                    var TRANSITION_SPEED = 500;
                                                    // Fire the slideshow
                                                    catSlidesContainer.cycle({
                                                        activePagerClass: 'active',
                                                        before: function(curr, next, opts) {
                                                            // Slide the highlight bar to the next slide's pager anchor. Cancel any
                                                            // unfinished animations on the highlight bar and then start a new one.
                                                            highlightBar.stop(true).animate(
                                                                {
                                                                    'left': pager.find('div.pagerLink').eq(jQuery(next).index()).position().left
                                                                },
                                                                TRANSITION_SPEED
                                                            );
                                                        },
                                                        fx: 'fade',
                                                        speed: TRANSITION_SPEED,
                                                        timeout: 5000,
                                                        pause: 1,
                                                        pauseOnPagerHover: 1,
                                                        pager: '#slider-container #sliderObj div.slideshow-progress-bar-wrap div.slideshow-progress-bar',
                                                        pagerAnchorBuilder: function(idx, slide) {
                                                            // Selector string to grab the pager for each slide
                                                            return '#slider-container #sliderObj div.slideshow-progress-bar-wrap div.slideshow-progress-bar div.pagerLink:eq(' + idx + ')';
                                                        },
                                                        pagerEvent: 'mouseenter.cycle'
                                                    });
                                                    $(".slideshow-progress-bar-wrap").show();
                                                }
                                                if (!isNoCategoryImage) {
                                                    $("#divHeader").html('');
                                                }

                                            }
                                            else {
                                                $("#divHeader").html('');
                                            }

                                        }
                                    };

                                    categoryDetails.init();
                                });
                                function GetPriceData(price, count, interval) {
                                    return (price + (count * interval));
                                }
                                function CreateDropdownPageSize(dropDownId) {
                                    $("#" + dropDownId).html('');
                                    var optionalSearchPageSize = '';
                                    optionalSearchPageSize += "<option data-html-text='9' value='9'>" + 9 + "</option>";
                                    optionalSearchPageSize += "<option data-html-text='18' value='16'>" + 18 + "</option>";
                                    optionalSearchPageSize += "<option data-html-text='27' value='27'>" + 27 + "</option>";
                                    optionalSearchPageSize += "<option data-html-text='36' value='32'>" + 36 + "</option>";
                                    optionalSearchPageSize += "<option data-html-text='45' value='45'>" + 45 + "</option>";
                                    optionalSearchPageSize += "<option data-html-text='90' value='90'>" + 90 + "</option>";
                                    $("#" + dropDownId).html(optionalSearchPageSize);
                                }

                                //]]>
</script>

<div id="divShopFilter" class="cssClassFilter" style="display: none;">
    <div id="tblFilter">
        <h2 class="cssClassLeftHeader">
            <span></span>
        </h2>
        <%--<div class="filter">
        </div>--%>
        <asp:Literal ID="ltrFilter" runat="server" EnableViewState="false"></asp:Literal>
    </div>
</div>
<div class="cssCategoryWrapper">
    <div id="divHeader" class="cssClassSlider" style="display: none;">
    </div>
    <div id='CategoryCaption' class='cssClassCategoryCaption'>
    </div>
    <div id="categoryListings">
    </div>
    <div id="divItemViewOptions" class="viewWrapper" style="display: none">
        <div id="divViewAs" class="view" style="display: none;">
            <h4 class="sfLocale">
                View as:
            </h4>
            <select id="ddlViewAs" class="sfListmenu" style="display: none">
                <option value=""></option>
            </select>
        </div>
        <div id="divSortBy" class="sort" style="display: none;">
            <h4 class="sfLocale">
                Sort by:
            </h4>
            <select id="ddlSortBy" class="sfListmenu">
                <option value=""></option>
            </select>
        </div>
    </div>
    <div id="divShowCategoryItemsList" class="cssClassDisplayResult">
    </div>
    <div class="cssClassClear">
    </div>
    <!-- TODO:: paging Here -->
    <div class="cssClassPageNumber" id="divSearchPageNumber" style="display: none">
        <div id="Pagination">
        </div>
        <div class="cssClassViewPerPage">
            <h4 class="sfLocale">
                View Per Page:
            </h4>
            <select class="sfListmenu" id="ddlPageSize">
            </select></div>
        <div class="clear">
        </div>
    </div>
</div>
