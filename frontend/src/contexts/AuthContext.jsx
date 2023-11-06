import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const userRef = useRef(user);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
        axios.get("/api/user").then(res => {
            setUser(res.data.user);
            setLoading(false);
        }).catch(() => {
            setUser(null);
            setLoading(false);
        });
    }, []);

    const getLoggedIn = useCallback(async () => {
        setLoading(true);
        const loggedInRes = await axios.get("/api/user");
        if (loggedInRes.data.user) {
            setUser(loggedInRes.data.user);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    const logout = useCallback(async () => {
        await axios.get("/api/logout");
        setUser(null);
        navigate("/login");
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser, userRef, getLoggedIn, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};