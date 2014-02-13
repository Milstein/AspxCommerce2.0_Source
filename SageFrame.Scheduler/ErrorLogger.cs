#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2012 by SageFrame
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
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Web.Hosting;
using System.Web;
using SageFrame.Web;
#endregion

namespace SageFrame.Scheduler
{
    class ErrorLogger
    {

        private static ErrorLogger instance;
        static readonly object obj = new object();
        private ErrorLogger()
        {

        }

        public static ErrorLogger GetInstance()
        {
            if (instance == null)
                instance = new ErrorLogger();

            return instance;
        }
        public static void SchedulerProcessException(Exception exc)
        {

            string strIPaddress = string.Empty;
            string strPageUrl = string.Empty;
            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.UserHostAddress != string.Empty)
            {
                strIPaddress = HttpContext.Current.Request.UserHostAddress;
            }

            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.RawUrl != string.Empty)
            {
                strPageUrl = HttpContext.Current.Request.RawUrl;
            }
            SageFrameConfig sfConfig = new SageFrameConfig();
            SchedulerController.AddSchedulerException(11, 11, exc.Message, exc.ToString(),
                 strIPaddress, strPageUrl, true, sfConfig.GetPortalID, sfConfig.GetUsername);


        }

        public static void log(ScheduleHistory history, Exception e, string methodName)
        {
            string location = HostingEnvironment.ApplicationPhysicalPath; //HostingEnvironment.ApplicationPhysicalPath
            string fileDirectory = Path.Combine(location, "ErrorLog");
            if (!Directory.Exists(fileDirectory))
            {
                Directory.CreateDirectory(fileDirectory);
            }
            string path = fileDirectory + "/ScheduleHistoryExceptionLog.txt";

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                lock (obj)
                {
                    writer.WriteLine(history.FullNamespace + "----- CurrentDate:" + DateTime.Now + "-----StartDate" + history.HistoryStartDate + "-----EndDate" + history.HistoryEndDate);
                    writer.WriteLine("Error Message" + e.Message.ToString() + "-----Error Source" + e.Source.ToString() + "-----Target Site" + e.TargetSite.ToString());
                    writer.WriteLine("Method Name :-" + methodName + "----------------------------------------------------------------------------------");
                }
            }

        }


        public static void log(Schedule schedule, Exception e, string methodName)
        {
            string location = HostingEnvironment.ApplicationPhysicalPath; //HostingEnvironment.ApplicationPhysicalPath
            string fileDirectory = Path.Combine(location, "ErrorLog");
            if (!Directory.Exists(fileDirectory))
            {
                Directory.CreateDirectory(fileDirectory);
            }
            string path = fileDirectory + "/SchedularExceptionLog.txt";

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                lock (obj)
                {
                    writer.WriteLine(schedule.FullNamespace + "----- CurrentDate:" + DateTime.Now + "-----EndDate" + schedule.EndDate);
                    writer.WriteLine("Error Message" + e.Message.ToString() + "-----Error Source" + e.Source.ToString() + "-----Target Site" + e.TargetSite.ToString());
                    writer.WriteLine("Method Name :-" + methodName + "----------------------------------------------------------------------------------");
                }
            }

        }


        public static void log(Exception e, string methodName)
        {
            string location = HostingEnvironment.ApplicationPhysicalPath; //HostingEnvironment.ApplicationPhysicalPath
            string fileDirectory = Path.Combine(location, "ErrorLog");
            if (!Directory.Exists(fileDirectory))
            {
                Directory.CreateDirectory(fileDirectory);
            }
            string path = fileDirectory + "/ExceptionLog.txt";

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                lock (obj)
                {
                    writer.WriteLine("Error Message" + e.Message.ToString() + "----- CurrentDate:" + DateTime.Now + "-----Error Source" + e.Source.ToString() + "-----Target Site" + e.TargetSite.ToString());
                    writer.WriteLine("Method Name :-" + methodName + "----------------------------------------------------------------------------------");
                }
            }

        }


    }
}
