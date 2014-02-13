<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HeaderControl.ascx.cs"
    Inherits="Modules_AspxHeaderControl_HeaderControl" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxHeaderControl
        });
        $('.sfHeaderDropdown dt, .sfHeaderDropdown dd ul').hover(function() {
            $(".sfHeaderDropdown dd ul").show();
        }, function() {
            $(".sfHeaderDropdown dd ul").hide();
        });

    });
    var myAccountURLSetting = '<%=MyAccountURL%>';
    var myCategoryMgntPageURLSetting = '<%=CategoryMgntPageURL%>';
    var myItemMgntPageURLSetting = '<%=ItemMgntPageURL%>';
    var shoppingCartURLSetting = '<%=ShoppingCartURL%>';
    var wishListURLSetting = '<%=WishListURL%>';
    var singleAddressChkOutURL = '<%=SingleAddressChkOutURL %>';
    var allowWishListSetting = '<%=AllowWishList %>';
    var minCartSubTotalAmountSetting = '<%=MinCartSubTotalAmount%>';
    var allowMultipleShippingSetting = '<%=AllowMultipleShipping%>';
    var allowAnonymousCheckOutSetting = '<%=AllowAnonymousCheckOut%>';
    var frmLogin = '<%=FrmLogin%>';
    var loginMessageInfo = '<%=Session["LoginMessageInfo"]%>';
    var loginMessageInfoCount = '<%=Session["LoginMessageInfoCount"]%>';
    var cartItemCount = '<%=Count%>';
    var headerType = '<%=HeaderType %>';
    var userRoleBit = '<%=userRoleBit %>';
    //]]>
</script>

<div class="cssClassLoginStatusWrapper " style="display: none;">
    <div class="cssClassLoginStatusInfo ">
        <ul>
            <li class="cssClassAccount"><a id="lnkMyAccount"></a></li>
            <li class="cssClassMyCategories" style="display: none;"><a id="lnkMyCategories"></a>
            </li>
            <li class="cssClassMyItems" style="display: none;"><a id="lnkMyAddedItems"></a></li>
            <li class="cssClassWishList">
                <asp:Literal ID="litWishHead" runat="server" EnableViewState="false"></asp:Literal></li>
            <li class="cssClassCart">
                <asp:Literal ID="litCartHead" runat="server" EnableViewState="false"></asp:Literal></li>
            <li class="cssClassCheckOut"><a id="lnkCheckOut" rel="" href="javascript:;"></a>
            </li>
        </ul>
        <div class="cssClassclear">
        </div>
    </div>
</div>
<dl id="divHeaderDropdown" class="dropdown sfHeaderDropdown" style="display: none">
    <dt></dt>
    <dd>
        <ul style="display: none">
        </ul>
    </dd>
</dl>
