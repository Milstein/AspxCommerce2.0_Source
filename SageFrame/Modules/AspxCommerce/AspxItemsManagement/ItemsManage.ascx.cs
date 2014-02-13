/*
AspxCommerce® - http://www.AspxCommerce.com
Copyright (c) 20011-2012 by AspxCommerce
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
using System;
using System.Web.UI;
using SageFrame.Framework;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Web;
using System.Web.Security;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxItemsManagement_ItemsManage : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName, PriceUnit, DimensionUnit, WeightUnit;
    public string userEmail = string.Empty;
    public int MaximumFileSize, MaxDownloadFileSize;
    public string LowStockItemRss, RssFeedUrl;
    public string CurrencyCodeSlected;
    protected void Page_Load(object sender, EventArgs e)    
    {
        try
        {
            if (!IsPostBack)
            {
                Page.ClientScript.RegisterClientScriptInclude("JQueryFormValidated", ResolveUrl("~/js/FormValidation/jquery.validate.js"));
                IncludeCss("ItemsManage", "/Templates/" + TemplateName + "/css/GridView/tablesort.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/AjaxUploader/fileuploader.css",
                   "/Administrator/Templates/Default/css/Tabs/slidingtabs-vertical.css");
              
                IncludeJs("ItemsManage", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/GridView/jquery.grid.js",
                          "/js/GridView/SagePaging.js", "/js/GridView/jquery.global.js",
                          "/js/GridView/jquery.dateFormat.js", "/js/DateTime/date.js",
                                         "/js/ImageGallery/jquery.mousewheel.js",
                          "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js",
                        
                          "/js/Tabs/jquery.slidingtabs.js",
                          "/js/AjaxFileUploader/ajaxupload.js", "/js/PopUp/custom.js",
                          "/Modules/AspxCommerce/AspxItemsManagement/js/ItemManagement.js", "/js/PopUp/popbox.js",
                          "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js",
                          "/js/CurrencyFormat/jquery.formatCurrency.all.js", "/js/AjaxFileUploader/fileuploader.js");

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
                if (ticket != null && ticket.Name != ApplicationKeys.anonymousUser)
                {
                    MembershipController member = new MembershipController();
                    UserInfo userDetail = member.GetUserDetails(GetPortalID, GetUsername);
                    userEmail = userDetail.Email;
                }
                StoreSettingConfig ssc = new StoreSettingConfig();
                MaximumFileSize = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaximumImageSize, StoreID, PortalID, CultureName));
                MaxDownloadFileSize = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxDownloadFileSize, StoreID, PortalID, CultureName));
                PriceUnit = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
                WeightUnit =ssc.GetStoreSettingsByKey(StoreSetting.WeightUnit, StoreID, PortalID, CultureName);
                DimensionUnit = ssc.GetStoreSettingsByKey(StoreSetting.DimensionUnit, StoreID, PortalID, CultureName);
                LowStockItemRss = ssc.GetStoreSettingsByKey(StoreSetting.LowStockItemRss, StoreID, PortalID, CultureName);
                CurrencyCodeSlected = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID,CultureName);
                if(LowStockItemRss.ToLower()=="true")
                {
                   RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }

            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            string modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalVariables", " var aspxItemModulePath='" + ResolveUrl(modulePath) + "';", true);
            InitializeJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("JTablesorter", ResolveUrl("~/js/GridView/jquery.tablesorter.js"));
        Page.ClientScript.RegisterClientScriptInclude("JQueryFormValidate", ResolveUrl("~/js/FormValidation/jquery.form-validation-and-hints.js"));  
        Page.ClientScript.RegisterClientScriptInclude("J9", ResolveUrl("~/Editors/ckeditor/ckeditor.js"));
        Page.ClientScript.RegisterClientScriptInclude("J10", ResolveUrl("~/js/encoder.js"));
         
      
    }
}
