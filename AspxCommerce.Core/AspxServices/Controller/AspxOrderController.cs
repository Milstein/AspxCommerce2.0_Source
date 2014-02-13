using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;

namespace AspxCommerce.Core
{
   public class AspxOrderController
    {
       public AspxOrderController()
       {
       }

       public static int AddAddress(OrderDetailsCollection orderData, SqlTransaction tran)
       {
           try
           {
               int addressID = AspxOrderProvider.AddAddress(orderData, tran);                                                   
               return addressID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddBillingAddress(OrderDetailsCollection orderData, SqlTransaction tran, int addressID)
       {
           try
           {
               int billingAddressID = AspxOrderProvider.AddBillingAddress(orderData, tran, addressID);
               return billingAddressID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddShippingAddress(OrderDetailsCollection orderData, SqlTransaction tran, int addressID)
       {
           try
           {

               int shippingAddressID = AspxOrderProvider.AddShippingAddress(orderData, tran, addressID);
               return shippingAddressID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddBillingAddress(OrderDetailsCollection orderData, SqlTransaction tran)
       {
           try
           {
               int billingAddressID = AspxOrderProvider.AddBillingAddress(orderData, tran);
               return billingAddressID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddShippingAddress(OrderDetailsCollection orderData, SqlTransaction tran)
       {
           try
           {
               int shippingAddressID = AspxOrderProvider.AddShippingAddress(orderData, tran);
               return shippingAddressID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddPaymentInfo(OrderDetailsCollection orderData, SqlTransaction tran)
       {
           try
           {
               int paymentMethodID = AspxOrderProvider.AddPaymentInfo(orderData, tran);
               return paymentMethodID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddOrderWithMultipleCheckOut(OrderDetailsCollection orderData, SqlTransaction tran, int paymentMethodId)
       {
           try
           {
               int orderID = AspxOrderProvider.AddOrderWithMultipleCheckOut(orderData, tran, paymentMethodId);
               return orderID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static int AddOrder(OrderDetailsCollection orderData, SqlTransaction tran, int billingAddressID, int paymentMethodId)
       {
           try
           {
               int orderID = AspxOrderProvider.AddOrder(orderData, tran, billingAddressID, paymentMethodId);
               return orderID;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void UpdateOrderDetails(OrderDetailsCollection orderData)
       {
           try
           {
               AspxOrderProvider.UpdateOrderDetails(orderData);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void ReduceCouponUsed(string couponCode, int storeID, int portalID, string userName, int orderID)
       {
           AspxCouponManageController.UpdateCouponUserRecord(couponCode, storeID, portalID, userName, orderID);
       }


       public static void UpdateItemQuantity(OrderDetailsCollection orderData)
       {
           try
           {
               AspxOrderProvider.UpdateItemQuantity(orderData);
           }
           catch (Exception e)
           {
               throw e;
           }

       }
       //multiple
       public static void AddOrderItemsList(OrderDetailsCollection orderData, SqlTransaction tran, int orderID)
       {
           try
           {
               AspxOrderProvider.AddOrderItemsList(orderData, tran, orderID);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       //single
       public static void AddOrderItems(OrderDetailsCollection orderData, SqlTransaction tran, int orderID, int shippingAddressID)
       {
           try
           {
               AspxOrderProvider.AddOrderItems(orderData, tran, orderID, shippingAddressID);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       #region Order Management
       public static List<MyOrderListInfo> GetOrderDetails(int offset, System.Nullable<int> limit, string orderStatusName, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<MyOrderListInfo> lstMyOrder = AspxOrderProvider.GetOrderDetails(offset, limit, orderStatusName, aspxCommonObj);
               return lstMyOrder;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static bool SaveOrderStatus(AspxCommonInfo aspxCommonObj, int orderStatusID, int orderID)
       {
           try
           {
               bool chkMsg = AspxOrderProvider.SaveOrderStatus(aspxCommonObj, orderStatusID, orderID);
               return chkMsg;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       #endregion
    }
}
