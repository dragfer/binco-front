import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SessionAuth = () => {
  const { session_code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateMachine = async () => {
      try {
        const response = await fetch(`http://192.168.20.233:5000/machine/authenticate?sessionCode=${session_code}`,
            {
                method: 'GET',
                headers:{
                  'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
                });
        
        // Handle successful authentication
        console.log(response.status)        
        // Redirect to dashboard or handle the response as needed
        navigate('/user/dashboard');
        
      } catch (err) {
        console.error('Authentication failed:', err);
        setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        navigate(`/login?redirect_to=/machine/${session_code}`)
      } finally {
        setLoading(false);
      }
    };

    if (session_code) {
      authenticateMachine();
    } else {
      setError('No session code provided');
      setLoading(false);
    }
  }, [session_code, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Authenticating session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-sm mx-auto bg-red-50 rounded-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }


  return null;
};

export default SessionAuth;