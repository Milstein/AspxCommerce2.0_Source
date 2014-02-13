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
using System.Data;
#endregion

namespace SageFrame.ExtractTemplate
{
    public class ExtractTemplateController
    {

        public List<TemplatePermission> GetTemplatePermission(string userModuleID)
        {
            ExtractTemplateDataProvider objDataProvider = new ExtractTemplateDataProvider();
            return objDataProvider.GetTemplatePermission(userModuleID);
        }
        public List<ExtractInfo> GetTemplateDetails(string paneName, int portalID)
        {
            ExtractTemplateDataProvider objDataProvider = new ExtractTemplateDataProvider();
            return objDataProvider.GetTemplateDetails(paneName, portalID);
        }

        public DataSet MakeHtmlDataSet(string HtmlUserModuleID)
        {
            ExtractTemplateDataProvider objDataProvider = new ExtractTemplateDataProvider();
            return objDataProvider.MakeHtmlDataSet(HtmlUserModuleID);
        }
        //Insert  Template 

        public void InsertTemplate(List<ExtractPageInfo> lstPageList, List<TemplateMenuAll> objTemplateMenuall, int portalID)
        {
            ExtractTemplateDataProvider objDataProvider = new ExtractTemplateDataProvider();
            objDataProvider.InsertTemplate(lstPageList, objTemplateMenuall, portalID);
        }

        public List<PagePermission> GetPagePermission(string pageID)
        {
            ExtractTemplateDataProvider objDataProvider = new ExtractTemplateDataProvider();
            return objDataProvider.GetPagePermission(pageID);
        }

        public DataSet GetMenuDetail(int portalID, string menuUserModuleID)
        {
            ExtractTemplateDataProvider objDataProvider = new ExtractTemplateDataProvider();
            return objDataProvider.GetMenuDetail(portalID, menuUserModuleID);
        }
    }
}
