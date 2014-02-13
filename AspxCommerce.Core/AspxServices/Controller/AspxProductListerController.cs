using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
    public class AspxProductListerController
    {
        public AspxProductListerController()
        {
        }

        public static List<ProductListInfo> GetProductLists(AspxCommonInfo aspxCommonObj,int count, int offset)
        {
            try
            {
                List<ProductListInfo> lstProductLister = AspxProductListerProvider.GetProductLists(aspxCommonObj,count,offset);
                return lstProductLister;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<ProductListSettingInfo> GetProductListSetting(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<ProductListSettingInfo> lstProductLister = AspxProductListerProvider.GetProductListSetting(aspxCommonObj);
                return lstProductLister;
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<ProductListSettingInfo> ProductListSettingUpdate(string SettingValues, string SettingKeys,AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<ProductListSettingInfo> lstProductLister = AspxProductListerProvider.ProductListSettingUpdate(SettingValues,SettingKeys,aspxCommonObj);
                return lstProductLister;
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
