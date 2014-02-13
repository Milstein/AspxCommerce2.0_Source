using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
   public class CartExistInfo
    {
       public  CartExistInfo()
       {
           
       }
       public bool CartStatus{get; set; }
       public decimal CartSubTotal { get; set; }
    }

    public class UpdateCartInfo
    {
        public int CartID { get; set; }
        public string CartItemIDs { get; set; }
        public string Quantities { get; set; }
        public string AllowOutOfStock { get; set; }
    }

}
