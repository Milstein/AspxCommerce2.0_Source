using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxRecentViewItemController
    {
        public AspxRecentViewItemController()
        {
        }
        public static List<RecentlyViewedItemsInfo> GetRecentlyViewedItems(int count, AspxCommonInfo aspxCommonObj)
        {
            try
            {

                List<RecentlyViewedItemsInfo> view = AspxRecentViewItemProvider.GetRecentlyViewedItems(count, aspxCommonObj);
                return view;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void AddUpdateRecentlyViewedItems(SaveCompareItemInfo addUpdateRecentObj, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                AspxRecentViewItemProvider.AddUpdateRecentlyViewedItems(addUpdateRecentObj, aspxCommonObj);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
