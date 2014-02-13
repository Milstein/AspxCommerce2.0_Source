var ProductListsSetting = "";
$(function() {
    function aspxCommonObj() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    }
    var settingKeys;
    var settingValues;

    ProductListsSetting = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: 0 ///0 for get categories and bind, 1 for notification,2 for versions bind 
        },
        ajaxCall: function(config) {
            $.ajax({
                type: ProductListsSetting.config.type,
                contentType: ProductListsSetting.config.contentType,
                cache: ProductListsSetting.config.cache,
                async: ProductListsSetting.config.async,
                url: ProductListsSetting.config.url,
                data: ProductListsSetting.config.data,
                dataType: ProductListsSetting.config.dataType,
                success: ProductListsSetting.ajaxSuccess,
                error: ProductListsSetting.ajaxFailure
            });
        },

        ajaxSuccess: function(data) {
            switch (ProductListsSetting.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    SageFrame.messaging.show(getLocale(AspxProductLister,"Setting Saved Successfully"), "Success");
                    break;
                case 2:
                    if (data.d.length > 0) {
                        $.each(data.d, function(index, item) {
                            var productTitleHeader = item.ProductHeader;
                            var count = item.ProductCount;
                           // $("#txtProductHeader").val(productTitleHeader);
                            $("#txtProductCount").val(count);
                        });
                    }
                    break;
            }
        },

        GetProductSettingValues: function() {
           // var titleHeader = $("#txtProductHeader").val();
            var productCount = $("#txtProductCount").val();
            settingKeys = "ProductCount";
            settingValues = productCount;
        },

        GetProductsSetting: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.method = "GetProductListSetting";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },

        ProductListSettingUpdate: function() {
            var param = JSON2.stringify({ SettingValues: settingValues, SettingKeys: settingKeys, aspxCommonObj: aspxCommonObj() });
            this.config.method = "ProductListSettingUpdate";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },

        init: function() {
            ProductListsSetting.GetProductsSetting();
            $("#btnProductListSettingSave").click(function() {
                ProductListsSetting.GetProductSettingValues();
                if ($("#txtProductCount").val() != "") {
                    ProductListsSetting.ProductListSettingUpdate();
                }
            });
            $("#txtProductCount").keypress(function(e) {
                if (this.value.length == 0 && e.which == 48) {
                    return false;
                }
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
            });
        }
    };
    ProductListsSetting.init();
});