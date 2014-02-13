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
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using SageFrame.Framework;
using System.Data;
using SageFrame.Web;
using SageFrame.PortalSetting;
using System.Collections;
using SageFrame.Web.Utilities;
using SageFrame.SageFrameClass;
using SageFrame.Utilities;
using SageFrame.RolesManagement;
using SageFrame.Shared;
using System.IO;
using System.Text;
using SageFrame.Dashboard;
using SageFrame.Templating;
using System.Web.UI.HtmlControls;
using SageFrame.ModuleMessage;
using SageFrame.Security;
using SageFrame.Common;
using SageFrame.Core;

#endregion

namespace SageFrame
{
    public partial class Sagin_Default : PageBase, SageFrameRoute
    {
        #region "Public Variables"

        public string ControlPath = string.Empty, SageFrameAppPath, SageFrameUserName;
        bool IsUseFriendlyUrls = true;
        public string appPath = string.Empty;
        public string Extension;
        public string templateFavicon = string.Empty;
        public string userName = string.Empty;

        #endregion

        #region "Event Handlers"

        protected void Page_Init(object sender, EventArgs e)
        {
            SetPageInitPart();
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            SetPageLoadPart();
            CoreJs.IncludeLanguageCoreJs(this.Page);
            //if (!IsPostBack)
            //{
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.SetExpires(DateTime.Now.AddSeconds(-1));
                Response.Cache.SetNoStore();
                Response.AppendHeader("pragma", "no-cache");
            //}
        }

        #endregion

        #region "Public methods"

        public void LoadMessageControl()
        {
            PlaceHolder phdPlaceHolder = Page.FindControl("message") as PlaceHolder;
            if (phdPlaceHolder != null)
            {
                LoadControl(phdPlaceHolder, "~/Controls/Message.ascx");
            }
        }

        public override void ShowMessage(string MessageTitle, string Message, string CompleteMessage, bool isSageAsyncPostBack, SageMessageType MessageType)
        {
            string strCssClass = GetMessageCssClass(MessageType);
            int Cont = this.Page.Controls.Count;
            ControlCollection lstControls = Page.FindControl("form1").Controls;
            PlaceHolder phd = Page.FindControl("message") as PlaceHolder;
            if (phd != null)
            {
                foreach (Control c in phd.Controls)
                {
                    if (c.GetType().FullName.ToLower() == "ASP.Controls_message_ascx".ToLower())
                    {
                        SageUserControl tt = (SageUserControl)c;
                        tt.Modules_Message_ShowMessage(tt, MessageTitle, Message, CompleteMessage, isSageAsyncPostBack, MessageType, strCssClass);
                    }
                }
            }
        }

        #endregion

        #region "Private Methods"

        private void SetPageInitPart()
        {
            string PageName = Path.GetFileNameWithoutExtension(PagePath);
            if (PageName != null)
            {
                userName = SecurityPolicy.GetUser(GetPortalID);
                templateFavicon = SetFavIcon(GetActiveTemplate);
                Extension = SageFrameSettingKeys.PageExtension;
                ApplicationController objAppController = new ApplicationController();
                if (!objAppController.CheckRequestExtension(Request))
                {
                    SageInitPart();
                }
                SetGlobalVariable();
                bool IsAdmin = true;
                IncludeStartup(GetPortalID, pchHolder, IsAdmin);
            }
            else
            {
                Response.Redirect(PortalAPI.PageNotAccessibleURL);
            }
        }

