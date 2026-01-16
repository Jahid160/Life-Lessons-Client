import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import router from "./Router/Route.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./Contexts/ThemeContext.jsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider> {/* ✅ ADD THIS */}
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
