using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;

namespace AspxCommerce.Core
{
   public class AspxServiceController
    {
       public AspxServiceController()
       {
       }

       public static List<ServiceInfo> GetAllServices(AspxCommonInfo aspxCommonObj)
       {
           try
           {
              
               List<ServiceInfo> lstService = AspxServiceProvider.GetAllServices(aspxCommonObj);
               return lstService;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<FrontServiceView> GetFrontServices(AspxCommonInfo aspxCommonObj, int count)
       {
           try
           {

               List<FrontServiceView> lstService = AspxServiceProvider.GetFrontServices(aspxCommonObj, count);
               return lstService;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceDetailsInfo> GetServiceDetails(string servicekey, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceDetailsInfo> lstServiceDetail = AspxServiceProvider.GetServiceDetails(servicekey, aspxCommonObj);
               return lstServiceDetail;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void SaveServiceItem(AspxCommonInfo aspxCommonObj, int categoryId, List<ServiceItemInfo> serviceInfo, SqlTransaction tran)
       {
           try
           {
               AspxServiceProvider.SaveServiceItem(aspxCommonObj, categoryId, serviceInfo, tran);
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceItemInfo> GetServiceItemInfo(AspxCommonInfo aspxCommonObj, int categoryId)
       {
           List<ServiceItemInfo> serviceInfo=AspxServiceProvider.GetServiceItemInfo(aspxCommonObj,categoryId);
           return serviceInfo;
       }


       public static void DeleteServiceItem(string option, AspxCommonInfo aspxCommonObj, int id)
       {
           try
           {
               AspxServiceProvider.DeleteServiceItem(option, aspxCommonObj, id);
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<StoreLocatorInfo> GetAllStoresForService(AspxCommonInfo aspxCommonObj, int? serviceCategoryId)
       {

           try
           {
               List<StoreLocatorInfo> lstStoreLocator = AspxServiceProvider.GetAllStoresForService(aspxCommonObj, serviceCategoryId);
               return lstStoreLocator;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceItemDetailsInfo> GetServiceItemDetails(int itemID, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceItemDetailsInfo> lstSIDetail = AspxServiceProvider.GetServiceItemDetails(itemID,aspxCommonObj);
               return lstSIDetail;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static bool SaveBookAppointment(int appointmentId, AspxCommonInfo aspxCommonObj, BookAppointmentInfo obj)
       {
           var isSuccess = false;
           try
           {
               AspxServiceProvider.SaveBookAppointment(appointmentId, aspxCommonObj, obj);
               isSuccess = true;
           }
           catch (Exception)
           {
               isSuccess = false;

           }
           return isSuccess;
       }


       public static List<BookAppointmentGridInfo> GetBookAppointmentList(int offset, int limit, AspxCommonInfo aspxCommonObj, string appointmentStatusName, string branchName, string employeeName)
       {
           try
           {

               List<BookAppointmentGridInfo> lstBookAppoint = AspxServiceProvider.GetBookAppointmentList(offset, limit, aspxCommonObj, appointmentStatusName, branchName, employeeName);
               return lstBookAppoint;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static void DeleteAppointment(string appointmentID, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxServiceProvider.DeleteAppointment(appointmentID, aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<BookAppointmentInfo> GetAppointmentDetailByID(int appointmentID, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<BookAppointmentInfo> lstBookAppoint = AspxServiceProvider.GetAppointmentDetailByID(appointmentID, aspxCommonObj);
               return lstBookAppoint;
           }
           catch (Exception e)
           {

               throw e;
           }
       }


       public static List<AppointmentStatusInfo> GetAppointmentStatusList(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<AppointmentStatusInfo> lstAppointStatus =AspxServiceProvider.GetAppointmentStatusList(aspxCommonObj);
               return lstAppointStatus;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       public static List<AppointmentSatusInfoBasic> GetAppointmentStatusListGrid(int limit,int offset,string statusName,bool? isActive,AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<AppointmentSatusInfoBasic> lstAppointStatus = AspxServiceProvider.GetAppointmentStatusListGrid(limit,offset,statusName,isActive,aspxCommonObj);
               return lstAppointStatus;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void AddUpdateAppointmentStatus(AspxCommonInfo aspxCommonObj, AppointmentSatusInfoBasic appointmentStatusObj)
       {
           AspxServiceProvider.AddUpdateAppointmentStatus(aspxCommonObj, appointmentStatusObj);
       }

       public static List<ServiceProductInfo> GetServiceProducts(int serviceId, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceProductInfo> lstServProduct = AspxServiceProvider.GetServiceProducts(serviceId,aspxCommonObj);
               return lstServProduct;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceAvailableDateInfo> GetServiceDates(GetServiceDateInfo getServiceDateObj, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceAvailableDateInfo> lstServDate = AspxServiceProvider.GetServiceDates(getServiceDateObj,aspxCommonObj);
               return lstServDate;
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceAvailableTimeInfo> GetServiceAvailableTime(GetServiceAvailableTimeInfo getServiceTimeObj, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceAvailableTimeInfo> lstServTime = AspxServiceProvider.GetServiceAvailableTime(getServiceTimeObj,aspxCommonObj);
               return lstServTime;
           }
           catch (Exception e)
           {

               throw e;
           }

       }

       public static void SaveServiceProvider(AspxCommonInfo aspxCommonObj, ServiceProviderInfo providerSaveInfo)
       {
           try
           {
               AspxServiceProvider.SaveServiceProvider(aspxCommonObj, providerSaveInfo);
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceProviderInfo> GetServiceProviderNameList(AspxCommonInfo aspxCommonObj, int storeBranchId)
       {
           try
           {
               List<ServiceProviderInfo> lstServProv = AspxServiceProvider.GetServiceProviderNameList(aspxCommonObj,storeBranchId);
               return lstServProv;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ServiceProviderInfo> GetBranchProviderNameList(int offset, int? limit, int storeBranchId, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceProviderInfo> lstServProv= AspxServiceProvider.GetBranchProviderNameList(offset,limit,storeBranchId,aspxCommonObj);
               return lstServProv;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void DeleteServiceProvider(AspxCommonInfo aspxCommonObj, string id, int storeBranchId)
       {
           try
           {
               AspxServiceProvider.DeleteServiceProvider(aspxCommonObj, id, storeBranchId);
           }
           catch (Exception e)
           {
               throw e;
           }
       }


       public static List<ServiceProviderInfo> GetServiceProviderNameListFront(AspxCommonInfo aspxCommonObj, int storeBranchId, int serviceCategoryId)
       {
           try
           {
               List<ServiceProviderInfo> lstServProv = AspxServiceProvider.GetServiceProviderNameListFront(aspxCommonObj, storeBranchId, serviceCategoryId);
               return lstServProv;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<ServiceBookedTime> GetServiceBookedTime(GetServiceBookedTimeInfo bookedTimeObj, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<ServiceBookedTime> lstSBTime = AspxServiceProvider.GetServiceBookedTime(bookedTimeObj,aspxCommonObj);
               return lstSBTime;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static bool CheckServiceProviderUniqueness(AspxCommonInfo aspxCommonObj, ServiceProviderInfo providerUniqueInfo)
       {
           try
           {
               bool isSPUnique = AspxServiceProvider.CheckServiceProviderUniqueness(aspxCommonObj,providerUniqueInfo);
               return isSPUnique;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void DeleteAppointmentForError(int orderId, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxServiceProvider.DeleteAppointmentForError(orderId, aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static List<OrderServiceDetailInfo> GetServiceDetailsByOrderID(int orderID, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<OrderServiceDetailInfo> lstBookAppoint = AspxServiceProvider.GetServiceDetailsByOrderID(orderID, aspxCommonObj);
               return lstBookAppoint;
           }
           catch (Exception e)
           {

               throw e;
           }
       }

       public static List<BookAppointmentInfo> GetAppointmentDetailsForExport(AspxCommonInfo aspxCommonObj)
       {
           try
           {
               List<BookAppointmentInfo> lstBookAppoint = AspxServiceProvider.GetAppointmentDetailsForExport(aspxCommonObj);
               return lstBookAppoint;
           }
           catch (Exception e)
           {

               throw e;
           }
       }


    }
}