        private void SetGlobalVariable()
        {
            appPath = GetAppPath();
            SageFrameAppPath = appPath;
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageFrameGlobalVar1", " var SageFrameAppPath='" + appPath + "';", true);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageFrameGlobalVar2", " var SageFrameUserName='" + GetUsername + "';", true);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageFrameGlobalVar3", " var SageFramePortalName='" + GetPortalSEOName + "';", true);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageFrameGlobalVar4", " var SageFramePortalID='" + GetPortalID + "';", true);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageFrameGlobalVar5", " var SageFrameActiveTemplate='" + GetActiveTemplate + "';", true);
            SageFrameConfig sfConfig = new SageFrameConfig();
            string ms = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MessageTemplate);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageMsgTemplate", " var MsgTemplate='" + ms + "';", true);

        }

        private void SageInitPart()
        {
            ApplicationController objAppController = new ApplicationController();
            if (objAppController.IsInstalled())
            {
                if (!objAppController.CheckRequestExtension(Request))
                {
                    SetPortalCofig();
                    InitializePage();
                    hypUpgrade.NavigateUrl = "~/Admin/sfUpgrader" + Extension;
                    SageFrameConfig sfConfig = new SageFrameConfig();
                    IsUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
                    LoadMessageControl();
                    BindModuleControls();
                }
            }
            else
            {
                HttpContext.Current.Response.Redirect(ResolveUrl("~/Install/InstallWizard.aspx"));
            }
        }
        //private string GetUpgraderUrl()
        //{
        //    string upgradeLink = string.Empty;
        //    if (GetPortalID > 1)
        //    {
        //        upgradeLink = "~/portal/" + GetPortalSEOName + "/Admin/sfUpgrader" + Extension;
        //    }
        //    else
        //    {
        //        upgradeLink = "~/Admin/sfUpgrader" + Extension;
        //    }
        //    return upgradeLink;
        //}

        private void SetPortalCofig()
        {
            Hashtable hstPortals = GetPortals();
            SageUserControl suc = new SageUserControl();
            suc.PagePath = PagePath;
            int portalID = 1;
            #region "Get Portal SEO Name and PortalID"
            if (string.IsNullOrEmpty(Request.QueryString["ptSEO"]))
            {
                if (string.IsNullOrEmpty(PortalSEOName))
                {
                    PortalSEOName = GetDefaultPortalName(hstPortals, 1);
                }
                else if (!hstPortals.ContainsKey(PortalSEOName.ToLower().Trim()))
                {
                    PortalSEOName = GetDefaultPortalName(hstPortals, 1);
                }
                else
                {
                    portalID = int.Parse(hstPortals[PortalSEOName.ToLower().Trim()].ToString());
                }
            }
            else
            {
                PortalSEOName = Request.QueryString["ptSEO"].ToString().ToLower().Trim();
                portalID = Int32.Parse(Request.QueryString["ptlid"].ToString());
            }
            #endregion
            suc.SetPortalSEOName(PortalSEOName.ToLower().Trim());
            Session[SessionKeys.SageFrame_PortalSEOName] = PortalSEOName.ToLower().Trim();
            Session[SessionKeys.SageFrame_PortalID] = portalID;
            Session[SessionKeys.SageFrame_AdminTheme] = ThemeHelper.GetAdminTheme(GetPortalID, GetUsername);
            Globals.sysHst[ApplicationKeys.ActiveTemplate + "_" + portalID] = TemplateController.GetActiveTemplate(GetPortalID).TemplateSeoName;
            Globals.sysHst[ApplicationKeys.ActivePagePreset + "_" + portalID] = PresetHelper.LoadActivePagePreset(GetActiveTemplate, GetPageSEOName(Request.Url.ToString()));
            suc.SetPortalID(portalID);
            SetPortalID(portalID);
            #region "Set user credentials for modules"
            if (SecurityPolicy.GetUser(GetPortalID) != string.Empty)
            {
                SettingProvider objSP = new SettingProvider();
                SageFrameConfig sfConfig = new SageFrameConfig();
                if (SecurityPolicy.GetUser(GetPortalID) != string.Empty)
                {
                    string strRoles = string.Empty;

                    List<SageUserRole> sageUserRolles = objSP.RoleListGetByUsername(SecurityPolicy.GetUser(GetPortalID), GetPortalID);
                    if (sageUserRolles != null)
                    {
                        foreach (SageUserRole userRole in sageUserRolles)
                        {
                            strRoles += userRole.RoleId + ",";
                        }
                    }
                    if (strRoles.Length > 1)
                    {
                        strRoles = strRoles.Substring(0, strRoles.Length - 1);
                    }
                    if (strRoles.Length > 0)
                    {
                        SetUserRoles(strRoles);
                    }
                }
            }
            #endregion
        }

        private void SetPageLoadPart()
        {
            ApplicationController objAppController = new ApplicationController();
            if (!objAppController.CheckRequestExtension(Request))
            {
                SagePageLoadPart();
            }
        }

        private void SagePageLoadPart()
        {
            if (!IsPostBack)
            {
                string sageNavigateUrl = string.Empty;
                SageFrameConfig sfConfig = new SageFrameConfig();
                if (IsUseFriendlyUrls)
                {
                    if (GetPortalID > 1)
                    {
                        sageNavigateUrl = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") + SageFrameSettingKeys.PageExtension);
                    }
                    else
                    {
                        sageNavigateUrl = ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") + SageFrameSettingKeys.PageExtension);
                    }
                }
                else
                {
                    sageNavigateUrl = ResolveUrl("~/Default" + Extension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-"));
                }
                hypHome.NavigateUrl = sageNavigateUrl;
                hypHome.Text = sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage);
                hypHome.ImageUrl = GetAdminImageUrl("home.png", true);
                hypPreview.NavigateUrl = sageNavigateUrl;
                lnkAccount.NavigateUrl = GetProfileLink(sfConfig);
                Image imgProgress = (Image)UpdateProgress1.FindControl("imgPrgress");
                if (imgProgress != null)
                {
                    imgProgress.ImageUrl = GetAdminImageUrl("ajax-loader.gif", true);
                }
                // bool IsAdmin = false;
                FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
                if (ticket != null)
                {
                    int LoggedInPortalID = int.Parse(ticket.UserData.ToString());
                    if (ticket.Name != ApplicationKeys.anonymousUser)
                    {
                        string[] sysRoles = SystemSetting.SUPER_ROLE;
                        this.hypUpgrade.Visible = Roles.IsUserInRole(ticket.Name, sysRoles[0]) ? true : false;
                        if (GetPortalID == LoggedInPortalID || Roles.IsUserInRole(ticket.Name, sysRoles[0]))
                        {
                            RoleController _role = new RoleController();
                            string userinroles = _role.GetRoleNames(GetUsername, LoggedInPortalID);
                            if (userinroles != "" || userinroles != null)
                            {
                                divAdminControlPanel.Attributes.Add("style", "display:block");
                                ////foreach (string role in sysRoles)
                                ////{
                                ////    if (Roles.IsUserInRole(user.UserName, role))
                                ////    {
                                ////        IsAdmin = true;
                                ////        break;
                                ////    }
                                ////}
                            }
                            else
                            {
                                divAdminControlPanel.Attributes.Add("style", "display:none");
                            }
                        }
                        else
                        {
                            divAdminControlPanel.Attributes.Add("style", "display:none");
                        }
                    }
                    else
                    {
                        divAdminControlPanel.Attributes.Add("style", "display:none");
                    }

                }
                if (IsHandheld())
                {
                    divAdminControlPanel.Attributes.Add("style", "display:none");
                }
            }
            SessionTrackerController sTracController = new SessionTrackerController();
            sTracController.SetSessionTrackerValues(GetPortalID.ToString(), GetUsername);
        }

        private void BindModuleControls()
        {
            string preFix = string.Empty;
            string paneName = string.Empty;
            string ControlSrc = string.Empty;
            string phdContainer = string.Empty;
            string PageSEOName = string.Empty;
            SageUserControl suc = new SageUserControl();
            string PageName = PagePath;
            if (PagePath == null)
            {
                PageName = PagePath;
            }
            else
            {
                PageName = PagePath;
            }
            suc.PagePath = PageName;
            if (PagePath != null)
            {
                PageSEOName = GetPageSEOName(PagePath);
            }
            else
            {
                SageFrameConfig sfConfig = new SageFrameConfig();
                PageSEOName = GetPageSEOName(sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
            }
            //:TODO: Need to get controlType and pageID from the selected page from routing path
            //string controlType = "0";
            //string pageID = "2";
            StringBuilder redirecPath = new StringBuilder();
            Uri url = HttpContext.Current.Request.Url;
            if (PageSEOName != string.Empty)
            {
                DataSet dsPageSettings = new DataSet();
                SageFrameConfig sfConfig = new SageFrameConfig();
                dsPageSettings = sfConfig.GetPageSettingsByPageSEONameForAdmin("1", PageSEOName, GetUsername);
                if (bool.Parse(dsPageSettings.Tables[0].Rows[0][0].ToString()) == true)// Is Page Exists
                {
                    if (bool.Parse(dsPageSettings.Tables[0].Rows[0][1].ToString()) == true)// Is Page Aceessable
                    {
                        // Get ModuleControls data table
                        DataTable dtPages = dsPageSettings.Tables[1];
                        if (dtPages != null && dtPages.Rows.Count > 0)
                        {
                            OverridePageInfo(dtPages);
                        }
                        // Get ModuleDefinitions data table
                        DataTable dtPageModule = dsPageSettings.Tables[2];
                        if (dtPageModule != null && dtPageModule.Rows.Count > 0)
                        {
                            for (int i = 0; i < dtPageModule.Rows.Count; i++)
                            {
                                paneName = dtPageModule.Rows[i]["PaneName"].ToString();
                                if (string.IsNullOrEmpty(paneName))
                                    paneName = "ContentPane";
                                string UserModuleID = dtPageModule.Rows[i]["UserModuleID"].ToString();
                                ControlSrc = "/" + dtPageModule.Rows[i]["ControlSrc"].ToString();
                                string SupportsPartialRendering = dtPageModule.Rows[i]["SupportsPartialRendering"].ToString();
                                PlaceHolder phdPlaceHolder = (PlaceHolder)this.FindControl(paneName);
                                if (paneName.ToLower().Equals("navigation")) { divNavigation.Attributes.Add("style", "display:block"); }
                                if (paneName.ToLower().Equals("middlemaincurrent")) { divRight.Attributes.Add("style", "display:block"); }
                                if (paneName.ToLower().Equals("cpanel")) { divBottompanel.Attributes.Add("style", "display:block"); }
                                if (paneName.ToLower().Equals("lefta")) { divLeft.Attributes.Add("style", "display:block"); }
                                if (phdPlaceHolder != null)
                                {
                                    bool status = LoadModuleInfo(phdPlaceHolder, int.Parse(UserModuleID), 0);
                                    phdPlaceHolder = LoadControl(i.ToString(), bool.Parse(SupportsPartialRendering), phdPlaceHolder, ControlSrc, paneName, UserModuleID, "", "", false, new HtmlGenericControl("div"), new HtmlGenericControl("span"), false);
                                    if (!status) { LoadModuleInfo(phdPlaceHolder, int.Parse(UserModuleID), 1); }
                                }
                            }
                        }
                    }
                    else
                    {
                        if (IsUseFriendlyUrls)
                        {
                            if (GetPortalID > 1)
                            {
                                redirecPath.Append(url.Scheme);
                                redirecPath.Append("://");
                                redirecPath.Append(url.Authority);
                                redirecPath.Append(PortalAPI.GetApplicationName);
                                redirecPath.Append("/portal/");
                                redirecPath.Append(GetPortalSEOName);
                                redirecPath.Append("/");
                                redirecPath.Append(PortalAPI.LoginPageWithExtension);
                            }
                            else
                            {
                                redirecPath.Append(url.Scheme);
                                redirecPath.Append("://");
                                redirecPath.Append(url.Authority);
                                redirecPath.Append(PortalAPI.LoginURL);
                            }
                        }
                        else
                        {
                            redirecPath.Append(url.Scheme);
                            redirecPath.Append("://");
                            redirecPath.Append(url.Authority);
                            redirecPath.Append(PortalAPI.GetApplicationName);
                            redirecPath.Append("/Default");
                            redirecPath.Append(Extension);
                            redirecPath.Append("?ptlid=");
                            redirecPath.Append(GetPortalID);
                            redirecPath.Append("&ptSEO=");
                            redirecPath.Append(GetPortalSEOName);
                            redirecPath.Append("&pgnm=");
                            redirecPath.Append(sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage));
                        }
                        string strCurrentURL = Request.Url.ToString();
                        if (redirecPath.ToString().Contains("?"))
                        {
                            redirecPath.Append("&ReturnUrl=");
                            redirecPath.Append(strCurrentURL);
                        }
                        else
                        {
                            redirecPath.Append("?ReturnUrl=");
                            redirecPath.Append(strCurrentURL);
                        }
                        HttpContext.Current.Response.Redirect(redirecPath.ToString());
                    }
                }
                else
                {
                    if (IsUseFriendlyUrls)
                    {
                        if (GetPortalID > 1)
                        {
                            redirecPath.Append(url.Scheme);
                            redirecPath.Append("://");
                            redirecPath.Append(url.Authority);
                            redirecPath.Append(PortalAPI.GetApplicationName);
                            redirecPath.Append("/portal/");
                            redirecPath.Append(GetPortalSEOName);
                            redirecPath.Append("/");
                            redirecPath.Append(PortalAPI.PageNotFoundPageWithExtension);
                        }
                        else
                        {
                            redirecPath.Append(url.Scheme);
                            redirecPath.Append("://");
                            redirecPath.Append(url.Authority);
                            redirecPath.Append(PortalAPI.PageNotFoundURL);
                        }
                    }
                    else
                    {
                        redirecPath.Append(url.Scheme);
                        redirecPath.Append("://");
                        redirecPath.Append(url.Authority);
                        redirecPath.Append(PortalAPI.GetApplicationName);
                        redirecPath.Append("/Default");
                        redirecPath.Append(Extension);
                        redirecPath.Append("?ptlid=");
                        redirecPath.Append(GetPortalID);
                        redirecPath.Append("&ptSEO=");
                        redirecPath.Append(GetPortalSEOName);
                        redirecPath.Append("&pgnm=");
                        redirecPath.Append(sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalPageNotFound));
                    }
                    Response.Redirect(ResolveUrl(redirecPath.ToString()));
                }
            }
        }

        private void LoadControl(PlaceHolder ContainerControl, string controlSource)
        {
            UserControl ctl = this.Page.LoadControl(controlSource) as UserControl;
            ctl.EnableViewState = true;
            ContainerControl.Controls.Add(ctl);
        }

        private string GetProfileLink(SageFrameConfig sfConfig)
        {
            string profileURL = "";
            if (IsUseFriendlyUrls)
            {
                if (GetPortalID > 1)
                {
                    profileURL = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + "sfUser-Profile" + Extension);
                }
                else
                {
                    profileURL = ResolveUrl("~/Admin/" + "sfUser-Profile" + Extension);
                }
            }
            else
            {
                profileURL = ResolveUrl("~/Default" + Extension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + "sfUser-Profile");
            }
            return profileURL;
        }

        private bool LoadModuleInfo(PlaceHolder Container, int UserModuleID, int position)
        {
            bool status = false;
            ModuleMessageInfo objMessage = ModuleMessageController.GetModuleMessageByUserModuleID(UserModuleID, GetCurrentCulture());
            if (objMessage != null)
            {
                if (objMessage.IsActive)
                {
                    if (objMessage.MessagePosition == position)
                    {
                        string modeStyle = "sfPersist";
                        switch (objMessage.MessageMode)
                        {
                            case 0:
                                modeStyle = "sfPersist";
                                break;
                            case 1:
                                modeStyle = "sfSlideup";
                                break;
                            case 2:
                                modeStyle = "sfFadeout";
                                break;
                        }
                        string messageTypeStyle = "sfInfo";
                        switch (objMessage.MessageType)
                        {
                            case 0:
                                messageTypeStyle = "sfInfo";
                                break;
                            case 1:
                                messageTypeStyle = "sfWarning";
                                break;
                        }
                        string totalStyle = string.Format("{0} {1}", modeStyle, messageTypeStyle);
                        HtmlGenericControl moduleDiv = new HtmlGenericControl("div");
                        moduleDiv.Attributes.Add("class", "sfModuleinfo");
                        StringBuilder sb = new StringBuilder();
                        string CloseForEver = string.Format("close_{0}", UserModuleID);
                        sb.Append("<div class='" + totalStyle + "'><div class='sfLinks'><a class='sfClose' href='#'>Close</a>   <a class='sfNclose' id='" + CloseForEver + "' href='#'>Close and Never Show Again</a></div>");
                        sb.Append(objMessage.Message);
                        sb.Append("</div>");
                        moduleDiv.InnerHtml = sb.ToString();
                        Container.Controls.Add(moduleDiv);
                        status = true;
                    }
                }
            }
            return status;


        }

        #endregion

        #region SageFrameRoute Members

        public string PagePath
        {
            get;
            set;
        }

        public string PortalSEOName
        {
            get;
            set;
        }
        public string UserModuleID
        {
            get;
            set;
        }
        public string ControlType
        {
            get;
            set;
        }
        public string ControlMode { get; set; }
        public string Key { get; set; }
        public string Param { get; set; }
        #endregion
    }
}
