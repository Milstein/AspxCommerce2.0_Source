using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
    public class LatestItemsWithOptionsInfo
    {
        #region Constructor
        public LatestItemsWithOptionsInfo()
        {

        }

        #endregion

        #region Private Fields

        [DataMember] private int _rowTotal;
        [DataMember] private int _itemID;

        [DataMember] private int _attributeSetID;

        [DataMember] private int _itemTypeID;

        [DataMember] private System.Nullable<System.DateTime> _dateFrom;

        [DataMember] private System.Nullable<System.DateTime> _dateTo;

        [DataMember] private string _isFeatured;
        [DataMember] private string _isSpecial;

        [DataMember] private string _sku;

        [DataMember] private string _name;

        [DataMember] private decimal _price;

        [DataMember] private decimal _listPrice;

        [DataMember] private int _quantity;

        [DataMember] private System.Nullable<bool> _hidePrice;

        [DataMember] private System.Nullable<bool> _hideInRSSFeed;

        [DataMember] private System.Nullable<bool> _hideToAnonymous;

        [DataMember] private System.Nullable<bool> _isOutOfStock;

        [DataMember] private System.Nullable<System.DateTime> _addedOn;

        [DataMember] private string _imagePath;

        [DataMember] private string _alternateText;
        [DataMember] private string _costVariants;
        [DataMember] private int _downloadableID;
        [DataMember] private string _variantIDs;
        [DataMember] private string _valuePrice;
        [DataMember] private string _costVariantName;
        [DataMember] private string _inputTypeIDs;
        [DataMember] private string _weight;
        [DataMember] private decimal _itemWeight;

        #endregion

        #region Public Fields

        public int RowTotal
        {
            get { return this._rowTotal; }
            set
            {
                if ((this._rowTotal != value))
                {
                    this._rowTotal = value;
                }
            }
        }

        public int ItemID
        {
            get { return this._itemID; }
            set
            {
                if ((this._itemID != value))
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
                if ((this._attributeSetID != value))
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
                if ((this._itemTypeID != value))
                {
                    this._itemTypeID = value;
                }
            }
        }

        public System.Nullable<System.DateTime> DateFrom
        {
            get { return this._dateFrom; }
            set
            {
                if ((this._dateFrom != value))
                {
                    this._dateFrom = value;
                }
            }
        }

        public System.Nullable<System.DateTime> DateTo
        {
            get { return this._dateTo; }
            set
            {
                if ((this._dateTo != value))
                {
                    this._dateTo = value;
                }
            }
        }

        public string SKU
        {
            get { return this._sku; }
            set
            {
                if ((this._sku != value))
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
                if ((this._name != value))
                {
                    this._name = value;
                }
            }
        }

        public string IsFeatured
        {
            get { return this._isFeatured; }
            set
            {
                if ((this._isFeatured != value))
                {
                    this._isFeatured = value;
                }
            }
        }

        public string IsSpecial
        {
            get { return this._isSpecial; }
            set
            {
                if ((this._isSpecial != value))
                {
                    this._isSpecial = value;
                }
            }
        }

        public decimal Price
        {
            get { return this._price; }
            set
            {
                if ((this._price != value))
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
                if ((this._listPrice != value))
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
                if ((this._quantity != value))
                {
                    this._quantity = value;
                }
            }
        }

        public System.Nullable<bool> HidePrice
        {
            get { return this._hidePrice; }
            set
            {
                if ((this._hidePrice != value))
                {
                    this._hidePrice = value;
                }
            }
        }

        public System.Nullable<bool> HideInRSSFeed
        {
            get { return this._hideInRSSFeed; }
            set
            {
                if ((this._hideInRSSFeed != value))
                {
                    this._hideInRSSFeed = value;
                }
            }
        }

        public System.Nullable<bool> HideToAnonymous
        {
            get { return this._hideToAnonymous; }
            set
            {
                if ((this._hideToAnonymous != value))
                {
                    this._hideToAnonymous = value;
                }
            }
        }

        public System.Nullable<bool> IsOutOfStock
        {
            get { return this._isOutOfStock; }
            set
            {
                if ((this._isOutOfStock != value))
                {
                    this._isOutOfStock = value;
                }
            }
        }

        public System.Nullable<System.DateTime> AddedOn
        {
            get { return this._addedOn; }
            set
            {
                if ((this._addedOn != value))
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
                if ((this._imagePath != value))
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
                if ((this._alternateText != value))
                {
                    this._alternateText = value;
                }
            }
        }

        public string CostVariants
        {
            get { return this._costVariants; }
            set
            {
                if ((this._costVariants != value))
                {
                    this._costVariants = value;
                }
            }
        }

        public int DownloadableID
        {
            get { return this._downloadableID; }
            set
            {
                if ((this._downloadableID != value))
                {
                    this._downloadableID = value;
                }
            }
        }

        public string variantIDs
        {
            get { return this._variantIDs; }
            set
            {
                if ((this._variantIDs != value))
                {
                    this._variantIDs = value;
                }
            }
        }

        public string valuePrice
        {
            get { return this._valuePrice; }
            set
            {
                if ((this._valuePrice != value))
                {
                    this._valuePrice = value;
                }
            }
        }

        public string CostVariantName
        {
            get { return this._costVariantName; }
            set
            {
                if ((this._costVariantName != value))
                {
                    this._costVariantName = value;
                }
            }
        }

        public string InputTypeIDs
        {
            get { return this._inputTypeIDs; }
            set
            {
                if ((this._inputTypeIDs != value))
                {
                    this._inputTypeIDs = value;
                }
            }
        }

        public string Weight
        {
            get { return this._weight; }
            set
            {
                if ((this._weight != value))
                {
                    this._weight = value;
                }
            }
        }

        public decimal ItemWeight
        {
            get { return this._itemWeight; }
            set
            {
                if ((this._itemWeight != value))
                {
                    this._itemWeight = value;
                }
            }
        }

        #endregion
    }

}
