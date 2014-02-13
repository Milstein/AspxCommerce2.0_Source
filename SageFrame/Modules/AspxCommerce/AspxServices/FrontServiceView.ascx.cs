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

public partial class Modules_AspxCommerce_AspxServices_FrontServiceView : BaseAdministrationUserControl
{
    public string modulePath;
    public string NoImageService;
    public string ServiceTypeItemRss, RssFeedUrl;
    public int count,rowTotal;
    AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            aspxCommonObj.StoreID = GetStoreID;
            aspxCommonObj.PortalID = GetPortalID;
            aspxCommonObj.UserName = GetUsername;
            aspxCommonObj.CultureName = GetCurrentCultureName;
            StoreSettingConfig ssc = new StoreSettingConfig();
            NoImageService = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, aspxCommonObj.StoreID, aspxCommonObj.PortalID,
                                                       aspxCommonObj.CultureName);
            ServiceTypeItemRss = ssc.GetStoreSettingsByKey(StoreSetting.ServiceTypeItemRss, aspxCommonObj.StoreID, aspxCommonObj.PortalID,
                                                           aspxCommonObj.CultureName);
            count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfServiceCategory, aspxCommonObj.StoreID, aspxCommonObj.PortalID,
                                                           aspxCommonObj.CultureName));
            if (ServiceTypeItemRss.ToLower() == "true")
            {
                RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName);
            }
            BindFrontServiceView();
           
        }

        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("AspxFrontServices", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
        IncludeJs("AspxFrontServices", "/Modules/AspxCommerce/AspxServices/js/FrontServiceView.js", "/js/jquery.tipsy.js");
        IncludeLanguageJS();
    }

    Hashtable hst = null;
    public void BindFrontServiceView()
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<FrontServiceView> lstService = AspxServiceController.GetFrontServices(aspxCommonObj, count);
        StringBuilder frontServiceView = new StringBuilder();
        if (lstService != null && lstService.Count > 0)
        {
            
            frontServiceView.Append("<div id=\"divFrontService\"><ul>");
            foreach (var serviceView in lstService)
            {
                string serviceDesc = "";
                int index = 0;
                string serviceDetails = "";
                rowTotal = serviceView.RowTotal;
                if (serviceView.ServiceDetail != "" || serviceView.ServiceDetail != "null")
                {
                    serviceDesc = serviceView.ServiceDetail;
                    if (serviceDesc.IndexOf(' ') > 1)
                    {
                        if (serviceDesc.LastIndexOf(' ') > 60)
                        {
                            index = serviceDesc.Substring(0, 60).LastIndexOf(' ');
                            serviceDetails = serviceDesc.Substring(0, index);
                            serviceDetails = serviceDetails + "...";
                        }
                    }
                    else
                    {
                        serviceDetails = serviceDesc;
                    }
                }
                else
                {
                    serviceDetails = "";
                }
                string imagePath = "Modules/AspxCommerce/AspxCategoryManagement/uploads/" + serviceView.ServiceImagePath;
                if (serviceView.ServiceImagePath == "")
                {
                    imagePath = NoImageService;
                }
                var hrefServices = aspxRedirectPath + "service/" + fixedEncodeURIComponent(serviceView.ServiceName) + pageExtension;
                frontServiceView.Append("<li><h3><a href=\"" + hrefServices + "\"><span class=\"cssClassImgWrapper\">" + serviceView.ServiceName);
                frontServiceView.Append("<img title=\"" + serviceView.ServiceName + "\" alt=\"" + serviceView.ServiceName + "\" src=\"" + aspxRootPath + imagePath.Replace("uploads", "uploads/Medium") + "\"/></span></a></h3><p>" + serviceDetails + "</p></li>");
            }
            frontServiceView.Append("</ul></div>");
            if (rowTotal > count)
            {
                frontServiceView.Append("<div id=\"divViewMoreServices\" class=\"cssViewMore\">");
                frontServiceView.Append("<a href=\"" + aspxRootPath + "Services" + pageExtension + "\">" +
                                        getLocale("View More") + "</a>");
                frontServiceView.Append("</div>");
            }
        }
        else
        {
            frontServiceView.Append("<div id=\"divFrontService\"><span class=\"cssClassNotFound\">" +
                                    getLocale("There are no services available!") + "</span></div>");
        }
        ltrForntServiceView.Text = frontServiceView.ToString();
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