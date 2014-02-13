using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxCatWiseItemProvider
    {
       public AspxCatWiseItemProvider()
       {
       }

       public static List<CategoryWiseItemInfo> GetCategoryWiseItemList(int offset, int limit, int noOfItemsInCategory, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@noOfItemsInCategory", noOfItemsInCategory));
               parameter.Add(new KeyValuePair<string, object>("offset",offset));
               parameter.Add(new KeyValuePair<string, object>("limit",limit));
               SQLHandler sqlH = new SQLHandler();
               List<CategoryWiseItemInfo> lstCatWiseItem= sqlH.ExecuteAsList<CategoryWiseItemInfo>("[dbo].[usp_Aspx_CategoryWiseItemList]", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               SQLHandler sqlH = new SQLHandler();
               List<CategoryWiseitemSettings> lstCWSetting= sqlH.ExecuteAsList<CategoryWiseitemSettings>("usp_Aspx_GetCategoryItemSettings", parameter);
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
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@NoOfItemsInCategory", noOfItemInCategory));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("usp_Aspx_SaveCategoryItemSettings", parameter);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

    }
}
