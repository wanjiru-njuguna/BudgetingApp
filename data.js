 // {calculate_the_percentage_of_expenses}  './shared.js';

 let percentages = calculate_the_percentage_of_expenses();
 let xValues = []; 
 let yValues = [];

//pie chart for the data page.
for(let i = 0; i < percentages.length; i++)
{
  let item = percentages[i]["Item"];
  xValues.push(item);
  //['Transport','Phone','Clothes','Dining','groceries', 'health','Savings','Housing','Gifts','Drinks', 'other_expenses'];
  let amount = percentages[i]["Amount"];
  yValues.push(amount);
  
}

var barColors = [
  "#b91d47",
  "#B625be",
  "#2b5797",
  "#e8c3b9",
  "#041114",
  "#25be9b",
  "#2530be",
  "#Be8625",
  "#6b25be",
  "#be4325",
  "#Bbbe25"
  ];

new Chart("myChart", {
type: "pie",
data: {
  labels: xValues,
  datasets: [{
    backgroundColor: barColors,
    data: yValues
  }]
},
options: {
  legend: {display: false},
  title: {
    display: true,
    text: "Expense Summary"
  }
}
});
create_data_table();

