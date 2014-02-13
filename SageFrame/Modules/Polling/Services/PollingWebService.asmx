<%@ WebService Language="C#" Class="PollingWebService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Polling;
using System.Data;

/// <summary>
/// Summary description for PollingWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PollingWebService : System.Web.Services.WebService
{

    public PollingWebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod]
    public  string UpdatePollCount(int pID, int cID,int UserModuleID,int PortalID)
    {
        //int pollID = pID;
        //int choiceID = cID;
        //update the vote count of the selected choice
        PollingController objPoll = new PollingController();
        objPoll.UpdateChoiceVote(cID);

        //save the users IP address - to block repeated vote if the BlockMode is by IP address
       string ip = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (ip == null)
            {
                ip = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
        objPoll.InsertPollIP(pID, ip);

        //Save the poll ID in cookie - to block repeated vote if the BlockMode is by Cookie
        HttpCookie pollCookie;// = new HttpCookie("Poll");
        string valueToStore = ""; //we store the poll IDs as comma seperated values

        //the cookie already exists and some PollIDs are already there
        if (HttpContext.Current.Request.Cookies["Poll"] != null && HttpContext.Current.Request.Cookies["Poll"]["ID"] != null)
        {
            pollCookie = HttpContext.Current.Request.Cookies["Poll"];
            valueToStore = HttpContext.Current.Request.Cookies["Poll"]["ID"] + "," + pID.ToString(); //append the current PollID to the already existing Poll IDs after a comma
        }
        else //cookie not exists - create a new one and store the ID
        {
            pollCookie = new HttpCookie("Poll");
            valueToStore = pID.ToString();
        }
        pollCookie.Values["ID"] = valueToStore;
        pollCookie.Expires = DateTime.MaxValue; //this cookie will never expire
        HttpContext.Current.Response.Cookies.Add(pollCookie);

        //get the poll result
        DataSet dsPoll = objPoll.SelectPoll(pID,UserModuleID,PortalID);
        return getResultHTML(dsPoll,UserModuleID);
    }
	[WebMethod]
 public string GetResult(int pID,int UserModuleID,int PortalID)
 { PollingController objPoll = new PollingController();
        DataSet dsPoll = objPoll.SelectPoll(pID,UserModuleID,PortalID);
        return getResultHTML(dsPoll,UserModuleID);
 }

    private static string getResultHTML(DataSet dsPoll,int UserModuleID)
    {
        int totalVotes = int.Parse(dsPoll.Tables[1].Compute("Sum(VoteCount)", String.Empty).ToString());
        System.Text.StringBuilder sbResult = new System.Text.StringBuilder();
        string divID = "div_" + UserModuleID;
        sbResult.Append("<div id='" + divID + "'>");
        foreach (DataRow dr in dsPoll.Tables[1].Rows)
        {
            decimal percentage = 0;
          
            if (totalVotes > 0)
                percentage = decimal.Round((decimal.Parse(dr["VoteCount"].ToString()) / decimal.Parse(totalVotes.ToString())) * 100,2, MidpointRounding.AwayFromZero);

            string alt = dr["VoteCount"].ToString() + "votes out of " + totalVotes.ToString();

            sbResult.Append("<label class='poll-result'><span>").Append(dr["Choice"]).Append("</span><span> (").Append(dr["VoteCount"]).Append(" votes - ").Append(percentage).Append("%)</span></label>");
            sbResult.Append("<div class='poll-chart'><img src='./Modules/Polling/images/red-bar.png' width='0%' val='").Append(percentage).Append("%' height='15px' alt='").Append(alt).Append("' title='").Append(alt).Append("' /> ").Append("</div>");
        }
        sbResult.Append("<div class='poll-total'>Total Votes: ").Append(totalVotes).Append("</div>");
        sbResult.Append("</div>");
        //sbResult.Append("</p>");
        return sbResult.ToString();
    }
    [WebMethod]
    public void DeletePollChoice(int cID)
    {
        PollingController objPoll = new PollingController();
        objPoll.DeleteChoice(cID);
    }



}

