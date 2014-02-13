<%@ Control Language="C#" AutoEventWireup="true" CodeFile="BestSellersCarousel.ascx.cs"
    Inherits="Modules_AspxBestSellers_BestSellersCarousel" %>

<script type="text/javascript">
    //<![CDATA[
    var allowWishListLatestItem = '<%=AllowWishListLatestItem %>';
    var allowAddToCompareLatest = '<%=AllowAddToCompareLatest %>';
    var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
    var maxCompareItemCount = '<%=MaxCompareItemCount%>';
    var enableBestSellerItems = '<%=EnableBestSellerItems %>';
    var countBestSellerSetting = '<%=CountBestSeller %>';
    var defaultImagePath = '<%=DefaultImagePath %>';
    var rowTotal = '<%=RowTotal %>';
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxBestSellers
        });
    });
    //]]>
</script>

<div id="divBestSellersCarousel" class="cssClassBestSeller cssClassBestSellerMargin">
    <h2 class="cssClassMiddleHeader">
        <span class="sfLocale">Popular Products</span></h2>
    <div class="cssClassBestSellerBox">
        <div id="bestSellerCarasoul">
            <asp:Literal ID="ltrBestSellerCarasoul" EnableViewState="False" runat="server" meta:resourcekey="ltrBestSellerCarasoulResource1"></asp:Literal>
        </div>
        <%--<div id="divViewMoreBest" class="cssViewMore"></div>--%>
        <div class="cssClassclear">
        </div>
    </div>
</div>
