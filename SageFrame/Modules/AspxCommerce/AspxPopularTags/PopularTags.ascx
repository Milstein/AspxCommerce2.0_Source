<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PopularTags.ascx.cs" Inherits="Modules_AspxPopularTags_PopularTags" %>

<script type="text/javascript">
    //<![CDATA[
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxPopularTags
        });
        if (ModuleCollapsible.toLowerCase() == 'true') {
            $(".cssClassPopularTagHeader").addClass("sfCollapsible");
            $(".cssClassPopularTagHeader").live('click', function() {
                $(".cssClassPopularTagBox").slideToggle('fast');
            });
        }
    });
    var popularTagsCount = '<%=NoOfPopTags %>';
    var popularTagRss = '<%=PopularTagRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    var ModuleCollapsible = "<%=ModuleCollapsible %>";
    //]]>
</script>

<div class="cssClassLeftSideBox cssClassPopularTagWrapper" id="divPopularTag">
    <div class="cssClassPopularTagHeader">
        <h2 class="cssClassLeftHeader">
            <asp:Label ID="lblPopularTagsTitle" runat="server" Text="Popular Tags" CssClass="cssClassPopularTags"
                meta:resourcekey="lblPopularTagsTitleResource1"></asp:Label>
            <a href="#" class="cssRssImage" style="display: none">
                <img id="popularTagRssImage" alt="" src="" title="" />
            </a>
            <%--<span id="divViewAllTags" class="cssClassViewAllTags"></span>--%>
            <asp:Literal ID="ltrViewAllTag" runat="server" EnableViewState="false">
            </asp:Literal>
        </h2>
    </div>
    <div class="cssClassPopularTagBox">
        <asp:Literal ID="ltrPopularTags" runat="server" EnableViewState="false">
        </asp:Literal>
        <%--   <div id="divPopularTags" class="cssClassPopularTags" runat="server" enableviewstate="false">
    </div>--%>
    </div>
    <div class="cssClassClear">
    </div>
</div>
