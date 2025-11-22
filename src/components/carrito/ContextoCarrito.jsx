import React, { createContext, useState, useContext } from 'react';

const ContextoCarrito = createContext();

export const usarCarrito = () => {
    return useContext(ContextoCarrito);
};

export const ProveedorCarrito = ({ children }) => {
    const [articulosCarrito, setArticulosCarrito] = useState([]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        setArticulosCarrito(articulosAnteriores => {
            const articuloExistente = articulosAnteriores.find(item => item.id === producto.id);

            if (articuloExistente) {

                return articulosAnteriores.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {

                return [...articulosAnteriores, { ...producto, cantidad }];
            }
        });
    };

    const eliminarDelCarrito = (idProducto) => {
        setArticulosCarrito(articulosAnteriores =>
            articulosAnteriores.filter(item => item.id !== idProducto)
        );
    };

    const restarDelCarrito = (idProducto) => {
        setArticulosCarrito(articulosAnteriores =>
            articulosAnteriores.map(item => {
                if (item.id === idProducto) {
                    return { ...item, cantidad: item.cantidad > 1 ? item.cantidad - 1 : 1 };
                }
                return item;
            }).filter(item => item.cantidad > 0) 
        );
    };

    const vaciarCarrito = () => {
        setArticulosCarrito([]);
    };

    const valor = {
        articulosCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        restarDelCarrito,
        vaciarCarrito,
    };

    return (
        <ContextoCarrito.Provider value={valor}>
            {children}
        </ContextoCarrito.Provider>
    );
};
