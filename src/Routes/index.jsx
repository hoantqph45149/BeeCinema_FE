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
  AuthProtected,
  CheckRouteAuth,
  CheckRouteAdmin,
} from "./AuthProtected";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutesNonAuthLayout.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <CheckRouteAuth>
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                </CheckRouteAuth>
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
              element={<LayoutClient>{route.component}</LayoutClient>}
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
                <CheckRouteAdmin>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </CheckRouteAdmin>
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
                <AuthProtected>
                  <LayoutClient>{route.component}</LayoutClient>
                </AuthProtected>
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
                <AuthProtected>
                  <LayoutClient>{route.component}</LayoutClient>
                </AuthProtected>
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
