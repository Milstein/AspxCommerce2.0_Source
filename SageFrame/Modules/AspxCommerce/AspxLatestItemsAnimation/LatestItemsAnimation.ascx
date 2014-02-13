<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LatestItemsAnimation.ascx.cs" Inherits="Modules_AspxCommerce_AspxLatestItemsAnimation_LatestItemsAnimation" %>
<script type="text/javascript">
    //<![CDATA[

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxLatestItemAnimation
        });
    });
    var UsrModuleID = '<%=UserModuleID %>';
    var countryName = '<%=CountryName %>';
    var defaultImagePath = '<%=DefaultImagePath %>';
    var noOfLatestItems = '<%=NoOfLatestItems %>';
    var noOfLatestItemsInARow = '<%=NoOfLatestItemsInARow%>';
    var allowWishListLatestItem = '<%=AllowWishListLatestItem %>';
    var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
    var enableLatestItems = '<%=EnableLatestItems %>';
    var aspxFilePath = '<%=aspxfilePath %>';
    var latestItemRss = '<%=LatestItemRss %>';
    var allowAddToCompareLatest = '<%=AllowAddToCompareLatest %>';
    var maxCompareItemCount = '<%=MaxCompareItemCount%>';
    var divBookItemsContent = '<%=divBookItemsContentServer.ClientID%>';
    //]]>	

</script>

<div id="divLatestBookItems" class="cssClassProducts">
     <h1>
        <asp:Label ID="lblRecentItemsHeading" runat="server" Text="Recently Added Items"
            CssClass="cssClassLabel" meta:resourcekey="lblRecentItemsHeadingResource1" ></asp:Label>
        <a class="cssRssImage" href="#" style="display: none">
            <img id="lstItemsAnimationRssImage" alt="" src="" title="" />
        </a>
    </h1>
    <div id="divBookItemsContentServer" runat="server" EnableViewState="False">
        
    </div>
     <div id="divBookItemsContent">
        
    </div>
    
</div>