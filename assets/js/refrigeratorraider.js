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
        // for debugging.  would comment out in real production environment
        console.log("CartController() function executed.");
        console.log($scope.items);
        console.log("Array Length: " + $scope.items.length);
        }
        $scope.removeItem = function(index) {
            $scope.items.splice(index, 1);
            // for debugging.  would comment out in real production environment
            console.log("removeBook() function executed.");
            console.log($scope.items);
            console.log("Array Length: " + $scope.items.length);
        };
        $scope.newItem = function(index) {
            $scope.items.push({
                ITEM_DESCRIPTION: 'New Item',
                ITEM_BRAND: 'Store Brand',
                ITEM_SIZE: '1 Each'
            });
            // for debugging.  would comment out in real production environment
            console.log("newItem() function executed.");
            console.log($scope.items);
            console.log("Array Length: " + $scope.items.length);
        };
        $scope.saveItem = function() {
            var storage = JSON.stringify($scope.items);
            localStorage.setItem("my_cart", storage);
            // for debugging.  would comment out in real production environment
            console.log("Saved.  Shopping Cart stored to local storage");
            console.log(storage);
        };
        $scope.updateTotal = function() {
            // for debugging.  would comment out in real production environment
            console.log("updateTotal() function called.");
            var sum = 0;
            angular.forEach($scope.items, function(item) {
                sum += (item.ITEM_SIZE * item.ITEM_BRAND);
                // for debugging.  would comment out in real production environment
                console.log("Added: " + item.ITEM_SIZE);
                console.log("Sum ====> " + sum);
            });
            return sum;
        };
        function loadCart(){   // load cart from local storage
            // for debugging.  would comment out in real production environment
        	console.log("Shopping Cart loading from local storage ...");
        	// retrieve data from local storage
			var storage = localStorage.getItem("my_cart");
            // for debugging.  would comment out in real production environment
			console.log("Storage: " + storage);
			// parse the data to JSON
			$scope.items = JSON.parse(storage);
            // for debugging.  would comment out in real production environment
			console.log("*** Loading Cart ***");
        }
//***

        $scope.loadShoppingList = function() {
            //$http.jsonp("../data/getshoppinglist.php?callback=JSON_CALLBACK")
            $http.get("../data/getshoppinglist.php")
            .success(function (data, status, headers, config) {
                console.log('%c *** Shopping List Data *** ', 'color: red');
                console.log("Status: " + status);
                console.log("Type: " + headers("content-type"));
                console.log("Length: " + headers("content-length"));
                console.log("FIELD DATA: " + data.hits[0].ITEM_BRAND);
                $scope.items = data.hits
                // console.log("DATA Desc: " + $scope.data);
                // console.log('%cItem: ' + $scope.data[0].item_brand , 'color: blue' );
                // //console.log('%cItem2: ' + $scope.data[0].hits[0].item_brand , 'color: green' );
                // console.log('%cItem3: ' + $scope.data.hits[0].item_brand , 'color: blue' );
            });
        }

//**
    });