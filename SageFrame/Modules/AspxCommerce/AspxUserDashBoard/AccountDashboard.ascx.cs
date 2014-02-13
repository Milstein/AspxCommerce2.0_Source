/*
AspxCommerce® - http://www.aspxcommerce.com
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
using SageFrame.Web;
using System.Collections;
using AspxCommerce.Core;
using System.Collections.Generic;
using System.Text;


public partial class Modules_AspxCommerce_AspxUserDashBoard_AccountDashboard : BaseAdministrationUserControl
{
   public bool defaultShippingExist = false;
   public  bool defaultBillingExist = false;
   public int addressId = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            GetAddressBookDetails();
            GetAllCountry();
            //IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
       

    }
    Hashtable hst = null;
    public void GetAddressBookDetails()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        aspxCommonObj.CustomerID = GetCustomerID;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<AddressInfo> lstAddress = AspxUserDashController.GetUserAddressDetails(aspxCommonObj);
        StringBuilder defaultBillingAddressElements = new StringBuilder();
        StringBuilder defaultShippingAddressElements = new StringBuilder();
        if(lstAddress.Count>0)
        {
            foreach (AddressInfo value in lstAddress)
            {
                if ((value.DefaultBilling != null && bool.Parse(value.DefaultBilling.ToString())) &&
                    (value.DefaultShipping != null && bool.Parse(value.DefaultShipping.ToString())))
                {
                    addressId = value.AddressID;
                }

                if (!defaultShippingExist)
                {
                    if ((value.DefaultShipping != null) ||
                        (value.DefaultShipping != null && bool.Parse(value.DefaultShipping.ToString())))
                    {
                        defaultShippingExist = true;
                    }
                    else
                    {
                        defaultShippingExist = false;
                    }
                }

                if (!defaultBillingExist)
                {
                    if ((value.DefaultBilling != null) || bool.Parse(value.DefaultBilling.ToString()))
                    {
                        defaultBillingExist = true;
                    }
                    else
                    {
                        defaultBillingExist = false;
                    }
                }

                if (((value.DefaultBilling != null) && bool.Parse(value.DefaultBilling.ToString())) ||
                    ((value.DefaultShipping != null) && (bool.Parse(value.DefaultShipping.ToString()))))
                {
                    if (bool.Parse(value.DefaultShipping.ToString()))
                    {

                        defaultShippingAddressElements.Append("<li id=\"liDefaultShippingAddress\">");
                        defaultShippingAddressElements.Append("<h3>");
                        defaultShippingAddressElements.Append(getLocale("Default Shipping Address"));
                        defaultShippingAddressElements.Append("</h3>");
                        defaultShippingAddressElements.Append("<p><label name=\"FirstName\">");
                        defaultShippingAddressElements.Append(value.FirstName);
                        defaultShippingAddressElements.Append("</label>");
                        defaultShippingAddressElements.Append(" ");
                        defaultShippingAddressElements.Append("<label name=\"LastName\">");
                        defaultShippingAddressElements.Append(value.LastName);
                        defaultShippingAddressElements.Append("</label><br>");
                        defaultShippingAddressElements.Append("<label name=\"Email\">");
                        defaultShippingAddressElements.Append(value.Email);
                        defaultShippingAddressElements.Append("</label><br>");
                        if (value.Company != "")
                        {
                            defaultShippingAddressElements.Append("<label name=\"Company\">");
                            defaultShippingAddressElements.Append(value.Company);
                            defaultShippingAddressElements.Append("</label><br/>");
                        }
                        defaultShippingAddressElements.Append("<label name=\"Address1\">");
                        defaultShippingAddressElements.Append(value.Address1);
                        defaultShippingAddressElements.Append("</label><br>");
                        if (value.Address2 != "")
                        {
                            defaultShippingAddressElements.Append("<label name=\"Address2\">");
                            defaultShippingAddressElements.Append(value.Address2);
                            defaultShippingAddressElements.Append("</label><br>");
                        }
                        defaultShippingAddressElements.Append("<label name=\"City\">");
                        defaultShippingAddressElements.Append(value.City);
                        defaultShippingAddressElements.Append("</label><br>");
                        defaultShippingAddressElements.Append("<label name=\"State\">");
                        defaultShippingAddressElements.Append(value.State);
                        defaultShippingAddressElements.Append("</label><br>");
                        defaultShippingAddressElements.Append("Zip:<label name=\"Zip\">");
                        defaultShippingAddressElements.Append(value.Zip);
                        defaultShippingAddressElements.Append("</label><br>");
                        defaultShippingAddressElements.Append("<label name=\"Country\">");
                        defaultShippingAddressElements.Append(value.Country);
                        defaultShippingAddressElements.Append("</label><br>");
                        defaultShippingAddressElements.Append(getLocale("P:"));
                        defaultShippingAddressElements.Append("<label name=\"Phone\">");
                        defaultShippingAddressElements.Append(value.Phone);
                        defaultShippingAddressElements.Append("</label><br>");
                        if (value.Mobile != "")
                        {
                            defaultShippingAddressElements.Append(getLocale("M:"));
                            defaultShippingAddressElements.Append("<label name=\"Mobile\">");
                            defaultShippingAddressElements.Append(value.Mobile);
                            defaultShippingAddressElements.Append("</label><br>");
                        }
                        if (value.Fax != "")
                        {
                            defaultShippingAddressElements.Append(getLocale("F:"));
                            defaultShippingAddressElements.Append("<label name=\"Fax\">");
                            defaultShippingAddressElements.Append(value.Fax);
                            defaultShippingAddressElements.Append("</label><br>");
                        }
                        if (value.Website != "")
                        {
                            defaultShippingAddressElements.Append("<label name=\"Website\">");
                            defaultShippingAddressElements.Append(value.Website);
                            defaultShippingAddressElements.Append("</label>");
                        }
                        defaultShippingAddressElements.Append("</p>");
                        defaultShippingAddressElements.Append(
                            "<p class=\"cssClassChange\"><a href=\"#\" rel=\"popuprel\" name=\"EditAddress\" Flag=\"1\" value=\"");
                        defaultShippingAddressElements.Append(value.AddressID);
                        defaultShippingAddressElements.Append("\" Element=\"Shipping\">");
                        defaultShippingAddressElements.Append(getLocale("Change Shipping Address"));
                        defaultShippingAddressElements.Append("</a></p>");
                        defaultShippingAddressElements.Append("</li>");
                        ltrShipAddress.Text = defaultShippingAddressElements.ToString();
                    }

                    if (bool.Parse(value.DefaultBilling.ToString()))
                    {
                        defaultBillingAddressElements.Append("<li id=\"liDefaultBillingAddress\">");
                        defaultBillingAddressElements.Append("<h3>");
                        defaultBillingAddressElements.Append(getLocale("Default Billing Address"));
                        defaultBillingAddressElements.Append("</h3>");
                        defaultBillingAddressElements.Append("<p><label name=\"FirstName\">");
                        defaultBillingAddressElements.Append(value.FirstName);
                        defaultBillingAddressElements.Append("</label>");
                        defaultBillingAddressElements.Append(" ");
                        defaultBillingAddressElements.Append("<label name=\"LastName\">");
                        defaultBillingAddressElements.Append(value.LastName);
                        defaultBillingAddressElements.Append("</label><br>");
                        defaultBillingAddressElements.Append("<label name=\"Email\">");
                        defaultBillingAddressElements.Append(value.Email);
                        defaultBillingAddressElements.Append("</label><br>");
                        if (value.Company != "")
                        {
                            defaultBillingAddressElements.Append("<label name=\"Company\">");
                            defaultBillingAddressElements.Append(value.Company);
                            defaultBillingAddressElements.Append("</label><br/>");
                        }
                        defaultBillingAddressElements.Append("<label name=\"Address1\">");
                        defaultBillingAddressElements.Append(value.Address1);
                        defaultBillingAddressElements.Append("</label><br>");
                        if (value.Address2 != "")
                        {
                            defaultBillingAddressElements.Append("<label name=\"Address2\">");
                            defaultBillingAddressElements.Append(value.Address2);
                            defaultBillingAddressElements.Append("</label><br>");
                        }
                        defaultBillingAddressElements.Append("<label name=\"City\">");
                        defaultBillingAddressElements.Append(value.City);
                        defaultBillingAddressElements.Append("</label><br>");
                        defaultBillingAddressElements.Append("<label name=\"State\">");
                        defaultBillingAddressElements.Append(value.State);
                        defaultBillingAddressElements.Append("</label><br>");
                        defaultBillingAddressElements.Append("Zip:<label name=\"Zip\">");
                        defaultBillingAddressElements.Append(value.Zip);
                        defaultBillingAddressElements.Append("</label><br>");
                        defaultBillingAddressElements.Append("<label name=\"Country\">");
                        defaultBillingAddressElements.Append(value.Country);
                        defaultBillingAddressElements.Append("</label><br>");
                        defaultBillingAddressElements.Append(getLocale("P:"));
                        defaultBillingAddressElements.Append("<label name=\"Phone\">");
                        defaultBillingAddressElements.Append(value.Phone);
                        defaultBillingAddressElements.Append("</label><br>");
                        if (value.Mobile != "")
                        {
                            defaultBillingAddressElements.Append(getLocale("M:"));
                            defaultBillingAddressElements.Append("<label name=\"Mobile\">");
                            defaultBillingAddressElements.Append(value.Mobile);
                            defaultBillingAddressElements.Append("</label><br>");
                        }
                        if (value.Fax != "")
                        {
                            defaultBillingAddressElements.Append(getLocale("F:"));
                            defaultBillingAddressElements.Append("<label name=\"Fax\">");
                            defaultBillingAddressElements.Append(value.Fax);
                            defaultBillingAddressElements.Append("</label><br>");
                        }
                        if (value.Fax != "")
                        {
                            defaultBillingAddressElements.Append("<label name=\"Website\">");
                            defaultBillingAddressElements.Append(value.Website);
                            defaultBillingAddressElements.Append("</label>");
                        }
                        defaultBillingAddressElements.Append("</p>");
                        defaultBillingAddressElements.Append(
                            "<p class=\"cssClassChange\"><a href=\"#\" rel=\"popuprel\" name=\"EditAddress\" Flag=\"1\" value=\"");
                        defaultBillingAddressElements.Append(value.AddressID);
                        defaultBillingAddressElements.Append("\" Element=\"Billing\">");
                        defaultBillingAddressElements.Append(getLocale("Change Billing Address"));
                        defaultBillingAddressElements.Append("</a></p>");
                        defaultBillingAddressElements.Append("</li>");
                        ltrBillingAddress.Text = defaultBillingAddressElements.ToString();
                    }
                }
            }
        }
        else
        {
            defaultBillingAddressElements.Append("<li id=\"liDefaultBillingAddress\"></li>");
            ltrBillingAddress.Text = defaultBillingAddressElements.ToString();
             defaultShippingAddressElements.Append("<li id=\"liDefaultShippingAddress\"></li>");
            ltrShipAddress.Text = defaultShippingAddressElements.ToString();
        }
    }

    public void GetAllCountry()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<CountryInfo> lstCountry = AspxCommonController.BindCountryList();
        if (lstCountry != null && lstCountry.Count > 0)
        {
            StringBuilder countryElements = new StringBuilder();
            countryElements.Append("<select id=\"ddlCountry\" class=\"sfListmenu\">");
            foreach (CountryInfo value in lstCountry)
            {
                countryElements.Append("<option value=");
                countryElements.Append(value.Value );
                countryElements.Append(">" );
                countryElements.Append(value.Text);
                countryElements.Append("</option>");
            }
            countryElements.Append("</select>");
            ltrCountry.Text = countryElements.ToString();

        }
    }

    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }

}
