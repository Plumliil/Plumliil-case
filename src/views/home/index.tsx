import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <img
        style={{
          width: "15%",
          marginTop: 100
        }}
        src="http://180.76.195.252:3366/image/logo.png"
        alt=""
      />
      {/* <h1>PLUMLIIL</h1> */}
    </div>
  );
};

export default Home;
