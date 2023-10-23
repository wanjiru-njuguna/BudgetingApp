
//global variables
let spending = [];
let input_bar_focus = false;
let expense_name = '';

let button_ids = ['subtraction','input-bar','addition','Transport','Phone','Clothes','Dining','groceries-image','balance-wheel', 'health-image','Savings','Housing','Gifts','Drinks','check-balance-button','left-burger-button','right-burger-button']; //ids of all the buttons in the app.


//setting up the dialogue.
jQuery.noConflict();
jQuery( document ).ready(function( $ ) {
  // Code that uses jQuery's $ can follow here.
  jQuery('#dialog').dialog(
    {
        autoOpen: false,
        draggable:true,
        closeText: "x",
        modal: true,
        /*button:[
            
        ]*/
    }
    
);
//setup a click eventlistener for all the buttons.


for(let i=0; i<button_ids.length; i++)
{
    let app_button = document.getElementById(button_ids[i]);

    app_button.addEventListener("click", which_button_was_clicked);
   
}
});






function which_button_was_clicked(event)
{
    //let income_sequence = ["+","Okay"];
    let clicked_button = event.currentTarget.id;
    main_buttons_working(clicked_button); //everytime a button is clicked, this function is called.


}


function main_buttons_working(btn)
{
    if(check_main_expenses(btn)== true)
    {
        expense_name = btn;
        focus_cursor_on_inputbox(); //focus the cursor on the input box to get amount
        const input_bar = document.getElementById("input-bar");
        input_bar.addEventListener('keydown', function (event){
        if(event.key === 'Enter')
        {
            when_enter_is_pressed_on_input_bar();
            store_main_expenses_and_clear_input();
            get_values_from_objects_and_their_totals("Expenses_added");
            calculate_and_display_balances();

        }
        })
     }

    else if (btn == "addition")
    {
        checking_for_income_and_additions();  
        
    }
    else if(btn == "subtraction")
    {
        check_for_other_unlisted_expenses();
        
    }
    else if (btn == 'check-balance-button')
    {
        calculate_and_display_balances();

    }
   else if (btn == "left-burger-button" || btn == "right-burger-button")
   {
        open_the_data_page();
       
   }
    
        

}
    
   


function check_main_expenses(btn)
{
    switch(btn){
        case 'Transport':
        case 'Phone':
        case 'Clothes':
        case 'Dining':
        case 'groceries-image':
        case 'health-image':
        case 'Savings':
        case 'Housing':
        case 'Gifts':
        case 'Drinks':
            return true;
    }
    return false;

}




function focus_cursor_on_inputbox()
{
    document.getElementById("input-bar").focus();
    
}


function when_enter_is_pressed_on_input_bar()
{
        let expense_and_amount = {};//an empty object to store amount and the name of the expense.
        let input_amount = 0;
        let input_bar = document.getElementById("input-bar");
        input_amount = input_bar.value;
        let date = new Date();
        date = date.toString();
        expense_and_amount= {'Note': expense_name, 'Amount':input_amount, 'Date': date};
        return expense_and_amount;      
           
}
function store_main_expenses_and_clear_input()
{
    store_button_expenses_to_localstorage();
    reset_input_bar();
}
function reset_input_bar()
{
    let input_bar = document.getElementById("input-bar");
    if(input_bar.value != "")
    {
        input_bar.value = "";
    }

}
function get_amount_and_def_from_dialog_box()
{
    let money_and_note = {};//an object initialized to zero, to store the amount of money entered and description.
    let amount_space = document.getElementById("amount_bar");
    let description_bar = document.getElementById("description_bar")
    let amount = amount_space.value;
    let note = description_bar.value;
    let date = new Date();
    date = date.toString();
    money_and_note = {'Amount':amount, 'Note': note, 'Date': date};
    //document.getElementById("balance-wheel").innerText = note + ":"+ amount;
    return money_and_note;
   
    
}

function when_dialog_ok_btn_clicked()
{
    get_amount_and_def_from_dialog_box();
    storing_income_to_localstorage();
    get_values_from_objects_and_their_totals("income_added");
    calculate_and_display_balances();
    reset_the_dialog_box();
}

