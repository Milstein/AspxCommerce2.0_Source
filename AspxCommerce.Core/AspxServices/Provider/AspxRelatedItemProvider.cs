using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxRelatedItemProvider
    {
        public AspxRelatedItemProvider()
        {
        }
        //public static List<ItemBasicDetailsInfo> GetYouMayAlsoLikeItems(AspxCommonInfo aspxCommonObj, int count)
        //{
        //    try
        //    {
        //        List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetFullParam(aspxCommonObj);
        //        parameter.Add(new KeyValuePair<string, object>("@Count", count));
        //        SQLHandler sqlH = new SQLHandler();
        //        List<ItemBasicDetailsInfo> lstRelatedItem= sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_RelatedItemsByCartItems", parameter);
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
                List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
                parameter.Add(new KeyValuePair<string, object>("@itemSKU", itemSKU));
                parameter.Add(new KeyValuePair<string, object>("@Count", count));
                SQLHandler sqlH = new SQLHandler();
                List<ItemBasicDetailsInfo> lstYouMayLike=  sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetYouMayAlsoLikeItemsByItemSKU", parameter);
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
                List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetFullParam(aspxCommonObj);
                parameter.Add(new KeyValuePair<string, object>("@itemSKU", itemSKU));
                parameter.Add(new KeyValuePair<string, object>("@Count", count));
                SQLHandler sqlH = new SQLHandler();
                List<ItemBasicDetailsInfo> lstYouMayLike = sqlH.ExecuteAsList<ItemBasicDetailsInfo>("usp_Aspx_GetYouMayAlsoLikeItems", parameter);
                return lstYouMayLike;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
