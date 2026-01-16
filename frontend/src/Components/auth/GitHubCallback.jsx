import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { handleOAuthCallback } from '../../services/github/auth.js';
import { FiLoader } from 'react-icons/fi';

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();

  useEffect(() => {
    processCallback();
  }, []);

  const processCallback = async () => {
    try {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/templates?auth=failed');
        return;
      }

      if (!code) {
        navigate('/templates');
        return;
      }

      // Exchange code for token
      const token = await handleOAuthCallback(code);
      
      // Update auth context
      const success = await handleCallback(token);
      
      if (success) {
        // Redirect back to templates page
        navigate('/templates?auth=success');
      } else {
        navigate('/templates?auth=failed');
      }
    } catch (error) {
      console.error('Callback error:', error);
      navigate('/templates?auth=failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <FiLoader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Authenticating with GitHub...</p>
      </div>
    </div>
  );
};

export default GitHubCallback;
