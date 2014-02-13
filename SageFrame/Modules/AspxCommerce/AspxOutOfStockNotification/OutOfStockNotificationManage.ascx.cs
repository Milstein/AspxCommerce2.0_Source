using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Collections;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Web;
using SageFrame.Framework;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using System.Web.Security;

public partial class Modules_AspxCommerce_AspxOutOfStockNotification_OutOfStockNotificationManage : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName, userEmail;
    protected void page_init(object sender, EventArgs e)
    {
    //    try
    //    {
    //        InitializeJS();
    //        string strTemplatePath = "";
    //        ArrayList cssList = new ArrayList();
    //        cssList.Add("~/Templates/Default/css/admintemplate.css");
    //        cssList.Add("~/Templates/Default/css/GridView/tablesort.css");
    //        cssList.Add("~/Templates/Default/css/MessageBox/style.css");
    //        foreach (string css in cssList)
    //        {
    //            strTemplatePath = css;
    //            IncludeCssFile(strTemplatePath);
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        ProcessException(ex);
    //    }
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
        if (!IsPostBack)
        {
            IncludeCss("OutOfStockNotification", "/Templates/" + TemplateName + "/css/GridView/tablesort.css",
                       "/Templates/" + TemplateName + "/css/MessageBox/style.css");
            IncludeJs("OutOfStockNotification", "/js/GridView/jquery.grid.js", "/js/GridView/SagePaging.js",
                      "/js/GridView/jquery.global.js", "/js/GridView/jquery.dateFormat.js",
                      "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/Modules/AspxCommerce/AspxOutOfStockNotification/js/stockNotification.js");


            StoreID = GetStoreID;
            PortalID = GetPortalID;
            UserName = GetUsername;
            CultureName = GetCurrentCultureName;
            FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
            if (ticket != null && ticket.Name != ApplicationKeys.anonymousUser)
            {
                MembershipController member = new MembershipController();
                UserInfo userDetail = member.GetUserDetails(GetPortalID, GetUsername);
                userEmail = userDetail.Email;
            }
        }
        IncludeLanguageJS();
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalServicePath",
                                                " var aspxservicePath='" + ResolveUrl("~/") +
                                                "Modules/AspxCommerce/AspxCommerceServices/" + "';", true);
        lblOutofStockNotificationManage.Text = "Out of Stock Notification Management";
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("JTablesorter", ResolveUrl("~/js/GridView/jquery.tablesorter.js"));
    }
}
