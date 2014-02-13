<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AccountDashboard.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxUserDashBoard_AccountDashboard" %>

<script type="text/javascript">
    //<![CDATA[
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    //var itemQuantity = "";
    var AccountDashboard = '';
    var defaultShippingExist = '<%=defaultShippingExist %>';
    var defaultBillingExist = '<%=defaultBillingExist %>';
    var addressId = '<%=addressId%>';
    aspxCommonObj.UserName = AspxCommerce.utils.GetUserName();
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxUserDashBoard
        });
        AccountDashboard = {
            config: {
                isPostBack: false,
                async: true,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: AspxCommerce.utils.GetAspxServicePath(),
                method: "",
                url: "",
                oncomplete: 0,
                ajaxCallMode: "",
                error: ""
            },

            ajaxCall: function(config) {
                $.ajax({
                    type: AccountDashboard.config.type,
                    contentType: AccountDashboard.config.contentType,
                    cache: AccountDashboard.config.cache,
                    async: AccountDashboard.config.async,
                    url: AccountDashboard.config.url,
                    data: AccountDashboard.config.data,
                    dataType: AccountDashboard.config.dataType,
                    success: AccountDashboard.config.ajaxCallMode,
                    error: AccountDashboard.ajaxFailure
                });
            },
            vars: {
                itemQuantity: "",
                itemQuantityInCart: "",
                itemName: "",
                variantName: "",
                notExists: ''
            },
            GetAddressBookDetails: function() {
                this.config.method = "AspxCommerceWebService.asmx/GetAddressBookDetails";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = AccountDashboard.BindAddressBookDetails;
                this.ajaxCall(this.config);
            },


            GetSendEmailErrorMsg: function(msg) {
                $('#ddlUSState').show();
                $('#txtState').hide();
                $("#ddlUSState").html('');
                $.each(msg.d, function(index, item) {
                    $("#ddlUSState").append("<option value=" + item.Value + ">" + item.Text + "</option>");
                });
            },

            BindMyOrders: function(msg) {
                var elements = '';
                var tableElements = '';
                var grandTotal = '';
                var couponAmount = '';
                var rewardDiscountAmount = '';
                var taxTotal = '';
                var shippingCost = '';
                var discountAmount = '';
                $.each(msg.d, function(index, value) {
                    if (index < 1) {
                        var billAdd = '';
                        var arrBill;
                        arrBill = value.BillingAddress.split(',');
                        //                        billAdd += '<li>' + arrBill[0] + ' ' + arrBill[1] + '</li>';
                        //                        billAdd += '<li>' + arrBill[2] + '</li><li>' + arrBill[3] + '</li><li>' + arrBill[4] + '</li><li>' + arrBill[5] + '</li>';
                        //                        billAdd += '<li>' + arrBill[6] + '</li><li>' + arrBill[7] + '</li>' + arrBill[8] + '<li>' + arrBill[9] + '</li><li>' + arrBill[10] + '</li><li>' + arrBill[11] + '</li><li>' + arrBill[12] + '</li>';
                        //                        billAdd += '<li>' + arrBill[13] + '</li>';
                        billAdd += '<li><h4>Billing Address :</h4></li>';
                        billAdd += '<li>' + arrBill[0] + ' ' + arrBill[1] + '</li>';
                        billAdd += '<li>' + arrBill[2] + '</li><li>' + arrBill[3] + '</li><li>' + arrBill[4] + '</li>';
                        billAdd += '<li>' + arrBill[5] + ' ' + arrBill[6] + ' ' + arrBill[7] + '</li><li>' + arrBill[8] + '</li><li>' + arrBill[9] + ', ' + arrBill[10] + '</li><li>' + arrBill[11] + '</li><li>' + arrBill[12] + '</li>';
                        $(".cssBillingAddressUl").html(billAdd);

                        $("#orderedDate").html(' ' + value.OrderedDate);
                        $("#invoicedNo").html(' ' + value.InVoiceNumber);
                        $('#storeName').html(' ' + value.StoreName);
                        $("#paymentGatewayType").html(' ' + value.PaymentGatewayTypeName);
                        $("#paymentMethod").html(' ' + value.PaymentMethodName);
                    }
                    tableElements += '<tr>';
                    tableElements += '<td class="cssClassMyAccItemName">' + value.ItemName + '<br/>' + value.CostVariants + '</td>';
                    tableElements += '<td class="cssClassMyAccItemSKU">' + value.SKU + '</td>';
                    tableElements += '<td class="cssClassMyAccShippingAdd">' + value.ShippingAddress + '</td>';
                    tableElements += '<td class="cssClassMyAccShppingRate"><span class="cssClassFormatCurrency">' + value.ShippingRate * rate + '</span></td>';
                    tableElements += '<td class="cssClassMyAccPrice"><span class="cssClassFormatCurrency">' + value.Price * rate + '</span></td>';
                    tableElements += '<td class="cssClassMyAccQuantity">' + value.Quantity + '</td>';
                    tableElements += '<td class="cssClassMyAccSubTotal"><span class="cssClassFormatCurrency">' + value.Price * rate * value.Quantity + '</span></td>';
                    tableElements += '</tr>';
                    if (index == 0) {
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
                                        taxTotal += '<tr><td></td><td></td><td></td><td></td><td></td><td class="cssClassLabel">' + val.TaxManageRuleName + '</td>';
                                        taxTotal += '<td><span class="cssClassFormatCurrency">' + (val.TaxSubTotal * rate).toFixed(2) + '</span></td></tr>';

                                    }
                                });
                            }
                        });
                        shippingCost = '<tr>';
                        shippingCost += '<td></td><td></td><td></td><td></td><td></td><td class="cssClassLabel">' + getLocale(AspxUserDashBoard, 'Shipping Cost:') + '</td>';
                        shippingCost += '<td><span class="cssClassFormatCurrency">' + (value.ShippingRate * rate).toFixed(2) + '</span></td>';
                        shippingCost += '</tr>';
                        discountAmount = '<tr>';
                        discountAmount += '<td></td><td></td><td></td><td></td><td></td><td class="cssClassLabel">' + getLocale(AspxUserDashBoard, 'Discount Amount:') + '</td>';
                        discountAmount += '<td><span class="cssClassFormatCurrency">' + (value.DiscountAmount * rate).toFixed(2) + '</span></td>';
                        discountAmount += '</tr>';
                        couponAmount = '<tr>';
                        couponAmount += '<td></td><td></td><td></td><td></td><td></td><td class="cssClassLabel">' + getLocale(AspxUserDashBoard, 'Coupon Amount:') + '</td>';
                        couponAmount += '<td><span class="cssClassFormatCurrency">' + (value.CouponAmount * rate).toFixed(2) + '</span></td>';
                        couponAmount += '</tr>';
                        rewardDiscountAmount = '<tr>';
                        rewardDiscountAmount += '<td></td><td></td><td></td><td></td><td></td><td class="cssClassLabel">' + getLocale(AspxUserDashBoard, 'Discount(Reward Points):') + '</td>';
                        rewardDiscountAmount += '<td><span class="cssClassFormatCurrency cssClassSubTotal">' + (value.RewardDiscountAmount * rate).toFixed(2) + '</span></td>';
                        rewardDiscountAmount += '</tr>';
                        grandTotal = '<tr>';
                        grandTotal += '<td></td><td></td><td></td><td></td><td></td><td class="cssClassLabel">' + getLocale(AspxUserDashBoard, 'Grand Total:') + '</td>';
                        grandTotal += '<td class="cssClassGrandTotal"><span class="cssClassFormatCurrency">' + (value.GrandTotal * rate).toFixed(2) + '</span></td>';
                        grandTotal += '</tr>';

                        if (value.OrderType == 2) {
                            $.ajax({
                                type: "POST",
                                url: aspxservicePath + "AspxCommerceWebService.asmx/GetServiceDetailsByOrderID",
                                data: JSON2.stringify({ orderID: orderID, aspxCommonObj: aspxCommonObj }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                async: false,
                                success: function(msg) {
                                    if (msg.d.length > 0) {
                                        $('.cssClassServiceDetails').show();
                                        $.each(msg.d, function(index, val) {
                                            $('#serviceName').html(' ' + val.ServiceCategoryName);
                                            $('#serviceProductName').html(' ' + val.ServiceProductName);
                                            $('#serviceDuration').html(' ' + val.ServiceDuration);
                                            $('#providerName').html(' ' + val.EmployeeName);
                                            $('#storeLocationName').html(' ' + val.StoreLocationName);
                                            var date = 'new ' + val.PreferredDate.replace( /[/]/gi , '');
                                            ;
                                            date = eval(date);
                                            $('#serviceDate').html(' ' + formatDate(date, 'yyyy/MM/dd'));
                                            $('#availableTime').html(' ' + val.PreferredTime);
                                            $('#bookAppointmentTime').html(' ' + val.PreferredTimeInterval);
                                        });
                                    }
                                }
                            });
                        } else {
                            $('.cssClassServiceDetails').hide();
                            $('#serviceName').html(' ');
                            $('#serviceProductName').html(' ');
                            $('#serviceDuration').html(' ');
                            $('#providerName').html(' ');
                            $('#storeLocationName').html(' ');
                            $('#serviceDate').html(' ');
                            $('#availableTime').html(' ');
                            $('#bookAppointmentTime').html(' ');
                        }
                    }
                });
                $("#divOrderDetails").find('table>tbody').html(tableElements);
                $("#divOrderDetails").find('table>tbody').append(taxTotal);
                $("#divOrderDetails").find('table>tbody').append(shippingCost);
                $("#divOrderDetails").find('table>tbody').append(discountAmount);
                $("#divOrderDetails").find('table>tbody').append(couponAmount);
                $("#divOrderDetails").find('table>tbody').append(rewardDiscountAmount);
                $("#divOrderDetails").find('table>tbody').append(grandTotal);
                AccountDashboard.OrderHideAll();
                $("#divOrderDetails").show();
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

            },

            BindAddressBookDetails: function(msg) {
                var defaultBillingAddressElements = '';
                var defaultShippingAddressElements = '';
                var addressElements = '';
                var addressId = 0;
                var defaultShippingExist = false;
                var defaultBillingExist = false;
                $.each(msg.d, function(index, value) {
                    if (value.DefaultBilling && value.DefaultShipping) {
                        addressId = value.AddressID;
                    }

                    if (!defaultShippingExist) {
                        if ((value.DefaultShipping != null || value.DefaultShipping)) {
                            defaultShippingExist = true;
                        }
                        else {
                            defaultShippingExist = false;
                        }
                    }

                    if (!defaultBillingExist) {
                        if (value.DefaultBilling != null || value.DefaultBilling) {
                            defaultBillingExist = true;
                        }
                        else {
                            defaultBillingExist = false;
                        }
                    }

                    if (value.DefaultBilling || value.DefaultShipping) {
                        if (value.DefaultShipping) {
                            defaultShippingAddressElements += '<h3>' + getLocale(AspxUserDashBoard, 'Default Shipping Address') + '</h3>';
                            defaultShippingAddressElements += '<p><label name="FirstName">' + value.FirstName + '</label>' + " " + '<label name="LastName">' + value.LastName + '</label><br>';
                            defaultShippingAddressElements += '<label name="Email">' + value.Email + '</label><br>';
                            if (value.Company != "") {
                                defaultShippingAddressElements += '<label name="Company">' + value.Company + '</label><br/>';
                            }
                            defaultShippingAddressElements += '<label name="Address1">' + value.Address1 + '</label><br>';
                            if (value.Address2 != "") {
                                defaultShippingAddressElements += '<label name="Address2">' + value.Address2 + '</label><br>';
                            }
                            defaultShippingAddressElements += '<label name="City">' + value.City + '</label><br>';
                            defaultShippingAddressElements += '<label name="State">' + value.State + '</label><br>';
                            defaultShippingAddressElements += 'Zip:<label name="Zip">' + value.Zip + '</label><br>';
                            defaultShippingAddressElements += '<label name="Country">' + value.Country + '</label><br>';
                            defaultShippingAddressElements += getLocale(AspxUserDashBoard, 'P:') + '<label name="Phone">' + value.Phone + '</label><br>';
                            if (value.Mobile != "") {
                                defaultShippingAddressElements += getLocale(AspxUserDashBoard, 'M:') + '<label name="Mobile">' + value.Mobile + '</label><br>';
                            }
                            if (value.Fax != "") {
                                defaultShippingAddressElements += getLocale(AspxUserDashBoard, 'F:') + '<label name="Fax">' + value.Fax + '</label><br>';
                            }
                            if (value.Website != "") {
                                defaultShippingAddressElements += '<label name="Website">' + value.Website + '</label>';
                            }
                            defaultShippingAddressElements += '</p>';
                            defaultShippingAddressElements += '<p class="cssClassChange"><a href="#" rel="popuprel" name="EditAddress" Flag="1" value="' + value.AddressID + '" Element="Shipping">' + getLocale(AspxUserDashBoard, 'Change Shipping Address') + '</a></p>';

                            $("#liDefaultShippingAddress").html(defaultShippingAddressElements);
                        }
                        if (value.DefaultBilling) {
                            defaultBillingAddressElements += '<h3>' + getLocale(AspxUserDashBoard, 'Default Billing Address') + '</h3>';
                            defaultBillingAddressElements += '<p><label name="FirstName">' + value.FirstName + '</label>' + " " + '<label name="LastName">' + value.LastName + '</label><br>';
                            defaultBillingAddressElements += '<label name="Email">' + value.Email + '</label><br>';
                            if (value.Company != "") {
                                defaultBillingAddressElements += '<label name="Company">' + value.Company + '</label><br/>';
                            }
                            defaultBillingAddressElements += '<label name="Address1">' + value.Address1 + '</label><br>';
                            if (value.Address2 != "") {
                                defaultBillingAddressElements += '<label name="Address2">' + value.Address2 + '</label><br>';
                            }
                            defaultBillingAddressElements += '<label name="City">' + value.City + '</label><br>';
                            defaultBillingAddressElements += '<label name="State">' + value.State + '</label><br>';
                            defaultBillingAddressElements += 'Zip:<label name="Zip">' + value.Zip + '</label><br>';
                            defaultBillingAddressElements += '<label name="Country">' + value.Country + '</label><br>';
                            defaultBillingAddressElements += getLocale(AspxUserDashBoard, 'P:') + '<label name="Phone">' + value.Phone + '</label><br>';
                            if (value.Mobile != "") {
                                defaultBillingAddressElements += getLocale(AspxUserDashBoard, 'M:') + '<label name="Mobile">' + value.Mobile + '</label><br>';
                            }
                            if (value.Fax != "") {
                                defaultBillingAddressElements += getLocale(AspxUserDashBoard, 'F:') + '<label name="Fax">' + value.Fax + '</label><br>';
                            }
                            if (value.Website != "") {
                                defaultBillingAddressElements += '<label name="Website">' + value.Website + '</label>';
                            }
                            defaultBillingAddressElements += '</p>';
                            defaultBillingAddressElements += '<p class="cssClassChange"><a href="#" rel="popuprel" name="EditAddress" Flag="1" value="' + value.AddressID + '" Element="Billing">' + getLocale(AspxUserDashBoard, 'Change Billing Address') + '</a></p>';
                            $("#liDefaultBillingAddress").html(defaultBillingAddressElements);
                        }
                    }
                });

                if (defaultShippingExist) {
                    $("#hdnDefaultShippingExist").val('1');
                }
                else {
                    $("#hdnDefaultShippingExist").val('0');
                    $("#liDefaultShippingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, 'You have not set Default Shipping Adresss Yet!') + "</span>");
                }
                if (defaultBillingExist) {
                    $("#hdnDefaultBillingExist").val('1');
                }
                else {
                    $("#hdnDefaultBillingExist").val('0');
                    $("#liDefaultBillingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, 'You have not set Default Billing Adresss Yet!') + "</span>");
                }

                $("a[name='EditAddress']").bind("click", function() {
                    AccountDashboard.ClearAll();
                    $("#hdnAddressID").val($(this).attr("value"));
                    $("#txtFirstName").val($(this).parent('p').prev('p').find('label[name="FirstName"]').text());
                    $("#txtLastName").val($(this).parent('p').prev('p').find('label[name="LastName"]').text());
                    $("#txtEmailAddress").val($(this).parent('p').prev('p').find('label[name="Email"]').text());
                    $("#txtCompanyName").val($(this).parent('p').prev('p').find('label[name="Company"]').text());
                    $("#txtAddress1").val($(this).parent('p').prev('p').find('label[name="Address1"]').text());
                    $("#txtAddress2").val($(this).parent('p').prev('p').find('label[name="Address2"]').text());
                    $("#txtCity").val($(this).parent('p').prev('p').find('label[name="City"]').text());
                    $("#txtZip").val($(this).parent('p').prev('p').find('label[name="Zip"]').text());
                    var countryName = $.trim($(this).parent('p').prev('p').find('label[name="Country"]').text());
                    $('#ddlCountry').val($('#ddlCountry option:contains(' + countryName + ')').attr('value'));
                    var countryCode = $('#ddlCountry').val();
                    var txtState = $(this).parent('p').prev('p').find('label[name="State"]').text();
                    $("#ddlUSState").html('');
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/BindStateList",
                        data: JSON2.stringify({ countryCode: countryCode }),
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function(msg) {
                            $.each(msg.d, function(index, item) {
                                if (item.Text != 'NotExists') {
                                    $('#ddlUSState').show();
                                    $('#txtState').hide();
                                    if (txtState != '' || txtState != null) {
                                        $("#ddlUSState").append("<option value=" + item.Value + ">" + item.Text + "</option>");
                                    }
                                } else {
                                    AccountDashboard.vars.notExists = item.Text;
                                    $('#ddlUSState').hide();
                                    $('#txtState').show();
                                    $("#txtState").val(txtState);
                                }
                            });
                            //$('#ddlUSState').val($('#ddlUSState option:exactcontains(' + txtState + ')').attr('value'));
                            $('#ddlUSState option').filter(function() { return ($(this).text() == $.trim(txtState)); }).attr('selected', 'selected');
                        }
                    });
                    $("#txtPhone").val($(this).parent('p').prev('p').find('label[name="Phone"]').text());
                    $("#txtMobile").val($(this).parent('p').prev('p').find('label[name="Mobile"]').text());
                    $("#txtFax").val($(this).parent('p').prev('p').find('label[name="Fax"]').text());
                    $("#txtWebsite").val($(this).parent('p').prev('p').find('label[name="Website"]').text());

                    $("#chkShippingAddress").removeAttr("checked");
                    $("#chkBillingAddress").removeAttr("checked");

                    if ($(this).attr("value") == addressId) {

                        $('#trBillingAddress ,#trShippingAddress').hide();

                        $("#chkBillingAddress").attr("disabled", "disabled");
                        $("#chkShippingAddress").attr("disabled", "disabled");
                    }
                    else if ($(this).attr("Flag") == 1) {

                        if ($(this).attr("Element") == "Billing") {

                            $("#chkBillingAddress").attr("disabled", "disabled");
                            $("#chkShippingAddress").removeAttr("disabled");
                        }
                        else {
                            $("#chkShippingAddress").attr("disabled", "disabled");
                            $("#chkBillingAddress").removeAttr("disabled");
                        }
                    }
                    else {
                        $("#chkShippingAddress").removeAttr("disabled");
                        $("#chkBillingAddress").removeAttr("disabled");
                    }
                    ShowPopup(this);

                });
            },

            BindUserAddressOnUpdate: function() {
                AccountDashboard.GetAddressBookDetails();
                $('#fade, #popuprel').fadeOut();
            },

            BindCountryList: function(msg) {
                var countryElements = '';
                $.each(msg.d, function(index, value) {
                    countryElements += '<option value=' + value.Value + '>' + value.Text + '</option>';
                });
                $("#ddlCountry").html(countryElements);
            },

            ajaxFailure: function() {
            },

            GetStateList: function(countryCode) {
                this.config.method = "AspxCommerceWebService.asmx/BindStateList";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ countryCode: countryCode }),
                this.config.ajaxCallMode = AccountDashboard.BindStateList;
                this.ajaxCall(this.config);

            },
            BindStateList: function(msg) {
                $('#ddlUSState').show();
                $('#txtState').hide();
                $("#ddlUSState").html('');
                $.each(msg.d, function(index, item) {
                    if (item.Text != 'NotExists') {
                        $("#ddlUSState").append("<option value=" + item.Value + ">" + item.Text + "</option>");
                    } else {
                        $('#ddlUSState').hide();
                        $('#txtState').show();
                    }
                });
            },
            OrderHideAll: function() {
                $("#divMyOrders").hide();
                $("#divOrderDetails").hide();
                $("#popuprel").hide();
            },

            GetMyOrders: function() {
                var offset_ = 1;
                var current_ = 1;
                var perpage = ($("#gdvMyOrder_pagesize").length > 0) ? $("#gdvMyOrder_pagesize :selected").text() : 10;
                $("#gdvMyOrders").sagegrid({
                    url: this.config.baseURL + "AspxCommerceWebService.asmx/",
                    functionMethod: 'GetMyOrderList',
                    colModel: [
                    { display: getLocale(AspxUserDashBoard, 'Order ID'), name: 'order_id', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxUserDashBoard, 'Invoice Number'), name: 'invoice_number', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: 'CustomerID', name: 'customerID', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Customer Name'), name: 'customer_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Email', name: 'email', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Order Status'), name: 'order_status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: 'Grand Total', name: 'grand_total', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Payment Gateway Type Name', name: 'payment_gateway_typename', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: 'Payment Method Name', name: 'payment_method_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxUserDashBoard, 'Ordered Date'), name: 'ordered_date', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxUserDashBoard, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }

    				],

                    buttons: [
            { display: getLocale(AspxUserDashBoard, 'View'), name: 'viewOrder', enable: true, _event: 'click', trigger: '1', callMethod: 'AccountDashboard.GetOrderDetails', arguments: '' },
              { display: getLocale(AspxUserDashBoard, 'Reorder'), name: 'Reorder', enable: true, _event: 'click', trigger: '1', callMethod: 'AccountDashboard.ReOrder', arguments: '' },
               { display: getLocale(AspxUserDashBoard, 'Return'), name: 'Return', enable: true, _event: 'click', trigger: '1', callMethod: 'AccountDashboard.LoadControl', arguments: '' }
    			    ],
                    rp: perpage,
                    nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                    param: { aspxCommonObj: aspxCommonObj },
                    current: current_,
                    pnew: offset_,
                    sortcol: { 10: { sorter: false} }
                });
            },

            LoadControl: function(tblID, argus) {
                //alert(argus[0]);
                var controlName = "Modules/AspxCommerce/AspxReturnAndPolicy/ReturnsSubmit.ascx";
                $.ajax({
                    type: "POST",
                    url: AspxCommerce.utils.GetAspxServicePath() + "LoadControlHandler.aspx/Result",
                    data: "{ controlName:'" + AspxCommerce.utils.GetAspxRootPath() + controlName + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        $('#divLoadUserControl').html(response.d);
                        var orderID = (argus[0]);
                        ReturnsSubmit.GetOrderDetails(orderID);
                    },
                    error: function() {
                        csscody.error('<h2>' + getLocale(AspxUserDashBoard, 'Error Message') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Failed to load control!.') + '</p>');
                    }
                });
            },



            ReOrder: function(tblID, argus) {
                switch (tblID) {
                    case "gdvMyOrders":
                        AccountDashboard.GetReOrderDetails(argus[0]);
                        break;
                }
            },
            GetReOrderDetails: function(argus) {
                var orderId = argus;
                this.config.method = "AspxCommerceWebService.asmx/GetMyOrdersforReOrder";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ orderID: orderId, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = AccountDashboard.ReOrderItems;
                this.config.async = false;
                this.ajaxCall(this.config);
            },
            ReOrderItems: function(data) {
                $.each(data.d, function(index, value) {
                    var itemId = value.ItemID;
                    itemName = value.ItemName;
                    var itemPrice = value.Price;
                    var itemSKU = value.SKU;
                    var itemQuantity = 1;
                    var totalWeightVariant = value.Weight;
                    var itemCostVariantIDs = value.ItemCostVariantValueIDs;
                    variantName = value.CostVariants;
                    var sessionCode = AspxCommerce.utils.GetSessionCode();
                    if (itemCostVariantIDs == '' || itemCostVariantIDs == null) {
                        //AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity, storeId, portalId, customerId, sessionCode, userName, cultureName);
                        AccountDashboard.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity, aspxCommonObj);
                    }
                    else {
                        // find   info.Quantity by making a function
                        var itemQuantityTotal = AccountDashboard.CheckItemQuantity(itemId, itemCostVariantIDs);
                        var itemQuantityInCart = AccountDashboard.CheckItemQuantityInCart(itemId, itemCostVariantIDs + '@');
                        if (itemQuantityInCart != 0.1) {
                            //To know whether the item is downloadable (0.1 downloadable)                           
                            if (itemQuantityTotal <= 0) {
                                //alert(itemQuantityTotal);
                                csscody.alert("<h2>" + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Product') + " " + '(' + itemName + " " + ',' + variantName + ')' + " " + getLocale(AspxUserDashBoard, 'is currently Out Of Stock!') + "</p>");
                                //return false;
                            } else {
                                if ((eval(itemQuantity) + eval(itemQuantityInCart)) > eval(itemQuantityTotal)) {
                                    csscody.alert("<h2>" + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Product') + " " + '(' + itemName + " " + ',' + variantName + ')' + " " + getLocale(AspxUserDashBoard, 'is currently Out Of Stock!') + "</p>");
                                    //return false;

                                }
                                else {
                                    AccountDashboard.AddItemstoCart(itemId, itemPrice, totalWeightVariant, itemQuantity, itemCostVariantIDs, aspxCommonObj);

                                }
                            }
                        }
                    }
                });
                //window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + myCartURL + '.aspx';
            },
            AddToCartFromJS: function(itemId, itemPrice, itemSKU, itemQuantity, aspxCommonObj) {

                var param = { itemID: itemId, itemPrice: itemPrice, itemQuantity: itemQuantity, aspxCommonObj: aspxCommonObj };
                var data = JSON2.stringify(param);
                var myCartUrl;
                var addToCartProperties = {
                    onComplete: function(e) {
                        if (e) {
                            if (AspxCommerce.utils.IsUserFriendlyUrl) {
                                myCartUrl = myCartURL + pageExtension;
                            } else {
                                myCartUrl = myCartURL;
                            }
                            window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + myCartUrl;
                        }
                    }
                };
                $.ajax({
                    type: "POST",
                    url: this.config.baseURL + "AspxCommerceWebService.asmx/AddItemstoCart",
                    data: data,
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        if (msg.d == 1) {
                            AspxCommerce.RootFunction.RedirectToItemDetails(itemSKU);
                        }
                        else if (msg.d == 2) {
                            //out of stock
                            csscody.alert("<h2>" + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Product') + " " + '(' + itemName + ')' + " " + getLocale(AspxUserDashBoard, 'is currently Out Of Stock!') + "</p>");
                            HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                            ShopingBag.GetCartItemCount(); //for shopping bag counter from database                          
                            ShopingBag.GetCartItemListDetails(); //for details in shopping bag
                        }
                        else {
                            /////////////////////******Fly To basket****///////////////////
                            csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, 'Item') + " " + '(' + itemName + ')' + " " + getLocale(AspxUserDashBoard, 'has been successfully added to cart.') + '</p>', addToCartProperties);
                            HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                            ShopingBag.GetCartItemCount(); //for shopping bag counter from database                               
                            ShopingBag.GetCartItemListDetails(); //for details in shopping bag
                        }
                    }
                });
            },

            AddItemstoCart: function(itemId, itemPrice, totalWeightVariant, itemQuantity, itemCostVariantIDs, aspxCommonObj) {

                var costVariantIDs = itemCostVariantIDs + '@';
                var isgiftCard = false;
                var giftCardDetail = null;

                var AddItemToCartObj = {
                    ItemID: itemId,
                    Price: itemPrice,
                    Weight: totalWeightVariant,
                    Quantity: itemQuantity,
                    CostVariantIDs: costVariantIDs,
                    IsGiftCard: isgiftCard
                };
                this.config.method = "AspxCommerceWebService.asmx/AddItemstoCartFromDetail";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, AddItemToCartObj: AddItemToCartObj, giftCardDetail: giftCardDetail });
                this.config.ajaxCallMode = AccountDashboard.AddItemstoCartFromDetail;
                this.config.oncomplete = 20;
                this.config.error = AccountDashboard.GetAddToCartErrorMsg;
                this.config.async = false;
                this.ajaxCall(this.config);
            },
            AddItemstoCartFromDetail: function(msg) {
                if (msg.d == 1) {
                    var myCartUrl;
                    if (userFriendlyURL) {
                        myCartUrl = myCartURL + pageExtension;
                    } else {
                        myCartUrl = myCartURL;
                    }
                    var addToCartProperties = {
                        onComplete: function(e) {
                            if (e) {
                                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + myCartURL + pageExtension;
                            }
                        }
                    };
                    csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, 'Item') + " " + '(' + itemName + " " + ',' + variantName + ')' + " " + getLocale(AspxUserDashBoard, 'has been successfully added to cart.') + '</p>', addToCartProperties);
                    HeaderControl.GetCartItemTotalCount(); //for header cart count from database
                    ShopingBag.GetCartItemCount(); //for bag count
                    ShopingBag.GetCartItemListDetails(); //for shopping bag detail
                }
                else if (msg.d == 2) {
                    csscody.alert("<h2>" + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Product') + " " + '(' + itemName + " " + ',' + variantName + ')' + " " + getLocale(AspxUserDashBoard, 'is currently Out Of Stock!') + "</p>");
                }
            },

            GetAddToCartErrorMsg: function() {
                csscody.error('<h2>' + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Failed') + " " + '(' + itemName + " " + ',' + variantName + ')' + " " + getLocale(AspxUserDashBoard, 'to add item to cart!') + '</p>');
            },
            oncomplete: function() {
                switch (ItemDetail.config.oncomplete) {
                    case 20:
                        ItemDetail.config.oncomplete = 0;
                        if ($("#divCartDetails").length > 0) {
                            AspxCart.GetUserCartDetails(); //for binding mycart's tblCartList
                        }
                        break;
                }
            },

            CheckItemQuantity: function(itemId, itemCostVariantIDs) {
                this.config.method = "AspxCommerceWebService.asmx/CheckItemQuantity";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj, itemCostVariantIDs: itemCostVariantIDs });
                this.config.ajaxCallMode = AccountDashboard.SetItemQuantity;
                this.config.async = false;
                this.ajaxCall(this.config);
                return AccountDashboard.vars.itemQuantity;
            },
            SetItemQuantity: function(msg) {
                AccountDashboard.vars.itemQuantity = msg.d;
            },
            CheckItemQuantityInCart: function(itemId, itemCostVariantIDs) {
                this.config.method = "AspxCommerceWebService.asmx/CheckItemQuantityInCart";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj, itemCostVariantIDs: itemCostVariantIDs });
                this.config.ajaxCallMode = AccountDashboard.SetItemQuantityInCart;
                this.config.async = false;
                this.ajaxCall(this.config);
                return AccountDashboard.vars.itemQuantityInCart;
            },
            SetItemQuantityInCart: function(msg) {
                AccountDashboard.vars.itemQuantityInCart = msg.d;
            },

            GetOrderDetails: function(tblID, argus) {
                switch (tblID) {
                    case "gdvMyOrders":
                        AccountDashboard.GetAllOrderDetails(argus[0]);
                        break;
                }
            },

            GetAllOrderDetails: function(argus) {
                var orderId = argus;
                this.config.method = "AspxCommerceWebService.asmx/GetMyOrders";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ orderID: orderId, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = AccountDashboard.BindMyOrders;
                this.ajaxCall(this.config);
            },

            GetCheckOutPage: function(tdlID, argus) {
                switch (tdlID) {
                    case "gdvMyOrders":
                        //checkoutpage.aspx;
                        break;
                    default:
                        break;
                }
            },

            ClearAll: function() {
                $("#hdnAddressID").val(0);
                $("#txtFirstName").val('');
                $("#txtLastName").val('');
                $("#txtEmailAddress").val('');
                $("#txtCompanyName").val('');
                $("#txtAddress1").val('');
                $("#txtAddress2").val('');
                $("#txtCity").val('');
                $("#txtState").val('');
                $('#ddlCountry').val(1);
                $("#ddlUSState").val(1);
                $("#txtZip").val('');
                $("#txtPhone").val('');
                $("#txtMobile").val('');
                $("#txtFax").val('');
                $("#txtWebsite").val('');
                $("#chkShippingAddress").removeAttr("checked");
                $("#chkBillingAddress").removeAttr("checked");
                $("#chkShippingAddress").removeAttr("disabled");
                $("#chkBillingAddress").removeAttr("disabled");
            },

            AddUpdateUserAddress: function() {
                var addressId = $("#hdnAddressID").val();
                var firstName = $("#txtFirstName").val();
                var lastName = $("#txtLastName").val();
                var email = $("#txtEmailAddress").val();
                var company = $("#txtCompanyName").val();
                var address1 = $("#txtAddress1").val();
                var address2 = $("#txtAddress2").val();
                var city = $("#txtCity").val();
                var state = '';
                if (AccountDashboard.vars.notExists != "NotExists") {
                    state = $("#ddlUSState :selected").text();
                }
                else {
                    state = $("#txtState").val();
                }
                var zip = $("#txtZip").val();
                var phone = $("#txtPhone").val();
                var mobile = $("#txtMobile").val();
                var fax = $("#txtFax").val();
                var webSite = $("#txtWebsite").val();
                var countryName = $("#ddlCountry :selected").text();
                var isDefaultShipping = $("#chkShippingAddress").attr("checked");
                var isDefaultBilling = $("#chkBillingAddress").attr("checked");
                this.config.method = "AspxCommerceWebService.asmx/AddUpdateUserAddress";
                this.config.url = this.config.baseURL + this.config.method;
                var addressObj = {
                    AddressID: addressId,
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Company: company,
                    Address1: address1,
                    Address2: address2,
                    City: city,
                    State: state,
                    Zip: zip,
                    Phone: phone,
                    Mobile: mobile,
                    Fax: fax,
                    Country: countryName,
                    WebSite: webSite,
                    DefaultShipping: isDefaultShipping,
                    DefaultBilling: isDefaultBilling
                };
                this.config.data = JSON2.stringify({ addressObj: addressObj, aspxCommonObj: aspxCommonObj
                });
                this.config.ajaxCallMode = AccountDashboard.BindUserAddressOnUpdate;
                this.ajaxCall(this.config);
                //return false;

            },

            GetAllCountry: function() {
                this.config.method = "AspxCommerceWebService.asmx/BindCountryList";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = "{}";
                this.config.ajaxCallMode = AccountDashboard.BindCountryList;
                this.ajaxCall(this.config);
            },

            Init: function() {
                var v1 = $("#form1").validate({
                    messages: {
                        FirstName: {
                            required: '*',
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "", maxlength: "*"
                        },
                        LastName: {
                            required: '*',
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "", maxlength: "*"
                        },
                        Email: {
                            required: '*',
                            email: getLocale(AspxUserDashBoard, "Please enter valid email id")
                        },
                        Address1: {
                            required: '*',
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "", maxlength: "*"
                        },
                        Address2: {
                            maxlength: "*"
                        },
                        Zip: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 5 chars)") + "", maxlength: "*"
                        },
                        State: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "", maxlength: "*"
                        },
                        Phone: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 7 digits)") + "", maxlength: "*"
                        },
                        Mobile: {
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 10 digits)") + "", maxlength: "*"
                        },
                        Fax: {
                        //number: true
                    },
                    Company: {
                        maxlength: "*"
                    },
                    City: {
                        required: '*',
                        minlength: "* " + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "", maxlength: "*"
                    },
                    name: {
                        required: '*',
                        minlength: "*" + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "", maxlength: "*"
                    }
                }, ignore: ":hidden"
            });

            $('#btnSubmitAddress').click(function() {
                if (v1.form()) {
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/BindStateList",
                        data: JSON2.stringify({ countryCode: $("#ddlCountry :selected").val() }),
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function(msg) {
                            var state = '';
                            if (msg.d.length > 2) {
                                state = $("#ddlUSState :selected").text();
                            } else {
                                state = $("#txtState").val();
                            }
                            AccountDashboard.AddUpdateUserAddress(state);
                        }
                    });
                    //AccountDashboard.AddUpdateUserAddress();
                    //alert("Address saved Successfully.");
                    csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Information Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Address saved Successfully.") + "</p>");
                    return false;
                }
                else {
                    return false;
                }
            });

            $("#spanUserName").html(' ' + userName + '');
            $("#spanCustomerName").html('' + userName + '');
            $("#spanCustomerEmail").html('' + userEmail + '');
            //for GetMyOrders
            AccountDashboard.GetMyOrders();
            AccountDashboard.OrderHideAll();
            $("#divMyOrders").show();

            $("#lnkBack").bind("click", function() {
                AccountDashboard.OrderHideAll();
                $("#divMyOrders").show();
            });

            //End Of GetMYOrders
            //Start of AddressBook
            // AccountDashboard.GetAddressBookDetails();
            if (defaultShippingExist.toLowerCase() == 'true') {
                $("#hdnDefaultShippingExist").val('1');
            }
            else {
                $("#hdnDefaultShippingExist").val('0');
                $("#liDefaultShippingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, 'You have not set Default Shipping Adresss Yet!') + "</span>");
            }
            if (defaultBillingExist.toLowerCase() == 'true') {
                $("#hdnDefaultBillingExist").val('1');
            }
            else {
                $("#hdnDefaultBillingExist").val('0');
                $("#liDefaultBillingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, 'You have not set Default Billing Adresss Yet!') + "</span>");
            }

            $("a[name='EditAddress']").bind("click", function() {
                AccountDashboard.ClearAll();
                $("#hdnAddressID").val($(this).attr("value"));
                $("#txtFirstName").val($(this).parent('p').prev('p').find('label[name="FirstName"]').text());
                $("#txtLastName").val($(this).parent('p').prev('p').find('label[name="LastName"]').text());
                $("#txtEmailAddress").val($(this).parent('p').prev('p').find('label[name="Email"]').text());
                $("#txtCompanyName").val($(this).parent('p').prev('p').find('label[name="Company"]').text());
                $("#txtAddress1").val($(this).parent('p').prev('p').find('label[name="Address1"]').text());
                $("#txtAddress2").val($(this).parent('p').prev('p').find('label[name="Address2"]').text());
                $("#txtCity").val($(this).parent('p').prev('p').find('label[name="City"]').text());
                $("#txtZip").val($(this).parent('p').prev('p').find('label[name="Zip"]').text());
                var countryName = $.trim($(this).parent('p').prev('p').find('label[name="Country"]').text());
                $('#ddlCountry').val($('#ddlCountry option:contains(' + countryName + ')').attr('value'));
                var countryCode = $('#ddlCountry').val();
                var txtState = $(this).parent('p').prev('p').find('label[name="State"]').text();
                $("#ddlUSState").html('');
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/BindStateList",
                    data: JSON2.stringify({ countryCode: countryCode }),
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        $.each(msg.d, function(index, item) {
                            if (item.Text != 'NotExists') {
                                $('#ddlUSState').show();
                                $('#txtState').hide();
                                if (txtState != '' || txtState != null) {
                                    $("#ddlUSState").append("<option value=" + item.Value + ">" + item.Text + "</option>");
                                }
                            } else {
                                AccountDashboard.vars.notExists = item.Text;
                                $('#ddlUSState').hide();
                                $('#txtState').show();
                                $("#txtState").val(txtState);
                            }
                        });
                        //$('#ddlUSState').val($('#ddlUSState option:exactcontains(' + txtState + ')').attr('value'));
                        $('#ddlUSState option').filter(function() { return ($(this).text() == $.trim(txtState)); }).attr('selected', 'selected');
                    }
                });
                $("#txtPhone").val($(this).parent('p').prev('p').find('label[name="Phone"]').text());
                $("#txtMobile").val($(this).parent('p').prev('p').find('label[name="Mobile"]').text());
                $("#txtFax").val($(this).parent('p').prev('p').find('label[name="Fax"]').text());
                $("#txtWebsite").val($(this).parent('p').prev('p').find('label[name="Website"]').text());

                $("#chkShippingAddress").removeAttr("checked");
                $("#chkBillingAddress").removeAttr("checked");

                if ($(this).attr("value") == addressId) {

                    $('#trBillingAddress ,#trShippingAddress').hide();

                    $("#chkBillingAddress").attr("disabled", "disabled");
                    $("#chkShippingAddress").attr("disabled", "disabled");
                }
                else if ($(this).attr("Flag") == 1) {

                    if ($(this).attr("Element") == "Billing") {

                        $("#chkBillingAddress").attr("disabled", "disabled");
                        $("#chkShippingAddress").removeAttr("disabled");
                    }
                    else {
                        $("#chkShippingAddress").attr("disabled", "disabled");
                        $("#chkBillingAddress").removeAttr("disabled");
                    }
                }
                else {
                    $("#chkShippingAddress").removeAttr("disabled");
                    $("#chkBillingAddress").removeAttr("disabled");
                }
                ShowPopup(this);

            });
            //AccountDashboard.GetAllCountry();
            $("#lnkNewAddress").bind("click", function() {
                AccountDashboard.ClearAll();
                if ($("#hdnDefaultShippingExist").val() == "0") {
                    $("#chkShippingAddress").attr("checked", "checked");
                    $("#chkShippingAddress").attr("disabled", "disabled");
                }
                if ($("#hdnDefaultBillingExist").val() == "0") {
                    $("#chkBillingAddress").attr("checked", "checked");
                    $("#chkBillingAddress").attr("disabled", "disabled");
                }
                ShowPopup(this);
            });
            $(".cssClassClose").bind("click", function() {
                $('#fade, #popuprel').fadeOut();
            });
            $("#btnCancelAddNewAddress").bind("click", function() {
                $('#fade, #popuprel').fadeOut();
            });
            $("#btnAddNewAddress").bind("click", function() {
                $('#fade, #popuprel').fadeOut();
            });

            $('#ddlUSState').hide();
            $('#trBillingAddress ,#trShippingAddress').hide();
            $("#ddlCountry ").bind("change", function() {
                AccountDashboard.GetStateList($(this).val());
                $('#txtState').val('');

            });
        }
    };
    AccountDashboard.Init();
});
//End of AddressBook
//]]>
</script>

