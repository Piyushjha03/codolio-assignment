import { Outlet, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import Header from "./components/custom/header";
import Navbar from "./components/custom/navbar";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
