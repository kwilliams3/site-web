/*
  # Initial Schema Setup for Ste SERDIS SARL

  1. New Tables
    - `categories`
      - `id` (primary key)
      - `name` (category name)
      - `created_at` (timestamp)
    - `products`
      - `id` (primary key)
      - `name` (product name)
      - `description` (product description)
      - `price` (product price)
      - `image_url` (URL to product image)
      - `category_id` (foreign key to categories)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Anyone can read categories" 
  ON categories
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin can insert categories" 
  ON categories
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update categories" 
  ON categories
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete categories" 
  ON categories
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create policies for products
CREATE POLICY "Anyone can read products" 
  ON products
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin can insert products" 
  ON products
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update products" 
  ON products
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete products" 
  ON products
  FOR DELETE 
  TO authenticated
  USING (true);

-- Insert initial categories
INSERT INTO categories (name) VALUES
  ('Fruits & Légumes'),
  ('Boulangerie'),
  ('Produits Laitiers'),
  ('Boissons'),
  ('Épicerie');