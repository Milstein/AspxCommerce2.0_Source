/*
AspxCommerce® - http://www.AspxCommerce.com
Copyright (c) 20011-2012 by AspxCommerce
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxRssFeed_AspxRssFeed : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string CultureName;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            CultureName = GetCurrentCultureName;

            if (Request.QueryString["type"] == "rss")
            {
                string rssOption = Request.QueryString["action"];
                GetLatestItemRssFeed(rssOption);
            }
        }
        IncludeLanguageJS();
    }
    private void GetLatestItemRssFeed(string rssOption)
    {
       
        try
        {
            StoreSettingConfig ssc = new StoreSettingConfig();
            int count=0;
            switch (rssOption)
            {
                case "latestitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.LatestItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "bestsellitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.BestSellItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "specialitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.SpecialItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "featureitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.FeatureItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "heavydiscountitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.HeavyDiscountItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "servicetypeitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.ServiceTypeItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "category":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NewCategoryRssCount, StoreID, PortalID,CultureName));
                    break;
                case "populartags":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.PopularTagRssCount, StoreID, PortalID,CultureName));
                    break;
                case "neworders":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NewOrderRssCount, StoreID, PortalID,CultureName));
                    break;
                case "newcustomers":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NewCustomerRssCount, StoreID, PortalID,CultureName));
                    break;
                case "newitemreview":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NewItemReviewRssCount, StoreID, PortalID,CultureName));
                    break;
                case "newtags":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NewItemTagRssCount, StoreID, PortalID,CultureName));
                    break;
                case "lowstockitems":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.LowStockItemRssCount, StoreID, PortalID,CultureName));
                    break;
                case "brands":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.BrandRssCount, StoreID, PortalID, CultureName));
                    break;
                case "fbrands":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.BrandRssCount, StoreID, PortalID, CultureName));
                    break;
                case "abrands":
                    count = Int32.Parse(ssc.GetStoreSettingsByKey(StoreSetting.BrandRssCount, StoreID, PortalID, CultureName));
                    break;
            }
            AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
            aspxCommonObj.StoreID = GetStoreID;
            aspxCommonObj.PortalID = GetPortalID;
            aspxCommonObj.UserName = GetUsername;
            aspxCommonObj.CultureName = GetCurrentCulture();
            string pageURL = Request.Url.AbsoluteUri;
            var rssFc = new AspxRssFeedController();
            rssFc.GetRssFeedContens(aspxCommonObj, pageURL, rssOption, count);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
