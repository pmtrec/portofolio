import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';

const AdminButton: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [inputId, setInputId] = useState('');
  const [error, setError] = useState('');

  const handleAdminClick = () => {
    if (isAuthenticated) {
      // Show admin menu or redirect to admin panel
      window.location.href = '/dashboard';
    } else {
      setShowPrompt(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId === import.meta.env.VITE_ADMIN_ID) {
      setIsAuthenticated(true);
      setShowPrompt(false);
      setError('');
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      setError('Identifiant incorrect');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  // Check if already authenticated on mount
  React.useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <button
        onClick={handleAdminClick}
        className={`p-2 rounded-lg transition-colors ${
          isAuthenticated
            ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        title={isAuthenticated ? 'Admin connecté' : 'Accès admin'}
      >
        <Shield className="h-5 w-5" />
      </button>

      {showPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Accès administrateur
              </h3>
              <button
                onClick={() => setShowPrompt(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Identifiant administrateur
                </label>
                <input
                  type="password"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Entrez l'identifiant"
                  autoFocus
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrompt(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminButton;