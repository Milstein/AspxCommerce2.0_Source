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
using System.IO;
using System.Web.Hosting;
using SageFrame.Scheduler;
#endregion 

public partial class Modules_Scheduler_FileUploadHandler : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string s = HttpContext.Current.Request.Form["fileUpload"] as string;
        if (!string.IsNullOrEmpty(s))
        {
            string strFileName = Path.GetFileName(HttpContext.Current.Request.Files[0].FileName);
            string strExtension = Path.GetExtension(HttpContext.Current.Request.Files[0].FileName).ToLower();
            string strBaseLocation = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "bin\\"); //HttpContext.Current.Server.MapPath("~/bin/");
            if (!Directory.Exists(strBaseLocation))
            {
                Directory.CreateDirectory(strBaseLocation);
            }
            string strSaveLocation = strBaseLocation + strFileName;
            HttpContext.Current.Request.Files[0].SaveAs(strSaveLocation);
            //strSaveLocation = strSaveLocation.Replace(HttpContext.Current.Server.MapPath("~/"), "");
            //strSaveLocation = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "bin\\"); //strSaveLocation.Replace("\\", "/");
            HttpContext.Current.Response.ContentType = "text/plain";
            HttpContext.Current.Response.Write("({ 'Message': '" + strSaveLocation + "' })");
            HttpContext.Current.Response.End();
        }
    }
}
