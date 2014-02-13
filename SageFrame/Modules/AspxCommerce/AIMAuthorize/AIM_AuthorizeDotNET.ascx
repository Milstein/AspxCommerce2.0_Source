<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AIM_AuthorizeDotNET.ascx.cs"
    Inherits="Modules_AspxPaymentGateway_AuthorizeDotNET" %>

<script type="text/javascript">
    //<![CDATA[

    $(function() {

        $(".sfLocale").localize({
            moduleKey: AIMAuthorize
        });
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
                pgID: '<%=Session["Gateway"] %>', //
                addressPath: '<%=AddressPath %>',
                templateName: AspxCommerce.utils.GetTemplateName(),
                loadonce: 1,
                error: 0
            },
            AIMSetting: {
                version: "",
                deleimData: "",
                apiLogin: "",
                transactionKey: "",
                relayResponse: "",
                delemChar: "",
                encapChar: "",
                isTestRequest: "" //from setting
            },
            ajaxFailure: function() {
                switch (AspxOrder.config.error) {
                    case 3:
                        csscody.error("<h2>" + getLocale(AIMAuthorize, "Error Message") + "</h2><p>" + getLocale(AIMAuthorize, "Failed to connect with server!") + "</p>");
                        break;
                    case 4:
                        csscody.error("<h2>" + getLocale(AIMAuthorize, "Error Message") + "</h2><p>" + getLocale(AIMAuthorize, "Failed to connect with server!") + "</p>");
                        break;
                }
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
            CheckCreditCard: function() {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CustomerID = null;
                aspxCommonInfo.UserName = null;
                this.config.method = "AspxCommerceWebService.asmx/CheckCreditCard";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo, creditCardNo: $('#txtCardNo').val() });
                this.config.ajaxCallMode = 9;
                this.ajaxCall(AspxOrder.config);
            },
            SetSessionValue: function(sessionKey, sessionValue) {
                this.config.method = "AspxCommerceWebService.asmx/SetSessionVariable";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue }),
                this.config.ajaxCallMode = 5;
                this.ajaxCall(this.config);
            },
            getSession: function(Key) {
                this.config.method = "AspxCommerceWebService.asmx/GetSessionVariableCart",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ key: Key });
                this.config.ajaxCallMode = 2;
                this.ajaxCall(this.config);
                return AspxOrder.config.sessionValue;
            },
            GetCardType: function() {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CustomerID = null;
                aspxCommonInfo.UserName = null;
                this.config.method = "Services/AIMWebService.asmx/GetCardType",
                this.config.url = '<%=AIMPath %>' + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = 6;
                this.ajaxCall(this.config);

            },
            GetTransactionType: function() {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CustomerID = null;
                aspxCommonInfo.UserName = null;
                this.config.method = "Services/AIMWebService.asmx/GetTransactionType",
                this.config.url = '<%=AIMPath %>' + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = 7;
                this.ajaxCall(this.config);
            },
            SendDataForPayment: function() {
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
                var creditCardTransactionType = "AUTH_CAPTURE"; //$('#ddlTransactionType option:selected').text();
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

                if ($('#chkBillingAsShipping').is(":checked"))
                    CheckOut.BillingAddress.isBillingAsShipping = true;
                else
                    CheckOut.BillingAddress.isBillingAsShipping = false;


                var orderRemarks = $("#txtAdditionalNote").val();
                var orderItemRemarks = "Order Item Remarks";
                var currencyCode = '<%=MainCurrency %>';
                // var isTestRequest = "False";
                var isEmailCustomer = "TRUE";
                var paymentGatewaySubTypeID = 1;
                //  var shippingMethodID = 1;
                var taxTotal = AspxOrder.getSession("TaxAll");
                var paymentGatewayID = AspxOrder.getSession("Gateway");
                shippingRate = AspxOrder.getSession("ShippingCostAll");
                var amount = AspxOrder.getSession("GrandTotalAll");

                var OrderDetails = {
                    BillingAddressInfo: CheckOut.BillingAddress,
                    objSPAddressInfo: CheckOut.ShippingAddress,
                    PaymentInfo: {
                        PaymentMethodName: CheckOut.UserCart.paymentMethodName,
                        PaymentMethodCode: CheckOut.UserCart.paymentMethodCode,
                        CardNumber: cardNo,
                        TransactionType: creditCardTransactionType,
                        CardType: CardType,
                        CardCode: cardCode,
                        ExpireDate: expireDate,
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
                        CustomerID: AspxCommerce.utils.GetCustomerID(),
                        InvoiceNumber: "",
                        OrderStatus: "",
                        TransactionID: 0,
                        GrandTotal: amount,
                        DiscountAmount: CheckOut.UserCart.TotalDiscount,
                        CouponDiscountAmount: CheckOut.UserCart.CouponDiscountAmount,
                        CouponCode: CheckOut.UserCart.couponCode,
                        UsedRewardPoints: CheckOut.UserCart.UsedRewardPoints,
                        RewardDiscountAmount: CheckOut.UserCart.RewardPointsDiscount,
                        PurchaseOrderNumber: 0,
                        PaymentGatewayTypeID: paymentGatewayID,
                        PaymentGateSubTypeID: paymentGatewaySubTypeID,
                        ClientIPAddress: AspxCommerce.utils.GetClientIP(),
                        UserBillingAddressID: CheckOut.BillingAddress.AddressID,
                        ShippingMethodID: CheckOut.UserCart.spMethodID,
                        PaymentMethodID: 0,
                        TaxTotal: taxTotal,
                        CurrencyCode: currencyCode,
                        ResponseCode: 0,
                        ResponseReasonCode: 0,
                        IsGuestUser: CheckOut.UserCart.isUserGuest,
                        ResponseReasonText: "",
                        Remarks: orderRemarks,
                        IsMultipleCheckOut: false,
                        Version: AspxOrder.AIMSetting.version,
                        DelimData: AspxOrder.AIMSetting.deleimData,
                        APILogin: AspxOrder.AIMSetting.apiLogin,
                        TransactionKey: AspxOrder.AIMSetting.transactionKey,
                        RelayResponse: AspxOrder.AIMSetting.relayResponse,
                        DelimChar: AspxOrder.AIMSetting.delemChar,
                        EncapeChar: AspxOrder.AIMSetting.encapChar,
                        IsTest: AspxOrder.AIMSetting.isTestRequest,
                        IsEmailCustomer: isEmailCustomer,
                        IsDownloadable: CheckOut.UserCart.IsDownloadItemInCart,
                        IsShippingAddressRequired: CheckOut.UserCart.NoShippingAddress
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
                        ObjBillingAddressInfo: OrderDetails.BillingAddressInfo,
                        ObjShippingAddressInfo: OrderDetails.objSPAddressInfo,
                        ObjCommonInfo: OrderDetails.CommonInfo,
                        ObjOrderTaxInfo: CheckOut.UserCart.objTaxList
                    }
                };
                this.config.method = "Services/AIMWebService.asmx/SendPaymentInfoAIM";
                this.config.url = '<%=AIMPath %>' + this.config.method;
                this.config.data = JSON2.stringify({ "OrderDetail": paramData.OrderDetailsCollection, TemplateName: this.config.templateName, addressPath: this.config.addressPath });
                this.config.ajaxCallMode = 3;
                this.config.error = 3;
                this.ajaxCall(this.config);
            },
            loadSettingAIM: function() {
            var aspxCommonInfo = aspxCommonObj();
                this.config.method = "Services/AIMWebService.asmx/GetAllAuthorizedNetAIMSetting";
                this.config.url = '<%=AIMPath %>' + this.config.method;
                this.config.data = JSON2.stringify({ paymentGatewayID: this.config.pgID, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = 8;
                this.ajaxCall(this.config);
            },
            init: function() {
                // GetTransactionType(); 
                AspxOrder.GetCardType();
                CheckOut.UserCart.paymentMethodCode = "ECHECK";
                CheckOut.UserCart.paymentMethodName = "Cheque";
                $('#lblAuthCode').hide();
                $('#txtAuthCode').hide();
                $('#rdbCheck').attr("checked", true);
                $('#creditCard').hide();
                $('#rdbCreditCard').live("click", function() {
                    CheckOut.UserCart.paymentMethodCode = "CC";
                    CheckOut.UserCart.paymentMethodName = "Credit Card";
                    $('#dvCheque').hide();
                    $('#creditCard').show();
                });

                $('#rdbCheck').live("click", function() {
                    CheckOut.UserCart.paymentMethodCode = "ECHECK";
                    CheckOut.UserCart.paymentMethodName = "Cheque";
                    $('#creditCard').hide();
                    $('#dvCheque').show();
                });
                $('#ddlTransactionType').bind("change", function() {
                    if ($('#ddlTransactionType option:selected').text() == " CAPTURE_ONLY") {
                        $('#lblAuthCode').show();
                        $('#txtAuthCode').show();
                    } else {
                        $('#lblAuthCode').hide();
                        $('#txtAuthCode').hide();
                    }
                });

                $('#ibtnAIM').live("click", function () {
                    if (CheckOut.UserCart.IsGiftCardUsed) {
                        if (!CheckOut.GiftCard.CheckGiftCardIsUsed()) {
                            CheckOut.GiftCard.ResetGiftCard();
                            SageFrame.messaging.show("Applied Gift Card has insufficient balance.Please veriry once again!", "Alert");
                            return false;
                        }
                    }
                    if (AspxCommerce.utils.GetCustomerID() != 0 && AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                        var checkIfCartExist = AspxOrder.CheckCustomerCartExist();
                        if (!checkIfCartExist) {
                            csscody.alert("<h2>" + getLocale(AIMAuthorize, "Information Alert") + "</h2><p>" + getLocale(AIMAuthorize, "Your cart has been emptied already!!") + "</p>");


                            return false;
                        }
                    }

                    CheckOut.UserCart.TotalDiscount = eval(parseFloat(CheckOut.UserCart.TotalDiscount) + parseFloat(CheckOut.UserCart.CartDiscount));
                    AspxOrder.loadSettingAIM();
                });

                $("#ccv").hide();
                $(".screenshot").bind("click", function() {
                    $("#ccv").show();
                    $("#ccv img").attr('src', aspxRootPath + 'Templates/AspxCommerce/images/cc_ccv.jpg');
                    $("#ccv img").attr('alt',getLocale(AIMAuthorize, "credit card verification code"));
                    $("#ccv  p").html('').html(getLocale(AIMAuthorize, 'The card code is a three- or four- digit security code that is printed on the back of cards. The number typically appears at the end of the signature panel.'));

                });
                $("#txtCardCode").bind("focusin", function() { $("#ccv").hide(); });

                $('#txtCardNo').bind("change", function() {
                    AspxOrder.CheckCreditCard();
                });
            },
            SendDataForPaymentForMulti: function() {
                //credit card info
                var creditCardTransactionType = "AUTH_CAPTURE"; //$('#ddlTransactionType option:selected').text();
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

                //  var paymentMethodName = "Credit Card";
                //  var paymentMethodCode = "CC";
                var isBillingAsShipping = false;


                if ($('#rdbCreditCard').is('selected')) {
                    CheckOut.UserCart.paymentMethodCode = "CC";
                    CheckOut.UserCart.paymentMethodName = "Credit Card";
                }

                if ($('#rdbCheque').is('selected')) {
                    CheckOut.UserCart.paymentMethodCode = "ECHECK";
                    CheckOut.UserCart.paymentMethodName = "Cheque";
                }

                if ($('#chkBillingAsShipping').is(":checked"))
                    CheckOut.BillingAddress.isBillingAsShipping = true;
                else
                    CheckOut.BillingAddress.isBillingAsShipping = false;

                var orderRemarks = $("#txtAdditionalNote").val();
                var currencyCode = '<%=MainCurrency %>';

                var isEmailCustomer = "TRUE";
                var discountAmount = "";
                var paymentGatewaySubTypeID = 1;
                var taxTotal = AspxOrder.getSession("TaxAll");
                var paymentGatewayID = AspxOrder.getSession("Gateway");
                shippingRate = AspxOrder.getSession("ShippingCostAll");
                var amount = AspxOrder.getSession("GrandTotalAll"); //'<%=Session["GrandTotalAll"] %>';              
                var OrderDetails = {
                    BillingAddressInfo: CheckOut.BillingAddress,

                    PaymentInfo: {
                        PaymentMethodName: CheckOut.UserCart.paymentMethodName,
                        PaymentMethodCode: CheckOut.UserCart.paymentMethodCode,
                        CardNumber: cardNo,
                        TransactionType: creditCardTransactionType,
                        CardType: CardType,
                        CardCode: cardCode,
                        ExpireDate: expireDate,
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
                        OrderStatus: "",
                        TransactionID: 0,
                        GrandTotal: amount,
                        DiscountAmount: CheckOut.UserCart.TotalDiscount,
                        CouponDiscountAmount: CheckOut.UserCart.CouponDiscountAmount,
                        CouponCode: CheckOut.UserCart.couponCode,
                        UsedRewardPoints: CheckOut.UserCart.UsedRewardPoints,
                        RewardDiscountAmount: CheckOut.UserCart.RewardPointsDiscount,
                        PurchaseOrderNumber: 0,
                        PaymentGatewayTypeID: paymentGatewayID,
                        PaymentGateSubTypeID: paymentGatewaySubTypeID,
                        ClientIPAddress: AspxCommerce.utils.GetClientIP(),
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
                        Version: AspxOrder.AIMSetting.version,
                        DelimData: AspxOrder.AIMSetting.deleimData,
                        APILogin: AspxOrder.AIMSetting.apiLogin,
                        TransactionKey: AspxOrder.AIMSetting.transactionKey,
                        RelayResponse: AspxOrder.AIMSetting.relayResponse,
                        DelimChar: AspxOrder.AIMSetting.delemChar,
                        EncapeChar: AspxOrder.AIMSetting.encapChar,
                        IsTest: AspxOrder.AIMSetting.isTestRequest,
                        IsEmailCustomer: isEmailCustomer,
                        IsDownloadable: CheckOut.UserCart.IsDownloadItemInCart,
                        IsShippingAddressRequired: CheckOut.UserCart.NoShippingAddress
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
                        ObjBillingAddressInfo: OrderDetails.BillingAddressInfo,
                        ObjCommonInfo: OrderDetails.CommonInfo,
                        ObjOrderTaxInfo: CheckOut.UserCart.objTaxList
                    }
                };

                this.config.method = "Services/AIMWebService.asmx/SendPaymentInfoAIM";
                this.config.url = '<%=AIMPath %>' + this.config.method;
                this.config.data = JSON2.stringify({ "OrderDetail": paramData.OrderDetailsCollection, TemplateName: this.config.templateName, addressPath: this.config.addressPath });
                this.config.ajaxCallMode = 4;
                this.config.error = 4;
                this.ajaxCall(this.config);
            },
            ajaxSuccess: function(data) {
                switch (AspxOrder.config.ajaxCallMode) {
                    case 0:
                        break;
                    case 1:
                        AspxOrder.config.checkCartExist = data.d;
                        break;
                    case 2:
                        //get session variable                       
                        AspxOrder.config.sessionValue = parseFloat(data.d);
                        break;
                    case 3:
                        if (data.d == "Transaction completed successfully.") {
                            csscody.alert("<h2>" + getLocale(AIMAuthorize, "Information Alert") + "</h2><p>" + data.d + "!!</p>");

                            var homepath = "";
                            if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                                homepath = "AIM-Success" + pageExtension;
                            } else {
                                homepath = "AIM-Success";
                            }

                            var route = AspxCommerce.utils.GetAspxRedirectPath() + homepath;
                            window.location.href = route;
                        } else {
                            csscody.alert("<h2>" + getLocale(AIMAuthorize, "Information Alert") + "</h2><p>" + getLocale(AIMAuthorize, "Error occured:") + data.d + "!!</p>");
                        }
                        return true;
                        break;
                    case 4:
                        csscody.alert("<h2>" + getLocale(AIMAuthorize, "Information Alert") + "</h2><p>" + data.d + "!!</p>");
                        if (data.d == "Transaction completed successfully.") {
                            var $tab = $('#dvMultipleAddress').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
                            $tab.tabs('select', 4);
                            var home = '';
                            if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                                home = "home" + pageExtension;
                            } else {
                                home = "home";
                            }
                            $("#orderSuccess").find('a').attr('href', '').attr('href', aspxRedirectPath + home);
                            var successpath = '';
                            if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                                successpath = "AIM-Success" + pageExtension;
                            } else {
                                successpath = "AIM-Success";
                            }

                            var route = AspxCommerce.utils.GetAspxRedirectPath() + successpath;
                            window.location.href = route;
                        } else {
                            //$tab.tabs('select', 4);
                        }
                        //$tab.tabs('select', 4);
                        return true;
                        break;
                    case 6:
                        if (data.d.length > 0) {
                            $('#cardType').html('');
                            $.each(data.d, function(index, item) {
                                var option = '';
                                option += "<option title=" + aspxRootPath + item.ImagePath + " > " + item.cardTypeName + "</option>";
                                $('#cardType').append(option);
                            });
                        }
                        break;
                    case 7:
                        if (data.d.length > 0) {
                            $('#ddlTransactionType').html('');
                            $.each(data.d, function(index, item) {
                                var option = '';
                                option += "<option> " + item.transactionTypeName + "</option>";
                                $('#ddlTransactionType').append(option);
                            });
                        }
                        break;
                    case 8:
                        if (data.d.length > 0) {
                            $.each(data.d, function(index, item) {
                                AspxOrder.AIMSetting.version = item.Version;
                                AspxOrder.AIMSetting.deleimData = item.DelimData;
                                AspxOrder.AIMSetting.apiLogin = item.APILoginID;
                                AspxOrder.AIMSetting.transactionKey = item.TransactionKey;
                                AspxOrder.AIMSetting.relayResponse = item.RelayResponse;
                                AspxOrder.AIMSetting.delemChar = item.DelimChar;
                                AspxOrder.AIMSetting.encapChar = item.EncapChar;
                                AspxOrder.AIMSetting.isTestRequest = item.IsTestAIM;
                            });
                            if ($('#SingleCheckOut').length > 0) {
                                AspxOrder.SendDataForPayment();
                            } else {
                                AspxOrder.SendDataForPaymentForMulti();
                            }
                        }
                        break;
                    case 9:
                        if (data.d) {
                            //blocked cc
                            csscody.alert("<h2>" + getLocale(AIMAuthorize, "Information Alert") + "</h2><p>" + getLocale(AIMAuthorize, "Your credit card is blacklisted!!") + "</p>");
                            $('#txtCardNo').val('');
                            if ($('#SingleCheckOut').length > 0) {
                                $('#btnPaymentInfoContinue').attr('disabled', 'disabled');
                            }
                            $('#btnBillingContinue').attr('disabled', 'disabled');
                        } else {
                            if ($('#SingleCheckOut').length > 0) {
                                $('#btnPaymentInfoContinue').attr('disabled', '');
                            }
                            $('#btnBillingContinue').attr('disabled', '');
                        }
                        break;
                }
            }
        };
        AspxOrder.init();

    });
    //]]> 
