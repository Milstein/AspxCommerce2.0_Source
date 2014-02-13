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
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Web;
using System.Web.Security;
using SageFrame.Framework;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class WishItemList : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public string CountryName = string.Empty;
    public string SessionCode = string.Empty;
    public string UserEmailWishList = string.Empty;
    public string UserIp, NoImageWishList, EnableWishList, ShowImageInWishlist, AllowOutStockPurchase;
    public bool IsUseFriendlyUrls = true;
    public int ArrayLength = 0;
    public int RowTotal = 0;
    protected void page_init(object sender, EventArgs e)
    {
        string modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "globalVariables", " var aspxservicePath='" + ResolveUrl(modulePath) + "';", true);
        Page.ClientScript.RegisterClientScriptInclude("Paging", ResolveUrl("~/js/Paging/jquery.pagination.js"));
        IncludeLanguageJS();
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            SageFrameConfig pagebase = new SageFrameConfig();
            IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
            FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
            if (ticket != null && ticket.Name != ApplicationKeys.anonymousUser)
            {
                IncludeCss("WishItemList", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/PopUp/style.css", "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("WishItemList", "/js/DateTime/date.js", "/js/MessageBox/jquery.easing.1.3.js",
                          "/js/MessageBox/alertbox.js", "/js/PopUp/custom.js", "/js/jquery.tipsy.js");
               
                //SageFrameConfig pagebase = new SageFrameConfig();
                //IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
                StoreID = GetStoreID;
                PortalID = GetPortalID;
                UserName = GetUsername;
                CustomerID = GetCustomerID;
                CultureName = GetCurrentCultureName;
                if (!IsPostBack)
                {
                    MembershipController member = new MembershipController();
                    UserInfo userDetail = member.GetUserDetails(GetPortalID, GetUsername);
                    UserEmailWishList = userDetail.Email;
                }
                if (HttpContext.Current.Session.SessionID != null)
                {
                    SessionCode = HttpContext.Current.Session.SessionID.ToString();
                }

                UserIp = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(UserIp, out CountryName);

                StoreSettingConfig ssc = new StoreSettingConfig();
                NoImageWishList = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                EnableWishList = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, StoreID, PortalID, CultureName);
                ShowImageInWishlist = ssc.GetStoreSettingsByKey(StoreSetting.ShowItemImagesInWishList, StoreID, PortalID, CultureName);
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID, CultureName);
                string sortByOptions = ssc.GetStoreSettingsByKey(StoreSetting.SortByOptions, StoreID, PortalID, CultureName);
            }
            else
            {
                if (IsUseFriendlyUrls)
                {
                    if (GetPortalID > 1)
                    {
                        Response.Redirect(ResolveUrl("~/portal/" + GetPortalSEOName + "/" + pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage)) + ".aspx?ReturnUrl=" + Request.Url.ToString(), false);
                    }
                    else
                    {
                        Response.Redirect(ResolveUrl("~/" + pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage)) + ".aspx?ReturnUrl=" + Request.Url.ToString(), false);
                    }
                }

                else
                {
                    Response.Redirect(ResolveUrl("~/Default.aspx?ptlid=" + GetPortalID + "&ptSEO=" + GetPortalSEOName + "&pgnm=" + pagebase.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage)) + "?ReturnUrl=" + Request.Url.ToString(), false);
                }
            }
            if (EnableWishList.ToLower() == "true")
            {
                BindWishListItem();
            }
            //IncludeLanguageJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    Hashtable hst = null;
    private void SortByList()
    {
        StoreSettingConfig ssc = new StoreSettingConfig();
        string sortByOptions = ssc.GetStoreSettingsByKey(StoreSetting.SortByOptions, StoreID, PortalID, CultureName);
        string[] sortByOption = sortByOptions.Substring(0, sortByOptions.LastIndexOf(',')).Split(',');
        StringBuilder wishListSortByBdl = new StringBuilder();
        wishListSortByBdl.Append("<span class=\"sfLocale\">Sort by:</span><select id=\"ddlWishListSortBy\" class=\"sfListmenu\">");
        foreach (string sortByOption1 in sortByOption)
        {
            string[] sortByOptionsplit = sortByOption1.Split('#');
            wishListSortByBdl.Append("<option data-html-text=\"" + sortByOptionsplit[1] + "\" value=" + sortByOptionsplit[0] + ">" + sortByOptionsplit[1] + "</option>");

        }
        wishListSortByBdl.Append("</select>");
        ltrWishListSortBy.Text = wishListSortByBdl.ToString();
    }

    public void BindWishListItem()
    {
        decimal rate = 1;
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
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
       
        var count = 10;
        var isAll = "1";
        int limit = 5; //get value from drop down
        int offset = 1;
        int sortBy = 1; // get value from drop down
        List<WishItemsInfo> lstWishList = AspxWishItemController.GetWishItemList(offset, limit, aspxCommonObj, isAll, count, sortBy);
        StringBuilder wishListStringBld = new StringBuilder();

        if (lstWishList != null && lstWishList.Count > 0)
        {
            SortByList();
            wishListStringBld.Append("<thead>");
            wishListStringBld.Append("<tr class=\"cssClassCommonCenterBoxTableHeading\">");
            wishListStringBld.Append(
                "<td class=\"cssClassWishItemChkbox\"> <input type=\"checkbox\" id=\"chkHeading\"/></td>");
            wishListStringBld.Append(
                "<td class=\"cssClassWishItemDetails\"><label id=\"lblItem\" class=\"sfLocale\">Item</label></td>");
            wishListStringBld.Append(
                "<td class=\"row-variants\"><label id=\"lblVariant\" class=\"sfLocale\">Variants</label></td>");
            wishListStringBld.Append(
                "<td class=\"cssClassWishListComment\"><label id=\"lblComment\" class=\"sfLocale\">Comment</label></td>");
            wishListStringBld.Append(
                "<td class=\"cssClassAddedOn\"><label id=\"lblAddedOn\" class=\"sfLocale\">Added On</label></td>");
            wishListStringBld.Append(
                "<td class=\"cssClassAddToCart\"><label id=\"lblAddToCart\" class=\"sfLocale\">Add To Cart</label></td>");
            wishListStringBld.Append("<td class=\"cssClassDelete\"></td>");
            wishListStringBld.Append("</tr></thead>");
            wishListStringBld.Append("<tbody>");
            ArrayLength = lstWishList.Count;
            foreach (var response in lstWishList)
            {
                // ArrItemListType.Add(response.ItemID);

                RowTotal = response.RowTotal;
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + response.ImagePath;
                if (response.ImagePath == "")
                {
                    imagePath = NoImageWishList;
                }
                else if (response.AlternateText == "")
                {
                    response.AlternateText = response.ItemName;
                }
                JavaScriptSerializer ser = new JavaScriptSerializer();
                string WishDate = (Convert.ToDateTime(response.WishDate)).ToShortDateString();
                    //WishList.DateDeserialize(response.WishDate, "yyyy/M/d");
                var itemSKU = ser.Serialize(response.SKU); //JSON2.stringify(response.SKU);
                var cosVaraint = ser.Serialize(response.CostVariantValueIDs);
                    //JSON2.stringify(response.CostVariantValueIDs);
                var href = "";
                var cartUrl = "";
                if (response.CostVariantValueIDs == "")
                {
                    cartUrl = "#";
                    href = aspxRedirectPath + "item/" + response.SKU + pageExtension;
                }
                else
                {
                    cartUrl = aspxRedirectPath + "item/" + response.SKU + pageExtension + "?varId=" +
                              response.CostVariantValueIDs + "";
                    href = aspxRedirectPath + "item/" + response.SKU + pageExtension + "?varId=" +
                           response.CostVariantValueIDs + "";
                }
                if (lstWishList.IndexOf(response)%2 == 0)
                {
                    if (AllowOutStockPurchase.ToLower() == "false")
                    {
                        if (response.IsOutOfStock != null && (bool) response.IsOutOfStock)
                        {
                            wishListStringBld.Append("<tr class=\"sfEven\" id=\"tr_" + response.ItemID + "\">");
                            wishListStringBld.Append("<td class=\"cssClassWishItemChkbox\">");
                            wishListStringBld.Append("<input type=\"checkbox\" id=\"" + response.WishItemID +
                                                     "\" class=\"cssClassWishItem\"/></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishItemDetails\">");
                            wishListStringBld.Append("<div class=\"cssClassImage\">");
                            wishListStringBld.Append("<img src=\"" + aspxRootPath +
                                                     imagePath.Replace("uploads", "uploads/Small") +
                                                     "\" alt=\"" + response.AlternateText + "\" title=\"" +
                                                     response.AlternateText + "\"/>");
                            wishListStringBld.Append("</div>");
                            wishListStringBld.Append("<a href=\"" + href + "\">" + response.ItemName + "</a></br>");
                            wishListStringBld.Append("<span class=\"cssClassPrice cssClassFormatCurrency\">" +
                                                     Math.Round(decimal.Parse(response.Price)*rate, 2) + "</span></td>");
                            wishListStringBld.Append(
                                "<td><input type=\"hidden\" name=\"hdnCostVariandValueIDS\" value=" + cosVaraint + "/>");
                            wishListStringBld.Append("<span>" + response.ItemCostVariantValue + "</span></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishComment\">");
                            wishListStringBld.Append("<textarea maxlength=\"300\" onkeyup=\"" +
                                                     "WishList.ismaxlength(this)" + "\" id=\"comment_" +
                                                     response.WishItemID + "\" class=\"comment\">" + response.Comment +
                                                     "</textarea></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishDate\">" + WishDate + "</td>");
                            wishListStringBld.Append("<td class=\"cssClassWishToCart\">");
                            wishListStringBld.Append("<div class=\"sfButtonwrapper cssClassOutOfStock\">");
                            wishListStringBld.Append("<a href=\"#\"><span>" + getLocale("Out Of Stock") +
                                                     "</span></a></div></td>");
                            wishListStringBld.Append("<td class=\"cssClassDelete\">");
                            wishListStringBld.Append("<img onclick=\"WishList.DeleteWishListItem(" + response.WishItemID +
                                                     ")\" src=\"" + aspxTemplateFolderPath +
                                                     "/images/admin/btndelete.png\"/>");
                            wishListStringBld.Append("</td></tr>");
                        }
                        else
                        {
                            wishListStringBld.Append("<tr class=\"sfEven\" id=\"tr_" + response.ItemID + "\">");
                            wishListStringBld.Append("<td class=\"cssClassWishItemChkbox\">");
                            wishListStringBld.Append("<input type=\"checkbox\" id=\"" + response.WishItemID +
                                                     "\" class=\"cssClassWishItem\"/></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishItemDetails\">");
                            wishListStringBld.Append("<div class=\"cssClassImage\">");
                            wishListStringBld.Append("<img src=\"" + aspxRootPath +
                                                     imagePath.Replace("uploads", "uploads/Small") +
                                                     "\" alt=\"" + response.AlternateText + "\" title=\"" +
                                                     response.AlternateText + "\"/>");
                            wishListStringBld.Append("</div>");
                            wishListStringBld.Append("<a href=\"" + href + "\">" + response.ItemName + "</a></br>");
                            wishListStringBld.Append("<span class=\"cssClassPrice cssClassFormatCurrency\">" +
                                                     Math.Round(decimal.Parse(response.Price)*rate, 2) + "</span></td>");
                            wishListStringBld.Append(
                                "<td><input type=\"hidden\" name=\"hdnCostVariandValueIDS\" value=" + cosVaraint + "/>");
                            wishListStringBld.Append("<span>" + response.ItemCostVariantValue + "</span></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishComment\">");
                            wishListStringBld.Append("<textarea maxlength=\"300\" onkeyup=\"" +
                                                     "WishList.ismaxlength(this)" + "\" id=\"comment_" +
                                                     response.WishItemID + "\" class=\"comment\">" + response.Comment +
                                                     "</textarea></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishDate\">" + WishDate + "</td>");
                            wishListStringBld.Append("<td class=\"cssClassWishToCart\">");
                            wishListStringBld.Append("<div class=\"sfButtonwrapper\">");
                            wishListStringBld.Append("<a href=\"" + cartUrl + "\" onclick=WishList.AddToCartToJS(" +
                                                     response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 +
                                                     ");><span>" + getLocale("Add To Cart") +
                                                     "</span></a></div></td>");
                            wishListStringBld.Append("<td class=\"cssClassDelete\">");
                            wishListStringBld.Append("<img onclick=\"WishList.DeleteWishListItem(" + response.WishItemID +
                                                     ")\" src=\"" + aspxTemplateFolderPath +
                                                     "/images/admin/btndelete.png\"/>");
                            wishListStringBld.Append("</td></tr>");
                        }
                    }
                    else
                    {
                        wishListStringBld.Append("<tr class=\"sfEven\" id=\"tr_" + response.ItemID + "\">");
                        wishListStringBld.Append("<td class=\"cssClassWishItemChkbox\">");
                        wishListStringBld.Append("<input type=\"checkbox\" id=\"" + response.WishItemID +
                                                 "\" class=\"cssClassWishItem\"/></td>");
                        wishListStringBld.Append("<td class=\"cssClassWishItemDetails\">");
                        wishListStringBld.Append("<div class=\"cssClassImage\">");
                        wishListStringBld.Append("<img src=\"" + aspxRootPath +
                                                imagePath.Replace("uploads", "uploads/Small") + "\" alt=\"" +
                                                 response.AlternateText + "\" title=\"" + response.AlternateText +
                                                 "\"/>");
                        wishListStringBld.Append("</div>>");
                        wishListStringBld.Append("<a href=\"" + href + "\">" + response.ItemName + "</a><br>");
                        wishListStringBld.Append("<span class=\"cssClassPrice cssClassFormatCurrency\">" +
                                                 Math.Round(decimal.Parse(response.Price)*rate, 2) + "</span></td>");
                        wishListStringBld.Append("<td><input type=\"hidden\" name=\"hdnCostVariandValueIDS\" value=" +
                                                 cosVaraint + "/>");
                        wishListStringBld.Append("<span>" + response.ItemCostVariantValue + "</span></td>");
                        wishListStringBld.Append("<td class=\"cssClassWishComment\">");
                        wishListStringBld.Append("<textarea maxlength=\"300\" onkeyup=\"" + "WishList.ismaxlength(this)" +
                                                 "\" id=\"comment_" + response.WishItemID + "\" class=\"comment\">" +
                                                 response.Comment + "</textarea></td>");
                        wishListStringBld.Append("<td class=\"cssClassWishDate\">" + WishDate + "</td>");
                        wishListStringBld.Append("<td class=\"cssClassWishToCart\">");
                        wishListStringBld.Append("<div class=\"sfButtonwrapper\">");
                        wishListStringBld.Append("<a href=" + cartUrl + " onclick=WishList.AddToCartToJS(" +
                                                 response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 +
                                                 ");><span>" + getLocale("Add To Cart") + "</span></a></div></td>");
                        wishListStringBld.Append("<td class=\"cssClassDelete\">");
                        wishListStringBld.Append("<img onclick=\"WishList.DeleteWishListItem(" + response.WishItemID +
                                                 ")\" src=\"" + aspxTemplateFolderPath +
                                                 "/images/admin/btndelete.png\"/>");
                        wishListStringBld.Append("</td></tr>");
                    }
                }
                else
                {
                    if (AllowOutStockPurchase.ToLower() == "false")
                    {
                        if (response.IsOutOfStock != null && (bool) response.IsOutOfStock)
                        {
                            wishListStringBld.Append("<tr class=\"sfOdd\" id=\"tr_" + response.ItemID + "\">");
                            wishListStringBld.Append("<td class=\"cssClassWishItemChkbox\">");
                            wishListStringBld.Append("<input type=\"checkbox\" id=\"" + response.WishItemID +
                                                     "\" class=\"cssClassWishItem\"/></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishItemDetails\">");
                            wishListStringBld.Append("<div class=\"cssClassImage\">");
                            wishListStringBld.Append("<img src=\"" + aspxRootPath +
                                                     imagePath.Replace("uploads", "uploads/Small") +
                                                     "\" alt=\"" + response.AlternateText + "\" title=\"" +
                                                     response.AlternateText + "\"/>");
                            wishListStringBld.Append("</div>");
                            wishListStringBld.Append("<a href=\"" + href + "\">" + response.ItemName + "</a></br>");
                            wishListStringBld.Append("<span class=\"cssClassPrice cssClassFormatCurrency\">" +
                                                     Math.Round(decimal.Parse(response.Price)*rate, 2) + "</span></td>");
                            wishListStringBld.Append(
                                "<td><input type=\"hidden\" name=\"hdnCostVariandValueIDS\" value=" + cosVaraint + "/>");
                            wishListStringBld.Append("<span>" + response.ItemCostVariantValue + "</span></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishComment\">");
                            wishListStringBld.Append("<textarea maxlength=\"300\" onkeyup=\"" +
                                                     "WishList.ismaxlength(this)" + "\" id=\"comment_" +
                                                     response.WishItemID + "\" class=\"comment\">" + response.Comment +
                                                     "</textarea></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishDate\">" + WishDate + "</td>");
                            wishListStringBld.Append("<td class=\"cssClassWishToCart\">");
                            wishListStringBld.Append("<div class=\"sfButtonwrapper cssClassOutOfStock\">");
                            wishListStringBld.Append("<a href=\"#\"><span>" + getLocale("Out Of Stock") +
                                                     "</span></a></div></td>");
                            wishListStringBld.Append("<td class=\"cssClassDelete\">");
                            wishListStringBld.Append("<img onclick=\"WishList.DeleteWishListItem(" + response.WishItemID +
                                                     ")\" src=\"" + aspxTemplateFolderPath +
                                                     "/images/admin/btndelete.png\"/>");
                            wishListStringBld.Append("</td></tr>");
                        }
                        else
                        {
                            wishListStringBld.Append("<tr class=\"sfOdd\" id=\"tr_" + response.ItemID + "\">");
                            wishListStringBld.Append("<td class=\"cssClassWishItemChkbox\">");
                            wishListStringBld.Append("<input type=\"checkbox\" id=\"" + response.WishItemID +
                                                     "\" class=\"cssClassWishItem\"/></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishItemDetails\">");
                            wishListStringBld.Append("<div class=\"cssClassImage\">");
                            wishListStringBld.Append("<img src=\"" + aspxRootPath +
                                                     imagePath.Replace("uploads", "uploads/Small") +
                                                     "\" alt=\"" + response.AlternateText + "\" title=\"" +
                                                     response.AlternateText + "\"/>");
                            wishListStringBld.Append("</div>");
                            wishListStringBld.Append("<a href=\"" + href + "\">" + response.ItemName + "</a></br>");
                            wishListStringBld.Append("<span class=\"cssClassPrice cssClassFormatCurrency\">" +
                                                     Math.Round(decimal.Parse(response.Price)*rate, 2) + "</span></td>");
                            wishListStringBld.Append(
                                "<td><input type=\"hidden\" name=\"hdnCostVariandValueIDS\" value=" + cosVaraint + "/>");
                            wishListStringBld.Append("<span>" + response.ItemCostVariantValue + "</span></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishComment\">");
                            wishListStringBld.Append("<textarea maxlength=\"300\" onkeyup=\"" +
                                                     "WishList.ismaxlength(this)" + "\" id=\"comment_" +
                                                     response.WishItemID + "\" class=\"comment\">" + response.Comment +
                                                     "</textarea></td>");
                            wishListStringBld.Append("<td class=\"cssClassWishDate\">" + WishDate + "</td>");
                            wishListStringBld.Append("<td class=\"cssClassWishToCart\">");
                            wishListStringBld.Append("<div class=\"sfButtonwrapper\">");
                            wishListStringBld.Append("<a href=" + cartUrl + " onclick=WishList.AddToCartToJS(" +
                                                     response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 +
                                                     ");><span>" + getLocale("Add To Cart") +
                                                     "</span></a></div></td>");
                            wishListStringBld.Append("<td class=\"cssClassDelete\">");
                            wishListStringBld.Append("<img onclick=\"WishList.DeleteWishListItem(" + response.WishItemID +
                                                     ")\" src=\"" + aspxTemplateFolderPath +
                                                     "/images/admin/btndelete.png\"/>");
                            wishListStringBld.Append("</td></tr>");
                        }
                    }
                    else
                    {
                        wishListStringBld.Append("<tr class=\"sfOdd\" id=\"tr_" + response.ItemID + "\">");
                        wishListStringBld.Append("<td class=\"cssClassWishItemChkbox\">");
                        wishListStringBld.Append("<input type=\"checkbox\" id=\"" + response.WishItemID +
                                                 "\" class=\"cssClassWishItem\"/></td>");
                        wishListStringBld.Append("<td class=\"cssClassWishItemDetails\">");
                        wishListStringBld.Append("<div class=\"cssClassImage\">");
                        wishListStringBld.Append("<img src=\"" + aspxRootPath +
                                                 imagePath.Replace("uploads", "uploads/Small") + "\" alt=\"" +
                                                 response.AlternateText + "\" title=\"" + response.AlternateText +
                                                 "\"/>");
                        wishListStringBld.Append("</div>");
                        wishListStringBld.Append("<a href=\"" + href + "\">" + response.ItemName + "</a></br>");
                        wishListStringBld.Append("<span class=\"cssClassPrice cssClassFormatCurrency\">" +
                                                 Math.Round(decimal.Parse(response.Price)*rate, 2) + "</span></td>");
                        wishListStringBld.Append("<td><input type=\"hidden\" name=\"hdnCostVariandValueIDS\" value=" +
                                                 cosVaraint + "/>");
                        wishListStringBld.Append("<span>" + response.ItemCostVariantValue + "</span></td>");
                        wishListStringBld.Append("<td class=\"cssClassWishComment\">");
                        wishListStringBld.Append("<textarea maxlength=\"300\" onkeyup=\"" + "WishList.ismaxlength(this)" +
                                                 "\" id=\"comment_" + response.WishItemID + "\" class=\"comment\">" +
                                                 response.Comment + "</textarea></td>");
                        wishListStringBld.Append("<td class=\"cssClassWishDate\">" + WishDate + "</td>");
                        wishListStringBld.Append("<td class=\"cssClassWishToCart\">");
                        wishListStringBld.Append("<div class=\"sfButtonwrapper\">");
                        wishListStringBld.Append("<a href=" + cartUrl + " onclick=WishList.AddToCartToJS(" +
                                                 response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 +
                                                 ");><span>" + getLocale("Add To Cart") + "</span></a></div></td>");
                        wishListStringBld.Append("<td class=\"cssClassDelete\">");
                        wishListStringBld.Append("<img onclick=\"WishList.DeleteWishListItem(" + response.WishItemID +
                                                 ")\" src=\"" + aspxTemplateFolderPath +
                                                 "/images/admin/btndelete.png\"/>");
                        wishListStringBld.Append("</td></tr>");
                    }
                }
            }
            wishListStringBld.Append("</tbody>");
            wishListStringBld.Append(GetStringScript("$('.cssClassImage img[title]').tipsy({ gravity: 'n' });"));
            StringBuilder wishLstButtonBdl = new StringBuilder();
            wishLstButtonBdl.Append("<button type=\"button\" id=\"shareWishList\">");
            wishLstButtonBdl.Append("<span><span class=\"sfLocale\">Share Wishlist</span></span></button>");
            wishLstButtonBdl.Append(
                "<button type=\"button\" id=\"updateWishList\" onclick=\"WishList.UpdateWishList();\">");
            wishLstButtonBdl.Append("<span><span class=\"sfLocale\">Update Selected</span></span></button>");
            wishLstButtonBdl.Append(
                "<button type=\"button\" id=\"clearWishList\" onclick=\"WishList.ClearWishList();\">");
            wishLstButtonBdl.Append("<span><span class=\"sfLocale\">Clear WishList</span></span></button>");
            wishLstButtonBdl.Append("<button type=\"button\" id=\"btnDeletedMultiple\">");
            wishLstButtonBdl.Append("");
            wishLstButtonBdl.Append("<span><span class=\"sfLocale\">Delete Selected</span></span></button>");
            wishLstButtonBdl.Append("<button type=\"button\" id=\"continueInStore\">");
            wishLstButtonBdl.Append("<span><span class=\"sfLocale\">Continue to Shopping</span></span></button >");

            StringBuilder wishListPaginationBdl = new StringBuilder();
            wishListPaginationBdl.Append("<span class=\"sfLocale\">View Per Page: </span><select id=\"ddlWishListPageSize\" class=\"sfListmenu\"><option value=\"\"></option></select>");
           
            //StringBuilder wishListSortByBdl = new StringBuilder();
            //wishListSortByBdl.Append("<span class=\"sfLocale\">Sort by:</span><select id=\"ddlWishListSortBy\" class=\"sfListmenu\"><option value=\"\"></option></select>");
            //ltrWishListSortBy.Text = wishListSortByBdl.ToString();
            
            ltrWishListButon.Text = wishLstButtonBdl.ToString();
            ltrWishListPagination.Text = wishListPaginationBdl.ToString();
        }
        else
        {
            wishListStringBld.Append("<tr><td class=\"cssClassNotFound\">" + getLocale("Your wishlist is empty!") + "</td></tr>");
        }
        ltrWishList.Text = wishListStringBld.ToString();
    }

    private string GetStringScript(string codeToRun)
    {
        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){ " +
                      codeToRun + " });</script>");
        return script.ToString();
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
