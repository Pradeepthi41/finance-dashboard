# Finance Dashboard UI

A clean, responsive finance dashboard built for the frontend assessment. It uses React with mock data and focuses on UI clarity, component structure, state handling, and user experience.

## What this project covers

### 1. Dashboard overview
- Summary cards for **Total Balance**, **Income**, and **Expenses**
- A **time-based visualization** using a custom SVG balance trend chart
- A **categorical visualization** using a custom donut chart for spending breakdown

### 2. Transactions section
- Transaction table with:
  - date
  - description
  - amount
  - category
  - type
- Includes:
  - search
  - filtering
  - sorting
  - graceful empty state when no rows match

### 3. Basic role-based UI
- **Viewer** role can inspect dashboard data
- **Admin** role can add and delete transactions
- Role switching is simulated entirely on the frontend using a dropdown

### 4. Insights section
- Highest spending category
- Monthly expense comparison
- A simple usage observation based on activity mix

### 5. State management
Handled with React state and memoized derived data:
- transactions
- filters
- selected role
- theme state

### 6. UX details
- Responsive layout for desktop and mobile
- Dark mode toggle
- Local storage persistence for transactions
- Empty-state handling

## Tech stack
- React
- Vite
- Plain CSS
- Mock local data
- Custom SVG charts without external chart libraries

## Why this approach
I kept the stack lightweight so the focus stays on frontend fundamentals:
- reusable components
- clean layout hierarchy
- predictable state flow
- no backend dependency
- easy to review during an assessment

## Project structure

```bash
src/
  components/
    DonutChartCard.jsx
    InsightsPanel.jsx
    LineChartCard.jsx
    RoleSwitcher.jsx
    SummaryCard.jsx
    TransactionForm.jsx
    TransactionsTable.jsx
  data/
    transactions.js
  utils/
    finance.js
  App.jsx
  main.jsx
  styles.css
```

## Getting started

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

## Notes for submission
- This is intentionally frontend-only and uses mock data.
- RBAC is simulated visually as requested.
- Charts are implemented manually to avoid unnecessary dependencies.
- Local storage was added as a small enhancement.

## Possible future improvements
- Edit transaction modal
- CSV/JSON export
- More detailed date-range filters
- Mock API integration with loading states
- Better accessibility coverage for chart narration and keyboard flows
