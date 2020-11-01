$(function() {
	"use strict";
	let $formRegister = $(".formRegister");
	$formRegister.submit(handleRegister);
	
	function handleRegister(e) {
		e.preventDefault();
		//get the user input data from the register form	
		$(".info").empty(); 
		let formData = $formRegister.serializeArray();
		formData = formData.reduce((obj, itm) => {
			obj[itm.name] = itm.value;
			return obj;
		}, {});

		let $inputs = $formRegister.find("input, select, button, textarea");
		$inputs.prop("disabled", true);

		$.ajax({
			url: "../php/registerUser.php",
			dataType: "json",
			data: formData,
			type: "POST"
		}).done((response, textStatus, jqXHR) => {
			let message = response.message || "";
			let success = response.success || false;
			let errors = response.errors || [];
			if (!success && errors.length > 0) {
				$.each(errors, (idx, error) => {
					$(".info").append(
						$("<div>").prop({
							innerHTML: error,
							className: "alert alert-danger"
						})
					);
				});
			} else {
				$(".info").append(
					$("<div>").prop({
						innerHTML: message,
						className: "alert alert-success"
					})
				);
			}
		}).fail((jqXHR, textStatus, errorThrown) => {
			console.error(`Error: ${textStatus}, ${errorThrown}`);
			$(".info").append(
					$("<div>").prop({
						innerHTML: `Error ${textStatus}, ${errorThrown}`,
						className: "alert alert-danger"
					})
				);
		}).always(() => {
			$inputs.prop("disabled", false);
		});
	}
});