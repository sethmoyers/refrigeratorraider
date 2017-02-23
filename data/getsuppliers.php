<?php
//phpinfo();
//open connection to mysql db
//$connection = mysqli_connect("ausantnet.fatcowmysql.com","cs633user","termproject001","cs633") or die("Error " . mysqli_error($connection));
$connection = mysqli_connect("127.0.0.1","cs633user","termproject001","cs633") or die("Error " . mysqli_error($connection));

// Modified: 02-22-2017 by B. Austin
//fetch table rows from mysql db

// user id for query passed from calling program
$userid = $_GET['user_id'];

//fetch table rows from mysql db
$sql = "SELECT supplier.first_name, supplier.last_name, supplier.email, supplier.business_name, supplier.phone_number
		FROM supplier 
		WHERE supplier.user_id = " . $userid .";";

$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();

while($row =mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
}
$data = [
    "total_hits" => count($emparray),
    "max_score" => 100,
    "hits" =>  $emparray
];

$callback = "";
if (array_key_exists('callback', $_GET) == TRUE) {
    $callback = $_GET['callback'];
}
echo $callback. json_encode($data);

//close the db connection
mysqli_close($connection);
?>