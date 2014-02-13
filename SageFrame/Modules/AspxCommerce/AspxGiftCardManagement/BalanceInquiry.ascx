<%@ Control Language="C#" AutoEventWireup="true" CodeFile="BalanceInquiry.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxGiftCardManagement_BalanceInquiry" %>

<script type="text/javascript">

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGiftCardManagement
        });


        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID()
            };
            return aspxCommonInfo;
        };
        var aspxUserGiftCard = function() {
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


            var showMsg = function(type, messege) {
                switch (type) {
                case 'alert':
                    csscody.alert("<h2>" + getLocale(AspxGiftCardManagement, "Information Alert") + "</h2><p>" + messege + "<p>");
                    break;
                case 'info':
                    csscody.info('<h2>' + getLocale(AspxGiftCardManagement, "Successful Message") + '</h2><p>' + messege + '</p>');
//                    if (!$("#popuprel").is(":hidden")) {
//                        $("#fade,#popuprel").fadeOut();
//                        clearForm();
//                    }
                    break;
                case 'error':
                    csscody.error('<h2>' + getLocale(AspxGiftCardManagement, "Error Message") + '</h2><p>' + messege + '</p>');
                    break;
                }
            };
            var dateDeserialize = function(content, format) {
                content = eval('new ' + content.replace( /[/]/gi , ''));
                return formatDate(content, format);
            };
            var isNumber = function(o) {
                return typeof o === 'number' && isFinite(o);
            };
            var checkBalance = function(code, pin) {
                var param = JSON2.stringify({ giftcardCode: code, giftCardPinCode: pin, aspxCommonObj: aspxCommonObj() });

                $ajaxCall("checkGiftCardBalance", param, function(data) {
                    $("#dvGiftCardStatement").show();
                    if (data.d.length > 0) {
                        $("#inquiryResult").html('');
                        var trHeader = "<tr class='cssClassHeadeTitle'><td>" + getLocale(AspxGiftCardManagement, "S.N") + "</td><td>" + getLocale(AspxGiftCardManagement, "Date") + "</td><td>" + getLocale(AspxGiftCardManagement, "Transaction") + "</td><td>" + getLocale(AspxGiftCardManagement, "Deposit") + "</td><td>" + getLocale(AspxGiftCardManagement, "Withdrawal") + "</td><td>" + getLocale(AspxGiftCardManagement, "Balance") + "</td></tr>";
                        $("#inquiryResult").append(trHeader);
                        $.each(data.d.reverse(), function(index, item) {

                            var tddata = "<tr><td>" + parseInt(index + 1) + "</td>";
                            tddata += "<td>" + dateDeserialize(item.AddedOn, 'yyyy/MM/dd') + "</td>";
                            tddata += "<td>" + item.Note + "</td>";
                            tddata += "<td>" + item.Deposit + "</td>";
                            tddata += "<td>" + item.UsedAmount + "</td>";
                            tddata += "<td>" + item.Balance + "</td> </tr>";

                            if (parseInt(index) == 0) {
                                //$('#giftcardAmount').html("Gift Card Amount: " + item.Price);
                                $('#currentBalance').html(getLocale(AspxGiftCardManagement, "Current Balance: ") + item.Balance);
                            }


                            $("#inquiryResult").append(tddata);
                        });
                        $("#txtGiftCardCode").val('');
                        $("#txtPinCode").val('');
                    } else {
                        $("#inquiryResult").html('').html('<tr><td><span class="cssClassRequired">' + getLocale(AspxGiftCardManagement, "Invalid Gift Card Code or Expired!") + '</span></td></tr>');
                    }
                }, null);

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

                $("#txtPinCode").bind("keypress", function(e) {
                    if (e.which == 13) {
                        var gCode = $.trim($("#txtGiftCardCode").val());
                        var gpin = $.trim($("#txtPinCode").val());
                        if (gCode != "" && gpin != "") {

                            if (isNumber(parseFloat(gpin))) {
                                if (isValidForm.form()) {
                                    checkBalance(gCode, gpin);
                                } else {
                                    showMsg('alert', getLocale(AspxGiftCardManagement, "Please enter required code!"));
                                    return false;
                                }
                            } else {
                                showMsg('alert', getLocale(AspxGiftCardManagement, "Please enter valid pincode!"));
                                return false;
                            }
                        }
                        return false;
                    }

                });

                $("#btnBalanceCheck").bind("click", function() {
                    var gCode = $.trim($("#txtGiftCardCode").val());
                    var gpin = $.trim($("#txtPinCode").val());
                    if (gCode != "" && gpin != "") {
                        if (isNumber(parseFloat(gpin))) {
                            if (isValidForm.form()) {
                                checkBalance(gCode, gpin);
                            } else {
                                showMsg('alert', getLocale(AspxGiftCardManagement, "Please enter required code!"));
                                return false;
                            }
                        } else {
                            showMsg('alert', getLocale(AspxGiftCardManagement, "Please enter valid pincode!"));
                            return false;
                        }
                    } else {
                        showMsg('alert', getLocale(AspxGiftCardManagement, "Please enter required code!"));
                        return false;
                    }
                });
            };

            return init();
        }();


    });
 
    
</script>

<div class="cssClassCommonBox Curve">
    <div class="cssClassHeader">
            <h2>
<span class="sfLocale">Online Balance Inquiry</span>
            </h2>
    </div>
    <div>
        <p class="sfLocale">
          To check the balance of your  Gift Card, please enter its Number and PIN below.
        </p>
        
    </div>
    <div class="sfGridwrapper">
        <div class="sfGridWrapperContent">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <label>
                           <span class="sfLocale">Gift Card Code</span><span class="cssClassRequired">*</span>:</label>
                    </td>
                    <td>
                        <input type="text" id="txtGiftCardCode" name="giftcardcode"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <span class="sfLocale">Pin Code</span><span class="cssClassRequired">*</span>:</label>
                    </td>
                    <td>
                        <input type="password" id="txtPinCode" name="giftcardpincode" />
                    </td>
                </tr>
            </table>
            <div class="sfButtonwrapper">
                <p>
                    <button type="button" id="btnBalanceCheck">
                        <span><span class="sfLocale">Get Balance</span></span>
                    </button>
                </p>
            </div>
            <div class="clear"></div>
            <div class="sfFormwrapper">
                <div id="dvGiftCardStatement" style="display: none;">
                <div class="sfGridWrapperContent">
                    <div class="cssClassCommonBox Curve">
                        <div class="cssClassHeader">
                            <h2>
                                <asp:Label ID="lbl" runat="server" Text="Gift Card History" 
                                    meta:resourcekey="lblResource1"></asp:Label>
                            </h2>
                           
                        </div>
                        <table id="inquiryResult" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                </td>
                            </tr>
                        </table>
                         <div class="cssClassHeaderRight">                               
                                <p id="currentBalance">
                                </p>
                            </div>
                    </div>
                </div>
                </div>
                <div class="clear"></div>
               
            </div>
        </div>
    </div>
    </div>
