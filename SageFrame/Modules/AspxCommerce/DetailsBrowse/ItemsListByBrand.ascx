<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemsListByBrand.ascx.cs"
    Inherits="Modules_Admin_DetailsBrowse_ItemsListByBrand" %>

<script type="text/javascript">
    //<![CDATA[
    var BrandItemList = "";
    $(function() {

        $(".sfLocale").localize({
            moduleKey: DetailsBrowse
        });
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        var brandName = '<%=BrandName %>';
        var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
        var noImageBrandItemListByIdsPath = '<%=DefaultShoppingOptionImgPath %>';
        var allowWishListBrandItemListByIds = '<%=AllowWishListItemsById %>';
        var noOfItemsInRow = '<%=NoOfItemsInARow %>';
        var displaymode = '<%=ItemDisplayMode %>'.toLowerCase();
        var currentPage = 0;
        var templateScriptArr = [];
        BrandItemList = {
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
                ajaxCallMode: "",
                error: ""
            },

            ajaxCall: function(config) {
                $.ajax({
                    type: BrandItemList.config.type,
                    contentType: BrandItemList.config.contentType,
                    cache: BrandItemList.config.cache,
                    async: BrandItemList.config.async,
                    url: BrandItemList.config.url,
                    data: BrandItemList.config.data,
                    dataType: BrandItemList.config.dataType,
                    success: BrandItemList.config.ajaxCallMode,
                    error: BrandItemList.config.error
                });
            },

            BindBrandItemsResult: function(msg) {
                BindTemplateDetails('divBrandSearchResult', 'divBrandItemViewOptions', 'divBrandViewAs', 'ddlBrandViewAs', 'ddlBrandSortBy', 'divBrandPageNumber', 'BrandPagination', 'ddlBrandPageSize', currentPage, msg, BrandItemList.BindBrandResultItems, 'BrandItemList', allowOutStockPurchase, allowWishListBrandItemListByIds, noImageBrandItemListByIdsPath, noOfItemsInRow, displaymode, templateScriptArr);
            },

            GetBrandLoadErrorMsg: function() {
                csscody.error("<h2>" + getLocale(DetailsBrowse, "Error Message") + "</h2><p>" + getLocale(Brand, "Sorry, Failed to load brand items results!") + "</p>");
            },
            GetBrandItemsByBrandID: function() {
                BrandItemList.config.method = "AspxCommerceWebService.asmx/GetBrandDetailByBrandID";
                BrandItemList.config.url = BrandItemList.config.baseURL + BrandItemList.config.method;
                BrandItemList.config.data = JSON2.stringify({ brandName: brandName, aspxCommonObj: aspxCommonObj });
                BrandItemList.config.ajaxCallMode = BrandItemList.BindBrandItemsDetailSucess;
                //BrandItemList.config.error = BrandItemList.GetBrandLoadErrorMsg;
                BrandItemList.ajaxCall(BrandItemList.config);
            },
            BindBrandItemsDetailSucess: function(data) {
                var element = '';
                if (data.d.length > 0) {
                    $.each(data.d, function(index, value) {
                        $(".sfBrandHeaderTitle").html(getLocale(DetailsBrowse, "Welcome to the ") + value.BrandName + getLocale(DetailsBrowse, " Store"));
                        element += "<div class='sfBrandLogo'><img src='" + aspxRootPath + value.BrandImageUrl.replace("uploads", "uploads/Medium") + "' title='" + value.BrandName + "' alt='" + value.BrandName + "'></div>";
                        element += "<div class='sfBrandDescription'>" + Encoder.htmlDecode(value.BrandDescription) + "</div><div class='clear'></div>";
                    });
                    $("#divBrandHeader").append(element);
                }
            },
            BindBrandResultItems: function(offset, limit, currentpage1, sortBy) {
                currentPage = currentpage1;
                BrandItemList.config.method = "AspxCommerceWebService.asmx/GetBrandItemsByBrandID";
                BrandItemList.config.url = BrandItemList.config.baseURL + BrandItemList.config.method;
                BrandItemList.config.data = JSON2.stringify({ offset: offset, limit: limit, brandName: brandName, SortBy: sortBy, aspxCommonObj: aspxCommonObj });
                BrandItemList.config.ajaxCallMode = BrandItemList.BindBrandItemsResult;
                BrandItemList.config.error = BrandItemList.GetBrandLoadErrorMsg;
                BrandItemList.ajaxCall(BrandItemList.config);
            },
            BrandItemsHideAll: function() {
                $("#divBrandItemViewOptions").hide();
                $("#divBrandPageNumber").hide();
                $("#divBrandSearchResult").hide();
            },

            Init: function() {
                $.each(jsTemplateArray, function(index, value) {
                    var tempVal = jsTemplateArray[index].split('@');
                    var templateScript = {
                        TemplateKey: tempVal[0],
                        TemplateValue: tempVal[1]
                    };
                    templateScriptArr.push(templateScript);
                });
                CreateDdlPageSizeOption('ddlBrandPageSize');
                // LoadAllAspxTemplate(); //from template js
                BrandItemList.BrandItemsHideAll();
                BrandItemList.GetBrandItemsByBrandID();
                createDropDown('ddlBrandSortBy', 'divSortBy', 'sortBy', displaymode);
                createDropDown('ddlBrandViewAs', 'divBrandViewAs', 'viewAs', displaymode);
                BrandItemList.BindBrandResultItems(1, $('#ddlBrandPageSize').val(), 0, $("#ddlBrandSortBy option:selected").val());


                $("#ddlBrandViewAs").live("change", function() {
                    BindResults('divBrandSearchResult', 'divBrandViewAs', 'ddlBrandViewAs', null, allowOutStockPurchase, allowWishListBrandItemListByIds, noImageBrandItemListByIdsPath, noOfItemsInRow, displaymode);

                });
                $("#divBrandViewAs").find('a').live('click', function() {
                    $("#divBrandViewAs").find('a').removeClass('sfactive');
                    $(this).addClass("sfactive");
                    BindResults('divBrandSearchResult', 'divBrandViewAs', 'ddlBrandViewAs', null, allowOutStockPurchase, allowWishListBrandItemListByIds, noImageBrandItemListByIdsPath, noOfItemsInRow, displaymode);

                });

                $("#ddlBrandSortBy").live("change", function() {
                    var items_per_page = $("#ddlBrandPageSize").val();
                    var offset = 1;
                    BrandItemList.BindBrandResultItems(offset, items_per_page, 0, $("#ddlBrandSortBy option:selected").val());
                });

                $("#ddlBrandPageSize").bind("change", function() {
                    var items_per_page = $(this).val();
                    var offset = 1;
                    BrandItemList.BindBrandResultItems(offset, items_per_page, 0, $("#ddlBrandSortBy option:selected").val());
                });
            }
        };
        BrandItemList.Init();
    });

    //]]>
    
</script>

<h1 class='sfBrandHeaderTitle'>
</h1>
<div class="cssClassBrandSlider" id="divBrandHeader">
</div>
<div id="divBrandItemViewOptions" class="viewWrapper">
    <div id="divBrandViewAs" class="view">
        <span class="sfLocale">View as:</span>
        <select id="ddlBrandViewAs" class="sfListmenu" style="display: none">
        </select>
    </div>
    <div id="divSortBy" class="sort">
        <span class="sfLocale">Sort by:</span>
        <select id="ddlBrandSortBy" class="sfListmenu">
        </select>
    </div>
</div>
<div id="divBrandSearchResult" class="cssClassDisplayResult">
</div>
<div class="cssClassClear">
</div>
<!-- TODO:: paging Here -->
<div class="cssClassPageNumber" id="divBrandPageNumber">
    <div class="cssClassPageNumberMidBg">
        <div id="BrandPagination">
        </div>
        <div class="cssClassViewPerPage">
            <h4 class="sfLocale">
                View Per Page:
            </h4>
            <select id="ddlBrandPageSize" class="sfListmenu">
                <option value=""></option>
            </select></div>
    </div>
</div>
