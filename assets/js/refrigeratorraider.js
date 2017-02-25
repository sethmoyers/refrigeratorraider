angular.module("myApp", [])
.controller('CartController', function($scope, $http) {
	$scope.removeShoppingListItem = function(index) {
		$scope.shopping_list_items.splice(index, 1);
	};
	$scope.newShoppingListItem = function(index) {
		$scope.shopping_list_items.push({
			description : "",
			brand : "",
			quantity : 1
		});
	};
	$scope.newItem = function(index) {  // new refrigerator item
		$scope.items.push({
			item_description : "",
			item_brand : "",
			quantity : 1
		});
	};
	$scope.newSupplier = function(index) {
		$scope.suppliers.push({
			first_name : "",
			last_name : "",
			email : "",
			business_name : "",
			phone_number : ""
		});
	};
	 $scope.incrementShoppingListItem = function(index) {
	 	$scope.shopping_list_items[index].quantity = parseInt($scope.shopping_list_items[index].quantity) + 1;
	};
	 $scope.decrementShoppingListItem = function(index) {
	 	if (parseInt($scope.shopping_list_items[index].quantity) > 0) {
	 		$scope.shopping_list_items[index].quantity = parseInt($scope.shopping_list_items[index].quantity) - 1;
		}
	};
	 $scope.incrementItem = function(index) {  // increment refrigerator item
	 	$scope.items[index].quantity = parseInt($scope.items[index].quantity) + 1;
	};
	 $scope.decrementItem = function(index) {    //  decrement refrigerator item
	 	if (parseInt($scope.items[index].quantity) > 0) {
	 		$scope.items[index].quantity = parseInt($scope.items[index].quantity) - 1;
		}
	};
	// $scope.saveList = function() {
	// 	var storage = JSON.stringify($scope.items);
	// 	localStorage.setItem($scope.my_cart, storage);
	// };
	$scope.removeItem = function(index) {
		$scope.items.splice(index, 1);
	};
	$scope.updateTotal = function() {
		var sum = 0;
		angular.forEach($scope.items, function(item) {
			sum += (item.item_quantity * item.item_brand);
		});
		return sum;
	};
	// *** Turn menu items on and off depending on persona
	$scope.getUserMenu = function() {
		switch ($(usertype).val()) {
			case '1':  // Refrigerator Owner
				$('[href="#logon"]').text('Change Persona');
				$("#fridgeowner_menu").show();
        		$("#shopping_menu").show();
        		$("#about_menu").show();
    			$("#help_menu").show();
    			$("#viewsupplier_menu").hide();
    			$("#fridgeraider_menu").hide();
    			break;
    		case '2':  // Business Manager
    			$('[href="#logon"]').text('Change Persona');
    			$("#fridgeowner_menu").show();
        		$("#shopping_menu").show();
    			$("#viewsupplier_menu").show();
        		$("#about_menu").show();
    			$("#help_menu").show();
    			$("#fridgeraider_menu").hide();
        		break;
    		case '3':  // Refrigerator Raider
    			$('[href="#logon"]').text('Change Persona');
    			$("#fridgeraider_menu").show();
        		$("#about_menu").show();
    			$("#help_menu").show();
    			$("#fridgeowner_menu").hide();
    			$("#viewsupplier_menu").hide();
    			$("#shopping_menu").hide();
		}
			setUser();
			loadFridgeItems();
			loadSuppliers();
			location.hash = '';				
		};
	
	// *** Local Storage Routines ***
	$scope.saveShoppingList = function() {
		var storage = JSON.stringify($scope.shopping_list_items);
		localStorage.setItem($scope.my_cart, storage);
		alert("Your shopping List has been saved.");
	};
	$scope.saveShoppingCartFirstRun = function() {
		var storage = JSON.stringify($scope.shopping_list_items);
		localStorage.setItem($scope.my_cart, storage);
	};
	$scope.deleteShoppingList = function() {
		localStorage.removeItem($scope.my_cart);
		alert("Your shopping List will be deleted when you leave this screen. The default list will be loaded the next time you return.  Or you can hit the Save button now to resave your current list.");
	};
	$scope.placeShoppingListOrder = function() {
		alert("Thank you for you Order.  Your Order has been placed.");
		var storage = JSON.stringify($scope.shopping_list_items);
		localStorage.setItem($scope.my_cart, storage);
	};
	function setUser() {// Store User in local storage
		// Set User data to local storage 
		// 1=refrigerator owner, 2=business manager, 3=refrigerator raider
		// Value returned from Logon Screen
		localStorage.setItem("rr_user", ($(usertype).val()));
		$scope.my_cart = "cart" + ($(usertype).val()).toString();
		// check to see if local storage is empty
		if (localStorage.getItem($scope.my_cart) !== null) {
			console.log("Local Storage Exist!");
			loadCart();
		// load from local storage
		} else {
		// else load default if nothing found in local storage
			$scope.shopping_list_items = [{
				description : "Eggs",
				brand : "Stop and Shop",
				quantity : 1
			}, {
				description : "Bread",
				brand : "Wonder",
				quantity : 1
			}, {
				description : "Milk",
				brand : "Crowleys",
				quantity : 1
			}];
			$scope.saveShoppingCartFirstRun();
		}
	}
	function getUser() {// Get User from local storage
		// retrieve data from local storage
		return localStorage.getItem("rr_user");
	}
	function loadCart() {// load cart from local storage
		// retrieve data from local storage
		var storage = localStorage.getItem($scope.my_cart);
		// parse the data to JSON
		$scope.shopping_list_items = JSON.parse(storage);
	}
	function loadFridgeItems() {
			$http.get("data/getfridgeitems.php",
				{
					params: {
								user_id: getUser()
							}
				}).success(function(data, status, headers, config) {
				$scope.items = data.hits;
			});
	}

	// Modified: 02-22-2017 by B. Austin
	function loadSuppliers() {
			$http.get("data/getsuppliers.php",
				{
					params: {
								user_id: getUser()
							}
				}).success(function(data, status, headers, config) {
				$scope.suppliers = data.hits;
			});
	}
})
// Modified: 02-24-2017 by B. Austin to convert string to number in string-to-number Angular filter
.run(function($rootScope) {
  $rootScope.typeOf = function(value) {
    return typeof value;
  };
})

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
});




