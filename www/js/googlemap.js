var _country,
	autocomplete,
	input,
	content,
	arr = [],
	_arr = [];

/***************************Api With Country*****************************************************/
function initAutocomplete(contentxx) {
	input = contentxx;
	
	var options = {
	
		componentRestrictions: {
			country: _country
		}
	};

	if (input) {
		autocomplete = new google.maps.places.Autocomplete(input, options);
		
	}

}

/***************************End Api With Country*****************************************************/

document.addEventListener('pageinit', function (e) {

	_country = sessionStorage.getItem('cauntry_code');

	if (e.target.querySelector('#autocomplete')) {
		content = e.target.querySelector('#autocomplete');
		initAutocomplete(content);
	}
    if (e.target.querySelector('#new_ss')) {
        content = e.target.querySelector('#new_ss');
        initAutocomplete(content);
    }
});
/***************************GPS*****************************************************/

var geocoder = new google.maps.Geocoder();

function get_loc() {
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

	}
}

//Get the latitude and the longitude;
function successFunction(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	codeLatLng(lat, lng)
}

function errorFunction() {
/*	alert("Geocoder failed");*/
}



function codeLatLng(lat, lng) {

	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({
		'latLng': latlng
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {

			if (results[1]) {
				
				for (var i = 0; i < results[1].address_components.length; i++) {

					if (_country == results[1].address_components[i].short_name) {
						_arr = [];
						arr = [];
						_arr.push(_country);
						arr.push(results[0].formatted_address);
						
					}

				}

			} else {
				 /*js_alert(false,"No results found");*/
			}
		} else {
			/*js_alert(false,"Geocoder failed due to: " + status);*/
		}
		
	if (_arr.length != 1) {
		toggleToast() ;
	} else {
		$(document).find('#autocomplete').val(arr[0]) 
        
	}
	});
	
}

/***************************End GPS*****************************************************/
/***************************Ons Toast Validation*****************************************************/

function toggleToast() {
	document.querySelector('ons-toast').show();
	setTimeout(function () {
		document.querySelector('ons-toast').hide();
	}, 4000);
	/***************************End Ons Toast Validation*****************************************************/
	

};
/***************************Alert *****************************************************/
	function js_alert (material, message) {
			ons.notification.alert({
				message: message,
				modifier: material ? 'material' : undefined
			});
		}
	/***************************End Alert*****************************************************/