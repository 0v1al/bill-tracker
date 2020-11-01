<?php
session_start();

define("__ROOT__", dirname(__FILE__));
require(__ROOT__ . "/conn.php");

$message = "";
$success = false;

if (isset($_POST["type"]) && isset($_POST["id"]) && is_numeric($_POST["id"]) && $_POST["id"] > 0) {

     try {
          $userEmail = $_SESSION["USER_EMAIL"];
          $id = $_POST["id"];
          $type = $_POST["type"];

          if ($type === "income") {
               $stmt = $conn->prepare("DELETE FROM income WHERE id=:id AND type=:type AND user_email=:email");
               $stmt->bindParam(":id", $id, PDO::PARAM_INT);
               $stmt->bindParam(":type", $type, PDO::PARAM_STR);
               $stmt->bindParam(":email", $userEmail, PDO::PARAM_STR);
               $stmt->execute();

               if (!$stmt->rowCount()) {
                    echo "Error at deleting the income record";
               }

               $message = "The income was deleted with success";
               $success = true;
          } else if ($type === "outcome") {
               $stmt = $conn->prepare("DELETE FROM outcome WHERE id=:id AND type=:type AND user_email=:email");
               $stmt->bindParam(":id", $id, PDO::PARAM_INT);
               $stmt->bindParam(":type", $type, PDO::PARAM_STR);
               $stmt->bindParam(":email", $userEmail, PDO::PARAM_STR);
               $stmt->execute();

               if (!$stmt->rowCount()) {
                    echo "Error at deleting the outcome record";
               }

               $message = "The outcome was deleted with success";
               $success = true;
          }
          echo json_encode(array("success" => $success, "message" => $message));
     } catch (PDOException $e) {
          echo "error: " . $e->getMessage();
          die;
     }
} else {
     echo "Error the invalid data";
}

$conn = null;
exit;
