export default function InsightsPanel({ insights }) {
  return (
    <div className="card insights-card">
      <div className="section-header">
        <div>
          <h3>Insights</h3>
          <p>Simple observations from the available data</p>
        </div>
      </div>
      <div className="insight-list">
        {insights.map((item, index) => (
          <div className="insight-item" key={index}>
            <span className="insight-index">0{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
