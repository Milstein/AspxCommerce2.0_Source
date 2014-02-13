<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShippingRateEstimate.ascx.cs"
    Inherits="ShippingRateEstimate" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxShippingRateEstimate
        });
        var showShippingRateCalculator = '<%=ShowRateEstimate %>';
        var count = parseInt('<%=Count %>');
        var postalCountry = ["AU", "AT", "BE", "BR", "CA", "CN", "DK", "FI", "GQ", "FR", "DE", "GR", "IN", "ID", "IT", "JP", "LY", "LU", "MY", "MX", "NL", "NO", "PH", "PT", "RU", "SG", "ZA", "KR", "SE", "ES", "CH", "SY", "TH", "TR", "TM", "UK"];
        var dimentionalUnit = "<%=DimentionalUnit%>";
        var weightUnit = "<%=WeightUnit%>";
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            CustomerID: AspxCommerce.utils.GetCustomerID(),
            SessionCode: AspxCommerce.utils.GetSessionCode()
        };
        var rate = {
            config: {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: "json",
                baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                url: "",
                method: ""
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: rate.config.type,
                    contentType: rate.config.contentType,
                    cache: rate.config.cache,
                    async: rate.config.async,
                    data: rate.config.data,
                    dataType: rate.config.dataType,
                    url: rate.config.url,
                    success: rate.ajaxSuccess,
                    error: rate.ajaxFailure
                });
            },
            ajaxFailure: function(data) {
                // break;
            },
            ajaxSuccess: function(data) {
                //break;
            },
            Get: function() {
                var shipToAddress = {
                    ToCity: $.trim($("#txtCity").val()),
                    ToCountry: $.trim($("#ddlcountry").val()),
                    ToCountryName: $.trim($("#ddlcountry :selected").text()),
                    ToAddress: "",
                    ToState: $.trim($("#ddlState").val()),
                    ToPostalCode: $.trim($("#txtPostalCode").val()),
                    ToStreetAddress1: "",
                    ToStreetAddress2: ""
                };

                var basketItems = AspxCart.GetCartInfoForRate();

                var itemsDetail = {
                    DimensionUnit: dimentionalUnit,
                    IsSingleCheckOut: true,
                    ShipToAddress: shipToAddress,
                    WeightUnit: weightUnit,
                    BasketItems: basketItems,
                    CommonInfo: aspxCommonObj
                };

                this.config.url = this.config.baseURL + "GetRate";
                this.config.data = JSON2.stringify({ itemsDetail: itemsDetail });
                this.ajaxSuccess = function(data) {
                    if (data.d.length > 0) {
                        var rateList;
                        rateList += "<thead class=\"cssClassHeadeTitle\"><tr><td>" + getLocale(AspxShippingRateEstimate, "Shipping Method") + "</td><td>" + getLocale(AspxShippingRateEstimate, "Estimated Delivery") + "</td><td>" + getLocale(AspxShippingRateEstimate, "Rate") + "</td><td>" + getLocale(AspxShippingRateEstimate, "Currency") + "</td></tr></thead><tbody>";
                        $.each(data.d, function(index, value) {
                            var currency = value.CurrencyCode == null ? "USD" : value.CurrencyCode;
                            var delivery = value.DeliveryTime == null ? "N/A" : value.DeliveryTime;

                            delivery = delivery == "" ? "N/A" : delivery;
                            currency = currency == "" ? "USD" : currency;
                            rateList += "<tr><td>" + value.ShippingMethodName + " </td><td>" + delivery + " </td><td>" + value.TotalCharges + " </td><td>" + currency + " </td></tr>";
                        });
                        rateList += "</tbody>";
                        $("#gdvRateDetail").html(rateList);
                        $("#gdvRateDetail").find("tbody tr:even").addClass("sfEven");
                        $("#gdvRateDetail").find("tbody tr:even").addClass("sfOdd");
                        $("#result").show();
                    } else {
                        $("#gdvRateDetail").html("<p>" + getLocale(AspxShippingRateEstimate, "No Results to display!") + "</p>");
                        $("#result").show();
                    }
                };
                this.ajaxCall(this.config);
            },
            GetCountryList: function() {
                this.config.url = this.config.baseURL + "LoadCountry";
                this.config.data = JSON2.stringify({});
                this.ajaxSuccess = function(data) {
                    if (data.d.length > 0) {
                        var options = "";
                        $.each(data.d, function(index, value) {
                            options += "<option value=" + value.CountryCode + ">" + value.Country + " </option>";

                        });
                        $("#ddlcountry").html(options);
                        Array.prototype.Match = function(countryCode) {
                            for (var i = 0; i < this.length; i++) {
                                if (this[i] == countryCode) {
                                    return true;
                                }
                            }
                            return false;
                        };

                        $("#ddlcountry").bind("change", function() {
                            rate.BindState($(this).val());
                        });

                    }
                };
                this.ajaxCall(this.config);
            },
            BindState: function(countryCode) {

                this.config.url = this.config.baseURL + "GetStatesByCountry";
                this.config.data = JSON2.stringify({ countryCode: countryCode });
                this.ajaxSuccess = function(data) {
                    if (data.d.length > 0) {
                        var options = "";
                        $.each(data.d, function(index, value) {
                            options += "<option value=" + value.StateCode + ">" + value.State + " </option>";

                        });
                        $("#state").show();
                        $("#ddlState").show();
                        $("#postalCode").show().val('');
                        $("#txtState").hide();
                        $("#ddlState").html(options);

                    } else if (postalCountry.Match(countryCode)) {
                        $("#postalCode").show().val('');
                    } else {
                        $("#state").hide();
                        $("#ddlState").hide();
                        $("#postalCode").hide().val('');
                        $("#txtState").show().val('');
                    }
                };
                this.ajaxCall(this.config);
                //}

            },
            Init: function() {

                if (count > 0) {
                    $("#dvEstimateRate").show();

                } else {
                    $("#dvEstimateRate").hide();
                    return false;
                }

                $("input[name=Addtolist]").bind("click", function() {
                    if ($(this).val() == 1) {
                        $("#txtCity").val('');
                        $("#city").toggle();
                    }

                });

                $("#imbPlus").bind("click", function() {
                    $("#addmore").toggle();
                });
                rate.GetCountryList();

                var v = $("#form1").validate({
                    messages: {
                        postalCode: {
                            required: '*',
                            minlength: "*",
                            maxlength: "*"
                        },
                        state: {
                            required: '*',
                            minlength: "*",
                            maxlength: "*"
                        }
                    },
                    rules:
                        {
                            state: { minlength: 2, required: true },
                            postalCode: { minlength: 4, required: true }
                        },
                    ignore: ":hidden"
                });


                $("#btnCalculateRate").bind("click", function() {
                    if (v.form()) {
                        rate.Get();
                    }
                });

                $(".toogleSwitch").find("a").bind("click", function() {
                    $(".toogleWrapper").toggle();
                    if ($(".toogleWrapper").is(":visible"))
                        $(this).html( getLocale(AspxShippingRateEstimate,'hide estimate shipping rate'));
                    else
                        $(this).html( getLocale(AspxShippingRateEstimate,'estimate shipping rate'));

                });

            }
        };

        if (showShippingRateCalculator.toLowerCase() == 'true' || showShippingRateCalculator == true) {
            rate.Init();
        }

    });
    
    
