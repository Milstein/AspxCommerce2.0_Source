using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxBestSellerProvider
    {
       public AspxBestSellerProvider()
       {
       }

       public static List<BestSellerInfo> GetBestSoldItems(AspxCommonInfo aspxCommonObj, int count)
       {
           List<BestSellerInfo> slInfo;
           List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
           paramCol.Add(new KeyValuePair<string, object>("@count", count));
           SQLHandler sageSQL = new SQLHandler();
           slInfo = sageSQL.ExecuteAsList<BestSellerInfo>("[dbo].[usp_Aspx_GetBestSoldItems]", paramCol);
           return slInfo;
       }
     
       public static List<CategoryDetailsOptionsInfo> GetBestSellerCarousel(int offset, int limit, AspxCommonInfo aspxCommonObj, int sortBy)
       {
           try
           {
               List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               paramCol.Add(new KeyValuePair<string, object>("@offset", offset));
               paramCol.Add(new KeyValuePair<string, object>("@limit", limit));
               paramCol.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
               SQLHandler sqlH = new SQLHandler();
               return sqlH.ExecuteAsList<CategoryDetailsOptionsInfo>("usp_Aspx_GetBestSellerItemDetails", paramCol);
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

    }
}
