// Constants used throughout the application

export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CLIENT: 'client',
} as const;

export const CONTACT_STATUS = {
  PENDING: 'pending',
  RESPONDED: 'responded',
  CLOSED: 'closed',
} as const;

export const PROPERTY_TYPES = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  CONDO: 'condo',
  TOWNHOUSE: 'townhouse',
} as const;

export const PROPERTY_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  SOLD: 'sold',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    UPDATE: '/api/users',
    DELETE: '/api/users',
  },
  CONTACTS: {
    LIST: '/api/contacts',
    CREATE: '/api/contacts',
    UPDATE: '/api/contacts',
    DELETE: '/api/contacts',
  },
  AGENTS: {
    LIST: '/api/agents',
    CREATE: '/api/agents',
    UPDATE: '/api/agents',
    DELETE: '/api/agents',
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;