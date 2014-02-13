<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShoppingBagHeader.ascx.cs"
    Inherits="Modules_AspxShoppingBagHeader_ShoppingBagHeader" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShoppingBagHeader
        });
    });
    var showMiniShopCart = '<%=ShowMiniShopCart%>';
    var allowAnonymousCheckOut = "<%=AllowAnonymousCheckOut%>";
    var minCartSubTotalAmount = '<%=MinCartSubTotalAmount%>';
    var allowMultipleAddChkOut = '<%=AllowMultipleAddChkOut%>';
    var shoppingCartURL = '<%=ShoppingCartURL %>';
    var singleAddressChkOutURL = '<%=SingleAddressChkOutURL %>';
    var BagType = '<%=BagType %>';
    //]]> 
</script>

<div id="divMiniShoppingCart" class="cssClassShoppingCart" style="display: none;">
    <p>
        <a onclick="if(!this.disabled){ShopingBag.showShoppingCart();};" href="javascript:void(0);"
            id="lnkShoppingBag">
            <img id="fullShoppingBag" src="" alt="Shopping Basket" class="sfLocale" title="Shopping Basket"
                align="right" /></a>
        <img id="emptyShoppingBag" src="" alt="Shopping Basket" class="sfLocale" title="Shopping Basket"
            align="right" />
    </p>
    <p>
        <span id="cartItemCount"></span>
        <img id="imgarrow" src="" alt="down" class="sfLocale" title="down" onclick="if(!this.disabled){ShopingBag.showShoppingCart();}" /></p>
</div>
<div id="ShoppingCartPopUp" style="display: none;" class="Shopingcartpopup">
    <h2>
        <asp:Label ID="lblMyCartTitle" runat="server" Text="My Cart Item(s)" CssClass="cssClassShoppingBag"
            meta:resourcekey="lblMyCartTitleResource1"></asp:Label></h2>
    <div class="cssClassCommonSideBoxTable">
        <table id="tblListCartItems" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td>
                </td>
            </tr>
        </table>
        <div class="sfButtonwrapper sfShoppingBagButton">
            <button id="lnkViewCart" type="button">
                <span><span class="sfLocale" >View Cart</span></span></button>
            <button id="lnkMiniCheckOut" type="button">
                <span><span class="sfLocale">Checkout</span></span></button>
        </div>
    </div>
</div>
<%--<input type="hidden" id="hdnItemCostVariants" />--%>