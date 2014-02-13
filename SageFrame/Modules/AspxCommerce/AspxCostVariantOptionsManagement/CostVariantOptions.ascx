<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CostVariantOptions.ascx.cs"
    Inherits="Modules_AspxCostVariantOptionsManagement_CostVariantOptions" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCostVariantOptionsManagement
        });
    });
    //<![CDATA[
    var lblCostVarFormHeading = '<%=lblCostVarFormHeading %>';
    //]]>
</script>

<!-- Grid -->
<div id="divShowOptionDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblCostVarGridHeading" runat="server" Text="Variant Options" meta:resourcekey="lblCostVarGridHeadingResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span></span>
                        </button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNewVariantOption">
                            <span><span class="sfLocale">Add New Cost Variant Option</span></span></button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                        <tr>
                            <td width="150">
                                <label class="cssClassLabel sfLocale">
                                    Cost Variant Name:</label>
                                <input type="text" id="txtVariantName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnSearchCostVariants">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxLoad" src="" class="sfLocale" alt="loading...." title="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvCostVariantGrid" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<!-- End of Grid -->
<!-- form -->
<div id="divAddNewOptions" style="display: none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <asp:Label ID="lblCostVarFormHeading" runat="server" meta:resourcekey="lblCostVarFormHeadingResource1"></asp:Label>
        </div>
        <div class="cssClassTabPanelTable">
            <div id="container-7" class="cssClassMargin">
                <ul>
                    <li><a href="#fragment-1">
                        <asp:Label ID="lblTabTitle1" runat="server" Text="Cost Variant Option Properties"
                            meta:resourcekey="lblTabTitle1Resource1"></asp:Label>
                    </a></li>
                    <%-- <li><a href="#fragment-2">
                        <asp:Label ID="lblTabTitle2" runat="server" Text="Frontend Properties"></asp:Label>
                    </a></li>--%>
                    <li><a href="#fragment-3">
                        <asp:Label ID="lblTabTitle3" runat="server" Text="Variants Properties" meta:resourcekey="lblTabTitle3Resource1"></asp:Label>
                    </a></li>
                </ul>
                <div id="fragment-1">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblTab1Info" runat="server" Text="General Information" meta:resourcekey="lblTab1InfoResource1"></asp:Label>
                        </h2>
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="tdpadding">
                            <tr>
                                <td>
                                    <asp:Label ID="lblCostVariantName" runat="server" Text="Cost Variant Name:" CssClass="cssClassLabel"
                                        meta:resourcekey="lblCostVariantNameResource1"></asp:Label>
                                    <span class="cssClassRequired">*</span>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="text" id="txtCostVariantName" class="sfInputbox required" />
                                    <span class="cssClassRight">
                                        <img class="cssClassSuccessImg" alt="Right"></span> <b class="cssClassError sfLocale">
                                            Ops! found something error, must be unique with no spaces</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCostVariantDescription" runat="server" Text="Description:" CssClass="cssClassLabel"
                                        meta:resourcekey="lblCostVariantDescriptionResource1"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <textarea id="txtDescription" name="txtDescription" title="Cost Variant Description"
                                        rows="2" cols="15" class="cssClassTextArea"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblType" runat="server" Text="Type:" CssClass="cssClassLabel" meta:resourcekey="lblTypeResource1"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <select id="ddlAttributeType" class="sfListmenu" name="" title="Cost Variant Input Type">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblDisplayOrder" runat="server" Text="Display Order:" CssClass="cssClassLabel"
                                        meta:resourcekey="lblDisplayOrderResource1"></asp:Label>
                                    <span class="cssClassRequired">*</span>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input class="sfInputbox required" id="txtDisplayOrder" type="text" /><span id="dispalyOrder"></span>
                                </td>
                            </tr>
                            <%--<tr>
                                                                            <td>
                                                                                <asp:Label ID="lblIsSystemUse" runat="server" Text="Is System Use:" CssClass="cssClassLabel"></asp:Label>
                                                                            </td>
                                                                            <td>
                                                                                <div id="" class="cssClassCheckBox">
                                                                                    <input type="checkbox" name="chkIsSystemUse" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>--%>
                            <tr>
                                <td>
                                    <asp:Label ID="lblActive" runat="server" Text="Is Active:" CssClass="cssClassLabel"
                                        meta:resourcekey="lblActiveResource1"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkActive" class="cssClassCheckBox" disabled="disabled" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <%--  <div id="fragment-2">
                    <div class="sfFormwrapper">
                        <h3>
                            <asp:Label ID="lblTab2Info" runat="server" Text="Frontend Display Settings"></asp:Label>
                        </h3>
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="tdpadding">--%>
                <%--<tr>
                                <td>
                                    <asp:Label ID="lblShowInGrid" runat="server" Text="Show in Grid:" CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkShowInGrid" class="cssClassCheckBox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblIsEnableSorting" runat="server" Text="Is Enable Sorting:" CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkIsEnableSorting" class="cssClassCheckBox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblIsUseInFilter" runat="server" Text="Is Use in Filter:" CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkIsUseInFilter" class="cssClassCheckBox" />
                                </td>
                            </tr>--%>
                <%--<tr>
                                <td>
                                    <asp:Label ID="lblShowInSearch" runat="server" Text="Use in Search:" CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkShowInSearch" class="cssClassCheckBox" />
                                </td>
                            </tr>--%>
                <%--h  <tr>
                                <td>
                                    <asp:Label ID="lblUseInAdvancedSearch" runat="server" Text="Use in Advanced Search:"
                                        CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkUseInAdvancedSearch" class="cssClassCheckBox" />
                                </td>
                            </tr>--%>
                <%--<tr>
                                                                            <td>
                                                                                <asp:Label ID="lblVisibleOnFrontend" runat="server" Text="Visible on Item View Page on Front-end:"
                                                                                    CssClass="cssClassLabel"></asp:Label>
                                                                            </td>
                                                                            <td class="cssClassTableRightCol">
                                                                                <div class="cssClassCheckBox">
                                                                                    <input type="checkbox" name="chkVisibleOnFrontend" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <asp:Label ID="lblUsedInItemListing" runat="server" Text="Used in Item Listing:"
                                                                                    CssClass="cssClassLabel"></asp:Label>
                                                                            </td>
                                                                            <td class="cssClassTableRightCol">
                                                                                <div class="cssClassCheckBox">
                                                                                    <input type="checkbox" name="chkUsedInItemListing" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>--%>
                <%-- h<tr>
                                <td>
                                    <asp:Label ID="lblComparable" runat="server" Text="Comparable on Front-end:" CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkComparable" class="cssClassCheckBox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblUseForPriceRule" runat="server" Text="Use for Price Rule Conditions:"
                                        CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkUseForPriceRule" class="cssClassCheckBox" />
                                </td>
                            </tr>--%>
                <%--<tr>
                                <td>
                                    <asp:Label ID="lblUseForPromoRule" runat="server" Text="Use for Promo Rule Conditions:"
                                        CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkUseForPromoRule" class="cssClassCheckBox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblUseForRating" runat="server" Text="Use for Rating Conditions:"
                                        CssClass="cssClassLabel"></asp:Label>
                                </td>
                                <td class="cssClassTableRightCol">
                                    <input type="checkbox" name="chkUseForRating" class="cssClassCheckBox" />
                                </td>
                            </tr>--%>
                <%-- </table>
                    </div>
                </div>--%>
                <div id="fragment-3">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblTab3Info" runat="server" Text="Cost Variants Settings" meta:resourcekey="lblTab3InfoResource1"></asp:Label>
                        </h2>
                        <div class="sfGridwrapper">
                            <div class="sfGridWrapperContent cssClassPadding">
                                <table width="100%" cellspacing="0" cellpadding="0" id="tblVariantTable" class="tdpadding">
                                    <thead>
                                        <tr class="cssClassHeading">
                                            <th align="left" class="sfLocale">
                                                Pos.
                                            </th>
                                            <th align="left" class="sfLocale">
                                                Name
                                            </th>
                                            <th align="left" class="sfLocale">
                                                Status
                                            </th>
                                            <th align="left">
                                                &nbsp;
                                            </th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td>
                                            <input type="hidden" class="cssClassVariantValue" value="0" />
                                            <input type="text" size="3" id="txtPos" class="cssClassDisplayOrder" disabled="disabled" />
                                        </td>
                                        <td>
                                            <input type="text" class="cssClassVariantValueName" />
                                        </td>
                                        <td>
                                            <select class="cssClassIsActive">
                                                <option value="true" class="sfLocale">Active</option>
                                                <option value="false" class="sfLocale">Disabled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span class="nowrap">
                                                <img border="0" align="top" class="cssClassAddRow" title="Add empty item" src=""
                                                    alt="Add empty item" name="add" />
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnBack">
                    <span><span class="sfLocale">Back</span></span>
                </button>
            </p>
            <p>
                <button type="button" id="btnReset">
                    <span><span class="sfLocale">Reset</span></span>
                </button>
            </p>
            <p>
                <button type="button" id="btnSaveVariantOption">
                    <span><span class="sfLocale">Save</span></span>
                </button>
            </p>
            <p>
                <button type="button" class="delbutton">
                    <span><span class="sfLocale">Delete</span></span>
                </button>
            </p>
        </div>
    </div>
</div>
<!-- End form -->
