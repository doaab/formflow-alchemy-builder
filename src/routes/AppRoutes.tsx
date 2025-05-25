
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import FormsPage from '@/pages/Form/FormsPage';
import UserDetail from '@/pages/UserDetail';
import FormList from '@/pages/Form/FormList';
import FormDetail from '@/pages/Form/FormDetail';
import FormResponses from '@/pages/Form/FormResponses';
import FormResponseDetail from '@/pages/Form/FormResponseDetail';
import { AuthProvider } from '@/context/AuthContext';
import SurveyForm from '@/pages/Form/SurveyForm';
import { FormBuilderProvider } from '@/context/FormBuilderContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import FormEditorLayout from '@/components/Layout/FormEditorLayout';
import AppLayout from '@/components/Layout/AppLayout';
import CreateForm from "@/pages/Form/CreateForm";
import Landing from "@/pages/Landing";

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
      <Route path="/landing" element={<Landing />} />

      {/* Protected routes with AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/forms" element={<FormList />} />
        <Route path="/forms/:formId" element={<FormDetail />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/help" element={<div>Help Page</div>} />
      </Route>
      
      {/* Form editor routes with FormEditorLayout */}
      <Route element={<FormEditorLayout />}>
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="forms/create" element={<CreateForm />} />
        <Route path="/forms/:formId/edit" element={
          <FormBuilderProvider>
            <FormBuilder />
          </FormBuilderProvider>
        } />
        <Route path="/forms/:formId/responses" element={<FormResponses />} />
        <Route path="/forms/:formId/responses/:responseId" element={<FormResponseDetail />} />
        <Route path="/forms/:formId/preview" element={
          <FormBuilderProvider>
            <SurveyForm />
          </FormBuilderProvider>
        } />
      </Route>
      
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
