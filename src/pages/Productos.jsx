import React, { useEffect, useState } from 'react'
import Producto from '../components/Producto'
import clienteAxios from '../config/clienteAxios'
import useProductos from '../hooks/useProductos'
import ModalProducto from '../components/ModalProducto'
import EditarProducto from '../components/EditarProducto'

export default function Productos() {

    const {productos} = useProductos()

  return (
    <div>
      {
        productos.map((producto, index) => (
          <Producto key={index} producto={producto} />
        ))
      }
      <ModalProducto />
      <EditarProducto />
    </div>
  )
}
