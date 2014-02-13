<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Web;
using System.IO;

public class UploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string strFileName = Path.GetFileName(HttpContext.Current.Request.Files[0].FileName);
        string strExtension = Path.GetExtension(HttpContext.Current.Request.Files[0].FileName).ToLower();
        string strBaseLocation = HttpContext.Current.Server.MapPath("~/bin/");
        string strSaveLocation = strBaseLocation + strFileName;
        object obj = new object();
        lock (obj)
        {
            if (!Directory.Exists(strBaseLocation))
            {
                Directory.CreateDirectory(strBaseLocation);
            }
        }
        if (!File.Exists(strSaveLocation))
        {
            HttpContext.Current.Request.Files[0].SaveAs(strSaveLocation);
        }
        strSaveLocation = strSaveLocation.Replace(HttpContext.Current.Server.MapPath("~/"), "");
        strSaveLocation = strSaveLocation.Replace("\\", "/");
        HttpContext.Current.Response.ContentType = "text/plain";
        HttpContext.Current.Response.Write("({ 'Message': '" + strSaveLocation + "' })");
        HttpContext.Current.Response.End();
    }
    
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}