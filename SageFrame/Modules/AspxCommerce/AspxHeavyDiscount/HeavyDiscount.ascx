<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HeavyDiscount.ascx.cs"
    Inherits="HeavyDiscount" %>

<script type="text/javascript">
    //<![CDATA[
    var countryName = '<%=CountryName %>';
    var defaultImagePath = '<%=DefaultImagePath %>';
    var allowWishListHeavyDiscountItems = '<%=AllowWishListHeavyDIscountItem %>';
    var allowAddToCompareHeavyDiscountItems = '<%=AllowAddToCompareHeavyDiscount %>';
    var allowOutOfStockPurchase = '<%=AllowOutStockPurchase %>';
    var maxCompareItemCOunt = '<%=MaxCompareItemCount %>';
    var enableHeavyDiscountItems = '<%=EnableHeavyDiscountItems %>';
    var discountService = '<%=ModuleServicePath%>';
    var noOfHeavyDiscountItemShown = '<%=NoOfItemShown %>';
    var heavyDiscountItemRss = '<%=HeavyDiscountItemRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    //]]>
</script>

<div id="divHeavyDiscount" class="cssClassProducts">
    <div id="divHeavyDiscountHeader" class="cssClassHeavyDiscountHeader">
        <h2 class="cssClassMiddleHeader">
            <span class="sfLocale" id="heavyDiscontHeader" runat="server" enableviewstate="false">
            </span><a href="#" class="cssRssImage" style="display: none">
                <img id="heavyDiscountItemRssImage" alt="" src="" title="" />
            </a>
        </h2>
    </div>
    <div id="tblHeavyDiscountItems">
        <asp:Literal ID="ltrHeavyDiscount" EnableViewState="False" runat="server" 
            meta:resourcekey="ltrHeavyDiscountResource1"></asp:Literal>
    </div>
</div>
