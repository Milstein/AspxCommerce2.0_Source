var storeOrdersReport = {};
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
    var orderID;
    storeOrdersReport = {
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
            url: "",
            ajaxCallMode: 0
        },
        ajaxCall: function(config) {
            $.ajax({
                type: storeOrdersReport.config.type,
                contentType: storeOrdersReport.config.contentType,
                cache: storeOrdersReport.config.cache,
                async: storeOrdersReport.config.async,
                url: storeOrdersReport.config.url,
                data: storeOrdersReport.config.data,
                dataType: storeOrdersReport.config.dataType,
                success: storeOrdersReport.ajaxSuccess,
                error: storeOrdersReport.ajaxFailure
            });
        },
        HideAll: function() {
            $("#divOrderDetails").hide();
            $("#divOrderDetailForm").hide();
        },
        GetDataForExport: function() {
            aspxCommonObj.UserName = null;
            this.config.url = this.config.baseURL + "GetOrderDetails";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, orderStatusName: null, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);
        },
        ExportToCsvData: function() {
            storeOrdersReport.GetDataForExport();
        },
        ExportDivDataToExcel: function() {
            storeOrdersReport.GetDataForExport();
        },
        BindOrderDetails: function(customerNm, orderStatusType) {
            aspxCommonObj.UserName = customerNm;
            this.config.url = this.config.baseURL;
            this.config.method = "GetOrderDetails";
            this.config.data = { orderStatusName: orderStatusType, aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvOrderDetails_pagesize").length > 0) ? $("#gdvOrderDetails_pagesize :selected").text() : 10;

            $("#gdvOrderDetails").sagegrid({
                url: this.config.url,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxOrderManagement,'Order ID'), name: 'order_id', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement,'Invoice Number'), name: 'invoice_number', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement,'Customer ID'), name: 'customerID', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement,'Customer Name'), name: 'customer_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement,'Email'), name: 'email', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement,'Order Status'), name: 'order_status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement,'Grand Total'), name: 'grand_total', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                    { display: getLocale(AspxOrderManagement,'Payment Gateway Type Name'), name: 'payment_gateway_typename', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement,'Payment Method Name'), name: 'payment_method_name', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOrderManagement,'Ordered Date'), name: 'ordered_date', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOrderManagement,'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],

                buttons: [
                    { display: getLocale(AspxOrderManagement,'View'), name: 'view', enable: true, _event: 'click', trigger: '3', callMethod: 'storeOrdersReport.ViewOrders' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxOrderManagement,"No Records Found!"),
                param: data, //{ storeID: storeId, portalID: portalId, cultureName: cultureName, orderStatusName: orderStatusType, userName: customerNm },
                current: current_,
                pnew: offset_,
                sortcol: { 10: { sorter: false} }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },
        BindAllOrderDetailsForm: function() {
        
            this.config.url = this.config.baseURL + "GetAllOrderDetailsForView";
            this.config.data = JSON2.stringify({ orderId: orderID, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        ViewOrders: function(tblID, argus) {
            switch (tblID) {
                case "gdvOrderDetails":
                    storeOrdersReport.HideAll();
                    $('#' + lblOrderForm).html("Order ID: #" + argus[0]);
                    $("#divOrderDetailForm").show();
                    orderID = argus[0];
                    storeOrdersReport.BindAllOrderDetailsForm();
                    break;
                default:
                    break;
            }
        },
        GetOrderStatus: function() {
            this.config.url = this.config.baseURL + "GetStatusList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        BindOrderDetailsForm: function(msg) {
            var elements = '';
            var tableElements = '';
            var grandTotal = '';
            var couponAmount = '';
            var rewardAmount = '';
            var taxTotal = '';
            var shippingCost = '';
            var discountAmount = '';
            var subTotal = '';
            $.each(msg.d, function(index, value) {
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
                    billAdd += '<li><h4>Billing Address :</h4></li>';
                    billAdd += '<li>' + arrBill[0] + ' ' + arrBill[1] + '</li>';
                    billAdd += '<li>' + arrBill[2] + '</li><li>' + arrBill[3] + '</li><li>' + arrBill[4] + '</li>';
                    billAdd += '<li>' + arrBill[5] + ' ' + arrBill[6] + ' ' + arrBill[7] + '</li><li>' + arrBill[8] + '</li><li>' + arrBill[9] + ', ' + arrBill[10] + '</li><li>' + arrBill[11] + '</li><li>' + arrBill[12] + '</li>';
                    $("#divOrderDetailForm").find('ul').html(billAdd);
                    
                    
                    
                    $("#OrderDate").html(value.OrderedDate);
                  //  $("#PaymentGatewayType").html(value.PaymentGatewayTypeName);
                    $("#PaymentMethod").html(value.PaymentMethodName);
                    $("#invoiceNo").html(value.InVoiceNumber);
                    $("#storeName").html(storeName);
                    $("#storeDescription").html(value.StoreDescription);
                }
              //  var shippingAddress = new Array();
              //  shippingAddress = value.ShippingAddress.replace(",", " ").split(",");
              //  shippingAddress.clean(" ");

                var shippingAddress = new Array();
                var shipAdd = '';
                if (value.ShippingAddress != "N/A") {
                    shippingAddress = value.ShippingAddress.split(",");
                    // shippingAddress.clean(" ");
                    if (shippingAddress[0] != '')
                        shipAdd = shippingAddress[0] + '</br>';
                    if (shippingAddress[1] != '')
                        shipAdd += shippingAddress[1] + '</br>';
                    if (shippingAddress[2] != '')
                        shipAdd += shippingAddress[2] + '</br>';
                    if (shippingAddress[3] != '')
                        shipAdd += shippingAddress[3] + '</br>';
                    if (shippingAddress[4] != '')
                        shipAdd += shippingAddress[4] + ' ';
                    if (shippingAddress[5] != '')
                        shipAdd += shippingAddress[5] + ' ';
                    if (shippingAddress[6] != '')
                        shipAdd += shippingAddress[6] + '</br>';
                    if (shippingAddress[7] != '')
                        shipAdd += shippingAddress[7] + '</br>';
                    if (shippingAddress[8] != '')
                        shipAdd += shippingAddress[8] + '</br>';
                    if (shippingAddress[9] != '')
                        shipAdd += shippingAddress[9] + ' ';
                    if (shippingAddress[10] != '')
                        shipAdd += shippingAddress[10] + '</br>';
                    if (shippingAddress[11] != '')
                        shipAdd += shippingAddress[11] + '</br>';
                    if (shippingAddress[12] != '')
                        shipAdd += shippingAddress[12];
                } else {
                    shipAdd = value.ShippingAddress.split(",");
                }
                tableElements += '<tr>';
                tableElements += '<td>' + value.SKU + '</td>';
                tableElements += '<td>' + value.ItemName + '<br/>' + value.CostVariants + '</td>';
                tableElements += '<td>' + value.ShippingMethod + '</td>';
                tableElements += '<td>' + shipAdd + '</td>';
                tableElements += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.ShippingRate.toFixed(2) + '</span></td>';
                tableElements += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.Price.toFixed(2) + '</span></td>';
                tableElements += '<td>' + value.Quantity + '</td>';
                tableElements += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + (value.Price * value.Quantity).toFixed(2) + '</span></td>';
                tableElements += '</tr>';
                if (index == 0) {
                    subTotal = '<tr>';
                    subTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>'+getLocale(AspxOrderManagement,'Sub Total :')+'</b></td>';
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

                    //                    taxTotal = '<tr>';
                    //                    taxTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>Tax Total:</b></td>';
                    //                    taxTotal += '<td><span class="cssClassFormatCurrency" >' + value.TaxTotal.toFixed(2) + '</span></td>';
                    //                    taxTotal += '</tr>';
                    shippingCost = '<tr>';
                    shippingCost += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>'+getLocale(AspxOrderManagement,'Shipping Cost :')+'</b></td>';
                    shippingCost += '<td class="cssClassAlignRight"><span class="cssClassFormatCurrency" >' + value.TotalShippingCost.toFixed(2) + '</span></td>';
                    shippingCost += '</tr>';
                    discountAmount = '<tr>';
                    discountAmount += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>'+getLocale(AspxOrderManagement,'Discount Amount :')+'</b></td>';
                    discountAmount += '<td class="cssClassAlignRight"><span class="cssClassMinus"> - </span><span class="cssClassFormatCurrency" > ' + value.DiscountAmount.toFixed(2) + '</span></td>';
                    discountAmount += '</tr>';
                    couponAmount = '<tr>';
                    couponAmount += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>'+getLocale(AspxOrderManagement,'Coupon Amount :')+'</b></td>';
                    couponAmount += '<td class="cssClassAlignRight"><span class="cssClassMinus"> - </span><span class="cssClassFormatCurrency" >' + value.CouponAmount.toFixed(2) + '</span></td>';
                    couponAmount += '</tr>';
                    rewardAmount = '<tr>';
                    rewardAmount += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>' + getLocale(AspxOrderManagement, 'Discount ( Reward Points ) :') + '</b></td>';
                    rewardAmount += '<td class="cssClassAlignRight"><span class="cssClassMinus"> - </span><span class="cssClassFormatCurrency" >' + value.RewardDiscountAmount.toFixed(2) + '</span></td>';
                    rewardAmount += '</tr>';
                    grandTotal = '<tr>';
                    grandTotal += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="cssClassLabel"><b>'+getLocale(AspxOrderManagement,'Grand Total :')+'</b></td>';
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
            $("#divOrderDetailForm").find('table>tbody').append(grandTotal);
            $("#divOrderDetailForm").find("table>tbody tr:even").addClass("sfEven");
            $("#divOrderDetailForm").find("table>tbody tr:odd").addClass("sfOdd");
            storeOrdersReport.HideAll();
            $("#divOrderDetailForm").show();
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
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
            storeOrdersReport.BindOrderDetails(customerNm, orderStatusType);
        },
        BindDataForExport: function(msg) {
            var exportData = '<thead><tr><th>'+getLocale(AspxOrderManagement,'Order ID')+'</th><th>'+getLocale(AspxOrderManagement,'Invoice Number')+'</th><th>'+getLocale(AspxOrderManagement,'Customer ID')+'</th><th>'+getLocale(AspxOrderManagement,'Customer Name')+'</th><th>'+getLocale(AspxOrderManagement,'Email')+'</th><th>'+getLocale(AspxOrderManagement,'Order Status')+'</th><th>'+getLocale(AspxOrderManagement,'Grand Total')+'</th><th>'+getLocale(AspxOrderManagement,'Payment Method Name')+'</th><th>'+getLocale(AspxOrderManagement,'Ordered Date')+'</th></tr></thead><tbody>';
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, value) {
                    exportData += '<tr><td>' + value.OrderID + '</td><td>' + value.InVoiceNumber + '</td>';
                    exportData += '<td>' + value.CustomerID + '</td><td>' + value.UserName + '</td>';
                    exportData += '<td>' + value.Email + '</td><td>' + value.OrderStatus + '</td>';
                    exportData += '<td>' + curSymbol + ' ' + value.GrandTotal + '</td>';
                    exportData += '<td>' + value.PaymentMethodName + '</td><td>' + value.OrderedDate + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>No Records Found!</td></tr>';
            }
            exportData += '</tbody>';

            $('#orderReportExportData').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvHiddenValue']").val($("#orderReportExportData").table2CSV());
            $("#orderReportExportData").html('');
        },
        ajaxSuccess: function(msg) {
            switch (storeOrdersReport.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    $.each(msg.d, function(index, item) {
                        var couponStatusElements = "<option value=" + item.OrderStatusID + ">" + item.OrderStatusName + "</option>";
                        $("#ddlOrderStatus").append(couponStatusElements);
                        $("#selectStatus").append(couponStatusElements);
                    });
                    break;
                case 2:
                    storeOrdersReport.IsModuleInstalled();
                    storeOrdersReport.BindOrderDetailsForm(msg);
                    break;
                case 3:
                    storeOrdersReport.BindDataForExport(msg);
                    break;
            }
        },
        ajaxFailure: function(msg) {
            switch (storeOrdersReport.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    csscody.error('<h1>'+getLocale(AspxOrderManagement,'Error Message')+'</h1><p>'+getLocale(AspxOrderManagement,'Failed to load Order status!!!.')+'</p>');
                    break;
                case 2:
                    csscody.error('<h1>'+getLocale(AspxOrderManagement,'Error Message')+'</h1><p>'+getLocale(AspxOrderManagement,'Order details error !!!.')+'</p>');
                    break;
            }
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
        init: function(config) {
            storeOrdersReport.HideAll();

            $("#divOrderDetails").show();
            storeOrdersReport.BindOrderDetails(null, null);
            storeOrdersReport.GetOrderStatus();
            $("#btnBack").click(function() {
                storeOrdersReport.HideAll();
                $("#divOrderDetails").show();
            });
            $("#btnSPBack").click(function() {
                storeOrdersReport.HideAll();
                $("#divOrderDetails").show();
            });
            $("#btnSearchOrderReport").click(function() {
                storeOrdersReport.SearchOrders();
            });
            $('#txtCustomerName,#ddlOrderStatus').keyup(function(event) {
                if (event.keyCode == 13) {
                    //storeOrdersReport.SearchOrders();
                    $("#btnSearchOrderReport").click();
                }
            });
        }
    };
    storeOrdersReport.init();
});