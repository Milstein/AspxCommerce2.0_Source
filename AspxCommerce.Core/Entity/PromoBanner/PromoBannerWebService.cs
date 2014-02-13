using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using AspxCommerce.Core;
using SageFrame.Web.Utilities;

/// <summary>
/// Summary description for PromoBannerWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class PromoBannerWebService : System.Web.Services.WebService
{

    public PromoBannerWebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<PromoBannerInfo> GetPromoBanner(int count, int storeID, int portalID,string cultureName)
    {
        try
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@Count", count));
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", storeID));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsList<PromoBannerInfo>("[usp_Aspx_GetPromoBannerInfo]", parameterCollection);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public void SavePromoSetting(int count, int storeID, int portalID, string cultureName)
    {
        try
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@Count", count));
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", storeID));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
            SQLHandler sqlH = new SQLHandler();
            sqlH.ExecuteNonQuery("usp_Aspx_PromoBannerSettingUpdate", parameterCollection);
        }
        catch (Exception ex)
        { 
            throw ex;
        }
    }
    [WebMethod]
    public List<PromoBannerInfo> GetPromoSetting( int storeID, int portalID,string cultureName)
    {
        try
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", storeID));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            parameterCollection.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsList<PromoBannerInfo>("usp_Aspx_GetPromoBannerSetting", parameterCollection);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}

