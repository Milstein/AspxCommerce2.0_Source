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
#endregion

namespace SageFrame.ExtractTemplate
{
    public class ExtractPageInfo
    {
        public int PageID { get; set; }
        public int PageOrder { get; set; }
        public int Isvisible { get; set; }
        public int ParentID { get; set; }
        public int Level { get; set; }
        public int PortalID { get; set; }


        public bool DisableLink { get; set; }
        public bool IsSecure { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsModified { get; set; }
        public bool IsShowInFooter { get; set; }
        public bool IsRequiredPage { get; set; }

        public string PageName { get; set; }
        public string IconFile { get; set; }
        public string PageHeadText { get; set; }
        public string Description { get; set; }
        public string KeyWords { get; set; }
        public string Url { get; set; }
        public string TabPath { get; set; }
        public string Title { get; set; }
        public string AddedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string DeletedBy { get; set; }
        public string SEOName { get; set; }
        

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public DateTime DeletedOn { get; set; }


        public List<ExtractModuleInfo> ModuleList { get; set; }
        public List<PagePermission> PagePermissionList { get; set; }

        public float RefreshInterval { get; set; }

        public ExtractPageInfo()
        {
        }
    }
}
