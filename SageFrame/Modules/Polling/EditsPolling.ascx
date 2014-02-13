<%@ Control Language="C#" AutoEventWireup="true" CodeFile="EditsPolling.ascx.cs"
    Inherits="Modules_Polling_EditsPolling" %>

<script type="text/javascript">
    var Arr = new Array();
    var cID = "";
    var rid = 1;
    var RowID = '<%=rindex %>';
    $(function() {

        var radiobtnid = '#' + '<%=gvListPoll.ClientID %>';
        var checks = $(radiobtnid + ' input[type="radio"]');
        $(checks).bind("click", function() {
            $(checks).attr("checked", false);
            $(this).attr("checked", true);
        });
    });
    function showRowIndexs() {
        var i = 0;
        $("#tableChoices tr td.tdLabel").each(function() {
            i++;
            $(this).html("Choice " + i);
        });
    }

    function addFormField() {
        var ctrlID = $("#<%= hidRowIndex.ClientID %>").val();
        if (RowID == null || RowID == '') {
            rid++;
            $("#tableChoices").append("<tr class='row' id='pRow" + rid + "'><td width='200' class='tdLabel'>Choice:</td><td><input class='text' type='text' name='txtChoice" + rid + "' id='txtChoice" + rid + "'> <a href='#' onClick='removeFormField(\"#pRow" + rid + "\"); return false;'>Remove</a></td></tr>");
            showRowIndexs(rid);
        }
        else {
            RowID++;
            $("#tableChoices").append("<tr class='row' id='pRow" + RowID + "'><td width='200' class='tdLabel'>Choice:</td><td><input class='text' type='text' name='txtChoice" + RowID + "' id='txtChoice" + RowID + "'> <a href='#' onClick='removeFormField(\"#pRow" + RowID + "\"); return false;'>Remove</a></td></tr>");
            showRowIndexs(RowID);
        }
    }

    function removeFormField(id) {
        cID = $("input:hidden", id).val();
        $(id).remove();
        if (cID > 0) //call the Page method using JQuery ajax 
        {
            Arr.push(cID);
        }
        showRowIndexs();
    }
    $('#imbAddNewImage').live("click", function() {
        $('#txtChoice0').val('');
        $('#txtChoice1').val('');
        $("#tableChoices").find("tr:gt(1)").remove();
        $('#<%=divform.ClientID %>').attr("style", "display:block");
        $('#<%=divManipulateData.ClientID %>').attr("style", "display:none");
    });

    function DeleteChoice() {
        rid = null;
        RowID = null;
        $.each(Arr, function(index, value) {
            var Choiceid = value;
            DeleteChoiceField(Choiceid);
        });
    }
    function DeleteChoiceField(id) {
        $.ajax(
            {
                type: "POST",
                url: PollingEditServicePath + "Services/PollingWebService.asmx/DeletePollChoice",
                data: JSON2.stringify({ cID: parseInt(id) }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false
            });
    }
        

</script>

<h3>
    Add/Edit Poll</h3>
<br />
<div runat="server" id="divMsg" class="mInfo" visible="false">
</div>
<div id="divManipulateData" runat="server">
    <div class="sfButtonwrapper">
        <p>
            <button id="imbAddNewImage" type="button">
                <span>Add new poll</span>
            </button>
        </p>
    </div>
    <div class="sfGridwrapper">
        <asp:GridView ID="gvListPoll" runat="server" AutoGenerateColumns="False" EmptyDataText="No record to display"
            AllowPaging="True" Width="100%" OnPageIndexChanging="gvListPoll_PageIndexChanging"
            OnRowCommand="gvListPoll_RowCommand" 
            OnRowDeleting="gvListPoll_RowDeleting" OnRowEditing="gvListPoll_RowEditing" 
            meta:resourcekey="gvListPollResource1">
            <Columns>
                <asp:TemplateField HeaderText="Is Visible" HeaderStyle-CssClass="cssClassColumnCheckBox"
                    meta:resourcekey="TemplateFieldResource1">
                    <ItemTemplate>
                        <asp:HiddenField ID="hdfPollID" runat="server" Value='<%# Eval("PollID") %>' />
                        <asp:RadioButton ID="rdbActive" runat="server" 
                            Checked='<%# Convert.ToBoolean(Eval("Active")) %>' 
                            meta:resourcekey="rdbActiveResource1" />
                    </ItemTemplate>
                    <HeaderStyle VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Question" 
                    meta:resourcekey="TemplateFieldResource2">
                    <ItemTemplate>
                        <asp:Label ID="lblQuestion" runat="server" Text='<%# Eval("Question") %>' 
                            meta:resourcekey="lblQuestionResource1"></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <HeaderStyle HorizontalAlign="Left" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Choice Count" 
                    meta:resourcekey="TemplateFieldResource3">
                    <ItemTemplate>
                        <asp:Label ID="lblChoiceCount" runat="server" Text='<%# Eval("ChoiceCount") %>' 
                            meta:resourcekey="lblChoiceCountResource1"></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <HeaderStyle HorizontalAlign="Left" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Total Votes" 
                    meta:resourcekey="TemplateFieldResource4">
                    <ItemTemplate>
                        <asp:Label ID="lblVoteCount" runat="server" Text='<%# Eval("TotalVotes") %>' 
                            meta:resourcekey="lblVoteCountResource1"></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <HeaderStyle HorizontalAlign="Left" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit" meta:resourcekey="TemplateFieldResource5">
                    <ItemTemplate>
                        <asp:ImageButton ID="imgEdit" runat="server" CausesValidation="False" CommandArgument='<%# Eval("PollID") %>'
                            CommandName="Edit" 
                            ImageUrl='<%# GetTemplateImageUrl("imgedit.png", true) %>' 
                            meta:resourcekey="imgEditResource1" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="cssClassColumnDelete" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete" 
                    meta:resourcekey="TemplateFieldResource6">
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <ItemTemplate>
                        <asp:ImageButton ID="imgDelete" runat="server" CausesValidation="False" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"PollID") %>'
                            CommandName="Delete" ToolTip="Delete" 
                            ImageUrl='<%# GetTemplateImageUrl("imgdelete.png", true) %>' 
                            meta:resourcekey="imgDeleteResource1" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="cssClassColumnDelete" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
            <HeaderStyle CssClass="cssClassHeadingOne" />
            <RowStyle CssClass="sfOdd" />
            <AlternatingRowStyle CssClass="sfEven" />
        </asp:GridView>
    </div>
    <div id="divVisibleButton" class="sfButtonwrapper" runat="server">
        <asp:ImageButton ID="btnSaveIsVisible" runat="server" Style="height: 16px" 
            OnClick="btnSaveIsVisible_Click" meta:resourcekey="btnSaveIsVisibleResource1" />
        <asp:Label ID="lblSaveIsVisible" runat="server" Text="Save" AssociatedControlID="btnSaveIsVisible"
            CssClass="cssClassHtmlViewCursor" 
            meta:resourcekey="lblSaveIsVisibleResource1"></asp:Label>
    </div>
