const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {children}
          <button className="modal-close-button" onClick={onClose}>X</button>
        </div>
      </div>
    );
  }

export default Modal;
