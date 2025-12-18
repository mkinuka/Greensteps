import { NavLink } from "react-router-dom";
import GreenStepsLogo from "../assets/GreenSteps.png";
import { UserBadge } from "./UserBadge";

export const Navigation = () => {
  const mainLinks = [
    { to: "/app/dashboard", label: "Dashboard" },
    { to: "/app/food", label: "Food" },
    { to: "/app/transport", label: "Transport" },
    { to: "/app/shopping", label: "Shopping" },
    { to: "/app/electricity", label: "Electricity" },
  ];

  const bottomLinks = [
    { to: "/app/about", label: "About" },
    { to: "/app/settings", label: "Settings" },
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
                  ? "text-white text-2xl font-semibold bg-blue-900 p-2 rounded-lg transition-all duration-300 ease-in-out"
                  : "text-white text-2xl p-2 hover:text-white-200 hover:bg-blue-600 rounded-lg transition-all duration-300 ease-in-out"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </div>

      <div className="mt-auto">
        <div className="bg-white h-[3px] rounded-full mx-1  mb-4"></div>
        {bottomLinks.map((link) => (
          <li key={link.to} className="list-none mb-2">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold underline rounded-lg transition-all duration-300 ease-in-out"
                  : "text-white hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        <UserBadge></UserBadge>
      </div>
    </nav>
  );
};
