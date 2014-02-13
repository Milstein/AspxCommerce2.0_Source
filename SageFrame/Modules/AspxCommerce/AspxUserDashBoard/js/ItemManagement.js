﻿var listImages = new Array();
var itemTypeId = '';
var currencyCodeSlected = '';
var currencyCodeEdit = '';
var primaryCode = currencyCode;  // set value from store setting
function AddMoreVariantOptions(obj) {
    //  $(obj).parents('tr').html());
    if ($(obj).parents('tr:eq(0)').find(".ddlCostVariantsCollection").find("option:selected").val() != 0) {
        if ($(obj).parents('tr:eq(0)').find(".ddlCostVariantsCollection").find("option").length > 2) {
            var variantOptIndex = $(obj).closest("tr")[0].rowIndex;
            var parentTable = $(obj).parents('table:eq(0)');

            var trhtml = '<tr id="variantOptValue_' + variantOptIndex + '">' + $(obj).parents('tr:eq(0)').html() + "</tr>";
            //disabled last selected cv
            var optionValue = $.trim($(obj).parents('tr:eq(0)').find(".ddlCostVariantsCollection").val());
            $(obj).parents('tr:eq(0)').find(".ddlCostVariantsCollection").attr("disabled", "disabled"); //find("option").not(":selected").remove();
            parentTable.find('td').find("a.cssClassCvAddMore").remove();
            //remove dropdown unused cv
            $(trhtml).appendTo(parentTable).find(".ddlCostVariantsCollection").find("option[value=" + optionValue + "]").remove();
            parentTable.find(".ddlCostVariantValues:last").html('<option value="0">' + getLocale(AspxUserDashBoard, "No values") + '</option>');
            //parentTable.find('td').find("a.cssClassCvClose").attr("href", '#variantOptValue_' + variantOptIndex + '');
            parentTable.find('td').find("a.cssClassCvClose").show();

        } else {
        csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Store does not have more cost variants") + '</p>');
        }
    } else {
    csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Please select cost variants") + '</p>');
    }
}

function CloseCombinationRow(obj) {
    var properties = {
        onComplete: function(e) {
            if (e) {
                var parentTable = $(obj).parents('table:eq(0)');
                if (parentTable.find('tr').length > 2) {
                    if ($(obj).parents('tr:eq(0)').find("a.cssClassCvAddMore").length > 0) {
                        var addmore = $(obj).parents('tr:eq(0)').find("a.cssClassCvAddMore");
                        $(obj).parents('tr:eq(0)').prev('tr').find(".tdCostVariant").append(addmore);

                        $(obj).parents('tr:eq(0)').prev('tr').find(".ddlCostVariantsCollection").removeAttr("disabled").attr("enabled", "enabled");
                        $(obj).parents('tr:eq(0)').remove();
                        if (parentTable.find('tr').length <= 2) {
                            parentTable.find('td').find("a.cssClassCvClose").hide();
                        }
                    } else {
                        if ($(obj).closest("tr")[0].rowIndex == 1) {

                            var $dvDropdown = $(obj).parents('tr:eq(0)').find(".ddlCostVariantsCollection");
                            var val = $(obj).parents('tr:eq(0)').next('tr:eq(0)').find(".ddlCostVariantsCollection").find("option:selected").val();
                            $(obj).parents('tr:eq(0)').next('tr:eq(0)').find(".ddlCostVariantsCollection").html($dvDropdown.html()).find("option[value=" + val + "]").attr('selected', 'selected');
                            $(obj).parents('tr:eq(0)').remove();
                            if (parentTable.find('tr').length <= 2) {
                                parentTable.find('td').find("a.cssClassCvClose").hide();
                            }
                        } else {
                            $(obj).parents('tr:eq(0)').remove();
                            if (parentTable.find('tr').length <= 2) {
                                parentTable.find('td').find("a.cssClassCvClose").hide();
                            }
                        }
                    }
                } else {
                    parentTable.find('td').find("a.cssClassCvClose").hide();
                }
                return false;
            }
        }
    };
    // Ask user's confirmation before delete records
    csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, 'Delete Confirmation') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Are you sure you want to delete this Cost Variant Combination?') + "</p>", properties);

}

function CloseMainCombinationList(obj) {
   
    //    var properties = {
    //        onComplete: function(e) {
    //            if (e) {
    var parentTable = $(obj).parents('table:eq(0)');
    //   $("#dvCvForm table:first").find(">tbody>tr").each(function() {
    //       if ($.trim($(this).html()) == "") {
    //           $(this).remove();
    //       }
    //   });

    if (parentTable.find('>tbody>tr').length > 1) {
        listImages.splice($(obj).closest("tr")[0].rowIndex - 1, 1);
        //                    if ($(obj).parents('tr:eq(0)').find("button.cssclassAddCVariants").length > 0) {
        var addmore = $(obj).parents('tr:eq(0)').find("button.cssclassAddCVariants");
        //  $(this).parents('tr:eq(0)').prev('tr').find(".tdCostVariant").append(addmore);
        $(obj).parents('tr:eq(0)').prev('tr').find(".addButton").append(addmore);
        $(obj).parents('tr:eq(0)').remove();
        if (parentTable.find('>tbody>tr').length <= 1) {
            parentTable.find('>tbody>tr>td').find("a.cssClassCvCloseMain").hide();
        }
        // }
        else {
            if ($(obj).closest("tr")[0].rowIndex == 1) {
                $(obj).parents('tr:eq(0)').remove();
                //                            if (parentTable.find('>tbody>tr').length <= 1) {
                //                                parentTable.find('>tbody>tr>td').find("a.cssClassCvCloseMain").hide();
                //                            }
            } else {
                $(obj).parents('tr:eq(0)').remove();
                //                            if (parentTable.find('>tbody>tr').length <= 1) {
                //                                parentTable.find('>tbody>tr>td').find("a.cssClassCvCloseMain").hide();
                //                            }
            }
        }
    }
    else {
        AddCombinationListRow(obj);
        $(obj).parents('tr:eq(0)').remove();
    }
    $("#dvCvForm table:first").find(">tbody>tr").find(".cssClassDisplayOrder").each(function(index, i) {
        $(this).val(index + 1);
    });
    return false;
    //            }
    //        }
    //    };
    //    // Ask user's confirmation before delete records
    //    csscody.confirm("<h2>Delete Confirmation</h2><p>Are you sure you want to delete this Cost Variant Combination?</p>", properties);
}

