// ***
// *** Added by B. Austin
// *** Code to TURN OFF all menu list items
// *** except the LOGON Menu item
// ***
// window.onload = function() {  // execute on form load
$(document).ready(function() {
	// ** Added: 02-23-2017 B. Austin
	// ** Validate Quantity Fields are Numbers Only
	// **
	console.log( "Finished Hiding Menu Items" );
	$('.onlyNumbers').bind('keydown',function(event){
		// the keycode for the key pressed 
		var keyCode = event.which;
		console.log( "Binding One" );
		// 48-57 Standard Keyboard Numbers
		var isStandard = (keyCode > 47 && keyCode < 58);
		
		// 96-105 Extended Keyboard Numbers (aka Keypad) 
		var isExtended = (keyCode > 95 && keyCode < 106);
		
		// 8 Backspace, 46 Forward Delete
		// 37 Left Arrow, 38 Up Arrow, 39 Right Arrow, 40 Down Arrow
		var validKeyCodes = ',8,37,38,39,40,46,';
		var isOther = (validKeyCodes.indexOf(',' + keyCode + ',') > -1);

		if (isStandard || isExtended || isOther) {
			console.log( "Handler for .keydown() called." );
			return true;
		} else {
			console.log( "Handler for .keydown() NOT called." );
			return false;
		}
	}).bind('blur',function(){
		// regular expression that matches everything that is not a number 
		var pattern = new RegExp('[^0-9]+', 'g');
		
		var $input = $(this);
		var value = $input.val();
		console.log( "Binding Two" );
		// clean the value using the regular expression 
		value = value.replace(pattern, '');
		$input.val(value);
	});
console.log( "Leaving Module" );

	$("#viewsupplier_menu").hide();
	$("#about_menu").hide();
	$("#help_menu").hide();
	$("#fridgeraider_menu").hide();
	$("#fridgeowner_menu").hide();
	$("#shopping_menu").hide();

});