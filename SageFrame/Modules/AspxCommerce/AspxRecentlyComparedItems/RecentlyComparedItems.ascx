<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RecentlyComparedItems.ascx.cs"
    Inherits="Modules_AspxRecentlyComparedItems_RecentlyComparedItems" %>

<script type="text/javascript" language="javascript">
    //<![CDATA[

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxRecentlyComparedItems
        });
        if (ModuleCollapsible.toLowerCase() == 'true') {
            $(".cssClassCompareHeader").addClass("sfCollapsible");
            $(".cssClassCompareHeader").live('click', function() {
                $(".cssClassRecentlyComparedItemList").slideToggle('fast');
            });
        }
    });
    var recentlyCompareCounts = '<%=CountCompare %>';
    var enableRecentlyCompared = '<%=EnableRecentlyCompared %>';
    var ModuleCollapsible = "<%=ModuleCollapsible %>";
    //]]>
</script>

<div id="divRecentComparedItems" class="cssClassLeftSideBox cssClassRecentlycompared"
    style="display: none">
    <div class="cssClassCompareHeader">
        <h2 class="cssClassLeftHeader">
            <asp:Label ID="lblRecebtlyComparedTitle" runat="server" Text="Recently Compared Items"
                CssClass="cssClassRecentlyComparedItems" meta:resourcekey="lblRecebtlyComparedTitleResource1"></asp:Label></h2>
    </div>
    <div class="cssClassCommonSideBoxTable cssClassRecentlyComparedItemList">
        <table id="tblRecentlyComparedItemList" width="100%">
            <asp:Literal ID="ltrRecentlyCompareItem" runat="server"></asp:Literal>
        </table>
    </div>
</div>
