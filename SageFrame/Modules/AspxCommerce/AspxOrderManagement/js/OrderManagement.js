var OrderManage;
$(function() {
    var isInstalled = false;
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    var senderEmail = '<%=SenderEmail %>';
    var msgbody = '';
    var oid = 0;
    OrderManage = {
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
        LoadOrderRssImage: function() {
            var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
            $('#orderRssImage').parent('a').show();
            $('#orderRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=neworders');
            $('#orderRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
            $('#orderRssImage').removeAttr('title').attr('title', +getLocale(AspxOrderManagement, 'New Order Rss Feed'));
            $('#orderRssImage').removeAttr('alt').attr('alt', +getLocale(AspxOrderManagement, 'New Order Rss Feed'));
        },
        IsModuleInstalled: function() {
            var rewardPoints = 'AspxRewardPoints';
            $.ajax({
                type: "POST",
                url: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/" + "GetModuleInstallationInfo",
                data: JSON2.stringify({ moduleFriendlyName: rewardPoints, aspxCommonObj: aspxCommonObj }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function(response) {
                    isInstalled = response.d;
                },
                error: function() {
                    //csscody.error('<h2>' + getLocale(AspxCheckoutWithSingleAddress, 'Error Message') + '</h2><p>' + getLocale(AspxCheckoutWithSingleAddress, 'Failed to load module installation information!.') + '</p>');
                }
            });
        },
        init: function() {
            OrderManage.HideAll();
            $("#divOrderDetails").show();
            OrderManage.BindOrderDetails(null, null);
            OrderManage.GetOrderStatus();
            $("#btnBack").click(function() {
                OrderManage.HideAll();
                $("#divOrderDetails").show();
            });

            $("#btnCreateShippingLabel").click(function() {
                if (wareHouseAddress != "null") {
                    var url = aspxRedirectPath;
                    var page = "Admin/Shipping-Label";
                    var ext = pageExtension + "?oid=" + oid;
                    url = url + page + ext;
                    window.location.href = url;
                    //window.open(url, "Shipping Label", "height=100%,width=500");
                } else {
                    csscody.alert('<h2>' + getLocale(AspxOrderManagement, 'Information Message') + '</h2><p>' + getLocale(AspxOrderManagement, 'Please add Warehouse address before shipping !') + '</p>');
                }
            });

            $("#btnSPBack").click(function() {
                OrderManage.HideAll();
                $("#divOrderDetails").show();
                $("#hdnReceiverEmail").val('');
            });
            $("#btnUpdateOrderStatus").click(function() {
                var orderId = $("#hdnOrderID").val();
                OrderManage.SaveorderStatus(orderId);
                //                if (!$("#hdnReceiverEmail").val()) {
                //                    OrderManage.SaveorderStatus(orderId);
                //                } else {
                //                    OrderManage.SaveorderStatus(orderId);
                //                    OrderManage.NotifyOrderStatusUpdate(orderId);
                //                }
            });
            $('#txtCustomerName,#ddlOrderStatus').keyup(function(event) {
                if (event.keyCode == 13) {
                    OrderManage.SearchOrders();
                }
            });
            if (newOrderRss.toLowerCase() == 'true') {
                OrderManage.LoadOrderRssImage();
            }
        },
        ajaxCall: function(config) {
            $.ajax({
                type: OrderManage.config.type,
                contentType: OrderManage.config.contentType,
                cache: OrderManage.config.cache,
                async: OrderManage.config.async,
                data: OrderManage.config.data,
                dataType: OrderManage.config.dataType,
                url: OrderManage.config.url,
                success: OrderManage.ajaxSuccess,
                error: OrderManage.ajaxFailure
            });
        },
        HideAll: function() {
            $("#divOrderDetails").hide();
            $("#divOrderDetailForm").hide();
            $("#divEditOrderStatus").hide();
        },
        GetDataForExport: function() {
            aspxCommonObj.UserName = null;
            this.config.url = this.config.baseURL + "GetOrderDetails";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, orderStatusName: null, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
        },
        ExportOrdersToCsvData: function() {
            OrderManage.GetDataForExport();
        },
        ExportDivDataToExcel: function() {
            OrderManage.GetDataForExport();
        },

        BindOrderDetails: function(customerNm, orderStatusType) {
            this.config.method = "GetOrderDetails";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvOrderDetails_pagesize").length > 0) ? $("#gdvOrderDetails_pagesize :selected").text() : 10;
            aspxCommonObj.UserName = customerNm;
            $("#gdvOrderDetails").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxOrderManagement, 'Order ID'), name: 'order_id', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement, 'Invoice Number'), name: 'invoice_number', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement, 'CustomerID'), name: 'customerID', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement, 'Customer Name'), name: 'customer_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement, 'Email'), name: 'email', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement, 'Order Status'), name: 'order_status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement, 'Grand Total'), name: 'grand_total', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxOrderManagement, 'Payment Gateway Type Name'), name: 'payment_gateway_typename', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement, 'Payment Method Name'), name: 'payment_method_name', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement, 'Ordered Date'), name: 'ordered_date', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],

                buttons: [
                    { display: getLocale(AspxOrderManagement, 'View'), name: 'view', enable: true, _event: 'click', trigger: '3', callMethod: 'OrderManage.ViewOrders' },
                    { display: getLocale(AspxOrderManagement, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'OrderManage.EditOrders', arguments: '1,2,3,4,5,6,7,8,9,10' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxOrderManagement, "No Records Found!"),
                param: { orderStatusName: orderStatusType, aspxCommonObj: aspxCommonObj },
                current: current_,
                pnew: offset_,
                sortcol: { 10: { sorter: false} }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        ViewOrders: function(tblID, argus) {
            switch (tblID) {
                case "gdvOrderDetails":
                    OrderManage.HideAll();
                    oid = argus[0];
                    $('#' + lblOrderForm1).html("Order ID: " + argus[0]);
                    $("#divOrderDetailForm").show();
                    OrderManage.BindAllOrderDetailsForm(argus[0]);
                    break;
                default:
                    break;
            }
        },

        EditOrders: function(tblID, argus) {
            switch (tblID) {
                case "gdvOrderDetails":
                    OrderManage.HideAll();
                    $("#divEditOrderStatus").show();
                    $("#customerNameEdit").html(argus[5]);
                    $("#spanOrderDate").html(argus[11]);
                    $("#OrderGrandTotal").html(argus[8]);
                    $('#selectStatus').val($('#ddlOrderStatus option:contains(' + argus[7] + ')').attr('value'));
                    $("#hdnOrderID").val(argus[0]);
                    $("#hdnReceiverEmail").val(argus[6]);
                    $("#hdnInvoice").val(argus[3]);
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    break;
            }
        },

        SaveorderStatus: function(orderId) {
            AspxCommerce.CheckSessionActive(aspxCommonObj);
            if (AspxCommerce.vars.IsAlive) {
                var StatusID = $("#selectStatus").val();
                this.config.url = this.config.baseURL + "SaveOrderStatus";
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, orderStatusID: StatusID, orderID: orderId });
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
            } else {
                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
            }
        },

        getItemInvoiceDetail: function(orderId) {
            //OrderManage.vars.orderStatusName = $('#selectStatus option:selected').text();
            aspxCommonObj.UserName = AspxCommerce.utils.GetUserName();
            this.config.url = this.config.baseURL + "GetInvoiceDetailsByOrderID";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, orderID: orderId });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);

        },

        NotifyOrderStatusUpdate: function(orderId) {
            OrderManage.getItemInvoiceDetail(orderId);
        },

        BindAllOrderDetailsForm: function(argus) {
            var orderId = argus;
            this.config.url = this.config.baseURL + "GetAllOrderDetailsForView";
            this.config.data = JSON2.stringify({ orderId: orderId, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);
        },

        GetOrderStatus: function() {
            this.config.url = this.config.baseURL + "GetStatusList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 4;
            this.ajaxCall(this.config);
        },
        BindDataForExport: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxOrderManagement, 'Order ID') + '</th><th>' + getLocale(AspxOrderManagement, 'Invoice Number') + '</th><th>' + getLocale(AspxOrderManagement, 'Customer ID') + '</th><th>' + getLocale(AspxOrderManagement, 'Customer Name') + '</th><th>' + getLocale(AspxOrderManagement, 'Email') + '</th><th>' + getLocale(AspxOrderManagement, 'Order Status') + '</th><th>' + getLocale(AspxOrderManagement, 'Grand Total') + '</th><th>' + getLocale(AspxOrderManagement, 'Payment Gateway Type Name') + '</th><th>' + getLocale(AspxOrderManagement, 'Payment Method Name') + '</th><th>' + getLocale(AspxOrderManagement, 'Ordered Date') + '</th></tr><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.OrderID + '</td><td>' + value.InVoiceNumber + '</td>';
                    exportData += '<td>' + value.CustomerID + '</td><td>' + value.UserName + '</td>';
                    exportData += '<td>' + value.Email + '</td><td>' + value.OrderStatus + '</td>';
                    exportData += '<td>' + curSymbol + ' ' + value.GrandTotal + '</td><td>' + value.PaymentGatewayTypeName + '</td>';
                    exportData += '<td>' + value.PaymentMethodName + '</td><td>' + value.OrderedDate + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxOrderManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';
            $('#orderExportData').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvOrderHdnValue']").val($('#orderExportData').table2CSV());
            $('#orderExportData').html('');
        },
        SearchOrders: function() {
            var customerNm = $.trim($("#txtCustomerName").val());
            var orderStatusType = '';
            if (customerNm.length < 1) {
                customerNm = null;
            }
            if ($("#ddlOrderStatus").val() == "0") {
                orderStatusType = null;
            } else {
                orderStatusType = $("#ddlOrderStatus option:selected").text();
            }
            OrderManage.BindOrderDetails(customerNm, orderStatusType);
        },
        ajaxSuccess: function(data) {
            switch (OrderManage.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    OrderManage.BindOrderDetails(null, null);
                    // csscody.info("<h2>Sucess Message</h2><p>Order status updated successfully.</p>");
                    var orderId = $("#hdnOrderID").val();
                    if (data.d) {
                        OrderManage.NotifyOrderStatusUpdate(orderId);
                    } else {
                        csscody.alert('<h2>' + getLocale(AspxOrderManagement, 'Information Message') + '</h2><p>' + getLocale(AspxOrderManagement, 'Failed to update order status and Failed to send email to the customer!') + '</p>');
                    }
                    OrderManage.HideAll();
                    $("#divOrderDetails").show();

                    break;
                case 2:
                    var orderStatusName = $('#selectStatus option:selected').text();
                    //var param = JSON2.stringify({ storeID: storeId, portalID: portalId, cultureName: cultureName, orderID: orderId });
                    var additional = "";
                    var billingshipping = "";
                    var itemDetails = "";
                    var itemOrderDetails = "";
                    var span = '';
                    var span1 = '';
                    var orderID = 0;
                    if (data.d.length > 0) {
                        $.each(data.d, function(index, item) {
                            if (index == 0) {
                                additional += orderStatusName + "#";
                                additional += storeName + "#";
                                additional += item.StoreDescription + "#";
                                additional += $('#customerNameEdit').html() + "#";
                                additional += item.OrderID + "#";
                                additional += item.PaymentMethodName + "#";
                                if (item.IsMultipleShipping != true) {
                                    additional += item.ShippingMethodName + "#";
                                } else {
                                    additional += 'Multiple Shipping Exist' + "#";
                                }
                                additional += $("#hdnInvoice").val();

                                span = ' <table cellspacing="1" cellpadding="1" border="0" align="left" width="300"> <tbody> <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: bold 14px Arial, Helvetica, sans-serif;"> <strong>' + getLocale(AspxOrderManagement, 'Billing To:') + '</strong> </td> </tr>';
                                if ($.trim(item.BillingName) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.BillingName) + '</td></tr>';

                                if ($.trim(item.Address1) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Address1) + '</td></tr>';

                                if ($.trim(item.Address2) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Address2) + '</td></tr>';

                                if ($.trim(item.Company) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Company) + '</td></tr>';

                                if ($.trim(item.City) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.City) + '</td></tr>';

                                if ($.trim(item.State) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.State) + '</td></tr>';

                                if ($.trim(item.Zip) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Zip) + '</td></tr>';
                                if ($.trim(item.Country) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Country) + '</td></tr>';

                                if ($.trim(item.Email) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Email) + '</td></tr>';

                                if ($.trim(item.Phone) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Phone) + '</td></tr>';

                                if ($.trim(item.Mobile) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Mobile) + '</td></tr>';

                                if ($.trim(item.Fax) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Fax) + '</td></tr>';

                                if ($.trim(item.Website) != "")
                                    span += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.Website) + '</td></tr>';

                                span += "</table>";
                                if (item.IsMultipleShipping != true) {
                                    span1 = '<table cellspacing="1" cellpadding="1" border="0" align="left" width="280"> <tbody> <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: bold 14px Arial, Helvetica, sans-serif;"> Shipping To: </td> </tr>';
                                    if ($.trim(item.ShippingName) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShippingName) + '</td></tr>';

                                    if ($.trim(item.ShipAddress1) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipAddress1) + '</td></tr>';

                                    if ($.trim(item.ShipAddress2) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipAddress2) + '</td></tr>';

                                    if ($.trim(item.ShipCompany) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipCompany) + '</td></tr>';

                                    if ($.trim(item.ShipCity) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipCity) + '</td></tr>';

                                    if ($.trim(item.ShipState) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipState) + '</td></tr>';

                                    if ($.trim(item.ShipZip) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipZip) + '</td></tr>';

                                    if ($.trim(item.ShipCountry) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipCountry) + '</td></tr>';

                                    if ($.trim(item.ShipEmail) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipEmail) + '</td></tr>';

                                    if ($.trim(item.ShipPhone) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipPhone) + '</td></tr>';

                                    if ($.trim(item.ShipMobile) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipMobile) + '</td></tr>';

                                    if ($.trim(item.ShipFax) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipFax) + '</td></tr>';

                                    if ($.trim(item.ShipWebsite) != "")
                                        span1 += ' <tr> <td style="border-bottom: thin dashed #d1d1d1; padding: 10px 0 5px 10px; font: normal 12px Arial, Helvetica, sans-serif">' + $.trim(item.ShipWebsite) + '</td></tr>';

                                    // var itemOrderDetails = '<table cellspacing="0" cellpadding="0" border="0" width="620" style="border: 1px solid #dcdccc;"><thead><tr style="background: #e5e5de;"> <td width="383" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Item Name</strong> </td> <td width="46" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Price</strong> </td> <td width="89" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Qty</strong> </td> <td width="100" style="padding: 10px; padding-left: 5px"> <strong>Subtotal</strong> </td> </tr> </thead>';
                                    span1 += "</table>";
                                    itemOrderDetails = ' <table cellspacing="0" cellpadding="0" border="0" width="620" style="border: 1px solid #dcdccc;"> <tbody> <tr style="background: #e5e5de;"><td width="50" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Item Image</strong> </td> <td width="333" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Item Name</strong> </td><td width="46" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Price</strong> </td> <td width="89" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Qty</strong> </td> <td width="100" style="padding: 10px; padding-left: 5px"> <strong>Line Total</strong> </td> </tr> ';
                                    // var itemOrderDetails = '<table width="100%" border="0"  cellpadding="0" cellspacing="1" style="" ><thead ><tr ><th ><b>ItemName</b></th><th ><b>Price</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>Quantity</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>SubTotal</b></th></td></tr></thead><tbody>';
                                    $.each(data.d, function(index, item) {
                                        var cv = "";
                                        if (item.CostVariants != "") {
                                            cv = "(" + item.CostVariants + ")";
                                        }
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f"><img height="81" width="123" src="' + serverHostLoc + aspxRootPath + item.ImagePath.replace('uploads', 'uploads/Small') + '" alt="' + item.ItemName + '" title="' + item.ItemName + '" /></td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + item.ItemName + cv + '</td>';
                                        itemOrderDetails += '<td  style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f">' + item.Price.toFixed(2) + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + item.Quantity + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + item.SubTotal.toFixed(2) + '</td></tr>';
                                    });
                                    if (index == 0) {
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;" rowspan="5" colspan="3"> &nbsp; </td> <td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;"> ' + getLocale(AspxOrderManagement, ' Line Total') + ' </td> ';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.GrandSubTotal.toFixed(2) + ' </td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;"> ' + getLocale(AspxOrderManagement, 'Taxes') + ' </td> ';
                                        //<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;" rowspan="4" colspan="2"> &nbsp; </td> 
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.TaxTotal.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, 'Shipping Cost') + ' </td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.ShippingCost.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, 'Discount') + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.DiscountAmount.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, 'Coupon') + ' </td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.CouponAmount.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="padding: 5px; border-right: 1px solid #dcdccc;" colspan="3"> &nbsp; </td> <td style="padding: 5px; border-right: 1px solid #dcdccc; font: bold 14px Arial, Helvetica, sans-serif; color: #000;">' + getLocale(AspxOrderManagement, 'Total Cost') + '</td>';
                                        itemOrderDetails += ' <td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f">' + item.GrandTotal.toFixed(2) + '</td></tr>';
                                    }
                                    itemOrderDetails += '</table>';
                                } else {
                                    itemOrderDetails = ""; //'<table style="border:1px solid #e6e6e6;" width="80%" border="0" cellspacing="1" cellpadding="0"><thead><tr  width="70%" style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><th><b>ItemName</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>Price</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial"  ><b>Quantity</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>Shipping Method</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>Shipping To</b></th><thstyle="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>SubTotal</b></th></tr></thead><tbody style="background-color: rgb(255, 255, 255);">';
                                    itemOrderDetails = '<table cellspacing="0" cellpadding="0" border="0" width="620" style="border: 1px solid #dcdccc;"><thead><tr style="background: #e5e5de;"><td width="50" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Item Image</strong> </td><td width="333" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Item Name</strong> </td><td width="46" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Price</strong> </td> <td width="89" style="padding: 10px; border-right: 1px solid #dcdccc; padding-left: 5px"> <strong>Qty</strong> </td> <td width="100" style="padding: 10px; padding-left: 5px"> <strong>Shipping Method</strong> </td> <td width="100" style="padding: 10px; padding-left: 5px"> <strong>Shipping To</strong> </td> <td width="100" style="padding: 10px; padding-left: 5px"> <strong>Line Total</strong> </td> </tr> </thead>';
                                    // var itemOrderDetails = '<table width="100%" border="0"  cellpadding="0" cellspacing="1" style="" ><thead ><tr ><th ><b>ItemName</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>Price</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>Quantity</b></th><th style="background-color:#eeeeee;padding:6px 10px;white-space:nowrap;font-size:12px;font-family:Arial" ><b>SubTotal</b></th></td></tr></thead><tbody>';
                                    $.each(msg.d, function(index, item) {
                                        var cv = "";
                                        if (item.CostVariants != "") {
                                            cv = "(" + item.CostVariants + ")";
                                        }
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f"><img height="81" width="123" src="' + serverHostLoc + aspxRootPath + item.ImagePath.replace('uploads', 'uploads/Small') + '" alt="' + item.ItemName + '" title="' + item.ItemName + '" /></td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + item.ItemName + cv + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + item.Price.toFixed(2) + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f">' + item.Quantity + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + item.ShippingMethodName + '</td>';
                                        var shippingDetails = "";
                                        if ($.trim(item.ShippingName) != "")
                                            shippingDetails += "<br/>" + $.trim(item.ShippingName);

                                        if ($.trim(item.ShipAddress1) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipAddress1);

                                        if ($.trim(item.ShipAddress2) != "")
                                            shippingDetails += "," + $.trim(item.ShipAddress2);

                                        if ($.trim(item.ShipCompany) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipCompany);

                                        if ($.trim(item.ShipCity) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipCity);

                                        if ($.trim(item.ShipState) != "")
                                            shippingDetails += "," + $.trim(item.ShipState);

                                        if ($.trim(item.ShipZip) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipZip);

                                        if ($.trim(item.ShipCountry) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipCountry);

                                        if ($.trim(item.ShipEmail) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipEmail);

                                        if ($.trim(item.ShipPhone) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipPhone);

                                        if ($.trim(item.ShipMobile) != "")
                                            shippingDetails += ", " + $.trim(item.ShipMobile);

                                        if ($.trim(item.ShipFax) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipFax);

                                        if ($.trim(item.ShipWebsite) != "")
                                            shippingDetails += ",<br/>" + $.trim(item.ShipWebsite);

                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f" >' + shippingDetails + "</td>";
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f"  >' + item.SubTotal.toFixed(2) + "</td></tr>";
                                    });

                                    if (index == 0) {
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;" rowspan="5" colspan="5"> &nbsp; </td> <td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;"> Line Total </td> ';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.GrandSubTotal.toFixed(2) + ' </td></tr>';

                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, ' Taxes') + ' </td> ';
                                        //<td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;" rowspan="4" colspan="2"> &nbsp; </td> 
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.TaxTotal.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, 'Shipping Cost ') + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.TotalShippingCost.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, 'Discount') + '</td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.DiscountAmount.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc;">' + getLocale(AspxOrderManagement, 'Coupon') + ' </td>';
                                        itemOrderDetails += '<td style="border-bottom: 1px solid #dcdccc; padding: 5px;"> ' + item.CouponAmount.toFixed(2) + '</td></tr>';
                                        itemOrderDetails += '<tr><td style="padding: 5px; border-right: 1px solid #dcdccc;" colspan="5"> &nbsp; </td> <td style="padding: 5px; border-right: 1px solid #dcdccc; font: bold 14px Arial, Helvetica, sans-serif; color: #000;">' + getLocale(AspxOrderManagement, 'Total Cost') + '</td>';
                                        itemOrderDetails += ' <td style="border-bottom: 1px solid #dcdccc; padding: 5px; border-right: 1px solid #dcdccc; color: #605f5f">' + item.GrandTotal.toFixed(2) + '</td></tr>';
                                    }
                                    itemOrderDetails += '</table>';
                                }

                                //                                if (span1.startsWith("<br/> <b>Shipping To: </b>")) {
                                //                                    span1 = "";
                                //                                }
                                billingshipping = span + '</td><td width="280" valign="top" style="border: 1px solid #dcdccc; border-right: none;border-bottom: none; float: right">' +
                                span1;
                                itemDetails = itemOrderDetails;
                            }
                        });

                        var FromEmail = senderEmail;
                        var receiverEmail = $("#hdnReceiverEmail").val();
                        var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj, receiverEmail: receiverEmail, billingShipping: billingshipping, itemTable: itemDetails, additionalFields: additional, templateName: templatename });

                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/NotifyOrderStatusUpdate",
                            data: param,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function() {
                                csscody.info('<h2>' + getLocale(AspxOrderManagement, 'Information Message') + '</h2><p>' + getLocale(AspxOrderManagement, 'The order status had been updated and confirmation email has been send to the customer successfully!') + '</p>');
                            },
                            error: function() {
                                csscody.alert('<h2>' + getLocale(AspxOrderManagement, 'Information Message') + '</h2><p>' + getLocale(AspxOrderManagement, 'The order status has been updated but failed to send email to the customer!') + '</p>');
                            }
                        });
                    }
                    break;
                case 3:
                    OrderManage.IsModuleInstalled();
                    var elements = '';
                    var tableElements = '';
                    var grandTotal = '';
                    var couponAmount = '';
                    var rewardAmount = '';
                    var subTotal = '';
                    var taxTotal = '';
                    var giftCard = '';
                    var shippingCost = '';
                    var discountAmount = '';
                    var additionalNote = "";
                    $.each(data.d, function(index, value) {
                        Array.prototype.clean = function(deleteValue) {
                            for (var i = 0; i < this.length; i++) {
                                if (this[i] == deleteValue) {
                                    this.splice(i, 1);
                                    i--;
                                }
                            }
                            return this;
                        };
                        if (index < 1) {
                            var billAdd = '';
                            var arrBill;
                            arrBill = value.BillingAddress.split(',');
                            billAdd += '<li><h4>' + getLocale(AspxOrderManagement, 'Billing Address :') + '</h4></li>';
                            billAdd += '<li>' + arrBill[0] + ' ' + arrBill[1] + '</li>';
                            billAdd += '<li>' + arrBill[2] + '</li><li>' + arrBill[3] + '</li><li>' + arrBill[4] + '</li>';
                            billAdd += '<li>' + arrBill[5] + ' ' + arrBill[6] + ' ' + arrBill[7] + '</li><li>' + arrBill[8] + '</li><li>' + arrBill[9] + ', ' + arrBill[10] + '</li><li>' + arrBill[11] + '</li><li>' + arrBill[12] + '</li>';
                            $("#divOrderDetailForm").find('ul').html(billAdd);
                            $("#OrderDate").html(value.OrderedDate);
                            $("#invoiceNo").html(value.InVoiceNumber);
                            //   $("#PaymentGatewayType").html(value.PaymentGatewayTypeName);
                            $("#PaymentMethod").html(value.PaymentMethodName);
                            additionalNote = value.Remarks;
                            $("#storeName").html(storeName);
                            $("#storeDescription").html(value.StoreDescription);
                            if (value.OrderType == 2) {
                                $("#btnCreateShippingLabel").hide();
                            } else {
                                $("#btnCreateShippingLabel").show();
                            }
                        }
                        tableElements += '<tr>';
                        tableElements += '<td>' + value.SKU + '</td>';
                        if (value.CostVariants != "") {
                            tableElements += '<td>' + value.ItemName + '<br/>' + '(' + value.CostVariants + ')' + '</td>';
                        } else {
                            tableElements += '<td>' + value.ItemName + '<br/></td>';
                        }
                        var shippingAddress = new Array();
                        var shipAdd = '';
                        if (value.ShippingAddress != "N/A") {
                            shippingAddress = value.ShippingAddress.split(",");
                            // shippingAddress.clean(" "); // for removing blank space but now it is done by $.trim()
                            if ($.trim(shippingAddress[0]) != '')
                                shipAdd = $.trim(shippingAddress[0]) + '</br>';
                            if ($.trim(shippingAddress[1]) != '')
                                shipAdd += $.trim(shippingAddress[1]) + '</br>';
                            if ($.trim(shippingAddress[2]) != '')
                                shipAdd += $.trim(shippingAddress[2]) + '</br>';
                            if ($.trim(shippingAddress[3]) != '')
                                shipAdd += $.trim(shippingAddress[3]) + '</br>';
                            if ($.trim(shippingAddress[4]) != '')
                                shipAdd += $.trim(shippingAddress[4]) + ' ';
                            if ($.trim(shippingAddress[5]) != '')
                                shipAdd += $.trim(shippingAddress[5]) + ' ';
                            if ($.trim(shippingAddress[6]) != '')
                                shipAdd += $.trim(shippingAddress[6]) + '</br>';
                            if ($.trim(shippingAddress[7]) != '')
                                shipAdd += $.trim(shippingAddress[7]) + '</br>';
                            if ($.trim(shippingAddress[8]) != '')
                                shipAdd += $.trim(shippingAddress[8]) + '</br>';
                            if ($.trim(shippingAddress[9]) != '')
                                shipAdd += $.trim(shippingAddress[9]) + ' ';
                            if ($.trim(shippingAddress[10]) != '')
                                shipAdd += $.trim(shippingAddress[10]) + '</br>';
                            if ($.trim(shippingAddress[11]) != '')
                                shipAdd += $.trim(shippingAddress[11]) + '</br>';
                            if ($.trim(shippingAddress[12]) != '')
                                shipAdd += $.trim(shippingAddress[12]);
                        } else {
                            shipAdd = value.ShippingAddress.split(",");
                        }
                        tableElements += '<td>' + value.ShippingMethod + '</td>';
                        tableElements += '<td>' + shipAdd + '</td>';
                        tableElements += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.ShippingRate.toFixed(2) + '</span></td>';
                        tableElements += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.Price.toFixed(2) + '</span></td>';
                        tableElements += '<td class="cssOrderItemQuantity">' + value.Quantity + '</td>';
                        tableElements += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + (value.Price * value.Quantity).toFixed(2) + '</span></td>';
                        tableElements += '</tr>';
                        if (index == 0) {
                            subTotal = '<tr>';
                            subTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Sub Total :') + '</b></td>';
                            subTotal += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + (value.GrandSubTotal).toFixed(2) + '</span></td>';
                            subTotal += '</tr>';

                            var orderID = value.OrderID;
                            $.ajax({
                                type: "POST",
                                url: aspxservicePath + "AspxCommerceWebService.asmx/GetTaxDetailsByOrderID",
                                data: JSON2.stringify({ orderId: orderID, aspxCommonObj: aspxCommonObj }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                async: false,
                                success: function(msg) {
                                    $.each(msg.d, function(index, val) {
                                        if (val.TaxSubTotal != 0) {
                                            taxTotal += '<tr>';
                                            taxTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>' + val.TaxManageRuleName + ':' + '</b></td>';
                                            taxTotal += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + (val.TaxSubTotal).toFixed(2) + '</span></td>';
                                            taxTotal += '</tr>';
                                        }
                                    });

                                }

                            });
                            //taxTotal = '<tr>';
                            //taxTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>'+ htmlTaxRuleName +'</b></td>';
                            //taxTotal += '<td><span class="cssClassFormatCurrency" >' + htmlTaxRateValue + '</span></td>';
                            //taxTotal += '</tr>';
                            shippingCost = '<tr>';
                            shippingCost += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Shipping Cost :') + '</b></td>';
                            shippingCost += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.TotalShippingCost.toFixed(2) + '</span></td>';
                            shippingCost += '</tr>';
                            discountAmount = '<tr>';
                            discountAmount += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Discount Amount :') + '</b></td>';
                            discountAmount += '<td class="cssClassAlignRight"><span class="cssClassMinus"> - </span><span class="cssClassFormatCurrency" >' + value.DiscountAmount.toFixed(2) + '</span></td>';
                            discountAmount += '</tr>';
                            couponAmount = '<tr>';
                            couponAmount += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Coupon Amount :') + '</b></td>';
                            // if (value.IsPercentage == false) {
                            couponAmount += '<td class="cssClassAlignRight"><span class="cssClassMinus"> - </span><span class="cssClassFormatCurrency" >' + value.CouponAmount.toFixed(2) + '</span></span></td>';
                            //                            }
                            //                            else {
                            //                                couponAmount += '<td><span>' + value.CouponAmount + '%' + '</span></span></td>';
                            //                            }
                            couponAmount += '</tr>';
                            //reward points                          
                            rewardAmount = '<tr>';
                            rewardAmount += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Discount ( Reward Points ) :') + '</b></td>';
                            rewardAmount += '<td class="cssClassAlignRight"><span class="cssClassMinus"> - </span><span class="cssClassFormatCurrency" >' + value.RewardDiscountAmount.toFixed(2) + '</span></span></td>';
                            rewardAmount += '</tr>';
                            //giftCard
                            if (value.GiftCard != "" && value.GiftCard != null) {
                                var giftCardUsed = value.GiftCard.split('#');
                                for (var g = 0; g < giftCardUsed.length; g++) {
                                    var keyVal = giftCardUsed[g].split('=');
                                    giftCard += '<tr>';
                                    giftCard += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Gift Card') + '(' + keyVal[0] +
                                        ') :</b></td>';
                                    giftCard += '<td class="cssClassAlignRight" ><span class="cssClassFormatCurrency" >' + keyVal[1] + '</span></td>';
                                    giftCard += '</tr>';
                                }
                            }
                            grandTotal = '<tr>';
                            grandTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel cssClassOrderPrice"><b>' + getLocale(AspxOrderManagement, 'Grand Total :') + '</b></td>';
                            grandTotal += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.GrandTotal.toFixed(2) + '</span></td>';
                            grandTotal += '</tr>';
                        }
                    });
                    $("#divOrderDetailForm").find('table>tbody').html(tableElements);
                    $("#divOrderDetailForm").find('table>tbody').append(subTotal);
                    $("#divOrderDetailForm").find('table>tbody').append(discountAmount);
                    $("#divOrderDetailForm").find('table>tbody').append(taxTotal);
                    $("#divOrderDetailForm").find('table>tbody').append(shippingCost);
                    $("#divOrderDetailForm").find('table>tbody').append(couponAmount);
                    if (isInstalled == true) {
                        $("#divOrderDetailForm").find('table>tbody').append(rewardAmount);
                    }
                    giftCard != "" ? $("#divOrderDetailForm").find('table>tbody').append(giftCard) : giftCard = "";
                    $("#divOrderDetailForm").find('table>tbody').append(grandTotal);
                    $("#divOrderDetailForm").find("table>tbody tr:even").addClass("sfEven");
                    $("#divOrderDetailForm").find("table>tbody tr:odd").addClass("sfOdd");
                    if (additionalNote != '' && additionalNote != undefined) {
                        $(".remarks").html("").html("*Additional Note :- '" + additionalNote + "'");
                    } else {
                        $(".remarks").html("");
                    }
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    OrderManage.HideAll();
                    $("#divOrderDetailForm").show();
                    break;
                case 4:
                    $.each(data.d, function(index, item) {
                        var couponStatusElements = "<option value=" + item.OrderStatusID + ">" + item.OrderStatusName + "</option>";
                        $("#ddlOrderStatus").append(couponStatusElements);
                        $("#selectStatus").append(couponStatusElements);
                    });
                    break;
                case 5:
                    OrderManage.BindDataForExport(data);
                    break;
            }
        }
    };
    OrderManage.init();
});
