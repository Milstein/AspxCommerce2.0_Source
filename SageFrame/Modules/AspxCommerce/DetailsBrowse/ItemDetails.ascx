<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ItemDetails.ascx.cs" Inherits="Modules_AspxDetails__AspxItemDetails_ItemDetails " %>

<script type="text/javascript">
    var __st_loadLate = true; //if __st_loadLate is defined then the widget will not load on domcontent ready
</script>

<script type="text/javascript">    var switchTo5x = false;</script>

<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>

<script type="text/javascript">    stLight.options({ publisher: '938d4fda-409f-4c0b-b300-33191719abed' });</script>

<script type="text/javascript">
    //<![CDATA[
    var UserModuleID = "<%=UserModuleID %>";
    var userEmail = "<%=userEmail %>";
    var itemID = "<%=itemID %>";
    var itemNamePageBehind = "<%=itemName%>";
    var itemSKU = "<%=itemSKU%>";
    var aspxFilePath = "<%=aspxfilePath%>";
    var maxCompareItemCount = '<%=maxCompareItemCount%>';
    var allowOutStockPurchase = '<%=allowOutStockPurchase %>';
    var allowMultipleReviewPerIP = '<%=allowMultipleReviewPerIP %>';
    var allowMultipleReviewPerUser = '<%=allowMultipleReviewPerUser %>';
    var allowAnonymousReviewRate = '<%=allowAnonymousReviewRate %>';
    var enableEmailFriend = '<%=enableEmailFriend %>';
    var allowCompareItemDetail = '<%=allowCompareItemDetail %>';
    var allowWishListItemDetail = '<%=allowWishListItemDetail %>';
    var noItemDetailImagePath = '<%=noItemDetailImagePath %>';
    var relatedItemsCount = '<%=relatedItemsCount%>';
    var variantQuery = '<%=variantQuery%>';
    var lblListPrice = '<%=lblListPrice.ClientID%>';
    var art = '<%=AvarageRating %>';
    var trc = '<%=RatingCount %>';
    var itemTypeId = '<%=itemTypeId %>';
    $(function() {
        $(".sfLocale").localize({
            moduleKey: DetailsBrowse
        });
    });
    //]]>
</script>

