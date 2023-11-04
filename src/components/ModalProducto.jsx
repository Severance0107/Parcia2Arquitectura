import React from 'react'
import useProductos from '../hooks/useProductos';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

export default function ModalProducto() {


    const {show, handleClose, producto} = useProductos()

    const {title, description, id, images, price} = producto

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{price}</Modal.Body>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Body>
            {
                images?.map( (imagen, index) => (
                    <Image key={index} src={ imagen ? imagen: '...'} alt='60px' width={60} rounded />
                ))
            }    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
