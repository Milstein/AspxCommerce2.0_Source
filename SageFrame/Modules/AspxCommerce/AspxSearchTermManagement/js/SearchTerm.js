var SearchTerm = "";

$(function() {
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var customerId = AspxCommerce.utils.GetCustomerID();
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var sessionCode = AspxCommerce.utils.GetSessionCode();
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var aspxCommonObj = {
        StoreID: storeId,
        PortalID: portalId,
        UserName: userName,
        CultureName: cultureName
    };
    SearchTerm = {
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
            SearchTerm.LoadSearchTermStaticImage();
            SearchTerm.GetSearchTermDetails(null);
            $("#btnDeleteAllSearchTerm").click(function() {
                var searchTermIds = '';
                $(".searchTermCheckbox").each(function() {
                    if ($(this).attr("checked")) {
                        searchTermIds += $(this).val() + ',';
                    }
                });
                if (searchTermIds == "") {
                    csscody.alert('<h2>'+getLocale(AspxSearchTermManagement,"Information Alert")+'</h2><p>'+getLocale(AspxSearchTermManagement,"Please select at least search term(s) before delete.")+'</p>');
                   return false;
                }
                var properties = {
                    onComplete: function(e) {
                        SearchTerm.DeleteSearchTerm(searchTermIds, e);
                    }
                };
                csscody.confirm("<h2>"+getLocale(AspxSearchTermManagement,"Delete Confirmation")+"</h2><p>"+getLocale(AspxSearchTermManagement,"Are you sure you want to delete selected search term(s)?")+"</p>", properties);

            });
            $("#btnSearchTerm").click(function() {
                SearchTerm.SearchTerm();
            });
            $('#txtSearchTerm').keyup(function(event) {
                if (event.keyCode == 13) {
                    $("#btnSearchTerm").click();
                }
            });
            $("#" + btnExportToExcel).click(function() {
                SearchTerm.ExportSearchDataToExcel();
            });
        },
        LoadSearchTermStaticImage: function() {
            $('#ajaxSearchTermImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },

        ajaxCall: function(config) {
            $.ajax({
                type: SearchTerm.config.type,
                contentType: SearchTerm.config.contentType,
                cache: SearchTerm.config.cache,
                async: SearchTerm.config.async,
                url: SearchTerm.config.url,
                data: SearchTerm.config.data,
                dataType: SearchTerm.config.dataType,
                success: SearchTerm.ajaxSuccess,
                error: SearchTerm.ajaxFailure
            });
        },
        GetSearchDataForExport: function() {
            this.config.url = this.config.baseURL + "ManageSearchTerms";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj, searchTerm: null });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },

        ExportSearchDataToExcel: function() {
            SearchTerm.GetSearchDataForExport();
        },

        GetSearchTermDetails: function(searchTerm) {
            this.config.method = "ManageSearchTerms";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvSearchTerm_pagesize").length > 0) ? $("#gdvSearchTerm_pagesize :selected").text() : 10;

            $("#gdvSearchTerm").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                     { display:getLocale(AspxSearchTermManagement,'SearchTermID'), name:'search_term_id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'searchTermCheckbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                     { display: getLocale(AspxSearchTermManagement,'Search Term'), name: 'search_term', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxSearchTermManagement,'No Of Use'), name: 'no_of_use', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxSearchTermManagement,'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                 ],
                buttons: [
                // { display: 'Edit', name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'EditSearchTerms',arguments: '2,3,5' },
                     {display:getLocale(AspxSearchTermManagement,'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'SearchTerm.DeleteSearchTerms', arguments: '' }
                 ],
                rp: perpage,
                nomsg: getLocale(AspxSearchTermManagement,"No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj, searchTerm: searchTerm },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 3: { sorter: false} }
            });
        },

        DeleteSearchTerms: function(tblID, argus) {
            switch (tblID) {
                case "gdvSearchTerm":
                    var properties = {
                        onComplete: function(e) {
                            SearchTerm.DeleteSearchTerm(argus[0], e);
                        }
                    };
                    csscody.confirm("<h2>"+getLocale(AspxSearchTermManagement,"Delete Confirmation")+"</h2><p>"+getLocale(AspxSearchTermManagement,"Are you sure you want to delete this search term?")+"</p>", properties);
                    break;
                default:
                    break;
            }
        },

        DeleteSearchTerm: function(Ids, event) {
            if (event) {
                this.config.url = this.config.baseURL + "DeleteSearchTerm";
                this.config.data = JSON2.stringify({ searchTermID: Ids, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
            }
            return false;
        },

        SearchTerm: function() {
            var search = $.trim($("#txtSearchTerm").val());
            if (search.length < 1) {
                search = null;
            }
            SearchTerm.GetSearchTermDetails(search);
        },
        BindDataForExport: function(msg) {
            var exportData = '<thead><tr><th>'+getLocale(AspxSearchTermManagement,"Search Term")+'</th><th>'+getLocale(AspxSearchTermManagement,"No Of Use")+'</th></tr></thead><tbody>';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    exportData += '<tr><td>' + value.SearchTerm + '</td><td>' + value.Count + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>'+getLocale(AspxSearchTermManagement,"No Records Found!")+'</td></tr>';
            }
            exportData += '</tbody>';

            $('#searchDataExportTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvHiddenValue']").val($("#searchDataExportTbl").table2CSV());
            $("#searchDataExportTbl").html('');
        },
        ajaxSuccess: function(msg) {
            switch (SearchTerm.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    SearchTerm.GetSearchTermDetails(null);
                    csscody.info("<h2>"+getLocale(AspxSearchTermManagement,"Successful Message")+"</h2><p>"+getLocale(AspxSearchTermManagement,"Search term has been deleted successfully.")+"</p>");
                    break;
                case 2:
                    SearchTerm.BindDataForExport(msg);
                    break;
            }
        }
    };
  SearchTerm.init();
});