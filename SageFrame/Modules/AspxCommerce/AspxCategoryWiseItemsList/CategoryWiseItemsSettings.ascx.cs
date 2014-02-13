using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxCategoryWiseItemsList_CategoryWiseItemsSettings : BaseAdministrationUserControl
{
    public string ModulePath;
    protected void Page_Load(object sender, EventArgs e)
    {
        ModulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        IncludeLanguageJS();

    }
}
