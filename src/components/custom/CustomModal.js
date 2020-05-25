import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const CustomModal = ({ showModal, setShowModal, children }) => {
  return (
    <Modal
      isOpen={showModal}
      className="modal-dialog-centered modal-lg"
      toggle={() => setShowModal(false)}
    >
      <ModalHeader toggle={() => setShowModal(false)}>Preview</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default CustomModal;
