<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GiftCardsItems.ascx.cs" Inherits="Modules_AspxCommerce_AspxItemsManagement_GiftCardsItems" %>

<div id="gdvLowStockItems_grid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Gift Card Items" meta:resourcekey="lblTitleResource1" 
                   ></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <asp:Button ID="btnExportToExcel" CssClass="cssClassButtonSubmit" runat="server"
                            OnClick="Button1_Click" Text="Export to Excel" meta:resourcekey="btnExportToExcelResource1" 
                              />
                    </p>
                    <p>
                      <%--  <button type="button" id="btnExportToCSV">
                            <span><span>Export to CSV</span></span></button>--%>
                            <asp:Button  ID="btnExportToCSV" runat="server" class="cssClassButtonSubmit"
                            OnClick="ButtonLowStock_Click" Text="Export to CSV" 
                            OnClientClick="giftCardReport().GetReport()" meta:resourcekey="btnExportToCSVResource1" 
                            /> 
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
                        <tr><td width="100"><label class="sflocale">Gift Card Type:</label></td><td><span id="giftCardType"></span></td></tr>
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="150">
                                <label class="cssClassLabel sflocale">
                                   Item Name:</label>
                                <input type="text" id="txtItemName" class="sfTextBoxSmall" />
                            </td>
                       <td width="150">
                                <label class="cssClassLabel sflocale">
                                    SKU:</label>
                                <input type="text" id="txtsku" class="sfTextBoxSmall" />
                            </td>
                  <td width="150">
                                <label class="cssClassLabel sflocale">
                                    From Date:</label>
                                 <input type="text" id="txtFromDate" class="sfTextBoxSmall" />
                            </td>
                       <td width="150">
                                <label class="cssClassLabel sflocale">
                                    To Date:</label>
                                 <input type="text" id="txtToDate" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnGetReport">
                                            <span><span class="sflocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxLowStockItemImage" src=""  alt="loading...." title="loading...." class="sfLocale"/>
                </div>
                <div class="log">
                </div>
                <table id="gdvGiftCardReport" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
                 <table id="gdvGiftCardReportExportDataTbl" width="100%" border="0" cellpadding="0" cellspacing="0" style="display:none">
                </table>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="HdnValue" runat="server" />
<asp:HiddenField ID="_csvGiftCardHiddenCsv" runat="server" />