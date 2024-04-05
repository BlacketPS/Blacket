/**
 * @file The main entry point for the frontend.
 * 
 * @license GPL-3.0
 * @version 0.0.0
*/

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

await import("./fetch");
await import("./console");

// Render the router provider and the App component within.
createRoot(document.getElementById("app")).render(<BrowserRouter><App /></BrowserRouter>);