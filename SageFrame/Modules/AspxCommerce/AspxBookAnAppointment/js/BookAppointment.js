var BookAppointment;
function AspxCommonObj() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        CultureName: AspxCommerce.utils.GetCultureName(),
        UserName: AspxCommerce.utils.GetUserName()
    };
    return aspxCommonObj;
}
$(function() {
    var serviceDateID = 0;
    // var GatewayName = '';
    BookAppointment = function() {
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            UserName: AspxCommerce.utils.GetUserName()
        };

        var $ajaxCall = function(url, method, param, successFx, errorFnx) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: false,
                //url: aspxservicePath + 'AspxCommerceWebService.asmx/' + method,
                //url: aspxservicePath + "AspxCommerceWebService.asmx/" + method,
                // url: modulePath + "AspxBookAnAppointment.asmx/" + method,
                url: url + method,
                data: param,
                dataType: "json",
                success: successFx,
                error: errorFnx
            });
        };
        var userValue = {
            itemType: 'servicetype',
            gatewayName: '',
            paymentMethodId: 0,
            paymentMethodName: "",
            paymentMethodCode: "",
            paymentFriendlyName: "",
            sessionValue: '',
            productItemID: 0
        };
        var loadPaymentGateway = function(data) {
            if (data.d.startsWith('System.Web.HttpException')) {
                //    csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "This Payment Gateway failed to load. Please try again Later.") + "</p>");
                csscody.alert("<h2>" + getLocale(AspxBookAnAppointment, "Information Alert") + "</h2><p>" + getLocale(AspxBookAnAppointment, "Sorry Failed to load payment gateway.") + "</p>");
                $("#btnPaymentInfoContinue").attr("disabled", "disabled");
                return false;
            } else {
                //    $("#btnPaymentInfoContinue").removeAttr("disabled").attr("enabled", "enabled");
                //console.debug($("<div>" + data.d + "</div>").find('div').length);
                var dvList = $("<div>" + data.d + "</div>");
                if (dvList.find('div').length > 0) {
                    //     debugger;
                    var button = dvList.find('input:last');
                    dvList.find('input:last').remove();
                    $('#dvPaymentInfo input[type="button"]').remove();
                    //for all
                    $('#dvPaymentInfo').find('div').not('.sfButtonwrapper').not('.cssClassClear').not('#dvPGList').not('.cssClassPaymentList').remove();
                    $('#dvPaymentInfo .sfButtonwrapper').before(dvList);
                    // var button = $('#dvPaymentInfo').find("input[type=button]");
                    $('#dvPaymentInfo input[type="button"]').remove();
                    $('#dvPlaceOrder .sfButtonwrapper ').find('input').not("#btnPlaceBack").remove();
                    // $('#dvPlaceOrder .sfButtonwrapper ').append(button);
                    $('#dvPlaceOrder .sfButtonwrapper div ').remove();
                } else {
                    $('#dvPaymentInfo').find('div').not('.sfButtonwrapper').not('.cssClassClear').not('#dvPGList').not('.cssClassPaymentList').remove();
                    $('#dvPlaceOrder .sfButtonwrapper ').find('input').not("#btnPlaceBack").remove();
                    //  $('#dvPlaceOrder .sfButtonwrapper ').append(data.d);
                    $('#dvPlaceOrder .sfButtonwrapper ').find('div').remove();
                }
            }
        };
        var getSessionValue = function(data) {
            userValue.sessionValue = parseFloat(data.d);
        };

        var setSessionValue = function(sessionKey, sessionValue) {
            var url = AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ key: sessionKey, value: sessionValue });
            $ajaxCall(url, "SetSessionVariable", param, getSessionValue, null);
        };
        var loadControl = function(ControlName, Name) {
            userValue.gatewayName = Name;
            var yy = AspxCommerce.utils.GetAspxServicePath();
            var url = yy + "LoadControlHandler.aspx/Result";
            var param = "{ controlName:'" + AspxCommerce.utils.GetAspxRootPath() + ControlName + "'}";
            $ajaxCall(url, "", param, loadPaymentGateway, getPaymentGateWayLoadErrorMsg);
        };
        var getPaymentGateWayLoadErrorMsg = function() { //load control                   
            //  csscody.error("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Error Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Failed to load payment gateway!") + "</p>");

        };
        var bindPaymentGateWayList = function(data) {
            if (data.d.length > 0) {
                $.each(data.d, function(index, item) {
                    if (item.PaymentGatewayTypeID == 1 || item.PaymentGatewayTypeID == 2) {
                        $('#dvPGList').append('<input id="rdb' + item.PaymentGatewayTypeName + '" name="PGLIST" type="radio" realname="' + item.PaymentGatewayTypeName + '" friendlyname="' + item.FriendlyName + '"  source="' + item.ControlSource + '" value="' + item.PaymentGatewayTypeID + '" class="cssClassRadioBtn" /><b><label> ' + item.PaymentGatewayTypeName + '</label></b><br/><br/>');
                    }
                });
                $('#dvPGList input[name="PGLIST"]:first').attr("checked", "checked");

                $('#dvPGList input[name="PGLIST"]').bind("click", function() {
                    BookAppointment.SetSessionValue("Gateway", $(this).attr('value'));
                    BookAppointment.SetSessionValue("ServiceType", true);
                    BookAppointment.SetSessionValue("PaymentMethodName", $(this).attr('friendlyname'));
                    if ('paypal' == $(this).attr('friendlyname').toLowerCase()) {
                        userValue.paymentMethodCode = "Paypal";
                        userValue.paymentMethodName = "Paypal";
                    } else {
                    }

                    loadControl($(this).attr('source'), $.trim($(this).attr('friendlyname')));
                    userValue.paymentMethodName = $(this).next('b').find('label').html();
                    userValue.paymentFriendlyName = $(this).attr('friendlyname');
                    userValue.paymentMethodId = $(this).attr('value');
                });
                $('#dvPGList input[name="PGLIST"]:first').trigger('click');
            }
        };

        var loadPGatewayList = function() {
            var aspxCommonInfo = AspxCommonObj();
            aspxCommonInfo.UserName = null;
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            $ajaxCall(url, "GetPGList", param, bindPaymentGateWayList, null);
        };

        var bindStoreLocation = function(data) {
            $("#ddlStoreLocation").html('');
            var storeLocation = "";
            if (data.d.length > 0) {
                storeLocation = "<option value='0'>  --- </option>";
                $.each(data.d, function(index, value) {
                    storeLocation += "<option value=" + value.LocationID + ">" + value.StoreName + "</option>";
                });
            } else {
                storeLocation += "<option value='0'>" + getLocale(AspxBookAnAppointment, "No Store Available") + "</option>";
            }
            $("#ddlStoreLocation").append(storeLocation);
        };

        var getStoreLocation = function(serviceCategoryId) {
            var commonInfo = AspxCommonObj();
            commonInfo.UserName = null;
            commonInfo.CultureName = null;
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ aspxCommonObj: commonInfo, serviceCategoryId: serviceCategoryId });
            $ajaxCall(url, "GetAllStoresForService", param, bindStoreLocation, null);
        };

        var bindAllServices = function(data) {
            $("#ddlServices").html('');
            var serviceName = "<option value='0'> --- </option>";
            $.each(data.d, function(index, value) {
                serviceName += "<option value=" + value.ServiceCategoryID + ">" + value.ServiceName + "</option>";
            });
            $("#ddlServices").append(serviceName);
            var catId = 0;
            var prodtId = 0;
            if (window.location.search.substring(1) != '') {
                catId = BookAppointment.GetQueryStringParams('cid');
                prodtId = BookAppointment.GetQueryStringParams('pid');
                $('#ddlServices').val(catId);
                $('#ddlServices').trigger('change');
                $("#ddlServiceProducts").val(prodtId);
                $("#ddlServiceProducts").trigger('change');

                $('#ddlServices').attr('disabled', 'disabled');
                $("#ddlServiceProducts").attr('disabled', 'disabled');
                $('#ddlServices').addClass('cssDisable');
                $("#ddlServiceProducts").addClass('cssDisable');
            } else {
                $('#ddlServices').removeAttr('disabled');
                $('#ddlServiceProducts').removeAttr('disabled');
            }

        };

        var getAllServices = function() {
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            $ajaxCall(url, "GetAllServices", param, bindAllServices, null);
        };

        var bindServiceProducts = function(data) {
            $("#ddlServiceProducts").html('');
            var serviceProducts = '';
            if (data.d.length > 0) {
                serviceProducts = "<option value='0'>  --- </option>";
                $.each(data.d, function(index, value) {
                    serviceProducts += "<option value=" + value.ItemID + " price=" + value.Price + " duration=" + value.ServiceDuration + ">" + value.ItemName + "</option>";
                });
            } else {
                serviceProducts += "<option value='0'>" + getLocale(AspxBookAnAppointment, "No Products Available") + "</option>";
            }
            $("#ddlServiceProducts").append(serviceProducts);
            $('.cssServiceProductsPrice,.cssServiceProductDuration').hide();
            $('#serviceProductPrice').attr('disabled', 'disabled');
            $('#serviceProductPrice').addClass('cssDisable');
        };
        var getServiceProducts = function(serviceId) {
            var commonInfo = AspxCommonObj();
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ serviceId: serviceId, aspxCommonObj: commonInfo });
            $ajaxCall(url, "GetServiceProducts", param, bindServiceProducts, null);
        };

        function parseJsonDate(jsonDate, id) {
            var dateArr = [];
            var jsonServiceDate = jsonDate;
            var serviceDate = new Date(parseInt(jsonServiceDate.replace("/Date(", '').replace(")/", ''), 10));
            var yearFrom = parseInt(serviceDate.getFullYear());
            dateArr.push(yearFrom);
            var monthFrom = parseInt((1 + serviceDate.getMonth()));
            dateArr.push(monthFrom);
            var daysFrom = parseInt(serviceDate.getDate());
            dateArr.push(daysFrom);
            dateArr.push(id);
            return dateArr;
        }

        var bindServiceDates = function(data) {
            var dates = [];
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    if (index == 0) {
                        if (value.ServiceDateFrom != null && value.ServiceDateTo != null) {
                            var dateFrom = [];
                            var serviceDateFrm = value.ServiceDateFrom;
                            var serviceDateFrom = new Date(parseInt(serviceDateFrm.replace("/Date(", '').replace(")/", ''), 10));
                            var yearFrom = parseInt(serviceDateFrom.getFullYear());
                            dateFrom.push(yearFrom);
                            var monthFrom = parseInt((1 + serviceDateFrom.getMonth()));
                            dateFrom.push(monthFrom);
                            var daysFrom = parseInt(serviceDateFrom.getDate());
                            dateFrom.push(daysFrom);
                            dateFrom.push(value.ServiceDateID);
                            dates.push(dateFrom);
                            var dateTo = [];
                            var serviceDate2 = value.ServiceDateTo;
                            var serviceDateTo = new Date(parseInt(serviceDate2.replace("/Date(", '').replace(")/", ''), 10));
                            var yearTo = parseInt(serviceDateTo.getFullYear());
                            dateTo.push(yearTo);
                            var monthTo = parseInt((1 + serviceDateTo.getMonth()));
                            dateTo.push(monthTo);
                            var daysTo = parseInt(serviceDateTo.getDate());
                            dateTo.push(daysTo);
                            dateTo.push(value.ServiceDateID);
                            dates.push(dateTo);
                            //for range of date to be highlighted
                            for (var i = 1; i < (daysTo - daysFrom); i++) {
                                var dateRange = [];
                                var dateRangeFrm = value.ServiceDateFrom;
                                var dateRangeFrom = new Date(parseInt(dateRangeFrm.replace("/Date(", '').replace(")/", ''), 10));
                                var dateRangeyearFrom = parseInt(dateRangeFrom.getFullYear());
                                dateRange.push(dateRangeyearFrom);
                                var dateRangemonthFrom = parseInt((1 + dateRangeFrom.getMonth()));
                                dateRange.push(dateRangemonthFrom);
                                var dateRangedaysFrom = parseInt(dateRangeFrom.getDate());
                                dateRange.push(dateRangedaysFrom + i);
                                dateRange.push(value.ServiceDateID);
                                dates.push(dateRange);
                            }
                        } else if (value.ServiceDateFrom == null || value.ServiceDateTo == null) {
                            if (value.ServiceDateFrom != null) {
                                dates.push(parseJsonDate(value.ServiceDateFrom, value.ServiceDateID));
                            }
                            if (value.ServiceDateTo != null) {
                                dates.push(parseJsonDate(value.ServiceDateTo, value.ServiceDateID));
                            }
                        }
                    } else {
                        if (value.ServiceDateFrom != null && value.ServiceDateTo != null) {
                            var dateFromIndex = [];
                            var serviceDateFrmIndex = value.ServiceDateFrom;
                            var serviceDateFromIndex = new Date(parseInt(serviceDateFrmIndex.replace("/Date(", '').replace(")/", ''), 10));
                            var yearFromIndex = parseInt(serviceDateFromIndex.getFullYear());
                            dateFromIndex.push(yearFromIndex);
                            var monthFromIndex = parseInt((1 + serviceDateFromIndex.getMonth()));
                            dateFromIndex.push(monthFromIndex);
                            var daysFromIndex = parseInt(serviceDateFromIndex.getDate());
                            dateFromIndex.push(daysFromIndex);
                            dateFromIndex.push(value.ServiceDateID);
                            // dates.push(dateFromIndex);
                            for (var a = 0; a < dates.length; a++) {
                                if (dates[a][0] == dateFromIndex[0] && dates[a][1] == dateFromIndex[1] && dates[a][2] == dateFromIndex[2]) {
                                    var xx = dates[a][3] + '-' + dateFromIndex[3];
                                    dates[a][3] = xx;
                                }
                            }
                            dates.push(dateFromIndex);
                            var dateToIndex = [];
                            var serviceDate2Index = value.ServiceDateTo;
                            var serviceDateToIndex = new Date(parseInt(serviceDate2Index.replace("/Date(", '').replace(")/", ''), 10));
                            var yearToIndex = parseInt(serviceDateToIndex.getFullYear());
                            dateToIndex.push(yearToIndex);
                            var monthToIndex = parseInt((1 + serviceDateToIndex.getMonth()));
                            dateToIndex.push(monthToIndex);
                            var daysToIndex = parseInt(serviceDateToIndex.getDate());
                            dateToIndex.push(daysToIndex);
                            dateToIndex.push(value.ServiceDateID);
                            //   dates.push(dateToIndex);

                            for (var b = 0; b < dates.length; b++) {
                                if (dates[b][0] == dateToIndex[0] && dates[b][1] == dateToIndex[1] && dates[b][2] == dateToIndex[2]) {
                                    var yy = dates[b][3] + '-' + dateToIndex[3];
                                    dates[b][3] = yy;
                                }
                            }
                            dates.push(dateToIndex);
                            //for range of date to be highlighted
                            for (var ii = 1; ii < (daysToIndex - daysFromIndex); ii++) {
                                var dateRangeIndex = [];
                                var dateRangeFrmIndex = value.ServiceDateFrom;
                                var dateRangeFromIndex = new Date(parseInt(dateRangeFrmIndex.replace("/Date(", '').replace(")/", ''), 10));
                                var dateRangeyearFromIndex = parseInt(dateRangeFromIndex.getFullYear());
                                dateRangeIndex.push(dateRangeyearFromIndex);
                                var dateRangemonthFromIndex = parseInt((1 + dateRangeFromIndex.getMonth()));
                                dateRangeIndex.push(dateRangemonthFromIndex);
                                var dateRangedaysFromIndex = parseInt(dateRangeFromIndex.getDate());
                                dateRangeIndex.push(dateRangedaysFromIndex + ii);
                                dateRangeIndex.push(value.ServiceDateID);
                                //  dates.push(dateRangeIndex);
                                for (var c = 0; c < dates.length; c++) {
                                    if (dates[c][0] == dateRangeIndex[0] && dates[c][1] == dateRangeIndex[1] && dates[c][2] == dateRangeIndex[2]) {
                                        var zz = dates[c][3] + '-' + dateRangeIndex[3];
                                        dates[c][3] = zz;
                                    }
                                }
                                dates.push(dateRangeIndex);
                            }
                        } else if (value.ServiceDateFrom == null || value.ServiceDateTo == null) {
                            if (value.ServiceDateFrom != null) {
                                dates.push(parseJsonDate(value.ServiceDateFrom, value.ServiceDateID));
                            }
                            if (value.ServiceDateTo != null) {
                                dates.push(parseJsonDate(value.ServiceDateTo, value.ServiceDateID));
                            }
                        }
                    }
                });
                // var dates = [[2012, 9, 1], [2012, 9, 9], [2012, 9, 25]];
                $('#txtAvailableDate').removeClass('hasDatepicker').datepicker(
                    {
                        dateFormat: 'mm/dd/yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: 0,
                        beforeShowDay: function(date) {
                            var year = date.getFullYear();
                            var month = date.getMonth();
                            var day = date.getDate();
                            // see if the current date should be highlighted
                            for (var i = 0; i < dates.length; i++)
                                if (year == dates[i][0] && month == dates[i][1] - 1 && day == dates[i][2]) {
                                //    return [true, 'ui-state-highlight ui-state-active'];
                                return [true, "ui-state-highlight ui-state-active serviceId_" + dates[i][3] + "", dates[i][3]];
                            }
                            return [false];
                        },
                        onSelect: function(date) {
                            var dateVal = date.split('/');
                            var datevalue = 0;
                            if (dateVal[1].legth == 1) {
                                datevalue = '0' + dateVal[1];
                            } else {
                                datevalue = dateVal[1];
                            }
                            $('.ui-datepicker-calendar > tbody tr').each(function() {
                                $(this).find('td a').each(function() {
                                    if (parseInt($(this).html()) == datevalue) {
                                        serviceDateID = $(this).parent('td:eq(0)').attr('title');
                                    }
                                });
                            });
                            BookAppointment.GetServiceAvailableTime();
                            $("#lblAvailableDateError").hide();
                        }
                    });
            } else {
                $('#txtAvailableDate').removeClass('hasDatepicker').datepicker(
                    {
                        dateFormat: 'mm/dd/yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: 0,
                        beforeShowDay: function(date) {
                            var year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
                            // see if the current date should be highlighted
                            for (var i = 0; i < dates.length; i++)
                                if (year == dates[i][0] && month == dates[i][1] - 1 && day == dates[i][2]) {
                                // return [true, 'ui-state-highlight ui-state-active'];
                                return [true, "ui-state-highlight ui-state-active serviceId_" + dates[i][3] + ""];
                            }
                            return [false];
                        },
                        onSelect: function(date) {
                            var dateVal = date.split('/');
                            var datevalue = 0;
                            if (dateVal[1].legth == 1) {
                                datevalue = '0' + dateVal[1];
                            } else {
                                datevalue = dateVal[1];
                            }
                            $('.ui-datepicker-calendar > tbody tr').each(function() {
                                $(this).find('td a').each(function() {
                                    if (parseInt($(this).html()) == datevalue) {
                                        serviceDateID = $(this).parent('td:eq(0)').attr('title');
                                    }
                                });
                            });
                            BookAppointment.GetServiceAvailableTime();
                            $("#lblAvailableDateError").hide();
                        }
                    });
            }
        };

        var getServicesDates = function(serviceId, branchId, empId) {
            var commonInfo = AspxCommonObj();
            commonInfo.UserName = null;
            var getServiceDateInfo = {
                ServiceID: serviceId,
                BranchID: branchId,
                EmployeeID: empId
            };
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ getServiceDateObj: getServiceDateInfo, aspxCommonObj: commonInfo });
            $ajaxCall(url, "GetServiceDates", param, bindServiceDates, null);
        };

        var getServiceAvailableTime = function() {
            var commonInfo = AspxCommonObj();
            commonInfo.UserName = null;
            var getServiceAvailbalbeTimeObj = {
                CategoryID: $.trim($('#ddlServices').val()),
                BranchID: $.trim($('#ddlStoreLocation').val()),
                EmployeeID: $('#ddlStoreServiceProviders option:selected').val(),
                ServiceDateID: serviceDateID,
                ServiceDate: $.trim($('#txtAvailableDate').val()),
                ItemID: $('#ddlServiceProducts option:selected').val()
            };
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ getServiceTimeObj: getServiceAvailbalbeTimeObj, aspxCommonObj: commonInfo });
            $ajaxCall(url, "GetServiceAvailableTime", param, bindServiceTime, errorServiceTime);
        };
        var errorServiceTime = function() {
            $('.cssClassUlTimeList').html('').html('<li>' + getLocale(AspxBookAnAppointment, "Time is not allocated!") + '</li>');
        };

        var bindServiceTime = function(data) {
            if (data.d.length > 0) {
                var serviceTimeHeader = '';
                var serviceTime = '';
                serviceTimeHeader += '<li class="cssServiceTime"><label class="cssClassHeaderTimeFrom cssClassLabel">' + getLocale(AspxBookAnAppointment, "From") + '</label>&nbsp;&nbsp;&nbsp;<label class="cssClassHeaderTimeTo cssClassLabel">' + getLocale(AspxBookAnAppointment, "To") + '</label></li>';
                $.each(data.d, function(index, value) {
                    if (value.ServiceTimeFrom == '' && value.ServiceTimeTo == '') {
                        serviceTimeHeader = '';
                        serviceTimeHeader = '<li>Time is not allocated!</li>';
                    } else {
                        serviceTime += '<li class="cssServiceTime cssClassDuration_' + value.ServiceTimeID + '">';
                        serviceTime += '<input type="checkbox" name="chkServiceTime" value=' + value.ServiceTimeID + '>';
                        serviceTime += '<label class="cssClassTimeFrom"><span>' + value.ServiceTimeFrom + '</span></label>';
                        serviceTime += '&nbsp;&nbsp;&nbsp;<label class="cssClassTimeTo"><span>' + value.ServiceTimeTo + '</span></label>';
                        serviceTime += '<div class="cssClassServiceDuration"><ul class="cssClassServiceDurationUl_' + value.ServiceTimeID + '">';
                        serviceTime += '<li class="cssClassServiceDurationLi"></li></ul></div>';
                        serviceTime += '</li>';
                    }
                });
                serviceTimeHeader += serviceTime;

                $('.cssClassUlTimeList').html('').append(serviceTimeHeader);
                $('.cssClassAvailableTime').show();
                var container = $('#idServiceTimeLi');
                container.find('input[name=chkServiceTime]').click(function(e) {
                    if (this.checked) {
                        container.find('input[name=chkServiceTime]').not(this).removeAttr('checked');
                        //  var serviceTimeFrom = $(this).parent('li').find('.cssClassTimeFrom >span').html();
                        //  var serviceTimeTo = $(this).parent('li').find('.cssClassTimeTo >span').html();

                        //   bindServiceIntervalTime($(this).val(), serviceTimeFrom, serviceTimeTo);
                        $("#lblTimeError").html('');
                        var $obj = $(this).parent('li').parent('ul');
                        $obj.find('.cssServiceTime').each(function() {
                            if ($(this).find('input[name=chkServiceTime]').attr('checked') == true) {
                            } else if ($(this).find('input[name=chkServiceTime]').attr('checked') == false) {
                                $(this).find('.cssClassServiceDuration .cssClassServiceDurationLi').animate({
                                    width: ['toggle', 'swing'],
                                    height: ['toggle', 'swing'],
                                    opacity: 'toggle'
                                }, 1000);
                            } else {
                            }
                        });
                    } else {
                        $('.cssClassServiceDurationUl_' + $(this).val()).html('');
                    }
                });

            } else {
                $('.cssClassAvailableTime').show();
                $('.cssClassUlTimeList').html('').html('<li>' + getLocale(AspxBookAnAppointment, "Time is not allocated!") + '</li>');
            }
        };

        var bindServiceIntervalTime = function(id, timeFrom, timeTo) {
            var sD = '';
            timeFrom = timeFrom.replace('AM', ' AM').replace('PM', ' PM');
            var amPmFrom = timeFrom.match(/[a-z]/gi).join('');
            var amPmTo = timeTo.match(/[a-z]/gi).join('');
            var x1 = Date.parse("1/1/2013" + ' ' + timeFrom);
            var x2 = Date.parse("1/1/2013" + ' ' + timeTo);
            if (x2 > x1) {
                sD = ((x2 - x1) / 1000 / 60);
            } else {
                alert(getLocale(AspxBookAnAppointment, "Valid time duration does not exist."));
                return false;
            }
            var duration = $.trim($('#serviceProductDuration').html().replace(/[^-0-9\.]+/g, ''));
            var tF = timeFrom.replace(/[^-0-9-:\.]+/g, '');
            tF = tF.split(/:/);
            var tT = timeTo.replace(/[^-0-9-:\.]+/g, '');
            tT = tT.split(/:/);
            //    var sD = (parseInt(tT[0]) - parseInt(tF[0])) * 60 + (parseInt(tT[1]) - parseInt(tF[1])); // Need to do: minutes is not added required to Add (REMEMBER IT)
            var count = Math.floor(sD / duration);
            var serviceAvailableTime = '';
            var interval = [];
            var tfInitial = tF[0];
            var ttInitial = tT[0];
            for (var i = 0; i < count; i++) {
                var intervalFrom = '';
                var intervalTo = '';
                serviceAvailableTime += '<li class="cssClassServiceDurationLi">';
                serviceAvailableTime += '<input type="checkbox" name="chkServiceTimeInterval" value=' + i + '>';
                if (JSON2.stringify(duration * i).length == 1) {
                    intervalFrom = tF[0] + ':' + 0 + duration * i;
                    serviceAvailableTime += '<label class="cssClassServiceTimeFrom"><span>' + intervalFrom + ' ' + amPmFrom + '</span></label>';

                } else {
                    if (duration * i >= 60) {
                        var hrs = Math.floor((duration * i) / 60);
                        tF[0] = parseInt(tfInitial) + hrs;
                        if (tF[0] >= 12) {
                            amPmFrom = amPmTo;
                        }
                        if (tF[0] > 12) {
                            tF[0] = tF[0] % 12;
                        }
                        var mins = (duration * i) % 60;
                        if (JSON2.stringify(mins).length == 1) {
                            intervalFrom = tF[0] + ':' + '0' + '0';
                        } else {
                            intervalFrom = tF[0] + ':' + mins;
                        }
                    } else {
                        intervalFrom = tF[0] + ':' + duration * i;
                    }
                    serviceAvailableTime += '<label class="cssClassServiceTimeFrom"><span>' + intervalFrom + ' ' + amPmFrom + '</span></label>';

                }
                if (duration * (i + 1) >= 60) {
                    var hrsT = Math.floor((duration * (i + 1)) / 60);
                    tF[0] = parseInt(tfInitial) + hrsT;
                    if (tF[0] >= 12) {
                        amPmFrom = amPmTo;
                    }
                    if (tF[0] > 12) {
                        tF[0] = tF[0] % 12;
                    }
                    var minsT = (duration * (i + 1)) % 60;
                    if (JSON2.stringify(minsT).length == 1) {
                        intervalTo = tF[0] + ':' + '0' + '0';
                    } else {
                        intervalTo = tF[0] + ':' + minsT;
                    }
                    serviceAvailableTime += '&nbsp;&nbsp;&nbsp;<label class="cssClassServiceTimeTo"><span>' + intervalTo + ' ' + amPmFrom + '</span></label>';
                } else {
                    intervalTo = tF[0] + ':' + duration * (i + 1);
                    serviceAvailableTime += '&nbsp;&nbsp;&nbsp;<label class="cssClassServiceTimeTo"><span>' + intervalTo + ' ' + amPmFrom + '</span></label>';

                }
                serviceAvailableTime += '<input type="hidden" value="' + intervalFrom + ' ' + amPmFrom + '-' + intervalTo + ' ' + amPmFrom + '"/><span class="cssServiceBooked"></span></li>';

                interval.push(intervalFrom + ' ' + amPmFrom + '-' + intervalTo + ' ' + amPmFrom);
            }
            if (serviceAvailableTime != '') {
                $(".cssClassServiceDurationUl_" + id).html('').append(serviceAvailableTime);
            } else {
                $(".cssClassServiceDurationUl_" + id).addClass('sfIntervalNotAvailable').html(getLocale(AspxBookAnAppointment, 'Not Available'));
            }
            var timeIntervalContainer = $(".cssClassServiceDurationUl_" + id);
            timeIntervalContainer.find('input[name=chkServiceTimeInterval]').click(function() {
                if (this.checked) {
                    timeIntervalContainer.find('input[name=chkServiceTimeInterval]').not(this).removeAttr('checked');
                } else {
                }
            });
            return interval;
        };

        var getBookedServiceTime = function(timeId) {
            //   aspxCommonObj.UserName = null;
            var commonInfo = AspxCommonObj();
            commonInfo.UserName = null;
            var getServiceBookedTimeObj = {
                ServiceCategoryID: $.trim($('#ddlServices').val()),
                BranchID: $.trim($('#ddlStoreLocation').val()),
                EmployeeID: $('#ddlStoreServiceProviders option:selected').val(),
                ServiceDateID: serviceDateID,
                ServiceDate: $.trim($('#txtAvailableDate').val()),
                ServiceTimeID: timeId,
                ItemID: $('#ddlServiceProducts option:selected').val()
            };
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            //  var param = JSON2.stringify({ categoryId: serviceId, branchId: branchId, empId: empId, serviceDateId: dateId, serviceDate: date, itemId: itemId, serviceTimeId: timeId, aspxCommonObj: aspxCommonObj });
            var param = JSON2.stringify({ getServiceBookedTimeObj: getServiceBookedTimeObj, aspxCommonObj: commonInfo });
            $ajaxCall(url, "GetServiceBookedTime", param, bindServiceBookedTime, errorServiceBookedTime);
        };
        var bindServiceBookedTime = function(data) {
            var timeFrom = '';
            var timeTo = '';
            var preferredTimeId = '';
            $('#idServiceTimeLi li').each(function() {
                if ($(this).find('input[name=chkServiceTime]').attr('checked')) {
                    timeFrom = $(this).find('.cssClassTimeFrom span').html();
                    timeTo = $(this).find('.cssClassTimeTo span').html();
                    preferredTimeId = $(this).find('input[name=chkServiceTime]').val();
                }
            });
            //    bindServiceIntervalTime(preferredTimeId, timeFrom, timeTo);
            if (data.d.length > 0) {
                var intervalArr = bindServiceIntervalTime(preferredTimeId, timeFrom, timeTo);
                if (intervalArr.length > 0) {
                    $.each(data.d, function(index, value) {
                        for (var i = 0; i < intervalArr.length; i++) {
                            var duration = parseInt($.trim($('#serviceProductDuration').html().replace(/[^-0-9\.]+/g, '')));
                            var bookedInterval = value.ServiceBookedInterval;
                            bookedInterval = bookedInterval.split('-');
                            var bookedIntervalF = bookedInterval[0];
                            var bookIff = bookedIntervalF.replace(/[^-0-9-:\.]+/g, '');
                            bookIff = bookIff.split(/:/);

                            var bookIntervalT = bookedInterval[1];
                            var bookItt = bookIntervalT.replace(/[^-0-9-:\.]+/g, '');
                            bookItt = bookItt.split(/:/);
                            var totalInterval = ((parseInt(bookItt[0]) - parseInt(bookIff[0])) * 60) + (parseInt(bookItt[1]) - parseInt(bookIff[1]));
                            if (duration < totalInterval) {
                                if (checkIntervalIsInDuration(intervalArr[i], value.ServiceBookedInterval, 0)) {
                                    var $hiden1 = $('#idServiceTimeLi li').find("input:hidden[value=" + intervalArr[i] + "]");
                                    $hiden1.parent('li:eq(0)').find("input[name=chkServiceTimeInterval]").attr('disabled', 'disabled');
                                    $hiden1.parent('li:eq(0)').addClass('booked');
                                }
                            } else if (totalInterval == duration) {
                                if (intervalArr[i] == value.ServiceBookedInterval) {
                                    var $hiden = $('#idServiceTimeLi li').find("input:hidden[value=" + intervalArr[i] + "]");
                                    $hiden.parent('li:eq(0)').find("input[name=chkServiceTimeInterval]").attr('disabled', 'disabled');
                                    $hiden.parent('li:eq(0)').addClass('booked');
                                }
                            } else if (duration > totalInterval) {
                                if (checkIntervalIsInDuration(intervalArr[i], value.ServiceBookedInterval, 1)) {
                                    var $hiden3 = $('#idServiceTimeLi li').find("input:hidden[value=" + intervalArr[i] + "]");
                                    $hiden3.parent('li:eq(0)').find("input[name=chkServiceTimeInterval]").attr('disabled', 'disabled');
                                    $hiden3.parent('li:eq(0)').addClass('booked');
                                }
                            }
                        }
                    });
                } else {
                }
            } else {
                bindServiceIntervalTime(preferredTimeId, timeFrom, timeTo);
            }
        };
        var errorServiceBookedTime = function() {
        };

        var checkIntervalIsInDuration = function(intervalVal, bookedInterVal, x) {
            var boolval = false;
            var intervalValue = intervalVal.split('-');
            var intervalValueFrom = intervalValue[0].replace(/[^-0-9-:\.]+/g, '');
            var intervalValueTo = intervalValue[1].replace(/[^-0-9-:\.]+/g, '');

            var bookedIntervalValue = bookedInterVal.split('-');
            var bookedIntervalValueFrom = bookedIntervalValue[0].replace(/[^-0-9-:\.]+/g, '');
            var bookedIntervalValueTo = bookedIntervalValue[1].replace(/[^-0-9-:\.]+/g, '');
            if (x == 1) {
                if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                    (Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo)) &&
                        (Date.parse("1/1/2013" + ' ' + intervalValueTo) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo))) {
                    boolval = true;
                } else if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                    (Date.parse("1/1/2013" + ' ' + intervalValueTo) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom))) {
                    boolval = true;
                }
            } else if (x == 0) {
                if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                    (Date.parse("1/1/2013" + ' ' + intervalValueTo) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo))) {
                    if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                        (Date.parse("1/1/2013" + ' ' + intervalValueTo) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom))) {
                        boolval = false;
                    } else {
                        boolval = true;
                    }
                } else if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                    (Date.parse("1/1/2013" + ' ' + intervalValueFrom) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo)) &&
                        (Date.parse("1/1/2013" + ' ' + intervalValueTo) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo))) {
                    boolval = false;

                } else if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                    (Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo)) &&
                        (Date.parse("1/1/2013" + ' ' + intervalValueTo) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo))) {
                    boolval = true;

                } else if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                    (Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo))) {
                    if ((Date.parse("1/1/2013" + ' ' + intervalValueFrom) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueFrom)) &&
                        (Date.parse("1/1/2013" + ' ' + intervalValueFrom) <= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo)) &&
                            (Date.parse("1/1/2013" + ' ' + intervalValueTo) >= Date.parse("1/1/2013" + ' ' + bookedIntervalValueTo))) {
                        boolval = false;
                    } else {
                        boolval = true;
                    }
                }
            }
            return boolval;
        };
        var saveBookAppointment = function(orderId) {

            var appointmentStausId = 1;
            var firstName = $.trim($("#txtFirstName").val());
            var lastName = $.trim($("#txtLastName").val());
            var timeFrom = '';
            var timeTo = '';
            var serviceIntervalFrm = '';
            var serviceIntervalTo = '';
            var preferredTimeId = '';
            $('#idServiceTimeLi li').each(function() {
                if ($(this).find('input[name=chkServiceTime]').attr('checked')) {
                    timeFrom = $(this).find('.cssClassTimeFrom span').html();
                    timeTo = $(this).find('.cssClassTimeTo span').html();
                    preferredTimeId = $(this).find('input[name=chkServiceTime]').val();
                    $(this).find('.cssClassServiceDuration ul li').each(function() {
                        if ($(this).find('input[name=chkServiceTimeInterval]').attr('checked')) {
                            serviceIntervalFrm = $(this).find('.cssClassServiceTimeFrom span').html();
                            serviceIntervalTo = $(this).find('.cssClassServiceTimeTo span').html();
                        }
                    });
                }
            });
            var preferredTime = timeFrom + '-' + timeTo;
            var interval = serviceIntervalFrm + '-' + serviceIntervalTo;
            var bookAppointmentInfo = {
                infoData: {
                    //    AppointmentID: appointmentId,
                    OrderID: orderId,
                    AppointmentStatusID: appointmentStausId,
                    AppointmentStatusName: 'Pending',
                    // IsSystemUsed: Boolean(isSystemUsed),
                    Title: $.trim($("#ddlTitle option:selected").text()), //.slice(0, $(this).val().length - 1)
                    UserName: firstName + ' ' + lastName,
                    FirstName: firstName,
                    LastName: lastName,
                    Gender: $.trim($('input[name=gender]:checked').val()),
                    PhoneNumber: $.trim($("#txtPhoneNumber").val()),
                    MobileNumber: $.trim($("#txtMobileNumber").val()),
                    Email: $.trim($("#txtEmailAddressAppointment").val()),
                    PreferredDate: $.trim($('#txtAvailableDate').val()),
                    preferredTime: preferredTime,
                    TypeOfTreatment: $.trim($("#txtTypeofTreatment").val()),
                    StoreLocation: $.trim($("#ddlStoreLocation option:selected").val()),
                    TypeOfCustomer: $.trim($('input[name=customerType]:checked').val()),
                    MembershipElite: $.trim($('input[name=membershipElite]:checked').val()),
                    ServiceCategoryID: $.trim($('#ddlServices option:selected').val()),
                    ServiceCategoryName: $.trim($('#ddlServices option:selected').text()),
                    ServiceProductID: $.trim($('#ddlServiceProducts option:selected').val()),
                    ServiceProductName: $.trim($('#ddlServiceProducts option:selected').text()),
                    // ServiceProductPrice: $.trim($('#serviceProductPrice').val().replace(/[^-0-9\.]+/g, "")),
                    ServiceProductPrice: $.trim($('#serviceProductPrice').html().replace(/[^-0-9\.]+/g, "")),
                    PaymentMethodID: userValue.paymentMethodId,
                    PaymentMethodName: userValue.paymentMethodName,
                    StoreLocationName: $.trim($('#ddlStoreLocation option:selected').text()),
                    ServiceDateId: serviceDateID,
                    PreferredTimeInterval: interval,
                    PreferredTimeId: preferredTimeId,
                    ServiceDuration:$.trim($('#serviceProductDuration').html()),
                    EmployeeID: $('#ddlStoreServiceProviders option:selected').val(),
                    EmployeeName: $('#ddlStoreServiceProviders option:selected').text(),
                    AddedOn: ''
                }
            };
            var commonInfo = AspxCommonObj();
            commonInfo.UserName = null;
            var appointmentId = 0;
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ appointmentId: appointmentId, aspxCommonObj: commonInfo, obj: bookAppointmentInfo.infoData });
            $ajaxCall(url, "SaveBookAppointment", param, saveBookAppointmentSucess, null);
            return saveBookAppointmentSucess;
        };
        var saveBookAppointmentSucess = function(msg) {
            //  BookAppointment.ClearForm();
            // csscody.info("<h2>" + getLocale(AspxBookAppointment, "Successful Message") + "</h2><p>" + getLocale(AspxBookAppointment, "Appointment has been booked successfully.") + "</p>");
            //   csscody.info("<h2>Successful Message</h2><p>Appointment has been booked successfully. Please check your mail for confirmation.</p>");
            return msg.d;
        };
        var enableCheckBox = function() {
            var container = $('#chkGender');
            container.find('input[name=gender]').click(function(e) {
                if (this.checked) {
                    container.find('input[name=gender]').not(this).removeAttr('checked');
                    $("#genderError").html('');
                }
            });
            var customerContainer = $('#customerType');
            customerContainer.find('input[name=customerType]').click(function(e) {
                if (this.checked) {
                    customerContainer.find('input[name=customerType]').not(this).removeAttr('checked');
                    $("#customerTypeError").html('');
                }
            });
            var membershipEliteContainer = $('#membershipElite');
            membershipEliteContainer.find('input[name=membershipElite]').click(function(e) {
                if (this.checked) {
                    membershipEliteContainer.find('input[name=membershipElite]').not(this).removeAttr('checked');
                    $("#membershipeEliteError").html('');
                }
            });
        };
        var loadTimeDropDown = function() {
            var timeHrsOption = '';
            for (var i = 0; i <= 12; i++) {
                if (JSON2.stringify(i).length == 1) {
                    timeHrsOption += '<option value="' + 0 + i + '">' + 0 + i + '</option>';
                } else {
                    timeHrsOption += '<option value="' + i + '">' + i + '</option>';
                }
            }
            //      $("#ddlHour").html('').append(timeHrsOption);
            var timeMinOption = '';
            timeMinOption += '<option value="' + 0 + 0 + '">' + 0 + 0 + '</option>';
            timeMinOption += '<option value="' + 15 + '">' + 15 + '</option>';
            timeMinOption += '<option value="' + 30 + '">' + 30 + '</option>';
            timeMinOption += '<option value="' + 45 + '">' + 45 + '</option>';
            //            for (var j = 0; j <= 59; j++) {
            //                if (JSON2.stringify(j).length == 1) {
            //                    timeMinOption += '<option value="' + 0 + j + '">' + 0 + j + '</option>';
            //                } else {
            //                timeMinOption += '<option value="' + j + '">' + j + '</option>';
            //                    
            //                }
            //            }
            // $("#ddlMinute").html('').append(timeMinOption);
        };
        var clearForm = function() {
            $('#ddlServices').val(0);
            $('#ddlServiceProducts').val(0);
            $("#ddlStoreLocation").val(0);
            $('.cssClassAvailableDate').val('').hide();
            $('.cssClassAvailableTime').hide();
            $("#ddlTitle").val(0);
            $("#txtFirstName").val('');
            $("#txtLastName").val('');
            $('input[name=gender]:checked').removeAttr('checked');
            $("#txtMobileNumber").val('');
            $("#txtPhoneNumber").val('');
            $("#txtEmailAddressAppointment").val('');
            $("#txtTypeofTreatment").val('');

            $('input[name=customerType]:checked').removeAttr('checked');
            $('input[name=membershipElite]:checked').removeAttr('checked');

            $('.cssServiceProductsPrice,.cssServiceProductDuration').show();
            $('#serviceProductPrice').val('');
        };
        var verifyForm = function() {
            var c = $("#form1").validate({
                rules: {
                    FirstName: {
                        required: true,
                        minlength: 2
                    },
                    LastName: {
                        required: true,
                        minlength: 2
                    },
                    MobileNumber: {
                        required: true,
                        number: true,
                        minlength: 10,
                        maxlength: 15
                    },
                    PhoneNumber: {
                        required: true,
                        number: true,
                        minlength: 7,
                        maxlength: 12
                    },
                    AppointmentEmail: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    FirstName: {
                        required: getLocale(AspxBookAnAppointment,'* field required'),
                        minlength: getLocale(AspxBookAnAppointment,"* (at least 2 chars)")
                    },
                    LastName: {
                        required: getLocale(AspxBookAnAppointment,'* field required'),
                        minlength: getLocale(AspxBookAnAppointment,"* (at least 2 chars)")
                    },
                    MobileNumber: {
                        required: getLocale(AspxBookAnAppointment,'* field required'),
                        //number: 'only numbers',
                        minlength: getLocale(AspxBookAnAppointment,"*(at least 10 digits)"),
                        maxlength: getLocale(AspxBookAnAppointment,"*(at most 15 digits)")
                    },
                    PhoneNumber: {
                        required: getLocale(AspxBookAnAppointment,'* field required'),
                        //    number: 'only numbers',
                        minlength: getLocale(AspxBookAnAppointment,"*(at least 7 digits)"),
                        maxlength: getLocale(AspxBookAnAppointment,"*(at most 12 digits)")
                    },
                    AppointmentEmail: {
                        required: getLocale(AspxBookAnAppointment,'* field required'),
                        email: getLocale(AspxBookAnAppointment,"Please enter valid email id")
                    },
                    TypeOfTreatment: {
                        required: getLocale(AspxBookAnAppointment,'* field required')
                    }
                }
            });
            if (c.form()) {
                if ($('input[name=gender]:checked').length > 0) {
                    if ($('input[name=customerType]:checked').length > 0) {
                        if ($('input[name=membershipElite]:checked').length > 0) {
                            if ($("#ddlServices").val() != 0) {
                                $('#serviceError').html('');
                                //$('#ddlServices').removeClass('error');

                                if ($("#ddlServiceProducts").val() != 0) {
                                    // $('#ddlServiceProducts').removeClass('error');
                                    if ($("#ddlStoreLocation").val() != 0) {
                                        $('#ddlStoreLocation').removeClass('error');
                                        if ($("#txtAvailableDate").val() != '') {
                                            $("#lblAvailableDateError").hide();
                                            if ($('.cssClassAvailableTime:visible').length > 0) {
                                                if ($('input[name=chkServiceTime]:checked').length > 0) {
                                                    $("#lblTimeError").html('').removeClass("red");
                                                    // BookAppointment.SaveBookAppointment();
                                                    return true;
                                                } else {
                                                    $('.cssClassAvailableTime').show();
                                                    $("#lblTimeError").html(getLocale(AspxBookAnAppointment, "Select one available time")).css("color", "red");
                                                    return false;
                                                }
                                            } else {
                                                $('.cssClassAvailableTime').show();
                                                $("#lblTimeError").html(getLocale(AspxBookAnAppointment, "Time is not allocated for this date!")).css("color", "red");
                                                return false;
                                            }
                                        } else {
                                            $("#lblAvailableDateError").show();
                                            return false; //added lately
                                        }
                                    } else {
                                        //$('#ddlStoreLocation').attr('class', 'sfListmenu error');
                                        $('#storeError').html(getLocale(AspxBookAnAppointment,'required')).css("color", "red");
                                        return false;
                                    }
                                } else {
                                    // $('#ddlServiceProducts').attr('class', 'sfListmenu error');
                                    $('#serviceProductError').html(getLocale(AspxBookAnAppointment,'required')).css("color", "red");
                                    return false;
                                }
                            } else {
                                // $('#ddlServices').attr('class', 'sfListmenu error');
                                $('#serviceError').html(getLocale(AspxBookAnAppointment,'required')).css("color", "red");
                                return false;
                            }
                        } else {
                            $("#membershipeEliteError").html(getLocale(AspxBookAnAppointment,"Select one membership elite")).css("color", "red");
                            return false;
                        }
                    } else {
                        $("#customerTypeError").html(getLocale(AspxBookAnAppointment,"Select one customer type")).css("color", "red");
                        return false;
                    }
                } else {
                    $("#genderError").html(getLocale(AspxBookAnAppointment,"Select one gender")).css("color", "red");
                    return false;
                }
            } else {
                return false;
            }
        };
        var getQueryStringParams = function(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        };
        var bindServiceProviderEmployee = function(data) {
            $("#ddlStoreServiceProviders").html('');
            var serviceProvierEmployee = "<option value='0'> --- </option>";
            $.each(data.d, function(index, value) {
                serviceProvierEmployee += "<option value=" + value.EmployeeID + ">" + value.EmployeeName + "</option>";
            });
            $("#ddlStoreServiceProviders").append(serviceProvierEmployee);
        };
        var getServceProviderEmployee = function(serviceId, branchId) {
            // aspxCommonObj.UserName = null;
            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ serviceCategoryId: serviceId, storeBranchId: branchId, aspxCommonObj: aspxCommonObj });
            $ajaxCall(url, "GetServiceProviderNameListFront", param, bindServiceProviderEmployee, null);
        };
        var init = function() {
            $('#ddlStoreLocation').change(function() {
                $('.cssClassAvailableTime').hide();
                if ($(this).val() != 0) {
                    $('.cssClassServiceProvider').show();
                    //  $('#txtAvailableDate').val('');
                    //  $('.cssClassAvailableDate').show();
                    $('#storeError').html('');
                    var serviceId = $('#ddlServices').val();
                    var branchId = $(this).val();
                    if ($('#ddlServiceProducts').val() != 0) {
                        $('#storeError').html('');
                        getServceProviderEmployee(serviceId, branchId);
                    } else {
                        $('#serviceProductError').html(getLocale(AspxBookAnAppointment, 'Please select product first')).css("color", "red");
                        $(this).val(0);
                        return false;
                    }
                } else {
                    $('.cssClassAvailableDate,.cssClassAvailableTime').hide();
                    $('#ddlStoreServiceProviders').val(0);
                    $('.cssClassServiceProvider').hide();
                }
            });

            $('#ddlStoreServiceProviders').change(function() {
                if ($(this).val() != 0) {
                    // Get service date fun
                    var serviceId = $('#ddlServices').val();
                    var branchId = $('#ddlStoreLocation option:selected').val();
                    var empId = $('#ddlStoreServiceProviders option:selected').val();
                    BookAppointment.GetServicesDates(serviceId, branchId, empId);
                    $('#txtAvailableDate').val('');
                    $('.cssClassAvailableDate').show();
                    $('.cssClassAvailableTime').hide();
                } else {
                    $('.cssClassAvailableDate,.cssClassAvailableTime').hide();
                }
            });

            $('#ddlServices').change(function() {
                $('#ddlStoreLocation').val(0);
                if ($(this).val() != 0) {
                    $('#serviceError').html('');
                    $('.cssClassUlTimeList').html('');
                    $("#lblTimeError").html('').removeClass("red");
                    var serviceId = $(this).val();
                    BookAppointment.GetServiceProducts(serviceId);
                    BookAppointment.GetStoreLocation(serviceId);
                } else {
                    $("#ddlServiceProducts").val(0);
                    $("#ddlServiceProducts").trigger('change');

                    $('#ddlStoreLocation').trigger('change');
                    return false;
                }
                if ($('#ddlStoreLocation').val() == 0) {
                    $('.cssClassAvailableDate,.cssClassAvailableTime').hide();
                }
            });
            $("#ddlServiceProducts").change(function() {
                $('.cssClassAvailableTime').hide();
                $('#txtAvailableDate').val('');
                // $('.cssClassAvailableDate').show();
                if ($(this).val() == 0) {
                    $('.cssServiceProductsPrice,.cssServiceProductDuration,.cssClassAvailableTime,.cssClassAvailableDate').hide();
                    $('#ddlStoreLocation').val(0);
                    if ($('#ddlServices').val() == 0) {
                        $(this).html('').append("<option value='0'>  --- </option>");
                    }
                } else {
                    $('.cssServiceProductsPrice,.cssServiceProductDuration').show();
                    $('#serviceProductError').html('');
                    var price = $("#ddlServiceProducts option:selected").attr('price');
                    price = price * rate;
                    //$('#serviceProductPrice').val(price).attr('disabled', 'disabled');
                    $('#serviceProductPrice').html(price);
                    $('#serviceProductDuration').html($("#ddlServiceProducts option:selected").attr('duration') + ' ' + 'minutes');
                    setSessionValue("GrandTotalAll", $('#serviceProductPrice').html().replace(/[^-0-9\.]+/g, ""));
                    userValue.productItemID = parseInt($("#ddlServiceProducts option:selected").val());
                }
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            });

            $('#btnPlaceOrder').bind('click', function() {

                if (BookAppointment.VerifyForm()) {
                    saveOrderDetailsFirst();
                } else {
                    csscody.alert("<h2>" + getLocale(AspxBookAnAppointment, "Information Alert") + "</h2><p>" + getLocale(AspxBookAnAppointment, "Please fill up all required fields.") + "</p>");
                    return false;
                }
            });

            $('input[name=chkServiceTime]').live('click', function() {
                if ($('input[name=chkServiceTime]:checked').length > 0) {
                    var x = $(this).parent('li').attr('class');
                    x = x.split('_');
                    var timeId = x[1];
                    getBookedServiceTime(timeId);
                } else {
                }
            });


            BookAppointment.EnableCheckBox();
            // BookAppointment().LoadTimeDropDown();
            //    BookAppointment.GetStoreLocation();
            BookAppointment.GetAllServices();
            BookAppointment.LoadPGatewayList();


            var titleOptions = '<option value="1">Mr</option>';
            titleOptions += '<option value="2">Ms</option>';
            titleOptions += '<option value="3">Mrs</option>';
            $("#ddlTitle").html('').append(titleOptions);
        };

        var getSession = function(Key) {

            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ key: Key });
            $ajaxCall(url, "GetSessionVariableCart", param, function(data) {
                userValue.sessionValue = parseFloat(data.d);
            }, null);
            return userValue.sessionValue;
        };

        var saveOrderDetailsFirst = function() {
            //credit card info
            var creditCardTransactionType = $('#ddlTransactionType option:selected').text();
            var cardNo = $('#txtCardNo').val();
            var cardCode = $('#txtCardCode').val();
            var CardType = $('#cardType option:selected').text();
            var expireDate;
            expireDate = $('#lstMonth option:selected').text();
            expireDate += $('#lstYear option:selected').text();

            //Cheque Number
            var accountNumber = $('#txtAccountNumber').val();
            var routingNumber = $('#txtRoutingNumber').val();
            var accountType = $('#ddlAccountType option:selected').text();
            var bankName = $('#txtBankName').val();
            var accountHoldername = $('#txtAccountHolderName').val();
            var checkType = $('#ddlChequeType option:selected').text();
            var checkNumber = $('#txtChequeNumber').val();
            var recurringBillingStatus = false;

            if ($('#chkRecurringBillingStatus').is(':checked'))
                recurringBillingStatus = true;
            else
                recurringBillingStatus = false;

            var paymentMethodName = "Cash On Delivery";
            var paymentMethodCode = "Cash On Delivery";
            var isBillingAsShipping = false;


            //                if ($('#chkBillingAsShipping').is(":checked"))
            //                    CheckOut.BillingAddress.IsBillingAsShipping = true;
            //                else
            //                    CheckOut.BillingAddress.IsBillingAsShipping = false;

            var orderRemarks = $("#txtAdditionalNote").val() == undefined ? '' : $("#txtAdditionalNote").val();
            var currencyCode = "USD";
            var isTestRequest = "TRUE";
            var isEmailCustomer = "TRUE";
            var discountAmount = "";
            var taxTotal = 0; //AspxOrder.getSession("TaxAll"); //'<%=Session["TaxAll"] %>'; // $.cookies.get('Tax');
            BookAppointment.GetSession("Gateway");
            var paymentGatewayID = userValue.sessionValue; //BookAppointment.GetSession("Gateway"); // '<%=Session["Gateway"] %>'; //$.cookies.get('Gateway');
            var paymentGatewaySubTypeID = 1;
            BookAppointment.GetSession("GrandTotalAll");
            var amount = userValue.sessionValue; //'<%=Session["GrandTotalAll"] %>';

            var OrderDetails = {
                BillingAddressInfo: {
                    AddressID: 0,
                    FirstName: $.trim($("#txtFirstName").val()),
                    LastName: $.trim($("#txtLastName").val()),
                    CompanyName: "",
                    EmailAddress: $.trim($("#txtEmailAddressAppointment").val()),
                    Address: "",
                    Address2: "",
                    City: "",
                    State: "",
                    Zip: "",
                    Country: "",
                    Phone: $.trim($("#txtPhoneNumber").val()),
                    Mobile: $.trim($("#txtMobileNumber").val()),
                    Fax: "",
                    Website: "",
                    IsDefaultBilling: true,
                    IsBillingAsShipping: false
                }, // CheckOut.BillingAddress,
                objSPAddressInfo: {
                    AddressID: 0,
                    FirstName: "",
                    LastName: "",
                    CompanyName: "",
                    EmailAddress: "",
                    Address: "",
                    Address2: "",
                    City: "",
                    State: "",
                    Zip: "",
                    Country: "",
                    Phone: "",
                    Mobile: "",
                    Fax: "",
                    Website: "",
                    isDefaultShipping: true
                },
                PaymentInfo: {
                    PaymentMethodName: paymentMethodName,
                    PaymentMethodCode: paymentMethodCode,
                    CardNumber: "",
                    TransactionType: creditCardTransactionType,
                    CardType: CardType,
                    CardCode: "",
                    ExpireDate: "",
                    AccountNumber: accountNumber,
                    RoutingNumber: routingNumber,
                    AccountType: accountType,
                    BankName: bankName,
                    AccountHolderName: accountHoldername,
                    ChequeType: checkType,
                    ChequeNumber: checkNumber,
                    RecurringBillingStatus: recurringBillingStatus
                },
                OrderDetailsInfo: {
                    SessionCode: '',
                    IsGuestUser: false,
                    InvoiceNumber: "",
                    TransactionID: 0,
                    GrandTotal: amount,
                    DiscountAmount: 0,
                    CouponDiscountAmount: 0,
                    CouponCode: '',
                    PurchaseOrderNumber: 0,
                    PaymentGatewayTypeID: paymentGatewayID,
                    PaymentGateSubTypeID: paymentGatewaySubTypeID,
                    ClientIPAddress: clientIPAddress,
                    UserBillingAddressID: $('.cssClassBillingAddressInfo span').attr('id'),
                    ShippingMethodID: 0, //CheckOut.UserCart.spMethodID,
                    PaymentMethodID: 0,
                    TaxTotal: taxTotal,
                    CurrencyCode: currencyCode,
                    CustomerID: AspxCommerce.utils.GetCustomerID(),
                    ResponseCode: 0,
                    ResponseReasonCode: 0,
                    ResponseReasonText: "",
                    Remarks: "", //orderRemarks,
                    IsMultipleCheckOut: false,
                    IsTest: isTestRequest,
                    IsEmailCustomer: isEmailCustomer,
                    IsDownloadable: true//CheckOut.UserCart.IsDownloadItemInCart
                },
                CommonInfo: {
                    PortalID: AspxCommerce.utils.GetPortalID(),
                    StoreID: AspxCommerce.utils.GetStoreID(),
                    CultureName: AspxCommerce.utils.GetCultureName(),
                    AddedBy: AspxCommerce.utils.GetUserName(),
                    IsActive: true//CheckOut.UserCart.isActive
                }
            };
            var lstItemsCol = {
                OrderID: 0,
                ShippingAddressID: 0,
                ShippingMethodID: 0,
                ItemID: BookAppointment.UserValue.productItemID,
                Variants: '',
                Quantity: 1,
                Price: amount,
                Weight: 0,
                Remarks: '',
                orderItemRemarks: '',
                ShippingRate: 0,
                IsDownloadable: true
            };
            var arrItem = [];
            arrItem[0] = lstItemsCol;
            var paramData = {
                OrderDetailsCollection: {
                    ObjOrderDetails: OrderDetails.OrderDetailsInfo,
                    LstOrderItemsInfo: arrItem, //OrderDetails.lstItems, //CheckOut.UserCart.lstItems,
                    ObjPaymentInfo: OrderDetails.PaymentInfo,
                    ObjBillingAddressInfo: OrderDetails.BillingAddressInfo,
                    ObjShippingAddressInfo: OrderDetails.objSPAddressInfo,
                    ObjCommonInfo: OrderDetails.CommonInfo,
                    ObjOrderTaxInfo: []//CheckOut.UserCart.objTaxList
                }
            };

            var url = aspxservicePath + "AspxCommerceWebService.asmx/";
            var param = JSON2.stringify({ "orderDetail": paramData.OrderDetailsCollection });
            $ajaxCall(url, "SaveOrderDetails", param, orderSaveSucess, orderSaveError);
        };
        var orderSaveSucess = function() {
            var orderId = BookAppointment.GetSession("OrderID");
            var isSucess = BookAppointment.SaveBookAppointment(userValue.sessionValue);
            if (isSucess) {
                if (userValue.paymentFriendlyName.toLowerCase() == "cashondelivery") {
                    document.location = AspxCommerce.utils.GetAspxRedirectPath() + "Appointment-Success" + pageExtension;
                } else if (userValue.paymentFriendlyName.toLowerCase() == "paypal") {
                    var x = AspxCommerce.utils.GetStoreID() + "#" + AspxCommerce.utils.GetPortalID() + "#" + AspxCommerce.utils.GetUserName() + "#" + AspxCommerce.utils.GetCustomerID() + "#" + AspxCommerce.utils.GetSessionCode() + "#" + AspxCommerce.utils.GetCultureName();
                    BookAppointment.SetSessionValue("PaypalData", x);
                    document.location = AspxCommerce.utils.GetAspxRedirectPath() + "Modules/AspxCommerce/PayPal/" + "PayThroughPaypal" + pageExtension;
                }
            } else {
                csscody.error("<h2>" + getLocale(AspxBookAnAppointment, "Error Message") + "</h2><p>" + getLocale(AspxBookAnAppointment, "Sorry Failed to save appointment.") + "</p>");
                var url = aspxservicePath + "AspxCommerceWebService.asmx/";
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj, orderId: orderId });
                $ajaxCall(url, "DeleteAppointmentForError", param, null, null);
                return false;
            }
        };
        var orderSaveError = function() {
            csscody.error("<h2>"+ getLocale(AspxBookAnAppointment,"Error Message")+"</h2><p>"+ getLocale(AspxBookAnAppointment,"Sorry Failed to save order.")+"</p>");
            return false;
        };
        return {
            Init: init,
            EnableCheckBox: enableCheckBox,
            ClearForm: clearForm,
            GetStoreLocation: getStoreLocation,
            SaveBookAppointment: saveBookAppointment,
            GetAllServices: getAllServices,
            GetServiceProducts: getServiceProducts,
            GetServicesDates: getServicesDates,
            GetServiceAvailableTime: getServiceAvailableTime,
            LoadPGatewayList: loadPGatewayList,
            UserValue: userValue,
            SetSessionValue: setSessionValue,
            VerifyForm: verifyForm,
            GetSession: getSession,
            GetQueryStringParams: getQueryStringParams
        };
    } ();
    BookAppointment.Init();
});