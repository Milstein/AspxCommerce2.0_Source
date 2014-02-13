<%@ WebService Language="C#" Class="PagesWebService" %>
using System;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using SageFrame.Security.Entities;
using SageFrame.Security;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using SageFrame.Pages;
using SageFrame.MenuManager;
using System.IO;
using SageFrame.Templating;
using SageFrame.Common;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]

public class PagesWebService : System.Web.Services.WebService
{

    public PagesWebService()
    {
    }
    [WebMethod]
    public List<RoleInfo> GetPortalRoles(int PortalID, string UserName)
    {

        RoleController _role = new RoleController();
        return (_role.GetPortalRoles(PortalID, 1, UserName));
    }

    [WebMethod]
    public List<MenuManagerInfo> GetAllMenu(string UserName, int PortalID)
    {
        List<MenuManagerInfo> minfo = MenuManagerDataController.GetMenuList(UserName, PortalID);
        return (minfo);
    }

    [WebMethod]
    public List<UserInfo> SearchUsers(string SearchText, int PortalID, string UserName)
    {
        MembershipController m = new MembershipController();
        List<UserInfo> lstUsers = m.SearchUsers("", SearchText, PortalID, UserName).UserList;
        return lstUsers;
    }

    [WebMethod]
    public int AddUpdatePages(PageEntity objPageInfo, string Culture)
    {
        PageController objPage = new PageController();
        objPageInfo.IconFile = objPageInfo.IconFile == string.Empty || objPageInfo.IconFile == null ? string.Empty : objPageInfo.IconFile;
        objPage.AddUpdatePages(objPageInfo);
        if (objPageInfo.MenuList != "0")
        {
            ClearMenuCache(Culture, objPageInfo.PortalID);
        }
        return 1;
    }

    public void ClearMenuCache(string CultureCode, int PortalID)
    {
        HttpRuntime.Cache.Remove(CultureCode + ".FrontMenu" + PortalID.ToString());
        HttpRuntime.Cache.Remove(CultureCode + ".SideMenu" + PortalID.ToString());
        HttpRuntime.Cache.Remove(CultureCode + ".FooterMenu" + PortalID.ToString());
    }

    [WebMethod]
    public List<PageEntity> GetPages(int PortalID, bool isAdmin)
    {
        PageController objPageController = new PageController();
        List<PageEntity> lstPages = objPageController.GetPages(PortalID, isAdmin);
        foreach (PageEntity obj in lstPages)
        {
            obj.ChildCount = lstPages.Count(
                delegate(PageEntity objPage)
                {
                    return (objPage.ParentID == obj.PageID);
                }
             );
        }
        return lstPages;
    }

    [WebMethod]
    public PageEntity GetPageDetails(int pageID)
    {
        PageController objPage = new PageController();
        PageEntity pageObj = objPage.GetPageDetails(pageID);
        pageObj.IconFile = System.IO.File.Exists(Server.MapPath(string.Format("~/PageImages/{0}", pageObj.IconFile))) ? pageObj.IconFile : string.Empty;
        return pageObj;
    }

