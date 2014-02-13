<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LatestItemsCarousel.ascx.cs" Inherits="Modules_AspxCommerce_AspxLatestItems_LatestItemsCarousel" %>
<script type="text/javascript">

  $(function()
    {
         $(".sfLocale").localize({
                moduleKey:AspxLatestItem
         });
    });
    var countryName = '<%=CountryName %>';
    var defaultImagePath = '<%=DefaultImagePath %>';
    var noOfLatestItems = '<%=NoOfLatestItems %>';
    var noOfLatestItemsInARow = '<%=NoOfLatestItemsInARow%>';
    var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
    var enableLatestItems = '<%=EnableLatestItems %>';
</script>

<div id="divlatestItemsNew" class="cssClassCommonSideBox" style="display: none">
    <h2 class="cssClassMiddleHeader">
        <asp:Label ID="lblLatestItemHeading" runat="server" class="cssClassLatestItems" 
            Text="New Arrivals" meta:resourcekey="lblLatestItemHeadingResource1"></asp:Label>
             <a class="cssRssImage" href="#" style="display: none">
            <img id="latestItemCarouselRssImage" alt="" src="" title="" />
        </a>
    </h2>
    <div class="cssClassClear">
    </div>
    <div class="test">
        <ul id="divLatestItemTemp" class="cssClassLatestItems sfHorizontalbx-wrapper">
            <li></li>
            <asp:Literal ID="ltrLatestItemCarousel" runat="server" EnableViewState="False"></asp:Literal>
        </ul>
    </div>
</div>

<%--<script id="scriptResultGrid" type="text/x-jquery-tmpl">
  <li class="cssClassLatestItemList">
        <div class="cssClassProductsBox">
            <div class="cssClassProductsBoxInfo">
                               
                <div class="cssClassProductPicture">
                    <a href="${aspxRedirectPath}item/${sku}${pageExtension}">
                        <img class="lazy" src='${imagePath}' alt='${alternateText}' title='${name}' /></a>                                                
                        </div>
                        <div class="cssClassDiscountPrice"><span > ${discountOffer}</span></div>
                        <h2>
                    ${name}</h2> 
                <div class="cssClassProductPriceBox">
                    <div class="cssClassProductPrice">
                        <p class="cssClassProductOffPrice">
                             <span class="cssRegularPrice cssClassFormatCurrency">${listPrice}</span></p>
                        <p class="cssClassProductRealPrice">
                            <span class="cssOfferPrice cssClassFormatCurrency">${price}</span></p>
                    </div>
                </div>              
                <div class="cssClassclear">
                </div>
                 <div class="cssClassAddtoCard_${itemID} cssClassAddtoCard">
                <div class="sfButtonwrapper">
                    <button type="button" onclick="AspxCommerce.RootFunction.AddToCartToJSFromTemplate(${itemID},${(price/rate).toFixed(2)},${JSON2.stringify(sku)},${1});">
                        <span>Add to Cart</span></button>
                </div>
            </div>
            </div>
           
        </div>
    </li> 
</script>--%>