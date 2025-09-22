import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock, TrendingUp } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      {/* HEADER: Barra de Navegação */}
      <header className="container mx-auto p-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          FinEase
        </div>
        <nav className="space-x-4">
           <Link to="/auth" className="text-gray-600 hover:text-blue-600">Login</Link>
           <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
         Começar agora
           </Link>
         </nav>
      </header>

      {/* HERO SECTION: O destaque principal da página */}
      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center flex-grow">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Seu dinheiro sob controle, <br />sem esforço
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Tudo o que você precisa para organizar suas finanças sem perder tempo.
        </p>
        <a href="/dashboard" className="mt-8 bg-blue-600 text-white text-lg px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Começar agora →
        </a>
      </main>

      {/* SEÇÃO DE FEATURES */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          O guia para o seu sucesso financeiro
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm">
            <CheckCircle2 size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seu dinheiro sob controle</h3>
            <p className="text-gray-600">Organize suas despesas e receitas para ter uma visão clara das suas finanças.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm">
            <TrendingUp size={48} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transformando em hábito</h3>
            <p className="text-gray-600">Acompanhe seus gastos diários e transforme o controle financeiro em um hábito saudável.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm">
            <Lock size={48} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Segurança em primeiro lugar</h3>
            <p className="text-gray-600">Tecnologia de ponta para proteger seus dados e sua privacidade.</p>
          </div>
          
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-9">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 FinEase. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
