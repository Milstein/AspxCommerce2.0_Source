<%@ WebService Language="C#" Class="GoogleCheckOutWebService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using SageFrame.Web.Utilities;
using AspxCommerce.GoogleCheckOut;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class GoogleCheckOutWebService  : System.Web.Services.WebService {

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod]
    public List<CartInfoforGoogleCheckOut> GetCartDetailsForPG(int storeID, int portalID, int customerID, string userName, string cultureName, string sessionCode, string country, string state, string zip, int addressID)
    {
        List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
        ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
        ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
        ParaMeter.Add(new KeyValuePair<string, object>("@CustomerID", customerID));
        ParaMeter.Add(new KeyValuePair<string, object>("@UserName", userName));
        ParaMeter.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
        ParaMeter.Add(new KeyValuePair<string, object>("@SessionCode", sessionCode));
        ParaMeter.Add(new KeyValuePair<string, object>("@Country", country));
        ParaMeter.Add(new KeyValuePair<string, object>("@State", state));
        ParaMeter.Add(new KeyValuePair<string, object>("@Zip", zip));
        ParaMeter.Add(new KeyValuePair<string, object>("@AddressID", addressID));
        SQLHandler sqLH = new SQLHandler();
        return sqLH.ExecuteAsList<CartInfoforGoogleCheckOut>("usp_Aspx_GetCartDetailsForPG", ParaMeter);
    }

    [WebMethod]
    public List<GoogleCheckOutSettingInfo> GetAllGoogleCheckOutSetting(int paymentGatewayID, int storeId, int portalId)
    {
        try
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@PaymentGatewayTypeID", paymentGatewayID));
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", storeId));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalId));
            SQLHandler sqLH = new SQLHandler();
            return sqLH.ExecuteAsList<GoogleCheckOutSettingInfo>("usp_Aspx_GoogleCheckOutSettingsGetAll", parameterCollection);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<GoogleCheckOutSettingKeyInfo> GoogleCheckOutSettingKey()
    {
        try
        {
            
            SQLHandler sqLH = new SQLHandler();
            return sqLH.ExecuteAsList<GoogleCheckOutSettingKeyInfo>("[usp_Aspx_GoogleCheckOutSettingsKey]");
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
}

