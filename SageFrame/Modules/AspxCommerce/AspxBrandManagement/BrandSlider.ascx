<%@ Control Language="C#" AutoEventWireup="true" CodeFile="BrandSlider.ascx.cs" Inherits="Modules_AspxCommerce_AspxBrandManagement_BrandSlider" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: Brand
        });
    });
    var rssFeedUrl = '<%=RssFeedUrl %>';
    var brandRss = '<%=BrandRss %>';
</script>

<div class="cssClassCommonSideBox cssClassBrandWrapper">
    <h2 class="cssClassMiddleHeader">
        <span id="lblBrands" class="sfLocale">Popular Brands</span>
         <a href="#" class="cssRssImage" style="display: none">
            <img id="frontBrandRssImage" alt="" src="" title="" />
        </a>
    </h2>
    <div id='slide'>
        <asp:Literal id="litSlide" runat="server" EnableViewState="False" 
            meta:resourcekey="litSlideResource1"></asp:Literal>
    </div>
</div>
<div class="cssClassClear">
</div>
