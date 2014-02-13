<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AddressBook.ascx.cs" Inherits="Modules_AspxUserDashBoard_AddressBook" %>

<script type="text/javascript">
    //<![CDATA[
    var defaultShippingExist = '<%=defaultShippingExist %>';
    var defaultBillingExist = '<%=defaultBillingExist %>';
    var addressId = '<%=addressId%>';
    var addressBook = "";
    aspxCommonObj.UserName = AspxCommerce.utils.GetUserName();
    $.expr[':'].exactcontains = function(a, i, m) {
        return $(a).text().match("^" + m[3] + "$");
    };
    $(function() {

        $(".sfLocale").localize({
            moduleKey: AspxUserDashBoard
        });

        addressBook = {
            variables: {
                checkIfExist: '',
                addNewAddress: 0,
                notExists: ''
            },

            config: {
                isPostBack: false,
                async: true,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                method: "",
                url: "",
                ajaxCallMode: "",
                error: ""
            },

            ajaxCall: function(config) {
                $.ajax({
                    type: addressBook.config.type,
                    contentType: addressBook.config.contentType,
                    cache: addressBook.config.cache,
                    async: addressBook.config.async,
                    url: addressBook.config.url,
                    data: addressBook.config.data,
                    dataType: addressBook.config.dataType,
                    success: addressBook.config.ajaxCallMode,
                    error: addressBook.config.error
                });
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
                $("#txtZip").val('');
                $("#ddlUSState").val(1);
                $("#txtPhone").val('');
                $("#txtMobile").val('');
                $("#txtFax").val('');
                $("#txtWebsite").val('');
                $("#chkShippingAddress").removeAttr("checked");
                $("#chkBillingAddress").removeAttr("checked");
                $("#chkShippingAddress").removeAttr("disabled");
                $("#chkBillingAddress").removeAttr("disabled");
            },

            BindAddressDetails: function(msg) {
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
                        } else {
                            defaultShippingExist = false;
                        }
                    }

                    if (!defaultBillingExist) {
                        if (value.DefaultBilling != null || value.DefaultBilling) {
                            defaultBillingExist = true;
                        } else {
                            defaultBillingExist = false;
                        }
                    }
                    if (value.DefaultBilling || value.DefaultShipping) {
                        if (value.DefaultShipping) {
                            defaultShippingAddressElements += '<h3>' + getLocale(AspxUserDashBoard, "Default Shipping Address") + '</h3>';
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
                            defaultShippingAddressElements += getLocale(AspxUserDashBoard, 'Zip:') + '<label name="Zip">' + value.Zip + '</label><br>';
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
                            defaultBillingAddressElements += getLocale(AspxUserDashBoard, 'Zip:') + '<label name="Zip">' + value.Zip + '</label><br>';
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
                    } else {
                        addressElements += '<li>';
                        addressElements += '<p><label name="FirstName">' + value.FirstName + '</label><label name="LastName">' + value.LastName + '</label><br>';
                        addressElements += '<label name="Email">' + value.Email + '</label><br>';
                        if (value.Company != "") {
                            addressElements += '<label name="Company">' + value.Company + '</label><br/>';
                        }
                        addressElements += '<label name="Address1">' + value.Address1 + '</label><br>';
                        if (value.Address2 != "") {
                            addressElements += '<label name="Address2">' + value.Address2 + '</label><br>';
                        }
                        addressElements += '<label name="City">' + value.City + '</label><br>';
                        addressElements += '<label name="State">' + value.State + '</label><br>';
                        addressElements += getLocale(AspxUserDashBoard, 'Zip:') + '<label name="Zip">' + value.Zip + '</label><br>';
                        addressElements += '<label name="Country">' + value.Country + '</label><br>';
                        addressElements += getLocale(AspxUserDashBoard, 'P:') + '<label name="Phone">' + value.Phone + '</label><br>';
                        if (value.Mobile != "") {
                            addressElements += getLocale(AspxUserDashBoard, 'M:') + '<label name="Mobile">' + value.Mobile + '</label><br>';
                        }
                        if (value.Fax != "") {
                            addressElements += getLocale(AspxUserDashBoard, 'F:') + '<label name="Fax">' + value.Fax + '</label><br>';
                        }
                        if (value.Website != "") {
                            addressElements += '<label name="Website">' + value.Website + '</label>';
                        }
                        addressElements += '</p>';
                        addressElements += ' <p class="cssClassChange"><a href="#" rel="popuprel" name="EditAddress" value="' + value.AddressID + '" Flag="0">' + getLocale(AspxUserDashBoard, 'Edit Address') + '</a> <a href="#" name="DeleteAddress" value="' + value.AddressID + '">' + getLocale(AspxUserDashBoard, 'Delete Address') + '</a></p><div class="clear" ></div></li>';
                    }
                    if (msg.d.length == 1) {

                        addressElements += "<span class=\"cssClassNotFound\">";
                        addressElements += getLocale(AspxUserDashBoard, "There is no additional address entries!");
                        addressElements += "</span>";
                    }
                });

                if (defaultShippingExist) {
                    $("#hdnDefaultShippingExist").val('1');
                } else {
                    $("#hdnDefaultShippingExist").val('0');
                    $("#liDefaultShippingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, 'You have not set default shipping adresss yet!') + "</span>");
                }
                if (defaultBillingExist) {
                    $("#hdnDefaultBillingExist").val('1');
                } else {
                    $("#hdnDefaultBillingExist").val('0');
                    $("#liDefaultBillingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, "You have not set default billing adresss yet!") + "</span>");
                }
                $("#olAddtionalEntries").next('span').remove();
                $("#olAddtionalEntries").html(addressElements);
                $("a[name='EditAddress']").bind("click", function() {
                    addressBook.ClearAll();
                    $("#hdnAddressID").val($(this).attr("value"));
                    $("#txtFirstName").val($(this).parent('p').prev('p').find('label[name="FirstName"]').text());
                    $("#txtLastName").val($(this).parent('p').prev('p').find('label[name="LastName"]').text());
                    $("#txtEmailAddress").val($(this).parent('p').prev('p').find('label[name="Email"]').text());
                    $("#txtCompanyName").val($(this).parent('p').prev('p').find('label[name="Company"]').text());
                    $("#txtAddress1").val($(this).parent('p').prev('p').find('label[name="Address1"]').text());
                    $("#txtAddress2").val($(this).parent('p').prev('p').find('label[name="Address2"]').text());
                    $("#txtCity").val($(this).parent('p').prev('p').find('label[name="City"]').text());
                    $("#txtState").val($(this).parent('p').prev('p').find('label[name="State"]').text());
                    $("#txtZip").val($(this).parent('p').prev('p').find('label[name="Zip"]').text());
                    var countryName = $(this).parent('p').prev('p').find('label[name="Country"]').text();
                    $('#ddlCountry').val($('#ddlCountry option:exactcontains(' + $.trim(countryName) + ')').attr('value'));
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
                                    addressBook.variables.notExists = item.Text;
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

                    if ($(this).attr("Flag") == 1) {
                        $("#chkShippingAddress").attr('checked', 'checked');
                        $("#chkBillingAddress").attr('checked', 'checked');
                    } else {
                        $("#chkShippingAddress").removeAttr("checked");
                        $("#chkBillingAddress").removeAttr("checked");
                    }
                    if ($(this).attr("value") == addressId) {
                        $("#chkBillingAddress").attr("disabled", "disabled");
                        $("#chkShippingAddress").attr("disabled", "disabled");
                    } else if ($(this).attr("Flag") == 1) {

                        if ($(this).attr("Element") == "Billing") {

                            $("#chkBillingAddress").attr("disabled", "disabled");
                            $("#chkShippingAddress").removeAttr("disabled");
                        } else {
                            $("#chkShippingAddress").attr("disabled", "disabled");
                            $("#chkBillingAddress").removeAttr("disabled");
                        }
                    } else {
                        $("#chkShippingAddress").removeAttr("disabled");
                        $("#chkBillingAddress").removeAttr("disabled");
                    }

                    ShowPopup(this);

                });
                $("p >a[name='DeleteAddress']").bind("click", function() {
                    var addressId = $(this).attr("value");
                    var properties = {
                        onComplete: function(e) {
                            addressBook.ConfirmAddressDelete(addressId, e);
                        }
                    }
                    // Ask user's confirmation before delete records        
                    csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete this address?") + "</p>", properties);
                });
            },

            GetAddressBookDetails: function() {
                this.config.url = this.config.baseURL + "GetAddressBookDetails";
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = addressBook.BindUserAddressDetails;
                this.ajaxCall(this.config);
            },

            GetAllCountry: function() {
                this.config.url = this.config.baseURL + "BindCountryList";
                this.config.data = "{}";
                this.config.ajaxCallMode = addressBook.BindCountryList;
                this.ajaxCall(this.config);
            },

            GetStateList: function(CountryCode) {
                this.config.url = this.config.baseURL + "BindStateList";
                this.config.data = JSON2.stringify({ countryCode: CountryCode });
                this.config.ajaxCallMode = addressBook.BindStateList;
                this.config.error = addressBook.GetStateListErrorMsg;
                this.ajaxCall(this.config);
            },

            AddUpdateUserAddress: function(state) {
                var addressId = $("#hdnAddressID").val();
                var firstName = $("#txtFirstName").val();
                var lastName = $("#txtLastName").val();
                var email = $("#txtEmailAddress").val();
                var company = $("#txtCompanyName").val();
                var address1 = $("#txtAddress1").val();
                var address2 = $("#txtAddress2").val();
                var city = $("#txtCity").val();
                //var state = '';
                //                if (addressBook.variables.notExists != "NotExists") {
                //                    state = $("#ddlUSState :selected").text();
                //                } else {
                //                    state = $("#txtState").val();
                //                }
                var zip = $("#txtZip").val();
                var phone = $("#txtPhone").val();
                var mobile = $("#txtMobile").val();
                var fax = $("#txtFax").val();
                var webSite = $("#txtWebsite").val();
                var countryName = $("#ddlCountry :selected").text();
                var isDefaultShipping = $("#chkShippingAddress").attr("checked");
                var isDefaultBilling = $("#chkBillingAddress").attr("checked");
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
                this.config.url = this.config.baseURL + "AddUpdateUserAddress";
                this.config.data = JSON2.stringify({
                    addressObj: addressObj,
                    aspxCommonObj: aspxCommonObj
                });
                this.config.ajaxCallMode = addressBook.BindAddressOnAddUpdate;
                this.config.error = addressBook.GetAddressUpdateErrorMsg;
                this.ajaxCall(this.config);
                return false;
            },

            DeleteAddressBook: function(id) {
                this.config.url = this.config.baseURL + "DeleteAddressBook";
                this.config.data = JSON2.stringify({ addressID: id, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = addressBook.BindAddressOnDelete;
                this.config.error = addressBook.GetAddressDeleteErrorMsg;
                this.ajaxCall(this.config);
            },

            CheckAddressAlreadyExist: function() {
                this.config.async = false;
                this.config.url = this.config.baseURL + "CheckAddressAlreadyExist";
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = addressBook.SetIfAddressAlreadyExist;
                this.ajaxCall(this.config);
                return addressBook.variables.checkIfExist;
            },

            ConfirmAddressDelete: function(id, event) {
                if (event) {
                    addressBook.DeleteAddressBook(id);
                }
            },

            BindUserAddressDetails: function(msg) {
                addressBook.BindAddressDetails(msg);
            },

            BindCountryList: function(msg) {
                var countryElements = '';
                $.each(msg.d, function(index, value) {
                    countryElements += '<option value=' + value.Value + '>' + value.Text + '</option>';
                });
                $("#ddlCountry").html(countryElements);
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

            BindAddressOnAddUpdate: function() {
                addressBook.GetAddressBookDetails();
                $('#fade, #popuprel').fadeOut();
            },

            BindAddressOnDelete: function() {
                csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Address has been deleted successfully.") + "</p>");
                addressBook.GetAddressBookDetails();
            },

            SetIfAddressAlreadyExist: function(msg) {
                addressBook.variables.checkIfExist = msg.d;
            },

            GetStateListErrorMsg: function() {
                csscody.error('<h2>' + getLocale(AspxUserDashBoard, 'Error Message') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Failed to load state list!') + '</p>');
            },
            GetAddressUpdateErrorMsg: function() {
                addressBook.variables.addNewAddress = -1;
                csscody.error('<h2>' + getLocale(AspxUserDashBoard, 'Error Message') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Failed to update address book!') + '</p>');
            },
            GetAddressDeleteErrorMsg: function() {
                csscody.error('<h2>' + getLocale(AspxUserDashBoard, 'Error Message') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Failed to delete!') + '</p>');
            },

            init: function(config) {
                //addressBook.GetAllCountry();
                //addressBook.GetAddressBookDetails();
                if (defaultShippingExist.toLowerCase() == 'true') {
                    $("#hdnDefaultShippingExist").val('1');
                } else {
                    $("#hdnDefaultShippingExist").val('0');
                    $("#liDefaultShippingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, 'You have not set default shipping adresss yet!') + "</span>");
                }
                if (defaultBillingExist.toLowerCase() == 'true') {
                    $("#hdnDefaultBillingExist").val('1');
                } else {
                    $("#hdnDefaultBillingExist").val('0');
                    $("#liDefaultBillingAddress").html("<span class=\"cssClassNotFound\">" + getLocale(AspxUserDashBoard, "You have not set default billing adresss yet!") + "</span>");
                }
                //$("#olAddtionalEntries").html(addressElements);
                $("a[name='EditAddress']").bind("click", function() {
                    addressBook.ClearAll();
                    $("#hdnAddressID").val($(this).attr("value"));
                    $("#txtFirstName").val($(this).parent('p').prev('p').find('label[name="FirstName"]').text());
                    $("#txtLastName").val($(this).parent('p').prev('p').find('label[name="LastName"]').text());
                    $("#txtEmailAddress").val($(this).parent('p').prev('p').find('label[name="Email"]').text());
                    $("#txtCompanyName").val($(this).parent('p').prev('p').find('label[name="Company"]').text());
                    $("#txtAddress1").val($(this).parent('p').prev('p').find('label[name="Address1"]').text());
                    $("#txtAddress2").val($(this).parent('p').prev('p').find('label[name="Address2"]').text());
                    $("#txtCity").val($(this).parent('p').prev('p').find('label[name="City"]').text());
                    $("#txtState").val($(this).parent('p').prev('p').find('label[name="State"]').text());
                    $("#txtZip").val($(this).parent('p').prev('p').find('label[name="Zip"]').text());
                    var countryName = $(this).parent('p').prev('p').find('label[name="Country"]').text();
                    $('#ddlCountry').val($('#ddlCountry option:exactcontains(' + $.trim(countryName) + ')').attr('value'));
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
                                    addressBook.variables.notExists = item.Text;
                                    $('#ddlUSState').hide();
                                    $('#txtState').show();
                                    $("#txtState").val(txtState);
                                }
                            });
                            $('#ddlUSState option').filter(function() { return ($(this).text() == $.trim(txtState)); }).attr('selected', 'selected');
                            //$('#ddlUSState').val($('#ddlUSState option:exactcontains(' + txtState + ')').attr('value'));
                        }
                    });
                    $("#txtPhone").val($(this).parent('p').prev('p').find('label[name="Phone"]').text());
                    $("#txtMobile").val($(this).parent('p').prev('p').find('label[name="Mobile"]').text());
                    $("#txtFax").val($(this).parent('p').prev('p').find('label[name="Fax"]').text());
                    $("#txtWebsite").val($(this).parent('p').prev('p').find('label[name="Website"]').text());

                    if ($(this).attr("Flag") == 1) {
                        $("#chkShippingAddress").attr('checked', 'checked');
                        $("#chkBillingAddress").attr('checked', 'checked');
                    } else {
                        $("#chkShippingAddress").removeAttr("checked");
                        $("#chkBillingAddress").removeAttr("checked");
                    }
                    if ($(this).attr("value") == addressId) {
                        $("#chkBillingAddress").attr("disabled", "disabled");
                        $("#chkShippingAddress").attr("disabled", "disabled");
                    } else if ($(this).attr("Flag") == 1) {

                        if ($(this).attr("Element") == "Billing") {

                            $("#chkBillingAddress").attr("disabled", "disabled");
                            $("#chkShippingAddress").removeAttr("disabled");
                        } else {
                            $("#chkShippingAddress").attr("disabled", "disabled");
                            $("#chkBillingAddress").removeAttr("disabled");
                        }
                    } else {
                        $("#chkShippingAddress").removeAttr("disabled");
                        $("#chkBillingAddress").removeAttr("disabled");
                    }

                    ShowPopup(this);

                });
                $("p >a[name='DeleteAddress']").bind("click", function() {
                    var addressId = $(this).attr("value");
                    var properties = {
                        onComplete: function(e) {
                            addressBook.ConfirmAddressDelete(addressId, e);
                        }
                    };
                    // Ask user's confirmation before delete records        
                    csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete this address?") + "</p>", properties);
                });

                $('#ddlUSState').hide();
                $("#lnkNewAddress").bind("click", function() {

                    addressBook.variables.addNewAddress = 1;
                    if (allowMultipleAddress.toLowerCase() == 'false') {
                        var checkExist = addressBook.CheckAddressAlreadyExist();
                        if (checkExist) {
                            csscody.alert('<h2>' + getLocale(AspxUserDashBoard, 'Alert Message') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Multiple address book is disabled. Try again later!') + '</p>');
                            return false;
                        } else {
                            addressBook.ClearAll();
                            if ($("#hdnDefaultShippingExist").val() == "0") {
                                $("#chkShippingAddress").attr("checked", "checked");
                                $("#chkShippingAddress").attr("disabled", "disabled");
                            }
                            if ($("#hdnDefaultBillingExist").val() == "0") {
                                $("#chkBillingAddress").attr("checked", "checked");
                                $("#chkBillingAddress").attr("disabled", "disabled");
                            }
                            ShowPopup(this);
                        }
                    } else {
                        addressBook.ClearAll();
                        if ($("#hdnDefaultShippingExist").val() == "0") {
                            $("#chkShippingAddress").attr("checked", "checked");
                            $("#chkShippingAddress").attr("disabled", "disabled");
                        }
                        if ($("#hdnDefaultBillingExist").val() == "0") {
                            $("#chkBillingAddress").attr("checked", "checked");
                            $("#chkBillingAddress").attr("disabled", "disabled");
                        }
                        ShowPopup(this);
                    }
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

                var v = $("#form1").validate({
                    //            rules: {
                    //                FirstName: { minlength: 2 },
                    //                LastName: { minlength: 2 },
                    //                Address1: { minlength: 2 },
                    //                Phone: { minlength: 7 },
                    //                State: { minlength: 2 },
                    //                Zip: { minlength: 5 },
                    //                City: { minlength: 2 }
                    //            },
                    messages: {
                        FirstName: {
                            required: '*',
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "",
                            maxlength: "*"
                        },
                        LastName: {
                            required: '*',
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "",
                            maxlength: "*"
                        },
                        Email: {
                            required: '*',
                            email: getLocale(AspxUserDashBoard, "Please enter valid email id")
                        },
                        Wedsite: {
                            url: '*'
                        },
                        Address1: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "",
                            maxlength: "*"
                        },
                        Address2: {
                            maxlength: "*"
                        },
                        Phone: {
                            required: '*',
                            minlength: "*" + getLocale(AspxUserDashBoard, "(at least 7 digits)") + "",
                            maxlength: "*"
                        },
                        Mobile: {
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 10 digits)") + "",
                            maxlength: "*"
                        },
                        Fax: {
                            maxlength: "*"
                        },
                        State: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "",
                            maxlength: "*"
                        },
                        Zip: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 4 chars)") + "",
                            maxlength: "*"
                        },
                        City: {
                            required: '*',
                            minlength: "* " + getLocale(AspxUserDashBoard, "(at least 2 chars)") + "",
                            maxlength: "*"
                        }
                    },
                    ignore: ":hidden"
                });

                $('#btnSubmitAddress').bind("click", function() {
                    if (v.form()) {
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
                                addressBook.AddUpdateUserAddress(state);
                            }
                        });
                        //addressBook.AddUpdateUserAddress();
                        if (addressBook.variables.addNewAddress > 0) {
                            csscody.info("<h2>" + getLocale(AspxUserDashBoard, 'Successful Message') + '</h2><p>' + getLocale(AspxUserDashBoard, 'Address has been saved successfully.') + "</p>");
                        } else if (addressBook.variables.addNewAddress < 0) {
                            return false;
                        } else {
                            csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Address has been updated successfully.") + "</p>");
                        }
                        addressBook.variables.addNewAddress = 0;
                        return false;
                    } else {
                        return false;
                    }
                });

                $("#ddlCountry ").bind("change", function() {
                    addressBook.GetStateList($(this).val());
                    $("#txtState").val('');
                });
            }
        };
        addressBook.init();
    });
 
   //]]>
