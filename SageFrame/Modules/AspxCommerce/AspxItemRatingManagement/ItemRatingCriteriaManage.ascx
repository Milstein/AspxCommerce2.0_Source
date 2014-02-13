<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemRatingCriteriaManage.ascx.cs"
    Inherits="Modules_AspxItemRatingManagement_ItemRatingCriteriaManage" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxItemRatingManagement
        });
    });
    //<![CDATA[
   var lblItemRatingFormTitle='<%=lblItemRatingFormTitle.ClientID %>';
    //]]>
</script>

<div id="divShowItemCriteriaDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Manage Item Rating Criteria" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" class="" id="btnDeleteSelectedCriteria">
                            <span><span class="sfLocale">Delete All Selected</span></span></button>
                    </p>
                    <%--<p> <input type="button" class="" id="btnDeactivateSelected" value="Deactivate All Selected" /> </p>--%>
                    <p>
                        <button type="button" class="" id="btnAddNewCriteria">
                            <span><span class="sfLocale">Add New Criteria</span></span></button>
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
                                    Rating Criteria:</label>
                                <input type="text" id="txtSearchCriteria" class="sfTextBoxSmall" />
                            </td>
                          <td width="160"> 
                                <label class="cssClassLabel sfLocale">
                                    Is Active:</label>
                                <select id="ddlIsActive" class="sfListmenu">
                                    <option value="" class="sfLocale">--All--</option>
                                    <option value="True" class="sfLocale">Yes</option>
                                    <option value="False" class="sfLocale">No</option>
                                </select>
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" id="btnCriteriaSearch" >
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxItemRatingCriteriaImage" src=""  alt="loading...." class="sfLocale"/>
                </div>
                <div class="log">
                </div>
                <table id="gdvItemRatingCriteria" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divItemCriteriaForm" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblItemRatingFormTitle" runat="server" 
                    meta:resourcekey="lblItemRatingFormTitleResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table border="0" width="100%" id="tblEditReviewForm" class="cssClassPadding tdpadding">
                <tr>
                    <td width="10%">
                        <asp:Label ID="lblCriteria" runat="server" Text="Criteria:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCriteriaResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtNewCriteria" name="CriteriaTypeName" class="sfInputbox required" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblIsActive" runat="server" Text="Is Active:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblIsActiveResource1"></asp:Label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="checkbox" id="chkIsActive" class="cssClassCheckBox" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnCancelCriteriaUpdate">
                    <span><span class="sfLocale">Cancel</span></span></button>
            </p>
            <p>
                <button type="button" id="btnSubmitCriteria">
                <span><span class="sfLocale">Save</span></span></button>
            </p>
        </div>
        <input type="hidden" id="hdnItemCriteriaID" />
    </div>
</div>
