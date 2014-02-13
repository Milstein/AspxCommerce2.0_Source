using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxWishItemProvider
    {
       public AspxWishItemProvider()
       {
       }

       public static bool CheckWishItems(int ID, string costVariantValueIDs, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPU(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@ItemID", ID));
               parameter.Add(new KeyValuePair<string, object>("@CostVariantValueIDs", costVariantValueIDs));
               SQLHandler sqlH = new SQLHandler();
               bool isExist= sqlH.ExecuteNonQueryAsGivenType<bool>("[usp_Aspx_CheckWishItems]", parameter, "@IsExist");
               return isExist;

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void SaveWishItems(SaveWishListInfo saveWishListInfo, AspxCommonInfo aspxCommonObj)
       {
           List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPU(aspxCommonObj);
           parameter.Add(new KeyValuePair<string, object>("@ItemID", saveWishListInfo.ItemID));
           parameter.Add(new KeyValuePair<string, object>("@WishItemID", 0));
           parameter.Add(new KeyValuePair<string, object>("@CostVariantValueIDs", saveWishListInfo.CostVariantValueIDs));
           parameter.Add(new KeyValuePair<string, object>("@IP", saveWishListInfo.IP));
           parameter.Add(new KeyValuePair<string, object>("@CountryName", saveWishListInfo.CountryName));
           SQLHandler sqlH = new SQLHandler();
           sqlH.ExecuteNonQuery("usp_Aspx_SaveWishItems", parameter);
       }

       public static List<WishItemsInfo> GetWishItemList(int offset, int limit, AspxCommonInfo aspxCommonObj, string flagShowAll, int count, int sortBy)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@flag", flagShowAll));
               parameter.Add(new KeyValuePair<string, object>("@Count", count));
               parameter.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
               SQLHandler sqlH = new SQLHandler();
               List<WishItemsInfo> lstWishItem= sqlH.ExecuteAsList<WishItemsInfo>("usp_Aspx_GetWishItemList", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@flag", flagShowAll));
               parameter.Add(new KeyValuePair<string, object>("@Count", count));
               SQLHandler sqlH = new SQLHandler();
               List<WishItemsInfo> lstWishItem= sqlH.ExecuteAsList<WishItemsInfo>("usp_Aspx_GetRecentWishItemList", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPU(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@WishItemID", wishItemID));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("usp_Aspx_DeleteWishItem", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPU(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@WishItemID", wishItemID));
               parameter.Add(new KeyValuePair<string, object>("@Comment", comment));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("usp_Aspx_UpdateWishItem", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPU(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("usp_Aspx_ClearWishItem", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamNoCID(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               int countWish= sqlH.ExecuteAsScalar<int>("usp_Aspx_GetWishItemsCount", parameter);
               return countWish;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void SaveShareWishListEmailMessage(AspxCommonInfo aspxCommonObj, WishItemsEmailInfo wishlistObj)
       {
           List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
           parameter.Add(new KeyValuePair<string, object>("@ItemIDs", wishlistObj.ItemID));
           parameter.Add(new KeyValuePair<string, object>("@SenderName", wishlistObj.SenderName));
           parameter.Add(new KeyValuePair<string, object>("@SenderEmail", wishlistObj.SenderEmail));
           parameter.Add(new KeyValuePair<string, object>("@ReceiverEmailID", wishlistObj.ReceiverEmail));
           parameter.Add(new KeyValuePair<string, object>("@Subject", wishlistObj.Subject));
           parameter.Add(new KeyValuePair<string, object>("@Message", wishlistObj.Message));
           SQLHandler sqlH = new SQLHandler();
           sqlH.ExecuteNonQuery("[usp_Aspx_SaveShareWishListEmail]", parameter);

       }

       public static void SendShareWishItemEmail(AspxCommonInfo aspxCommonObj, WishItemsEmailInfo wishlistObj)
       {
           try
           {
               EmailTemplate.SendEmailForSharedWishList(aspxCommonObj, wishlistObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
