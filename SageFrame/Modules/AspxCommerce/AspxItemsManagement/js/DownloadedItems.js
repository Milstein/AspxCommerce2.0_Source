var DownloadedItems;
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
    DownloadedItems = {
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
            url: ""
        },
        init: function() {
            DownloadedItems.LoadDownloadableItemStaticImage();
            DownloadedItems.BindDownLoadableItemsGrid(null, null);
            $("#" + btnExportToExcel).click(function() {
                DownloadedItems.ExportDivDataToExcel();
            });
            $("#btnSearchDownloadedItems").click(function() {
                DownloadedItems.SearchItems();
            });

            $('.cssClassDownload').jDownload({
                root: rootPath,
                dialogTitle: getLocale(AspxItemsManagement,'AspxCommerce Download Sample Item:')
            });
            $('#txtSearchName,#txtSearchSKU').keyup(function(event) {
                if (event.keyCode == 13) {
                    DownloadedItems.SearchItems();
                }
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: DownloadedItems.config.type,
                contentType: DownloadedItems.config.contentType,
                cache: DownloadedItems.config.cache,
                async: DownloadedItems.config.async,
                url: DownloadedItems.config.url,
                data: DownloadedItems.config.data,
                dataType: DownloadedItems.config.dataType,
                success: DownloadedItems.ajaxSuccess,
                error: DownloadedItems.ajaxFailure
            });
        },
        LoadDownloadableItemStaticImage: function() {
            $('#ajaxDownloadableItemImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },
        GetOrderedItemsDataForExport: function() {
            var downloadableItem = {
                SKU: null,
                ItemName: null,
                CheckUser: false
            };
            this.config.url = this.config.baseURL + "GetDownLoadableItemsList";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, downloadableObj: downloadableItem, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        ExportDownloadedToCsvData: function() {
            DownloadedItems.GetOrderedItemsDataForExport();
        },
        ExportDivDataToExcel: function() {
            DownloadedItems.GetOrderedItemsDataForExport();
        },

        SearchItems: function() {
            var sku = $.trim($("#txtSearchSKU").val());
            var Nm = $.trim($("#txtSearchName").val());
            if (sku.length < 1) {
                sku = null;
            }
            if (Nm.length < 1) {
                Nm = null;
            }
            var isAct = $.trim($("#ddlIsActive").val()) == "" ? null : ($.trim($("#ddlIsActive").val()) == "True" ? true : false);

            DownloadedItems.BindDownLoadableItemsGrid(sku, Nm);
        },
        BindDownLodableExportData: function(msg) {
            var exportData = '<thead><tr><th>'+getLocale(AspxItemsManagement,"SKU")+'</th><th>'+getLocale(AspxItemsManagement,"Item Name")+'</th><th>'+getLocale(AspxItemsManagement,"Sample Link")+'</th><th>'+getLocale(AspxItemsManagement,"Actual Link")+'</th><th>'+getLocale(AspxItemsManagement,"Purchases")+'</th><th>'+getLocale(AspxItemsManagement,"Downloads")+'</th></tr></thead><tbody>';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    exportData += '<tr><td>' + value.SKU + '</td><td>' + value.ItemName + '</td>';
                    exportData += '<td>' + value.SampleLink + '</td><td>' + value.ActualLink + '</td>';
                    exportData += '<td>' + value.Purchases + '</td><td>' + value.Downloads + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>'+getLocale(AspxItemsManagement,"No Records Found!")+'</td></tr>';
            }
            exportData += '</tbody>';

            $('#DownLoadableExportDataTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvDownloadedHiddenCsv']").val($("#DownLoadableExportDataTbl").table2CSV());
            $("#DownLoadableExportDataTbl").html('');
        },

        BindDownLoadableItemsGrid: function(sku, Nm) {
            var downloadableItem = {
                SKU: sku,
                ItemName: Nm,
                CheckUser: false
            };
            this.config.method = "GetDownLoadableItemsList";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvDownLoadableItems_pagesize").length > 0) ? $("#gdvDownLoadableItems_pagesize :selected").text() : 10;

            $("#gdvDownLoadableItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxItemsManagement,'SKU'), name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement,'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement,'Sample Link'), name: 'sample_link', cssclass: '', controlclass: 'cssClassDownload', coltype: 'linklabel', align: 'left', value: '4', downloadarguments: '', downloadmethod: '' },
                    { display: getLocale(AspxItemsManagement,'Actual Link'), name: 'actual_link', cssclass: '', controlclass: 'cssClassDownload', coltype: 'linklabel', align: 'left', value: '5', downloadarguments: '', downloadmethod: '' },
                    { display: 'Sample File', name: 'sample_file', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Actual File', name: 'actual_file', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemsManagement,'Purchases'), name: 'purchase', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement,'Downloads'), name: 'download', cssclass: '', controlclass: '', coltype: 'label', align: 'left' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemsManagement,"No Records Found!"),
                param: { downloadableObj: downloadableItem, aspxCommonObj: aspxCommonObj()},
                current: current_,
                pnew: offset_,
                sortcol: { }
            });
        },
        ajaxSuccess: function(msg) {
            switch (DownloadedItems.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    DownloadedItems.BindDownLodableExportData(msg);
                    break;
            }
        }
    };
    DownloadedItems.init();
});
   