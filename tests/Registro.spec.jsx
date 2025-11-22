import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest'

import RegistroUsuario from './src/components/usuarios/registroUsuario.jsx';

describe('Componente RegistroUsuario', () => {

    it('debe renderizar el título de la pestaña de registro', () => {
        render(
            <BrowserRouter>
                <RegistroUsuario />
            </BrowserRouter>
        );

        const elementoTitulo = screen.getByText('Registro');

        expect(elementoTitulo).toBeInTheDocument();
    });

});