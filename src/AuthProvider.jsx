import { createContext, useContext, useEffect, useState } from 'react';


export const authContext = createContext();
export const useAuth = () => useContext(authContext)

const AuthProvider = ({ routes }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Initialize user from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData) => {
        // Store user data in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('userInfo');
        setUser(null);

        // If using tokens, remove them too
        localStorage.removeItem('authToken');
    };

    const handleRegister = (userData) => {
        // Similar to login after successful registration
        handleLogin(userData);
    };

    const authinfo = {
        handleRegister,
        handleLogin,
        handleLogout,
        user, setUser,
        loading, setLoading,
    }
    return (
        <div>
            <authContext.Provider value={authinfo}>{routes}</authContext.Provider>
        </div>
    );
};

export default AuthProvider;