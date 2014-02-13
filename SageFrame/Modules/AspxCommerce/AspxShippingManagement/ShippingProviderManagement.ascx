<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShippingProviderManagement.ascx.cs" Inherits="Modules_AspxCommerce_AspxShippingManagement_ShippingProviderManagement" %>
<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShippingManagement
        });
    });
    //<![CDATA[
    var lblSPHeading = '<%=lblSPHeading.ClientID %>';
    var aspxItemModulePath = '<%=AspxItemModulePath %>';
//]]>
</script>

<div id="divShippingProviderDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblShippingProvider" runat="server" Text="Shipping Providers" 
                    meta:resourcekey="lblShippingProviderResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnSPDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnSPAddNew">
                            <span><span class="sfLocale">Add New Shipping Provider</span></span></button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
          <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>                            
                            <td width="150">
                                <asp:Label ID="lblShippingProviderName" runat="server" CssClass="cssClassLabel" 
                                    Text="Shipping Provider Name:" 
                                    meta:resourcekey="lblShippingProviderNameResource1"></asp:Label>
                                <input type="text" id="txtSearchShippingProviderName" class="sfTextBoxSmall" />
                            </td>
                            <td width="160">
                                <asp:Label ID="lblShippingProviderIsActive" runat="server" 
                                    CssClass="cssClassLabel" Text="Is Active:" 
                                    meta:resourcekey="lblShippingProviderIsActiveResource1"></asp:Label>
                                <select id="ddlSPVisibitity" class="sfListmenu">
                                    <option value="" class="sfLocale">--All--</option>
                                    <option value="True" class="sfLocale">Yes</option>
                                    <option value="False" class="sfLocale">No</option>
                                </select>
                            </td>
                            <td>
                                <div class="sfButtonwrapper">
                                    <p>
                                        <button type="button" onclick="shippingProviderMgmt.SearchShippingProvider()" >
                                            <span><span class="sfLocale">Search</span></span></button> <!--onclick="SearchOrderStatus()"-->
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxShippingProviderImage" src=""  alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="tblShippingProviderList" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
        
    </div>
</div>

<div id="divEditShippingProvider" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblSPHeading" runat="server" Text="Edit Shipping Provider ID:" 
                    meta:resourcekey="lblSPHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                 <tr>
                    <td width="10%">
                        <asp:Label ID="lblSPName" runat="server" Text="Shipping Provider Name:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblSPNameResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtSPName" name="name2" class="sfInputbox required" minlength="2" />
                        <span id="sperrorLabel"></span><span class="cssClassRequired">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblSPServiceCode" runat="server" Text="Shipping Provider Code:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblSPServiceCodeResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtSPServiceCode" name="name" class="sfInputbox required" minlength="2" />    <span class="cssClassRequired">*</span>                    
                    </td> 
                </tr>               
                <tr>
                    <td>
                        <asp:Label ID="lblSPAliasHelp" runat="server" 
                            Text="Shipping Provider Alias Help:" CssClass="cssClassLabel" 
                            meta:resourcekey="lblSPAliasHelpResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtSPAliasHelp" class="sfInputbox" />
                    </td>
                </tr>
                <tr id="isActiveSp">
                    <td>
                        <asp:Label ID="lblSPIsActive" runat="server" Text="Is Active:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblSPIsActiveResource1"></asp:Label>
                    </td>
                    <td>
                        <div id="chkIsActiveShippingProvider" class="cssClassCheckBox">
                            <input id="chkIsActiveSP" type="checkbox" name="chkIsActive" />
                        </div>
                    </td>
                </tr>
                <%--<tr>
                    <td>
                        <asp:Label ID="lblOrderStatusIsDeleted" runat="server" Text="Is Deleted:" CssClass="cssClassLabel"></asp:Label>
                    </td>
                    <td>
                        <div id="Div1" class="cssClassCheckBox">
                            <input id="chkIsDeleted" type="checkbox" name="chkIsDeleted" />
                        </div>
                    </td>
                </tr>--%>
            </table>
            
            <span id="spnOr"><h2>OR</h2></span>
            
            <div id="dvUploaderProvider" class="sfFormwrapper">
          
                    <table border="0" width="100%" id="tblUploadShippingProvider" class="cssClassPadding">
                <tr>
                    <td>
                        <asp:Label ID="lblLoadMessage" runat="server" CssClass="cssClassRed" 
                            meta:resourcekey="lblLoadMessageResource1"></asp:Label>
                    </td>
                  
                </tr>
                <tr>
                    <td>
                         <input id="fuShippingProvider" type="file"/>
                   <label><input type="checkbox" id="cbRepair" />Repair previously existing data and file</label>
                     </tr>
             
            </table>
            </div>
            <div id="dvSettingPanel">
                
            </div>
            <div id="dvResponse" class="sfFormwrapper" style="display: none;">
                 <%-- <table id="tblShippingMethodAdd" cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                      <tr>
                          <td colspan="2">Add Shipping Method</td>
                      </tr>
                  </table>
                  
                    <table id="tblShippingMethodEdit" cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                      <tr>
                          <td colspan="2">Edit Shipping Method</td>
                      </tr>
                  </table>--%>
                  <script type="text/javascript">
	//<![CDATA[
    var maxFileSize = '<%=MaxFileSize%>';
	//]]>
</script>

<!-- Grid -->
<div id="divShowShippingMethodGrid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblTitleShippingMethods" runat="server" Text="Shipping Methods" 
                    meta:resourcekey="lblTitleShippingMethodsResource1"></asp:Label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
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
                <div class="loading">
                    <img id="ajaxShippingMgmtImage1" src="" alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvShippingMethod" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<!-- End of Grid -->

<input type="hidden" id="hdnShippingMethodID" />
<input type="hidden" id="hdnPrevFilePath" />

<div class="clear"></div>
<div id="dvProviderService">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblAddshippingAddress" runat="server" Text="Select Shipping Methods:" 
                   ></asp:Label>
            </h2>
        </div>
        <div id="dvAddMethods"class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                 <tr>
                     <td></td>
                 </tr>
                 </table>
                 </div>
   </div>
                 
</div>
                
            </div>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnSPBack">
                    <span><span class="sfLocale">Cancel</span></span></button>
            </p>
            <p>
                <button type="reset" id="btnSPReset">
                    <span><span class="sfLocale">Reset</span></span></button>
            </p>
            <p>
                <button type="button" id="btnSaveShippingProvider"  class="cssClassButtonSubmit" type="submit" value="Save">
                    <span><span class="sfLocale">Save</span></span></button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>

<div id="popuprel3" class="popupbox adminpopup" style="display:none">
</div>