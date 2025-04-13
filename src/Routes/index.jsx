import React from "react";
import { Routes, Route } from "react-router-dom";

//Layouts
import LayoutClient from "../Layouts/client";
import NonAuthLayout from "../Layouts/admin/NonAuthLayout";
import VerticalLayout from "../Layouts/admin/index";

//routes
import {
  authProtectedRoutes,
  publicRoutesNonAuthLayout,
  publicRoutes,
  clientRoutes,
  emailVerifiedRoutes,
} from "./AllRoutes";
import {
  RequireAuth,
  RejectIfAuthenticated,
  RequireAdmin,
  RequireVerifiedEmail,
  RequirePermission,
} from "./AuthProtected";
import { ProtectedRoute } from "./AuthProtected";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutesNonAuthLayout.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <RejectIfAuthenticated>
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                </RejectIfAuthenticated>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
        {/* Đường dẫn client không cần login */}
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <ProtectedRoute>
                  <LayoutClient>{route.component}</LayoutClient>
                </ProtectedRoute>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        {/* Đường dẫn admin cần login và phải lầ admin */}
        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <ProtectedRoute>
                  <VerticalLayout>
                    <RequireAdmin>
                      <RequirePermission permission={route.permission}>
                        {route.component}
                      </RequirePermission>
                    </RequireAdmin>
                  </VerticalLayout>
                </ProtectedRoute>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        {/* Đường dẫn client cần login */}
        <Route>
          {clientRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <RequireAuth>
                  <ProtectedRoute>
                    <LayoutClient>{route.component}</LayoutClient>
                  </ProtectedRoute>
                </RequireAuth>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {emailVerifiedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <RequireVerifiedEmail>
                  <RequireAuth>
                    <ProtectedRoute>
                      <LayoutClient>{route.component}</LayoutClient>
                    </ProtectedRoute>
                  </RequireAuth>
                </RequireVerifiedEmail>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
