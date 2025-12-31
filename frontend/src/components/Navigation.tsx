import { NavLink } from "react-router-dom";
import { LayoutDashboard, Info, Utensils, Car, ShoppingBag } from "lucide-react";
import GreenStepsLogo from "../assets/GreenSteps.png";
import { UserBadge } from "./UserBadge";

export const Navigation = () => {
  const mainLinks = [
    { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/about", label: "About", icon: Info },
    { to: "/app/food", label: "Food", icon: Utensils },
    { to: "/app/transport", label: "Transport", icon: Car },
    { to: "/app/shopping", label: "Shopping", icon: ShoppingBag },
    // { to: "/app/electricity", label: "Electricity" },
  ];

  return (
    <nav
      className="fixed max-[1200px]:bottom-0 max-[1200px]:left-0 max-[1200px]:right-0 max-[1200px]:h-auto max-[1200px]:w-full min-[1200px]:left-0 min-[1200px]:top-0 min-[1200px]:h-full min-[1200px]:w-64 max-[1200px]:p-2 min-[1200px]:p-6 flex max-[1200px]:flex-row max-[1200px]:items-center max-[1200px]:justify-around min-[1200px]:flex-col max-[1200px]:border-t max-[1200px]:border-gray-700"
      style={{ backgroundColor: "#101935" }}
    >
      <img src={GreenStepsLogo} alt="logo" className="max-[1200px]:hidden min-[1200px]:mb-8"></img>
      <div className="max-[1200px]:flex max-[1200px]:justify-around max-[1200px]:w-full min-[1200px]:flex-1">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.to} className="list-none max-[1200px]:mb-0 min-[1200px]:mb-4">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-1 max-[1200px]:text-[10px] max-[1200px]:px-3 max-[1200px]:py-2 min-[1200px]:text-2xl font-semibold bg-blue-900 min-[1200px]:p-2 rounded-lg transition-all duration-300 ease-in-out"
                    : "text-white flex max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-1 max-[1200px]:text-[10px] max-[1200px]:px-3 max-[1200px]:py-2 min-[1200px]:text-2xl min-[1200px]:p-2 hover:text-white-200 rounded-lg transition-all duration-300 ease-in-out"
                }
              >
                <Icon size={20} className="max-[1200px]:block min-[1200px]:hidden" />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </div>

      <div className="max-[1200px]:hidden min-[1200px]:mt-auto">
        <div className="bg-white h-[3px] rounded-full mx-1 mb-4"></div>

        {/* User Badge with integrated Settings */}
        <div className="min-[1200px]:mt-4">
          {/* <UserBadge /> */}
        </div>
      </div>
    </nav>
  );
};
