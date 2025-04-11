
import { Routes, Route } from 'react-router-dom';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import Documentation from '@/pages/Documentation';
import NotFound from '@/pages/NotFound';
import FormList from '@/pages/FormList';
import FormDetail from '@/pages/FormDetail';
import FormResponses from '@/pages/FormResponses';
import FormResponseDetail from '@/pages/FormResponseDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes - accessible only when not logged in */}
      <Route element={<ProtectedRoute authenticationRequired={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      {/* Protected routes - require authentication */}
      <Route element={<ProtectedRoute authenticationRequired={true} />}>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/forms" element={<FormList />} />
        <Route path="/forms/:formId" element={<FormDetail />} />
        <Route path="/forms/:formId/responses" element={<FormResponses />} />
        <Route path="/forms/:formId/responses/:responseId" element={<FormResponseDetail />} />
        <Route path="/docs" element={<Documentation />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
