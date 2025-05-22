import React, { useState } from 'react';
import { ProductFormData, Category } from '../types/database.types';

interface AdminProductFormProps {
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ categories, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category_id: categories[0]?.id || 1,
    image_file: null
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : name === 'category_id' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image_file: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category_id: categories[0]?.id || 1,
      image_file: null
    });
    setPreviewImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
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
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
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
        {previewImage && (
          <div className="mb-2">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="h-20 w-20 object-cover rounded-md border"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Ajouter le produit
      </button>
    </form>
  );
};

export default AdminProductForm;