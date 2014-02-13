using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Ticker.Info;
using SageFrame.Web.Utilities;

namespace SageFrame.Ticker.Provider
{
    public class TickerProvider
    {
        public void SaveTickerItem(TickerInfo objInf)
        {
            List<KeyValuePair<string, object>> Parameter = new List<KeyValuePair<string, object>>();
            Parameter.Add(new KeyValuePair<string, object>("@TickerNews", objInf.TickerNews));
            Parameter.Add(new KeyValuePair<string, object>("@StartDate", objInf.StartDate));
            Parameter.Add(new KeyValuePair<string, object>("@EndDate", objInf.EndDate));
            Parameter.Add(new KeyValuePair<string, object>("@AddedBy", objInf.AddedBy));
            Parameter.Add(new KeyValuePair<string, object>("@UpdatedBy", objInf.UpdatedBy));
            Parameter.Add(new KeyValuePair<string, object>("@PortalID", objInf.PortalID));
            Parameter.Add(new KeyValuePair<string, object>("@StoreID", objInf.StoreID));
            Parameter.Add(new KeyValuePair<string, object>("@IsActive", objInf.IsActive));
            Parameter.Add(new KeyValuePair<string, object>("@TickerID", objInf.TickerID));
            SQLHandler sqlH = new SQLHandler();
            sqlH.ExecuteNonQuery("usp_TickerSaveItem", Parameter);

        }

        public TickerInfo getTickerObject(int tickerID)
        {
            List<KeyValuePair<string, object>> Parameter = new List<KeyValuePair<string, object>>();
            Parameter.Add(new KeyValuePair<string, object>("@tickerID", tickerID));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsObject<TickerInfo>("[usp_TickerGetByTickerID]", Parameter);
        }

        public List<TickerInfo> GetAllTickerItem(int StoreID, int PortalID)
        {
            List<KeyValuePair<string, object>> Parameter = new List<KeyValuePair<string, object>>();
            Parameter.Add(new KeyValuePair<string, object>("@StoreID", StoreID));
            Parameter.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            SQLHandler sqlH = new SQLHandler();
            return sqlH.ExecuteAsList<TickerInfo>("usp_TickerGetAllTickerItems", Parameter);
        }

        public static List<TickerInfo> LoadOngdvTickerData(int StoreID,int PortalID)
        {
            List<KeyValuePair<string, object>> Parameter = new List<KeyValuePair<string, object>>();
            Parameter.Add(new KeyValuePair<string, object>("@StoreID", StoreID));
            Parameter.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
            SQLHandler sqlHand = new SQLHandler();
            return sqlHand.ExecuteAsList<TickerInfo>("usp_TickerLoadData",Parameter);
        }


        public void DeleteTickerByID(int TickerID)
        {
            try
            {
                List<KeyValuePair<string, object>> Parameter = new List<KeyValuePair<string, object>>();
                Parameter.Add(new KeyValuePair<string, object>("@TickerID", TickerID));
                SQLHandler sqlH = new SQLHandler();
                sqlH.ExecuteNonQuery("usp_TickerDeleteByTickerID", Parameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

    }
}
