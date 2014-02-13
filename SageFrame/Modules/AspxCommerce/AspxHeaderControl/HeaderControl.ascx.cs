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
using System.Web;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections;
using System.Text;
using SageFrame.RolesManagement;
using System.Collections.Generic;

public partial class Modules_AspxHeaderControl_HeaderControl : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public string SessionCode = string.Empty;
    public string MyAccountURL, CategoryMgntPageURL, ItemMgntPageURL, ShoppingCartURL, WishListURL, AllowAnonymousCheckOut, AllowMultipleShipping, MinCartSubTotalAmount, AllowWishList, SingleAddressChkOutURL;
    public bool IsUseFriendlyUrls = true;
    public bool FrmLogin = false;
    public int LoginMessageInfoCount = 0;
    public int Count = 0;
    public string HeaderType;
    public int userRoleBit = 0; 
    protected void Page_PreRender(object sender, EventArgs e)
    {
        GetCartItemsCount();
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        SageFrameConfig pagebase = new SageFrameConfig();
        IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
        StoreID = GetStoreID;
        PortalID = GetPortalID;
        CustomerID = GetCustomerID;
        UserName = GetUsername;
        CultureName = GetCurrentCultureName;
        StoreSettingConfig ssc = new StoreSettingConfig();
        MyAccountURL = ssc.GetStoreSettingsByKey(StoreSetting.MyAccountURL, StoreID, PortalID, CultureName);
        CategoryMgntPageURL = ssc.GetStoreSettingsByKey(StoreSetting.CategoryMgntPageURL, StoreID, PortalID, CultureName);
        ItemMgntPageURL = ssc.GetStoreSettingsByKey(StoreSetting.ItemMgntPageURL, StoreID, PortalID, CultureName);
        ShoppingCartURL = ssc.GetStoreSettingsByKey(StoreSetting.ShoppingCartURL, StoreID, PortalID, CultureName);
        WishListURL = ssc.GetStoreSettingsByKey(StoreSetting.WishListURL, StoreID, PortalID, CultureName);
        AllowAnonymousCheckOut = ssc.GetStoreSettingsByKey(StoreSetting.AllowAnonymousCheckOut, StoreID, PortalID, CultureName);
        AllowMultipleShipping = ssc.GetStoreSettingsByKey(StoreSetting.AllowMultipleShippingAddress, StoreID, PortalID, CultureName);
        MinCartSubTotalAmount = ssc.GetStoreSettingsByKey(StoreSetting.MinimumCartSubTotalAmount, StoreID, PortalID, CultureName);
        AllowWishList = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
        SingleAddressChkOutURL = ssc.GetStoreSettingsByKey(StoreSetting.SingleCheckOutURL, StoreID, PortalID, CultureName);
         
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            SageFrameConfig pagebase = new SageFrameConfig();
              if (HttpContext.Current.Session.SessionID != null)
            {
                SessionCode = HttpContext.Current.Session.SessionID.ToString();
            }
            if (!IsPostBack)
            {
                IncludeCss("AspxHeaderControl", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/PopUp/style.css");
                IncludeJs("AspxHeaderControl", "/js/PopUp/custom.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/Modules/AspxCommerce/AspxHeaderControl/js/HeaderControl.js");
                if (HttpContext.Current.Request.UrlReferrer != null)
                {
                    string urlContent = HttpContext.Current.Request.UrlReferrer.AbsolutePath;
                    if (urlContent.Contains(pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage)) && UserName.ToLower() != "anonymoususer")
                    {
                        FrmLogin = true;
                        if (HttpContext.Current.Session["LoginMessageInfo"] == null)
                        {
                            HttpContext.Current.Session["LoginMessageInfo"] = true;
                        }
                        int x = Convert.ToInt32(HttpContext.Current.Session["LoginMessageInfoCount"]);
                        HttpContext.Current.Session["LoginMessageInfoCount"] = x + 1;
                    }
                    else if (HttpContext.Current.Session["LoginMessageInfo"] != null)
                    {
                        HttpContext.Current.Session.Remove("LoginMessageInfo");
                        HttpContext.Current.Session.Remove("LoginMessageInfoCount");
                    }
                }
                AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
                aspxCommonObj.StoreID = StoreID;
                aspxCommonObj.PortalID = PortalID;
                aspxCommonObj.CultureName = CultureName;
                HeaderType = AspxHeaderController.GetHeaderSetting(aspxCommonObj);
                RolesManagementController objController = new RolesManagementController();
                List<RolesManagementInfo> objRoles = objController.GetPortalRoleSelectedList(GetPortalID, GetUsername);
                foreach (RolesManagementInfo role in objRoles)
                {
                    if (role.RoleName == "Publisher")
                    {
                        userRoleBit = 1;
                    }
                }
            }
            IncludeLanguageJS();
           // GetCartItemsCount();
            if (AllowWishList.ToLower() == "true")
            {
                CountWishItems();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    public void GetCartItemsCount()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        aspxCommonObj.CustomerID = GetCustomerID;
        aspxCommonObj.SessionCode = SessionCode;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        StringBuilder cartHeader = new StringBuilder();
        StringBuilder scriptExecute = new StringBuilder();
        Count = AspxHeaderController.GetCartItemsCount(aspxCommonObj);
        string myCartLink = "";
        if (IsUseFriendlyUrls)
        {
            myCartLink = ShoppingCartURL + pageExtension;
        }
        else
        {
            myCartLink = ShoppingCartURL;
        }
        cartHeader.Append("<a id=\"lnkMyCart\"");
        cartHeader.Append(" href=\"");
        cartHeader.Append(aspxRedirectPath);
        cartHeader.Append(myCartLink);
        cartHeader.Append("\">");
        cartHeader.Append(getLocale("My Cart") + " <span class=\"cssClassTotalCount\"> [" + Count + "]</span>");
        cartHeader.Append("</a>");
        litCartHead.Text = cartHeader.ToString();
        if (Count == 0)
        {
            FrmLogin = false;
        }
    }

    public void CountWishItems()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        aspxCommonObj.CustomerID = CustomerID;
        aspxCommonObj.SessionCode = SessionCode;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string pageExtension = SageFrameSettingKeys.PageExtension;
        int wishCount = 0;
        if (UserName.ToLower() != "anonymoususer")
        {
            wishCount = AspxHeaderController.CountWishItems(aspxCommonObj);
        }
        SageFrameConfig sfConfig = new SageFrameConfig();
        string LogInURL = sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage);
        string myWishlistLink = "";
        string loginLink = "";
        if (IsUseFriendlyUrls)
        {
            myWishlistLink = WishListURL + pageExtension;
            loginLink = LogInURL + pageExtension + "?ReturnUrl=" + aspxRedirectPath + myWishlistLink;
        }
        else
        {
            myWishlistLink = WishListURL;
            loginLink = LogInURL;
        }
        string strWListLink = string.Empty;
        if (CustomerID > 0 && UserName.ToLower() != "anonymoususer")
        {
            strWListLink = " href=\"" + aspxRedirectPath + myWishlistLink + "\"";
        }
        else
        {
            strWListLink = " href=\"" + aspxRedirectPath + loginLink + "\"";
        }


        StringBuilder wishHeader = new StringBuilder();
        wishHeader.Append("<a id=\"lnkMyWishlist\"");
        wishHeader.Append(strWListLink);
        wishHeader.Append(">");
        wishHeader.Append(getLocale("My Wishlist"));
        wishHeader.Append(" <span class=\"cssClassTotalCount\">[" + wishCount + "]</span>");

        wishHeader.Append("</a>");
        litWishHead.Text = wishHeader.ToString();
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
