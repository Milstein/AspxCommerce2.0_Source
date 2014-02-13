/*
AspxCommerce® - http://www.AspxCommerce.com
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
using System.Collections;
using System.Collections.Generic;
using System.Web;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Text;

public partial class Modules_AspxFrontItemGallery_FrontItemGallery : BaseAdministrationUserControl
{
    public int StoreID, PortalID;
    public string UserName, CultureName, NoImageFeaturedItemPath;
    public string FeatureItemRss, RssFeedUrl;
    public string ModuleCollapsible;
    private AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    public string GalleryDisplayAs;
    public int Count;
    public int RowTotal = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeCss("FrontItemGallery", "/Templates/" + TemplateName + "/css/FrontItemGallery/module.css",
                           "/Templates/" + TemplateName + "/css/MessageBox/style.css");
                IncludeJs("FrontItemGallery", "/js/FrontImageGallery/jquery.nivo.slider.js",
                          "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js",
                          "/Modules/AspxCommerce/AspxFrontItemGallery/js/FrontItemGallery.js");
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CultureName = GetCurrentCultureName;
                aspxCommonObj.SessionCode = Session.SessionID;
                aspxCommonObj.StoreID = StoreID;
                aspxCommonObj.PortalID = PortalID;
                aspxCommonObj.UserName = UserName;
                aspxCommonObj.CultureName = CultureName;
                aspxCommonObj.CustomerID = GetCustomerID;
                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageFeaturedItemPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID,
                                                                    PortalID, CultureName);
                FeatureItemRss = ssc.GetStoreSettingsByKey(StoreSetting.FeatureItemRss, StoreID, PortalID, CultureName);
                ModuleCollapsible = ssc.GetStoreSettingsByKey(StoreSetting.ModuleCollapsible, StoreID, PortalID, CultureName);
                if (FeatureItemRss.ToLower() == "true")
                {
                    RssFeedUrl = ssc.GetStoreSettingsByKey(StoreSetting.RssFeedURL, StoreID, PortalID, CultureName);
                }
                List<FrontItemGallerySettingInfo> galleryObj = AspxFeatureItemController.GetFrontGallerySetting(aspxCommonObj);
                foreach (FrontItemGallerySettingInfo item in galleryObj)
                {
                    GalleryDisplayAs = item.GalleryDisplayAs;
                    Count = item.Count;
                }
                if (GalleryDisplayAs == "Featured")
                {
                    LoadFeaturedGallery();
                }
                else
                {
                    LoadSpecialGallery();
                }
            }
            IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

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


    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
    }

    private Hashtable hst = null;

    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }

    private void LoadFeaturedGallery()
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
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
        List<FeaturedItemsInfo> lstFeatureItem = AspxFeatureItemController.GetFeaturedItemsByCount(aspxCommonObj, Count);
        RowTotal = lstFeatureItem.Count;
        StringBuilder gallery = new StringBuilder();
        StringBuilder caption = new StringBuilder();
        if (lstFeatureItem.Count > 0)
        {
            gallery.Append("<div id=\"wrapper\">");
            gallery.Append("<div id =\"slider-wrapper\">");
            gallery.Append("<div id=\"sliderfront\" class=\"nivoSlider\">");
            foreach (FeaturedItemsInfo item in lstFeatureItem)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == "")
                {
                    imagePath = aspxRootPath + NoImageFeaturedItemPath;
                }
                if (item.AlternateText == "")
                {
                    item.AlternateText = item.Name;
                }
                string medpath = imagePath;
                medpath = medpath.Replace("uploads", "uploads/Medium");

                gallery.Append("<a href=\"" + aspxRedirectPath + "item/" + item.SKU + pageExtension + "\"><img alt=\"" +
                               item.AlternateText + "\" src=\"" + aspxRootPath + medpath +
                               "\" class=\"cssClassItemImage\" width=\"188\" height=\"87\" title=\"#Caption-" +
                               item.ItemID +
                               "\" /></a>");

                caption.Append("<div id=\"Caption-" + item.ItemID + "\" class=\"nivo-html-caption\"><a href=\"" +
                               aspxRedirectPath + "item/" + item.SKU + pageExtension + "\">" + item.Name + "</a><span>" +
                               getLocale("Price:") + "&nbsp;<span class=\"cssClassFormatCurrency\">" + Math.Round((decimal.Parse(item.Price)*rate),2) +
                               "</span></span></div>");

            }
            gallery.Append("</div></div></div>");
            gallery.Append(caption.ToString());
        }
        else
        {
            gallery.Append("<div class=\"cssClassNotFound\">" +
                           getLocale("This store has no featured items found!") + "</div>");
        }
        ltGallery.Text = gallery.ToString();


    }
    private void LoadSpecialGallery()
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
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

        List<SpecialItemsInfo> lstSpecialItems = AspxSpecialItemController.GetSpecialItems(aspxCommonObj, Count);
        StringBuilder gallery = new StringBuilder();
        StringBuilder caption = new StringBuilder();
        if (lstSpecialItems.Count > 0)
        {
            gallery.Append("<div id=\"wrapper\">");
            gallery.Append("<div id =\"slider-wrapper\">");
            gallery.Append("<div id=\"sliderfront\" class=\"nivoSlider\">");
            foreach (SpecialItemsInfo item in lstSpecialItems)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == "")
                {
                    imagePath = aspxRootPath + NoImageFeaturedItemPath;
                }
                if (item.AlternateText == "")
                {
                    item.AlternateText = item.ItemName;
                }
                string medpath = imagePath;
                medpath = medpath.Replace("uploads", "uploads/Medium");

                gallery.Append("<a href=\"" + aspxRedirectPath + "item/" + item.SKU + pageExtension + "\"><img alt=\"" +
                               item.AlternateText + "\" src=\"" + aspxRootPath + medpath +
                               "\" class=\"cssClassItemImage\" width=\"188\" height=\"87\" title=\"#Caption-" +
                               item.ItemID +
                               "\" /></a>");

                caption.Append("<div id=\"Caption-" + item.ItemID + "\" class=\"nivo-html-caption\"><a href=\"" +
                               aspxRedirectPath + "item/" + item.SKU + pageExtension + "\">" + item.ItemName + "</a><span>" +
                               getLocale("Price:") + "&nbsp;<span class=\"cssClassFormatCurrency\">" +Math.Round(double.Parse((item.Price * rate).ToString()), 2).ToString() +
                               "</span></span></div>");

            }
            gallery.Append("</div></div></div>");
            gallery.Append(caption.ToString());
        }
        else
        {
            gallery.Append("<div class=\"cssClassNotFound\">" +
                           getLocale("This store has no special items found!") + "</div>");
        }
        ltGallery.Text = gallery.ToString();
    }
}

