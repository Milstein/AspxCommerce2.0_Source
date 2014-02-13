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
using SageFrame.Web.Utilities;
using System.IO;
#endregion 

namespace SageFrame.Modules.Admin.SQL
{
    public partial class ctl_SqlQueryAnalyser : BaseAdministrationUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    AddImageUrls();
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        private void AddImageUrls()
        {
            imbUploadSqlScript.ImageUrl = GetTemplateImageUrl("imgupload.png", true);
            imbExecuteSql.ImageUrl = GetTemplateImageUrl("imgrun.png", true);
        }

        #region "Control Events"

        protected void imbUploadSqlScript_Click(object sender, EventArgs e)
        {
            LoadSqlScript();
        }

        protected void imbExecuteSql_Click(object sender, EventArgs e)
        {
            ExecuteSql();
        } 

        #endregion

        #region "private methods"

        private void LoadSqlScript()
        {
            try
            {
                if (IsPostBack)
                {
                    if (fluSqlScript.HasFile && fluSqlScript.PostedFile.FileName != string.Empty)
                    {
                        string ext = Path.GetExtension(fluSqlScript.PostedFile.FileName);
                        if (Path.GetExtension(fluSqlScript.PostedFile.FileName) != ".sql" && Path.GetExtension(fluSqlScript.PostedFile.FileName) != ".txt")
                        {
                            ShowMessage(SageMessageTitle.Information.ToString(), "Invalid file format", "", SageMessageType.Alert);

                        }
                        else
                        {
                            var file = fluSqlScript.PostedFile.InputStream;
                            //GetBytesFromStream(System.IO.Stream)
                            file.Seek(0, SeekOrigin.Begin);
                            System.IO.StreamReader scriptFile = new System.IO.StreamReader(file);
                            txtSqlQuery.Text = scriptFile.ReadToEnd();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        //public static byte[] ConvertImageToByteArray(Stream afuInputStream, int contentLength)
        //{
        //    byte[] sqlBinaryData = new byte[contentLength];
        //    afuInputStream.Read(sqlBinaryData, 0, contentLength);
        //    return sqlBinaryData;
        //}

        private void ExecuteSql()
        {
            try
            {
                SQLHandler objSqlh = new SQLHandler();
                if (chkRunAsScript.Checked == true)
                {
                    string strError = objSqlh.ExecuteScript(txtSqlQuery.Text);
                    if (string.IsNullOrEmpty(strError))
                    {
                       
                       
                        ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("SQL", "TheQueryCompletedSuccessfully"), "", SageMessageType.Success);
                       
                    }
                    else
                    {
                        ShowMessage(SageMessageTitle.Notification.ToString(), strError, "", SageMessageType.Alert);
                       
                    }
                }
                else
                {
                   System.Data.DataTable dt = objSqlh.ExecuteSQL(txtSqlQuery.Text);
                   if (dt != null)
                   {
                       gdvResults.DataSource = dt;
                       gdvResults.DataBind();
                   }
                   else
                   {
                      
                       ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("SQL", "ThereIsAnErrorInYourQuery"), "", SageMessageType.Alert);

                   }
                }
                string txt = txtSqlQuery.Text;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        } 

        #endregion

        
    }
}