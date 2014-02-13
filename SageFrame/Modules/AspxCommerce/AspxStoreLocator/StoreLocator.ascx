<%@ Control Language="C#" AutoEventWireup="true" CodeFile="StoreLocator.ascx.cs" Inherits="Modules_AspxCommerce_AspxStoreLocator_slnew" %>

<script type="text/javascript">
    //<![CDATA[

    $(function () {

        var aspxCommonObj = {};
        var latitude = 0;
        var longitude = 0;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var markers = [];
        var geocoder;
        var from;
        var to;

        $(document).ready(function () {
            aspxCommonObj = {
                StoreID: AspxCommerce.utils.GetStoreID(),
                PortalID: AspxCommerce.utils.GetPortalID(),
                UserName: AspxCommerce.utils.GetUserName(),
                CultureName: AspxCommerce.utils.GetCultureName()
            };
            $(".sfLocale").localize({
                moduleKey: AspxStoreLocator
            });

            GetAllStores();

            $("#btnSubmitSearchAddress").click(function () {
                if ($("#txtSearchAddress").val() == null || $("#txtSearchAddress").val() == '') {
                    alert(getLocale(AspxStoreLocator, "Please enter the search address!"));
                    return;
                }

                if ($("#ddlDistance").val() != -1) {
                    GoogleMapSearchLocation();
                } else {
                    alert(getLocale(AspxStoreLocator, "Please select the distance!"));
                }
            });

            $("#btnShowAllStore").click(function () {
                GetAllStores();
            });
            $(".sidebar").live('click', function() {
                $(".sidebar").removeClass("selected");
                $(this).addClass("selected");
            });

            $("#mode").change(function () {
                calcRoute(from, to);
            });

            //        $("#txtSearchAddress").bind("focus", function() {
            //            $("#txtSearchAddress").val("");
            //        });
            $("#txtSearchAddress").keyup(function (event) {
                if (event.keyCode == 13) {
                    $("#btnSubmitSearchAddress").click();
                }
            });
        });

        function GetAllStores() {
            $("#ddlDistance").val(-1);
            $("#txtSearchAddress").val('');
            var myOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

            $("#divMap").show();
            $("#divEnterAddress").show();
            $("#divDirection").hide();

            var shadow = new google.maps.MarkerImage(aspxRootPath + 'images/Markers/shadow50.png',
            // The shadow image is larger in the horizontal dimension
            // while the position and offset are the same as for the main image.
                new google.maps.Size(37, 32),
                new google.maps.Point(0, 0),
                new google.maps.Point(0, 32));

            var bounds = new google.maps.LatLngBounds();
            var swBound = bounds.getSouthWest();
            var neBound = bounds.getNorthEast();
            var lngSpan = neBound.lng() - swBound.lng();
            var latSpan = neBound.lat() - swBound.lat();

            //map.clearOverlays();
            //        if (markers) {
            //            for (i in markers) {
            //                markers[i].setMap(null);
            //            }
            //            markers.length = 0;
            //        }

            var sidebarstore = document.getElementById('sidebarstore');
            sidebarstore.innerHTML = '';

            var param = { aspxCommonObj: aspxCommonObj };
            $.ajax({
                type: "POST",
                async: false,
                url: aspxservicePath + "AspxCommerceWebService.asmx/GetAllStoresLocation",
                data: JSON2.stringify(param),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var branchImage = '';
                    if (msg.d.length > 0 && msg.d != null) {
                        $.each(msg.d, function (index, item) {
                            var point = new google.maps.LatLng(item.Latitude, item.Longitude);
                            var image = new google.maps.MarkerImage(aspxRootPath + 'images/Markers/marker' + (index + 1) + '.png',
                            // This marker is 20 pixels wide by 32 pixels tall.
                                new google.maps.Size(20, 32),
                            // The origin for this image is 0,0.or(9,34)
                                new google.maps.Point(0, 0),
                            // The anchor for this image is the base of the flagpole at 0,32.
                                new google.maps.Point(0, 32));
                            var infoHTML = item.StoreName + '<br>' + item.StoreDescription + '<br>' + item.StreetName + ' ,' + item.LocalityName + ' ,' + item.City + ' ,' + item.State + ', ' + item.Country + ', ' + item.ZIP;
                            branchImage = '<div class="cssClassImgwrapper"><img src="' + aspxRootPath + 'Modules/AspxCommerce/AspxStoreBranchesManagement/uploads/' + item.BranchImage + '" class="uploadImage" height="144px" width="256px"/></div>' + '<div class="cssClassStoreinfo">' + infoHTML + '</div>';
                            markers[index] = new google.maps.Marker({
                                position: point,
                                map: map,
                                shadow: shadow,
                                icon: image,
                                //                            shape: shape,
                                title: item.StoreName
                            });

                            markers[index].infowindow = new google.maps.InfoWindow({
                                content: branchImage
                            });

                            google.maps.event.addListener(markers[index], 'click', function () {
                                markers[index].infowindow.open(map, markers[index]);
                            });

                            markers[index].setMap(map);

                            //map.addOverlay(marker);
                            var sidebarEntry = createSidebarEntry(markers[index], item.StoreName, item.StreetName, item.LocalityName, item.City, item.State, item.Country, item.ZIP, item.Distance, index);
                            sidebarstore.appendChild(sidebarEntry);
                            bounds.extend(point);

                        });

                        if (msg.d.length > 1) {
                            $("#lblTotalResultCount").html('<b>' + msg.d.length + ' ' + getLocale(AspxStoreLocator, 'Stores Found') + '</b><br/>');
                            map.setCenter(bounds.getCenter());
                            map.fitBounds(bounds);
                        } else if (msg.d.length == 1) {
                            $("#lblTotalResultCount").html('<b>' + msg.d.length + getLocale(AspxStoreLocator, 'Store Found') + '</b><br/>');
                            map.setCenter(bounds.getCenter());
                            map.setZoom(15);
                        }
                    } else {
                        $("#lblTotalResultCount").html("");
                        sidebarstore.innerHTML = getLocale(AspxStoreLocator, 'No results found.');

                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                map.setCenter(initialLocation);
                                map.setZoom(15);
                            }, function () {
                                // set center to New York,USA
                                map.setCenter(new google.maps.LatLng(40.69847032728747, -73.9514422416687));
                                map.setZoom(14);
                            });
                            // Browser doesn't support Geolocation
                        } else {
                            map.setCenter(new google.maps.LatLng(40.69847032728747, -73.9514422416687));
                            map.setZoom(14);
                        }
                        return;
                    }
                }
                //            ,
                //            error: function() {
                //                alert("error");
                //            }
            });
        }

        function createSidebarEntry(marker, name, street, locality, City, State, Country, ZIP, distance, index) {
            var div = document.createElement('div');
            var html = '<b>' + (index + 1) + ') ' + name + '</b> (' + distance.toFixed(2) + ')<br/>' + street + ' ,' + locality + ' ,' + City + ' <br/>' + State + ' ,' + Country + ' ,' + ZIP;
            div.innerHTML = html;
            div.className = 'sidebar';
            // div.style.cursor = 'pointer';
            // div.style.marginBottom = '5px';
            google.maps.event.addDomListener(div, 'click', function () {
                google.maps.event.trigger(markers[index], 'click');
            });
            //            google.maps.event.addDomListener(div, 'mouseover', function() {
            //                div.style.backgroundColor = '#eee';
            //            });
            //            google.maps.event.addDomListener(div, 'mouseout', function() {
            //                div.style.backgroundColor = '#fff';
            //            });
            return div;
        }

        function GoogleMapSearchLocation() {
            var myOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            $("#divDirection").hide();

            directionsDisplay = new google.maps.DirectionsRenderer();
            geocoder = new google.maps.Geocoder();
            if (geocoder) {
                geocoder.geocode({ 'address': $("#txtSearchAddress").val() }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var shadow = new google.maps.MarkerImage(aspxRootPath + 'images/Markers/shadow50.png',
                            new google.maps.Size(37, 32),
                            new google.maps.Point(0, 0),
                            new google.maps.Point(0, 32));

                        var bounds = new google.maps.LatLngBounds();
                        var swBound = bounds.getSouthWest();
                        var neBound = bounds.getNorthEast();
                        var lngSpan = neBound.lng() - swBound.lng();
                        var latSpan = neBound.lat() - swBound.lat();


                        //                        if (markers) {
                        //                            for (i in markers) {
                        //                                markers[i].setMap(null);
                        //                            }
                        //                            markers.length = 0;
                        //                        }
                        var searchPlaceMarker = new google.maps.Marker({
                            map: map,
                            title: $("#txtSearchAddress").val(),
                            position: results[0].geometry.location
                        });

                        var Searchinfowindow = new google.maps.InfoWindow({
                            content: getLocale(AspxStoreLocator, 'Your search location - ') + $("#txtSearchAddress").val()
                        });

                        google.maps.event.addListener(searchPlaceMarker, 'click', function () {
                            Searchinfowindow.open(map, searchPlaceMarker);
                        });
                        searchPlaceMarker.setMap(map);
                        //markersArray.push(searchPlaceMarker);

                        bounds.extend(results[0].geometry.location);

                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();

                        var param = { latitude: latitude, longitude: longitude, searchDistance: $("#ddlDistance").val(), aspxCommonObj: aspxCommonObj };
                        $.ajax({
                            type: "POST",
                            async: false,
                            url: aspxservicePath + "AspxCommerceWebService.asmx/GetLocationsNearBy",
                            data: JSON2.stringify(param),
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.d.length > 0) {

                                    var sidebarstore = document.getElementById('sidebarstore');
                                    sidebarstore.innerHTML = '';

                                    $.each(msg.d, function (index, item) {
                                        var point = new google.maps.LatLng(item.Latitude, item.Longitude);
                                        var image = new google.maps.MarkerImage(aspxRootPath + 'images/Markers/marker' + (index + 1) + '.png',
                                            new google.maps.Size(20, 32),
                                            new google.maps.Point(0, 0),
                                            new google.maps.Point(0, 32));

                                        var infoHTML = item.StoreName + "<br>" + item.StoreDescription + "<br>" + item.StreetName + " ," + item.LocalityName + " ," + item.City + " ," + item.State + " ,"
                                            + item.Country + " ," + item.ZIP + ", "
                                                + "<li id=\"getDirection\"  onclick=\"calcRoute('" + $("#txtSearchAddress").val() + "','" + point + "');\"><div class=\"cssClassDirection\">" + getLocale(AspxStoreLocator, 'Get Direction') + "</div></li>"


                                        markers[index] = new google.maps.Marker({
                                            position: point,
                                            map: map,
                                            shadow: shadow,
                                            icon: image,
                                            title: item.StoreName
                                        });

                                        markers[index].infowindow = new google.maps.InfoWindow({
                                            content: infoHTML
                                        });

                                        google.maps.event.addListener(markers[index], 'click', function () {
                                            markers[index].infowindow.open(map, markers[index]);
                                        });

                                        markers[index].setMap(map);

                                        var sidebarEntry = createSidebarEntry(markers[index], item.StoreName, item.StreetName, item.LocalityName, item.City, item.State, item.Country, item.ZIP, item.Distance, index);
                                        sidebarstore.appendChild(sidebarEntry);
                                        bounds.extend(point);
                                        directionsDisplay.setMap(map);
                                        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
                                    });
                                    $("#lblTotalResultCount").html('<b>' + msg.d.length + getLocale(AspxStoreLocator, 'Store Found') + '</b><br/>');
                                    if (msg.d.length > 0) {
                                        map.setCenter(bounds.getCenter());
                                        map.fitBounds(bounds);
                                    }
                                } else {
                                    $("#lblTotalResultCount").html("");
                                    $("#sidebarstore").html(getLocale(AspxStoreLocator, 'No results found.'));
                                    map.setCenter(results[0].geometry.location);
                                    map.setZoom(12);
                                    return;
                                }
                            },
                            error: function () {
                                alert(getLocale(AspxStoreLocator, "error"));
                            }
                        });
                        markers.push(searchPlaceMarker);
                    } else {
                        alert($("#txtSearchAddress").val() + getLocale(AspxStoreLocator, " is not found "));
                        $("#lblTotalResultCount").html("");
                        $("#sidebarstore").html(getLocale(AspxStoreLocator, 'No results found.'));
                        return;
                    }
                });
            }
        }

        function calcRoute(start, end) {
            $("#divDirection").show();
            var selectedMode = $("#mode").val();
            from = start;
            to = end;
            var request = {
                origin: from,
                destination: to,
                travelMode: google.maps.TravelMode[selectedMode]
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                    var route = result.routes[0];
                    var summaryPanel = document.getElementById("directionsPanel");
                    summaryPanel.innerHTML = "";
                    // For each route, display summary information.
                    for (var i = 0; i < route.legs.length; i++) {
                        var routeSegment = i + 1;
                        summaryPanel.innerHTML += "<b>" + getLocale(AspxStoreLocator, "Route Segment: ") + routeSegment + "</b><br />";
                        summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                        summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
                        summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
                    }
                }
            });

        }
        $(document).ready(function () {
            $(".cssClassStore").click(function () {
                $(".cssClassStore").removeClass('selected');
                $(this).addClass("selected");
            });
        });
    });
    //]]>   
