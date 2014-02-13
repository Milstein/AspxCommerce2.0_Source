<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemLists.ascx.cs" Inherits="Modules_Admin_DetailsBrowse_ItemLists" %>

<script type="text/javascript">
    //<![CDATA[

    var ItemList = "";
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
        var searchText = "<%=SearchText%>";
        var categoryID = '<%=CategoryID %>';
        var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
        var noImageItemListPath = '<%=NoImageItemListPath %>';
        var allowWishListItemList = '<%=AllowWishListItemList %>';
        var noOfItemsInRow = '<%=NoOfItemsInARow %>';
        var displaymode = '<%=ItemDisplayMode %>'.toLowerCase();
        var currentPage = 0;
        var hasData = false;
        var templateScriptArr = [];
        ItemList = {
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
            IsInSamePage: false,
            ajaxCall: function(config) {
                $.ajax({
                    type: ItemList.config.type,
                    contentType: ItemList.config.contentType,
                    cache: ItemList.config.cache,
                    async: ItemList.config.async,
                    url: ItemList.config.url,
                    data: ItemList.config.data,
                    dataType: ItemList.config.dataType,
                    success: ItemList.config.ajaxCallMode,
                    error: ItemList.config.error
                });
            },

            BindSimpleSearchResult: function(msg) {
                if (msg.d.length > 0) {
                    hasData = true;
                } else {
                    hasData = false;
                }
                BindTemplateDetails('divShowSimpleSearchResult', 'divSimpleSearchItemViewOptions', 'divSimpleSearchViewAs', 'ddlSimpleViewAs', 'ddlSimpleSortBy', 'divSimpleSearchPageNumber', 'SimpleSearchPagination', 'ddlSimpleSearchPageSize', currentPage, msg, ItemList.BindSimpleSearchResultItems, 'ItemList', allowOutStockPurchase, allowWishListItemList, noImageItemListPath, noOfItemsInRow, displaymode, templateScriptArr);
                ItemList.AddUpdateSearchTerm();
            },

            GetSimpleSearchLoadErrorMsg: function() {
                csscody.error("<h2>" + getLocale(DetailsBrowse, "Error Message") + "</h2><p>" + getLocale(DetailsBrowse, "Failed to load search result!") + "</p>");
            },

            GetAddUpdateSearchTermErrorMsg: function() {
                csscody.error("<h2>" + getLocale(DetailsBrowse, "Error Message") + "</h2><p>" + getLocale(DetailsBrowse, "Failded to save search term!") + "</p>");
            },

            BindSimpleSearchResultItems: function(offset, limit, current, sortBy) {
                currentPage = current;
                if (!ItemList.IsInSamePage) {
                    ItemList.config.method = "AspxCommerceWebService.asmx/GetSimpleSearchResult";
                    ItemList.config.url = ItemList.config.baseURL + ItemList.config.method;
                    ItemList.config.data = JSON2.stringify({ offset: offset, limit: limit, categoryID: categoryID, searchText: searchText, sortBy: sortBy, aspxCommonObj: aspxCommonObj });
                    ItemList.config.ajaxCallMode = ItemList.BindSimpleSearchResult;
                    ItemList.config.error = ItemList.GetSimpleSearchLoadErrorMsg;
                    ItemList.ajaxCall(ItemList.config);
                } else {
                    ItemList.config.method = "AspxCommerceWebService.asmx/GetSimpleSearchResult";
                    ItemList.config.url = ItemList.config.baseURL + ItemList.config.method;
                    ItemList.config.data = JSON2.stringify({ offset: offset, limit: limit, categoryID: $("#txtSelectedCategory").val(), searchText: $.trim($("#txtSimpleSearchText").val()), sortBy: sortBy, aspxCommonObj: aspxCommonObj });
                    ItemList.config.ajaxCallMode = ItemList.BindSimpleSearchResult;
                    ItemList.config.error = ItemList.GetSimpleSearchLoadErrorMsg;
                    ItemList.ajaxCall(ItemList.config);
                }

            },
            SimpleSearchHideAll: function() {
                $("#divSimpleSearchItemViewOptions").hide();
                $("#divSimpleSearchPageNumber").hide();
                $("#divShowSimpleSearchResult").hide();
            },

            AddUpdateSearchTerm: function() {
                if (searchText == "") {
                    return false;
                }
                this.config.method = "AspxCommerceWebService.asmx/AddUpdateSearchTerm";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ hasData: hasData, searchTerm: searchText, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = "";
                this.config.error = ItemList.GetAddUpdateSearchTermErrorMsg;
                this.ajaxCall(this.config);

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
                ItemList.SimpleSearchHideAll();
                CreateDdlPageSizeOption('ddlSimpleSearchPageSize');
                // LoadAllAspxTemplate();                

                createDropDown('ddlSimpleViewAs', 'divSimpleSearchViewAs', 'viewAs', displaymode);
                createDropDown('ddlSimpleSortBy', 'divSortBy', 'sortBy', displaymode);
                ItemList.BindSimpleSearchResultItems(1, $("#ddlSimpleSearchPageSize").val(), 0, $("#ddlSimpleSortBy option:selected").val());
                //                ItemList.AddUpdateSearchTerm();


                $("#ddlSimpleViewAs").live("change", function() {
                    // ItemList.BindSimpleSearchResults();
                    BindResults('divShowSimpleSearchResult', 'divSimpleSearchViewAs', 'ddlSimpleViewAs', null, allowOutStockPurchase, allowWishListItemList, noImageItemListPath, noOfItemsInRow, displaymode);

                });
                $("#divSimpleSearchViewAs").find('a').live('click', function() {
                    $("#divSimpleSearchViewAs").find('a').removeClass('sfactive');
                    $(this).addClass("sfactive");
                    BindResults('divShowSimpleSearchResult', 'divSimpleSearchViewAs', 'ddlSimpleViewAs', null, allowOutStockPurchase, allowWishListItemList, noImageItemListPath, noOfItemsInRow, displaymode);

                });
                $("#ddlSimpleSortBy").change(function() {
                    var items_per_page = $('#ddlSimpleSearchPageSize').val();
                    var offset = 1;
                    ItemList.BindSimpleSearchResultItems(offset, items_per_page, 0, $("#ddlSimpleSortBy option:selected").val());
                });

                $("#ddlSimpleSearchPageSize").change(function() {
                    var items_per_page = $(this).val();
                    var offset = 1;
                    ItemList.BindSimpleSearchResultItems(offset, items_per_page, 0, $("#ddlSimpleSortBy option:selected").val());
                });
            }
        };
        ItemList.Init();

    });
    //]]>                              
</script>

<div id="divSimpleSearchItemViewOptions" class="viewWrapper">
    <div id="divSimpleSearchViewAs" class="view" style="display: none;">
        <h4 class="sfLocale">
            View as:</h4>
        <select id="ddlSimpleViewAs" class="sfListmenu" style="display: none">
            <option value=""></option>
        </select>
    </div>
    <div id="divSortBy" class="sort" style="display: none;">
        <h4 class="sfLocale">
            Sort by:</h4>
        <select id="ddlSimpleSortBy" class="sfListmenu">
            <option value=""></option>
        </select>
    </div>
</div>
<div id="divShowSimpleSearchResult" class="cssClassDisplayResult">
</div>
<div class="cssClassClear">
</div>
<!-- TODO:: paging Here -->
<div class="cssClassPageNumber" id="divSimpleSearchPageNumber" style="display: none;">
    <div id="SimpleSearchPagination">
    </div>
    <div class="cssClassViewPerPage">
        <h4 class="sfLocale">
            View Per Page:
        </h4>
        <select id="ddlSimpleSearchPageSize" class="sfListmenu">
            <option value=""></option>
        </select>
    </div>
    <div class="clear">
    </div>
</div>
