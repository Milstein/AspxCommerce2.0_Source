using System;
using System.Web;
using System.IO;
using SageFrame.Framework;
using AspxCommerce.Core;

public partial class Modules_AspxCommerce_GoogleCheckOut_APICallbackUrl : PageBase
{

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try
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

                string serialNumber = string.Empty; ;
                // Receive Request
                Stream requestInputStream = Request.InputStream;
                string requestStreamAsString = string.Empty; ;
                using (System.IO.StreamReader streamReader = new StreamReader(requestInputStream))
                {
                    requestStreamAsString = streamReader.ReadToEnd();
                }
                // Parse Request to retrieve serial number
                string[] requestStreamAsParts = requestStreamAsString.Split(new char[] { '=' });
                if (requestStreamAsParts.Length >= 2)
                {
                    serialNumber = requestStreamAsParts[1];
                }

               
                if (!string.IsNullOrEmpty(serialNumber))
                {
                    bool isSerialNumber = GoogleCheckOutHandler.SerialNumberExist(serialNumber.Substring(0, 15));
                    if (!isSerialNumber)
                    { 
                        // Call NotificationHistory Google Checkout API to retrieve the notification for the given serial number and process the notification(This class will be created in next step)
                        GoogleCheckoutHelper.ProcessNotification(serialNumber);
                        //serialize the message to the output stream only if you could process the message.

                        //Send Google Notification Acknowledgement
                        var response = new GCheckout.AutoGen.NotificationAcknowledgment();
                        response.serialnumber = serialNumber;
                        HttpContext.Current.Response.Clear();
                        HttpContext.Current.Response.BinaryWrite(GCheckout.Util.EncodeHelper.Serialize(response));
                        HttpContext.Current.Response.StatusCode = 200;
                    }                    

                }
            }
            catch (Exception ex)
            { ProcessException(ex); }
        }


    }








}

