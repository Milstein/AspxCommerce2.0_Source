var RecentlyComparedItems = "";
$(function() {

    function AspxCommonObj() {
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            UserName: AspxCommerce.utils.GetUserName()
        };
        return aspxCommonObj;
    }

    RecentlyComparedItems = {
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
                type: RecentlyComparedItems.config.type,
                contentType: RecentlyComparedItems.config.contentType,
                cache: RecentlyComparedItems.config.cache,
                async: RecentlyComparedItems.config.async,
                data: RecentlyComparedItems.config.data,
                dataType: RecentlyComparedItems.config.dataType,
                url: RecentlyComparedItems.config.url,
                success: RecentlyComparedItems.config.ajaxCallMode,
                error: RecentlyComparedItems.ajaxFailure
            });
        },
        init: function() {
            if (enableRecentlyCompared.toLowerCase() == 'true' || eval(recentlyCompareCounts) >= 0) {
                $("#divRecentComparedItems").show();
                $('#divRecentComparedItems img[title]').tipsy({ gravity: 'n' });
                //RecentlyComparedItems.RecentlyCompareItemsList();
            }
        },
        RecentlyCompareItemsList: function() {
            var recentlyCompareCount = recentlyCompareCounts;
            this.config.url = this.config.baseURL + "GetRecentlyComparedItemList";
            this.config.data = JSON2.stringify({ count: recentlyCompareCount, aspxCommonObj: AspxCommonObj() });
            this.config.ajaxCallMode = RecentlyComparedItems.BindRecentlyComparedItemList;
            this.ajaxCall(this.config);
        },
        BindRecentlyComparedItemList: function(data) {
            $("#tblRecentlyComparedItemList>tbody").html('');
            if (data.d.length > 0) {
                $.each(data.d, function(index, item) {
                    var RecentlyCompareItems = '';
                    var imagePath = itemImagePath + item.ImagePath;
                    if (index % 2 == 0) {
                        if (item.ItemCostVariantValue != "") {
                            RecentlyCompareItems = '<tr class="sfEven"><td><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '?varId=' + item.CostVariantValueID + '">';
                            RecentlyCompareItems += '<div><img src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath.replace('uploads', 'uploads/Small') + '"/></div></a>';
                            RecentlyCompareItems += '<a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '?varId=' + item.CostVariantValueID + '">' + item.ItemName + '(' + item.ItemCostVariantValue + ')' + '</a></td></tr>';
                        } else {
                            RecentlyCompareItems = '<tr class="sfEven"><td><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">';
                            RecentlyCompareItems += '<div><img src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath.replace('uploads', 'uploads/Small') + '"/></div></a>';
                            RecentlyCompareItems += '<a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">' + item.ItemName + '</a></td></tr>';
                        }
                    } else {
                        if (item.ItemCostVariantValue != "") {
                            RecentlyCompareItems = '<tr class="sfOdd"><td><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '?varId=' + item.CostVariantValueID + '">';
                            RecentlyCompareItems += '<div><img src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath.replace('uploads', 'uploads/Small') + '"/></div></a>';
                            RecentlyCompareItems += '<a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '?varId=' + item.CostVariantValueID + '">' + item.ItemName + '(' + item.ItemCostVariantValue + ')' + '</a></td></tr>';
                        } else {
                            RecentlyCompareItems = '<tr class="sfOdd"><td><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">';
                            RecentlyCompareItems += '<div><img src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath.replace('uploads', 'uploads/Small') + '"/></div></a>';
                            RecentlyCompareItems += '<a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '">' + item.ItemName + '</a></td></tr>';
                        }
                    }
                    $("#tblRecentlyComparedItemList>tbody").append(RecentlyCompareItems);
                });
            } else {
                $("#tblRecentlyComparedItemList>tbody").html("<tr><td><span class=\"cssClassNotFound\">" + getLocale(AspxRecentlyComparedItems, "You have not viewed any items yet!") + "</span></tr></td>");
            }
        }
    };
    RecentlyComparedItems.init();
});