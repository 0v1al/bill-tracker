<?php 
	define("__ROOT__", dirname(__FILE__));
	require(__ROOT__."/conn.php");

	$message = "";
	$success = false;
	$errors = array();
	$name = trim($_POST["name"]);
	$email = trim($_POST["email"]);
	$password = trim($_POST["password"]);
	$repeatPassword = trim($_POST["repeatPassword"]);

	if (empty($name)) { array_push($errors, "Username is required"); }
	if (empty($email)) { array_push($errors, "Email is required"); }
	if (empty($password)) { array_push($errors, "Password is required"); }
	if ($repeatPassword != $password) { array_push($errors, "Passwords do not match"); }
	// //check for a user who has the same email
	try {
		$stmt = $conn->prepare("SELECT 1 FROM users WHERE email=:email LIMIT 1");
		$stmt->bindParam(':email', $email);
		$stmt->execute();
		if ($stmt->fetchColumn()) {
			array_push($errors, "A user with this email already exist");
		} else {
			if (count($errors) == 0) {
				$passwordCrypted = md5($password);
				$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
				$stmt->bindParam(':name', $name);
				$stmt->bindParam(':email', $email);
				$stmt->bindParam(':password', $passwordCrypted);
				$stmt->execute();
				$success = true;
				$message = "Account created. Now you can logg in";
				http_response_code(201);
			}
		}
	} catch (PDOException $e) {
		echo "Error " . $e->getMessage();
	}
 	
	$conn = null;
	$errors_unique = array_unique($errors);
	$arr = array('success' => $success, 'errors' => $errors_unique, 'message' => $message);
 	echo json_encode($arr);
?>