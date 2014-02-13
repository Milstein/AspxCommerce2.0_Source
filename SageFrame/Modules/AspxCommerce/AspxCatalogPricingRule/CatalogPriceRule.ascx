<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CatalogPriceRule.ascx.cs"
    Inherits="Modules_AspxCatalogPricingRule_CatalogPriceRule" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCatalogPricingRule
        });
    });
//<![CDATA[

  //]]>
</script>

<div class="cssClassTabMenu" id="pricingRuleTabMenu" style="display:none">
    <div id="divCatalogPricingRuleForm" class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblCatalogPricingRuleFormHeading" runat="server" 
                    Text="Catalog Pricing Rule" 
                    meta:resourcekey="lblCatalogPricingRuleFormHeadingResource1"></asp:Label>
            </h2>
        </div>        
        <div id="placeholder-templates">
        </div>
        <div class="cssClassTabPanelTable">
            <div id="CatalogPriceRule-TabContainer" class="cssClassTabpanelContent">
                <ul>
                    <li><a href="#CatalogPriceRule-1"><span id="lblRuleInformation" class="sfLocale">Rule Information</span>
                    </a></li>
                    <li class="ui-tabs"><a href="#CatalogPriceRule-2"><span id="lblCondition" class="sfLocale">Condition</span>
                    </a></li>
                    <li><a href="#CatalogPriceRule-3"><span id="lblAction" class="sfLocale">Action</span></a></li>
                </ul>
                <div id="CatalogPriceRule-1" class="sfFormwrapper">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="10%">
                                <span id="CatalogPriceRule-lblName" class="cssClassLabel sfLocale">Rule Name:</span>
                            </td>
                            <td>
                                <input type="text" id="CatalogPriceRule-txtName" name="RuleName" class="sfInputbox required" /><span class="cssClassRequired">*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id="CatalogPriceRule-lblDescription" class="cssClassLabel sfLocale">Description:</span>
                            </td>
                            <td>
                                <textarea id="CatalogPriceRule-txtDescription" rows="2" cols="80" name="Description" class="cssClassTextArea"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id="CatalogPriceRule-lblRoles" class="cssClassLabel sfLocale">Roles:</span>
                            </td>
                            <td>
                                <select id="CatalogPriceRule-mulRoles" multiple="multiple" name="Roles" class="cssClassMultiSelect required"><span class="cssClassRequired">*</span>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id="CatalogPriceRule-lblFromDate" class="cssClassLabel sfLocale">From Date:</span>
                            </td>
                            <td>
                                <input type="text" id="CatalogPriceRule-txtFromDate" name="FromDate" class="from sfInputbox required" /><span class="cssClassRequired">*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id="CatalogPriceRule-lblToDate" class="cssClassLabel sfLocale">To Date:</span>
                            </td>
                            <td>
                                <input type="text" id="CatalogPriceRule-txtToDate" name="ToDate" class="to sfInputbox required" />
    							<span id ="created" style="color:#ED1C24;"></span><span class="cssClassRequired">*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id="CatalogPriceRule-lblPriority" class="cssClassLabel sfLocale">Priority:</span>
                            </td>
                            <td>
                                <input type="text" id="CatalogPriceRule-txtPriority" name="name="Priority" class="sfInputbox required" maxlength="2"/>
                                <span id="priority" style="color:Red;"></span><span class="cssClassRequired">*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id="CatalogPriceRule-lblIsActive" class="cssClassLabel sfLocale">Is Active:</span>
                            </td>
                            <td>
                                <input type="checkbox" id="CatalogPriceRule-chkIsActive" class="cssClassCheckBox" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="CatalogPriceRule-2">
                    <div class="cssClassFieldSet">
                        <h2 class="sfLocale">
                            Conditions (leave blank for all products)</h2>
                        <div class="cssClassFieldSetContent">
                            <span class="cssClassOnClick sfLocale">IF
                                <input type="hidden" name="type_0" id="type_0" title="type" value="combination" />
                                <input type="hidden" name="pricingRuleID" id="pricingRuleID" value="0" />
                                <a class="cssClassFieldSetLabel" href="#" onclick="CatalogPricingRule.Edit(this)">ALL</a> <span class="cssClassElement">
                                    <select name="aggregator_0" id="aggregator_0" class="element-value-changer select"
                                        onblur="CatalogPricingRule.GetDropdownValue(this)" onchange="CatalogPricingRule.GetDropdownValue(this)">
                                        <option value="ALL" selected="selected" class="sfLocale">ALL</option>
                                        <option value="ANY" class="sfLocale">ANY</option>
                                    </select>
                                </span></span>&nbsp;<span class="sfLocale"> of these conditions are </span><span class="cssClassOnClick"><a class="cssClassFieldSetLabel sfLocale"
                                    onclick="CatalogPricingRule.Edit(this)">TRUE</a><span class="cssClassElement">
                                        <select name="value_0" id="value_0" title="value" class="element-value-changer select"
                                            onblur="CatalogPricingRule.GetDropdownValue(this)" onchange="CatalogPricingRule.GetDropdownValue(this)">
                                            <option value="TRUE" selected="selected" class="sfLocale">TRUE</option>
                                            <option value="FALSE" class="sfLocale">FALSE</option>
                                        </select>
                                    </span></span>&nbsp;
                            <ul class="cssClassOnClickChildren" id="1">
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="CatalogPriceRule-3" class="sfFormwrapper">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="cssClassTableLeftCol" width="10%">
                                <span id="CatalogPriceRule-lblApply" class="cssClassLabel sfLocale">Apply:</span>
                            </td>
                            <td>
                                <select id="CatalogPriceRule-cboApply" class="sfListmenu">
                                    <option value="1" class="sfLocale">By Percentage of the Original Price</option>
                                    <option value="2" class="sfLocale">By Fixed Amount</option>
                                    <option value="3" class="sfLocale">To Percentage of the Original Price</option>
                                    <option value="4" class="sfLocale">To Fixed Amount</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="cssClassTableLeftCol">
                                <span id="CatalogPriceRule-lblValue" class="cssClassLabel sfLocale">Value:</span>
                            </td>
                            <td>
                                <input type="text" id="CatalogPriceRule-txtValue" name="Value" class="sfInputbox required"/>
                             <span id="percError" style="color:#ED1C24;" ></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="cssClassTableLeftCol">
                                <span id="Span3" class="cssClassLabel sfLocale">Further Rule Processing:</span>
                            </td>
                            <td>
                                <input type="checkbox" id="CatalogPriceRule-chkFurtherRuleProcessing" class="cssClassCheckBox" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="sfButtonwrapper">
                <p>
                    <button type="submit" id="btnSavePricingRule">
                        <span class="sfLocale">Save</span></button>
                </p>
                <p>
                    <button type="button" onclick="CatalogPricingRule.CancelPricingRule()">
                        <span class="sfLocale">Cancel</span></button>
                </p>
                <p>
                    <button type="button" onclick="CatalogPricingRule.ResetPricingRule()" id="resetPricngRule">
                        <span class="sfLocale">Reset</span></button>
                </p>
            </div>
        </div>
    </div>
