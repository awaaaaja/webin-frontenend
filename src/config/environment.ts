
// Environment configuration for Laravel API integration
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // Laravel specific endpoints
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    
    // Order endpoints
    ORDERS: '/orders',
    ORDER_STATS: '/orders/stats',
    
    // Domain endpoints
    DOMAIN_CHECK: '/domains/check',
    
    // Template endpoints
    TEMPLATES: '/templates',
    TEMPLATES_BY_CATEGORY: '/templates/category',
    POPULAR_TEMPLATES: '/templates/popular',
    
    // Addon endpoints
    ADDONS: '/addons',
    
    // Payment endpoints
    PAYMENTS: '/payments',
    PAYMENT_CALLBACK: '/payments/callback',
  },
  
  // Default settings
  DEFAULT_TIMEOUT: 10000,
  
  // Laravel sanctum configuration
  SANCTUM_ENDPOINT: '/sanctum/csrf-cookie',
  
  // Development settings
  IS_DEVELOPMENT: import.meta.env.DEV,
};

export default config;
