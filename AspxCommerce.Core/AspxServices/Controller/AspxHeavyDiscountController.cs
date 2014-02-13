using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
  public class AspxHeavyDiscountController
    {
      public AspxHeavyDiscountController()
      {
      }

      #region HeavyDiscount Items Management

      public static List<HeavyDiscountInfo> GetHeavyDiscountItems(AspxCommonInfo aspxCommonObj, int offSet, int limit)
      {
          try
          {
              List<HeavyDiscountInfo> lstHeavyDiscount = AspxHeavyDiscountProvider.GetHeavyDiscountItems(aspxCommonObj, offSet, limit);
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
              HeavyDiscountSettingInfo objHDSetting = AspxHeavyDiscountProvider.GetHeavyDiscountSetting(aspxCommonObj);
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
          AspxHeavyDiscountProvider.SetDiscountSetting(heavy);
      }

      #endregion


    }
}