function AddCombinationListRow(obj) {
    var variantIndex = $(".cssclassAddCVariants:last").closest("tr")[0].rowIndex + 1;
    var parentTable = $(obj).parents('table:eq(0)');
    var trhtml = '<tr id="variantValue_' + variantIndex + '">' + $(obj).parents('tr:eq(0)').html() + '</tr>';
    parentTable.find('td').find("button.cssclassAddCVariants").remove();
    $("#dvCvForm table:first").append(trhtml);
    $("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find("table tr:gt(1)").remove(); //.find(".ddlCostVariantsCollection").find("option[value=" + optionValue + "]").remove();
    $(".cssClassTableCostVariant:last").find(".ddlCostVariantsCollection").removeAttr("disabled").attr("enabled", "enabled");
    $(".cssClassTableCostVariant:last").find(".ddlCostVariantsCollection").removeAttr("disabled").attr("enabled", "enabled");
    $(".cssClassTableCostVariant:last").find(".ddlCostVariantValues").html("<option value='0'>" + getLocale(AspxUserDashBoard, "No values") + "</option>").removeAttr("disabled").attr("enabled", "enabled");
    $("#dvCvForm table:first").find(">tbody>tr:last").find(".cssClassDisplayOrder").val(variantIndex);
    var addMoreLen = $(".cssClassTableCostVariant:last").find(".tdCostVariant").find("a.cssClassCvAddMore").length;
    if (addMoreLen > 0) {

    } else {
        // $(".cssClassTableCostVariant:last").find("a.cssClassCvClose").hide();
    $(".cssClassTableCostVariant:last").find(".tdCostVariant").append("<a href=\"#variantValue_" + variantIndex + "\" class=\"cssClassCvAddMore\" onclick=\"AddMoreVariantOptions(this); return false;\">" + getLocale(AspxUserDashBoard, "Add More") + "</a>");
    }

    $("#dvCvForm table:first>tbody>tr").find("a.cssClassCvCloseMain").show();
}

CheckContains = function(checkon, toCheck) {
    if (checkon != null) {
        var x = checkon.split('@');
        for (var i = 0; i < x.length; i++) {
            if (x[i] == toCheck) {
                return true;
            }
        }
    }
    return false;
};

var UserDashBoardItemMangement = {};
$(function() {
    var progressTime = null;
    var progress = 0;
    var pcount = 0;
    var percentageInterval = [10, 20, 30, 40, 60, 80, 100];
    var timeInterval = [1, 2, 4, 2, 1, 5, 1];
    var DatePickerIDs = new Array();
    var FileUploaderIDs = new Array();
    var htmlEditorIDs = new Array();
    var editorList = new Array();
    var rowCount = 0;
    var contents = '';
    var isSaved = false;
    var FormCount = new Array();
    var itemEditFlag = 0;
    var productUrl = '';
    var serviceBit = false;
    var aspxCommonObj = function() {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()
        };
        return aspxCommonInfo;
    };

    function getObjects(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects.push(obj[i][key]);
            }
        }
        return objects;
    }

    function removeDuplicateCombination(arrlist) {
        var costVariantCombinationList = [];
        costVariantCombinationList = arrlist.reverse();
        var arr = getObjects(arrlist, 'CombinationType');
        var arr2 = getObjects(arrlist, 'CombinationValues');
        var i = arr.length, j, val;
        if (i > 1) {
            while (i--) {
                val = arr[i];
                var combType = val.split('@');
                var combTypeValues = arr2[i].split('@');
                j = i;
                while (j--) {
                    var combType2 = arr[j].split('@');
                    var combType2Value = arr2[j].split('@');
                    if (combType.length == combType2.length) {
                        var matchedtype = 0;
                        var matchedValues = 0;
                        for (var z = 0; z < combType.length; z++) {
                            if (CheckContains(val, combType2[z])) {
                                matchedtype++;
                            }
                            if (matchedtype == combType2.length) {

                                for (var y = 0; y < combType2.length; y++) {
                                    if (CheckContains(arr2[i], combType2Value[y])) {
                                        matchedValues++;
                                    }
                                    if (matchedValues == combType2.length) {
                                        arr.splice(j, 1);
                                        arr2.splice(j, 1);
                                        arrlist.splice(j, 1);
                                        costVariantCombinationList = [];
                                        costVariantCombinationList = arrlist;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return costVariantCombinationList;
    }

    var quickNavigation = "";
    var $accordian;
    UserDashBoardItemMangement = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            baseURL: aspxservicePath + 'AspxCommerceWebService.asmx/',
            method: "",
            url: ""
        },
        vars: {
            isUnique: false,
            itemId: 0,
            sku: '',
            itemCostVariantId: 0,
            costVariantId: 0,
            isItemHasCostVariant: false,
            attributeSetId: 1,
            itemTypeId: 1,
            showDeleteBtn: false,
            arrRoles: new Array(),
            parentRow: ''
            //,
            //ID: 0,
            //Editor: ''
        },
        init: function() {

            //         $('#txtMaxDownload').bind('paste', function(e) {
            //             e.preventDefault();       
            //         });
            var url = window.location.href;
            productUrl = url.substring(0, url.indexOf('Admin'));

            $('#ddlAttributeSet').change(function() {
                UserDashBoardItemMangement.BindItemType();
            });
            $('#ddlAttributeType').change(function() {
                UserDashBoardItemMangement.HideAllCostVariantImages();
            });
            UserDashBoardItemMangement.LoadItemStaticImage();
            // UserDashBoardItemMangement.BindCostVariantsInputType();

            UserDashBoardItemMangement.InitializeVariantTable();

            UserDashBoardItemMangement.BindItemsGrid(null, null, null, null, null, null);
            UserDashBoardItemMangement.BindItemType();
            UserDashBoardItemMangement.BindAttributeSet();
            //CreateCategoryTree();
            $("#gdvItems_grid").show();
            $("#gdvItems_form").hide();
            $("#gdvItems_accordin").hide();
            //$("#ItemMgt_itemID").val(0);

            $('#btnDeleteSelected').click(function() {
                AspxCommerce.CheckSessionActive(aspxCommonObj());
                if (AspxCommerce.vars.IsAlive) {
                    var item_ids = '';
                    //Get the multiple Ids of the item selected
                    $(".itemsChkbox").each(function(i) {
                        if ($(this).attr("checked")) {
                            item_ids += $(this).val() + ',';
                        }
                    });
                    if (item_ids != "") {
                        var properties = {
                            onComplete: function(e) {
                                UserDashBoardItemMangement.ConfirmDeleteMultiple(item_ids, e);
                            }
                        };
                        csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, 'Delete Confirmation') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Are you sure you want to delete the selected item(s)?') + "</p>", properties);
                    } else {
                        csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Alert") + '</h2><p>' + getLocale(AspxUserDashBoard, "Please select at least one item before delete") + '</p>');
                    }
                } else {
                    window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
                }
            });

            $('#btnReset').click(function() {
                UserDashBoardItemMangement.ClearForm();
            });

            $('#btnContinue').click(function() {
                $('#Todatevalidation').attr('class', '');
                $('#Fromdatevalidation').attr('class', '');
                $("#ItemMgt_itemID").val(0);
                var attributeSetId = '';
                var itemTypeId = '';
                attributeSetId = $("#ddlAttributeSet").val();
                itemTypeId = $("#ddlItemType").val();
                $("#spanSample").html("");
                $("#spanActual").html("");
                if (attributeSetId == 3 && itemTypeId == 4) {
                    serviceBit = true;
                } else {
                    serviceBit = false;
                }
                UserDashBoardItemMangement.ContinueForm(false, attributeSetId, itemTypeId, 0);
                UserDashBoardItemMangement.BindItemTypeSearch();
                UserDashBoardItemMangement.BindAttributeSetSearch();

            });

            $('#btnSearchItems').live('click', function() {
                UserDashBoardItemMangement.SearchItems();
            });
            $('#txtSearchSKU,#txtSearchName,#ddlSearchItemType,#ddlAttributeSetName,#ddlVisibitity,#ddlIsActive').keyup(function(event) {
                if (event.keyCode == 13) {
                    $('#btnSearchItems').click();
                }
            });

            $("#btnSearchRelatedItems").live("click", function() {
                UserDashBoardItemMangement.SearchRelatedItems();
                return false;
            });
            $('#txtItemSKU,#txtItemName,#ddlSelectItemType,#ddlSelectAttributeSetName').live("keyup", function(event) {
                if (event.keyCode == 13) {
                    $('#btnSearchRelatedItems').click();
                    return false;
                }
            });

            $("#btnSearchUpSellItems").live("click", function() {
                UserDashBoardItemMangement.SearchUpSellItems();
                return false;
            });
            $('#txtItemSKUSell,#txtItemNameSell,#ddlSelectItemTypeSell,#ddlSelectAttributeSetNameSell').live("keyup", function(event) {
                if (event.keyCode == 13) {
                    $('#btnSearchUpSellItems').click();
                    return false;
                }
            });

            $("#btnSearchCrossSellItems").live("click", function() {
                UserDashBoardItemMangement.SearchCrossSellItems();
                return false;
            });
            $('#txtItemSKUcs,#txtItemNamecs,#ddlSelectItemTypecs,#ddlSelectAttributeSetNamecs').live("keyup", function(event) {
                if (event.keyCode == 13) {
                    $('#btnSearchCrossSellItems').click();
                    return false;
                }
            });


            $("#btnAddNew").click(function() {
                $('#lblNewItem').text('Add New Item');
                $("#btnDelete").hide();
                // UserDashBoardItemMangement.ClearAttributeForm();
                $("#gdvItems_grid").hide();
                $("#gdvItems_form").show();
                $("#gdvItems_accordin").hide();
                //            $("#ddlSearchItemType>option").remove();
                //            $("#ddlAttributeSetName>option").remove();
                $("#ddlSearchItemType>option").val(1);
                $("#ddlAttributeSetName>option").val(1);
                primaryCode = currencyCode;
            });

            $("#btnBack").click(function() {
                $("#gdvItems_grid").show();
                $("#gdvItems_form").hide();
                $("#gdvItems_accordin").hide();
            });

            $('#btnReturn').live('click', function() {
                UserDashBoardItemMangement.BackToItemGrid();
            });

            $('#btnResetForm').click(function() {
                UserDashBoardItemMangement.ClearAttributeForm();
            });

            $('#btnDelete').live('click', function() {
                UserDashBoardItemMangement.vars.itemId = $("#ItemMgt_itemID").val();
                UserDashBoardItemMangement.ClickToDelete(UserDashBoardItemMangement.vars.itemId);
            });

            $(".cssClassClose").click(function() {
                $('#fade, #popuprel2').fadeOut();
                $("#VariantsImagesTable").hide();
            });

            $("#btnImageBack").click(function() {
                $('#fade, #popuprel2').fadeOut();
                $("#VariantsImagesTable").hide();
            });



            //validate name on focus lost
            $('#txtCostVariantName').live('blur', function() {
                // Validate name
                var errors = '';
                var costVariantName = $(this).val();
                var variant_id = $('#btnSaveItemVariantOption').attr("name");
                if (variant_id == '') {
                    variant_id = 0;
                }
                if (!costVariantName) {
                    errors += getLocale(AspxUserDashBoard, "Please enter cost variant name");
                }
                //check uniqueness
                else if (!UserDashBoardItemMangement.IsUniqueCostVariant(costVariantName, variant_id)) {
                    errors += getLocale(AspxUserDashBoard, "Please enter unique cost variant name!") + costVariantName.trim() + getLocale(AspxUserDashBoard, "already exists.") + '<br/>';
                    $('#txtCostVariantName').val('');
                }

                if (errors) {
                    $('.cssClassCostVarRight').hide();
                    $('.cssClassCostVarError').show();
                    $(".cssClassCostVarError").parent('div').addClass("diverror");
                    $('.cssClassCostVarError').prevAll("input:first").addClass("error");
                    $('.cssClassCostVarError').html(errors);
                    return false;
                } else {
                    $('.cssClassCostVarRight').show();
                    $('.cssClassCostVarError').hide();
                    $(".cssClassCostVarError").parent('div').removeClass("diverror");
                    $('.cssClassCostVarError').prevAll("input:first").removeClass("error");
                }
            });

            $('#btnApplyExisingOption').click(function() {
                var variant_Id = $('#ddlExistingOptions').val();
                var item_Id = $("#ItemMgt_itemID").val();
                if (variant_Id != null && item_Id != null) {
                    var params = { itemId: item_Id, costVariantID: variant_Id, aspxCommonObj: aspxCommonObj() };
                    var mydata = JSON2.stringify(params);
                    $.ajax({
                        type: "POST",
                        url: aspxservicePath + "AspxCommerceWebService.asmx/AddItemCostVariant",
                        data: mydata,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function() {
                            $('#fade, #popuprel').fadeOut();
                            UserDashBoardItemMangement.BindItemCostVariantInGrid(item_Id);
                            UserDashBoardItemMangement.BindCostVariantsOptions(item_Id);
                            csscody.info("<h2>" + getLocale(AspxUserDashBoard, 'Successful Message') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Cost variant option has been applied successfully.') + "</p>");
                        },
                        error: function() {
                            csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to save item cost variant!") + '</p>');
                        }
                    });
                }
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: UserDashBoardItemMangement.config.type,
                contentType: UserDashBoardItemMangement.config.contentType,
                cache: UserDashBoardItemMangement.config.cache,
                async: UserDashBoardItemMangement.config.async,
                url: UserDashBoardItemMangement.config.url,
                data: UserDashBoardItemMangement.config.data,
                dataType: UserDashBoardItemMangement.config.dataType,
                success: UserDashBoardItemMangement.ajaxSuccess,
                error: UserDashBoardItemMangement.ajaxFailure
            });
        },
        LoadItemStaticImage: function() {
            $('.cssClassAddRow').attr('src', '' + aspxTemplateFolderPath + '/images/admin/icon_add.gif');
            $('.cssClassCloneRow').attr('src', '' + aspxTemplateFolderPath + '/images/admin/icon_clone.gif');
            $('.cssClassDeleteRow').attr('src', '' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif');
            $('.cssClassSuccessImg').attr('src', '' + aspxTemplateFolderPath + '/images/right.jpg');
        },
        GiftCard: function() {

            var $ajaxCall = function(method, param, successFx, error) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    url: aspxservicePath + 'AspxCommerceWebService.asmx/' + method,
                    data: param,
                    dataType: "json",
                    success: successFx,
                    error: error
                });
            };

            var getGiftCardCategory = function() {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
                $ajaxCall("GetAllGiftCardCategory", param, bindGiftCartCategory, null);
            };

            var bindGiftCartCategory = function(data) {

                var options1 = '<option value="0" selected="selected" >' + getLocale(AspxUserDashBoard, "All") + '</option>';
                var options;
                $.each(data.d, function(index, item) {
                    options += "<option value=" + item.GiftCardCategoryId + ">" + item.GiftCardCategory + "</option>";
                });
                $("#ddlGCCategory").html('').append(options1 + options);
                $("#editGCCategory,#ddlGCCategoryImg").html('').append('<option value="0">' + getLocale(AspxUserDashBoard, "Choose One") + '</option>' + options);
                if (itemId != 0) {
                    getGiftCardItemCategory();
                }
            };

            var saveGiftCardItemCategory = function(id) {
                var ids = $("#ddlGCCategory").val() == null ? 0 : $("#ddlGCCategory").val().join(',');
                var param = JSON2.stringify({ itemId: id, ids: ids, aspxCommonObj: aspxCommonObj() });
                $ajaxCall("SaveGiftCardItemCategory", param, null, null);
                // csscody.info('<h2>Successful Message</h2><p>GiftCard category has been saved successfully.</p>');
            };
            var getGiftCardItemCategory = function(x, y) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var param = JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonInfo });
                $ajaxCall("GetGiftCardItemCategory", param, bindGiftCardItemCategory, null);
            };

            var bindGiftCardItemCategory = function(data) {

                if (data.d != "") {
                    var ids = data.d;
                    if (ids == "0") {
                        $("#ddlGCCategory").find("option[value=0]").attr('selected', 'selected');
                    }
                    else {
                        var id = ids.split(',');
                        $("#ddlGCCategory").find("option[value=0]").removeAttr('selected');
                        for (var i = 0; i < id.length; i++) {
                            $("#ddlGCCategory").find("option[value=" + id[i] + "]").attr('selected', 'selected');
                        }

                    }
                }
            };

            var load = function() {
                getGiftCardCategory();
            };
            return {
                Init: load,
                SaveItemCategory: saveGiftCardItemCategory
            };
            //() intializing funtion with this ie call function as GiftCart.Init()
            //if not then have to call like this GiftCard().Init()
        } (),
        BindTaxManageRule: function() {
            var isActive = true;
            this.config.url = this.config.baseURL + "GetAllTaxItemClass";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), isActive: isActive });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        BindItemQuantityDiscountsByItemID: function(itemId) {
            this.config.url = this.config.baseURL + "GetItemQuantityDiscountsByItemID";
            this.config.data = JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },

        GetUserInRoleList: function(arrRoles) {
            var aspxCommonInfo = aspxCommonObj();
            delete aspxCommonInfo.StoreID;
            delete aspxCommonInfo.CultureName;
            var IsAll = true;
            this.config.url = this.config.baseURL + "BindRoles";
            this.config.data = JSON2.stringify({ isAll: IsAll, aspxCommonObj: aspxCommonInfo });
            this.vars.arrRoles = arrRoles;
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);
        },

        BindRolesList: function(item) {
            var RoleInCheckbox = '<input type="checkbox" class="cssClassCheckBox"  value="' + item.RoleID + '" /><label>' + item.RoleName + '</label>&nbsp &nbsp';
            $('.cssClassUsersInRoleCheckBox').append(RoleInCheckbox);
        },
        DeleteItemDiscountQuantity: function() {
            var item_Id = $("#ItemMgt_itemID").val();

            this.config.url = this.config.baseURL + "DeleteItemQuantityDiscount";
            this.config.data = JSON2.stringify({ quantityDiscountID: 0, itemID: item_Id, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 44;
            this.ajaxCall(this.config);
        },
        SaveItemDiscountQuantity: function() {
            var _DiscountQuantityOptions = '';
            var item_Id = $("#ItemMgt_itemID").val();
            var isValid = true;
            $("#tblQuantityDiscount>tbody tr").each(function() {
                _DiscountQuantityOptions += $(this).find(".cssClassQuantityDiscount").val() + ',';
                if ($(this).find(".cssClassQuantity").val() != '') {
                    _DiscountQuantityOptions += $(this).find(".cssClassQuantity").val() + ',';
                } else {
                    isValid = false;
                }
                if ($(this).find(".cssClassPrice").val() != '') {
                    _DiscountQuantityOptions += $(this).find(".cssClassPrice").val() + '%';
                } else {
                    isValid = false;
                }
                var check = $(this).find("input[type='checkbox']:checked");
                if (check.length != 0) {
                    $.each(check, function() {
                        _DiscountQuantityOptions += $(this).val() + ',';
                    });
                    _DiscountQuantityOptions = _DiscountQuantityOptions.substring(0, _DiscountQuantityOptions.length - 1);
                } else {
                    isValid = false;
                }
                _DiscountQuantityOptions += '#';
            });
            if (isValid) {
                this.config.url = this.config.baseURL + "SaveItemDiscountQuantity";
                this.config.data = JSON2.stringify({ discountQuantity: _DiscountQuantityOptions, itemID: item_Id, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = 4;
                this.ajaxCall(this.config);
            }
            else {
                csscody.alert("'<h2>" + getLocale(AspxUserDashBoard, 'Information Alert') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Please submit valid data!.') + "</p>'");
            }
        },
        HideAllCostVariantImages: function() {
            var selectedVal = $("#ddlAttributeType").val();
            if (selectedVal == 9 || selectedVal == 11) { //Radio //CheckBox
                $("#tblVariantTable>tbody").find("tr:gt(0)").remove();
                $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassAddRow").hide();
                $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassCloneRow").hide();
            } else {
                $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassAddRow").show();
                $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassCloneRow").show();
            }
        },

        InitializeVariantTable: function() {
            $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassDeleteRow").hide();

            $("img.cssClassAddRow").live("click", function() {
                var cloneRow = $(this).closest('tr').clone(true);
                $(cloneRow).appendTo("#tblVariantTable");
                $(cloneRow).find("input[type='text']").val('');
                $(cloneRow).find("input[type='hidden']").val('0');
                $(cloneRow).find(".cssClassDeleteRow").show();
                $(cloneRow).find(".classAddImages").removeAttr("name");
                var x = $("#tblVariantTable>tbody>tr").length - 1;
                $(cloneRow).find(".classAddImages").attr("value", x);
                var rid = $("#tblVariantTable>tbody>tr").length - 1;
                $(cloneRow).find(".classAddImagesEdit").removeAttr("name").removeAttr("value");
                $(cloneRow).find(".classAddImagesEdit").attr("value", rid);
                $("#VariantsImagesTable>tbody").html('');
            });

            $("img.cssClassCloneRow").live("click", function() {
                var cloneRow = $(this).closest('tr').clone(true);
                $(cloneRow).appendTo("#tblVariantTable");
                $(cloneRow).find("input[type='hidden']").val('0');

                $(cloneRow).find("select.cssClassPriceModifierType").val($(this).closest('tr').find("select.cssClassPriceModifierType").val());
                $(cloneRow).find("select.cssClassWeightModifierType").val($(this).closest('tr').find("select.cssClassWeightModifierType").val());
                $(cloneRow).find("select.cssClassIsActive").val($(this).closest('tr').find("select.cssClassIsActive").val());
                $(cloneRow).find(".cssClassDeleteRow").show();
            });

            $("img.cssClassDeleteRow").live("click", function() {
                x--;
                var parentRow = $(this).closest('tr');
                if (parentRow.is(":first-child")) {
                    return false;
                } else {
                    var costVariantValueID = $(parentRow).find("input[type='hidden']").val();
                    if (costVariantValueID > 0) {
                        var item_Id = $("#ItemMgt_itemID").val();
                        UserDashBoardItemMangement.vars.parentRow = $(parentRow);
                        UserDashBoardItemMangement.DeleteItemCostVaraiantValue(costVariantValueID, item_Id, parentRow);
                    } else {
                        $(parentRow).remove();
                    }
                }
            });

            //FOR Item Quantity Discount
            $("img.cssClassAddDiscountRow").live("click", function() {
                var cloneRow = $(this).closest('tr').clone(true);
                $(cloneRow).appendTo("#tblQuantityDiscount");
                $(cloneRow).find("input[type='text']").val('');
                $(cloneRow).find("input[type='hidden']").val('0');
                $(cloneRow).find("input[type='checkbox']").removeAttr('checked');
                $(cloneRow).find("img.cssClassDeleteDiscountRow").show();
            });
            $("img.cssClassCloneDiscountRow").live("click", function() {
                var cloneRow = $(this).closest('tr').clone(true);
                $(cloneRow).appendTo("#tblQuantityDiscount");
                $(cloneRow).find("input[type='hidden']").val('0');
                $(cloneRow).find("img.cssClassDeleteDiscountRow").show();
            });

            $("img.cssClassDeleteDiscountRow").live("click", function() {
                var parentRow = $(this).closest('tr');
                if (parentRow.is(":first-child")) {
                    return false;
                } else {
                    var quantityDiscountID = $(parentRow).find("input[type='hidden']").val();
                    if (quantityDiscountID > 0) {
                        UserDashBoardItemMangement.vars.parentRow = $(parentRow);
                        UserDashBoardItemMangement.DeleteItemQuantityDiscount(quantityDiscountID, parentRow);
                    } else {
                        $(parentRow).remove();
                    }
                }
            });
        },

        //For item quantity discount
        DeleteItemQuantityDiscount: function(quantityDiscountID, parentRow) {
            var properties = {
                onComplete: function(e) {
                    UserDashBoardItemMangement.ConfirmDeleteItemQuantityDiscount(quantityDiscountID, parentRow, e);
                }
            };
            // Ask user's confirmation before delete records
            csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete this item quatity discount value?") + "</p>", properties);
        },

        ConfirmDeleteItemQuantityDiscount: function(quantityDiscountID, parentRow, event) {
            if (event) {
                var _itemId = $("#ItemMgt_itemID").val();
                this.config.url = this.config.baseURL + "DeleteItemQuantityDiscount";
                this.config.data = JSON2.stringify({ quantityDiscountID: quantityDiscountID, itemID: _itemId, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = 5;
                this.ajaxCall(this.config);
            }
        },

        DeleteItemCostVaraiantValue: function(costVariantValueID, itemId, parentRow) {
            var properties = {
                onComplete: function(e) {
                    UserDashBoardItemMangement.ConfirmDeleteItemCostVariantValue(costVariantValueID, itemId, parentRow, e);
                }
            };
            // Ask user's confirmation before delete records
            csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, 'Delete Confirmation') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Are you sure you want to delete this item cost variant value?') + "</p>", properties);
        },

        ConfirmDeleteItemCostVariantValue: function(costVariantValueID, itemId, parentRow, event) {
            if (event) {
                // Function not found in webservice
                this.config.url = this.config.baseURL + "DeleteItemCostVariantValue";
                this.config.data = JSON2.stringify({ costVariantValueID: costVariantValueID, itemId: itemId, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = 6;
                this.ajaxCall(this.config);
            }
            return false;
        },

        BindItemCostVariantInGrid: function(itemId) {
            // Function not found in webservice
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.method = "GetItemCostVariants";
            this.config.data = { aspxCommonObj: aspxCommonInfo, itemID: itemId };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvItemCostVariantGrid_pagesize").length > 0) ? $("#gdvItemCostVariantGrid_pagesize :selected").text() : 10;

            $("#gdvItemCostVariantGrid").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                { display: getLocale(AspxUserDashBoard, 'Item Cost Variant ID'), name: 'item_costvariant_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'Cost Variant ID'), name: 'cost_variant_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'Cost Variant Name'), name: 'cost_variant_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Actions'), name: 'action', cssclass: 'cssClassAction', controlclass: '', coltype: 'label', align: 'center' }
         		],
                buttons: [
                { display: getLocale(AspxUserDashBoard, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'UserDashBoardItemMangement.EditItemCostVariant', arguments: '1,2,3' },
                { display: getLocale(AspxUserDashBoard, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'UserDashBoardItemMangement.DeleteItemCostVariant', arguments: '1' }
         		],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 4: { sorter: false} }
            });
        },

        EditItemCostVariant: function(tblID, argus) {
            $(".cssClassDisplayOrder").live('keypress', function(e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    if (e.which == 45) { return true; }
                    return false;
                }
            });

            $(".cssClassPriceModifier").live('keypress', function(e) {
                if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {
                    if (e.which == 45) { return true; }
                    return false;
                }
            });

            $(".cssClassWeightModifier").live('keypress', function(e) {
                if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {
                    if (e.which == 45) { return true; }
                    return false;
                }
            });
            $(".cssClassWeightModifier").live("contextmenu", function(e) {
                return false;
            });

            $(".cssClassPriceModifier").live("contextmenu", function(e) {
                return false;
            });
            switch (tblID) {
                case "gdvItemCostVariantGrid":
                    UserDashBoardItemMangement.ClearVariantForm();
                    $('#ddlAttributeType').html('');
                    UserDashBoardItemMangement.BindCostVariantsInputType();
                    UserDashBoardItemMangement.OnInit();
                    $("#tabFrontDisplay").hide();

                    $("#hdnItemCostVar").val(argus[0]);

                    $("#btnSaveItemVariantOption").attr("name", argus[4]);
                    $("#lblHeading").html(getLocale(AspxUserDashBoard, 'Edit Cost variant Option:') + argus[5]);
                    UserDashBoardItemMangement.BindItemCostVariantsDetail(argus[0], argus[3], argus[4]);

                    break;
                default:
                    break;
            }
        },

        BindItemCostVariantsDetail: function(itemCostVariantId, itemId, costVariantID) {
            // Function not found in webservice
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.url = this.config.baseURL + "GetItemCostVariantInfoByCostVariantID";
            this.config.data = JSON2.stringify({ itemCostVariantId: itemCostVariantId, itemId: itemId, costVariantID: costVariantID, aspxCommonObj: aspxCommonInfo });
            this.vars.itemCostVariantId = itemCostVariantId;
            this.vars.itemId = itemId;
            this.vars.costVariantId = costVariantID;
            this.config.ajaxCallMode = 7;
            this.ajaxCall(this.config);
        },

        SubmitForm: function(frmID, attributeSetId, itemTypeId) {
            var itemId = $("#ItemMgt_itemID").val();
            var frm = $("#" + frmID);
            $('.cssClassTextArea').each(function() {
                $(this).val(Encoder.htmlEncode($(this).val()));
            });
            for (var i = 0; i < editorList.length; i++) {
                var id = String(editorList[i].ID);
                var textArea = $("#" + id.replace("_editor", ""));
                textArea.val(Encoder.htmlEncode(editorList[i].Editor.getData()));
            }

            // Prevent submit if validation fails
            var itemSKUTxtBoxID = $("#hdnSKUTxtBox").val();
            var itemSKU = $("#" + itemSKUTxtBoxID).val();
            var validPrice = false;
            var validNewDate = false;
            var validActiveDate = false;
            var validFeaturedDate = false;
            var validSpecialDate = false;

            validPrice = UserDashBoardItemMangement.ValidateExtraField("classItemPrice", "classItemListPrice", "price", getLocale(AspxUserDashBoard, "List Price should be equal or greater than Price!"));
            validNewDate = UserDashBoardItemMangement.ValidateExtraField("classNewFrom", "classNewTo", "date", getLocale(AspxUserDashBoard, "To date must be higher date than From date!"));
            validActiveDate = UserDashBoardItemMangement.ValidateExtraField("classActiveFrom", "classActiveTo", "date", getLocale(AspxUserDashBoard, "Active To date must be higher date than Active From date!"));

            if ($('.FeaturedDropDown').val() == 3) {
                validFeaturedDate = UserDashBoardItemMangement.ValidateExtraField("classFeaturedFrom", "classFeaturedTo", "date", getLocale(AspxUserDashBoard, "Featured To date must be higher date than Featured From date!"));
            }
            else {
                $('.classFeaturedFrom').removeClass('error');
                $('.classFeaturedTo').removeClass('error');
                $('.classFeaturedFrom').parent('div').removeClass('diverror');
                $('.classFeaturedTo').parent('div').removeClass('diverror');
                validFeaturedDate = true;
            }

            if ($('.SpecialDropDown').val() == 5) {
                validSpecialDate = UserDashBoardItemMangement.ValidateExtraField("classSpecialFrom", "classSpecialTo", "date", getLocale(AspxUserDashBoard, "Special To date must be higher date than Special From date!"));
            }
            else {
                $('.classSpecialFrom').removeClass('error');
                $('.classSpecialTo').removeClass('error');
                $('.classSpecialFrom').parent('div').removeClass('diverror');
                $('.classSpecialFrom').parent('div').removeClass('diverror');
                validSpecialDate = true;
            }
            if (checkForm(frm) && UserDashBoardItemMangement.CheckUniqueness(itemSKU, itemId) && validPrice && validNewDate && validActiveDate && validFeaturedDate && validSpecialDate) {
                UserDashBoardItemMangement.SaveItem("#" + frmID, attributeSetId, itemTypeId, itemId);
            }
            else {
                var errorAccr = $("#st_vertical").find('.diverror:first').parents('div.st_tab_view').find('h3>a').html();
                //alert($("#accordion").find('.diverror').parents('table').prev('.accordionHeading').html());
                //alert(errorAccr);
                if (errorAccr != "" || errorAccr != null) {

                    var accrHeading = $("#st_vertical").find('.st_tab'); // $("#st_vertical").find('.st_tab_view>h3');

                    //alert(accrHeading.length);
                    $.each(accrHeading, function(i, item) {
                        //alert($(item).html() + '::' + errorAccr);
                        //console.log(item)
                        if ($.trim($(item).html()) == $.trim(errorAccr)) {
                            $(item).trigger('click');
                            return false;
                            // alert(1);
                            // $("#accordion").accordion("option", "active", i);
                        }
                    });
                }
                return false;
            }
        },

        FillForm: function(response) {
            $.each(response.d, function(index, item) {
                //General properties Tab
                $('#txtCostVariantName').val(item.CostVariantName);
                $('#txtCostVariantName').attr('disabled', 'disabled');
                $('#ddlAttributeType').val(item.InputTypeID);
                $('#ddlAttributeType').attr('disabled', 'disabled');
                $('#txtDisplayOrder').val(item.DisplayOrder);
                $("#txtDescription").val(item.Description);
                $("#txtDescription").attr('disabled', 'disabled');
                $('input[name=chkActive]').attr('checked', item.IsActive);
                //frontend properties tab  
                $('input[name=chkUseInAdvancedSearch]').attr('checked', item.ShowInAdvanceSearch);
                $('input[name=chkComparable]').attr('checked', item.ShowInComparison);
                $('input[name=chkUseForPriceRule]').attr('checked', item.IsIncludeInPriceRule);
                $('input[name=chkIsUseInFilter]').attr('checked', item.IsUseInFilter);
            });
        },

        BindItemCostVariantValueByCostVariantID: function(itemCostVariantId, itemId, costVariantId) {
            // Function not found in webservice
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            this.config.url = this.config.baseURL + "GetItemCostVariantValuesByCostVariantID";
            this.config.data = JSON2.stringify({ itemCostVariantId: itemCostVariantId, itemId: itemId, costVariantID: costVariantId, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 8;
            this.ajaxCall(this.config);
        },
        DeleteItemCostVariant: function(tblID, argus) {
            switch (tblID) {
                case "gdvItemCostVariantGrid":
                    UserDashBoardItemMangement.DeleteItemCostVariantByID(argus[0], argus[3]);
                    break;
                default:
                    break;
            }
        },

        DeleteItemCostVariantByID: function(_itemCostVariantId, _itemId) {
            var properties = {
                onComplete: function(e) {
                    UserDashBoardItemMangement.ConfirmSingleDeleteItemCostVariant(_itemCostVariantId, _itemId, e);
                }
            };
            // Ask user's confirmation before delete records
            csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, 'Delete Confirmation') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Are you sure you want to delete this item cost variant option?') + "</p>", properties);
        },

        ConfirmSingleDeleteItemCostVariant: function(itemCostVariantID, itemId, event) {
            if (event) {
                this.config.url = this.config.baseURL + "DeleteSingleItemCostVariant";
                this.config.data = JSON2.stringify({ itemCostVariantID: itemCostVariantID, itemId: itemId, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = 9;
                this.ajaxCall(this.config);
            }
            return false;
        },

        BindCostVariantsInputType: function() {
            this.config.url = this.config.baseURL + "GetCostVariantInputTypeList";
            this.config.data = "{}";
            this.config.ajaxCallMode = 10;
            this.ajaxCall(this.config);
        },

        BindInputTypeDropDown: function(item) {
            //$("#ddlAttributeType").get(0).options[$("#ddlAttributeType").get(0).options.length] = new Option(item.InputType, item.InputTypeID);
            $("#ddlAttributeType").append("<option value=" + item.InputTypeID + ">" + item.InputType + "</option>");
        },

        BindCostVariantsOptions: function(itemId) {
            this.config.url = this.config.baseURL + "GetCostVariantsOptionsList";
            this.config.data = JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 11;
            this.ajaxCall(this.config);
        },

        BindCostVariantsDropDown: function(item) {
            //$("#ddlExistingOptions").get(0).options[$("#ddlExistingOptions").get(0).options.length] = new Option(item.InputType, item.InputTypeID);
            $("#ddlExistingOptions").append("<option value=" + item.CostVariantID + ">" + item.CostVariantName + "</option>");
        },

        ClearVariantForm: function() {
            $("#btnSaveItemVariantOption").removeAttr("name");
            $("#btnResetVariantOptions").show();

            $("#txtCostVariantName").val('');
            $('#txtCostVariantName').removeAttr('disabled');
            $("#txtDescription").val('');
            $("#txtDescription").removeAttr('disabled');
            $('#ddlAttributeType').val(1);
            $('#ddlAttributeType').removeAttr('disabled');
            $('#txtDisplayOrder').val('');
            $('input[name=chkActive]').attr('checked', 'checked');
            $('.cssClassPriceModifierType,.cssClassWeightModifierType').val(0);
            $('.cssClassIsActive').val(1);
            $("#lblHeading").html(getLocale(AspxUserDashBoard, "Add New Cost Variant Option"));

            //Next Tab
            //$('input[name=chkShowInSearch]').removeAttr('checked');
            //$('input[name=chkShowInGrid]').removeAttr('checked');
            $('input[name=chkUseInAdvancedSearch]').removeAttr('checked');
            $('input[name=chkComparable]').removeAttr('checked');
            $('input[name=chkUseForPriceRule]').removeAttr('checked');
            //$('input[name=chkUseForPromoRule]').removeAttr('checked');
            //$('input[name=chkIsEnableSorting]').removeAttr('checked');
            //$('input[name=chkIsUseInFilter]').removeAttr('checked');
            //$('input[name=chkUseForRating]').removeAttr('checked');

            //Clear variant tab
            $("#tblVariantTable>tbody").find("tr:gt(0)").remove();
            $("#tblVariantTable>tbody").find("input[type='text']").val('');
            $("#tblVariantTable>tbody").find("select").val(1);
            $("#tblVariantTable>tbody").find("input[type='hidden']").val('0');
            $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassDeleteRow").hide();
            return false;
        },

        OnInit: function() {
            $('#btnResetVariantOptions').hide();
            $("#hdnItemCostVar").val('0');
            $('.cssClassCostVarRight').hide();
            $('.cssClassCostVarError').hide();
            UserDashBoardItemMangement.SelectFirstTab();
        },

        SelectFirstTab: function() {
            var $tabs = $('#container-7').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
            $tabs.tabs('select', 0);
        },

        IsUniqueCostVariant: function(costVariantName, costVariantId) {
            this.config.url = this.config.baseURL + "CheckUniqueCostVariantName";
            this.config.data = JSON2.stringify({ costVariantName: costVariantName, costVariantId: costVariantId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 12;
            this.ajaxCall(this.config);
            return UserDashBoardItemMangement.vars.isUnique;
        },

        SaveItemCostVariantsInfo: function() {
            UserDashBoardItemMangement.SaveItemCostVariant();
        },

        SaveItemCostVariant: function() {
            var CostVariantCombinationList = [];
            var i = 0;
            var totalQuantity = 0;
            $("#dvCvForm table:first").find(">tbody>tr").each(function() {
                var cType = [];
                var cValues = [];
                var cValuesName = [];
                var CostVariantCombination = {
                    DisplayOrder: "",
                    CombinationType: "",
                    CombinationValues: "",
                    CombinationValuesName: "",
                    CombinationPriceModifier: "",
                    CombinationPriceModifierType: "",
                    CombinationWeightModifier: "",
                    CombinationWeightModifierType: "",
                    CombinationQuantity: 0,
                    CombinationIsActive: false,
                    ImageFile: ""
                };
                //                $("#dvCvForm table:first").find(">tbody>tr").each(function() {
                //                    if ($.trim($(this).html()) == "") {
                //                        $(this).remove();
                //                    }
                //                });
                $(this).find(">td.cssClassTableCostVariant").each(function() {

                    $(this).find("tbody>tr").each(function() {
                        if ($(this).find(".tdCostVariant .ddlCostVariantsCollection").find("option:selected").val() != 0) {
                            //get first cv combination values
                            if ($(this).find(".tdCostVariantValues .ddlCostVariantValues").find("option:selected").val() != 0) {
                                cType.push($(this).find(".tdCostVariant .ddlCostVariantsCollection").find("option:selected").val());
                                cValues.push($(this).find(".tdCostVariantValues .ddlCostVariantValues").find("option:selected").val());
                                cValuesName.push($(this).find(".tdCostVariantValues .ddlCostVariantValues").find("option:selected").text());
                            }

                        }
                    });
                    if (cType.length != 0 && cValues.length != 0) {
                        CostVariantCombination.CombinationType = cType.join('@');
                        CostVariantCombination.CombinationValues = cValues.join('@');
                        CostVariantCombination.CombinationValuesName = cValuesName.join('@');

                        if ($(this).find("div .cssclassCostVariantItemQuantity").val() != '') {
                            CostVariantCombination.CombinationQuantity = $(this).find("div .cssclassCostVariantItemQuantity").val();
                        } else {
                            CostVariantCombination.CombinationQuantity = "0";
                        }

                        if ($(this).find("div .cssClassPriceModifier").val() != '') {
                            CostVariantCombination.CombinationPriceModifier = $(this).find("div .cssClassPriceModifier").val();
                        } else {
                            CostVariantCombination.CombinationPriceModifier = "0.00";
                        }
                        CostVariantCombination.CombinationPriceModifierType = $.trim($(this).find("div .cssClassPriceModifierType").find("option:selected").val()) == 0 ? true : false;
                        if ($(this).find("div .cssClassWeightModifier").val() != '') {
                            CostVariantCombination.CombinationWeightModifier = $(this).find("div .cssClassWeightModifier").val();
                        } else {
                            CostVariantCombination.CombinationWeightModifier = "0.00";
                        }
                        CostVariantCombination.CombinationWeightModifierType = $.trim($(this).find("div .cssClassWeightModifierType").find("option:selected").val()) == 0 ? true : false;
                    }
                });
                if (CostVariantCombination.CombinationType != "") {
                    CostVariantCombination.DisplayOrder = $(this).find(".cssClassDisplayOrder").val();
                    CostVariantCombination.CombinationIsActive = $(this).find(".cssClassIsActive").find("option:selected").val() == 1 ? true : false;
                    if ($(this).find(".cssClassIsActive").find("option:selected").val() == 1) {
                        totalQuantity += parseInt($(this).find("div .cssclassCostVariantItemQuantity").val());
                    }
                    CostVariantCombination.ImageFile = listImages[i];
                    i++;
                    CostVariantCombinationList.push(CostVariantCombination);
                    // CostVariantCombinationList += CostVariantCombination.join(',')+"%";
                }
            });
            var valx = getObjects(CostVariantCombinationList, 'CombinationType');
            var valy = getObjects(CostVariantCombinationList, 'CombinationValues');
            if (valx.length >= 1 && valx[0] != "") {
                $(".cssClassItemQuantity").val(totalQuantity);
                if ($(".cssClassItemQuantity").val() == "0") {
                    $(".cssClassItemQuantity").removeAttr("disabled", "disabled");
                } else {
                    $(".cssClassItemQuantity").attr("disabled", "disabled");
                }
                removeDuplicateCombination(CostVariantCombinationList);
                var ItemsCostVariant = {
                    ItemId: $("#ItemMgt_itemID").val(),
                    //  PortalId: portalId,
                    //  StoreId: storeId,
                    //  UserName: userName,
                    //  CultureName: cultureName,
                    VariantOptions: CostVariantCombinationList
                };
                //UserDashBoardItemMangement.AddItemCostVariantInfo(ItemsCostVariant);
            }
            else {
                CostVariantCombinationList = [];
                var ItemsCostVariant = {
                    ItemId: $("#ItemMgt_itemID").val(),
                    //   PortalId: portalId,
                    //  StoreId: storeId,
                    //   UserName: userName,
                    //   CultureName: cultureName,
                    VariantOptions: CostVariantCombinationList
                };
                //UserDashBoardItemMangement.AddItemCostVariantInfo(ItemsCostVariant);
                //csscody.alert("<h2>Information Alert</h2><p>Please enter item cost variant properties.</p>");
            }
            UserDashBoardItemMangement.AddItemCostVariantInfo(ItemsCostVariant);
        },

        AddItemCostVariantInfo: function(objCVCombination) {

            var params = { itemCostVariants: objCVCombination, aspxCommonObj: aspxCommonObj() };
            this.config.url = this.config.baseURL + "SaveAndUpdateItemCostVariantCombination";
            this.config.data = JSON2.stringify(params);
            this.config.ajaxCallMode = 13;
            this.vars.itemId = objCVCombination.ItemId;
            this.ajaxCall(this.config);
        },

        ClickToDeleteImage: function(objImg) {
            $(objImg).closest('span').html('');
            return false;
        },

        ConfirmDeleteMultiple: function(item_ids, event) {
            if (event) {
                UserDashBoardItemMangement.DeleteMultipleItems(item_ids);
            }
            return false;
        },

        DeleteMultipleItems: function(_itemIds) {
            //Pass the selected attribute id and other parameters
            this.config.url = this.config.baseURL + "DeleteMultipleItemsByItemID";
            this.config.data = JSON2.stringify({ itemIds: _itemIds, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 14;
            this.ajaxCall(this.config);
        },

        BindItemsGrid: function(sku, Nm, itemType, attributeSetNm, visibility, isAct) {
            var getItemListObj = {
                SKU: sku,
                ItemName: Nm,
                ItemTypeID: parseInt(itemType),
                AttributeSetID: attributeSetNm,
                Visibility: visibility,
                IsActive: isAct
            };
            this.config.method = "GetItemsList";
            this.config.data = { getItemListObj: getItemListObj, aspxCommonObj: aspxCommonObj() };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvItems_pagesize").length > 0) ? $("#gdvItems_pagesize :selected").text() : 10;

            $("#gdvItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                { display: getLocale(AspxUserDashBoard, 'ItemID'), name: 'id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'itemsChkbox', elemDefault: false, controlclass: 'classClassCheckBox' },
                { display: getLocale(AspxUserDashBoard, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'SKU'), name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'ItemType ID'), name: 'itemtype_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Type'), name: 'item_type', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'AttributeSet ID'), name: 'attributeset_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Attribute Set Name'), name: 'attribute_set_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Price'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'List Price'), name: 'listprice', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'Quantity'), name: 'qty', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Visibility'), name: 'visibility', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Is Active?'), name: 'status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd' },
                { display: getLocale(AspxUserDashBoard, 'IDTobeChecked'), name: 'id_to_check', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' },
                { display: getLocale(AspxUserDashBoard, 'CurrencyCode'), name: 'currency_code', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
         		],
                buttons: [
                { display: getLocale(AspxUserDashBoard, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'UserDashBoardItemMangement.EditItems', arguments: '4,6,15' },
                { display: getLocale(AspxUserDashBoard, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'UserDashBoardItemMangement.DeleteItems', arguments: '' }
         		],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 14: { sorter: false }, 16: { sorter: false} }
            });
            $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
        },

        EditItems: function(tblID, argus) {
            $('#lblNewItem').text('Edit Item');
            $(window).scrollTop(0);
            $('#Todatevalidation').attr('class', '');
            $('#Fromdatevalidation').attr('class', '');
            switch (tblID) {
                case "gdvItems":
                    if (argus[3] == 4 && argus[4] == 3) {
                        serviceBit = true;
                    } else {
                        serviceBit = false;
                    }
                    primaryCode = argus[5];
                    currencyCodeSlected = argus[5];
                    currencyCodeEdit = argus[5];
                    UserDashBoardItemMangement.ContinueForm(true, argus[4], argus[3], argus[0]);
                    itemTypeId = argus[3];
                    $("#ItemMgt_itemID").val(argus[0]);
                    UserDashBoardItemMangement.InitCostVariantCombination(argus[0]);
                    var itemSKUTxtBoxID = $("#hdnSKUTxtBox").val();
                    var sku = $("#" + itemSKUTxtBoxID).val();
                    UserDashBoardItemMangement.vars.sku = sku;
                    // $("#ddlCurrencyDashBoard").val(argus[5]);
                    // $("#ddlCurrencyLP").val(argus[5]);
                    UserDashBoardItemMangement.BindItemTypeSearch();
                    UserDashBoardItemMangement.BindAttributeSetSearch();
                    $('#tblQuantityDiscount').find('thead').find('.cssClassUnitPrice').html(getLocale(AspxUserDashBoard, "Unit Price") + '(' + currencyCodeEdit + '):');
                    break;
                default:
                    break;
            }
        },
        GetPriceHistory: function(id) {
            var param = JSON2.stringify({ itemId: id, aspxCommerceObj: aspxCommonObj() });
            this.config.method = "GetPriceHistoryList";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = param;
            this.config.ajaxCallMode = 34;
            this.ajaxCall(this.config);
        },

        ClickToDelete: function(itemId) {
            UserDashBoardItemMangement.DeleteItemByID(itemId);
        },

        DeleteItems: function(tblID, argus) {
            switch (tblID) {
                case "gdvItems":
                    AspxCommerce.CheckSessionActive(aspxCommonObj());
                    if (AspxCommerce.vars.IsAlive) {
                        UserDashBoardItemMangement.DeleteItemByID(argus[0]);
                    }
                    else {
                        window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
                    }
                    break;
                default:
                    break;
            }
        },

        DeleteItemByID: function(_itemId) {
            var properties = { onComplete: function(e) {
                UserDashBoardItemMangement.ConfirmSingleDelete(_itemId, e);
            }
            };
            // Ask user's confirmation before delete records        
            csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete this item?") + "</p>", properties);
        },

        ConfirmSingleDelete: function(item_id, event) {
            if (event) {
                UserDashBoardItemMangement.DeleteSingleItem(item_id);
            }
            return false;
        },

        DeleteSingleItem: function(_itemId) {
            //Pass the selected attribute id and other parameters
            this.config.url = this.config.baseURL + "DeleteItemByItemID";
            this.config.data = JSON2.stringify({ itemId: parseInt(_itemId), aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 15;
            this.ajaxCall(this.config);
        },

        ActiveItems: function(tblID, argus) {
            switch (tblID) {
                case "gdvItems":
                    UserDashBoardItemMangement.ActivateItemID(argus[0], true);
                    break;
                default:
                    break;
            }
        },

        DeactiveItems: function(tblID, argus) {
            switch (tblID) {
                case "gdvItems":
                    UserDashBoardItemMangement.DeActivateItemID(argus[0], false);
                    break;
                default:
                    break;
            }
        },

        DeActivateItemID: function(_itemId, _isActive) {
            //Pass the selected attribute id and other parameters
            AspxCommerce.CheckSessionActive(aspxCommonObj());
            if (AspxCommerce.vars.IsAlive) {
                this.config.url = this.config.baseURL + "UpdateItemIsActiveByItemID";
                this.config.data = JSON2.stringify({ itemId: parseInt(_itemId), aspxCommonObj: aspxCommonObj(), isActive: _isActive });
                this.config.ajaxCallMode = 16;
                this.ajaxCall(this.config);
                return false;
            } else {
                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
            }
        },

        ActivateItemID: function(_itemId, _isActive) {
            //Pass the selected attribute id and other parameters
            AspxCommerce.CheckSessionActive(aspxCommonObj());
            if (AspxCommerce.vars.IsAlive) {
                this.config.url = this.config.baseURL + "UpdateItemIsActiveByItemID";
                this.config.data = JSON2.stringify({ itemId: parseInt(_itemId), aspxCommonObj: aspxCommonObj(), isActive: _isActive });
                this.config.ajaxCallMode = 17;
                this.ajaxCall(this.config);
                return false;
            }
            else {
                window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
            }
        },

        BindRelatedItemsGrid: function(selfItemID, itemSKU, itemName, itemTypeID, attributeSetID) {

            var itemDetails = {
                serviceBit: serviceBit,
                selfItemId: selfItemID,
                itemSKU: itemSKU,
                itemName: itemName,
                itemTypeID: itemTypeID,
                attributeSetID: attributeSetID
            };
            this.config.method = "GetRelatedItemsList";
            this.config.data = { IDCommonObj: itemDetails, aspxCommonObj: aspxCommonObj() };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvRelatedItems_pagesize").length > 0) ? $("#gdvRelatedItems_pagesize :selected").text() : 10;

            $("#gdvRelatedItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                { display: getLocale(AspxUserDashBoard, 'ItemID'), name: 'id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'chkRelatedControls', controlclass: 'classClassCheckBox', checkedItems: '14' },
                { display: getLocale(AspxUserDashBoard, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'SKU'), name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'ItemType ID'), name: 'itemtype_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Type'), name: 'item_type', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'AttributeSet ID'), name: 'attributeset_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Attribute Set Name'), name: 'attribute_set_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Price'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'List Price'), name: 'listprice', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'Quantity'), name: 'qty', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Visibility'), name: 'visibility', cssclass: 'cssClassHeadBoolean', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Is Active?'), name: 'status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd' },
                { display: getLocale(AspxUserDashBoard, 'IDTobeChecked'), name: 'id_to_check', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' },
                { display: getLocale(AspxUserDashBoard, 'CurrencyCode'), name: 'currency_code', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true }
         		],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 14: { sorter: false} }
            });
        },

        BindUpSellItemsGrid: function(selfItemID, itemSKU, itemName, itemTypeID, attributeSetID) {
            var UpSellCommonObj = {
                serviceBit: serviceBit,
                selfItemId: selfItemID,
                itemSKU: itemSKU,
                itemName: itemName,
                itemTypeID: itemTypeID,
                attributeSetID: attributeSetID
            };
            this.config.method = "GetUpSellItemsList";
            this.config.data = { UpSellCommonObj: UpSellCommonObj, aspxCommonObj: aspxCommonObj() };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvUpSellItems_pagesize").length > 0) ? $("#gdvUpSellItems_pagesize :selected").text() : 10;

            $("#gdvUpSellItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                { display: getLocale(AspxUserDashBoard, 'ItemID'), name: 'id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'chkUpSellControls', controlclass: 'classClassCheckBox', checkedItems: '14' },
                { display: getLocale(AspxUserDashBoard, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'SKU'), name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'ItemType ID'), name: 'itemtype_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Type'), name: 'item_type', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'AttributeSet ID'), name: 'attributeset_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Attribute Set Name'), name: 'attribute_set_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Price'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'List Price'), name: 'listprice', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'Quantity'), name: 'qty', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Visibility'), name: 'visibility', cssclass: 'cssClassHeadBoolean', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Is Active?'), name: 'status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd' },
                { display: getLocale(AspxUserDashBoard, 'IDTobeChecked'), name: 'id_to_check', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' },
                { display: getLocale(AspxUserDashBoard, 'CurrencyCode'), name: 'currency_code', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true }
         		],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 14: { sorter: false} }
            });
        },

        BindCrossSellItemsGrid: function(selfItemID, itemSKU, itemName, itemTypeID, attributeSetID) {
            var CrossSellCommonObj = {
                serviceBit: serviceBit,
                selfItemId: selfItemID,
                itemSKU: itemSKU,
                itemName: itemName,
                itemTypeID: itemTypeID,
                attributeSetID: attributeSetID
            };
            this.config.method = "GetCrossSellItemsList";
            this.config.data = { CrossSellCommonObj: CrossSellCommonObj, aspxCommonObj: aspxCommonObj() };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvCrossSellItems_pagesize").length > 0) ? $("#gdvCrossSellItems_pagesize :selected").text() : 10;

            $("#gdvCrossSellItems").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                { display: getLocale(AspxUserDashBoard, 'ItemID'), name: 'id', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'chkCrossSellControls', controlclass: 'classClassCheckBox', checkedItems: '14' },
                { display: getLocale(AspxUserDashBoard, 'Item ID'), name: 'item_id', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                { display: getLocale(AspxUserDashBoard, 'SKU'), name: 'sku', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'ItemType ID'), name: 'itemtype_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Type'), name: 'item_type', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'AttributeSet ID'), name: 'attributeset_id', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Attribute Set Name'), name: 'attribute_set_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Price'), name: 'price', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'List Price'), name: 'listprice', cssclass: '', controlclass: 'cssClassFormatCurrency', coltype: 'currencyFront', align: 'right' },
                { display: getLocale(AspxUserDashBoard, 'Quantity'), name: 'qty', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Visibility'), name: 'visibility', cssclass: 'cssClassHeadBoolean', hide: true, controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Is Active?'), name: 'status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left' },
                { display: getLocale(AspxUserDashBoard, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd' },
                { display: getLocale(AspxUserDashBoard, 'IDTobeChecked'), name: 'id_to_check', cssclass: 'cssClassHeadNumber', hide: true, controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' },
                { display: getLocale(AspxUserDashBoard, 'CurrencyCode'), name: 'currency_code', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true }
         		],
                rp: perpage,
                nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 14: { sorter: false} }
            });
        },

        BindAttributeSet: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.constructor = null;
            this.config.url = this.config.baseURL + "GetAttributeSetList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 18;
            this.ajaxCall(this.config);
        },

        BindItemType: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.CultureName = null;
            this.config.url = this.config.baseURL + "GetAttributesItemTypeList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 19;
            this.ajaxCall(this.config);
        },

        BindAttributeSetSearch: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.constructor = null;
            this.config.url = this.config.baseURL + "GetAttributeSetList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 35;
            this.ajaxCall(this.config);
        },

        BindItemTypeSearch: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            aspxCommonInfo.CultureName = null;
            this.config.url = this.config.baseURL + "GetAttributesItemTypeList";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 36;
            this.ajaxCall(this.config);
        },

        ClearForm: function() {
            $('#ddlAttributeSet').val('2');
            $('#ddlItemType').val('1');
        },

        ContinueForm: function(showDeleteBtn, attributeSetId, itemTypeId, itemId) {
            UserDashBoardItemMangement.ResetHTMLEditors();
            UserDashBoardItemMangement.GetFormFieldList(attributeSetId, itemTypeId, showDeleteBtn, itemId);
        },

        FillItemAttributes: function(itemId, item) {
            var attNameNoSpace = "_" + item.AttributeName.replace(new RegExp(" ", "g"), '-');
            var id = item.AttributeID + '_' + item.InputTypeID + '_' + item.ValidationTypeID + '_' + item.IsRequired + '_' + item.GroupID
        + '_' + item.IsIncludeInPriceRule + '_' + item.DisplayOrder;

            var val = '';
            //alert(htmlEditorIDs.length + '::' + editorList.length);
            switch (item.InputTypeID) {
                case 1: //TextField
                    if (item.ValidationTypeID == 3) {
                        $("#" + id).val(item.DecimalValue);
                        break;
                    }
                    else if (item.ValidationTypeID == 5) {
                        $("#" + id).val(item.IntValue);
                        break;
                    }
                    else {
                        //alert(item.NvarcharValue);
                        $("#" + id).val(unescape(item.NvarcharValue));
                        break;
                    }
                    //$("#" + id).removeClass('hint');
                case 2: //TextArea
                    $("#" + id).val(Encoder.htmlDecode(item.TextValue));
                    //alert(item.TextValue + '::' + editorList.length);
                    //$("#" + id).removeClass('hint');
                    for (var i = 0; i < editorList.length; i++) {
                        if (editorList[i].ID == id + "_editor") {
                            editorList[i].Editor.setData(Encoder.htmlDecode(item.TextValue));
                        }
                    }
                    break;
                case 3: //Date
                    if (item.DateValue == "1/1/1900 12:00:00 AM") {
                        $("#" + id).val("");
                    }
                    else {
                        $("#" + id).val(formatDate(new Date(item.DateValue), "yyyy/MM/dd"));
                    }
                    //$("#" + id).val(formatDate(new Date(DateDeserialize(item.DateValue)), "yyyy/MM/dd"));
                    //$("#" + id).removeClass('hint');
                    break;
                case 4: //Boolean
                    if (item.BooleanValue.toLowerCase() == "true") {
                        $("#" + id).attr("checked", "checked");
                    }
                    else if (item.BooleanValue.toLowerCase() == "false") {
                        $("#" + id).removeAttr("checked");
                    }
                    break;
                case 5: //MultipleSelect
                    $("#" + id).val('');
                    val = item.OptionValues;
                    vals = val.split(',');
                    $.each(vals, function(i) {
                        $("#" + id + " option[value=" + vals[i] + "]").attr("selected", "selected");
                    });
                    break;
                case 6: //DropDown
                    $("#" + id).val('');
                    val = item.OptionValues;
                    vals = val.split(',');
                    $.each(vals, function(i) {
                        $("#" + id + " option[value=" + vals[i] + "]").attr("selected", "selected");
                    });
                    break;
                case 7: //Price
                    $("#" + id).val(item.DecimalValue);
                    //$("#" + id).removeClass('hint');
                    break;
                case 8: //File
                    //alert(item.FileValue);
                    var d = $("#" + id).parent();
                    var filePath = item.FileValue;
                    var fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
                    if (filePath != "") {
                        var fileExt = (-1 !== filePath.indexOf('.')) ? filePath.replace(/.*[.]/, '') : '';
                        myregexp = new RegExp("(jpg|jpeg|jpe|gif|bmp|png|ico)", "i");
                        if (myregexp.test(fileExt)) {
                            $(d).find('span.response').html('<div class="cssClassLeft"><img src="' + aspxRootPath + filePath + '" class="uploadImage" /></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardItemMangement.ClickToDeleteImage(this)" alt="Delete" title="Delete"/></div>');
                            //alert($(d).find('span.response').html());
                        }
                        else {
                            $(d).find('span.response').html('<div class="cssClassLeft"><a href="' + aspxRootPath + filePath + '" class="uploadFile" target="_blank">' + fileName + '</a></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardItemMangement.ClickToDeleteImage(this)" alt="Delete" title="Delete"/></div>');
                        }
                        $(d).find('input[type="hidden"]').val(filePath);
                    }
                    break;
                case 9: //Radio
                    if (item.OptionValues == "") {
                        $("#" + id).removeAttr("checked");
                    }
                    else {
                        $("#" + id).attr("checked", "checked");
                    }
                    break;
                case 10: //RadioButtonList
                    $("input[value=" + item.OptionValues + "]:radio").attr("checked", "checked");
                    break;
                case 11: //CheckBox
                    if (item.OptionValues == "") {
                        $("#" + id).removeAttr("checked");
                    }
                    else {
                        $("#" + id).attr("checked", "checked");
                    }
                    break;
                case 12: //CheckBoxList
                    var inputs = $("input[name=" + id + "]");
                    $.each(inputs, function(i) {
                        $(this).removeAttr("checked");
                    });
                    val = item.OptionValues;
                    vals = val.split(',');
                    $.each(vals, function(i) {
                        $("input[value=" + vals[i] + "]").attr("checked", "checked");
                    });
                    break;
                case 13: //Password  
                    $("#" + id).val(item.NvarcharValue);
                    //$("#" + id).removeClass('hint');  
                    break;
            }
        },

        DateDeserialize: function(dateStr) {
            //return eval(dateStr.replace(/\//g, ' '));
            return dateStr.replace(new RegExp("\/", "g"), ' ');
        },

        GetFormFieldList: function(attributeSetId, itemTypeId, showDeleteBtn, itemId) {
            this.config.url = this.config.baseURL + "GetItemFormAttributes";
            this.config.data = JSON2.stringify({ attributeSetID: attributeSetId, itemTypeID: itemTypeId, aspxCommonObj: aspxCommonObj() });
            this.vars.attributeSetId = attributeSetId;
            this.vars.itemTypeId = itemTypeId;
            this.vars.showDeleteBtn = showDeleteBtn;
            this.vars.itemId = itemId;
            this.config.ajaxCallMode = 20;
            this.ajaxCall(this.config);
        },

        BindDataInImageTab: function(itemId) {
            //alert(itemId);
            if (itemId > 0) {
                //  alert("Reached");
                this.config.url = this.config.baseURL + "GetImageContents";
                this.config.data = JSON2.stringify({ itemID: itemId, aspxCommonObj: aspxCommonObj() });
                this.config.ajaxCallMode = 21;
                this.ajaxCall(this.config);
            }
        },

        BindToTable: function(msg) {
            //UserDashBoardItemMangement.RemoveHtml();
            //UserDashBoardItemMangement.CreateHtml();
            UserDashBoardItemMangement.CreateTableHeader();
            //rowCount = msg.d.length;
            $.each(msg.d, function(index, item) {
                // create table elements
                rowCount = index;
                var j = rowCount + 1;
                var newRowImage = '';
                var imagePath = itemImagePath + item.ImagePath;
                newRowImage += '<tr class="classRowData' + j + '" value="' + item.ItemImageID + '">';
                newRowImage += '<td><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" class="uploadImage"/></td>';
                newRowImage += '<td><div class="field required"><input type="textbox" class="sfInputbox cssClassImageDiscription" maxlength="256" value="' + item.AlternateText + '"/><span class="iferror"></span></div></td>';
                newRowImage += '<td><div class="field required"><input type="textbox" class="cssClassDisplayOrder" maxlength="3" value="' + item.DisplayOrder + '"/><span class="iferror">' + getLocale(AspxUserDashBoard, "Integer Number") + '</span></div></td>';
                newRowImage += '<td><input type="radio" name="itemimage_' + j + '" value="Base Image" class="notTest" /></td>';
                newRowImage += '<td><input type="radio" name="itemimage_' + j + '" value="Small Image" class="notTest" /></td>';
                newRowImage += '<td><input type="radio" name="itemimage_' + j + '"  value="ThumbNail" class="notTest" /></td>';
                newRowImage += '<td><input type="checkbox" class="notTest" id="chkIsActive_' + j + '" /></td>';
                newRowImage += '<td><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" id="btn' + j + '" onclick="UserDashBoardItemMangement.DeleteImage(this)" /></td>';
                newRowImage += '</tr>';
                $("#multipleUpload .classTableWrapper > tbody").append(newRowImage);
                $(".cssClassDisplayOrder").bind("contextmenu", function(e) {
                    return false;
                });
                $('.cssClassDisplayOrder').bind('paste', function(e) {
                    e.preventDefault();
                });
                if (item.IsActive) {
                    $('#chkIsActive_' + j + '').attr('checked', item.IsActive);
                }

                // alert("Image type is " + item.ImageType);
                if (item.ImageType == "Base Image") {
                    $("tbody>tr.classRowData" + j + ">td:eq(3) input:radio").attr("checked", "checked");
                }
                else if (item.ImageType == "Small Image") {
                    $("tbody>tr.classRowData" + j + ">td:eq(4) input:radio").attr("checked", "checked");
                }
                else if (item.ImageType == "ThumbNail") {
                    $("tbody>tr.classRowData" + j + ">td:eq(5) input:radio").attr("checked", "checked");
                }
                //code to delete row
                $("img.imgDelete").click(function() {
                    $("#VariantsImagesTable").html('');
                    $(this).parent().parent().remove();
                    //  DeleteSelectedItemImage(index,);
                    $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfEven");
                    $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfOdd");
                    $("#multipleUpload .classTableWrapper > tbody tr:even").addClass("sfEven");
                    $("#multipleUpload .classTableWrapper > tbody tr:odd").addClass("sfOdd");
                });
                rowCount++;
            });
            $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfEven");
            $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfOdd");
            $("#multipleUpload .classTableWrapper > tbody tr:even").addClass("sfEven");
            $("#multipleUpload .classTableWrapper > tbody tr:odd").addClass("sfOdd");
            $(".cssClassImageDiscription").keypress(function(e) {
                if (e.which == 35 || e.which == 37) {
                    return false;
                }
            });
        },

        ImageUploader: function(maxFileSize) {
            var aspxCommonInfo = aspxCommonObj();
            var uploader = new qq.FileUploader({
                element: document.getElementById('fileUpload'),
                action: aspxUserItemModulePath + 'MultipleFileUploadHandler.ashx',
                allowedExtensions: ['jpg', 'jpeg', 'jpe', 'gif', 'bmp', 'png', 'ico'],
                debug: false,
                params: aspxCommonInfo,
                sizeLimit: maxFileSize * 1024,
                multiple: true,
                onComplete: function(id, fileName, responseJSON) {
                    if (responseJSON.success) {
                        UserDashBoardItemMangement.CreateTableHeader();
                        UserDashBoardItemMangement.AddNewImages(responseJSON.path);
                        $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfEven");
                        $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfOdd");
                        $("#multipleUpload .classTableWrapper > tbody tr:even").addClass("sfEven");
                        $("#multipleUpload .classTableWrapper > tbody tr:odd").addClass("sfOdd");
                        $(".cssClassDisplayOrder").keypress(function(e) {
                            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                                return false;
                            }
                        });
                        $(".cssClassDescription").keypress(function(e) {
                            if (e.which == 35 || e.which == 37) {
                                return false;
                            }
                        });

                    }
                }
            });

        },


        //progress bar  function
        dummyProgress: function(progressBar, percentage) {
            if (percentageInterval[pcount]) {
                progress = percentageInterval[pcount] + Math.floor(Math.random() * 2);
                percentage.text(progress.toString() + '%');
                progressBar.progressbar({
                    value: progress
                });
                var percent = percentage.text();
                percent = percent.replace('%', '');
                if (percent == 100 || percent > 100) {
                    percentage.text('100%');
                    //  percentage.html('');
                    $('.progress').hide(1000);
                }
            }

            if (timeInterval[pcount]) {
                progressTime = setTimeout(function() {
                    UserDashBoardItemMangement.dummyProgress(progressBar, percentage);
                }, timeInterval[pcount] * 50);
            }
            pcount++;
        },
        //end of progress bar function

        AddNewImages: function(response) {
            // create table elements
            var j = rowCount + 1;
            var newRowImage = '';
            newRowImage += '<tr class="classRowData' + j + '" value="0">';
            newRowImage += '<td><img src="' + aspxRootPath + response + '" class="uploadImage" height="93px" width="125px"/></td>';
            newRowImage += '<td><div class="field required"><input type="textbox" class="sfInputbox cssClassDescription" maxlength="256" /><span class="iferror"></span></div></td>';
            newRowImage += '<td><div class="field required"><input type="textbox" class="cssClassDisplayOrder" maxlength="3" /><span class="iferror">' + getLocale(AspxUserDashBoard, "Integer Number") + '</span></div></td>';
            newRowImage += '<td><input type="radio" name="itemimage_' + j + '" value="Base Image" class="notTest" /></td>';
            newRowImage += '<td><input type="radio" name="itemimage_' + j + '" value="Small Image" class="notTest" /></td>';
            newRowImage += '<td><input type="radio" name="itemimage_' + j + '"  value="ThumbNail" class="notTest" checked="checked" /></td>';
            newRowImage += '<td><input type="checkbox" class="notTest" checked="checked"/></td>';
            newRowImage += '<td><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png"  id="btn' + j + '" onclick="UserDashBoardItemMangement.DeleteImage(this)" /></td>';
            newRowImage += '</tr>';
            $("#multipleUpload .classTableWrapper > tbody").append(newRowImage);
            if (j == 1) {
                $('input[value="Base Image"]').attr("checked", "checked");
            }
            rowCount++;
            $(".cssClassDescription").keypress(function(e) {
                if (e.which == 35 || e.which == 37) {
                    return false;
                }
            });
            $(".cssClassDisplayOrder").bind("contextmenu", function(e) {
                return false;
            });
            $('.cssClassDisplayOrder').bind('paste', function(e) {
                e.preventDefault();
            });
            //TO DISALLOW SAME DISPLAY ORDER 
            $("#divTableWrapper>table").find("td .cssClassDisplayOrder").bind("keyup", function() {
                var value = $(this).val(); var clear = false;
                $("#divTableWrapper>table").find("td .cssClassDisplayOrder").not(this).each(function() {
                    if ($(this).val() == value) {
                        clear = true;
                    }
                });
                if (clear) $(this).val('');
            });
        },


        DeleteImage: function(onjImg) { //code to delete row                
            $(onjImg).parent().parent().remove();
            $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfEven");
            $("#multipleUpload .classTableWrapper > tbody tr").removeClass("sfOdd");
            $("#multipleUpload .classTableWrapper > tbody tr:even").addClass("sfEven");
            $("#multipleUpload .classTableWrapper > tbody tr:odd").addClass("sfOdd");
        },

        CreateForm: function(itemFormFields, attributeSetId, itemTypeId, showDeleteBtn, itemId) {
            var strDynRow = '';
            var attGroup = new Array();
            attGroup.length = 0;
            $.each(itemFormFields, function(index, item) {
                var isGroupExist = false;
                for (var i = 0; i < attGroup.length; i++) {
                    if (attGroup[i].key == item.GroupID) {
                        isGroupExist = true;
                        break;
                    }
                }
                if (!isGroupExist) {
                    attGroup.push({ key: item.GroupID, value: item.GroupName, html: '' });
                }
            });
            FileUploaderIDs = new Array();
            $.each(itemFormFields, function(index, item) {
                strDynRow = UserDashBoardItemMangement.createRow(itemId, itemTypeId, item.AttributeID, item.AttributeName, item.InputTypeID, item.InputTypeValues != "" ? eval(item.InputTypeValues) : '', item.DefaultValue, item.ToolTip, item.Length, item.ValidationTypeID, item.IsEnableEditor, item.IsUnique, item.IsRequired, item.GroupID, item.IsIncludeInPriceRule, item.DisplayOrder);
                //strDynRow = '<table width="100%" border="0" cellpadding="0" cellspacing="0">' + strDynRow + '</table>';
                for (var i = 0; i < attGroup.length; i++) {
                    if (attGroup[i].key == item.GroupID) {
                        attGroup[i].html += strDynRow;
                    }
                }
            });

            UserDashBoardItemMangement.CreateAccordion(attGroup, attributeSetId, itemTypeId, showDeleteBtn);
            $("#newCostvariants").hide();
            UserDashBoardItemMangement.BindTaxManageRule();
            //Functions for static Tree and Grid Binding
            if (itemTypeId == 1 || itemTypeId == 2) {
                UserDashBoardItemMangement.GetAllBrandForItem();
                if (itemId > 0) {
                    UserDashBoardItemMangement.GetBrandByItemID(itemId);
                }
            }
            if (itemId > 0) {
                UserDashBoardItemMangement.GetItemVideoContents(itemId);
            }
            UserDashBoardItemMangement.CreateCategoryMultiSelect(itemId);
            UserDashBoardItemMangement.BindRelatedItemsGrid(itemId, null, null, null, null);
            UserDashBoardItemMangement.BindUpSellItemsGrid(itemId, null, null, null, null);
            UserDashBoardItemMangement.BindCrossSellItemsGrid(itemId, null, null, null, null);
            UserDashBoardItemMangement.BindCurrencyList();
            //               $(".cssClassSKU").keyup(function(){
            //                    var text=$(this).val();
            //                    $(this).val(text.replace(/[^\w\d\s]/,""));
            //                });
            $('.cssClassSKU').keyup(function() {
                if (this.value.match(/[^a-zA-Z0-9 ]/g)) {
                    this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, ''); // block all kinds of specials characters
                }
                this.value = this.value.replace(/\s/g, '').replace(' ', ''); // remove available space
            });

            //Hide all blur Error and Success divs
            $('.cssClassRight').hide();
            $('.cssClassError').hide();
            $('.cssClassError').html('');
            UserDashBoardItemMangement.BindPopUP();
            UserDashBoardItemMangement.BindTierPriceCommand();
            $(".classItemPrice,.classItemListPrice,.verifyDecimal,.verifyInteger").DigitAndDecimal('.classItemListPrice,.classItemPrice,.verifyDecimal,.verifyInteger ', '');
            $(".classItemPrice,.classItemListPrice,.verifyDecimal,.verifyInteger,.hasDatepicker").bind("contextmenu", function(e) {
                return false;
            });
            $('.classItemPrice,.classItemListPrice,.verifyDecimal,.verifyInteger,.hasDatepicker').bind('paste', function(e) {
                e.preventDefault();
            });
            $(".SpecialDropDown").bind("change", function() {
                if ($(this).val() == 10) {
                    $('.classSpecialFrom').removeClass('error');
                    $('.classSpecialTo').removeClass('error');
                    $('.classSpecialFrom').parent('div').removeClass('diverror');
                    $('.classSpecialFrom').parent('div').removeClass('diverror');
                    $('.classSpecialTo').next('span').html('');
                }
            });
            $(".FeaturedDropDown").bind("change", function() {
                if ($(this).val() == 8) {
                    $('.classFeaturedFrom').removeClass('error');
                    $('.classFeaturedTo').removeClass('error');
                    $('.classFeaturedFrom').parent('div').removeClass('diverror');
                    $('.classFeaturedFrom').parent('div').removeClass('diverror');
                    $('.classFeaturedTo').next('span').html('');
                }
            });
        },

        BindDownloadableForm: function(itemId) {
            this.config.url = this.config.baseURL + "GetDownloadableItem";
            this.config.data = JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 22;
            this.ajaxCall(this.config);
        },

        FillDownlodableItemForm: function(response) {
            $.each(response.d, function(index, msg) {
                $("#txtDownloadTitle").val(msg.Title);
                if (msg.MaxDownload == 0) {
                    $("#txtMaxDownload").val('');
                }
                else {
                    $("#txtMaxDownload").val(msg.MaxDownload);
                }
                //$('input[name=chkIsSharable]').attr('checked', msg.IsSharable);
                $("#fileSample").attr("title", msg.SampleFile);
                if (msg.SampleFile == '') {
                    $("#spanSample").html("");
                }
                else
                    $("#spanSample").html(getLocale(AspxUserDashBoard, "Previous: "));
                $("#spanSample").append(msg.SampleFile);
                $("#fileActual").attr("title", msg.ActualFile);
                if (msg.ActualFile == '') {
                    $("#spanActual").html("");
                }
                else
                    $("#spanActual").html(getLocale(AspxUserDashBoard, "Previous: "));
                $("#spanActual").append(msg.ActualFile);
                if (msg.DisplayOrder == 0) {
                    $("#txtDownDisplayOrder").val('');
                } else {
                    $("#txtDownDisplayOrder").val(msg.DisplayOrder);
                }
                $("#btnSave").attr("name", msg.DownloadableID);
            });
        },

        BindPopUP: function() {
            $('#btnAddExistingOption').live('click', function() {
                var item_Id = $("#ItemMgt_itemID").val();
                UserDashBoardItemMangement.BindCostVariantsOptions(item_Id);
                $("#variantsGrid,#divNewVariant").hide();
                $("#newCostvariants,#divExistingVariant").show();
            });
            $('#btnAddNewOption').live('click', function() {
                $('.cssClassPriceModifierType option[value*=false]').each(function() {
                    $(this).val($(this).val().replace('false', '0'));
                });
                $('.cssClassPriceModifierType option[value*=true]').each(function() {
                    $(this).val($(this).val().replace('true', '1'));
                });
                $('.cssClassWeightModifierType option[value*=false]').each(function() {
                    $(this).val($(this).val().replace('false', '0'));
                });
                $('.cssClassWeightModifierType option[value*=true]').each(function() {
                    $(this).val($(this).val().replace('true', '1'));
                });
                $('.cssClassIsActive option[value*=false]').each(function() {
                    $(this).val($(this).val().replace('false', '0'));
                });
                $('.cssClassIsActive option[value*=true]').each(function() {
                    $(this).val($(this).val().replace('true', '1'));
                });
                UserDashBoardItemMangement.OnInit();
                UserDashBoardItemMangement.ClearVariantForm();
                $('#ddlAttributeType').html('');
                UserDashBoardItemMangement.BindCostVariantsInputType();
                $("#tabFrontDisplay").show();
                $("#variantsGrid,#divExistingVariant").hide();
                $("#newCostvariants,#divNewVariant").show();
                $("#VariantsImagesTable>tbody").html('');
                listImages = new Array();
            });
            $('.classAddImages').live('click', function() {

                //                 var len = $("#VariantsImagesTable tbody tr").length - 1;
                //                 if (len == -1) {
                //                     $("#VariantsImagesTable").hide();
                //                     $('#btnSaveImages').hide();
                //                     $('#btnImageBack').hide();
                //                 } else {
                //                     // $("#VariantsImagesTable>tbody").html('');
                //                     $("#VariantsImagesTable").show();
                //                     $('#btnSaveImages').show();
                //                     $('#btnImageBack').show();
                //                 }

                var value = $(this).closest("tr")[0].rowIndex - 1;
                $("#btnSaveImages").attr("value", value);
                //$("#btnSaveImages").show();
                $("#imageUploader").show();


                if (listImages[value] != null && listImages[value] != "") {
                    var subStr = listImages[value].split('@');
                    var List = '';
                    $.each(subStr, function(index) {
                        List += '<tr>';
                        List += '<td><img src="' + aspxRootPath + "Modules/AspxCommerce/AspxUserDashBoard/uploads/" + subStr[index] + '" class="uploadImage" height="20px" width="30px"/></td>';
                        List += '<td><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" id="btn" onclick="UserDashBoardItemMangement.DeleteImage(this)" /></td>';
                        List += '</tr>';
                    });

                    if (List != '') {
                        $("#VariantsImagesTable>tbody").html(List);
                    }
                    $("#VariantsImagesTable").show();
                    $('#btnSaveImages').show();
                    $('#btnImageBack').show();

                } else {
                    $("#VariantsImagesTable>tbody").html('');
                    $("#VariantsImagesTable").hide();
                    $('#btnSaveImages').hide();
                    $('#btnImageBack').hide();
                }
                ShowPopupControl('popuprel2');
                UserDashBoardItemMangement.CostVariantsImageUploader(maxFileSize);
                $("#VariantsImagesTable>tbody tr:even").addClass("sfEven");
                $("#VariantsImagesTable>tbody tr:odd").addClass("sfOdd");
            });
            $('.classAddImagesEdit').live('click', function() {
                var value = $(this).closest("tr")[0].rowIndex - 1;
                $("#btnSaveImages").attr("value", value);
            });

            $("#btnSaveImages").click(function() {
                var i = $(this).val();
                $('#fade, #popuprel2').fadeOut();
                var list = '';
                $('#VariantsImagesTable>tbody>tr').each(function() {
                    list += $(this).find("img").attr("src").replace(aspxRootPath + "Modules/AspxCommerce/AspxUserDashBoard/uploads/", "") + '@';
                });
                list = list.substring(0, list.length - 1);
                listImages[i] = list;
                $('#tblVariantTable>tbody tr input[type="button"]').find("name").text('');
                $('#tblVariantTable>tbody tr input[type="button"]').find("name").append(listImages[i]);
                $("#VariantsImagesTable").hide();
                $("#btnSaveImages").removeAttr("value");
            });
        },

        BindTierPriceCommand: function() {
            $("#btnSaveQuantityDiscount").bind("click", function() {

                UserDashBoardItemMangement.SaveItemDiscountQuantity();
            });
            $("#btnDeleteQuantityDiscount").bind("click", function() {
                var properties = { onComplete: function(e) {
                    if (e) {
                        UserDashBoardItemMangement.DeleteItemDiscountQuantity();
                    }
                }
                };
                // Ask user's confirmation before delete records        
                csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete all quantity discounts?") + "</p>", properties);


            });
            $("#btnAddQuantityDiscount").bind("click", function() {
                $("#tblQuantityDiscount").parent('div.sfFormwrapper').show();
                $("#dvAddNewQuantityDiscount").hide();
                UserDashBoardItemMangement.BindItemQuantityDiscountsByItemID($("#ItemMgt_itemID").val());
            });
        },

        HideAllVariantDivs: function() {
            $("#divExistingVariant").hide();
            $("#divNewVariant").hide();
        },

        BindDataInAccordin: function(itemId, attributeSetId, itemTypeId) {
            //alert(itemId + '::' + attributeSetId + '::' + itemTypeId);
            this.config.url = this.config.baseURL + "GetItemFormAttributesValuesByItemID";
            this.config.data = JSON2.stringify({ itemID: itemId, attributeSetID: attributeSetId, itemTypeID: itemTypeId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 23;
            this.ajaxCall(this.config);
        },

        CreateCategoryMultiSelect: function(itemId) {
            this.config.url = this.config.baseURL + "GetCategoryList";
            this.config.data = JSON2.stringify({ prefix: '---', isActive: true, aspxCommonObj: aspxCommonObj(), itemId: itemId, serviceBit: serviceBit });
            this.config.ajaxCallMode = 24;
            this.ajaxCall(this.config);
        },

        FillMultiSelect: function(msg) {
            $('#lstCategories').get(0).options.length = 0;
            if (attributeSetId == 3) {
                $('#lstCategories').removeAttr('multiple');
            } else {
                $('#lstCategories').attr('multiple', 'multiple');
            }
            $('#lstCategories').attr('size', '5');
            $.each(msg.d, function(index, item) {
                $("#lstCategories").get(0).options[$("#lstCategories").get(0).options.length] = new Option(item.LevelCategoryName, item.CategoryID);
                if (item.IsChecked) {
                    $("#lstCategories option[value=" + item.CategoryID + "]").attr("selected", "selected");
                }
            });
        },
        GetAllBrandForItem: function() {
            this.config.url = this.config.baseURL + "GetAllBrandForItem";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 28;
            this.ajaxCall(this.config);
        },

        BindAllBrandForItem: function(msg) {
            $('#lstBrands').get(0).options.length = 0;
            // $('#lstBrands').attr('multiple', 'multiple');
            $('#lstBrands').attr('size', '5');
            $('#lstBrands').append("<option value='0'>" + getLocale(AspxUserDashBoard, "None") + "</option>");
            $.each(msg.d, function(index, item) {
                $('#lstBrands').append("<option value='" + item.BrandID + "'>" + item.BrandName + "</option>");

            });
            $("#lstBrands").val('0');
        },
        //        InsertBrandMapping: function(itemId) {
        //            var brandid = $("#lstBrands option:selected").val();
        //            this.config.url = this.config.baseURL + "InsertBrandMapping";
        //            this.config.data = JSON2.stringify({ ItemID: itemId, BrandID: brandid, storeId: storeId, portalId: portalId, userName: userName, CultureName: cultureName });
        //            this.config.ajaxCallMode = 29;
        //            this.ajaxCall(this.config);
        //        },
        GetBrandByItemID: function(itemId) {
            this.config.url = this.config.baseURL + "GetBrandByItemID";
            this.config.data = JSON2.stringify({ ItemID: itemId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 30;
            this.ajaxCall(this.config);
        },
        GetItemVideoContents: function(itemId) {
            this.config.url = this.config.baseURL + "GetItemVideoContents";
            this.config.data = JSON2.stringify({ ItemID: itemId, aspxCommonObj: aspxCommonObj() });
            this.config.ajaxCallMode = 33;
            this.ajaxCall(this.config);
        },
        createRow: function(itemId, itemTypeId, attID, attName, attType, attTypeValue, attDefVal, attToolTip, attLen, attValType, isEditor, isUnique, isRequired, groupId, isIncludeInPriceRule, displayOrder) {
            var retString = '';
            //var attNameNoSpace = attName.replace(new RegExp("_", "g"), '%')--> this gives probelm in loading calender
            //var attNameNoSpace = "_" + attName.replace(new RegExp(" ", "g"), '-');
            //searchval.replace(/ /g, '+')
            //date.replace(/\//g, '*'); -->> replace / -->> *
            if ((attID == 15 && itemTypeId == 2) || (attID == 5 && itemTypeId == 2)) {
                retString += '<tr><td><label class="cssClassLabel" hidden="true">' + attName + ': </label></td>';
            }
            else {
                retString += '<tr><td><label class="cssClassLabel">' + attName + ': </label></td>';
            }
            switch (attType) {
                case 1: //TextField
                    //alert(attID);
                    if (attID == 4) {
                        $("#hdnSKUTxtBox").val(attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder);
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox cssClassSKU dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '" onblur="UserDashBoardItemMangement.CheckUniqueness(this.value, ' + itemId + ' )"/>';
                        retString += '<span class="cssClassRight"><img class="cssClassSuccessImg" height="13" width="18" alt="Right" src="' + aspxTemplateFolderPath + '/images/right.jpg"></span><b class="cssClassError">' + getLocale(AspxUserDashBoard, "Ops! found something error, must be unique with no spaces") + '</b>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else if (attID == 5 && itemTypeId != 2) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '"/><span>[' + WeightUnit + ']</span>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else if (attID == 32) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '"/><span>[' + DimensionUnit + ']</span>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else if (attID == 33) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '"/><span>[' + DimensionUnit + ']</span>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else if (attID == 34) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '"/><span>[' + DimensionUnit + ']</span>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else if (attID == 5 && itemTypeId == 2) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '" readonly="readonly" hidden="true"/>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else if (attID == 15 && itemTypeId == 2) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '" readonly="readonly" hidden="true"/>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    } else if (attID == 15 && itemTypeId == 3) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '" readonly="readonly"/>';
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else {
                        if (attID == 15 && attType == 1)//item quantity
                            retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox cssClassItemQuantity cssClassItemName dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '"/>';
                        else retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox  cssClassItemName dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" title="' + attToolTip + '"/>';

                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }

                    break;
                case 2: //TextArea
                    var editorDiv = '';
                    if (isEditor) {
                        htmlEditorIDs[htmlEditorIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + "_editor";
                        editorDiv = '<div id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_editor"></div>';
                    }
                    retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><textarea id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" ' + ((isEditor == true) ? ' style="display: none !important;" ' : '') + ' rows="' + attLen + '"  class="cssClassTextArea dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" title="' + attToolTip + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '">' + attDefVal + '</textarea>' + editorDiv + '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    //alert(retString);
                    break;
                case 4: //Boolean
                    retString += '<td class="cssClassTableRightCol"><div class="cssClassCheckBox ' + (isRequired == true ? "required" : "") + '">';
                    if (attDefVal == 1) {
                        retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '" checked="checked"/>';
                    }
                    else {
                        retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/>';
                    }
                    retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                case 3: //Date
                    DatePickerIDs[DatePickerIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder;
                    if (attID == 6) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classNewFrom ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 7) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classNewTo ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 19) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classActiveFrom ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 20) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classActiveTo ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 27) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classFeaturedFrom ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 28) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classFeaturedTo ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 30) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classSpecialFrom ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else if (attID == 31) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classSpecialTo ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span><p><!-- /' + getLocale(AspxUserDashBoard, "field") + ' --></p></div></td>';
                    }
                    else {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '"  title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    break;
                case 5: //MultipleSelect
                    retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '"  title="' + attToolTip + '" size="' + attLen + '" class="cssClassMultiSelect dynFormItem" multiple>';
                    if (attTypeValue.length > 0) {
                        for (var i = 0; i < attTypeValue.length; i++) {
                            var val = attTypeValue[i];
                            //alert(val.text);
                            //var vals = attTypeValue[i].split(':');
                            if (val.isdefault == 1) {
                                retString += '<option value="' + val.value + '" selected="selected">' + val.text + '</option>';
                            }
                            else {
                                retString += '<option value="' + val.value + '">' + val.text + '</option>';
                            }
                        }
                    }
                    retString += '</select><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                case 6: //DropDown
                    if (attID == 26) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '"  title="' + attToolTip + '" class="sfListmenu dynFormItem FeaturedDropDown">';
                    }
                    else if (attID == 29) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '"  title="' + attToolTip + '" class="sfListmenu dynFormItem SpecialDropDown">';
                    }
                    else {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><select id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '"  title="' + attToolTip + '" class="sfListmenu dynFormItem">';
                    }
                    for (var i = 0; i < attTypeValue.length; i++) {
                        var val = attTypeValue[i];
                        if (val.isdefault == 1) {
                            retString += '<option value="' + val.value + '" selected="selected">' + val.text + '</option>';
                        }
                        else {
                            retString += '<option value="' + val.value + '">' + val.text + '</option>';
                        }
                    }
                    retString += '</select><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';

                    break;
                case 7: //Price
                    if (attID == 8) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classItemPrice ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" maxlength="' + attLen + '" title="' + attToolTip + '"/><select class="sfcurrencyList" id="ddlCurrencyDashBoard"></select><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div><div class="popbox"><a class="open" href=#>PriceHistory</a><div class="collapse"><div class="box"><div class="arrow"></div><div class="arrow-border"></div><div class="classPriceHistory" style="display: none"></div></div></div></div></td>';
                    }
                    else if (attID == 13) {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem classItemListPrice ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" maxlength="' + attLen + '" title="' + attToolTip + '"/><select class="sfcurrencyList" id="ddlCurrencyLP" disabled="disabled"></select><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    else {
                        retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + attDefVal + '" maxlength="' + attLen + '" title="' + attToolTip + '"/><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    break;
                case 8: //File
                    FileUploaderIDs[FileUploaderIDs.length] = attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder;
                    retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><div class="' + attDefVal + '" name="Upload/temp" lang="' + attLen + '"><input type="hidden" id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_hidden" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_hidden" value="" class="cssClassBrowse dynFormItem"/>';
                    retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="file" class="cssClassBrowse dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" title="' + attToolTip + '" />';
                    //retString += '<span id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_span" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="file" class="cssClassBrowse">Browse</span>';
                    retString += ' <span class="response"></span></div><span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                case 9: //Radio
                    if (attTypeValue.length > 0) {
                        retString += '<td class="cssClassTableRightCol"><div class="cssClassRadioBtn ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '">';
                        for (var i = 0; i < attTypeValue.length; i++) {
                            var val = attTypeValue[i];
                            if (val.isdefault == 1) {
                                retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" value="' + val.value + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="radio"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" checked="checked" title="' + attToolTip + '"/><label>' + val.text + '</label>';
                            }
                            else {
                                retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" value="' + val.value + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="radio"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" title="' + attToolTip + '"/><label>' + val.text + '</label>';
                            }
                        }
                        retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    }
                    break;
                case 10: //RadioButtonList
                    retString += '<td class="cssClassTableRightCol"><div class="cssClassRadioBtn ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '">'
                    for (var i = 0; i < attTypeValue.length; i++) {
                        var val = attTypeValue[i];
                        if (val.isdefault == 1) {
                            retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_' + i + '" value="' + val.value + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="radio"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" checked="checked"/><label>' + val.text + '</label>';
                        }
                        else {
                            retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_' + i + '" value="' + val.value + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="radio"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '"/><label>' + val.text + '</label>';
                        }
                    }
                    retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                case 11: //CheckBox
                    retString += '<td class="cssClassTableRightCol"><div class="cssClassCheckBox ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '">';
                    if (attTypeValue.length > 0) {
                        for (var i = 0; i < attTypeValue.length; i++) {
                            var val = attTypeValue[i];
                            if (val.isdefault == 1) {
                                retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + val.value + '" checked="checked"/><label>' + val.text + '</label>';
                            }
                            else {
                                retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" value="' + val.value + '"/><label>' + val.text + '</label>';
                            }
                        }
                    }
                    retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                case 12: //CheckBoxList
                    retString += '<td class="cssClassTableRightCol"><div class="cssClassCheckBox ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '">';
                    if (attTypeValue.length > 0) {
                        for (var i = 0; i < attTypeValue.length; i++) {
                            var val = attTypeValue[i];
                            if (val.isdefault == 1) {
                                //var vals = attTypeValue[i].split(':');
                                retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_' + i + '" value="' + val.value + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '" checked="checked"/><label>' + val.text + '</label>';
                            }
                            else {
                                retString += '<input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '_' + i + '" value="' + val.value + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="checkbox"  class="text dynFormItem ' + UserDashBoardItemMangement.createValidation(attID, attType, attValType, isUnique, isRequired) + '"/><label>' + val.text + '</label>';
                            }
                        }
                    }
                    retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                case 13: //Password
                    retString += '<td class="cssClassTableRightCol"><div class="field ' + UserDashBoardItemMangement.GetValidationTypeClasses(attValType, isUnique, isRequired) + '"><input id="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" name="' + attID + '_' + attType + '_' + attValType + '_' + isRequired + '_' + groupId + '_' + isIncludeInPriceRule + '_' + displayOrder + '" type="text" maxlength="' + attLen + '"  class="sfInputbox dynFormItem ' + UserDashBoardItemMangement.createValidation(attID + '_' + attName, attType, attValType, isUnique, isRequired) + ' Password" value="' + attDefVal + '" title="' + attToolTip + '"/>'
                    retString += '<span class="iferror">' + UserDashBoardItemMangement.GetValidationTypeErrorMessage(attValType) + '</span></div></td>';
                    break;
                default:
                    break;
            }
            retString += '</tr>';
            return retString;
        },

        SampleFileUploader: function(maxFileSize) {
            var upload = new AjaxUpload($('#fileSample'), {
                action: aspxUserItemModulePath + "MultipleFileUploadHandler.aspx",
                name: 'myfile[]',
                multiple: true,
                data: {},
                autoSubmit: true,
                responseType: 'json',
                onChange: function(file, ext) {
                    //alert('changed');
                },
                onSubmit: function(file, ext) {
                    if (ext != "exe") {
                        this.setData({
                            'MaxFileSize': maxFileSize
                        });
                    }
                    else {
                        csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Alert Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Not a valid file type!") + '</p>');
                        return false;
                    }
                },
                onComplete: function(file, response) {
                    var res = eval(response);
                    if (res.Message != null) {
                        // alert(res.Message);
                        UserDashBoardItemMangement.showSampleLoadedFile(res);
                        return false;
                    }
                    else {
                        csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to upload file!") + '</p>');
                        return false;
                    }
                }
            });
        },

        showSampleLoadedFile: function(response) {
            $("#spanSample").html('LoadedFile: ');
            $("#spanSample").append(response.Message);
            $("#fileSample").attr('name', response.Message);
        },

        showActualLoadedFile: function(response) {
            $("#spanActual").html('LoadedFile: ');
            $("#spanActual").append(response.Message);
            $("#fileActual").attr('name', response.Message);
        },
        GetEmail: function() {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.UserName = null;
            var sku = UserDashBoardItemMangement.vars.sku;
            this.config.url = this.config.baseURL + "GetEmail";
            this.config.data = JSON2.stringify({ SKU: sku, aspxCommonObj: aspxCommonInfo });
            this.config.ajaxCallMode = 31;
            this.ajaxCall(this.config);
        },
        SendEmailToUser: function(varinatIds, variantValues, mail) {
            var sku = UserDashBoardItemMangement.vars.sku;
            if (mail.length > 0) {
                var subject = getLocale(AspxUserDashBoard, "Product you interested is now available");
                var fullDate = new Date();
                var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
                if (twoDigitMonth.length == 2) {
                } else if (twoDigitMonth.length == 1) {
                    twoDigitMonth = '0' + twoDigitMonth;
                }
                var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
                var dateyear = fullDate.getFullYear();
                var messageBodyHtml = '';
                messageBodyHtml += '<table style="font:12px Arial, Helvetica, sans-serif;" width="100%" border="0" cellspacing="0" cellpadding="0">  <tr>';
                messageBodyHtml += '<td width="33%"><div style="border:1px solid #cfcfcf; background:#f1f1f1; padding:10px; text-align:center;"> ';
                messageBodyHtml += '<p style="margin:0; padding:5px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:normal; line-height:18px;"> <span style="font-weight:bold; font-size:12px; font-family:Arial, Helvetica, sans-serif; text-shadow:1px 1px 0 #fff;">';
                messageBodyHtml += 'Item SKU: #sku#</span><br />';
                messageBodyHtml += '<span style="font-weight:bold; font-size:12px; font-family:Arial, Helvetica, sans-serif;text-decoration:blink; text-shadow:1px 1px 0 #fff;"><a style="color: rgb(39, 142, 230);" href="#server#">' + getLocale(AspxUserDashBoard, "click here to view all details") + '</a></span> ';
                messageBodyHtml += '</p> </div></td></tr> </table>';
                var emailInfo = {
                    SenderName: aspxCommonObj().UserName,
                    SenderEmail: userEmail,
                    ReceiverName: '',
                    ReceiverEmail: mail,
                    Subject: subject,
                    Message: '',
                    MessageBody: messageBodyHtml
                };
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonObj(), emailInfo: emailInfo, VariantId: varinatIds, VarinatValue: variantValues, sku: sku, ProductUrl: productUrl });
                this.config.method = "SendEmailNotification";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = param;
                this.config.ajaxCallMode = 32;
                this.config.error = 32;
                this.ajaxCall(this.config);
            }
        },

        ActualFileUploader: function(maxFileSize) {
            var upload = new AjaxUpload($('#fileActual'), {
                action: aspxUserItemModulePath + "MultipleFileUploadHandler.aspx",
                name: 'myfile[]',
                multiple: true,
                data: {},
                autoSubmit: true,
                responseType: 'json',
                onChange: function(file, ext) {
                    //alert('changed');
                },
                onSubmit: function(file, ext) {
                    if (ext != "exe") {
                        this.setData({
                            'MaxFileSize': maxFileSize
                        });
                    }
                    else {
                        csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Alert Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Not a valid file type!") + '</p>');
                        return false;
                    }
                },
                onComplete: function(file, response) {
                    var res = eval(response);
                    if (res.Message != null) {
                        //   alert(res.Message);
                        UserDashBoardItemMangement.showActualLoadedFile(res);
                        return false;
                    }
                    else {
                        csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to upload the image!") + '</p>');
                        return false;
                    }
                }
            });
        },
        //    FileUpload(FileUploaderID) {
        //        var previousFile = $(FileUploaderID).attr("title");
        //        var downlodablefileuploaderID = $(FileUploaderID).attr('id');
        //        alert(downlodablefileuploaderID);

        //        var upload = new AjaxUpload(String(downlodablefileuploaderID), {
        //            action: aspxUserItemModulePath + "MultipleFileUploadHandler.aspx",
        //            name: 'myfile[]',
        //          //  multiple: false,
        //          //  data: {},
        //            autoSubmit: true,
        //           // responseType: 'json',
        //           // onChange: function(file, ext) {
        //                //alert('changed');
        //           // },
        //            onSubmit: function(file, ext) {
        //                if (ext != "exe") {
        //                    alert("load");
        //                    //                    if (ext && /^(jpg|jpeg|jpe|gif|bmp|png|ico)$/i.test(ext)) {
        //                    //                    } else {
        //                    //                        csscody.alert('<h2>Alert Message</h2><p>Not a valid image!</p>');
        //                    //                        return false;
        //                    //                    }
        //                }
        //                else {
        //                    csscody.alert('<h2>Alert Message</h2><p>Not a valid image!</p>');
        //                    return false;
        //                }
        //            },
        //            onComplete: function(file, response) {
        //                var res = eval(response);
        //                if (res.Message != null) {
        //                   alert(res.Message);
        //                }
        //                else {
        //                    csscody.error('<h2>Error Message</h2><p>Can\'t upload the file!</p>');
        //                }
        //            }
        //        });

        //    }

        InitCostVariantCombination: function(itemId) {

            $(".ddlCostVariantsCollection").die("click").live("change", function() {
                // alert(this.value);
                var elem = $(this).parents('tr:eq(0)').find(".tdCostVariantValues").find(".ddlCostVariantValues");
                UserDashBoardItemMangement.GetCostVariantValues(this.value, elem);

                //$(this).parents('tr:eq(0)').find(".tdCostVariantValues").find(".ddlCostVariantValues").html(html);

            });
            $("#btnCancelCostVariantCombination").die("click").live("click", function() {
                UserDashBoardItemMangement.ResetCVHtml();
            });

            $("#btnBackCostVariantCombination").die("click").live("click", function() {

                $("#dvCvForm >table").hide();
                $("#dvCostVarAdd").prev(".sfButtonwrapper").hide();
                $("#dvCostVarAdd").show();
            });
            $("#btnAddCostVariantCombination").die("click").live("click", function() {
                $("#dvCvForm >table").show();
                $("#dvCostVarAdd").prev(".sfButtonwrapper").show();
                $("#dvCostVarAdd").hide();
                $("#btnDeleteCostVariantCombination").hide();
                $("#btnCancelCostVariantCombination").hide();

            });
            $("#btnDeleteCostVariantCombination").die("click").live("click", function() {
                var properties = {
                    onComplete: function(e) {
                        if (e) {
                            $(".cssClassItemQuantity").removeAttr("disabled", "disabled");
                            UserDashBoardItemMangement.DeleteCostVariantCombination();
                        }
                    }
                };
                csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, 'Delete Confirmation') + "</h2><p>" + getLocale(AspxUserDashBoard, 'Are you sure you want to delete this Cost Variant Combination?') + "</p>", properties);
            });

            UserDashBoardItemMangement.ResetCVHtml(false, '');

        },
        CreateCombinations: function(index, costvarId, costVarValueId) {
            var parentTableM = $("#dvCvForm table:first").find('>tbody>tr:last');
            var parentTable = $(parentTableM).find("table");
            var trhtml = "<tr>" + $(parentTable).find(">tbody>tr:last").html() + "</tr>";
            //disabled last selected cv
            if (index != 0) {
                var optionValue = $.trim($(parentTable).find(">tbody>tr:last").find(".ddlCostVariantsCollection").val());
                //$(parentTable).find(">tbody>tr:last").find(".ddlCostVariantsCollection").attr("disabled", "disabled"); //find("option").not(":selected").remove();
                //$(parentTable).find(">tbody>tr:last").find("a.cssClassCvAddMore").remove();
                //remove dropdown unused cv

                $(trhtml).appendTo(parentTable).find(".ddlCostVariantsCollection").find("option[value=" + optionValue + "]").remove();
                //parentTable.find('td').find("a.cssClassCvClose").show();
            }
            //            else {
            //                parentTable.find('td').find("a.cssClassCvClose").hide();
            //            }
            //select costvariant id
            $(parentTable).find(".ddlCostVariantsCollection:last").find("option[value=" + costvarId + "]").attr("selected", "selected");
            //select costvariant values
            var elem = $(parentTable).find(".ddlCostVariantValues:last");
            UserDashBoardItemMangement.GetCostVariantValues(costvarId, elem);
            $(parentTable).find(".ddlCostVariantValues:last").find("option[value=" + costVarValueId + "]").attr("selected", "selected");

            $(parentTable).find(">tbody>tr").find(".ddlCostVariantsCollection").attr("disabled", "disabled"); //find("option").not(":selected").remove();
            $(parentTable).find(">tbody>tr").find(".ddlCostVariantValues").attr("disabled", "disabled");
            $(parentTable).find(">tbody>tr:last").find("a.cssClassCvAddMore").remove();
            $(parentTable).find('td').find("a.cssClassCvClose").show();
            $(parentTable).find('td').find("a.cssClassCvCloseMain").show();
            $("#dvCvForm table:first>tbody>tr>td").find("a.cssClassCvCloseMain").show();

        },
        CreateCombinationTableRow: function(index, item) {
            if (index != 0) {
                var parentTable = $("#dvCvForm table:first");
                var trhtml = "<tr>" + parentTable.find('>tbody>tr:last').html() + "</tr>";
                parentTable.find('td').find("button.cssclassAddCVariants").remove();
                $(trhtml).appendTo("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find("table tr:gt(1)").remove(); //.find(".ddlCostVariantsCollection").find("option[value=" + optionValue + "]").remove();
                $(".cssClassTableCostVariant:last").find(".ddlCostVariantsCollection").removeAttr("disabled").attr("enabled", "enabled");
                $(".cssClassTableCostVariant:last").find(".ddlCostVariantValues").html("<option value='0'>" + getLocale(AspxUserDashBoard, "No values") + "</option>");
                $("#dvCvForm table:first").find(">tbody>tr:last").find(".cssClassDisplayOrder").val($(".cssclassAddCVariants:last").closest("tr")[0].rowIndex);
                // $("#dvCvForm table:first").find(">tbody>tr:last").find(".classAddImages").val($(".cssclassAddCVariants:last").closest("tr")[0].rowIndex);
                if ($(".cssClassTableCostVariant:last").find(".tdCostVariant").find("a.cssClassCvAddMore").length > 0) {
                } else {
                    $(".cssClassTableCostVariant:last").find(".tdCostVariant").append("<a href=\"#dvCvForm\" class=\"cssClassCvAddMore\" onclick=\"AddMoreVariantOptions(this); return false;\">" + getLocale(AspxUserDashBoard, "Add More") + "</a>");
                }
                $("#dvCvForm table:first>tbody>tr>td").find("a.cssClassCvCloseMain").show();
            }
            else {
                $("#dvCvForm table:first>tbody>tr>td").find("a.cssClassCvCloseMain").show();
            }
            listImages.push(item.ImageFile);

            $("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find(".cssclassCostVariantItemQuantity").val(item.CombinationQuantity);
            $("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find(".cssClassPriceModifier").val(item.CombinationPriceModifier);
            $("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find(".cssClassWeightModifier").val(item.CombinationWeightModifier);
            var priceMt = item.CombinationPriceModifierType == true ? 0 : 1;
            $("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find(".cssClassPriceModifierType").find("option[value=" + priceMt + "]").attr("selected", "selected");
            var weightMt = item.CombinationWeightModifierType == true ? 0 : 1;
            $("#dvCvForm table:first").find(".cssClassTableCostVariant:last").find(".cssClassWeightModifierType").find("option[value=" + weightMt + "]").attr("selected", "selected");
            var xActive = item.CombinationIsActive == false ? 0 : 1;
            $("#dvCvForm table:first").find(".cssClassIsActive:last").find("option[value=" + xActive + "]").attr("selected", "selected");

            // $("#dvCvForm table:first").find(".cssClassIsActive:last").find("option[value=" + item.CombinationIsActive == true ? 1 : 0 + "]").attr("selected", "selected");


        },
        GetCostVariantValues: function(costvarId, element) {
            var html = '';
            $.ajax({
                type: "POST",
                async: false,
                url: aspxservicePath + "ASPXCommerceWebService.asmx/GetCostVariantValues",
                data: JSON2.stringify({ costVariantID: costvarId, aspxCommonObj: aspxCommonObj() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    if (msg.d.length > 0) {
                        $.each(msg.d, function(index, item) {
                            html += "<option value=" + item.CostVariantsValueID + ">" + item.CostVariantsValueName + "</option>";
                        });
                    } else {
                        html += "<option value='0'>" + getLocale(AspxUserDashBoard, "No values") + "</option>";

                    }
                    $(element).html(html);
                    $("#dvCvForm table:first").find(">tbody>tr").each(function() {
                        if ($(this).find(".cssClassIsActive").find("option:selected").val() == 1) {
                            $(".cssClassItemQuantity").attr("disabled", "disabled");
                        }
                    });
                    //                    if ($("#dvCvForm table>tbody .tdCostVariant select").val() != 0) {
                    //                        $(".cssClassItemQuantity").attr("disabled", "disabled");
                    //                    }
                },
                error: function() {
                    // csscody.error('<h1>Error Message</h1><p>Failed to save item cost variant</p>');
                }
            });
        },
        BindCostVariantsOfItem: function(showMsg, alertMsg) {
            $.ajax({
                type: "POST",
                url: aspxservicePath + "ASPXCommerceWebService.asmx/GetCostVariantsOfItem",
                data: JSON2.stringify({ itemId: itemId, aspxCommonObj: aspxCommonObj() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    if (msg.d.length > 0) {
                        UserDashBoardItemMangement.vars.isItemHasCostVariant = true;
                        $.each(msg.d, function(index, item) {
                            UserDashBoardItemMangement.CreateCombinationTableRow(index, item);
                            var ids = item.CombinationType.split('@');
                            var vids = item.CombinationValues.split('@');
                            var len = ids.length;
                            for (var id = 0; id < len; id++) {
                                UserDashBoardItemMangement.CreateCombinations(id, ids[id], vids[id]);
                            }
                        });
                        $("#btnDeleteCostVariantCombination").show();
                        $("#btnCancelCostVariantCombination").show();
                        $("#btnBackCostVariantCombination").hide();
                    } else {
                        listImages = [];
                        $("#dvCvForm >table").hide();
                        $("#dvCostVarAdd").prev(".sfButtonwrapper").hide();
                        $("#dvCostVarAdd").show();
                        $("#btnBackCostVariantCombination").show();

                    }
                    if (showMsg) {
                        csscody.info(alertMsg);
                    }
                    //$(element).parents('tr:eq(0)').find(".tdCostVariantValues").find(".ddlCostVariantValues").html(html);


                },
                error: function() {
                    // csscody.error('<h1>Error Message</h1><p>Failed to save item cost variant</p>');
                }
            });
        },
        DeleteCostVariantCombination: function() {
            $.ajax({
                type: "POST",
                url: aspxservicePath + "AspxCommerceWebService.asmx/DeleteCostVariantForItem",
                data: JSON2.stringify({ aspxCommonObj: aspxCommonObj(), itemId: $("#ItemMgt_itemID").val() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    var alertMsg = '<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Item cost variant has been deleted successfully.") + '</p>';
                    UserDashBoardItemMangement.ResetCVHtml(true, alertMsg);
                },
                error: function() {
                    csscody.error('<h1>' + getLocale(AspxUserDashBoard, "Error Message") + '</h1><p>' + getLocale(AspxUserDashBoard, "Failed to delete item cost variant") + '</p>');
                }
            });
        },
        ResetCVHtml: function(showMsg, alertMsg) {
            var html = '<table><thead><tr class="cssClassHeading"><td>' + getLocale(AspxUserDashBoard, "Pos.") + '</td><td>' + getLocale(AspxUserDashBoard, "Combination") + ' </td><td>' + getLocale(AspxUserDashBoard, "Status") + '</td><td></td><td></td><td></td></tr></thead> <tbody> <tr> <td> <input size="3" class="cssClassVariantValue" value="0" type="hidden"><input size="3" class="cssClassDisplayOrder" type="text" value="1" disabled="disabled"> </td> <td class="cssClassTableCostVariant"><table><thead><tr><td><b>' + getLocale(AspxUserDashBoard, "Cost Variant Name") + '</b></td><td><b>' + getLocale(AspxUserDashBoard, "Cost Variant Values") + '</b></td><td></td></tr></thead><tr><td class="tdCostVariant"><select class="ddlCostVariantsCollection"></select> <a href="#dvCvForm" class="cssClassCvAddMore" onclick="AddMoreVariantOptions(this); return false;">' + getLocale(AspxUserDashBoard, "Add More") + '</a> </td> <td class="tdCostVariantValues"> <select class="ddlCostVariantValues"><option>' + getLocale(AspxUserDashBoard, "No values") + '</option></select></td> <td> <a href="#" class="cssClassCvClose" onclick="CloseCombinationRow(this); return false;" style="display:none;"><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" title=' + getLocale(AspxUserDashBoard, "delete") + ' alt=' + getLocale(AspxUserDashBoard, "delete") + ' /></a> </td> </tr> </table> <div class="cssclassItemCostVariant"> <div class="CostVariantItemQuantity"> <label>' + getLocale(AspxUserDashBoard, "Quantity:") + '</label> <input type="text" class="cssclassCostVariantItemQuantity" value="1"/> </div> <div class="PriceModifier"><label>' + getLocale(AspxUserDashBoard, "Cost Modifier Type:") + '</label> <input size="5" class="cssClassPriceModifier" type="text" value="0.00"> <select class="cssClassPriceModifierType"> <option value="0">%</option> <option value="1">' + currencyCodeEdit + '</option> </select></div> <div class="WeightModifier"> <label>' + getLocale(AspxUserDashBoard, "Weight Modifier Type:") + '</label> <input size="5" class="cssClassWeightModifier" type="text" value="0.00" ><select class="cssClassWeightModifierType"><option value="0">%</option> <option value="1">' + getLocale(AspxUserDashBoard, "lbs") + '</option> </select> </div> </div> </td> <td> <select class="cssClassIsActive"> <option value="1">' + getLocale(AspxUserDashBoard, "Active") + '</option> <option value="0">' + getLocale(AspxUserDashBoard, "Inactive") + '</option> </select> </td> <td> <span class="nowrap"> <button rel="popuprel2" class="classAddImages" value="0" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Add Images") + '</span></span></button> </span> </td> <td> <span class="addButton"> <button type="button" value="0" class="cssclassAddCVariants" onclick="AddCombinationListRow(this); return false;" > <span><span>' + getLocale(AspxUserDashBoard, "Add More Cost Variants") + ' </span></span></button> </span> </td> <td> <a href="#" class="cssClassCvCloseMain" onclick ="CloseMainCombinationList(this); return false;" ><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" title=' + getLocale(AspxUserDashBoard, "delete") + ' alt=' + getLocale(AspxUserDashBoard, "delete") + '/></a> </td> </tr> </tbody> </table>';
            $("#dvCvForm").html('').html(html);
            UserDashBoardItemMangement.GetAllCostVariants(showMsg, alertMsg);
        },
        GetAllCostVariants: function(showMsg, alertMsg) {

            $.ajax({
                type: "POST",
                url: aspxservicePath + "AspxCommerceWebService.asmx/GetCostVariantForItem",
                data: JSON2.stringify({ aspxCommonObj: aspxCommonObj() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    var options = "<option value='0'>" + getLocale(AspxUserDashBoard, "Select one") + "</option>";
                    if (msg.d.length > 0) {
                        $.each(msg.d, function(index, item) {
                            options += "<option value=" + item.CostVariantID + ">" + item.CostVariantName + "</option>";
                        });
                        $(".cssClassTableCostVariant:first").find(".ddlCostVariantsCollection").html(options);
                        UserDashBoardItemMangement.BindCostVariantsOfItem(showMsg, alertMsg);
                    } else {
                        $(".cssClassTableCostVariant:first").find(".ddlCostVariantsCollection").html(options);
                    }

                },
                error: function() {
                    // csscody.error('<h1>Error Message</h1><p>Failed to save item cost variant</p>');
                }
            });


        },
        CreateAccordion: function(attGroup, attributeSetId, itemTypeId, showDeleteBtn) {
            //alert($("#dynItemForm").html());
            if (FormCount) {
                FormCount = new Array();
            }
            var FormID = "form_" + (FormCount.length * 10 + Math.floor(Math.random() * 10));
            FormCount[FormCount.length] = FormID;
            var dynHTML = '';
            var tabs = '';
            quickNavigation += "<div class='st_tabs_container'><div class='st_slide_container'><ul class='st_tabs'>";
            tabs += "<div class=\"st_view_container\"><div class=\"st_view\">";
            for (var i = 0; i < attGroup.length; i++) {
                quickNavigation += "<li><a class='st_tab' rel='v_tab" + attGroup[i].value + "' href=" + '#' + attGroup[i].key + ">" + attGroup[i].value + "</a></li>";
                tabs += '<div id=' + attGroup[i].key + ' class="st_tab_view"><h3><a href="#" name="' + attGroup[i].key + '">' + attGroup[i].value + '</a></h3>';
                tabs += '<div><table width="100%" border="0" cellpadding="0" cellspacing="0">' + attGroup[i].html + '</table></div></div>';
            }
            //Add Static sections here
            //In Add New:: need to add some static accordin tabs :: Image, Inventory, Categories, Related Products, Up-sells, Cross-sells, Custom Options
            //In edit:: Product Reviews, Product Tags, Customers Tagged Product
            if (itemTypeId == 2) {
                quickNavigation += "<li><a class='st_tab' rel='v_tab2' href='#dv_Content_2'>" + getLocale(AspxUserDashBoard, "Download Information") + "</a></li>";
                tabs += '<div class="st_tab_view" id="dv_Content_2"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Download Information") + '</a></h3>';
                tabs += '<div id="divDownloadInfo">';
                tabs += '<table class="sfFormwrapper" width="100%" border="0" cellpadding="o" cellspacing="0">';
                tabs += '<tbody>';
                tabs += '<tr><td><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Title:") + '</span></td><td class="cssClassTableRightCol"><div class="field required"><input type="textbox" id="txtDownloadTitle" class="sfInputbox" maxlength="256"/><span class="iferror"></span></div></td></tr>';
                tabs += '<tr><td><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Maximum Download:") + '</span></td><td class="cssClassTableRightCol"><div class="field required"><input type="textbox" id="txtMaxDownload" class="sfInputbox" maxlength="3"/><span class="iferror">' + getLocale(AspxUserDashBoard, "Integer Number") + '</span></div></td></tr>';
                //tabs += '<tr><td><span class="cssClassLabel">Is Sharable? </span></td><td class="cssClassTableRightCol"><input type="checkbox" name="chkIsSharable" class="cssClassCheckBox notTest" /></td></tr>';
                tabs += '<tr><td><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Sample File:") + '</span></td><td class="cssClassTableRightCol"><input id="fileSample" type="file" class="cssClassBrowse notTest" /><span id="spanSample" class="cssClassLabel"></span></td></tr>';
                tabs += '<tr><td><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Actual File:") + ' </span></td><td class="cssClassTableRightCol"><input id="fileActual" type="file" class="cssClassBrowse notTest" /><span id="spanActual" class="cssClassLabel"></span></td></tr>';
                //tabs += '<tr><td><span class="cssClassLabel">Display Order: </span></td><td class="cssClassTableRightCol"><div class="field required"><input type="textbox" id="txtDownDisplayOrder" class="sfInputbox" maxlength="3"/><span class="iferror">Integer Number</span></div></td></tr>';
                tabs += '</tbody>';
                tabs += '</table></div></div>';
                quickNavigation += "<li><a class='st_tab' rel='v_tab3' href='#dv_Content_3'>" + getLocale(AspxUserDashBoard, "Item Tax Class") + "</a></li>";

                tabs += '<div class="st_tab_view" id="dv_Content_3"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Item Tax Class") + '</a></h3><div id="divTax"><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item Tax Class Name:") + '</span><select id="ddlTax" class="sfListmenu" /></div></div>';
            } else {
                quickNavigation += "<li><a class='st_tab' rel='v_tab3' href='#dv_Content_3'>" + getLocale(AspxUserDashBoard, "Item Tax Class") + "</a></li>";

                tabs += '<div class="st_tab_view" id="dv_Content_3"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Item Tax Class") + '</a></h3><div id="divTax"><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item Tax Class Name:") + ' </span><select id="ddlTax" class="sfListmenu" /></div></div>';

            }
            if (itemTypeId == 1 || itemTypeId == 2) {
                quickNavigation += "<li><a class='st_tab' rel='v_tab4' href='#dv_Content_4'>Brand</a></li>";

                tabs += '<div class="st_tab_view" id="dv_Content_4"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Brand") + '</a></h3><div id="tblBrandTree" width="100%" border="0" cellpadding="0" cellspacing="0"><select id="lstBrands" class="cssClassMultiSelect"></select><span id="spanNoBrand" class="cssClassLabel"></span></div></div>';
            }
            if (itemTypeId == 3) {
                quickNavigation += "<li><a class='st_tab' rel='v_tab5' href='#dv_Content_5'>" + getLocale(AspxUserDashBoard, "Gift Card Category") + "</a></li>";
                tabs += '<div class="st_tab_view" id="dv_Content_5"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Gift Card Category") + '</a></h3>';
                tabs += '<div id="divGCThemes" class="sfFormwrapper">';
                tabs += '<table  width="100%" border="0" cellpadding="o" cellspacing="0">';
                tabs += '<tbody>';
                tabs += '<tr><td><span class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Gift Card Category:") + '</span></td><td class="cssClassTableRightCol"><div ><select  multiple="multiple" id="ddlGCCategory"  style="width:200px;height:100px"><option value="0">' + getLocale(AspxUserDashBoard, "ALL") + '</option></select></div><div><span>' + getLocale(AspxUserDashBoard, "(* select category of gift card)") + '</span></div></td></tr>';
                tabs += '</tbody>';
                tabs += '</table></div></div>';

            }
            quickNavigation += "<li><a class='st_tab' rel='v_tab6' href='#dv_Content_6'>" + getLocale(AspxUserDashBoard, "Images") + "</a></li>";
            quickNavigation += "<li><a class='st_tab' rel='v_tab7' href='#dv_Content_7'>" + getLocale(AspxUserDashBoard, "Videos") + "</a></li>";
            if (itemTypeId != 3) {
                quickNavigation += "<li><a class='st_tab' rel='v_tab8' href='#dv_Content_8'>" + getLocale(AspxUserDashBoard, "Categories") + "</a></li>";
            }
            tabs += '<div class="st_tab_view" id="dv_Content_6"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Images") + '</a></h3><div id="multipleUpload"><div id="divUploader"><div id="fileUpload" ></div><div class="progress ui-helper-clearfix"><div class="progressBar" id="progressBar"></div><div class="percentage"></div></div></div>';
            tabs += '<div id="divTableWrapper" class="sfGridWrapperContent"><table class="classTableWrapper" width="100%" border="0" cellpadding="o" cellspacing="0"><thead></thead><tbody></tbody></table></div></div></div>';
            tabs += '<div class="st_tab_view" id="dv_Content_7"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Videos") + '</a></h3><div><table id="tblVideosTree" width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td><label id="lblVideoID" class="cssClassLabel">' + getLocale(AspxUserDashBoard, "YouTube Video Ids :") + '</label></td><td class="cssClassTableRightCol"><input type="text" class="sfInputbox  cssClassItemName" title=' + getLocale(AspxUserDashBoard, "Enter Youtube Video Id, If Multiple Separeted With Comma") + ' id="txtVideoID"/></td></table></div></div>';
            if (itemTypeId != 3) {
                tabs += '<div class="st_tab_view" id="dv_Content_8"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Categories") + '</a></h3><div id="tblCategoryTree" width="100%" border="0" cellpadding="0" cellspacing="0"><select id="lstCategories" class="cssClassMultiSelect"></select><span id="spanNoCat" class="cssClassLabel"></span></div></div>';
            }
            if (showDeleteBtn) {
                if (itemTypeId != 2) {
                    quickNavigation += "<li><a class='st_tab' rel='v_tab9' href='#dv_Content_9'>" + getLocale(AspxUserDashBoard, "Cost Variant Combination") + "</a></li>";
                    tabs += '<div class="st_tab_view" id="dv_Content_9"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Cost Variant Combination") + '</a></h3><div><div class="sfGridwrapper" id="dvCvForm">';
                    tabs += '<table><thead><tr class="cssClassHeading"><td> Pos. </td> <td>' + getLocale(AspxUserDashBoard, "Combination") + '</td><td>' + getLocale(AspxUserDashBoard, "Status") + '</td><td></td><td></td><td></td></tr></thead><tbody><tr><td><input size="3" class="cssClassVariantValue" value="0" type="hidden"><input size="3" class="cssClassDisplayOrder" type="text" value="1" disabled="disabled"></td><td class="cssClassTableCostVariant"><table><thead><tr><td><b>' + getLocale(AspxUserDashBoard, "Cost Variant Name") + '</b></td><td><b>' + getLocale(AspxUserDashBoard, "Cost Variant Values") + '</b></td><td></td> </tr></thead> <tr> <td class="tdCostVariant"> <select class="ddlCostVariantsCollection"></select> <a href="#dvCvForm" class="cssClassCvAddMore" onclick="AddMoreVariantOptions(this); return false;">' + getLocale(AspxUserDashBoard, "Add More") + '</a> </td> <td class="tdCostVariantValues"> <select class="ddlCostVariantValues"><option>' + getLocale(AspxUserDashBoard, "No values") + '</option></select></td> <td> <a href="#" class="cssClassCvClose" onclick="CloseCombinationRow(this); return false;" style="display:none;"><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" title=' + getLocale(AspxUserDashBoard, "delete") + ' alt=' + getLocale(AspxUserDashBoard, "delete") + '/></a> </td> </tr> </table> <div class="cssclassItemCostVariant"> <div class="CostVariantItemQuantity"> <label>' + getLocale(AspxUserDashBoard, "Quantity") + ':</label> <input type="text" class="cssclassCostVariantItemQuantity" value="1" /> </div> <div class="PriceModifier"><label>' + getLocale(AspxUserDashBoard, "Cost ModifierType") + ':</label> <input size="5" class="cssClassPriceModifier" type="text" value="0.00"> <select class="cssClassPriceModifierType"> <option value="0">%</option> <option value="1">' + curSymbol + '</option> </select></div> <div class="WeightModifier"> <label>' + getLocale(AspxUserDashBoard, "Weight ModifierType") + ':</label> <input size="5" class="cssClassWeightModifier" type="text" value="0.00"><select class="cssClassWeightModifierType"><option value="0">%</option> <option value="1">' + getLocale(AspxUserDashBoard, "lbs") + '</option> </select> </div> </div> </td> <td> <select class="cssClassIsActive"> <option value="1">' + getLocale(AspxUserDashBoard, "Active") + '</option> <option value="0">' + getLocale(AspxUserDashBoard, "Inactive") + '</option> </select> </td> <td> <span class="nowrap"> <button rel="popuprel2" class="classAddImages" value="0" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Add Images") + '</span></span></button> </span> </td> <td> <span class="addButton"> <button type="button" value="0" class="cssclassAddCVariants" onclick="AddCombinationListRow(this); return false;"> <span><span>' + getLocale(AspxUserDashBoard, "Add More Cost Variants") + ' </span></span></button> </span> </td> <td> <a href="#" class="cssClassCvCloseMain" onclick ="CloseMainCombinationList(this); return false;" ><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" title=' + getLocale(AspxUserDashBoard, "delete") + ' alt=' + getLocale(AspxUserDashBoard, "delete") + ' /></a> </td> </tr> </tbody> </table>';
                    tabs += '</div><div class="sfButtonwrapper"><p><button id="btnBackCostVariantCombination" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Back") + '</span></span></button></p> <p><button id="btnCancelCostVariantCombination" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Reset") + '</span></span></button></p><p><button id="btnSaveCostVariantCombination" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Save Cost Variants Combination") + 'Option</span></span></button></p><p><button id="btnDeleteCostVariantCombination" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Delete Cost Variants Combination Option") + '</span></span></button></p></div>';
                    tabs += ' <div id="dvCostVarAdd" style="display:none;" class="sfButtonwrapper"><p><button id="btnAddCostVariantCombination" type="button"><span><span>' + getLocale(AspxUserDashBoard, "Add Cost Variants Combination Option") + '</span></span></button></p></div></div></div>';

                    //Item Quantity Discounts
                    quickNavigation += "<li><a class='st_tab' rel='v_tab10' href='#dv_Content_10'>" + getLocale(AspxUserDashBoard, "Item Quantity Discounts") + "</a></li>";
                    tabs += '<div class="st_tab_view" id="dv_Content_10"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Item Quantity Discounts (Tier Price Options)") + '</a></h3><div id="dvAddNewQuantityDiscount" style="display:none;"><div class="sfButtonwrapper"><p><button type="button" id="btnAddQuantityDiscount" ><span><span>' + getLocale(AspxUserDashBoard, "Add New") + '</span></span></button></p></div></div><div class="sfFormwrapper"><table width="100%" cellspacing="0" cellpadding="0" id="tblQuantityDiscount"><thead><tr class="cssClassHeading"><td>' + getLocale(AspxUserDashBoard, "Quantity More Than") + ':</td><td class="cssClassUnitPrice">' + getLocale(AspxUserDashBoard, "Unit Price") + '(' + currencyCodeSlected + '):</td><td>' + getLocale(AspxUserDashBoard, "User In Role") + ':</td><td>&nbsp;</td></tr></thead><tbody></tbody></table>';
                    tabs += '<div class="sfButtonwrapper"><p><button type="button" id="btnSaveQuantityDiscount" ><span><span>' + getLocale(AspxUserDashBoard, "Save") + '</span></span></button></p><p><button type="button" id="btnDeleteQuantityDiscount" ><span><span>' + getLocale(AspxUserDashBoard, "Delete") + '</span></span></button></p></div></div></div>';
                }
            }
            quickNavigation += "<li><a class='st_tab' rel='v_tab11' href='#dv_Content_11'>" + getLocale(AspxUserDashBoard, "Related Items") + "</a></li>";
            quickNavigation += "<li><a class='st_tab' rel='v_tab12' href='#dv_Content_12'>" + getLocale(AspxUserDashBoard, "Up-sells") + "</a></li>";
            quickNavigation += "<li><a class='st_tab' rel='v_tab13' href='#dv_Content_13'>" + getLocale(AspxUserDashBoard, "Cross-sells") + "</a></li>";

            tabs += '<div class="st_tab_view" id="dv_Content_11"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Related Items") + '</a></h3><div class="sfGridwrapper">'

                + '<div class="sfGridwrapper" ><div class="sfGridWrapperContent"><div class="cssClassSearchPanel sfFormwrapper">'
                + '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'
                + '<td><label class="cssClassLabel sfLocale">' + getLocale(AspxUserDashBoard, "Item SKU") + ' :</label><input type="text" id="txtItemSKU" class="sfTextBoxSmall" /></td>'
                + '<td><label class="cssClassLabel sfLocale">' + getLocale(AspxUserDashBoard, "Item Name") + ' :</label><input type="text" id="txtItemName" class="sfTextBoxSmall" /></td>'
                 + '<td><label class="cssClassLabel sfLocale">' + getLocale(AspxUserDashBoard, "Item Type") + ' :</label><select id="ddlSelectItemType" class="sfListmenu"><option value="0">' + getLocale(AspxUserDashBoard, "--All--") + '</option></select>'
                 + '<td><label class="cssClassLabel sfLocale">' + getLocale(AspxUserDashBoard, "Attribute Set Name") + ' :</label><select id="ddlSelectAttributeSetName" class="sfListmenu"><option value="0">' + getLocale(AspxUserDashBoard, "--All--") + '</option></select>'
                + '<td><div class="sfButtonwrapper cssClassPaddingNone"><p><button type="button" id="btnSearchRelatedItems"><span>' + getLocale(AspxUserDashBoard, "Search") + '</span></button></p></div></td>'
                + '</tr></table>'
                + '</div></div></div>'

            + '<table id="gdvRelatedItems" width="100%" border="0" cellpadding="0" cellspacing="0"></table></div></div>';

            tabs += '<div class="st_tab_view" id="dv_Content_12"><h3><a href="#">' + getLocale(AspxUserDashBoard, "Up-sells") + '</a></h3><div class="sfGridwrapper">'

             + '<div class="sfGridwrapper"><div class="sfGridWrapperContent"><div class="cssClassSearchPanel sfFormwrapper">'
                + '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'
                + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item SKU") + ' :</label><input type="text" id="txtItemSKUSell" class="sfTextBoxSmall" /></td>'
                + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item Name") + ' :</label><input type="text" id="txtItemNameSell" class="sfTextBoxSmall" /></td>'
                 + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item Type") + ' :</label><select id="ddlSelectItemTypeSell" class="sfListmenu"><option value="0">' + getLocale(AspxUserDashBoard, "--All--") + '</option></select>'
                 + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Attribute Set Name") + ' :</label><select id="ddlSelectAttributeSetNameSell" class="sfListmenu"><option value="0">' + getLocale(AspxUserDashBoard, "--All--") + '</option></select>'
                + '<td><div class="sfButtonwrapper cssClassPaddingNone"><p><button type="button" id="btnSearchUpSellItems"><span>' + getLocale(AspxUserDashBoard, "Search") + '</span></button></p></div></td>'
                + '</tr></table>'
                + '</div></div></div>'

           + '<table id="gdvUpSellItems" width="100%" border="0" cellpadding="0" cellspacing="0"></table></div></div>';

            tabs += '<div class="st_tab_view" id="dv_Content_13"><h3><a href="#">Cross-sells</a></h3><div class="sfGridwrapper">'

              + '<div class="sfGridwrapper"><div class="sfGridWrapperContent"><div class="cssClassSearchPanel sfFormwrapper">'
                + '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'
                + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item SKU") + ' :</label><input type="text" id="txtItemSKUcs" class="sfTextBoxSmall" /></td>'
                + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item Name") + ' :</label><input type="text" id="txtItemNamecs" class="sfTextBoxSmall" /></td>'
                 + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Item Type") + ' :</label><select id="ddlSelectItemTypecs" class="sfListmenu"><option value="0">' + getLocale(AspxUserDashBoard, "--All--") + '</option></select>'
                 + '<td><label class="cssClassLabel">' + getLocale(AspxUserDashBoard, "Attribute Set Name") + ' :</label><select id="ddlSelectAttributeSetNamecs" class="sfListmenu"><option value="0">' + getLocale(AspxUserDashBoard, "--All--") + '</option></select>'
                + '<td><div class="sfButtonwrapper cssClassPaddingNone"><p><button type="button" id="btnSearchCrossSellItems"><span>' + getLocale(AspxUserDashBoard, "Search") + '</span></button></p></div></td>'
                + '</tr></table>'
                + '</div></div></div>'

            + '<table id="gdvCrossSellItems" width="100%" border="0" cellpadding="0" cellspacing="0"></table></div></div>';
            //added new
            tabs += "</div></div>";

            quickNavigation += "</ul></div></div>";
            dynHTML += quickNavigation + tabs;
            var frmIDQuoted = "'" + FormID + "'";
            //Create buttons
            var buttons = '<div class="sfButtonwrapper"><p><button type="button" id="btnReturn"><span><span>' + getLocale(AspxUserDashBoard, "Back") + '</span></span></button></p>';
            if (!showDeleteBtn) {
                buttons += '<p><button type="button" id="btnResetForm" ><span><span>' + getLocale(AspxUserDashBoard, "Reset") + '</span></span> </button></p>';
            }
            else {
                buttons += '<p><button type="button" id="btnDelete" class="delbutton" ><span><span>' + getLocale(AspxUserDashBoard, "Delete Item") + '</span></span> </button></p>';
            }
            buttons += '<p><button type="button" id="saveForm"  onclick="UserDashBoardItemMangement.SubmitForm(' + frmIDQuoted + ',' + attributeSetId + ',' + itemTypeId + ')" ><span><span>' + getLocale(AspxUserDashBoard, "Save Item") + '</span></span></button></p>';
            buttons += '<div class="clear"></div></div>';
            $("#dynItemForm").html('<div id="' + FormID + '" class="sfFormwrapper"><div id="st_vertical" class="st_vertical">' + dynHTML + '</div><div class="clear"></div>' + buttons + '</div>');
            quickNavigation = "";
            UserDashBoardItemMangement.EnableAccordion();
            UserDashBoardItemMangement.EnableFormValidation(FormID);
            UserDashBoardItemMangement.EnableDatePickers();
            UserDashBoardItemMangement.EnableFileUploaders();
            UserDashBoardItemMangement.EnableHTMLEditors();
            var lastTr = $("#dvCvForm table>tbody:first tr:last");
            if (lastTr.html() == '') {
                $("#dvCvForm table>tbody:first tr:last").remove();
            }
            // UserDashBoardItemMangement.activatedatetimevalidation();
            $('#btnResetForm').bind("click", function() {
                UserDashBoardItemMangement.ClearAttributeForm();
                UserDashBoardItemMangement.OnInit();
                UserDashBoardItemMangement.ClearVariantForm();
                UserDashBoardItemMangement.BindCostVariantsInputType();
                UserDashBoardItemMangement.LoadItemStaticImage();
                var lastTr = $("#dvCvForm table>tbody:first tr:last");
                if (lastTr.html() == '') {
                    $("#dvCvForm table>tbody:first tr:last").remove();
                }
            });
            if (itemTypeId == 3) {
                UserDashBoardItemMangement.GiftCard.Init();
            }
        },

        EnableAccordion: function() {
            $('div#st_vertical').slideTabs({ tabsScroll: false, contentAnim: 'slideH', contentAnimTime: 600, contentEasing: 'easeInOutExpo', orientation: 'vertical', tabsAnimTime: 300 });

            //            //set icon and autoheight and active index
            //            $accordian = $("#accordion").accordion({ autoHeight: false,
            //                icons: { 'header': 'ui-icon-triangle-1-e', 'headerSelected': 'ui-icon-triangle-1-s' },
            //                //animated: 'bounceslide',
            //                active: 0
            //            });
            //alert($("#dynItemForm").html());
        },

        EnableFormValidation: function(frmID) {
            mustCheck = true;
            $("#" + frmID + " ." + classprefix + "Cancel").click(function(event) {
                mustCheck = false;
            });
            var fe = $("#" + frmID + " input");
            for (var j = 0; j < fe.length; j++) {
                if ((fe[j]).title.indexOf("**") == 0) {
                    if ((fe[j]).value == "" || (fe[j]).value == titleHint) {
                        var titleHint = (fe[j]).title.substring(2);
                        (fe[j]).value = titleHint;
                    }
                } else if (((fe[j]).type == "text" || (fe[j]).type == "password" || (fe[j]).type == "textarea") && (fe[j]).title.indexOf("*") == 0) {
                    addHint((fe[j]));
                    $(fe[j]).blur(function(event) { addHint(this); });
                    $(fe[j]).focus(function(event) { removeHint(this); });
                }
            }
        },

        EnableDatePickers: function() {
            for (var i = 0; i < DatePickerIDs.length; i++) {
                //$(selector).datepicker($.datepicker.regional['fr']);
                $("#" + DatePickerIDs[i]).datepicker({ dateFormat: 'yy/mm/dd' });
            }
        },

        HTMLEditor: function(editorID, editorObject) {
            this.ID = editorID;
            this.Editor = editorObject;
        },

        EnableHTMLEditors: function() {
            for (var i = 0; i < htmlEditorIDs.length; i++) {
                config = { skin: "v2" };
                var html = getLocale(AspxUserDashBoard, "Initially Text if necessary");

                var editorID = htmlEditorIDs[i];
                //alert(editorID + '::' + htmlEditorIDs.length + '::' + editorList.length);
                var instance = CKEDITOR.instances[editorID];
                if (instance) {
                    CKEDITOR.remove(instance);
                    //delete instance;
                }
                var editor = CKEDITOR.replace(editorID, config, html);

                var obj = new UserDashBoardItemMangement.HTMLEditor(editorID, editor);
                //obj.enterMode == CKEDITOR.ENTER_BR //CKEDITOR.ENTER_DIV CKEDITOR.ENTER_P
                editorList[editorList.length] = obj;
            }
        },

        ResetHTMLEditors: function() {
            htmlEditorIDs.length = 0;
            editorList.length = 0;
        },

        EnableFileUploaders: function() {
            for (var i = 0; i < FileUploaderIDs.length; i++) {
                UserDashBoardItemMangement.CreateFileUploader(String(FileUploaderIDs[i]));
            }
        },

        GetValidationTypeClasses: function(attValType, isUnique, isRequired) {
            var returnClass = ''
            if (isRequired == true) {
                returnClass = "required";
            }
            return returnClass;
        },

        GetValidationTypeErrorMessage: function(attValType) {
            var retString = ''
            switch (attValType) {
                case 1: //AlphabetsOnly
                    retString = getLocale(AspxUserDashBoard, "Alphabets Only");
                    break;
                case 2: //AlphaNumeric
                    retString = getLocale(AspxUserDashBoard, "AlphaNumeric");
                    break;
                case 3: //DecimalNumber
                    retString = getLocale(AspxUserDashBoard, "Decimal Number");
                    break;
                case 4: //Email
                    retString = getLocale(AspxUserDashBoard, "Email Address");
                    break;
                case 5: //IntegerNumber
                    retString = getLocale(AspxUserDashBoard, "Integer Number");
                    break;
                case 6: //Price
                    retString = getLocale(AspxUserDashBoard, "Price error");
                    break;
                case 7: //WebURL
                    retString = getLocale(AspxUserDashBoard, "Web URL");
                    break;
            }
            return retString;
        },
        CheckUniqueness: function(sku, itemId) {
            var errors = '';
            sku = $.trim(sku);
            if (!sku) {
                errors += getLocale(AspxUserDashBoard, "Please enter Sku code.");
                $('.cssClassRight').hide();
                $('.cssClassError').show();
                $('.cssClassError').html(getLocale(AspxUserDashBoard, "Please enter Sku code.") + '<br/>');
            }
            //check uniqueness
            else if (!UserDashBoardItemMangement.IsUnique(sku, itemId)) {
                errors += getLocale(AspxUserDashBoard, "Please enter unique item Sku code") + '! "' + sku.trim() + getLocale(AspxUserDashBoard, "already exists") + '.<br/>';
                $('.cssClassRight').hide();
                $('.cssClassError').show();
                $('.cssClassError').html(getLocale(AspxUserDashBoard, "Please enter unique item Sku code") + '! "' + sku.trim() + getLocale(AspxUserDashBoard, "already exists") + '.<br/>');
                $(".cssClassError").parent('div').addClass("diverror");
                $('.cssClassError').prevAll("input:first").addClass("error");
            }

            if (errors) {
                // csscody.alert('<h2>Information Alert</h2><p>' + errors + '</p>');
                return false;
            }
            else {
                $('.cssClassRight').show();
                $('.cssClassError').html('');
                $('.cssClassError').hide();
                $(".cssClassError").parent('div').removeClass("diverror");
                $('.cssClassError').prevAll("input:first").removeClass("error");
                return true;
            }
        },

        IsUnique: function(sku, itemId) {
            this.config.url = this.config.baseURL + "CheckUniqueItemSKUCode";
            this.config.data = JSON2.stringify({ SKU: sku, itemId: itemId, aspxCommonObj: aspxCommonObj() }),
                this.config.ajaxCallMode = 25;
            this.ajaxCall(this.config);
            return UserDashBoardItemMangement.vars.isUnique;
        },

        //Not used function
        CheckUnique: function(id) {
            var val = $('#' + id).val();
            if (val) {
                var arrID = id.split('_');
                this.config.url = this.config.baseURL + "IsUnique";
                this.config.data = JSON2.stringify({ storeID: aspxCommonObj().StoreID, portalID: aspxCommonObj().PortalID, ItemID: id, AttributeID: arrID[0], AttributeType: arrID[1], AttributeValue: val });
                this.config.ajaxCallMode = 26;
                this.ajaxCall(this.config);
                return UserDashBoardItemMangement.vars.isUnique;
            }
            else {
                return false;
            }
        },
        createValidation: function(id, attType, attValType, isUnique, isRequired) {
            var retString = '';
            var validationClass = '';

            switch (attValType) {
                case 1: //AlphabetsOnly
                    validationClass += 'verifyAlphabetsOnly';
                    break;
                case 2: //AlphaNumeric
                    validationClass += 'verifyAlphaNumeric';
                    break;
                case 3: //DecimalNumber
                    validationClass += 'verifyDecimal';
                    break;
                case 4: //Email
                    validationClass += 'verifyEmail';
                    break;
                case 5: //IntegerNumber
                    validationClass += 'verifyInteger';
                    break;
                case 6: //Price
                    validationClass += 'verifyPrice';
                    break;
                case 7: // URL
                    validationClass += 'verifyUrl';
                    break;
            }
            retString = validationClass;
            return retString;
        },

        BackToItemGrid: function() {
            listImages = [];
            UserDashBoardItemMangement.ResetHTMLEditors();
            var n = $("#btnDelete").length;
            if (n != 0) {
                $("#gdvItems_grid").show();
                $("#gdvItems_form").hide();
                $("#gdvItems_accordin").hide();
            }
            else {
                $("#gdvItems_form").show();
                $("#gdvItems_grid").hide();
                $("#gdvItems_accordin").hide();
            }
        },

        ValidateExtraField: function(cssClassFirst, cssClassSecond, validateType, ErrorMessage) {
            var valFirst = $('.' + cssClassFirst + '').val();
            var valSecond = $('.' + cssClassSecond + '').val();
            var prevFirstDiv = $('.' + cssClassFirst + '').parent('div');
            var prevSecondDiv = $('.' + cssClassSecond + '').parent('div');
            if (prevFirstDiv.length > 0 && prevSecondDiv.length > 0) {
                switch (validateType) {
                    case "price":
                        if (valFirst != "") {
                            valFirst = parseFloat(valFirst);
                        }
                        if (valSecond != "") {
                            valSecond = parseFloat(valSecond);
                        }
                        break;
                    case "date":
                        if (valFirst != "") {
                            valFirst = Date.parse(valFirst);
                        }
                        if (valSecond != "") {
                            valSecond = Date.parse(valSecond);
                        }
                        break;
                    default:
                        valFirst = eval(valFirst);
                        valSecond = eval(valSecond);
                }
                if (valFirst != "" && valSecond != "") {
                    if (valSecond >= valFirst) {
                        $('.' + cssClassFirst + '').removeClass('error');
                        $('.' + cssClassSecond + '').removeClass('error');
                        prevFirstDiv.removeClass('diverror');
                        prevSecondDiv.removeClass('diverror');
                        return true;
                    }
                    else {
                        $('.' + cssClassSecond + '').next('span').html(ErrorMessage);
                        $('.' + cssClassFirst + '').addClass('error');
                        prevFirstDiv.addClass('diverror');
                        $('.' + cssClassSecond + '').addClass('error');
                        prevSecondDiv.addClass('diverror');
                        return false;
                    }
                }
                else if (valFirst != "" && valSecond == "") {
                    $('.' + cssClassFirst + '').removeClass('error');
                    $('.' + cssClassSecond + '').removeClass('error');
                    prevFirstDiv.removeClass('diverror');
                    prevSecondDiv.removeClass('diverror');
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                prevFirstDiv.removeClass('diverror');
                prevSecondDiv.removeClass('diverror');
                return true;
            }
        },
        CostVariantsImageUploader: function(maxFileSize) {
            var upload = new AjaxUpload($('#imageUploader'), {
                action: aspxUserItemModulePath + "ItemCostVariantsFileUpload.aspx",
                name: 'myfile[]',
                multiple: true,
                data: {},
                autoSubmit: true,
                responseType: 'json',
                onChange: function(file, ext) {
                    //alert('changed');
                },
                onSubmit: function(file, ext) {
                    if (ext != "exe") {
                        if (ext && /^(jpg|jpeg|jpe|gif|bmp|png|ico)$/i.test(ext)) {
                            this.setData({
                                'MaxFileSize': maxFileSize,
                                'StoreID': AspxCommerce.utils.GetStoreID(),
                                'PortalID': AspxCommerce.utils.GetPortalID(),
                                'CultureName': AspxCommerce.utils.GetCultureName()
                            });
                        } else {
                            csscody.alert('<h1>' + getLocale(AspxUserDashBoard, "Alert Message") + '</h1><p>' + getLocale(AspxUserDashBoard, "Not a valid image!") + '</p>');
                            return false;
                        }
                    }
                    else {
                        csscody.alert('<h1>' + getLocale(AspxUserDashBoard, "Alert Message") + '</h1><p>' + getLocale(AspxUserDashBoard, "Not a valid image!") + '</p>');
                        return false;
                    }
                },
                onComplete: function(file, response) {
                    var res = eval(response);
                    if (res.Message != null && res.Status > 0) {
                        //alert(res.Message);
                        UserDashBoardItemMangement.AddNewVariantsImages(res);
                        return false;
                    }
                    else {
                        csscody.error('<h1>' + getLocale(AspxUserDashBoard, "Alert Message") + '</h1><p>' + res.Message + '</p>');
                        return false;
                    }
                }
            });
        },

        AddNewVariantsImages: function(response) {
            $("#VariantsImagesTable").show();
            $('#btnSaveImages').show();
            $('#btnImageBack').show();
            var imageList = '<tr>';
            imageList += '<td><img src="' + aspxRootPath + response.Message + '" class="uploadImage" height="20px" width="30px"/></td>';
            imageList += '<td><img class="imgDeleteCostVariant" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" id="btnDeleteCV" onclick="UserDashBoardItemMangement.DeleteCVImage(this)" /></td>';
            imageList += '</tr>';
            $("#VariantsImagesTable>tbody").append(imageList);
            $("#VariantsImagesTable>tbody tr:even").addClass("sfEven");
            $("#VariantsImagesTable>tbody tr:odd").addClass("sfOdd");
        },
        DeleteCVImage: function(onjImg) { //code to delete row
            var $target = $(onjImg).closest('tr');
            var old = $target.find('img[class=uploadImage]').attr('src');

            $target.remove();
            $.post(aspxUserItemModulePath + "ItemCostVariantsFileUpload.aspx", { DeleteImage: true, OldFileName: old }, function(ajaxFileResponse) {
            });


            //            if ($("#VariantsImagesTable>tbody>tr").length == 0) {
            //                $("#VariantsImagesTable>thead").hide();
            //            }
        },
        ClearAttributeForm: function() {

            $('#Todatevalidation').attr('class', '');
            $('#Fromdatevalidation').attr('class', '');
            $("#ItemMgt_itemID").val(0);
            var attributeSetId = '';
            var itemTypeId = '';
            attributeSetId = $("#ddlAttributeSet").val();
            itemTypeId = $("#ddlItemType").val();
            $("#spanSample").html("");
            $("#spanActual").html("");
            UserDashBoardItemMangement.ContinueForm(false, attributeSetId, itemTypeId, 0);

            //             var inputs = $("#accordion").find('INPUT, SELECT, TEXTAREA');
            //             $.each(inputs, function(i, item) {
            //                 rmErrorClass(item);
            //                 $(this).val('');
            //                 $(this).attr('checked', false);
            //             });
            //             $('.required').find('.cke_skin_v2 iframe').each(function() {
            //                 $(this).contents().find("body").text('')
            //             });
            //            // $("#gdvCrossSellItems input[type=checkbox],#gdvUpSellItems input[type=checkbox],#gdvRelatedItems input[type=checkbox]").each(function(i) {
            //             //    $(this).attr("checked", false);
            //            // });
            //             $('.cssClassRight').hide();
            //             $('.cssClassError').hide();
            //             $('.cssClassError').html('');
            //             UserDashBoardItemMangement.ResetImageTab();
            //             return false;
        },

        ResetImageTab: function() {
            $("#divTableWrapper>table>thead").html('');
            $("#divTableWrapper>table>tbody").html('');
        },

        SaveItem: function(formID, attributeSetId, itemTypeId, itemId) {
            //        var arForm = { storeID: storeId, portalID: portalId, userName: userName, culture: cultureName, isActive: 1, isModified: 0, itemID: itemID, itemTypeID: itemTypeId, attributeSetID: attributeSetId, updateFlag: 0, formVars: SerializeForm(formID)};
            //        arForm = JSON2.stringify(arForm);
            var BrandID = 0;
            itemEditFlag = itemId;
            //Image tab save here
            var itemVideoIDs = "";
            var sourceFileCollection = '';
            var filepath = '';
            var contents = '';
            var counter = 0;
            var categoriesSelected = false;
            if (itemTypeId == 1 || itemTypeId == 2) {
                BrandID = $("#lstBrands option:selected").val();
                if (BrandID == undefined) {
                    csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Alert") + '</h2><p>' + getLocale(AspxUserDashBoard, "Please select brand where it belongs") + '.</p>');
                    return false;
                }
            }
            itemVideoIDs = $("#txtVideoID").val();
            //no need to validate image 
            //        if ($("#multipleUpload .classTableWrapper > tbody >tr ").length >= 1) {

            //            if ($("#multipleUpload .classTableWrapper > tbody >tr ").length == 1) {
            //                $("#multipleUpload .classTableWrapper > tbody >tr:first td:eq(3) input:radio ").attr('checked', true);
            //            }
            //        }

            //        else {
            //            csscody.alert('<h2>Information Alert</h2><p>You need to upload at least one Base Image first!</p>');
            //            return false;
            //        }

            $("#multipleUpload .classTableWrapper > tbody >tr").each(function() {
                // filepath = $(this).find(" td:first >img").attr("src").replace(aspxRootPath, "");
                if (aspxRootPath != "/") {
                    filepath = $(this).find(" td:first >img").attr("src").replace(aspxRootPath, "");
                }
                else {
                    filepath = $(this).find(" td:first >img").attr("src").replace('/', '')
                }
                //var replacedpath = filepath.replace("../", "");
                // alert("File after replacing is " + replacedpath);
                filepath = filepath.replace("/Small", "");
                filepath = filepath.replace("/Medium", "");
                filepath = filepath.replace("/Large", "");
                var path_array = filepath.split('/');
                var sizeofArray = path_array.length;

                var fileName = path_array[sizeofArray - 1];

                sourceFileCollection += fileName + '%';
                contents += filepath + "%"; //aspxRootPath + '/Modules/AspxCommerce/AspxUserDashBoard/uploads/' + fileName + ','; // +$(this).find(" td:eq(3) input:radio:checked").attr("value");
                //DestFilePathCol += aspxRootPath + '/Modules/AspxCommerce/AspxUserDashBoard/uploads/' + fileName + ',';
                // alert(contents);
                if ($(this).find(" td:eq(6) input:checkbox").is(":checked")) {
                    contents += 1;
                    contents += '%';
                }
                else {
                    contents += 0;
                    contents += '%';
                }
                if ($(this).find(" td:eq(3) input:radio").is(":checked")) {
                    counter += 1;
                    contents += $(this).find(" td:eq(3) input:radio:checked").attr("value");
                    contents += '%';
                }
                else if ($(this).find(" td:eq(4) input:radio").is(":checked")) {
                    contents += $(this).find(" td:eq(4) input:radio:checked").attr("value");
                    contents += '%';
                }
                else if ($(this).find(" td:eq(5) input:radio").is(":checked")) {
                    contents += $(this).find(" td:eq(5) input:radio:checked").attr("value");
                    contents += '%';
                }
                else {
                    contents += "None";
                    contents += '%';
                }
                if ($(this).find(" td:eq(1) input").attr("value") != null) {
                    contents += $(this).find(" td:eq(1) input").attr("value");
                    contents += '%';
                }
                else {
                    contents += " ";
                    contents += '%';
                }
                if ($(this).find(" td:eq(2) input").attr("value") != null) {
                    contents += $(this).find(" td:eq(2) input").attr("value");
                    contents += '%';
                }
                contents += $(this).attr("value");
                contents += '#';
            });

            //alert(sourceFileCollection + '::' + DestFilePathCol + '::' + contents + '::' + counter);

            //RemoveHtml();
            //CreateHtml();
            //CreateTableHeader();
            //BindData()
            if (counter <= 1) {

                var relatedItems_ids = '';
                $("#gdvRelatedItems .chkRelatedControls").each(function(i) {
                    if ($(this).attr("checked")) {
                        relatedItems_ids += $(this).val() + ',';
                    }
                });

                var upSellItems_ids = '';
                $("#gdvUpSellItems .chkUpSellControls").each(function(i) {
                    if ($(this).attr("checked")) {
                        upSellItems_ids += $(this).val() + ',';
                    }
                });

                var crossSellItems_ids = '';
                $("#gdvCrossSellItems .chkCrossSellControls").each(function(i) {
                    if ($(this).attr("checked")) {
                        crossSellItems_ids += $(this).val() + ',';
                    }
                });
                var taxRuleId = '';
                //if (itemTypeId != 2) {
                if ($('#ddlTax').val() >= 0) {
                    taxRuleId = $('#ddlTax').val();
                } else {
                    csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Alert") + '</h2><p>' + getLocale(AspxUserDashBoard, "Please select at least one tax rule") + '.</p>');
                    return false;
                }
                //alert(taxRuleId);
                //} else {
                //taxRuleId = 0;
                //}
                var currencyCode = $("#ddlCurrencyDashBoard").val();
                var categoriesSelectedID = "";
                $("#lstCategories").each(function() {
                    if ($("#lstCategories :selected").length != 0) {
                        categoriesSelected = true;
                        $("#lstCategories option:selected").each(function(i) {
                            categoriesSelectedID += $(this).val() + ',';
                        });
                        categoriesSelectedID = categoriesSelectedID.substr(0, categoriesSelectedID.length - 1);
                    }
                });
                var itemSaveInfo = {
                    ItemId: itemId,
                    ItemTypeId: itemTypeId,
                    AttributeSetId: attributeSetId,
                    BrandId: BrandID,
                    CurrencyCode: currencyCode,
                    ItemVideoIDs: itemVideoIDs,
                    TaxRuleId: taxRuleId,
                    CategoriesIds: categoriesSelectedID,
                    RelatedItemsIds: relatedItems_ids,
                    UpSellItemsIds: upSellItems_ids,
                    CrossSellItemsIds: crossSellItems_ids,
                    DownloadItemsValue: UserDashBoardItemMangement.GetDownloadableFormData(itemTypeId),
                    SourceFileCol: sourceFileCollection,
                    DataCollection: contents,
                    FormVars: UserDashBoardItemMangement.SerializeForm(formID)
                };

                if (categoriesSelected) {
                    //save downloadable items
                    AspxCommerce.CheckSessionActive(aspxCommonObj());
                    if (AspxCommerce.vars.IsAlive) {
                        //  arForm = '{"BrandID":"' + BrandID + '","storeID":"' + storeId + '","portalID":"' + portalId + '","userName":"' + userName + '","culture":"' + cultureName + '","taxRuleID":"' + taxRuleId + '","itemID":"' + itemId + '","itemTypeID":"' + itemTypeId + '","attributeSetID":"' + attributeSetId + '","categoriesIds":"' + categoriesSelectedID + '","relatedItemsIds":"' + relatedItems_ids + '","upSellItemsIds":"' + upSellItems_ids + '","crossSellItemsIds":"' + crossSellItems_ids + '","downloadItemsValue":"' + UserDashBoardItemMangement.GetDownloadableFormData(itemTypeId) + '","sourceFileCol":"' + sourceFileCollection + '","dataCollection":"' + contents + '","formVars":' + UserDashBoardItemMangement.SerializeForm(formID) + '}';
                        this.config.url = this.config.baseURL + "SaveItemAndAttributes";
                        //  this.config.data = arForm;
                        this.config.data = JSON2.stringify({ itemObj: itemSaveInfo, aspxCommonObj: aspxCommonObj() });
                        this.config.ajaxCallMode = 27;
                        this.ajaxCall(this.config);
                    }
                    else {
                        window.location.href = AspxCommerce.utils.GetAspxRedirectPath() + LoginURL + pageExtension;
                    }
                }
                else {
                    csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Alert") + '</h2><p>' + getLocale(AspxUserDashBoard, "Please select at least one category where it belongs.") + '</p>');
                    return false;
                }

            }
            else {
                csscody.alert('<h2>' + getLocale(AspxUserDashBoard, "Information Alert") + '</h2><p>' + getLocale(AspxUserDashBoard, "Please select only one base image for item.") + '</p>');
                return false;
            }
            listImages = new Array();
        },

        GetDownloadableFormData: function(itemTypeId) {
            var downloadabelItem = "";
            if (itemTypeId == 2) {
                var titleHead = $("#txtDownloadTitle").val();
                var maxDownload = $("#txtMaxDownload").val();
                var isSharable = false; //$('input[name=chkIsSharable]').attr('checked');
                var fileSamplePrevious = $("#fileSample").attr("title"); //$("#fileSample").val();
                var fileSampleNewPath = $("#fileSample").attr('name');
                var fileActualPrevious = $("#fileActual").attr("title"); //$("#fileActual").val();
                var fileActualNewPath = $("#fileActual").attr('name');
                var displayorder = 1; //$("#txtDownDisplayOrder").val();

                downloadabelItem = '' + titleHead + '%' + maxDownload + '%' + isSharable + '%' + fileSamplePrevious + '%' + fileSampleNewPath + '%' + fileActualPrevious + '%' + fileActualNewPath + '%' + displayorder + '';
            }
            return downloadabelItem;
        },

        RemoveHtml: function() {
            $('#multipleUpload div.sfGridWrapperContent>table>tbody').html('');
            // $('table.classTableWrapper').remove();
            //  alert("Given value is " + $("#multipleUpload .classTableWrapper > tbody >trtd:first >img").attr("src"));
        },

        CreateHtml: function() {
            $('#multipleUpload div.sfGridWrapperContent').html("<table class=\"classTableWrapper\" width=\"100%\" border=\"0\" cellpadding=\"o\" cellspacing=\"0\"> <thead></thead><tbody></tbody></table>");
        },

        CreateTableHeader: function() {
            if ($("#multipleUpload .classTableWrapper > thead>tr").val() == null) {
                $("<tr class=\"cssClassHeading\"><td>" + getLocale(AspxUserDashBoard, "Image") + "</td><td>" + getLocale(AspxUserDashBoard, "Description") + "</td><td>" + getLocale(AspxUserDashBoard, "Display Order") + "</td><td>" + getLocale(AspxUserDashBoard, "Base Image") + "</td><td>" + getLocale(AspxUserDashBoard, "Small Image") + "</td><td>" + getLocale(AspxUserDashBoard, "Thumbnail") + "</td><td>" + getLocale(AspxUserDashBoard, "IsActive") + "</td><td>" + getLocale(AspxUserDashBoard, "Remove") + "</td></tr>").appendTo("#multipleUpload .classTableWrapper > thead");
                //$("<tr><input type=\"button\" value=\"Upload\" id=\"btnUpload\"/></tr>").appendTo("#multipleUpload .classTableWrapper > tfoot");
            }
        },
        BindCurrencyList: function() {
            $.ajax({
                type: "POST",
                url: aspxservicePath + "AspxCommerceWebService.asmx/BindCurrencyList",
                data: JSON2.stringify({ aspxCommonObj: aspxCommonObj() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    var currencyElements = '';
                    $.each(msg.d, function(index, value) {
                        if (value.IsPrimaryForStore == true) {
                            currencyElements += '<option value=' + value.CurrencyCode + ' selected =selected>' + value.CurrencyName + '</option>';
                        }
                        else {
                            currencyElements += '<option value=' + value.CurrencyCode + '>' + value.CurrencyName + '</option>';
                        }
                    });
                    $(".sfcurrencyList").append(currencyElements);
                    if (currencyCodeEdit == "") {
                        currencyCodeEdit = currencyCode;
                    }
                    if (primaryCode != currencyCodeEdit) {
                        primaryCode = currencyCodeEdit;
                    }
                    $("#ddlCurrencyDashBoard").val(primaryCode);
                    $("#ddlCurrencyLP").val(primaryCode);
                    $('#tblQuantityDiscount').find('thead').find('.cssClassUnitPrice').html('Unit Price (' + currencyCodeEdit + '):');
                }
            });
        },

        SerializeForm: function(formID) {
            var jsonStr = '';
            var frmValues = new Array();
            radioGroups = new Array();
            checkboxGroups = new Array();
            selectGroups = new Array();
            inputs = $(formID).find('INPUT, SELECT, TEXTAREA');
            $.each(inputs, function(i, item) {
                input = $(item);
                if (input.hasClass("dynFormItem")) {
                    var found = false;
                    switch (input.attr('type')) {
                        case 'text':
                            jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val()) + '"},';
                            break;
                        case 'select-multiple':
                            for (var i = 0; i < selectGroups.length; i++) {
                                if (selectGroups[i] == input.attr('name')) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                selectGroups[selectGroups.length] = input.attr('name');
                            }
                            break;
                        case 'select-one':
                            jsonStr += '{"name":"' + input.attr('name') + '","value":"' + input.get(0)[input.attr('selectedIndex')].value + '"},';
                            break;

                        case 'checkbox':
                            var ids = String(input.attr('name')).split("_");
                            if (ids[1] == 4) {
                                jsonStr += '{"name":"' + input.attr('name') + '","value":"' + input.is(':checked') + '"},';
                            }
                            else {
                                for (var i = 0; i <= checkboxGroups.length; i++) {
                                    if (checkboxGroups[i] == input.attr('name')) {
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found) {
                                    checkboxGroups[checkboxGroups.length] = input.attr('name');
                                }
                            }
                            break;

                        case 'radio':
                            for (var i = 0; i < radioGroups.length; i++) {
                                if (radioGroups[i] == input.attr('name')) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                radioGroups[radioGroups.length] = input.attr('name');
                            }
                            break;

                        case 'file':
                            var d = input.parent();
                            var img = $(d).find('span.response img.uploadImage');
                            if (img.length > 0) {
                                var imgToUpload = "";
                                if (img.attr("src") != undefined) {
                                    imgToUpload = img.attr("src");
                                }
                                jsonStr += '{"name":"' + input.attr('name') + '","value":"' + imgToUpload.replace(aspxRootPath, "") + '"},';
                            }
                            else {
                                var a = $(d).find('span.response a.uploadFile');
                                var fileToUpload = "";
                                if (a.attr("href") != undefined) {
                                    fileToUpload = a.attr("href");
                                }
                                if (a) {
                                    jsonStr += '{"name":"' + input.attr('name') + '","value":"' + fileToUpload.replace(aspxRootPath, "") + '"},';
                                }
                            }
                            var hdn = $(d).find('input[type="hidden"]');
                            if (hdn) {
                                jsonStr += '{"name":"' + hdn.attr('name') + '","value":"' + hdn.val() + '"},';
                            }
                            break;

                        case 'password':
                            jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val()) + '"},';
                            break;
                        case 'textarea':
                            // jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val()) + '"},';
                            jsonStr += '{"name":"' + input.attr('name') + '","value":"' + $.trim(input.val().replace(/(&nbsp;)*/g, "")) + '"},';

                            break;
                        default:
                            break;
                    }
                }
            });
            for (var i = 0; i < selectGroups.length; i++) {
                var selIDs = '';
                $('#' + selectGroups[i] + ' :selected').each(function(i, selected) {
                    selIDs += $(selected).val() + ",";
                });
                selIDs = selIDs.substr(0, selIDs.length - 1);
                jsonStr += '{"name":"' + selectGroups[i] + '","value":"' + selIDs + '"},';
            }

            for (var i = 0; i < checkboxGroups.length; i++) {
                var chkValues = '';
                $('input[name=' + checkboxGroups[i] + ']').each(function(i, item) {
                    if ($(this).is(':checked')) {
                        chkValues += $(this).val() + ",";
                    }
                });
                chkValues = chkValues.substr(0, chkValues.length - 1);
                jsonStr += '{"name":"' + checkboxGroups[i] + '","value":"' + chkValues + '"},';
            }

            for (var i = 0; i < radioGroups.length; i++) {
                var radValues = '';
                radValues = $('input[name=' + radioGroups[i] + ']:checked').val();
                jsonStr += '{"name":"' + radioGroups[i] + '","value":"' + radValues + '"},';
            }
            jsonStr = jsonStr.substr(0, jsonStr.length - 1);
            return '[' + jsonStr + ']';
        },

        CreateFileUploader: function(uploaderID) {
            //alert(d.html());
            new AjaxUpload(String(uploaderID), {
                action: aspxUserItemModulePath + 'FileUploader.aspx',
                name: 'myfile',
                onSubmit: function(file, ext) {
                    d = $('#' + uploaderID).parent();
                    baseLocation = d.attr("name");
                    validExt = d.attr("class");
                    maxFileSize = d.attr("lang");
                    var regExp = /\s+/g;
                    myregexp = new RegExp("(" + validExt.replace(regExp, "|") + ")", "i");
                    if (ext != "exe") {
                        if (ext && myregexp.test(ext)) {
                            this.setData({
                                'BaseLocation': baseLocation, 'ValidExtension': validExt, 'MaxFileSize': maxFileSize
                            });
                        } else {
                            csscody.alert('<h2>' + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'You are trying to upload invalid file type!') + '</p>');
                            return false;
                        }
                    }
                    else {
                        csscody.alert('<h2>' + getLocale(AspxUserDashBoard, 'Information Alert') + '</h2><p>' + getLocale(AspxUserDashBoard, 'You are trying to upload invalid file type!') + '</p>');
                        return false;
                    }
                },
                onComplete: function(file, ajaxFileResponse) {
                    d = $('#' + uploaderID).parent();
                    var res = eval(ajaxFileResponse);
                    if (res.Status > 0) {
                        baseLocation = d.attr("name");
                        validExt = d.attr("class");
                        var fileExt = (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
                        myregexp = new RegExp("(jpg|jpeg|jpe|gif|bmp|png|ico)", "i");
                        if (myregexp.test(fileExt)) {
                            $(d).find('span.response').html('<div class="cssClassLeft"><img src="' + aspxRootPath + res.UploadedPath + '" class="uploadImage" height="90px" width="100px" /></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardItemMangement.ClickToDeleteImage(this)" alt=' + getLocale(AspxUserDashBoard, "Delete") + ' title=' + getLocale(AspxUserDashBoard, "Delete") + '/></div>');
                        }
                        else {
                            $(d).find('span.response').html('<div class="cssClassLeft"><a href="' + aspxRootPath + res.UploadedPath + '" class="uploadFile" target="_blank">' + file + '</a></div><div class="cssClassRight"><img src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" class="cssClassDelete" onclick="UserDashBoardItemMangement.ClickToDeleteImage(this)" alt=' + getLocale(AspxUserDashBoard, "Delete") + ' title=' + getLocale(AspxUserDashBoard, "Delete") + '/></div>');
                        }
                    }
                    else {
                        csscody.error('<h2>' + getLocale(AspxUserDashBoard, 'Error Message') + '</h2><p>' + res.Message + '</p>');
                    }
                }
            });
        },

        SearchItems: function() {
            var sku = $.trim($("#txtSearchSKU").val());
            var Nm = $.trim($("#txtSearchName").val());
            if (sku.length < 1) {
                sku = null;
            }
            if (Nm.length < 1) {
                Nm = null;
            }
            var itemType = '';
            if ($("#ddlSearchItemType").val() != 0) {
                itemType = $.trim($("#ddlSearchItemType").val());
            }
            else {
                itemType = null;
            }
            var attributeSetNm = '';
            if ($("#ddlAttributeSetName").val() != 0) {
                attributeSetNm = $.trim($("#ddlAttributeSetName").val());
            }
            else {
                attributeSetNm = null;
            }
            var visibility = $.trim($("#ddlVisibitity").val()) == "" ? null : ($.trim($("#ddlVisibitity").val()) == "True" ? true : false);
            //            var visibility = "";
            //            if ($("#ddlVisibitity").val() != 0) {
            //                visibility = $.trim($("#ddlVisibitity").val());
            //            }
            //            else {
            //                visibility = null;
            //            }
            var isAct = $.trim($("#ddlIsActive").val()) == "" ? null : ($.trim($("#ddlIsActive").val()) == "True" ? true : false);
            UserDashBoardItemMangement.BindItemsGrid(sku, Nm, itemType, attributeSetNm, visibility, isAct);
        },
        SearchRelatedItems: function() {
            var itemSKU = $.trim($("#txtItemSKU").val());
            var itemName = $.trim($("#txtItemName").val());
            var itemTypeID = '';
            var attributeSetID = '';
            if (itemSKU.length < 1) {
                itemSKU = null;
            }
            if (itemName.length < 1) {
                itemName = null;
            }

            if ($("#ddlSelectItemType option:selected").val() != 0) {
                itemTypeID = $.trim($("#ddlSelectItemType  option:selected").val());
            }
            else {
                itemTypeID = null;
            }

            if ($("#ddlSelectAttributeSetName option:selected").val() != 0) {
                attributeSetID = $.trim($("#ddlSelectAttributeSetName option:selected").val());
            }
            else {
                attributeSetID = null;
            }

            var itemIDSearch = $("#ItemMgt_itemID").val();
            UserDashBoardItemMangement.BindRelatedItemsGrid(itemIDSearch, itemSKU, itemName, itemTypeID, attributeSetID);

        },
        SearchUpSellItems: function() {
            var itemSKUSell = $.trim($("#txtItemSKUSell").val());
            var itemNameSell = $.trim($("#txtItemNameSell").val());
            var itemTypeIDSell = '';
            var attributeSetIDSell = '';
            if (itemSKUSell.length < 1) {
                itemSKUSell = null;
            }
            if (itemNameSell.length < 1) {
                itemNameSell = null;
            }

            if ($("#ddlSelectItemTypeSell option:selected").val() != 0) {
                itemTypeIDSell = $.trim($("#ddlSelectItemTypeSell  option:selected").val());
            }
            else {
                itemTypeIDSell = null;
            }

            if ($("#ddlSelectAttributeSetNameSell option:selected").val() != 0) {
                attributeSetIDSell = $.trim($("#ddlSelectAttributeSetNameSell option:selected").val());
            }
            else {
                attributeSetIDSell = null;
            }

            var itemIDSearchSell = $("#ItemMgt_itemID").val();
            UserDashBoardItemMangement.BindUpSellItemsGrid(itemIDSearchSell, itemSKUSell, itemNameSell, itemTypeIDSell, attributeSetIDSell);

        },
        SearchCrossSellItems: function() {
            var itemSKUcs = $.trim($("#txtItemSKUcs").val());
            var itemNamecs = $.trim($("#txtItemNamecs").val());
            var itemTypeIDcs = '';
            var attributeSetIDcs = '';
            if (itemSKUcs.length < 1) {
                itemSKUcs = null;
            }
            if (itemNamecs.length < 1) {
                itemNamecs = null;
            }

            if ($("#ddlSelectItemTypecs option:selected").val() != 0) {
                itemTypeIDcs = $.trim($("#ddlSelectItemTypecs  option:selected").val());
            }
            else {
                itemTypeIDcs = null;
            }

            if ($("#ddlSelectAttributeSetNamecs option:selected").val() != 0) {
                attributeSetIDcs = $.trim($("#ddlSelectAttributeSetNamecs option:selected").val());
            }
            else {
                attributeSetIDcs = null;
            }

            var itemIDSearchcs = $("#ItemMgt_itemID").val();
            UserDashBoardItemMangement.BindCrossSellItemsGrid(itemIDSearchcs, itemSKUcs, itemNamecs, itemTypeIDcs, attributeSetIDcs);

        },
        AddImages: function(data, val) {
            var lst = $(data).attr("name");
            //             if (lst != '') {
            //                 $("#VariantsImagesTable>tbody").html('');
            //                 $("#VariantsImagesTable").show();
            //                 $('#btnSaveImages').show();
            //                 $('#btnImageBack').show();
            //             } else {
            //                 $("#VariantsImagesTable>tbody").html('');
            //                 $("#VariantsImagesTable").hide();
            //                 $('#btnSaveImages').hide();
            //                 $('#btnImageBack').hide();
            //             }
            var subStr = lst.split('@');
            var List = '';
            $.each(subStr, function(index) {
                List += '<tr>';
                List += '<td><img src="' + aspxRootPath + subStr[index] + '" class="uploadImage" height="20px" width="30px"/></td>';
                List += '<td><img class="imgDelete" src="' + aspxTemplateFolderPath + '/images/admin/btndelete.png" id="btn" onclick="UserDashBoardItemMangement.DeleteImage(this)" /></td>';
                List += '</tr>';
            });
            if (lst != '' && lst != "undefined") {
                $("#VariantsImagesTable>tbody").html('');
                $("#VariantsImagesTable").show();
                $("#VariantsImagesTable>tbody").append(List);
                $("#VariantsImagesTable>tbody tr:even").addClass("sfEven");
                $("#VariantsImagesTable>tbody tr:odd").addClass("sfOdd");
                $('#btnSaveImages').show();
                $('#btnImageBack').show();
            } else {
                $("#VariantsImagesTable>tbody").html('');
                $("#VariantsImagesTable").hide();
                $('#btnSaveImages').hide();
                $('#btnImageBack').hide();
            }
            $("#imageUploader").show();
            ShowPopupControl('popuprel2');
            UserDashBoardItemMangement.CostVariantsImageUploader(maxFileSize);
        },
        ClearSearchFields: function() {
            $("#txtSearchSKU").val('');
            $("#txtSearchName").val('');
            $("#ddlSearchItemType").val('0');
            $("#ddlAttributeSetName").val('0');
            $("#ddlVisibitity").val('');
            $("#ddlIsActive").val('');
        },
        ajaxFailure: function(msg) {
            switch (UserDashBoardItemMangement.config.ajaxCallMode) {
                case 1:
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to bind tax rules!") + '</p>');
                    break;
                case 2:
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to bind item quantity discount!") + '</p>');
                    break;
                case 3:
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to bind roles!") + '</p>');
                    break;
                case 4:
                    // alert("Failed to save Item Quantity Discount!");
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to save item quantity discount!") + '</p>');
                    break;
                case 5:
                    // alert("Failed to delete Item Quantity Discount!");
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to delete item quantity discount!!") + '</p>');
                    break;
                case 6:
                    //  alert("Failed to delete Item Cost Variant Value!");
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to delete item cost variant value!") + '</p>');
                    break;
                case 13:
                    // alert("Failed to save Item Cost Variant!");
                    csscody.error('<h2>' + getLocale(AspxUserDashBoard, "Error Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Failed to save item cost variant!") + '</p>');
                    break;
            }
        },
        ajaxSuccess: function(msg) {
            switch (UserDashBoardItemMangement.config.ajaxCallMode) {
                case 1:
                    var option = '';
                    $.each(msg.d, function(ind, item) {

                        option += '<option value="' + item.TaxItemClassID + '">' + item.TaxItemClassName + '</option>';

                    });
                    $("#ddlTax").append(option);
                    return true;
                    break;
                case 2:
                    $("#tblQuantityDiscount>tbody").html('');
                    if (msg.d.length > 0) {
                        var arrItems = new Array();
                        $.each(msg.d, function(index, item) {
                            var newQuantityDiscountRow = '';
                            newQuantityDiscountRow += '<tr><td><input type="hidden" size="3" class="cssClassQuantityDiscount" value="' + item.QuantityDiscountID + '"><input type="text" size="3" class="cssClassQuantity" value="' + item.Quantity + '"></td>';
                            newQuantityDiscountRow += '<td><input type="text" size="5" class="cssClassPrice" value="' + item.Price + '"></td>';
                            newQuantityDiscountRow += '<td><div class="cssClassUsersInRoleCheckBox"></div></td>';
                            newQuantityDiscountRow += '<td><span class="nowrap">';
                            newQuantityDiscountRow += '<img width="13" height="18" border="0" align="top" class="cssClassAddDiscountRow" title=' + getLocale(AspxUserDashBoard, "Add empty item") + ' alt=' + getLocale(AspxUserDashBoard, "Add empty item") + ' name="add" src="' + aspxTemplateFolderPath + '/images/admin/icon_add.gif" >&nbsp;';
                            newQuantityDiscountRow += '<img width="13" height="18" border="0" align="top" class="cssClassCloneDiscountRow" alt=' + getLocale(AspxUserDashBoard, "Clone this item") + ' title=' + getLocale(AspxUserDashBoard, "Clone this item") + ' name="clone" src="' + aspxTemplateFolderPath + '/images/admin/icon_clone.gif" >&nbsp;';
                            newQuantityDiscountRow += '<img width="12" height="18" border="0" align="top" class="cssClassDeleteDiscountRow" alt=' + getLocale(AspxUserDashBoard, "Remove this item") + ' name="remove" src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" >&nbsp;';
                            newQuantityDiscountRow += '</span></td></tr>';
                            $("#tblQuantityDiscount>tbody").append(newQuantityDiscountRow);
                            arrItems.push(item.RoleIDs);
                        });
                        UserDashBoardItemMangement.GetUserInRoleList(arrItems);
                    }
                    else {
                        var arrItems = new Array();
                        var newQuantityDiscountRow = '';
                        newQuantityDiscountRow += '<tr><td><input type="hidden" size="3" class="cssClassQuantityDiscount" value="0"><input type="text" size="3" class="cssClassQuantity"></td>';
                        newQuantityDiscountRow += '<td><input type="text" size="5" class="cssClassPrice"></td>';
                        newQuantityDiscountRow += '<td><div class="cssClassUsersInRoleCheckBox"></div></td>';
                        newQuantityDiscountRow += '<td><span class="nowrap">';
                        newQuantityDiscountRow += '<img width="13" height="18" border="0" align="top" class="cssClassAddDiscountRow" title=' + getLocale(AspxUserDashBoard, "Add empty item") + ' alt=' + getLocale(AspxUserDashBoard, "Add empty item") + ' name="add" src="' + aspxTemplateFolderPath + '/images/admin/icon_add.gif" >&nbsp;';
                        newQuantityDiscountRow += '<img width="13" height="18" border="0" align="top" class="cssClassCloneDiscountRow" alt=' + getLocale(AspxUserDashBoard, "Clone this item") + ' title=' + getLocale(AspxUserDashBoard, "Clone this item") + ' name="clone" src="' + aspxTemplateFolderPath + '/images/admin/icon_clone.gif" >&nbsp;';
                        newQuantityDiscountRow += '<img width="12" height="18" border="0" align="top" class="cssClassDeleteDiscountRow" alt=' + getLocale(AspxUserDashBoard, "Remove this item") + ' name="remove" src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" >&nbsp;';
                        newQuantityDiscountRow += '</span></td></tr>';
                        $("#tblQuantityDiscount>tbody").append(newQuantityDiscountRow);
                        UserDashBoardItemMangement.GetUserInRoleList(arrItems);
                    }
                    $("#tblQuantityDiscount>tbody tr:even").addClass("sfEven");
                    $("#tblQuantityDiscount>tbody tr:odd").addClass("sfOdd");
                    $("#tblQuantityDiscount>tbody").find("tr:eq(0)").find("img.cssClassDeleteDiscountRow").hide();
                    $(".cssClassPrice").DigitAndDecimal('.cssClassPrice', '');
                    $(".cssClassQuantity").DigitOnly('.cssClassQuantity', '');
                    $(".cssClassPrice,.cssClassQuantity").bind("contextmenu", function(e) {
                        return false;
                    });
                    break;
                case 3:
                    $.each(msg.d, function(index, item) {
                        if (itemTypeId == 2 && $.trim(item.RoleName) == "Anonymous User") {
                        } else {
                            UserDashBoardItemMangement.BindRolesList(item);
                        }
                    });
                    arrRoles = UserDashBoardItemMangement.vars.arrRoles;
                    if (arrRoles.length > 0) {
                        var divData = $('div.cssClassUsersInRoleCheckBox');
                        $.each(divData, function(index, item) {
                            $.each(arrRoles, function(i) {
                                if (i == index) {
                                    var arr = arrRoles[i].split(",");
                                    $.each(arr, function(j) {
                                        $(item).find("input[value=" + arr[j] + "]").attr("checked", "checked");
                                    });
                                }
                            });
                        });
                    }
                    break;
                case 4:
                    var item_Id = $("#ItemMgt_itemID").val();
                    UserDashBoardItemMangement.BindItemQuantityDiscountsByItemID(item_Id);
                    csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Information") + "</h2><p>" + getLocale(AspxUserDashBoard, 'Item discount quantity has been saved successfully') + "</p>");
                    break;
                case 5:
                    UserDashBoardItemMangement.vars.parentRow.remove();
                    csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Information") + "</h2><p>" + getLocale(AspxUserDashBoard, 'Item discount quantity  has been deleted successfully') + "</p>");
                    return false;
                    break;
                case 6:
                    UserDashBoardItemMangement.vars.parentRow.remove();
                    csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Information") + "</h2><p>" + getLocale(AspxUserDashBoard, "Item cost variant value has been deleted successfully.") + "</p>");
                    return false;
                    break;
                case 7:
                    UserDashBoardItemMangement.FillForm(msg);
                    //variants Tab
                    UserDashBoardItemMangement.BindItemCostVariantValueByCostVariantID(UserDashBoardItemMangement.vars.itemCostVariantId, UserDashBoardItemMangement.vars.itemId, UserDashBoardItemMangement.vars.costVariantId);
                    //UserDashBoardItemMangement.HideAllVariantDivs();
                    $("#variantsGrid,#divExistingVariant").hide();
                    $("#newCostvariants,#divNewVariant").show();
                    //ShowPopupControl('popuprel');
                    break;
                case 8:
                    if (msg.d.length > 0) {
                        $("#tblVariantTable>tbody").html('');
                        $.each(msg.d, function(index, item) {
                            listImages.push(item.ImagePath);
                            if (item.DisplayOrder == null) {
                                item.DisplayOrder = '';
                            }
                            var newVariantRow = '';
                            newVariantRow += '<tr><td><input type="hidden" size="3" class="cssClassVariantValue" value="' + item.CostVariantsValueID + '"><input type="text" size="3" class="cssClassDisplayOrder" value="' + item.DisplayOrder + '"></td>';
                            newVariantRow += '<td><input type="text" class="cssClassItemCostVariantValueName" value="' + item.CostVariantsValueName + '"></td>';
                            newVariantRow += '<td><input type="text" size="5" class="cssClassPriceModifier" value="' + item.CostVariantsPriceValue + '">&nbsp;/&nbsp;';
                            newVariantRow += '<select class="cssClassPriceModifierType priceModifierType_' + item.CostVariantsValueID + '"><option value="false">' + currencyCodeSlected + '</option><option value="true">%</option></select></td>';
                            newVariantRow += '<td><input type="text" size="5" class="cssClassWeightModifier" value="' + item.CostVariantsWeightValue + '">&nbsp;/&nbsp;';
                            newVariantRow += '<select class="cssClassWeightModifierType weightModifierType_' + item.CostVariantsValueID + '"><option value="false">lbs</option><option value="true">%</option></select></td>';
                            newVariantRow += '<td><select class="cssClassIsActive isActive_' + item.CostVariantsValueID + '"><option value="true">Active</option><option value="false">Inactive</option></select></td>';
                            //newVariantRow += '<td><input type="text" size="5" class="cssClassQuantity" value="' + item.Quantity + '">';
                            newVariantRow += '<td><span class="nowrap">';
                            newVariantRow += '<img width="13" height="18" border="0" align="top" class="cssClassAddRow" title=' + getLocale(AspxUserDashBoard, "Add empty item") + ' alt=' + getLocale(AspxUserDashBoard, "Add empty item") + ' name="add" src="' + aspxTemplateFolderPath + '/images/admin/icon_add.gif" >&nbsp;';
                            newVariantRow += '<img width="13" height="18" border="0" align="top" class="cssClassCloneRow" alt=' + getLocale(AspxUserDashBoard, "Clone this item") + ' title=' + getLocale(AspxUserDashBoard, "Clone this item") + ' name="clone" src="' + aspxTemplateFolderPath + '/images/admin/icon_clone.gif" >&nbsp;';
                            newVariantRow += '<img width="12" height="18" border="0" align="top" class="cssClassDeleteRow" alt=' + getLocale(AspxUserDashBoard, "Remove this item") + ' name="remove" src="' + aspxTemplateFolderPath + '/images/admin/icon_delete.gif" >&nbsp;';
                            newVariantRow += '<button type="button" value=' + index + ' name="' + item.ImagePath + '" class="classAddImagesEdit" rel="popuprel2" onclick="UserDashBoardItemMangement.AddImages(this,' + index + ')" ><span><span>' + getLocale(AspxUserDashBoard, "Add Images") + '</span></span></button>';
                            newVariantRow += '</span></td></tr>';
                            $("#tblVariantTable>tbody").append(newVariantRow);
                            $('.priceModifierType_' + item.CostVariantsValueID).val('' + item.IsPriceInPercentage + '');
                            $('.weightModifierType_' + item.CostVariantsValueID).val('' + item.IsWeightInPercentage + '');
                            $('.isActive_' + item.CostVariantsValueID).val('' + item.IsActive + '');
                        });
                        $("#tblVariantTable>tbody").find("tr:eq(0)").find("img.cssClassDeleteRow").hide();
                    }
                    break;
                case 9:
                    UserDashBoardItemMangement.BindCostVariantsOptions(itemId);
                    UserDashBoardItemMangement.BindItemCostVariantInGrid(itemId);
                    break;
                case 10:
                    $.each(msg.d, function(index, item) {
                        UserDashBoardItemMangement.BindInputTypeDropDown(item);
                    });
                    break;
                case 11:
                    if (msg.d.length > 0) {
                        $('#lblExistingOptions').html(getLocale(AspxUserDashBoard, "Existing Cost Variant Options:"));
                        $("select[id$=ddlExistingOptions] > option").remove();
                        $.each(msg.d, function(index, item) {
                            UserDashBoardItemMangement.BindCostVariantsDropDown(item);
                        });
                        $("#divExisitingDropDown,#ddlExistingOptions,#btnApplyExisingOption").show();
                    }
                    else {
                        $("#ddlExistingOptions").hide();
                        $("#btnApplyExisingOption").hide();
                        $("#lblExistingOptions").html(getLocale(AspxUserDashBoard, "There is no any existing cost variant options available!"));
                        $('#btnExisingBack').show();
                    }
                    break;
                case 12:
                    UserDashBoardItemMangement.vars.isUnique = msg.d;
                    break;
                case 13:
                    listImages = []; var alertMsg = '<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Item cost variant has been saved successfully.") + '</p>';
                    UserDashBoardItemMangement.ResetCVHtml(true, alertMsg);
                    if (UserDashBoardItemMangement.vars.isItemHasCostVariant) {
                        UserDashBoardItemMangement.GetEmail();
                    }
                    break;
                case 14:
                    csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Selected item(s) has been deleted successfully.") + '</p>');
                    UserDashBoardItemMangement.BindItemsGrid(null, null, null, null, null, null);
                    break;
                case 15:
                    csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Item has been deleted successfully.") + '</p>');
                    UserDashBoardItemMangement.BindItemsGrid(null, null, null, null, null, null);
                    $("#gdvItems_form").hide();
                    $("#gdvItems_accordin").hide();
                    $("#ItemMgt_itemID").val(0);
                    $("#gdvItems_grid").show();
                    break;
                case 16:
                    UserDashBoardItemMangement.BindItemsGrid(null, null, null, null, null, null);
                    break;
                case 17:
                    UserDashBoardItemMangement.BindItemsGrid(null, null, null, null, null, null);
                    break;
                case 18:
                    $("#ddlAttributeSet").get(0).options.length = 0;
                    $.each(msg.d, function(index, item) {
                        if (item.AttributeSetID != 3) {
                            $("#ddlAttributeSet").get(0).options[$("#ddlAttributeSet").get(0).options.length] = new Option(item.AliasName, item.AttributeSetID);
                        }
                        $("#ddlAttributeSetName").get(0).options[$("#ddlAttributeSetName").get(0).options.length] = new Option(item.AliasName, item.AttributeSetID);
                    });
                    break;
                case 19:
                    $('#ddlItemType').get(0).options.length = 0;
                    $.each(msg.d, function(index, item) {
                        if ($('#ddlAttributeSet').val() != 3) {
                            if (item.ItemTypeID != 4) {
                                $("#ddlItemType").get(0).options[$("#ddlItemType").get(0).options.length] = new Option(item.ItemTypeName, item.ItemTypeID);
                            }
                        } else if ($('#ddlAttributeSet').val() == 3) {
                            if (item.ItemTypeID == 4) {
                                $("#ddlItemType").get(0).options[$("#ddlItemType").get(0).options.length] = new Option(item.ItemTypeName, item.ItemTypeID);
                            }
                        }
                        $("#ddlSearchItemType").get(0).options[$("#ddlSearchItemType").get(0).options.length] = new Option(item.ItemTypeName, item.ItemTypeID);
                    });
                    break;
                case 35:
                    $.each(msg.d, function(index, item) {
                        $("#ddlSelectAttributeSetName").get(0).options[$("#ddlSelectAttributeSetName").get(0).options.length] = new Option(item.AliasName, item.AttributeSetID);
                        $("#ddlSelectAttributeSetNameSell").get(0).options[$("#ddlSelectAttributeSetNameSell").get(0).options.length] = new Option(item.AliasName, item.AttributeSetID);
                        $("#ddlSelectAttributeSetNamecs").get(0).options[$("#ddlSelectAttributeSetNamecs").get(0).options.length] = new Option(item.AliasName, item.AttributeSetID);
                    });
                    break;
                case 36:
                    $.each(msg.d, function(index, item) {
                        $("#ddlSelectItemType").get(0).options[$("#ddlSelectItemType").get(0).options.length] = new Option(item.ItemTypeName, item.ItemTypeID);
                        $("#ddlSelectItemTypeSell").get(0).options[$("#ddlSelectItemTypeSell").get(0).options.length] = new Option(item.ItemTypeName, item.ItemTypeID);
                        $("#ddlSelectItemTypecs").get(0).options[$("#ddlSelectItemTypecs").get(0).options.length] = new Option(item.ItemTypeName, item.ItemTypeID);

                    });
                    break;



                case 20:
                    maxFileSize = maxFileSize;
                    attributeSetId = UserDashBoardItemMangement.vars.attributeSetId;
                    itemTypeId = UserDashBoardItemMangement.vars.itemTypeId;
                    showDeleteBtn = UserDashBoardItemMangement.vars.showDeleteBtn;
                    itemId = UserDashBoardItemMangement.vars.itemId;
                    UserDashBoardItemMangement.CreateForm(msg.d, attributeSetId, itemTypeId, showDeleteBtn, itemId);
                    if (itemId > 0) {
                        UserDashBoardItemMangement.BindDataInAccordin(itemId, attributeSetId, itemTypeId);
                        UserDashBoardItemMangement.BindDataInImageTab(itemId);
                        UserDashBoardItemMangement.BindItemCostVariantInGrid(itemId);
                        UserDashBoardItemMangement.BindItemQuantityDiscountsByItemID(itemId);
                        if (itemTypeId == 2) {
                            UserDashBoardItemMangement.BindDownloadableForm(itemId);
                        }
                    }
                    if (itemTypeId == 2) {
                        //actual and sample file uploader
                        UserDashBoardItemMangement.SampleFileUploader(maxDownloadFileSize);
                        UserDashBoardItemMangement.ActualFileUploader(maxDownloadFileSize);
                    }
                    //Multiple Image Uploader
                    UserDashBoardItemMangement.ImageUploader(maxFileSize);
                    $("#ddlCurrencyDashBoard").val(currencyCodeEdit);
                    $("#ddlCurrencyLP").val(currencyCodeEdit);
                    $("#gdvItems_grid").hide();
                    $("#gdvItems_form").hide();
                    $("#gdvItems_accordin").show();
                    $("div.popbox").hide();
                    UserDashBoardItemMangement.GetPriceHistory(itemId);
                    $('.popbox').popbox();

                    $("#txtDownloadTitle").live("keypress", function(e) {
                        if (e.which == 37 || e.which == 44) {
                            return false;
                        }
                    });
                    $("#txtMaxDownload").live("keypress", function(e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });
                    $("#txtDownDisplayOrder").live("keypress", function(e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });

                    $('#txtMaxDownload').bind('paste', function(e) {
                        e.preventDefault();
                    });


                    $(".cssClassDisplayOrder").live("keypress", function(e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });

                    $(".cssClassPriceModifier").live("keypress", function(e) {
                        if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {
                            if (e.which == 45) { return true; }
                            return false;
                        }
                    });
                    $(".cssclassCostVariantItemQuantity").live("keypress", function(e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });

                    $(".cssClassWeightModifier").live("keypress", function(e) {
                        if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 31 && (e.which < 48 || e.which > 57)) {
                            if (e.which == 45) { return true; }
                            return false;
                        }
                    });
                    $(".cssClassWeightModifier").bind("contextmenu", function(e) {
                        return false;
                    });
                    $(".cssClassPriceModifier").bind("contextmenu", function(e) {
                        return false;
                    });

                    $(".cssClassSKU").live("keypress", function(e) {
                        if (e.which == 39 || e.which == 34) {
                            return false;
                        }
                    });
                    $("#btnSaveCostVariantCombination").die("click").bind("click", function() {

                        var variantsProperties = $("#dvCvForm table:first>tbody>tr>td.cssClassTableCostVariant").find("input.cssClassDisplayOrder,input.cssClassVariantValueName, .ddlCostVariantsCollection, .ddlCostVariantValues");
                        var isEmpty = false;
                        $.each(variantsProperties, function(index, item) {
                            if ($.trim($(this).val()) == 0) {
                                csscody.alert("<h2>" + getLocale(AspxUserDashBoard, "Information Alert") + "</h2><p>" + getLocale(AspxUserDashBoard, 'Please enter item cost variant properties.') + "</p>");
                                isEmpty = true;
                                return false;
                            }
                        });
                        if (!isEmpty) {
                            UserDashBoardItemMangement.SaveItemCostVariantsInfo();
                        }
                    });
                    $("#btnBackVariantOptions").bind("click", function() {
                        UserDashBoardItemMangement.OnInit();
                        $("#variantsGrid").show();
                        $("#newCostvariants").hide();
                        $('.classAddImages').removeAttr("name");
                        $('.classAddImagesEdit').removeAttr("name").removeAttr("onclick").removeClass("classAddImagesEdit").addClass("classAddImages");
                    });
                    $("#btnExisingBack").click(function() {
                        $("#variantsGrid").show();
                        $("#newCostvariants").hide();
                    });
                    $("#btnResetVariantOptions").click(function() {
                        UserDashBoardItemMangement.OnInit();
                        UserDashBoardItemMangement.ClearVariantForm();
                    });

                    $("#ddlCurrencyDashBoard").change(function() {
                        $("#ddlCurrencyLP option[value=" + $(this).val() + "]").attr("selected", "selected");
                        currencyCodeSlected = $(this).val();
                        currencyCodeEdit = currencyCodeSlected;
                        UserDashBoardItemMangement.InitCostVariantCombination($("#ItemMgt_itemID").val());
                        $('#tblQuantityDiscount').find('thead').find('.cssClassUnitPrice').html('Unit Price (' + currencyCodeSlected + '):');
                    });

                    $('#btnApplyExisingOption').click(function() {
                        // Function not found in webservice
                        var variant_Id = $('#ddlExistingOptions').val();
                        var item_Id = $("#ItemMgt_itemID").val();
                        if (variant_Id != null && item_Id != null) {
                            var params = { itemId: item_Id, costVariantID: variant_Id, aspxCommonObj: aspxCommonObj() };
                            var mydata = JSON2.stringify(params);
                            $.ajax({
                                type: "POST",
                                url: aspxservicePath + "AspxCommerceWebService.asmx/AddItemCostVariant",
                                data: mydata,
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function() {
                                    $('#fade, #popuprel').fadeOut();
                                    UserDashBoardItemMangement.BindItemCostVariantInGrid(item_Id);
                                    UserDashBoardItemMangement.BindCostVariantsOptions(item_Id);
                                    csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Item cost variant has been saved successfully.") + '</p>');
                                    $("#variantsGrid").show();
                                    $('#divExistingVariant,#lblCostVariantOptionTitle').hide();
                                },
                                error: function() {
                                    csscody.error('<h1>' + getLocale(AspxUserDashBoard, "Error Message") + '</h1><p>' + getLocale(AspxUserDashBoard, "Failed to save item cost variant") + '</p>');
                                }
                            });
                        }
                    });
                    $("#txtDownDisplayOrder,#txtMaxDownload").bind("contextmenu", function(e) {
                        return false;
                    });
                    $('.open').click(function() {
                        $('.classPriceHistory').show();
                    });
                    //currencyCodeSlected = currencyCode;
                    break;
                case 21:
                    if (msg.d.length > 0) {
                        UserDashBoardItemMangement.BindToTable(msg);
                    }
                    break;
                case 22:
                    $.each(msg.d, function(index, item) {
                        UserDashBoardItemMangement.FillDownlodableItemForm(msg);
                    });
                    break;
                case 23:
                    $.each(msg.d, function(index, item) {
                        UserDashBoardItemMangement.FillItemAttributes(itemId, item);
                        if (index == 0) {
                            currencyCodeEdit = item.CurrencyCode;
                            //  $('.sfcurrencyList option[value=' + item.CurrencyCode + ']').attr('selected', 'selected');
                            //$('.sfcurrencyList').attr('disabled', 'disabled');
                            $('#ddlTax').val(item.TaxItemClass);
                        }
                    });
                    break;
                case 24:
                    UserDashBoardItemMangement.FillMultiSelect(msg);
                    break;
                case 25:
                    UserDashBoardItemMangement.vars.isUnique = msg.d;
                    break;
                case 26:
                    UserDashBoardItemMangement.vars.isUnique = msg.d;
                    UserDashBoardItemMangement.FillMultiSelect(msg);
                    break;
                case 27:
                    //        var jEl = $("#divMessage");
                    //        jEl.html(result.d).fadeIn(1000);
                    //        setTimeout(function() { jEl.fadeOut(1000) }, 5000);
                    var id = msg.d;
                    if (itemTypeId == 3) {
                        UserDashBoardItemMangement.GiftCard.SaveItemCategory(id);
                    }
                    UserDashBoardItemMangement.ClearSearchFields();
                    $("#dynItemForm").html('');
                    $("#gdvItems_form").hide();
                    $("#gdvItems_accordin").hide();
                    UserDashBoardItemMangement.BindItemsGrid(null, null, null, null, null, null);
                    $("#gdvItems_grid").show();
                    if (itemEditFlag > 0) {
                        csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Item has been updated successfully.") + '</p>');
                        UserDashBoardItemMangement.GetEmail();
                    }
                    else {
                        csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Item has been saved successfully.") + '</p>');
                    }
                    UserDashBoardItemMangement.RemoveHtml();
                    //UserDashBoardItemMangement.CreateHtml();
                    //UserDashBoardItemMangement.CreateTableHeader();
                    break;
                case 28:
                    UserDashBoardItemMangement.BindAllBrandForItem(msg);
                    break;
                //                case 29:                                                                                                                                                                                                           
                //                    break;                                                                                                                                                                                                          
                case 30:
                    if (msg.d.length > 0)
                        $("#lstBrands").val(msg.d[0].BrandID);
                    else
                        $("#lstBrands").val('0');
                    break;
                case 31:
                    var receiverEmailIds = '';
                    var varinatIds = '';
                    var variantValues = '';
                    if (msg.d.length > 0) {
                        $.each(msg.d, function(index, value) {
                            receiverEmailIds += value.Email + ',';
                            varinatIds += value.VariantID + ',';
                            variantValues += value.VariantValue + '@';
                        });
                        UserDashBoardItemMangement.SendEmailToUser(varinatIds, variantValues, receiverEmailIds);

                    }
                    break;
                case 32:
                    csscody.info('<h2>' + getLocale(AspxUserDashBoard, "Successful Message") + '</h2><p>' + getLocale(AspxUserDashBoard, "Email successfully Send.") + '</p>');
                case 33:
                    if (msg.d.length > 0)
                        $("#txtVideoID").val(msg.d[0].ItemVideoIDs);
                    else
                        $("#txtVideoID").val('');
                    break;
                case 34:
                    if (msg.d.length > 0) {
                        $('.popbox').show();
                        $("div.classPriceHistory").html('');
                        //var html = '<h2><label>Price History:</label></h2>';
                        html = '<table class=classPriceHistoryList><thead><th>' + getLocale(AspxUserDashBoard, "Price") + '</th><th>' + getLocale(AspxUserDashBoard, "Date") + '</th><th>' + getLocale(AspxUserDashBoard, "User Name") + '</th></thead><tbody>';
                        $.each(msg.d, function(index, item) {
                            html += '<tr><td><span>' + parseFloat(item.ConvertedPrice.toFixed(2)) + '</span></td><td><span>' + item.Date + '</span></td><td>' + item.AddedBy + '<span></span></td></tr>';
                        });
                        html += '</tbody></table>';
                        $("div.classPriceHistory").append(html);
                    } else {
                        $("div.popbox").hide();
                    }

                    break;
                case 44:
                    csscody.info("<h2>Successful Information</h2><p>" + getLocale(AspxUserDashBoard, 'Item discount quantity has been deleted successfully') + "</p>");
                    $("#tblQuantityDiscount").parent('div.sfFormwrapper').hide();
                    $("#dvAddNewQuantityDiscount").show();
                    break;
            }
        }
    };
    UserDashBoardItemMangement.init();
    $("input:file").uniform();
});
