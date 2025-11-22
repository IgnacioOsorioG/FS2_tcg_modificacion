import React from "react";
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react";
import Inicio from "../src/Inicio";
import CarruselPrincipal from "../src/components/carrusel/carrusel";

describe("Componente inicio"), () => {
    it("carrusel avanza correctamente", () => {
        render(<CarruselPrincipal />);
        expect(screen.getByRole("button", { name: /validar/i

        })).toBeInTheDocument();
    })
}