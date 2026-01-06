import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { router } from "./Router";
import { DateProvider } from "./contexts/DateContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <DateProvider>
        <RouterProvider router={router}></RouterProvider>
      </DateProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
