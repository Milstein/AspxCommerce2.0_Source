<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategoryWiseItemsSettings.ascx.cs" Inherits="Modules_AspxCommerce_AspxCategoryWiseItemsList_CategoryWiseItemsSettings" %>
<script type="text/javascript">
    var categoryWiseItemSettings = '';
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCategoryWiseItem
        });
        var modulePath = '<%=ModulePath %>';
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                //   UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName()
            };
            return aspxCommonInfo;
        };
        categoryWiseItemSettings = {
            config: {
                isPostBack: false,
                async: true,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath,
                baseURL1: modulePath,
                method: "",
                url: "",
                ajaxCallMode: 0,
                itemid: 0
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: categoryWiseItemSettings.config.type,
                    contentType: categoryWiseItemSettings.config.contentType,
                    cache: categoryWiseItemSettings.config.cache,
                    async: categoryWiseItemSettings.config.async,
                    url: categoryWiseItemSettings.config.url,
                    data: categoryWiseItemSettings.config.data,
                    dataType: categoryWiseItemSettings.config.dataType,
                    success: categoryWiseItemSettings.config.ajaxCallMode,
                    error: categoryWiseItemSettings.config.ajaxFailure
                });
            },
            GetSettings: function() {
                this.config.method = "AspxCommerceWebService.asmx/GetCategoryWiseItemSettings";
                this.config.url = aspxservicePath + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = categoryWiseItemSettings.BindSetting;
                this.ajaxCall(this.config);
            },
            SaveAndUpdateSettings: function(noOfItemsInCategory) {
                this.config.method = "AspxCommerceWebService.asmx/SaveCategoryItemSettings";
                this.config.url = aspxservicePath + this.config.method;
                this.config.data = JSON2.stringify({ noOfItemInCategory: noOfItemsInCategory, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = categoryWiseItemSettings.SaveSuccessfull;
                this.ajaxCall(this.config);
            },
            BindSetting: function(data) {
                $.each(data.d, function(index, value) {
                    $("#txtNoOfItems").val(value.NumberOfItemsInCategory);
                });
            },
            SaveSuccessfull: function() {
                SageFrame.messaging.show(getLocale(AspxCategoryWiseItem, "Setting Saved Successfully"), "Success");
            },
            init: function() {
                categoryWiseItemSettings.GetSettings();
                $("#btnSave").click(function() {
                    var noOfItemsInCategory = $("#txtNoOfItems").val();
                    categoryWiseItemSettings.SaveAndUpdateSettings(noOfItemsInCategory);
                });
            }
        };
        categoryWiseItemSettings.init();
    });
</script>
<div class="classCategoryItemsSettings">
    <h2 class="sfLocale">Items In Category Settings</h2>
    <table>
        <tr><td><label id="lblNoOfItemsInCategory" class="sfLocale">No Of Items In Category</label></td><td><input type="text" id="txtNoOfItems"/></td></tr>
    </table>
    <input type="button" id="btnSave" class="sfLocale" value="Save"/>
</div>
