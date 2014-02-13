<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategoryMenuAccordin.ascx.cs"
    Inherits="Modules_AspxCategoryMenuAccordin_CategoryMenuAccordin" %>

<script type="text/javascript">
    //<![CDATA[
    var ModuleCollapsible = "<%=ModuleCollapsible %>";
    var noImageCategoryDetailPath = '<%=NoImageCategoryDetailPath %>';
     var categoryRss = '<%=CategoryRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    $(document).ready(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCategoryMenuAccordion
        });
        $('#divMegaMenu').dcVerticalMegaMenu({
            rowItems: '4',
            speed: 'fast',
            effect: 'slide',
            direction: 'right'
        });
        if ($("#spanCatNotFound").length > 0) {
            $("#spanCatNotFound").html(getLocale(AspxCategoryMenuAccordion, "This store has no category found!"));
        }
        if (ModuleCollapsible.toLowerCase() == 'true') {
            $(".divHeaderTitle").addClass("sfCollapsible");
            $(".divHeaderTitle").live('click', function() {
                $(".cssClassCategoryVertical").slideToggle('fast');
            });
        }
        if (categoryRss.toLowerCase() == 'true') {
            LoadCategoryRssImage();
        }
    });
    function LoadCategoryRssImage() {
         var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
        $('#categoryRssImage').parent('a').show();
        $('#categoryRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=category');
        $('#categoryRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
        $('#categoryRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Category Rss Feed Title"));
        $('#categoryRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Category Rss Feed Alt"));
    }
    //]]> 
</script>

<div id="divCategoryLister" class="cssClassCategoryWrapper">
    <div class="divHeaderTitle">
        <h2 class="cssClassLeftHeader">
            <span class="sfLocale">Categories</span> <a class="cssRssImage" href="#" style="display: none">
                <img id="categoryRssImage" alt="" src="" title="" />
            </a>
        </h2>
    </div>
    <div id="divCategoryVertical" class="cssClassCategoryVertical" runat="server" enableviewstate="false">
    </div>
</div>
