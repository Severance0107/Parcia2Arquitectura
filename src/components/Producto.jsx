import React from 'react'
import useProductos from '../hooks/useProductos'

export default function Producto({producto}) {

  const {obtenerProducto, eliminarProducto, submitProducto} = useProductos()

  const { id, title, description, price, images} = producto

  return (
      <div className="card">
        <img src={images[0]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}</p>
          <p className="card-text">{description}</p>
          <button className="btn btn-primary" onClick={() => obtenerProducto(id)}>Ver</button>
          <button className="btn btn-warning" onClick={() => submitProducto(producto)}>Editar</button>
          <button className="btn btn-danger" onClick={() => eliminarProducto(id)}>Eliminar</button>
        </div>
      </div>
  )
}
