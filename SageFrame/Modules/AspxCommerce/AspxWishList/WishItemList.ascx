<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WishItemList.ascx.cs"
    Inherits="WishItemList" %>

<script type="text/javascript" language="javascript">
	//<![CDATA[
    var countryName = '<%=CountryName %>';
    var userEmailIDWishList = '<%=UserEmailWishList %>';
    var serverNameVariables = '<%=Request.ServerVariables["SERVER_NAME"]%>';
    var allowOutStockPurchaseSetting = '<%=AllowOutStockPurchase %>';
    var showImageInWishlistSetting = '<%=ShowImageInWishlist %>';
    var enableWishListSetting = '<%=EnableWishList %>';
    var noImageWishListSetting = '<%=NoImageWishList%>';
    var WishList ="";
    var currentPage = 0;
    var rowTotal = '<%=RowTotal %>';
    var arrayLength = '<%=ArrayLength %>';
    arrItemListType =new Array();

    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxWishList
        });
        if ($("#divLoadUserControl").length != 0) {
            $(".sfLocale").localize({
                moduleKey: AspxUserDashBoard
            });
        }
        var aspxCommonObj = {
            StoreID: AspxCommerce.utils.GetStoreID(),
            PortalID: AspxCommerce.utils.GetPortalID(),
            UserName: AspxCommerce.utils.GetUserName(),
            CultureName: AspxCommerce.utils.GetCultureName(),
            CustomerID: AspxCommerce.utils.GetCustomerID(),
            SessionCode: AspxCommerce.utils.GetSessionCode()
        };
        var countryName = countryName;
        var userEmailWishList = userEmailIDWishList;
        var serverLocation = serverNameVariables;
        var userFriendlyURL = AspxCommerce.utils.IsUserFriendlyUrl();
        WishList = {
            config: {
                isPostBack: false,
                async: true,
                cache: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: AspxCommerce.utils.GetAspxServicePath(),
                method: "",
                url: "",
                ajaxCallMode: "",
                error: ""
            },

            ajaxCall: function(config) {

                $.ajax({
                    type: WishList.config.type,
                    contentType: WishList.config.contentType,
                    cache: WishList.config.cache,
                    async: WishList.config.async,
                    url: WishList.config.url,
                    data: WishList.config.data,
                    dataType: WishList.config.dataType,
                    success: function(data) {
                        WishList.config.ajaxCallMode(data);
                    },
                    error: function() {
                        WishList.config.error;
                    }
                });
            },

            BindWishItemOnDeletion: function() {
                HeaderControl.GetWishListCount(); // for header wish counter increase for database
                $('#tblWishItemList tbody tr').each(function() {
                    $(this).find('td input[type="checkbox"]').removeAttr('checked');
                });
                WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val()); // for rebinding the wishlist item 
                csscody.info("<h2>" + getLocale(AspxWishList, "Successful Message") + "</h2><p>" + getLocale(AspxWishList, "Wished item has been deleted successfully.") + "</p>");
            },

            BindWishItemList: function(msg) {
                $("#tblWishItemList>tbody").html('');
                $("#chkHeading").attr('checked', false);
                if (msg.d.length > 0) {
                    $("#divWishListSort").css('display', 'block');
                    arrItemListType.length = 0;
                    arrItemListType = [];
                    $.each(msg.d, function(index, item) {
                        WishList.BindWishListItems(item, index);
                    });
                    if (arrItemListType.length > 0) {
                        var items_per_page = $('#ddlWishListPageSize').val();
                        $('#Pagination').pagination(rowTotal, {
                        //  callback:'',
                            items_per_page: items_per_page,
                            //num_display_entries: 10,
                            current_page: currentPage,
                            callfunction: true,
                            function_name: { name: WishList.GetWishItemList, limit: $('#ddlWishListPageSize').val(), sortBy: $('#ddlWishListSortBy').val() },
                            prev_text: "Prev",
                            next_text: "Next",
                            prev_show_always: false,
                            next_show_always: false
                        });
                        $('#divWishListPageNumber').show();
                    }

                    $(".comment").each(function() {
                        if ($(this).val() == "") {
                            $(this).addClass("lightText").val(getLocale(AspxWishList, "enter a comment.."));
                        }
                    });

                    $(".comment").bind("focus", function() {
                        if ($(this).val() == "enter a comment..") {
                            $(this).removeClass("lightText").val("");
                        }
                        // focus lost action
                    });
                    $(".comment").bind("blur", function() {
                        if ($(this).val() == "") {
                            $(this).val("enter a comment..").addClass("lightText");
                        }
                    });
                    $("#tblWishItemList>thead").css("display", "");
                    $("#wishitemBottom").show();
                } else {
                    $("#divWishListSort").css('display', 'none');
                    $("#divWishListPageNumber").css('display', 'none');
                    $("#tblWishItemList>thead").hide();
                    $("#wishitemBottom").hide();
                    $("#tblWishItemList").html("<tr><td class=\"cssClassNotFound\">" + getLocale(AspxWishList, "Your wishlist is empty!") + "</td></tr>");
                }
            },

            BindWishItemSingleDelete: function() {
                HeaderControl.GetWishListCount(); // for header wish counter increase for database
                WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val()); // for rebinding the wishlist item                         
                csscody.info("<h2>" + getLocale(AspxWishList, "Successful Message") + "</h2><p>" + getLocale(AspxWishList, "Wished item has been deleted successfully.") + "</p>");

            },

            GetUpdateWishListMsg: function() {
                csscody.info("<h2>" + getLocale(AspxWishList, "Successful Message") + "</h2><p>" + getLocale(AspxWishList, "Your wishlist has been updated successfully.") + "</p>");
            },

            BindWishListOnClear: function() {
                HeaderControl.GetWishListCount(); // for header wish counter increase for database
                WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val()); // for rebinding the wishlist item                        
                csscody.info("<h2>" + getLocale(AspxWishList, "Successful Message") + "</h2><p>" + getLocale(AspxWishList, "Your wishlist has been cleared successfully.") + "</p>");
            },
            OnSharingWishList: function() {
                csscody.info("<h2>" + getLocale(AspxWishList, "Successful Message") + "</h2><p>" + getLocale(AspxWishList, "Email has been sent successfully.") + "</p>");
                WishList.ClearShareWishItemForm();
                $('#divWishListContent').show();
                $('#divShareWishList').hide();
                $('#fade, #popuprel5, .cssClassClose').fadeOut();

            },
            //see later
