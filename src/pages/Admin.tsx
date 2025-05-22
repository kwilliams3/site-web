import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Package, PlusCircle, Save, X, List, Image as ImageIcon } from 'lucide-react';
import AdminProductForm from '../components/AdminProductForm';
import { Product, Category, ProductFormData } from '../types/database.types';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import Gallery from './Gallery';

const EUR_TO_XAF = 655.957;

const convertToXAF = (priceInEur: number) => {
  return Math.round(priceInEur * EUR_TO_XAF).toLocaleString('fr-FR') + ' FCFA';
};

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<ProductFormData | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: productsData } = await supabase.from('products').select('*');
        const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
        
        if (productsData) setProducts(productsData);
        if (categoriesData) setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleAddProduct = async (data: ProductFormData) => {
    try {
      setLoading(true);
      let imageUrl = data.image_url || '';
      
      if (data.image_file) {
        const fileExt = data.image_file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, data.image_file);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
      }

      const newProduct = {
        name: data.name,
        description: data.description,
        price: data.price,
        image_url: imageUrl,
        category_id: data.category_id
      };

      const { data: insertedProduct, error } = await supabase
        .from('products')
        .insert(newProduct)
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => [...prev, insertedProduct]);
      alert('Produit ajouté avec succès!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Erreur lors de l\'ajout du produit.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id: number) => {
    if (!editFormData) return;
    
    try {
      setLoading(true);
      let imageUrl = editFormData.image_url || '';
      
      if (editFormData.image_file) {
        // Delete old image if exists
        if (editFormData.image_url) {
          const oldImagePath = editFormData.image_url.split('/').pop();
          await supabase.storage
            .from('product-images')
            .remove([`products/${oldImagePath}`]);
        }
        
        // Upload new image
        const fileExt = editFormData.image_file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, editFormData.image_file);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
      }

      const updatedProduct = {
        name: editFormData.name,
        description: editFormData.description,
        price: editFormData.price,
        image_url: imageUrl,
        category_id: editFormData.category_id
      };

      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === id ? data : p));
      setEditingId(null);
      setEditFormData(null);
      alert('Produit modifié avec succès!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Erreur lors de la modification du produit.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) return;
    
    try {
      setLoading(true);
      
      // Delete image from storage if exists
      const product = products.find(p => p.id === id);
      if (product?.image_url) {
        const imagePath = product.image_url.split('/').pop();
        await supabase.storage
          .from('product-images')
          .remove([`products/${imagePath}`]);
      }
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== id));
      alert('Produit supprimé avec succès!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      setLoading(true);
      const { data: newCategory, error } = await supabase
        .from('categories')
        .insert({ name: newCategoryName.trim() })
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      alert('Catégorie ajoutée avec succès!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Erreur lors de l\'ajout de la catégorie.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategoryId || !editingCategoryName.trim()) return;
    
    try {
      setLoading(true);
      const { data: updatedCategory, error } = await supabase
        .from('categories')
        .update({ name: editingCategoryName.trim() })
        .eq('id', editingCategoryId)
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => prev.map(c => 
        c.id === editingCategoryId ? updatedCategory : c
      ));
      setEditingCategoryId(null);
      setEditingCategoryName('');
      alert('Catégorie modifiée avec succès!');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Erreur lors de la modification de la catégorie.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie? Les produits associés ne seront pas supprimés mais n\'auront plus de catégorie.')) return;
    
    try {
      setLoading(true);
      
      // First update products in this category to have null category
      await supabase
        .from('products')
        .update({ category_id: null })
        .eq('category_id', id);
      
      // Then delete the category
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.filter(c => c.id !== id));
      setProducts(prev => prev.map(p => 
        p.category_id === id ? { ...p, category_id: null } : p
      ));
      alert('Catégorie supprimée avec succès!');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Erreur lors de la suppression de la catégorie.');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      category_id: product.category_id || categories[0]?.id || 1,
      image_file: null
    });
  };

  const startEditingCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const cancelEditingCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editFormData) return;
    
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev!,
      [name]: name === 'price' ? parseFloat(value) || 0 : name === 'category_id' ? parseInt(value) || 1 : value
    }));
  };

  const handleImageChange = (file: File | null) => {
    if (!editFormData) return;
    setEditFormData(prev => ({
      ...prev!,
      image_file: file,
      image_url: file ? URL.createObjectURL(file) : prev?.image_url || ''
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Administration</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <List className="h-4 w-4 mr-2" />
              {showCategoryForm ? 'Masquer catégories' : 'Gérer catégories'}
            </button>
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showGallery ? 'Voir l\'administration' : 'Voir la galerie'}
            </button>
          </div>
        </div>
      </nav>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {showGallery ? (
        <Gallery products={products} categories={categories} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {showCategoryForm && (
            <div className="mb-6 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Gestion des Catégories</h2>
              
              {/* Add/Edit Category Form */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={editingCategoryId ? editingCategoryName : newCategoryName}
                  onChange={(e) => 
                    editingCategoryId 
                      ? setEditingCategoryName(e.target.value) 
                      : setNewCategoryName(e.target.value)
                  }
                  placeholder="Nom de la catégorie"
                  className="flex-1 p-2 border rounded-md"
                />
                {editingCategoryId ? (
                  <>
                    <button
                      onClick={handleUpdateCategory}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={cancelEditingCategory}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                )}
              </div>
              
              {/* Categories List */}
              <div className="mt-4">
                <h3 className="font-medium mb-2">Catégories existantes:</h3>
                {categories.length === 0 ? (
                  <p className="text-gray-500">Aucune catégorie disponible</p>
                ) : (
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{category.name}</span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => startEditingCategory(category)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    {editingId ? (
                      <>
                        <Edit className="h-5 w-5 mr-2 text-blue-600" />
                        Modifier le produit
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-5 w-5 mr-2 text-blue-600" />
                        Ajouter un produit
                      </>
                    )}
                  </h2>
                </div>
                <div className="p-4">
                  {editingId ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
                        <input
                          type="text"
                          name="name"
                          value={editFormData?.name || ''}
                          onChange={handleEditChange}
                          required
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={editFormData?.description || ''}
                          onChange={handleEditChange}
                          required
                          className="w-full p-2 border rounded-md"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                        <input
                          type="number"
                          name="price"
                          step="0.01"
                          value={editFormData?.price || 0}
                          onChange={handleEditChange}
                          required
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                        <select
                          name="category_id"
                          value={editFormData?.category_id || 1}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded-md"
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image du produit</label>
                        {editFormData?.image_url && (
                          <div className="mb-2">
                            <img 
                              src={editFormData.image_url} 
                              alt="Current product" 
                              className="h-20 w-20 object-cover rounded-md border"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateProduct(editingId)}
                          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Enregistrer
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <AdminProductForm 
                      categories={categories} 
                      onSubmit={handleAddProduct} 
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* Product List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-blue-600" />
                    Liste des Produits ({products.length})
                  </h2>
                </div>
                
                {products.length === 0 ? (
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
                                  {product.image_url ? (
                                    <img 
                                      src={product.image_url} 
                                      alt={product.name} 
                                      className="h-10 w-10 rounded-md object-cover border border-gray-200"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                                      <ImageIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm font-semibold text-blue-600">
                                {convertToXAF(product.price)}
                              </div>
                              <div className="text-xs text-gray-400">
                                {product.price.toFixed(2)} €
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {categories.find(c => c.id === product.category_id)?.name || 'Aucune'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-medium">
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