import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_CONFIG = {
    'nacho@tienda.cl': 'Ryshock',
    'cris@tienda.cl': 'Ravel'
};

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
        let usuarioFinal = { ...userObj };

        if (userObj.email && ADMIN_CONFIG[userObj.email]) {
            usuarioFinal.usuario = ADMIN_CONFIG[userObj.email];
        }

        setUser(usuarioFinal);
        
        try {
            localStorage.setItem('authUser', JSON.stringify(usuarioFinal));
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

    const isAdmin = !!(user && user.email && Object.keys(ADMIN_CONFIG).includes(user.email));

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;