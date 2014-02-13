<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ViewPolling.ascx.cs" Inherits="Modules_Polling_ViewPolling" %>

<script language="javascript" type="text/javascript">
    $(document).ready(function() {

        var storeID = '<%=StoreID %>';
        var portalID = '<%=PortalID %>';
        var customerID = '<%=CustomerID %>';
        var userName = '<%=UserName %>';
        var cultureName = '<%=CultureName %>';
        var aspxRootPath = '<%=aspxRootPath %>';
        var ModuleCollapsible = "<%=ModuleCollapsible %>";
        $(".sfLocale").localize({
            moduleKey: Polling
        });
        if (ModuleCollapsible.toLowerCase() == 'true') {
            $(".cssClassPollingHeader").addClass("sfCollapsible");
            $(".cssClassPollingHeader").live('click', function() {
                $(".cssClassPoolingBox").slideToggle('fast');
            });
        }

        $(this).GetPollScipt({
            UserModuleID: '<%=UserModuleID %>',
            PortalID: '<%=PortalID %>',
            pollID: '<%=pollID %>',
            isPolled: '<%=isPolled %>',
            PollingServicePath: PollingServicePath
        });

    });
    
</script>

<div class="cssClassLeftSideBox cssClassPollingWrapper" style="display: block;">
    <div class="cssClassPollingHeader">
        <h2 class="cssClassLeftHeader">
            <span class="cssClassPoll sfLocale">Community Poll</span></h2>
    </div>
    <div class="cssClassCommonSideBoxTable cssClassPoolingBox">
        <div runat="server" id="divMsg" class="mInfo" visible="false" />
        <div id="divPoll" class="poll-box" runat="server">
            <div class="poll-question">
                <asp:Literal ID="litQuestion" runat="server" meta:resourcekey="litQuestionResource1" />
            </div>
            <asp:Literal ID="ltrlPollResult" runat="server" meta:resourcekey="ltrlPollResultResource1"></asp:Literal>
            <div id="divAnswers" class="sfdivAnswer" runat="server">
                <asp:Repeater runat="server" ID="rptChoices">
                    <ItemTemplate>
                        <p>
                            <label>
                                <input type="radio" value='<%# Eval("PollChoiceID") %>' name="rdoPoll" id='rdoPoll<%# Container.ItemIndex %>' />
                                <%# Eval("Choice") %>
                            </label>
                        </p>
                    </ItemTemplate>
                    <FooterTemplate>
                        <div id="divmessage" class="cssClassNotFound" style="display: none">
                        </div>
                        <input type="button" value="View Results" class="cssClassSubmitBtn sfLocale" id="btnViewResult<%# UserModuleID %>">
                        <input type="button" value="Vote" class="cssClassSubmitBtn sfLocale" id="btnSubmit<%# UserModuleID %>">
                    </FooterTemplate>
                </asp:Repeater>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField runat="server" ID="hidPollID" />
