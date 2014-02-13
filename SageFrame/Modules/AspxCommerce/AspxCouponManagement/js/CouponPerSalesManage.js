var couponPerSalesMgmt;
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
    var couponPerSaleDetailFlag = false;
    var searchCouponCode = '';
    couponPerSalesMgmt = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            method: "",
            url: "",
            ajaxCallMode: 0
        },
        ajaxCall: function() {
            $.ajax({
                type: couponPerSalesMgmt.config.type,
                contentType: couponPerSalesMgmt.config.contentType,
                cache: couponPerSalesMgmt.config.cache,
                async: couponPerSalesMgmt.config.async,
                url: couponPerSalesMgmt.config.url,
                data: couponPerSalesMgmt.config.data,
                dataType: couponPerSalesMgmt.config.dataType,
                success: couponPerSalesMgmt.ajaxSuccess,
                error: couponPerSalesMgmt.ajaxFailure
            });
        },
        GetCouponPerSalesDataForExport: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.CultureName = null;
            this.config.url = this.config.baseURL + "GetCouponDetailsPerSales";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, couponCode: null, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        BindCouponPerSalesExportData: function(data) {
            var exportData = '<thead><tr><th>Coupon Code</th><th>'+getLocale(AspxCouponManagement, "Number Of Uses")+'</th><th>'+getLocale(AspxCouponManagement, "Total Discount Amount Gained By Coupon")+'</th><th>'+getLocale(AspxCouponManagement, "Total Sales Amount")+'</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.CouponCode + '</td><td>' + value.UseCount + '</td>';
                    exportData += '<td>' + curSymbol + ' ' + value.TotalAmountDiscountedbyCoupon + '</td><td>' + curSymbol + ' ' + value.TotalSalesAmount + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>'+getLocale(AspxCouponManagement, "No Records Found!")+'</td></tr>';
            }
            exportData += '</tbody>';
            $('#CouponPerSalesExportDataTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvCouponPerSalesHiddenValue']").val($('#CouponPerSalesExportDataTbl').table2CSV());
            $('#CouponPerSalesExportDataTbl').html('');
        },
        GetCouponPerSalesExportDataDetail: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            var couponPerSalesGetObj = {
                CouponCode: searchCouponCode,
                OrderID: null,
                CouponAmountFrom: null,
                CouponAmountTo: null,
                GrandTotalAmountFrom: null,
                GrandTotalAmountTo: null
            };
            this.config.url = this.config.baseURL + "GetCouponPerSalesDetailView";
            this.config.data = JSON2.stringify({
                offset: 1,
                limit: null,
                couponPerSaesObj: couponPerSalesGetObj,
                aspxCommonObj: aspxCommonInfo
            });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        DateDeserialize: function(content, format) {
            content = eval('new ' + content.replace( /[/]/gi , ''));
            return formatDate(content, format);
        },
        BindCouponPerSalsesExportDataDetail: function(data) {
            var exportData = '<thead><tr><th>'+getLocale(AspxCouponManagement, "Coupon Code")+'</th><th>Order ID</th><th>'+getLocale(AspxCouponManagement, "User Name")+'</th><th>'+getLocale(AspxCouponManagement, "Coupon Discount Amount")+'</th><th>'+getLocale(AspxCouponManagement, "Grand Total")+'</th><th>' + getLocale(AspxCouponManagement, "No Of Use")+'</th><th>' + getLocale(AspxCouponManagement, "Order Date")+'</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.CouponCode + '</td><td>' + value.OrderID + '</td><td>' + value.UserName + '</td>';
                    exportData += '<td>' + curSymbol + ' ' + value.CouponDiscountAmount + '</td><td>' + curSymbol + ' ' + value.GrandTotal + '</td>';
                    exportData += '<td>' + value.NoOfUse + '</td><td>' + couponPerSalesMgmt.DateDeserialize(value.OrderDate, "yyyy/MM/dd") + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>'+getLocale(AspxCouponManagement, "No Records Found!")+'</td></tr>';
            }
            exportData += '</tbody>';
            $('#CouponPerSalesExportDataTblDetail').html(exportData);
            $("input[id$='HdnValueDetail']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvCouponPerSalesHiddenValueDetail']").val($('#CouponPerSalesExportDataTblDetail').table2CSV());
            $('#CouponPerSalesExportDataTblDetail').html('');
        },
        BindAllCouponPerSalesList: function(SearchCouponCode) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.CultureName = null;
            this.config.method = "GetCouponDetailsPerSales";
            this.config.url = this.config.baseURL;
            this.config.data = { couponCode: SearchCouponCode, aspxCommonObj: aspxCommonInfo };
            var data = this.config.data;

            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvCouponPerSales_pagesize").length > 0) ? $("#gdvCouponPerSales_pagesize :selected").text() : 10;

            $("#gdvCouponPerSales").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxCouponManagement, "Coupon Code"), name: 'coupon_code', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxCouponManagement, "Number Of Uses As Order"), name: 'number_of_uses', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxCouponManagement, "Total Discount Amount Gained By Coupon"), name: 'discount_amount', cssclass: 'cssClassHeadNumber', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxCouponManagement, "Total Sales Amount"), name: 'sales_amount', cssclass: 'cssClassHeadNumber', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxCouponManagement, "Actions"), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                    { display: getLocale(AspxCouponManagement, "View"), name: 'view', enable: true, _event: 'click', trigger: '3', callMethod: 'couponPerSalesMgmt.ViewCouponPerSalesDetails' }
                ],

                rp: perpage,
                nomsg: getLocale(AspxCouponManagement, "No Records Found!"),
                param: data, //{ couponCode: SearchCouponCode, storeID: storeId, portalID: portalId },
                current: current_,
                pnew: offset_,
                sortcol: { 4: { sorter: false } }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        BindCouponPerSalesDetail: function(couponCode, orderId, userName, couponAmountFrom, couponAmountTo, grandTotalAmountFrom, grandTotalAmountTo) {
            var couponPerSalesGetObj = {
                CouponCode: couponCode,
                OrderID: orderId,
                CouponAmountFrom: couponAmountFrom,
                CouponAmountTo: couponAmountTo,
                GrandTotalAmountFrom: grandTotalAmountFrom,
                GrandTotalAmountTo: grandTotalAmountTo
            };
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = userName;
            this.config.method = "GetCouponPerSalesDetailView";
            this.config.url = this.config.baseURL;
            this.config.data = { aspxCommonObj: aspxCommonInfo, couponPerSaesObj: couponPerSalesGetObj };
            var data = this.config.data;

            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvCouponPerSalesDetailView_pagesize").length > 0) ? $("#gdvCouponPerSalesDetailView_pagesize :selected").text() : 10;

            $("#gdvCouponPerSalesDetailView").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxCouponManagement, "Coupon Code"), name: 'couponcode', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxCouponManagement, "Order ID"), name: 'orderID', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxCouponManagement, "Customer ID"), name: 'customerID', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxCouponManagement, "User Name"), name: 'userName', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxCouponManagement, "Coupon ID"), name: 'couponID', cssclass: '', controlclass: '', coltype: 'label', align: 'right', hide: true },
                    { display: getLocale(AspxCouponManagement, "Coupon Discount Amount"), name: '', cssclass: 'cssClassHeadNumber', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxCouponManagement, "Grand Total"), name: 'grandTotal', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxCouponManagement, "No Of Use"), name: 'noOfUse', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'label', align: 'center' },
                    { display: getLocale(AspxCouponManagement, "Order Date"), name: 'orderDate', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'right', type: 'date', format: 'yyyy/MM/dd' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxCouponManagement, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },
        ViewCouponPerSalesDetails: function(tblID, argus) {
            switch (tblID) {
            case "gdvCouponPerSales":
                    //debugger;
                $('#divCouponPersalesGrid').hide();
                $('#divCouponPerSalesDetail').show();
                couponPerSaleDetailFlag = true;
                searchCouponCode = argus[0];
                $('#gdvCouponPerSales').hide();
                $('#gdvCouponPerSales_Pagination').hide();
                $('#gdvCouponPerSalesDetailView').show();
                $('#btnBackToCouponPerSalesTbl').show();

                $('.cssClassCouponCode').hide();
                $('.cssClassOrderID').show();
                $('.cssClassUserName').show();
                    // $('.cssClassddlIspercentage').show();
                $('.cssClassCouponAmount').show();
                $('.cssClassGrandTotalAmount').show();
                $('#txtSearchOrderID,#txtSearchUserName,#txtCouponAmountFrom,#txtSearchCouponAmountTo,#txtGrandTotalAmountFrom,#txtGrandTotalAmountTo').val('');
                    //  $('#' + couponPerSalesTitle).html("Details of code" + " '" + argus[0] + "'");
                $('#' + couponPerSalesDetailTitel).html("Details of coupon" + " '" + argus[0] + "'");
                couponPerSalesMgmt.BindCouponPerSalesDetail(argus[0], null, null, null, null, null, null);
                break;
            default:
                break;
            }
        },
        SearchItems: function() {
            var coupName = $.trim($("#txtSearchNameCoupon").val());
            var orderID = $.trim($("#txtSearchOrderID").val());
            var userName = $.trim($("#txtSearchUserName").val());
            var couponAmountFrom = $.trim($("#txtCouponAmountFrom").val());
            var couponAmountTo = $.trim($("#txtSearchCouponAmountTo").val());
            var grandTotalAmountFrom = $.trim($("#txtGrandTotalAmountFrom").val());
            var grandTotalAmountTo = $.trim($("#txtGrandTotalAmountTo").val());
            if (coupName.length < 1) {
                coupName = null;
            }
            if (orderID.length < 1) {
                orderID = null;
            }
            if (userName.length < 1) {
                userName = null;
            }
            if (couponAmountFrom < 1) {
                couponAmountFrom = null;
            }
            if (couponAmountTo.length < 1) {
                couponAmountTo = null;
            }
            if (grandTotalAmountFrom.length < 1) {
                grandTotalAmountFrom = null;
            }
            if (grandTotalAmountTo.length < 1) {
                grandTotalAmountTo = null;
            }
            if (couponPerSaleDetailFlag == true) {
                if ((couponAmountFrom <= couponAmountTo) || (couponAmountFrom != '' && couponAmountTo == null) || (couponAmountFrom == null && couponAmountTo != '') || (couponAmountFrom == null && couponAmountTo == null)) {
                    if ((grandTotalAmountFrom <= grandTotalAmountTo) || (grandTotalAmountFrom != '' && grandTotalAmountTo == null) || (grandTotalAmountFrom == null && grandTotalAmountTo != null) || (grandTotalAmountFrom == null && grandTotalAmountTo == null)) {
                        couponPerSalesMgmt.BindCouponPerSalesDetail(searchCouponCode, orderID, userName, couponAmountFrom, couponAmountTo, grandTotalAmountFrom, grandTotalAmountTo);
                    } else {
                        csscody.alert("<h2>"+getLocale(AspxCouponManagement, "Information Alert")+"</h2><p>"+getLocale(AspxCouponManagement, "Grand Total From must be less than Grand Total To!")+"</p>");
                    }
                } else {
                    csscody.alert("<h2>"+getLocale(AspxCouponManagement, "Information Alert")+"</h2><p>"+getLocale(AspxCouponManagement, "Coupon Amount From must be less than Coupon Amount To!")+"</p>");
                }
            } else {
                couponPerSalesMgmt.BindAllCouponPerSalesList(coupName);
            }
        },
        ExportCouponPerSaleToCsvData: function() {
            if (couponPerSaleDetailFlag != true) {
                couponPerSalesMgmt.GetCouponPerSalesDataForExport();
            } else {
                couponPerSalesMgmt.GetCouponPerSalesExportDataDetail();
            }
        },
        ExportCouponPerSalesDivDataToExcel: function() {
            if (couponPerSaleDetailFlag != true) {
                couponPerSalesMgmt.GetCouponPerSalesDataForExport();
            } else {
                couponPerSalesMgmt.GetCouponPerSalesExportDataDetail();
            }
        },
        ajaxSuccess: function(data) {
            switch (couponPerSalesMgmt.config.ajaxCallMode) {
            case 0:
                break;
            case 1:
                couponPerSalesMgmt.BindCouponPerSalesExportData(data);
                break;
            case 2:
                couponPerSalesMgmt.BindCouponPerSalsesExportDataDetail(data);
                break;
            }
        },
        HideAll: function() {
            $('.cssClassOrderID').hide();
            $('.cssClassUserName').hide();
            $('.cssClassddlIspercentage').hide();
            $('.cssClassCouponAmount').hide();
            $('.cssClassGrandTotalAmount').hide();
        },
        init: function() {
            couponPerSalesMgmt.BindAllCouponPerSalesList(null);
            $('#gdvCouponPerSalesDetailView').hide();
            $('#btnBackToCouponPerSalesTbl').hide();

            couponPerSalesMgmt.HideAll();

            $("#" + couponPerSalesDataToExcel).bind('click', function() {
                couponPerSalesMgmt.ExportCouponPerSalesDivDataToExcel();
            });
            $('#txtSearchNameCoupon,#txtSearchOrderID,#txtSearchUserName,#txtCouponAmountFrom,#txtSearchCouponAmountTo,#txtGrandTotalAmountFrom,#txtGrandTotalAmountTo').keyup(function(event) {
                if (event.keyCode == 13) {
                    couponPerSalesMgmt.SearchItems();
                }
            });
            $('#btnBackToCouponPerSalesTbl').bind('click', function() {
                couponPerSaleDetailFlag = false;
                $('#gdvCouponPerSales').show();
                $('#gdvCouponPerSales_Pagination').show();
                // $('#' + couponPerSalesTitle).html('Coupon Per Sales');
                $('#gdvCouponPerSalesDetailView').hide();
                $('#btnBackToCouponPerSalesTbl').hide();
                $('#gdvCouponPerSalesDetailView_Pagination').hide();
                $('.cssClassCouponCode').show();
                $('#divCouponPerSalesDetail').hide();
                $('#divCouponPersalesGrid').show();
                couponPerSalesMgmt.HideAll();
            });
        }
    };
    couponPerSalesMgmt.init();
});