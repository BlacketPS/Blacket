import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import pages from "./pages";

const router = createBrowserRouter([
  { path: "*", element: <pages.Error404 /> },
  { path: "/", element: <pages.Home /> },
  { path: "/login", element: <pages.Authentication type="Login" /> },
  { path: "/register", element: <pages.Authentication type="Register" /> },
]);

axios.interceptors.request.use((config : any) => {
  if (config.url.startsWith("/api")) config.url = `http://localhost:3000${config.url}`;
  return config;
});

createRoot(document.getElementById("app")!).render(<RouterProvider router={router} />);  