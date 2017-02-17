    angular.module("myApp",[])
      .controller('CartController', function ($scope, $http) {
        // check to see if local storage is empty
    	if (localStorage.getItem("my_cart") != null) {
			console.log("Local Storage Exist!");
			loadCart();  // load from local storage
		} else {
        // else load default if nothing found in local storage
        $scope.items = [{
            ITEM_DESCRIPTION: 'Eggs',
            ITEM_BRAND: 'Stop and Shop',
            ITEM_SIZE: '1 Dozen'
        }, {
            ITEM_DESCRIPTION: 'Bread',
            ITEM_BRAND: 'Wonder',
            ITEM_SIZE: '1 Loaf'
        }, {
            ITEM_DESCRIPTION: 'Milk',
            ITEM_BRAND: 'Dairy Fresh',
            ITEM_SIZE: '1 Gallon'
        }];
        }
        $scope.removeItem = function(index) {
            $scope.items.splice(index, 1);
        };
        $scope.newItem = function(index) {
            $scope.items.push({
                ITEM_DESCRIPTION: 'New Item',
                ITEM_BRAND: 'Store Brand',
                ITEM_SIZE: '1 Each'
            });
        };
        $scope.saveItem = function() {
            var storage = JSON.stringify($scope.items);
            localStorage.setItem("my_cart", storage);
        };
        $scope.updateTotal = function() {
            var sum = 0;
            angular.forEach($scope.items, function(item) {
                sum += (item.ITEM_SIZE * item.ITEM_BRAND);
            });
            return sum;
        };
        function loadCart(){   // load cart from local storage
        	// retrieve data from local storage
			var storage = localStorage.getItem("my_cart");
			// parse the data to JSON
			$scope.items = JSON.parse(storage);
        }
        $scope.loadShoppingList = function() {
            $http.get("data/getshoppinglist.php")
            .success(function (data, status, headers, config) {
                $scope.items = data.hits
            });
        }
    });