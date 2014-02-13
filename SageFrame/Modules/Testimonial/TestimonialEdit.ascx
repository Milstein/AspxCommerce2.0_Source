<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TestimonialEdit.ascx.cs"
    Inherits="Modules_Testimonial_TestimonialEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<script type="text/javascript">
    $(function() {
        var Weburl = '#' + '<%=txtWeburl.ClientID %>';
        $(Weburl).live("change", function() {
            var WebSite = $(this).val();
            if ($(this).val().length > 0) {
                if (!$(this).val().match(/^http/)) {
                    $(this).val('http://' + WebSite);
                }
            }
        });
        $('#' + '<%=txtDate.ClientID%>').datepicker({ dateFormat: 'yy/mm/dd' });
       
    });
    
    function flipFlopException(eTarget) {
        if (document.getElementById(eTarget).style.display == 'none') {
            document.getElementById(eTarget).style.display = '';
        }
        else {
            document.getElementById(eTarget).style.display = 'none';
        }
    }
</script>

<div class="sfFormwrapper">
    <div id="dvAddBtn" runat="server" class="sfButtonwrapper">
        <asp:ImageButton ID="imbAddnewInfo" runat="server" 
            OnClick="imbAddnewInfo_Click" meta:resourcekey="imbAddnewInfoResource1" />
        <asp:Label ID="lblAddnewinfo" runat="server" Text="Add Testimonial" 
            AssociatedControlID="imbAddnewInfo" meta:resourcekey="lblAddnewinfoResource1"></asp:Label>
    </div>
    <div id="divTestimonialForm" runat="server">
        <table id="tblTestimonial" runat="server">
            <tr>
                <td>
                    <asp:Label ID="lblFirstName" runat="server" CssClass="sfFormlabel" 
                        Text="Name" meta:resourcekey="lblFirstNameResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:TextBox ID="txtName" CssClass="sfInputbox" runat="server" 
                        meta:resourcekey="txtNameResource1"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvUserName" ControlToValidate="txtName" ValidationGroup="SaveForm"
                        runat="server" ErrorMessage="Enter Name" 
                        meta:resourcekey="rfvUserNameResource1"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblAddress" runat="server" Text="Address" 
                        CssClass="sfFormlabel" meta:resourcekey="lblAddressResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:TextBox ID="txtAddress" runat="server" CssClass="sfInputbox" 
                        meta:resourcekey="txtAddressResource1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblWeburl" runat="server" Text="Website" 
                        CssClass="sfFormlabel" meta:resourcekey="lblWeburlResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:TextBox ID="txtWeburl" runat="server" CssClass="sfInputbox" 
                        meta:resourcekey="txtWeburlResource1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblImage" runat="server" Text="Image" 
                        CssClass="sfFormlabel" meta:resourcekey="lblImageResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:FileUpload ID="ProfileImage" runat="server" 
                        meta:resourcekey="ProfileImageResource1" />
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td colspan="2">
                    <div id="divImage" runat="server">
                        <asp:Image ID="imgProfilepic" runat="server" Height="70px" Width="100px" 
                            meta:resourcekey="imgProfilepicResource1" />
                        <asp:ImageButton ID="imbDeletepic" runat="server" CssClass="cssClassDeleteImage"
                            OnClick="imbDeletepic_Click" meta:resourcekey="imbDeletepicResource1"></asp:ImageButton>
                    </div>
                </td>
            </tr>
            <tr visible="false">
                <td>
                    <asp:Label ID="lblTitle" runat="server" Text="Title" 
                        CssClass="sfFormlabel" meta:resourcekey="lblTitleResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <asp:TextBox ID="txtTitle" runat="server" CssClass="sfInputbox" 
                        meta:resourcekey="txtTitleResource1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblDescription" runat="server" Text="Testimonial" 
                        CssClass="sfFormlabel" meta:resourcekey="lblDescriptionResource1"></asp:Label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <FCKeditorV2:FCKeditor ID="txtTestimonial" runat="server" Height="350px" Width="100%">
                    </FCKeditorV2:FCKeditor>   
                </td>
            </tr>
            <tr>
            <td> <asp:Label ID="lblDate" runat="server" Text="Date" 
                    CssClass="sfFormlabel" meta:resourcekey="lblDateResource1"></asp:Label></td>
            <td>
           :
            </td>
            <td>
             <asp:TextBox ID="txtDate" runat="server" CssClass="sfInputbox" 
                    meta:resourcekey="txtDateResource1"></asp:TextBox>
             <%--<asp:CalendarExtender ID="cmdNewsCalendar" runat="server" CssClass="CssClassCalendar"
               Enabled="True" PopupButtonID="imbNewsCalender" PopupPosition="BottomLeft" TargetControlID="txtDate" />--%>                                    
                                    <asp:RequiredFieldValidator ID="rfvDate" runat="server" ErrorMessage="Select date !!"
                                        ControlToValidate="txtDate" ValidationGroup="SaveForm" 
                    meta:resourcekey="rfvDateResource1"></asp:RequiredFieldValidator>
            </td>
            </tr>
            <tr>
                <td>
                </td>
                <td colspan="2">
                    <div class="sfButtonwrapper">
                        <asp:ImageButton ID="imbSave" runat="server" ValidationGroup="SaveForm" 
                            OnClick="imbSave_Click" meta:resourcekey="imbSaveResource1" />
                        <asp:Label ID="lblSave" runat="server" Text="Save" 
                            AssociatedControlID="imbSave" meta:resourcekey="lblSaveResource1"></asp:Label>
                        <asp:ImageButton ID="imbCancel" runat="server" OnClick="imbCancel_Click" 
                            meta:resourcekey="imbCancelResource1" />
                        <asp:Label ID="lblCancel" runat="server" Text="Cancel" 
                            AssociatedControlID="imbCancel" meta:resourcekey="lblCancelResource1"></asp:Label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    
    <div id="divGrid" runat="server" class="sfGridwrapper">
        <asp:GridView Width="100%" runat="server" ID="gdvTestRecord" GridLines="None" AutoGenerateColumns="False"
            EmptyDataText="..........No Data Found.........." OnPageIndexChanging="gdvTestRecord_PageIndexChanging"
            OnRowCommand="gdvTestRecord_RowCommand" OnRowDataBound="gdvTestRecord_RowDataBound"
            OnRowDeleting="gdvTestRecord_RowDeleting" OnRowEditing="gdvTestRecord_RowEditing"
            OnRowUpdating="gdvTestRecord_RowUpdating" 
            meta:resourcekey="gdvTestRecordResource1">
            <Columns>
                <asp:TemplateField HeaderText="S.N" meta:resourcekey="TemplateFieldResource1">
                    <ItemTemplate>
                        <%#Container.DataItemIndex+1 %>
                    </ItemTemplate>
                    <HeaderStyle CssClass="cssCheckBoxHeader" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Author" 
                    meta:resourcekey="TemplateFieldResource2">
                    <ItemTemplate>
                        <table style="width: 100%; border: none;">
                            <tr>
                                <td onclick='flipFlopException(&#039;_<%# Eval("TestimonialID") %>&#039;)' style="cursor: pointer;
                                    width: 30%">
                                    <span style="overflow: hidden;">&nbsp;
                                        <asp:Label ID="lblTestTitle" runat="server" Text='<%# Eval("UserName") %>' 
                                        meta:resourcekey="lblTestTitleResource1" />
                                    </span>
                                </td>
                            </tr>
                            <tr id='_<%# (DataBinder.Eval(Container.DataItem,"TestimonialID").ToString()) %>'
                                style="display: none; width: 100%">
                                <td class="cssClassInfoDetail" colspan="4">
                                    <asp:Panel runat="server" Width="100%" meta:resourcekey="PanelResource1">                                       
                                        <p>
                                            <asp:Label ID="lblDescription" runat="server" CssClass="sfFormlabel" 
                                                Text="Testimonial:" meta:resourcekey="lblDescriptionResource2"></asp:Label>
                                            <asp:Literal ID="ltrDescription" runat="server" Text='<%# (DataBinder.Eval(Container.DataItem,"Testimonial").ToString()) %>'></asp:Literal>
                                        </p>
                                        <p>
                                            <asp:Label ID="lblAddedOn" runat="server" CssClass="sfFormlabel" 
                                                Text="Added On:" meta:resourcekey="lblAddedOnResource1"></asp:Label>
                                            <asp:Literal ID="ltrAddedOn" runat="server" Text='<%# (DataBinder.Eval(Container.DataItem,"AddedOn").ToString()) %>'></asp:Literal>
                                        </p>
                                    </asp:Panel>
                                </td>
                            </tr>
                        </table>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit" meta:resourcekey="TemplateFieldResource3">
                    <ItemTemplate>
                        <asp:ImageButton ID="imgEdit" runat="server" CausesValidation="False" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"TestimonialID") %>'
                            CommandName="Edit" 
                            ImageUrl='<%# GetTemplateImageUrl("imgedit.png", true) %>' 
                            meta:resourcekey="imgEditResource1" />
                    </ItemTemplate>
                    <HeaderStyle VerticalAlign="Top" CssClass="cssClassColumnEdit" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete" 
                    meta:resourcekey="TemplateFieldResource4">
                    <ItemTemplate>
                        <asp:ImageButton ID="ImgDelete" runat="server" CausesValidation="False" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"TestimonialID") %>'
                            CommandName="Delete" ImageUrl='<%# GetTemplateImageUrl("imgdelete.png", true) %>'
                            
                            OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete page?');" 
                            meta:resourcekey="ImgDeleteResource1" />
                    </ItemTemplate>
                    <HeaderStyle VerticalAlign="Top" CssClass="cssClassColumnDelete" />
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="sfEven" />
            <PagerStyle CssClass="cssClassPageNumber" />
            <RowStyle CssClass="sfOdd" />
            <HeaderStyle CssClass="cssClassHeadingOne" />
        </asp:GridView>
    </div>
</div>
