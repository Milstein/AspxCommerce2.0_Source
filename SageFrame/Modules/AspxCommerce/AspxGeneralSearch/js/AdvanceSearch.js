var AdvanceSearch = "";
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
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var currentPage = 0;
    var templateScriptArr = [];
    var hasData = false;
    function AddUpdateAdvanceSearchTerm() {
        var searchTerm = $.trim($("#txtSearchFor").val());
        if (searchTerm == "") {
            return false;
        }
        if (searchTerm == "What are you shopping today?") {
            searchTerm = "";
            return false;
        }

        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/AddUpdateSearchTerm",
            data: JSON2.stringify({ hasData: hasData, searchTerm: searchTerm, aspxCommonObj: aspxCommonObj() }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function() {
            }
        });
    }

    AdvanceSearch = {
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
                type: AdvanceSearch.config.type,
                contentType: AdvanceSearch.config.contentType,
                cache: AdvanceSearch.config.cache,
                async: AdvanceSearch.config.async,
                data: AdvanceSearch.config.data,
                dataType: AdvanceSearch.config.dataType,
                url: AdvanceSearch.config.url,
                success: AdvanceSearch.config.ajaxCallMode,
                error: AdvanceSearch.ajaxFailure
            });
        },

        init: function() {
            $.each(jsTemplateArray, function(index, value) {
                var tempVal = jsTemplateArray[index].split('@');
                var templateScript = {
                    TemplateKey: tempVal[0],
                    TemplateValue: tempVal[1]
                };
                templateScriptArr.push(templateScript);
            });
            $("#ddlPageSize").html('');
            CreateDdlPageSizeOption('ddlPageSize');

            $("#txtPriceFrom").bind("keypress", function(e) {
                if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {
                    if (e.which != 13) {
                        $("#errmsgPriceFrom").html(getLocale(AspxGeneralSearch, "Valid Digits And Decimal Only")).css("color", "red").show().fadeOut(1600);
                        return false;
                    }
                }

            });
            $("#txtPriceFrom,#txtPriceTo").bind('paste', function(e) {
                e.preventDefault();
            });
            $("#txtPriceFrom,#txtPriceTo").bind('contextmenu', function(e) {
                e.preventDefault();
            });
            $("#txtPriceTo").keypress(function(e) {
                if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {

                    if (e.which != 13) {
                        $("#errmsgPriceTo").html(getLocale(AspxGeneralSearch, "Valid Digits And Decimal Only")).css("color", "red").show().fadeOut(1600);
                        return false;
                    }
                }
            });

            AdvanceSearch.AdvanceSearchHideAll();
            //  LoadAllAspxTemplate();
            AdvanceSearch.LoadAllCategoryForSearch();

            createDropDown('ddlAdvanceSearchSortBy', 'divSortBy', 'sortBy', displaymode);
            createDropDown('ddlAdvanceSearchViewAs', 'divViewAs', 'viewAs', displaymode);

            AdvanceSearch.BindAttributes();
            $("#ddlAdvanceSearchViewAs").val(1);
            $("#ddlAdvanceSearchSortBy").val(1);
            $("#ddlAdvanceSearchViewAs").live("change", function() {
                BindResults('divShowAdvanceSearchResult', "divViewAs", 'ddlAdvanceSearchViewAs', null, allowOutStockPurchaseSetting, allowWishListAdvSearchSetting, noImageAdSearchPathSetting, noOfItemsInRow, displaymode);
            });
            $("#divViewAs").find('a').live('click', function() {
                $("#divViewAs").find('a').removeClass('sfactive');
                $(this).addClass("sfactive");
                BindResults('divShowAdvanceSearchResult', "divViewAs", 'ddlAdvanceSearchViewAs', null, allowOutStockPurchaseSetting, allowWishListAdvSearchSetting, noImageAdSearchPathSetting, noOfItemsInRow, displaymode);
            });
            $("#ddlAdvanceSearchSortBy").change(function() {
                // Create pagination element with options       
                var offset = 1;
                var limit = $('#ddlPageSize').val();
                AdvanceSearch.ShowSearchResult(offset, limit, 0, $("#ddlAdvanceSearchSortBy option:selected").val());
            });

            $("#ddlPageSize").change(function() {
                var offset = 1;
                var limit = $(this).val();
                AdvanceSearch.ShowSearchResult(offset, limit, 0, $("#ddlAdvanceSearchSortBy option:selected").val());
            });

            $("#btnAdvanceSearch").click(function() {
                var offset = 1;
                var limit = $("#ddlPageSize").val();
                AdvanceSearch.ShowSearchResult(offset, limit, 0, $("#ddlAdvanceSearchSortBy option:selected").val());
            });


            $('#txtSearchFor').autocomplete({
                source: function(request, response) {
                    var searchTerm = $.trim($('#txtSearchFor').val());
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.CultureName = null;
                    aspxCommonInfo.UserName = null;
                    if (searchTerm != '') {
                        $.ajax({
                            url: aspxservicePath + "AspxCommerceWebService.asmx/GetSearchedTermList",
                            data: JSON2.stringify({ search: searchTerm, aspxCommonObj: aspxCommonInfo }),
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataFilter: function(data) { return data; },
                            success: function(data) {
                                response($.map(data.d, function(item) {
                                    return {
                                        value: item.SearchTerm
                                    }
                                }))
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                alert(textStatus);
                            }
                        });
                    }
                },
                minLength: 2
            });


            $(".searchForTextBox").each(function() {
                if ($(this).val() == "") {
                    $(this).addClass("lightText").val(getLocale(AspxGeneralSearch, "What are you shopping today?"));
                }
            });

            $(".searchForTextBox").bind("focus", function() {
                if ($(this).val() == getLocale(AspxGeneralSearch, "What are you shopping today?")) {
                    $(this).removeClass("lightText").val("");
                }
                // focus lost action
            });

            $(".searchForTextBox").bind("blur", function() {
                if ($(this).val() == "") {
                    $(this).val(getLocale(AspxGeneralSearch, "What are you shopping today?")).addClass("lightText");
                }

            });
            $(".searchForTextBox").keyup(function(event) {
                if ($(this).val() != getLocale(AspxGeneralSearch, "What are you shopping today?")) {
                    $("#txtSearchFor").next('span').remove();
                }
            });

            $("#txtSearchFor,#txtPriceTo,#txtPriceFrom").keyup(function(event) {
                if (event.keyCode == 13) {
                    $("#btnAdvanceSearch").click();
                }
            });
            if ($('#divCheckBox ul li input[id=8]').is("checked")) {
                $('.pricebox input,.pricebox span').show();
                $("#txtPriceFrom").val('');
                $("#txtPriceTo").val('');
            } else {
                $('.pricebox input,.pricebox span').hide();
                $("#txtPriceFrom").val('');
                $("#txtPriceTo").val('');
            }
        },

        BindAttributes: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.url = this.config.baseURL + "GetAttributes";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = AdvanceSearch.BindSearchAttributes;
            this.ajaxCall(this.config);
        },

        AdvanceSearchHideAll: function() {
            $("#divItemViewOptions").hide();
            $("#divSearchPageNumber").hide();
            $("#divShowAdvanceSearchResult").hide();
        },

        AddToWishList: function(itemID) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.CultureName = null;
            if (aspxCommonInfo.UserName.toLowerCase() != 'anonymoususer') {
                this.config.url = this.config.baseURL + "CheckWishItems";
                this.config.data = JSON2.stringify({ ID: itemID, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = AdvanceSearch.CheckForWishItems;
                this.ajaxCall(this.config);
            } else {
                Login();
            }
        },

        LoadAllCategoryForSearch: function() {
            var isActive = true;
            this.config.url = this.config.baseURL + "GetAllCategoryForSearch";
            this.config.data = JSON2.stringify({ prefix: '---', isActive: isActive, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = AdvanceSearch.BindCategoryForSearch;
            this.ajaxCall(this.config);
        },

        ShowSearchResult: function(offset, limit, currentpage1, sortBy) {
            // debugger;
            currentPage = currentpage1;
            var categoryId = $("#ddlCategory").val();
            var chkIDs = '';
            var isSelectedAttr = false;
            var priceFrom = ($.trim($("#txtPriceFrom").val()) / rate).toFixed(2);
            var priceTo = ($.trim($("#txtPriceTo").val()) / rate).toFixed(2);
            var searchText = $.trim($("#txtSearchFor").val());
            if (priceFrom != "0.00" && priceTo != "0.00") {
                searchText = $.trim($("#txtSearchFor").val());
            } else {
                if (searchText == getLocale(AspxGeneralSearch, "What are you shopping today?")) {
                    searchText = "";
                    //  $("#txtSearchFor").focus().val('');
                    //  return false;
                }
            }
            var attributeIds = '';
            if (categoryId == "0") {
                categoryId = null;
            }
            if (searchText == "") {
                $("#txtSearchFor").focus();
                $("#txtSearchFor").next('span').remove();
                $("#txtSearchFor").parent('td').append('<span calss="error" style="color:red">*</span>');
                return false;
            }
            else {
                $("#txtSearchFor").next('span').remove();
            }
            if (searchText == getLocale(AspxGeneralSearch, "What are you shopping today?")) {
                searchText = "";
            }
            if (priceTo != "") {
                if (!/^[0-9]\d*(\.\d+)?$/.test(priceTo)) {
                    $("#errmsgPriceTo").html(getLocale(AspxGeneralSearch, "Valid Digits And Decimal Only")).css("color", "red").show().fadeOut(1600);
                    return false;
                }
            }
            if (priceFrom != "") {
                if (!/^[0-9]\d*(\.\d+)?$/.test(priceFrom)) {
                    $("#errmsgPriceFrom").html(getLocale(AspxGeneralSearch, "Valid Digits And Decimal Only")).css("color", "red").show().fadeOut(1600);
                    return false;
                }
            }
            priceFrom = parseFloat(priceFrom);
            priceTo = parseFloat(priceTo);


            if (priceFrom != "" && priceTo == "") {
                priceTo = null;
            } else {
                if (priceFrom == "" && priceTo == "") {
                    priceFrom = null;
                    priceTo = null;
                } else if (parseInt(priceTo, 10) < parseInt(priceFrom, 10)) {
                    csscody.alert('<h2>' + getLocale(AspxGeneralSearch, 'Information Alert') + '</h2><p>' + getLocale(AspxGeneralSearch, 'To Price must be greater than From Price') + '</p>');
                    return false;
                }
            }

            if (priceTo != "" && priceFrom == "") {
                priceFrom = null;
            }


            $("#divCheckBox ul").each(function() {
                var check = $(this).find("input[type='checkbox']");
                $.each(check, function() {
                    if ($(this).attr("checked")) {
                        isSelectedAttr = true;
                        attributeIds += $(this).attr('id') + ',';
                        chkIDs += $(this).attr('value');
                        chkIDs += ',';
                        chkIDs += $(this).attr('name');
                        chkIDs += '#';
                    }
                });
                attributeIds = attributeIds.substr(0, attributeIds.length - 1);

            });
            if (!isSelectedAttr) {
                csscody.alert('<h2>' + getLocale(AspxGeneralSearch, 'Information Alert') + '</h2><p>' + getLocale(AspxGeneralSearch, 'Please select at least one attribute to search.') + '</p>');
                return false;
            }

            var params = JSON2.stringify({
                offset: offset,
                limit: limit,
                aspxCommonObj: aspxCommonObj(),
                categoryID: categoryId,
                searchText: searchText,
                checkValue: chkIDs,
                priceFrom: priceFrom,
                priceTo: priceTo,
                attributeIds: attributeIds,
                SortBy: sortBy
            });
            AdvanceSearch.config.url = AdvanceSearch.config.baseURL + "GetItemsByDyanamicAdvanceSearch";
            AdvanceSearch.config.data = params;
            AdvanceSearch.config.ajaxCallMode = AdvanceSearch.BindItemsByDyanamicAdvanceSearch;
            AdvanceSearch.ajaxCall(AdvanceSearch.config);
        },


        BindSearchAttributes: function(msg) {
            var check = "";
            $.each(msg.d, function(index, item) {
                if (index % 5 == 0) {
                    check = "<li><input type='checkbox' id=" + item.AttributeID + " value=" + item.InputTypeID + " name=" + item.ValidationTypeID + "><label> " + item.AttributeName + "</label></li>";
                }
                else {
                    check = "<li><input type='checkbox' id=" + item.AttributeID + " value=" + item.InputTypeID + " name=" + item.ValidationTypeID + "><label> " + item.AttributeName + "</label></li>";
                }
                $("#divCheckBox ul").append(check);
            });
            if ($('#divCheckBox ul li input[id=8]').length > 0) {

                $('#divCheckBox ul li input[id=8]').bind("click", function() {

                    if ($(this).attr('checked') == true) {
                        $("#txtPriceFrom").val('');
                        $("#txtPriceTo").val('');
                        $('.pricebox input,.pricebox span').show();
                    } else {
                        $("#errmsgPriceFrom,#errmsgPriceTo").html('');
                        $("#txtPriceFrom").val('');
                        $("#txtPriceTo").val('');
                        $('.pricebox input,.pricebox span').hide();
                    }
                });

            } else {

            }
        },

        CheckForWishItems: function(msg) {
            if (msg.d) {
                csscody.alert('<h2>' + getLocale(AspxGeneralSearch, 'Information Alert') + '</h2><p>' + getLocale(AspxGeneralSearch, 'The selected item already in your wishlist.') + '</p>');
            } else {
                //  AddToList(itemID);
                AdvanceSearch.AddToWishListFromJS(itemID, storeId, portalId, userName, ip, countryName);
            }
        },

        BindCategoryForSearch: function(msg) {
            var Elements = '';
            Elements += '<option value="0">' + getLocale(AspxGeneralSearch, "--All Category--") + '</option>';
            $.each(msg.d, function(index, item) {
                Elements += "<option value=" + item.CategoryID + ">" + item.LevelCategoryName + "</option>";
            });
            $("#ddlCategory").html(Elements);
        },
        BindItemsByDyanamicAdvanceSearch: function(msg) {
            if (msg.d.length > 0) {
                hasData = true;
            } else {
                hasData = false;
            }
            BindTemplateDetails('divShowAdvanceSearchResult', 'divItemViewOptions', 'divViewAs', 'ddlAdvanceSearchViewAs', 'ddlAdvanceSearchSortBy', 'divSearchPageNumber', 'Pagination', 'ddlPageSize', currentPage, msg, AdvanceSearch.ShowSearchResult, 'AdvanceSearch', allowOutStockPurchaseSetting, allowWishListAdvSearchSetting, noImageAdSearchPathSetting, noOfItemsInRow, displaymode, templateScriptArr);
            AddUpdateAdvanceSearchTerm();
        }
    };
    AdvanceSearch.init();
});
                             