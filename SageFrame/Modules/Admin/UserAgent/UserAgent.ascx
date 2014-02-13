<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserAgent.ascx.cs" Inherits="Modules_Admin_UserAgent_UserAgent" %>

<script language="javascript" type="text/javascript">
    //<![CDATA[    
    $(function () {
        $(this).UserAgent({
            CultureCode: 'en-US',
            baseURL: '',
            PortalID: '<%=PortalID %>',
            UserName: '<%=UserName %>'
        });
    });
    //]]>	
</script>

<table id="tblUserAgent" class="sfNormalTable">
    <tr>
        <td><input type="radio" id="rdbDeskTop" value="1" name="UserAgent" />
                    <span class="sfFormlabel">PC</span>

        <img src="../Administrator/Templates/Default/images/pc.png" style="margin-left:5px;" />
            
        </td>
        
        
        <tr>
        <td>  <input type="radio" id="rdbMobile" value="2" name="UserAgent" />
         <span class="sfFormlabel">Mobile</span>
        <img src="../Administrator/Templates/Default/images/mobile02.png" style="margin-left:5px;" />        
        </td>
        </tr>
        <tr>
        <td><input type="radio" id="rdbDefault" value="3" name="UserAgent" />
            <span class="sfFormlabel">Set Default</span>
            
        </td>
    </tr>
    <tr>
        <td>
            <div class="sfButtonwrapper sftype1">
                <label class="sfSave" id="spnBtnSave">
                    Save</label>
            </div>
        </td>
    </tr>
</table>
