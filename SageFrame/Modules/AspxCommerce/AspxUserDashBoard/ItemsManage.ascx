<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemsManage.ascx.cs" Inherits="Modules_AspxUserDashBoard_ItemsManage" %>

<script type="text/javascript">
    //<![CDATA[
    var userEmail = '<%=userEmail %>';
    var maxFileSize = '<%=MaximumFileSize %>';
    var maxDownloadFileSize='<%=MaxDownloadFileSize%>';
    var PriceUnit = '<%=PriceUnit %>';
    var WeightUnit = '<%=WeightUnit %>';
    var DimensionUnit = '<%=DimensionUnit %>';
    var currencyCode = '<%=CurrencyCodeSlected %>';
    $(function () {
        $(".sfLocale").localize({
            moduleKey: AspxUserDashBoard
        });
    });
    //]]>
</script>

<!-- Grid -->
<div id="gdvItems_grid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="My Added Items" meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNew">
                            <span><span class="sfLocale">Add New Item</span></span></button>
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
                                    SKU:</label>
                                <input type="text" id="txtSearchSKU" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Name:</label>
                                <input type="text" id="txtSearchName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Item Type:</label>
                                <select id="ddlSearchItemType" class="sfListmenu">
                                    <option value="0" class="sfLocale">--All--</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Attribute Set Name:</label>
                                <select id="ddlAttributeSetName" class="sfListmenu">
                                    <option value="0" class="sfLocale">--All--</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Visibility:</label>
                                <select id="ddlVisibitity" class="sfListmenu">
                                    <option value="" class="sfLocale">--All--</option>
                                    <option value="True" class="sfLocale">True</option>
                                    <option value="False" class="sfLocale">False</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    IsActive:</label>
                                <select id="ddlIsActive" class="sfListmenu">
                                    <option value="" class="sfLocale">--All--</option>
                                    <option value="True" class="sfLocale">True</option>
                                    <option value="False" class="sfLocale">False</option>
                                </select>
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnSearchItems">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxImageLoader" src="" alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvItems" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<!-- End of Grid -->
<!-- Add New Item -->
<div id="gdvItems_form" style="display: none">
   
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblHeading" runat="server" Text="Add New Item" meta:resourcekey="lblHeadingResource1"></asp:Label>
            </h1>
        </div>
        <div class="sfFormwrapper">
            <h2>
                <asp:Label ID="lblTabInfo" runat="server" Text="Create Item Settings" meta:resourcekey="lblTabInfoResource1"></asp:Label>
            </h2>
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
                <tr>
                    <td>
                        <asp:Label ID="lblAttributeSet" runat="server" Text="Attribute Set:" CssClass="cssClassLabel"
                            meta:resourcekey="lblAttributeSetResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <select id="ddlAttributeSet" class="sfListmenu" name="D1">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblItemType" runat="server" Text="Item Type:" CssClass="cssClassLabel"
                            meta:resourcekey="lblItemTypeResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <select id="ddlItemType" class="sfListmenu" name="D2">
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnBack">
                    <span><span class="sfLocale">Back</span></span></button>
            </p>
            <p>
                <button type="button" id="btnReset">
                    <span><span class="sfLocale">Reset</span></span></button>
            </p>
            <p>
                <button type="button" id="btnContinue">
                    <span><span class="sfLocale">Continue</span></span></button>
            </p>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<div id="gdvItems_accordin" style="display: none">
   
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblNewItem" class="sfLocale"></label>
            </h2>
        </div>
        <input type="hidden" id="ItemMgt_itemID" value="0" />
          <div class="quick-navigation" >
        <ul class="sf-menu" id="ulQuickNavigation">
            <li></li>
        </ul>
    </div>
        <div id="dynItemForm" class="cssClassAccordionWrapper">
        </div>
    </div>
</div>
<input type="hidden" id="hdnSKUTxtBox" />
<!-- End of Add New Item  -->
<%--<div class="popupbox cssClassItemCostVariant" id="popuprel">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span>Close</span></button>
    </div>
</div>--%>
<div class="popupbox cssClassVariantImagews" id="popuprel2">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <div class="sfGridWrapperContent">
        <div id="divUploader">
            <input type="file" class="cssClassBrowse" id="imageUploader"></div>
        <table cellspacing="0" cellpadding="o" border="0" width="100%" id="VariantsImagesTable">
            <thead>
                <tr class="cssClassHeading">
                    <td class="sfLocale">
                        Image
                    </td>
                    <td class="sfLocale">
                        Remove
                    </td>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnSaveImages">
                    <span><span class="sfLocale">Save</span></span></button>
            </p>
            <p>
                <button type="button" id="btnImageBack">
                    <span><span class="sfLocale">Back</span></span></button>
            </p>
            <div class="cssClassClear">
            </div>
        </div>
    </div>
</div>
