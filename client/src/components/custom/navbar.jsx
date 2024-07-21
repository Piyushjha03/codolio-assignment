import {
  Code,
  History,
  House,
  LineChart,
  ScanQrCode,
  Signature,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import NewTransaction from "./newTransaction";

const Navbar = () => {
  return (
    <>
      <nav className="fixed bottom-0 left-auto w-full h-32 flex justify-center items-end sm:items-center">
        <div className="outine px-3 py-2 h-20 w-full max-w-[450px] sm:w-[450px]  bg-black dark:bg-neutral-600 dark:bg-opacity-40 bg-opacity-80 rounded-xl overflow-hidden">
          <div className="inner w-full h-full flex gap-2 sm:gap-6">
            <div className="icon w-16 h-full bg-black rounded-xl">
              <img src="/wallet2.gif" alt="" className="h-full" />
            </div>
            <div className="option bg-neutral-700 flex-1 rounded-xl px-4 flex gap-2 sm:gap-8 items-center justify-between">
              <NavLink to="/" className="">
                <div className="icon w-8 h-8 flex relative justify-center items-center rounded-full">
                  <House className="text-neutral-200" />
                  <span></span>
                </div>
              </NavLink>
              <NavLink to="/charts" className="">
                <div className="icon w-8 h-8 flex relative justify-center items-center rounded-full">
                  <LineChart className="text-neutral-200" />
                  <span></span>
                </div>
              </NavLink>
              <NavLink to="/" className="">
                <div className="icon w-8 h-8 bg-green-500 flex justify-center items-center rounded-full">
                  <NewTransaction />
                </div>
              </NavLink>
              <NavLink to="/transaction" className="">
                <div className="icon w-8 h-8 flex relative justify-center items-center rounded-full">
                  <Wallet className="text-neutral-200" />
                  <span></span>
                </div>
              </NavLink>
              <NavLink to="/code" className="">
                <div className="icon w-8 h-8 flex  relative justify-center items-center rounded-full">
                  <Code className="text-neutral-200" />
                  <span></span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
