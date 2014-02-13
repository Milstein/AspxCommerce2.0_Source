using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Polling.Info;
using SageFrame.Polling;
using System.Data;

public partial class Modules_Polling_EditsPolling : BaseAdministrationUserControl
{
    public int pollID;
    public string rindex;

    protected void Page_Load(object sender, EventArgs e)
    {

        PollingController objc = new PollingController();
        // pollID = objc.getActivePollID(Int32.Parse(SageUserModuleID), GetPortalID);//Saving the ID to use later
        string modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        if (!IsPostBack)
        {
            ImageUrl();
            listPolls();
           // Session["PollID"] = null;

        }
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalVariables", " var PollingEditServicePath='" + ResolveUrl(modulePath) + "';", true);

    }


    private void ImageUrl()
    {
        btnSaveIsVisible.ImageUrl = GetTemplateImageUrl("btnsave.png", true);
        btnSave.ImageUrl = GetTemplateImageUrl("imgsave.png", true);
        btnCancel.ImageUrl = GetTemplateImageUrl("imgcancel.png", true);
        IncludeCss("Polling", "/Modules/Polling/css/poll.css");

    }


    protected void btnSave_Click(object sender, EventArgs e)
    {
        if (Page.IsValid)
        {
            Pollinginfo objPoll = new Pollinginfo();
            if (Session["PollID"] == null)
            {
                pollID = 0;
            }
            else
            {
                pollID = Convert.ToInt32(Session["PollID"]);

            }

            string blockMode;
            if (rdoCookie.Checked)
                blockMode = Pollinginfo.BlockMode.COOKIE.ToString();
            else if (rdoIP.Checked)
                blockMode = Pollinginfo.BlockMode.IP_ADDRESS.ToString();
            else
                blockMode = Pollinginfo.BlockMode.NONE.ToString();


            if (pollID == 0) //INSERT
            {
                pollID = InsertPoll(txtQuestion.Text.Trim(), blockMode);

                //POLL INSERTED successfully
                if (pollID > 0)
                {
                    hidPollID.Value = pollID.ToString();
                    ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Polling/ModuleLocalText", "AddNewPollMessage"), "", SageMessageType.Success);
                }
            }
            else //UPDATE
            {

                UpdatePoll(pollID, txtQuestion.Text.Trim(), blockMode);
                ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Polling/ModuleLocalText", "UpdatePollSuccess"), "", SageMessageType.Success);

            }

            if (pollID > 0)
            {
                InsertUpdateChoices(pollID, Int32.Parse(SageUserModuleID), GetPortalID); //After inserting/Updateting the poll - call choice insert/update function 
            }
            else
            {
                ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Polling/ModuleLocalText", "Error"), "", SageMessageType.Error);

            }
            Session["PollID"] = null;
        }
        txtQuestion.Text = string.Empty;
        divform.Attributes.Add("style", "display:none");
        divManipulateData.Attributes.Add("style", "display:block");
        listPolls();

    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        Session["PollID"] = null;
        txtQuestion.Text = string.Empty;
        divform.Attributes.Add("style", "display:none");
        divManipulateData.Attributes.Add("style", "display:block");
        hidRowIndex.Value = null;
    }

    #region GridPoll
    private void listPolls()
    {
        int UserModuleID = Int32.Parse(SageUserModuleID);
        int PortalID = GetPortalID;
        PollingController objPoll = new PollingController();
        DataSet dtPoll = objPoll.ListPoll(UserModuleID, PortalID);
        gvListPoll.DataSource = dtPoll;
        gvListPoll.DataBind();
    }


    #endregion

    public int InsertPoll(string question, string blockMode)
    {
        Pollinginfo objInf = new Pollinginfo();
        objInf.Question = question;
        objInf.blockMode = blockMode;
        objInf.UserModuleID = Int32.Parse(SageUserModuleID);
        objInf.PortalID = GetPortalID;
        PollingController objc = new PollingController();
        return objc.InsertPoll(objInf);


    }

