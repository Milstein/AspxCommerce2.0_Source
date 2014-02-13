<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShoppingCartFlyOver.ascx.cs"
    Inherits="Modules_AspxShoppingCartFlyOver_ShoppingCartFlyOver" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShoppingCartFlyOver
        });
    });
    //<![CDATA[
    var showMiniShopCart = '<%=ShowMiniShopCart%>';
    var allowAnonymousCheckOut = "<%=AllowAnonymousCheckOut%>";
    var minCartSubTotalAmount = '<%=MinCartSubTotalAmount%>';
    var allowMultipleAddChkOut = '<%=AllowMultipleAddChkOut%>';
    var shoppingCartURL = '<%=ShoppingCartURL %>';
    var totalPrc = "<%=TotalPrice %>";
    var cartItemCount = "<%=CartItemCount %>";
    var ModuleCollapsible = "<%=ModuleCollapsible %>";
    //]]> 
</script>

<div class="cssClassLeftSideBox cssClassShoppingCartWrapper" style="display: block;">
    <div class="cssClassMiniShoppingCartHeader">
        <h2 id="h2myshoppingCart" class="cssClassLeftHeader">
        </h2>
    </div>
    <div class="cssClassMiniShoppingCartWrapper">
        <div id="divMiniShoppingCart1" class="cssClassShoppingBag">
            <%--<p>
            <span id="cartBagItemCount" class="cssClassNotFound"></span><span id="CartItemLoader">
            </span>
        </p>--%>
        </div>
        <div id="divShoppingCart">
            <div class="cssClassCommonSideBoxCartTable">
                <table id="tblCartListItems" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <asp:Literal ID="ltrShoppingBagMini" runat="server" EnableViewState="False" 
                        meta:resourcekey="ltrShoppingBagMiniResource1"></asp:Literal>
                </table>
                <div class="cssShoppingCartLink">
                    <a id="lnkViewShoppingCart" class="sfLocale">View Cart</a> <a id="lnkMiniShoppingCheckOut" class="sfLocale">Checkout</a>
                </div>
            </div>
        </div>
    </div>
</div>
