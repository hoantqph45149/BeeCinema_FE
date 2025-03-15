import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./Contexts/auth/AuthProvider";
import BranchesProvider from "./Contexts/branche/BranchesProvider";
import rootReducer from "./slices";

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
      <Provider store={store}>
        <AuthContextProvider>
          <BranchesProvider>
            <App />
          </BranchesProvider>
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);
