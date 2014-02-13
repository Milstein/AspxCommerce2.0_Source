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
using SageFrame.FileManager;
using SageFrame.Framework;
#endregion

public partial class Modules_FileManager_FileUploadHandler : System.Web.UI.Page
{
    FileManagerBase fb = new FileManagerBase();
    protected void Page_Load(object sender, EventArgs e)
    {
        string strFileName = Path.GetFileName(HttpContext.Current.Request.Files[0].FileName);
        string url = Request.Url.ToString();
        int folderId = int.Parse(Session[SageFrame.Common.SessionKeys.FolderID].ToString());
        string strBaseLocation = string.Empty;
        if (Session[SageFrame.Common.SessionKeys.Path] != null)
            strBaseLocation = Session[SageFrame.Common.SessionKeys.Path].ToString();

        string absolutePath = GetAbsolutePath(strBaseLocation);
        try
        {
            string strSaveLocation = absolutePath + strFileName;
            if (!File.Exists(strSaveLocation))
            {
                HttpContext.Current.Request.Files[0].SaveAs(strSaveLocation);
                File.SetAttributes(strSaveLocation, FileAttributes.Archive);
            }
            CacheHelper.Clear("FileManagerFileList");
        }
        catch (Exception ex)
        {
            fb.ProcessException(ex);
        }
    }
    public static string GetAbsolutePath(string filepath)
    {
        return (FileManagerHelper.ReplaceBackSlash(Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath.ToString(), filepath)));
    }
}
