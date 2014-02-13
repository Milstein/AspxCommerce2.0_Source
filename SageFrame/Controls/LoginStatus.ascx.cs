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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using SageFrame.Web;
using SageFrame.Framework;
using SageFrame.Security;
using SageFrame.Common;

public partial class LoginStatus : BaseAdministrationUserControl
{
    string Extension;
    bool IsUseFriendlyUrls = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            IncludeLanguageJS();
            Extension = SageFrameSettingKeys.PageExtension;
            SageFrameConfig sfConfig = new SageFrameConfig();
            IsUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
            FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
            if (ticket != null)
            {
                int LoggedInPortalID = int.Parse(ticket.UserData.ToString());
                if (ticket.Name != ApplicationKeys.anonymousUser)
                {
                    string[] sysRoles = SystemSetting.SUPER_ROLE;
                    if (GetPortalID == LoggedInPortalID || Roles.IsUserInRole(ticket.Name, sysRoles[0]))
                    {
                        RoleController _role = new RoleController();
                        string userinroles = _role.GetRoleNames(GetUsername, LoggedInPortalID);
                        if (userinroles != string.Empty || userinroles != null)
                        {

                        }
                        else
                        {
                            lnkloginStatus.Text = SageLogInText;
                            lnkloginStatus.CommandName = "LOGIN";
                        }
                    }
                    else
                    {
                        lnkloginStatus.Text = SageLogInText;
                        lnkloginStatus.CommandName = "LOGIN";
                    }
                    lnkloginStatus.Text = SageLogOutText;
                    lnkloginStatus.CommandName = "LOGOUT";                    
                }
                else
                {
                    lnkloginStatus.Text = SageLogInText;
                    lnkloginStatus.CommandName = "LOGIN";
                }
            }
            else
            {
                lnkloginStatus.Text = SageLogInText;
                lnkloginStatus.CommandName = "LOGIN";
            }
        }
        catch
        {
        }
    }
    private string strLogOut = string.Empty;
    private string strLogIn = string.Empty;
    public string SageLogInText
    {
        get
        {
            if (strLogIn == string.Empty)
            {
                strLogIn = GetSageMessage("LoginStatus", "Login");
            }
            return strLogIn;
        }
    }
    public string SageLogOutText
    {
        get
        {
            if (strLogOut == string.Empty)
            {
                strLogOut = GetSageMessage("LoginStatus", "Logout");
            }
            return strLogOut;
        }
    }

    protected void lnkloginStatus_Click(object sender, EventArgs e)
    {
        try
        {
            ///Update the Session Tracker
            SessionTracker sessionTracker = (SessionTracker)Session[SessionKeys.Tracker];
            if (sessionTracker != null)
            {
                SageFrame.Web.SessionLog sLog = new SageFrame.Web.SessionLog();
                sLog.SessionLogEnd(sessionTracker);
            }
            SessionTracker sessionTrackerNew = new SessionTracker();
            if (sessionTrackerNew != null)
            {
                SageFrame.Web.SessionLog sLogNew = new SageFrame.Web.SessionLog();
                sLogNew.SessionLogStart(sessionTrackerNew);
            }
            HttpContext.Current.Session[SessionKeys.Tracker] = sessionTrackerNew;
            string ReturnUrl = string.Empty;
            string RedUrl = string.Empty;
            SageFrameConfig sfConfig = new SageFrameConfig();
            if (lnkloginStatus.CommandName == "LOGIN")
            {
                if (IsUseFriendlyUrls)
                {
                    if (Request.QueryString["ReturnUrl"] == null)
                    {
                        ReturnUrl = Request.RawUrl.ToString();
                        if (!(ReturnUrl.ToLower().Contains(SageFrameSettingKeys.PageExtension)))
                        {
                            //ReturnUrl = ReturnUrl.Remove(strURL.LastIndexOf('/'));
                            if (ReturnUrl.EndsWith("/"))
                            {
                                ReturnUrl += sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") + SageFrameSettingKeys.PageExtension;
                            }
                            else
                            {
                                ReturnUrl += '/' + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") + SageFrameSettingKeys.PageExtension;
                            }
                        }
                    }
                    else
                    {
                        ReturnUrl = Request.QueryString["ReturnUrl"].ToString();
                    }
                    if (GetPortalID > 1)
                    {
                        RedUrl = "~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage) + SageFrameSettingKeys.PageExtension;

                    }
                    else
                    {
                        RedUrl = "~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage) + SageFrameSettingKeys.PageExtension;
                    }
                }
                else
                {
                    string[] arrUrl;
                    string strURL = string.Empty;
                    arrUrl = Request.RawUrl.Split('?');
                    string[] keys = Request.QueryString.AllKeys;
                    for (int i = 0; i < Request.QueryString.Count; i++)
                    {
                        string[] values = Request.QueryString.GetValues(i);
                        strURL += keys[i] + '=' + values[0] + '&';
                    }
                    if (strURL.Length > 0)
                    {
                        strURL = strURL.Remove(strURL.LastIndexOf('&'));
                    }
                    ReturnUrl = arrUrl[0] + Server.UrlEncode(strURL.Length > 0 ? "?" + strURL : "");
                    RedUrl = "~/Default" + Extension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage) + "&ReturnUrl=" + ReturnUrl;
                }
            }
            else
            {
            //                FormsAuthentication.SignOut();                
                HttpCookie authenticateCookie = new HttpCookie(FormsAuthentication.FormsCookieName + "_" + GetApplicationName + "_" + GetPortalID);
                authenticateCookie.Expires = DateTime.Now.AddYears(-1);
                Response.Cookies.Add(authenticateCookie);
                lnkloginStatus.Text = "Login";
                SetUserRoles(string.Empty);
                if (IsUseFriendlyUrls)
                {
                    if (GetPortalID > 1)
                    {
                        RedUrl = "~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") + SageFrameSettingKeys.PageExtension;
                    }
                    else
                    {
                        RedUrl = "~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") + SageFrameSettingKeys.PageExtension;
                    }
                }
                else
                {
                    RedUrl = "~/Default" + Extension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-");
                }
            }

            Response.Redirect(RedUrl, false);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    public void SetUserRoles(string strRoles)
    {
        Session[SessionKeys.SageUserRoles] = strRoles;
        HttpCookie cookie = HttpContext.Current.Request.Cookies[CookiesKeys.SageUserRolesCookie];
        if (cookie == null)
        {
            cookie = new HttpCookie(CookiesKeys.SageUserRolesCookie);
        }
        cookie[CookiesKeys.SageUserRolesProtected] = strRoles;
        HttpContext.Current.Response.Cookies.Add(cookie);
    }
}
