using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxSpecialItemProvider
    {
       public AspxSpecialItemProvider()
       {
       }
       public static List<SpecialItemsInfo> GetSpecialItems(AspxCommonInfo aspxCommonObj, int count)
       {
           List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
           paramCol.Add(new KeyValuePair<string, object>("@count", count));
           SQLHandler sageSQL = new SQLHandler();
           List<SpecialItemsInfo> slInfo = sageSQL.ExecuteAsList<SpecialItemsInfo>("[dbo].[usp_Aspx_GetSpecialItems]", paramCol);
           return slInfo;
       }
    }
}