</div>
<div id="divform" runat="server" class="sfFormwrapper" style="display: none;">
    <table id="tblQtn" width="100%">
        <tr>
            <td>
                <asp:Label runat="server" ID="lblQuestion" CssClass="sfFormlabel" AssociatedControlID="txtQuestion"
                    Text="Question" meta:resourcekey="lblQuestionResource2" />
            </td>
            <td>
                :
            </td>
            <td>
                <asp:TextBox ID="txtQuestion" runat="server" CssClass="sfInputbox" 
                    meta:resourcekey="txtQuestionResource1" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="<img align='absmiddle' src='../Modules/Polling/images/warn.gif' /> Required"
                    ControlToValidate="txtQuestion" ValidationGroup="body" 
                    SetFocusOnError="True" meta:resourcekey="RequiredFieldValidator1Resource1" />
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label runat="server" ID="lblBlock" AssociatedControlID="rdoCookie" CssClass="sfFormlabel"
                    Text="Block repeated voting by" meta:resourcekey="lblBlockResource1" />
            </td>
            <td>
                :
            </td>
            <td>
                <asp:RadioButton CssClass="cssClassRadioButton sfFormlabel" Checked="True"
                    GroupName="block" ID="rdoCookie" runat="server" Text=" Cookie(safest)" 
                    meta:resourcekey="rdoCookieResource1" />
                <asp:RadioButton CssClass="cssClassRadioButton sfFormlabel" GroupName="block"
                    ID="rdoIP" runat="server" Text=" IP Address" 
                    ToolTip="This may cause problems for multiple voters on same network" 
                    meta:resourcekey="rdoIPResource1" />
                <asp:RadioButton CssClass="cssClassRadioButton sfFormlabel" GroupName="block"
                    ID="rdoNone" runat="server" Text=" Don't block" 
                    meta:resourcekey="rdoNoneResource1" />
            </td>
        </tr>
    </table>
    <div runat="server" id="divChoices">
        <table id="tableChoices" width="100%">
            <tr id="pRow0">
                <td width="200" class="tdLabel">
                    Choice 1
                </td>
                <td>
                    <input type="text" class="text" id="txtChoice0" name="txtChoice0" />
                    <a onclick="removeFormField('#pRow0'); return false;" href="#">Remove</a>
                </td>
            </tr>
            <tr id="pRow1">
                <td width="200" class="tdLabel">
                    Choice 2
                </td>
                <td>
                    <input type="text" class="text" id="txtChoice1" name="txtChoice1" />
                    <a onclick="removeFormField('#pRow1'); return false;" href="#">Remove</a>
                </td>
            </tr>
        </table>
    </div>
    <asp:HiddenField runat="server" ID="hidRowIndex" Value="2" />
    <!-- by default there will be two inputs available to insert choices -->
    <asp:HiddenField ID="hidPollID" runat="server" />
    <div class="sfButtonwrapper">
        <p>
            <button type="button" onclick="addFormField();return false;">
                <span>Add a new choice</span>
            </button>
        </p>
    </div>
    <div class="sfButtonwrapper">
        <asp:ImageButton ID="btnSave" runat="server" ValidationGroup="body" Style="height: 16px"
            OnClick="btnSave_Click" OnClientClick="return DeleteChoice()" 
            meta:resourcekey="btnSaveResource1" />
        <asp:Label ID="lblSave" runat="server" Text="Save" AssociatedControlID="btnSave"
            CssClass="cssClassHtmlViewCursor" meta:resourcekey="lblSaveResource1"></asp:Label>
        <asp:ImageButton ID="btnCancel" runat="server" Style="height: 16px" 
            OnClick="btnCancel_Click" meta:resourcekey="btnCancelResource1" />
        <asp:Label ID="lblSaveCancel" runat="server" Text="Cancel" AssociatedControlID="btnCancel"
            CssClass="cssClassHtmlViewCursor" 
            meta:resourcekey="lblSaveCancelResource1"></asp:Label>
    </div>
</div>