    /// <summary>
    /// Update the poll and return the number of rows affected
    /// </summary>
    /// <param name="pollID"></param>
    /// <param name="question"></param>
    /// <returns>Number of rows affected</returns>
    public void UpdatePoll(int pollID, string question, string blockMode)
    {
        Pollinginfo obj = new Pollinginfo();
        obj.PollID = pollID;
        obj.Question = question;
        obj.blockMode = blockMode;

        PollingController objc = new PollingController();
        objc.UpdatePoll(obj);
        // return db.ExecuteNonQuery("usp_poll_update", pollID, question, blockMode, active);
    }

    /// <summary>
    /// show the existing poll in edit mode 
    /// This is for demo only Never write ur database logic here. Always use classes and SPs to seperate them from codebehind
    /// </summary>
    private void ShowExistingPoll(int PollId)
    {
        PollingController objc = new PollingController();
        Pollinginfo objPoll = new Pollinginfo();
        DataSet dsPoll = objc.SelectPoll(PollId, Int32.Parse(SageUserModuleID), GetPortalID);

        if (dsPoll.Tables[0].Rows.Count > 0)
        {
            txtQuestion.Text = dsPoll.Tables[0].Rows[0]["Question"].ToString();
            string blockMode = dsPoll.Tables[0].Rows[0]["BlockMode"].ToString();
            if (blockMode == Pollinginfo.BlockMode.COOKIE.ToString())
                rdoCookie.Checked = true;
            else if (blockMode == Pollinginfo.BlockMode.IP_ADDRESS.ToString())
                rdoIP.Checked = true;
            else
                rdoNone.Checked = true;

            ShowChoices(dsPoll.Tables[1]);
            hidRowIndex.Value = dsPoll.Tables[1].Rows.Count.ToString();
            //btnSave.Text = "Update Poll";
        }
        else //can't find the poll.. change to INSERT MODE
        {
            hidPollID.Value = "";
            // btnSave.Text = "Save Poll";
        }
    }

    /// <summary>
    /// There should be atleast two choices in each poll.. So by default showing two choice textboxes in the repeater by binding with dummy data
    /// </summary>
    private void ShowChoices(DataTable dtChoice)
    {
        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        sb.Append("<table id='tableChoices' width='100%'>\n");
        for (int i = 0; i < dtChoice.Rows.Count; i++)
        {
            sb.Append("<tr id='pRow").Append(i).Append("'>\n");
            sb.Append("<td width='200' class='tdLabel'>Choice ").Append(i + 1).Append("</td>\n");
            sb.Append("<td><input type='hidden' id='hidPollChoiceID").Append(i).Append("' name='hidPollChoiceID").Append(i).Append("' Value='").Append(dtChoice.Rows[i]["PollChoiceID"]).Append("' />\n");
            sb.Append("<input type='text' class='text' id='txtChoice").Append(i).Append("' name='txtChoice").Append(i).Append("' value='").Append(dtChoice.Rows[i]["Choice"]).Append("'/>\n");
            sb.Append("<a href='#' onclick='removeFormField(\"#pRow").Append(i).Append("\");return false;'>Remove</a></td>\n");
            sb.Append("</tr>");
        }
        sb.Append("</table>");
        hidRowIndex.Value = dtChoice.Rows.Count.ToString();
        rindex = dtChoice.Rows.Count.ToString();
        divChoices.InnerHtml = sb.ToString();
    }


