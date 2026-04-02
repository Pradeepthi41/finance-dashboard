import { useEffect, useMemo, useState } from 'react';
import SummaryCard from './components/SummaryCard';
import LineChartCard from './components/LineChartCard';
import DonutChartCard from './components/DonutChartCard';
import RoleSwitcher from './components/RoleSwitcher';
import InsightsPanel from './components/InsightsPanel';
import TransactionsTable from './components/TransactionsTable';
import TransactionForm from './components/TransactionForm';
import { initialTransactions } from './data/transactions';
import {
  filterTransactions,
  getCategoryBreakdown,
  getInsights,
  getMonthlyTrend,
  getSummary,
} from './utils/finance';

const STORAGE_KEY = 'finance-dashboard-state';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [role, setRole] = useState('viewer');
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date-desc',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const categories = useMemo(() => {
    return [...new Set(transactions.map((item) => item.category))].sort();
  }, [transactions]);

  const filteredTransactions = useMemo(() => filterTransactions(transactions, filters), [transactions, filters]);
  const summary = useMemo(() => getSummary(transactions), [transactions]);
  const trendData = useMemo(() => getMonthlyTrend(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  function addTransaction(newTransaction) {
    setTransactions((prev) => [
      {
        id: Date.now(),
        ...newTransaction,
      },
      ...prev,
    ]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="app-shell">
      <RoleSwitcher
        role={role}
        onChange={setRole}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
      />

      <section className="summary-grid">
        <SummaryCard title="Total Balance" value={summary.balance} subtitle="Net amount after all tracked activity" />
        <SummaryCard title="Income" value={summary.income} subtitle="All incoming transactions" />
        <SummaryCard title="Expenses" value={summary.expenses} subtitle="All outgoing transactions" />
      </section>

      <section className="content-grid">
        <LineChartCard data={trendData} />
        <DonutChartCard data={categoryData} />
      </section>

      <section className="content-grid lower-grid">
        <InsightsPanel insights={insights} />
        {role === 'admin' ? (
          <TransactionForm onSubmit={addTransaction} categories={categories} />
        ) : (
          <div className="card empty-state role-card">
            <h3>Viewer Mode</h3>
            <p>Switch to Admin to add or remove transactions. This simulates role-based UI behavior on the frontend.</p>
          </div>
        )}
      </section>

      <TransactionsTable
        transactions={filteredTransactions}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        canEdit={role === 'admin'}
        onDelete={deleteTransaction}
      />
    </div>
  );
}
