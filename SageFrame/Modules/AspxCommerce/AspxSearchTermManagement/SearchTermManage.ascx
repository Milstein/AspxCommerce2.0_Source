<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SearchTermManage.ascx.cs"
    Inherits="Modules_AspxSearchTerm_SearchTermManage" %>

<script type="text/javascript">
$(function() {
        $(".sfLocale").localize({
            moduleKey: AspxSearchTermManagement
        });
       });
    //<![CDATA[
   var btnExportToExcel='<%=btnExportToExcel.ClientID %>';
    //]]>
</script>

<div id="divShowSearchTermDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Search Terms" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteAllSearchTerm">
                            <span><span class="sfLocale">Delete All Selected</span> </span>
                        </button>
                    </p>
                    <p>
                        <asp:Button ID="btnExportToExcel" class="cssClassButtonSubmit" runat="server" OnClick="Button1_Click"
                            Text="Export to Excel" meta:resourcekey="btnExportToExcelResource1" />
                    </p>
                    <p>
                        <asp:Button ID="btnExportToCSV" runat="server" class="cssClassButtonSubmit" Text="Export to CSV" 
                            onclick="btnExportToCSV_Click" OnClientClick="SearchTerm.GetSearchDataForExport()"/>
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
                                <label class="cssClassLabel sfLocale">
                                    Search Term:</label>
                                <input type="text" id="txtSearchTerm" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnSearchTerm">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxSearchTermImage" src=""  alt="loading...."/>
                </div>
                <div class="log">
                </div>
                <table id="gdvSearchTerm" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
                 <table id="searchDataExportTbl" cellspacing="0" cellpadding="0" border="0" width="100%" style="display:none">
                </table>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="HdnValue" runat="server" />
<asp:HiddenField ID="_csvHiddenValue" runat="server" />
