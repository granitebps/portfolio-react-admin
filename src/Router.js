import React, { Suspense, lazy, useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { history } from "./history";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ToastContainer } from "react-toastify";
import baseAxios from "./utility/baseAxios";

// Route-based code splitting
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const Home = lazy(() => import("./views/pages/home/Home"));
const Profile = lazy(() => import("./views/pages/Profile"));
const Password = lazy(() => import("./views/pages/Password"));
const Skill = lazy(() => import("./views/pages/skill/Skill"));
const SkillModify = lazy(() => import("./views/pages/skill/SkillModify"));
const Technology = lazy(() => import("./views/pages/technology/Technology"));
const TechnologyModify = lazy(() =>
  import("./views/pages/technology/TechnologyModify")
);
const Service = lazy(() => import("./views/pages/service/Service"));
const ServiceModify = lazy(() => import("./views/pages/service/ServiceModify"));
const Experience = lazy(() => import("./views/pages/experience/Experience"));
const ExperienceModify = lazy(() =>
  import("./views/pages/experience/ExperienceModify")
);
const Portfolio = lazy(() => import("./views/pages/portfolio/Portfolio"));
const PortfolioModify = lazy(() =>
  import("./views/pages/portfolio/PortfolioModify")
);
const Education = lazy(() => import("./views/pages/education/Education"));
const EducationModify = lazy(() =>
  import("./views/pages/education/EducationModify")
);
const Blog = lazy(() => import("./views/pages/blog/Blog"));
const BlogModify = lazy(() => import("./views/pages/blog/BlogModify"));
const Gallery = lazy(() => import("./views/pages/gallery/Gallery"));
const GalleryModify = lazy(() => import("./views/pages/gallery/GalleryModify"));
const Message = lazy(() => import("./views/pages/message/Message"));
const Error404 = lazy(() => import("./views/misc/404"));

// Set Layout and Component Using App Route
const AppRoute = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => {
  const authToken = Cookies.get("token");
  useEffect(() => {
    const getAuth = async () => {
      try {
        await baseAxios.get("auth/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } catch (error) {
        const cookiesConfig =
          process.env.NODE_ENV === "development"
            ? {}
            : { domain: "granitebps.com" };
        Cookies.remove("token", cookiesConfig);
      }
    };
    getAuth();
  });

  if (history.location.pathname !== "/" && !authToken) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};

const AppRouter = () => {
  return (
    // Set the directory path if you are deploying in sub-folder
    <Router history={history}>
      <ToastContainer />
      <Switch>
        <AppRoute exact path="/" component={login} fullLayout />
        <AppRoute exact path="/dashboard" component={Home} />
        <AppRoute exact path="/profile" component={Profile} />
        <AppRoute exact path="/password" component={Password} />
        <AppRoute exact path="/skill" component={Skill} />
        <AppRoute exact path="/skill/modify" component={SkillModify} />
        <AppRoute exact path="/technology" component={Technology} />
        <AppRoute
          exact
          path="/technology/modify"
          component={TechnologyModify}
        />
        <AppRoute exact path="/service" component={Service} />
        <AppRoute exact path="/service/modify" component={ServiceModify} />
        <AppRoute exact path="/experience" component={Experience} />
        <AppRoute
          exact
          path="/experience/modify"
          component={ExperienceModify}
        />
        <AppRoute exact path="/education" component={Education} />
        <AppRoute exact path="/education/modify" component={EducationModify} />
        <AppRoute exact path="/portfolio" component={Portfolio} />
        <AppRoute exact path="/portfolio/modify" component={PortfolioModify} />
        <AppRoute exact path="/blog" component={Blog} />
        <AppRoute exact path="/blog/modify" component={BlogModify} />
        <AppRoute exact path="/gallery" component={Gallery} />
        <AppRoute exact path="/gallery/modify" component={GalleryModify} />
        <AppRoute exact path="/message" component={Message} />
        <AppRoute component={Error404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
