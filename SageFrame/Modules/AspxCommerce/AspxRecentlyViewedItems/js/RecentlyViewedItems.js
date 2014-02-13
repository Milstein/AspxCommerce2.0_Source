var RecentlyViewedItems="";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    RecentlyViewedItems = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: "json",
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            url: "",
            method: "",
            ajaxCallMode: ""
        },

        ajaxCall: function(config) {
            $.ajax({
                type: RecentlyViewedItems.config.type,
                contentType: RecentlyViewedItems.config.contentType,
                cache: RecentlyViewedItems.config.cache,
                async: RecentlyViewedItems.config.async,
                data: RecentlyViewedItems.config.data,
                dataType: RecentlyViewedItems.config.dataType,
                url: RecentlyViewedItems.config.url,
                success: RecentlyViewedItems.config.ajaxCallMode,
                error: RecentlyViewedItems.ajaxFailure
            });
        },
        init: function() {
            $("#divRecentViewedItems").hide();
            if (enableRecentlyViewed.toLowerCase() == 'true' && eval(recentlyViewedCounts) > 0) {
                //RecentlyViewedItems.RecentlyViewedItemsList();
                $("#divRecentViewedItems").show();
            }
        },
        RecentlyViewedItemsList: function() {
            var recentlyViewedCount = recentlyViewedCounts;
            this.config.url = this.config.baseURL + "GetRecentlyViewedItems";
            this.config.data = JSON2.stringify({ count: recentlyViewedCount, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = RecentlyViewedItems.BindRecentlyViewedItems;
            this.ajaxCall(this.config);
        },
        BindRecentlyViewedItems: function(data) {
            $("#divRecentlyViewedItems").html('');
            if (data.d.length > 0) {
                var rowTotal;
                $.each(data.d, function(index, item) {
                    var RecentlyViewedItems = '';
                    rowTotal = item.RowTotal;
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == null || item.ImagePath == "") {
                        imagePath = defaultImagePath;
                    }
                    var name = '';
                    if (item.ItemName.length > 50) {
                        name = item.ItemName.substring(0, 50);
                        var i = 0;
                        i = name.lastIndexOf(' ');
                        name = name.substring(0, i);
                        name = name + "...";
                    }
                    else {
                        name = item.ItemName;
                    }
                    RecentlyViewedItems = '<li><a class="cssClassProductPicture" href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '" ><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + item.ItemName + '" /></a><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '" class="cssClassItemName" title="'+item.ItemName+'">' + name + '</a></li>';
                    $("#divRecentlyViewedItems").append("<ul>" + RecentlyViewedItems + "</ul>");
                });
                if (eval(rowTotal) > eval(recentlyViewedCounts)) {
                    $("#divViewMoreRecently").html('<a href="' + aspxRedirectPath + 'Details-View' + pageExtension + '?id=recent">' + getLocale(AspxRecentlyViewedItems, 'View More') + '</a>');
                }
            } else {
                $("#divRecentlyViewedItems").html("<tr><td><span class=\"cssClassNotFound\">" + getLocale(AspxRecentlyViewedItems, "You have not viewed any items yet!") + "</span></tr></td>");
            }
        }
    };
    RecentlyViewedItems.init();
});