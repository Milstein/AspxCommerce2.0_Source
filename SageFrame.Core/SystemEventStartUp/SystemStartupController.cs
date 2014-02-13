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
using System.Linq;
using System.Text;
using SageFrame.Web;
using SageFrame.Web.Utilities;
using System.Collections;
using System.Web;

#endregion


namespace SageFrame.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class SystemStartupController
    {
        /// <summary>
        /// 
        /// </summary>
        public SystemStartupController()
        {
        }

        public List<SystemEventStartUpInfo> GetSystemEventStartUpList(int PortalID)
        {
            try
            {
                string sp = "[dbo].[usp_GetSystemEventStartUpList]";
                SQLHandler SQLH = new SQLHandler();
                List<KeyValuePair<string, object>> ParamCollInput = new List<KeyValuePair<string, object>>();
                ParamCollInput.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                return SQLH.ExecuteAsList<SystemEventStartUpInfo>(sp, ParamCollInput);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public SystemEventStartUpInfo GetSystemEventStartUpDetails(int PortalStartUpID)
        {
            try
            {
                string sp = "[dbo].[usp_GetSystemEventStartUpDetails]";
                SQLHandler SQLH = new SQLHandler();
                List<KeyValuePair<string, object>> ParamCollInput = new List<KeyValuePair<string, object>>();
                ParamCollInput.Add(new KeyValuePair<string, object>("@PortalStartUpID", PortalStartUpID));
                return SQLH.ExecuteAsObject<SystemEventStartUpInfo>(sp, ParamCollInput);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetPortalStartUpList> FnGetPortalStartUpList(bool IsAdmin)
        {
            try
            {
                string sp = "[dbo].[usp_GetPortalStartUpList]";
                SQLHandler SQLH = new SQLHandler();
                List<KeyValuePair<string, object>> ParamCollInput = new List<KeyValuePair<string, object>>();
                ParamCollInput.Add(new KeyValuePair<string, object>("@IsAdmin", IsAdmin));
                return SQLH.ExecuteAsList<GetPortalStartUpList>(sp, ParamCollInput);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ArrayList GetStartUpControls(string Position, int PortalID, bool IsAdmin)
        {
            try
            {
                ArrayList arrColl = new ArrayList();
                Hashtable hst = new Hashtable();
                if (IsAdmin == false)
                {
                    if (HttpRuntime.Cache["StartupSageSetting"] != null)
                    {
                        hst = (Hashtable)HttpRuntime.Cache["StartupSageSetting"];
                    }
                    else
                    {
                        List<GetPortalStartUpList> objList = FnGetPortalStartUpList(IsAdmin);
                        hst.Add("StartupSettingKey", objList);
                    }
                    //need to be cleared when any key is chnaged
                    HttpRuntime.Cache.Insert("StartupSageSetting", hst);
                    List<GetPortalStartUpList> objNList = (List<GetPortalStartUpList>)hst["StartupSettingKey"];
                    arrColl = GetControlList(objNList, Position, PortalID);
                    return arrColl;
                }
                else
                {
                    if (HttpRuntime.Cache["StartupAdminSageSetting"] != null)
                    {
                        hst = (Hashtable)HttpRuntime.Cache["StartupAdminSageSetting"];
                    }
                    else
                    {
                        List<GetPortalStartUpList> objList = FnGetPortalStartUpList(IsAdmin);
                        hst.Add("StartupAdminSettingKey", objList);
                    }
                    //need to be cleared when any key is chnaged
                    HttpRuntime.Cache.Insert("StartupAdminSageSetting", hst);
                    List<GetPortalStartUpList> objNList = (List<GetPortalStartUpList>)hst["StartupAdminSettingKey"];
                    arrColl = GetControlList(objNList, Position, PortalID);
                    return arrColl;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private ArrayList GetControlList(List<GetPortalStartUpList> objNList, string Position, int PortalID)
        {
            ArrayList arrColl = new ArrayList();
            foreach (GetPortalStartUpList mitem in objNList)
            {
                if (mitem.EventLocationName.ToLower() == Position.ToLower() && mitem.PortalID == PortalID)
                {
                    arrColl.Add(mitem.ControlUrl);
                }
            }
            return arrColl;

        }


        public List<SystemEventStartUpInfo> UpdateSystemEventStartUp(int PortalStartUpID, int PortalID, string ControlUrl, string EventLocation, bool IsAdmin, bool IsControlUrl, bool IsActive, string Username)
        {
            try
            {
                string sp = "[dbo].[usp_UpdateSystemEventStartUp]";
                SQLHandler SQLH = new SQLHandler();
                List<KeyValuePair<string, object>> ParamCollInput = new List<KeyValuePair<string, object>>();
                ParamCollInput.Add(new KeyValuePair<string, object>("@PortalStartUpID", PortalStartUpID));
                ParamCollInput.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                ParamCollInput.Add(new KeyValuePair<string, object>("@ControlUrl", ControlUrl));
                ParamCollInput.Add(new KeyValuePair<string, object>("@EventLocation", EventLocation));
                ParamCollInput.Add(new KeyValuePair<string, object>("@IsAdmin", IsAdmin));
                ParamCollInput.Add(new KeyValuePair<string, object>("@IsControlUrl", IsControlUrl));
                ParamCollInput.Add(new KeyValuePair<string, object>("@IsActive", IsActive));
                ParamCollInput.Add(new KeyValuePair<string, object>("@UserName", Username));
                return SQLH.ExecuteAsList<SystemEventStartUpInfo>(sp, ParamCollInput);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public List<SystemEventStartUpInfo> DeleteSystemEventStartUp(int PortalStartUpID, string UserName)
        {
            try
            {
                string sp = "[dbo].[usp_DeleteSystemEventStartUp]";
                SQLHandler SQLH = new SQLHandler();
                List<KeyValuePair<string, object>> ParamCollInput = new List<KeyValuePair<string, object>>();
                ParamCollInput.Add(new KeyValuePair<string, object>("@PortalStartUpID", PortalStartUpID));
                ParamCollInput.Add(new KeyValuePair<string, object>("@UserName", UserName));
                return SQLH.ExecuteAsList<SystemEventStartUpInfo>(sp, ParamCollInput);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SystemEventLocationInfo> GetEventLocationList()
        {
            try
            {
                string sp = "[dbo].[usp_GetEventLocationList]";
                SQLHandler SQLH = new SQLHandler();
                return SQLH.ExecuteAsList<SystemEventLocationInfo>(sp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
