#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2012 by SageFrame
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
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.PortalSetting;
using System.Web.UI.HtmlControls;
using SageFrame.Framework;
using SageFrame.Web;
using SageFrame.Utilities;
using System.IO;
using System.Collections;
using SageFrame.Shared;
using SageFrame.SageFrameClass;
using SageFrame.Message;
using SageFrame.Modules;
using SageFrame.Templating;
using SageFrame.PortalManagement;
using SageFrame.Common;
using System.Text;
using SageFrame.Security.Helpers;
using SageFrame.Modules.Admin.PortalSettings;
using SageFrame.Core;
using System.Text.RegularExpressions;
using SageFrame.SageFrameClass.MessageManagement;
#endregion

namespace SageFrame.Modules.Admin.PortalManagement
{
    public partial class ctl_PortalManagement : BaseAdministrationUserControl
    {
        SageFrameConfig pagebase = new SageFrameConfig();
        bool IsUseFriendlyUrls = true;
        string appPath = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
                appPath = GetApplicationName;
                if (!IsPostBack)
                {
                    AddImageUrls();
                    BindPortal();
                    BindSitePortal();
                    PanelVisibility(false, true);
                    imbBtnSaveChanges.Attributes.Add("onclick", "javascript:return confirm('" + GetSageMessage("PortalModules", "AreYouSureToSaveChanges") + "')");
                }
                //test.Visible = false;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        private void AddImageUrls()
        {
            imgCancelList.ImageUrl = GetTemplateImageUrl("imgcancel.png", true);
            imgCancel.ImageUrl = GetTemplateImageUrl("imgcancel.png", true);
            imgAdd.ImageUrl = GetTemplateImageUrl("imgadd.png", true);
            imgSave.ImageUrl = GetTemplateImageUrl("imgsave.png", true);
            imbBtnSaveChanges.ImageUrl = GetTemplateImageUrl("imgsave.png", true);
        }
        private void BindPortal()
        {
            gdvPortal.DataSource = PortalController.GetPortalList();
            gdvPortal.DataBind();
        }
        private void BindSitePortal()
        {
            try
            {
                SettingProvider spr = new SettingProvider();
                DataTable dt = spr.GetAllPortals();
                ddlPortalName.DataSource = dt;
                ddlPortalName.DataTextField = "Name";
                ddlPortalName.DataValueField = "PortalID";
                ddlPortalName.DataBind();
                if (ddlPortalName.Items.Count > 0)
                {
                    ddlPortalName.SelectedIndex = ddlPortalName.Items.IndexOf(ddlPortalName.Items.FindByValue(pagebase.GetSettingsByKey(SageFrameSettingKeys.SuperUserPortalId)));
                }
                if (ddlPortalName.Items.Count <= 1)
                {
                    ddlPortalName.Visible = false;
                    btnPortalSave.Visible = false;
                }
                else
                {
                    ddlPortalName.Visible = true;
                    btnPortalSave.Visible = true;
                }
                ddlPortalName.Visible = false; // added later for preventing portal change
                btnPortalSave.Visible = false; // added later for preventing portal change
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        private void PanelVisibility(bool VisiblePortal, bool VisiblePortalList)
        {
            pnlPortal.Visible = VisiblePortal;
            pnlPortalList.Visible = VisiblePortalList;
        }
        private void ClearForm()
        {
            txtPortalName.Text = "";
        }
        protected void imgAdd_Click(object sender, ImageClickEventArgs e)
        {
            try
            {
                txtPortalName.Visible = true;
                lblDefaultPortal.Visible = false;
                imgSave.Visible = true;
                lblSave.Visible = true;
                TabPanelPortalModulesManagement.Visible = false;
                ClearForm();
                txtPortalName.Enabled = true;
                hdnPortalID.Value = "0";
                PanelVisibility(true, false);
                BindSitePortal();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        protected void imgSave_Click(object sender, ImageClickEventArgs e)
        {
            try
            {
                bool status = false;
                foreach (GridViewRow row in gdvPortal.Rows)
                {
                    LinkButton lnkPortal = row.FindControl("lnkUsername") as LinkButton;
                    if (gdvPortal.DataKeys[row.RowIndex]["PortalID"].ToString() != hdnPortalIndex.Value)
                    {
                        if (lnkPortal.Text.ToLower().Equals(txtPortalName.Text.ToLower()))
                        {
                            status = true;
                        }
                    }
                }
                if (!(string.IsNullOrEmpty(txtPortalName.Text)))
                {
                    if (!status)
                    {
                        SaveProtal();
                        BindPortalSetting();
                        HttpRuntime.Cache.Remove(CacheKeys.Portals);
                        SageFrameConfig sf = new SageFrameConfig();
                        sf.ResetSettingKeys(int.Parse(this.hdnPortalID.Value.ToString()));
                        HttpContext.Current.Session.Remove(SessionKeys.SageFrame_PortalSEOName);
                        AppErazer.ClearSysCache();
                        BindPortal();
                        BindSitePortal();
                        PanelVisibility(false, true);
                        Redirect(GetPortalID);
                    }
                    else
                    {
                        ShowMessage("", GetSageMessage("PortalSettings", "PortalAlreadyExists"), "", SageMessageType.Alert);
                    }
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        private string GenerateRandomCode()
        {
            string s = "";
            Random random = new Random();
            string[] CapchaValue = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
            for (int i = 0; i < 4; i++)
                s = String.Concat(s, CapchaValue[random.Next(36)]);
            return s;
        }

        private string CheckDuplicateTemplate(string portalname)
        {
            bool isDuplicate = false;
            string fname = string.Empty;
            string TempFolder = HttpContext.Current.Server.MapPath(GetApplicationName + "/Templates/");
            DirectoryInfo dInfo = new DirectoryInfo(TempFolder);
            Foldername info = new Foldername();
            foreach (DirectoryInfo obj in dInfo.GetDirectories())
            {
                if (obj.Name.ToLower() == portalname.ToLower())
                {
                    info.Existfolder = obj.Name.ToLower();
                    isDuplicate = true;
                }
            }
            if (isDuplicate)
            {
                string toAppend = GenerateRandomCode();
                portalname = portalname + "_" + toAppend;
                portalname = CheckDuplicateTemplate(portalname);
            }
            return portalname;
        }


        private void Redirect(int portalID)
        {
            string redirectUrl = string.Empty;
            string tempPortalName = string.Empty;
            if (Int32.Parse(hdnPortalID.Value) > 0)
            {
                redirectUrl = portalID == 1 ? GetApplicationName : GetApplicationName + "/portal/" + txtPortalName.Text.ToLower().Trim();
                SageFrameConfig sfConfig = new SageFrameConfig();
                redirectUrl += "/Admin/Portals" + SageFrameSettingKeys.PageExtension;
            }
            else
            {
                redirectUrl = Request.Url.ToString();
            }
            Response.Redirect(redirectUrl);
        }

        private string SaveTemplate()
        {
            string portalname = CheckDuplicateTemplate(txtPortalName.Text);
            CreateNewTemplateFolder(portalname);
            return portalname;
        }
        public void CreateNewTemplateFolder(string TemplateName)
        {
            try
            {
                string completePath = Server.MapPath(appPath + "/Templates/" + TemplateName);
                string path = HttpContext.Current.Server.MapPath(appPath).Replace(@"\Admin", "");
                if (HttpRuntime.Cache["AspxStoreSetting" + GetPortalID.ToString() + GetStoreID.ToString()] != null)
                {
                    DirectoryInfo SrcDirA = new DirectoryInfo(path + "/Templates/AspxCommerce/");
                    DirectoryInfo DisDirA = new DirectoryInfo(path + "/Templates/" + TemplateName);
                    CopyDirectory(SrcDirA, DisDirA);
                }
                else
                {
                    DirectoryInfo SrcDir = new DirectoryInfo(path + "/Core/Blank/");
                    DirectoryInfo DisDir = new DirectoryInfo(path + "/Templates/" + TemplateName);
                    CopyDirectory(SrcDir, DisDir);
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        static void CopyDirectory(DirectoryInfo source, DirectoryInfo destination)
        {
            if (!destination.Exists)
            {
                destination.Create();
            }

            FileInfo[] files = source.GetFiles();
            foreach (FileInfo file in files)
            {
                file.CopyTo(Path.Combine(destination.FullName, file.Name));
            }
            // Process subdirectories.
            DirectoryInfo[] dirs = source.GetDirectories();
            foreach (DirectoryInfo dir in dirs)
            {
                // Get destination directory.
                string destinationDir = Path.Combine(destination.FullName, dir.Name);

                // Call CopyDirectory() recursively.
                CopyDirectory(dir, new DirectoryInfo(destinationDir));
            }
        }

        public class Foldername
        {
            public string Existfolder { get; set; }

            public Foldername() { }
        }

        private void BindPortalSetting()
        {
            Hashtable hst = new Hashtable();
            SettingProvider sep = new SettingProvider();
            DataTable dt = sep.GetSettingsByPortal(GetPortalID.ToString(), string.Empty); //GetSettingsByPortal();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                }
            }
            HttpRuntime.Cache.Insert(CacheKeys.SageSetting, hst);
        }

        protected void imgCancel_Click(object sender, ImageClickEventArgs e)
        {
            try
            {
                PanelVisibility(false, true);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        protected void gdvPortal_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            try
            {
                if (e.Row.RowType == DataControlRowType.DataRow)
                {
                    HiddenField hdnPortalID = (HiddenField)e.Row.FindControl("hdnPortalID");
                    HiddenField hdnSEOName = (HiddenField)e.Row.FindControl("hdnSEOName");
                    HiddenField hdnIsParent = (HiddenField)e.Row.FindControl("hdnIsParent");
                    HyperLink hypPortalPreview = (HyperLink)e.Row.FindControl("hypPortalPreview");
                    Label lblDefaultPage = (Label)e.Row.FindControl("lblDefaultPage");
                    hypPortalPreview.Text = "Preview";
                    if (IsUseFriendlyUrls)
                    {
                        if (hdnIsParent.Value.ToLower() != "true")
                        {
                            hypPortalPreview.NavigateUrl = ResolveUrl("~/portal/" + hdnSEOName.Value.ToLower() + "/" + lblDefaultPage.Text.Replace(" ", "-") + SageFrameSettingKeys.PageExtension);
                        }
                        else
                        {
                            hypPortalPreview.NavigateUrl = ResolveUrl("~/" + lblDefaultPage.Text.Replace(" ", "-") + SageFrameSettingKeys.PageExtension);
                        }
                    }
                    else
                    {
                        hypPortalPreview.NavigateUrl = ResolveUrl("~/Default" + SageFrameSettingKeys.PageExtension + "?ptlid=" + hdnPortalID.Value + "&ptSEO=" + hdnSEOName.Value.ToLower() + "&pgnm=" + lblDefaultPage.Text.Replace(" ", "-"));
                    }
                    ImageButton imgDelete = (ImageButton)e.Row.FindControl("imgDelete");
                    ImageButton imgEdit = (ImageButton)e.Row.FindControl("imgEdit");
                    HtmlInputCheckBox chkBoxIsParentItem = (HtmlInputCheckBox)e.Row.FindControl("chkBoxIsParentItem");
                    if (hdnIsParent != null && chkBoxIsParentItem != null)
                    {
                        chkBoxIsParentItem.Checked = bool.Parse(hdnIsParent.Value);
                    }
                    if (bool.Parse(hdnIsParent.Value) || Int32.Parse(hdnPortalID.Value) == GetPortalID)
                    {
                        imgDelete.Visible = false;
                    }
                    if (hdnSEOName.Value.ToLower() == "default")
                    {
                        imgDelete.Visible = false;
                        imgEdit.Visible = false;
                    }
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        protected void gdvPortal_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            try
            {
                int rowIndex = Int32.Parse(e.CommandArgument.ToString());
                int portalID = int.Parse(gdvPortal.DataKeys[rowIndex]["PortalID"].ToString());
                string PortalName = gdvPortal.DataKeys[rowIndex]["Name"].ToString();
                if (e.CommandName == "EditPortal")
                {
                    if (PortalName.ToLower() != "default")
                    {
                        TabPanelPortalModulesManagement.Visible = true;
                        gdvPortalModulesLists.PageIndex = 0;
                        EditPortal(portalID);
                        PanelVisibility(true, false);
                        hdnPortalIndex.Value = portalID.ToString();
                        txtPortalName.Visible = true;
                        lblDefaultPortal.Visible = false;
                        imgSave.Visible = true;
                        lblSave.Visible = true;
                    }
                    else if (PortalName.ToLower() == "default")
                    {
                        TabPanelPortalModulesManagement.Visible = true;
                        gdvPortalModulesLists.PageIndex = 0;
                        PortalInfo portal = PortalController.GetPortalByPortalID(portalID, GetUsername);
                        txtPortalName.Enabled = portal.Name.Equals("Default") ? false : true;
                        txtPortalName.Visible = false;
                        lblDefaultPortal.Visible = true;
                        lblDefaultPortal.Text = portal.Name;
                        hdnPortalID.Value = portalID.ToString();
                        BindPortalModulesListsGrid(Int32.Parse(hdnPortalID.Value));
                        PanelVisibility(true, false);
                        hdnPortalIndex.Value = portalID.ToString();
                        imgSave.Visible = false;
                        lblSave.Visible = false;
                    }
                }
                else if (e.CommandName == "DeletePortal")
                {
                    DeletePortal(portalID);
                    HttpRuntime.Cache.Remove(CacheKeys.Portals);
                    BindPortal();
                    BindSitePortal();
                    PanelVisibility(false, true);
                    string target_dir = Utils.GetTemplatePath(PortalName);
                    if (Directory.Exists(target_dir))
                        Utils.DeleteDirectory(target_dir);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        private void EditPortal(Int32 portalID)
        {
            PortalInfo portal = PortalController.GetPortalByPortalID(portalID, GetUsername);
            txtPortalName.Enabled = portal.Name.Equals("Default") ? false : true;

            txtPortalName.Text = portal.Name;
            hdnPortalID.Value = portalID.ToString();
            BindPortalModulesListsGrid(Int32.Parse(hdnPortalID.Value));
        }

        private void DeletePortal(Int32 portalID)
        {
            PortalInfo objInfo = PortalController.GetPortalByPortalID(portalID, GetUsername);
            txtPortalName.Text = objInfo.Name;
            if (HttpRuntime.Cache["AspxStoreSetting" + GetPortalID.ToString() + GetStoreID.ToString()] != null)
            {
                PortalController.DeleteStorePortal(portalID, GetPortalID,GetUsername);
            }
            else
            {
                PortalController.DeletePortal(portalID, GetUsername);
            }
           
            ShowMessage("", GetSageMessage("PortalSettings", "PortalDeleteSuccessfully"), "", SageMessageType.Success);
        }

        private void SaveProtal()
        {
            if (Int32.Parse(hdnPortalID.Value) > 0)
            {
                PortalController.UpdatePortal(Int32.Parse(hdnPortalID.Value), txtPortalName.Text, false, GetUsername);
            }
            else
            {
                if (HttpRuntime.Cache["AspxStoreSetting" + GetPortalID.ToString() + GetStoreID.ToString()] != null)
                {
                    string  portalUrl;
                    string portalName = txtPortalName.Text.Trim().Replace(" ", "_");
                    if (IsUseFriendlyUrls)
                    {
                        portalUrl = Request.ServerVariables["SERVER_NAME"] + "/portal/" + portalName + "/" + "home" + SageFrameSettingKeys.PageExtension;
                    }
                    else
                    {
                        portalUrl = Request.ServerVariables["SERVER_NAME"] + "/portal/" + "home";
                    }
                    string newPortalname = SaveTemplate(); 
                    PortalMgrController.AddStoreSubscriber(portalName,false,GetUsername,
                                                           newPortalname); 
                }
                else
                {
                    string newPortalname = SaveTemplate();
                    PortalMgrController.AddPortal(txtPortalName.Text, false, GetUsername, newPortalname);
                }
            }
        }

        private void BindPortalModulesListsGrid(int PortalID)
        {
            gdvPortalModulesLists.DataSource = PortalController.GetPortalModulesByPortalID(PortalID, GetUsername);
            gdvPortalModulesLists.DataBind();
        }

        protected void gdvPortalModulesLists_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {

            gdvPortalModulesLists.PageIndex = e.NewPageIndex;
            BindPortalModulesListsGrid(Int32.Parse(hdnPortalID.Value));
        }

        protected void gdvPortalModulesLists_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                HiddenField hdnIsActive = (HiddenField)e.Row.FindControl("hdnIsActive");
                HiddenField hdnIsAdmin = (HiddenField)e.Row.FindControl("hdnIsAdmin");

                HtmlInputCheckBox chkIsActiveItem = (HtmlInputCheckBox)e.Row.FindControl("chkBoxIsActiveItem");
                chkIsActiveItem.Attributes.Add("onclick", "javascript:Check(this,'cssCheckBoxIsActiveHeader','" + gdvPortalModulesLists.ClientID + "','cssCheckBoxIsActiveItem');");
                chkIsActiveItem.Checked = bool.Parse(hdnIsActive.Value);
                if (bool.Parse(hdnIsAdmin.Value))
                {
                    chkIsActiveItem.Disabled = true;
                }
            }
            else if (e.Row.RowType == DataControlRowType.Header)
            {
                // HtmlInputCheckBox chkIsActiveHeader = (HtmlInputCheckBox)e.Row.FindControl("chkBoxIsActiveHeader");
                //chkIsActiveHeader.Attributes.Add("onclick", "javascript:SelectAllCheckboxesSpecific(this,'" + gdvPortalModulesLists.ClientID + "','cssCheckBoxIsActiveItem');");
            }
        }

        protected void gdvPortalModulesLists_RowCommand(object sender, GridViewCommandEventArgs e)
        {

        }

        protected void gdvPortalModulesLists_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

        }

        protected void gdvPortalModulesLists_RowEditing(object sender, GridViewEditEventArgs e)
        {

        }

        protected void gdvPortalModulesLists_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {

        }

        protected void imbBtnSaveChanges_Click(object sender, ImageClickEventArgs e)
        {
            try
            {
                string seletedModulesID = string.Empty;
                string IsActive = string.Empty;
                int SelectedPortalID = Int32.Parse(hdnPortalID.Value);
                for (int i = 0; i < gdvPortalModulesLists.Rows.Count; i++)
                {
                    HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvPortalModulesLists.Rows[i].FindControl("chkBoxIsActiveItem");
                    HiddenField hdnModuleID = (HiddenField)gdvPortalModulesLists.Rows[i].FindControl("hdnModuleID");
                    seletedModulesID = seletedModulesID + hdnModuleID.Value.Trim() + ",";
                    IsActive = IsActive + (chkBoxItem.Checked ? "1" : "0") + ",";
                }
                if (seletedModulesID.Length > 1 && IsActive.Length > 0)
                {
                    seletedModulesID = seletedModulesID.Substring(0, seletedModulesID.Length - 1);
                    IsActive = IsActive.Substring(0, IsActive.Length - 1);
                    PortalController.UpdatePortalModules(seletedModulesID, IsActive, SelectedPortalID, GetUsername);
                    ShowMessage("", GetSageMessage("PortalModules", "SelectedChangesAreSavedSuccessfully"), "", SageMessageType.Success);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        /// <summary>
        /// Added by bj to change the Portal
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btnPortalSave_Click(object sender, EventArgs e)
        {
            int portalID = GetPortalID;
            if (int.Parse(ddlPortalName.SelectedItem.Value) != 1)
            {
                SettingProvider sageSP = new SettingProvider();
                sageSP.SaveSageSetting(SettingType.SiteAdmin.ToString(), SageFrameSettingKeys.SuperUserPortalId,
                    ddlPortalName.SelectedItem.Value, GetUsername, portalID.ToString());
                sageSP.ChangePortal(int.Parse(ddlPortalName.SelectedItem.Value));
                BindPortal();
                HttpRuntime.Cache.Remove(CacheKeys.Portals);
                HttpRuntime.Cache.Remove(CacheKeys.SageSetting);
                Response.Redirect(Request.Url.ToString());
            }
            else
            {
                ShowMessage("Current Portal", "", "The portal you want to make Parent is existing parent portal", SageMessageType.Alert);
            }
        }

        public string GetRandomPassword(int length)
        {
            char[] chars = "$%#@!*abcdefghijklmnopqrstuvwxyz1234567890?;ABCDEFGHIJKLMNOPQRSTUVWXYZ^&".ToCharArray();
            string password = string.Empty;
            Random random = new Random();

            for (int i = 0; i < length; i++)
            {
                int x = random.Next(1, chars.Length);
                //Don't Allow Repetation of Characters
                if (!password.Contains(chars.GetValue(x).ToString()))
                    password += chars.GetValue(x);
                else
                    i--;
            }
            return password;
        }
    }
}