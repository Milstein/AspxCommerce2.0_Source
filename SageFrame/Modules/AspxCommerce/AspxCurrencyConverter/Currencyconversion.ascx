<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Currencyconversion.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxCurrencyConverter_Currencyconversion" %>
<script type="text/javascript">
        //<![CDATA[
    var BaseCurrency = '<%=MainCurrency %>';
    var SelectedCurrency = '<%=SelectedCurrency %>';
    region = '<%=Region %>';
    var myAccountURL = '<%=MyAccoutURL %>';
    var singleAddressCheckOutURL = '<%=SingleAddressCheckOutURL %>';
    var compareItemListURL = '<%=CompareItemListURL %>';
    var myCartURL = '<%=MyCartURL %>';
    var additionalCVR = '<%=AdditionalCVR %>';
    var itemMgntPageURL = '<%=ItemMgntPageURL %>';
    rate = '<%=currencyRate %>';
    if (BaseCurrency != SelectedCurrency) {
        rate = eval('<%=currencyRate %>') + ((eval('<%=currencyRate %>') * eval(additionalCVR)) / 100);
    }
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCurrencyConverter
        });
    });
    
        //]]>
</script>
<div class="cssClassCurrencySelect">
    <%--<span class="sfLocale" class="sfFormlabel">Currency:</span><asp:Literal ID="litCurrency"
        runat="server" EnableViewState="false"></asp:Literal>--%>
         <span class="sfLocale sfFormlabel">Currency:</span><select id="ddlCurrency" class="makeMeFancy">
    <option value=""></option>
    </select>
</div>
