import { useState } from 'react';

const initialForm = {
  description: '',
  date: '',
  amount: '',
  category: '',
  type: 'expense',
};

export default function TransactionForm({ onSubmit, categories }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.description || !form.date || !form.amount || !form.category) return;
    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
    setForm(initialForm);
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="section-header">
        <div>
          <h3>Add Transaction</h3>
          <p>Visible only for the admin role</p>
        </div>
      </div>
      <div className="form-grid">
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="date" value={form.date} onChange={handleChange} type="date" />
        <input name="amount" value={form.amount} onChange={handleChange} type="number" min="0" placeholder="Amount" />
        <input name="category" value={form.category} onChange={handleChange} list="category-list" placeholder="Category" />
        <datalist id="category-list">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit" className="primary-button">Save Transaction</button>
      </div>
    </form>
  );
}
