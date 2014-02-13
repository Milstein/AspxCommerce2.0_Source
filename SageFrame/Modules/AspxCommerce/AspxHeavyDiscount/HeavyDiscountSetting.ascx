<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HeavyDiscountSetting.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxHeavyDiscount_HeavyDiscountSetting" %>

<script type="text/javascript">

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxHeavyDiscount
        });
        var noOfHeavyDiscountItemShown = '<%=NoOfItemShown %>';
        var EnableHeavyDiscountItems = '<%=EnableHeavyDiscountItems %>';
        var HeavyDiscountPercent = '<%=HeavyDiscountPercent %>';
        var discountService = '<%=ModuleServicePath%>';
        var storeId = '<%=aspxCommonObj.StoreID %>';
        var portalId = '<%=aspxCommonObj.PortalID %>';
        var cultureName = '<%=aspxCommonObj.CultureName %>';
        var updateSetting = {

            EnableModule: '',
            DiscountValue: '',
            NoOfItemShown: '',
            HeaderText: '',
            StoreId: storeId,
            PortalId: portalId,
            CultureName: cultureName
        };
        $("#txtNoOfHeavyDiscountItem").val(noOfHeavyDiscountItemShown);
        $("#txtHeavyDiscountValue").val(HeavyDiscountPercent);
        if (EnableHeavyDiscountItems.toLowerCase() == 'true') {
            $("#chkenableheavydiscount").attr('checked', 'checked');
        }
        $('#btnDiscountSetting').click(function() {
            updateSetting.EnableModule = $("#chkenableheavydiscount").attr("checked");
            updateSetting.DiscountValue = $('#txtHeavyDiscountValue').val();
            updateSetting.NoOfItemShown = $('#txtNoOfHeavyDiscountItem').val();
            $.ajax({
                type: 'post',
                async: false,
                url: discountService + "AspxCommerceWebService.asmx/SetDiscountSetting",
                contentType: "application/json;charset=utf-8",
                data: JSON2.stringify({ heavy: updateSetting }),
                dataType: 'JSON',
                success: function() {
                    SageFrame.messaging.show("Setting Saved Successfully", "Success");
                },
                error: ''
            });
        });

    });
               
</script>

<div>
    <h3 class="sfLocale">
        Heavy discount module setting
    </h3>
    <table>
        <tr>
            <td>
                <span class="sfLocale">Heavy discount value (% and above)</span>
            </td>
            <td>
                <input type="text" id="txtHeavyDiscountValue" />
            </td>
        </tr>
        <tr>
            <td>
                <span class="sfLocale">No of heavy discount item</span>
            </td>
            <td>
                <input type="text" id="txtNoOfHeavyDiscountItem" value="noOfHeavyDiscountItemShown" />
            </td>
        </tr>
        <tr>
            <td>
                <span class="sfLocale">Enable heavy discount</span>
            </td>
            <td>
                <input type="checkbox" id="chkenableheavydiscount" />
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" class="sfLocale" id="btnDiscountSetting" value="Save" />
            </td>
        </tr>
    </table>
</div>
