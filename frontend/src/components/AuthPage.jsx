import React, { useState } from 'react';
import { User, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? 'login' : 'register';
    const url = `http://localhost:3000/api/auth/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação.');
      }

      // Em um projeto real, você salvaria o token de autenticação aqui
      console.log('Autenticação bem-sucedida:', data);
      alert(isLogin ? 'Login bem-sucedido!' : 'Registro bem-sucedido!');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Criar Conta'}
        </h2>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Nome de usuário"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Senha"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            ) : (
              isLogin ? 'Entrar' : 'Registrar'
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline ml-1 cursor-pointer"
          >
            {isLogin ? 'Crie uma!' : 'Entre aqui.'}
          </span>
        </p>
        <Link to="/" className="text-blue-600 hover:underline mt-4">
          ← Voltar para a Landing Page
        </Link>
      </div>
    </div>
  );
}

export default AuthPage;