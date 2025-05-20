import React from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '../types/database.types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, image_url, originalPrice } = product;
  
  // Fonction pour formater le prix
  const formatPrice = (value: number | string) => {
    if (typeof value === 'number') {
      return value.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' FCFA';
    }
    return value; // Si déjà formaté en string
  };

  // Afficher le prix formaté
  const displayPrice = formatPrice(price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image_url} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-700 font-bold">{displayPrice}</span>
          <button 
            className="flex items-center text-sm font-medium text-white bg-green-600 px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors"
            aria-label="Voir le produit"
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Voir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;