<div class="cssClassCommonWrapper" id="itemDetails">
    <div class="cssClassProductInformation" style="display: none">
        <div class="cssClassProductImage">
            <div class="cssClassProductBigPicture">
                <div class="targetarea">
                </div>
                <div class="multizoom1 thumbs jcarousel-skin">
                </div>
            </div>
            <div class="sfFloatLeft">
                <div class="cssClassItemRating">
                    <div>
                        <div class="sfSocialShare">
                            <span class='st_facebook_hcount' displaytext='Facebook'></span><span class='st_twitter_hcount'
                                displaytext='Tweet'></span><span class='st_linkedin_hcount' displaytext='LinkedIn'>
                            </span><span class='st_sharethis_hcount' displaytext='ShareThis'></span>
                        </div>
                    </div>
                    <div>
                        <div class="cssClassItemRatingBox cssClassToolTip">
                            <div class="cssClassRatingStar">
                                <%--                                <table cellspacing="0" cellpadding="0" width="100%" border="0" id="tblAverageRating">
                                    <tr>
                                        <td class="">
                                        </td>
                                    </tr>
                                </table>--%>
                                <asp:Literal ID="ltrRatings" runat="server" EnableViewState="false"></asp:Literal>
                            </div>
                            <span class="cssClassRatingTitle"></span>
                            <%-- For detail star rating info --%>
                            <%--                            <div class="cssClassToolTipInfo">
                            </div>--%>
                            <asp:Literal ID="ltrratingDetails" runat="server" EnableViewState="false"></asp:Literal>
                            <div class="cssClassClear">
                            </div>
                        </div>
                        <span class="cssClassTotalReviews"></span>
                        <%--<a href="#">Popup goes her to show add new review</a>--%>
                        <a href="#" rel="popuprel2" class="popupAddReview" value=""><span class="cssClassAddYourReview">
                        </span></a>
                    </div>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
            <div class="cssClassItemQuickOverview" style="display: none">
                <h2>
                    <asp:Label ID="lblQuickOverview" Text="Quick Overview :" runat="server" meta:resourcekey="lblQuickOverviewResource1" />
                </h2>
                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="tdpadding">
                    <tbody>
                        <tr class="cssClassItemOverviewContent">
                            <td id="divItemShortDesc">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%--  <div class="cssClassReadMore" id="divReadMore">
                    <span>Read More</span></div>
                <div class="cssClassReadMore" id="divReadLess">
                    <span>Read Less</span></div>--%>
            </div>
        </div>
        <div class="cssClassProductPictureDetails">
            <div class="cssClassLeftSide">
                
                <%-- <li class="cssClassItems">
                    <asp:Label ID="lblSKU" runat="server" Text="SKU: " meta:resourcekey="lblSKUResource1"></asp:Label>
                  <span id="spanSKU"></span></li>--%>
                <br />
                <h1>
                    <%--<asp:Label ID="lblItemTitle" runat="server" Text="Item Name: " meta:resourcekey="lblItemTitleResource1"></asp:Label>--%>
                    <span id="spanItemName"></span>
                </h1>
                <div class="cssViewer">
                    <span class="cssClassView sfLocale">View</span><span id="viewCount"></span></div>
                <div class="cssClassAvailiability">
                    <asp:Label ID="lblAvailability" runat="server" Text="Availability: " meta:resourcekey="lblAvailabilityResource1"></asp:Label>
                    <span id="spanAvailability"></span>
                </div>
                
                <div class="cssItemCategories" style="display: none">
                    <span class="cssClassItemCategoriesHeading sfLocale">In categories:<span>&nbsp</span></span>
                     <span class="cssClassCategoriesName"></span>
                </div>  <div class="cssClassClear">
                </div>
                <div id="Notify" style="display: none">
                    <div class="sfButtonwrapper">
                        <input type="text" name="notify" value="Enter your email here..." id="txtNotifiy" />
                        <button id="btnNotify" type="button">
                            <span><span class="sfLocale">Notify Me</span></span></button>
                    </div>
                </div>
                <div id="divCostVariant">
                </div></br></br>
                <span class="cssClassProductRealPrice">
                    <asp:Label ID="lblPrice" runat="server" Text=""></asp:Label>
                    <span id="spanPrice" class="cssClassFormatCurrency"></span>
                    <br />
                </span><span class="cssClassProductOffPrice">
                    <asp:Label ID="lblListPrice" runat="server" Text=""></asp:Label>
                    <span id="spanListPrice" class="cssClassFormatCurrency"></span></span><span id="bulkDiscount"
                        class="cssClassBulkDiscount sfLocale">(Bulk Discount available)</span>
                <div class="cssClassClear">
                </div>
                <span class="cssClassYouSave">
                    <asp:Label ID="lblSaving" runat="server" Text="You save: " meta:resourcekey="lblSavingResource1"></asp:Label>
                    <span id="spanSaving"></span></span>
                    <div class='popbox'>
                    <a class='open sfLocale' href='#'>Price History</a>
                    <div class='collapse'>
                        <div class='box'>
                            <div class='arrow'>
                            </div>
                            <div class='arrow-border'>
                            </div>
                            <div class='classPriceHistory'>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="cssClassClear">
                </div>
                <%--<li class="cssClassRating">
                        <asp:Label ID="lblRating" runat="server" Text="Rating Summary : "></asp:Label>
                        <span id="spanRating"></span></li>--%>
                <div class="cssClassDwnWrapper">
                    <div id="divQtyDiscount">
                        <%--                    <p class="sfLocale">
                        Item Quantity Discount:</p>
                    <div class="cssClassCommonGrid">--%>
                        <%--<table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassQtyDiscount"
                            id="itemQtyDiscount">
                            <thead>
                                <tr class="cssClassHeadeTitle">
                                    <th class="sfLocale">
                                        Quantity (more than)
                                    </th>
                                    <th class="sfLocale">
                                        Price Per Unit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                </tr>
                            </tbody>
                        </table>--%>
                        <asp:Literal ID="litQtyDiscount" runat="server" EnableViewState="false"></asp:Literal>
                        <%-- </div>--%>
                    </div>
                    <div class="cssClassDownload cssClassRight" id="dwnlDiv">
                        <asp:Label ID="lblDownloadTitle" runat="server" Text="Sample Item Download: " meta:resourcekey="lblDownloadTitleResource1"></asp:Label>
                        <span id="spanDownloadLink" class="cssClassLink"></span>
                    </div>
                    <h2>
                        <span id="spnShowAvailability"></span>
                    </h2>
                </div>
                <div class="cssClassClear">
                </div>
                <div class="detailButtonWrapper">
                    <div>
                        <span class="cssClssQTY">
                            <asp:Label ID="lblQty" runat="server" Text="Qty: " meta:resourcekey="lblQtyResource1"></asp:Label>
                            <input type="text" id="txtQty" /><label id='lblNotification' style="color: #FF0000;"></label>
                        </span>
                    </div>
                    <div class="sfButtonwrapper">
                        <button class="sfBtn" id="btnAddToMyCart" type="button" onclick="ItemDetail.AddToMyCart();">
                            <span><span class="sfLocale">Add to Cart</span></span></button>
                        <button id="addWishListThis" type="button" class="sfBtn1">
                            <span class="sfLocale">Add to Wishlist</span></button>
                        <div id="addCompareListThis" class="cssClassCompareButton">
                        </div>
                    </div>
                    <div class="sfFloatRight" style="margin: 10px 0 10px 0;">
                        <a href="#" class="sfAnchor"></a><a href="#" id="lnkContinueShopping" class="sfAnchor">
                            <span class="sfLocale">Continue Shopping </span><span>&nbsp|&nbsp</span></a>
                        <div id="divEmailAFriend" style="display: inline">
                            <a href="#" rel="popuprel" class="popupEmailAFriend sfAnchor"><span class="sfLocale">
                                Email a Friend</span><span>&nbsp|&nbsp</span> </a>
                        </div>
                        <div id="divPrintPage" style="display: inline">
                            <a href="javascript:window.print()" class="sfAnchor"><span class="sfLocale">Print This Page</span></a> 
                        </div>
                        <div class="cssClassClear">
                        </div>
                    </div>
                </div>
                <div class="itemBrand">
                </div>
            </div>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<div class="cssClassProductDetailInformation">
    <%--    <div id="dynItemDetailsForm" class="sfFormwrapper">
    </div>--%>
    <asp:Literal ID="ltrItemDetailsForm" runat="server" EnableViewState="false"></asp:Literal>
