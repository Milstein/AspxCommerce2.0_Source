var ItemTags="";
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    var tagedItemID = '';
    ItemTags = {
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
            ItemTags.LoadItemsTagsStaticImage();
            ItemTags.BindItemTagsDetails();
            ItemTags.HideDiv();
            $("#divItemTagDetails").show();
            $("#btnBack").click(function() {
                ItemTags.HideDiv();
                $("#divItemTagDetails").show();
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: ItemTags.config.type,
                contentType: ItemTags.config.contentType,
                cache: ItemTags.config.cache,
                async: ItemTags.config.async,
                data: ItemTags.config.data,
                dataType: ItemTags.config.dataType,
                url: ItemTags.config.url,
                success: ItemTags.ajaxSuccess,
                error: ItemTags.ajaxFailure
            });
        },
        LoadItemsTagsStaticImage: function() {
            $('#ajaxItemTagsImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
            $('#ajaxItemTagsImage2').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },

        HideDiv: function() {
            $("#divItemTagDetails").hide();
            $("#divShowItemsTagsList").hide();
        },
        GetItemTagsDataForExport: function() {
            this.config.url = this.config.baseURL + "GetItemTagDetailsList";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        BindItemTagsExportData: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxTagsManagement, 'Item Name') + '</th><th>' + getLocale(AspxTagsManagement, 'Number Of Unique Tags') + '</th><th>' + getLocale(AspxTagsManagement, 'Number Of Tags') + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.ItemName + '</td>';
                    exportData += '<td>' + value.NumberOfUniqueTags + '</td><td>' + value.NumberOfTags + '</td></tr>';
                });
            }
            else {
                exportData += '<tr><td>' + getLocale(AspxTagsManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';

            $('#ItemTagsExportDataTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvItemTagHdnValue']").val($("#ItemTagsExportDataTbl").table2CSV());
            $("#ItemTagsExportDataTbl").html('');
        },
        BindItemTagsDetails: function() {
            this.config.method = "GetItemTagDetailsList";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvItemTag_pagesize").length > 0) ? $("#gdvItemTag_pagesize :selected").text() : 10;

            $("#gdvItemTag").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'Item ID', name: 'itemId', cssclass: 'cssClassHide', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxTagsManagement, 'Item Name'), name: 'item_name', cssclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxTagsManagement, 'Number Of Unique Tags'), name: 'number_of_unique_tags', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxTagsManagement, 'Number Of Tags'), name: 'number_of_tags', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxTagsManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', controlclass: '', coltype: 'label', align: 'center' }
    				],

                buttons: [
                    { display: getLocale(AspxTagsManagement, 'View'), name: 'showtags', enable: true, _event: 'click', trigger: '1', callMethod: 'ItemTags.ShowItemTagsList', arguments: '1,2,3' }
    			    ],
                rp: perpage,
                nomsg: getLocale(AspxTagsManagement, "No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj },
                current: current_,
                pnew: offset_,
                sortcol: { 4: { sorter: false} }
            });
        },

        ShowItemTagsList: function(tblID, argus) {
            switch (tblID) {
                case "gdvItemTag":
                    $("#" + lblShowItemTagHeading).html(" Tags submitted for: '" + argus[3] + "'");
                    ItemTags.BindItemsTagsList(argus[0]);
                    tagedItemID = argus[0];
                    ItemTags.HideDiv();
                    $("#divShowItemsTagsList").show();
                    break;
            }
        },
        GetItemTagDetailListForExport: function() {
            this.config.url = this.config.baseURL + "ShowItemTagList";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, itemID: tagedItemID, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        BindShowCustomreTagListExportData: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxTagsManagement, 'Tag Name') + '</th><th>' + getLocale(AspxTagsManagement, 'Tag Use') + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.Tag + '</td>';
                    exportData += '</td><td>' + value.TagUse + '</td></tr>';
                });
            }
            else {
                exportData += '<tr><td>' + getLocale(AspxTagsManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';

            $('#ShowItemTagListExportDataTbl').html(exportData);
            $("input[id$='HdnGridData']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvItemTagDetailHdnValue']").val($("#ShowItemTagListExportDataTbl").table2CSV());
            $("#ShowItemTagListExportDataTbl").html('');
        },
        BindItemsTagsList: function(itemId) {
            //var itemId = argus[0];
            this.config.method = "ShowItemTagList";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvShowItemTagsList_pagesize").length > 0) ? $("#gdvShowItemTagsList_pagesize :selected").text() : 10;

            $("#gdvShowItemTagsList").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxTagsManagement, 'Tag Name'), name: 'tag_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxTagsManagement, 'Tag Use'), name: 'tag_use', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxTagsManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', controlclass: '', coltype: 'label', align: 'center', hide: true }
    				],

                buttons: [
    			    ],
                rp: perpage,
                nomsg: getLocale(AspxTagsManagement, "No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj, itemID: itemId },
                current: current_,
                pnew: offset_,
                sortcol: { 2: { sorter: false} }
            });
        },
        ExportItemTagToCsvData: function() {
            ItemTags.GetItemTagsDataForExport();
        },
        ExportItemTagDetailToCsvData: function() {
            ItemTags.GetItemTagDetailListForExport();
        },
        ExportDataToExcelItemTags: function() {
            ItemTags.GetItemTagsDataForExport();
        },
        ExportDivDataToExcelItemTags: function() {
            ItemTags.GetItemTagDetailListForExport();
        },
        ajaxSuccess: function(data) {
            switch (ItemTags.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    ItemTags.BindItemTagsExportData(data);
                case 2:
                    ItemTags.BindShowCustomreTagListExportData(data);
                    break;
            }
        }
    }
    ItemTags.init();
});