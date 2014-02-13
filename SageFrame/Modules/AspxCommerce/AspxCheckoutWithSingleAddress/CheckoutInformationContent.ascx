<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CheckoutInformationContent.ascx.cs"
    Inherits="Modules_AspxCheckoutInformationContent_CheckoutInformationContent" %>

<script type="text/javascript">
    //<![CDATA[
    var IsFShipping = '<%=IsFShipping %>';
    var myAccountURL = '<%=myAccountURL%>';
    var singleAddressCheckOutURL = '<%=SingleAddressCheckOutURL %>';
    var Discount = '<%=Discount %>';
    var CouponCode = '<%=CouponCode %>';
    var noImageCheckOutInfoPath = '<%=noImageCheckOutInfoPath %>';
    var AllowedShippingCountry = '<%=AllowededShippingCountry %>';
    var AllowedBillingCountry = '<%=AllowededBillingCountry %>';
    var couponDiscountAmount = '<%=CouponDiscountAmount %>';
    var isCouponInPercent = '<%=IsCouponInPercent %>';
    var couponPercentValue = '<%=CouponPercentValue %>';
    var couponAppliedCount = '<%=CouponAppliedCount %>';
    var CartUrl = '<%=ShoppingCartURL %>';
    var dimentionalUnit = '<%=DimentionalUnit %>';
    var weightunit = '<%=WeightUnit%>';
    var userIP = '<%=userIP %>';
    var showSubscription = '<%=ShowSubscription %>';
    var shippingDetailPage = '<%=ShippingDetailPage %>';
    var allowMultipleAddressBit = "<%=allowMultipleAddress %>";
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCheckoutWithSingleAddress
        });

    });

    function afterAsyncPostBack() {
        if ($('#rdbRegister').is(":checked")) {

            $('#dvLogin').show();
        }
    }

    Sys.Application.add_init(appl_init);

    function appl_init() {
        var pgRegMgr = Sys.WebForms.PageRequestManager.getInstance();
        pgRegMgr.add_endRequest(EndHandler);
    }
    function EndHandler() {
        afterAsyncPostBack();
    }
    //]]>
</script>

