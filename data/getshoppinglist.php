<?php

//phpinfo();
//open connection to mysql db
$connection = mysqli_connect("ausantnet.fatcowmysql.com","cs633user","termproject001","cs633") or die("Error " . mysqli_error($connection));

//fetch table rows from mysql db
$sql = "select * from item";
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
//echo json_encode($emparray);
//echo $_GET['callback'] . '('.json_encode($emparray).')';
$callback = "";
if (array_key_exists('callback', $_GET) == TRUE) {
    $callback = $_GET['callback'];
}
echo $callback. json_encode($data);

//close the db connection
mysqli_close($connection);
?>