import { getLocalData, saveLocalData } from "./localStorageHelpers";
import { generateId } from "./uuidGenerator";
import { downloadJSONFile } from "./fileHelpers";

const TRANSACTIONS_KEY = "money-app-data";
const BUDGETS_KEY = "money-app-budgets";

/**
 * Parses and handles a chatbot command string.
 * @param {string} input
 * @returns {string} assistant's response
 */
export function handleCommand(input) {
  const lower = input.toLowerCase();

  // Add income
  if (lower.startsWith("add income:")) {
    const match = input.match(/add income:\s*(.+?)\s+(\d+)/i);
    if (match) {
      const [, category, amount] = match;
      const transactions = getLocalData(TRANSACTIONS_KEY, []);
      transactions.push({
        id: generateId(),
        type: "income",
        category,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      });
      saveLocalData(TRANSACTIONS_KEY, transactions);
      return `✅ Income added: ${category} ₱${amount}`;
    }
  }

  // Add expense
  if (lower.startsWith("add expense:")) {
    const match = input.match(/add expense:\s*(.+?)\s+(\d+)/i);
    if (match) {
      const [, category, amount] = match;
      const transactions = getLocalData(TRANSACTIONS_KEY, []);
      transactions.push({
        id: generateId(),
        type: "expense",
        category,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      });
      saveLocalData(TRANSACTIONS_KEY, transactions);
      return `✅ Expense added: ${category} ₱${amount}`;
    }
  }

  // Show budget for category
  if (lower.startsWith("show budget for")) {
    const match = input.match(/show budget for\s+(.+)/i);
    if (match) {
      const category = match[1].trim();
      const budgets = getLocalData(BUDGETS_KEY, []);
      const transactions = getLocalData(TRANSACTIONS_KEY, []);
      const budget = budgets.find((b) => b.category.toLowerCase() === category.toLowerCase());
      const spent = transactions
        .filter((t) => t.type === "expense" && t.category.toLowerCase() === category.toLowerCase())
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      if (!budget) return `⚠️ No budget found for "${category}".`;
      const remaining = budget.limit - spent;
      return `📊 Budget for ${category}: ₱${budget.limit}\nSpent: ₱${spent}\nRemaining: ₱${remaining}`;
    }
  }

  // List overspent categories
  if (lower === "list overspent categories") {
    const budgets = getLocalData(BUDGETS_KEY, []);
    const transactions = getLocalData(TRANSACTIONS_KEY, []);
    const overspent = budgets.filter((budget) => {
      const spent = transactions
        .filter((t) => t.type === "expense" && t.category === budget.category)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      return spent > budget.limit;
    });

    if (overspent.length === 0) return "✅ No overspent categories. Good job!";
    return "⚠️ Overspent categories:\n" + overspent.map((b) => `- ${b.category}`).join("\n");
  }

  // Current balance
  if (lower === "what is my current balance?" || lower === "show balance") {
    const transactions = getLocalData(TRANSACTIONS_KEY, []);
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const balance = income - expense;
    return `💰 Income: ₱${income}\n💸 Expense: ₱${expense}\n🧾 Balance: ₱${balance}`;
  }

  // Export data
  if (lower === "export data") {
    const backup = {
      transactions: getLocalData(TRANSACTIONS_KEY, []),
      budgets: getLocalData(BUDGETS_KEY, []),
    };
    const dateStr = new Date().toISOString().split("T")[0];
    downloadJSONFile(backup, `money-app-backup-${dateStr}.json`);
    return "📁 Export started: downloading JSON file.";
  }

  // Import data
  if (lower === "import data") {
    return "📥 Please upload a .json file below using the import panel.";
  }

  // Edit budget (placeholder)
  if (lower.startsWith("edit budget for")) {
    const match = input.match(/edit budget for\s+(.+)/i);
    if (match) {
      const category = match[1];
      return `✏️ Editing budget for "${category}" requires the admin panel.`;
    }
  }

  return "⚠️ I didn’t understand that command. Try 'Add expense: Food 100'";
}
