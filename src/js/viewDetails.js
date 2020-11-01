$(function() {
     "use strict";

     let $cardDetailsContainer = $(".card-details-container");
     let $btnDetailsIncomeOutcome = $(".btn-details-income-outcome");
     let $cardDetailsIncomeOutcomeBody =  $(".card-details-income-outcome-body")
     $btnDetailsIncomeOutcome.click(viewDetailsIncomeOutcome);

     function viewDetailsIncomeOutcome() {
          localStorage.setItem("viewDetailsShow", true);
          let month = ["January", "February", "March", "April", "May", "June", "July", "August", "July", "September", "October", "November", "December"];
          let userIncomes = JSON.parse(localStorage.getItem("userIncomes")).slice() || [];
          let userOutcomes = JSON.parse(localStorage.getItem("userOutcomes")).slice() || [];
          let totalIncome = 0, totalOutcome = 0;
          let uniqueIncomeSources = []; 
          let uniqueOutcomeSpentOn = [];
          let incomeMonthStart = null, incomeMonthEnd = null; 
          let outcomeMonthStart = null, outcomeMonthEnd = null;
          let sameMonth = false;

          if (userIncomes.length > 0) {
               let incomeSources = [];
              
               totalIncome = userIncomes.reduce((sum, { value }) => sum + Number(value), 0);
              
               userIncomes.forEach(({ income_source }) => {
                    incomeSources.push(income_source.toLowerCase());
               });
              
               incomeSources.forEach(source => {
                    if (!uniqueIncomeSources.includes(source)) {
                         uniqueIncomeSources.push(source);
                    }
               });
              
               incomeMonthStart = month[new Date(userIncomes[0].created_at).getMonth()];
               incomeMonthEnd = month[new Date(userIncomes[userIncomes.length - 1].created_at).getMonth()];
          }

          if (userOutcomes.length > 0) {
               let outcomeSpentOn = [];
               
               totalOutcome = userOutcomes.reduce((sum, { value }) => sum + Number(value), 0);
               
               userOutcomes.forEach(({ spent_on }) => {
                    outcomeSpentOn.push(spent_on.toLowerCase());
               });
               
               outcomeSpentOn.forEach(spentOn => {
                    if (!uniqueOutcomeSpentOn.includes(spentOn)) {
                         uniqueOutcomeSpentOn.push(spentOn);
                    }
               });
               
               outcomeMonthStart = month[new Date(userOutcomes[0].created_at).getMonth()];
               outcomeMonthEnd = month[new Date(userOutcomes[userOutcomes.length - 1].created_at).getMonth()];
          }

          let total = totalIncome - Math.abs(totalOutcome);
          let incomesOutcomesDetails = { 
               total, 
               totalIncome, 
               totalOutcome, 
               uniqueIncomeSources, 
               uniqueOutcomeSpentOn,
               incomeMonthStart,
               incomeMonthEnd,
               outcomeMonthStart,
               outcomeMonthEnd
          };
          
          localStorage.setItem("incomesOutcomesDetails", JSON.stringify(incomesOutcomesDetails));
          //adding income/outcome details to card in the dom
          $cardDetailsIncomeOutcomeBody.empty();

          let monthStart = null, monthEnd = null;
          
          if (month.indexOf(incomeMonthStart) <  month.indexOf(outcomeMonthStart)) {
               monthStart = incomeMonthStart;
          } else {
               monthStart = outcomeMonthStart;
          }

          if (month.indexOf(incomeMonthEnd) >  month.indexOf(outcomeMonthEnd)) {
               monthEnd = incomeMonthEnd;
          } else {
               monthEnd = outcomeMonthEnd;
          }

          if (monthStart.toLowerCase() === monthEnd.toLowerCase()) {
               sameMonth = true;
          }

          let colorTotal = total > 0 ? "info-success" : "info-danger";
          let contentCardDetailsBody = `
               <p class="card-text card-text-details m-0">Total: <span class="${colorTotal}">${total}</span></p>
               <p class="card-text m-0 card-text-details">Total income: <span class="text-success">${totalIncome}</span></p>
               <p class="card-text mt-0 mb-2 card-text-details">Total outcome: <span class="text-danger">${totalOutcome}</span></p>
          `;
          contentCardDetailsBody += `
               <p class="card-text-details">Money sources:</p>
               <ul class="list-group list-group-horizontal-sm mb-2 ml-4">
          `;

          uniqueIncomeSources.forEach(incomeSource => {
               contentCardDetailsBody += `
                    <li class="list-group-item list-group-item-success p-2">
                         ${incomeSource[0].toUpperCase()}${incomeSource.slice(1)}
                    </li>
               `;
          });

          contentCardDetailsBody += `
               </ul><p class="card-text-details">On what was spent the money:</p>
               <ul class="list-group list-group-horizontal-sm ml-4">
          `;

          uniqueOutcomeSpentOn.forEach(spentOn => {
               contentCardDetailsBody += `
                    <li class="list-group-item list-group-item-danger p-2">
                         ${spentOn[0].toUpperCase()}${spentOn.slice(1)}
                    </li>
               `;
          });

          contentCardDetailsBody += `</ul>`;

          $cardDetailsIncomeOutcomeBody.append(contentCardDetailsBody);

          let monthPeriodText = sameMonth === true 
               ? `Throughout the month ${monthStart}` 
               : `Between the months ${monthStart} and ${monthEnd}`;
          let contentCardDetailsFooter = `
               <div class="card-footer">
                    <small class="p-0 m-0 text-uppercase text-primary font-weight-bold">${monthPeriodText}</small>
               </div>
          `;
   
          $cardDetailsIncomeOutcomeBody.after(contentCardDetailsFooter);
     }
});