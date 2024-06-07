import { motion } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, modalRef }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute inset-0 bg-black"
      ></motion.div>

      <motion.div
        ref={modalRef}
        id="modal"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white p-12 rounded-lg shadow-md w-[80vw] md:w-[30vw] h-auto z-50 flex items-center justify-center"
      >
        <Button
          className="btn-icon bg-[--gray-light] w-7 h-7 absolute top-3 right-3"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
            aria-label="Remove"
            className="h-4 w-4"
          />
        </Button>

        {children}
      </motion.div>
    </div>
  );
};

export default Modal;