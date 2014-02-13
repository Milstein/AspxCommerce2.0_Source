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
using System.Web;
using System.Web.Services;
using System.Xml;
using AspxCommerce.Core;
using AspxCommerce.GoogleCheckOut;
using GCheckout.AutoGen;
using GCheckout.Checkout;
using GCheckout.Util;
using SageFrame.Framework;

public partial class Modules_AspxCommerce_GoogleCheckOutGateWay_PayThroughGoogleCheckOut : PageBase
{
    private static string aspxPaymentModulePath, MainCurrency, Spath, itemIds, couponCode, ggCartRequest, userName, cultureName;
    private static string sessionCode = string.Empty, SelectedCurrency = string.Empty;
    private static int storeID, portalID, customerID;
    private static double rate = 1;
   
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try
            {
                if (Session["GoogleCheckOutData"] != null)
                {
                    string[] data = Session["GoogleCheckOutData"].ToString().Split('#');
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
                    if (GoogleCheckOutSupportedCurrency.googleCheckOutSupportedCurrency.Split(',').Where(s => string.Compare(MainCurrency, s, true) == 0).Count() > 0)
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
                        //Session["SelectedCurrency"] = SelectedCurrency;
                        LoadSetting();
                    }
                    else
                    {
                        lblnotity.Text = "Something goes wrong, hit refresh or go back to checkout";
                        clickhere.Visible = false;
                    }                   
                    HttpContext.Current.Session.Remove("GoogleCheckOutData");
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
    }

