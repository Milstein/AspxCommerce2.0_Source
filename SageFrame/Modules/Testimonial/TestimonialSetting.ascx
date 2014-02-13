<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TestimonialSetting.ascx.cs"
    Inherits="Modules_Testimonial_TestimonialSetting" %>
    <script type="text/javascript">
        $(function() {
            var NoOfList = '#' + '<%=txtNoOfList.ClientID %>';
            $(NoOfList).numeric();
        });
    </script>
<div class="sfFormwrapper">
    <div id="dvSetting">
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblNoOfList" runat="server" Text="No Of Testimonial To Display" 
                        CssClass="sfFormlabel" meta:resourcekey="lblNoOfListResource1"></asp:Label>
                </td>
                <td>                    
                    :
                </td>
                <td>
                    <asp:TextBox ID="txtNoOfList" MaxLength="2" runat="server" 
                        CssClass="sfInputbox" meta:resourcekey="txtNoOfListResource1"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvNoOfList" ControlToValidate="txtNoOfList" 
                        ValidationGroup="saveSetting" runat="server" ErrorMessage="Field Is Required" 
                        meta:resourcekey="rfvNoOfListResource1"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblImage" runat="server" Text="Enable Image" 
                        CssClass="sfFormlabel" meta:resourcekey="lblImageResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:CheckBox ID="chkImage" runat="server" CssClass="cssClassCheckBox" 
                        meta:resourcekey="chkImageResource1" />
                </td>
            </tr>
               <tr>
                <td>
                    <asp:Label ID="lblDatetime" runat="server" Text="Enable Date" 
                        CssClass="sfFormlabel" meta:resourcekey="lblDatetimeResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:CheckBox ID="chkDateTime" runat="server" CssClass="cssClassCheckBox" 
                        meta:resourcekey="chkDateTimeResource1" />
                </td>
            </tr>
             <tr>
                <td>
                    <asp:Label ID="lblViewMore" runat="server" Text="Enable View More" 
                        CssClass="sfFormlabel" meta:resourcekey="lblViewMoreResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:CheckBox ID="chkViewMore" runat="server" CssClass="cssClassCheckBox" 
                        meta:resourcekey="chkViewMoreResource1" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                </td>
                <td>
                    <div class="sfButtonwrapper">
                        <asp:ImageButton ID="imbSaveSetting" ValidationGroup="saveSetting" 
                            runat="server" OnClick="imbSaveSetting_Click" 
                            meta:resourcekey="imbSaveSettingResource1" />
                        <asp:Label ID="lblSavesetting" runat="server" Text="Save" 
                            AssociatedControlID="imbSaveSetting" meta:resourcekey="lblSavesettingResource1"></asp:Label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
