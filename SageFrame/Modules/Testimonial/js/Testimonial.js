
(function($) {
    $.createTestimonial = function(p) {
        p = $.extend
        ({
            baseUrl: '',
            PortalID: '',
            UserModuleID: '',
            NoOfListToDisplay: '',
            ActiveImage: '',
            ActiveDate: '',
            ActiveViewMore: ''

        },
         p);
        GetLatestTestimonial();

        $('.cssClassReadMore').live('click', function() {
            window.location = AspxCommerce.utils.GetAspxRedirectPath() + "TestimonialDetails.aspx";
        });

        function GetLatestTestimonial() {
            $.ajax({
                type: "POST",
                url: p.baseUrl + 'WebService.asmx/GetSelectedTestimonialList',
                data: JSON2.stringify({ PortalID: parseInt(p.PortalID), UserModuleID: parseInt(p.UserModuleID), NoOfList: parseInt(p.NoOfListToDisplay), IsSlider: false }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    var testml = msg.d;
                    if (testml.length > 0) {
                        $('#spnEmptyList').hide();
                        var html = '';
                        $('#ulTestInfo').html('');
                        $.each(msg.d, function(index, item) {
                            html += '<li>';

                            html += ('<p class=\"cssClassTestmonialDetails\">');
                            var shortTestimonialDesc = '';
                            if (item.Testimonial.length > 120) {
                                shortTestimonialDesc = item.Testimonial.substring(0, 120)
                                shortTestimonialDesc += "....";
                            } else {
                                shortTestimonialDesc = item.Testimonial;
                            }
                            html += Encoder.htmlDecode(shortTestimonialDesc);
                            html += ('</p>');
                            html += ('<div class="cssClassImageDate">');
                            if (p.ActiveImage == "True") {
                                html += ('<div id="dvImageHolder" class=\"cssClassImageHolder"\>');
                                if (item.Image == '') {
                                    html += ('<img alt="" src=' + p.baseUrl + '/image/Author.gif' + ' /></div>');
                                }
                                else {
                                    html += ('<img alt="" src=' + p.baseUrl + 'image/UploadedImages/' + item.Image + ' /></div>');
                                }
                            }
                            html += ('<div class="cssClassAuthorDate"><span class="cssClassUser"><em class=\"cssClassUser\">' + item.UserName + ',' + ' ' + item.Address + '</em></span>');
                            if (p.ActiveDate == "True") {
                                html += ('<span class=\"cssClassDate\">' + item.AddedOn + '</span></div>');
                            }
                            else {
                                html += '</div>';
                            }
                            html += ('</div>');
                            html += ('<p class="cssClassLink"> <a href=\"' + item.WebUrl + '\" class=\"cssClasslink\" target="_blank">' + item.WebUrl + '</a></p>');
                            html += ('</li>');
                        });
                        $('#ulTestInfo').html(html);
                        if (p.ActiveViewMore == "False") {
                            $('.cssClassReadMore').hide();
                        }
                    }
                    else {
                        $('.cssClassReadMore').hide();
                    }
                },
                error: function(error) {
                }
            });
        }
        function GetDetails() {
            $.ajax({
                type: "POST",
                url: p.baseUrl + 'WebService.asmx/GetTestimonialList',
                data: JSON2.stringify({ PortalID: parseInt(p.PortalID), UserModuleID: parseInt(p.UserModuleID), IsSlider: false }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    var html = '';
                    $('#ulTestimonialDetails').html('');
                    $.each(msg.d, function(index, item) {
                        html += '<li>';

                        //html += ('<span class=\"cssClassDate\">' + item.AddedOn + '</span></p>')
                        html += ('<p class=\"cssClassTestmonialDetails\">' + item.Testimonial + '</p>');
                        html += ('<p class="cssClassLink"> <a href=\"' + item.WebUrl + '\" class=\"cssClasslink\">' + item.WebUrl + '</a></p>');
                        html += ('<div class="cssClassImageDate">');
                        if (p.ActiveImage == "True") {
                            html += ('<div id="dvImageHolder" class=\"cssClassImageHolder"\>');
                            if (item.Image == '') {
                                html += ('<img alt="" src=' + p.baseUrl + '/image/Author.gif' + ' /></div>');
                            }
                            else {
                                html += ('<img alt="" src=' + p.baseUrl + 'image/UploadedImages/' + item.Image + ' /></div>');
                            }
                        }

                        html += ('<p class="cssClassAuthorDate"> <em class=\"cssClassUser\">' + item.UserName + '</em>');

                        if (p.ActiveDate == "True") {
                            html += ('<span class=\"cssClassDate\">' + item.AddedOn + '</span></p>');
                        }
                        else {
                            html += '</p>';
                        }
                        html += ('</div>');
                        html += ('</li>');
                    });

                    $('#ulTestimonialDetails').html(html);

                },
                error: function(error) {
                }
            });
        }
    };
    $.fn.GetTestimonial = function(p) {
        $.createTestimonial(p);
    };
})(jQuery);


 