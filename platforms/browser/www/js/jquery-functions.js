var ajax_request;
var ajax_url = "http://mealoop.com/mobileapp/api";
var cart = [];
var dialog_title_default ="mealoop";
var pushNotificationSenderid = "1039967975155";
var map;
var map_search;
var drag_marker;
var map_track;
var track_order_interval;
var track_order_map_interval;
var drag_marker_bounce = 1;
var _country,
	autocomplete,
	input,
	content,
	arr = [],
	_arr = [];
function empty(data) {
    if (typeof data === "undefined" || data == null || data == "") {
        return true;
    }
    return false;
}

// gisher
function loadBookingForm1() {
    // merhantPopOverMenu.hide();
    loadBookingForm();
}

function submitBooking() {
    $.validate({
        form: '#frm-booking',
        borderColorOnError: "#FF0000",
        onError: function () {},
        onSuccess: function () {
            var params = $("#frm-booking").serialize();
            params += "&merchant_id=" + getStorage("merchant_id");
            callAjax("bookTable", params);
            return false;
        }
    });
}
function loadBookingForm() {
    var options = {
        animation: 'slide',
        callback: function () {

            displayMerchantLogo2(
                getStorage("merchant_logo"),
                '',
                'page-booking'
            );

            initMobileScroller();

            /*translate booking form*/
            $(".number_guest").attr("placeholder", getTrans('Number Of Guests', 'number_of_guest'));
            $(".date_booking").attr("placeholder", getTrans('Date Of Booking', 'date_of_booking'));
            $(".booking_time").attr("placeholder", getTrans('Time Of Booking', 'time_of_booking'));
            $(".booking_name").attr("placeholder", getTrans('Name', 'name'));
            $(".email").attr("placeholder", getTrans('Email Address', 'email_address'));
            $(".mobile").attr("placeholder", getTrans('Mobile Number', 'mobile_number'));
            $(".booking_notes").attr("placeholder", getTrans('Your Instructions', 'your_instructions'));

            translateValidationForm();

        }
    };
    myNavigator.pushPage("booking.html", options);
}

//gisher
//new Jor


document.addEventListener("deviceready", onDeviceReady, false);
function validate(evt) {
  evt.preventDefault()
}
function onDeviceReady() {
 navigator.splashscreen.hide();
setInterval(function(){

           $(document).find('#mobile').intlTelInput({
              // allowDropdown: false,
              // autoHideDialCode: false,
              // autoPlaceholder: "off",
              // dropdownContainer: "body",
              // excludeCountries: ["us"],
              // formatOnDisplay: false,
              defaultCountry: "ag",
              // geoIpLookup: function(callback) {
              //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
              //     var countryCode = (resp && resp.country) ? resp.country : "";
              //     callback(countryCode);
              //   });
              // },
              // initialCountry: "auto",
              // nationalMode: false,
              // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
              // placeholderNumberType: "MOBILE",
              // preferredCountries: ['cn', 'jp'],
              // separateDialCode: true,    
        })
 

        
     $(document).find("#cont_tel").intlTelInput({
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: "body",
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      defaultCountry: "ag",
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // initialCountry: "auto",
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,    
    })
     $(document).find("#mob_num").intlTelInput({
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: "body",
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      defaultCountry: "ag",
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // initialCountry: "auto",
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,    
})
     $(document).find("#mob_phone").intlTelInput({
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: "body",
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      defaultCountry: "ag",
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // initialCountry: "auto",
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,    
})

    },1000)
    getCurrentLocation();
    myFunction();
    var krms_config ={  
    'ApiUrl' : "http://mealoop.com/mobileapp/api",
    'DialogDefaultTitle' : "mealoop",
    'pushNotificationSenderid' : "1039967975155",
    'facebookAppId' : "1785452871717052",
    'APIHasKey' : "fed7b441b349bae8f146711fbd215e90"
};
        if (krms_config.pushNotificationSenderid) {

        var push = PushNotification.init({
            "android": {
                "senderID": krms_config.pushNotificationSenderid
            },
            "ios": {
                "alert": "true",
                "badge": "true",
                "sound": "true",
                "clearBadge": "true"
            },
            "windows": {}
        });

        push.on('registration', function (data) {
sessionStorage.removeItem('device_id');
           sessionStorage.setItem("device_id", data.registrationId);

            var params = "registrationId=" + data.registrationId;
            params += "&device_platform=" + device.platform;
            params += "&client_token=" + sessionStorage.getItem("token");
            callAjaxx("registerMobile", params);
            
        });

        push.on('notification', function (data) {
            //alert(JSON.stringify(data));           
            if (data.additionalData.foreground) {
                //alert("when the app is active");

                playNotification();

                if (data.additionalData.additionalData.push_type == "order") {
             
                } else {
           
                }
            } else {
                //alert("when the app is not active");
                if (data.additionalData.additionalData.push_type == "order") {
                  
                } else {
               
                }
            }
            /*push.finish(function () {
                alert('finish successfully called');
            }); */
        });

        push.on('error', function (e) {
            //onsenAlert("push error");
        });

        push.finish(function () {
            //alert('finish successfully called');
        });

    }

    }



function isLogin() {
    if (!empty(getStorage("token"))) {
        return true;
    }
    return false;
}
function stopTrackInterval() {
    clearInterval(track_order_interval);
}

function runTrackOrder() {
    if ($('#page-track-order').is(':visible')) {
        dump("runTrackOrder");
        var params = 'order_id=' + $(".order_option_order_id").val();
        params += "&client_token=" + getStorage("token");
        callAjax("trackOrderHistory", params);
    } else {
        dump("stop runTrackOrder");
        stopTrackInterval();
    }
}
function showOrders() {
    if (isLogin()) {
        var options = {
            animation: 'slide',
            callback: function () {
                callAjax('getOrderHistory',"client_token=" + getStorage("token"))

            }
        };
        myNavigator.pushPage('orders.html',options);
    } else {

        myNavigator.pushPage("profile.html");
    }
}
function reOrder(order_id) {
    var params = "client_token=" + getStorage("token") + "&order_id=" + order_id;
    callAjax("reOrder", params);
}
function reOrder2() {
    reOrder($(".order_option_order_id").val());
}
function showTrackPage() {
    var options = {
        animation: 'slide',
        callback: function () {

            //$('.track-status-wrap').css('height', $(window).height() - $('.track-status-wrap').offset().top - 80  );

            var params = 'order_id=' + $(".order_option_order_id").val();
            params += "&client_token=" + getStorage("token");
            callAjax("trackOrderHistory", params);

            stopTrackInterval();
            //track_order_interval = setInterval(function(){runTrackOrder()}, 7000);

        }
    };
    myNavigator.pushPage("track-order.html", options);
}

function showOrderOptions(order_id) {
    dump(order_id);
    var options = {
        animation: 'none',
        callback: function () {
            $(".order_option_order_id").val(order_id);
        }
    };
    myNavigator.pushPage("order-options.html", options);
}
function showOrderDetails(order_id) {
    dump(order_id);
    var options = {
        animation: 'slide',
        callback: function () {
            var params = "client_token=" + getStorage("token") + "&order_id=" + order_id;
            callAjax("ordersDetails", params);
        }
    };
    myNavigator.pushPage("ordersDetails.html", options);
}

function showOrderDetails2() {
  
    showOrderDetails($(".order_option_order_id").val());
}



function displayOrderHistory(data) {
     var htm = '<ons-list>';
    $.each(data, function (key, val) {
        //htm+='<ons-list-item modifier="tappable" class="list-item-container" onclick="showOrderDetails('+val.order_id+');" >';
        htm += '<ons-list-item modifier="tappable" class="list-item-container" onclick="showOrderOptions(' + val.order_id + ');" >';
        htm += '<ons-row class="row">';
        htm += '<ons-col class="col-orders concat-text">';
        htm += val.title;
        htm += '</ons-col>';
        htm += '<ons-col class="col-order-stats center" width="98px">';
        htm += '<span class="notification concat-text ' + val.status_raw + ' ">' + val.status + '</span>';
        htm += '</ons-col>';
        htm += '</ons-row>';
        htm += '</ons-list-item>';
    });
    htm += '</ons-list>';
    createElement('recent-orders', htm);
}
//
function modalShow() {
    var modal = document.querySelector('ons-modal');
    modal.show();
}
function modalHide() {
    var modal = document.querySelector('ons-modal');
    modal.hide();
}
function saveCartToDb() {
    var mobile_save_cart_db = getStorage("mobile_save_cart_db");
    if (mobile_save_cart_db == 1) {
        return true;
    }
    return false;
}
function hideAllModal() {

    modalHide();
}


function reRunTrackOrder() {
    stopTrackInterval();
    track_order_interval = setInterval(function () {
        runTrackOrder()
    }, 7000);
}

function reRunTrackOrder2() {
    sNavigator.popPage({
        cancelIfRunning: true
    }); //back button
    stopTrackInterval();
    track_order_interval = setInterval(function () {
        runTrackOrder()
    }, 7000);
}

function stopTrackInterval() {
    clearInterval(track_order_interval);
}

function stopTrackMapInterval() {
    clearInterval(track_order_map_interval);
}

function runTrackMap() {
    if ($('#tracking-page').is(':visible')) {
        dump("runTrackMap");
        stopTrackMapInterval();
        var params = 'order_id=' + $(".order_option_order_id").val();
        params += "&client_token=" + getStorage("client_token");
        callAjax("trackOrderMap", params);
    } else {
        dump("stop runTrackMap");
        stopTrackMapInterval();
    }
}

function reInitTrackMap(data) {
    dump('reInitTrackMap');
    dump(data);
    var driver_lat = data.driver_lat;
    var driver_lng = data.driver_lng;

    var task_lat = data.task_lat;
    var task_lng = data.task_lng;

    if (isDebug()) {
        dump("driver location=>" + driver_lat + ":" + driver_lng);
        dump("task location=>" + task_lat + ":" + task_lng);
        return;
    }

    var driver_location = new plugin.google.maps.LatLng(driver_lat, driver_lng);
    var destination = new plugin.google.maps.LatLng(task_lat, task_lng);

    map.getCameraPosition(function (camera) {
        var data = ["Current camera position:\n",
					"latitude:" + camera.target.lat,
					"longitude:" + camera.target.lng,
					"zoom:" + camera.zoom,
					"tilt:" + camera.tilt,
					"bearing:" + camera.bearing].join("\n");

        //toastMsg(data);

        var camera_location = new plugin.google.maps.LatLng(camera.target.lat, camera.target.lng);

        map.clear();
        map.off();
        map.setCenter(camera_location);
        map.setZoom(camera.zoom);

        var data = [
            {
                'title': $(".driver_name").val(),
                'position': driver_location,
                'snippet': getTrans("Driver name", 'driver_name'),
                'icon': {
                    'url': $(".driver_icon").val()
                }
			}, {
                'title': $(".delivery_address").val(),
                'position': destination,
                'snippet': getTrans("Delivery Address", 'delivery_address'),
                'icon': {
                    'url': $(".address_icon").val()
                }
			}
		];

        addMarkers(data, function (markers) {

            map.addPolyline({
                points: [
					driver_location,
					destination
				],
                'color': '#AA00FF',
                'width': 10,
                'geodesic': true
            }, function (polyline) {

            });

        });

        stopTrackMapInterval();
        track_order_map_interval = setInterval(function () {
            runTrackMap()
        }, 9000);

    });
}
function setCartValue() {
    /*set the default total price based on selected price*/
    var selected_price = parseFloat($(".price:checked").val());
    var discount = parseFloat($(".discount_amt").val());
    if (isNaN(discount)) {
        discount = 0;
    }

    if (isNaN(selected_price)) {
        selected_price = 0;
    }

    dump("discount=>" + discount);
    dump("selected_price=>" + selected_price);
    var qty = parseFloat($(".qty").val());
    var total_value = qty * (selected_price - discount);

    //adon
    dump('addon totalx');
    var addon_total = 0;

    var addon_prices = [];

    $('#page-itemdisplay .sub_item:checkbox:checked').each(function () {
        var addo_price = explode("|", $(this).val());
        if ($(this).data("withqty") == 2) {
            var p = $(this).parent().parent().parent();
            var qtysub = parseFloat(p.find('.subitem-qty').val());

            addon_total += qtysub * parseFloat(addo_price[1]);
            //addon_prices.push(addon_total);
        } else {
            addon_total += qty * parseFloat(addo_price[1]);
            //addon_prices.push(addon_total);
        }
    });

    $('#page-itemdisplay .sub_item:radio:checked').each(function () {

        var addo_price = explode("|", $(this).val());

        dump(addo_price);
        dump(addo_price[1]);

        addon_total += qty * parseFloat(addo_price[1]);
        addon_prices.push(parseFloat(addo_price[1]));
    });

    total_value += addon_total;

    dump("total_value =>" + total_value);
    if ($(".two_flavors").val() == 2) {
        dump("two_flavors");
        dump(addon_prices);
        total_value = Math.max.apply(Math, addon_prices);
        dump('get the highest value => ' + total_value);
        total_value = parseInt($("#page-itemdisplay .qty").val()) * total_value;
    }

    //$(".total_value").html(  $(".currency_symbol").val() +" "+ total_value);
    $(".total_value").html(prettyPrice(total_value));
}
function addCartQty(bolean) {
    var qty = parseInt($("#page-itemdisplay .qty").val());
    if (bolean == 2) {
        qty = qty + 1;
    } else {
        qty = qty - 1;
    }
    if (qty > 1) {
        $("#page-itemdisplay .qty").val(qty)
    } else {
        $("#page-itemdisplay .qty").val(1)
    }
    setCartValue();
}
function explode(sep, string) {
    var res = string.split(sep);
    return res;
}

function getTrans(words, words_key) {
    var temp_dictionary = '';
    /*dump(words);
     dump(words_key);	*/
    if (getStorage("translation") != "undefined") {
        temp_dictionary = JSON.parse(getStorage("translation"));
    }
    if (!empty(temp_dictionary)) {
        //dump(temp_dictionary);
        var default_lang = getStorage("default_lang");
        //dump(default_lang);
        if (default_lang != "undefined" && default_lang != "") {
            //dump("OK");
            if (array_key_exists(words_key, temp_dictionary)) {
                //dump('found=>' + words_key +"=>"+ temp_dictionary[words_key][default_lang]);
                return temp_dictionary[words_key][default_lang];
            }
        }
    }
    return words;
}
function prettyPrice(price) {
    dump(price);

    var decimal_place = getStorage("decimal_place");
    var currency_position = getStorage("currency_position");
    var currency_symbol = getStorage("currency_set");

    var thousand_separator = getStorage("thousand_separator");
    var decimal_separator = getStorage("decimal_separator");

    dump("decimal_place=>" + decimal_place);
    dump("currency_symbol=>" + currency_symbol);
    dump("thousand_separator=>" + thousand_separator);
    dump("decimal_separator=>" + decimal_separator);
    dump("currency_position=>" + currency_position);

    price = number_format(price, decimal_place, decimal_separator, thousand_separator);

    if (currency_position == "left") {
        return currency_symbol + " " + price;
    } else {
        return price + " " + currency_symbol;
    }
}
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                    .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

function dump(data) {
    console.debug(data);
}
function setStorage(key, value) {
    sessionStorage.setItem(key, value);
}

