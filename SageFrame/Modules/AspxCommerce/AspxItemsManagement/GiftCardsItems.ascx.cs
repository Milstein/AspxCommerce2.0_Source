using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using AspxCommerce.Core;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxItemsManagement_GiftCardsItems : BaseAdministrationUserControl
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
                IncludeCss("GiftCardItems", "/Templates/" + TemplateName + "/css/GridView/tablesort.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/PopUp/style.css", "/Templates/" + TemplateName + "/css/JQueryUI/jquery.ui.all.css");
                IncludeJs("GiftCardItemsjs", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/GridView/jquery.grid.js", "/js/GridView/SagePaging.js",
                           "/js/GridView/jquery.global.js", "/js/GridView/jquery.dateFormat.js", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js",
                           "/js/PopUp/custom.js", "/js/ExportToCSV/table2CSV.js", "/Modules/AspxCommerce/AspxItemsManagement/js/GiftCardItems.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js", "/js/CurrencyFormat/jquery.formatCurrency.all.js");

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
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        try
        {
            string table = HdnValue.Value;
            ExportData excelData = new ExportData();
            excelData.ExportToExcel(ref table, "MyReport_GiftCardItems");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    protected void ButtonLowStock_Click(object sender, EventArgs e)
    {
        try
        {
            string table = _csvGiftCardHiddenCsv.Value;
            ExportData exportData = new ExportData();
            exportData.ExportToCsv(ref table, "MyReport_GiftCardItems");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
