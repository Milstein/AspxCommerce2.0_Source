<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserRecentHistory.ascx.cs"
    Inherits="Modules_AspxUserDashBoard_UserRecentHistory" %>

<script type="text/javascript">
    //<![CDATA[
    var RecentHistory = "";
    var allowAddToCompare = '<%=AllowAddToCompare %>';
    aspxCommonObj.UserName = AspxCommerce.utils.GetUserName();
    $(function()
    {
        $(".sfLocale").localize({
             moduleKey:AspxUserDashBoard
        });
    });

    RecentHistory = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: "json",
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            url: "",
            method: "",
            ajaxCallMode: "",
            error: ""
        },

        ajaxCall: function(config) {
            $.ajax({
                type: RecentHistory.config.type,
                contentType: RecentHistory.config.contentType,
                cache: RecentHistory.config.cache,
                async: RecentHistory.config.async,
                data: RecentHistory.config.data,
                dataType: RecentHistory.config.dataType,
                url: RecentHistory.config.url,
                success: RecentHistory.config.ajaxCallMode,
                error: RecentHistory.config.error
            });
        },

        init: function() {
            RecentHistory.GetUserRecentlyViewedItems();
            if (allowAddToCompare.toLowerCase() == "true") {
                $("#divUserRecentlyComparedItems").show();
                RecentHistory.GetUserRecentlyComparedItems();
            }
            $("#btnDeleteMyViewed").click(function() {
                var viewedItemsIds = '';
                $('.recentlyViewedItemsChkbox').each(function() {
                    if ($(this).attr("checked")) {
                        viewedItemsIds += $(this).val() + ',';
                    }
                });
                if (viewedItemsIds != "") {
                    var properties = {
                        onComplete: function(e) {
                            RecentHistory.ConfirmDeleteMultipleViewedItems(viewedItemsIds, e);
                        }
                    };
                    csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete the selected items?") + "</p>", properties);
                } else {
                    csscody.alert("<h2>" + getLocale(AspxUserDashBoard, "Information Alert") + "</h2><p>" + getLocale(AspxUserDashBoard, "You need to select at least one item before you can do this. To select one or more items, just check the box before each item.") + "</p>");
                }
            });

            $("#btnDeleteMyCompared").click(function() {
                var compareItemIds = '';
                $('.recentlyComparedItemsChkbox').each(function() {
                    if ($(this).attr("checked")) {
                        compareItemIds += $(this).val() + ',';
                    }
                });
                if (compareItemIds != "") {
                    var properties = { onComplete: function(e) {
                        RecentHistory.ConfirmDeleteMultipleCompareItems(compareItemIds, e);
                    }
                    }
                    csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete the selected items?") + "</p>", properties);
                }
                else {
                    csscody.alert("<h2>" + getLocale(AspxUserDashBoard, "Information Alert") + "</h2><p>" + getLocale(AspxUserDashBoard, "You need to select at least one item before you can do this. To select one or more items, just check the box before each item.") + "</p>");
                }
            });
        },

        GetUserRecentlyViewedItems: function() {
            this.config.method = "GetUserRecentlyViewedItems";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvRecentlyViewedItems_pagesize").length > 0) ? $("#gdvRecentlyViewedItems_pagesize :selected").text() : 5;
            var defaultImage = "Modules/AspxCommerce/AspxStoreSettingsManagement/uploads/noitem.png";

            $("#gdvRecentlyViewedItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'ItemID', name: 'items_id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'recentlyViewedItemsChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                    { display: getLocale(AspxUserDashBoard, 'Image'), name: 'image', coltype: 'image', cssclass: 'cssClassImageHeader', controlclass: 'cssClassGridImage', alttext: '3', align: 'left' },
                    { display: 'AlternateText', name: 'alternate_text', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Item Name'), name: 'item_name', cssclass: 'cssClassLinkHeader', controlclass: 'cssClassGridLink', coltype: 'link', align: 'left', url: 'item', queryPairs: '5' },
                    { display: 'SKU', name: 'SKU', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Viewed On'), name: 'viewed_on', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxUserDashBoard, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center', hide: true }
                ],
                buttons: [
                    { display: getLocale(AspxUserDashBoard, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', arguments: '2,3,5' },
                    { display: getLocale(AspxUserDashBoard, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', arguments: '3,5' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 1: { sorter: false }, 6: { sorter: false} },
                defaultImage: defaultImage,
                imageOfType: 'item'
            });
        },

        ConfirmDeleteMultipleViewedItems: function(ids, event) {
            RecentHistory.DeleteMultipleViewedItems(ids, event);
        },

        DeleteMultipleViewedItems: function(viewedItem_Ids, event) {
            if (event) {
                this.config.url = this.config.baseURL + "DeleteViewedItems";
                this.config.data = JSON2.stringify({ viewedItems: viewedItem_Ids, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = RecentHistory.BindViewedItemOnDelete;
                this.config.error = RecentHistory.GetDeleteViewedItemErrorMsg;
                this.ajaxCall(this.config);
            }
            return false;
        },

        GetUserRecentlyComparedItems: function() {
            this.config.method = "GetUserRecentlyComparedItems";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvRecentlyComparedItems_pagesize").length > 0) ? $("#gdvRecentlyComparedItems_pagesize :selected").text() : 5;
            var defaultImage = "Modules/AspxCommerce/AspxStoreSettingsManagement/uploads/noitem.png";

            $("#gdvRecentlyComparedItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'ItemID', name: 'items_id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'recentlyComparedItemsChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                    { display: 'CostVariantItemID', name: 'CostVariantItemID', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Image'), name: 'image', cssclass: 'cssClassImageHeader', controlclass: 'cssClassGridImage', coltype: 'image', alttext: '3', align: 'left' },
                    { display: 'AlternateText', name: 'alternate_text', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Item Name'), name: 'item_name', cssclass: 'cssClassLinkHeader', controlclass: 'cssClassGridLink', coltype: 'link', align: 'left', url: 'item', queryPairs: '6,1' },
                    { display: getLocale(AspxUserDashBoard, 'Compared On'), name: 'compared_on', cssclass: 'cssClassHeadDate', controlclass: '',coltype: 'label', align: 'left' },
                    { display: 'SKU', name: 'SKU', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center', hide: true }
                ],
                buttons: [
                    { display: getLocale(AspxUserDashBoard, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', arguments: '2,3,5' },
                    { display: getLocale(AspxUserDashBoard, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', arguments: '3,5' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 1: { sorter: false }, 6: { sorter: false} },
                defaultImage: defaultImage
            });
        },

        ConfirmDeleteMultipleCompareItems: function(ids, event) {
            RecentHistory.DeleteMultipleCompareItems(ids, event);
        },

        DeleteMultipleCompareItems: function(compareItem_Ids, event) {
            if (event) {
                this.config.url = this.config.baseURL + "DeleteComparedItems";
                this.config.data = JSON2.stringify({ compareItems: compareItem_Ids, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = RecentHistory.BindCompareItemOnDelete;
                this.config.error = RecentHistory.GetCompareDeleteErrorMsg;
                this.ajaxCall(this.config);
            }
            return false;
        },

        BindViewedItemOnDelete: function() {
            csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Recently viewed item has been deleted successfully.") + "</p>");
            RecentHistory.GetUserRecentlyViewedItems();
        },
        BindCompareItemOnDelete: function() {
            csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Recently compared item has been deleted successfully.") + "</p>");
            RecentHistory.GetUserRecentlyComparedItems();
        },

        GetDeleteViewedItemErrorMsg: function() {
            csscody.error("<h2>" + getLocale(AspxUserDashBoard, "Error Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Failed to delete recently viewed items!") + "</p>");
        },

        GetCompareDeleteErrorMsg: function() {
            csscody.error("<h2>" + getLocale(AspxUserDashBoard, "Error Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Failed to delete compared items!") + "</p>");
        }

    };
    $(function(){
        RecentHistory.init();
    });
//]]>
</script>

<div id="divUserRecentlyViewedItems">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblViewedTitle" class="sfLocale">Viewed Items</label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteMyViewed">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <%--<p>
                        <button type="button" id="btnAddViewedItemToWishList"><span><span>Add to WishList</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnAddViewedItemsToCart"><span><span>Add to Cart</span></span></button>
                    </p>--%>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="loading">                   
                     <img id="ajaxUserRecentHistoryImage2" src="" class="sfLocale" alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table class="sfGridWrapperTable" id="gdvRecentlyViewedItems" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<div class="clear"></div>
<div id="divUserRecentlyComparedItems" style="display: none;">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblComparedTitle" class="sfLocale">Compared Items</label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteMyCompared">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <%--<p>
                        <button type="button" id="btnAddComparedItemstToWishList"><span><span>Add to WishList</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnAddComparedItemsToCart"><span><span>Add to Cart</span></span></button>
                    </p>--%>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="loading">
                    <img id="ajaxUserRecentHistoryImage" src="" class="sfLocale" alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table class="sfGridWrapperTable" id="gdvRecentlyComparedItems" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