//                case 3:
//                    csscody.error("<h2>"+getLocale(AspxWishList,"Error Message")+"</h2><p>"+getLocale(AspxWishList,"Failed to delete wished item!")+"</p>");
//                    break;
            GetUpdateWishListErrorMsg: function() {
                csscody.error("<h2>" + getLocale(AspxWishList, "Error Message") + "</h2><p>" + getLocale(AspxWishList, "Failed to update wish list!") + "</p>");
            },

            GetWishListClearErrorMsg: function() {
                csscody.error("<h2>" + getLocale(AspxWishList, "Error Message") + "</h2><p>" + getLocale(AspxWishList, "Failed to clear wish list!") + "</p>");
            },

            GetSendEmailErrorMsg: function() {
                //   WishList.ClearShareWishItemForm();
                $('#fade, #popuprel5, .cssClassClose').fadeOut();
                csscody.error("<h2>" + getLocale(AspxWishList, "Error Message") + "</h2><p>" + getLocale(AspxWishList, "Failed to sending mail!") + "</p>");
            },

            trim: function(str, chars) {
                return WishList.ltrim(WishList.rtrim(str, chars), chars);
            },
            ltrim: function(str, chars) {
                chars = chars || "\\s";
                return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
            },
            rtrim: function(str, chars) {
                chars = chars || "\\s";
                return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
            },
            validateMultipleEmailsCommaSeparated: function(value) {
                var result = value.split(",");
                for (var i = 0; i < result.length; i++)
                    if (!WishList.validateEmail(result[i]))
                        return false;
                return true;
            },
            validateEmail: function(field) {
                var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
                return (regex.test(WishList.trim(field))) ? true : false;
            },
            ClearShareWishItemForm: function() {
                $('#txtEmailID').val('');
                $('#txtEmailMessage').val('');
                $('#tblWishItemList tbody tr').each(function() {
                    $(this).find('td input[type="checkbox"]').removeAttr('checked');
                    $(this).find('td .comment').val('');
                });
                $('#chkHeading').removeAttr('checked');
            },
            DeleteWishListItem: function(wishItemId) {
                var properties = {
                    onComplete: function(e) {
                        WishList.ConfirmDeleteWishItem(wishItemId, e);
                    }
                };
                // Ask user's confirmation before delete records        
                csscody.confirm("<h2>" + getLocale(AspxWishList, "Delete Confirmation") + "</h2><p>" + getLocale(AspxWishList, "Are you sure you want to delete this wished item?") + "</p>", properties);
            },
            ConfirmDeleteWishItem: function(id, event) {

                if (event) {
                    this.config.method = "AspxCommerceWebService.asmx/DeleteWishItem";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = JSON2.stringify({ wishItemID: id, aspxCommonObj: aspxCommonObj });
                    this.config.ajaxCallMode = WishList.BindWishItemOnDeletion;
                    this.ajaxCall(this.config);
                }
            },
            GetWishItemList: function(offset, limit, _currentPage, sortBy) {
                var count = 10;
                var isAll = 1;
                currentPage = _currentPage;
                WishList.config.method = "AspxCommerceWebService.asmx/GetWishItemList";
                WishList.config.url = WishList.config.baseURL + WishList.config.method;
                WishList.config.data = JSON2.stringify({ offset: offset, limit: limit, aspxCommonObj: aspxCommonObj, flagShowAll: isAll, count: count, sortBy: sortBy });
                WishList.config.ajaxCallMode = WishList.BindWishItemList;
                WishList.ajaxCall(WishList.config);
            },
            BindWishListItems: function(response, index) {
                rowTotal = response.RowTotal;
                arrItemListType.push(response.ItemID);
                var imagePath = itemImagePath + response.ImagePath;
                if (response.ImagePath == "") {
                    imagePath = noImageWishListSetting;
                } else if (response.AlternateText == "") {
                    response.AlternateText = response.ItemName;
                }
                //     ItemIDs = response.ItemID + "#";
                //     ItemComments = $("#comment" + response.ItemID + "").innerText;
                var WishDate = WishList.DateDeserialize(response.WishDate, "yyyy/M/d");
                var itemSKU = JSON2.stringify(response.SKU);
                var cosVaraint = JSON2.stringify(response.CostVariantValueIDs);
                var href = '';
                var cartUrl = '';
                if (response.CostVariantValueIDs == "") {
                    cartUrl = '#';
                    href = AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + response.SKU + pageExtension;
                } else {
                    cartUrl = AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + response.SKU + pageExtension + '?varId=' + response.CostVariantValueIDs + '';
                    href = AspxCommerce.utils.GetAspxRedirectPath() + 'item/' + response.SKU + pageExtension + '?varId=' + response.CostVariantValueIDs + '';
                }
                if (index % 2 == 0) {
                    if (allowOutStockPurchaseSetting.toLowerCase() == 'false') {
                        if (response.IsOutOfStock) {
                            Items = '<tr class="sfEven" id="tr_' + response.ItemID + '"><td class="cssClassWishItemChkbox"><input type="checkbox" id="' + response.WishItemID + '" class="cssClassWishItem" /></td><td class="cssClassWishItemDetails"><div class="cssClassImage"><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + response.AlternateText + '" title="' + response.AlternateText + '"/></div>';
                            Items += '<a href="' + href + '">' + response.ItemName + '</a>';
                            Items += '<span class="cssClassPrice cssClassFormatCurrency">' + (response.Price * rate).toFixed(2) + '</span></td><td><input type="hidden" name="hdnCostVariandValueIDS" value=' + cosVaraint + ' /><span>' + response.ItemCostVariantValue + '</span></td><td class="cssClassWishComment"><textarea maxlength="300" onkeyup="' + WishList.ismaxlength(this) + '" id="comment_' + response.WishItemID + '" class="comment">' + response.Comment + '</textarea></td><td class="cssClassWishDate">' + WishDate + '</td><td class="cssClassWishToCart">';
                            Items += "<div class='sfButtonwrapper cssClassOutOfStock'><a href=\"#\"><span>" + getLocale(AspxWishList, "Out Of Stock") + "</span></a></div></td>";
                            Items += "<td class='cssClassDelete'><img onclick='WishList.DeleteWishListItem(" + response.WishItemID + ")'src='" + AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/admin/btndelete.png'/></td></tr>";

                        } else {
                            Items = '<tr class="sfEven" id="tr_' + response.ItemID + '"><td class="cssClassWishItemChkbox"><input type="checkbox" id="' + response.WishItemID + '" class="cssClassWishItem" /></td><td class="cssClassWishItemDetails"><div class="cssClassImage"><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + response.AlternateText + '" title="' + response.AlternateText + '"/></div>';
                            Items += '<a href="' + href + '">' + response.ItemName + '</a>';
                            Items += '<span class="cssClassPrice cssClassFormatCurrency">' + (response.Price * rate).toFixed(2) + '</span></td><td><input type="hidden" name="hdnCostVariandValueIDS" value=' + cosVaraint + ' /><span>' + response.ItemCostVariantValue + '</span></td><td class="cssClassWishComment"><textarea maxlength="300" onkeyup="' + WishList.ismaxlength(this) + '" id="comment_' + response.WishItemID + '" class="comment">' + response.Comment + '</textarea></td><td class="cssClassWishDate">' + WishDate + '</td><td class="cssClassWishToCart">';
                            Items += "<div class='sfButtonwrapper'><a href='" + cartUrl + "' onclick='WishList.AddToCartToJS(" + response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 + ");'><span>" + getLocale(AspxWishList, "Add To Cart") + "</span></a></div></td>";
                            Items += "<td class='cssClassDelete'><img onclick='WishList.DeleteWishListItem(" + response.WishItemID + ")'src='" + AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/admin/btndelete.png'/></td></tr>";
                        }
                    } else {
                        Items = '<tr class="sfEven" id="tr_' + response.ItemID + '"><td class="cssClassWishItemChkbox"><input type="checkbox" id="' + response.WishItemID + '" class="cssClassWishItem" /></td><td class="cssClassWishItemDetails"><div class="cssClassImage"><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + response.AlternateText + '" title="' + response.AlternateText + '"/></div>';
                        Items += '<a href="' + href + '">' + response.ItemName + '</a>';
                        Items += '<span class="cssClassPrice cssClassFormatCurrency">' + (response.Price * rate).toFixed(2) + '</span></td><td><input type="hidden" name="hdnCostVariandValueIDS" value=' + cosVaraint + ' /><span>' + response.ItemCostVariantValue + '</span></td><td class="cssClassWishComment"><textarea maxlength="300" onkeyup="' + WishList.ismaxlength(this) + '" id="comment_' + response.WishItemID + '" class="comment">' + response.Comment + '</textarea></td><td class="cssClassWishDate">' + WishDate + '</td><td class="cssClassWishToCart">';
                        Items += "<div class='sfButtonwrapper'><a href='" + cartUrl + "' onclick='WishList.AddToCartToJS(" + response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 + ");'><span>" + getLocale(AspxWishList, "Add To Cart") + "</span></a></div></td>";
                        Items += "<td class='cssClassDelete'><img onclick='WishList.DeleteWishListItem(" + response.WishItemID + ")'src='" + AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/admin/btndelete.png'/></td></tr>";

                    }
                } else {
                    if (allowOutStockPurchaseSetting.toLowerCase() == 'false') {
                        if (response.IsOutOfStock) {
                            Items = '<tr class="sfOdd" id="tr_' + response.ItemID + '"><td class="cssClassWishItemChkbox"><input type="checkbox" id="' + response.WishItemID + '" class="cssClassWishItem" /></td><td class="cssClassWishItemDetails"><div class="cssClassImage"><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + response.AlternateText + '" title="' + response.AlternateText + '"/></div>';
                            Items += '<a href="' + href + '">' + response.ItemName + '</a>';
                            Items += '<span class="cssClassPrice cssClassFormatCurrency">' + (response.Price * rate).toFixed(2) + '</span></td><td><input type="hidden" name="hdnCostVariandValueIDS" value=' + cosVaraint + ' /><span>' + response.ItemCostVariantValue + '</span></td><td class="cssClassWishComment"><textarea maxlength="300" onkeyup="' + WishList.ismaxlength(this) + '" id="comment_' + response.WishItemID + '" class="comment">' + response.Comment + '</textarea></td><td class="cssClassWishDate">' + WishDate + '</td><td class="cssClassWishToCart">';
                            Items += "<div class='sfButtonwrapper cssClassOutOfStock'><a href=\"#\"><span>" + getLocale(AspxWishList, "Out Of Stock") + "</span></a></div></td>";
                            Items += "<td class='cssClassDelete'><img onclick='WishList.DeleteWishListItem(" + response.WishItemID + ")'src='" + AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/admin/btndelete.png'/></td></tr>";

                        } else {
                            Items = '<tr class="sfOdd" id="tr_' + response.ItemID + '"><td class="cssClassWishItemChkbox"><input type="checkbox" id="' + response.WishItemID + '" class="cssClassWishItem" /></td><td class="cssClassWishItemDetails"><div class="cssClassImage"><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + response.AlternateText + '" title="' + response.AlternateText + '"/></div>';
                            Items += '<a href="' + href + '">' + response.ItemName + '</a>';
                            Items += '<span class="cssClassPrice cssClassFormatCurrency">' + (response.Price * rate).toFixed(2) + '</span></td><td><input type="hidden" name="hdnCostVariandValueIDS" value=' + cosVaraint + ' /><span>' + response.ItemCostVariantValue + '</span></td><td class="cssClassWishComment"><textarea maxlength="300" onkeyup="' + WishList.ismaxlength(this) + '" id="comment_' + response.WishItemID + '" class="comment">' + response.Comment + '</textarea></td><td class="cssClassWishDate">' + WishDate + '</td><td class="cssClassWishToCart">';
                            Items += "<div class='sfButtonwrapper'><a href='" + cartUrl + "' onclick='WishList.AddToCartToJS(" + response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 + ");'><span>" + getLocale(AspxWishList, "Add To Cart") + "</span></a></div></td>";
                            Items += "<td class='cssClassDelete'><img onclick='WishList.DeleteWishListItem(" + response.WishItemID + ")'src='" + AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/admin/btndelete.png'/></td></tr>";
                        }
                    } else {
                        Items = '<tr class="sfOdd" id="tr_' + response.ItemID + '"><td class="cssClassWishItemChkbox"><input type="checkbox"  class="cssClassWishItem" /></td><td class="cssClassWishItemDetails"><div class="cssClassImage"><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '" alt="' + response.AlternateText + '" title="' + response.AlternateText + '"/></div>';
                        Items += '<a href="' + href + '">' + response.ItemName + '</a>';
                        Items += '<span class="cssClassPrice cssClassFormatCurrency">' + (response.Price * rate).toFixed(2) + '</span></td><td><input type="hidden" name="hdnCostVariandValueIDS" value=' + cosVaraint + ' /><span>' + response.ItemCostVariantValue + '</span></td><td class="cssClassWishComment"><textarea maxlength="300" onkeyup="' + WishList.ismaxlength(this) + '" id="comment_' + response.WishItemID + '" class="comment">' + response.Comment + '</textarea></td><td class="cssClassWishDate">' + WishDate + '</td><td class="cssClassWishToCart">';
                        Items += "<div class='sfButtonwrapper'><a href='" + cartUrl + "' onclick='WishList.AddToCartToJS(" + response.ItemID + "," + response.Price + "," + itemSKU + "," + 1 + ");'><span>" + getLocale(AspxWishList, "Add To Cart") + "</span></a></div></td>";
                        Items += "<td class='cssClassDelete'><img onclick='WishList.DeleteWishListItem(" + response.WishItemID + ")'src='" + AspxCommerce.utils.GetAspxTemplateFolderPath() + "/images/admin/btndelete.png'/></td></tr>";

                    }
                }
                $("#tblWishItemList>tbody").append(Items);
                $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                $(".tipsy").remove();
                $('.cssClassImage img[title]').tipsy({ gravity: 'n' });
                if (showImageInWishlistSetting.toLowerCase() == 'false') {
                    // $('.cssClassWishItemDetails>img').hide();
                    $('.cssClassWishItemDetails div').hide();
                }
                $(".comment").keypress(function(e) {
                    if (e.which == 35) {
                        return false;
                    }
                });

            },
            ismaxlength: function(obj) {
                var mlength = obj.getAttribute ? parseInt(obj.getAttribute("maxlength")) : "";
                if (obj.getAttribute && obj.value.length > mlength)
                    obj.value = obj.value.substring(0, mlength);
            },
            AddToCartToJS: function(itemId, itemPrice, itemSKU, itemQuantity) {
                AspxCommerce.RootFunction.AddToCartFromJS(itemId, itemPrice, itemSKU, itemQuantity);
            },
            ConfirmSingleDelete: function(id, event) {
                if (event) {
                    this.config.method = "AspxCommerceWebService.asmx/DeleteWishItem";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = JSON2.stringify({ wishItemID: id, aspxCommonObj: aspxCommonObj });
                    this.config.ajaxCallMode = WishList.BindWishItemSingleDelete;
                    this.ajaxCall(this.config);
                }
            },
            DeleteWishItem: function(itemId) {
                var properties = {
                    onComplete: function(e) {
                        WishList.ConfirmSingleDelete(itemId, e);
                    }
                };
                csscody.confirm("<h2>" + getLocale(AspxWishList, "Delete Confirmation") + "</h2><p>" + getLocale(AspxWishList, "Are you sure you want to delete wished item?") + "</p>", properties);
            },

            DeleteMultipleWishList: function(ids, event) {
                WishList.ConfirmDeleteWishItem(ids, event);

            },
            UpdateWishList: function() {
                var comment = '';
                var wishItemId = '';
                //$(".comment").each(function() {
                //  comment += $(this).val() + '#';
                //wishItemId += parseInt($(this).attr("id").replace( /[^0-9]/gi , '')) + '#';
                //costVariantIDs+= $("#hdnCostVariandValueIDS").val() + '#'; 
                // });
                $(".cssClassWishItemChkbox").find('input:checkbox:').each(function(i) {
                    if ($(this).attr('id') != 'chkHeading') {
                        if ($(this).attr("checked")) {
                            wishItemId += parseInt($(this).attr("id").replace( /[^0-9]/gi , '')) + '#';
                            comment += $(this).parents().parents().find('.comment').val() + '#';
                        }
                    }
                });
                if (wishItemId == "") {

                    csscody.alert('<h2>' + getLocale(AspxWishList, "Information Alert") + '</h2><p>' + getLocale(AspxWishList, "Please select at least one wish item to update.") + '</p>');
                    return false;
                }
                comment = comment.substring(0, comment.length - 1);
                wishItemId = wishItemId.substring(0, wishItemId.length - 1);
                //costVariantIDs = costVariantIDs.substring(0, itemId.length - 1);          
                this.config.method = "AspxCommerceWebService.asmx/UpdateWishList";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ wishItemID: wishItemId, comment: comment, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = WishList.GetUpdateWishListMsg;
                this.config.error = WishList.GetUpdateWishListErrorMsg;
                this.ajaxCall(this.config);

            },
            DeleteAllWishList: function() {
                this.config.method = "AspxCommerceWebService.asmx/ClearWishList";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = WishList.BindWishListOnClear;
                this.config.error = WishList.GetWishListClearErrorMsg;
                this.ajaxCall(this.config);
            },
            ClearWishList: function() {
                var properties = {
                    onComplete: function(e) {
                        if (e) {
                            WishList.DeleteAllWishList(e);
                        }
                    }
                };
                csscody.confirm("<h2>" + getLocale(AspxWishList, "Delete Confirmation") + "</h2><p>" + getLocale(AspxWishList, "Are you sure you want to clear wish list items?") + "</p>", properties);
            },
            DateDeserialize: function(content, format) {
                content = eval('new ' + content.replace( /[/]/gi , ''));
                return formatDate(content, format);
            },

            SendShareItemEmail: function() {
                var emailID = '';
                var message = '';
                var itemId = '';
                var arr = new Array;
                var elems = '';
                $('#tblWishItemList tbody tr').each(function() {
                    if ($(this).find('td input[type="checkbox"]').attr('checked') == true) {
                        itemId += $(this).attr("id").replace( /[^0-9]/gi , '') + ',';
                    }
                });
                itemId = itemId.substring(0, itemId.length - 1);
                emailID = $('#txtEmailID').val();
                message = $('#txtEmailMessage').val();
                var senderName = userFullName;
                var senderEmail = userEmailWishList;
                var receiverEmailID = emailID;
                var subject = "Take A Look At " + senderName + "'s " + " WishList";
                var msgbodyhtml = '';
                var msgCommenthtml = '';
                var serverHostLoc = 'http://' + serverLocation;
                var fullDate = new Date();
                var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
                if (twoDigitMonth.length == 2) {
                } else if (twoDigitMonth.length == 1) {
                    twoDigitMonth = '0' + twoDigitMonth;
                }
                var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
                var dateyear = fullDate.getFullYear();
                var trLength = $('#tblWishItemList tbody tr').length;
                var tdWishItemList = new Array();
                var wishlistItemInfo = {
                    itemInfo: {
                        src: '',
                        alt: '',
                        title: '',
                        price: '',
                        href: '',
                        hrefHtml: '',
                        htmlComment: ''
                    }
                };
                $('#tblWishItemList tbody tr').each(function() {
                    if ($(this).find('td input[type="checkbox"]').attr('checked')) {
                        wishlistItemInfo.itemInfo.src = $(this).find('td div.cssClassImage img').attr('src');
                        wishlistItemInfo.itemInfo.alt = $(this).find('td div.cssClassImage img').attr('alt');
                        wishlistItemInfo.itemInfo.title = $(this).find('td div.cssClassImage img').attr('alt');
                        wishlistItemInfo.itemInfo.price = $(this).find('td.cssClassWishItemDetails span').html();
                        wishlistItemInfo.itemInfo.href = $(this).find('td.cssClassWishItemDetails a').attr('href');
                        wishlistItemInfo.itemInfo.hrefHtml = $(this).find('td.cssClassWishItemDetails a').html();
                        wishlistItemInfo.itemInfo.htmlComment = $(this).find('td.cssClassWishComment textarea').val();
                        tdWishItemList.push(JSON2.stringify(wishlistItemInfo.itemInfo));
                    } else {
                        return true;
                    }
                });

                var data = "[" + tdWishItemList + "]";
                var wishlistObj = {
                    ItemID: itemId,
                    SenderName: senderName,
                    SenderEmail: senderEmail,
                    ReceiverEmail: receiverEmailID,
                    Subject: subject,
                    Message: message,
                    MessageBody: data
                };
                this.config.method = "AspxCommerceWebService.asmx/ShareWishListEmailSend";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, wishlistObj: wishlistObj });
                this.config.ajaxCallMode = WishList.OnSharingWishList;
                this.config.error = WishList.GetSendEmailErrorMsg;
                this.ajaxCall(this.config);
            },

            HideMessage: function() {
                $('.errorMessage').hide();
            },
            Init: function() {
                if (enableWishListSetting.toLowerCase() == 'true') {
                    $("#ddlWishListPageSize").html('');
                    var pagesize = '';
                        pagesize += "<option data-html-text='5' value='5'>" + 5 + "</option>";
                    pagesize += "<option data-html-text='10' value='10'>" + 10 + "</option>";
                    pagesize += "<option data-html-text='15' value='15'>" + 15 + "</option>";
                    pagesize += "<option data-html-text='20' value='20'>" + 20 + "</option>";
                    pagesize += "<option data-html-text='25' value='25'>" + 25 + "</option>";
                    pagesize += "<option data-html-text='40' value='40'>" + 40 + "</option>";
                    $("#ddlWishListPageSize").html(pagesize);
                    //$('#ddlWishListPageSize').MakeFancyItemDropDown();

//                    $.ajax({
//                        type: "POST",
//                        url: aspxservicePath + "AspxCommerceWebService.asmx/BindItemsSortByList",
//                        data: "{}",
//                        async: false,
//                        contentType: "application/json; charset=utf-8",
//                        dataType: "json",
//                        success: function(msg) {
//                            $("#ddlWishListSortBy").html('');
//                            $.each(msg.d, function(index, item) {
//                                var displayOptions = "<option data-html-text='" + item.OptionType + "' value=" + item.SortOptionTypeID + ">" + item.OptionType + "</option>";
//                                $("#ddlWishListSortBy").append(displayOptions);
//                            });
//                        }
//                    });
                    //    WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val());
                    $("#divWishItemsList").show();
                    $('#divWishListSort').show();
                    $('#wishitemBottom').show();
                    $('#divWishListPageNumber').show();
                    //$('.cssClassImage img[title]').tipsy({ gravity: 'n' });
                    $('.cssClassFormatCurrency').formatCurrency({ colorize: true, region: '' + region + '' });
                    //$('#ddlWishListSortBy').MakeFancyItemDropDown();

                    // for initial pagination
                    if (parseInt(arrayLength) > 0) {
                        var items_per_page = 5;
                        $('#Pagination').pagination(rowTotal, {
                        //  callback:'',
                            items_per_page: items_per_page,
                            //num_display_entries: 10,
                            current_page: currentPage,
                            callfunction: true,
                            function_name: { name: WishList.GetWishItemList, limit: 5, sortBy: 1 },
                            prev_text: "Prev",
                            next_text: "Next",
                            prev_show_always: false,
                            next_show_always: false
                        });
                        $('#divWishListPageNumber').show();
                    }
                    $("#ddlWishListPageSize").change(function() {
                        WishList.GetWishItemList(1, $("#ddlWishListPageSize").val(), 0, $("#ddlWishListSortBy option:selected").val());
                    });
                    $("#ddlWishListSortBy").change(function() {
                        var items_per_page = $('#ddlWishListPageSize').val();
                        var offset = 1;
                        WishList.GetWishItemList(offset, items_per_page, 0, $(this).val());
                    });
                    $("#divWishListContent").show();
                    $('.errorMessage').hide();
                    $('#divShareWishList').hide();
                    if (userFriendlyURL) {
                        $("#lnkContinueShopping").attr("href", '' + aspxRedirectPath + homeURL + pageExtension);
                    } else {
                        $("#lnkContinueShopping").attr("href", '' + aspxRedirectPath + homeURL);
                    }
                    $("#continueInStore").bind("click", function() {
                        if (userFriendlyURL) {
                            window.location.href = aspxRedirectPath + homeURL + pageExtension;
                        } else {
                            window.location.href = aspxRedirectPath + homeURL;
                        }
                        return false;
                    });
                    $('#shareWishList').bind("click", function() {
                        //  $('#divWishListContent').hide();
                        $('#divShareWishList').show();
                        WishList.HideMessage();
                        //WishList.ClearShareWishItemForm();
                        var wishChecked = false;
                        $('#tblWishItemList tbody tr').each(function() {
                            if ($(this).find('td input[type="checkbox"]').attr('checked')) {
                                wishChecked = true;
                                return true;
                            }
                        });
                        if (wishChecked == true) {
                            ShowPopupControl('popuprel5');
                        } else {
                            csscody.alert("<h2>" + getLocale(AspxWishList, "Information Alert") + "</h2><p>" + getLocale(AspxWishList, "Please select at least one item.") + "</p>");
                        }
                    });

                    $(".cssClassClose").bind("click", function() {
                        $('#fade, #popuprel5').fadeOut();
                        //  WishList.ClearShareWishItemForm();
                    });

                    $('#btnShareWishItem').bind("click", function() {
                        var emailIDsColln = $('#txtEmailID').val();
                        if (WishList.validateMultipleEmailsCommaSeparated(emailIDsColln)) {
                            WishList.SendShareItemEmail();
                        } else {
                            // alert('Eener Valid email with comma separated');
                            $('.errorMessage').show();
                        }
                    });
                    $("#btnDeletedMultiple").click(function() {
                        var wishItemIds = '';
                        $(".cssClassWishItemChkbox").find('input:checkbox:').each(function(i) {

                            if ($(this).attr('id') != 'chkHeading') {
                                if ($(this).attr("checked")) {
                                    wishItemIds += $(this).attr('id') + ',';
                                }
                            }
                        });
                        if (wishItemIds == "") {
                            csscody.alert('<h2>' + getLocale(AspxWishList, "Information Alert") + '</h2><p>' + getLocale(AspxWishList, "Please select at least one wish item to delete.") + '</p>');
                            return false;
                        }
                        var properties = {
                            onComplete: function(e) {
                                WishList.DeleteMultipleWishList(wishItemIds, e);
                            }
                        };
                        csscody.confirm("<h2>" + getLocale(AspxWishList, "Delete Confirmation") + "</h2><p>" + getLocale(AspxWishList, "Are you sure you want to delete selected wished items?") + "</p>", properties);
                    });
                    $("#chkHeading").live('change', function() {
                        if ($(this).attr("checked")) {
                            $('#tblWishItemList tbody tr').each(function() {
                                $(this).find('td input[type="checkbox"]').attr('checked', 'checked');
                            });
                        } else {
                            $('#tblWishItemList tbody tr').each(function() {
                                $(this).find('td input[type="checkbox"]').removeAttr('checked');
                            });
                        }
                    });

                    $('#tblWishItemList tbody tr').find(".cssClassWishItemChkbox").live('change', function() {
                        var totalitems = $('#tblWishItemList tbody tr').find('td input[type="checkbox"]').length;
                        var matchedcount = 0;
                        $('#tblWishItemList tbody tr').find('td input[type="checkbox"]').each(function() {

                            if ($(this).attr('checked'))
                                matchedcount++;

                        });
                        if (matchedcount == totalitems) {
                            $("#chkHeading").attr('checked', 'checked');
                        } else {
                            $("#chkHeading").removeAttr('checked');
                        }
                    });
                } else {
                    csscody.alert('<h2>' + getLocale(AspxWishList, "Information Alert") + '</h2><p>' + getLocale(AspxWishList, "WishList is not enabled.") + '</p>');
                }
            }
        };
        WishList.Init();
    });
	//]]> 
