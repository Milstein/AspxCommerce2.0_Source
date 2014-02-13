 var CustomerTotalOrders;
 $(function() {
     var aspxCommonObj = function() {
         var aspxCommonInfo = {
             StoreID: AspxCommerce.utils.GetStoreID(),
             PortalID: AspxCommerce.utils.GetPortalID(),
             CultureName: AspxCommerce.utils.GetCultureName()
         };
         return aspxCommonInfo;
     };
     CustomerTotalOrders = {
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
             CustomerTotalOrders.BindCustomerOrderTotal(null);
             $("#btnSearchCustomerTotalOrders").live("click", function() {
                 CustomerTotalOrders.SearchCustomeOrderTotal();
             });
             $("#" + btnExportToExcelCTO).live("click", function() {
                 CustomerTotalOrders.ExportCTODivDataToExcel();
             });
             $('#txtSearchUserNm').keyup(function(event) {
                 if (event.keyCode == 13) {
                     CustomerTotalOrders.SearchCustomeOrderTotal();
                 }
             });
         },
         ajaxCall: function(config) {
             $.ajax({
                 type: CustomerTotalOrders.config.type,
                 contentType: CustomerTotalOrders.config.contentType,
                 cache: CustomerTotalOrders.config.cache,
                 async: CustomerTotalOrders.config.async,
                 url: CustomerTotalOrders.config.url,
                 data: CustomerTotalOrders.config.data,
                 dataType: CustomerTotalOrders.config.dataType,
                 success: CustomerTotalOrders.ajaxSuccess,
                 error: CustomerTotalOrders.ajaxFailure
             });
         },
         GetCustomerTotalOrderExportData: function() {
             this.config.url = this.config.baseURL + "GetCustomerOrderTotal";
             this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj(), user: null });
             this.config.ajaxCallMode = 1;
             this.ajaxCall(this.config);
         },
         BindCustomerOrderTotalExportData: function(msg) {

         var exportData = '<thead><tr><th>' + getLocale(AspxCustomerManagement, "Customer Name") + '</th><th>' + getLocale(AspxCustomerManagement, "Number Of Orders") + '</th><th>' + getLocale(AspxCustomerManagement, "Average Order Amount") + '</th><th>' + getLocale(AspxCustomerManagement, "Total Order Amount") + '</th></tr></thead><tbody>';
             if (msg.d.length > 0) {
                 $.each(msg.d, function(index, value) {
                     exportData += '<tr><td>' + value.UserName + '</td><td>' + value.NumberOfOrders + '</td>';
                     exportData += '<td>' + curSymbol + ' ' + value.AverageOrderAmount + '</td><td>' + curSymbol + ' ' + value.TotalOrderAmount + '</td></tr>';
                 });
             } else {
                 exportData += '<tr><td>No Records Found!</td></tr>';
             }
             exportData += '</tbody>';
             $('#CustomerTotalOrderExportDataTbl').html(exportData);
             $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
             $("input[id$='_csvCustomerByOrderHiddenValue']").val($("#CustomerTotalOrderExportDataTbl").table2CSV());
             $("#CustomerTotalOrderExportDataTbl").html('');

         },
         BindCustomerOrderTotal: function(user) {
             this.config.method = "GetCustomerOrderTotal";
             var offset_ = 1;
             var current_ = 1;
             var perpage = ($("#gdvCustomerOrderTotal_pagesize").length > 0) ? $("#gdvCustomerOrderTotal_pagesize :selected").text() : 10;

             $("#gdvCustomerOrderTotal").sagegrid({
                 url: this.config.baseURL,
                 functionMethod: this.config.method,
                 colModel: [
                 //{ display: 'ItemID', name: 'itemId', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                     { display: getLocale(AspxCustomerManagement, "Customer Name"), name: 'customer_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxCustomerManagement, "Number Of Orders"), name: 'number_of_Orders', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxCustomerManagement, "Average Order Amount"), name: 'average_order', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                     { display: getLocale(AspxCustomerManagement, "Total Order Amount"), name: 'total_order', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                     { display: getLocale(AspxCustomerManagement, "Actions"), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center', hide: true }
                 ],
                 buttons: [
                 //{ display: 'ShowReviews', name: 'showReviews', enable: true, _event: 'click', trigger: '1', callMethod: 'ShowItemReviewsList', arguments: '1,' },
                 ],
                 rp: perpage,
                 nomsg: getLocale(AspxCustomerManagement, "No Records Found!"),
                 param: { aspxCommonObj: aspxCommonObj(), user: user },
                 current: current_,
                 pnew: offset_,
                 sortcol: { 4: { sorter: false } }
             });
             $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
         },
         ExportCustomerByOrderToCsvData: function() {
             CustomerTotalOrders.GetCustomerTotalOrderExportData();
         },
         ExportCTODivDataToExcel: function() {
             CustomerTotalOrders.GetCustomerTotalOrderExportData();
         },
         ajaxSuccess: function(msg) {
             switch (CustomerTotalOrders.config.ajaxCallMode) {
                 case 0:
                     break;
                 case 1:
                     CustomerTotalOrders.BindCustomerOrderTotalExportData(msg);
                     break;
             }
         },
         SearchCustomeOrderTotal: function() {
             var UserName = $.trim($("#txtSearchUserNm").val());
             if (UserName.length < 1) {
                 UserName = null;
             }
             CustomerTotalOrders.BindCustomerOrderTotal(UserName);
         }
     };
     CustomerTotalOrders.init();
 });