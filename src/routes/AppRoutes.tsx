
import { Routes, Route } from 'react-router-dom';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import Documentation from '@/pages/Documentation';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormBuilder />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
