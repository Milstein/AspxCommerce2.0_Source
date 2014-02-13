var ReturnManage;
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
    var msgbody = '';
    var aspxCommonObj = {
        StoreID: storeId,
        PortalID: portalId,
        UserName: userName,
        CultureName: cultureName,
        CustomerID: customerId,
        SessionCode: sessionCode
    };

    ReturnManage = {
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
            ReturnManage.LoadReturnMgmtStaticImage();
            ReturnManage.HideAll();
            $("#selectShippingMethod").hide();
            $("#divReturnDetails").show();
            $("#txtDateAdded").datepicker({ dateFormat: 'yy/mm/dd' });
            $("#txtDateModified").datepicker({ dateFormat: 'yy/mm/dd' });
            ReturnManage.BindReturnDetails(null, null, null, null, null, null);
            ReturnManage.GetReturnStatus();
            $("#btnBack").click(function() {
                ReturnManage.ClearAll();
                ReturnManage.HideAll();
                $("#divReturnDetails").show();
            });
            $("#btnSPBack").click(function() {
                ReturnManage.HideAll();
                $("#divReturnDetails").show();
            });
            $("#btnUpdateReturnStatus").click(function() {
                var rtStatus = $("#selectReturnStatus option:selected").val();
                var rtAction = $("#selectReturnAction option:selected").val();
                var otherPostalCharges = $("#txtOtherPostalCharges").val();
                if (rtStatus == 2) {
                    if (rtAction != 0) {
                        ReturnManage.ReturnUpdate();
                    }
                    else {
                        csscody.alert('<h2>' + getLocale(AspxReturnAndPolicy, "Information Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Please select return action first to update return status") + '</p>');
                    }
                }
                else {
                    if (rtAction != 0) {
                        csscody.alert('<h2>' + getLocale(AspxReturnAndPolicy, "Information Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "No Return Action could be choosen if return status is Pending or Awaiting Products") + '</p>');

                    }
                    else {
                        if (otherPostalCharges == 0) {
                            ReturnManage.ReturnUpdate();
                        }
                        else {
                            csscody.alert('<h2>' + getLocale(AspxReturnAndPolicy, "Information Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Other postal charges can not be applied if Status is not completed") + '</p>');
                        }
                    }

                }
            });
            $("#btnSaveComments").click(function() {
                ReturnManage.SaveComments();
            });

            $('#selectReturnAction').change(function() {
                var rtnActionID = $("#selectReturnAction option:selected").val();
                var rtnStatusID = $("#selectReturnStatus option:selected").val();
                if (rtnActionID == 3) {
                    $("#selectShippingMethod").show();
                    $("#spanShippingMethod").html(getLocale(AspxReturnAndPolicy, "Shipping Method : "));
                }
                else {
                    $("#selectShippingMethod").hide();
                    $("#spanShippingMethod").html("");
                }
            });

        },
        ajaxCall: function(config) {
            $.ajax({
                type: ReturnManage.config.type,
                contentType: ReturnManage.config.contentType,
                cache: ReturnManage.config.cache,
                async: ReturnManage.config.async,
                data: ReturnManage.config.data,
                dataType: ReturnManage.config.dataType,
                url: ReturnManage.config.url,
                success: ReturnManage.ajaxSuccess,
                error: ReturnManage.ajaxFailure
            });
        },

        LoadReturnMgmtStaticImage: function() {
            $('#ajaxReturnMgmtStaticImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },

        HideAll: function() {
            $("#divReturnDetails").hide();
            $("#divReturnDetailForm").hide();
            $("#divEditReturnStatus").hide();
        },
        ExportDivDataToExcel: function() {
            ReturnManage.GetDataForExport();
        },
        GetDataForExport: function() {
            var returnDetailObj = {
                ReturnID: null,
                OrderID: null,
                CustomerName: null,
                ReturnStatus: null,
                DateAdded: null,
                DateModified: null
            };
            this.config.url = this.config.baseURL + "GetReturnDetails";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj, returnDetailObj: returnDetailObj });
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
        },
        ExportReturnsToCsvData: function() {
            ReturnManage.GetDataForExport();
        },

        BindReturnDetails: function(returnID, orderID, customerNm, returnStatusType, dateAdded, dateModified) {
            var returnDetailObj = {
                ReturnID: returnID,
                OrderID: orderID,
                CustomerName: customerNm,
                ReturnStatus: returnStatusType,
                DateAdded: dateAdded,
                DateModified: dateModified
            };
            this.config.method = "GetReturnDetails";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvReturnDetails_pagesize").length > 0) ? $("#gdvReturnDetails_pagesize :selected").text() : 10;

            $("#gdvReturnDetails").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                { display: getLocale(AspxReturnAndPolicy, 'Return ID'), name: 'return_id', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Order ID'), name: 'order_id', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Ordered Date'), name: 'ordered_date', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'CustomerID'), name: 'customerID', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'Customer'), name: 'customer', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Return Status'), name: 'status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Date Added'), name: 'date_added', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Date Modified'), name: 'date_modified', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Return Action'), name: 'return_action', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'Shippin Method ID'), name: 'shipping_methodid', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'UserName'), name: 'user_name', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'Other Postal Charges'), name: 'otherPostalCharges', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],

                buttons: [
                    { display: getLocale(AspxReturnAndPolicy, 'View'), name: 'view', enable: true, _event: 'click', trigger: '3', callMethod: 'ReturnManage.ViewReturns', arguments: '1,2,3,4,5,6,7,8,9,10,11,12' },
                    { display: getLocale(AspxReturnAndPolicy, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'ReturnManage.EditReturns', arguments: '1,2,3,4,5,6,7,8,9,10,11,12' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxReturnAndPolicy, "No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj, returnDetailObj: returnDetailObj },
                current: current_,
                pnew: offset_,
                sortcol: { 12: { sorter: false} }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        ViewReturns: function(tblID, argus) {
            switch (tblID) {
                case "gdvReturnDetails":
                    ReturnManage.HideAll();
                    $('#' + lblReturnForm1).html(getLocale(AspxReturnAndPolicy, "Order ID: #") + argus[3]);
                    $("#divReturnDetailForm").show();
                    ReturnManage.BindAllReturnDetailsForm(argus[0], argus[3], argus[5], argus[12]);

                    ReturnManage.ViewComments(argus[0], argus[3]);
                    $("#hdnReturnID").val(argus[0]);
                    $("#hdnOrderID").val(argus[3]);
                    $("#hdnCustomerID").val(argus[5]);
                    $("#hdnUserName").val(argus[12]);

                    break;
                default:
                    break;
            }
        },
        ClearAll: function() {
            $("#hdnReturnID").val('');
            $("#hdnOrderID").val('');
            $("#SPOrderID").html('');

        },
        EditReturns: function(tblID, argus) {

            switch (tblID) {
                case "gdvReturnDetails":
                    ReturnManage.HideAll();
                    $("#divEditReturnStatus").show();
                    $("#spanReturnFiledDate").html(argus[8]);
                    $("#spanOrderDate").html(argus[4]);
                    $("#spanReturnID").html(argus[0]);
                    $("#spanOrderID").html(argus[3]);
                    $("#spanCustomerName").html(argus[6]);
                    $('#selectReturnStatus').val($('#ddlReturnStatus option:contains(' + argus[7] + ')').attr('value'));
                    ReturnManage.GetReturnAction();
                    ReturnManage.GetShippingMethods(argus[0], argus[3]);
                    var returnActionID = argus[10];
                    var shippingMethodID = argus[11];
                    if (returnActionID != '' && returnActionID != null) {
                        $("#selectReturnAction").attr('selectedIndex', returnActionID);
                    }
                    if (shippingMethodID != '' && shippingMethodID != null) {
                        $("#selectShippingMethod").attr('selectedIndex', shippingMethodID);
                    }
                    $("#txtOtherPostalCharges").val(argus[13]);

                    $("#hdnReturnID").val(argus[0]);
                    $("#hdnOrderID").val(argus[3]);
                    break;
            }
        },

        ReturnUpdate: function() {
            var orderID = $("#spanOrderID").text();
            var returnID = $("#spanReturnID").text();
            var shippingCost = $("#hdnShippingCost").text();
            var otherPostalCharges = $("#txtOtherPostalCharges").val();
            if (shippingCost == '') {
                shippingCost = 0;
            }
            if (otherPostalCharges == '') {
                otherPostalCharges = 0;
            }
            var returnActionID = $("#selectReturnAction option:selected").val();
            var returnStatusID = $("#selectReturnStatus option:selected").val();
            var shippingMethodID = $("#selectShippingMethod option:selected").val();
            var returnDetailObj = {
                ReturnID: returnID,
                OrderID: orderID,
                ReturnActionID: returnActionID,
                ReturnStatusID: returnStatusID,
                ShippingMethodID: shippingMethodID,
                ShippingCost: shippingCost,
                OtherPostalCharges: otherPostalCharges
            };
            this.config.url = this.config.baseURL + "ReturnUpdate";
            this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj
            });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },


        SaveComments: function() {
            var orderID = $("#hdnOrderID").val();
            var returnID = $("#hdnReturnID").val();
            var commentText = $("#txtAreaComments").val();
            var isCustomerNotifiedByEmail = $('#chkIsCustomerNotifyByEmail').attr('checked') ? 1 : 0;
            if (commentText == '' || commentText == null) {
                csscody.alert('<h2>' + getLocale(AspxReturnAndPolicy, "Information Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "You can not send blank comments") + '</p>');
            }
            else {
                var returnDetailObj = {
                    ReturnID: returnID,
                    OrderID: orderID,
                    CommentText: commentText,
                    IsCustomerNotifiedByEmail: isCustomerNotifiedByEmail
                };

                this.config.url = this.config.baseURL + "ReturnSaveComments";
                this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = 8;
                this.ajaxCall(this.config);
            }
        },
        ViewComments: function(returnId, orderId) {
            var returnDetailObj = {
                ReturnID: returnId,
                OrderID: orderId
            };
            this.config.url = this.config.baseURL + "GetMyReturnsComment";
            this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);

        },
        BindAllReturnDetailsForm: function(returnId, orderId, customerId, userName) {
            var aspxCommonObj1 = {
                StoreID: storeId,
                PortalID: portalId,
                UserName: userName,
                CultureName: cultureName,
                CustomerID: customerId,
                SessionCode: sessionCode
            };
            var returnDetailObj = {
                ReturnID: returnId,
                OrderID: orderId
            };
            this.config.url = this.config.baseURL + "GetMyReturnsDetails";
            this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj1 });
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);
        },

        GetReturnStatus: function() {
            $("#selectReturnStatus").empty();
            this.config.url = this.config.baseURL + "GetReturnStatusList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 4;
            this.ajaxCall(this.config);
        },
        GetReturnAction: function() {
            $("#selectReturnAction").empty();
            this.config.url = this.config.baseURL + "GetReturnActionList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 6;
            this.config.async = false;
            this.ajaxCall(this.config);
        },
        GetShippingMethods: function(returnId, orderId) {
            $("#selectShippingMethod").empty();
            //var isActive = true;
            var returnDetailObj = {
                ReturnID: returnId,
                OrderID: orderId
            };
            this.config.url = this.config.baseURL + "GetMyReturnsShippingMethod";
            this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 7;
            this.ajaxCall(this.config);
        },
        BindDataForExport: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxReturnAndPolicy, "Return ID") + '</th><th>' + getLocale(AspxReturnAndPolicy, "Order ID") + '</th><th>' + getLocale(AspxReturnAndPolicy, "Customer Name") + '</th><th>' + getLocale(AspxReturnAndPolicy, "Return Status") + '</th><th>' + getLocale(AspxReturnAndPolicy, "Date Added") + '</th><th>' + getLocale(AspxReturnAndPolicy, "Date Modified") + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.ReturnID + '</td><td>' + value.OrderID + '</td>';
                    exportData += '<td>' + value.CustomerName + '</td>';
                    exportData += '<td>' + value.ReturnStatus + '</td>';
                    exportData += '<td>' + value.DateAdded + '</td><td>' + value.DateModified + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxReturnAndPolicy, "No Records Found!") + '</td></tr>';
            }
            exportData += '</tbody>';
            $('#ReturnExportData').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvReturnHdnValue']").val($('#ReturnExportData').table2CSV());
            $('#ReturnExportData').html('');


        },
        SearchReturns: function() {
            var returnID = $.trim($("#txtReturnID").val());
            var orderID = $.trim($("#txtOrderID").val());
            var customerNm = $.trim($("#txtCustomerName").val());
            var returnStatusType = '';
            var dateAdded = $.trim($("#txtDateAdded").val());
            var dateModified = $.trim($("#txtDateModified").val());

            if (returnID.length < 1) {
                returnID = null;
            }
            if (orderID.length < 1) {
                orderID = null;
            }
            if (customerNm.length < 1) {
                customerNm = null;
            }

            if ($("#ddlReturnStatus option:selected").val() == "0") {
                returnStatusType = null;
            }
            else {
                returnStatusType = $("#ddlReturnStatus option:selected").text();
            }
            if (dateAdded.length < 1) {
                dateAdded = null;
            }
            if (dateModified.length < 1) {
                dateModified = null;
            }

            ReturnManage.BindReturnDetails(returnID, orderID, customerNm, returnStatusType, dateAdded, dateModified);
        },

        SendEmail: function() {

            var subject = "Return Notification";
            var message = $("#txtAreaComments").val();
            var recieverEmail = $("#hdnRcvrEmail").val();
            var rtnID = $("#hdnrtnID").val();
            var ordID = $("#hdnOrderID").val();
            var itemName = $("#hdnItemName").val();
            var variant = $("#hdnVariants").val();
            var qty = $("#hdnQty").val();
            var status = $("#hdnReturnStatus").val();
            var action = $("#hdnIsReturnAction").val();
            var bodyDetails = ordID + "#" + rtnID + "#" + itemName + "#" + variant + "#" + qty + "#" + status + "#" + action;

            var sendEmailObj = {
                SenderName: userName,
                SenderEmail: senderEmail,
                ReceiverEmail: recieverEmail,
                Subject: subject,
                Message: message,
                MessageBody: bodyDetails
            }

            this.config.url = this.config.baseURL + "ReturnSendEmail";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, sendEmailObj: sendEmailObj });
            this.config.ajaxCallMode = 9;
            this.config.async = false;
            this.ajaxCall(this.config);

        },
        ajaxSuccess: function(data) {
            switch (ReturnManage.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    csscody.info("<h2>" + getLocale(AspxReturnAndPolicy, "Successful Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Saved Successfully") + "</p>");
                    ReturnManage.BindReturnDetails(null, null, null, null, null, null);
                    var ReturnId = $("#hdnReturnID").val();
                    $("#txtOtherPostalCharges").val('');
                    ReturnManage.HideAll();
                    $("#divReturnDetails").show();
                    break;

                case 2:
                    var commentsList = '';
                    $.each(data.d, function(index, value) {
                        if (value.CustomerID != 1 && value.CustomerID != 2) {
                            commentsList += '<hr /><li><span>' + getLocale(AspxReturnAndPolicy, "Commented By:") + '</span>' + ' ' + value.AddedBy + ' ' + '<span> | </span>' + ' ' + getLocale(AspxReturnAndPolicy, 'Admin Notified by Email :') + ' ' + value.IsNotified + ' ' + '<span> | </span>' + value.AddedOn + '</li>';

                            commentsList += '<li><span>' + getLocale(AspxReturnAndPolicy, 'Comments:') + '</span>' + ' ' + value.CommentText + '</li></br>';
                        }
                        else {
                            commentsList += '<hr /><li><span>' + getLocale(AspxReturnAndPolicy, "Commented By:") + '</span>' + ' ' + value.AddedBy + ' ' + '<span> | </span>' + ' ' + getLocale(AspxReturnAndPolicy, 'Customer Notified by Email : ') + ' ' + value.IsNotified + ' ' + '<span> | </span>' + value.AddedOn + '</li>';
                            commentsList += '<li><span>' + getLocale(AspxReturnAndPolicy, "Comments:") + '</span>' + ' ' + value.CommentText + '</li></br>';
                        }
                    });
                    $('#ulCommentsList').html(commentsList);
                    break;

                case 3:
                    var elements = '';
                    var tableElements = '';
                    var CustomerNm = '';
                    var Email = '';

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
                            arrBill = value.ShippingAddress.split(',');
                            billAdd += '<li>' + $.trim(arrBill[0]) + ' ' + $.trim(arrBill[1]) + '</li>';
                            billAdd += '<li>' + $.trim(arrBill[2]) + '</li><li>' + $.trim(arrBill[3]) + '</li><li>' + $.trim(arrBill[4]) + '</li>';
                            billAdd += '<li>' + $.trim(arrBill[5]) + ' ' + $.trim(arrBill[6]) + ' ' + $.trim(arrBill[7]) + '</li><li>' + $.trim(arrBill[8]) + '</li>';
                            billAdd += '<li>' + $.trim(arrBill[9]) + ', ' + $.trim(arrBill[10]) + '</li><li>' + $.trim(arrBill[11]) + '</li><li>' + $.trim(arrBill[12]) + '</li>';

                            $('#ulOrderAddress').html(billAdd);
                            $("#returnFiledDate").html(value.ReturnFileDate);
                        }
                        if (index < 1) {
                            var returnAdd = '';
                            var arrReturn;
                            arrReturn = value.ReturnAddress.split(',');
                            returnAdd += '<li>' + $.trim(arrReturn[0]) + ' ' + $.trim(arrReturn[1]) + '</li>';
                            returnAdd += '<li>' + $.trim(arrReturn[2]) + '</li><li>' + $.trim(arrReturn[3]) + '</li><li>' + $.trim(arrReturn[4]) + '</li>';
                            returnAdd += '<li>' + $.trim(arrReturn[5]) + ' ' + $.trim(arrReturn[6]) + ' ' + $.trim(arrReturn[7]) + '</li><li>' + $.trim(arrReturn[8]) + '</li>';
                            returnAdd += '<li>' + $.trim(arrReturn[9]) + '</li><li>' + $.trim(arrReturn[10]) + ' ' + $.trim(arrReturn[11]) + '</li>';
                            $("#ulReturnAddress").html(returnAdd);
                            CustomerNm = arrReturn[0] + arrReturn[1];
                            Email = arrReturn[9];
                            $("#hdnRcvrEmail").val(Email);
                        }
                        if (index < 1) {
                            var shippingMethod = '';
                            if (value.ShippingMethodName != '' && value.ShippingMethodName != null) {
                                shippingMethod += '<li>' + '<b>' + getLocale(AspxReturnAndPolicy, "Shipping Method Name :") + '</b>' + ' ' + value.ShippingMethodName + '</li>';
                                shippingMethod += '<li>' + '<b>' + getLocale(AspxReturnAndPolicy, "Shipping Provider Name :") + '</b>' + ' ' + value.ShippingProviderName + '</li>';
                                $("#ulShippingMethods").html(shippingMethod);
                                $('#ShippingDetails').show();
                            }
                            else {
                                $('#ShippingDetails').hide();
                            }

                        }
                        tableElements += '<tr>';
                        tableElements += '<td class="cssClassReturnHistoryReturnID"><input type="hidden" size="3" id="hdnrtnID" class="cssClasshdnrtnID" value="' + value.ReturnID + '">' + value.ReturnID + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryItemName"><input type="hidden" size="3" id="hdnItemName" class="cssClasshdnItemName" value="' + value.ItemName + '">' + value.ItemName + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryCostVariants"><input type="hidden" size="3" id="hdnVariants" class="cssClasshdnVariants" value="' + value.CostVariants + '">' + value.CostVariants + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryQuantity"><input type="hidden" size="3" id="hdnQty" class="cssClasshdnQty" value="' + value.Quantity + '">' + value.Quantity + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryReturnReason">' + value.ReturnReason + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryOtherDetails">' + value.OtherFaults + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryRetrunProductStatus">' + value.RetrunProductStatus + '</td>';
                        tableElements += '<td class="cssClassReturnHistorySKU"><input type="hidden" size="3" id="hdnReturnStatus" class="cssClasshdnReturnStatus" value="' + value.ReturnStatus + '">' + value.ReturnStatus + '</td>';
                        tableElements += '<td class="cssClassReturnHistoryReturnAction"><input type="hidden" size="3" id="hdnIsReturnAction" class="cssClasshdnIsReturnAction" value="' + value.ReturnAction + '">' + value.ReturnAction + '</td>';
                        tableElements += '</tr>';


                    });
                    $("#divItemReturnDetailsForm").find('table>tbody').html(tableElements);
                    ReturnManage.HideAll();
                    $("#divReturnDetailForm").show();
                    break;
                case 4:
                    $.each(data.d, function(index, item) {
                        var returnStatusElements = "<option value=" + item.Value + ">" + item.Text + "</option>";
                        $("#ddlReturnStatus").append(returnStatusElements);
                        $("#selectReturnStatus").append(returnStatusElements);
                    });
                    break;
                case 5:
                    ReturnManage.BindDataForExport(data);
                    break;
                case 6:
                    var returnActionElements1 = "<option value='0'>----Select----</option>";
                    var returnActionElements = '';
                    var total = '';
                    $.each(data.d, function(index, item) {
                        returnActionElements += "<option value=" + item.Value + ">" + item.Text + "</option>";
                    });
                    total = returnActionElements1 + returnActionElements;
                    $("#selectReturnAction").append(total);
                    break;
                case 7:

                    var shippingMehodElements1 = "<option value='0'>----Select----</option>";
                    var shippingMehodElements = '';
                    var totalShp = '';
                    $.each(data.d, function(index, item) {
                        shippingMehodElements += "<option value=" + item.ShippingMethodID + ">" + item.ShippingMethodName + "</option>";
                        $("#hdnShippingCost").html(item.ShippingCost);
                    });
                    totalShp = shippingMehodElements1 + shippingMehodElements;
                    $("#selectShippingMethod").append(totalShp);
                    break;
                case 8:

                    var rtrnId = $("#hdnReturnID").val();
                    var ordrId = $("#hdnOrderID").val();
                    var custID = $("#hdnCustomerID").val();
                    var usrNm = $("#hdnUserName").val();
                    csscody.info("<h2>" + getLocale(AspxReturnAndPolicy, "Successful Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Comment Posted Successfully") + "</p>");
                    var isCustomerNotifiedByEmail = $('#chkIsCustomerNotifyByEmail').attr('checked') ? 1 : 0;
                    if (isCustomerNotifiedByEmail == 1) {
                        ReturnManage.SendEmail();
                        $('#chkIsCustomerNotifyByEmail').attr('checked', false);
                    }
                    else {
                        $("#txtAreaComments").val('');
                    }
                    ReturnManage.BindAllReturnDetailsForm(rtrnId, ordrId, custID, usrNm);
                    ReturnManage.ViewComments(rtrnId, ordrId);
                    break;
                case 9:
                    $("#txtAreaComments").val('');
                    csscody.info("<h2>" + getLocale(AspxReturnAndPolicy, "Sucess Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Notification email has been send successfully.") + "</p>");
            }
        }
    };
    ReturnManage.init();
});
