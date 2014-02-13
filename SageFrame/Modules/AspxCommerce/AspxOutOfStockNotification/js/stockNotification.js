var StockOutofNotification = "";
var notificationID = '';
var productUrl = "";
$(function() {
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    StockOutofNotification = {
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
            method: "",
            ajaxCallMode: 0,
            error: 0
        },
        ajaxCall: function(config) {
            $.ajax({
                type: StockOutofNotification.config.type,
                contentType: StockOutofNotification.config.contentType,
                cache: StockOutofNotification.config.cache,
                async: StockOutofNotification.config.async,
                data: StockOutofNotification.config.data,
                dataType: StockOutofNotification.config.dataType,
                url: StockOutofNotification.config.url,
                success: StockOutofNotification.ajaxSuccess,
                error: StockOutofNotification.ajaxFailure
            });
        },

        init: function() {

            StockOutofNotification.BindNotificationListInGrid(null, null, null, null, storeId, portalId);

            $("#btnShow").click(function() {
                StockOutofNotification.BindNotificationListInGrid(null, null, null, null, storeId, portalId);
                $("#txtProductName").val('');
                $("#txtMailStatus").val('');
                $("#ddlItemStatus").val('');
            });
            $("#btnSearch").click(function() {
                StockOutofNotification.SearchNotificationList();

            });
            $("#btnDeleteSelected").click(function() {
                var notificationIds = '';
                $(".newsChkbox").each(function(i) {
                    if ($(this).attr("checked")) {
                        notificationIds += $(this).val() + ',';
                    }
                });
                if (notificationIds == "") {
                    csscody.alert('<h2>'+getLocale(AspxOutOfStockNotification,'Information Alert')+'</h2><p>'+getLocale(AspxOutOfStockNotification,'None of the data are selected')+'</p>');
                    return false;
                }
                var properties = {
                    onComplete: function(e) {
                        StockOutofNotification.DeleteMultipleNotification(notificationIds, e);
                    }
                };
                csscody.confirm("<h2>"+getLocale(AspxOutOfStockNotification,'Delete Confirmation')+'</h2><p>'+getLocale(AspxOutOfStockNotification,'Are you sure you want to delete records?')+"</p>", properties);
            });
            //            $("#btnEmailSelected").click(function() {
            //                var notificationIds = '';
            //                $(".newsChkbox").each(function(i) {
            //                    if ($(this).attr("checked")) {
            //                        var id = $(this).val();
            //                        var sku = $.trim($(this).closest('tr').find('td').eq(1).html());
            //                        var mail = $.trim($(this).closest('tr').find('td').eq(3).html());
            //                        if (productUrl == "") {
            //                            productUrl = $.trim($(this).closest('tr').find('td').eq(16).html());
            //                        }
            //                        notificationIds += id + ',' + sku + ',' + mail + '#';
            //                    }
            //                });
            //                if (notificationIds == "") {
            //                    csscody.alert('<h2>Information Alert</h2><p>Please select at least one record.</p>');
            //                    return false;
            //                }
            //                var properties = {
            //                    onComplete: function(e) {
            //                        StockOutofNotification.SendMultipleEmail(notificationIds, e);
            //                    }
            //                }
            //                csscody.confirm("<h2>Email Confirmation</h2><p>Are you sure you want to send mail notification?</p>", properties);
            //            });

        },

        ajaxSuccess: function(data) {
            switch (StockOutofNotification.config.ajaxCallMode) {
                case 1:
                    StockOutofNotification.BindNotificationListInGrid(null, null, null, null, storeId, portalId);
                    csscody.info("<h2>"+getLocale(AspxOutOfStockNotification,'Successful Message')+'</h2><p>'+getLocale(AspxOutOfStockNotification,'Record has been deleted successfully.')+"</p>");
                    break;
                //                case 2:    
                //                    StockOutofNotification.BindNotificationListInGrid(null, null, null, null, storeId, portalId);    
                //                    csscody.info("<h2>Successful Message</h2><p>Email has been sent successfully.</p>");    
                //                    break;    
            }
        },

        ajaxFailure: function() {
            switch (StockOutofNotification.config.error) {
                case 1:
                    csscody.error("<h2>"+getLocale(AspxOutOfStockNotification,'Error Message')+'</h2><p>'+getLocale(AspxOutOfStockNotification,'Failed to delete record')+"</p>");
                    break;
                //                case 2:    
                //                    csscody.error("<h2>Error Message</h2><p>Failed to send notification mail</p>");    
                //                    break;    
            }
        },
        BindNotificationListInGrid: function(itemSKU, mailStatus, itemStatus, customer, storeId, portalId) {
            var getAllNotificationObj = {
                ItemSKU: itemSKU,
                MailStatus: mailStatus,
                ItemStatus: itemStatus,
                Customer: customer
            };
            this.config.method = "GetNotificationList";
            this.config.data = { getAllNotificationObj: getAllNotificationObj, aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#tblOutofStockNotification_pagesize").length > 0) ? $("#tblOutofStockNotification_pagesize :selected").text() : 10;
            $("#tblOutofStockNotification").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxOutOfStockNotification, 'NotificationID'), name: '_notificationID', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'newsChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                    { display: getLocale(AspxOutOfStockNotification, 'ItemID'), name: '_itemID', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                     { display: getLocale(AspxOutOfStockNotification, 'VariantValue'), name: '_variantValueID', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOutOfStockNotification, 'ItemSKU'), name: '_itemSKU', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOutOfStockNotification, 'Customer'), name: '_customer', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOutOfStockNotification, 'Email'), name: '_email', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxOutOfStockNotification, 'Mail Status'), name: '_mailStatus', cssclass: '', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Send/Not Send' },
                    { display: getLocale(AspxOutOfStockNotification,'Store ID'), name: 'store_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Portal ID'), name: 'portal_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Is Active'), name: 'isActive', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Is Deleted'), name: 'isDeleted', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Is Modified'), name: 'isModified', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Recieved On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd', hide: false },
                    { display: getLocale(AspxOutOfStockNotification,'Updated On'), name: 'UpdatedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'center', type: 'date', format: 'yyyy/MM/dd', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Deleted On'), name: 'DeletedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'center', type: 'date', format: 'yyyy/MM/dd', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Added By'), name: 'AddedBy', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Updated By'), name: 'UpdatedBy', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Deleted By'), name: 'DeletedBy', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Item Status'), name: 'ItemStatus', cssclass: '', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Available/OutOfStock', hide: true },
                    { display: getLocale(AspxOutOfStockNotification,'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                //{ display: 'Email', name: 'email', enable: true, _event: 'click', trigger: '1', callMethod: 'StockOutofNotification.SendEmail', arguments: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23' },
                    {display: getLocale(AspxOutOfStockNotification,'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'StockOutofNotification.DeleteNotification', arguments: '1,2,3,4,5,6,7' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxOutOfStockNotification,"No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 19: { sorter: false} }
            });
        },
        DeleteMultipleNotification: function(ids, event) {
            StockOutofNotification.DeleteNotificationByID(ids, event);
        },
        DeleteNotification: function(tblID, argus) {
            switch (tblID) {
                case "tblOutofStockNotification":
                    var properties = {
                        onComplete: function(e) {
                            StockOutofNotification.DeleteNotificationByID(argus[0], e);
                        }
                    }
                    csscody.confirm("<h2>"+getLocale(AspxOutOfStockNotification,'Delete Confirmation')+'</h2><p>'+getLocale(AspxOutOfStockNotification,'Are you sure you want to delete this record?')+"</p>", properties);
                    break;
                default:
                    break;
            }

        },
        DeleteNotificationByID: function(ids, event) {
            notificationID = ids;
            if (event) {

                var param = JSON2.stringify({ notificationID: notificationID, aspxCommonObj:aspxCommonObj });
                this.config.method = "DeleteNotification";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = 1;
                this.config.error = 1;
                this.ajaxCall(this.config);

            }
        },
        //        SendEmail: function(tblID, argus) {
        //            productUrl = argus[18];
        //            var notIds = argus[0] + ',' + argus[3] + ',' + argus[5] + '#';
        //            switch (tblID) {
        //                case "tblOutofStockNotification":
        //                    var properties = {
        //                        onComplete: function(e) {
        //                            StockOutofNotification.SendEmailToUser(notIds, e);
        //                        }
        //                    }
        //                    csscody.confirm("<h2>Email Confirmation</h2><p>Are you sure you want to send notification mail?</p>", properties);
        //                    break;
        //                default:
        //                    break;
        //            }

        //        },

        //        SendEmailToUser: function(notID, event) {
        //            notificationID = notID;
        //            var subject = "Product you interested is now available";
        //            var fullDate = new Date();
        //            var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
        //            if (twoDigitMonth.length == 2) {
        //            } else if (twoDigitMonth.length == 1) {
        //                twoDigitMonth = '0' + twoDigitMonth;
        //            }
        //            var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        //            var dateyear = fullDate.getFullYear();
        //            var messageBodyHtml = '';
        //            messageBodyHtml += '<table style="font:12px Arial, Helvetica, sans-serif;" width="100%" border="0" cellspacing="0" cellpadding="0">  <tr>';
        //            messageBodyHtml += '<td width="33%"><div style="border:1px solid #cfcfcf; background:#f1f1f1; padding:10px; text-align:center;"> ';
        //            messageBodyHtml += '<p style="margin:0; padding:5px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:normal; line-height:18px;"> <span style="font-weight:bold; font-size:12px; font-family:Arial, Helvetica, sans-serif; text-shadow:1px 1px 0 #fff;">';
        //            messageBodyHtml += 'Item SKU: ' + '#sku#' + '</span><br />';
        //            messageBodyHtml += '<span style="font-weight:bold; font-size:11px; font-family:Arial, Helvetica, sans-serif; text-shadow:1px 1px 0 #fff;"></span>';
        //            messageBodyHtml += '' + '<br />';
        //            messageBodyHtml += '<span style="font-weight:bold; font-size:12px; font-family:Arial, Helvetica, sans-serif;text-decoration:blink; text-shadow:1px 1px 0 #fff;"><a style="color: rgb(39, 142, 230);" href="#server#">click here to view all details</a></span> ';
        //            messageBodyHtml += '</p> </div></td></tr> </table>';
        //            if (event) {
        //                var param = JSON2.stringify({ storeId: storeId, portalId: portalId, ID: notificationID, senderName: userName, message: subject, messageDetail: messageBodyHtml, url: aspxRedirectPath, userEmail: UserEmail, cultureName: cultureName, userName: userName });
        //                this.config.method = "SendEmailNotification";
        //                this.config.url = this.config.baseURL + this.config.method;
        //                this.config.data = param;
        //                this.config.ajaxCallMode = 2;
        //                this.config.error = 2;
        //                this.ajaxCall(this.config);

        //            }
        //        },
        //        SendMultipleEmail: function(ids, event) {

        //            StockOutofNotification.SendEmailToUser(ids, event);
        //        },

        SearchNotificationList: function() {
            var itemSKU = $.trim($("#txtProductName").val());
            var mailStatus = $.trim($("#txtMailStatus").val());
            //            var itemStatus = $.trim($("#ddlItemStatus").val());
            var itemStatus = null;
            var customer = $.trim($("#txtCustomerName").val());
            if (customer == '') {
                customer = null;
            }
            if (itemSKU.length < 1) {
                itemSKU = null;
            }
            if (mailStatus == "0") {
                mailStatus = null;
            }
            else if (mailStatus == "Yes") {
                mailStatus = '1';
            }
            else if (mailStatus == "No") {
                mailStatus = '0';
            }
            //            if (itemStatus == "0") {
            //                itemStatus = null;

            //            } else if (itemStatus == "Available") {
            //                itemStatus = '1';
            //            } else if (itemStatus == "OutofStock") {
            //                itemStatus = '0';
            //            }
            StockOutofNotification.BindNotificationListInGrid(itemSKU, mailStatus, itemStatus, customer, storeId, portalId);
        }
    };
    StockOutofNotification.init();

});
