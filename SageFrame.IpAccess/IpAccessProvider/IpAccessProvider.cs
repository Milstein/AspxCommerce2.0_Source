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
#endregion

namespace SageFrame.IpAccess
{
    public class IpAccessProvider
    {
        public IpAccessProvider()
        {
        }

        public List<IpRangeInfo> GetAccessIpList(int portalId)
        {
            try
            {
                var parameter = new List<KeyValuePair<string, object>> { new KeyValuePair<string, object>("@PortalId", portalId) };
                var sqlH = new SQLHandler();
                return sqlH.ExecuteAsList<IpRangeInfo>("[usp_sf_GetAllAccessIpList]", parameter);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public void SaveIpToAccess(IpRangeInfo ipinfo, int portalId, string userName)
        {
            try
            {
                var parameter = new List<KeyValuePair<string, object>>
                                    {
                                        new KeyValuePair<string, object>("@IpAccessId", ipinfo.IpAccessId),
                                        new KeyValuePair<string, object>("@IpFrom", ipinfo.IpFrom),
                                        new KeyValuePair<string, object>("@IpTo", ipinfo.IpTo),
                                        new KeyValuePair<string, object>("@Reason", ipinfo.Reason),
                                        new KeyValuePair<string, object>("@IsActive", ipinfo.IsActive),
                                        new KeyValuePair<string, object>("@PortalId", portalId),
                                        new KeyValuePair<string, object>("@UserName", userName)
                                    };
                var sqlH = new SQLHandler();
                sqlH.ExecuteNonQuery("[usp_sf_SaveIpToAccess]", parameter);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public void DeleteAccessIp(string ids, int portalId, string userName)
        {
            try
            {
                var parameter = new List<KeyValuePair<string, object>>
                                    {
                                        new KeyValuePair<string, object>("@IpAccessId", ids),
                                        new KeyValuePair<string, object>("@PortalId", portalId),
                                        new KeyValuePair<string, object>("@UserName", userName)
                                    };
                var sqlH = new SQLHandler();
                sqlH.ExecuteNonQuery("[usp_sf_DeleteBlockedIp]", parameter);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        public bool IsExistIpRange(string ipfrom, string ipTo, int portalId)
        {
            try
            {
                var parameter = new List<KeyValuePair<string, object>>
                                    {
                                        new KeyValuePair<string, object>("@IpFrom", ipfrom),
                                        new KeyValuePair<string, object>("@PortalId", portalId),
                                        new KeyValuePair<string, object>("@IpTo", ipTo)
                                    };
                var sqlH = new SQLHandler();
                return sqlH.ExecuteAsScalar<bool>("[usp_sf_checkIpExists]", parameter);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
