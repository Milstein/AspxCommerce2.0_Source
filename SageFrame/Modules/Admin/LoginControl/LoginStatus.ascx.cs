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
using SageFrame.Web;
using SageFrame.Framework;
using SageFrame.Common;
#endregion

public partial class Modules_Admin_LoginControl_LoginStatus : SageUserControl
{
    public string RegisterURL = string.Empty;
    public string profileURL = string.Empty;
    public string profileText = string.Empty;
    string Extension;
    bool IsUseFriendlyUrls = false;
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeLanguageJS();
        Extension = SageFrameSettingKeys.PageExtension;
        SageFrameConfig pb = new SageFrameConfig();
        IsUseFriendlyUrls = pb.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
        profileText = GetSageMessage("LoginStatus", "MyProfile");
        Literal lnkProfileUrl = (Literal)LoginView1.TemplateControl.FindControl("lnkProfileUrl");
        RegisterURL = pb.GetSettingsByKey(SageFrameSettingKeys.PortalRegistrationPage) + Extension;
        if (pb.GetSettingsByKey(SageFrameSettingKeys.PortalShowProfileLink) == "1")
        {
            string profilepage = pb.GetSettingsByKey(SageFrameSettingKeys.PortalUserProfilePage);
            profilepage = profilepage.ToLower().Equals("user-profile")
                              ? string.Format("/sf/{0}", profilepage)
                              : string.Format("/{0}", profilepage);
            if (GetPortalID > 1)
            {
                profileURL = "<a  href='" + ResolveUrl("~/portal/" + GetPortalSEOName + profilepage + Extension) + "'>" +
                             profileText + "</a>";
            }
            else
            {
                profileURL = "<a  href='" + ResolveUrl("~" + profilepage + Extension) + "'>" + profileText + "</a>";
            }
        }
        else
        {
            profileURL = string.Empty;
        }
        string userName = GetUsername;
        if (userName.ToLower() == "anonymoususer")
        {
            divAnonymousTemplate.Visible = true;
            divLoggedInTemplate.Visible = false;
            userName = "Guest";
        }
        else
        {
            divAnonymousTemplate.Visible = false;
            divLoggedInTemplate.Visible = true;
        }
      //  Label lblWelcomeMsg = LoginView1.FindControl("lblWelcomeMsg") as Label;
       // lblWelcomeMsg.Text = "<h2><span onload='GetMyLocale(this)'>Welcome " + userName + "!</span></h2>";

        lblWelcomeMsg.Text = lblWelcomeMsg.Text + " " + userName;
        if (IsUseFriendlyUrls)
        {
            if (GetPortalID > 1)
            {
                RegisterURL = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + pb.GetSettingsByKey(SageFrameSettingKeys.PortalRegistrationPage) + Extension);
            }
            else
            {
                RegisterURL = ResolveUrl("~/" + pb.GetSettingsByKey(SageFrameSettingKeys.PortalRegistrationPage) + Extension);
            }
        }
        else
        {
            RegisterURL = ResolveUrl("~/Default" + Extension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + pb.GetSettingsByKey(SageFrameSettingKeys.PortalRegistrationPage));
        }               
       
        int UserRegistrationType = pb.GetSettingIntByKey(SageFrameSettingKeys.PortalUserRegistration);
        if (UserRegistrationType > 0)
        {
            RegisterURL = "<span><a href='" + RegisterURL + "'>" + GetSageMessage("LoginStatus", "Register") + "</a></span>";
        }
        else
        {
            RegisterURL = "";
        }
    }

    protected void LoginStatus1_LoggedOut(object sender, EventArgs e)
    {
        SetUserRoles(string.Empty);
        SageFrameConfig pb = new SageFrameConfig();
        bool IsUseFriendlyUrls = pb.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
        if (IsUseFriendlyUrls)
        {
            //Catch activity log            
            if (GetPortalID > 1)
            {
                Response.Redirect("~/portal/" + GetPortalSEOName + "/" + pb.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + Extension);
            }
            else
            {
                Response.Redirect("~/" + pb.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + Extension);
            }
        }
        else
        {
            Response.Redirect("~/Default" + Extension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + pb.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
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
