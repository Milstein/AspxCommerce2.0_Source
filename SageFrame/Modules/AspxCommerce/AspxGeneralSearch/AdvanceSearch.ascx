<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AdvanceSearch.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxGeneralSearch_AdvanceSearch" %>

<script type="text/javascript">
    //<![CDATA[

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGeneralSearch
        });
    });

    var noImageAdSearchPathSetting = '<%=NoImageAdSearchPath %>';
    var allowOutStockPurchaseSetting = '<%=AllowOutStockPurchase %>';
    var allowWishListAdvSearchSetting = '<%=AllowWishListAdvSearch %>';
    var noOfItemsInRow = '<%=NoOfItemsInARow %>';
    var displaymode = '<%=ItemDisplayMode %>'.toLowerCase();
    //]]>                              
</script>

<div class="cssClassAdvenceSearch">
    <div class="cssClassHeader">
        <h1>
            <asp:Label ID="lblTitle" runat="server" Text="Advanced Search:" meta:resourcekey="lblTitleResource1"></asp:Label>
        </h1>
    </div>
    <div class="sfFormwrapper">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="tdpadding">
            <tr>
                <td colspan="2">
                    <asp:Label ID="lblSearchFor" runat="server" Text="Search For:" CssClass="cssClassLabel cssClasssearchFor"
                        meta:resourcekey="lblSearchForResource1"></asp:Label>
                    <input type="text" id="txtSearchFor" class="sfInputbox searchForTextBox" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <asp:Label ID="lblSearchIn" runat="server" Text="Search In:" CssClass="cssClassLabel"
                        meta:resourcekey="lblSearchInResource1"></asp:Label>
                    <div id="divCheckBox">
                        <ul>
                        </ul>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblCategory" runat="server" Text="Category:" CssClass="cssClassLabel"
                        meta:resourcekey="lblCategoryResource1"></asp:Label>
                    <select id="ddlCategory" class="">
                    </select>
                </td>
                <td>
                    <span class="pricebox">
                        <asp:Label ID="lblPriceIn" runat="server" Text="Price:" CssClass="cssClassLabel"
                            meta:resourcekey="lblPriceInResource1"></asp:Label>&nbsp;&nbsp;&nbsp;
                        <div id="divPriceFrom">
                            <span class="sfLocale">From:</span><input class="sfInputbox" id="txtPriceFrom" type="text" />
                            <span id="errmsgPriceFrom"></span>
                        </div>
                        <div id="divPriceTo">
                            <span class="sfLocale">To:</span><input class="sfInputbox" id="txtPriceTo" type="text" />
                            <span id="errmsgPriceTo"></span>
                        </div>
                    </span>
                </td>
            </tr>
        </table>
    </div>
    <div class="sfButtonwrapper cssClassPaddingNone">
        <p>
            <button type="button" id="btnAdvanceSearch">
                <span><span class="sfLocale">Search</span></span></button>
        </p>
    </div>
	<div class="clear"></div>
</div>
<div id="divItemViewOptions" class="viewWrapper">
    <div id="divViewAs" class="view">
        <span class="sfLocale">View as:</span>
        <select id="ddlAdvanceSearchViewAs" class="sfListmenu" style="display: none">
        </select>
    </div>
    <div id="divSortBy" class="sort">
        <span class="sfLocale">Sort by:</span>
        <select id="ddlAdvanceSearchSortBy" class="sfListmenu">
        </select>
    </div>
</div>
<div id="divShowAdvanceSearchResult" class="cssClassDisplayResult">
</div>
<div class="cssClassClear">
</div>
<!-- TODO:: paging Here -->
<div class="cssClassPageNumber" id="divSearchPageNumber">
    <div class="cssClassPageNumberLeftBg">
        <div class="cssClassPageNumberRightBg">
            <div class="cssClassPageNumberMidBg">
                <div id="Pagination">
                </div>
                <div class="cssClassViewPerPage">
                    <span class=" sfLocale">View Per Page</span>
                    <select id="ddlPageSize" class="sfListmenu">
                        <option value=""></option>
                    </select></div>
                <%--<table width="84%" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="40">
                            <a href="#">Prev</a>
                        </td>
                        <td>
                            <span>1</span> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">5</a>
                            <a href="#">6</a> <a href="#">7</a> <a href="#">8</a> <a href="#">9</a> <a href="#">
                                10</a> <a href="#">11</a> <a href="#">12</a> <a href="#">13</a> <a href="#">14</a>
                            <a href="#">15</a> <a href="#">16</a> <a href="#">17</a> <a href="#">18</a> <a href="#">
                                19</a> <a href="#">20</a>
                        </td>
                        <td width="40">
                            <a href="#">Next</a>
                        </td>
                    </tr>
                </table>--%>
            </div>
        </div>
    </div>
</div>
