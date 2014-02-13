var browseByCategory = '';
$(function() {

    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();

    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    var categoryId = 0;
    var categoryOptions = '';
    browseByCategory = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath,
            method: "",
            url: ""
        },
        init: function() {
           // browseByCategory.GetShoppingOptionsByCategory();
        },
        fixedEncodeURIComponent: function(str) {
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/-/g, '_').replace(/\*/g, '%2A').replace(/%26/g, 'ampersand').replace(/%20/g, '-');
        },
        GetShoppingOptionsByCategory: function() {
            var param = JSON2.stringify({ categoryID: categoryId, aspxCommonObj: aspxCommonObj });
            $.ajax({
                type: "POST",
                url: aspxservicePath + "AspxCommerceWebService.asmx/BindCategoryDetails",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    if (msg.d.length > 0) {
                        categoryOptions += "<h2>" + getLocale(AspxBrowseByCategory, "Browse by") + "</h2><ul>";
                        $.each(msg.d, function(index, item) {
                            browseByCategory.BindCategoryDetails(item, index);
                        });
                        categoryOptions += "</ul><div class=\"cssClassclear\"></div>";
                    } else {
                        categoryOptions += "<span class=\"cssClassNotFound\">" + getLocale(AspxBrowseByCategory, "No category with item is found!") + "</span>";
                    }
                    $("#divCategoryItemsOptions").html(categoryOptions);
                }
            });
        },

        BindCategoryDetails: function(response, index) {
            categoryOptions += "<li><a href='" + aspxRedirectPath + 'category/' + browseByCategory.fixedEncodeURIComponent(response.CategoryName) + pageExtension + "' alt='" + response.CategoryName + "' title='" + response.CategoryName + "'>" + response.CategoryName + "</a></li>";
        }
    },
    	browseByCategory.init();
});