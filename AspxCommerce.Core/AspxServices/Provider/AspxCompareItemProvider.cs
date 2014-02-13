using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxCompareItemProvider
    {
       public AspxCompareItemProvider()
       {
       }

       public static int SaveCompareItems(SaveCompareItemInfo saveCompareItemObj, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUS(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@ItemID", saveCompareItemObj.ItemID));
               parameter.Add(new KeyValuePair<string, object>("@CompareItemID", 0));
               parameter.Add(new KeyValuePair<string, object>("@IP", saveCompareItemObj.IP));
               parameter.Add(new KeyValuePair<string, object>("@CountryName", saveCompareItemObj.CountryName));
               parameter.Add(new KeyValuePair<string, object>("@CostVariantValueIDs", saveCompareItemObj.CostVariantIDs));
               SQLHandler sqlH = new SQLHandler();
               int compareID = sqlH.ExecuteNonQuery("usp_Aspx_AddItemsToCompare", parameter, "@CompareAddedItemID");
               return compareID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ItemsCompareInfo> GetItemCompareList(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamNoCID(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               List<ItemsCompareInfo> lstItemCompare= sqlH.ExecuteAsList<ItemsCompareInfo>("usp_Aspx_GetCompareItemsList", parameter);
               return lstItemCompare;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void DeleteCompareItem(int compareItemID, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUS(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@CompareItemID", compareItemID));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("[usp_Aspx_DeleteCompareItem]", parameter);

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void ClearAll(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUS(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("[usp_Aspx_ClearCompareItems]", parameter);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static bool CheckCompareItems(int ID, AspxCommonInfo aspxCommonObj, string costVariantValueIDs)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUS(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@ItemID", ID));
               parameter.Add(new KeyValuePair<string, object>("@CostVariantValueIDs", costVariantValueIDs));
               SQLHandler sqlH = new SQLHandler();
               bool isExist= sqlH.ExecuteNonQueryAsGivenType<bool>("[usp_Aspx_CheckCompareItems]", parameter, "@IsExist");
               return isExist;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ItemBasicDetailsInfo> GetCompareListImage(string itemIDs, string CostVariantValueIDs, AspxCommonInfo aspxCommonObj)
       {
           List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
           parameter.Add(new KeyValuePair<string, object>("@ItemIDs", itemIDs));
           parameter.Add(new KeyValuePair<string, object>("@CostVariantaValueIDS", CostVariantValueIDs));
           SQLHandler sqlH = new SQLHandler();
           List<ItemBasicDetailsInfo> lstItemBasic= sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetCompareList", parameter);
           return lstItemBasic;
       }
       
       public static ItemsCompareInfo GetItemDetailsForCompare(int ItemID, AspxCommonInfo aspxCommonObj, string costVariantValueIDs)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@ItemID", ItemID));
               parameter.Add(new KeyValuePair<string, object>("@CostVariantValueIDs", costVariantValueIDs));
               SQLHandler sqlH = new SQLHandler();
               ItemsCompareInfo objItemDetails= sqlH.ExecuteAsObject<ItemsCompareInfo>("[usp_Aspx_GetItemDetailsForCompare]", parameter);
               return objItemDetails;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }


       public static List<CompareItemListInfo> GetCompareList(string itemIDs, string CostVariantValueIDs, AspxCommonInfo aspxCommonObj)
       {
           List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
           parameter.Add(new KeyValuePair<string, object>("@ItemIDs", itemIDs));
           parameter.Add(new KeyValuePair<string, object>("@CostVariantValueIDs", CostVariantValueIDs));
           SQLHandler sqlH = new SQLHandler();
           List<CompareItemListInfo> lstCompItem= sqlH.ExecuteAsList<CompareItemListInfo>("usp_Aspx_GetItemCompareList", parameter);
           return lstCompItem;
       }

       #region RecentlyComparedProducts

       public static void AddComparedItems(string IDs, string CostVarinatIds, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPU(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@ItemIDs", IDs));
               parameter.Add(new KeyValuePair<string, object>("@CostVarinatIds", CostVarinatIds));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("usp_Aspx_AddComparedItems", parameter);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ItemsCompareInfo> GetRecentlyComparedItemList(int count, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@Count", count));
               SQLHandler sqlH = new SQLHandler();
               List<ItemsCompareInfo> lstCompItem= sqlH.ExecuteAsList<ItemsCompareInfo>("usp_Aspx_GetRecentlyComparedItemList", parameter);
               return lstCompItem;

           }
           catch (Exception e)
           {
               throw e;
           }
       }
       #endregion

    }
}
