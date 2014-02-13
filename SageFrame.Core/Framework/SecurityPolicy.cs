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
using System.Security.Permissions;
using System.Web.Security;

#endregion

namespace SageFrame.Framework
{
    public class SecurityPolicy
    {
        #region "Private Static Variables"

        private static bool m_Initialized = false;

        private static bool m_ReflectionPermission;

        private static bool m_WebPermission;

        private static bool m_AspNetHostingPermission;

        #endregion

        #region "Public Constants"

        //  all supported permissions need an associated public string constant
        public const string ReflectionPermission = "ReflectionPermission";

        public const string WebPermission = "WebPermission";

        public const string AspNetHostingPermission = "AspNetHostingPermission";

        #endregion

        #region "Private Methods"

        /// <summary>
        /// 
        /// </summary>
        private static void GetPermissions()
        {
            if (!m_Initialized)
            {
                //  test RelectionPermission
                System.Security.CodeAccessPermission securityTest;
                try
                {
                    securityTest = new ReflectionPermission(PermissionState.Unrestricted);
                    securityTest.Demand();
                    m_ReflectionPermission = true;
                }
                catch
                {
                    m_ReflectionPermission = false;
                }
                //  test WebPermission
                try
                {
                    securityTest = new System.Net.WebPermission(PermissionState.Unrestricted);
                    securityTest.Demand();
                    m_WebPermission = true;
                }
                catch
                {
                    m_WebPermission = false;
                }
                //  test WebHosting Permission (Full Trust)
                try
                {
                    securityTest = new AspNetHostingPermission(AspNetHostingPermissionLevel.Unrestricted);
                    securityTest.Demand();
                    m_AspNetHostingPermission = true;
                }
                catch
                {
                    m_AspNetHostingPermission = false;
                }
                m_Initialized = true;
            }
        }

        #endregion

        #region "Public Methods"

        /// <summary>
        ///  Get Permission For The Web Application On Which The Application Is Deployed
        /// </summary>
        public static string Permissions
        {
            get
            {
                string strPermissions = "";
                if (Framework.SecurityPolicy.HasReflectionPermission())
                {
                    strPermissions = (strPermissions + (", " + Framework.SecurityPolicy.ReflectionPermission));
                }
                if (Framework.SecurityPolicy.HasWebPermission())
                {
                    strPermissions = (strPermissions + (", " + Framework.SecurityPolicy.WebPermission));
                }
                if (Framework.SecurityPolicy.HasAspNetHostingPermission())
                {
                    strPermissions = (strPermissions + (", " + Framework.SecurityPolicy.AspNetHostingPermission));
                }
                if ((strPermissions != ""))
                {
                    strPermissions = strPermissions.Substring(2);
                }
                return strPermissions;
            }
        }

        /// <summary>
        /// Provide IsHosting Permission Granted
        /// </summary>
        /// <returns></returns>
        public static bool HasAspNetHostingPermission()
        {
            GetPermissions();
            return m_AspNetHostingPermission;
        }

        /// <summary>
        /// Provide IsReflection Permission Granted
        /// </summary>
        /// <returns></returns>
        public static bool HasReflectionPermission()
        {
            GetPermissions();
            return m_ReflectionPermission;
        }

        /// <summary>
        /// Provide Has Web Permission Granted
        /// </summary>
        /// <returns></returns>
        public static bool HasWebPermission()
        {
            GetPermissions();
            return m_WebPermission;
        }

        /// <summary>
        /// Check Permission 
        /// </summary>
        /// <param name="permissions">Permissions</param>
        /// <param name="permission"></param>
        /// <returns></returns>
        public static bool HasPermissions(string permissions, ref string permission)
        {
            bool _HasPermission = true;
            if ((permissions != ""))
            {
                foreach (string mpermission in ((permissions + ";")).Split(Convert.ToChar(";")))
                {
                    if ((mpermission.Trim() != ""))
                    {
                        switch (mpermission)
                        {
                            case AspNetHostingPermission:
                                if ((HasAspNetHostingPermission() == false))
                                {
                                    _HasPermission = false;
                                }
                                break;
                            case ReflectionPermission:
                                if ((HasReflectionPermission() == false))
                                {
                                    _HasPermission = false;
                                }
                                break;
                            case WebPermission:
                                if ((HasWebPermission() == false))
                                {
                                    _HasPermission = false;
                                }
                                break;
                        }
                    }
                }
            }
            return _HasPermission;
        }

        /// <summary>
        /// Return The Name of the Logged in User by PortalID
        /// </summary>
        /// <param name="PortalID">PortalID</param>
        /// <returns>Logged In UserName</returns>
        public static string GetUser(int PortalID)
        {
            string user = string.Empty;
            try
            {
                PageBase objPageBase = new PageBase();
                HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName + "_" + objPageBase.GetAppPath() + "_" + PortalID];

                //authCookie.
                if (authCookie != null && authCookie.Value != ApplicationKeys.anonymousUser)
                {
                    if (authCookie.Value != null)
                    {
                        FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                        if (ticket != null)
                        {
                            user = ticket.Name;
                        }
                        else
                        {
                            user = ApplicationKeys.anonymousUser;
                        }
                    }
                    else
                    {
                        user = ApplicationKeys.anonymousUser;
                    }
                }
                else
                {
                    user = ApplicationKeys.anonymousUser;
                }
            }
            catch (Exception)
            {

            }
            return user;
        }

        public static FormsAuthenticationTicket GetUserTicket(int PortalID)
        {
            PageBase objPageBase = new PageBase();
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName + "_" + objPageBase.GetAppPath() + "_" + PortalID];
            if (authCookie != null && authCookie.Value != string.Empty)
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                return ticket;
            }
            else
            {
                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, ApplicationKeys.anonymousUser, DateTime.Now,
                                                                            DateTime.Now.AddMinutes(30),
                                                                              true,
                                                                              PortalID.ToString(),
                                                                              FormsAuthentication.FormsCookiePath);
                return ticket;
            }
        }

        #endregion

        #region "Obsolete Methods"

        [Obsolete("Replaced by correctly spelt method")]
        public static bool HasRelectionPermission()
        {
            GetPermissions();
            return m_ReflectionPermission;
        }

        #endregion
    }
}