    /// <summary>
    /// The input choices can come in 3 mode -
    /// 1 - INSERT - IF its added as NEW - it will not have a corresponding Choice ID hidden field
    /// 2 - UPDATE - IF a choice text input has corresponding hidden ID present itss in UPDATE mode
    /// 3 - DELETE - IF a choice text input has corresponding hidden ID present but the text value is empty
    /// </summary>
    /// <param name="pollID"></param>
    private void InsertUpdateChoices(int pollID, int UserModuleID, int PortalID)
    {
        Pollinginfo objPoll = new Pollinginfo();
        PollingController objc = new PollingController();
        //INSERT/UPDATE THE CHOICES 
        //LOOPING THRU ALL THE FORM KEYVALUES TO FIND THE INPUT TEXTS
        //IF A CHOICE HAS CORRESPONDING ID THEN IT HAS TO BE UPDATES/ ELSE INSERT
        foreach (string key in Request.Form)
        {
            if (key.IndexOf("txtChoice") >= 0)
            {
                string hidPollChoiceID = "hidPollChoiceID" + key.Substring(key.Length - 1, 1);
                int choiceID = 0;
                string chc = Request.Form[key];
                if (Session["PollID"] != null)
                {
                    if (Request.Form[hidPollChoiceID] != null && int.TryParse(Request.Form[hidPollChoiceID], out choiceID))
                    {
                        if (Request.Form[key].Trim().Length > 0) //UPDATE if the choice text box is not empty and has a corresponding ID
                        {
                            objPoll.PollChoiceID = choiceID;
                            objPoll.Choice = Request.Form[key];
                            objPoll.UserModuleID = UserModuleID;
                            objPoll.PortalID = PortalID;
                            objc.UpdateChoice(objPoll);

                        }
                        else //DELETE the choice if its empty 
                        {
                            objc.DeleteChoice(choiceID);
                        }
                    }
                    else if (Request.Form[key].Trim().Length > 0)//New choice - insert only if the text is not empty
                    {
                        objPoll.PollID = pollID;
                        objPoll.Choice = Request.Form[key].Trim();
                        objPoll.UserModuleID = UserModuleID;
                        objPoll.PortalID = PortalID;
                        objc.InsertChoice(objPoll);
                    }
                }
                else
                {
                    if (Request.Form[key].Trim().Length > 0)//New choice - insert only if the text is not empty
                    {
                        objPoll.PollID = pollID;
                        objPoll.Choice = Request.Form[key].Trim();
                        objPoll.UserModuleID = UserModuleID;
                        objPoll.PortalID = PortalID;
                        objc.InsertChoice(objPoll);
                    }
                }
            }
        }
        hidRowIndex.Value = null;

    }

    protected void gvListPoll_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int PollId = Int32.Parse(e.CommandArgument.ToString());
        switch (e.CommandName.ToString())
        {
            case "Edit":
                EditPoll(PollId);
                Session["PollID"] = PollId;
                break;
            case "Delete":
                DeletePoll(PollId);
                listPolls();
                ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Polling/ModuleLocalText", "Polldeletedsuccessfully"), "", SageMessageType.Success);

                break;

        }

    }

    private void EditPoll(int PollId)
    {
        divform.Attributes.Add("style", "display:block");
        divManipulateData.Attributes.Add("style", "display:none");
        PollingController objc = new PollingController();
        ShowExistingPoll(PollId);



    }

    private void DeletePoll(int PollId)
    {
        PollingController objc = new PollingController();
        objc.DeletePoll(PollId);
        divform.Attributes.Add("style", "display:none");
        divManipulateData.Attributes.Add("style", "display:block");
    }

    protected void gvListPoll_RowEditing(object sender, GridViewEditEventArgs e)
    {

    }
    protected void gvListPoll_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {

    }
    protected void gvListPoll_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {

    }
    protected void btnSaveIsVisible_Click(object sender, ImageClickEventArgs e)
    {
        foreach (GridViewRow grdRow in gvListPoll.Rows)
        {
            int PollID = 0;
            HiddenField hdfpollID = grdRow.FindControl("hdfPollID") as HiddenField;
            PollID = Convert.ToInt32(hdfpollID.Value);
            bool isActive = ((CheckBox)grdRow.FindControl("rdbActive")).Checked;
            PollingController objPro = new PollingController();
            objPro.SaveHideShowPoll(PollID, isActive);


        }
        ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Polling/ModuleLocalText", "SettingSavedSuccessfully"), "", SageMessageType.Success);

    }
}
