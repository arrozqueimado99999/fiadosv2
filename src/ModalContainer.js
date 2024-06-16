import React, { useRef, useEffect } from 'react';
import { useModal } from './ModalContext';

const ModalContainer = () => {
  const { isOpen, content, closeModal } = useModal();
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 bottom-0 backdrop-blur-sm bg-zinc-800 bg-opacity-55 w-screen h-screen z-50 flex justify-center items-center">
      <div 
        ref={modalRef} 
        className="p-4 mx-4 animate-scaleUp h-fit bg-white rounded-xl  drop-shadow-md w-screen xl:max-w-3xl 2xl:max-w-2xl md:w-1/2"
      >
        {content}
      </div>
    </div>
  );
};

export default ModalContainer;
