<%@ Control Language="C#" AutoEventWireup="true" CodeFile="OrderOverViews.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxAdminDashBoard_OrderOverViews" %>

<script type="text/javascript">
    //<![CDATA[

    //]]>
    $(document).ready(function() {
        $(".sfLocale").localize({
            moduleKey: AspxAdminDashBoard
        });
    });
</script>

<div id="divOrderStatus" class="cssClssRoundedBoxTable">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblInventoryDetail" CssClass="cssClassLabel" runat="server" 
                    Text="Order Status OverView " meta:resourcekey="lblInventoryDetailResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
              <div class="sfTimeSelection">
                    <label class="sfLabel sfLocale">
                        Select Time :</label>
                    <label>
                        <select id="ddlInventory" class="sfSelect reportTrigger">
                            <option value="1" selected="selected" class="sfLocale">Last 24 Hours</option>
                            <option value="7" class="sfLocale">Last 7 Days</option>
                            <option value="30" class="sfLocale">Last 30 Days</option>
                            <option value="365" class="sfLocale">Last 365 Days</option>
                        </select></label>
                </div>
            <div id="divStaticOrderStatusAdmindash">
            </div>
        </div>
    </div>
</div>
