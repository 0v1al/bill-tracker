$(function() {
    let ctx = document.getElementById('myChart');
    let userIncomes = JSON.parse(localStorage.getItem("userIncomes"));
    let userOutcomes = JSON.parse(localStorage.getItem("userOutcomes"));
    let incomeValues = userIncomes.map(income => income.value);
    let outcomeValues = userOutcomes.map(outcome => outcome.value);
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "July", "September", "October", "November", "December"];
    let incomeMonthStart = month[new Date(userIncomes[0].created_at).getMonth()];
    let incomeMonthEnd = month[new Date(userIncomes[userIncomes.length - 1].created_at).getMonth()];
    let outcomeMonthStart = month[new Date(userOutcomes[0].created_at).getMonth()];
    let outcomeMonthEnd = month[new Date(userOutcomes[userOutcomes.length - 1].created_at).getMonth()];
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

    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...month.slice(month.indexOf(monthStart), month.indexOf(monthEnd) + 1)],
            datasets: [{
                label: 'Outcome',
                borderColor: 'red',
                data: outcomeValues
            }, {
                label: 'Income',
                borderColor: 'green',
                data: incomeValues
            }]
        },
        options: {

        }
    });
});