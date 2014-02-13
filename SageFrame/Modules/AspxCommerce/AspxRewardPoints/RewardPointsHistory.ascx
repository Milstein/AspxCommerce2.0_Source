<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RewardPointsHistory.ascx.cs"
    Inherits="Modules_AspxCommerce_RewardPoints_RewardPointsHistory" %>

<script type="text/javascript" language="javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxRewardPoints
        });
    });
    var RewardPointsModulePath = '<%=AspxRewardPointsModulePath%>';
    var lblRewardPointsRuleEdit = "<%=lblRewardPointsRuleEdit.ClientID%>";
    //]]>
</script>

<div id="dvEditView" class="sfFormwrapper" style="display: none;">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <span class="sfLocale">Reward Points</span>
            </h1>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <table cellspacing="0" cellpadding="0" border="0" width="50%">
                    <thead>
                        <tr class="cssClassHeading">
                            <td class="sfLocale cssClassheader">
                                Reward Points History
                            </td>
                            <td class="sfLocale cssClassheader">
                                Manage Settings
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="cssClasscontent">
                                <button type="button" id="btnView" class="cssClassView">
                                    <span class="sfLocale">View</span></button>
                            </td>
                            <td class="cssClasscontent">
                                <button type="button" id="btnEdit" class="cssClassEdit">
                                    <span class="sfLocale">Edit</span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div id="dvRewardPointsHistory" class="cssClassdvRewardPointsHistory" style="display: none;">
    <div id="gdvRewardPointsHistory_grid" class="cssClassgdvRewardPointsHistory_grid">
        <div class="cssClassCommonBox Curve">
            <div class="cssClassHeader">
                <h2>
                    <asp:Label ID="lblHistory" runat="server" CssClass="sfLocale" Text="Reward Points History :"
                        meta:resourcekey="lblHistoryResource1"></asp:Label>
                </h2>
                <div class="cssClassClear">
                </div>
            </div>
            <div class="sfGridwrapper">
                <div class="sfGridWrapperContent">
                    <div class="cssClassSearchPanel sfFormwrapper">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="150">
                                    <label class="sfFormlabel sfLocale">
                                        Customer Name :</label><input type="text" id="txtCustomerName" class="cssClassTextBox" />
                                </td>
                                <td width="150">
                                    <label class="sfFormlabel sfLocale">
                                        Customer Email :</label><input type="text" id="txtEmail" class="cssClassTextBox" />
                                </td>
                                <td>
                                    <div class="sfButtonwrapper cssClassPaddingNone">
                                        <p>
                                            <button type="button" id="btnSearchHistory">
                                                <span><span class="sfLocale">Search</span></span></button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <table id="gdvRewardPointsHistory" width="100%" border="0" cellpadding="0" cellspacing="0">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="Div2" class="cssClassBtnBackEdit">
        <button type="button" id="btnBackHistory" class="cssClassEdit">
            <span class="sfLocale">Back</span></button>
    </div>
</div>
<div id="dvRewardPointsHistoryByCustomer" class="cssClassdvRewardPointsHistoryByCustomer"
    style="display: none;">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblBalance" runat="server" CssClass="sfLocale" Text="Balance :" meta:resourcekey="lblBalanceResource1"></asp:Label>
            </h2>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div id="dvPoints">
                    <span id="spanTotalRewardPointsHeading" class="sfLocale cssClassSpanHeadings" style="font-weight: bold;">
                        Net Points: &nbsp;</span><span id="spanNetPoints" style="font-weight: bold;"></span>
                </div>
                <div id="dvPointsAmount">
                    <span id="spanTotalRewardAmountHeading" class="sfLocale cssClassSpanHeadings" style="font-weight: bold;">
                        Net Amount:&nbsp; </span><span id="spanNetAmount" class="cssClassFormatCurrency"
                            style="font-weight: bold;"></span>
                </div>
            </div>
        </div>
    </div>
    <div id="gdvRewardPointsHistoryByCustomer_grid" class="cssClassgdvRewardPointsHistoryByCustomer_grid">
        <div class="cssClassCommonBox Curve">
            <div class="cssClassHeader">
                <h2>
                    <asp:Label ID="Label1" runat="server" CssClass="sfLocale" Text="Reward Points History"
                        meta:resourcekey="lblHistoryResource1"></asp:Label>
                </h2>
                <div class="cssClassClear">
                </div>
            </div>
            <div class="sfGridwrapper">
                <div class="sfGridWrapperContent">
                    <div class="cssClassSearchPanel sfFormwrapper">
                        <table width="100%" breturn="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td style="text-align: right; min-width: 100px;">
                                    <label class="sfFormlabel sfLocale">
                                        Date Added:</label>
                                    <input type="text" id="txtDateFrom" class="sfTextBoxSmall" />
                                </td>
                                <td>
                                    <div class="sfButtonwrapper cssClassPaddingNone">
                                        <p>
                                            <button type="button" onclick="RewardPointsHistory.SearchRewards()">
                                                <span><span class="sfLocale">Search</span></span></button>
                                        </p>
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
            <div class="sfGridwrapper">
                <div class="sfGridWrapperContent">
                    <table id="gdvRewardPointsHistoryByCustomer" width="100%" border="0" cellpadding="0"
                        cellspacing="0">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="Div4" class="cssClassBtnBackEdit">
        <button type="button" id="btnBackToHistory" class="cssClassEdit">
            <span class="sfLocale">Back</span></button>
    </div>
