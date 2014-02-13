   function getSelect() {
     var select = $('.ui-tree-selected', 'ul#categoryTree');
     if (select.length) return select;
     else return null;
 }

function getLI(node) {
     node = node.length ? node : $(node);
     if (NodeName(node) == 'span') return node.parent();
     else if (NodeName(node) == 'ul') return node.parent();
     else return node;
 }

 function NodeName(node) {
     if (node.attr != undefined) {
         return (node.length ? node.attr('nodeName') : $(node).attr('nodeName')).toLowerCase();
     }
 }
   function IsAlreadyExisted (arr, cat) {
       var isExist = false;
       for (var i = 0; i < arr.length; i++) {
           if (arr[i] == cat) {
               isExist = true;
               break;
           }
       }
       return isExist;
   }

/// for Service tab

   function aspxCommonObj() {
       var aspxCommonInfo = {
           StoreID: AspxCommerce.utils.GetStoreID(),
           PortalID: AspxCommerce.utils.GetPortalID(),
           CultureName: AspxCommerce.utils.GetCultureName(),
           UserName: AspxCommerce.utils.GetUserName()
       };
       return aspxCommonInfo;
   }

   function GetStoreLocation() {
    var aspxCommonInfo = aspxCommonObj();
    aspxCommonInfo.cultureName = null;
    aspxCommonInfo.userName = null;
    $.ajax({
        type: "POST",
        url: aspxservicePath + "AspxCommerceWebService.asmx/GetAllStoresForService", //GetAllStoresLocation
        data: JSON2.stringify({aspxCommonObj:aspxCommonInfo, serviceCategoryId:null}),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(msg) {
            $(".cssClassDdlStoreCollection").html('');
            $(".cssClassStoreCollection").html('');
            var storeLocation = "<option value='0'>  --- </option>";
            $.each(msg.d, function(index, value) {
                storeLocation += "<option value=" + value.LocationID + ">" + value.StoreName + "</option>";
            });
            $(".cssClassDdlStoreCollection").append(storeLocation);
            $(".cssClassStoreCollection").append(storeLocation);
        },
        error: function() {
            csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Sorry! Failed to load store location.") + '</p>');
        }
    });
}

function BindBranchServiceProviders(branchId) {
    url = aspxservicePath + "AspxCommerceWebService.asmx/";
    var data = { storeBranchId: branchId, aspxCommonObj: aspxCommonObj() };
    var offset_ = 1;
    var current_ = 1;
    
    var perpage = ($("#tblBranchProviders_pagesize").length > 0) ? $("#tblBranchProviders_pagesize :selected").text() : 10;
    $("#tblBranchProviders").sagegrid({
        url: aspxservicePath + "AspxCommerceWebService.asmx/",
        functionMethod: "GetBranchProviderNameList",
        colModel: [
            { display:  getLocale(AspxUserDashBoard, 'Provider ID') , name: 'EmployeeId', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'providerChkbox', elemDefault: false, controlclass: '' },
            { display: getLocale(AspxUserDashBoard, 'StoreBranch ID'), name: 'StoreBranchId', cssclass: 'cssClassHeadCheckBox', coltype: '', align: 'center', elemClass: '', controlclass: '',hide:true },
            { display:   getLocale(AspxUserDashBoard, 'Provider Name') , name: 'EmployeeName', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
            { display: getLocale(AspxUserDashBoard, 'Provider Nick Name'), name: 'EmployeeNickName', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
            { display: getLocale(AspxUserDashBoard, 'Provider Image'), name: 'EmployeeImage', cssclass: '', controlclass: '', coltype: 'label', align: 'left',hide:true },
            { display:getLocale(AspxUserDashBoard, 'Actions') , name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
        ],
        buttons: [
            { display: getLocale(AspxUserDashBoard, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'EditProvider', arguments: '1,2,3,4' },
            { display:getLocale(AspxUserDashBoard, 'Delete') , name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'DeleteProvider', arguments: '' }
        ],
        rp: perpage,
        nomsg:getLocale(AspxUserDashBoard, "No Records Found!") ,
        param: data,
        current: current_,
        pnew: offset_,
        sortcol: { 0: { sorter: false }, 4: { sorter: false } }
    });
}
function EditProvider(tblID, argus) {
    switch (tblID) {
    case "tblBranchProviders":
        $('#divProviderTbl').hide();
        $('#btnSaveServiceProvider').show();
        $('.cssServiceProviderTbl').show();
        $('#txtServiceProviderName').val(argus[4]);
        $('#txtServiceProviderNickName').val(argus[5]);
        $('#btnCancelServiceProvider').hide();
        $('#btnSaveServiceProvider').val(argus[0]);
        break;
    default:
        break;
    }
}

function DeleteProvider(tblID,argus) {
    switch (tblID) {
    case "tblBranchProviders":
        var properties = {
            onComplete: function(e) {
                DeleteProviderFrmBranch(argus[0], e);
            }
        };
        csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, 'Delete Confirmation')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Are you sure you want to delete this provider?')+"</p>", properties);
    default:
    }
}

function DeleteProviderFrmBranch(id,e) {
    if(e) {
        var storeBranchId = $('.cssClassStoreCollection option:selected').val();
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/DeleteServiceProvider",
            data: JSON2.stringify({ aspxCommonObj:aspxCommonObj(), id: id,storeBranchId:storeBranchId }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function(msg) {
                BindBranchServiceProviders(storeBranchId);
                csscody.info('<h2>'+getLocale(AspxUserDashBoard, "Successful Message")+'</h2><p>'+getLocale(AspxUserDashBoard, 'Provider has been deleted successfully.')+ '</p>');
            },
            error: function() {
                csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to delete provider.")+'</p>');
            }
        });
    }
}
function EnableServiceFunction() {
    $('.cssClassUlDate li').find(".cssClassServiceAvailableDateFrom").unbind().removeAttr('id').removeClass('hasDatepicker').datepicker(
        {
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            minDate: 0,
            buttonImageOnly: true,
            onSelect: function(selectedDate) {
                $('.cssClassUlDate li').find(".cssClassServiceAvailableDateFrom, .cssClassServiceAvailableDateTo").removeClass('error');
                $(this).parent('li').find(".cssClassServiceAvailableDateTo").datepicker("option", "minDate", selectedDate);
                //$('.cssClassUlDate li').find(".cssClassServiceAvailableDateTo").datepicker("option", "minDate", selectedDate);
            },
            beforeShow:function () {
                if ($(this).parent('li').find(".cssClassServiceAvailableDateTo").val() == '') {
                    $(this).parent('li').find(".cssClassServiceAvailableDateTo").datepicker("option", "minDate", '');
                     $(this).parent('li').find(".cssClassServiceAvailableDateFrom").datepicker("option", "maxDate", '');
                } else {
                    var minDate = $(this).parent('li').find(".cssClassServiceAvailableDateTo").val();
                    $(this).parent('li').find(".cssClassServiceAvailableDateFrom").datepicker("option", "maxDate", minDate);
                }
            }
        }
    );
    $('.cssClassUlDate li').find(".cssClassServiceAvailableDateTo").unbind().removeAttr('id').removeClass('hasDatepicker').datepicker(
        {
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
             minDate: 0,
            buttonImageOnly: true,
            onSelect: function(selectedDate) {
                $('.cssClassUlDate li').find(".cssClassServiceAvailableDateTo, .cssClassServiceAvailableDateFrom").removeClass('error');
                $(this).parent('li').find(".cssClassServiceAvailableDateFrom").datepicker("option", "maxDate", selectedDate);
            },
            beforeShow:function () {
                if ($(this).parent('li').find(".cssClassServiceAvailableDateFrom").val() == '') {
                    var currentDate = new Date();
                    var day = currentDate.getDate();
                    var month = currentDate.getMonth() + 1;
                    var year = currentDate.getFullYear();
                    var minDate = month + "/" + day + "/" + year;

                    $(this).parent('li').find(".cssClassServiceAvailableDateFrom").datepicker("option", "maxDate", '');
                    $(this).parent('li').find(".cssClassServiceAvailableDateTo").datepicker("option", "minDate",minDate);
                } else {
                    var minDate2 = $(this).parent('li').find(".cssClassServiceAvailableDateFrom").val();
                  
                    $(this).parent('li').find(".cssClassServiceAvailableDateTo").datepicker("option", "maxDate", '');
                    $(this).parent('li').find(".cssClassServiceAvailableDateTo").datepicker("option", "minDate",minDate2);
                }
            }
        }
    );
    $('.timeFrom').removeClass('hasPtTimeSelect').ptTimeSelect();
    $('.timeTo').removeClass('hasPtTimeSelect').ptTimeSelect();
//    $('.cssClassDdlServiceProviders').bind('change', function() {
//        if ($(this).val() != 0) {
//            $(this).removeClass('error');
//            $('.cssProviderError').html('');
//        }
//    });
    EnableServiceProviderDdlChange();
}

function AssignServiceEmployee(obj) {
    var $cloneProvider = $(obj).closest('div').parent('div').clone();
    $cloneProvider.find('.cssClassUlDate .cssClassLiDate').not(':first').remove();
    $cloneProvider.find('.cssClassSpanTime').not(':first').remove();
    $cloneProvider.find('.cssClassServiceAvailableDateFrom:last').removeAttr('id').removeClass('error').val('');
    $cloneProvider.find('.cssClassServiceAvailableDateTo:last').removeAttr('id').removeClass('error').val('');
    $cloneProvider.find('.timeFrom').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $cloneProvider.find('.timeTo').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $cloneProvider.find('.serviceDateId').val(0);
    $cloneProvider.find('.serviceTimeId').val(0);
    $cloneProvider.find('.serviceEmployeeId').val(0);
    $cloneProvider.find('.cssProviderError').html('');
    $cloneProvider.appendTo($(obj).closest('div').parent('div').closest('td'));
    EnableServiceFunction();
    EnableServiceProviderDdlChange();
}
function AddServiceDate(obj) {
    var $clone = $(obj).closest('li').clone();
    $clone.find('.cssClassSpanTime').not(':first').remove();
    $clone.find('.cssClassServiceAvailableDateFrom:last').removeAttr('id').removeClass('error').val('');
    $clone.find('.cssClassServiceAvailableDateTo:last').removeAttr('id').removeClass('error').val('');
    $clone.find('.serviceDateId').val(0);
    $clone.find('.serviceTimeId').val(0);
    $clone.find('.timeFrom').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $clone.find('.timeTo').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $clone.appendTo($(obj).parents("ul:eq(0)"));
    EnableServiceFunction();
    EnableEmployeePopUp();
}

function AddServiceTime(obj) {
    var $time = $(obj).closest('span').clone();
    $time.find('.timeFrom').not(':first').remove();
    $time.find('.timeTo').not(':first').remove();
    $time.find('.serviceTimeId').val(0);
    $time.find('.timeFrom').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $time.find('.timeTo').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $time.appendTo($(obj).closest('div'));
    $('.timeFrom').ptTimeSelect();
    $('.timeTo').ptTimeSelect();
}

function AddMoreBranchService(obj) {
    var rowIndex = $(".cssClassAddStoreBtn:last").closest("tr")[0].rowIndex + 1;
    var $row = $(obj).closest("tr").clone();
    $row.find('.serviceId').val(0);
    $row.find('.cssBranchError').html('');
    $row.find('.cssProviderError').html('');
    $row.find('.cssClassProviderParentDiv').not(':first').remove();
    $row.find('.cssClassProviderParentDiv').find('.cssClassDdlServiceProviders').html("<option value='0'>  --- </option>");
    $row.find('.cssClassUlDate .cssClassLiDate').not(':first').remove();
    $row.find('.cssClassSpanTime').not(':first').remove();
   // $row.find(".cssClassDisplayOrder").val(rowIndex);
    $row.find("select").removeClass('error').addClass(rowIndex);

    $row.find("select").bind('change', function() {
        if ($(this).val() == 0) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    $row.find('.cssClassServiceAvailableDateFrom:last').removeAttr('id').removeClass('error').val('');
    $row.find('.cssClassServiceAvailableDateTo:last').removeAttr('id').removeClass('error').val('');

    $row.find('.timeFrom').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $row.find('.timeTo').removeClass('hasPtTimeSelect').removeClass('error').val('');
    $row.appendTo("#divServiceInfo table> tbody");
    $("#divServiceInfo table> tbody tr").each(function(index) {
        $(this).find(".cssClassDisplayOrder").val(index + 1);
    });
    $(".cssClassAddStoreBtn:last").closest("tr").removeAttr('class').addClass('servicerow serviceTr_' + rowIndex);
    EnableServiceFunction();
    EnableEmployeePopUp();
}

function DeleteAssignServiceProvider(obj) {
     var id = $(obj).closest('div').find('input[type="hidden"]').val();
  //  debugger;
    //if(  $(obj).closest('div').parent('div').closest('td').find('.cssClassProviderParentDiv').length>1) {
    //    debugger;
        if(id>0) {        
            var properties = {
                onComplete: function(e) {
                    if (e) {
                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/DeleteServiceItem",
                            data: JSON2.stringify({ option: 'serviceProvider', aspxCommonObj:aspxCommonObj(), id: id }),
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                if( $(obj).closest('div').parent('div').closest('td').find('.cssClassProviderParentDiv').length==1) {
                                    $(obj).closest('div').find('.serviceEmployeeId').val(0);
                                    $(obj).closest('div').find('.cssClassDdlServiceProviders').val(0);
                                    $(obj).closest('div').find('.serviceDateId').val(0);
                                    $(obj).closest('div').find('.cssClassServiceAvailableDateFrom').val('');
                                    $(obj).closest('div').find('.cssClassServiceAvailableDateTo').val('');
                                    $(obj).closest('div').find('.serviceTimeId').val(0);
                                    $(obj).closest('div').find('.timeFrom').val('');
                                    $(obj).closest('div').find('.timeTo').val('');
                                } else {
                                    $(obj).closest('div').parent('div').remove();
                                }
                            },
                            error: function() {
                                csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to delete service provider.")+'</p>');
                            }
                        });
                    }
                }
            };
        csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, "Delete Confirmation")+"</h2><p>"+getLocale(AspxUserDashBoard, 'Are you sure you want to delete this provider?')+"</p>", properties);
            
        } else {
            if( $(obj).closest('div').parent('div').closest('td').find('.cssClassProviderParentDiv').length>1) {
                $(obj).closest('div').parent('div').remove();
            }
        }
