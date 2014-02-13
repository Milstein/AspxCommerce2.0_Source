<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SimpleSearch.ascx.cs"
    Inherits="Modules_AspxGeneralSearch_SimpleSearch" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGeneralSearch
        });
        if (showCategoryForSearch.toLowerCase() == 'true') {
            $("#sfFrontCategory").show();

        }
        if (enableAdvanceSearch.toLowerCase() == 'true') {
            $("#lnkAdvanceSearch").show();
        }
        if (showSearchKeyWords.toLowerCase() == 'true') {
            $("#topSearch").show();
        }
    });
    var advanceSearchURL = '<%=AdvanceSearchURL %>';
    var showCategoryForSearch = '<%=ShowCategoryForSearch %>';
    var enableAdvanceSearch = '<%=EnableAdvanceSearch %>';
    var showSearchKeyWords = '<%=ShowSearchKeyWords %>';
    var resultPage = '<%=ResultPage%>';

    //]]>
</script>

<div class="cssClassSageSearchWrapper">
    <%--<div class="sfFormwrapper">--%>
    <ul>
        <li>
            <div id="sfFrontCategory" style="display: none">
                <div class="sfCategoryFrontMenuDropdown">
                    <dl class="sfCategoryDropdown" >
                        <dt><a href="#"><span id="spanResult" class="sfLocale">Select Category</span></a></dt>
                        <dd>
                            <asp:Literal ID="litSSCat" runat="server" EnableViewState="False" 
                                meta:resourcekey="litSSCatResource1"></asp:Literal>
                        </dd>
                    </dl>
                </div>
                <input type="hidden" value="0" id="txtSelectedCategory" name="selectedCategory" />
            </div>
        </li>
        <li>
            <input type="text" id="txtSimpleSearchText" class="cssClassSageSearchBox" /></li>
        <li>
            <input type="button" id="btnSimpleSearch" class="cssClassSageSearchButton sfLocale"
                value="Go" /></li>
    </ul>
    <%--<a href="#" id="lnkAdvanceSearch" class="cssClassAdvanceSearch">Go For Advanced Search</a>--%>
    <asp:Literal ID="litTopSearch" runat="server" EnableViewState="False" 
        meta:resourcekey="litTopSearchResource1"></asp:Literal>
    <div>
        <a href="#" id="lnkAdvanceSearch" class="cssClassAdvanceSearchLink sfLocale" style="display: none">
            Advanced Search</a></div>
</div>
