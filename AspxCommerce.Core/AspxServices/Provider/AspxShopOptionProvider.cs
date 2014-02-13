using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxShopOptionProvider
    {
       public AspxShopOptionProvider()
       {
       }
    
       public static List<DisplayItemsOptionsInfo> BindItemsViewAsList()
       {
           try
           {

               SQLHandler sqlH = new SQLHandler();
               List<DisplayItemsOptionsInfo> bind = sqlH.ExecuteAsList<DisplayItemsOptionsInfo>("usp_Aspx_DisplayItemViewAsOptions");
               return bind;

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       //--------------------ShoppingOptionsByPrice----------------------------
       
       public static List<ShoppingOptionsInfo> ShoppingOptionsByPrice(AspxCommonInfo aspxCommonObj, int upperLimit)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@Limit", upperLimit));
               SQLHandler sqlH = new SQLHandler();
               List<ShoppingOptionsInfo> lstShopOpt = sqlH.ExecuteAsList<ShoppingOptionsInfo>("usp_Aspx_ShoppingOptions", parameter);
               return lstShopOpt;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       //--------------------ShoppingOptionsByBrand----------------------------

       public static List<BrandItemsInfo> ShoppingOptionsByBrand(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               List<BrandItemsInfo> lstBrand = sqlH.ExecuteAsList<BrandItemsInfo>("usp_Aspx_ShoppingOptionsBrandList", parameter);
               return lstBrand;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       //--------------------ShoppingOptionsItemsByBrandIDs----------------------------
       
       public static List<BrandItemsInfo> ShoppingOptionsItemsByBrandIDs(AspxCommonInfo aspxCommonObj, string brandIDs)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@BrandIDs", brandIDs));
               SQLHandler sqlH = new SQLHandler();
               List<BrandItemsInfo> lstBrandItem = sqlH.ExecuteAsList<BrandItemsInfo>("usp_Aspx_ShoppingOptionsItemsByBrandIDs", parameter);
               return lstBrandItem;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ShoppingOptionInfoForSlider> ShoppingOptionForSlider(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               List<ShoppingOptionInfoForSlider> lstShopOpt = sqlH.ExecuteAsList<ShoppingOptionInfoForSlider>("usp_Aspx_GetShoppingOptionsForSlider", parameter);
               return lstShopOpt;

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       //--------------------ShoppingOptionsByPriceResults----------------------------
       
       public static List<ItemBasicDetailsInfo> GetShoppingOptionsItemsResult(int offset, int limit, string itemIds, int SortBy, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@ItemIDs", itemIds));
               parameter.Add(new KeyValuePair<string, object>("@SortBy", SortBy));
               SQLHandler sqlH = new SQLHandler();
               List<ItemBasicDetailsInfo> lstItemBasicDet= sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetShoppingOptionsItemsResult", parameter);
               return lstItemBasicDet;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       public static List<ItemBasicDetailsInfo> GetShoppingOptionsItemsResultByBrandAndPrice(int offset, int limit, string brandIDs, decimal priceFrom, decimal priceTo, int SortBy, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@brandIDs", brandIDs));
               parameter.Add(new KeyValuePair<string, object>("@priceFrom", priceFrom));
               parameter.Add(new KeyValuePair<string, object>("@priceTo", priceTo));
               parameter.Add(new KeyValuePair<string, object>("@SortBy", SortBy));
               SQLHandler sqlH = new SQLHandler();
               List<ItemBasicDetailsInfo> lstItemBasicDet = sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetShoppingOptionsItemsResultByBrandAndPrice", parameter);
               return lstItemBasicDet;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
