<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CouponPerUsersManage.ascx.cs"
    Inherits="Modules_AspxCouponManagement_CouponUserManageMent" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCouponManagement
        });
    });
    //<![CDATA[
    var couponPerSalesDataToExcel = "<%=btnExportDataToExcel %>";

    //]]>
</script>

<div id="divShowCouponTypeDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Coupon Per Customers" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteAllNonPendingCoupon">
                            <span><span class="sfLocale">Delete All Non Pending Coupon User(s)</span></span></button>
                    </p>
                    <p>
                        <asp:Button ID="btnExportDataToExcel" CssClass="cssClassButtonSubmit" runat="server"
                            OnClick="btnExportDataToExcel_Click" Text="Export to Excel" 
                            OnClientClick="couponPerUserMgmt.ExportCouponPerUserDivDataToExcel()" 
                            meta:resourcekey="btnExportDataToExcelResource1" />
                    </p>
                    <p>
                        <asp:Button ID="btnExportToCSV" runat="server" class="cssClassButtonSubmit" OnClick="ButtonCouponPerUser_Click"
                            Text="Export to CSV" 
                            OnClientClick="couponPerUserMgmt.ExportCouponPerUserToCsvData()" 
                            meta:resourcekey="btnExportToCSVResource1" />
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Coupon Code:</label>
                                <input type="text" id="txtSearchCouponCode" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    UserName:</label>
                                <input type="text" id="txtSearchUserName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Coupon Status:</label>
                                <select id="ddlCouponStatus" class="sfListmenu">
                                    <option value="0" class="sfLocale">--All--</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Valid From:</label>
                                <input type="text" id="txtValidFrom" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Valid To:</label>
                                <input type="text" id="txtValidTo" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="couponPerUserMgmt.SearchCouponCode()">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxCouponPerUserImageLoad" src="" class="sfLocale" alt="loading...." title="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvCouponUser" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
                <table id="CouponUserExportDataTbl" width="100%" border="0" cellpadding="0" cellspacing="0" style="display:none">
                </table>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdnCouponUserID" />
<asp:HiddenField ID="HdnValue" runat="server" />
<asp:HiddenField ID="_csvCouponPerUserHiddenValue" runat="server" />
