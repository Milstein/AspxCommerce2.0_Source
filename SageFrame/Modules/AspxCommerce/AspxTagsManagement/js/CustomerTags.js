   var CustomerTags="";
   $(function() {

       var aspxCommonObj = {
           StoreID: AspxCommerce.utils.GetStoreID(),
           PortalID: AspxCommerce.utils.GetPortalID(),
           UserName: AspxCommerce.utils.GetUserName(),
           CultureName: AspxCommerce.utils.GetCultureName()
       };
       var reviewedCustomerName = '';
       CustomerTags = {
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
               CustomerTags.LoadCustoerTagsStaticImage();
               CustomerTags.BindCustomerTags();
               CustomerTags.HideDiv();
               $("#divCustomerTagDetails").show();
               $("#btnBack").click(function() {
                   CustomerTags.HideDiv();
                   $("#divCustomerTagDetails").show();
               });
               $("#<%=btnExportDataToExcel.ClientID %>").click(function() {
                   CustomerTags.ExportDataToExcel();
               });
               $("#<%=btnExportToExcel.ClientID %>").click(function() {
                   CustomerTags.ExportDivDataToExcel();
               });
           },
           ajaxCall: function(config) {
               $.ajax({
                   type: CustomerTags.config.type,
                   contentType: CustomerTags.config.contentType,
                   cache: CustomerTags.config.cache,
                   async: CustomerTags.config.async,
                   data: CustomerTags.config.data,
                   dataType: CustomerTags.config.dataType,
                   url: CustomerTags.config.url,
                   success: CustomerTags.ajaxSuccess,
                   error: CustomerTags.ajaxFailure
               });
           },
           LoadCustoerTagsStaticImage: function() {
               $('#ajaxCustomerImageLoad').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
               $('#ajaxCustomerTagsImage2').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
           },

           HideDiv: function() {
               $("#divCustomerTagDetails").hide();
               $("#divShowCustomerTagList").hide();
           },
           GetCustomerTagsDataForExport: function() {
               this.config.url = this.config.baseURL + "GetCustomerTagDetailsList";
               this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj });
               this.config.ajaxCallMode = 1;
               this.ajaxCall(this.config);
           },
           BindCustomerTagsExportData: function(data) {
               var exportData = '<thead><tr><th>'+getLocale(AspxTagsManagement,'Customer Name')+'</th><th>'+getLocale(AspxTagsManagement,'Total Tags')+'</th></tr></thead><tbody>';
               if (data.d.length > 0) {
                   $.each(data.d, function(index, value) {
                       exportData += '<tr><td>' + value.UserName + '</td>';
                       exportData += '<td>' + value.Tag + '</td></tr>';
                   });
               } else {
                   exportData += '<tr><td>'+getLocale(AspxTagsManagement,'No Records Found!')+'</td></tr>';
               }
               exportData += '</tbody>';

               $('#CustomerTagExportDataTbl').html(exportData);
               $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
               $("input[id$='_csvCustomerTagHdn']").val($("#CustomerTagExportDataTbl").table2CSV());
               $("#CustomerTagExportDataTbl").html('');
           },
           BindCustomerTags: function() {
               this.config.method = "GetCustomerTagDetailsList";
               var offset_ = 1;
               var current_ = 1;
               var perpage = ($("#gdvCusomerTag_pagesize").length > 0) ? $("#gdvCusomerTag_pagesize :selected").text() : 10;

               $("#gdvCusomerTag").sagegrid({
                   url: this.config.baseURL,
                   functionMethod: this.config.method,
                   colModel: [
                       { display: getLocale(AspxTagsManagement,'Customer Name'), name: 'user_name', cssclass: '', coltype: 'label', align: 'left' },
                       { display: getLocale(AspxTagsManagement,'Total Tags'), name: 'total_tags', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                       { display: getLocale(AspxTagsManagement,'Actions'), name: 'action', cssclass: 'cssClassAction', controlclass: '', coltype: 'label', align: 'center' }
                   ],

                   buttons: [
                       { display: getLocale(AspxTagsManagement,'View'), name: 'showtags', enable: true, _event: 'click', trigger: '1', callMethod: 'CustomerTags.ShowTagsList', arguments: '0' }
                   ],
                   rp: perpage,
                   nomsg: getLocale(AspxTagsManagement,"No Records Found!"),
                   param: { aspxCommonObj: aspxCommonObj },
                   current: current_,
                   pnew: offset_,
                   sortcol: { 2: { sorter: false } }
               });
           },

           ShowTagsList: function(tblID, argus) {
               switch (tblID) {
               case "gdvCusomerTag":
                   $("#" + lblShowHeading).html("Tags Submitted By: '" + argus[3] + "'");
                   CustomerTags.BindShowCustomerTagList(argus[0]);
                   reviewedCustomerName = argus[0];
                   CustomerTags.HideDiv();
                   $("#divShowCustomerTagList").show();
                   break;
               }
           },
           GetCustomerTagDetailListForExport: function() {
               aspxCommonObj.UserName = reviewedCustomerName;
               this.config.url = this.config.baseURL + "ShowCustomerTagList";
               this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj });
               this.config.ajaxCallMode = 2;
               this.ajaxCall(this.config);
           },
           BindShowCustomreTagListExportData: function(data) {
               var exportData = '<thead><tr><th>'+getLocale(AspxTagsManagement,'Item Name')+'</th><th>'+getLocale(AspxTagsManagement,'Tag Name')+'</th><th>'+getLocale(AspxTagsManagement,'Taged On')+'</th></tr></thead><tbody>';
               if (data.d.length > 0) {
                   $.each(data.d, function(index, value) {
                       exportData += '<tr><td>' + value.ItemName + '</td><td>' + value.Tag + '</td>';
                       exportData += '</td><td>' + value.AddedOn + '</td></tr>';
                   });
               } else {
                   exportData += '<tr><td>'+getLocale(AspxTagsManagement,'No Records Found!')+'</td></tr>';
               }
               exportData += '</tbody>';

               $('#ShowTagListExportDataTbl').html(exportData);
               $("input[id$='HdnGridData']").val('<table>' + exportData + '</table>');
               $("input[id$='_csvCustomerTagDetailHdn']").val($("#ShowTagListExportDataTbl").table2CSV());
               $("#ShowTagListExportDataTbl").html('');
           },
           BindShowCustomerTagList: function(UserName) {
               aspxCommonObj.UserName = UserName;
               this.config.method = "ShowCustomerTagList";
               var offset_ = 1;
               var current_ = 1;
               var perpage = ($("#grdShowTagsList_pagesize").length > 0) ? $("#grdShowTagsList_pagesize :selected").text() : 10;

               $("#grdShowTagsList").sagegrid({
                   url: this.config.baseURL,
                   functionMethod: this.config.method,
                   colModel: [
                       { display: getLocale(AspxTagsManagement,'Item ID'), name: 'itemId', cssclass: '', coltype: 'label', align: 'left', hide: true },
                       { display: getLocale(AspxTagsManagement,'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                       { display: getLocale(AspxTagsManagement,'Tag Name'), name: 'tag_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                       { display: getLocale(AspxTagsManagement,'Taged On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left', format: 'yyyy/MM/dd' },
                       { display: getLocale(AspxTagsManagement,'Actions'), name: 'action', cssclass: 'cssClassAction', controlclass: '', coltype: 'label', align: 'center', hide: true }
                   ],

                   buttons: [
                   ],
                   rp: perpage,
                   nomsg: getLocale(AspxTagsManagement,"No Records Found!"),
                   param: { aspxCommonObj: aspxCommonObj },
                   current: current_,
                   pnew: offset_,
                   sortcol: { 4: { sorter: false } }
               });
           },
           ExportCustomertagToCsvData: function() {
               CustomerTags.GetCustomerTagsDataForExport();
           },
           ExportCustomertagDetailToCsvData: function() {
               CustomerTags.GetCustomerTagDetailListForExport();
           },
           ExportCustomerTagDataToExcel: function() {
               CustomerTags.GetCustomerTagsDataForExport();
           },

           ExportCustomerTagListDataToExcel: function() {
               CustomerTags.GetCustomerTagDetailListForExport();
           },
           ajaxSuccess: function(data) {
               switch (CustomerTags.config.ajaxCallMode) {
               case 0:
                   break;
               case 1:
                   CustomerTags.BindCustomerTagsExportData(data);
               case 2:
                   CustomerTags.BindShowCustomreTagListExportData(data);
                   break;
               }
           }
       }
       CustomerTags.init();
   });