<div id="SingleCheckOut" class="cssClassCheckOutMethodLeft" style="display: none">
    <div class="cssClassAccordionWrapper">
        <div id="tabs">
            <ul>
                <li><a href="#checkout-1" class="sfLocale">1</a></li>
                <li><a href="#checkout-2" class="sfLocale">2</a></li>
                <li><a href="#checkout-3" class="sfLocale">3</a></li>
                <li><a href="#checkout-4" class="sfLocale">4</a></li>
                <li><a href="#checkout-5" class="sfLocale">5</a></li>
                <li><a href="#checkout-6" class="sfLocale">6</a></li>
            </ul>
            <div id="checkout-1">
                <div class="accordionHeading">
                    <h2>
                        <b class="sfLocale">Checkout Method</b></h2>
                </div>
                <div class="sfFormwrapper">
                    <div>
                        <div class="sfSignlecheckoutleft">
                            <p>
                                <span class="sfLocale">Checkout as a</span>&nbsp;<b class="sfLocale">Guest</b> or
                                <b class="sfLocale">Register</b>&nbsp;<span class="sfLocale">with us for future convenience:</span></p>
                            <p class="cssClassPadding">
                                <label>
                                    <input id="rdbGuest" type="radio" class="cssClassRadioBtn" name="guestOrRegister" />
                                    <label id="lblguest">
                                        <b class="sfLocale">Checkout as Guest</b></label>
                                </label>
                                <br />
                                <label>
                                    <input id="rdbRegister" type="radio" class="cssClassRadioBtn" name="guestOrRegister" />
                                    <label>
                                        <b class="sfLocale">Registered User</b></label>
                                </label>
                            </p>
                            <br />
                            <p>
                                <span class="cssClassRegisterlnk sfLocale">Register</span>&nbsp;<span class="sfLocale">with
                                    us for future convenience. Benefits of using your registered account</span><br />
                            </p>
                            <p class="cssClassSmallFont">
                                <span class="sfLocale">- Fast and easy checkout</span><br />
                                <span class="sfLocale">- Easy access and track to your order history and status</span><br />
                                <span class="sfLocale">- To Track your Digital Purchase</span>
                            </p>
                            <div class="sfButtonwrapper ">
                                <button id="btnCheckOutMethodContinue" type="button">
                                    <span><span class="sfLocale">Continue</span></span></button>
                            </div> 
                        </div>
                        <asp:UpdatePanel ID="udpLogin" runat="server">
                            <ContentTemplate>
                                <div class="cssClassclear">
                                </div>
                                <div id="dvLogin" class="cssClassCheckOutMethodRight" style="display: none;">
                                    <asp:MultiView ID="MultiView1" runat="server" ActiveViewIndex="0">
                                        <asp:View ID="View1" runat="server">
                                            <div class="cssClassloginbox">
                                                <div class="cssClassloginboxInside">
                                                    <div class="cssClassloginboxInsideDetails">
                                                        <div class="cssClassLoginLeftBox">
                                                            <div class="cssClassadminloginHeading">
                                                                <h1>
                                                                    <asp:Label ID="lblAdminLogin" runat="server" Text="Login" meta:resourcekey="lblAdminLoginResource1"></asp:Label>
                                                                </h1>
                                                            </div>
                                                            <div class="cssClassadminloginInfo">
                                                                <table border="0" cellpadding="0" width="100%" class="cssClassnormalborder">
                                                                    <tr>
                                                                        <td>
                                                                            <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName" CssClass="cssClassNormalText "
                                                                                meta:resourcekey="UserNameLabelResource1">User Name:</asp:Label>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="cssClassTextBox">
                                                                                <asp:TextBox ID="UserName" runat="server" meta:resourcekey="UserNameResource1"></asp:TextBox>
                                                                                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                                                                    ErrorMessage="User Name is required." ToolTip="User Name is required." ValidationGroup="Login1"
                                                                                    CssClass="cssClassusernotfound" meta:resourcekey="UserNameRequiredResource1">*</asp:RequiredFieldValidator>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="PasswordAspx" CssClass="cssClassNormalText"
                                                                                meta:resourcekey="PasswordLabelResource1">Password:</asp:Label>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="cssClassTextBox">
                                                                                <asp:TextBox ID="PasswordAspx" runat="server" TextMode="Password" meta:resourcekey="PasswordResource1"></asp:TextBox>
                                                                                <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="PasswordAspx"
                                                                                    ErrorMessage="Password is required." ToolTip="Password is required." ValidationGroup="Login1"
                                                                                    CssClass="cssClassusernotfound" meta:resourcekey="PasswordRequiredResource1">*</asp:RequiredFieldValidator>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table width="118" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td>
                                                                                        <asp:CheckBox ID="RememberMe" runat="server" CssClass="cssClassCheckBox" meta:resourcekey="RememberMeResource1" />
                                                                                    </td>
                                                                                    <td>
                                                                                        <asp:Label ID="lblrmnt" runat="server" Text="Remember me." CssClass="cssClassRemember"
                                                                                            meta:resourcekey="lblrmntResource1"></asp:Label>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colspan="2">
                                                                                        <span class="cssClassForgetPass">
                                                                                            <asp:HyperLink ID="hypForgotPassword" CssClass="sfLocale" Text="Forgot Password?"
                                                                                                meta:resourcekey="hypForgotPasswordResource1" runat="server"></asp:HyperLink>
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div class="sfButtonwrapper">
                                                                                            <span><span>
                                                                                                <asp:Button ID="LoginButton" runat="server" CommandName="Login" Text="Sign In" ValidationGroup="Login1"
                                                                                                    OnClick="LoginButton_Click" meta:resourcekey="LoginButtonResource1" />
                                                                                            </span></span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="cssClassusernotfound">
                                                                            <asp:Literal ID="FailureText" runat="server" EnableViewState="False" meta:resourcekey="FailureTextResource1"></asp:Literal>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div class="cssClassLoginRighttBox" runat="server" id="divSignUp">
                                                            <h2>
                                                                <span class="sfLocale">New here?</span>
                                                            </h2>
                                                            <p class="sfLocale">
                                                                <a href="/User-Registration${pageExtension}" runat="server" id="signup" class="sfLocale">
                                                                    Sign up</a> <span class="sfLocale">for a new account</span></p>
                                                            <div class="cssClassNewSIgnUp" style="display: none">
                                                                <span>»</span><a href="/User-Registration${pageExtension}" runat="server" id="signup1"
                                                                    class="sfLocale">Sign up</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </asp:View>
                                        <asp:View ID="View2" runat="server">
                                        </asp:View>
                                    </asp:MultiView>
                                </div>
                            </ContentTemplate>
                        </asp:UpdatePanel>
                    </div>
                </div>
            </div>
            <div id="checkout-2">
                <div class="accordionHeading">
                    <h2>
                        <b class="sfLocale">Billing Information</b></h2>
                </div>
                <div id="dvBilling" class="cssClassCheckoutInformationContent">
                    <div id="dvBillingInfo" class="cssClassCheckoutLeftBox">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblFirstName" runat="server" Text="First Name:" CssClass="cssClassLabel"
                                            meta:resourcekey="lblFirstNameResource1"></asp:Label>
                                        <span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtFirstName" name="FirstName" class="required" maxlength="40" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLastName" runat="server" Text="Last Name:" CssClass="cssClassLabel"
                                            meta:resourcekey="lblLastNameResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtLastName" name="LastName" class="required" maxlength="40" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblEmail" runat="server" Text="Email:" CssClass="cssClassLabel" meta:resourcekey="lblEmailResource1"></asp:Label><span
                                            class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtEmailAddress" name="Email" class="required email" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblCompany" Text="Company:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblCompanyResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtCompanyName" maxlength="40" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblAddress1" Text="Address 1:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblAddress1Resource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtAddress1" name="Address1" class="required" maxlength="250" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblAddress2" Text="Address 2:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblAddress2Resource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtAddress2" maxlength="250" name="Address2" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblCountry" Text="Country:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblCountryResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <asp:Literal runat="server" ID="ltBLCountry"></asp:Literal>
                                    </td>
                                    <td>
                                        <asp:Label ID="lblState" Text="State/Province:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblStateResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtState" name="stateprovince" class="required" maxlength="250" />
                                        <select id="ddlBLState" class="sfListmenu">
                                            <option></option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblZip" Text="Zip/Postal Code:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblZipResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtZip" name="biZip" class="required alphaNumberic" maxlength="10" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblCity" Text="City:" runat="server" CssClass="cssClassLabel" meta:resourcekey="lblCityResource1"></asp:Label><span
                                            class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtCity" name="City" class="required" maxlength="250" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblPhone" Text="Phone:" runat="server" CssClass="cssClassLabel" meta:resourcekey="lblPhoneResource1"></asp:Label><span
                                            class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtPhone" name="Phone" class="required number" maxlength="20" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblMobile" Text="Mobile:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblMobileResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtMobile" class="number" name="mobile" maxlength="20" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblFax" Text="Fax:" runat="server" CssClass="cssClassLabel" meta:resourcekey="lblFaxResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtFax" name="Fax" class="number" maxlength="20" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblWebsite" Text="Website:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblWebsiteResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtWebsite" class="url" maxlength="50" />
                                    </td>
                                </tr>
                                <tr id="trShippingAddress">
                                    <td>
                                        <input type="checkbox" id="chkShippingAddress" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblDefaultShipping" Text="Use as Default Shipping Address" runat="server"
                                            CssClass="cssClassLabel" meta:resourcekey="lblDefaultShippingResource1"></asp:Label>
                                    </td>
                                </tr>
                                <tr id="trBillingAddress">
                                    <td>
                                        <input type="checkbox" id="chkBillingAddress" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblDefaultBilling" Text="Use as Default Billing Address" runat="server"
                                            CssClass="cssClassLabel" meta:resourcekey="lblDefaultBillingResource1"></asp:Label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="hidden" id="hdnAddressID" />
                    </div>
                    <div id="dvBillingSelect">
                        <label class="sfLocale">
                            Billing Address :</label><span class="cssClassRequired">*</span>
                        <asp:Literal runat="server" ID="ltddlBilling"></asp:Literal>
                        <div class="sfButtonwrapper cssClassRightBtn">
                            <button id="addBillingAddress" type="button" value="Add Billing Address">
                                <span><span class="sfLocale">Add Billing Address</span></span></button>
                        </div>
                    </div>
                    <p class="cssClassCheckBox">
                        <label>
                            <input id="chkBillingAsShipping" type="checkbox" /><span class="sfLocale">Use Billing Address As Shipping Address</span>
                                </label>
                    </p>
                    <p class="cssClassCheckBox">
                        <label style="display: none;">
                            <input type="checkbox" id="chkNewLetter" /><span class="sfLocale">Join the Sales Promotions and more Mailing List</span>
                                </label>
                    </p>
                    <div class="sfButtonwrapper cssClassRightBtn">
                        <button id="btnBillingBack" type="button" value="" class="back">
                            <span><span class="sfLocale">Back</span></span></button>
                        <button id="btnBillingContinue" type="button" value="" class="next">
                            <span><span class="sfLocale">Continue</span></span></button>
                    </div>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div id="checkout-3">
                <div class="accordionHeading">
                    <h2>
                        <b class="sfLocale">Shipping Information</b></h2>
                </div>
                <div id="dvShipping" class="cssClassCheckoutInformationContent">
                    <div id="dvShippingInfo" class="cssClassCheckoutLeftBox">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSPFirstName" runat="server" Text="First Name" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPFirstNameResource1"></asp:Label>
                                        <span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input id="txtSPFirstName" name="spFName" type="text" class="required" maxlength="40" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblSPLastName" runat="server" Text="Last Name:" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPLastNameResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input id="txtSPLastName" name="spLName" type="text" class="required" maxlength="40" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSPEmail" runat="server" Text="Email:" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPEmailResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtSPEmailAddress" name="Email" class="required email" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblSPCompany" Text="Company:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPCompanyResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input id="txtSPCompany" type="text" maxlength="50" name="SPCompany" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSPAddress1" Text="Address 1:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPAddress1Resource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input id="txtSPAddress" name="spAddress1" type="text" class="required" maxlength="250" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblSPAddress2" Text="Address2:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPAddress2Resource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtSPAddress2" maxlength="250" name="SPAddress2" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSPCountry" Text="Country:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPCountryResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <asp:Literal runat="server" ID="ltSPCountry"></asp:Literal>
                                    </td>
                                    <td>
                                        <asp:Label ID="lblSPState" Text="State/Province:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPStateResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtSPState" name="spstateprovince" class="required" maxlength="250" />
                                        <select id="ddlSPState" class="sfListmenu">
                                            <option></option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSPZip" Text="Zip/Postal Code:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPZipResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input id="txtSPZip" name="spZip" type="text" class="required alphaNumberic" maxlength="10" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblSPCity" Text="City:" runat="server" CssClass="cssClassLabel" meta:resourcekey="lblSPCityResource1"></asp:Label><span
                                            class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtSPCity" name="City" class="required" maxlength="250" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblSPPhone" Text="Phone:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPPhoneResource1"></asp:Label><span class="cssClassRequired">*</span>
                                    </td>
                                    <td>
                                        <input id="txtSPPhone" name="spPhone" type="text" class="required number" maxlength="20" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblSPMobile" Text="Mobile:" runat="server" CssClass="cssClassLabel"
                                            meta:resourcekey="lblSPMobileResource1"></asp:Label>
                                    </td>
                                    <td>
                                        <input type="text" id="txtSPMobile" name="spmobile" class="number" maxlength="20" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="dvShippingSelect">
                        <label class="sfLocale">
                            Shipping Address :
                        </label>
                        <span class="cssClassRequired">*</span>
                        <asp:Literal runat="server" ID="ltddlShipping"></asp:Literal>
                        <div class="sfButtonwrapper cssClassRightBtn">
                            <button id="addShippingAddress" type="button">
                                <span><span class="sfLocale">Add Shipping Address</span></span></button>
                        </div>
                    </div>
                    <div class="cssClassClear">
                    </div>
                    <div class="sfButtonwrapper cssClassRightBtn">
                        <button id="btnShippingBack" type="button" value="" class="back">
                            <span><span class="sfLocale">Back</span></span></button>
                        <button id="btnShippingContinue" type="button" value="" class="continue">
                            <span><span class="sfLocale">Continue</span></span></button>
                    </div>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div id="checkout-4">
                <div class="accordionHeading">
                    <h2>
                        <b class="sfLocale">Shipping Method</b>
                    </h2>
                </div>
                <div id="dvPaymentsMethod" class="cssClassShippingMethodTab">
                    <div id="divShippingMethod" class="cssClassShippingMethodInfo cssClassCartInformation">
                    </div>
                    <div class="sfButtonwrapper cssClassRightBtn">
                        <button id="btnShippingMethodBack" type="button" value="" class="back">
                            <span><span class="sfLocale">Back</span></span></button>
                        <button id="btnShippingMethodContinue" type="button" value="" class="continue">
                            <span><span class="sfLocale">Continue</span></span></button>
                    </div>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div id="checkout-5">
                <%--      <div class="accordionHeading">
                <h2>
                    <span>4</span><b>Shipping Method </b></h2>
            </div>
            <div id="dvPaymentsMethod" class="sfButtonwrapper">
            <div id="divPaymentMethods">
                            
                        
                </div>
				<div id="divPaymentSubTypes" class="sfButtonwrapper"></div>
				 <div class="sfButtonwrapper cssClassRightBtn">
                
                 <button id="btnPaymentGatewayTypeBack"  type="button" value="back" class="back" ><span><span>Back</span></span></button>
                        <button id="btnPaymentGatewayTypeContinue"  type="button" value="continue" class="continue" ><span><span>Continue</span></span></button>
                    
                        </div>
				
                <div class="cssClassClear">
                </div>
            </div>--%>
                <div class="accordionHeading">
                    <h2>
                        <b class="sfLocale">Payment Information</b></h2>
                </div>
                <div id="dvPaymentInfo" class="cssClassPaymentMethods">
                    <div id="dvPGList">
                        <asp:Literal runat="server" ID="ltPgList"></asp:Literal>
                    </div>
                    <div id="dvPGListLogo">
                    </div>
                    <div class="sfButtonwrapper cssClassRightBtn">
                        <button id="btnPaymentInfoBack" type="button" value="" class="back">
                            <span><span class="sfLocale">Back</span></span></button>
                        <button id="btnPaymentInfoContinue" type="button" value="" class="continue">
                            <span><span class="sfLocale">Continue</span></span></button>
                    </div>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div id="checkout-6">
                <div class="accordionHeading">
                    <h2>
                        <b class="sfLocale">Order Review</b>
                    </h2>
                </div>
                <div id="dvPlaceOrder" class="cssClassOrderReview">
                    <div class="cssClassCartInformationDetails" id="divCartDetails">
                        <asp:Literal runat="server" ID="ltTblCart"></asp:Literal>
                    </div>
                    <table id="tblTotalInfo" width="100%" class="noborder">
                        <tbody>
                            <%--<tr class="cssClassSubTotalAmount">
                                <td colspan="2">
                                </td>
                            </tr>--%>
                            <tr class="cssClassSubTotalAmount">
                                <td>
                                    <strong class="sfLocale">Sub Total:</strong>
                                </td>
                                <td>
                                    <input type="text" class="total-box cssClassFormatCurrency sfLocale" value="$0" id="product-subtotal"
                                        readonly="readonly" />
                                </td>
                            </tr>
                            <tr class="cssClassSubTotalAmount cssClassMinus">
                                <td>
                                    <strong class="sfLocale">Total Discount:</strong>
                                </td>
                                <td>
                                    <span class="cssClassNegative">-</span>
                                    <input type="text" id="txtDiscountAmount" class="cssClassFormatCurrency sfLocale"
                                        readonly="readonly" value="0.00" />
                                </td>
                            </tr>
                           <%-- <tr class="cssClassSubTotalAmount">
                                <td>
                                    <div class="classDetailTaxRuleName sfLocale">
                                    </div>
                                </td>
                                <td>
                                    <div class="classDetailTaxRateValue sfLocale">
                                    </div>
                                </td>
                            </tr>--%>
                            <tr class="cssClassSubTotalAmount">
                                <td>
                                    <strong class="sfLocale">Total Tax:</strong>
                                </td>
                                <td>
                                    <input type="text" class="tax-box cssClassFormatCurrency sfLocale" id="txtTax" readonly="readonly"
                                        value="0.00" />
                                </td>
                            </tr>
                            <tr class="cssClassSubTotalAmount">
                                <td>
                                    <strong class="sfLocale">Shipping Cost:</strong>
                                </td>
                                <td>
                                    <input type="text" class="cssClassFormatCurrency sfLocale" id="txtShippingTotal"
                                        readonly="readonly" value="0.00" />
                                </td>
                            </tr>
                            <tr id="trDiscountReward" class="cssClassMinus cssClassSubTotalAmount" style="display: none;">
                                <td>
                                    <input type="hidden" id="hdnRewardRate" value="0" />
                                    <input type="hidden" id="hdnRate" value="0" />
                                    <input type="hidden" id="hdnPointsTotal" value="0" />
                                    <strong class="sfLocale">Discount (Reward Points):</strong>
                                </td>
                                <td>
                                    <span class="cssClassNegative">-</span>
                                    <input type="text" id="txtRewardAmount" class="cssClassFormatCurrency sfLocale" readonly="readonly"
                                        value="0.00" />
                                </td>
                            </tr>
                            <tr class="cssClassSubTotalAmount cssClassMinus">
                                <td>
                                    <strong class="sfLocale">Coupon Discount:</strong>
                                </td>
                                <td>
                                    <span class="cssClassNegative">-</span>
                                    <input type="text" id="txtCouponDiscountAmountValue" class="cssClassFormatCurrency sfLocale"
                                        readonly="readonly" value="0.00" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="cssClassCartInformation">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="noborder">
                            <tbody>
                                <tr class="cssClassHeadeTitle sfEven">
                                    <td class="cssClassSubTotalAmountWidth">
                                        <strong class="sfLocale">Grand Total:</strong>
                                    </td>
                                    <td class="cssClassGrandTotalAmountWidth">
                                        <input type="text" readonly="readonly" id="txtTotalCost" class="cssClassFormatCurrency sfLocale"
                                            value="0" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="noborder">
                            <tr>
                                <td>
                                    <strong class="sfLocale">Additional Note:</strong>
                                </td>
                                <td>
                                    <textarea id="txtAdditionalNote" class="cssClassTextarea" rows="3" cols="90"></textarea>
                                </td>
                            </tr>
                            <%--<tr id="trTOC">
                                <td colspan="2">
                                    <input type="checkbox" value="1" name="accept_terms" id="id_accept_terms">
                                    <label for="id_accept_terms">
                                       <span class="sfLocale">I accept the</span><a href="javascript:void(0);" target="_blank" id="onestepcheckout-toc-link">
                                            <span class="sfLocale">Terms and Conditions</span></a></label>
                                </td>
                            </tr>--%>
                        </table>
                    </div>
                    <div class="sfButtonwrapper ">
                        <button id="btnPlaceBack" type="button" value="back" class="back">
                            <span><span class="sfLocale">Back</span></span></button>
                        <%--<button id="btnPlaceOrder" type="submit" class ="submit" ><span><span>Place Order</span></span></button>--%>
                    </div>
                    <div>
                        <asp:Literal runat="server" ID="ltRewardPoint"></asp:Literal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="cssClassRightAccordainMenu">
    <div class="cssClassRightAccordainTab">
        <div class="cssClassRightAccordainMenuInfo">
            <h2>
               <span class="sfLocale">Billing Address</span><span id="divBillingBtn" class="sfBtnChange"></span></h2>
            <div id="dvCPBilling">
            </div>
        </div>
        <div class="cssClassRightAccordainMenuInfo">
            <h2>
               <span class="sfLocale">Shipping Address</span><span id="divShippingAddressBtn" class="sfBtnChange"></span></h2>
            <div id="dvCPShipping">
            </div>
        </div>
        <div class="cssClassRightAccordainMenuInfo">
            <h2>
                <span class="sfLocale">Shipping Method</span><span id="divShippingMethodBtn" class="sfBtnChange"></span></h2>
            <div id="dvCPShippingMethod">
            </div>
        </div>
        <div class="cssClassRightAccordainMenuInfoSelected">
            <h2>
               <span class="sfLocale">Payment Method</span><span id="divPaymentBtn" class="sfBtnChange"></span></h2>
            <div id="dvCPPaymentMethod">
            </div>
        </div>
        <%--<div class="cssClassRightAccordainMenuInfoSelected">
            <h2>
                Payment Gateway Type</h2>
        </div>
        <div id="dvPaymentGatewayTypeMethod">
        </div>--%>
    </div>
