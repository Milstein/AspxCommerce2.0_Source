using System;
using System.Runtime.Serialization;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
    public class HeavyDiscountInfo
    {
        #region Constructor
        public HeavyDiscountInfo()
        {
        }

        #endregion
        #region Private Fields

        [DataMember]
        private int _itemID;
        [DataMember]
        private int _attributeSetID;
        [DataMember]
        private int _itemTypeID;
        [DataMember]
        private string _sku;
        [DataMember]
        private string _name;
        [DataMember]
        private decimal _price;
        [DataMember]
        private decimal _listPrice;
        [DataMember]
        private int _quantity;
        [DataMember]
        private Nullable<bool> _hidePrice;
        [DataMember]
        private Nullable<bool> _hideInRSSFeed;
        [DataMember]
        private Nullable<bool> _hideToAnonymous;
        [DataMember]
        private Nullable<bool> _isOutOfStock;
        [DataMember]
        private Nullable<System.DateTime> _addedOn;
        [DataMember]
        private string _imagePath;
        [DataMember]
        private string _alternateText;
        [DataMember]
        private Nullable<bool> _isCostVariantItem;
        [DataMember]
        private int _rowTotal;

        #endregion
        #region public fields

        public int ItemID
        {
            get { return this._itemID; }
            set
            {
                if (this._itemID != value)
                {
                    this._itemID = value;
                }
            }
        }
        public int AttributeSetID
        {
            get { return this._attributeSetID; }
            set
            {
                if (this._attributeSetID != value)
                {
                    this._attributeSetID = value;
                }
            }
        }
        public int ItemTypeID
        {
            get { return this._itemTypeID; }
            set
            {
                if (this._itemTypeID != value)
                {
                    this._itemTypeID = value;
                }
            }
        }

        public string SKU
        {
            get { return this._sku; }
            set
            {
                if (this._sku != value)
                {
                    this._sku = value;
                }
            }
        }
        public string Name
        {
            get { return this._name; }
            set
            {
                if (this._name != value)
                {
                    this._name = value;
                }
            }
        }
        public decimal Price
        {
            get { return this._price; }
            set
            {
                if (this._price != value)
                {
                    this._price = value;
                }
            }
        }
        public decimal ListPrice
        {
            get { return this._listPrice; }
            set
            {
                if (this._listPrice != value)
                {
                    this._listPrice = value;
                }
            }
        }
        public int Quantity
        {
            get { return this._quantity; }
            set
            {
                if (this._quantity != value)
                {
                    this._quantity = value;
                }
            }
        }
        public Nullable<bool> HidePrice
        {
            get { return this._hidePrice; }
            set
            {
                if (this._hidePrice != value)
                {
                    this._hidePrice = value;
                }
            }
        }
        public Nullable<bool> HideInRSSFeed
        {
            get { return this._hideInRSSFeed; }
            set
            {
                if (this._hideInRSSFeed != value)
                {
                    this._hideInRSSFeed = value;
                }
            }
        }
        public Nullable<bool> HideToAnonymous
        {
            get { return this._hideToAnonymous; }
            set
            {
                if (this._hideToAnonymous != value)
                {
                    this._hideToAnonymous = value;
                }
            }
        }
        public Nullable<bool> IsOutOfStock
        {
            get { return this._isOutOfStock; }
            set
            {
                if (this._isOutOfStock != value)
                {
                    this._isOutOfStock = value;
                }
            }
        }
        public Nullable<DateTime> AddedOn
        {
            get { return this._addedOn; }
            set
            {
                if (this._addedOn != value)
                {
                    this._addedOn = value;
                }
            }
        }
        public string ImagePath
        {
            get { return this._imagePath; }
            set
            {
                if (this._imagePath != value)
                {
                    this._imagePath = value;
                }
            }
        }
        public string AlternateText
        {
            get { return this._alternateText; }
            set
            {
                if (this._alternateText != value)
                {
                    this._alternateText = value;
                }
            }
        }
        public Nullable<bool> IsCostVariantItem
        {
            get { return this._isCostVariantItem; }
            set
            {
                if (this._isCostVariantItem != value)
                {
                    this._isCostVariantItem = value;
                }
            }
        }
        public int RowTotal
        {
            get { return this._rowTotal; }
            set
            {
                if (this._rowTotal != value)
                {
                    this._rowTotal = value;
                }
            }
        }
        #endregion
    }
}