function when_ok_btn_clicked_to_add_unlisted_expenses()
{
    get_amount_and_def_from_dialog_box();
    storing_unlisted_expenses_to_localstorage();
    get_values_from_objects_and_their_totals("Unlisted_expenses");
    calculate_and_display_balances();
    reset_the_dialog_box();

}

function reset_the_dialog_box()
{
    let amount_bar = document.getElementById("amount_bar");
    let description_bar = document.getElementById("description_bar")
    if(amount_bar.value != ""|| description_bar.value !="")
    {
        amount_bar.value ="";
        description_bar.value ="";
    }
}


function checking_for_income_and_additions()
{
    jQuery("#dialog")
        .dialog(
            {
                'title': "Add Income", 
                'buttons': {
                    'Okay': function(event)
                    {
                        when_dialog_ok_btn_clicked();
                        jQuery("#dialog").dialog("close");

                    }
                }
            }
        )
        .dialog("open");
   
}

function check_for_other_unlisted_expenses()
{
    jQuery("#dialog")
    .dialog(
        {
            'title': "Additional Expense", 
            'buttons': {
                'Okay': function(event)
                {
                    when_ok_btn_clicked_to_add_unlisted_expenses();
                    jQuery("#dialog").dialog("close");

                }
            }
        }
    )
    .dialog("open");
    
}
function storing_income_to_localstorage()
{
    let stringified_array = localStorage.getItem("income_added");
    let income_array = [];
    if(stringified_array)
    {
        income_array = JSON.parse(stringified_array);
    }
    let income_object = get_amount_and_def_from_dialog_box();
    if (!income_object.Amount)
    {
        return;
    }
    else
    {
        income_array.push(income_object);
        //stringify the object so as to store in local storage.
        let stringifiedObj = JSON.stringify(income_array);
        localStorage.setItem("income_added", stringifiedObj);
    }   

}

function storing_unlisted_expenses_to_localstorage()
{
    let stringified_unlisted_expense_array = localStorage.getItem("Unlisted_expenses");
    let unlisted_array = [];
    if(stringified_unlisted_expense_array)
    {
        unlisted_array = JSON.parse(stringified_unlisted_expense_array);
    }
    let expense_object = get_amount_and_def_from_dialog_box();
    if(!expense_object.Amount)
    {
        return;
    }
    else
    {
        unlisted_array.push(expense_object);
        let stringified_other_expense_object = JSON.stringify(unlisted_array);
        localStorage.setItem("Unlisted_expenses", stringified_other_expense_object);
    }
    
}


function store_button_expenses_to_localstorage()
{
    let stringified_button_expenses = localStorage.getItem("Expenses_added");
    let main_expense_array = [];
    if(stringified_button_expenses)
    {
        main_expense_array = JSON.parse(stringified_button_expenses);

    }
    let button_expense_object = when_enter_is_pressed_on_input_bar();
    if(!button_expense_object.Amount)
    {
        return;
    }
    else
    {
        main_expense_array.push(button_expense_object);
        let stringified_expense_object = JSON.stringify(main_expense_array);
        localStorage.setItem("Expenses_added", stringified_expense_object);
    }
    }

    

function open_the_data_page()
{
    window.location.href= "/data.html"
    
}


function calculate_and_display_balances()
{
    let total_income = get_values_from_objects_and_their_totals("income_added");
    let main_expenses = get_values_from_objects_and_their_totals("Expenses_added");
    let additional_expenses = get_values_from_objects_and_their_totals("Unlisted_expenses");
    let total_expenses = main_expenses + additional_expenses;
    let balance = total_income - total_expenses;
    let balance_display_template = `Balance: ${balance}`;
    let balance_button = document.getElementById("check-balance-button")
    balance_button.innerText = balance_display_template;
    let balance_wheel_text_template = `${total_income}\n (${total_expenses})`;
    let balance_wheel =  document.getElementById("balance-wheel");
    balance_wheel.innerText = balance_wheel_text_template;

}

