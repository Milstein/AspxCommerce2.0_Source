<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LocalPage.ascx.cs" Inherits="Modules_LocalPage_LocalPage" %>
<h1>
    <asp:Label ID="lblLocalPageEditor" runat="server" Text="Localize Menu"></asp:Label></h1>
<div class="sfFormwrapper sfPadding">
    <div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td width="15%">
                    <asp:Label ID="lblAvailableLocales" runat="server" CssClass="sfFormlabel" Text="Available Locales"
                        meta:resourcekey="lblAvailableLocalesResource1"></asp:Label>
                </td>
                <td width="30">
                    :
                </td>
                <td>
                    <asp:DropDownList ID="ddlAvailableLocales" runat="server" CssClass="sfListmenu" AutoPostBack="True"
                        OnSelectedIndexChanged="ddlAvailableLocales_SelectedIndexChanged" meta:resourcekey="ddlAvailableLocalesResource1">
                    </asp:DropDownList>
                    <asp:Image ID="imgFlag" runat="server" meta:resourcekey="imgFlagResource1" />
                </td>
            </tr>
        </table>
    </div>
    <div class="sfGridwrapper">
        <asp:GridView ID="gdvLocalPage" class="cssClassKeyValueGrid" DataKeyNames="PageID"
            runat="server" Width="100%" AutoGenerateColumns="False" OnSelectedIndexChanged="gdvLocalPage_SelectedIndexChanged"
            OnSelectedIndexChanging="gdvLocalPage_SelectedIndexChanging" OnPageIndexChanging="gdvLocalPage_PageIndexChanging">
            <Columns>
                <asp:TemplateField HeaderText="S.N">
                    <ItemTemplate>
                        <%#Container.DataItemIndex+1%>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Default Values">
                    <ItemTemplate>
                        <asp:Label ID="lbldefaultValue" runat="server" Text='<%# Eval("PageName") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Local Values" meta:resourcekey="TemplateFieldResource6">
                    <ItemTemplate>
                        <asp:TextBox ID="txtLocalPageName" Style="width: 350px" ToolTip="<%# Container.DataItemIndex+1 %>"
                            runat="server" CssClass="sfInputbox" Text='<%# Eval("LocalPageName") %>'></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Local Caption">
                    <ItemTemplate>
                        <asp:TextBox ID="txtLocalPageCaption" Style="width: 200px" ToolTip="<%# Container.DataItemIndex+1 %>"
                            runat="server" CssClass="sfInputbox" Text='<%# Eval("LocalPageCaption") %>'></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="sfEven" />
            <RowStyle CssClass="sfOdd" />
        </asp:GridView>
    </div>
    <div class="sfButtonwrapper">
        <asp:ImageButton ID="imbUpdate" runat="server" meta:resourcekey="imbUpdateResource1"
            OnClick="imbUpdate_Click" Style="height: 16px" />
        <asp:Label ID="lblUpdateResxFile" runat="server" Text="Save" CssClass="cssClassFormLabel"
            AssociatedControlID="imbUpdate" Style="cursor: pointer;" meta:resourcekey="lblUpdateResxFileResource1"></asp:Label>
        <asp:ImageButton ID="imbCancel" runat="server" meta:resourcekey="imbCancelResource1"
            OnClick="imbCancel_Click" />
        <asp:Label ID="Label2" runat="server" CssClass="cssClassFormLabel" Text="Back" AssociatedControlID="imbCancel"
            Style="cursor: pointer;" meta:resourcekey="Label2Resource1"></asp:Label>
    </div>
</div>
