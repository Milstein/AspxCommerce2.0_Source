/*
AspxCommerce® - http://www.aspxcommerce.com
Copyright (c) 20011-2012 by AspxCommerce
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Ticker.Info;
using SageFrame.Ticker.TickerController;

public partial class Modules_Ticker_TickerEdit : BaseAdministrationUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                IncludeImage();
                LoadOngdvTickerData(GetStoreID, GetPortalID);
                divVisibility(true, false, true);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    public void LoadOngdvTickerData(int StoreID,int PortalID)
    {
        try
        {
            gdvTickerData.DataSource = TickerController.LoadOngdvTickerData(StoreID,PortalID);
            gdvTickerData.DataBind();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void IncludeImage()
    {
        imgSaveTicker.ImageUrl = GetTemplateImageUrl("btnsave.png", true);
        imbCancelTicker.ImageUrl = GetTemplateImageUrl("imgcancel.png", true);
    }

    public void divVisibility(bool GridVisible, bool FormVisible, bool btnVisible)
    {
        gdvTickerData.Visible = GridVisible;
        divTickerForm.Visible = FormVisible;
        divAddBtnTicker.Visible = btnVisible;
    }

    protected void ImgAddNewTicker_Click(object sender, ImageClickEventArgs e)
    {
        ClearForm();
        divVisibility(false, true, false);
    }

    protected void imbCancelTicker_Click(object sender, ImageClickEventArgs e)
    {
        ClearForm();
        divVisibility(true, false, true);
    }

    public void ClearForm()
    {
        txtTickerNews.Content = string.Empty;
        txtStartDate.Text = string.Empty;
        txtEndDate.Text = string.Empty;
        chkTickerIsActive.Checked = false;
    }

    protected void imgSaveTicker_Click(object sender, ImageClickEventArgs e)
    {
        try
        {
            TickerInfo objInf = new TickerInfo();
            if (Session["EdTickerID"] != null && Session["EdTickerID"].ToString() != string.Empty)
            {
                objInf.TickerID = Convert.ToInt32(Session["EdTickerID"].ToString());
                Session.Contents.Clear();
            }
            else
            {
                objInf.TickerID = 0;
            }
            objInf.TickerNews = txtTickerNews.Content;
            objInf.StartDate = Convert.ToDateTime(txtStartDate.Text);
            objInf.EndDate = Convert.ToDateTime(txtEndDate.Text);
            objInf.IsActive = chkTickerIsActive.Checked;
            objInf.PortalID = GetPortalID;
            objInf.StoreID = GetStoreID;
            objInf.AddedBy = GetUsername;
            objInf.UpdatedBy = GetUsername;
            TickerController objC = new TickerController();
            objC.SaveTickerItem(objInf);

            LoadOngdvTickerData(GetStoreID, GetPortalID);

            divVisibility(true, false, true);

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
        ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Ticker/ModuleLocalText", "TickerSavedSuccessFully"), "", SageMessageType.Success);
    }

    protected void gdvTickerData_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int TickerId = Int32.Parse(e.CommandArgument.ToString());
        if (e.CommandName != "Page")
        {
            if (e.CommandName == "DeleteTicker")
            {
                DeleteTickerByID(TickerId);
                ShowMessage(SageMessageTitle.Information.ToString(),
                            SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Ticker/ModuleLocalText",
                                                                               "TickerDeletedSucessfully"), "",
                            SageMessageType.Success);
            }
            if (e.CommandName == "EditTicker")
            {
                EditTickerByID(TickerId);
            }
        }
    }

    public void EditTickerByID(int TickerID)
    {
        try
        {
            TickerInfo obj = new TickerInfo();
            TickerController objC = new TickerController();
            obj = objC.getTickerObject(TickerID);
            txtEndDate.Text = Convert.ToString(obj.EndDate);
            txtStartDate.Text = Convert.ToString(obj.StartDate);
            txtTickerNews.Content = obj.TickerNews;
            chkTickerIsActive.Checked = obj.IsActive;

            divVisibility(false, true, false);
            Session["EdTickerID"] = TickerID;
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    public void DeleteTickerByID(int TickerId)
    {
        try
        {
            TickerController objC = new TickerController();
            objC.DeleteTickerByID(TickerId);
            LoadOngdvTickerData(GetStoreID, GetPortalID);
        }
        catch (Exception Ex)
        {
            ProcessException(Ex);
        }

    }

    protected void gdvTickerData_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton imgButton = e.Row.FindControl("imgDelete") as ImageButton;
            if (imgButton != null)
            {
                imgButton.Attributes.Add("onclick",
                                                        "javascript:return confirm('" +
                                                        SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/Ticker/ModuleLocalText", "AreyouSureToDelete") + "')");
            }
        }
    }
    protected void gdvTickerData_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gdvTickerData.PageIndex = e.NewPageIndex;
        gdvTickerData.DataBind();
        LoadOngdvTickerData(GetStoreID, GetPortalID);
    }
}
