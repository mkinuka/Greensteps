import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { UserBadge } from "../components/UserBadge";

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <header className="fixed left-0 top-0 z-10">
        <Navigation />
      </header>
      <main className="ml-64 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 mt-2 mr-8">
        {/* <UserBadge></UserBadge> */}
        </div>
        <Outlet />
        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
};
