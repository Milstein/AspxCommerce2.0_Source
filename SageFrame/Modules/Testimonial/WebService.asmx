<%@ WebService Language="C#" Class="WebService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Testimonial.Info;
using SageFrame.Testimonial.Controller;
using SageFrame.Web;

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

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }
    [WebMethod]
    public List<TestimonialInfo> GetTestimonialList(int PortalID, int UserModuleID, bool IsSlider)
    {
        try
        {
            TestimonialController clt = new TestimonialController();
            List<TestimonialInfo> obj = new List<TestimonialInfo>();
            obj = clt.GetTestData(PortalID, UserModuleID, IsSlider);
            return obj;
        }
        catch (Exception ex)
        {
            throw ex; 
        }
    }
    
    [WebMethod]
    public List<TestimonialInfo> GetTestimonialDetailList(int PortalID, int UserModuleID, bool IsSlider)
    {
        try
        {
            TestimonialController clt = new TestimonialController();
            List<TestimonialInfo> obj = new List<TestimonialInfo>();
            obj = clt.GetTestDetailData(PortalID, UserModuleID, IsSlider);
            return obj;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<TestimonialInfo> GetSelectedTestimonialList(int PortalID, int UserModuleID, int NoOfList, bool IsSlider)
    {
        try
        {
            TestimonialController clt = new TestimonialController();
            List<TestimonialInfo> obj = new List<TestimonialInfo>();
            obj = clt.GetSelectedTestData(PortalID, UserModuleID, NoOfList, IsSlider);
            return obj;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
}


