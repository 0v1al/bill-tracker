<?php 
	session_start();
	define("__ROOT__", dirname(__FILE__));
	require("../php/checkUserLogged.php");
	require(__ROOT__."/head.php");
?>
	<section class="login-form my-4">
		<form class="w-50 m-auto shadow-sm border p-5 formRegister" method="post">
		  <h2 class="text-uppercase mb-3">Register Here</h2>
  		  <div class="form-group">
		    <label for="name">Name</label>
		    <input type="text" class="form-control" name="name" placeholder="Enter name..." required="">
		  </div>
		  <div class="form-group">
		    <label for="email">Email address</label>
		    <input type="text" class="form-control" name="email" placeholder="Enter email..." required="">
		    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  <div class="form-group">
		    <label for="password">Password</label>
		    <input type="password" class="form-control" name="password" placeholder="Enter password..." required="">
		  </div>
  		  <div class="form-group">
			    <label for="repeatPassword">Repeat Password</label>
			    <input type="password" class="form-control" name="repeatPassword" placeholder="Enter password again..." required="">
		  </div>
		  <button type="submit" class="btn btn-primary">Register</button>
		  	<p class="mt-2">Already registered? Login <a href="login.php">here</a></p>
		  	<div class="info"></div>
		</form>
	</section>
	<script defer type="text/javascript" src="./js/registerUser.js"></script>
<?php 
	require(__ROOT__."/footer.php");
?>

