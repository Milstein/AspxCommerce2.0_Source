<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PromoCodes.ascx.cs" Inherits="Modules_AspxCommerce_AspxPromoCodes_PromoCodes" %>

<script type="text/javascript">
     //<![CDATA[
    var promoCodeView = "";
    var baseUrl = '<%=baseUrl %>';
    var PromoItemsUrl = '<%=PromoItemsUrl %>';
    $(function() {
        var AspxCommonObj = function() {
            var aspxCommonObj = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                CultureName: AspxCommerce.utils.GetCultureName(),
                UserName: AspxCommerce.utils.GetUserName()
            };
            return aspxCommonObj;
        };
        $(function() {
            $(".sfLocale").localize({
                moduleKey: AspxPromoCodeView
            });
            promoCodeView = {
                config: {
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{}',
                    dataType: "json",
                    baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                    ajaxCallMode: "",
                    url: "",
                    method: ""
                },
                ajaxCall: function(config) {
                    $.ajax({
                        type: promoCodeView.config.type,
                        contentType: promoCodeView.config.contentType,
                        cache: promoCodeView.config.cache,
                        async: promoCodeView.config.async,
                        data: promoCodeView.config.data,
                        dataType: promoCodeView.config.dataType,
                        url: promoCodeView.config.url,
                        success: promoCodeView.config.ajaxCallMode,
                        error: promoCodeView.ajaxFailure
                    });
                },
                GetAllPromoCodeItems: function() {
                    this.config.url = this.config.baseURL + "GetPromoCodesForView";
                    this.config.data = JSON2.stringify({ aspxCommonObj: AspxCommonObj() });
                    this.config.ajaxCallMode = promoCodeView.BindPromoCodes;
                    this.ajaxCall(this.config);
                },

                BindPromoCodes: function(msg) {

                    if (msg.d.length > 0) {
                        var html = '';
                        $.each(msg.d, function(index, item) {
                            html += "<div class=classPromoList>";
                            html += "<h2><label>" + getLocale(AspxPromoCodeView, "Get") + " <span class='cssClassFormatCurrency'> " + (item.BalanceAmount* rate).toFixed(2) + "</span> " + getLocale(AspxPromoCodeView, "Off on purchase of") + " <span class='cssClassFormatCurrency'> " + (item.MinimumApplyAmount *rate).toFixed(2) + "</span> " + getLocale(AspxPromoCodeView, "& above.") + "</label></h2></br>";
                            var test = 'new ' + item.ValidateTo.replace( /[/]/gi , '');
                            var date = eval(test);
                            html += "<div class='cssClassExpire'><span>" + getLocale(AspxPromoCodeView, "Offer Expires on: ") + "" + formatDate(date, "yyyy/MM/dd") + "</span></br>";
                            html += "<h2>" + getLocale(AspxPromoCodeView, "Use Promo Code:") + "<span>" + item.CouponCode + "</span></h2></div></br>";
                            html += "<input type='button' class='classViewItems' id=" + item.CouponID + " value=\"" + getLocale(AspxPromoCodeView, 'Click Here To View The Items') + "\"/>";
                            html += "<div class='cssClassClear'></div></div>";
                        });

                        $(".classBindPromoCode").html('').append(html);
                    } else {
                        var html = "<span class='cssClassNotFound '>" + getLocale(AspxPromoCodeView, "There are no promo codes available!") + "</span>";
                        $(".classBindPromoCode").append(html);
                    }
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                },

                init: function() {
                    promoCodeView.GetAllPromoCodeItems();
                    $(".classViewItems").live("click", function() {
                        var id = $(this).attr("id");
                        window.open("" + aspxRedirectPath + PromoItemsUrl + pageExtension + "?id=" + id + "", '_blank');
                    });
                }
            },
            promoCodeView.init();
        });
    });
   //]]>
</script>

<div class="classBindPromoCode">
    <h2 class="cssClassMiddleHeader">
        <span class="sfLocale">Promo Codes</span></h2>
</div>
