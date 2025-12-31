import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../ui/button";
import { LogOut, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart as CartComponent } from "../cart/ShoppingCart";
import { useCartStore } from "../../stores/cartStore";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const avatarUrl = `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <img src={avatarUrl} alt="avatar" className="h-10 w-10 rounded-full object-cover border border-border" />
            <h1 className="text-lg font-semibold">Welcome back, {user?.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            {user?.role !== "admin" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <CartComponent isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