<div class="welcome-msg">
    <h2 class="sub-title">
        <span class="sfLocale">Hello,</span><span id="spanUserName"></span>
    </h2>
    <p class="sfLocale">
      From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.
    </p>
</div>
<div id="divMyOrders">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblTitle" class="sfLocale">
                    My Orders</label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="loading">
                    <img id="ajaxAccountDashBoardImage" src="" alt="loading...." class="sfLocale" title="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvMyOrders" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divOrderDetails" class="sfFormwrapper">
    <div class="cssClassStoreDetail">
        <br />
        <b><span class="cssClassLabel sfLocale">Ordered Date: </span></b><span id="orderedDate">
        </span>
        <br />
        <b><span class="cssClassLabel sfLocale">Invoice Number: </span></b><span id="invoicedNo">
        </span>
        <br />
        <b><span class="cssClassLabel sfLocale">Store Name: </span></b><span id="storeName">
        </span>
        <br />
        <div class="cssPaymentDetail">
            <b><span class="cssClassLabel sfLocale">Payment Method: </span></b><span id="paymentMethod">
            </span>
        </div>
    </div>
    <div class="cssClassBillingAddress cssClassStorePayment">
        <ul class="cssBillingAddressUl">
        </ul>
    </div>
    <div class="cssClassServiceDetails" style="display: none">
        <ul>
            <li>
                <h4>
                    <span class="sfLocale">Service Details:</span></h4>
            </li>
            <li>
                <label class="sfLocale">
                    Service Name:</label><span class="cssClassLabel" id="serviceName"></span>
            </li>
            <li>
                <label class="sfLocale">
                    Product Name:</label><span class="cssClassLabel" id="serviceProductName"></span>
            </li>
            <li>
                <label class="sfLocale">
                    Duration:</label><span class="cssClassLabel" id="serviceDuration"></span>
            </li>
            <li>
                <label class="sfLocale">
                    Provider Name:</label><span class="cssClassLabel" id="providerName"></span>
            </li>
            <li>
                <label class="sfLocale">
                    Store Location:</label><span class="cssClassLabel" id="storeLocationName"></span>
            </li>
            <li>
                <label class="sfLocale">
                    Date:</label><span class="cssClassLabel" id="serviceDate"></span> </li>
            <li>
                <label class="sfLocale">
                    Available Time:</label><span class="cssClassLabel" id="availableTime"></span>
            </li>
            <li>
                <label class="sfLocale">
                    Appointment Time:</label><span class="cssClassLabel" id="bookAppointmentTime"></span>
            </li>
        </ul>
    </div>
    <br />
    <h2>
        <span class="cssClassLabel sfLocale">Ordered Items: </span>
    </h2>
    <table class="sfGridWrapperTable" cellspacing="0" cellpadding="0" border="0" width="100%">
        <thead>
            <tr class="cssClassHeading">
                <td class=" sfLocale">
                    Item Name
                </td>
                <td class=" sfLocale">
                    SKU
                </td>
                <td class=" sfLocale">
                    Shipping Address
                </td>
                <td class=" sfLocale">
                    Shipping Rate
                </td>
                <td class=" sfLocale">
                    Price
                </td>
                <td class=" cssClassQtyTbl sfLocale">
                    Quantity
                </td>
                <td class=" cssClassSubTotalTbl sfLocale">
                    Sub Total
                </td>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <a href="#" id="lnkBack" class="cssClassBack sfLocale">Go back</a>
