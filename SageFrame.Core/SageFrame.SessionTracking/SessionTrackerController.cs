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

using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Web;
using SageFrame.Web;
using SageFrame.Common; 

#endregion

namespace SageFrame.Web
{
    public class SessionTrackerController
    {
        public SessionTrackerController()
        {
        }

        public void SetSessionTrackerValues(string portalID, string userName)
        {
            SessionTracker sessionTracker = (SessionTracker)HttpContext.Current.Session[SessionKeys.Tracker];
            if (string.IsNullOrEmpty(sessionTracker.PortalID))
            {
                sessionTracker.PortalID = portalID;
                sessionTracker.Username = userName;
                SageFrameConfig sfConfig = new SageFrameConfig();
                sessionTracker.InsertSessionTrackerPages = sfConfig.GetSettingsByKey(SageFrameSettingKeys.InsertSessionTrackingPages);
                SageFrame.Web.SessionLog SLog = new SageFrame.Web.SessionLog();
                SLog.SessionTrackerUpdateUsername(sessionTracker, userName, portalID);
                HttpContext.Current.Session[SessionKeys.Tracker] = sessionTracker;
            }
        }
    }
}
