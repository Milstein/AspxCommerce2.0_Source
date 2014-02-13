var BrandSlide = "";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        // UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    BrandSlide = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: "",
            error: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: BrandSlide.config.type,
                contentType: BrandSlide.config.contentType,
                cache: BrandSlide.config.cache,
                async: BrandSlide.config.async,
                url: BrandSlide.config.url,
                data: BrandSlide.config.data,
                dataType: BrandSlide.config.dataType,
                success: BrandSlide.config.ajaxCallMode,
                error: BrandSlide.error
            });
        },
        GetAllBrandForSlider: function() {
            this.config.url = this.config.baseURL + "GetAllBrandForSlider";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = BrandSlide.GetAllBrandForSliderSucess;
            this.ajaxCall(this.config);
        },

        GetAllBrandForSliderSucess: function(msg) {
            var element = '';
            var rowTotal = 0;
            $("#brandSlider").html('');
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    rowTotal = value.RowTotal;
                    var imagepath = aspxRootPath + value.BrandImageUrl;
                    element += "<li><a href='" + aspxRedirectPath + "brand/" + value.BrandName + pageExtension + "'><img brandId='" + value.BrandID + "' src='" + imagepath.replace('uploads', 'uploads/Small') + "'   alt='" + value.BrandName + "' title='" + value.BrandName + "'  /></a></li>";
                });
                $("#brandSlider").append(element);
                $("#brandSlider").bxSlider({
                    displaySlideQty: 6,
                    moveSlideQty: 1,
                    auto: true
                });
                $("#slide").append('<a class="cssClassReadMore" href=' + aspxRedirectPath + 'Shop-By-Brand' + pageExtension + '>'+ getLocale(AspxRssFeedLocale, "View All Brands") + '</a>');
            }
            if (rowTotal == 0) {
                $("#slide").append("<span class='cssClassNotFound'>" + getLocale(Brand, "The store has no brand!") + "</span>");
            }
        },
        LoadFrontBrandRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#frontBrandRssImage').parent('a').show();
            $('#frontBrandRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=brands');
            $('#frontBrandRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#frontBrandRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale,"Popular Brands Rss Feed Title"));
            $('#frontBrandRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Popular Brands Rss Feed Alt"));
        },
        Init: function() {
        //BrandSlide.GetAllBrandForSlider();
        $('#brandSlider a img[title]').tipsy({ gravity: 'n' });
            if (brandRss.toLowerCase() == "true") {
                BrandSlide.LoadFrontBrandRssImage();
            }
            $("#brandSlider").bxSlider({
                displaySlideQty: 6,
                moveSlideQty: 1,
                auto: true,
                pager: false 		
            });
        }
    };
    BrandSlide.Init();
});