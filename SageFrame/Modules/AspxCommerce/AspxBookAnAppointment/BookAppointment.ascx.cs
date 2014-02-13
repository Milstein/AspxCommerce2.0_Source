using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxBookAnAppoinment_BookAppointment : BaseAdministrationUserControl
{
    public int StoreID, PortalID,CustomerID;
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
                CustomerID = GetCustomerID;
                modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
                IncludeCss("BookAppointment", "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("BookAppointment", "/Modules/AspxCommerce/AspxBookAnAppointment/js/BookAppointment.js",
                          "/js/FormValidation/jquery.validate.js",
                          "/js/GridView/jquery.dateFormat.js",
                          "/js/MessageBox/alertbox.js");
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
