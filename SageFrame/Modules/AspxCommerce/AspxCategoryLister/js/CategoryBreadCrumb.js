var Breadcrum = "";
$.extend($.expr[':'], {
    containsExact: function(a, i, m) {
        var ihtml = $('<div />').html(a.innerHTML).text();
        return $.trim(ihtml.toLowerCase()) === m[3].toLowerCase();
    }
});
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};
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
    Breadcrum = {
        vars: {
            itemCat: "",
            itmName: "",
            current: ""
        },
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
            ajaxCallMode: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: Breadcrum.config.type,
                contentType: Breadcrum.config.contentType,
                cache: Breadcrum.config.cache,
                async: Breadcrum.config.async,
                url: Breadcrum.config.url,
                data: Breadcrum.config.data,
                dataType: Breadcrum.config.dataType,
                success: Breadcrum.config.ajaxCallMode,
                error: Breadcrum.config.ajaxFailure
            });
        },
        getBreadcrum: function() {
            var path = decodeURIComponent(window.location.href);
            var applicationPath = path.substring(path.indexOf(aspxRedirectPath) + 1, path.length);
            var cat = applicationPath.split('/'); //results::["SageFrame", "category", "fgh.aspx"];
            cat = cat.clean("");
            $('#breadcrumb ul').html('');
            if (cat.length > 1) {
                if (cat[1] == 'category') {
                    var x = cat[2];
                    x = x.split('.');
                    Breadcrum.vars.itmName = x[0];
                    Breadcrum.getCategoryOnly(Breadcrum.vars.itmName);
                } else if (cat[1] == 'item') {
                    var y = cat[2];
                    y = y.split('.');
                    Breadcrum.vars.itmName = y[0];
                    Breadcrum.getCategory(Breadcrum.vars.itmName);
                    //  Breadcrum.getCategoryForItem(Breadcrum.vars.itmName);
                }
                else if (cat[1] == 'tagsitems') {
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Tags') + '</li>');
                } else if (cat[1] == 'search') {
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Search') + '</li>');
                } else if (cat[1] == 'option') {
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Shopping Options') + '</li>');
                } else if (cat[1] == 'brand') {
                    var y = cat[2];
                    y = y.split('.');
                    Breadcrum.vars.current = y[0];
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                }
                else if (cat[1] == 'service') {
                    var y = cat[2];
                    y = y.split('.');
                    Breadcrum.vars.current = y[0];
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                }
                else if (cat[1] == 'portal') {
                    if (cat[3] == 'item') {
                        var m = cat[4];
                        m = m.split('.');
                        Breadcrum.vars.itmName = m[0];
                        Breadcrum.getCategory(Breadcrum.vars.itmName);
                    } else if (cat[3] == 'category') {
                        var x3 = cat[4];
                        x3 = x3.split('.');
                        Breadcrum.vars.itmName = x3[0];
                        Breadcrum.getCategoryOnly(Breadcrum.vars.itmName);

                    }
                    else if (cat[3] == 'tagsitems') {
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Tags') + '</li>');
                    } else if (cat[3] == 'search') {
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Search') + '</li>');
                    } else if (cat[3] == 'option') {
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Shopping Options') + '</li>');
                    } else if (cat[3] == 'brand') {
                        var y = cat[4];
                        y = y.split('.');
                        Breadcrum.vars.current = y[0];
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                    }
                    else if (cat[3] == 'service') {
                        var y = cat[4];
                        y = y.split('.');
                        Breadcrum.vars.current = y[0];
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                    }
                    else {

                        var x2 = cat[3];
                        if (x2 != undefined) {
                            x2 = x2.split('.')[0];
                        }
                        //x2 = x2.replace(new RegExp("-", "g"), ' ');
                        if (x2 != '' && x2.toLowerCase() != 'default' && x2.toLowerCase() != 'home') {
                            $('#breadcrumb ul').html('');
                            Breadcrum.getSageBreadcrum(x2);
                        } else {
                            $('#breadcrumb ul').html('');
                            $('#breadcrumb').hide();
                        }
                    }

                } else {
                    var x = cat[1];
                    if (x != undefined) {
                        x = x.split('.')[0];
                    }
                    // x = x.replace(new RegExp("-", "g"), ' ');
                    x = x.replace('ampersand', '&');
                    if (x != '' && x.toLowerCase() != 'default' && x.toLowerCase() != 'home') {
                        $('#breadcrumb ul').html('');
                        Breadcrum.getSageBreadcrum(x);
                    } else {
                        $('#breadcrumb ul').html('');
                        $('#breadcrumb').hide();
                    }


                }
            } else {
                $('#breadcrumb ul').html('');
                $('#breadcrumb').hide();

            }
        },
        getSageBreadcrum: function(itmName) {
            // itmName = decodeURIComponent(itmName.replace('ampersand', '&').replace(new RegExp("-", "g"), ' ').replace('_', '-'));
            Breadcrum.config.method = "AspxCommerceWebService.asmx/GetBreadCrumb";
            Breadcrum.config.url = Breadcrum.config.baseURL + Breadcrum.config.method;
            Breadcrum.config.data = JSON2.stringify({ name: itmName, commonInfo: aspxCommonObj() });
            Breadcrum.config.ajaxCallMode = function(data) {
                if (data.d.length > 0) {

                    var len = data.d.length - 1;
                    $.each(data.d, function(index, item) {
                        if (index != len)
                            if (index == 0) {
                            if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                                $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + pageExtension + ' >' + 'home' + '</a></li>');
                            } else {
                                $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + 'home' + '</a></li>');
                            }
                        } else {
                            if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                                $('#breadcrumb ul').append('<li><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + item.TabPath + pageExtension + ' >' + item.TabPath + '</a></li>');
                            } else {
                                $('#breadcrumb ul').append('<li ><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + item.TabPath + ' >' + item.TabPath + '</a></li>');
                            }
                        }
                        if (index == len) {

                            $('#breadcrumb ul').append('<li>' + item.TabPath + '</li>');
                        }

                    });
                    $('#breadcrumb ul li:last').addClass("last");
                    $('#breadcrumb ul li').not('.last').click(function() {
                        if ($(this).attr('class') == 'first') {
                        } else {
                            var current = $(this).children().html();
                            //alert(current);
                            $(this).nextAll().remove();
                            $('#breadcrumb li:last').remove();
                            $('#breadcrumb ul').append('<li class="last">' + current + '</li>');
                        }
                    });
                }
            };
            Breadcrum.ajaxCall(Breadcrum.config);
        },

        getCategoryOnly: function(itmName) {
            itmName = fixedDecodeURIComponent(itmName);
            Breadcrum.config.method = "AspxCommerceWebService.asmx/GetCategoryName";
            Breadcrum.config.url = Breadcrum.config.baseURL + Breadcrum.config.method;
            Breadcrum.config.data = JSON2.stringify({ name: itmName, commonInfo: aspxCommonObj() });
            Breadcrum.config.ajaxCallMode = Breadcrum.BindGetCategoryOnly;
            Breadcrum.ajaxCall(Breadcrum.config);
        },
        BindGetCategoryOnly: function(data) {
            if (data.d.length > 0) {
                if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                    $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + pageExtension + ' >' + 'home' + '</a></li>');
                } else {
                    $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + 'home' + '</a></li>');
                }
                var len = data.d.length - 1;
                $.each(data.d, function(index, item) {
                    if (index != len)
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'category/' + item.TabPath + pageExtension + ' >' + item.TabPath + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li ><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'category/' + item.TabPath + ' >' + item.TabPath + '</a></li>');
                    }
                    if (index == len) {

                        $('#breadcrumb ul').append('<li>' + item.TabPath + '</li>');
                    }

                });
                $('#breadcrumb ul li:last').addClass("last");
                $('#breadcrumb ul li').not('.last').click(function() {
                    if ($(this).attr('class') == 'first') {
                    } else {
                        var current = $(this).children().html();
                        //alert(current);
                        $(this).nextAll().remove();
                        $('#breadcrumb li:last').remove();
                        $('#breadcrumb ul').append('<li class="last">' + current + '</li>');
                    }
                });
            }
        },
        getCategory: function(itmName) {
            itmName = fixedDecodeURIComponent(itmName);
            Breadcrum.config.method = "AspxCommerceWebService.asmx/GetItemCategories";
            Breadcrum.config.url = Breadcrum.config.baseURL + Breadcrum.config.method;
            Breadcrum.config.data = JSON2.stringify({ itemName: itmName, commonInfo: aspxCommonObj() });
            Breadcrum.config.ajaxCallMode = Breadcrum.BindGetCategory;
            Breadcrum.ajaxCall(Breadcrum.config);
        },
        BindGetCategory: function(data) {
            if (data.d.length > 0) {
                if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                    $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + pageExtension + ' >' + 'home' + '</a></li>');
                } else {
                    $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + 'home' + '</a></li>');
                }
                var len = data.d.length - 1;
                $.each(data.d, function(index, item) {
                    if (index != len)
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'category/' + item.TabPath + pageExtension + ' >' + item.TabPath + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li ><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'category/' + item.TabPath + ' >' + item.TabPath + '</a></li>');
                    }
                    if (index == len) {

                        $('#breadcrumb ul').append('<li>' + item.TabPath + '</li>');
                    }

                });
                $('#breadcrumb ul li:last').addClass("last");
                $('#breadcrumb ul li').not('.last').click(function() {
                    if ($(this).attr('class') == 'first') {
                    } else {
                        var current = $(this).children().html();
                        //alert(current);
                        $(this).nextAll().remove();
                        $('#breadcrumb li:last').remove();
                        $('#breadcrumb ul').append('<li class="last">' + current + '</li>');
                    }
                });
            }
        },

        getCategoryForItemPortal: function(itmName) {
            itmName = decodeURIComponent(itmName.replace('ampersand', '&').replace(new RegExp("-", "g"), ' ').replace('_', '-'));
            Breadcrum.config.method = "AspxCommerceWebService.asmx/GetCategoryForItem";
            Breadcrum.config.url = Breadcrum.config.baseURL + Breadcrum.config.method;
            Breadcrum.config.data = JSON2.stringify({ storeID: AspxCommerce.utils.GetStoreID(), portalID: AspxCommerce.utils.GetPortalID(), itemSku: itmName, cultureName: AspxCommerce.utils.GetCultureName() });
            Breadcrum.config.ajaxCallMode = Breadcrum.BindCategoryForItemPortal;
            Breadcrum.ajaxCall(Breadcrum.config);
        },
        BindCategoryForItemPortal: function(msg) {

            if (msg.d != null) {
                if (msg.d != "") {
                    var dx = jQuery.parseJSON(msg.d);
                    Breadcrum.vars.itemCat = dx.ItemCategory;
                    var tag = new Array();
                    var hrefarr = new Array();
                    tag = [];
                    hrefarr = [];
                    $('#breadcrumb ul').html('');
                    // current = decodeURI(itmName);
                    Breadcrum.vars.current = dx.ItemName; //decodeURIComponent(Breadcrum.vars.itmName);

                    var parents = dx.ParentCategories;
                    parents = parents.split(',');
                    var plength = parents.length;
                    for (var counter = 0; counter < plength; counter++) {
                        tag.push(parents[counter]);
                        var hrf = aspxRedirectPath + "category/" + fixedEncodeURIComponent($.trim(parents[counter])) + pageExtension;
                        hrefarr.push(hrf);
                    }
                    hrefarr.reverse();
                    // $('#breadcrumb ul').append('<li class="first"><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx" >home</a></li>');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + pageExtension + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    var tlength = tag.length;
                    if (tlength > 0) {
                        tag.reverse();
                        for (var x = 0; x < tlength; x++) {
                            $('#breadcrumb ul').append('<li ><a href="' + $.trim(hrefarr[x]) + '">' + tag[x] + '</a></li>');
                        }
                    }

                    // $('#breadcrumb ul li:last').addClass('last');
                    $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + ' </li>');
                    tag = [];
                    hrefarr = [];

                    //  $('#breadcrumb ul li').not('.last').click(function() {
                    //    if ($(this).attr('class') == 'first') {
                    //    }
                    //   else {
                    //        var current = $(this).children().html();
                    //        $(this).nextAll().remove();
                    //        $('#breadcrumb li:last').remove();
                    //        $('#breadcrumb ul').append('<li class="last">' + current + '</li>');
                    //      }
                    //   });

                } else {
                    $('#breadcrumb li:last').remove();
                }
            }

        },
        getCategoryForItem: function(itmName) {
            itmName = decodeURIComponent(itmName.replace('ampersand', '&').replace(new RegExp("-", "g"), ' ').replace('_', '-'));
            Breadcrum.config.method = "AspxCommerceWebService.asmx/GetCategoryForItem";
            Breadcrum.config.url = Breadcrum.config.baseURL + Breadcrum.config.method;
            Breadcrum.config.data = JSON2.stringify({ storeID: AspxCommerce.utils.GetStoreID(), portalID: AspxCommerce.utils.GetPortalID(), itemSku: itmName, cultureName: AspxCommerce.utils.GetCultureName() });
            Breadcrum.config.ajaxCallMode = Breadcrum.BindCategoryForItem;
            Breadcrum.ajaxCall(Breadcrum.config);
        },
        BindCategoryForItem: function(msg) {

            if (msg.d != null) {
                if (msg.d != "") {
                    var dx = jQuery.parseJSON(msg.d);
                    Breadcrum.vars.itemCat = dx.ItemCategory;
                    var tag = new Array();
                    var hrefarr = new Array();

                    // current = decodeURI(itmName);
                    Breadcrum.vars.current = dx.ItemName; // decodeURIComponent(Breadcrum.vars.itmName);

                    var parents = dx.ParentCategories;
                    parents = parents.split(',');
                    var plength = parents.length;
                    for (var counter = 0; counter < plength; counter++) {
                        tag.push(parents[counter]);
                        var hrf = aspxRedirectPath + "category/" + fixedEncodeURIComponent($.trim(parents[counter])) + pageExtension;
                        hrefarr.push(hrf);
                    }

                    hrefarr.reverse();
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + pageExtension + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul li:gt(0)').remove();

                    var tlength = tag.length;
                    if (tlength > 0) {
                        tag.reverse();
                        for (var x = 0; x < tlength; x++) {
                            $('#breadcrumb ul').append('<li ><a href="' + $.trim(hrefarr[x]) + '">' + tag[x] + '</a></li>');
                        }
                    }

                    // $('#breadcrumb ul li:last').addClass('last');
                    $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + ' </li>');
                    tag = [];
                    hrefarr = [];

                    $('#breadcrumb ul li').not('.last').click(function() {
                        if ($(this).attr('class') == 'first') {
                        } else {
                            var current = $(this).children().html();
                            $(this).nextAll().remove();
                            $('#breadcrumb li:last').remove();
                            $('#breadcrumb ul').append('<li class="last">' + current + '</li>');
                        }
                    });
                } else {
                    $('#breadcrumb li:last').remove();
                }
            }
        },
        getBreadcrumforlive: function() {
            var path = decodeURIComponent(window.location.href);
            var applicationPath = path.substring(path.indexOf(aspxRedirectPath) + 1, path.length);

            var cat = applicationPath.split('/');
            cat = cat.clean("");
            if (cat.length > 1) {
                if (cat[1] == 'category') {
                    var x = cat[2];
                    x = x.split('.');
                    Breadcrum.vars.itmName = x[0];
                    Breadcrum.getCategoryOnly(Breadcrum.vars.itmName);

                } else if (cat[1] == 'item') {
                    var y = cat[2];
                    y = y.split('.');
                    Breadcrum.vars.itmName = y[0];
                    // Breadcrum.getCategoryForItem(Breadcrum.vars.itmName);
                    Breadcrum.getCategory(Breadcrum.vars.itmName);

                }
                else if (cat[1] == 'tagsitems') {
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Tags') + '</li>');
                } else if (cat[1] == 'search') {
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Search') + '</li>');
                } else if (cat[1] == 'option') {
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Shopping Options') + '</li>');
                } else if (cat[1] == 'brand') {
                    var y = cat[2];
                    y = y.split('.');
                    Breadcrum.vars.current = y[0];
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                }
                else if (cat[1] == 'service') {
                    var y = cat[2];
                    y = y.split('.');
                    Breadcrum.vars.current = y[0];
                    $('#breadcrumb ul').html('');
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    } else {
                        $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                    }
                    $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                }

                else if (cat[0] == 'portal') {
                    if (cat[2] == 'item') {
                        var m = cat[3];
                        m = m.split('.');
                        Breadcrum.vars.itmName = m[0];
                        Breadcrum.getCategory(Breadcrum.vars.itmName);
                    } else if (cat[2] == 'category') {
                        var x3 = cat[3];
                        x3 = x3.split('.');
                        Breadcrum.vars.itmName = x3[0];
                        Breadcrum.getCategoryOnly(Breadcrum.vars.itmName);
                    }
                    else if (cat[2] == 'tagsitems') {
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Tags') + '</li>');
                    } else if (cat[2] == 'search') {
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Search') + '</li>');
                    } else if (cat[2] == 'option') {
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + getLocale(AspxCategoryLister, 'Shopping Options') + '</li>');
                    } else if (cat[2] == 'brand') {
                        var y = cat[3];
                        y = y.split('.');
                        Breadcrum.vars.current = y[0];
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                    }
                    else if (cat[2] == 'service') {
                        var y = cat[3];
                        y = y.split('.');
                        Breadcrum.vars.current = y[0];
                        $('#breadcrumb ul').html('');
                        if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home.aspx' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        } else {
                            $('#breadcrumb ul').append('<li class="first"><a href=' + AspxCommerce.utils.GetAspxRedirectPath() + 'home' + ' >' + getLocale(AspxCategoryLister, 'home') + '</a></li>');
                        }
                        $('#breadcrumb ul').append('<li class="last">' + Breadcrum.vars.current + '</li>');
                    }
                    else {

                        var x2 = cat[2];
                        if (x2 != undefined) {
                            x2 = x2.split('.')[0];
                        }
                        //  x2 = x2.replace(new RegExp("-", "g"), ' ');
                        if (x2 != '' && x2.toLowerCase() != 'default' && x2.toLowerCase() != 'home') {
                            $('#breadcrumb ul').html('');
                            Breadcrum.getSageBreadcrum(x2);
                        } else {
                            $('#breadcrumb ul').html('');
                            $('#breadcrumb').hide();
                        }
                    }

                } else {

                    var x = cat[1];
                    if (x != undefined) {
                        x = x.split('.')[0];
                    }
                    // x = x.replace(new RegExp("-", "g"), ' ');
                    x = x.replace('ampersand', '&');
                    if (x != '' && x.toLowerCase() != 'default' && x.toLowerCase() != 'home') {
                        $('#breadcrumb ul').html('');
                        Breadcrum.getSageBreadcrum(x);
                    } else {
                        $('#breadcrumb ul').html('');
                        $('#breadcrumb').hide();
                    }
                }
            } else {
                $('#breadcrumb ul').html('');
                $('#breadcrumb').hide();
            }

        },
        Init: function() {
            $('#breadcrumb ul').html('');
            // if ($('.cssClassCategoryNav').length != 0) {
            if (AspxCommerce.utils.GetAspxRootPath() == "/") {
                Breadcrum.getBreadcrumforlive();
            } else {
                Breadcrum.getBreadcrum();
            }
        }
        //  }
    };
    Breadcrum.Init();
});