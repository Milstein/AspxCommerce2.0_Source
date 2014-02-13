using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
   public class AspxCustomerMgntProvider
    {
       public AspxCustomerMgntProvider()
       {
       }

       #region CustomerDetails
       
       public static List<CustomerDetailsInfo> GetCustomerDetails(int offset, int limit, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPUC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               SQLHandler sqlH = new SQLHandler();
               List<CustomerDetailsInfo> lstCustDetail = sqlH.ExecuteAsList<CustomerDetailsInfo>("[dbo].[usp_Aspx_GetCustomerDetails]", parameter);
               return lstCustDetail;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void DeleteMultipleCustomers(string customerIDs, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSP(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@CustomerIDs", customerIDs));
               parameterCollection.Add(new KeyValuePair<string, object>("@DeletedBy", aspxCommonObj.UserName));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("dbo.usp_Aspx_CustomerDeleteMultipleSelected", parameterCollection);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       public static void DeleteCustomer(int customerId, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSP(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@CustomerID", customerId));
               parameterCollection.Add(new KeyValuePair<string, object>("@DeletedBy", aspxCommonObj.UserName));
               SQLHandler sqlH = new SQLHandler();
               sqlH.ExecuteNonQuery("[dbo].[usp_Aspx_DeleteCustomerByCustomerID]", parameterCollection);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       #endregion

       #region Customer Reports By Order Total
       //--------------------bind Customer Order Total Roports-------------------------    
       public static List<CustomerOrderTotalInfo> GetCustomerOrderTotal(int offset, System.Nullable<int> limit, AspxCommonInfo aspxCommonObj, string user)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               parameter.Add(new KeyValuePair<string, object>("@User", user));
               SQLHandler sqlH = new SQLHandler();
               List<CustomerOrderTotalInfo> lstCustOrderTot = sqlH.ExecuteAsList<CustomerOrderTotalInfo>("usp_Aspx_GetCustomerOrderTotal", parameter);
               return lstCustOrderTot;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       #endregion

       //--------------- New Account Reports--------------------------
       public static List<NewAccountReportInfo> GetNewAccounts(int offset, System.Nullable<int> limit, AspxCommonInfo aspxCommonObj, bool monthly, bool weekly, bool hourly)
       {
           try
           {
               List<KeyValuePair<string, object>> parameter = CommonParmBuilder.GetParamSPC(aspxCommonObj);
               parameter.Add(new KeyValuePair<string, object>("@offset", offset));
               parameter.Add(new KeyValuePair<string, object>("@limit", limit));
               SQLHandler sqlH = new SQLHandler();
               if (monthly == true)
               {
                   List<NewAccountReportInfo> lstNewAccount= sqlH.ExecuteAsList<NewAccountReportInfo>("usp_Aspx_GetNewAccountDetails", parameter);
                   return lstNewAccount;
               }
               if (weekly == true)
               {
                   List<NewAccountReportInfo> lstNewAccount = sqlH.ExecuteAsList<NewAccountReportInfo>("usp_Aspx_GetNewAccountDetailsByCurrentMonth", parameter);
                   return lstNewAccount;
               }
               if (hourly == true)
               {
                   List<NewAccountReportInfo> lstNewAccount = sqlH.ExecuteAsList<NewAccountReportInfo>("usp_Aspx_GetNewAccountDetailsBy24hours", parameter);
                   return lstNewAccount;
               }
               else
                   return new List<NewAccountReportInfo>();
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       #region Online Users
       public static List<OnLineUserBaseInfo> GetRegisteredUserOnlineCount(int offset, int limit, string searchUserName, string searchHostAddress, string searchBrowser, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPU(aspxCommonObj);
               parameterCollection.Add(new KeyValuePair<string, object>("@Offset", offset));
               parameterCollection.Add(new KeyValuePair<string, object>("@Limit", limit));
               parameterCollection.Add(new KeyValuePair<string, object>("@SearchUserName", searchUserName));
               parameterCollection.Add(new KeyValuePair<string, object>("@HostAddress", searchHostAddress));
               parameterCollection.Add(new KeyValuePair<string, object>("@Browser", searchBrowser));          
               SQLHandler sqlH = new SQLHandler();
               List<OnLineUserBaseInfo> lstOnlineUser= sqlH.ExecuteAsList<OnLineUserBaseInfo>("usp_Aspx_GetOnlineRegisteredUsers", parameterCollection);
               return lstOnlineUser;
           }
           catch (Exception e)
           {

               throw e;
           }
       }

       public static List<OnLineUserBaseInfo> GetAnonymousUserOnlineCount(int offset, int limit, string searchHostAddress, string searchBrowser, AspxCommonInfo aspxCommonObj)
       {
           List<KeyValuePair<string, object>> parameterCollection = CommonParmBuilder.GetParamSPU(aspxCommonObj);
           parameterCollection.Add(new KeyValuePair<string, object>("@Offset", offset));
           parameterCollection.Add(new KeyValuePair<string, object>("@Limit", limit));
           parameterCollection.Add(new KeyValuePair<string, object>("@HostAddress", searchHostAddress));
           parameterCollection.Add(new KeyValuePair<string, object>("@Browser", searchBrowser));
           try
           {
               SQLHandler sqlH = new SQLHandler();
               List<OnLineUserBaseInfo> lst = sqlH.ExecuteAsList<OnLineUserBaseInfo>("usp_Aspx_GetOnlineAnonymousUsers", parameterCollection);
               return lst;
           }
           catch (Exception e)
           {

               throw e;
           }
       }
       #endregion
    }
}
