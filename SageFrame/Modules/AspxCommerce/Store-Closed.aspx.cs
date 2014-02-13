﻿/*
AspxCommerce® - http://www.aspxcommerce.com
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
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame;
using SageFrame.Framework;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Web.Utilities;
using AspxCommerce.Core;
using System.Data;
using SageFrame.Web;
using System.Web.Security;
using SageFrame.Core;

public partial class Modules_AspxCommerce_Store_Closed : PageBase
{
    bool IsUseFriendlyUrls = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalTemplateFolderPath", " var aspxTemplateFolderPath='" + ResolveUrl("~/") + "Templates/" + TemplateName + "';", true);
                ltrPageContent.Text = StoreClosedPageContent();
                //ltrPageContent.Text = "Store is temporalily closed for maintainance visit soon for more!";
                if (HttpContext.Current.Session["StoreClosed"] != null)
                {
                    CheckAccess();
                }
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    public string StoreClosedPageContent()
    {
        try
        {
            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@StoreID", GetStoreID.ToString()));
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", GetPortalID.ToString()));         
            SQLHandler sagesql = new SQLHandler();
            return sagesql.ExecuteAsScalar<string>("dbo.usp_Aspx_CheckStoreClosedPageContent", ParaMeterCollection);
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public void CheckAccess()
    {
        string preFix = string.Empty;
        string paneName = string.Empty;
        string ControlSrc = string.Empty;
        string phdContainer = string.Empty;
        string PageSEOName = string.Empty;
        string redirecPath = string.Empty;
        SageFrameConfig sfConfig = new SageFrameConfig();
        IsUseFriendlyUrls = sfConfig.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
        StoreAccessDetailsInfo storeAccessTracker = new StoreAccessDetailsInfo();
        storeAccessTracker.PortalID = GetPortalID.ToString();
        storeAccessTracker.StoreID = GetStoreID.ToString();
        storeAccessTracker.Username = GetUsername;
        FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
        if (ticket != null && ticket.Name != ApplicationKeys.anonymousUser)
        {
            MembershipController member = new MembershipController();
            UserInfo userDetail = member.GetUserDetails(GetPortalID, GetUsername);
            storeAccessTracker.UserEmail = userDetail.Email;
        }
        else
        {
            storeAccessTracker.UserEmail = "";
        }
        StoreAccessResultInfo saResults = (StoreAccessResultInfo) GetStoreAccessByCurrentData(storeAccessTracker);
        bool storeClosed = (bool) saResults.StoreClosed;
        bool storeAccessible = (bool) saResults.IsAccess;

        if (storeAccessible)
        {

            //from session previous url will retrive and redirect to id
            string returnURL = HttpContext.Current.Session["StoreClosed"].ToString();
            HttpContext.Current.Session.Remove("StoreClosed");
            Response.Redirect(returnURL);

        }
        else
        {
        }

    }

    public StoreAccessResultInfo GetStoreAccessByCurrentData(StoreAccessDetailsInfo storeAccessTracker)
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
            SQLHandler sagesql = new SQLHandler();
            StoreAccessResultInfo obj = sagesql.ExecuteAsObject<StoreAccessResultInfo>("dbo.usp_Aspx_CheckStoreAccess", ParaMeterCollection);
            return obj;
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}
