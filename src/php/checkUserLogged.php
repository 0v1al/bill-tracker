<?php
	if (isset($_SESSION["USER_LOGGED"])) {
		if ($_SESSION["USER_LOGGED"]) {
			header("location: index.php");
		}
	}
 ?>