<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CardTypeManagement.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxCardTypeManagement_CardTypeManagement" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
        moduleKey: AspxCardTypeManagement
        });
    });
    //<![CDATA[
    var lblCardTypeHeading = "<%= lblHeading.ClientID %>";
    var maxFileSize = '<%=MaxFileSize %>';
        //]]>
</script>

<div id="divCardTypeDetail">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblCardTypeHeading" runat="server" Text="Card Type" 
                    meta:resourcekey="lblCardTypeHeadingResource1"></asp:Label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNew">
                            <span><span class="sfLocale">Add New Card Type</span></span></button>
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
                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            <%--                            <td>
                                <asp:Label ID="lblCardTypeID" runat="server" CssClass="cssClassLabel" Text="Card Type ID:"></asp:Label>
                                <input type="text" id="txtCardTypeID" class="sfTextBoxSmall" />
                            </td>--%>
                            <td width="150">
                                <asp:Label ID="lblCardTypeName" runat="server" CssClass="cssClassLabel" 
                                    Text="Card Type Name:" meta:resourcekey="lblCardTypeNameResource1"></asp:Label>
                                <input type="text" id="txtSearchCardTypeName" class="sfTextBoxSmall" />
                            </td>
                            <td width="160">
                                <asp:Label ID="lblCardTypeIsActive" runat="server" CssClass="cssClassLabel" 
                                    Text="Is Active:" meta:resourcekey="lblCardTypeIsActiveResource1"></asp:Label>
                                <select id="ddlVisibitity" class="sfListmenu">
                                    <option value="" class="sfLocale">--All--</option>
                                    <option value="True" class="sfLocale">Yes</option>
                                    <option value="False" class="sfLocale">No</option>
                                </select>
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="cardTypeMgmt.SearchCardType()">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxCardTypeImageLoad" src=""  alt="loading...." class="sfLocale" title="loadng...."/>
                </div>
                <div class="log">
                </div>
                <table id="tblCardTypeDetails" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divEditCardType" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblHeading" runat="server" Text="Edit Card Type ID:" 
                    meta:resourcekey="lblHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                <tr>
                    <td width="10%">
                        <asp:Label ID="lblCardTypeName2" runat="server" Text="Card Type Name:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCardTypeName2Resource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtCardTypeName" name="CardTypeName" class="sfInputbox required" /><span class="cssClassRequired">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblCardImage" Text="Card Image:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCardImageResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input id="cardTypeImageBrowser" type="file" class="cssClassBrowse" />
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td class="cssClassTableRightCol">
                        <div id="divCardImage">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblCardAlternateText" runat="server" Text="AlternateText:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCardAlternateTextResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtCardAlternateText" class="sfInputbox" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblCardTypeIsActive2" runat="server" Text="Is Active:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCardTypeIsActive2Resource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <div id="divchkIsActiveCardType" class="cssClassCheckBox">
                            <input id="chkIsActiveCardType" type="checkbox" name="chkIsActive" />
                        </div>
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
                <button type="button" id="btnReset">
                    <span><span class="sfLocale">Reset</span></span></button>
            </p>
            <p>
                <button type="button" id="btnSaveCardType">
                    <span><span class="sfLocale"> Save </span></span></button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<input type="hidden" id="hdnPrevFilePath" />