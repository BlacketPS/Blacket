import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

await import("./axiosConfig");
await import("./Console");

createRoot(document.getElementById("app")).render(<BrowserRouter><App /></BrowserRouter>);
