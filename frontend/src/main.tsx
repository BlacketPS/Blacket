import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { config } from "@stores/config";
import pages from "./pages";

if (config === null) createRoot(document.getElementById("app")).render(<pages.Error502 />);
else if (typeof config == "string") createRoot(document.getElementById("app")!).render(<pages.Error403 reason={config} />);
else createRoot(document.getElementById("app")).render(<RouterProvider router={
	createBrowserRouter([
		{ path: "*", element: <pages.Error404 /> },
		{ path: "/", element: <pages.Home /> },
		{ path: "/login", element: <pages.Authentication type="Login" /> },
		{ path: "/register", element: <pages.Authentication type="Register" /> }
	])
} />);