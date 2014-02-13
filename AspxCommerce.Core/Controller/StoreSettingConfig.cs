using System;
using System.Collections;
using System.Web;
using System.Data;

namespace AspxCommerce.Core
{
    public class StoreSettingConfig
    {
        public StoreSettingConfig()
        {
        }

        public string GetStoreSettingsByKey(string key, int storeID, int portalID, string cultureName)
        {
            try
            {
                string strValue;
                StoreSettingProvider sep = new StoreSettingProvider();
                Hashtable hst = new Hashtable();
                if (HttpContext.Current.Cache["AspxStoreSetting"+portalID.ToString()+storeID.ToString()] != null)
                {
                    hst = (Hashtable)HttpContext.Current.Cache["AspxStoreSetting"+portalID.ToString()+storeID.ToString()];
                }
                else
                {
                    DataTable dt = sep.GetStoreSettings(storeID, portalID, cultureName); //GetSettingsByPortal();
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                        }
                    }
                }
                //need to be cleared when any key is chnaged
                HttpContext.Current.Cache.Insert("AspxStoreSetting"+portalID.ToString()+storeID.ToString(), hst);//

                strValue = hst[portalID.ToString() + storeID.ToString() + "." + key].ToString();
                return strValue;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void ResetStoreSettingKeys(int storeID, int portalID, string cultureName)
        {
            StoreSettingProvider sep = new StoreSettingProvider();
            Hashtable hst = new Hashtable();
            DataTable dt = sep.GetStoreSettings(storeID, portalID, cultureName);
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    hst.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                }
            }
            //need to be cleared when any key is chnaged
            HttpContext.Current.Cache.Insert("AspxStoreSetting" + portalID.ToString() + storeID.ToString(), hst);//
        }

    }
}
