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
using System.Web;
using AspxCommerce.Core;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxItemsManagement_MostViewedItem : BaseAdministrationUserControl
{
    public int StoreID;
    public int PortalID;
    public string Username;
    public string CultureName;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("MostViewedItems", "/Templates/" + TemplateName + "/css/GridView/tablesort.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/PopUp/style.css", "/Templates/" + TemplateName + "/css/JQueryUI/jquery.ui.all.css");
                IncludeJs("MostViewedItems", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/GridView/jquery.grid.js", "/js/GridView/SagePaging.js",
                          "/js/GridView/jquery.global.js", "/js/GridView/jquery.dateFormat.js", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js",
                            "/js/AjaxFileUploader/ajaxupload.js", "/js/PopUp/custom.js", "/js/ExportToCSV/table2CSV.js",
                            "/Modules/AspxCommerce/AspxItemsManagement/js/MostViewedItems.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js", "/js/CurrencyFormat/jquery.formatCurrency.all.js");

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                Username = GetUsername;
                CultureName = GetCurrentCultureName;
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
        Page.ClientScript.RegisterClientScriptInclude("JQueryFormValidate", ResolveUrl("~/js/FormValidation/jquery.form-validation-and-hints.js"));
        Page.ClientScript.RegisterClientScriptInclude("J9", ResolveUrl("~/Editors/ckeditor/ckeditor.js"));
        Page.ClientScript.RegisterClientScriptInclude("J10", ResolveUrl("~/js/encoder.js"));
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        try
        {
            string table = HdnValue.Value;
            ExportData excelData = new ExportData();
            excelData.ExportToExcel(ref table, "MyReport_MostViewedItems");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void ButtonMostViewed_Click(object sender, System.EventArgs e)
    {
        try
        {
            string table = _csvMostViewedHiddenCsv.Value;
            ExportData exportData = new ExportData();
            exportData.ExportToCsv(ref table, "MyReport_MostViewedItems");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
