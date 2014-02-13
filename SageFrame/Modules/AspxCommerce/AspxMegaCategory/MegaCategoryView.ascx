<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MegaCategoryView.ascx.cs" Inherits="Modules_AspxCommerce_AspxMegaCategory_MegaCategoryView" %>

<script type="text/javascript">
    //<![CDATA[
    var noImageCategoryDetailPath = '<%=NoImageCategoryDetailPath %>';
    var categoryRss = '<%=CategoryRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    $(document).ready(function() {
        $(".sfLocale").localize({
            moduleKey: AspxMegaCategory
        });
        if (categoryRss.toLowerCase() == 'true') {
            LoadCategoryRssImage();
        }
    });
    function LoadCategoryRssImage() {
        // var pageurl = aspxRedirectPath + "RssFeed" + pageExtension;
        var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
        $('#categoryRssImage').parent('a').show();
        $('#categoryRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=category');
        $('#categoryRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
        $('#categoryRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Category Rss Feed Title"));
        $('#categoryRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Category Rss Feed Alt"));
    }
    //]]>
</script>

<div id="divMegaCategoryContainer" class="cssClassMegaCategoryWrapper" style="display: none;">
    <div id="divMegaCategory" class="cssClassMegaCategory" runat="server" enableviewstate="false">
    </div>
</div>