    [WebMethod]
    public static void SetSessionVariable(string key, string value)
    {
        HttpContext.Current.Session[key] = value;

    }
    public void LoadSetting()
    {
        GoogleCheckOutWCFService pw = new GoogleCheckOutWCFService();
        List<GoogleCheckOutSettingInfo> sf;
        OrderDetailsCollection orderdata2 = new OrderDetailsCollection();
        orderdata2 = (OrderDetailsCollection)HttpContext.Current.Session["OrderCollection"];
        string itemidsWithVar = "";
        foreach (var item in orderdata2.LstOrderItemsInfo)
        {
            itemidsWithVar += item.ItemID + "&" + item.Quantity + "&" + orderdata2.ObjOrderDetails.OrderID + "&" + item.Variants + ",";
        }
        string country = orderdata2.ObjShippingAddressInfo.Country.ToString();
        string state = orderdata2.ObjShippingAddressInfo.State.ToString();
        string zip = orderdata2.ObjShippingAddressInfo.Zip.ToString();
        int addressID = Convert.ToInt32(orderdata2.ObjShippingAddressInfo.AddressID);

        try
        {
            sf = pw.GetAllGoogleCheckOutSetting(int.Parse(Session["GateWay"].ToString()), storeID, portalID);

            double amountTotal = double.Parse(Session["GrandTotalAll"].ToString()) * rate;
            decimal grandTotal = decimal.Parse(amountTotal.ToString(CultureInfo.InvariantCulture));
            decimal totalTaxableAmount = 0;
            decimal subtotalAmount = 0;
            decimal taxSubTotal = 0;
            decimal shipping = Convert.ToDecimal(Convert.ToDouble(Session["ShippingCostAll"].ToString()) * rate);
            decimal shippingCost = decimal.Parse(shipping.ToString(CultureInfo.InvariantCulture));
            decimal discountAmount = 0;
            decimal couponDiscountAmount = 0;
            decimal rewardDiscountAmount = 0;

            if (sf[0].GoogleEnvironmentType == "Sandbox")
            {

                CheckoutShoppingCartRequest gCartRequest = new CheckoutShoppingCartRequest(sf[0].GoogleMerchantID, sf[0].GoogleMerchantKey, GCheckout.EnvironmentType.Sandbox, sf[0].GoogleCurrencyType, 30, false);
                HttpContext.Current.Session["EnvironmentType"] = "Sandbox";
                
                List<CartInfoforGoogleCheckOut> cd;
                cd = pw.GetCartDetailsForPG(storeID, portalID, customerID, userName, GetCurrentCultureName, sessionCode, country, state, zip, addressID);

                int nCount = 1;
                foreach (CartInfoforGoogleCheckOut oItem in cd)
                {
                    string itemName = oItem.ItemName.ToString();
                    string description = oItem.ShortDescription.ToString();
                    int qty = Convert.ToInt32(oItem.Quantity.ToString());
                    decimal TaxRateValue = Convert.ToDecimal(Convert.ToDouble(oItem.TaxRateValue.ToString()) * rate) / qty;
                    decimal amount = Convert.ToDecimal(Convert.ToDouble(oItem.Price.ToString()) * rate);
                    decimal subTotal = amount;// +TaxRateValue;

                    gCartRequest.AddItem(itemName, description, subTotal, qty);
                    nCount++;
                }
                nCount--;

                //Send Discount Amount
                if (orderdata2.ObjOrderDetails.DiscountAmount != 0)
                {
                    string itemName = "Cart Discount Amount";
                    string description = "Discount Applied on Cart Items";
                    int qty = 1;
                    discountAmount = 0;
                    decimal discount = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.DiscountAmount) * rate);
                    discountAmount = decimal.Parse(discount.ToString(CultureInfo.InvariantCulture));
                    gCartRequest.AddItem(itemName, description, -discountAmount, qty);
                }
                //Send Coupon Amount
                if (orderdata2.ObjOrderDetails.CouponDiscountAmount != 0)
                {
                    string itemName = "Coupon Discount Amount";
                    string description = "Coupon Discount Applied on Cart Items";
                    int qty = 1;
                    couponDiscountAmount = 0;
                    decimal couponDiscount = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.CouponDiscountAmount) * rate);
                    couponDiscountAmount = decimal.Parse(couponDiscount.ToString(CultureInfo.InvariantCulture));
                    gCartRequest.AddItem(itemName, description, -couponDiscountAmount, qty);
                }
                //Send Reward Discount Amount
                if (orderdata2.ObjOrderDetails.RewardDiscountAmount != 0)
                {
                    string itemName = "Reward Points Discount Amount";
                    string description = "Reward Points Discount Applied on Cart Items";
                    int qty = 1;
                    rewardDiscountAmount = 0;
                    decimal rewardDiscount = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.RewardDiscountAmount) * rate);
                    rewardDiscountAmount = decimal.Parse(rewardDiscount.ToString(CultureInfo.InvariantCulture));
                    gCartRequest.AddItem(itemName, description, -rewardDiscountAmount, qty);
                }
                //tax
                if (orderdata2.ObjOrderDetails.TaxTotal != 0)
                {
                    decimal tax = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.TaxTotal) * rate);
                    taxSubTotal = decimal.Parse(tax.ToString(CultureInfo.InvariantCulture));
                }
                subtotalAmount = grandTotal - shippingCost - taxSubTotal + discountAmount + couponDiscountAmount;
                totalTaxableAmount = subtotalAmount - discountAmount - couponDiscountAmount;
                double taxp = Convert.ToDouble((taxSubTotal * 100) / totalTaxableAmount);
                double taxPer = taxp / 100;

                gCartRequest.AddCountryTaxRule(USAreas.ALL, taxPer, false);

                //Shipping Cost
                string shippingMethod;
                if (HttpContext.Current.Session["ShippingMethodName"] != null)
                {
                    shippingMethod = HttpContext.Current.Session["ShippingMethodName"].ToString();
                }
                else
                {
                    shippingMethod = "Default Shipping";
                }
                //shippingMethod = "Default Shipping";
                //decimal shippingcost = Convert.ToDecimal(Convert.ToDouble(Session["ShippingCostAll"].ToString()) * rate);
                gCartRequest.AddFlatRateShippingMethod(shippingMethod, shippingCost);

                //Create extra data to pass
                XmlDocument tempDoc = new System.Xml.XmlDocument();
                tempDoc.LoadXml("<root />");

                XmlNode orderIdNode = tempDoc.CreateElement("OrderID");
                orderIdNode.InnerText = Session["OrderID"].ToString();
                gCartRequest.AddMerchantPrivateDataNode(orderIdNode);

                XmlNode userIdNode = tempDoc.CreateElement("userName");
                userIdNode.InnerText = userName;
                gCartRequest.AddMerchantPrivateDataNode(userIdNode);

                XmlNode amountNode = tempDoc.CreateElement("amount");
                amountNode.InnerText = (double.Parse(Session["GrandTotalAll"].ToString()) * rate).ToString();
                gCartRequest.AddMerchantPrivateDataNode(amountNode);

                XmlNode currencyNode = tempDoc.CreateElement("selectedCurrency");
                currencyNode.InnerText = SelectedCurrency;
                gCartRequest.AddMerchantPrivateDataNode(currencyNode);


                XmlNode portalIDNode = tempDoc.CreateElement("portalID");
                portalIDNode.InnerText = portalID.ToString();
                gCartRequest.AddMerchantPrivateDataNode(portalIDNode);

                XmlNode customerIDNode = tempDoc.CreateElement("customerID");
                customerIDNode.InnerText = customerID.ToString();
                gCartRequest.AddMerchantPrivateDataNode(customerIDNode);

                XmlNode itemIdsNode = tempDoc.CreateElement("itemIds");
                itemIdsNode.InnerText = itemidsWithVar;
                gCartRequest.AddMerchantPrivateDataNode(itemIdsNode);

                XmlNode storeIDNode = tempDoc.CreateElement("storeID");
                storeIDNode.InnerText = storeID.ToString();
                gCartRequest.AddMerchantPrivateDataNode(storeIDNode);

                XmlNode couponCodeNode = tempDoc.CreateElement("couponCode");
                couponCodeNode.InnerText = couponCode;
                gCartRequest.AddMerchantPrivateDataNode(couponCodeNode);

                XmlNode sessionCodeNode = tempDoc.CreateElement("sessionCode");
                sessionCodeNode.InnerText = sessionCode;
                gCartRequest.AddMerchantPrivateDataNode(sessionCodeNode);

                XmlNode pgIDNode = tempDoc.CreateElement("pgID");
                pgIDNode.InnerText = Session["GateWay"].ToString();
                gCartRequest.AddMerchantPrivateDataNode(pgIDNode);

                XmlNode MerchantIDNode = tempDoc.CreateElement("MerchantID");
                MerchantIDNode.InnerText = sf[0].GoogleMerchantID;
                gCartRequest.AddMerchantPrivateDataNode(MerchantIDNode);

                XmlNode MerchantKeyNode = tempDoc.CreateElement("MerchantKey");
                MerchantKeyNode.InnerText = sf[0].GoogleMerchantKey;
                gCartRequest.AddMerchantPrivateDataNode(MerchantKeyNode);

                //Get response
                GCheckoutResponse response = gCartRequest.Send();
                // Post the request for Google checkout

                if (response.IsGood)
                {
                    Response.Redirect(response.RedirectUrl, false);

                }
            }


            if (sf[0].GoogleEnvironmentType == "Production")
            {
                CheckoutShoppingCartRequest gCartRequest = new CheckoutShoppingCartRequest(sf[0].GoogleMerchantID, sf[0].GoogleMerchantKey, GCheckout.EnvironmentType.Production, sf[0].GoogleCurrencyType, 30, false);
                HttpContext.Current.Session["EnvironmentType"] = "Production";

                List<CartInfoforGoogleCheckOut> cd;
                cd = pw.GetCartDetailsForPG(storeID, portalID, customerID, userName, GetCurrentCultureName, sessionCode, country, state, zip, addressID);

                int nCount = 1;
                foreach (CartInfoforGoogleCheckOut oItem in cd)
                {
                    string itemName = oItem.ItemName.ToString();
                    string description = oItem.ShortDescription.ToString();
                    int qty = Convert.ToInt32(oItem.Quantity.ToString());
                    decimal TaxRateValue = Convert.ToDecimal(Convert.ToDouble(oItem.TaxRateValue.ToString()) * rate) / qty;
                    decimal amount = Convert.ToDecimal(Convert.ToDouble(oItem.Price.ToString()) * rate);
                    decimal subTotal = amount + TaxRateValue;

                    gCartRequest.AddItem(itemName, description, subTotal, qty);
                    nCount++;
                }
                nCount--;

                //Send Discount Amount
                if (orderdata2.ObjOrderDetails.DiscountAmount != 0)
                {
                    string itemName = "Cart Discount Amount";
                    string description = "Discount Applied on Cart Items";
                    int qty = 1;
                    discountAmount = 0;
                    decimal discount = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.DiscountAmount) * rate);
                    discountAmount = decimal.Parse(discount.ToString(CultureInfo.InvariantCulture));
                    gCartRequest.AddItem(itemName, description, -discountAmount, qty);
                }
                //Send Coupon Amount
                if (orderdata2.ObjOrderDetails.CouponDiscountAmount != 0)
                {
                    string itemName = "Coupon Discount Amount";
                    string description = "Coupon Discount Applied on Cart Items";
                    int qty = 1;
                    couponDiscountAmount = 0;
                    decimal couponDiscount = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.CouponDiscountAmount) * rate);
                    couponDiscountAmount = decimal.Parse(couponDiscount.ToString(CultureInfo.InvariantCulture));
                    gCartRequest.AddItem(itemName, description, -couponDiscountAmount, qty);
                }
                //Send Reward Discount Amount
                if (orderdata2.ObjOrderDetails.RewardDiscountAmount != 0)
                {
                    string itemName = "Reward Points Discount Amount";
                    string description = "Reward Points Discount Applied on Cart Items";
                    int qty = 1;
                    rewardDiscountAmount = 0;
                    decimal rewardDiscount = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.RewardDiscountAmount) * rate);
                    rewardDiscountAmount = decimal.Parse(rewardDiscount.ToString(CultureInfo.InvariantCulture));
                    gCartRequest.AddItem(itemName, description, -rewardDiscountAmount, qty);
                }
                //tax
                if (orderdata2.ObjOrderDetails.TaxTotal != 0)
                {
                    decimal tax = Convert.ToDecimal(Convert.ToDouble(orderdata2.ObjOrderDetails.TaxTotal) * rate);
                    taxSubTotal = decimal.Parse(tax.ToString(CultureInfo.InvariantCulture));
                }
                subtotalAmount = grandTotal - shippingCost - taxSubTotal + discountAmount + couponDiscountAmount;
                totalTaxableAmount = subtotalAmount - discountAmount - couponDiscountAmount;
                double taxp = Convert.ToDouble((taxSubTotal * 100) / totalTaxableAmount);
                double taxPer = taxp / 100;
                gCartRequest.AddCountryTaxRule(USAreas.ALL, taxPer, false);

                //Shipping Cost
                string shippingMethod;
                if (HttpContext.Current.Session["ShippingMethodName"] != null)
                {
                    shippingMethod = HttpContext.Current.Session["ShippingMethodName"].ToString();
                }
                else
                {
                    shippingMethod = "Default Shipping";
                }
                //shippingMethod = "Default Shipping";
                //decimal shippingcost = Convert.ToDecimal(Convert.ToDouble(Session["ShippingCostAll"].ToString()) * rate);
                gCartRequest.AddFlatRateShippingMethod(shippingMethod, shippingCost);


                //Create extra data to pass
                XmlDocument tempDoc = new System.Xml.XmlDocument();
                tempDoc.LoadXml("<root />");

                XmlNode orderIdNode = tempDoc.CreateElement("OrderID");
                orderIdNode.InnerText = Session["OrderID"].ToString();
                gCartRequest.AddMerchantPrivateDataNode(orderIdNode);

                XmlNode userIdNode = tempDoc.CreateElement("userName");
                userIdNode.InnerText = userName;
                gCartRequest.AddMerchantPrivateDataNode(userIdNode);

                XmlNode amountNode = tempDoc.CreateElement("amount");              
                amountNode.InnerText = (double.Parse(Session["GrandTotalAll"].ToString()) * rate).ToString();
                gCartRequest.AddMerchantPrivateDataNode(amountNode);

                XmlNode currencyNode = tempDoc.CreateElement("selectedCurrency");
                currencyNode.InnerText = SelectedCurrency;
                gCartRequest.AddMerchantPrivateDataNode(currencyNode);

                XmlNode portalIDNode = tempDoc.CreateElement("portalID");
                portalIDNode.InnerText = portalID.ToString();
                gCartRequest.AddMerchantPrivateDataNode(portalIDNode);

                XmlNode customerIDNode = tempDoc.CreateElement("customerID");
                customerIDNode.InnerText = customerID.ToString();
                gCartRequest.AddMerchantPrivateDataNode(customerIDNode);

                XmlNode itemIdsNode = tempDoc.CreateElement("itemIds");
                itemIdsNode.InnerText = itemidsWithVar;
                gCartRequest.AddMerchantPrivateDataNode(itemIdsNode);

                XmlNode storeIDNode = tempDoc.CreateElement("storeID");
                storeIDNode.InnerText = storeID.ToString();
                gCartRequest.AddMerchantPrivateDataNode(storeIDNode);

                XmlNode couponCodeNode = tempDoc.CreateElement("couponCode");
                couponCodeNode.InnerText = couponCode;
                gCartRequest.AddMerchantPrivateDataNode(couponCodeNode);

                XmlNode sessionCodeNode = tempDoc.CreateElement("sessionCode");
                sessionCodeNode.InnerText = sessionCode;
                gCartRequest.AddMerchantPrivateDataNode(sessionCodeNode);

                XmlNode pgIDNode = tempDoc.CreateElement("pgID");
                pgIDNode.InnerText = Session["GateWay"].ToString();
                gCartRequest.AddMerchantPrivateDataNode(pgIDNode);

                XmlNode MerchantIDNode = tempDoc.CreateElement("MerchantID");
                MerchantIDNode.InnerText = sf[0].GoogleMerchantID;
                gCartRequest.AddMerchantPrivateDataNode(MerchantIDNode);

                XmlNode MerchantKeyNode = tempDoc.CreateElement("MerchantKey");
                MerchantKeyNode.InnerText = sf[0].GoogleMerchantKey;
                gCartRequest.AddMerchantPrivateDataNode(MerchantKeyNode);

                //Get response
                GCheckoutResponse response = gCartRequest.Send();
                // Post the request for Google checkout

                if (response.IsGood)
                {
                    Response.Redirect(response.RedirectUrl, false);

                }
            }

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
