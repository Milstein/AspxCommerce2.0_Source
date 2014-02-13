<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PaymentGatewayManagement.ascx.cs"
    Inherits="Modules_PaymentGatewayManagement_PaymentGatewayManagement" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxPaymentGateWayManagement
        });
    });
    var errorCode = '<%=ErrorCode %>';
    var lblLoadMessage = "<%=lblLoadMessage.ClientID %>";
    var lblPaymentGateWay = "<%=lblPaymentGateWay.ClientID %>";
    var lblPaymentGatewayEdit = "<%=lblPaymentGatewayEdit.ClientID %>";
    var urlPath = "<%=pageURL %>";
    var lblOrderDetailForm = "<%=lblOrderDetailForm.ClientID %>";
    var maxFilesize = '<%=MaxFileSize %>';
    var destination = '<%=LogoDestination %>';
    //]]>
</script>

<div id="divPaymentGateWayManagement">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="PaymentGatewayManagement" runat="server" Text="Payment Methods" 
                    meta:resourcekey="PaymentGatewayManagementResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper" style="display:none;">
                    <p>
                        <button type="button" id="btnDeletePayMethod">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNewPayGateWay">
                            <span><span class="sfLocale">Add New Payment Method</span></span></button>
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
                                    Payment Gateway Name:</label>
                                <input type="text" id="txtSearchPaymentGateWayName" class="sfTextBoxSmall" />
                            </td>
                            <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    IsActive:</label>
                                <select id="ddlIsActive" class="sfListmenu">
                                    <option value="" class="sfLocale">--All--</option>
                                    <option value="0" class="sfLocale">True</option>
                                    <option value="1" class="sfLocale">False</option>
                                </select>
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnSearchPaymentgateway">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxPaymentGateWayImage2" src="" title="loading...." alt="loading...." class="sfLocale"/>
                </div>
                <div class="log">
                </div>
                <table id="gdvPaymentGateway" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divPaymentGateWayForm" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblPaymentGateWay" runat="server" 
                    meta:resourcekey="lblPaymentGateWayResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table border="0" width="100%" id="tblPaymentGatewayForm" class="cssClassPadding">
                <tr>
                    <td>
                        <asp:Label ID="lblLoadMessage" runat="server" CssClass="cssClassRed" 
                            meta:resourcekey="lblLoadMessageResource1"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:FileUpload ID="fuPGModule" runat="server" 
                            meta:resourcekey="fuPGModuleResource1" />
                        <asp:Panel ID="pnlRepair" runat="server" meta:resourcekey="pnlRepairResource1">
                            <asp:CheckBox ID="chkRepairInstall" runat="server" CssClass="cssClassCheckBox" 
                                meta:resourcekey="chkRepairInstallResource1" />
                            <asp:Label ID="lblRepairInstallHelp" runat="server" 
                                CssClass="cssClassHelpTitle" meta:resourcekey="lblRepairInstallHelpResource1" />
                        </asp:Panel>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input id="btnBackFromAddNetPaymentForm" type="button" value="Back" class="cssClassButtonSubmit" />
                        <asp:Button ID="btnAddNew" runat="server" Text="Save" OnClick="btnAddNew_Click" 
                            class="cssClassButtonSubmit" meta:resourcekey="btnAddNewResource1" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>

<div id="divPaymentGatewayEditForm" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblPaymentGatewayEdit" runat="server" 
                    meta:resourcekey="lblPaymentGatewayEditResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table border="0" width="100%" id="tblPaymentGatewayEdit" class="cssClassPadding">
                <tr>
                    <td width="10%">
                        <asp:Label ID="lblGatewayName" Text="Payment Gateway Name:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblGatewayNameResource1"></asp:Label>
                 
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtPaymentGatewayName" class="sfInputbox" />       <span class="cssClassRequired">*</span>
                    </td>
                </tr>
                <tr id="isActive" style="display:none;">
                    <td>
                        <asp:Label ID="lblIsActive" Text="Is Active:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblIsActiveResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="checkbox" id="chkIsActive" class="sfCheckBox" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblIsUse" Text="Is Use:" runat="server" CssClass="cssClassLabel" 
                            meta:resourcekey="lblIsUseResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="checkbox" id="chkIsUse" class="sfCheckBox" />
                    </td>
                </tr>
                <tr>
                    <td>  <asp:Label ID="lblGateWayLogo" Text="GateWay Logo:" runat="server" CssClass="cssClassLabel" 
                           ></asp:Label></td>
                <td>
                       <input type="file" id="fuLogo" class="sfUploadfile" />
                </td>
                </tr>
                <tr>
                    <td></td>
                    <td id="logoPreview"></td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnCancelPayEdit">
                    <span><span class="sfLocale">Cancel</span></span></button>
            </p>
            <p>
                <button type="button" id="btnSubmitPayEdit">
                    <span><span class="sfLocale">Save</span></span></button>
            </p>
             <p id="delete" style="display:none;">
                <button type="button" id="btnDeletePay">
                <span><span class="sfLocale">Delete</span></span></button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
  <input type="hidden" id="hdnPaymentGatewayIDView" />
  <input type="hidden" id="hdnPaymentGatewayID" />