function getStorage(key) {
    return sessionStorage.getItem(key);
}

function removeStorage(key) {
    sessionStorage.removeItem(key);
}
function createElement(elementId, elementvalue) {
    var content = document.getElementById(elementId);
    content.innerHTML = elementvalue;
    ons.compile(content);
}

function callAjax(action, params) {


    dump("action=>" + action);

    /*add language use parameters*/
    params += "&lang_id=" + getStorage("default_lang");

    params += "&api_key=fed7b441b349bae8f146711fbd215e90" ;


    dump(ajax_url + "/" + action + "?" + params);

    ajax_request = $.ajax({
        url: ajax_url + "/" + action,
        data: params,
        type: 'post',
        async: false,
        dataType: 'jsonp',
        timeout: 6000,
        crossDomain: true,
        beforeSend: function () {
            if (ajax_request != null) {
                /*abort ajax*/
                hideAllModal();
                ajax_request.abort();
            } else {
                /*show modal*/
                switch (action) {
                    case "registerMobile":
                        break;
                    case "search":
                        // loaderSearch.show();
                        modalShow()

                        translatePage();
                        break;
                    case "getLanguageSettings":
                        // loaderLang.show();
                       
                        modalShow()

                        break;
                    default:
                        // modalShow
                        modalShow()
                        break;
                }
            }
        },
        complete: function (data) {
            ajax_request = null;
            hideAllModal();
        },
        success: function (data) {
        

            if (data.code == 1) {
                switch (action) {
                           case "registerUsingFb":
                    case "login":
                        //onsenAlert(data.msg);
                        setStorage("token", data.details.token);

                        setStorage("avatar", data.details.avatar);
                        setStorage("client_name_cookie", data.details.client_name_cookie);

                        switch (data.details.next_steps) {
                            case "delivery":
                                var options = {
                                    animation: 'slide',
                                    callback: function () {
                                        displayMerchantLogo2(getStorage("merchant_logo"),
                                            getStorage("order_total"),
                                            'page-shipping');

                                        /*if (data.details.has_addressbook==2){
                                         $(".select-addressbook").css({"display":"block"});
                                         } else {
                                         $(".select-addressbook").hide();
                                         }*/


                                        if (!empty(data.details.contact_phone)) {
                                            $(".contact_phone").val(data.details.contact_phone);
                                        }
                                        if (!empty(data.details.location_name)) {
                                            $(".location_name").val(data.details.location_name);
                                        }

                                        if (!empty(getStorage("map_address_result_formatted_address"))) {
                                            $(".delivery-address-text").html(getStorage("map_address_result_formatted_address"));
                                            $(".street").val(getStorage("map_address_result_address"));
                                            $(".city").val(getStorage("map_address_result_city"));
                                            $(".state").val(getStorage("map_address_result_state"));
                                            $(".zipcode").val(getStorage("map_address_result_zip"));
                                            $(".formatted_address").val(getStorage("map_address_result_formatted_address"));

                                            $(".google_lat").val(getStorage("google_lat"));
                                            $(".google_lng").val(getStorage("google_lng"));
                                        } else {
                                            if (data.details.has_addressbook == 2) {

                                                $(".delivery-address-text").html(data.details.default_address.address);
                                                $(".street").val(data.details.default_address.street);
                                                $(".city").val(data.details.default_address.city);
                                                $(".state").val(data.details.default_address.state);
                                                $(".zipcode").val(data.details.default_address.zipcode);
                                                $(".formatted_address").val(data.details.default_address.address);

                                            }
                                        }
                                    }
                                };
                                myNavigator.pushPage("shipping.html", options);
                                break;

                            case "pickup":

                                var options = {
                                    animation: 'slide',
                                    callback: function () {
                                        displayMerchantLogo2(
                                            getStorage("merchant_logo"),
                                            getStorage("order_total"),
                                            'page-paymentoption'
                                        );
                                        var params = "merchant_id=" + getStorage("merchant_id");
                                        callAjax("getPaymentOptions", params);
                                    }
                                };
                                myNavigator.pushPage("paymentOption.html", options);

                                break;

                            default:
                                myNavigator.pushPage("restaurantlocnav.html")
                                break;
                        }
                        break;
                    case "bookTable":
                        var options = {
                            animation: 'slide',
                            callback: function () {
                                displayMerchantLogo2(
                                    getStorage("merchant_logo"),
                                    '',
                                    'page-booking-ty'
                                );

                                $(".book-ty-msg").html(data.msg);
                            }
                        };
                        myNavigator.pushPage("bookingTY.html", options);
                        break;

                    case "trackOrderHistory":

                        $(".track-status-wrap").html('');

                        $(".time-left").html(data.details.time_left);
                        $(".remaining").html(data.details.remaining);

                        if (data.details.history.length > 0) {
                            var html = '<ul>';
                            $.each(data.details.history, function (key, val) {
                                dump(val);
                                html += '<li>';
                                html += '<div class="s-c-g"></div>';
                                html += '<p>' + val.date_time + '</p>';
                                html += '<h3>' + val.status + '</h3>';
                                html += '</li>';
                            });
                            html += '</ul>';
                            $(".track-status-wrap").append(html);
                        }

                        if (data.details.assign_driver == 1) {
                            $(".track_driver").show();

                            $(".driver_lat").val(data.details.coordinates.driver_lat);
                            $(".driver_lng").val(data.details.coordinates.driver_lng);

                            $(".task_lat").val(data.details.coordinates.task_lat);
                            $(".task_lng").val(data.details.coordinates.task_lng);

                            $(".driver_name").val(data.details.driver_info.driver_name);
                            $(".driver_email").val(data.details.driver_info.driver_email);
                            $(".driver_phone").val(data.details.driver_info.driver_phone);
                            $(".transport_type").val(data.details.driver_info.transport_type);
                            $(".licence_plate").val(data.details.driver_info.licence_plate);
                            $(".delivery_address").val(data.details.delivery_address);

                            $(".driver_icon").val(data.details.driver_icon);
                            $(".address_icon").val(data.details.address_icon);
                            $(".driver_avatar").val(data.details.driver_avatar);

                        } else {
                            $(".track_driver").hide();

                            $(".driver_lat").val('');
                            $(".driver_lng").val('');

                            $(".task_lat").val('');
                            $(".task_lng").val('');

                            $(".driver_name").val('');
                            $(".driver_email").val('');
                            $(".driver_phone").val('');
                            $(".transport_type").val('');
                            $(".licence_plate").val('');
                            $(".delivery_address").val('');
                            $(".driver_avatar").val('');
                        }

                        stopTrackInterval();
                        track_order_interval = setInterval(function () {
                            runTrackOrder()
                        }, 7000);

                        break;

                    case "ordersDetails":
                        displayOrderHistoryDetails(data.details);
                        break;
                    case "reOrder":
                        setStorage("merchant_id", data.details.merchant_id)
                        cart = data.details.cart;
                        showCart();
                        break;
                    case "getLanguageSelection":
                        displayLanguageSelection(data.details);
                        break;

                    case "getItemDetails":
                        displayItem(data.details);
                         break;
                    case "getLanguageSettings":
                        setStorage("translation", JSON.stringify(data.details.translation));

                        dump(data);
                        /*set settings to storage*/
                        setStorage("decimal_place", data.details.settings.decimal_place);
                        setStorage("currency_position", data.details.settings.currency_position);
                        setStorage("currency_set", data.details.settings.currency_set);
                        setStorage("thousand_separator", data.details.settings.thousand_separator);
                        setStorage("decimal_separator", data.details.settings.decimal_separator);
                        setStorage("show_addon_description", data.details.settings.show_addon_description);

                        var device_set_lang = getStorage("default_lang");
                        dump("device_set_lang=>" + device_set_lang);

                        if (empty(device_set_lang)) {
                            dump('proceed');
                            if (!empty(data.details.settings.default_lang)) {
                                setStorage("default_lang", data.details.settings.default_lang);
                            } else {
                                setStorage("default_lang", "");
                            }
                        }

                        /*single food item*/
                        setStorage('single_add_item', data.details.settings.single_add_item);

                        /*pts*/
                        setStorage("pts", data.details.settings.pts);

                        /*facebook_flag*/
                        setStorage("facebook_flag", data.details.settings.facebook_flag);

                        /*avatar*/
                        setStorage("avatar", data.details.settings.avatar);
                        setStorage("client_name_cookie", data.details.settings.client_name_cookie);
                        setStorage("mobile_country_code", data.details.settings.mobile_country_code);

                        setStorage("from_icon", data.details.settings.map_icons.from_icon);
                        setStorage("destination_icon", data.details.settings.map_icons.destination_icon);

                        setStorage("mobile_save_cart_db", data.details.settings.mobile_save_cart_db);

                        translatePage();
                        break;
                    case "applyVoucher":
                        dump(data.details);
                        $(".voucher_amount").val(data.details.amount);
                        $(".voucher_type").val(data.details.voucher_type);

                        $(".apply-voucher").hide();
                        $(".remove-voucher").css({
                            "display": "block"
                        });

                        $(".voucher-header").html(data.details.less);

                        var new_total = data.details.new_total;
                        $(".total-amount").html(prettyPrice(new_total));

                        break;

                    case "placeOrder":

                        setStorage("order_id", data.details.order_id);

                        switch (data.details.next_step) {

                            case "paypal_init":

                                setStorage("currency_code", data.details.payment_details.currency_code);
                                setStorage("paymet_desc", data.details.payment_details.paymet_desc);
                                setStorage("total_w_tax", data.details.payment_details.total_w_tax);

                                app_paypal.initPaymentUI();
                                break;

                            case "atz_init":
                                var options = {
                                    animation: 'slide',
                                    callback: function () {
                                        $(".order_id").val(data.details.order_id);
                                        $(".currency_code").val(data.details.payment_details.currency_code);
                                        $(".paymet_desc").val(data.details.payment_details.paymet_desc);
                                        $(".total_w_tax").val(data.details.payment_details.total_w_tax);
                                    }
                                };
                                myNavigator.pushPage("atzPaymentForm.html", options);
                                break;


                            case "stp_init":
                                var options = {
                                    animation: 'slide',
                                    callback: function () {
                                        $(".order_id").val(data.details.order_id);
                                        $(".currency_code").val(data.details.payment_details.currency_code);
                                        $(".paymet_desc").val(data.details.payment_details.paymet_desc);
                                        $(".total_w_tax").val(data.details.payment_details.total_w_tax);
                                    }
                                };
                                myNavigator.pushPage("stripePaymentForm.html", options);
                                break;

                            case "rzr_init":

                                var razor_key_id = getStorage("razor_key_id");

                                if (empty(razor_key_id)) {
                                    onsenAlert(getTrans("Key id is empty", "key_id_empty"));
                                    return;
                                }

                                var rzr_options = {
                                    description: data.details.payment_details.paymet_desc,
                                    currency: data.details.payment_details.currency_code,
                                    key: razor_key_id,
                                    amount: data.details.payment_details.total_w_tax_times,
                                    name: data.details.payment_details.merchant_name,
                                    prefill: {
                                        email: data.details.payment_details.customer_email,
                                        contact: data.details.payment_details.customer_contact,
                                        name: data.details.payment_details.customer_name
                                    },
                                    theme: {
                                        color: data.details.payment_details.color
                                    }
                                };

                                dump(rzr_options);

                                if (isDebug()) {
                                    rzr_successCallback('pay_debug_1234566');
                                } else {
                                    RazorpayCheckout.open(rzr_options, rzr_successCallback, rzr_cancelCallback);
                                }

                                break;

                            default:
                                var options = {
                                    animation: 'slide',
                                    callback: function () {
                                        /*displayMerchantLogo2( getStorage("merchant_logo") ,
                                         getStorage("order_total") ,
                                         'page-receipt');*/
                                        displayMerchantLogo2(getStorage("merchant_logo"),
                                            data.details.payment_details.total_w_tax_pretty,
                                            'page-receipt');
                                        $(".receipt-msg").html(data.msg);
                                    }
                                };
                                myNavigator.pushPage("receipt.html", options);

                                break;
                        }
                        break;


                    case "getAddressBookDialog":
                        displayAddressBookPopup(data.details);
                        break;

                    case "applyRedeemPoints":

                        $(".pts_redeem_points").val(data.details.pts_points_raw);
                        $(".pts_redeem_amount").val(data.details.pts_amount_raw);
                        $(".pts_points_label").html(data.details.pts_points + " (" + data.details.pts_amount + ")");
                        $(".pts_pts").hide();
                        $(".pts_pts_cancel").css({
                            "display": "block"
                        });


                        var new_total = data.details.new_total;
                        dump('compute new total for pts');

                        $(".total-amount").html(prettyPrice(new_total));

                        break;


                    case "loadCart":
                        $("#page-cart .wrapper").show();
                        $(".checkout-footer").show();
                        $("#page-cart .frm-cart").show();

                        /*tips*/
                        if (data.details.enabled_tip == 2) {
                            $(".tip_amount_wrap").show();
                        } else {
                            $(".tip_amount_wrap").hide();
                        }
                      
                        displayCart(data.details);
                        

                        if (!empty(data.details.cart.discount)) {
                            setStorage("has_discount", 1);
                        } else {
                            removeStorage("has_discount");
                        }

                        if (typeof addressDialog === "undefined" || addressDialog == null || addressDialog == "") {} else {
                            if (addressDialog.isShown()) {
                                addressDialog.hide();
                            }
                        }

                        break;
                                  case "coordinatesToAddress":

                        var your_location = new plugin.google.maps.LatLng(data.details.lat, data.details.lng);

                        var marker_title = '';
                        marker_title += data.details.result.formatted_address;

                        setStorage("map_address_result_address", data.details.result.address);
                        setStorage("map_address_result_city", data.details.result.city);
                        setStorage("map_address_result_state", data.details.result.state);
                        setStorage("map_address_result_zip", data.details.result.zip);
                        setStorage("map_address_result_country", data.details.result.country);
                        setStorage("map_address_result_formatted_address", data.details.result.formatted_address);

                        setStorage("google_lat", data.details.lat);
                        setStorage("google_lng", data.details.lng);

                        map_search.addMarker({
                            'position': your_location,
                            'title': marker_title,
                            'snippet': getTrans("Press on marker 2 seconds to drag", 'press_marker'),
                            'draggable': true
                        }, function (marker) {

                            marker.showInfoWindow();
                            if (drag_marker_bounce == 1) {
                                marker.setAnimation(plugin.google.maps.Animation.BOUNCE);
                            }

                            drag_marker = marker;
                            drag_marker_bounce = 2;

                            marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function (marker) {
                                marker.getPosition(function (latLng) {
                                    temp_result = explode(",", latLng.toUrlValue());
                                    /*alert(temp_result[0]);
								 alert(temp_result[1]);*/
                                    drag_marker = marker;
                                    callAjax("dragMarker", "lat=" + temp_result[0] + "&lng=" + temp_result[1]);
                                });
                            });

                        }); /*marker*/
                        break;

                    case "dragMarker":

                        setStorage("map_address_result_address", data.details.result.address);
                        setStorage("map_address_result_city", data.details.result.city);
                        setStorage("map_address_result_state", data.details.result.state);
                        setStorage("map_address_result_zip", data.details.result.zip);
                        setStorage("map_address_result_country", data.details.result.country);
                        setStorage("map_address_result_formatted_address", data.details.result.formatted_address);

                        setStorage("google_lat", data.details.lat);
                        setStorage("google_lng", data.details.lng);

                        drag_marker.setTitle(data.details.result.formatted_address);
                        drag_marker.showInfoWindow();
                        break;
                    case "getPaymentOptions":
                        $(".frm-paymentoption").show();
                        $(".paypal_flag").val(data.details.paypal_flag);
                        $(".paypal_mode").val(data.details.paypal_credentials.mode);
                        $(".client_id_sandbox").val(data.details.paypal_credentials.client_id_sandbox);
                        $(".client_id_live").val(data.details.paypal_credentials.client_id_live);

                        $(".paypal_card_fee").val(data.details.paypal_credentials.card_fee);
                        setStorage("paypal_card_fee", data.details.paypal_credentials.card_fee);

                        if (data.details.voucher_enabled == "yes") {
                            $(".voucher-wrap").show();
                            $(".voucher_code").attr("placeholder", getTrans("Enter Voucher here", 'enter_voucher_here'));
                        } else {
                            $(".voucher-wrap").hide();
                        }

                        /*set stripe key*/
                        setStorage("stripe_publish_key", data.details.stripe_publish_key);
                        setStorage("stripe_publish_key", data.details.stripe_publish_key);

                        /*set razor pay*/
                        if (!empty(data.details.razorpay)) {
                            setStorage("razor_key_id", data.details.razorpay.razor_key);
                            setStorage("razor_secret_key", data.details.razorpay.razor_secret);
                        }

                        /*pts*/
                        if (getStorage("pts") == 2) {
                            dump('pts is enabled');
                            $(".redeem_points").attr("placeholder", data.details.pts.pts_label_input);
                            $(".pts_available_points").html(data.details.pts.balance);
                        } else {
                            $(".pts-apply-points-wrap").hide();
                        }

                        displayPaymentOptions(data);
                        break;

                    case "checkout":
                        if (data.details == "shipping") {
                            var options = {
                                animation: 'slide',
                                callback: function () {
                                    displayMerchantLogo2(getStorage("merchant_logo"),
                                        getStorage("order_total"),
                                        'page-shipping');



                                    /*if (data.msg.length>0){
                                     $(".select-addressbook").css({"display":"block"});
                                     } else $(".select-addressbook").hide();*/

                                    if (!empty(data.msg.profile)) {
                                        $(".contact_phone").val(data.msg.profile.contact_phone);
                                        $(".location_name").val(data.msg.profile.location_name);
                                    }

                                    if (!empty(getStorage("map_address_result_formatted_address"))) {
                                        $(".delivery-address-text").html(getStorage("map_address_result_formatted_address"));
                                        $(".street").val(getStorage("map_address_result_address"));
                                        $(".city").val(getStorage("map_address_result_city"));
                                        $(".state").val(getStorage("map_address_result_state"));
                                        $(".zipcode").val(getStorage("map_address_result_zip"));
                                        $(".formatted_address").val(getStorage("map_address_result_formatted_address"));

                                        $(".google_lat").val(getStorage("google_lat"));
                                        $(".google_lng").val(getStorage("google_lng"));
                                    } else {
                                        if (!empty(data.msg.address_book)) {
                                            $(".street").val(data.msg.address_book.street);
                                            $(".city").val(data.msg.address_book.city);
                                            $(".state").val(data.msg.address_book.state);
                                            $(".zipcode").val(data.msg.address_book.zipcode);
                                            $(".location_name").val(data.msg.address_book.location_name);


                                            var complete_address = data.msg.address_book.street;
                                            complete_address += " " + data.msg.address_book.city;
                                            complete_address += " " + data.msg.address_book.state;
                                            complete_address += " " + data.msg.address_book.zipcode;

                                            $(".delivery-address-text").html(complete_address);
                                            $(".formatted_address").val(complete_address);
                                        }
                                    }

                                } /*end transition*/
                            };
                            myNavigator.pushPage("shipping.html", options);

                        } else if (data.details == "payment_method") {

                            var options = {
                                animation: 'slide',
                                callback: function () {
                                    displayMerchantLogo2(
                                        getStorage("merchant_logo"),
                                        getStorage("order_total"),
                                        'page-paymentoption'
                                    );
                                    var params = "merchant_id=" +  sessionStorage.getItem('merchant_id');
                                    params += "&client_token=" + getStorage("token");
                                    params += "&transaction_type=" + $(".transaction_type:checked").val();
                                    callAjax("getPaymentOptions", params);
                                }
                            };
                            myNavigator.pushPage("paymentOption.html", options);

                        } else if (data.details == "enter_contact_number") {

                            var options = {
                                animation: 'slide',
                                callback: function () {
                                    initIntelInputs();
                                }
                            };
                            myNavigator.pushPage("enterContact.html", options);

                        } else {
                            var options = {
                                animation: 'slide',
                                callback: function () {
                                    dump(getStorage("merchant_logo"));
                                    dump(getStorage("order_total"));
                                    displayMerchantLogo2(getStorage("merchant_logo"),
                                        getStorage("order_total"),
                                        'page-checkoutsignup');

                                    callAjax("getCustomFields", '');
                                    initIntelInputs();
                                }
                            };
                            sessionStorage.removeItem('cartLogin')
                            sessionStorage.setItem('cartLogin',getStorage("transaction_type"))
                            myNavigator.pushPage("cartcreate_account.html", options);
                        }
                        break;
                    case "getOrderHistory":
                        displayOrderHistory(data.details);

                        break;
                    case "getSettings":
                        if (data.details.enabled_push == 1) {
                            // enabled_push.setChecked(true);
                        } else {
                            // enabled_push.setChecked(false);
                        }
                        $(".country_code_set").val(data.details.country_code_set);

                        var device_id = getStorage("device_id");
                        $(".device_id_val").html(device_id);
                        break;

                    case "getPaymentOptions":
                        $(".frm-paymentoption").show();
                        $(".paypal_flag").val(data.details.paypal_flag);
                        $(".paypal_mode").val(data.details.paypal_credentials.mode);
                        $(".client_id_sandbox").val(data.details.paypal_credentials.client_id_sandbox);
                        $(".client_id_live").val(data.details.paypal_credentials.client_id_live);

                        $(".paypal_card_fee").val(data.details.paypal_credentials.card_fee);
                        setStorage("paypal_card_fee", data.details.paypal_credentials.card_fee);

                        if (data.details.voucher_enabled == "yes") {
                            $(".voucher-wrap").show();
                            $(".voucher_code").attr("placeholder", getTrans("Enter Voucher here", 'enter_voucher_here'));
                        } else {
                            $(".voucher-wrap").hide();
                        }

                        /*set stripe key*/
                        setStorage("stripe_publish_key", data.details.stripe_publish_key);
                        setStorage("stripe_publish_key", data.details.stripe_publish_key);

                        /*set razor pay*/
                        if (!empty(data.details.razorpay)) {
                            setStorage("razor_key_id", data.details.razorpay.razor_key);
                            setStorage("razor_secret_key", data.details.razorpay.razor_secret);
                        }

                        /*pts*/
                        if (getStorage("pts") == 2) {
                            dump('pts is enabled');
                            $(".redeem_points").attr("placeholder", data.details.pts.pts_label_input);
                            $(".pts_available_points").html(data.details.pts.balance);
                        } else {
                            $(".pts-apply-points-wrap").hide();
                        }

                        displayPaymentOptions(data);
                        break;

                }

                /* end ok conditions*/
            } else {
                /*failed condition*/


                dump('failed condition');
                switch (action) {

                    case "search":
                        $(".result-msg").text(data.msg);
                        createElement('restaurant-results', '');
                        break;

                    case "getItemByCategory":
                        onsenAlert(data.msg);
                        displayMerchantInfo(data.details);
                        //myNavigator.popPage({cancelIfRunning: true});	back button
                        break;

                    case "loadCart":
                    /*    displayMerchantLogo(data.details, 'page-cart');
                        //onsenAlert(data.msg);
                        toastMsg(data.msg);*/
                        myNavigator.pushPage('basket.html')
/*
                        $("#page-cart .wrapper").hide();
                        $("#page-cart .frm-cart").hide();
                        $(".checkout-footer").hide();
                        showCartNosOrder();*/
                        break;
                    case "getPaymentOptions":
                        if (data.details == 3) {
                            onsenAlert(data.msg);
                            myNavigator.popPage({
                                cancelIfRunning: true
                            });
                        } else {
                            $(".frm-paymentoption").hide();
                            onsenAlert(data.msg);
                        }
                        break;

                    case "browseRestaurant":
                        createElement('browse-results', '');
                        $(".result-msg").text(data.msg);
                        break;

                    case "getProfile":
                        dump('show login form')
                        menu.setMainPage('prelogin.html', {
                            closeMenu: true
                        });
                        break;

                    case "getAddressBook":
                        //onsenAlert(data.msg);
                        createElement('address-book-list', '');
                        if (data.code == 3) {
                            menu.setMainPage('prelogin.html', {
                                closeMenu: true
                            });
                        }
                        break;



                    case "registerMobile":
                    case "getLanguageSettings":
                        /*silent */
                        break;


                    case "getSettings":
                        var device_id = getStorage("device_id");
                        $(".device_id_val").html(device_id);
                        break;


                    /*silent*/
                    case "addToCart":
                    case "getCustomFields":
                        break;

                    case "merchantReviews":
                    case "saveContactNumber":
                    case "coordinatesToAddress":
                    case "trackOrderMap":
                        toastMsg(data.msg);
                        break;

                    case "getMerchantCClist":
                        toastMsg(data.msg);
                        $("#cc-list").html('');
                        break;

                    case "trackOrderHistory":
                    case "loadCC":
                        myNavigator.popPage({
                            cancelIfRunning: true
                        }); //back button
                        break;

                    default:
                        onsenAlert(data.msg);
                        break;
                }
            }

        },
        error: function (request, error) {
            hideAllModal();
            if (action == "getLanguageSettings" || action == "registerMobile") {} else {
                //onsenAlert( getTrans("Network error has occurred please try again!",'network_error') );
                toastMsg(getTrans("Network error has occurred please try again!", 'network_error'));
            }
        }
    });
}
function initIntelInputs() {
    var mobile_country_code = getStorage("mobile_country_code");
    dump(mobile_country_code);
    if (!empty(mobile_country_code)) {
        $(".mobile_inputs").intlTelInput({
            autoPlaceholder: false,
            defaultCountry: mobile_country_code,
            autoHideDialCode: true,
            nationalMode: false,
            autoFormat: false,
            utilsScript: "lib/intel/lib/libphonenumber/build/utils.js"
        });
    } else {
        $(".mobile_inputs").intlTelInput({
            autoPlaceholder: false,
            autoHideDialCode: true,
            nationalMode: false,
            autoFormat: false,
            utilsScript: "lib/intel/lib/libphonenumber/build/utils.js"
        });
    }
}

