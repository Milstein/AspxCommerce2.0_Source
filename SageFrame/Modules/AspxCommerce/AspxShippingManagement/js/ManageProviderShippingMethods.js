$(function() {
    var provider = function() {
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
        var $init = function() {
            $bindFuntionToControl();
        };

        var $bindFuntionToControl = function() {

        };
        var $getAllShippingMethodsbyProvider = function(providerId) {
            
        };

        var $deleteShippingMethod = function() {
            
        };

        var $getProviderDynamicInfo = function(providerId) {
            
        };

        var $getRemainingShippingMethodsofProvider = function() {

        };

        $init();

    }();
});