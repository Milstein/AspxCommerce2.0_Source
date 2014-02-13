<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ProductListSetting.ascx.cs" Inherits="Modules_AspxCommerce_AspxProductLister_ProductListSetting" %>
<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxProductLister
        });
    });
</script>

<div id="wrapper">
    <table>
        <thead>
            <h3 class="sfLocale">
                ProductListsSetting</h3>
        </thead>
<%--        <tr>
            <td>
                <asp:Label ID="lblProductHeader" runat="server" Text="Enter the Title" meta:resourcekey="lblProductHeaderResource1"></asp:Label>
            </td>
            <td>
                <input type="text" id="txtProductHeader" />
            </td>
        </tr>--%>
        <tr>
            <td>
                <asp:Label ID="lblCount" runat="server" Text="Enter the Number of Products to show"
                    meta:resourcekey="lblCountResource1"></asp:Label>
            </td>
            <td>
                <input type="text" id="txtProductCount" />
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" id="btnProductListSettingSave" class="sfLocale" value="Save" />
            </td>
        </tr>
    </table>
</div>
