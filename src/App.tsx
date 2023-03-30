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
import Routers from "./config/router";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <HashRouter>
    <div>
      <BrowserRouter>
        <Routers />
        {/* </HashRouter> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
