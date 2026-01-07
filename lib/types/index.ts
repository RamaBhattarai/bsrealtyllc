// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  licenseNumber?: string;
  brokerage?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  userId: string;
  licenseNumber: string;
  brokerage: string;
  specialties: string[];
  isVerified: boolean;
  rating: number;
  totalDeals: number;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  images: string[];
  agentId: string;
  status: 'active' | 'pending' | 'sold';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}