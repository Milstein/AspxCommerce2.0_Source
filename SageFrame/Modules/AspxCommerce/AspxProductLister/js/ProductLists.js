var ProductLists = "";
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
    var aspxRootPath = AspxCommerce.utils.GetAspxRootPath();
    var count;
    var productTitleHeader;
    var rowTotal;

    ProductLists = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxRootPath,
            baseURL2: aspxservicePath + "AspxCommerceWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: 0,
            itemid: 0
        },

        ajaxCall: function(config) {
            $.ajax({
                type: ProductLists.config.type,
                contentType: ProductLists.config.contentType,
                cache: ProductLists.config.cache,
                async: ProductLists.config.async,
                url: ProductLists.config.url,
                data: ProductLists.config.data,
                dataType: ProductLists.config.dataType,
                success: ProductLists.ajaxSuccess,
                error: ProductLists.ajaxFailure
            });
        },

        GetProductLists: function(count) {
            this.config.method = aspxservicePath + "AspxCommerceWebService.asmx/GetProductLists";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), count: count, offset: 1 });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },

        BindProductLists: function(data) {
            $("#divProductLists").html('');
            $("#divMoreProducts").html('');
            var ProductListContents = '';
            if (data.d.length > 0) {
                ProductListContents = "<ul>";
                $.each(data.d, function(index, item) {
                    var name = item.Name;
                    rowTotal = item.RowTotal;
                    var hrefItem = aspxRedirectPath + "item/" + ProductLists.fixedEncodeURIComponent(item.SKU) + pageExtension;

                    ProductListContents += "<li><a href='" + hrefItem + "'>" + name + "</a></li>";
                });
                ProductListContents += "</ul>";
                $("#divProductLists").append(ProductListContents);
            } else {
                $("#divProductLists").html("<span class='cssClassNotFound'>" + getLocale(AspxProductLister, 'There are no products!') + "</span>");
            }
        },
        fixedEncodeURIComponent: function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
        },

        GetProductListSetting: function() {
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.method = aspxservicePath + "AspxCommerceWebService.asmx/GetProductListSetting";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        ajaxSuccess: function(data) {
            switch (ProductLists.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    if (data.d.length > 0) {
                        $.each(data.d, function(index, item) {
                            count = item.ProductCount;
                        });
                    }
                    break;
                case 2:
                    ProductLists.BindProductLists(data);
                    break;
            }

        },
        init: function() {
            //            ProductLists.GetProductListSetting();
            //            ProductLists.GetProductLists(count);
            //            $("#divViewMoreProducts").hide();
            //            $("#divProductLists").show();
            $(document).ready(function() {
                $('.cssClassProductLists ul li:even').addClass('sfEven');
                $('.cssClassProductLists ul li:odd').addClass('sfOdd');
                if (ModuleCollapsible.toLowerCase() == 'true') {
                    $(".cssProductListerHeader").addClass("sfCollapsible");
                    $(".cssProductListerHeader").live('click', function() {
                        $(".cssClassProductLists").slideToggle('fast');
                    });
                }
            });
        }
    };
    ProductLists.init();
});