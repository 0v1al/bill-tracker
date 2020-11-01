$(function () {
     "use strict";

     //set global variables from form
     let $tableIncomOutcomeBody = $(".table-body-income-outcome");
     let $tableIncomeOutcome = $(".table-income-outcome");

     //set static event listeners
     $(".income-form").submit(handleAddIncome);
     $(".outcome-form").submit(handleAddOutcome);

     //clear input form
     function clearInput() {
          $(":input", ".outcome-form")
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
          $(":input", ".income-form")
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
     }

     //add income
     function handleAddIncome(e) {
          e.preventDefault();

          let $formIncome = $(".income-form");

          $(".info").empty();

          let formData = $formIncome.serializeArray();
          formData = formData.reduce((obj, itm) => {
               obj[itm.name] = itm.value;
               return obj;
          }, {});

          let $inputs = $formIncome.find("input, select, textarea, button");
          $inputs.prop("disabled", true);

          $.ajax({
               url: "../php/addIncome.php",
               type: "POST",
               data: formData
          }).done((response, textStatus, jqXHR) => {
               const { errors, success, message } = JSON.parse(response);
               if (errors.length > 0) {
                    $.each(errors, (idx, error) => {
                         $(".info").append(
                              $("<div>").prop({
                                   innerHTML: error,
                                   className: "alert alert-danger"
                              })
                         );
                    });
               } else {
                    if (success) {
                         $(".info").append(
                              $("<div>").prop({
                                   innerHTML: message,
                                   className: "alert alert-success"
                              })
                         );
                    }
               }
          }).fail((jqXHR, textStatus, errorThrown) => {
               console.error(`Error: ${textStatus}, ${errorThrown}`);
               $(".info").append(
                    $("<div>").prop({
                         innerHTML: `Error: ${textStatus}, ${errorThrown}`,
                         className: `alert alert-danger`
                    })
               );
          }).always(() => {
               $inputs.prop("disabled", false);
               clearInput();
               init();
          });
     }

     //add outcome
     function handleAddOutcome(e) {
          e.preventDefault();

          let $formOutcome = $(".outcome-form");

          $(".info-outcome").empty();

          let formData = $formOutcome.serializeArray();
          formData = formData.reduce((obj, itm) => {
               obj[itm.name] = itm.value;
               return obj;
          }, {});

          let $inputs = $formOutcome.find("input, select, textarea, button");
          $inputs.prop("disabled", true);

          $.ajax({
               url: "../php/addOutcome.php",
               type: "POST",
               data: formData
          }).done((response, textStatus, jqXHR) => {
               const { errors, success, message } = JSON.parse(response);
               if (errors.length > 0) {
                    $.each(errors, (idx, error) => {
                         $(".info-outcome").append(
                              $("<div>").prop({
                                   innerHTML: error,
                                   className: "alert alert-danger"
                              })
                         );
                    });
               } else {
                    if (success) {
                         $(".info-outcome").append(
                              $("<div>").prop({
                                   innerHTML: message,
                                   className: "alert alert-success"
                              })
                         );
                    }
               }
          }).fail((jqXHR, textStatus, errorThrown) => {
               console.error(`Error: ${textStatus}, ${errorThrown}`);
               $(".info-outcome").append(
                    $("<div>").prop({
                         innerHTML: `Error: ${textStatus}, ${errorThrown}`,
                         className: `alert alert-danger`
                    })
               );
          }).always(() => {
               $inputs.prop("disabled", false);
               clearInput();
               init();
          });
     }

     //list all incomes and outcomes
     function listAllIncomesAndOutcomes(callback) {
          $(".spinner").removeClass("hide");
          $.ajax({
               url: "../php/getAllIncomesAndOutcomes.php",
               type: "GET"
          }).done((response, textStatus, jqXHR) => {
               const { errors, success, userOutcomes, userIncomes } = JSON.parse(response);
               let incomesAndOutcomes = [...userIncomes, ...userOutcomes].sort((itm1, itm2) => {
                    let dateItm1 = new Date(itm1.created_at);
                    let dateItm2 = new Date(itm2.created_at);
                    if (dateItm1 > dateItm2) {
                         return -1
                    };
                    return 1;
               });
               if (errors.length > 0) {
                    $.each(errors, (idx, error) => {
                         $(".info-table").append(
                              $("<div>").prop({
                                   innerHTML: error,
                                   className: "alert alert-danger"
                              })
                         );
                    });
               } else {
                    if (success && errors.length === 0) {
                         if (incomesAndOutcomes.length === 0) {
                              $(".income-outcome-table-title")
                                   .text("No income/outcome was registered yet")
                                   .addClass("text-center");
                         } else {
                              $(".income-outcome-table-title").text("Income/Outcome");
                              $tableIncomOutcomeBody.empty();
                              localStorage.setItem("userIncomes", JSON.stringify(userIncomes));
                              localStorage.setItem("userOutcomes", JSON.stringify(userOutcomes));
                              let tableBodyContentHtml;
                              incomesAndOutcomes.forEach((itm, idx) => {
                                   let color = itm.type === "income" ? "info-success" : "info-danger";
                                   tableBodyContentHtml += `
                                        <tr data-id=${itm.id} data-type=${itm.type}>
                                             <td>${++idx}</td>
                                             <td>
                                                  ${itm.type[0].toUpperCase()}${itm.type.slice(1)}
                                            </td>
                                             <td class=${color}>${itm.value}</td>
                                             <td>${itm.unit}</td>
                                             <td>${itm.type === "income" ? itm.income_source : itm.spent_on}</td>
                                             <td>${itm.created_at}</td>
                                             <td>${
                                                  itm.type === "income" 
                                                  ? "<i class='fas fa-caret-up arrow arrow-up'></i>" 
                                                  : "<i class='fas fa-caret-down arrow arrow-down'></i>"
                                             }</td>
                                             <td class="delete-btn-income-outcome">
                                                  <i class="fas fa-trash"></i>
                                             </td>
                                        </tr>
                                   `;
                              });
                              $tableIncomOutcomeBody.append(tableBodyContentHtml);
                              $tableIncomeOutcome.removeClass("hide");
                         }
                    }
               }
          }).fail((jqXHR, textStatus, errorThrown) => {
               console.error(`Error: ${textStatus}, ${errorThrown}`);
          }).always(() => {
               $(".spinner").addClass("hide");
               if (callback && typeof callback === "function") { 
                    callback(); 
               }
          });
     }

     function deleteIncomeOutcome() {
          let id = Number($(this).parent().data("id"));
          let type = String($(this).parent().data("type"));
          let data = { id, type };

          if (confirm("Are youe sure that you want to delete this record?")) {
               $.ajax({
                    url: "../php/deleteIncomeOutcome.php",
                    type: "POST",
                    data: data
               }).done((response, status, jqXHR) => {
                    const { success, message } = JSON.parse(response);
                    
                    if (success) {
                         $("table-container .info-table").empty();
                         $(".table-container .info-table").addClass("info-success").text(message);
                    }
               }).fail((jqxhr, status, error) => {
                    console.error(`Error: ${status}, ${error}`);
               }).always(() => {
                    init();
               });
          }
     };

     //render content and set dynamic event listeners
     function init() {
          listAllIncomesAndOutcomes(() => {
               $(".delete-btn-income-outcome").click(deleteIncomeOutcome);     
          });
     }

     init();
});