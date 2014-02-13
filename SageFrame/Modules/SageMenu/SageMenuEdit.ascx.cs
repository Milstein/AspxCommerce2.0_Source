#region "References"
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
using SageFrame.Web;
using SageFrame.SageMenu;
using System.Collections.Generic;
using SageFrame.Pages;
using System.Text;
using SageFrame.Security;
#endregion

public partial class Modules_SageMenu_SageMenuEdit : BaseAdministrationUserControl
{

    public string appPath = string.Empty, UserModuleID = string.Empty;
    public int PortalID = 0;
    public string CultureCode = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = SageUserModuleID;
        PortalID = GetPortalID;
        appPath = GetApplicationName;
        CultureCode = GetCurrentCulture();
        IncludeJs("MenuManager", "/Modules/SageMenu/js/MenuManager.js");
        IncludeJs("MenuManager", false, "/Editors/ckeditor/ckeditor.js", "/Editors/ckeditor/adapters/jquery.js", "/Administrator/Templates/Default/js/ui.tree.js", "/Administrator/Templates/Default/js/contextmenu.js");
        IncludeJs("MenuManager", false, "/Administrator/Templates/Default/js/ajaxupload.js", "/js/jquery.validate.js", "/js/jquery.alerts.js");
        IncludeCss("MenuManager", "/Modules/SageMenu/css/module.css", "/Administrator/Templates/Default/css/ui.tree.css", "/css/jquery.alerts.css");
        IncludeJsTop("menuJs", false, "/Administrator/Templates/Default/js/dashboardjs.js", "/Administrator/Templates/Default/js/jquery.tooltip.js");        
        BuildAccessControlledSelection();
        AddImageUrls();
    }

    protected void BuildAccessControlledSelection()
    {
        StringBuilder sb = new StringBuilder();
        RoleController _role = new RoleController();
        string[] roles = _role.GetRoleNames(GetUsername, GetPortalID).ToLower().Split(',');
        if (roles.Contains(SystemSetting.SUPER_ROLE[0].ToLower()))
        {
            sb.Append("<label>");
            sb.Append("<input id='rdbPages' type='radio' name='rdbMenuItem' value='0' />");            
            sb.Append("Pages</label>");
            sb.Append("<label>");
            sb.Append("<input id='rdbExternalLink' type='radio' name='rdbMenuItem' value='2' />");            
            sb.Append("External Link</label>");
        }
        else
        {
            sb.Append("<label>");
            sb.Append("<input id='rdbPages' type='radio' name='rdbMenuItem' value='0' />");            
            sb.Append("Pages</label>");
            sb.Append("<label>");
            sb.Append("<input id='rdbExternalLink' type='radio' name='rdbMenuItem' value='2' />");            
            sb.Append("External Link</label>");
        }
        ltrMenuRadioButtons.Text = sb.ToString();
    }

    private void AddImageUrls()
    {
        string imageFolder = "~/Administrator/Templates/Default/images/";
        imgRemove.Src = GetImageUrl(imageFolder, "context-delete.png", true);
    }
    public string GetImageUrl(string _imageFolder, string imageName, bool isServerControl)
    {
        string path = string.Empty;
        if (isServerControl == true)
        {
            path = _imageFolder + imageName;
        }
        return path;
    }
}