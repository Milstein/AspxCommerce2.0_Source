<%@ Control Language="C#" AutoEventWireup="true" CodeFile="NewsLetterView.ascx.cs"
    Inherits="Modules_NewsLetter_NewsLetterView" %>
<script type="text/javascript">
    $(function() {
        $(".sfLocale").SystemLocalize();
    });
    $(function() {
        $(".sfLocale").localize({
            moduleKey: NewsLetter
        });
    });
    var UserModuleID = '<%=UserModuleID %>';
    var PortalID = '<%=PortalID %>';
    var NewsLetterPath = '<%=ModulePath %>';
    var UserName = '<%=UserName %>';
    var PageExt = '<%=PageExt %>';
        
</script>
<div id="divSubscribe">
    <label id="lblmessage" style="display:none" class="sfMessage sfLocale">
    </label>
    <div id="imageplace" style="margin-top: 5px;">
       
    </div>
    <div id="header">
        <asp:Literal runat="server" ID="moduleHeader"></asp:Literal>
    </div>
    <div id="divRadios" style="display: none;">
        <input type="radio" name="rdbSubcribe" class="sfLocale" value="ByEmail">By Email</input>
        <input type="radio" name="rdbSubcribe" class="sfLocale" id="rdbPhone" value="ByPhone">By Phone</input>
    </div>
    <div id="divEmailSubsCribe">
        <div id="divEmailtext" class="sfLocale">
            Your Email</div>
        <input name="Email" type="text" id="txtEmail" class="sfInputbox" />
    </div>
    <div id="phoneSubscribe" style="display:none">
        <div id="divPhoneText" class="sfLocale">
            Your Mobile Number</div>
        <input name="Mobile" onkeypress="return isNumberKey(event)" type="text" class="sfInputbox" id="txtPhone" />
    </div>
    <div class="sfSubscribe">
        <input id="btnSubscribe" type="button" class="sfBtn sfLocale" value="Subscribe" />
        <%--  <a id="btnSubscribe" href="javascript:void(0);" class="sfBtn sfLocale">Subscribe</a>--%>
    </div>
    <div id="divbUnsubscribe">
        <asp:Literal runat="server" ID="UnSubscribe"></asp:Literal>
    </div>
</div>
