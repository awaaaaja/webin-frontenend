
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderState {
  domain: string;
  extension: string;
  template: any;
  addons: string[];
  orderId?: number;
  userDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
}

interface OrderContextType {
  order: OrderState;
  updateOrder: (updates: Partial<OrderState>) => void;
  addAddon: (addon: string) => void;
  removeAddon: (addon: string) => void;
  clearOrder: () => void;
}

const initialOrder: OrderState = {
  domain: '',
  extension: '.com',
  template: null,
  addons: [],
  orderId: undefined,
  userDetails: {
    fullName: '',
    email: '',
    phone: '',
  },
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderState>(initialOrder);

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder(prev => ({ ...prev, ...updates }));
  };

  const addAddon = (addon: string) => {
    setOrder(prev => ({
      ...prev,
      addons: [...prev.addons, addon]
    }));
  };

  const removeAddon = (addon: string) => {
    setOrder(prev => ({
      ...prev,
      addons: prev.addons.filter(a => a !== addon)
    }));
  };

  const clearOrder = () => {
    setOrder(initialOrder);
  };

  return (
    <OrderContext.Provider value={{
      order,
      updateOrder,
      addAddon,
      removeAddon,
      clearOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
