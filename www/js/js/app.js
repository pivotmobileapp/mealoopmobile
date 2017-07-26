var app = ons.bootstrap();
app.controller('PageController', function ($scope, $http) {
	/*******************************Select Country*********************************************************/
	var _token,
		profile_token,
        searchInput;
	$scope.country = [
		{
			name: 'Antigua and Barbuda',
			value: 'Antigua',
			img: 'img/flag/Flag-of-Antigua-and-Barbuda.png'
		},
		{
			name: 'Guyana',
			value: 'Guyana',
			img: 'img/flag/guyana-flag-1.png'
		},
		{
			name: 'Jamaica',
			value: 'Jamaica',
			img: 'img/flag/flag.png'
		},
		{
			name: 'Saint Lucia',
			value: 'Lucia',
			img: 'img/flag/Flag-of-Saint-Lucia.png'
		},
		{
			name: 'Trinidad and Tobago',
			value: 'Trinidad',
			img: 'img/flag/Flag-of-Trinidad-and-Tobago.png'
		}
	];


	/*******************************End Select Country*********************************************************/
	$scope.first_page = function () {
        sessionStorage.removeItem('cauntry_code');
        myNavigator.resetToPage('country.html');
		}
	/*******************************Get Country Value*********************************************************/

	$scope.get_country_value = function (obj) {
			$scope.cauntry_val = obj.target.attributes.value.nodeValue;
			if ($scope.cauntry_val == 'Guyana') {
				$scope.cauntry_code = 'GY';
			} else if ($scope.cauntry_val == 'Jamaica') {
				$scope.cauntry_code = 'JM';
			} else if ($scope.cauntry_val == 'Lucia') {
				$scope.cauntry_code = 'LC';
			} else if ($scope.cauntry_val == 'Trinidad') {
				$scope.cauntry_code = 'TT';
			} else {
				$scope.cauntry_code = 'AG';
			}
			sessionStorage.removeItem('cauntry_code');
			sessionStorage.setItem('cauntry_code', $scope.cauntry_code);
			myNavigator.pushPage('tabs.html')
		}
	/*******************************End Get Country Value*********************************************************/
	$scope.manualy = function () {
		myNavigator.pushPage('home.html')

	}
	$scope.forpage3 = function () {
		$scope.tabbar.setActiveTab(2)
	}

	$scope.tabs_change = function (e) {

		$scope.tabbar.setActiveTab(e)
	}


	/********************Login Form ***************************************************/

	$scope.msg = '';
	$scope.login = function () {
			$scope.msg = '';
			var login = document.querySelectorAll('#username')[document.querySelectorAll('#username').length-1].value;
			var password = document.querySelectorAll('#password')[document.querySelectorAll('#password').length-1].value;

			  var device_id= sessionStorage.getItem("device_id");

   $http.jsonp("http://mealoop.com/mobileapp/api/login?      email_address=" + login + "&password=" + password +'&next_steps='+ sessionStorage.getItem('cartLogin')+"&device_id=" + device_id+"&callback=JSON_CALLBACK")
    .success(function successCallback(response) {

					if (response.details.token) {
						_token = response.details.token;

						sessionStorage.setItem('token', _token)
					if(sessionStorage.getItem('cartLogin') && sessionStorage.getItem('token')){
                        window.cartLoadLog(response)

                    }else{

                        myNavigator.pushPage('restaurantLocation.html');
                    }
                    $scope.style_load = {
                        "display": "block"
                    };

                	} else {
						$scope.msg = response.msg
					}

				})

		}
	/********************Signup Form ***************************************************/
	$scope.signup_valid = '';
	$scope.signup = function () {
		$scope.signup_valid = '';
		var first_name = document.querySelectorAll('#firstname')[document.querySelectorAll('#firstname').length-1].value;
		var last_name = document.querySelectorAll('#lastname')[document.querySelectorAll('#lastname').length-1].value;
		var contact_phone = document.querySelectorAll('#mobile')[document.querySelectorAll('#mobile').length-1].value;
		var email_address = document.querySelectorAll('#email')[document.querySelectorAll('#email').length-1].value;
		var reg_password = document.querySelectorAll('#reg_password')[document.querySelectorAll('#reg_password').length-1].value;
		var cpassword = document.querySelectorAll('#reg_password_confirm')[document.querySelectorAll('#reg_password_confirm').length-1].value;
	  var device_id = sessionStorage.getItem("device_id");
	  $http.jsonp("http://mealoop.com/mobileapp/api/signup?      first_name=" + first_name + "&last_name=" + last_name + "&contact_phone=" + contact_phone + "&email_address=" + email_address + "&password=" + reg_password + "&cpassword=" + cpassword+"&next_step=shipping_address&callback=JSON_CALLBACK")
   	.success(function successCallback(response) {

				if (response.details.token) {
					_token = response.details.token;
					sessionStorage.setItem('token', _token);
				   	if(sessionStorage.getItem('cartLogin') && sessionStorage.getItem('token')) {
                        window.cartsignin(response)
                    }
                    else{
                        myNavigator.pushPage('restaurantLocation.html');
                        $scope.style_load = {
                            "display": "block"
                        };
                    }
				} else {
					$scope.signup_valid = response.msg;
				}


			})
	}

	/********************Reset Password ***************************************************/
	$scope.reset = function () {
			var res_password = document.querySelectorAll('#email_pass_forgot')[document.querySelectorAll('#email_pass_forgot').length-1].value;
			$http.jsonp("http://mealoop.com/mobileapp/api/forgotPassword?email_address=" + res_password + "&callback=JSON_CALLBACK")
				.success(function successCallback(response) {

					dialog.hide()
					$scope.alert(false, response.msg);

				})
		}
	/********************End Reset Password ***************************************************/
	/********************Verify Password ***************************************************/
	$scope.ver_valid = '';
	$scope.verify = function () {
			$scope.ver_valid = '';
			var city = document.querySelectorAll('#ver_email')[document.querySelectorAll('#ver_email').length-1].value;
			var code = document.querySelectorAll('#ver_code')[document.querySelectorAll('#ver_code').length-1].value;
			if (city && code) {
				$http.jsonp("http://mealoop.com/mobileapp/api/verifyAccount?email_address=" + city + "&code=" + code + "&callback=JSON_CALLBACK")
					.success(function successCallback(response) {


						$scope.alert(false, response.msg);

					})
			} else {
				$scope.ver_valid = 'Please fill the fields'
			}
		}
	/******************** Ons Alert ***************************************************/

	$scope.alert = function (material, message) {
			ons.notification.alert({
				message: message,
				modifier: material ? 'material' : undefined
			});
		}
	/******************** End Ons Alert ***************************************************/

$scope.rest_info = {};
$scope.reviewsPage = function(id){
 $http.jsonp(" http://mealoop.com/mobileapp/api/getMerchantInfo?merchant_id="+id+"&lang_id=&api_key=fed7b441b349bae8f146711fbd215e90&_=1498663326854&callback=JSON_CALLBACK")
  .success(function successCallback(response) {
  $scope.rest_info = response;
  document.getElementById('days').innerHTML = response.details.opening_hours.replace('&nbsp; &nbsp;','') 
 }).error(function (err) {



 });
 myNavigator.pushPage('reviewsPage.html');
}

$scope.rest_review = {};
$scope.addReviewsPage = function(id){
	$http.jsonp(" http://mealoop.com/mobileapp/api/merchantReviews?merchant_id="+id+"&lang_id=&api_key=fed7b441b349bae8f146711fbd215e90&_=1498737082313&callback=JSON_CALLBACK")
  .success(function successCallback(response) {
  $scope.rest_review = response;

 }).error(function (err) {

 

 });
 myNavigator.pushPage('addReviewsPage.html');
}

$scope.addNewReview = function(){	
	
 myNavigator.pushPage('addNewReview.html');
}
$scope.id="";

$scope.reviewadd= function(id,input_val){
	$scope.showModal()
	reviews=input_val;
	if (sessionStorage.getItem('token')) {
			profile_token = sessionStorage.getItem('token');
			stars=count;
			
			$http.jsonp(" http://mealoop.com/mobileapp/api/addReview?score=5&rating="+stars+"&review="+reviews+"&merchant_id="+id+"&client_token="+profile_token+"&lang_id=&api_key=fed7b441b349bae8f146711fbd215e90&_=1498817768044&callback=JSON_CALLBACK")
			  .success(function successCallback(response) {
			star_add = document.querySelectorAll(".star_add");
			star_add = star_add[star_add.length-5];
			if(reviews && star_add.getAttribute('src') == '/img/star-on.png'){

				$scope.addReviewsPage($scope.menu_category.details.merchant_id)
			}
			else{
				$scope.alert(false,"Review Part and Stars Part are Required")
			}
			}).finally(function () {
				$scope.hideModal();
			


			})	
	}
	else{
		$scope.alert(false,"Sorry, but you must log in")
	}

}
var count = 0
$scope.starsOn= function($event){

	count = $event.target.getAttribute('alt')
	star_add = document.querySelectorAll(".star_add");

	for(var j=star_add.length-5; j<star_add.length; j++){
		star_add[j].setAttribute('src','/img/star-off.png');
	}
	for(var i=star_add.length-5; i<parseInt(star_add.length-5)+parseInt(count); i++){
		star_add[i].setAttribute('src','/img/star-on.png');
	}
}

$scope.bookNow = function(d){
	if(d!=""){
	format_d = d;
	var dateregexp = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/gi
		if(d.match(dateregexp)== null){
			$scope.alert(false,"Value must be in this format YYYY-MM-DD")
		}
		else{
			alert("ok")
		}
	}
}

	$scope.pr_firstname = '';
	$scope.pr_lastname = '';
	$scope.pr_email = '';
	$scope.pr_tel = '';
	$scope.goprofile = function () {
		if (sessionStorage.getItem('token')) {
			profile_token = sessionStorage.getItem('token');
			$http.jsonp("http://mealoop.com/mobileapp/api/getProfile?client_token=" + profile_token + "&callback=JSON_CALLBACK")
				.success(function successCallback(response) {
					$scope.pr_firstname = response.details.first_name;
					$scope.pr_lastname = response.details.last_name;
					$scope.pr_email = response.details.email_address;
					$scope.pr_tel = response.details.contact_phone;
					myNavigator.pushPage("loginProfile.html");
				})

		} else {
			myNavigator.pushPage("profile.html");
		}

	}
	$scope.save_profile = function () {
			if (sessionStorage.getItem('token')) {
				var name_rof = document.querySelectorAll('#name_rof')[document.querySelectorAll('#name_rof').length-1].value;
				var surname_prof = document.querySelectorAll('#surname_prof')[document.querySelectorAll('#surname_prof').length-1].value;
				var tel_prof = document.querySelectorAll('#tel_prof')[document.querySelectorAll('#tel_prof').length-1].value;
				var pass_prof = document.querySelectorAll('#pass_prof')[document.querySelectorAll('#pass_prof').length-1].value;
				profile_token = sessionStorage.getItem('token');

				$http.jsonp("http://mealoop.com/mobileapp/api/saveProfile?client_token=" + profile_token + "&first_name=" + name_rof + "&last_name=" + surname_prof + "&contact_phone=" + tel_prof + "&password=" + pass_prof + "&callback=JSON_CALLBACK")
					.success(function successCallback(response) {
						$scope.alert(false, 'your profile has been successfully updated');

					})

			}
		}
	/*************************** show Address Book      *******************************************/
	$scope.addressobj = {};
	$scope.showAddressBook = function () {
			if (sessionStorage.getItem('token')) {
				profile_token = sessionStorage.getItem('token');
				$http.jsonp("http://mealoop.com/mobileapp/api/getAddressBook?client_token=" + profile_token + "&lang_id=" + "" + "&callback=JSON_CALLBACK")
					.success(function successCallback(response) {
						
						$scope.addressobj = response.details

					});
				myNavigator.pushPage("showAddressBook.html");
			} else {
				myNavigator.pushPage("login.html");
			}
		}
    $scope.showAddressBookPop  = function () {
        if (sessionStorage.getItem('token')) {
            profile_token = sessionStorage.getItem('token');
            $http.jsonp("http://mealoop.com/mobileapp/api/getAddressBook?client_token=" + profile_token + "&lang_id=" + "" + "&callback=JSON_CALLBACK")
                .success(function successCallback(response) {
                 
                    $scope.addressobj = response.details

                });
            myNavigator.popPage(['page', "showAddressBook.html"]);
        }
    }
	/*************************** End show Address Book      *******************************************/
	$scope.gonews = function () {
		myNavigator.pushPage("gonews.html");
	}
	$scope.RequestCancelOrder = function () {
		myNavigator.pushPage("RequestCancelOrder.html")
	}
	$scope.gologin = function () {
		myNavigator.pushPage("login.html")
	}
	$scope.gocreate_account = function () {
		myNavigator.pushPage("create_account.html")
	}
	$scope.goverify = function () {
		myNavigator.pushPage("verify.html")
	}
	$scope.goRestaurantSignup = function () {
		myNavigator.pushPage("RestaurantSignup.html")
	}
	$scope.goLiveSupport = function () {
		myNavigator.pushPage("LiveSupport.html")
	}
	$scope.newshowAddressBook = function () {
			$scope.valid_adrstreet = '';
			$scope.valid_city = '';
			$scope.valid_state = '';
			$scope.valid_zip = '';
			$scope.valid_location = '';
			myNavigator.pushPage("newshowAddressBook.html")
		}
	/*******************************************Menu Restaurant *********************************************/
    $scope.gal_image=[];
	$scope.menu_category = {};
	$scope.content =''
	$scope.content1=''
	$scope.menu_restaurant = function (menu,delivery,pickup) {
	
		$scope.showModal();
		$http.jsonp(" http://mealoop.com/mobileapp/api/MenuCategory?merchant_id=" + menu + "&callback=JSON_CALLBACK")
			.success(function successCallback(response) {
				$scope.menu_category = response;
				sessionStorage.removeItem('open_restaurant');
				sessionStorage.setItem('open_restaurant',response.details.open);
                sessionStorage.removeItem("merchant_longtitude")
                sessionStorage.removeItem("merchant_latitude");
                sessionStorage.removeItem("merchant_longtitude");
                sessionStorage.setItem("merchant_address", response.details.address);
                sessionStorage.setItem("merchant_latitude", response.details.coordinates.latitude);
                sessionStorage.setItem("merchant_longtitude", response.details.coordinates.longtitude);
         if(response.details.merchant_close_store==true){
           response.details.open='Close Now' ;
             $scope.co_lor={'color':'#dc5236'}
         }
            else{
                response.details.open='Open Now' ;
                 $scope.co_lor={'color':'#80CC1D'}
            }
            $scope.gal_image=response.details.gal_image;
            
				myNavigator.pushPage('menucategory.html');
			}).finally(function () {
				$scope.hideModal();
			$scope.content = delivery 
			$scope.content1 = pickup 


			});
	};
	/*******************************************End Menu Restaurant*********************************************/
    $scope.onepohoto=function(abc){
       $scope.one_pohoto=abc;
         myNavigator.pushPage('onephoto.html');
    }
    $scope.photos=function(){
       
        myNavigator.pushPage('photos.html');
    }
	/*******************************************Restaurant Location*********************************************/
	$scope.restaurants = {};
	$scope.address = '';

    $scope.quickFilter1='qwq';
    $scope.quickFilter2=0;
    $scope.quickFilter3='votes';
    $scope.clearFilter = function () {
        $scope.searchString='';
        $scope.quickFilter1='qwq';
        $scope.quickFilter2=0;
        $scope.propertyName = 'restaurant_name';
        $scope.reverse = true;
        $scope.friends = $scope.restaurants;
        $scope.activeMenu='';
        $scope.activeMenuR='';
        $scope.fastClickItem = '';
        $scope.clickItem = '';
    }
    $scope.fastClickItem = '';
	$scope.quichfilter = function (filter1,filter2) {
			if(!filter2){
            filter2="";
        }
    
        $scope.quickFilter2 =filter2
        $scope.quickFilter1 =  filter1 ;
		$scope.fastClickItem = filter1;

    }
  $scope.rest_part = [] 
    $scope.restaurant = function () {
  $scope.showModal();
  var address = document.querySelectorAll('#autocomplete')[document.querySelectorAll('#autocomplete').length-1].value;
  sessionStorage.removeItem("_address");
  sessionStorage.setItem("_address", address);

  var str = sessionStorage.getItem("_address");
  var _str = str.substring(0, str.indexOf(","))

  if (_str) {
   $scope.address = _str;
  } else {
   $scope.address = str;
  }
  $http.jsonp("http://mealoop.com/mobileapp/api/search?address=" + address + "&callback=JSON_CALLBACK")
   .success(function successCallback(response) {

    $scope.restaurants = response.details.data;
 
    if (response.msg == "Successful") {
     myNavigator.pushPage('restaurantLocation.html');
    } else {
     $scope.alert(false, response.msg);
    }
   }).finally(function () {

    $scope.hideModal();

   });
    $http.jsonp("http://mealoop.com/mobileapp/api/SearchSponsored?address=" + address + "&callback=JSON_CALLBACK")
      .success(function successCallback(response) {

    
     
       if (response.msg == "Successful") {
        
        $scope.rest_part = response
      
       }
      })

 };
      $scope.restaurant1 = function () {
  $scope.showModal();
  var address = document.querySelectorAll('#loc_me_hid_but')[document.querySelectorAll('#loc_me_hid_but').length-1].value;
  sessionStorage.removeItem("_address");
  sessionStorage.setItem("_address", address);

  var str = sessionStorage.getItem("_address");
  var _str = str.substring(0, str.indexOf(","))

  if (_str) {
   $scope.address = _str;
  } else {
   $scope.address = str;
  }
  $http.jsonp("http://mealoop.com/mobileapp/api/search?address=" + address + "&callback=JSON_CALLBACK")
   .success(function successCallback(response) {

    $scope.restaurants = response.details.data;
 
    if (response.msg == "Successful") {
     myNavigator.pushPage('restaurantLocation.html');
    } else {
     $scope.alert(false, 'Not Found Restaurants');
    }
   }).finally(function () {

    $scope.hideModal();

   });
    $http.jsonp("http://mealoop.com/mobileapp/api/SearchSponsored?address=" + address + "&callback=JSON_CALLBACK")
      .success(function successCallback(response) {

    
     
       if (response.msg == "Successful") {
                 $scope.rest_part = response
      
       }
      })

 };
    $scope.propertyName = 'restaurant_name';
    $scope.reverse = true;
    $scope.friends = $scope.restaurants;
    $scope.activeMenu='';
    $scope.activeMenuR='true';
    $scope.ascDesc= function(){
    	if($scope.reverse==true){
            $scope.reverse = false;
            $scope.activeMenuR = 'false';

		}else{
            $scope.reverse = true;
            $scope.activeMenuR = 'true';

        }
 	}
    $scope.sortBy = function(propertyName) {
         $scope.propertyName = propertyName;
        $scope.activeMenu = propertyName;
		
    };
	/*******************************************End Restaurant Location *********************************************/




	/******************************************* Loading Modal *********************************************/
	$scope.showModal = function () {
		var modal = document.querySelector('ons-modal');
		modal.show();

	}
	$scope.hideModal = function () {
			var modal = document.querySelector('ons-modal');
			modal.hide();

		}
	/******************************************* End Loading Modal *********************************************/
	$scope.serachPage = function () {

		myNavigator.pushPage('serachPage.html');
	}
	$scope.round = function (i) {
		return Math.round(i);
	};
	$scope.clickItem ='';
    $scope.searchs = function (search) {
        $scope.searchString = search;
        myNavigator.pushPage('serachPage.html', { animation : 'slide' } );
        $scope.clickItem = search;

    }
	/**********************************************Search Food***********************************************/
	$scope.clear_food = function () {
$scope.arr_food=[]
$scope.hide_part ={'display':'block'}
	};
	/*******************************************End Search Food*********************************************/

	$scope.style_load = {
		"display": "none"
	};
	if (sessionStorage.getItem('token')) {
		$scope.style_load = {
			"display": "block"
		};
	} else {
		$scope.style_load = {
			"display": "none"
		};
	}
	var arr_food = [];
	$scope.arr_food=[];
	$scope.food_search = {};
	$scope.rest_name = []
	$scope.cuisine = []
	$scope.rating = []
	$scope.services = []
	$scope.logo = []
	$scope.getfood = function () {
		arr_food = [];
		$scope.arr_food=[];
		$scope.rest_name = []
		$scope.cuisine = []
		$scope.rating = []
		$scope.services = []
		$scope.logo = []
			var address1 = sessionStorage.getItem("_address");
			var food1 = document.querySelectorAll('#food1')[document.querySelectorAll('#food1').length-1].value;
		if(food1){
			$scope.showModal();
			$http.jsonp("http://mealoop.com/mobileapp/api/searchss?address=" + address1 + "&sea=" + food1  + "&callback=JSON_CALLBACK")
				.success(function successCallback(response) {
			
					
					if (response.details.datas) {
						$.each(response.details.datas, function (key, val) {
							if (val.tag_raw == "open" || val.tag_raw == "pre-order") {
								
									arr_food.push(val.merchant_id);
									$scope.rest_name.push(val.restaurant_name)
									$scope.cuisine.push(val.cuisine)
									$scope.rating.push(val.ratings)
									$scope.services.push(val.services)
									$scope.logo.push(val.logo)
								
								
							}

						});
						
					}




				}).finally(function () {
					var address2 = sessionStorage.getItem("_address");
					var food2 = document.querySelectorAll('#food1')[document.querySelectorAll('#food1').length-1].value;
					$http.jsonp("http://mealoop.com/mobileapp/api/searchss?address=" + address2 + "&sea=" + food2 +  "&callback=JSON_CALLBACK")
						.success(function successCallback(response) {
						$scope.hideModal();
							for (var i = 0; i < arr_food.length; i++) {
								if(response.details.data){
								$.each(response.details.data, function (key, val) {
									
									if (val.merchant_id == arr_food[i]) {
									if	(val.price!='""'  && val.price != 0 ){
									
										val.restaurant_name=$scope.rest_name[i]
										val.cuisine=$scope.cuisine[i]
										val.ratings=$scope.rating[i]
										val.services=$scope.services[i]
										val.logo=$scope.logo[i]
                                     
                                      $scope.arr_food.push(val)
									
										if(val.price.charAt(0) == '['){
											val.price = val.price.replace(/[\"\[\]]/g,"")
										}
										else if(val.price.charAt(0) == '{'){
										val.price = val.price.slice(val.price.lastIndexOf(':')+2, val.price.lastIndexOf('"'),)
										}
									}
									}

								})
								$scope.hide_part ={'display':'none'}
								}
								else{
									$scope.alert(false,'We have no such food');
									$scope.hide_part ={'display':'block'}
									break;
								}
							}
						})

				});
	}
		else{
				$scope.alert(false, 'Please Select Food');
		}
		}
/*********go settings*******/
$scope.device_id;
 $scope.goSettings = function () {
      $scope.device_id=  sessionStorage.getItem("device_id");
         $http.jsonp("http://mealoop.com/mobileapp/api/getSettings?device_id=" + $scope.device_id  + "&callback=JSON_CALLBACK")
   .success(function successCallback(response) {
      if(response.details.enabled_push==1){
               $scope.cool=true;
            }
                else{
                    $scope.cool=false;
                    }



   });
      
  myNavigator.pushPage('settingspart.html');
 }
/******go settingsend**********/




	/*******************************************Food  in Menu     *********************************************/
	$scope.food_category = {};
	$scope.foods_menu = function (category, merchant) {
		$http.jsonp("http://mealoop.com/mobileapp/api/getItemByCategory?cat_id=" + category + "&merchant_id=" + merchant + "&callback=JSON_CALLBACK")
			.success(function successCallback(response) {
				$scope.food_category = response;
				sessionStorage.removeItem('disabled_ordering')
				sessionStorage.setItem('disabled_ordering',response.details.disabled_ordering)

				if ($scope.food_category.details['item']) {
					myNavigator.pushPage('foodinmenu.html');
				} else {
                    $scope.alert(false, 'No food item found');
				}


			});


	};
	$scope.checkboxModel = {
		value1: false
	};
	$scope.valid_adrstreet = '';
	$scope.valid_city = '';
	$scope.valid_stat = '';
	$scope.valid_zip = '';
	$scope.valid_location = '';
	$scope.add_address = function () {

			$scope.valid_adrstreet = '';
			$scope.valid_city = '';
			$scope.valid_stat = '';
			$scope.valid_zip = '';
			$scope.valid_location = '';
			var adrstreet = document.querySelector('#adrstreet').value;
			var adrcity = document.querySelector('#adrcity').value;
			var adrstate = document.querySelector('#adrstate').value;
			var adrzip = document.querySelector('#adrzip').value;
			var adrlocation = document.querySelector('#adrlocation').value;
			if (adrstreet.trim() && adrcity.trim() && adrstate.trim() && adrzip.trim() && adrlocation.trim()) {
				profile_token = sessionStorage.getItem('token');
				var as_default;
				if ($scope.checkboxModel.value1 == true) {
					as_default = "&as_default=2";
				} else {
					as_default = "";
				}
			

				$http.jsonp("http://mealoop.com/mobileapp/api/saveAddressBook?id= &action=add&street=" + adrstreet + "&city=" + adrcity + "&state=" + adrstate + "&zipcode=" + adrzip + "&location_name=" + adrlocation + as_default + "&client_token=" + profile_token + "&callback=JSON_CALLBACK")
					.success(function successCallback(response) {
						

						$scope.showAddressBookPop()

					});
			} else {
				if (adrstreet.trim() == "") {
					$scope.valid_adrstreet = "Street is Required";

				}
				if (adrcity.trim() == "") {
					$scope.valid_city = "City is Required";

				}
				if (adrstate.trim() == "") {
					$scope.valid_state = "State is Required";

				}
				if (adrzip.trim() == "") {
					$scope.valid_zip = "Zip Code is Required";

				}
				if (adrlocation.trim() == "") {
					$scope.valid_location = "Location Name is Required";

				}

			}
		}
	/*******************************************End  Food  in Menu  *********************************************/
	/*******************************************food item details       *********************************************/
	$scope.item_foods = {};
	$scope.price = 0;
	$scope.item_details = function (item, category, merchant) {
	
        sessionStorage.removeItem('merchant_id')
        sessionStorage.setItem('merchant_id',category)
		if(sessionStorage.getItem('disabled_ordering')==2){
            $scope.alert(false,'Ordering is disabled');

        }
		else if(sessionStorage.getItem('open_restaurant')=='false'){
            $scope.alert(false,'This Restaurant Is Closed Now.  Please Check The Opening Times');

        }
        else{
      	  window.loadItemDetails(item,merchant,category)
        }
	};



	/*******************************************End food item details    ********************************************/
	/*******************************************price food item details    *********************************************/
	$scope.updgrate_price = 0;
	$scope.subitem = [];
	$scope.subcat_id = '';
	$scope.qty = 1;
	$scope.get_price = function (val) {
		$scope.price = val;
		$scope.total = (parseInt($scope.price) * parseInt($scope.qty)) + parseInt($scope.updgrate_price);

	};
	var obj = {};
	$scope.num = 1;
	$scope.upd = 'abc';
	var arrr = [];
	var arrs = [];
	$scope.req = true;
	$scope.subprice = 0;
	$scope.updrate = function (model, val, id, name, cat, upd, qtyopt) {


		$scope.subprice = 0;
		$scope.subitem = [];
	
		var checked = document.querySelectorAll('#a' + cat + id)[0].checked;
		var checked1 = document.querySelectorAll('#c' + cat + id)[0].checked;
		var num = document.querySelectorAll('#b' + id)[0].value;


		if (checked) {
			sessionStorage.removeItem('new')
			sessionStorage.setItem('new', 'new')
		}

		var price = val;
		var prices = 0;
		if (checked || checked1) {
			var qty;
			if (qtyopt == 'custom') {
				qty = "itemqty";

				num = $scope.qty;
			}
			if (qtyopt == 'one') {
				qty = "itemqty";

				num = $scope.qty;
			}
			if (qtyopt == 'multiple') {
				qty = num;
			}

			obj = {
				model: model,
				info: {
					cat: cat,
					name: name,
					id: id,
					val: val,
					num: num,
					qty: qty,
					price: (parseFloat(val) * parseFloat(num))
				}

			}
			if (arrs.indexOf(id) == -1) {

				arrs.push(id);
				arrr.push(obj);
			} else {
				var cat_ind = arrs.indexOf(id);
			
				arrs.splice(arrs.indexOf(id), 1);
				arrr.splice(cat_ind, 1);
				arrs.push(id);
				arrr.push(obj);
			}
		
			$.each(arrr, function (key, vals) {
			


				$scope.subitems = vals.info.id + '|' + vals.info.val + '|' + vals.info.name;


				$scope.subprice += parseFloat(vals.info.price);

				$scope.subitem.push({
					qty: vals.info.qty,
					subcat_id: vals.info.cat,
					value: $scope.subitems,
				})

			})

			

			$scope.updgrate_price = $scope.subprice;
			$scope.total = (parseFloat($scope.price) * parseFloat($scope.qty)) + parseFloat($scope.updgrate_price);
			$scope.subcat_id = cat;
		}
	};

	$scope.qty_num = function (num) {
		if (num == '+') {
			$scope.qty += 1;
		}
		if (num == '-') {
			if ($scope.qty != 1)
				$scope.qty -= 1;
		}
		$scope.total = (parseFloat($scope.price) * parseFloat($scope.qty)) + parseFloat($scope.updgrate_price);

	};

	/*******************************************End price food item details    *********************************************/
	/*******************************************add to cart    *********************************************/
	var cart_value = [];
	$scope.carts = {};

	$scope.sub_item_cart = {};
	$scope.addToCart = function (item_id, merchant_id, ingredients, cooking_ref, discount) {
			var cart_value = [];
			if (sessionStorage.getItem('custom') != null && !sessionStorage.getItem('new')) {
				$scope.reqValid = 'You must select at least one addon - ' + sessionStorage.getItem('custom');
			} else {


				
				var order_nodes = document.querySelectorAll('#order_nodes')[0].value;
				cart_value.push({
					"item_id": item_id,
					"qty": $scope.qty,
					"price": parseFloat($scope.price),
					"sub_item": $scope.subitem,
					"cooking_ref": cooking_ref,
					"ingredients": ingredients,
					'order_notes': order_nodes,
					'discount': discount
				});
				

				var json = JSON.stringify(cart_value);

				$http.jsonp("http://mealoop.com/mobileapp/api/addToCart?&callback=JSON_CALLBACK&cart=" + json)
					.success(function successCallback(request) {
					

					});
				$http.jsonp('http://mealoop.com/mobileapp/api/loadCart?merchant_id=34&search_address=saint%20lucia&cart=' + JSON.stringify(cart_value) + "&callback=JSON_CALLBACK")
					.success(function successCallback(request) {
						$scope.carts = request.details.cart.cart;
						$scope.cartsOne = request.details.cart;

						$.each($scope.carts[0]['sub_item'], function (key, val) {
							$.each(val, function (key, val) {
								
								$scope.sub_item_cart[key] = val;

							});
						})

						myNavigator.pushPage('basket.html');

					});
			}
		}
	/****************************************** end add to cart    ********************************************/
	/*******************************************price food item details    *********************************************/
	$scope.updgrate_price = 0;
	$scope.subitem = '';
	$scope.subcat_id = '';
	$scope.qty = 1;
	$scope.get_price = function (val) {
		$scope.price = val;
		$scope.total = (parseInt($scope.price) + parseInt($scope.updgrate_price)) * parseInt($scope.qty);

	};

	$scope.updrate = function (val, id, name, cat) {
		$scope.updgrate_price = val;
		$scope.total = (parseInt($scope.price) + parseInt($scope.updgrate_price)) * parseInt($scope.qty);
		$scope.subcat_id = cat;
		$scope.subitems = val + '|' + id + '|' + name;
	};

	$scope.qty_num = function (num) {
		if (num == '+') {
			$scope.qty += 1;
		}
		if (num == '-') {
			if ($scope.qty != 1)
				$scope.qty -= 1;
		}
		$scope.total = (parseInt($scope.price) + parseInt($scope.updgrate_price)) * parseInt($scope.qty);

	};


	$scope.cart = function () {
			myNavigator.pushPage('cart.html');
		}
	/*******************************************End price food item details    *********************************************/
	/************************** edit Address Book  ******************************************/

	$scope.edit_address = function (address) {
		$scope.valid_eadrstreet = '';
		$scope.valid_ecity = '';
		$scope.valid_estate = '';
		$scope.valid_ezip = '';
		$scope.valid_elocation = '';
	

		$scope.check = false;
		$scope.checkboxModel = {
			value2: false
		};


		$http.jsonp("http://mealoop.com/mobileapp/api/getAddressBookDetails?client_token=" + profile_token + "&id=" + address + "&lang_id=" + "" + "&callback=JSON_CALLBACK")
			.success(function successCallback(response) {
				$scope.edraddid = response.details.id;
				$scope.Street = response.details.street;
				$scope.City = response.details.city;
				$scope.State = response.details.state;
				$scope.Zip = response.details.state;
				$scope.Location = response.details.zipcode;
				if (response.details.as_default == 2) {
					$scope.checkboxModel.value2 = true;
				} else {
					$scope.checkboxModel.value2 = false;
				}
			});
		myNavigator.pushPage("editshowAddressBook.html");

	}
	$scope.valid_eadrstreet = '';
	$scope.valid_ecity = '';
	$scope.valid_estate = '';
	$scope.valid_ezip = '';
	$scope.valid_elocation = '';
	$scope.edit_address_save = function (address) {
			$scope.valid_eadrstreet = '';
			$scope.valid_ecity = '';
			$scope.valid_estate = '';
			$scope.valid_ezip = '';
			$scope.valid_elocation = '';
			var edrstreet = document.querySelector('#edrstreet').value;
			var edrcity = document.querySelector('#edrcity').value;
			var edrstate = document.querySelector('#edrstate').value;
			var edrzip = document.querySelector('#edrzip').value;
			var edrlocation = document.querySelector('#edrlocation').value;
			profile_token = sessionStorage.getItem('token');
			if (edrstreet.trim() && edrcity.trim() && edrstate.trim() && edrzip.trim() && edrlocation.trim()) {

				var es_default
				if ($scope.checkboxModel.value2 == true) {
					es_default = "&as_default=2";
				} else {
					es_default = "";
				}
				$http.jsonp("http://mealoop.com/mobileapp/api/saveAddressBook?id=" + address + "&action=edit&street=" + edrstreet + "&city=" + edrcity + "&state=" + edrstate + "&zipcode=" + edrzip + "&location_name=" + edrlocation + es_default + "&client_token=" + profile_token + "&callback=JSON_CALLBACK")
					.success(function successCallback(response) {
						ons.notification.alert({
							message: 'successfully updated',
						});
						$scope.showAddressBookPop();


					});
			} else {
				if (edrstreet.trim() == "") {
					$scope.valid_eadrstreet = "Street is Required";

				}
				if (edrcity.trim() == "") {
					$scope.valid_ecity = "City is Required";

				}
				if (edrstate.trim() == "") {
					$scope.valid_estate = "State is Required";

				}
				if (edrzip.trim() == "") {
					$scope.valid_ezip = "Zip Code is Required";

				}
				if (edrlocation.trim() == "") {
					$scope.valid_elocation = "Location Name is Required";

				}

			}
		}
	/************************** End edit Address Book      ******************************************/
	/************************** delete Address Book  ******************************************/
	function delete_address(num) {
	
		$http.jsonp("http://mealoop.com/mobileapp/api/deleteAddressBook?client_token=" + profile_token + "&id=" + num + "&lang_id=" + "" + "&callback=JSON_CALLBACK")
			.success(function successCallback(response) {
				$scope.showAddressBook();
			});

	}
	/*****************filter******************/
	$scope.filter = function () {
			myNavigator.pushPage('filter.html');
		}
	/*******************filter end**************************/
	/***********Next Step**********/
	$scope.nextStep = function () {
			myNavigator.pushPage('orderlogin.html');
		}
	/***********Next Step end**********/




	$scope.confirm = function (material, num) {
			var mod = material ? 'material' : undefined;

			ons.notification.confirm({
				message: 'Are you sure you want to continue?',
				modifier: mod,
				buttonLabels: ["No", "Yes"],
				callback: function (idx) {
					switch (idx) {
						case 0:
							break;
						case 1:
							delete_address(num);
							break;
					}
				},

			});
		}
	/***************************end delete Address Book  *******************************************/
	/*******************************************Logout *********************************************/
	$scope.logout = function () {
		sessionStorage.removeItem('token')
		$scope.style_load = {
			"display": "none"
		};
		$scope.alert(false, 'Logout Successfuly Done');
	}

}).filter('html', function ($sce) {
	// for Unicode
	return function (input) {
		return $sce.trustAsHtml(input);
	}
});

app.filter('searchFor', function () {

 // All filters must return a function. The first parameter
 // is the data that is to be filtered, and the second is an
 // argument that may be passed with a colon (searchFor:searchString)

 return function (arr, searchString) {

  if (!searchString) {
   var red = document.getElementsByClassName('reds')
   for (var z = 0; z < red.length; z++) {
    red[z].removeAttribute('style')

   }
   return arr;
  }

  var result = [];

  searchString = searchString.toLowerCase();
        

  // Using the forEach helper method to loop through the array
  angular.forEach(arr, function (restaurants,key) {
   if (restaurants.restaurant_name.toLowerCase().indexOf(searchString) !== -1) {
    result.push(restaurants);
    
     searchInput = document.querySelectorAll('#search_rest')[document.querySelectorAll('#search_rest').length-1].value;
    var rexExp = new RegExp(searchInput, 'gi');
    var rest_address = document.getElementsByClassName('rest_address');
   
                if(rest_address[key]){
    $('.rest_address').each(function(){
                  $(this).html($(this).text().replace(rexExp, "<span class='reds' style='color:#bd4747;text-transform:capitalize'>" + searchInput + "</span>"))
     })

                }
   } else if (restaurants.cuisine.toLowerCase().indexOf(searchString) !== -1) {
    result.push(restaurants);
  
     searchInput = document.querySelectorAll('#search_rest')[document.querySelectorAll('#search_rest').length-1].value;
    
    var rexExp = new RegExp(searchInput, 'gi');
    var rest_food = document.getElementsByClassName('rest_food');

                if(rest_food[key]){
                  $('.rest_food').each(function(){
                  $(this).html($(this).text().replace(rexExp, "<span class='reds' style='color:#bd4747;text-transform:capitalize'>" + searchInput + "</span>"))
     })
                    }
   }
            

  });

  restaurants = result;
  return restaurants;
 };

});