</div>
<div id="dvEditRewardPoints" class="sfFormwrapper" class="cssClassdvEditRewardPoints"
    style="display: none;">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblGeneralSettings" runat="server" CssClass="sfLocale" Text="Manage Settings :"
                    meta:resourcekey="lblGeneralSettingsResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <table id="gdvRewadPointsGeneral" width="50%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="sfLocale" width="25%">
                            <span class="sfFormlabel sfLocale">Enable Reward Points :</span>
                        </td>
                        <td>
                            <input type="checkbox" id="chkEnableRewardPoints" name="enableRewardPoints" class="cssClassCheckBox" />
                        </td>
                    </tr>
                    <tr class="noBg">
                        <td class="sfLocale">
                            <div class="cssClassHeader">
                                <h2>
                                    <span class="sfFormlabel sfLocale">Exchange Rate Calculation :</span>
                                </h2>
                            </div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr class="noBg">
                        <td class="sfLocale" style="text-align: right !important;">
                            <span class="sfFormlabel sfLocale">Reward Points =</span>
                        </td>
                        <td class="sfLocale">
                            <span class="sfFormlabel sfLocale">Reward Amount (<span id="spanCurrency"></span>)</span>
                        </td>
                    </tr>
                    <tr class="noBg">
                        <td style="text-align: right !important;">
                            <input type="text" id="txtRewardPoints" name="RewardPoints" class="sfInputbox sfShortInputbox required number"
                                datatype="Integer" maxlength="5" />
                            =
                        </td>
                        <td>
                            <input type="text" id="txtRewardAmount" name="RewardAmount" class="sfInputbox sfShortInputbox required number"
                                datatype="Integer" maxlength="5" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td class="sfLocale">
                            <span class="sfFormlabel" class="sfLocale" class="sfLocale"">Awarded Order Status :</span>
                        </td>
                        <td>
                            <select id="ddlOrderStatus" name="ddlOrderStatus" class="sfListmenu required" multiple="multiple">
                                <option value="0" class="sfLocale">--All--</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="sfLocale">
                            <span class="sfFormlabel sfLocale">Cancelled Order Status :</span>
                        </td>
                        <td>
                            <select id="SelectOrderStatus" name="SelectOrderStatus" class="sfListmenu required"
                                multiple="multiple">
                                <option value="0" class="sfLocale">--All--</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="sfLocale">
                            <span class="sfFormlabel sfLocale">Reward Points Expires in (Days) :</span>
                        </td>
                        <td>
                            <input type="text" id="txtRewardPointsExpiresInDays" name="RewardPointsExpiresInDays"
                                class="sfInputbox required number" datatype="Integer" maxlength="5" />
                        </td>
                    </tr>
                    <tr>
                        <td class="sfLocale">
                            <span class="sfFormlabel sfLocale">Minimum balance (Reward Points) in order to redeem
                                :</span>
                        </td>
                        <td>
                            <input type="text" id="txtMinRedeemBalance" name="MinRedeemBalance" class="sfInputbox required number"
                                datatype="Integer" maxlength="5" />
                        </td>
                    </tr>
                    <tr>
                        <td class="sfLocale">
                            <span class="sfFormlabel sfLocale">Capped Balance (Reward Points) :</span>
                        </td>
                        <td>
                            <input type="text" id="txtCappedBalance" name="CappedBalance" class="sfInputbox required number"
                                datatype="Integer" maxlength="5" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <button type="button" id="btnSave" class="cssClassEdit">
                                <span class="sfLocale">Save</span></button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="cssClassClear">
    </div>
    <br />
    <br />
    <div id="gdvRewardPointsSettings_grid" class="cssClassgdvRewardPointsSettings_grid">
        <div class="cssClassCommonBox Curve">
            <div class="cssClassHeader">
                <h2>
                    <asp:Label ID="lblTitle" runat="server" CssClass="sfLocale" Text="Manage Reward Rules :"
                        meta:resourcekey="lblTitleResource1"></asp:Label>
                </h2>
                <div class="cssClassHeaderRight">
                    <div class="sfButtonwrapper">
                        <p>
                            <button type="button" id="btnAddRewardRule" class="cssClassButtonSubmit">
                                <span class="sfLocale">Add New Reward Rule</span></button>
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
                                <td width="150">
                                    <label class="sfFormlabel sfLocale">
                                        Reward Rule:</label><input type="text" id="txtRewardRule" class="cssClassTextBox" />
                                </td>
                                <td width="150">
                                    <label class="sfFormlabel sfLocale">
                                        IsActive:</label>
                                    <select id="ddlIsActive" class="sfListmenu">
                                        <option value="" class="sfLocale">--All--</option>
                                        <option value="0" class="sfLocale">True</option>
                                        <option value="1" class="sfLocale">False</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="sfButtonwrapper cssClassPaddingNone">
                                        <p>
                                            <button type="button" id="btnSearchRewardRule">
                                                <span><span class="sfLocale">Search</span></span></button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="loading">
                        <img id="ajaxRewardPointsSettingImage" src="" alt="loading...." />
                    </div>
                    <div class="log">
                    </div>
                    <table id="gdvRewadPointsSetting" width="100%" border="0" cellpadding="0" cellspacing="0">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="dvBtnBackEdit" class="cssClassBtnBackEdit">
        <button type="button" id="btnBackEdit" class="cssClassEdit">
            <span class="sfLocale">Back</span></button>
    </div>
