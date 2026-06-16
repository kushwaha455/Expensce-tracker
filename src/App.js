import React, { useState, useEffect } from "react";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const ExpenseApp = (props) => {
  const {
    expenses,
    title,
    amount,
    category,
    customCategory,
    editId,
    totalExpense,
    addExpense,
    deleteExpense,
    editExpense,
    updateExpense,
    setTitle,
    setAmount,
    setCategory,
    setCustomCategory,
    setEditId,
    currentUser,
    setCurrentUser
    ,users, setUsers, defaultCategories
  } = props;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setCurrentUser(null);
      window.location.href = "/";
    }
  };

  return React.createElement('div', { className: 'container' },
    React.createElement('div', { className: 'card-grid' },
      React.createElement('div', null,
        React.createElement('div', { className: 'header' },
          React.createElement('div', { className: 'logo-circle', style: { width: 56, height: 56 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff' } }, 'PT')
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { className: 'brand-title' }, 'Pisa Tracker'),
            React.createElement('div', { className: 'muted' }, `Welcome, ${currentUser?.name || 'User'}!`)
          ),
          React.createElement('button', { className: 'logout-btn', onClick: handleLogout }, '🚪 Logout')
        ),
        React.createElement('div', { style: { height: 18 } }),
        React.createElement('div', { style: { marginBottom: 18 } },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' } },
            React.createElement('div', { className: 'input-row', style: { minWidth: 220 } },
              React.createElement('div', { className: 'icon' }, '📝'),
              React.createElement('input', { type: 'text', placeholder: 'Expense Name', value: title, onChange: (e) => setTitle(e.target.value) })
            ),
            React.createElement('div', { className: 'input-row', style: { width: 140 } },
              React.createElement('div', { className: 'icon' }, '💰'),
              React.createElement('input', { type: 'number', placeholder: 'Amount', value: amount, onChange: (e) => setAmount(e.target.value) })
            ),
            React.createElement('div', { style: { minWidth: 180 } },
              (function(){
                const userCats = (currentUser && currentUser.categories) ? currentUser.categories : [];
                const merged = Array.from(new Set([...(defaultCategories || []), ...userCats]));
                const children = [React.createElement('option', { key: '__empty__', value: '' }, 'Select category')];
                merged.forEach((c)=> children.push(React.createElement('option', { key: c, value: c }, c)));
                children.push(React.createElement('option', { key: '__custom__', value: 'Custom' }, 'Custom category'));
                return React.createElement('select', {
                  value: category,
                  onChange: (e) => { const value = e.target.value; setCategory(value); if (value !== 'Custom') setCustomCategory(''); },
                  style: { padding: '10px 12px', borderRadius: 10, border: '1px solid #eef2f7' }
                }, ...children);
              })()
            ),
            category === 'Custom' ? React.createElement('div', { className: 'input-row', style: { minWidth: 220 } },
              React.createElement('div', { className: 'icon' }, '🏷️'),
              React.createElement('input', { type: 'text', placeholder: 'Enter custom category', value: customCategory, onChange: (e) => setCustomCategory(e.target.value) })
            ) : null,
            React.createElement('div', { className: 'actions' },
              React.createElement('button', { className: 'primary-btn', onClick: editId ? updateExpense : addExpense }, editId ? 'Update' : 'Add Expense'),
              editId ? React.createElement('button', { className: 'secondary-btn', onClick: () => { setEditId(null); setTitle(''); setAmount(''); setCategory(''); setCustomCategory(''); } }, 'Cancel') : null
            )
          )
        ),
        React.createElement('h2', { className: 'summary' }, `Total Expense: ₹ ${totalExpense}`),
        React.createElement('table', { className: 'table', border: '0', cellPadding: '0' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, 'Expense'),
              React.createElement('th', null, 'Amount'),
              React.createElement('th', null, 'Category'),
              React.createElement('th', null, 'Action')
            )
          ),
          React.createElement('tbody', null,
            expenses.map((expense) =>
              React.createElement('tr', { key: expense.id },
                React.createElement('td', null, expense.title),
                React.createElement('td', null, `₹ ${expense.amount}`),
                React.createElement('td', null, React.createElement('span', { className: 'badge' }, expense.category)),
                React.createElement('td', null,
                  React.createElement('button', { className: 'secondary-btn', onClick: () => editExpense(expense) }, 'Edit'),
                  React.createElement('button', { className: 'danger-btn', onClick: () => deleteExpense(expense.id), style: { marginLeft: 10 } }, 'Delete')
                )
              )
            )
          )
        )
      ),
      React.createElement('aside', { className: 'auth-card', style: { alignSelf: 'start' } },
        React.createElement('h3', { style: { marginTop: 0 } }, 'Quick Tips'),
        React.createElement('p', { className: 'muted' }, 'Use categories to organize expenses. Click a badge to filter (coming soon).'),
        React.createElement('div', { style: { marginTop: 12 } },
          React.createElement('div', { className: 'muted', style: { marginBottom: 6 } }, 'Recent'),
          expenses.slice(-3).reverse().map(e =>
            React.createElement('div', { key: e.id, style: { display: 'flex', justifyContent: 'space-between', padding: '8px 0' } },
              React.createElement('div', null, e.title),
              React.createElement('div', { className: 'muted' }, `₹ ${e.amount}`)
            )
          )
        )
      )
    )
  );
};

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const defaultCategories = ["Food", "Travel", "Medical", "Other", "Shopping", "Subscriptions", "Bills"];

  const addExpense = () => {
    const selectedCategory =
      category === "Custom" ? customCategory.trim() : category;

    if (!title || !amount || !selectedCategory) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category: selectedCategory,
    };

    setExpenses([...expenses, newExpense]);

    // if custom category and user logged in, persist it to user's categories
    if (currentUser && category === 'Custom' && customCategory.trim()) {
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex > -1) {
        const user = users[userIndex];
        user.categories = user.categories || [];
        if (!user.categories.includes(customCategory.trim())) {
          const updatedUsers = [...users];
          updatedUsers[userIndex] = { ...user, categories: [...user.categories, customCategory.trim()] };
          setUsers(updatedUsers);
          setCurrentUser({ ...currentUser, categories: [...(currentUser.categories || []), customCategory.trim()] });
        }
      }
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setCustomCategory("");
  };

  const [editId, setEditId] = useState(null);

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== id
      );

      setExpenses(updatedExpenses);

      if (editId === id) {
        setEditId(null);
        setTitle("");
        setAmount("");
        setCategory("");
        setCustomCategory("");
      }
    }
  };

  const editExpense = (expense) => {
    setEditId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount.toString());
    const allPreset = [...(defaultCategories || [])];
    if (allPreset.includes(expense.category)) {
      setCategory(expense.category);
      setCustomCategory("");
    } else {
      setCategory("Custom");
      setCustomCategory(expense.category);
    }
  };

  const updateExpense = () => {
    const selectedCategory =
      category === "Custom" ? customCategory.trim() : category;

    if (!title || !amount || !selectedCategory) {
      alert("Please fill all fields");
      return;
    }

    if (window.confirm("Are you sure you want to update this expense?")) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editId
          ? {
              ...expense,
              title,
              amount: Number(amount),
              category: selectedCategory,
            }
          : expense
      );

      setExpenses(updatedExpenses);
      setEditId(null);
      setTitle("");
      setAmount("");
      setCategory("");
      setCustomCategory("");
      // persist custom category to user profile if needed
      if (currentUser && category === 'Custom' && customCategory.trim()) {
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex > -1) {
          const user = users[userIndex];
          user.categories = user.categories || [];
          if (!user.categories.includes(customCategory.trim())) {
            const updatedUsers = [...users];
            updatedUsers[userIndex] = { ...user, categories: [...user.categories, customCategory.trim()] };
            setUsers(updatedUsers);
            setCurrentUser({ ...currentUser, categories: [...(currentUser.categories || []), customCategory.trim()] });
          }
        }
      }
    }
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const routes = [
    { 
      path: "/", 
      element: currentUser ? React.createElement(() => {
        window.location.href = "/dashboard";
        return null;
      }) : React.createElement(Login, { setCurrentUser, users })
    },
    { 
      path: "/signup", 
      element: !currentUser ? React.createElement(Signup, { setUsers, users }) : React.createElement(() => {
        window.location.href = "/dashboard";
        return null;
      })
    },
    { 
      path: "/dashboard", 
      element: currentUser ? React.createElement(ExpenseApp, {
        expenses, title, amount, category, customCategory, editId, totalExpense,
        addExpense, deleteExpense, editExpense, updateExpense,
        setTitle, setAmount, setCategory, setCustomCategory, setEditId,
        currentUser, setCurrentUser, users, setUsers, defaultCategories
      }) : React.createElement(() => {
        window.location.href = "/";
        return null;
      })
    }
  ];

  const router = createBrowserRouter(routes);

  return React.createElement(RouterProvider, { router });
}

export default App;