using System;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections.Generic;
using System.Text;
using System.Collections;

public partial class Modules_AspxCommerce_AspxBrandManagement_BrandSlider : BaseAdministrationUserControl
{
    public int StoreID;
    public int PortalID;
    public string UserName;
    public string CultureName;
    public string BrandRss, RssFeedUrl;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                StoreSettingConfig ssc = new StoreSettingConfig();
                IncludeJs("BrandSlider", "/Modules/AspxCommerce/AspxBrandManagement/js/BrandSlide.js", "/js/Sliderjs/jquery.bxSlider.js","/js/jquery.tipsy.js");
                IncludeCss("BrandSlider", "/Templates/" + TemplateName + "/css/brandslider/css/bx_styles.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");                
                PortalID = GetPortalID;
                StoreID = GetStoreID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
               // Page.ClientScript.RegisterClientScriptInclude("LANG", ResolveUrl("~/Modules/AspxCommerce/AspxBrandManagement/Language/Brand.js"));

                BrandRss = ssc.GetStoreSettingsByKey(StoreSetting.BrandRss, StoreID, PortalID, CultureName);
                if (BrandRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
            }
            GetAllBrandForSlider();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    public void GetAllBrandForSlider()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string aspxRootPath = ResolveUrl("~/");
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<BrandInfo> lstBrand = AspxBrandController.GetAllBrandForSlider(aspxCommonObj);
        StringBuilder element = new StringBuilder();
        int rowTotal = 0;
        if (lstBrand != null && lstBrand.Count > 0)
        {
            element.Append("<ul id=\"brandSlider\">");
            foreach (BrandInfo value in lstBrand)
            {
                rowTotal = value.RowTotal;
                var imagepath = aspxRootPath + value.BrandImageUrl;
                element.Append("<li><a href=\"");
                element.Append(aspxRedirectPath);
                element.Append("brand/");
                element.Append(value.BrandName);
                element.Append(pageExtension);
                element.Append("\"><img brandId=\"");
                element.Append(value.BrandID);
                element.Append("\" src=\"");
                element.Append(imagepath.Replace("uploads", "uploads/Small"));
                element.Append("\" alt=\"");
                element.Append(value.BrandName);
                element.Append("\" title=\"");
                element.Append(value.BrandName);
                element.Append("\"  /></a></li>");
            }
            element.Append("</ul>");
            element.Append("<span class=\"cssClassViewMore\"><a href=\"");
            element.Append(aspxRedirectPath);
            element.Append("Shop-By-Brand");
            element.Append(pageExtension);
            element.Append("\">"+ getLocale("View All Brands")+ "</a></span>");
        }

        if (rowTotal == 0)
        {
            element.Append("<span class='cssClassNotFound'>");
            element.Append(getLocale("The store has no brand!"));
            element.Append("</span>");
        }
        litSlide.Text = element.ToString();
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
