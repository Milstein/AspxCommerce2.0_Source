using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class Modules_AspxCommerce_AspxGiftCardManagement_GiftCardCategory : BaseAdministrationUserControl
{
    public string aspxItemModulePath=string.Empty;

    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            InitializeJs();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
          aspxItemModulePath = ResolveUrl("~/Modules/AspxCommerce/AspxItemsManagement");

          IncludeCss("giftCardcategorycss", "/Templates/" + TemplateName + "/css/GridView/tablesort.css", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/skins/tango/jcarousel-tango.css");
        IncludeJs("giftcardcategorymgt", "/js/FormValidation/jquery.validate.js", "/js/JQueryUI/jquery-ui-1.8.10.custom.js", "/js/GridView/jquery.grid.js",
                    "/js/GridView/SagePaging.js", "/js/GridView/jquery.global.js", "/js/GridView/jquery.dateFormat.js", "/js/DateTime/date.js",
                    "/js/MessageBox/jquery.easing.1.3.js", "/js/PopUp/custom.js", "/js/MessageBox/alertbox.js", "/js/AjaxFileUploader/ajaxupload.js", "/js/jquery.jcarousel.js");
        IncludeLanguageJS();
              
    }
    private void InitializeJs()
    {
        Page.ClientScript.RegisterClientScriptInclude("JTablesorter", ResolveUrl("~/js/GridView/jquery.tablesorter.js"));
    } 
}
