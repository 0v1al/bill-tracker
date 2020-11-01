<?php
session_start();
define("__ROOT__", dirname(__FILE__));
require(__ROOT__ . "/conn.php");

$success = false;
$message = "";
$errors = array();
$outcomeValue = trim($_POST["outcome"]);
$outcomeValue = floatval($outcomeValue);
$outcomeValue = -1 * abs($outcomeValue);
$spentOn = trim($_POST["spent-on"]);
$monetaryUnit = trim($_POST["outcome-unit"]);

if (empty($outcomeValue)) {
     array_push($errors, "Outcome value must be completed");
}

if (empty($monetaryUnit)) {
     array_push($errors, "Choose a monetary unit");
}

if (count($errors) == 0) {
     try {
          $userEmail = $_SESSION["USER_EMAIL"];
          $stmt = $conn->prepare("INSERT INTO outcome (user_email, unit, value, spent_on) VALUES (:user_email, :unit, :value, :spent_on)");
          $stmt->bindParam(":user_email", $userEmail, PDO::PARAM_STR);
          $stmt->bindParam(":unit", $monetaryUnit, PDO::PARAM_STR);
          $stmt->bindParam(":value", $outcomeValue, PDO::PARAM_STR);
          $stmt->bindParam(":spent_on", $spentOn, PDO::PARAM_STR);
          $stmt->execute();
          $success = true;
          $message = "Your outcome was added";
     } catch (PDOException $e) {
          echo "error: " . $e->getMessage();
     }
}

$conn = null;
echo json_encode(array("errors" => $errors, "success" => $success, "message" => $message));
exit;
