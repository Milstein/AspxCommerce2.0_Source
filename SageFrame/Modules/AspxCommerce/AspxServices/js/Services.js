var AspxServices = "";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    AspxServices = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: AspxServices.config.type,
                contentType: AspxServices.config.contentType,
                cache: AspxServices.config.cache,
                async: AspxServices.config.async,
                url: AspxServices.config.url,
                data: AspxServices.config.data,
                dataType: AspxServices.config.dataType,
                success: AspxServices.config.ajaxCallMode,
                error: AspxServices.ajaxFailure
            });
        },

        GetAllServices: function() {
            this.config.method = "GetAllServices";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = AspxServices.BindAllServices;
            this.ajaxCall(this.config);
        },

        BindAllServices: function(msg) {
            var serviceImagePath = "Modules/AspxCommerce/AspxCategoryManagement/uploads/";
            var bindServices = '';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    var serviceName = item.ServiceName;
                    var servicePath = serviceImagePath + item.ServiceImagePath;
                    if (item.ServiceImagePath == '') {
                        servicePath = defaultImagePath;
                    }
                    var hrefServices = aspxRedirectPath + "service/" + AspxServices.fixedEncodeURIComponent(serviceName) + pageExtension;
                    bindServices += "<li><a href='" + hrefServices + "'><div class='cssClassImgWrapper'><img src='" + aspxRootPath + servicePath.replace('uploads', 'uploads/Medium') + "'/></div><h3>" + serviceName + "</h3></a></li>";
                });
                $("#divBindAllServices").append(bindServices);
            }
            else {
                $("#divBindAllServices").html('<span class=\"cssClassNotFound\">' + getLocale(AspxServiceLocale, "There are no services available!") + '</span>');
            }
        },

        fixedEncodeURIComponent: function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/-/g, '_').replace(/\*/g, '%2A').replace(/%26/g, 'ampersand').replace(/%20/g, '-');
        },

        init: function() {
            $(document).ready(function() {
                // AspxServices.GetAllServices();
            });
        }
    };
    AspxServices.init();
});