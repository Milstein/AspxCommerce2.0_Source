<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShoppingOptions.ascx.cs"
    Inherits="Modules_AspxShoppingOptions_ShoppingOptions" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShoppingOptions
        });
        if (ModuleCollapsible.toLowerCase() == 'true') {
            $(".cssClassShoppingOptionHeader").addClass("sfCollapsible");
            $(".cssClassShoppingOptionHeader").live('click', function() {
                $(".cssClassShoppingOptionItems").slideToggle('fast');
            });
        }
    });
    var upperLimit = '<%=ShoppingOptionRange %>';
    var lblPriceTitle = '<%=lblShoppingTitle.ClientID %>';
    var brandCount = '<%=BrandCount %>';
    var ArrayPrice = '<%=ArryPrice %>';
    var IdsByPrice = '<%=IdsByPrice %>'
    var minPrice = '<%=minPrice %>'
    var maxPrice = '<%=maxPrice %>'
    var ModuleCollapsible = "<%=ModuleCollapsible %>";

    //]]>
</script>

<div class="cssClassLeftSideBox cssClassShoppingOption">
    <div class="cssClassShoppingOptionHeader">
        <h2 class="cssClassLeftHeader">
            <asp:Label ID="lblShoppingTitle" runat="server" Text="Shopping Options" CssClass="cssClassShoppingOptions"
                meta:resourcekey="lblShoppingTitleResource1"></asp:Label></h2>
    </div>
    <div class="cssClassCommonSideBoxTable cssClassShoppingOptionItems">
        <div class="cssClasscategorgy">
            <div id="divShoppingBrand">
                <asp:Literal ID="ltrBrandHeader" runat="server" EnableViewState="false"></asp:Literal>
                <asp:Literal ID="ltrBrandList" runat="server" EnableViewState="false"></asp:Literal>
            </div>
            <div id="scrollbar1">
                <div class="scrollbar">
                    <div class="track">
                        <div class="thumb">
                            <div class="end">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="viewport">
                    <div class="overview">
                        <asp:Literal ID="ltrBrandScroll" runat="server" EnableViewState="false"></asp:Literal>
                    </div>
                </div>
            </div>
        </div>
        <div id="ShoppingOptionsByPrice" class="cssClasscategorgy">
            <div class="divTitle">
                <asp:Literal ID="ltrByPriceTitle" runat="server" EnableViewState="false"></asp:Literal>
            </div>
            <div>
                <div class="cssClassScroll">
                    <div class="scrollbar">
                        <div class="track">
                            <div class="thumb">
                                <div class="end">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="viewport">
                        <div class="overview">
                            <%-- <table id="tblShoppingOptionsByPrice" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>--%>
                            <asp:Literal ID="ltrShopByPrice" runat="server" EnableViewState="false"></asp:Literal>
                        </div>
                    </div>
                </div>
                <div class="divRange" style="display: none">
                    <div id="slider-range">
                    </div>
                </div>
                <div class="sfBtn" style="display: none">
                    <input class="cssClassSubmitBtn sfLocale" type="button" id="btnShoppingSubmit" value="GO" />
                </div>
                <div class="cssClassClear">
                </div>
            </div>
        </div>
    </div>
</div>
