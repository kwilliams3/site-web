import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import { Product, Category } from '../types/database.types';

// Fonction de conversion en XAF
const convertToXAF = (amount: number) => {
  return (amount * 600).toLocaleString('fr-FR') + ' FCFA';
};

// Catégories de produits
const mockCategories: Category[] = [
  { id: 1, name: 'Fruits & Légumes', created_at: new Date().toISOString() },
  { id: 2, name: 'Boulangerie', created_at: new Date().toISOString() },
  { id: 3, name: 'Produits Laitiers', created_at: new Date().toISOString() },
  { id: 4, name: 'Boissons', created_at: new Date().toISOString() },
  { id: 5, name: 'Épicerie', created_at: new Date().toISOString() },
  { id: 6, name: 'Produits Locaux', created_at: new Date().toISOString() }
];

// Produits avec URLs d'images corrigées
const mockProducts: Product[] = [
  // Produits de base
  {
    id: 1,
    name: 'Pommes Bio',
    description: 'Pommes fraîches de production locale et biologique',
    price: convertToXAF(2.99),
    originalPrice: 2.99,
    image_url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Baguette Tradition',
    description: 'Baguette traditionnelle préparée selon la recette ancestrale',
    price: convertToXAF(1.20),
    originalPrice: 1.20,
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 2,
    created_at: new Date().toISOString()
  },
  // Produits 
  {
    id: 9,
    name: 'Plantains Mûrs',
    description: 'Plantains bien mûrs pour vos plats traditionnels',
    price: convertToXAF(1.50),
    originalPrice: 1.50,
    image_url: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 10,
    name: 'Feuilles de Ndolè',
    description: 'Pour la préparation du plat national',
    price: convertToXAF(1.20),
    originalPrice: 1.20,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 11,
    name: 'Poulet Fermier',
    description: 'Poulet frais pour préparer le célèbre Poulet DG',
    price: convertToXAF(4.80),
    originalPrice: 4.80,
    image_url: 'https://images.unsplash.com/photo-1606850780686-1bbfaf1efb0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 6,
    created_at: new Date().toISOString()
  },
  {
    id: 12,
    name: 'Feuilles d\'Eru',
    description: 'Pour la soupe traditionnelle',
    price: convertToXAF(1.00),
    originalPrice: 1.00,
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 13,
    name: 'Taro Frais',
    description: 'Pour préparer l\'achu',
    price: convertToXAF(0.80),
    originalPrice: 0.80,
    image_url: 'https://images.unsplash.com/photo-1594282418423-2d97b6ba364f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 14,
    name: 'Bobolo',
    description: 'Spécialité à base de manioc',
    price: convertToXAF(1.50),
    originalPrice: 1.50,
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 6,
    created_at: new Date().toISOString()
  },
  {
    id: 15,
    name: 'Kondrè',
    description: 'Kondrè prêt à cuisiner',
    price: convertToXAF(2.50),
    originalPrice: 2.50,
    image_url: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 6,
    created_at: new Date().toISOString()
  },
  {
    id: 16,
    name: 'Piment Noir',
    description: 'Piment noir frais du Cameroun',
    price: convertToXAF(0.50),
    originalPrice: 0.50,
    image_url: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 17,
    name: 'Sucre Rouge',
    description: 'Sucre rouge artisanal',
    price: convertToXAF(1.20),
    originalPrice: 1.20,
    image_url: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 18,
    name: 'Bissap',
    description: 'Fleurs d\'hibiscus séchées pour infusion',
    price: convertToXAF(1.80),
    originalPrice: 1.80,
    image_url: 'https://images.unsplash.com/photo-1594282418423-2d97b6ba364f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 19,
    name: 'Jus de Folèrè',
    description: 'Jus traditionnel camerounais',
    price: convertToXAF(2.00),
    originalPrice: 2.00,
    image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 20,
    name: 'Miel Sauvage',
    description: 'Miel 100% naturel des forêts camerounaises',
    price: convertToXAF(3.50),
    originalPrice: 3.50,
    image_url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category_id: 5,
    created_at: new Date().toISOString()
  }
];

const Gallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nos Produits </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Découvrez notre sélection de produits frais et de spécialités locales
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative shadow-sm rounded-lg overflow-hidden">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border-0 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Catégories</h3>
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onCategoryChange={setSelectedCategory} 
              />
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} loading={loading} />
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-700">Aucun produit trouvé</h3>
                <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;