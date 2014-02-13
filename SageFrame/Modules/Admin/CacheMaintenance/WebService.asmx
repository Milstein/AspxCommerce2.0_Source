<%@ WebService Language="C#" Class="WebService" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Framework;
using SageFrame.Core;
using SageFrame.Web;
using System.Collections;


/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public void ResetCache(string CashKey)
    {


        string CashKeys = CashKey.TrimEnd(',');
        char[] splitchar = { ',' };
        string[] Keys = CashKeys.Split(splitchar);
        foreach (string key in Keys)
        {
            HttpRuntime.Cache.Remove(key);
        }
    }


    [WebMethod]
    public void EnableHeavyCache(string EnableHeavyCacheKey, string DisableHeavyCacheKey, int PortalID)
    {
        //SageFrameSettingKeys.FrontMenu=
        string EnableHeavyCacheKeys = EnableHeavyCacheKey.TrimEnd(',');
        string DisableHeavyCacheKeys = DisableHeavyCacheKey.TrimEnd(',');
        char[] splitchar = { ',' };
        string[] EnableKeys = EnableHeavyCacheKeys.Split(splitchar);
        string[] DisableKeys = DisableHeavyCacheKeys.Split(splitchar);
        foreach (string enbkey in EnableKeys)
        {
            switch (enbkey)
            {
                case "FrontMenu":
                    SageFrameSettingKeys.FrontMenu = true;
                    break;
                case "SideMenu":
                    SageFrameSettingKeys.SideMenu = true;
                    break;
                case "FooterMenu":
                    SageFrameSettingKeys.FooterMenu = true;
                    break;
            }
        }
        foreach (string diskey in DisableKeys)
        {
            switch (diskey)
            {
                case "FrontMenu":
                    SageFrameSettingKeys.FrontMenu = false;
                    break;
                case "SideMenu":
                    SageFrameSettingKeys.SideMenu = false;
                    break;
                case "FooterMenu":
                    SageFrameSettingKeys.FooterMenu = false;
                    break;
            }
        }
    }
    [WebMethod]
    public List<HeavyCacheKeys> GetHeavyCacheKey(int PortalID)
    {
        List<HeavyCacheKeys> objList = new List<HeavyCacheKeys>();

        if (SageFrameSettingKeys.FrontMenu)
        {
            HeavyCacheKeys objKey = new HeavyCacheKeys();
            objKey.HeavyCacheKey = 1;
            objList.Add(objKey);
        }
        if (SageFrameSettingKeys.SideMenu)
        {
            HeavyCacheKeys objKey = new HeavyCacheKeys();
            objKey.HeavyCacheKey = 2;
            objList.Add(objKey);
        }
        if (SageFrameSettingKeys.FooterMenu)
        {
            HeavyCacheKeys objKey = new HeavyCacheKeys();
            objKey.HeavyCacheKey = 3;
            objList.Add(objKey);
        }

        return objList;
    }

    [WebMethod]
    public List<CacheKeys> GetCacheKeys()
    {
        List<CacheKeys> objList = new List<CacheKeys>();
        foreach (System.Collections.DictionaryEntry item in HttpRuntime.Cache)
        {
            if (!item.Key.ToString().Contains("."))
            {
                CacheKeys obj = new CacheKeys();
                obj.CacheKey = item.Key.ToString();
                obj.CacheValue = item.Value.ToString();
                objList.Add(obj);
            }
        }
        return objList;
    }


    #region Properties

    public class CacheKeys
    {
        public string CacheKey { get; set; }
        public string CacheValue { get; set; }
        public CacheKeys() { }
    }
    public class HeavyCacheKeys
    {
        public int HeavyCacheKey { get; set; }
        public HeavyCacheKeys() { }
    }
    #endregion

}


