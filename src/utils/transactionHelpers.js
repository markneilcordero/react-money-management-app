// src/utils/transactionHelpers.js

/**
 * Calculates total income and total expense.
 * @param {Array} transactions - List of transaction objects.
 * @returns {{ totalIncome: number, totalExpense: number }}
 */
export function calculateTotals(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    const amount = parseFloat(tx.amount) || 0;
    if (tx.type === "income") {
      totalIncome += amount;
    } else if (tx.type === "expense") {
      totalExpense += amount;
    }
  });

  return { totalIncome, totalExpense };
}

/**
 * Filters transactions by type.
 * @param {Array} transactions - List of all transactions.
 * @param {"income"|"expense"} type - Type to filter by.
 * @returns {Array} Filtered list.
 */
export function filterByType(transactions, type) {
  return transactions.filter((tx) => tx.type === type);
}

/**
 * Filters transactions by category.
 * @param {Array} transactions - List of transactions.
 * @param {string} category - Category name to filter by.
 * @returns {Array} Filtered transactions.
 */
export function filterByCategory(transactions, category) {
  return transactions.filter((tx) => tx.category === category);
}

/**
 * Filters transactions by month/year.
 * @param {Array} transactions - List of transactions.
 * @param {number} month - 0-based month (e.g., 0 = January).
 * @param {number} year - Full year (e.g., 2025).
 * @returns {Array} Filtered list.
 */
export function filterByMonthYear(transactions, month, year) {
  return transactions.filter((tx) => {
    const date = new Date(tx.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
}

/**
 * Combines type and category filtering logic.
 * @param {Array} transactions - All transactions.
 * @param {string} type - "income", "expense", or "all"
 * @param {string} category - Category name or "all"
 * @returns {Array} Filtered transactions.
 */
export function filterTransactions(transactions, type = "all", category = "all") {
  return transactions.filter((tx) => {
    const matchType = type === "all" || tx.type === type;
    const matchCategory = category === "all" || tx.category === category;
    return matchType && matchCategory;
  });
}

/**
 * Searches transactions by category or description.
 * @param {Array} transactions - List of transactions.
 * @param {string} term - The search term.
 * @returns {Array} Matching transactions.
 */
export function searchTransactions(transactions, term = "") {
  if (!term.trim()) return transactions;

  return transactions.filter((tx) => {
    const categoryMatch = (tx.category || "").toLowerCase().includes(term.toLowerCase());
    const descriptionMatch = (tx.description || "").toLowerCase().includes(term.toLowerCase());
    return categoryMatch || descriptionMatch;
  });
}
