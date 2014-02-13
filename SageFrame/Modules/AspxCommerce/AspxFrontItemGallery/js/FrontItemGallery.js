var FrontGallery = {};
$(function() {
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    };
    FrontGallery = {
        config: {
            isPostBack: false,
            async: true,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath(),
            method: "",
            url: "",
            ajaxCallMode: "",
            error: 0
        },

        ajaxCall: function(config) {
            $.ajax({
                type: FrontGallery.config.type,
                contentType: FrontGallery.config.contentType,
                cache: FrontGallery.config.cache,
                async: FrontGallery.config.async,
                url: FrontGallery.config.url,
                data: FrontGallery.config.data,
                dataType: FrontGallery.config.dataType,
                success: FrontGallery.config.ajaxCallMode,
                error: FrontGallery.ajaxFailure
            });
        },

        BindFeaturedItemsList: function(msg) {
            var featuredItemGalleryContents = '';
            var itemCaption = '';
            var featuredItemGallery = '';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        imagePath = noImageFeaturedItemPathSetting;
                    }
                    if (item.AlternateText == "") {
                        item.AlternateText = item.Name;
                    }

                    imagePath = imagePath.replace('uploads', 'uploads/Medium');
                    featuredItemGalleryContents += '<a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '"><img alt="' + item.AlternateText + '" src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath + '" class=\"cssClassItemImage\" width=\"188"\ height=\"87"\ title="#Caption-' + item.ItemID + '" /></a>';
                    itemCaption += FrontGallery.BindItemCaption(item.ItemID, item.Name, Encoder.htmlDecode(item.ShortDescription), item.Price * rate, item.SKU);
                });
                featuredItemGallery += '<div id="sliderfront" class="nivoSlider">' + featuredItemGalleryContents + '</div>' + itemCaption;
                //_ItemID; _DateFrom; _DateTo; _IsFeatured; _SKU; _Name; _ShortDescription; _Price; _ListPrice; _HidePrice; _HideInRSSFeed; _HideToAnonymous; _AddedOn;
                $("#slider-wrapper").html(featuredItemGallery);
                $('#sliderfront').nivoSlider({ controlNav: false });
            } else {
                featuredItemGallery += "<div class=\"nivoSlider\"><div class=\"cssClassNotFound\">" + getLocale(AspxFrontItemGallery, 'This store has no featured items found!') + "</div></div>";
                //_ItemID; _DateFrom; _DateTo; _IsFeatured; _SKU; _Name; _ShortDescription; _Price; _ListPrice; _HidePrice; _HideInRSSFeed; _HideToAnonymous; _AddedOn;
                $("#slider-wrapper").html(featuredItemGallery);
            }

            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        BindFeaturedItemsGallery: function() {
            var params = { aspxCommonObj: aspxCommonObj(), count: ItemCount };
            var mydata = JSON2.stringify(params);
            this.config.method = "AspxCommerceWebService.asmx/GetFeaturedItemsList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = mydata;
            this.config.ajaxCallMode = FrontGallery.BindFeaturedItemsList;
            this.ajaxCall(this.config);
        },
        BindSpecialItemsGallery: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetSpecialItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), count: ItemCount });
            this.config.ajaxCallMode = FrontGallery.BindSpecialItemsList;
            this.ajaxCall(this.config);
        },
        BindSpecialItemsList: function(msg) {
            var featuredItemGalleryContents = '';
            var itemCaption = '';
            var featuredItemGallery = '';
            rowTotal = msg.d.length;
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    var imagePath = itemImagePath + item.ImagePath;
                    if (item.ImagePath == "") {
                        imagePath = noImageFeaturedItemPathSetting;
                    }
                    if (item.AlternateText == "") {
                        item.AlternateText = item.Name;
                    }

                    imagePath = imagePath.replace('uploads', 'uploads/Medium');
                    featuredItemGalleryContents += '<a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + item.SKU + pageExtension + '"><img alt="' + item.AlternateText + '" src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath + '" class=\"cssClassItemImage\" width=\"188"\ height=\"87"\ title="#Caption-' + item.ItemID + '" /></a>';
                    itemCaption += FrontGallery.BindItemCaption(item.ItemID, item.ItemName, Encoder.htmlDecode(item.ShortDescription), item.Price * rate, item.SKU);
                });
                featuredItemGallery += '<div id="sliderfront" class="nivoSlider">' + featuredItemGalleryContents + '</div>' + itemCaption;
                //_ItemID; _DateFrom; _DateTo; _IsFeatured; _SKU; _Name; _ShortDescription; _Price; _ListPrice; _HidePrice; _HideInRSSFeed; _HideToAnonymous; _AddedOn;
                $("#slider-wrapper").html(featuredItemGallery);
                $('#sliderfront').nivoSlider({ controlNav: false });
            } else {
                featuredItemGallery += "<div class=\"nivoSlider\"><div class=\"cssClassNotFound\">" + getLocale(AspxFrontItemGallery, 'This store has no special items found!') + "</div></div>";
                //_ItemID; _DateFrom; _DateTo; _IsFeatured; _SKU; _Name; _ShortDescription; _Price; _ListPrice; _HidePrice; _HideInRSSFeed; _HideToAnonymous; _AddedOn;
                $("#slider-wrapper").html(featuredItemGallery);
            }

            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },



        BindItemCaption: function(itemId, itemName, itemShortDesc, itemPrice, itemSKU) {
            return '<div id="Caption-' + itemId + '" class="nivo-html-caption"><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + itemSKU + pageExtension + '">' + itemName + '</a><span>' + getLocale(AspxFrontItemGallery, 'Price: ') + '<span class="cssClassFormatCurrency">' + itemPrice + '</span></span></div>';
        },
        LoadFeatureItemRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#featureItemRssImage').parent('a').show();
            $('#featureItemRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=specialitems'); //featureitems for feature items
            $('#featureItemRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#featureItemRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Feature items Rss Feed Title"));
            $('#featureItemRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Feature items Rss Feed Alt"));
        },
        Init: function() {
            if (GalleryDisplayAs == "Featured") {
                $('.cssClassFeatured').html(getLocale(AspxFrontItemGallery, 'Featured products'));
                $(".cssFeatureFrontGallery").attr("id", "sfFeaturedItemsFg");
            }
            else {
                $('.cssClassFeatured').html(getLocale(AspxFrontItemGallery, 'Special products'));
                $(".cssFeatureFrontGallery").attr("id", "sfSpecialItemsFg");
            }
            $('#sliderfront').nivoSlider({ slices: ItemCount, controlNav: false });
            if (rowTotal == 0) {
                $('a.nivo-nextNav').click();
            }
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            if (featureItemRss.toLowerCase() == 'true') {
                FrontGallery.LoadFeatureItemRssImage();
            }
        }
    };
    FrontGallery.Init();
});