import React from 'react';
import { useForm } from 'react-hook-form';
import type { Category } from '../types/database.types';

interface AdminProductFormProps {
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ categories, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>();

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un Produit</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom du Produit
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('name', { required: 'Le nom est requis' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('description', { required: 'La description est requise' })}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Prix (€)
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('price', { 
            required: 'Le prix est requis',
            min: {
              value: 0.01,
              message: 'Le prix doit être supérieur à 0'
            }
          })}
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
          URL de l'Image
        </label>
        <input
          id="image_url"
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.image_url ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('image_url', { required: 'L\'URL de l\'image est requise' })}
        />
        {errors.image_url && (
          <p className="mt-1 text-sm text-red-600">{errors.image_url.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie
        </label>
        <select
          id="category_id"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.category_id ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('category_id', { 
            required: 'La catégorie est requise',
            valueAsNumber: true
          })}
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Ajouter le Produit
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;