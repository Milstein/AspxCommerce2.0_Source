var LatestItems_New = "";
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

    LatestItems_New = {
        config: {
            isPostBack: false,
            async: true,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath,
            method: "",
            url: "",
            ajaxCallMode: 0,
            itemid: 0
        },
        vars: {
            countCompareItems: 0
        },
        ajaxCall: function(config) {
            $.ajax({
                type: LatestItems_New.config.type,
                contentType: LatestItems_New.config.contentType,
                cache: LatestItems_New.config.cache,
                async: LatestItems_New.config.async,
                url: LatestItems_New.config.url,
                data: LatestItems_New.config.data,
                dataType: LatestItems_New.config.dataType,
                success: LatestItems_New.ajaxSuccess,
                error: LatestItems_New.ajaxFailure
            });
        },
        GetLatestItems: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetLatestItemsList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: AspxCommonObj(), count: noOfLatestItems });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        ajaxSuccess: function(data) {
            switch (LatestItems_New.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    $.each(data.d, function(index, value) {
                        var discount = '';
                        if (value.ListPrice != null) {
                            discount = ((value.ListPrice - value.Price) / value.ListPrice) * 100;
                            discount = discount.toFixed(2) + '%';
                        }
                        if (value.ImagePath == "") {
                            value.ImagePath = defaultImagePath;
                        }
                        var name = '';
                        if (value.Name.length > 50) {
                            name = value.Name.substring(0, 50);
                            var i = 0;
                            i = name.lastIndexOf(' ');
                            name = name.substring(0, i);
                            name = name + "...";
                        } else {
                            name = value.Name;
                        }
                        var items = [{
                            itemID: value.ItemID,
                            name: name,
                            titleName: value.Name,
                            sku: value.SKU,
                            imagePath: aspxRootPath + value.ImagePath.replace('uploads', 'uploads/Medium'),
                            alternateText: value.AlternateText,
                            listPrice: (value.ListPrice * rate),
                            price: (value.Price * rate),
                            discountOffer: discount
                        }];
                            $('#divLatestItemTemp').html('');
                            $("#scriptResultGrid").tmpl(items).appendTo("#divLatestItemTemp");
                            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                            if (allowOutStockPurchase.toLowerCase() == 'false') {
                                if (value.IsOutOfStock) {
                                    $(".cssClassAddtoCard_" + value.ItemID + " span").html(getLocale(AspxLatestItem, 'Out Of Stock'));
                                    $(".cssClassAddtoCard_" + value.ItemID).removeClass('cssClassAddtoCard');
                                    $(".cssClassAddtoCard_" + value.ItemID).addClass('cssClassOutOfStock');
                                    $(".cssClassAddtoCard_" + value.ItemID + " button").removeAttr('onclick');
                                }
                            }
                        });
                        $('#divLatestItemTemp').ItembxSlider({
                            moveSlideQty: 1,
                            displaySlideQty: 3
                        });
                        $('.cssClassProductPicture a img[title]').tipsy({ gravity: 'n' });
                        // $('#divLatestItemTemp li').css('width', '200px');
                        break;
                }
            },
            LoadRssImage: function() {
                var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
                $('#latestItemCarouselRssImage').parent('a').show();
                $('#latestItemCarouselRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=latestitems');
                $('#latestItemCarouselRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
                $('#latestItemCarouselRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "New Arrivals Rss Feed Title"));
                $('#latestItemCarouselRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "New Arrivals Rss Feed Alt"));
            },
            init: function() {
                if (enableLatestItems.toLowerCase() == 'true') {
                    //  LatestItems_New.GetLatestItems();
                    LatestItems_New.LoadRssImage();
                    $("#divlatestItemsNew").show();
                    $('.cssClassProductPicture a img[title]').tipsy({ gravity: 'n' });
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    $(window).load(function() {
                        $('#divLatestItemTemp').ItembxSlider({
                            moveSlideQty: 1,
                            displaySlideQty: 3
                        });
                    });
                }
            }
        };
        LatestItems_New.init();
    });