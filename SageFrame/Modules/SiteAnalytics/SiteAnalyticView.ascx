<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SiteAnalyticView.ascx.cs"
    Inherits="Modules_SiteAnalytic_SiteAnalyticView" %>

<script language="javascript" type="text/javascript">
    //<![CDATA[    
    $(function() {
        $(this).SiteAnalyticBuilder({
            CultureCode: 'en-US',
            baseURL: '',
            PortalID: '<%=PortalID %>',
            UserModuleID: '<%=ModuleID %>'
        });
    });
    //]]>	
</script>

<div class="sfFormwrapper sfPadding">
    <div id="divChoose" style="float: right">
        <ul class="sfTab">
            <li id="Chart" class="sfDefault">
                <label class="sfFormlabel">
                    Chart</label></li>
            <li id="Data">
                <label class="sfFormlabel">
                    Data</label></li>
        </ul>
    </div>
    <div id="divRange">
        <label class="sfFormlabel">
            Start Date</label>
        <input type="text" id="txtStartDate" class="sfInputbox" />
        <label class="sfFormlabel">
            End Date</label>
        <input type="text" id="txtEndDate" class="sfInputbox" />
        <input type="button" class="sfBtn" id="btnShowData" value="View" />
    </div>
    <div id="divChart">
       
        <div id="DailyVisit" class="code" style="height: 300px; width:750px; float: left;">
        </div>
         <div id="MonthlyVisitMeterGaugeChart" style="top: 60px; margin-left: 40px;
            width: 25%; height: 200px; float:left; position:relative;">
        </div>
        <div style="width: 100%; float: left;">
            <span>You Clicked: </span><span id="info1">Nothing yet</span></div>
        <div id="CountryWiseVisit" style="margin-top: 20px; margin-left: 20px; width:500px;
            float: left; height: 300px;">
        </div>
        <div id="BrowserWiseVisit" style="margin-top: 20px; margin-left: 20px; width:480px;
            height: 300px; float: left">
        </div>
        <div style="width: 100%; float: left;">
            <span>You Clicked: </span><span id="info2">Nothing yet</span></div>
        <div id="PageVisit" style="margin-top: 20px; margin-left: 20px; width: 45%; height: 300px;
            float: left">
        </div>
    </div>
    <div id="divData" style="display: none">
        <div class="sfGridwrapper" id="divVisitedCountryList">
            <label class="sfFormlable">
                Country Wise Visit</label>
            <table id="tblVisitedCountryList" width="100%" cellpadding="0" cellspacing="0">
            </table>
            <div id="PagingVisitedCountryList" class="sfPagination">
            </div>
        </div>
        <div id="divVisitedPageList" class="sfGridwrapper">
            <label class="sfFormlable">
                Page Wise Visit</label>
                <select id="slPage" class="sfListmenu"></select>
            <table id="tblVisitedPageList" width="100%" cellpadding="0" cellspacing="0">
            </table>
            <div id="PagingVisitedPageList" class="sfPagination">
            </div>
        </div>
        <div id="divBrowserList" class="sfGridwrapper">
            <label class="sfFormlable">
                Browser Wise Visit</label>
            <table id="tblBrowserList" width="100%" cellpadding="0" cellspacing="0">
            </table>
            <div id="PagingBrowserList" class="sfPagination">
            </div>
        </div>
        <div id="divRefSite" class="sfGridwrapper">
            <label class="sfFormlable">
                Ref Sites</label>
            <table id="tblRefSite" width="100%" cellpadding="0" cellspacing="0">
            </table>
            <div id="PagingRefList" class="sfPagination">
            </div>
        </div>
        <div id="divExport" style="clear:both;">
            <asp:Button ID="btnExportToExcel" runat="server" CssClass="sfBtn" Text="Export to Excel"
                OnClick="btnExportToExcel_Click" />
            <asp:Button ID="btnExportToPDF" runat="server" CssClass="sfBtn" Text="Export to PDF"
                OnClick="btnExportToPDF_Click" />
<%--            <asp:PostBackTrigger ControlID="btnExportToExcel" />
            <asp:PostBackTrigger ControlID="btnExportToPDF" />--%>
        </div>
    </div>
    <div class="clear">
    </div>
</div>
