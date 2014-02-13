using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspxCommerce.Core;
using SageFrame.Framework;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxProductLister_AspxProductList : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public string productTitleHeader = string.Empty;
    public int StoreID, PortalID, CustomerID, count;
    public string basePath = string.Empty;
    public string UserName, CultureName;
    public string ModuleCollapsible;
    public string CategoriesWiseItemUrl;

    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                // IncludeCss("ProductList", "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("ProductList", "/Modules/AspxCommerce/AspxProductLister/js/ProductLists.js");

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                basePath = ResolveUrl("~/");
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }

                //StoreSettingInfo DefaultStoreSettings = (StoreSettingInfo)Session["DefaultStoreSettings"];
                //DefaultStoreSettings.AllowAnonymousCheckOut
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);
                StoreSettingConfig ssc = new StoreSettingConfig();
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);
                CategoriesWiseItemUrl = ssc.GetStoreSettingsByKey(StoreSetting.CatWiseItemURL, StoreID, PortalID, CultureName);
            }
            IncludeLanguageJS();
            InitializeJS();
            GetProductListSetting();
            GetProductList();
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

    Hashtable hst = null;
    private void GetProductListSetting()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.CultureName = CultureName;
        List<ProductListSettingInfo> productListSetting =
            AspxProductListerController.GetProductListSetting(aspxCommonObj);
        if (productListSetting != null && productListSetting.Count > 0)
        {
            foreach (ProductListSettingInfo item in productListSetting)
            {
                count = item.ProductCount;
            }
        }
    }

    private void GetProductList()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        int offset = 1;
        int rowTotal = 0;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        List<ProductListInfo> productListInfo = AspxProductListerController.GetProductLists(aspxCommonObj,count, offset);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        StringBuilder ProductListContents = new StringBuilder();
        if (productListInfo != null && productListInfo.Count > 0)
        {
            ProductListContents.Append("<div class=\"cssClassProductLists\"><ul>");
            foreach (ProductListInfo item in productListInfo)
            {
                string name = item.Name;
                rowTotal = item.RowTotal;
                string hrefItem = aspxRedirectPath + "item/" + fixedEncodeURIComponent(item.SKU) + pageExtension;
                ProductListContents.Append("<li><a href='" + hrefItem + "'>" + name + "</a></li>");
            }
            ProductListContents.Append("</ul>");
            if(rowTotal>count)
            {
                string href = aspxRedirectPath + CategoriesWiseItemUrl + pageExtension;
                ProductListContents.Append("<div id=\"productViewMore\" class=\"cssClassViewMore\">");
                ProductListContents.Append("<a href='"+href+"'>");
                ProductListContents.Append("<span>");
                ProductListContents.Append(getLocale("View More")); 
                ProductListContents.Append("</span></a></div>");
            }
            ProductListContents.Append("</div>");
            divProductLists.InnerHtml = ProductListContents.ToString();
        }
        else
        {
            ProductListContents.Append("<span class=\"cssClassNotFound\">");
            ProductListContents.Append(getLocale("There are no products!"));
            ProductListContents.Append("</span>");
            divProductLists.InnerHtml = ProductListContents.ToString();
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

       

