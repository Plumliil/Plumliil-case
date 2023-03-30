import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import Layout from "../../layout";
import Home from "../../views/home";
import Login from "../../views/login";

const Routers = () => {
  const routes= useRoutes([
    {path:'/',element:<Navigate to={'/layout'} />},
    {
      path: "/layout",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "home", element: <Home /> },
      ],
    },
  ]);
  return routes;
};

export default Routers;
