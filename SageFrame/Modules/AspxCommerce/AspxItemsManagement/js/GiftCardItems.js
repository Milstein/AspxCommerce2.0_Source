
var giftCardReport;
$(function() {
    var reportGiftCard = function() {
        var cardType = 0;
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName()
            };
            return aspxCommonInfo;
        };
        var $ajaxCall = function(method, param, successFx, error) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: false,
                url: aspxservicePath + 'AspxCommerceWebService.asmx/' + method,
                data: param,
                dataType: "json",
                success: successFx,
                error: error
            });
        };
        var getGiftCardType = function() {
            //GetGiftCardTypes
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });

            $ajaxCall("GetGiftCardTypes", param, function(msg) {
                var listtype = "";
                if (msg.d.length > 0) {
                    $.each(msg.d, function(index, item) {
                        if (index == 0) {
                            cardType = item.TypeId;
                            listtype += "<label><input type=\"radio\" checked=\"checked\"name=\"giftcardtype\" value=\"" + item.TypeId + " \"/>" + item.Type + "</label> ";
                        } else {
                            listtype += "<label><input type=\"radio\" name=\"giftcardtype\" value=\"" + item.TypeId + " \"/>" + item.Type + "</label> ";

                        }
                    });
                    $("#giftCardType").html(listtype);
                    loadReport(null, null, null, null);
                    $("input[name=giftcardtype]").bind("change", function() {
                        cardType = parseInt($(this).val());
                        loadReport(null, null, null, null);
                        clear();
                    });
                }
            }, null);
        };
        var clear = function() {
            $("#txtSku").val('');
            $("#txtItemName").val('');
            $("#txtDateFrom").val('');
            $("#txtDateTo").val('');
        };
        var loadReport = function(sku, name, startDate, toDate) {
            var objGiftCard = {
                SKU: sku,
                ItemName: name,
                FromDate: startDate,
                ToDate: toDate,
                GiftCardType: cardType
            };
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvGiftCardReport_pagesize").length > 0) ? $("#gdvGiftCardReport_pagesize :selected").text() : 10;


            $("#gdvGiftCardReport").sagegrid({
                url: aspxservicePath + 'AspxCommerceWebService.asmx/',
                functionMethod: "GetGiftCardReport",
                colModel: [
                //{ display: getLocale(AspxItemsManagement, 'RowTotal'), name: 'RowTotal', cssclass: '', controlclass: '', coltype: 'label', align: 'left',hide:true },
                    {display: getLocale(AspxItemsManagement, 'SKU'), name: 'SKU', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement, 'Item Name'), name: 'ItemName', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: 'from', name: 'FromDate', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'to', name: 'ToDate', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'row', name: 'row', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Gift Card Code', name: 'GiftCardCode', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement, 'Total Sale Amount'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxItemsManagement, 'Total Purchases'), name: 'total', cssclass: '', controlclass: '', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxItemsManagement, 'Is Active'), name: 'status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemsManagement, "No Records Found!"),
                param: { objGiftcard: objGiftCard, aspxCommonObj: aspxCommonObj() },
                current: current_,
                pnew: offset_,
                sortcol: {}
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        };
        giftCardReport = function() {
            var getDataForExport = function() {
                var objGiftcard = {
                    SKU: null,
                    ItemName: null,
                    FromDate: null,
                    ToDate: null,
                    GiftCardType: cardType
                };
                var param = JSON2.stringify({ offset: 1, limit: null, objGiftcard: objGiftcard, aspxCommonObj: aspxCommonObj() });

                $ajaxCall("GetGiftCardReport", param, function(msg) {

                    var exportData = '<thead><tr><th>' + getLocale(AspxItemsManagement, "GiftCard ItemName") + '</th><th>' + getLocale(AspxItemsManagement, "SKU") + '</th><th>' + getLocale(AspxItemsManagement, "TotalSalesAmount") + '</th><th>' + getLocale(AspxItemsManagement, "TotalPurchases") + '</th></tr></thead><tbody>';
                    if (msg.d.length > 0) {
                        $.each(msg.d, function(index, value) {
                            exportData += '</td><td>' + value.ItemName + '</td>';
                            exportData += '<td>' + value.SKU + '</td><td>' + curSymbol + ' ' + value.TotalSaleAmount + '</td>';
                            exportData += '<td>' + value.TotalPurchases + '</td></tr>';
                        });
                    } else {
                        exportData += '<tr><td>' + getLocale(AspxItemsManagement, "No Records Found!") + '</td></tr>';
                    }
                    exportData += '</tbody>';
                    $('#gdvGiftCardReportExportDataTbl').html(exportData);
                    $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
                    $("input[id$='_csvGiftCardHiddenCsv']").val($("#gdvGiftCardReportExportDataTbl").table2CSV());
                    $("#gdvGiftCardReportExportDataTbl").html('');
                }, null);


            };
            return { GetReport: getDataForExport };
        };
        var init = function() {
            getGiftCardType();
            $("#btnGetReport").bind("click", function() {
                var sku = $.trim($("#txtsku").val());
                var name = $.trim($("#txtItemName").val());
                var from = $.trim($("#txtFromDate").val());
                var to = $.trim($("#txtToDate").val());
                // if (sku != "" || name != "" || from != "" || to != "")
                loadReport(sku, name, from, to);


            });
            $("#txtFromDate,#txtToDate").datepicker({
                maxDate: 0,
                changeYear: true,
                changeMonth: true,
                dateFormat: 'yy/mm/dd',
                onSelect: function() {

                    if (this.id == "txtFromDate") {
                        var to = $("#txtToDate");
                        if (this.value > to.val()) {
                            to.val('');
                        }
                    } else {
                        var from = $("#txtFromDate");
                        if (this.value < from.val()) {
                            from.val('');
                        }
                    }
                }
            });
        } ();
    } ();
});