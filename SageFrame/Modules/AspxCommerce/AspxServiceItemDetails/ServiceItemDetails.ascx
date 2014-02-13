<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ServiceItemDetails.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxServiceItemDetails_ServiceItemDetails" %>

<script type="text/javascript">
    var ServiceItemDetails = "";
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxServiceItemDetails
        });
    });
    $(function () {
        var storeId = AspxCommerce.utils.GetStoreID();
        var portalId = AspxCommerce.utils.GetPortalID();
        var userName = AspxCommerce.utils.GetUserName();
        var cultureName = AspxCommerce.utils.GetCultureName();
        var noImageServiceItemPath = '<%=NoImageServiceItemPath %>';
        var aspxCommonObj = {
            StoreID: storeId,
            PortalID: portalId,
            UserName: userName,
            CultureName: cultureName
        };
        ServiceItemDetails = {
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
                ajaxCallMode: ""
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: ServiceItemDetails.config.type,
                    contentType: ServiceItemDetails.config.contentType,
                    cache: ServiceItemDetails.config.cache,
                    async: ServiceItemDetails.config.async,
                    url: ServiceItemDetails.config.url,
                    data: ServiceItemDetails.config.data,
                    dataType: ServiceItemDetails.config.dataType,
                    success: ServiceItemDetails.config.ajaxCallMode,
                    error: ServiceItemDetails.ajaxFailure
                });
            },

            GetServiceItemDetails: function () {
                var itemID = ServiceItemDetails.GetParameterByName("id");
                this.config.method = "GetServiceItemDetails";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ itemID: itemID, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = ServiceItemDetails.BindServiceItemDetails;
                this.ajaxCall(this.config);
            },
            BindServiceItemDetails: function (msg) {
                var serviceItem = '';
                if (msg.d.length > 0) {
                    $.each(msg.d, function (index, item) {
                        serviceItem = "<div class='cssItemName'><h2><span>" + item.ItemName + "</span></h2></div>";
                        //  serviceItem += "<div class='cssShortDesc'><p>" + Encoder.htmlDecode(item.ShortDescription) + "</p></div>";
                        var imagePath = itemImagePath + item.ImagePath;
                        if (item.ImagePath == "") {
                            imagePath = noImageServiceItemPath;
                        }
                        serviceItem += "<div class='cssItemImage'><img alt='" + item.ItemName + "' src=" + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + "></div>";
                        serviceItem += "<div class='cssDesc'><p>" + Encoder.htmlDecode(item.Description) + "</p></div>";
                        serviceItem += "<span class=\"cssClassServiceDuration\" value=" + (item.ServiceDuration) + ">" + '(' + (item.ServiceDuration) + ' ' + getLocale(AspxServiceItemDetails, "minutes") + ')' + "</span>&nbsp;";
                        serviceItem += "<span class=\"cssClassFormatCurrency\" value=" + (item.Price) + ">" + (item.Price * rate) + "</span>";
                        serviceItem += '<div class="sfButtonwrapper"><a href="' + AspxCommerce.utils.GetAspxRedirectPath() + 'Book-An-Appointment' + pageExtension + '?cid=' + item.CategoryID + '&pid=' + item.ItemID + '">' + getLocale(AspxServiceItemDetails, "Book Now") + '</a></div></div>';

                    });
                    $("#divServiceItemDetails").html('').append(serviceItem);
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                } else {
                    $("#divServiceItemDetails").html('').html("<div class='cssClassNotFound'><p>" + getLocale(AspxServiceItemDetails, "There is no service description available") + "</p></div>");
                }
            },
            GetParameterByName: function (name) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(window.location.search);
                var x = results[1].split('&');
                if (x == null)
                    return "";
                else
                    return decodeURIComponent(x[0].replace(/\+/g, " "));
            },
            Init: function () {
                $(document).ready(function () {
                    //    ServiceItemDetails.GetServiceItemDetails();
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                });
            }
        };
        ServiceItemDetails.Init();
    });
</script>

<div class="cssServiceItemWrapper">
    <%--<div id="divServiceItemDetails" class="cssServiceItemDetails">
    </div>--%>
    <asp:Literal ID="ltrServiceItemDetail" runat="server" EnableViewState="False" 
        meta:resourcekey="ltrServiceItemDetailResource1"></asp:Literal>
</div>
