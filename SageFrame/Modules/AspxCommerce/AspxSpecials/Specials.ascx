<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Specials.ascx.cs" Inherits="Modules_AspxSpecials_Specials" %>

<script type="text/javascript">
    //<![CDATA[
    
     $(function() { 
        $(".sfLocale").localize({
             moduleKey:AspxSpecials
        });
     });
        
    var enableSpecialItems='<%=EnableSpecialItems %>';
    var countSpecials = eval('<%=NoOfSpecialItems%>');
    var defaultImagePath = '<%=DefaultImagePath %>';
    var baseUrl = '<%=baseUrl %>';
    var specialItemRss = '<%=SpecialItemRss %>';
    var rssFeedUrl = '<%=RssFeedUrl %>';
    //]]>
</script>

<div id="divSpecialItems" class="cssClassSpecial">
    <h2 class="cssClassMiddleHeader">
        <span class="sfLocale">Special Items</span> <a href="#" class="cssRssImage" style="display: none">
            <img id="specialItemRssImage" alt="" src="" title="" />
        </a>
    </h2>
    <div id="divSpclBox" class="cssClassSpecialBox" runat="server" enableviewstate="false">
    <asp:Literal ID="ltrSpecialItems" runat="server" EnableViewState="false">
    </asp:Literal>
        <%--<div class="cssClassSpecialBoxInfo" id="divSpItem" runat="server" enableviewstate="false">
            <ul>
                <li></li>
            </ul>
        </div>--%>
        <div class="cssClassclear">
        </div>
    </div>
    <span class="cssClassViewMore" id="divViewMoreSpecial" runat="server" enableviewstate="false"></span>
</div>
