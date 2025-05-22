import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Truck, ThumbsUp, ShoppingBasket, ArrowRight, Star, Award, Heart } from 'lucide-react';
import ValueCard from '../components/ValueCard';
import ProductList from '../components/ProductList';
import { Product } from '../types/database.types';

// Taux de conversion approximatif (1 USD = 600 XAF)
const convertToXAF = (amount: number) => {
  return (amount * 600).toLocaleString('fr-FR') + ' FCFA';
};

// Images pour le carrousel (10 images premium bleutées)
const heroImages = [
  'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1578916171728-46686eac8b58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

// Produits vedettes premium
const mockFeaturedProducts: Product[] = [
  {
    id: 1,
    name: 'Pommes Bio Premium',
    description: 'Pommes fraîches biologiques cultivées localement avec amour',
    price: convertToXAF(3.99),
    originalPrice: 3.99,
    image_url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category_id: 1,
    created_at: new Date().toISOString(),
    isFeatured: true,
    rating: 5
  },
  {
    id: 2,
    name: 'Baguette Artisanale',
    description: 'Baguette traditionnelle préparée par nos maîtres boulangers',
    price: convertToXAF(1.50),
    originalPrice: 1.50,
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category_id: 2,
    created_at: new Date().toISOString(),
    isFeatured: true,
    rating: 4
  },
  {
    id: 3,
    name: 'Fromage de Chèvre Affiné',
    description: 'Fromage artisanal affiné 4 semaines - Grand Cru',
    price: convertToXAF(6.75),
    originalPrice: 6.75,
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category_id: 3,
    created_at: new Date().toISOString(),
    isFeatured: true,
    rating: 5
  },
  {
    id: 4,
    name: 'Jus d\'Orange Pressé Premium',
    description: '100% pur jus pressé à froid - Sans additifs',
    price: convertToXAF(4.25),
    originalPrice: 4.25,
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category_id: 4,
    created_at: new Date().toISOString(),
    isFeatured: true,
    rating: 5
  }
];

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Changement plus rapide (4s)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Version bleue premium */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white h-screen min-h-[800px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt="Produits frais SERDIS" 
              className={`w-full h-full object-cover transition-all duration-1000 ${index === currentImageIndex ? 'opacity-30 scale-100' : 'opacity-0 scale-105 absolute top-0 left-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="mb-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full w-max border border-white/30 shadow-lg">
              <ShoppingBasket className="h-6 w-6" />
              <span className="text-lg font-semibold">🎯 Produits frais livrés quotidiennement</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">STE SERDIS SARL</span> - Excellence Alimentaire
            </h1>
            <p className="text-2xl md:text-3xl mb-10 max-w-3xl leading-relaxed font-medium text-blue-100">
              Votre épicerie premium où <span className="text-white font-bold">qualité</span> et <span className="text-white font-bold">fraîcheur</span> se rencontrent
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/gallery" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-5 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-3 text-lg transform hover:scale-105"
              >
                Explorer nos produits <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 text-lg backdrop-blur-sm transform hover:scale-105"
              >
                Découvrir notre histoire <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Badge de qualité flottant */}
        <div className="absolute bottom-10 left-10 bg-white/90 text-blue-800 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-20">
          <Award className="h-5 w-5 fill-blue-600" />
          <span className="font-bold">Certifié Excellence 2024</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-blue-700 mb-2">05+</div>
              <div className="text-lg text-gray-600">Années d'expérience</div>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
              <div className="text-lg text-gray-600">Produits premium</div>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-blue-700 mb-2">10K+</div>
              <div className="text-lg text-gray-600">Clients satisfaits</div>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-blue-700 mb-2">24/7</div>
              <div className="text-lg text-gray-600">Service client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Version bleue premium */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-md font-semibold mb-4 border border-blue-200">
              🏆 Notre Engagement
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">choisir</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chez SERDIS, chaque produit raconte une histoire d'excellence, de passion et de respect pour la nature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={ShieldCheck} 
              title="Qualité Certifiée" 
              description="Sélection rigoureuse avec des normes de qualité 3x plus strictes que le marché."
              color="text-blue-600"
              badge="Top Qualité"
            />
            <ValueCard 
              icon={Leaf} 
              title="Éco-Responsable" 
              description="95% de nos produits proviennent de circuits courts et durables."
              color="text-blue-600"
              badge="Green"
            />
            <ValueCard 
              icon={Truck} 
              title="Livraison Express" 
              description="Recevez vos produits frais en moins de 24h avec notre réseau logistique."
              color="text-blue-600"
              badge="Rapidité"
            />
            <ValueCard 
              icon={Heart} 
              title="Satisfaction 100%" 
              description="Notre promesse: vous satisfaire ou vous rembourser sans condition."
              color="text-blue-600"
              badge="Garantie"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section - Version bleue luxe */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-6 py-2 rounded-full text-md font-semibold mb-4 border border-blue-200">
                🌟 Nos Créations
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Sélection <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Exclusive</span>
              </h2>
            </div>
            <Link 
              to="/gallery" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
            >
              Voir tout le catalogue
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductList products={mockFeaturedProducts} />
        </div>
      </section>
      
      {/* Call to Action - Version bleue immersive */}
      <section className="relative py-32 bg-[url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Prêt à vivre l'expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">SERDIS</span> ?
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium text-blue-100">
            Rejoignez nos milliers de clients satisfaits et découvrez la différence d'une épicerie qui met la qualité au premier plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/gallery" 
              className="bg-white text-blue-700 px-12 py-6 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl inline-flex items-center gap-3 text-lg transform hover:scale-105 shadow-lg"
            >
              Commander maintenant <ArrowRight className="h-6 w-6" />
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-3 border-white text-white px-12 py-6 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-3 text-lg backdrop-blur-sm transform hover:scale-105"
            >
              Nous contacter <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;