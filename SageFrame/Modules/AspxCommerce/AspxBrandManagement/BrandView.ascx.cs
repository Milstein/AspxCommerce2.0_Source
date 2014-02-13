using System;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxCommerce_AspxBrandManagement_BrandView : BaseAdministrationUserControl
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
                IncludeJs("BrandManageView", "/Modules/AspxCommerce/AspxBrandManagement/js/BrandView.js");
                PortalID = GetPortalID;
                StoreID = GetStoreID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                //Page.ClientScript.RegisterClientScriptInclude("LANG", ResolveUrl("~/Modules/AspxCommerce/AspxBrandManagement/Language/Brand.js"));

                BrandRss = ssc.GetStoreSettingsByKey(StoreSetting.BrandRss, StoreID, PortalID, CultureName);
                if (BrandRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