function onsenAlert(message, dialog_title) {
    if (typeof dialog_title === "undefined" || dialog_title == null || dialog_title == "") {
        dialog_title = dialog_title_default;
    }
    ons.notification.alert({
        message: message,
        title: dialog_title
    });
}
function displayOrderHistoryDetails(data) {

    $("#page-orderdetails .title").html(getTrans('Total', 'total') + " : " + data.total);
    $("#page-orderdetails #search-text").html(getTrans('Order Details', 'order_details') + " #" + data.order_id);


    var htm = '<ons-list-header class="center trn" data-trn-key="items" >Items</ons-list-header>';
    if (data.item.length > 0) {
        $.each(data.item, function (key, val) {
            htm += '<ons-list-item class="center">' + val.item_name + '</ons-list-item> ';
        });
    } else {
        htm += '<ons-list-item class="center">';
        htm += 'no item found';
        htm += '</ons-list-item>';
    }
    createElement('item-details', htm);

    var htm = '<ons-list-header class="center trn" data-trn-key="status_history">Status History</ons-list-header>';
    if (data.history_data.length > 0) {
        $.each(data.history_data, function (key, val) {
            dump(val);
            htm += '<ons-list-item>';
            htm += '<ons-row class="row">';
            htm += '<ons-col class="" width="40%">';
            htm += val.date_created;
            htm += '</ons-col>';
            htm += '<ons-col class="padding-left5" width="30%">';
            htm += val.status;
            htm += '</ons-col>';
            htm += '<ons-col class="padding-left5"  width="25%">';
            htm += val.remarks;
            htm += '</ons-col>';
            htm += '</ons-row>';
            htm += '</ons-list-item>';
        });
    } else {
        htm += '<ons-list-item class="center">';
        htm += 'No history found';
        htm += '</ons-list-item>';
    }
    createElement('item-history', htm);

    if (data.order_from.request_from == "mobile_app") {
        var html = '<button class="button green-btn button--large trn" onclick="reOrder(' + data.order_id + ');" data-trn-key="click_here_to_reorder" >';
        html += 'Click here to Re-order';
        html += '<div class="search-btn"><ons-icon icon="ion-forward"></ons-icon></div>';
        html += '</button>';
        createElement('re-order-wrap', html);
    }

 }

