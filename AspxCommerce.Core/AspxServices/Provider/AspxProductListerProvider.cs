using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxProductListerProvider
    {
        public AspxProductListerProvider()
        {
        }

        public static List<ProductListInfo> GetProductLists(AspxCommonInfo aspxCommonObj,
                                                            int count, int offset)
        {
            try
            {
                List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                paramCol.Add(new KeyValuePair<string, object>("@Count", count));
                paramCol.Add(new KeyValuePair<string, object>("@Offset", offset));
                SQLHandler sqlH = new SQLHandler();
                return sqlH.ExecuteAsList<ProductListInfo>("usp_Aspx_ProductListGetByCount", paramCol);
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
                List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSPC(aspxCommonObj);
                SQLHandler sqlH = new SQLHandler();
                List<ProductListSettingInfo> view =
                    sqlH.ExecuteAsList<ProductListSettingInfo>("[dbo].[usp_Aspx_GetProductListSetting]", paramCol);
                return view;
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
                List<KeyValuePair<string, object>> paramCol = CommonParmBuilder.GetParamSPC(aspxCommonObj);
                paramCol.Add(new KeyValuePair<string, object>("@SettingKeys", SettingKeys));
                paramCol.Add(new KeyValuePair<string, object>("@SettingValues", SettingValues));
                SQLHandler sqlH = new SQLHandler();
                List<ProductListSettingInfo> view =
                    sqlH.ExecuteAsList<ProductListSettingInfo>("[dbo].[usp_Aspx_ProductListSettingUpdate]", paramCol);
                return view;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
