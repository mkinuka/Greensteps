import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { DateProvider } from "./contexts/DateContext";

function App() {
  return (
    <DateProvider>
      <RouterProvider router={router}></RouterProvider>
    </DateProvider>
  );
}

export default App;
