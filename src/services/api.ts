import type { Product, ProductsResponse, Category, User } from '../types'

const BASE_URL = 'https://dummyjson.com'

export const api = {
  async getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
    return res.json()
  },

  async getProductById(id: number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    return res.json()
  },

  async searchProducts(query: string): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products/search?q=${query}`)
    return res.json()
  },

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/products/categories`)
    return res.json()
  },

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products/category/${category}`)
    return res.json()
  },

  async login(username: string, password: string): Promise<User> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 30 })
    })
    return res.json()
  }
}