</script>

<div id="divEnterAddress" visible="false">
    <div>
        <label class="cssClassLabel sfLocale">
            Enter full address :</label>
        &nbsp;
        <input type="text" class="sfInputbox" name="txtSearchAddress" id="txtSearchAddress" />
        &nbsp;
        <label class="cssClassLabel sfLocale">
            Distance:</label>
        &nbsp;
        <select name="ddlDistance" class="sfListmenu" id="ddlDistance">
            <option value="-1" selected class="sfLocale">Choose One</option>
            <option value="5"  class="sfLocale">5</option>
            <option value="10" class="sfLocale">10</option>
            <option value="20" class="sfLocale">20</option>
            <option value="30" class="sfLocale">30</option>
            <option value="50" class="sfLocale">50</option>
            <option value="100" class="sfLocale">100</option>
        </select>
        <label class="cssClassLabel sfLocale">miles.</label>
        <div id="divFrontStoreButton" class="sfButtonwrapper cssClassFrontStoreButton">
            <button type="button" id="btnSubmitSearchAddress">
                <span><span class="sfLocale">Search</span></span></button>
            <button type="button" id="btnShowAllStore">
                <span><span class="sfLocale">Show all Stores</span></span></button>
            <div class="cssClassClear">
            </div>
        </div>
        <asp:Label ID="lblError" runat="server" EnableViewState="False" ForeColor="Red" 
            meta:resourcekey="lblErrorResource1"></asp:Label>
    </div>
    <div id="divMap">
        <table cellpadding="4" cellspacing="8">
            <tr>
                <td valign="top" class="navBar">
                    <label class="cssClassLabel" id="lblTotalResultCount">
                    </label>
                    <div id="sidebarstore" style="overflow: auto; height: 400px; font-size: 11px; color: #000">
                    </div>
                </td>
                <td valign="top" class="navMap" >
                    <label class="cssClassLabel">
                        <b class="sfLocale">Click on icon for more information.</b></label>
                    <div id="map_canvas" style="width: 700px; height: 500px">
                    </div>
                </td>
                <td class="navRoute">
                    <div id="divDirection" visible="false">
                        <b class="sfLocale">Mode of Travel: </b>
                        <select id="mode" class="sfListmenu" name="mode">
                            <option value="DRIVING" selected="selected" class="sfLocale">Driving</option>
                            <option value="WALKING" class="sfLocale">Walking</option>
                            <option value="BICYCLING" class="sfLocale">Bicycling</option>
                        </select>
                        <br />
                        <div id="directionsPanel" style="float: right; width: 500px; height 100%">
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
