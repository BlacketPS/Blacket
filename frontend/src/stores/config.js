import axios from "axios";

const config = await axios.get("/api/config").then(res => res.data).catch(err => {
    if (err?.response?.status === 403) return err.response.data.error
    else return 1;
});

export { config };

// todo for all other stores:

/*import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ConfigContext = createContext(0);

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/config").then((res) => setConfig(res.data)).catch((err) => {
            if (err?.response?.status === 403) setConfig(err.response.data.error);
            else setConfig(1);
        });
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}*/