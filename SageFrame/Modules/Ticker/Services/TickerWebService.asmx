<%@ WebService Language="C#" Class="TickerWebService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Ticker.Info;
using SageFrame.Ticker.TickerController;

/// <summary>
/// Summary description for TickerWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TickerWebService : System.Web.Services.WebService
{

    public TickerWebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<TickerInfo> GetAllTickerItem(int StoreID, int PortalID)
    {
        TickerController objC = new TickerController();
        List<TickerInfo> obj = new List<TickerInfo>();
        obj = objC.GetAllTickerItem(StoreID, PortalID);
        return obj;


    }
}