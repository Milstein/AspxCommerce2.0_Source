<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AspxViewDetails.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxViewDetails_AspxViewDetails" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxItemViewList
        });
    });
    var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
    var modulePath = '<%=modulePath %>';
    var allowWishListItemDetails = '<%=allowWishListItemDetails %>';
    var noImageCategoryDetailPath = '<%=NoImageCategoryDetailPath %>';
    var arrayLength = '<%=ArrayLength %>';
    var rowTotal = '<%=RowTotal %>';
    var varFunction = "<%=VarFunction %>";
</script>

<div id="divDetailsItemsList" class="cssClassItemListView">
    <div id="divItemHeader" class="cssClassItemHeader">
        <h2 id="h2ItemHeader" class="cssClassMiddleHeader"><span></span>
        </h2>
        <div id="divSortBy" class="sort" style="display: none;">
           
       <%--   <h4>Sort by:</h4>
            <select id="ddlSortItemDetailBy" class="sfListmenu">
            </select>--%>
            <asp:Literal ID="ltrItemViewDetailSortBy" runat="server" 
                EnableViewState="False" meta:resourcekey="ltrItemViewDetailSortByResource1"></asp:Literal>
        </div>
         <br/>
    </div>
    <div class="itemList">
        <div id="divDetailItems" class="divDetailsItemList sfHorizontalbx-wrapper">
            <asp:Literal ID="ltrItemViewDetail" runat="server" EnableViewState="False" 
                meta:resourcekey="ltrItemViewDetailResource1"></asp:Literal>
        </div>
        <div class="cssClassPageNumber" id="divItemSearchPageNumber" style="display: none;">
            <div class="cssClassPageNumberMidBg">
                <div id="ItemPagination">
                </div>
                <div class="cssClassViewPerPage">
                    <h4 class="sfLocale">
                        View Per Page:
                    </h4>
                    <select id="ddlItemPageSize" class="sfListmenu">
                        <option value=""></option>
                    </select></div>
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdnPrice" />
<input type="hidden" id="hdnWeight" />
<input type="hidden" id="hdnQuantity" />
