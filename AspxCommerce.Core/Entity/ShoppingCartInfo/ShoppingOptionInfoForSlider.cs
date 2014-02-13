using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

[Serializable]
  public  class ShoppingOptionInfoForSlider
    {
         [DataMember]
        private int itemID;

         [DataMember]
         private decimal price;

        

        public int ItemID
        {
            get
            {
                return this.itemID;
            }
            set
            {
                if ((this.itemID != value))
                {
                    this.itemID = value;
                }
            }
        }
        public decimal Price
        {
            get
            {
                return this.price;
            }
            set
            {
                if ((this.price != value))
                {
                    this.price = value;
                }
            }
        }

    }

