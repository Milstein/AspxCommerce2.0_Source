<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ViewTagsItems.ascx.cs"
    Inherits="Modules_Admin_DetailsBrowse_ViewTagsItems" %>

<script type="text/javascript">
    //<![CDATA[

    var ViewTagItem = "";
    $(function() {

        $(".sfLocale").localize({
            moduleKey: DetailsBrowse
        });
        var tagsIDs = '<%=TagsIDs %>';
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
        var noImageTagItemPath = '<%=NoImageTagItemsPath %>';
        var allowWishListTagItem = '<%=AllowWishListViewTagsItems %>';
        var noOfItemsInRow = '<%=NoOfItemsInARow %>';
        var displaymode = '<%=ItemDisplayMode %>'.toLowerCase();
        var currentPage = 0;
        var templateScriptArr = [];
        ViewTagItem = {
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
                    type: ViewTagItem.config.type,
                    contentType: ViewTagItem.config.contentType,
                    cache: ViewTagItem.config.cache,
                    async: ViewTagItem.config.async,
                    url: ViewTagItem.config.url,
                    data: ViewTagItem.config.data,
                    dataType: ViewTagItem.config.dataType,
                    success: ViewTagItem.config.ajaxCallMode,
                    error: ViewTagItem.config.error
                });
            },


            BindUserTaggedItems: function(msg) {
                BindTemplateDetails('divShowTagItemResult', 'divTagItemViewOptions', 'divViewAs', 'ddlViewTagItemAs', 'ddlSortTagItemBy', 'divTagItemPageNumber', 'Pagination', 'ddlTagItemPageSize', currentPage, msg, ViewTagItem.ListTagsItems, 'ViewTagItem', allowOutStockPurchase, allowWishListTagItem, noImageTagItemPath, noOfItemsInRow, displaymode, templateScriptArr);
            },

            GetLoadTagItemsErrorMsg: function() {
                csscody.error("<h2>" + getLocale(DetailsBrowse, "Error Message") + "</h2><p>" + getLocale(DetailsBrowse, "Sorry, Failed to load tag items!") + "</p>");
            },

            TagItemHideAll: function() {
                $("#divTagItemPageNumber").hide();
                $("#divTagItemViewOptions").hide();
            },

            ListTagsItems: function(offset, limit, currentpage1, sortBy) {
                currentPage = currentpage1;
                ViewTagItem.config.method = "AspxCommerceWebService.asmx/GetUserTaggedItems";
                ViewTagItem.config.url = ViewTagItem.config.baseURL + ViewTagItem.config.method;
                ViewTagItem.config.data = JSON2.stringify({ offset: offset, limit: limit, tagIDs: tagsIDs, SortBy: sortBy, aspxCommonObj: aspxCommonObj });
                ViewTagItem.config.ajaxCallMode = ViewTagItem.BindUserTaggedItems;
                ViewTagItem.config.error = ViewTagItem.GetLoadTagItemsErrorMsg;
                ViewTagItem.ajaxCall(this.config);
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
                ViewTagItem.TagItemHideAll();
                CreateDdlPageSizeOption('ddlTagItemPageSize');
                // LoadAllAspxTemplate();
                createDropDown('ddlSortTagItemBy', 'divSortBy', 'sortBy', displaymode);
                createDropDown('ddlViewTagItemAs', 'divViewAs', 'viewAs', displaymode);
                ViewTagItem.ListTagsItems(1, $("#ddlTagItemPageSize").val(), 0, $("#ddlSortTagItemBy option:selected").val());


                $("#ddlViewTagItemAs").live("change", function() {
                    BindResults('divShowTagItemResult', 'divViewAs', 'ddlViewTagItemAs', null, allowOutStockPurchase, allowWishListTagItem, noImageTagItemPath, noOfItemsInRow, displaymode);
                });
                $("#divViewAs").find('a').live('click', function() {
                    $("#divViewAs").find('a').removeClass('sfactive');
                    $(this).addClass("sfactive");
                    BindResults('divShowTagItemResult', 'divViewAs', 'ddlViewTagItemAs', null, allowOutStockPurchase, allowWishListTagItem, noImageTagItemPath, noOfItemsInRow, displaymode);
                });
                $("#ddlSortTagItemBy").live("change", function() {
                    var items_per_page = $('#ddlTagItemPageSize').val();
                    ViewTagItem.ListTagsItems(1, items_per_page, 0, $("#ddlSortTagItemBy option:selected").val());
                });

                $("#ddlTagItemPageSize").bind("change", function() {
                    var items_per_page = $(this).val();
                    ViewTagItem.ListTagsItems(1, items_per_page, 0, $("#ddlSortTagItemBy option:selected").val());
                });
            }
        };
        ViewTagItem.Init();

    });

    //]]>                                                       
    
</script>

<div id="divTagItemViewOptions" class="viewWrapper">
    <div id="divViewAs" class="view">
        <span class="sfLocale">View as:</span>
        <select id="ddlViewTagItemAs" class="sfListmenu" style="display: none">
        </select>
    </div>
    <div id="divSortBy" class="sort">
        <span class="sfLocale">Sort by:</span>
        <select id="ddlSortTagItemBy" class="sfListmenu">
            <option value=""></option>
        </select>
    </div>
</div>
<div id="divShowTagItemResult" class="cssClassDisplayResult">
</div>
<div class="cssClassClear">
</div>
<div class="cssClassPageNumber" id="divTagItemPageNumber">
    <div class="cssClassPageNumberMidBg">
        <div id="Pagination">
        </div>
        <div class="cssClassViewPerPage">
            <h4 class="sfLocale">
                View Per Page:
            </h4>
            <select id="ddlTagItemPageSize" class="sfListmenu">
                <option value=""></option>
            </select></div>
    </div>
</div>
