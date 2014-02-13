<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserProfile.ascx.cs" Inherits="Modules_UserProfile" %>

<script language="javascript" type="text/javascript">
    //<![CDATA[
    $(document).ready(function() {
        var btnSave = '<%=btnSave.ClientID%>';
        $('#' + btnSave).live("click", function() {
            ValidationRules();
            ClearField();
        });
        $('#' + '<%=txtBirthDate.ClientID%>').attr('readOnly', 'true');
        $('#' + '<%=txtBirthDate.ClientID %>').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100:+0'
        });
    });

    function ClearField() {

        $('#' + '<%=txtEmail1.UniqueID %>').text('');
        $('#' + '<%=txtEmail2.UniqueID %>').text('');
        $('#' + '<%=txtEmail3.UniqueID %>').text('');
        $('#' + '<%=txtResPhone.UniqueID %>').text('');
        $('#' + '<%=txtMobile.UniqueID %>').text('');

    }
    function ValidationRules() {
        $("#form1").validate({
            ignore: ':hidden',
            rules: {
                '<%=txtFName.UniqueID %>': { required: true },
                '<%=txtLName.UniqueID %>': { required: true },
                '<%=txtEmail1.UniqueID %>': { required: true, email: true },
                '<%=txtEmail2.UniqueID %>': { email: true },
                '<%=txtEmail3.UniqueID %>': { email: true }
               , '<%=txtResPhone.UniqueID %>': { phone: true }
               , '<%=txtMobile.UniqueID %>': { phone: true }

            },
            messages: {
                '<%=txtFName.UniqueID %>': "<br/>First Name should not be blank.",
                '<%=txtLName.UniqueID %>': "<br/>Last Name should not be blank.",
                '<%=txtEmail1.UniqueID %>': "<br/>Email should not be blank and must be in a correct format.",
                '<%=txtEmail2.UniqueID %>': "<br/>Email must be in a correct format.",
                '<%=txtEmail3.UniqueID %>': "<br/>Email must be in a correct format."
               , '<%=txtResPhone.UniqueID %>': "<br/>Please give Valid Phone No."
               , '<%=txtMobile.UniqueID %>': "<br/>Please give Valid Mobile No."
            }
        });
    }
    //]]>	
    
</script>

<h1>
    User Profile</h1>
