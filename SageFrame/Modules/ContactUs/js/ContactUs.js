(function($) {
    $.feedbackTab = function(p) {
        p = $.extend
        ({
            PortalID: 1,
            ContactUsPath: '',
            UserName: '',
            subject: '',
            emailSucessMsg: ''
        }, p);
        var feedbackTab = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: p.ContactUsPath + 'Services/ContactUsWebService.asmx/',
                method: "",
                ModulePath: '',
                PortalID: p.PortalID,
                UserName: p.UserName,
                subject: p.subject,
                emailSucessMsg: p.emailSucessMsg
            },
            vars: {
                speed: 300,
                containerWidth: $('.feedback-panel').outerWidth(),
                containerHeight: $('.feedback-panel').outerHeight(),
                tabWidth: $('.feedback-tab').outerWidth()
            },
            ContactUsSaveAndSendEmail: function(name, email, subject, message) {
                var param = JSON2.stringify({ name: name, email: email, subject: subject, message: message, isActive: true, portalID: feedbackTab.config.PortalID, addedBy: feedbackTab.config.UserName });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "ContactUsAddAndSendEmail",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {
                        feedbackTab.ClearForm();
                        $('a.feedback-tab').click();
                        jAlert(feedbackTab.config.emailSucessMsg);
                    },
                    error: function() {
                        alert('error');
                    }
                });
            },
            ClearForm: function() {
                $("#txtName").val('');
                $("#txtContactEmail").val('');
                $("#txtMessage").val('');
                $('.Required').remove();
                $('.invalid').remove();
            },
            init: function() {
                $('.feedback-panel').css('height', feedbackTab.vars.containerHeight + 'px');

                $('a.feedback-tab').live('click', function(event) {
                    if ($('.feedback-panel').hasClass('open')) {
                        $('.feedback-panel')
                .animate({ left: '-' + feedbackTab.vars.containerWidth }, feedbackTab.vars.speed)
                .removeClass('open');
                    } else {
                        $('.feedback-panel')
                .animate({ left: '0' }, feedbackTab.vars.speed)
                .addClass('open');
                    }
                    event.preventDefault();
                });
                $("#btnSubmit").die().live("click", function(event) {
                    var valid = feedbackTab.Validate();                    
                    var name = $("#txtName").val();
                    var email = $("#txtContactEmail").val();
                    var message = $("#txtMessage").val();
                    if (valid) {
                        feedbackTab.ContactUsSaveAndSendEmail(name, email, feedbackTab.config.subject, message);
                    }
                });
                $("#btnReset").live('click', function() {
                    feedbackTab.ClearForm();              
                });
            },
            Validate: function() {
                var name = $("#txtName").val();
                var email = $("#txtContactEmail").val();
                var message = $("#txtMessage").val();
                var required = '<span class="Required">*</span>';
                var invalidEmail = '<span class="invalid">'+GetSystemLocale('Invalid Email')+'</span>';

                if (name.length == 0) {
                    if ($("#txtName").parent().next().find('.Required').length == 0) {
                        $("#txtName").parent().next().append(required);
                    }
                }
                else {
                    $("#txtName").parent().next().find('.Required').remove();
                }
                if (message.length == 0) {
                    if ($("#txtMessage").parent().next().find('.Required').length == 0) {
                        $("#txtMessage").parent().next().append(required);
                    }
                }
                else {
                    $("#txtMessage").parent().next().find('.Required').remove();
                }
                if (email.length == 0) {
                    if ($("#txtContactEmail").parent().next().find('.Required').length == 0) {
                        $("#txtContactEmail").parent().next().append(required);
                    }
                }
                else {
                    $("#txtContactEmail").parent().next().find('.Required').remove();
                    var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
                    if (!email_check.test(email)) {
                        if ($("#txtContactEmail").parent().next().find('.invalid').length == 0) {
                            $("#txtContactEmail").parent().next().append(invalidEmail);
                        }
                        return false;
                    }
                    else {
                        $("#txtContactEmail").parent().next().find('.invalid').remove();
                    }
                }
                if ($('.feedback-panel').find('.Required').length > 0) {
                    return false;
                }
                return true;
            }
        };
        feedbackTab.init();
    };
    $.fn.feedback = function(p) {
        $.feedbackTab(p);
    };
})(jQuery);