 var MostViewedItems;
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
     MostViewedItems = {
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
             MostViewedItems.LoadMostViewedItemStaticImage();
             MostViewedItems.BindIMostViewedtemsGrid(null);
             $("#btnSearchMostViewedItens").click(function() {
                 MostViewedItems.SearchItems();
             });
             $("#" + btnExportToExcel).click(function() {
                 MostViewedItems.ExportDivDataToExcel();
             });
             $('#txtSearchName').keyup(function(event) {
                 if (event.keyCode == 13) {
                     MostViewedItems.SearchItems();
                 }
             });
         },
         ajaxCall: function(config) {
             $.ajax({
                 type: MostViewedItems.config.type,
                 contentType: MostViewedItems.config.contentType,
                 cache: MostViewedItems.config.cache,
                 async: MostViewedItems.config.async,
                 url: MostViewedItems.config.url,
                 data: MostViewedItems.config.data,
                 dataType: MostViewedItems.config.dataType,
                 success: MostViewedItems.ajaxSuccess,
                 error: MostViewedItems.ajaxFailure
             });
         },
         LoadMostViewedItemStaticImage: function() {
             $('#ajaxMostViewedItemImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
         },
         GetMostViewedItemsDataForExport: function() {
             this.config.url = this.config.baseURL + "GetMostViewedItemsList";
             this.config.data = JSON2.stringify({ offset: 1, limit: null, name: null, aspxCommonObj: aspxCommonObj() });
             this.config.ajaxCallMode = 1;
             this.ajaxCall(this.config);
         },
         ExportMostViewedToCsvData: function() {
             MostViewedItems.GetMostViewedItemsDataForExport();
         },
         ExportDivDataToExcel: function() {
             MostViewedItems.GetMostViewedItemsDataForExport();
         },

         SearchItems: function() {
             var Nm = $.trim($("#txtSearchName").val());
             if (Nm.length < 1) {
                 Nm = null;
             }
             MostViewedItems.BindIMostViewedtemsGrid(Nm);
         },
         BindMostViewedExportData: function(msg) {
             var exportData = '<thead><tr><th>' + getLocale(AspxItemsManagement, "Name") + '</th><th>' + getLocale(AspxItemsManagement, "Price") + '</th><th>' + getLocale(AspxItemsManagement, "Number Of Views") + '</th></tr></thead><tbody>';
             if (msg.d.length > 0) {
                 $.each(msg.d, function(index, value) {
                     exportData += '<tr><td>' + value.ItemName + '</td>';
                     exportData += '<td>' + curSymbol + ' ' + value.Price + '</td><td>' + value.ViewCount + '</td></tr>';
                 });
             } else {
                 exportData += '<tr><td>' + getLocale(AspxItemsManagement, "No Records Found!") + '</td></tr>';
             }
             exportData += '</tbody>';

             $('#MostViewedExportDataTbl').html(exportData);
             $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
             $("input[id$='_csvMostViewedHiddenCsv']").val($("#MostViewedExportDataTbl").table2CSV());
             $("#MostViewedExportDataTbl").html('');
         },
         BindIMostViewedtemsGrid: function(Nm) {
             this.config.method = "GetMostViewedItemsList";
             var offset_ = 1;
             var current_ = 1;
             var perpage = ($("#gdvMostViewedItems_pagesize").length > 0) ? $("#gdvMostViewedItems_pagesize :selected").text() : 10;

             $("#gdvMostViewedItems").sagegrid({
                 url: this.config.baseURL,
                 functionMethod: this.config.method,
                 colModel: [
                     { display: getLocale(AspxItemsManagement,'ItemID'), name: 'id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'itemsChkbox', elemDefault: false, controlclass: 'classClassCheckBox', hide: true },
                     { display: getLocale(AspxItemsManagement,'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxItemsManagement,'Price'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                     { display: getLocale(AspxItemsManagement,'Number Of Views'), name: 'noofViews', cssclass: '', controlclass: '', coltype: 'label', align: 'left' }
                 ],
                 rp: perpage,
                 nomsg: getLocale(AspxItemsManagement,"No Records Found!"),
                 param: { name: Nm, aspxCommonObj: aspxCommonObj() },
                 current: current_,
                 pnew: offset_,
                 sortcol: { 0: { sorter: false} }
             });
             $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
         },
         ajaxSuccess: function(msg) {
             switch (MostViewedItems.config.ajaxCallMode) {
                 case 0:
                     break;
                 case 1:
                     MostViewedItems.BindMostViewedExportData(msg);
                     break;
             }
         }
     };
     MostViewedItems.init();
 });