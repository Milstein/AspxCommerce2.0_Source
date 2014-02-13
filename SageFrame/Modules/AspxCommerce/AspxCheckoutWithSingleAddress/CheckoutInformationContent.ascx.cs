/*
AspxCommerce® - http://www.AspxCommerce.com
Copyright (c) 20011-2012 by AspxCommerce
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.RewardPoints;
using SageFrame.Framework;
using SageFrame.Web;
using System.Collections;
using System.Web.Script.Serialization;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Security.Helpers;
using System.Web.Security;
using System.IO;
using SageFrame.RolesManagement;
using SageFrame.Web.Utilities;
using SageFrame.Security.Crypto;
using SageFrame.Shared;
using AspxCommerce.Core;
using SageFrame.Core;
using SageFrame.Common;



public partial class Modules_AspxCheckoutInformationContent_CheckoutInformationContent : BaseAdministrationUserControl
{
    public int storeID, portalID, customerID;
    public string userName;
    public string cultureName;
    public string sessionCode = string.Empty;
    string strRoles = string.Empty;
    public bool RegisterURL = true;
    public bool IsFShipping = false;
    public decimal Discount = 0;
    public string CouponCode = string.Empty;
    public string userIP = string.Empty;
    public string ShippingDetailPage, ShowSubscription, noImageCheckOutInfoPath, myAccountURL, SingleAddressCheckOutURL, DimentionalUnit, WeightUnit, ShoppingCartURL = string.Empty;
    public bool IsUseFriendlyUrls = true;
    public string AllowededShippingCountry = string.Empty;
    public string AllowededBillingCountry = string.Empty;
    public decimal CouponDiscountAmount = 0;
    public decimal CouponPercentValue = 0;
    public int IsCouponInPercent = 0;
    public int CouponAppliedCount = 0;
    public decimal rate = 1;
    public string allowMultipleAddress = string.Empty;
    SageFrameConfig pagebase = new SageFrameConfig();
    StoreSettingConfig ssc = new StoreSettingConfig();
    AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    private int CountDownloadableItem = 0, CountAllItem = 0;

    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            InitializeJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }



    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            storeID = GetStoreID;
            portalID = GetPortalID;
            userName = GetUsername;
            customerID = GetCustomerID;
            cultureName = GetCurrentCultureName;
            StoreSettingConfig ssc = new StoreSettingConfig();
            decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, storeID, portalID, cultureName));
            string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, storeID, portalID, cultureName);
            if (HttpContext.Current.Session["CurrencyRate"] != null)
            {
                if (Session["CurrencyCode"].ToString() != MainCurrency)
                {
                    decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                    rate = Math.Round(rate1 + (rate1 * additionalCCVR / 100), 4);
                }
                else
                {
                    rate = decimal.Parse(Session["CurrencyRate"].ToString());
                }
            }
            IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);

            if (HttpContext.Current.Session.SessionID != null)
            {
                sessionCode = HttpContext.Current.Session.SessionID.ToString();
            }

            if (Session["IsFreeShipping"] != null)
            {
                IsFShipping = bool.Parse(Session["IsFreeShipping"].ToString());

            }
            if (Session["DiscountAmount"] != null)
            {
                Discount = decimal.Parse(Session["DiscountAmount"].ToString());

            }
            if (Session["CouponApplied"] != null)
            {
                CouponAppliedCount = int.Parse(Session["CouponApplied"].ToString());
            }
            IsCouponInPercent = Convert.ToInt16(Session["IsCouponInPercent"]);
            if (IsCouponInPercent == 1)
            {
                if (Session["CouponPercentValue"] != null)
                {
                    CouponPercentValue = decimal.Parse(Session["CouponPercentValue"].ToString());
                }
                if (Session["CouponSessionPercentAmount"] != null)
                {
                    CouponDiscountAmount = decimal.Parse(Session["CouponSessionPercentAmount"].ToString());
                }
            }
            else
            {
                if (Session["CouponSessionAmount"] != null)
                {
                    CouponDiscountAmount = decimal.Parse(Session["CouponSessionAmount"].ToString());
                }
            }

            if (Session["CouponCode"] != null)
            {
                CouponCode = Session["CouponCode"].ToString();

            }

            if (!IsPostBack)
            {
                IncludeCss("CheckOutInformationContent", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery.ui.all.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("CheckOutInformationContent", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/FormValidation/jquery.validate.js", "/js/jquery.cookie.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/Modules/AspxCommerce/AspxCheckoutWithSingleAddress/js/SingleCheckOut.js", "/js/jquery.tipsy.js");
                userIP = HttpContext.Current.Request.UserHostAddress;
                if (HttpContext.Current.Session.SessionID != null)
                {
                    sessionCode = HttpContext.Current.Session.SessionID.ToString();
                }
                aspxCommonObj.SessionCode = sessionCode;
                aspxCommonObj.StoreID = storeID;
                aspxCommonObj.PortalID = portalID;
                aspxCommonObj.UserName = userName;
                aspxCommonObj.CultureName = cultureName;
                aspxCommonObj.CustomerID = customerID;
                noImageCheckOutInfoPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, storeID, portalID, cultureName);
                ShoppingCartURL = ssc.GetStoreSettingsByKey(StoreSetting.ShoppingCartURL, storeID, portalID, cultureName);
                myAccountURL = ssc.GetStoreSettingsByKey(StoreSetting.MyAccountURL, storeID, portalID, cultureName);
                AllowededShippingCountry = ssc.GetStoreSettingsByKey(StoreSetting.AllowedShippingCountry, storeID, portalID, cultureName);
                AllowededBillingCountry = ssc.GetStoreSettingsByKey(StoreSetting.AllowedBillingCountry, storeID, portalID, cultureName);
                SingleAddressCheckOutURL = ssc.GetStoreSettingsByKey(StoreSetting.SingleCheckOutURL, storeID, portalID, cultureName);
                DimentionalUnit = ssc.GetStoreSettingsByKey(StoreSetting.DimensionUnit, GetStoreID, GetPortalID,
                                                           GetCurrentCultureName);
                WeightUnit = ssc.GetStoreSettingsByKey(StoreSetting.WeightUnit, GetStoreID, GetPortalID,
                                                       GetCurrentCultureName);
                ShowSubscription = ssc.GetStoreSettingsByKey(StoreSetting.AskCustomerToSubscribe, GetStoreID, GetPortalID,
                                                   GetCurrentCultureName);

                ShippingDetailPage = ssc.GetStoreSettingsByKey(StoreSetting.ShipDetailPageURL, GetStoreID, GetPortalID,
                                                   GetCurrentCultureName);
                allowMultipleAddress = ssc.GetStoreSettingsByKey(StoreSetting.AllowUsersToCreateMultipleAddress, storeID, portalID, cultureName);
                HideSignUp();
                PasswordAspx.Attributes.Add("onkeypress", "return clickButton(event,'" + LoginButton.ClientID + "')");
                // hypForgotPassword.Text = "Forgot Password?";

                if (GetPortalID > 1)
                {
                    hypForgotPassword.NavigateUrl =
                        ResolveUrl("~/portal/" + GetPortalSEOName + "/sf/" +
                                   pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalForgotPassword) + SageFrameSettingKeys.PageExtension);
                }
                else
                {
                    hypForgotPassword.NavigateUrl =
                        ResolveUrl("~/sf/" + pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalForgotPassword) +
                                  SageFrameSettingKeys.PageExtension);
                }
                string registerUrl =
                    ResolveUrl("~/sf/" + pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalUserRegistration) +
                               SageFrameSettingKeys.PageExtension);
                signup.Attributes.Add("href", ResolveUrl("~/sf/sfRegister" + SageFrameSettingKeys.PageExtension));
                signup1.Attributes.Add("href", ResolveUrl("~/sf/sfRegister" + SageFrameSettingKeys.PageExtension));

                if (pagebase.GetSettingBollByKey(SageFrameSettingKeys.RememberCheckbox))
                {
                    RememberMe.Visible = true;
                    lblrmnt.Visible = true;
                }
                else
                {
                    RememberMe.Visible = false;
                    lblrmnt.Visible = false;
                }
                LoadCartDetails();
                LoadCountry();
                LoadAddress();
                LoadPaymentGateway();
                LoadRewardPoints();
            }

            if (HttpContext.Current.User != null)
            {
                FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
                if (ticket != null && ticket.Name != ApplicationKeys.anonymousUser)
                {
                    int LoggedInPortalID = int.Parse(ticket.UserData.ToString());
                    string[] sysRoles = SystemSetting.SUPER_ROLE;
                    MembershipController member = new MembershipController();
                    UserInfo userDetail = member.GetUserDetails(GetPortalID, GetUsername);
                    if (GetPortalID == LoggedInPortalID || Roles.IsUserInRole(userDetail.UserName, sysRoles[0]))
                    {
                        RoleController _role = new RoleController();
                        string userinroles = _role.GetRoleNames(GetUsername, LoggedInPortalID);
                        if (userinroles != "" || userinroles != null)
                        {
                            MultiView1.ActiveViewIndex = 1;
                        }
                        else
                        {
                            MultiView1.ActiveViewIndex = 0;
                        }
                    }
                    else
                    {
                        MultiView1.ActiveViewIndex = 0;
                    }
                }
                else
                {
                    MultiView1.ActiveViewIndex = 0;
                }
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
    }
    private void LoadAddress()
    {
        StringBuilder addressBuilder = new StringBuilder();
        addressBuilder.Append("<select id=\"ddlBilling\" >");
        StringBuilder addressBuilderShip = new StringBuilder();
        addressBuilderShip.Append("<select id=\"ddlShipping\" >");
        StringBuilder addressScript = new StringBuilder();
        List<AddressInfo> lstAddress = AspxUserDashController.GetUserAddressDetails(aspxCommonObj);
        addressBuilder.Append("");
        string tempAddress = "";
        tempAddress += "[";
        if (lstAddress.Count > 0)
        {
            // tempUserAddresses = []
            foreach (AddressInfo item in lstAddress)
            {
                string add = "{" +
                             string.Format(
                                 "\'Address1\':'{0}',\'Address2\':'{1}',\'AddressID\':'{2}',\'City\':'{3}',\'Company\':'{4}',\'Country\':'{5}',{6}\'DefaultBilling\':'{7}',\'DefaultShipping\':'{8}',\'Email\':'{9}',\'Fax\':'{10}',\'FirstName\':'{11}',\'LastName\':'{12}',\'Mobile\':'{13}',\'Phone\':'{14}',\'State\':'{15}',\'Website\':'{16}',\'Zip\':'{17}'",
                                 item.Address1, item.Address2,
                                 item.AddressID, item.City, item.Company, item.Country, "",
                                 item.DefaultBilling.ToString().ToLower(),
                                 item.DefaultShipping.ToString().ToLower(), item.Email, item.Fax, item.FirstName,
                                 item.LastName,
                                 item.Mobile, item.Phone, item.State, item.Website, item.Zip)
                             + "},";
                tempAddress += add;
                // tempUserAddresses.push(item);
                if (item.DefaultBilling != null && bool.Parse(item.DefaultBilling.ToString()))
                {
                    addressBuilder.Append("<option value=\"" + item.AddressID +
                                          "\" selected=\"selected\" class=\"cssBillingShipping\">");
                }
                else
                {
                    addressBuilder.Append("<option value=\"" + item.AddressID +
                                          "\"  class=\"cssBillingShipping\">");
                }
                addressBuilder.Append(item.FirstName.Replace(",", "-") + " " + item.LastName.Replace(",", "-"));

                if (item.Address1 != "")
                    addressBuilder.Append(", " + item.Address1.Replace(",", "-"));

                if (item.City != "")
                    addressBuilder.Append(", " + item.City.Replace(",", "-"));

                if (item.State != "")
                    addressBuilder.Append(", " + item.State.Replace(",", "-"));

                if (item.Country != "")
                    addressBuilder.Append(", " + item.Country.Replace(",", "-"));

                if (item.Zip != "")
                    addressBuilder.Append(", " + item.Zip.Replace(",", "-"));

                if (item.Email != "")
                    addressBuilder.Append(", " + item.Email.Replace(",", "-"));

                if (item.Phone != "")
                    addressBuilder.Append(", " + item.Phone.Replace(",", "-"));

                if (item.Mobile != "")
                    addressBuilder.Append(", " + item.Mobile.Replace(",", "-"));

                if (item.Fax != "")
                    addressBuilder.Append(", " + item.Fax.Replace(",", "-"));

                if (item.Website != "")
                    addressBuilder.Append(", " + item.Website.Replace(",", "-"));

                if (item.Address2 != "")
                    addressBuilder.Append(", " + item.Address2.Replace(",", "-"));

                if (item.Company != "")
                    addressBuilder.Append(", " + item.Company.Replace(",", "-"));
                addressBuilder.Append("</option>");

                if (item.DefaultShipping != null && bool.Parse(item.DefaultShipping.ToString()))
                {
                    addressBuilderShip.Append("<option value=\"" + item.AddressID +
                                              "\" selected=\"selected\" class=\"cssBillingShipping\">");
                }
                else
                {
                    addressBuilderShip.Append("<option value=\"" + item.AddressID +
                                              "\" class=\"cssBillingShipping\">");

                }
                addressBuilderShip.Append(item.FirstName.Replace(",", "-") + " " + item.LastName.Replace(",", "-"));

                if (item.Address1 != "")
                    addressBuilderShip.Append(", " + item.Address1.Replace(",", "-"));

                if (item.City != "")
                    addressBuilderShip.Append(", " + item.City.Replace(",", "-"));

                if (item.State != "")
                    addressBuilderShip.Append(", " + item.State.Replace(",", "-"));

                if (item.Country != "")
                    addressBuilderShip.Append(", " + item.Country.Replace(",", "-"));

                if (item.Zip != "")
                    addressBuilderShip.Append(", " + item.Zip.Replace(",", "-"));

                if (item.Email != "")
                    addressBuilderShip.Append(", " + item.Email.Replace(",", "-"));

                if (item.Phone != "")
                    addressBuilderShip.Append(", " + item.Phone.Replace(",", "-"));

                if (item.Mobile != "")
                    addressBuilderShip.Append(", " + item.Mobile.Replace(",", "-"));

                if (item.Fax != "")
                    addressBuilderShip.Append(", " + item.Fax.Replace(",", "-"));

                if (item.Website != "")
                    addressBuilderShip.Append(", " + item.Website.Replace(",", "-"));

                if (item.Address2 != "")
                    addressBuilderShip.Append(", " + item.Address2.Replace(",", "-"));

                if (item.Company != "")
                    addressBuilderShip.Append(", " + item.Company.Replace(",", "-"));
                addressBuilderShip.Append("</option>");

            }
            // string tempAddress=JSONHelper.Serialize(lstAddress);
            addressBuilderShip.Append("</select>");
            addressBuilder.Append("</select>");
            tempAddress = tempAddress.Substring(0, tempAddress.Length - 1);
            tempAddress += "]";
            string script = string.Empty;
            if (CountDownloadableItem == CountAllItem)
            {

                script = GetStringScript(


                   addressScript.Append("CheckOut.SetTempAddr(eval(\"" + tempAddress +
                                        "\"));$('#dvBilling .cssClassCheckBox').hide();$('#dvCPShipping').parent('div').hide();$('#dvCPShippingMethod').parent('div').hide();$('#addBillingAddress').show(); $('#addShippingAddress').show();")
                       .ToString());
            }
            else
            {

                script = GetStringScript(


                   addressScript.Append("CheckOut.SetTempAddr(eval(\"" + tempAddress +
                                        "\"));$('#dvBilling .cssClassCheckBox').show(); $('#dvCPShipping').parent('div').show();$('#dvCPShippingMethod').parent('div').show();$('#addBillingAddress').show(); $('#addShippingAddress').show();")
                       .ToString());
            }

            addressBuilder.Append(script);
            ltddlBilling.Text = addressBuilder.ToString();
            ltddlShipping.Text = addressBuilderShip.ToString();


        }
        else
        {
            addressBuilderShip.Append("</select>");
            addressBuilder.Append("</select>");
            ltddlBilling.Text = addressBuilder.ToString();
            ltddlShipping.Text = addressBuilderShip.ToString();
        }
    }

    private void LoadCountry()
    {

        StringBuilder blCountry = new StringBuilder();
        StringBuilder spCountry = new StringBuilder();
        StringBuilder optionCountry = new StringBuilder();
        List<CountryInfo> lstCountry = AspxCommonController.BindCountryList();
        blCountry.Append("<select id=\"ddlBLCountry\">");
        spCountry.Append("<select id=\"ddlSPCountry\">");
        foreach (var countryInfo in lstCountry)
        {
            optionCountry.Append("<option class=\"cssBillingShipping\" value=\"" + countryInfo.Value + "\"> " +
                                 countryInfo.Text + "</option>");

        }
        blCountry.Append(optionCountry);
        spCountry.Append(optionCountry);
        blCountry.Append("</select>");
        spCountry.Append("</select>");

        ltSPCountry.Text = spCountry.ToString();
        ltBLCountry.Text = blCountry.ToString();
    }

    private void LoadCartDetails()
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");


        StringBuilder cartDetails = new StringBuilder();
        StringBuilder scriptBuilder = new StringBuilder();

        List<CartInfo> lstCart = AspxCartController.GetCartCheckOutDetails(aspxCommonObj);

        cartDetails.Append(
            "<table class=\"sfGridWrapperTable\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" id=\"tblCartList\">");
        cartDetails.Append(
            "<tbody><tr class=\"cssClassHeadeTitle\">");
        cartDetails.Append(
            "<td class=\"cssClassSN\"> Sn.");
        cartDetails.Append(" </td><td class=\"cssClassProductImageWidth\">");
        cartDetails.Append(
            getLocale("Item Image"));
        cartDetails.Append(
            "</td>");
        cartDetails.Append(
            "<td>");
        cartDetails.Append(
            getLocale("Variants"));
        cartDetails.Append("</td>");
        cartDetails.Append("<td class=\"cssClassQTY\">");
        cartDetails.Append(
            getLocale("Qty"));
        cartDetails.Append("</td>");
        cartDetails.Append("<td class=\"cssClassProductPrice\">");
        cartDetails.Append(
            getLocale("Unit Price"));
        cartDetails.Append(
            "</td>");
        cartDetails.Append("<td class=\"cssClassSubTotal\">");
        cartDetails.Append(getLocale("Line Total"));
        cartDetails.Append("</td>");
        cartDetails.Append("<td class=\"cssClassTaxRate\">");

        cartDetails.Append(getLocale("Unit Tax"));
        cartDetails.Append("</td>");
        cartDetails.Append("</tr>");

        //   CheckOut.Vars.ItemIDs = "";
        //   $("#divCartDetails").html(cartHeading);
        int giftcardCount = 0;
        int index = 0;
        string itemids = "";
        bool IsDownloadItemInCart = false, ShowShippingAdd = false;
        int CartID = 0;//int CountDownloadableItem = 0, CountAllItem = 0, 
        string bsketItems = "";
        bsketItems += "[";
        foreach (CartInfo item in lstCart)
        {
            //for realtime shipping rate calculation
            if (item.ItemTypeID == 1)
            {
                string bitems = "{" +
                             string.Format(
                                 "\'Height\':'{0}',\'ItemName\':'{1}',\'Length\':'{2}',\'Quantity\':'{3}',\'WeightValue\':'{4}',\'Width\':'{5}'",
                                 item.Height ?? 0, item.ItemName,
                                 item.Length ?? 0, item.Quantity.ToString(), decimal.Parse(item.Weight.ToString()), item.Width ?? 0
                                 )

                             + "},";
                bsketItems += bitems;

            }


            itemids += item.ItemID + "#" + item.CostVariantsValueIDs + ",";

            index++;
            string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
            if (item.ImagePath == "")
            {
                imagePath = noImageCheckOutInfoPath;
            }
            else if (item.AlternateText == "")
            {
                item.AlternateText = item.ItemName;
            }
            if (item.ItemTypeID == 2)
            {
                IsDownloadItemInCart = true;
                CountDownloadableItem++;
            }
            //ie GiftCard
            var isVirtual = false;
            if (item.ItemTypeID == 3)
            {

                int typ = AspxGiftCardController.GetGiftCardType(aspxCommonObj, item.CartItemID);

                if (typ > 0)
                {
                    if (typ == 2)
                    {
                        ShowShippingAdd = false;
                        isVirtual = false;
                    }
                    else
                    {
                        ShowShippingAdd = true;
                        isVirtual = true;
                    }

                }

                giftcardCount++;
                if (lstCart.Count != giftcardCount)
                {
                    ShowShippingAdd = false;
                }
            }
            //  }
            // CheckOut.UserCart.ShowShippingAdd = type == "both" || type == "physical" ? false : true;


            //if (userName.ToLower() != "anonymoususer")
            //{
            //    CartDataInfo cartTaxOrderObj = new CartDataInfo();
            //    cartTaxOrderObj.ItemID = item.ItemID.ToString();
            //    cartTaxOrderObj.AddressID = 0;
            //    cartTaxOrderObj.CostVariantsValueIDs = item.CostVariantsValueIDs;
            //    List<CartTaxforOrderInfo> lstCartTaxOrder = AspxCartController.GetCartTaxforOrder(cartTaxOrderObj,
            //                                                                                      aspxCommonObj);

            //    StringBuilder objTaxInfo = new StringBuilder();
            //    objTaxInfo.Append("[");
            //    foreach (CartTaxforOrderInfo cartTaxforOrderInfo in lstCartTaxOrder)
            //    {
            //        if (cartTaxforOrderInfo.TaxRateValue != 0)
            //        {
            //            objTaxInfo.Append("{");
            //            objTaxInfo.Append("'TaxManageRuleId':" + cartTaxforOrderInfo.TaxManageRuleID +
            //                              ",'ItemID':" + cartTaxforOrderInfo.ItemID +
            //                              ",'CostVariantsValueIDs':" + cartTaxforOrderInfo.CostVariantsValueIDs +
            //                              ",'TaxSubTotal':" + cartTaxforOrderInfo.TaxRateValue +
            //                              ",'StoreID':" + storeID +
            //                              ",'PortalID':" + portalID +
            //                              ",'AddedBy':" + userName);
            //            objTaxInfo.Append("}");
            //        }
            //    }
            //    objTaxInfo.Append("]");

            //    //CheckOut.UserCart.objTaxList.push(objTaxInfo);


            //}



            CountAllItem++;
            // CheckOut.UserCart.CountAllItem++;
            cartDetails.Append("<tr >");
            cartDetails.Append("<td><input type=\"hidden\" name=\"cartItemId\" value=\"" + item.CartItemID + "\" />");
            cartDetails.Append("<b>" + index + ".</b>");
            cartDetails.Append("</td>");
            cartDetails.Append("<td>");
            cartDetails.Append("<p class=\"cssClassCartPicture\">");
            cartDetails.Append("<img title=\"" + item.AlternateText + "\" src=\"" + aspxRedirectPath +
                               imagePath.Replace("uploads", "uploads/Small") + "\" ></p>");
            //                cartElements += '</td>';
            //                cartElements += '<td>';
            cartDetails.Append("<div class=\"cssClassCartPictureInformation\">");
            cartDetails.Append("<h3>");
            if (item.CostVariantsValueIDs != "")
            {
                cartDetails.Append("<a class=\"cssClassLink\" id=\"item_" + item.ItemID + " itemType=\"" +
                                   item.ItemTypeID +
                                   "\"  href=\"" + aspxRedirectPath + "item/" + item.SKU +
                                   pageExtension + "?varId=" + item.CostVariantsValueIDs + "\">" + item.ItemName +
                                   "\" </a></h3>");

            }
            else
            {

                if (item.ItemTypeID == 3)
                {
                    cartDetails.Append("<a class=\"cssClassLink\" id=\"item_" + item.ItemID + "\" isvirtual=\"" +
                                       isVirtual +
                                       "\" itemType=\"" + item.ItemTypeID + "\"  href=\"" +
                                       aspxRedirectPath + "item/" + item.SKU + pageExtension +
                                       "\">" + item.ItemName + "</a></h3>");
                }
                else
                {
                    cartDetails.Append("<a class=\"cssClassLink\" id=\"item_" + item.ItemID + "\"  itemType=\"" +
                                       item.ItemTypeID + "\"  href=\"" + aspxRedirectPath + "item/" +
                                       item.SKU + pageExtension + "\">" + item.ItemName + "</a></h3>");

                }
            }
            //cartElements += '<p>';
            //cartElements += '<textarea  id="itemDes" readonly="readonly" style="width: 153px; height: 75px;">' + Encoder.htmlDecode(value.ShortDescription) + '</textarea>';
            //cartElements += '' + Encoder.htmlDecode(value.ShortDescription) + '';
            //cartElements += '</p>';
            cartDetails.Append("</div>");
            cartDetails.Append("</td>");
            cartDetails.Append("<td class=\"row-variants\" varIDs=\"" + item.CostVariantsValueIDs + "\">");
            cartDetails.Append(item.CostVariants);
            cartDetails.Append("</td>");
            cartDetails.Append("<td class=\"cssClassPreviewQTY\">");
            cartDetails.Append("<input class=\"num-pallets-input\" taxrate=\"0\" price=\"" +
                               item.Price + "\" id=\"txtQuantity_" + item.CartID +
                               "\" type=\"text\" readonly=\"readonly\" disabled=\"disabled\" value=\"" + item.Quantity +
                               "\">");
            cartDetails.Append("</td>");
            //                cartElements += '<td class="cssClassTimes">';
            //                cartElements += ' X';
            //                cartElements += '</td>';
            cartDetails.Append("<td class=\"price-per-pallet\">");
            cartDetails.Append("<span id=\"" + item.Weight + "\" class=\"cssClassFormatCurrency\">" +
                               Math.Round(double.Parse((item.Price * rate).ToString()), 2).ToString() + "</span>");
            cartDetails.Append("</td>");
            //                cartElements += '<td class="cssClassEquals">';
            //                cartElements += '=';
            //                cartElements += '</td>';
            cartDetails.Append("<td class=\"row-total\">");
            cartDetails.Append("<input class=\"row-total-input cssClassFormatCurrency\" id=\"txtRowTotal_" + item.CartID +
                               "\"  value=\"" +
                               Math.Round(double.Parse((item.TotalItemCost * rate).ToString()), 2).ToString() +
                               "\" baseValue=\"" +
                               Math.Round(double.Parse((item.TotalItemCost).ToString()), 2).ToString() +
                               "\"  readonly=\"readonly\" type=\"text\" />")
                ;
            cartDetails.Append("</td>");
            cartDetails.Append("<td class=\"row-taxRate\">");
            //tax is set zero unless user selected billing or shipping address is changed
            cartDetails.Append("<span class=\"cssClassFormatCurrency\">0</span>");
            cartDetails.Append("</td>");
            cartDetails.Append("</tr>");
            CartID = item.CartID;
            // CheckOut.UserCart.CartID = item.CartID;
            //arrRewardtotalPrice = arrRewardtotalPrice + parseFloat((item.TotalItemCost*item.Quantity*rate).toFixed(2));


        }
        cartDetails.Append("</table>");
        if (bsketItems.Length > 1)
            bsketItems = bsketItems.Substring(0, bsketItems.Length - 1);
        bsketItems += "]";
        scriptBuilder.Append("  CheckOut.SetBasketItems(eval(\"" + bsketItems + "\")); CheckOut.Vars.ItemIDs='" + itemids + "';");
        scriptBuilder.Append("CheckOut.UserCart.CartID=" + CartID + ";");
        scriptBuilder.Append(" CheckOut.UserCart.ShowShippingAdd=" + ShowShippingAdd.ToString().ToLower() + ";");
        scriptBuilder.Append(" CheckOut.UserCart.IsDownloadItemInCart=" + IsDownloadItemInCart.ToString().ToLower() + ";");
        scriptBuilder.Append(" CheckOut.UserCart.CountDownloadableItem=" + CountDownloadableItem + ";");
        scriptBuilder.Append(" CheckOut.UserCart.CountAllItem=" + CountAllItem + "; CheckOut.BindFunction();");
        scriptBuilder.Append(
            " $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });$('#tblCartList tr:even').addClass('sfEven');$('#tblCartList tr:odd').addClass('sfOdd');");


        // scriptBuilder.Append("CheckOut.BindFunction();");

        string script = GetStringScript(scriptBuilder.ToString());
        cartDetails.Append(script);
        ltTblCart.Text = cartDetails.ToString();
        // ("#tblCartList").append(cartElements);

    }

    private void LoadRewardPoints()
    {
        StoreSettingConfig ssc = new StoreSettingConfig();
        bool isEnableRewardPoint = true;//ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, storeID, portalID, cultureName);
        if (isEnableRewardPoint)
        {
            List<GeneralSettingInfo> lstGeneralSet = RewardPointsController.GetGeneralSetting(aspxCommonObj);
            StringBuilder rewardPointBuilder = new StringBuilder();
            StringBuilder scriptrewardPoint = new StringBuilder();

            if (lstGeneralSet.Count > 0)
            {

                foreach (GeneralSettingInfo generalSettingInfo in lstGeneralSet)
                {
                    if (generalSettingInfo.IsActive)
                    {
                       // scriptrewardPoint.Append("CheckOut.UserCart.RewardPointsDiscount = " +
                                                /// generalSettingInfo.TotalRewardAmount + ";");
                       // scriptrewardPoint.Append("CheckOut.UserCart.UsedRewardPoints = " +
                                                // generalSettingInfo.TotalRewardPoints + ";");

                        if (generalSettingInfo.AmountSpent != 0 && generalSettingInfo.AmountSpent != null)
                        {
                            scriptrewardPoint.Append(" $('#hdnRewardRate').val(eval(" +
                                                     generalSettingInfo.RewardPointsEarned / generalSettingInfo.AmountSpent +
                                                     "));");
                        }
                        else
                        {
                            scriptrewardPoint.Append(" $('#hdnRewardRate').val(eval(" + 0 + "));");
                        }

                        scriptrewardPoint.Append("$('#hdnRate').val(eval(" +
                                                 generalSettingInfo.RewardExchangeRate / generalSettingInfo.RewardPoints +
                                                 "));");

                        bool IsPurchaseActive = RewardPointsController.IsPurchaseActive(aspxCommonObj);
                        scriptrewardPoint.Append("CheckOut.UserCart.IsPurchaseActive=" +
                                                 IsPurchaseActive.ToString().ToLower() + ";");

                        RewardPointsController.RewardPointsSelectedValue("btnRewardPointsValue");



                        decimal rewardPointsSliderSelectedValue =
                            RewardPointsController.RewardPointsSelectedValue("btnRewardPointsValue");

                        if (rewardPointsSliderSelectedValue > 0)
                        {
                            scriptrewardPoint.Append("CheckOut.UserCart.RewardPointsDiscount = eval(" +
                                                     rewardPointsSliderSelectedValue +
                                                     "* parseFloat($('#hdnRate').val()).toFixed(2));");
                            scriptrewardPoint.Append("CheckOut.UserCart.UsedRewardPoints =" +
                                                     rewardPointsSliderSelectedValue + ";");
                            scriptrewardPoint.Append(
                                " $('#txtRewardAmount').val(CheckOut.UserCart.RewardPointsDiscount * rate);");



                        }
                        else
                        {
                            scriptrewardPoint.Append(
                              "CheckOut.UserCart.RewardPointsDiscount = 0;CheckOut.UserCart.UsedRewardPoints = 0;");


                        }
                        scriptrewardPoint.Append(" $('#trDiscountReward').show();");

                        string script = GetStringScript(scriptrewardPoint.ToString());
                        ltRewardPoint.Text = script;
                    }
                }
            }
        }

    }

    private void LoadPaymentGateway()
    {
        string aspxRootPath = ResolveUrl("~/");
        List<PaymentGatewayListInfo> pginfo = AspxCartController.GetPGList(aspxCommonObj);

        StringBuilder paymentGateWay = new StringBuilder();
        foreach (var item in pginfo)
        {
            if (item.LogoUrl != "")
            {
                paymentGateWay.Append(
                    "<label><table class=\"cssClassTablePGList\"><tr><td class=\"cssClassTDPGList\"><input id=\"rdb" +
                    item.PaymentGatewayTypeName + "\" name=\"PGLIST\" type=\"radio\" realname=\"" +
                    item.PaymentGatewayTypeName + "\" friendlyname=\"" + item.FriendlyName + "\"  source=\"" +
                    item.ControlSource + "\" value=\"" + item.PaymentGatewayTypeID +
                    "\" class=\"cssClassRadioBtn\" /></td><td class=\"cssClassTDPGList\"><img class=\"cssClassImgPGList\" src=\"" + aspxRootPath +
                    item.LogoUrl + "\" alt=\"" + item.PaymentGatewayTypeName + "\" title=\"" +
                    item.PaymentGatewayTypeName + "\" visible=\"true\" /></td></tr></table></label><br />");

            }
            else
            {
                paymentGateWay.Append("<label><table class=\"cssClassTablePGList\"><tr><td class=\"cssClassTDPGList\"><input id=\"rdb" + item.PaymentGatewayTypeName +
                                      "\" name=\"PGLIST\" type=\"radio\" realname=\"" + item.PaymentGatewayTypeName +
                                      "\" friendlyname=\"" + item.FriendlyName + "\"  source=\"" + item.ControlSource +
                                      "\" value=\"" + item.PaymentGatewayTypeID + "\" class=\"cssClassRadioBtn\" /></td><td><b>" +
                                      item.PaymentGatewayTypeName + "</b></td></tr></table></label><br />");

            }

        }
        paymentGateWay.Append(GetStringScript("CheckOut.BindPGFunction();"));
        ltPgList.Text = paymentGateWay.ToString();
    }


    private string GetStringScript(string codeToRun)
    {
        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){ setTimeout(function(){ " + codeToRun + "},500); });</script>");
        return script.ToString();
    }


    Hashtable hst = null;
    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }




    #region ServerSide Mthods
    private void HideSignUp()
    {
        int UserRegistrationType = pagebase.GetSettingIntByKey(SageFrameSettingKeys.PortalUserRegistration);
        RegisterURL = UserRegistrationType > 0 ? true : false;
        if (!RegisterURL)
        {
            this.divSignUp.Visible = false;
        }
    }


    public void SetUserRoles(string strRoles)
    {
        Session[SessionKeys.SageUserRoles] = strRoles;
        HttpCookie cookie = HttpContext.Current.Request.Cookies[CookiesKeys.SageUserRolesCookie];
        if (cookie == null)
        {
            cookie = new HttpCookie(CookiesKeys.SageUserRolesCookie);
        }
        cookie[CookiesKeys.SageUserRolesCookie] = strRoles;
        HttpContext.Current.Response.Cookies.Add(cookie);
    }

    protected void LoginButton_Click(object sender, EventArgs e)
    {
        MembershipController member = new MembershipController();
        RoleController role = new RoleController();
        UserInfo user = member.GetUserDetails(GetPortalID, UserName.Text);
        if (user.UserExists && user.IsApproved)
        {
            if (!(string.IsNullOrEmpty(UserName.Text) && string.IsNullOrEmpty(PasswordAspx.Text)))
            {
                if (PasswordHelper.ValidateUser(user.PasswordFormat, PasswordAspx.Text, user.Password, user.PasswordSalt))
                {
                    string userRoles = role.GetRoleNames(user.UserName, GetPortalID);
                    strRoles += userRoles;
                    if (strRoles.Length > 0)
                    {
                        SetUserRoles(strRoles);
                        SessionTracker sessionTracker = (SessionTracker)Session[SessionKeys.Tracker];
                        sessionTracker.PortalID = GetPortalID.ToString();
                        sessionTracker.Username = UserName.Text;
                        Session[SessionKeys.Tracker] = sessionTracker;
                        SageFrame.Web.SessionLog SLog = new SageFrame.Web.SessionLog();
                        SLog.SessionTrackerUpdateUsername(sessionTracker, sessionTracker.Username, GetPortalID.ToString());

                        if (Request.QueryString["ReturnUrl"] != null)
                        {

                            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                              user.UserName,
                              DateTime.Now,
                              DateTime.Now.AddMinutes(30),
                              true,
                              GetPortalID.ToString(),
                              FormsAuthentication.FormsCookiePath);

                            // Encrypt the ticket.
                            string encTicket = FormsAuthentication.Encrypt(ticket);

                            // Create the cookie.
                            //Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));

                            Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName + "_" + GetApplicationName + "_" + GetPortalID, encTicket));
                            string PageNotFoundPage = Path.Combine(this.Request.ApplicationPath.ToString(), pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalPageNotFound) + SageFrameSettingKeys.PageExtension).Replace("\\", "/"); ;
                            string UserRegistrationPage = Path.Combine(this.Request.ApplicationPath.ToString(), pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalRegistrationPage) + SageFrameSettingKeys.PageExtension).Replace("\\", "/"); ;
                            string PasswordRecoveryPage = Path.Combine(this.Request.ApplicationPath.ToString(), pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalPasswordRecovery) + SageFrameSettingKeys.PageExtension).Replace("\\", "/"); ;
                            string ForgotPasswordPage = Path.Combine(this.Request.ApplicationPath.ToString(), pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalForgotPassword) + SageFrameSettingKeys.PageExtension).Replace("\\", "/"); ;
                            string PageNotAccessiblePage = Path.Combine(this.Request.ApplicationPath.ToString(), pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalPageNotAccessible) + SageFrameSettingKeys.PageExtension).Replace("\\", "/"); ;

                            string ReturnUrlPage = Request.QueryString["ReturnUrl"].Replace("%2f", "-").ToString();

                            if (ReturnUrlPage == PageNotFoundPage || ReturnUrlPage == UserRegistrationPage || ReturnUrlPage == PasswordRecoveryPage || ReturnUrlPage == ForgotPasswordPage || ReturnUrlPage == PageNotAccessiblePage)
                            {
                                Response.Redirect("~/" + pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + SageFrameSettingKeys.PageExtension, false);
                            }
                            else
                            {
                                Response.Redirect(ResolveUrl(Request.QueryString["ReturnUrl"].ToString()), false);
                            }
                        }
                        else
                        {
                            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                             user.UserName,
                             DateTime.Now,
                             DateTime.Now.AddMinutes(30),
                             true,
                             GetPortalID.ToString(),
                             FormsAuthentication.FormsCookiePath);

                            // Encrypt the ticket.
                            string encTicket = FormsAuthentication.Encrypt(ticket);

                            // Create the cookie.
                            //Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));
                            Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName + "_" + GetApplicationName + "_" + GetPortalID, encTicket));

                            if (GetPortalID > 1)
                            {
                                Response.Redirect("~/portal/" + GetPortalSEOName + "/" + ssc.GetStoreSettingsByKey(StoreSetting.SingleCheckOutURL, GetStoreID, GetPortalID, GetCurrentCultureName) + SageFrameSettingKeys.PageExtension, false);
                            }
                            else
                            {
                                Response.Redirect("~/" + ssc.GetStoreSettingsByKey(StoreSetting.SingleCheckOutURL, GetStoreID, GetPortalID, GetCurrentCultureName) + SageFrameSettingKeys.PageExtension, false);
                            }

                        }

                        //update Cart for that User in AspxCommerce
                        //TODO:: get customerID from userNAme 
                        int customerID = GetCustomerID;
                        if (customerID == 0)
                        {
                            CustomerGeneralInfo sageUserCust = CustomerGeneralInfoController.CustomerIDGetByUsername(user.UserName, GetPortalID, GetStoreID);
                            if (sageUserCust != null)
                            {
                                customerID = sageUserCust.CustomerID;
                            }
                        }
                        UpdateCartAnonymoususertoRegistered(GetStoreID, GetPortalID, customerID, sessionCode);
                    }
                    else
                    {
                        FailureText.Text = GetSageMessage("UserLogin", "Youarenotauthenticatedtothisportal");//"You are not authenticated to this portal!";
                    }
                }
                else
                {
                    FailureText.Text = GetSageMessage("UserLogin", "UsernameandPasswordcombinationdoesntmatched");//"Username and Password combination doesn't matched!";
                }
            }
        }
        else
        {
            FailureText.Text = GetSageMessage("UserLogin", "UserDoesnotExist");
        }
    }

    public int GetCustomerIDByUserName(int storeID, int portalID, string userName)
    {
        try
        {
            List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
            ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
            ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            ParaMeter.Add(new KeyValuePair<string, object>("@UserName", userName));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsScalar<int>("usp_Aspx_GetCustomerIDByUserName", ParaMeter);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public bool UpdateCartAnonymoususertoRegistered(int storeID, int portalID, int customerID, string sessionCode)
    {
        try
        {
            List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
            ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
            ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            ParaMeter.Add(new KeyValuePair<string, object>("@CustomerID", customerID));
            ParaMeter.Add(new KeyValuePair<string, object>("@SessionCode", sessionCode));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteNonQueryAsBool("usp_Aspx_UpdateCartAnonymousUserToRegistered", ParaMeter, "@IsUpdate");
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    #endregion
}