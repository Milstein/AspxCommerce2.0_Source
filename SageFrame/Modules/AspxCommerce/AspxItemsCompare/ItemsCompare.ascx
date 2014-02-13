<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemsCompare.ascx.cs"
    Inherits="Modules_AspxCompareItems_ItemsCompare" %>

<script type="text/javascript" language="javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxItemsCompare
        });
    });
    var enableCompareItem = '<%=EnableCompareItems %>';
    var compareItemListURL = '<%=CompareItemListURL %>';
    var maxCompareItemCount = '<%=MaxCompareItemCount%>';
    var compareLen = '<%=compareLen %>';
    var defaultImagePath = '<%=DefaultImagePath %>';
    //]]>
</script>
<div class="fixed">
<div class="cssCompareBtnWrapper" style="display: none;"><a class="cssCompareBtnShow" href="#"><span class="sfLocale">Show Compare Items</span></a></div>
<div id="compareProductsContainer" class="cssClassCompareContainer" style="display: none;">
    <div class="compareProductsBoxTitle">
        <div>
            <h2><span class="sfLocale">
                Compare Items</span></h2>
            <div class="compareClose sfLocale" id="compareCloseBtn">
                Close
            </div>
        </div>
    </div>
    <div class="cssCompareProductsBox">
        <div id="compareError" style="display: none">
            <asp:Literal ID="ltrError" runat="server" EnableViewState="False"></asp:Literal>
        </div>
        <div id="compareProductsBox">
            <asp:Literal ID="ltrCompareItem" runat="server" EnableViewState="False"></asp:Literal>
        </div>
        <div id="compareButtonWrapper">
            <div class="sfButtonwrapper">
                <input type="button" id="btnCompare" value="Compare" class="sfBtn sfLocale" /></div>
            <div class="sfButtonwrapperclear" align="center">
                <input type="button" id="btnCompareClearAll" value="Clear All" class="sfBtn sfLocale" /></div>
        </div>  
        <div class="clear">
        </div>
    </div>
</div>
</div>

