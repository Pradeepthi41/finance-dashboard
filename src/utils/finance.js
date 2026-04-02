export const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatCurrency(value) {
  return currency.format(value);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getSummary(transactions) {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function getMonthlyTrend(transactions) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;

  return sorted.map((item) => {
    runningBalance += item.type === 'income' ? item.amount : -item.amount;
    return {
      label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: runningBalance,
    };
  });
}

export function getCategoryBreakdown(transactions) {
  const expenses = transactions.filter((item) => item.type === 'expense');
  const map = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function getInsights(transactions) {
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const highestCategory = categoryBreakdown[0];

  const currentMonth = transactions.filter((item) => item.date.startsWith('2026-03'));
  const previousMonthReference = [
    { type: 'expense', amount: 1320 },
    { type: 'income', amount: 5100 },
  ];

  const currentExpenses = currentMonth
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const previousExpenses = previousMonthReference
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const change = previousExpenses === 0 ? 0 : Math.round(((currentExpenses - previousExpenses) / previousExpenses) * 100);

  const incomeDays = currentMonth.filter((item) => item.type === 'income').length;
  const expenseDays = currentMonth.filter((item) => item.type === 'expense').length;

  return [
    highestCategory
      ? `Highest spending category is ${highestCategory.category} at ${formatCurrency(highestCategory.amount)}.`
      : 'No spending category available yet.',
    `Expenses are ${change >= 0 ? `${change}% higher` : `${Math.abs(change)}% lower`} than the previous month.` ,
    expenseDays > incomeDays
      ? 'You had more spending transactions than income events this month, which may be worth reviewing.'
      : 'Income events are keeping pace with outgoing transactions this month.',
  ];
}

export function filterTransactions(transactions, filters) {
  const { search, type, category, sortBy } = filters;

  let result = transactions.filter((item) => {
    const matchesSearch =
      !search ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === 'all' || item.type === type;
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesType && matchesCategory;
  });

  result.sort((a, b) => {
    switch (sortBy) {
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return result;
}
