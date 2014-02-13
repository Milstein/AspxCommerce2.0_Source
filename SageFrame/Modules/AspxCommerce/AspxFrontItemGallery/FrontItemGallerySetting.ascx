<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FrontItemGallerySetting.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxFrontItemGallery_FrontItemGallerySetting" %>
<div class="sfFormwrapper">
    <h3 class="sfLocale">
        Front Item Gallery Settings</h3>
    <table border="0" width="100%" id="tblHeaderSettingsForm">
        <tr>
            <td>
                <asp:Label ID="lblFrontGalleryDisplayAs" runat="server" Text="Gallery display As:"
                    CssClass="sfFormlabel" 
                    meta:resourcekey="lblFrontGalleryDisplayAsResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <select id="ddlGalleryDisplayAs" class="sfListmenu">
                    <option value="Featured" class="sfLocale">Featured</option>
                    <option value="Special" class="sfLocale">Special</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblCount" runat="server" Text="Count:" CssClass="sfFormlabel" 
                    meta:resourcekey="lblCountResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="text" class="sfInputbox" id="txtCount">
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" id="btnSaveFrontGallerySetting" value="Save" class="sfBtn" />
            </td>
        </tr>
    </table>
</div>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
    $(".sfLocale").localize({
    moduleKey: AspxFrontItemGallery
    });
        var ModuleServicePath = '<%=ModuleServicePath %>';
        var GalleryDisplayAs = '<%=GalleryDisplayAs %>';
        var Count = '<%=Count %>';
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                CultureName: AspxCommerce.utils.GetCultureName()
            };
            return aspxCommonInfo;
        };
        $("#ddlGalleryDisplayAs").val(GalleryDisplayAs);
        $("#txtCount").val(Count);
        $('#btnSaveFrontGallerySetting').click(function() {
            var galleryDisplayAs = $("#ddlGalleryDisplayAs").val();
            var count = $("#txtCount").val();
            if (count == '') {
                return false;
            }
            $.ajax({
                type: 'post',
                async: false,
                url: ModuleServicePath + "AspxCommerceWebService.asmx/SetFrontGallerySetting",
                contentType: "application/json;charset=utf-8",
                data: JSON2.stringify({ galleryDisplayAs: galleryDisplayAs, count: count, aspxCommonObj: aspxCommonObj() }),
                dataType: 'JSON',
                success: function() {
                SageFrame.messaging.show(getLocale(AspxFrontItemGallery, 'Setting Saved Successfully'), "Success");
                },
                error: ''
            });
        });
    });
    //]]>
</script>

