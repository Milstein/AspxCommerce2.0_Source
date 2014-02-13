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
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;
using SageFrame.BreadCrum;
using SageFrame.Web;
using System.IO;
using SageFrame.Common.Shared;
using System.Text;
#endregion 

public partial class Modules_BreadCrumb_BreadCrumb : BaseAdministrationUserControl
{
    public int PortalID = 0;
    public string PageName = "", AppPath = string.Empty, pagePath = string.Empty;
    public string DefaultPortalHomePage = "",CultureCode=string.Empty;
    public int MenuID;
    public string Extension;
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeLanguageJS();
        CultureCode = GetCurrentCulture();
        Extension = SageFrameSettingKeys.PageExtension;
        Initialize();
        SageFrameConfig sfConfig = new SageFrameConfig();
        string pagePath = GetApplicationName;
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "BreadCrumGlobal1", " var BreadCrumPagePath='" + pagePath + "';", true);
        pagePath = GetPortalID == 1 ? pagePath : pagePath + "/portal/" + GetPortalSEOName;
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "BreadCrumAdminGlobal" + GetPortalID, " var BreadCrumPageLink='" + ResolveUrl(pagePath) + "';", true);
        PortalID = GetPortalID;
        if (PortalID > 1)
        {
            DefaultPortalHomePage = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + SageFrameSettingKeys.PageExtension);
        }
        else
        {
            DefaultPortalHomePage = ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + SageFrameSettingKeys.PageExtension);
        }
    }

    public void Initialize()
    {
        PortalID = GetPortalID;
        PageName = Path.GetFileNameWithoutExtension(PagePath);
        AppPath = Request.ApplicationPath != "/" ? Request.ApplicationPath : "";
        RegisterClientScriptToPage(ScriptMap.BreadCrumbScript.Key, ResolveUrl(AppPath + ScriptMap.BreadCrumbScript.Value), true);
        MenuID = 0;
        IncludeCss("BreadCrumb", "/Modules/BreadCrumb/css/module.css");
    }
}
