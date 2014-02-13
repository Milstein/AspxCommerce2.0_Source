<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategoryViewer.ascx.cs"
    Inherits="Modules_CategoryLister_CategoryViewer" %>

<script type="text/javascript">
    var categoryRss = '<%=CategoryRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    $(document).ready(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCategoryLister
        });
        $(".cssClassCategoryWrapperHor").show();
        $(".sf-menu").superfish();
    });
</script>


<div id="divCategoryListerHorizantal" class="cssClassCategoryWrapper">
    <div class="divHeaderTitle">
        <h2 class="cssClassLeftHeader">
            <span class="sfLocale">Categories</span> <a class="cssRssImage" href="#" style="display: none">
                <img id="categoryRssImage" alt="" src="" title="" />
            </a>
        </h2>
    </div>
    <div class="cssClassCategoryWrapperHor" id="divCategoryListerH" runat="server" enableviewstate="false"
        style="display: none;">
    </div>
</div>

