﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_PortalManagement.ascx.cs"
    Inherits="SageFrame.Modules.Admin.PortalManagement.ctl_PortalManagement" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajax" %>
<%@ Register Src="~/Controls/sectionheadcontrol.ascx" TagName="sectionheadcontrol"
    TagPrefix="sfe" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $('#divPortalModulesLists input:checkbox:first').live("change", function() {
            if ($(this).is(":checked")) {
                $('#divPortalModulesLists input:checkbox:not(:disabled)').attr("checked", true);
            }
            else {
                $('#divPortalModulesLists input:checkbox:not(:disabled)').attr("checked", false);
            }
        });
    });
    //]]>
</script>

<div>
    <h1>
        <asp:HiddenField ID="hdnPortalIndex" runat="server" />
        <asp:Label ID="lblPortalManagement" runat="server" Text="Portal Management" meta:resourcekey="lblPortalManagementResource1"></asp:Label></h1>
    <asp:Panel ID="pnlPortal" runat="server" meta:resourcekey="pnlPortalResource1">
        <asp:HiddenField ID="hdnPortalID" runat="server" />
        <ajax:TabContainer CssClass="tabcontainer ajax__tab_xp" ID="TabContainerManagePortal"
            runat="server" ActiveTabIndex="0" meta:resourcekey="TabContainerManagePortalResource1"
            Visible="true">
            <ajax:TabPanel ID="TabPanelPortalAddEdit" runat="server" meta:resourcekey="TabPanelPortalAddEditResource1">
                <HeaderTemplate>
                    <asp:Label ID="lblAEP" runat="server" Text="Add/Edit Portal" meta:resourcekey="lblAEPResource1"></asp:Label>
                </HeaderTemplate>
                <ContentTemplate>
                    <p class="sfNote">
                        <asp:Label ID="lblBasicSettingsHelp1" runat="server" Text="In this section, you can add/edit portal details in your system."
                            meta:resourcekey="lblBasicSettingsHelp1Resource1"></asp:Label>
                    </p>
                    <div>
                        <div id="tblPortalAddEdit" runat="server">
                            <div class="sfFormwrapper" runat="server">
                                <table id="test" runat="server" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr runat="server">
                                        <td width="10%">
                                            <asp:Label ID="lblPortalName" runat="server" CssClass="sfFormlabel" Text="Portal Name"
                                                meta:resourcekey="lblPortalNameResource1"></asp:Label>
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtPortalName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtPortalNameResource1"
                                                MaxLength="20"></asp:TextBox>
                                                <asp:Label runat="server" ID = "lblDefaultPortal"></asp:Label>
                                            <asp:RequiredFieldValidator ID="rfvPortalName" runat="server" Display="Dynamic" ErrorMessage="Portal Name is required!"
                                                ControlToValidate="txtPortalName" ValidationGroup="PortalManagement"></asp:RequiredFieldValidator>
                                            <asp:RegularExpressionValidator ID="revPortalName" runat="server" ErrorMessage="Please enter only letter and numeric characters"
                                                ControlToValidate="txtPortalName" ValidationExpression="^([a-zA-Z0-9_\s\-]*)$"
                                                ValidationGroup="PortalManagement" Display="Dynamic" meta:resourcekey="revPortalNameResource1"></asp:RegularExpressionValidator>
                                            <asp:RegularExpressionValidator ID="rfvPortalNameSpace" runat="server" ControlToValidate="txtPortalName"
                                                ValidationGroup="PortalManagement" ErrorMessage="Spaces are not allowed!" ValidationExpression="[^\s]+"
                                                Display="Dynamic" />
                                        </td>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="sfButtonwrapper">
                        <asp:ImageButton ID="imgSave" runat="server" OnClick="imgSave_Click" ValidationGroup="PortalManagement"
                            meta:resourcekey="imgSaveResource1" />
                        <asp:Label ID="lblSave" runat="server" Text="Save" AssociatedControlID="imgSave"
                            Style="cursor: pointer;" meta:resourcekey="lblSaveResource1"></asp:Label>
                        <asp:ImageButton ID="imgCancel" runat="server" CausesValidation="False" OnClick="imgCancel_Click"
                            meta:resourcekey="imgCancelResource1" />
                        <asp:Label ID="lblCancel" runat="server" Text="Cancel" AssociatedControlID="imgCancel"
                            Style="cursor: pointer;" meta:resourcekey="lblCancelResource1"></asp:Label>
                    </div>
                </ContentTemplate>
            </ajax:TabPanel>
            <ajax:TabPanel ID="TabPanelPortalModulesManagement" runat="server" meta:resourcekey="TabPanelPortalModulesManagementResource1">
                <HeaderTemplate>
                    <asp:Label ID="lblPMM" runat="server" Text="Portal Modules Management" meta:resourcekey="lblPMMResource1"></asp:Label>
                </HeaderTemplate>
                <ContentTemplate>
                    <p class="sfNote">
                        <asp:Label ID="lblBasicSettingsHelp2" runat="server" Text="In this section, you can enable/disable portal modules in your the selected portal."
                            meta:resourcekey="lblBasicSettingsHelp2Resource1"></asp:Label></p>
                    <div>
                        <div id="tblPortalModulesManagement" runat="server">
                            <div class="sfGridwrapper" id="divPortalModulesLists">
                                <asp:GridView ID="gdvPortalModulesLists" runat="server" AutoGenerateColumns="False"
                                    AllowPaging="True" GridLines="None" Width="100%" EmptyDataText="Portal Modules not found"
                                    PageSize="20" OnPageIndexChanging="gdvPortalModulesLists_PageIndexChanging" OnRowCommand="gdvPortalModulesLists_RowCommand"
                                    OnRowDataBound="gdvPortalModulesLists_RowDataBound" OnRowDeleting="gdvPortalModulesLists_RowDeleting"
                                    OnRowEditing="gdvPortalModulesLists_RowEditing" OnRowUpdating="gdvPortalModulesLists_RowUpdating"
                                    meta:resourcekey="gdvPortalModulesListsResource1">
                                    <Columns>
                                        <asp:TemplateField HeaderText="ModuleName" meta:resourcekey="TemplateFieldResource1">
                                            <ItemTemplate>
                                                <asp:HiddenField ID="hdnIsAdmin" runat="server" Value='<%# Eval("IsAdmin") %>' />
                                                <asp:HiddenField ID="hdnModuleID" runat="server" Value='<%# Eval("ModuleID") %>' />
                                                <asp:Label ID="lblModuleName" runat="server" CssClass="sfFormlabel" Text='<%# Eval("FriendlyName") %>'
                                                    meta:resourcekey="lblModuleNameResource1"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Description" meta:resourcekey="TemplateFieldResource2">
                                            <ItemTemplate>
                                                <asp:Label ID="lblDescription" runat="server" Text='<%# Eval("Description") %>' meta:resourcekey="lblDescriptionResource1"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Version" meta:resourcekey="TemplateFieldResource3">
                                            <ItemTemplate>
                                                <asp:Label ID="lblVersion" runat="server" Text='<%# Eval("Version") %>' meta:resourcekey="lblVersionResource1"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField meta:resourcekey="TemplateFieldResource4">
                                            <ItemTemplate>
                                                <asp:HiddenField ID="hdnIsActive" runat="server" Value='<%# Eval("IsPortalModuleActive") %>' />
                                                <input id="chkBoxIsActiveItem" runat="server" class="cssCheckBoxIsActiveItem" type="checkbox" />
                                            </ItemTemplate>
                                            <HeaderTemplate>
                                                <input id="chkBoxIsActiveHeader" runat="server" class="cssCheckBoxIsActiveHeader"
                                                    type="checkbox"></input>
                                                </input>
                                                <asp:Label ID="lblIsActive" runat="server" meta:resourcekey="lblIsActiveResource1"
                                                    Text="Is Active"></asp:Label>
                                            </HeaderTemplate>
                                            <HeaderStyle CssClass="cssClassColumnIsActive" />
                                        </asp:TemplateField>
                                    </Columns>
                                    <AlternatingRowStyle CssClass="sfEven" />
                                    <HeaderStyle CssClass="cssClassHeadingOne" />
                                    <PagerStyle CssClass="sfPagination" />
                                    <RowStyle CssClass="sfOdd" />
                                </asp:GridView>
                            </div>
                            <div class="sfButtonwrapper">
                                <asp:ImageButton ID="imbBtnSaveChanges" runat="server" ToolTip="Save changes" OnClick="imbBtnSaveChanges_Click"
                                    meta:resourcekey="imbBtnSaveChangesResource1" />
                                <asp:Label ID="lblSaveChanges" runat="server" Text="Save changes" AssociatedControlID="imbBtnSaveChanges"
                                    Style="cursor: pointer;" meta:resourcekey="lblSaveChangesResource1"></asp:Label>
                                <asp:ImageButton ID="imgCancelList" runat="server" CausesValidation="False" OnClick="imgCancel_Click"
                                    meta:resourcekey="imgCancelListResource1" />
                                <asp:Label ID="Label1" runat="server" Text="Cancel" AssociatedControlID="imgCancelList"
                                    Style="cursor: pointer;" meta:resourcekey="Label1Resource1"></asp:Label>
                            </div>
                        </div>
                    </div>
                </ContentTemplate>
            </ajax:TabPanel>
        </ajax:TabContainer>
    </asp:Panel>
    <asp:Panel ID="pnlPortalList" runat="server" meta:resourcekey="pnlPortalListResource1">
        <div class="sfButtonwrapper">
            <asp:ImageButton ID="imgAdd" runat="server" CausesValidation="False" OnClick="imgAdd_Click"
                meta:resourcekey="imgAddResource1" />
            <asp:Label ID="lblAddPortal" runat="server" Text="Add Portal" AssociatedControlID="imgAdd"
                Style="cursor: pointer;" meta:resourcekey="lblAddPortalResource1"></asp:Label>
        </div>
        <div class="">
            <asp:DropDownList ID="ddlPortalName" runat="server" CssClass="sfListMenu">
            </asp:DropDownList>
            <asp:Button runat="server" ID="btnPortalSave" CssClass="sfBtn" Text="Make Parent Portal"
                OnClick="btnPortalSave_Click" />
        </div>
        <div class="sfGridwrapper">
            <asp:GridView ID="gdvPortal" runat="server" AutoGenerateColumns="False" Width="100%"
                GridLines="None" OnRowCommand="gdvPortal_RowCommand" DataKeyNames="PortalID,Name"
                OnRowDataBound="gdvPortal_RowDataBound" meta:resourcekey="gdvPortalResource1">
                <Columns>
                    <asp:TemplateField HeaderText="Portal Title" meta:resourcekey="TemplateFieldResource5">
                        <ItemTemplate>
                            <asp:LinkButton ID="lnkUsername" runat="server" CommandArgument='<%#Container.DataItemIndex%>'
                                CommandName="EditPortal" Text='<%# Eval("Name") %>' meta:resourcekey="lnkUsernameResource1"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText=" Start Up Page" meta:resourcekey="TemplateFieldResource6">
                        <ItemTemplate>
                            <asp:Label ID="lblDefaultPage" runat="server" Text='<%# Eval("DefaultPage") %>' meta:resourcekey="lblDefaultPageResource1"></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField meta:resourcekey="TemplateFieldResource7">
                        <ItemTemplate>
                            <asp:HiddenField ID="hdnPortalID" runat="server" Value='<%# Eval("PortalID") %>' />
                            <asp:HiddenField ID="hdnIsParent" runat="server" Value='<%# Eval("IsParent") %>' />
                            <asp:HiddenField ID="hdnSEOName" runat="server" Value='<%# Eval("SEOName") %>' />
                            <asp:HyperLink ID="hypPortalPreview" runat="server" Target="_blank" meta:resourcekey="hypPortalPreviewResource1"></asp:HyperLink>
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfPreview" />
                    </asp:TemplateField>
                    <asp:TemplateField meta:resourcekey="TemplateFieldResource8">
                        <ItemTemplate>
                            <asp:ImageButton ID="imgEdit" runat="server" CommandArgument='<%#Container.DataItemIndex%>'
                                CommandName="EditPortal" ToolTip="Edit Portal" CausesValidation="False" ImageUrl='<%# GetTemplateImageUrl("imgedit.png", true) %>'
                                meta:resourcekey="imgEditResource1" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfEdit" />
                    </asp:TemplateField>
                    <asp:TemplateField meta:resourcekey="TemplateFieldResource9">
                        <ItemTemplate>
                            <asp:ImageButton ID="imgDelete" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="DeletePortal" ImageUrl='<%# GetTemplateImageUrl("imgdelete.png", true) %>'
                                ToolTip="Delete the portal" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete this portal?');"
                                meta:resourcekey="imgDeleteResource1" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfDelete" />
                    </asp:TemplateField>
                </Columns>
                <AlternatingRowStyle CssClass="sfEven" />
                <RowStyle CssClass="sfOdd" />
            </asp:GridView>
        </div>
    </asp:Panel>
</div>
