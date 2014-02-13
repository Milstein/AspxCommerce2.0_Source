using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxFeatureItemProvider
    {

        public AspxFeatureItemProvider()
        {
        }

        public static List<FeaturedItemsInfo> GetFeaturedItemsByCount(AspxCommonInfo aspxCommonObj, int count)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameterCollection.Add(new KeyValuePair<string, object>("@Count", count));
                SQLHandler sqlH = new SQLHandler();
                List<FeaturedItemsInfo> lstFeatureItem = sqlH.ExecuteAsList<FeaturedItemsInfo>("dbo.usp_Aspx_FeaturedItemsGetByCount", parameterCollection);
                return lstFeatureItem;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static List<FrontItemGallerySettingInfo> GetFrontGallerySetting(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPC(aspxCommonObj);
                SQLHandler sqlHandle = new SQLHandler();
                List<FrontItemGallerySettingInfo> galleryObj = sqlHandle.ExecuteAsList<FrontItemGallerySettingInfo>("[usp_Aspx_GetFrontItemGallerySettings]", parameterCollection);
                return galleryObj;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static void SetFrontGallerySetting(string galleryDisplayAs, int count, AspxCommonInfo aspxCommonObj)
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", aspxCommonObj.StoreID));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", aspxCommonObj.PortalID));
            parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", aspxCommonObj.CultureName));
            parameterCollection.Add(new KeyValuePair<string, object>("@GalleryDisplayAs", galleryDisplayAs));
            parameterCollection.Add(new KeyValuePair<string, object>("@Count", count));
            SQLHandler sqlhandle = new SQLHandler();
            sqlhandle.ExecuteNonQuery("[usp_Aspx_UpdateFrontItemGallerySettings]", parameterCollection);
        }
    }
}
