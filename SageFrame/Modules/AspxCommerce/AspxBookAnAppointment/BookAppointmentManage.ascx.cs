using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxBookAnAppointment_BookAppointmentManage : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName;
    public string modulePath;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
                IncludeCss("BookAppointmentManage",
                           "/Templates/" + TemplateName + "/css/GridView/tablesort.css",
                           "/Templates/" + TemplateName + "/css/MessageBox/style.css",
                           "/Templates/" + TemplateName + "/css/JQueryUI/jquery.ui.all.css");

                IncludeJs("BookAppointmentManage",
                          "/Modules/AspxCommerce/AspxBookAnAppointment/js/BookAppointmentManage.js",
                          "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/GridView/jquery.grid.js",
                          "/js/GridView/jquery.tablesorter.js", "/js/GridView/SagePaging.js",
                          "/js/GridView/jquery.global.js",
                          "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js",
                            "/js/CurrencyFormat/jquery.formatCurrency.all.js",
                            "/js/FormValidation/jquery.validate.js",
                            "/js/ExportToCSV/table2CSV.js",
                          "/js/GridView/jquery.dateFormat.js", "/js/DateTime/date.js", "/js/MessageBox/alertbox.js");
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    protected void btnExportToExcel_Click(object sender, EventArgs e)
    {
        try
        {
            string table = AppHdnValue.Value;
            ExportData excelData = new ExportData();
            excelData.ExportToExcel(ref table, "Appointment_Report");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void btnExportToCsv_Click(object sender, EventArgs e)
    {
        try
        {
            string table = AppCsvHiddenValue.Value;
            ExportData exportData = new ExportData();
            exportData.ExportToCsv(ref table, "Appointment_Report");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
