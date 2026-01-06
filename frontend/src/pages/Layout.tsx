import { Outlet, NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { UserBadge } from "../components/UserBadge";

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <header className="fixed max-[1200px]:bottom-0 min-[1200px]:left-0 min-[1200px]:top-0 z-10">
        <Navigation />
      </header>
      <main className="ml-64 max-[1200px]:ml-0 max-[1200px]:pb-18 flex-1 overflow-auto">
        <div className="flex justify-between items-center mr-2 mt-2 ml-2">
          <div className="max-[1200px]:block min-[1200px]:hidden">
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg transition-all duration-300"
                  : "flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-blue-600 rounded-xl transition-all duration-300"
              }
            >
              <Settings size={20} />
            </NavLink>
          </div>
          <div className="flex-1"></div>
          <UserBadge />
        </div>
        <div className="min-h-screen">
          <Outlet />
        </div>
        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
};
