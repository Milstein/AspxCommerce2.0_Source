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
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using System.Web;

public partial class Modules_AspxYouMayAlsoLike_YouMayAlsoLike : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID, NoOfYouMayAlsoLikeItems;
    public string UserName, CultureName;
    public string SessionCode = string.Empty;
    public string NoImageYouMayAlsoLikePath, EnableYouMayAlsoLike, AllowOutStockPurchase;
    public decimal Rate = 1;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CustomerID = GetCustomerID;
                CultureName = GetCurrentCultureName;
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }
                StoreSettingConfig ssc = new StoreSettingConfig();
                decimal additionalCCVR = decimal.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AdditionalCVR, StoreID, PortalID, CultureName));
                string MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, StoreID, PortalID, CultureName);
                if (HttpContext.Current.Session["CurrencyRate"] != null)
                {
                    if (Session["CurrencyCode"].ToString() != MainCurrency)
                    {
                        decimal rate1 = decimal.Parse(Session["CurrencyRate"].ToString());
                        Rate = Math.Round(rate1 + (rate1 * additionalCCVR / 100), 4);
                    }
                    else
                    {
                        Rate = decimal.Parse(Session["CurrencyRate"].ToString());
                    }
                } 
                NoImageYouMayAlsoLikePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                EnableYouMayAlsoLike = ssc.GetStoreSettingsByKey(StoreSetting.EnableYouMayAlsoLike, StoreID, PortalID, CultureName);
                NoOfYouMayAlsoLikeItems = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfYouMayAlsoLikeItems, StoreID, PortalID, CultureName));
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                IncludeCss("YouMayAlsoLike", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("YouMayAlsoLike", "/js/jquery.tipsy.js");

            }
            IncludeLanguageJS();
            if (EnableYouMayAlsoLike.ToLower() == "true" && NoOfYouMayAlsoLikeItems > 0)
            {
                string itemsku = null;
                string url = HttpContext.Current.Request.Url.ToString();
                if(url.Contains("item"))
                {
                    itemsku = url.Substring(url.LastIndexOf('/'));
                    itemsku = itemsku.Substring(1, (itemsku.LastIndexOf('.') - 1));
                }

                GetItemRelatedUpSellAndCrossSellList(itemsku);
            }
            IncludeLanguageJS();

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    Hashtable hst = null;
    public void GetItemRelatedUpSellAndCrossSellList(string itemsku)
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        aspxCommonObj.CustomerID = CustomerID;
        aspxCommonObj.SessionCode = SessionCode;
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<ItemBasicDetailsInfo> lstRelatedItem = AspxRelatedItemController.GetYouMayAlsoLikeItems(itemsku, aspxCommonObj, NoOfYouMayAlsoLikeItems);
        StringBuilder realatedItemCartContent = new StringBuilder();

        if (lstRelatedItem != null && lstRelatedItem.Count > 0)
        {
            realatedItemCartContent.Append("<div class=\"cssClassSpecialBoxInfo\" id=\"divSpItem\">");
            realatedItemCartContent.Append("<ul>");
            for (int index = 0; index < lstRelatedItem.Count; index++)
            {
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + lstRelatedItem[index].BaseImage;
                if (lstRelatedItem[index].BaseImage == null || lstRelatedItem[index].BaseImage == "")
                {
                    imagePath = NoImageYouMayAlsoLikePath;
                }

                if (lstRelatedItem[index].AlternateText == "")
                {
                    lstRelatedItem[index].AlternateText = lstRelatedItem[index].Name;
                }

                if ((index + 1) % 4 == 0)
                {
                    realatedItemCartContent.Append("<div class=\"cssClassYouMayAlsoLikeBox cssClassYouMayAlsoLikeBoxFourth\">");
                }
                else
                {
                    realatedItemCartContent.Append("<div class=\"cssClassYouMayAlsoLikeBox\">");
                }
                realatedItemCartContent.Append("<p class=\"cssClassCartPicture\"><a href=\"");
                realatedItemCartContent.Append(aspxRedirectPath);
                realatedItemCartContent.Append("item/");
                realatedItemCartContent.Append(lstRelatedItem[index].SKU + pageExtension);
                realatedItemCartContent.Append("\"><img alt=\"");
                realatedItemCartContent.Append(lstRelatedItem[index].AlternateText);
                realatedItemCartContent.Append("\" title=\"");
                realatedItemCartContent.Append(lstRelatedItem[index].Name);
                realatedItemCartContent.Append("\" src=\"");
                realatedItemCartContent.Append(aspxRootPath + imagePath.Replace("uploads", "uploads/Medium"));
                realatedItemCartContent.Append("\"></a></p>");
                realatedItemCartContent.Append("<p class=\"cssClassProductRealPrice\"><span class=\"cssClassFormatCurrency\">Price : ");
                realatedItemCartContent.Append(Convert.ToDecimal(lstRelatedItem[index].Price) * Rate);
                realatedItemCartContent.Append("</span></p>");

                if (AllowOutStockPurchase.ToLower() == "false")
                {
                    if ((bool)lstRelatedItem[index].IsOutOfStock)
                    {
                        realatedItemCartContent.Append("<div class=\"sfButtonwrapper cssClassOutOfStock\"><a href=\"#\"><span>");
                        realatedItemCartContent.Append(getLocale("Out Of Stock"));
                        realatedItemCartContent.Append("</span></a></div></div>");
                    }
                    else
                    {
                        realatedItemCartContent.Append("<div class=\"sfButtonwrapper\"><a href=\"#\" onclick=\"YouMayAlsoLike.AddToCartToJS(");
                        realatedItemCartContent.Append(lstRelatedItem[index].ItemID + ",");
                        realatedItemCartContent.Append(lstRelatedItem[index].Price + ",");
                        realatedItemCartContent.Append("'" + lstRelatedItem[index].SKU + "'," + 1);
                        realatedItemCartContent.Append(");\"><span>");
                        realatedItemCartContent.Append(getLocale("Add to Cart"));
                        realatedItemCartContent.Append("</span></a></div></div>");
                    }
                }
                else
                {
                    realatedItemCartContent.Append("<div class=\"sfButtonwrapper\"><a href=\"#\" onclick=\"YouMayAlsoLike.AddToCartToJS(");
                    realatedItemCartContent.Append(lstRelatedItem[index].ItemID + ",");
                    realatedItemCartContent.Append(lstRelatedItem[index].Price + ",");
                    realatedItemCartContent.Append("'"+lstRelatedItem[index].SKU + "'," + 1);
                    realatedItemCartContent.Append(");\"><span>");
                    realatedItemCartContent.Append(getLocale("Add to Cart"));
                    realatedItemCartContent.Append("</span></a></div></div>");
                }

            }
            realatedItemCartContent.Append("<div class=\"cssClassClear\"></div>");
        }

        else
        {
            realatedItemCartContent.Append("<span class=\"cssClassNotFound\">");
            realatedItemCartContent.Append(getLocale("No Data found."));
            realatedItemCartContent.Append("</span>");
        }
        ltrRelatedItemInCart.Text = realatedItemCartContent.ToString();
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
