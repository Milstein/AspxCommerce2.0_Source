using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;
using AspxCommerce.Core;
using SageFrame;
using SageFrame.Web;


public partial class Modules_Admin_DetailsBrowse_ServicesDetails : BaseAdministrationUserControl
{
    public int CustomerID;
    public string CountryName = string.Empty;
    public string Servicekey = "";
    public string NoImageCategoryDetailPath;
    public int NoOfItemInRow = 2;

    private AspxCommonInfo aspxCommonObj = new AspxCommonInfo();

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            SageFrameRoute parentPage = (SageFrameRoute) this.Page;
            Servicekey = parentPage.Key;
            Servicekey = Servicekey.Replace("ampersand", "&").Replace("-", " ").Replace("_", "-").Replace("+", " ");
            if (!IsPostBack)
            {
                CustomerID = GetCustomerID;
                aspxCommonObj.StoreID = GetStoreID;
                aspxCommonObj.PortalID = GetPortalID;
                aspxCommonObj.UserName = GetUsername;
                aspxCommonObj.CultureName = GetCurrentCultureName;
                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageCategoryDetailPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL,
                                                                      aspxCommonObj.StoreID, aspxCommonObj.PortalID,
                                                                      aspxCommonObj.CultureName);
            }
            IncludeLanguageJS();
            BindServiceDetails();
            IncludeJs("Service", "/js/encoder.js");
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private Hashtable hst = null;

    private void BindServiceDetails()
    {
        decimal rate = 1;
        StoreSettingConfig ssc = new StoreSettingConfig();
        decimal additionalCCVR =
            decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, aspxCommonObj.StoreID,
                                                    aspxCommonObj.PortalID, aspxCommonObj.CultureName));
        string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, aspxCommonObj.StoreID,
                                                        aspxCommonObj.PortalID, aspxCommonObj.CultureName);
        if (HttpContext.Current.Session["CurrencyRate"] != null)
        {
            if (Session["CurrencyCode"].ToString() != MainCurrency)
            {
                decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                rate = Math.Round(rate1 + (rate1*additionalCCVR/100), 4);
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

        List<ServiceDetailsInfo> lstServiceDetail = AspxServiceController.GetServiceDetails(Servicekey, aspxCommonObj);
        StringBuilder serviceDetailBld = new StringBuilder();
        var categoryImage = "";
        var categoryDetails = "";
        int itemId = 0;
        if (lstServiceDetail != null && lstServiceDetail.Count > 0)
        {
            itemId = lstServiceDetail[0].ItemID;
            categoryImage = "Modules/AspxCommerce/AspxCategoryManagement/uploads/" +
                            lstServiceDetail[0].CategoryImagePath;
            categoryDetails = HttpUtility.HtmlDecode(lstServiceDetail[0].CategoryDetails);
            serviceDetailBld.Append("<div id=\"divServiceDetails\" class=\"cssServiceDetail\">");
            serviceDetailBld.Append("<div id=\"divServiceName\" class=\"cssServiceName\">");
            serviceDetailBld.Append("<h2><span>" + lstServiceDetail[0].CagegoryName + "</span></h2>");
            serviceDetailBld.Append("<div class=\"cssImageWrapper\">");
            serviceDetailBld.Append("<img alt=\"" + lstServiceDetail[0].CagegoryName + "\" title=\"" + lstServiceDetail[0].CagegoryName + "\" src=\"" + aspxRootPath + categoryImage.Replace("uploads", "uploads/Large") + "\"/></div>");
            serviceDetailBld.Append("<div class=\"cssServiceDesc\"><p>" + categoryDetails + "</p></div>");
            serviceDetailBld.Append("</div>");
            StringBuilder serviceItemBld = new StringBuilder();
            serviceItemBld.Append("<div class=\"cssServiceItemWrapper\">");
            foreach (var serviceDetailsInfo in lstServiceDetail)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" +serviceDetailsInfo.ItemImagePath;
                if(serviceDetailsInfo.ItemImagePath==null)
                {
                    imagePath = "";
                }
                if ((lstServiceDetail.IndexOf(serviceDetailsInfo)+1) % NoOfItemInRow == 0)
                {
                    serviceItemBld.Append("<div class=\"cssClassItems cssClassNoMargin\">");
                }
                else
                {
                    serviceItemBld.Append("<div class=\"cssClassItems\">");
                }
                serviceItemBld.Append("<h3>");
                serviceItemBld.Append("<a href=\"" + aspxRootPath + "Service-Item-Details" + pageExtension + "?id=" + serviceDetailsInfo.ItemID + "\"><span>" + serviceDetailsInfo.ItemName + "</span></a></h3>");
                //serviceItemBld.Append("<div class=\"cssImageWrapper\"><img src=" + aspxRootPath + imagePath + "/></div>");
                serviceItemBld.Append("<p>" + HttpUtility.HtmlDecode(serviceDetailsInfo.ShortDescription.Trim()) + "</p>");
                serviceItemBld.Append("<span class=\"cssClassServiceDuration\" value=\"" +
                                      (serviceDetailsInfo.ServiceDuration) + "\">" + '(' +
                                      (serviceDetailsInfo.ServiceDuration) + ' ' + getLocale("minutes") + ')' +
                                      "</span>&nbsp;");
                serviceItemBld.Append("<span class=\"cssClassFormatCurrency\" value=\"" + (serviceDetailsInfo.Price) + "\">" + (serviceDetailsInfo.Price * rate) + "</span><div class=\"cssClassClear\"></div>");
                serviceItemBld.Append("<div class=\"sfButtonwrapper\"><a href=\"" + aspxRedirectPath +
                                      "Book-An-Appointment" + pageExtension + "?cid=" + serviceDetailsInfo.CategoryID +
                                      "&amp;pid=" + serviceDetailsInfo.ItemID + "\">" + getLocale("Book Now") +
                                      "</a></div><div class=\"cssClassClear\"></div></div>");
            }
            serviceItemBld.Append("</div>");
            serviceDetailBld.Append(serviceItemBld);
            serviceDetailBld.Append("</div>");
        }
        else
        {
            serviceDetailBld.Append("<div id=\"divServiceDetails\" class=\"cssServiceDetail\">");
            serviceDetailBld.Append("<div id=\"divServiceName\" class=\"cssServiceName\"><h2><span>" + Servicekey + "</span></h2></div>");
            serviceDetailBld.Append("<span class=\"cssClassNotFound\">" +
                                    getLocale("No Service's Products are Available!") + "</span>");
            serviceDetailBld.Append("</div>");
        }
        ltrServiceDetails.Text = serviceDetailBld.ToString();
    }

    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }
}