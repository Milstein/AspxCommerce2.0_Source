using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class Modules_PromoBanner_PromoBannerSetting : BaseAdministrationUserControl
{
    public string modulePath, CultureName, UserName;
    public int StoreID, PortalID;
    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            UserName = GetUsername;
            CultureName = GetCurrentCultureName;
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeLanguageJS();
    }
   
}