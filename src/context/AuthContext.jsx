import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// Correos permitidos como administradores (demo). Ajustar según necesites.
const ADMIN_EMAILS = ['nacho@tienda.cl', 'cris@tienda.cl'];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('authUser');
            if (raw) setUser(JSON.parse(raw));
        } catch (err) {
            console.error('Error leyendo usuario de localStorage', err);
        }
    }, []);

    const login = (userObj) => {
        setUser(userObj);
        try {
            localStorage.setItem('authUser', JSON.stringify(userObj));
        } catch (err) {
            console.error('Error guardando usuario en localStorage', err);
        }
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem('authUser');
        } catch (err) {
            console.error('Error eliminando usuario de localStorage', err);
        }
    };

    const isAdmin = !!(user && user.email && ADMIN_EMAILS.includes(user.email));

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
