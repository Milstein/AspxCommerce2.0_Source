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
using System.Runtime.Serialization;
#endregion

namespace SageFrame.Scheduler
{
    [DataContract]
    [Serializable]
    public class ScheduleHistoryView
    {
        [DataMember(Name = "RowTotal", Order = 1)]
        public System.Nullable<int> RowTotal { get; set; }



        [DataMember(Name = "ScheduleHistoryID", Order = 2)]
        public System.Nullable<int> ScheduleHistoryID { get; set; }

        [DataMember(Name = "ScheduleID", Order = 3)]
        public System.Nullable<int> ScheduleID { get; set; }

        [DataMember(Name = "StartDate", Order = 4)]
        public System.Nullable<DateTime> StartDate { get; set; }

        [DataMember(Name = "EndDate", Order = 5)]
        public System.Nullable<DateTime> EndDate { get; set; }

        [DataMember(Name = "Status", Order = 6)]
        public System.Nullable<bool> Status { get; set; }

        [DataMember(Name = "ReturnText", Order = 7)]
        public String ReturnText { get; set; }

        [DataMember(Name = "Server", Order = 8)]
        public string Server { get; set; }

        [DataMember(Name = "NextStart", Order = 9)]
        public System.Nullable<DateTime> NextStart { get; set; }
    }
}
