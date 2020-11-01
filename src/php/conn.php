<?php 	
	$dbhost = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "bill_tracker";
	try {
		$conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo "connection failed: " . $e->getMessage();
		die();
	}
?>