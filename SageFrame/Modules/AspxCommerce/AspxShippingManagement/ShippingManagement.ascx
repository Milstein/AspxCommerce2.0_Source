<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShippingManagement.ascx.cs"
    Inherits="Modules_AspxShippingManagement_ShippingManagement" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShippingManagement
        });
    });
	//<![CDATA[
    var maxFileSize = '<%=MaxFileSize%>';
	//]]>
</script>

<!-- Grid -->
<div id="divShowShippingMethodGrid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitleShippingMethods" runat="server" Text="Shipping Methods" 
                    meta:resourcekey="lblTitleShippingMethodsResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNewShippingMethod">
                            <span><span class="sfLocale">Add New Shipping Method</span></span></button>
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
                                <label class="cssClassLabel class="sfLocale"">
                                    Shipping Method Name:</label>
                                <input type="text" id="txtMethodName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel class="sfLocale"">
                                    Delivery Time:</label>
                                <input type="text" id="txtSearchDeliveryTime" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel class="sfLocale"">
                                    Weight Limit From:</label>
                                <input type="text" id="txtWeightFrom" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel class="sfLocale"">
                                    Weight Limit To:</label>
                                <input type="text" id="txtWeightTo" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel class="sfLocale"">
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
                                        <button type="button" onclick="ShippingManage.SearchShippingMethods()">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
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
<!-- form -->
<div id="divAddNewShippingMethodForm" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblHeading" runat="server" Text="Add New Shipping Method" 
                    meta:resourcekey="lblHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="cssClassTabPanelTable">
            <div class="cssClassTabpanelContent" id="container-7">
                <ul>
                    <li><a href="#fragment-1">
                        <asp:Label ID="lblTabTitle1" runat="server" Text="General Settings" 
                            meta:resourcekey="lblTabTitle1Resource1"></asp:Label>
                    </a></li>
                    <li id="liShippingSettingChanges"><a href="#fragment-2">
                        <asp:Label ID="lblTabTitle2" runat="server" Text="Shipping Charges Settings" 
                            meta:resourcekey="lblTabTitle2Resource1"></asp:Label>
                    </a></li>
                </ul>
                <div id="fragment-1">
                    <div class="sfFormwrapper">
                        <h2>
                            <asp:Label ID="lblTab1Info" runat="server" Text="General Settings" 
                                meta:resourcekey="lblTab1InfoResource1"></asp:Label>
                        </h2>
                        <table border="0" width="100%" id="tblShippingMethodForm">
                            <tr>
                                <td width="10%">
                                    <asp:Label ID="lblShippingMethodName" Text="Name:" runat="server" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblShippingMethodNameResource1"></asp:Label>
                                    
                                </td>
                                <td>
                                    <input type="text" id="txtShippingMethodName" name="name" class="sfInputbox required"
                                        minlength="2" /><span class="cssClassRequired">*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShippingMethodIcon" runat="server" Text="Icon:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblShippingMethodIconResource1"></asp:Label>
                                   
                                </td>
                                <td>
                                    <input id="fileUpload" type="file" class="cssClassBrowse" />
                                </td>
           
                              
                                <td>
                                    <div class="progress ui-helper-clearfix">
                                        <div class="progressBar" id="progressBar">
                                        </div>
                                        <div class="percentage">
                                        </div>
                                    </div>
                                    <div id="shippingIcon">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShippingAlternateText" runat="server" Text="Alternate Text:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblShippingAlternateTextResource1"></asp:Label>
                                </td>  
                                <td>
                                    <input type="text" id="txtAlternateText" class="sfInputbox" />
                                </td>
                              
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShippingDisplayOrder" runat="server" Text="Display Order:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblShippingDisplayOrderResource1"></asp:Label>
                                 
                                </td>
                                <td>
                                    <input type="text" id="txtDisplayOrder" name="displayOrder" class="sfInputbox required digits displayOrder"
                                        minlength="1" />
                                    <span id="errdisplayOrder"></span><span id="erruniqueOrder"></span><span class="cssClassRequired">*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShippingDeliveryTime" runat="server" Text="Delivery Time:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblShippingDeliveryTimeResource1"></asp:Label>
                            
                                </td>
                                <td>
                                    <input type="text" id="txtDeliveryTime" name="deliveryTime" class="sfInputbox required"
                                        minlength="2" /><span class="cssClassRequired">*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblWeightLimitFrom" runat="server" Text="Weight Limit From:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblWeightLimitFromResource1"></asp:Label>
                                 
                                </td>
                                <td>
                                    <input type="text" id="txtWeightLimitFrom" name="weightFrom" maxlength="5" class="sfInputbox required number weightFrom"
                                        minlength="1" /><span id='lblNotificationlf' style="color: #FF0000;"></span><span class="cssClassRequired">*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblWeightLimitTo" runat="server" Text="Weight Limit To:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblWeightLimitToResource1"></asp:Label>
                              
                                </td>
                                <td>
                                    <input type="text" id="txtWeightLimitTo" name="weightTo" maxlength="5" class="sfInputbox required number weightTo"
                                        minlength="1" /><span id='lblNotificationlt' style="color: #FF0000;"></span><span class="cssClassRequired">*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblShippingService" runat="server" 
                                        Text="Shipping Provider Name:" CssClass="cssClassLabel" 
                                        meta:resourcekey="lblShippingServiceResource1"></asp:Label>
                                </td>
                                <td>
                                    <select id="ddlShippingService"  class="sfListmenu" title="*" name="providerList">
                                    <option value="0" class="sfLocale">--Select Provider--</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblIsActive" runat="server" Text="Is Active:" 
                                        CssClass="cssClassLabel" meta:resourcekey="lblIsActiveResource1"></asp:Label>
                                </td>
                                <td>
                                    <input type="checkbox" id="chkIsActive" class="cssClassCheckBox" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="fragment-2">
                    <div class="sfFormwrapper">
                        <h3>
                            <asp:Label ID="lblTab2Info" runat="server" Text="Shipping Charges Settings" 
                                meta:resourcekey="lblTab2InfoResource1"></asp:Label>
                        </h3>
                        <div>
                            <div class="cssClassCommonBox Curve">
                                <div class="cssClassHeader">
                                    <h2>
                                        <asp:Label ID="lblTitle1" runat="server" Text="Cost Dependencies:" 
                                            meta:resourcekey="lblTitle1Resource1"></asp:Label>
                                    </h2>
                                    <div class="cssClassHeaderRight">
                                        <div class="sfButtonwrapper">
                                            <p>
                                                <button type="button" id="btnDeleteCostDependencies">
                                                    <span><span class="sfLocale">Delete Selected Cost Dependencies</span></span></button>
                                            </p>
                                            <p>
                                                <button type="button" id="btnAddCostDependencies" rel="popuprel">
                                                    <span><span class="sfLocale">Add Cost Dependencies</span></span></button>
                                            </p>
                                            <div class="cssClassClear">
                                            </div>
                                        </div>
                                        <div class="cssClassClear">
                                        </div>
                                    </div>
                                </div>
                                <div class="sfGridwrapper">
                                    <div class="sfGridWrapperContent">
                                        <div class="loading">
                                            <img id="ajaxShippingMgmtImage4" src="" alt="loading...." />
                                        </div>
                                        <div class="log">
                                        </div>
                                        <table id="gdvAddCostDependencies" width="100%" border="0" cellpadding="0" cellspacing="0">
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="cssClassCommonBox Curve">
                                <div class="cssClassHeader">
                                    <h2>
                                        <asp:Label ID="lblWtDependencyTitle" runat="server" Text="Weight Dependencies:" 
                                            meta:resourcekey="lblWtDependencyTitleResource1"></asp:Label>
                                    </h2>
                                    <div class="cssClassHeaderRight">
                                        <div class="sfButtonwrapper">
                                            <p>
                                                <button type="button" id="btnDeleteWeightDependencies">
                                                    <span><span class="sfLocale">Delete Selected Weight Dependencies</span></span></button>
                                            </p>
                                            <p>
                                                <button type="button" id="btnAddWeightDependencies" rel="popuprel">
                                                    <span><span class="sfLocale">Add Weight Dependencies</span></span></button>
                                            </p>
                                            <div class="cssClassClear">
                                            </div>
                                        </div>
                                        <div class="cssClassClear">
                                        </div>
                                    </div>
                                </div>
                                <div class="sfGridwrapper">
                                    <div class="sfGridWrapperContent">
                                        <div class="loading">
                                            <img id="ajaxShippingMgmtImage3" src="" alt="loading...." />
                                        </div>
                                        <div class="log">
                                        </div>
                                        <table id="gdvAddWeightDependencies" width="100%" border="0" cellpadding="0" cellspacing="0">
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cssClassClear">
                    </div>
                    <div>
                        <div class="cssClassCommonBox Curve">
                            <div class="cssClassHeader">
                                <h2>
                                    <asp:Label ID="lblItemDepTitle" runat="server" Text="Item Dependencies:" 
                                        meta:resourcekey="lblItemDepTitleResource1"></asp:Label>
                                </h2>
                                <div class="cssClassHeaderRight">
                                    <div class="sfButtonwrapper">
                                        <p>
                                            <button type="button" id="btnDeleteItemDependencies">
                                                <span><span class="sfLocale">Delete Selected Item Dependencies</span></span></button>
                                        </p>
                                        <p>
                                            <button type="button" id="btnAddItemDependencies" rel="popuprel">
                                                <span><span class="sfLocale">Add Item Dependencies</span></span></button>
                                        </p>
                                        <div class="cssClassClear">
                                        </div>
                                    </div>
                                    <div class="cssClassClear">
                                    </div>
                                </div>
                            </div>
                            <div class="sfGridwrapper">
                                <div class="sfGridWrapperContent">
                                    <div class="loading">
                                        <img id="ajaxShippingMgmtImage2" src="" alt="loading...." />
                                    </div>
                                    <div class="log">
                                    </div>
                                    <table id="gdvAddItemDependencies" width="100%" border="0" cellpadding="0" cellspacing="0">
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="sfButtonwrapper">
                <p>
                    <button type="button" id="btnCancel">
                        <span><span class="sfLocale">Cancel</span></span></button>
                </p>
                <p>
                    <input type="button" id="btnReset" value="Reset" class="cssClassButtonSubmit" />
                </p>
                <p>
                    <input type="submit" id="btnSave" value="Save" class="cssClassButtonSubmit" />
                </p>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdnShippingMethodID" />
