<%@ Control Language="C#" AutoEventWireup="true" CodeFile="InventoryDetails.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxAdminDashBoard_InventoryDetails" %>

<script type="text/javascript">
    //<![CDATA[
    var lowStock = '<%=LowStockQuantity%>';
    //]]>
</script>

<div id="divInventoryDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblInventoryDetail" runat="server" Text="Inventory " 
                    meta:resourcekey="lblInventoryDetailResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <div class="classTableWrapper">
                <table cellspacing="0" cellpadding="0" width="100%" border="0" id="tblInventoryDetail">
                    <tr>
                        <td class="cssClassTableLeftCol">
                            <asp:Label ID="lblTotalItem" runat="server" CssClass="cssClassLabel" 
                                Text="Total Items: " meta:resourcekey="lblTotalItemResource1"></asp:Label><label
                                id="lblItemtotal"></label>
                        </td>
                        <td>
                            <asp:Label ID="lblActiveItem" runat="server" CssClass="cssClassLabel" 
                                Text="Active Items: " meta:resourcekey="lblActiveItemResource1"></asp:Label><label
                                id="lblAvtive"></label>
                        </td>
                    </tr>
                    <tr>
                        <td class="cssClassTableLeftCol">
                            <asp:Label ID="lblHiddenItem" runat="server" CssClass="cssClassLabel" 
                                Text="Hidden Items: " meta:resourcekey="lblHiddenItemResource1"></asp:Label><label
                                id="lblHidden"></label>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td class="cssClassTableLeftCol">
                            <asp:Label ID="lblDownloadableItems" runat="server" CssClass="cssClassLabel" 
                                Text="Downloadable Items: " meta:resourcekey="lblDownloadableItemsResource1"></asp:Label><label
                                id="lblDownloadable"></label>
                        </td>
                        <td>
                            <asp:Label ID="lblSpecialItems" runat="server" CssClass="cssClassLabel" 
                                Text="Special Items: " meta:resourcekey="lblSpecialItemsResource1"></asp:Label><label
                                id="lblSpecial"></label>
                        </td>
                    </tr>
                    <tr>
                        <td class="cssClassTableLeftCol">
                            <asp:Label ID="lblLowStockItem" runat="server" CssClass="cssClassLabel" 
                                Text="Low Stock Items: " meta:resourcekey="lblLowStockItemResource1"></asp:Label><label
                                id="lblLowstock"></label>
                        </td>
                        <td>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
