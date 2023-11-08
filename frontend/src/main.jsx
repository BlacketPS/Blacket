import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { config } from "@stores/config";
import ErrorBoundary from "./ErrorBoundary";
import pages from "./pages";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("configuration");

    useEffect(() => config !== null && setLoaded(true), []);

    return <ErrorBoundary fallback="/">
        {!loaded && <pages.Loading message={message} />}
        {loaded && (<>
            {typeof config == "string" ? (<pages.Errors code={403} reason={config} />) : config === 1 ? (<pages.Errors code={502} />) : (
                <Routes>
                    <Route path="*" element={<pages.Errors code={404} />} />
                    <Route path="/" element={<pages.Home />} />
                    <Route path="/login" element={<pages.Authentication type="Login" />} />
                    <Route path="/register" element={<pages.Authentication type="Register" />} />
                </Routes>
            )}
        </>)}
    </ErrorBoundary >
}

createRoot(document.getElementById("app")).render(<BrowserRouter basename="/"><App /></BrowserRouter>);