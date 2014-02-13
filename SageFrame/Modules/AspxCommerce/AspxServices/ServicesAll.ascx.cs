using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxServices_ServicesAll : BaseAdministrationUserControl
{
    public string modulePath;
    public string NoImageService;
    private AspxCommonInfo aspxCommonObj = new AspxCommonInfo();

    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {

                modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
                aspxCommonObj.StoreID = GetStoreID;
                aspxCommonObj.PortalID = GetPortalID;
                aspxCommonObj.UserName = GetUsername;
                aspxCommonObj.CultureName = GetCurrentCultureName;
                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageService = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, aspxCommonObj.StoreID,
                                                           aspxCommonObj.PortalID, aspxCommonObj.CultureName);
            }
            BindAllServices();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        InitializeJS();
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("AspxServices",ResolveUrl(this.AppRelativeTemplateSourceDirectory +"/js/Services.js"));
    }

    private Hashtable hst = null;

    private void BindAllServices()
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<ServiceInfo> lstAllService = AspxServiceController.GetAllServices(aspxCommonObj);
        StringBuilder allServiceViewBld = new StringBuilder();

        allServiceViewBld.Append("<div id=\"divBindAllServices\" class=\"cssClassAllService\">");
        if (lstAllService != null && lstAllService.Count > 0)
        {
            foreach (var allserviceInfo in lstAllService)
            {
                string serviceName = allserviceInfo.ServiceName;
                string imagePath = "Modules/AspxCommerce/AspxCategoryManagement/uploads/" + allserviceInfo.ServiceImagePath;
                if (allserviceInfo.ServiceImagePath == "")
                {
                    imagePath = NoImageService;
                }
                var hrefServices = aspxRedirectPath + "service/" + fixedEncodeURIComponent(serviceName) + pageExtension;
                allServiceViewBld.Append("<li><a href=\"" + hrefServices + "\">");
                allServiceViewBld.Append("<div class=\"cssClassImgWrapper\">");
                allServiceViewBld.Append("<img src=\"" + aspxRootPath +
                                       imagePath.Replace("uploads", "uploads/Medium") +
                                         "\"/>");
                allServiceViewBld.Append("</div><h3>" + serviceName + "</h3></a></li>");
            }
        }
        else
        {
            allServiceViewBld.Append("<span class=\"cssClassNotFound\">" + getLocale("There are no services available!") +
                                     "</span>");
        }
        allServiceViewBld.Append("</div>");
        ltrBindAllServices.Text = allServiceViewBld.ToString();
    }

    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }
}