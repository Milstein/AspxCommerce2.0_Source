using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxPromoBannerController
    {
       public AspxPromoBannerController()
       {
       }

       public static List<PromoBannerInfo> GetPromoBanner(int count, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<PromoBannerInfo> lstPromoBanner = AspxPromoBannerProvider.GetPromoBanner(count, aspxCommonObj);
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
               List<PromoBannerInfo> lstPromoBanner = AspxPromoBannerProvider.GetAllPromoBanner(aspxCommonObj);
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
               AspxPromoBannerProvider.SavePromoSetting(count,pageName,aspxCommonObj);
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
               List<PromoBannerInfo> lstPromoBanner = AspxPromoBannerProvider.GetPromoSetting(aspxCommonObj);
               return lstPromoBanner;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
