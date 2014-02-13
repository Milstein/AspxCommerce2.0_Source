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
    public  class ExtractInfo
    {

        public int RowNum { get; set; }

        //Module
        public int ModuleID { get; set; }
        public int SupportedFeatures { get; set; }
        public int PackageID { get; set; }
        public string ModuleDescription { get; set; }
        public string ModuleFriendlyName { get; set; }
        public string ModuleVersion { get; set; }
        public string BusinessControllerClass { get; set; }
        public string FolderName { get; set; }
        public string Permissions { get; set; }
        public string ModuleName { get; set; }
        public string CompatibleVersions { get; set; }
        public string Dependencies { get; set; }
        public bool IsPremium { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsRequired { get; set; }
        public bool ModuleIsActive { get; set; }

        //PageInfo
        public int PageID { get; set; }
        public int PageOrder { get; set; }
        public int PageIsVisible { get; set; }
        public int ParentID { get; set; }
        public int Level { get; set; }

        public bool DisableLink { get; set; }
        public bool IsSecure { get; set; }
        public bool PageIsActive { get; set; }
        public bool IsShowInFooter { get; set; }
        public bool IsRequiredPage { get; set; }

        public string PageName { get; set; }
        public string PageIconFile { get; set; }
        public string Title { get; set; }
        public string PageDescription { get; set; }
        public string KeyWords { get; set; }
        public string Url { get; set; }
        public string TabPath { get; set; }
        public string PageHeadText { get; set; }
        public string PageSEOName { get; set; }
        public float RefreshInterval { get; set; }

        //ModuleDefInfo

        public int ModuleDefID { get; set; }
        public string FriendlyName { get; set; }
        public int DefaultCacheTime { get; set; }
        public bool ModuleDefIsActive { get; set; }

        //PageModule
        public int PageModuleID { get; set; }
        public int ModuleOrder { get; set; }
        public int CacheTime { get; set; }
        public int Visibility { get; set; }

        public string PaneName { get; set; }
        public string Alignment { get; set; }
        public string Color { get; set; }
        public string Border { get; set; }
        public string PageModuleIconFile { get; set; }

        public bool DisplayTitle { get; set; }
        public bool DisplayPrint { get; set; }
        public bool PageModuleIsActive { get; set; }

        //userModule
        public int UserModuleID { get; set; }
        public string UserModuleTitle { get; set; }
        public string Header { get; set; }
        public string Footer { get; set; }
        public string UserModuleSEOName { get; set; }
        public string ShowInPages { get; set; }
        public string HeaderText { get; set; }
        public string SuffixClass { get; set; }


        public bool AllPages { get; set; }
        public bool InheritViewPermissions { get; set; }
        public bool UserModuleIsActive { get; set; }
        public bool IsHandheld { get; set; }
        public bool ShowHeaderText { get; set; }
        public bool IsInAdmin { get; set; }

        public ExtractInfo()
        {
        }
    }
}
