using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxFilterController
    {
       public AspxFilterController()
       {
       }

       public static List<Filter> GetShoppingFilter(AspxCommonInfo aspxCommonObj, string categoryName, bool isByCategory)
       {
           List<Filter> lstFilter = AspxFilterProvider.GetShoppingFilter(aspxCommonObj, categoryName, isByCategory);
           return lstFilter;
       }

       public static List<CategoryDetailFilter> GetCategoryDetailFilter(string categorykey, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<CategoryDetailFilter> lstCatDetFilter = AspxFilterProvider.GetCategoryDetailFilter(categorykey, aspxCommonObj);
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
               List<ItemBasicDetailsInfo> lstItemBasic = AspxFilterProvider.GetShoppingFilterItemsResult(offset, limit, itemIds, sortBy, aspxCommonObj);
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
               List<CategoryDetailFilter> lstCatDet = AspxFilterProvider.GetAllSubCategoryForFilter(categorykey, aspxCommonObj);
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
               List<BrandItemsInfo> lstBrandItem = AspxFilterProvider.GetAllBrandForCategory(categorykey, isByCategory, aspxCommonObj);
               return lstBrandItem;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }
    }
}
