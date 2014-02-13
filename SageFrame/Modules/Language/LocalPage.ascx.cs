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
using SageFrame.Web;
using SageFrame.Localization;
using System.Collections.Generic;
#endregion

public partial class Modules_LocalPage_LocalPage : BaseAdministrationUserControl
{
    public static string path = string.Empty;
    public event ImageClickEventHandler CancelButtonClick;
    protected void Page_Load(object sender, EventArgs e)
    {
        Initialize();
        if (!IsPostBack)
        {
            string modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            path = modulePath;
            LoadPages();
            BindAvailableLocales();
            GetFlagImage();
            AddImageUrl();
        }
    }
    public void Initialize()
    {
        IncludeCssFile(AppRelativeTemplateSourceDirectory + "css/popup.css");
    }

    protected void BindAvailableLocales()
    {
        this.ddlAvailableLocales.DataSource = LocalizationSqlDataProvider.GetAvailableLocales();
        this.ddlAvailableLocales.DataTextField = "LanguageName";
        this.ddlAvailableLocales.DataValueField = "LanguageCode";
        this.ddlAvailableLocales.DataBind();
        ddlAvailableLocales.SelectedIndex =
           ddlAvailableLocales.Items.IndexOf(ddlAvailableLocales.Items.FindByValue(GetCurrentCulture()));
    }

    protected void ddlAvailableLocales_SelectedIndexChanged(object sender, EventArgs e)
    {
        GetFlagImage();
        LoadPages();
    }
    protected void GetFlagImage()
    {
        string code = this.ddlAvailableLocales.SelectedValue;
        string resolvedUrl = ResolveUrl("~/");
        imgFlag.ImageUrl = ResolveUrl(resolvedUrl+"images/flags/" + code.Substring(code.IndexOf("-") + 1) + ".png");
    }


    private void AddImageUrl()
    {
        imbCancel.ImageUrl = GetTemplateImageUrl("btncancel.png", true);
        imbUpdate.ImageUrl = GetTemplateImageUrl("btnSave.png", true);

    }

    public void LoadPages()
    {
        List<LocalPageInfo> lstPages = LocaleController.GetLocalPageName(GetPortalID, this.ddlAvailableLocales.SelectedValue.ToString());
        gdvLocalPage.DataSource = lstPages;
        gdvLocalPage.DataBind();
    }

    protected void Page_init(object sender, EventArgs e)
    {

        string modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalVariables", " var aspxservicePath='" + ResolveUrl(modulePath) + "';", true);

    }

    protected void imbUpdate_Click(object sender, ImageClickEventArgs e)
    {
        List<LocalPageInfo> lstLocalPage = new List<LocalPageInfo>();

        foreach (GridViewRow gvRow in gdvLocalPage.Rows)
        {
            TextBox txtLocalName = (TextBox)gvRow.FindControl("txtLocalPageName");
            TextBox txtLocalPageCaption = (TextBox)gvRow.FindControl("txtLocalPageCaption");
            LocalPageInfo objInfo = new LocalPageInfo();
            objInfo.PageID = int.Parse(gdvLocalPage.DataKeys[int.Parse(gvRow.DataItemIndex.ToString())]["PageID"].ToString());
            objInfo.LocalPageName = txtLocalName.Text;
            objInfo.LocalPageCaption = txtLocalPageCaption.Text;
            objInfo.CultureCode = ddlAvailableLocales.SelectedValue.ToString();
            lstLocalPage.Add(objInfo);
        }

        try
        {
            LocaleController.AddUpdateLocalPage(lstLocalPage);
            LoadPages();
            SageFrame.Common.CacheHelper.Clear("MegaMenuNepInd");
            SageFrame.Common.CacheHelper.Clear("MegaMenuNepBuss");
            SageFrame.Common.CacheHelper.Clear("MegaMenuEngInd");
            SageFrame.Common.CacheHelper.Clear("MegaMenuEngBiz");
        }
        catch (Exception)
        {

            throw;
        }
    }
    protected void gdvLocalPage_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
    protected void gdvLocalPage_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {

    }

    protected void gdvLocalPage_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gdvLocalPage.PageIndex = e.NewPageIndex;
        LoadPages();
    }
    protected void imbCancel_Click(object sender, ImageClickEventArgs e)
    {
        CancelButtonClick(sender, e);
    }
}
