<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GiftCardsAll.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxGiftCard_GiftCardsAll" %>

<script type="text/javascript">
 //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGiftCard
        });
    });
    var GiftCardsAll = "";
    $(function() {
        var noOfGiftCardsAll = '<%=NoOfGiftCardsAll %>';
        var noOfGiftCardsAllInARow = '<%=NoOfItemsInARow%>';
        var allowWishListLatestItem = '<%=AllowWishListLatestItem %>';
        var allowAddToCompareLatest = '<%=AllowAddToCompareLatest %>';
        var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
        var defaultImagePath = '<%=DefaultImagePath %>';
        var ip = AspxCommerce.utils.GetClientIP();
        var countryName = AspxCommerce.utils.GetAspxClientCoutry();
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName(),                
                CustomerID: AspxCommerce.utils.GetCustomerID()
            };
            return aspxCommonInfo;
        };
        GiftCardsAll = {
            config: {
                isPostBack: false,
                async: true,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath,
                method: "",
                url: "",
                ajaxCallMode: "",
                itemid:0
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: GiftCardsAll.config.type,
                    contentType: GiftCardsAll.config.contentType,
                    cache: GiftCardsAll.config.cache,
                    async: GiftCardsAll.config.async,
                    url: GiftCardsAll.config.url,
                    data: GiftCardsAll.config.data,
                    dataType: GiftCardsAll.config.dataType,
                    success: GiftCardsAll.config.ajaxCallMode,
                    error: GiftCardsAll.ajaxFailure
                });
            },
            GetAllGiftCards: function() {
                this.config.method = "AspxCommerceWebService.asmx/GetAllGiftCards";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = GiftCardsAll.BindAllGiftCards;
                this.config.async = true;
                this.ajaxCall(this.config);
            },
            BindAllGiftCards: function(msg) {
                var GiftItemContents = '';
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
                            altImagePath = imagePath;
                        }
                        if ((index + 1) % eval(noOfGiftCardsAllInARow) == 0) {
                            GiftItemContents += "<div class=\"cssClassProductsBox cssClassNoMargin\">";
                        } else {
                            GiftItemContents += "<div class=\"cssClassProductsBox\">";
                        }

                        var hrefItem = aspxRedirectPath + "item/" + GiftCardsAll.fixedEncodeURIComponent(item.SKU) + pageExtension;
                        GiftItemContents += '<div id="productImageWrapID_' + item.ItemID + '" class="cssClassProductsBoxInfo" costvariantItem=' + item.IsCostVariantItem + ' itemid="' + item.ItemID + '"><div id="divQuickLookonHover"><div id="divitemImage" class="cssClassProductPicture"><a href="' + hrefItem + '" ><img id="img_' + item.ItemID + '"  alt="' + item.AlternateText + '"  title="' + item.AlternateText + '" data-original="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/loader_100x12.gif" src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Medium') + '"></a><div class="cssClassProductTitle">' + item.Name + '</div></div>';

                        if (!item.HidePrice) {
                            if (item.ListPrice != null) {
                                // GiftItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductOffPrice\"><span class=\"cssClassFormatCurrency\" value=" + (item.ListPrice).toFixed(2) + ">" + (item.ListPrice * rate).toFixed(2) + "</span></p><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                                //CHANGE FOR DEMO
                                GiftItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";

                            } else {
                                GiftItemContents += "<div class=\"cssClassProductPriceBox\"><div class=\"cssClassProductPrice\"><p class=\"cssClassProductRealPrice \" ><span class=\"cssClassFormatCurrency\" value=" + (item.Price).toFixed(2) + ">" + (item.Price * rate).toFixed(2) + "</span></p></div></div>";
                            }
                        } else {
                            GiftItemContents += "<div class=\"cssClassProductPriceBox\"></div>";
                        }
                        //UNWANTED
                        // GiftItemContents += '<div class="cssClassProductDetail"><p><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '" onclick="AjaxLoader()">' + getLocale(AspxGiftCard, "Details") + '</a></p></div>';
                        GiftItemContents += '<div class="sfQuickLook" style="display:none"><img itemId="' + item.ItemID + '" sku="' + item.SKU + '" src="' + AspxCommerce.utils.GetAspxTemplateFolderPath() + '/images/QV_Button.png" rel="popuprel"/></div></div>';
                        GiftItemContents += "<div class='sfProductButtonWrapper'><div class=\"sfButtonwrapper\">";
                        if (allowWishListLatestItem.toLowerCase() == 'true') {
                            if (aspxCommonObj().CustomerID > 0 && aspxCommonObj().UserName.toLowerCase() != "anonymoususer") {

                                // GiftItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='GiftCardsAll.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span><span><span>+</span>" + getLocale(AspxGiftCard, "Wishlist") + "</span></span></button></div>";
                                GiftItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" class=\"sfWishButton\" title=\"Add to Wishlist\" onclick='GiftCardsAll.CheckWishListUniqueness(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'> </button></div>";

                            } else {
                                //  GiftItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" id=\"addWishList\" onclick='AspxCommerce.RootFunction.Login();'><span><span><span>+</span>" + getLocale(AspxGiftCard, "Wishlist") + "</span></span></button></div>";
                                GiftItemContents += "<div class=\"cssClassWishListButton\"><button type=\"button\" class=\"sfWishButton\" title=\"Add to Wishlist\" onclick='AspxCommerce.RootFunction.Login();'></button></div>";
                            }
                        }
                        //GiftItemContents+="<input type=\"button\" id=\"addWishList\" value=\"Add To Wishlist\" onclick='AddToWishList(" + item.ItemID + ");'/>";
                        //GiftItemContents += "<div class=\"cssClassWishListDetail\"><p><a href='addtowishlist.aspx?itemId="+ item.ItemID + "'>Add to Wishlist</a></p>";
                        if (allowAddToCompareLatest.toLowerCase() == 'true') {
                            // GiftItemContents += "<div class=\"cssClassCompareButton\"><input type=\"checkbox\" id=\"compare-" + item.ItemID + "\" onclick='GiftCardsAll.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'><span>" + getLocale(AspxGiftCard, "Compare") + "</span></input></div>";
                            //HERE CHANGE FOR DEMO  REMOVE INPUT
                            GiftItemContents += "<div class=\"cssClassCompareButton\"><button type='button'  id=\"compare-" + item.ItemID + "\" class=\"sfCompareButton\" title=\"Add to Compare\" onclick='GiftCardsAll.AddItemsToCompare(" + item.ItemID + ',' + JSON2.stringify(item.SKU) + ",this);'></button></div>";


                        }
                        GiftItemContents += "</div>";
                        GiftItemContents += "<div class=\"cssClassclear\"></div>";
                        var itemSKU = JSON2.stringify(item.SKU);
                        var itemName = JSON2.stringify(item.Name);
                        if (allowOutStockPurchase.toLowerCase() == 'false') {
                            if (item.IsOutOfStock) {
                                //  GiftItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><a href=\"#\"><span>Out Of Stock</span></a></div></div>";
                                GiftItemContents += "<div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper cssClassOutOfStock\"><button type=\"button\"><span>" + getLocale(AspxGiftCard, "Out Of Stock") + "</span></button></div></div>";
                            } else {
                                // GiftItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><a href=\"#\" title=" + itemName + "  onclick='GiftCardsAll.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span>Add to cart</span></a></div></div>";
                                GiftItemContents += "<div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "   onclick='GiftCardsAll.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxGiftCard, "Add to cart") + "</span></span></button></div></div>";
                            }
                        } else {
                            // GiftItemContents += "</div><div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><a href=\"#\" title=" + itemName + "  onclick='GiftCardsAll.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ");'><span>Add to cart</span></a></div></div>";
                            GiftItemContents += "<div class=\"cssClassAddtoCard\"><div class=\"sfButtonwrapper\"><button type=\"button\" id=\"addtoCart\" title=" + itemName + "  onclick='GiftCardsAll.AddToCartToJS(" + item.ItemID + "," + item.Price.toFixed(2) + "," + itemSKU + "," + 1 + ",this);'><span><span>" + getLocale(AspxGiftCard, "Add to cart") + "</span></span></button></div></div>";
                        }
                        GiftItemContents += "</div></div></div>";


                        // }
                    });

                    //$('#divitemImage img[title]').tipsy();
                } else {
                    GiftItemContents += "<span class=\"cssClassNotFound\">" + getLocale(AspxGiftCard, "This store has no items listed yet!") + "</span>";
                }
                //_ItemID; _DateFrom; _DateTo; _IsFeatured; _SKU; _Name; _Price; _ListPrice; _HidePrice; _HideInRSSFeed; _HideToAnonymous; _AddedOn; _ImagePath; _AlternateText
                $("#" + '<%=divGiftCards.ClientID %>').html(GiftItemContents);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $('#divitemImage a img[title]').tipsy({ gravity: 'n' });
                //            if ($("#" + tblRecentItems).hasClass('masonry')) {
                //                $("#" + tblRecentItems).masonry('destroy');
                //            }
                //            $("#" + tblRecentItems).imagesLoaded(function() {
                //                $("#" + tblRecentItems).masonry({
                //                    itemSelector: '.cssClassProductsBox',
                //                    columnWidth: 35
                //                });
                //            });
            },
            AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToLatestItems(itemSKU);
                } else {
                    AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
                }
            },
            CheckWishListUniqueness: function(itemID, itemSKU, elem) {
                if (Boolean.parse($.trim($(elem).parents("div").find(".cssClassProductsBoxInfo").attr("costvariantItem")))) {
                    AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                } else {
                    this.config.itemid = itemID;
                    var checkparam = { ID: itemID, aspxCommonObj: aspxCommonObj(), costVariantValueIDs: costVariantValueIDs };
                    var checkdata = JSON2.stringify(checkparam);
                    this.config.method = "AspxCommerceWebService.asmx/CheckWishItems",
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = checkdata;
                    this.config.async = true;
                    this.config.ajaxCallMode = GiftCardsAll.CheckAddToWishItems;
                    this.ajaxCall(this.config);
                }
            },
            CheckAddToWishItems: function(data) {
                if (data.d) {
                    csscody.alert('<h2>' + getLocale(AspxGiftCard, 'Information Alert') + '</h2><p>' + getLocale(AspxGiftCard, 'The selected item already exist in your wishlist.') + '</p>');
                } else {
                    AspxCommerce.RootFunction.AddToWishListFromJS(GiftCardsAll.config.itemid, ip, countryName, costVariantValueIDs); // AddToList ==> AddToWishList
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

            fixedEncodeURIComponent: function(str) {
                return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/-/g, '_').replace(/\*/g, '%2A').replace(/%26/g, 'ampersand').replace(/%20/g, '-');
            },

            init: function() {
                $(document).ready(function() {
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    //GiftCardsAll.GetAllGiftCards();
                    $('#divitemImage a img[title]').tipsy({ gravity: 'n' });
                });
            }
        };
        GiftCardsAll.init();
    });
  //]]>  
</script>

<div class="cssGiftCardContainer">
    <h2 class="cssClassMiddleHeader">
       <span class="sfLocale">Gift Cards</span></h2>
    <div id="divGiftCards" runat="server" enableviewstate="false">
    </div>
</div>
