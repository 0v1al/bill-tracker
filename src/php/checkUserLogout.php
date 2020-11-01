<?php
if ($_SESSION["USER_LOGGED"] === false || empty($_SESSION["USER_EMAIL"])) {
	header("location: login.php");
}
