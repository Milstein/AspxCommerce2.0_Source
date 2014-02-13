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
    public class AttributeFormInfo
    {
        #region Constructor
        public AttributeFormInfo()
        {
        }
        #endregion

        #region Private Fields

        private int _attributeID;

        private string _attributeName;

        private string _toolTip;

        private string _help;

        private Int32 _inputTypeID;

        private string _inputTypeValues;

        private string _defaultValue;

        private System.Nullable<int> _validationTypeID;

        private System.Nullable<int> _length;

        private System.Nullable<bool> _isUnique;

        private System.Nullable<bool> _isRequired;

        private System.Nullable<bool> _isEnableEditor;

        private System.Nullable<int> _groupID;

        private string _groupName;

        private int _storeID;

        private int _portalID;

        private System.Nullable<bool> _isIncludeInPriceRule;

        private System.Nullable<bool> _isIncludeInPromotions;

        private int _displayOrder;

        private string _nvarcharValue;

        private string _textValue;

        private string _booleanValue;

        private string _intValue;

        private string _dateValue;

        private string _decimalValue;

        private string _fileValue;

        private string _optionValues;

        private System.Nullable<int> _attributeSetID;

        private System.Nullable<int> _itemTypeID;

        private System.Nullable<int> _taxItemClass;
        private System.Nullable<int> _currencyID;
        private string _currencyCode;
        #endregion

        #region Public Fields
        [DataMember]
        public int AttributeID
        {
            get
            {
                return this._attributeID;
            }
            set
            {
                if ((this._attributeID != value))
                {
                    this._attributeID = value;
                }
            }
        }
        [DataMember]
        public string AttributeName
        {
            get
            {
                return this._attributeName;
            }
            set
            {
                if ((this._attributeName != value))
                {
                    this._attributeName = value;
                }
            }
        }
        [DataMember]
        public string ToolTip
        {
            get
            {
                return this._toolTip;
            }
            set
            {
                if ((this._toolTip != value))
                {
                    this._toolTip = value;
                }
            }
        }
        [DataMember]
        public string Help
        {
            get
            {
                return this._help;
            }
            set
            {
                if ((this._help != value))
                {
                    this._help = value;
                }
            }
        }
        [DataMember]
        public Int32 InputTypeID
        {
            get
            {
                return this._inputTypeID;
            }
            set
            {
                if ((this._inputTypeID != value))
                {
                    this._inputTypeID = value;
                }
            }
        }
        [DataMember]
        public string InputTypeValues
        {
            get
            {
                return this._inputTypeValues;
            }
            set
            {
                if ((this._inputTypeValues != value))
                {
                    this._inputTypeValues = value;
                }
            }
        }
        [DataMember]
        public string DefaultValue
        {
            get
            {
                return this._defaultValue;
            }
            set
            {
                if ((this._defaultValue != value))
                {
                    this._defaultValue = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<int> ValidationTypeID
        {
            get
            {
                return this._validationTypeID;
            }
            set
            {
                if ((this._validationTypeID != value))
                {
                    this._validationTypeID = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<int> Length
        {
            get
            {
                return this._length;
            }
            set
            {
                if ((this._length != value))
                {
                    this._length = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<bool> IsUnique
        {
            get
            {
                return this._isUnique;
            }
            set
            {
                if ((this._isUnique != value))
                {
                    this._isUnique = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<bool> IsRequired
        {
            get
            {
                return this._isRequired;
            }
            set
            {
                if ((this._isRequired != value))
                {
                    this._isRequired = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<bool> IsEnableEditor
        {
            get
            {
                return this._isEnableEditor;
            }
            set
            {
                if ((this._isEnableEditor != value))
                {
                    this._isEnableEditor = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<int> GroupID
        {
            get
            {
                return this._groupID;
            }
            set
            {
                if ((this._groupID != value))
                {
                    this._groupID = value;
                }
            }
        }
        [DataMember]
        public string GroupName
        {
            get
            {
                return this._groupName;
            }
            set
            {
                if ((this._groupName != value))
                {
                    this._groupName = value;
                }
            }
        }
        [DataMember]
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
        [DataMember]
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

        [DataMember]
        public System.Nullable<bool> IsIncludeInPriceRule
        {
            get
            {
                return this._isIncludeInPriceRule;
            }
            set
            {
                if ((this._isIncludeInPriceRule != value))
                {
                    this._isIncludeInPriceRule = value;
                }
            }
        }

        [DataMember]
        public System.Nullable<bool> IsIncludeInPromotions
        {
            get
            {
                return this._isIncludeInPromotions;
            }
            set
            {
                if ((this._isIncludeInPromotions != value))
                {
                    this._isIncludeInPromotions = value;
                }
            }
        }

        [DataMember]
        public int DisplayOrder
        {
            get
            {
                return this._displayOrder;
            }
            set
            {
                if ((this._displayOrder != value))
                {
                    this._displayOrder = value;
                }
            }
        }

        [DataMember]
        public string NvarcharValue
        {
            get
            {
                return this._nvarcharValue;
            }
            set
            {
                if ((this._nvarcharValue != value))
                {
                    this._nvarcharValue = value;
                }
            }
        }
        [DataMember]
        public string TextValue
        {
            get
            {
                return this._textValue;
            }
            set
            {
                if ((this._textValue != value))
                {
                    this._textValue = value;
                }
            }
        }
        [DataMember]
        public string BooleanValue
        {
            get
            {
                return this._booleanValue;
            }
            set
            {
                if ((this._booleanValue != value))
                {
                    this._booleanValue = value;
                }
            }
        }
        [DataMember]
        public string IntValue
        {
            get
            {
                return this._intValue;
            }
            set
            {
                if ((this._intValue != value))
                {
                    this._intValue = value;
                }
            }
        }
        [DataMember]
        public string DateValue
        {
            get
            {
                return this._dateValue;
            }
            set
            {
                if ((this._dateValue != value))
                {
                    this._dateValue = value;
                }
            }
        }
        [DataMember]
        public string DecimalValue
        {
            get
            {
                return this._decimalValue;
            }
            set
            {
                if ((this._decimalValue != value))
                {
                    this._decimalValue = value;
                }
            }
        }
        [DataMember]
        public string FileValue
        {
            get
            {
                return this._fileValue;
            }
            set
            {
                if ((this._fileValue != value))
                {
                    this._fileValue = value;
                }
            }
        }
        [DataMember]
        public string OptionValues
        {
            get
            {
                return this._optionValues;
            }
            set
            {
                if ((this._optionValues != value))
                {
                    this._optionValues = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<int> AttributeSetID
        {
            get
            {
                return this._attributeSetID;
            }
            set
            {
                if ((this._attributeSetID != value))
                {
                    this._attributeSetID = value;
                }
            }
        }
        [DataMember]
        public System.Nullable<int> ItemTypeID
        {
            get
            {
                return this._itemTypeID;
            }
            set
            {
                if ((this._itemTypeID != value))
                {
                    this._itemTypeID = value;
                }
            }
        }

           [DataMember]
        public System.Nullable<int> TaxItemClass
        {
            get
            {
                return this._taxItemClass;
            }
            set
            {
                if ((this._taxItemClass != value))
                {
                    this._taxItemClass = value;
                }
            }
        }
           [DataMember]
           public System.Nullable<int> CurrencyID
           {
               get
               {
                   return this._currencyID;
               }
               set
               {
                   if ((this._currencyID != value))
                   {
                       this._currencyID = value;
                   }
               }
           }

           [DataMember]
           public string CurrencyCode
           {
               get
               {
                   return this._currencyCode;
               }
               set
               {
                   if ((this._currencyCode != value))
                   {
                       this._currencyCode = value;
                   }
               }
           }
        #endregion
    }
}