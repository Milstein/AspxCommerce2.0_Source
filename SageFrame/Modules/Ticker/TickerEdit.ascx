<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TickerEdit.ascx.cs" Inherits="Modules_Ticker_TickerEdit" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<%@ Register Namespace="SageFrameAJaxEditorControls" Assembly="SageFrame.Core" TagPrefix="CustomEditor" %>
<div id="divEditTicker">
    <div class="cssClassFormHeading">
        <asp:Label ID="lblHeading" runat="server" CssClass="sfFormlabel" Text=' Here you can add and update Ticker'
            meta:resourcekey="lblHeadingResource1" />
    </div>
    <div class="sfButtonwrapper" id="divAddBtnTicker" runat="server">
        <asp:ImageButton ID="ImgAddNewTicker" runat="server" ImageUrl="~/Templates/Default/images/admin/imgadd.png"
            OnClick="ImgAddNewTicker_Click" meta:resourcekey="ImgAddNewTickerResource1" />
        <asp:Label ID="lblAddNewDoc" runat="server" Text="Add Ticker News" AssociatedControlID="ImgAddNewTicker"
            meta:resourcekey="lblAddNewDocResource1"></asp:Label>
    </div>
    <div class="sfGridwrapper">
        <asp:GridView ID="gdvTickerData" runat="server" AllowPaging="True" AutoGenerateColumns="False"
            CssClass="sfGridwrapper" EmptyDataText="..........No Data Found.........."
            GridLines="None" Width="100%" PageSize="5" OnRowCommand="gdvTickerData_RowCommand"
            OnRowDataBound="gdvTickerData_RowDataBound" meta:resourcekey="gdvTickerDataResource1"
            OnPageIndexChanging="gdvTickerData_PageIndexChanging">
            <Columns>
                <asp:TemplateField HeaderText="Ticker Data" meta:resourcekey="TemplateFieldResource1">
                    <ItemTemplate>
                        <asp:Label ID="lblTickNews" runat="server" Font-Bold="True" Text='<%# Eval("TickerNews") %>'
                            meta:resourcekey="lblTickNewsResource1" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Start Date" meta:resourcekey="TemplateFieldResource2">
                    <ItemTemplate>
                        <asp:Label ID="lblGStartDate" runat="server" Font-Bold="True" Text='<%# Eval("StartDate") %>'
                            meta:resourcekey="lblGStartDateResource1" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="End Date" meta:resourcekey="TemplateFieldResource3">
                    <ItemTemplate>
                        <asp:Label ID="lblGEndDate" runat="server" Font-Bold="True" Text='<%# Eval("EndDate") %>'
                            meta:resourcekey="lblGEndDateResource1" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Is Active" meta:resourcekey="TemplateFieldResource4">
                    <ItemTemplate>
                        <asp:Label ID="lblIsActive" runat="server" Font-Bold="True" Text='<%# Eval("IsActive") %>'
                            meta:resourcekey="lblIsActiveResource1" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource5">
                    <ItemTemplate>
                        <asp:ImageButton ID="imgDelete" runat="server" CausesValidation="False" CommandArgument='<%# Eval("TickerID") %>'
                            CommandName="DeleteTicker" ImageUrl='<%# GetTemplateImageUrl("imgdelete.png", true) %>'
                            meta:resourcekey="imgDeleteResource1" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="cssClassColumnDelete" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource6">
                    <ItemTemplate>
                        <asp:ImageButton ID="imgEdit" runat="server" CausesValidation="False" CommandArgument='<%# Eval("TickerID") %>'
                            CommandName="EditTicker" ImageUrl='<%# GetTemplateImageUrl("imgedit.png", true) %>'
                            meta:resourcekey="imgEditResource1" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="cssClassColumnDelete" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="sfOdd" />
            <HeaderStyle CssClass="cssClassHeadingOne" />
            <PagerStyle CssClass="cssClassPageNumber" />
        </asp:GridView>
    </div>
    <div class="sfFormwrapper">
        <div id="divTickerForm" runat="server" visible="false">
            <table>
                <tr>
                    <td>
                        <asp:Label ID="lblTickerNews" runat="server" CssClass="sfFormlabel" meta:resourcekey="lblTickerNewsResource1"
                            Text="Ticker Text"></asp:Label>
                    </td>
                    <td>
                        <CustomEditor:Lite ID="txtTickerNews" runat="server" Height="100px" Width="475px"
                            meta:resourcekey="txtTickerNewsResource1" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblStartDate" runat="server" CssClass="sfFormlabel" meta:resourcekey="lblStartDateResource1"
                            Text="Published Date"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtStartDate" runat="server" CssClass="sfInputbox" meta:resourcekey="txtStartDateResource1"></asp:TextBox>
                        <cc1:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtStartDate"
                            Enabled="True">
                        </cc1:CalendarExtender>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblEndDate" runat="server" CssClass="sfFormlabel" meta:resourcekey="lblEndDateResource1"
                            Text="End Date"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtEndDate" runat="server" CssClass="sfInputbox" meta:resourcekey="txtEndDateResource1"></asp:TextBox>
                        <cc1:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtEndDate"
                            Enabled="True">
                        </cc1:CalendarExtender>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblTickerIsActive" runat="server" CssClass="sfFormlabel" meta:resourcekey="lblTickerIsActiveResource1"
                            Text="IsActive"></asp:Label>
                    </td>
                    <td>
                        <asp:CheckBox ID="chkTickerIsActive" runat="server" meta:resourcekey="chkTickerIsActiveResource1" />
                    </td>
                </tr>
            </table>
            <div class="sfButtonwrapper">
                <asp:ImageButton runat="server" ID="imgSaveTicker" OnClick="imgSaveTicker_Click"
                    Style="width: 14px" meta:resourcekey="imgSaveTickerResource1" />
                <asp:Label ID="lblSaveTicker" runat="server" Text="Save" AssociatedControlID="imgSaveTicker"
                    CssClass="cssClassHtmlViewCursor" meta:resourcekey="lblSaveTickerResource1"></asp:Label>
                <asp:ImageButton ID="imbCancelTicker" runat="server" OnClick="imbCancelTicker_Click"
                    Style="height: 16px;" meta:resourcekey="imbCancelTickerResource1" />
                <asp:Label ID="lblCancelTicker" runat="server" Text="Cancel" AssociatedControlID="imbCancelTicker"
                    CssClass="cssClassHtmlViewCursor" meta:resourcekey="lblCancelTickerResource1"></asp:Label>
            </div>
        </div>
    </div>
</div>
