<%@ WebService Language="C#" Class="MoneybookersWebService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using SageFrame.Web.Utilities;
using AspxCommerce.Moneybookers;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class MoneybookersWebService  : System.Web.Services.WebService {

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod]
    public List<CartInfoforMoneybookers> GetCartDetails(int storeID, int portalID, int customerID, string userName, string cultureName, string sessionCode)
    {
        List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
        ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
        ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
        ParaMeter.Add(new KeyValuePair<string, object>("@CustomerID", customerID));
        ParaMeter.Add(new KeyValuePair<string, object>("@UserName", userName));
        ParaMeter.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
        ParaMeter.Add(new KeyValuePair<string, object>("@SessionCode", sessionCode));
        SQLHandler sqLH = new SQLHandler();
        return sqLH.ExecuteAsList<CartInfoforMoneybookers>("usp_Aspx_GetCartDetails", ParaMeter);
    }

    [WebMethod]
    public List<MoneybookersSettingInfo> GetAllMoneybookersSetting(int paymentGatewayID, int storeId, int portalId)
    {
        try
        {
            List<KeyValuePair<string, object>> parameterCollection = new List<KeyValuePair<string, object>>();
            parameterCollection.Add(new KeyValuePair<string, object>("@PaymentGatewayTypeID", paymentGatewayID));
            parameterCollection.Add(new KeyValuePair<string, object>("@StoreID", storeId));
            parameterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalId));
            SQLHandler sqLH = new SQLHandler();
            return sqLH.ExecuteAsList<MoneybookersSettingInfo>("usp_Aspx_MoneybookersSettingsGetAll", parameterCollection);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
}

