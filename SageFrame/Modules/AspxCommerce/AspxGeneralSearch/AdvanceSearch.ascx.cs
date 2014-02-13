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
using System.Collections.Generic;
using System.Web;
using SageFrame.Web;
using SageFrame.Framework;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxCommerce_AspxGeneralSearch_AdvanceSearch : BaseAdministrationUserControl
{
    public int StoreID;
    public int CustomerID;
    public int PortalID;
    public string UserName;
    public string CultureName;
    public string  UserIP, CountryName;
    public string SessionCode = string.Empty;
    public string NoImageAdSearchPath, AllowOutStockPurchase, AllowWishListAdvSearch;
    public int NoOfItemsInARow;
    public string ItemDisplayMode;
    public List<AspxTemplateKeyValue> AspxTemplateValue = new List<AspxTemplateKeyValue>();
    protected void page_init(object sender, EventArgs e)
    {
        try
        {
            InitializeJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("AdvanceSearch", "/Templates/" + TemplateName + "/css/MessageBox/style.css",
                           "/Templates/" + TemplateName + "/css/JQueryUI/jquery.ui.all.css",
                           "/Templates/" + TemplateName + "/css/PopUp/style.css",
                           "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css",
                           "/Templates/" + TemplateName + "/css/FancyDropDown/fancy.css");
                IncludeJs("AdvanceSearch", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/PopUp/custom.js",
                          "/js/jquery.tipsy.js", "/js/FancyDropDown/itemFancyDropdown.js",
                          "/js/SageFrameCorejs/itemTemplateView.js",
                          "/Modules/AspxCommerce/AspxGeneralSearch/js/AdvanceSearch.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }

                UserIP = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIP, out CountryName);

                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageAdSearchPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                AllowWishListAdvSearch = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
                NoOfItemsInARow = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfDisplayItems, StoreID, PortalID, CultureName));
                ItemDisplayMode = ssc.GetStoreSettingsByKey(StoreSetting.ItemDisplayMode, StoreID, PortalID, CultureName);
                IncludeLanguageJS();
            }
            GetAspxTemplates();
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("template", ResolveUrl("~/js/Templating/tmpl.js"));
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));      
        Page.ClientScript.RegisterClientScriptInclude("Paging", ResolveUrl("~/js/Paging/jquery.pagination.js"));
        Page.ClientScript.RegisterClientScriptInclude("aspxTemplate", ResolveUrl("~/js/Templating/AspxTemplate.js"));
    }
    private void GetAspxTemplates()
    {
        AspxTemplateValue = AspxGetTemplates.GetAspxTemplateKeyValue();

        foreach (AspxTemplateKeyValue value in AspxTemplateValue)
        {
            string xx = value.TemplateKey + "@" + value.TemplateValue;
            Page.ClientScript.RegisterArrayDeclaration("jsTemplateArray", "\'" + xx + "\'");
        }
    }
}