</div>
<%--<div>
    &nbsp;&nbsp</div>--%>
<div class="cssClassMyAccountInformation">
    <div class="cssClassHeading">
        <h2>
            <span class="sfLocale">Account Information</span></h2>
        <div class="cssClassClear">
        </div>
    </div>
    <div>
        <h3 class="sfLocale">
            Contact Information
        </h3>
        <p>
            <span id="spanCustomerName"></span>
            <br />
            <span id="spanCustomerEmail"></span>
        </p>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<div>
    &nbsp;&nbsp</div>
<div class="cssClassMyAddressInformation">
    <div class="cssClassHeading">
        <h2>
            <span class="sfLocale">Address Book</span>
        </h2>
        <div class="cssClassClear">
        </div>
    </div>
    <div class="cssClassCommonWrapper">
        <div class="cssClassCol1">
            <div class="cssClassAddressBook">
                <h3 class="sfLocale">
                    Default Addresses</h3>
                <ol>
                    <asp:Literal ID="ltrShipAddress" runat="server" EnableViewState="false"></asp:Literal>
                    <%--<li id="liDefaultShippingAddress"></li>--%>
                </ol>
            </div>
        </div>
        <div class="cssClassCol2">
            <div class="cssClassAddressBook">
                <h3>
                    &nbsp</h3>
                <ol>
                    <asp:Literal ID="ltrBillingAddress" runat="server" EnableViewState="false"></asp:Literal>
                    <%--<li id="liDefaultBillingAddress"></li>--%>
                </ol>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
    </div>
