<%@ Control Language="C#" AutoEventWireup="true" CodeFile="OrderedItems.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxItemsManagement_OrderedItems" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxItemsManagement
        });
    });
    //<![CDATA[
    
    //]]>
</script>

<div id="gdvOrderedItems_grid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Items Ordered" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <asp:Button ID="btnExportToExcel" CssClass="cssClassButtonSubmit" runat="server"
                            OnClick="Button1_Click" Text="Export to Excel" 
                            OnClientClick="OrderedItems.ExportDivDataToExcel()" 
                            meta:resourcekey="btnExportToExcelResource1" />
                    </p>
                    <p>
                        <%--<button type="button" id="btnExportToCSV">
                            <span><span>Export to CSV</span></span></button>--%>
                            <asp:Button  ID="btnExportToCSV" runat="server" class="cssClassButtonSubmit"
                            OnClick="ButtonOrderedItem_Click" Text="Export to CSV" 
                            OnClientClick="OrderedItems.ExportOrderedItemCsvData()" 
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
                                <label class="cssClassLabel sflocale">
                                    Item Name:</label>
                                <input type="text" id="txtSearchName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="OrderedItems.SearchItems()">
                                            <span><span class="sflocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxOrderedItemImage" src=""  alt="loading...." class="sfLocale"/>
                </div>
                <div class="log">
                </div>
                <table id="gdvOrderedItems" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
                <table id="OrderedItemsExportDataTbl" width="100%" border="0" cellpadding="0" cellspacing="0" style="display:none">
                </table>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="HdnValue" runat="server" />
<asp:HiddenField ID="_csvOrderedItemHiddenValue" runat="server" />
