<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PromoBannerView.ascx.cs"
    Inherits="Modules_PromoBanner_PromoBannerView" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxPromoBanner
        });
    });
    var modulePath = '<%=modulePath %>';
    var serviceDetailPath = '<%=serviceDetailPath %>';
    var count;
    var rowTotal = '<%=rowTotal %>';
    var viewPageName;
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    };
    function GetPromoSetting() {
        var aspxCommonInfo = aspxCommonObj();
        delete aspxCommonInfo.UserName;
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/GetPromoSetting",
            data: JSON2.stringify({ aspxCommonObj: aspxCommonInfo }),
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(msg) {
                $.each(msg.d, function(index, item) {
                    count = item.BannerCount;
                    viewPageName = item.PageName;
                });
            },
            error: function() {
                alert(getLocale(AspxPromoBanner,'Sorry! Failed to get promo banner setting'));
            }
        });
    }
    
    function GetBannerList() { 
        bannerMainText = '';
        bannerNavText = '';
        var aspxCommonInfo = aspxCommonObj();
        delete aspxCommonInfo.UserName;
        $.ajax({
            type: "POST",
            url: aspxservicePath + "AspxCommerceWebService.asmx/GetPromoBanner",
            data: JSON2.stringify({ count: count, aspxCommonObj: aspxCommonInfo }),
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(msg) {
                //alert(msg.d.length);
                if (msg.d.length > 0) {
                    BindBannerDetails(msg);
                }
                else {
                    $("#promoBanner").html("<span class=\"cssclassNoBanner\">"+getLocale(AspxPromoBanner," No Promo Images Uploaded Yet! ")+"</span>");
                }
            },
            error: function() {
                alert(getLocale(AspxPromoBanner,'Sorry! Failed to get bannerlist'));
            }
        });
    }


    function BindBannerDetails(response) {
        $.each(response.d, function(index, item) {
            BindBannerMain(item);
            BindBannerNav(item);
            rowTotal = item.RowTotal;
        });
        if (rowTotal > count) {
            $("#divViewMorePromo").html("<a href='" + aspxRedirectPath + viewPageName + pageExtension + "'>"+getLocale(AspxPromoBanner,"View All Promos")+"</a>");
        }
    }

    function BindBannerMain(item) {
        var itemPath = aspxRootPath + itemImagePath + item.ImagePath;
        bannerMainText += "<li><a href='" + aspxRedirectPath + serviceDetailPath + pageExtension + "?id=" + item.ItemID + "'><img src=" + itemPath + " /></a></li>";
        $("#bannerMain").html(bannerMainText);
    }

    function BindBannerNav(item) {
        var itemPath = aspxRootPath + itemImagePath + item.ImagePath;
        bannerNavText += "<li><div><img src=" + itemPath.replace('uploads', 'uploads/Medium') + "></div></li>";
        $("#bannerNav").html(bannerNavText);
    }

    $(document).ready(function() {
        // GetPromoSetting();
        // GetBannerList();
        $("#promoBanner").show();
        if (rowTotal > 0) {
            var buttons = {
                previous: $('#promoBanner .button-previous'),
                next: $('#promoBanner .button-next')
            };
            $('#promoBanner').lofJSidernews({
                interval: 5000,
                easing: 'easeInOutQuad',
                duration: 800,
                auto: true,
                mainWidth: 684,
                mainHeight: 300,
                navigatorHeight: 100,
                navigatorWidth: 310,
                maxItemDisplay: 3,
                buttons: buttons
            });
        }
    });
        

</script>

<div class="divPromoContainer">
    <div id="promoBanner" class="lof-slidecontent" style="display: none;">
        <div class="preload">
            <div>
            </div>
        </div>
        <div class="button-previous sfLocale">
            Previous</div>
        <!-- MAIN CONTENT -->
        <div class="main-slider-content" style="width: 684px; height: 300px;">
            <ul class="sliders-wrap-inner" id="bannerMain">
                <asp:Literal ID="ltrBannerMain" runat="server" EnableViewState="False" 
                    meta:resourcekey="ltrBannerMainResource1"></asp:Literal>
            </ul>
        </div>
        <!-- END MAIN CONTENT -->
        <!-- NAVIGATOR -->
        <div class="navigator-content">
            <div class="navigator-wrapper">
                <ul class="navigator-wrap-inner" id="bannerNav">
                     <asp:Literal ID="ltrBannerNav" runat="server" EnableViewState="False" 
                         meta:resourcekey="ltrBannerNavResource1"></asp:Literal>
                </ul>
            </div>
        </div>
        <!----------------- END OF NAVIGATOR --------------------->
        <div class="button-next sfLocale">
            Next</div>
        <!-- BUTTON PLAY-STOP -->
        <div class="button-control">
            <span></span>
        </div>
        <!-- END OF BUTTON PLAY-STOP -->
    </div>
    <div id="divViewMorePromo" class="cssViewMore">
        <asp:Literal ID="ltrViewMore" runat="server" EnableViewState="False" 
            meta:resourcekey="ltrViewMoreResource1"></asp:Literal>
    </div>
</div>