//    } else {
//         csscody.alert('<h2>Alert Message</h2><p>Last row can not be deleted.</p>');
//    }
}
function DeleteServiceDate(obj) {
    var id = $(obj).closest('li').find('input[type="hidden"]').val();
   // if ($(obj).closest('ul').find('li').length > 1) {
        if (id > 0) {
            var properties = {
                onComplete: function(e) {
                    if (e) {
                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/DeleteServiceItem",
                            data: JSON2.stringify({ option: 'serviceDate', aspxCommonObj:aspxCommonObj(), id: id }),
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                if ($(obj).closest('ul').find('li').length == 1) {
                                    $(obj).closest('li').find('.serviceDateId').val(0);
                                    $(obj).closest('li').find('.cssClassServiceAvailableDateFrom').val('');
                                    $(obj).closest('li').find('.cssClassServiceAvailableDateTo ').val('');
                                    $(obj).closest('li').find('.serviceTimeId').val(0);
                                    $(obj).closest('li').find('.timeFrom').val('');
                                    $(obj).closest('li').find('.timeTo').val('');
                                } else {
                                    $(obj).closest('li').remove();
                                }
                                $("#divServiceInfo table> tbody tr").each(function(index) {
                                    $(this).find(".cssClassDisplayOrder").val(index + 1);
                                });
                                $(".cssClassAddStoreBtn:last").closest("tr").removeAttr('class').addClass('servicerow serviceTr_' + rowIndex);
                            },
                            error: function() {
                                csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to delete date.")+'</p>');
                            }
                        });
                    }
                }
            };
            csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, 'Delete Confirmation')+"</h2><p>"+getLocale(AspxUserDashBoard, "Are you sure you want to delete this date?")+"</p>", properties);
        } else {
            if($(obj).closest('ul').find('li').length>1) {
                $(obj).closest('li').remove();
            }
        }
//    } else {
//        csscody.alert('<h2>Information Message</h2><p>Not Allowed to delete last Date Option.</p>');
//        return false;
//    }
}

function DeleteServiceRow(obj) {
    var id = $(obj).closest('tr').find('input[type="hidden"]').val();
  //  if ($(obj).closest('tbody').find('tr').length > 1) {
        var properties = {
            onComplete: function(e) {
                if (e) {
                    if (id > 0) {
                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/DeleteServiceItem",
                            data: JSON2.stringify({ option: 'serviceInfo', aspxCommonObj:aspxCommonObj(), id: id }),
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                if($(obj).closest('tbody').find('tr').length==1) {
                                    $(obj).closest('tr').find('.cssClassDdlStoreCollection').val(0);
                                    $(obj).closest('tr').find('.cssClassDdlServiceProviders').val(0);
                                    $(obj).closest('tr').find('.serviceEmployeeId').val(0);
                                    $(obj).closest('tr').find('.serviceDateId').val(0);
                                    $(obj).closest('tr').find('.cssClassServiceAvailableDateFrom').val('');
                                    $(obj).closest('tr').find('.cssClassServiceAvailableDateTo').val('');
                                    $(obj).closest('tr').find('.serviceTimeId').val(0);
                                    $(obj).closest('tr').find('.timeFrom').val('');
                                    $(obj).closest('tr').find('.timeTo').val('');
                                } else {
                                     $(obj).closest('tr').remove(); 
                                }
                                $("#divServiceInfo table> tbody tr").each(function(index) {
                                    $(this).find(".cssClassDisplayOrder").val(index + 1);
                                });
                            },
                            error: function() {
                                csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to delete service info.")+'</p>');
                            }
                        });
                    } else {
                        if($(obj).closest('tbody').find('tr').length>1) {
                            $(obj).closest('tr').remove();
                        }
                    }
                } else {
                    return false;
                }
            }
        };
        csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, 'Delete Confirmation')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Are you sure you want to delete this?')+"</p>", properties);
//    } else {
//        csscody.alert('<h2>Information Message</h2><p>Not Allowed to delete last Option.</p>');
//        return false;
//    }
}

function DeleteServiceTime(obj) {
    var id = $(obj).closest('span').find('input[type="hidden"]').val();
  //  if ($(obj).closest('div').find('span').length > 1) {
        if (id > 0) {
            var properties = {
                onComplete: function(e) {
                    if (e) {
                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/DeleteServiceItem",
                            data: JSON2.stringify({ option: 'serviceTime', aspxCommonObj:aspxCommonObj(), id: id }),
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                if ($(obj).closest('div').find('span').length == 1) {
                                    $(obj).closest('div').find('span').find('.serviceTimeId').val(0);
                                    $(obj).closest('div').find('span').find('.timeFrom').val('');
                                    $(obj).closest('div').find('span').find('.timeTo ').val('');
                                } else {
                                    $(obj).closest('span').remove();
                                }
                            },
                            error: function() {
                                csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to delete time.")+'</p>');
                            }
                        });
                    }
                }
            }
        csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, 'Delete Confirmation')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Are you sure you want to delete this time?')+"</p>", properties);
        } else {
            if($(obj).closest('div').find('span').length>1) {
                $(obj).closest('span').remove();
            }
        }
//    } else {
//        csscody.alert('<h2>Information Message</h2><p>Not Allowed to Delete last time option.</p>');
//        return false;
//    }
}

function LoadServiceTimeDropDown() {
    var timeHrsOption = '';
    for (var i = 0; i <= 12; i++) {
        if (JSON2.stringify(i).length == 1) {
            timeHrsOption += '<option value="' + 0 + i + '">' + 0 + i + '</option>';
        } else {
            timeHrsOption += '<option value="' + i + '">' + i + '</option>';
        }
    }
    $(".ddlHourFrom,.ddlHourTo").html('').append(timeHrsOption);
    var timeMinOption = '';
    timeMinOption += '<option value="' + 0 + 0 + '">' + 0 + 0 + '</option>';
    timeMinOption += '<option value="' + 15 + '">' + 15 + '</option>';
    timeMinOption += '<option value="' + 30 + '">' + 30 + '</option>';
    timeMinOption += '<option value="' + 45 + '">' + 45 + '</option>';

    $(".ddlMinuteFrom,.ddlMinuteTo").html('').append(timeMinOption);
}

function SaveServiceInfoDetail(categoryID) {
    var serviceInfoList = [];
    $('#divServiceInfo table tbody tr').each(function() {
        var serviceInfo = {
            ServiceId: parseInt($(this).find('.serviceId').val()),
            Position: $(this).find('.cssClassDisplayOrder').val(),
            BranchId: $(this).find('.cssClassDdlStoreCollection option:selected').val(),
            BranchName: $(this).find('.cssClassDdlStoreCollection option:selected').text(),
            //  AvailableDate: []
            EmployeeData: []
        };
        var employeeDataList = [];
        $(this).find('.cssClassProviderParentDiv').each(function() {
            var employeeData = {
                ServiceEmployeeId: parseInt($(this).find('.serviceEmployeeId').val()),
                EmployeeId: $(this).find('.cssClassDdlServiceProviders').val(),
                EmployeeName: $(this).find('.cssClassDdlServiceProviders option:selected').text(),
                AvailableDate: []
            };
            var availableDateList = [];
            $(this).find('.cssClassDate ul li').each(function() {
                var availableDate = {
                    ServiceDateId: parseInt($(this).find('.serviceDateId').val()),
                    ServiceDateFrom: $(this).find('.cssClassServiceAvailableDateFrom').val(),
                    ServiceDateTo: $(this).find('.cssClassServiceAvailableDateTo ').val(),
                    ServiceTime: []
                };
                var serviceTimeArray = [];
                $(this).find('div span').each(function() {
                    var serviceTime = {
                        ServiceTimeId: parseInt($(this).find('.serviceTimeId').val()),
                        ServiceTimeFrom: $(this).find('.timeFrom').val(),
                        ServiceTimeTo: $(this).find('.timeTo').val(),
                        ServiceQuantity: ($(this).find('.cssQuantity').val() == '' ? 1 : $(this).find('.cssQuantity').val())
                    };
                    serviceTimeArray.push(serviceTime);

                });
                availableDate.ServiceTime = serviceTimeArray;
                availableDateList.push(availableDate);
            });
            employeeDataList.push(employeeData);
            employeeData.AvailableDate = availableDateList;
        });
        //  serviceInfo.AvailableDate = availableDateList;
        serviceInfo.EmployeeData = employeeDataList;
        serviceInfoList.push(serviceInfo);
    });

    $.ajax({
        type: "POST",
        url: aspxservicePath + "AspxCommerceWebService.asmx/SaveServiceItem",

        data: JSON2.stringify({ aspxCommonObj:aspxCommonObj(), categoryId: categoryID, serviceInfo: serviceInfoList }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(msg) {
            $('.serviceId').val(0);
            $('.serviceDateId').val(0);
            $('.serviceTimeId').val(0);
            $('.serviceEmployeeId').val(0);
            $("#divServiceInfo").find('table>tbody>tr:first').find('.cssClassProviderParentDiv').not(':first').remove();
        },
        error: function() {
            csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to save service information.")+'</p>');
        }
    });
}

var branchError=false;
var empError = false;
var dateError=false;
var timeError=false;
function VerifyAvailabilityForm() {
    var flag = true;
    if ($('.cssClassService').hasClass('ui-state-disabled')) {
        return flag;
    } else {
        var branchId = [];
        $('#divServiceInfo table tbody tr').each(function() {
            if ($(this).find('.cssClassDdlStoreCollection option:selected').val() == 0) {
                flag = false;
                $(this).find('.cssClassDdlStoreCollection').addClass('error');
                $(this).find('.cssBranchError').html('select one branch');
                branchError = true;
                return false;
            } else {
                if(!IsAlreadyExisted(branchId,$(this).find('.cssClassDdlStoreCollection option:selected').val())) {
                    branchId.push($(this).find('.cssClassDdlStoreCollection option:selected').val());
                } else {
                    flag = false;
                    $(this).find('.cssClassDdlStoreCollection').addClass('error');
                     $(this).find('.cssBranchError').html('select different branch');
                    branchError = true;
                    return false;
                }
                branchError = false;
                var ServiceDateFrom = '';
                var ServiceDateTo = '';
                $(this).find('.cssClassDdlStoreCollection').removeClass('error');
                $(this).find('.cssBranchError').html('');
                var empId = [];
                $(this).find('.cssClassProviderParentDiv').each(function() {
                    if ($(this).find('.cssClassDdlServiceProviders option:selected').val() == 0) {
                        flag = false;
                        $(this).find('.cssClassDdlServiceProviders').addClass('error');
                         $(this).find('.cssProviderError').html('select one employee');
                        empError = true;
                        return false;
                    } else {
                        if (!IsAlreadyExisted(empId, $(this).find('.cssClassDdlServiceProviders option:selected').val())) {
                            empId.push($(this).find('.cssClassDdlServiceProviders option:selected').val());
                        } else {
                            flag = false;
                            $(this).find('.cssClassDdlServiceProviders').addClass('error');
                            $(this).find('.cssProviderError').html('select different employee');
                            empError = true;
                            return false;
                        }
                    }
                });
                
                
                $(this).find('.cssClassDate ul li').each(function() {
                    ServiceDateFrom = $(this).find('.cssClassServiceAvailableDateFrom').val();
                    ServiceDateTo = $(this).find('.cssClassServiceAvailableDateTo').val();
                    if (ServiceDateFrom == '' && ServiceDateTo == '') {
                        flag = false;
                        dateError = true;
                        if (ServiceDateFrom == '') {
                            $(this).find('.cssClassServiceAvailableDateFrom').addClass('error');
                        }
                        if (ServiceDateTo == '') {
                            $(this).find('.cssClassServiceAvailableDateTo').addClass('error');
                        }
                        return false;
                    } else {
                        dateError = false;
                        var ServiceTimeFrom = '';
                        var ServiceTimeTo = '';
                        $(this).find('div span').each(function() {
                            ServiceTimeFrom = $(this).find('.timeFrom').val();
                            ServiceTimeTo = $(this).find('.timeTo').val();
                            if (ServiceTimeFrom == '' || ServiceTimeTo == '') {
                                flag = false;
                                timeError = true;
                                if (ServiceTimeFrom == '') {
                                    $(this).find('.timeFrom').addClass('error');
                                }
                                if (ServiceTimeTo == '') {
                                    $(this).find('.timeTo').addClass('error');
                                }
                                $('.timeFrom,.timeTo').bind('focusout', function() {
                                    $(this).removeClass('error');
                                });
                                return false;
                            } else {
                                timeError = false;
                                return true;
                            }
                        });
                    }
                });
            }
        });
        if(flag==false) {
            var $tabs = $('#CategorManagement_TabContainer').tabs();
            $tabs.tabs('select', 5);
        }
        return flag;
    }
}

function parseJSONDate(jsonDate) {
    var date = jsonDate;
    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
    // date = ('' + date.getFullYear().toString().slice(0) + '/' + (1 + date.getMonth()) + '/' + date.getDate()); for yyyy/mm/dd format
    // date = ("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().slice(0); //for dd/mm/yyyy format
    date = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + (date.getDate())).slice(-2) + '/' + date.getFullYear().toString().slice(0); // for mm/dd/yyyy format
    return date;
}
var option = '';
function GetServiceItemInfo(categoryID) {
    $.ajax({
        type: "POST",
        url: aspxservicePath + "AspxCommerceWebService.asmx/GetServiceItemInfo",
        data: JSON2.stringify({ aspxCommonObj:aspxCommonObj(), categoryId: categoryID }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(msg) {
            //  EnableStoreDropdownChange();
            var $keytr = $("#divServiceInfo").find('table>tbody>tr:first').clone();
            $keytr.find('.serviceId').val(0);
            var $keyEmpData = $("#divServiceInfo").find('.cssClassProviderParentDiv').clone();
            var $keyUlDate = $("#divServiceInfo").find('.cssClassUlDate>.cssClassLiDate').clone();
            $keyUlDate.find('.cssClassLiDate').not(':first').remove();
            var $keySpanTime = $("#divServiceInfo table>tbody>tr:first").find('.cssClassSpanTime:eq(0)').clone();
            $keySpanTime.find('.serviceTimeId').val(0);
            $("#divServiceInfo").find('table>tbody>tr:first').remove();
            $("#divServiceInfo").find('table>tbody').html('');
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, branch) {
                    var $tr = $keytr.clone();
                    var trClass = $tr.attr('class');
                    trClass = trClass.split('_');
                    $tr.removeAttr('class');
                    $tr.addClass(trClass[0] + '_' + (index + 1));
                    $tr.find('.serviceId').val(branch.ServiceId);
                    $tr.find('.cssClassDisplayOrder').val(branch.Position);
                    $tr.find("select.cssClassDdlStoreCollection").find("option[value=" + branch.BranchId + "]").attr('selected', 'selected');
                    if (branch.EmployeeData.length > 0) {
                        GetEmployeeNameList(branch.BranchId, $tr.attr('class'));
                    }
                    var td = $tr.find("td:eq(2)");
                    $.each(branch.EmployeeData, function(k, employee) {
                        var $keyEmpData1 = $keyEmpData.clone();
                        $keyEmpData1.find('.serviceEmployeeId').val(employee.ServiceEmployeeId);
                        $keyEmpData1.find("select.cssClassDdlServiceProviders").html('');
                        //  $keyEmpData1.find("select.cssClassDdlServiceProviders").append($("<option/>").attr('value', employee.EmployeeId).html(employee.EmployeeName));
                        $keyEmpData1.find("select.cssClassDdlServiceProviders").append(option);
                        $keyEmpData1.find("select.cssClassDdlServiceProviders").find("option[value=" + employee.EmployeeId + "]").attr('selected', 'selected');

                        if (k == 0) {
                            td.find('.cssClassProviderParentDiv').parent('td').html('').append($keyEmpData1);
                        } else {
                            td.find('.cssClassProviderParentDiv').parent('td').append($keyEmpData1);
                        }
                        $keyEmpData1.find('.cssClassUlDate:eq(0)').html('');
                        $.each(employee.AvailableDate, function(i, date) {
                            var $ul = $keyUlDate.clone();
                            $ul.find(".serviceDateId").val(date.ServiceDateId);
                            $ul.find(".cssClassServiceAvailableDateFrom").val(date.ServiceDateFrom == null ? '' : parseJSONDate(date.ServiceDateFrom));
                            $ul.find(".cssClassServiceAvailableDateTo").val(date.ServiceDateTo == null ? '' : parseJSONDate(date.ServiceDateTo));

                            $keyEmpData1.find('.cssClassUlDate:eq(0)').append($ul);

                            $ul.find('.cssClassTime_1').html('');
                            $.each(date.ServiceTime, function(j, time) {
                                var $time = $keySpanTime.clone();
                                $time.find(".serviceTimeId").val(time.ServiceTimeId);
                                $time.find(".timeFrom").val(time.ServiceTimeFrom);
                                $time.find(".timeTo").val(time.ServiceTimeTo);
                                $time.find(".cssQuantity").val(time.ServiceQuantity);
                                $ul.find('.cssClassTime_1').append($time);
                            });
                            if (date.ServiceTime.length == 0) {
                                var $time2 = $keySpanTime.clone();
                                $ul.find('.cssClassTime_1:eq(0)').append($time2);
                            }
                        });
                        if (employee.AvailableDate.length == 0) {
                            var $ul2 = $keyUlDate.clone();
                            $keyEmpData1.find('.cssClassUlDate:eq(0)').append($ul2);
                        }

                    });

                    $("#divServiceInfo").find('table>tbody').append($tr);
                    if (branch.EmployeeData.length == 0) {
                        GetEmployeeNameList(branch.BranchId, $tr.attr('class'));
                    }
                });
            } else {
                $keytr.find('.cssClassProviderParentDiv').not(':first').remove();
                $keytr.find('.cssClassLiDate').not(':first').remove();
                $keytr.find('.cssClassLiDate>.serviceDateId').val(0);
                $keytr.find('.cssClassSpanTime').not(':first').remove();
                $keytr.find('.cssClassSpanTime>.serviceTimeId').val(0);
                $("#divServiceInfo").find('table>tbody').append($keytr);
            }
            
            EnableServiceFunction();
            EnableStoreDropdownChange();
            $("#divServiceInfo table> tbody tr").each(function(index) {
                $(this).find(".cssClassDisplayOrder").val(index + 1);
            });
        },
        error: function() {
            csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to load service information.")+'</p>');
        }
    });
}

