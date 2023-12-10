import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { config } from "@stores/config";
import pages from "@pages";

export default function App() {    
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("configuration");

    useEffect(() => config !== null && setLoaded(true), []);

    return !loaded ? <pages.Loading message={message} /> : <>
        {typeof config == "string" ? (<pages.Errors code={403} reason={config} />) : config === 1 ? (<pages.Errors code={502} />) : (
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<pages.Errors code={404} />} />
                    <Route path="/" element={<pages.Home />} />
                    <Route path="/login" element={<pages.Authentication type="Login" />} />
                    <Route path="/register" element={<pages.Authentication type="Register" />} />
                </Routes>
            </BrowserRouter>
        )}
    </>
}