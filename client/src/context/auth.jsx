import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // Set axios default authorization header whenever auth changes
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth?.token ? `Bearer ${auth.token}` : '';
    }, [auth?.token]);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            try {
                const parseData = JSON.parse(data);
                setAuth({
                    user: parseData.user,
                    token: parseData.token
                });
            } catch (error) {
                console.error("Error parsing auth data from localStorage:", error);
                localStorage.removeItem('auth'); // Clear invalid data
            }
        }
    }, []); // Empty dependency array as this should only run once on mount

    // Helper function to update auth state and localStorage
    const updateAuth = (newAuth) => {
        setAuth(newAuth);
        if (newAuth.user && newAuth.token) {
            localStorage.setItem('auth', JSON.stringify(newAuth));
        } else {
            localStorage.removeItem('auth');
        }
    };

    // Logout helper
    const logout = () => {
        updateAuth({
            user: null,
            token: ""
        });
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={[auth, updateAuth, logout]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { useAuth, AuthProvider };