    [WebMethod]
    public void DeleteIcon(string IconPath)
    {
        try
        {
            string filepath = Utils.GetAbsolutePath(string.Format("PageImages/{0}", IconPath));
            if (File.Exists(filepath))
            {
                File.SetAttributes(filepath, System.IO.FileAttributes.Normal);
                File.Delete(filepath);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    [WebMethod]
    public List<PageEntity> GetChildPages(int parentID, bool? isActive, bool? isVisiable, bool? isRequiredPage, string userName, int portalID)
    {
        PageController objPage = new PageController();
        return objPage.GetChildPage(parentID, isActive, isVisiable, isRequiredPage, userName, portalID);
    }

    [WebMethod]
    public List<PageModuleInfo> GetPageModules(int pageID, int portalID)
    {
        try
        {
            PageController objPage = new PageController();
            return objPage.GetPageModules(pageID, portalID);
        }
        catch (Exception)
        {

            throw;
        }
    }

    public void DeletePageModule(int moduleID, string deletedBY, int portalID)
    {
        PageController objPage = new PageController();
        objPage.DeletePageModule(moduleID, deletedBY, portalID);
    }

    [WebMethod]
    public List<PageEntity> GetPortalPages(int PortalID, bool IsAdmin)
    {
        PageController objPageController = new PageController();
        List<PageEntity> lstMenu = objPageController.GetMenuFront(PortalID, IsAdmin);
        foreach (PageEntity obj in lstMenu)
        {
            obj.ChildCount = lstMenu.Count(
                delegate(PageEntity objMenu)
                {
                    return (objMenu.ParentID == obj.PageID);
                }
                );
        }
        return lstMenu;
    }

    [WebMethod]
    public void DeleteChildPages(int pageID, string deletedBY, int portalID)
    {
        PageController obj = new PageController();
        obj.DeleteChildPage(pageID, deletedBY, portalID);
    }

    [WebMethod]
    public void UpdatePageAsContextMenu(int pageID, bool? isVisiable, bool? showInMenu, int portalID, string userName, string updateFor)
    {
        PageController obj = new PageController();
        obj.UpdatePageAsContextMenu(pageID, isVisiable, showInMenu, portalID, userName, updateFor);
    }
    [WebMethod]
    public void SortFrontEndMenu(int pageID, int parentID, string pageName, int BeforeID, int AfterID, int portalID, string userName)
    {
        PageController obj = new PageController();
        obj.SortFrontEndMenu(pageID, parentID, pageName, BeforeID, AfterID, portalID, userName);
    }
    [WebMethod]
    public void SortAdminPages(List<PageEntity> lstPages)
    {
        PageController obj = new PageController();
        obj.SortAdminPages(lstPages);
    }
    [WebMethod]
    public void UpdSettingKeyValue(string ActiveTemplateName, string PageName, string OldPageName, int PortalID)
    {
        UpdPagePreset(ActiveTemplateName, PageName, OldPageName);
        PageController obj = new PageController();
        obj.UpdSettingKeyValue(PageName, PortalID);
        SageFrame.Shared.SettingProvider sep = new SageFrame.Shared.SettingProvider();
        Hashtable hst = new Hashtable();
        hst = (Hashtable)HttpRuntime.Cache[CacheKeys.SageSetting];
        if (HttpRuntime.Cache[CacheKeys.SageSetting] != null)
        {
            string portalname = GetDefaultPortalName(PortalID);
            hst = (Hashtable)HttpRuntime.Cache[CacheKeys.SageSetting];
            hst[portalname + ".PortalDefaultPage"] = PageName;
        }
    }
    public string GetDefaultPortalName(int portalID)
    {
        Hashtable hstPortals = (Hashtable)HttpRuntime.Cache["Portals"];
        string portalname = "";
        foreach (string key in hstPortals.Keys)
        {
            if (Int32.Parse(hstPortals[key].ToString()) == portalID)// 1 is default PortalID 
            {
                portalname = key;
            }
        }
        return portalname;
    }

    public void UpdPagePreset(string ActiveTemplateName, string PageName, string OldPageName)
    {
        string presetPath = Decide.IsTemplateDefault(ActiveTemplateName.Trim()) ? Utils.GetPresetPath_DefaultTemplate(ActiveTemplateName) : Utils.GetPresetPath(ActiveTemplateName);
        presetPath += "/" + "pagepreset.xml";
        PresetInfo objPreset = new PresetInfo();
        objPreset = PresetHelper.LoadPresetDetails(presetPath);

        List<KeyValue> lstLayout = new List<KeyValue>();
        foreach (KeyValue kvp in objPreset.lstLayouts)
        {
            string[] arrPage = kvp.Value.Split(',');
            if (arrPage.Contains(OldPageName))
            {
                int index = Array.IndexOf(arrPage, OldPageName);
                arrPage[index] = PageName;
            }
            lstLayout.Add(new KeyValue(kvp.Key, string.Join(",", arrPage)));

        }
        objPreset.lstLayouts = lstLayout;
        PresetHelper.WritePreset(presetPath, objPreset);
    }
}