function EnableEmployeePopUp() {
    $(".cssClassAddProvider").unbind().live("click", function() {
        ShowPopupControl('popuprel6');
        $('.providerNameError').hide();
        $('.providerBranchError').hide();
        $('.providerBranchNameError').html('');
        $('.cssClassStoreCollection').val(0);
        $('.cssServiceProviderTbl').hide();
    });

    $('.cssClassClose').unbind().live("click", function() {
        $('#fade, .popupbox').fadeOut();
        $('.providerNameError').hide();
        $('.providerBranchError').hide();
       // $('.providerBranchNameError').html('');
        $('.cssServiceProviderTbl').hide();
        $('#divProviderTbl').hide();
        $('#btnSaveServiceProvider').hide();
    });

    $("#btnCancelServiceProvider").unbind().live("click", function() {
        $('#fade, #popuprel6').fadeOut();
        $('.providerNameError').hide();
        $('.providerBranchError').hide();
        
        $('.cssServiceProviderTbl').hide();
        $('#divProviderTbl').hide();
        $('#btnSaveServiceProvider').hide();
    });

    $('#txtServiceProviderName').bind('keypress', function() {
        $('.providerNameError').hide();
        $('.providerBranchNameError').html('');
    });
    
    
    var isValidForm = function() {
        if($('#txtBranchName').attr('name')==0) {
            $('.providerBranchError').show();
             $('.providerBranchNameError').html(getLocale(AspxUserDashBoard, "Please select branch first."));
            return false;
        } else {
          //   $('.providerBranchError').hide();
            if ($('#txtServiceProviderName').val() != '') {
                $('.providerNameError').hide('');
                return true;
            } else {
                $('.providerNameError').show();
                $('.providerBranchNameError').html(getLocale(AspxUserDashBoard, "Please fill up name."));
                return false;
            }
            //   return true;
        }
    };
    
    $("#btnSaveServiceProvider").unbind().live("click", function() {
        
        if (isValidForm()) {
          if(CheckProviderUniqueness(parseInt($("#btnSaveServiceProvider").val()))) {
              SaveServiceProvider();
          } else {
              return false;
          }
        } else {
            return false;
        }
    });
    EnableStoreDropdownChange();
    EnableServiceProviderDdlChange();
}

function CheckProviderUniqueness(providerId) {
    var isUnique = '';
    var providerName = $.trim($('#txtServiceProviderName').val());
    var storeBranchId = $('.cssClassStoreCollection option:selected').val();
    
     var providerSaveInfo = {
        EmployeeID: providerId,
        StoreBranchID: $('.cssClassStoreCollection option:selected').val(),
        EmployeeName:  $.trim($('#txtServiceProviderName').val()),
        EmployeeNickName: null,
        EmployeeImage: null
    };
     $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/CheckServiceProviderUniqueness",
            data: JSON2.stringify({ aspxCommonObj:aspxCommonObj(), providerUniqueObj:providerSaveInfo}),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function(msg) {
                isUnique = msg.d;
                if (msg.d==true) {
                    $('.providerBranchNameError').html('');
                }else {
                    $('.providerBranchNameError').html('Provider name ' + providerName + ' already exist');
                }
            },
            error: function() {
                csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Error occured.")+'</p>');
            }
        });
    return isUnique;
}

function EnableServiceProviderDdlChange() {
    $('.cssClassDdlServiceProviders').bind('change', function() {
        if ($(this).val() != 0) {
            $(this).removeClass('error');
            $('.cssProviderError').html('');
        }
    });
}
function EnableStoreDropdownChange() {
    $('.cssClassDdlStoreCollection').unbind().bind('change', function() {
        var parentTrClass = $(this).parent('td').parent('tr').attr('class');
        var storeBranchId = $(this).val();
        $(this).removeClass('error');
        $(this).find('.cssBranchError').html('');
        $(this).closest('tr').find('.cssClassProviderParentDiv').not(':first').remove();
        $(this).closest('tr').find('.cssClassLiDate').not(':first').remove();
        $(this).closest('tr').find('.cssClassLiDate').find(".cssClassServiceAvailableDateTo, .cssClassServiceAvailableDateFrom").val('');
        $(this).closest('tr').find('.cssClassSpanTime').not(':first').remove();
        $(this).closest('tr').find('.cssClassSpanTime').find('.timeFrom, .timeTo').val('');
        GetEmployeeNameList(storeBranchId, parentTrClass);
    });
}

