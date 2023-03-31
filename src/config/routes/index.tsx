import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import Index from "../../pages";
import Layout from "../../layout";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Comfort from "../../pages/comfort";
import Case from "../../pages/case";

const Routers = () => {
  const routes = useRoutes([
    { path: "/", element: <Index /> },
    { path: "/comfort", element: <Navigate to={"/layout/comfort"} /> },
    { path: "/case", element: <Navigate to={"/layout/case"} /> },
    {
      path: "/layout",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "home", element: <Home /> },
        { path: "comfort", element: <Comfort /> },
        { path: "case", element: <Case /> },
      ],
    },
  ]);
  return routes;
};

export default Routers;
