import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Truck, ThumbsUp, ShoppingBasket, ArrowRight } from 'lucide-react';
import ValueCard from '../components/ValueCard';
import ProductList from '../components/ProductList';
import { Product } from '../types/database.types';

// Taux de conversion approximatif (1 USD = 600 XAF)
const convertToXAF = (amount: number) => {
  return (amount * 600).toLocaleString('fr-FR') + ' FCFA';
};

// Mock data for featured products
const mockFeaturedProducts: Product[] = [
  {
    id: 1,
    name: 'Pommes Bio',
    description: 'Pommes fraîches de production locale et biologique',
    price: convertToXAF(2.99),
    originalPrice: 2.99,
    image_url: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Baguette Tradition',
    description: 'Baguette traditionnelle préparée selon la recette ancestrale',
    price: convertToXAF(1.20),
    originalPrice: 1.20,
    image_url: 'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg',
    category_id: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Fromage de Chèvre',
    description: 'Fromage de chèvre artisanal affiné pendant 3 semaines',
    price: convertToXAF(4.50),
    originalPrice: 4.50,
    image_url: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg',
    category_id: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Jus d\'Orange Pressé',
    description: 'Jus d\'orange fraîchement pressé sans sucre ajouté',
    price: convertToXAF(3.25),
    originalPrice: 3.25,
    image_url: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    category_id: 4,
    created_at: new Date().toISOString()
  }
];

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Texte centré */}
      <section className="relative bg-gradient-to-br from-green-700 to-green-900 text-white h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://img.freepik.com/photos-gratuite/femme-afro-americaine-chariot-provisions-dans-supermarche-parle-telephone-portable_627829-643.jpg" 
            alt="Supermarket" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-max">
              <ShoppingBasket className="h-5 w-5" />
              <span className="text-sm font-medium">Produits frais tous les jours</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              Bienvenue à <span className="text-green-300">SuperMarché</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed">
              Découvrez une large sélection de produits frais et de qualité pour toute la famille.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/gallery" 
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                Voir nos Produits
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                En Savoir Plus
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Nos Valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ce qui nous <span className="text-green-600">distingue</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Nous nous engageons à fournir des produits de qualité tout en respectant nos valeurs fondamentales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={ShieldCheck} 
              title="Qualité" 
              description="Nous sélectionnons rigoureusement chaque produit pour garantir une qualité optimale."
              color="text-green-600"
            />
            <ValueCard 
              icon={Leaf} 
              title="Écologie" 
              description="Nous privilégions les produits locaux et respectueux de l'environnement."
              color="text-green-600"
            />
            <ValueCard 
              icon={Truck} 
              title="Service" 
              description="Notre équipe est à votre disposition pour vous offrir le meilleur service."
              color="text-green-600"
            />
            <ValueCard 
              icon={ThumbsUp} 
              title="Satisfaction" 
              description="Votre satisfaction est notre priorité absolue."
              color="text-green-600"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Nos Produits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Produits <span className="text-green-600">Vedettes</span>
              </h2>
            </div>
            <Link 
              to="/gallery" 
              className="text-green-600 font-medium hover:text-green-700 transition-colors flex items-center gap-1 group"
            >
              Voir tous les produits
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductList products={mockFeaturedProducts} />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à découvrir nos <span className="text-green-200">produits</span>?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Visitez notre galerie pour découvrir notre large gamme de produits frais et de qualité.
          </p>
          <Link 
            to="/gallery" 
            className="bg-white text-green-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
          >
            Explorer la Galerie
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;