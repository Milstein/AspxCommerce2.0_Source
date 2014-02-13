<%@ Control Language="C#" AutoEventWireup="true" CodeFile="StoreSettingManage.ascx.cs"
    Inherits="Modules_AspxStoreSettings_StoreSettingManage" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxStoreSettingsManagement
        });
    });
    //<![CDATA[
    var ddlMyAccountURL = "<%=ddlMyAccountURL.ClientID %>";
    var ddlCatMgntPageURL = "<%=ddlCatMgntPageURL %>";
    var ddlItemMgntPageURL = "<%=ddlItemMgntPageURL %>";
    var ddlShoppingCartURL = "<%=ddlShoppingCartURL.ClientID%>";
    var ddlWishListURL = "<%=ddlWishListURL.ClientID %>";
    var maxFilesize = '<%=MaxFileSize %>';
    var ddlDetailsPageURL = "<%=ddlDetailsPageURL.ClientID%>";
    var ddlItemDetailURL = "<%=ddlItemDetailURL.ClientID%>";
    var ddlCategoryDetailURL = "<%=ddlCategoryDetailURL.ClientID%>";
    var ddlServicesDetailURL = "<%=ddlServicesDetailURL.ClientID%>";
    var ddlSingleCheckOutURL = "<%=ddlSingleCheckOutURL.ClientID %>";
    var ddlMultiCheckOutURL = "<%=ddlMultiCheckOutURL.ClientID %>";
    var ddlAdvanceSearchURL = "<%=ddlAdvanceSearchURL.ClientID%>";
    var ddlStoreLocatorURL = "<%=ddlStoreLocatorURL.ClientID %>";
    var ddlCompareItemURL = "<%=ddlCompareItemURL.ClientID %>";
    var ddlRssFeedURL = "<%=ddlRssFeedURL.ClientID %>";
    var ddlAppointBookURL = "<%=ddlAppointBookURL.ClientID %>";
    var ddlServiceURL = "<%=ddlServiceURL.ClientID %>";
    var ddlSItemDetailURL = "<%=ddlSItemDetailURL.ClientID %>";
    var ddlCatWiseItemURL = "<%=ddlCatWiseItemURL.ClientID %>";
    var ddlTrackPackageUrl = "<%=ddlTrackPackageUrl.ClientID %>";
    var ddlShippingDetailPageURL = "<%=ddlShippingDetailPageURL.ClientID %>";
    var ddlItemMgntPageURL = "<%=ddlItemMgntPageURL.ClientID %>";
    var ddlCatMgntPageURL = "<%=ddlCatMgntPageURL.ClientID %>";
    var ddlPromoItemsUrl = "<%=ddlPromoItemsUrl.ClientID %>";
    //]]>
</script>

