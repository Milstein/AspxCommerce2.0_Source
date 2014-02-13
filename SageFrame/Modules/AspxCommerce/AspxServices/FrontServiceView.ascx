<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FrontServiceView.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxServices_FrontServiceView" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxServiceLocale
        });
    });
    //<![CDATA[
    var ModulePath = '<%=modulePath %>';
    var count = '<%=count %>';
    var NoImageService = '<%=NoImageService%>';
    var ServiceTypeItemRss = '<%=ServiceTypeItemRss %>';
    var RssFeedUrl = '<%=RssFeedUrl %>';
    //]]>
</script>

<div id="divFrontServiceContainer" class="cssClassService">
    <h2 class="cssClassMiddleHeader">
        <span class="sfLocale">Services</span> <a href="#" class="cssRssImage" style="display: none">
            <img id="serviceItemRssImage" alt="" src="" title="" />
        </a>
    </h2>
    <%--<div id="divFrontService">
    </div>
    <div id="divViewMoreServices" class="cssViewMore">
    </div>--%>
    <asp:Literal ID="ltrForntServiceView" runat="server" EnableViewState="False" 
        meta:resourcekey="ltrForntServiceViewResource1"></asp:Literal>
</div>
