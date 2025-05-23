// src/utils/budgetHelpers.js

/**
 * Calculates total expenses per category from transaction data.
 * @param {Array} transactions - List of all transactions
 * @returns {Object} { [category]: totalSpent }
 */
export function calculateCategoryExpenses(transactions) {
  const totals = {};
  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const category = tx.category || "Uncategorized";
      const amount = parseFloat(tx.amount || 0);
      totals[category] = (totals[category] || 0) + amount;
    }
  });
  return totals;
}
