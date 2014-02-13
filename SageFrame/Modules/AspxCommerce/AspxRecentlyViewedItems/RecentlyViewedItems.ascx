<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RecentlyViewedItems.ascx.cs"
    Inherits="Modules_AspxRecentlyViewedItems_RecentlyViewedItems" %>

<script type="text/javascript">
    //<![CDATA[    
    $(function()
    {
         $(".sfLocale").localize({
                moduleKey:AspxRecentlyViewedItems
            });
    });
     var defaultImagePath = '<%=DefaultImagePath %>';
    var recentlyViewedCounts = '<%=CountViewedItems %>';
    var enableRecentlyViewed = '<%=EnableRecentlyViewed%>';
    var basePath = '<%=basePath %>';
       //]]>              
</script>

<div id="divRecentViewedItems" class="cssClassCommonSideBox cssClassrecentlyviewed" >
    <h2 class="cssClassMiddleHeader">
        <asp:Label ID="lblRecentlyViewedItems" Text="Recently Viewed Items" 
            runat="server" CssClass="cssClassRecentlyViewedItems" 
            meta:resourcekey="lblRecentlyViewedItemsResource1" /></h2>
    <div class="cssClassCommonSideBoxTable">
        <asp:Literal id="litRVItems" runat="server" EnableViewState="false"></asp:Literal>
    </div>
    <span id="divViewMoreRecently" class="cssClassViewMore" runat="server" enableviewstate="false"></span>
</div>
