<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GiftCardCategory.ascx.cs"
    Inherits="Modules_AspxCommerce_AspxGiftCardManagement_GiftCardCategory" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxGiftCardManagement
        });
    });
    var aspxItemModulePath = '<%=aspxItemModulePath %>';
    var Grid;
    $(function() {
        var giftCard = function() {
            var aspxCommonObj = function() {
                var aspxCommonInfo = {
                    StoreID: AspxCommerce.utils.GetStoreID(),
                    PortalID: AspxCommerce.utils.GetPortalID(),
                    UserName: AspxCommerce.utils.GetUserName(),
                    CultureName: AspxCommerce.utils.GetCultureName()
                };
                return aspxCommonInfo;
            };
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

            var graphicImageUrl = '';
            var deleteUnSavedImage = function(path) {
                $.post(aspxservicePath + 'AspxCommerceWebService.asmx/DeleteTempFile', { path: path });
            };
            var $ajaxUpload = function(uploaderID) {

                //alert(d.html());
                new AjaxUpload(String(uploaderID), {
                    action: aspxItemModulePath + '/FileUploader.aspx',
                    name: 'myfile',
                    onSubmit: function(file, ext) {
                        var baseLocation = "Modules/AspxCommerce/AspxItemsManagement/uploads/GiftCard";
                        var validExt = "jpg jpeg png gif";
                        var maxFileSize = "1024";
                        var regExp = /\s+/g;
                        var myregexp = new RegExp("(" + validExt.replace(regExp, "|") + ")", "i");
                        if (ext != "exe") {
                            if (ext && myregexp.test(ext)) {
                                this.setData({
                                    'BaseLocation': baseLocation,
                                    'ValidExtension': validExt,
                                    'MaxFileSize': maxFileSize,
                                    'IsGiftCard': true
                                });
                            } else {
                                csscody.alert('<h2>' + getLocale(AspxGiftCardManagement, "Information Alert") + '</h2><p>' + getLocale(AspxGiftCardManagement, "You are trying to upload invalid file type!") + '</p>');
                                return false;
                            }
                        } else {
                            csscody.alert('<h2>' + getLocale(AspxGiftCardManagement, "Information Alert") + '</h2><p>' + getLocale(AspxGiftCardManagement, "You are trying to upload invalid file type!") + '</p>');
                            return false;
                        }
                    },
                    onComplete: function(file, ajaxFileResponse) {

                        var res = eval(ajaxFileResponse);
                        if (res.Status > 0) {
                            var fileExt = (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
                            var myregexp = new RegExp("(jpg|jpeg|jpe|gif|bmp|png)", "i");
                            if (myregexp.test(fileExt)) {
                                graphicImageUrl = res.UploadedPath;
                                $("#ThemePreview").html('').html('<div class="cssClassGcPreview"><img src="' + aspxRootPath + res.UploadedPath + '" class="uploadImage" height="90px" width="100px" /></div>');
                            } else {
                                $("#ThemePreview").html('').html('<div class="cssClassLeft"><a href="' + aspxRootPath + res.UploadedPath + '" class="uploadFile" target="_blank">' + file + '</a></div>');
                            }
                        } else {
                            csscody.error('<h2>' + getLocale(AspxGiftCardManagement, "Error Message") + '</h2><p>' + res.Message + '</p>');
                        }
                    }
                });

            };
            var checkExistCategory = function() {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var catName = $.trim($("#txtGCCategoryName").val());
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonInfo, giftcardCategoryName: catName });
                $ajaxCall("CheckGiftCardCategory", param, checkResult, null);
            };
            var checkResult = function(data) {
                if (!data.d) {
                    saveGiftCardCategory(0);
                } else {
                    csscody.alert('<h2>' + getLocale(AspxGiftCardManagement, "Information Alert") + '</h2><p>' + getLocale(AspxGiftCardManagement, "Category name is already exist!") + '</p>');
                }
            };
            var getGiftCardCategory = function(categoryName, addedon, status) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var param = {
                    aspxCommonObj: aspxCommonInfo,
                    categoryName: categoryName, //$.trim($("#").val()),
                    addedon: addedon, //$.trim($("#").val()),
                    status: status//$.trim($("#").val()) 
                };
                var data = param;
                var offset_ = 1;
                var current_ = 1;
                var perpage = ($("#gdvGiftCardCategory_pagesize").length > 0) ? $("#gdvGiftCardCategory_pagesize :selected").text() : 10;

                $("#gdvGiftCardCategory").sagegrid({
                    url: aspxservicePath + 'AspxCommerceWebService.asmx/',
                    functionMethod: "GetAllGiftCardCategoryGrid",
                    colModel: [
                        { display: getLocale(AspxGiftCardManagement, 'Ids'), name: 'Ids', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'attrChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                        { display: getLocale(AspxGiftCardManagement, 'Gift Card Category'), name: 'GetAllGiftCardCategory', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                        { display: getLocale(AspxGiftCardManagement, 'Added On'), name: 'Added On', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd' },
                        { display: getLocale(AspxGiftCardManagement, 'Status'), name: 'Status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Active/Inactive' },
                        { display: getLocale(AspxGiftCardManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                    ],
                    buttons: [
                        { display: getLocale(AspxGiftCardManagement, 'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'Grid.Edit', arguments: '1,2,3' },
                        { display: getLocale(AspxGiftCardManagement, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'Grid.Delete', arguments: '1' }
                    ],
                    rp: perpage,
                    nomsg: getLocale(AspxGiftCardManagement, "No Records Found!"),
                    param: data,
                    current: current_,
                    pnew: offset_,
                    sortcol: { 0: { sorter: false}, 4: { sorter: false} }
                });
                // var param = JSON2.stringify({ storeId: storeId, portalId: portalId, cultureName: cultureName });

                // $ajaxCall("GetAllGiftCardCategory", param, bindGiftCartCategory, null);


            };

            var bindGiftCartCategory = function(data) {

                var options1 = '<option value="0" selected="selected" >' + getLocale(AspxGiftCardManagement, "All") + '</option>';
                var options;
                $.each(data.d, function(index, item) {
                    options += "<option value=" + item.GiftCardCategoryId + ">" + item.GiftCardCategory + "</option>";
                });
                $("#ddlGCCategory").html('').append(options1 + options);
                $("#editGCCategory,#ddlGCCategoryImg").html('').append('<option value="0">' + getLocale(AspxGiftCardManagement, "Choose One") + '</option>' + options);



            };
            var saveGiftCardCategory = function(cid) {
                var catName = $.trim($("#txtGCCategoryName").val());
                var param = JSON2.stringify({ giftCardCategoryId: cid, aspxCommonObj: aspxCommonObj(), giftcardCategoryName: catName, isActive: $("input[name=categoryisActive]:checked").val() == 1 ? true : false });
                $ajaxCall("SaveGiftCardCategory", param, null, null);
                getGiftCardCategory(null, null, null);
                catId = 0;
                isNewCat = false;
                $("#popuprel4").hide();
                $("#dvGrdCategory").show();
                $("#divGCThemes").hide();
                csscody.info('<h2>' + getLocale(AspxGiftCardManagement, "Successful Message") + '</h2><p>' + getLocale(AspxGiftCardManagement, "Gift Card category has been saved successfully.") + '</p>');
                getGiftCardCategory(null, null, null);

            };

            var deleteGiftCardCategory = function(id) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var param = JSON2.stringify({ giftCardCategoryId: id, aspxCommonObj: aspxCommonInfo });
                $ajaxCall("DeleteGiftCardCategory", param, null, null);
                csscody.info('<h2>' + getLocale(AspxGiftCardManagement, "Successful Message") + '</h2><p>' + getLocale(AspxGiftCardManagement, "Gift Card category has been deleted successfully.") + '</p>');
                getGiftCardCategory(null, null, null);
                //getAllGiftCardThemeImage();
            };

            var deleteGiftCardThemeImage = function(id, index) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var giftCardGraphicId = 0;
                var param = JSON2.stringify({ giftCardGraphicId: id, aspxCommonObj: aspxCommonInfo });
                $ajaxCall("DeleteGiftCardThemeImage", param, function() {
                    getAllGiftCardThemeImage(catId);
                    if (index == 0) {
                        csscody.info('<h2>' + getLocale(AspxGiftCardManagement, "Successful Message") + '</h2><p>' + getLocale(AspxGiftCardManagement, "Gift Card theme image has been deleted successfully.") + '</p>');
                    }
                },
                    null);

            };

            var saveGiftCardThemeImage = function() {
                var graphicThemeName = $.trim($("#txtGCThemeName").val());
                var cid = parseInt(catId);
                var graphicImage = graphicImageUrl;
                var param = JSON2.stringify({ graphicThemeName: graphicThemeName, graphicImage: graphicImage, giftCardCategoryId: cid, aspxCommonObj: aspxCommonObj() });
                $ajaxCall("SaveGiftCardThemeImage", param, function(d) {
                    graphicImageUrl = '';
                    $("#ThemePreview").html('');
                    $('#fade, #popuprel5').fadeOut();
                    getAllGiftCardThemeImage(catId);
                    csscody.info('<h2>' + getLocale(AspxGiftCardManagement, "Successful Message") + '</h2><p>' + getLocale(AspxGiftCardManagement, "Gift Card theme image has been saved successfully.") + '</p>');
                }, null);


            };
            var saveGiftCardItemCategory = function(id) {
                var ids = $("#ddlGCCategory").val() == null ? 0 : $("#ddlGCCategory").val().join(',');
                var param = JSON2.stringify({ itemId: id, ids: ids, aspxCommonObj: aspxCommonObj() });
                $ajaxCall("SaveGiftCardItemCategory", param, null, null);
                // csscody.info('<h2>Successful Message</h2><p>Gift Card category has been saved successfully.</p>');

            };


            var getAllGiftCardThemeImage = function(id) {
                var aspxCommonInfo = aspxCommonObj();
                aspxCommonInfo.UserName = null;
                var param = JSON2.stringify({ aspxCommonObj: aspxCommonInfo, categoryId: id });

                $ajaxCall("GetAllGiftCardThemeImage", param, bindAllGiftCardThemeImage, null);
            };

            var bindAllGiftCardThemeImage = function(data) {
                if (data.d.length > 0) {
                    var $ul = $("<ul>").attr('id', 'themesSlider').addClass("jcarousel-skin-tango");
                    $.each(data.d, function(index, item) {
                        if (item.GraphicImage != null) {
                            var $li = $("<li>");
                            var $a = $("<a>");
                            var $img = $("<img>");
                            $a.addClass("cssClassDelImg").attr("href", "#").attr('data-id', item.GiftCardGraphicId).html('X').attr('style', 'float:right;position:relative;top:10px;');
                            $img.attr('width', '75').attr('height', '75').attr("src", aspxRootPath + item.GraphicImage).attr('alt', item.GraphicName);
                            $li.append($a).append($img);
                            //$li.append($img);
                            $ul.append($li);
                        }
                    });
                    $(".cssSlider").html('').append($ul);

                    $('#themesSlider').css('width', 1000);
                    $(".cssClassDelImg").unbind().bind("click", function() {

                        var id = $(this).attr('data-id');
                        var properties = {
                            onComplete: function(e) {
                                if (e)
                                    deleteGiftCardThemeImage(id);
                            }
                        };
                        csscody.confirm("<h2>" + getLocale(AspxGiftCardManagement, "Delete Confirmation") + "</h2><p>" + getLocale(AspxGiftCardManagement, "Are you sure you want to delete the Gift Card theme image?") + "</p>", properties);

                    });
                    $('#themesSlider').jcarousel();
                } else {
                    $(".cssSlider").html('').append("<span>" + getLocale(AspxGiftCardManagement, "No Images") + "</span>");
                }
            };
            var clear = function() {
                $("#txtGCCategoryName").val('');
                $("input[name=categoryisActive][value=1]").attr('checked', 'checked');
            };

            Grid = function() {
                var edit = function(tbl, args) {
                    clear();
                    //alert(args[3])
                    // debugger
                    $("#popuprel4").show();
                    $("#dvGrdCategory").hide();
                    $("#divGCThemes").show();
                    catId = args[0];
                    getAllGiftCardThemeImage(catId);
                    isNewCat = false;
                    $("#txtGCCategoryName").val(args[3]);
                    if (args[5] == "true" || args[5] == "yes" || args[5].toLowerCase() == "active") {
                        $("input[name=categoryisActive][value=1]").attr('checked', 'checked');
                    } else {
                        $("input[name=categoryisActive][value=0]").attr('checked', 'checked');
                    }
                    //ShowPopupControl('popuprel4');
                    $("#popuprel4 .cssClassHeader>h2>span").html(getLocale(AspxGiftCardManagement, 'Edit Category'));


                };
                var deleteCat = function(tbl, args) {
                    var properties = {
                        onComplete: function(e) {
                            if (e)
                                deleteGiftCardCategory(args[0], 0);
                        }
                    };
                    csscody.confirm("<h2>" + getLocale(AspxGiftCardManagement, "Delete Confirmation") + "</h2><p>" + getLocale(AspxGiftCardManagement, "Are you sure you want to delete the Gift Card category?") + "</p>", properties);

                };
                var deleteAll = function() {
                    var ids = [];
                    $("#gdvGiftCardCategory .attrChkbox").each(function(i) {
                        if ($(this).is(":checked")) {
                            ids.push($(this).val());
                        }
                    });
                    if (ids.length > 0) {
                        var properties = {
                            onComplete: function(e) {
                                if (e) {
                                    for (var z = 0; z < ids.length; z++) {
                                        deleteGiftCardCategory(ids[z], z);
                                    }
                                }

                            }
                        };
                        csscody.confirm("<h2>" + getLocale(AspxGiftCardManagement, "Delete Confirmation") + "</h2><p>" + getLocale(AspxGiftCardManagement, "Are you sure you want to delete all selected Gift Card category?") + "</p>", properties);


                    } else
                        csscody.alert("<h2>" + getLocale(AspxGiftCardManagement, "Information Alert") + "</h2><p>" + getLocale(AspxGiftCardManagement, "Please select Gift Card category to delete!") + "<p>");

                };
                return {
                    Edit: edit,
                    Delete: deleteCat,
                    DeleteAll: deleteAll
                };
            } ();
            var load = function() {

                getGiftCardCategory(null, null, null);
                // getAllGiftCardThemeImage();
                $ajaxUpload('fuGCThemeImage');
                bindFunctions();
                resetAll();
            };
            var catId = 0;
            var isNewCat = false;
            var isValidForm = function(form) {
                switch (form) {
                    case 'graphicImage':
                        $("#txtGCThemeName").next('span.iferror').hide();
                        if (graphicImageUrl == "") {
                            $("#ThemePreview").html(getLocale(AspxGiftCardManagement, "Please Upload File First!!"));
                        }
                        if (parseInt(catId) != 0 && $.trim($("#txtGCThemeName").val()) != "" && graphicImageUrl != "" && $("#ThemePreview").find('img').length > 0)
                            return true;
                        else {
                            $("#txtGCThemeName,#fuGCThemeImage").next('span.iferror').show();
                        }
                        break;
                    case 'addcategory':
                        $("#txtGCCategoryName").next('span.iferror').hide();
                        if ($.trim($("#txtGCCategoryName").val()) != "")
                            return true;
                        else {
                            $("#txtGCCategoryName").next('span.iferror').show();
                        }
                        break;
                    case 'editCategory':
                        $("#txtGCCategoryName").next('span.iferror').hide();
                        if (parseInt($("editGCCategory").val()) != 0 && $.trim($("#txtGCCategoryName").val()) != "")
                            return true;
                        else {
                            $("#txtGCCategoryName").next('span.iferror').show();

                        }
                        break;
                }
            };
            var searchCategory = function() {
                var categoryName = $.trim($("#txtGiftCardCategory").val());
                var addedon = $.trim($("#txtCategoryAddedOn").val());
                var status = $.trim($("#ddlGiftCardCategoryStatus").val()) == "0" ? null : $.trim($("#ddlGiftCardCategoryStatus").val());
                getGiftCardCategory(categoryName, addedon, status);
            };
            var bindFunctions = function() {
                $("#txtGiftCardCategory,#txtCategoryAddedOn").bind("keypress", function(e) {
                    if (e.which == 13) {
                        searchCategory();
                    }
                });
                $("#btnDeleteAllCategory").unbind().live("click", function() {
                    Grid.DeleteAll();
                });
                $("#btnAddCategory").unbind().live("click", function() {
                    clear();
                    $("#popuprel4 .cssClassHeader>h2>span").html(getLocale(AspxGiftCardManagement, 'Add Category'));
                    catId = 0;
                    isNewCat = true;
                    $('#popuprel4').show();
                    $("#dvGrdCategory").hide();
                    $("#divGCThemes").hide();

                });
                $("#btnAddGiftCardThemeImage").unbind().live("click", function() {
                    ShowPopupControl('popuprel5');
                    $("#txtGCThemeName").val('');
                    $("#ThemePreview").html('');
                    $("#fade").unbind().live("click", function() {
                        $('#fade, #popuprel5').fadeOut();
                        if (graphicImageUrl != '')
                            deleteUnSavedImage(graphicImageUrl);
                    });
                });

                $("#btnCancelGCCategory").unbind().live("click", function() {
                    $('#popuprel4').hide();
                    $("#dvGrdCategory").show();
                    $("#divGCThemes").hide();
                    catId = 0;
                    isNewCat = false;
                });
                $("#btnCancelGCThemeImage").unbind().live("click", function() {
                    $('#fade, #popuprel5').fadeOut();
                    if (graphicImageUrl != '')
                        deleteUnSavedImage(graphicImageUrl);
                });

                $('.cssClassClose').unbind().live("click", function() {
                    if (!$(".popupbox#popuprel5").is(":hidden")) {
                        if (graphicImageUrl != '')
                            deleteUnSavedImage(graphicImageUrl);
                    }
                    $('#fade, .popupbox').fadeOut();
                });

                $("#btnSetGCCategory").unbind().live("click", function() {
                    // if ($("#ddlGCCategory").val() == null) {

                    //     csscody.alert('<h2>Information Alert</h2><p>Please select Gift Card category!</p>');

                    // } else {
                    saveGiftCardItemCategory();
                    //  }

                });

                $("#btnSaveGCCategory").unbind().live("click", function() {

                    var form = isNewCat ? 'addcategory' : 'editCategory';
                    if (isValidForm(form)) {
                        $("#ddlGCCategory").val();
                        $.trim($("#txtGCThemeName").val());
                        if (isNewCat) {
                            checkExistCategory();

                        } else {
                            saveGiftCardCategory(catId);
                        }

                    } else {
                    }
                });
                $("#btnDelete").unbind().live("click", function() {
                    var id = parseInt($("#editGCCategory").find("option:selected").val());
                    if (id == 0) {
                        csscody.alert("<h2>" + getLocale(AspxGiftCardManagement, getLocale(AspxGiftCardManagement, "Information Alert")) + "</h2><p>" + getLocale(AspxGiftCardManagement, "Please select Gift Card category!") + "</p>", properties);

                    } else {
                        var properties = {
                            onComplete: function(e) {
                                if (e)
                                    deleteGiftCardCategory(id);
                            }
                        };
                        csscody.confirm("<h2>" + getLocale(AspxGiftCardManagement, "Delete Confirmation") + "</h2><p>" + getLocale(AspxGiftCardManagement, "Are you sure you want to delete the Gift Card category?") + "</p>", properties);
                    }
                });

                $("#btnSaveGCThemeImage").unbind().live("click", function() {
                    if (isValidForm('graphicImage')) {
                        saveGiftCardThemeImage();
                    }

                });
                $("#btnGiftCardCategoryManage").live("click", function() {
                    $("#dvGiftCard").show();
                    $("#dvManageGiftCardCategory").hide();
                });


                $("#btnSearchGiftCardCategory").unbind().live("click", function() {
                    searchCategory();
                });
                $("#txtCategoryAddedOn").datepicker({ changeYear: true, changeMonth: true, dateFormat: 'yy/mm/dd' });

            };
            var resetAll = function() {

                $("#txtGCCategoryName").val('');
                $("#txtGCThemeName").val('');
                // $("#editGCCategory,#ddlGCCategoryImg").val(0);
                $("#ThemePreview").html('');
                $("#ddlGCCategory").val(0);
                // $("#editGCCategory,#ddlGCCategoryImg").val(0);

                $("#aAddCategory").parents("tr").show();
                $("#trEditGC").show();
                $("#popuprel4 .cssClassHeader>h2>span").html(getLocale(AspxGiftCardManagement, 'Edit Category'));

            };
            return {
                Init: load,
                SaveCategory: saveGiftCardCategory,
                SaveThemeImage: saveGiftCardThemeImage,
                DeleteCategory: deleteGiftCardCategory,
                DeleteThemeImage: deleteGiftCardThemeImage,
                SaveItemCategory: saveGiftCardItemCategory
            };
            //() intializing funtion with this ie call function as GiftCart.Init()
            //if not then have to call like this Gift Card().Init()
        } ();
        giftCard.Init();
    });
    
</script>

<div id="dvManageGiftCardCategory" >
    <div id="dvGrdCategory" class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label runat="server" ID="lblGiftCardCategory" 
                    meta:resourcekey="lblGiftCardCategoryResource1">Gift Card Category</asp:Label></h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                   
                    <p>
                        <button id="btnDeleteAllCategory" type="button" class="sfBtn">
                            <span><span class="sfLocale">Delete All</span></span>
                        </button>
                    </p>
                    <p>
                        <button id="btnAddCategory" type="button" class="sfBtn">
                            <span><span class="sfLocale">Add New </span></span>
                        </button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
        <div class="sfGridWrapperContent">
                       <div class="cssClassSearchPanel sfFormwrapper">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td width="150">
                                                <label class="cssClassLabel sfLocale">
                                                    Category:</label>
                                                <input type="text" id="txtGiftCardCategory" class="sfTextBoxSmall" />
                                            </td>
                                     <td width="90">
                                                <label class="cssClassLabel sfLocale">
                                                    AddedOn:</label>
                                                <input type="text" id="txtCategoryAddedOn" class="sfTextBoxSmall" />
                                           
                                            </td>
                                           <td width="90">
                                                <label class="cssClassLabel sfLocale">
                                                    Status:
                                                </label>
                                                <select id="ddlGiftCardCategoryStatus" class="sfSelect">
                                                    <option value="0" class="sfLocale">-- All -- </option>
                                                    <option value="True" class="sfLocale">Active </option>
                                                    <option value="False" class="sfLocale">Inactive </option>
                                                </select>
                                            </td>
                                            <td>
                                                <div class="sfButtonwrapper">
                                                    <p>
                                                        <button type="button" id="btnSearchGiftCardCategory">
                                                            <span><span class="sfLocale">Search</span></span></button>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
          <div class="loading">
                                    <img id="ajaxStoreAccessImage1" src="" class="sfLocale" alt="loading...." title="loading...." />
                                </div>
                                <div class="log">
                                </div>
                                <table id="gdvGiftCardCategory" cellspacing="0" cellpadding="0" border="0" width="100%">
                                </table>
                                </div>
        </div>
    </div>
        
    <div  id="popuprel4" style="display: none;width:100%;">
        <div class="sfGridWrapperContent">
            <div class="cssClassCommonBox " >
                <div class="cssClassHeader">
                    <h2>
                        <asp:Label ID="Label1" runat="server" Text="Edit Category" 
                            meta:resourcekey="Label1Resource1"></asp:Label>
                    </h2>
                </div>
                <div>
                    <table cellspacing="0" cellpadding="o" border="0" width="100%">
                       
                        <tr >
                            <td class="cssClassGiftCatTd">
                                <label  class="cssClassLabel sfLocale">
                                    Category Name:
                                </label>
                            </td>
                            <td class="cssClassGiftCatTd">
                                <input type="text"  class="sfTextBoxSmall"  id="txtGCCategoryName" /><span class="iferror"
                                    style="color: red;">*</span>
                            </td><td></td>
                        </tr>
                         <tr >
                            <td class="cssClassGiftCatTd">
                                <label  class="cssClassLabel sfLocale">
                                    IsActive:
                                </label>
                            </td>
                            <td class="cssClassGiftCatTd">
                                <label><input type="radio" name="categoryisActive" value="1" checked="checked" class="sfLocale"/>Active</label> &nbsp;&nbsp;
                                 <label> <input type="radio" name="categoryisActive" value="0" class="sfLocale" />InActive</label>
                            </td><td></td>
                        </tr>
                         <tr id="divGCThemes">
                            <td class="cssClassGiftCatTd">
                               <label  class="cssClassLabel sfLocale"> Category themes:</label>
                            </td>
                            <td class="cssClassGiftCatTd">
                                <div class="cssSlider">
                                </div>
                            </td>
                            <td class="cssClassGiftCatTd"> <input type="button" id="btnAddGiftCardThemeImage" value="Add Theme Image" class="sfBtn"/> </td>
                        </tr>
                    </table>
                </div>
             
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnSaveGCCategory" class="sfBtn">
                            <span><span class="sfLocale">Save</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnCancelGCCategory" class="sfBtn">
                            <span><span class="sfLocale">Back</span></span></button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="popupbox" id="popuprel5">
        <div class="cssClassCloseIcon">
            <button type="button" class="cssClassClose">
                <span class="sfLocale">Close</span></button>
        </div>
        <div class="sfGridWrapperContent">
            <div class="cssClassCommonBox " style="width: 400px;">
                <div class="cssClassHeader">
                    <h2>
                        <asp:Label ID="Label2" runat="server" Text="Add New Theme Image" 
                            meta:resourcekey="Label2Resource1"></asp:Label>
                    </h2>
                </div>
                <div>
                    <table cellspacing="0" cellpadding="o" border="0" width="100%">
                        <tr>
                            <td class="cssClassGiftCatTd">
                                <label class="sfLocale">
                                    Theme Name:
                                </label>
                            </td>
                            <td class="cssClassGiftCatTd">
                                <input type="text" class="sfInputbox" id="txtGCThemeName" /><span class="iferror"
                                    style="color: red;">*</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="cssClassGiftCatTd">
                                <label class="sfLocale">
                                    Image File:
                                </label>
                            </td>
                            <td class="cssClassGiftCatTd">
                                <input type="file" class="" id="fuGCThemeImage" />
                                <span class="iferror" style="color: red;"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td id="ThemePreview">
                            </td>
                        </tr>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnSaveGCThemeImage" class="sfBtn">
                            <span><span class="sfLocale">Save</span></span></button>
                    </p>
                    <p>
                        <button type="button" id="btnCancelGCThemeImage" class="sfBtn">
                            <span><span class="sfLocale">Cancel</span></span></button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
