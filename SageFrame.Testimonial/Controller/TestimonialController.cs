using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Testimonial.Info;
using SageFrame.Testimonial.DataProvider;
using System.Data.SqlClient;

namespace SageFrame.Testimonial.Controller
{
    public class TestimonialController
    {
        public void SaveRecord(TestimonialInfo obj)
        {
            try
            {
                TestimonialDataProvider.SaveRecord(obj);
            }
            catch
            {
                throw;
            }
        }

        public TestimonialSettingInfo GetSetting(int PortalID, int UserModuleID)
        {           
            TestimonialDataProvider dp = new TestimonialDataProvider();         
            return (dp.GetSetting(PortalID,UserModuleID));
        }

        public void SaveSetting(string Key, string value, int UserModuleID, string AddedBy, string UpdatedBy, int PortalID)
        {
            try
            {
                TestimonialDataProvider Tpd = new TestimonialDataProvider();
                Tpd.SaveSetting(Key, value, UserModuleID, AddedBy, UpdatedBy, PortalID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteRecordByID(int OperationID)
        {
            TestimonialDataProvider.DeleteRecordByID(OperationID);
        }

        public List<TestimonialInfo> GetTestData(int PortalID, int UserModuleID, bool IsSlider)
        {
            try
            {
                TestimonialDataProvider dp = new TestimonialDataProvider();
                List<TestimonialInfo> obj = new List<TestimonialInfo>();
                obj = dp.GetTestData(PortalID, UserModuleID, IsSlider);
                return obj;
            }
            catch
            {
                throw;
            }
        }

        public List<TestimonialInfo> GetTestDetailData(int PortalID, int UserModuleID, bool IsSlider)
        {
            try
            {
                TestimonialDataProvider dp = new TestimonialDataProvider();
                List<TestimonialInfo> obj = new List<TestimonialInfo>();
                obj = dp.GetTestDetailData(PortalID, UserModuleID, IsSlider);
                return obj;
            }
            catch
            {
                throw;
            }
        }

        public List<TestimonialInfo> GetSelectedTestData(int PortalID, int UserModuleID, int NoOfList, bool IsSlider)
        {
            try
            {
                TestimonialDataProvider dp = new TestimonialDataProvider();
                List<TestimonialInfo> obj = new List<TestimonialInfo>();
                obj = dp.GetSelectedList(PortalID, UserModuleID, NoOfList, IsSlider);
                return obj;
            }
            catch
            {
                throw;
            }
        }

        public List<TestimonialInfo> LoadRecordsOnGrid(int PortalID, int UserModuleID)
        {
            try
            {
                TestimonialDataProvider dp = new TestimonialDataProvider();
                List<TestimonialInfo> obj = new List<TestimonialInfo>();
                obj = dp.LoadRecordsOnGrid(PortalID, UserModuleID);
                return obj;
            }
            catch
            {
                throw;
            }
        }


        public TestimonialInfo GetRecordByID(int OperationID,int PortalID,int UserModuleID)
        {
            try
            {
                return TestimonialDataProvider.GetRecordByID(OperationID, PortalID, UserModuleID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public TestimonialInfo GetImage(int OperationID,int PortalID,int UserModuleID)
        {
            try
            {
                return TestimonialDataProvider.GetImage(OperationID, PortalID, UserModuleID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
