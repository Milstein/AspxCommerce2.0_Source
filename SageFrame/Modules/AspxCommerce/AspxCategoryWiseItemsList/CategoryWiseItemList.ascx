<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategoryWiseItemList.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxCategoryWiseItemsList_CategoryWiseItemList" %>

<script type="text/javascript">

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
    var categoryWiseItemList = '';
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCategoryWiseItem
        });
        var countryName = '<%=CountryName %>';
        var defaultImagePath = '<%=DefaultImagePath %>';
        var allowWishListLatestItem = '<%=AllowWishListLatestItem %>';
        var allowAddToCompareLatest = '<%=AllowAddToCompareLatest %>';
        var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
        var modulePath = '<%=modulePath %>';
        var ip = AspxCommerce.utils.GetClientIP();
        var noOfItemsInCategory = '<%=noOfItemsInCategory %>';
        var rowTotal = '<%=RowTotal %>';
        var noOfItemsDisplayInARow = '<%=NoOfItemsDisplayInARow %>';
        var currentPage = 0;
        var costVariantValueIDs = "";
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
        categoryWiseItemList = {
            config: {
                isPostBack: false,
                async: true,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath,
                baseURL1: modulePath,
                method: "",
                url: "",
                ajaxCallMode: "", ///0 for get categories and bind, 1 for notification,2 for versions bind
                itemid: 0
            },

            vars: {
                countCompareItems: 0
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: categoryWiseItemList.config.type,
                    contentType: categoryWiseItemList.config.contentType,
                    cache: categoryWiseItemList.config.cache,
                    async: categoryWiseItemList.config.async,
                    url: categoryWiseItemList.config.url,
                    data: categoryWiseItemList.config.data,
                    dataType: categoryWiseItemList.config.dataType,
                    success: categoryWiseItemList.config.ajaxCallMode,
                    error: categoryWiseItemList.config.ajaxFailure
                });
            },
            GetCategoryWiseItemList: function(offset, limit, currentpage) {
                var aspxCommonInfo = aspxCommonObj();
                delete aspxCommonInfo.UserName;
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/GetCategoryWiseItemSettings",
                    data: JSON2.stringify({ aspxCommonObj: aspxCommonInfo }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        $.each(msg.d, function(index, value) {
                            noOfItemsInCategory = value.NumberOfItemsInCategory;
                        });
                        categoryWiseItemList.CategoryItemsList(offset, limit, currentpage);
                    }
                });
            },
            CategoryItemsList: function(offset, limit, currentpage) {
                currentPage = currentpage;
                var aspxCommonInfo = aspxCommonObj();
                delete aspxCommonInfo.SessionCode;
                delete aspxCommonInfo.CustomerID;
                categoryWiseItemList.config.method = "AspxCommerceWebService.asmx/GetCategoryWiseItemList";
                categoryWiseItemList.config.url = aspxservicePath + categoryWiseItemList.config.method;
                categoryWiseItemList.config.data = JSON2.stringify({ offset: offset, limit: limit, noOfItemsInCategory: noOfItemsInCategory, aspxCommonObj: aspxCommonInfo });
                categoryWiseItemList.config.ajaxCallMode = categoryWiseItemList.BindCategoryItems;
                categoryWiseItemList.ajaxCall(categoryWiseItemList.config);
            },

            BindCategoryItems: function(msg) {
                $("#tblcategoryItems").html('');
                var catIDs = [];
                var html = '';
                $.each(msg.d, function(index, value) {
                    if (IsExistedCategory(catIDs, value.CategoryID)) {
                        categoryWiseItemList.BindRecentItems(value);
                    } else {
                        catIDs.push(value.CategoryID);
                        html = '<div class="cssCategoryBlock">';
                        html += '<label class="classCategoryName cssClassCommonSideBox" id=classCategoryName_' + value.CategoryID + '><h2 class="cssClassMiddleHeader"><span>' + value.CategoryName + '</span></h2></label>';
                        html += '<div id=div_' + value.CategoryID + '></div>';
                        html += '<div id="divViewMore_' + value.CategoryID + '" class="cssViewMore"></div></div>';
                        $("#tblcategoryItems").append(html);
                        if (value.ItemRowNum <= noOfItemsInCategory) {
                            categoryWiseItemList.BindRecentItems(value);
                        }
                    }
                });
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                //                var optInit = categoryWiseItemList.getOptionsFromForm();
                //                $("#Pagination").pagination(rowTotal, optInit);
                //                $('#divitemImage a img[title]').tipsy({ gravity: 'n' });
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
                    var aspxCommonInfo = aspxCommonObj();
                    delete aspxCommonInfo.CultureName;
                    delete aspxCommonInfo.SessionCode;
                    delete aspxCommonInfo.CustomerID;
                    this.config.itemid = itemID;
                    var checkparam = { ID: itemID, costVariantValueIDs: costVariantValueIDs, aspxCommonObj: aspxCommonInfo };
                    var checkdata = JSON2.stringify(checkparam);
                    this.config.method = "AspxCommerceWebService.asmx/CheckWishItems",
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = checkdata;
                    this.config.ajaxCallMode = categoryWiseItemList.categoryWiseItemList;
                    this.ajaxCall(this.config);
                }
            },
            fixedEncodeURIComponent: function(str) {
                return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/-/g, '_').replace(/\*/g, '%2A').replace(/%26/g, 'ampersand').replace(/%20/g, '-');
            },
            IncreaseWishListCount: function() {
                var wishListCount = $('#lnkMyWishlist span ').html().replace(/[^0-9]/gi, '');
                wishListCount = parseInt(wishListCount) + 1;
                $('.cssClassLoginStatusInfo ul li a#lnkMyWishlist span ').html("[" + wishListCount + "]");
            },
            AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                } else {
                    AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
                }
            },
            IncreaseShoppingBagCount: function() {
                var myShoppingBagCount = $('#lnkshoppingcart').html().replace(/[^0-9]/gi, '');
                myShoppingBagCount = parseInt(myShoppingBagCount) + 1;
                $('#lnkshoppingcart').html(" My Shopping Bag [" + myShoppingBagCount + "]");
            },
            BindRecentItems: function(item) {
                var RecentItemContents = '';
                var imagePath = itemImagePath + item.ImagePath;
                if (item.ImagePath == "") {
                    imagePath = defaultImagePath;
                }
                if (item.AlternateText == "") {
                    item.AlternateText = item.Name;
                }
                rowTotal = item.RowTotal;
                //RecentItemContents = '<div class="classItemsList_' + item.CategoryID + '">';
                var hrefItem = aspxRedirectPath + "item/" + categoryWiseItemList.fixedEncodeURIComponent(item.SKU) + pageExtension;
                var name = '';
                if (item.Name.length > 50) {
                    name = item.Name.substring(0, 50);
                    var i = 0;
                    i = name.lastIndexOf(' ');
                    name = name.substring(0, i);
                    name = name + "...";
                } else {
                    name = item.Name;
                }
                RecentItemContents = '<div class="classItemsList_' + item.CategoryID + '"><div class=cssClassProductsBox><div id="productImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + '  itemid="' + item.ItemID + '">';
                RecentItemContents += '<div id="divitemImage" class="cssClassProductPicture"><a href="' + hrefItem + '"><img alt="' + item.AlternateText + '"  title="' + item.AlternateText + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '"></a></div><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '" title="' + item.Name + '"><h2>' + name + '</h2></a>';
                if (!item.HidePrice) {
                    if (item.ListPrice == null) {
                        RecentItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                    } else {
                        RecentItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + (item.ListPrice).toFixed(2) + ">" + (item.ListPrice * rate).toFixed(2) + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                    }
                } else {
                    RecentItemContents += "<div class=\"cssClassProductPriceBox\"></div>";
                }
                RecentItemContents += '<div class="cssClassProductDetail"><p><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">' + getLocale(AspxCategoryWiseItem, "Details") + '</a></p></div>';

                RecentItemContents += "<div class=\"sfButtonwrapper\">";
                if (allowWishListLatestItem.toLowerCase() == 'true') {
                    if (aspxCommonObj().CustomerID > 0 && aspxCommonObj().UserName.toLowerCase() != "anonymoususer") {
                        RecentItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='categoryWiseItemList.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxCategoryWiseItem, "Wishlist") + "</span></span></button></div>";
                    } else {
                        RecentItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='AspxCommerce.RootFunction.Login();'><span><span><span>+</span>" + getLocale(AspxCategoryWiseItem, "Wishlist") + "</span></span></button></div>";
                    }
                }
                if (allowAddToCompareLatest.toLowerCase() == 'true') {
                    RecentItemContents += "<div class=\"cssClassCompareButton\"><input type=\"checkbox\" id=\"compare-" + item.ItemID + "\" onclick='categoryWiseItemList.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span>" + getLocale(AspxCategoryWiseItem, "Compare") + "</span></input></div>";
                }
                RecentItemContents += "</div>";
                RecentItemContents += "<div class=\"cssClassclear\"></div>";
                var itemSKU = JSON2.stringify(item.SKU);
                var itemName = JSON2.stringify(item.Name);
                if (allowOutStockPurchase.toLowerCase() == 'false') {
                    if (item.IsOutOfStock) {
                        RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxCategoryWiseItem, "Out Of Stock") + "</span></button></div></div>";
                    } else {
                        RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "   onclick='categoryWiseItemList.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxCategoryWiseItem, "Add to cart") + "</span></span></button></div></div>";
                    }
                } else {
                    RecentItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "  onclick='categoryWiseItemList.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxCategoryWiseItem, "Add to cart") + "</span></span></button></div></div>";
                }
                RecentItemContents += "</div>";

                RecentItemContents += '</div></div>';
                if (item.ItemRowNum <= noOfItemsInCategory) {
                    $('#div_' + item.CategoryID + '').append(RecentItemContents);
                } else {
                    $('#divViewMore_' + item.CategoryID + '').html('');
                    var viewMore = '';
                    viewMore += '<a href="' + aspxRedirectPath + 'category/' + categoryWiseItemList.fixedEncodeURIComponent(item.CategoryName) + pageExtension + '">View More</a>';
                    $('#divViewMore_' + item.CategoryID + '').append(viewMore);
                }
            },

            AddItemsToCompare: function(itemId, itemSKU, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                } else {
                    var costVariantIds = '0';
                    ItemsCompare.AddToCompare(itemId, costVariantIds);
                }
            },

            CheckAddToWishItems: function(data) {
                if (data.d) {
                    csscody.alert('<h2>' + getLocale(AspxCategoryWiseItem, 'Information Alert') + '</h2><p>' + getLocale(AspxCategoryWiseItem, 'The selected item already exist in your wishlist.') + '</p>');
                } else {
                    AspxCommerce.RootFunction.AddToWishListFromJS(categoryWiseItemList.config.itemid, ip, countryName, costVariantValueIDs); // AddToList ==> AddToWishList
                }
            },
            init: function() {
                //categoryWiseItemList.GetCategoryWiseItemList(1, $('#ddlPageSize').val(), 0);
                var items_per_page = 5;
                if (rowTotal > 0) {
                    $("#divSearchPageNumber").show();
                }
                $('#Pagination').pagination(rowTotal, {
                    //  callback:'',
                    items_per_page: items_per_page,
                    //num_display_entries: 10,
                    current_page: currentPage,
                    callfunction: true,
                    function_name: { name: categoryWiseItemList.CategoryItemsList, limit: $('#ddlPageSize').val() },
                    prev_text: getLocale(AspxCategoryWiseItem, "Prev"),
                    next_text: getLocale(AspxCategoryWiseItem, "Next"),
                    prev_show_always: false,
                    next_show_always: false
                });
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $('#divitemImage a img[title]').tipsy({ gravity: 'n' });
                $("#ddlPageSize").bind("change", function() {
                    var items_per_page = $(this).val();
                    var offset = 1;
                    categoryWiseItemList.CategoryItemsList(offset, items_per_page, 0);
                    $('#Pagination').pagination(rowTotal, {
                        //  callback:'',
                        items_per_page: items_per_page,
                        //num_display_entries: 10,
                        current_page: currentPage,
                        callfunction: true,
                        function_name: { name: categoryWiseItemList.CategoryItemsList, limit: $('#ddlPageSize').val() },
                        prev_text: getLocale(AspxCategoryWiseItem, "Prev"),
                        next_text: getLocale(AspxCategoryWiseItem, "Next"),
                        prev_show_always: false,
                        next_show_always: false
                    });
                    //$('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                });
            }
        };
        categoryWiseItemList.init();
    });
</script>

<div id="divcategoryItemsList" class="classItemList">
    <div id="tblcategoryItems">
        <asp:Literal ID="ltrCategoryWiseItem" EnableViewState="False" runat="server" meta:resourcekey="ltrCategoryWiseItemResource1"></asp:Literal>
    </div>
    <div class="cssClassclear">
    </div>
    <div class="cssClassPageNumber" id="divSearchPageNumber" style="display: none;">
        <div class="cssClassPageNumberLeftBg">
            <div class="cssClassPageNumberRightBg">
                <div class="cssClassPageNumberMidBg">
                    <div id="Pagination">
                    </div>
                    <div class="cssClassViewPerPage">
                        <span class="sfLocale">View Per Page</span>
                        <div class="cssClassDrop">
                            <select id="ddlPageSize" class="cssClassDropDown">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
