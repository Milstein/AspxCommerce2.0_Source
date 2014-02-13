using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using AspxCommerce.Core;

public partial class Modules_AspxCommerce_AspxServiceItemDetails_ServiceItemDetails : BaseAdministrationUserControl
{
    public string CountryName = string.Empty;  
    public string NoImageServiceItemPath;
    public int itemID = 0;

    private AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    protected void page_init(object sender, EventArgs e)
    {
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                aspxCommonObj.StoreID = GetStoreID;
                aspxCommonObj.PortalID = GetPortalID;
                aspxCommonObj.UserName = GetUsername;
                aspxCommonObj.CultureName = GetCurrentCultureName;
                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageServiceItemPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, aspxCommonObj.StoreID,
                                                           aspxCommonObj.PortalID, aspxCommonObj.CultureName);

            }
            itemID = Convert.ToInt32(Request["id"]);
            BindServiceItemDetail(itemID);
            IncludeJs("Service", "/js/encoder.js");
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private Hashtable hst = null;
    private void BindServiceItemDetail(int itemID)
    {
        decimal rate = 1;
        StoreSettingConfig ssc = new StoreSettingConfig();
        decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName));
        string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, aspxCommonObj.StoreID, aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        if (HttpContext.Current.Session["CurrencyRate"] != null)
        {
            if (Session["CurrencyCode"].ToString() != MainCurrency)
            {
                decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                rate = Math.Round(rate1 + (rate1 * additionalCCVR / 100), 4);
            }
            else
            {
                rate = decimal.Parse(Session["CurrencyRate"].ToString());
            }
        }
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<ServiceItemDetailsInfo> lstSIDetail = AspxServiceController.GetServiceItemDetails(itemID, aspxCommonObj);
        StringBuilder serviceIDetailBdl = new StringBuilder();
        serviceIDetailBdl.Append("<div id=\"divServiceItemDetails\" class=\"cssServiceItemDetails\">");
        if (lstSIDetail != null && lstSIDetail.Count > 0)
        {
            foreach (ServiceItemDetailsInfo item in lstSIDetail)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == "")
                {
                    imagePath = NoImageServiceItemPath;
                }
                serviceIDetailBdl.Append("<div class=\"cssItemName\"><h2><span>" + item.ItemName + "</span></h2></div>");
                serviceIDetailBdl.Append("<div class=\"cssItemImage\">");
                serviceIDetailBdl.Append("<img alt=\"" + item.ItemName + "\" src=" + aspxRootPath + imagePath.Replace("uploads", "uploads/Small") + "></div>");
                serviceIDetailBdl.Append("<div class=\"cssDesc\">");
                serviceIDetailBdl.Append("<p>" + HttpUtility.HtmlDecode(item.Description) + "</p></div>");

                serviceIDetailBdl.Append("<span class=\"cssClassServiceDuration\" value=\"" +
                                    (item.ServiceDuration) + "\">" + '(' +
                                    (item.ServiceDuration) + ' ' + "minutes" + ')' +
                                    "</span>&nbsp;");
                serviceIDetailBdl.Append("<span class=\"cssClassFormatCurrency\" value=" + (item.Price) + ">" +Math.Round(item.Price * rate,2) + "</span>");
                serviceIDetailBdl.Append("<div class=\"sfButtonwrapper\">");
                serviceIDetailBdl.Append("<a href=" + aspxRedirectPath + "Book-An-Appointment" + pageExtension + "?cid=" + item.CategoryID + "&pid=" + item.ItemID + ">Book Now</a>");
                serviceIDetailBdl.Append("</div></div>");
            }
        }
        else
        {
            serviceIDetailBdl.Append("<div class=\"cssClassNotFound\">");
            serviceIDetailBdl.Append("<p>There is no service description available</p></div>");
        }
        serviceIDetailBdl.Append("</div>");
        ltrServiceItemDetail.Text = serviceIDetailBdl.ToString();

    }
}