<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MoneybookersSetting.ascx.cs"
    Inherits="Modules_PaymentGatewayManagement_MoneybookersSetting" %>

<script type="text/javascript">

    //<![CDATA[
    var Setting = "";
    $(function() {
        var storeId = AspxCommerce.utils.GetStoreID();
        var portalId = AspxCommerce.utils.GetPortalID();
        var userName = AspxCommerce.utils.GetUserName();
        var cultureName = AspxCommerce.utils.GetCultureName();
        var customerId = AspxCommerce.utils.GetCustomerID();
        var userIP = AspxCommerce.utils.GetClientIP();
        var countryName = AspxCommerce.utils.GetAspxClientCoutry();
        var sessionCode = AspxCommerce.utils.GetSessionCode();
        var aspxCommonObj = {
            StoreID: storeId,
            PortalID: portalId,
            UserName: userName
        }
        Setting = {
            LoadPaymentGatewaySetting: function(id, PopUpID) {
                var paymentGatewayId = id;
                var param = JSON2.stringify({ paymentGatewayID: paymentGatewayId, storeId: storeId, portalId: portalId });
                $.ajax({
                    type: "POST",
                    url: '<%=aspxPaymentModulePath%>' + "Services/MoneybookersWebService.asmx/GetAllMoneybookersSetting",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        $.each(msg.d, function(index, item) {
                            $("#txtReturnUrl").val(item.MoneybookersSuccessUrl);
                            $("#txtBusinessAccount").val(item.MoneybookersMerchantAccount);
                            $("#txtSecretWord").val(item.MoneybookersSecretWord);
                            $("#txtCurrency").val(item.MoneybookersCurrencyCode);
                            $("#txtVerificationUrl").val(item.MoneybookersStatusUrl);
                            $("#txtCancelUrl").val(item.MoneybookersCancelUrl);
                            $("#txtLogoUrl").val(item.MoneybookersLogoUrl);
                            $("#chkIsTest").attr('checked', Boolean.parse(item.IsTestMoneybookers));
                        });
                        ShowPopupControl(PopUpID);
                        $(".cssClassClose").click(function() {
                            $('#fade, #popuprel2').fadeOut();
                        });
                    },
                    error: function() {
                        csscody.error('<h2>Error Message</h2><p>Failed to load</p>');
                    }
                });
                $("#btnSaveMoneybookersSetting").bind("click", function() {
                    Setting.SaveUpdateMoneybookersSetting();
                });
            },
            SaveUpdateMoneybookersSetting: function() {
                var paymentGatewaySettingValueID = 0;
                var paymentGatewayID = $("#hdnPaymentGatewayID").val();

                var settingKey = '';
                settingKey += 'MoneybookersSuccessUrl' + "#" + 'MoneybookersMerchantAccount' + "#" + 'MoneybookersSecretWord' + "#" + 'MoneybookersCurrencyCode' + "#" + 'MoneybookersStatusUrl' + "#" + 'MoneybookersCancelUrl' + "#" + 'MoneybookersLogoUrl' + "#" + 'IsTestMoneybookers';
                var settingValue = '';
                settingValue += $("#txtReturnUrl").val() + "#" + $("#txtBusinessAccount").val() + "#" + $("#txtSecretWord").val() + "#" + $("#txtCurrency").val() + "#" + $("#txtVerificationUrl").val() + "#" + $("#txtCancelUrl").val() + "#" + $("#txtLogoUrl").val() + "#" + $("#chkIsTest").attr('checked');
                var isActive = true;
                var param = JSON2.stringify({ paymentGatewaySettingValueID: paymentGatewaySettingValueID, paymentGatewayID: paymentGatewayID, settingKeys: settingKey, settingValues: settingValue, isActive: isActive, aspxCommonObj: aspxCommonObj });
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/AddUpdatePaymentGateWaySettings",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function() {
                        csscody.info('<h2>Successful Message</h2><p>Setting has been saved successfully.</p>');
                        $('#fade, #popuprel2').fadeOut();
                    },
                    error: function() {
                        csscody.error('<h2>Error Message</h2><p>Failed to save!</p>');
                    }
                });
            }
        }
    });


    //]]>
</script>

<div class="cssClassCloseIcon">
    <button type="button" class="cssClassClose">
        <span class="sfLocale">Close</span></button>
</div>
<h2>
    <asp:Label ID="lblTitle" runat="server" Text="Moneybookers Setting Information" meta:resourcekey="lblTitleResource1"></asp:Label>
</h2>
<div class="sfFormwrapper">
    <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td>
                <asp:Label ID="lblReturnUrl" runat="server" Text="Success Url:" CssClass="cssClassLabel"
                    meta:resourcekey="lblReturnUrlResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" id="txtReturnUrl" class="sfInputbox">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblBusinessAccount" runat="server" Text="Merchant Account:" CssClass="cssClassLabel"
                    meta:resourcekey="lblBusinessAccountResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtBusinessAccount">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblSecretCode" runat="server" Text="Secret Word:" CssClass="cssClassLabel"
                    meta:resourcekey="lblSecretCodeResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtSecretWord">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblCurrency" runat="server" Text="Currency:" CssClass="cssClassLabel"
                    meta:resourcekey="lblCurrencyResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtCurrency">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblVerificationUrl" runat="server" Text="Status Url:" CssClass="cssClassLabel"
                    meta:resourcekey="lblVerificationUrlResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtVerificationUrl">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblCancelUrl" runat="server" Text="Cancel Url:" CssClass="cssClassLabel"
                    meta:resourcekey="lblCancelUrlResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtCancelUrl">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblLogoUrl" runat="server" Text="Logo Url:" CssClass="cssClassLabel"
                    meta:resourcekey="lblLogoUrlResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtLogoUrl">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblIsTest" runat="server" Text="Is Test MoneyBooker:" CssClass="cssClassLabel"
                    meta:resourcekey="lblIsTestResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="checkbox" id="chkIsTest" class="cssClassCheckBox" />
            </td>
        </tr>
    </table>
    <div class="sfButtonwrapper">
        <p>
            <button id="btnSaveMoneybookersSetting" type="button">
                <span><span class="sfLocale">Save</span></span></button>
        </p>
    </div>
</div>
