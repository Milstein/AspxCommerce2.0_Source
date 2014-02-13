using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using SageFrame.Web.Utilities;
using AspxCommerce.Core;
using AspxCommerce.CategoryWiseItems;

/// <summary>
/// Summary description for CategoryWiseItemsService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class CategoryWiseItemsService : System.Web.Services.WebService
{

    public CategoryWiseItemsService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }
    [WebMethod]
    public List<CategoryWiseItemInfo> GetCategoryWiseItemList(int offset, int limit,int noOfItems, AspxCommonInfo aspxCommonObj)
    {
        try
        {
            List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
            parameter.Add(new KeyValuePair<string, object>("@offset", offset));
            parameter.Add(new KeyValuePair<string, object>("@limit", limit));
            parameter.Add(new KeyValuePair<string, object>("@StoreID", aspxCommonObj.StoreID));
            parameter.Add(new KeyValuePair<string, object>("@PortalID", aspxCommonObj.PortalID));
            parameter.Add(new KeyValuePair<string, object>("@UserName", aspxCommonObj.UserName));
            parameter.Add(new KeyValuePair<string, object>("@CultureName", aspxCommonObj.CultureName));
            parameter.Add(new KeyValuePair<string, object>("@noofitems", noOfItems));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsList<CategoryWiseItemInfo>("[dbo].[usp_Aspx_CategoryWiseItemList]", parameter);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<CategoryWiseitemSettings> GetCategoryWiseItemSettings(AspxCommonInfo aspxCommonObj)
    {
        try
        {
            List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
            parameter.Add(new KeyValuePair<string, object>("@StoreID", aspxCommonObj.StoreID));
            parameter.Add(new KeyValuePair<string, object>("@PortalID", aspxCommonObj.PortalID));
            parameter.Add(new KeyValuePair<string, object>("@CultureName", aspxCommonObj.CultureName));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsList<CategoryWiseitemSettings>("usp_Aspx_GetCategoryItemSettings", parameter);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public void SaveCategoryItemSettings(int noOfItemInCategory, int noOfCategories,AspxCommonInfo aspxCommonObj)
    {
        try
        {
            List<KeyValuePair<string, object>> parameter = new List<KeyValuePair<string, object>>();
            parameter.Add(new KeyValuePair<string, object>("@StoreID", aspxCommonObj.StoreID));
            parameter.Add(new KeyValuePair<string, object>("@PortalID", aspxCommonObj.PortalID));
            parameter.Add(new KeyValuePair<string, object>("@CultureName", aspxCommonObj.CultureName));
            parameter.Add(new KeyValuePair<string, object>("@NoOfItemsInCategory", noOfItemInCategory));
            parameter.Add(new KeyValuePair<string, object>("@NoOfCategories", noOfCategories));
            SQLHandler sqlH = new SQLHandler();
            sqlH.ExecuteNonQuery("usp_Aspx_SaveCategoryItemSettings", parameter);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}

