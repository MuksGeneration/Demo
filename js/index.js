// Initialize Firebase
function initializeFirebase() {
    const firebaseConfig = {
        // Your Firebase configuration
    };
    firebase.initializeApp(firebaseConfig);
}

// Load mock transactions for testing
function loadMockTransactions() {
    return [
        { id: 1, amount: 100, date: '2026-04-01', description: 'Transaction 1' },
        { id: 2, amount: 200, date: '2026-04-02', description: 'Transaction 2' },
        // Add more mock transactions as needed
    ];
}

// Setup real-time listener for Firebase
function setupRealtimeListener() {
    const transactionRef = firebase.database().ref('transactions');
    transactionRef.on('value', (snapshot) => {
        const transactions = snapshot.val();
        renderTransactions(transactions);
    });
}

// Add a transaction to Firebase
function addTransaction(transaction) {
    const transactionRef = firebase.database().ref('transactions');
    transactionRef.push(transaction);
}

// Filter transactions based on a criteria
function filterTransactions(transactions, criteria) {
    return transactions.filter(transaction => transaction.amount > criteria);
}

// Render transactions to the UI
function renderTransactions(transactions) {
    const transactionContainer = document.getElementById('transaction-list');
    transactionContainer.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionItem = createTransactionItem(transaction);
        transactionContainer.appendChild(transactionItem);
    });
}

// Create a transaction item element
function createTransactionItem(transaction) {
    const item = document.createElement('div');
    item.innerHTML = `${transaction.date}: $${transaction.amount} - ${transaction.description}`;
    return item;
}

// Get time ago from a timestamp
function getTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    return seconds < 60 ? `${seconds} seconds ago` : `${Math.floor(seconds / 60)} minutes ago`;
}

// Show history tab
function showHistory() {
    // Logic to display the transaction history
}

// Update the switchTab function to support history tab navigation
function switchTab(tab) {
    if(tab === 'history') {
        showHistory();
    } else {
        // Logic to show other tabs
    }
}
