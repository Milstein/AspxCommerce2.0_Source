var CheckOut;
$(function() {
    var RootPath = AspxCommerce.utils.GetAspxRootPath();
    var rewardPointsIsChecked = false;
    var rewardPointsIsCliked = false;
    var rewardPointsSliderSelectedValue = 0;
    var $accor = '';
    var isGiftCardUsed = false;
    var temptotal = 0;
    var tempUserAddresses = [];
    var basketItems = [];
    var rateAjaxRequest = null;
    $.expr[':'].exactcontains = function(a, i, m) {
        return $(a).text().match("^" + m[3] + "$");
    };
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            CustomerID: AspxCommerce.utils.GetCustomerID(),
            SessionCode: AspxCommerce.utils.GetSessionCode()
        };
        return aspxCommonInfo;
    };
    CheckOut = {
        BillingAddress: {
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
            IsDefaultBilling: false,
            IsBillingAsShipping: false
        },
        SetTempAddr: function(add) {
            tempUserAddresses = add;
        },
        SetBasketItems: function(arr) {
            basketItems = arr;
        },
        ShippingAddress: {
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
            isDefaultShipping: false
        },
        Vars: {
            temptotal: 0,
            GatewayName: "",
            ItemIDs: "",
            Tax: 0,
            AddressID: 0,
            Country: "",
            State: "",
            Zip: "",
            len: 0,
            CostVariantsValueIDs: ""
        },
        UserCart: {
            ShowShippingAdd: false,
            isUserGuest: true,
            isActive: true,
            IsFShipping: IsFShipping,
            myAccountURL: myAccountURL,
            CartDiscount: 0,
            TotalDiscount: Discount,
            CouponDiscountAmount: couponDiscountAmount,
            CouponPercentValue: couponPercentValue,
            IsCouponInPercent: isCouponInPercent,
            CouponAppliedCount: couponAppliedCount,
            IsDownloadItemInCart: false,
            IsDownloadItemInCartFull: false,
            CountDownloadableItem: 0,
            CountAllItem: 0,
            paymentMethodName: "",
            paymentMethodCode: "",
            shippingRate: 0,
            amount: 0,
            baseSubTotalAmt: 0.00,
            lstItems: [],
            spMethodID: 0,
            spCost: 0,
            ID: 0,
            qty: 0,
            Tax: 0,
            price: 0,
            weight: 0,
            CartID: 0,
            ItemType: '',
            couponCode: CouponCode,
            GiftCardDetail: [],
            CartItemId: 0,
            objTaxList: [],
            spName: "",
            objRewardPointsList: [],
            RewardPointsDiscount: 0,
            UsedRewardPoints: 0,
            RewardedPoints: 0,
            IsPurchaseActive: false
        },
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
            ajaxCallMode: "", ///0 for get categories and bind, 1 for notification,2 for versions bind
            error: "",
            sessionValue: ""
        },

        ajaxCall: function(config) {
            $.ajax({
                type: CheckOut.config.type,
                contentType: CheckOut.config.contentType,
                cache: CheckOut.config.cache,
                async: CheckOut.config.async,
                url: CheckOut.config.url,
                data: CheckOut.config.data,
                dataType: CheckOut.config.dataType,
                success: CheckOut.config.ajaxCallMode,
                error: CheckOut.config.error
            });
        },

        CheckDownloadableOnlyInCart: function() {
            //        $.ajax({
            //            type: "POST",
            //            url: aspxservicePath + "AspxCommerceWebService.asmx/CheckDownloadableItemOnly",
            //            data: JSON2.stringify({ storeID: storeId, portalID: portalId, customerID: customerId, sessionCode: sessionCode }),
            //            contentType: "application/json;charset=utf-8",
            //            dataType: "json",
            //            success: function(msg) {
            //                IsDownloadItemInCart = msg.d;
            if (CheckOut.UserCart.IsDownloadItemInCart) {
                if (AspxCommerce.utils.GetUserName() == 'anonymoususer') {
                    $('.cssClassCheckOutMethodLeft p:first').html('').html(getLocale(AspxCheckoutWithSingleAddress, 'Your cart contains Digital item(s)!') + '<br/>' + getLocale(AspxCheckoutWithSingleAddress, 'Checkout as') + '<b> ' + getLocale(AspxCheckoutWithSingleAddress, 'Existing User') + '</b> ' + getLocale(AspxCheckoutWithSingleAddress, 'OR') + '<b> ' + getLocale(AspxCheckoutWithSingleAddress, 'Register') + '</b>');
                    $('.cssClassCheckOutMethodLeft .cssClassPadding #rdbGuest ,.cssClassCheckOutMethodLeft .cssClassPadding  #lblguest').remove();
                    $('#btnCheckOutMethodContinue').hide();
                    $('#rdbRegister').attr('checked', true);
                    $('#dvLogin').show();
                    //  $('.cssClassCheckOutMethod').html('').html('Please Register <a href ="' + aspxRedirectPath + register + '">here</a> to continue your download..');

                }
            } else {
                $('#rdbGuest').attr('checked', true);
            }
            if (CheckOut.UserCart.CountAllItem == CheckOut.UserCart.CountDownloadableItem) {
                CheckOut.UserCart.IsDownloadItemInCartFull = true;
            } else {
                CheckOut.UserCart.IsDownloadItemInCartFull = false;
            }
            if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                $('#dvBilling .cssClassCheckBox').hide();
            } else {
                $('#dvBilling .cssClassCheckBox').show();
            }
            //            },
            //            error: function() {
            //                alert("error in database connection!");
            //            }
            //        });
        },

        AddUpdateUserAddress: function() {
            var addressIdX = $("#hdnAddressID").val();
            var firstNameX = $("#popuprel .sfFormwrapper table #txtFirstName").val();
            var lastNameX = $("#popuprel .sfFormwrapper table #txtLastName").val();
            var emailX = $("#popuprel .sfFormwrapper table #txtEmailAddress").val();
            var companyX = $("#popuprel .sfFormwrapper table #txtCompanyName").val();
            var address1X = $("#popuprel .sfFormwrapper table #txtAddress1").val();
            var address2X = $("#popuprel .sfFormwrapper table #txtAddress2").val();
            var cityX = $("#popuprel .sfFormwrapper table #txtCity").val();
            var stateX = '';
            if ($.trim($("#popuprel .sfFormwrapper table #ddlBLCountry").find('option:selected').text()) == 'United States') {
                stateX = $.trim($("#popuprel .sfFormwrapper table #ddlBLState").find('option:selected').text());
            } else {
                stateX = $("#popuprel .sfFormwrapper table #txtState").val();
            }
            var zipX = $("#popuprel .sfFormwrapper table #txtZip").val();
            var phoneX = $("#popuprel .sfFormwrapper table #txtPhone").val();
            var mobileX = $("#popuprel .sfFormwrapper table #txtMobile").val();
            var faxX = '';
            if ($("#popuprel .sfFormwrapper table #txtFax").length > 0)
                faxX = $("#popuprel .sfFormwrapper table #txtFax").val();
            var webSiteX = '';
            if ($("#popuprel .sfFormwrapper table #txtFax").length > 0)
                webSiteX = $("#popuprel .sfFormwrapper table #txtWebsite").val();

            var countryNameX = $.trim($("#popuprel .sfFormwrapper table #ddlBLCountry").find('option:selected').text());
            var isDefaultShippingX = $("#popuprel .sfFormwrapper table #chkShippingAddress").attr("checked");
            var isDefaultBillingX = $("#popuprel .sfFormwrapper table #chkBillingAddress").attr("checked");

            this.config.method = "AspxCommerceWebService.asmx/AddUpdateUserAddress";
            this.config.url = this.config.baseURL + this.config.method;
            var addressObj = {
                AddressID: addressIdX,
                CustomerID: AspxCommerce.utils.GetCustomerID(),
                FirstName: firstNameX,
                LastName: lastNameX,
                Email: emailX,
                Company: companyX,
                Address1: address1X,
                Address2: address2X,
                City: cityX,
                State: stateX,
                Zip: zipX,
                Phone: phoneX,
                Mobile: mobileX,
                Fax: faxX,
                WebSite: webSiteX,
                Country: countryNameX,
                DefaultShipping: isDefaultShippingX,
                DefaultBilling: isDefaultBillingX
            };
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.SessionCode = null;
            this.config.data = JSON2.stringify({ addressObj: addressObj, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = CheckOut.BindUserAddressOnUpdate;
            //this.config.error = 11;
            this.ajaxCall(this.config);
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
            $('#ddlBLState').val(1);
            $("#ddlBLCountry").val(1);
            $("#txtZip").val('');
            $("#txtPhone").val('');
            $("#txtMobile").val('');
            $("#txtFax").val('');
            $("#txtWebsite").val('');
            //$(".error").hide();
        },
        ConfirmADDNewAddress: function(event) {
            if (event) {
                var route = '';
                if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                    route = AspxCommerce.utils.GetAspxRedirectPath() + CheckOut.UserCart.myAccountURL + pageExtension;
                } else {
                    route = AspxCommerce.utils.GetAspxRedirectPath() + CheckOut.UserCart.myAccountURL;
                }
                window.location.href = route;
                return false;
            } else {
                return false;
            }
        },

        BindBillingData: function() {
            $('#dvCPBilling').html('');
            var itemsarray = [];
            $('#dvBilling input:text,#dvBillingSelect option:selected').each(function() {
                var items = '';
                if ($(this).attr('class') == 'cssBillingShipping')
                    items = $(this).text();
                else
                    items = $(this).val();
                if (items != '') {
                    itemsarray.push(items);
                }
            });

            var html = '<ul>';
            $.each(itemsarray, function(index, item) {
                if (item != '') {
                    html += '<li>' + item + '</li>';
                }
            });

            html += '</ul>';
            var htmlBtn = '<button type="button" id="btnBillingChange"><span>' + getLocale(AspxCheckoutWithSingleAddress, "Change") + '</span></button>';
            $('#dvCPBilling').html('').append(html);
            $('#divBillingBtn').html('').append(htmlBtn);
            itemsarray = [];
            $('#btnBillingChange').bind("click", function() {
                $('#dvCPBilling').html('');
                $("#divShippingAddressBtn").html('');
                $("#dvCPShipping").html('');
                $("#divShippingMethodBtn").html('');
                $("#dvCPShippingMethod").html('');
                $("#divPaymentBtn").html('');
                $("#dvCPPaymentMethod").html('');
                itemsarray = [];
                $accor = $("#tabs").tabs({ active: 1, disabled: [0, 2, 3, 4, 5] });
                $accor.tabs('select', 1);
                $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
            });
        },
        QuantitityDiscountAmount: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetDiscountQuantityAmount";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = CheckOut.SetDiscountQuantityAmount;
            this.config.async = false;
            //this.config.error = 10;
            this.ajaxCall(this.config);
        },

        BindShippingData: function() {
            $('#dvCPShipping').html('');
            var itemsarray = [];
            $('#dvShipping input:text, #dvShippingSelect option:selected').each(function() {
                var items = '';
                if ($(this).attr('class') == 'cssBillingShipping')
                    items = $(this).text();
                else
                    items = $(this).val();
                itemsarray.push(items);
            });

            var html = '<ul>';
            $.each(itemsarray, function(index, item) {
                if (item != '') {
                    html += '<li>' + item + '</li>';
                }
            });
            html += '</ul>';
            var htmlBtn = '<button type="button" id="btnShippingChange"><span>' + getLocale(AspxCheckoutWithSingleAddress, "Change") + '</span></button>';
            $('#divShippingAddressBtn').html('').append(htmlBtn);
            $('#dvCPShipping').html('').append(html);
            itemsarray = [];
            $('#btnShippingChange').bind("click", function() {
                $('#dvCPShipping').html('');
                $("#divShippingMethodBtn").html('');
                $("#dvCPShippingMethod").html('');
                $("#divPaymentBtn").html('');
                $("#dvCPPaymentMethod").html('');
                $accor = $("#tabs").tabs({ active: 2, disabled: [0, 1, 3, 4, 5] });
                $accor.tabs('select', 2);
                $accor.tabs({ deactive: [0, 1, 3, 4, 5] });
            });

        },

        BindShippingMethodData: function() {
            $('#dvCPShippingMethod').html('');
            var itemsarray = [];
            var items = $('#divShippingMethod input:radio:checked').parents('tr').find('td div.cssClassCartPictureInformation h3').html();
            itemsarray.push(items);
            var htmlBtn = '<button type="button" id="btnShippingMethodChange"><span>' + getLocale(AspxCheckoutWithSingleAddress, "Change") + '</span></button>';
            var html = '<ul>';
            $.each(itemsarray, function(index, item) {
                if (item != '') {
                    html += '<li>' + item + '</li>';
                }
            });
            html += '</ul>';
            $('#divShippingMethodBtn').html('').append(htmlBtn);
            $('#dvCPShippingMethod').html('').append(html);
            itemsarray = [];
            $('#btnShippingMethodChange').bind("click", function() {
                $('#dvCPShippingMethod').html('');
                $("#divPaymentBtn").html('');
                $("#dvCPPaymentMethod").html('');
                itemsarray = [];
                $accor = $("#tabs").tabs({ active: 3, disabled: [0, 1, 2, 4, 5] });
                $accor.tabs('select', 3);
                $accor.tabs({ deactive: [0, 1, 2, 4, 5] });
            });
        },
        BindPaymentData: function() {
            var itemsarray = [];
            var items = '';
            items = $('#dvPGList input[type=radio]:checked').attr('realname');
            itemsarray.push(items);
            if ($('#cardType').length > 0) {
                items = $.trim($('#AIMChild input:radio:checked').nextAll().find('label').html());
                itemsarray.push(items);
            }
            //alert(itemsarray);       

            var html = '<ul>';
            $('#dvCPPaymentMethod').html('');
            $.each(itemsarray, function(index, item) {
                if (item != '') {
                    html += '<li>' + item + '</li>';
                }
            });
            html += '</ul>';
            var htmlBtn = '<button type="button" id="btnPaymentChange"><span>' + getLocale(AspxCheckoutWithSingleAddress, "Change") + '</span></button>';
            $('#divPaymentBtn').html('').append(htmlBtn);
            $('#dvCPPaymentMethod').html('').append(html);
            itemsarray = [];
            $('#btnPaymentChange').bind("click", function() {
                $('#dvCPPaymentMethod').html('');
                itemsarray = [];
                if ($('#cardType').length > 0) {
                    $('#cardType').remove();
                }
                $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                $accor.tabs('select', 4);
                $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
            });

        },

        AddBillingAsShipping: function() {
            if ($('#chkBillingAsShipping').is(':checked')) {
                if ($('#dvBillingInfo').is(':hidden')) {
                    var id = $("#ddlShipping").val($("#ddlBilling").val());
                    //call rate quote CheckOut.GetShippinMethodsFromWeight(basketItems, tempUserAddresses[0]);
                    var sAddress = CheckOut.GetUserSelectedShippingAddress(id.val());
                    CheckOut.GetShippinMethodsFromWeight(basketItems, sAddress);
                } else {
                    var sipAddress = {
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
                        IsDefaultBilling: false,
                        IsBillingAsShipping: false
                    };
                    $('#txtSPFirstName').val($('#txtFirstName').val());
                    sipAddress.FirstName = $('#txtSPFirstName').val();
                    $('#txtSPLastName').val($('#txtLastName').val());
                    sipAddress.LastName = $('#txtSPLastName').val();
                    $('#txtSPEmailAddress').val($('#txtEmailAddress').val());
                    sipAddress.EmailAddress = $('#txtSPEmailAddress').val();

                    $('#txtSPCompany').val($('#txtCompanyName').val());
                    sipAddress.CompanyName = $('#txtSPCompany').val();
                    $('#txtSPAddress').val($('#txtAddress1').val());
                    sipAddress.Address = $('#txtSPAddress').val();
                    $("#txtSPZip").val($("#txtZip").val());
                    sipAddress.Zip = $("#txtSPZip").val();
                    $('#txtSPAddress2').val($('#txtAddress2').val());
                    sipAddress.Address2 = $('#txtSPAddress2').val();
                    $('#txtSPCity').val($('#txtCity').val());
                    sipAddress.City = $('#txtSPCity').val();
                    if ($('#ddlBLState').is(":hidden")) {
                        $('#txtSPState').val($('#txtState').val());
                        sipAddress.State = $('#txtSPState').val();
                    } else {
                        $('#ddlSPState').html($('#ddlBLState option').html());
                        $('#ddlSPState').val($('#ddlBLState').val());
                        sipAddress.State = $('#ddlSPState').val();
                    }

                    //                    $.ajax({
                    //                        type: "POST",
                    //                        async:false,
                    //                        url: aspxservicePath + "AspxCommerceWebService.asmx/BindStateList",
                    //                        data: JSON2.stringify({ countryCode: $("#ddlBLCountry").find('option:selected').val() }),
                    //                        contentType: "application/json;charset=utf-8",
                    //                        dataType: "json",
                    //                        success: function (msg) {
                    //                            //$.each(msg.d, function(index, item) {
                    //                            if (msg.d.length > 2) {
                    //                                $('#ddlSPState').show();
                    //                                $('#txtSPState').hide();
                    //                                $('#ddlSPState').val($('#ddlBLState').val());
                    //                                sipAddress.Zip = $('#ddlSPState').val();
                    //                            }
                    //                            else {
                    //                                $('#ddlSPState').hide();
                    //                                $('#txtSPState').show();
                    //                                $('#txtSPState').val($('#txtState').val());
                    //                                sipAddress.Zip = $('#txtSPZip').val();
                    //                            }
                    //                            //});
                    //                        }
                    //                    });

                    $('#ddlSPCountry').val($('#ddlBLCountry').val());
                    sipAddress.Country = $.trim($('#ddlSPCountry option:selected').text());
                    $('#txtSPPhone').val($('#txtPhone').val());
                    sipAddress.Phone = $('#txtSPPhone').val();
                    $('#txtSPMobile').val($('#txtMobile').val());
                    sipAddress.Mobile = $('#txtSPMobile').val();
                    tempUserAddresses = [];
                    tempUserAddresses.push(sipAddress);
                    //call rate quote
                    CheckOut.GetShippinMethodsFromWeight(basketItems, tempUserAddresses[0]);

                }
            } else {
                if (rateAjaxRequest != null)
                    rateAjaxRequest.abort();

                $('#txtSPFirstName').val("");
                $('#txtSPLastName').val("");
                $('#txtSPCompany').val("");
                $('#txtSPAddress').val("");
                $('#txtSPAddress2').val("");
                $('#txtSPEmailAddress').val("");
                $('#txtSPMobile').val("");
                $('#txtSPCity').val("");
                $('#ddlSPState').val(1);
                $('#txtSPState').val("");
                $('#txtSPZip').val("");
                $('#ddlSPCountry').val(1);
                $('#txtSPPhone').val("");
                $('#txtSPFax').val("");
                $('#ddlSPState').hide();
                $('#txtSPState').show();
            }
        },

        CheckShippingAndBillingCountry: function(checktype) {
            var billing;
            var shipping;
            var blist;
            var slist;
            if ("anonymoususer" != userName) {
                billing = $('#ddlBilling').find('option:selected').text().split(',')[4];
                shipping = $('#ddlShipping').find('option:selected').text().split(',')[4];
            } else {
                billing = $.trim($('#ddlBLCountry').find("option:selected").text());
                shipping = $.trim($('#ddlSPCountry').find("option:selected").text());
            }

            var allowtoCheckout = { AllowBilling: true, AllowShipping: true };

            switch (checktype) {
                case "billing":
                    if (billing != "") {
                        if (AllowedBillingCountry != "ALL") {
                            blist = AllowedBillingCountry.split(',');
                            for (var c = 0; c < blist.length; c++) {
                                if ($.trim($("#hdnCountryList").find('option[value=' + blist[c] + ']').text()) == $.trim(billing))
                                    allowtoCheckout.AllowBilling = true;
                                else
                                    allowtoCheckout.AllowBilling = false;
                            }
                        }
                    }
                    break;
                case "shipping":
                    if (shipping != "") {
                        if (AllowedShippingCountry != "ALL") {
                            slist = AllowedShippingCountry.split(',');
                            for (var d = 0; d < slist.length; d++) {
                                if ($.trim($("#hdnCountryList").find('option[value=' + slist[d] + ']').text()) == $.trim(shipping))
                                    allowtoCheckout.AllowShipping = true;
                                else
                                    allowtoCheckout.AllowShipping = false;
                            }
                        }

                    }
                    break;
                case "both":
                    if (billing != "") {
                        if (AllowedBillingCountry != "ALL") {
                            blist = AllowedBillingCountry.split(',');
                            for (var c = 0; c < blist.length; c++) {
                                if ($.trim($("#hdnCountryList").find('option[value=' + blist[c] + ']').text()) == $.trim(billing))
                                    allowtoCheckout.AllowBilling = true;
                                else
                                    allowtoCheckout.AllowBilling = false;
                            }
                        }
                    }
                    if (shipping != "") {
                        if (AllowedShippingCountry != "ALL") {
                            slist = AllowedShippingCountry.split(',');
                            for (var d = 0; d < slist.length; d++) {
                                if ($.trim($("#hdnCountryList").find('option[value=' + slist[d] + ']').text()) == $.trim(shipping))
                                    allowtoCheckout.AllowShipping = true;
                                else
                                    allowtoCheckout.AllowShipping = false;
                            }
                        }

                    }
                    break;
            }


            return allowtoCheckout;
        },

        GetCountry: function() {
            this.config.method = "AspxCommerceWebService.asmx/BindCountryList";
            this.config.url = this.config.baseURL + this.config.method;
            //this.config.async = false;
            //this.config.data = JSON2.stringify({ storeID: AspxCommerce.utils.GetStoreID(), portalID: AspxCommerce.utils.GetPortalID(), customerID: AspxCommerce.utils.GetCustomerID(), userName: AspxCommerce.utils.GetUserName(), cultureName: AspxCommerce.utils.GetCultureName(), sessionCode: AspxCommerce.utils.GetSessionCode() });
            this.config.ajaxCallMode = CheckOut.BindCountryList;
            //this.config.error = 9;
            this.ajaxCall(this.config);
        },
        GetState: function(countryCode) {

            this.config.method = "AspxCommerceWebService.asmx/BindStateList";
            this.config.url = this.config.baseURL + this.config.method;
            //this.config.async = false;
            this.config.data = JSON2.stringify({ countryCode: countryCode });
            this.config.ajaxCallMode = CheckOut.BindStateList;
            //this.config.error = 8;
            this.ajaxCall(this.config);
        },
        GetUserSelectedShippingAddress: function(id) {
            var address;
            if (id != 0) {
                for (var z = 0; z < tempUserAddresses.length; z++) {
                    if (parseInt(tempUserAddresses[z].AddressID) == parseInt(id)) {
                        address = tempUserAddresses[z];
                        var ccode = '';
                        ccode = $('#hdnCountryList option:exactcontains(' + $.trim(address.Country) + ')').attr('value');
                        address.State = CheckOut.GetStateCodeByStateName(ccode, address.State);

                        break;
                    }
                }
            }
            return address;
        },
        GetStateCodeByStateName: function(cCode, state) {
            var stateCode = '';
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: false,
                url: aspxservicePath + 'AspxCommerceWebService.asmx/GetStateCode',
                data: JSON2.stringify({ cCode: cCode, stateName: state }),
                dataType: "json",
                success: function(data) {
                    if (data.d != null || data.d != '') {
                        stateCode = data.d;
                    } else {
                        stateCode = state;
                    }
                }
            });
            return stateCode;
        },
        GetShippinMethodsFromWeight: function(basketItemsDetail, shipAddress) {

            var shipToAddress = {
                ToCity: shipAddress.City,
                ToCountry: $('#hdnCountryList option:exactcontains(' + $.trim(shipAddress.Country) + ')').attr('value'), //shipAddress.Country,
                ToCountryName: shipAddress.Country,
                ToAddress: shipAddress.Address,
                ToState: shipAddress.State,
                ToPostalCode: shipAddress.Zip,
                ToStreetAddress1: shipAddress.Address2,
                ToStreetAddress2: ""
            };

            var basketItemList = basketItemsDetail;

            var itemsDetail = {
                DimensionUnit: dimentionalUnit,
                IsSingleCheckOut: true,
                ShipToAddress: shipToAddress,
                WeightUnit: weightunit,
                BasketItems: basketItemList,
                CommonInfo: aspxCommonObj()
            };
            var dv = $("<div id='dvShippingLoading'>").html(getLocale(AspxCheckoutWithSingleAddress, 'Calculating Rate...Please Wait.....'));
            if (rateAjaxRequest != null)
                rateAjaxRequest.abort();
            $("#divShippingMethod").html('').append(dv);
            rateAjaxRequest = $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: true,
                url: aspxservicePath + 'AspxCommerceWebService.asmx/GetRate',
                data: JSON2.stringify({ itemsDetail: itemsDetail }),
                dataType: "json",
                success: CheckOut.BindShippingMethodByWeight,
                error: CheckOut.GetShippingMethodLoadErrorMsg
            });
            return rateAjaxRequest;
            //    ajaxRequest.abort();
        },

        GetDiscountCartPriceRule: function(CartID, SpCost) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.SessionCode = null;
            aspxCommonInfo.CustomerID = null;
            this.config.method = "AspxCommerceWebService.asmx/GetDiscountPriceRule";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ cartID: CartID, aspxCommonObj: aspxCommonInfo, shippingCost: SpCost });
            this.config.ajaxCallMode = CheckOut.SetDiscountPriceRule;
            this.config.error = CheckOut.GetDiscountPriceLoadErrorMsg;
            this.ajaxCall(this.config);
        },

        GetUserCartDetails: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetCartCheckOutDetails";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = CheckOut.GetCheckoutCartDetails;
            //this.config.error = 5;
            this.ajaxCall(this.config);
        },

        AssignItemsDetails: function() {
            var countGiftCard = 0;
            var countDownloadble = 0;
            var itemTotal = 0;
            CheckOut.UserCart.lstItems = [];
            $('#tblCartList>tbody> tr').not('.cssClassHeadeTitle').each(function(i, v) {
                CheckOut.UserCart.ID = $(this).find('a').attr("id").replace(/[^0-9]/gi, '');
                CheckOut.UserCart.ItemType = parseInt($(this).find('a').attr("itemType"));
                if ($(this).find("input[class='num-pallets-input']").val() != "null")
                    CheckOut.UserCart.qty = $(this).find("input[class='num-pallets-input']").val();
                else {
                    CheckOut.UserCart.qty = 0;
                }
                if ($(this).find("input[class='num-pallets-input']").attr('price') != "null") {
                    CheckOut.UserCart.price = $(this).find("input[class='num-pallets-input']").attr('price');

                    if (CheckOut.UserCart.IsPurchaseActive == true) {
                        CheckOut.UserCart.RewardedPoints = CheckOut.UserCart.price * CheckOut.UserCart.qty * parseFloat($("#hdnRewardRate").val()).toFixed(2);
                    }

                } else {
                    CheckOut.UserCart.price = 0.00;
                    CheckOut.UserCart.RewardedPoints = 0.00;
                }
                if ($(this).find("td.price-per-pallet").find('span').attr('id') != "null")
                    CheckOut.UserCart.weight = $(this).find("td.price-per-pallet").find('span').attr('id');
                else {
                    CheckOut.UserCart.weight = 0;
                }

                if ($('#dvShippingSelect option:selected').val() > 0) {
                    CheckOut.UserCart.spAddressID = $('#dvShippingSelect option:selected').val();
                } else {
                    CheckOut.UserCart.spAddressID = 0;
                }


                var costvariants = '';
                if ($.trim($(this).find(".row-variants").html()) != '') {
                    CheckOut.UserCart.costvariants = $.trim($(this).find(".row-variants").attr('varIDs'));
                } else {
                    CheckOut.UserCart.costvariants = 0;
                }

                var cartitemid = $(this).find("input[type=hidden][name=cartItemId]").val();
                itemTotal++;
                if (parseInt(CheckOut.UserCart.ItemType) == 2) {
                    CheckOut.UserCart.lstItems[i] = { "OrderID": 0, "ShippingAddressID": 0, "ShippingMethodID": 0, "ItemID": CheckOut.UserCart.ID, "Variants": CheckOut.UserCart.costvariants, "Quantity": CheckOut.UserCart.qty, "Price": parseFloat(CheckOut.UserCart.price), "Weight": 0, "Remarks": '', "orderItemRemarks": '', "ShippingRate": 0, 'IsDownloadable': true, 'IsGiftCard': false, 'CartItemId': cartitemid, 'RewardedPoints': CheckOut.UserCart.RewardedPoints };
                    countDownloadble++;
                } else if (parseInt(CheckOut.UserCart.ItemType) == 3) {

                    var vr = $(this).find('a').attr("isvirtual");
                    var sid = 0;
                    if (vr == "true" || vr == true) {
                    } else {
                        sid = CheckOut.UserCart.spAddressID;
                    }
                    // alert(sid);
                    countGiftCard++;
                    CheckOut.UserCart.lstItems[i] = { "OrderID": 0, "ShippingAddressID": sid, "ShippingMethodID": CheckOut.UserCart.spMethodID, "ItemID": CheckOut.UserCart.ID, "Variants": CheckOut.UserCart.costvariants, "Quantity": CheckOut.UserCart.qty, "Price": parseFloat(CheckOut.UserCart.price), "Weight": 0, "Remarks": '', "orderItemRemarks": '', "ShippingRate": 0, 'IsDownloadable': true, 'IsGiftCard': true, 'CartItemId': cartitemid, 'RewardedPoints': CheckOut.UserCart.RewardedPoints };

                } else {
                    CheckOut.UserCart.lstItems[i] = { "OrderID": 0, "ShippingAddressID": CheckOut.UserCart.spAddressID, "ShippingMethodID": CheckOut.UserCart.spMethodID, "ItemID": CheckOut.UserCart.ID, "Variants": CheckOut.UserCart.costvariants, "Quantity": CheckOut.UserCart.qty, "Price": parseFloat(CheckOut.UserCart.price), "Weight": parseFloat(CheckOut.UserCart.weight), "Remarks": '', "orderItemRemarks": '', "ShippingRate": CheckOut.UserCart.spCost, 'IsDownloadable': false, 'IsGiftCard': false, 'CartItemId': cartitemid, 'RewardedPoints': CheckOut.UserCart.RewardedPoints };

                }


            });
            if (eval(countDownloadble + countGiftCard) == eval(itemTotal)) {
                CheckOut.UserCart.NoShippingAddress = true;
            } else {
                CheckOut.UserCart.NoShippingAddress = false;
            }
        },

        BindUserAddress: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.SessionCode = null;
            this.config.method = "AspxCommerceWebService.asmx/GetAddressBookDetails";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = CheckOut.BindAddressBookDetails;
            this.config.error = CheckOut.GetAddressLoadErrorMsg;
            this.ajaxCall(this.config);
        },

        GetTaxRate: function(itemID) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.SessionCode = null;
            if (aspxCommonInfo.UserName != 'anonymoususer') {
                var cartTaxObj = {
                    ItemID: itemID,
                    Country: '',
                    State: '',
                    Zip: '',
                    AddressID: CheckOut.Vars.AddressID
                };
                this.config.method = "AspxCommerceWebService.asmx/GetCartTax";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ cartTaxObj: cartTaxObj, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = CheckOut.BindTaxRate;
                this.ajaxCall(this.config);

            } else {
                var cartTaxObj = {
                    ItemID: itemID,
                    Country: CheckOut.Vars.Country,
                    State: CheckOut.Vars.State,
                    Zip: CheckOut.Vars.Zip,
                    AddressID: CheckOut.Vars.AddressID
                };
                this.config.method = "AspxCommerceWebService.asmx/GetCartTax";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ cartTaxObj: cartTaxObj, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = CheckOut.BindTaxRate;
                this.ajaxCall(this.config);
            }
        },

        SetSessionValue: function(sessionKey, sessionValue) {
            this.config.method = "AspxCommerceWebService.asmx/SetSessionVariable";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ key: sessionKey, value: sessionValue });
            this.config.ajaxCallMode = CheckOut.GetSessionValue;
            //this.config.error = 2;
            this.ajaxCall(this.config);
        },

        LoadPGatewayList: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.CustomerID = null;
            aspxCommonInfo.SessionCode = null;
            this.config.method = "AspxCommerceWebService.asmx/GetPGList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = CheckOut.BindPaymentGateWayList;
            //this.config.error = 3;
            this.ajaxCall(this.config);
        },

        LoadControl: function(ControlName, Name) {
            this.Vars.GatewayName = Name;
            this.config.method = "LoadControlHandler.aspx/Result";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = "{ controlName:'" + AspxCommerce.utils.GetAspxRootPath() + ControlName + "'}";
            this.config.ajaxCallMode = CheckOut.LoadPaymentGateway;
            this.config.error = CheckOut.GetPaymentGateWayLoadErrorMsg;
            this.ajaxCall(this.config);

        },

        LoadPaymentGateway: function(data) { //load control 
            if (data.d.startsWith('System.Web.HttpException')) {
                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "This Payment Gateway failed to load. Please try again Later.") + "</p>");
                $("#btnPaymentInfoContinue").attr("disabled", "disabled");
                return false;
            } else {
                $("#btnPaymentInfoContinue").removeAttr("disabled").attr("enabled", "enabled");

                //console.debug($("<div>" + data.d + "</div>").find('div').length);
                var dvList = $("<div>" + data.d + "</div>");
                if (dvList.find('div').length > 0) {
                    var button = dvList.find('input:last');
                    dvList.find('input:last').remove();
                    $('#dvPaymentInfo input[type="button"]').remove();
                    //for all
                    $('#dvPaymentInfo input[type="button"]').remove();
                    $('#dvPlaceOrder .sfButtonwrapper ').find('input').not("#btnPlaceBack").remove();
                    $('#dvPlaceOrder .sfButtonwrapper ').append(button);
                    $('#dvPlaceOrder .sfButtonwrapper div ').remove();

                    $('#dvPaymentInfo').find('div').not('.sfButtonwrapper').not('.cssClassClear').not("#dvinfo").not('#dvPGList').remove();
                    $('#dvPaymentInfo .sfButtonwrapper').before(dvList);
                    // var button = $('#dvPaymentInfo').find("input[type=button]");

                    if (CheckOut.GiftCard.GiftCardList().length == 0) {
                        $("#btnPlaceOrderGiftCard").remove();
                    }
                } else {
                    $('#dvPaymentInfo').find('div').not('.sfButtonwrapper').not('.cssClassClear').not("#dvinfo").not('#dvPGList').remove();
                    $('#dvPlaceOrder .sfButtonwrapper ').find('input').not("#btnPlaceBack").remove();
                    $('#dvPlaceOrder .sfButtonwrapper ').append(data.d);
                    $('#dvPlaceOrder .sfButtonwrapper ').find('div').remove();
                    if (CheckOut.GiftCard.GiftCardList().length == 0) {
                        $("#btnPlaceOrderGiftCard").remove();
                    }
                }
            }
        },

        GetSessionValue: function(data) { //get session variable
            CheckOut.config.sessionValue = parseFloat(data.d);
        },

        BindPaymentGateWayList: function(data) {
            if (data.d.length > 0) {
                $('#dvPGList').html('');
                $.each(data.d, function(index, item) {
                    if (item.LogoUrl != '') {
                        $('#dvPGList').append('<label><table class="cssClassTablePGList"><tr><td class="cssClassTDPGList"><input id="rdb' + item.PaymentGatewayTypeName + '" name="PGLIST" type="radio" realname="' + item.PaymentGatewayTypeName + '" friendlyname="' + item.FriendlyName + '"  source="' + item.ControlSource + '" value="' + item.PaymentGatewayTypeID + '" class="cssClassRadioBtn" /></td><td class="cssClassTDPGList"><img class="cssClassImgPGList" src="' + aspxRootPath + item.LogoUrl + '" alt="' + item.PaymentGatewayTypeName + '" height="30" width="100" title="' + item.PaymentGatewayTypeName + '" visible="true" /></td></tr></table></label><br />');
                    } else {
                        $('#dvPGList').append('<label><input id="rdb' + item.PaymentGatewayTypeName + '" name="PGLIST" type="radio" realname="' + item.PaymentGatewayTypeName + '" friendlyname="' + item.FriendlyName + '"  source="' + item.ControlSource + '" value="' + item.PaymentGatewayTypeID + '" class="cssClassRadioBtn" /><b>' + item.PaymentGatewayTypeName + '</b></label><br />');
                    }
                });
                CheckOut.BindPGFunction();
            }
        },
        BindPGFunction: function() {
            $('#dvPGList input[name="PGLIST"]:first').attr("checked", "checked");

            $('#dvPGList input[name="PGLIST"]').bind("click", function() {
                CheckOut.SetSessionValue("Gateway", $(this).attr('value'));
                if ('paypal' == $(this).attr('friendlyname').toLowerCase()) {
                    CheckOut.UserCart.paymentMethodCode = "Paypal";
                    CheckOut.UserCart.paymentMethodName = "Paypal";
                } else {
                }

                CheckOut.LoadControl($(this).attr('source'), $.trim($(this).attr('friendlyname')));

            });
            $('#dvPGList input[name="PGLIST"]:first').trigger('click');
        },
        BindAddressBookDetails: function(data) {
            var option = '';
            var optionBilling = '';
            var pattern = ",", re = new RegExp(pattern, "g");

            if (data.d.length > 0) {
                tempUserAddresses = [];
                $.each(data.d, function(index, item) {
                    tempUserAddresses.push(item);
                    if (item.DefaultShipping == 1) {
                        option += "<option value=" + item.AddressID + " selected='selected' class='cssBillingShipping'> ";
                        option += item.FirstName.replace(re, "-") + " " + item.LastName.replace(re, "-");
                        if (item.Address1 != "")
                            option += ", " + item.Address1.replace(re, "-");

                        if (item.City != "")
                            option += ", " + item.City.replace(re, "-");

                        if (item.State != "")
                            option += ", " + item.State.replace(re, "-");

                        if (item.Country != "")
                            option += ", " + item.Country.replace(re, "-");

                        if (item.Zip != "")
                            option += ", " + item.Zip.replace(re, "-");

                        if (item.Email != "")
                            option += ", " + item.Email.replace(re, "-");

                        if (item.Phone != "")
                            option += ", " + item.Phone.replace(re, "-");

                        if (item.Mobile != "")
                            option += ", " + item.Mobile.replace(re, "-");

                        if (item.Fax != "")
                            option += ", " + item.Fax.replace(re, "-");

                        if (item.Website != "")
                            option += ", " + item.Website.replace(re, "-");

                        if (item.Address2 != "")
                            option += ", " + item.Address2.replace(re, "-");

                        if (item.Company != "")
                            option += ", " + item.Company.replace(re, "-");
                    } else {
                        option += "<option value=" + item.AddressID + " class='cssBillingShipping'> ";
                        option += item.FirstName.replace(re, "-") + " " + item.LastName.replace(re, "-");
                        if (item.Address1 != "")
                            option += ", " + item.Address1.replace(re, "-");

                        if (item.City != "")
                            option += ", " + item.City.replace(re, "-");

                        if (item.State != "")
                            option += ", " + item.State.replace(re, "-");

                        if (item.Country != "")
                            option += ", " + item.Country.replace(re, "-");

                        if (item.Zip != "")
                            option += ", " + item.Zip.replace(re, "-");

                        if (item.Email != "")
                            option += ", " + item.Email.replace(re, "-");

                        if (item.Phone != "")
                            option += ", " + item.Phone.replace(re, "-");

                        if (item.Mobile != "")
                            option += ", " + item.Mobile.replace(re, "-");

                        if (item.Fax != "")
                            option += ", " + item.Fax.replace(re, "-");

                        if (item.Website != "")
                            option += ", " + item.Website.replace(re, "-");

                        if (item.Address2 != "")
                            option += ", " + item.Address2.replace(re, "-");

                        if (item.Company != "")
                            option += ", " + item.Company.replace(re, "-");
                    }

                    if (item.DefaultBilling == 1) {
                        optionBilling += "<option value=" + item.AddressID + " selected='selected' class='cssBillingShipping'> ";
                        optionBilling += item.FirstName.replace(re, "-") + " " + item.LastName.replace(re, "-");
                        if (item.Address1 != "")
                            optionBilling += ", " + item.Address1.replace(re, "-");

                        if (item.City != "")
                            optionBilling += ", " + item.City.replace(re, "-");

                        if (item.State != "")
                            optionBilling += ", " + item.State.replace(re, "-");

                        if (item.Country != "")
                            optionBilling += ", " + item.Country.replace(re, "-");

                        if (item.Zip != "")
                            optionBilling += ", " + item.Zip.replace(re, "-");

                        if (item.Email != "")
                            optionBilling += ", " + item.Email.replace(re, "-");

                        if (item.Phone != "")
                            optionBilling += ", " + item.Phone.replace(re, "-");

                        if (item.Mobile != "")
                            optionBilling += ", " + item.Mobile.replace(re, "-");

                        if (item.Fax != "")
                            optionBilling += ", " + item.Fax.replace(re, "-");

                        if (item.Website != "")
                            optionBilling += ", " + item.Website.replace(re, "-");

                        if (item.Address2 != "")
                            optionBilling += ", " + item.Address2.replace(re, "-");

                        if (item.Company != "")
                            optionBilling += ", " + item.Company.replace(re, "-");
                    } else {
                        optionBilling += "<option value=" + item.AddressID + " class='cssBillingShipping'> ";
                        optionBilling += item.FirstName.replace(re, "-") + " " + item.LastName.replace(re, "-");
                        if (item.Address1 != "")
                            optionBilling += ", " + item.Address1.replace(re, "-");

                        if (item.City != "")
                            optionBilling += ", " + item.City.replace(re, "-");

                        if (item.State != "")
                            optionBilling += ", " + item.State.replace(re, "-");

                        if (item.Country != "")
                            optionBilling += ", " + item.Country.replace(re, "-");

                        if (item.Zip != "")
                            optionBilling += ", " + item.Zip.replace(re, "-");

                        if (item.Email != "")
                            optionBilling += ", " + item.Email.replace(re, "-");

                        if (item.Phone != "")
                            optionBilling += ", " + item.Phone.replace(re, "-");

                        if (item.Mobile != "")
                            optionBilling += ", " + item.Mobile.replace(re, "-");

                        if (item.Fax != "")
                            optionBilling += ", " + item.Fax.replace(re, "-");

                        if (item.Website != "")
                            optionBilling += ", " + item.Website.replace(re, "-");

                        if (item.Address2 != "")
                            optionBilling += ", " + item.Address2.replace(re, "-");

                        if (item.Company != "")
                            optionBilling += ", " + item.Company.replace(re, "-");
                    }
                });
                $("#ddlShipping").html('');
                $("#ddlBilling").html('');
                $("#ddlShipping").html(option);
                $("#ddlBilling").html(optionBilling);
                if ($.trim($('#ddlBilling').text()) == "" || $.trim($('#ddlBilling').text()) == null) {

                    $('#addBillingAddress').show();
                } else {
                    $('#addBillingAddress').show();
                }
                if ($.trim($('#ddlShipping').text()) == "" || $.trim($('#ddlShipping').text()) == null) {
                    // alert("Please visit your Dashboard to add Shipping Address!!!");
                    $('#addShippingAddress').show();
                } else {
                    $('#addShippingAddress').show();
                }
            }
        },
        GetCheckoutCartDetails: function(data) { //cart detail load
            CheckOut.QuantitityDiscountAmount();
            var arrRewardtotalPrice = 0;
            rewardRate = parseFloat($("#hdnRewardRate").val());
            var cartHeading = '';
            var cartElements = '';
            cartHeading += '<table class="sfGridWrapperTable" width="100%" border="0" cellpadding="0" cellspacing="0" id="tblCartList">';
            cartHeading += '<tbody><tr class="cssClassHeadeTitle">';
            cartHeading += '<td class="cssClassSN"> Sn.';
            cartHeading += ' </td><td class="cssClassProductImageWidth">';
            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Item Image');
            cartHeading += '</td>';
            //            cartHeading += '<td>';
            //            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Item Name');
            //            cartHeading += '</td>';
            cartHeading += '<td>';
            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Variants');
            cartHeading += '</td>';
            cartHeading += '<td class="cssClassQTY">';
            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Qty');
            cartHeading += '</td>';
            //            cartHeading += '<td class="cssClassTimes">';
            //            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'X');
            //            cartHeading += '</td>';
            cartHeading += '<td class="cssClassProductPrice">';
            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Unit Price');
            cartHeading += '</td>';
            //            cartHeading += '<td class="cssClassEquals">';
            //            cartHeading += '=';
            //            cartHeading += '</td>';
            cartHeading += '<td class="cssClassSubTotal">';
            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Line Total');
            cartHeading += '</td>';
            cartHeading += '<td class="cssClassTaxRate">';
            cartHeading += getLocale(AspxCheckoutWithSingleAddress, 'Unit Tax');
            cartHeading += '</td>';
            cartHeading += '</tr>';
            cartHeading += '</table>';
            CheckOut.Vars.ItemIDs = "";
            $("#divCartDetails").html(cartHeading);
            var giftcardCount = 0;
            basketItems = [];
            $.each(data.d, function(index, value) {

                if (value.ItemTypeID == 1) {
                    var basketItem = {
                        Height: value.Height,
                        ItemName: value.ItemName,
                        Length: value.Length,
                        Width: value.Width,
                        WeightValue: value.Weight,
                        Quantity: value.Quantity
                    };
                    basketItems.push(basketItem);
                }

                itemID = value.ItemID;

                CheckOut.Vars.ItemIDs = CheckOut.Vars.ItemIDs + itemID + '#' + value.CostVariantsValueIDs + ',';
                var CostVariantsValueIDs = '';
                CostVariantsValueIDs = value.CostVariantsValueIDs;
                index = index + 1;
                var imagePath = itemImagePath + value.ImagePath;
                if (value.ImagePath == "") {
                    imagePath = noImageCheckOutInfoPath;
                } else if (value.AlternateText == "") {
                    value.AlternateText = value.Name;
                }
                if (parseInt(value.ItemTypeID) == 2) {
                    CheckOut.UserCart.IsDownloadItemInCart = true;
                    CheckOut.UserCart.CountDownloadableItem++;
                }
                //ie GiftCard
                var isVirtual = false;
                if (parseInt(value.ItemTypeID) == 3) {
                    //var type = ""; // CheckOut.GiftCard.GetGiftCardType(value.ItemID);
                    //if (!CheckOut.UserCart.ShowShippingAdd) {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.UserName = null;
                    aspxCommonInfo.CustomerID = null;
                    aspxCommonInfo.SessionCode = null;
                    aspxCommonInfo.CultureName = null;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        url: aspxservicePath + 'AspxCommerceWebService.asmx/GetGiftCardType',
                        data: JSON2.stringify({ aspxCommonObj: aspxCommonInfo, cartitemId: value.CartItemID }),
                        dataType: "json",
                        success: function(dd) {
                            //type = dd.d;
                            if (dd.d != null) {
                                isVirtual = CheckOut.UserCart.ShowShippingAdd = dd.d == 2 ? false : true;
                                giftcardCount++;
                                if (data.d.length != giftcardCount) {
                                    CheckOut.UserCart.ShowShippingAdd = false;
                                }
                            }
                        }
                    });
                    //  }
                    // CheckOut.UserCart.ShowShippingAdd = type == "both" || type == "physical" ? false : true;
                }

                if (AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.SessionCode = null;
                    var cartTaxOrderObj = {
                        ItemID: itemID,
                        Country: '',
                        State: '',
                        Zip: '',
                        AddressID: CheckOut.Vars.AddressID,
                        CostVariantsValueIDs: CostVariantsValueIDs
                    };
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/GetCartTaxforOrder",
                        data: JSON2.stringify({ cartTaxOrderObj: cartTaxOrderObj, aspxCommonObj: aspxCommonInfo }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function(msg) {

                            //CheckOut.UserCart.objTaxList = [];
                            $.each(msg.d, function(index, val) {
                                if (val.TaxRateValue != 0) {
                                    var objTaxInfo = {
                                        TaxManageRuleId: val.TaxManageRuleID,
                                        ItemID: val.ItemID,
                                        CostVariantsValueIDs: val.CostVariantsValueIDs,
                                        TaxSubTotal: val.TaxRateValue,
                                        StoreID: AspxCommerce.utils.GetStoreID(),
                                        PortalID: AspxCommerce.utils.GetPortalID(),
                                        AddedBy: AspxCommerce.utils.GetUserName()
                                    };
                                    CheckOut.UserCart.objTaxList.push(objTaxInfo);
                                }
                            });
                        }
                    });
                } else {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.SessionCode = null;
                    var cartTaxOrderObj = {
                        ItemID: itemID,
                        Country: CheckOut.Vars.Country,
                        State: $.trim(CheckOut.Vars.State),
                        Zip: CheckOut.Vars.Zip,
                        AddressID: CheckOut.Vars.AddressID,
                        CostVariantsValueIDs: CostVariantsValueIDs
                    };
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/GetCartTaxforOrder",
                        data: JSON2.stringify({ cartTaxOrderObj: cartTaxOrderObj, aspxCommonObj: aspxCommonInfo }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function(msg) {
                            // CheckOut.UserCart.objTaxList = [];
                            $.each(msg.d, function(index, val) {
                                if (val.TaxRateValue != 0) {
                                    var objTaxInfo = {
                                        TaxManageRuleId: val.TaxManageRuleID,
                                        ItemID: val.ItemID,
                                        CostVariantsValueIDs: val.CostVariantsValueIDs,
                                        TaxSubTotal: val.TaxRateValue,
                                        StoreID: AspxCommerce.utils.GetStoreID(),
                                        PortalID: AspxCommerce.utils.GetPortalID(),
                                        AddedBy: AspxCommerce.utils.GetUserName()
                                    };
                                    CheckOut.UserCart.objTaxList.push(objTaxInfo);
                                }
                            });
                        }
                    });
                }

                CheckOut.Vars.Tax = "";
                if (AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.SessionCode = null;
                    var cartUnitTaxObj = {
                        ItemID: itemID,
                        Country: '',
                        State: '',
                        Zip: '',
                        AddressID: CheckOut.Vars.AddressID,
                        CostVariantsValueIDs: CostVariantsValueIDs
                    };
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/GetCartUnitTax",
                        data: JSON2.stringify({ cartUnitTaxObj: cartUnitTaxObj, aspxCommonObj: aspxCommonInfo }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function(msg) {
                            $.each(msg.d, function(index, val) {
                                CheckOut.Vars.Tax = val.TaxRateValue;
                            });
                        }
                    });
                } else {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.SessionCode = null;
                    var cartUnitTaxObj = {
                        ItemID: itemID,
                        Country: $.trim(CheckOut.Vars.Country),
                        State: $.trim(CheckOut.Vars.State),
                        Zip: $.trim(CheckOut.Vars.Zip),
                        AddressID: CheckOut.Vars.AddressID,
                        CostVariantsValueIDs: CostVariantsValueIDs
                    };
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/GetCartUnitTax",
                        data: JSON2.stringify({ cartUnitTaxObj: cartUnitTaxObj, aspxCommonObj: aspxCommonInfo }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function(msg) {
                            $.each(msg.d, function(index, val) {
                                CheckOut.Vars.Tax = val.TaxRateValue;
                            });
                        }
                    });
                }

                CheckOut.UserCart.CountAllItem++;
                cartElements += '<tr >';
                cartElements += '<td><input type="hidden" name="cartItemId" value=' + value.CartItemID + ' />';
                cartElements += '<b>' + index + "." + '</b>';
                cartElements += '</td>';
                cartElements += '<td>';
                cartElements += '<p class="cssClassCartPicture">';
                cartElements += '<img title="' + value.AlternateText + '" src="' + AspxCommerce.utils.GetAspxRootPath() + imagePath.replace('uploads', 'uploads/Small') + '" ></p>';
                //                cartElements += '</td>';
                //                cartElements += '<td>';
                cartElements += '<div class="cssClassCartPictureInformation">';
                cartElements += '<h3>';
                if (value.CostVariantsValueIDs != '') {
                    cartElements += '<a class="cssClassLink" id="item_' + value.ItemID + '" itemType="' + value.ItemTypeID + '"  href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + value.SKU + pageExtension + '?varId=' + value.CostVariantsValueIDs + '">' + value.ItemName + ' </a></h3>';
                } else {

                    if (parseInt(value.ItemTypeID) == 3) {
                        cartElements += '<a class="cssClassLink" id="item_' + value.ItemID + '" isvirtual=' + isVirtual + ' itemType="' + value.ItemTypeID + '"  href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + value.SKU + pageExtension + '">' + value.ItemName + ' </a></h3>';
                    } else {
                        cartElements += '<a class="cssClassLink" id="item_' + value.ItemID + '"  itemType="' + value.ItemTypeID + '"  href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + value.SKU + pageExtension + '">' + value.ItemName + ' </a></h3>';

                    }
                }
                //cartElements += '<p>';
                //cartElements += '<textarea  id="itemDes" readonly="readonly" style="width: 153px; height: 75px;">' + Encoder.htmlDecode(value.ShortDescription) + '</textarea>';
                //cartElements += '' + Encoder.htmlDecode(value.ShortDescription) + '';
                //cartElements += '</p>';
                cartElements += '</div>';
                cartElements += '</td>';
                cartElements += '<td class="row-variants" varIDs="' + value.CostVariantsValueIDs + '">';
                cartElements += '' + value.CostVariants + '';
                cartElements += '</td>';
                cartElements += '<td class="cssClassPreviewQTY">';
                cartElements += '<input class="num-pallets-input" taxrate="' + (CheckOut.Vars.Tax) + '" price="' + value.Price + '" id="txtQuantity_' + value.CartID + '" type="text" readonly="readonly" disabled="disabled" value="' + value.Quantity + '">';
                cartElements += '</td>';
                //                cartElements += '<td class="cssClassTimes">';
                //                cartElements += ' X';
                //                cartElements += '</td>';
                cartElements += '<td class="price-per-pallet">';
                cartElements += '<span id="' + value.Weight + '" class="cssClassFormatCurrency">' + (value.Price * rate).toFixed(2) + '</span>';
                cartElements += '</td>';
                //                cartElements += '<td class="cssClassEquals">';
                //                cartElements += '=';
                //                cartElements += '</td>';
                cartElements += '<td class="row-total">';
                cartElements += '<input class="row-total-input cssClassFormatCurrency" id="txtRowTotal_' + value.CartID + '"  value="' + (value.TotalItemCost * rate).toFixed(2) + '" baseValue="' + (value.TotalItemCost).toFixed(2) + '"  readonly="readonly" type="text" />';
                cartElements += '</td>';
                cartElements += '<td class="row-taxRate">';
                cartElements += '<span class="cssClassFormatCurrency">' + (CheckOut.Vars.Tax * rate).toFixed(2) + '</span>';
                cartElements += '</td>';
                cartElements += '</tr>';
                CheckOut.UserCart.CartID = value.CartID;
                arrRewardtotalPrice = arrRewardtotalPrice + parseFloat((value.TotalItemCost * value.Quantity * rate).toFixed(2));


            });


            $("#tblCartList").append(cartElements);
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            $("#tblCartList tr:even ").addClass("sfEven");
            $("#tblCartList tr:odd ").addClass("sfOdd");
            CheckOut.BindFunction();
            CheckOut.AssignItemsDetails();

        },
        BindFunction: function() {

            CheckOut.GetTaxRate(CheckOut.Vars.ItemIDs.substring(0, CheckOut.Vars.ItemIDs.length - 1));

            var baseSubTotalAmount = 0.00;
            var subTotalAmount = 0.00;
            $(".row-total-input").each(function() {
                subTotalAmount = parseFloat(subTotalAmount) + parseFloat($(this).val().replace(/[^-0-9\.]+/g, ""));
                baseSubTotalAmount = parseFloat(baseSubTotalAmount) + parseFloat($(this).attr("baseValue").replace(/[^-0-9\.]+/g, ""));
                $.cookies.set('Total', subTotalAmount.toFixed(2).replace(/[^-0-9\.]+/g, ""));
            });

            CheckOut.UserCart.Tax = 0.00;
            $(" .cssClassPreviewQTY .num-pallets-input").each(function() {
                CheckOut.UserCart.Tax += $(this).val() * $(this).attr("taxrate");
            });

            CheckOut.SetSessionValue("TaxAll", CheckOut.UserCart.Tax);
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            $(".total-box").val('').attr("value", subTotalAmount.toFixed(2));
            CheckOut.UserCart.baseSubTotalAmt = baseSubTotalAmount.toFixed(2);
            CheckOut.Vars.temptotal = subTotalAmount.toFixed(2);
            //  alert(subTotalAmount.toFixed(2));


            if ($('#lnkMyCart').find('.cssClassTotalCount').text().replace('[', '').replace(']', '') == '0') {
                $('.cssClassAccordionWrapper').hide();
                $('.cssClassRightAccordainTab').hide();
                $('.cssClassBodyContentWrapper').append("<div id ='msgnoitem' class='cssClassCommonBox Curve'><div class='cssClassHeader'><h2> <span id='spnheader'>" + getLocale(AspxCheckoutWithSingleAddress, "Message") + " </span></h2> <div class='cssClassClear'> </div></div><div class='sfGridwrapper'><div class='sfGridWrapperContent'><h3>" + getLocale(AspxCheckoutWithSingleAddress, "No Items found in your Cart") + "</h3><div class='sfButtonwrapper'><button type='button' id='btnContinueInStore' class='sfBtn'><span><span>" + getLocale(AspxCheckoutWithSingleAddress, "Continue to Shopping") + "</span></span></button></div><div class='cssClassClear'></div></div></div></div>");

                $("#btnContinueInStore").bind("click", function() {
                    if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                        window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + homeURL + pageExtension;
                    } else {
                        window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + homeURL;
                    }
                    return false;
                });
            }
            CheckOut.Vars.len = $('#txtTotalCost').val().replace(/\d+/g, '').replace(/,/g, '').replace(' ', '').length;
            $('.cssClassCartPicture img[title]').tipsy({ gravity: 'n' });
            CheckOut.AssignItemsDetails();
            CheckOut.CheckDownloadableOnlyInCart();
        },

        SetDiscountPriceRule: function(data) { //cart discount
            if (data.d.length > 0) {
                //alert(msg.d);
                CheckOut.UserCart.CartDiscount = parseFloat(data.d).toFixed(2);
            }
        },

        BindShippingMethodByWeight: function(data) {
            var shippingmethodId = 0;
            var shippingHeading = '';
            var shippingMethodElements = '';
            shippingHeading += '<table width="100%" cellspacing="0" cellpadding="0" border="0">';
            shippingHeading += '<tbody><tr class="cssClassHeadeTitle">';
            shippingHeading += '<td colspan="4" >' + getLocale(AspxCheckoutWithSingleAddress, "Shipping Method(s)") + '</td>';
            shippingHeading += '</tr></tbody></table>';
            $("#divShippingMethod").html(shippingHeading);

            if (data.d.length == 0) {
                $('#divShippingMethod table>tbody').append("<tr><td>" + getLocale(AspxCheckoutWithSingleAddress, "Items' weight in your cart doesn't meet the shipping provider weight criteria Or") + " " + getLocale(AspxCheckoutWithSingleAddress, "Shipping providers are unable to ship items!") + "</td></tr>");
                $('#btnShippingMethodContinue').hide();
            }

            $.each(data.d, function(index, value) {

                shippingMethodElements += '<tr ><td><label><input name="shippingRadio" type="radio" value="' + value.ShippingMethodId + '" shippingName="' + value.ShippingMethodName + '" shippingCost=" ' + value.TotalCharges + '"/>';
                if (value.ImagePath != "") {
                    shippingMethodElements += '<p class="cssClassCartPicture"><img  alt="" src="' + aspxRootPath + value.ImagePath.replace('uploads', 'uploads/Small') + '" height="83px" width="124px" /></p>';
                }
                // shippingMethodElements += '<td>';
                shippingMethodElements += '<div class="cssClassCartPictureInformation">';
                shippingMethodElements += '<h3>' + value.ShippingMethodName + '</h3>';
                shippingMethodElements += '<p><b>Delivery Time: ' + value.DeliveryTime + '</b></p>';
                shippingMethodElements += '</div></label></td>';
                shippingMethodElements += '<tr><td id="Fshipping" shippingCost=' + value.ShippingCost + '><p><b>' + getLocale(AspxCheckoutWithSingleAddress, 'Shipping & Handling Cost:') + '&nbsp;<span class="cssClassFormatCurrency">' + value.TotalCharges * rate + '</span></b></p></td></tr>';

                shippingMethodElements += '</tr>';
                if (index == 0) {
                    shippingmethodId = value.ShippingMethodId;
                }
            });

            $("#divShippingMethod").find("table>tbody").append(shippingMethodElements);
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
            $("#divShippingMethod").find("table>tbody tr:even").addClass("sfEven");
            $("#divShippingMethod").find("table>tbody tr:odd").addClass("sfOdd");
            if (CheckOut.UserCart.IsFShipping.toLowerCase() == 'true') {
                $('#Fshipping p b').html('');
                $('#Fshipping p b').html('Shipping Cost: 0.00 (free shipping)');
                $('#txtShippingTotal').val('0.00');
                CheckOut.UserCart.spCost = 0.00;
            }
            //$("input[type='radio'][name='shippingRadio'][value=" + shippingmethodId + "]").attr("checked", "checked");
            // $("#txtShippingTotal").val('').val($("input[type='radio'][name='shippingRadio'][value=" + shippingmethodId + "]").attr("shippingCost"));
            CheckOut.UserCart.spMethodID = shippingmethodId;

            $("input[type='radio'][name='shippingRadio']").bind("change", function() {
                $(this).attr("checked", "checked");
                CheckOut.UserCart.spMethodID = $(this).attr("value");
                CheckOut.UserCart.spCost = $(this).attr("shippingCost");
                CheckOut.UserCart.spName = $(this).attr("shippingName");
                //CheckOut.SetSessionValue("ShippingMethodName", $(this).attr("shippingName"));
                CheckOut.GetDiscountCartPriceRule(CheckOut.UserCart.CartID, CheckOut.UserCart.spCost);
                $("#txtShippingTotal").val('').val(($(this).attr("shippingCost")) * rate);
                if (CheckOut.UserCart.IsFShipping.toLowerCase() == 'true') {
                    $('#Fshipping p b').html('');
                    $('#Fshipping p b').html('Shipping Cost: 0.00 (free shipping)');
                    $('#txtShippingTotal').val('0.00');
                    CheckOut.UserCart.spCost = 0.00;
                }
                $("#txtTotalCost").val(parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate) - eval(CheckOut.UserCart.RewardPointsDiscount * rate));
                //CheckOut.UserCart.spCost = $("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "");
            });
            //  $('#txtDiscountAmount').val(parseFloat(CheckOut.UserCart.TotalDiscount * rate + CheckOut.UserCart.CartDiscount * rate).toFixed(2));
            $('#txtDiscountAmount').val(parseFloat(eval(CheckOut.UserCart.TotalDiscount * rate) + eval(CheckOut.UserCart.CartDiscount * rate)).toFixed(2));
            //$('#txtCouponDiscountAmountValue').val(parseFloat(eval(CheckOut.UserCart.CouponDiscountAmount * rate)));
            var couponCount = CheckOut.UserCart.CouponAppliedCount;
            var baseSubTotalAmount = CheckOut.UserCart.baseSubTotalAmt;
            var percentValue = CheckOut.UserCart.CouponPercentValue;
            var couponDiscount = 0;
            if (CheckOut.UserCart.IsCouponInPercent == 1) {
                for (var i = 0; i < couponCount; i++) {
                    var disAmount = ((baseSubTotalAmount - Discount) * percentValue) / 100;
                    couponDiscount += ((baseSubTotalAmount - Discount) * percentValue) / 100;
                    //   baseSubTotalAmount = baseSubTotalAmount - couponDiscount;
                    baseSubTotalAmount = baseSubTotalAmount - disAmount;
                    CheckOut.UserCart.CouponDiscountAmount = couponDiscount;
                }
                //  var couponDiscount = (CheckOut.UserCart.baseSubTotalAmt) * (CheckOut.UserCart.CouponPercentValue) / 100;
                $('#txtCouponDiscountAmountValue').val(parseFloat(eval(couponDiscount * rate)));
                $("#txtTotalCost").val(parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(couponDiscount * rate) - eval(CheckOut.UserCart.RewardPointsDiscount * rate));

            } else {
                $('#txtCouponDiscountAmountValue').val(parseFloat(eval(CheckOut.UserCart.CouponDiscountAmount * rate)));
                $("#txtTotalCost").val(parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate) - eval(CheckOut.UserCart.RewardPointsDiscount * rate));

            }
            //  $("#txtTotalCost").val(parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate));

        },

        BindStateList: function(data) { //bind state
            if (data.d.length > 0) {
                $("#ddlSPState").html('');
                $('#ddlBLState').html('');
                $('#popuprel .sfFormwrapper table #ddlBLState').html('');
                $.each(data.d, function(index, item) {
                    if (item.Text != 'NotExists') {
                        var option = '';
                        option += "<option class='cssBillingShipping'> " + item.Text + "</option>";
                        $('#ddlBLState').append(option);
                        $('#popuprel .sfFormwrapper table #ddlBLState').append(option);
                        $('#ddlSPState').append(option);
                        $('#popuprel .sfFormwrapper table #ddlSPState').append(option);
                        $('#ddlBLState').show();
                        $('#txtState').hide();
                        $('#ddlSPState').show();
                        $('#txtSPState').hide();
                        $('#popuprel .sfFormwrapper table #ddlBLState').show();
                        $('#popuprel .sfFormwrapper table #txtState').hide();
                        $('#popuprel .sfFormwrapper table #ddlSPState').show();
                        $('#popuprel .sfFormwrapper table #txtSPState').hide();
                    } else {
                        $('#ddlSPState').hide();
                        $('#txtSPState').show();
                        $('#ddlBLState').hide();
                        $('#txtState').show();
                        $('#popuprel .sfFormwrapper table #ddlBLState').hide();
                        $('#popuprel .sfFormwrapper table #txtState').show();
                        $('#popuprel .sfFormwrapper table #ddlSPState').hide();
                        $('#popuprel .sfFormwrapper table #txtSPState').show();
                    }
                });
            }
        },

        BindCountryList: function(data) { //bind country
            if (data.d.length > 0) {
                $('#ddlBLCountry').html('');
                $('#ddlSPCountry').html('');
                $.each(data.d, function(index, item) {
                    var option = '';
                    option += "<option class='cssBillingShipping' value=" + item.Value + "> " + item.Text + "</option>";
                    $('#ddlBLCountry').append(option);
                    $('#ddlSPCountry').append(option);
                });
            }
        },

        SetDiscountQuantityAmount: function(data) {
            CheckOut.UserCart.TotalDiscount = parseFloat(data.d).toFixed(2);
        },

        BindUserAddressOnUpdate: function() {
            CheckOut.BindUserAddress();
            $('#addBillingAddress ,#addShippingAddress').show();
            $('#fade, #popuprel').fadeOut();
        },

        SaveUserEmail: function(email, userModuleID, portalID, userName, userIP) {
            if (CheckOut.CheckPreviousEmailSubscription(email)) {
                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "You are already a subscribed member") + "</p>");
                return false;
            }
            $.ajax({
                type: "POST",
                url: aspxservicePath + "AspxCommerceWebService.asmx/SaveEmailSubscriber",
                data: JSON2.stringify({ email: email, userModuleID: userModuleID, portalID: portalID, userName: userName, clientIP: userIP }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function(msg) {
                    csscody.info("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Email Subscribed Successfully") + "</p>");
                }
            });
        },

        CheckPreviousEmailSubscription: function(email) {
            var bitval = true;
            $.ajax({
                type: "POST",
                async: false,
                url: aspxservicePath + "AspxCommerceWebService.asmx/CheckPreviousEmailSubscription",
                data: JSON2.stringify({ email: email }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    if (data.d.length > 0) {
                        bitval = true;
                    } else {
                        bitval = false;
                    }

                },
                error: function() {
                }
            });
            return bitval;
        },

        BindTaxRate: function(data) { //TaxRate with TaxRuleName

            var htmlTaxRuleName = '';
            var htmlTaxRateValue = '';
            $.each(data.d, function(index, value) {
                if (value.TaxRateValue > 0) {
                    $('.classDetailTaxRuleName').empty();
                    $('.classDetailTaxRateValue').empty();
                    htmlTaxRuleName += '<label><strong class="sfLocale">' + value.TaxManageRuleName + ':' + '</strong></label><br/><br/>';
                    htmlTaxRateValue += '<label class="cssClassFormatCurrency sfLocale">' + (value.TaxRateValue * rate).toFixed(2) + '</label><br/><br/>';
                }
            });
            $('.classDetailTaxRuleName').append(htmlTaxRuleName);
            $('.classDetailTaxRateValue').append(htmlTaxRateValue);
        },

        GetPaymentGateWayLoadErrorMsg: function() { //load control                   
            csscody.error("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Error Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Failed to load payment gateway!") + "</p>");
        },
        GetAddressLoadErrorMsg: function() { //address bind                  
            csscody.error("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Error Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Failed loading address...please hit refresh") + "</p>");
        },
        GetDiscountPriceLoadErrorMsg: function() {
            csscody.error("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Error Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Error occured while using cart discount") + "</p>");
        },
        GetShippingMethodLoadErrorMsg: function() { //shipping method by weight                 
            // csscody.error("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Error Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Failed to load shipping method") + "</p>");
        },

        GiftCard: function() {

            var $ajaxCall = function(method, param, successFx, error) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    url: aspxservicePath + 'AspxCommerceWebService.asmx/' + method,
                    data: param,
                    dataType: "json",
                    success: successFx,
                    error: error
                });
            };
            //need to check after click event of btnShippingMethodContinue
            //$("#dvPGList").html('')
            var recentlyUsedGiftCard = [];
            var cartTotal = 0;
            var tempPayment;
            var parsestrToBool = function(input) {
                try {
                    return !!$.parseJSON(input.toLowerCase());
                } catch (e) {
                }
            };

            var checkGiftCardUsed = function() {
                var allowtocheckout = true;
                for (var i = 0; i < recentlyUsedGiftCard.length; i++) {
                    if (allowtocheckout == false)
                        break;
                    var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), giftCardCode: recentlyUsedGiftCard[i].GiftCardCode, amount: recentlyUsedGiftCard[i].ReducedAmount });
                    $ajaxCall("CheckGiftCardUsed", param, function(data) {
                        // allowtocheckout = data.d.GiftCardCode;
                        // data.d.AllowToCheckOut;
                        allowtocheckout = data.d;
                        if (allowtocheckout == false) {
                            resetGiftCard();
                        }
                        //clear gift card session
                    });

                }
                return allowtocheckout;
            };
            var addGiftCardInPayment = function(isTotalZero, restamount) {

                if (isTotalZero) {
                    tempPayment = $("#dvPGList").clone();
                    $("#dvinfo").remove();
                    var gC = $("input[name=PGLIST][realname=GiftCard]").parents('label:eq(0)');
                    $("#dvPGList").find('label').not($("input[name=PGLIST][realname=GiftCard]").parents('label:eq(0)')).remove();
                    $("#dvPGList br").remove();
                    $("#dvPaymentInfo").find('div.sfFormwrapper').hide();
                    $("input[name=PGLIST][realname=GiftCard]").trigger('click');
                    var dvInfo = $("<div id=dvinfo>").html("<p>Gift Card has been applied to your cart </p><p> your toal due amount " + ' ' + restamount + " .</p>");
                    $("#dvPaymentInfo").append(dvInfo);
                } else {
                    //show info
                    ///restamount;
                    $("#btnPlaceOrderGiftCard").remove();
                    $("#dvPaymentInfo").find('div.sfFormwrapper').show();
                    $("#dvinfo").remove();
                    var dvInfo = $("<div id=dvinfo>").html("<p>Gift Card has been applied to your cart </p><p> your toal due amount " + restamount + " .</p><p> To checkout you can still apply giftcard or choose another payment option</p>");
                    // var dvInfo = $("<div id=dvinfo>").html("<p>" + getLocale(AspxGiftCard, 'Gift Card has been applied to your cart') + "</p><p>" + getLocale(AspxGiftCard, 'your toal due amount') + restamount + " .</p><p>" + getLocale(AspxGiftCard, 'To checkout you can still apply giftcard or choose another payment option') + "</p>");
                    $("#dvPaymentInfo").append(dvInfo);
                }
            };
            var getGiftCardSesion = function() {
                CheckOut.UserCart.IsGiftCardUsed = false;
                var param = JSON2.stringify({ key: "UsedGiftCard" });
                $ajaxCall("GetSessionGiftCard", param, isGiftCardUsedf, null);
            };
            var isGiftCardUsedf = function(data) {
                $(".cssClassGiftCard").remove();
                recentlyUsedGiftCard = [];
                cartTotal = 0;
                if (data.d != "" && data.d != null) {
                    $(".cssClassGiftCard").remove();
                    recentlyUsedGiftCard = [];
                    CheckOut.UserCart.IsGiftCardUsed = true;
                    $.each(data.d, function(index, value) {
                        CheckOut.UserCart.IsGiftCardUsed = true;
                        recentlyUsedGiftCard.push(value);
                        var id = setTimeout(function() {
                            applyGiftCardFromSession(recentlyUsedGiftCard[index]);

                        }, 200);
                        // clearTimeout(id);
                    });

                } else {
                    CheckOut.UserCart.IsGiftCardUsed = false;
                    $("#btnPlaceOrderGiftCard").remove();
                }
            };
            var checkUsed = function(arr, code) {
                var isExist = false;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].GiftCardCode == code) {
                        isExist = true;
                        break;
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
            var getGiftCardType = function(itemid) {
                var type;
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                aspxCommonInfo.CultureName = null;
                aspxCommonInfo.SessionCode = null;
                aspxCommonInfo.CustomerID = null;
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonInfo, itemId: itemid });
                $ajaxCall("GetGiftCardType", param, function(data) {
                    type = data.d;
                },
                    null);
                return type;
            };

            var getTotalGiftCardAmount = function() {
                var total = 0;
                for (var i = 0; i < recentlyUsedGiftCard.length; i++) {
                    total += parseFloat(recentlyUsedGiftCard[i].ReducedAmount);
                }
                return total;
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
            var resetGiftCard = function() {
                var param = JSON2.stringify({ key: "UsedGiftCard", value: [] });
                $ajaxCall("SetSessionVariable", param, null, null);
                recentlyUsedGiftCard = [];
                $("#dvinfo").remove();
                CheckOut.BindFunction();
                //activate paymnet tab
                $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                $accor.tabs('select', 4);
                $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Amount has been reduced from your gift card by other user!.") + "</p>");

            };

            var applyGiftCardFromSession = function(veriftication) {
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
                    csscody.info("<h2>" + getLocale("Information Message") + "</h2><p>" + getLocale("Gift Card removed successfully!") + "</p>");
                    //AspxCart.GetUserCartDetails();
                    // debugger
                    $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                    $accor.tabs('select', 4);
                    $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                    CheckOut.LoadPGatewayList();
                    $('#dvPGList input[name="PGLIST"]:first').trigger('click');
                    getGiftCardSesion();
                    $("#btnPlaceOrderGiftCard").remove();
                    $("#dvinfo").remove();

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
            var init = function() {
                getGiftCardSesion();
            };
            var clearGiftCard = function() {
                var param = JSON2.stringify({ key: "UsedGiftCard", value: [] });
                $ajaxCall("SetSessionVariable", param, null, null);
            };
            var getglist = function() {
                return recentlyUsedGiftCard;
            };

            return {
                Init: init,
                GiftCardList: getglist,
                GetGiftCardAmount: getTotalGiftCardAmount,
                GetGiftCardType: getGiftCardType,
                CheckGiftCardIsUsed: checkGiftCardUsed,
                ResetGiftCard: function() {
                }
            };
        } (),
        GetGeneralSettings: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "GetGeneralSetting";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.async = false;
            this.config.ajaxCallMode = CheckOut.BindGeneralSettings;
            this.config.error = CheckOut.GeneralSettingsError;
            this.ajaxCall(this.config);
        },
        BindGeneralSettings: function(msg) {
            if (msg.d) {
                $.each(msg.d, function(index, item) {
                    if (item.IsActive == true) {
                        CheckOut.UserCart.RewardPointsDiscount = 0;
                        CheckOut.UserCart.UsedRewardPoints = 0;
                        $("#hdnRewardRate").val(item.RewardPointsEarned / item.AmountSpent);
                        $("#hdnRate").val(item.RewardExchangeRate / item.RewardPoints);
                        CheckOut.RewardRuleIsActive();
                        CheckOut.GetSessionValueForRewardPoints();
                        //CheckOut.GetSessionValueForReward();
                        $("#trDiscountReward").show();

                    }
                });
            }
        },
        GeneralSettingsError: function() {
            csscody.error("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Error Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Failed to load reward points setting values!") + "</p>");
        },
        GetSessionValueForRewardButtonClick: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "RewardPointsIschecked";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ key: 'btnRewardPoints' });
            this.config.ajaxCallMode = CheckOut.SetBtnReward;
            this.config.async = false;
            this.ajaxCall(this.config);
        },
        SetBtnReward: function(msg) {
            rewardPointsIsCliked = msg.d;
            if (rewardPointsIsCliked == true) {
                CheckOut.GetSessionValueForRewardPoints();
            } else {
                //CheckOut.UserCart.RewardPointsDiscount = 0;
                //CheckOut.UserCart.UsedRewardPoints = 0;
                //$("#txtRewardAmount").val(CheckOut.UserCart.RewardPointsDiscount);
                //rewardPointsIsCliked = false;
            }
        },
        GetSessionValueForRewardPoints: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "RewardPointsSelectedValue";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ key: 'btnRewardPointsValue' });
            this.config.ajaxCallMode = CheckOut.SetBtnRewardPoints;
            this.config.async = false;
            this.ajaxCall(this.config);
        },
        SetBtnRewardPoints: function(msg) {
            rewardPointsSliderSelectedValue = msg.d;
            if (rewardPointsSliderSelectedValue > 0) {
                CheckOut.UserCart.RewardPointsDiscount = rewardPointsSliderSelectedValue * parseFloat($("#hdnRate").val()).toFixed(2);
                CheckOut.UserCart.UsedRewardPoints = rewardPointsSliderSelectedValue;
                $("#txtRewardAmount").val(CheckOut.UserCart.RewardPointsDiscount * rate);
            } else {
                CheckOut.UserCart.RewardPointsDiscount = 0;
                CheckOut.UserCart.UsedRewardPoints = 0;
                //$("#txtRewardAmount").val(CheckOut.UserCart.RewardPointsDiscount);
            }
        },
        GetSessionValueForReward: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "RewardPointsIschecked";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ key: 'chkRewardPoints' });
            this.config.ajaxCallMode = CheckOut.SetchkReward;
            this.config.async = false;
            this.ajaxCall(this.config);
        },
        SetchkReward: function(msg) {
            rewardPointsIsChecked = msg.d;
            if (rewardPointsIsChecked == true) {
                //  CheckOut.UserCart.RewardPointsDiscount = CheckOut.UserCart.RewardPointsDiscount;
                // CheckOut.UserCart.UsedRewardPoints = CheckOut.UserCart.UsedRewardPoints;
                $("#txtRewardAmount").val(CheckOut.UserCart.RewardPointsDiscount * rate);
            } else {
                CheckOut.UserCart.RewardPointsDiscount = 0;
                CheckOut.UserCart.UsedRewardPoints = 0;
                //$("#txtRewardAmount").val(CheckOut.UserCart.RewardPointsDiscount);
                //rewardPointsIsChecked = false;
            }
        },
        RewardRuleIsActive: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "IsPurchaseActive";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = CheckOut.RewardRuleBind;
            this.config.error = CheckOut.RewardRuleError;
            this.ajaxCall(this.config);
        },
        RewardRuleBind: function(msg) {
            if (msg.d) {
                CheckOut.UserCart.IsPurchaseActive = msg.d;
            }
        },
        RewardRuleError: function() {
            csscody.error("<h2>" + getLocale(AspxCartLocale, "Error Message") + "</h2><p>" + getLocale(AspxCartLocale, "Failed to bind reward rules!") + "</p>");
        },
        IsModuleInstalled: function() {
            var rewardPoints = 'AspxRewardPoints';
            var aspxCommonInfo = aspxCommonObj();
            $.ajax({
                type: "POST",
                url: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/" + "GetModuleInstallationInfo",
                data: JSON2.stringify({ moduleFriendlyName: rewardPoints, aspxCommonObj: aspxCommonInfo }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function(response) {
                    var isInstalled = response.d;

                    if (isInstalled == true) {
                        //CheckOut.RewardRuleIsActive();
                        CheckOut.GetGeneralSettings();
                        // CheckOut.GetSessionValueForReward();
                        //$("#trDiscountReward").show();
                    } else {
                        $("#hdnRewardRate").val(0);
                    }
                },
                error: function() {
                    csscody.error('<h2>' + getLocale(AspxCheckoutWithSingleAddress, 'Error Message') + '</h2><p>' + getLocale(AspxCheckoutWithSingleAddress, 'Failed to load module installation information!.') + '</p>');
                }
            });
        },
        Init: function() {
            // CheckOut.IsModuleInstalled();
            $('#dvBilling .cssClassCheckBox').show();
            $('#addBillingAddress').show();
            $('#addShippingAddress').show();
            var register = "";
            var checkouturl = "";
            if (AspxCommerce.utils.IsUserFriendlyUrl()) {
                register = 'sf/sfRegister' + pageExtension;
                checkouturl = singleAddressCheckOutURL + pageExtension;
            } else {
                register = 'sf/sfRegister';
                checkouturl = singleAddressCheckOutURL;
            }
            $('.cssClassRegisterlnk').html('<a href ="' + AspxCommerce.utils.GetAspxRedirectPath() + register + '?ReturnUrl=' + AspxCommerce.utils.GetAspxRedirectPath() + checkouturl + '"><span class="cssClassRegisterLink">Register</span></a>');

            $accor = $("#tabs").tabs({ active: 0, disabled: [1, 2, 3, 4, 5] });
            var $billingSelect = $('#dvBillingSelect');
            var $billingInfo = $('#dvBillingInfo');
            var $shippingSelect = $('#dvShippingSelect');
            var $shippingInfo = $('#dvShippingInfo');

            //  CheckOut.GetCountry();
            $('#ddlBLState').hide();
            $('#ddlSPState').hide();
            //CheckOut.GetState();
            //CheckOut.GetUserCartDetails();
            // CheckOut.GetShippinMethodsFromWeight();
            // CheckOut.LoadPGatewayList();
            $('#dvLogin').hide();
            $('#lblAuthCode').hide();
            $('#txtAuthCode').hide();
            $billingSelect.hide();
            $shippingSelect.hide();
            //$('#txtPhone').mask("99-99999999");
            if (showSubscription.toLowerCase() == 'true') {
                $('#chkNewLetter').parent("label:eq(0)").show();
                $('#chkNewLetter').bind('click', function() {
                    var userModuleID = 0;
                    if ($(this).is(':checked') == true) {
                        $.ajax({
                            type: "POST",
                            url: aspxservicePath + "AspxCommerceWebService.asmx/GetUserBillingEmail",
                            data: JSON2.stringify({ addressID: $('#ddlBilling option:selected').val(), aspxCommonObj: aspxCommonObj() }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function(msg) {
                                var email = '';
                                //$.each(msg.d, function(index, item) {
                                if (AspxCommerce.utils.GetUserName().toLowerCase() != 'anonymoususer') {
                                    email = msg.d;
                                } else {
                                    email = $("#txtEmailAddress").val();
                                }
                                //string email, int usermoduleID, int portalID, string userName, string clientIP
                                CheckOut.SaveUserEmail(email, userModuleID, AspxCommerce.utils.GetPortalID(), AspxCommerce.utils.GetUserName(), userIP);
                                // });
                            }
                        });
                    } else {

                    }
                });
            } else {
                $('#chkNewLetter').parent("label:eq(0)").remove();
            }

            if (AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                //CheckOut.BindUserAddress();
                $billingInfo.hide();
                $billingSelect.show();
                CheckOut.UserCart.isUserGuest = false;
                $accor = $("#tabs").tabs({ active: 1, disabled: [0, 2, 3, 4, 5] });
                $accor.tabs('select', 1);
                $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
                $('#btnBillingBack').hide();
                if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                    $('#dvBilling .cssClassCheckBox').hide();
                } else {
                    $('#dvBilling .cssClassCheckBox').show();
                }

            } else {
                $('#btnBillingBack').show();
            }

            if (CheckOut.UserCart.TotalDiscount == 0) {
                CheckOut.QuantitityDiscountAmount();
            }

            $('#rdbRegister').bind("click", function() {
                $('#btnCheckOutMethodContinue').hide();
                $('#dvLogin').show();
                CheckOut.UserCart.isUserGuest = false;
            });
            $('#rdbGuest').bind("click", function() {
                $('#btnCheckOutMethodContinue').show();
                $('#dvLogin').hide();
                $('#txtLoginEmail').val('');
                $('#loginPassword').val('');
                CheckOut.UserCart.isUserGuest = true;
            });
            var v = $("#form1").validate({
                messages: {
                    FirstName: {
                        required: '*',
                        minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                        maxlength: "*"
                    },
                    LastName: {
                        required: '*',
                        minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                        maxlength: "*"
                    },
                    Email: {
                        required: '*',
                        email: '' + getLocale(AspxCheckoutWithSingleAddress, 'Please enter valid email id') + ''
                    },
                    Address1: {
                        required: '*',
                        minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + ""
                    },
                    Address2: {
                        required: '*',
                        minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + ""
                    },
                    Phone: {
                        required: '*',
                        maxlength: "*",
                        minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 7 chars)") + ""
                        //number: true
                    },
                    Company: {
                        maxlength: "*"
                    },
                    mobile: {
                        maxlength: "*",
                        minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 10 digits)") + ""
                        //number: true
                    },
                    Fax: {



                    //number: true
                },
                City: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                stateprovince: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                biZip: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 4 chars)") + "",
                    maxlength: "*" //number: true
                },
                spFName: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                spLName: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                spAddress1: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                spAddress2: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                spCountry: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 4 chars)") + ""
                },
                spCity: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                SPCompany: {
                    maxlength: "*"
                },
                spZip: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 4 chars)") + "",
                    maxlength: "*"
                },
                spstateprovince: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 2 chars)") + "",
                    maxlength: "*"
                },
                spPhone: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 7 chars)") + ""
                },
                spmobile: {
                    maxlength: "*",
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 10 digits)") + ""
                },
                cardCode: {
                    required: '*',
                    minlength: "* " + getLocale(AspxCheckoutWithSingleAddress, "(at least 3 chars)") + ""
                }
            },
            rules:
                    {
                        creditCard: {
                            required: true,
                            creditcard: true
                        },
                        FirstName: { minlength: 2 },
                        LastName: { minlength: 2 },
                        Address1: { minlength: 2 },
                        Address2: { minlength: 2 },
                        Phone: { minlength: 7 },
                        mobile: { minlength: 10 },
                        City: { minlength: 2 },
                        stateprovince: { minlength: 2 },
                        biZip: { minlength: 4 },
                        spFName: { minlength: 2 },
                        spLName: { minlength: 2 },
                        spAddress1: { minlength: 2 },
                        spAddress2: { minlength: 2 },
                        spCountry: { minlength: 4 },
                        spCity: { minlength: 2 },
                        spZip: { minlength: 4 },
                        spstateprovince: { minlength: 2 },
                        spPhone: { minlength: 7 },
                        spmobile: { minlength: 10 },
                        cardCode: { minlength: 3 }
                    },
            ignore: ":hidden"
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

        $('#btnCheckOutMethodContinue').bind("click", function() {
            if (v.form()) {
                if ($('#rdbGuest').attr('checked') == true) {
                    $accor = $("#tabs").tabs({ disabled: [0, 2, 3, 4, 5] });
                    $accor.tabs('select', 1);
                    $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
                    $billingInfo.show();
                    if (CheckOut.UserCart.isUserGuest) {
                        $("#trShippingAddress").hide();
                        $("#trBillingAddress").hide();
                        $("#chkNewLetter").parent().parent().hide();
                    }
                    $billingSelect.hide();
                    if ($('#rdbGuest').is(':checked')) {
                        $('#password').hide();
                        $('#confirmpassword').hide();
                    } else {
                        $('#password').show();
                        $('#confirmpassword').show();
                    }
                }
            } else {
                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Please fill the form correctly.") + "</p>");
            }
        });


        $('#btnBillingContinue').click(function() {
            if (v.form()) {
                if ($("#chkBillingAsShipping").is(":visible") == false) {
                    CheckOut.Vars.AddressID = $('#ddlBilling option:selected').val();
                    CheckOut.GetUserCartDetails();
                }
                $("input[type='radio'][name='shippingRadio']:first").attr('checked', 'checked').trigger('change');
                if (CheckOut.UserCart.CountAllItem == CheckOut.UserCart.CountDownloadableItem) {
                    CheckOut.UserCart.IsDownloadItemInCartFull = true;
                } else {
                    CheckOut.UserCart.IsDownloadItemInCartFull = false;
                }

                var bill = $('#chkBillingAsShipping').is(':checked') == true ? "both" : "billing";
                var x = CheckOut.CheckShippingAndBillingCountry(bill);

                if (x.AllowBilling == true) {

                } else if (x.AllowBilling == false) {
                    csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, "Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + shippingDetailPage + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                    return false;
                }

                CheckOut.AssignItemsDetails();
                if (CheckOut.UserCart.isUserGuest == false) {
                    if ($.trim($('#ddlBilling').text()) == '' || $.trim($('#ddlBilling').text()) == null) {
                        $('#addBillingAddress').show();
                        csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Please add billing address to checkout.") + "</p>");
                        return false;
                    } else {
                        CheckOut.BindBillingData();
                        if ($('#txtFirstName').val() == '') {
                            $shippingInfo.hide();
                            $shippingSelect.show();
                        } else {
                            $shippingInfo.show();
                            $shippingSelect.hide();
                        }
                        if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                            CheckOut.AssignItemsDetails();
                            $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                            $accor.tabs('select', 4);
                            $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                            $("#txtShippingTotal").val(0);
                            CheckOut.UserCart.spCost = 0.00;
                            CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
                            CheckOut.Vars.temptotal = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate);

                            CheckOut.GiftCard.Init();
                            return false; //change made for downloadable items only
                        }
                        if ($('#chkBillingAsShipping').is(':checked')) {
                            CheckOut.UserCart.objTaxList = [];
                            if (AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                                CheckOut.Vars.AddressID = $('#ddlBilling option:selected').val();
                                CheckOut.GetUserCartDetails();

                            }
                            CheckOut.BindShippingData();
                            var x = CheckOut.CheckShippingAndBillingCountry("both");
                            if (x.AllowBilling == true && x.AllowShipping == true) {

                            } else if (x.AllowBilling == true && x.AllowShipping == false) {
                                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Shipping Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, " Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + "Shipping" + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                                return false;
                            } else if (x.AllowBilling == false && x.AllowShipping == true) {
                                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, "Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + "Shipping" + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                                return false;
                            } else {
                                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing and Shipping Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, "Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + "Shipping" + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                                return false;
                                return false;
                            }
                            if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                                $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                                $accor.tabs('select', 4);
                                $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                                $("#txtShippingTotal").val(0);
                                CheckOut.UserCart.spCost = 0.00;
                                CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
                                CheckOut.Vars.temptotal = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate);

                                CheckOut.GiftCard.Init();
                                return false; //change made for downloadable items only
                            } else {
                                $accor = $("#tabs").tabs({ active: 3, disabled: [0, 1, 2, 4, 5] });
                                $accor.tabs('select', 3);
                                $accor.tabs({ deactive: [0, 1, 2, 4, 5] });
                            }
                        } else {
                            $('#dvCPShipping').html('');
                            $accor = $("#tabs").tabs({ active: 2, disabled: [0, 1, 3, 4, 5] });
                            $accor.tabs('select', 2);
                            $accor.tabs({ deactive: [0, 1, 3, 4, 5] });
                        }
                        // return false;
                    }
                } else {
                    CheckOut.BindBillingData();
                    if ($('#txtFirstName').val() == '') {
                        $shippingInfo.hide();
                        $shippingSelect.show();
                    } else {
                        $shippingInfo.show();
                        $shippingSelect.hide();
                    }
                    if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                        $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                        $accor.tabs('select', 4);
                        $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                        $("#txtShippingTotal").val(0);
                        CheckOut.UserCart.spCost = 0.00;
                        CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
                        CheckOut.GiftCard.Init();
                        return false;
                    }
                    if ($('#chkBillingAsShipping').is(':checked')) {

                        if (AspxCommerce.utils.GetUserName() == 'anonymoususer') {
                            CheckOut.UserCart.objTaxList = [];
                            CheckOut.Vars.Country = $('#ddlBLCountry option:selected').text();
                            CheckOut.Vars.State = $('#txtState').val();
                            CheckOut.Vars.Zip = $('#txtZip').val();
                            CheckOut.Vars.AddressID = 0;
                            CheckOut.GetUserCartDetails();
                        }
                        CheckOut.BindShippingData();
                        var x = CheckOut.CheckShippingAndBillingCountry("both");
                        if (x.AllowBilling == true && x.AllowShipping == true) {

                        } else if (x.AllowBilling == true && x.AllowShipping == false) {
                            csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Shipping Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, " Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + "Shipping" + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                            return false;
                            return false;
                        } else if (x.AllowBilling == false && x.AllowShipping == true) {
                            csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, " Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + "Shipping" + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                            return false;
                        } else {
                            csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing and Shipping Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, " Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + "Shipping" + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                            return false;
                            return false;
                        }
                        if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                            CheckOut.AssignItemsDetails();
                            $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                            $accor.tabs('select', 4);
                            $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                            $("#txtShippingTotal").val(0);
                            CheckOut.UserCart.spCost = 0.00;
                            CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
                            CheckOut.Vars.temptotal = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate);

                            CheckOut.GiftCard.Init();
                            return false
                        } else {
                            $accor = $("#tabs").tabs({ active: 3, disabled: [0, 1, 2, 4, 5] });
                            $accor.tabs('select', 3);
                            $accor.tabs({ deactive: [0, 1, 2, 4, 5] });
                        }
                    } else {
                        $('#dvCPShipping').html('');
                        $accor = $("#tabs").tabs({ active: 2, disabled: [0, 1, 3, 4, 5] });
                        $accor.tabs('select', 2);
                        $accor.tabs({ deactive: [0, 1, 3, 4, 5] });
                    }
                    // return false;
                }
            } else {
                //  alert('Please fill the form correctly');
            }
        });

        $('#btnBillingBack').bind("click", function() {

            if (AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                $accor = $("#tabs").tabs({ active: 1, disabled: [0, 2, 3, 4, 5] });
                $accor.tabs('select', 1);
                $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
            } else {
                $('#dvCPBilling').html('');
                $accor = $("#tabs").tabs({ active: 0, disabled: [1, 2, 3, 4, 5] });
                $accor.tabs('select', 0);
                $accor.tabs({ deactive: [1, 2, 3, 4, 5] });
            }
        });

        $('#btnShippingContinue').bind("click", function() {
            CheckOut.UserCart.objTaxList = [];
            if (AspxCommerce.utils.GetUserName() != 'anonymoususer') {
                var id = CheckOut.Vars.AddressID = $('#ddlShipping option:selected').val();
                //call rate quote
                var sAddress = CheckOut.GetUserSelectedShippingAddress(id);
                CheckOut.GetShippinMethodsFromWeight(basketItems, sAddress);
                CheckOut.GetUserCartDetails();

            } else {
                CheckOut.Vars.Country = $('#ddlSPCountry option:selected').text();
                CheckOut.Vars.State = $('#txtSPState').val();
                CheckOut.Vars.Zip = $('#txtSPZip').val();
                CheckOut.Vars.AddressID = 0;

                var sipAddress = {};
                sipAddress.FirstName = $('#txtSPFirstName').val();
                sipAddress.LastName = $('#txtSPLastName').val();
                sipAddress.EmailAddress = $('#txtSPEmailAddress').val();

                sipAddress.CompanyName = $('#txtSPCompany').val();
                sipAddress.Address = $('#txtSPAddress').val();
                sipAddress.Address2 = $('#txtSPAddress2').val();
                sipAddress.City = $('#txtSPCity').val();
                sipAddress.Zip = $('#txtSPZip').val();
                sipAddress.Country = $('#hdnCountryList option[value=' + $.trim($('#ddlSPCountry').val()) + ']').text();
                sipAddress.Phone = $('#txtSPPhone').val();
                sipAddress.Mobile = $('#txtSPMobile').val();
                tempUserAddresses = [];
                tempUserAddresses.push(sipAddress);

                CheckOut.GetShippinMethodsFromWeight(basketItems, tempUserAddresses[0]);
                CheckOut.GetUserCartDetails();
            }
            if (CheckOut.UserCart.CountAllItem == CheckOut.UserCart.CountDownloadableItem) {
                CheckOut.UserCart.IsDownloadItemInCartFull = true;
            } else {
                CheckOut.UserCart.IsDownloadItemInCartFull = false;
            }
            if (v.form()) {
                var x = CheckOut.CheckShippingAndBillingCountry("both");
                if (x.AllowBilling == true && x.AllowShipping == true) {

                } else if (x.AllowBilling == true && x.AllowShipping == false) {
                    csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Shipping Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, "Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + shippingDetailPage + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                    return false;

                } else if (x.AllowBilling == false && x.AllowShipping == true) {
                    csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, "Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + shippingDetailPage + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                    return false;
                } else {
                    csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Selected Billing and Shipping Address is not applicable.") + "</p><p>" + getLocale(AspxCheckoutWithSingleAddress, "Click here for") + " <a href=" + AspxCommerce.utils.GetAspxRedirectPath() + shippingDetailPage + pageExtension + ">" + getLocale(AspxCheckoutWithSingleAddress, "more information") + "</a> </p>");
                    return false;
                }

                if (CheckOut.UserCart.isUserGuest == false) {
                    if ($.trim($('#ddlShipping').text()) == '' || $.trim($('#ddlShipping').text()) == null) {
                        // alert("Please visit your Dashboard to add Shipping Address!!!");
                        $('#addShippingAddress').show();
                        return false;
                    } else {
                        CheckOut.BindShippingData();
                        if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                            $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                            $accor.tabs('select', 4);
                            $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                            $("#txtShippingTotal").val(0);
                            CheckOut.UserCart.spCost = 0.00;
                        } else {
                            $accor = $("#tabs").tabs({ active: 3, disabled: [0, 1, 2, 4, 5] });
                            $accor.tabs('select', 3);
                            $accor.tabs({ deactive: [0, 1, 2, 4, 5] });
                        }
                    }
                } else {
                    CheckOut.BindShippingData();
                    if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                        $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                        $accor.tabs('select', 4);
                        $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
                        $("#txtShippingTotal").val(0);
                        CheckOut.UserCart.spCost = 0.00;
                        CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
                    } else {
                        $accor = $("#tabs").tabs({ active: 3, disabled: [0, 1, 2, 4, 5] });
                        $accor.tabs('select', 3);
                        $accor.tabs({ deactive: [0, 1, 2, 4, 5] });
                    }
                }
            } else {
                // csscody.alert("<h2>Information Alert</h2><p>Please fill the form correctly.</p>");
            }
        });

        $('#btnShippingBack').bind("click", function() {
            $('#dvCPShipping').html('');
            $accor = $("#tabs").tabs({ active: 1, disabled: [0, 2, 3, 4, 5] });
            $accor.tabs('select', 1);
            $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
            if ($('#chkBillingAsShipping').attr('checked') == 'true' || $('#chkBillingAsShipping').attr('checked') == true) {
                $('#chkBillingAsShipping').attr('checked', false);
            }
        });

        $('#btnShippingMethodBack').bind("click", function() {

            if ($('#chkBillingAsShipping').is(':checked')) {
                $accor = $("#tabs").tabs({ active: 1, disabled: [0, 2, 3, 4, 5] });
                $accor.tabs('select', 1);
                $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
            } else {
                $accor = $("#tabs").tabs({ active: 2, disabled: [0, 1, 3, 4, 5] });
                $accor.tabs('select', 2);
                $accor.tabs({ deactive: [0, 1, 3, 4, 5] });
            }
        });
        $('#btnShippingMethodContinue').bind("click", function() {
            $('#btnShippingMethodContinue').show();
            var count = 0;
            CheckOut.AssignItemsDetails();

            $("input[type='radio'][name='shippingRadio']").each(function() {
                if ($(this).is(':checked') == true)
                    count = 1;
            });
            CheckOut.GiftCard.Init();
            if (count == 1) {
                CheckOut.AssignItemsDetails();
                var discountTotal = eval(CheckOut.UserCart.TotalDiscount) + eval(CheckOut.UserCart.CartDiscount);
                CheckOut.SetSessionValue("DiscountAll", discountTotal);
                //   $.cookie('Discount', eval(TotalDiscount) + eval(CartDiscount));
                CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
                CheckOut.SetSessionValue("ShippingMethodName", CheckOut.UserCart.spName);
                var gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(CheckOut.UserCart.CouponDiscountAmount);
                //var gt = ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, ""))/rate;
                if (gt == 'NaN')
                    gt = 0;
                CheckOut.Vars.temptotal = CheckOut.UserCart.Total = parseFloat(gt);
                CheckOut.SetSessionValue("GrandTotalAll", parseFloat(gt));
                CheckOut.BindShippingMethodData();
                $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
                $accor.tabs('select', 4);
                $accor.tabs({ deactive: [0, 1, 2, 3, 5] });

            } else {
                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Please check at least one shipping method.") + "</p>");
                // $('#divShippingMethod table tr td').html('').html("  Either Items weight in your cart doesn't meet the shipping provider weight criteria or No shipping Method is set in this store!!");
                // $('#btnShippingMethodContinue').hide();
            }
            var gt1 = CheckOut.UserCart.spCost + CheckOut.UserCart.Tax + CheckOut.UserCart.baseSubTotalAmt - CheckOut.UserCart.TotalDiscount - CheckOut.UserCart.CartDiscount - eval(CheckOut.UserCart.CouponDiscountAmount);
            //var gt1 = ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, ""))/rate;
            if (gt1 == 'NaN')
                gt1 = 0;
            CheckOut.UserCart.Total = parseFloat(gt1);
            if (CheckOut.UserCart.IsGiftCardUsed) {

                var t = parseFloat(gt1) - CheckOut.GiftCard.GetGiftCardAmount();
                CheckOut.UserCart.Total = t;
                CheckOut.SetSessionValue("GrandTotalAll", parseFloat(t));
            } else
                CheckOut.SetSessionValue("GrandTotalAll", parseFloat(gt1));
        });


        $('#btnPaymentInfoContinue').bind("click", function() {
            var Total = 0;
            var disAmount = 0;
            if (v.form()) {
                if (CheckOut.UserCart.IsGiftCardUsed) {
                    if (!CheckOut.GiftCard.CheckGiftCardIsUsed()) {
                        CheckOut.GiftCard.ResetGiftCard();
                        SageFrame.messaging.show("Applied Gift Card has insufficient balance.Please veriry once again!", "Alert");
                        return false;
                    }
                }
                var couponCount = CheckOut.UserCart.CouponAppliedCount;
                var baseSubTotalAmount = CheckOut.UserCart.baseSubTotalAmt;
                var percentValue = CheckOut.UserCart.CouponPercentValue;
                var couponDiscount = 0;
                //$('#ddlBLCountry :selected').val();
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/BindStateList",
                    data: JSON2.stringify({ countryCode: $('#ddlBLCountry :selected').val() }),
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        // $.each(msg.d, function(index, item) {
                        if (msg.d.length > 2) {
                            CheckOut.BillingAddress.state = $('#ddlBLState :selected').text();
                        } else {

                        }
                        // });
                    }
                });
                //                if ($.trim(CheckOut.BillingAddress.country) == "United States") {
                //                    CheckOut.BillingAddress.state = $('#ddlBLState :selected').text();
                //                }
                $.ajax({
                    type: "POST",
                    url: aspxservicePath + "AspxCommerceWebService.asmx/BindStateList",
                    data: JSON2.stringify({ countryCode: $('#ddlSPCountry :selected').val() }),
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        //$.each(msg.d, function(index, item) {
                        if (msg.d.length > 2) {
                            CheckOut.ShippingAddress.spState = $('#ddlSPState :selected').text();
                        } else {

                        }
                        //});
                    }
                });
                //                if ($.trim(CheckOut.ShippingAddress.spCountry) == "United States") {
                //                    CheckOut.ShippingAddress.spState = $('#ddlSPState :selected').text();
                //                }
                if ($('#dvPGList input:radio:checked').attr('checked') == 'checked' || $('#dvPGList input:radio:checked').attr('checked') == true) {
                    if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                        CheckOut.GetDiscountCartPriceRule(CheckOut.UserCart.CartID, 0);
                    }
                    if ($.trim($('#dvPGList input:radio:checked').attr('friendlyname')) == 'aimauthorize') {
                        if ($('#AIMChild').length > 0) {
                            CheckOut.BindPaymentData();
                            //      $('#txtDiscountAmount').val(parseFloat(eval(CheckOut.UserCart.TotalDiscount * rate) + eval(CheckOut.UserCart.CartDiscount * rate)).toFixed(2));
                            $('#txtDiscountAmount').val(parseFloat(eval(CheckOut.UserCart.TotalDiscount * rate) + eval(CheckOut.UserCart.CartDiscount * rate)).toFixed(2));
                            //$('#txtCouponDiscountAmountValue').val(parseFloat(eval(CheckOut.UserCart.CouponDiscountAmount * rate)));
                            var gt = '';
                            if (CheckOut.UserCart.IsCouponInPercent == 1) {
                                for (var i = 0; i < couponCount; i++) {
                                    disAmount = ((baseSubTotalAmount - Discount) * percentValue) / 100;
                                    couponDiscount += ((baseSubTotalAmount - Discount) * percentValue) / 100;
                                    //   baseSubTotalAmount = baseSubTotalAmount - couponDiscount;
                                    baseSubTotalAmount = baseSubTotalAmount - disAmount;
                                    CheckOut.UserCart.CouponDiscountAmount = couponDiscount;
                                }
                                // var couponDiscount = (CheckOut.UserCart.baseSubTotalAmt) * (CheckOut.UserCart.CouponPercentValue) / 100;
                                $('#txtCouponDiscountAmountValue').val(parseFloat(eval(couponDiscount * rate)));
                                CheckOut.Vars.temptotal = CheckOut.UserCart.Total = parseFloat(eval($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, ""))) + CheckOut.UserCart.Tax + parseFloat(eval($(".total-box").val().replace(/[^-0-9\.]+/g, ""))) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(couponDiscount * rate);
                                gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(couponDiscount * rate);
                            } else {
                                $('#txtCouponDiscountAmountValue').val(parseFloat(eval(CheckOut.UserCart.CouponDiscountAmount * rate)));
                                CheckOut.Vars.temptotal = CheckOut.UserCart.Total = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate);
                                gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(CheckOut.UserCart.CouponDiscountAmount);
                            }
                            //   CheckOut.UserCart.Total = parseFloat(eval($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, ""))) + CheckOut.UserCart.Tax + parseFloat(eval($(".total-box").val().replace(/[^-0-9\.]+/g, ""))) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(CheckOut.UserCart.CouponDiscountAmount);
                            $("#txtTotalCost").val(CheckOut.UserCart.Total.toFixed(2));
                            // $("#txtTotalCost").val(parseFloat($("#txtShippingTotal").val()) + Tax + parseFloat($(".total-box").val()) - eval(TotalDiscount) - eval(CartDiscount));
                            //$('#txtTax').val((CheckOut.UserCart.Tax * rate).toFixed(2));
                            CheckOut.SetSessionValue("TaxAll", CheckOut.UserCart.Tax);
                            // var gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(CheckOut.UserCart.CouponDiscountAmount);
                            //var gt = ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, ""))/rate;
                            if (gt == 'NaN')
                                gt = 0;
                            if (CheckOut.UserCart.IsGiftCardUsed) {
                                var total = parseFloat(gt) - CheckOut.GiftCard.GetGiftCardAmount();
                                CheckOut.UserCart.Total = total;
                                CheckOut.SetSessionValue("GrandTotalAll", parseFloat(total));
                            } else
                                CheckOut.SetSessionValue("GrandTotalAll", parseFloat(gt));
                            $accor = $("#tabs").tabs({ active: 5, disabled: [0, 1, 2, 3, 4] });
                            $accor.tabs('select', 5);
                            $accor.tabs({ deactive: [0, 1, 2, 3, 4] });

                            if ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, "") < 0) {
                                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Your cart is not eligible to checkout due to a negatve total amount!") + "</p>");

                                $('#dvPlaceOrder .sfButtonwrapper ').find('input').not("#btnPlaceBack").remove();
                                $("#dvPGList input:radio").attr("disabled", "disabled");
                            } else {
                                $("#dvPGList input:radio").attr("disabled", false);
                            }

                        } else {
                        }

                    } else {
                        CheckOut.BindPaymentData();
                        //  $('#txtDiscountAmount').val(parseFloat(eval(CheckOut.UserCart.TotalDiscount * rate) + eval(CheckOut.UserCart.CartDiscount * rate)).toFixed(2));
                        $('#txtDiscountAmount').val(parseFloat(eval(CheckOut.UserCart.TotalDiscount * rate) + eval(CheckOut.UserCart.CartDiscount * rate)).toFixed(2));
                        //$('#txtCouponDiscountAmountValue').val(parseFloat(eval(CheckOut.UserCart.CouponDiscountAmount * rate)));
                        var gt = '';
                        if (CheckOut.UserCart.IsCouponInPercent == 1) {
                            for (var i = 0; i < couponCount; i++) {
                                disAmount = ((baseSubTotalAmount - Discount) * percentValue) / 100;
                                couponDiscount += ((baseSubTotalAmount - Discount) * percentValue) / 100;
                                //   baseSubTotalAmount = baseSubTotalAmount - couponDiscount;
                                baseSubTotalAmount = baseSubTotalAmount - disAmount;
                                CheckOut.UserCart.CouponDiscountAmount = couponDiscount;
                            }
                            //var couponDiscount = (CheckOut.UserCart.baseSubTotalAmt) * (CheckOut.UserCart.CouponPercentValue) / 100;
                            $('#txtCouponDiscountAmountValue').val(parseFloat(eval(couponDiscount * rate)));
                            CheckOut.Vars.temptotal = CheckOut.UserCart.Total = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(couponDiscount * rate) - eval(CheckOut.UserCart.RewardPointsDiscount * rate);
                            gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(couponDiscount * rate) - eval(CheckOut.UserCart.RewardPointsDiscount * rate);

                        } else {
                            $('#txtCouponDiscountAmountValue').val(parseFloat(eval(CheckOut.UserCart.CouponDiscountAmount * rate)));
                            CheckOut.Vars.temptotal = CheckOut.UserCart.Total = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount * rate) - eval(CheckOut.UserCart.RewardPointsDiscount * rate);
                            gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(CheckOut.UserCart.CouponDiscountAmount) - eval(CheckOut.UserCart.RewardPointsDiscount);
                        }
                        // CheckOut.UserCart.Total = parseFloat($("#txtShippingTotal").val().replace(/[^-0-9\.]+/g, "")) + CheckOut.UserCart.Tax * rate + parseFloat($(".total-box").val().replace(/[^-0-9\.]+/g, "")) - eval(CheckOut.UserCart.TotalDiscount * rate) - eval(CheckOut.UserCart.CartDiscount * rate) - eval(CheckOut.UserCart.CouponDiscountAmount);
                        $("#txtTotalCost").val(CheckOut.UserCart.Total.toFixed(2));
                        //$("#txtTotalCost").val(parseFloat($("#txtShippingTotal").val()) + Tax + parseFloat($(".total-box").val()) - eval(TotalDiscount) - eval(CartDiscount));
                        //$('#txtTax').val((CheckOut.UserCart.Tax * rate).toFixed(2).replace(/[^-0-9\.]+/g, ""));
                        CheckOut.SetSessionValue("TaxAll", CheckOut.UserCart.Tax);
                        //  var gt = eval(CheckOut.UserCart.spCost) + eval(CheckOut.UserCart.Tax) + eval(CheckOut.UserCart.baseSubTotalAmt) - eval(CheckOut.UserCart.TotalDiscount) - eval(CheckOut.UserCart.CartDiscount) - eval(CheckOut.UserCart.CouponDiscountAmount);
                        //var gt = ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, ""))/rate;
                        if (gt == 'NaN')
                            gt = 0;
                        if (CheckOut.UserCart.IsGiftCardUsed) {
                            var t = parseFloat(gt) - CheckOut.GiftCard.GetGiftCardAmount();
                            CheckOut.UserCart.Total = t;
                            CheckOut.SetSessionValue("GrandTotalAll", parseFloat(t));
                        } else
                            CheckOut.SetSessionValue("GrandTotalAll", parseFloat(gt));
                        $accor = $("#tabs").tabs({ active: 5, disabled: [0, 1, 2, 3, 4] });
                        $accor.tabs('select', 5);
                        $accor.tabs({ deactive: [0, 1, 2, 3, 4] });
                        if ($("#txtTotalCost").val().replace(/[^-0-9\.]+/g, "") < 0) {
                            csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Your cart is not eligible to checkout due to a negatve total amount!") + "</p>");
                            $('#dvPlaceOrder .sfButtonwrapper ').find('input').not("#btnPlaceBack").remove();
                            $("#dvPGList input:radio").attr("disabled", "disabled");
                        } else {
                            $("#dvPGList input:radio").attr("disabled", false);
                        }

                    }
                    // if (CheckOut.UserCart.IsGiftCardUsed)
                    CheckOut.GiftCard.Init();
                    var totalDiscountVal = $('#txtDiscountAmount').val().replace(/[^-0-9\.]+/g, "");
                    // totalDiscountVal = totalDiscountVal.toFixed(2);
                    var totalDiscountValLen = totalDiscountVal.length;
                    var couponVal = parseFloat($('#txtCouponDiscountAmountValue').val().replace(/[^-0-9\.]+/g, ""));
                    couponVal = couponVal.toFixed(2);
                    var couponValLen = couponVal.length;
                    $('#txtDiscountAmount').attr("size", totalDiscountValLen + CheckOut.Vars.len - 3);
                    $('#txtCouponDiscountAmountValue').attr("size", couponValLen + CheckOut.Vars.len - 2);
                    //$(".cssClassMinus input").attr("size", (($(".cssClassMinus input").val().length) + CheckOut.Vars.len));
                } else {
                    csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Message") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Please select your payment system.") + "</p>");
                }
            } else {
                csscody.alert("<h2>" + getLocale(AspxCheckoutWithSingleAddress, "Information Alert") + "</h2><p>" + getLocale(AspxCheckoutWithSingleAddress, "Please fill the form correctly.") + "</p>");
            }
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        });

        $('#btnPaymentInfoBack').bind("click", function() {
            $('#dvCPPaymentMethod').html('');
            if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
                $accor = $("#tabs").tabs({ active: 1, disabled: [0, 2, 3, 4, 5] });
                $accor.tabs('select', 1);
                $accor.tabs({ deactive: [0, 2, 3, 4, 5] });
                $("#txtShippingTotal").val(0);
                CheckOut.UserCart.spCost = 0.00;
                CheckOut.SetSessionValue("ShippingCostAll", CheckOut.UserCart.spCost);
            } else {
                $accor = $("#tabs").tabs({ active: 3, disabled: [0, 1, 2, 4, 5] });
                $accor.tabs('select', 3);
                $accor.tabs({ deactive: [0, 1, 2, 4, 5] });
            }
        });

        $('#btnPlaceBack').bind("click", function() {
            $accor = $("#tabs").tabs({ active: 4, disabled: [0, 1, 2, 3, 5] });
            $accor.tabs('select', 4);
            $accor.tabs({ deactive: [0, 1, 2, 3, 5] });
        });

        $('#chkBillingAsShipping').bind("click", function() {
            CheckOut.AddBillingAsShipping();
        });

        $("#ddlSPCountry ,#ddlBLCountry ,#ddlBilling").bind("change", function() {
            if ($("#chkBillingAsShipping").is(":checked")) {
                $("#chkBillingAsShipping").removeAttr("checked");
                CheckOut.AddBillingAsShipping();
            }
            CheckOut.GetState($(this).val());
            if (this.id == "ddlBLCountry") {
                if ($("#chkBillingAsShipping").is(":checked")) {
                    $("#chkBillingAsShipping").click();
                }
            }
        });

        $(".cssClassClose").bind("click", function() {
            $('#fade, #popuprel').fadeOut();
            $('#popuprel .sfFormwrapper table').empty();
        });

        $('#addBillingAddress ,#addShippingAddress').bind("click", function() {
            $("#ddlBLState").hide();
            $("#txtState").show();
            $("#txtState").val('');
            $('#popuprel .sfFormwrapper table').empty();
            $('<table  width="100%" border="0" cellpadding="0" cellspacing="0">' + $('#dvBillingInfo table').html() + '</table>').insertBefore('#popuprel .sfFormwrapper .sfButtonwrapper');
            CheckOut.ClearAll();
            switch ($(this).attr('id')) {
                case "addBillingAddress":
                    ShowPopupControl("popuprel");
                    $('#trBillingAddress ,#trShippingAddress').show();
                    $("#popuprel .sfFormwrapper table #chkShippingAddress").attr("checked", "checked");
                    $("#popuprel .sfFormwrapper table #chkShippingAddress").attr("disabled", "disabled");
                    $("#popuprel .sfFormwrapper table #chkBillingAddress").attr("checked", "checked");
                    $("#popuprel .sfFormwrapper table #chkBillingAddress").attr("disabled", "disabled");
                    break;
                case "addShippingAddress":
                    $('#popuprel .sfFormwrapper table tr:nth-child(7)').remove();
                    ShowPopupControl("popuprel");
                    break;
            }
            // ShowPopupControl("popuprel");
            $("#popuprel .sfFormwrapper table #ddlSPCountry ,#popuprel .sfFormwrapper table #ddlBLCountry").bind("change", function() {
                CheckOut.GetState($(this).val());
            });

        });

        $('#btnSubmitAddress').bind("click", function() {
            if (v.form()) {
                CheckOut.AddUpdateUserAddress();
            }
        });
        $('#trBillingAddress , #trShippingAddress').show();
        $('#addBillingAddress , #addShippingAddress').show();
        if ($.trim($('#ddlBilling').text()) == "" || $.trim($('#ddlBilling').text()) == null) {

            $('#addBillingAddress').show();
        } else {
            $('#addBillingAddress').show();
        }
        if ($.trim($('#ddlShipping').text()) == "" || $.trim($('#ddlShipping').text()) == null) {
            // alert("Please visit your Dashboard to add Shipping Address!!!");
            $('#addShippingAddress').show();
        } else {
            $('#addShippingAddress').show();
        }

        CheckOut.CheckDownloadableOnlyInCart();
        if (CheckOut.UserCart.IsDownloadItemInCartFull || CheckOut.UserCart.ShowShippingAdd) {
            $('#dvBilling .cssClassCheckBox').hide();
        } else {
            $('#dvBilling .cssClassCheckBox').show();
        }

        $("#ddlShipping").bind("change", function() {
            CheckOut.UserCart.objTaxList = [];
        });
        $("#txtFirstName,#txtLastName,#txtEmailAddress,#txtCompanyName,#txtAddress1,#txtAddress2,#txtCity,#txtState,#txtZip,#txtPhone,#txtMobile,#txtFax,#txtWebsite").bind("keypress", function() {

            if ($("#chkBillingAsShipping").is(":checked")) {
                $("#chkBillingAsShipping").removeAttr("checked");
                CheckOut.AddBillingAsShipping();
            }
        });
    }
};
$("#SingleCheckOut").show();
CheckOut.Init();
});
