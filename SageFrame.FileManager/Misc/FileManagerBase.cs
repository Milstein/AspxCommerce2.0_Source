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
using System.Text;
using System.Web;
using System.Web.Security;
using SageFrame.ErrorLog;
using SageFrame.Web;
using System.Web.UI;
#endregion

namespace SageFrame.FileManager
{
    public class FileManagerBase : System.Web.UI.Page
    {
        int PortalID = 1;

        public void ProcessException(Exception exc)
        {
            int inID = 0;
            ErrorLogController objController = new ErrorLogController();
            inID = objController.InsertLog((int)SageFrame.Web.SageFrameEnums.ErrorType.AdministrationArea, 11, exc.Message, exc.ToString(),
                                       HttpContext.Current.Request.UserHostAddress, HttpContext.Current.Request.RawUrl, true, GetPortalID, GetUsername);
        }
        
        public int GetPortalID
        {
            get
            {
                try
                {
                    if (Session["SageFrame.PortalID"] != null && Session["SageFrame.PortalID"].ToString() != "")
                    {
                        return int.Parse(Session["SageFrame.PortalID"].ToString());
                    }
                    else
                    {
                        return 1;
                    }
                }
                catch
                {
                    return 1;
                }
            }
        }

        public void SetPortalID(int portalID)
        {
            PortalID = portalID;
        }

        public string GetUsername
        {
            get
            {
                try
                {
                    if (Session["UserName"] == null)
                    {
                        MembershipUser user = Membership.GetUser();
                        if (user != null)
                        {
                            Session["UserName"] = user.UserName;
                            return user.UserName;
                        }
                        else
                        {
                            return "anonymoususer";
                        }

                    }
                    else
                    {
                        return Session["UserName"].ToString();
                    }

                }
                catch
                {
                    return "anonymoususer";
                }
            }
        }
    }
}
