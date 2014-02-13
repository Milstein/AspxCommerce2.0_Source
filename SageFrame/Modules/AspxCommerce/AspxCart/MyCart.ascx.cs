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
using System.Text;
using System.Web;
using AspxCommerce.RewardPoints;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class MyCart : BaseAdministrationUserControl
{

    public int StoreID, PortalID, CustomerID, MinimumItemQuantity, MaximumItemQuantity;
    public string UserName, CultureName;
    public string SessionCode = string.Empty;
    public string NoImageMyCartPath, AllowMultipleAddShipping, ShowItemImagesOnCart, MinCartSubTotalAmount, AllowOutStockPurchase, MultipleAddressChkOutURL;
    public bool IsUseFriendlyUrls = true;
    private AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
    public decimal rate=1;
    protected void page_init(object sender, EventArgs e)
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
        //// Stop Caching in IE
        //Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);  
        //// Stop Caching in Firefox
        //Response.Cache.SetNoStore();

        HttpContext.Current.Response.Cache.SetAllowResponseInBrowserHistory(false);
        HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        HttpContext.Current.Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.Now);
        Response.Cache.SetValidUntilExpires(true);
        StoreID = GetStoreID;
        PortalID = GetPortalID;
        UserName = GetUsername;
        CustomerID = GetCustomerID;
        CultureName = GetCurrentCultureName;
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
        try
        {   
            SageFrameConfig pagebase = new SageFrameConfig();
            IsUseFriendlyUrls = pagebase.GetSettingBollByKey(SageFrameSettingKeys.UseFriendlyUrls);
     
            if (HttpContext.Current.Session.SessionID != null)
            {
                SessionCode = HttpContext.Current.Session.SessionID.ToString();
            }
            if (!IsPostBack)
            {
                IncludeCss("MyCart", "/Templates/" + TemplateName + "/css/GridView/tablesort.css",
                           "/Templates/" + TemplateName + "/css/MessageBox/style.css",
                           "/Templates/" + TemplateName + "/css/ToolTip/tooltip.css");
                IncludeJs("MyCart", "/js/MessageBox/alertbox.js", "/js/MessageBox/jquery.easing.1.3.js",
                          "/Modules/AspxCommerce/AspxCart/js/MyCart.js", "/js/jquery.tipsy.js");

                aspxCommonObj.StoreID = StoreID;
                aspxCommonObj.PortalID = PortalID;
                aspxCommonObj.UserName = UserName;
                aspxCommonObj.CultureName = CultureName;
                aspxCommonObj.SessionCode = SessionCode;
                aspxCommonObj.CustomerID = CustomerID;
                NoImageMyCartPath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID,
                                                              CultureName);
                AllowMultipleAddShipping = ssc.GetStoreSettingsByKey(StoreSetting.AllowMultipleShippingAddress, StoreID,
                                                                     PortalID, CultureName);
                ShowItemImagesOnCart = ssc.GetStoreSettingsByKey(StoreSetting.ShowItemImagesInCart, StoreID, PortalID,
                                                                 CultureName);
                MinCartSubTotalAmount = ssc.GetStoreSettingsByKey(StoreSetting.MinimumCartSubTotalAmount, StoreID,
                                                                  PortalID, CultureName);
                // MinimumItemQuantity = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MinimumItemQuantity, StoreID, PortalID, CultureName));
                // MaximumItemQuantity = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaximumItemQuantity, StoreID, PortalID, CultureName));
                AllowOutStockPurchase = ssc.GetStoreSettingsByKey(StoreSetting.AllowOutStockPurchase, StoreID, PortalID,
                                                                  CultureName);
                MultipleAddressChkOutURL = ssc.GetStoreSettingsByKey(StoreSetting.MultiCheckOutURL, StoreID, PortalID,
                                                                     CultureName);

            }
            DisplayCartItems();
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
    Hashtable hst = null;
    private string getLocale(string messageKey)
    {
        string retStr = messageKey;
        if (hst != null && hst[messageKey] != null)
        {
            retStr = hst[messageKey].ToString();
        }
        return retStr;
    }


    private void DisplayCartItems()
    {
       
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        string pageExtension = SageFrameSettingKeys.PageExtension;
        string aspxTemplateFolderPath = ResolveUrl("~/") + "Templates/" + TemplateName;
        string aspxRootPath = ResolveUrl("~/");
       
        double arrRewardtotalPrice = 0;
        string arrRewardDetails = "";
        string arrRewardSub = "";

       
        List<CartInfo> itemsList = LoadCartItems();
        StringBuilder scriptBuilder_root = new StringBuilder();
        StringBuilder cartItemList = new StringBuilder();
        if (itemsList.Count > 0)
        {

            cartItemList.Append(
                GetStringScript(
                    " $('.cssClassSubTotalAmount,.cssClassLeftRightBtn,.cssClassapplycoupon,.cssClassBlueBtnWrapper').show();"));
            cartItemList.Append(
                "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" id=\"tblCartList\">");
            cartItemList.Append("<tbody><tr class=\"cssClassHeadeTitle\" >");
            cartItemList.Append("<td class=\"cssClassSN\">Sn.");
            if (ShowItemImagesOnCart.ToLower() == "true")
            {
                cartItemList.Append("</td><td class=\"cssClassItemImageWidth\">");
                cartItemList.Append(getLocale("Item Description"));
            }
            cartItemList.Append("</td><td>");
            //cartItemList.Append(getLocale("Description"));
            //cartItemList.Append("</td>");
            //cartItemList.Append("<td>");
            cartItemList.Append(getLocale("Variants"));
            cartItemList.Append("</td>");
            cartItemList.Append("<td class=\"cssClassQTY\">");
            cartItemList.Append(getLocale("Qty"));
            cartItemList.Append("</td>");
            cartItemList.Append("<td class=\"cssClassTimes\">");
            cartItemList.Append(getLocale("X"));
            cartItemList.Append("</td>");
            cartItemList.Append("<td class=\"cssClassItemPrice\">");
            cartItemList.Append(getLocale("Unit Price"));
            cartItemList.Append("</td>");
            cartItemList.Append("<td class=\"cssClassEquals\">");
            cartItemList.Append("=");
            cartItemList.Append("</td>");
            cartItemList.Append("<td class=\"cssClassSubTotal\">");
            cartItemList.Append(getLocale("Line Total"));
            cartItemList.Append("</td>");
            //                        cartHeading += '<td class="cssClassTaxRate">';
            //                        cartHeading += 'Unit Tax';
            //                        cartHeading += '</td>';
            //                    cartHeading += '<td>';
            //                    cartHeading += 'Remark';
            //                    cartHeading += '</td>';
            cartItemList.Append("<td class=\"cssClassAction\">");
            cartItemList.Append(getLocale("Action"));
            cartItemList.Append("</td>");
            cartItemList.Append(" </tr>");

            //$("#divCartDetails").html(cartHeading);

            List<BasketItem> basketItems = new List<BasketItem>();
            int index = 0;

            string bsketItems = "";
            bsketItems += "[";
      
          
            foreach (CartInfo item in itemsList)
            {
                //for realtime shipping rate calculation
                //for realtime shipping rate calculation
                if (item.ItemTypeID == 1)
                {
                    string bitems = "{" +
                                    string.Format(
                                        "\'Height\':'{0}',\'ItemName\':'{1}',\'Length\':'{2}',\'Quantity\':'{3}',\'WeightValue\':'{4}',\'Width\':'{5}'",
                                        item.Height ?? 0, item.ItemName,
                                        item.Length ?? 0, item.Quantity.ToString(),
                                        decimal.Parse(item.Weight.ToString()), item.Width ?? 0
                                        )

                                    + "},";
                    bsketItems += bitems;

                }

                index = index + 1;
                string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                if (item.ImagePath == "")
                {
                    imagePath = NoImageMyCartPath;
                }
                else if (item.AlternateText == "")
                {
                    item.AlternateText = item.ItemName;
                }




                cartItemList.Append("<tr >");
                cartItemList.Append("<td>");
                cartItemList.Append("<b>" + index + "." + "</b>");
                ;
                cartItemList.Append("</td>");
                if (ShowItemImagesOnCart.ToLower() == "true")
                {
                    cartItemList.Append("<td>");
                    cartItemList.Append("<p class=\"cssClassCartPicture\">");
                    cartItemList.Append("<img src='" + aspxRootPath +
                                        imagePath.Replace("uploads", "uploads/Small") + "'  alt=\"" +
                                        item.AlternateText + "\" title=\"" + item.AlternateText + "\" ></p>");
                    // cartItemList.Append("</td>");
                }
                // cartItemList.Append("<td>");
                cartItemList.Append("<div class=\"cssClassCartPictureInformation\">");
                cartItemList.Append("<h3>");
                if (item.CostVariantsValueIDs != "")
                {
                    cartItemList.Append("<a href=\"item/" + item.SKU + pageExtension + "?varId=" +
                                      item.CostVariantsValueIDs + "\"  costvariants=\"" + item.CostVariants +
                                      "\" onclick=\"AspxCart.SetCostVartSession(this);\" >" + item.ItemName +
                                      "</a></h3>");
                }
                else
                {
                    cartItemList.Append("<a href=\"item/" + item.SKU + pageExtension + "\" costvariants=\"" +
                                        item.CostVariants +
                                        "\" onclick=\"AspxCart.SetCostVartSession(this);\" >" + item.ItemName +
                                        "</a></h3>");
                    //cartItemList.Append("<a href="item/' + value.SKU + pageExtension + '"  costvariants="' + value.CostVariants + '" onclick=AspxCart.SetCostVartSession(this);>' + value.ItemName + ' </a></h3>");
                }
                // cartItemList.Append("<p>");
                //cartElements += '<textarea  id="itemDescription" readonly="readonly" style="width: 153px; height: 75px;">' + Encoder.htmlDecode(value.ShortDescription) + '</textarea>';
                // cartItemList.Append(HttpUtility.HtmlEncode(item.ShortDescription));
                //  cartItemList.Append("</p>");
                cartItemList.Append("</div>");
                cartItemList.Append("</td>");
                cartItemList.Append("<td class=\"row-variants\">");
                cartItemList.Append(item.CostVariants);
                cartItemList.Append("</td>");
                cartItemList.Append("<td class=\"cssClassQTYInput\">");
                cartItemList.Append("<input class=\"num-pallets-input\" autocomplete=\"off\" price=\"" +
                                    Math.Round(double.Parse((item.Price * rate).ToString()), 2).ToString() +
                                    "\" id=\"txtQuantity_" + item.CartItemID + "\" type=\"text\" cartID=\"" +
                                    item.CartID +
                                    "\" value=\"" + item.Quantity + "\" quantityInCart=\"" + item.Quantity +
                                    "\" actualQty=\"" + item.ItemQuantity + "\" costVariantID=\"" +
                                    item.CostVariantsValueIDs + "\" itemID=\"" + item.ItemID + "\" addedValue=\"" +
                                    item.Quantity + "\">");
                cartItemList.Append("<label class=\"lblNotification\" style=\"color: #FF0000;\"></label></td>");
                cartItemList.Append("<td class=\"cssClassTimes\">");
                cartItemList.Append(" X");
                cartItemList.Append("</td>");
                cartItemList.Append("<td class=\"price-per-pallet\">");
                cartItemList.Append(
                    "<span class=\"cssClassFormatCurrency\">" +
                    Math.Round(double.Parse((item.Price * rate).ToString()), 2).ToString() + "</span>");
                cartItemList.Append("</td>");
                cartItemList.Append("<td class=\"cssClassEquals\">");
                cartItemList.Append("=");
                cartItemList.Append("</td>");
                cartItemList.Append("<td class=\"row-total\">");
                cartItemList.Append("<input class=\"row-total-input cssClassFormatCurrency\" autocomplete=\"off\" id=\"txtRowTotal_" +
                                    item.CartID + "\" value=\"" +
                                    Math.Round(double.Parse((item.TotalItemCost * rate).ToString()), 2).ToString() +
                                    "\"  readonly=\"readonly\" type=\"text\" />");
                cartItemList.Append("</td>");
                //                            cartElements += '<td class="row-taxRate">';
                //                            cartElements += '<span class="cssClassFormatCurrency">' + (value.TaxRateValue * rate).toFixed(2) + '</span>';
                //                            cartElements += '</td>';
                //                        cartElements += '<td class="rowremark">';
                //                        cartElements += '' + value.Remarks + '';
                //                        cartElements += '</td>';
                cartItemList.Append("<td>");
                cartItemList.Append(" <img class=\"ClassDeleteCartItems\" src=\"" + aspxTemplateFolderPath +
                                    "/images/admin/btndelete.png\" alt=\"Delete\" title=\"Delete\" value=\"" +
                                    item.CartItemID + "\" cartID=\"" + item.CartID + "\"/>");
                cartItemList.Append("</td>");
                cartItemList.Append("</tr>");
                //AspxCart.Vars.CartID = value.CartID;

                arrRewardtotalPrice += Math.Round(double.Parse((item.Price * item.Quantity ).ToString()), 2);

                arrRewardSub += "'<li>'+ " + item.Quantity + "+'X' +eval(" + (item.Price ) +
                                "* rewardRate).toFixed(2)+ '</li>'+";
                arrRewardDetails += "'<li><b>'+eval( " + (item.TotalItemCost ) +
                                    "* rewardRate).toFixed(2)+ '</b> "+getLocale("Points for Product:") + item.ItemName +
                                    "&nbsp &nbsp</li>'+";

                if (index == itemsList.Count)
                {

                    StringBuilder scriptBuilder = new StringBuilder();

                    scriptBuilder.Append("AspxCart.Vars.CartID =" + item.CartID + ";");
                    scriptBuilder.Append(" var rewardRate = parseFloat($('#hdnRewardRate').val());");
                    scriptBuilder.Append("var arrRewardDetails =" +
                                         arrRewardDetails.Substring(0, arrRewardDetails.Length - 1) + ";");
                    scriptBuilder.Append("var  arrRewardSub =" + arrRewardSub.Substring(0, arrRewardSub.Length - 1) +
                                         ";");
                    scriptBuilder.Append("if (isPurchaseActive == true){");
                    scriptBuilder.Append("$('#dvPointsTotal').empty(); $('#ulRewardDetails').html(arrRewardDetails);");
                    scriptBuilder.Append("$('#ulRewardSub').html(arrRewardSub);");
                    scriptBuilder.Append("$('#dvPointsTotal').append(eval(" + arrRewardtotalPrice +" * rewardRate).toFixed(2));");

                    scriptBuilder.Append("} ");
                    scriptBuilder.Append("AspxCart.GetDiscountCartPriceRule(AspxCart.Vars.CartID, 0);");
                    scriptBuilder.Append("$('#tblCartList tr:even ').addClass('sfEven');");
                    scriptBuilder.Append("$('#tblCartList tr:odd ').addClass('sfOdd');");
                    scriptBuilder.Append("$('.cssClassCartPicture img[title]').tipsy({ gravity: 'n' });");
                    scriptBuilder.Append("AspxCart.BindCartFunctions();");
                    bsketItems = bsketItems.Substring(0, bsketItems.Length - 1);
                    bsketItems += "]";
                    scriptBuilder.Append(" AspxCart.SetBasketItems(eval(\"" + bsketItems + "\"));");
      
                    // string scripttoExecute = GetStringScript(scriptBuilder.ToString());
                    scriptBuilder_root.Append(scriptBuilder.ToString());

                }

            }
            cartItemList.Append("</table>");

            // cartItemList.Append(scriptBuilder_root.ToString());
            //string jsFx = BindJsFunctions();
            //string script = GetStringScript(jsFx);
            //cartItemList.Append(script);
           
            string rewardScript = LoadRewardPoints();
            scriptBuilder_root.Append(rewardScript);
            //scriptBuilder_root.Append(GetDiscount());
            scriptBuilder_root.Append("if (isPurchaseActive == true){");
            scriptBuilder_root.Append(" var rewardRate = parseFloat($('#hdnRewardRate').val());");
            scriptBuilder_root.Append("var arrRewardDetails =" +
                                 arrRewardDetails.Substring(0, arrRewardDetails.Length - 1) + ";");
            scriptBuilder_root.Append("var  arrRewardSub =" + arrRewardSub.Substring(0, arrRewardSub.Length - 1) +
                                 ";");
            scriptBuilder_root.Append("$('#dvPointsTotal').empty(); $('#ulRewardDetails').html(arrRewardDetails);");
            scriptBuilder_root.Append("$('#ulRewardSub').html(arrRewardSub);");
            scriptBuilder_root.Append("$('#dvPointsTotal').append(eval(" + arrRewardtotalPrice + " * rewardRate).toFixed(2));");

            scriptBuilder_root.Append("} ");
            string script = GetStringScript(scriptBuilder_root.ToString());
            cartItemList.Append(script);
            ltCartItems.Text = cartItemList.ToString();
        }
        else
        {
            StringBuilder scriptBuilder = new StringBuilder();
            scriptBuilder.Append(
                "AspxCart.ResetCouponSession('CouponCode,DiscountAmount,CouponApplied,CouponSessionAmount,CouponDiscountAmount,IsCouponInPercent,CouponPercentValue,CouponSessionPercentAmount');");

            scriptBuilder.Append("$('.cssClassCartInformation').html('<span class=\"cssClassNotFound\">" +
                                 getLocale("Your cart is empty!") + "</span>');");
            string script = GetStringScript(scriptBuilder.ToString());
            ltCartItems.Text = script;

        }
    }

    private string GetDiscount()
    {

        decimal qtyDiscount = AspxCartController.GetDiscountQuantityAmount(aspxCommonObj);
        return "var asdf={};asdf.d=" + qtyDiscount + ";AspxCart.SetDiscountQuantityAmount(asdf);";
    }

    private string LoadRewardPoints()
    {
         
        StoreSettingConfig ssc = new StoreSettingConfig();
        bool isEnableRewardPoint = true;
        //ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, storeID, portalID, cultureName);


        if (isEnableRewardPoint)
        {
            List<GeneralSettingInfo> lstGeneralSet = RewardPointsController.GetGeneralSetting(aspxCommonObj);

            StringBuilder scriptrewardPoint = new StringBuilder();

            if (lstGeneralSet.Count > 0)
            {

                foreach (GeneralSettingInfo generalSettingInfo in lstGeneralSet)
                {
                    if (generalSettingInfo.IsActive)
                    {

                        decimal maxRewardPoints = generalSettingInfo.TotalRewardPoints;
                        //$(".divRange").append('<p><b style="color: #006699;margin-left:10px">' + "Range:" + '<span id="amount"></span></b></p>');
                        scriptrewardPoint.Append("  isRewardPointEnbled = true; $('#hdnRate').val(eval(" +
                                                 generalSettingInfo.RewardExchangeRate / generalSettingInfo.RewardPoints +
                                                 "));");
                        if (generalSettingInfo.AmountSpent != 0 && generalSettingInfo.AmountSpent != null)
                        {
                            scriptrewardPoint.Append(" $('#hdnRewardRate').val(eval(" +
                                                     generalSettingInfo.RewardPointsEarned / generalSettingInfo.AmountSpent +
                                                     "));");
                        }
                        else
                        {
                            scriptrewardPoint.Append(" $('#hdnRewardRate').val(eval(" + 0 + "));");
                        }
                        scriptrewardPoint.Append("   $('#hdnTotalRewardAmount').val(eval(" +
                                                 generalSettingInfo.TotalRewardAmount * rate + "));");
                        scriptrewardPoint.Append("  $('#hdnTotalRewardPoints').val(eval(" +
                                                 generalSettingInfo.TotalRewardPoints + "));");
                        scriptrewardPoint.Append("  $('#hdnMinRedeemBalance').val(eval(" +
                                                 generalSettingInfo.MinRedeemBalance + "));");
                        scriptrewardPoint.Append("  $('#hdnCapped').val(eval(" + generalSettingInfo.BalanceCapped +
                                                 "));");
                        scriptrewardPoint.Append("  $('#spanCapped').html(eval(" + generalSettingInfo.BalanceCapped +
                                                 "));");
                        scriptrewardPoint.Append("  $('#spanTotalRewardPoints').html('" +
                                                 generalSettingInfo.TotalRewardPoints + "');");
                        scriptrewardPoint.Append("  $('#spanTotalRewardAmount').html('" +
                                                 generalSettingInfo.TotalRewardAmount * rate + "');");
                        scriptrewardPoint.Append("   $('#spanRPExchangePoints').html('" +
                                                 generalSettingInfo.RewardPoints + "');");
                        scriptrewardPoint.Append("  $('#spanRPExchangeAmount').html('" +
                                                 generalSettingInfo.RewardExchangeRate* rate + "');");
                        scriptrewardPoint.Append("  $('#spanTotalRP').html('" + generalSettingInfo.TotalRewardPoints +
                                                 "');");
                        scriptrewardPoint.Append("  $('#spanTotalRA').html('" + generalSettingInfo.TotalRewardAmount * rate +
                                                 "');");
                        //AspxCart.SetSessionValue('earningRewardPoints', true);
                        scriptrewardPoint.Append("   $('.divRange').show();");
                        scriptrewardPoint.Append("  $('#dvUsePoints').show();");
                        scriptrewardPoint.Append("   $('#dvRewardPointsMain').show();");
                        scriptrewardPoint.Append("   $('#trDiscountReward').show();");
                        //AspxCart.RewardRuleIsActive();
                        bool IsPurchaseActive = RewardPointsController.IsPurchaseActive(aspxCommonObj);
                        scriptrewardPoint.Append("isPurchaseActive=" + IsPurchaseActive.ToString().ToLower() + ";");
                        if (IsPurchaseActive)
                        {
                            scriptrewardPoint.Append(" $('#dvRPCurrent').show();");

                        }
                        //to set slider value  $("#slider-range").slider("option", "values", [10, 200]);

                        scriptrewardPoint.Append(
                            "$('#slider-range').slider({range: true,min: 0,max:" + maxRewardPoints + ",values: [0, " +
                            maxRewardPoints +
                            "],slide: function(event, ui) {$('#amount').html('<span>' + ui.values[0] + '</span>' + ' - ' + '<span>' + ui.values[1] + '</span>');},change: function(event, ui) { $('#amount').html('<span>' + ui.values[0] + '</span>' + '-' + '<span>' + ui.values[1] + '</span>');}});");
                        scriptrewardPoint.Append(
                            "$('#amount').html('<span>' + $('#slider-range').slider('values', 0) + '</span>' +' - ' + '<span>' + $('#slider-range').slider('values', 1) + '</span>');");

                        scriptrewardPoint.Append(" $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });");

                        // string script = GetStringScript(.ToString());
                        return scriptrewardPoint.ToString();
                    }
                }
            }
        }
        return "";
    }


    private string BindJsFunctions()
    {
        StringBuilder functionBuilder = new StringBuilder();
        // $("#tblCartList").append(cartElements);
        functionBuilder.Append("AspxCart.GetDiscountCartPriceRule(AspxCart.Vars.CartID, 0);");
        functionBuilder.Append("$('#tblCartList tr:even ').addClass('sfEve');");
        functionBuilder.Append("$('#tblCartList tr:odd ').addClass('sfOdd');");
        functionBuilder.Append("$('.cssClassCartPicture img[title]').tipsy({ gravity: 'n' });");
        functionBuilder.Append("AspxCart.BindCartFunctions();");
        return functionBuilder.ToString();

    }

    private string GetStringScript(string codeToRun)
    {
        StringBuilder script = new StringBuilder();
        script.Append("<script type=\"text/javascript\">$(document).ready(function(){ setTimeout(function(){ " +
                      codeToRun + "},500); });</script>");
        return script.ToString();
    }

    private List<CartInfo> LoadCartItems()
    {

        List<CartInfo> cartInfos = AspxCartController.GetCartDetails(aspxCommonObj);
        return cartInfos;
    }
}
