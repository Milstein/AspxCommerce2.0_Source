using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    class AspxRecentViewItemProvider
    {
        public AspxRecentViewItemProvider()
       {
       }
       public static List<RecentlyViewedItemsInfo> GetRecentlyViewedItems(int count, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@Count", count));
               SQLHandler sqlH = new SQLHandler();
               List<RecentlyViewedItemsInfo> view = sqlH.ExecuteAsList<RecentlyViewedItemsInfo>("usp_Aspx_GetRecentlyViewedItemList", parameter);
               return view;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void AddUpdateRecentlyViewedItems(SaveCompareItemInfo addUpdateRecentObj, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamNoCID(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@itemSKU", addUpdateRecentObj.SKU));
               parameter.Add(new KeyValuePair<string, object>("@ViewFromIP", addUpdateRecentObj.IP));
               parameter.Add(new KeyValuePair<string, object>("@ViewedFromCountry", addUpdateRecentObj.CountryName));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("usp_Aspx_AddRecentlyViewedItems", parameter);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
