import React, { useEffect } from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import BranchesProvider from "./Contexts/branche/BranchesProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BranchesProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
          }}
        >
          <App />
        </BrowserRouter>
      </BranchesProvider>
    </Provider>
  </QueryClientProvider>
);
