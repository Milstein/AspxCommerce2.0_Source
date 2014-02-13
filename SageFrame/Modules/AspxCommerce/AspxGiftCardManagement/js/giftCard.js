var aspxGiftCard;
  
$(function() {
    var dot = false;
    var bakCount = 0;
    var count = 0;
    (function($) {
        $.fn.numeric = function(options) {
            return this.each(function() {
                //                    var dot = false;
                //                    var bakCount = 0;
                //                    var count=0;
                var $this = $(this);
                $this.keypress(options, function(e) {
                    if ($this.val() == '') {
                        // $this.attr('maxlength', 11);
                    }
                    if (e.which == 8 || e.which == 0) {
                        if (dot == true) {
                            count--;
                        }
                        if (count == -1) {
                            // $this.attr('maxlength', 11);
                        }
                        if (dot == true && bakCount >= count) {
                            dot = false;
                            bakCount = 0;
                            count = 0;
                        }
                        return true;
                    }
                    if (e.which == 46) {
                        if (dot == false) {
                            dot = true;
                            bakCount = 0;
                            count = 0;
                            return true;
                        }
                    }
                    if (dot == true) {
                        var z = $this.val();
                        z = z.split('.');
                        $this.attr('maxlength', z[0].length + 3);
                    }
                    else {
                        //$this.attr('maxlength', 11);
                    }
                    if (dot == true) {
                        if (count < 2) {
                            count++;
                        }
                        bakCount = count;
                    }
                    // allow backspace and delete 
                    //if the letter is not digit 
                    if (e.which < 48 || e.which > 57)
                        return false;
                    // check max range 
                    var dest = e.which - 48;
                    var result = this.value + dest.toString();
                    // if (result > e.data.max) {
                    //   return false;
                    //}
                });
            });
        };
    })(jQuery);
      var  aspxCommonObj= function () {
        var aspxCommonInfo = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName()           
        };
        return aspxCommonInfo;
    };
    aspxGiftCard = function() {
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
       
        var showMsg = function(type, messege) {
            switch (type) {
            case 'alert':
                csscody.alert("<h2>"+getLocale(AspxGiftCardManagement,"Information Alert")+"</h2><p>" + messege + "<p>");
                break;
            case 'info':
                csscody.info('<h2>'+getLocale(AspxGiftCardManagement,"Successful Message")+'</h2><p>' + messege + '</p>');
                if (!$("#popuprel").is(":hidden")) {
                    $("#fade,#popuprel").fadeOut();
                    clearForm();
                }
                break;
            case 'error':
                csscody.error('<h2>'+getLocale(AspxGiftCardManagement,"Error Message")+'</h2><p>' + messege + '</p>');
                break;
            }
        };
        var bindFxtoControls = function() {
            $("#pincode").hide();
            $("#txtGiftCardCode,#txtOrderId,#txtGiftCardBalance,#txtGiftCardBalanceTo,#txtAddedOn,#txtAddedOnTo").bind("keypress", function(e) {
                if (e.which == 13) {
                    searchGiftCard();
                } else {

                }
            });
               
            $("#btnSearchGiftCard").live("click", function() {
                searchGiftCard();
            });
            $("#btnAddGiftCard").live("click", function() {
                 $("#pincode").hide();
                 giftCardId = 0;
                clearForm();
                $("#ddlgcCategory").parents('tr:eq(0)').show();
                $("#notifyTr").hide();
                $("#dvTabPanel>ul>li:last").hide();
                $("#themes").removeAttr('style');
                var $tabs = $('#dvTabPanel').tabs({ fx: [null, { height: 'show', opacity: 'show' }] });
                $tabs.tabs('select', 0);
                ShowPopupControl("popuprel");
            });
            $("#btnDeleteGiftCard").live("click", function() {
                deleteAll();
            });

            $("#btnCancelSaveUpdate,.cssClassClose").live("click", function() {
                $("#fade,#popuprel").fadeOut();
                 giftCardId = 0;
                clearForm();
                var $tabs = $('#dvTabPanel').tabs({ fx: [null, { height: 'show', opacity: 'show' }] });
                $tabs.tabs('select', 0);

            });
            $("#btnSubmit").live("click", function() {
                if (isValidForm.form()) {
                    saveGiftCard();
                }
            });
            $("#ddlgcCategory").live("change", function() {
                var id = parseInt($(this).find("option:selected").val());
                if (parseInt(id) != 0)
                    getGiftCardThemebyCategory(parseInt(id));
            });

            $("#txtGiftCardBalance,#txtOrderId,#txtGiftCardBalanceTo").numeric();
            $("#txtAddedOn,#txtAddedOnTo,#txtExpireDate").datepicker({ changeYear: true, changeMonth: true, dateFormat: 'yy/mm/dd' });
            $(".hasDatepicker,#txtGiftCardBalance,#txtOrderId,#txtExpireDate").bind("contextmenu", function(e) {
                return false;
            });

            $("#btnGiftCardCategory").live("click", function() {
                $("#dvManageGiftCardCategory").show();
                $("#dvGiftCard").hide();
            });

        };
        var loadGiftCardHistory = function(id) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.CultureName = null;
            var param = JSON2.stringify({ giftcardId: id, aspxCommonObj:aspxCommonInfo});
            $ajaxCall("GetGiftCardHistory", param, bindGiftCardHistory, null);
        };
        var jsonDateToString = function(jsonDate, dateFormat) {
            if (jsonDate) {
                var dateStr = 'new ' + jsonDate.replace( /[/]/gi , '');
                var date = eval(dateStr);
                return formatDate(date, dateFormat);
            } else {
                return jsonDate;
            }
        };
        var bindGiftCardHistory = function(data) {
            if (data.d.length > 0) {
                //width="100%" cellspacing="0" cellpadding="0" border="0"
                var $table = $("<table>").attr('width', '100%').attr('cellpadding', 0).attr('cellspacing', 0).attr('border', 0);
                var $thead = "<thead class='cssClassHeading'><td>"+getLocale(AspxGiftCardManagement,"UsedAmount")+"</td><td>"+getLocale(AspxGiftCardManagement,"Balance")+"</td><td>"+getLocale(AspxGiftCardManagement,"UsedDate")+"</td><td>"+getLocale(AspxGiftCardManagement,"Note")+"</td></thead>";
                $table.append($thead);
                $.each(data.d, function(index, item) {
                    var $tr = index % 2 == 0 ? $("<tr>").addClass("sfEven") : $("<tr>").addClass("sfOdd");
                   // var $td1 = $("<td>").append(item.GiftCardCode);
                    var $td2 = $("<td>").append(item.UsedAmount);
                    var $td3 = $("<td>").append(item.Balance);
                    var $td4 = $("<td>").append(jsonDateToString(item.AddedOn, 'yyyy/MM/dd'));
                    var $td5 = $("<td>").append(item.Note);
                    $tr.append($td2).append($td3).append($td4).append($td5);
                    $table.append($tr);
                });
                $("#tblHistory").html('').append($table);
            } else {
               $("#tblHistory").html('').append(getLocale(AspxGiftCardManagement,"No Records Found!"));
            }
        };

        var getGiftCardThemebyCategory = function(id) {
            var param = JSON2.stringify({ giftCardCategoryId: id, aspxCommonObj:aspxCommonObj()});
            $ajaxCall("GetAllGiftCardThemeImageByCategory", param, bindGiftCardThemeByCategory, null);
        };
        var bindGiftCardThemeByCategory = function(data) {
            if (data.d.length > 0) {
                var $ul = $('<ul>');
                $.each(data.d, function(index, item) {
                    var $li = $("<li>");
                    var $img = $("<img>");
                    $img.attr('data-id', item.GiftCardGraphicId).attr('width', 150).attr('height', 100).attr('src', aspxRootPath + item.GraphicImage).attr("alt", item.GraphicName);
                    $li.append($img);
                    $ul.append($li);
                });
                $ul.find('li').bind("click", function() {
                    $("#themes").find('li').removeClass("active").removeAttr('style');
                    $(this).addClass("active").css('background-color', '#C3DEF2');
                });
                $("#themes").html('').append($ul);
                $("#themes").attr('style', 'height: 150px;overflow-y: scroll;overflow-x: hidden;');
                $("#themes").find("li:first").addClass('active').css('background-color', '#C3DEF2');
                //plugin initiate slider
            } else {
                $("#themes").html(getLocale(AspxGiftCardManagement,"No Themes Image found!"));
            }
        };

        var getGiftCardCategory = function() {
            var param = JSON2.stringify({ aspxCommonObj:aspxCommonObj()});
            $ajaxCall("GetAllGiftCardCategory", param, bindGiftCardCategory, null);
        };
        var bindGiftCardCategory = function(data) {

            var options;
            $.each(data.d, function(index, item) {
                options += "<option value=" + item.GiftCardCategoryId + ">" + item.GiftCardCategory + "</option>";
            });

            $("#ddlgcCategory").html('').append('<option value="0">'+getLocale(AspxGiftCardManagement,"Choose One")+'</option>' + options);
        };

        var clearForm = function() {
            $("#ddlgcCategory").find("option[value=0]").attr('selected', 'selected');
            $("#txtGiftCardAmount").val(''); //as balance
            $("#txtSenderName").val('');
            $("#txtSenderEmail").val('');
            $("#txtRecipientName").val('');
            $("#txtRecipientEmail").val('');
            $("#txtMessege").val('');
            $("input[type=radio][name=status][id=chkStatusActive]").attr('checked', 'checked');
            $("#txtExpireDate").val('');
            $("#chkIsNotified").removeAttr('checked');
            $("#themes").html("");
            $("#tblHistory").html('');
            giftCardId = 0;
        };
        var giftCardTypeDict = [];
        var giftCardType = function() {
            var param = JSON2.stringify({ aspxCommonObj:aspxCommonObj()});
            $ajaxCall("GetGiftCardTypeId", param, function(data) {
                $.each(data.d, function(index, item) {
                    giftCardTypeDict.push(item);
                });
            }, null);
        };

        function getGiftCardTypeId(key) {
            
            for (var i = 0; i < giftCardTypeDict.length; i++) {
                if (giftCardTypeDict[i].Type.toLowerCase() == key.toLowerCase())
                    return giftCardTypeDict[i].TypeId;
            }
            return 0;
        }

//txtExpireDate
        var giftCardId = 0;
        var saveGiftCard = function() {
            var giftCardDetail = {
                Price: $.trim($("#txtGiftCardAmount").val()),
                GiftCardTypeId: getGiftCardTypeId("virtual"), //virtual always
                GiftCardCode: '',
                GraphicThemeId: giftCardId == 0 ? parseInt($("#themes ul li.active>img").attr('data-id')) : null,
                SenderName: $.trim($("#txtSenderName").val()),
                SenderEmail: $.trim($("#txtSenderEmail").val()),
                RecipientName: $.trim($("#txtRecipientName").val()),
                RecipientEmail: $.trim($("#txtRecipientEmail").val()),
                Messege: $.trim($("#txtMessege").val()),
                ExpireDate: $.trim($("#txtExpireDate").val()),
                IsRecipientNotified: giftCardId == 0 ? false : $("#chkIsNotified").is(":checked")
            };
            var isActive = $("input[type=radio][name=status][id=chkStatusActive]").is(":checked");
            var param = JSON2.stringify({ giftCardId: giftCardId, giftCardDetail: giftCardDetail, isActive: isActive,aspxCommonObj:aspxCommonObj()});
            if (giftCardDetail.GraphicThemeId != null || giftCardDetail.GraphicThemeId != 0) {
                $ajaxCall("SaveGiftCardByAdmin", param, function(e) {
                    showMsg('info', getLocale(AspxGiftCardManagement,'Data has been saved successfully.'));
                    getAllGiftCards(null, null, null,null, null, null, null);
                }, function(e) { showMsg('error', getLocale(AspxGiftCardManagement,'Failed to save data!!')); });
            } else {
                csscody.alert("<h2>"+getLocale(AspxGiftCardManagement,"Information Alert")+"</h2><p>"+getLocale(AspxGiftCardManagement,"Please select giftcard theme image!")+"<p>");
                return false;
            }


        };
        
        var deleteAll = function() {
            var ids = [];
            $("#gdvGiftCard .attrChkbox").each(function(i) {
                if ($(this).is(":checked")) {
                    ids.push($(this).val());
                }
            });
            if (ids.length > 0)
                deleteGiftCardConfirm(ids.join(','), 'M');
            else
                csscody.alert("<h2>"+getLocale(AspxGiftCardManagement,"Information Alert")+"</h2><p>"+getLocale(AspxGiftCardManagement,"Please select giftcard to delete!")+"<p>");
        };

        var deleteGiftCart = function(tbl, args) {
            deleteGiftCardConfirm(args[0], 'S');
        };
        var editGiftCard = function(tbl, args) {
 $("#pincode").show();
            clearForm();
             $("#notifyTr").show();
            $("#dvTabPanel>ul>li:last").show();
            $("#themes").removeAttr('style');
             var $tabs = $('#dvTabPanel').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
            $tabs.tabs('select', 0);
            //load history also/another tab
            getDetailById(args[0]);
            loadGiftCardHistory(args[0]);
            giftCardId = args[0];

        };
        var getDetailById = function(gid) {
            var aspxCommonInfo = aspxCommonObj();
            aspxCommonInfo.CultureName = null;
            aspxCommonInfo.UserName = null;
            var param = JSON2.stringify({ giftcardId: gid, aspxCommonObj:aspxCommonInfo});
            $ajaxCall("GetGiftCardDetailById", param, bindGiftCardDetail, null);
        };
        var bindGiftCardDetail = function(data) {
            if (data.d.length > 0) {
                var info = data.d[0];
                //info.GiftCardId;
                // info.GiftCardTypeId;
                //  info.GraphicThemeId; GraphicThemeUrl
                ShowPopupControl("popuprel");
                $("#fade").unbind().live("click", function() {
                    var $tabs = $('#dvTabPanel').tabs({ fx: [null, { height: 'show', opacity: 'show' }] });
                    $tabs.tabs('select', 0);
                    $("#fade,#popuprel").fadeOut();
                });
                $("#ddlgcCategory").parents('tr:eq(0)').hide();
                $("#lblPinCode").html(info.GiftCardPinCode);
                $("#lblGiftCardCode").val(info.GiftCardCode);
                $("#txtExpireDate").val(jsonDateToString(info.ExpireDate, 'yyyy/MM/dd'));
                $("#txtSenderName").val(info.SenderName);
                $("#txtSenderEmail").val(info.SenderEmail);
                $("#txtRecipientName").val(info.RecipientName);
                $("#txtRecipientEmail").val(info.RecipientEmail);
                $("#txtMessege").val(info.Messege);
                $("#txtGiftCardAmount").val(info.Balance);
                $("#themes").html("").append($("<img>").attr('src', aspxRootPath + info.GraphicThemeUrl).attr('width', 150).attr('height', 100));
                info.IsActive ? $("#chkStatusActive").attr('checked', 'checked') : $("#chkStatusDisActive").attr('checked', 'checked');
                info.IsRecipientNotified ? $("#chkIsNotified").attr('checked', 'checked') : $("#chkIsNotified").removeAttr('checked');

                //info.GiftCardCategoryId;
                // info.IsRecipientNotified;
            }
        };
        var searchGiftCard = function() {
            var giftcardCode = $.trim($("#txtGiftCardCode").val()) == '' ? null : $.trim($("#txtGiftCardCode").val()),
                orderId=$.trim($("#txtOrderId").val()) == '' ? null : $.trim($("#txtOrderId").val()),
                balance = $.trim($("#txtGiftCardBalance").val()) == '' ? null : $.trim($("#txtGiftCardBalance").val()),
                balanceTo=$.trim($("#txtGiftCardBalanceTo").val()) == '' ? null : $.trim($("#txtGiftCardBalanceTo").val()),
                addedon = $.trim($("#txtAddedOn").val()) == '' ? null : $.trim($("#txtAddedOn").val()),
                expireon = $.trim($("#txtAddedOnTo").val()) == '' ? null : $.trim($("#txtAddedOnTo").val()),
                status = $.trim($("#ddlGiftCardStatus").val()) == "0" ? null : $.trim($("#ddlGiftCardStatus").val()) == 'True' ? true : false;
            getAllGiftCards(giftcardCode,orderId, balance,balanceTo, addedon, expireon, status);
        };
        var deleteGiftCardConfirm = function(id, type) {
            var properties = {
                onComplete: function(e) {
                    deleteGiftCard(id, e);
                }
            };
            var deleteGiftCard = function(gid, confirm) {
                if (confirm) {
                    var aspxCommonInfo = aspxCommonObj();
                    aspxCommonInfo.UserName = null;
                    var param = JSON2.stringify({ giftCardId: gid,aspxCommonObj:aspxCommonInfo });
                    $ajaxCall("DeleteGiftCard", param, function() {
                        showMsg('info',getLocale(AspxGiftCardManagement,'Data has been deleted succesfully.'));
                        getAllGiftCards(null,null, null,null, null, null, null);
                    }, null);
                   
                }
            };
            if (type == 'S')
                csscody.confirm("<h2>"+getLocale(AspxGiftCardManagement,"Delete Confirmation")+"</h2><p>"+getLocale(AspxGiftCardManagement,"Are you sure you want to delete the selected Gift Card?")+"<p>", properties);
            else
                csscody.confirm("<h2>"+getLocale(AspxGiftCardManagement,"Delete Confirmation")+"</h2><p>"+getLocale(AspxGiftCardManagement,"Are you sure you want to delete all selected Gift Card?")+"<p>", properties);
        };
        var getAllGiftCards = function(giftcardCode,orderId, balance,balanceTo, addedon, expireon, status) {
            var giftCardDataObj = {
                OrderID: orderId,
                Balance: balance,
                BalanceTo:balanceTo,
                GiftcardCode: giftcardCode,
                StartDate: addedon,
                EndDate: expireon,
                Status: status
            };
            var param = {
                aspxCommonObj:aspxCommonObj(),
                giftCardDataObj:giftCardDataObj
            };
            var data = param;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvGiftCard_pagesize").length > 0) ? $("#gdvGiftCard_pagesize :selected").text() : 10;

            $("#gdvGiftCard").sagegrid({
                url: aspxservicePath + 'AspxCommerceWebService.asmx/',
                functionMethod: "GetAllPaidGiftCard",
                colModel: [
                   { display:getLocale(AspxGiftCardManagement,'Ids'), name: 'Ids', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'attrChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                       { display:getLocale(AspxGiftCardManagement,'Gift Card Code'), name: 'GiftCardCode', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                       { display:getLocale(AspxGiftCardManagement, 'Balance'), name: 'Balance', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                       { display:getLocale(AspxGiftCardManagement, 'Is Recipient Notified'), name: 'Is Recipient Notified', cssclass: '', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Yes/No' },
                       { display: getLocale(AspxGiftCardManagement,'Added On'), name: 'Added On', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left', type: 'date', format: 'yyyy/MM/dd' },
                       { display:getLocale(AspxGiftCardManagement,'Status'), name: 'Status', cssclass: 'cssClassHeadBoolean', controlclass: '', coltype: 'label', align: 'left', type: 'boolean', format: 'Active/Inactive' },
                       { display:getLocale(AspxGiftCardManagement,'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                	],
                buttons: [
                 { display: getLocale(AspxGiftCardManagement,'Edit'), name: 'edit', enable: true, _event: 'click', trigger: '1', callMethod: 'aspxGiftCard.Edit', arguments: '1,2,3' },
                 { display: getLocale(AspxGiftCardManagement,'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'aspxGiftCard.Delete', arguments: '1' }
         		],
                rp: perpage,
                nomsg: getLocale(AspxGiftCardManagement,"No Records Found!"),
                param: data,
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false}, 6: { sorter: false} }
            });

        };
        var isValidForm = $("#form1").validate({
            messages: {
                GiftCardAmount: {
                    required: '*'
                },
                ExpireDate: {
                    required: '*'
                },
                RecipientName: {
                    required: '*',
                    minlength: "* ("+getLocale(AspxGiftCardManagement,"at least 2 chars")+")"
                },
                RecipientEmail: {
                    required: '*'
                },
                SenderName: {
                    required: '*',
                    minlength: "* ("+getLocale(AspxGiftCardManagement,"at least 2 chars")+")"
                },
                SenderEmail: {
                    required: '*'
                }
            },
            rules:
                {
                    GiftCardAmount: { required: true },
                    ExpireDate: { required: true },
                    RecipientName: { required: true },
                    RecipientEmail: { required: true, email: true },
                    SenderName: { required: true },
                    SenderEmail: { required: true, email: true }
                },
            ignore: ":hidden"
        });
      
        var init = function() {
            bindFxtoControls();
            var $tabs = $('#dvTabPanel').tabs({ fx: [null, { height: 'show', opacity: 'show'}] });
            $tabs.tabs('select', 0);
            getAllGiftCards(null,null, null,null, null, null, null);
            getGiftCardCategory();
            giftCardType();
        };
        return { Edit: editGiftCard,
            Delete: deleteGiftCart,
            Init: init,
            ReloadCategory:getGiftCardCategory           
        };
    } ();
    aspxGiftCard.Init();
});

