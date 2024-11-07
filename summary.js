// URLs to the PHP scripts
const accountsURL = 'get_accounts.php';
const transactionsURL = 'get_transactions.php';
const investmentsURL = 'get_investments.php';
const expensesURL = 'get_expenses.php';
const budgetsURL = 'get_budgets.php';

// Fetch data and calculate totals
let totalIncome = 0;
let totalSpendings = 0;
let totalTransactions = 0;
let totalBudget = 0;
let totalInvestments = 0;

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function calculateSummary() {
    const accounts = await fetchData(accountsURL);
    const transactions = await fetchData(transactionsURL);
    const investments = await fetchData(investmentsURL);
    const expenses = await fetchData(expensesURL);
    const budgets = await fetchData(budgetsURL);

    // Calculate total income and balance in all accounts
    accounts.forEach(account => {
        totalIncome += parseFloat(account.income);
    });
    
    // Calculate total transaction amount
    transactions.forEach(transaction => {
        totalTransactions += parseFloat(transaction.amount);
    });
    
    // Calculate total investments
    investments.forEach(investment => {
        totalInvestments += parseFloat(investment.amount);
    });
    
    // Calculate total expenses and check against budget
    let totalExpenses = 0;
    expenses.forEach(expense => {
        totalExpenses += parseFloat(expense.amount);
    });

    budgets.forEach(budget => {
        totalBudget += parseFloat(budget.amount);
    });

    // Display amounts in the Summary Page
    document.getElementById('total-earnings').innerText = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-spendings').innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('total-transactions').innerText = `$${totalTransactions.toFixed(2)}`;
    document.getElementById('total-investments').innerText = `$${totalInvestments.toFixed(2)}`;
    document.getElementById('total-budgets').innerText = `$${totalBudget.toFixed(2)}`;

    // Show warning if expenses exceed the budget
    if (totalExpenses > totalBudget) {
        document.getElementById('budget-warning').innerText = "Warning: You have exceeded your budget!";
    }
}

// Tax calculation
function calculateTax() {
    const taxPercentage = parseFloat(document.getElementById('tax-percentage').value);
    if (isNaN(taxPercentage) || taxPercentage < 0) {
        alert("Please enter a valid tax percentage.");
        return;
    }
    const taxAmount = (totalIncome * taxPercentage) / 100;
    document.getElementById('tax-amount').innerText = `$${taxAmount.toFixed(2)}`;
}

// Run calculations on page load
document.addEventListener('DOMContentLoaded', calculateSummary);
