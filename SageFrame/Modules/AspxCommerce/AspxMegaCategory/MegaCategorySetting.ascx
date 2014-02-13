<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MegaCategorySetting.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxMegaCategory_MegaCategorySetting" %>

<script type="text/javascript">
    var megaModulePath = '<%=MegaModulePath %>';
</script>

<div class="cssMegaCategorySetting">
    <table>
        <thead>
            <tr>
                <th class="sflocale">
                    Mega Category Setting
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <asp:Label runat="server" EnableViewState="False" ID="lblModeOfView" 
                        Text="Mode Of Category" meta:resourcekey="lblModeOfViewResource1"></asp:Label>
                </td>
                <td>
                    <select id="slcMode" class="cssClassMode">
                        <option value="horizontal" class="sflocale">Horizontal</option>
                        <option value="vertical" class="sflocale">Vertical</option>
                        <option value="collapseable" class="sflocale">Collapseable</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" EnableViewState="False" ID="lblNoOfColumn" 
                        Text="Number Of Column" meta:resourcekey="lblNoOfColumnResource1"></asp:Label>
                </td>
                <td>
                    <input type="text" id="txtNoOfColumn" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" EnableViewState="False" Text="Show Category Image" 
                        meta:resourcekey="LabelResource1"></asp:Label>
                </td>
                <td>
                    <input type="checkbox" id="chkShowImage" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" EnableViewState="False" 
                        Text="Show Sub Category Image" meta:resourcekey="LabelResource2"></asp:Label>
                </td>
                <td>
                    <input type="checkbox" id="chkShowSubCatImage" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" EnableViewState="False" ID="lblEffect" Text="Effect" 
                        meta:resourcekey="lblEffectResource1"></asp:Label>
                </td>
                <td>
                    <select id="slcEffect">
                        <option value="show" class="sflocale">Show</option>
                        <option value="slide" class="sflocale">Slide</option>
                        <option value="fade" class="sflocale">Fade</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" EnableViewState="False" ID="lblSpeed" Text="Speed" 
                        meta:resourcekey="lblSpeedResource1"></asp:Label>
                </td>
                <td>
                    <input type="text" id="txtSpeed" />
                </td>
            </tr>
            <tr id="trDirection" style="display: none;">
                <td>
                    <asp:Label runat="server" EnableViewState="False" ID="lblDirection" 
                        Text="Direction" meta:resourcekey="lblDirectionResource1"></asp:Label>
                </td>
                <td>
                    <select id="slcDirection">
                        <option value="right" class="sflocale">Right</option>
                        <option value="left" class="sflocale">Left</option>
                    </select>
                </td>
            </tr>
            <tr id="trEvent" style="display: none;">
                <td>
                    <asp:Label runat="server" EnableViewState="False" ID="lblEvent" Text="Event" 
                        meta:resourcekey="lblEventResource1"></asp:Label>
                </td>
                <td>
                    <select id="slcEvent">
                        <option value="click" class="sflocale">Click</option>
                        <option value="hover" class="sflocale">Hover</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" id="btnMenuCatSave" value="Save" />
                </td>
            </tr>
        </tbody>
    </table>
</div>
