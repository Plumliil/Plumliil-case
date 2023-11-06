import Home from '../views/home'
import Demo from '../views/demo'
import {
  ColorConversion,
  MockData,
  TemplateGen,
  ToTsType,
  Encrypt,
} from '../views/tools'
import { MyHook, Waterfall, TextComparison, PdfView } from '../views/examples'

const routes = [
  {
    path: '/',
    name: 'home',
    element: <Home />,
  },
  {
    path: '/demo',
    name: 'demo',
    element: <Demo />,
  },
  {
    path: '/tools',
    children: [
      {
        path: 'totstype',
        element: <ToTsType />,
      },
      // {
      //   path: "encrypt",
      //   element: <Encrypt />,
      // },
      // {
      //   path: "colorConversion",
      //   element: <ColorConversion />,
      // },
      // {
      //   path: "mockdata",
      //   element: <MockData />,
      // },
      {
        path: 'templateGen',
        element: <TemplateGen />,
      },
    ],
  },
  {
    path: '/examples',
    children: [
      {
        path: 'Waterfall',
        element: <Waterfall />,
      },
      {
        path: 'myHook',
        element: <MyHook />,
      },
      {
        path: 'textComparison',
        element: <TextComparison />,
      },
      {
        path: 'pdfview',
        element: <PdfView />,
      },
    ],
  },
]

export default routes
