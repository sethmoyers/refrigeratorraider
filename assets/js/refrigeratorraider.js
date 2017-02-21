angular.module("myApp", []).controller('CartController', function($scope, $http) {
	// check to see if local storage is empty
	if (localStorage.getItem("my_cart") != null) {
		console.log("Local Storage Exist!");
		var isCart = true;
		loadCart();
		// load from local storage
	} else {
		// else load default if nothing found in local storage
		$scope.items = [{
			item_description : 'Eggs',
			item_brand : 'Stop and Shop',
			item_quantity : 1
		}, {
			item_description : 'Bread',
			item_brand : 'Wonder',
			item_quantity : 1
		}, {
			item_description : 'Milk',
			item_brand : 'Dairy Fresh',
			item_quantity : 1
		}];
	}
	$scope.removeItem = function(index) {
		$scope.items.splice(index, 1);
	};
	$scope.newItem = function(index) {
		$scope.items.push({
			item_description : 'New Item',
			item_brand : 'Store Brand',
			item_quantity : 1
		});
	};
	 $scope.incrementItem = function(index) {
	 	$scope.items[index].quantity = parseInt($scope.items[index].quantity) + 1;
	};
	 $scope.decrementItem = function(index) {
	 	if (parseInt($scope.items[index].quantity) > 0) {
	 		$scope.items[index].quantity = parseInt($scope.items[index].quantity) - 1;
		}
	};
	$scope.saveList = function() {
		var storage = JSON.stringify($scope.items);
		localStorage.setItem("my_cart", storage);
	};
	$scope.deleteList = function() {
		localStorage.removeItem("my_cart");
	};
	$scope.placeOrder = function() {
		alert("Thank you for you Order.  Your Order has been placed.");
		var storage = JSON.stringify($scope.items);
		localStorage.setItem("my_cart", storage);
	};
	$scope.updateTotal = function() {
		var sum = 0;
		angular.forEach($scope.items, function(item) {
			sum += (item.item_quantity * item.item_brand);
		});
		return sum;
	};
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
    			// $("article#logon").addClass("close");
    			// $("article#logon").removeClass("active");
    			// $("body").removeClass("is-article-visible");
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
		console.log('noooo');

		location.hash = '';
							
		};
	function loadCart() {// load cart from local storage
		// retrieve data from local storage
		var storage = localStorage.getItem("my_cart");
		// parse the data to JSON
		$scope.items = JSON.parse(storage);
	}
	$scope.loadShoppingList = function() {
		if (!isCart) {
			$http.get("data/getshoppinglist.php").success(function(data, status, headers, config) {
				$scope.items = data.hits
			});
		}
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
		localStorage.setItem("my_cart", storage);
	};
	//DONE BREAKING STUFF



});


