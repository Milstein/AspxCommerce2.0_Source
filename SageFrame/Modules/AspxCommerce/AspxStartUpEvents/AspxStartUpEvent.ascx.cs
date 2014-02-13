using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;
using SageFrame.Common;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Framework;
using System.Data;
using SageFrame.Shared;
using System.IO;
using System.Text.RegularExpressions;
using System.Text;
using SageFrame.Web.Utilities;

public partial class Modules_AspxCommerce_AspxStartUpEvents_AspxStartUpEvent : SageFrameStartUpControl
{
    string sageRedirectPath = string.Empty;
    string sageNavigateUrl = string.Empty;
    public string LogInURL = string.Empty;
    public string PageExtension;
    public string SendEcommerceEmailsFrom = string.Empty;
    bool IsUseFriendlyUrls = true;
    SageFrameConfig sfConfig = new SageFrameConfig();
    AspxStartUpController ctl = new AspxStartUpController();

    protected void Page_Init(object sender, EventArgs e)
    {
        Session[SessionKeys.SageFrame_StoreID] = GetPortalID;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        SetCustomerID();
        CheckStoreAccessible();
        CreateGlobalVariables();
        LoadGlobalVariables();
        GetStoreSettings();
        IncludeCoreLanguageJS();
        IncludeTemplateLanguageJS();
        IncludeRssFeedLanguageJS();
        if (HttpContext.Current.Session["IsLoginClick" + GetUsername] != null)
        {
            if (bool.Parse(HttpContext.Current.Session["IsLoginClick" + GetUsername].ToString()))
            {

                UpdateCartAnonymoususertoRegistered(GetStoreID, GetPortalID, GetCustomerID,
                                                    HttpContext.Current.Session.SessionID.ToString());
                HttpContext.Current.Session["IsLoginClick" + GetUsername] = false;
            }
        }
    }

