angular.module("myApp", []).controller('CartController', function($scope, $http) {
	// check to see if local storage is empty
	if (localStorage.getItem("my_cart") != null) {
		console.log("Local Storage Exist!");
		loadCart();
		// load from local storage
	} else {
		// else load default if nothing found in local storage
		$scope.shopping_list_items = [{
			"item_description" : "Eggs",
			"item_brand" : "Stop and Shop",
			"item_quantity" : 1
		}, {
			"item_description" : "Bread",
			"item_brand" : "Wonder",
			"item_quantity" : 1
		}, {
			"item_description" : "Milk",
			"item_brand" : "Crowleys",
			"item_quantity" : 1
		}];
	}
	$scope.removeShoppingListItem = function(index) {
		$scope.shopping_list_items.splice(index, 1);
	};
	$scope.newShoppingListItem = function(index) {
		$scope.shopping_list_items.push({
			"item_description" : "Item",
			"item_brand" : "Brand",
			"item_quantity" : 1
		});
	};
	$scope.newItem = function(index) {  // new refrigerator item
		$scope.items.push({
			item_description : 'New Item',
			item_brand : 'Store Brand',
			item_quantity : 1
		});
	};
	 $scope.incrementShoppingListItem = function(index) {
	 	$scope.shopping_list_items[index].quantity = parseInt($scope.shopping_list_items[index].quantity) + 1;
	};
	 $scope.decrementShoppingListItem = function(index) {
	 	if (parseInt($scope.items[index].quantity) > 0) {
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
	$scope.saveList = function() {
		var storage = JSON.stringify($scope.items);
		localStorage.setItem("my_cart", storage);
	};
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
				$("#fridgeowner").show();
        		$("#shopping").show();
        		$("#about").show();
    			$("#help").show();
    			$("#supplier").hide();
    			$("#fridgeraider").hide();
    			break;
    		case '2':  // Business Manager
    			$('[href="#logon"]').text('Change Persona');
    			$("#fridgeowner").show();
        		$("#shopping").show();
    			$("#supplier").show();
        		$("#about").show();
    			$("#help").show();
    			$("#fridgeraider").hide();
        		break;
    		case '3':  // Refrigerator Raider
    			$('[href="#logon"]').text('Change Persona');
    			$("#fridgeraider").show();
        		$("#about").show();
    			$("#help").show();
    			$("#fridgeowner").hide();
    			$("#supplier").hide()
    			$("#shopping").hide();
		}
			setUser();
			loadFridgeItems();
			location.hash = '';				
		};
	
	// *** Local Storage Routines ***
	$scope.saveShoppingList = function() {
		var storage = JSON.stringify($scope.shopping_list_items);
		localStorage.setItem("my_cart", storage);
	};
	$scope.deleteShoppingList = function() {
		localStorage.removeItem("my_cart");
	};
	$scope.placeShoppingListOrder = function() {
		alert("Thank you for you Order.  Your Order has been placed.");
		var storage = JSON.stringify($scope.shopping_list_items);
		localStorage.setItem("my_cart", storage);
	};
	function setUser() {// Store User in local storage
		// Set User data to local storage 
		// 1=refrigerator owner, 2=business manager, 3=refrigerator raider
		// Value returned from Logon Screen
		localStorage.setItem("rr_user", ($(usertype).val()));
	}
	function getUser() {// Get User from local storage
		// retrieve data from local storage
		return localStorage.getItem("rr_user");
	}
	function loadCart() {// load cart from local storage
		// retrieve data from local storage
		var storage = localStorage.getItem("my_cart");
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
				$scope.items = data.hits
			});
	}

	//SETH BREAKS THINGS HERE
	function loadSuppliers () {

		console.log('Here');
		$http.get("data/getsuppliers.php").success(function(data, status, headers, config) {
			$scope.suppliers = data.hits
		});
		console.log($scope.suppliers);
	}

	$scope.newSupplier = function() {
		var storage = JSON.stringify($scope.suppliers);
		localStorage.setItem("my_suppliers", storage); //bda: changed from my_cart to my_suppliers.  You were overwriting my my_cart variable
	};
	//DONE BREAKING STUFF



});


