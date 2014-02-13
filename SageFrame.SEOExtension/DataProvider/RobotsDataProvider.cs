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

#region "Referencse"

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using SageFrame.Web.Utilities;
using System.Web;

#endregion

namespace SageFrame.SEOExtension
{
    public class RobotsDataProvider
    {

        public static List<RobotsInfo> GetRobots(int StoreID, int PortalID)
        {
            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            SqlDataReader reader = null;
            try
            {
                SQLHandler Objsql = new SQLHandler();
                List<RobotsInfo> lstRobots = new List<RobotsInfo>();

                if (HttpRuntime.Cache["AspxStoreSetting" + PortalID + StoreID] != null)
                {
                    reader = Objsql.ExecuteAsDataReader("[dbo].[usp_SEOGetPages]");
                    while (reader.Read())
                    {
                        lstRobots.Add(new RobotsInfo(reader["PageName"].ToString(), reader["TabPath"].ToString()));
                    }
                }
                else
                {
                    reader = Objsql.ExecuteAsDataReader("[dbo].[usp_SEOGetRobots]", ParaMeterCollection);
                    while (reader.Read())
                    {
                        lstRobots.Add(new RobotsInfo(reader["PageName"].ToString(), reader["TabPath"].ToString(), reader["SEOName"].ToString(), reader["Description"].ToString()));
                    }
                }
                return lstRobots;
            }
            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (reader != null)
                {
                    reader.Close();
                }
            }

        }
        public static void DeleteExistingRobots(int PortalID)
        {
            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            try
            {
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_SEODeleteExistingRobots]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void SaveRobotsPage(int PortalID, string UserAgent, string PagePath)
        {

            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserAgent", UserAgent));
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@PagePath", PagePath));
            try
            {
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_SEOSaveRobotsPage]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static List<RobotsInfo> GenerateRobots(string UserAgent)
        {
            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserAgent", UserAgent));
            SqlDataReader reader = null;
            try
            {
                SQLHandler Objsql = new SQLHandler();

                reader = Objsql.ExecuteAsDataReader("usp_SEOGenerateRobots", ParaMeterCollection);
                List<RobotsInfo> lstRobots = new List<RobotsInfo>();
                while (reader.Read())
                {
                    lstRobots.Add(new RobotsInfo(int.Parse(reader["PortalID"].ToString()), reader["UserAgent"].ToString(), reader["PagePath"].ToString()));
                }
                return lstRobots;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                if (reader != null)
                {
                    reader.Close();
                }
            }

        }
    }
}
