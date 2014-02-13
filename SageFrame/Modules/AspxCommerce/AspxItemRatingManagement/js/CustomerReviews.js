var CustomerReviews = "";
$(function() {
    var userName = AspxCommerce.utils.GetUserName();

    var customerReviewerName = '';
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: userName,
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    var customerReviewObj = {
        UserName: null,
        Status: null,
        ItemName: null
    };
    CustomerReviews = {
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
        init: function() {
            CustomerReviews.BindCustomerReviews();
            CustomerReviews.GetStatusList();
            $('#btnDeleteReview').hide();
            CustomerReviews.HideDiv();
            $("#divCustomerReviews").show();
            $("#btnBackCustomerReviews").click(function() {
                CustomerReviews.HideDiv();
                $("#divCustomerReviews").show();
            });
            $("#btnReviewBack").click(function() {
                CustomerReviews.HideDiv();
                $("#divShowCustomerReviewList").show();
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: CustomerReviews.config.type,
                contentType: CustomerReviews.config.contentType,
                cache: CustomerReviews.config.cache,
                async: CustomerReviews.config.async,
                data: CustomerReviews.config.data,
                dataType: CustomerReviews.config.dataType,
                url: CustomerReviews.config.url,
                success: CustomerReviews.ajaxSuccess,
                error: CustomerReviews.ajaxFailure
            });
        },

        HideDiv: function() {
            $("#divCustomerReviews").hide();
            $("#divShowCustomerReviewList").hide();
            $("#divCustomerItemRatingForm").hide();
        },
        GetCustomerReviewDataForExport: function() {
            aspxCommonObj.UserName = userName;
            this.config.url = this.config.baseURL + "GetCustomerReviews";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 4;
            this.ajaxCall(this.config);
        },
        BindCustomerReviewsExportData: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxItemRatingManagement, 'Customer Name') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Number Of Reviews') + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.AddedBy + '</td>';
                    exportData += '<td>' + value.NumberOfReviews + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxItemRatingManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';

            $('#CustomerReviewExportDataTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvCustomerReviewHiddenValue']").val($("#CustomerReviewExportDataTbl").table2CSV());
            $("#CustomerReviewExportDataTbl").html('');
        },
        BindCustomerReviews: function() {
            aspxCommonObj.UserName = userName;
            this.config.method = "GetCustomerReviews";
            this.config.data = { aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvCustomerReviews_pagesize").length > 0) ? $("#gdvCustomerReviews_pagesize :selected").text() : 10;

            $("#gdvCustomerReviews").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxItemRatingManagement, 'Customer Name'), name: 'user_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Number Of Reviews'), name: 'number_of_reviews', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                    { display: getLocale(AspxItemRatingManagement, 'View'), name: 'showReviews', enable: true, _event: 'click', trigger: '1', callMethod: 'CustomerReviews.ShowCustomerReviewsList', arguments: '1,' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemRatingManagement, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 2: { sorter: false } }
            });
        },
        ExportCustomerReviewToCsvData: function() {
            CustomerReviews.GetCustomerReviewDataForExport();
        },
        ExportDivDataToExcel: function() {
            CustomerReviews.GetCustomerReviewDataForExport();
        },

        ShowCustomerReviewsList: function(tblID, argus) {
            switch (tblID) {
            case "gdvCustomerReviews":
                $("#" + lblCRHeading).html(getLocale(AspxItemRatingManagement, "All Reviews Of ") + argus[0]);
                customerReviewerName = argus[0];
                CustomerReviews.BindShowCustomerReviewsList(argus[0], null, null, null);
                CustomerReviews.HideDiv();
                $("#divShowCustomerReviewList").show();
                break;
            }
        },
        GetCustomerReviewDetailListForExport: function() {
            customerReviewObj.UserName = null;
            customerReviewObj.Status = null;
            customerReviewObj.ItemName = null;
            aspxCommonObj.UserName = customerReviewerName;
            this.config.url = this.config.baseURL + "GetAllCustomerReviewsList";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, customerReviewObj: customerReviewObj, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
        },
        BindShowCustomreReviewExportData: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxItemRatingManagement, 'Nick Name') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Total Rating Average') + '</th><th>' + getLocale(AspxItemRatingManagement, 'View From IP') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Review Summary') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Status') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Item Name') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Added On') + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.Username + '</td><td>' + value.TotalRatingAverage + '</td>';
                    exportData += '<td>' + value.ViewFromIP + '</td><td>' + value.ReviewSummary + '</td>';
                    exportData += '<td>' + value.Status + '</td><td>' + value.ItemName + '</td>';
                    exportData += '</td><td>' + value.AddedOn + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxItemRatingManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';

            $('#ShowCustomerReviewListExportTbl').html(exportData);
            $("input[id$='HdnReviews']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvCustomerReviewDetailValue']").val($("#ShowCustomerReviewListExportTbl").table2CSV());
            $("#ShowCustomerReviewListExportTbl").html('');
        },
        BindShowCustomerReviewsList: function(UserName, searchUserName, status, SearchItemName) {
            aspxCommonObj.UserName = UserName;
            customerReviewObj.UserName = searchUserName;
            customerReviewObj.Status = status;
            customerReviewObj.ItemName = SearchItemName;
            this.config.method = "GetAllCustomerReviewsList";
            this.config.data = { customerReviewObj: customerReviewObj, aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            $("#hdnUser").val(UserName);
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvShowCustomerReviewList_pagesize").length > 0) ? $("#gdvShowCustomerReviewList_pagesize :selected").text() : 10;

            $("#gdvShowCustomerReviewList").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'ItemReviewID', name: 'itemreview_id', cssclass: 'cssClassHide', align: 'center', elemClass: 'customerReviewChkbox', hide: true },
                    { display: 'Item ID', name: 'item_id', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Nick Name'), name: 'user_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'Total Rating Average'), name: 'total_rating_average', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'View From IP'), name: 'view_from_IP', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'Review Summary'), name: 'review_summary', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Review'), name: 'review', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Status'), name: 'status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Added By'), name: 'AddedBy', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Status ID', name: 'status_id', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Item SKU', name: 'item_SKU', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                    { display: getLocale(AspxItemRatingManagement, 'View'), name: 'view', enable: true, _event: 'click', trigger: '1', callMethod: 'CustomerReviews.ViewUserReviewsAndRatings', arguments: '1,2,3,4,5,6,7,8,9,10,11,12' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemRatingManagement, "No Records Found!"),
                param: data, // { user: searchUserName, statusName: status, itemName: SearchItemName, storeID: storeId, portalID: portalId, cultureName: cultureName, userName: UserName },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 1: { sorter: false }, 13: { sorter: false } }
            });
        },

        ViewUserReviewsAndRatings: function(tblID, argus) {
            switch (tblID) {
            case "gdvShowCustomerReviewList":
                CustomerReviews.BindItemReviewDetails(argus);
                CustomerReviews.BindRatingCriteria(argus[0]);
                CustomerReviews.BindRatingSummary(argus[0]);
                CustomerReviews.HideDiv();
                $("#divCustomerItemRatingForm").show();
                $("#hdnItemReviewID").val(argus[0]);
                break;
            default:
                break;
            }
        },
        BindRatingCriteria: function(reviewID) {
            aspxCommonObj.UserName = userName;
            this.config.url = this.config.baseURL + "GetItemRatingCriteriaByReviewID";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, itemReviewID: reviewID, isFlag: false });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        RatingCriteria: function(item) {
            var ratingCriteria = '';
            ratingCriteria += '<tr><td class="cssClassRatingTitleName"><label class="cssClassLabel">' + item.ItemRatingCriteria + ':</label></td><td>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="1" title="Worst" validate="required:true" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="2" title="Bad" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="3" title="OK" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="4" title="Good" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="5" title="Best" />';
            ratingCriteria += '<span id="hover-test' + item.ItemRatingCriteriaID + '"></span>';
            ratingCriteria += '<label for="star' + item.ItemRatingCriteriaID + '" class="error">Please rate for ' + item.ItemRatingCriteria + '</label></tr></td>';
            $("#tblRatingCriteria").append(ratingCriteria);
        },
        GetStatusList: function() {
            this.config.url = this.config.baseURL + "GetStatus";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        BindItemReviewDetails: function(argus) {
            $("#" + lblReviewsFromHeading).html("Review: '" + argus[7] + "'");
            $("#lnkItemNames").html(argus[10]);
            $("#lnkItemNames").attr("name", argus[3]);
            $("#lblPostedBy").html(argus[12]);
            $("#lblViewFromIP").html(argus[6]);
            $("#txtNickName").val(argus[4]);
            $("#lblAddedOn").html(argus[11]);
            $("#txtSummaryReview").val(argus[7]);
            $("#txtReview").val(argus[8]);
            $("#selectStatus").val(argus[13]);

            $("#txtNickName").attr('disabled', 'disabled');
            $("#txtSummaryReview").attr('disabled', 'disabled');
            $("#txtReview").attr('disabled', 'disabled');
            $("#selectStatus").attr('disabled', 'disabled');
        },
        BindRatingSummary: function(review_id) {
            aspxCommonObj.UserName = userName;
            this.config.url = this.config.baseURL + "GetItemRatingByReviewID";
            this.config.data = JSON2.stringify({ itemReviewID: review_id, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 3;
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
                    var ratingValues = '';
                    var ratingCriteria_id = $(this).attr("name").replace( /[^0-9]/gi , '');
                    var starRatingValues = $(this).attr("value");
                    var len = ratingCriteria_id.length;
                    var isAppend = true;
                    if (ratingValues != '') {
                        var stringSplit = ratingValues.split('#');
                        $.each(stringSplit, function(index, item) {
                            if (item.substring(0, item.indexOf('-')) == ratingCriteria_id) {
                                var index = ratingValues.indexOf(ratingCriteria_id + "-");
                                var toReplace = ratingValues.substr(index, 2 + len);
                                ratingValues = ratingValues.replace(toReplace, ratingCriteria_id + "-" + value);
                                isAppend = false;
                            }
                        });
                        if (isAppend) {
                            ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                        }
                    } else {
                        ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
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
        ExportCustomerReviewDetailToCsvData: function() {
            CustomerReviews.GetCustomerReviewDetailListForExport();
        },
        ExportDataToExcel: function() {
            CustomerReviews.GetCustomerReviewDetailListForExport();
        },
        SearchItemRatings: function() {
            var user = $("#hdnUser").val();
            var searchUserName = $.trim($("#txtSearchUserName").val());
            var status = '';
            if (searchUserName.length < 1) {
                searchUserName = null;
            }
            if ($.trim($("#ddlStatus").val()) != 0) {
                status = $("#ddlStatus option:selected").text();
            } else {
                status = null;
            }
            var SearchItemName = $.trim($("#txtsearchItemNm").val());
            if (SearchItemName.length < 1) {
                SearchItemName = null;
            }
            CustomerReviews.BindShowCustomerReviewsList(user, searchUserName, status, SearchItemName);
        },
        ajaxSuccess: function(data) {
            switch (CustomerReviews.config.ajaxCallMode) {
            case 0:
                break;
            case 1:
                $("#tblRatingCriteria").html('');
                if (data.d.length > 0) {
                    $.each(data.d, function(index, item) {
                        CustomerReviews.RatingCriteria(item);
                    });
                } else {
                    csscody.alert("<h2>" + getLocale(AspxItemRatingManagement, 'Information Alert') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Sorry! no rating criteria found.') + "</p>");
                }
                break;
            case 2:
                $.each(data.d, function(index, item) {
                    $("#selectStatus").append("<option value=" + item.StatusID + ">" + item.Status + "</option>");
                    $("#ddlStatus").append("<option value=" + item.StatusID + ">" + item.Status + "</option>");
                });
                $('#selectStatus').val('2');
                break;
            case 3:
                $("#tblRatingCriteria label.error").hide();
                var itemAvgRating = '';
                $.each(data.d, function(index, item) {
                    if (index == 0) {
                        CustomerReviews.BindStarRatingsDetails();
                        CustomerReviews.BindStarRatingAverage(item.RatingAverage);
                        itemRatingAverage = item.RatingAverage;
                    }
                    itemAvgRating = JSON2.stringify(item.RatingValue);
                    $('input.item-rating-crieteria' + item.ItemRatingCriteriaID).rating('select', itemAvgRating);
                    $('input.item-rating-crieteria' + item.ItemRatingCriteriaID).rating('disable');
                });
                $.metadata.setType("class");
                $('input.auto-star-avg').rating();
                break;
            case 4:
                CustomerReviews.BindCustomerReviewsExportData(data);
                break;
            case 5:
                CustomerReviews.BindShowCustomreReviewExportData(data);
                break;
            }
        }
    };
    CustomerReviews.init();
});