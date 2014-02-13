<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShipmentsManagement.ascx.cs"
    Inherits="Modules_AspxShipmentsManagement_ShipmentsManagement" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShipmentsManagement
        });
    });
    //<![CDATA[
    var btnExportToExcel='<%=btnExportToExcel.ClientID %>';
    //]]>
</script>

<div id="divShipmentsDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblOrderHeading" runat="server" Text="Shipments" 
                    meta:resourcekey="lblOrderHeadingResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                    <asp:Button ID="btnExportToExcel" class="cssClassButtonSubmit" runat="server" OnClick="Button1_Click"
                            Text="Export to Excel" 
                            OnClientClick="Shipments.ExportShipmentDataToExcel()" 
                            meta:resourcekey="btnExportToExcelResource1" />
                    </p>
                    <p>
                     <asp:Button ID="btnExportToCSV" runat="server" class="cssClassButtonSubmit" OnClick="Button2_Click"
                            Text="Export to CSV" OnClientClick="Shipments.ExportShipmentDataToCsv()" 
                            meta:resourcekey="btnExportToCSVResource1" />                       
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Shipping Method Name:</label>
                                <input type="text" id="txtShippingMethodName" class="sfTextBoxSmall" />
                            </td>
                   <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    OrderID:</label>
                                <input type="text" id="txtOrderID" class="sfTextBoxSmall" />
                            </td>
                     <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Ship To Name:</label>
                                <input type="text" id="txtSearchShipToName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnShipmentsSearch"">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxShipmentsMgmtImage" src=""  alt="loading...."/>
                </div>
                <div class="log">
                </div>
                <table id="gdvShipmentsDetails" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
                <table id="shpipmentExportData" cellspacing="0" cellpadding="0" border="0" width="100%" style="display:none">
                </table>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="HdnValue" runat="server" />
<div class="sfFormwrapper">
<div class="cssClassCommonBox  Curve" id="divShipmentsDetailForm" style="display:none">
    <%--<div class="cssClassHeader">
        <h2>
            <asp:Label ID="lblShipmentForm" runat="server" 
                meta:resourcekey="lblShipmentFormResource1"></asp:Label>
        </h2>
    </div>--%>
    <span class="cssClassLabel sfLocale"><b>Shipment Date:</b> </span><span id="shipmentDate"></span>
    <br />
<%--    <span class="cssClassLabel">Shipping Method Name: </span><span id="shippingMethodName">
    </span>--%>
    <br />
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2 class="sfLocale">
                Shipments Items:</h2>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <thead>
                        <tr class="cssClassHeading">
                            <td class="sfLocale cssClassTDHeading">
                                Item Name
                            </td>
                            <td class="sfLocale cssClassTDHeading">
                                SKU
                            </td>
                            <td class="sfLocale cssClassTDHeading">
                                ShippingAddress
                            </td>
                            <td class="sfLocale cssClassTDHeading">Shipping Method Name</td>
                           <td class="sfLocale" class="sfLocale">
                                Shipping Rate
                            </td>
                            <td>
                                Price
                            </td>
                            <td class="sfLocale cssClassTDHeading">
                                Quantity
                            </td>
                            <td class="sfLocale cssClassTDHeading">
                                Line Total
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <spam class="remarks"></spam>
            </div>
        </div>
        <%-- </div>--%></div>
    <div class="sfButtonwrapper">
        <p>
            <button type="button" id="btnShipmentBack">
                <span><span class="sfLocale">Back</span></span></button>
        </p>
    </div>
</div>
</div>
<asp:HiddenField ID="_csvShipmentHiddenValue" runat="server" />