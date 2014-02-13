<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PromoItemsView.ascx.cs" Inherits="Modules_AspxCommerce_AspxPromoCodes_PromoItemsView" %>
<script type="text/javascript">
     //<![CDATA[
    var PromoCodeItems = "";
    var url = window.location.href;
    var promoCodeId = url.substring(url.indexOf('id=') + 3);    
    var defaultImagePath = '<%=DefaultImagePath %>';
    var allowWishListLatestItem = '<%=AllowWishListLatestItem %>';
    var allowAddToCompareLatest = '<%=AllowAddToCompareLatest %>';
    var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
    var AspxCommonObj = function() {
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            UserName: AspxCommerce.utils.GetUserName(),
            CustomerID: AspxCommerce.utils.GetCustomerID()
        };
        return aspxCommonObj;
    };
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxPromoCodeView
        });
        PromoCodeItems = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: "json",
                baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                ajaxCallMode: "",
                url: "",
                method: "",
                itemid: 0
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: PromoCodeItems.config.type,
                    contentType: PromoCodeItems.config.contentType,
                    cache: PromoCodeItems.config.cache,
                    async: PromoCodeItems.config.async,
                    data: PromoCodeItems.config.data,
                    dataType: PromoCodeItems.config.dataType,
                    url: PromoCodeItems.config.url,
                    success: PromoCodeItems.config.ajaxCallMode,
                    error: PromoCodeItems.ajaxFailure
                });
            },
            fixedEncodeURIComponent: function(str) {
                return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
            },
            AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                } else {
                    AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
                }
            },
            CheckWishListUniqueness: function(itemID, itemSKU, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                } else {
                    this.config.itemid = itemID;
                    var checkparam = { ID: itemID, aspxCommonObj: aspxCommonObj, costVariantValueIDs: costVariantValueIDs };
                    var checkdata = JSON2.stringify(checkparam);
                    //this.config.method = "AspxCommerceWebService.asmx/CheckWishItems",
                    this.config.url = this.config.baseURL + "CheckWishItems";
                    this.config.data = checkdata;
                    this.config.async = true;
                    this.config.ajaxCallMode = PromoCodeItems.CheckAddToWishItems;
                    this.ajaxCall(this.config);
                }
            },
            CheckAddToWishItems: function(data) {
                if (data.d) {
                    csscody.alert('<h2>' + getLocale(AspxGiftCard, 'Information Alert') + '</h2><p>' + getLocale(AspxGiftCard, 'The selected item already exist in your wishlist.') + '</p>');
                } else {
                    AspxCommerce.RootFunction.AddToWishListFromJS(PromoCodeItems.config.itemid, ip, countryName, costVariantValueIDs); // AddToList ==> AddToWishList
                }
            },
            AddItemsToCompare: function(itemId, itemSKU, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                } else {
                    var costVariantIds = '0';
                    ItemsCompare.AddToCompare(itemId, costVariantIds);
                }
            },
            GetPromoCodeItemsForView: function() {
                this.config.url = this.config.baseURL + "GetPromoCodeItemsForView";
                this.config.data = JSON2.stringify({ couponId: promoCodeId, aspxCommonObj: AspxCommonObj() });
                this.config.ajaxCallMode = PromoCodeItems.BindPromoCodeItems;
                this.ajaxCall(this.config);
            },
            BindPromoCodeItems: function(msg) {
                $("#divPromoItems").html('');
                var html = '';
                if (msg.d.length > 0) {
                    $.each(msg.d, function(index, item) {
                        var imagePath = itemImagePath + item.ImagePath;
                        var altImagePath = itemImagePath + item.AlternateImagePath;
                        if (item.ImagePath == "") {
                            imagePath = defaultImagePath;
                        }
                        if (item.AlternateText == "") {
                            item.AlternateText = item.Name;
                        }
                        if (item.AlternateImagePath == "") {
                            altImagePath = item.ImagePath;
                        }
                        if ((index + 1) % eval(4) == 0) {
                            html += "<div class=\"cssClassProductsBox cssClassProductsBoxNoMargin\">";
                        } else {
                            html += "<div class=\"cssClassProductsBox\">";
                        }
                        var hrefItem = aspxRedirectPath + "item/" + PromoCodeItems.fixedEncodeURIComponent(item.SKU) + pageExtension;
                         var name = '';
                        if (item.Name.length > 50) {
                            name = item.Name.substring(0, 50);
                            var i = 0;
                            i = name.lastIndexOf(' ');
                            name = name.substring(0, i);
                            name = name + "...";
                        } else {
                            name = item.Name;
                        }
                        html += '<div id="productImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + '  itemid="' + item.ItemID + '" title="'+item.Name+'"><h2>' + name + '</h2><h3>' + item.SKU + '</h3><div id="divitemImage" class="cssClassProductPicture"><a href="' + hrefItem + '" ><img id="' + item.ItemID + '"  alt="' + item.AlternateText + '"  title="' + item.AlternateText + '" data-original="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/loader_100x12.gif" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '"></a></div>';

                        if (!item.HidePrice) {
                            if (item.ListPrice != null) {
                                html += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + (item.ListPrice).toFixed(2) + ">" + (item.ListPrice * rate).toFixed(2) + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                            } else {
                                html += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                            }
                        } else {
                            html += "<div class=\"cssClassProductPriceBox\"></div>";
                        }
                        html += '<div class="cssClassProductDetail"><p><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">' + getLocale(AspxPromoCodeView, "Details") + '</a></p></div>';
                        //                        html += '<div class="sfQuickLook" style="display:none"><img itemId="' + item.ItemID + '" sku="' + item.SKU + '" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/QV_Button.png" rel="popuprel"/></div>';

                        var itemSKU = JSON2.stringify(item.SKU);
                        var itemName = JSON2.stringify(item.Name);
                        if (allowOutStockPurchase.toLowerCase() == 'false') {
                            if (item.IsOutOfStock) {
                                html += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxPromoCodeView, "Out Of Stock") + "</span></button></div></div>";
                            } else {
                                html += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "   onclick='PromoCodeItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxPromoCodeView, "Add to cart") + "</span></span></button></div></div>";
                            }
                        } else {
                            html += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "  onclick='PromoCodeItems.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxPromoCodeView, "Add to cart") + "</span></span></button></div></div>";
                        }
                        html += "<div class=\"cssClassclear\"></div>";
                        html += "<div class=\"sfButtonwrapper\">";
                        if (allowWishListLatestItem.toLowerCase() == 'true') {
                            if (AspxCommonObj().CustomerID > 0 && AspxCommonObj().UserName.toLowerCase() != "anonymoususer") {
                                html += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='PromoCodeItems.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxPromoCodeView, "Wishlist") + "</span></span></button></div>";
                            } else {
                                html += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='AspxCommerce.RootFunction.Login();'><span><span><span>+</span>" + getLocale(AspxPromoCodeView, "Wishlist") + "</span></span></button></div>";
                            }
                        }
                        if (allowAddToCompareLatest.toLowerCase() == 'true') {
                            html += "<div class=\"cssClassCompareButton\"><button type=\"button\" id=\"btnAddCompare\" onclick='PromoCodeItems.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxPromoCodeView, "Compare") + "</span></span></button></div>";
                        }
                        html += "</div>";
                        html += "</div>";
                    });

                } else {
                    html += "<span class=\"cssClassNotFound\">" + getLocale(AspxPromoCodeView, "This store has no items listed yet!") + "</span>";
                }
                $("#divPromoItems").append(html);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $('#divitemImage a img[title]').tipsy({ gravity: 'n' });
            },
            init: function() {
                PromoCodeItems.GetPromoCodeItemsForView();
            }
        },
        PromoCodeItems.init();
    });
 //]]>
</script>

<div id="divPromoItems">
</div>
