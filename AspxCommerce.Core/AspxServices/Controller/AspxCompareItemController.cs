using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxCompareItemController
    {
       public AspxCompareItemController()
       {
       }

       public static int SaveCompareItems(SaveCompareItemInfo saveCompareItemObj, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               int compareID = AspxCompareItemProvider.SaveCompareItems(saveCompareItemObj, aspxCommonObj);
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
               List<ItemsCompareInfo> lstItemCompare = AspxCompareItemProvider.GetItemCompareList(aspxCommonObj);
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
               AspxCompareItemProvider.DeleteCompareItem(compareItemID, aspxCommonObj);

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
               AspxCompareItemProvider.ClearAll(aspxCommonObj);
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
               bool isExist = AspxCompareItemProvider.CheckCompareItems(ID, aspxCommonObj, costVariantValueIDs);
               return isExist;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ItemBasicDetailsInfo> GetCompareListImage(string itemIDs, string CostVariantValueIDs, AspxCommonInfo aspxCommonObj)
       {
           List<ItemBasicDetailsInfo> lstItemBasic = AspxCompareItemProvider.GetCompareListImage(itemIDs, CostVariantValueIDs, aspxCommonObj);
           return lstItemBasic;
       }
       public static ItemsCompareInfo GetItemDetailsForCompare(int ItemID, AspxCommonInfo aspxCommonObj, string costVariantValueIDs)
       {
           try
           {
               ItemsCompareInfo objItemDetails = AspxCompareItemProvider.GetItemDetailsForCompare(ItemID, aspxCommonObj,
                                                                                                  costVariantValueIDs);
               return objItemDetails;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }


       public static List<CompareItemListInfo> GetCompareList(string itemIDs, string CostVariantValueIDs, AspxCommonInfo aspxCommonObj)
       {
           List<CompareItemListInfo> lstCompItem = AspxCompareItemProvider.GetCompareList(itemIDs, CostVariantValueIDs, aspxCommonObj);
           return lstCompItem;
       }

       #region RecentlyComparedProducts

       public static void AddComparedItems(string IDs, string CostVarinatIds, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxCompareItemProvider.AddComparedItems(IDs, CostVarinatIds, aspxCommonObj);
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
               List<ItemsCompareInfo> lstCompItem = AspxCompareItemProvider.GetRecentlyComparedItemList(count, aspxCommonObj);
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
