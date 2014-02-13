using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

 namespace AspxCommerce.Core
{
    [Serializable]
    [DataContract]
    public class Filter
    {

        [DataMember(Name = "_itemID", Order = 0)]
        private int _itemID;

        [DataMember(Name = "_attributeID", Order = 1)]
        private string _attributeID;

        [DataMember(Name = "_attributeName", Order = 2)]
        private string _attributeName;

        [DataMember(Name = "_attributeValue", Order = 3)]
        private string _attributeValue;

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

        public string AttributeID
        {
            get
            {
                return _attributeID;
            }
            set
            {
                if (this._attributeID != value)
                {
                    _attributeID = value;
                }
            }

        }

        public string AttributeName
        {
            get
            {
                return _attributeName;
            }
            set
            {
                if (this._attributeName != value)
                {
                    _attributeName = value;
                }
            }
        }

        public string AttributeValue
        {
            get
            {
                return _attributeValue;
            }
            set
            {
                if (this._attributeValue != value)
                {
                    _attributeValue = value;
                }
            }
        }
    }
}