</div>
<div class="popupbox" id="popuprel">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <h2>
        <asp:Label ID="lblAddressTitle" runat="server" Text="Address Details" meta:resourcekey="lblAddressTitleResource1"></asp:Label>
    </h2>
    <div class="sfFormwrapper">
        <div class="sfButtonwrapper">
            <button type="button" id="btnSubmitAddress" class="cssClassButtonSubmit">
                <span><span class="sfLocale">Save</span></span></button>
        </div>
    </div>
</div>
<select style="display: none;" id="hdnCountryList">
    <option value="AF">Afghanistan</option>
    <option value="AL">Albania</option>
    <option value="DZ">Algeria</option>
    <option value="AS">American Samoa</option>
    <option value="AD">Andorra</option>
    <option value="AO">Angola</option>
    <option value="AI">Anguilla</option>
    <option value="AQ">Antarctica</option>
    <option value="AG">Antigua and Barbuda</option>
    <option value="AR">Argentina</option>
    <option value="AM">Armenia</option>
    <option value="AW">Aruba</option>
    <option value="AU">Australia</option>
    <option value="AT">Austria</option>
    <option value="AZ">Azerbaijan</option>
    <option value="BS">Bahamas</option>
    <option value="BH">Bahrain</option>
    <option value="BD">Bangladesh</option>
    <option value="BB">Barbados</option>
    <option value="BY">Belarus</option>
    <option value="BE">Belgium</option>
    <option value="BZ">Belize</option>
    <option value="BJ">Benin</option>
    <option value="BM">Bermuda</option>
    <option value="BT">Bhutan</option>
    <option value="BO">Bolivia</option>
    <option value="BA">Bosnia and Herzegovina</option>
    <option value="BW">Botswana</option>
    <option value="BV">Bouvet Island</option>
    <option value="BR">Brazil</option>
    <option value="IO">British Indian Ocean Territory</option>
    <option value="VG">British Virgin Islands</option>
    <option value="BN">Brunei Darussalam</option>
    <option value="BG">Bulgaria</option>
    <option value="BF">Burkina Faso</option>
    <option value="BI">Burundi</option>
    <option value="KH">Cambodia</option>
    <option value="CM">Cameroon</option>
    <option value="CA">Canada</option>
    <option value="CV">Cape Verde</option>
    <option value="KY">Cayman Islands</option>
    <option value="CF">Central African Republic</option>
    <option value="TD">Chad</option>
    <option value="CL">Chile</option>
    <option value="CN">China</option>
    <option value="CX">Christmas Island</option>
    <option value="CC">Cocos</option>
    <option value="CO">Colombia</option>
    <option value="KM">Comoros</option>
    <option value="CG">Congo</option>
    <option value="CK">Cook Islands</option>
    <option value="CR">Costa Rica</option>
    <option value="Country">Country</option>
    <option value="HR">Croatia</option>
    <option value="CU">Cuba</option>
    <option value="CY">Cyprus</option>
    <option value="CZ">Czech Republic</option>
    <option value="DK">Denmark</option>
    <option value="DJ">Djibouti</option>
    <option value="DM">Dominica</option>
    <option value="DO">Dominican Republic</option>
    <option value="TP">East Timor</option>
    <option value="EC">Ecuador</option>
    <option value="EG">Egypt</option>
    <option value="SV">El Salvador</option>
    <option value="GQ">Equatorial Guinea</option>
    <option value="ER">Eritrea</option>
    <option value="EE">Estonia</option>
    <option value="ET">Ethiopia</option>
    <option value="FK">Falkland Islands</option>
    <option value="FO">Faroe Islands</option>
    <option value="FJ">Fiji</option>
    <option value="FI">Finland</option>
    <option value="FR">France</option>
    <option value="GF">French Guiana</option>
    <option value="PF">French Polynesia</option>
    <option value="TF">French Southern Territories</option>
    <option value="GA">Gabon</option>
    <option value="GM">Gambia</option>
    <option value="GE">Georgia</option>
    <option value="DE">Germany</option>
    <option value="GH">Ghana</option>
    <option value="GI">Gibraltar</option>
    <option value="GR">Greece</option>
    <option value="GL">Greenland</option>
    <option value="GD">Grenada</option>
    <option value="GP">Guadeloupe</option>
    <option value="GU">Guam</option>
    <option value="GT">Guatemala</option>
    <option value="GN">Guinea</option>
    <option value="GW">Guinea-Bissau</option>
    <option value="GY">Guyana</option>
    <option value="HT">Haiti</option>
    <option value="HM">Heard and McDonald Islands</option>
    <option value="HN">Honduras</option>
    <option value="HK">Hong Kong</option>
    <option value="HU">Hungary</option>
    <option value="IS">Iceland</option>
    <option value="IN">India</option>
    <option value="ID">Indonesia</option>
    <option value="IR">Iran</option>
    <option value="IQ">Iraq</option>
    <option value="IE">Ireland</option>
    <option value="IL">Israel</option>
    <option value="IT">Italy</option>
    <option value="CI">Ivory Coast</option>
    <option value="JM">Jamaica</option>
    <option value="JP">Japan</option>
    <option value="JO">Jordan</option>
    <option value="KZ">Kazakhstan</option>
    <option value="KE">Kenya</option>
    <option value="KI">Kiribati</option>
    <option value="KW">Kuwait</option>
    <option value="KG">Kyrgyzstan</option>
    <option value="LA">Laos</option>
    <option value="LV">Latvia</option>
    <option value="LB">Lebanon</option>
    <option value="LS">Lesotho</option>
    <option value="LR">Liberia</option>
    <option value="LY">Libya</option>
    <option value="LI">Liechtenstein</option>
    <option value="LT">Lithuania</option>
    <option value="LU">Luxembourg</option>
    <option value="MO">Macau</option>
    <option value="MK">Macedonia</option>
    <option value="MG">Madagascar</option>
    <option value="MW">Malawi</option>
    <option value="MY">Malaysia</option>
    <option value="MV">Maldives</option>
    <option value="ML">Mali</option>
    <option value="MT">Malta</option>
    <option value="MH">Marshall Islands</option>
    <option value="MQ">Martinique</option>
    <option value="MR">Mauritania</option>
    <option value="MU">Mauritius</option>
    <option value="YT">Mayotte</option>
    <option value="MX">Mexico</option>
    <option value="FM">Micronesia</option>
    <option value="MD">Moldova</option>
    <option value="MC">Monaco</option>
    <option value="MN">Mongolia</option>
    <option value="MS">Montserrat</option>
    <option value="MA">Morocco</option>
    <option value="MZ">Mozambique</option>
    <option value="MM">Myanmar</option>
    <option value="NA">Namibia</option>
    <option value="NR">Nauru</option>
    <option value="NP">Nepal</option>
    <option value="NL">Netherlands</option>
    <option value="AN">Netherlands Antilles</option>
    <option value="NC">New Caledonia</option>
    <option value="NZ">New Zealand</option>
    <option value="NI">Nicaragua</option>
    <option value="NE">Niger</option>
    <option value="NG">Nigeria</option>
    <option value="NU">Niue</option>
    <option value="NF">Norfolk Island</option>
    <option value="KP">North Korea</option>
    <option value="MP">Northern Mariana Islands</option>
    <option value="NO">Norway</option>
    <option value="OM">Oman</option>
    <option value="PK">Pakistan</option>
    <option value="PW">Palau</option>
    <option value="PA">Panama</option>
    <option value="PG">Papua New Guinea</option>
    <option value="PY">Paraguay</option>
    <option value="PE">Peru</option>
    <option value="PH">Philippines</option>
    <option value="PN">Pitcairn</option>
    <option value="PL">Poland</option>
    <option value="PT">Portugal</option>
    <option value="PR">Puerto Rico</option>
    <option value="QA">Qatar</option>
    <option value="RE">Reunion</option>
    <option value="RO">Romania</option>
    <option value="RU">Russian Federation</option>
    <option value="RW">Rwanda</option>
    <option value="GS">S. Georgia and S. Sandwich Islands</option>
    <option value="KN">Saint Kitts and Nevis</option>
    <option value="LC">Saint Lucia</option>
    <option value="VC">Saint Vincent and The Grenadines</option>
    <option value="WS">Samoa</option>
    <option value="SM">San Marino</option>
    <option value="ST">Sao Tome and Principe</option>
    <option value="SA">Saudi Arabia</option>
    <option value="SN">Senegal</option>
    <option value="SC">Seychelles</option>
    <option value="SL">Sierra Leone</option>
    <option value="SG">Singapore</option>
    <option value="SK">Slovakia</option>
    <option value="SI">Slovenia</option>
    <option value="SB">Solomon Islands</option>
    <option value="SO">Somalia</option>
    <option value="ZA">South Africa</option>
    <option value="KR">South Korea</option>
    <option value="SU">Soviet Union</option>
    <option value="ES">Spain</option>
    <option value="LK">Sri Lanka</option>
    <option value="SH">St. Helena</option>
    <option value="PM">St. Pierre and Miquelon</option>
    <option value="SD">Sudan</option>
    <option value="SR">Suriname</option>
    <option value="SJ">Svalbard and Jan Mayen Islands</option>
    <option value="SZ">Swaziland</option>
    <option value="SE">Sweden</option>
    <option value="CH">Switzerland</option>
    <option value="SY">Syria</option>
    <option value="TW">Taiwan</option>
    <option value="TJ">Tajikistan</option>
    <option value="TZ">Tanzania</option>
    <option value="TH">Thailand</option>
    <option value="TG">Togo</option>
    <option value="TK">Tokelau</option>
    <option value="TO">Tonga</option>
    <option value="TT">Trinidad and Tobago</option>
    <option value="TN">Tunisia</option>
    <option value="TR">Turkey</option>
    <option value="TM">Turkmenistan</option>
    <option value="TC">Turks and Caicos Islands</option>
    <option value="TV">Tuvalu</option>
    <option value="UG">Uganda</option>
    <option value="UA">Ukraine</option>
    <option value="AE">United Arab Emirates</option>
    <option value="UK">United Kingdom</option>
    <option value="US">United States</option>
    <option value="UY">Uruguay</option>
    <option value="UM">US Minor Outlying Islands</option>
    <option value="VI">US Virgin Islands</option>
    <option value="UZ">Uzbekistan</option>
    <option value="VU">Vanuatu</option>
    <option value="VE">Venezuela</option>
    <option value="VN">Viet Nam</option>
    <option value="WF">Wallis and Futuna Islands</option>
    <option value="EH">Western Sahara</option>
    <option value="YE">Yemen</option>
    <option value="YU">Yugoslavia</option>
    <option value="ZR">Zaire</option>
    <option value="ZM">Zambia</option>
</select>
