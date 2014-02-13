<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PlaceOrderGiftCard.ascx.cs"
    Inherits="PlaceOrderGiftCard" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGiftCard
        });
    });
    //<![CDATA[
    $(function() {
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName(),
                CustomerID: AspxCommerce.utils.GetCustomerID()
            };
            return aspxCommonInfo;
        };

        var AspxOrder = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: AspxCommerce.utils.GetAspxServicePath(),
                method: "",
                url: "",
                ajaxCallMode: 0, ///0 for get categories and bind, 1 for notification,2 for versions bind
                checkCartExist: false,
                sessionValue: "",
                error: 0
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: AspxOrder.config.type,
                    contentType: AspxOrder.config.contentType,
                    cache: AspxOrder.config.cache,
                    async: AspxOrder.config.async,
                    url: AspxOrder.config.url,
                    data: AspxOrder.config.data,
                    dataType: AspxOrder.config.dataType,
                    success: AspxOrder.ajaxSuccess,
                    error: AspxOrder.ajaxFailure
                });
            },
            CheckCustomerCartExist: function() {
                // var checkCartExist;
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CultureName = null;
                aspxCommonInfo.UserName = null;
                this.config.method = "AspxCommerceWebService.asmx/CheckCustomerCartExist",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo }),
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
                return AspxOrder.config.checkCartExist;
            },
            GiftCard: function() {
                var $ajaxCall = function(method, param, successFx, error) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        async: true,
                        url: aspxservicePath + 'AspxCommerceWebService.asmx/' + method,
                        data: param,
                        dataType: "json",
                        success: successFx,
                        error: error
                    });
                };
                var tempPayment;
                var addGiftCardInPayment = function(isTotalZero, restamount) {
                    if (isTotalZero) {
                        tempPayment = $("#dvPGList").clone();
                        $("#dvinfo").remove();
                        var gC = $("input[name=PGLIST][realname=GiftCard]").parents('label:eq(0)');
                        $("#dvPGList").find('label').not($("input[name=PGLIST][realname=GiftCard]").parents('label:eq(0)')).remove();
                        $("#dvPGList br").remove();
                        $("input[name=PGLIST][realname=GiftCard]").trigger('click');
                        var dvInfo = $("<div id=dvinfo>").html("<p>" + getLocale(AspxGiftCard, 'Gift Card has been applied to your cart') + "</p><p>" + getLocale(AspxGiftCard, 'your toal due amount') + ' ' + restamount + " .</p>");
                        $("#dvPaymentInfo").append(dvInfo);
                       $("#dvPaymentInfo").find('div.sfFormwrapper').hide();
                    } else {
                        //show info
                        ///restamount;
                        $("#dvinfo").remove();
                        $("#dvPaymentInfo").find('div.sfFormwrapper').show();
                        $("#btnPlaceOrderGiftCard").remove();
                        var dvInfo = $("<div id=dvinfo>").html("<p>" + getLocale(AspxGiftCard, 'Gift Card has been applied to your cart') + "</p><p>" + getLocale(AspxGiftCard, 'your total due amount') + restamount + " .</p><p>" + getLocale(AspxGiftCard, 'To checkout you can still apply giftcard or choose another payment option') + "</p>");
                        $("#dvPaymentInfo").append(dvInfo);
                    }
                };
                //need to check after click event of btnShippingMethodContinue
                //$("#dvPGList").html('')
                var recentlyUsedGiftCard = [];
                var cartTotal = 0;
                var applyGiftCard = function(veriftication) {                 
                    var showOtherPaymnetOption = false;
                    var $td = $("<td>");
                    var $content = $("<strong>").append("GiftCard (" + veriftication.GiftCardCode + ")");
                    var $span = $("<span>").addClass("cssClassDeleteGiftCard").attr('data-id', veriftication.GiftCardCode).append("<sup><a href='#'>x</a></sup>");
                    $span.bind("click", function() {
                        var code = $.trim($(this).attr('data-id'));
                        var tt = parseFloat($("#txtTotalCost").val().replace(/[^0-9\.]+/g, ""));
                        tt = tt + getReducedAmount(recentlyUsedGiftCard, code);
                        $("#txtTotalCost").val(tt);
                        CheckOut.UserCart.Total = tt;
                        deleteUsed(recentlyUsedGiftCard, code);
                        $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                        $(this).parents("tr:eq(0)").remove();
                        CheckOut.UserCart.GiftCardDetail = recentlyUsedGiftCard;
                        var param = JSON2.stringify({ key: "UsedGiftCard", value: recentlyUsedGiftCard });
                        $ajaxCall("SetSessionVariable", param, null, null);
                        csscody.info("<h2>" + getLocale(AspxGiftCard, 'Information Success') + "</h2><p>" + getLocale(AspxGiftCard, 'Gift Card removed successfully!') + "</p>");
                        //AspxCart.GetUserCartDetails();
                        // debugger 
                        $accor.accordion("activate", 4);
                        CheckOut.LoadPGatewayList();
                        $('#dvPGList input[name="PGLIST"]:first').trigger('click');
                        CheckOut.GiftCard.Init();


                    });
                    $td.append($content.append($span));
                    var $tdamount = $("<td>").append("<span class=\"cssClassNegative\">-</span>");
                    var total = cartTotal == 0 ? CheckOut.Vars.temptotal : cartTotal;
                    if (cartTotal == 0) {
                        cartTotal = total;
                    } else {
                        //cartTotaltemp = cartTotal;
                    }

                    var cardBalance = 0;
                    if (total >= veriftication.Balance) {
                        $tdamount.append("<input type='text' value=" + veriftication.Balance + " readonly='readonly' class='cssClassFormatCurrency ' /> ");
                        var restAmount = parseFloat(cartTotal - veriftication.Balance);
                        cardBalance = 0;
                        veriftication.ReducedAmount = veriftication.Balance;
                        cartTotal = restAmount;
                        $("#txtTotalCost").val(restAmount);
                        showOtherPaymnetOption = true;
                        addGiftCardInPayment(false, restAmount);
                    } else {
                        cardBalance = veriftication.Balance - cartTotal;
                        veriftication.ReducedAmount = cartTotal;
                        $tdamount.append("<input type='text' value=" + total + " readonly='readonly' class='cssClassFormatCurrency ' /> ");
                        $("#txtTotalCost").val(0);
                        cartTotal = 0;
                        showOtherPaymnetOption = false;
                        addGiftCardInPayment(true, 0);
                        // CheckOut.LoadControl("Modules/AspxCommerce/AspxGiftCardManagement/PlaceOrderGiftCard.ascx", "GiftCard");
                    }
                    //var param = JSON2.stringify({ key: "UsedGiftCard", value: recentlyUsedGiftCard });
                    // $ajaxCall("SetSessionVariable", param, null, null);
                    $("<tr>").addClass("cssClassGiftCard cssClassSubTotalAmount").append($td).append($tdamount).insertAfter($("#tblTotalInfo").find("tr:nth(2)"));
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });

                    // return showOtherPaymnetOption;
                    CheckOut.UserCart.GiftCardDetail = recentlyUsedGiftCard;
                    if (recentlyUsedGiftCard.length > 0) {
                        var param = JSON2.stringify({ key: "UsedGiftCard", value: recentlyUsedGiftCard });
                        $ajaxCall("SetSessionVariable", param, null, null);
                    }
                };
                var verify = function() {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.CultureName = null;
                    aspxCommonInfo.UserName = null;
                    aspxCommonInfo.CustomerID = null;
                    var veriftication = { IsVerified: false };
                    var param = JSON2.stringify({ giftcardCode: $.trim($("#txtGiftCardCode").val()), pinCode: $.trim($("#txtGiftCardPinCode").val()), aspxCommonObj: aspxCommonInfo });
                    $ajaxCall("VerifyGiftCard", param, function(data) {
                        if (data.d != null) {
                            if (data.d.IsVerified) {
                                veriftication.IsVerified = data.d.IsVerified;
                                veriftication.Price = data.d.Price;
                                veriftication.Balance = data.d.Balance;
                                veriftication.GiftCardCode = data.d.GiftCardCode;
                                veriftication.GiftCardId = data.d.GiftCardId;
                                recentlyUsedGiftCard.push(veriftication);
                                applyGiftCard(veriftication);
                                csscody.info("<h2>" + getLocale(AspxGiftCard, 'Information Success') + "</h2><p>" + getLocale(AspxGiftCard, 'Gift Card has been applied successfully!') + "</p>");
                                $("#txtGiftCardCode").val('');
                                $("#txtGiftCardPinCode").val('');
                            }
                        } else {
                            csscody.alert("<h2>" + getLocale(AspxGiftCard, 'Information Message') + "</h2><p>" + getLocale(AspxGiftCard, 'Invalid or Expired giftcard code!') + "</p>");
                        }
                    }, null);
                    return veriftication;
                };
                var checkUsed = function(arr, code) {
                    var isExist = false;
                    if (arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].GiftCardCode == code) {
                                isExist = true;
                                break;
                            }
                        }
                    }
                    return isExist;
                };
                var deleteUsed = function(arr, code) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].GiftCardCode == code) {
                            arr.splice(i, 1);
                            break;
                        }
                    }

                };

                var getReducedAmount = function(arr, code) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].GiftCardCode == code) {
                            return arr[i].ReducedAmount;
                            break;
                        }
                    }
                    return 0;
                };
                var init = function() {

                    var isValidForm = $("#form1").validate({
                        messages: {
                            giftcardpincode: {
                                required: '*'
                            },
                            giftcardcode: {
                                required: '*'
                            }
                        },
                        rules:
                            {
                                giftcardpincode: { required: true, number: true },
                                giftcardcode: { required: true }
                            },
                        ignore: ":hidden"
                    });
                    recentlyUsedGiftCard = CheckOut.GiftCard.GiftCardList();
                    $("#btnAppplyGiftCard").unbind('click').bind("click", function() {

                        var code = $.trim($("#txtGiftCardCode").val());
                        var pin = $.trim($("#txtGiftCardPinCode").val());
                        if (code != "" && pin != "") {
                            if (isValidForm.form()) {
                                if (!checkUsed(recentlyUsedGiftCard, code)) {
                                    verify();
                                } else {
                                    csscody.alert("<h2>" + getLocale(AspxGiftCard, 'Information Message') + "</h2><p>" + getLocale(AspxGiftCard, 'Invalid or Expired giftcard code!') + "</p>");
                                }
                            }
                        } else {
                            csscody.alert("<h2>" + getLocale(AspxGiftCard, 'Information Message') + "</h2><p>" + getLocale(AspxGiftCard, 'Please enter required field!') + "</p>");
                        }
                    });


                    $("#btnCheckBalance").unbind('click').bind("click", function() {
                        window.open(aspxRedirectPath + "Balance-Inquiry" + pageExtension);
                    });


                };
                var clearGiftCard = function() {
                    var param = JSON2.stringify({ key: "UsedGiftCard", value: [] });
                    $ajaxCall("SetSessionVariable", param, null, null);
                };

                return {
                    Init: init
                };

            } (),
            init: function() {

                $('#btnPlaceOrderGiftCard').click(function () {
                    if (CheckOut.UserCart.IsGiftCardUsed) {
                        if (!CheckOut.GiftCard.CheckGiftCardIsUsed()) {
                            CheckOut.GiftCard.ResetGiftCard();
                            SageFrame.messaging.show("Applied Gift Card has insufficient balance.Please veriry once again!", "Alert");
                            return false;
                        }
                    }
                    var aspxCommonInfo = aspxCommonObj();
                    if (aspxCommonInfo.CustomerID != 0 && aspxCommonInfo.UserName != 'anonymoususer') {
                        var checkIfCartExist = AspxOrder.CheckCustomerCartExist();
                        if (!checkIfCartExist) {
                            csscody.alert("<h2>" + getLocale(AspxGiftCard, 'Information Alert') + "</h2><p>" + getLocale(AspxGiftCard, 'Your cart has been emptied already!!') + "</p>");
                            return false;
                        }
                    }
                    CheckOut.UserCart.TotalDiscount = eval(parseFloat(CheckOut.UserCart.TotalDiscount) + parseFloat(CheckOut.UserCart.CartDiscount));
                    if ($('#SingleCheckOut').length > 0) {

                        AspxOrder.AddOrderDetailsTest();
                    } else {
                        AspxOrder.SendDataForPaymentTestMulti();
                    }
                });
                AspxOrder.GiftCard.Init();
            },
            ajaxSuccess: function(data) {
                switch (AspxOrder.config.ajaxCallMode) {
                    case 0:
                        break;
                    case 1:
                        AspxOrder.config.checkCartExist = data.d;

                        break;
                    case 2:
                        AspxOrder.config.sessionValue = parseFloat(data.d);
                        break;
                    case 3:
                        document.location = AspxCommerce.utils.GetAspxRedirectPath() + "Gift-Card-Success" + pageExtension;
                        break;
                    case 4:
                        document.location = AspxCommerce.utils.GetAspxRedirectPath() + "Gift-Card-Success" + pageExtension;
                        break;
                }
            },
            ajaxFailure: function() {
                switch (AspxOrder.config.error) {
                    case 3:
                        break;
                    case 4:
                        break;
                }
            },

            getSession: function(Key) {
                this.config.method = "AspxCommerceWebService.asmx/GetSessionVariableCart";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ key: Key });
                this.config.ajaxCallMode = 2;
                this.ajaxCall(this.config);
                return AspxOrder.config.sessionValue;
            },
            SendDataForPaymentTestMulti: function() {
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

                var paymentMethodName = "Gift Card";
                var paymentMethodCode = "Gift Card";
                var isBillingAsShipping = false;


                if ($('#chkBillingAsShipping').attr('checked'))
                    CheckOut.BillingAddress.IsBillingAsShipping = true;
                else
                    CheckOut.BillingAddress.IsBillingAsShipping = false;

                var orderRemarks = $("#txtAdditionalNote").val();
                var currencyCode = "USD";
                var isTestRequest = "TRUE";
                var isEmailCustomer = "TRUE";
                var discountAmount = "";
                var taxTotal = AspxOrder.getSession("TaxAll"); //'<%=Session["TaxAll"] %>'; // $.cookies.get('Tax');
                var paymentGatewayID = AspxOrder.getSession("Gateway"); // '<%=Session["Gateway"] %>'; //$.cookies.get('Gateway');
                var paymentGatewaySubTypeID = 1;
                var amount = AspxOrder.getSession("GrandTotalAll"); //'<%=Session["GrandTotalAll"] %>';
                var OrderDetails = {
                    BillingAddressInfo: CheckOut.BillingAddress,
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
                        DiscountAmount: CheckOut.UserCart.TotalDiscount,
                        CouponDiscountAmount: CheckOut.UserCart.CouponDiscountAmount,
                        CouponCode: CheckOut.UserCart.couponCode,
                        PurchaseOrderNumber: 0,
                        PaymentGatewayTypeID: paymentGatewayID,
                        PaymentGateSubTypeID: paymentGatewaySubTypeID,
                        ClientIPAddress: clientIPAddress,
                        UserBillingAddressID: $('.cssClassBillingAddressInfo span').attr('id'),
                        ShippingMethodID: CheckOut.UserCart.spMethodID,
                        PaymentMethodID: 0,
                        TaxTotal: taxTotal,
                        CurrencyCode: currencyCode,
                        CustomerID: AspxCommerce.utils.GetCustomerID(),
                        ResponseCode: 0,
                        ResponseReasonCode: 0,
                        ResponseReasonText: "",
                        Remarks: orderRemarks,
                        IsMultipleCheckOut: true,
                        IsTest: isTestRequest,
                        IsEmailCustomer: isEmailCustomer,
                        IsDownloadable: CheckOut.UserCart.IsDownloadItemInCart
                    },
                    CommonInfo: {
                        PortalID: AspxCommerce.utils.GetPortalID(),
                        StoreID: AspxCommerce.utils.GetStoreID(),
                        CultureName: AspxCommerce.utils.GetCultureName(),
                        AddedBy: AspxCommerce.utils.GetUserName(),
                        IsActive: CheckOut.UserCart.isActive
                    }
                };
                var paramData = {
                    OrderDetailsCollection: {
                        ObjOrderDetails: OrderDetails.OrderDetailsInfo,
                        LstOrderItemsInfo: CheckOut.UserCart.lstItems,
                        ObjPaymentInfo: OrderDetails.PaymentInfo,
                        GiftCardDetail: CheckOut.UserCart.GiftCardDetail,
                        ObjBillingAddressInfo: OrderDetails.BillingAddressInfo,
                        ObjShippingAddressInfo: OrderDetails.objSPAddressInfo,
                        ObjCommonInfo: OrderDetails.CommonInfo,
                        ObjOrderTaxInfo: CheckOut.UserCart.objTaxList
                    }
                };
                this.config.method = "AspxCommerceWebService.asmx/SaveOrderDetails",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ "orderDetail": paramData.OrderDetailsCollection }),
                this.config.ajaxCallMode = 3;
                this.config.error = 3;
                this.ajaxCall(this.config);
            },
            AddOrderDetailsTest: function() {
                if ($('#txtFirstName').val() == '') {
                    var billingAddress = $('#dvBillingSelect option:selected').text();
                    var addr = billingAddress.split(',');
                    var Name = addr[0].split(' ');
                    Array.prototype.clean = function(deleteValue) {
                        for (var i = 0; i < this.length; i++) {
                            if (this[i] == deleteValue) {
                                this.splice(i, 1);
                                i--;
                            }
                        }
                        return this;
                    };
                    Name.clean("");

                    if ($('#dvBillingSelect option:selected').val() > 0)
                        CheckOut.BillingAddress.AddressID = $('#dvBillingSelect option:selected').val();

                    CheckOut.BillingAddress.FirstName = Name[0];
                    CheckOut.BillingAddress.LastName = Name[1];
                    CheckOut.BillingAddress.CompanyName = addr[8];
                    CheckOut.BillingAddress.EmailAddress = addr[6];
                    CheckOut.BillingAddress.Address = addr[1];
                    CheckOut.BillingAddress.Address2 = addr[11];
                    CheckOut.BillingAddress.City = addr[2];
                    CheckOut.BillingAddress.State = addr[3];
                    CheckOut.BillingAddress.Zip = addr[5];
                    CheckOut.BillingAddress.Country = addr[4];
                    CheckOut.BillingAddress.Phone = addr[7];
                    CheckOut.BillingAddress.Mobile = addr[8];
                    CheckOut.BillingAddress.Fax = addr[9];
                    CheckOut.BillingAddress.WebSite = addr[10];
                } else {
                    CheckOut.BillingAddress.FirstName = $('#txtFirstName').val();
                    CheckOut.BillingAddress.LastName = $('#txtLastName').val();
                    CheckOut.BillingAddress.CompanyName = $('#txtCompanyName').val();
                    CheckOut.BillingAddress.EmailAddress = $('#txtEmailAddress').val();
                    CheckOut.BillingAddress.Address = $('#txtAddress1').val();
                    CheckOut.BillingAddress.Address2 = $('#txtAddress2').val();
                    CheckOut.BillingAddress.City = $('#txtCity').val();
                    CheckOut.BillingAddress.Country = $('#ddlBLCountry option:selected').text();
                    if (CheckOut.BillingAddress.Country == 'United States')
                        CheckOut.BillingAddress.State = $('#ddlBLState option:selected').text();
                    else
                        CheckOut.BillingAddress.State = $('#txtState').val();
                    CheckOut.BillingAddress.Zip = $('#txtZip').val();
                    CheckOut.BillingAddress.Phone = $('#txtPhone').val();
                    CheckOut.BillingAddress.Mobile = $('#txtMobile').val();
                    CheckOut.BillingAddress.Fax = $('#txtFax').val();
                    CheckOut.BillingAddress.Website = $('#txtWebsite').val();
                    CheckOut.BillingAddress.IsDefaultBilling = false;

                }

                if ($('#txtSPFirstName').val() == '') {
                    var address = $('#dvShippingSelect option:selected').text();
                    //" test test, Imadol, asdfasf, HH, Andorra, 235234, budiestpunk@gmail.com, 123434343434"
                    var addr = address.split(',');
                    var Name = addr[0].split(' ');
                    var address = $('#dvShippingSelect option:selected').text();
                    var addr = address.split(',');
                    var Name = addr[0].split(' ');
                    Array.prototype.clean = function(deleteValue) {
                        for (var i = 0; i < this.length; i++) {
                            if (this[i] == deleteValue) {
                                this.splice(i, 1);
                                i--;
                            }
                        }
                        return this;
                    };
                    Name.clean("");
                    CheckOut.ShippingAddress.AddressID = CheckOut.UserCart.spAddressID;
                    CheckOut.ShippingAddress.FirstName = Name[0];
                    CheckOut.ShippingAddress.LastName = Name[1];
                    CheckOut.ShippingAddress.CompanyName = addr[12];
                    CheckOut.ShippingAddress.EmailAddress = addr[6];
                    CheckOut.ShippingAddress.Address = addr[1];
                    CheckOut.ShippingAddress.Address2 = addr[11];
                    CheckOut.ShippingAddress.City = addr[2];
                    CheckOut.ShippingAddress.State = addr[3];
                    CheckOut.ShippingAddress.Zip = addr[5];
                    CheckOut.ShippingAddress.Country = addr[4];
                    CheckOut.ShippingAddress.Phone = addr[7];
                    CheckOut.ShippingAddress.Mobile = addr[8];
                    CheckOut.ShippingAddress.Fax = addr[9];
                    CheckOut.ShippingAddress.Website = addr[10];
                } else {
                    CheckOut.ShippingAddress.FirstName = $('#txtSPFirstName').val();
                    CheckOut.ShippingAddress.LastName = $('#txtSPLastName').val();
                    CheckOut.ShippingAddress.CompanyName = $('#txtSPCompany').val();
                    CheckOut.ShippingAddress.Address = $('#txtSPAddress').val();
                    CheckOut.ShippingAddress.Address2 = $('#txtSPAddress2').val();
                    CheckOut.ShippingAddress.City = $('#txtSPCity').val();
                    CheckOut.ShippingAddress.Zip = $('#txtSPZip').val();
                    CheckOut.ShippingAddress.Country = $('#ddlSPCountry option:selected').text();
                    if ($.trim(CheckOut.ShippingAddress.Country) == 'United States') {
                        CheckOut.ShippingAddress.State = $('#ddlSPState').val();
                    } else {
                        CheckOut.ShippingAddress.State = $('#txtSPState').val();
                    }
                    CheckOut.ShippingAddress.Phone = $('#txtSPPhone').val();
                    CheckOut.ShippingAddress.Mobile = $('#txtSPMobile').val();
                    CheckOut.ShippingAddress.Fax = '';
                    CheckOut.ShippingAddress.Email = $('#txtSPEmailAddress').val();
                    CheckOut.ShippingAddress.Website = '';
                    CheckOut.ShippingAddress.IsDefaultShipping = false;
                }

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

                if ($('#chkBillingAsShipping').attr('checked'))
                    CheckOut.BillingAddress.IsBillingAsShipping = true;
                else
                    CheckOut.BillingAddress.IsBillingAsShipping = false;


                var orderRemarks = $("#txtAdditionalNote").val();
                var orderItemRemarks = "Order Item Remarks";
                var currencyCode = "USD";
                var isTestRequest = "TRUE";
                var isEmailCustomer = "TRUE";
                var taxTotal = AspxOrder.getSession("TaxAll");
                var paymentGatewayID = AspxOrder.getSession("Gateway");
                var paymentGatewaySubTypeID = 1;
                var shippingMethodID = CheckOut.UserCart.spMethodID;
                var paymentMethodCode = "Gift Card";
                var paymentMethodName = "Gift Card";

                shippingRate = AspxOrder.getSession("ShippingCostAll");
                var amount = AspxOrder.getSession("GrandTotalAll");

                var OrderDetails = {
                    BillingAddressInfo: CheckOut.BillingAddress,
                    objSPAddressInfo: CheckOut.ShippingAddress,
                    PaymentInfo: {
                        PaymentMethodName: paymentMethodName,
                        PaymentMethodCode: paymentMethodCode,
                        CardNumber: "",
                        TransactionType: creditCardTransactionType,
                        CardType: "",
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
                        SessionCode: AspxCommerce.utils.GetSessionCode(),
                        InvoiceNumber: "",
                        TransactionID: 0,
                        GrandTotal: amount,
                        DiscountAmount: CheckOut.UserCart.TotalDiscount,
                        CouponDiscountAmount: CheckOut.UserCart.CouponDiscountAmount,
                        CouponCode: CheckOut.UserCart.couponCode,
                        PurchaseOrderNumber: 0,
                        PaymentGatewayTypeID: paymentGatewayID,
                        PaymentGateSubTypeID: paymentGatewaySubTypeID,
                        ClientIPAddress: AspxCommerce.utils.GetClientIP(),
                        UserBillingAddressID: CheckOut.BillingAddress.AddressID,
                        ShippingMethodID: shippingMethodID,
                        IsGuestUser: CheckOut.UserCart.isUserGuest,
                        PaymentMethodID: 0,
                        TaxTotal: taxTotal,
                        CurrencyCode: currencyCode,
                        CustomerID: AspxCommerce.utils.GetCustomerID(),
                        ResponseCode: 0,
                        ResponseReasonCode: 0,
                        ResponseReasonText: "",
                        Remarks: orderRemarks,
                        IsMultipleCheckOut: false,
                        IsTest: isTestRequest,
                        IsEmailCustomer: isEmailCustomer,
                        IsDownloadable: CheckOut.UserCart.IsDownloadItemInCart
                    },
                    CommonInfo: {
                        PortalID: AspxCommerce.utils.GetPortalID(),
                        StoreID: AspxCommerce.utils.GetStoreID(),
                        CultureName: AspxCommerce.utils.GetCultureName(),
                        AddedBy: AspxCommerce.utils.GetUserName(),
                        IsActive: CheckOut.UserCart.isActive
                    }
                };

                var paramData = {
                    OrderDetailsCollection: {
                        ObjOrderDetails: OrderDetails.OrderDetailsInfo,
                        LstOrderItemsInfo: CheckOut.UserCart.lstItems,
                        ObjPaymentInfo: OrderDetails.PaymentInfo,
                        GiftCardDetail: CheckOut.UserCart.GiftCardDetail,
                        ObjBillingAddressInfo: OrderDetails.BillingAddressInfo,
                        ObjShippingAddressInfo: OrderDetails.objSPAddressInfo,
                        ObjCommonInfo: OrderDetails.CommonInfo,
                        ObjOrderTaxInfo: CheckOut.UserCart.objTaxList
                    }
                };
                this.config.method = "AspxCommerceWebService.asmx/SaveOrderDetails",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ "orderDetail": paramData.OrderDetailsCollection });
                this.config.ajaxCallMode = 4;
                this.config.error = 4;
                this.ajaxCall(this.config);
            }
        };
        AspxOrder.init();
    });
//]]>
</script>

<div class="sfFormwrapper">
    <table class="sfGiftWrapperTable" cellpadding="0" width="100%" cellspacing="0">
        <tr>
            <td>
                <asp:Label runat="server" ID="lblGiftCardCode" Text="Gift Card Code:" 
                    meta:resourcekey="lblGiftCardCodeResource1"></asp:Label>
            </td>
            <td>
                <input type="text" id="txtGiftCardCode" name="giftcardcode" />
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label runat="server" ID="Label1" Text="Pin Code:" 
                    meta:resourcekey="Label1Resource1"></asp:Label>
            </td>
            <td>
                <input  type="password"  id="txtGiftCardPinCode" name="giftcardpincode" />
            </td>
        </tr>
    </table>
    <div class="sfButtonwrapper">
            <button type="button" id="btnCheckBalance">
                <span><span class="sfLocale">Check GiftCard Balance</span></span></button>

            <button type="button" id="btnAppplyGiftCard">
                <span><span class="sfLocale">Apply GiftCard</span></span></button>
    </div>
  
</div>

<input id="btnPlaceOrderGiftCard"  type="button" value="Place Order (Gift Card)" />
