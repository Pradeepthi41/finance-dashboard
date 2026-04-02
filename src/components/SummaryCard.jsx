import { formatCurrency } from '../utils/finance';

export default function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="card summary-card">
      <div className="summary-title">{title}</div>
      <div className="summary-value">{formatCurrency(value)}</div>
      <div className="summary-subtitle">{subtitle}</div>
    </div>
  );
}
