$(function(){
    var map, pos, geocoder, markers = [], filters = {}, infoWindow;

    function initializeMaps() {
        geocoder = new google.maps.Geocoder();
        
        var mapType = new google.maps.StyledMapType([
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#989898"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eaeaea"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebebeb"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#999999"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ], {});

        var mapOptions = {
            zoom: 10,
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: ['blackwhite']
            }
        };

        map = new google.maps.Map(document.getElementById('buy_map'), mapOptions);
        map.mapTypes.set('blackwhite', mapType);
        map.setMapTypeId('blackwhite');
        handleNoGeolocation();

        if (typeof locations !== 'undefined' && locations.length > 0) {
            for (var i = 0, len = locations.length; i < len; i++) {
                positionAddressMarker(locations[i], i);
            }
        }

        infoWindow = new google.maps.InfoWindow({content: ''});
        if ($('#mapslocation').length > 0) initializeSearch();
        if ($('#locations_scroll .pin_holder').length > 0) initializeButtons();

        if (typeof window.centerToAddress != 'undefined' && window.centerToAddress != null && window.centerToAddress != 'undefined') {
            geocoder.geocode({address: window.centerToAddress}, function(results, status) {
                map.setCenter(results[0].geometry.location);
            });
        }
    }

    function initializeSearch() {
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('mapslocation'), {
            types: ['geocode']
        });

        map.addListener('bounds_changed', function() { getBoundsMarkers(); });

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) return;

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(10);
            }
            
            hideLocations(place.geometry.location, locations);
            getBoundsMarkers();
        });
    }

    function initializeButtons() {
        $('#locations_scroll .pin_holder:not(.mobile)').click(function(e) {
            e.preventDefault();
            var index = $(this).data('index');
            if (index == null || locations[index] == null) return;

            var location = locations[index];
            if (location.position != null) {
                map.setZoom(15);
                map.setCenter(location.position);

                if (location.marker != null) {
                    infoWindow.setContent(getInfoWindowHtml(location.marker));
                    infoWindow.open(map, location.marker);
                }
            }
        });
    }

    function handleNoGeolocation() {
        var options = {
            map: map,
            position: new google.maps.LatLng(46.0660318,14.3920158)
        };
        map.setCenter(options.position);
    }

    function positionAddressMarker(location, index) {
        locations[index].position = new google.maps.LatLng(parseFloat(location.lat),parseFloat(location.lng));

        var icon = '../wp-content/themes/iliketofu/images/svg_circles/map_pinpoint.svg';
        var marker = new google.maps.Marker({
            map: map,
            //position: results[0].geometry.location,
            position: new google.maps.LatLng(parseFloat(location.lat),parseFloat(location.lng)),
            index: location.index,
            city_name: location.city_name,
            shop_name: location.shop_name,
            address: location.address,
            icon: icon
        });

        marker.addListener('click', function() {
            infoWindow.setContent(getInfoWindowHtml(marker));
            infoWindow.open(map, marker);
        });

        locations[index].marker = marker;
        markers.push(marker);

        getBoundsMarkers();
    }

    function getBoundsMarkers() {
        var markersList = $('#markers_list');
        if (markersList.length > 0) {
            markersList.html('');
            for (var i = 0; i < markers.length; i++) {
                if(map.getBounds() != null && map.getBounds().contains(markers[i].getPosition()) && markers[i]['map'] != null) {
                    markersList.append(markers[i].address);
                }
            }
        }
    }

    function getInfoWindowHtml(clickedMarker) {
        x = '<div class="marker_info">';
        x += '<div class="marker_city">' + clickedMarker.city_name + '</div>';
        x += '<div class="marker_name">' + clickedMarker.shop_name + '</div>';
        x += '<div class="marker_address">' + clickedMarker.address + '</div>';
        x += '<a href="http://maps.google.com/maps?z=12&t=m&q=loc:' + locations[clickedMarker.index].lat + '+' + locations[clickedMarker.index].lng + '" target="_blank" class="pin_holder map"><span class="pin"></span><span class="pin_caption">' + $('.where_to_buy .locations_holder .locations_scroll .locations .location .pin_holder .pin_caption').html() + '</span><span class="clear"></span></a>';
        x += '</div>';
        return x;
    }
	
	function calculateDistance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var radlon1 = Math.PI * lon1/180;
		var radlon2 = Math.PI * lon2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344; }
		if (unit=="N") { dist = dist * 0.8684; }
		return dist;
	}
	
    function hideLocations(current_place, locations){
        var max_distance = 30;
        var near_locations = 0;
        $('.where_to_buy .locations_holder .locations_scroll .locations .location').css('display', 'block');
        for(var i = 0; i < locations.length; i++){
            var distance = calculateDistance(
                locations[i].lat,
                locations[i].lng,
                current_place.lat(),
                current_place.lng(),
                "K"
            );
            if(distance > max_distance){
	            $('.where_to_buy .locations_holder .locations_scroll .locations .location.nmb-' + locations[i].index).css('display', 'none');
	            markers[i].setVisible(false);
            } else {
	            markers[i].setVisible(true);
	            near_locations++;
            }
        }
	    fixPaginationMobile(near_locations);
    }
    
    function fixPaginationMobile(loc_numb){
	    $('#locations_scroll').scrollTop(0);
        var pagination = $('.where_to_buy .mobile_nav_pagination .pagination .number-wrap');
        var string = "";
        var quotient = loc_numb / 3;
        var remainder = loc_numb % 3;
        console.log("number_of_locations_found: " + loc_numb + "    quotient:" + quotient + "   remainder:" + remainder);
        for( var i = 0; i < quotient; i++ ){
            string += '<div class="page-numbers ';
            if( i == 0 ){
                string += 'active first hide_points';
            } else if( i == Math.floor(quotient) - 1 && Math.floor(quotient) == quotient){
	            string += 'visible last';
	            if(quotient < 4){
		            string += ' hide_points';
                }
            } else if( i == Math.floor(quotient) && Math.floor(quotient) < quotient){
		        string += 'visible last';
	            if(quotient < 4){
		            string += ' hide_points';
	            }
	        } else if( i == 1){
	            string += 'visible';
            }
            string += '">' + (i + 1) + '</div>';
            console.log(Math.floor(quotient));
        }
        // if(remainder != 0 && quotient >= 1){
	     //    string += '<div class="page-numbers ';
	     //    string += '">' + (i + 1) + '</div>';
        // }
        pagination.html(string);
        scroll_mobile_where_to_buy.update(loc_numb);
    }

    if ($('#buy_map').length > 0) initializeMaps();
});