$(function() {
    var RootPath = AspxCommerce.utils.GetAspxRootPath();
    rewardPointsObj = {
        Email: "",
        RewardRuleID: 2
    };
    aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName(),
        CustomerID: AspxCommerce.utils.GetCustomerID(),
        SessionCode: AspxCommerce.utils.GetSessionCode()

    };

    var NewsLetter = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: { data: '' },
            dataType: 'json',
            baseURL: NewsLetterPath + 'Services/NewsLetterWebService.asmx/',
            method: "",
            url: "",
            ajaxCallMode: "",
            ModulePath: '',
            PortalID: PortalID,
            UserModuleID: UserModuleID,
            UserName: UserName,
            PageExt: PageExt

        },
        ajaxCall: function(config) {
            $.ajax({
                type: NewsLetter.config.type,
                contentType: NewsLetter.config.contentType,
                cache: NewsLetter.config.cache,
                async: NewsLetter.config.async,
                url: NewsLetter.config.url,
                data: NewsLetter.config.data,
                dataType: NewsLetter.config.dataType,
                success: NewsLetter.config.ajaxCallMode,
                error: NewsLetter.config.error
            });
        },
        init: function() {
            $('input:radio[value=ByEmail]').attr('checked', true);
            $('input:radio[value=ByPhone]').attr('checked', false);
            $('#phoneSubscribe').hide();
            $('#divEmailSubsCribe').show();
            //NewsLetter.GetSetting();
            $("#imageplace").html('<img src="' + NewsLetterPath + 'images/subscribe.png" alt="subscribe"/>');
            //            $('#lblmessage').click(function() {
            //                $(this).hide();
            //            });

        },
        IsModuleInstalled: function() {
            var rewardPoints = 'AspxRewardPoints';
            $.ajax({
                type: "POST",
                url: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/" + "GetModuleInstallationInfo",
                data: JSON2.stringify({ moduleFriendlyName: rewardPoints, aspxCommonObj: aspxCommonObj }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function(response) {
                    var isInstalled = response.d;
                    if (isInstalled == true) {
                        NewsLetter.SaveRewardPointsCore();
                    }
                },
                error: function() {
                    csscody.error("<h2>Error Message</h2><p>Failed to load module installation information!.</p>");
                }
            });
        },
        SaveRewardPointsCore: function() {
            rewardPointsObj.Email = $("#txtEmail").val();
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";

            this.config.method = "RewardPointsSaveNewsLetter";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.async = false;
            this.config.data = JSON2.stringify({ rewardPointsInfo: rewardPointsObj, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = NewsLetter.SaveRewardPointsCoreSuccess;
            this.config.error = NewsLetter.SaveRewardPointsCoreError;
            this.ajaxCall(this.config);
        },
        SaveRewardPointsCoreSuccess: function() {
            //csscody.info("<h2>Successful Message</h2><p>Reward points added to your account for news letter subscription</p>");
            //$('#fade, #popuprel2').fadeOut();
        },
        SaveRewardPointsCoreError: function() {
            csscody.error("<h2>Error Message</h2><p>Failed to add reward points!</p>");
        },
        SaveEmailSubscriber: function() {
            var email = $("#txtEmail").val();
            if (NewsLetter.CheckPreviousEmailSubscription(email)) {
                var html = GetSystemLocale('You are already a subscribed member');
                $("#lblmessage").html(html);
                $('#lblmessage').removeClass('sfSuccesssubscribe');
                $('#lblmessage').addClass('sfErrorsubscribe');
            }

            else {
                var mydata = JSON2.stringify({ Email: email, UserModuleID: NewsLetter.config.UserModuleID, PortalID: NewsLetter.config.PortalID, UserName: NewsLetter.config.UserName });

                $.ajax({
                    type: "POST",
                    async: false,
                    url: NewsLetter.config.baseURL + "SaveEmailSubscriber",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {
                        if (aspxCommonObj.CustomerID != 0) {
                            NewsLetter.IsModuleInstalled();
                        }
                        $("#txtEmail").val('');
                        $("#lblmessage").html(GetSystemLocale("Subscribed Successfully")).css({ "color": "green" });
                        $('#lblmessage').addClass('sfSuccesssubscribe');
                    },
                    error: function() {
                    }
                });
            }


        },
        CheckPreviousEmailSubscription: function(email) {
            var bitval = true;
            $.ajax({
                type: "POST",
                async: false,
                url: NewsLetter.config.baseURL + "CheckPreviousEmailSubscription",
                data: JSON2.stringify({ Email: email }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {

                    if (data.d.length > 0) {
                        bitval = true;
                    }
                    else {
                        bitval = false;
                    }

                },
                error: function() {
                }

            });
            return bitval;
        },
        SaveMobileSubscriber: function() {
            var phone = $("#txtPhone").val();
            var mydata = JSON2.stringify({ Phone: phone, UserModuleID: NewsLetter.config.UserModuleID, PortalID: NewsLetter.config.PortalID, UserName: NewsLetter.config.UserName });
            $.ajax({
                type: "POST",
                async: false,
                url: NewsLetter.config.baseURL + "SaveMobileSubscriber",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    if (aspxCommonObj.CustomerID != 0) {
                        NewsLetter.IsModuleInstalled();
                    }
                    $("#txtPhone").val('');
                    $("#lblmessage").html(GetSystemLocale("Subscribed Successfully")).css({ "color": "green" });
                },
                error: function() {
                }
            });
        },
        GetSetting: function() {
            var param = JSON2.stringify({ UserModuleID: NewsLetter.config.UserModuleID, PortalID: NewsLetter.config.PortalID });
            $.ajax({
                type: "POST",
                url: NewsLetter.config.baseURL + "GetNLSetting",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    $.each(data.d, function(index, item) {
                        $("#header h2").html(item.ModuleHeader);
                        $("#header h4").html(item.ModuleDescription);
                        if (item.IsMobileSubscription == "false") {
                            $("#divRadios").hide();
                            $("#phoneSubscribe").hide();
                        }
                        $("#btnUnsubscibe").attr("href", item.UnSubscribePageName + PageExt);
                    });
                },
                error: function() {
                    //alert('error');
                }
            });
        }

    };
    NewsLetter.init();

    jQuery('input[name=rdbSubcribe]:radio').click(function() {
        var clickval = jQuery(this).val();
        if (clickval == 'ByEmail') {
            $('#divEmailSubsCribe').show();
            $('#phoneSubscribe').hide();


        }
        else if (clickval == 'ByPhone') {
            $('#divEmailSubsCribe').hide();
            $('#phoneSubscribe').show();
        }
    });
    $("#btnSubscribe").die().live("click", function(event) {
        event.preventDefault();
        if ($('input:radio[value=ByEmail]').attr('checked') == true) {
            var email = $('#divEmailSubsCribe>#txtEmail').val();
            var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
            if (!email_check.test(email)) {
                $('#divSubscribe>#lblmessage').text(GetSystemLocale("Invalid Email")).css({ "display": "block", "color": "red" });
                return false;
            }
            else {
                NewsLetter.SaveEmailSubscriber();
                return true;
            }

        }
        else {
            if ($("#txtPhone").val() != "") {
                NewsLetter.SaveMobileSubscriber();

            }
            return true;
        }
    });

});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}