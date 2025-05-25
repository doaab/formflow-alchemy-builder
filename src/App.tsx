import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { TranslationProvider } from "./context/TranslationContext";
import AppRoutes from "./routes/AppRoutes";

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
              <AppRoutes />
              <Toaster position="top-right" />
            </AuthProvider>
          </Router>
        </TranslationProvider>
      </QueryClientProvider>
  );
}

export default App;