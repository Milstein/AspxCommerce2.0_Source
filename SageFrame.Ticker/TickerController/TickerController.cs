using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Ticker.Provider;
using SageFrame.Ticker.Info;

namespace SageFrame.Ticker.TickerController
{
    public class TickerController
    {

        public void SaveTickerItem(TickerInfo objInf)
        {
            TickerProvider objP = new TickerProvider();
            objP.SaveTickerItem(objInf);
            

        }
        public TickerInfo getTickerObject(int tickID)
        {
            TickerProvider objP = new TickerProvider();
            return objP.getTickerObject(tickID);
        }


        public List<TickerInfo> GetAllTickerItem(int StoreID,int PortalID)
        {
            TickerProvider objP = new TickerProvider();
            return objP.GetAllTickerItem(StoreID,PortalID);
        }


        public static List<TickerInfo> LoadOngdvTickerData(int StoreID,int PortalID)
        {
            return TickerProvider.LoadOngdvTickerData(StoreID,PortalID);
        }


        public void DeleteTickerByID(int TickerId)
        {
            TickerProvider objP = new TickerProvider();
            objP.DeleteTickerByID(TickerId);
        }
    }
}
