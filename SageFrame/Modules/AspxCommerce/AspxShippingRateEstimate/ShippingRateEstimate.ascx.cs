using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;
using SageFrame.Web.Utilities;


public partial class ShippingRateEstimate : BaseAdministrationUserControl
{
    
    public string DimentionalUnit, WeightUnit;
    public string ShowRateEstimate = string.Empty;
    public int Count = 0;
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            var ssc = new StoreSettingConfig();
            DimentionalUnit = ssc.GetStoreSettingsByKey(StoreSetting.DimensionUnit, GetStoreID, GetPortalID,
                                                        GetCurrentCultureName);
            WeightUnit = ssc.GetStoreSettingsByKey(StoreSetting.WeightUnit, GetStoreID, GetPortalID,
                                                   GetCurrentCultureName);
            ShowRateEstimate = ssc.GetStoreSettingsByKey(StoreSetting.EstimateShippingCostInCartPage, GetStoreID,
                                                           GetPortalID,
                                                           GetCurrentCultureName);

            IncludeJs("ValidationRate", "/js/FormValidation/jquery.validate.js");
            GetItemCount();
        }
        IncludeLanguageJS();

    }
    private void GetItemCount()
    {
        try
        {


            AspxCommonInfo commonInfo = new AspxCommonInfo();
            commonInfo.StoreID = GetStoreID;
            commonInfo.PortalID = GetPortalID;
            commonInfo.CultureName = GetCurrentCulture();
            commonInfo.SessionCode = Session.SessionID;
            commonInfo.CustomerID = GetCustomerID;
            commonInfo.UserName = GetUsername;

            Count = AspxHeaderController.GetCartItemsCount(commonInfo);
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }
}




  
