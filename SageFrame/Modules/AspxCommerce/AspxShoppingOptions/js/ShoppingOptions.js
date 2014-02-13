var ShopingOptions = "";
//var maxPrice = 0;
//var minPrice = 0;
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    var templatePath = AspxCommerce.utils.GetAspxTemplateFolderPath();
    var arrPrice = [];
    var itemIDs = [];
    var arrayItemIds = [];
    var idsByPrice = '';
    ShopingOptions = {
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
            ajaxCallMode: ""
        },

        init: function() {
            if (brandCount > 7) {
                $("#scrollbar1").show();
                $("input.chkShopByBrand:checkbox").uniform();
                $("#scrollbar1").find(".viewport").height("150px");
                $("#scrollbar1").tinyscrollbar();
            }
            else if (brandCount <= 7) {
                $("#scrollbar1").hide();
                $("input.chkShopByBrand:checkbox").uniform();
            }
            else if (brandCount == 0 || brandCount == null) {
                $("#scrollbar1").find(".viewport").height($("#scrollbar1").find(".overview").height());
            }
            if ($(".cssClassScroll").find('.overview').height() >= 135) {
                $(".cssClassScroll").find(".thumb").show();
                $(".cssClassScroll").tinyscrollbar();
            } else {
                $(".cssClassScroll").find(".viewport").height($(".cssClassScroll").find(".overview").height());
                $(".cssClassScroll").find(".thumb").hide();
            }
            if (ArrayPrice != "" && IdsByPrice != "") {
                arrPrice = ArrayPrice.split(",");
                arrayItemIds = IdsByPrice.split(",");
            }
            idsByPrice = IdsByPrice;
            if (arrPrice.length > 0) {
                $("#ShoppingOptionsByPrice").find(".sfBtn").show()
                $(".divRange").show();
                $("#amount").html("<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 0) * rate + "</span>" +
                    " - " + "<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 1) * rate + "</span>");
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            }
            else {
                $(".divRange").hide();
                $("#ShoppingOptionsByPrice").find(".sfBtn").hide();
                $("#tblShoppingOptionsByPrice>tbody").html("<tr><td><span class=\"cssClassNotFound\">" + getLocale(AspxShoppingOptions, "No Data Found!") + "</span></td></tr>");
            }
            $(".cssShoppingBrand").find(".checked").removeClass("checked");
            $(".divRange").append('<p><b style="color: #006699;margin-left:10px">' + getLocale(AspxShoppingOptions, "Range:") + '&nbsp;<span id="amount"></span></b></p>');
            $(".divTitle").live('click', function() {
                var imgPath = $(this).find('img').attr('src');
                if (imgPath == "" + templatePath + "/images/arrow_down.png") {
                    $(this).find('img').attr('src', '' + templatePath + '/images/arrow_up.png');

                } else {
                    $(this).find('img').attr('src', '' + templatePath + '/images/arrow_down.png');
                }
                if ($(this).parent().attr('id') == "divShoppingBrand") {
                    if ($("#divShoppingBrand").find(".cssShoppingBrand").length > 0) {
                        $("#divShoppingBrand").find(".cssShoppingBrand").slideToggle('fast');
                    }
                    else {
                        var x = $.trim($("#scrollbar1").find(".overview").html());
                        if (x == "") {
                            $("#divBrandNotFound").slideToggle('fast');
                        }
                        else {
                            $("#scrollbar1").slideToggle('fast');
                        }
                    }
                } else {
                    $(this).next("div").slideToggle('fast');
                }
            });
            $("#slider-range").slider({
                range: true,
                min: parseFloat(minPrice),
                max: parseFloat(maxPrice),
                values: [parseFloat(minPrice), parseFloat(maxPrice)],
                slide: function(event, ui) {
                    $("#amount").html("<span class=\"cssClassFormatCurrency\">" + ui.values[0] * rate + "</span>" + " -" + "<span class=\"cssClassFormatCurrency\">" + ui.values[1] * rate + "</span>");
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                },
                change: function(event, ui) {
                    $("#amount").html("<span class=\"cssClassFormatCurrency\">" + ui.values[0] * rate + "</span>" + " -" + "<span class=\"cssClassFormatCurrency\">" + ui.values[1] * rate + "</span>");
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    var lowerPrice = ui.values[0];
                    var higherPrice = ui.values[1];
                    var ids = '';
                    idsByPrice = '';
                    $.each(arrPrice, function(index, value) {
                        if (parseFloat(value) >= lowerPrice && parseFloat(value) <= higherPrice) {
                            idsByPrice += arrayItemIds[index] + ',';
                        }
                    });
                    idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                }
            });
            $("#btnShoppingSubmit").bind('click', function() {
                var ids = [];
                var sliderIDs = [];
                $('.chkShopByBrand').each(function() {
                    if ($(this).attr('checked') == true) {
                        ids.push($(this).attr("value"));
                    }
                });
                var brandIDs = ids.join(',');
                $.cookies.set("BrandIds", brandIDs);
                $.cookies.set("lowerLimit", $("#slider-range").slider("values", 0));
                $.cookies.set("upperLimit", $("#slider-range").slider("values", 1));
//                var resId = '';
//                ShopingOptions.GetItemIDsByBrandIDs(brandIDs);
//                sliderIDs = idsByPrice.split(',');
//                if (ids.length > 0) {
//                    $.each(sliderIDs, function(index, value) {
//                        for (j = 0; j < itemIDs.length; j++) {
//                            if (value == itemIDs[j]) {
//                                resId += itemIDs[j] + ',';
//                                break;
//                            }
//                        }
//                    });
//                    resId = resId.substring(0, resId.lastIndexOf(','));
//                }
//                else {
//                    resId = idsByPrice;
//                }
                window.location = aspxRedirectPath + 'option/results' + pageExtension ;
            });
            $("#amount").html("<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 0) * rate + "</span>" +
                    " - " + "<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 1) * rate + "</span>");
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        ajaxCall: function(config) {
            $.ajax({
                type: ShopingOptions.config.type,
                contentType: ShopingOptions.config.contentType,
                cache: ShopingOptions.config.cache,
                async: ShopingOptions.config.async,
                url: ShopingOptions.config.url,
                data: ShopingOptions.config.data,
                dataType: ShopingOptions.config.dataType,
                success: ShopingOptions.config.ajaxCallMode,
                error: ShopingOptions.ajaxFailure
            });
        },

        GetShoppingOptionsByPrice: function() {
            this.config.method = "AspxCommerceWebService.asmx/ShoppingOptionsByPrice";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, upperLimit: upperLimit });
            this.config.ajaxCallMode = ShopingOptions.BindShoppingOptionsByPrice;
            this.ajaxCall(this.config);
        },

        GetShoppingOptionForSlider: function() {
            this.config.method = "AspxCommerceWebService.asmx/ShoppingOptionForSlider";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = ShopingOptions.ShoppingOptionForSlider;
            this.ajaxCall(this.config);
        },

        GetAllBrand: function() {
            this.config.method = "AspxCommerceWebService.asmx/ShoppingOptionsByBrand";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = ShopingOptions.BindAllBrand;
            this.ajaxCall(this.config);
        },
        GetItemIDsByBrandIDs: function(brandIDs) {
            this.config.method = "AspxCommerceWebService.asmx/ShoppingOptionsItemsByBrandIDs";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, brandIDs: brandIDs });
            this.config.ajaxCallMode = ShopingOptions.BindItemIDsByBrandIDs;
            this.ajaxCall(this.config);
        },

        BindShoppingOptionsByPrice: function(data) {
            $("#ShoppingOptionsByPrice").find(".divTitle").html("").append('<b><label  class="cssClassShoppingOptionByPrice" style="color:#006699">' + getLocale(AspxShoppingOptions, 'By Price') + '</label></b><img align="right" src="' + templatePath + '/images/arrow_up.png"/>');
            if (data.d.length > 0) {
                $(".divRange").show();

                $("#tblShoppingOptionsByPrice>tbody").html('');
                $("#" + lblPriceTitle).show();

                $.each(data.d, function(index, item) {
                    var PriceOptions = '';
                    var itemIDsPrice = JSON2.stringify(item.ItemIDs);
                    if (index % 2 == 0) {
                        PriceOptions = "<tr class='sfEven'><td><a onclick='ShopingOptions.ShoppingByPriceAndBrand(" + item.LowerOption + ',' + item.UpperOption + ");' href='#' ><span class='cssClassFormatCurrency'>" + item.LowerOption * rate + "</span> - <span class='cssClassFormatCurrency'>" + item.UpperOption * rate + "</span></a></td></tr>";
                    } else {
                        PriceOptions = "<tr class='sfOdd'><td><a onclick='ShopingOptions.ShoppingByPriceAndBrand(" + item.LowerOption + ',' + item.UpperOption + ");' href='#' ><span class='cssClassFormatCurrency'>" + item.LowerOption * rate + "</span> - <span class='cssClassFormatCurrency'>" + item.UpperOption * rate + "</span></a></td></tr>";
                    }
                    $("#tblShoppingOptionsByPrice>tbody").append(PriceOptions);
                });
                var firstContent = $("#tblShoppingOptionsByPrice>tbody> tr:first").find('a').html().replace('-', ' ');
                $("#tblShoppingOptionsByPrice>tbody> tr:first").find('a').html(firstContent);
                $("#tblShoppingOptionsByPrice>tbody> tr:first").find('span:eq(0)').removeAttr('class').html(getLocale(AspxShoppingOptions, 'Below'));
                if ($("#tblShoppingOptionsByPrice>tbody> tr").size() > 1) {
                    var lastContent = $("#tblShoppingOptionsByPrice>tbody> tr:last").find('a').html().replace('-', ' ');
                    $("#tblShoppingOptionsByPrice>tbody> tr:last").find('a').html(lastContent);
                    $("#tblShoppingOptionsByPrice>tbody> tr:last").find('span:eq(1)').html($("#tblShoppingOptionsByPrice>tbody> tr:last").find('span:eq(0)').html());
                    $("#tblShoppingOptionsByPrice>tbody> tr:last").find('span:eq(0)').removeAttr('class').html(getLocale(AspxShoppingOptions, 'Above'));
                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            } else {
                $("#tblShoppingOptionsByPrice>tbody").html("<tr><td><span class=\"cssClassNotFound\">" + getLocale(AspxShoppingOptions, "No Data Found!") + "</span></td></tr>");
            }
            if ($(".cssClassScroll").find('.overview').height() >= 135) {
                $(".cssClassScroll").find(".thumb").show();
                $(".cssClassScroll").tinyscrollbar();
            } else {
                $(".cssClassScroll").find(".viewport").height($(".cssClassScroll").find(".overview").height());
                $(".cssClassScroll").find(".thumb").hide();
            }
        },
        BindAllBrand: function(data) {
            var brands = '';
            if (data.d.length > 0) {
                brands = '<div class="divTitle"><b><label class="cssClassShoppingOptionByPrice" style="color:#006699">' + getLocale(AspxShoppingOptions, 'By Brand') + '</label></b><img align="right" src="' + templatePath + '/images/arrow_up.png"/></div>';
                $("#divShoppingBrand").append(brands);
                brands = '';
                brands += "<ul class='cssShoppingBrand'>";
                $.each(data.d, function(index, item) {
                    brands += "<li><label><input type='checkbox' class='chkShopByBrand' name=" + item.BrandName + " value=" + item.BrandID + " ><span>" + item.BrandName + "</span></label></li>";
                });
                brands += "</ul>";
            }
            else {
                brands = '<h3><label class="cssClassShoppingOptionByPrice"><span>' + getLocale(AspxShoppingOptions, 'By Brand') + '</span><label></h3>';
                brands += "<span class=\"cssClassNotFound\">" + getLocale(AspxShoppingOptions, "There is no any Brand!") + "</span>";
            }
            if (data.d.length > 7) {
                $("#scrollbar1").show();
                $("#scrollbar1").find(".overview").append(brands);
                $("input.chkShopByBrand:checkbox").uniform();
                $("#scrollbar1").tinyscrollbar();
            }
            else if (data.d.length <= 7) {
                $("#scrollbar1").hide();
                $("input.chkShopByBrand:checkbox").uniform();
                $("#divShoppingBrand").append(brands);
            }
        },
        BindItemIDsByBrandIDs: function(data) {
            itemIDs = [];
            if (data.d.length > 0) {
                $.each(data.d, function(index, item) {
                    itemIDs.push(item.ItemID);
                });
                //                    var itemIDByBrand = itemIDs.join(',');
                //                    window.location = aspxRedirectPath + 'option/results.aspx?id=' + itemIDByBrand;
            }
        },
        ShoppingByPriceAndBrand: function(lowerLimit, upperlimit) {
            var priceIDs = [];
            var ids = [];
            var commonID = '';
            $('.chkShopByBrand').each(function() {
                if ($(this).attr('checked') == true) {
                    ids.push($(this).attr("value"));
                }
            });
            var brandIDs = ids.join(',');
            $.cookies.set("BrandIds", brandIDs);
            $.cookies.set("lowerLimit", lowerLimit);
            $.cookies.set("upperLimit", upperlimit);
            //            ShopingOptions.GetItemIDsByBrandIDs(upperlimit);
            //            priceIDs = itemIDsByPrice.split(',');
            //            if (ids.length > 0) {
            //                $.each(priceIDs, function(index, value) {
            //                    for (j = 0; j < itemIDs.length; j++) {
            //                        if (value == itemIDs[j]) {
            //                            commonID += itemIDs[j] + ',';
            //                            break;
            //                        }
            //                    }
            //                });
            //                commonID = commonID.substring(0, commonID.lastIndexOf(','));
            //            }
            //            else {
            //                commonID = itemIDsByPrice;
            //            }
            window.location = aspxRedirectPath + 'option/results' + pageExtension;
        },

        ShoppingOptionForSlider: function(data) {
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    arrPrice.push(value);
                    if (parseFloat(value.Price) > maxPrice) {
                        maxPrice = parseFloat(value.Price);
                    }
                    if (parseFloat(value.Price) < minPrice || minPrice == 0) {
                        minPrice = parseFloat(value.Price);
                    }
                });
                $.each(arrPrice, function(index, value) {
                    if (value.Price >= minPrice && value.Price <= maxPrice) {
                        idsByPrice += value.ItemID + ',';
                    }
                });
                idsByPrice = idsByPrice.substring(0, idsByPrice.lastIndexOf(','));
                $("#amount").html("<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 0) * rate + "</span>" +
                    " - " + "<span class=\"cssClassFormatCurrency\">" + $("#slider-range").slider("values", 1) * rate + "</span>");
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            } else {
                $("#tblShoppingOptionsByPrice>tbody").html("<tr><td><span class=\"cssClassNotFound\">" + getLocale(AspxShoppingOptions, "No Data Found!") + "</span></td></tr>");
            }

        }
    }

    ShopingOptions.init();
});