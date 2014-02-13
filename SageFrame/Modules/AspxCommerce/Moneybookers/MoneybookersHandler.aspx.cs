using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using AspxCommerce.Core;
using AspxCommerce.Moneybookers;
using SageFrame.Framework;
using SageFrame.Web;

public partial class Modules_AspxCommerce_Moneybookers_MoneybookersHandler : PageBase
{
    string status, MainCurrency, selectedCurrency=string.Empty ;
  
    protected void Page_Load(object sender, EventArgs e)
    {
        
            //StreamWriter ss = new StreamWriter(Server.MapPath("~/POST.txt"));
            //ss.WriteLine("POST");
            //ss.WriteLine("Total=" + Request.Form.Count);

            //foreach (var formvalue in Request.Form)
            //{
            //    ss.Write(formvalue);
            //    ss.Write("=");
            //    ss.WriteLine(Request.Form[formvalue.ToString()]);

            //}

            //ss.Close();

            //Get transaction currency code
      
        //string paymentStatus = Request.Form["status"];
        if (Request.Form["transaction_id"] != null)
        {
            string receiverEmail = Request.Form["pay_to_email"];
            string amount = Request.Form["amount"];
            string transID = Request.Form["transaction_id"];
            string custom = Request.Form["field1"];
            string itemFields = Request.Form["field2"];
            string responsereason = Request.Form["failed_reason_code"];
            string[] ids = custom.Split('#');
            int orderID = int.Parse(ids[0].ToString());
            int storeID = int.Parse(ids[1].ToString());
            int portalID = int.Parse(ids[2].ToString());
            string userName = ids[3].ToString();
            int customerID = int.Parse(ids[4].ToString());
            string sessionCode = ids[5].ToString();
            string pgid = ids[7].ToString();
             selectedCurrency = ids[8].ToString();

            string itemids = itemFields.Split('#')[0];
            string couponCode = itemFields.Split('#')[1];


            MoneybookersWCFService pw = new MoneybookersWCFService();
            List<MoneybookersSettingInfo> sf;
            sf = pw.GetAllMoneybookersSetting(int.Parse(pgid), storeID, portalID);
            string secretCode = sf[0].MoneybookersSecretWord.Trim();
            string merchantAccount = sf[0].MoneybookersMerchantAccount.Trim();
            // Validate the Moneybookers signature
            string concatFields = Request.Form["merchant_id"]
                                  + Request.Form["transaction_id"]
                                  + StringToMD5(secretCode)
                                  + Request.Form["mb_amount"]
                                  + Request.Form["mb_currency"]
                                  + Request.Form["status"];


            string MBEmail = merchantAccount;///MerchantEmail

            // Ensure the signature is valid, the status code == 2      

            string payerEmail = Request.Form["pay_from_email"];

            if (Request.Form["status"] == "2")
            {
                status = "Processed";
            }
            if (Request.Form["status"] == "1")
            {
                status = "Scheduled";
            }
            if (Request.Form["status"] == "0")
            {
                status = "Pending";
            }
            if (Request.Form["status"] == "-1")
            {
                status = "Cancelled";
            }
            if (Request.Form["status"] == "-2")
            {
                status = "Declined";
            }
            if (Request.Form["status"] == "-3")
            {
                status = "Chargeback";
            }

            TransactionLogInfo tinfo = new TransactionLogInfo();
            TransactionLog Tlog = new TransactionLog();

            tinfo.TransactionID = transID;
            tinfo.AuthCode = Request.Form["status"];
            tinfo.TotalAmount = decimal.Parse(amount);
            tinfo.ResponseCode = Request.Form["status"];
            responsereason = status;
            tinfo.ResponseReasonText = responsereason;
            tinfo.OrderID = orderID;
            tinfo.StoreID = storeID;
            tinfo.PortalID = portalID;
            tinfo.AddedBy = userName;
            tinfo.CustomerID = customerID;
            tinfo.SessionCode = sessionCode;
            tinfo.PaymentGatewayID = int.Parse(pgid);
            tinfo.PaymentStatus = status;
            tinfo.PayerEmail = payerEmail;
            tinfo.CreditCard = "";
            tinfo.RecieverEmail = receiverEmail;
            tinfo.CurrencyCode = selectedCurrency;
            Tlog.SaveTransactionLog(tinfo);

            if (Request.Form["md5sig"] == StringToMD5(concatFields) && Request.Form["status"] == "2" && Request.Form["pay_to_email"] == MBEmail)
            {
                // Valid transaction.
                // update order status 
                MoneybookersHandler.ParseIPN(orderID, transID, status, storeID, portalID, userName, customerID, sessionCode);
                MoneybookersHandler.UpdateItemQuantity(itemids, couponCode, storeID, portalID, userName);
                CartManageSQLProvider cms = new CartManageSQLProvider();
                AspxCommonInfo aspxCommonObj = new AspxCommonInfo();
                aspxCommonObj.CustomerID = customerID;
                aspxCommonObj.SessionCode = sessionCode;
                aspxCommonObj.StoreID = storeID;
                aspxCommonObj.PortalID = portalID;
                aspxCommonObj.CultureName = null;
                aspxCommonObj.UserName = null;
                cms.ClearCartAfterPayment(aspxCommonObj);

            }
            else
            {
                // Invalid transaction. Bail out
                // Response.Write("Invalid Transaction");           

            }
        }
    }


    static string StringToMD5(string str)
    {
        MD5CryptoServiceProvider cryptHandler = new MD5CryptoServiceProvider();
        byte[] ba = cryptHandler.ComputeHash(Encoding.UTF8.GetBytes(str));

        StringBuilder hex = new StringBuilder(ba.Length * 2);

        foreach (byte b in ba)
            hex.AppendFormat("{0:X2}", b);

        return hex.ToString();
    }

}
