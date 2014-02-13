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
using System.Web;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using SageFrame.Framework;
using SageFrame.Web;
using AspxCommerce.Core;
using SageFrame.Core;

public partial class Modules_AspxCompareItems_ItemsCompare : BaseAdministrationUserControl
{
   public string UserIp;
   public string CountryName = string.Empty;
   public string SessionCode = string.Empty;
   public int StoreID, PortalID, CustomerID, MaxCompareItemCount;
   public string UserName, CultureName;
   public string EnableCompareItems, CompareItemListURL, DefaultImagePath;
   public int compareLen = 0;

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
        try
        {
           
            if (!IsPostBack)
            {
                IncludeCss("ItemsCompare", "/Templates/" + TemplateName + "/css/MessageBox/style.css", "/Templates/" + TemplateName + "/css/PopUp/style.css"); 
                IncludeJs("ItemsCompare", "/js/MessageBox/jquery.easing.1.3.js", "/js/MessageBox/alertbox.js", "/js/PopUp/custom.js", "/js/jquery.cookie.js",
                    "/Modules/AspxCommerce/AspxItemsCompare/js/ItemsCompare.js");
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
                DefaultImagePath = ssc.GetStoreSettingsByKey(StoreSetting.DefaultProductImageURL, StoreID, PortalID, CultureName);
                EnableCompareItems = ssc.GetStoreSettingsByKey(StoreSetting.EnableCompareItems, StoreID, PortalID, CultureName);
                CompareItemListURL = ssc.GetStoreSettingsByKey(StoreSetting.CompareItemURL, StoreID, PortalID, CultureName);
                MaxCompareItemCount = int.Parse(ssc.GetStoreSettingsByKey(StoreSetting.MaxNoOfItemsToCompare, StoreID, PortalID, CultureName));
               
            }
            IncludeLanguageJS();
            if (EnableCompareItems.ToLower() == "true")
            {
                BindCompareItems();
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void InitializeJS()
    {
        Page.ClientScript.RegisterClientScriptInclude("J12", ResolveUrl("~/js/encoder.js"));
        Page.ClientScript.RegisterClientScriptInclude("template", ResolveUrl("~/js/Templating/tmpl.js"));
    }
    Hashtable hst = null;
    private void BindCompareItems()
    {
        AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
        aspxCommonObj.StoreID = StoreID;
        aspxCommonObj.PortalID = PortalID;
        aspxCommonObj.UserName = UserName;
        aspxCommonObj.CultureName = CultureName;
        aspxCommonObj.SessionCode = SessionCode;
        string aspxRootPath = ResolveUrl("~/");
        string modulePath = this.AppRelativeTemplateSourceDirectory;
        hst = AppLocalized.getLocale(modulePath);
        StringBuilder compareItemContains = new StringBuilder(); 
         List<ItemsCompareInfo> compareItemInfo =
            AspxCompareItemController.GetItemCompareList(aspxCommonObj);
         if (compareItemInfo != null && compareItemInfo.Count > 0)
         {
             
             string costVariantIds=string.Empty;
             foreach (ItemsCompareInfo item in compareItemInfo)
             {
                 if (compareItemInfo.IndexOf(item) < MaxCompareItemCount)
                 {
                     string imagePath = "Modules/AspxCommerce/AspxItemsManagement/uploads/" + item.ImagePath;
                     if (item.ImagePath == "")
                     {
                         imagePath = DefaultImagePath;
                     }
                     compareItemContains.Append("<div class=\"productBox compareProduct\" id=\"compareProductBox-");
                     compareItemContains.Append(item.CompareItemID);
                     compareItemContains.Append("\" data=");
                     compareItemContains.Append(item.ItemID);
                     compareItemContains.Append(" costVariant=");
                     compareItemContains.Append(item.CostVariantValueID);
                     compareItemContains.Append(">");
                     compareItemContains.Append("<div id=\"compareCompareClose-");
                     compareItemContains.Append(item.ItemID);
                     compareItemContains.Append("\" onclick=\"ItemsCompare.RemoveFromAddToCompareBox(" + item.ItemID +
                                                ',' + item.CompareItemID +
                                                ");\" class=\"compareProductClose\">cancel</div>");
                     compareItemContains.Append("<div class=\"productImage\"><img src=");
                     compareItemContains.Append(aspxRootPath + imagePath.Replace("uploads", "uploads/Small"));
                     compareItemContains.Append("></div>");
                     compareItemContains.Append("<div class=\"productName\">");
                     compareItemContains.Append(item.ItemName);
                     if(item.ItemCostVariantValue!="")
                     {
                         compareItemContains.Append("<br/>");
                         compareItemContains.Append(item.ItemCostVariantValue);
                     }
                     compareItemContains.Append("</div></div>");
                     costVariantIds += item.CostVariantValueID + "#";
                     compareLen++;
                 }
             }
         }
         if ((MaxCompareItemCount - compareItemInfo.Count) > 0)
         {
             for (int i = 0; i < (MaxCompareItemCount - compareItemInfo.Count); i++)
             {
                 compareItemContains.Append("<div class=\"empty productBox\"></div>");
             }
         }
        string errorText = "<div id=\"compareErrorText\">" + getLocale("Sorry, You can not add more than") + "&nbsp;" +
                           MaxCompareItemCount + "&nbsp;" + getLocale("items") + ".</div>";
         ltrCompareItem.Text = compareItemContains.ToString();
         ltrError.Text = errorText;

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
