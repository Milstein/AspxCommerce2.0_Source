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
    public class ExtractUserModule
    {

        public int PageID { get; set; }
        public string PaneName { get; set; }
        public int UserModuleId { get; set; }
        public int ModuleOrder { get; set; }
        public bool IsActive { get; set; }
        public string ShowInPages { get; set; }
        public string UserModuleTitle { get; set; }
        public string Header { get; set; }
        public string Footer { get; set; }
        public string SEOName { get; set; }
        public string SuffixClass { get; set; }
        public string HeaderText { get; set; }
        public string Query { get; set; }
        public bool AllPages { get; set; }
        public bool InheritViewPermissions { get; set; }
        public bool IsHandheld { get; set; }
        public bool ShowHeaderText { get; set; }
        public bool IsInAdmin { get; set; }
        public int Level { get; set; }
        
        public List<TemplatePermission> TemplatePermission { get; set; }
        public ExtractUserModule()
        {
        }
    }
}
