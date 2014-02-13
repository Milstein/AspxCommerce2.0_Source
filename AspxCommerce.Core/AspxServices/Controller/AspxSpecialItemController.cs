using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxSpecialItemController
    {
       public AspxSpecialItemController()
       {
       }

       public static List<SpecialItemsInfo> GetSpecialItems(AspxCommonInfo aspxCommonObj, int count)
       {
           List<SpecialItemsInfo> slInfo = AspxSpecialItemProvider.GetSpecialItems(aspxCommonObj, count);
           return slInfo;
       }
    }
}
