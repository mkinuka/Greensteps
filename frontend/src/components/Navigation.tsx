import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import GreenStepsLogo from "../assets/GreenSteps.png";
import { UserBadge } from "./UserBadge";

export const Navigation = () => {
  const mainLinks = [
    { to: "/app/dashboard", label: "Dashboard" },
    { to: "/app/about", label: "About" },
    { to: "/app/food", label: "Food" },
    { to: "/app/transport", label: "Transport" },
    { to: "/app/shopping", label: "Shopping" },
    { to: "/app/electricity", label: "Electricity" },
  ];

  return (
    <nav
      className="fixed left-0 top-0 h-full w-64 p-6 flex flex-col"
      style={{ backgroundColor: "#101935" }}
    >
      <img src={GreenStepsLogo} alt="logo" className="mb-8"></img>
      <div className="flex-1">
        {mainLinks.map((link) => (
          <li key={link.to} className="list-none mb-4">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white text-2xl font-semibold bg-blue-900 p-2 rounded-lg transition-all duration-300 ease-in-out slide-bg-animation slide-bg-blue-900"
                  : "text-white text-2xl p-2 hover:text-white-200 rounded-lg transition-all duration-300 ease-in-out slide-bg-animation slide-bg-blue-600"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </div>

      <div className="mt-auto">
        <div className="bg-white h-[3px] rounded-full mx-1  mb-4"></div>

        {/* User Badge and Settings */}
        <div className="flex items-center gap-3 mt-4">
          <UserBadge />
          <button className="p-2 rounded-lg bg-gray-700 transition-colors duration-200 slide-bg-animation slide-bg-gray-700 hover:text-white">
            <Settings size={34} color="white" />
          </button>
        </div>
      </div>
    </nav>
  );
};
