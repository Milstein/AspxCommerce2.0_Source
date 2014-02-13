var ItemsCompare = "";
$(function() {
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            sessionCode: AspxCommerce.utils.GetSessionCode()
        };
        return aspxCommonInfo;
    };
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var costVariantIds = "";
    var costVariantID = "";
    var itemId = 0;

    ItemsCompare = {
        config: {
            isPostBack: false,
            async: true,
            cache: false,
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
                type: ItemsCompare.config.type,
                contentType: ItemsCompare.config.contentType,
                cache: ItemsCompare.config.cache,
                async: ItemsCompare.config.async,
                data: ItemsCompare.config.data,
                dataType: ItemsCompare.config.dataType,
                url: ItemsCompare.config.url,
                success: ItemsCompare.config.ajaxCallMode,
                error: ItemsCompare.ajaxFailure
            });
        },
        GetCompareItemList: function() {
            this.config.url = this.config.baseURL + "GetItemCompareList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = ItemsCompare.BindItemCompareList;
            this.ajaxCall(this.config);
        },

        AddToMyCompare: function() {
            var SaveCompareItemObj = {
                ItemID: itemId,
                CostVariantIDs: costVariantID,
                IP: ip,
                CountryName: countryName
            };
            this.config.method = "SaveCompareItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), saveCompareItemObj: SaveCompareItemObj });
            this.config.ajaxCallMode = ItemsCompare.BindCompareID;
            this.ajaxCall(this.config);
        },

        DeleteCompareItem: function(compareId) {
            this.config.url = this.config.baseURL + "DeleteCompareItem";
            this.config.data = JSON2.stringify({ compareItemID: compareId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = null;
            this.ajaxCall(this.config);

            var ds = ItemsCompare.CompareProductLists();
            var variant = costVariantIds.substring(0, costVariantIds.length - 1);

            $.cookies.set("ItemCompareDetail", ds);
            $.cookies.set("showCompareList", 'true');
            $.cookies.set("costVariant", variant);

        },

        CheckCompareItem: function() {
            this.config.method = "CheckCompareItems";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ ID: itemId, aspxCommonObj: aspxCommonObj(), costVariantValueIDs: costVariantID });
            this.config.ajaxCallMode = ItemsCompare.BindCheckCompareItems;
            this.config.async = true;
            this.ajaxCall(this.config);
        },
        GetItemDetails: function() {
            this.config.method = "GetItemDetailsForCompare";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ ItemID: itemId, aspxCommonObj: aspxCommonObj(), costVariantValueIDs: costVariantID });
            this.config.ajaxCallMode = ItemsCompare.BindAddToCompareProducts;
            this.config.async = true;
            this.ajaxCall(this.config);
        },

        BindItemCompareList: function(data) {
            if (data.d.length > 0) {
                $("#compareProductsBox").html('');
                compareLen = 0;
                var bindData = '';
                costVariantIds = '';
                $.each(data.d, function(index, item) {
                    if (index < maxCompareItemCount) {
                        item.ImagePath = itemImagePath + item.ImagePath;
                        bindData += '<div class="productBox compareProduct" id="compareProductBox-' + item.CompareItemID + '" data=' + item.ItemID + ' costVariant=' + item.CostVariantValueID + '>';
                        bindData += '<div id="compareCompareClose-' + item.ItemID + '" onclick="ItemsCompare.RemoveFromAddToCompareBox(' + item.ItemID + ',' + item.CompareItemID + ');" class="compareProductClose">cancel</div>';
                        bindData += '<div class="productImage"><img src="' + aspxRootPath + item.ImagePath.replace('uploads', 'uploads/Small') + '"></div>';
                        if (item.ItemCostVariantValue != '') {
                            bindData += '<div class="productName">' + item.ItemName + '<br/>' + item.ItemCostVariantValue + '</div></div>';
                        } else {
                            bindData += '<div class="productName">' + item.ItemName + '</div></div>';
                        }
                        costVariantIds += item.CostVariantValueID + "#";
                        if (item.CostVariantValueID == '0') {
                            $('#compare-' + item.ItemID).attr('checked', 'checked');
                        }
                        compareLen++;
                    }
                });
            }
            if ((maxCompareItemCount - data.d.length) > 0) {
                for (var i = 0; i < (maxCompareItemCount - data.d.length); i++) {
                    bindData += "<div class=\"empty productBox\"></div>";
                }
            }
            $("#compareProductsBox").append(bindData);
            $('#compareProductsContainer').hide();
            //            if (compareLen >= 2) {
            //                $('#btnCompare').removeAttr('disabled');
            //                $('#btnCompareClearAll').removeAttr('disabled');
            //            }
            $("#compareError").append('<div id="compareErrorText">' + getLocale(AspxItemsCompare, 'Sorry, You can not add more than ') + '' + maxCompareItemCount + '&nbsp' + getLocale(AspxItemsCompare, "items") + '.</div>');
        },

        BindCompareID: function(data) {
            compareID = data.d;
            ItemsCompare.GetItemDetails();
        },

        BindCheckCompareItems: function(data) {
            if (data.d) {
                csscody.alert('<h2>' + getLocale(AspxItemsCompare, 'Information Alert') + '</h2><p>' + getLocale(AspxItemsCompare, 'The selected item already exist in compare list.') + '</p>');
                $('#compare-' + itemId + '').attr('checked', false);
                return false;
            } else {
                ItemsCompare.AddToCompareBox();
            }
        },

        BindAddToCompareProducts: function(data) {
            var html = '';
            if (data.d != '') {
                var prodImage = itemImagePath + data.d.ImagePath;
                if (data.d.ImagePath == "") {
                    prodImage = defaultImagePath;
                }
                var prodName = data.d.ItemName;
                var costVariantValue = data.d.ItemCostVariantValue;
                html = '<div id="compareCompareClose-' + itemId + '" onclick="ItemsCompare.RemoveFromAddToCompareBox(' + itemId + ',' + compareID + ');" class="compareProductClose">cancel</div>';
                if (costVariantValue != '') {
                    html += '<div class="productImage"><img src="' + aspxRootPath + prodImage.replace('uploads', 'uploads/Small') + '"></div><div class="productName">' + prodName + '<br/>' + costVariantValue + '</div>';
                } else {
                    html += '<div class="productImage"><img src="' + aspxRootPath + prodImage.replace('uploads', 'uploads/Small') + '"></div><div class="productName">' + prodName + '</div>';
                }
                $('.productBox').eq(compareLen - 1).removeClass('empty').addClass('compareProduct').attr('id', 'compareProductBox-' + compareID).attr('data', itemId).attr('costVariant', costVariantID).html(html);
                $('#compareProductsContainer').show();
                $(".cssCompareBtnWrapper").hide();
            }
        },

        AddToCompare: function(Id, costVariantId) {
            itemId = Id;
            costVariantID = costVariantId;
            if ($('#compare-' + itemId + '').is(':checked')) {
                ItemsCompare.CheckCompareItem();
            }
            else {
                var compareIdValue = $('#compareCompareClose-' + itemId).parent('div').attr('id');
                var compareIdRemove = compareIdValue.split('-')[1];
                ItemsCompare.RemoveFromAddToCompareBox(itemId, compareIdRemove);
            }
        },
        AddToCompareFromDetails: function(Id, costVariantId) {
            itemId = Id;
            costVariantID = costVariantId;
            ItemsCompare.CheckCompareItem();
        },

        AddToCompareBox: function() {
            if (compareLen >= parseInt(maxCompareItemCount)) {
                $('#compareError').show();
                $('#compare-' + itemId + '').attr('checked', false);
                $(".cssCompareBtnWrapper").hide();
                $('#compareProductsContainer').show();
                return false;
            }
            ItemsCompare.AddToMyCompare();
            costVariantIds += costVariantID;

            compareLen++;
            //            if (compareLen >= 2) {
            //                $('#btnCompare').removeAttr('disabled');
            //                $('#btnCompareClearAll').removeAttr('disabled');
            //            }
            return true;
        },

        RemoveFromAddToCompareBox: function(itemID, compareId) {
            $('#compareProductsContainer').show();
            $('#compareError').hide();
            $('#compareProductBox-' + compareId).remove();
            $('#compareProductsBox').append("<div class='empty productBox'></div>");
            $('#compare-' + itemID).attr('checked', false);
            ItemsCompare.DeleteCompareItem(compareId);
            compareLen--;
            //            if (compareLen < 2) {
            //                $('#btnCompare').attr('disabled', 'disabled');
            //                $('#btnCompareClearAll').attr('disabled', 'disabled');
            //            }
            if (compareLen == 0) {
                $('#compareProductsContainer').hide();
                $(".cssCompareBtnWrapper").hide();
            }
        },
        BindCompareEmptyBox: function() {
            $("#compareProductsBox").html('');
            var emptyHtml = '';
            for (var i = 1; i <= parseInt(maxCompareItemCount); i++) {
                emptyHtml += "<div class='empty productBox'></div>";
            }
            $("#compareProductsBox").html(emptyHtml);
            $("#compareError").append('<div id="compareErrorText">' + getLocale(AspxItemsCompare, 'Sorry, You cant add more than ') + ' ' + maxCompareItemCount + '&nbsp' + 'items.</div>');
        },
        CompareProductLists: function() {
            var comparedProdIds = '';
            costVariantIds = '';
            $('.compareProduct').each(function() {
                if ($(this).is(":visible")) {
                    comparedProdIds += $(this).attr('data') + '#';
                    var costvariant = $(this).attr('costVariant') + '#';
                    costVariantIds += costvariant;
                }
            });
            comparedProdIds = comparedProdIds.substring(0, comparedProdIds.lastIndexOf("#"));
            return comparedProdIds;
        },
        ClearAll: function() {
            if (compareLen > 0) {
                var ids = [];
                var itemIDs = ItemsCompare.CompareProductLists();
                ids = itemIDs.split('#');
                $.each(ids, function(index, value) {
                    if (value != '') {
                        var compareIdValue = $('#compareCompareClose-' + value).parent('div').attr('id');
                        var compareId = compareIdValue.split('-')[1];
                        ItemsCompare.RemoveFromAddToCompareBox(value, compareId);
                    }
                });
                compareLen = 0;
            }
        },

        Init: function() {
            if (enableCompareItem.toLowerCase() == 'true') {
                // ItemsCompare.GetCompareItemList();
                //                $('#btnCompareClearAll').removeAttr('disabled');
                //                if (compareLen >= 2) {
                //                    $('#btnCompare').removeAttr('disabled');
                //                }
                $('#compareCloseBtn').click(function() {
                    $('#compareProductsContainer').hide();
                    $(".cssCompareBtnWrapper").show();
                });
                if (compareLen > 0) {
                    $(".cssCompareBtnWrapper").show();
                }
                $('#btnCompare').click(function() {
                    if (compareLen > 1) {
                        var ds = ItemsCompare.CompareProductLists();
                        var variant = costVariantIds.substring(0, costVariantIds.length - 1);
                        $.cookies.set("ItemCompareDetail", ds);
                        $.cookies.set("showCompareList", 'true');
                        $.cookies.set("costVariant", variant);
                        window.location.href = aspxRedirectPath + compareItemListURL + pageExtension;
                    } else {
                        csscody.alert("<h2>" + getLocale(AspxItemsCompare, "Information Alert") + "</h2><p>" + getLocale(AspxItemsCompare, "You must have more than one item to compare!") + "</p>");

                    }
                });
                $(".cssCompareBtnShow").live('click', function() {
                    $("#compareProductsContainer").show();
                    $(".cssCompareBtnWrapper").hide();
                });
                $('#btnCompareClearAll').click(function() {
                    ItemsCompare.ClearAll();
                });

                //                var location = $('#compareProductsContainer').position().top;
                //                $(window).scroll(function() {
                //                    if (location >= $(window).scrollTop()) {
                //                        if ($('#compareProductsContainer').hasClass('fixed')) {
                //                            $('#compareProductsContainer').removeClass('fixed');
                //                        }
                //                    } else {
                //                        if (!$('#compareProductsContainer').hasClass('fixed')) {
                //                            $('#compareProductsContainer').addClass('fixed');
                //                        }
                //                    }
                //                });
            }
        }
    };
    ItemsCompare.Init();
});