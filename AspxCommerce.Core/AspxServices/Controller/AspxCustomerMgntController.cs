using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class AspxCustomerMgntController
    {
       public AspxCustomerMgntController()
       {
       }

       #region CustomerDetails

       public static List<CustomerDetailsInfo> GetCustomerDetails(int offset, int limit, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<CustomerDetailsInfo> lstCustDetail = AspxCustomerMgntProvider.GetCustomerDetails(offset, limit, aspxCommonObj);
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
               AspxCustomerMgntProvider.DeleteMultipleCustomers(customerIDs, aspxCommonObj);
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
               AspxCustomerMgntProvider.DeleteCustomer(customerId, aspxCommonObj);
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
               List<CustomerOrderTotalInfo> lstCustOrderTot = AspxCustomerMgntProvider.GetCustomerOrderTotal(offset, limit, aspxCommonObj, user);
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
               List<NewAccountReportInfo> lstNewAccounts = AspxCustomerMgntProvider.GetNewAccounts(offset, limit, aspxCommonObj, monthly, weekly, hourly);
               return lstNewAccounts;
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

               List<OnLineUserBaseInfo> lstOnlineUser = AspxCustomerMgntProvider.GetRegisteredUserOnlineCount(offset, limit, searchUserName, searchHostAddress, searchBrowser, aspxCommonObj);
               return lstOnlineUser;
           }
           catch (Exception e)
           {

               throw e;
           }
       }

       public static List<OnLineUserBaseInfo> GetAnonymousUserOnlineCount(int offset, int limit, string searchHostAddress, string searchBrowser, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<OnLineUserBaseInfo> lst = AspxCustomerMgntProvider.GetAnonymousUserOnlineCount(offset, limit, searchHostAddress, searchBrowser, aspxCommonObj);
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
