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
using SageFrame.SageBannner.Info;
using SageFrame.SageBannner.Provider;
using System.Data;
using System.Data.SqlClient;
using SageFrame.Web;
using SageFrame.Web.Utilities;
using SageFrame.SageBannner.SettingInfo;
using System.Web;
#endregion

namespace SageFrame.SageBannner.Controller
{
    public class SageBannerController
    {
        public void SaveBannerContent(SageBannerInfo obj)
        {
            SageBannerProvider objpro = new SageBannerProvider();
            objpro.SaveBannerContent(obj);
        }
        public void SaveBannerInformation(SageBannerInfo objB)
        {
            SageBannerProvider objBP = new SageBannerProvider();
            objBP.SaveBannerInformation(objB);
        }
        public List<SageBannerInfo> LoadBannerOnDropDown(int UserModuleID, int PortalID, string CultureCode)
        {
            try
            {
                SageBannerProvider obj = new SageBannerProvider();
                return obj.LoadBannerOnDropDown(UserModuleID, PortalID, CultureCode);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }


        public List<SageBannerInfo> LoadBannerImagesOnGrid(int BannerID, int UserModuleID, int PortalID, string CultureCode)
        {
            try
            {
                SageBannerProvider obj = new SageBannerProvider();
                return obj.LoadBannerImagesOnGrid(BannerID, UserModuleID, PortalID, CultureCode);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public List<SageBannerInfo> LoadHTMLContentOnGrid(int BannerID, int UserModuleID, int PortalID, string CultureCode)
        {
            try
            {
                SageBannerProvider obj = new SageBannerProvider();
                return obj.LoadHTMLContentOnGrid(BannerID, UserModuleID, PortalID, CultureCode);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public List<SageBannerInfo> LoadBannerListOnGrid(int PortalID, int UserModuleID, string CultureCode)
        {
            SageBannerProvider obj = new SageBannerProvider();
            return obj.LoadBannerListOnGrid(PortalID, UserModuleID, CultureCode);
        }


        public SageBannerInfo GetImageInformationByID(int ImageID)
        {
            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                return objp.GetImageInformationByID(ImageID);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public SageBannerInfo GetHTMLContentForEditByID(int ImageID)
        {
            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                return objp.GetHTMLContentForEditByID(ImageID);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public void DeleteBannerContentByID(int ImageId)
        {
            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                objp.DeleteBannerContentByID(ImageId);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public void DeleteBannerAndItsContentByBannerID(int BannerID)
        {
            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                objp.DeleteBannerAndItsContentByBannerID(BannerID);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public void DeleteHTMLContentByID(int ImageId)
        {
            try
            {
                SageBannerProvider objP = new SageBannerProvider();
                objP.DeleteHTMLContentByID(ImageId);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public List<SageBannerInfo> GetAllPagesOfSageFrame(int PortalID)
        {
            SageBannerProvider obj = new SageBannerProvider();
            return obj.GetAllPagesOfSageFrame(PortalID);
        }


        public string GetFileName(int ImageId)
        {

            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                return objp.GetFileName(ImageId);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public SageBannerSettingInfo GetSageBannerSettingList(int PortalID, int UserModuleID, string CultureCode)
        {
            try
            {
                SageBannerSettingInfo objSageBannerSettingInfo = new SageBannerSettingInfo();
                if (HttpRuntime.Cache["BannerSetting_" + CultureCode + "_" + UserModuleID.ToString()] != null)
                {
                    objSageBannerSettingInfo = HttpRuntime.Cache["BannerSetting_" + CultureCode + "_" + UserModuleID.ToString()] as SageBannerSettingInfo;
                }
                else
                {
                    SageBannerProvider objp = new SageBannerProvider();
                    objSageBannerSettingInfo = objp.GetSageBannerSettingList(PortalID, UserModuleID, CultureCode);
                    HttpRuntime.Cache["BannerSetting_" + CultureCode + "_" + UserModuleID.ToString()] = objSageBannerSettingInfo;
                }
                return objSageBannerSettingInfo;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public List<SageBannerInfo> GetBannerImages(int BannerID, int UserModuleID, int PortalID, string CultureCode)
        {
            try
            {
                List<SageBannerInfo> objSageBannerLst = new List<SageBannerInfo>();
                if (HttpRuntime.Cache["BannerImages_" + CultureCode + "_" + UserModuleID.ToString()] != null)
                {
                    objSageBannerLst = HttpRuntime.Cache["BannerImages_" + CultureCode + "_" + UserModuleID.ToString()] as List<SageBannerInfo>;
                }
                else
                {
                    SageBannerProvider objp = new SageBannerProvider();
                    objSageBannerLst = objp.GetBannerImages(BannerID, UserModuleID, PortalID, CultureCode);
                    HttpRuntime.Cache["BannerImages_" + CultureCode + "_" + UserModuleID.ToString()] = objSageBannerLst;
                }
                return objSageBannerLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public void SortImageList(int ImageId, bool MoveUp)
        {
            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                objp.SortImageList(ImageId, MoveUp);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void SaveHTMLContent(string NavImagepath, string HTMLBodyText, int Bannerid, int UserModuleId, int ImageID, int PortalID, string CultureCode)
        {
            try
            {
                SageBannerProvider objp = new SageBannerProvider();
                objp.SaveHTMLContent(NavImagepath, HTMLBodyText, Bannerid, UserModuleId, ImageID, PortalID, CultureCode);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
