import Home from "../views/home";
import Demo from "../views/demo";
import { MockData, ToTsType } from "../views/tools";
import { MyHook, Waterfall } from "../views/examples";

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
      {
        path: "mockdata",
        element: <MockData />,
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
      {
        path: "myHook",
        element: <MyHook />,
      },
    ],
  },
];

export default routes;
