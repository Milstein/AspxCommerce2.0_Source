using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxFilterProvider
    {
       public AspxFilterProvider()
       {
       }
     
       public static List<Filter> GetShoppingFilter(AspxCommonInfo aspxCommonObj, string categoryName, bool isByCategory)
       {
           List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
           parameter.Add(new KeyValuePair<string, object>("@categoryKey", categoryName));
           parameter.Add(new KeyValuePair<string, object>("@isByCategory", isByCategory));
           SQLHandler sqlH = new SQLHandler();
           List<Filter> lstFilter= sqlH.ExecuteAsList<Filter>("usp_Aspx_ShoppingFilter", parameter);
           return lstFilter;
       }
    
       public static List<CategoryDetailFilter> GetCategoryDetailFilter(string categorykey, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@CategoryName", categorykey));
               SQLHandler sqlH = new SQLHandler();
               List<CategoryDetailFilter> lstCatDetFilter= sqlH.ExecuteAsList<CategoryDetailFilter>("usp_Aspx_CategoryDetailsForFilter", parameterCollection);
               return lstCatDetFilter;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }
    
       public static List<ItemBasicDetailsInfo> GetShoppingFilterItemsResult(int offset, int limit, string itemIds, int sortBy, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@ItemIDs", itemIds));
               parameter.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
               SQLHandler sqlH = new SQLHandler();
               List<ItemBasicDetailsInfo> lstItemBasic= sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetShoppingOptionsItemsResult", parameter);
               return lstItemBasic;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       } 

       public static List<CategoryDetailFilter> GetAllSubCategoryForFilter(string categorykey, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@categorykey", categorykey));
               SQLHandler sqlH = new SQLHandler();
               List<CategoryDetailFilter> lstCatDet= sqlH.ExecuteAsList<CategoryDetailFilter>("usp_Aspx_GetAllSubCategoryForFilter", parameterCollection);
               return lstCatDet;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public static List<BrandItemsInfo> GetAllBrandForCategory(string categorykey, bool isByCategory, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@categorykey", categorykey));
               parameterCollection.Add(new KeyValuePair<string, object>("@isByCategory", isByCategory));
               SQLHandler sqlH = new SQLHandler();
               List<BrandItemsInfo> lstBrandItem= sqlH.ExecuteAsList<BrandItemsInfo>("usp_Aspx_GetAllBrandForCategory", parameterCollection);
               return lstBrandItem;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

    }
}
