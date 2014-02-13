<%@ Control Language="C#" AutoEventWireup="true" CodeFile="YouMayAlsoLike.ascx.cs"
    Inherits="Modules_AspxYouMayAlsoLike_YouMayAlsoLike" %>
<script type="text/javascript">
    //<![CDATA[
    var YouMayAlsoLike;
    $(function() {

        $(".sfLocale").localize({
            moduleKey: AspxYouMayAlsoLike
        });

        var storeId = AspxCommerce.utils.GetStoreID();
        var portalId = AspxCommerce.utils.GetPortalID();
        var userName = AspxCommerce.utils.GetUserName();
        var cultureName = AspxCommerce.utils.GetCultureName();
        var customerId = AspxCommerce.utils.GetCustomerID();
        var ip = AspxCommerce.utils.GetClientIP();
        var countryName = AspxCommerce.utils.GetAspxClientCoutry();
        var sessionCode = AspxCommerce.utils.GetSessionCode();
        var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
        var relatedItemCount = '<%=NoOfYouMayAlsoLikeItems%>';
        var RelatedUpSellCrossSellItems = '';
        var aspxCommonObj = {
            StoreID: storeId,
            PortalID: portalId,
            UserName: userName,
            CultureName: cultureName,
            CustomerID: customerId,
            SessionCode: sessionCode
        };
        YouMayAlsoLike = {
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
                ajaxCallMode: ""
            },

            ajaxCall: function(config) {
                $.ajax({
                    type: YouMayAlsoLike.config.type,
                    contentType: YouMayAlsoLike.config.contentType,
                    cache: YouMayAlsoLike.config.cache,
                    async: YouMayAlsoLike.config.async,
                    data: YouMayAlsoLike.config.data,
                    dataType: YouMayAlsoLike.config.dataType,
                    url: YouMayAlsoLike.config.url,
                    success: YouMayAlsoLike.config.ajaxCallMode,
                    error: YouMayAlsoLike.ajaxFailure
                });
            },

            init: function() {
                $("#divRelatedItems").hide();
                if ('<%=EnableYouMayAlsoLike%>'.toLowerCase() == 'true' && eval(relatedItemCount) > 0) {
                    //YouMayAlsoLike.GetItemRetatedUpSellAndCrossSellList();
                    $("#divRelatedItems").show();
                    $('.cssClassYouMayAlsoLikeBox a img[title]').tipsy({ gravity: 'n' });
                }
            },

            GetItemRetatedUpSellAndCrossSellList: function() {
                RelatedUpSellCrossSellItems = '';
                var url = window.location.href;
                var itemSku = null;
                if (url.indexOf('item')) {
                    itemSku = url.substring(url.lastIndexOf('/'));
                    itemSku = itemSku.substring(1, (itemSku.lastIndexOf('.')));
                }
                this.config.url = this.config.baseURL + "GetYouMayAlsoLikeItems";
                this.config.data = JSON2.stringify({ itemSKU: itemSku, aspxCommonObj: aspxCommonObj, count: relatedItemCount });
                this.config.ajaxCallMode = YouMayAlsoLike.BindRelatedItemsByCartItems;
                this.ajaxCall(this.config);
            },

            AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity) {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity, storeId, portalId, customerId, sessionCode, userName, cultureName);
            },

            BindRelatedItemsByCartItems: function(msg) {
                if (msg.d.length > 0) {
                    $.each(msg.d, function(index, item) {
                        var imagePath = itemImagePath + item.BaseImage;
                        if (item.BaseImage == "") {
                            imagePath = '<%=NoImageYouMayAlsoLikePath %>';
                        }
                        if (item.AlternateText == "") {
                            item.AlternateText = item.Name;
                        }
                        if ((index + 1) % 4 == 0) {
                            RelatedUpSellCrossSellItems += "<div class=\"cssClassYouMayAlsoLikeBox cssClassYouMayAlsoLikeBoxFourth\">";
                        }
                        else {
                            RelatedUpSellCrossSellItems += "<div class=\"cssClassYouMayAlsoLikeBox\">";
                        }
                        RelatedUpSellCrossSellItems += '<p class="cssClassCartPicture"><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '"><img alt="' + item.AlternateText + '" title="' + item.Name + '" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '"></a></p>';
                        RelatedUpSellCrossSellItems += '<p class="cssClassProductRealPrice"><span class="cssClassFormatCurrency">Price : ' + (parseFloat(item.Price) * rate).toFixed(2) + '</span></p>';
                        if ('<%=AllowOutStockPurchase %>'.toLowerCase() == 'false') {
                            if (item.IsOutOfStock) {
                                RelatedUpSellCrossSellItems += "<div class='sfButtonwrapper cssClassOutOfStock'><a href='#'><span>" + getLocale(AspxYouMayAlsoLike, "Out Of Stock") + "</span></a></div></div>";
                            }
                            else {
                                RelatedUpSellCrossSellItems += "<div class='sfButtonwrapper'><a href='#' onclick='YouMayAlsoLike.AddToCartToJS(" + item.ItemID + "," + item.Price + "," + JSON2.stringify(item.SKU) + "," + 1 + ");'><span>" + getLocale(AspxYouMayAlsoLike, "Add to Cart") + "</span></a></div></div>";
                            }
                        }
                        else {

                            RelatedUpSellCrossSellItems += "<div class='sfButtonwrapper'><a href='#' onclick='YouMayAlsoLike.AddToCartToJS(" + item.ItemID + "," + item.Price + "," + JSON2.stringify(item.SKU) + "," + 1 + ");'><span>" + getLocale(AspxYouMayAlsoLike, "Add to Cart") + "</span></a></div></div>";
                        }
                    });
                    RelatedUpSellCrossSellItems += "<div class=\"cssClassClear\"></div>";
                    $("#divYouMayAlsoLike").html(RelatedUpSellCrossSellItems);
                    $('.cssClassYouMayAlsoLikeBox a img[title]').tipsy({ gravity: 'n' });
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                }
                else {
                    $("#divYouMayAlsoLike").html("<span class=\"cssClassNotFound\">" + getLocale(AspxYouMayAlsoLike, "No Data found.") + "</span>");
                }
            }

        };

        YouMayAlsoLike.init();
    });
    //]]>
</script>
<div id="divRelatedItems" class="cssClassProductDetailInformation cssClassYouMayAlsoLike"
    style="display: none">
    <h2>
        <asp:Label ID="lblYouMayAlsoLike" Text="You may also like:" runat="server" meta:resourcekey="lblYouMayAlsoLikeResource1" />
    </h2>
    <div class="cssClassYouMayAlsoLikeWrapper " id="divYouMayAlsoLike">
        <asp:Literal ID="ltrRelatedItemInCart" runat="server" EnableViewState="false"></asp:Literal>
    </div>
</div>