function displayCart(data) {
  
    // display merchant logo
    displayMerchantLogo(data, 'page-cart');

    var htm = '';

    htm += '<input type="hidden" name="validation_msg" class="validation_msg" value="' + data.validation_msg + '">';
    htm += '<input type="hidden" name="required_time" class="required_time" value="' + data.required_time + '">';

    /*set storage merchant logo*/
    setStorage("merchant_logo", data.merchant_info.logo);
    setStorage("order_total", data.cart.grand_total.amount_pretty);

    setStorage("order_total_raw", data.cart.grand_total.amount);
    setStorage("cart_currency_symbol", data.currency_symbol);

    /*for pts computation refference*/
    setStorage("cart_sub_total", data.cart.sub_total.amount);
    if (!empty(data.cart.delivery_charges)) {
        setStorage("cart_delivery_charges", data.cart.delivery_charges.amount);
    }
    if (!empty(data.cart.packaging)) {
        setStorage("cart_packaging", data.cart.packaging.amount);
    }
    if (!empty(data.cart.tax)) {
        //setStorage("cart_tax_amount", data.cart.tax.amount );
        setStorage("cart_tax", data.cart.tax.tax);
    }

    if (!empty(data.delivery_date)) {
        $(".delivery_date").val(data.delivery_date);
    }

    if (!empty(data.cart)) {

        if (!empty(data.cart.grand_total.amount_pretty)) {
            $(".total-amount").html(data.cart.grand_total.amount_pretty);
        }

        var xx = 1;
        $.each(data.cart.cart, function (key, val) {
            if (val.discount > 0) {
                htm += tplCartRowNoBorder(
                    val.item_id,
                    val.item_name,
                    val.price + '|' + val.size,
                    val.total_pretty,
                    val.qty,
                    'price',
                    val.size,
                    xx,
                    val.discounted_price,
                    val.discount
                );

            } else {
                htm += tplCartRowNoBorder(
                    val.item_id,
                    val.item_name,
                    val.price + '|' + val.size,
                    val.total_pretty,
                    val.qty,
                    'price',
                    val.size,
                    xx,
                    val.price,
                    val.discount
                );
            }

            if (!empty(val.order_notes)) {
                htm += tplCartRowHiddenFields(val.order_notes,
                    val.order_notes,
                    'order_notes',
                    xx,
                    'row-no-border');
            }

            if (!empty(val.cooking_ref)) {
                htm += tplCartRowHiddenFields(val.cooking_ref,
                    val.cooking_ref,
                    'cooking_ref',
                    xx,
                    'row-no-border');
            }

            if (!empty(val.ingredients)) {
                htm += '<ons-list-header class="subitem-row' + xx + '">Ingredients</ons-list-header>';
                $.each(val.ingredients, function (key_ing, val_ing) {
                    htm += tplCartRowHiddenFields(val_ing, val_ing, 'ingredients', xx, 'row-no-border');
                });
            }

            /*if (!empty(val.sub_item)){
             var x=0
             $.each( val.sub_item , function( key_sub, val_sub ) {
             if (x==0){
             htm+='<ons-list-header>'+val_sub.category_name+'</ons-list-header>';
             }
             htm+=tplCartRowNoBorderSub(
             val_sub.sub_item_id,
             val_sub.sub_item_name,
             val_sub.price,
             val_sub.total_pretty,
             val_sub.qty ,
             'sub_item',
             xx
             );
             x++;
             });
             }*/

            /*sub item*/
            if (!empty(val.sub_item)) {
                var x = 0;
                $.each(val.sub_item, function (key_sub, val_sub) {
                    htm += '<ons-list-header class="subitem-row' + xx + '">' + key_sub + '</ons-list-header>';
                    $.each(val_sub, function (key_sub2, val_sub2) {
                        dump(val_sub2);
                        if (val_sub2.qty == "itemqty") {
                            subitem_qty = val.qty;
                        } else {
                            subitem_qty = val_sub2.qty;
                        }

                        htm += tplCartRowNoBorderSub(
                            val_sub2.subcat_id,
                            val_sub2.sub_item_id,
                            val_sub2.sub_item_name,
                            val_sub2.price,
                            val_sub2.total_pretty,
                            subitem_qty,
                            val_sub2.qty,
                            xx
                        );
                        x++;
                    });
                });
            }

            htm += '<ons-list-item class="grey-border-top line-separator"></ons-list-item>';
            xx++;
        });

        htm += '<ons-list-item class="line-separator"></ons-list-item>';

        if (!empty(data.cart.discount)) {
            htm += tplCartRow(data.cart.discount.display, '(' + data.cart.discount.amount_pretty + ')', 'price-normal');
        }
        if (!empty(data.cart.sub_total)) {
            htm += tplCartRow(getTrans('Sub Total', 'sub_total'), data.cart.sub_total.amount_pretty, 'price-normal');
        }
        if (!empty(data.cart.delivery_charges)) {
            htm += tplCartRow(getTrans('Delivery Fee', 'delivery_fee'), data.cart.delivery_charges.amount_pretty, 'price-normal');
        }
        if (!empty(data.cart.packaging)) {
            htm += tplCartRow(getTrans('Packaging', 'packaging'), data.cart.packaging.amount_pretty, 'price-normal');
        }
        if (!empty(data.cart.tax)) {
            htm += tplCartRow(data.cart.tax.tax_pretty, data.cart.tax.amount, 'price-normal');
        }

        if (!empty(data.cart.tips)) {
            htm += tplCartRow(data.cart.tips.tips_percentage_pretty, data.cart.tips.tips_pretty, 'price-normal');
            $(".tip_amount").removeClass("trn");
            $(".tip_amount").html(data.cart.tips.tips_percentage_pretty);
        } else {
            $(".tip_amount").addClass("trn");
            $(".tip_amount").html(getTrans("Tip Amount", "tip_amount"));
        }

        if (!empty(data.cart.grand_total)) {
            htm += tplCartRow('<b class="trn" data-trn-key="total">Total</b>', data.cart.grand_total.amount_pretty);
        }

    }

    var transaction_type = getStorage("transaction_type");
    if (empty(transaction_type)) {
        transaction_type = 'delivery';
    }
    dump("transaction_type=>" + transaction_type);
    setStorage('transaction_type', transaction_type);

    htm += '<ons-list-header class="trn" data-trn-key="delivery_options">Delivery Options</ons-list-header>';
    /*htm+=privateRowWithRadio('transaction_type','delivery','Delivery');
     htm+=privateRowWithRadio('transaction_type','pickup','Pickup');*/

    /*fixed transaction type*/

    dump("services =>" + data.merchant_info.service);

    switch (data.merchant_info.service) {
        case 2:
        case "2":
            htm += privateRowWithRadio('transaction_type', 'delivery', getTrans('Delivery', 'delivery'));
            break;

        case 3:
        case "3":
            transaction_type = 'pickup';
            setStorage('transaction_type', transaction_type);
            htm += privateRowWithRadio('transaction_type', 'pickup', getTrans('Pickup', 'pickup'));
            break;

        default:
            htm += privateRowWithRadio('transaction_type', 'delivery', getTrans('Delivery', 'delivery'));
            htm += privateRowWithRadio('transaction_type', 'pickup', getTrans('Pickup', 'pickup'));
            break;
    }

    createElement('cart-item', htm);

    //$('.transaction_type[value="' + transaction_type + '"]').prop('checked', true);
    $.each($(".transaction_type"), function () {
        if ($(this).val() == transaction_type) {
            $(this).attr("checked", true);
        }
    });

    if (transaction_type == "delivery") {
        $(".delivery_time").attr("placeholder", getTrans("Delivery Time", 'delivery_time'));
        $(".delivery_asap_wrap").show();
    } else {
        $(".delivery_time").attr("placeholder", getTrans("Pickup Time", 'pickup_time'));
        $(".delivery_asap_wrap").hide();
    }


    /*loyalty points*/
    if (data.has_pts == 2) {
        setStorage("earned_points", data.points);
        $(".pts_earn_label").show();
        $(".pts_earn_label").html(data.points_label);
    } else {
        $(".pts_earn_label").hide();
        removeStorage("earned_points");
    }

    initMobileScroller();
    translatePage();
}
function displayLanguageSelection(data) {
    var selected = getStorage("default_lang");
    dump("selected=>" + selected);
    var htm = '';
    htm += '<ons-list>';
    htm += '<ons-list-header class="list-header trn" data-trn-key="language">Language</ons-list-header>';
    $.each(data, function (key, val) {
        dump(val.lang_id);
        ischecked = '';
        if (val.lang_id == selected) {
            ischecked = 'checked="checked"';
        }
        htm += '<ons-list-item modifier="tappable" onclick="setLanguage(' + "'" + val.lang_id + "'" + ');">';
        htm += '<label class="radio-button checkbox--list-item">';
        htm += '<input type="radio" name="country_code" class="country_code" value="' + val.lang_id + '" ' + ischecked + ' >';
        htm += '<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
        htm += ' ' + val.language_code;
        htm += '</label>';
        htm += '</ons-list-item>';
    });
    htm += '</ons-list>';
    createElement('language-options-list', htm);
    translatePage();
}

function setLanguage(lang_id) {
    //removeStorage("translation");
    dump(getStorage("translation"));
    if (typeof getStorage("translation") === "undefined" || getStorage("translation") == null || getStorage("translation") == "") {
        languageOptions.hide();
        ons.notification.confirm({
            message: 'Language file has not been loaded, would you like to reload?',
            title: dialog_title_default,
            buttonLabels: ['Yes', 'No'],
            animation: 'none',
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function (index) {
                if (index == 0 || index == "0") {
                    getLanguageSettings();
                }
            }
        });
        return;
    }

    if (getStorage("translation").length <= 5) {
        onsenAlert("Translation file is not yet ready.");
        return;
    }

    if (!empty(lang_id)) {
        setStorage("default_lang", lang_id);
        if (!empty(translator)) {
            translator.lang(lang_id);
        } else {
            translator = $('body').translate({
                lang: lang_id,
                t: dictionary
            });
        }
    }
}
function hasConnection() {
    if (isDebug()) {
        return true;
    }
    //networkState = navigator.network.connection.type;

}

function getLanguageSettings() {
    if (!hasConnection()) {
        return;
    }
    var params = "&client_token=" + getStorage("client_token");
    callAjax("getLanguageSettings", params);
}
function displayItem(data) {

    setStorage("currency_set", data.currency_symbol);

  
    $("#page-itemdisplay .item-header").css({
        'background-image': 'url(' + data.photo + ')'
    });

    $("#page-itemdisplay .title").text(data.item_name);
    $("#page-itemdisplay .description").text(data.item_description);


    if (!empty(data.category_info)) {
        $("#page-itemdisplay #search-text").text(data.category_info.category_name);
    }

    var htm = '';

    htm += '<input type="hidden" name="item_id" class="item_id" value="' + data.item_id + '">';
    htm += '<input type="hidden" name="currency_symbol" class="currency_symbol" value="' + data.currency_symbol + '">';
    htm += '<input type="hidden" name="discount" class="discount discount_amt" value="' + data.discount + '">';

    htm += '<input type="hidden" name="two_flavors" class="two_flavors" value="' + data.two_flavors + '">';

    if (data.two_flavors == 2) {
        data.has_price = 1;
    }

    if (data.has_price == 2) {
        htm += '<ons-list-header class="list-header trn" data-trn-key="price">Price</ons-list-header>';
        var x = 0
        $.each(data.prices, function (key, val) {
            if (data.discount > 0) {
                var discount_price = '<price class="discount">' + val.pretty_price;
                discount_price += '</price>';
                discount_price += '<price>' + val.discounted_price_pretty + '</price>';
                if (x == 0) {
                    htm += privatePriceRowWithRadio2('price',
                        val.price + '|' + val.size,
                        val.size,
                        discount_price,
                        'checked="checked"');
                } else {
                    htm += privatePriceRowWithRadio2('price',
                        val.price + '|' + val.size,
                        val.size,
                        discount_price);
                }
            } else {
                if (x == 0) {
                    htm += privatePriceRowWithRadio('price',
                        val.price + '|' + val.size,
                        val.size,
                        val.pretty_price,
                        'checked="checked"');
                } else {
                    htm += privatePriceRowWithRadio('price',
                        val.price + '|' + val.size,
                        val.size,
                        val.pretty_price);
                }
            }
            x++;
        });
    }

    if (!empty(data.cooking_ref)) {
        htm += '<ons-list-header class="list-header trn" data-trn-key="cooking_ref">Cooking Preference</ons-list-header>';
        $.each(data.cooking_ref, function (key, val) {
            htm += privateRowWithRadio('cooking_ref', val, val);
        });
    }

    if (!empty(data.ingredients)) {
        htm += '<ons-list-header class="list-header trn" data-trn-key="ingredients">Ingredients</ons-list-header>';
        $.each(data.ingredients, function (key, val) {
            htm += privateRowWithCheckbox('ingredients', 'ingredients', val, val);
        });
    }

    var show_addon_description = getStorage("show_addon_description");

    if (!empty(data.addon_item)) {
        $.each(data.addon_item, function (key, val) {
            htm += '<ons-list-header class="list-header require_addon_' + val.subcat_id + ' ">' + val.subcat_name + '</ons-list-header>';

            htm += '<input type="hidden" name="require_addon_' + val.subcat_id + '" class="require_addon" value="' + val.require_addons + '" data-id="' + val.subcat_id + '" data-name="' + val.subcat_name + '" >'

            if (!empty(val.sub_item)) {
                $.each(val.sub_item, function (key2, val2) {
                    if (val.multi_option == "custom") {
                        htm += subItemRowWithCheckbox(
                            val.subcat_id,
                            'sub_item',
                            val2.sub_item_id + "|" + val2.price + "|" + val2.sub_item_name,
                            val2.sub_item_name,
                            val2.pretty_price,
                            val.multi_option_val,
                            val2.item_description
                        );

                    } else if (val.multi_option == "multiple") {
                        htm += subItemRowWithCheckboxQty(
                            val.subcat_id,
                            'sub_item',
                            val2.sub_item_id + "|" + val2.price + "|" + val2.sub_item_name,
                            val2.sub_item_name,
                            val2.pretty_price);


                        if (show_addon_description == 1) {
                            if (!empty(val2.item_description)) {
                                htm += '<div class="addon_description small-font-dim">' + val2.item_description + '</div>';
                            }
                        }

                    } else {
                        htm += subItemRowWithRadio(
                            val.subcat_id,
                            "sub_item",
                            //val2.sub_item_id+"|"+val2.price + "|"+val2.sub_item_name  ,
                            val2.sub_item_id + "|" + val2.price + "|" + val2.sub_item_name + "|" + val.two_flavor_position,
                            val2.sub_item_name,
                            val2.pretty_price,
                            false,
                            val2.item_description
                        );
                    }
                });
            }
        });
    }
    htm += cartFooter(data.currency_code);
    htm += '<button class="button green-btn button--large trn" data-trn-key="add_to_cart" onclick="addToCart();">Add to Cart<div class="search-btn"><ons-icon icon="fa-chevron-right"></ons-icon></div></button>';
    if (getStorage('bool')) {
        htm += '<button style="margin-top:7px" id="new_buttt" class="button green-btn button--large trn" data-trn-key="add_to_cart" onclick="back_to_title();">More from this Restaurant<div class="search-btn"><ons-icon icon="fa-chevron-right"></ons-icon></div></button>'
        htm += '<ons-list-item modifier="tappable" class="list-item-container" onclick="loadItemDetails(389,19,96,true)"  id="page">'
    }

    createElement('item-info', htm);

    setCartValue();

    // translatePage();

}

function setCartValue() {
    /*set the default total price based on selected price*/
    var selected_price = parseFloat($(".price:checked").val());
    var discount = parseFloat($(".discount_amt").val());
    if (isNaN(discount)) {
        discount = 0;
    }

    if (isNaN(selected_price)) {
        selected_price = 0;
    }

    dump("discount=>" + discount);
    dump("selected_price=>" + selected_price);
    var qty = parseFloat($(".qty").val());
    var total_value = qty * (selected_price - discount);

    //adon
    dump('addon totalx');
    var addon_total = 0;

    var addon_prices = [];

    $('#page-itemdisplay .sub_item:checkbox:checked').each(function () {
        var addo_price = explode("|", $(this).val());
        if ($(this).data("withqty") == 2) {
            var p = $(this).parent().parent().parent();
            var qtysub = parseFloat(p.find('.subitem-qty').val());

            addon_total += qtysub * parseFloat(addo_price[1]);
            //addon_prices.push(addon_total);
        } else {
            addon_total += qty * parseFloat(addo_price[1]);
            //addon_prices.push(addon_total);
        }
    });

    $('#page-itemdisplay .sub_item:radio:checked').each(function () {

        var addo_price = explode("|", $(this).val());

        dump(addo_price);
        dump(addo_price[1]);

        addon_total += qty * parseFloat(addo_price[1]);
        addon_prices.push(parseFloat(addo_price[1]));
    });

    total_value += addon_total;

    dump("total_value =>" + total_value);
    if ($(".two_flavors").val() == 2) {
        dump("two_flavors");
        dump(addon_prices);
        total_value = Math.max.apply(Math, addon_prices);
        dump('get the highest value => ' + total_value);
        total_value = parseInt($("#page-itemdisplay .qty").val()) * total_value;
    }

    //$(".total_value").html(  $(".currency_symbol").val() +" "+ total_value);
    $(".total_value").html(prettyPrice(total_value));
}

