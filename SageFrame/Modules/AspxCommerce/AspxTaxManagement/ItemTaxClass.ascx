<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemTaxClass.ascx.cs"
    Inherits="Modules_AspxTaxManagement_ItemTaxClass" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxTaxManagement
        });
    });
    //<![CDATA[  
    var lblItemTaxClassHeading='<%=lblItemTaxClassHeading.ClientID %>';
    //]]>
</script>

<div id="divTaxItemClassGrid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Manage Item Tax Class" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span> </span>
                        </button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNewTaxItemClass">
                            <span><span class="sfLocale">Add New Item Tax Class</span> </span>
                        </button>
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
                                    Item Tax Class Name:</label>
                                <input type="text" id="txtItemClassName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="ItemTaxClass.SearchItemClassName()">
                                            <span><span class="sflocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxItemTaxClassImage" src=""  alt="loading...."/>
                </div>
                <div class="log">
                </div>
                <table id="gdvTaxItemClassDetails" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divProductTaxClass" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblItemTaxClassHeading" runat="server" 
                    Text="Item Tax Class Information" 
                    meta:resourcekey="lblItemTaxClassHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="cssClassPadding tdpadding">
                <tr>
                    <td>
                        <asp:Label ID="lblTaxItemClassName" runat="server" Text="Item Tax Class Name:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblTaxItemClassNameResource1"></asp:Label>
    
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtTaxItemClassName" class="sfInputbox required"  /><span class="cssClassRequired">*</span><span id="spanError"></span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnCancel">
                    <span><span class="sfLocale">Cancel</span> </span>
                </button>
            </p>
            <p>
                <button type="button" id="btnSaveTaxItemClass">
                    <span><span class="sfLocale">Save</span> </span>
                </button>
            </p>
        </div>
    </div>
</div>
<input type="hidden" id="hdnTaxItemClassID" />
