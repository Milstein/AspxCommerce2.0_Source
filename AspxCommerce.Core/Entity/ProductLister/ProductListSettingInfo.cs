using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
    public class ProductListSettingInfo
    {
        public ProductListSettingInfo()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        private int _count;
        [DataMember]
        public int ProductCount
        {
            get { return _count; }
            set { _count = value; }
        }
    }
}