import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MiCuenta from '../src/components/usuarios/MiCuenta.jsx';
import * as AuthContext from '../src/context/AuthContext.jsx';

global.fetch = vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve([])
}));

vi.mock('../src/context/AuthContext.jsx', () => ({
    useAuth: vi.fn()
}));

describe('Componente MiCuenta', () => {

    it('muestra mensaje de iniciar sesión si no hay usuario', () => {
        AuthContext.useAuth.mockReturnValue({ user: null });

        render(
            <BrowserRouter>
                <MiCuenta />
            </BrowserRouter>
        );

        expect(screen.getByText(/Debes iniciar sesión/i)).toBeInTheDocument();
    });

    it('renderiza el título Mi Cuenta cuando el usuario está logueado', () => {
        AuthContext.useAuth.mockReturnValue({ 
            user: { usuario: 'Ryshock', email: 'test@tienda.cl' } 
        });

        render(
            <BrowserRouter>
                <MiCuenta />
            </BrowserRouter>
        );

        expect(screen.getByText('Mi Cuenta')).toBeInTheDocument();
    });

    it('muestra el nombre del usuario correctamente', () => {
        AuthContext.useAuth.mockReturnValue({ 
            user: { usuario: 'UsuarioPrueba', email: 'prueba@tienda.cl' } 
        });

        render(
            <BrowserRouter>
                <MiCuenta />
            </BrowserRouter>
        );

        const elementos = screen.getAllByText('UsuarioPrueba');
        expect(elementos.length).toBeGreaterThan(0);
    });

    it('renderiza la pestaña de Mis Compras por defecto', () => {
        AuthContext.useAuth.mockReturnValue({ 
            user: { usuario: 'Ryshock', email: 'test@tienda.cl' } 
        });

        render(
            <BrowserRouter>
                <MiCuenta />
            </BrowserRouter>
        );

        expect(screen.getByText('Mis Compras')).toBeInTheDocument();
    });

    it('contiene el botón para crear un Nuevo Ticket', () => {
        AuthContext.useAuth.mockReturnValue({ 
            user: { usuario: 'Ryshock', email: 'test@tienda.cl' } 
        });

        render(
            <BrowserRouter>
                <MiCuenta />
            </BrowserRouter>
        );

        const boton = screen.getByRole('button', { name: /\+ Nuevo Ticket/i });
        expect(boton).toBeInTheDocument();
    });

});