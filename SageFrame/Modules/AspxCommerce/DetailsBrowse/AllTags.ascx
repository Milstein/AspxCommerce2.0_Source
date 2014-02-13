<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AllTags.ascx.cs" Inherits="Modules_AspxAllTags_AllTags" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
    
         $(".sfLocale").localize({
             moduleKey:DetailsBrowse
        });
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            CustomerID: AspxCommerce.utils.GetCustomerID()
        };
        var popularTagsCount = 0;
        var AllTags = {
            BindAllTags: function() {
                $.ajax({
                    type: "POST",
                    url: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/GetAllPopularTags",
                    data: JSON2.stringify({ aspxCommonObj: aspxCommonObj, count: popularTagsCount }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        if (msg.d.length > 0) {
                            var popularTags = '';
                            $.each(msg.d, function(index, item) {
                                var totalTagCount = item.TagCount;
                                var fontSize = (totalTagCount / 10 < 1) ? totalTagCount / 10 + 1 + "em" : (totalTagCount / 10 > 2) ? "2em" : totalTagCount / 10 + "em";
                                popularTags += "<a href=' " + aspxRedirectPath + 'tagsitems/tags' + pageExtension + '?tagsId=' + item.ItemTagIDs + "' title=" + getLocale(DetailsBrowse, 'See all pages tagged with') + item.Tag + "' style='font-size: " + fontSize + "'>" + item.Tag + "</a>(<span class=\"cssClassTagCloudCount\">" + totalTagCount + "</span>), ";
                            });
                            $("#divAllTags").html(popularTags.substring(0, popularTags.length - 2));
                        }
                        else {
                            $("#divAllTags").html(getLocale(DetailsBrowse,'Not any items have neen tagged yet!'));
                        }
                    }
                });
            }
        }
        $(".cssClassMasterLeft").html('');
        $("#divCenterContent").removeClass("cssClassMasterWrapperLeftCenter");
        $("#divCenterContent").addClass("cssClassMasterWrapperCenter");      
        AllTags.BindAllTags();
    });

    //]]>
</script>

<div class="cssClassCommonSideBox">
    <h2>
        <asp:Label ID="lblAllTagsTitle" runat="server" Text="All Tags" 
            CssClass="cssClassPopularTags" meta:resourcekey="lblAllTagsTitleResource1"></asp:Label>
    </h2>
    <div id="divAllTags" class="cssClassPopularTags">
    </div>
</div>
