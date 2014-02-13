using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxLatestItemWithOptionsProvider
    {
       public AspxLatestItemWithOptionsProvider()
       {
       }

       public static List<LatestItemsWithOptionsInfo> LatestItemsList(int offset, int limit, AspxCommonInfo aspxCommonObj, int count, int sortBy)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@offset", offset));
               parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
               parameterCollection.Add(new KeyValuePair<string, object>("@SortBy", sortBy));
               SQLHandler sqlH = new SQLHandler();
               List<LatestItemsWithOptionsInfo> lstLatestItems = sqlH.ExecuteAsList<LatestItemsWithOptionsInfo>("dbo.usp_Aspx_GetLatestItems", parameterCollection);
               return lstLatestItems;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

    }
}