</div>
<div id="pricingRuleGrid" class="cssClassCommonBox Curve">
    <div class="cssClassHeader">
        <h1>
            <asp:Label ID="lblPricingRuleGridHeading" runat="server" 
                Text="Catalog Price Rules" 
                meta:resourcekey="lblPricingRuleGridHeadingResource1"></asp:Label>
        </h1>
        <div class="cssClassHeaderRight">
            <div class="sfButtonwrapper">
                <p>
                    <button type="button" id="btnDeleteCatRules">
                        <span><span class="sfLocale">Delete All Selected</span></span></button>
                </p>
                <p>
                    <button type="button" id="btnAddNewCatRule">
                        <span><span class="sfLocale">Add Pricing Rule</span></span></button>
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
                                Rule Name:</label>
                            <input type="text" id="txtCatalogPriceRuleSrc" class="sfTextBoxSmall" />
                        </td>
                <td width="90">
                            <label class="cssClassLabel sfLocale">
                                From Date:</label>
                            <input type="text" id="txtPricingRuleStartDate" class="sfTextBoxSmall" />
                        </td>
                    <td width="90">
                            <label class="cssClassLabel sfLocale">
                                To Date:</label>
                            <input type="text" id="txtPricingRuleEndDate" class="sfTextBoxSmall" />
                        </td>
                    <td width=90">
                            <label class="cssClassLabel sfLocale">
                                Status:</label>
                            <select id="ddlPricingRuleIsActive" class="sfSelect">
                                <option value="" class="sfLocale">-- All --</option>
                                <option value="True" class="sfLocale">Active</option>
                                <option value="False" class="sfLocale">Inactive</option>
                            </select>
                        </td>
                    <td>
                            <div class="sfButtonwrapper cssClassPaddingNone">
                                <p>
                                    <button type="button" onclick="CatalogPricingRule.SearchPricingRule()">
                                        <span><span class="sfLocale">Search</span></span></button>
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="loading">
                <img id="ajaxCatalogPriceImageLoad" src=""  class="sfLocale" alt="loading...."/>
            </div>
            <div class="log">
            </div>
            <table id="gdvCatalogPricingRules" width="100%" border="0" cellpadding="0" cellspacing="0">
            </table>
        </div>
    </div>
</div>
