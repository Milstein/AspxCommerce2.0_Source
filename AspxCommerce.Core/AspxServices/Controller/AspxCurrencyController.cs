using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace AspxCommerce.Core
{
    public class AspxCurrencyController
    {
        public AspxCurrencyController()
        {
        }
        public static List<CurrencyInfo> BindCurrencyList(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<CurrencyInfo> lstCurrency = AspxCurrencyProvider.BindCurrencyList(aspxCommonObj);
                return lstCurrency;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<CurrencyInfo> BindCurrencyAddedLists(int offset, int limit, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<CurrencyInfo> lstCurrency = AspxCurrencyProvider.BindCurrencyAddedLists(offset, limit, aspxCommonObj);
                return lstCurrency;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<CurrencyInfoByCode> GetDetailsByCountryCode(string countryCode, string countryName, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<CurrencyInfoByCode> lstCountryDetails = AspxCurrencyProvider.GetDetailsByCountryCode(countryCode, countryName, aspxCommonObj);
                return lstCountryDetails;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void InsertNewCurrency(AspxCommonInfo aspxCommonObj, CurrencyInfo currencyInsertObj)
        {
            try
            {
                AspxCurrencyProvider.InsertNewCurrency(aspxCommonObj, currencyInsertObj);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessForDisplayOrderForCurrency(AspxCommonInfo aspxCommonObj, int value, int currencyID)
        {
            try
            {
                bool isUnique = AspxCurrencyProvider.CheckUniquenessForDisplayOrderForCurrency(aspxCommonObj, value, currencyID);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckCurrencyCodeUniqueness(AspxCommonInfo aspxCommonObj, string currencyCode, int currencyID)
        {
            try
            {
                bool isUnique = AspxCurrencyProvider.CheckCurrencyCodeUniqueness(aspxCommonObj, currencyCode, currencyID);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void UpdateRealTimeRate(AspxCommonInfo aspxCommonObj, string currencyCode, double rate)
        {
            try
            {
                AspxCurrencyProvider.UpdateRealTimeRate(aspxCommonObj,currencyCode, rate);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public static double GetRatefromTable(AspxCommonInfo aspxCommonObj,  string currencyCode)
       {
           try
           {
               double rate = AspxCurrencyProvider.GetRatefromTable(aspxCommonObj, currencyCode);
               return rate;
           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public static void SetStorePrimary(AspxCommonInfo aspxCommonObj, string currencyCode)
       {
           try
           {
               AspxCurrencyProvider.SetStorePrimary(aspxCommonObj, currencyCode);
               
           }
           catch (Exception e)
           {
               throw e;
           }
       }
       public static void DeleteMultipleCurrencyByCurrencyID(string currencyIDs, AspxCommonInfo aspxCommonObj)
       {
           try
           {
               AspxCurrencyProvider.DeleteMultipleCurrencyByCurrencyID(currencyIDs, aspxCommonObj);
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
