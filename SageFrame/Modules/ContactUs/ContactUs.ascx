<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ContactUs.ascx.cs" Inherits="SageFrame.Modules.ContactUs.ContactUs" %>
<script language="javascript" type="text/javascript">
    //<![CDATA[
    $(function() {
        $(this).feedback({
            emailSucessMsg: '<%=emailSucessMsg%>',
            PortalID: '<%=PortalID %>',
            ContactUsPath: '<%=ModulePath %>',
            UserName: '<%=UserName %>',
            subject: '<%=messageSubject %>'
        });
        $(".sfLocale").SystemLocalize();
    });
    //]]>
</script>
<div class="cssClassFormWrapper">
    <div class="feedback-panel">
        <a class="feedback-tab" href="#"></a>
        <div class="cssClassContactWrapper">
            <div class="bannerText cssClassResetMargin">
                <h1>
                    <asp:Label ID="lblTitle" EnableViewState="False" runat="server" 
                        Text="Contact Information" meta:resourcekey="lblTitleResource1"></asp:Label>
                </h1>
                <table>
                    <tr>
                        <td>
                            <asp:Label ID="lblRequiredName" EnableViewState="False" runat="server" 
                                CssClass="sfAllrequired" meta:resourcekey="lblRequiredNameResource1">*</asp:Label>
                            <asp:Label ID="lblName" EnableViewState="False" runat="server" 
                                CssClass="sfFormLabel" Text="Name:" meta:resourcekey="lblNameResource1"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblColOne" EnableViewState="False" runat="server" 
                                CssClass="sfFormLabel" Text=":" meta:resourcekey="lblColOneResource1"></asp:Label>
                        </td>
                        <td>
                            <input type="text" id="txtName" name="txtname" class="sfInputbox required" />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblRequiredEmail" EnableViewState="False" runat="server" 
                                CssClass="sfAllrequired" meta:resourcekey="lblRequiredEmailResource1">*</asp:Label>
                            <asp:Label ID="lblEmail" EnableViewState="False" runat="server" 
                                CssClass="sfFormLabel" Text="E-mail" meta:resourcekey="lblEmailResource1"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblColTwo" EnableViewState="False" runat="server" 
                                CssClass="sfFormLabel" Text=":" meta:resourcekey="lblColTwoResource1"></asp:Label>
                        </td>
                        <td>
                            <input type="text" id="txtContactEmail" name="txtContactEmail" class="sfInputbox required email" />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblRequiredMessage" EnableViewState="False" runat="server" 
                                CssClass="sfAllrequired" meta:resourcekey="lblRequiredMessageResource1">*</asp:Label>
                            <asp:Label ID="lblMessage" EnableViewState="False" runat="server" 
                                CssClass="sfFormLabel" Text="Message" meta:resourcekey="lblMessageResource1"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblColThree" EnableViewState="False" runat="server" 
                                CssClass="sfFormLabel" Text=":" meta:resourcekey="lblColThreeResource1"></asp:Label>
                        </td>
                        <td>
                            <textarea id="txtMessage" name="txtMessage" class="required" rows="5" cols="15"></textarea>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div class="sfButtonwrapper">
                                <input type="button" id="btnSubmit" class="sfBtn sfLocale" value="Submit" />
                                <input type="button" id="btnReset" class="sfBtn sfLocale" value="Reset" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
