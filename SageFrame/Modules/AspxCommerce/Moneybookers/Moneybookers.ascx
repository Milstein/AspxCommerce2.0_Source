<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Moneybookers.ascx.cs" Inherits="Modules_AspxMoneybookers_Moneybookers" %>

<script type="text/javascript">

    //<![CDATA[

    var couponApplied = "<%=couponApplied %>";
    $(function() {

        $(".sfLocale").localize({
            moduleKey: Moneybookers
        });
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
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
            ajaxFailure: function() {
                switch (AspxOrder.config.error) {
                    case 3:
                        break;
                    case 4:
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
                this.config.method = "AspxCommerceWebService.asmx/CheckCustomerCartExist",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() }),
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
                return AspxOrder.config.checkCartExist;
            },
            SetSessionValue: function(sessionKey, sessionValue) {
                this.config.method = "AspxCommerceWebService.asmx/SetSessionVariable";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue }),
                this.config.ajaxCallMode = 5;
                this.ajaxCall(this.config);

            },
            init: function() {
                $('#btnMoneybookers').live("click", function () {
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
                              csscody.alert("<h2>"+getLocale(Moneybookers,'Information Alert')+'</h2><p>'+getLocale(Moneybookers,'Your cart has been emptied already!!')+"</p>");
                            return false;
                        }
                    }
                    CheckOut.UserCart.TotalDiscount = eval(parseFloat(CheckOut.UserCart.TotalDiscount) + parseFloat(CheckOut.UserCart.CartDiscount));
                    AspxOrder.SetSessionValue("DiscountAll", CheckOut.UserCart.TotalDiscount);
                    if ($('#SingleCheckOut').length > 0) {
                        AspxOrder.AddOrderDetails();
                    }
                    else {
                        AspxOrder.SendDataForPaymentMoneybookers();
                    }
                });
            },
            ajaxSuccess: function(data) {
                switch (AspxOrder.config.ajaxCallMode) {
                    case 0:
                        break;
                    case 1:
                        AspxOrder.config.checkCartExist = data.d;
                        break;
                    case 2: //get session variable                       
                        AspxOrder.config.sessionValue = parseFloat(data.d);
                        break;
                    case 3:
                        var x = AspxCommerce.utils.GetStoreID() + "#" + AspxCommerce.utils.GetPortalID() + "#" + AspxCommerce.utils.GetUserName() + "#" + AspxCommerce.utils.GetCustomerID() + "#" + AspxCommerce.utils.GetSessionCode() + "#" + AspxCommerce.utils.GetCultureName();
                        var itemIds = "";
                        for (var i = 0; i < CheckOut.UserCart.lstItems.length; i++) {
                            itemIds += CheckOut.UserCart.lstItems[i].ItemID + "&";
                        }
                        x = x + "#" + itemIds + "#" + CheckOut.UserCart.couponCode + "&" + couponApplied;
                        AspxOrder.SetSessionValue("MoneybookersData", x);
                        document.location = '<%=PathMoneybookers%>' + "PayThroughMoneybookers" + pageExtension;
                        break;
                    case 4:
                        var x = AspxCommerce.utils.GetStoreID() + "#" + AspxCommerce.utils.GetPortalID() + "#" + AspxCommerce.utils.GetUserName() + "#" + AspxCommerce.utils.GetCustomerID() + "#" + AspxCommerce.utils.GetSessionCode() + "#" + AspxCommerce.utils.GetCultureName();
                        var itemIds = "";
                        for (var i = 0; i < CheckOut.UserCart.lstItems.length; i++) {
                            itemIds += CheckOut.UserCart.lstItems[i].ItemID + "&" + CheckOut.UserCart.lstItems[i].Quantity + ',';
                        }
                        x = x + "#" + itemIds + "#" + CheckOut.UserCart.couponCode + "&" + couponApplied;
                        AspxOrder.SetSessionValue("MoneybookersData", x);
                        document.location = '<%=PathMoneybookers%>' + "PayThroughMoneybookers" + pageExtension;
                        break;


                }
            },

            getSession: function(Key) {
                this.config.method = "AspxCommerceWebService.asmx/GetSessionVariableCart",
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ key: Key });
                this.config.ajaxCallMode = 2;
                this.ajaxCall(this.config);
                return AspxOrder.config.sessionValue;
            },
            SendDataForPaymentMoneybookers: function() {
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

                var paymentMethodName = "Moneybookers";
                var paymentMethodCode = "Moneybookers";
                var isBillingAsShipping = false;

                if ($('#chkBillingAsShipping').attr('checked'))
                    CheckOut.BillingAddress.IsBillingAsShipping = true;
                else
                    CheckOut.BillingAddress.IsBillingAsShipping = false;

                var orderRemarks = $("#txtAdditionalNote").val();
                var currencyCode = '<%=MainCurrency %>';
                var isTestRequest = "TRUE";
                var isEmailCustomer = "TRUE";
                var taxTotal = AspxOrder.getSession("TaxAll");
                var paymentGatewayID = AspxOrder.getSession("Gateway");
                // shippingRate = getSession("ShippingCostAll");
                var amount = AspxOrder.getSession("GrandTotalAll");
                var paymentGatewaySubTypeID = 1;

                var OrderDetails = {
                    BillingAddressInfo: CheckOut.BillingAddress,
                    PaymentInfo: {
                        PaymentMethodName: paymentMethodName,
                        PaymentMethodCode: paymentMethodCode,
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
                        SessionCode: '',
                        IsGuestUser: false,
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
                this.config.method = "AspxCommerceWebService.asmx/SaveOrderDetails";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ "orderDetail": paramData.OrderDetailsCollection });
                this.config.ajaxCallMode = 3;
                this.config.error = 3;
                this.ajaxCall(this.config);
            },

            AddOrderDetails: function() {
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
                }
                else {
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
                }
                else {
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
                var paymentMethodName = "Moneybookers";
                var paymentMethodCode = "Moneybookers";

                if ($('#chkRecurringBillingStatus').is(':checked'))
                    recurringBillingStatus = true;
                else
                    recurringBillingStatus = false;

                if ($('#chkBillingAsShipping').attr('checked'))
                    isBillingAsShipping = true;
                else
                    isBillingAsShipping = false;
                var orderRemarks = $("#txtAdditionalNote").val();
                var orderItemRemarks = "Order Item Remarks";
                var currencyCode = '<%=MainCurrency %>';
                var isTestRequest = "TRUE";
                var isEmailCustomer = "TRUE";
                var paymentGatewaySubTypeID = 1;
                var shippingMethodID = CheckOut.UserCart.spMethodID;
                var taxTotal = AspxOrder.getSession("TaxAll");
                var paymentGatewayID = AspxOrder.getSession("Gateway");
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

                this.config.method = "AspxCommerceWebService.asmx/SaveOrderDetails";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ "orderDetail": paramData.OrderDetailsCollection });
                this.config.ajaxCallMode = 4;
                this.config.error = 4;
                this.ajaxCall(this.config);
            }


        }
        AspxOrder.init();

    });
    
//]]>
</script>

<input type="button" id="btnMoneybookers" class="sfLocale" value="Place Order (Moneybookers)" />
