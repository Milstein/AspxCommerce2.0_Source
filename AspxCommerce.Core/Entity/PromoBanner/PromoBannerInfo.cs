using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace AspxCommerce.Core
{
    [Serializable]
    [DataContract]
    public class PromoBannerInfo
    {
       public  PromoBannerInfo()
        {
        }
       [DataMember]
       private int _rowTotal;
       [DataMember]
       private int _itemID;
       [DataMember]
       private string _itemSKU;
        [DataMember]
        private string _itemName;
        [DataMember]
        private int _count;
        [DataMember]
        private string _pageName;
        [DataMember]
        private string _imagePath;

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

        public string ItemSKU
        {
            get { return this._itemSKU; }
            set
            {
                if (this._itemSKU != value)
                {
                    this._itemSKU = value;
                }
            }
        }

        public string ItemName
        {
            get { return this._itemName; }
            set
            {
                if (this._itemName != value)
                {
                    this._itemName = value;
                }
            }
        }

        public int BannerCount
        {
            get { return this._count; }
            set
            {
                if (this._count != value)
                {
                    this._count = value;
                }
            }
        }
        public string PageName
        {
            get { return this._pageName; }
            set
            {
                if (this._pageName != value)
                {
                    this._pageName = value;
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
    }
}
