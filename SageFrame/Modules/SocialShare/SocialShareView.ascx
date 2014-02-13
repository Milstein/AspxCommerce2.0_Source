<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SocialShareView.ascx.cs"
    Inherits="Modules_SocialShare_SocialShareView" %>
<div class="wrapShare">    
    <div class="socialWrapper active">
    <div class="socialshare">
        <span class='st_sharethis_large' displaytext='ShareThis'></span><span class='st_facebook_large'
            displaytext='Facebook'></span><span class='st_twitter_large' displaytext='Tweet'>
        </span><span class='st_linkedin_large' displaytext='LinkedIn'></span><span class='st_email_large'
            displaytext='Email'></span>
    </div>
    </div>
   <div class="hideshare active"> <span>Share [+]</span></div>
    <div class="hideshare inactive"> <span >Hide </span></div>
</div>
<script type="text/javascript">
    //<![CDATA[    
    $(document).ready(function () {
        $('.hideshare.active').live("click",function () {
            $('.socialWrapper').toggle("slow");
			 $('.hideshare.active').hide();
			   $('.hideshare.inactive').show();
        });
        $('.hideshare.inactive').live("click",function () {	
            $('.socialWrapper').toggle("slow");
            $('.hideshare.inactive').hide();
			 $('.hideshare.active').show();
        });
    });
    //]]>	
</script>
<script type="text/javascript">    var switchTo5x = true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript">    stLight.options({ publisher: "4074da4f-1eed-408e-ab52-84854d12f00a" }); </script>
