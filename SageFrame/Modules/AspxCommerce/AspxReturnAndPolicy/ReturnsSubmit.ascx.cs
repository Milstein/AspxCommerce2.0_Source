using System;
using System.Web.UI;
using SageFrame.Web;
using System.Web;
using System.Web.SessionState;


public partial class Modules_AspxCommerce_AspxReturnAndPolicy_ReturnsSubmit : BaseAdministrationUserControl
{
    public int storeID, portalID, customerID;
    public string userName;
    public string cultureName, sessionCode;
    public bool IsUseFriendlyUrls = true;
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
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
        if (!IsPostBack)
        {
            Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/Modules/AspxCommerce/AspxReturnAndPolicy/js/ReturnsSubmit.js"));
            IncludeCss("ReturnsSubmit", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery.ui.all.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
            IncludeJs("ReturnsSubmit", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/FormValidation/jquery.validate.js", "/js/jquery.cookie.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/js/jquery.tipsy.js");
          
            storeID = GetStoreID;
            portalID = GetPortalID;
            userName = GetUsername;
            customerID = GetCustomerID;
            cultureName = GetCurrentCultureName;
            sessionCode = HttpContext.Current.Session.SessionID.ToString();
        }
        IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
       
        
    }
}
