using System;
using System.IO;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Testimonial.Controller;
using SageFrame.Testimonial.Info;

public partial class Modules_Testimonial_TestimonialEdit : BaseAdministrationUserControl
{
    public string basePath = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadRecordsOnGrid();
            IncludeCss("Testimonial", "/Templates/" + TemplateName + "/css/JQueryUI/jquery.ui.all.css");
            IncludeJs("Testimonial", "/js/JQueryUI/jquery-ui-1.8.10.custom.js","/js/DateTime/date.js");
        }
        divTestimonialForm.Visible = false;
        divImage.Visible = false;
        basePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        LoadImage();     
    }

    private void LoadImage()
    {
        imbSave.ImageUrl = GetTemplateImageUrl("imgsave.png", true);
        imbAddnewInfo.ImageUrl = GetTemplateImageUrl("imgadd.png", true);
        imbCancel.ImageUrl = GetTemplateImageUrl("imgcancel.png", true);
        imbDeletepic.ImageUrl = GetTemplateImageUrl("imgdelete.png", true);
    }

    protected void imbSave_Click(object sender, ImageClickEventArgs e)
    {
        AddUpdateRecord();
    }

    private void AddUpdateRecord()
    {
        string imagefile=string.Empty;
        TestimonialController clt = new TestimonialController();
        TestimonialInfo obj = new TestimonialInfo();

        if (ViewState["TestimonialID"] != null && ViewState["TestimonialID"].ToString() != string.Empty)
        {
            obj.TestimonialID  = Int32.Parse(ViewState["TestimonialID"].ToString());   
        }
        else
        {
           obj.TestimonialID = 0;
        }

        obj.PortalID = GetPortalID;
        obj.UserModuleID = int.Parse(SageUserModuleID);
        obj.UserName = txtName.Text;      
        obj.Address = txtAddress.Text;
        obj.WebUrl = txtWeburl.Text;
        obj.Title = txtTitle.Text;
        obj.Testimonial = txtTestimonial.Value;
        obj.AddedBy = GetUsername;
        obj.TestimonialDate = DateTime.Parse(txtDate.Text);
        string TargetFolder = Server.MapPath(basePath + "image/UploadedImages");
        if (!Directory.Exists(TargetFolder))
        {
            Directory.CreateDirectory(TargetFolder);
        }
      
        imagefile = ProfileImage.FileName.Replace(" ", "_");

        if (ViewState["Image"] == null && imagefile == "")
        {
            obj.Image = "";
        }
        else if (imagefile == "" && ViewState["Image"] != null)
        {
            obj.Image = ViewState["Image"].ToString();
        }
        else
        {
            if (ProfileImage.HasFile)
            {
                System.Drawing.Image.GetThumbnailImageAbort thumbnailImageAbortDelegate = new System.Drawing.Image.GetThumbnailImageAbort(ThumbnailCallback);
                obj.Image = imagefile;
                using (System.Drawing.Bitmap originalImage = new System.Drawing.Bitmap(ProfileImage.PostedFile.InputStream))
                {
                    using (System.Drawing.Image thumbnail = originalImage.GetThumbnailImage(250, 150, thumbnailImageAbortDelegate, IntPtr.Zero))
                    {
                        thumbnail.Save(System.IO.Path.Combine(TargetFolder, imagefile));
                    }
                }
            }
        }
        clt.SaveRecord(obj);
        ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Testimonial/ModuleLocalText", "SaveRecordSuccessfully"), "", SageMessageType.Success);
        LoadRecordsOnGrid();
        divGrid.Visible = true;   
        ClearField();
    }

    public bool ThumbnailCallback()
    {
        return false;
    }

    private void ClearField()
    {
        txtAddress.Text = string.Empty;
        txtTestimonial.Value = string.Empty;
        txtName.Text = string.Empty;      
        txtTitle.Text = string.Empty;
        txtWeburl.Text = string.Empty;
        txtDate.Text = string.Empty;
        ViewState["Image"] = string.Empty;
        ViewState["TestimonialID"] = string.Empty;
       
    }

    private void LoadRecordsOnGrid()
    {
        try
        {
            TestimonialController clt = new TestimonialController();
            List<TestimonialInfo> lstData = clt.LoadRecordsOnGrid(GetPortalID, int.Parse(SageUserModuleID));
            gdvTestRecord.DataSource = lstData;
            gdvTestRecord.DataBind();
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    protected void gdvTestRecord_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        try
        {
            int OprationID = Int32.Parse(e.CommandArgument.ToString());
            switch (e.CommandName.ToString())
            {
                case "Delete":
                    Delete(OprationID);
                    break;
                case "Edit":
                    Edit(OprationID);
                    break;
            }
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    private void Delete(int OperationID)
    {
        try
        {
            TestimonialController ctl = new TestimonialController();
            TestimonialInfo obj = ctl.GetImage(OperationID, GetPortalID, int.Parse(SageUserModuleID));
            DeleteImage(obj.Image);
            ctl.DeleteRecordByID(OperationID);
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Testimonial/ModuleLocalText", "RecordDeletedSuccessfully"), "", SageMessageType.Success);
            LoadRecordsOnGrid();
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    private void  DeleteImage(string userImage)
    {
        string imagepath = Server.MapPath(basePath + "image/UploadedImages/") + userImage;
        if (File.Exists(imagepath))
        {
            File.Delete(imagepath);
        }

    }

    private void Edit(int OperationID)
    {
        try
        {
            TestimonialController ctl = new TestimonialController();
            TestimonialInfo obj = ctl.GetRecordByID(OperationID,GetPortalID,int.Parse(SageUserModuleID));
            txtName.Text = obj.UserName;
            txtAddress.Text = obj.Address;
            txtDate.Text = CommonHelper.ShortTimeReturn(obj.TestimonialDate);
            txtWeburl.Text = obj.WebUrl;            
            txtTestimonial.Value = obj.Testimonial;
            ViewState["Image"] = obj.Image;
            ViewState["TestimonialID"] = obj.TestimonialID;
            //Session["Image"] = obj.Image;
            //Session["TestimonialID"] = obj.TestimonialID;
            if (obj.Image != "")
            {
                divImage.Visible = true;
                imgProfilepic.ImageUrl = basePath + "image/UploadedImages/" + obj.Image;
            }
            else
            {
                divImage.Visible = false;
            }
            ShowHidePage();

        }
        catch (Exception e)
        {
            throw e;
        }

    }

    private void ShowHidePage()
    {
        divGrid.Visible = false;
        divTestimonialForm.Visible = true;
    }

    protected void gdvTestRecord_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton btnDelete = (ImageButton)e.Row.FindControl("ImgDelete");
            if (btnDelete != null)
            {
                btnDelete.Attributes.Add("onclick", "javascript:return " +
                    "confirm('Are you sure to delete?')");
            }
        }
    }
    protected void gdvTestRecord_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {

    }
    protected void gdvTestRecord_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {

    }
    protected void gdvTestRecord_RowEditing(object sender, GridViewEditEventArgs e)
    {

    }
    protected void gdvTestRecord_RowUpdating(object sender, GridViewUpdateEventArgs e)
    {

    }

    protected void imbAddnewInfo_Click(object sender, ImageClickEventArgs e)
    {
        divTestimonialForm.Visible = true;
        divGrid.Visible = false;
    }
    protected void imbCancel_Click(object sender, ImageClickEventArgs e)
    {
        divTestimonialForm.Visible = false;
        divGrid.Visible = true;        
        ClearField();
    }
    protected void imbDeletepic_Click(object sender, ImageClickEventArgs e)
    {
        string image = Session["Image"].ToString();
        string fileimg = Server.MapPath(basePath + "image/") + image;
        if(File.Exists(fileimg))
        {
            File.Delete(fileimg);
        }
        ViewState["Image"] = string.Empty;
        divImage.Visible = false;
        ShowHidePage();
    }
}
