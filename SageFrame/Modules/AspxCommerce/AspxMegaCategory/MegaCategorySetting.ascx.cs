using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxMegaCategory_MegaCategorySetting : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string CultureName,MegaModulePath;
    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeJs("MegaCategorySetting", "/Modules/AspxCommerce/AspxMegaCategory/js/MegaCategorySetting.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                CultureName = GetCurrentCultureName;
                MegaModulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
