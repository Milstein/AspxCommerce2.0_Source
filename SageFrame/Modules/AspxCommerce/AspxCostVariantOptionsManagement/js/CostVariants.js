var CostVariants = "";
$(function() {
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    };
    var isUnique = false;
    var VariantID = '';
    var parentRow = '';
    var editFlag = '';

    checkExist = function(arr, tocheck) {
        var x = arr;
        for (var i = 0; i < x.length; i++) {
            if (x[i] == tocheck) {
                return true;
            }
        }
        return false;
    };
    CostVariants = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: "json",
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            url: "",
            method: ""
        },
        init: function() {
            $('#ddlVatiantPriceModifierType').html("<option selected=\"selected\" value=\"false\">" + curSymbol + "</option><option value=\"true\">%</option>");
            CostVariants.LoadAllImages();
            CostVariants.BindCostVariantInGrid(null);
            CostVariants.HideAllDiv();
            $("#divShowOptionDetails").show();
            CostVariants.BindCostVariantsInputType();

            CostVariants.InitializeVariantTable();

            $('#btnDeleteSelected').click(function() {
                var costVariant_ids = '';
                var hasSystemVariants = false;
                $(".costVariantChkbox").each(function(i) {
                    if ($(this).attr("checked")) {

                        if ($.trim($(this).parent('td').next().next().text()).toLowerCase() == 'yes') {
                            hasSystemVariants = true;
                        }
                        costVariant_ids += $(this).val() + ',';
                    }
                });
                if (!hasSystemVariants) {
                    if (costVariant_ids != "") {
                        var properties = {
                            onComplete: function(e) {
                                CostVariants.ConfirmDeleteMultipleCostVariants(costVariant_ids, e);
                            }
                        };
                        csscody.confirm("<h2>Delete Confirmation</h2><p>Are you sure you want to delet the selected variant option?</p>", properties);
                    } else {
                        csscody.alert('<h2>Information Alert</h2><p>Pleade select at least one variant option.</p>');
                    }
                }
                else {
                    csscody.alert('<h2>Information Alert</h2><p>Sorry! System cost variants can not be deleted.</p>');
                    return false;
                }
            });

            $("#btnSaveVariantOption").click(function() {
                var counter = 0;
                var checkfristMsg = false;
                $('#tblVariantTable>tbody tr:eq(0)').each(function() {
                    if (($(this).find('input.cssClassDisplayOrder,input.cssClassVariantValueName').val() == '') || ($(this).find('input.cssClassDisplayOrder').val() != '' && $(this).find('input.cssClassVariantValueName').val() == '') || ($(this).find('input.cssClassDisplayOrder').val() == '' && $(this).find('input.cssClassVariantValueName').val() != '')) {
                        csscody.alert('<h2>Informaion Message</h2><p>Please enter Item Cost Variant values.</p>');
                        counter++;
                        checkfristMsg = true;
                        return false;
                    }
                });
                var variantsProperties = $("#tblVariantTable tr:gt(1)").find("input.cssClassDisplayOrder,input.cssClassVariantValueName");
                var count = 0;
                if (checkfristMsg != true) {
                    $.each(variantsProperties, function(index, item) {
                        if ($(this).val() <= '') {
                            csscody.alert('<h2>Informaion Message</h2><p>Please enter Item Cost Variant Properties.</p>');
                            count++;
                            return false;
                        }
                    });
                }
                if (count == 0 && counter == 0)
                    CostVariants.SaveCostVariantsInfo();
            });

            $('#ddlAttributeType').change(function() {
                CostVariants.HideAllCostVariantImages();
            });

            $("#btnSearchCostVariants").live("click", function() {
                CostVariants.SearchCostVariantName();
            });
            $('#txtVariantName').keyup(function(event) {
                if (event.keyCode == 13) {
                    $("#btnSearchCostVariants").click();
                }
            });
            $("#btnAddNewVariantOption").click(function() {
                CostVariants.OnInit();
                CostVariants.ClearForm();
                CostVariants.HideAllDiv();

                $("#divAddNewOptions").show();
                $("#txtPos").DigitOnly('.cssClassDisplayOrder', '');
                $("#txtPriceModifier").DigitDecimalAndNegative('.cssClassPriceModifier', '');
                $("#txtWeightModifier").DigitDecimalAndNegative('.cssClassWeightModifier', '');
            });
            $("#txtPriceModifier").bind("contextmenu", function(e) {
                return false;
            });
            $("#txtWeightModifier").bind("contextmenu", function(e) {
                return false;
            });
            $("#btnBack").click(function() {
                CostVariants.HideAllDiv();
                $("#divShowOptionDetails").show();
            });

            $("#btnReset").click(function() {
                CostVariants.OnInit();
                CostVariants.ClearForm();
            });
            $("#txtDisplayOrder").keypress(function(e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    $("#dispalyOrder").html("Digits Only").css("color", "red").show().fadeOut(1600);
                    return false;
                }
            });

            //validate name on focus lost
            $('#txtCostVariantName').blur(function() {
                // Validate name
                var errors = '';
                var costVariantName = $(this).val();
                var variant_id = $('#btnSaveVariantOption').attr("name");
                if (variant_id == '') {
                    variant_id = 0;
                }
                if (!costVariantName) {
                    errors += 'Please enter cost variant name';
                }
                //check uniqueness
                else if (!CostVariants.IsUnique(costVariantName, variant_id)) {
                    errors += 'Please enter unique cost variant name. "' + costVariantName.trim() + '" already exists.<br/>';
                }

                if (errors) {
                    $('.cssClassRight').hide();
                    $('.cssClassError').show();
                    $(".cssClassError").parent('div').addClass("diverror");
                    $('.cssClassError').prevAll("input:first").addClass("error");
                    $('.cssClassError').html(errors);
                    return false;
                } else {
                    $('.cssClassRight').show();
                    $('.cssClassError').hide();
                    $(".cssClassError").parent('div').removeClass("diverror");
                    $('.cssClassError').prevAll("input:first").removeClass("error");
                }

            });

            $(".delbutton").click(function() {
                //Get the Id of the option to delete
                var costVariantId = $(this).attr("id").replace(/[^0-9]/gi, '');
                CostVariants.DeleteCostVariants(costVariantId);
                CostVariants.HideAllDiv();
                $("#divShowOptionDetails").show();

            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: CostVariants.config.type,
                contentType: CostVariants.config.contentType,
                cache: CostVariants.config.cache,
                async: CostVariants.config.async,
                data: CostVariants.config.data,
                dataType: CostVariants.config.dataType,
                url: CostVariants.config.url,
                success: CostVariants.ajaxSuccess,
                error: CostVariants.ajaxFailure
            });
        },
        LoadAllImages: function() {
            $("#ajaxLoad").attr("src", '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
            $('.cssClassSuccessImg').attr("src", '' + aspxTemplateFolderPath + '/images/right.png');
            $('.cssClassAddRow').attr("src", '' + aspxTemplateFolderPath + '/images/admin/icon_add.gif');
        },
        CheckSameCostVarValue: function() {
            var arr = [];
            $("#tblVariantTable >tbody>tr").each(function(index) {
                arr.push($(this).find("input[class=cssClassVariantValueName]").val().toLower());
            });
            return arr.Unique();
        },
        InitializeVariantTable: function() {
            // $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassDeleteRow").hide();
            $("img.cssClassAddRow").live("click", function() {
                var cloneRow = $(this).closest('tr').clone(true);
                $(cloneRow).appendTo("#tblVariantTable");
                $(cloneRow).find("input[type='text']").val('');
                $(cloneRow).find("input[type='hidden']").val('0');
                $(cloneRow).find(".cssClassDisplayOrder").val($("#tblVariantTable >tbody>tr:last")[0].rowIndex);
            });
        },

        HideAllCostVariantImages: function() {
            var selectedVal = $("#ddlAttributeType").val();
            if (selectedVal == 9 || selectedVal == 11) { //Radio //CheckBox
                $("#tblVariantTable>tbody").find("tr:gt(0)").remove();
                $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassAddRow").hide();
            } else {
                $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassAddRow").show();
            }
        },

        DeleteCostVaraiantValue: function(costVariantValueId, parentRow) {
            var properties = {
                onComplete: function(e) {
                    CostVariants.ConfirmDeleteCostVariantValue(costVariantValueId, parentRow, e);
                }
            };
            // Ask user's confirmation before delete records
            csscody.confirm("<h2>Delete Confirmation</h2><p>Do you want to delete this cost variant value?</p>", properties);
        },

        ConfirmDeleteCostVariantValue: function(costVariantValueId, parentRow, event) {
            if (event) {
                this.config.url = this.config.baseURL + "DeleteCostVariantValue";
                this.config.data = JSON2.stringify({ costVariantValueID: costVariantValueId, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
            }
        },

        BindCostVariantInGrid: function(costVariantNm) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.method = "GetCostVariants";
            this.config.data = { variantName: costVariantNm, aspxCommonObj: aspxCommonInfo };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvCostVariantGrid_pagesize").length > 0) ? $("#gdvCostVariantGrid_pagesize :selected").text() : 10;

            $("#gdvCostVariantGrid").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                     { display: 'Cost Variant ID', name: 'costvariant_id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'costVariantChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                     { display: 'Cost Variant Name', name: 'cost_variant_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                     { display: 'Used In System', name: '_isSystem', cssclass: 'cssClassHeadBoolean', controlclass: '', elemClass: 'cssClassIsSystem', coltype: 'label', align: 'left', type: 'boolean', hide: false, format: 'Yes/No' },
                     { display: 'Actions', name: 'action', cssclass: 'cssClassAction', controlclass: '', coltype: 'label', align: 'center' }
                 ],

                buttons: [{ display: 'Edit', name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'CostVariants.EditCostVariant', arguments: '1,2,3,4' },
                     { display: 'Delete', name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'CostVariants.DeleteCostVariant', arguments: '1,2,3,4' }
                 ],
                rp: perpage,
                nomsg: "No Records Found!",
                param: data, // { variantName: costVariantNm, storeID: storeId, portalID: portalId, cultureName: cultureName },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 3: { sorter: false} }
            });
        },

        EditCostVariant: function(tblID, argus) {
            VariantID = argus[0];
            switch (tblID) {
                case "gdvCostVariantGrid":
                    editFlag = argus[0];
                    CostVariants.ClearForm();
                    CostVariants.OnInit();
                    $(".delbutton").attr("id", 'variantid_' + argus[0]);
                    if (argus[4].toLowerCase() == 'yes') {
                        $(".delbutton").hide();
                    }
                    else {
                        $(".delbutton").show();
                    }
                    $("#btnSaveVariantOption").attr("name", argus[0]);
                    $("#" + lblCostVarFormHeading).html("Edit Cost variant Option: '" + argus[3] + "'");
                    CostVariants.CostVariantsInfoByID(VariantID);
                    $(".cssClassDisplayOrder").attr("disabled", "disabled");
            }
        },
        CostVariantsInfoByID: function(ID) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.url = this.config.baseURL + "GetCostVariantInfoByCostVariantID";
            this.config.data = JSON2.stringify({ costVariantID: ID, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        FillForm: function(response) {
            $.each(response.d, function(index, item) {
                //General properties Tab

                $('#txtCostVariantName').val(item.CostVariantName);
                $('#ddlAttributeType').val(item.InputTypeID);
                $('#ddlAttributeType').attr('disabled', 'disabled');
                $('#txtDisplayOrder').val(item.DisplayOrder);
                $("#txtDescription").val(item.Description);
                $('input[name=chkActive]').attr('checked', item.IsActive);

            });
        },
        BindCostVariantValueByCostVariantID: function(costVariantId) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.url = this.config.baseURL + "GetCostVariantValuesByCostVariantID";
            this.config.data = JSON2.stringify({ costVariantID: costVariantId, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);
            //$("#hdnCostVariantID").val('');     
        },
        DeleteCostVariant: function(tblID, argus) {
            switch (tblID) {
                case "gdvCostVariantGrid":
                    if (argus[4].toLowerCase() == 'no') {
                        CostVariants.DeleteCostVariants(argus[0]);
                    }
                    else {
                        csscody.alert('<h2>Information Alert</h2><p>Sorry! System cost variants can not be deleted.</p>');
                    }
                    break;
                default:
                    break;
            }
        },
        DeleteCostVariants: function(_costVariantId) {

            var properties = {
                onComplete: function(e) {
                    CostVariants.ConfirmSingleDeleteCostVariant(_costVariantId, e);
                }
            };
            // Ask user's confirmation before delete records
            csscody.confirm("<h2>Delete Confirmation</h2><p>Are you sure you want to delect this variant option?</p>", properties);

        },
        ConfirmSingleDeleteCostVariant: function(costVariantID, event) {
            if (event) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.CultureName = null;
                this.config.url = this.config.baseURL + "DeleteSingleCostVariant";
                this.config.data = JSON2.stringify({ costVariantID: costVariantID, aspxCommonObj: aspxCommonInfo });
                this.config.ajaxCallMode = 4;
                this.ajaxCall(this.config);
            }
            return false;
        },
        ConfirmDeleteMultipleCostVariants: function(costVariant_ids, event) {
            if (event) {
                CostVariants.DeleteMultipleCostVariants(costVariant_ids);
            }
        },
        DeleteMultipleCostVariants: function(_costVariant_ids) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.CultureName = null;
            this.config.url = this.config.baseURL + "DeleteMultipleCostVariants";
            this.config.data = JSON2.stringify({ costVariantIDs: _costVariant_ids, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
            return false;
        },
        HideAllDiv: function() {
            $("#divShowOptionDetails").hide();
            $("#divAddNewOptions").hide();
        },
        BindCostVariantsInputType: function() {
            this.config.url = this.config.baseURL + "GetCostVariantInputTypeList";
            this.config.data = '{}';
            this.config.ajaxCallMode = 6;
            this.ajaxCall(this.config);
        },
        ClearForm: function() {
            $(".delbutton").removeAttr("id");
            $("#btnSaveVariantOption").removeAttr("name");
            $(".delbutton").hide();
            $("#btnReset").show();
            $("#txtCostVariantName").val('');
            $("#txtDescription").val('');
            $("#ddlAttributeType").attr('selectedIndex', 0);
            $('#ddlAttributeType').removeAttr('disabled');
            $('#txtDisplayOrder').val('');
            $('input[name=chkActive]').attr('checked', 'checked');

            $("#" + lblCostVarFormHeading).html("Add New Cost Variant Option");
            //Clear variant tab
            $("#tblVariantTable>tbody").find("tr:gt(0)").remove();
            $("#tblVariantTable>tbody").find("input[type='text']").val('');
            $("#tblVariantTable>tbody").find("select").val(1);
            $("#tblVariantTable>tbody").find("input[type='hidden']").val('0');
            $("#tblVariantTable>tbody").find(".cssClassDisplayOrder").val('').val(1);
            $(".cssClassDisplayOrder").attr("disabled", "disabled");
            // $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassDeleteRow").hide();
            return false;
        },
        OnInit: function() {
            $('#btnReset').hide();
            $('.cssClassRight').hide();
            $('.cssClassError').hide();
            CostVariants.SelectFirstTab();
        },
        SelectFirstTab: function() {
            var $tabs = $('#container-7').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
            $tabs.tabs('select', 0);
        },
        IsUnique: function(costVariantName, costVariantId) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.CultureName = null;
            this.config.url = this.config.baseURL + "CheckUniqueCostVariantName";
            this.config.data = JSON2.stringify({ costVariantName: costVariantName, costVariantId: costVariantId, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 7;
            this.ajaxCall(this.config);
            return isUnique;
        },
        SaveCostVariantsInfo: function() {
            var variant_id = $('#btnSaveVariantOption').attr("name");
            if (variant_id != '') {
                CostVariants.SaveCostVariant(variant_id, false);
            } else {
                CostVariants.SaveCostVariant(0, true);
            }
        },
        SaveCostVariant: function(_costVariantId, _isNewflag) {
            editFlag = _costVariantId;
            var validateErrorMessage = '';
            // Validate name
            var costVariantName = $('#txtCostVariantName').val();
            if (!costVariantName) {
                validateErrorMessage += 'Please enter cost variant option name.<br/>';
            } else if (!CostVariants.IsUnique(costVariantName, _costVariantId)) {
                validateErrorMessage += 'Please enter unique cost variant name."' + costVariantName.trim() + '" already exists.<br/>';
            }

            // Validate cost variant Display Order
            var costVariantDisplayOrder = $("#txtDisplayOrder").val();
            if (!costVariantDisplayOrder) {
                $("#txtDisplayOrder").focus();
                validateErrorMessage += 'Please enter cost variant display order.<br/>';
            } else {
                var value = costVariantDisplayOrder.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                var intRegex = /^\d+$/;
                if (!intRegex.test(value)) {
                    $("#txtDisplayOrder").focus();
                    validateErrorMessage += 'Cost variant display order is numeric value.<br/>';
                }
            }

            if (validateErrorMessage) {
                validateErrorMessage = 'The following value are required: <br/>' + validateErrorMessage;
                csscody.alert('<h2>Information Alert</h2><p>' + validateErrorMessage + '</p>');
                return false;
            } else {
                var selectedCostVariantType = $("#ddlAttributeType :selected").val();
                var costVariantObj = {
                    CostVariantID: _costVariantId,
                    CostVariantName: $('#txtCostVariantName').val(),
                    InputTypeID: $('#ddlAttributeType').val(),
                    DisplayOrder: $('#txtDisplayOrder').val(),
                    ShowInAdvanceSearch: false, //$('input[name=chkUseInAdvancedSearch]').attr('checked');
                    ShowInComparison: false, //$('input[name=chkComparable]').attr('checked');                   
                    IsIncludeInPriceRule: false, //$('input[name=chkUseForPriceRule]').attr('checked');
                    Flag: _isNewflag,
                    Description: $('#txtDescription').val(),
                    IsActive: $('input[name=chkActive]').attr('checked'),
                    IsModified: !(_isNewflag)
                };
                var _VariantOptions = '';
                var arr = [];
                var counter = 1;
                $('#tblVariantTable>tbody tr').each(function(index) {
                    if (!checkExist(arr, $(this).find("input[class=cssClassVariantValueName]").val().toLowerCase())) {
                        arr.push($(this).find("input[class=cssClassVariantValueName]").val().toLowerCase());
                        _VariantOptions += $(this).find(".cssClassVariantValue").val() + '%';
                        _VariantOptions += counter + '%'; //{required:true,digits:true,minlength:1}
                        _VariantOptions += $(this).find(".cssClassVariantValueName").val() + '%'; //{required:true,minlength:2}
                        _VariantOptions += $(this).find(".cssClassIsActive").val() + '#';
                        counter++;
                    }
                });

                CostVariants.AddCostVariantInfo(costVariantObj, _VariantOptions);
            }
            return false;
        },

        AddCostVariantInfo: function(costVariantObj, _VariantOptions) {
            var params = { variantObj: costVariantObj, variantOptions: _VariantOptions, aspxCommonObj: aspxCommonObj() };
            this.config.url = this.config.baseURL + "SaveAndUpdateCostVariant";
            this.config.data = JSON2.stringify(params);
            this.config.ajaxCallMode = 8;
            this.ajaxCall(this.config);
        },
        SearchCostVariantName: function() {
            var costVariantNm = $.trim($("#txtVariantName").val());
            if (costVariantNm.length < 1) {
                costVariantNm = null;
            }
            CostVariants.BindCostVariantInGrid(costVariantNm);
        },
        ajaxSuccess: function(data) {
            switch (CostVariants.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    // $(parentRow).remove();
                    csscody.info('<h2>Successful Message</h2><p>Cost variants properties value has been deleted successfully.</p>');
                    return false;
                    break;
                case 2:
                    CostVariants.FillForm(data);
                    //varinants Tab
                    CostVariants.BindCostVariantValueByCostVariantID(VariantID);
                    CostVariants.HideAllDiv();
                    $("#divAddNewOptions").show();
                    break;
                case 3:
                    if (data.d.length > 0) {
                        $("#tblVariantTable>tbody").html('');
                        $.each(data.d, function(index, item) {
                            if (item.DisplayOrder == null) {
                                item.DisplayOrder = '';
                            }
                            var newVariantRow = '';
                            newVariantRow += '<tr><td><input type="hidden" size="3" class="cssClassVariantValue" value="' + item.CostVariantsValueID + '"><input type="text" size="3" class="cssClassDisplayOrder" value="' + item.DisplayOrder + '"></td>';
                            newVariantRow += '<td><input type="text" class="cssClassVariantValueName" value="' + item.CostVariantsValueName + '"></td>';
                            //                             newVariantRow += '<td><input type="text" size="5" class="cssClassPriceModifier" value="' + item.CostVariantsPriceValue + '">&nbsp;/&nbsp;';
                            //                             newVariantRow += '<select class="cssClassPriceModifierType priceModifierType_' + item.CostVariantsValueID + '"><option value="false">'+curSymbol+'</option><option value="true">%</option></select></td>';
                            //                             newVariantRow += '<td><input type="text" size="5" class="cssClassWeightModifier" value="' + item.CostVariantsWeightValue + '">&nbsp;/&nbsp;';
                            //                             newVariantRow += '<select class="cssClassWeightModifierType weightModifierType_' + item.CostVariantsValueID + '"><option value="false">lbs</option><option value="true">%</option></select></td>';
                            newVariantRow += '<td><select class="cssClassIsActive isActive_' + item.CostVariantsValueID + '"><option value="true">Active</option><option value="false">Disabled</option></select></td>';
                            newVariantRow += '<td><span class="nowrap">';
                            newVariantRow += '<img class="cssClassAddRow" title="Add empty item" alt="Add empty item" name="add" src="' + aspxTemplateFolderPath + '/images/admin/icon_add.gif">&nbsp;';
                            // newVariantRow += '<img width="13" height="18" border="0" align="top" class="cssClassCloneRow" alt="Clone this item" title="Clone this item" name="clone" src="' + aspxTemplateFolderPath + '/images/admin/icon_clone.gif">&nbsp;';
                            // newVariantRow += '<img width="12" height="18" border="0" align="top" class="cssClassDeleteRow" alt="Remove this item" name="remove" src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif">&nbsp;';
                            newVariantRow += '</span></td></tr>';
                            $("#tblVariantTable>tbody").append(newVariantRow);

                            // $('.priceModifierType_' + item.CostVariantsValueID).val('' + item.IsPriceInPercentage + '');
                            // $('.weightModifierType_' + item.CostVariantsValueID).val('' + item.IsWeightInPercentage + '');
                            $('.isActive_' + item.CostVariantsValueID).val('' + item.IsActive + '');
                            $("#divAddNewOptions").show();
                            $("#txtPos").DigitOnly('.cssClassDisplayOrder', '');
                            //  $("#txtPriceModifier").DigitDecimalAndNegative('.cssClassPriceModifier', '');
                            // $("#txtWeightModifier").DigitDecimalAndNegative('.cssClassWeightModifier', '');
                            //                             $(".cssClassWeightModifier").bind("contextmenu", function(e) {
                            //                                 return false;
                            //                             });
                            //                             $(".cssClassPriceModifier").bind("contextmenu", function(e) {
                            //                                 return false;
                            //                             });
                        });
                        // $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassDeleteRow").hide();
                    }
                    break;
                case 4:
                    CostVariants.BindCostVariantInGrid(null);
                    csscody.info('<h2>Successful Message</h2><p>Cost variants option has been deleted successfully.</p>');
                    break;
                case 5:
                    CostVariants.BindCostVariantInGrid(null);
                    csscody.info('<h2>Successful Message</h2><p>Cost variants options has been deleted successfully.</p>');
                    break;
                case 6:
                    $.each(data.d, function(index, item) {
                        $("#ddlAttributeType").append("<option value=" + item.InputTypeID + ">" + item.InputType + "</option>");
                    });
                    break;
                case 7:
                    isUnique = data.d;
                    break;
                case 8:
                    CostVariants.BindCostVariantInGrid(null);
                    CostVariants.HideAllDiv();
                    $("#divShowOptionDetails").show();
                    if (editFlag > 0) {
                        csscody.info('<h2>Successful Message</h2><p>Cost variants option has been updated successfully.</p>');
                    } else {
                        csscody.info('<h2>Successful Message</h2><p>Cost variants option has been saved successfully.</p>');
                    }
                    break;
            }
        }
    };
    CostVariants.init();
});