<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TestimonialViewDetail.ascx.cs" Inherits="Modules_Testimonial_TestimonialViewDetail" %>
<script type="text/javascript">
     $(document).ready(function() {
        $(this).GetTestimonialDetail({
            PortalID: '<%=PortalID%>',
            UserModuleID: '<%=UserModuleID%>',
            baseUrl: '<%=baseUrl %>'
           
        });
    });    
</script>
<div id="dvDetails" class="cssClassTestDetail">
    <h1>
        <span class="cssClassTestimonial sfLocale">What our Customers Say?</span></h1>
    <ul id="ulTestimonialDetails">
        <li></li>
    </ul>
</div>
