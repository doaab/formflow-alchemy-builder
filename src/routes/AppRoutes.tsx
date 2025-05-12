
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import UserDetail from '@/pages/UserDetail';
import FormList from '@/pages/Form/FormList';
import FormDetail from '@/pages/Form/FormDetail';
import FormResponses from '@/pages/Form/FormResponses';
import FormResponseDetail from '@/pages/Form/FormResponseDetail';
import SurveyForm from '@/pages/Form/SurveyForm';
import { FormBuilderProvider } from '@/context/FormBuilderContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import FormEditorLayout from '@/components/Layout/FormEditorLayout';

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/forms" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/forms" replace />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/users/:userId" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
      
      {/* Form routes */}
      <Route path="/forms" element={<ProtectedRoute><FormList /></ProtectedRoute>} />
      
      <Route path="/forms/:formId" element={
        <ProtectedRoute>
          <FormDetail />
        </ProtectedRoute>
      } />
      
      {/* Form editor routes with new layout */}
      <Route element={
        <ProtectedRoute>
          <FormEditorLayout />
        </ProtectedRoute>
      }>
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
