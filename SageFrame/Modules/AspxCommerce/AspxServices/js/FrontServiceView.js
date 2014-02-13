var AspxFrontServices = "";
$(function() {
    var modulePath = ModulePath;
    var portalId = AspxCommerce.utils.GetPortalID();
    var storeId = AspxCommerce.utils.GetStoreID();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var userName = AspxCommerce.utils.GetUserName();
    var noImageService = NoImageService;
    var serviceTypeItemRss = ServiceTypeItemRss;
    var rssFeedUrl = RssFeedUrl;

    var aspxCommonObj = {
        StoreID: storeId,
        PortalID: portalId,
        UserName: userName,
        CultureName: cultureName
    };
    AspxFrontServices = {
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
                type: AspxFrontServices.config.type,
                contentType: AspxFrontServices.config.contentType,
                cache: AspxFrontServices.config.cache,
                async: AspxFrontServices.config.async,
                url: AspxFrontServices.config.url,
                data: AspxFrontServices.config.data,
                dataType: AspxFrontServices.config.dataType,
                success: AspxFrontServices.config.ajaxCallMode,
                error: AspxFrontServices.ajaxFailure
            });
        },

        GetFrontServices: function() {
            this.config.method = "GetFrontServices";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, count: count });
            this.config.ajaxCallMode = AspxFrontServices.BindAllFrontServices;
            this.ajaxCall(this.config);
        },

        BindAllFrontServices: function(msg) {
            $("#divFrontService").html("");
            var serviceImagePath = "/Modules/AspxCommerce/AspxCategoryManagement/uploads/";
            var bindFrontServices = '';
            var serviceDesc = '';
            var index = '';
            var serviceDetails = '';
            var rowTotal = '';
            if (msg.d.length > 0) {
                rowTotal = msg.d.length;
                $.each(msg.d, function(i, item) {
                    // rowTotal = item.RowTotal;
                    if (item.ServiceDetails != '' || item.ServiceDetails != 'null') {
                        serviceDesc = item.ServiceDetail;
                        if (serviceDesc.indexOf(' ') > 1) {
                            index = serviceDesc.substring(0, 60).lastIndexOf(' ');
                            serviceDetails = serviceDesc.substring(0, index);
                            serviceDetails = serviceDetails + ' ...';
                        } else {
                            serviceDetails = serviceDesc;
                        }
                    } else {
                        serviceDetails = '';
                    }
                    var servicePath = serviceImagePath + item.ServiceImagePath;
                    if (item.ServiceImagePath == '') {
                        servicePath = noImageService;
                    }
                    var hrefServices = aspxRedirectPath + "service/" + AspxFrontServices.fixedEncodeURIComponent(item.ServiceName) + pageExtension;

                    bindFrontServices += "<li><h3><a href='" + hrefServices + "'><span>" + item.ServiceName ;
                    bindFrontServices += "<div class='cssClassImgWrapper'><span><img title='" + item.ServiceName + "' alt='" + item.ServiceName + "' src='" + aspxRootPath + servicePath.replace('uploads', 'uploads/Medium') + "'/></div></span></a></h3><p>" + serviceDetails + "</p></li>";
                });
                $("#divFrontService").append(bindFrontServices);
                if (parseInt(rowTotal) > count) {
                    $("#divViewMoreServices").append("<a href='" + aspxRootPath + "Services" + pageExtension + "'>"+getLocale(AspxShipmentsManagement,"View More")+"</a>");
                }
            }
            else {
                $("#divFrontService").html("<span class=\"cssClassNotFound\">" + getLocale(AspxServiceLocale, "There are no services available!") + "</span>");
            }
        },

        fixedEncodeURIComponent: function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/-/g, '_').replace(/\*/g, '%2A').replace(/%26/g, 'ampersand').replace(/%20/g, '-');
        },
        LoadServiceTypeItemRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#serviceItemRssImage').parent('a').show();
            $('#serviceItemRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=servicetypeitems');
            $('#serviceItemRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#serviceItemRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Services Rss Feed Title"));
            $('#serviceItemRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Services Rss Feed Alt"));
        },
        init: function() {
            $(document).ready(function() {
            // AspxFrontServices.GetFrontServices();
            $('#divFrontService a img[title]').tipsy({ gravity: 'n' });
                if (serviceTypeItemRss.toLowerCase() == 'true') {
                    AspxFrontServices.LoadServiceTypeItemRssImage();
                }
            });
        }
    };
    AspxFrontServices.init();
});