<%@ Control Language="C#" AutoEventWireup="true" CodeFile="BestSellers.ascx.cs" Inherits="Modules_AspxBestSellers_BestSellers" %>

<script type="text/javascript">
    //<![CDATA[
    var enableBestSellerItems = '<%=EnableBestSellerItems %>';
    var countBestSellerSetting = eval('<%=CountBestSeller %>');
    var defaultImagePath = '<%=DefaultImagePath %>';
    var basePath = '<%=basePath %>';
    var bestSellItemRss = '<%=BestSellItemRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    $(function()
    {
        $(".sfLocale").localize({
            moduleKey:AspxBestSellers
        });
    });
    //]]>
</script>

<div id="divBestSellers" class="cssClassBestSeller cssClassBestSellerMargin">
    <h2 class="cssClassMiddleHeader">
        <span class="sfLocale">Best Seller Items</span>
        <a href="#" class="cssRssImage" style="display: none">
            <img id="bestSellerRssImage" alt="" src="" title=""/>
        </a>
    </h2>
    <div class="cssClassBestSellerBox">
        <div class="cssClassBestSellerBoxInfo" id="divBSItem" runat="server" enableviewstate="false">
            <ul>
                <li></li>
            </ul>
        </div>
        <div class="cssClassclear">
        </div>
    </div>  <span id="divViewMoreBestSeller" class="cssClassViewMore" runat="server" enableviewstate="false"></span>
</div>
