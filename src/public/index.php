<?php
session_start();
define("__ROOT__", dirname(__FILE__));
require("../php/checkUserLogout.php");
require(__ROOT__ . "/head.php");
?>
<!-- forms for adding outcome/incomes -->
<div class="row">
	<div class="col-md-6 mt-5">
		<h4 class="pb-2 text-uppercase">Add your income here</h4>
		<form class="w-100 m-auto shadow-sm border p-5 income-form" method="post">
			<div class="form-group">
				<label for="income" class="h6">Income value:</label>
				<input class="p-2 w-100 border border-dark" type="number" class="form-control" name="income" placeholder="Enter income value...">
			</div>
			<div class="form-group">
				<select class="custom-select border border-dark" name="unit">
					<option value="" selected>Choose the monetary unit...</option>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
				</select>
			</div>
			<div class="form-group">
				<label for="income-from" class="h6">Income source:</label>
				<input class="p-2 w-100 border border-dark" type="text" class="form-control" name="income-source" placeholder="Enter income source...">
				<small class="form-text text-muted">*This field is optional</small>
			</div>
			<button class="btn btn-primary px-4 text-uppercase font-weight-bold">Add Income</button>
			<div class="info mt-3"></div>
		</form>
	</div>
	<div class="col-md-6 mt-5">
		<h4 class="pb-2 text-uppercase">Add your outcome here</h4>
		<form class="w-100 m-auto shadow-sm border p-5 outcome-form" method="post">
			<div class="form-group">
				<label for="outcome" class="h6">Outcome value:</label>
				<input class="p-2 w-100 border border-dark" type="number" class="form-control" name="outcome" placeholder="Enter outcome value...">
			</div>
			<div class="form-group">
				<select class="custom-select border border-dark" name="outcome-unit">
					<option value="" selected>Choose the monetary unit...</option>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
				</select>
			</div>
			<div class="form-group">
				<label for="income-from" class="h6">Spent on:</label>
				<input class="p-2 w-100 border border-dark" type="text" class="form-control" name="spent-on" placeholder="Spent on...">
				<small class="form-text text-muted">*This field is optional</small>
			</div>
			<button class="btn btn-danger px-4 text-uppercase font-weight-bold">Add Outcome</button>
			<div class="info-outcome mt-3"></div>
		</form>
	</div>
</div>
<!-- table incomes/outcomes -->
<div class="row mt-5 mb-5">
	<div class="col-md-12 mt-5 table-container">
		<h6 class="income-outcome-table-title"></h6>
		<h6 class="info-table"></h6>
		<div class="d-flex justify-content-center">
			<div class="spinner-border text-success spinner hide" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<table class="table-income-outcome table table-bordered table-light table-hover table-striped mt-2 hide shadow-sm">
			<button class="btn btn-primary btn-sm btn-details-income-outcome">View Details</button>
			<thead class="bg-primary">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Type</th>
					<th scope="col">Value</th>
					<th scope="col">Unit</th>
					<th scope="col">Source/Spent On</th>
					<th scope="col">Date</th>
					<th scope="col"></th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody class="table-body-income-outcome">

			</tbody>
		</table>
	</div>
</div>
<div class="row mt-5 mb-5">
	<div class="col-md-6 card-details-container">
		<div class="card shadow-sm card-details-incomes-outcomes">
			<div class="card-header bg-primary text-light text-uppercase">Incomes/Outcomes Details</div>
			<div class="card-body card-details-income-outcome-body">
				<h6 class="card-subtitle mb-2 text-muted">View details about incomes/outcomes</h6>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<!-- <canvas id="myChart" width="400" height="400"></canvas> -->
	</div>
</div>
<!-- <script defer src="../js/incomeOutcomeChart.js"></script> -->
<script defer src="../js/income.js"></script>
<script defer src="../js/viewDetails.js"></script>
<?php
require(__ROOT__ . "/footer.php");
?>