<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AspxProductList.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxProductLister_AspxProductList" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxProductLister
        });
    });

    var countryName = '<%=CountryName %>';
    var basePath = '<%=basePath %>';
    var ModuleCollapsible = "<%=ModuleCollapsible %>";
</script>

<div id="divProductContainer" class="cssClassLeftSideBox cssProductWrapper">
    <div id="titleHeader" class="cssProductListerHeader">
       <h2 class="cssClassLeftHeader sfLocale">PRODUCTS</h2>
    </div>
    <div class="cssClassProductLists">
        <div id="divProductLists" runat="server" enableviewstate="False">
        </div>
    </div>
</div>
