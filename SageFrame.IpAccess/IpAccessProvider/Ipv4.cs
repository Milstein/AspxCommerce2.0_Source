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
using System.Web;
using SageFrame.Web.Utilities;
#endregion

namespace SageFrame.IpAccess
{
    public class Ipv4
    {
        System.Net.IPAddress _ipAddress = null;
        private bool IsValidIpAddress(string ipAddress)
        {
            bool isValidIp = System.Net.IPAddress.TryParse(ipAddress, out _ipAddress);
            return isValidIp;
        }

        public bool IsAccessIpAddress(string ipAddress, int portalId)
        {
            bool isAccess = false;
            if (IsValidIpAddress(ipAddress))
            {
                switch (_ipAddress.AddressFamily)
                {
                    case System.Net.Sockets.AddressFamily.InterNetwork:
                        // we have IPv4
                        isAccess = CheckIp(_ipAddress, portalId);
                        break;
                    case System.Net.Sockets.AddressFamily.InterNetworkV6:
                        // we have IPv6
                        isAccess = false;
                        break;
                }

            }
            return isAccess;
        }

        private bool CheckIp(System.Net.IPAddress ipAddress, int portalId)
        {
            try
            {
                var paraMeterCollection = new List<KeyValuePair<string, object>>
                                              {
                                                  new KeyValuePair<string, object>("@IPAddress", ipAddress.ToString()),
                                                  new KeyValuePair<string, object>("@PortalID", portalId)
                                              };
                var sqlH = new SQLHandler();
                var value = sqlH.ExecuteAsScalar<bool>("dbo.usp_sf_CheckIpAccess", paraMeterCollection);
                return value;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}