function GetEmployeeNameList(branchId,parentTrClass) {
    var aspxCommonInfo = aspxCommonObj();
    aspxCommonInfo.UserName = null;
    parentTrClass = parentTrClass.split(' ');
    parentTrClass = parentTrClass[1];
    $.ajax({
        type: "POST",
        url: aspxservicePath + "AspxCommerceWebService.asmx/GetServiceProviderNameList",
        data: JSON2.stringify({  aspxCommonObj:aspxCommonInfo,  storeBranchId: branchId }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function(msg) {
            $("."+parentTrClass).find('.cssClassDdlServiceProviders').html('');
            var provider = "<option value='0'> --- </option>";
            $.each(msg.d, function(index, value) {
                provider += "<option value=" + value.EmployeeID + ">" + value.EmployeeName + "</option>";
            });
            $("." + parentTrClass).find('.cssClassDdlServiceProviders').append(provider);
//            $("." + parentTrClass).find('.cssClassProviderParentDiv').not(':first').remove();
//            $("." + parentTrClass).find('.cssClassLiDate').not(':first').remove();
//            $("." + parentTrClass).find('.cssClassLiDate').find(".cssClassServiceAvailableDateTo, .cssClassServiceAvailableDateFrom").val('');
//            $("." + parentTrClass).find('.cssClassSpanTime').not(':first').remove();
//            $("." + parentTrClass).find('.cssClassSpanTime').find('.timeFrom, .timeTo').val('');
            option = provider;
        },
        error: function() {
             csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to get store employee data.")+'</p>');
        }
    });
}

function AddServiceProviderToBranch(obj) {
//  var trClass = $(obj).parent('div').parent('div').parent('td').parent('tr').attr('class');
//    $('#btnSaveServiceProvider').attr('name', trClass);
//    var branch = $(obj).closest('tr').find('.cssClassDdlStoreCollection option:selected').html();"+getLocale(AspxUserDashBoard, "Sorry! Failed to get store employee data.")+"
//    var branchValue = $(obj).closest('tr').find('.cssClassDdlStoreCollection option:selected').val();
//    $('#txtBranchName').val(branch);
//    $('#txtBranchName').attr('name',branchValue);
//    $('#txtServiceProviderName').val('');
//    $('#txtServiceProviderNickName').val('');
     $('.cssClassStoreCollection').val(0);
    $('#btnCancelServiceProvider').show();
}

function SaveServiceProvider() {
    var providerSaveInfo = {
        EmployeeID: $('#btnSaveServiceProvider').val(),
        StoreBranchID: $('.cssClassStoreCollection option:selected').val(),
        EmployeeName: $.trim($('#txtServiceProviderName').val()),
        EmployeeNickName: $.trim($('#txtServiceProviderNickName').val()),
        EmployeeImage: null
    };
    $.ajax({
        type: "POST",
        url: aspxservicePath + "AspxCommerceWebService.asmx/SaveServiceProvider",
      //  data: JSON2.stringify({aspxCommonObj:aspxCommonObj(), storeBranchId: storeBranchId,employeeId:providerId ,employeeName:providerName,employeeNickName:providerNickName,employeeImage:null}),
       data: JSON2.stringify({aspxCommonObj:aspxCommonObj(),providerSaveInfo:providerSaveInfo }),
       contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(msg) {
          //  $('#fade, #popuprel6').fadeOut();
            $('.cssServiceProviderTbl').hide();
            $('#divProviderTbl').show();
            $('#btnCancelServiceProvider').show();
            csscody.info('<h2>'+getLocale(AspxUserDashBoard, "Successful Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Provider has been added successfully.")+'</p>');
            BindBranchServiceProviders(providerSaveInfo.StoreBranchID);
        },
        error: function() {
            csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to save provider.")+'</p>');
        }
    });
}

/// end of service tab

 var UserDashBoardCategoryMgmt ;
 
 $(function() {
     var progress=0;
     var jqxhr=null;
     var pcount = 0;
     var percentageInterval= [10, 20, 30, 40, 60,80,100];
     var timeInterval= [1, 1, 1, 1, 1,1];
     var progressTime=null;
     var arrTree = [];
     var storeId = AspxCommerce.utils.GetStoreID();
     var portalId = AspxCommerce.utils.GetPortalID();
     var userName = AspxCommerce.utils.GetUserName();
     var cultureName = AspxCommerce.utils.GetCultureName();
     var customerId = AspxCommerce.utils.GetCustomerID();
     var ip = AspxCommerce.utils.GetClientIP();
     var countryName = AspxCommerce.utils.GetAspxClientCoutry();
     var sessionCode = AspxCommerce.utils.GetSessionCode();
     var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();

     var treeHTML = '';
     var CategoryList = null;
     var catGroup;
     var DatePickerIDs = new Array();
     var FileUploaderIDs = new Array();
     var htmlEditorIDs = new Array();
     var from = '';
     var to = '';
     var editorList = new Array();
     var isAlreadyClickAddSubCategory = true;
     var checkID = 0;
     var itemIdsList = "";
     var serviceBit = false;
     UserDashBoardCategoryMgmt = {
         variables: {
             cateID: "",
             hdnCatNameTxtBox: "",
             isUnique: false,
             isServiceType:false
         // editorList: new Array()
         },
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
         ajaxCall: function() {
             $.ajax({
                 type: UserDashBoardCategoryMgmt.config.type,
                 contentType: UserDashBoardCategoryMgmt.config.contentType,
                 cache: UserDashBoardCategoryMgmt.config.cache,
                 async: UserDashBoardCategoryMgmt.config.async,
                 url: UserDashBoardCategoryMgmt.config.url,
                 data: UserDashBoardCategoryMgmt.config.data,
                 dataType: UserDashBoardCategoryMgmt.config.dataType,
                 success: UserDashBoardCategoryMgmt.ajaxSuccess,
                 error: UserDashBoardCategoryMgmt.ajaxFailure
             });
         },
         GetCategoryAll: function() {
             this.config.url = this.config.baseURL + "GetCategoryAll";
             this.config.data = JSON2.stringify({ isActive: true, aspxCommonObj: aspxCommonObj() });
             this.config.ajaxCallMode = 1;
             this.ajaxCall(this.config);
         },
         BindTreeViewChild: function(CategoryID, CategoryName, ParentID, CategoryLevel, deepLevel) {
             deepLevel = deepLevel + 1;
             var hasChild = false;
             var html = '';
             $.each(CategoryList, function(index, item) {
                 if (item.CategoryLevel == CategoryLevel) {
                     if (item.ParentID == ParentID) {
                         html += '<li id="category_'+ item.AttributeValue + '_'  + item.CategoryID + '" class="file-folder" IsService="'+item.AttributeValue+'"><b>' + item.CategoryName + '</b>';
                         htmlChild = UserDashBoardCategoryMgmt.BindTreeViewChild(item.CategoryID, item.CategoryName, item.CategoryID, item.CategoryLevel + 1, deepLevel);
                         if (htmlChild != "") {
                             html += "<ul>" + htmlChild + "</ul>";
                         }
                         html += '</li>';
                     }
                 }
             });
             return html;
         },
         AddDragDrop: function() {
             $('#categoryTree').tree({
                 expand: '*'
                 
             });
         },

         BindTreeCategory: function(data) {
             if (data.d.length > 0) {
                 var treeHTML = '';
                 CategoryList = data.d;
                 treeHTML += '<ul id="categoryTree">';
                 var deepLevel = 0;
                 $.each(CategoryList, function(i, item) {
                     if (item.CategoryLevel == 0) {
                         treeHTML += '<li id="category_' + item.AttributeValue + '_' + item.CategoryID + '_' +  item.IsActive + '" class="file-folder"><b>' + item.CategoryName + '</b>';
                         htmlChild = UserDashBoardCategoryMgmt.BindTreeViewChild(item.CategoryID, item.CategoryName, item.CategoryID, item.CategoryLevel + 1, deepLevel);
                         if (htmlChild != "") {
                             treeHTML += "<ul>" + htmlChild + "</ul>";
                         }
                         treeHTML += "</li>";
                     }
                 });
                 treeHTML += '</ul>';
                 $("#CategoryTree_Container").html(treeHTML);
                  UserDashBoardCategoryMgmt.AddDragDrop();                 
                  $('#categoryTree li').live('click', function() {                
                     var selected = getSelect();
                     var li = getLI(selected);
                     var id = li.attr('id').replace( /[^0-9]/gi , '');
                      var isServiceTypeBit = li.attr('id').split('_');
                       var Active = li.attr('id').split('_');
                       var IsActive= $.trim(Active[3]);
                     //UserDashBoardCategoryMgmt.ResetImageTab();
                     if (checkID != id) {
                        // UserDashBoardCategoryMgmt.GetCategoryByCagetoryID(id);
                         if(isServiceTypeBit[1].toLowerCase()=='yes'||isServiceTypeBit[1].toLowerCase()=='true') {
                             UserDashBoardCategoryMgmt.variables.isServiceType = true;
                             serviceBit = true;
                             GetServiceItemInfo(id);
                             $('#CategorManagement_TabContainer').tabs('enable', 5);
                             $('.cssClassAddSubCategory').addClass('disabled');
                             EnableServiceFunction();
                         } else {
                             UserDashBoardCategoryMgmt.variables.isServiceType = false;
                             serviceBit = false;
                             $('#CategorManagement_TabContainer').tabs('disable', 5);
                             $('.cssClassAddSubCategory').removeClass('disabled');
                         }
                          UserDashBoardCategoryMgmt.GetCategoryByCagetoryID(id);
                     }
                     checkID = id;
                 });
                 
             } else {
                 $("#CategoryTree_Container").html("<span class=\"cssClassNotFound\">"+getLocale(AspxUserDashBoard, 'This store has no Category listed yet!')+"</span>");
             }
         },
         GetCategoryByCagetoryID: function(catID) {
             UserDashBoardCategoryMgmt.variables.cateID = catID;
             isAlreadyClickAddSubCategory = false;
             $("#lblCategoryID").html(catID);
             $("#CagetoryMgt_categoryID").val(catID);

             this.config.url = this.config.baseURL + "GetCategoryByCategoryID";
             this.config.data = JSON2.stringify({ categoryID: catID, aspxCommonObj: aspxCommonObj() });
             this.config.ajaxCallMode = 2;
             this.config.async = false;
             this.ajaxCall(this.config);
         },

         SelectFirstTab: function() {
             var $tabs = $('#CategorManagement_TabContainer').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
             $tabs.tabs('select', 0);
         },

         EditCategory: function(data) {
             $("#CategorManagement_TabContainer").find("input[type=reset]").click();
             $(".error").removeClass("error");
             $(".diverror").removeClass("diverror");
             $.each(data, function(index, item) {
                 if (index == 0) {
                     $("#CagetoryMgt_categoryID").val(item.CategoryID);
                     $("#CagetoryMgt_parentCagetoryID").val(item.ParentID);
                     
                 }
                 UserDashBoardCategoryMgmt.FillCategoryForm(item);
             });

             UserDashBoardCategoryMgmt.SelectFirstTab();
         },

         FillCategoryForm: function(item) {
             if (item.CategoryLevel > 0) {
                 $("#" + categoryTitleLabel).html("Sub Category (ID:");
             }
             else {
                 $("#" + categoryTitleLabel).html("Category (ID:");
             }
             //item.AttributeID, item.AttributeName, item.InputTypeID, item.BooleanValue, item.IntValue, item.DateValue, item.DecimalValue, item.FileValue, item.OptionValues, item.ValidationTypeID, item.IsUnique, item.IsRequired
             var attNameNoSpace = "_" + item.AttributeName.replace(' ', '-');
             attNameNoSpace = '';
             var id = item.AttributeID + '_' + item.InputTypeID + '_' + item.ValidationTypeID + '_' + item.IsRequired + attNameNoSpace;
             var val;
             switch (item.InputTypeID) {
                 case 1: //TextField
                     $("#" + id).val(unescape(item.NvarcharValue));
                     $("#" + id).removeClass('hint');
                     break;
                 case 2: //TextArea
                     $("#" + id).val(Encoder.htmlDecode(item.TextValue));
                     for (var i = 0; i < editorList.length; i++) {
                         if (editorList[i].ID == id + "_editor") {
                             editorList[i].Editor.setData(Encoder.htmlDecode(item.TextValue));
                         }
                     }
                     $("#" + id).removeClass('hint');
                     break;
                 case 3: //Date
                     var test='new '+item.DateValue.replace(/[/]/gi, '');
                     date = eval(test);
                     $("#" + id).val(formatDate(date, "yyyy/MM/dd"));
                     $("#" + id).removeClass('hint');
                     break;
                 case 4: //Boolean
                     if (item.BooleanValue) {
                         $("#" + id).attr("checked", "checked");
                     }
                     else {
                         $("#" + id).removeAttr("checked");
                     }
                     break;
                 case 5: //MultipleSelect
                     val = item.OptionValues;
                     vals = val.split(',');
                     $.each(vals, function(i) {
                         $("#" + id + " option[value=" + vals[i] + "]").attr("selected", "selected");
                     });
                     break;
                 case 6: //DropDown
                     val = item.OptionValues;
                     vals = val.split(',');
                     $.each(vals, function(i) {
                         $("#" + id + " option[value=" + vals[i] + "]").attr("selected", "selected");
                         if(vals[i]==10) {
                             $('.cssClassForService').closest('tr').hide();
                             $('.cssClassForService').removeAttr('checked').attr('disabled', 'disabled');
                         } else {
                              $('.cssClassForService').closest('tr').show();
                              $('.cssClassForService').removeAttr('disabled');
                         }
                     });
                     break;
                 case 7: //Price
                     $("#" + id).val(item.DecimalValue);
                     $("#" + id).removeClass('hint');
                     break;

                 case 8: //File
                     //alert(item.FileValue);
                     var d = $("#" + id).parent();
                     var filePath = item.FileValue;
                     var fileName = filePath.substring(filePath);
                     if (filePath != "") {
                         var fileExt = (-1 !== filePath.indexOf('.')) ? filePath.replace( /.*[.]/ , '') : '';
                         myregexp = new RegExp("(jpg|jpeg|jpe|gif|bmp|png|ico)", "i");
                         if (myregexp.test(fileExt)) {
                             $(d).parent('div').find('span.response').html('<div class="cssClassLeft"><img src="' + aspxRootPath + categoryImagePath + "Small/" + filePath + '" class="uploadImage" height="90px" width="100px" /></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardCategoryMgmt.ClickToDeleteImage(this)" alt="Delete" title="Delete"/></div>');
                             // alert($(d).parent('div').find('span.response').html());
                         } else {
                             $(d).find('span.response').html('<div class="cssClassLeft"><a href="' + aspxRootPath + categoryImagePath + "Small/" + filePath + '" class="uploadFile" target="_blank">' + categoryImagePath + "Small/" + fileName + '</a></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardCategoryMgmt.ClickToDeleteImage(this)" alt="Delete" title="Delete"/></div>');
                         }
                         $(d).find('input[type="hidden"]').val(categoryImagePath + "Small/" + filePath);
                     }
                     break;
                 case 9: //Radio
                     if (item.OptionValues == "") {
                         $("#" + id).removeAttr("checked");
                     }
                     else {
                         $("#" + id).attr("checked", "checked");
                     }
                     break;
                 case 10: //RadioButtonList
                     $("input[value=" + item.OptionValues + "]:radio").attr("checked", "checked");
                     break;
                 case 11: //CheckBox
                     if (item.OptionValues == "") {
                         $("#" + id).removeAttr("checked");
                     }
                     else {
                         $("#" + id).attr("checked", "checked");
                     }
                     break;
                 case 12: //CheckBoxList
                     var inputs = $("input[name=" + id + "]");
                     $.each(inputs, function(i) {
                         $(this).removeAttr("checked");
                     });
                     val = item.OptionValues;
                     vals = val.split(',');
                     $.each(vals, function(i) {
                         $("input[value=" + vals[i] + "]").attr("checked", "checked");
                     });
                     break;
                 case 13: //Password
                     $("#" + id).val(item.NvarcharValue);
                     $("#" + id).removeClass('hint');
                     break;
             }
         },

         ClickToDeleteImage: function(objImg) {
             $(objImg).closest('span').html('');
             return false;
         },

         BindCategoryItemsGrid: function(categoryId, itemSKU, itemName, itemPriceFrom, itemPriceTo, serviceBit) {
             var categoryItemsInfo = {
                 CategoryID: categoryId,
                 SKU: itemSKU,
                 Name: itemName,
                 PriceFrom: itemPriceFrom,
                 PriceTo: itemPriceTo
             };
             this.config.url = this.config.baseURL;
             this.config.method = "GetCategoryItems";
             this.config.data = { categoryItemsInfo: categoryItemsInfo, aspxCommonObj: aspxCommonObj(), serviceBit: serviceBit };
             var categoryDataItemsGrid = this.config.data;
             var offset_ = 1;
             var current_ = 1;
             var perpage = ($("#gdvCategoryItems_pagesize").length > 0) ? $("#gdvCategoryItems_pagesize :selected").text() : 10;

             var isChecked = false;
             if (categoryId * 1 > 0) {
                 isChecked = true;
             }
             $("#gdvCategoryItems").sagegrid({
                 url: this.config.url,
                 functionMethod: this.config.method,
                 colModel: [
                     { display:  getLocale(AspxUserDashBoard, 'ItemID'), name: 'id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'categoryCheckBox', controlclass: 'mainchkbox2', checkedItems: '5' },
                     { display: getLocale(AspxUserDashBoard, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center', hide: true },
                     { display: getLocale(AspxUserDashBoard, 'SKU') , name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxUserDashBoard, 'Name') , name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxUserDashBoard, 'Price'), name: 'price', cssclass: 'cssClassHeadNumber', controlclass: 'cssClassFormatCurrency', coltype: 'currency', align: 'right' },
                     { display: getLocale(AspxUserDashBoard, 'IDTobeChecked'), name: 'id_to_check', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' }
                 ],
                 txtClass: 'sfInputbox',
                 rp: perpage,
                 nomsg: getLocale(AspxUserDashBoard, '"No Records Found!"'),
                 param: categoryDataItemsGrid,
                 current: current_,
                 pnew: offset_,
                 sortcol: { 0: { sorter: false } }
             });
         },

         ResetImageTab: function() {
             var tabHeading = $(".ui-tabs-panel").find('div>.response');
             $.each(tabHeading, function(i) {
                 tabHeading.html('');
                 tabHeading.siblings('input').val('');
             });
         },

         GetFormFieldList: function() {
             this.config.url = this.config.baseURL + "GetCategoryFormAttributes";
             this.config.data = JSON2.stringify({ categoryID: 0, aspxCommonObj: aspxCommonObj() });
             this.config.ajaxCallMode = 3;
             this.ajaxCall(this.config);
         },

         GetValidationTypeClasses: function(attValType, isUnique, isRequired) {
             var returnClass = '';
             if (isRequired == true) {
                 returnClass = "required";
             }
             return returnClass;
         },

         GetValidationTypeErrorMessage: function(attValType) {
             var retString = '';
             switch (attValType) {
                 case 1: //AlphabetsOnly
                     retString = 'Alphabets Only';
                     break;
                 case 2: //AlphaNumeric
                     retString = 'AlphaNumeric';
                     break;
                 case 3: //DecimalNumber
                     retString = 'Decimal Number';
                     break;
                 case 4: //Email
                     retString = 'Email Address';
                     break;
                 case 5: //IntegerNumber
                     retString = 'Integer Number';
                     break;
                 case 6: //Price
                     retString = 'Price';
                     break;
                 case 7: //WebURL
                     retString = 'Web URL';
                     break;
             }
             return retString;
         },

         CreateValidation: function(id, attType, attValType, isUnique, isRequired) {
             var retString = '';
             var validationClass = '';

             switch (attValType) {
                 case 1: //AlphabetsOnly
                     validationClass += 'verifyAlphabetsOnly" ';
                     break;
                 case 2: //AlphaNumeric
                     validationClass += 'verifyAlphaNumeric" ';
                     break;
                 case 3: //DecimalNumber
                     validationClass += 'verifyDecimal" ';
                     break;
                 case 4: //Email
                     validationClass += 'verifyEmail';
                     break;
                 case 5: //IntegerNumber
                     validationClass += 'verifyInteger';
                     break;
                 case 6: //Price
                     validationClass += 'verifyPrice';
                     break;
                 case 7: // URL
                     validationClass += 'verifyUrl';
                     break;
             }
             retString = validationClass;
             return retString;
         },

         CheckUniqueness: function(catName) {
             // Validate name

             var CatId = $("#CagetoryMgt_categoryID").val();
             var errors = '';
             catName = $.trim(catName);
             UserDashBoardCategoryMgmt.IsUnique(catName, CatId);
             var isUniqe = UserDashBoardCategoryMgmt.variables.isUnique;
             if (!catName) {
                 errors += 'Please enter Category Name';
                 $('.cssClassRight').hide();
                 $('.cssClassError').show();
                 $('.cssClassError').prevAll("input:first").addClass("error");
                 $('.cssClassError').html('Please enter unique category name.<br/>');
             }         //check uniqueness          
             else if (!isUniqe) {
                 errors += 'Please enter unique category name! "' + catName.trim() + '" already exists.<br/>';
                 $('.cssClassRight').hide();
                 $('.cssClassError').show();
                 $('.cssClassError').html('Please enter unique category name! "' + catName.trim() + '" already exists.<br/>');
                 $(".cssClassError").parent('div').addClass("diverror");
                 $('.cssClassError').prevAll("input:first").addClass("error");
             }

             if (errors) {
                 //  csscody.alert('<h2>Information Alert</h2><p>' + errors + '</p>');
                 return false;
             }
             else {
                 $('.cssClassRight').show();
                 $('.cssClassError').html('');
                 $('.cssClassError').hide();
                 $('.cssClassError').prevAll("input:first").removeClass("error");
                 return true;
             }
         },

         IsUnique: function(catName, CatId) {
             var aspxCommonInfo = aspxCommonObj();
             aspxCommonInfo.UserName = null;
             this.variables.isUnique = false;
             this.config.url = this.config.baseURL + "CheckUniqueCategoryName";
             this.config.data = JSON2.stringify({ catName: catName, catId: CatId, aspxCommonObj: aspxCommonInfo });
             this.config.ajaxCallMode = 4;
             this.ajaxCall(this.config);
             return UserDashBoardCategoryMgmt.variables.isUnique;
         },
         //var hdnCatNameTxtBox="";
         createRow: function(attID, attName, attType, attTypeValue, attDefVal, attLen, attValType, isEditor, isUnique, isRequired, attToolTip) {
             var retString = '';
             var attNameNoSpace = "_" + attName.replace(new RegExp(" ", "g"), '-');
             attNameNoSpace = '';
             retString += '<tr><td class="cssClassTableLeftCol"><label class="cssClassLabel">' + attName + ': </label></td>';
             switch (attType) {
             case 1:
//TextField
                 if (attID == 1) { //Name of Category  

                     //hdnCatNameTxtBox = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                     this.variables.hdnCatNameTxtBox = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                     // alert( $("#hdnCatNameTxtBox").val());
                     retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem cssClassCategoryName' + UserDashBoardCategoryMgmt.CreateValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '" onblur="UserDashBoardCategoryMgmt.CheckUniqueness(this.value)"/>'
                     retString += '<span class="cssClassRight"><img class="cssClassSuccessImg" height="13" width="18" alt="Right" src="' + aspxTemplateFolderPath + '/images/right.jpg"></span><b class="cssClassError">Ops! found something error, must be unique with no spaces</b>';
                     retString += '<span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 } else {
                     retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + ' "/>'
                     retString += '<span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 }
                 break;
             case 2:
//TextArea                    
                 var editorDiv = '';
                 if (isEditor) {
                     htmlEditorIDs[htmlEditorIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + "_editor";
                     editorDiv = '<div id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_editor"></div>';
                 }
                 retString += '<td><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><textarea id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" ' + ((isEditor == true) ? ' style="display: none !important;" ' : '') + ' rows="' + attLen + '"  class="cssClassTextArea dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" title="' + attToolTip + '">' + attDefVal + '</textarea>' + editorDiv + '<span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 
                 
                 break;
             case 3:
//Date
                 if (attID == 19 || attID == 20) {
                     switch (attID) {
                     case 19:
                         DatePickerIDs[DatePickerIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                         retString += '<td class="cssClassBigBox"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text"  class="sfInputbox dynFormItem activefrom' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /field --></p></div></td>';
                         from = "#" + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                         break;
                     case 20:
                         DatePickerIDs[DatePickerIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                         retString += '<td class="cssClassBigBox"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text"  class="sfInputbox dynFormItem activeto' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /field --></p></div></td>';
                         to = "#" + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                         break;
                     }
                     break;
                 } else {

                     DatePickerIDs[DatePickerIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                     retString += '<td class="cssClassBigBox"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text"  class="sfInputbox dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /field --></p></div></td>';
                     break;
                 }
             case 4:
//Boolean 
                 if (attID == 16 || attID == 17 || attID == 18) {
                     if (attDefVal == 1) {
                         retString += '<td class="cssClassBigBox"><div class="cssClassCheckBox"><div class="field ' + (isRequired == true ? "required" : "") + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" value="1" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="cssClassForService cssClassCheckBox dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '" checked="checked"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                     } else {
                         retString += '<td class="cssClassBigBox"><div class="cssClassCheckBox"><div class="field ' + (isRequired == true ? "required" : "") + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" value="1" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="cssClassForService cssClassCheckBox dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '" /><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                     }
                 } else {
                     if (attDefVal == 1) {
                         retString += '<td class="cssClassBigBox"><div class="cssClassCheckBox"><div class="field ' + (isRequired == true ? "required" : "") + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" value="1" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="cssClassCheckBox dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '" checked="checked"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                     } else {
                         retString += '<td class="cssClassBigBox"><div class="cssClassCheckBox"><div class="field ' + (isRequired == true ? "required" : "") + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" value="1" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="cssClassCheckBox dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                     }
                 }
                 break;
             case 5:
//MultipleSelect
                 retString += '<td><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '"  title="' + attToolTip + '" size="' + attLen + '" multiple class="cssClassMultiSelect dynFormItem" >';
                 if (attTypeValue.length > 0) {
                     for (var i = 0; i < attTypeValue.length; i++) {
                         var val = attTypeValue[i];
                         //var vals = attTypeValue[i].split(':');
                         retString += '<option value="' + val.value + '">' + val.text + '</option>';
                     }
                 }
                 retString += '</select><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 break;
             case 6:
//DropDown
                 if (attID == 36) {
                     retString += '<td><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '"  title="' + attToolTip + '" class="sfListmenu dynFormItem cssClassIsService">';
                 } else {
                     retString += '<td><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '"  title="' + attToolTip + '" class="sfListmenu dynFormItem" >';
                 }
                 var arr = new Array();
                 for (var i = 0; i < attTypeValue.length; i++) {
                     var val = attTypeValue[i];
                     retString += '<option value="' + val.value + '">' + val.text + '</option>';
                 }
                 retString += '</select><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 break;
             case 7:
//Price
                 retString += '<td class="cssClassBigBox"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 break;
             case 8:
//File                  
                 FileUploaderIDs[FileUploaderIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace;
                 retString += '<td><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><div class="' + attDefVal + '" name="Upload/temp" lang="' + attLen + '"><input type="hidden" id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_hidden" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_hidden" value="" class="cssClassBrowse dynFormItem"/>';
                 retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="file" class="cssClassBrowse dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID, attType, attValType, isUnique, isRequired) + '" title="' + attToolTip + '" />';
                     //retString += '<span id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_span" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="file" class="cssClassBrowse">Browse</span>';
                 retString += '<div class="progress' + attID + ' ui-helper-clearfix"><div class="progressBar" id="progressBar' + attID + '"></div><div class="percentage"></div></div>';
                 retString += '<span class="response"></span></div><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 break;
             case 9:
//Radio
                 if (attDefVal) {
                     retString += '<td><div class="cssClassRadioBtn"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" checked value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="radio"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + (attDefVal.toString().length > 0 ? attDefVal.toString() : "") + '"  title="' + attToolTip + '"/><label>' + attName + '</label><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                 } else {
                     retString += '<td><div class="cssClassRadioBtn"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="radio"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + (attDefVal.toString().length > 0 ? attDefVal.toString() : "") + '"  title="' + attToolTip + '"/><label>' + attName + '</label><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                 }
                 break;
             case 10:
//RadioButtonList
                 retString += '<td><div class="cssClassRadioBtn"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '">'
                 for (var i = 0; i < attTypeValue.length; i++) {
                     var option = attTypeValue[i];
                     if (i == 0) {
                         retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_' + i + '" value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="radio"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + option.value + '" checked /><label>' + option.text + '</label>';
                     } else {
                         if (option.isDefault) {
                             retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_' + i + '" value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="radio"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + option.value + '" checked /><label>' + option.text + '</label>';
                         } else {
                             retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_' + i + '" value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="radio"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + option.value + '" /><label>' + option.text + '</label>';
                         }
                     }
                 }
                 retString += '<span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                 break;
             case 11:
//CheckBox
                 retString += '<td><div class="cssClassRadioBtn"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + attID + '"  /><label>' + attName + '</label><span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                 break;
             case 12:
//CheckBoxList
                 retString += '<td><div class="cssClassRadioBtn"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '">'
                 for (var i = 0; i < attTypeValue.length; i++) {
                     var option = attTypeValue[i];
                     if (option.isDefault) {
                         retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_' + i + '" value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + option.value + '" checked /><label>' + option.text + '</label>';
                     } else {
                         retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '_' + i + '" value="' + attID + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + attNameNoSpace, attType, attValType, isUnique, isRequired) + '" value="' + option.value + '" /><label>' + option.text + '</label>';
                     }
                 }
                 retString += '<span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></div></td>';
                 break;
             case 13:
//Password
                 retString += '<td class="cssClassBigBox"><div class="field ' + UserDashBoardCategoryMgmt.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + attNameNoSpace + '" type="text" maxlength="' + attLen + '"  class="text dynFormItem ' + UserDashBoardCategoryMgmt.CreateValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + ' Password" value="' + attDefVal + '" title="*"/>'
                 retString += '<span class="iferror">' + UserDashBoardCategoryMgmt.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                 break;
             default:
                 break;
             }
             retString += '</tr>';
             return retString;
         },

         EnableFormValidation: function(frmID) {
             mustCheck = true;
             $("#" + frmID + " ." + classprefix + "Cancel").click(function(event) {
                 mustCheck = false;
             });
             var fe = $("#" + frmID + " input");
             for (var j = 0; j < fe.length; j++) {
                 if ((fe[j]).title.indexOf("**") == 0) {
                     if ((fe[j]).value == "" || (fe[j]).value == titleHint) {
                         var titleHint = (fe[j]).title.substring(2);
                         (fe[j]).value = titleHint;
                     }
                 } else if (((fe[j]).type == "text" || (fe[j]).type == "password" || (fe[j]).type == "textarea") && (fe[j]).title.indexOf("*") == 0) {
                     addHint((fe[j]));
                     $(fe[j]).blur(function(event) { addHint(this); });
                     $(fe[j]).focus(function(event) { removeHint(this); });
                 }
             }
         },

         EnableDatePickers: function() {
             for (var i = 0; i < DatePickerIDs.length; i++) {
                 $("#" + DatePickerIDs[i]).datepicker({ dateFormat: 'yy/mm/dd' });
             }
         },
         dummyProgress:function(progressBar,percentage) {       						
			if (percentageInterval[pcount]) {
				progress = percentageInterval[pcount] + Math.floor( Math.random() *2+1 );
				percentage.text(progress.toString() + '%');
				progressBar.progressbar({
					value: progress
				});
				var percent=percentage.text();
				percent=percent.replace('%','');
				if(percent==100 ||percent>100)
				{	
				 	percentage.text('100%');				
                 			progressBar.hide(1000); 
                 			percentage.html(''); 		
				}				
			}
			
			if (timeInterval[pcount]) {
				progressTime = setTimeout(function(){
				 UserDashBoardCategoryMgmt.dummyProgress(progressBar, percentage)
				}, timeInterval[pcount] * 100);
            	}		
                	pcount++;	                    
         },
         CropImage:function() {
             var getCropedPos = function() {
                 return coOrdinates;
             };
             var uploaderId;
             var api;
             var coOrdinates={};
             var boundx, boundy, $pcnt = $('#dvCropPreview .preview-container');
             var path;
             var enable = function(file,filepath) {
                 path = filepath;
                 uploaderId = file;
                 
                 $("#dvCropImage").hide().html("<img style=\"display:none;\" id=\"imgCatBanner\" src=\"" + aspxRootPath + filepath + "\" title=\"CategoryBanner\" alt=\"CategoryBanner\" />");
                 $("#dvCropPreview .preview-container").html("<img id=\"imgCatBannerPrev\" src=\"" + aspxRootPath + filepath + "\" title=\"CategoryBanner\" alt=\"CategoryBanner\" />");
                 var width = 800;
                 var height = 250;
                 //chcking for base image attribute id
                 //alert(uploaderId+"::"+ uploaderId.startsWith('12'));
                 if(uploaderId.startsWith('12')) {
                   width=  banerWidth;
                     height = bannerHeight;
                       $pcnt.css('width', width).css('height', height);
                 }else {
                     
                     width = categoryMediumThumbImageSetting;
                     height = categoryMediumThumbImageSetting;
                       $pcnt.css('width', width).css('height', height);
                 }

               
                 ShowPopupControl('popuprel1');
                 $("#imgCatBanner").Jcrop({
                     // start off with jcrop-light class
                         bgOpacity: 0.5,
                         bgColor: 'white',
                         addClass: 'jcrop-light',
                         minSize: [width, height],//from setting 
                         maxSize: [width, height],
                         boxWidth: 400,
                         boxHeight: 400,
                         onSelect: showPreview,
                         onChange: showCoords
                     }, function() {
                         api = this;
                         var bounds = this.getBounds();
                         boundx = bounds[0];
                         boundy = bounds[1];
                         api.setSelect([0, 0, width, height]);
                         api.setOptions({ bgFade: true });
                         api.ui.selection.addClass('jcrop-selection');
                       //  $(".jcrop-dragbar").removeClass('jcrop-dragbar');
                       //  $(".jcrop-handle").removeClass('jcrop-handle');
                     });
                 $("#dvCropImage").fadeIn();
                 $("#fade,.cssClassClose").die().click(function() {
                     $('#fade, .popupbox').fadeOut();
                     destroy();
                 });                 //to disable change scale
             
                 
             };
             $(".cropImg").live("click", function() {
                 var uploader = $(this).attr('title');
                 var pathfile = $(this).parent('div:eq(0)').prev('div:eq(0)').find('img[class=uploadImage]').attr('src');
                 pathfile = pathfile.replace(aspxRootPath, "");
                 enable(uploader, pathfile);
             });
             $("#btnCropForBanner").die().bind("click", function() {

                 $.post(aspxUserCatModulePath + "FileUploader.aspx", { IsCropping: true, filePath: path, coOrdinates: coOrdinates, StoreID: storeId, PortalID: portalId, CultureName: cultureName }, function(ajaxFileResponse) {

                     var d = $('#' + uploaderId).parent();
                     var x = ajaxFileResponse;
                     var Response = x.substring(x.indexOf('{'), x.indexOf('}') + 1);
                     var pattern = "'", re = new RegExp(pattern, "g");
                     var y = Response.replace(re, '"');

                     var res = $.parseJSON(y);
                     if (res.Message != null && res.Status > 0) {
                         //<a href="javascript:;" title='+uploaderId+' class="cropImg" >crop image </a>
                         //  $(d).parent('div').find('span.response').html('<div class="cssClassLeft"><img src="' + aspxRootPath + res.UploadedPath + '" class="uploadImage" height="90px" width="100px" /></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardCategoryMgmt.ClickToDeleteImage(this)" alt="Delete" title="Delete"/><a href="javascript:;" title=' + uploaderID + ' class="cropImg" >crop image </a> </div>');
                         $(d).parent('div').find('span.response').find('img[class=uploadImage]').attr('src', aspxRootPath + res.UploadedPath).end().find(".cropImg").remove();

                     } else {
                         $(d).parent('div').find('span.response').html('');
                         csscody.error('<h2>Error Message</h2><p>' + res.Message + '</p>');
                     }
                     destroy();
                     $('#fade, #popuprel1').fadeOut();

                 }, function() {
                     csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Sorry! Failed to crop the image.")+'</p>');

                 });


             });
             var destroy = function() {
                 $("#dvCropImage,#dvCropPreview .preview-container").html('');
             };


             var showPreview = function(c) {
                 coOrdinates = c;
                 var xsize = $pcnt.width(),
                     ysize = $pcnt.height();
                 if (parseInt(c.w) > 0) {
                     var rx = xsize / c.w;
                     var ry = ysize / c.h;

                    $('#dvCropPreview .preview-container img').css({
                         width: Math.round(rx * boundx) + 'px',
                         height: Math.round(ry * boundy) + 'px',
                         marginLeft: '-' + Math.round(rx * c.x) + 'px',
                         marginTop: '-' + Math.round(ry * c.y) + 'px'
                     });
                 }

             };
              var showCoords = function(c) {
                 $('#X1').val(c.x);
                 $('#Y1').val(c.y);
                 $('#X2').val(c.x2);
                 $('#Y2').val(c.y2);
                 $('#W').val(c.w);
                 $('#H').val(c.h);
             };
             return { Enable: enable,GetCropPos:getCropedPos,Destroy:destroy };     
         }(),
         CreateFileUploader: function(uploaderID) {
             d = $('#' + uploaderID).parent();
             baseLocation = "Upload/temp";
             validExt = d.attr("class");
             maxFileSize = d.attr("lang");
             //alert(d.html());
             new AjaxUpload(String(uploaderID), {
                 action: aspxUserCatModulePath + "FileUploader.aspx",
                 name: 'myfile',
                 onSubmit: function(file, ext) {
                     //progress bar call start
                     pcount=0;                         
                     var percentage = $(this._button).next('div').find('.percentage');                 		
		             var progressBar = $( this._button).next('div').find('.progressBar');
		             progressBar.show();
		             UserDashBoardCategoryMgmt.dummyProgress(progressBar, percentage);		               
                     //progress bar call end  
                     var regExp = /\s+/g;
                     myregexp = new RegExp("(" + validExt.replace(regExp, "|") + ")", "i");
                     if (ext != "exe") {
                         if (ext && myregexp.test(ext)) {
                             this.setData({
                                 'BaseLocation': 'Upload/temp',
                                 'ValidExtension': validExt,
                                 'MaxFileSize': maxFileSize
                             });
                         } else {
                             csscody.alert('<h2>'+getLocale(AspxUserDashBoard, "Information Alert")+'</h2><p>'+getLocale(AspxUserDashBoard, "You are trying to upload invalid File!")+'</p>');
                             return false;
                         }
                     }
                     else {
                         csscody.alert('<h2>'+getLocale(AspxUserDashBoard, "Information Alert")+'</h2><p>'+getLocale(AspxUserDashBoard, "You are trying to upload invalid File!")+'</p>');
                         return false;
                     }
                 },
                 onComplete: function(file, ajaxFileResponse) {
                     d = $('#' + uploaderID).parent();
                     var res = eval(ajaxFileResponse);
                     if (res.Message != null && res.Status > 0) {
                         baseLocation = d.attr("name");
                         //  validExt = d.attr("class");
                         var fileExt = (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
                         myregexp = new RegExp("(jpg|jpeg|jpe|gif|bmp|png|ico)", "i");
                             if (myregexp.test(fileExt)) {
                             //$(d).parent('div').find('span.response').html('<div class="cssClassLeft"><img src="' + aspxRootPath + res.UploadedPath + '" class="uploadImage" height="90px" width="100px" /></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardCategoryMgmt.ClickToDeleteImage(this)" alt="Delete" title="Delete"/></div>');
                             $(d).parent('div').find('span.response').html('<div class="cssClassLeft"><img src="' + aspxRootPath + res.UploadedPath + '" class="uploadImage" height="90px" width="100px" /></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardCategoryMgmt.ClickToDeleteImage(this)" alt="Delete" title="Delete"/><a href="javascript:;" title=' + uploaderID + ' class="cropImg" >crop image </a> </div>');
                             UserDashBoardCategoryMgmt.CropImage.Enable(uploaderID, res.UploadedPath);
                         } else {                        
                             $(d).parent('div').find('span.response').html('<div class="cssClassLeft"><a href="' + aspxRootPath + res.UploadedPath + '" class="uploadFile" target="_blank">' + file + '</a></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardCategoryMgmt.ClickToDeleteImage(this)" alt="Delete" title="Delete"/></div>');
                         }
                     }
                     else {
                         csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>' + res.Message + '</p>');
                     }
                 }
             });
         },

         EnableFileUploaders: function() {
             for (var i = 0; i < FileUploaderIDs.length; i++) {
                 UserDashBoardCategoryMgmt.CreateFileUploader(String(FileUploaderIDs[i]));
             }
         },

         HTMLEditor: function(editorID, editorObject) {
             this.ID = editorID;
             this.Editor = editorObject;
         },
         // var editorList = new Array();
         EnableHTMLEditors: function() {
             for (var i = 0; i < htmlEditorIDs.length; i++) {
                 config = { skin: "v2" };
                 var html = "Initially Text if necessary";
                 var editor = CKEDITOR.replace(htmlEditorIDs[i], config, html);
                 var obj = new UserDashBoardCategoryMgmt.HTMLEditor(htmlEditorIDs[i], editor);
                 editorList[editorList.length] = obj;
             }
         },

         ResetHTMLEditors: function() {
             for (var i = 0; i < htmlEditorIDs.length; i++) {
                 editorList[i].Editor.setData('');
             }
         },

         SerializeForm: function(formID, remove) {
             jsonStr = '';
             var frmValues = new Array();
             radioGroups = new Array();
             checkboxGroups = new Array();
             selectGroups = new Array();
             inputs = $(formID).find('INPUT, SELECT, TEXTAREA');
             $.each(inputs, function(i, item) {
                 input = $(item);
                 if (input.hasClass("dynFormItem")) {
                     var found = false;
                     switch (input.attr('type')) {
                         case 'select-multiple':
                             for (var i = 0; i < selectGroups.length; i++) {
                                 if (selectGroups[i] == input.attr('name')) {
                                     found = true;
                                     break;
                                 }
                             }
                             if (!found) {
                                 selectGroups[selectGroups.length] = input.attr('name');
                             }
                             break;
                         case 'select-one':
                             jsonStr += '{"name":"' + input.attr('name') + '","value":"' + input.get(0)[input.attr('selectedIndex')].value + '"},';
                             break;

                         case 'checkbox':
                             var ids = String(input.attr('name')).split("_");
                             if (ids[1] == 4) {
                                 jsonStr += '{"name":"' + input.attr('name') + '","value":"' + input.is(':checked') + '"},';
                             }
                             else {
                                 for (var i = 0; i <= checkboxGroups.length; i++) {
                                     if (checkboxGroups[i] == input.attr('name')) {
                                         found = true;
                                         break;
                                     }
                                 }
                                 if (!found) {
                                     checkboxGroups[checkboxGroups.length] = input.attr('name');
                                 }
                             }
                             break;

                         case 'radio':
                             for (var i = 0; i <= radioGroups.length; i++) {
                                 if (radioGroups[i] == input.attr('name')) {
                                     found = true;
                                     break;
                                 }
                             }
                             if (!found) {
                                 radioGroups[radioGroups.length] = input.attr('name');
                             }
                             break;
                         case 'file':
                             var d = input.parent().parent();
                             var img = $(d).find('span.response img.uploadImage');
                             var imgToUpload = "";
                             if (img.attr("src") != undefined) {
                                 imgToUpload = img.attr("src");
                             }
                             if (img) {
                                 jsonStr += '{"name":"' + input.attr('name') + '","value":"' + imgToUpload.replace(aspxRootPath, "") + '"},';
                             }
                             else {
                                 var a = $(d).find('span.response a');
                                 var fileToUpload = "";
                                 if (a.attr("href") != undefined) {
                                     fileToUpload = a.attr("href");
                                 }
                                 if (a) {
                                     jsonStr += '{"name":"' + input.attr('name') + '","value":"' + fileToUpload.replace(aspxRootPath, "") + '"},';
                                 }
                             }
                             var hdn = $(d).find('input[type="hidden"]');
                             if (hdn) {
                                 jsonStr += '{"name":"' + hdn.attr('name') + '","value":"' + hdn.val() + '"},';
                             }
                             break;
                         case 'password':
                             jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val()) + '"},';
                             break;
                         case 'textarea':
                             jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val()) + '"},';
                             break;
                         case 'text':
                             jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val()) + '"},';
                             break;
                         default:
                             break;
                     }
                 }
             });
             for (var i = 0; i < selectGroups.length; i++) {
                 var selIDs = '';
                 $('#' + selectGroups[i] + ' :selected').each(function(i, selected) {
                     selIDs += $(selected).val() + ",";
                 });
                 selIDs = selIDs.substr(0, selIDs.length - 1);
                 jsonStr += '{"name":"' + selectGroups[i] + '","value":"' + selIDs + '"},';
             }
             for (var i = 0; i < checkboxGroups.length; i++) {
                 var chkValues = '';
                 $('input[name=' + checkboxGroups[i] + ']').each(function(i, item) {
                     if ($(this).is(':checked')) {
                         chkValues += chkValues + $(this).val() + ",";
                     }
                 });
                 chkValues = chkValues.substr(0, chkValues.length - 1);
                 jsonStr += '{"name":"' + checkboxGroups[i] + '","value":"' + chkValues + '"},';
             }
             for (var i = 0; i < radioGroups.length; i++) {
                 var radValues = '';
                 radValues = $('input[name=' + radioGroups[i] + ']:radio').val();
                 radValues = radValues.substr(0, radValues.length - 1);
                 jsonStr += '{"name":"' + radioGroups[i] + '","value":"' + radValues + '"},';
             }
             jsonStr = jsonStr.substr(0, jsonStr.length - 1);
             return '[' + jsonStr + ']';
         },   
        
         AddCategory: function() {
             $("#lblCategoryID").html(0);
             $("#" + categoryTitleLabel).html("Category (ID:");
             $("#CagetoryMgt_categoryID").val(0);
             $("#CagetoryMgt_parentCagetoryID").val(0);
             $("#CategorManagement_TabContainer").find("input[type=reset]").click();
             $('.serviceId').val(0);
             $('.serviceDateId').val(0);
             $('.serviceTimeId').val(0);
             $('.serviceEmployeeId').val(0);
             UserDashBoardCategoryMgmt.ResetHTMLEditors();
             UserDashBoardCategoryMgmt.ResetImageTab();
             UserDashBoardCategoryMgmt.SelectFirstTab();
             UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);
             $('#categoryReset').show();

             $('#CategorManagement_TabContainer').tabs('disable', 5);
             $("#divServiceInfo").find('table>tbody>tr:first').find('.cssClassProviderParentDiv').not(':first').remove();
             $("#divServiceInfo").find('table>tbody>tr:first').find('.cssBranchError').html('');
             $("#divServiceInfo").find('table>tbody>tr:first').find('.cssProviderError').html('');
         },

         AddSubCategory: function() {
             $("#lblCategoryID").html(0);
             if ($("#CagetoryMgt_categoryID").val() == 0) {
                 csscody.alert("<h2>"+getLocale(AspxUserDashBoard, 'Information Alert')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Please first select the category.')+"</p>");
             }
             if (!isAlreadyClickAddSubCategory) {
                 isAlreadyClickAddSubCategory = true;
                 var ParentID = $("#CagetoryMgt_parentCagetoryID").val();
                 var CategoryID = $("#CagetoryMgt_categoryID").val();
                 $("#CategorManagement_TabContainer").find("input[type=reset]").click();
                 UserDashBoardCategoryMgmt.ResetHTMLEditors();
                 UserDashBoardCategoryMgmt.ResetImageTab();
                 $("#CagetoryMgt_categoryID").val(0);
                 $("#CagetoryMgt_parentCagetoryID").val(CategoryID);
             }
             if (UserDashBoardCategoryMgmt.variables.isServiceType == true) {
                 $('#CategorManagement_TabContainer').tabs('enable', 5);
                 $('.cssClassIsService').val(10);
                 EnableServiceFunction();
                 EnableStoreDropdownChange();
                 $("#divServiceInfo").find('table>tbody>tr:first').find('.cssClassProviderParentDiv').not(':first').remove();
                 $("#divServiceInfo").find('table>tbody>tr:first').find('.cssBranchError').html('');
             } else {
                 $('#CategorManagement_TabContainer').tabs('disable', 5);
             }
             $('.serviceId').val(0);
             $('.serviceDateId').val(0);
             $('.serviceTimeId').val(0);
             $('.serviceEmployeeId').val(0);
             $("#" + categoryTitleLabel).html("Sub Category (ID:");
             UserDashBoardCategoryMgmt.SelectFirstTab();
             UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);
             $('#categoryReset').show();
             EnableServiceFunction();
             EnableEmployeePopUp();
         },
         GetAllCategoryItems: function(catID) {
             var categoryItemsInfo = {
                 CategoryID: catID,
                 SKU: null,
                 Name: null,
                 PriceFrom: null,
                 PriceTo: null
             }; 
             this.config.url = this.config.baseURL + "GetCategoryItems";
             this.config.data = JSON2.stringify({ offset: 1, limit: null, categoryItemsInfo: categoryItemsInfo, aspxCommonObj: aspxCommonObj(), serviceBit: serviceBit });
             this.config.ajaxCallMode = 7;
             this.ajaxCall(this.config);                     
	         return itemIdsList;
        },

        SaveCategory: function(formID) {
            var catID = $("#CagetoryMgt_categoryID").val();
            var parID = $("#CagetoryMgt_parentCagetoryID").val();
            var item_ids = UserDashBoardCategoryMgmt.GetAllCategoryItems(catID);

            var catInfo = {
                CategoryId: catID,
                ParentId: parID,
                FormVars: UserDashBoardCategoryMgmt.SerializeForm(formID),
                SelectedItems: item_ids,
                LargeThumbNailImageSize: categoryLargeThumbImageSetting,
                MediumImageSize: categoryMediumThumbImageSetting,
                SmallImageSize: categorySmallThumbImageSetting
            };
//            var catCommonInfo = {
//                StoreId: storeId,
//                PortalId: portalId,
//                UserName: userName,
//                CultureName: cultureName
//            };

            this.config.url = this.config.baseURL + "SaveCategory";
            this.config.data = JSON2.stringify({ categoryObj: catInfo, aspxCommonObj: aspxCommonObj() });
            // this.config.data = '{"storeID":"' + storeId + '", "portalID":"' + portalId + '", "categoryID":"' + catID + '","parentID":"' + parID + '","formVars":' + UserDashBoardCategoryMgmt.SerializeForm(formID) + ',"selectedItems" : "' + item_ids + '" , "userName" : "' + userName + '", "culture": "' + cultureName + '","categoryLargeThumbImage":"' + categoryLargeThumbImageSetting + '","categoryMediumThumbImage":"' + categoryMediumThumbImageSetting + '","categorySmallThumbImage":"' + categorySmallThumbImageSetting + '"}';
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
        },

         saveCategorySuccess: function(result) {
             var res = eval(result.d);
             if (res.returnStatus > 0) {
                 $("#lblCategoryID").html(0);
                 $("#CagetoryMgt_categoryID").val(0);
                 $("#CagetoryMgt_parentCagetoryID").val(0);
                 $("#CategoryTree_Container").html('');
                 UserDashBoardCategoryMgmt.GetCategoryAll();
                 $("#CategorManagement_TabContainer").find("input[type=reset]").click();
                 UserDashBoardCategoryMgmt.ResetHTMLEditors();
                 UserDashBoardCategoryMgmt.ResetImageTab();
                 UserDashBoardCategoryMgmt.SelectFirstTab();
                 csscody.info('<h2>'+getLocale(AspxUserDashBoard, "Successful Message")+'</h2><p>' + res.Message + '</p>');
             }
             else {
                 csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>' + res.ErrorMessage + '</p>');
             }
         },

         parseTree: function(ul) {
             var strChild = "";
             var saveString = "";
             ul.children("li").each(function() {
                 if ($(this).parents("li").length > 0) {
                     var strChild = $(this).attr("id").replace(/[^0-9]/gi, '');

                     var strcc = "";
                     $(this).parents("li").each(function() {
                         if (strcc == "") {
                             strcc = $(this).attr("id").replace(/[^0-9]/gi, '') + '/' + strcc + '/';
                         }
                         else {
                             strcc = $(this).attr("id").replace(/[^0-9]/gi, '') + '/' + strcc;
                         }
                     });
                     strcc = strcc.substr(0, strcc.length - 1);
                     strChild = '/' + strcc + strChild;
                 }
                 else {
                     strChild = '/' + $(this).attr("id").replace(/[^0-9]/gi, '');
                 }
                 arrTree.push(strChild);

                 var subtree = $(this).children("ul");
                 if (subtree.size() > 0)
                     UserDashBoardCategoryMgmt.parseTree(subtree);
             });
             return arrTree.join('#');
         },

         submitForm: function(frmID) {
             AspxCommerce.CheckSessionActive(aspxCommonObj());
             if (AspxCommerce.vars.IsAlive) {
                 var frm = $("#" + frmID);
                   $('.cssClassTextArea').each(function() {
                $(this).val(Encoder.htmlEncode($(this).val()));
            });
                 for (var i = 0; i < editorList.length; i++) {
                     var id = String(editorList[i].ID);
                     var textArea = $("#" + id.replace("_editor", ""));
                     textArea.val(Encoder.htmlEncode(editorList[i].Editor.getData()));
                 }
                 // Prevent submit if validation fails
                 var catNameTxtBoxID = UserDashBoardCategoryMgmt.variables.hdnCatNameTxtBox; //hdnCatNameTxtBox; //$("input["hidden"]#hdnCatNameTxtBox").val();
                 var CatName = $("#" + catNameTxtBoxID).val();
                 //alert(checkForm(frm) && CheckUniqueness($("#"+catNameTxtBoxID+"").val()));           
                 if (VerifyAvailabilityForm()) {
                     if (checkForm(frm) && UserDashBoardCategoryMgmt.CheckUniqueness(CatName)) { //$(".cssClassError").html().length == 0                              
                         UserDashBoardCategoryMgmt.SaveCategory("#" + frmID);
                     } else {
                         var errorTabName = $("#CategorManagement_TabContainer").find('.diverror:first').parents('div').attr("id");
                         var $tabs = $('#CategorManagement_TabContainer').tabs();
                         $tabs.tabs('select', errorTabName);
                         return false;
                     }
                 } else {
                     var $tabs = $('#CategorManagement_TabContainer').tabs();
                     if (branchError == true) {
                         $tabs.tabs('select', 5);
                         return false;
                     }
                     if (dateError == true) {
                         $tabs.tabs('select', 5);
                         return false;
                     }
                     if (timeError == true) {
                         $tabs.tabs('select', 5);
                         return false;
                     }
//                     var $tabs = $('#CategorManagement_TabContainer').tabs();
//                     $tabs.tabs('select', 5);
                     // return false;
                 }
             } else {
                 window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
             }
         },

         errorFn: function(xhr, status) {
             var err = null;
             if (xhr.readyState == 4) {
                 var res = xhr.responseText;
                 if (res && res.charAt(0) == '{' && status != "parsererror")
                     var err = JSON.parse(res);
                 if (!err) {
                     if (xhr.status && xhr.status != 200)
                         err = new CallbackException(xhr.status + " " + xhr.statusText);
                     else {
                         if (status == "parsererror")
                             status = "Unable to parse JSON response.";
                         else if (status == "timeout")
                             status = "Request timed out.";
                         else if (status == "error")
                             status = "Unknown error";
                         err = new CallbackException("Callback Error: " + status);
                     }
                     err.detail = res;
                 }
             }
             if (!err)
                 err = new CallbackException("Callback Error: " + status);
             csscody.error('<h2>Error Message</h2><p>Failed to save Category Tree!' + err + '</p>');
         },

         CreateTabPanel: function(attGroup) {
             var FormCount = new Array();
             if (FormCount) {
                 FormCount = new Array();
             }
             var FormID = "form_" + (FormCount.length * 10 + Math.floor(Math.random() * 10));
             FormCount[FormCount.length] = FormID;
             var dynHTML = '';
             var tabs = '';
             var tabBody = '';
             dynHTML += '<div class="cssClassTabPanelTable">';

             dynHTML += '<div id="CategorManagement_TabContainer" class="cssClassTabpanelContent">';
             dynHTML += '<ul>';
             for (var i = 0; i < attGroup.length; i++) {
                 tabs += '<li><a href="#CategoryTab-' + attGroup[i].key + '"><span>' + attGroup[i].value + '</span></a>';
                 tabBody += '<div id="CategoryTab-' + attGroup[i].key + '"><table width="100%" border="0" cellpadding="0" cellspacing="0">' + attGroup[i].html + '</table></div></li>';
             }
             tabs += '<li><a href="#CategoryTab-' + eval(attGroup.length + 1) + '"><span>Category Products</span></a>';

             tabBody += '<div id="CategoryTab-' + eval(attGroup.length + 1) + '">';

             tabBody += '<div class="cssClassCommonBox Curve">';
             tabBody += '<div class="sfGridwrapper"><div class="sfGridWrapperContent"><div id="ItemSearchPanel" class="cssClassSearchPanel sfFormwrapper"></div><div class="loading"><img src="' + aspxTemplateFolderPath + '/images/ajax-loader.gif" /></div><div class="log"></div>';
             tabBody += '<table id="gdvCategoryItems" cellspacing="0" cellpadding="0" border="0" width="100%"></table></div></div>';
             tabBody += '</div></div></li>';

             //For Service Type Category
             tabs += '<li class="cssClassService"><a href="#CategoryTab-' + eval(attGroup.length + 2) + '"><span>Availability</span></a>';

             tabBody += '<div id="CategoryTab-' + eval(attGroup.length + 2) + '">';

             GetStoreLocation();
             //if (attributeSetId == 3 && itemTypeId == 4) {
             tabBody += ' <div><div class="sfButtonwrapper"><button type="button" class="cssClassAddProvider" onclick="AddServiceProviderToBranch(this);">Manage Provider</button></div><div class="sfGridwrapper" id="divServiceInfo">';
             tabBody += '<table  cellspacing="0" cellpadding="0" border="0" width="100%">';
             tabBody += '<thead><tr class="cssClassHeading"><th>Pos</th><th>Branch</th><th> Service Provider Availability</th><th></th><th></th></tr></thead>';
             tabBody += '<tbody><tr class="servicerow serviceTr_1"><td><input size="3" class="serviceId" value="0" type="hidden"><input size="3" class="cssClassDisplayOrder" type="text" value="1" disabled="disabled"></td><td><select class="cssClassDdlStoreCollection"><option>--</option></select><span class="cssBranchError" style="color: red;"></span></td>';

             tabBody += '<td><div class="cssClassProviderParentDiv"><div class="cssClassServceProvider"><input size="3" class="serviceEmployeeId" value="0" type="hidden"><select class="cssClassDdlServiceProviders"><option>--</option></select><span class="cssProviderError" style="color: red;"></span>';//<button type="button" class="cssClassAddProvider" onclick="AddServiceProviderToBranch(this);">Add Provider</button>';
             tabBody += '<p class="cssServiceProvidersSpan"><span class="cssServiceData cssAssignServiceProvider"  onclick="AssignServiceEmployee(this)"> <img  src="' + aspxTemplateFolderPath + '/images/admin/btnadduser.png"/>Assign Provider</span>';
            //'<button type="button" class"cssAssignServiceProvider" onclick="AssignServiceEmployee(this)">Assign Provider</button>';
            // tabBody += '<button type="button" class="cssClassDeleteAssingProvider" onclick="DeleteAssignServiceProvider(this)">Remove Provider</button></div>';
             tabBody += '<span class="cssServiceData cssClassDeleteAssingProvider"  onclick="DeleteAssignServiceProvider(this)"> <img  src="' + aspxTemplateFolderPath + '/images/admin/commondeletebtn.png"/>Delete Provider</span></p>';
             tabBody += '<div class="cssClassDate"><ul class="cssClassUlDate"><li class="cssClassLiDate"><input size="3" class="serviceDateId" value="0" type="hidden"><label for="from">From:</label><input type="text" name="serviceAvailableDate" class="cssClassServiceAvailableDateFrom sfInputbox"/><label for="to">To:</label><input type="text"  name="cssClassServiceAvailableDateTo" class="cssClassServiceAvailableDateTo sfInputbox"/>';
             //<button type="button" class="cssClassAddDateBtn" onclick="AddServiceDate(this);"><span>Add Date</span></button><button type="button" class="cssClassDeleteServiceDate" onclick="DeleteServiceDate(this);"><span>Delete</span></button>';
             tabBody += '<span class="cssServiceProviderDate"><p class="cssServiceData cssClassAddDateBtn" onclick="AddServiceDate(this);"><img src="' + aspxTemplateFolderPath + '/images/admin/imgadd.png" />Add Date</p><p class="cssServiceData cssClassDeleteServiceDate" onclick="DeleteServiceDate(this);"><img src="' + aspxTemplateFolderPath + '/images/admin/commondeletebtn.png" />Delete Date</p></span>';
             tabBody += '<div class="cssClassTime_1"><span class="cssClassSpanTime">';
             tabBody += '<input size="3" class="serviceTimeId" value="0" type="hidden"><label for="fromTime">From:</label><input type="text" name="time" value="" class="sfInputbox timeFrom"/>';
             tabBody += '<label for="toTime">To:</label><input type="text" name="time" value="" class="sfInputbox timeTo"/>';

           //  tabBody += '<button type="button" onclick="AddServiceTime(this);">Add Time</button><button type="button" onclick="DeleteServiceTime(this);">Delete</button>';
            tabBody += '<label class="cssServiceProviderTime"><p class="cssServiceData" onclick="AddServiceTime(this);"><img src="' + aspxTemplateFolderPath + '/images/admin/imgadd.png" />Add Time</p><p class="cssServiceData" onclick="DeleteServiceTime(this);"><img src="' + aspxTemplateFolderPath + '/images/admin/commondeletebtn.png" />Delete Time</p></label>';
           
             //tabBody += '<div class="cssAtaTime"><label>At a Time:</label><input type="text" class="sfInputbox cssQuantity"/></div></span></div></li></ul></div></div>';
             tabBody += '</td>';
             tabBody += '<td><p class="cssServiceData cssClassAddStoreBtn" onclick="AddMoreBranchService(this)"><img src="' + aspxTemplateFolderPath + '/images/admin/imgadd.png"/>Add Row</p></td>';
             //<span class="cssClassAddButton sfButtonwrapper"><button type="button" class="cssClassAddStoreBtn" onclick="AddMoreBranchService(this)"><span>Add More</span></button></span></td>';
            // tabBody += '<td><span class="sfButtonwrapper"><button type="button" onclick="DeleteServiceRow(this)">Delete</button></span></td>';
             tabBody += '<td><p class="cssServiceData cssClassDeleteStoreBtn" onclick="DeleteServiceRow(this)"><img  src="' + aspxTemplateFolderPath + '/images/admin/commondeletebtn.png" />Delete Row</p></td>';
             tabBody += '</tr></tbody>';
             tabBody += '</table>';
             tabBody += '<span class="cssClassNote">Note: Later added date overlap previous same date value of same store.</span></div></div>';
             //}
             tabBody += '</div></li>';
             //END

             dynHTML += tabs;
             dynHTML += '</ul>';
             dynHTML += tabBody;
             var frmIDQuoted = "'" + FormID + "'";
             var buttons = '<div class="sfButtonwrapper"><p><button type="button" id="saveForm" onclick="UserDashBoardCategoryMgmt.submitForm(' + frmIDQuoted + ')"><span><span>Save</span></span></button> </p>';
             buttons += '<p><input id="categoryReset" type="reset" value="Reset" class="cssClassButtonSubmit" /></p><p><button type="button" id="btnDeleteCategory" onclick="UserDashBoardCategoryMgmt.DeleteCategory()" ><span><span>Delete</span></span></button></div><div class="cssClassClear"></div>';
             $("#dynForm").html('<div id="' + FormID + '">' + dynHTML + buttons + '</div>');

             $('#CategorManagement_TabContainer').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });

             //For Service             
             $('#CategorManagement_TabContainer').tabs('disable', 5);

             UserDashBoardCategoryMgmt.EnableFormValidation(FormID);
             UserDashBoardCategoryMgmt.EnableDatePickers();
             UserDashBoardCategoryMgmt.EnableFileUploaders();
             UserDashBoardCategoryMgmt.EnableHTMLEditors();
             EnableServiceFunction();
             var searchTable = '';
             searchTable += '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr>';
             searchTable += '<td><label class="cssClassLabel">SKU:</label><input type="text" id="txtCategoryItemSKU" name="txtCategoryItemSKU" class="sfTextBoxSmall"/></td>';
             searchTable += '<td><label class="cssClassLabel">Name:</label><input type="text" id="txtCategoryItemName" name="txtCategoryItemName" class="sfTextBoxSmall" /></td>';
             searchTable += '<td><label class="cssClassLabel">Price From:</label><input type="text" id="txtCategoryItemPriceFrom" name="txtCategoryItemPriceFrom" class="sfTextBoxSmall cssClassPrice" /></td>';
             searchTable += '<td><label class="cssClassLabel">Price To:</label><input type="text" id="txtCategoryItemPriceTo" name="txtCategoryItemPriceTo" class="sfTextBoxSmall cssClassPrice" /></td>';
             searchTable += '<td><div class="sfButtonwrapper cssClassPaddingNone"> <p><button type="button" onclick="UserDashBoardCategoryMgmt.SearchCategoryItems()"><span><span>Search</span></span></button></p></div></td></tr></table>';
             $("#ItemSearchPanel").html(searchTable);
             UserDashBoardCategoryMgmt.activatedatetimevalidation();
             $('.cssClassIsService').bind('change', function() {
                 $('.serviceId').val(0);
                 $('.serviceDateId').val(0);
                 $('.serviceTimeId').val(0);
                 $('.serviceEmployeeId').val(0);
                 if ($(this).val() == 9) {
                     UserDashBoardCategoryMgmt.variables.isServiceType = false;
                      serviceBit = false;
                      UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);
                     $('#CategorManagement_TabContainer').tabs('disable', 5);
                     $('.cssClassForService').closest('tr').show();
                     $('.cssClassForService').removeAttr('disabled');
                 } else if ($(this).val() == 10) {
                     $('#CategorManagement_TabContainer').tabs('enable', 5);
                     UserDashBoardCategoryMgmt.variables.isServiceType = true;
                     serviceBit = true;
                     UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);                   
                     $('.cssClassForService').closest('tr').hide();
                     $('.cssClassForService').removeAttr('checked').attr('disabled', 'disabled');
                     EnableServiceFunction();
                     EnableStoreDropdownChange();
                 }
             });
            EnableEmployeePopUp();
         },

         activatedatetimevalidation: function() {
             if (to != '') {
                 $(to).bind('change', function() {
                     if (Date.parse($(from).val()) <= Date.parse($(to).val())) {
                     }
                     else {
                         csscody.alert("<h2>"+getLocale(AspxUserDashBoard, 'Error Message')+"</h2><p>"+getLocale(AspxUserDashBoard, 'You must select active to date higher or equal to active from date!')+"</p>");
                         $(to).val('');
                         return false;
                     }
                 });
             }
         },

         CreateForm: function(CategoryFormFields) {
             var strDynRow = '';
             var attGroup = new Array();

             $.each(CategoryFormFields, function(index, item) {
                 var isGroupExist = false;
                 for (var i = 0; i < attGroup.length; i++) {
                     if (attGroup[i].key == item.GroupID) {
                         isGroupExist = true;
                         break;
                     }
                 }
                 if (!isGroupExist) {
                     attGroup.push({ key: item.GroupID, value: item.GroupName, html: '' });
                 }
             });

             $.each(CategoryFormFields, function(index, item) {
                 strDynRow = UserDashBoardCategoryMgmt.createRow(item.AttributeID, item.AttributeName, item.InputTypeID, item.InputTypeValues != "" ? eval(item.InputTypeValues) : '', item.DefaultValue, item.Length, item.ValidationTypeID, item.IsEnableEditor, item.IsUnique, item.IsRequired, item.ToolTip);
                 for (var i = 0; i < attGroup.length; i++) {
                     if (attGroup[i].key == item.GroupID) {
                         attGroup[i].html += strDynRow;
                     }
                 }
             });
             UserDashBoardCategoryMgmt.CreateTabPanel(attGroup);
//               $('.cssClassCategoryName').keyup(function() {
//                 if (this.value.match( /[^a-zA-Z0-9\-\&\_\(\)\'\ ]/g )) {
//                     this.value = this.value.replace( /[^a-zA-Z0-9\-\&\_\(\)\'\ ]/g , '');
//                     return false;
//                    // $('.charactererror').html('INvalid').css("color", "red").show().fadeOut(16000);
//                 } 
//                   else {
//                     return true;
//                 }
//               });
//               $('.cssClassCategoryName').bind('focusout',function() {
//                 if (this.value.match( /[^a-zA-Z0-9\-\&\_\(\)\'\ ]/g )) {
//                     this.value = this.value.replace( /[^a-zA-Z0-9\-\&\_\(\)\'\ ]/g , '');
//                     return false;
//                 } 
//                   else {
//                     return true;
//                 }
//               });
             $('.cssClassRight').hide();
             $('.cssClassError').hide();
             $("#categoryReset").bind('click', function() {
                 UserDashBoardCategoryMgmt.ResetImageTab();
                 $('.error').removeClass("error");
                 $('.iferror').html('');
                 $('.cssClassRight').hide();
                 $('.cssClassError').hide();
                 $("#" + categoryTitleLabel).html("Category (ID:");
                 $('.required').find('.cke_skin_v2 iframe').each(function() {
                     $(this).contents().find("body").text('');
                 });

                 var $keytr = $("#divServiceInfo").find('table>tbody>tr:first').clone();
                 $keytr.find('.cssClassLiDate').not(':first').remove();
                 $keytr.find('.cssClassSpanTime').not(':first').remove();
                 $("#divServiceInfo").find('table>tbody').html('').append($keytr);
             });
             $('.cssClassIsService').parents('tr:eq(0)').hide();
			 $('.cssClassService').hide();
         },

         DeleteCategoryItem: function(categoryID) {
             this.config.url = this.config.baseURL + "DeleteCategory";
             this.config.data = '{"storeID":' + storeId + ', "portalID" : ' + portalId + ', "categoryID":"' + categoryID + '", "userName" : "' + userName + '", "culture": "' + cultureName + '"}';
             this.config.ajaxCallMode = 6;
             this.ajaxCall(this.config);
         },

         DeleteCategory: function() {
             var categoryID = $("#CagetoryMgt_categoryID").val() * 1;
             if (categoryID > 0) {
                 var cofig = {
                     onComplete: function(e) {
                         if (e) {
                             UserDashBoardCategoryMgmt.DeleteCategoryItem(categoryID);
                         }
                     }
                 };
                 csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, 'Confirmation Message')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Are you sure you want to delete this category?')+"</p>", cofig);
             } else {
                 csscody.alert("<h2>"+getLocale(AspxUserDashBoard, 'Information Alert')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Please select category before delete.')+"</p>");
             }
         },

         deleteCategorySuccess: function(response) {
             var res = eval(response.d);
             if (res.returnStatus > 0) {
                 $("#CagetoryMgt_categoryID").val(0);
                 $("#CagetoryMgt_parentCagetoryID").val(0);
                 $("#CategoryTree_Container").html('');
                 csscody.info('<h2>Information Message</h2><p>' + res.Message + '</p>');
                 UserDashBoardCategoryMgmt.GetCategoryAll();
                 $("#CategorManagement_TabContainer input[type=reset]").click();
                 UserDashBoardCategoryMgmt.variables.isServiceType = false;
                 $('#CategorManagement_TabContainer').tabs('disable', 5);
                 $('.cssClassAddSubCategory').addClass('disabled');

                 UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);
                 UserDashBoardCategoryMgmt.ResetHTMLEditors();
                 UserDashBoardCategoryMgmt.SelectFirstTab();
             } else {
                 csscody.error('<h2>Error Message</h2><p>' + res.errorMessage + '</p>');
             }
         },

         SearchCategoryItems: function() {
             var searchCatID = $.trim($("#CagetoryMgt_categoryID").val());
             var sku = $.trim($("#txtCategoryItemSKU").val());
             var name = $.trim($("#txtCategoryItemName").val());
             var priceFrom = $.trim($("#txtCategoryItemPriceFrom").val());
             var priceTo = $.trim($("#txtCategoryItemPriceTo").val());
             //if(priceFrom.length > 0 && isNaN(priceFrom) && priceTo.length>0 && isNaN(
             if (priceFrom.length > 0) {
                 if (isNaN(priceFrom)) {
                     csscody.alert('<h2>'+getLocale(AspxUserDashBoard, "Alert Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Invalid price! Price should be number.")+'</p>');
                     return;
                 }
             }
             else {
                 priceFrom = null;
             }
             if (priceTo.length > 0) {
                 if (isNaN(priceTo)) {
                     csscody.alert('<h2>'+getLocale(AspxUserDashBoard, "Alert Message")+'</h2><p>'+getLocale(AspxUserDashBoard, 'Invalid price! Price should be number..')+"</p>");
                     return;
                 }
             }
             else {
                 priceTo = null;
             }
             if (parseInt(priceFrom, 10) > parseInt(priceTo, 10)) {
                 csscody.alert('<h2>'+getLocale(AspxUserDashBoard, "Alert Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Invalid price range! Price From should be less than Price To")+'</p>');
                 return false;
             }
             UserDashBoardCategoryMgmt.BindCategoryItemsGrid(searchCatID, sku, name, priceFrom, priceTo, serviceBit);
         },

         ajaxSuccess: function(data) {
             switch (UserDashBoardCategoryMgmt.config.ajaxCallMode) {
                 case 0:
                     break;
                 case 1:
                     UserDashBoardCategoryMgmt.BindTreeCategory(data);
                     break;
                 case 2:
                     var searchTable = '';
                     searchTable += '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr>';
                     searchTable += '<td><label class="cssClassLabel">SKU:</label><input type="text" id="txtCategoryItemSKU" name="txtCategoryItemSKU" class="sfTextBoxSmall"/></td>';
                     searchTable += '<td><label class="cssClassLabel">Name:</label><input type="text" id="txtCategoryItemName" name="txtCategoryItemName" class="sfTextBoxSmall" /></td>';
                     searchTable += '<td><label class="cssClassLabel">Price From:</label><input type="text" id="txtCategoryItemPriceFrom" name="txtCategoryItemPriceFrom" class="sfTextBoxSmall" /></td>';
                     searchTable += '<td><label class="cssClassLabel">Price To:</label><input type="text" id="txtCategoryItemPriceTo" name="txtCategoryItemPriceTo" class="sfTextBoxSmall" /></td>';
                     searchTable += '<td><div class="sfButtonwrapper cssClassPaddingNone"> <p><button type="button" onclick="UserDashBoardCategoryMgmt.SearchCategoryItems()"><span><span>Search</span></span></button></p></div></td></tr></table>';
                     $("#ItemSearchPanel").html(searchTable);
                     for (var i = 0; i < editorList.length; i++) {
                         editorList[i].Editor.setData('');
                     }
                     UserDashBoardCategoryMgmt.EditCategory(data.d);
                     $('#categoryReset').hide();
                     UserDashBoardCategoryMgmt.BindCategoryItemsGrid(UserDashBoardCategoryMgmt.variables.cateID, '', '', null, null, serviceBit);
                     $('#txtCategoryItemSKU,#txtCategoryItemName,#txtCategoryItemPriceFrom,#txtCategoryItemPriceTo').keyup(function(event) {
                         if (event.keyCode == 13) {
                             UserDashBoardCategoryMgmt.SearchCategoryItems();
                         }
                     });
                     
                     
                     
                     break;
                 case 3:
                     UserDashBoardCategoryMgmt.CreateForm(data.d);
                     UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);//for intial items bind
                     break;
                 case 4:
                     UserDashBoardCategoryMgmt.variables.isUnique = data.d;
                     //isUnique = data.d;
                     break;
                 case 5:
                     // save category
                     //  var resd = eval(data.d);
                 if(UserDashBoardCategoryMgmt.variables.isServiceType==true) {
                     SaveServiceInfoDetail(eval(data.d).categoryID);
                 }
                     UserDashBoardCategoryMgmt.saveCategorySuccess(data);
                     checkID = 0;
                     serviceBit = false;
                     UserDashBoardCategoryMgmt.BindCategoryItemsGrid(0, '', '', null, null, serviceBit);
                     break;
                 case 6:
                     UserDashBoardCategoryMgmt.deleteCategorySuccess(data);
                     $("#lblCategoryID").html(0);
                     // $("#"+categoryTitleLabel).html("Category (ID:");                    
                     break;
             	case 7:
                     var ArrayColl =[];
                     var itemListInfo = {
	                     itemlist: {
	                         itemId: '',
	                         IsCheckedID: ''
	                     	}
	                     };
	                  $.each(data.d, function(index, value) {
	                     itemListInfo.itemlist.itemId = value.ItemID;
	                     itemListInfo.itemlist.IsCheckedID = value.IsCheckedID;
	                     ArrayColl.push( JSON2.stringify(itemListInfo.itemlist));
                     });
                     var datax = $.parseJSON('['+ArrayColl.join(',')+']');
                     var currentGridItem = [];
                     var checkedItem = {
                          itemId: '',
                          IsCheckedID: ''
                     };
                     $("#gdvCategoryItems .categoryCheckBox").each(function() {
                     	checkedItem.itemId = this.value;
                     	checkedItem.IsCheckedID = $(this).attr('checked');
                     	currentGridItem.push(JSON2.stringify(checkedItem));                  
                     });
	                 var itemids = [];
	                 for(var z=0; z<currentGridItem.length;z++) {
	             	 var obj = $.parseJSON(currentGridItem[z]);
	                 $.each(datax, function(index) {
	                    if (datax[index].itemId == obj.itemId) {
	                      datax.splice(index,1, obj);
	                    }
	                 });
	                 }
	                 $.each(datax, function(index) {
	                    if (datax[index].IsCheckedID) {
	                      itemids.push(datax[index].itemId);
	                    }
	                 });
	                 itemIdsList = itemids.join(',');
	                 break;
            }
         },

         ajaxFailure: function(data) {
             switch (UserDashBoardCategoryMgmt.config.ajaxCallMode) {
                 case 0:
                     break;
                 case 1:
                     csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>' + JSON2.stringify(err) + '</p>');
                     break;
                 case 2:
                     break;
                 case 3:
                     csscody.error('<h2>'+getLocale(AspxUserDashBoard, "Error Message")+'</h2><p>'+getLocale(AspxUserDashBoard, "Error Occured !!")+' </p>');
                     break;
                 case 4:
                     //check uniqueness                    
                     break;
                 case 5:
                     UserDashBoardCategoryMgmt.errorFn(data);
                     break;
                 case 6:
                     UserDashBoardCategoryMgmt.errorFn(data);
                     break;
                 case 7:
                     UserDashBoardCategoryMgmt.errorFn(data);
                     break;
             }
         },       
         init: function() {
             UserDashBoardCategoryMgmt.GetCategoryAll();
             UserDashBoardCategoryMgmt.GetFormFieldList();
             $("#txtCategoryItemPriceFrom").DigitAndDecimal('.cssClassPrice', '');
             $("#txtCategoryItemPriceTo").DigitAndDecimal('.cssClassPrice', '');
             $("#txtCategoryItemPriceFrom,#txtCategoryItemPriceTo").bind("contextmenu", function(e) {
                 return false;
             });
             $(".activefrom,.activeto").bind("contextmenu", function(e) {
                 return false;
             });
             $('#txtCategoryItemPriceFrom,#txtCategoryItemPriceTo,.activefrom,.activeto').bind('paste', function(e) {
                         e.preventDefault();
                     });
             $('#txtCategoryItemSKU,#txtCategoryItemName,#txtCategoryItemPriceFrom,#txtCategoryItemPriceTo').keyup(function(event) {
                 if (event.keyCode == 13) {
                     UserDashBoardCategoryMgmt.SearchCategoryItems();
                 }
             });
             $('.cssClassStoreCollection').bind('change', function() {
                 var branchId = $('.cssClassStoreCollection option:selected').val();
                 if(branchId !=0) {
                     BindBranchServiceProviders(branchId);
                     $('#divProviderTbl').show();
                     $('.cssServiceProviderTbl').hide();
                 }else {
                     $('#divProviderTbl').hide();
                     $('.cssServiceProviderTbl').hide();
                     $('#btnSaveServiceProvider').hide();
                 }
             });
             $('.cssAddServiceProvider').bind('click', function() {
                 $('#divProviderTbl').hide();
                 $('.cssServiceProviderTbl').show();
                 $('#btnSaveServiceProvider').show();
                 $('#btnCancelServiceProvider').hide();
                 $('#btnSaveServiceProvider').val(0);
                 $('#txtServiceProviderName').val('');
                 $('#txtServiceProviderNickName').val('');
                 $('.providerBranchNameError').html('');
             });
             $('.cssDeleteSelectedProvider').bind('click', function() {
                 var providerIds = '';
                 
                 $(".providerChkbox").each(function(i) {
                     if ($(this).attr("checked")) {
                         providerIds += $(this).val() + ',';
                     }
                 });
                 if (providerIds == "") {
                     csscody.alert('<h2>'+getLocale(AspxUserDashBoard, "Information Alert !!")+'</h2><p>'+getLocale(AspxUserDashBoard, "Please select at least one provider to delete.")+'</p>');
                     return false;
                 }
                 var properties = {
                     onComplete: function(e) {
                         DeleteProviderFrmBranch(providerIds, e);
                     }
                 };
               csscody.confirm("<h2>"+getLocale(AspxUserDashBoard, 'Delete Confirmation')+"</h2><p>"+getLocale(AspxUserDashBoard, 'Are you sure you want to delete the selected provider(s)?')+"</p>", properties);

             });
             $('#btnCancelProviderAdd').bind('click', function() {
                 $('.cssServiceProviderTbl').hide();
                 $('#divProviderTbl').show();
                 $('#btnCancelServiceProvider').show();
                // $('.cssClassStoreCollection').val(0);
               //  $('#btnCancelProviderAdd').val(0);
             });
         }
     };
 UserDashBoardCategoryMgmt.init();
     $("input:file").uniform();
 });
