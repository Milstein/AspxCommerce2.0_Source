using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AspxCommerce.Core;

namespace AspxCommerce.MegaCategory
{
    public class MegaCategoryController
    {
        public static List<MegaCategorySettingInfo> GetMegaCategorySetting(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<MegaCategorySettingInfo> lstGetMegaCategorySetting = MegaCategoryProvider.GetMegaCategorySetting(aspxCommonObj);
                return lstGetMegaCategorySetting;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static List<MegaCategorySettingInfo> MegaCategorySettingUpdate(string SettingValues, string SettingKeys, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<MegaCategorySettingInfo> lstProductLister = MegaCategoryProvider.MegaCategorySettingUpdate(SettingValues, SettingKeys, aspxCommonObj);
                return lstProductLister;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static List<MegaCategoryViewInfo> GetCategoryMenuList(AspxCommonInfo aspxCommonObj)
        {
            List<MegaCategoryViewInfo> catInfo = MegaCategoryProvider.GetCategoryMenuList(aspxCommonObj);
            return catInfo;
        }

    }
}
