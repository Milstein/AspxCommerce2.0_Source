using System;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxCommerce_AspxBrandManagement_BrandManage : BaseAdministrationUserControl
{
    public int StoreID;
    public int PortalID, maxFileSize;
    public string UserName;
    public string CultureName;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                Page.ClientScript.RegisterClientScriptInclude("JQueryFormValidate", ResolveUrl("~/js/FormValidation/jquery.form-validation-and-hints.js"));

                IncludeCss("BrandManage", "/Templates/" + TemplateName + "/css/GridView/tablesort.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/JQueryUI/jquery.ui.all.css");
                IncludeJs("BrandManage", "/js/GridView/jquery.grid.js", "/js/GridView/SagePaging.js", "/js/GridView/jquery.global.js", "/js/GridView/jquery.dateFormat.js", "/js/MessageBox/jquery.easing.1.3.js",
                    "/js/MessageBox/alertbox.js", "/Modules/AspxCommerce/AspxBrandManagement/js/BrandManage.js", "/js/AjaxFileUploader/ajaxupload.js");
                PortalID = GetPortalID;
                StoreID = GetStoreID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                maxFileSize = Convert.ToInt32(StoreSetting.GetStoreSettingValueByKey(StoreSetting.MaximumImageSize, StoreID, PortalID, CultureName));
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
        Page.ClientScript.RegisterClientScriptInclude("LANG", ResolveUrl("~/Modules/AspxCommerce/AspxBrandManagement/Language/Brand.js"));
        Page.ClientScript.RegisterClientScriptInclude("JQueryFormValidate", ResolveUrl("~/js/FormValidation/jquery.form-validation-and-hints.js"));
        Page.ClientScript.RegisterClientScriptInclude("J11", ResolveUrl("~/Editors/ckeditor/ckeditor.js"));
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
    }
}
