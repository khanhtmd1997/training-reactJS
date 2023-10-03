import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Thế giới di động</h1>
      <img
        src="https://i.pinimg.com/564x/2b/7c/ec/2b7cece846ae62608220f9c68340cfdd.jpg"
        alt="Featured Image"
        style={{ width: "1300px", height: "500px" }}
      />
    </div>
  );
};

export default HomePage;
