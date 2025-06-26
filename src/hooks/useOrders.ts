
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderService, OrderData } from '@/services/orderService';
import { useToast } from '@/hooks/use-toast';

// Hook untuk mendapatkan semua orders
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: OrderService.getAllOrders,
  });
};

// Hook untuk mendapatkan order berdasarkan ID
export const useOrder = (orderId: number) => {
  return useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => OrderService.getOrder(orderId),
    enabled: !!orderId,
  });
};

// Hook untuk membuat order baru
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: OrderService.createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Created",
        description: `Order #${data.id} has been created successfully`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating order:', error);
    },
  });
};

// Hook untuk update status order
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: OrderData['status'] }) =>
      OrderService.updateOrderStatus(orderId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', data.id] });
      toast({
        title: "Status Updated",
        description: `Order status updated to ${data.status}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
      console.error('Error updating order status:', error);
    },
  });
};

// Hook untuk cek domain
export const useCheckDomain = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ domain, extension }: { domain: string; extension: string }) =>
      OrderService.checkDomain(domain, extension),
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to check domain availability.",
        variant: "destructive",
      });
      console.error('Error checking domain:', error);
    },
  });
};
