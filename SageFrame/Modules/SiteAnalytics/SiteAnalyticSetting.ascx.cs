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
using DashBoardControl.Info;
using DashBoardControl;
using System.Collections.Generic;
using SageFrame.Web;
#endregion

public partial class Modules_DashBoardControl_DashBoardControlSetting : BaseAdministrationUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadSettings();
        }
    }

    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            SaveSetting();
            ShowMessage("", "", "Save sucess", SageMessageType.Success);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void LoadSettings()
    {
        List<DashBoardSettingInfo> lstSetting = DashBoardController.GetDashBoardSetting(int.Parse(SageUserModuleID), GetPortalID);
        foreach (DashBoardSettingInfo obj in lstSetting)
        {
            switch (obj.SettingKey)
            {
                case "START_DATE":
                    txtStartDate.Text = obj.SettingValue;
                    break;
                case "END_DATE":
                    txtEndDate.Text = obj.SettingValue;
                    break;              
            }
        }
    }

    private void SaveSetting()
    {
        List<DashBoardSettingInfo> lstSetting = new List<DashBoardSettingInfo>();
        lstSetting.Add(new DashBoardSettingInfo(DashBoardSetting.START_DATE.ToString(), txtStartDate.Text));
        lstSetting.Add(new DashBoardSettingInfo(DashBoardSetting.END_DATE.ToString(), txtEndDate.Text));
        lstSetting.ForEach(
            delegate(DashBoardSettingInfo obj)
            {
                obj.PortalID = GetPortalID;
                obj.UserModuleID = int.Parse(SageUserModuleID);
                obj.AddedBy = GetUsername;
                obj.IsActive = 1;
            }
            );
        try
        {
            DashBoardController.AddDashBoardSetting(lstSetting);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}