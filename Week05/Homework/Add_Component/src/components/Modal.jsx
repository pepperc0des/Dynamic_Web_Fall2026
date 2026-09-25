//  If the effect uses [onClose], 
// it reruns when that callback changes. 
// Cleanup removes the keydown listener.

import { useEffect } from "react";

const Modal = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onclose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);
  
  return <div>Modal</div>;
};

export default Modal;
