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
using SageFrame.Security;
#endregion 


public partial class Modules_Scheduler_ScheduleView : BaseAdministrationUserControl
{
    public static string ImagePath = "";
    protected void Page_Init(object sender, EventArgs e)
    {
        ImagePath = this.ResolveUrl(this.AppRelativeTemplateSourceDirectory.ToString());
        Initialize();       
    }

    #region Methods

        public void Initialize()
        {
            //IncludeCssFile(AppRelativeTemplateSourceDirectory + "css/admin.css");
            IncludeCssFile(AppRelativeTemplateSourceDirectory + "css/facebox.css");
            IncludeCssFile(AppRelativeTemplateSourceDirectory + "css/style.css");
            IncludeCssFile(AppRelativeTemplateSourceDirectory + "css/module.css");

            IncludeCss("Scheduler", "/Modules/Admin/Scheduler/css/module.css");
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "GlobalVariable1", " var SchedularModuleFilePath='" + ResolveUrl(ImagePath) + "';", true);

            Page.ClientScript.RegisterClientScriptInclude("JQueryFacebox", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/jquery-1.3.2.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryAlertEase", ResolveUrl(this.AppRelativeTemplateSourceDirectory +"Scripts/facebox.js"));
            Page.ClientScript.RegisterClientScriptInclude("json2", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/json2.js"));
            Page.ClientScript.RegisterClientScriptInclude("JGrid", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.grid.js"));
            Page.ClientScript.RegisterClientScriptInclude("JSagePaging1", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/SagePaging.js"));
            Page.ClientScript.RegisterClientScriptInclude("JGlobal", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.global.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryValidater", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/jquery.validate.js"));
            Page.ClientScript.RegisterClientScriptInclude("JdateFormat", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.dateFormat.js"));
            Page.ClientScript.RegisterClientScriptInclude("JTablesorter", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.tablesorter.js"));

            Page.ClientScript.RegisterClientScriptInclude("JGrid", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.grid.js"));
            Page.ClientScript.RegisterClientScriptInclude("JSagePaging", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/SagePaging.js"));
            Page.ClientScript.RegisterClientScriptInclude("JGlobal1", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.global.js"));
            Page.ClientScript.RegisterClientScriptInclude("JdateFormat", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.dateFormat.js"));
            Page.ClientScript.RegisterClientScriptInclude("JTablesorter", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/GridView/jquery.tablesorter.js"));

            Page.ClientScript.RegisterClientScriptInclude("JQueryJson", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/json2.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryUI", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/jquery-ui.min.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryToolTip2", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/jquery.datepick.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryMaskValidater", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/jquery.maskedinput-1.3.min.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryMaskValidaterq", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/jquery.easing.1.3.js"));
            Page.ClientScript.RegisterClientScriptInclude("JQueryMaskValidaterqw", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/alertbox.js"));
          Page.ClientScript.RegisterClientScriptInclude("JQueryAjaxUpload", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/ajaxupload.js"));

          
            Page.ClientScript.RegisterClientScriptInclude("JQueryToolTip1", ResolveUrl(this.AppRelativeTemplateSourceDirectory + "Scripts/SchedularForm.js"));

        }
    #endregion



}
