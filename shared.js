
//import {get_values_from_objects_and_their_totals,get_array_of_objects_from_local_storage} from './app.js'


function get_array_of_objects_from_local_storage(keyname)
{
    let stringified_object= localStorage.getItem(keyname);
    let obtained_object_array = [];
    if(stringified_object)
    {
        obtained_object_array = JSON.parse(stringified_object);

    }
    
    return obtained_object_array;

}
 function get_values_from_objects_and_their_totals(keyname)
{
    let object_array = get_array_of_objects_from_local_storage(keyname);
    let values_total = 0;
    for(let i = 0; i < object_array.length; i++ )
    {
       let item = object_array[i];
       let amount = Number(item["Amount"]);
        values_total += amount;
    }
    
    return values_total;
}
function calculate_balance_for_the_table()
{
    let total_income = get_values_from_objects_and_their_totals("income_added");
    let main_expenses = get_values_from_objects_and_their_totals("Expenses_added");
    let additional_expenses = get_values_from_objects_and_their_totals("Unlisted_expenses");
    let total_expenses = main_expenses + additional_expenses;
    let balance = total_income - total_expenses;
    return balance;
    // let balance_display_template = `Balance: ${balance}`;
    // let balance_button = document.getElementById("check-balance-button")
    // balance_button.innerText = balance_display_template;
    // let balance_wheel_text_template = `${total_income}\n (${total_expenses})`;
    // let balance_wheel =  document.getElementById("balance-wheel");
    // balance_wheel.innerText = balance_wheel_text_template;

}
 function calculate_the_percentage_of_expenses()
{
    let percentages = [];
    let total_income = get_values_from_objects_and_their_totals("income_added");
    //let available_keynames = ['Transport','Phone','Clothes','Dining','groceries', 'health','Savings','Housing','Gifts','Drinks', 'other_expenses','income_added']

    let expense_object_array = get_array_of_objects_from_local_storage("Expenses_added");
    let item_totals = {};
    for(let i = 0; i < expense_object_array.length; i++ )
    {
       let item = expense_object_array[i]["Note"];
       let amount = Number(expense_object_array[i]["Amount"]);
       if(!item_totals[item])
       {
         item_totals[item] = amount;
        
       }
       else
       {
        item_totals[item] += amount;
       }

    }
    for(let key in item_totals)
    {
        let total_item_expense = item_totals[key];
        let item_name = key;
        let percentage_spending = (total_item_expense / total_income)*100;
        let item_and_percentage = {'Item':item_name , 'Amount':percentage_spending}
        percentages.push(item_and_percentage);
    
    }


    
    let unnamed_expenses_array = get_array_of_objects_from_local_storage("Unlisted_expenses");
    for(let i = 0; i < unnamed_expenses_array.length; i++ )
    {
       let expense_item = unnamed_expenses_array[i];
        let unnamed_expense_total = Number(expense_item["Amount"]);
        let expense_name = "other_expenses"
        let percentage_unnamed_spending = (unnamed_expense_total / total_income)*100;
        let item_and_percentage = {'Item': expense_name, 'Amount':percentage_unnamed_spending }
        percentages.push(item_and_percentage);

    }
    return percentages
}

//dynamically create a table with the expense data.

function create_data_table()
{
    let budget_data = [];
    let percentage_spending = calculate_the_percentage_of_expenses();
    let columns = ["Date", "Note", "Amount"];
    let income_array = get_array_of_objects_from_local_storage("income_added");
    let expenses_array = get_array_of_objects_from_local_storage("Expenses_added");
    let additional_expense_array = get_array_of_objects_from_local_storage("Unlisted_expenses");
    let date = new Date();
    let Balance ={"Note": "Balance", "Amount":calculate_balance_for_the_table(),"Date": date} ;
    //adding all the available data into an array
    budget_data = income_array.concat(expenses_array).concat(additional_expense_array).concat(Balance);
    //sorting the array by the date object.
    //objA = new Date (objA.Date);
    //objB = new Date (objB.Date);
    sorted_budget_data = budget_data.sort(function(objA, objB) {
        return (new Date (objA.Date)) - (new Date (objB.Date));

    });




//creating the table and the table body.

//let available_space = document.getElementById("Expense_table");
    const tbl = document.createElement("table");
    const tblhdr = document.createElement("thead");
    const header_row = document.createElement("tr");
    let header_names = ["Date", "Description", "Amount"];
    //let number_of_cells = 2;
    for(let i = 0; i < header_names.length; i++ )
    {   
        const header_cell = document.createElement("th");
        const celltext = document.createTextNode(header_names[i]);
        header_cell.appendChild(celltext);
        header_row.appendChild(header_cell);

    }
    tblhdr.appendChild(header_row);
    tbl.appendChild(tblhdr);

    const tblBody = document.createElement("tbody");
    const column_array = ["Date", "Note","Amount",];
    for(let i = 0; i < sorted_budget_data.length; i++)
    {
        const row = document.createElement("tr");
        for(let j = 0; j < column_array.length; j++ )
        {
            let cell = document.createElement("td");

            let txt = sorted_budget_data[i][column_array[j]];
            if(column_array[j] == 'Date')
            {
                let dtm = new Date(txt);
                txt = dtm.toLocaleDateString();
            }
            // else if (column_array[j] == 'Percentage')
            // {
            //     txt = percentage_spending[i];
            // }

            let cellText = document.createTextNode(txt);
            cell.appendChild(cellText);
             row.appendChild(cell);

        }

        tblBody.appendChild(row);

    }
    //appending the table to the table body
    tbl.appendChild(tblBody);
    // adding the table to the document
    document.body.appendChild(tbl);
    // setting the table attributes.
    tbl.setAttribute("border", "4", "width", "50em");

}


    