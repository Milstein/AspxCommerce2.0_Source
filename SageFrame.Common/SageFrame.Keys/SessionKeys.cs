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
using System.Text;
using SageFrame.Web;

#endregion

namespace SageFrame.Common
{
    public static partial class SessionKeys
    {
        private static int portalID = PortalID();
        public static string TemplateError = "TemplateError_" + portalID;
        public static string SageFrame_PortalSEOName = "SageFrame.PortalSEOName_" + portalID;
        public static string SageFrame_PortalID = "SageFrame.PortalID_" + portalID;
        public static string SageFrame_ActiveTemplate = "SageFrame.ActiveTemplate_" + portalID;
        public static string SageFrame_ActivePreset = "SageFrame.ActivePreset_" + portalID;
        public static string SageFrame_CustomerID = "SageFrame.CustomerID_" + portalID;
        public static string SageFrame_AdminTheme = "SageFrame.AdminTheme_" + portalID;
        public static string SageUserRoles = "SageUserRoles_" + portalID;
        public static string Tracker = "Tracker_" + portalID;
        public static string Ssl = "Ssl_" + portalID;
        public static string prevurl = "prevurl_" + portalID;
        public static string CaptchaImageText = "CaptchaImageText_" + portalID;
        public static string SageUICulture = "SageUICulture_" + portalID;
        public static string SageCulture = "SageCulture_" + portalID;
        public static string SageFrame_UserProfilePic = "SageFrame.UserProfilePic_" + portalID;
        public static string ModuleCss = "ModuleCss";
        public static string ModuleJs = "ModuleJs";
        public static string SageFrame_StoreID = "SageFrame.StoreID_" + portalID;
        public static string pagename = "pagename";
        public static string moduleid = "moduleid";
        public static string LoginHitCount = "LoginHitCount_" + portalID;
        public static string ServiceProvider = "ServiceProvider_" + portalID;
        public static string Identifier = "Identifier";
        public static string MessageTemplateID = "MessageTemplateID";
        public static string UserImage = "UserImage_" + portalID;
        public static string PropertyValueDataTable = "PropertyValueDataTable";
        public static string EditProfileID = "EditProfileID";
        public static string Profile_Image = "Profile_Image_" + portalID;
        public static string FolderID = "FolderID";
        public static string Path = "Path";
        public static string SageRoles = "SageRoles_" + portalID;
        public static int PortalID()
        {
            SageFrameConfig objSage = new SageFrameConfig();
            return objSage.GetPortalID;
        }
    }
}
