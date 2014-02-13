using System;
using System.Web;
using SageFrame.Web;
using AspxCommerce.Core;

public partial class Modules_AspxCommerce_AspxHeavyDiscount_HeavyDiscountSetting : BaseAdministrationUserControl
{
    public string ModuleServicePath;
    public int NoOfItemShown, HeavyDiscountPercent;
    public string EnableHeavyDiscountItems;
    public AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            ModuleServicePath = ResolveUrl("~") + "Modules/AspxCommerce/AspxCommerceServices/";

            aspxCommonObj.StoreID = GetStoreID;
            aspxCommonObj.PortalID = GetPortalID;
            aspxCommonObj.CultureName = GetCurrentCultureName;
            AspxCommerceWebService objHeavyDiscount = new AspxCommerceWebService();
            HeavyDiscountSettingInfo objSettingInfo = objHeavyDiscount.GetHeavyDiscountSetting(aspxCommonObj);
            NoOfItemShown = objSettingInfo.NoOfItemShown;
            EnableHeavyDiscountItems = objSettingInfo.EnableModule;
            HeavyDiscountPercent = objSettingInfo.DiscountValue;
           
        }
        IncludeLanguageJS();
    }
}
