var PopularTags = "";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };

    PopularTags = {
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
                type: PopularTags.config.type,
                contentType: PopularTags.config.contentType,
                cache: PopularTags.config.cache,
                async: PopularTags.config.async,
                data: PopularTags.config.data,
                dataType: PopularTags.config.dataType,
                url: PopularTags.config.url,
                success: PopularTags.config.ajaxCallMode,
                error: PopularTags.ajaxFailure
            });
        },
        LoadPopularTagRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#popularTagRssImage').parent('a').show();
            $('#popularTagRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=populartags');
            $('#popularTagRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#popularTagRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Popular Tag Rss Feed Title"));
            $('#popularTagRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Popular Tag Rss Feed Alt"));
        },
        init: function() {
            $("#divPopularTag").hide();
            $("#divViewAllTags").hide();
            if (popularTagsCount > 0) {
                //PopularTags.BindAllPopularTags();
                $("#divPopularTag").show();
                $("#divViewAllTags").show();
            }
            if (popularTagRss.toLowerCase() == 'true') {
                PopularTags.LoadPopularTagRssImage();
            }
        },

        BindAllPopularTags: function() {
            this.config.url = this.config.baseURL + "GetAllPopularTags";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, count: popularTagsCount });
            this.config.ajaxCallMode = PopularTags.BindPopularTags;
            this.ajaxCall(this.config);
        },

        BindPopularTags: function(data) {
            if (data.d.length > 0) {
                var totalTagCount = 0;
                var tagCount = 0;
                //create list for tag links
                $("<ul>").attr("id", "tagList").appendTo("#divPopularTags");
                $("<div>").attr("class", "cssClassClear").appendTo("#divPopularTags");
                $.each(data.d, function(index, item) {
                    if (index == 0) {
                        tagCount = item.RowTotal;
                    }
                    //create item
                    var li = $("<li>");
                    // alert(item.ItemIDs);
                    if (index != data.d.length - 1) {
                        $("<a>").text(item.Tag + " ").attr({ title: getLocale(AspxPopularTags, "See all items tagged with") + item.Tag, href: aspxRedirectPath + 'tagsitems/tags' + pageExtension + '?tagsId=' + item.ItemTagIDs + '' }).appendTo(li);
                    } else {
                        $("<a>").text(item.Tag).attr({ title: getLocale(AspxPopularTags, "See all items tagged with ")+ item.Tag, href: aspxRedirectPath + 'tagsitems/tags' + pageExtension + '?tagsId=' + item.ItemTagIDs + '' }).appendTo(li);
                    }
                    totalTagCount = item.TagCount;
                    //set tag size
                    li.children().css("fontSize", (totalTagCount / 10 < 1) ? totalTagCount / 10 + 1 + "em" : (totalTagCount / 10 > 2) ? "2em" : totalTagCount / 10 + "em");

                    //add to list
                    li.appendTo("#tagList");
                });
                if (tagCount > popularTagsCount && tagCount > 0) {
                    $("#divViewAllTags").html('<a href="' + aspxRedirectPath + 'tags/alltags' + pageExtension + '" title="View all tags"' + getLocale(AspxPopularTags, 'View All Tags') + '</a>');
                    $("#divViewAllTags").show();
                } else {
                    $("#divViewAllTags").hide();
                }
            } else {
                $("#divPopularTags").html("<span class=\"cssClassNotFound\">" + getLocale(AspxPopularTags, 'Not any items have been tagged yet!') + "</span>");
                $("#divViewAllTags").hide();
            }
        }
    };
    PopularTags.init();
});