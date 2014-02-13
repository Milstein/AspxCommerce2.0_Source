<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AttributesSetManage.ascx.cs"
    Inherits="Modules_AspxAttributesManagement_AttributesSetManage" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxAttributesManagement
        });
    });
    var lblAttributeSetInfo = "<%= lblAttributeSetInfo.ClientID %>";
    //]]>
</script>

<!-- Grid -->
<div id="divAttribSetGrid">
    <td class="cssClassBodyContentBox">
        <div class="cssClassCommonBox Curve">
            <div class="cssClassHeader">
                <h1>
                    <asp:Label ID="lblAttrSetsGridHeading" runat="server" Text="Manage Attribute Sets"
                        meta:resourcekey="lblAttrSetsGridHeadingResource1"></asp:Label>
                </h1>
                <div class="cssClassHeaderRight">
                    <div class="sfButtonwrapper">
                        <p>
                            <button type="button" id="btnAddNewSet">
                                <span><span class="sfLocale">Add New Set</span></span></button>
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
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                                <td width="150">
                                    <label class="cssClassLabel sfLocale">
                                        Attribute Set Name:</label>
                                    <input type="text" id="txtSearchAttributeSetName" class="sfTextBoxSmall" />
                                </td>
                                <td width="150">
                                    <label class="cssClassLabel sfLocale">
                                        IsActive:</label>
                                    <select id="ddlIsActive" class="sfListmenu">
                                        <option value="" class="sfLocale">-- All -- </option>
                                        <option value="True" class="sfLocale">Yes </option>
                                        <option value="False" class="sfLocale">No </option>
                                    </select>
                                </td>
                                <td width="160">
                                    <label class="cssClassLabel sfLocale">
                                        Used In System:</label>
                                    <select id="ddlUserInSystem" class="sfListmenu">
                                        <option value="" class="sfLocale">--All--</option>
                                        <option value="True" class="sfLocale">Yes</option>
                                        <option value="False" class="sfLocale">No</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="sfButtonwrapper cssClassPaddingNone">
                                        <p>
                                            <button type="button" onclick="AttributeSetManage.SearchAttributeSetName()">
                                                <span><span class="sfLocale">Search</span></span></button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="loading">
                        <img id="ajaxAttributeSetMgmtImage" src="" class="sfLocale" alt="loading...." title="loadin...." />
                    </div>
                    <div class="log">
                    </div>
                    <table id="gdvAttributeSet" width="100%" border="0" cellpadding="0" cellspacing="0">
                    </table>
                </div>
            </div>
        </div>
</div>
<!-- End of Grid -->
<div id="divAttribSetAddForm" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblAttrSetsFormHeading" runat="server" Text="Add New Attribute Set"
                    meta:resourcekey="lblAttrSetsFormHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="cssClassPadding tdpadding">
                <tr>
                    <td width="10%">
                        <asp:Label ID="lblAttributeSetName" runat="server" Text="Name:" CssClass="cssClassLabel"
                            meta:resourcekey="lblAttributeSetNameResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" class="sfInputbox" name="" id="txtAttributeSetName" />
                        <span class="cssClassRequired sfLocale">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblType" runat="server" Text="Based On:" CssClass="cssClassLabel"
                            meta:resourcekey="lblTypeResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <select class="sfListmenu" name="" id="ddlAttributeSet">
                            <span class="cssClassRequired sfLocale">*</span>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button id="btnBackAdd" type="button">
                    <span><span class="sfLocale">Back</span></span>
                </button>
            </p>
            <p>
                <button id="btnSaveAttributeSet" type="button">
                    <span><span class="sfLocale">Save</span></span>
                </button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<div id="divAttribSetEditForm" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblAttributeSetInfo" runat="server" meta:resourcekey="lblAttributeSetInfoResource1"></asp:Label>
            </h2s>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                <tr>
                    <td width="50%">
                        <h2>
                            <asp:Label ID="lblAttributeNameTitle" runat="server" Text="Edit Set Name" CssClass="cssClassLabel"
                                meta:resourcekey="lblAttributeNameTitleResource1"></asp:Label>
                        </h2>
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                            <tr>
                                <td>
                                    <asp:Label ID="lblAttributeSetNameTitle" runat="server" Text="Name:" CssClass="cssClassLabel"
                                        meta:resourcekey="lblAttributeSetNameTitleResource1"></asp:Label>
                                    <span class="cssClassRequired">*</span>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="text" class="sfInputbox" name="" id="txtOldAttributeSetName" />
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td width="50%">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <h2>
                                        <asp:Label ID="lblGroups" runat="server" Text="Groups" CssClass="cssClassLabel" meta:resourcekey="lblGroupsResource1"></asp:Label>
                                    </h2>
                                </td>
                                <td>
                                    <div class="sfButtonwrapper cssClassPaddingNone">
                                        <p>
                                            <button type="button" id="btnAddNewGroup">
                                                <span><span class="sfLocale">Add New Group</span></span></button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="contextMenu" id="myMenu1">
                                        <ul>
                                            <li id="rename" class="cssClassSeparator">
                                                <img runat="server" id="imgRename" class="sfLocale" src="" alt="Rename" title="Rename" />
                                                <b>Rename</b></li>
                                            <li id="delete" class="cssClassSeparator">
                                                <img runat="server" id="imgDelete" class="sfLocale" src="" alt="Delete" title="Delete" />
                                                <b>Delete</b></li>
                                            <li id="remove" class="cssClassSeparator">
                                                <img runat="server" id="imgRemove" class="sfLocale" src="" alt="Remove" title="Remove" />
                                                <b>Remove</b></li>
                                        </ul>
                                    </div>
                                    <div id="dvTree" style="float: left;">
                                    </div>
                                    <%--<div>
                                                                                                            <a href="#" id="aCollapse" onclick="$('#tree').tree('closeNode', $('#tree').find('li'));">
                                                                                                                Collapse all</a> | <a href="#" id="aExpand" onclick="$('#tree').tree('openNode', $('#tree').find('li'));">
                                                                                                                    Expand all</a>
                                                                                                        </div>--%>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button id="btnBackEdit" type="button">
                    <span><span class="sfLocale">Back</span></span>
                </button>
            </p>
            <p>
                <button class="btnResetEdit" type="button">
                    <span><span class="sfLocale">Reset</span></span>
                </button>
            </p>
            <p>
                <button class="btnDeleteAttributeSet" type="button" style="display: none">
                    <span><span class="sfLocale">Delete</span></span>
                </button>
            </p>
            <p>
                <button class="btnUpdateAttributeSet" type="button">
                    <span><span class="sfLocale">Save</span></span>
                </button>
            </p>
        </div>
    </div>
</div>
