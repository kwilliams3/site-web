import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ShoppingCart, Home, Image, Info, Mail, Lock, 
  ShoppingBasket, Store, User, Settings, ShoppingBag, 
  Users, Phone, Shield 
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Icônes améliorées avec des couleurs contextuelles et une meilleure cohérence
  const navItems = [
    { 
      path: "/", 
      name: "Accueil", 
      icon: <Home className="h-[1.2rem] w-[1.2rem] text-sky-600" />, 
      mobileIcon: <Home className="h-5 w-5 text-sky-600" /> 
    },
    { 
      path: "/gallery", 
      name: "Galerie", 
      icon: <ShoppingBag className="h-[1.2rem] w-[1.2rem] text-sky-500" />, 
      mobileIcon: <ShoppingBag className="h-5 w-5 text-sky-500" /> 
    },
    { 
      path: "/about", 
      name: "À Propos", 
      icon: <Users className="h-[1.2rem] w-[1.2rem] text-sky-400" />, 
      mobileIcon: <Users className="h-5 w-5 text-sky-400" /> 
    },
    { 
      path: "/contact", 
      name: "Contact", 
      icon: <Phone className="h-[1.2rem] w-[1.2rem] text-sky-300" />, 
      mobileIcon: <Phone className="h-5 w-5 text-sky-300" /> 
    },
    { 
      path: "/admin", 
      name: "Admin", 
      icon: <Shield className="h-[1.2rem] w-[1.2rem] text-sky-700" />, 
      mobileIcon: <Shield className="h-5 w-5 text-sky-700" /> 
    }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-sky-50/95 backdrop-blur-md shadow-lg' : 'bg-sky-50 shadow-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo avec animation améliorée */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center group"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative transition-all duration-500 group-hover:rotate-[360deg]">
                <ShoppingBasket className="h-8 w-8 text-sky-600 group-hover:text-sky-700 transition-colors" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-sky-500 animate-pulse"></span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                Ste SERDIS SARL
              </span>
            </Link>
          </div>
          
          {/* Desktop menu avec icônes améliorées */}
          <nav className="hidden md:flex items-center space-x-1 ml-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  location.pathname === item.path
                    ? 'bg-sky-50 text-sky-700 shadow-inner'
                    : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
                title={item.name}
              >
                <span className="mr-2 transition-transform duration-300 group-hover:scale-110">
                  {React.cloneElement(item.icon, {
                    className: `${item.icon.props.className} transition-colors duration-300 ${
                      location.pathname === item.path ? 'text-sky-600' : ''
                    }`
                  })}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button avec animation améliorée */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-sky-600 hover:bg-sky-50 focus:outline-none transition-all duration-200"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform transition-all duration-300 rotate-180 scale-110 text-red-500" />
              ) : (
                <Menu className="h-6 w-6 transform transition-all duration-300 hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu avec icônes améliorées */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white border-t border-gray-100 shadow-inner">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 group ${
                location.pathname === item.path
                  ? 'bg-sky-50 text-sky-700 shadow-inner'
                  : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
              }`}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              <span className="mr-3 transition-transform duration-300 group-hover:scale-110">
                {React.cloneElement(item.mobileIcon, {
                  className: `${item.mobileIcon.props.className} transition-colors duration-300 ${
                    location.pathname === item.path ? 'text-sky-600' : ''
                  }`
                })}
              </span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;