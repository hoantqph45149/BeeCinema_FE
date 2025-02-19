import React, { useEffect } from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import BranchesProvider from "./Contexts/branche/BranchesProvider";
import { AuthContextProvider } from "./Contexts/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // Gọi lại 1 lần nếu request thất bại
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthContextProvider>
        <BranchesProvider>
          <BrowserRouter
            future={{
              v7_fetcherPersist: true,
              v7_normalizeFormMethod: true,
              v7_partialHydration: true,
              v7_relativeSplatPath: true,
              v7_skipActionErrorRevalidation: true,
              v7_startTransition: true,
            }}
          >
            <App />
          </BrowserRouter>
        </BranchesProvider>
      </AuthContextProvider>
    </Provider>
  </QueryClientProvider>
);
