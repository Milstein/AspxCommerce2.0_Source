using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using SageFrame.Web;
using SageFrame.Framework;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxCommerce_AspxLatestItems_LatestItemsCarousel : BaseAdministrationUserControl
{
    public string UserIp;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public string DefaultImagePath, EnableLatestItems, AllowOutStockPurchase;
    public int NoOfLatestItems, NoOfLatestItemsInARow;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("LatestItems", "/Templates/" + TemplateName + "/css/MessageBox/style.css",
                           "/Templates/" + TemplateName + "/css/Slider/style.css");
                IncludeJs("LatestItems", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js",
                          "/js/MessageBox/alertbox.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js",
                          "/js/CurrencyFormat/jquery.formatCurrency.all.js",
                          "/Modules/AspxCommerce/AspxLatestItems/js/jquery.ItembxSlider.js",
                          "/Modules/AspxCommerce/AspxLatestItems/js/LatestItemsCarousel.js",
                          "/js/jquery.tipsy.js");

                StoreID = GetStoreID;
                PortalID = GetPortalID;
                CustomerID = GetCustomerID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }
                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);

                StoreSettingConfig ssc = new StoreSettingConfig();
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID,
                                                             CultureName);
                NoOfLatestItems =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsDisplay, StoreID, PortalID,
                                                        CultureName));
                EnableLatestItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableLatestItems, StoreID, PortalID,
                                                              CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID,
                                                                  CultureName);
                NoOfLatestItemsInARow =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfLatestItemsInARow, StoreID, PortalID,
                                                        CultureName));
            }
            IncludeLanguageJS();
            BindLatestItemCarousel();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private Hashtable hst = null;

    private void BindLatestItemCarousel()
    {
        decimal rate = 1;
        StoreSettingConfig ssc = new StoreSettingConfig();
        decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName));
        string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
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
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;

        StringBuilder lstItemNewCarStringBld = new StringBuilder();
        List<LatestItemsInfo> lstLatestItems = AspxItemMgntController.GetLatestItemsByCount(aspxCommonObj,
                                                                                            NoOfLatestItems);

        if (lstLatestItems != null && lstLatestItems.Count > 0)
        {
            foreach (LatestItemsInfo value in lstLatestItems)
            {
                StringBuilder template = GetLstItemCarouselTemp(AllowOutStockPurchase, value);
                decimal? discount;
                string discountOffer = "";
                if (value.ListPrice != null && value.ListPrice > 0)
                {
                    discount = ((value.ListPrice - value.Price)/value.ListPrice)*100;
                    discountOffer = Math.Round(double.Parse(discount.ToString())).ToString() + "%";
                }
                if (value.ImagePath == "")
                {
                    value.ImagePath = DefaultImagePath;
                }
                string[] tokens = EmailTemplate.GetAllToken(template.ToString());
                foreach (var token in tokens)
                {
                    switch (token)
                    {
                        case "%aspxRedirectPath%":
                            template = template.Replace(token, aspxRedirectPath);
                            break;
                        case "%sku%":
                            template = template.Replace(token, value.SKU);
                            break;
                        case "%pageExtension%":
                            template = template.Replace(token, pageExtension);
                            break;
                        case "%imagePath%":
                            template = template.Replace(token,
                                                        aspxRootPath +
                                                        value.ImagePath.Replace("uploads", "uploads/Small"));
                            break;
                        case "%alternateText%":
                            template = template.Replace(token, value.AlternateText);
                            break;
                        case "%name%":
                            string name = string.Empty;
                            if (value.Name.Length > 50)
                            {
                                name = value.Name.Substring(0, 50);
                                int index = 0;
                                index = name.LastIndexOf(' ');
                                name = name.Substring(0, index);
                                name = name + "...";
                            }
                            else
                            {
                                name = value.Name;
                            }
                            template = template.Replace(token, name);
                            break;
                        case "%discountOffer%":
                            template = template.Replace(token, discountOffer);
                            break;
                        case "%listPrice%":
                            template = template.Replace(token, value.ListPrice.ToString());
                            break;
                        case "%price%":
                            template = template.Replace(token,
                                                        Math.Round(double.Parse((value.Price*rate).ToString()), 2).
                                                            ToString());
                            break;
                        case "%itemID%":
                            template = template.Replace(token, value.ItemID.ToString());
                            break;
                        case "%(price/rate).toFixed(2)%":
                            template = template.Replace(token,
                                                        Math.Round(double.Parse((value.Price).ToString()), 2).ToString());
                            break;
                        case "%JSON2.stringify(sku)%":
                            template = template.Replace(token, value.SKU);
                            break;
                        case "%1%":
                            template = template.Replace(token, "1");
                            break;
                        case "%title%":
                            template = template.Replace(token, value.Name);
                            break;
                    }

                }
                lstItemNewCarStringBld.Append(template);
            }
        }
        else
        {
            lstItemNewCarStringBld.Append("<li>");
            lstItemNewCarStringBld.Append("<span class=\"cssClassNotFound\">");
            lstItemNewCarStringBld.Append(getLocale("This store has no items listed yet!"));
            lstItemNewCarStringBld.Append("</span></li>");
        }
        ltrLatestItemCarousel.Text = lstItemNewCarStringBld.ToString();
    }

    private StringBuilder GetLstItemCarouselTemp(string allowOutStockPurchase, LatestItemsInfo obj)
    {
        StringBuilder template = new StringBuilder();
        template.Append("<li class=\"cssClassLatestItemList\">");
        template.Append("<div class=\"cssClassProductsBox\">");
        template.Append("<div class=\"cssClassProductsBoxInfo\">");
        if (obj.ListPrice != null && obj.ListPrice > 0)
        {
            template.Append(
                "<div class=\"cssClassDiscountPrice\"><span class=\"cssClassOfferSave\" > %discountOffer% Off</span></div>");
        }
        template.Append(" <div class=\"cssClassProductPicture\">");
        template.Append("<a href=\"%aspxRedirectPath%item/%sku%%pageExtension%\">");
        template.Append("<img src=\"%imagePath%\" alt=\"%alternateText%\" title=\"%name%\"/></a>");
        template.Append("</div>");
        //template.Append("<div class=\"cssClassDiscountPrice\"><span > %discountOffer%</span></div>");
        template.Append("<div class=\"cssClassProductName\">");
        template.Append("<h2>");
        template.Append("<a href=\"%aspxRedirectPath%item/%sku%%pageExtension%\" title=\"%title%\">");
       // template.Append("<h2>%name%</h2>");
        template.Append("<span>%name%</span></a>");
        template.Append("</h2>");
        template.Append("</div>");
        template.Append("<div class=\"cssClassProductPriceBox\">");
        template.Append("<div class=\"cssClassProductPrice\">");
        //template.Append("<p class=\"cssClassProductOffPrice\">");
        //template.Append("<span class=\"cssRegularPrice cssClassFormatCurrency\">%listPrice%</span></p>");
        template.Append("<p class=\"cssClassProductRealPrice\">");
        template.Append("<span class=\"cssOfferPrice cssClassFormatCurrency\">%price%</span></p>");
        template.Append("</div>");
        template.Append("</div>");
        template.Append("<div class=\"cssClassclear\">");
        template.Append( "</div>");
        
        //if (allowOutStockPurchase.ToLower() == "false")
        //{
        //    if (obj.IsOutOfStock != null && (bool) obj.IsOutOfStock)
        //    {
        //        template.Append("<div class=\"cssClassAddtoCard_%itemID% cssClassOutOfStock\"><span>" +getLocale("Out Of Stock") + "</span>");
        //        template.Append("<div class=\"sfButtonwrapper\">");
        //        template.Append("<button type=\"button\">");
        //        template.Append("<span>Add to Cart</span></button>");
        //        template.Append("</div>");
        //        template.Append("</div>");
        //    }
        //}
        //else
        //{
        //    template.Append("<div class=\"cssClassAddtoCard_%itemID% cssClassAddtoCard\">");
        //    template.Append("<div class=\"sfButtonwrapper\">");
        //    template.Append("<button type=\"button\" onclick=\"AspxCommerce.RootFunction.AddToCartToJSFromTemplate(%itemID%,%(price/rate).toFixed(2)%,%JSON2.stringify(sku)%,%1%);\">");
        //    template.Append("<span>Add to Cart</span></button>");
        //    template.Append("</div>");
        //    template.Append("</div>");
        //}
        template.Append("</div>");
        template.Append("</div>");
        template.Append("</li>");
        return template;
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