</div>
<div id="popuprel2" class="popupbox adminpopup" style="display:none">
</div>
<div id="divPaymentEdit">
</div>
<div id="divOrderDetailForm" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblOrderDetailForm" runat="server" Text="Order Details" 
                    meta:resourcekey="lblOrderDetailFormResource1"></asp:Label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <asp:Button ID="btnSavePDFForm2" runat="server" Text="Save As Pdf" OnClick="btnSavePDFForm2_Click"
                            OnClientClick="PaymentGatewayManage.GenerateOrderDetailsPDF()" 
                            CssClass="cssClassButtonSubmit" meta:resourcekey="btnSavePDFForm2Resource1" />
                    </p>
                    <p>
                        <button type="button" id="btnPrint">
                            <span><span class="sfLocale">Print</span></span></button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
        <div id="divPrintOrderDetail" class="sfFormwrapper">
            <div class="cssItemHeadingDetail">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tbody>                    
                        <tr >
                            <td valign="top">
                                <br />
                                <b><span class="cssClassLabel sfLocale">Ordered Date: </span></b><span id="OrderDate"></span>
                                <br />
                                <b><span class="cssClassLabel sfLocale">Store Name: </span></b><span id="storeName"></span><br />
                                <b><span class="cssClassLabel  sfLocale">Store Description: </span></b><span id="storeDescription"></span><br />
                                <b><span class="cssClassLabel sfLocale">Payment Gateway Type: </span></b><span id="PaymentGatewayType">
                                </span>
                                <br />
                                <b><span class="cssClassLabel sfLocale">Payment Method: </span></b><span id="PaymentMethod">
                                </span>
                            </td>
                            <td>
                                <br />
                                <div class="cssClassLabel" id="divBillingAddressDetail">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cssClassCommonBox Curve">
                <div class="cssClassHeader">
                    <h2 style="font-size:14px" class="sfLocale">
                        Ordered Items:</h2>
                </div>
                <div class="sfGridwrapper">
                    <div id="orderItemDetail" class="sfGridWrapperContent">
                        <span class="remarks"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnBackOrder">
                    <span><span class="sfLocale">Back</span></span></button>
            </p>
        </div>
    </div>
</div>
<asp:HiddenField ID="HdnValue" runat="server" />
<div id="divPaymentGateWayManagementEdit" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblPaymentGatewayManagement" runat="server" Text="Order Lists" 
                    meta:resourcekey="lblPaymentGatewayManagementResource1"></asp:Label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnBackPaymentEdit">
                            <span><span class="sfLocale">Back</span></span></button>
                    </p>
                  <%--  <p>
                        <button type="button" id="Button1">
                            <span><span>Delete All Selected</span></span></button>
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
                                    Bill To Name:</label>
                                <input type="text" id="txtSearchBillToName" class="sfTextBoxSmall" />
                            </td>
                            <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Ship To Name:</label>
                                <input type="text" id="txtSearchShipToName" class="sfTextBoxSmall" />
                            </td>
                                    <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Order Status:</label>
                                <select id="ddlOrderStatus" class="sfListmenu">
                                    <option value="0" class="sfLocale">--All--</option>
                                </select>
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnSearchOrders">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxPayementGatewayImage" src="" title="loading...." alt="loading...." class="sfLocale"/>
                </div>
                <div class="log">
                </div>
                <table id="gdvPaymentGatewayEdit" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
            </div>
        </div>
    </div>
</div>

 <div id="dvTransactionDetail" class="sfFormwrapper" style="display:none;" >  
     <div class="cssClassCommonBox Curve"> 
         <div class="cssClassHeader">
             <h2>
                 <asp:Label ID="lblTransactionLogDetail" runat="server" 
                     Text="Transaction Detail " meta:resourcekey="lblTransactionLogDetailResource1"></asp:Label>
             </h2>
         </div>
         <span id="spanNodata" class="cssNodata"></span> 
          <div id="divTransactionDetail"> 
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
             <tr>
                 <td>
                     <asp:Label ID="lblTpaymentGateway" runat="server" Text="Payment Gateway Name:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTpaymentGatewayResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindPName" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTorderID" runat="server" Text="OrderID:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTorderIDResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindOrderId" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTtransactionId" runat="server" Text="Transaction ID:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTtransactionIdResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindtransactionId" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTstatus" runat="server" Text="Order Completed AS:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTstatusResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindstatus" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTtotal" runat="server" Text="Order Amount:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTtotalResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindtotal" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTpayerEmail" runat="server" Text="Payer Email:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTpayerEmailResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindpayerEmail" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTcreditCard" runat="server" Text="Credit Card No:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTcreditCardResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindcreditCard" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTauthCode" runat="server" Text="Auth Code:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTauthCodeResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindAuthCode" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTresponsetext" runat="server" Text="Response Text:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTresponsetextResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindresponseText" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTCustomerName" runat="server" Text="Customer Name:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTCustomerNameResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindCustomerName" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTcustomerID" runat="server" Text="CustomerID:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTcustomerIDResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindcustomerId" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTsessionCode" runat="server" Text="Session Code:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTsessionCodeResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindsessionCode" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
             <tr>
                 <td>
                     <asp:Label ID="lblTAddedDate" runat="server" Text="Added On:" 
                         CssClass="cssClassLabel" meta:resourcekey="lblTAddedDateResource1"></asp:Label>
                 </td>
                 <td>
                     <label id="lblBindAddedon" class="cssClassLabel">
                     </label>
                 </td>
             </tr>
         </table>        
         </div>
          <div class="sfButtonwrapper">
             <p>
                 <button type="button" id="btnBacktoOrderView">
                     <span><span class="sfLocale">Back</span></span></button>
             </p>
         </div>
     </div>
</div>
<asp:HiddenField ID="hdnDescriptionValue" runat="server" />
<input id="hdnOldLogoUrl" type="hidden" />