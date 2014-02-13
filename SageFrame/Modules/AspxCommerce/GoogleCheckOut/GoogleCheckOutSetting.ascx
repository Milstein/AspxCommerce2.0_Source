<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GoogleCheckOutSetting.ascx.cs"
    Inherits="Modules_PaymentGatewayManagement_GoogleCheckOutSetting" %>

<script type="text/javascript">

    //<![CDATA[
    var Setting = "";
    var Environment;
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
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName()

        };
        Setting = {
            LoadPaymentGatewaySetting: function(id, PopUpID) {
                var paymentGatewayId = id;
                var param = JSON2.stringify({ paymentGatewayID: paymentGatewayId, storeId: storeId, portalId: portalId });
                $.ajax({
                    type: "POST",
                    url: '<%=aspxPaymentModulePath%>' + "Services/GoogleCheckOutWebService.asmx/GetAllGoogleCheckOutSetting",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        $.each(msg.d, function(index, item) {
                            $("#txtMerchantID").val(item.GoogleMerchantID);
                            $("#txtMerchantKey").val(item.GoogleMerchantKey);
                            $("#ddlGoogleEnvironment").val(item.GoogleEnvironmentType);
                            $("#txtAPICallbackUrl").val(item.GoogleAPICallbackUrl);
                            $("#txtCurrencyType").val(item.GoogleCurrencyType);

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
                $("#btnSaveGoogleCheckOutSetting").bind("click", function() {
                    Setting.SaveUpdateGoogleCheckOutSetting();
                });
            },
            SaveUpdateGoogleCheckOutSetting: function() {

                var paymentGatewaySettingValueID = 0;
                var paymentGatewayID = $("#hdnPaymentGatewayID").val();

                var settingKey = '';
                settingKey += 'GoogleMerchantID' + "#" + 'GoogleMerchantKey' + "#" + 'GoogleEnvironmentType' + "#" + 'GoogleAPICallbackUrl' + "#" + 'GoogleCurrencyType' + "#";
                var settingValue = '';
                settingValue += $("#txtMerchantID").val() + "#" + $("#txtMerchantKey").val() + "#" + $("#ddlGoogleEnvironment option:selected").val() + "#" + $("#txtAPICallbackUrl").val() + "#" + $("#txtCurrencyType").val() + "#";
                var isActive = true;
                var param = JSON2.stringify({ paymentGatewaySettingValueID: paymentGatewaySettingValueID, paymentGatewayID: paymentGatewayID, settingKeys: settingKey, settingValues: settingValue, isActive: isActive, aspxCommonObj:aspxCommonObj });
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
    function txtVerificationUrl_onclick() {

    }

</script>

<div class="cssClassCloseIcon">
    <button type="button" class="cssClassClose">
        <span class="sfLocale">Close</span></button>
</div>
<h2>
    <asp:Label ID="lblTitle" runat="server" Text="GoogleCheckOut Setting Information"
        meta:resourcekey="lblTitleResource1"></asp:Label>
</h2>
<div class="sfFormwrapper">
    <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td>
                <asp:Label ID="lblMerchantID" runat="server" Text="MerchantID:" CssClass="cssClassLabel"
                    meta:resourcekey="lblMerchantIDResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" id="txtMerchantID" class="sfInputbox">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblMerchantKey" runat="server" Text="MerchantKey:" CssClass="cssClassLabel"
                    meta:resourcekey="lblMerchantKeyResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtMerchantKey">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblEnvironmentType" runat="server" Text="EnvironmentType:" CssClass="cssClassLabel"
                    meta:resourcekey="lblEnvironmentTypeResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <%--<input type="text" class="sfInputbox" id="txtEnvironmentType">--%>
                <select id="ddlGoogleEnvironment">
                    <option value="Sandbox" class="sfLocale">Sandbox</option>
                    <option value="Production" class="sfLocale">Production</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblAPICallbackUrl" runat="server" Text="APICallbackUrl:" CssClass="cssClassLabel"
                    meta:resourcekey="lblAPICallbackUrlResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtAPICallbackUrl">
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblCurrencyType" runat="server" Text="CurrencyType:" CssClass="cssClassLabel"
                    meta:resourcekey="lblCurrencyTypeResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtCurrencyType" onclick="return ">
            </td>
        </tr>
        <tr>
            <td>
                &nbsp;
            </td>
            <td class="cssClassGridRightCol">
                &nbsp;
            </td>
        </tr>
    </table>
    <div class="sfButtonwrapper">
        <p>
            <button id="btnSaveGoogleCheckOutSetting" type="button">
                <span><span class="sfLocale">Save</span></span></button>
        </p>
    </div>
</div>
