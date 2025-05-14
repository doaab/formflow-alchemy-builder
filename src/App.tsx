import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { TranslationProvider } from "./context/TranslationContext";

// Import layouts and pages
import AppLayout from "./components/Layout/AppLayout";
import FormsPage from "./pages/Form/FormsPage";
import CreateForm from "./pages/Form/CreateForm";
import FormResponses from "./pages/Form/FormResponses";
import FormResponseDetail from "./pages/Form/FormResponseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

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
      <TranslationProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<AppLayout />}>
                {/* Form routes */}
                <Route index element={<FormsPage />} />
                <Route path="forms" element={<FormsPage />} />
                <Route path="forms/create" element={<CreateForm />} />
                <Route path="forms/:formId/responses" element={<FormResponses />} />
                <Route path="forms/:formId/responses/:responseId" element={<FormResponseDetail />} />
                {/* Keep other routes */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
          </AuthProvider>
        </Router>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
