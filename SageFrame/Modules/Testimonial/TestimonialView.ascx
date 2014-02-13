<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TestimonialView.ascx.cs"
    Inherits="Modules_Testimonial_TestimonialView" %>

<script type="text/javascript">

    $(document).ready(function() {
        $(".sfLocale").localize({
            moduleKey: Testimonial
        });
        $(this).GetTestimonial({
            PortalID: '<%=PortalID%>',
            UserModuleID: '<%=UserModuleID%>',
            baseUrl: '<%=baseUrl %>',
            NoOfListToDisplay: '<%=NoOListToDisplay %>',
            ActiveImage: '<%=ActiveImage %>',
            ActiveDate: '<%=ActiveDate %>',
            ActiveViewMore: '<%=ActiveViewMore %>'
        });
    });    
</script>

<div class="cssClassCommonSideBox" style="display: block;">
    <div id="fade">
    </div>
    <h2>
        <span class="cssClassTestimonial sfLocale">Client Testimonials</span></h2>
    <div class="cssClassCommonSideBoxTable">
        <div id="divTestList" class="cssClassTestimonialList">
            <ul id="ulTestInfo" class="cssClassTestimonial">
            	<li></li>
            </ul>
            <a class="cssClassReadMore sfLocale">View More</a> <span id="spnEmptyList" class="cssClassNotFound sfLocale">
                Testimonial list is Empty</span>
        </div>
    </div>
</div>
