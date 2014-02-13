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
using System.Threading;
#endregion

namespace SageFrame.Scheduler
{
    public abstract class TaskBase
    {
        public event TaskStarted ScheduleStarted;
        public event TaskProcessing ScheduleProcessing;
        public event TaskCompleted ScheduleCompleted;
        public event TaskErrored ScheduleErrored;
        public ScheduleHistory TaskRecordItem { get; set; }
        public string Status { get; set; }
        public abstract void Execute();

        public TaskBase()
        {
            this.TaskRecordItem = new ScheduleHistory();
        }

        public TaskBase(ScheduleHistory scheduleHistory)
        {
            this.TaskRecordItem = scheduleHistory;
        }

        public void Started()
        {
            if (ScheduleStarted != null)
            {
                try
                {
                    ScheduleStarted(this);
                }
                catch (Exception)
                {

                }
            }
        }


        public void Processing()
        {
            if (ScheduleProcessing != null)
            {
                ScheduleProcessing(this);
            }
        }

        public void Completed()
        {

            if (ScheduleCompleted != null)
            {
                ScheduleCompleted(this);
            }
        }


        public void Error(ref Exception exc)
        {
            if (ScheduleErrored != null)

                ScheduleErrored(this, exc);
        }


    }
}
