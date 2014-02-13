<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemCompareDetails.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxItemsCompare_ItemCompareDetails" %>

<script type="text/javascript" language="javascript">
    //<![CDATA[
    $(window).load(function() {

        $(".sfLocale").localize({
            moduleKey: AspxItemsCompare
        });
    });
    var storeId, portalId, userName, cultureName, customerId, ip, countryName, sessionCode, userFriendlyURL, aspxCommonObj;

    var IDs = "";
    var costVar = "";
    $(document).ready(function() {
        storeId = AspxCommerce.utils.GetStoreID();
        portalId = AspxCommerce.utils.GetPortalID();
        userName = AspxCommerce.utils.GetUserName();
        cultureName = AspxCommerce.utils.GetCultureName();
        customerId = AspxCommerce.utils.GetCustomerID();
        ip = AspxCommerce.utils.GetClientIP();
        countryName = AspxCommerce.utils.GetAspxClientCoutry();
        sessionCode = AspxCommerce.utils.GetSessionCode();
        userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
        aspxCommonObj = {
            StoreID: storeId,
            PortalID: portalId,
            UserName: userName,
            CultureName: cultureName
        };
        IDs = $.cookies.get("ItemCompareDetail");
        costVar = $.cookies.get("costVariant");
        if (IDs != null && IDs != '') {
            GetCompareListImage(IDs, costVar);
            GetCompareList(IDs, costVar);
            RecentAdd(IDs, costVar);
        } else {
            $("#divCompareElementsPopUP").html('<span class="cssClassNotFound">' + getLocale(AspxItemsCompare, 'No Items found in you Compare Item List.') + '</span>');
        }
        if ($("#tblRecentlyComparedItemList").length > 0) {
            RecentlyComparedItems.RecentlyCompareItemsList();
        }
        $('#btnPrintItemCompare').click(function() {
            printPage();
        });
    });
    printPage = function() {
        window.print();
    };
    function GetCompareList(IDs, costVar) {
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/GetCompareList",
            data: JSON2.stringify({ itemIDs: IDs, CostVariantValueIDs: costVar, aspxCommonObj: aspxCommonObj }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function(msg) {
                var myIds = new Array();
                var myAttributes = new Array();
                $("#tblItemCompareList >tbody").html('');
                $("#divItemCompareElements").html("");
                $("#scriptStaticField").tmpl().appendTo("#divItemCompareElements");
                Array.prototype.RemoveNA = function(arr, obj) {
                    var i = this.length;
                    while (i--) {//alert(i);
                        if (this[i].AttributeID === obj) {
                            arr.splice(i, 1);
                        }
                    }
                };
                Array.prototype.Count = function(obj) {
                    var i = this.length;
                    var cc = 0;
                    while (i--) {
                        if (this[i] === obj) {
                            cc++;
                        }
                    }
                    return cc;
                };
                var oldc;
                var itemCount;
                var emArr = [];
                $.each(msg.d, function(index, value) {

                    if (index == 0) {
                        oldc = value.AttributeID; itemCount = 1;
                    }
                    if (index != 0 && value.AttributeID == oldc) {
                        itemCount++;
                    }
                    if (value.AttributeValue == "") {
                        emArr.push(value.AttributeID);
                    }
                });
                $.each(emArr, function(index, value) {

                    if (itemCount == emArr.Count(value)) {
                        msg.d.RemoveNA(msg.d, value);
                    }
                });

                $.each(msg.d, function(index, value) {
                    var cssClass = '';
                    var noAttValue = [];
                    cssClass = 'cssClassCompareAttributeClass';
                    var pattern = '"', re = new RegExp(pattern, "g");
                    if (value.InputTypeID == 7) {
                        cssClass = 'cssClassFormatCurrency cssClassCompareAttributeClass';
                    }
                    if (jQuery.inArray(value.AttributeID, myAttributes) < 0) {
                        $("#tblItemCompareList >tbody").append('<tr id="trCompare_' + index + '"></tr>');
                        if (value.AttributeName == 'Variants') {
                            value.AttributeName = getLocale(AspxItemsCompare, "Variants");
                        }
                        $("#tblItemCompareList >tbody> tr:last").append('<td class="' + cssClass + '"><span class="cssClassLabel">' + value.AttributeName + ': </span></td>');
                        var valz;
                        if (value.AttributeValue == "") {
                            valz = "n/a"; noAttValue.push(value.AttributeID);
                        } else {
                            if (value.InputTypeID == 7) {
                                valz = (value.AttributeValue * rate).toFixed(2);
                            }
                            else {
                                valz = value.AttributeValue;
                            }
                        }
                        var y = Encoder.htmlDecode(valz);
                        y = y.replace(re, '\\');
                        var attributValue = [{ CssClass: cssClass, AttributeValue: y}];
                        $("#scriptAttributeValue").tmpl(attributValue).appendTo("#tblItemCompareList tbody#itemDetailBody>tr:last");

                        myAttributes.push(value.AttributeID);
                    }
                    else {
                        var valz1;
                        if (value.AttributeValue == "") {
                            valz1 = "n/a";
                        } else {
                            if (value.InputTypeID == 7) {
                                valz1 = (value.AttributeValue * rate).toFixed(2);
                            }
                            else {
                                valz1 = value.AttributeValue;
                            }
                        }
                        var z = Encoder.htmlDecode(valz1);
                        z = z.replace(re, '\\');
                        var i = index % (myAttributes.length);
                        attributValue = [{ CssClass: cssClass, AttributeValue: z}]; //{{html shortDescription}}

                        $("#scriptAttributeValue").tmpl(attributValue).appendTo("#trCompare_" + i + "");
                    }
                });
                $("#tblItemCompareList tr:even").addClass("sfEven");
                $("#tblItemCompareList tr:odd").addClass("sfOdd");
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            },
            error: function() {
                csscody.error('<h2>' + getLocale(AspxItemsCompare, 'Error Message') + '</h2><p>' + getLocale(AspxItemsCompare, 'Sorry, Compare list error occured!') + '</p>');
            }
        });
    }

    function RecentAdd(Id, costVar) {
        var param = JSON2.stringify({ IDs: Id, CostVarinatIds: costVar, aspxCommonObj: aspxCommonObj });
        $.ajax({
            type: "Post",
            url: aspxservicePath + "AspxCommerceWebService.asmx/AddComparedItems",
            data: param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function() {
            },
            error: function() {
                csscody.error('<h2>' + getLocale(AspxItemsCompare, 'Error Message') + '</h2><p>' + getLocale(AspxItemsCompare, 'Sorry, error occured!') + '</p>');
            }
        });
    }

    function GetCompareListImage(IDs, costVar) {
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/GetCompareListImage",
            data: JSON2.stringify({ itemIDs: IDs, CostVariantValueIDs: costVar, aspxCommonObj: aspxCommonObj }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function(msg) {
                var htMl = '';
                $("#divCompareElements").html("");
                //  $("#scriptStaticField").tmpl().appendTo("#divCompareElements");
                $.each(msg.d, function(index, value) {
                    var imagePath = itemImagePath + value.BaseImage;
                    if (value.BaseImage == "") {
                        imagePath = '<%=NoImageItemComparePath %>';
                    }
                    else if (value.AlternateText == "") {
                        value.AlternateText = value.Name;
                    }
                    var items = [{ aspxRedirectPath: aspxRedirectPath, itemID: value.ItemID, CostVariant: value.CostVariantItemID, index: index, name: value.Name, sku: value.SKU,
                        imagePath: aspxRootPath + imagePath.replace('uploads', 'uploads/Small'), alternateText: value.AlternateText, listPrice: value.ListPrice,
                        price: value.Price, shortDescription: Encoder.htmlDecode(value.ShortDescription)}];
                        $("#scriptResultProductGrid2").tmpl(items).appendTo("#tblItemCompareList thead > tr");
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        if (value.ListPrice == "") {
                            $(".cssRegularPrice_" + value.ItemID + "").html('');
                        }
                        if ('<%=AllowOutStockPurchase %>'.toLowerCase() == 'false') {
                            if (value.IsOutOfStock) {
                                $(".cssClassAddtoCard_" + value.ItemID + "_" + index + " span").html(getLocale(AspxItemsCompare, 'Out Of Stock'));
                                $(".cssClassAddtoCard_" + value.ItemID + "_" + index).removeClass('cssClassAddtoCard');
                                $(".cssClassAddtoCard_" + value.ItemID + "_" + index).addClass('cssClassOutOfStock');
                                $(".cssClassAddtoCard_" + value.ItemID + "_" + index + " a").removeAttr('onclick');
                            }
                        }
                        if (value.CostVariantItemID != '0') {
                            var href = AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + value.SKU + pageExtension + '?varId=' + value.CostVariantItemID + '';
                            $(".cssClassAddtoCard_" + value.ItemID + "_" + index).find('a').attr('href', href);
                        }

                    });
                },
                error: function() {
                    csscody.error('<h2>' + getLocale(AspxItemsCompare, 'Error Message') + '</h2><p>' + getLocale(AspxItemsCompare, 'Sorry, compare list error occured!') + '</p>');
                }
            });
        }

        function CheckWishListUniqueness(itemID, sku, CostVariant) {
            if (customerId > 0 && userName.toLowerCase() != "anonymoususer") {
                if (CostVariant == '0') {
                    CostVariant = "";
                }
                var checkparam = { ID: itemID, costVariantValueIDs: CostVariant, aspxCommonObj: aspxCommonObj };
                var checkdata = JSON2.stringify(checkparam);
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/CheckWishItems",
                    data: checkdata,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        if (msg.d) {
                            csscody.alert('<h2>' + getLocale(AspxItemsCompare, 'Information Alert') + '</h2><p>' + getLocale(AspxItemsCompare, 'The selected item already in your wishlist.') + '</p>');
                        } else {
                            AspxCommerce.RootFunction.AddToWishListFromJS(itemID, ip, countryName, CostVariant);
                        }
                    }
                });

            } else {
                window.location.href = aspxRootPath + LogInURL + pageExtension;
                return false;
            }
        }

        function AddToCartToJSs(itemId, itemPrice, itemSKU, itemQuantity) {
            AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity, storeId, portalId, customerId, sessionCode, userName, cultureName);
        }

        //]]>      
