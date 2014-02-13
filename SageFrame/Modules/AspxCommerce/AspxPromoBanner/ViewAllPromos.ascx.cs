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

public partial class Modules_PromoBanner_ViewAllPromos : BaseAdministrationUserControl
{
    public string modulePath, CultureName, UserName;
    public string NoImagePath = string.Empty;
    public int StoreID, PortalID;
    public string serviceDetailPath;
    protected void Page_Init(object sender, EventArgs e)
    {
        
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            UserName = GetUsername;
            CultureName = GetCurrentCultureName;
            StoreSettingConfig ssc = new StoreSettingConfig();
            serviceDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.SeviceItemDetailURL, StoreID, PortalID, CultureName);
            NoImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
            IncludeCss("Promo", "/Templates/" + TemplateName + "/css/promobanner/css/jquery.lightbox-0.5.css",
                       "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
            IncludeJs("PromoJs", "/js/jquery.tipsy.js");
            InitializeJS();
            BindPromoItems();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("JLightBox", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "/js/jquery.lightbox-0.5.js"));
    }
    Hashtable hst = null;
    private void BindPromoItems()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxRootPath = ResolveUrl("~/");
        string pageExtension = SageFrameSettingKeys.PageExtension;
        hst = AppLocalized.getLocale(modulePath);
        List<PromoBannerInfo> promoItemInfo =
            AspxPromoBannerController.GetAllPromoBanner(aspxCommonObj);
        StringBuilder promoBanner = new StringBuilder();
        if (promoItemInfo != null && promoItemInfo.Count > 0)
        {

            promoBanner.Append("<h2 class=\"cssClassMiddleHeader\"><span>" + getLocale("Promos") +
                               "</span></h2><ul class=\"classPromoViewAll\">");
            foreach (PromoBannerInfo item in promoItemInfo)
            {
                if(string.IsNullOrEmpty(item.ImagePath))
                {
                    item.ImagePath = NoImagePath;
                }
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                promoBanner.Append("<li><a href=\"");
                promoBanner.Append(imagePath + "\"");
                promoBanner.Append(" title=\"" + item.ItemName + "\" rel=\"" + aspxRedirectPath + serviceDetailPath + pageExtension + "?id=" + item.ItemID + "\"><img  title=\"" + item.ItemName + "\" src=\"");
                promoBanner.Append(imagePath.Replace("uploads", "uploads/Large"));
                promoBanner.Append(" \"/></a></li>");
              //  promoBanner.Append("<div class=\"cssPromoBook\"><a href=\"" + aspxRedirectPath + serviceDetailPath + pageExtension + "?id=" + item.ItemID + "\"><span>" + getLocale("Book Now") + "</span></a></div></li>");
            }
            promoBanner.Append("</ul>");
            ltrPromoBanner.Text = promoBanner.ToString();
        }
        else
        {
            promoBanner.Append("<span class=\"cssclassNoBanner sflocale\">" + getLocale("No Promo Uploaded Yet!") +
                               " </span>");
            ltrPromoBanner.Text = promoBanner.ToString();
        }

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