</script>

<div class="cssClassAIMChildContent">
<div id="AIMChild" class="AIMChild">
    
    <p>
        <label class="sfLocale">
            <input id="rdbCheck" type="radio" name="paymentType" class="cssClassRadioBtn sfLocale" />Check/ MoneyOrder</label></p>
    
    <p>
        <label class="sfLocale">
           <input id="rdbCreditCard" type="radio" name="paymentType" class="cssClassRadioBtn sfLocale" /> Credit Card</label></p>
</div>

<div id="dvCheque" class="cssClassAIMChildContent">
    <b>
        <label>
            <span class="sfLocale">Account Number :</span> <span class="cssClassRequired">*</span></label></b>
    <input id="txtAccountNumber" type="text" name="accountNumber" class=" required" minlength="5" /><br />
    <b>
        <label>
            <span class="sfLocale">Routing Number : </span><span class="cssClassRequired">*</span></label></b>
    <input id="txtRoutingNumber" type="text" name="routingNumber" class=" required" minlength="9" /><br />
    <b>
        <label class="sfLocale">
            <span class="sfLocale">Account Type : </span><span class="cssClassRequired">*</span></label></b>
    <select id="ddlAccountType">
        <option class="sfLocale">CHECKING</option>
        <option class="sfLocale">BUSINESSCHECKING</option>
        <option class="sfLocale">SAVINGS</option>
    </select>
    <br />
    <b>
        <label>
            <span class="sfLocale">Bank Name :</span> <span class="cssClassRequired">*</span></label></b>
    <input id="txtBankName" type="text" name="bankName" class=" required" minlength="2" /><br />
    <b>
        <label>
           <span class="sfLocale">Account Holder :</span> <span class="cssClassRequired">*</span></label></b>
    <input id="txtAccountHolderName" type="text" name="accountHolderName" class=" required"
        minlength="2" /><br />
    <b>
        <label>
             <span class="sfLocale">Cheque Type :</span> <span class="cssClassRequired">*</span></label></b>
    <select id="ddlChequeType">
        <option class="sfLocale">ARC</option>
        <option class="sfLocale">BOC</option>
        <option class="sfLocale">CCD</option>
        <option class="sfLocale">PPD</option>
        <option class="sfLocale">TEL</option>
        <option class="sfLocale">WEB</option>
    </select>
    <br />
    <b>
        <label>
             <span class="sfLocale">Cheque Number :</span><span class="cssClassRequired">*</span></label></b>
    <input id="txtChequeNumber" type="text" name="chequeNumber" class=" required" minlength="4" /><br />
    <p class="cssClassCheckBox">
        <input id="chkRecurringBillingStatus" type="checkbox" /><span class="sfLocale">Recurring Billing Status</span>
    </p>
