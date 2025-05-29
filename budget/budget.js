function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

class Category {
  constructor(name, budget) {
    this.category_name = name;
    this.category_budget = budget;
    this.category_storage = [];
  }

  // date_period is in the format of (year, month) 2001-02
  addSpending(name, date_period, amount) {
    const spending = {
      spending_name: name,
      spending_period: date_period,
      spending_amt: amount,
    };
    this.category_storage.push(spending);
  }
}

class Budget {
  // constructor should be set by the value given by
  constructor(user_id, revenue, expenses, savings, spendings) {
    // Basic finances
    this.user_id = user_id;
    this.revenue = revenue;
    this.expenses = expenses;
    this.savings = savings;
    this.spendings = spendings;

    // Calcuations based on the basic units
    this.net_income = 0;
    this.savings_amount = 0;
    this.investment_amount = 0;
    this.disposable_income = 0;

    // Store categories
    this.spending_categories = new Map();
  }

  createCategory(category_name) {
    const category = new Category(category_name);
    this.spending_categories.set(category_name, category);
  }

  // date_period is in the format of (year, month) 2001-02
  addToCategory(category_name, name, date_period, amount) {
    if (this.spending_categories.get(category_name)) {
      this.spending_categories
        .get(category_name)
        .addSpending(name, date_period, amount);
    } else {
      throw new Error("Category does not exist budget/budget.js");
    }
  }

  setNetIncome() {
    // Error handling
    if (this.revenue < 0) {
      throw new Error("revenue is negative (budget/budget.js)");
    } else if (this.expenses < 0) {
      throw new Error("expenses are negative (budget/budget.js)");
    }

    this.net_income = roundToTwo(this.revenue - this.expenses);
  }

  setDisposableIncome(percent_savings, percent_investment) {
    this.savings_amount = 100 + percent_savings * this.revenue;
    this.investment_amount = percent_investment * this.revenue;

    const rawDisposable =
      this.net_income - (this.savings_amount + this.investment_amount);
    this.disposable_income = roundToTwo(rawDisposable);
    this.savings_amount = roundToTwo(this.savings_amount);
    this.investment_amount = roundToTwo(this.investment_amount);
  }
}

/* 
const test = new Budget(521403403, 2200, 1132.07, 200, 10);
test.setNetIncome();
test.setDisposableIncome(0.2, 0.06);

test.createCategory("test");
test.addToCategory("test", "pokemon", "2025-05", "500");
test.addToCategory("test", "guitar", "2025-05", "610");
test.createCategory("Cards");
test.addToCategory("Cards", "pokemon", "2025-05", "300");

// console.log(test.net_income);
// console.log(test.spending_categories.get("Cards"));
// console.log(test.spending_categories);
console.log("net income: " + test.net_income);
console.log("savings: " + test.savings_amount);
console.log("investments: " + test.investment_amount);
console.log("disposable income: " + test.disposable_income);
*/

console.log("Budget class called");

module.exports = Budget;
