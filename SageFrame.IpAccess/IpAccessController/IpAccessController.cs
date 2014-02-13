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
    public class IpAccessController
    {
        public IpAccessController()
        {
        }
        public List<IpRangeInfo> GetAccessIpList(int portalId)
        {
            var provider = new IpAccessProvider();
            return provider.GetAccessIpList(portalId);
        }
        public void SaveIpToAccess(IpRangeInfo ipinfo, int portalId, string userName)
        {
            var provider = new IpAccessProvider();
            provider.SaveIpToAccess(ipinfo, portalId, userName);
        }

        public void DeleteAccessIp(string ids, int portalId, string userName)
        {
            var provider = new IpAccessProvider();
            provider.DeleteAccessIp(ids, portalId, userName);
        }
        public bool IsExistIpRange(string ipfrom, string ipTo, int portalId)
        {
            var provider = new IpAccessProvider();
            return provider.IsExistIpRange(ipfrom, ipTo, portalId);
        }
        public bool CheckIpAccess(string ipAddress, int portalId)
        {
            var ipChecker = new Ipv4();
            return ipChecker.IsAccessIpAddress(ipAddress, portalId);
        }
    }
}