</div>

<div id="creditCard" class="cssClassAIMChildContent">
  <%--  <b>
        <label>
            Transaction Type : <span class="cssClassRequired">*</span></label></b>
    <select id="ddlTransactionType">
    </select>
    <b>
        <label id="lblAuthCode">
            AuthorizeCode:<span class="cssClassRequired">*</span>
        </label>
    </b>
    <input type="text" id="txtAuthCode" class="required" minlength="5" />
    <br />--%>
    <b>
        <label>
            <span class="sfLocale">Card Type :</span><span class="cssClassRequired">*</span></label></b>
    <select id="cardType"  >
        <option selected="selected" class="sfLocale" >--Select one--</option>
    </select>
    <br />
    <b>
        <label>
            <span class="sfLocale">Card No : </span><span class="cssClassRequired">*</span></label></b>
    <input id="txtCardNo" type="text" maxlength="16" size="22" class="creditcard  required"
        name="creditCard" /><br />
    <b>
        <label>
            <span class="sfLocale">Card Code :</span><span class="cssClassRequired">*</span></label></b>
    <input id="txtCardCode" type="text" size="10" maxlength="4" name="cardCode" class=" required"
        minlength="3" />
    <a class="screenshot"  href="javascript:;" class="sfLocale">What is this?</a>
    <div id="ccv"><img src="" alt="" />
    <p> </p></div>
    <br />
    <b>
        <label>
            <span class="sfLocale">Expire Date :</span> <span class="cssClassRequired">*</span></label></b>
    <select id="lstMonth" class="required">
        <option value="Month" selected="selected" class="sfLocale">--Month--</option>
        <option value="01" class="sfLocale">01</option>
        <option value="02" class="sfLocale">02</option>
        <option value="03" class="sfLocale">03</option>
        <option value="04" class="sfLocale">04</option>
        <option value="05" class="sfLocale">05</option>
        <option value="06" class="sfLocale">06</option>
        <option value="07" class="sfLocale">07</option>
        <option value="08" class="sfLocale">08</option>
        <option value="09" class="sfLocale">09</option>
        <option value="10" class="sfLocale">10</option>
        <option value="11" class="sfLocale">11</option>
        <option value="12" class="sfLocale">12</option>
    </select>
    
    <select id="lstYear">
        <option value="Year" selected="selected" class="sfLocale">--Year--</option>
        <option value="2011" class="sfLocale">2011</option>
        <option value="2012" class="sfLocale">2012</option>
        <option value="2013" class="sfLocale">2013</option>
        <option value="2014" class="sfLocale">2014</option>
        <option value="2015" class="sfLocale">2015</option>
        <option value="2016" class="sfLocale">2016</option>
        <option value="2017" class="sfLocale">2017</option>
        <option value="2018" class="sfLocale">2018</option>
        <option value="2019" class="sfLocale">2019</option>
        <option value="2020" class="sfLocale">2020</option>
        <option value="2021" class="sfLocale">2021</option>
        <option value="2022" class="sfLocale">2022</option>
    </select>
</div>
</div>

<input id="ibtnAIM" type="button" class = "sfLocale" value="PlaceOrder (AIM)" />
