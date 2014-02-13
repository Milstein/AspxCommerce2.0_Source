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
using System.Collections.Generic;
using System.Text;
using SageFrame.Shared;
using System.Collections;
using System.Web;
using System.Data;
using SageFrame.Web.Utilities;
using System.Web.Security;
using SageFrame.Common;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
#endregion

namespace SageFrame.Web
{
    public class SageFrameConfig
    {
        public SageFrameConfig()
        {
        }

        public string GetUsername
        {
            get
            {
                try
                {
                    string userName = GetUser(GetPortalID);
                    if (userName != "anonymoususer")
                    {
                        return userName;
                    }
                    else
                    {
                        return "anonymoususer";
                    }
                }
                catch
                {
                    return "anonymoususer";
                }
            }
        }

        public DataSet GetPageSettings(string controlType, string pageID)
        {
            try
            {
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();

                ParaMeterCollection.Add(new KeyValuePair<string, string>("@ControlType", controlType));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PageID", pageID));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", GetPortalID.ToString()));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@UserName", GetUsername));
                DataSet ds = new DataSet();
                SQLHandler sagesql = new SQLHandler();
                ds = sagesql.ExecuteAsDataSet("dbo.sp_GetPageSetting", ParaMeterCollection);
                return ds;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataSet GetPageSettingsByPageSEOName(string controlType, string pageSEOName, string userName)
        {
            try
            {
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();

                ParaMeterCollection.Add(new KeyValuePair<string, string>("@ControlType", controlType));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PageSEOName", pageSEOName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", GetPortalID.ToString()));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@UserName", userName));
                DataSet ds = new DataSet();
                SQLHandler sagesql = new SQLHandler();
                ds = sagesql.ExecuteAsDataSet("dbo.usp_GetPageSettingByPageSEOName", ParaMeterCollection);
                return ds;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<UserModuleInfo> GetPageModules(string controlType, string pageSEOName, string userName, string cultureCode)
        {
            try
            {
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();

                ParaMeterCollection.Add(new KeyValuePair<string, string>("@ControlType", controlType));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PageSEOName", pageSEOName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", GetPortalID.ToString()));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@UserName", userName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@CultureCode", cultureCode));
                List<UserModuleInfo> lstPageModules = new List<UserModuleInfo>();
                SQLHandler sagesql = new SQLHandler();
                lstPageModules = sagesql.ExecuteAsList<UserModuleInfo>("[dbo].[usp_MasterPageGetPageModules]", ParaMeterCollection);
                return lstPageModules;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<UserModuleInfo> GetPageModules_Anonymous(string controlType, string pageSEOName, string userName, string cultureCode)
        {
            try
            {
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();

                ParaMeterCollection.Add(new KeyValuePair<string, string>("@ControlType", controlType));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PageSEOName", pageSEOName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", GetPortalID.ToString()));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@UserName", userName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@CultureCode", cultureCode));
                List<UserModuleInfo> lstPageModules = new List<UserModuleInfo>();
                SQLHandler sagesql = new SQLHandler();
                lstPageModules = sagesql.ExecuteAsList<UserModuleInfo>("[dbo].[usp_MasterPageGetPageModules_Anonymous]", ParaMeterCollection);
                return lstPageModules;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<UserModuleInfo> GetPageModules_Superuser(string controlType, string pageSEOName, string GetUsername, string cultureCode)
        {
            try
            {
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@ControlType", controlType));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PageSEOName", pageSEOName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", GetPortalID.ToString()));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@UserName", GetUsername));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@CultureCode", cultureCode));
                List<UserModuleInfo> lstPageModules = new List<UserModuleInfo>();
                SQLHandler sagesql = new SQLHandler();
                lstPageModules = sagesql.ExecuteAsList<UserModuleInfo>("[dbo].[usp_MasterPageGetPageModules_Superuser]", ParaMeterCollection);
                return lstPageModules;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataSet GetPageSettingsByPageSEONameForAdmin(string controlType, string pageSEOName, string userName)
        {
            try
            {
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();

                ParaMeterCollection.Add(new KeyValuePair<string, string>("@ControlType", controlType));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PageSEOName", pageSEOName));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", GetPortalID.ToString()));
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@UserName", userName));
                DataSet ds = new DataSet();
                SQLHandler sagesql = new SQLHandler();
                ds = sagesql.ExecuteAsDataSet("[dbo].[usp_GetPageSettingByPageSEONameForAdmin]", ParaMeterCollection);
                return ds;
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public int GetPortalID
        {
            get
            {
                try
                {
                    Hashtable hstPortals = GetPortals();
                    string URL = HttpContext.Current.Request.Url.ToString();
                    if (URL.Contains("/portal/"))
                    {
                        var RegMatch = Regex.Matches(URL, @"^http[s]?\s*:.*\/portal\/([^/]+)+\/.*");
                        string PortalName = "";
                        foreach (Match match in RegMatch)
                        {
                            PortalName = match.Groups[1].Value;
                        }
                        int PortalID = Int32.Parse(hstPortals[PortalName].ToString());
                        return PortalID;
                    }
                    else
                    {
                        return 1;
                    }
                }
                catch
                {
                    return 1;
                }
            }
        }

        /// <summary>
        /// Get PortalID And Respective Name List
        /// </summary>
        /// <returns>PortalID And PortalName</returns>
        public Hashtable GetPortals()
        {
            Hashtable hstAll = new Hashtable();
            if (HttpRuntime.Cache[CacheKeys.Portals] != null)
            {
                hstAll = (Hashtable)HttpRuntime.Cache[CacheKeys.Portals];
            }
            else
            {
                SettingProvider objSP = new SettingProvider();
                List<SagePortals> sagePortals = objSP.PortalGetList();
                foreach (SagePortals portal in sagePortals)
                {
                    hstAll.Add(portal.SEOName.ToLower().Trim(), portal.PortalID);
                }
            }
            HttpRuntime.Cache.Insert(CacheKeys.Portals, hstAll);
            return hstAll;
        }


        public string GetSettingsByKey(string Key)
        {
            try
            {
                string strValue = string.Empty;
                SettingProvider sep = new SettingProvider();
                Hashtable hst = new Hashtable();
                if (HttpRuntime.Cache[CacheKeys.SageSetting] != null)
                {

                    hst = (Hashtable)HttpRuntime.Cache[CacheKeys.SageSetting];
                }
                else
                {
                    DataTable dt = sep.GetSettingsByPortal(GetPortalID.ToString(), string.Empty); //GetSettingsByPortal();
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                        }
                    }
                }
                //need to be cleared when any key is chnaged
                HttpRuntime.Cache.Insert(CacheKeys.SageSetting, hst);//
                strValue = hst[SettingPortal + "." + Key].ToString();
                return strValue;
            }

            catch (Exception e)
            {
                throw e;
            }
        }
        public string GetSettingsByKeyIndividual(string Key)
        {
            try
            {
                string strValue = string.Empty;
                SettingProvider sep = new SettingProvider();
                Hashtable hst = new Hashtable();
                if (HttpRuntime.Cache[CacheKeys.SageSetting] != null)
                {
                    hst = (Hashtable)HttpRuntime.Cache[CacheKeys.SageSetting];
                }
                else
                {
                    DataTable dt = sep.GetSettingsByPortal("1", string.Empty); //GetSettingsByPortal();
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                        }
                    }
                }
                //need to be cleared when any key is chnaged
                HttpRuntime.Cache.Insert(CacheKeys.SageSetting, hst);//
                strValue = hst[SettingPortal + "." + Key].ToString();
                return strValue;
            }

            catch (Exception e)
            {
                throw e;
            }
        }

        public void ResetSettingKeys(int PortalID)
        {
            SettingProvider sep = new SettingProvider();
            Hashtable hst = new Hashtable();
            DataTable dt = sep.GetSettingsByPortal(PortalID.ToString(), string.Empty);
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                }
            }
            //need to be cleared when any key is chnaged
            HttpRuntime.Cache.Insert(CacheKeys.SageSetting, hst);//
        }

        private string SettingPortal
        {
            get
            {
                string strPortalName = "default";
                Hashtable hstPortals = GetPortals();
                strPortalName = GetDefaultPortalName(hstPortals, 1);
                try
                {
                    if (HttpContext.Current.Session[SessionKeys.SageFrame_PortalSEOName] != null)
                    {
                        strPortalName = HttpContext.Current.Session[SessionKeys.SageFrame_PortalSEOName].ToString();
                    }
                }
                catch
                {
                    strPortalName = GetDefaultPortalName(hstPortals, 1);
                }
                return strPortalName;
            }
        }
        /// <summary>
        /// Get Default Portal Name By PortalID
        /// </summary>
        /// <param name="hstPortals">HashTable Containing PortalID and PortalName</param>
        /// <param name="portalID">PortalID</param>
        /// <returns>PortalName</returns>
        public string GetDefaultPortalName(Hashtable hstPortals, int portalID)
        {
            string portalname = string.Empty;
            foreach (string key in hstPortals.Keys)
            {
                if (Int32.Parse(hstPortals[key].ToString()) == portalID)
                {
                    portalname = key;
                }
            }
            return portalname;
        }


        public int GetSettingIntByKey(string Key)
        {
            try
            {
                return Int32.Parse(GetSettingsByKey(Key));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool GetSettingBollByKey(string Key)
        {
            try
            {
                if (!string.IsNullOrEmpty(GetSettingsByKey(Key)))
                {
                    return bool.Parse(GetSettingsByKey(Key));
                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        /// <summary>
        /// Return The Name of the Logged in User by PortalID
        /// </summary>
        /// <param name="PortalID">PortalID</param>
        /// <returns>Logged In UserName</returns>
        public static string GetUser(int PortalID)
        {
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName + "_" + GetApplicationName + "_" + PortalID];
            string user = string.Empty;
            if (authCookie != null && authCookie.Value != string.Empty)
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                if (ticket != null)
                {
                    user = ticket.Name;
                }
                else
                {
                    user = "anonymoususer";
                }
            }
            else
            {
                user = "anonymoususer";
            }
            return user;
        }

        public static FormsAuthenticationTicket GetUserTicket(int PortalID)
        {
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName + "_" + GetApplicationName + "_" + PortalID];
            if (authCookie != null && authCookie.Value != string.Empty)
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                return ticket;
            }
            else
            {
                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, "anonymoususer", DateTime.Now,
                                                                            DateTime.Now.AddMinutes(30),
                                                                              true,
                                                                              PortalID.ToString(),
                                                                              FormsAuthentication.FormsCookiePath);
                return ticket;
            }
        }

        public static string GetApplicationName
        {
            get
            {
                return (HttpContext.Current.Request.ApplicationPath == "/" ? "" : HttpContext.Current.Request.ApplicationPath);
            }
        }

    }
}