<div class="sfEditprofile">
    <%--<div id="divChangePassword" runat="server" visible="false">
          <table id="tblChangePasswordSettings" runat="server" width="100%" cellpadding="0"
                        cellspacing="0" border="0">
                        <tr id="Tr1" runat="server">
                            <td id="Td1" width="20%" runat="server">
                                <asp:Label ID="lblNewPassword" runat="server" CssClass="sfFormlabel" Text="New Password"></asp:Label>
                            </td>
                            <td id="Td2" width="30" runat="server">
                                :
                            </td>
                            <td id="Td3" runat="server">
                                <div class="sfPassword">
                                    <asp:TextBox ID="txtNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox password"
                                        TextMode="Password" ValidationGroup="vgManagePassword"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtNewPassword"
                                        ErrorMessage="Password is required." CssClass="sfRequired" ValidationGroup="vgManagePassword"></asp:RequiredFieldValidator>
                                </div>
                            </td>
                        </tr>
                        <tr id="Tr2" runat="server">
                            <td id="Td4" runat="server">
                                <asp:Label ID="lblRetypeNewPassword" runat="server" CssClass="sfFormlabel" Text="Retype New Password"></asp:Label>
                            </td>
                            <td id="Td5" width="30" runat="server">
                                :
                            </td>
                            <td id="Td6" runat="server">
                                <asp:TextBox ID="txtRetypeNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox"
                                    TextMode="Password" ValidationGroup="vgManagePassword"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txtRetypeNewPassword"
                                    ErrorMessage="Type password again." CssClass="sfRequired" ValidationGroup="vgManagePassword"></asp:RequiredFieldValidator>
                                <label id="lblValidationmsg" class="sfRequired">
                                </label>
                            </td>
                        </tr>
                        <tr id="Tr3" runat="server">
                            <td id="Td7" runat="server">
                                &nbsp;
                            </td>
                            <td id="Td8" runat="server">
                                &nbsp;
                            </td>
                            <td id="Td9" runat="server">
                                <div class="sfButtonwrapper">
                                    <asp:Button ID="btnManagePasswordSave" runat="server" ValidationGroup="vgManagePassword"
                                        CssClass="sfBtn" Text="Change" onclick="btnManagePasswordSave_Click"  />
                                        <asp:Button ID="btnCancel" runat="server" 
                                        CssClass="sfBtn" Text="Cancel" onclick="btnCancel_Click"  />
                                </div>
                                <div class="sfValidationsummary">
                                    <label id="lblChangepwdval" class="sfError">
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </table>
        </div>--%>
    <div id="sfUserProfile" runat="server" class="sfFormwrapper sfUserprofile clearfix">
        <div class="sfProfileimage" runat="server" id="imgProfileEdit">
            <asp:Image ID="imgUser" runat="server" Width="120px" meta:resourcekey="imgUserResource1" /><br />
            <asp:ImageButton ID="btnDeleteProfilePic" runat="server" OnClick="btnDeleteProfilePic_Click"
                meta:resourcekey="btnDeleteProfilePicResource1" /><br />
        </div>
        <div class="sfViewprofile sfPadding clearfix">
            <table id="tblEditProfile" width="58%" cellpadding="0" cellspacing="0" runat="server"
                style="float: left; margin-bottom: 20px; padding-right: 40px;">
                <tr>
                    <td colspan="4">
                        <h2>
                            User Info</h2>
                    </td>
                    <%-- <td><asp:Button ID="btnChangePassword" runat="server" Text="Change Password" 
                        CssClass='sfBtn'    onclick="btnChangePassword_Click" /></td>--%>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblImage" runat="server" CssClass="sfFormlabel" Text="Image" meta:resourcekey="lblImageResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:FileUpload ID="fuImage" runat="server" meta:resourcekey="fuImageResource1" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label1" runat="server" CssClass="sfFormlabel" Text="User Name" meta:resourcekey="Label1Resource1"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblDisplayUserName" runat="server" CssClass="sfFormlabel" meta:resourcekey="lblDisplayUserNameResource1"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label3" runat="server" CssClass="sfFormlabel" Text="First Name" meta:resourcekey="Label3Resource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtFName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtFNameResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label17" runat="server" CssClass="sfFormlabel" Text="LastName" meta:resourcekey="Label17Resource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtLName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtLNameResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblFullName" runat="server" CssClass="sfFormlabel" Text="FullName"
                            meta:resourcekey="lblFullNameResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtFullName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtFullNameResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr runat="server">
                    <td runat="server">
                        <asp:Label ID="lblBirthDate" runat="server" CssClass="sfFormlabel" Text="BirthDate"
                            meta:resourcekey="lblBirthDateResource1"></asp:Label>
                    </td>
                    <td runat="server">
                        <asp:TextBox runat="server" ID="txtBirthDate" CssClass="sfInputbox" meta:resourcekey="txtBirthDateResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr runat="server">
                    <td runat="server">
                        <asp:Label ID="lblGender" runat="server" CssClass="sfFormlabel" Text="Gender" meta:resourcekey="lblGenderResource1"></asp:Label>
                    </td>
                    <td runat="server">
                        <asp:RadioButtonList runat="server" ID="rdbGender" meta:resourcekey="rdbGenderResource1">
                            <asp:ListItem Selected="True" meta:resourcekey="ListItemResource1">Male</asp:ListItem>
                            <asp:ListItem meta:resourcekey="ListItemResource2">Female</asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblLocation" runat="server" CssClass="sfFormlabel" Text="Location"
                            meta:resourcekey="lblLocationResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtLocation" runat="server" CssClass="sfInputbox" meta:resourcekey="txtLocationResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblAboutYou" runat="server" CssClass="sfFormlabel" Text="About You"
                            meta:resourcekey="lblAboutYouResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtAboutYou" runat="server" CssClass="sfTextarea" TextMode="MultiLine"
                            meta:resourcekey="txtAboutYouResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <h3>
                            Contacts</h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label18" runat="server" CssClass="sfFormlabel" Text="Email:" meta:resourcekey="Label18Resource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtEmail1" runat="server" CssClass="sfInputbox" meta:resourcekey="txtEmail1Resource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <asp:TextBox ID="txtEmail2" runat="server" CssClass="sfInputbox" meta:resourcekey="txtEmail2Resource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <asp:TextBox ID="txtEmail3" runat="server" CssClass="sfInputbox" meta:resourcekey="txtEmail3Resource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblResPhone" runat="server" CssClass="sfFormlabel" Text="Res. Phone:"
                            meta:resourcekey="lblResPhoneResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtResPhone" runat="server" CssClass="sfInputbox" meta:resourcekey="txtResPhoneResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblMobilePhone" runat="server" CssClass="sfFormlabel" Text="Mobile"
                            meta:resourcekey="lblMobilePhoneResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMobile" runat="server" CssClass="sfInputbox" meta:resourcekey="txtMobileResource1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblOthers" runat="server" CssClass="sfFormlabel" Text="Others" meta:resourcekey="lblOthersResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtOthers" runat="server" CssClass="sfInputbox" OnTextChanged="txtOthers_TextChanged"
                            TextMode="MultiLine" meta:resourcekey="txtOthersResource1"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <table id="tblChangePasswordSettings" runat="server" cellpadding="0" cellspacing="0"
                border="0">
                <tr>
                    <td colspan="4">
                        <h2>
                            Change Password</h2>
                    </td>
                    <%-- <td><asp:Button ID="btnChangePassword" runat="server" Text="Change Password" 
                        CssClass='sfBtn'    onclick="btnChangePassword_Click" /></td>--%>
                </tr>
                <tr id="Tr1" runat="server">
                    <td id="Td1" width="20%" runat="server">
                        <asp:Label ID="lblNewPassword" runat="server" CssClass="sfFormlabel" Text="New Password"
                            meta:resourcekey="lblNewPasswordResource1"></asp:Label>
                    </td>
                    <td id="Td3" runat="server">
                        <div class="sfPassword">
                            <asp:TextBox ID="txtNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox password"
                                TextMode="Password" ValidationGroup="vgManagePassword" meta:resourcekey="txtNewPasswordResource1"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtNewPassword"
                                ErrorMessage="Password is required." CssClass="sfRequired" ValidationGroup="vgManagePassword"
                                meta:resourcekey="RequiredFieldValidator1Resource1"></asp:RequiredFieldValidator>
                        </div>
                    </td>
                </tr>
                <tr id="Tr2" runat="server">
                    <td id="Td4" runat="server">
                        <asp:Label ID="lblRetypeNewPassword" runat="server" CssClass="sfFormlabel" Text="Retype New Password"
                            meta:resourcekey="lblRetypeNewPasswordResource1"></asp:Label>
                    </td>
                    <td id="Td6" runat="server">
                        <asp:TextBox ID="txtRetypeNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox"
                            TextMode="Password" ValidationGroup="vgManagePassword" meta:resourcekey="txtRetypeNewPasswordResource1"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txtRetypeNewPassword"
                            ErrorMessage="Type password again." CssClass="sfRequired" ValidationGroup="vgManagePassword"
                            Display="Dynamic" meta:resourcekey="RequiredFieldValidator5Resource1"></asp:RequiredFieldValidator>
                        <asp:CompareValidator ID="cvPassword" runat="server" ErrorMessage="Password Doesn't Match"
                            ControlToValidate="txtRetypeNewPassword" ControlToCompare="txtNewPassword" ValidationGroup="vgManagePassword"
                            Display="Dynamic"></asp:CompareValidator>
                        <label id="lblValidationmsg" class="sfRequired">
                        </label>
                    </td>
                </tr>
                <tr id="Tr3" runat="server">
                    <td id="Td8" runat="server">
                        &nbsp;
                    </td>
                    <td id="Td9" runat="server">
                        <div class="sfButtonwrapper">
                            <asp:Button ID="btnManagePasswordSave" runat="server" ValidationGroup="vgManagePassword"
                                CssClass="sfBtn" Text="Change" OnClick="btnManagePasswordSave_Click" meta:resourcekey="btnManagePasswordSaveResource1" />
                        </div>
                        <div class="sfValidationsummary">
                            <label id="lblChangepwdval" class="sfError">
                            </label>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="sfButtonwrapper clearfix sfTopmargin20" id="divSaveProfile" runat="server">
                <asp:Button runat="Server" Text="Save" CssClass="sfBtn" ID="btnSave" OnClick="btnSave_Click"
                    ValidationGroup="rfvUserProfile" meta:resourcekey="btnSaveResource1" />
                <asp:LinkButton ID="lnkCancel" CssClass="sfBtn" runat="server" Text="Cancel" OnClick="lnkCancel_Click"
                    meta:resourcekey="lnkCancelResource1"></asp:LinkButton>
            </div>
        </div>
    </div>
    <div id="divUserInfo" runat="server" class="sfUserprofile sfFormwrapper">
        <div class="sfProfileimage" runat="server" id="imgProfileView">
            <asp:Image ID="imgViewImage" runat="server" Width="120px" meta:resourcekey="imgViewImageResource1" />
        </div>
        <div class="sfViewprofile sfPadding clearfix">
            <table id="tblViewProfile" cellpadding="0" cellspacing="0" width="100%" runat="server">
                <tr>
                    <td width="15%">
                        <asp:Label ID="Label2" runat="server" CssClass="sfFormlabel" Text="User Name" meta:resourcekey="Label2Resource1"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblViewUserName" runat="server" meta:resourcekey="lblViewUserNameResource1"></asp:Label>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label4" runat="server" CssClass="sfFormlabel" Text="First Name" meta:resourcekey="Label4Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewFirstName" runat="server" meta:resourcekey="lblViewFirstNameResource1"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label5" runat="server" CssClass="sfFormlabel" Text="LastName" meta:resourcekey="Label5Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewLastName" runat="server" meta:resourcekey="lblViewLastNameResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trviewFullName" runat="server" visible="true">
                    <td class="style1">
                        <asp:Label ID="Label6" runat="server" CssClass="sfFormlabel" Text="FullName" meta:resourcekey="Label6Resource1"></asp:Label>
                    </td>
                    <td colspan="2" class="style1">
                        <asp:Label ID="lblviewFullName" runat="server" meta:resourcekey="lblviewFullNameResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trviewBirthDate" runat="server">
                    <td runat="server">
                        <asp:Label ID="lblBirthDateTest" runat="server" Text="BirthDate" CssClass="sfFormlabel"
                            meta:resourcekey="lblBirthDateTestResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:Label runat="server" ID="lblviewBirthDate" meta:resourcekey="lblviewBirthDateResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trviewGender" runat="server">
                    <td runat="server">
                        <asp:Label ID="lblGenderText" runat="server" Text="Gender" CssClass="sfFormlabel"
                            meta:resourcekey="lblGenderTextResource1"></asp:Label>
                    </td>
                    <td>
                        <asp:Label runat="server" ID="lblviewGender" meta:resourcekey="lblviewGenderResource1"></asp:Label>
                    </td>
                </tr>
                <tr runat="server" id="trViewLocation" visible="true">
                    <td>
                        <asp:Label ID="Label7" runat="server" CssClass="sfFormlabel" Text="Location" meta:resourcekey="Label7Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewLocation" runat="server" meta:resourcekey="lblViewLocationResource1"></asp:Label>
                    </td>
                </tr>
                <tr runat="server" id="trViewAboutYou" visible="true">
                    <td>
                        <asp:Label ID="Label8" runat="server" CssClass="sfFormlabel" Text="About You" meta:resourcekey="Label8Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewAboutYou" runat="server" meta:resourcekey="lblViewAboutYouResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trViewEmail" runat="server">
                    <td>
                        <asp:Label ID="Label9" runat="server" CssClass="sfFormlabel" Text="Email" meta:resourcekey="Label9Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewEmail1" runat="server" meta:resourcekey="lblViewEmail1Resource1"></asp:Label><br />
                        <asp:Label ID="lblViewEmail2" runat="server" meta:resourcekey="lblViewEmail2Resource1"></asp:Label><br />
                        <asp:Label ID="lblViewEmail3" runat="server" meta:resourcekey="lblViewEmail3Resource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trViewResPhone" runat="server">
                    <td>
                        <asp:Label ID="Label10" runat="server" CssClass="sfFormlabel" Text="Res. Phone" meta:resourcekey="Label10Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewResPhone" runat="server" meta:resourcekey="lblViewResPhoneResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trViewMobile" runat="server">
                    <td>
                        <asp:Label ID="Label11" runat="server" CssClass="sfFormlabel" Text="Mobile" meta:resourcekey="Label11Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewMobile" runat="server" meta:resourcekey="lblViewMobileResource1"></asp:Label>
                    </td>
                </tr>
                <tr id="trViewOthers" runat="server">
                    <td>
                        <asp:Label ID="Label12" runat="server" CssClass="sfFormlabel" Text="Others" meta:resourcekey="Label12Resource1"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:Label ID="lblViewOthers" runat="server" meta:resourcekey="lblViewOthersResource1"></asp:Label>
                    </td>
                </tr>
            </table>
            <div class="sfButtonwrapper" id="divEditprofile" runat="server">
                <asp:Button runat="server" Text="Edit" CssClass="sfBtn" ID="btnEdit" OnClick="btnEdit_Click"
                    meta:resourcekey="btnEditResource1" />
            </div>
        </div>
    </div>
</div>
