// Seth writing logon here!
$scope.logonSystem = function() {
	//$http.getUser()
	var UserName = document.getElementById("reg_email").value
	console.log(UserName);
}

$('#loginSubmit').on("click", function() {
	var UserName = $('#UserEmail').val();
	var UserPassword = $('#UserPassword').val();
	//var Submit = $( this ).val();
	console.log(UserName);
	console.log(UserPassword);

	$.ajax({
		url : '/data/verifyuser.php',
		data : {
			format : 'json',
			name : UserName,
			password : UserPassword
		},
		error : function() {
			$('#info').html('<p>An error has occurred</p>');
		},
		dataType : 'jsonp',
		success : function(data) {
			console.log(data);
			var user = data
		}
	});
}); 