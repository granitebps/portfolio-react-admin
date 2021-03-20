import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AuthContextProvider from "./contexts/AuthContext";
import { store } from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import { Layout } from "./utility/context/Layout";

const LazyApp = lazy(() => import("./App"));

it("renders without crashing", () => {
  const div = document.createElement("div");
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
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
