using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxBestSellerController
    {
       public AspxBestSellerController()
       {
       }

       public static List<BestSellerInfo> GetBestSoldItems(AspxCommonInfo aspxCommonObj, int count)
       {
           List<BestSellerInfo> slInfo = AspxBestSellerProvider.GetBestSoldItems(aspxCommonObj,count);
           return slInfo;
       }

       public static List<CategoryDetailsOptionsInfo> GetBestSellerCarousel(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
       {
           List<CategoryDetailsOptionsInfo> slInfo = AspxBestSellerProvider.GetBestSellerCarousel(offset, limit, aspxCommonObj, sortBy);
           return slInfo;
       }

    }
}