</script>

<div id="divWishListSort" class="sort" style="display:none">
   <%--<span class="sfLocale">Sort by:</span> 
    <select id="ddlWishListSortBy" class="sfListmenu">
        <option value=""></option>
    </select>--%>
    <asp:Literal ID="ltrWishListSortBy" runat="server" EnableViewState="False"></asp:Literal>
</div>
<div id="divWishListContent" class="sfFormwrapper cssClassWishListDash">
    <div class="cssClassCommonCenterBox">
        <h2>
            <label id="lblMyWishListTitle" class="cssClassWishItem sfLocale">My WishList Content</label></h2>
        <div class="cssClassCommonCenterBoxTable">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="tblWishItemList"
                class="cssClassMyWishItemTable">
                <asp:Literal ID="ltrWishList" runat="server" EnableViewState="False"></asp:Literal>
            </table>           
        </div>
            <div class="sfButtonwrapper" id="wishitemBottom" style="display: none">
                <asp:Literal ID="ltrWishListButon" runat="server" EnableViewState="False"></asp:Literal>
            </div>
    </div>
</div>
<div class="cssClassClear"></div>
<div class="cssClassPageNumber cssDashPageNumber" id="divWishListPageNumber" style="display:none">
        <div id="Pagination">
        </div>
        <div class="cssClassViewPerPage">
           <%--  <span class="sfLocale">View Per Page: </span>
               <select id="ddlWishListPageSize" class="sfListmenu">
                    <option value=""></option>
                </select>--%>
                <asp:Literal ID="ltrWishListPagination" runat="server" EnableViewState="False"></asp:Literal>
        </div>

    <div class="clear">
    </div>
