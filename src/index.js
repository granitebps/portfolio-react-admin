import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Layout } from "./utility/context/Layout";
import { store } from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import "./index.scss";
import "./@fake-db";
import AuthContextProvider from "./contexts/AuthContext";

const LazyApp = lazy(() => import("./App"));

// configureDatabase()
ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <LazyApp />
        </Layout>
      </Suspense>
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);
