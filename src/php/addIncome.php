<?php
define("__ROOT__", dirname(__FILE__));
require(__ROOT__ . "/conn.php");

$success = false;
$message = "";
session_start();
$errors = array();
$incomeValue = trim($_POST["income"]);
$incomeValue = floatval($incomeValue);
$incomeValue = abs($incomeValue);
$incomeSource = trim($_POST["income-source"]);
$monetaryUnit = trim($_POST["unit"]);

if (empty($incomeValue)) {
     array_push($errors, "Income value must be completed");
}

if (empty($monetaryUnit)) {
     array_push($errors, "Choose a monetary unit");
}

if (count($errors) == 0) {
     try {
          $userEmail = $_SESSION["USER_EMAIL"];
          $stmt = $conn->prepare("INSERT INTO income (user_email, unit, value, income_source) VALUES (:user_email, :unit, :value, :income_source)");
          $stmt->bindParam(":user_email", $userEmail, PDO::PARAM_STR);
          $stmt->bindParam(":unit", $monetaryUnit, PDO::PARAM_STR);
          $stmt->bindParam(":value", $incomeValue, PDO::PARAM_STR);
          $stmt->bindParam(":income_source", $incomeSource, PDO::PARAM_STR);
          $stmt->execute();
          $success = true;
          $message = "Your income was added";
     } catch (PDOException $e) {
          echo "error: " . $e->getMessage();
     }
}

echo json_encode(array("errors" => $errors, "success" => $success, "message" => $message));
exit;
