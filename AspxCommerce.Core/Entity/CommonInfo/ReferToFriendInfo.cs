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
   public class ReferToFriendInfo
    {
        [DataMember(Name = "_rowTotal", Order = 1)]
        private System.Nullable<int> _rowTotal;

        [DataMember(Name = "_emailAFriendID", Order = 2)]
		private int _emailAFriendID;

        [DataMember(Name = "_itemID", Order = 3)]
		private System.Nullable<int> _itemID;

        [DataMember(Name = "_senderName", Order = 4)]
		private string _senderName;

        [DataMember(Name = "_senderEmail", Order = 5)]
		private string _senderEmail;

        [DataMember(Name = "_receiverName", Order = 6)]
		private string _receiverName;

        [DataMember(Name = "_receiverEmail", Order = 7)]
		private string _receiverEmail;

        [DataMember(Name = "_subject", Order = 8)]
		private string _subject;

        [DataMember(Name = "_message", Order = 9)]
		private string _message;

        [DataMember(Name = "_storeID", Order = 10)]
		private int _storeID;

        [DataMember(Name = "_portalID", Order = 11)]
		private int _portalID;

        [DataMember(Name = "_isActive", Order = 12)]
		private System.Nullable<bool> _isActive;

        [DataMember(Name = "_isDeleted", Order = 13)]
		private System.Nullable<bool> _isDeleted;

        [DataMember(Name = "_isModified", Order = 14)]
		private System.Nullable<bool> _isModified;

        [DataMember(Name = "_addedOn", Order = 15)]
		private System.Nullable<System.DateTime> _addedOn;

        [DataMember(Name = "_updatedOn", Order = 16)]
		private System.Nullable<System.DateTime> _updatedOn;

        [DataMember(Name = "_deletedOn", Order = 17)]
		private System.Nullable<System.DateTime> _deletedOn;

        [DataMember(Name = "_addedBy", Order = 18)]
		private string _addedBy;

        [DataMember(Name = "_updatedBy", Order = 19)]
		private string _updatedBy;

        [DataMember(Name = "_deletedBy", Order = 20)]
		private string _deletedBy;

        [DataMember(Name = "_itemName", Order = 21)]
        private string _itemName;
        [DataMember(Name = "_SKU", Order = 22)]
        private string _SKU;

        public ReferToFriendInfo()
		{
		}
		
		
		public System.Nullable<int> RowTotal
		{
			get
			{
				return this._rowTotal;
			}
			set
			{
				if ((this._rowTotal != value))
				{
					this._rowTotal = value;
				}
			}
		}
		
		public int EmailAFriendID
		{
			get
			{
				return this._emailAFriendID;
			}
			set
			{
				if ((this._emailAFriendID != value))
				{
					this._emailAFriendID = value;
				}
			}
		}
		
		public System.Nullable<int> ItemID
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
		
		public string SenderName
		{
			get
			{
				return this._senderName;
			}
			set
			{
				if ((this._senderName != value))
				{
					this._senderName = value;
				}
			}
		}
		
		public string SenderEmail
		{
			get
			{
				return this._senderEmail;
			}
			set
			{
				if ((this._senderEmail != value))
				{
					this._senderEmail = value;
				}
			}
		}
		
		public string ReceiverName
		{
			get
			{
				return this._receiverName;
			}
			set
			{
				if ((this._receiverName != value))
				{
					this._receiverName = value;
				}
			}
		}
		
		public string ReceiverEmail
		{
			get
			{
				return this._receiverEmail;
			}
			set
			{
				if ((this._receiverEmail != value))
				{
					this._receiverEmail = value;
				}
			}
		}
		
		public string Subject
		{
			get
			{
				return this._subject;
			}
			set
			{
				if ((this._subject != value))
				{
					this._subject = value;
				}
			}
		}
		
		public string Message
		{
			get
			{
				return this._message;
			}
			set
			{
				if ((this._message != value))
				{
					this._message = value;
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

        public string ItemName
        {
            get
            {
                return this._itemName;
            }
            set
            {
                if ((this._itemName != value))
                {
                    this._itemName = value;
                }
            }
        }
        public string SKU
        {
            get
            {
                return this._SKU;
            }
            set
            {
                if ((this._SKU != value))
                {
                    this._SKU = value;
                }
            }
        }
    }
    public class ReferToFriendEmailInfo:SendEmailInfo
    {

        public int ItemID { get; set; }

    }
}
