
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Documentation from '@/pages/Documentation';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
