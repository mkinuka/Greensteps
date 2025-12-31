import { Outlet } from "react-router-dom";
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
        <div className="flex justify-end mr-2 mt-2">
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
