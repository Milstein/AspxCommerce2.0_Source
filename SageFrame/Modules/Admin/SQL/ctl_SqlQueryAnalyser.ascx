<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_SqlQueryAnalyser.ascx.cs"
    Inherits="SageFrame.Modules.Admin.SQL.ctl_SqlQueryAnalyser" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<h1>
    <asp:Label ID="lblSqlQueryAnalyser" runat="server" Text="SQL Query Analyser" 
        meta:resourcekey="lblSqlQueryAnalyserResource1"></asp:Label>
</h1>
<div class="sfFormwrapper sfPadding">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <asp:Label ID="lblSelectSqlScriptFile" runat="server" CssClass="sfFormlabel" Text="SQL File"
                    ToolTip="Upload a file into the SQL Query window (Optional)." 
                    meta:resourcekey="lblSelectSqlScriptFileResource1"></asp:Label>
            </td>
        </tr>
        <tr>
            <td>
                <div class="sfButtonwrapper sfSql">
                    <asp:FileUpload ID="fluSqlScript" runat="server" 
                        meta:resourcekey="fluSqlScriptResource1" />
                    <asp:ImageButton ID="imbUploadSqlScript" runat="server" OnClick="imbUploadSqlScript_Click"
                        ToolTip="Load the selected file." 
                        ImageUrl='<%# GetTemplateImageUrl("imgload.png", true) %>' 
                        meta:resourcekey="imbUploadSqlScriptResource1" />
                    <asp:Label ID="lblUploadSqlScript" runat="server" Text="Load" 
                        AssociatedControlID="imbUploadSqlScript" 
                        meta:resourcekey="lblUploadSqlScriptResource1"></asp:Label>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <asp:TextBox ID="txtSqlQuery" runat="server" TextMode="MultiLine" Rows="10" CssClass="sfTextarea sfFullwidth"
                    Height="150px" EnableViewState="False" 
                    meta:resourcekey="txtSqlQueryResource1"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                <div class="sfButtonwrapper">
                    <asp:CheckBox ID="chkRunAsScript" runat="server" Text="Run as Script" TextAlign="Left"
                        ToolTip="include 'GO' directives; for testing &amp; update scripts" 
                        CssClass="sfCheckbox" meta:resourcekey="chkRunAsScriptResource1" />
                    <asp:ImageButton ID="imbExecuteSql" runat="server" Style="margin-left: 15px" OnClick="imbExecuteSql_Click"
                        ToolTip="can include {directives} and /*comments*/" 
                        ImageUrl='<%# GetTemplateImageUrl("imgexecute.png", true) %>' 
                        meta:resourcekey="imbExecuteSqlResource1" />
                    <asp:Label ID="lblExecuteSql" runat="server" Text="Execute" 
                        AssociatedControlID="imbExecuteSql" meta:resourcekey="lblExecuteSqlResource1"></asp:Label>
                </div>
            </td>
        </tr>
    </table>
</div>
<div class="sfGridwrapper" style="overflow:scroll;">
    <asp:GridView ID="gdvResults" runat="server" EnableViewState="False" 
        meta:resourcekey="gdvResultsResource1">
        <EmptyDataTemplate>
            <asp:Label ID="lblEmptyText" runat="server" 
                Text="The query did not return any data" 
                meta:resourcekey="lblEmptyTextResource1" />
        </EmptyDataTemplate>
        <RowStyle CssClass="sfOdd" />
        <AlternatingRowStyle CssClass="sfEven" />
    </asp:GridView>
</div>
