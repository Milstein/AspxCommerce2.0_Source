using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using AspxCommerce.Core;
using AspxCommerce.PayPal;
using SageFrame.Framework;

public partial class Modules_AspxCommerce_PayPal_IPNHandler : PageBase
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        string selectedCurrency = string.Empty;
        string MainCurrency = string.Empty;
        try
        {
            StoreSettingConfig ssc = new StoreSettingConfig();
            MainCurrency = ssc.GetStoreSettingsByKey(StoreSetting.MainCurrency, GetStoreID, GetPortalID, GetCurrentCultureName);
            if (Session["SelectedCurrency"] != null && Session["SelectedCurrency"] != "")
            {
                selectedCurrency = Session["SelectedCurrency"].ToString();
            }
            else
            {
                selectedCurrency = MainCurrency;
            } 

            string islive = Request.Form["custom"];
            string test = string.Empty;
            const string strSandbox = "https://www.sandbox.paypal.com/cgi-bin/webscr";
            const string strLive = "https://www.paypal.com/cgi-bin/webscr";
            test = bool.Parse(islive.Split('#')[6]) ? strSandbox : strLive;

            var req = (HttpWebRequest)WebRequest.Create(test);
            //Set values for the request back
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            byte[] param = Request.BinaryRead(HttpContext.Current.Request.ContentLength);
            string strRequest = Encoding.ASCII.GetString(param);
            strRequest += "&cmd=_notify-validate";
            req.ContentLength = strRequest.Length;
            //for proxy
            //WebProxy proxy = new WebProxy(new Uri("http://url:port#"));
            //req.Proxy = proxy;
            //Send the request to PayPal and get the response
            var streamOut = new StreamWriter(req.GetRequestStream(), System.Text.Encoding.ASCII);
            streamOut.Write(strRequest);
            streamOut.Close();
            var streamIn = new StreamReader(req.GetResponse().GetResponseStream());
            string strResponse = streamIn.ReadToEnd();
            streamIn.Close();
            //string appPath = Request.PhysicalApplicationPath;
            //string filePath = appPath + "IPN.txt";
            //StreamWriter w;
            //w = File.CreateText(filePath);
            //w.WriteLine("This is a test line.");
            //w.WriteLine(islive.Split('#')[6] + "," + islive.Split('#')[1]);
            //w.Flush();
            //w.Close();
            if (strResponse == "VERIFIED")
            {
                string payerEmail = Request.Form["payer_email"];
                string paymentStatus = Request.Form["payment_status"];
                string receiverEmail = Request.Form["receiver_email"];
                string amount = Request.Form["mc_gross"];
                string invoice = Request.Form["invoice"];
                string addressName = Request.Form["address_name"];
                string addressStreet = Request.Form["address_street"];
                string addressCity = Request.Form["address_city"];
                string addressZip = Request.Form["address_zip"];
                string addressCountry = Request.Form["address_country"];
                string transID = Request.Form["txn_id"];
                string custom = Request.Form["custom"];
             
                string[] ids = custom.Split('#');
                int orderID = int.Parse(ids[0]);
                int storeID = int.Parse(ids[1]);
                int portalID = int.Parse(ids[2]);
                string userName = ids[3];
                int customerID = int.Parse(ids[4]);
                string sessionCode = ids[5];
                string pgid = ids[7];

                var tinfo = new TransactionLogInfo();
                var tlog = new TransactionLog();

                tinfo.TransactionID = transID;
                tinfo.AuthCode = "";
                tinfo.TotalAmount = decimal.Parse(amount);
                tinfo.ResponseCode = "1";
                tinfo.ResponseReasonText = "";
                tinfo.OrderID = orderID;
                tinfo.StoreID = storeID;
                tinfo.PortalID = portalID;
                tinfo.AddedBy = userName;
                tinfo.CustomerID = customerID;
                tinfo.SessionCode = sessionCode;
                tinfo.PaymentGatewayID = int.Parse(pgid);
                tinfo.PaymentStatus = paymentStatus;
                tinfo.PayerEmail = payerEmail;
                tinfo.CreditCard = "";
                tinfo.RecieverEmail = receiverEmail;
                tinfo.CurrencyCode = selectedCurrency;
                tlog.SaveTransactionLog(tinfo);
              

                if (paymentStatus.Equals("Completed"))
                {
                    //string appPath = Request.PhysicalApplicationPath;
                    //string filePath = appPath + "IPN.txt";
                    //StreamWriter w;
                    //w = File.CreateText(filePath);
                    //w.WriteLine("This is a test line.");
                    //w.WriteLine(payerEmail + " " + paymentStatus + " " + amount);
                    //w.WriteLine("This 2nd.");
                    //w.Flush();
                    //w.Close();
                    var paypalobj = new PayPalHandler();
                    paypalobj.ParseIPN(orderID, transID, paymentStatus, storeID, portalID, userName, customerID, sessionCode);
                    // PayPalHandler.UpdateItemQuantity(itemReduce, coupon, storeID, portalID, userName);
                }
              

            }
            else if (strResponse == "INVALID")
            {
                //log for manual investigation
            }
            else
            {
                //log response/ipn data for manual investigation
            }
            // }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
          //  throw new Exception("This Page is not accessible!");
        }
    }


}
