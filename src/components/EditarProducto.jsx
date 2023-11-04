import React, { useEffect } from 'react'
import useProductos from '../hooks/useProductos';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';


export default function EditarProducto() {

    const {showEdit, handleCloseEdit, producto, editarProducto} = useProductos()

    const {id} = producto

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])

    
    useEffect(() => {
        setTitle(producto.title)
        setDescription(producto.description)
        setPrice(producto.price)
        setImages(producto.images)
    }, [producto])



  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
            </Form>
            {
                images?.map( (imagen, index) => (
                    <Image key={index} src={ imagen ? imagen: '...'} alt='60px' width={60} rounded />
                ))
            }    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editarProducto({id, title, description, price, images})}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