function translatePage() {
    dump("TranslatePage");
    //if (getStorage("translation")!="undefined"){
    if (typeof getStorage("translation") === "undefined" || getStorage("translation") == null || getStorage("translation") == "") {
        return;
    } else {
        dictionary = JSON.parse(getStorage("translation"));
    }
    if (!empty(dictionary)) {
        //dump(dictionary);
        var default_lang = getStorage("default_lang");
        //dump(default_lang);
        if (default_lang != "undefined" && default_lang != "") {
            dump("INIT TRANSLATE");
            translator = $('body').translate({
                lang: default_lang,
                t: dictionary
            });
        }
    }
}


function loadItemDetails(item_id, mtid, cat_id, bool) {

    removeStorage('menu_tit');
    setStorage('menu_tit', mtid);

    removeStorage('merchant_id');
    setStorage('merchant_id', cat_id);
    if (bool == true) {
        setStorage('bool', bool);
    }
    if ($("#close_store").val() == 2 || $("#merchant_open").val() == 1) {
        $scope.alert(false,getTrans("This Restaurant Is Closed Now.  Please Check The Opening Times", 'restaurant_close'));
        return;
    }
     var options = {
        animation: 'slide',
        callback: function () {

            callAjax("getItemDetails", "item_id=" + item_id + "&merchant_id=" + mtid + "&cat_id=" + cat_id);
        }

    };
  
    myNavigator.pushPage("itemDisplay.html", options);
}
function addToCart() {
    var proceed = true;
    /*check if sub item has required*/
    if ($(".require_addon").exists()) {
        $(".small-red-text").remove();
        $('.require_addon').each(function () {
            if ($(this).val() == 2) {
                var required_addon_id = $(this).data("id");
                var required_addon_name = $(this).data("name");
                var required_addon_selected = $(".sub_item_name_" + required_addon_id + ":checked").length;
                if (required_addon_selected <= 0) {
                    proceed = false;

                    var err_msg = "You must select at least one addon - " + required_addon_name;

                    $(".require_addon_" + required_addon_id).after(
                        "<span class=\"small-red-text\">" + err_msg + '</span>');
                    onsenAlert(err_msg);
                }
            }
        });
    }

    dump("proceed=>" + proceed);
    if (!proceed) {
        return;
    }

    var sub_item = [];
    var cooking_ref = [];
    var ingredients = [];
    var item_id = '';
    var qty = 0;
    var price = 0;
    var order_notes = '';
    var discount = '';
    //dump('add to cart');
    //var params = $( "#page-itemdisplay .frm-foodorder").serialize();
    var params = $("#page-itemdisplay .frm-foodorder").serializeArray();
    if (!empty(params)) {
        $.each(params, function (key, val) {
            /*item*/
            if (val.name == "item_id") {
                item_id = val.value;
            }
            if (val.name == "qty") {
                qty = val.value;
            }
            if (val.name == "price") {
                price = val.value;
            }
            /*sub item*/
            /*if ( val.name=="sub_item"){
             sub_item[sub_item.length]={"value":val.value};
             }*/
            /*cooking_ref*/
            if (val.name == "cooking_ref") {
                cooking_ref[cooking_ref.length] = {
                    "value": val.value
                };
            }
            /*ingredients*/
            if (val.name == "ingredients") {
                ingredients[ingredients.length] = {
                    "value": val.value
                };
            }
            if (val.name == "order_notes") {
                order_notes = val.value;
            }
            if (val.name == "discount") {
                discount = val.value;
            }
        });

        /*get sub item */

        if ($(".two_flavors").val() == 2) {
            var sub_item_selected = $(".sub_item:checked").length;
            if (sub_item_selected < 2) {
                $scope.alert(false,getTrans("You must select price for left and right flavor", 'two_flavor_required'));
                return;
            }

            var xx = 0;
            var addon_price_array = [];
            $.each($(".sub_item:checked"), function (key, val) {
                var parent = $(this).parent().parent().parent();
                var sub_item_qty = parent.find(".subitem-qty").val()
                if (empty(sub_item_qty)) {
                    sub_item_qty = "itemqty";
                }
                var subcat_id = $(this).data("id");

                var addon_price = $(this).val();
                addon_price = addon_price.split("|");
                addon_price_array[xx] = addon_price[1];

                sub_item[sub_item.length] = {
                    'subcat_id': subcat_id,
                    'value': $(this).val(),
                    'qty': sub_item_qty
                };

                xx++;
            });

            dump(addon_price_array);
            /*var largest = addon_price_array.reduce(function(x,y){
             return (x > y) ? x : y;
             });*/
            largest = Math.max.apply(Math, addon_price_array);

            dump("largest price => " + largest);
            price = largest;

        } else {
            $.each($(".sub_item:checked"), function (key, val) {
                var parent = $(this).parent().parent().parent();
                var sub_item_qty = parent.find(".subitem-qty").val()
                if (empty(sub_item_qty)) {
                    sub_item_qty = "itemqty";
                }
                var subcat_id = $(this).data("id");
                sub_item[sub_item.length] = {
                    'subcat_id': subcat_id,
                    'value': $(this).val(),
                    'qty': sub_item_qty
                };
            });
        }

        cart[cart.length] = {
            "item_id": item_id,
            "qty": qty,
            "price": price,
            "sub_item": sub_item,
            "cooking_ref": cooking_ref,
            "ingredients": ingredients,
            'order_notes': order_notes,
            'discount': discount
        };

        var cart_value = {
            "item_id": item_id,
            "qty": qty,
            "price": price,
            "sub_item": sub_item,
            "cooking_ref": cooking_ref,
            "ingredients": ingredients,
            'order_notes': order_notes,
            'discount': discount
        };
        if (saveCartToDb()) {
            callAjax("addToCart", "cart=" + JSON.stringify(cart_value) + "&device_id=" + getStorage("device_id"));
            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
        } else {
            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
            toastMsg(getTrans("Item added to cart", 'item_added_to_cart'));
        }

        showCartNosOrder();
    }
}




jQuery.fn.exists = function () {
    return this.length > 0;
}
function toastMsg(message) {
    if (isDebug()) {
        onsenAlert(message);
        return;
    }

    /* window.plugins.toast.showWithOptions(
     {
     message: message ,
     duration: "long",
     position: "bottom",
     addPixelsY: -40
     },
     toastOnSuccess,
     toastOnError
     );*/

    window.plugins.toast.showWithOptions({
            message: message,
            duration: "long",
            position: "bottom",
            addPixelsY: -40
        },
        function (args) {

        },
        function (error) {
            onsenAlert(message);
        }
    );
}

function showCartNosOrder() {
    dump('showCartNosOrder');
    dump(cart.length);
    if (cart.length > 0) {
        //$(".cart-num").show();
        $(".cart-num").css({
            "display": "inline-block",
            "position": "absolute",
            "margin-left": "-10px"
        });
        $(".cart-num").text(cart.length);
    } else {
        $(".cart-num").hide();
    }
}

function showCart() {
    dump('showCart');
   
    var options = {
        animation: 'none',
        callback: function () {

            var cart_params = JSON.stringify(cart);
            if (saveCartToDb()) {
                var cart_params = '';
            }

            if (empty(getStorage("tips_percentage"))) {
                setStorage("tips_percentage", 0);
            }

            callAjax("loadCart", "merchant_id=" + sessionStorage.getItem('merchant_id') + "&search_address=" +
                encodeURIComponent(sessionStorage.getItem("_address")) + "&cart=" + cart_params + "&transaction_type=" +
                getStorage("transaction_type") + "&device_id=" + getStorage("device_id") + "&tips_percentage=" + getStorage("tips_percentage")) ;
        }
    };

    myNavigator.pushPage("cart.html", options);

}

function fillShippingAddress() {
    if (!empty(getStorage("map_address_result_formatted_address"))) {
        $(".delivery-address-text").html(getStorage("map_address_result_formatted_address"));
        $(".street").val(getStorage("map_address_result_address"));
        $(".city").val(getStorage("map_address_result_city"));
        $(".state").val(getStorage("map_address_result_state"));
        $(".zipcode").val(getStorage("map_address_result_zip"));
        $(".formatted_address").val(getStorage("map_address_result_formatted_address"));

        $(".google_lat").val(getStorage("google_lat"));
        $(".google_lng").val(getStorage("google_lng"));
    }
}

function cartsignin(data){
    sessionStorage.removeItem('cartLogin')

    setStorage("avatar", data.details.avatar);
    setStorage("client_name_cookie", data.details.client_name_cookie);

    if (data.details.next_step == "shipping_address") {
        var options = {
            animation: 'slide',
            callback: function () {
                displayMerchantLogo2(getStorage("merchant_logo"),
                    getStorage("order_total"),
                    'page-shipping');

                fillShippingAddress();
            }
        };
        myNavigator.pushPage("shipping.html", options);

    }
}
function cartLoadLog(data){
    sessionStorage.removeItem('cartLogin')

    setStorage("avatar", data.details.avatar);
    setStorage("client_name_cookie", data.details.client_name_cookie);

 
    switch (data.details.next_steps) {
        case "delivery":
            var options = {
                animation: 'slide',
                callback: function () {
                    displayMerchantLogo2(getStorage("merchant_logo"),
                        getStorage("order_total"),
                        'page-shipping');

                    /*if (data.details.has_addressbook==2){
                     $(".select-addressbook").css({"display":"block"});
                     } else {
                     $(".select-addressbook").hide();
                     }*/


                    if (!empty(data.details.contact_phone)) {
                        $(".contact_phone").val(data.details.contact_phone);
                    }
                    if (!empty(data.details.location_name)) {
                        $(".location_name").val(data.details.location_name);
                    }

                    if (!empty(getStorage("map_address_result_formatted_address"))) {
                        $(".delivery-address-text").html(getStorage("map_address_result_formatted_address"));
                        $(".street").val(getStorage("map_address_result_address"));
                        $(".city").val(getStorage("map_address_result_city"));
                        $(".state").val(getStorage("map_address_result_state"));
                        $(".zipcode").val(getStorage("map_address_result_zip"));
                        $(".formatted_address").val(getStorage("map_address_result_formatted_address"));

                        $(".google_lat").val(getStorage("google_lat"));
                        $(".google_lng").val(getStorage("google_lng"));
                    } else {
                        if (data.details.has_addressbook == 2) {

                            $(".delivery-address-text").html(data.details.default_address.address);
                            $(".street").val(data.details.default_address.street);
                            $(".city").val(data.details.default_address.city);
                            $(".state").val(data.details.default_address.state);
                            $(".zipcode").val(data.details.default_address.zipcode);
                            $(".formatted_address").val(data.details.default_address.address);

                        }
                    }
                }
            };

            myNavigator.pushPage("shipping.html", options);
            break;

        case "pickup":

            var options = {
                animation: 'slide',
                callback: function () {
                    displayMerchantLogo2(
                        getStorage("merchant_logo"),
                        getStorage("order_total"),
                        'page-paymentoption'
                    );
                    var params = "merchant_id=" +  sessionStorage.getItem('merchant_id');
                    callAjax("getPaymentOptions", params);
                }
            };
            displayMerchantLogo2(
                getStorage("merchant_logo"),
                getStorage("order_total"),
                'page-paymentoption'
            );



            myNavigator.pushPage("paymentOption.html", options);

            break;


    }

}
function isDebug() {
    //on/off
    //return true;
    return false;
}
function displayMerchantLogo(data, page_id) {
    if (!empty(data.merchant_info)) {
        $("#" + page_id + " .logo-wrap").html('<img src="' + data.merchant_info.logo + '" />')
    }
    if (!empty(data.cart_total)) {
        $("#" + page_id + " .total-amount").html(data.cart_total);
    }
}

function displayMerchantLogo2(logo, total, page_id) {
    if (!empty(logo)) {
        $("#" + page_id + " .logo-wrap").html('<img  src="' + logo + '" />')
    }
    if (!empty(total)) {
        $("#" + page_id + " .total-amount").html(total);
    }

    var merchant_name = getStorage("merchant_name");
    if (!empty(merchant_name)) {
        $("#" + page_id + " .restauran-title").html(merchant_name);
    }
}
function urlencode(data) {
    return encodeURIComponent(data);
}

function applyVoucher() {

    if (checkIfhasOfferDiscount()) {
        return false;
    }

    voucher_code = $(".voucher_code").val();
    if (voucher_code != "") {
        var params = "voucher_code=" + voucher_code;
        params += "&client_token=" + getStorage("token");
        params += "&merchant_id=" + getStorage("merchant_id");

        params += "&cart_sub_total=" + getStorage("cart_sub_total");
        params += "&cart_delivery_charges=" + getStorage("cart_delivery_charges");
        params += "&cart_packaging=" + getStorage("cart_packaging");
        params += "&cart_tax=" + getStorage("cart_tax");
        params += "&pts_redeem_amount=" + $(".pts_redeem_amount").val();

        if (empty(getStorage("tips_percentage"))) {
            setStorage("tips_percentage", 0);
        }
        params += "&tips_percentage=" + getStorage("tips_percentage");

        callAjax("applyVoucher", params);
    } else {
        onsenAlert(getTrans('invalid voucher code', 'invalid_voucher_code'));
    }
}

function editOrderInit() {
    $("#page-cart .numeric_only").show();
    $(".order-apply-changes").show();
    $(".edit-order").hide();
    $(".qty-label").hide();
    $(".row-del-wrap").show();

    var x = 1;
    $.each($(".item-qty"), function (key, val) {
        $.each($(".subitem-qty" + x), function (key2, val2) {
            if ($(this).data("qty") != "itemqty") {
                $(this).show();
            }
        });
        x++;
    });
}

