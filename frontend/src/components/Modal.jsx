import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FormAdd from './formAdd';

function ModalComponent({sector, name, color, typeModal, dataDetails, getTableExport }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleWheel = (e) => {
    e.preventDefault();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={() => openModal()} variant={color}>
        {name}
      </Button>

      <Modal show={modalIsOpen} onHide={closeModal} onWheel={handleWheel}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAdd  sector={sector} getTableExport={getTableExport} dataDetails={dataDetails} typeModal={typeModal} closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
