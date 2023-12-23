import { createRoot } from "react-dom/client";
import App from "./App";

import("./Console");

import axios from "axios";

window.axios = axios;

createRoot(document.getElementById("app")).render(<App />);