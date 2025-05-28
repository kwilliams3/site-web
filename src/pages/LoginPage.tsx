import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt, FaExclamationCircle, FaSpinner, FaCheck } from 'react-icons/fa';
import { useAuth } from '../AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (username === 'Admin' && password === 'Admin') {
        setSuccess(true);
        login();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[#4361ee] to-[#3f37c9]"></div>

        <div className="absolute w-52 h-52 rounded-full bg-[rgba(67,97,238,0.1)] -top-12 -right-12"></div>
        <div className="absolute w-64 h-64 rounded-full bg-[rgba(67,97,238,0.1)] -bottom-20 -left-16"></div>

        <div className="relative z-10 p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Ste SERDIS SARL</h1>
            <p className="text-gray-600 text-sm mt-2">Accès sécurisé au système</p>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Connexion</h2>

          <form onSubmit={handleSubmit} className={`transition-all ${error ? 'animate-shake' : ''}`}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:border-transparent transition-all"
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 text-center text-red-500 text-sm animate-fadeIn">
                <FaExclamationCircle className="inline mr-2" />
                Identifiants incorrects
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                success
                  ? 'bg-green-500'
                  : loading
                  ? 'bg-[#3a56d4] cursor-not-allowed'
                  : 'bg-[#4361ee] hover:bg-[#3a56d4] hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              {success ? (
                <>
                  <FaCheck className="inline mr-2" />
                  Connexion réussie
                </>
              ) : loading ? (
                <>
                  <FaSpinner className="inline mr-2 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <FaSignInAlt className="inline mr-2" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-8">
            © 2025 Ste SERDIS SARL. Tous droits réservés.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        .animate-shake {
          animation: shake 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;