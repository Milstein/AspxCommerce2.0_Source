<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GiftCardSuccess.ascx.cs"
    Inherits="GiftCardSuccess" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGiftCard
        });
    });
    $(document).ready(function() {
        $('#btnPrint').click(function() {
            printPage();
        });
    });
    function printPage() {
        var content = $('#<%=divPage.ClientID%>').html();
        var pwin = window.open('', 'print_content', 'width=100,height=100');
        pwin.document.open();
        pwin.document.write('<html><body onload="window.print()">' + content + '</body></html>');
        pwin.document.close();
        setTimeout(function() { pwin.close(); }, 5000);
    }
</script>

<div>
    <asp:UpdateProgress ID="UpdateProgress1" runat="server" DisplayAfter="0">
        <ProgressTemplate>
            <div class="cssClassLoadingBG">
                &nbsp;</div>
            <div class="cssClassloadingDiv">
                <asp:Image ID="imgPrgress" runat="server" AlternateText="Loading..." 
                    ToolTip="Loading..." meta:resourcekey="imgPrgressResource1" />
                <br />
                <asp:Label ID="lblPrgress" runat="server" Text="Please wait..." 
                    meta:resourcekey="lblPrgressResource1"></asp:Label>
            </div>
        </ProgressTemplate>
    </asp:UpdateProgress>
    
    <div id="divPageOuter" class="PageOuter">
        <div id="error" runat="server">
            <asp:Label ID="lblerror" runat="server" meta:resourcekey="lblerrorResource1"></asp:Label>
        </div>
        <div id="divClickAway">
              <div class="sfButtonwrapper">
               <asp:HyperLink ID="hlnkHomePage" runat="server" 
                      meta:resourcekey="hlnkHomePageResource1">Back to Home page</asp:HyperLink>
         
                <button id="btnPrint" type="button">
            <span><span class="sfLocale">Print</span></span></button>
            </div>
        </div>
        <!--[1]-->
        <div id="divPage" class="Page" runat="server">
            <div id="divThankYou" class="sfLocale">
                Thank you for your order!</div>
            <hr class="HrTop" />
            <div id="divReceiptMsg" class="sfLocale">
                You may print this receipt page for your records.
            </div>
            <div class="SectionBar" class="sfLocale">
                Order Information</div>
            <table id="tablePaymentDetails2Rcpt" cellspacing="0" cellpadding="0">
                <tr>
                   
                                <td class="LabelColInfo1R sfLocale">
                                    Date/Time:
                                </td>
                                <td class="DataColInfo1R sfLocale">
                                    <asp:Label ID="lblDateTime" runat="server" 
                                        meta:resourcekey="lblDateTimeResource1"></asp:Label>
                                </td>                         
                    
                    <td class="LabelColInfo1R sfLocale">
                                    &nbsp;&nbsp;Invoice Number:
                                </td>
                                <td class="DataColInfo1R">
                                    <asp:Label ID="lblInvoice" runat="server" 
                                        meta:resourcekey="lblInvoiceResource1"></asp:Label>
                                </td>
                          
                </tr>
            </table>
            <hr id="hrBillingShippingBefore">
            <div id="divOrderDetailsBottomR">
                <table id="tableOrderDetailsBottom">
                    <tr>
                        <td class="LabelColTotal">
                        </td>
                        <td class="DescrColTotal">
                            <asp:Label ID="lblTotal" runat="server" meta:resourcekey="lblTotalResource1"></asp:Label>
                        </td>
                        <td class="DataColTotal">
                        </td>
                    </tr>
                </table>
                <!-- tableOrderDetailsBottom -->
            </div>
            <div id="divOrderDetailsBottomSpacerR">
            </div>
            <div class="SectionBar">
            </div>
            <table class="PaymentSectionTable" cellspacing="0" cellpadding="0">
                <tr>
                  
                                <td class="LabelColInfo2R sfLocale">
                                    Transaction ID:
                                </td>
                                <td class="DataColInfo2R">
                                    <asp:Label ID="lblTransaction" runat="server" 
                                        meta:resourcekey="lblTransactionResource1"></asp:Label>
                                </td>
                           
                                <td class="DataColInfo2R">
                                    <asp:Label ID="lblAuthorizationCode" runat="server" 
                                        meta:resourcekey="lblAuthorizationCodeResource1"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td class="LabelColInfo2R sfLocale">
                                    Payment Method:
                                </td>
                                <td class="DataColInfo2R">
                                    <asp:Label ID="lblPaymentMethod" runat="server" 
                                        meta:resourcekey="lblPaymentMethodResource1"></asp:Label>
                                </td>
                            </tr>
            </table>
                   
            <div class="PaymentSectionSpacer">
            </div>
        </div>
        <!-- entire BODY -->
    </div>
</div>