</div>
<div class="popupbox" id="popuprel">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <h2>
        <label id="lblAddressTitle" class="sfLocale">
            Address Details</label>
    </h2>
    <div class="sfFormwrapper">
        <table id="tblNewAddress" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td>
                        <label id="lblFirstName" class="cssClassLabel sfLocale">
                            FirstName:</label>
                        <span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtFirstName" name="FirstName" class="required" minlength="2"
                            maxlength="40" />
                    </td>
                    <td>
                        <label id="lblLastName" class="cssClassLabel sfLocale">
                            LastName:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtLastName" name="LastName" class="required" minlength="2"
                            maxlength="40" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblEmail" class="cssClassLabel sfLocale">
                            Email:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtEmailAddress" name="Email" class="required email" minlength="2" />
                    </td>
                    <td>
                        <label id="lblCompany" class="cssClassLabel sfLocale">
                            Company:</label>
                    </td>
                    <td>
                        <input type="text" id="txtCompanyName" name="Company" maxlength="40" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblAddress1" class="cssClassLabel sfLocale">
                            Address1:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtAddress1" name="Address1" class="required" minlength="2"
                            maxlength="250" />
                    </td>
                    <td>
                        <label id="lblAddress2" class="cssClassLabel sfLocale">
                            Address2:</label>
                    </td>
                    <td>
                        <input type="text" id="txtAddress2" name="Address2" maxlength="250" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblCountry" class="cssClassLabel sfLocale">
                            Country:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <%-- <select id="ddlCountry" class="sfListmenu">
                        </select>--%>
                        <asp:Literal ID="ltrCountry" runat="server" EnableViewState="false"></asp:Literal>
                    </td>
                    <td>
                        <label id="lblState" class="cssClassLabel sfLocale">
                            State/Province:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtState" name="State" class="required" minlength="2" maxlength="250" />
                        <select id="ddlUSState" class="sfListmenu">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblZip" class="cssClassLabel sfLocale">
                            Zip/Postal Code:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtZip" name="Zip" class="required alphaNumberic" minlength="5"
                            maxlength="10" />
                    </td>
                    <td>
                        <label id="lblCity" class="cssClassLabel sfLocale">
                            City:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtCity" name="City" class="required" minlength="2" maxlength="250" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblPhone" class="cssClassLabel sfLocale">
                            Phone:</label><span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtPhone" name="Phone" class="required number" minlength="7"
                            maxlength="20" />
                    </td>
                    <td>
                        <label id="lblMobile" class="cssClassLabel sfLocale">
                            Mobile:</label>
                    </td>
                    <td>
                        <input type="text" id="txtMobile" class="number" name="Mobile" minlength="10" maxlength="20" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblFax" class="cssClassLabel sfLocale">
                            Fax:</label>
                    </td>
                    <td>
                        <input type="text" id="txtFax" name="Fax" class="number" maxlength="20" />
                    </td>
                    <td>
                        <label id="lblWebsite" class="cssClassLabel sfLocale">
                            Website:</label>
                    </td>
                    <td>
                        <input type="text" id="txtWebsite" class="url" maxlength="50" />
                    </td>
                </tr>
                <tr id="trShippingAddress">
                    <td>
                        <input type="checkbox" id="chkShippingAddress" />
                    </td>
                    <td>
                        <label id="lblDefaultShipping" class="cssClassLabel sfLocale">
                            Use as Default Shipping Address</label>
                    </td>
                </tr>
                <tr id="trBillingAddress">
                    <td>
                        <input type="checkbox" id="chkBillingAddress" />
                    </td>
                    <td>
                        <label id="lblDefaultBilling" class="cssClassLabel sfLocale">
                            Use as Default Billing Address</label>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="sfButtonwrapper">
            <button type="submit" id="btnSubmitAddress" class="cssClassButtonSubmit">
                <span><span class="sfLocale">Save</span></span></button>
        </div>
    </div>
</div>
<div id="divLoadUserControl" class="cssClasMyAccountInformation">
    <div class="cssClassMyDashBoardInformation">
    </div>
</div>
<input type="hidden" id="hdnAddressID" />
<input type="hidden" id="hdnDefaultShippingExist" />
<input type="hidden" id="hdnDefaultBillingExist" />
