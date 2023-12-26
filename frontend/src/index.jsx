import { createRoot } from "react-dom/client";
import App from "./App";
import("./Console");

createRoot(document.getElementById("app")).render(<App />);