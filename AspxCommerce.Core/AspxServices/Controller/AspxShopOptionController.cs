using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxShopOptionController
    {
       public AspxShopOptionController()
       {
       }

       public static List<DisplayItemsOptionsInfo> BindItemsViewAsList()
       {
           try
           {
               List<DisplayItemsOptionsInfo> bind = AspxShopOptionProvider.BindItemsViewAsList();
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
               List<ShoppingOptionsInfo> lstShopOpt = AspxShopOptionProvider.ShoppingOptionsByPrice(aspxCommonObj, upperLimit);
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
               List<BrandItemsInfo> lstBrand = AspxShopOptionProvider.ShoppingOptionsByBrand(aspxCommonObj);
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
               List<BrandItemsInfo> lstBrandItem = AspxShopOptionProvider.ShoppingOptionsItemsByBrandIDs(aspxCommonObj, brandIDs);
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
               List<ShoppingOptionInfoForSlider> lstShopOpt = AspxShopOptionProvider.ShoppingOptionForSlider(aspxCommonObj);
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
               List<ItemBasicDetailsInfo> lstItemBasicDet = AspxShopOptionProvider.GetShoppingOptionsItemsResult(offset, limit, itemIds, SortBy, aspxCommonObj);
               return lstItemBasicDet;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       public static List<ItemBasicDetailsInfo> GetShoppingOptionsItemsResultByBrandAndPrice(int offset, int limit,
                                                                                             string brandIDs,
                                                                                             decimal priceFrom,
                                                                                             decimal priceTo,
                                                                                             int SortBy,
                                                                                             AspxCommonInfo
                                                                                                 aspxCommonObj)
       {
           try
           {
               List<ItemBasicDetailsInfo> lstItemBasicDet = AspxShopOptionProvider.GetShoppingOptionsItemsResultByBrandAndPrice(
                   offset,
                   limit,
                   brandIDs,
                   priceFrom,
                   priceTo,
                   SortBy,
                   aspxCommonObj);
               return lstItemBasicDet;
           }
           catch (Exception e)
           {
               throw e;
           }

       }
    }
}
