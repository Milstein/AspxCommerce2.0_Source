var ReturnReport = "";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    ReturnReport = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            data: '{}',
            dataType: "json",
            url: "",
            method: ""
        },
        ajaxCall: function(config) {
            $.ajax({
                type: ReturnReport.config.type,
                contentType: ReturnReport.config.contentType,
                cache: ReturnReport.config.cache,
                async: ReturnReport.config.async,
                url: ReturnReport.config.url,
                data: ReturnReport.config.data,
                dataType: ReturnReport.config.dataType,
                success: ReturnReport.ajaxSuccess,
                error: ReturnReport.ajaxFailure
            });
        },
        init: function() {
            ReturnReport.LoadReturnReportImageStaticImage();
            ReturnReport.GetReturnStatus();
            ReturnReport.BindReturnReportsGrid(null, true, false, false);
            $("#ddlReturnReport").change(function() {
                ReturnReport.ShowReport();
            });
            $('#ddlReturnStatus').keyup(function(event) {
                if (event.keyCode == 13) {
                    ReturnReport.SearchItems();
                }
            });
        },
        LoadReturnReportImageStaticImage: function() {
            $('#ajaxReturnReportImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },
        GetTaxReportDataForExport: function() {
            var Monthly = false;
            var Weekly = false;
            var Hourly = false;
            var reportType = $("#ddlReturnReport option:selected").val();
            if (reportType == '1') {
                Monthly = true;
            }
            else if (reportType == '2') {
                Weekly = true;
            }
            else if (reportType == '3') {
                Hourly = true;
            }
            var returnStatus = $("#ddlReturnStatus option:selected").text();
            if ($("#ddlReturnStatus option:selected").val() == "0") {
                returnStatus = null;
            }
            var returnReportObj = {
                ReturnStatus: returnStatus,
                Monthly: Monthly,
                Weekly: Weekly,
                Hourly: Hourly
            };
            this.config.url = this.config.baseURL + "GetReturnReport";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj, returnReportObj: returnReportObj });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        ExportTaxToCsvData: function() {
            ReturnReport.GetTaxReportDataForExport();
        },
        GetReturnStatus: function() {
            this.config.url = this.config.baseURL + "GetReturnStatusList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        ShowReport: function() {
            var Nm = $("#ddlReturnStatus option:selected").text();
            if ($("#ddlReturnStatus option:selected").val() == "0") {
                Nm = null;
            }
            var selectreport = $("#ddlReturnReport").val();
            switch (selectreport) {
                case '1':
                    ReturnReport.BindReturnReportsGrid(Nm, true, false, false);
                    break;
                case '2':
                    ReturnReport.BindReturnReportsGrid(Nm, false, true, false);
                    break;
                case '3':
                    ReturnReport.BindReturnReportsGrid(Nm, false, false, true)
                    break;
            }
        },
        BindReturnReportsGrid: function(Nm, monthly, weekly, hourly) {

            var returnReportObj = {
                ReturnStatus: Nm,
                Monthly: monthly,
                Weekly: weekly,
                Hourly: hourly
            };
            this.config.method = "GetReturnReport";
            this.config.data = { aspxCommonObj: aspxCommonObj, returnReportObj: returnReportObj };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvReturnReport_pagesize").length > 0) ? $("#gdvReturnReport_pagesize :selected").text() : 10;
            $("#gdvReturnReport").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                        { display: getLocale(AspxReturnAndPolicy,'Refunded Amount'), name: 'refundAmount', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
				        { display: getLocale(AspxReturnAndPolicy,'Shipping Cost'), name: 'shippingCost', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
				        { display: getLocale(AspxReturnAndPolicy,'Other Postal Charges'), name: 'shippingCost', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
				        { display: getLocale(AspxReturnAndPolicy,'Quantity'), name: 'quantity', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
  				        { display: getLocale(AspxReturnAndPolicy,'No. of Returns'), name: 'noOfReturns', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                        { display: getLocale(AspxReturnAndPolicy,'Period'), name: 'period', cssclass: '', controlclass: '', coltype: 'label', align: 'left' }
                     ],
                rp: perpage,
                nomsg: getLocale(AspxReturnAndPolicy,"No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj, returnReportObj: returnReportObj },
                current: current_,
                pnew: offset_,
                sortcol: { }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

        },
        SearchItems: function() {
            var Nm = $("#ddlReturnStatus option:selected").text();

            if ($("#ddlReturnStatus option:selected").val() == "0") {
                Nm = null;
            }
            var selectreport = $("#ddlReturnReport").val();
            switch (selectreport) {
                case '1':
                    ReturnReport.BindReturnReportsGrid(Nm, true, false, false);
                    break;
                case '2':
                    ReturnReport.BindReturnReportsGrid(Nm, false, true, false);
                    break;
                case '3':
                    ReturnReport.BindReturnReportsGrid(Nm, false, false, true);
                    break;
            }
        },
        BindReturnReportDataForExport: function(msg) {
            var exportData = '<thead><tr><th>'+getLocale(AspxReturnAndPolicy,"Refund Amount")+'</th><th>'+getLocale(AspxReturnAndPolicy,"Shipping Cost")+"</th><th>"+getLocale(AspxReturnAndPolicy,"Quantity")+"</th><th>"+getLocale(AspxReturnAndPolicy,"No. of Returns")+"</th><th>"+getLocale(AspxReturnAndPolicy,"Period")+'</th></tr></thead><tbody>';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    exportData += '<tr><td>' + value.RefundAmount + '</td>';
                    exportData += '<td>' + value.ShippingCost + '</td>';
                    exportData += '<td>' + value.Quantity + '</td>';
                    exportData += '<td>' + value.NoOfReturns + '</td>';
                    exportData += '<td>' + value.AddedOn + '</td></tr>';
                });
            }
            else {
                exportData += '<tr><td>'+getLocale(AspxReturnAndPolicy,'No Records Found!')+'</td></tr>';
            }
            exportData += '</tbody>';
            $('#ReturnReportExportTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvRetunHiddenValue']").val($('#ReturnReportExportTbl').table2CSV());
            $('#ReturnReportExportTbl').html('');
        },
        ajaxSuccess: function(msg) {
            switch (ReturnReport.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    ReturnReport.BindReturnReportDataForExport(msg);
                    break;
                case 2:
                    $.each(msg.d, function(index, item) {
                        var returnStatusElements = "<option value=" + item.Value + ">" + item.Text + "</option>";
                        $("#ddlReturnStatus").append(returnStatusElements);
                    });
                    break;
            }
        },
        ExportDivDataToExcel: function() {
            ReturnReport.GetTaxReportDataForExport();
        }

    };
    ReturnReport.init();
});