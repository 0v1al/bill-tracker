<?php 
	session_start();
	define("__ROOT__", dirname(__FILE__));
	require("../php/checkUserLogged.php");
	require(__ROOT__."/head.php");
?>
	<section class="login-form mt-4">
		<form class="w-50 m-auto shadow-sm border p-5 form-login">
		  <h2 class="text-uppercase mb-3">Login Here</h2>
		  <div class="form-group">
		    <label for="exampleInputEmail1">Email address</label>
		    <input type="email" class="form-control" name="email" placeholder="Enter email..." required="">
		    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  <div class="form-group">
		    <label for="exampleInputPassword1">Password</label>
		    <input type="password" class="form-control" name="password" placeholder="Enter password..." required="">
		  </div>
		  <button type="submit" class="btn btn-primary">Login</button>
		  	<p class="mt-2">Don't have an account? Register <a href="register.php">here</a></p>
			<div class="info"></div>
		</form>
	</section>
	<script defer type="text/javascript" src="../js/loginUser.js"></script>
<?php 
	require(__ROOT__."/footer.php");
?>

