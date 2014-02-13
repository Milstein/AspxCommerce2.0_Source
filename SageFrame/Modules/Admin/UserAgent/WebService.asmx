<%@ WebService Language="C#"  Class="WebService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.UserAgent;
using SageFrame.Core;
using SageFrame.Framework;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    public WebService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public  void SaveUserAgentMode(string AgentMode,int PortalID,string UserName)
    {
        UserAgentController objController = new UserAgentController();
        objController.SaveUserAgentMode(AgentMode, PortalID, UserName, DateTime.Now, true);
        AppErazer.ClearSysHash(ApplicationKeys.UserAgent + "_" + PortalID);
    }
    [WebMethod]
    public string GetUserAgentMode(int PortalID)
    {
        UserAgentController objController = new UserAgentController();
        return objController.GetUserAgent(PortalID, true);
    }
}


