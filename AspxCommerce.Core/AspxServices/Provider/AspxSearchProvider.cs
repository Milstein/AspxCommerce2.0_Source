using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;
using SageFrame.Common;

namespace AspxCommerce.Core
{
   public class AspxSearchProvider
    {
        public AspxSearchProvider()
       {
       }
        public static SearchSettingInfo GetSearchSetting(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
                SQLHandler sqlHandle = new SQLHandler();
               SearchSettingInfo objSearchSetting = sqlHandle.ExecuteAsObject<SearchSettingInfo>("[usp_Aspx_GetSearchSettings]", parameterCollection);
                return objSearchSetting;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static void SetSearchSetting(SearchSettingInfo searchObj,AspxCommonInfo aspxCommonObj)
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", aspxCommonObj.StoreID));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", aspxCommonObj.PortalID));
            parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", aspxCommonObj.CultureName));
            parameterCollection.Add(new KeyValuePair<string, object>("@ShowCategoryForSearch", searchObj.ShowCategoryForSearch));
            parameterCollection.Add(new KeyValuePair<string, object>("@EnableAdvanceSearch", searchObj.EnableAdvanceSearch));
            parameterCollection.Add(new KeyValuePair<string, object>("@ShowSearchKeyWord", searchObj.ShowSearchKeyWord));
            SQLHandler sqlhandle = new SQLHandler();
            sqlhandle.ExecuteNonQuery("usp_Aspx_UpdateSearchSettings", parameterCollection);
        }

       public static List<CategoryInfo> GetAllCategoryForSearch(string prefix, bool isActive, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               int itemID = 0;
               List<CategoryInfo> catList = new List<CategoryInfo>();

               if (!CacheHelper.Get("CategoryForSearch" + aspxCommonObj.StoreID.ToString() + aspxCommonObj.PortalID.ToString(), out catList))
               {
                   List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                   parameterCollection.Add(new KeyValuePair<string, object>("@Prefix", prefix));
                   parameterCollection.Add(new KeyValuePair<string, object>("@IsActive", isActive));
                   parameterCollection.Add(new KeyValuePair<string, object>("@ItemID", itemID));
                   SQLHandler sqlH = new SQLHandler();
                   catList = sqlH.ExecuteAsList<CategoryInfo>("dbo.usp_Aspx_GetCategoryList",
                                                              parameterCollection);
                   CacheHelper.Add(catList, "CategoryForSearch" + aspxCommonObj.StoreID.ToString() + aspxCommonObj.PortalID.ToString());
               }
               return catList;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<SearchTermList> GetTopSearchTerms(AspxCommonInfo aspxCommonObj, int Count)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@Count", Count));
               SQLHandler sqlH = new SQLHandler();
               List<SearchTermList> searchList = sqlH.ExecuteAsList<SearchTermList>("dbo.usp_Aspx_GetTopSearchedList", parameterCollection);
               return searchList;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<SearchTermList> GetSearchedTermList(string search, AspxCommonInfo aspxCommonObj)
       {

           List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSP(aspxCommonObj);
           paramCol.Add(new KeyValuePair<string, object>("@Search", search));
           SQLHandler sageSQL = new SQLHandler();
           List<SearchTermList> srInfo = sageSQL.ExecuteAsList<SearchTermList>("[dbo].[usp_Aspx_GetListSearched]", paramCol);
           return srInfo;
       }

       #region General Search
       //----------------General Search Sort By DropDown Options----------------------------

       public static List<ItemBasicDetailsInfo> GetSimpleSearchResult(int offset, int limit, int categoryID, string searchText, int sortBy, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@CategoryID", categoryID));
               parameter.Add(new KeyValuePair<string, object>("@SearchText", searchText));
               parameter.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
               SQLHandler sqlH = new SQLHandler();
               List<ItemBasicDetailsInfo> lstItemBasic= sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetSimpleSearchResult", parameter);
               return lstItemBasic;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<SortOptionTypeInfo> BindItemsSortByList()
       {
           try
           {

               SQLHandler sqlH = new SQLHandler();
               List<SortOptionTypeInfo> bind = sqlH.ExecuteAsList<SortOptionTypeInfo>("usp_Aspx_DisplayItemSortByOptions");
               return bind;

           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ItemBasicDetailsInfo> GetItemsByGeneralSearch(int storeID, int portalID, string nameSearchText, float priceFrom, float priceTo,
                                                                 string skuSearchText, int categoryID, string categorySearchText, bool isByName, bool isByPrice, bool isBySKU, bool isByCategory, string userName, string cultureName)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
               parameter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
               parameter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
               parameter.Add(new KeyValuePair<string, object>("@NameSearchText", nameSearchText));
               parameter.Add(new KeyValuePair<string, object>("@PriceFrom", priceFrom));
               parameter.Add(new KeyValuePair<string, object>("@PriceTo", priceTo));
               parameter.Add(new KeyValuePair<string, object>("@SKUSearchText", skuSearchText));
               parameter.Add(new KeyValuePair<string, object>("@CategoryID", categoryID));
               parameter.Add(new KeyValuePair<string, object>("@CategorySearchText", categorySearchText));
               parameter.Add(new KeyValuePair<string, object>("@IsByName", isByName));
               parameter.Add(new KeyValuePair<string, object>("@IsByPrice", isByPrice));
               parameter.Add(new KeyValuePair<string, object>("@IsBySKU", isBySKU));
               parameter.Add(new KeyValuePair<string, object>("@IsByCategory", isByCategory));
               parameter.Add(new KeyValuePair<string, object>("@UserName", userName));
               parameter.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
               SQLHandler sqlH = new SQLHandler();
               List<ItemBasicDetailsInfo> lstItemBasic = sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetItemsByGeneralSearch", parameter);
               return lstItemBasic;

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       #endregion

       #region Advance Search

       public static List<ItemTypeInfo> GetItemTypeList()
       {
           try
           {
               SQLHandler sqlH = new SQLHandler();
               List<ItemTypeInfo> lstItemType= sqlH.ExecuteAsList<ItemTypeInfo>("usp_Aspx_GetItemTypeList");
               return lstItemType;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<AttributeFormInfo> GetAttributeByItemType(int itemTypeID, int storeID, int portalID, string cultureName)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
               parameterCollection.Add(new KeyValuePair<string, object>("@ItemTypeID", itemTypeID));
               parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
               parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", storeID));
               parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));
               SQLHandler sqlH = new SQLHandler();
               List<AttributeFormInfo> lstAttrForm= sqlH.ExecuteAsList<AttributeFormInfo>("usp_Aspx_GetAttributeByItemType", parameterCollection);
               return lstAttrForm;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       #endregion

       #region More Advanced Search
       //------------------get dyanamic Attributes for serach-----------------------   

       public static List<AttributeShowInAdvanceSearchInfo> GetAttributes(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               List<AttributeShowInAdvanceSearchInfo> lstAttr= sqlH.ExecuteAsList<AttributeShowInAdvanceSearchInfo>("usp_Aspx_GetAttributesShowInAdvanceSearch", parameter);
               return lstAttr;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       //------------------get items by dyanamic Advance serach-----------------------

       public static List<ItemBasicDetailsInfo> GetItemsByDyanamicAdvanceSearch(int offset, int limit, AspxCommonInfo aspxCommonObj, System.Nullable<int> categoryID, string searchText, string checkValue,
                                                                         System.Nullable<float> priceFrom, System.Nullable<float> priceTo, string attributeIds, int SortBy)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@CategoryID", categoryID));
               parameter.Add(new KeyValuePair<string, object>("@SearchText", searchText));
               parameter.Add(new KeyValuePair<string, object>("@CheckValues", checkValue));
               parameter.Add(new KeyValuePair<string, object>("@PriceFrom", priceFrom));
               parameter.Add(new KeyValuePair<string, object>("@PriceTo", priceTo));
               parameter.Add(new KeyValuePair<string, object>("@AttributeIDs", attributeIds));
               parameter.Add(new KeyValuePair<string, object>("@SortBy", SortBy));
               SQLHandler sqlH = new SQLHandler();
               List<ItemBasicDetailsInfo> lstItemBasic= sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetItemsByDynamicAdvanceSearch", parameter);
               return lstItemBasic;

           }
           catch (Exception e)
           {
               throw e;
           }
       }
       #endregion
    }
}
