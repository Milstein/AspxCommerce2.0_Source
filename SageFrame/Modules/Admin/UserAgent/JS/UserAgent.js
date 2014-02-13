(function($) {
    $.createUserAgent = function(p) {
        p = $.extend
                ({
                    PortalID: '',
                    UserModuleID: '',
                    UserName: ''
                }, p);
        var UserAgentControl = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: SageFrameAppPath + "/Modules/Admin/UserAgent/WebService.asmx/",
                method: "",
                url: "",
                ajaxCallMode: 0,
                PortalID: p.PortalID,
                UserModuleID: p.UserModuleID
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: UserAgentControl.config.type,
                    contentType: UserAgentControl.config.contentType,
                    cache: UserAgentControl.config.cache,
                    async: UserAgentControl.config.async,
                    url: UserAgentControl.config.url,
                    data: UserAgentControl.config.data,
                    dataType: UserAgentControl.config.dataType,
                    success: UserAgentControl.ajaxSuccess,
                    error: UserAgentControl.ajaxFailure,
                    complete: UserAgentControl.ajaxComplete
                });
            },
            GetUserAgentMode: function() {

                this.config.method = "GetUserAgentMode";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ PortalID: p.PortalID });
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
            },
            SaveUserAgentMode: function(AgentMode, PortalID, UserName) {
                this.config.method = "SaveUserAgentMode";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ AgentMode: AgentMode, PortalID: PortalID, UserName: UserName });
                this.config.ajaxCallMode = 0;
                this.ajaxCall(this.config);
            },
            BindControl: function() {
                $('#spnBtnSave').live("click", function() {
                    var AgentMode = "";
                    var PortalID = "";
                    var UserName = "";
                    var AgentMode = $("input[type='radio'][name='UserAgent']:checked").val();
                    PortalID = p.PortalID;
                    UserName = p.UserName
                    UserAgentControl.SaveUserAgentMode(AgentMode, PortalID, UserName);
                });
            },
            ajaxComplete: function() {
            },
            ajaxSuccess: function(msg) {
                switch (UserAgentControl.config.ajaxCallMode) {
                    case 0:
                        SageFrame.messaging.show("User Agent saved successfully", "Success");
                        break;
                    case 1:
                        if (msg.d.length > 0) {
                            var UserType = msg.d;
                            if (parseInt(UserType) == 1)
                                $('#rdbDeskTop').attr('checked', 'checked');
                            if (parseInt(UserType) == 2)
                                $('#rdbMobile').attr('checked', 'checked');
                            if (parseInt(UserType) == 3)
                                $('#rdbDefault').attr('checked', 'checked');
                        }
                }
            },
            ajaxFailure: function(msg) {
                return false;
            },
            init: function(config) {
                UserAgentControl.GetUserAgentMode();
                UserAgentControl.BindControl();
            }
        };
        UserAgentControl.init();
    };
    $.fn.UserAgent = function(p) {
        $.createUserAgent(p);
    };
})(jQuery);
