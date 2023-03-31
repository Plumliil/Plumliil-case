// import { useState } from "react";
// import { HashRouter, Routes } from "react-router-dom";
// import "./App.less";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <HashRouter>
//       <div className="App">
//         <Routes></Routes>
//       </div>
//     </HashRouter>
//   );
// }

// export default App;

import { useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Outlet,
  Navigator,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.less";
import GetRouters from "./config/routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <HashRouter>
    <div>
      <BrowserRouter>
        <GetRouters />
        {/* </HashRouter> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
