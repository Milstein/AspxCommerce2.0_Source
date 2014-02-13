<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SimpleSearchSetting.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxGeneralSearch_SimpleSearchSetting" %>
<div class="sfFormwrapper">
    <h3 class="sfLocale">
        Search Settings</h3>
    <table border="0" width="100%" id="tblSearchSettingsForm">
        <tr>
            <td>
                <asp:Label ID="lblShowCategoryForSearch" runat="server" Text="Show Category For Search:"
                    CssClass="sfFormlabel" 
                    meta:resourcekey="lblShowCategoryForSearchResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="checkbox" id="chkShowCatForSearch" />
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblEnableAdvanceSearch" runat="server" Text="Enable Advance Search:"
                    CssClass="sfFormlabel" meta:resourcekey="lblEnableAdvanceSearchResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="checkbox" id="chkEnableAdvanceSearch" />
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblShowSearchKeyWords" runat="server" Text="Show Top Search Keywords:"
                    CssClass="sfFormlabel" meta:resourcekey="lblShowSearchKeyWordsResource1"></asp:Label>
            </td>
            <td class="cssClassGridRightCol">
                <input type="checkbox" id="chkShowSearchKeyWord" />
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" id="btnSaveSearchSetting" value="Save" />
            </td>
        </tr>
    </table>
</div>

<script type="text/javascript">

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGeneralSearch
        });
        var ModuleServicePath = '<%=ModuleServicePath %>';
        var ShowCategoryForSearch = '<%=ShowCategoryForSearch %>';
        var EnableAdvanceSearch = '<%=EnableAdvanceSearch %>';
        var ShowSearchKeyWord = '<%=ShowSearchKeyWord %>';
        var storeId = '<%=aspxCommonObj.StoreID %>';
        var portalId = '<%=aspxCommonObj.PortalID %>';
        var cultureName = '<%=aspxCommonObj.CultureName %>';
        var updateSetting = {
            ShowCategoryForSearch: '',
            EnableAdvanceSearch: '',
            ShowSearchKeyWord: ''
        };
        var aspxCommonObj = {
            StoreID: storeId,
            PortalID: portalId,
            CultureName: cultureName
        };
        if (ShowCategoryForSearch.toLowerCase() == 'true') {
            $("#chkShowCatForSearch").attr('checked', 'checked');
        }
        if (EnableAdvanceSearch.toLowerCase() == 'true') {
            $("#chkEnableAdvanceSearch").attr('checked', 'checked');
        }
        if (ShowSearchKeyWord.toLowerCase() == 'true') {
            $("#chkShowSearchKeyWord").attr('checked', 'checked');
        }

        $('#btnSaveSearchSetting').click(function() {
            updateSetting.ShowCategoryForSearch = $("#chkShowCatForSearch").attr("checked");
            updateSetting.EnableAdvanceSearch = $("#chkEnableAdvanceSearch").attr("checked");
            updateSetting.ShowSearchKeyWord = $("#chkShowSearchKeyWord").attr("checked");
            $.ajax({
                type: 'post',
                async: false,
                url: ModuleServicePath + "AspxCommerceWebService.asmx/SetSearchSetting",
                contentType: "application/json;charset=utf-8",
                data: JSON2.stringify({ searchSettingObj: updateSetting, aspxCommonObj: aspxCommonObj }),
                dataType: 'JSON',
                success: function() {
                SageFrame.messaging.show(getLocale(AspxGeneralSearch, 'Setting Saved Successfully'), "Success");
                },
                error: ''
            });
        });

    });
               
</script>

