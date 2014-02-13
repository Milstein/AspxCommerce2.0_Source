/*
AspxCommerce® - http://www.aspxcommerce.com
Copyright (c) 20011-2012 by AspxCommerce
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
using System;
using System.Runtime.Serialization;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
    public class FeaturedItemsInfo
    {
        #region Constructor
        public FeaturedItemsInfo()
        {
        }
        #endregion

        #region Private Fields
        [DataMember]
        private int _itemID;

        [DataMember]
        private string _dateFrom;

        [DataMember]
        private string _dateTo;

        [DataMember]
        private System.Nullable<bool> _isFeatured;

        [DataMember]
        private string _sku;

        [DataMember]
        private string _name;

        [DataMember] 
        private string _shortDescription;

        [DataMember]
        private string _price;

        [DataMember]
        private string _listPrice;

        [DataMember]
        private System.Nullable<bool> _hidePrice;

        [DataMember]
        private System.Nullable<bool> _hideInRSSFeed;

        [DataMember]
        private System.Nullable<bool> _hideToAnonymous;

        [DataMember]
        private string _addedOn;

        [DataMember]
        private string _imagePath;

        [DataMember]
        private string _alternateText;
        #endregion

        #region Public Fields
        public int ItemID
        {
            get
            {
                return this._itemID;
            }
            set
            {
                if ((this._itemID != value))
                {
                    this._itemID = value;
                }
            }
        }

        public string DateFrom
        {
            get
            {
                return this._dateFrom;
            }
            set
            {
                if ((this._dateFrom != value))
                {
                    this._dateFrom = value;
                }
            }
        }

        public string DateTo
        {
            get
            {
                return this._dateTo;
            }
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
            get
            {
                return this._sku;
            }
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
            get
            {
                return this._name;
            }
            set
            {
                if ((this._name != value))
                {
                    this._name = value;
                }
            }
        }

        public string ShortDescription
        {
            get
            {
                return this._shortDescription;
            }
            set
            {
                if ((this._shortDescription != value))
                {
                    this._shortDescription = value;
                }
            }
        }

        public System.Nullable<bool> IsFeatured
        {
            get
            {
                return this._isFeatured;
            }
            set
            {
                if ((this._isFeatured != value))
                {
                    this._isFeatured = value;
                }
            }
        }

        public string Price
        {
            get
            {
                return this._price;
            }
            set
            {
                if ((this._price != value))
                {
                    this._price = value;
                }
            }
        }

        public string ListPrice
        {
            get
            {
                return this._listPrice;
            }
            set
            {
                if ((this._listPrice != value))
                {
                    this._listPrice = value;
                }
            }
        }

        public System.Nullable<bool> HidePrice
        {
            get
            {
                return this._hidePrice;
            }
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
            get
            {
                return this._hideInRSSFeed;
            }
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
            get
            {
                return this._hideToAnonymous;
            }
            set
            {
                if ((this._hideToAnonymous != value))
                {
                    this._hideToAnonymous = value;
                }
            }
        }

        public string AddedOn
        {
            get
            {
                return this._addedOn;
            }
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
            get
            {
                return this._imagePath;
            }
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
            get
            {
                return this._alternateText;
            }
            set
            {
                if ((this._alternateText != value))
                {
                    this._alternateText = value;
                }
            }
        }
        #endregion
    }
}
