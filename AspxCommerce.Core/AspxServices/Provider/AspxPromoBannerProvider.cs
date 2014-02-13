using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
  public class AspxPromoBannerProvider
    {
      public AspxPromoBannerProvider()
      {
      }

      public static List<PromoBannerInfo> GetPromoBanner(int count, AspxCommonInfo aspxCommonObj)
      {
          try
          {
              List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
              parameterCollection.Add(new KeyValuePair<string, object>("@Count", count));
              SQLHandler sqlH = new SQLHandler();
              List<PromoBannerInfo> lstPromoBanner= sqlH.ExecuteAsList<PromoBannerInfo>("[usp_Aspx_GetPromoBannerInfo]", parameterCollection);
              return lstPromoBanner;
          }
          catch (Exception e)
          {
              throw e;
          }
      }

      public static List<PromoBannerInfo> GetAllPromoBanner(AspxCommonInfo aspxCommonObj)
      {
          try
          {
              List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
              SQLHandler sqlH = new SQLHandler();
              List<PromoBannerInfo> lstPromoBanner = sqlH.ExecuteAsList<PromoBannerInfo>("[usp_Aspx_GetAllPromoBanner]", parameterCollection);
              return lstPromoBanner;
          }
          catch (Exception e)
          {
              throw e;
          }
      }

      public static void SavePromoSetting(int count,string pageName, AspxCommonInfo aspxCommonObj)
      {
          try
          {
              List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
              parameterCollection.Add(new KeyValuePair<string, object>("@Count", count));
                  parameterCollection.Add(new KeyValuePair<string, object>("@PageName", pageName));
              SQLHandler sqlH = new SQLHandler();
              sqlH.ExecuteNonQuery("usp_Aspx_PromoBannerSettingUpdate", parameterCollection);
          }
          catch (Exception e)
          {
              throw e;
          }
      }

      public static List<PromoBannerInfo> GetPromoSetting(AspxCommonInfo aspxCommonObj)
      {
          try
          {
              List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
              SQLHandler sqlH = new SQLHandler();
              List<PromoBannerInfo> lstPromoBanner= sqlH.ExecuteAsList<PromoBannerInfo>("usp_Aspx_GetPromoBannerSetting", parameterCollection);
              return lstPromoBanner;
          }
          catch (Exception e)
          {
              throw e;
          }
      }
    }
}