</div>
<div class="popupbox" id="popuprel5">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <h2>
        <label id="lblWishHeading" class="cssClassWishItem sfLocale">Share Your WishList</label>
    </h2>
    <div id="divShareWishList" class="sfFormwrapper">
        <div class="cssClassCommonCenterBox">
            <div class="cssClassPopUpHeading">
                <h3>
                    <label id="lblShareHeading" class="cssClassLabel sfLocale">Sharing Information</label>
                </h3>
            </div>
            <div class="cssClassCommonCenterBoxTable">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" id="tblShareWishList"
                    class="cssClassMyWishItemTable">
                    <tbody>
                        <tr>
                            <td>
                                <ul>
                                    <li>
                                        <label id="lblEmailHeading" class="sfLocale">Email addresses, separated by commas</label>
                                        <span class="cssClassRequired">*</span>
                                        <br />
                                        <textarea id="txtEmailID" name="receiveremailIDs" class="required" rows="5"
                                            cols="60" onclick="WishList.HideMessage();"></textarea>
                                        <br />
                                        <p class="errorMessage">
                                            <swishitemBottompan class="cssClassRequired sfLocale">Enter Valid EmailID with comma separated</span></p>
                                    </li>
                                    <li>
                                        <label id="lblEmailMessage" class="sfLocale">Message</label><br />
                                        <textarea id="txtEmailMessage" class="emailMessage" rows="5" cols="60" name="emailMessage"></textarea>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="sfButtonwrapper">
                    <%--<button type="button" id="btnShareWishBack" >
                    <span><span>Back</span></span></button>--%>
                    <button type="button" id="btnShareWishItem">
                        <span><span class="sfLocale">Share WishList</span></span></button>
                </div>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="hdnWishItem" />
