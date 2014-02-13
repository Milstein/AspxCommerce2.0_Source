using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Common;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxSearchController
    {
        public AspxSearchController()
        {
        }

        public static List<CategoryInfo> GetAllCategoryForSearch(string prefix, bool isActive, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<CategoryInfo> catList = AspxSearchProvider.GetAllCategoryForSearch(prefix, isActive, aspxCommonObj);
                return catList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static void SetSearchSetting(SearchSettingInfo searchSettingObj, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                AspxSearchProvider.SetSearchSetting(searchSettingObj,aspxCommonObj);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static SearchSettingInfo GetSearchSetting(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                SearchSettingInfo objHDSetting = AspxSearchProvider.GetSearchSetting(aspxCommonObj);
                return objHDSetting;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<SearchTermList> GetTopSearchTerms(AspxCommonInfo aspxCommonObj, int Count)
        {
            try
            {
                List<SearchTermList> searchList = AspxSearchProvider.GetTopSearchTerms(aspxCommonObj, Count);
                return searchList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<SearchTermList> GetSearchedTermList(string search, AspxCommonInfo aspxCommonObj)
        {
            List<SearchTermList> srInfo = AspxSearchProvider.GetSearchedTermList(search, aspxCommonObj);
            return srInfo;
        }

        #region General Search
        //----------------General Search Sort By DropDown Options----------------------------

        public static List<ItemBasicDetailsInfo> GetSimpleSearchResult(int offset, int limit, int categoryID, string searchText, int sortBy, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<ItemBasicDetailsInfo> lstItemBasic = AspxSearchProvider.GetSimpleSearchResult(offset, limit, categoryID, searchText, sortBy, aspxCommonObj);
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
                List<SortOptionTypeInfo> bind = AspxSearchProvider.BindItemsSortByList();
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

                List<ItemBasicDetailsInfo> lstItemBasic = AspxSearchProvider.GetItemsByGeneralSearch(storeID, portalID, nameSearchText, priceFrom, priceTo,
                                                                                                skuSearchText, categoryID, categorySearchText, isByName, isByPrice, isBySKU, isByCategory, userName, cultureName);
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
                List<ItemTypeInfo> lstItemType = AspxSearchProvider.GetItemTypeList();
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
                List<AttributeFormInfo> lstAttrForm = AspxSearchProvider.GetAttributeByItemType(itemTypeID, storeID, portalID, cultureName);
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
                List<AttributeShowInAdvanceSearchInfo> lstAttr = AspxSearchProvider.GetAttributes(aspxCommonObj);
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
                List<ItemBasicDetailsInfo> lstItemBasic = AspxSearchProvider.GetItemsByDyanamicAdvanceSearch(offset, limit, aspxCommonObj, categoryID, searchText, checkValue, priceFrom, priceTo, attributeIds, SortBy);
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
