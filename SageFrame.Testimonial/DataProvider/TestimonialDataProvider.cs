using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Testimonial.Info;
using System.Data.SqlClient;
using SageFrame.Web;
using System.Data;
using SageFrame.Web.Utilities;
using SageFrame.Common.CommonFunction;

namespace SageFrame.Testimonial.DataProvider
{
    public class TestimonialDataProvider
    {
        public static void SaveRecord(TestimonialInfo objInfo)
        {
            try
            {
                SqlConnection SqlConn = new SqlConnection(SystemSetting.SageFrameConnectionString);
                SqlCommand SqlCmd = new SqlCommand();

                SqlCmd.Connection = SqlConn;
                SqlCmd.CommandText = "usp_TestimonialAddRecord";
                SqlCmd.CommandType = CommandType.StoredProcedure;
                SqlCmd.Parameters.Add(new SqlParameter("@TestimonialID", objInfo.TestimonialID));
                SqlCmd.Parameters.Add(new SqlParameter("@PortalID", objInfo.PortalID));
                SqlCmd.Parameters.Add(new SqlParameter("@UserModuleID", objInfo.UserModuleID));
                SqlCmd.Parameters.Add(new SqlParameter("@UserName", objInfo.UserName));
                SqlCmd.Parameters.Add(new SqlParameter("@Address", objInfo.Address));
                SqlCmd.Parameters.Add(new SqlParameter("@WebUrl", objInfo.WebUrl));
                SqlCmd.Parameters.Add(new SqlParameter("@Image", objInfo.Image));
                SqlCmd.Parameters.Add(new SqlParameter("@Title", objInfo.Title));
                SqlCmd.Parameters.Add(new SqlParameter("@TestimonialDate", objInfo.TestimonialDate));
                SqlCmd.Parameters.Add(new SqlParameter("@Testimonial", objInfo.Testimonial));
                SqlCmd.Parameters.Add(new SqlParameter("@AddedBy", objInfo.AddedBy));

                SqlConn.Open();
                SqlCmd.ExecuteNonQuery();
                SqlConn.Close();
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public TestimonialSettingInfo GetSetting(int PortalID, int UserModuleID)
        {

            List<KeyValuePair<string, object>> paramCol = new List<KeyValuePair<string, object>>();
            paramCol.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            paramCol.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
            SQLHandler sageSQL = new SQLHandler();
            return sageSQL.ExecuteAsObject<TestimonialSettingInfo>("[usp_TestimonialGetSetting]", paramCol);
        }

        public void SaveSetting(string Key, string value, int UserModuleID, string AddedBy, string UpdatedBy, int PortalID)
        {
            try
            {
                SqlConnection SQLConn = new SqlConnection(SystemSetting.SageFrameConnectionString);
                SqlCommand SQLCmd = new SqlCommand();
                SQLCmd.Connection = SQLConn;
                SQLCmd.CommandText = "[dbo].[usp_TestimonialSettingUpdate]";
                SQLCmd.CommandType = CommandType.StoredProcedure;
                SQLCmd.Parameters.Add(new SqlParameter("@SettingKey", Key));
                SQLCmd.Parameters.Add(new SqlParameter("@SettingValue", value));
                SQLCmd.Parameters.Add(new SqlParameter("@Updatedby", UpdatedBy));
                SQLCmd.Parameters.Add(new SqlParameter("@AddedBy", AddedBy));
                SQLCmd.Parameters.Add(new SqlParameter("@UserModuleID", UserModuleID));
                SQLCmd.Parameters.Add(new SqlParameter("@PortalID", PortalID));
                SQLConn.Open();
                SQLCmd.ExecuteNonQuery();
                SQLConn.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<TestimonialInfo> GetTestData(int PortalID, int UserModuleID, bool IsSlider)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@IsSlider", IsSlider));
                SQLHandler SQLH = new SQLHandler();
                SqlDataReader reader;
                reader = SQLH.ExecuteAsDataReader("[dbo].[usp_TestimonialGetData]", ParaMeterCollection);
                List<TestimonialInfo> Userinfo = new List<TestimonialInfo>();
                while (reader.Read())
                {
                    TestimonialInfo obj = new TestimonialInfo();
                    obj.TestimonialID = Convert.ToInt32(reader["TestimonialID"].ToString());
                    obj.UserName = reader["UserName"].ToString();
                    obj.Address = reader["Address"].ToString();
                    obj.WebUrl = reader["WebUrl"].ToString();
                    obj.Title = reader["Title"].ToString();
                    obj.Image = reader["Image"].ToString();
                    obj.Testimonial = reader["Testimonial"].ToString();
                    obj.AddedBy = reader["AddedBy"].ToString();
                    obj.AddedOn = reader["AddedOn"].ToString();
                    Userinfo.Add(obj);
                }
                return Userinfo;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<TestimonialInfo> GetTestDetailData(int PortalID, int UserModuleID, bool IsSlider)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@IsSlider", IsSlider));
                SQLHandler SQLH = new SQLHandler();
                SqlDataReader reader;
                reader = SQLH.ExecuteAsDataReader("[dbo].[usp_TestimonialGetDetailData]", ParaMeterCollection);
                List<TestimonialInfo> Userinfo = new List<TestimonialInfo>();
                while (reader.Read())
                {
                    TestimonialInfo obj = new TestimonialInfo();
                    obj.TestimonialID = Convert.ToInt32(reader["TestimonialID"].ToString());
                    obj.UserName = reader["UserName"].ToString();
                    obj.Address = reader["Address"].ToString();
                    obj.WebUrl = reader["WebUrl"].ToString();
                    obj.Title = reader["Title"].ToString();
                    obj.Image = reader["Image"].ToString();
                    obj.Testimonial = reader["Testimonial"].ToString();
                    obj.AddedBy = reader["AddedBy"].ToString();
                    obj.AddedOn = reader["AddedOn"].ToString();
                    Userinfo.Add(obj);
                }
                return Userinfo;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<TestimonialInfo> GetSelectedList(int PortalID, int UserModuleID, int NoOfList, bool IsSlider)
        {
            try
            {
                string ShortDesc = string.Empty;
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoOfList", NoOfList));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@IsSlider", IsSlider));
                SQLHandler SQLH = new SQLHandler();
                SqlDataReader reader;
                reader = SQLH.ExecuteAsDataReader("[dbo].[usp_TestimonialGetSelectedData]", ParaMeterCollection);
                List<TestimonialInfo> Userinfo = new List<TestimonialInfo>();
                while (reader.Read())
                {
                    TestimonialInfo obj = new TestimonialInfo();
                    obj.TestimonialID = Convert.ToInt32(reader["TestimonialID"].ToString());
                    obj.UserName = reader["UserName"].ToString();
                    obj.Address = reader["Address"].ToString();
                    obj.WebUrl = reader["WebUrl"].ToString();
                    obj.Title = reader["Title"].ToString();
                    obj.Image = reader["Image"].ToString();
                    obj.Testimonial = reader["Testimonial"].ToString();
                    ShortDesc = HTMLHelper.StripTagsRegex(reader["Testimonial"].ToString());
                    obj.Testimonial = ShortDesc.ToString(); 
                    obj.AddedBy = reader["AddedBy"].ToString();
                    obj.AddedOn = reader["AddedOn"].ToString();
                    Userinfo.Add(obj);
                }
                return Userinfo;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<TestimonialInfo> LoadRecordsOnGrid(int PortalID, int UserModuleID)
        {
            try
            {
                string TestmonialDesc = string.Empty;
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                SQLHandler SQLH = new SQLHandler();
                SqlDataReader reader;
                reader = SQLH.ExecuteAsDataReader("[dbo].[usp_TestimonialGetRecord]", ParaMeterCollection);
                List<TestimonialInfo> Userinfo = new List<TestimonialInfo>();
                while (reader.Read())
                {
                    TestimonialInfo obj = new TestimonialInfo();
                    obj.TestimonialID = Convert.ToInt32(reader["TestimonialID"]);
                    obj.UserName = reader["UserName"].ToString();
                    obj.Address = reader["Address"].ToString();
                    obj.WebUrl = reader["WebUrl"].ToString();                    
                    obj.Image = reader["Image"].ToString();  
                    obj.Testimonial = HTMLHelper.StripTagsRegex(reader["Testimonial"].ToString());
                    obj.AddedBy = reader["AddedBy"].ToString();
                    obj.AddedOn = reader["AddedOn"].ToString();
                    Userinfo.Add(obj);
                }
                return Userinfo;
            }
            catch (Exception ex)
            {
                throw (ex);
            }         
        }

        public static void DeleteRecordByID(int OperationID)
        {
            try
            {
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@OperationID", OperationID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("usp_TestimonialDeleteRecordByID", Param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static TestimonialInfo GetImage(int OperationID, int PortalID,int UserModuleID )
        {
            try
            {
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@OperationID", OperationID));
                Param.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                Param.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                SQLHandler SQLH = new SQLHandler();
                return SQLH.ExecuteAsObject<TestimonialInfo>("usp_TestimonialGetImageByID", Param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static TestimonialInfo GetRecordByID(int OperationID, int PortalID,int UserModuleID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@OperationID", OperationID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                SQLHandler SQLH = new SQLHandler();
                return SQLH.ExecuteAsObject<TestimonialInfo>("usp_TestimonialGetRecordByID", ParaMeterCollection);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

    }
}
