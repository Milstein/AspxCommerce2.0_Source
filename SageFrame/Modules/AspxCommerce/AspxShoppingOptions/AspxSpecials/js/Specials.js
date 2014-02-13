var SpecialItems = "";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    var SpecialItems = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath(),
            method: "",
            url: "",
            ajaxCallMode: "",
            error: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: SpecialItems.config.type,
                contentType: SpecialItems.config.contentType,
                cache: SpecialItems.config.cache,
                async: SpecialItems.config.async,
                url: SpecialItems.config.url,
                data: SpecialItems.config.data,
                dataType: SpecialItems.config.dataType,
                success: SpecialItems.config.ajaxCallMode,
                error: SpecialItems.error
            });
        },

        GetSpecialItems: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetSpecialItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, count: countSpecials });
            this.config.ajaxCallMode = SpecialItems.BindSpecialItems;
            this.ajaxCall(this.config);
        },

        BindSpecialItems: function(msg) {
            if (msg.d.length > 0) {
                $(".cssClassSpecialBoxInfo ul").html('');
                var rowTotal;
                $.each(msg.d, function(index, item) {
                    var itemPath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        itemPath = defaultImagePath;
                    }
                    if (item.ItemTypeID == 4) {
                        $(".cssClassSpecialBoxInfo ul").append('<li><a class="cssClassProductPicture" href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'Service-Item-Details' + pageExtension + '?id=' + item.ItemID + '" ><img src="' + AspxCommerce.utils.GetAspxRootPath() + itemPath.replace('uploads', 'uploads/Small') + '" alt="' + item.ItemName + '" /></a><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'Service-Item-Details' + pageExtension + '?id=' + item.ItemID + '">' + item.ItemName + '</a></li>');
                    } else {
                    $(".cssClassSpecialBoxInfo ul").append('<li><a class="cssClassProductPicture" href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '" ><img src="' + AspxCommerce.utils.GetAspxRootPath() + itemPath.replace('uploads', 'uploads/Small') + '" alt="' + item.ItemName + '" /></a><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '" class="cssClassItemName">' + item.ItemName + '</a></li>');
                    }
                    rowTotal = item.TotalSpecialItems;
                });
                if (eval(rowTotal) > eval(countSpecials)) {
                    $("#divViewMoreSpecial").html('<a href="' + baseUrl + 'Details-View' + pageExtension + '?id=special">' + getLocale(AspxSpecials, 'View More') + '</a>');
                }
            } else {
                $(".cssClassSpecialBox").html("<span class=\"cssClassNotFound\">" + getLocale(AspxSpecials, "No special item found in this store!") + "</span>");
                $(".cssClassSpecialBox").removeClass("cssClassSpecialBox");
            }
        },
        LoadSpecialItemRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#specialItemRssImage').parent('a').show();
            $('#specialItemRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=specialitems');
            $('#specialItemRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#specialItemRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Special Items Rss Feed Title"));
            $('#specialItemRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Special Items Rss Feed Alt"));
        },
        Init: function() {
            $("#divSpecialItems").hide();
            if (enableSpecialItems.toLowerCase() == 'true' && countSpecials > 0) {
                //SpecialItems.GetSpecialItems();
                $("#divSpecialItems").show();
            }
            if (specialItemRss.toLowerCase() == 'true') {
                SpecialItems.LoadSpecialItemRssImage();
            }
        }
    };
    SpecialItems.Init();
});
  