    private StoreAccessResultInfo GetStoreAccessByCurrentData(StoreAccessDetailsInfo storeAccessTracker)
    {
        try
        {
            List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();

            ParaMeterCollection.Add(new KeyValuePair<string, string>("@IPAddress", storeAccessTracker.UserIPAddress));
            ParaMeterCollection.Add(new KeyValuePair<string, string>("@Domain", storeAccessTracker.UserDomainURL));
            ParaMeterCollection.Add(new KeyValuePair<string, string>("@CustomerName", storeAccessTracker.Username));
            ParaMeterCollection.Add(new KeyValuePair<string, string>("@Email", storeAccessTracker.UserEmail));
            ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", storeAccessTracker.PortalID));
            ParaMeterCollection.Add(new KeyValuePair<string, string>("@StoreID", storeAccessTracker.StoreID));
            SQLHandler sqlH = new SQLHandler();
            StoreAccessResultInfo obj = sqlH.ExecuteAsObject<StoreAccessResultInfo>("dbo.usp_Aspx_CheckStoreAccess", ParaMeterCollection);
            return obj;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    private void CheckStoreAccessible()
    {
        SageFrameConfig sfConfig = new SageFrameConfig();
        string loginPage = sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage);
        PageExtension = SageFrameSettingKeys.PageExtension;
        //TODO:: check store access control here Based on @IPAddress, @Domain, @CustomerName, @email, @StoreID, @PortalID

        if (!Request.Url.AbsoluteUri.Contains(loginPage))
        {
            StoreAccessDetailsInfo storeAccessTracker = new StoreAccessDetailsInfo();
            storeAccessTracker.PortalID = GetPortalID.ToString();
            storeAccessTracker.StoreID = GetStoreID.ToString();
            storeAccessTracker.Username = GetUsername;

            MembershipController member = new MembershipController();
            //RoleController role = new RoleController();
            UserInfo user = member.GetUserDetails(GetPortalID, GetUsername);

            if (!string.IsNullOrEmpty(user.UserName))
            {
                storeAccessTracker.UserEmail = user.Email;
            }
            else
            {
                storeAccessTracker.UserEmail = "";
            }
            StoreAccessResultInfo saResults =
                (StoreAccessResultInfo)GetStoreAccessByCurrentData(storeAccessTracker);
            bool storeClosed = (bool)saResults.StoreClosed;
            bool storeAccessible = (bool)saResults.IsAccess;
            if (!storeClosed)
            {
                if (storeAccessible)
                {

                }
                else
                {
                    //Store NOT Accessed Page
                    string blockedPortalUrl = string.Empty;
                    if (GetPortalID > 1)
                    {
                        if (IsUseFriendlyUrls)
                        {
                            blockedPortalUrl =
                                ResolveUrl("~/portal/" + GetPortalSEOName + "/" +
                                           sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) +
                                           PageExtension);
                        }
                        else
                        {
                            blockedPortalUrl =
                                ResolveUrl("~/portal/" + GetPortalSEOName + "/" +
                                           sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));

                        }
                    }
                    else
                    {

                        if (IsUseFriendlyUrls)
                        {
                            blockedPortalUrl =
                                ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) +
                                           PageExtension);
                        }
                        else
                        {
                            blockedPortalUrl =
                                ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));

                        }
                    }
                    Session["StoreBlocked"] = blockedPortalUrl;
                    HttpContext.Current.Response.Redirect(
                        ResolveUrl("~/Modules/AspxCommerce/Store-Not-Accessed" + PageExtension));

                }
            }
            else
            {
                //Store Closed Page
                string closePortalUrl = string.Empty;
                if (GetPortalID > 1)
                {
                    if (IsUseFriendlyUrls)
                    {
                        closePortalUrl =
                            ResolveUrl("~/portal/" + GetPortalSEOName + "/" +
                                       sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + PageExtension);
                    }
                    else
                    {
                        closePortalUrl =
                            ResolveUrl("~/portal/" + GetPortalSEOName + "/" +
                                       sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));

                    }
                }
                else
                {

                    if (IsUseFriendlyUrls)
                    {
                        closePortalUrl =
                            ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) +
                                       PageExtension);
                    }
                    else
                    {
                        closePortalUrl =
                            ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));

                    }
                }
                Session["StoreClosed"] = closePortalUrl;
                HttpContext.Current.Response.Redirect(ResolveUrl("~/Modules/AspxCommerce/Store-Closed" + PageExtension));
            }
        }
    }

    private void CreateGlobalVariables()
    {
        Page.ClientScript.RegisterClientScriptInclude("AspxCommereCore", ResolveUrl("~/js/SageFrameCorejs/aspxcommercecore.js"));
        Page.ClientScript.RegisterClientScriptInclude("Session", ResolveUrl("~/js/Session.js"));
        IsUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
        PageExtension = SageFrameSettingKeys.PageExtension;
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalServicePath", " var aspxservicePath='" + ResolveUrl("~/") + "Modules/AspxCommerce/AspxCommerceServices/" + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalRootPath", " var aspxRootPath='" + ResolveUrl("~/") + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalTemplateFolderPath", " var aspxTemplateFolderPath='" + ResolveUrl("~/") + "Templates/" + TemplateName + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "pageExtension", " var pageExtension='" + PageExtension + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "storeID", " var storeID='" + GetStoreID + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "portalID", " var portalID='" + GetPortalID + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "culturename", " var cultureName='" + GetCurrentCultureName + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "templatename", " var templateName='" + TemplateName + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "customerid", " var customerID='" + GetCustomerID + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "username", " var userName='" + GetUsername + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "templateName", " var templateName='" + TemplateName + "';", true);
        //  ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "noimagepath", " var aspxTemplateFolderPath='" + ResolveUrl("~/") + "Templates/" + TemplateName + "';", true);
        //  ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "defaultlogourl", " var aspxTemplateFolderPath='" + ResolveUrl("~/") + "Templates/" + TemplateName + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "isfriendlyurl", " var IsUseFriendlyUrls='" + IsUseFriendlyUrls + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "sessioncode", " var sessionCode='" + HttpContext.Current.Session.SessionID.ToString() + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "clientIPAddress", " var clientIPAddress='" + HttpContext.Current.Request.UserHostAddress + "';", true);
        string userIP = HttpContext.Current.Request.UserHostAddress;
        string countryName = "";
        IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
        ipToCountry.GetCountry(userIP, out countryName);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "clientCountry", " var aspxCountryName='" + countryName + "';", true);
        StoreSettingConfig ssc = new StoreSettingConfig();
        string myCartURL = ssc.GetStoreSettingsByKey(StoreSetting.ShoppingCartURL, GetStoreID, GetPortalID, GetCurrentCultureName);
        SendEcommerceEmailsFrom = ssc.GetStoreSettingsByKey(StoreSetting.SendEcommerceEmailsFrom, GetStoreID, GetPortalID, GetCurrentCultureName);
        string sortByOptions = ssc.GetStoreSettingsByKey(StoreSetting.SortByOptions, GetStoreID, GetPortalID, GetCurrentCultureName);
        string sortByOptionsDefault = ssc.GetStoreSettingsByKey(StoreSetting.SortByOptionsDefault, GetStoreID, GetPortalID, GetCurrentCultureName);
        string viewAsOptions = ssc.GetStoreSettingsByKey(StoreSetting.ViewAsOptions, GetStoreID, GetPortalID, GetCurrentCultureName);
        string viewAsOptionsDefault = ssc.GetStoreSettingsByKey(StoreSetting.ViewAsOptionsDefault, GetStoreID, GetPortalID, GetCurrentCultureName);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "sortByOptions", " var sortByOptions='" + sortByOptions + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "sortByOptionsDefault", " var sortByOptionsDefault='" + sortByOptionsDefault + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "viewAsOptions", " var viewAsOptions='" + viewAsOptions + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "viewAsOptionsDefault", " var viewAsOptionsDefault='" + viewAsOptionsDefault + "';", true);
        Session["SendEcommerceEmailsFrom"] = SendEcommerceEmailsFrom;
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "myCartURL", " var myCartURL='" + myCartURL + "';", true);
        string userFullName = ctl.GetFullName(GetPortalID, GetUsername);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "userFullName", " var userFullName='" + userFullName + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "homeURL", " var homeURL='" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "LoginURL", " var LogInURL='" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage) + "';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "itemImagePath", " var itemImagePath='Modules/AspxCommerce/AspxItemsManagement/uploads/';", true);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "categoryImagePath", " var categoryImagePath='Modules/AspxCommerce/AspxCategoryManagement/uploads/';", true);

        if (IsUseFriendlyUrls)
        {
            if (GetPortalID > 1)
            {
                sageRedirectPath = ResolveUrl("~/portal/" + GetPortalSEOName + "/");
                sageNavigateUrl = ResolveUrl("~/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + PageExtension);
            }
            else
            {
                sageRedirectPath = ResolveUrl("~/");
                sageNavigateUrl = ResolveUrl("~/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + PageExtension);
            }
        }
        else
        {
            sageRedirectPath = ResolveUrl("{~/Default" + PageExtension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
            sageNavigateUrl = ResolveUrl("~/Default" + PageExtension + "?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
        }
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalRedirectPath", " var aspxRedirectPath='" + sageRedirectPath + "';", true);
    }

    private void SetCustomerID()
    {
        SageUserControl suc = new SageUserControl();
        int customerID = 0;
        FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
        if (ticket != null)
        {
            CustomerGeneralInfo sageUserCust = CustomerGeneralInfoController.CustomerIDGetByUsername(ticket.Name,
                                                                                                     GetPortalID,
                                                                                                     GetStoreID);
            if (sageUserCust != null)
            {
                customerID = sageUserCust.CustomerID;
            }
            Session[SessionKeys.SageFrame_CustomerID] = customerID;
            suc.SetCustomerID(customerID);
            SetCustomerID(customerID);
        }
    }

    private void GetStoreSettings()
    {
        Hashtable hst = new Hashtable();
        StoreSettingProvider sep = new StoreSettingProvider();
        if (HttpContext.Current.Cache["AspxStoreSetting" + GetPortalID.ToString() + GetStoreID.ToString()] != null)
        {
            hst = (Hashtable)HttpContext.Current.Cache["AspxStoreSetting" + GetPortalID.ToString() + GetStoreID.ToString()];
            StoreSettingConfig ssc = new StoreSettingConfig();
            decimal timeToDeleteCartItems = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.TimeToDeleteAbandonedCart, GetStoreID, GetPortalID, GetCurrentCultureName));
            decimal timeToAbandonCart = Convert.ToDecimal(ssc.GetStoreSettingsByKey(StoreSetting.CartAbandonedTime, GetStoreID, GetPortalID, GetCurrentCultureName));
            ctl.DeleteAbandonedCartItems(GetStoreID, GetPortalID, timeToDeleteCartItems, timeToAbandonCart);
        }
        else
        {
            DataTable dt = sep.GetStoreSettings(GetStoreID, GetPortalID, GetCurrentCultureName); //GetSettingsByPortal();   
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                    StoreSettingConfig ssc = new StoreSettingConfig();
                    decimal timeToDeleteCartItems = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.TimeToDeleteAbandonedCart, GetStoreID, GetPortalID, GetCurrentCultureName));
                    decimal timeToAbandonCart = Convert.ToDecimal(ssc.GetStoreSettingsByKey(StoreSetting.CartAbandonedTime, GetStoreID, GetPortalID, GetCurrentCultureName));
                    ctl.DeleteAbandonedCartItems(GetStoreID, GetPortalID, timeToDeleteCartItems, timeToAbandonCart);
                }
                HttpContext.Current.Cache.Insert("AspxStoreSetting" + GetPortalID.ToString() + GetStoreID.ToString(), hst);
            }
        }
    }

    private void LoadGlobalVariables()
    {
        StoreSettingConfig ssc = new StoreSettingConfig();
        string currencyCode = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, GetStoreID, GetPortalID, GetCurrentCultureName);
        if (currencyCode != null)
        {
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "region",
                                                    " var region='" +
                                                    StoreSetting.GetRegionFromCurrencyCode(currencyCode, GetStoreID,
                                                                                           GetPortalID) + "';", true);
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "curSymbol",
                                                    " var curSymbol='" +
                                                    StoreSetting.GetSymbolFromCurrencyCode(currencyCode, GetStoreID,
                                                                                           GetPortalID) + "';", true);
        }
    }

    public void IncludeCoreLanguageJS()
    {
        try
        {
            Literal LitLangResc = this.Page.FindControl("LitLangResc") as Literal;
            string strScript = string.Empty;

            string langFolder = "~/Modules/AspxCommerce/CoreLanguage/" + "Language/";
            if (Directory.Exists(Server.MapPath(langFolder)))
            {
                bool isTrue = false;
                string[] fileList = Directory.GetFiles(Server.MapPath(langFolder));

                string regexPattern = ".*\\\\(?<file>[^\\.]+)(\\.[a-z]{2}-[A-Z]{2})?\\.js";

                Regex regex = new Regex(regexPattern, RegexOptions.IgnorePatternWhitespace);

                Match match = regex.Match(fileList[0]);
                string languageFile = match.Groups[2].Value;
                string FileUrl = string.Empty;
                isTrue = GetCurrentCulture() == "en-US" ? true : false;
                if (isTrue)
                {
                    FileUrl = langFolder + languageFile + ".js";
                    // strScript = "<script src=\"" + ResolveUrl(FileUrl) + "\" type=\"text/javascript\"></script>";
                }
                else
                {
                    FileUrl = langFolder + languageFile + "." + GetCurrentCulture() + ".js";
                    if (!File.Exists(Server.MapPath(FileUrl)))
                    {
                        FileUrl = langFolder + languageFile + ".js";
                    }// strScript = "<script src=\"" + ResolveUrl(FileUrl) + "\" type=\"text/javascript\"></script>";
                }
                string inputString = string.Empty;

                StringBuilder sb = new StringBuilder();
                sb.Append("<script type=\"text/javascript\">\n");
                using (StreamReader streamReader = File.OpenText(Server.MapPath(FileUrl)))
                {
                    inputString = streamReader.ReadLine();
                    while (inputString != null)
                    {
                        sb.Append(inputString + "\n");
                        inputString = streamReader.ReadLine();
                    }

                }
                sb.Append("</script>\n");
                if (LitLangResc != null)
                {
                    if (!LitLangResc.Text.Contains(sb.ToString()))
                    {
                        LitLangResc.Text += sb.ToString();
                    }
                }
                else
                {
                    HttpContext.Current.Response.Write(sb.ToString());

                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public void IncludeTemplateLanguageJS()
    {
        try
        {
            Literal LitLangResc = this.Page.FindControl("LitLangResc") as Literal;
            string strScript = string.Empty;

            string langFolder = "~/Modules/AspxCommerce/AspxTemplate/" + "Language/";

            if (Directory.Exists(Server.MapPath(langFolder)))
            {
                bool isTrue = false;
                string[] fileList = Directory.GetFiles(Server.MapPath(langFolder));

                string regexPattern = ".*\\\\(?<file>[^\\.]+)(\\.[a-z]{2}-[A-Z]{2})?\\.js";

                Regex regex = new Regex(regexPattern, RegexOptions.IgnorePatternWhitespace);

                Match match = regex.Match(fileList[0]);
                string languageFile = match.Groups[2].Value;
                string FileUrl = string.Empty;
                isTrue = GetCurrentCulture() == "en-US" ? true : false;
                if (isTrue)
                {
                    FileUrl = langFolder + languageFile + ".js";
                    // strScript = "<script src=\"" + ResolveUrl(FileUrl) + "\" type=\"text/javascript\"></script>";
                }
                else
                {
                    FileUrl = langFolder + languageFile + "." + GetCurrentCulture() + ".js";
                    if (!File.Exists(Server.MapPath(FileUrl)))
                    {
                        FileUrl = langFolder + languageFile + ".js";
                    }// strScript = "<script src=\"" + ResolveUrl(FileUrl) + "\" type=\"text/javascript\"></script>";
                }
                string inputString = string.Empty;

                StringBuilder sb = new StringBuilder();
                sb.Append("<script type=\"text/javascript\">\n");
                using (StreamReader streamReader = File.OpenText(Server.MapPath(FileUrl)))
                {
                    inputString = streamReader.ReadLine();
                    while (inputString != null)
                    {
                        sb.Append(inputString + "\n");
                        inputString = streamReader.ReadLine();
                    }

                }
                sb.Append("</script>\n");
                if (LitLangResc != null)
                {
                    if (!LitLangResc.Text.Contains(sb.ToString()))
                    {
                        LitLangResc.Text += sb.ToString();
                    }
                }
                else
                {
                    HttpContext.Current.Response.Write(sb.ToString());
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public void IncludeRssFeedLanguageJS()
    {
        try
        {
            Literal LitLangResc = this.Page.FindControl("LitLangResc") as Literal;
            string strScript = string.Empty;

            string langFolder = "~/Modules/AspxCommerce/AspxRssFeed/" + "Language/";
            if (Directory.Exists(Server.MapPath(langFolder)))
            {
                bool isTrue = false;
                string[] fileList = Directory.GetFiles(Server.MapPath(langFolder));

                string regexPattern = ".*\\\\(?<file>[^\\.]+)(\\.[a-z]{2}-[A-Z]{2})?\\.js";

                Regex regex = new Regex(regexPattern, RegexOptions.IgnorePatternWhitespace);

                Match match = regex.Match(fileList[0]);
                string languageFile = match.Groups[2].Value;
                string FileUrl = string.Empty;
                isTrue = GetCurrentCulture() == "en-US" ? true : false;
                if (isTrue)
                {
                    FileUrl = langFolder + languageFile + ".js";
                    // strScript = "<script src=\"" + ResolveUrl(FileUrl) + "\" type=\"text/javascript\"></script>";
                }
                else
                {
                    FileUrl = langFolder + languageFile + "." + GetCurrentCulture() + ".js";
                    if (!File.Exists(Server.MapPath(FileUrl)))
                    {
                        FileUrl = langFolder + languageFile + ".js";
                    }// strScript = "<script src=\"" + ResolveUrl(FileUrl) + "\" type=\"text/javascript\"></script>";
                }
                string inputString = string.Empty;

                StringBuilder sb = new StringBuilder();
                sb.Append("<script type=\"text/javascript\">\n");
                using (StreamReader streamReader = File.OpenText(Server.MapPath(FileUrl)))
                {
                    inputString = streamReader.ReadLine();
                    while (inputString != null)
                    {
                        sb.Append(inputString + "\n");
                        inputString = streamReader.ReadLine();
                    }

                }
                sb.Append("</script>\n");
                if (LitLangResc != null)
                {
                    if (!LitLangResc.Text.Contains(sb.ToString()))
                    {
                        LitLangResc.Text += sb.ToString();
                    }
                }
                else
                {
                    HttpContext.Current.Response.Write(sb.ToString());
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public bool UpdateCartAnonymoususertoRegistered(int storeID, int portalID, int customerID, string sessionCode)
    {
        try
        {
            List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
            ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
            ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            ParaMeter.Add(new KeyValuePair<string, object>("@CustomerID", customerID));
            ParaMeter.Add(new KeyValuePair<string, object>("@SessionCode", sessionCode));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteNonQueryAsBool("usp_Aspx_UpdateCartAnonymousUserToRegistered", ParaMeter, "@IsUpdate");
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}