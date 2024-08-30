import React from 'react';
import { Modal } from 'react-bootstrap'
import { Button } from '@mantine/core';


export function ErrorMessage ({show, modalMessage, setShow}){
    return (
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body> {modalMessage} </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}> Close </Button>
        </Modal.Footer>
      </Modal>
    )
}