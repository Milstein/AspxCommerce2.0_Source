<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LiveCart.ascx.cs" Inherits="Modules_AspxShoppingCartManagement_LiveCart" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShoppingCartManagement
        });
    });
    //<![CDATA[
    var timeToAbandonCart = '<%= TimeToAbandonCart%>';
    //]]>
</script>

<div id="divShoppingCartItems">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblCartItemGridHeading" runat="server" Text="Items In Carts" 
                    meta:resourcekey="lblCartItemGridHeadingResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <asp:Button ID="btnLiveCartExportToExcel" class="cssClassButtonSubmit" runat="server"
                            OnClick="btnLiveCartExportToExcel_Click" Text="Export to Excel" 
                            OnClientClick="LiveCart.ExportLiveCartDataToExcel()" 
                            meta:resourcekey="btnLiveCartExportToExcelResource1" />
                    </p>
                    <p>
                      <%--  <button type="button" id="btnLiveCartExportToCSV">
                            <span><span>Export to CSV</span></span></button>--%>
                            <asp:Button  ID="btnLiveCartExportToCSV" runat="server" class="cssClassButtonSubmit"
                            OnClick="ButtonLiveCart_Click" Text="Export to CSV" 
                            OnClientClick="LiveCart.ExportLiveCartCsvData()" 
                            meta:resourcekey="btnLiveCartExportToCSVResource1"/> 
                    </p>
                    <%--                    <p>
                        <button type="button" id="btnDeleteAllSearchTerm">
                            <span><span>Delete All Selected</span> </span>
                        </button>
                    </p>--%>
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
                                    Item Name:</label>
                                <input type="text" id="txtSearchItemName" class="sfTextBoxSmall" />
                            </td>
                         <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Customer Name</label>
                                <input type="text" id="txtCustomerName" class="sfTextBoxSmall" />
                            </td>
                           <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Quantity:</label>
                                <input type="text" id="txtQuantity" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnLiveSearch">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxLiveCartImage" src=""  alt="loading...." title="loading...."/>
                </div>
                <div class="log">
                </div>
                <table id="gdvShoppingCart" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
                 <table id="liveCartExportData" cellspacing="0" cellpadding="0" border="0" width="100%" style="display:none">
                </table>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hdnLiveCartValue" runat="server" />
<asp:HiddenField ID="_csvLiveCartHiddenValue" runat="server" />
