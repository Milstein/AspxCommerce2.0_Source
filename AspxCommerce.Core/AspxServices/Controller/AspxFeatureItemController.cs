using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
    public class AspxFeatureItemController
    {
        public AspxFeatureItemController()
        {
        }

        public static List<FeaturedItemsInfo> GetFeaturedItemsByCount(AspxCommonInfo aspxCommonObj, int count)
        {
            try
            {
                List<FeaturedItemsInfo> lstFeatureItem = AspxFeatureItemProvider.GetFeaturedItemsByCount(aspxCommonObj, count);
                return lstFeatureItem;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static void SetFrontGallerySetting(string galleryDisplayAs, int count, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                AspxFeatureItemProvider.SetFrontGallerySetting(galleryDisplayAs, count, aspxCommonObj);
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
                List<FrontItemGallerySettingInfo> galleryObj = AspxFeatureItemProvider.GetFrontGallerySetting(aspxCommonObj);
                return galleryObj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
