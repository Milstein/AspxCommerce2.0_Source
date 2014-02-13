<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GiftCard.ascx.cs" Inherits="Modules_AspxCommerce_AspxGiftCardManagement_GiftCard" %>
<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGiftCardManagement
        });
    });
</script>


    <div id="dvGiftCard">
            <div >
                <div id="div1">
                    <div class="cssClassCommonBox Curve">
                        <div class="cssClassHeader">
                            <h1>
                                <asp:Label ID="lblHeaderGiftCard" runat="server" Text="List of Gift Card" meta:resourcekey="lblHeaderGiftCardResource1"></asp:Label>
                            </h1>
                            <div class="cssClassHeaderRight">
                                <div class="sfButtonwrapper">
                                    <p>
                                        <button type="button" id="btnDeleteGiftCard">
                                            <span><span class="sfLocale">Delete All</span> </span>
                                        </button>
                                    </p>
                                    <p>
                                        <button type="button" id="btnAddGiftCard">
                                            <span><span class="sfLocale">Add New </span></span></button>
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
                                            <td>
                                                <label class="cssClassLabel sfLocale">
                                                    Code:</label>
                                                <input type="text" id="txtGiftCardCode" class="sfTextBoxSmall" />
                                            </td>
                                             <td>
                                                <label class="cssClassLabel sfLocale">
                                                    Order ID:</label>
                                                <input type="text" id="txtOrderId" class="sfTextBoxSmall" />
                                            </td>
                                             <td>
                                                <label class="cssClassLabel sfLocale">
                                                    Balance From:</label>
                                                <input type="text" id="txtGiftCardBalance" class="sfTextBoxSmall" />
                                            </td>
                                             <td>
                                                <label class="cssClassLabel sfLocale">
                                                    Balance To:</label>
                                                <input type="text" id="txtGiftCardBalanceTo" class="sfTextBoxSmall" />
                                            </td>
                                            <td width="350">
                                                <label class="cssClassLabel sfLocale">
                                                    AddedOn:</label> 
                                                    <span class="label sfLocale">From :</span>
                                                <input type="text" id="txtAddedOn" class="sfTextBoxSmall" />
                                                 <span class="label sfLocale">To :</span>
                                            <input type="text" id="txtAddedOnTo" class="sfTextBoxSmall" />
                                            </td>
                                            <td>
                                                <label class="cssClassLabel sfLocale">
                                                    Status:
                                                </label>
                                                <select id="ddlGiftCardStatus" class="sfSelect">
                                                    <option value="0" class="sfLocale">-- All -- </option>
                                                    <option value="True" class="sfLocale">Active </option>
                                                    <option value="False" class="sfLocale">Inactive </option>
                                                </select>
                                            </td>
                                            <td>
                                                <div class="sfButtonwrapper cssClassPaddingNone">
                                                    <p>
                                                        <button type="button" id="btnSearchGiftCard">
                                                            <span><span class="sfLocale">Search</span></span></button>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="loading">
                                    <img id="ajaxStoreAccessImage1" src="" class="sfLocale" alt="loading...." title="loading...." />
                                </div>
                                <div class="log">
                                </div>
                                <table id="gdvGiftCard" cellspacing="0" cellpadding="0" border="0" width="100%">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
     <div class="popupbox" id="popuprel">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    
    <div class="cssClassTabPanelTable">
    <div id="dvTabPanel">
        <ul>
            <li><a href="#editAdd">
                <asp:Label ID="lblEdtiFor" runat="server" Text="GiftCard" 
                    meta:resourcekey="lblEdtiForResource1"></asp:Label></a></li>
            <li><a href="#dvHistory">
                <asp:Label ID="lblHistory" runat="server" Text="History" 
                    meta:resourcekey="lblHistoryResource1"></asp:Label></a></li>
        </ul>
    <div id="editAdd">
        <div class="cssClassCommonBox Curve">
           <%-- <div class="cssClassHeader">
                <h3>
                    <asp:Label ID="lblAddEditGiftCard" runat="server" 
                        meta:resourcekey="lblAddEditGiftCardResource1"></asp:Label>
                </h3>
            </div>--%>
            <div class="sfFormwrapper">
                <table border="0" width="100%" id="tblAddEditGiftCardForm" class="cssClassPadding">
                    <tr >
                         <td>
                            <asp:Label ID="lblCategory" Text="Category:" runat="server" 
                                 CssClass="cssClassLabel" meta:resourcekey="lblCategoryResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <select id="ddlgcCategory"><option value="0" class="sfLocale">Choose One</option></select>
                        </td>
                        </tr>
                          <tr id="pincode" >
                         <td>
                            <asp:Label ID="lblPinCode" Text="Pin Code:" runat="server" 
                                 CssClass="cssClassLabel" meta:resourcekey="lblPinCodeResource1"></asp:Label>
                           
                        </td>
                        <td class="cssClassTableRightCol">
                            <label id="lblPinCode"></label>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <asp:Label ID="lblBalance" Text="Amount" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblBalanceResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtGiftCardAmount" name="GiftCardAmount" class="sfInputbox required" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblExpireDate" Text="Expire Date:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblExpireDateResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtExpireDate" name="ExpireDate" class="sfInputbox required" />
                        </td>
                    </tr>
                    <tr >
                         <td>
                            <asp:Label ID="lblTheme" Text="Card theme Image:" runat="server" 
                                 CssClass="cssClassLabel" meta:resourcekey="lblThemeResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                          <div id="themes" ></div>
                        </td>
                        </tr>
                   <tr>
                        <td>
                            <asp:Label ID="lblRecipientName" Text="Recipient Name:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblRecipientNameResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtRecipientName" name="RecipientName" class="sfInputbox required" />
                        </td>
                    </tr>
                            <tr>
                        <td>
                            <asp:Label ID="lblRecipientEmail" Text="Recipient Email:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblRecipientEmailResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtRecipientEmail" name="RecipientEmail" class="sfInputbox required" />
                        </td>
                    </tr>
                          <tr>
                        <td>
                            <asp:Label ID="lblSenderName" Text="Sender Name:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblSenderNameResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtSenderName" name="SenderName" class="sfInputbox required" />
                        </td>
                    </tr>
                            <tr>
                        <td>
                            <asp:Label ID="lblSenderEmail" Text="Sender Email:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblSenderEmailResource1"></asp:Label>
                            <span class="cssClassRequired">*</span>
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtSenderEmail" name="SenderEmail" class="sfInputbox required" />
                        </td>
                   </tr>
                       <tr>
                        <td>
                            <asp:Label ID="Label1" Text="Message:" runat="server" CssClass="cssClassLabel" 
                                meta:resourcekey="Label1Resource1"></asp:Label>
                           
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="text" id="txtMessege" name="Messege" class="sfInputbox" />
                        </td>
                   </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblStatus" Text="Status:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="lblStatusResource1"></asp:Label>
                           
                        </td>
                        <td class="cssClassTableRightCol">
                           <label> <input type="radio" id="chkStatusActive" class="cssClassRadioBtn sfLocale" name="status" checked="checked" />Active</label>
                          
                            <label> <input type="radio" id="chkStatusDisActive" class="cssClassRadioBtn sfLocale" name="status" />Inactive</label>
                           
                        </td>
                    </tr>
                    <tr id="notifyTr">
                        <td>
                            <asp:Label ID="Label2" Text="Is Notified to Reciever:" runat="server" 
                                CssClass="cssClassLabel" meta:resourcekey="Label2Resource1"></asp:Label>
                          
                        </td>
                        <td class="cssClassTableRightCol">
                            <input type="checkbox" id="chkIsNotified"class="cssClassNormalCheckBox" disabled="disabled" />
                        </td>
                   </tr>
                </table>
            </div>
          
        </div>
    </div>
    
    <div id="dvHistory">
         <div class="cssClassCommonBox Curve">
            <div class="cssClassHeader">
                <h3>
                    <asp:Label ID="lblHistoryGc" runat="server" Text="History of GiftCard" 
                        meta:resourcekey="lblHistoryGcResource1"></asp:Label>
                </h3>
            </div>
            <div class="sfFormwrapper">
             <div id="tblHistory" class="sfGridwrapper"></div>
                </div>
                </div>
    </div>
      <div class="sfButtonwrapper">
                <p>
                    <button type="button" id="btnSubmit" class="cssClassButtonSubmit">
                        <span><span class="sfLocale">Save</span></span></button>
                          <button type="button" id="btnCancelSaveUpdate" class="cssClassButtonSubmit">
                        <span><span class="sfLocale">Cancel</span></span></button>
                </p>
            </div>
    </div>
    </div>
</div>
