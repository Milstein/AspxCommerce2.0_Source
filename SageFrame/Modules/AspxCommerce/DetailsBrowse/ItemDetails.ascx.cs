using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Web;
using System.Collections;
using SageFrame.Framework;
using System.Web.Security;
using SageFrame;
using SageFrame.Web.Utilities;
using SageFrame.Web.Common.SEO;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxDetails__AspxItemDetails_ItemDetails : BaseAdministrationUserControl
{
    public string itemSKU;
    public int itemID;
    public string itemName;

    public int storeID,
               portalID,
               UserModuleID,
               customerID,
               minimumItemQuantity,
               maximumItemQuantity,
               maxCompareItemCount,
               relatedItemsCount;

    public bool allowMultipleReviewPerIP, allowMultipleReviewPerUser;
    public string userName, cultureName;
    public string userEmail = string.Empty;
    //public string attributeSetId;
    //public string itemTypeId;
    public string userIP;
    public string countryName = string.Empty;
    public string sessionCode = string.Empty;
    //public string userEmail = string.Empty;
    public string aspxfilePath;

    public string noItemDetailImagePath,
                  enableEmailFriend,
                  allowAnonymousReviewRate,
                  allowOutStockPurchase,
                  allowWishListItemDetail,
                  allowCompareItemDetail;

    public bool IsUseFriendlyUrls = true;
    public string variantQuery = string.Empty;
    public int RatingCount = 0;
    public double AvarageRating = 0.0;
    public int itemTypeId = 0;
    //public string costVariantData = string.Empty;  

    protected void page_init(object sender, EventArgs e)
    {
        // modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        ////This is for Download file Path  
        aspxfilePath = ResolveUrl("~") + "Modules/AspxCommerce/AspxItemsManagement/";

        try
        {
            SageFrameConfig pagebase = new SageFrameConfig();
            IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
            SageFrameRoute parentPage = (SageFrameRoute)this.Page;

            itemSKU = parentPage.Key; //Request.QueryString["itemId"];
            //itemName = "item3"; //Request.QueryString["itemName"];

            if (!IsPostBack)
            {
                storeID = GetStoreID;
                portalID = GetPortalID;
                customerID = GetCustomerID;
                userName = GetUsername;
                cultureName = GetCurrentCultureName;
                variantQuery = Request.QueryString["varId"];
                if (HttpContext.Current.Session.SessionID != null)
                {
                    sessionCode = HttpContext.Current.Session.SessionID.ToString();
                }
                OverRideSEOInfo(itemSKU, storeID, portalID, userName, cultureName);
                userIP = HttpContext.Current.Request.UserHostAddress;
                IPAddressToCountryResolver ipToCountry = new IPAddressToCountryResolver();
                ipToCountry.GetCountry(userIP, out countryName);

                FormsAuthenticationTicket ticket = SecurityPolicy.GetUserTicket(GetPortalID);
                if (ticket != null && ticket.Name != ApplicationKeys.anonymousUser)
                {
                    MembershipController member = new MembershipController();
                    UserInfo userDetail = member.GetUserDetails(GetPortalID, GetUsername);
                    userEmail = userDetail.Email;
                }

                StoreSettingConfig ssc = new StoreSettingConfig();
                noItemDetailImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, storeID, portalID,
                                                                  cultureName);
                enableEmailFriend = ssc.GetStoreSettingsByKey(StoreSetting.EnableEmailAFriend, storeID, portalID,
                                                              cultureName);
                allowAnonymousReviewRate =
                    ssc.GetStoreSettingsByKey(StoreSetting.AllowAnonymousUserToWriteItemRatingAndReviews, storeID,
                                              portalID, cultureName);
                //minimumItemQuantity =
                //    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MinimumItemQuantity, storeID, portalID, cultureName));
                //maximumItemQuantity =
                //    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaximumItemQuantity, storeID, portalID, cultureName));
                allowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, storeID, portalID,
                                                                  cultureName);
                maxCompareItemCount =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, storeID, portalID,
                                                        cultureName));
                relatedItemsCount =
                    int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.NoOfYouMayAlsoLikeItems, storeID, portalID,
                                                        cultureName));
                allowWishListItemDetail = ssc.GetStoreSettingsByKey(StoreSetting.EnableWishList, storeID, portalID,
                                                                    cultureName);
                allowCompareItemDetail = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, storeID, portalID,
                                                                   cultureName);
                allowMultipleReviewPerUser =
                    bool.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AllowMultipleReviewsPerUser, storeID, portalID,
                                                         cultureName));
                allowMultipleReviewPerIP =
                    bool.Parse(ssc.GetStoreSettingsByKey(StoreSetting.AllowMultipleReviewsPerIP, storeID, portalID,
                                                         cultureName));
            }

            if (SageUserModuleID != "")
            {
                UserModuleID = int.Parse(SageUserModuleID);
            }
            else
            {
                UserModuleID = 0;
            }

            InitializeJS();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void OverRideSEOInfo(string itemSKU, int storeID, int portalID, string userName, string cultureName)
    {
        ItemSEOInfo dtItemSEO = GetSEOSettingsBySKU(itemSKU, storeID, portalID, userName, cultureName);
        if (dtItemSEO != null)
        {
            itemID = int.Parse(dtItemSEO.ItemID.ToString());
            itemName = dtItemSEO.Name.ToString();
            string PageTitle = dtItemSEO.MetaTitle.ToString();
            string PageKeyWords = dtItemSEO.MetaKeywords.ToString();
            string PageDescription = dtItemSEO.MetaDescription.ToString();

            if (!string.IsNullOrEmpty(PageTitle))
                SEOHelper.RenderTitle(this.Page, PageTitle, false, true, this.GetPortalID);

            if (!string.IsNullOrEmpty(PageKeyWords))
                SEOHelper.RenderMetaTag(this.Page, "KEYWORDS", PageKeyWords, true);

            if (!string.IsNullOrEmpty(PageDescription))
                SEOHelper.RenderMetaTag(this.Page, "DESCRIPTION", PageDescription, true);
        }
    }

    public ItemSEOInfo GetSEOSettingsBySKU(string itemSKU, int storeID, int portalID, string userName,
                                           string cultureName)
    {
        List<KeyValuePair<string, object>> ParaMeter = new List<KeyValuePair<string, object>>();
        ParaMeter.Add(new KeyValuePair<string, object>("@itemSKU", itemSKU));
        ParaMeter.Add(new KeyValuePair<string, object>("@StoreID", storeID));
        ParaMeter.Add(new KeyValuePair<string, object>("@PortalID", portalID));
        ParaMeter.Add(new KeyValuePair<string, object>("@UserName", userName));
        ParaMeter.Add(new KeyValuePair<string, object>("@CultureName", cultureName));
        SQLHandler sqlH = new SQLHandler();
        return sqlH.ExecuteAsObject<ItemSEOInfo>("usp_Aspx_ItemsSEODetailsBySKU", ParaMeter);
    }

    AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
  
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IncludeCss("ItemDetails", "/Templates/" + TemplateName + "/css/ImageGallery/Slider.css",
                       "/Templates/" + TemplateName + "/css/ImageGallery/multizoom.css",
                       "/Templates/" + TemplateName + "/css/PopUp/style.css",
                       "/Templates/" + TemplateName + "/css/StarRating/jquery.rating.css",
                       "/Templates/" + TemplateName + "/css/JQueryUIFront/jquery-ui.all.css",
                       "/Templates/" + TemplateName + "/css/MessageBox/style.css",
                       "/Templates/" + TemplateName + "/css/FancyDropDown/fancy.css",
                       "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css",
                       "/Templates/" + TemplateName + "/css/Scroll/scrollbars.css",
                       "/Templates/" + TemplateName + "/css/PopUp/popbox.css");

            IncludeJs("ItemDetails", "/js/ImageGallery/jquery.jcarousel.js", "/js/ImageGallery/jquery.mousewheel.js",
                      "/js/JQueryUI/jquery-ui-1.8.10.custom.js",
                      "/js/jDownload/jquery.jdownload.js", "/js/MessageBox/alertbox.js", "/js/DateTime/date.js",
                      "/js/PopUp/custom.js", "/js/FormValidation/jquery.validate.js",
                      "/js/StarRating/jquery.rating.js", "/js/CurrencyFormat/jquery.formatCurrency-1.4.0.js",
                      "/js/CurrencyFormat/jquery.formatCurrency.all.js", 
                      "/Modules/AspxCommerce/DetailsBrowse/js/ItemDetails.js",
                      "/js/PopUp/popbox.js",
                      "/js/FancyDropDown/itemFancyDropdown.js", "/js/jquery.tipsy.js", "/js/Scroll/mwheelIntent.js",
                      "/js/Scroll/jScrollPane.js", "/js/ImageGallery/multizoom.js",
                      "/js/VideoGallery/jquery.youtubepopup.min.js", "/js/jquery.labelify.js");
        }
        aspxCommonObj.UserName = GetUsername;
        aspxCommonObj.PortalID = GetPortalID;
        aspxCommonObj.StoreID = GetStoreID;
        aspxCommonObj.CustomerID = GetCustomerID;
        aspxCommonObj.CultureName = GetCurrentCultureName;
        aspxCommonObj.SessionCode = sessionCode;

        IncludeLanguageJS();
        BindItemQuantityDiscountByUserName(itemSKU);
        GetFormFieldList(itemSKU);
        BindItemAverageRating();
      
    }

    public void BindItemAverageRating()
    {
        int index = 0;
        List<ItemRatingAverageInfo> avgRating = AspxRatingReviewController.GetItemAverageRating(itemSKU, aspxCommonObj);
        StringBuilder ratingBind = new StringBuilder();
        if (avgRating != null && avgRating.Count > 0)
        {
            string script = "$('.cssClassAddYourReview').html('" + getLocale("Write Your Own Review") +
                            "');$('.cssClassItemRatingBox').addClass('cssClassToolTip');";
            string rating = "<div class=\"cssClassToolTipInfo\">",
                starrating = "<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" id=\"tblAverageRating\">";
            foreach (ItemRatingAverageInfo item in avgRating)
            {
                if (index == 0)
                {
                    string spt = "$('.cssClassTotalReviews').html('" + getLocale("Read Reviews") + "[" +
                                              item.TotalReviewsCount + "]" + "');";
                    RatingCount = item.TotalReviewsCount;
                    AvarageRating = (double)item.TotalRatingAverage;
                  starrating+=  BindStarRating((double)item.TotalRatingAverage, script, spt);
                }
                index++;
              rating+= BindViewDetailsRatingInfo(item.ItemRatingCriteriaID, item.ItemRatingCriteria,
                                          (double)item.RatingCriteriaAverage);
            }
            starrating += "</table>";
            rating += "</div>";
            rating += GetScriptRun("$('input.star').rating();");
            starrating+=GetScriptRun(ratingScript);
            ltrRatings.Text = starrating;
            //ratingBind.Append(GetScriptRun(script));
            ltrratingDetails.Text = rating;
        }
        else
        {
            ratingBind.Append("<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" id=\"tblAverageRating\"><tr><td>" + getLocale("Currently there are no reviews") + "</td></tr></table>");
            string script = "$('.cssClassItemRatingBox').removeClass('cssClassToolTip');$('.cssClassSeparator').hide();$('.cssClassAddYourReview').html('" +
                                         getLocale("Be the first to review this item.") + "');";
            ratingBind.Append(GetScriptRun(script));
            ltrRatings.Text = ratingBind.ToString();
          
        }
    }

    private string ratingScript = "";
                   
    public string BindStarRating(double totalTatingAvg, string spt, string sp)
    {
        StringBuilder ratingStars = new StringBuilder();
        //ratingStars.Append(
        //    "<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" id=\"tblAverageRating\">");
        string[] ratingTitle = {
                                   getLocale("Worst"), getLocale("Ugly"), getLocale("Bad"), getLocale("Not Bad"),
                                   getLocale("Average"), getLocale("OK"), getLocale("Nice"), getLocale("Good"),
                                   getLocale("Best"), getLocale("Excellent")
                               }; //To do here tooltip for each half star}
        double[] ratingText = { 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 };
        int i = 0;
        //string script = "";
        ratingStars.Append("<tr><td>");
        for (i = 0; i < 10; i++)
        {
            if (totalTatingAvg == ratingText[i])
            {
                ratingStars.Append(
                    "<input name=\"avgItemRating\" type=\"radio\" class=\"star {split:2}\" disabled=\"disabled\" checked=\"checked\" value=" +
                    ratingTitle[i] + " />");
                ratingScript += "$('.cssClassRatingTitle').html('" + ratingTitle[i] + "');";
            }
            else
            {
                ratingStars.Append(
                    "<input name=\"avgItemRating\" type=\"radio\" class=\"star {split:2}\" disabled=\"disabled\" value=" +
                    ratingTitle[i] + " />");
            }
        }
        ratingStars.Append("</td></tr>");
        //ratingStars.Append("</table>");
        ratingStars.Append(GetScriptRun(spt+sp));
      //  ratingStars.Append(sp);
       // ratingStars.Append(script);
       return ratingStars.ToString();
    }

    public string BindViewDetailsRatingInfo(int itemRatingCriteriaId, string itemRatingCriteriaNm, double ratingAvg)
    {
        StringBuilder ratingStarsDetailsInfo = new StringBuilder();
        string[] ratingTitle1 = {
                                    getLocale("Worst"), getLocale("Ugly"), getLocale("Bad"), getLocale("Not Bad"),
                                    getLocale("Average"), getLocale("OK"), getLocale("Nice"), getLocale("Good"),
                                    getLocale("Best"), getLocale("Excellent")
                                }; //To do here tooltip for each half star}
        double[] ratingText1 = { 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 };
        int i = 0;
       // ratingStarsDetailsInfo.Append("<div class=\"cssClassToolTipInfo\">");
        ratingStarsDetailsInfo.Append("<div class=\"cssClassToolTipDetailInfo\">");
        ratingStarsDetailsInfo.Append("<span class=\"cssClassCriteriaTitle\">" + itemRatingCriteriaNm + ": </span>");
        for (i = 0; i < 10; i++)
        {
            if (ratingAvg == ratingText1[i])
            {
                ratingStarsDetailsInfo.Append("<input name=\"avgItemDetailRating" + itemRatingCriteriaId +
                                              "\" type=\"radio\" class=\"star {split:2}\" disabled=\"disabled\" checked=\"checked\" value=" +
                                              ratingTitle1[i] + " />");
            }
            else
            {
                ratingStarsDetailsInfo.Append("<input name=\"avgItemDetailRating" + itemRatingCriteriaId +
                                              "\" type=\"radio\" class=\"star {split:2}\" disabled=\"disabled\" value=" +
                                              ratingTitle1[i] + " />");
            }
        }
        ratingStarsDetailsInfo.Append("</div>");
       return ratingStarsDetailsInfo.ToString();
    }

    private class test
    {
        public int key { get; set; }
        public string value { get; set; }
        public string html { get; set; }
    }

    private Hashtable hst = null;

    public void GetFormFieldList(string itemSKU)
    {
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        List<test> arrList = new List<test>();
        int attributeSetId = 0;
        int index = 0;
        List<AttributeFormInfo> frmItemFieldList = AspxItemMgntController.GetItemFormAttributesByItemSKUOnly(itemSKU,
                                                                                                               aspxCommonObj);
       StringBuilder dynHtml = new StringBuilder();
        foreach (AttributeFormInfo item in frmItemFieldList)
        {
            bool isGroupExist = false;
            dynHtml = new StringBuilder();
            if (index == 0)
            {
                attributeSetId = (int)item.AttributeSetID;
                itemTypeId = (int)item.ItemTypeID;
            }
            index++;
            test t = new test();
            t.key = (int)item.GroupID;
            t.value = item.GroupName;
            t.html = "";
            foreach (test tt in arrList)
            {
                if (tt.key == item.GroupID)
                {
                    isGroupExist = true;
                    break;
                }
            }
            if (!isGroupExist)
            {
                if ((item.ItemTypeID == 2 || item.ItemTypeID==3) && item.GroupID == 11)
                {
                }
                else
                {
                    arrList.Add(t);
                }
            }
            StringBuilder tr = new StringBuilder();
            if ((item.ItemTypeID == 2 ||item.ItemTypeID==3) && item.AttributeID == 32 && item.AttributeID == 33 && item.AttributeID == 34)
            {
            }
            else
            {
                tr.Append("<tr><td class=\"cssClassTableLeftCol\"><label class=\"cssClassLabel\">" + item.AttributeName +
                          ": </label></td>");
                tr.Append("<td><div id=\"" + item.AttributeID + "_" + item.InputTypeID + "_" + item.ValidationTypeID +
                          "_" + item.IsRequired + "_" + item.GroupID + "_" + item.IsIncludeInPriceRule + "_" +
                          item.IsIncludeInPromotions + "_" + item.DisplayOrder + "\" name=\"" + item.AttributeID + "_" +
                          item.InputTypeID + "_" + item.ValidationTypeID + "_" + item.IsRequired + "_" +
                          item.GroupID + "_" + item.IsIncludeInPriceRule + "_" + item.IsIncludeInPromotions +
                          "_" + item.DisplayOrder + "\" title=\"" + item.ToolTip + "\">");
                tr.Append("</div></td>");
                tr.Append("</tr>");
            }
            foreach (test ttt in arrList)
            {
                if (ttt.key == item.GroupID)
                {
                    ttt.html += tr;
                }

            }

            StringBuilder itemTabs = new StringBuilder();
            StringBuilder tabBody = new StringBuilder();
            dynHtml.Append("<div id=\"dynItemDetailsForm\" class=\"sfFormwrapper\" style=\"display:none\">");
            dynHtml.Append("<div class=\"cssClassTabPanelTable\">");
            dynHtml.Append(
                "<div id=\"ItemDetails_TabContainer\" class=\"cssClassTabpanelContent cssClassTabTopBorder\">");
            dynHtml.Append("<ul>");
            for (var i = 0; i < arrList.Count; i++)
            {
                itemTabs.Append("<li><a href=\"#ItemTab-" + arrList[i].key + "\"><span>" + arrList[i].value +
                                "</span></a></li>");
                tabBody.Append("<div id=\"ItemTab-" + arrList[i].key +
                               "\"><div class=\"scroll-pane\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" +
                               arrList[i].html + "</table></div></div>");
            }
            itemTabs.Append("<li><a href=\"#ItemTab-Tags\"><span>" + getLocale("Tags") + "</span></a></li>");
            StringBuilder itemTagsBody = new StringBuilder();
            itemTagsBody.Append("<div class=\"cssClassPopularItemTags\"><strong>" + getLocale("Popular Tags:") +
                                "</strong><div id=\"divItemTags\" class=\"cssClassPopular-Itemstags\"></div>");

            if (GetCustomerID > 0 && GetUsername.ToLower() != "anonymoususer")
            {
                itemTagsBody.Append("<strong>" + getLocale("My Tags:") +
                                    "</strong><div id=\"divMyTags\" class=\"cssClassMyTags\"></div>");
                itemTagsBody.Append("<table id=\"AddTagTable\"><tr><td>");
                itemTagsBody.Append("<input type=\"text\" class=\"classTag\" maxlength=\"20\"/>");
                itemTagsBody.Append("<button class=\"cssClassDecrease\" type=\"button\"><span>-</span></button>");
                itemTagsBody.Append("<button class=\"cssClassIncrease\" type=\"button\"><span>+</span></button>");
                itemTagsBody.Append("</td></tr></table>");
                itemTagsBody.Append(
                    "<div class=\"sfButtonwrapper\"><button type=\"button\" id=\"btnTagSubmit\"><span><span>" +
                    getLocale("Add Tag") + "</span></span></button></div>");
                //Else Show Please log in link
            }
            else
            {
                SageFrameConfig sfConfig = new SageFrameConfig();
                itemTagsBody.Append("<a href=\"" + aspxRedirectPath + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalLoginpage) + pageExtension + "?ReturnUrl=" +
                                    aspxRedirectPath + "item/" + itemSKU + pageExtension +
                                    "\" class=\"cssClassLogIn\"><span>" +
                                    getLocale("Sign in to enter tags") + "</span></a>");
            }
            itemTagsBody.Append("</div>");
            tabBody.Append(
                "<div  id=\"ItemTab-Tags\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td>" +
                itemTagsBody + "</td></tr></table></div>");

            itemTabs.Append("<li><a href=\"#ItemTab-Reviews\"><span>" + getLocale("Ratings & Reviews") +
                            " </span></a></li>");
            tabBody.Append(
                "<div id=\"ItemTab-Reviews\"><table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" id=\"tblRatingPerUser\"><tr><td></td></tr></table>");
            ////Paging Parts here
            tabBody.Append
                ("<div class=\"cssClassPageNumber\" id=\"divSearchPageNumber\"><div class=\"cssClassPageNumberMidBg\">");
            tabBody.Append("<div id=\"Pagination\"></div><div class=\"cssClassViewPerPage\">" +
                           getLocale("View Per Page:") +
                           "<select id=\"ddlPageSize\" class=\"sfListmenu\">");
            tabBody.Append(
                "<option value=\"5\">5</option><option value=\"10\">10</option><option value=\"15\">15</option><option value=\"20\">20</option><option value=\"25\">25</option><option value=\"40\">40</option></select></div>");
            tabBody.Append("</div></div></div>");

            itemTabs.Append("<li style=\"display:none\"><a href=\"#ItemVideos\"><span>" + getLocale("Videos") + " </span></a></li>");
            tabBody.Append("<div id=\"ItemVideos\" style=\"display:none\"></div>");
            ////Item videos end here
            dynHtml.Append(itemTabs);
            dynHtml.Append("</ul>");
            dynHtml.Append(tabBody);
            dynHtml.Append("</div></div></div>");
        }
        if (itemSKU.Length > 0)
        {
            string script = BindDataInTab(itemSKU, attributeSetId, itemTypeId); 
            string tagBind = "";
            if (GetCustomerID > 0 && GetUsername.ToLower() != "anonymoususer")
            {
                tagBind = GetItemTags(itemSKU);
            }
            dynHtml.Append(script);
            if (GetCustomerID > 0 && GetUsername.ToLower() != "anonymoususer")
            {
                dynHtml.Append(tagBind);
            }
            ltrItemDetailsForm.Text = dynHtml.ToString();
        }

    }
    public string GetItemTags(string sku)
    {
        string itemTags = string.Empty;
        string tagNames = string.Empty;
        string myTags = string.Empty;
        string userTags = string.Empty;
        StringBuilder bindTag = new StringBuilder();
        List<ItemTagsInfo> lstItemTags = AspxTagsController.GetItemTags(itemSKU, aspxCommonObj);
        foreach (ItemTagsInfo item in lstItemTags)
        {
            if (tagNames.IndexOf(item.Tag) == -1)
            {
                itemTags += item.Tag + "(" + item.TagCount + "), ";
                tagNames += item.Tag;
            }

            if (item.AddedBy == GetUsername)
            {
                if (userTags.IndexOf(item.Tag) == -1)
                {
                    myTags += item.Tag + "<button type=\"button\" class=\"cssClassCross\" value=" + item.ItemTagID +
                              " onclick =ItemDetail.DeleteMyTag(this)><span>" + getLocale("x") + "</span></button>, ";
                    userTags += item.Tag;
                }
            }

            bindTag.Append("$('#divItemTags').html('" + itemTags.Substring(0, itemTags.Length - 2) +"');");
            if (myTags.Length > 2)
            {
                bindTag.Append("$('#divMyTags').html('" + myTags.Substring(0, myTags.Length - 2) + "');");
            }
        }
        string tag = GetScriptRun( bindTag.ToString());
        return tag;
    }

    public string BindDataInTab(string sku, int attrId, int itemTypeId)
    {
        List<AttributeFormInfo> frmItemAttributes = AspxItemMgntController.GetItemDetailsInfoByItemSKU(itemSKU, attrId,
                                                                                                       itemTypeId,
                                                                                                       aspxCommonObj);
        StringBuilder scriptBuilder = new StringBuilder();

        foreach (AttributeFormInfo item in frmItemAttributes)
        {
            string id = item.AttributeID + "_" + item.InputTypeID + "_" + item.ValidationTypeID + "_" + item.IsRequired +
                        "_" + item.GroupID
                        + "_" + item.IsIncludeInPriceRule + "_" + item.IsIncludeInPromotions + "_" + item.DisplayOrder;
            switch (item.InputTypeID)
            {
                case 1:
                    //TextField
                    if (item.ValidationTypeID == 3)
                    {
                        if(item.DecimalValue!="")
                        {
                            scriptBuilder.Append(" $('#" + id + "').html('" +Math.Round(decimal.Parse(item.DecimalValue),2).ToString() + "');");
                        }
                        else
                             scriptBuilder.Append(" $('#" + id + "').html('" + item.DecimalValue + "');");
                       
                        break;
                    }
                    else if (item.ValidationTypeID == 5)
                    {
                        scriptBuilder.Append(" $('#" + id + "').html('" + item.IntValue + "');");
                        break;
                    }
                    else
                    {
                     //   scriptBuilder.Append(" $('#" + id + "').html(unescape('" + item.NvarcharValue + "'));");

                        scriptBuilder.Append(" $(\"#" + id + "\").html(\"" + item.NvarcharValue + "\");");
                        break;
                    }
                case 2:
                    //TextArea
                    scriptBuilder.Append(" $('#" + id + "').html(Encoder.htmlDecode('" + item.TextValue + "'));");
                    break;
                case 3:
                    //Date
                    scriptBuilder.Append(" $('#" + id + "').html('" +Format_The_Date(item.DateValue) + "');");
                    break;
                case 4:
                    //Boolean
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.BooleanValue + "');");
                    break;
                case 5:
                    //MultipleSelect
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.OptionValues + "');");
                    break;
                case 6:
                    //DropDown
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.OptionValues + "');");
                    break;
                case 7:
                    //Price
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.DecimalValue + "');");
                    break;
                case 8:
                    //File 
                    scriptBuilder.Append("var div = $('#" + id + "');");
                    scriptBuilder.Append("var filePath = '" + item.FileValue + "';");
                    scriptBuilder.Append("var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);");
                    scriptBuilder.Append("if (filePath != '') {");
                    scriptBuilder.Append("var fileExt = (-1 !== filePath.indexOf('.')) ? filePath.replace(/.*[.]/, '') : '';");
                    scriptBuilder.Append("myregexp = new RegExp('(jpg|jpeg|jpe|gif|bmp|png|ico)', 'i');");
                    scriptBuilder.Append("if (myregexp.test(fileExt)) {");
                    scriptBuilder.Append("$(div).append('<span class=\"response\"><img src=' + aspxRootPath + filePath + ' class=\"uploadImage\" /></span>')");
                    scriptBuilder.Append("} else {");

                    scriptBuilder.Append("$(div).append('<span class=\"response\"><span id=\"spanFileUpload\"  class=\"cssClassLink\"  href=' + 'uploads/' + fileName + '>' + fileName + '</span></span>');");
                    scriptBuilder.Append("}");
                    scriptBuilder.Append("}");
                    break;
                case 9:
                    //Radio
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.OptionValues + "');");
                    break;
                case 10:
                    //RadioButtonList
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.OptionValues + "');");
                    break;
                case 11:
                    //CheckBox
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.OptionValues + "');");
                    break;
                case 12:
                    //CheckBoxList
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.OptionValues + "');");
                    break;
                case 13:
                    //Password
                    scriptBuilder.Append(" $('#" + id + "').html('" + item.NvarcharValue + "');");
                    break;
            }
        }
        string spt = GetScriptRun( scriptBuilder.ToString());
        return spt;
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
    public string Format_The_Date(string input)
    {
        string dt;
        DateTime strDate = DateTime.Parse(input);
        dt = strDate.ToString("yyyy/MM/dd");//Specify Format you want the O/P as...
        return dt;
    }

    public void BindItemQuantityDiscountByUserName(string sku)
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

        List<ItemQuantityDiscountInfo> lstIQtyDiscount =
            AspxQtyDiscountMgntController.GetItemQuantityDiscountByUserName(aspxCommonObj, itemSKU);
        StringBuilder QtyDiscount = new StringBuilder();
        if (lstIQtyDiscount != null && lstIQtyDiscount.Count > 0)
        {
            QtyDiscount.Append("<div class=\"cssClassCommonGrid\">");
            QtyDiscount.Append("<p class=\"sfLocale\">Item Quantity Discount:</p>");
            QtyDiscount.Append("<table id=\"itemQtyDiscount\">");
            QtyDiscount.Append("<thead>");
            QtyDiscount.Append(
                "<tr class=\"cssClassHeadeTitle\"><th class=\"sfLocale\">Quantity (more than)</th><th class=\"sfLocale\">Price Per Unit</th></tr>");
            QtyDiscount.Append("</thead><tbody>");
            foreach (ItemQuantityDiscountInfo item in lstIQtyDiscount)
            {
                QtyDiscount.Append("<tr><td>" +Convert.ToInt32(item.Quantity) + "</td><td><span class='cssClassFormatCurrency'>" +
                                   (item.Price * rate) + "</span></td></tr>");
            }
            QtyDiscount.Append("</tbody></table>");
            QtyDiscount.Append("</div>");
            litQtyDiscount.Text = QtyDiscount.ToString();
        }
        else
        {
            string script = GetScriptRun("$('#bulkDiscount,#divQtyDiscount').hide();");
            litQtyDiscount.Text = script;
        }
    }

    private string GetScriptRun(string code)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<script type=\"text/javascript\">$(document).ready(function(){setTimeout(function(){ " + code +
                  "},500); });</script>");
        return sb.ToString();
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
        Page.ClientScript.RegisterClientScriptInclude("pack", ResolveUrl("~/js/StarRating/jquery.rating.pack.js"));
        Page.ClientScript.RegisterClientScriptInclude("metadata", ResolveUrl("~/js/StarRating/jquery.MetaData.js"));
        Page.ClientScript.RegisterClientScriptInclude("Paging", ResolveUrl("~/js/Paging/jquery.pagination.js"));
    }
}
