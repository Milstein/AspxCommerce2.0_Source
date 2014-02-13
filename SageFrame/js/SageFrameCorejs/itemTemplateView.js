var arrItemListType = new Array();
var arrResultToBind = new Array();
var itemTemplateViewScriptArr = [];
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
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

function GetItemTemplateScipt(key) {
    var val = "";
    if (itemTemplateViewScriptArr.length > 0) {

        for (var i = 0; i < itemTemplateViewScriptArr.length; i++) {
            if (itemTemplateViewScriptArr[i].TemplateKey == key) {
                val = itemTemplateViewScriptArr[i].TemplateValue;
                break;
            }
        }
    }
    return val;
}

function GridView(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow) {
    $("#" + appendDiv).html('');
    var itemIds = [];
    var tempScriptGridView = GetItemTemplateScipt('scriptResultGrid');
    $.each(arrResultToBind, function(index, value) {
        if (!IsExistedCategory(itemIds, value.ItemID)) {
            itemIds.push(value.ItemID);
            var imagePath = itemImagePath + value.BaseImage;
            if (value.BaseImage == "") {
                imagePath = noImagePathDetail;
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
                // loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                alternateText: value.Name,
                listPrice: value.ListPrice,
                price: value.Price,
                shortDescription: Encoder.htmlDecode(value.ShortDescription)
            }];

                // $.tmpl("scriptResultGridTemp", items).appendTo("#" + appendDiv);
                $.tmpl(tempScriptGridView, items).appendTo("#" + appendDiv);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                if (value.ListPrice == "") {
                    $(".cssRegularPrice_" + value.ItemID + "").html('');
                }
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    if (value.IsOutOfStock) {
                        $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxTemplateLocale, 'Out Of Stock'));
                        $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                        $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                        $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                    }
                }
            }
        });
        var x = 0;
        $('#' + appendDiv + ' div .cssClassProductsBox ').each(function() {
            x++;
            if ((x % noOfItemsInRow) == 0) {
                $(this).addClass('cssClassProductsBoxNoMargin');
            }
        });
        $('.cssClassProductPicture a img[title]').tipsy({ gravity: 'n' });
    }

    function ListView(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow) {
        $("#" + appendDiv).html('');
        var itemIds = [];
        var tempScriptListView = GetItemTemplateScipt('scriptResultList');
        $.each(arrResultToBind, function(index, value) {
            if (!IsExistedCategory(itemIds, value.ItemID)) {
                itemIds.push(value.ItemID);
                var imagePath = itemImagePath + value.BaseImage;
                if (value.BaseImage == "") {
                    imagePath = noImagePathDetail;
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
                    // loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                    alternateText: value.Name,
                    listPrice: value.ListPrice,
                    price: value.Price,
                    shortDescription: Encoder.htmlDecode(value.ShortDescription)
                }];

                    //$.tmpl("scriptResultListTemp", items).appendTo("#" + appendDiv);
                    $.tmpl(tempScriptListView, items).appendTo("#" + appendDiv);
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                    if (value.ListPrice == "") {
                        $(".cssRegularPrice_" + value.ItemID + "").html('');
                    }

                    if (value.IsFeatured.toLowerCase() == 'no') {
                        $(".cssClassFeaturedBg_" + value.ItemID).hide();
                    }
                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                        if (value.IsOutOfStock) {
                            $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxTemplateLocale, 'Out Of Stock'));
                            $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                            $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                            $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                        }
                    }
                }
            });
            var x = 0;
            $('#' + appendDiv + ' div .cssClassProductListView ').each(function() {
                x++;
                if ((x % noOfItemsInRow) == 0) {
                    $(this).addClass('cssClassProductsBoxNoMargin');
                }
            });
            $('.cssClassProductPicture a img[title]').tipsy({ gravity: 'n' });
        }

        function Grid2View(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow) {
            $("#" + appendDiv).html('');
            var itemIds = [];
            var tempScriptGrid2View = GetItemTemplateScipt('scriptResultGrid2');
            $.each(arrResultToBind, function(index, value) {

                if (!IsExistedCategory(itemIds, value.ItemID)) {
                    itemIds.push(value.ItemID);
                    var imagePath = itemImagePath + value.BaseImage;
                    if (value.BaseImage == "") {
                        imagePath = noImagePathDetail;
                    }
                    var items = [{
                        itemID: value.ItemID,
                        name: value.Name,
                        AspxCommerceRoot: aspxRedirectPath,
                        sku: value.SKU,
                        imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                       // loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                        alternateText: value.Name,
                        listPrice: value.ListPrice,
                        price: value.Price,
                        shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                        // $.tmpl("scriptResultGrid2Temp", items).appendTo("#" + appendDiv);
                    $.tmpl(tempScriptGrid2View, items).appendTo("#" + appendDiv);
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                        if (value.ListPrice == "") {
                            $(".cssRegularPrice_" + value.ItemID + "").html('');
                        }

                        if (allowOutStockPurchase.toLowerCase() == 'false') {
                            if (value.IsOutOfStock) {
                                $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxTemplateLocale, 'Out Of Stock'));
                                $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                            }
                        }
                    }
                });
                var x = 0;
                $('#' + appendDiv + ' div .cssClassGrid2Box ').each(function() {
                    x++;
                    if ((x % noOfItemsInRow) == 0) {
                        $(this).addClass('cssClassProductsBoxNoMargin');
                    }
                });
                $('.cssClassGrid2Picture a img[title]').tipsy({ gravity: 'n' });
            }

            function Grid3View(appendDiv, noImagePathDetail, noOfItemsInRow) {
                $("#" + appendDiv).html('');
                var itemIds = [];
                var tempScriptGrid3View = GetItemTemplateScipt('scriptResultGrid3');
                $.each(arrResultToBind, function(index, value) {
                    if (!IsExistedCategory(itemIds, value.ItemID)) {
                        itemIds.push(value.ItemID);
                        var imagePath = itemImagePath + value.BaseImage;
                        if (value.BaseImage == "") {
                            imagePath = noImagePathDetail;
                        }
                        var items = [{
                            itemID: value.ItemID,
                            name: value.Name,
                            AspxCommerceRoot: aspxRedirectPath,
                            AspxCommerceRoot: aspxRedirectPath,
                            sku: value.SKU,
                            imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                          //  loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                            alternateText: value.Name,
                            listPrice: value.ListPrice,
                            price: value.Price,
                            shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                            //$.tmpl("scriptResultGrid3Temp", items).appendTo("#" + appendDiv);
                        $.tmpl(tempScriptGrid3View, items).appendTo("#" + appendDiv);
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                            if (value.ListPrice == "") {
                                $(".cssRegularPrice_" + value.ItemID + "").html('');
                            }
                        }
                    });
                    var x = 0;
                    $('#' + appendDiv + ' div .cssClassGrid3Box ').each(function() {
                        x++;
                        if ((x % noOfItemsInRow) == 0) {
                            $(this).addClass('cssClassProductsBoxNoMargin');
                        }
                    });
                    $('.cssClassGrid3Picture a img[title]').tipsy({ gravity: 'n' });
                }

                function CompactListView(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow) { //NEED TO CHECK FOR #tblCompactList
                    $("#" + appendDiv).html('');
                    var itemIds = [];
                    var tempScriptCompactListView = GetItemTemplateScipt('scriptCompactList');
                    var CompactListViewElements = '';
                    CompactListViewElements += '<div class="cssClassCompactList">';
                    CompactListViewElements += '<table width="100%" cellspacing="0" id="tblCompactList" cellpadding="0" border="0">';
                    CompactListViewElements += '<thead><tr class="cssClassHeadeTitle">';
                    CompactListViewElements += '<td class="cssClassCLPicture">&nbsp;</td>';
                    CompactListViewElements += '<td class="cssClassCLProduct sfLocale">Item</td>';
                    CompactListViewElements += '<td class="cssClassCLProductCode sfLocale">SKU code</td>';
                    CompactListViewElements += '<td class="cssClassCLPrice sfLocale">Price</td>';
                    CompactListViewElements += '<td class="cssClassCLAddtoCart">&nbsp;</td>';
                    CompactListViewElements += '</tr></thead><tbody><div>';
                    CompactListViewElements += '</div></tbody></table></div>';
                    $("#" + appendDiv).html(CompactListViewElements);

                    $.each(arrResultToBind, function(index, value) {
                        if (!IsExistedCategory(itemIds, value.ItemID)) {
                            itemIds.push(value.ItemID);
                            var imagePath = itemImagePath + value.BaseImage;
                            if (value.BaseImage == "") {
                                imagePath = noImagePathDetail;
                            }
                            var items = [{
                                itemID: value.ItemID,
                                name: value.Name,
                                AspxCommerceRoot: aspxRedirectPath,
                                sku: value.SKU,
                                imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Medium'),
                            //   loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                                alternateText: value.Name,
                                listPrice: value.ListPrice,
                                price: value.Price,
                                shortDescription: Encoder.htmlDecode(value.ShortDescription)
}];

                                //$.tmpl("scriptCompactListTemp", items).appendTo("#tblCompactList");
                            $.tmpl(tempScriptCompactListView, items).appendTo("#tblCompactList");
                                $("#tblCompactList tr:even").addClass("sfEven");
                                $("#tblCompactList tr:odd").addClass("sfOdd");
                                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                                if (allowOutStockPurchase.toLowerCase() == 'false') {
                                    if (value.IsOutOfStock) {
                                        $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxTemplateLocale, 'Out Of Stock'));
                                        $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                        $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                        $(".cssClassAddtoCard_" + value.ItemID + " a").removeAttr('onclick');
                                    }
                                }
                            }
                        });
                        var x = 0;
                        $('#tblCompactList tbody tr').each(function() {
                            x++;
                            if ((x % noOfItemsInRow) == 0) {
                                $(this).addClass('cssClassProductsBoxNoMargin');
                            }
                        });
                        $('.cssClassCLPicture a img[title]').tipsy({ gravity: 'n' });
                    }

                    function ProductGridView(appendDiv, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow) {
                        $("#" + appendDiv).html('');
                        var itemIds = [];
                        var tempScriptProductGridView = GetItemTemplateScipt('scriptResultProductGrid');
                        $.each(arrResultToBind, function(index, value) {

                            if (!IsExistedCategory(itemIds, value.ItemID)) {
                                itemIds.push(value.ItemID);
                                var imagePath = itemImagePath + value.BaseImage;
                                if (value.BaseImage == "") {
                                    imagePath = noImagePathDetail;
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
                                   // loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                                    alternateText: value.Name,
                                    listPrice: value.ListPrice,
                                    price: value.Price,
                                    shortDescription: Encoder.htmlDecode(value.ShortDescription),
                                    costVariantItem: xx
}];

                                    //$.tmpl("scriptResultProductGridTemp", items).appendTo("#" + appendDiv);
                                $.tmpl(tempScriptProductGridView, items).appendTo("#" + appendDiv);
                                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                                    if (value.ListPrice == "") {
                                        $(".cssRegularPrice_" + value.ItemID + "").html('');
                                    }

                                    if (allowOutStockPurchase.toLowerCase() == 'false') {
                                        if (value.IsOutOfStock) {
                                            $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxTemplateLocale, 'Out Of Stock'));
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
                            $('#' + appendDiv + ' div .cssClassProductsGridBox ').each(function() {
                                x++;
                                if ((x % noOfItemsInRow) == 0) {
                                    $(this).addClass('cssClassProductsBoxNoMargin');
                                }
                            });
                            $('.cssClassProductsGridPicture a img[title]').tipsy({ gravity: 'n' });
                        }

                        function ListWithoutOptionsView(appendDiv, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow) {
                            $("#" + appendDiv).html('');
                            var itemIds = [];
                            var tempScriptListWithoutOptionsView = GetItemTemplateScipt('scriptResultListWithoutOptions');
                            $.each(arrResultToBind, function(index, value) {
                                if (!IsExistedCategory(itemIds, value.ItemID)) {
                                    itemIds.push(value.ItemID);
                                    var imagePath = itemImagePath + value.BaseImage;
                                    if (value.BaseImage == "") {
                                        imagePath = noImagePathDetail;
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
                                      //  loaderpath: AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/loader_100x12.gif",
                                        alternateText: value.Name,
                                        listPrice: value.ListPrice,
                                        price: value.Price,
                                        shortDescription: Encoder.htmlDecode(value.ShortDescription),
                                        costVariantItem: xx
}];

                                        //$.tmpl("scriptResultListWithoutOptionsTemp", items).appendTo("#" + appendDiv);
                                    $.tmpl(tempScriptListWithoutOptionsView, items).appendTo("#" + appendDiv);
                                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                                        if (value.ListPrice == "") {
                                            $(".cssRegularPrice_" + value.ItemID + "").html('');
                                        }

                                        if (allowOutStockPurchase.toLowerCase() == 'false') {
                                            if (value.IsOutOfStock) {
                                                $(".cssClassInstock_" + value.ItemID).html('Out Of Stock');
                                                $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxTemplateLocale, 'Out Of Stock'));
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
                                $('#' + appendDiv + ' div .cssClassListViewWithOutOptions ').each(function() {
                                    x++;
                                    if ((x % noOfItemsInRow) == 0) {
                                        $(this).addClass('cssClassProductsBoxNoMargin');
                                    }
                                });
                                $('.cssClassProductPicture a img[title]').tipsy({ gravity: 'n' });
                            }

                            function BindResults(appendDiv, divViewAs, ddlViewAs, mainVar, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow, displayMode) {
                                var viewAsOption = '';
                                if (displayMode == "icon") {
                                    viewAsOption = $("#" + divViewAs).find('a.sfactive').attr("displayId");
                                    if (typeof viewAsOption == 'undefined') {
                                        $("#" + divViewAs).find('a:eq(0)').addClass("sfactive");
                                        viewAsOption = $("#" + divViewAs).find('a.sfactive').attr("displayId");
                                    }
                                }
                                else {
                                    viewAsOption = $("#" + ddlViewAs).val();
                                }
                                if (arrResultToBind.length > 0) {

                                    switch (viewAsOption) {
                                        case '1':
                                            GridView(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow);
                                            break;
                                        case '2':
                                            ListView(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow);
                                            break;
                                        case '3':
                                            Grid2View(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow);
                                            break;
                                        case '4':
                                            Grid3View(appendDiv, noImagePathDetail, noOfItemsInRow);
                                            break;
                                        case '5':
                                            CompactListView(appendDiv, allowOutStockPurchase, noImagePathDetail, noOfItemsInRow);
                                            break;
                                        case '6':
                                            ProductGridView(appendDiv, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow);
                                            break;
                                        case '7':
                                            ListWithoutOptionsView(appendDiv, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow);
                                            break;
                                    }
                                    if (displayMode == "dropdown") {
                                        $("#" + ddlViewAs).val(viewAsOption);
                                    }
                                }
                            }

                            function BindTemplateDetails(appendDiv, viewOptionDiv, divViewAs, ddlViewAs, ddlSortBy, divSearchPageNumber, divPagination, ddlPageSize, currentPage, msg, varFunctionName, mainVar, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow, displayMode,templateArray) {
                                //  debugger;
                                var rowTotal = 0;
                                //   var catNames = [];
                                itemTemplateViewScriptArr = templateArray;
                                $("#" + appendDiv).show();
                                arrItemListType.length = 0;

                                if (msg.d.length > 0) {
                                    $("#" + appendDiv).html('');
                                    $("#" + viewOptionDiv).show();
                                    $("#" + divSearchPageNumber).show();
                                    $("#" + divViewAs).val(1);
                                    var itemIds = [];
                                    var headerElements = '';
                                    var imgCount = 0;
                                    //  catNames = [];
                                    $.each(msg.d, function(index, value) {

                                        rowTotal = value.RowTotal;
                                        if (value.ItemID != null) {
                                            if (!IsExistedCategory(itemIds, value.ItemID)) {
                                                itemIds.push(value.ItemID);
                                                arrItemListType.push(value);
                                            }
                                        }

                                    });

                                    if (arrItemListType.length > 0) {
                                        var items_per_page = $('#' + ddlPageSize).val();
                                        $("#" + divPagination).pagination(rowTotal, {
                                            // callback: categoryDetails.pageselectCallback,
                                            items_per_page: items_per_page,
                                            //num_display_entries: 10,
                                            current_page: currentPage,
                                            callfunction: true,
                                            function_name: { name: varFunctionName, limit: $('#' + ddlPageSize).val(), sortBy: $('#' + ddlSortBy).val() },
                                            prev_text: "Prev",
                                            next_text: "Next",
                                            prev_show_always: false,
                                            next_show_always: false
                                        });

                                        var max_elem = arrItemListType.length;
                                        arrResultToBind.length = 0;
                                        // Iterate through a selection of the content and build an HTML string
                                        for (var i = 0; i < max_elem; i++) {
                                            arrResultToBind.push(arrItemListType[i]);
                                        }

                                        //BIND FUN
                                        BindResults(appendDiv, divViewAs, ddlViewAs, mainVar, allowOutStockPurchase, allowWishListCategory, noImagePathDetail, noOfItemsInRow, displayMode);
                                        $("#" + viewOptionDiv).show();
                                        $("#" + divPagination).show();
                                    } else {
                                        $("#" + viewOptionDiv).hide();
                                        $("#" + divSearchPageNumber).hide();
                                        $("#" + appendDiv).html("<span class='cssClassNotFound'>" + getLocale(CoreJsLanguage, "No items found!") + "</span>");
                                    }
                                } else {
                                    $("#" + viewOptionDiv).hide();
                                    $("#" + divSearchPageNumber).hide();
                                    $("#" + appendDiv).html("<span class='cssClassNotFound'>" + getLocale(CoreJsLanguage, "No items found!") + "</span>");
                                }
                            }

                            function CreateDdlPageSizeOption(dropDownId) {
                                $("#" + dropDownId).html('');
                                var optionalSearchPageSize = '';
                                optionalSearchPageSize += "<option data-html-text='8' value='8'>" + 8 + "</option>";
                                optionalSearchPageSize += "<option data-html-text='16' value='16'>" + 16 + "</option>";
                                optionalSearchPageSize += "<option data-html-text='24' value='24'>" + 24 + "</option>";
                                optionalSearchPageSize += "<option data-html-text='32' value='32'>" + 32 + "</option>";
                                optionalSearchPageSize += "<option data-html-text='40' value='40'>" + 40 + "</option>";
                                optionalSearchPageSize += "<option data-html-text='64' value='64'>" + 64 + "</option>";
                                $("#" + dropDownId).html(optionalSearchPageSize);
                            }

                            function createDropDown(ddlDropdown, divViewAs, option, displayMode) {
                                var templateView = '';
                                if (option.toLowerCase() == 'sortby') {
                                    $("#" + ddlDropdown).html('');
                                    if (sortByOptions != "") {
                                        var sortByOption = sortByOptions.split(',').clean('');
                                        $.each(sortByOption, function(i) {
                                            var sortByOption1 = sortByOption[i].split('#');
                                            var displayOptions = "<option data-html-text='" + sortByOption1[1] + "' value=" + sortByOption1[0] + ">" + sortByOption1[1] + "</option>";
                                            $("#" + ddlDropdown).append(displayOptions);
                                        });
                                        $("#" + ddlDropdown).val(sortByOptionsDefault);
                                        $("#" + divViewAs).show(); //TO BE REMOVED}
                                    }
                                }
                                else if (option.toLowerCase() == 'viewas') {
                                    if (displayMode.toLowerCase() == "dropdown") {
                                        $("#" + ddlDropdown).html('');
                                        if (viewAsOptions != "") {
                                            var viewAsOption = viewAsOptions.split(',').clean('');
                                            $.each(viewAsOption, function(i) {
                                                var viewAsOption1 = viewAsOption[i].split('#');
                                                var displayOptions = "<option value=" + viewAsOption1[0] + ">" + viewAsOption1[1] + "</option>";
                                                $("#" + ddlDropdown).append(displayOptions);
                                            });
                                            $("#" + ddlDropdown).val(viewAsOptionsDefault);
                                            $("#" + ddlDropdown).show();
                                            $("#" + divViewAs).show(); //to be removed
                                            //$("#ddlSortBy").MakeFancyItemDropDown();
                                            //    categoryDetails.LoadAllCategoryContents(1, parseInt($("#ddlPageSize").val()), 0, $("#ddlSortBy option:selected").val());
                                        }
                                    }
                                    else if (displayMode.toLowerCase() == "icon") {
                                        $("#" + divViewAs).find('h4:first').remove();
                                        if (viewAsOptions != "") {
                                            var viewAsOption = viewAsOptions.split(',').clean('');
                                            $.each(viewAsOption, function(i) {
                                                var viewAsOption1 = viewAsOption[i].split('#');
                                                var displayOptions = "<a class='cssClass" + viewAsOption1[1] + "' id='view_" + viewAsOption1[0] + "' displayId='" + viewAsOption1[0] + "'   title=" + viewAsOption1[1] + "><span>" + viewAsOption1[1] + "</span></a>";
                                                $("#" + divViewAs).append(displayOptions);
                                            });
                                            //$('#' + templateView.vars.divSort + 'a[title]').tipsy({ gravity: 'n' });
                                            $("#" + divViewAs).find('a').each(function(i) {
                                                if ($(this).attr('displayId') == viewAsOptionsDefault) {
                                                    $(this).addClass('sfactive');
                                                }
                                            });
                                            $("#" + divViewAs).show();
                                            $("#" + divViewAs + " a[title]").tipsy({ gravity: 'n' });
                                        }

                                    }
                                }
                            }

                           