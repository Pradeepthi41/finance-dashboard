import { formatCurrency, formatDate } from '../utils/finance';

export default function TransactionsTable({
  transactions,
  filters,
  setFilters,
  categories,
  canEdit,
  onDelete,
}) {
  return (
    <div className="card table-card">
      <div className="section-header table-header">
        <div>
          <h3>Transactions</h3>
          <p>Search, filter, and sort financial activity</p>
        </div>
      </div>

      <div className="filters-grid">
        <input
          placeholder="Search description or category"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
        <select value={filters.type} onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filters.category} onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select value={filters.sortBy} onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>

      {!transactions.length ? (
        <div className="empty-state compact">No transactions match the current filters.</div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                {canEdit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`type-badge ${item.type}`}>{item.type}</span>
                  </td>
                  <td className={item.type === 'income' ? 'positive' : 'negative'}>
                    {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                  </td>
                  {canEdit && (
                    <td>
                      <button className="link-button danger" onClick={() => onDelete(item.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
