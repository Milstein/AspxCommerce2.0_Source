using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
    public class AspxCommonController
    {
        public AspxCommonController()
        {
        }

        public static List<SearchTermInfo> GetSearchStatistics(int count, string commandName, AspxCommonInfo aspxCommonObj)
        {
            List<SearchTermInfo> lstSearchTerm = AspxCommonProvider.GetSearchStatistics(count, commandName, aspxCommonObj);
            return lstSearchTerm;
        }

        public static void UpdateItemRating(ItemReviewBasicInfo ratingManageObj, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                AspxCommonProvider.UpdateItemRating(ratingManageObj, aspxCommonObj);

            }

            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<RatingCriteriaInfo> GetItemRatingCriteria(AspxCommonInfo aspxCommonObj, bool isFlag)
        {
            try
            {
                List<RatingCriteriaInfo> lstRating = AspxCommonProvider.GetItemRatingCriteria(aspxCommonObj,isFlag);
                return lstRating;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<ItemReviewDetailsInfo> GetItemRatingByReviewID(int itemReviewID, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<ItemReviewDetailsInfo> lstItemRVDetail = AspxCommonProvider.GetItemRatingByReviewID(itemReviewID, aspxCommonObj);
                return lstItemRVDetail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void DeleteSingleItemRating(string itemReviewID, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                AspxCommonProvider.DeleteSingleItemRating(itemReviewID, aspxCommonObj);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<RatingLatestInfo> GetRecentItemReviewsAndRatings(int offset, int limit, AspxCommonInfo aspxCommonObj)
        {
            try
            {

                List<RatingLatestInfo> lstRatingNew = AspxCommonProvider.GetRecentItemReviewsAndRatings(offset, limit, aspxCommonObj);
                return lstRatingNew;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<StatusInfo> GetStatus(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<StatusInfo> lstStatus = AspxCommonProvider.GetStatus(aspxCommonObj);
                return lstStatus;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessBoolean(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, bool attributeValue)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniquenessBoolean(flag,storeID,portalID,attributeID,attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessDecimal(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, Decimal attributeValue)
        {
            try
            {
                bool isUnique =AspxCommonProvider.CheckUniquenessDecimal(flag,storeID,portalID,attributeID,attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessDate(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, DateTime attributeValue)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniquenessDate(flag,storeID,portalID,attributeID,attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessFile(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, string attributeValue)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniquenessFile(flag,storeID,portalID,attributeID,attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public static bool CheckUniquenessInt(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, Int32 attributeValue)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniquenessInt(flag,storeID,portalID,attributeID,attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessNvarchar(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, string attributeValue)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniquenessNvarchar(flag, storeID, portalID, attributeID, attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool CheckUniquenessText(Int32 flag, Int32 storeID, Int32 portalID, Int32 attributeID, string attributeValue)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniquenessText(flag,storeID,portalID,attributeID,attributeValue);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //---------------- Added for unique name check ---------------------
        public static bool CheckUniqueName(AttributeBindInfo attrbuteUniqueObj, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                bool isUnique = AspxCommonProvider.CheckUniqueName(attrbuteUniqueObj, aspxCommonObj);
                return isUnique;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<StatusInfo> GetStatusList(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                List<StatusInfo> lstStatus = AspxCommonProvider.GetStatusList(aspxCommonObj);
                return lstStatus;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<PortalRole> GetPortalRoles(int portalID, bool isAll, string userName)
        {
            List<PortalRole> lstPortalRole = AspxCommonProvider.GetPortalRoles(portalID, isAll, userName);
            return lstPortalRole;
        }

        //--------------------Store Lists------------------------    

        public static List<StoreInfo> GetAllStores(AspxCommonInfo aspxCommonObj)
        {
            List<StoreInfo> lstStore = AspxCommonProvider.GetAllStores(aspxCommonObj);
            return lstStore;
        }
        //----------------country list------------------------------    

        public static List<CountryInfo> BindCountryList()
        {
            try
            {
                List<CountryInfo> lstCountry = AspxCommonProvider.BindCountryList();
                return lstCountry;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //----------------state list--------------------------     

        public static List<StateInfo> BindStateList(string countryCode)
        {
            try
            {
                List<StateInfo> lstState = AspxCommonProvider.BindStateList(countryCode);
                return lstState;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static string GetUserBillingEmail(int addressID, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                string userEmail = AspxCommonProvider.GetUserBillingEmail(addressID, aspxCommonObj);
                return userEmail;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #region AddToCart

        public static int AddItemstoCart(int itemID, decimal itemPrice, int itemQuantity, AspxCommonInfo aspxCommonObj)
        {
            try
            {
               int retValue= AspxCommonProvider.AddItemstoCart(itemID, itemPrice, itemQuantity, aspxCommonObj);
               return retValue;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static int AddItemstoCartFromDetail(AddItemToCartInfo AddItemToCartObj, AspxCommonInfo aspxCommonObj, GiftCard giftCardDetail)
        {
            try
            {
               int retValue= AspxCommonProvider.AddItemstoCartFromDetail(AddItemToCartObj, aspxCommonObj, giftCardDetail);
               return retValue;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region MiniCart Display
        //----------------------Count my cart items--------------------     
        public static int GetCartItemsCount(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                int cartItemCount = AspxCommonProvider.GetCartItemsCount(aspxCommonObj);
                return cartItemCount;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region StoreSettingImplementation

        public static decimal GetTotalCartItemPrice(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                decimal cartPrice = AspxCommonProvider.GetTotalCartItemPrice(aspxCommonObj);
                return cartPrice;

            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public static int GetCompareItemsCount(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                int compCount = AspxCommonProvider.GetCompareItemsCount(aspxCommonObj);
                return compCount;

            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public static bool CheckAddressAlreadyExist(AspxCommonInfo aspxCommonObj)
        {
            try
            {
                bool isExist = AspxCommonProvider.CheckAddressAlreadyExist(aspxCommonObj);
                return isExist;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        public static bool GetModuleInstallationInfo(string moduleFriendlyName, AspxCommonInfo aspxCommonObj)
        {
            try
            {
                bool isInstalled = AspxCommonProvider.GetModuleInstallationInfo(moduleFriendlyName, aspxCommonObj);
                return isInstalled;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static string GetStateCode(string cCode, string stateName)
        {
            string stateCode = AspxCommonProvider.GetStateCode(cCode, stateName);
            return stateCode;
        }
    }
}
