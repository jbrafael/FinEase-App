import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, Trash2, Edit } from 'lucide-react';
import './TransactionDashboard.css'; 

function TransactionDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/transactions');
      if (!response.ok) {
        throw new Error('Erro ao buscar as transações.');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEdit = (transaction) => {
    setIsEditing(transaction.id);
    setForm({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta transação?')) {
      try {
        await fetch(`http://localhost:3000/api/transactions/${id}`, {
          method: 'DELETE',
        });
        fetchTransactions();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:3000/api/transactions/${isEditing}`
      : 'http://localhost:3000/api/transactions';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'criar'} transação.`);
      }
      
      setForm({ description: '', amount: '', type: 'expense', category: '', date: '' });
      setIsEditing(null);
      fetchTransactions();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Dashboard FinEase
        </h1>
        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Receita</span>
            <span className="summary-value income">R$ {summary.totalIncome.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Despesa</span>
            <span className="summary-value expense">R$ {summary.totalExpense.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Saldo</span>
            <span className={`summary-value ${summary.balance >= 0 ? 'income' : 'expense'}`}>
              R$ {summary.balance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Formulário de nova transação */}
        <div className="form-card">
          <h2 className="form-card-title">
            {isEditing ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <form onSubmit={handleSubmit} className="transaction-form">
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição"
              className="form-input"
              required
            />
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Valor"
              className="form-input"
              required
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-input"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Categoria"
              className="form-input"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-input"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-save"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> Salvando...
                </div>
              ) : (
                isEditing ? 'Salvar Edição' : 'Adicionar Transação'
              )}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(null)}
                className="button button-cancel"
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
        
        {/* Lista de transações */}
        <div className="list-card">
          <h2 className="form-card-title">Minhas Transações</h2>
          {loading && <p className="text-center text-gray-500">Carregando transações...</p>}
          {error && <p className="text-center text-red-500">Erro: {error}</p>}
          {!loading && !error && (
            <ul className="transaction-list">
              {transactions.length > 0 ? (
                transactions.map(t => (
                  <li key={t.id} className="transaction-item">
                    <div className="transaction-details">
                      <span className="transaction-description">
                        {t.description}
                      </span>
                      <span className="transaction-date">
                        {new Date(t.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="transaction-actions">
                      <span className={`transaction-amount ${t.type}`}>
                        R$ {parseFloat(t.amount).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleEdit(t)} 
                        className="action-button edit-button"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(t.id)} 
                        className="action-button delete-button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhuma transação encontrada.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionDashboard;