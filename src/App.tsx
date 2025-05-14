import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Import layouts and pages
import AppLayout from "./components/Layout/AppLayout";
import FormsPage from "./pages/Form/FormsPage";
import CreateForm from "./pages/Form/CreateForm";
import FormResponses from "./pages/Form/FormResponses";
import FormResponseDetail from "./pages/Form/FormResponseDetail";

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Form routes */}
            <Route index element={<FormsPage />} />
            <Route path="forms" element={<FormsPage />} />
            <Route path="forms/create" element={<CreateForm />} />
            <Route path="forms/:formId/responses" element={<FormResponses />} />
            <Route path="forms/:formId/responses/:responseId" element={<FormResponseDetail />} />
            {/* Keep other routes */}
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
