// ***
// *** Added by B. Austin
// *** Code to TURN OFF all menu list items
// *** except the LOGON Menu item
// ***
// window.onload = function() {  // execute on form load
$(document).ready(function() {  // execute on form load {
	$("#viewsupplier_menu").hide();
	$("#about_menu").hide();
	$("#help_menu").hide();
	$("#fridgeraider_menu").hide();
	$("#fridgeowner_menu").hide();
	$("#shopping_menu").hide();
});