import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "../types/auth";

// Mock user database (in production, this would be an API call)
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "student@example.com",
    password: "student123",
    name: "Student User",
    role: "student",
  },
  {
    id: "3",
    email: "vendor@example.com",
    password: "vendor123",
    name: "Vendor User",
    role: "vendor",
  },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const { password: _, ...userWithoutPassword } = user;
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
        });
      },
      signup: async (email: string, password: string, name: string, role: UserRole) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if user already exists
        if (mockUsers.some((u) => u.email === email)) {
          throw new Error("User with this email already exists");
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role,
        };

        mockUsers.push({ ...newUser, password });

        set({
          user: newUser,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