function applyCartChanges() {
    $("#page-cart .numeric_only").hide();
    $(".order-apply-changes").hide();
    $(".edit-order").show();
    $(".qty-label").show();
    $(".subitem-qty").hide();
    $(".row-del-wrap").hide();

    dump("qty L=>" + $(".item-qty").length);
    if (!empty($(".item-qty"))) {
        cart = [];
        var x = 1;
        $.each($(".item-qty"), function (key, val) {

            var x = $(this).data("rowid");
            dump("rowid=>" + x);

            var sub_item = [];
            var ingredients = [];
            var cooking_ref = [];
            var order_notes = '';
            var discount = '';

            /*$.each( $(".subitem-qty"+x) , function( key2, val2 ) {
             sub_item[sub_item.length]={
             'value': $(".sub_item_id"+x).val() + "|" + $(".sub_item_price"+x).val() +'|' + $(".sub_item_name"+x).val()
             };
             });*/

            if ($(".ingredients" + x).exists()) {
                ingredients[ingredients.length] = {
                    'value': $(".ingredients" + x).val()
                };
            }

            if ($(".cooking_ref" + x).exists()) {
                cooking_ref[cooking_ref.length] = {
                    'value': $(".cooking_ref" + x).val()
                };
            }

            if ($(".order_notes" + x).exists()) {
                /*order_notes[order_notes.length]={
                 'value': $(".order_notes"+x).val()
                 };*/
                order_notes = $(".order_notes" + x).val();
            }

            /*get sub item*/
            $.each($(".subitem-qty" + x), function (key2, val2) {
                subqty = $(this).data("qty");
                if ($(this).data("qty") != "itemqty") {
                    subqty = $(this).val();
                }
                var parent = $(this).parent().parent();
                var subcat_id = parent.find(".subcat_id").val();
                var subcat_value = parent.find(".sub_item_id").val() + '|' +
                    parent.find(".sub_item_price").val() + '|' + parent.find(".sub_item_name").val();

                sub_item[sub_item.length] = {
                    'qty': subqty,
                    'subcat_id': subcat_id,
                    'value': subcat_value
                };
            });
            cart[cart.length] = {
                'item_id': $(".item_id" + x).val(),
                'qty': $(this).val(),
                'price': $(".price" + x).val(),
                "sub_item": sub_item,
                'cooking_ref': cooking_ref,
                "ingredients": ingredients,
                "order_notes": order_notes,
                "discount": $(".discount" + x).val(),
            };
            x++;
        });

        dump('updated cartx');
        dump(cart);

        var cart_params = JSON.stringify(cart);

        var extra_params = "&delivery_date=" + $(".delivery_date").val();
        if (!empty($(".delivery_time").val())) {
            extra_params += "&delivery_time=" + $(".delivery_time").val();
        }

        if (empty(getStorage("tips_percentage"))) {
            setStorage("tips_percentage", 0);
        }

        callAjax("loadCart", "merchant_id=" + sessionStorage.getItem('merchant_id') + "&search_address=" +
            encodeURIComponent(sessionStorage.getItem("_address")) + "&update_cart=" + encodeURIComponent(cart_params) + "&transaction_type=" +
            getStorage("transaction_type") + extra_params + "&device_id=" + getStorage("device_id") + "&tips_percentage=" + getStorage("tips_percentage"));

    }
}

function showTip() {
    if (typeof tipsDialog === "undefined" || tipsDialog == null || tipsDialog == "") {
        ons.createDialog('tipsDialog.html').then(function (dialog) {
            dialog.show();
            translatePage();
        });
    } else {
        tipsDialog.show();
    }
}
function showChangeAddressPage(object) {
    var options = {
        animation: 'slide',
        callback: function () {}
    };
    myNavigator.pushPage("change-address.html", options);
}

function showMapAddress(map_address_action) {
    setStorage("map_address_action", map_address_action)

    var options = {
        animation: 'none',
        callback: function () {
            /*checkGPS_AddressMap();*/
            newFuncChange();
        }
    };
    myNavigator.pushPage("address-bymap.html", options);
}
var markers = [];

