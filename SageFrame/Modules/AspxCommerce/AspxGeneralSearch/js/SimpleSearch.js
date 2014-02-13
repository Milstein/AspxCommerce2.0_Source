var simpleSearch = "";
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
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    simpleSearch = {
        config: {
            isPostBack: false,
            async: true,
            cache: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: ""
        },

        ajaxCall: function(config) {
            $.ajax({
                type: simpleSearch.config.type,
                contentType: simpleSearch.config.contentType,
                cache: simpleSearch.config.cache,
                async: simpleSearch.config.async,
                url: simpleSearch.config.url,
                data: simpleSearch.config.data,
                dataType: simpleSearch.config.dataType,
                success: simpleSearch.config.ajaxCallMode,
                error: simpleSearch.ajaxFailure
            });
        },

        PassSimpleSearchTerm: function() {
            var categoryId;
            var selected;
            if (showCategoryForSearch.toLowerCase() == 'true') {
                categoryId = $("#txtSelectedCategory").val();
            } else {
                categoryId = 0;
                selected = true;
            }
            var searchText = $.trim($("#txtSimpleSearchText").val());

            if (categoryId == "0") {
                categoryId = 0;
            }
            if (searchText == getLocale(AspxGeneralSearch, "What are you shopping today?")) {
                //alert("Enter search text");
                //  $("#txtSimpleSearchText").focus().val('');
                //   return false;
                searchText = "";
            }
            //else if ($("#txtSimpleSearchText").val() != '') {
            //Redirect HERE
            if ($("#sfSimpleSearchCategory li").hasClass("sfSelected")) {
                selected = true;
            }
            if (searchText != "" && selected == true) {
                var currentUrl = window.location.href;
                currentUrl = currentUrl.toLowerCase();
                resultPage = resultPage.toLowerCase();
                if (resultPage == "show-details-page") {
                    if (typeof (ItemList) != "undefined") {
                        ItemList.IsInSamePage = true;
                        ItemList.BindSimpleSearchResultItems(1, $("#ddlSimpleSearchPageSize").val(), 0, $("#ddlSimpleSortBy option:selected").val());
                    } else {
                        window.location.href = aspxRedirectPath + "search/simplesearch" + pageExtension + "?cid=" + categoryId + "&q=" + searchText;

                    }
                } else {
                    window.location.href = aspxRedirectPath + "search/simplesearch" + pageExtension + "?cid=" + categoryId + "&q=" + searchText;
                }
            }
            return false;
            // }
        },

        LoadAllCategoryForSimpleSearch: function() {
            var isActive = true;
            this.config.url = this.config.baseURL + "GetAllCategoryForSearch";
            this.config.data = JSON2.stringify({ prefix: '---', isActive: isActive, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = simpleSearch.BindCategoryForSimSearch;
            this.ajaxCall(this.config);
        },
        BindCategoryForSimSearch: function(msg) {
            $("#sfSimpleSearchCategory").html('');
            var Elements = '';
            Elements = '<li value="" class="sfSelected" onClick="simpleSearch.fnClickHandle(this)"><a href="#"><span class="value" category="Select Category">' + getLocale(AspxGeneralSearch, "Select Category") + '</sapn></a></li>';
            Elements += '<li value="0" onClick="simpleSearch.fnClickHandle(this)"><a href="#"><span class="value" category="--All Category--">' + getLocale(AspxGeneralSearch, "--All Category--") + '</sapn></a></li>';
            $.each(msg.d, function(index, item) {
                Elements += "<li value=" + item.CategoryID + " onClick='simpleSearch.fnClickHandle(this)'><a href='#'><span class='value' category ='" + item.LevelCategoryName + "'>" + item.LevelCategoryName + "<span></a></li>";
            });
            $("#sfSimpleSearchCategory").html(Elements);
            //$(".sfCategoryDropdown").find('#spanResult').html('').html(getLocale(AspxGeneralSearch, "--All Category--"));
        },
        BindSearchTerms: function(msg) {
            var Elements = '';
            if (msg.d.length > 0) {
                $("#topSearch").show();
                Elements += '<span>' + getLocale(AspxGeneralSearch, 'Popular:') + '</span>';
                Elements += '<ul id="topSearchNew">';
                $.each(msg.d, function(index, item) {
                    var link = aspxRedirectPath + "search/simplesearch" + pageExtension + "?cid=0&amp;q=" + item.SearchTerm;
                    Elements += "<li><a href='" + link + "'><span>" + item.SearchTerm + "</span></a></li>";
                });
                Elements += "</ul>";
            }
            $("#topSearch").append(Elements);

        },
        LoadTopSearchTerms: function() {
            var count = 5;
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.url = this.config.baseURL + "GetTopSearchTerms";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo, Count: count });
            this.config.ajaxCallMode = simpleSearch.BindSearchTerms;
            this.ajaxCall(this.config);
        },
        fnClickHandle: function(id) {
            var element = $(id).find('span').attr('category');
            $("#txtSelectedCategory").val($(id).attr('value'));
            $(".sfCategoryDropdown").find('#spanResult').html('').html(element);
            if ($(id).hasClass("sfSelected") == false) {
                $(id).addClass("sfSelected");
                $(id).parents('ul').find('li').not($(id)).removeClass('sfSelected');
            }
            $("#sfSimpleSearchCategory").hide();

        },
        init: function(config) {
            $('#txtSimpleSearchText').val('');
            if (showCategoryForSearch.toLowerCase() == 'true') {
                //simpleSearch.LoadAllCategoryForSimpleSearch();
                $(".sfCategoryDropdown").find('#spanResult').text('').text(getLocale(AspxGeneralSearch, "Select Category"));
            }
            if (showSearchKeyWords.toLowerCase() == 'true') {
                //simpleSearch.LoadTopSearchTerms();
            }
            $('#txtSimpleSearchText').autocomplete({
                source: function(request, response) {
                    var searchTerm = $.trim($('#txtSimpleSearchText').val());
                    // if (searchTerm != '') {
                    $.ajax({
                        url: aspxservicePath + "AspxCommerceWebService.asmx/GetSearchedTermList",
                        data: JSON2.stringify({ search: searchTerm, aspxCommonObj: aspxCommonObj() }),
                        dataType: "json",
                        async: false,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataFilter: function(data) { return data; },
                        success: function(data) {
                            response($.map(data.d, function(item) {
                                return {
                                    value: item.SearchTerm
                                };
                            }));
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(textStatus);
                        }
                    });
                    // }
                },
                minLength: 2
            });

            $("#btnSimpleSearch").bind("click", function() {
                simpleSearch.PassSimpleSearchTerm();
            });

            $("#lnkAdvanceSearch").click(function() {
                if (userFriendlyURL) {
                    window.location.href = aspxRedirectPath + advanceSearchURL + pageExtension;
                } else {
                    window.location.href = aspxRedirectPath + advanceSearchURL;
                }
            });
            $(".cssClassSageSearchBox").each(function() {
                if ($(this).val() == "") {
                    $(this).addClass("lightText").val(getLocale(AspxGeneralSearch, "What are you shopping today?"));
                }
            });

            $(".cssClassSageSearchBox").bind("focus", function() {
                if ($(this).val() == getLocale(AspxGeneralSearch, "What are you shopping today?")) {
                    $(this).removeClass("lightText").val("");
                }
                // focus lost action
            });

            $(".cssClassSageSearchBox").bind("blur", function() {
                if ($(this).val() == "") {
                    $(this).val("What are you shopping today?").addClass("lightText");
                }
            });

            $("#txtSimpleSearchText").bind("focus", function() {
                $("#txtSimpleSearchText").val("");
            });
            $("#txtSimpleSearchText").keyup(function(event) {
                if (event.keyCode == 13) {
                    $("#btnSimpleSearch").click();
                }
            });
            $(".cssClassSageSearchBox").bind("focusout", function() {
                if ($(this).val() == "") {
                    $(this).val(getLocale(AspxGeneralSearch, "What are you shopping today?")).addClass("lightText");
                }
            });

            $("#sfSimpleSearchCategory  li").bind('click', function() {
                var element = $(this).find('span').attr('category');
                $("#txtSelectedCategory").val($(this).attr('value'));
                $(".sfCategoryDropdown").find('#spanResult').html('').html(element);
                if ($(this).hasClass("sfSelected") == false) {
                    $(this).addClass("sfSelected");
                    $(this).parents('ul').find('li').not($(this)).removeClass('sfSelected');
                }
                $("#sfSimpleSearchCategory").hide();
            });

            $(".sfCategoryDropdown").find('dt').live('click', function() {
                $("#sfSimpleSearchCategory").slideToggle();
            });
        }
    };
    simpleSearch.init();
});