</script>

<script id="scriptStaticField" type="text/x-jquery-tmpl">
</script>

<script id="scriptAttributeValue" type="txt/x-jquery-tmpl">
<td class="${CssClass}">{{html AttributeValue}}</td>
</script>

<script id="scriptResultProductGrid2" type="text/x-jquery-tmpl">                        
 <td>
 <div id="comparePride" class="cssClassProductsGridBox">
 <div class="cssClassProductsGridInfo">
 <h2><a href="${aspxRedirectPath}item/${sku}${pageExtension}">${name}</a></h2>
 <div class="cssClassProductsGridPicture"><img src='${imagePath}' alt='${alternateText}' title='${name}' /></div>
 <div class="cssClassProductsGridPriceBox">
 <div class="cssClassProductsGridPrice">
 <p class="cssClassProductsGridOffPrice"><span class="cssRegularPrice_${itemID} sfLocale">Price :</span><del><span class="cssRegularPrice_${itemID} cssClassFormatCurrency">${(listPrice*rate).toFixed(2)}</span></del> <br/><span class="cssClassProductsGridRealPrice"> <span class="cssClassFormatCurrency">${(price*rate).toFixed(2)}</span></span> </p>
 </div>
 </div>

 <div id="compareAddToWishlist" class="sfButtonwrapper">
 <div class="cssClassWishListButton">
 <button onclick="CheckWishListUniqueness(${itemID},${JSON2.stringify(sku)},${JSON2.stringify(CostVariant)});" id="addWishList" type="button"><span class="sfLocale">+ Add to Wishlist</span></button>
 </div>
 </div>
 <div id="compareAddToCart" class="cssClassAddtoCard_${itemID}_${index} cssClassAddtoCard">
 <div class="sfButtonwrapper"> 
<a href="#" onclick="AspxCommerce.RootFunction.AddToCartToJSFromTemplate(${itemID},${price},${JSON2.stringify(sku)},${1});"><span class="sfLocale">Add to Cart</span></a> </div>
</div>
<div class="cssClassclear"></div>
</div>
 </div>
 </td>
</script>

<div id="divItemCompareElements" class="sfFormwrapper">
</div>
<div id="dvCompareList" class="cssClassCommonBox cssClassCompareBox">
    <div class="cssClassHeader">
        <h2>
            <asp:Label ID="lblCompareTitle" runat="server" class="cssClassCompareItem" Text="Compare following Items"
                meta:resourcekey="lblCompareTitleResource1"></asp:Label>
        </h2>
        <div class="cssClassHeaderRight">
            <div class="sfButtonwrapper">
                <p>
                    <button type="button" id="btnPrintItemCompare">
                        <span><span class="sfLocale">Print</span></span></button>
                </p>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
    <div id="divCompareElementsPopUP" class="sfFormwrapper">
        <table id="tblItemCompareList" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <td>
                    </td>
                </tr>
            </thead>
            <tbody id="itemDetailBody">
                <tr>
                </tr>
            </tbody>
        </table>
    </div>
</div>
