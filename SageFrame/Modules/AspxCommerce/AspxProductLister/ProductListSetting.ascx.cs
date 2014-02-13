using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Framework;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxProductLister_ProductListSetting : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                //IncludeCss("ProductListSetting", "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("ProductListSetting", "/Modules/AspxCommerce/AspxProductLister/js/ProductListsSetting.js");

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }

                //StoreSettingInfo DefaultStoreSettings = (StoreSettingInfo)Session["DefaultStoreSettings"];
                //DefaultStoreSettings.AllowAnonymousCheckOut
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);

            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}
