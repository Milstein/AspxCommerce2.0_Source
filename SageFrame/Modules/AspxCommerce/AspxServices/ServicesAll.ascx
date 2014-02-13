<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ServicesAll.ascx.cs" Inherits="Modules_AspxCommerce_AspxServices_ServicesAll" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxServiceLocale
        });
    });
    var modulePath = '<%=modulePath %>';
    var defaultImagePath = '<%=NoImageService %>';
</script>
<div id="divServiceAllContainer">
<h2 class="cssClassMiddleHeader"><span class="sfLocale">Services</span></h2>
<%--<div id="divBindAllServices" class="cssClassAllService">
</div>--%> 
<asp:Literal ID="ltrBindAllServices" runat="server" EnableViewState="False" 
        meta:resourcekey="ltrBindAllServicesResource1"></asp:Literal>
</div>