function newFuncChange(){


    var map = new google.maps.Map(document.getElementById('map_canvas_address'), {
        center: {lat:  parseFloat(sessionStorage.getItem('changeLat')), lng: parseFloat( sessionStorage.getItem('changeLng'))},
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    var input = document.getElementById('search_address_geo');
    var latlngbounds = new google.maps.LatLngBounds();

    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    markers= [];
    markers.push(new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng( parseFloat(sessionStorage.getItem('changeLat')), parseFloat(sessionStorage.getItem('changeLng'))),
    }));
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
       

        places.forEach(function(place) {
           
            if (!place.geometry) {
          
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            sessionStorage.removeItem('changeLat')
            sessionStorage.removeItem('changeLng')
            sessionStorage.setItem('changeLat',place.geometry.location.lat())
            sessionStorage.setItem('changeLng',place.geometry.location.lng())
            markers.push(new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, 'click', function (e) {
        // alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
        sessionStorage.removeItem('changeLat')
        sessionStorage.removeItem('changeLng')
        sessionStorage.setItem('changeLat',e.latLng.lat())
        sessionStorage.setItem('changeLng',e.latLng.lng())
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers= [];
        markers.push(new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng( parseFloat(sessionStorage.getItem("changeLat")), parseFloat(sessionStorage.getItem("changeLng"))),
        }));

    });

}
function useThisLocation() {

    var data_action = $(".change_cemara_action").val();
    //toastMsg(data_action);
    if (data_action == "getAddress") {
        var lat = $(".change_cemara_lat").val();
        var lng = $(".change_cemara_lng").val();
        //toastMsg( lat + "=>"+ lng );
        $(".change_cemara_action").val('');
        $(".use-location").html(getTrans("Use this address", 'use_this_address'));
        callAjax("dragMarker", "lat=" + lat + "&lng=" + lng);
        return;
    }

    var map_address_action = getStorage("map_address_action");
    //alert(map_address_action);
    dump(map_address_action);

    switch (map_address_action) {
        case "mapaddress":

            $(".street").val(getStorage("map_address_result_address"));
            $(".city").val(getStorage("map_address_result_city"));
            $(".state").val(getStorage("map_address_result_state"));
            $(".zipcode").val(getStorage("map_address_result_zip"));

            $(".google_lat").val(getStorage("google_lat"));
            $(".google_lng").val(getStorage("google_lng"));
            $(".formatted_address").val(getStorage("map_address_result_formatted_address"));

            $(".delivery-address-text").html(getStorage("map_address_result_formatted_address"));

            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
            break;

        case "changeaddress":

            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
            setStorage("search_address", getStorage("map_address_result_formatted_address"));

            var cart_params = JSON.stringify(cart);
            if (saveCartToDb()) {
                var cart_params = '';
            }

            callAjax("loadCart", "merchant_id=" + getStorage('merchant_id') + "&search_address=" +
                encodeURIComponent(getStorage("search_address")) + "&cart=" + cart_params + "&transaction_type=" +
                getStorage("transaction_type") + "&device_id=" + getStorage("device_id"));

            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button

            break;

        default:
            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button
            break;
    }
}
function checkGPS_AddressMap() {
    //puta

    $('#map_canvas_address').css('height', $(window).height() - $('#map_canvas_address').offset().top);

    if ($(".search_address_geo").exists()) {

        dump('checkGPS_AddressMap');
        $('.map_search_field_wrap').css('height', "auto");

        $(document).on("click", "#search_address_geo", function () {
            $('.map_search_field_wrap').css('height', $(window).height() - $('.map_search_field_wrap').offset().top);
            $(".search_address_geo").val('');
        });

        var country_code_set = sessionStorage.getItem('cauntry_code');
        
        if (empty(sessionStorage.getItem('cauntry_code'))) {
            country_code_set = '';
        }
        $(".search_address_geo").geocomplete({
            country: country_code_set
        }).bind("geocode:result", function (event, result) {

            dump(result);

            $('.map_search_field_wrap').css('height', "auto");

            var address = "",
                city = "",
                state = "";
            var zip = "",
                formatted_address = "",
                s_lat = '',
                s_lng = '';

            formatted_address = result.formatted_address;

            $.each(result.address_components, function () {
                switch (this.types[0]) {
                    case "postal_code":
                        zip = this.short_name;
                        break;
                    case "street_address":
                        address = this.short_name;
                        break;
                    case "administrative_area_level_1":
                        state = this.short_name;
                        break;
                    case "locality":
                        city = this.short_name;
                        break;
                }
            });

            dump("formatted_address=>" + formatted_address);
            dump("address=>" + address);
            dump("city=>" + city);
            dump("state=>" + state);
            dump("zip=>" + zip);

            s_lat = result.geometry.location.lat();
            s_lng = result.geometry.location.lng();

            if (!isDebug()) {
                var geo_loc = new plugin.google.maps.LatLng(s_lat, s_lng);

                map_search.getCameraPosition(function (camera) {

                    map_search.setCenter(geo_loc);
                    map_search.setZoom(camera.zoom);
                    drag_marker.setPosition(geo_loc);
                    drag_marker.setTitle(formatted_address);
                    drag_marker.showInfoWindow();

                });
            }

            var map_address_action = getStorage("map_address_action");
            dump(map_address_action);

            setStorage("map_address_result_address", address);
            setStorage("map_address_result_city", city);
            setStorage("map_address_result_state", state);
            setStorage("map_address_result_zip", zip);
            setStorage("map_address_result_formatted_address", formatted_address);

            setStorage("google_lat", result.geometry.location.lat());
            setStorage("google_lng", result.geometry.location.lng());
        });
    } /*end search geo*/

    if (isDebug()) {
        return;
    }

    if (device.platform == "iOS") {
        MapInit_addressMap();
        return;
    }


    var can_request = true;
    cordova.plugins.locationAccuracy.canRequest(function (canRequest) {
        if (!canRequest) {
            can_request = false;
            var _message = getTrans('Your device has no access to location Would you like to switch to the Location Settings page and do this manually?', 'location_off')
            ons.notification.confirm({
                message: _message,
                title: dialog_title_default,
                buttonLabels: ['Yes', 'No'],
                animation: 'none',
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function (index) {
                    if (index == 0 || index == "0") {
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            });
        }
    });

    if (!can_request) {
        return;
    }


    cordova.plugins.locationAccuracy.request(function (success) {

        MapInit_addressMap();

    }, function (error) {

        if (error.code == 4) {
            checkGPS_AddressMap();
        } else {
            toastMsg(error.message);
        }

    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
}

function addressPopup() {
    $('#dialog-1').show()
/*
    if (typeof addressDialog === "undefined" || addressDialog == null || addressDialog == "") {
      /!*      .then(function (dialog) {
            dialog.show()
            /!*{
             "callback": geoCompleteChangeAddress
             });
             translatePage();
             translateValidationForm();
             $(".new_s").attr("placeholder", getTrans('Enter your address', 'enter_your_address'));
             });
             } else {
             addressDialog.show({
             "callback": geoCompleteChangeAddress
             });
             }*!/
        })*!/
    }*/
}
function translateValidationForm() {
    $.each($(".has_validation"), function () {
        var validation_type = $(this).data("validation");

        switch (validation_type) {
            case "number":
                $(this).attr("data-validation-error-msg", getTrans("The input value was not a correct number", 'validation_numeric'));
                break;

            case "required":
                $(this).attr("data-validation-error-msg", getTrans("this field is mandatory!", 'validaton_mandatory'));
                break;

            case "email":
                $(this).attr("data-validation-error-msg", getTrans("You have not given a correct e-mail address!", 'validation_email'));
                break;
        }

    });
}

function clientShipping() {

    //if ( empty( $(".street").val() )){
    if (empty($(".city").val())) {
        toastMsg(getTrans("Delivery address is required", 'delivery_address_required'));
        return;
    }

    $.validate({
        form: '#frm-shipping',
        borderColorOnError: "#FF0000",
        onError: function () {},
        onSuccess: function () {
            var params = $("#frm-shipping").serialize();
            setStorage('shipping_address', params);
            dump(params);
            var options = {
                animation: 'slide',
                callback: function () {
                    displayMerchantLogo2(
                        getStorage("merchant_logo"),
                        getStorage("order_total"),
                        'page-paymentoption'
                    );
                    var params = "merchant_id=" +  sessionStorage.getItem('merchant_id');
                    params += "&street=" + $(".street").val();
                    params += "&city=" + $(".city").val();
                    params += "&state=" + $(".state").val();
                    params += "&zipcode=" + $(".zipcode").val();
                    params += "&location_name=" + $(".location_name").val();
                    params += "&save_address=" + $('.save_address:checked').val();
                    params += "&transaction_type=" + getStorage("transaction_type");
                    params += "&client_token=" + getStorage('token');

                    callAjax("getPaymentOptions", params);
                }
            };

            myNavigator.pushPage("paymentOption.html", options);
            return false;
        }
    });
}
function showManualAddressInput() {
    $(".manual-address-input").toggle();
}
function showPageAdressSelection() {
    var options = {
        animation: 'slide',
        callback: function () {}
    };
    myNavigator.pushPage("address-selection.html", options);
}

function setManualAddress() {
    $.validate({
        form: '#frm-manual-address',
        borderColorOnError: "#FF0000",
        onError: function () {},
        onSuccess: function () {
            $(".street").val($(".stree_1").val());
            $(".city").val($(".city_1").val());
            $(".state").val($(".state_1").val());
            $(".zipcode").val($(".zipcode_1").val());

            var complete_address = $(".stree_1").val();
            complete_address += " " + $(".city_1").val();
            complete_address += " " + $(".state_1").val();
            complete_address += " " + $(".zipcode_1").val();

            $(".google_lat").val('');
            $(".google_lng").val('');
            $(".formatted_address").val('');

            $(".delivery-address-text").html(complete_address);
            myNavigator.popPage({
                cancelIfRunning: true
            });
            return false;
        }
    });
}


function checkOut() {
    var validation_msg = $(".validation_msg").val();

    dump(validation_msg);
    dump(cart);
    if (cart.length < 1) {
        onsenAlert(getTrans("Your cart is empty", 'your_cart_is_empty'));
        return;
    }
  
    if (validation_msg != "") {
        dump('d2');
        onsenAlert(validation_msg);
        return;
    }
    //var tr_type=getStorage("transaction_type");
    var tr_type = $(".transaction_type:checked").val();
    dump("tr_type=>" + tr_type);

    if (tr_type == "pickup") {
        if ($(".delivery_time").val() == "") {
            onsenAlert(getTrans("Pickup time is required", 'pickup_time_is_required'));
            return;
        }
    }

    if ($(".required_time").val() == 2) {
        if ($(".delivery_time").val() == "") {

            if ($(".delivery_asap:checked").length <= 0) {
                onsenAlert(tr_type + " " + getTrans('time is required', 'time_is_required'));
                return;
            }
        }
    }

    var extra_params = "&delivery_date=" + $(".delivery_date").val();
    if (!empty($(".delivery_time").val())) {
        extra_params += "&delivery_time=" + $(".delivery_time").val();
    }

    extra_params += "&delivery_asap=" + $(".delivery_asap:checked").val();

    extra_params += "&client_token=" + sessionStorage.getItem('token');

    //extra_params+="&transaction_type2=" + $(".transaction_type:checked").val();
    callAjax("checkout", "merchant_id=" + sessionStorage.getItem('merchant_id') + "&search_address=" +
        encodeURIComponent(sessionStorage.getItem("_address")) + "&transaction_type=" +
        getStorage("transaction_type") + extra_params) ;
}
function setTips(tips) {
    removeStorage("remove_tips");
    setStorage("tips_percentage", tips);
    $(".tip_amount").html(getTrans("Tips", 'tips') + " " + tips + "%");
    tipsDialog.hide();
    reloadCart();
}

function geoCompleteChangeAddress() {
    dump("country_code_set=>" + sessionStorage.getItem('cauntry_code'));
    if (empty(sessionStorage.getItem('cauntry_code'))) {
        $("#new_s").geocomplete();
    } else {
        $("#new_s").geocomplete({
            country: sessionStorage.getItem('cauntry_code')
        });
    }
    $(".pac-container").css({
        "z-index": 99999
    });
}

function removeTips() {
    removeStorage("tips_percentage");
    setStorage("remove_tips", 1);
    tipsDialog.hide();
    reloadCart();
}
function reloadCart() {
    var cart_params = JSON.stringify(cart);
    if (saveCartToDb()) {
        var cart_params = '';
    }

    if (empty(getStorage("tips_percentage"))) {
        setStorage("tips_percentage", 0);
    }

    var params = '';
    params = "merchant_id=" + sessionStorage.getItem('merchant_id') + "&search_address=" +
        encodeURIComponent(sessionStorage.getItem("_address")) + "&cart=" + cart_params + "&transaction_type=" +
        getStorage("transaction_type") + "&device_id=" + getStorage("device_id") + "&tips_percentage=" + getStorage("tips_percentage");


    if (!empty(getStorage("remove_tips"))) {
        params += "&remove_tips=" + getStorage("remove_tips");
    }

    callAjax("loadCart", params);
}

function displayPaymentOptions(data) {
    var htm = '';
    $.each($(data.details.payment_list), function (key, val) {
        dump(val);
        htm += tplPaymentList('payment_list', val.value, val.label, val.icon);
    });
    createElement('payment-list', htm);

    var htm = '';
    if (data.details.pay_on_delivery_flag == 1) {
        $.each($(data.details.pay_on_delivery_list), function (key, val) {
            dump(val);
            htm += tplPaymentProvider('payment_provider_name', val.payment_name, val.payment_name, val.payment_logo);
        });
        createElement('payon-deliver-list', htm);
    }
}




function applyRedeem() {

    if (checkIfhasOfferDiscount()) {
        return false;
    }

    /*pts*/
    redeem_points = $(".redeem_points").val();
    if (redeem_points != "") {
        var params = "redeem_points=" + redeem_points;
        params += "&client_token=" + getStorage("token");
        params += "&merchant_id=" +  sessionStorage.getItem('merchant_id');
        params += "&voucher_amount=" + $(".voucher_amount").val();
        params += "&subtotal_order=" + getStorage("cart_sub_total");

        params += "&cart_sub_total=" + getStorage("cart_sub_total");
        params += "&cart_delivery_charges=" + getStorage("cart_delivery_charges");
        params += "&cart_packaging=" + getStorage("cart_packaging");
        //params+="&cart_tax_amount="+ getStorage("cart_tax_amount");
        params += "&cart_tax=" + getStorage("cart_tax");

        if (empty(getStorage("tips_percentage"))) {
            setStorage("tips_percentage", 0);
        }
        params += "&tips_percentage=" + getStorage("tips_percentage");

        callAjax("applyRedeemPoints", params);
    } else {
        onsenAlert(getTrans('invalid redeem points', 'invalid_redeem_points'));
    }
}
function changeAddress() {
    $.validate({
        form: '#frm-adddresspopup',
        borderColorOnError: "#FF0000",
        onError: function () {},
        onSuccess: function () {
            dump('change address');

            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button

            setStorage("search_address", $(".new_ss").val());
            var cart_params = JSON.stringify(cart);
            if (saveCartToDb()) {
                cart_params = '';
            }
            callAjax("loadCart", "merchant_id=" + getStorage('merchant_id') + "&search_address=" +
                encodeURIComponent($(".new_ss").val()) + "&cart=" + cart_params + "&transaction_type=" +
                getStorage("transaction_type") + "&device_id=" + getStorage("device_id"));
            return false;
        }
    });
}
function MapInit_addressMap() {

   /* loader.show();*/

    drag_marker_bounce = 1;

    navigator.geolocation.getCurrentPosition(function (position) {
        var your_location = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        setTimeout(function () {

            var div = document.getElementById("map_canvas_address");
            $('#map_canvas_address').css('height', $(window).height() - $('#map_canvas_address').offset().top);

            map_search = plugin.google.maps.Map.getMap(div, {
                'camera': {
                    'latLng': your_location,
                    'zoom': 17
                }
            });

            map_search.setBackgroundColor('white');

            map_search.addEventListener(plugin.google.maps.event.MAP_READY, function onMapInit(map) {

                map_search.clear();
                map_search.off();
                map_search.setCenter(your_location);
                map_search.setZoom(17);

                callAjax("coordinatesToAddress", "lat=" + position.coords.latitude + "&lng=" + position.coords.longitude);


                map_search.addEventListener(plugin.google.maps.event.MAP_CLICK, function onMapClick(latLng) {
                    //alert("Map was long clicked.\n" + latLng.toUrlValue());
                    var lat_lng = latLng.toUrlValue();
                    lat_lng = explode(",", lat_lng);
                    /*alert(lat_lng[0]);
	                     alert(lat_lng[1]);*/
                }); /* even listner*/

                map_search.addEventListener(plugin.google.maps.event.CAMERA_CHANGE, function onMapCamera(position) {
                    //alert(JSON.stringify(position));
                    /*alert( position.target.lat );
	                    alert( position.target.lng );*/

                    //drag_marker.remove();	                    

                    var new_location = new plugin.google.maps.LatLng(position.target.lat, position.target.lng);
                    /*map_search.addMarker({
						  'position': new_location
						}, function(marker) {							
							drag_marker=marker;
	                    });*/

                    if (drag_marker_bounce == 2) {
                        //toastMsg('CAMERA CHANGE =>' + position.target.lat );
                        drag_marker.setPosition(new_location);
                        drag_marker.hideInfoWindow();

                        $(".change_cemara_action").val("getAddress");
                        $(".change_cemara_lat").val(position.target.lat);
                        $(".change_cemara_lng").val(position.target.lng);

                        $(".use-location").html(getTrans("Get Address", 'get_address'));
                    }

                    /*if(drag_marker_bounce==2){
	                       callAjax("coordinatesToAddress","lat=" + position.target.lat + "&lng="+ position.target.lng );	 
	                    }*/

                }); /* even listner*/

            }); /* even listner*/


        }, 500); // and timeout for clear transitions    


    }, function (error) {
       
    }, {
        timeout: 10000,
        enableHighAccuracy: getLocationAccuracy()
    });
}

function placeOrder() {
    if ($('.payment_list:checked').length > 0) {

        var selected_payment = $('.payment_list:checked').val();
        dump(selected_payment);
        if (selected_payment == "pyr") {
            dump($('.payment_provider_name:checked').length);
            if ($('.payment_provider_name:checked').length <= 0) {
                onsenAlert(getTrans("Please select payment provider", 'please_select_payment_provider'));
                return;
            }
        }

        if (selected_payment == "ocr") {
            if (empty(getStorage("cc_id"))) {
                onsenAlert(getTrans("Please select credit card", 'please_select_cc'));
                return;
            }
        }


        var params = $("#frm-paymentoption").serialize();
        var cart_params = JSON.stringify(cart);

        if (saveCartToDb()) {
            cart_params = '';
        }

        var extra_params = "&delivery_date=" + $(".delivery_date").val();
        if (!empty($(".delivery_time").val())) {
            extra_params += "&delivery_time=" + $(".delivery_time").val();
        }

        extra_params += "&delivery_asap=" + $(".delivery_asap:checked").val();
        extra_params += "&formatted_address=" + $(".formatted_address").val();
        extra_params += "&google_lat=" + $(".google_lat").val();
        extra_params += "&google_lng=" + $(".google_lng").val();

        //extra_params+="&payment_method="+ $(".payment_list:checked").val();
        //extra_params+="&order_change="+ $(".order_change").val();
        extra_params += "&" + getStorage("shipping_address");
        extra_params += "&client_token=" + getStorage('token');
        extra_params += "&search_address=" + urlencode(getStorage('search_address'));
        /*pts*/
        extra_params += "&earned_points=" + getStorage('earned_points');
        extra_params += "&device_id=" + getStorage('device_id');
        extra_params += "&" + params;

        /*tips*/
        if (empty(getStorage("tips_percentage"))) {
            setStorage("tips_percentage", 0);
        }
        extra_params += "&tips_percentage=" + getStorage('tips_percentage');

        if (selected_payment == "ocr") {
            extra_params += "&cc_id=" + getStorage('cc_id');
        }

        callAjax("placeOrder", "merchant_id=" + sessionStorage.getItem('merchant_id') +
            "&cart=" + urlencode(cart_params) +
            "&transaction_type=" +
            getStorage("transaction_type") + extra_params);

    } else {
        onsenAlert(getTrans("Please select payment method", 'please_select_payment_method'));
    }
}
function loadMap() {


    //alert( getStorage('merchant_id') );

    var options = {
        animation: 'none',
        callback: function () {
            checkGPS();
        }
    };
    myNavigator.pushPage('map.html', options);
    
}
function popUpAddressBook() {
    $(".manual-address-input").hide();
    callAjax('getAddressBookDialog',
        "client_token=" + getStorage("token")
    );

    if (typeof dialogAddressBook === "undefined" || dialogAddressBook == null || dialogAddressBook == "") {
        ons.createDialog('dialogAddressBook.html').then(function (dialog) {
            dialog.show();
            translatePage();
        });
    } else {
        dialogAddressBook.show();
        //translatePage();
    }
}

function displayAddressBookPopup(data) {
    var htm = '<ons-list>';
    if (data.length > 0) {
        $.each(data, function (key, val) {
            var complete_address = val.street + "|";
            complete_address += val.city + "|";
            complete_address += val.state + "|";
            complete_address += val.zipcode + "|";
            complete_address += val.location_name + "|";
            complete_address += val.contact_phone + "|";

            htm += '<ons-list-item modifier="tappable" class="setAddress" data-address="' + complete_address + '" >';
            htm += '<ons-row class="row">';
            htm += '<ons-col class="" width="80%">';
            htm += '<p class="small-font-dim">' + val.address + '</p>';
            htm += '</ons-col>';
            htm += '<ons-col class="text-right" >';
            if (val.as_default == 2) {
                htm += '<ons-icon icon="ion-ios-location-outline"></ons-icon>';
            }
            htm += '</ons-col>';
            htm += '<ons-row>';
            htm += '</ons-list-item>';
        });
    }
    htm += '</ons-list>';

    createElement('addressbook-popup', htm);
}


function checkIfhasOfferDiscount() {
    var has_discount = getStorage("has_discount");
    if (!empty(has_discount)) {
        if (has_discount == 1) {
            onsenAlert(getTrans('you request cannot be applied you have offer discount already', 'discount_offer'));
            return true;
        }
    }
    return false;
}
function cancelRedeem() {
    $(".pts_redeem_points").val('');
    $(".pts_redeem_amount").val('');
    $(".pts_pts").show();
    $(".pts_pts_cancel").hide();
    $(".total-amount").html(prettyPrice(getStorage("order_total_raw")));
}

/*function checkGPS() {
    if (isDebug()) {
        viewTaskMapInit();
        return;
    }

    if (device.platform == "iOS") {
        viewTaskMapInit();
        return;
    }

    var can_request = true;
    cordova.plugins.locationAccuracy.canRequest(function (canRequest) {
        if (!canRequest) {
            can_request = false;
            var _message = getTrans('Your device has no access to location Would you like to switch to the Location Settings page and do this manually?', 'location_off')
            ons.notification.confirm({
                message: _message,
                title: dialog_title_default,
                buttonLabels: ['Yes', 'No'],
                animation: 'none',
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function (index) {
                    if (index == 0 || index == "0") {
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            });
        }
    });

    if (!can_request) {
        return;
    }


    cordova.plugins.locationAccuracy.request(onRequestSuccessMap,
        onRequestFailureMap, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
}*/


function checkGPS(){
    var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: {lat: 40.151994, lng: 44.542117}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            var  merchant_latitude = sessionStorage.getItem("merchant_latitude");
  var  merchant_longtitude = sessionStorage.getItem("merchant_longtitude");
          var  _lat = sessionStorage.getItem("_lat");
  var  _long = sessionStorage.getItem("_long");
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat: parseFloat(merchant_latitude), lng: parseFloat(merchant_longtitude)},  // Haight.
          destination: {lat: parseFloat(_lat), lng: parseFloat(_long)},  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
function onRequestSuccessMap(success) {
   
    //alert("Successfully requested accuracy: "+success.message);
    viewTaskMapInit();
}

function onRequestFailureMap(error) {
    
    //alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);
    if (error.code == 4) {
         
        toastMsg(getTrans("You have choosen not to turn on location accuracy", 'turn_off_location'));
        checkGPS();
    } else {
        toastMsg(error.message);
    }
}


function viewTaskMapInit() {

    

  var  merchant_latitude = sessionStorage.getItem("merchant_latitude");
  var  merchant_longtitude = sessionStorage.getItem("merchant_longtitude");
 var   google_lat = new plugin.google.maps.LatLng(merchant_latitude, merchant_longtitude);
    setTimeout(function () {
    
        var div = document.getElementById("map_canvas_div");
    

        map = plugin.google.maps.Map.getMap(div, {
            'camera': {
                'latLng': google_lat,
                'zoom': 17
            }
        });
        
        map.setBackgroundColor('white');

        map.on(plugin.google.maps.event.MAP_READY, onMapInit);

    }, 500); // and timeout for clear transitions
}

function onMapInit() {

  var  merchant_latitude = sessionStorage.getItem("merchant_latitude");
  var  merchant_longtitude = sessionStorage.getItem("merchant_longtitude");
  var  delivery_address = sessionStorage.getItem("merchant_address");

    var GOOGLE = new plugin.google.maps.LatLng(merchant_latitude, merchant_longtitude);

    map.clear();
    map.off();
    map.setCenter(GOOGLE);
    map.setZoom(17);
    map.addMarker({
        'position': new plugin.google.maps.LatLng(merchant_latitude, merchant_longtitude),
        'title': delivery_address,
        'snippet': getTrans("Destination", 'destination'),
        'icon': {
            'url': getStorage("destination_icon")
        }
    }, function (marker) {

        marker.showInfoWindow();

        navigator.geolocation.getCurrentPosition(function (position) {

            var your_location = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var destination = new plugin.google.maps.LatLng(merchant_latitude, merchant_longtitude);

            map.addPolyline({
                points: [
                    destination,
                    your_location
                ],
                'color': '#AA00FF',
                'width': 10,
                'geodesic': true
            }, function (polyline) {

                map.animateCamera({
                    'target': your_location,
                    'zoom': 17,
                    'tilt': 30
                }, function () {

                    var data = [
                        {
                            'title': getTrans('You are here', 'you_are_here'),
                            'position': your_location,
                            'icon': {
                                'url': getStorage("from_icon")
                            }
                        }
                    ];

                    hideAllModal();

                    addMarkers(data, function (markers) {
                        markers[markers.length - 1].showInfoWindow();
                    });

                });

            });
            // end position success

        }, function (error) {
            hideAllModal();
            toastMsg(error.message);
            // end position error
        }, {
            timeout: 10000,
            enableHighAccuracy: getLocationAccuracy()
        });

    });
}

function addMarkers(data, callback) {
    var markers = [];

    function onMarkerAdded(marker) {
        markers.push(marker);
        if (markers.length === data.length) {
            callback(markers);
        }
    }
    data.forEach(function (markerOptions) {
        map.addMarker(markerOptions, onMarkerAdded);
    });
}




function viewTaskDirection() {
  var  merchant_latitude = sessionStorage.getItem("merchant_latitude");
  var  merchant_longtitude = sessionStorage.getItem("merchant_longtitude");

    navigator.geolocation.getCurrentPosition(function (position) {

        var your_location = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //demo
        //var yourLocation = new plugin.google.maps.LatLng(34.039413 , -118.25480649999997);

        var destination_location = new plugin.google.maps.LatLng(merchant_latitude, merchant_longtitude);

        plugin.google.maps.external.launchNavigation({
            "from": your_location,
            "to": destination_location
        });

        // end position success
    }, function (error) {
        toastMsg(error.message);
        // end position error
    }, {
        timeout: 10000,
        enableHighAccuracy: getLocationAccuracy()
    });

}
jQuery(document).ready(function () {

    setTimeout('getLanguageSettings()', 1100);

    /*jquery onclick*/

    $(document).on("click", ".dialog-mask", function () {
        $('#dialog-1').hide()
    });

    $(document).on("click", ".price", function () {
        setCartValue();
    });
    $(document).on("change", ".qty", function () {
        setCartValue();
    });

    $(document).on("change", ".sub_item", function () {
        setCartValue();
    });

    $(document).on("change", ".subitem-qty", function () {
        setCartValue();
    });

    $(document).on("click", ".edit-order", function () {
        editOrderInit();
    });

    $(document).on("click", ".order-apply-changes", function () {
        applyCartChanges();
    });
    $(document).on("click", ".delete-item", function () {
        var id = $(this).data('id');
        var parent = $(this).parent().parent().parent();
        parent.remove();
        $(".subitem-row" + id).remove();
    });
    $(document).on("click", ".setAddress", function () {
        var address = $(this).data("address");
        var address_split = address.split("|");
        dump(address_split);
        if (address_split.length > 0) {
            $(".street").val(address_split[0]);
            $(".city").val(address_split[1]);
            $(".state").val(address_split[2]);
            $(".zipcode").val(address_split[3]);
            $(".location_name").val(address_split[4]);

            var number = '';
            if (!empty(address_split[5])) {
                number = address_split[5];
                //number=number.replace("+","");
            }

            $(".contact_phone").val(number);

            var complete_address = address_split[0];
            complete_address += " " + address_split[1];
            complete_address += " " + address_split[2];
            complete_address += " " + address_split[3];

            $(".delivery-address-text").html(complete_address);
            $(".google_lat").val('');
            $(".google_lng").val('');
            $(".formatted_address").val('');

            dialogAddressBook.hide();

            myNavigator.popPage({
                cancelIfRunning: true
            }); //back button

        } else {
            onsenAlert(getTrans("Error: cannot set address book", 'cannot_set_address'));
            dialogAddressBook.hide();
        }
    });

    $(document).on("click", ".sub_item_custom", function () {
        var this_obj = $(this);
        var multi = $(this).data("multi");
        if (empty(multi)) {
            return;
        }
        var id = $(this).data("id");
        var total_check = 0;
        $('.sub_item_custom:checked').each(function () {
            if ($(this).data("id") == id) {
                total_check++;
            }
        });
        if (multi < total_check) {
            onsenAlert(getTrans('Sorry but you can select only', 'sorry_but_you_can_select') + " " + multi + " " +
                getTrans('addon', 'addon'));
            this_obj.prop("checked", false);
            return;
        }
    });
    $(document).on("click", ".transaction_type", function () {
        var transaction_type = $(this).val();

        if (transaction_type == "pickup") {
            $(".delivery_asap_wrap").hide();
        } else {
            $(".delivery_asap_wrap").show();
        }

        setStorage('transaction_type', transaction_type);

        var cart_params = JSON.stringify(cart);
        if (saveCartToDb()) {
            cart_params = '';
        }

        var extra_params = "&delivery_date=" + $(".delivery_date").val();
        if (!empty($(".delivery_time").val())) {
            extra_params += "&delivery_time=" + $(".delivery_time").val();
        }

        callAjax("loadCart", "merchant_id=" + sessionStorage.getItem('merchant_id') + "&search_address=" +
            encodeURIComponent(sessionStorage.getItem("_address")) + "&cart=" + cart_params + "&transaction_type=" +
            getStorage("transaction_type") + extra_params + "&device_id=" + getStorage("device_id"));

    });
    $(document).on("click", ".payment_list", function () {
        dump($(this).val());
        var paypal_card_fee = $(".paypal_card_fee").val();
        switch ($(this).val()) {
            case "paypal":
            case "pyp":
                if (paypal_card_fee > 0) {
                    var total_order_plus_fee = parseFloat(getStorage("order_total_raw")) + parseFloat(paypal_card_fee);
                    total_order_plus_fee = number_format(total_order_plus_fee, 2);
                    $(".total-amount").html(getStorage("cart_currency_symbol") + " " + total_order_plus_fee);
                }

                $(".order-change-wrapper").hide();
                $(".payon-delivery-wrapper").hide();
                break;

            case "cod":
                if (paypal_card_fee > 0) {
                    $(".total-amount").html(getStorage("order_total"));
                }
                $(".order-change-wrapper").show();
                $(".payon-delivery-wrapper").hide();
                break;

            case "pyr":
                if (paypal_card_fee > 0) {
                    $(".total-amount").html(getStorage("order_total"));
                }
                $(".order-change-wrapper").hide();
                $(".payon-delivery-wrapper").show();
                break;

            case "ocr":

                var options = {
                    animation: 'slide',
                    callback: function () {
                        var params = "merchant_id=" + getStorage("merchant_id");
                        params += "&client_token=" + getStorage("client_token");
                        callAjax("getMerchantCClist", params);
                        translatePage();
                    }
                };
                myNavigator.pushPage("cclist.html", options);

                break;

            default:
                if (paypal_card_fee > 0) {
                    $(".total-amount").html(getStorage("order_total"));
                }
                $(".order-change-wrapper").hide();
                $(".payon-delivery-wrapper").hide();
                break;
        }
    });
 
})

function callAjaxx(url,params){
    $.ajax({
        url: "http://mealoop.com/mobileapp/api/"+url+"?"+params,
        data: "&lang_id=&api_key=fed7b441b349bae8f146711fbd215e90",
        type: 'post',
        dataType: 'jsonp',
        crossDomain: true,
        success: function (dataa) {
   
        }
            })
}
function playNotification() {
    var sound_url = "file:///android_asset/www/audio/fb-alert.mp3";
    if (sound_url) {
        playAudio(sound_url);
    }
}
function getCurrentLocation() {
    /*alert( device.platform ); 
    alert( device.version );*/
    if (device.platform == "browser") {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {
            timeout: 10000,
            enableHighAccuracy: getLocationAccuracy()
        });
    } else if (device.platform == "Android") {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {
            timeout: 10000,
            enableHighAccuracy: getLocationAccuracy()
        });
    } else if (isDebug()) {
        onRequestSuccess();
        return;
    } else if (device.platform == "iOS") {
        getCurrentLocationOld();
    } else {

        var can_request = true;
        cordova.plugins.locationAccuracy.canRequest(function (canRequest) {
            if (!canRequest) {
                can_request = false;
                var _message = getTrans('Your device has no access to location Would you like to switch to the Location Settings page and do this manually?', 'location_off')
                ons.notification.confirm({
                    message: _message,
                    title: dialog_title_default,
                    buttonLabels: ['Yes', 'No'],
                    animation: 'none',
                    primaryButtonIndex: 1,
                    cancelable: true,
                    callback: function (index) {
                        if (index == 0 || index == "0") {
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                });
            }
        });

        if (!can_request) {
            return;
        }

        cordova.plugins.locationAccuracy.request(
            onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }

}


function onRequestSuccess() {
   
    //  {enableHighAccuracy:false,maximumAge:Infinity, timeout:60000}
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {
        timeout: 10000,
        enableHighAccuracy: getLocationAccuracy()
    });

    /*navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError, 
     { timeout:10000 , enableHighAccuracy: false } );   */

}

function onRequestFailure(error) {
    //alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);    
    if (error.code == 4) {
        toastMsg(getTrans("You have choosen not to turn on location accuracy", 'turn_off_location'));
        getCurrentLocation();
    } else {
        toastMsg(error.message);
    }
}

function getCurrentLocationOld() {
    CheckGPS.check(function win() {
            //GPS is enabled! 
           
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {
                timeout: 10000,
                enableHighAccuracy: getLocationAccuracy()
            });
        },
        function fail() {
            //GPS is disabled!
            var m_1 = getTrans('Your GPS is disabled, this app needs to be enabled to work.', 'your_gps');
            var m_2 = getTrans('Use GPS for location.', 'use_gps_for_location');
            var m_3 = getTrans('Improve location accuracy', 'improve_location_accuracy');
            var b_1 = getTrans('Cancel', 'cancel');
            var b_2 = getTrans('Later', 'later');
            var b_3 = getTrans('Go', 'go');

            cordova.dialogGPS(m_1, //message
                m_2, //description
                function (buttonIndex) { //callback
                    switch (buttonIndex) {
                        case 0:
                            break; //cancel
                        case 1:
                            break; //neutro option
                        case 2:
                            break; //user go to configuration
                    }
                },
                m_3 + "?", //title
                          [b_1, b_2, b_3]
            ); //buttons
        });
}


function geolocationSuccess(position) {
    dump(position);
    var params = "lat=" + position.coords.latitude;
    params += "&lng=" + position.coords.longitude;
    callAjaxx("reverseGeoCoding", params);
    var address_full = "http://mealoop.com/mobileapp/api/reverseGeoCoding?" + params + "";

    $.ajax({
        url: address_full,
        type: 'post',
        dataType: 'jsonp',
        success: function (data) {
     
            sessionStorage.removeItem("_new_address");
            sessionStorage.setItem("_new_address", data.details);

        }
    })
    sessionStorage.removeItem("_lat");
    sessionStorage.removeItem("_long");
    sessionStorage.removeItem("changeLat");
    sessionStorage.removeItem("changeLng");
    sessionStorage.setItem("_lat", position.coords.latitude);
    sessionStorage.setItem("_long", position.coords.longitude);
    sessionStorage.setItem('changeLat',position.coords.latitude)
    sessionStorage.setItem('changeLng',position.coords.longitude)
}


function geolocationError(error) {
    hideAllModal();
    /*onsenAlert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');*/
    toastMsg(error.message);
}

function saveSettings() {
   

    var params = $("#frm-settings").serialize();
    params += "&client_token=" + sessionStorage.getItem("token");
    params += "&device_id=" + sessionStorage.getItem("device_id");
    callAjaxx("saveSettings", params);
}

function showLocationPopUp() {
    if (typeof locationDialog === "undefined" || locationDialog == null || locationDialog == "") {
        ons.createDialog('locationOptions.html').then(function (dialog) {
           /* dialog.show();*/
            translatePage();
        });
    } else {
     /*   locationDialog.show();*/
        //translatePage();
    }
}
function myFunction() {

    _update_location();

}
function getLocationAccuracy() {
    var networkState = navigator.connection.type;
    switch (networkState) {
        case "Connection.WIFI":
        case "wifi":
            return false;
            break;

        default:
            return true;
            break;
    }
}
function _update_location() {
    var _lat = sessionStorage.getItem("_lat"),
        _long = sessionStorage.getItem("_long"),
        _address = sessionStorage.getItem("_new_address"),
        _date = new Date(),
        _time = _date.getTime(),
        device_id = sessionStorage.getItem("device_id");
    
    if (_lat && _long && _address && device_id) {
     
        var address_for_update = "http://mealoop.com/mobileapp/api/MobilesRregistering?id=" + device_id + "&time=" + _time + "&lat=" + _lat + "&long=" + _long + "&country=" + _address + "";
        $.ajax({
            url: address_for_update,
            type: 'post',
            dataType: 'jsonp',
            success: function (data) {
                print_r(data)
            }
        })
    }
}
function initFacebook() {
    dump('initFacebook');
         var facebook_flag = getStorage("facebook_flag");
        if (facebook_flag == 2) {
            $(".fb-loginbutton").show();
            openFB.init({
                appId: '1785452871717052'
            });
        } else {
            $(".fb-loginbutton").hide();
        }


    /*$.ajaxSetup({ cache: true });
     $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
     FB.init({
     appId: '191654534503876',
     version: 'v2.3' // or v2.0, v2.1, v2.2, v2.3
     });
     });*/
}

function myFacebookLogin() {
    /*FB.getLoginStatus(function(response) {
     if (response.status === 'connected') {
     dump('already login');
     getFbInfo();
     } else {
     FB.login(function(response){
     dump(response);
     if ( response.status=="connected"){
     getFbInfo();
     } else {
     onsenAlert("Login failed.");
     }
     }, {scope: 'public_profile,email'});
     }
     }); */
    openFB.login(
        function (response) {
            if (response.status === 'connected') {
                //alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
                getFbInfo();
            } else {
                alert('Facebook login failed: ' + response.error);
            }
        }, {
            scope: 'public_profile,email'
        });
}

function getFbInfo() {
    openFB.api({
        path: '/me',
        params: {
            fields: "email,first_name,last_name"
        },
        success: function (data) {
            dump(data);
            var params = "&email=" + data.email;
            params += "&first_name=" + data.first_name;
            params += "&last_name=" + data.last_name;
            params += "&fbid=" + data.id;
            params += "&device_id=" + getStorage("device_id");

            if ($(".next_steps").exists()) {
                params += "&next_steps=" + $(".next_steps").val();
            }
            callAjax("registerUsingFb", params);

        },
        error: fbErrorHandler
    });

    /*FB.api('/me?fields=email,name', function(response) {
     dump(response);
     var params="&email="+ response.email;
     params+="&name="+response.name;
     params+="&fbid="+response.id;

     if ( $(".next_steps").exists()){
     params+="&next_steps="+ $(".next_steps").val();
     }
     callAjax("registerUsingFb",params);
     });*/
}

function fbErrorHandler(error) {
    alert("ERROR=> " + error.message);
}


function FBlogout() {
    /*FB.logout(function(response) {
     dump(response);
     });*/
    openFB.logout(
        function () {
            onsenAlert('Logout successful');
        },
        fbErrorHandler);
}
var alertjs = function (material, message) {
			ons.notification.alert({
				message: message,
				modifier: material ? 'material' : undefined
			});
		}


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
    get_loc1();
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
function get_loc1() {
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(successFunction1, errorFunction1);

	}
}

//Get the latitude and the longitude;
function successFunction1(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	codeLatLng1(lat, lng)
}

function errorFunction1() {
/*	alert("Geocoder failed");*/
}
function successFunction(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	codeLatLng(lat, lng)
}

function errorFunction() {
/*	alert("Geocoder failed");*/
}



function codeLatLng(lat, lng) {
console.log(_country)
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({
		'latLng': latlng
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {

			if (results[1]) {
				_arr = [];
						arr = [];
				for (var i = 0; i < results[1].address_components.length; i++) {
 console.log(i)
					if (_country == results[1].address_components[i].short_name) {
                        console.log(_arr)
                        console.log(arr)
                       
						
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
       
		$(document).find('#autocomplete').eq($(document).find('#autocomplete').length-1).val(arr[0]) 
        
	}
	});
	
}
function codeLatLng1(lat, lng) {

	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({
		'latLng': latlng
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {

			if (results[1]) {
				_arr = [];
						arr = [];
				for (var i = 0; i < results[1].address_components.length; i++) {

					if (_country == results[1].address_components[i].short_name) {
						
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
		
	
       
		$(document).find('#loc_me_hid_but').eq($(document).find('#loc_me_hid_but').length-1).val(arr[0]) ;
     
        
	
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