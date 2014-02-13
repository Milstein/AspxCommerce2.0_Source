using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class Modules_Testimonial_TestimonialViewDetail : BaseAdministrationUserControl
{
    public string baseUrl = string.Empty;
    public int PortalID;
    public int UserModuleID;
    protected void Page_Load(object sender, EventArgs e)
    {
        baseUrl = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        PortalID = GetPortalID;
        UserModuleID = int.Parse(SageUserModuleID);
        IncludeJsCss();  
    }

    private void IncludeJsCss()
    {
        IncludeJs("Testimonial", "/Modules/Testimonial/js/TestimonialViewDetail.js");
        IncludeLanguageJS();
    }  
}
