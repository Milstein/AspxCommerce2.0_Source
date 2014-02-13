﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PendingTags.ascx.cs" Inherits="Modules_AspxCommerce_AspxTagsManagement_PendingTags" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxTagsManagement
        });
    });
    //<![CDATA[
    var lblEditTagDetails = '<%=lblEditTagDetails.ClientID %>';
    var lblTagViewHeading = '<%=lblPendingTagViewHeading.ClientID %>';
    //]]>
</script>

<div class="cssClassBodyContentWrapper" id="divShowTagDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Pending Tags" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnApproveAllSelected">
                            <span><span class="sfLocale">Approve All Selected</span></span></button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                        <td width="150"> 
                                <label class="cssClassLabel class="sfLocale"">
                                    Tag:</label>
                                <input type="text" id="txtSearchTag" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnSearchPendingTags">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxPendingTagsImage" src=""  alt="loading...."/>
                </div>
                <div class="log">
                </div>
                <table id="gdvTags" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<div class="cssClassBodyContentWrapper" id="divEditTag" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblEditTagDetails" runat="server" 
                    meta:resourcekey="lblEditTagDetailsResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                <tr>
                    <td>
                        <asp:Label ID="lblTagTitle" runat="server" Text="Tag:" CssClass="cssClassLabel" 
                            meta:resourcekey="lblTagTitleResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtTag" name="Tag" class="sfInputbox required" maxlength="20" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblStatus" runat="server" Text="Status:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblStatusResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <select id="selectStatus" class="sfListmenu">
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button id="btnSaveTag" type="button">
                    <span><span class="sfLocale">Save</span></span></button>
            </p>
            <p>
                <button id="btnCancel" type="button">
                    <span><span class="sfLocale">Cancel</span></span></button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
    <input type="hidden" id="hdnItemTagID" />
    <input type="hidden" id="hdnTag" />
    <input type="hidden" id="hdnStatusID" />
</div>
<div class="divTagedItemsDetails" id="divTagedItemsDetails" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblPendingTagViewHeading" runat="server" 
                    meta:resourcekey="lblPendingTagViewHeadingResource1"></asp:Label></h2>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <thead>
                        <tr class="cssClassHeading">
                            <td class="sfLocale">
                                Item Image
                            </td>
                            <td class="sfLocale">
                                Item Name
                            </td>
                            <td class="sfLocale">
                                SKU
                            </td>
                            <td class="sfLocale">
                                Price
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnBack">
                    <span><span class="sfLocale">Back</span></span></button>
            </p>
        </div>
    </div>
</div>
