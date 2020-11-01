<?php
session_start();
define("__ROOT__", dirname(__FILE__));
require(__ROOT__ . "/conn.php");

$success = false;
$errors = array();
$userEmail = $_SESSION["USER_EMAIL"];
$userIncomes = array();
$userOutcomes = array();

try {
	$stmt1 = $conn->prepare("SELECT * FROM income WHERE user_email=:email");
	$stmt1->bindParam(":email", $userEmail, PDO::PARAM_STR);
	$stmt1->execute();
	$userIncomes = $stmt1->fetchAll(PDO::FETCH_OBJ);
	$stmt1 = null;

	$stmt2 = $conn->prepare("SELECT * FROM outcome WHERE user_email=:email");
	$stmt2->bindParam(":email", $userEmail, PDO::PARAM_STR);
	$stmt2->execute();
	$userOutcomes = $stmt2->fetchAll(PDO::FETCH_OBJ);
	$stmt2 = null;
	$success = true;
} catch (PDOException $e) {
	echo "error: " . $e->getMessage();
	die;
}

$conn = null;
echo json_encode(array("errors" => $errors, "success" => $success, "userIncomes" => $userIncomes, "userOutcomes" => $userOutcomes));
exit;
