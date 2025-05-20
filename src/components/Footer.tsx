import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, 
  ShoppingBasket, Home, ShoppingBag, Users, Shield,
  Clock, CreditCard, Truck, ShieldCheck
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-5">
              <div className="relative">
                <ShoppingBasket className="h-8 w-8 text-green-400" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                SuperMarché
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Votre supermarché de confiance offrant des produits frais et de qualité pour toute la famille depuis 2010.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">Livraison rapide</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">Paiement sécurisé</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">Ouvert 7j/7</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-5 flex items-center">
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Navigation
              </span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-gray-400 hover:text-green-400 transition-colors group">
                  <Home className="h-4 w-4 mr-3 text-green-400 group-hover:scale-125 transition-transform" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center text-gray-400 hover:text-green-400 transition-colors group">
                  <ShoppingBag className="h-4 w-4 mr-3 text-green-400 group-hover:scale-125 transition-transform" />
                  <span>Galerie Produits</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center text-gray-400 hover:text-green-400 transition-colors group">
                  <Users className="h-4 w-4 mr-3 text-green-400 group-hover:scale-125 transition-transform" />
                  <span>À Propos</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="flex items-center text-gray-400 hover:text-green-400 transition-colors group">
                  <Shield className="h-4 w-4 mr-3 text-green-400 group-hover:scale-125 transition-transform" />
                  <span>Espace Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-5 flex items-center">
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Contact
              </span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-400">Téléphone</p>
                  <p className="text-gray-300 hover:text-green-400 transition-colors">
                    <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-400">Email</p>
                  <p className="text-gray-300 hover:text-green-400 transition-colors">
                    <a href="mailto:contact@supermarche.com">contact@supermarche.com</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-400">Adresse</p>
                  <p className="text-gray-300">Bonapriso: Carrefour ARNO, Douala</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-5 flex items-center">
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Réseaux Sociaux
              </span>
            </h3>
            <p className="text-gray-400 mb-5">
              Suivez-nous pour les dernières promotions et actualités.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-400 hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SuperMarché. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;