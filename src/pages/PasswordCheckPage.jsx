import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const PasswordCheckPage = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams(); // Get language parameter
  
  // Get the page the user was trying to access
  const from = location.state?.from?.pathname || `/${lang}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Attempt to login with the provided password
    const success = login(password);
    
    if (success) {
      // Redirect to the page they were trying to access
      navigate(from, { replace: true });
    } else {
      setError(t('Incorrect password. This site is in development.'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('Development Site')}
          </h1>
          <p className="text-gray-600">
            {t('This site is under development. Please enter the password to continue.')}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              {t('Password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {t('Enter Site')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordCheckPage;
