import { createRoot } from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
import App from "./App";

createRoot(document.getElementById("app")).render(<ErrorBoundary fallback="/"><App /></ErrorBoundary>);