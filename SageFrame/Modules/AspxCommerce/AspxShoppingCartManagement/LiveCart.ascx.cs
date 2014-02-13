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
using System.Web;
using AspxCommerce.Core;
using SageFrame.Web;
using SageFrame.Core;

public partial class Modules_AspxShoppingCartManagement_LiveCart : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public decimal TimeToAbandonCart;
    public string UserName, CultureName;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("LiveCart", "/Templates/" + TemplateName + "/css/GridView/tablesort.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("LiveCart", "/js/GridView/jquery.grid.js", "/js/GridView/SagePaging.js", "/js/GridView/jquery.global.js", "/js/GridView/jquery.dateFormat.js",
                         "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/js/ExportToCSV/table2CSV.js",
                         "Modules/AspxCommerce/AspxShoppingCartManagement/js/LiveCart.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js",
                          "/js/CurrencyFormat/jquery.formatCurrency.all.js");

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;

                StoreSettingConfig ssc = new StoreSettingConfig();
                TimeToAbandonCart = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.CartAbandonedTime, StoreID, PortalID, CultureName));

            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

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

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("JTablesorter", ResolveUrl("~/js/GridView/jquery.tablesorter.js"));
    }

    protected void btnLiveCartExportToExcel_Click(object sender, EventArgs e)
    {
        try
        {
            string table = hdnLiveCartValue.Value;
            ExportData excelData = new ExportData();
            excelData.ExportToExcel(ref table, "MyReport_LiveCart");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void ButtonLiveCart_Click(object sender, System.EventArgs e)
    {
        try
        {
            string table = _csvLiveCartHiddenValue.Value;
            ExportData exportData = new ExportData();
            exportData.ExportToCsv(ref table, "MyReport_LiveCart");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
