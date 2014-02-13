using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
    public class AspxRelatedItemController
    {
        public AspxRelatedItemController()
        {
        }
        //public static List<ItemBasicDetailsInfo> GetYouMayAlsoLikeItems(AspxCommonInfo aspxCommonObj, int count)
        //{
        //    try
        //    {
        //        List<ItemBasicDetailsInfo> lstRelatedItem = AspxRelatedItemProvider.GetYouMayAlsoLikeItems(aspxCommonObj, count);
        //        return lstRelatedItem;
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        public static List<ItemBasicDetailsInfo> GetYouMayAlsoLikeItemsListByItemSKU(string itemSKU, AspxCommonInfo aspxCommonObj, int count)
        {
            try
            {
                List<ItemBasicDetailsInfo> lstYouMayLike = AspxRelatedItemProvider.GetYouMayAlsoLikeItemsListByItemSKU(itemSKU, aspxCommonObj, count);
                return lstYouMayLike;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<ItemBasicDetailsInfo> GetYouMayAlsoLikeItems(string itemSKU, AspxCommonInfo aspxCommonObj, int count)
        {
            try
            {
                List<ItemBasicDetailsInfo> lstRelatedItem = AspxRelatedItemProvider.GetYouMayAlsoLikeItems(itemSKU, aspxCommonObj, count);
                return lstRelatedItem;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
