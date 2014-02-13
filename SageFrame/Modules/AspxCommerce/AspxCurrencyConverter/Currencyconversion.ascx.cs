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
using AspxCommerce.Core;
using SageFrame.Web;
using SageFrame.Core;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;


public partial class Modules_AspxCommerce_AspxCurrencyConverter_Currencyconversion : BaseAdministrationUserControl
{
    public string MainCurrency = "";
    public string SelectedCurrency = "";
    public string Region, MyAccoutURL, SingleAddressCheckOutURL, CompareItemListURL, MyCartURL, AdditionalCVR,ItemMgntPageURL;
    public int StoreID, PortalID;
    public string CultureName;
    public double currencyRate = 1;


    protected void Page_Init(object sender, EventArgs e)
    {

    }
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
            aspxCommonObj.StoreID = GetStoreID;
            aspxCommonObj.PortalID = GetPortalID;
            aspxCommonObj.UserName = GetUsername;
            aspxCommonObj.CultureName = GetCurrentCultureName;
            if (!IsPostBack)
            {

                StoreSettingConfig ssc = new StoreSettingConfig();
                if (Session["CurrencyCode"] != null && Session["CurrencyCode"] != "")
                {
                    SelectedCurrency = Session["CurrencyCode"].ToString();
                }
                else
                {
                    SelectedCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, GetStoreID, GetPortalID, GetCurrentCultureName);
                }
                IncludeJs("Currencyconversion", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js", "/js/CurrencyFormat/jquery.formatCurrency.all.js", "/js/FancyDropDown/fancyDropDown.js", "/Modules/AspxCommerce/AspxCurrencyConverter/js/AspxCurrencyConverter.js");//
                IncludeCss("Currencyconversion", "/Templates/" + TemplateName + "/css/FancyDropDown/fancy.css");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CultureName = GetCurrentCultureName;
                MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);

                MyAccoutURL = ssc.GetStoreSettingsByKey(StoreSetting.MyAccountURL, StoreID, PortalID, CultureName);
                SingleAddressCheckOutURL = ssc.GetStoreSettingsByKey(StoreSetting.SingleCheckOutURL, StoreID, PortalID, CultureName);
                CompareItemListURL = ssc.GetStoreSettingsByKey(StoreSetting.CompareItemURL, StoreID, PortalID, CultureName);
                MyCartURL = ssc.GetStoreSettingsByKey(StoreSetting.ShoppingCartURL, StoreID, PortalID, CultureName);
                AdditionalCVR = ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName);
                ItemMgntPageURL = ssc.GetStoreSettingsByKey(StoreSetting.ItemMgntPageURL, StoreID, PortalID, CultureName);
                if (Session["Region"] != null && Session["Region"] != "")
                {
                    Region = Session["Region"].ToString();
                }
                else
                {
                    Region = StoreSetting.GetRegionFromCurrencyCode(SelectedCurrency, StoreID, PortalID);
                }

                AspxCommerceWebService aws = new AspxCommerceWebService();
                aws.GetCurrencyRateOnChange(aspxCommonObj, MainCurrency, SelectedCurrency, Region);
                if (Session["CurrencyRate"] != null && Session["CurrencyRate"] != "")
                {
                    currencyRate=Math.Round(double.Parse(Session["CurrencyRate"].ToString()),4);
                }
            }
            IncludeLanguageJS();
            //BindCurrencyList();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    public void BindCurrencyList()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        string aspxRootPath = ResolveUrl("~/");
        List<CurrencyInfo> lstCurrency = AspxCurrencyController.BindCurrencyList(aspxCommonObj);
        if (lstCurrency != null && lstCurrency.Count > 0)
        {
            StringBuilder options = new StringBuilder();
            options.Append("<select id=\"ddlCurrency\" class=\"makeMeFancy\">");
            if (Session["SelectedCurrency"] != null)
            {
                MainCurrency = Session["SelectedCurrency"].ToString();
            }

            foreach (CurrencyInfo item in lstCurrency)
            {
                if (item.CurrencyCode == MainCurrency)
                {
                    options.Append("<option selected=\"selected\" data-icon=\"");
                    options.Append(aspxRootPath);
                    options.Append("images/flags/");
                    options.Append(item.BaseImage);

                    options.Append("\"  data-html-text=\"");
                    options.Append(item.CurrencyName);
                    options.Append("-");
                    options.Append(item.CurrencyCode);
                    options.Append("\" region=");
                    options.Append(item.Region);
                    options.Append("  value=\"");
                    options.Append(item.CurrencyCode);
                    options.Append("\" >");
                    options.Append(item.CurrencyName);
                    options.Append("-");
                    options.Append(item.CurrencyCode);
                    options.Append("</option>");
                }
                else
                {
                    options.Append("<option data-icon=\"");
                    options.Append(aspxRootPath);
                    options.Append("images/flags/");
                    options.Append(item.BaseImage);
                    options.Append("\"  data-html-text=\"");
                    options.Append(item.CurrencyName);
                    options.Append("-");
                    options.Append(item.CurrencyCode);
                    options.Append("\" region=");
                    options.Append(item.Region);

                    options.Append("  value=\"");
                    options.Append(item.CurrencyCode);
                    options.Append("\" >");
                    options.Append(item.CurrencyName);
                    options.Append("-");
                    options.Append(item.CurrencyCode);
                    options.Append("</option>");
                }
            }
            options.Append("</select>");
            //litCurrency.Text = options.ToString();

        }
    }
}
