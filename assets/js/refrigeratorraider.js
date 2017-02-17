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
	$scope.saveItem = function() {
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
});
