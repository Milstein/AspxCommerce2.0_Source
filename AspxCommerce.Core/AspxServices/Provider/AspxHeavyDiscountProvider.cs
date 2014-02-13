using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxHeavyDiscountProvider
    {
       public AspxHeavyDiscountProvider()
       {
       }

       #region HeavyDiscount Items Management

       public static List<HeavyDiscountInfo> GetHeavyDiscountItems(AspxCommonInfo aspxCommonObj, int offSet, int limit)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@Offset", offSet));
               parameterCollection.Add(new KeyValuePair<string, object>("@limit", limit));
               SQLHandler sqlhandle = new SQLHandler();
               List<HeavyDiscountInfo> lstHeavyDiscount= sqlhandle.ExecuteAsList<HeavyDiscountInfo>("usp_Aspx_GetHeavyDiscountItems",
                                                                        parameterCollection);
               return lstHeavyDiscount;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       #endregion

       #region Heavy discount setting

       public static HeavyDiscountSettingInfo GetHeavyDiscountSetting(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               SQLHandler sqlHandle = new SQLHandler();
               HeavyDiscountSettingInfo objHDSetting= sqlHandle.ExecuteAsObject<HeavyDiscountSettingInfo>("usp_Aspx_GetHeavyDiscountSettings", parameterCollection);
               return objHDSetting;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       #endregion

       #region update setting

       public static void SetDiscountSetting(HeavyDiscountSettingInfo heavy)
       {
           List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
           parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", heavy.StoreID));
           parameterCollection.Add(new KeyValuePair<string, object>("@portalID", heavy.PortalID));
           parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", heavy.CultureName));
           parameterCollection.Add(new KeyValuePair<string, object>("@EnableModule", heavy.EnableModule));
           parameterCollection.Add(new KeyValuePair<string, object>("@NoOfItemShown", heavy.NoOfItemShown));
           parameterCollection.Add(new KeyValuePair<string, object>("@DiscountValue", heavy.DiscountValue));
           SQLHandler sqlhandle = new SQLHandler();
           sqlhandle.ExecuteNonQuery("usp_Aspx_UpdateHeavyDiscountSettings", parameterCollection);
       }

       #endregion

    }
}
