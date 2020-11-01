<?php
	define("__ROOT__", dirname(__FILE__));
	require(__ROOT__."/conn.php");

	$message = "";
	$errors = array();
	$success = false;
	$email = trim($_POST["email"]);
	$password = trim($_POST["password"]);
	
	if (empty($email)) { array_push($errors, "Email is required"); }
	if (empty($password)) { array_push($errors, "Password is required"); }
	if (count($errors) === 0) {
		try {
			$stmt = $conn->prepare("SELECT * FROM users WHERE email=:email");
			$stmt->bindParam(":email", $email, PDO::PARAM_STR);
			$stmt->execute();
			$user = $stmt->fetch(PDO::FETCH_ASSOC);
			if (!$user) {
				array_push($errors, "A user with this email doesn't exist");
			} else {
				$id = $user["id"];
				$name = $user["name"];
				$email = $user["email"];
				$hashedPassword = $user["password"];
				if (md5($password) == $hashedPassword) {
					session_start();
					$_SESSION["USER_LOGGED"] = true;
					$_SESSION["USER_ID"] = $id;
					$_SESSION["USER_NAME"] = $name;
					$_SESSION["USER_EMAIL"] = $email;
					$message = "Login with success";
					$success = true;
				} else {
					array_push($errors, "Invalid credentials");
				}
			}
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
	}
	$conn = null;
	echo json_encode(array("message" => $message, "errors" => $errors, "success" => $success));
 ?>