</div>
<%--<div class="cssClassProductDetailInformation cssClassYouMayAlsoLike" style="display: none">
    <h1>
        <asp:Label ID="lblYouMayAlsoLike" Text="You may also like :" runat="server" meta:resourcekey="lblYouMayAlsoLikeResource1" />
    </h1>
    <div class="cssClassYouMayAlsoLikeWrapper" id="divYouMayAlsoLike">
    </div>
</div>--%>
<div id="controlload">
</div>
<div class="popupbox" id="popuprel2">
    <div class="cssClassCloseIcon">
        <button type="button" class="cssClassClose">
            <span class="sfLocale">Close</span></button>
    </div>
    <h2>
        <asp:Label ID="lblWriteReview" runat="server" Text="Write Your Own Review" meta:resourcekey="lblWriteReviewResource1"></asp:Label>
    </h2>
    <div class="sfFormwrapper">
        <%--<div class="cssClassReviewInfos"> Submit a review now and earn 15 reward points once the review is approved. <a href="#"> Learn more...</a></div>
      <div class="cssClassReviewInfos">Applies only to registered customers, may vary when logged in.</div>
      --%>
        <div class="cssClassPopUpHeading">
            <h3>
                <label id="lblYourReviewing">
                </label>
            </h3>
        </div>
        <asp:Label ID="lblHowToRate" runat="server" Text="How do you rate this item?" meta:resourcekey="lblHowToRateResource1"></asp:Label>
        <table cellspacing="0" cellpadding="0" width="100%" border="0" id="tblRatingCriteria">
            <tr>
                <td>
                </td>
            </tr>
        </table>
        <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
                <td>
                    <label class="cssClassLabel sfLocale">
                        Nickname:</label><span class="cssClassRequired">*</span>
                </td>
                <td>
                    <input type="text" id="txtUserName" name="name" class="required" minlength="2" />
                </td>
            </tr>
            <tr>
                <td>
                    <label class="cssClassLabel sfLocale">
                        Summary Of Review:</label><span class="cssClassRequired">*</span>
                </td>
                <td>
                    <input type="text" id="txtSummaryReview" name="summary" class="required" minlength="2" />
                </td>
            </tr>
            <tr>
                <td>
                    <label class="cssClassLabel sfLocale">
                        Review:</label><span class="cssClassRequired">*</span>
                </td>
                <td>
                    <textarea id="txtReview" cols="50" rows="10" name="review" class="cssClassTextarea required"
                        maxlength="300"></textarea>
                </td>
            </tr>
        </table>
        <div class="sfButtonwrapper cssClassWriteaReview">
            <%-- <input  type="submit" value="Submit" id="btnSubmitReview"/>--%>
            <button type="submit" id="btnSubmitReview">
                <span><span class="sfLocale">Submit Review</span></span></button>
        </div>
    </div>
</div>
<input type="hidden" id="hdnPrice" />
<input type="hidden" id="hdnWeight" />
<input type="hidden" id="hdnQuantity" />
<input type="hidden" id="hdnListPrice" />
<input type="hidden" id="hdnTaxRateValue" />