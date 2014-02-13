<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WishItems.ascx.cs" Inherits="Modules_AspxWishItems_WishItems" %>

<script type="text/javascript" language="javascript">
    //<![CDATA[
//    $(function() {
//        $(".sfLocale").localize({
//            moduleKey: AspxWishItems
//        });
        if (ModuleCollapsible.toLowerCase() == 'true') {
            $(".cssClassWishItemsHeader").addClass("sfCollapsible");
            $(".cssClassWishItemsHeader").live('click', function() {
                $("#wishItem").slideToggle('fast');
            });
        }
    });
    var countryNameWishList = '<%=CountryName %>';
    var wishListNoImagePath = '<%=NoImageWishItemPath %>';
    var allowWishItemList = '<%=AllowWishItemList %>';
    var showWishItemImage = '<%=ShowWishedItemImage %>';
    var wishListURLSetting = '<%=WishListURL%>';
    var noOfRecentAddedWishItems = '<%=NoOfRecentAddedWishItems%>';
    var ModuleCollapsible = "<%=ModuleCollapsible %>";
    //]]>
</script>

<div class="cssClassLeftSideBox cssClassRecentWishWrapper" id="divRecentlyAddedWishList" style="display: none">
    <div class="cssClassWishItemsHeader">
        <h2 class="cssClassLeftHeader">
            <asp:Label ID="lblRecentAddedWishItemsTitle" runat="server" Text="Recent Wished Items"
                CssClass="cssClassWishItem" meta:resourcekey="lblRecentAddedWishItemsTitleResource1"></asp:Label></h2>
    </div>
    <div id="wishItem">
        <asp:Literal ID="ltrWishItem" runat="server" EnableViewState="False"></asp:Literal>
    </div>
</div>
