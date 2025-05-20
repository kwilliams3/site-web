export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          image_url: string
          category_id: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          image_url: string
          category_id: number
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          image_url?: string
          category_id?: number
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Category = Database['public']['Tables']['categories']['Row']