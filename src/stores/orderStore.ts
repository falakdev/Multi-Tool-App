import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  vendorId?: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getOrdersByVendor: (vendorId: string) => Order[];
  getOrdersByCustomer: (customerId: string) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set({ orders: [...get().orders, newOrder] });
      },
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        });
      },
      getOrdersByVendor: (vendorId) => {
        return get().orders.filter((order) => order.vendorId === vendorId);
      },
      getOrdersByCustomer: (customerId) => {
        return get().orders.filter((order) => order.customerId === customerId);
      },
    }),
    {
      name: "order-storage",
    }
  )
);

