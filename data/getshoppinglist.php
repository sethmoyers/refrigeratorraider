<?php
//phpinfo();
//open connection to mysql db
$connection = mysqli_connect("ausantnet.fatcowmysql.com","cs633user","termproject001","cs633") or die("Error " . mysqli_error($connection));
//$connection = mysqli_connect("127.0.0.1","cs633user","termproject001","cs633") or die("Error " . mysqli_error($connection));
//fetch table rows from mysql db
$sql = "SELECT item.item_description, item.item_brand, refrigerator_items.quantity 
		FROM item 
		INNER JOIN refrigerator_items on refrigerator_items.item_id = item.item_id 
		WHERE refrigerator_items.refrigerator_id = 2;";

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