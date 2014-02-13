using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Testimonial.Controller;
using SageFrame.Testimonial.Info;

public partial class Modules_Testimonial_TestimonialView : BaseAdministrationUserControl
{
    public string baseUrl = string.Empty;
    public int PortalID;
    public int UserModuleID;
    public bool ActiveImage;
    public string NoOListToDisplay;
    public bool ActiveDate;
    public bool ActiveViewMore;
    protected void Page_Load(object sender, EventArgs e)
    {
        baseUrl = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        PortalID = GetPortalID;
        UserModuleID = int.Parse(SageUserModuleID);  
		Page.ClientScript.RegisterClientScriptInclude("Encoder", ResolveUrl("~/js/encoder.js"));		
        IncludeJsCss();
        LoadSetting();
    }

    private void LoadSetting()
    {
        try
        {
            TestimonialController clt = new TestimonialController();
            TestimonialSettingInfo obj = new TestimonialSettingInfo();
            obj = clt.GetSetting(GetPortalID, int.Parse(SageUserModuleID));
            ActiveImage = obj.Image;
            NoOListToDisplay = obj.NoOfTestimonial;
            ActiveDate = obj.DateTime;
            ActiveViewMore = obj.ViewMore;
           
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void IncludeJsCss()
    {
        IncludeJs("Testimonial","/Modules/Testimonial/js/Testimonial.js");
        IncludeLanguageJS();
    }  
}
