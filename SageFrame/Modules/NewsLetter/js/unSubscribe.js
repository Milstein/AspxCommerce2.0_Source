$(function () {
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
            subscriberID: ''

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
        init: function () {
            $('input:radio[value=ByEmail]').attr('checked', true);
            $('input:radio[value=ByPhone]').attr('checked', false);
            $('#phoneUnSubscribe').hide();
            $('#divEmailUnSubsCribe').show();
            NewsLetter.GetSetting();
            $("#imageplace").html('<img src="' + NewsLetterPath + 'images/UnSubscribe.jpg" alt="subscribe"/>');

            if (document.location.search.length) {
                $("#divUnSubscribe").hide();
                $("#unsubscribeEmailLink").show();

            }
            else {
                $("#divUnSubscribe").show();
                $("#unsubscribeEmailLink").hide();
            }
            var subscriberID = "";
            NewsLetter.config.subscriberID = NewsLetter.GetsubScriberID(subscriberID);
            if (!isNaN(NewsLetter.config.subscriberID)) {
                if (NewsLetter.config.subscriberID != "null") {
                    alert(NewsLetter.config.subscriberID);
                    NewsLetter.UnSubscribeByEmailLink(NewsLetter.config.subscriberID);

                }
            }
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
                        NewsLetter.DeleteRewardPoint();
                    }
                },
                error: function() {
                    csscody.error("<h2>Error Message</h2><p>Failed to load module installation information!.</p>");
                }
            });
        },
        DeleteRewardPoint: function() {
            var ModuleServicePath = RootPath + "Modules/AspxCommerce/AspxRewardPoints/Services/RewardPointsWebService.asmx/";
            this.config.method = "RewardPointsDeleteNewsLetter";
            this.config.url = ModuleServicePath + this.config.method;
            this.config.data = JSON2.stringify({ rewardPointsInfo: rewardPointsObj, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = RewardPointsHistory.DeleteRewardPointSuccess;
            this.ajaxCall(this.config);

        },
        DeleteRewardPointSuccess: function() {
            csscody.info("<h2>Successful Message</h2><p>Reward points deleted from your account for news letter Unsubscription !</p>");

        },
        GetsubScriberID: function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        },
        UnSubscribeByEmailLink: function (subscriberID) {
            var param = JSON2.stringify({ subscriberID: subscriberID });
            $.ajax({
                type: "POST",
                url: NewsLetter.config.baseURL + "UnSubscribeByEmailLink",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                NewsLetter.IsModuleInstalled();
                    $('.message').html("We are very sorry to know that you unsubscribe our news letter!!!");
                }
            });
        },
        UnSubscribeUserByEmail: function () {
            var email = $("#txtEmailUnSubscribe").val();
            var mydata = JSON2.stringify({ Email: email });
            $.ajax({
                type: "POST",
                async: false,
                url: NewsLetter.config.baseURL + "UnSubscribeUserByEmail",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                if (aspxCommonObj.CustomerID != 0) {
                    NewsLetter.IsModuleInstalled();
                }
                    $("#txtEmailUnSubscribe").val('');
                    $("#lblmessage").html("UnSubscibed Successfully");
                },
                error: function () {
                }
            });



        },
        UnSubscribeUserByMobile: function () {
            var phone = $("#txtPhone").val();
            var mydata = JSON2.stringify({ Phone: phone });
            $.ajax({
                type: "POST",
                async: false,
                url: NewsLetter.config.baseURL + "UnSubscribeUserByMobile",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                if (aspxCommonObj.CustomerID != 0) {
                    NewsLetter.IsModuleInstalled();
                }
                    $("#txtPhone").val('');
                    $("#lblmessage").html("UnSubscibed Successfully");
                },
                error: function () {
                }
            });
        },
        GetSetting: function () {
            var param = JSON2.stringify({});
            $.ajax({
                type: "POST",
                url: NewsLetter.config.baseURL + "GetNLSettingForUnSubscribe",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.each(data.d, function (index, item) {

                        if (item.IsMobileSubscription == "false") {
                            $("#divRadio").hide();
                            $("#phoneUnSubscribe").hide();
                        }
                    });
                },
                error: function () {
                    alert('error');
                }
            });
        }
    };
    NewsLetter.init();
    jQuery('input[name=rdbUnSubcribe]:radio').click(function () {
        var clickval = jQuery(this).val();
        if (clickval == 'ByEmail') {
            $('#divEmailUnSubsCribe').show();
            $('#phoneUnSubscribe').hide();
        }
        else if (clickval == 'ByPhone') {
            $('#divEmailUnSubsCribe').hide();
            $('#phoneUnSubscribe').show();
        }
    });
    $("#btnUnSubscribe").die().live("click", function (event) {
        event.preventDefault();
        if ($('input:radio[value=ByEmail]').attr('checked') == true) {
            var v = $('#form1').validate({
                rules: {
                    Email: { required: true, email: true }

                },
                messages: {
                    Email: { required: '*' }

                }
            });

            if (v.form()) {
                NewsLetter.UnSubscribeUserByEmail();

            }

            return true;
        }
        else {
            if ($("#txtPhone").val() != "") {
                NewsLetter.UnSubscribeUserByMobile();

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