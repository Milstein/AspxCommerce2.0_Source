using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxLatestItemWithOptionsController
    {
       public AspxLatestItemWithOptionsController()
       {
           
       }
       public static List<LatestItemsWithOptionsInfo> LatestItemsList(int offset, int limit, AspxCommonInfo aspxCommonObj, int count, int sortBy)
       {
           try
           {
               List<LatestItemsWithOptionsInfo> lstLatestItems = AspxLatestItemWithOptionsProvider.LatestItemsList(offset, limit,
                                                                                                          aspxCommonObj,
                                                                                                          count, sortBy);
               return lstLatestItems;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

    }
}
