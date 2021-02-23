const balance = document.getElementById('balance');
const income_ele = document.getElementById('income');
const expense_ele = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const ls = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? ls : [];


function updatels(){
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// To create a transaction object and add it to the array
function adding(e){

    e.preventDefault();
    const transaction = {

        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    render(transaction);
    calc();
    updatels();

    text.value = '';
    amount.value = '';

}

// To render the newly added transactions
function render(transaction){

    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
    <span>
        <button class="deletebtn" onclick='deletee(${transaction.id})'>
        <i class="fa fa-trash"></i></button>
    </span> `;

    list.appendChild(item);
}


// To delete from all transactions
function deletee(id){

   transactions = transactions.filter(transaction => transaction.id !== id); 
   updatels();
   rerender(); 
}

// Calculate income,expense and balance
function calc(){

    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc,item) => (acc=acc+item), 0);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => 
    (acc += item), 0); 

    const expense = amounts.filter(item => item < 0).reduce((acc, item) => 
    (acc += item), 0) * -1 ;

    balance.innerText = `Rs. ${total}`;
    income_ele.innerText =  `Rs. ${income}`;
    expense_ele.innerText = `Rs. ${expense}`;

}

// To re-render
function rerender(){

    list.innerHTML = '';
    transactions.forEach(render);

    calc();
}

rerender();
form.addEventListener('submit', adding);