(function($) {
    $.createTestimonialDetail = function(p) {
        p = $.extend
        ({
            baseUrl: '',
            PortalID: '',
            UserModuleID: ''

        }, p);
        GetDetails();
        function GetDetails() {
            $.ajax({
                type: "POST",
                url: p.baseUrl + 'WebService.asmx/GetTestimonialDetailList',
                data: JSON2.stringify({ PortalID: parseInt(p.PortalID), UserModuleID: parseInt(p.UserModuleID), IsSlider: false }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    var html = '';
                    $('#ulTestimonialDetails').html('');
                    $.each(msg.d, function(index, item) {
                        html += '<li>';

                  
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
						     html += ('<span class=\"cssClassDate\">' + item.AddedOn + '</span></p>')

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
    $.fn.GetTestimonialDetail = function(p) {
        $.createTestimonialDetail(p);
    };
})(jQuery);
