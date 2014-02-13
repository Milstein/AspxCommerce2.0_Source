var MegaCategorySetting = "";
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
    MegaCategorySetting = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: megaModulePath + "MegaCategoryWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: MegaCategorySetting.config.type,
                contentType: MegaCategorySetting.config.contentType,
                cache: MegaCategorySetting.config.cache,
                async: MegaCategorySetting.config.async,
                data: MegaCategorySetting.config.data,
                dataType: MegaCategorySetting.config.dataType,
                url: MegaCategorySetting.config.url,
                success: MegaCategorySetting.config.ajaxCallMode,
                error: MegaCategorySetting.ajaxFailure
            });
        },

        GetMegaCategorySetting: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.method = "GetMegaCategorySetting";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = MegaCategorySetting.BindMegaCategorySetting;
            this.ajaxCall(this.config);
        },
        BindMegaCategorySetting: function(msg) {
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    $("#slcMode").val(item.ModeOfView);
                    if (item.ModeOfView == 'horizontal') {
                        $("#trEvent").show();
                    } else {
                        $("#trDirection").show();
                    }
                    $("#txtNoOfColumn").val(item.NoOfColumn);
                    if (item.ShowCategoryImage.toLowerCase() == 'true') {
                        $("#chkShowImage ").attr('checked', 'checked');
                    }
                    if (item.ShowSubCategoryImage.toLowerCase() == 'true') {
                        $("#chkShowSubCatImage").attr('checked', 'checked');
                    }
                    $("#txtSpeed").val(item.Speed);
                    $("#slcEffect").val(item.Effect);
                    $("#slcDirection").val(item.Direction);
                    $("#slcEvent").val(item.EventMega);
                });
            }
        },

        MegaCategorySettingUpdate: function() {
            var subImage;
            var catImage;
            var mode = $("#slcMode").val();
            var column = $("#txtNoOfColumn").val();
            var speed = $("#txtSpeed").val();
            var effect = $("#slcEffect").val();
            var direction = $("#slcDirection").val();
            var event = $("#slcEvent").val();
            if ($('#chkShowImage').is(':checked')) {
                catImage = 'true';
            } else {
                catImage = 'false';
            }
            if ($('#chkShowSubCatImage').is(':checked')) {
                subImage = 'true';
            } else {
                subImage = 'false';
            }
            var settingKeys = "ModeOfView*NoOfColumn*ShowCategoryImage*ShowSubCategoryImage*Speed*Effect*Direction*EventMega";
            var settingValues = mode + "*" + column + "*" + catImage + "*" + subImage + "*" + speed + "*" + effect + "*" + direction + "*" + event;
            var param = JSON2.stringify({ SettingValues: settingValues, SettingKeys: settingKeys, aspxCommonObj: aspxCommonObj() });
            this.config.method = "MegaCategorySettingUpdate";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = MegaCategorySetting.MegaCategorySettingSuccess;
            this.ajaxCall(this.config);
        },
        MegaCategorySettingSuccess: function() {
            SageFrame.messaging.show("Setting Saved Successfully", "Success");
        },

        init: function() {
            MegaCategorySetting.GetMegaCategorySetting();
            $("#btnMenuCatSave").click(function() {
                MegaCategorySetting.MegaCategorySettingUpdate();
            });
            $("#slcMode").live("change", function() {
                var mode = $(this).val();
                if (mode == 'horizontal') {
                    $("#trEvent").show();
                    $("#trDirection").hide();
                } else {
                    $("#trEvent").hide();
                    $("#trDirection").show();
                }
            });
        }
    };
    MegaCategorySetting.init();
});