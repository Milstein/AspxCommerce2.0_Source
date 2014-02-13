<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MyCart.ascx.cs"  Inherits="MyCart" %>

<script type="text/javascript">

    //<![CDATA[
    var showItemImagesOnCartSetting = '<%=ShowItemImagesOnCart%>';
    var allowOutStockPurchaseSetting = '<%=AllowOutStockPurchase %>';
    var minCartSubTotalAmountSetting = '<%=MinCartSubTotalAmount%>';
    var allowMultipleAddShippingSetting = '<%=AllowMultipleAddShipping%>';
    var noImageMyCartPathSetting = '<%=NoImageMyCartPath %>';
    var MultipleAddressChkOutURL = '<%=MultipleAddressChkOutURL %>';
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxCartLocale
        });
    });
    //]]>
</script>

<%--<input type="button" id="btnSubmit" value="Pay through PayPal" />--%>
<div class="cssClassCartInformation cssClassCartTotal" id="divMyCart">
    <div class="cssClassBlueBtnWrapper" style="display: none">
        <div class="cssClassBlueBtn">
            <a id="lnkProceedToSingleCheckout" href="#"><span class="sfLocale">Proceed to Checkout</span></a>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
    <div class="cssClassCartInformationDetails" id="divCartDetails">
        <asp:Literal runat="server" ID="ltCartItems" EnableViewState="False" ></asp:Literal>
    </div>
    <table class="cssClassSubTotalAmount" style="display: none">
        <tbody>
            <tr>
                <td class="cssClassGrandsubtotal">
                    <strong class="sfLocale">Grand Sub Total:</strong>
                </td>
                <td>
                    <input type="text" class="total-box cssClassFormatCurrency" autocomplete="off" value="" id="product-subtotal"
                        readonly="readonly" />
                </td>
            </tr>
            <tr>
                <td class="cssClassCartDiscount">
                    <strong class="sfLocale">Cart Discount:</strong>
                </td>
                <td>
                    <span class="cssClassNegative">-</span>
                    <input type="text" class="cssClassFormatCurrency sfLocale" autocomplete="off" id="txtDiscountAmount" readonly="readonly" 
                        value="0.00" />
                </td>
            </tr>
            <tr id="trDiscountReward" style="display: none;">
                <td class="cssClassCartDiscount">
                    <strong class="sfLocale">Discount (RewardPoints):</strong>
                </td>
                <td>
                    <span class="cssClassNegative">-</span>
                    <input type="text" class="cssClassFormatCurrency sfLocale" autocomplete="off" id="txtRewardAmount" readonly="readonly"
                        value="0.00" />
                </td>
            </tr>
            <tr id="trCouponDiscount" style="display: none">
                <td>
                    <strong class="sfLocale">Coupon Discount:</strong>
                </td>
                <td>
                    <span class="cssClassNegative">-</span>
                    <input type="text" class="cssClassFormatCurrency sfLocale"  autocomplete="off" id="txtCouponDiscountAmount" readonly="readonly"
                        value="0.00" />
                </td>
            </tr>
            <tr>
                <td class="cssClassSubTotalAmountWidth">
                    <strong class="sfLocale">Grand Total:</strong>
                </td>
                <td class="cssClassGrandTotalAmountWidth">
                    <input type="text" readonly="readonly" autocomplete="off" class="cssClassFormatCurrency" id="txtTotalCost"
                        value="0" />
                </td>
            </tr>
            <%--  <tr>
                <td>
                    <strong>Total Tax:</strong>
                </td>
                <td>
                    <input type="text" class="tax-box cssClassFormatCurrency" id="txtTotalTax" readonly="readonly"
                        value="0.00" />
                </td>
            </tr>--%>
        </tbody>
    </table>
    <div class="cssClassLeftRightBtn" style="display: none">
        <div class="cssClassCartInformation">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="noborder">
                <tbody>
                    <tr class="cssClassHeadeTitle sfEven cssClasscarttotal">
                        <td>
                            <div class="cssClassCouponHelp" style="display: none">
                                <h3>
                                    <span class="cssClassRequired ">*</span><span class="sfLocale">Coupon amount is applied to your cart after you click the apply button. You can check your coupon code in your mail!</span></h3>             
                            </div>
                            <div class="cssClassapplycoupon" style="display: none">
                                <!--        <h3 class="sfLocale">Enter the Coupon Code if you have one:</h3>-->
                                <input type="text" id="txtCouponCode" />
                                <div class="sfButtonwrapper">
                                    <div class="sfBtn">
                                        <a href="#"><span id="btnSubmitCouponCode" class="sfLocale">Apply Coupon</span></a>
                                    </div>
                                </div>
                                <div class="cssClassClear">
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="dvRewardPointsMain" class="cssClassdvRewardPointsMain" style="display: none;
        float: left;">
        <input type="hidden" id="hdnRewardRate" value="0" />
        <input type="hidden" id="hdnRate" value="0" />
        <input type="hidden" id="hdnTotalRewardAmount" value="0" />
        <input type="hidden" id="hdnTotalRewardPoints" value="0" />
        <input type="hidden" id="hdnMinRedeemBalance" value="0" />
        <input type="hidden" id="hdnCapped" value="0" />
        <div id="dvRPMainHeading" class="cssClassdvRPMainHeading">
            <span class="cssClassRPMainHeading"><b class="sfLocale">Reward Points : </b></span>
        </div>
        <br />
        <div id="dvRPBalance" class="cssClassdvRPBalance">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="noborder">
                <tr>
                    <td colspan="2">
                        <b class="sfLocale">Current Balance : </b>
                    </td>
                </tr>
                <tr>
                    <td class="sfLocale">
                        Total Reward Points :
                    </td>
                    <td class="sfLocale">
                        <span id="spanTotalRP" class="cssClassspanTotalRP">0</span>
                    </td>
                </tr>
                <tr>
                    <td class="sfLocale">
                        Total Reward Amount :
                    </td>
                    <td>
                        <span id="spanTotalRA" class="cssClassspanTotalRA cssClassFormatCurrency">0</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                       <b><span class="sfLocale">(Rate: </span></b><span id="spanRPExchangePoints" class="cssClassspanRPExchangePoints">0</span>
                        <span class="sfLocale">Points =  </span><span id="spanRPExchangeAmount" class="cssClassspanRPExchangeAmount cssClassFormatCurrency">
                            0</span><b>)</b>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <br />
                        <b class="sfLocale">Choose Number of Points to Redeem</b>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="divRange" style="display: none">
                            <div id="slider-range">
                            </div>
                        </div>
                    </td>
                    <td>
                        <div id="dvUsePoints" class="sfBtn" style="display: none">
                            <button type="button" id="btnUsePoints">
                                <span><span class="sfLocale">GO</span></span></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;" colspan="2">
                        <input type="checkbox" id="chkUseRewardPoints" class="cssClasschkUseRewardPoints" />
                        <span class="sfLocale">Use Maximum</span>
                    </td>  
                </tr>
            </table>
        </div>
        <br />
        <div id="dvRPCurrent" class="cssClassdvRPCurrent" style="display: none;">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="noborder">
                <tbody>
                    <tr>
                        <td colspan="2">
                            <span id="spanHeading" class="cssClassspanHeading"><b class="sfLocale">You will be awarded...</b>
                            </span>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td class="cssClassTDDetails">
                            <ul id="ulRewardDetails">
                            </ul>
                        </td>
                        <td class="cssClassTDDetails" style="font-weight: bold; text-align: right;">
                            <ul id="ulRewardSub">
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right;">
                            <span></span><b class="sfLocale">Total :</b>
                        </td>
                        <td class="cssClassTDDetails" style="font-weight: bold; text-align: right;">
                            <div>
                                <hr />
                            </div>
                            <div id="dvPointsTotal" class="cssClassdvPointsTotal">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">  
                            <span class="cssClassspanHeading"><b class="sfLocale">Note: </b>&nbsp;<span class="sfLocale">You can use these points for your next purchase.</span>
                                </span>
                            <br />
                            <span class="cssClassspanHeading sfLocale">Your rewarded points should be minimum</span>&nbsp<b><span
                                id="spanCapped">0</span></b>&nbsp;<span class="sfLocale">to add in your account</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="cssClassBlueBtnWrapper" style="display: none">
        <div class="cssClassBlueBtn">
            <a id="lnkProceedToSingleChkout" href="#"><span class="sfLocale">Proceed to Checkout</span>
            </a>
        </div>
        <div class="sfButtonwrapper">
            <div class="sfBtn ">
                <button type="button" id="lnkContinueShopping">
                    <span><span class="sfLocale">Continue Shopping</span></span></button>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <div class="sfBtn">
                <%-- <a href="#"><span id="btnUpdateShoppingCart">Update Shopping Cart</span></a>--%>
                <button type="button" id="btnUpdateShoppingCart">
                    <span><span class="sfLocale">Update Shopping Cart</span></span></button>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <div class="sfBtn">
                <%-- <a href="#"><span id="btnClear">Clear Cart Items</span></a>--%>
                <button type="button" id="btnClear">
                    <span><span class="sfLocale">Clear Cart</span></span></button>
            </div>
        </div>
        <%--   <div class="cssClassBlueBtn" id="divCheckOutMultiple">
            <a id="lnkProceedToMultiCheckout" href="#" onclick='SetSession();'><span>Checkout With Multiple Address</span>
            </a>
        </div>--%>
        <div class="cssClassClear">
        </div>
    </div>
    <div class="cssClassBlueBtnWrapper" style="display: none">
        <div class="cssClassBlueBtn" id="divCheckOutMultiple" style="display: none">
            <a id="lnkProceedToMultipleChkout" href="#"><span class="sfLocale">Checkout with Multiple Addresses</span>
                </a>
        </div>
    </div>
</div>
