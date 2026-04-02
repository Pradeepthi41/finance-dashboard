import { formatCurrency } from '../utils/finance';

export default function DonutChartCard({ data }) {
  if (!data.length) {
    return <div className="card empty-state">No category data available.</div>;
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  let cumulative = 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="card chart-card">
      <div className="section-header">
        <div>
          <h3>Spending Breakdown</h3>
          <p>Category-level expense split</p>
        </div>
      </div>
      <div className="donut-layout">
        <div className="donut-wrapper">
          <svg viewBox="0 0 140 140" className="donut-svg" role="img" aria-label="Expense category breakdown">
            <circle cx="70" cy="70" r={radius} className="donut-base" />
            {data.map((item, index) => {
              const value = item.amount / total;
              const dash = value * circumference;
              const gap = circumference - dash;
              const segment = (
                <circle
                  key={item.category}
                  cx="70"
                  cy="70"
                  r={radius}
                  className={`donut-segment donut-${(index % 6) + 1}`}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={-cumulative}
                />
              );
              cumulative += dash;
              return segment;
            })}
          </svg>
          <div className="donut-center">
            <strong>{formatCurrency(total)}</strong>
            <span>Total</span>
          </div>
        </div>
        <div className="legend-list">
          {data.slice(0, 6).map((item, index) => (
            <div className="legend-row" key={item.category}>
              <span className={`legend-dot donut-${(index % 6) + 1}`}></span>
              <span>{item.category}</span>
              <strong>{formatCurrency(item.amount)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
