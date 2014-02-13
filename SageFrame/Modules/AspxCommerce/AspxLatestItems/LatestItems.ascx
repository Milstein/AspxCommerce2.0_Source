<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LatestItems.ascx.cs" Inherits="Modules_AspxLatestItems_LatestItems" %>

<script type="text/javascript">

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxLatestItem
        });
    });
    var UsrModuleID = '<%=UserModuleID %>';
    var countryName = '<%=CountryName %>';
    var defaultImagePath = '<%=DefaultImagePath %>';
    var noOfLatestItems = '<%=NoOfLatestItems %>';
    var noOfLatestItemsInARow = '<%=NoOfLatestItemsInARow%>';
    var allowWishListLatestItem = '<%=AllowWishListLatestItem %>';
    var allowAddToCompareLatest = '<%=AllowAddToCompareLatest %>';
    var allowOutStockPurchase = '<%=AllowOutStockPurchase %>';
    var maxCompareItemCount = '<%=MaxCompareItemCount%>';
    var enableLatestItems = '<%=EnableLatestItems %>';
    var aspxFilePath = '<%=aspxfilePath %>';
    var lblListPrice = '<%=lblListPrice.ClientID%>';
    var lblSaving = '<%=lblSaving.ClientID%>';
    var lblItemQnty = '<%=lblQty.ClientID%>';
    var tblRecentItems = '<%=tblRecentItems.ClientID%>';
    var latestItemRss = '<%=LatestItemRss %>';
</script>

<div id="divLatestItems" class="cssClassProducts">
    <h1>
        <asp:Label ID="lblRecentItemsHeading" runat="server" Text="Recently Added Items"
            CssClass="cssClassLabel" meta:resourcekey="lblRecentItemsHeadingResource1"></asp:Label>
        <a class="cssRssImage" href="#" style="display: none">
            <img id="latestItemRssImage" alt="" src="" title="" />
        </a>
    </h1>
    <div id="tblRecentItems" runat="server" enableviewstate="false">
    </div>
    <div class="cssClassclear">
    </div>
</div>
<div class="popupbox cssClassQuickView" id="popuprel">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <div class="cssClassCommonWrapper">
        <div class="cssClassProductInformation" style="display: none">
            <div class="cssClassProductImage">
                <div class="cssClassProductBigPicture">
                    <div class="pikachoose">
                        <%--                    <ul id="pikame" class="jcarousel-skin-pika">
                    </ul>--%>
                    </div>
                </div>
            </div>
            <div class="cssClassProductPictureDetails">
                <div class="cssClassLeftSide">
                    <h2>
                        <span id="spanItemName"></span>
                    </h2>
                    <div class="cssClassAvailiability">
                        <asp:Label ID="lblAvailability" runat="server" Text="Availability: " meta:resourcekey="lblAvailabilityResource1"></asp:Label>
                        <span id="spanAvailability"></span>
                    </div>
                    <div class="cssViewer">
                        <span class="cssClassView sfLocale">View</span><span id="viewCount"></span></div>
                    <div class="cssClassItemBrands">
                    </div>
                    <div id="divCostVariant">
                    </div>
                    <span class="cssClassProductRealPrice">
                        <asp:Label ID="lblPrice" runat="server" meta:resourcekey="lblPriceResource1"></asp:Label>
                        <span id="spanPrice" class="cssClassFormatCurrency"></span>
                        <br />
                    </span><span class="cssClassProductOffPrice">
                        <asp:Label ID="lblListPrice" runat="server" meta:resourcekey="lblListPriceResource1"></asp:Label>
                        <span id="spanListPrice" class="cssClassFormatCurrency"></span></span><span id="bulkDiscount"
                            class="cssClassBulkDiscount sfLocale">(Bulk Discount available)</span>
                    <div class="cssClassClear">
                    </div>
                    <div class='popbox' style="display: none">
                    </div>
                    <div class="cssClassClear">
                    </div>
                    <span class="cssClassYouSave" style="display: none">
                        <asp:Label ID="lblSaving" runat="server" Text="You save: " meta:resourcekey="lblSavingResource1"></asp:Label>
                        <span id="spanSaving"></span></span>
                    <div class="cssClassClear">
                    </div>
                    <div class="cssClassDwnWrapper">
                        <div class="cssClassDownload cssClassRight" id="dwnlDiv" style="display: none">
                            <asp:Label ID="lblDownloadTitle" runat="server" Text="Sample Item Download: " meta:resourcekey="lblDownloadTitleResource1"></asp:Label>
                            <span id="spanDownloadLink" class="cssClassLink"></span>
                        </div>
                        <h2>
                            <span id="spnShowAvailability"></span>
                        </h2>
                    </div>
                    <div class="detailButtonWrapper">
                        <div>
                            <span class="cssClssQTY">
                                <asp:Label ID="lblQty" runat="server" Text="Qty: " meta:resourcekey="lblQtyResource1"></asp:Label>
                                <input type="text" id="txtQty" /><label id='lblNotification' style="color: #FF0000;"></label>
                            </span>
                        </div>
                        <div class="sfButtonwrapper">
                            <button class="sfBtn" id="btnAddToMyCart" type="button" onclick="LatestItems.AddToMyCart();">
                                <span><span class="sfLocale">Add to Cart</span></span></button>
                        </div>
                        <div id="viewMore">
                            <a href="#"><b><u><span class="sfLocale">View Full Product Detail</span></u></b></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdnPrice" />
<input type="hidden" id="hdnWeight" />
<input type="hidden" id="hdnQuantity" />
<input type="hidden" id="hdnListPrice" />
<input type="hidden" id="hdnTaxRateValue" />
