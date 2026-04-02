import { formatCurrency } from '../utils/finance';

export default function LineChartCard({ data }) {
  if (!data.length) {
    return <div className="card empty-state">No trend data available.</div>;
  }

  const width = 640;
  const height = 240;
  const padding = 28;
  const values = data.map((d) => d.balance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data
    .map((item, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
      const y = height - padding - ((item.balance - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="card chart-card">
      <div className="section-header">
        <div>
          <h3>Balance Trend</h3>
          <p>Running balance across recent activity</p>
        </div>
        <span className="pill">{formatCurrency(data[data.length - 1].balance)}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" role="img" aria-label="Balance trend line chart">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="axis-line" />
        <polyline fill="none" points={points} className="trend-line" />
        {data.map((item, index) => {
          const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
          const y = height - padding - ((item.balance - min) / range) * (height - padding * 2);
          return <circle key={item.label + index} cx={x} cy={y} r="4" className="trend-dot" />;
        })}
      </svg>
      <div className="chart-labels">
        <span>{data[0].label}</span>
        <span>{data[data.length - 1].label}</span>
      </div>
    </div>
  );
}
