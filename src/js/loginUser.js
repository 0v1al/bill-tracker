$(function() {
	"use strict";
	let $formLogin = $(".form-login");
	$formLogin.submit(handleLogin);
	
	function handleLogin(e) {
		e.preventDefault();
		//get the user input data from the register form	
		$(".info").empty(); 
		let formData = $formLogin.serializeArray();
		formData = formData.reduce((obj, itm) => {
			obj[itm.name] = itm.value;
			return obj;
		}, {});

		let $inputs = $formLogin.find("input, select, button, textarea");
		$inputs.prop("disabled", true);

		$.ajax({
			url: "../php/loginUser.php",
			data: formData,
			type: "POST"
		}).done((response, textStatus, jqXHR) => {
			response = JSON.parse(response);
			if (!response.success || response.errors.length > 0) {
				$.each(response.errors, (idx, error) => {
					$(".info").append(
						$("<div>").prop({
							innerHTML: error,
							className: "alert alert-danger"
						})
					);
				});
			} else {
				window.location.replace("../public/index.php");
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