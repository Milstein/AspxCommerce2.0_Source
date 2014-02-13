  using System;
using System.Collections.Generic;
using System.Linq;
  using System.Text;
  using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
  using AspxCommerce.Core;
  using SageFrame.Web;

public partial class Modules_PromoBanner_PromoBannerView : BaseAdministrationUserControl
{
    public string modulePath, CultureName, UserName,viewPageName;
    public int StoreID, PortalID, count;
    public int rowTotal = 0;
    public string serviceDetailPath;

    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            UserName = GetUsername;
            CultureName = GetCurrentCultureName;
            InitializeJS();
            IncludeCss("PromoBanner", "/Templates/" + TemplateName + "/css/promobanner/css/style.css");
            StoreSettingConfig ssc = new StoreSettingConfig();
            serviceDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.SeviceItemDetailURL, StoreID, PortalID, CultureName);
            GetPromoBannerSetting();
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
        Page.ClientScript.RegisterClientScriptInclude("JQueryEasing",
                                                      ResolveUrl(this.AppRelativeTemplateSourceDirectory +
                                                                 "/js/jquery.easing.js"));
        Page.ClientScript.RegisterClientScriptInclude("JBannerScript",
                                                      ResolveUrl(this.AppRelativeTemplateSourceDirectory +
                                                                 "/js/script.js"));
    }

    private void GetPromoBannerSetting()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName; 
        string aspxRootPath = ResolveUrl("~/");
        List<PromoBannerInfo> promoItemSettingInfo =
            AspxPromoBannerController.GetPromoSetting(aspxCommonObj);
        if (promoItemSettingInfo != null && promoItemSettingInfo.Count > 0)
        {
            foreach (PromoBannerInfo item in promoItemSettingInfo)
            {
                count = item.BannerCount;
                viewPageName = item.PageName;
            }
        }
    }

    private void BindPromoItems()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string aspxRootPath = ResolveUrl("~/");
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<PromoBannerInfo> promoItemInfo =
            AspxPromoBannerController.GetPromoBanner(count, aspxCommonObj);
        if (promoItemInfo != null && promoItemInfo.Count > 0)
        {
            StringBuilder promoItemContains = new StringBuilder();
            StringBuilder promoItemNav = new StringBuilder();
            foreach (PromoBannerInfo item in promoItemInfo)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                rowTotal = item.RowTotal;
                promoItemContains.Append("<li><a href=");
                promoItemContains.Append(aspxRootPath);
                promoItemContains.Append(serviceDetailPath + pageExtension + "?id=");
                promoItemContains.Append(item.ItemID);
                promoItemContains.Append("><img src=\"");
                promoItemContains.Append(imagePath);
                promoItemContains.Append("\"/></a></li>");

                promoItemNav.Append("<li><div><img src=\"");
                promoItemNav.Append(imagePath.Replace("uploads", "uploads/Medium"));
                promoItemNav.Append("\"/></div></li>");
            }
            ltrBannerMain.Text = promoItemContains.ToString();
            ltrBannerNav.Text = promoItemNav.ToString();
            if(rowTotal>count)
            {
                StringBuilder viewMore = new StringBuilder();
                viewMore.Append("<a href=" + aspxRedirectPath + viewPageName + pageExtension + ">View All Promos</a>");
                ltrViewMore.Text = viewMore.ToString();
            }
        }

    }
}

