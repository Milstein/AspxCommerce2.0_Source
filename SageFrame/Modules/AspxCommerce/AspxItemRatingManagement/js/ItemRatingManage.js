var ItemRatingManage = "";

$(function() {
    var userName = AspxCommerce.utils.GetUserName();
    var userIP = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var itemRatingMgmtFlag = 0;
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetCultureName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    ItemRatingManage = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: "json",
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            url: "",
            method: ""
        },
        vars: {
            ratingValues: '',
            editVal: false
        },
        LoadItemReviewRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#itemReviewRssImage').parent('a').show();
            $('#itemReviewRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=newitemreview');
            $('#itemReviewRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#itemReviewRssImage').removeAttr('title').attr('title', 'New Items Review Rss Feed');
            $('#itemReviewRssImage').removeAttr('alt').attr('alt', 'New Items Review Rss Feed');
        },
        init: function() {
            ItemRatingManage.LoadItemRatingStaticImage();
            ItemRatingManage.BindAllReviewsAndRatingsGrid(null, null, null);
            ItemRatingManage.ShowGridTable();
            ItemRatingManage.GetStatusList();
            ItemRatingManage.GetAllItemsList();
            ItemRatingManage.BindRatingCriteria();
            ItemRatingManage.BindUserList();
            ItemRatingManage.vars.editVal = false;
            if (newItemReviewRss.toLowerCase() == 'true') {
                ItemRatingManage.LoadItemReviewRssImage();
            }
            $('#btnDeleteSelected').click(function() {
                var itemReview_ids = '';
                //Get the multiple Ids of the item selected
                $(".itemRatingChkbox").each(function(i) {
                    if ($(this).attr("checked")) {
                        itemReview_ids += $(this).val() + ',';
                    }
                });
                if (itemReview_ids != "") {
                    var properties = {
                        onComplete: function(e) {
                            ItemRatingManage.ConfirmDeleteMultipleItemRating(itemReview_ids, e);
                        }
                    };
                    csscody.confirm("<h2>" + getLocale(AspxItemRatingManagement, 'Delete Confirmation') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Are you sure you want delete the selected review ant rating(s)?') + "</p>", properties);
                } else {
                    csscody.alert('<h2>' + getLocale(AspxItemRatingManagement, 'Information Alert') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Please select at least one review and rating before delete.') + '</p>');
                }
            });
            $("#btnReviewBack").click(function() {
                ItemRatingManage.ShowGridTable();
            });
            $("#btnDeleteReview").click(function() {
                var review_id = $(this).attr("name");
                var properties = {
                    onComplete: function(e) {
                        if (e) {
                            ItemRatingManage.ConfirmSingleDeleteItemReview(review_id, e);
                        } else {
                            return false;
                        }
                    }
                };
                csscody.confirm("<h2>" + getLocale(AspxItemRatingManagement, 'Delete Confirmation') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Are you sure you want to delete this review and rating?') + "</p>", properties);
            });

            var v = $("#form1").validate({
                rules: {
                    name: {
                        minlength: 2,
                        maxlength: 20
                    },
                    summary: {
                        minlength: 2
                    },
                    review: "required"
                },
                messages: {
                    name: {
                        required: "*",
                        minlength: "(at least 2 chars)",
                        maxlength: "(at most 20 chars)"
                    },
                    summary: {
                        required: "*",
                        minlength: "(at least 2 chars)"
                    },
                    review: "*"
                }
            });
            $("#btnSubmitReview").click(function() {
                if (ItemRatingManage.vars.editVal == false) {
                    if (($('#selectItemList option:selected').val() != 0) && ($('#selectUserName option:selected').val() != 0)) {
                        if (v.form()) {
                            ItemRatingManage.SaveItemRatings();
                            return false;
                        } else {
                            return false;
                        }
                    } else {
                        if (($('#selectItemList option:selected').val() == 0)) {
                            $('#selectItemList').attr('class', 'sfListmenu error');
                        }
                        if (($('#selectUserName option:selected').val() == 0)) {
                            $('#selectUserName').attr('class', 'sfListmenu error');
                        }
                        return false;
                    }
                } else {
                    if (v.form()) {
                        ItemRatingManage.SaveItemRatings();
                        return false;
                    } else {
                        return false;
                    }
                }
            });
            $("#btnReset").click(function() {
                ItemRatingManage.ClearReviewForm();
            });
            $("#btnAddNewReview").click(function() {
                ItemRatingManage.vars.editVal = false;
                ItemRatingManage.BindStarRatingsDetails();
                ItemRatingManage.ClearReviewForm();
                ItemRatingManage.HideAll();
                $("#" + lblReviewsFromHeading).html("Add New Rating & Review");
                $("#trUserList").show();
                $("#lnkItemName").hide();
                $("#selectItemList").show();
                $("#trPostedBy").hide();
                $("#trViewedIP").hide();
                $("#trSummaryRating").hide();
                $("#trAddedOn").hide();
                $('#selectStatus').val('2');
                $("#btnDeleteReview").attr("name", 0);
                $("#btnReset").show();
                $("#btnDeleteReview").hide();
                $("#divItemRatingForm").show();
                $("#ddlItemName>option").remove();
            });
            $("#selectItemList").change(function() {
                $("#lnkItemName").attr("name", $(this).val());
                $('#selectItemList').removeClass('error');
            });
            $("#selectUserName").change(function() {
                $('#selectUserName').removeClass('error');
            });
            $('#txtSearchUserName,#ddlStatus,#txtSearchItemNme').keyup(function(event) {
                if (event.keyCode == 13) {
                    ItemRatingManage.SearchItemRatings();
                }
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: ItemRatingManage.config.type,
                contentType: ItemRatingManage.config.contentType,
                cache: ItemRatingManage.config.cache,
                async: ItemRatingManage.config.async,
                data: ItemRatingManage.config.data,
                dataType: ItemRatingManage.config.dataType,
                url: ItemRatingManage.config.url,
                success: ItemRatingManage.ajaxSuccess,
                error: ItemRatingManage.ajaxFailure
            });
        },
        LoadItemRatingStaticImage: function() {
            $('#ajaxItemRatingMgmtImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },
        ShowGridTable: function() {
            ItemRatingManage.HideAll();
            $("#divShowItemRatingDetails").show();
        },
        BindUserList: function() {
            var IsAll = true;
            this.config.url = this.config.baseURL + "GetUserList";
            this.config.data = JSON2.stringify({ portalID: aspxCommonObj.PortalID });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        BindAllReviewsAndRatingsGrid: function(searchUserName, status, SearchItemName) {
            var userRatingObj = {
                UserName: searchUserName,
                Status: status,
                ItemName: SearchItemName
            };
            this.config.method = "GetAllUserReviewsAndRatings";
            this.config.data = { userRatingObj: userRatingObj, aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvReviewsNRatings_pagesize").length > 0) ? $("#gdvReviewsNRatings_pagesize :selected").text() : 10;

            $("#gdvReviewsNRatings").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxItemRatingManagement, 'ItemReviewID'), name: 'itemreview_id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'itemRatingChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                    { display: getLocale(AspxItemRatingManagement, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Nick Name'), name: 'user_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'Total Rating Average'), name: 'total_rating_average', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'View From IP'), name: 'view_from_IP', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'Summary Of Review'), name: 'review_summary', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Review'), name: 'review', cssclass: 'cssClassHeadCheckBox', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Status'), name: 'status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Added By'), name: 'AddedBy', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Status ID'), name: 'status_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Item SKU'), name: 'item_SKU', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                    { display: getLocale(AspxItemRatingManagement, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'ItemRatingManage.EditUserReviewsAndRatings', arguments: '1,2,3,4,5,6,7,8,9,10,11,12' },
                    { display: getLocale(AspxItemRatingManagement, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'ItemRatingManage.DeleteUserReviewsAndRatings', arguments: '' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemRatingManagement, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 1: { sorter: false }, 13: { sorter: false } }
            });
        },
        EditUserReviewsAndRatings: function(tblID, argus) {
            switch (tblID) {
            case "gdvReviewsNRatings":
                ItemRatingManage.vars.editVal = true;
                ItemRatingManage.ClearReviewForm();
                ItemRatingManage.BindItemReviewDetails(argus);
                ItemRatingManage.BindRatingSummary(argus[0]);
                ItemRatingManage.HideAll();
                $("#divItemRatingForm").show();
                $("#hdnItemReview").val(argus[0]);
                $("#trUserList").hide();
                break;
            default:
                break;
            }
        },
        BindItemReviewDetails: function(argus) {
            $("#btnDeleteReview").attr("name", argus[0]);
            $("#" + lblReviewsFromHeading).html(getLocale(AspxItemRatingManagement, "Edit item's Rating & Review"));
            $("#lnkItemName").html(argus[10]);
            $("#lnkItemName").attr("href", aspxRedirectPath + "item/" + argus[14] + pageExtension);
            $("#lnkItemName").attr("name", argus[3]);
            $("#lblPostedBy").html(argus[12]);
            $("#lblViewFromIP").html(argus[6]);
            $("#txtNickName").val(argus[4]);
            $("#lblAddedOn").html(argus[11]);
            $("#txtSummaryReview").val(argus[7]);
            $("#txtReview").val(argus[8]);
            $("#selectStatus").val(argus[13]);
            $("#lnkItemName").show();
            $("#selectItemList").hide();
            $("#trPostedBy").show();
            $("#trViewedIP").show();
            $("#trSummaryRating").show();
            $("#trAddedOn").show();
            $("#btnReset").hide();
            $("#btnDeleteReview").show();
        },
        BindRatingSummary: function(review_id) {
            this.config.url = this.config.baseURL + "GetItemRatingByReviewID";
            this.config.data = JSON2.stringify({ itemReviewID: review_id, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        BindStarRatingsDetails: function() {
            $.metadata.setType("attr", "validate");
            $('.auto-submit-star').rating({
                required: true,
                focus: function(value, link) {
                    var ratingCriteria_id = $(this).attr("name").replace( /[^0-9]/gi , '');
                    var tip = $('#hover-test' + ratingCriteria_id);
                    tip[0].data = tip[0].data || tip.html();
                    tip.html(link.title || 'value: ' + value);
                    $("#tblRatingCriteria label.error").hide();
                },
                blur: function(value, link) {
                    var ratingCriteria_id = $(this).attr("name").replace( /[^0-9]/gi , '');
                    var tip = $('#hover-test' + ratingCriteria_id);
                    tip.html(tip[0].data || '');
                    $("#tblRatingCriteria label.error").hide();
                },

                callback: function(value, event) {
                    var ratingCriteria_id = $(this).attr("name").replace( /[^0-9]/gi , '');
                    var starRatingValues = $(this).attr("value");
                    var len = ratingCriteria_id.length;
                    var isAppend = true;
                    if (ItemRatingManage.vars.ratingValues != '') {
                        var stringSplit = ItemRatingManage.vars.ratingValues.split('#');
                        $.each(stringSplit, function(index, item) {
                            if (item.substring(0, item.indexOf('-')) == ratingCriteria_id) {
                                var index = ItemRatingManage.vars.ratingValues.indexOf(ratingCriteria_id + "-");
                                var toReplace = ItemRatingManage.vars.ratingValues.substr(index, 2 + len);
                                ItemRatingManage.vars.ratingValues = ItemRatingManage.vars.ratingValues.replace(toReplace, ratingCriteria_id + "-" + value);
                                isAppend = false;
                            }
                        });
                        if (isAppend) {
                            ItemRatingManage.vars.ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                        }
                    } else {
                        ItemRatingManage.vars.ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                    }
                }
            });
        },
        BindStarRatingAverage: function(itemAvgRating) {
            $("#divAverageRating").html('');
            var ratingStars = '';
            var ratingTitle = ["Worst", "Ugly", "Bad", "Not Bad", "Average", "OK", "Nice", "Good", "Best", "Excellent"]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            ratingStars += '<div class="cssClassToolTip">';
            for (i = 0; i < 10; i++) {
                if (itemAvgRating == ratingText[i]) {
                    ratingStars += '<input name="avgItemRating" type="radio" class="auto-star-avg {split:2}" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                    $(".cssClassRatingTitle").html(ratingTitle[i]);
                } else {
                    ratingStars += '<input name="avgItemRating" type="radio" class="auto-star-avg {split:2}" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            ratingStars += '</div>';
            $("#divAverageRating").append(ratingStars);
        },
        DeleteUserReviewsAndRatings: function(tblID, argus) {
            switch (tblID) {
            case "gdvReviewsNRatings":
                var properties = {
                    onComplete: function(e) {
                        ItemRatingManage.ConfirmSingleDeleteItemReview(argus[0], e);
                    }
                };
                csscody.confirm("<h2>" + getLocale(AspxItemRatingManagement, 'Delete Confirmation') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Are you sure you want to delete this review and rating?') + "</p>", properties);
                break;
            default:
                break;
            }
        },
        ConfirmSingleDeleteItemReview: function(itemReviewID, event) {
            if (event) {
                this.config.url = this.config.baseURL + "DeleteSingleItemRating";
                this.config.data = JSON2.stringify({ itemReviewID: itemReviewID, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = 3;
                this.ajaxCall(this.config);
            }
        },
        ConfirmDeleteMultipleItemRating: function(itemReview_ids, event) {
            if (event) {
                ItemRatingManage.DeleteMultipleItemRating(itemReview_ids);
            }
        },
        DeleteMultipleItemRating: function(_itemReviewIds) {
            this.config.url = this.config.baseURL + "DeleteMultipleItemRatings";
            this.config.data = JSON2.stringify({ itemReviewIDs: _itemReviewIds, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 4;
            this.ajaxCall(this.config);
            return false;
        },
        HideAll: function() {
            $("#divShowItemRatingDetails").hide();
            $("#divItemRatingForm").hide();
        },
        GetStatusList: function() {
            this.config.url = this.config.baseURL + "GetStatus";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
        },
        BindRatingCriteria: function() {
            this.config.url = this.config.baseURL + "GetItemRatingCriteria";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, isFlag: false });
            this.config.ajaxCallMode = 6;
            this.ajaxCall(this.config);
        },
        RatingCriteria: function(item) {
            var ratingCriteria = '';
            ratingCriteria += '<tr><td class="cssClassRatingTitleName"><label class="cssClassLabel">' + item.ItemRatingCriteria + ':<span class="cssClassRequired">*</span></label></td><td>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="1" title="Worst" validate="required:true" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="2" title="Bad" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="3" title="OK" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="4" title="Good" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="5" title="Best" />';
            ratingCriteria += '<span id="hover-test' + item.ItemRatingCriteriaID + '"></span>';
            ratingCriteria += '<label for="star' + item.ItemRatingCriteriaID + '" class="error">Please rate for ' + item.ItemRatingCriteria + '</label></tr></td>';
            $("#tblRatingCriteria").append(ratingCriteria);
        },
        SaveItemRatings: function() {
            var statusId = $("#selectStatus").val();
            var ratingValue = ItemRatingManage.vars.ratingValues;
            var nickName = $("#txtNickName").val();
            var summaryReview = $("#txtSummaryReview").val();
            var review = $("#txtReview").val();
            //var itemId = $("#selectItemList").val();
            var itemId = $("#lnkItemName").attr("name");
            var itemReviewID = $("#btnDeleteReview").attr("name");
            var User = $("#selectUserName option:selected").text();
            var itemReviewId = $("#hdnItemReview").val();
            itemRatingMgmtFlag = itemReviewId;
            var param = '';
            var ratingManageObj = {
                ItemReviewID: itemReviewID,
                ViewFromIP: userIP,
                viewFromCountry: countryName,
                UserName: nickName,
                ReviewSummary: summaryReview,
                Review: review,
                ItemRatingCriteria: ratingValue,
                ItemID: itemId,
                StatusID: statusId
            };
            if (itemReviewId != 0) {
                aspxCommonObj.UserName = userName;
                param = JSON2.stringify({ ratingManageObj: ratingManageObj, aspxCommonObj: aspxCommonObj });
            } else {
                aspxCommonObj.UserName = User;
                param = JSON2.stringify({ ratingManageObj: ratingManageObj, aspxCommonObj: aspxCommonObj });
            }
            this.config.url = this.config.baseURL + "UpdateItemRating";
            this.config.data = param;
            this.config.ajaxCallMode = 7;
            this.ajaxCall(this.config);
        },

        ClearReviewForm: function() {
            //Clear all Stars checked      
            $('.auto-submit-star').rating('drain');
            $('.auto-submit-star').removeAttr('checked');
            $('.auto-submit-star').rating('select', -1);
            $("#txtNickName").val('');
            $("#txtSummaryReview").val('');
            $("#txtReview").val('');
            $("label.error").hide();
            $('#selectStatus').val('2');
            $('#txtNickName').removeClass('error');
            $('#txtNickName').parents('td').find('label').remove();
            $('#txtSummaryReview').removeClass('error');
            $('#txtSummaryReview').parents('td').find('label').remove();
            $('#txtReview').removeClass('error');
            $('#txtReview').parents('td').find('label').remove();
            $('#selectItemList').removeClass('error');
            $('#selectUserName').removeClass('error');
            $('#selectItemList').parents('td').find('label').remove();
            $('#selectItemList').val(0);
            $('#selectUserName').val(0);
        },
        GetAllItemsList: function() {
            this.config.url = this.config.baseURL + "GetAllItemList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 8;
            this.ajaxCall(this.config);
        },
        SearchItemRatings: function() {
            var searchUserName = $.trim($("#txtSearchUserName").val());
            var status = '';
            if (searchUserName.length < 1) {
                searchUserName = null;
            }
            if ($.trim($("#ddlStatus").val()) != 0) {
                status = $("#ddlStatus option:selected").val();
            } else {
                status = null;
            }
            var SearchItemName = $.trim($("#txtSearchItemNme").val());
            if (SearchItemName.length < 1) {
                SearchItemName = null;
            }
            ItemRatingManage.BindAllReviewsAndRatingsGrid(searchUserName, status, SearchItemName);
        },
        ajaxSuccess: function(data) {
            switch (ItemRatingManage.config.ajaxCallMode) {
            case 0:
                break;
            case 1:
                $.each(data.d, function(index, item) {
                    $("#selectUserName").append("<option value=" + item.UserId + ">" + item.UserName + "</option>");
                });
                break;
            case 2:
                var itemAvgRating = '';
                $.each(data.d, function(index, item) {
                    if (index == 0) {
                        ItemRatingManage.BindStarRatingsDetails();
                        ItemRatingManage.BindStarRatingAverage(item.RatingAverage);
                        itemRatingAverage = item.RatingAverage;
                    }
                    itemAvgRating = JSON2.stringify(item.RatingValue);
                    $('input.item-rating-crieteria' + item.ItemRatingCriteriaID).rating('select', itemAvgRating);
                });
                $.metadata.setType("class");
                $('input.auto-star-avg').rating();
                break;
            case 3:
                ItemRatingManage.BindAllReviewsAndRatingsGrid(null, null, null);
                csscody.info('<h2>' + getLocale(AspxItemRatingManagement, 'Successful Message') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Item review and rating has been deleted successfully.') + '</p>');
                ItemRatingManage.ShowGridTable();
                break;
            case 4:
                ItemRatingManage.BindAllReviewsAndRatingsGrid(null, null, null);
                csscody.info('<h2>' + getLocale(AspxItemRatingManagement, 'Successful Message') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Selected item review and rating(s) has been deleted successfully.') + '</p>');
                break;
            case 5:
                $.each(data.d, function(index, item) {
                    $("#selectStatus").append("<option value=" + item.StatusID + ">" + item.Status + "</option>");
                    $("#ddlStatus").append("<option value=" + item.StatusID + ">" + item.Status + "</option>");
                });
                $('#selectStatus').val('2');
                break;
            case 6:
                $("#tblRatingCriteria").html('');
                if (data.d.length > 0) {
                    $.each(data.d, function(index, item) {
                        ItemRatingManage.RatingCriteria(item);
                    });
                } else {
                    csscody.alert("<h2>" + getLocale(AspxItemRatingManagement, 'Information Alert') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Sorry! no rating criteria found.') + "</p>");
                }
                break;
            case 7:
                if (itemRatingMgmtFlag > 0) {
                    csscody.info('<h2>' + getLocale(AspxItemRatingManagement, 'Successful Message') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Item review and rating has been updated successfully.') + '</p>');
                } else {
                    csscody.info('<h2>' + getLocale(AspxItemRatingManagement, 'Successful Message') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Your review has been saved successfully.') + '</p>');
                }
                ItemRatingManage.BindAllReviewsAndRatingsGrid(null, null, null);
                ItemRatingManage.ClearReviewForm();
                ItemRatingManage.ShowGridTable();
                ItemRatingManage.BindRatingCriteria();
                break;
            case 8:
                $.each(data.d, function(index, item) {
                    $("#selectItemList").append("<option value=" + item.ItemID + ">" + item.ItemName + "</option>");
                });
                $("#lnkItemName").attr("name", $("#selectItemList").val());
                break;
            }
        }
    };
    ItemRatingManage.init();
});