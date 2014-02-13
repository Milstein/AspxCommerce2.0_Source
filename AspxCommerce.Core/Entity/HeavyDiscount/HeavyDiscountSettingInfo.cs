using System;
using System.Runtime.Serialization;

namespace AspxCommerce.Core
{
    /// <summary>
    /// Summary description for HeavyDIscountSettingInfo
    /// </summary>

    [DataContract]
    [Serializable]
    public class HeavyDiscountSettingInfo
    {
        [DataMember]
        private string _enableModule;
        [DataMember]
        private int _discountValue;
        [DataMember]
        private int _noOfItemShown;
        [DataMember]
        private int _storeId;
        [DataMember]
        private int _portalId;
        [DataMember]
        private string _cultureName;

        public string EnableModule
        {
            get { return this._enableModule; }
            set
            {
                if (this._enableModule != value)
                {
                    this._enableModule = value;
                }
            }
        }
        public int DiscountValue
        {
            get { return this._discountValue; }
            set
            {
                if (this._discountValue != value)
                {
                    this._discountValue = value;
                }
            }
        }
        public int NoOfItemShown
        {
            get { return this._noOfItemShown; }
            set
            {
                if (this._noOfItemShown != value)
                {
                    this._noOfItemShown = value;
                }
            }
        }
        public int StoreID
        {
            get { return this._storeId; }
            set
            {
                if (this._storeId != value)
                {
                    this._storeId = value;
                }
            }
        }
        public int PortalID
        {
            get { return this._portalId; }
            set
            {
                if (this._portalId != value)
                {
                    this._portalId = value;
                }
            }
        }
        public string CultureName
        {
            get
            {
                return this._cultureName;
            }
            set
            {
                if (this._cultureName != value)
                {
                    this._cultureName = value;
                }
            }
        }
    }
}