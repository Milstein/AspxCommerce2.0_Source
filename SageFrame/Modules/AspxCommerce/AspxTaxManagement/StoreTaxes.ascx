<%@ Control Language="C#" AutoEventWireup="true" CodeFile="StoreTaxes.ascx.cs" Inherits="Modules_AspxCommerce_AspxTaxManagement_StoreTaxes" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxTaxManagement
        });
    });
    //<![CDATA[  
    
    //]]>
</script>
<div align="right">
<label class="sfLocale"><b>Show Tax Reports:</b></label>
<select id="ddlTaxReport">
<option value="1" class="sfLocale">Show Year Report</option>
<option value="2" class="sfLocale">Show Current Month Report</option>
<option value="3" class="sfLocale">Show Today's Report</option>
</select></div>
<div id="gdvStoreTax_grid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Tax Reports" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <asp:Button ID="btnExportToExcel" CssClass="cssClassButtonSubmit" runat="server"
                            OnClick="Button1_Click" Text="Export to Excel" 
                            OnClientClick="StoreTax.ExportDivDataToExcel()" 
                            meta:resourcekey="btnExportToExcelResource1" />
                    </p>
                    <p>
                    <%--    <button type="button" id="btnExportToCSV">
                            <span><span>Export to CSV</span></span></button>--%>
 <asp:Button  ID="btnExportToCSV" runat="server" class="cssClassButtonSubmit"
                            OnClick="ButtonTax_Click" Text="Export to CSV" 
                            OnClientClick="StoreTax.ExportTaxToCsvData()" 
                            meta:resourcekey="btnExportToCSVResource1"/> 
                   
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
                                    Tax Name:</label>
                                <input type="text" id="txtSearchName" class="sfTextBoxSmall" />
                            </td>
                            
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="StoreTax.SearchItems()">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxStoreTaxImage" src=""  alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvStoreTaxes" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
                <table id="storeTaxReportExportTbl" width="100%" border="0" cellpadding="0" cellspacing="0" style="display:none">
                </table>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="HdnValue" runat="server" />
<asp:HiddenField ID="_csvTaxHiddenValue" runat="server" />