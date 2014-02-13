﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Web;
using SageFrame.NewsLetter;

public partial class Modules_NewsLetter_NewsLetterView : BaseAdministrationUserControl
{
    public string ModulePath, UserName, PageExt = string.Empty;
    public int UserModuleID, PortalID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserName = GetUsername;
        UserModuleID = Int32.Parse(SageUserModuleID);
        PortalID = GetPortalID;
        IncludeLanguageJS();
        PageExt = SageFrameSettingKeys.PageExtension;
        ModulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        IncludeCss("newsletter", "/Modules/NewsLetter/css/module.css");
        IncludeJs("newsjs", "/Modules/NewsLetter/js/NewsLetterView.js", "/Modules/NewsLetter/js/jquery.validate.js");
        GetNLSetting(UserModuleID, PortalID);
    }
    Hashtable hst = null;
    public void GetNLSetting(int UserModuleID, int PortalID)
    {
        try
        {
            string modulePath = this.AppRelativeTemplateSourceDirectory;
            hst = AppLocalized.getLocale(modulePath);
            NL_Controller cont = new NL_Controller();
            List<NL_SettingInfo> objSettingList = cont.GetNLSetting(UserModuleID, PortalID);
            string href = string.Empty;
            string header = string.Empty;
            foreach (NL_SettingInfo objInfo in objSettingList)
            {
                header = "<h2>" + getLocale("Subscribe") + "</h2><h4>" + getLocale("Our Newsletter") + "</h4>";
                href = objInfo.UnSubscribePageName + PageExt;
            }
            moduleHeader.Text = header;
            UnSubscribe.Text = "<a id='btnUnsubscibe' href='" + href + "' class='sfUnSubscribeButton'>"+getLocale("Click here to UnSubscribe")+"</a>";
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }
}