<div id="divStoreSettings">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblHeading" runat="server" Text="Store Settings" meta:resourcekey="lblHeadingResource1"></asp:Label>
            </h1>
        </div>
        <div class="cssClassTabPanelTable">
            <div id="container-7">
                <ul>
                    <li><a href="#storefragment-1">
                        <asp:Label ID="lblTabTitle1" runat="server" Text="Standard" meta:resourcekey="lblTabTitle1Resource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-2">
                        <asp:Label ID="lblTabTitle2" runat="server" Text="General" meta:resourcekey="lblTabTitle2Resource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-3">
                        <asp:Label ID="lbTabTitle3" runat="server" Text="Email" meta:resourcekey="lbTabTitle3Resource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-4">
                        <asp:Label ID="lbTabTitle4" runat="server" Text="Display" meta:resourcekey="lbTabTitle4Resource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-5">
                        <asp:Label ID="lbTabTitle5" runat="server" Text="Media" meta:resourcekey="lbTabTitle5Resource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-8">
                        <asp:Label ID="lbTabTitle9" runat="server" Text="Shipping" meta:resourcekey="lbTabTitle9Resource2"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-usercart">
                        <asp:Label ID="Label7" runat="server" Text="Users/Cart" meta:resourcekey="Label7Resource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-RssFeed">
                        <asp:Label ID="lblRssFeedTab" runat="server" Text="Rss Feed" meta:resourcekey="lblRssFeedTabResource1"></asp:Label>
                    </a></li>
                    <li><a href="#storefragment-7">
                        <asp:Label ID="lbTabTitle8" runat="server" Text="Other" meta:resourcekey="lbTabTitle8Resource1"></asp:Label>
                    </a></li>
                </ul>
                <div id="storefragment-1">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblTab1Info" runat="server" Text="Standard Settings" meta:resourcekey="lblTab1InfoResource1"></asp:Label>
                        </h2>
                        <table border="0" id="tblStandardSettingsForm">
                            <tr>
                                <td>
                                    <asp:Label ID="lblDefaultImageProductURL" Text="Default Image Product URL:" runat="server"
                                        CssClass="sfFormlabel" meta:resourcekey="lblDefaultImageProductURLResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input id="fupDefaultImageURL" type="file" class="cssClassBrowse" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <div class="progress ui-helper-clearfix">
                                        <div class="progressBar" id="progressBar">
                                        </div>
                                        <div class="percentage">
                                        </div>
                                    </div>
                                    <div id="defaultProductImage">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMyAccountURL" runat="server" Text="My Account URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblMyAccountURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlMyAccountURL" runat="server" class="sfListmenu" meta:resourcekey="ddlMyAccountURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategoryMgntPageURL" runat="server" Text="My Category Management Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategoryMgntPageURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlCatMgntPageURL" class="sfListmenu" runat="server" meta:resourcekey="ddlCatMgntPageURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemMgntPageURL" runat="server" Text="My Item Management Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblItemMgntPageURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlItemMgntPageURL" class="sfListmenu" runat="server" meta:resourcekey="ddlItemMgntPageURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShoppingCartURL" runat="server" Text="Shopping Cart URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblShoppingCartURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlShoppingCartURL" class="sfListmenu" runat="server" meta:resourcekey="ddlShoppingCartURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblWishListURL" runat="server" Text="WishList URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblWishListURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlWishListURL" class="sfListmenu" runat="server" meta:resourcekey="ddlWishListURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblDetailPageURL" runat="server" Text="Details Page URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblDetailPageURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlDetailsPageURL" class="sfListmenu" runat="server" meta:resourcekey="ddlDetailsPageURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemDetailURL" runat="server" Text="Item Details Page URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblItemDetailURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlItemDetailURL" class="sfListmenu" runat="server" meta:resourcekey="ddlItemDetailURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategoryDetailURL" runat="server" Text="Category Details Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategoryDetailURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlCategoryDetailURL" class="sfListmenu" runat="server" meta:resourcekey="ddlCategoryDetailURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblServicesDetailURL" runat="server" Text="Service Details Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblServicesDetailURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlServicesDetailURL" class="sfListmenu" runat="server" meta:resourcekey="ddlServicesDetailURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblSingleCheckOutURL" runat="server" Text="Single Address CheckOut URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblSingleCheckOutURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlSingleCheckOutURL" class="sfListmenu" runat="server" meta:resourcekey="ddlSingleCheckOutURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMultiCheckOutURL" runat="server" Text="Multiple Address CheckOut URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblMultiCheckOutURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlMultiCheckOutURL" runat="server" class="sfListmenu" meta:resourcekey="ddlMultiCheckOutURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAdvanceSearchURL" runat="server" Text="Advance Search URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblAdvanceSearchURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlAdvanceSearchURL" class="sfListmenu" runat="server" meta:resourcekey="ddlAdvanceSearchURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblStoreLocatorURL" runat="server" Text="Store Locator URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblStoreLocatorURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlStoreLocatorURL" class="sfListmenu" runat="server" meta:resourcekey="ddlStoreLocatorURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCompareItemURL" runat="server" Text="Compare Item List URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblCompareItemURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlCompareItemURL" class="sfListmenu" runat="server" meta:resourcekey="ddlCompareItemURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAppointBookURL" runat="server" Text="Book An Appointment URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAppointBookURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlAppointBookURL" class="sfListmenu" runat="server" meta:resourcekey="ddlAppointBookURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblServiceURL" runat="server" Text="Services URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblServiceURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlServiceURL" class="sfListmenu" runat="server" meta:resourcekey="ddlServiceURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblSItemDetailURL" runat="server" Text="Service Item Detail URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblSItemDetailURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlSItemDetailURL" class="sfListmenu" runat="server" meta:resourcekey="ddlSItemDetailURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCatWiseItemURL" runat="server" Text="Category Wise Item Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCatWiseItemURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlCatWiseItemURL" class="sfListmenu" runat="server" meta:resourcekey="ddlCatWiseItemURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblTrackPackageUrl" runat="server" Text="Trace Package Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblTrackPackageUrlResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTrackPackageUrl" class="sfListmenu" runat="server" meta:resourcekey="ddlTrackPackageUrlResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShippingDetailPageURL" runat="server" Text="Shipping Detail Page URL:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShippingDetailPageURLResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlShippingDetailPageURL" class="sfListmenu" runat="server"
                                        meta:resourcekey="ddlShippingDetailPageURLResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblPromoItemsUrl" runat="server" Text="Promo Items Page URL:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblPromoItemsUrlResource1"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlPromoItemsUrl" class="sfListmenu" runat="server" meta:resourcekey="ddlPromoItemsUrlResource1">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-2">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblTab2Info" runat="server" Text="General Settings" meta:resourcekey="lblTab2InfoResource1"></asp:Label>
                        </h2>
                        <table id="tblGeneralSettingForm">
                            <tr>
                                <td>
                                    <asp:Label ID="lblStoreLogo" Text="Store Logo:" runat="server" CssClass="sfFormlabel"
                                        meta:resourcekey="lblStoreLogoResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input id="fupStoreLogo" type="file" class="cssClassBrowse" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <div class="progress ui-helper-clearfix">
                                        <div class="progressBar">
                                        </div>
                                        <div class="percentage">
                                        </div>
                                    </div>
                                    <div id="divStoreLogo">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblStoreName" runat="server" Text="Store Name: " CssClass="sfFormlabel"
                                        meta:resourcekey="lblStoreNameResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtStoreName" name="StoreName" class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMainCurrency" runat="server" Text="Main Currency:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblMainCurrencyResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="ddlCurrency" class="sfListmenu">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblRealTimeCurrency" runat="server" Text="Real Time Currency Conversion Enabled:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblRealTimeCurrencyResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkRealTimeCurrency" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblWeightUnit" runat="server" Text="Weight Unit:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblWeightUnitResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtWeightUnit" name="Weight" class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblDimensionUnit" runat="server" Text="Dimension Unit:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblDimensionUnitResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtDimensionUnit" name="Dimension" class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblLowStockQuantity" runat="server" Text="Low Stock Quantity:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblLowStockQuantityResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtLowStockQuantity" name="LowStockQuantity" datatype="Integer"
                                        class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShoppingOptionRange" runat="server" Text="Shopping Option Range:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShoppingOptionRangeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtShoppingOptionRange" name="ShoppingOptionRange" datatype="Integer"
                                        class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEstimateShippingCostInCartPage" runat="server" Text="Estimate Shipping Cost In Cart Page:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEstimateShippingCostInCartPageResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEstimateShippingCostInCartPage" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCartAbandonTime" Text="Cart Abandon Time(In Hours):" runat="server"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCartAbandonTimeResource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="text" id="txtCartAbandonTime" name="CartAbandonTime" datatype="Integer"
                                        class="sfInputbox required number">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblTimeToDeleteAbandCart" Text="Abandoned Carts Deletion Time(In Hours):"
                                        runat="server" CssClass="sfFormlabel" meta:resourcekey="lblTimeToDeleteAbandCartResource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="text" id="txtTimeToDeleteAbandCart" name="TimeTodeleteAbandCart" datatype="Integer"
                                        class="sfInputbox required number">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowAnonymousCheckOut" Text="Allow Anonymous Checkout:" runat="server"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAllowAnonymousCheckOutResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkAllowAnonymousCheckout" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowOutStockPurchase" runat="server" Text="Allow purchases when out of stock:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAllowOutStockPurchaseResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkAllowOutStockPurchase" disabled="disabled" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAskCustomerToSubscribe" runat="server" Text="Ask Customer To Subscribe:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAskCustomerToSubscribeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkAskCustomerToSubscribe" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowMultipleShippingAddress" runat="server" Text="Allow Multiple Shipping Address:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAllowMultipleShippingAddressResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkAllowMultipleShippingAddress" disabled="disabled" readonly="readonly" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-3">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblEmailSettingForm" runat="server" Text="Email Settings" meta:resourcekey="lblEmailSettingFormResource1"></asp:Label>
                        </h2>
                        <table id="tblEmailSettingForm">
                            <tr>
                                <td>
                                    <asp:Label ID="lblSendEmailsFrom" runat="server" Text="Send E-Commerce Emails From:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblSendEmailsFromResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtSendEmailsFrom" name="EmailFrom" class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblSendOrderNotification" runat="server" Text="Send Order Notification:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblSendOrderNotificationResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkSendOrderNotification" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-4">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblSEODisplay" runat="server" Text="Display Settings" meta:resourcekey="lblSEODisplayResource1"></asp:Label>
                        </h2>
                        <table id="tblSEODisplayForm">
                            <tr>
                                <td>
                                    <asp:Label ID="lblModuleCollapsible" runat="server" Text="Module Collapsible:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblModuleCollapsibleResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkModuleCollapsible" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShowAddToCartButton" runat="server" Text="Show Add To Cart Button:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShowAddToCartButtonResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkShowAddToCartButton" disabled="disabled" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAddToCartButtonText" runat="server" Text="Add To Cart Button Text:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAddToCartButtonTextResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtAddToCartButtonText" name="AddToCartButtonText" class="sfInputbox required"
                                        disabled="disabled" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemDisplayMode" runat="server" Text="Item Display Mode:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblItemDisplayModeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="ddlItemDisplayMode" class="sfListmenu">
                                        <option value="Dropdown" class="sfLocale">Dropdown</option>
                                        <option value="Icon" class="sfLocale">Icon</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblViewAsOptions" runat="server" Text="View As Options:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblViewAsOptionsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="ddlViewAsOptions" multiple="multiple" class="sfListmenu">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblViewAsOptionsDefault" runat="server" Text="View As Options Default:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblViewAsOptionsDefaultResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="ddlViewAsOptionsDefault" class="sfListmenu">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblSortByOptions" runat="server" Text="Sort By Options:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblSortByOptionsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="ddlSortByOptions" multiple="multiple" class="sfListmenu">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblSortByOptionsDefault" runat="server" Text="Sort By Options Default:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblSortByOptionsDefaultResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="ddlSortByOptionsDefault" class="sfListmenu">
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-5">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblMediaSetting" runat="server" Text="Media Settings" meta:resourcekey="lblMediaSettingResource1"></asp:Label>
                        </h2>
                        <table id="tblMediaSettingForm">
                            <tr>
                                <td>
                                    <asp:Label ID="lblMaximumImageSize" Text="Maximum Uploaded Image/File Size:" runat="server"
                                        CssClass="sfFormlabel" meta:resourcekey="lblMaximumImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtMaximumImageSize" datatype="Integer" name="MaximumImageSize"
                                        class="sfInputbox required" />
                                    <b>KB</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMaxDownloadFileSize" Text="Maximum Download File Size:" runat="server"
                                        CssClass="sfFormlabel" meta:resourcekey="lblMaxDownloadFileSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtMaxDownloadFileSize" datatype="Integer" name="MaximumDownloadSize"
                                        class="sfInputbox required" />
                                    <b>KB</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemLargeThumbImageSize" Text="Item Large Thumbnail Image Size:"
                                        runat="server" CssClass="sfFormlabel" meta:resourcekey="lblItemLargeThumbImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtItemLargeThumbnailImageSize" name="ItemLargeThumbnailImage"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemMediumThumbnailImageSize" Text="Item Medium Thumbnail Image Size:"
                                        runat="server" CssClass="sfFormlabel" meta:resourcekey="lblItemMediumThumbnailImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtItemMediumThumbnailImageSize" name="ItemMediumThumbnailImage"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemSmallThumbnailImageSize" runat="server" Text="Item Small Thumbnail Image Size:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblItemSmallThumbnailImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtItemSmallThumbnailImageSize" name="ItemSmallThumbnailImageSize"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemImageMaxWidth" runat="server" Text="Maximum Width Of Item Image:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblIItemImageMaxWidthResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtItemImageMaxWidth" name="ItemImageMaxWidth" datatype="Integer"
                                        class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblItemImageMaxHeight" runat="server" Text="Maximum Height Of Item Image:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblItemImageMaxHeightResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtItemImageMaxHeight" name="ItemImageMaxHeight" datatype="Integer"
                                        class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategoryLargeThumbnailImageSize" runat="server" Text="Category Large Thumbnail Image Size:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategoryLargeThumbnailImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtCategoryLargeThumbnailImageSize" name="CategoryLargeThumbnailImageSize"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategoryMediumThumbnailImageSize" runat="server" Text="Category Medium Thumbnail Image Size:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategoryMediumThumbnailImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtCategoryMediumThumbnailImageSize" name="CategoryMediumThumbnailImageSize"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategorySmallThumbnailImageSize" runat="server" Text="Category Small Thumbnail Image Size:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategorySmallThumbnailImageSizeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtCategorySmallThumbnailImageSize" name="CategorySmallThumbnailImageSize"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategoryBannerImageWidth" runat="server" Text="Category Banner Image Width:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategoryBannerImageWidthResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtCategoryBannerImageWidth" name="CategoryBannerImageWidth"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCategoryBannerImageHeight" runat="server" Text="Category Banner Image Height:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblCategoryBannerImageHeightResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtCategoryBannerImageHeight" name="CategoryBannerImageHeight"
                                        datatype="Integer" class="sfInputbox required" />
                                    <b>px</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label4" runat="server" Text="Watermark Text:" CssClass="sfFormlabel"
                                        meta:resourcekey="Label4Resource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="text" id="txtWaterMark" class="sfInputbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label5" runat="server" Text="Watermark Position:" CssClass="sfFormlabel"
                                        meta:resourcekey="Label5Resource1"></asp:Label>
                                </td>
                                <td>
                                    <div>
                                        <label>
                                            <input type="radio" name="watermarkposition" value="TOP_CENTER" />top center</label>
                                        <label>
                                            <input type="radio" name="watermarkposition" value="MID_CENTER" />mid center</label>
                                        <label>
                                            <input type="radio" name="watermarkposition" value="BOTTOM_CENTER" />bottom center</label>
                                        <label>
                                            <input type="radio" name="watermarkposition" value="TOP_LEFT" />top left</label>
                                        <label>
                                            <input type="radio" name="watermarkposition" value="MID_LEFT" />mid left</label>
                                        <label>
                                            <input type="radio" name="watermarkposition" value="BOTTOM_LEFT" />bottom left</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label6" runat="server" Text="Watermark Text Rotate:" CssClass="sfFormlabel"
                                        meta:resourcekey="Label6Resource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="text" id="txtWaterMarkRotationAngle" value="0.00" class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label8" runat="server" Text="Watermark Image Position:" CssClass="sfFormlabel"
                                        meta:resourcekey="Label8Resource1"></asp:Label>
                                </td>
                                <td>
                                    <div>
                                        <label>
                                            <input type="radio" name="watermarkImageposition" value="TOP_LEFT" />top left</label>
                                        <label>
                                            <input type="radio" name="watermarkImageposition" value="TOP_RIGHT" />top right</label>
                                        <label>
                                            <input type="radio" name="watermarkImageposition" value="CENTER" />mid center</label>
                                        <label>
                                            <input type="radio" name="watermarkImageposition" value="BOTTOM_LEFT" />bottom left</label>
                                        <label>
                                            <input type="radio" name="watermarkImageposition" value="BOTTOM_RIGHT" />bottom
                                            right</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label9" runat="server" Text="Watermark Image Rotate:" CssClass="sfFormlabel"
                                        meta:resourcekey="Label9Resource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="text" id="txtWaterMarkImageRotation" value="0.00" class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label3" runat="server" Text="Apply Watermark Image:" CssClass="sfFormlabel"
                                        meta:resourcekey="Label3Resource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="checkbox" name="showWaterMarkImage" class="sfCheckbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShowItemImagesInCart" runat="server" Text="Show Item Images in Cart:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShowItemImagesInCartResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkShowItemImagesInCart" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShowItemImagesInWishList" runat="server" Text="Show Item Images in WishList:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShowItemImagesInWishListResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkShowItemImagesInWishList" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-usercart">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="Label10" runat="server" Text="User/Cart Settings" meta:resourcekey="lblTitleUserCartsResource1"></asp:Label>
                        </h2>
                        <table id="Table3" border="0">
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowMultipleAddress" runat="server" Text="Allow Users To Create Multiple Addresses:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAllowMultipleAddressResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkAllowMultipleAddress" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMinimumCartSubTotal" runat="server" Text="Minimum Cart Sub Total Amount:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblMinimumCartSubTotalResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtMinimumCartSubTotalAmount" name="MinimumOrderAmount" datatype="Integer"
                                        class="sfInputbox required" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAdditionalCVR" runat="server" Text="Currency Conversion Surcharges:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblAdditionalCVRResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtAdditionalCVR" name="AdditionalCVR" datatype="Integer"
                                        class="sfInputbox DigitDecimalAndNegative" />
                                    <b>%</b>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-7">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblOtherSettings" runat="server" Text="Other Settings" meta:resourcekey="lblOtherSettingsResource1"></asp:Label>
                        </h2>
                        <table id="tblOtherSettings">
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableCompareItems" runat="server" Text="Enable 'Compare Items':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEnableCompareItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEnableCompareItems" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfItemsCompare" runat="server" Text="Maximum Number Of Items Allowed To Compare:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfItemsCompareResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfItemsToCompare" name="NumberOfItemsToCompare" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableWishList" runat="server" Text="Enable 'WishList':" CssClass="sfFormlabel"
                                        meta:resourcekey="lblEnableWishListResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEnableWishList" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfRecentAddedWishItems" runat="server" Text="Number Of Recently Added WishItems:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfRecentAddedWishItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfRecentAddedWishItems" name="NoOfRecentAddedWishItems"
                                        datatype="Integer" class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableEmailAFriend" runat="server" Text="Enable 'Email a Friend' :"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEnableEmailAFriendResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEmailAFriend" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShowMiniShoppingCart" runat="server" Text="Show 'Mini Shopping Cart':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShowMiniShoppingCartResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkShowMiniShoppingCart" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowAnonymousUserToWriteReviews" runat="server" CssClass="sfFormlabel"
                                        Text="Allow Anonymous User to Write Reviews and Ratings:" meta:resourcekey="lblAllowAnonymousUserToWriteReviewsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkAllowAnonymousUserToWriteReviews" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMultipleReviewsPerUser" runat="server" CssClass="sfFormlabel" Text="Allow Users To Write Multiple Reviews:"
                                        meta:resourcekey="lblMultipleReviewsPerUserResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkMultipleReviewsPerUser" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblMultipleReviewsPerIP" runat="server" CssClass="sfFormlabel" Text="Allow Users To Write Multiple Reviews From Same IP:"
                                        meta:resourcekey="lblMultipleReviewsPerIPResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkMultipleReviewsPerIP" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableRecentlyViewedItems" runat="server" Text="Enable 'Recently Viewed Items':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEnableRecentlyViewedItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEnableRecentlyViewedItems" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfRecentlyViewedItems" runat="server" Text="No Of Recently Viewed Items:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfRecentlyViewedItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfRecentlyViewedItems" name="RecentlyViewedCount" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableLatestItems" runat="server" Text="Enable 'Latest Items':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEnableLatestItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEnableLatestItems" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfLatestItems" runat="server" Text="No Of Latest Items:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblNoOfLatestItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfLatestItems" name="LatestItemsCount" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfLatestItemsInARow" runat="server" Text="No Of Latest Items In A Row:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfLatestItemsInARowResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfLatestItemsInARow" name="LatestItemsInARow" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShowBestSellers" runat="server" Text="Enable 'BestSeller Items':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblShowBestSellersResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkShowBestSellers" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfBestSellers" runat="server" Text="No Of BestSeller Items:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfBestSellersResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfBestSellers" name="BestSellersCount" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableSpecialItems" runat="server" Text="Enable 'Special Items':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEnableSpecialItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEnableSpecialItems" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfSpecialItems" runat="server" Text="No Of Special Items:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblNoOfSpecialItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfSpecialItems" name="ItemSpecialCount" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblEnableRecentlyComparedItems" runat="server" Text="Enable 'Recently Compared Items':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblEnableRecentlyComparedItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkEnableRecentlyComparedItems" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfRecentlyComparedItems" runat="server" Text="No Of Recently Compared Items:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfRecentlyComparedItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfRecentlyComparedItems" name="RecentlyComparedCount"
                                        datatype="Integer" class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblYouMayAlsoLike" runat="server" Text="Enable 'You May Also Like':"
                                        CssClass="sfFormlabel" meta:resourcekey="lblYouMayAlsoLikeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="checkbox" id="chkYouMayAlsoLike" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfYouMayAlsoLike" runat="server" Text="No Of You May Also Like Items:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfYouMayAlsoLikeResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfYouMayAlsoLikeItems" name="YouMayAlsoLikeCount" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfPopTags" runat="server" Text="No Of Popular Tags:" CssClass="sfFormlabel"
                                        meta:resourcekey="lblNoOfPopTagsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfPopTags" name="NoOfPopTags" datatype="Integer" class="sfInputbox required"
                                        maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblServiceCatCount" runat="server" Text="Number Of Service Category To display:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblServiceCatCountResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtServiceCatCount" name="NoOfServiceCategory" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblNoOfDisplayItems" runat="server" Text="Number Of Items To display in a Row:"
                                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfDisplayItemsResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <input type="text" id="txtNoOfDisplayItems" name="NoOfDisplayItems" datatype="Integer"
                                        class="sfInputbox required" maxlength="2" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-8">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="Label1" runat="server" Text="Shipping Setting" meta:resourcekey="Label1Resource1"></asp:Label>
                        </h2>
                        <table border="0" id="Table1">
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowBillingCountry" Text="List of allowed Billing Countries:"
                                        runat="server" CssClass="sfFormlabel" meta:resourcekey="lblAllowBillingCountryResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="lbCountryBilling" multiple="multiple">
                                    </select>
                                    <input type="checkbox" id="cbSelectAllBillingCountry" />
                                </td>
                                <td class="cssClassGridRightCol">
                                    <label id="lblBillingCountry">
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAllowShippingCountry" Text="List of allowed Shipping Countries:"
                                        runat="server" CssClass="sfFormlabel" meta:resourcekey="lblAllowShippingCountryResource1"></asp:Label>
                                </td>
                                <td class="cssClassGridRightCol">
                                    <select id="lbCountryShipping" multiple="multiple">
                                    </select>
                                    <input type="checkbox" id="cbSelectAllShippingCountry" />
                                </td>
                                <td class="cssClassGridRightCol">
                                    <label id="lblShippingCountry">
                                    </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="storefragment-RssFeed">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblRssFeedHeading" runat="server" Text="RssFeed Setting" meta:resourcekey="lblRssFeedHeadingResource1"></asp:Label>
                        </h2>
                        <table id="rssFeedTbl" cellpadding="0" cellspacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>
                                        <asp:Label ID="lblRssFeedTitle" runat="server" Text="Rss Feed For:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblRssFeedTitleResource1"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="lblRssFeedCount" runat="server" Text="Rss Feed Count" CssClass="sfFormlabel"
                                            meta:resourcekey="lblRssFeedCountResource1"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="lblRssFeedStatus" runat="server" Text="Rss Feed Status" CssClass="sfFormlabel"
                                            meta:resourcekey="lblRssFeedStatusResource1"></asp:Label>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="3">
                                        <h2>
                                            <asp:Label ID="Label2" runat="server" Text="For Front End:" meta:resourcekey="Label2Resource1"></asp:Label></h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblRssFeedURL" runat="server" Text="RssFeed URL:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblRssFeedURLResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlRssFeedURL" class="sfListmenu" runat="server" meta:resourcekey="ddlRssFeedURLResource1">
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblLatestItemRss" runat="server" Text="Latest Items:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblLatestItemRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtLatestItemRssCount" name="LatestItemRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="latestItemChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSpecialItemRss" runat="server" Text="Special Items:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblSpecialItemRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtSpecialItemRssCount" name="SpecialITemRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="specialItemChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblFeaturedItemsRss" runat="server" Text="Feature Item:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblFeaturedItemsRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtFeatureItemRssCount" name="FeatureItemRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="featureItemChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblBestSellItemRss" runat="server" Text="Best Sell Item:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblBestSellItemRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtBestSellItemRssCount" name="BestSellItemRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="bestSellItemChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblPopularTagRss" runat="server" Text="Popular Tag:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblPopularTagRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtPopularTagRssCount" name="PopularTagRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="popularTagChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblHeavyDiscountRss" runat="server" Text="Heavy Discount Item:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblHeavyDiscountRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtHeavyDiscountRssCount" name="HeavyDiscountItemRssCount"
                                            class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="heavyDiscountChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblCategory" runat="server" Text="New Category:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblCategoryResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtCategoryRssCount" name="NewCategoryRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="categoryChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblServiceTypeItem" runat="server" Text="Service type Item:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblServiceTypeItemResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtServiceItemRssCount" name="ServiceTypeItemRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="serviceChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblBrandRss" runat="server" Text="Brands:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblBrandRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtBrandRssCount" name="BrandRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="brandChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <h2>
                                            <asp:Label runat="server" Text="For Back End:" meta:resourcekey="LabelResource1"></asp:Label></h2>
                                    </td>
                                </tr>
                                <%--  For admin --%>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblNewOrderRss" runat="server" Text="New Order:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblNewOrderRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtNewOrderRssCount" name="NewOrderRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="newOrderChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblNewCustomerRss" runat="server" Text="New Customer:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblNewCustomerRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtNewCustomerRssCount" name="NewCustomerRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="newCustomerChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblNewTag" runat="server" Text="New Item Tag:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblNewTagResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtNewItemTagRssCount" name="NewItemTagRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="newItemTagChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblNewItemReview" runat="server" Text="New Item Review:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblNewItemReviewResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtNewItemReviewRssCount" name="NewItemReviewRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="newItemReviewChkBox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblLowStockItemRss" runat="server" Text="Low Stock Item:" CssClass="sfFormlabel"
                                            meta:resourcekey="lblLowStockItemRssResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtLowStockRssCount" name="LowStockItemRssCount" class="sfInputbox required" />
                                    </td>
                                    <td>
                                        <input type="checkbox" id="lowStockChkBox" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="submit" id="btnSaveStoreSettings" class="cssClassButtonSubmit">
                    <span><span class="sfLocale">Save Settings</span></span></button>
            </p>
        </div>
    </div>
</div>
<input type="hidden" id="hdnPrevFilePath" />
<input type="hidden" id="hdnPrevStoreLogoPath" />
