import { useAuthStore } from "../stores/authStore";
import { StudentDashboard } from "./StudentDashboard";
import { Admin } from "./Admin";
import { VendorDashboard } from "./VendorDashboard";

export function Dashboard() {
  const { user } = useAuthStore();

  // Route to role-specific dashboard
  if (user?.role === "student") {
    return <StudentDashboard />;
  }
  
  if (user?.role === "admin") {
    return <Admin />;
  }
  
  if (user?.role === "vendor") {
    return <VendorDashboard />;
  }

  // Fallback for unknown roles
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome, {user?.name}. Please contact support to set up your account.
        </p>
      </div>
    </div>
  );
}
