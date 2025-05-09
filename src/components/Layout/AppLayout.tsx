
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import RightSidebar from './RightSidebar';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-col flex-1">
        <MainHeader />
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <RightSidebar />
    </div>
  );
};

export default AppLayout;
