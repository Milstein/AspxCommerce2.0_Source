/*
AspxCommerce® - http://www.aspxcommerce.com
Copyright (c) 20011-2012 by AspxCommerce
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
using System;
using SageFrame.Web;
public partial class Modules_AspxCommerce_AspxReturnAndPolicy_ReturnsHistory : BaseAdministrationUserControl
{
    public int storeID, portalID, customerID;
    public string userName;
    public string cultureName;
    public bool IsUseFriendlyUrls = true;
    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            InitializeJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                //Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/Modules/AspxCommerce/AspxReturnAndPolicy/js/ReturnsSubmit.js"));
                IncludeCss("ReturnsSubmit", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery.ui.all.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("ReturnsSubmit", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/jquery.cookie.js", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/js/jquery.tipsy.js");             
                storeID = GetStoreID;
                portalID = GetPortalID;
                userName = GetUsername;
                customerID = GetCustomerID;
                cultureName = GetCurrentCultureName;
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));


    }
}
