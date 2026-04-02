export default function RoleSwitcher({ role, onChange, darkMode, onToggleTheme }) {
  return (
    <div className="toolbar">
      <div>
        <h1>Finance Dashboard</h1>
        <p>Track balances, transactions, and spending insights.</p>
      </div>
      <div className="toolbar-actions">
        <label className="inline-field">
          <span>Role</span>
          <select value={role} onChange={(e) => onChange(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button className="ghost-button" onClick={onToggleTheme}>
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </div>
  );
}
