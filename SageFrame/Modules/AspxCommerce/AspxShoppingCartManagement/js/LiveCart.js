var LiveCart="";
$(function() {

    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    LiveCart = {
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
        ajaxCall: function(config) {
            $.ajax({
                type: LiveCart.config.type,
                contentType: LiveCart.config.contentType,
                cache: LiveCart.config.cache,
                async: LiveCart.config.async,
                url: LiveCart.config.url,
                data: LiveCart.config.data,
                dataType: LiveCart.config.dataType,
                success: LiveCart.ajaxSuccess,
                error: LiveCart.ajaxFailure
            });
        },
        init: function() {
            LiveCart.LoadLiveCartImageStaticImage();
            LiveCart.BindShoppingCartItems(null, null, null);
            $("#btnLiveSearch").live("click", function() {
                LiveCart.SearchLiveShoppingCart();
            });
            $('#txtSearchItemName,#txtCustomerName,#txtQuantity').keyup(function(event) {
                if (event.keyCode == 13) {
                    LiveCart.SearchLiveShoppingCart();
                }
            });
        },
        LoadLiveCartImageStaticImage: function() {
            $('#ajaxLiveCartImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },
        GetCartsDataForExport: function() {
            aspxCommonObj.UserName = null;
            this.config.url = this.config.baseURL + "GetShoppingCartItemsDetails";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, itemName: null, quantity: null, aspxCommonObj: aspxCommonObj, timeToAbandonCart: timeToAbandonCart });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        ExportLiveCartCsvData: function() {
            LiveCart.GetCartsDataForExport();
        },
        ExportLiveCartDataToExcel: function() {
            LiveCart.GetCartsDataForExport();
        },
        BindCartDataForExport: function(msg) {
            var exportData = '<thead><tr><th>'+getLocale(AspxShoppingCartManagement,"Cart ID")+'</th><th>'+getLocale(AspxShoppingCartManagement,"Item ID")+'</th><th>'+getLocale(AspxShoppingCartManagement,"Customer Name")+'</th><th>'+getLocale(AspxShoppingCartManagement,"Item Name")+'</th><th>'+getLocale(AspxShoppingCartManagement,"Quantity")+'</th><th>'+getLocale(AspxShoppingCartManagement,"Price")+'</th><th>'+getLocale(AspxShoppingCartManagement,"Weight")+'</th><th>'+getLocale(AspxShoppingCartManagement,"SKU")+'</th></tr></thead><tbody>';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    exportData += '<tr><td>' + value.CartID + '</td><td>' + value.ItemID + '</td>';
                    exportData += '<td>' + value.UserName + '</td><td>' + value.ItemName + '</td>';
                    exportData += '<td>' + value.Quantity + '</td><td>' + curSymbol + ' ' + value.Price + '</td>';
                    exportData += '<td>' + value.Weight + '</td><td>' + value.SKU + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>'+getLocale(AspxShoppingCartManagement,"No Records Found!")+'</td></tr>';
            }
            exportData += '</tbody>';

            $('#liveCartExportData').html(exportData);
            $("input[id$='hdnLiveCartValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvLiveCartHiddenValue']").val($("#liveCartExportData").table2CSV());
            $("#liveCartExportData").html('');
        },
        BindShoppingCartItems: function(itemNm, userNM, qnty) {
            aspxCommonObj.UserName = userNM;
            this.config.method = "GetShoppingCartItemsDetails";
            this.config.data = { itemName: itemNm, quantity: qnty, aspxCommonObj: aspxCommonObj, timeToAbandonCart: timeToAbandonCart };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvShoppingCart_pagesize").length > 0) ? $("#gdvShoppingCart_pagesize :selected").text() : 10;

            $("#gdvShoppingCart").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxShoppingCartManagement,'Cart ID'), name: 'cart_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'Item ID'), name: 'user_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'Customer Name'), name: 'item_Id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'Item Name'), name: 'item_name', cssclass: 'cssClassLinkHeader', controlclass: 'cssClassGridLink', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'Quantity'), name: 'quantity', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'Price'), name: 'price', cssclass: 'cssClassHeadNumber', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'Weight'), name: 'weight', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxShoppingCartManagement,'SKU'), name: 'SKU', cssclass: '', controlclass: '', coltype: 'label', align: 'left' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxShoppingCartManagement,"No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: {}
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

        },
        ajaxSuccess: function(msg) {
            switch (LiveCart.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    LiveCart.BindCartDataForExport(msg);
                    break;
            }
        },
        SearchLiveShoppingCart: function() {
            var itemNm = $.trim($("#txtSearchItemName").val());
            var userNM = $.trim($("#txtCustomerName").val());
            var qnty = $.trim($("#txtQuantity").val());
            if (itemNm.length < 1) {
                itemNm = null;
            }
            if (userNM.length < 1) {
                userNM = null;
            }
            if (qnty.length < 1) {
                qnty = null;
            }
            LiveCart.BindShoppingCartItems(itemNm, userNM, qnty);
        }
    };
    LiveCart.init();
});