<input type="hidden" id="hdnPrevFilePath" />
<!-- End form -->
<!--PopUP-->
<div class="popupbox" id="popuprel">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <h2>
        <label id="lblTitleDependencies">
        </label>
    </h2>
    <table border="0" width="100%" cellpadding="0" cellspacing="0" id="tblcostdependencies">
        <thead>
            <th>&nbsp;
                
            </th>
            <th class="sfLocale">
                Cost
            </th>
            <th>
                Rate Value
            </th>
            <th class="sfLocale">
                Rate Type
            </th>
            <th>&nbsp;
                
            </th>
        </thead>
        <tr>
            <td>
                <label id="lblCostDedendencies" class="cssClassLabel">
                    </label>
            </td>
            <td>
                <input type="text" id="txtCost" name="cost" maxlength="5" class="cssClassCost" minlength="1" />
                <span class="cssClassRequired">*</span><span id="errmsgCost"></span>
            </td>
            <td>
                <input type="text" id="txtCostRateValue" name="rateValue" maxlength="5" class="cssClassCostRateValue"
                    minlength="1" />
                <span class="cssClassRequired">*</span><span id="errmsgRateValue"></span>
            </td>
            <td>
                <select id="ddlCostDependencies" class="cssClassDropDownCostDependencies">
                  <%--  <option value="0">Absolute ($)</option>
                    <option value="1">Percent (%)</option>--%>
                </select>
            </td>
            <td>
                <span class="nowrap">
                    <img class="cssClassAddRow" title="Add empty item"
                        alt="Add empty item" name="add" src="" />&nbsp;
                    <img class="cssClassCloneRow" alt="Clone this item"
                        title="Clone this item" name="clone" src="" />&nbsp;
                    <img class="cssClassDeleteRow" alt="Remove this item"
                        name="remove" src="" />&nbsp; </span>
            </td>
        </tr>
    </table>
    <div class="sfButtonwrapper" id="CostDependencyButtonWrapper">
        <p>
            <button type="button" id="btnCancelCostDependencies">
                <span><span class="sfLocale">Cancel</span></span></button>
        </p>
        <p>
            <button type="button" id="btnCreateCost">
                <span><span class="sfLocale">Create</span></span></button>
        </p>
    </div>
    <table border="0" width="100%" cellpadding="0" cellspacing="0" id="tblWeightDependencies">
        <thead>
            <th>&nbsp;
                
            </th>
            <th class="sfLocale">
                Weight
            </th>
            <th class="sfLocale">
                Rate Value
            </th>
            <th class="sfLocale">
                Rate Type
            </th>
            <th class="sfLocale">
                Is Per Lbs?
            </th>
            <th>&nbsp;
                
            </th>
        </thead>
        <tr>
            <td>
                <label id="lblWeightDedendencies" class="cssClassLabel sfLocale">
                    More Than
                </label>
            </td>
            <td>
                <input type="text" id="txtWeight" name="weight" maxlength="5" class="cssClassWeight" />
                lbs<span class="cssClassRequired">*</span> <span id="errmsgWeight"></span>
            </td>
            <td>
                <input type="text" id="txtWeightRateValue" name="weightRateValue" maxlength="5" class="cssClassWeightRateValue" />
                <span class="cssClassRequired">*</span><span id="errmsgWeightRateValue"></span>
            </td>
            <td>
                <select id="ddlWeightDependencies" class="cssClassDropDownCostDependencies">
                    <%--<option value="0">Absolute ($)</option>
                    <option value="1">Percent (%)</option>--%>
                </select>
            </td>
            <td>
                <input type="checkbox" id="chkPerLbs" class="cssClassWeightIsActive" />
            </td>
            <td>
                <span class="nowrap">
                    <img class="cssClassWeightAddRow" title="Add empty item"
                        alt="Add empty item" name="add" src="" />&nbsp;
                    <img class="cssClassWeightCloneRow"
                        alt="Clone this item" title="Clone this item" name="clone" src="" />&nbsp;
                    <img class="cssClassWeightDeleteRow"
                        alt="Remove this item" name="remove" src="" />&nbsp; </span>
            </td>
        </tr>
    </table>
    <div class="sfButtonwrapper" id="WeightDependencyButtonWrapper">
        <p>
            <button type="button" id="btnCancelWeightDependencies">
                <span><span class="sfLocale">Cancel</span></span></button>
        </p>
        <p>
            <button type="button" id="btnCreateWeight">
                <span><span class="sfLocale">Create</span></span></button>
        </p>
    </div>
    <table border="0" width="100%" cellpadding="0" cellspacing="0" id="tblItemDependencies">
        <thead>
            <th>&nbsp;
                
            </th>
            <th class="sfLocale">
                Quantity
            </th>
            <th class="sfLocale">
                Rate Value
            </th>
            <th class="sfLocale">
                Rate Type
            </th>
            <th class="sfLocale">
                Is Per Items?
            </th>
            <th>&nbsp;
                
            </th>
        </thead>
        <tr>
            <td>
                <label id="lblItemDedendencies" class="cssClassLabel class="sfLocale"">
                    More Than
                </label>
            </td>
            <td>
                <input type="text" id="txtQuantity" name="quantity" maxlength="5" class="cssClassQuantity" maxlength="5" />
                item(s)<span class="cssClassRequired">*</span> <span id="errmsgQty"></span>
            </td>
            <td>
                <input type="text" id="txtQuantityRateValue" name="quantityRateValue" maxlength="5"  class="cssClassQuantityRateValue" />
                <span class="cssClassRequired">*</span><span id="errmsgQtyRateValue"></span>
            </td>
            <td>
                <select id="ddlItemDependencies" class="cssClassDropDownCostDependencies">
                   <%-- <option value="0">Absolute ($)</option>
                    <option value="1">Percent (%)</option>--%>
                </select>
            </td>
            <td>
                <input type="checkbox" id="chkPerItems" class="cssClassItemIsActive" />
            </td>
            <td>
                <span class="nowrap">
                    <img class="cssClassItemAddRow" title="Add empty item"
                        alt="Add empty item" name="add" src="" />&nbsp;
                    <img class="cssClassItemCloneRow" alt="Clone this item"
                        title="Clone this item" name="clone" src="" />&nbsp;
                    <img class="cssClassItemDeleteRow"
                        src="" alt="Remove this item" name="remove" />&nbsp; </span>
            </td>
        </tr>
    </table>
    <div class="sfButtonwrapper" id="ItemDependencyButtonWrapper">
        <p>
            <button type="button" id="btnCancelItemDependencies">
                <span><span class="sfLocale">Cancel</span></span></button>
        </p>
        <p>
            <button type="button" id="btnCreateItem">
                <span><span class="sfLocale">Create</span></span></button>
        </p>
    </div>
</div>
<!-- End PopUP -->