</div>
<div id="divLoadUserControl" class="cssClasMyAccountInformation">
    <div class="cssClassMyDashBoardInformation">
    </div>
</div>
<div id="dvRewardPointsEditForm" class="sfFormwrapper" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblRewardPointsRuleEdit" CssClass="sfLocale" runat="server" meta:resourcekey="lblRewardPointsRuleEditResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <table border="0" width="50%" id="tblRewardPointsRuleEdit" class="cssClassPadding">
                    <tr>
                        <td>
                            <asp:Label ID="lblRewardRuleNameEdit" Text="Reward Rule Name:" runat="server" CssClass="sfFormlabel"
                                meta:resourcekey="lblRewardRuleNameEditResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtRewardRuleNameEdit" name="RewardRuleNameEdit" class="sfInputbox required " />
                            <input type="hidden" id="hdnRewardRuleID" />
                            <input type="hidden" id="hdnRewardRuleIDs" />
                            <input type="hidden" id="hdnRewardRuleSettingID" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblRewardRuleTypeEdit" Text="Reward Rule Type:" runat="server" CssClass="sfFormlabel"
                                meta:resourcekey="lblRewardRuleTypeEditResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <select id="ddlRewardRule" class="sfListmenu">
                                <option value="0" class="sfLocale">--All--</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblRewardPointsEdit" Text="Reward Points:" runat="server" CssClass="sfFormlabel"
                                meta:resourcekey="lblRewardPointsEditResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtRewardPointsEdit" name="RewardPointsEdit" class="sfInputbox sfShortInputbox required number"
                                datatype="Integer" maxlength="5" />
                        </td>
                    </tr>
                    <tr id="trPAmount" style="display: none;">
                        <td>
                            <asp:Label ID="lblPurchaseAmountEdit" Text="On Purchase of $:" runat="server" CssClass="sfFormlabel"
                                meta:resourcekey="lblPurchaseAmountEditResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtPurchaseAmountEdit" name="PurchaseAmountEdit" class="sfInputbox sfShortInputbox required number"
                                datatype="Integer" maxlength="5" />
                        </td>
                    </tr>
                    <tr id="isActive">
                        <td>
                            <asp:Label ID="lblIsActive" Text="Is Active:" runat="server" CssClass="sfFormlabel"
                                meta:resourcekey="lblIsActiveResource1"></asp:Label>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="checkbox" id="chkIsActiveEdit" class="sfCheckBox" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <div class="sfButtonwrapper">
                                <p>
                                    <button type="button" id="btnCancelRewardPointsRuleEdit">
                                        <span><span class="sfLocale">Cancel</span></span></button>
                                </p>
                                <p>
                                    <button type="button" id="btnSubmitRewardPointsRuleEdit">
                                        <span><span class="sfLocale">Save</span></span></button>
                                </p>
                                <p id="delete">
                                    <button type="button" id="btnDeleteRewardPointsRuleEdit">
                                        <span><span class="sfLocale">Delete</span></span></button>
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
    <input type="hidden" id="hdnRewardRuleIDView" />
    <input type="hidden" id="hdnRewardRuleName" />
</div>
