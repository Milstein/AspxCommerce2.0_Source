<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_ForgotPassword.ascx.cs"
    Inherits="SageFrame.Modules.PasswordRecovery.ctl_ForgotPassword" %>
    <script type="text/javascript">
        $(function() {
            $(".sfLocale").SystemLocalize();
        });
    </script>
<div class="sfForgotPasswordPage" runat="server" id="divForgotPwd">
    <div class="sfForgotPasswordPageLeft">
        <asp:Wizard ID="wzdForgotPassword" runat="server" DisplaySideBar="False" 
            ActiveStepIndex="0" DisplayCancelButton="True"
            OnCancelButtonClick="CancelButton_Click"
            OnFinishButtonClick="wzdForgotPassword_FinishButtonClick" 
            OnNextButtonClick="wzdForgotPassword_NextButtonClick" 
            meta:resourcekey="wzdForgotPasswordResource1">
            <StartNavigationTemplate>
                <div class="sfButtonwrapper sfMarginnone">
                    <asp:Button ID="StartNextButton" meta:resourcekey="StartNextButtonResource1" 
                        runat="server" AlternateText="Next"
                        CommandName="MoveNext" CssClass="sfBtn" Text="Next" 
                        ValidationGroup="vdgForgotPassword" />
                    <asp:Button ID="CancelButton" meta:resourcekey="CancelButtonResource1" runat="server" AlternateText="Cancel" CausesValidation="False"
                        CommandName="Cancel" CssClass="sfBtn" Text="Cancel" OnClick="CancelButton_Click" />
                </div>
            </StartNavigationTemplate>
            <StepNavigationTemplate>
                <div class="sfButtonwrapper">
                    <asp:Button ID="StepNextButton" runat="server" AlternateText="Next" CausesValidation="False"
                        CommandName="MoveNext" CssClass="sfBtn" Text="Next" 
                        meta:resourcekey="StepNextButtonResource1" />
                </div>
            </StepNavigationTemplate>
            <FinishNavigationTemplate>
                <div class="sfButtonwrapper">
                    <asp:Button ID="FinishButton" runat="server" AlternateText="Finish" CausesValidation="False"
                        CommandName="MoveComplete" CssClass="sfBtn" Text="Finish" 
                        meta:resourcekey="FinishButtonResource1" />
                </div>
            </FinishNavigationTemplate>
            <WizardSteps>
                <asp:WizardStep ID="WizardStep1" runat="server" 
                    Title="Prompt for Email Address" meta:resourcekey="WizardStep1Resource1">
                    <div class="sfForgotYourPassWordTopInfo">
                    </div>
                    <div class="sfForgotPasswordInfo">
                        <p>
                            <asp:Label ID="lblUsername" runat="server" Text="" meta:resourcekey="lblUsernameResource1" CssClass="sfFormlabel">User Name :</asp:Label>
                        </p>
                        <p>
                            <asp:TextBox ID="txtUsername" runat="server" CssClass="sfInputbox" 
                                autofocus="autofocus" meta:resourcekey="txtUsernameResource1"></asp:TextBox>
                                <br />
                            <asp:RequiredFieldValidator Display="Dynamic" ID="rfvUsername" runat="server" ControlToValidate="txtUsername"
                                ValidationGroup="vdgForgotPassword" ErrorMessage="*" CssClass="sfError" 
                                meta:resourcekey="rfvUsernameResource1"></asp:RequiredFieldValidator>
                        </p>
                        <p>
                            <asp:Label ID="lblEmail" runat="server" meta:resourcekey="lblEmailResource1" Text="" CssClass="sfFormlabel">Email :</asp:Label>
                        </p>
                        <p>
                            <asp:TextBox ID="txtEmail" runat="server" CssClass="sfInputbox" 
                                meta:resourcekey="txtEmailResource1"></asp:TextBox>
                                <br />
                            <asp:RequiredFieldValidator Display="Dynamic" ID="rfvEmail" runat="server" ControlToValidate="txtEmail"
                                ValidationGroup="vdgForgotPassword" ErrorMessage="*" CssClass="sfError" 
                                meta:resourcekey="rfvEmailResource1"></asp:RequiredFieldValidator>                                
                            <asp:RegularExpressionValidator ID="revEmail" runat="server" Display="Dynamic" ControlToValidate="txtEmail"
                                CssClass="sfError" SetFocusOnError="true" ValidationGroup="vdgForgotPassword"
                                ErrorMessage="*" 
                                ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" 
                                meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                        </p>
                        <div id="dvCaptchaField" runat="server">
                            <p>                              
                                <asp:Image ID="CaptchaImage" runat="server" CssClass="sfCaptcha" 
                                    meta:resourcekey="CaptchaImageResource1" />
                                <asp:ImageButton ID="Refresh" CssClass="sfCaptchadata" runat="server" 
                                    ValidationGroup="Sep" OnClick="Refresh_Click" 
                                    meta:resourcekey="RefreshResource1" />
                            </p>
                            <p>
                                <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                    <ContentTemplate>
									<p class="sfLocale">Enter Captcha Text</p>
                                        <asp:TextBox ID="CaptchaValue" runat="server" CssClass="sfInputbox" 
                                            meta:resourcekey="CaptchaValueResource1"></asp:TextBox><br />
                                        <asp:RequiredFieldValidator ID="rfvCaptchaValueValidator" runat="server" ControlToValidate="CaptchaValue"
                                            Display="Dynamic" ErrorMessage="Enter Captcha Text" 
                                            ValidationGroup="vdgForgotPassword" CssClass="sfError" 
                                            meta:resourcekey="rfvCaptchaValueValidatorResource1"></asp:RequiredFieldValidator>
                                        <asp:CompareValidator ID="cvCaptchaValue" runat="server" Display="Dynamic"
                                            ControlToValidate="CaptchaValue" ValueToCompare="121" CssClass="sfError" 
                                            meta:resourcekey="cvCaptchaValueResource1"></asp:CompareValidator>
                                    </ContentTemplate>
                                </asp:UpdatePanel>
                                <p>
                                </p>
                        </div>
                    </div>
                </asp:WizardStep>
                <asp:WizardStep ID="WizardStep2" runat="server" Title="Sending Email" 
                    StepType="Finish" meta:resourcekey="WizardStep2Resource1">
                    <asp:Literal ID="litInfoEmailFinish" runat="server" 
                        meta:resourcekey="litInfoEmailFinishResource1"></asp:Literal>
                </asp:WizardStep>
            </WizardSteps>
        </asp:Wizard>
    </div>
</div>
</div> 
