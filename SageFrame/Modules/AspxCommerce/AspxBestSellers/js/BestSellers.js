 var BestSellers="";
 $(function() {
     var aspxCommonObj = {
         StoreID: AspxCommerce.utils.GetStoreID(),
         PortalID: AspxCommerce.utils.GetPortalID(),
         UserName: AspxCommerce.utils.GetUserName(),
         CultureName: AspxCommerce.utils.GetCultureName()
     };
     var countSeller = countBestSellerSetting;
     var BestSellers = {
         config: {
             isPostBack: false,
             async: true,
             cache: true,
             type: "POST",
             contentType: "application/json; charset=utf-8",
             data: '{}',
             dataType: "json",
             baseURL: AspxCommerce.utils.GetAspxServicePath() + "AspxCommerceWebService.asmx/",
             url: "",
             method: "",
             ajaxCallMode: ""
         },
         ajaxCall: function(config) {
             $.ajax({
                 type: BestSellers.config.type,
                 contentType: BestSellers.config.contentType,
                 cache: BestSellers.config.cache,
                 async: BestSellers.config.async,
                 data: BestSellers.config.data,
                 dataType: BestSellers.config.dataType,
                 url: BestSellers.config.url,
                 success: BestSellers.config.ajaxCallMode,
                 error: BestSellers.ajaxFailure
             });
         },
         init: function() {
             $("#divBestSellers").hide();
             if (enableBestSellerItems.toLowerCase() == 'true' && countBestSellerSetting > 0) {
                 //BestSellers.GetBestSoldItems();
                 $("#divBestSellers").show();
             }
             if (bestSellItemRss.toLowerCase() == 'true') {
                 BestSellers.LoadBestSellerRssImage();
             }
         },
         LoadBestSellerRssImage: function() {
             var pageurl = aspxRedirectPath + rssFeedUrl + pageExtension;
             $('#bestSellerRssImage').parent('a').show();
             $('#bestSellerRssImage').parent('a').removeAttr('href').attr('href', pageurl + '?type=rss&action=bestsellitems');
             $('#bestSellerRssImage').removeAttr('src').attr('src', aspxTemplateFolderPath + '/images/rss-icon.png');
             $('#bestSellerRssImage').removeAttr('title').attr('title', getLocale(AspxRssFeedLocale, "Best Seller Items Rss Feed Title"));
             $('#bestSellerRssImage').removeAttr('alt').attr('alt', getLocale(AspxRssFeedLocale, "Best Seller Items Rss Feed Alt"));
         },
         GetBestSoldItems: function() {
             if (countSeller > 0) {
                 this.config.url = this.config.baseURL + "GetBestSoldItems";
                 this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, count: countSeller });
                 this.config.ajaxCallMode = BestSellers.BindBestSoldItems;
                 this.ajaxCall(this.config);
             } else {
                 $(".cssClassBestSellerBox").html("<span class=\"cssClassNotFound\">" + getLocale(AspxBestSellers, "No item is sold in this store Yet!") + "</span>");
                 $(".cssClassBestSellerBox").removeClass("cssClassBestSellerBox");

             }
         },
         BindBestSoldItems: function(data) {
             if (data.d.length > 0) {
                 $(".cssClassBestSellerBoxInfo ul").html('');
                 $("#divViewMoreBestSeller").html('');
                 var rowTotal;
                 $.each(data.d, function(index, item) {
                     var imagePath = itemImagePath + item.ImagePath;
                     if (item.ImagePath == null || item.ImagePath == "") {
                         imagePath = defaultImagePath;
                     }
                     var name = '';
                     if (item.ItemName.length > 50) {
                         name = item.ItemName.substring(0, 50);
                         var i = 0;
                         i = name.lastIndexOf(' ');
                         name = name.substring(0, i);
                         name = name + "...";
                     }
                     else {
                         name = item.ItemName;
                     }
                     rowTotal = item.TotalSoldItems;
                     $(".cssClassBestSellerBoxInfo ul").append('<li><a class="cssClassProductPicture" href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '" ><img src="' + aspxRootPath + imagePath.replace('uploads', 'uploads/Small') + '"  alt="' + item.ItemName + '" /></a><a href="' + aspxRedirectPath + 'item/' + item.SKU + pageExtension + '" class="cssClassItemName" title="'+item.ItemName+'">' + name + '</a></li>');
                 });
                 if (eval(rowTotal) > eval(countSeller)) {
                     $("#divViewMoreBestSeller").html('<a href="' + aspxRedirectPath + 'Details-View' + pageExtension + '?id=best">' + getLocale(AspxBestSellers, 'View More') + '</a>');
                 }
             } else {
                 $(".cssClassBestSellerBox").html("<span class=\"cssClassNotFound\">" + getLocale(AspxBestSellers, "No item is sold in this store Yet!") + "</span>");
                 $(".cssClassBestSellerBox").removeClass("cssClassBestSellerBox");
             }
         }
     };
     BestSellers.init();
 });