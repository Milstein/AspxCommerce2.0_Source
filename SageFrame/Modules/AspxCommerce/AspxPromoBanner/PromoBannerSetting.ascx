<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PromoBannerSetting.ascx.cs"
    Inherits="Modules_PromoBanner_PromoBannerSetting" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxPromoBanner
        });
    });
    var modulePath = '<%=modulePath %>';
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    };

    function SavePromoSetting() {
        var aspxCommonInfo = aspxCommonObj();
        var count = $("#txtCount").val();
        var pageName = $("#txtPageName").val();
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/SavePromoSetting",
            data: JSON2.stringify({ count: count, pageName: pageName, aspxCommonObj: aspxCommonInfo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(msg) {
                //  csscody.alert('<h2>' + getLocale(AspxPromoBanner, 'Message Info') + '</h2><p>' + getLocale(AspxPromoBanner, 'Save Successfully') + '</p>');
                SageFrame.messaging.show(getLocale(AspxPromoBanner,"Setting Saved Successfully"), "Success");

            },
            error: function() {
                SageFrame.messaging.show(getLocale(AspxPromoBanner,"Setting Failed To Save", "Error"));
            }
        });
    }

    function GetPromoSetting() {
        var aspxCommonInfo = aspxCommonObj();
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/GetPromoSetting",
            data: JSON2.stringify({ aspxCommonObj: aspxCommonInfo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(msg) {
                $.each(msg.d, function(index, item) {
                    var count = item.BannerCount;
                    var pageName = item.PageName;
                    $("#txtCount").val(count);
                    $("#txtPageName").val(pageName);
                });
            },
            error: function() {
                //csscody.alert('<h2>' + getLocale(AspxPromoBanner, 'Information Alert') + '</h2><p>' + getLocale(AspxPromoBanner, 'Failed to Load') + '</p>');

            }
        });
    }

    $(document).ready(function() {
        GetPromoSetting();
        $("#btnSave").click(function() {
            SavePromoSetting();
        });
    });
</script>

<div id="divPromoSetting">
    <h2 class="sfLocale">
        Promo Banner Setting</h2>
    <table>
        <tr>
            <td>
                <label class="sfLocale">
                    Enter the number of Banner to Show</label>
            </td>
            <td>
                <input type="text" id="txtCount" />
            </td>
        </tr>
        <tr>
            <td>
                <label class="sfLocale">
                    View More Reference Page Name</label>
            </td>
            <td>
                <input type="text" id="txtPageName" />
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" id="btnSave" value="Save" />
            </td>
        </tr>
    </table>
</div>
