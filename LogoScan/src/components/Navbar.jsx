import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, ArrowLeft, Camera } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isScanPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isScanPage || isLoginPage) {
    return (
        <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 hover:scale-110">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">EcoScan</span>
              </Link>
            </div>
  
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#about" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link
                to="/login"
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
  
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="#about"
                className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md text-base font-medium transition-colors mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:scale-110">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">EcoScan</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Leaderboard
            </Link>
            <Link to="/camera" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Scan
            </Link>
            <Link to="/" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Log Out
            </Link>
            <Link
              to="/camera"
              className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/home"
              className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              to="/camera"
              className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Scan
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Log Out
            </Link>
            <Link
              to="/camera"
              className="block px-3 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md text-base font-medium transition-colors mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;