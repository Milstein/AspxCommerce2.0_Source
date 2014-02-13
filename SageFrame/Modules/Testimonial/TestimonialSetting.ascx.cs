using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Testimonial.Controller;
using SageFrame.Testimonial.Info;

public partial class Modules_Testimonial_TestimonialSetting : BaseAdministrationUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {       
        if (!IsPostBack)
        {
            LoadSetting();  
        }
        Page_Init();       
    }

    private void Page_Init()
    {
        imbSaveSetting.ImageUrl = GetTemplateImageUrl("imgsave.png", true);
        IncludeJs("Testimonial", "Modules/AspxCommerce/Testimonial/js/jquery.numeric.js");
    }

    private void LoadSetting()
    {
        try
        {
            TestimonialController clt = new TestimonialController();
            TestimonialSettingInfo obj = new TestimonialSettingInfo();
            obj = clt.GetSetting(GetPortalID, int.Parse(SageUserModuleID));
            txtNoOfList.Text = obj.NoOfTestimonial;
            chkImage.Checked = obj.Image;
            chkDateTime.Checked = obj.DateTime;
            chkViewMore.Checked = obj.ViewMore;
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void imbSaveSetting_Click(object sender, ImageClickEventArgs e)
    {
        try
        {
            string NoOfDisplayList = txtNoOfList.Text;
            SaveSetting("NoOfTestimonial", NoOfDisplayList.ToString(), Int32.Parse(SageUserModuleID), GetUsername,GetUsername, GetPortalID);
            SaveSetting("Image", Convert.ToString(chkImage.Checked), Int32.Parse(SageUserModuleID), GetUsername,GetUsername, GetPortalID);
            SaveSetting("DateTime", Convert.ToString(chkDateTime.Checked), Int32.Parse(SageUserModuleID), GetUsername, GetUsername, GetPortalID);
            SaveSetting("ViewMore", Convert.ToString(chkViewMore.Checked), Int32.Parse(SageUserModuleID), GetUsername, GetUsername, GetPortalID);  
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/AspxCommerce/Testimonial/ModuleLocalText", "TestimonialSettingSaveSuccessfully"), "", SageMessageType.Success);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void SaveSetting(string Key, string value, int UserModuleID, string AddedBy, string UpdatedBy, int PortalID)
    {
        TestimonialController obj = new TestimonialController();
        obj.SaveSetting(Key, value, UserModuleID, AddedBy, UpdatedBy, PortalID);
    }

}
