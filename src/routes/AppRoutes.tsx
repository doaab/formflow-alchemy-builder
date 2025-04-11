
import { Routes, Route } from 'react-router-dom';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import Documentation from '@/pages/Documentation';
import NotFound from '@/pages/NotFound';
import FormList from '@/pages/FormList';
import FormDetail from '@/pages/FormDetail';
import FormResponses from '@/pages/FormResponses';
import FormResponseDetail from '@/pages/FormResponseDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormBuilder />} />
      <Route path="/forms" element={<FormList />} />
      <Route path="/forms/:formId" element={<FormDetail />} />
      <Route path="/forms/:formId/responses" element={<FormResponses />} />
      <Route path="/forms/:formId/responses/:responseId" element={<FormResponseDetail />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
