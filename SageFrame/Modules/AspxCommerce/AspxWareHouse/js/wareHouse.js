var WareHouse;
$(function() {
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    WareHouse = {
        config: {
            isPostBack: false,
            async: true,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: AspxCommerce.utils.GetAspxServicePath(),
            method: "",
            url: "",
            ajaxCallMode: 0,
            error: 0
        },
        ajaxCall: function(config) {
            $.ajax({
                type: WareHouse.config.type,
                contentType: WareHouse.config.contentType,
                cache: WareHouse.config.cache,
                async: WareHouse.config.async,
                url: WareHouse.config.url,
                data: WareHouse.config.data,
                dataType: WareHouse.config.dataType,
                success: WareHouse.ajaxSuccess,
                error: WareHouse.ajaxFailure
            });
        },
        ajaxSuccess: function(msg) {

        },
        ajaxError: function() {
            switch (WareHouse.config.ajaxCallMode) {
                case 1:
                    csscody.error('<h2>' + getLocale(AspxWareHouse, "Error Message") + "</h2><p>" + getLocale(AspxWareHouse, "Failed to save ware House!") + '</p>');
                    break;
                case 2:
                    csscody.error("<h2>" + getLocale(AspxWareHouse, "Error Message") + "</h2><p>" + getLocale(AspxLatestItem, "Failed to delete ware House!") + "</p>");
                    break;
            }
        },
        GetCountry: function() {
            this.config.method = "AspxCommerceWebService.asmx/BindCountryList";
            this.config.url = this.config.baseURL + this.config.method;
            //this.config.async = false;
            //this.config.data = JSON2.stringify({ storeID: AspxCommerce.utils.GetStoreID(), portalID: AspxCommerce.utils.GetPortalID(), customerID: AspxCommerce.utils.GetCustomerID(), userName: AspxCommerce.utils.GetUserName(), cultureName: AspxCommerce.utils.GetCultureName(), sessionCode: AspxCommerce.utils.GetSessionCode() });
            this.ajaxSuccess = function(data) {
                if (data.d.length > 0) {
                    $("#ddlCountry").html('');
                    $.each(data.d, function(i, item) {
                        $("#ddlCountry").append($("<option>").attr('value', item.Value).html(item.Text));
                    });
                }

            };
            //this.config.error = 9;
            this.ajaxCall(this.config);
        },
        GetState: function(countryCode) {

            this.config.method = "AspxCommerceWebService.asmx/BindStateList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ countryCode: countryCode });
            this.ajaxSuccess = function(data) {
                if (data.d.length > 0) {
                    if (data.d[0].Value == "NEXS") {
                        $("#txtState").show();
                        $("#ddlState").hide();
                        return;
                    }
                    $("#ddlState").html('');
                    $("#txtState").hide();
                    $("#ddlState").show();
                    $.each(data.d, function(i, item) {
                        $("#ddlState").append($("<option>").attr('value', item.Value).html(item.Text));
                    });
                } else {
                    $("#txtState").show();
                    $("#ddlState").hide();
                }
            };
            this.ajaxCall(this.config);
        },
        AddWareHouse: function() {
            var wareHouse = {
                WareHouseID: parseInt($("#hdnWHouseID").val()),
                Name: $("#txtName").val(),
                StreetAddress1: $.trim($("#txtStreetAddress1").val()),
                StreetAddress2: $.trim($("#txtStreetAddress2").val()),
                City: $.trim($("#txtCity").val()),
                State: $.trim($("#txtState").val()) == "" ? $("#ddlState").val() : $.trim($("#txtState").val()),
                Country: $.trim($("#ddlCountry").val()),
                PostalCode: $.trim($("#txtPostalCode").val()),
                Fax: $.trim($("#txtFax").val()),
                Email: $.trim($("#txtEmail").val()),
                Phone: $.trim($("#txtPhone").val()),
                IsPrimary: $("#chkIsPrimary").attr("checked")
            };
            //   var id = parseInt($("#hdnWHouseID").val());
            //   var Name = $("#txtName").val(), StreetAddress = $.trim($("#txtStreetAddress1").val()), StreetAddress2 = $.trim($("#txtStreetAddress2").val()), City = $.trim($("#txtCity").val()), State = $.trim($("#txtState").val()) == "" ? $("#ddlState").val() : $.trim($("#txtState").val()), Country = $.trim($("#ddlCountry").val()), PostalCode = $.trim($("#txtPostalCode").val()), Fax = $.trim($("#txtFax").val()), Email = $.trim($("#txtEmail").val(), Phone = $("#txtPhone").val()), IsPrimary = $("#chkIsPrimary").attr("checked");
            this.config.method = "AspxCommerceWebService.asmx/AddUpDateWareHouse";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ wareHouse: wareHouse, aspxCommonObj: aspxCommonObj });
            this.ajaxSuccess = function() {
                csscody.info("<h2>" + getLocale(AspxWareHouse, "Successful Message") + "</h2><p>" + getLocale(AspxWareHouse, "WareHouse has been saved successfully.") + "</p>");
                WareHouse.GetAllWareHouseList();
                WareHouse.ClearField();
                $("#popuprel3,#fade").fadeOut();
            };
            this.ajaxCall(this.config);
        },
        ClearField: function() {
            $("#hdnWHouseID").val(0);
            $("#txtName").val('');
            $("#txtStreetAddress1").val('');
            $("#txtStreetAddress2").val('');
            $("#txtCity").val('');
            $("#txtState").val('');
            $("#ddlCountry").val("US").trigger('change');
            $("#txtPostalCode").val('');
            $("#txtFax").val('');
            $("#txtEmail").val('');
            $("#txtPhone").val('');
            $("#chkIsPrimary").attr("checked", false);
        },
        GetAllWareHouseById: function(id) {
            this.config.method = "AspxCommerceWebService.asmx/GetAllWareHouseById";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ wareHouseID: id, aspxCommonObj: aspxCommonObj });
            this.ajaxSuccess = function(msg) {

                $.each(msg.d, function(index, item) {
                    $("#txtName").val(item.Name);
                    $("#txtStreetAddress1").val(item.StreetAddress1);
                    $("#txtStreetAddress2").val(item.StreetAddress2);
                    $("#txtCity").val(item.City);
                    if (item.Country != "US") {
                        $("#txtState").show().val(item.State);
                        $("#ddlState").hide();
                    } else {
                        $("#ddlState").show();
                        $("#ddlState").val(item.State);
                        $("#txtState").hide();
                    }
                    $("#ddlCountry").val(item.Country);
                    $("#txtPostalCode").val(item.PostalCode);
                    $("#txtFax").val(item.Fax);
                    $("#txtEmail").val(item.Email);
                    $("#txtPhone").val(item.Phone);
                    $("#chkIsPrimary").attr("checked", item.IsPrimary == true ? true : false);
                });
            };
            this.ajaxCall(this.config);
        },
        Edit: function(tblID, argus) {
            WareHouse.ClearField();
            $("#hdnWHouseID").val(argus[0]);
            ShowPopupControl('popuprel3');
            $("#popuprel3 .cssClassHeader").find('h2').html(getLocale(AspxWareHouse, 'Edit WareHouse'));
            WareHouse.GetAllWareHouseById(argus[0]);
        },
        Delete: function(tblID, argus) {
            switch (tblID) {
                case "gdvWareHouse":
                    var properties = {
                        onComplete: function(e) {
                            if (e) {
                                WareHouse.DeleteWareHouseID(argus[0]);
                            } else {
                                return false;
                            }
                        }
                    };
                    csscody.confirm("<h2>" + getLocale(AspxWareHouse, "Delete Confirmation") + "</h2><p>" + getLocale(AspxWareHouse, "Are you sure you want to delete this WareHouse?") + "</p>", properties);
                    break;
                default:
                    break;
            }
        },
        ConfirmDeleteWareHouse: function() {
            var itemId = [];
            $("#gdvWareHouse .attrChkbox").each(function(i) {
                if ($(this).attr("checked")) {
                    itemId.push($(this).val());
                }
            });
            if (itemId != "") {
                var properties = {
                    onComplete: function(e) {
                        WareHouse.DeleteWareHouse(itemId, e);
                    }
                };
                csscody.confirm("<h2>" + getLocale(AspxWareHouse, "Delete Confirmation") + "</h2><p>" + getLocale(AspxWareHouse, "Are you sure you want to delete all selected WareHouse?") + "</p>", properties);
            } else {
                csscody.alert("<h2>" + getLocale(AspxWareHouse, "Information Alert") + "</h2><p>" + getLocale(AspxWareHouse, "Please select at least one ware house before delete.") + "</p>");
            }
        },
        DeleteWareHouse: function(ids, event) {
            if (event) {
                for (var id in ids) {
                    WareHouse.DeleteWareHouseID(ids[id]);
                }
                csscody.info("<h2>" + getLocale(AspxWareHouse, "Successful Message") + "</h2><p>" + getLocale(AspxWareHouse, "WareHouse has been deleted successfully.") + "</p>");
            }
        },
        DeleteWareHouseID: function(id) {
            this.config.method = "AspxCommerceWebService.asmx/DeleteWareHouse";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({ wareHouseId: id, aspxCommonObj: aspxCommonObj });
            this.ajaxSuccess = function() {
                WareHouse.ClearField();
                WareHouse.GetAllWareHouseList();
                csscody.info("<h2>" + getLocale(AspxWareHouse, "Successful Message") + "</h2><p>" + getLocale(AspxWareHouse, "WareHouse has been deleted successfully.") + "</p>");

            };
            this.ajaxCall(this.config);
        },
        GetAllWareHouseList: function() {
            this.config.method = "AspxCommerceWebService.asmx/GetAllWareHouse";
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("gdvWareHouse_pagesize").length > 0) ? $("#gdvWareHouse_pagesize :selected").text() : 10;

            $("#gdvWareHouse").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: getLocale(AspxWareHouse, 'Ids'), name: 'Ids', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'attrChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                    { display: getLocale(AspxWareHouse, 'Name'), name: 'Name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxWareHouse, 'Address'), name: 'Address', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxWareHouse, 'Is Primary'), name: 'IsPrimary', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' },
                    { display: getLocale(AspxWareHouse, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                    { display: getLocale(AspxWareHouse, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'WareHouse.Edit', arguments: '1' },
                    { display: getLocale(AspxWareHouse, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'WareHouse.Delete', arguments: '1' }
                ],

                rp: perpage,
                nomsg: getLocale(AspxWareHouse, "No Records Found!"),
                param: { aspxCommonObj: aspxCommonObj },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 4: { sorter: false} }
            });
        },
        Init: function() {
            WareHouse.GetAllWareHouseList();

            $("#ddlCountry").change(function() {
                WareHouse.GetState($.trim($(this).find("option:selected").val()));
            });
            var v = $("#form1").validate({
                messages: {
                    storeName: {
                        required: '*',
                        minlength: "*",
                        maxlength: "*"
                    },
                    streetAddress: {
                        required: '*',
                        minlength: "*",
                        maxlength: "*"
                    },
                    streetAddress2: {
                        required: '*',
                        minlength: "*",
                        maxlength: "*"
                    },
                    city: {
                        required: '*',
                        minlength: "*"
                    },
                    state: {
                        required: '*',
                        minlength: "*"
                    },
                    postalCode: {
                        required: '*',
                        maxlength: "*",
                        minlength: "*"
                        //number: true
                    },
                    fax: {
                        maxlength: "*"
                    },
                    email: {
                        email: getLocale(AspxWareHouse, 'not valid')
                        //number: true
                    },
                    phone: {
                        maxlength: "*",
                        minlength: "*"
                        //number: true
                    }
                },
                rules:
                    {
                        storeName: { minlength: 2 },
                        streetAddress: { minlength: 5 },
                        streetAddress2: { minlength: 5 },
                        mobile: { minlength: 10 },
                        city: { minlength: 2 },
                        state: { minlength: 2 },
                        postalCode: { minlength: 5 },
                        fax: { minlength: 7 },
                        //  email: { minlength: 5 },
                        phone: { minlength: 7 }
                    },
                ignore: ":hidden"
            });

            WareHouse.GetCountry();
            $("#btnSave").bind("click", function() {
                if (v.form()) {
                    WareHouse.AddWareHouse();
                }
            });
            $("#btnAddWareHouse").bind("click", function() {
                WareHouse.ClearField();
                ShowPopupControl('popuprel3');
                $("#popuprel3 .cssClassHeader").find('h2').html(getLocale(AspxWareHouse, 'Add WareHouse'));
            });
            $("#btnCancel,.cssClassClose").bind("click", function() {
                WareHouse.ClearField();
                $("#popuprel3,#fade").fadeOut();
            });
            $("#btnDeleteSelectedWareHouse").bind("click", function() {
                WareHouse.ConfirmDeleteWareHouse();
            });
        }
    };
    WareHouse.Init();
});