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
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using AspxCommerce.Core;
using AspxCommerce.Moneybookers;
using SageFrame.Framework;

public partial class Modules_AspxCommerce_MoneybookersGateWay_PayThroughMoneybookers : PageBase
{
    public string aspxPaymentModulePath,userName,cultureName, MainCurrency,Spath, itemIds, couponCode;
    public string sessionCode = string.Empty,SelectedCurrency = string.Empty;
    public int storeID,portalID,customerID;  
    public double rate=1;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["MoneybookersData"] != null)
            {
                string[] data = Session["MoneybookersData"].ToString().Split('#');
                storeID = int.Parse(data[0].ToString());
                portalID = int.Parse(data[1].ToString());
                userName = data[2];
                customerID = int.Parse(data[3].ToString());
                sessionCode = data[4].ToString();
                cultureName = data[5];
                itemIds = data[6];
                couponCode = data[7];
                Spath = ResolveUrl("~/Modules/AspxCommerce/AspxCommerceServices/");

                StoreSettingConfig ssc = new StoreSettingConfig();
                MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, storeID, portalID, cultureName);
                AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
                aspxCommonObj.StoreID = storeID;
                aspxCommonObj.PortalID = portalID;
                if (MoneybookersSupportedCurrency.moneybookersSupportedCurrency.Split(',').Where(s => string.Compare(MainCurrency, s, true) == 0).Count() > 0)
                {
                    rate = 1;
                    SelectedCurrency = MainCurrency;
                }
                else
                {
                    AspxCommerceWebService aws = new AspxCommerceWebService();
                    rate = aws.GetCurrencyRateOnChange(aspxCommonObj, MainCurrency, "USD", "en-US");
                    MainCurrency = "USD";
                    SelectedCurrency = MainCurrency;
                    /* Some time if selected currency does not exist in currency table then it returns 1, 
                          if we take 1 as rate then it will convert same as previous amount
                           So avoid Transaction by making it 0 */

                    if (rate == 1)
                    {
                        rate = 0;
                    }
                }
                if (rate != 0)
                {
                    // Set Transaction Currency code in session to save transactionLog table
                    Session["SelectedCurrency"] = SelectedCurrency;
                    LoadSetting();
                }
                else
                {
                    lblnotity.Text = "Something goes wrong, hit refresh or go back to checkout";
                    clickhere.Visible = false;
                }
             
            }
            else
            {
                lblnotity.Text = "Something goes wrong, hit refresh or go back to checkout";
                clickhere.Visible = false;
            }


        }
        catch (Exception ex)
        {
            lblnotity.Text = "Something goes wrong, hit refresh or go back to checkout";
            clickhere.Visible = false;
            ProcessException(ex);
        }

    }

    [WebMethod]
    public static void SetSessionVariable(string key, string value)
    {
        HttpContext.Current.Session[key] = value;

    }
    public void LoadSetting()
    {
        MoneybookersWCFService pw = new MoneybookersWCFService();
        List<MoneybookersSettingInfo> sf;
        OrderDetailsCollection orderdata2 = new OrderDetailsCollection();
        orderdata2 = (OrderDetailsCollection)HttpContext.Current.Session["OrderCollection"];
        string itemidsWithVar = "";
        foreach (var item in orderdata2.LstOrderItemsInfo)
        {
            itemidsWithVar += item.ItemID + "&" + item.Quantity + "&" + orderdata2.ObjOrderDetails.OrderID + "&" + item.Variants + ",";
        }
        double amountTotal = double.Parse(Session["GrandTotalAll"].ToString()) * rate;
        decimal amount = decimal.Parse(amountTotal.ToString(CultureInfo.InvariantCulture));

        string postURL = string.Empty;

        try
        {
            sf = pw.GetAllMoneybookersSetting(int.Parse(Session["GateWay"].ToString()), storeID, portalID);

            if (bool.Parse(sf[0].IsTestMoneybookers.ToString()))
            {
                postURL = "https://www.moneybookers.com/app/payment.pl";
               // postURL = "http://www.moneybookers.com/app/test_payment.pl";              
                HttpContext.Current.Session["IsTestMoneybookers"] = true;

            }
            else
            {
                postURL = "https://www.moneybookers.com/app/payment.pl";
                HttpContext.Current.Session["IsTestMoneybookers"] = false;

            }
            string ids = Session["OrderID"].ToString() + "#" + storeID + "#" + portalID + "#" + userName + "#" + customerID + "#" + sessionCode + "#" + Session["IsTestMoneybookers"].ToString() + "#" + Session["GateWay"].ToString() + "#" + SelectedCurrency;
            // StringBuilder url = new StringBuilder();
            //List<CartInfoforMoneybookers> cd;
            //cd = pw.GetCartDetails(storeID, portalID, customerID, userName, cultureName, sessionCode);

            var sb = new StringBuilder();
            sb.Append("<html>");
            sb.AppendFormat(@"<body onload='document.forms[""payment""].submit()' >");
            sb.AppendFormat("<form name='payment' action='{0}' method='post'><div sytle='display:none;'>", postURL);
            sb.AppendFormat("<input type=\"hidden\" name=\"pay_to_email\" value=\"" + sf[0].MoneybookersMerchantAccount + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"return_url\" value=\"" + sf[0].MoneybookersSuccessUrl + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"status_url\" value=\"" + sf[0].MoneybookersStatusUrl + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"amount\" value=\"" + Math.Round(amount, 2) + "\"  />");
            sb.AppendFormat("<input type=\"hidden\" name=\"currency\" value=\"" + MainCurrency + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"logo_url\" value=\"" + sf[0].MoneybookersLogoUrl + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"cancel_url\" id=\"cancel_url\" value=\"" + sf[0].MoneybookersCancelUrl + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"merchant_fields\" id=\"merchant_fields\" value=\"field1,field2\"  />");
            sb.AppendFormat("<input type=\"hidden\" name=\"field1\" id=\"field1\" value=\"" + ids + "\" />");
            sb.AppendFormat("<input type=\"hidden\" name=\"field2\" value=\"" + itemidsWithVar + "#" + couponCode + "\" />");
            sb.Append("</div></form>");
            sb.Append("</body>");
            sb.Append("</html>");
            Response.Write(sb.ToString());
            HttpContext.Current.ApplicationInstance.CompleteRequest();
           // Response.Redirect(url.ToString(), false);
        }
        catch (Exception ex)
        {
            lblnotity.Text = "Something goes wrong, hit refresh or go back to checkout";
            clickhere.Visible = false;
            ProcessException(ex);
        }

    }
    protected void clickhere_Click(object sender, EventArgs e)
    {
        LoadSetting();
    }
}
