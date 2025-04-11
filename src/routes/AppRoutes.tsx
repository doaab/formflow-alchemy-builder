
import { Routes, Route } from 'react-router-dom';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import Documentation from '@/pages/Documentation';
import NotFound from '@/pages/NotFound';
import FormList from '@/pages/FormList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormBuilder />} />
      <Route path="/forms" element={<FormList />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
