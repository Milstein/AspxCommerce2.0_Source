using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
   public class Notification
    {
        [DataMember(Name = "_RowTotal", Order = 0)]
        private System.Nullable<int> _RowTotal;

        [DataMember(Name = "_notificationID", Order = 1)]
        private int _notificationID;

        [DataMember(Name = "_itemID", Order = 2)]
        private int _itemID;

        [DataMember(Name = "_variantValueID", Order = 3)]
        private string _variantValueID;

        [DataMember(Name = "_itemSKU", Order = 4)]
        private string _itemSKU;

        [DataMember(Name = "_customer", Order = 5)]
        private string _customer;

        [DataMember(Name = "_email", Order = 6)]
        private string _email;

        [DataMember(Name = "_mailStatus", Order = 7)]
        private bool _mailStatus;

        [DataMember(Name = "_storeID", Order = 8)]
        private int _storeID;

        [DataMember(Name = "_portalID", Order = 9)]
        private int _portalID;

        [DataMember(Name = "_isActive", Order = 10)]
        private System.Nullable<bool> _isActive;

        [DataMember(Name = "_isDeleted", Order = 11)]
        private System.Nullable<bool> _isDeleted;

        [DataMember(Name = "_isModified", Order = 12)]
        private System.Nullable<bool> _isModified;

        [DataMember(Name = "_addedOn", Order = 13)]
        private System.Nullable<System.DateTime> _addedOn;

        [DataMember(Name = "_updatedOn", Order = 14)]
        private System.Nullable<System.DateTime> _updatedOn;

        [DataMember(Name = "_deletedOn", Order = 15)]
        private System.Nullable<System.DateTime> _deletedOn;

        [DataMember(Name = "_addedBy", Order = 16)]
        private string _addedBy;

        [DataMember(Name = "_updatedBy", Order = 17)]
        private string _updatedBy;

        [DataMember(Name = "_deletedBy", Order = 18)]
        private string _deletedBy;

        [DataMember(Name = "_itemStatus", Order = 19)]
        private bool _itemStatus;

      public  System.Nullable<int> RowTotal
        {
            get
            {
                return this._RowTotal;
            }
            set
            {
                if ((this._RowTotal != value))
                {
                    this._RowTotal = value;
                }
            }
        }


        public int NotificationID
        {
            get
            {
                return this._notificationID;

            }
            set
            {
                if (this._notificationID != value)
                {
                    _notificationID = value;
                }

            }


        }

        public int ItemID
        {
            get
            {
                return this._itemID;

            }
            set
            {
                if (this._itemID != value)
                {
                    _itemID = value;
                }

            }


        }


        public string VariantValueID
        {
            get
            {
                return this._variantValueID;
            }
            set
            {
                if (this._variantValueID != value)
                {
                    _variantValueID = value;
                }
            }

        }

        public string ItemSKU
        {
            get
            {
                return _itemSKU;
            }
            set
            {
                if (this._itemSKU != value)
                {
                    _itemSKU = value;
                }
            }

        }

        public string Customer
        {
            get
            {
                return _customer;
            }
            set
            {
                if (this._customer != value)
                {
                    _customer = value;
                }
            }
        }

        public string Email
        {
            get
            {
                return _email;
            }
            set
            {
                if (this._email != value)
                {
                    _email = value;
                }
            }
        }
       

        public bool MailStatus
        {


            get
            {
                return _mailStatus;
            }
            set
            {
                if (this._mailStatus != value)
                {
                    _mailStatus = value;
                }
            }
        }

        public int StoreID
        {
            get
            {
                return this._storeID;
            }
            set
            {
                if ((this._storeID != value))
                {
                    this._storeID = value;
                }
            }
        }

        public int PortalID
        {
            get
            {
                return this._portalID;
            }
            set
            {
                if ((this._portalID != value))
                {
                    this._portalID = value;
                }
            }
        }

        public System.Nullable<bool> IsActive
        {
            get
            {
                return this._isActive;
            }
            set
            {
                if ((this._isActive != value))
                {
                    this._isActive = value;
                }
            }
        }

        public System.Nullable<bool> IsDeleted
        {
            get
            {
                return this._isDeleted;
            }
            set
            {
                if ((this._isDeleted != value))
                {
                    this._isDeleted = value;
                }
            }
        }

        public System.Nullable<bool> IsModified
        {
            get
            {
                return this._isModified;
            }
            set
            {
                if ((this._isModified != value))
                {
                    this._isModified = value;
                }
            }
        }

        public System.Nullable<System.DateTime> AddedOn
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

        public System.Nullable<System.DateTime> UpdatedOn
        {
            get
            {
                return this._updatedOn;
            }
            set
            {
                if ((this._updatedOn != value))
                {
                    this._updatedOn = value;
                }
            }
        }

        public System.Nullable<System.DateTime> DeletedOn
        {
            get
            {
                return this._deletedOn;
            }
            set
            {
                if ((this._deletedOn != value))
                {
                    this._deletedOn = value;
                }
            }
        }

        public string AddedBy
        {
            get
            {
                return this._addedBy;
            }
            set
            {
                if ((this._addedBy != value))
                {
                    this._addedBy = value;
                }
            }
        }

        public string UpdatedBy
        {
            get
            {
                return this._updatedBy;
            }
            set
            {
                if ((this._updatedBy != value))
                {
                    this._updatedBy = value;
                }
            }
        }

        public string DeletedBy
        {
            get
            {
                return this._deletedBy;
            }
            set
            {
                if ((this._deletedBy != value))
                {
                    this._deletedBy = value;
                }
            }
        }

        public bool ItemStatus
        {
            get
            {
                return this._itemStatus;
            }
            set
            {
                if ((this._itemStatus != value))
                {
                    this._itemStatus = value;
                }
            }
        }

    }
}