</script>

<div id="dvEstimateRate" class="sfFormwrapper" style="display: none;">
    <div class="toogleSwitch">
        <a href="javascript:;" class="sfLocale">estimate shipping rate</a>
    </div>
    <div class="clear">
    </div>
    <div class="toogleWrapper" style="display: none;">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblHead" runat="server" Text="Estimate Shipping Rate" meta:resourcekey="lblHeadResource1"></asp:Label>
            </h2>
        </div>
        <div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td>
                        <asp:Label ID="lblCountry" runat="server" CssClass="sfLabel" Text="Choose Country:"
                            meta:resourcekey="lblCountryResource1"></asp:Label>
                    </td>
                    <td>
                        <select id="ddlcountry" class="sfListmenu">
                        </select>
                    </td>
                    <td id="addmore">
                        <label>
                            <input type="checkbox" id="chkAddCity" class="sfCheckbox" name="Addtolist" value="1" /><span class="sfLocale">Add City</span>
                        </label>
                    </td>
                </tr>
                <tr id="state" style="display: none;">
                    <td>
                        <asp:Label ID="lblState" runat="server" CssClass="sfLabel" Text="State:" meta:resourcekey="lblStateResource1"></asp:Label>
                    </td>
                    <td>
                        <select id="ddlState" class="sfListmenu">
                        </select>
                        <input type="text" id="txtState" name="state" visible="false" class="sfInputbox" />
                    </td>
                </tr>
                <tr id="city" style="display: none;">
                    <td>
                        <asp:Label ID="lblCity" runat="server" CssClass="sfLabel" class="sfInputbox" Text="City:"
                            meta:resourcekey="lblCityResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtCity" name="city" class="sfInputbox" />
                    </td>
                </tr>
                <tr id="postalCode" style="display: none;">
                    <td>
                        <asp:Label ID="lblPostalCode" runat="server" CssClass="sfLabel" Text="Postal Code:"
                            meta:resourcekey="lblPostalCodeResource1"></asp:Label>
                    </td>
                    <td>
                        <input type="text" id="txtPostalCode" name="postalCode" class="sfInputbox required" />
                    </td>
                </tr>
            </table>
            <div class="sfButtonwrapper">
                <div class="sfBtn">
                    <button type="button" id="btnCalculateRate">
                        <span><span class="sfLocale">Get Estimate Rate</span></span></button>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
        <div id="result" style="display: none;">
            <div class="cssClassCommonBox Curve">
                <div class="sfFormwrapper">
                    <table id="gdvRateDetail" cellspacing="0" cellpadding="0" border="0" width="100%">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
