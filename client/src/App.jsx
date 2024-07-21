import { Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import Header from "./components/custom/header";
import Navbar from "./components/custom/navbar";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <div className="w-full h-56" />
      <Navbar />
    </>
  );
}

export default App;
