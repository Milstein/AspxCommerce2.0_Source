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
using System.Web.Compilation;
#endregion

namespace SageFrame.Scheduler
{
    public class TaskGroup
    {
        //''''''''''''''''''''''''''''''''''''''''''''''''''
        //This class represents a process group for
        //our threads to run in.
        //''''''''''''''''''''''''''''''''''''''''''''''''''
        #region Delegates

        public delegate void CompletedEventHandler();

        #endregion

        private static int numberOfProcessesInQueue;
        private static int numberOfProcesses;
        private static int processesCompleted;
        private static int ticksElapsed;

        private static int GetTicksElapsed
        {
            get
            {
                return ticksElapsed;
            }
        }

        private static int GetProcessesCompleted
        {
            get
            {
                return processesCompleted;
            }
        }

        private static int GetProcessesInQueue
        {
            get
            {
                return numberOfProcessesInQueue;
            }
        }

        public event CompletedEventHandler Completed;

        public void Run(ScheduleHistory objScheduleHistory)
        {
            TaskBase Process = null;
            try
            {
                //This is called from RunPooledThread()
                ticksElapsed = Environment.TickCount - ticksElapsed;
                Process = GetTaskBase(objScheduleHistory.FullNamespace, objScheduleHistory);
                Process.TaskRecordItem = objScheduleHistory;

                //Set up the handlers for the CoreScheduler
                Process.ScheduleStarted += Scheduler.TaskStarted;
               // Process.ScheduleProcessing += Scheduler.CoreScheduler.WorkProgressing;
                Process.ScheduleCompleted += Scheduler.TaskCompleted;
                Process.ScheduleErrored += Scheduler.TaskErrored;
                //This kicks off the DoWork method of the class
                //type specified in the configuration.

                Process.Started();
                try
                {
                    Process.TaskRecordItem.Status = false;
                    Process.Execute();
                }
                catch (Exception exc)
                {
                    //in case the scheduler client
                    //didn't have proper exception handling
                    //make sure we fire the Errored event
                  

                    if (Process != null)
                    {
                        if (Process.TaskRecordItem != null)
                        {
                            Process.TaskRecordItem.Status = false;
                        }
                        Process.Error(ref exc);
                    }
                }
                if (Process.TaskRecordItem.Status ==true)
                {
                    Process.Completed();
                }

                //If all processes in this ProcessGroup have
                //completed, set the ticksElapsed and raise
                //the Completed event.
                //I don't think this is necessary with the
                //other events.  I'll leave it for now and
                //will probably take it out later.

                if (processesCompleted == numberOfProcesses)
                {
                    if (processesCompleted == numberOfProcesses)
                    {
                        ticksElapsed = Environment.TickCount - ticksElapsed;
                        if (Completed != null)
                        {
                            Completed();
                        }
                    }
                }
            }
            catch (Exception exc)
            {
                //in case the scheduler client
                //didn't have proper exception handling
                //make sure we fire the Errored event
                if (Process != null)
                {
                    if (Process.TaskRecordItem != null)
                    {
                        Process.TaskRecordItem.Status= false;
                    }
                    Process.Error(ref exc);
                }
            }
            finally
            {
                //Track how many processes have completed for
                //this instanciation of the ProcessGroup
                numberOfProcessesInQueue -= 1;
                processesCompleted += 1;
            }
        }

        private TaskBase GetTaskBase(string strProcess, ScheduleHistory objScheduleHistory)
        {
            //This is a method to encapsulate returning
            //an object whose class inherits TaskBase.
            Type t = BuildManager.GetType(strProcess, true, true);
            var param = new ScheduleHistory[1];
            param[0] = objScheduleHistory;
            var types = new Type[1];

            //Get the constructor for the Class
            types[0] = typeof(ScheduleHistory);
            System.Reflection.ConstructorInfo objConstructor;
            objConstructor = t.GetConstructor(types);
                       
            TaskBase taskBase = null;
            if (objConstructor != null)
            {
                taskBase = (TaskBase)objConstructor.Invoke(param);
            }

            return taskBase;
        }

        //This subroutine is callback for Threadpool.QueueWorkItem.  This is the necessary
        //subroutine signature for QueueWorkItem, and Run() is proper for creating a Thread
        //so the two subroutines cannot be combined, so instead just call Run from here.
        private void RunPooledThread(object objScheduleHistory)
        {
            Run((ScheduleHistory)objScheduleHistory);
        }

        //Add a queue request to Threadpool with a 
        //callback to RunPooledThread which calls Run()
        public void AddQueueUserWorkItem(Schedule s)
        {
            numberOfProcessesInQueue += 1;
            numberOfProcesses += 1;
            var obj = new ScheduleHistory(s);
            try
            {
                //Create a callback to subroutine RunPooledThread
                WaitCallback callback = RunPooledThread;
                //And put in a request to ThreadPool to run the process.
                ThreadPool.QueueUserWorkItem(callback, obj);
                Thread.Sleep(1000);
            }
            catch (Exception exc)
            {
                ErrorLogger.log(s, exc, "AddQueueUserWorkItem");
            }
        }







    }
}