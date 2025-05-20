import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Package, PlusCircle, Save, X } from 'lucide-react';
import AdminProductForm, { ProductFormData } from '../components/AdminProductForm';
import { Product, Category } from '../types/database.types';
import { supabase } from '../lib/supabase';

// Taux de conversion EUR vers XAF
const EUR_TO_XAF = 655.957;

// Fonction de conversion
const convertToXAF = (priceInEur: number) => {
  const amountInXaf = priceInEur * EUR_TO_XAF;
  return Math.round(amountInXaf).toLocaleString('fr-FR') + ' FCFA';
};

// Mock data
const mockCategories: Category[] = [
  { id: 1, name: 'Fruits & Légumes', created_at: new Date().toISOString() },
  { id: 2, name: 'Boulangerie', created_at: new Date().toISOString() },
  { id: 3, name: 'Produits Laitiers', created_at: new Date().toISOString() },
  { id: 4, name: 'Boissons', created_at: new Date().toISOString() },
  { id: 5, name: 'Épicerie', created_at: new Date().toISOString() }
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Pommes Bio',
    description: 'Pommes fraîches de production locale et biologique',
    price: 2.99,
    image_url: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    category_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Baguette Tradition',
    description: 'Baguette traditionnelle préparée selon la recette ancestrale',
    price: 1.20,
    image_url: 'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg',
    category_id: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Fromage de Chèvre',
    description: 'Fromage de chèvre artisanal affiné pendant 3 semaines',
    price: 4.50,
    image_url: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg',
    category_id: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Jus d\'Orange Pressé',
    description: 'Jus d\'orange fraîchement pressé sans sucre ajouté',
    price: 3.25,
    image_url: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    category_id: 4,
    created_at: new Date().toISOString()
  }
];

// Composant Gallery pour afficher les produits
const Gallery: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Galerie des Produits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">{convertToXAF(product.price)}</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {mockCategories.find(c => c.id === product.category_id)?.name || 'Inconnue'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<ProductFormData | null>(null);
  const [showGallery, setShowGallery] = useState(false);

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

  const handleAddProduct = async (data: ProductFormData) => {
    try {
      const newProduct: Product = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...data,
        created_at: new Date().toISOString()
      };
      
      setProducts(prev => [...prev, newProduct]);
      alert('Produit ajouté avec succès!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Erreur lors de l\'ajout du produit.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) return;
    
    try {
      setProducts(prev => prev.filter(product => product.id !== id));
      alert('Produit supprimé avec succès!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit.');
    }
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      category_id: product.category_id
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const saveEditing = (id: number) => {
    if (!editFormData) return;
    
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, ...editFormData }
          : product
      )
    );
    setEditingId(null);
    setEditFormData(null);
    alert('Produit modifié avec succès!');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editFormData) return;
    
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev!,
      [name]: name === 'price' ? parseFloat(value) || 0 : name === 'category_id' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Administration</h1>
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showGallery ? 'Voir l\'administration' : 'Voir la galerie'}
          </button>
        </div>
      </nav>

      {showGallery ? (
        <Gallery products={products} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <PlusCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Ajouter un produit
                  </h2>
                </div>
                <div className="p-4">
                  <AdminProductForm categories={categories} onSubmit={handleAddProduct} />
                </div>
              </div>
            </div>
            
            {/* Product List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-green-600" />
                    Liste des Produits ({products.length})
                  </h2>
                </div>
                
                {loading ? (
                  <div className="p-6 flex flex-col items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Chargement des produits...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="p-6 text-center h-48 flex flex-col items-center justify-center">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun produit disponible.</p>
                    <p className="text-gray-500 text-sm mt-1">Ajoutez votre premier produit.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="h-10 w-10 rounded-md object-cover border border-gray-200"
                                  />
                                </div>
                                <div className="ml-3">
                                  {editingId === product.id ? (
                                    <input
                                      type="text"
                                      name="name"
                                      value={editFormData?.name || ''}
                                      onChange={handleEditChange}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    />
                                  ) : (
                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  )}
                                  {editingId === product.id ? (
                                    <textarea
                                      name="description"
                                      value={editFormData?.description || ''}
                                      onChange={handleEditChange}
                                      rows={2}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {editingId === product.id ? (
                                <input
                                  type="number"
                                  name="price"
                                  step="0.01"
                                  value={editFormData?.price || 0}
                                  onChange={handleEditChange}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                />
                              ) : (
                                <>
                                  <div className="text-sm font-semibold text-blue-600">
                                    {convertToXAF(product.price)}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {(product.price).toFixed(2)} €
                                  </div>
                                </>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {editingId === product.id ? (
                                <select
                                  name="category_id"
                                  value={editFormData?.category_id || 1}
                                  onChange={handleEditChange}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                >
                                  {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-green-100 text-green-800">
                                  {categories.find(c => c.id === product.category_id)?.name || 'Inconnue'}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-medium">
                              {editingId === product.id ? (
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => saveEditing(product.id)}
                                    className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                                    title="Enregistrer"
                                  >
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={cancelEditing}
                                    className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                                    title="Annuler"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => startEditing(product)}
                                    className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                                    title="Modifier"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                                    title="Supprimer"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;