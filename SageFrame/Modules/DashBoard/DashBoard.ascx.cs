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
using System.Web.UI.HtmlControls;
using SageFrame.Web;
using SageFrame.Dashboard;
using SageFrame.Framework;
using System.Data;
#endregion 

namespace SageFrame.Modules.DashBoard
{
    public partial class DashBoard : BaseAdministrationUserControl
    {
        public string Extension;
        protected void Page_Load(object sender, EventArgs e)
        {
            Extension = SageFrameSettingKeys.PageExtension;

            SageFrameConfig sfConf = new SageFrameConfig();
            string PortalLogoTemplate = sfConf.GetSettingsByKey(SageFrameSettingKeys.PortalLogoTemplate);
            if (SageFrameSettingKeys.PortalLogoTemplate.ToString() != string.Empty)
            {
                lblSfInfo.Text = PortalLogoTemplate.ToString();
            }
            if (!Page.IsPostBack)
            {
                DashBoardView();
            }
        }
        protected void imbAdmin_Click(object sender, ImageClickEventArgs e)
        {
        }
        private void DashBoardView()
        {
            try
            {               
                string PageSEOName = string.Empty;
                if (Request.QueryString["pgnm"] != null)
                {
                    PageSEOName = Request.QueryString["pgnm"].ToString();
                }
                else
                {
                    PageBase pb = new PageBase();
                    SageUserControl SageUser = new SageUserControl();
                    PageSEOName = pb.GetPageSEOName(SageUser.PagePath);
                }
                DashboardController objController = new DashboardController();
                List<DashboardInfo> lstDashboard = objController.DashBoardView(PageSEOName, GetUsername, GetPortalID);
                lstDashboard.ForEach(
                    delegate(DashboardInfo obj)
                    {
                        obj.IconFile = string.Format("{0}/PageImages/{1}", Request.ApplicationPath == "/" ? "" : Request.ApplicationPath, obj.IconFile);
                        obj.Url = obj.Url + Extension;
                    }
                    );
                rptDashBoard.DataSource = lstDashboard; 
                rptDashBoard.DataBind();            
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }            
        }

        protected void rptDashBoard_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            
        }

        #region SageFrameRoute Members

        #endregion
        }
    }
