import { createRoot } from "react-dom/client";
import App from "./App";

await import("./axiosConfig");
await import("./Console");

createRoot(document.getElementById("app")).render(<App />);