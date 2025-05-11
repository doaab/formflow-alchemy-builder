
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  authenticationRequired?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ authenticationRequired = true, redirectTo = "/login" }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, token } = useAuth();
  const location = useLocation();
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (authenticationRequired && (!isAuthenticated)) {
    return (
      <Navigate 
        to={redirectTo || "/login"} 
        state={{ from: location, message: "Please log in to access this page" }} 
        replace 
      />
    );
  }

  // If authentication is not required and user is authenticated (e.g. login page), redirect to forms
  if (!authenticationRequired && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the protected component
  return <Outlet />;
}
