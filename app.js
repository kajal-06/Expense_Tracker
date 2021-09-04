// initializing variables to dom elements
const balance = document.getElementById('balance');
const income_plus = document.getElementById('income_plus');
const expense_minus = document.getElementById('expense_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// storing transactions to local storage in array
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transaction to history
function addTransaction(e) {
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('Please enter Text and Value');
  } else {
    const transaction = {
      id:generateId(),
      text: text.value,
      amount: +amount.value,
    }
    transactions.push(transaction);
    addTransactionsToForm(transaction);
    updateValue();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// generate id
function generateId(){
  return Math.floor(Math.random()*100000);
}


// add transactions to app
function addTransactionsToForm(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // add sign to list item
  item.classList.add(
    transaction.amount < 0 ? 'minus' : 'plus'
  );

  // adding amount with sign and remove button to transaction
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span>
    <button class="delete_btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    // append item to list
  list.appendChild(item);
}

// remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}

// update values
function updateValue() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc,item) => (acc+item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc+=item),0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)* -1).toFixed(2);

  balance.innerText = `₹${total}`;
  income_plus.innerText = `+${income}`
  expense_minus.innerText = `-${expense}`;
}

// list values
function Init(){
  list.innerHTML = '';
  transactions.forEach(addTransactionsToForm);
  updateValue();
}

// update local storage
function updateLocalStorage() {
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

Init();
form.addEventListener('submit',addTransaction);