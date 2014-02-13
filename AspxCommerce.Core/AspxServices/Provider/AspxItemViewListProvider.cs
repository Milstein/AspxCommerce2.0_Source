using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxItemViewListProvider
    {
        public AspxItemViewListProvider()
        {
        }

        public static List<CategoryDetailsOptionsInfo> GetLatestItemsDetails(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail= sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetLatestItemsDetail", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<CategoryDetailsOptionsInfo> GetGiftCardItemsDetails(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail= sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("[usp_Aspx_GetLatestGiftCards]", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<CategoryDetailsOptionsInfo> GetBestSoldItemDetails(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail= sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetBestSellerItemDetails", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static List<CategoryDetailsOptionsInfo> GetRecentlyViewedItemDetails(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail= sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetRecentlyViewedItemDetails", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<CategoryDetailsOptionsInfo> GetSpecialItemDetails(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail= sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetSpecialItemDetails", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<CategoryDetailsOptionsInfo> GetFeatureItemDetails(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail= sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetFeatureItemDetails", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static List<CategoryDetailsOptionsInfo> GetAllHeavyDiscountItems(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail = sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetHeavyDiscountDetails", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static List<CategoryDetailsOptionsInfo> GetAllSeasonalItems(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
                parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
                parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
                SQLHandler sqlH = new SQLHandler();
                List<CategoryDetailsOptionsInfo> lstCatDetail = sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetSeasonalDetails", parameterCollection);
                return lstCatDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        } 
    }
}
