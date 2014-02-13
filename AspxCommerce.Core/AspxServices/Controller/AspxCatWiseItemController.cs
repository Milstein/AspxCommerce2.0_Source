using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxCatWiseItemController
    {
       public AspxCatWiseItemController()
       {
       }

       public static List<CategoryWiseItemInfo> GetCategoryWiseItemList(int offset, int limit, int noOfItemsInCategory, AspxCommonInfo aspxCommonObj)
       {
           try
           {

               List<CategoryWiseItemInfo> lstCatWiseItem = AspxCatWiseItemProvider.GetCategoryWiseItemList(offset, limit, noOfItemsInCategory, aspxCommonObj);
               return lstCatWiseItem;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<CategoryWiseitemSettings> GetCategoryWiseItemSettings(AspxCommonInfo aspxCommonObj)
       {
           try
           {

               List<CategoryWiseitemSettings> lstCWSetting = AspxCatWiseItemProvider.GetCategoryWiseItemSettings(aspxCommonObj);
               return lstCWSetting;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static void SaveCategoryItemSettings(int noOfItemInCategory, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxCatWiseItemProvider.SaveCategoryItemSettings(noOfItemInCategory,aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

    }
}
