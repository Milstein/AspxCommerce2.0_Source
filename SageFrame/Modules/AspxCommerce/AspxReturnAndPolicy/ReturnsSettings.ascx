<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ReturnsSettings.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxReturnAndPolicy_ReturnsSettings" %>

<script type="text/javascript">
    var serverLocation = '<%=Request.ServerVariables["SERVER_NAME"]%>';
    var serverHostLoc = "http://" + serverLocation;
    var path = '<%=path%>';
    $(function() {       
        $(".sfLocale").localize({
            moduleKey: AspxReturnAndPolicy
        });
    });   

</script>

<div id="divReturnManagement">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblReturnsManagementHeading" runat="server" Text="Returns Settings"
                    meta:resourcekey="lblReturnsManagementHeadingResource1"></asp:Label>
            </h1>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table width="100%" breturn="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="10%">
                                <label class="cssClassLabel sfLocale">
                                    Order For Return Expires in Day(s) :</label>
                            </td>
                            <td>
                                <input type="text" id="txtExpiresInDays" name="ExpiresInDays" class="sfInputbox required number"
                                    datatype="Integer" maxlength="5" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <button type="button" id="btnBack">
                                        <span><span class="sfLocale">Back</span></span></button>
                                    <button type="button" id="btnSave">
                                        <span><span class="sfLocale">Save</span></span></button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="log">
                </div>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
    </div>
</div>
