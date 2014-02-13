using System;
using System.Web;
using AspxCommerce.Core;
using SageFrame;
using SageFrame.Web;
public partial class Modules_ItemBrowse_DisplayContainer : BaseAdministrationUserControl
{
    public int StoreID, PortalID, CustomerID;
    public string UserName, CultureName;
    public string itemDetailURL, categoryDetailURL, servicesDetailURL;
    protected void Page_Load(object sender, EventArgs e)
    {
        //SageFrameRoute parentPage = (SageFrameRoute)this.Page;

        //if (parentPage.ControlMode.Equals("category"))
        //{
        //    this.Label1.Text = "Category :  " + parentPage.Key;

        //}
        //else if (parentPage.ControlMode.Equals("item"))
        //{
        //    this.Label1.Text = "Item :  " + parentPage.Key;

        //}
        //else if (parentPage.ControlMode.Equals("item"))
        //{
        //    this.Label1.Text = "Tags :  " + parentPage.Key;

        //}
        IncludeLanguageJS();
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        try
        {
            StoreID = GetStoreID;
            PortalID = GetPortalID;
            UserName = GetUsername;
            CustomerID = GetCustomerID;
            CultureName = GetCurrentCultureName;
            string pageExtension = SageFrameSettingKeys.PageExtension;

            SageFrameRoute parentPage = (SageFrameRoute)this.Page;
            StoreSettingConfig ssc = new StoreSettingConfig();


            if (parentPage.ControlMode.Equals("tags"))
            {
                SageUserControl itemDetails =
                    (SageUserControl)LoadControl("~/Modules/AspxCommerce/DetailsBrowse/AllTags.ascx");
                itemDetails.EnableViewState = true;
                itemDetails.SageUserModuleID = SageUserModuleID;
                phdetailBrowseholder.Controls.Add(itemDetails);
            }
            else if (parentPage.ControlMode.Equals("tagsitems"))
            {
                SageUserControl itemDetails =
                    (SageUserControl)LoadControl("~/Modules/AspxCommerce/DetailsBrowse/ViewTagsItems.ascx");
                itemDetails.EnableViewState = true;
                itemDetails.SageUserModuleID = SageUserModuleID;
                phdetailBrowseholder.Controls.Add(itemDetails);
            }
            else if (parentPage.ControlMode.Equals("search"))
            {
                SageUserControl itemDetails =
                    (SageUserControl)LoadControl("~/Modules/AspxCommerce/DetailsBrowse/ItemLists.ascx");
                itemDetails.EnableViewState = true;
                itemDetails.SageUserModuleID = SageUserModuleID;
                phdetailBrowseholder.Controls.Add(itemDetails);
            }
            else if (parentPage.ControlMode.Equals("option"))
            {
                SageUserControl itemDetails =
                    (SageUserControl)LoadControl("~/Modules/AspxCommerce/DetailsBrowse/ItemsListByIds.ascx");
                itemDetails.EnableViewState = true;
                itemDetails.SageUserModuleID = SageUserModuleID;
                phdetailBrowseholder.Controls.Add(itemDetails);
            }
            else if (parentPage.ControlMode.Equals("coupons"))
            {
                SageUserControl itemDetails =
                    (SageUserControl)LoadControl("~/Modules/AspxCommerce/DetailsBrowse/AllCoupons.ascx");
                itemDetails.EnableViewState = true;
                itemDetails.SageUserModuleID = SageUserModuleID;
                phdetailBrowseholder.Controls.Add(itemDetails);
            }
            else if (parentPage.ControlMode.Equals("brand"))
            {
                SageUserControl itemDetails =
                    (SageUserControl)LoadControl("~/Modules/AspxCommerce/DetailsBrowse/ItemsListByBrand.ascx");
                itemDetails.EnableViewState = true;
                itemDetails.SageUserModuleID = SageUserModuleID;
                phdetailBrowseholder.Controls.Add(itemDetails);
            }
            IncludeLanguageJS();

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
}