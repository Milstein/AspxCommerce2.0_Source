<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CouponStatusManage.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxCouponManagement_CouponStatusManage" %>
<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCouponManagement
        });
    });
    //<![CDATA[
    var lblHeading = "<%= lblHeading.ClientID %>";
//]]>
</script>
<div id="divCouponStatusDetail">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblCouponHeading" runat="server" Text="Manage Coupon Status" meta:resourcekey="lblCouponStatusHeadingResource1"></asp:Label>
            </h1>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            <%--<td>
                                <asp:Label ID="lblCouponID" runat="server" CssClass="cssClassLabel" Text="Coupon ID:"></asp:Label>
                                <input type="text" id="txtCouponID" class="sfTextBoxSmall" />
                            </td>--%>
                            <td width="150">
                                <asp:Label ID="lblStatusName" runat="server" CssClass="cssClassLabel" Text="Status Name:"
                                    meta:resourcekey="lblStatusNameResource1"></asp:Label>
                                <input type="text" id="txtCouponStateName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="CouponStatusMgmt.SearchCouponStatus()">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxCouponStatusMgmtImage" src="" class="sfLocale" title="loading...." alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="tblCouponStatusDetails" cellspacing="0" cellpadding="0" bcoupon="0" width="100%">
                </table>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divEditCouponStatus" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblHeading" runat="server" Text="Edit Coupon Status ID:" meta:resourcekey="lblHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" bcoupon="0" width="100%" class="cssClassPadding">
                <tr>
                    <td width="10%">
                        <asp:Label ID="lblCouponStatusName" runat="server" Text="Coupon Status Name:" CssClass="cssClassLabel"
                            meta:resourcekey="lblCouponStatusNameResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtCouponStatusName" name="StatusName" class="sfInputbox required"
                            minlength="2" /><span id="csErrorLabel"></span><span class="cssClassRequired">*</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnBack">
                    <span><span class="sfLocale">Back</span></span></button>
            </p>
            <p>
                <button type="reset" id="btnReset">
                    <span><span class="sfLocale">Reset</span></span></button>
            </p>
            <p>
                <button type="button" id="btnSaveCouponStatus">
                    <span><span class="sfLocale">Save Status</span></span></button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<input id="hdnIsSystem" type="hidden" />