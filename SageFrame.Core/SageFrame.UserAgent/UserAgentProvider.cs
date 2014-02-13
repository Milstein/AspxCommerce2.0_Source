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
using SageFrame.Web.Utilities;
using System.Data.SqlClient;


#endregion

namespace SageFrame.UserAgent
{
    public class UserAgentProvider
    {

        public  string GetUserAgent(int PortalID, bool IsActive)
        {

            string sp = "[dbo].[usp_UserAgentGetType]";
            SQLHandler sagesql = new SQLHandler();
            string content = "";
            SqlDataReader reader = null;
            try
            {
                List<KeyValuePair<string, object>> paramColl = new List<KeyValuePair<string, object>>();
                paramColl.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                paramColl.Add(new KeyValuePair<string, object>("@IsActive", IsActive));
                reader = sagesql.ExecuteAsDataReader(sp, paramColl);
                while (reader.Read())
                {
                    content = reader["AgentMode"] as string;
                }
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
            return content;
        }

        public  void SaveUserAgentMode(string AgentMode, int PortalID, string UserName, DateTime ChangeDate, bool IsActive)
        {
            string sp = "[dbo].[usp_UserAgentSaveType]";
            SQLHandler sagesql = new SQLHandler();

            List<KeyValuePair<string, object>> ParamCollInput = new List<KeyValuePair<string, object>>();
            ParamCollInput.Add(new KeyValuePair<string, object>("@AgentMode", AgentMode));
            ParamCollInput.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            ParamCollInput.Add(new KeyValuePair<string, object>("@ChangedBy", UserName));
            ParamCollInput.Add(new KeyValuePair<string, object>("@ChangedDate", ChangeDate));
            ParamCollInput.Add(new KeyValuePair<string, object>("@IsActive", IsActive));
            try
            {
                sagesql.ExecuteNonQuery(sp, ParamCollInput);

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
