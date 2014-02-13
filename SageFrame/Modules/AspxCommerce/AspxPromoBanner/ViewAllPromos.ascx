<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ViewAllPromos.ascx.cs" Inherits="Modules_PromoBanner_ViewAllPromos" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxPromoBanner
        });
        var modulePath = '<%=modulePath %>';
        var serviceDetailPath = '<%=serviceDetailPath %>';
        var count;
        var aspxCommonObj = function() {
            var aspxCommonInfo = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName()
            };
            return aspxCommonInfo;
        };

        function GetPromoBannerList() {
            var aspxCommonInfo = aspxCommonObj();
            delete aspxCommonInfo.UserName;
            $.ajax({
                type: "POST",
                url: aspxservicePath + "AspxCommerceWebService.asmx/GetPromoBanner",
                data: JSON2.stringify({ count: 9999, aspxCommonObj: aspxCommonInfo }),
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(msg) {
                    BindAllPromoDetails(msg);
                },
                error: function() {
                    alert(getLocale(AspxPromoBanner, 'Sorry! Failed to get Promo banner'));
                }
            });
        }

        function BindAllPromoDetails(msg) {
            var promoBanner;
            promoBanner = "<h2>" + getLocale(AspxPromoBanner, "Promos") + "</h2><ul class=\"classPromoViewAll\">";
            if (msg.d.length > 0) {
                $.each(msg.d, function(index, item) {
                    var imagePath = aspxRootPath + itemImagePath + item.ImagePath;
                    promoBanner += "<li><a href=" + imagePath + " title=" + item.ItemName + " rel=" + aspxRedirectPath + serviceDetailPath + pageExtension + "?id=" + item.ItemID + "><img src=" + imagePath.replace('uploads', 'uploads/Large') + " /></a></li>";
                    // promoBanner += "<div class=\"cssPromoBook\"><a href=\"" + aspxRedirectPath + "Service-Item-Details" + pageExtension + "?id=" + item.ItemID + "\"><span>" + getLocale(AspxPromoBanner, "Book Now") + "</span></a></div>";
                });
                promoBanner += "</ul>";
                $("#divViewAllPromos").append(promoBanner);
            } else {
                $("#divViewAllPromos").html("<span class=\"cssclassNoBanner sflocale\">" + getLocale(AspxPromoBanner, "No Promo Uploaded Yet!") + "</span>");
            }
        }

        $(document).ready(function() {
            // GetPromoBannerList();
            $('#divViewAllPromos a').lightBox({
                getCaption: function(jQueryObject) {
                    return '<a href="' + jQueryObject.attr('rel') + '">' + jQueryObject.attr('title') + '</a>';
                }
            });
            $('#divViewAllPromos ul li').find('a img[title]').tipsy({ gravity: 'n' });
        });
    });
</script>

<div id="divContainerAllPromos" class="cssPromosComtainer">
<div id="divViewAllPromos" class="cssViewAllPromos">
    <asp:Literal ID="ltrPromoBanner" runat="server" EnableViewState="False" 
        meta:resourcekey="ltrPromoBannerResource1"></asp:Literal>
</div>
</div>