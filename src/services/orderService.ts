
import { apiService } from './api';

export interface OrderData {
  id?: number;
  domain: string;
  extension: string;
  template_name: string;
  addons: string[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  payment_method: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface DomainCheckResult {
  domain: string;
  extension: string;
  available: boolean;
  price: number;
}

export class OrderService {
  // Check domain availability
  static async checkDomain(domain: string, extension: string): Promise<DomainCheckResult> {
    return apiService.post<DomainCheckResult>('/domains/check', {
      domain,
      extension
    });
  }

  // Create new order
  static async createOrder(orderData: Omit<OrderData, 'id' | 'created_at' | 'updated_at'>): Promise<OrderData> {
    return apiService.post<OrderData>('/orders', orderData);
  }

  // Get order by ID
  static async getOrder(orderId: number): Promise<OrderData> {
    return apiService.get<OrderData>(`/orders/${orderId}`);
  }

  // Get all orders (for admin)
  static async getAllOrders(): Promise<OrderData[]> {
    return apiService.get<OrderData[]>('/orders');
  }

  // Update order status
  static async updateOrderStatus(orderId: number, status: OrderData['status']): Promise<OrderData> {
    return apiService.put<OrderData>(`/orders/${orderId}/status`, { status });
  }

  // Get order statistics
  static async getOrderStats(): Promise<{
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    completed_orders: number;
  }> {
    return apiService.get('/orders/stats');
  }
}
