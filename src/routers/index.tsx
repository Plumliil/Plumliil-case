import Home from "../views/home";
import Demo from "../views/demo";
import { ToTsType } from "../views/tools";
import { Waterfall } from "../views/examples";

const routes = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/demo",
    name: "demo",
    element: <Demo />,
  },
  {
    path: "/tools",
    children: [
      {
        path: "totstype",
        element: <ToTsType />,
      },
    ],
  },
  {
    path: "/examples",
    children: [
      {
        path: "Waterfall",
        element: <Waterfall />,
      },
    ],
  },
];

export default routes;
