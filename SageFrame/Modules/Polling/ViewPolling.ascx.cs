using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Polling;
using SageFrame.Polling.Info;
using System.Data;
using System.Web.Services;
using AspxCommerce.Core;
public partial class Modules_Polling_ViewPolling : BaseAdministrationUserControl
{
    public int UserModuleID,pollID;
    public static int StoreID, PortalID, CustomerID;
    public bool isPolled;
    public string modulePath, aspxRootPath,CultureName,UserName;
    public string ModuleCollapsible;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
      
        modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        
        
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalVariables", " var PollingServicePath='" + ResolveUrl(modulePath) + "';", true);
        IncludeJS();
        IncludeCSS();
        IncludeLanguageJS();
        divMsg.Visible = false;
        if (!IsPostBack)
        {

            PollingController objc = new PollingController();
            pollID = objc.getActivePollID(Int32.Parse(SageUserModuleID), GetPortalID);
            if (pollID > 0)
            {
                hidPollID.Value = pollID.ToString();
                showPoll();//show the poll
            }
            else
            {
                divMsg.InnerHtml = "<span class='cssClassNotFound'>There are no active polls available.</span>";
                divPoll.Visible = false;
                divMsg.Visible = true;
                return;
            }

            StoreID = GetStoreID;
            PortalID = GetPortalID;
            CustomerID = GetCustomerID;
            CultureName = GetCurrentCultureName;
            UserName = GetUsername;
            aspxRootPath = ResolveUrl("~/");
            StoreSettingConfig ssc = new StoreSettingConfig();
            ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);

        }
        GenerateResultContainer();
    }

    private void GenerateResultContainer()
    {
        System.Text.StringBuilder sbPollResult = new System.Text.StringBuilder();
        string divPollResultID = "divPollResult_" + UserModuleID;
        sbPollResult.Append("<div id='" + divPollResultID + "'></div>");
        ltrlPollResult.Text = sbPollResult.ToString();
    }

    private void IncludeCSS()
    {
       IncludeCssFile(modulePath + "css/Poll.css");
    }

    private void IncludeJS()
    {
        IncludeScriptFile(modulePath + "js/polling.js");
    }

    private void showPoll()
    {
        PollingController objc = new PollingController();
        DataSet dsPoll = objc.SelectPoll(pollID, Int32.Parse(SageUserModuleID), GetPortalID);

        if (dsPoll.Tables[0].Rows.Count > 0)
        {
            litQuestion.Text = dsPoll.Tables[0].Rows[0]["Question"].ToString();

            //if the BlockMode is not NONE findout whether the user is already Polled or not - if polled show the result only
            string blockMode = dsPoll.Tables[0].Rows[0]["BlockMode"].ToString();

             isPolled = isPolled = CheckAlreadyPolled(blockMode);


            if (isPolled) //show the result
            {
                divAnswers.InnerHtml = getResultHTML(dsPoll);
                divAnswers.InnerHtml += "<div class='poll-total' id='divVoted'>You have already voted.</div>";
            }
            else //show the poll
            {
                rptChoices.DataSource = dsPoll.Tables[1];
                rptChoices.DataBind();
                rptChoices.Visible = rptChoices.Items.Count > 0;
            }
        }
        else
        {
            divMsg.InnerHtml = "<b>Note: </b>The poll you are looking for is not found.";
            divMsg.Visible = true;
        }
    }

    private bool CheckAlreadyPolled(string blockMode)
    {
        bool isPolled = false;
        //if the block mode of this Poll is by IP,, check in the DB whether a poll is already existing from this IP
        if (blockMode == Pollinginfo.BlockMode.IP_ADDRESS.ToString())
        {
            string ip = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (ip == null)
            {
                ip = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            PollingController objPollC = new PollingController();
            int id = objPollC.SelectPollIP(int.Parse(hidPollID.Value), ip);
            if (id > 0) isPolled = true;
        }
        else if (blockMode == Pollinginfo.BlockMode.COOKIE.ToString()) //If block by Cookie read the cookie to see if there is an entry for this blog
        {
            if (Request.Cookies["Poll"] != null && Request.Cookies["Poll"]["ID"] != null)
            {
                //the cookie will have comma seperated IDs of all the polls that already voted
                string commaSeperatedPollIDs = Request.Cookies["Poll"]["ID"];
                //split it with comma
                string[] pollIDs = commaSeperatedPollIDs.Split(",".ToCharArray());
                //and loop through each pollID to find whethere the current poll is already voted
                foreach (string pID in pollIDs)
                {
                    //if yes break
                    if (pID == hidPollID.Value)
                    {
                        isPolled = true;
                        break;
                    }
                }
            }
        }

        return isPolled;
    }

    private string getResultHTML(DataSet dsPoll)
    {
        int totalVotes = int.Parse(dsPoll.Tables[1].Compute("Sum(VoteCount)", String.Empty).ToString());
        System.Text.StringBuilder sbResult = new System.Text.StringBuilder();
        string divID = "div_" + SageUserModuleID;
        sbResult.Append("<div id='" + divID + "'>");
        foreach (DataRow dr in dsPoll.Tables[1].Rows)
        {
            decimal percentage = 0;           
            if (totalVotes > 0)
                percentage = decimal.Round((decimal.Parse(dr["VoteCount"].ToString()) / decimal.Parse(totalVotes.ToString())) * 100,2, MidpointRounding.AwayFromZero);

            string alt = dr["VoteCount"].ToString() + " votes out of " + totalVotes.ToString();

            sbResult.Append("<label class='poll-result'><span>").Append(dr["Choice"]).Append("</span><span> (").Append(dr["VoteCount"]).Append(" votes - ").Append(percentage).Append("%)</span></label>");
            sbResult.Append("<div class='poll-chart'><img src='./Modules/Polling/images/red-bar.png' width='0%' val='").Append(percentage).Append("%' height='15px' alt='").Append(alt).Append("' title='").Append(alt).Append("' /> ").Append("</div>");
        }//"<ul id='"+divId+"'></ul>"
        sbResult.Append("<div class='poll-total'>Total Votes: ").Append(totalVotes).Append("</div>");
        sbResult.Append("</div>");
        //sbResult.Append("</p>");
        return sbResult.ToString();
    }





}
