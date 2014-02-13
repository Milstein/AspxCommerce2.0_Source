using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxPromoCodes_PromoItemsView : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID, UserModuleID;
    public string UserName, CultureName;

    public string DefaultImagePath,
                  EnableLatestItems,
                  AllowOutStockPurchase,
                  AllowWishListLatestItem,
                  AllowAddToCompareLatest;
    public string baseUrl = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeJs("PromoCodeView", "/js/jquery.tipsy.js", "/js/jquery.masonry.js");
        StoreID = GetStoreID;
        PortalID = GetPortalID;
        CustomerID = GetCustomerID;
        UserName = GetUsername;
        CultureName = GetCurrentCultureName;
        baseUrl = ResolveUrl("~/");
        StoreSettingConfig ssc = new StoreSettingConfig();
        DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
        EnableLatestItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableLatestItems, StoreID, PortalID, CultureName);
        AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID,
                                                          CultureName);
        AllowWishListLatestItem = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
        AllowAddToCompareLatest = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID,
                                                CultureName);
        IncludeLanguageJS();
    }
}