</script>

<div class="cssClasMyAddressInformation">
    <div class="cssClassHeading">
        <h2>
           <span class="sfLocale"> Address Book</span></h2>
        <div class="sfButtonwrapper cssClassRight">
            <a href="#" id="lnkNewAddress" rel="popuprel"><span><span class="sfLocale">Add New Address</span></span>
            </a>
        </div>
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
                    <%--<li id="liDefaultBillingAddress"></li>--%>
                    <asp:Literal ID="ltrBillingAddress" runat="server" EnableViewState="false"></asp:Literal>
                </ol>
            </div>
        </div>
        <div class="cssClassCol2">
            <div class="cssClassAddressBook">
                <h3 class="sfLocale">
                    Additional Addresses Entries</h3>
                <%--<ol id="olAddtionalEntries">
                </ol>--%>
                <asp:Literal ID="ltrAdditionalEntries" runat="server" EnableViewState="false"></asp:Literal>
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
        <asp:Label ID="lblAddressTitle" runat="server"  Text="Address Details" 
            meta:resourcekey="lblAddressTitleResource1"></asp:Label>
    </h2>
    <div class="sfFormwrapper">
        <table id="tblNewAddress" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td>
                        <asp:Label ID="lblFirstName" runat="server" Text="First Name:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblFirstNameResource1"></asp:Label>
                        <span class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtFirstName" name="FirstName" class="required" minlength="2" maxlength="40"/>
                    </td>
                    <td>
                        <asp:Label ID="lblLastName" runat="server" Text="Last Name:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblLastNameResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtLastName" name="LastName" class="required" minlength="2" maxlength="40" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblEmail" runat="server" Text="Email:" CssClass="cssClassLabel" 
                            meta:resourcekey="lblEmailResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtEmailAddress" name="Email" class="required email" minlength="2" />
                    </td>
                     <td>
                        <asp:Label ID="lblCompany" Text="Company:" runat="server" 
                             CssClass="cssClassLabel" meta:resourcekey="lblCompanyResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtCompanyName" name="Company" maxlength="40" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblAddress1" Text="Address 1:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblAddress1Resource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtAddress1" name="Address1" class="required" minlength="2" maxlength="250"/>
                    </td>
                     <td>
                        <asp:Label ID="lblAddress2" Text="Address 2:" runat="server" 
                             CssClass="cssClassLabel" meta:resourcekey="lblAddress2Resource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtAddress2" name="Address2" maxlength="250"/>
                    </td>
                </tr>
                <tr>
                <td>
                        <asp:Label ID="lblCountry" Text="Country:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCountryResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                      <%--  <select id="ddlCountry" class="sfListmenu">
                        </select>--%>
                        <asp:Literal ID="ltrCountry" runat="server" EnableViewState="false"></asp:Literal>
                    </td>
                   
                     <td>
                        <asp:Label ID="lblState" Text="State/Province:" runat="server" 
                             CssClass="cssClassLabel" meta:resourcekey="lblStateResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtState" name="State" class="required" minlength="2" maxlength="250"/> <select id="ddlUSState" class="sfListmenu">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblZip" Text="Zip/Postal Code:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblZipResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtZip" name="Zip" class="required alphaNumberic" minlength="4" maxlength="10"/>
                    </td>
                    <td>
                        <asp:Label ID="lblCity" Text="City:" runat="server" CssClass="cssClassLabel" 
                            meta:resourcekey="lblCityResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtCity" name="City" class="required" minlength="2" maxlength="250" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblPhone" Text="Phone:" runat="server" CssClass="cssClassLabel" 
                            meta:resourcekey="lblPhoneResource1"></asp:Label><span
                            class="cssClassRequired">*</span>
                    </td>
                    <td>
                        <input type="text" id="txtPhone" name="Phone" class="required number" minlength="7" maxlength="20" />
                    </td>
                    <td>
                        <asp:Label ID="lblMobile" Text="Mobile:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblMobileResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtMobile" name="Mobile" class="number" minlength="10"  maxlength="20"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblFax" Text="Fax:" runat="server" CssClass="cssClassLabel" 
                            meta:resourcekey="lblFaxResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtFax" name="Fax" class="number" maxlength="20" />
                    </td>
                    <td>
                        <asp:Label ID="lblWebsite" Text="Website:" runat="server" 
                            CssClass="cssClassLabel" meta:resourcekey="lblWebsiteResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtWebsite" name="Wedsite" class="url" maxlength="50"/>
                    </td>
                </tr>
                <tr id="trShippingAddress">
                    <td>
                        <input type="checkbox" id="chkShippingAddress" class="sfLocale"/>
                    </td>
                    <td>
                        <asp:Label ID="lblDefaultShipping" Text=" Use as Default Shipping Address" runat="server"
                            CssClass="cssClassLabel" meta:resourcekey="lblDefaultShippingResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trBillingAddress">
                    <td>
                        <input type="checkbox" id="chkBillingAddress" class="sfLocale"/>
                    </td>
                    <td>
                        <asp:Label ID="lblDefaultBilling" Text="Use as Default Billing Address" runat="server"
                            CssClass="cssClassLabel" meta:resourcekey="lblDefaultBillingResource1"></asp:Label>
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
<input type="hidden" id="hdnAddressID" />
<input type="hidden" id="hdnDefaultShippingExist" />
<input type="hidden" id="hdnDefaultBillingExist" />
