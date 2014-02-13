using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxWishItemController
    {
       public AspxWishItemController()
       {
       }

       public static bool CheckWishItems(int ID, string costVariantValueIDs, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               bool isExist = AspxWishItemProvider.CheckWishItems(ID, costVariantValueIDs, aspxCommonObj);
               return isExist;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void SaveWishItems(SaveWishListInfo saveWishListInfo, AspxCommonInfo aspxCommonObj)
       {
           AspxWishItemProvider.SaveWishItems(saveWishListInfo, aspxCommonObj);
       }

       public static List<WishItemsInfo> GetWishItemList(int offset, int limit, AspxCommonInfo aspxCommonObj, string flagShowAll, int count, int sortBy)
       {
           try
           {
               List<WishItemsInfo> lstWishItem = AspxWishItemProvider.GetWishItemList(offset, limit, aspxCommonObj, flagShowAll, count, sortBy);
               return lstWishItem;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<WishItemsInfo> GetRecentWishItemList(AspxCommonInfo aspxCommonObj, string flagShowAll, int count)
       {
           try
           {
               List<WishItemsInfo> lstWishItem = AspxWishItemProvider.GetRecentWishItemList(aspxCommonObj, flagShowAll, count);
               return lstWishItem;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void DeleteWishItem(string wishItemID, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxWishItemProvider.DeleteWishItem(wishItemID, aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void UpdateWishList(string wishItemID, string comment, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxWishItemProvider.UpdateWishList(wishItemID, comment, aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void ClearWishList(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxWishItemProvider.ClearWishList(aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int CountWishItems(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               int countWish = AspxWishItemProvider.CountWishItems(aspxCommonObj);
               return countWish;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void SaveShareWishListEmailMessage(AspxCommonInfo aspxCommonObj, WishItemsEmailInfo wishlistObj)
       {
           AspxWishItemProvider.SaveShareWishListEmailMessage(aspxCommonObj, wishlistObj);
       }

       public static void SendShareWishItemEmail(AspxCommonInfo aspxCommonObj, WishItemsEmailInfo wishlistObj)
       {
           try
           {
               AspxWishItemProvider.SendShareWishItemEmail(aspxCommonObj, wishlistObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
