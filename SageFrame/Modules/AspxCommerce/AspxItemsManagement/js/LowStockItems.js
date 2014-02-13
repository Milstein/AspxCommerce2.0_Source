var LowStockItems;
$(function() {
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    };
    var customerId = AspxCommerce.utils.GetCustomerID();
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var sessionCode = AspxCommerce.utils.GetSessionCode();
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    LowStockItems = {
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
            LowStockItems.LoadLowStockItemStaticImage();
            LowStockItems.BindLowStockItemsGrid(null, null, null);
            $("#btnSearchLowStockItems").click(function() {
                LowStockItems.SearchItems();
            });
            $("#" + btnExportToExcel).click(function() {
                LowStockItems.ExportDivDataToExcel();
            });
            $('#txtSearchName,#txtSearchSKU,#ddlIsActive').keyup(function(event) {
                if (event.keyCode == 13) {
                    LowStockItems.SearchItems();
                }
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: LowStockItems.config.type,
                contentType: LowStockItems.config.contentType,
                cache: LowStockItems.config.cache,
                async: LowStockItems.config.async,
                url: LowStockItems.config.url,
                data: LowStockItems.config.data,
                dataType: LowStockItems.config.dataType,
                success: LowStockItems.ajaxSuccess,
                error: LowStockItems.ajaxFailure
            });
        },
        LoadLowStockItemStaticImage: function() {
            $('#ajaxLowStockItemImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },
        GetLowStockItemsDataForExport: function() {
            var lowStockObj = {
                SKU: null,
                ItemName: null,
                IsActive: null
            };
            this.config.url = this.config.baseURL + "GetLowStockItemsList";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, lowStockObj: lowStockObj, aspxCommonObj: aspxCommonObj(), lowStock: lowStock });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        ExportLowStockCsvData: function() {
            LowStockItems.GetLowStockItemsDataForExport();
        },
        ExportDivDataToExcel: function() {
            LowStockItems.GetLowStockItemsDataForExport();
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

            LowStockItems.BindLowStockItemsGrid(sku, Nm, isAct);
        },
        BindLowStockExportData: function(msg) {
            var exportData = '<thead><tr><th>' + getLocale(AspxItemsManagement, "Name") + '</th><th>' + getLocale(AspxItemsManagement, "SKU") + '</th><th>' + getLocale(AspxItemsManagement, "Price") + '</th><th>' + getLocale(AspxItemsManagement, "Quantity") + '</th><th>' + getLocale(AspxItemsManagement, "Is Active") + '</th></tr></thead><tbody>';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    exportData += '</td><td>' + value.ItemName + '</td>';
                    exportData += '<td>' + value.SKU + '</td><td>' + curSymbol + ' ' + value.Price + '</td>';
                    exportData += '<td>' + value.Quantity + '</td><td>' + value.Status + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxItemsManagement, "No Records Found!") + '</td></tr>';
            }
            exportData += '</tbody>';
            $('#LowStockExportDataTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvLowStockHiddenCsv']").val($("#LowStockExportDataTbl").table2CSV());
            $("#LowStockExportDataTbl").html('');
        },
        BindLowStockItemsGrid: function(sku, Nm, isAct) {
            var lowStockObj = {
                SKU: sku,
                ItemName: Nm,
                IsActive: isAct
            };
            this.config.method = "GetLowStockItemsList";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvLowStockItems_pagesize").length > 0) ? $("#gdvLowStockItems_pagesize :selected").text() : 10;

            $("#gdvLowStockItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'ItemID', name: 'id', cssclass: 'cssClassHide', coltype: '', align: 'center', controlclass: '', hide: true },
                    { display: getLocale(AspxItemsManagement,'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement,'SKU'), name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement,'Price'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxItemsManagement,'Quantity'), name: 'quantity', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemsManagement,'Is Active'), name: 'status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemsManagement,"No Records Found!"),
                param: { lowStockObj: lowStockObj, aspxCommonObj: aspxCommonObj(), lowStock: lowStock },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false} }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },
        ajaxSuccess: function(msg) {
            switch (LowStockItems.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    LowStockItems.BindLowStockExportData(msg);
                    break;
            }
        }
    };
    LowStockItems.init();
});