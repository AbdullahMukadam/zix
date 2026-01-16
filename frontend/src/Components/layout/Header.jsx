
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiGithub } from 'react-icons/fi';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[#020202]/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center h-16 px-6 lg:px-8">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-white hover:opacity-80 transition-opacity">
        <span className="text-sm tracking-wide">Zix</span>
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/templates" className="text-sm font-medium text-util-gray hover:text-white transition-colors">
          Templates
        </Link>
        <Link to="/showcase" className="text-sm font-medium text-util-gray hover:text-white transition-colors">
          Showcase
        </Link>
        <Link to="/tools" className="text-sm font-medium text-util-gray hover:text-white transition-colors">
          Tools
        </Link>
        <Link to="/components" className="text-sm font-medium text-util-gray hover:text-white transition-colors">
          UI Components
        </Link>
        <Link to="/productivity" className="text-sm font-medium text-util-gray hover:text-white transition-colors">
          Productivity
        </Link>
      </div>

      {/* Auth */}
      <div className="flex items-center gap-6">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs font-mono text-util-gray/60 px-2 py-1 bg-white/5 rounded border border-white/5">
              {user.login}
            </span>
            <button 
              onClick={handleLogout}
              className="text-xs font-bold text-white hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={login}
            className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 border border-white/10 px-4 py-2 rounded-md hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <FiGithub className="w-4 h-4" />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
