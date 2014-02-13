<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ReturnsHistory.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxReturnAndPolicy_ReturnsHistory" %>

<script type="text/javascript">
    var ReturnsHistory = '';
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxReturnAndPolicy
        });
    });
    var storeId = AspxCommerce.utils.GetStoreID();
    var portalId = AspxCommerce.utils.GetPortalID();
    var userName = AspxCommerce.utils.GetUserName();
    var cultureName = AspxCommerce.utils.GetCultureName();
    var customerId = AspxCommerce.utils.GetCustomerID();
    var ip = AspxCommerce.utils.GetClientIP();
    var countryName = AspxCommerce.utils.GetAspxClientCoutry();
    var sessionCode = AspxCommerce.utils.GetSessionCode();
    var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
    var aspxCommonObj = {
        StoreID: storeId,
        PortalID: portalId,
        UserName: userName,
        CultureName: cultureName,
        CustomerID: customerId,
        SessionCode: sessionCode
    };
    $(function() {
        ReturnsHistory = {

            config: {
                isPostBack: false,
                async: false,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                method: "",
                url: "",
                ajaxCallMode: "", ///0 for get categories and bind, 1 for notification,2 for versions bind
                error: "",
                sessionValue: ""
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: ReturnsHistory.config.type,
                    contentType: ReturnsHistory.config.contentType,
                    cache: ReturnsHistory.config.cache,
                    async: ReturnsHistory.config.async,
                    url: ReturnsHistory.config.url,
                    data: ReturnsHistory.config.data,
                    dataType: ReturnsHistory.config.dataType,
                    success: ReturnsHistory.config.ajaxCallMode,
                    error: ReturnsHistory.config.error
                });
            },
            Init: function() {
                ReturnsHistory.GetMyReturns();
                $("#lnkBack").bind("click", function() {
                    ReturnsHistory.ReturnHideAll();
                    $("#divReturnHistory").show();
                });

                $("#btnSaveComments").click(function() {
                    ReturnsHistory.SaveComments();
                });

            },

            SaveComments: function() {
                var orderID = $("#spanOrderID").html();
                var returnID = $("#spanReturnID").html();
                var commentText = $("#txtAreaComments").val();
                var isCustomerNotifiedByEmail = $('#chkIsCustomerNotifyByEmail').attr('checked') ? 1 : 0;
                if (commentText == '' || commentText == null) {
                    csscody.alert('<h2>' + getLocale(AspxReturnAndPolicy, 'Information Message') + '</h2><p>' + getLocale(AspxReturnAndPolicy, "You can not send blank comments") + '</p>');
                }
                else {
                    var returnDetailObj = {
                        ReturnID: returnID,
                        OrderID: orderID,
                        CommentText: commentText,
                        IsCustomerNotifiedByEmail: isCustomerNotifiedByEmail
                    };
                    this.config.url = this.config.baseURL + "ReturnSaveComments";
                    this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj });
                    this.config.ajaxCallMode = ReturnsHistory.SaveCommentsSuccess;
                    this.ajaxCall(this.config);
                }
            },
            SaveCommentsSuccess: function() {
                $("#txtAreaComments").val('');
                var rtrnId = $("#spanReturnID").html();
                var ordrId = $("#spanOrderID").html();
                csscody.info("<h2>" + getLocale(AspxReturnAndPolicy, "Successful Message") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Comment Posted Successfully") + "</p>");
                ReturnsHistory.ViewComments(rtrnId, ordrId);
            },

            ViewComments: function(returnId, orderId) {
                var returnDetailObj = {
                    ReturnID: returnId,
                    OrderID: orderId
                };
                this.config.url = this.config.baseURL + "GetMyReturnsComment";
                this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = ReturnsHistory.ViewCommentsLsit;
                this.ajaxCall(this.config);
            },
            ViewCommentsLsit: function(data) {
                var commentsList = '';
                $.each(data.d, function(index, value) {
                    if (value.CustomerID != 1 && value.CustomerID != 2) {
                        commentsList += '<hr /><li>' + '<b>' + value.AddedBy + '</b>' + ' ' + '<span> | </span>' + ' ' + '<b>Admin Notified by Email : </b>' + ' ' + value.IsNotified + ' ' + '<span> | </span>' + '<b>' + value.AddedOn + '</b>' + '</li>';

                        commentsList += '<li>' + value.CommentText + '</li></br>';
                    }
                    else {
                        commentsList += '<hr /><li>' + '<b>' + value.AddedBy + '</b>' + ' ' + '<span> | </span>' + ' ' + '<b>Customer Notified by Email : </b>' + ' ' + value.IsNotified + ' ' + '<span> | </span>' + '<b>' + value.AddedOn + '</b>' + '</li>';
                        commentsList += '<li>' + value.CommentText + '</li></br>';
                    }
                });
                $('#ulCommentsList').html(commentsList);
            },
            GetMyReturns: function() {
                var offset_ = 1;
                var current_ = 1;
                var perpage = ($("#gdvMyReturns_pagesize").length > 0) ? $("#gdvMyReturns_pagesize :selected").text() : 10;
                $("#gdvMyReturns").sagegrid({
                    url: this.config.baseURL,
                    functionMethod: 'GetMyReturnsList',
                    colModel: [
                    { display: getLocale(AspxReturnAndPolicy, 'Return ID'), name: 'return_id', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxReturnAndPolicy, 'Order ID'), name: 'order_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                     { display: getLocale(AspxReturnAndPolicy, 'Return Status'), name: 'return_status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxReturnAndPolicy, 'Date Return Filed'), name: 'return_date', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                     { display: 'Customer ID', name: 'customerID', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                     { display: 'User Name', name: 'userName', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxReturnAndPolicy, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
    				],
                    buttons: [
            { display: getLocale(AspxReturnAndPolicy, 'View'), name: 'viewReturn', enable: true, _event: 'click', trigger: '1', callMethod: 'ReturnsHistory.GetReturnDetails', arguments: '1' }
              ],
                    rp: perpage,
                    nomsg: getLocale(AspxReturnAndPolicy, "No Records Found!"),
                    param: { aspxCommonObj: aspxCommonObj },
                    current: current_,
                    pnew: offset_,
                    sortcol: { 6: { sorter: false} }
                });
                ReturnsHistory.ReturnHideAll();
                $("#divReturnHistory").show();
            },
            GetReturnDetails: function(tblID, argus) {
                switch (tblID) {
                    case "gdvMyReturns":
                        ReturnsHistory.GetAllReturnDetails(argus[0], argus[3]);
                        break;
                }
            },
            GetAllReturnDetails: function(returnId, orderId) {
                var returnDetailObj = {
                    ReturnID: returnId,
                    OrderID: orderId
                };
                this.config.url = this.config.baseURL + "GetMyReturnsDetails";
                this.config.data = JSON2.stringify({ returnDetailObj: returnDetailObj, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = ReturnsHistory.BindMyReturns;
                this.ajaxCall(this.config);
            },
            BindMyReturns: function(msg) {

                if (msg.d.length > 0) {
                    var elements = '';
                    var tableReturnElements = '';
                    var tableItemsElements = '';
                    $.each(msg.d, function(index, value) {
                        Array.prototype.clean = function(deleteValue) {
                            for (var i = 0; i < this.length; i++) {
                                if (this[i] == deleteValue) {
                                    this.splice(i, 1);
                                    i--;
                                }
                            }
                            return this;
                        };
                        if (index < 1) {
                            var billAdd = '';
                            var arrBill;
                            arrBill = value.ShippingAddress.split(',');
                            billAdd += '<li>' + arrBill[0] + ' ' + arrBill[1] + '</li>';
                            billAdd += '<li>' + arrBill[2] + '</li><li>' + arrBill[3] + '</li><li>' + arrBill[4] + '</li>';
                            billAdd += '<li>' + arrBill[5] + ' ' + arrBill[6] + ' ' + arrBill[7] + '</li>' + arrBill[8] + '<li>' + arrBill[9] + '</li><li>' + arrBill[10] + ' ' + arrBill[11] + '</li><li>' + arrBill[12] + '</li>';
                            billAdd += '<li>' + arrBill[13] + '</li>';
                            $('#ulOrderAddress').html(billAdd);
                            $("#spanReturnFiledDate").html(value.ReturnFileDate);
                            $("#spanOrderedDateDate").html(value.OrderedDate);
                        }
                        if (index < 1) {
                            var returnAdd = '';
                            var arrReturn;
                            arrReturn = value.ReturnAddress.split(',');
                            returnAdd += '<li>' + arrReturn[0] + ' ' + arrReturn[1] + '</li>';
                            returnAdd += '<li>' + arrReturn[2] + '</li><li>' + arrReturn[3] + '</li><li>' + arrReturn[4] + '</li>';
                            returnAdd += '<li>' + arrReturn[5] + ' ' + arrReturn[6] + ' ' + arrReturn[7] + '</li>' + arrReturn[8] + '<li>' + arrReturn[9] + '</li><li>' + arrReturn[10] + ' ' + arrReturn[11] + '</li>';
                            $("#ulReturnAddress").html(returnAdd);
                        }
                        if (index < 1) {
                            var shippingMethod = '';
                            if (value.ShippingMethodName != '' && value.ShippingMethodName != null) {
                                shippingMethod += '<li>' + getLocale(AspxReturnAndPolicy, 'Shipping Method Name :') + ' ' + value.ShippingMethodName + '</li>';
                                shippingMethod += '<li>' + getLocale(AspxReturnAndPolicy, 'Shipping Provider Name :') + ' ' + value.ShippingProviderName + '</li>';
                                $("#ulShippingMethods").html(shippingMethod);
                                $('#ShippingDetails').show();
                            }
                            else {
                                $('#ShippingDetails').hide();
                            }

                        }
                        if (index < 1) {
                            tableReturnElements += '<tr>';
                            //tableReturnElements += '<td class="cssClassReturnHistoryReturnID">' + value.ReturnID + '</td>';
                            //tableReturnElements += '<td class="cssClassReturnHistoryOrderID">' + value.OrderID + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryItemName">' + value.ItemName + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryCostVariants">' + value.CostVariants + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryQuantity">' + value.Quantity + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryReturnReason">' + value.ReturnReason + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryOtherDetails">' + value.OtherFaults + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryRetrunProductStatus">' + value.RetrunProductStatus + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistorySKU">' + value.ReturnStatus + '</td>';
                            tableReturnElements += '<td class="cssClassReturnHistoryReturnAction">' + value.ReturnAction + '</td>';
                            tableReturnElements += '</tr>';
                        }
                        $("#spanOrderID").html(value.OrderID);
                        $("#spanReturnID").html(value.ReturnID);
                        ReturnsHistory.ViewComments(value.ReturnID, value.OrderID);
                    });


                    $("#divReturnInfo").find('table>tbody').html(tableReturnElements);

                    ReturnsHistory.ReturnHideAll();
                    $("#divReturnDetails").show();
                    $("#divReturnInfo").show();
                    $("#divItemInfo").show();
                    $("#divReturnBack").show();
                    $("#divSaveComments").show();

                } else {

                    csscody.alert("<h2>" + getLocale(AspxReturnAndPolicy, "Information Alert") + "</h2><p>" + getLocale(AspxReturnAndPolicy, "Return ID does not exist!") + "</p>");
                    $("#txtOrderID").val('');
                    return false;
                }
            },

            ReturnHideAll: function() {
                $("#divReturnHistory").hide();
                $("#divReturnDetails").hide();
                $("#divReturnInfo").hide();
                $("#divItemInfo").hide();
                $("#divReturnBack").hide();
                $("#divSaveComments").hide();
            }
        };
        ReturnsHistory.Init();
    });

</script>

<div id="divReturnHistory" class="cssClassdivReturnHistory">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblTitle" class="sfLocale">
                    My Returns</label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="loading">
                    <img id="ajaxMyReturns" src="" class="sfLocale" alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvMyReturns" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divReturnDetails" class="sfFormwrapper">
    <span class="cssClassLabel sfLocale">Return ID: </span>&nbsp&nbsp<span class="cssClassLabel sfLocale"
        id="spanReturnID"></span>&nbsp&nbsp&nbsp&nbsp <span class="cssClassLabel sfLocale">Return
            Filed Date: </span>&nbsp&nbsp<span class="cssClassLabel sfLocale" id="spanReturnFiledDate"></span><br />
    <span class="cssClassLabel sfLocale">Order ID: </span>&nbsp&nbsp<span class="cssClassLabel sfLocale"
        id="spanOrderID"></span>&nbsp&nbsp&nbsp&nbsp <span class="cssClassLabel sfLocale">Order
            Date: </span>&nbsp&nbsp<span class="cssClassLabel sfLocale" id="spanOrderedDateDate"></span><br />
    <br />
    <div id="divShiipingInfo">
        <table id="tblShippingInfo" width="100%">
            <tr>
                <td style="vertical-align: top;">
                    <span class="cssClassLabel sfLocale"><strong>Return Shipping Address:</strong> </span>
                    <ul id="ulReturnAddress">
                    </ul>
                </td>
                <td style="vertical-align: top;">
                    <span class="cssClassLabel sfLocale"><strong>Order Shipping Address:</strong></span>
                    <ul id="ulOrderAddress">
                    </ul>
                </td>
                <td style="vertical-align: top;">
                    <div id="ShippingDetails">
                        <span class="cssClassLabel sfLocale"><strong>Shipping Method :</strong></span>
                        <ul id="ulShippingMethods" class="cssClassLabel">
                        </ul>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <br />
</div>
<div id="divReturnInfo" class="sfFormwrapper">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2 class="sfLocale">
                Item Return Information:</h2>
        </div>
        <input type="hidden" id="hdnOrderID" />
        <input type="hidden" id="hdnReturnID" />
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <thead>
                        <tr class="cssClassHeading">
                            <%--<td class="header sfLocale">
                                Return ID
                            </td>
                           <td class="header sfLocale">
                                Order ID
                            </td>--%>
                            <td class="sfLocale">
                                Item Name
                            </td>
                            <td class="sfLocale">
                                Variants
                            </td>
                            <td class="sfLocale">
                                Qty.
                            </td>
                            <td class="sfLocale">
                                Reson For Return
                            </td>
                            <td class="sfLocale">
                                Other Faults
                            </td>
                            <td class="sfLocale">
                                Item Condition
                            </td>
                            <td class="sfLocale">
                                Return Staus
                            </td>
                            <td class="sfLocale">
                                Return Action
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divSaveComments">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblCommentHeading" runat="server" Text="Comments :" meta:resourcekey="lblCommentHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <div id="divComments">
                <br />
                <div>
                    &nbsp;&nbsp;<span id="spanPostComments" class="cssClassspanPostComments" class="sfLocale""><b>Post
                        Comments :</b></span>
                </div>
                <div style="vertical-align: top;">
                    <span>&nbsp;&nbsp;<textarea id="txtAreaComments" cols="20" rows="5" style="width: 700px;
                        height: 76px;"></textarea><br />
                    </span>
                </div>
                <div style="text-align: right;">
                    <span id="spanSaveComments" class="cssClassspanSaveComments">
                        <button type="button" id="btnSaveComments" class="cssClassButtonSubmit">
                            <span class="sfLocale">Post Comment</span></button>
                    </span>
                </div>
            </div>
            <br />
            <div id="divCommentsList" class="cssClassdivCommentsList">
                <ul id="ulCommentsList" class="cssClassLabel">
                </ul>
            </div>
        </div>
    </div>
</div>
<div id="divReturnBack" class="sfButtonwrapper">
    <button type="button" id="lnkBack" class="cssClassButtonSubmit">
        <span><span class="sfLocale">Go back</span></span></button>
</div>
