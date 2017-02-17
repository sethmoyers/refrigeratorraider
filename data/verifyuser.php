<?php
//phpinfo();
//open connection to mysql db
$connection = mysqli_connect("ausantnet.fatcowmysql.com","cs633user","termproject001","cs633") or die("Error " . mysqli_error($connection));

//fetch table rows from mysql db
$UserName = $_POST['name'];
$Password = $_POST['password'];

$sql = "select * from user WHERE user.email = ".$UserName."AND user.password = ".$password;
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));



return json_encode('dkisjksjsdj!!!');
echo $callback. json_encode($result);

//close the db connection
mysqli_close($connection);
?>